#!/usr/bin/env node
// 聞き取りページを作る: ひな形(assets/setup/setup.html)に、題材ごとの候補とおすすめ、テーマの内蔵の一覧を埋めて1枚の HTML に書き出す。
//   node setup.mjs <書き出す.html> --data <候補とおすすめの.json> [--theme storybook]
//   ユーザーがブラウザで開いて選び、最後の「結果」を会話に貼る。見本画像と見本の絵本も埋め込むので、書き出した HTML は1ファイルだけで開ける(別の機械へ渡してもよい)。
//   node setup.mjs --strings                       画面の文言(英語)を JSON で出力する。日本語・英語以外の言語では、これを訳して data の strings に書く
//   data の書式(references なし。ここが正):
//     { "ui": "ja",                                   会話の言語のコード('ja' 'en' 'fr' など)。'ja' と 'en' は文言を内蔵している
//       "strings": { … },                             ui が 'ja' 'en' 以外のとき必須。--strings の出力を会話の言語に訳したもの({topic} {n} はそのまま残す)
//       "labels": { "style": { "kirigami": "…" }, "desk": { … }, "set": { … } },   ui が 'ja' 以外のとき。内蔵の表示名(テーマの表示名は日本語)を会話の言語で書く
//       "topic": "ももたろう",                         題材
//       "highlights": ["桃から生まれる", "鬼退治"],      見せ場の候補を2つ
//       "recommend": { "style": [["kirigami", "理由"], ["crayon", "理由"]],   おすすめの画風を第1位・第2位
//                      "desk": ["meadow", "理由"], "set": ["wafu", "理由"] },  おすすめの本の後ろと曲を1つずつ
//       "fixed": { "lang": "日本語", "length": 6, "highlight": "…", "parts": "mix", "style": "…", "desk": "…", "set": "…" } }   省略可。ユーザーがすでに指定した項目だけ書く。parts は preset(目録の部品だけ)/ custom(目録を使わない)/ mix(目録を使い、ないものを描く)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { bundle } from './bundle.mjs';
const skill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), opt = {}; let dest = null;
for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i]; else dest = args[i]; }
const tplPath = path.join(skill, 'assets', 'setup', 'setup.html'), tpl = fs.readFileSync(tplPath, 'utf8');
const strM = tpl.match(/\/\*STR_BEGIN\*\/([\s\S]*?)\/\*STR_END\*\//); if (!strM) { console.error('assets/setup/setup.html に文言の目印(STR_BEGIN)がありません。'); process.exit(1); }
const STR = JSON.parse(strM[1]);
if (args.includes('--strings')) { console.log(JSON.stringify(STR.en, null, 1)); process.exit(0); }
if (!dest || !opt.data) { console.error('usage: node setup.mjs <書き出す.html> --data <候補とおすすめの.json> [--theme 名前かパス]'); process.exit(2); }
const fail = m => { console.error(m); process.exit(1); };
const name = opt.theme || 'storybook', themes = path.join(skill, 'themes');
const themeDir = fs.existsSync(path.join(themes, name, 'theme.js')) ? path.join(themes, name) : path.resolve(name);
const index = path.join(themeDir, 'previews', 'index.json');
if (!fs.existsSync(index)) fail(`テーマ '${name}' に previews/index.json がありません。node scripts/gallery.mjs <見本の作品> --out <テーマ>/previews で作ってください。`);
const theme = JSON.parse(fs.readFileSync(index, 'utf8'));
let data; try { data = JSON.parse(fs.readFileSync(opt.data, 'utf8')); } catch (e) { fail(`${opt.data} を読めません: ${e.message}`); }
// 候補とおすすめがそろっているか、名前が内蔵にあるかを確かめる(間違った名前のまま見せない)
const errs = [], has = (list, v) => list.some(x => x[0] === v), names = list => list.map(x => x[0]).join(' ');
if (!data.topic) errs.push('topic(題材)がありません');
if (!Array.isArray(data.highlights) || data.highlights.length < 2) errs.push('highlights(見せ場の候補)を2つ書いてください');
const r = data.recommend || {}, fx = data.fixed || {};
if (!Array.isArray(r.style) || r.style.length < 2) errs.push('recommend.style に第1位と第2位を [名前, 理由] で書いてください');
for (const s of r.style || []) if (!has(theme.styles, s[0])) errs.push(`画風 '${s[0]}' はありません(使える名前: ${names(theme.styles)})`);
for (const [k, list, label] of [['desk', theme.desks, '本の後ろ'], ['set', theme.sets, '曲']]) {
  if (!Array.isArray(r[k])) errs.push(`recommend.${k} を [名前, 理由] で書いてください`); else if (!has(list, r[k][0])) errs.push(`${label} '${r[k][0]}' はありません(使える名前: ${names(list)})`);
  if (fx[k] != null && !has(list, fx[k])) errs.push(`fixed.${k} '${fx[k]}' はありません(使える名前: ${names(list)})`);
}
if (fx.style != null && !has(theme.styles, fx.style)) errs.push(`fixed.style '${fx.style}' はありません(使える名前: ${names(theme.styles)})`);
if (fx.length != null && ![4, 6, 8].includes(fx.length)) errs.push('fixed.length は 4 / 6 / 8 のどれかです');
// 作中の部品の質問は、テーマに部品の目録(parts/parts-*.js)があるときだけ出す
theme.parts = fs.existsSync(path.join(themeDir, 'parts')) && fs.readdirSync(path.join(themeDir, 'parts')).some(f => /^parts-.*\.js$/.test(f));
if (fx.parts != null && !['preset', 'custom', 'mix'].includes(fx.parts)) errs.push('fixed.parts は preset / custom / mix のどれかです');
if (fx.parts != null && !theme.parts) errs.push('このテーマには部品の目録がないので、fixed.parts は書けません');
// 画面の言語: ja と en は内蔵。ほかは strings が要る。形が合わない訳は、画面が崩れる前にここで止める
const ui = data.ui || 'ja', notes = [];
if (!STR[ui]) {
  if (!data.strings) errs.push(`ui '${ui}' の文言は内蔵していません。node setup.mjs --strings の出力を訳して、data の strings に書いてください`);
  else {
    const shape = v => Array.isArray(v) ? 'a' + v.length : typeof v, chk = (ref, got, pre) => { for (const k of Object.keys(got)) if (!(k in ref)) errs.push(`strings.${pre}${k} という項目はありません`); for (const k of Object.keys(ref)) { if (!(k in got)) notes.push(`strings.${pre}${k} がないので英語で出します`); else if (shape(ref[k]) !== shape(got[k])) errs.push(`strings.${pre}${k} の形が違います(--strings の出力と同じ形にする)`); else if (typeof ref[k] === 'string') for (const ph of ref[k].match(/\{\w+\}/g) || []) if (!got[k].includes(ph)) errs.push(`strings.${pre}${k} に ${ph} を残してください`); } };
    chk(Object.fromEntries(Object.entries(STR.en).filter(([k]) => k !== 'k')), Object.fromEntries(Object.entries(data.strings).filter(([k]) => k !== 'k')), ''); chk(STR.en.k, data.strings.k || {}, 'k.');
  }
}
const lb = data.labels || {};
for (const [k, list] of [['style', theme.styles], ['desk', theme.desks], ['set', theme.sets]]) { for (const n of Object.keys(lb[k] || {})) if (!has(list, n)) errs.push(`labels.${k}.${n} という名前はありません(使える名前: ${names(list)})`); if (ui !== 'ja') { const miss = list.filter(x => !(lb[k] || {})[x[0]]).map(x => x[0]); if (miss.length) notes.push(`labels.${k} に ${miss.join(' ')} がないので、日本語の表示名で出します`); } }
if (errs.length) fail('data に問題があります:\n  ' + errs.join('\n  '));
const setup = { ui, strings: STR[ui] ? undefined : data.strings, labels: data.labels, topic: data.topic, highlights: data.highlights.slice(0, 2), recommend: r, fixed: fx, theme, thumbs: {}, sample: null, poster: null };
// 見本画像(previews/ の style_名前.jpg など)と見本の絵本を、このページに埋め込む。スキルのフォルダを見られない場所(別の機械、アプリ内の表示)でも開けるようにするため
const dataUrl = (f, mime) => `data:${mime};base64,${fs.readFileSync(f).toString('base64')}`;
for (const [kind, list] of [['style', theme.styles], ['desk', theme.desks]]) for (const [n] of list) { const f = path.join(themeDir, 'previews', `${kind}_${n}.jpg`); if (fs.existsSync(f)) setup.thumbs[`${kind}_${n}`] = dataUrl(f, 'image/jpeg'); else notes.push(`見本画像 previews/${kind}_${n}.jpg がありません`); }
if (theme.sample) { try { const b = bundle(path.join(themeDir, theme.sample)); setup.sample = b.html; for (const n of b.notes) notes.push(`見本の絵本: ${n}`); } catch (e) { notes.push(`見本の絵本を埋め込めません(${e.message})。見本なしで作ります`); } }
// 見本の表紙ポスター。見本プレイヤー(iframe)が描けない環境(Mac の Muse アプリ)では、ページがこれに差し替える
const posterF = path.join(themeDir, 'previews', 'poster.jpg');
if (fs.existsSync(posterF)) setup.poster = dataUrl(posterF, 'image/jpeg'); else if (theme.sample) notes.push('見本のポスター previews/poster.jpg がありません。node scripts/gallery.mjs <見本の作品> --out <テーマ>/previews で作り直してください');
const mark = '/*SETUP_DATA*/null';
if (!tpl.includes(mark)) fail('assets/setup/setup.html に SETUP_DATA の目印がありません。');
dest = path.resolve(dest); fs.mkdirSync(path.dirname(dest), { recursive: true });
const icon = 'href="favicon.png"', page = tpl.replace(mark, () => JSON.stringify(setup).replace(/</g, '\\u003c')).replace(icon, () => `href="${dataUrl(path.join(skill, 'assets', 'setup', 'favicon.png'), 'image/png')}"`);
fs.writeFileSync(dest, page);
if (notes.length) console.log('注意:\n  ' + notes.join('\n  '));
console.log(`聞き取りページを作りました: ${dest}(${(Buffer.byteLength(page) / 1048576).toFixed(1)} MB)\n  開く: ${pathToFileURL(dest).href}\n  ユーザーにブラウザで開いてもらい、選び終えたら「結果」をコピーして会話に貼ってもらう。\n  このファイルだけで開ける。ユーザーが別の機械にいるなら、ファイルそのものを渡す。`);
