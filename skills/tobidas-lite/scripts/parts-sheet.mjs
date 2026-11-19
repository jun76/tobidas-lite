#!/usr/bin/env node
// テーマの部品の目録(LIB)から、見本画像と一覧を作る。
//   node parts-sheet.mjs [--theme storybook] [--only 文字列]
//   → <テーマ>/parts/previews/NN.jpg(1枚に 4×3 個)と <テーマ>/parts/parts-lib.md(名前・寸法・載っている画像の一覧)
//   --only を付けると、名前がその文字列で始まる部品だけを <テーマ>/parts/previews/_only_NN.jpg に撮る(描いている途中の確認用。一覧は書きかえない)
import { chromium } from 'playwright-core';
import { chromeTries, CHROME_NOT_FOUND } from './find-chrome.mjs';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
const skill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), opt = {};
for (let i = 0; i < args.length; i++) if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i];
const name = opt.theme || 'storybook', themes = path.join(skill, 'themes');
const themeDir = fs.existsSync(path.join(themes, name, 'theme.js')) ? path.join(themes, name) : path.resolve(name);
const partsDir = path.join(themeDir, 'parts');
const files = fs.readdirSync(partsDir).filter(f => /^parts.*\.js$/.test(f)).sort((a, b) => (a === 'parts.js' ? -1 : b === 'parts.js' ? 1 : a.localeCompare(b)));
const out = path.join(partsDir, 'previews'); fs.mkdirSync(out, { recursive: true });
const u = f => pathToFileURL(f).href;
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#d9e6cf;font:600 20px system-ui,sans-serif;color:#2c3a2a}#g{display:grid;grid-template-columns:repeat(4,400px);grid-auto-rows:400px}
.c{position:relative;box-sizing:border-box;border:1px solid #c3d3b8;padding:10px 10px 62px}.c>svg{width:100%;height:100%;overflow:visible}.t{position:absolute;left:0;right:0;bottom:8px;text-align:center;line-height:1.25}.t small{display:block;font-weight:400;font-size:16px;opacity:.8}</style>
<div id="tobidas" style="display:none"></div><div id="g"></div>
<script src="${u(path.join(skill, 'assets/template/engine/tobidas.js'))}"></script>${files.map(f => `<script src="${u(path.join(partsDir, f))}"></script>`).join('')}`;
const tmp = path.join(out, '_sheet.html'); fs.writeFileSync(tmp, html);
const base = { args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars', '--enable-gpu'] };
let browser; for (const o of chromeTries(base)) { try { browser = await chromium.launch(o); break; } catch { } }
if (!browser) { console.error(CHROME_NOT_FOUND); process.exit(1); }
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } }), errors = [];
page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(u(tmp));
let list = await page.evaluate(() => Object.values(LIB).map(p => { let err = ''; try { const s = p.art({}, p.w, p.h); if (typeof s !== 'string' || /NaN|undefined/.test(s)) err = 'NaN か undefined が絵に入っています'; } catch (e) { err = e.message; } return { name: p.name, label: p.label, w: p.w, h: p.h, group: p.group, note: p.note + (p.o.lift ? `${p.note ? '。' : ''}既定で ${p.o.lift} 浮く(lift)` : ''), anim: !!(p.o.anim || p.o.dyn), err }; }));
for (const p of list) if (p.err) errors.push(`${p.name}: ${p.err}`);
const only = opt.only; if (only) list = list.filter(p => p.name.startsWith(only));
for (const f of fs.readdirSync(out)) if (only ? /^_only_/.test(f) : /^\d+\.jpg$/.test(f)) fs.unlinkSync(path.join(out, f));
const pages = Math.ceil(list.length / 12), sheetOf = {};
for (let i = 0; i < pages; i++) {
  const part = list.slice(i * 12, i * 12 + 12), file = (only ? '_only_' : '') + String(i + 1).padStart(2, '0') + '.jpg';
  part.forEach(p => sheetOf[p.name] = file);
  await page.evaluate(names => {
    document.getElementById('g').innerHTML = names.map(nm => {
      const p = LIB[nm]; let s = ''; try { s = p.art({}, p.w, p.h); } catch { }
      const m = Math.max(p.w, p.h) * .08;
      return `<div class="c"><svg viewBox="${-m} ${-m * 2.4} ${p.w + m * 2} ${p.h + m * 3}" preserveAspectRatio="xMidYMax meet"><defs><filter id="e${nm.replace(/\W/g, "_")}" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="${Math.max(p.w, p.h) / 100}"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 .98  0 0 0 1 0" result="w"/><feMerge><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g${p.o.flt === false ? "" : ` filter="url(#e${nm.replace(/\W/g, "_")})"`}>${s}</g></svg><div class="t">${p.name}<small>${p.label} ${p.w}×${p.h}</small></div></div>`;
    }).join('');
  }, part.map(p => p.name));
  await page.screenshot({ path: path.join(out, file), type: 'jpeg', quality: 80 });
}
await browser.close(); fs.unlinkSync(tmp);
if (!only) {
  let md = `# 部品の目録(put / lib で呼び出す絵)\n\n\`scripts/parts-sheet.mjs\` が作る一覧(手で編集しない)。使い方は \`parts.md\` の「目録の部品」。見た目は \`previews/\` の画像で確かめる(1枚に12個)。\n\n全 ${list.length} 点。「動き」に ○ のある部品は、置くだけで動く(\`anim\` や \`dyn\` を渡すと置きかわる)。箱は絵の元サイズ(w0×h0)で、\`put\` が自動で使う。\n`;
  let g = null;
  for (const p of list) { if (p.group !== g) { g = p.group; md += `\n## ${g}\n\n| 名前 | 絵 | 箱 | 動き | 絵の設定(art) | 画像 |\n|---|---|---|---|---|---|\n`; } md += `| \`${p.name}\` | ${p.label} | ${p.w}×${p.h} | ${p.anim ? '○' : ''} | ${p.note} | ${sheetOf[p.name]} |\n`; }
  fs.writeFileSync(path.join(partsDir, 'parts-lib.md'), md);
}
console.log(`部品 ${list.length} 点 / 画像 ${pages} 枚 → ${out}`);
if (errors.length) { console.log('エラー:\n  ' + [...new Set(errors)].join('\n  ')); process.exit(1); }
