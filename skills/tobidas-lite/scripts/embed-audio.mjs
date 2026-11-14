#!/usr/bin/env node
// 作品の assets/ にある音声ファイルを、assets/audio.js に埋め込む。
//   ブラウザは file:// で開いたページから音声ファイルの中身を読めない(BGMや効果音に混ぜられない)ので、データURLにしてスクリプトとして読み込む。
//   音声ファイルを足した・差し替えたら、もう一度実行する。index.html に読み込みの1行がなければ足す。
//   node embed-audio.mjs <作品フォルダ>
import fs from 'node:fs';
import path from 'node:path';
const work = process.argv[2];
if (!work) { console.error('usage: node embed-audio.mjs <作品フォルダ>'); process.exit(2); }
const dir = path.join(work, 'assets'), html = path.join(work, 'index.html');
const MIME = { mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', oga: 'audio/ogg', opus: 'audio/ogg', m4a: 'audio/mp4', aac: 'audio/aac', flac: 'audio/flac', webm: 'audio/webm' };
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
const files = walk(dir).filter(f => MIME[path.extname(f).slice(1).toLowerCase()]).sort();
if (!files.length) { console.error(`${dir} に音声ファイルがありません(対応: ${Object.keys(MIME).join(' ')})`); process.exit(1); }
let js = '// embed-audio.mjs が作ったファイル。手で編集しない(音声ファイルを差し替えたら作り直す)\n', total = 0;
for (const f of files) {
  const key = path.relative(work, f).split(path.sep).join('/'), buf = fs.readFileSync(f); total += buf.length;
  js += `Tobidas.asset(${JSON.stringify(key)}, 'data:${MIME[path.extname(f).slice(1).toLowerCase()]};base64,${buf.toString('base64')}');\n`;
  console.log(`  ${key}  ${(buf.length / 1024).toFixed(0)} KB`);
}
fs.writeFileSync(path.join(dir, 'audio.js'), js);
let h = fs.readFileSync(html, 'utf8');
if (!/<script[^>]*assets\/audio\.js/.test(h)) {
  const tag = '<script src="assets/audio.js"></script>', m = h.match(/^.*<script[^>]*engine\/sound\.js[^>]*><\/script>.*$/m);
  if (!m) { console.error('index.html に engine/sound.js の読み込みが見つかりません。その次の行に ' + tag + ' を手で足してください。'); process.exit(1); }
  fs.writeFileSync(html, h.replace(m[0], m[0] + '\n' + tag)); console.log('index.html に読み込みを足しました: ' + tag);
}
console.log(`assets/audio.js を作りました(${files.length} 個、元の合計 ${(total / 1048576).toFixed(1)} MB)。作品からは元のパス(例: '${path.relative(work, files[0]).split(path.sep).join('/')}')で指定する。`);
