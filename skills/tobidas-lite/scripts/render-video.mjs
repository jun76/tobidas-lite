#!/usr/bin/env node
// (任意)作品を動画にする。全フレームを撮って ffmpeg でまとめる。音(engine/sound.js の合成)も付ける。--no-audio で映像だけ。
//   node render-video.mjs <作品フォルダ> [--out out.mp4] [--workers 8] [--fps 30]
import { chromium } from 'playwright-core';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2), opt = {}; let work = null;
for (let i = 0; i < args.length; i++) { if (args[i] === '--no-audio') opt.noAudio = true; else if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i]; else work = args[i]; }
if (!work) { console.error('usage: node render-video.mjs <作品フォルダ> [--out out.mp4] [--workers 8] [--fps 30]'); process.exit(2); }
const html = fs.statSync(work).isDirectory() ? path.join(work, 'index.html') : work, dir = path.dirname(path.resolve(html));
const frames = path.join(dir, '.frames'), out = path.resolve(opt.out || path.join(dir, 'book.mp4')), W = +(opt.workers || 8), fps = +(opt.fps || 30);
fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
const base = { args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'] };
let browser; for (const o of [process.env.CHROME_PATH && { ...base, executablePath: process.env.CHROME_PATH }, { ...base, channel: 'chrome' }, base].filter(Boolean)) { try { browser = await chromium.launch(o); break; } catch { } }
if (!browser) { console.error('Chrome が見つかりません(CHROME_PATH を指定)'); process.exit(1); }
const open = async () => { const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto(pathToFileURL(path.resolve(html)).href + '?t=0'); await p.waitForFunction(() => typeof Tobidas !== 'undefined' && Tobidas.ready); await p.evaluate(() => document.fonts.ready); return p; };
const first = await open(), END = await first.evaluate(() => Tobidas.TL.END), N = Math.round(END * fps);
const wav = path.join(frames, 'sound.wav'); let hasAudio = false;
if (!opt.noAudio) { const b64 = await first.evaluate(async () => (typeof Tobidas.sound === 'undefined' || Tobidas.def.sound === false || Tobidas.def.sound?.off) ? null : await Tobidas.sound.wavBase64()); if (b64) { fs.writeFileSync(wav, Buffer.from(b64, 'base64')); hasAudio = true; } }
await first.close();
let done = 0;
await Promise.all(Array.from({ length: W }, async (_, k) => {
  const p = await open();
  for (let i = Math.floor(N * k / W); i < Math.floor(N * (k + 1) / W); i++) {
    await p.evaluate(t => Tobidas.render(t), i / fps);
    await p.screenshot({ path: path.join(frames, `f${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 96 });
    if (++done % 200 === 0) console.log(`${done} / ${N}`);
  }
}));
await browser.close();
const r = spawnSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(fps), '-i', path.join(frames, 'f%05d.jpg'), ...(hasAudio ? ['-i', wav, '-c:a', 'aac', '-b:a', '192k', '-shortest'] : []), '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: 'inherit' });
if (r.status !== 0) { console.error('ffmpeg に失敗しました(ffmpeg が入っているか確認)。フレームは ' + frames); process.exit(1); }
fs.rmSync(frames, { recursive: true, force: true });
console.log('書き出し: ' + out + (hasAudio ? '(音つき)' : '(音なし)'));
