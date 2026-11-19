#!/usr/bin/env node
// Chrome / Chromium の実行ファイル探し(check.mjs / gallery.mjs / parts-sheet.mjs / render-video.mjs で共用)。
// PATH に Chrome がない環境(サンドボックスなど)では、channel や playwright 既定の場所だけでは見つからないことがある。
// Muse のキャッシュ(~/workspace/.cache-chrome)や playwright のキャッシュ(~/.cache/ms-playwright)にある
// バイナリも候補に入れる。CHROME_PATH が指定されていれば、それを最優先にする。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const NAMES = new Set(['chrome', 'chromium', 'google-chrome', 'chrome-headless-shell', 'headless_shell', 'Google Chrome']);

// よくある置き場所を浅く走査して、実行できそうなバイナリを集める(新しいもの・名前が chrome のものを優先)
export function findChromeCandidates() {
  const home = os.homedir(), found = [];
  const roots = [
    path.join(home, '.cache-chrome'),
    path.join(home, 'workspace', '.cache-chrome'),
    path.join(home, '.cache', 'ms-playwright'),
    path.join(home, 'Library', 'Caches', 'ms-playwright'),
    '/Applications/Google Chrome.app/Contents/MacOS',
    '/usr/bin', '/usr/local/bin',
  ];
  const walk = (dir, depth) => {
    if (depth < 0) return;
    let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, depth - 1);
      else if (NAMES.has(e.name)) { try { fs.accessSync(p, fs.constants.X_OK); found.push(p); } catch { } }
    }
  };
  for (const r of roots) walk(r, r.endsWith('bin') || r.endsWith('MacOS') ? 0 : 4);
  const rank = p => (path.basename(p) === 'chrome' ? 0 : path.basename(p).startsWith('chrome') ? 1 : 2);
  return found.sort((a, b) => rank(a) - rank(b) || b.localeCompare(a));
}

// chromium.launch() に順に渡す候補。base は launch オプション(args など)。
export function chromeTries(base) {
  const tries = [];
  if (process.env.CHROME_PATH) tries.push({ ...base, executablePath: process.env.CHROME_PATH });
  for (const p of findChromeCandidates()) tries.push({ ...base, executablePath: p });
  tries.push({ ...base, channel: 'chrome' }, { ...base, channel: 'msedge' }, base);
  return tries;
}

export const CHROME_NOT_FOUND = 'Chrome が見つかりません。キャッシュ置き場(~/.cache-chrome、~/workspace/.cache-chrome、~/.cache/ms-playwright)も探しました。Chrome を入れるか、CHROME_PATH に実行ファイルのパスを指定するか、`npx playwright install chromium` を実行してください。';
