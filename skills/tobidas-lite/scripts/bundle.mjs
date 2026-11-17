#!/usr/bin/env node
// 作品を、1つの HTML ファイルにまとめる。
//   作品の index.html は、エンジン・テーマ・絵・定義を別ファイルから読む入れ物なので、単体では開けない。
//   フォルダごと渡せない場面(チャットやアプリ内の表示にファイルを1つだけ渡す、作る機械と見る機械が別、など)では、これで作った1ファイルを渡す。
//   スタイルシートとスクリプトを全部埋め込み、作品が使う画像もデータURLにして埋め込む。音声は、先に embed-audio.mjs で assets/audio.js に入れておく。
//   node bundle.mjs <作品フォルダ> [--out 出力.html]        既定の出力は <作品フォルダ>/<フォルダ名>-single.html
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const IMG = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml', avif: 'image/avif' };
const AUDIO = /\.(mp3|wav|ogg|oga|opus|m4a|aac|flac|webm)$/i;
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
const local = u => !/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(u);   // http: data: などの URL は、そのまま残す

// work: 作品フォルダ。まとめた HTML の文字列と、気づいた点(notes)を返す
export function bundle(work) {
  const index = path.join(work, 'index.html'), notes = [];
  if (!fs.existsSync(index)) throw new Error(`${index} がありません(作品フォルダを指定する)`);
  const read = u => { const f = path.resolve(work, decodeURI(u.split(/[?#]/)[0])); if (!fs.existsSync(f)) { notes.push(`読み込み先が見つかりません: ${u}`); return null; } return fs.readFileSync(f, 'utf8'); };
  // 作品の assets/ とテーマの assets/ にある画像。作品のスクリプトに書かれたパス(index.html から見たパス)を、データURLに置きかえる
  const images = [path.join(work, 'assets'), path.join(work, 'theme', 'assets')].flatMap(walk).filter(f => IMG[path.extname(f).slice(1).toLowerCase()])
    .map(f => ({ key: path.relative(work, f).split(path.sep).join('/'), file: f, used: false }));
  const embedImages = s => { for (const im of images) { if (!s.includes(im.key)) continue; im.used = true;
    const url = `data:${IMG[path.extname(im.file).slice(1).toLowerCase()]};base64,${fs.readFileSync(im.file).toString('base64')}`;
    for (const q of [`'`, `"`, '`']) s = s.split(q + im.key + q).join(q + url + q); } return s; };
  let html = fs.readFileSync(index, 'utf8');
  html = html.replace(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi, tag => { const u = (tag.match(/\bhref=["']([^"']+)["']/i) || [])[1]; if (!u || !local(u)) return tag;
    const css = read(u); return css == null ? tag : `<style>\n${css.replace(/<\/style/gi, '<\\/style')}\n</style>`; });
  html = html.replace(/<script\b([^>]*)\bsrc=["']([^"']+)["']([^>]*)>\s*<\/script>/gi, (tag, a, u, b) => { if (!local(u)) return tag;
    const js = read(u); return js == null ? tag : `<script${(a + b).replace(/\s+$/, '')}>\n${embedImages(js).replace(/<\/script/gi, '<\\/script')}\n</script>`; });   // スクリプトの中の </script は、HTML の読み取りがそこで切れないように書きかえる
  html = html.replace(/^[ \t]*<!--[\s\S]*?-->[ \t]*\n/gm, '');   // 読み込み順の覚え書きは、埋め込んだあとは意味がないので消す
  for (const im of images) if (!im.used) notes.push(`埋め込んでいない画像: ${im.key}(スクリプトにこのパスが書かれていない。パスを組み立てて作っている場合は、文字列で1つずつ書く)`);
  const audio = walk(path.join(work, 'assets')).filter(f => AUDIO.test(f));
  if (audio.length && !/Tobidas\.asset\(/.test(html)) notes.push(`音声ファイルが ${audio.length} 個あるのに埋め込まれていません。先に embed-audio.mjs を実行する`);
  return { html, notes };
}

if (process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href) {
  const args = process.argv.slice(2), opt = {}; let work = null;
  for (let i = 0; i < args.length; i++) { if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i]; else work = args[i]; }
  if (!work) { console.error('usage: node bundle.mjs <作品フォルダ> [--out 出力.html]'); process.exit(2); }
  work = path.resolve(work);
  let r; try { r = bundle(work); } catch (e) { console.error(e.message); process.exit(1); }
  const out = path.resolve(opt.out || path.join(work, path.basename(work) + '-single.html'));
  fs.writeFileSync(out, r.html);
  for (const n of r.notes) console.log('  注意: ' + n);
  console.log(`1ファイルにまとめました: ${out}(${(Buffer.byteLength(r.html) / 1024).toFixed(0)} KB)\n  このファイルだけで開ける。作品を直したら作り直す。`);
}
