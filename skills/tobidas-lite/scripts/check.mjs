#!/usr/bin/env node
// 作品の静止画チェック。代表的な時刻のフレームを撮り、一覧画像(sheet.jpg)にまとめ、エラーと警告を報告する。
// 警告には、エンジンが出すもののほか、音の名前の間違いと、切り分けられる板で絵が箱の上へはみ出して切れる箇所と、動き(anim)で動かす部分の名前が絵の中で重なっている箇所を含む。
//   node check.mjs <作品フォルダ>                 全体(表紙・各見開きのめくり途中/開いた直後/中盤/終盤・とじる・おしまい)
//   node check.mjs <作品フォルダ> --spread 3      見開き3だけを細かく(仕掛けの確認用。--n 12 で枚数)
//   node check.mjs <作品フォルダ> --times 31.5,36 指定した時刻だけ
//   --out <dir> 出力先(既定: <作品フォルダ>/.check)
import { chromium } from 'playwright-core';
import { chromeTries, CHROME_NOT_FOUND } from './find-chrome.mjs';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2), opt = {}; let work = null;
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[i + 1]?.startsWith('--') || args[i + 1] == null ? true : args[++i]; else work = args[i]; }
if (!work) { console.error('usage: node check.mjs <作品フォルダ> [--spread N] [--times a,b,c] [--n 12] [--out dir]'); process.exit(2); }
const html = fs.statSync(work).isDirectory() ? path.join(work, 'index.html') : work;
const out = path.resolve(opt.out || path.join(path.dirname(html), '.check'));
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (/^(t\d|sheet)/.test(f)) fs.unlinkSync(path.join(out, f));

export async function launch() {
  const base = { args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars', '--enable-gpu'] };
  for (const o of chromeTries(base)) { try { return await chromium.launch(o); } catch { } }
  throw new Error(CHROME_NOT_FOUND);
}

const browser = await launch(), page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(pathToFileURL(path.resolve(html)).href + '?t=0');
try { await page.waitForFunction(() => typeof Tobidas !== "undefined" && Tobidas.ready, null, { timeout: 15000 }); }
catch { console.error('作品を読み込めませんでした。\n' + errors.join('\n')); await browser.close(); process.exit(1); }
await page.evaluate(() => document.fonts.ready);
// 音: 合成してみて、名前の間違い(警告)と無音の区間を調べる
const snd = await page.evaluate(async () => (typeof Tobidas.sound === 'undefined' || Tobidas.def.sound === false || Tobidas.def.sound?.off) ? null : { lv: await Tobidas.sound.levels() }).catch(e => { errors.push('音の合成に失敗: ' + e.message); return null; });
const info = await page.evaluate(() => ({ TL: { ...Tobidas.TL, open: undefined, until: undefined }, opens: Tobidas.def.spreads.map((_, i) => Tobidas.TL.open(i + 1)), untils: Tobidas.def.spreads.map((_, i) => Tobidas.TL.until(i + 1)), warnings: Tobidas.warnings, pieces: Tobidas.def.spreads.map(s => (s.pieces || []).length) }));
const { TL, opens, untils } = info;
// はみ出し: 背をまたいで左右に切り分けられる板は、絵を「絵の箱」(w×h)の中に閉じて描くので、箱の上へ出た分は描かれない(references/pitfalls.md)。
// 切り分けられるパーツの絵を実際に測り、上へ 2px を超えて出ていたら警告する(左右は、帯の端を隠すためにわざと広く描くことがあるので見ない)
info.warnings.push(...await page.evaluate(() => {
  const out = [], host = document.createElement('div'); host.style.cssText = 'position:fixed;left:0;top:0;visibility:hidden'; document.body.append(host);
  Tobidas.def.spreads.forEach((sd, si) => (sd.pieces || []).forEach((sp, idx) => {
    if (sp.deck || sp.nosplit || sp.yaw || typeof sp.art !== 'string' || !(sp.X - sp.w / 2 < 0 && sp.X + sp.w / 2 > 0)) return;
    host.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sp.w} ${sp.h}" width="${sp.w}" height="${sp.h}" style="overflow:visible">${sp.art}</svg>`;
    let bb; try { bb = host.firstChild.getBBox(); } catch { return; }
    const over = Math.ceil(-bb.y); if (over > 2) out.push(`見開き${si + 1} パーツ#${idx}: 背をまたいで切り分けられる板で、絵が箱の上へ ${over} はみ出していて、その分が描かれない(絵を箱の中に収める。箱の高さを ${Math.ceil(sp.h + over)} 以上に取って絵を下げるか、絵を縮める。片ページに収めるか nosplit: true なら切れない)`);
  }));
  host.remove(); return out;
}));

