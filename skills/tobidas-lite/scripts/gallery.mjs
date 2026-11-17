#!/usr/bin/env node
// 内蔵の画風・机を、ある作品の1場面で並べて見比べる一覧を作る(聞き取りでユーザーに見せる用・プリセット確認用)。
//   node gallery.mjs <作品フォルダ> [--t 秒] [--out dir]   → <out>/styles.jpg, <out>/desks.jpg(一覧)
//   聞き取りページ(scripts/setup.mjs)用に、1種ずつの小さい画像 <out>/style_<名前>.jpg, <out>/desk_<名前>.jpg と、名前の一覧 <out>/index.json も作る
import { chromium } from 'playwright-core';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const args = process.argv.slice(2), opt = {}; let work = null;
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i]; else work = args[i]; }
if (!work) { console.error('usage: node gallery.mjs <作品フォルダ> [--t 秒] [--out dir]'); process.exit(2); }
const html = fs.statSync(work).isDirectory() ? path.join(work, 'index.html') : work, out = path.resolve(opt.out || path.join(path.dirname(html), '.check'));
fs.mkdirSync(out, { recursive: true });
const base = { args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars', '--enable-gpu'] };
let browser; for (const o of [process.env.CHROME_PATH && { ...base, executablePath: process.env.CHROME_PATH }, { ...base, channel: 'chrome' }, { ...base, channel: 'msedge' }, base].filter(Boolean)) { try { browser = await chromium.launch(o); break; } catch { } }
if (!browser) { console.error('Chrome が見つかりません(CHROME_PATH を指定)'); process.exit(1); }
const url = pathToFileURL(path.resolve(html)).href, errors = [];
const shoot = async (q, t, file) => { const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', e => errors.push(q + ': ' + e.message)); await p.goto(`${url}?t=${t}&${q}`); await p.waitForFunction(() => typeof Tobidas !== 'undefined' && Tobidas.ready); await p.evaluate(() => document.fonts.ready); const w = await p.evaluate(() => Tobidas.warnings); if (w.length) errors.push(q + ': ' + w.join(' / ')); await p.screenshot({ path: file, type: 'jpeg', quality: 84 }); await p.close(); };
const first = await browser.newPage(); await first.goto(url + '?t=0'); await first.waitForFunction(() => typeof Tobidas !== 'undefined' && Tobidas.ready);
const info = await first.evaluate(() => ({ styles: Object.entries(Tobidas.STYLES).map(([k, v]) => [k, v.label]), desks: Object.entries(Tobidas.DESKS).map(([k, v]) => [k, v.label, !!v.scene]), sets: Object.entries(((Tobidas.themeDef || {}).sound || {}).sets || {}).map(([k, v]) => [k, v.label || k]), defaults: (Tobidas.themeDef || {}).defaults || {}, theme: (Tobidas.themeDef || {}).id || '', t: Tobidas.TL.open(Math.min(2, Tobidas.TL.N)) + 4, t0: Tobidas.TL.INTRO * .7 })); await first.close();
const t = +(opt.t || info.t);
for (const [kind, list, tt, cols] of [['style', info.styles, t, 3], ['desk', info.desks, info.t0, 3]]) {
  const cells = [];
  for (const [name, label] of list) { const f = `${kind}_${name}.jpg`; await shoot(`${kind}=${name}`, tt, path.join(out, f)); cells.push(`<div><img src="${f}" style="width:100%;display:block"><div style="padding:6px 2px 10px;font:600 26px system-ui">${name} <span style="font-weight:400;opacity:.8">${label}</span></div></div>`); }
  const sheetHtml = path.join(out, `${kind}s.html`), sheet = await browser.newPage({ viewport: { width: 1920, height: 800 } });
  fs.writeFileSync(sheetHtml, `<meta charset="utf-8"><body style="margin:12px;background:#111;color:#fff;display:grid;grid-template-columns:repeat(${cols},1fr);gap:10px">${cells.join('')}</body>`);
  await sheet.goto(pathToFileURL(sheetHtml).href); await sheet.waitForFunction(() => [...document.images].every(i => i.complete));
  await sheet.screenshot({ path: path.join(out, `${kind}s.jpg`), type: 'jpeg', quality: 82, fullPage: true }); await sheet.close(); fs.unlinkSync(sheetHtml);
  // 1種ずつの画像は、聞き取りページ用に 640×360 へ縮めて残す
  const thumb = await browser.newPage({ viewport: { width: 640, height: 360 } });
  for (const [name] of list) { const f = path.join(out, `${kind}_${name}.jpg`); await thumb.setContent(`<body style="margin:0"><img src="data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}" style="width:640px;height:360px;display:block">`); await thumb.waitForFunction(() => [...document.images].every(i => i.complete)); await thumb.screenshot({ path: f, type: 'jpeg', quality: 80 }); }
  await thumb.close();
  console.log(`${kind}: ${list.map(l => l[0]).join(' ')} → ${path.join(out, kind + 's.jpg')}`);
}
// 見本の表紙ポスター。聞き取りページの見本プレイヤー(iframe)が描けない環境(Mac の Muse アプリ)で、代わりに出す。イントロの終わり頃(t0)は表紙が閉じたまま机に見えている
await shoot('embed', info.t0, path.join(out, 'poster.jpg'));
{ const thumb = await browser.newPage({ viewport: { width: 640, height: 360 } }); const f = path.join(out, 'poster.jpg'); await thumb.setContent(`<body style="margin:0"><img src="data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}" style="width:640px;height:360px;display:block">`); await thumb.waitForFunction(() => [...document.images].every(i => i.complete)); await thumb.screenshot({ path: f, type: 'jpeg', quality: 80 }); await thumb.close(); }
console.log(`poster: 表紙 → ${path.join(out, 'poster.jpg')}`);
// 聞き取りページが読む一覧。sample は、選んだ組み合わせを当てはめて見せる見本(テーマのフォルダから見たパス)
const themeDir = path.resolve(out, '..'), sample = path.relative(themeDir, path.dirname(path.resolve(html))).split(path.sep).join('/');
fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify({ theme: info.theme, defaults: info.defaults, styles: info.styles, desks: info.desks, sets: info.sets, sample: sample.startsWith('..') ? '' : sample }, null, 1) + '\n');
await browser.close();
if (errors.length) { console.log('問題:\n  ' + errors.join('\n  ')); process.exit(1); }
