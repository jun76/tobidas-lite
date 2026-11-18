#!/usr/bin/env node
// 新しい作品フォルダを作る: ひな形(index.html と engine/)+ 選んだテーマ(theme/)+ そのテーマの書き出し用の book/ をコピーする。
//   node new-book.mjs <作品フォルダ> [--theme storybook]      --theme にはスキル内のテーマ名か、テーマパックのフォルダのパスを書く
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const skill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), opt = {}; let dest = null;
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i]; else dest = args[i]; }
if (!dest) { console.error('usage: node new-book.mjs <作品フォルダ> [--theme 名前かパス]'); process.exit(2); }
const name = opt.theme || 'storybook', themes = path.join(skill, 'themes');
const themeDir = fs.existsSync(path.join(themes, name, 'theme.js')) ? path.join(themes, name) : path.resolve(name);
if (!fs.existsSync(path.join(themeDir, 'theme.js'))) { console.error(`テーマ '${name}' が見つかりません(theme.js がない)。使える名前: ${fs.readdirSync(themes).filter(d => fs.existsSync(path.join(themes, d, 'theme.js'))).join(' ')}`); process.exit(1); }
dest = path.resolve(dest);
if (fs.existsSync(dest) && fs.readdirSync(dest).length) { console.error(`${dest} は空ではありません。上書きしないので、別の場所を指定してください。`); process.exit(1); }
fs.cpSync(path.join(skill, 'assets', 'template'), dest, { recursive: true });
// テーマのうち、作品が実行時に読むもの(スクリプトと assets/、parts/ のスクリプト)だけを theme/ に入れる。資料・見本・書き出しは入れない
fs.mkdirSync(path.join(dest, 'theme'));
for (const f of fs.readdirSync(themeDir)) { const src = path.join(themeDir, f); if (/\.(js|css)$/.test(f) || f === 'assets') fs.cpSync(src, path.join(dest, 'theme', f), { recursive: true }); }
const partsDir = path.join(themeDir, 'parts');
if (fs.existsSync(partsDir)) { fs.mkdirSync(path.join(dest, 'theme', 'parts')); for (const f of fs.readdirSync(partsDir)) if (/\.js$/.test(f)) fs.cpSync(path.join(partsDir, f), path.join(dest, 'theme', 'parts', f)); }
// テーマの部品の目録(parts/parts-*.js)があれば、index.html の theme/parts/parts.js の次に読み込みを足す
{ const pd = path.join(dest, 'theme', 'parts'), extra = (fs.existsSync(pd) ? fs.readdirSync(pd) : []).filter(f => /^parts-.*\.js$/.test(f)).sort(), idx = path.join(dest, 'index.html'), tag = '<script src="theme/parts/parts.js"></script>\n', html = fs.readFileSync(idx, 'utf8');
  if (extra.length && html.includes(tag)) fs.writeFileSync(idx, html.replace(tag, tag + extra.map(f => `<script src="theme/parts/${f}"></script>\n`).join(''))); }
fs.mkdirSync(path.join(dest, 'assets'), { recursive: true });   // 画像・音声ファイルを使う作品は、ここに置く(使わなければ空のまま)
const starter = path.join(themeDir, 'starter', 'book');
if (fs.existsSync(starter)) fs.cpSync(starter, path.join(dest, 'book'), { recursive: true }); else fs.mkdirSync(path.join(dest, 'book'));
console.log(`作品フォルダを作りました: ${dest}\n  テーマ: ${path.basename(themeDir)}(資料は ${themeDir})\n  書くのは book/art.js と book/book.js。画像・音声ファイルを使うなら assets/ に置く。index.html は <title> と lang だけ直す。`);