let times = [];
if (opt.times) times = String(opt.times).split(',').map(Number);
else if (opt.spread) { const s = +opt.spread, n = +(opt.n || 12), a = opens[s - 1] - TL.TURN * .5, b = untils[s - 1]; for (let i = 0; i < n; i++) times.push(a + (b - a) * i / (n - 1)); }
else {
  times.push(TL.INTRO * .6);
  for (let s = 1; s <= TL.N; s++) { const o = opens[s - 1], u = untils[s - 1]; times.push(o - TL.TURN * .4, o + .6, (o + u) / 2, u - .4); }
  times.push(TL.tc + TL.CLOSE * .5, TL.END - 1.6);
}
const shots = [];
for (const t of times) {
  await page.evaluate(t => Tobidas.render(t), t);
  const w = await page.evaluate(t => Tobidas.where(t), t), name = `t${t.toFixed(2).padStart(6, '0')}.jpg`;
  await page.screenshot({ path: path.join(out, name), type: 'jpeg', quality: 82 });
  shots.push({ name, label: `t=${t.toFixed(1)}  見開き${w.spread}  tl=${w.tl.toFixed(1)}` });
}
// 動きの中で出る警告(動かす部分の名前の重なりなど)は、フレームを撮ったあとに読み直す
for (const w of await page.evaluate(() => Tobidas.warnings)) if (!info.warnings.includes(w)) info.warnings.push(w);
// 一覧画像
const sheet = await browser.newPage({ viewport: { width: 1940, height: 800 } });
const sheetHtml = path.join(out, 'sheet.html');   // file:// の画像を読むため、いったんHTMLとして保存して開く
fs.writeFileSync(sheetHtml, `<meta charset="utf-8"><body style="margin:10px;background:#111;display:grid;grid-template-columns:repeat(${Math.min(4, Math.max(2, Math.ceil(shots.length / 3)))},1fr);gap:8px;font:15px system-ui;color:#fff">${shots.map(s => `<div><img src="${s.name}" style="width:100%;display:block"><div style="padding:3px 2px">${s.label}</div></div>`).join('')}</body>`);
await sheet.goto(pathToFileURL(sheetHtml).href);
await sheet.waitForFunction(() => [...document.images].every(i => i.complete));
await sheet.screenshot({ path: path.join(out, 'sheet.jpg'), type: 'jpeg', quality: 80, fullPage: true });
fs.unlinkSync(sheetHtml);
await browser.close();

console.log(`見開き ${TL.N} / 全体 ${TL.END.toFixed(1)} 秒 / パーツ数 ${info.pieces.join(', ')}`);
console.log(`一覧: ${path.join(out, 'sheet.jpg')}  (個別: ${shots.length} 枚, 1920x1080)`);
if (snd) { const end = Math.floor(TL.END), q = []; let a = -1; snd.lv.slice(0, end).forEach((d, i) => { if (d < -55) { if (a < 0) a = i; } else if (a >= 0) { if (i - a >= 2) q.push(`${a}〜${i}秒`); a = -1; } }); if (a >= 0 && end - a >= 2) q.push(`${a}〜${end}秒`); console.log(`音: 合成OK${q.length ? ' / 2秒以上の無音: ' + q.join(', ') + '(意図どおりか確認)' : ' / 長い無音なし'}`); } else console.log('音: なし');
if (info.warnings.length) console.log('警告:\n  ' + info.warnings.join('\n  '));
if (errors.length) { console.log('エラー:\n  ' + [...new Set(errors)].join('\n  ')); process.exit(1); }
console.log('エラーなし');
