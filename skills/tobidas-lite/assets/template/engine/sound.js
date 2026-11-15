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
    // 伸びる音(笛・矩形波・三角波)。harm = 倍音ごとの音量(1倍音から順に)、len 秒鳴らして rel 秒で消える。vib = ビブラートの深さ、vr = その速さ(Hz)、scoop = 出だしの音程のずれ(負なら下からしゃくり上げる)、fall = 吹きはじめのあと落ち着く音量の割合(ft 秒かけて)
    const tone = (t, midi, vol = 1, len = .4, pan = 0, o = {}) => jobs.push(() => {
      const f = hz(midi), hs = (o.harm || [1]).map((a, k) => [k + 1, a]).filter(h => h[1] && f * h[0] < SR * .45), att = (o.att ?? .03) * SR, rel = (o.rel ?? .06) * SR, hold = len * SR, n = Math.round(hold + rel), i0 = Math.round(t * SR);
      const w = 6.2832 * f / SR, vib = o.vib || 0, vw = 6.2832 * (o.vr || 5.5) / SR, v0 = (o.vd ?? .12) * SR, sc = o.scoop || 0, sd = Math.exp(-1 / (.045 * SR)), fall = o.fall ?? 1, fd = Math.exp(-1 / ((o.ft || .4) * SR)), rev = o.rev ?? .35, gl = 1 - pan, gr = 1 + pan; let ph = 0;
      let bend = sc, sw = 1 - fall;
      for (let i = 0; i < n; i++) {
        ph += w * (1 + bend + (vib && i > v0 ? vib * Math.min(1, (i - v0) / (.25 * SR)) * Math.sin(i * vw) : 0)); bend *= sd; const q = i0 + i; if (q < 0 || q >= N) continue;
        let v = 0; for (const [k, a] of hs) v += a * Math.sin(ph * k);
        v *= vol * (fall + sw) * (i < att ? i / att : 1) * (i > hold ? 1 - (i - hold) / rel : 1); sw *= fd; L[q] += v * gl; R[q] += v * gr; REV[q] += v * rev;
      }
    });
    // はじいて減衰する音(ハープ・琴)。parts = [倍音, 音量, 減衰の速さ] の並び
    const pluck = (t, midi, vol, pan, tau0, parts, att, rev) => jobs.push(() => { const f = hz(midi), i0 = Math.round(t * SR); for (const [k, a, d] of parts) if (f * k < SR * .45) ring(i0, f * k, a * vol, tau0 / d, pan, rev, Math.round(Math.min(5, tau0 / d * 7) * SR), att); });
    // 曲集が選べる音色。(t, MIDI音程, 音量, 左右, 長さ) で鳴らす。長さを使うのは伸びる音だけ
    const VOICE = {
      box: (t, m, vol, pan) => box(t, m, vol, pan),
      harp: (t, m, vol, pan = 0) => pluck(t, m, vol * .1, pan, 1.5 * Math.pow(440 / hz(m), .35), [[1, 1, 1], [2, .42, 1.9], [3, .2, 2.7], [4, .1, 3.5], [5, .05, 4.3]], 120, .55),   // 丸く、長く残る
      koto: (t, m, vol, pan = 0) => { pluck(t, m, vol * .085, pan, .8 * Math.pow(440 / hz(m), .45), [1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => [k * (1 + .0006 * k * k), Math.pow(k, -.7), Math.pow(k, .6)]), 10, .32); noise(t, .022, () => 3600, u => (1 - u) * vol * .1, 1, pan, .15, 'hp'); },   // 硬く、短い。はじく爪の音を添える
      fife: (t, m, vol, pan = 0, len = .4) => { tone(t, m, vol * .055, len, pan, { harm: [1, .28, .1, .04], vib: .0035, att: .035, rel: .07, rev: .4 }); noise(t, len, () => Math.min(8000, hz(m) * 2.2), u => vol * .011 * Math.min(1, u * 12), 2, pan, .3); },   // 高い笛。息の音を少し混ぜる
      // やわらかい笛。高い音域で、倍音はほとんど入れない(倍音が多いとラッパに聞こえる)。小さく速い揺れ、吹きはじめのあと少し弱まる、息の音はごく弱く
      flute: (t, m, vol, pan = 0, len = .5) => { tone(t, m, vol * .088, len, pan, { harm: [1, .12, .04, .015], vib: .0055, vr: 6.2, vd: .18, att: .05, rel: .14, fall: .6, ft: .4, rev: .55 }); noise(t, len, () => Math.min(8000, hz(m) * 2), u => vol * .005 * Math.min(1, u * 10) * (1 - .5 * u), 1.6, pan, .4); },
      // はじく弦(ピチカート)。短く丸い
      pizz: (t, m, vol, pan = 0) => pluck(t, m, vol * .1, pan, .2 * Math.pow(440 / hz(m), .3), [[1, 1, 1], [2, .5, 1.5], [3, .28, 2.2], [4, .14, 3], [5, .07, 4]], 60, .4),
      pulse: (t, m, vol, pan = 0, len = .2) => tone(t, m, vol * .034, len, pan, { harm: [1, 0, 1 / 3, 0, 1 / 5, 0, 1 / 7, 0, 1 / 9, 0, 1 / 11], att: .003, rel: .02, rev: .1 }),   // 矩形波
      pulse25: (t, m, vol, pan = 0, len = .1) => tone(t, m, vol * .034, len, pan, { harm: [.71, .5, .24, 0, .14, .17, .1, 0, .08, .1], att: .003, rel: .015, rev: .08 }),   // 細い矩形波(和音を速くくずす用)
      tri: (t, m, vol, pan = 0, len = .3) => tone(t, m, vol * .1, len, pan, { harm: [1, 0, 1 / 9, 0, 1 / 25], att: .004, rel: .03, rev: .08 }),   // 三角波の低音
    };
    // 効果音と本そのものの音(表紙・めくり・おしまい)で鳴らす、音程のある音。既定はオルゴールで、曲集の inst.fx があればその音色に替える(下で決める)
    let ding = box, coarse = false;
    const snare = (t, vol = 1) => { noise(t, .11, () => 1900, u => (1 - u) ** 2 * vol * .15, .7, .1, .25); noise(t, .07, () => 6000, u => (1 - u) ** 3 * vol * .08, 1, .1, .2, 'hp'); };   // 小太鼓
    // フィルタ付きノイズ。fc(u)=中心周波数, amp(u)=音量(u は 0..1 の進行度), mode: 'bp' | 'lp' | 'hp'
    const noise = (t, len, fc, amp, q = 1.2, pan = 0, rev = .3, mode = 'bp') => jobs.push(() => {
      const i0 = Math.round(t * SR), n = Math.round(len * SR); let lo = 0, bd = 0, xh = 0;
      for (let i = 0; i < n; i++) {
        const u = i / n, f = 2 * Math.sin(PI * Math.min(fc(u), 9000) / SR), x = coarse && i % 6 ? xh : (xh = rand() * 2 - 1), hi = x - lo - bd / q;   // coarse = 粗い雑音(同じ値を数サンプル持つ。昔のゲーム機ふう) bd += f * hi; lo += f * bd;
        put(i0 + i, (mode === 'lp' ? lo : mode === 'hp' ? hi : bd) * amp(u), typeof pan === 'function' ? pan(u) : pan, rev);
      }
    });
    const thud = (t, vol = 1, f0 = 90, len = .35) => {                                // 低い打撃音
      jobs.push(() => { const i0 = Math.round(t * SR), n = Math.round(len * 4 * SR); let ph = 0; for (let i = 0; i < n; i++) { const x = i / SR, f = f0 * (.5 + .5 * Math.exp(-x / .08)); ph += 6.2832 * f / SR; put(i0 + i, Math.sin(ph) * Math.exp(-x / len) * vol * .5, 0, .25); } });
      noise(t, .12, () => 500, u => (1 - u) * (1 - u) * vol * .5, .8, 0, .3, 'lp');
    };
    const tick = (t, vol = 1, pan = 0) => { const f = 2500 + rand() * 2500; noise(t, .05, () => f, u => (1 - u) ** 3 * vol * .35, 2, pan, .4); ding(t, 84 + Math.floor(rand() * 12), vol * .12, pan, .7); };
    const sparkle = (t0, t1, n, vol = .5, base = 96) => { for (let i = 0; i < n; i++) ding(t0 + (t1 - t0) * (i + rand() * .6) / n, base + [0, 2, 4, 7, 9, 12, 14, 16][Math.floor(rand() * 8)], vol * (.5 + rand() * .5), rand() * 1.2 - .6, .8); };
    const tunes = Object.assign({}, TUNES, cfg.tunes), moods = Object.assign({}, MOODS, cfg.moods);
    // 曲集: 内蔵の名前か、書き下ろし { main: {chords, mel, beats}, sub: {…}, minor: {…}, tr, tempo }(足りない役は musicbox の曲)
    const qset = new URLSearchParams(location.search).get('set'), sv = qset || cfg.set || set0 || Object.keys(SETS)[0] || {};
    if (typeof sv === 'string' && !SETS[sv]) warn(`音: 曲集 '${sv}' はありません(使える名前: ${Object.keys(SETS).join(' ')})`);
    const set = Object.assign({}, baseSet, typeof sv === 'string' ? SETS[sv] : sv);
    for (const r of ['main', 'sub', 'minor']) { const v = set[r]; tunes[r] = typeof v === 'string' ? tunes[v] || TUNES[baseSet[r]] : v; if (typeof v === 'string' && !tunes[v]) warn(`音: 曲 '${v}' はありません`); }
    for (const r of ['main', 'sub', 'minor']) { const t = tunes[r]; if (!t && !Object.keys(SETS).length) continue; if (!t || !Array.isArray(t.chords) || !Array.isArray(t.mel) || t.chords.length !== t.mel.length) { warn(`音: 曲集の ${r} は chords と mel を同じ小節数で書く`); tunes[r] = TUNES[baseSet[r]]; } else t.chords.forEach(c => { if (!CH[c]) warn(`音: 和音 '${c}' はありません(使える名前: ${Object.keys(CH).join(' ')})`); }); }
    // 効果音の音色を曲集に合わせる。伸びる音色は短く切って鳴らす。hold = 締めの和音を伸ばす秒数(伸びる音色だけに効く。短く切ると「ピッ」で終わってしまうため)
    { const fx = (set.inst || {}).fx, FX = { harp: [VOICE.harp, 1], pizz: [VOICE.pizz, 1.5], koto: [VOICE.koto, 1], fife: [VOICE.fife, 1.9, .2], flute: [VOICE.flute, 1.2, .2], pulse: [VOICE.pulse, 2.8, .13] }[fx];
      if (FX) ding = (t, m, vol = 1, pan = 0, rev, hold) => FX[0](t, m, vol * FX[1] * (hold && FX[2] ? .6 : 1), pan, hold && FX[2] ? hold : FX[2]); coarse = (set.inst || {}).noise === 'coarse'; }
    // t0〜t1 のあいだ、曲 ph を鳴らす
    const phrase = (t0, t1, ph, o = {}) => {
      const { vol = 1, oct = 0, bass = 1, dbl = false, stac = false, startBar = 0 } = o, nb = ph.chords.length, nbeat = ph.beats || 3;
      const beat = (o.beat ?? .6) * (set.tempo ?? 1), tr = (o.tr || 0) + (set.tr || 0);
      // 曲集の inst = { mel, comp, bass, perc }: 旋律・伴奏・低音・打楽器の音色。書いていない曲集(オルゴール、作品が書き下ろした曲集)は、下のオルゴールの鳴らし方のまま
      const inst = set.inst, mel = inst && (VOICE[inst.mel] || VOICE.box), sus = inst && ['fife', 'flute', 'pulse', 'pulse25', 'tri'].includes(inst.mel);
      const voiced = (t, b, c, fade) => {
        const v = vol * fade, at = k => t + beat * k, live = k => at(k) < t1 - .1;
        for (let k = 0; k < nbeat; k++) if (live(k)) {
          const low = nbeat === 4 && k === 2 ? c[0] + 7 : c[0], onLow = k === 0 || (nbeat === 4 && k === 2);
          if (inst.bass === 'tri') VOICE.tri(at(k), low + tr, .8 * v * bass, 0, beat * (stac ? .4 : .85));   // 低音。三角波は毎拍、ほかは小節の頭(と4拍子の3拍目)
          else if (onLow) { if (inst.bass === 'koto') VOICE.koto(at(k), low + tr + 12, .6 * v * bass, -.1); soft(at(k), low + tr, (inst.bass === 'koto' ? .4 : k ? .55 : .8) * v * bass, stac ? .35 : k ? .9 : 1.3); }
          if (inst.comp === 'arp') { if (k) VOICE.harp(at(k), c[k % 2 ? 1 : 2] + tr, .34 * v, k % 2 ? -.3 : .3); }   // 分散和音: 和音の音を1つずつ
          else if (inst.comp === 'pizz') { if (!onLow) VOICE.pizz(at(k), c[1] + tr, .5 * v, -.3); if (live(k + .5)) VOICE.pizz(at(k + .5), c[2] + tr, .36 * v, .3); }   // ピチカート: 拍の表と裏で和音の音を1つずつ
          else if (inst.comp === 'koto') { if (!onLow) VOICE.koto(at(k), c[k % 2 ? 1 : 2] + tr, .3 * v, k % 2 ? -.3 : .3); }
          else if (inst.comp === 'chip') for (let j = 0; j < 4; j++) { if (at(k + j / 4) < t1 - .1) VOICE.pulse25(at(k + j / 4), c[1 + (j % 2)] + tr + (j > 1 ? 12 : 0), .42 * v, j % 2 ? .35 : -.35, beat / 4 * .8); }   // 和音を16分音符で速くくずす
          else if (inst.comp !== 'none' && !onLow) { VOICE.box(at(k), c[1] + tr, .32 * v, -.3); VOICE.box(at(k) + .012, c[2] + tr, .32 * v, .3); }
          if (inst.pad && k === 0) for (const [m, pn] of [[c[1], -.25], [c[2], .25]]) tone(at(0), m + tr, .013 * v, Math.min(beat * nbeat, t1 - at(0)) * .96, pn, { harm: [1, .4, .25, .14, .07], vib: .003, vr: 5.2, vd: .3, att: .3, rel: .35, rev: .6 });   // 弦を1小節伸ばす
          if (inst.perc === 'taiko') { if (k === 0) thud(at(k), .42 * v, 105, .28); else if (nbeat === 4 && k === 2) thud(at(k), .24 * v, 120, .2); }   // 低い太鼓を小節の頭と3拍目に
          else if (inst.perc === 'drum') { if (k % 2 === 0) thud(at(k), .3 * v, 95, .16); else snare(at(k), .8 * v); if (!stac && live(k + .5)) snare(at(k + .5), .28 * v); }   // 大太鼓は表、小太鼓は裏と刻み
          else if (inst.perc === 'chip') { if (k % 2) noise(at(k), .09, () => 2600, u => (1 - u) ** 2 * v * .12, .8, 0, .1); if (live(k + .5)) noise(at(k + .5), .035, () => 7500, u => (1 - u) * v * .05, 1.2, .2, .05, 'hp'); }
          else if (inst.perc === 'tsuzumi' && b % 2 && (k === 2 || k === nbeat - 1)) thud(at(k === 2 ? k : k + .5), (k === 2 ? .34 : .2) * v, 175, .09);   // 鼓の「ぽん」を2小節に一度
        }
        const ns = ph.mel[b % nb] || [];
        ns.forEach(([bo, m], i) => { if (!live(bo)) return; const len = Math.min(2, (i + 1 < ns.length ? ns[i + 1][0] : nbeat) - bo) * beat * (stac ? .45 : .9), pan = .1 * Math.sin(b + bo);
          mel(at(bo), m + tr + oct, (sus ? .9 : .95) * v, pan, len); if (dbl) mel(at(bo) + .01, m + tr + oct - 12, .5 * v, -.2, len); });
      };
      for (let b = startBar, t = t0; t < t1 - .15; b++, t += beat * nbeat) {
        const c = CH[ph.chords[b % nb]] || CH.C, fade = Math.min(1, (t1 - t) / 2.5 + .25) * Math.min(1, (t - t0) / 1.2 + .5);
        if (inst) { voiced(t, b, c, fade); continue; }
        soft(t, c[0] + tr, .8 * vol * bass * fade, stac ? .35 : 1.3);
        for (let k = 1; k < nbeat; k++) if (t + beat * k < t1 - .1) {
          if (nbeat === 4 && k === 2) { soft(t + beat * k, c[0] + tr + 7, .55 * vol * bass * fade, stac ? .3 : .9); continue; }   // 4拍子の3拍目は低音
          box(t + beat * k, c[1] + tr, .32 * vol * fade, -.3); box(t + beat * k + .012, c[2] + tr, .32 * vol * fade, .3); if (stac) soft(t + beat * k, c[0] + tr + 12, .4 * vol * bass, .2);
        }
        for (const [bo, m] of ph.mel[b % nb] || []) if (t + bo * beat < t1 - .1) { box(t + bo * beat, m + tr + oct, .95 * vol * fade, .1 * Math.sin(b + bo)); if (dbl) box(t + bo * beat + .01, m + tr + oct - 12, .5 * vol * fade, -.2); }
      }
    };
    const S = { TL, SR, O: TL.open, CH, hz, rand, box: (...a) => ding(...a), soft, noise, thud, tick, sparkle, tone, snare, voice: VOICE, phrase, tunes, moods };
    S.seq = (t, notes, gap, vol, rev) => seq(S, t, notes, gap, vol, rev);
    S.sfx = (name, t, o) => { const f = SFX[name]; if (f) f(S, t, o || {}); else warn(`音: 効果音 '${name}' はありません(使える名前: ${Object.keys(SFX).join(' ')})`); };

    if (def.sound !== false && !cfg.off) {
      const sp = def.spreads, k = TL.INTRO / 5.2;
      // --- 本そのものの音(表紙・ページめくり・とじる・おしまい) ---
      if (cfg.auto !== false) {
        [60, 64, 67, 72, 74, 76, 79, 84, 86, 88, 91, 96].forEach((m, i) => ding((.9 + i * .3) * k, m, .5 + i * .03, (i % 2 ? .4 : -.4), .8));
        sparkle(3.2 * k, 5.0 * k, 10, .35);
        // 表紙の締め: 上がっていく音のあと、本が開く所で和音を下から順に鳴らして「しゃらーん」と響かせる(おしまいの和音と同じ作り)
        { const o = TL.ts[0] + .1; [48, 60, 64, 67, 72, 76, 79, 84].forEach((m, i) => ding(o + i * .045, m, .7, i % 2 ? .3 : -.3, .9, .8)); soft(o, 36, .8, 1.6); sparkle(o + .3, o + 1.9, 8, .22); }
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
        const e = TL.tc + TL.CLOSE + .25; [48, 60, 64, 67, 72, 76, 84].forEach((m, i) => ding(e + i * .045, m, .8, 0, .9, .9)); soft(e, 36, 1, 2); sparkle(e + .3, e + 2.4, 10, .25);
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
