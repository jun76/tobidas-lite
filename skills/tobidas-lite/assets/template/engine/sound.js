// tobidas sound — BGMと効果音を、作品定義からブラウザ内で合成する音源。曲と効果音の定義はテーマが持つ。作品ごとに編集しない。
//   音声ファイルも混ぜられる(sound.files と、sfx の名前にファイルのパス)。全体を1本の波形として作っておくので、どの時刻からでも再生できる(player.js が自動再生中に鳴らす)。
//   作品側の書き方はテーマの資料(storybook なら themes/storybook/sound.md)。  見開きの music: '気分' / sfx: [[tl, '名前', {…}]]、全体の sound: { off, auto, music, files, moods, tunes, extra }
(function () {
  const SR = 44100, PI = Math.PI, hz = m => 440 * Math.pow(2, (m - 69) / 12);
  // ---- 曲の素材(3拍子・8小節)。chords は CH の名前、mel は小節ごとの [拍, MIDI音程] ----
  const CH = { C: [48, 64, 67], Am: [45, 64, 69], F: [41, 65, 69], G: [43, 62, 67], Dm: [50, 65, 69], E: [40, 64, 68], G7: [43, 65, 71], Em: [40, 64, 67], D7: [50, 66, 72], C7: [48, 64, 70], Bb: [46, 65, 70], Gm: [43, 62, 70] };
  // 曲・曲集・気分・効果音はテーマ(themes/<名前>/theme.js の sound)が持つ。ここにあるのは音源と、本そのものの音だけ。
  const B = (...bars) => bars.map(b => b.map((m, i) => Array.isArray(m) ? m : [i, m]).filter(n => n[1]));   // 小節ごとの音程を並べる略記(0 は休み)
  const seq = (S, t, notes, gap, vol = .7, rev = .8) => notes.forEach((m, k) => S.box(t + k * gap, m, vol, k % 2 ? .3 : -.3, rev));
  let job = null;
  // 全体を合成する。{ L, R, N, SR, dur } を返す Promise(2回目以降は同じ結果)。画面を固めないよう細切れに実行する。
  function build() { return job || (job = run()); }
  async function run() {
    const T = Tobidas, TL = T.TL, def = T.def, cfg = def.sound && typeof def.sound === 'object' ? def.sound : {};
    const lib = (T.themeDef && T.themeDef.sound) || {}, TUNES = lib.tunes || {}, SETS = lib.sets || {}, MOODS = lib.moods || {}, SFX = lib.sfx || {};
    const set0 = ((T.themeDef && T.themeDef.defaults) || {}).set, baseSet = SETS[set0] || SETS[Object.keys(SETS)[0]] || {};   // テーマの既定の曲集
    const dur = TL.END + 1.5, N = Math.ceil(dur * SR), L = new Float32Array(N), R = new Float32Array(N), REV = new Float32Array(N);
    const warn = m => { if (!T.warnings.includes(m)) T.warnings.push(m); };
    let seed = 12345; const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const put = (i, v, pan, rev) => { if (i < 0 || i >= N) return; L[i] += v * (1 - pan); R[i] += v * (1 + pan); REV[i] += v * rev; };
    const jobs = [], clips = [], isFile = s => typeof s === 'string' && /[\/.]/.test(s);   // clips = 混ぜる音声ファイル { src, t, end, vol, from, loop, fadeIn, fadeOut }
    // --- 音源(重い処理は jobs に積んで後でまとめて実行) ---
    // 減衰する正弦波を足し込む(毎サンプル sin/exp を呼ばず、回転と減衰の掛け算だけで進める。合成時間の大半がここ)
    const ring = (i0, f, amp, tau, pan, rev, n, att) => {
      const w = 6.2832 * f / SR, d = Math.exp(-1 / (tau * SR)), cr = Math.cos(w) * d, ci = Math.sin(w) * d, gl = 1 - pan, gr = 1 + pan;
      let re = 0, im = amp, a = Math.max(0, -i0); for (let k = 0; k < a; k++) { const x = re * cr - im * ci; im = re * ci + im * cr; re = x; }   // 先頭が0秒より前なら空回し
      const e = Math.min(n, N - i0);
      for (let i = a; i < e; i++) { const x = re * cr - im * ci; im = re * ci + im * cr; re = x; const v = i < att ? re * i / att : re, o = i0 + i; L[o] += v * gl; R[o] += v * gr; REV[o] += v * rev; }
    };
    const box = (t, midi, vol = 1, pan = 0, rev = .5) => jobs.push(() => {            // オルゴール
      const f = hz(midi), tau = 1.1 * Math.pow(440 / f, .45), i0 = Math.round(t * SR);
      for (const [k, a, tu] of [[1, 1, tau], [2, .22, tau * .5], [3.01, .1, tau * .3], [5.43, .07, tau * .12], [8.2, .03, tau * .06]]) if (f * k < SR * .45) ring(i0, f * k, a * vol * .11, tu, pan, rev, Math.round(Math.min(5, tu * 7) * SR), 40);
    });
    const soft = (t, midi, vol = 1, len = 1.2, pan = 0) => jobs.push(() => {          // やわらかい低音
      const f = hz(midi), i0 = Math.round(t * SR), n = Math.round(len * 2.5 * SR);
      [[1, 1], [2, .3], [3, .1]].forEach(([k, a]) => ring(i0, f * k, a * vol * .09, len, pan, .3, n, .03 * SR));
    });
    // フィルタ付きノイズ。fc(u)=中心周波数, amp(u)=音量(u は 0..1 の進行度), mode: 'bp' | 'lp' | 'hp'
    const noise = (t, len, fc, amp, q = 1.2, pan = 0, rev = .3, mode = 'bp') => jobs.push(() => {
      const i0 = Math.round(t * SR), n = Math.round(len * SR); let lo = 0, bd = 0;
      for (let i = 0; i < n; i++) {
        const u = i / n, f = 2 * Math.sin(PI * Math.min(fc(u), 9000) / SR), x = rand() * 2 - 1, hi = x - lo - bd / q; bd += f * hi; lo += f * bd;
        put(i0 + i, (mode === 'lp' ? lo : mode === 'hp' ? hi : bd) * amp(u), typeof pan === 'function' ? pan(u) : pan, rev);
      }
    });
    const thud = (t, vol = 1, f0 = 90, len = .35) => {                                // 低い打撃音
      jobs.push(() => { const i0 = Math.round(t * SR), n = Math.round(len * 4 * SR); let ph = 0; for (let i = 0; i < n; i++) { const x = i / SR, f = f0 * (.5 + .5 * Math.exp(-x / .08)); ph += 6.2832 * f / SR; put(i0 + i, Math.sin(ph) * Math.exp(-x / len) * vol * .5, 0, .25); } });
      noise(t, .12, () => 500, u => (1 - u) * (1 - u) * vol * .5, .8, 0, .3, 'lp');
    };
    const tick = (t, vol = 1, pan = 0) => { const f = 2500 + rand() * 2500; noise(t, .05, () => f, u => (1 - u) ** 3 * vol * .35, 2, pan, .4); box(t, 84 + Math.floor(rand() * 12), vol * .12, pan, .7); };
    const sparkle = (t0, t1, n, vol = .5, base = 96) => { for (let i = 0; i < n; i++) box(t0 + (t1 - t0) * (i + rand() * .6) / n, base + [0, 2, 4, 7, 9, 12, 14, 16][Math.floor(rand() * 8)], vol * (.5 + rand() * .5), rand() * 1.2 - .6, .8); };
    const tunes = Object.assign({}, TUNES, cfg.tunes), moods = Object.assign({}, MOODS, cfg.moods);
    // 曲集: 内蔵の名前か、書き下ろし { main: {chords, mel, beats}, sub: {…}, minor: {…}, tr, tempo }(足りない役は musicbox の曲)
    const qset = new URLSearchParams(location.search).get('set'), sv = qset || cfg.set || set0 || Object.keys(SETS)[0] || {};
    if (typeof sv === 'string' && !SETS[sv]) warn(`音: 曲集 '${sv}' はありません(使える名前: ${Object.keys(SETS).join(' ')})`);
    const set = Object.assign({}, baseSet, typeof sv === 'string' ? SETS[sv] : sv);
    for (const r of ['main', 'sub', 'minor']) { const v = set[r]; tunes[r] = typeof v === 'string' ? tunes[v] || TUNES[baseSet[r]] : v; if (typeof v === 'string' && !tunes[v]) warn(`音: 曲 '${v}' はありません`); }
    for (const r of ['main', 'sub', 'minor']) { const t = tunes[r]; if (!t && !Object.keys(SETS).length) continue; if (!t || !Array.isArray(t.chords) || !Array.isArray(t.mel) || t.chords.length !== t.mel.length) { warn(`音: 曲集の ${r} は chords と mel を同じ小節数で書く`); tunes[r] = TUNES[baseSet[r]]; } else t.chords.forEach(c => { if (!CH[c]) warn(`音: 和音 '${c}' はありません(使える名前: ${Object.keys(CH).join(' ')})`); }); }
    // t0〜t1 のあいだ、曲 ph を鳴らす
    const phrase = (t0, t1, ph, o = {}) => {
      const { vol = 1, oct = 0, bass = 1, dbl = false, stac = false, startBar = 0 } = o, nb = ph.chords.length, nbeat = ph.beats || 3;
      const beat = (o.beat ?? .6) * (set.tempo ?? 1), tr = (o.tr || 0) + (set.tr || 0);
      for (let b = startBar, t = t0; t < t1 - .15; b++, t += beat * nbeat) {
        const c = CH[ph.chords[b % nb]] || CH.C, fade = Math.min(1, (t1 - t) / 2.5 + .25) * Math.min(1, (t - t0) / 1.2 + .5);
        soft(t, c[0] + tr, .8 * vol * bass * fade, stac ? .35 : 1.3);
        for (let k = 1; k < nbeat; k++) if (t + beat * k < t1 - .1) {
          if (nbeat === 4 && k === 2) { soft(t + beat * k, c[0] + tr + 7, .55 * vol * bass * fade, stac ? .3 : .9); continue; }   // 4拍子の3拍目は低音
          box(t + beat * k, c[1] + tr, .32 * vol * fade, -.3); box(t + beat * k + .012, c[2] + tr, .32 * vol * fade, .3); if (stac) soft(t + beat * k, c[0] + tr + 12, .4 * vol * bass, .2);
        }
        for (const [bo, m] of ph.mel[b % nb] || []) if (t + bo * beat < t1 - .1) { box(t + bo * beat, m + tr + oct, .95 * vol * fade, .1 * Math.sin(b + bo)); if (dbl) box(t + bo * beat + .01, m + tr + oct - 12, .5 * vol * fade, -.2); }
      }
    };
    const S = { TL, SR, O: TL.open, CH, hz, rand, box, soft, noise, thud, tick, sparkle, phrase, tunes, moods };
    S.seq = (t, notes, gap, vol, rev) => seq(S, t, notes, gap, vol, rev);
    S.sfx = (name, t, o) => { const f = SFX[name]; if (f) f(S, t, o || {}); else warn(`音: 効果音 '${name}' はありません(使える名前: ${Object.keys(SFX).join(' ')})`); };

    if (def.sound !== false && !cfg.off) {
      const sp = def.spreads, k = TL.INTRO / 5.2;
      // --- 本そのものの音(表紙・ページめくり・とじる・おしまい) ---
      if (cfg.auto !== false) {
        [60, 64, 67, 72, 74, 76, 79, 84, 86, 88, 91, 96].forEach((m, i) => box((.9 + i * .3) * k, m, .5 + i * .03, (i % 2 ? .4 : -.4), .8));
        sparkle(3.2 * k, 5.0 * k, 10, .35);
        [72, 76, 79].forEach(m => box(TL.ts[0] + .1, m, .65));
        TL.ts.forEach(t => {
          noise(t + .1, TL.TURN * .85, u => 700 + 2600 * Math.sin(u * PI), u => Math.sin(u * PI) ** 2 * .1, .9, u => -.5 + u, .4);
          noise(t + .05, .5, () => 4200, u => Math.sin(u * PI) * .05 * (rand() > .4 ? 1 : .2), 1.5, .3, .3, 'hp');
          for (let i = 0; i < 9; i++) tick(t + TL.TURN * (.56 + .05 * i) + rand() * .03, .5 + rand() * .5, rand() * 1.4 - .7);   // パーツが立ち上がる音
          thud(t + TL.TURN * .97, .22, 120, .12);
        });
        thud(TL.ts[0] + TL.TURN * .97, .5, 85, .25);
        noise(TL.tc + .1, TL.CLOSE * .8, u => 600 + 2000 * Math.sin(u * PI), u => Math.sin(u * PI) ** 2 * .1, .9, u => .5 - u, .4);
        thud(TL.tc + TL.CLOSE - .12, .4, 85, .3);
        seq(S, TL.tc + .3, [84, 79, 76, 72, 67, 64], .34, .7);
        const e = TL.tc + TL.CLOSE + .25; [48, 60, 64, 67, 72, 76, 84].forEach((m, i) => box(e + i * .045, m, .8, 0, .9)); soft(e, 36, 1, 2); sparkle(e + .3, e + 2.4, 10, .25);
      }
      // --- BGM: 見開きの music をつなぐ。同じ気分が続く見開きは、めくりをまたいで1つの流れにする ---
      const segs = [];
      if (cfg.music !== false) sp.forEach((sd, i) => {   // sound: { music: false } で合成のBGMを止める(音声ファイルのBGMに任せるとき)
        const m = sd.music ?? 'bright', list = Array.isArray(m) && Array.isArray(m[0]) ? m : [[0, m]];
        list.forEach(([tl, mood]) => segs.push({ t: tl <= 0 ? TL.open(i + 1) - .45 : TL.open(i + 1) + tl, mood, key: typeof mood === 'string' ? mood : JSON.stringify(mood) }));
      });
      const runs = segs.filter((s, i) => i === 0 || s.key !== segs[i - 1].key);
      runs.forEach((s, i) => {
        if (s.mood === 'none' || !s.mood) return;
        const o = typeof s.mood === 'string' ? moods[s.mood] : s.mood;
        if (!o) return warn(`音: 気分 '${s.mood}' はありません(使える名前: ${Object.keys(moods).join(' ')} none)`);
        const ph = tunes[o.tune || 'main']; if (!ph) return warn(`音: 曲 '${o.tune}' はありません`);
        phrase(s.t, (runs[i + 1] ? runs[i + 1].t : TL.tc) - .2, ph, o);
      });
      // --- 効果音 ---
      sp.forEach((sd, i) => (sd.sfx || []).forEach(([tl, what, o]) => { const t = TL.open(i + 1) + tl; if (typeof what === 'function') what(S, t); else if (isFile(what)) clips.push(Object.assign({ src: what, t, end: Infinity, fadeOut: .03 }, o)); else S.sfx(what, t, o); }));
      // --- 音声ファイル(BGMなど): sound.files。始まりは at(秒)か spread+tl、省略なら最初の見開きから。終わりは end(秒)か endSpread、省略なら本をとじる所まで ---
      (cfg.files || []).forEach(f => { if (typeof f === 'string') f = { src: f }; const t = f.at ?? (f.spread ? TL.open(f.spread) + (f.tl || 0) : TL.open(1) - .45); clips.push(Object.assign({ fadeIn: .6, fadeOut: 2.5 }, f, { t, end: f.end ?? (f.endSpread ? TL.until(f.endSpread) : TL.tc + .8) })); });
      if (cfg.extra) cfg.extra(S);
    }

    // --- 実行(12ms ごとに画面へ処理を返す) ---
    const mc = new MessageChannel(), pause = () => new Promise(r => { mc.port1.onmessage = r; mc.port2.postMessage(0); });
    let last = performance.now(); const breathe = async () => { if (performance.now() - last > 12) { await pause(); last = performance.now(); } };
    for (const j of jobs) { j(); await breathe(); }
    // 残響
    const wet = new Float32Array(N), combs = [1557, 1617, 1491, 1422, 1277, 1356].map(d => ({ d, buf: new Float32Array(d), i: 0, lp: 0 })), aps = [225, 556, 441].map(d => ({ d, buf: new Float32Array(d), i: 0 }));
    for (let n = 0; n < N; n++) {
      let s = 0; const x = REV[n];
      for (const c of combs) { const y = c.buf[c.i]; c.lp = y * .75 + c.lp * .25; c.buf[c.i] = x + c.lp * .86; c.i = (c.i + 1) % c.d; s += y; }
      s /= combs.length;
      for (const a of aps) { const y = a.buf[a.i], v = s + y * .5; a.buf[a.i] = v; a.i = (a.i + 1) % a.d; s = y - v * .5; }
      wet[n] = s; if ((n & 16383) === 0) await breathe();
    }
    let peak = 1e-6;
    for (let i = N - 1; i >= 0; i--) { const d = i >= 613 ? wet[i - 613] : 0; L[i] = L[i] * .5 + wet[i] * .55; R[i] = R[i] * .5 + d * .55; peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
    const g = .89 / Math.max(peak, .05), th = Math.tanh(1.15);
    for (let i = 0; i < N; i++) { const f = Math.min(1, i / (SR * .5)) * Math.min(1, (N - i) / (SR * 1.2)) * .98 / th; L[i] = Math.tanh(L[i] * g * 1.15) * f; R[i] = Math.tanh(R[i] * g * 1.15) * f; if ((i & 65535) === 0) await breathe(); }
    // --- 音声ファイルを混ぜる(仕上げのあとに、残響なしで足す)---
    if (clips.length) {
      const AC = window.OfflineAudioContext || window.webkitOfflineAudioContext, bufs = {};
      const load = src => bufs[src] || (bufs[src] = (async () => { const u = T.assets[src] || (location.protocol === 'file:' ? null : src); if (!u) throw new Error('file'); const r = await fetch(u); if (!r.ok) throw new Error(r.status); return new AC(2, 1, SR).decodeAudioData(await r.arrayBuffer()); })());
      for (const c of clips) {
        let buf; try { buf = await load(c.src); } catch (e) { warn(`音: 音声ファイル '${c.src}' を読み込めません(${e.message === 'file' ? 'file:// では直接読めないので、node scripts/embed-audio.mjs <作品フォルダ> で埋め込む' : 'パスは index.html から見て書く。作品の assets/ に置く'})`); continue; }
        const a = buf.getChannelData(0), b = buf.numberOfChannels > 1 ? buf.getChannelData(1) : a, from = Math.round((c.from || 0) * SR), avail = a.length - from, i0 = Math.round(c.t * SR), vol = c.vol ?? 1;
        if (avail <= 0) continue;
        const n = Math.max(0, Math.min(c.loop ? Infinity : avail, Math.round((c.end - c.t) * SR), N - i0)), fi = Math.max(1, (c.fadeIn ?? .01) * SR), fo = Math.max(1, (c.fadeOut ?? .03) * SR);
        for (let j = Math.max(0, -i0); j < n; j++) { const k = from + (c.loop ? j % avail : j), f = Math.min(1, j / fi, (n - j) / fo) * vol; L[i0 + j] += a[k] * f; R[i0 + j] += b[k] * f; if ((j & 65535) === 0) await breathe(); }
      }
      let pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i]));
      if (pk > .98) { const k = .98 / pk; for (let i = 0; i < N; i++) { L[i] *= k; R[i] *= k; } }
    }
    mc.port1.close();
    snd.ready = true;
    return { L, R, N, SR, dur, peak, notes: jobs.length };
  }
  // 1秒ごとの音量(dB)。チェック用
  async function levels() { const { L, R, N } = await build(), out = []; for (let s = 0; s * SR < N; s++) { let a = 0, n = 0; for (let i = s * SR; i < Math.min(N, (s + 1) * SR); i += 4) { a += L[i] * L[i] + R[i] * R[i]; n += 2; } out.push(Math.round(10 * Math.log10(a / n + 1e-10))); } return out; }
  // 16bit ステレオ WAV(base64)。動画化用
  async function wavBase64() {
    const { L, R, N } = await build(), b = new DataView(new ArrayBuffer(44 + N * 4)), str = (o, s) => [...s].forEach((c, i) => b.setUint8(o + i, c.charCodeAt(0)));
    str(0, 'RIFF'); b.setUint32(4, 36 + N * 4, true); str(8, 'WAVEfmt '); b.setUint32(16, 16, true); b.setUint16(20, 1, true); b.setUint16(22, 2, true); b.setUint32(24, SR, true); b.setUint32(28, SR * 4, true); b.setUint16(32, 4, true); b.setUint16(34, 16, true); str(36, 'data'); b.setUint32(40, N * 4, true);
    for (let i = 0; i < N; i++) { b.setInt16(44 + i * 4, Math.round(L[i] * 32000), true); b.setInt16(46 + i * 4, Math.round(R[i] * 32000), true); }
    const u = new Uint8Array(b.buffer); let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); return btoa(s);
  }
  const snd = Tobidas.sound = { SR, ready: false, build, levels, wavBase64, CH, bars: B, lib: () => (Tobidas.themeDef && Tobidas.themeDef.sound) || {} };
})();
