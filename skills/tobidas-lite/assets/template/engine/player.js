// tobidas player — ホイール/キー/タッチで作品の時刻を進めたり戻したりする。作品ごとに編集しない。
//   ホイール・↑↓ … 進む/戻る   ←→・PageUp/Down … 前後の見開きへ   ▶ボタン・Space … 自動再生(音つき)   M … 音のオン/オフ   Home/End … 最初/最後   D … デバッグ表示
//   左上のプルダウン … 画風・背景・曲の切り替え(?style= ?desk= ?set= を付けて読み直し、見ていた位置へ戻る。作品の theme.pickers: false で3つとも、theme.stylePicker: false で画風だけ出さない)
//   画面の文字(操作の案内・ボタンの説明・プルダウン)は、作品の lang が 'ja' なら日本語、ほかは英語。作品の ui: { … } で言語ごとに差し替えられる(references/book-api.md)
//   音は自動再生中だけ鳴る。どの位置から再生しても、その時刻の音から始まる(engine/sound.js が全体を合成しておく)。
//   URL: ?t=12.5 … その時刻の静止画だけ描く(チェック・動画化用。HUDなし)   ?autoplay … 自動再生で開始   ?debug … デバッグ表示   ?at=12.5 / ?at=open … その時刻 / 最初の見開きの中ほど(字幕が出そろった所)から始める   ?embed … 操作の案内と画風のプルダウンを出さない(聞き取りページの見本用)   ?nofilter ?zoom ?lite ?table ?afps … WebKit や重い機械向けの描き方を試す(references/pitfalls.md)
//   ほかのページに埋め込まれているときは、いまの時刻と再生中かどうかを親へ postMessage で知らせる(聞き取りページが、画風などを替えても同じ位置から、再生中なら再生したまま見せるために使う)
(function () {
  const q = Tobidas.query(), root = document.getElementById('tobidas');
  // 1920×1080 の舞台を、画面に合わせて縮める。WebKit は transform で縮めても、層を元の大きさ×画面の解像度で持つ(iPhone では元の約7倍の辺の長さになり、メモリが足りずにページが落ちる)。
  // そこで WebKit では zoom で縮め、層そのものを小さくする。?zoom / ?zoom=0 で切り替えて試せる
  const zoomFit = q.has('zoom') ? q.get('zoom') !== '0' : Tobidas.webkit;
  const fit = () => { const k = Math.min(innerWidth / 1920, innerHeight / 1080), x = (innerWidth - 1920 * k) / 2, y = (innerHeight - 1080 * k) / 2;
    if (zoomFit) { root.style.zoom = k.toFixed(5); root.style.transform = `translate(${(x / k).toFixed(1)}px,${(y / k).toFixed(1)}px)`; }   // zoom は transform の長さにも掛かるので、ずらす量は割っておく
    else root.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${k.toFixed(5)})`; };
  fit(); addEventListener('resize', fit);
  const start = () => {
    const TL = Tobidas.TL, ja = (Tobidas.def.lang || 'ja') === 'ja', UI = Tobidas.def.ui || {}, tx = (k, j, e) => UI[k] || (ja ? j : e);   // 画面の文字。作品の ui: { … } が先、なければ日本語か英語
    if (q.has('t')) { Tobidas.render(+q.get('t')); return; }             // 静止画モード
    const T0 = 1.5;   // 冒頭の暗転(動画用)は飛ばし、表紙が見えている所から始める
    const P = Tobidas.player = { speed: .006, snap: true, target: T0, t: T0, auto: q.has('autoplay'), dir: 1 };
    // 画風を切り替えて読み直したときは、見ていた位置から続ける
    try { const rs = sessionStorage.getItem('tobidas-resume'); sessionStorage.removeItem('tobidas-resume'); if (rs !== null && isFinite(+rs)) P.target = P.t = Math.max(T0, Math.min(TL.END, +rs)); } catch { }
    // 見開きの「開ききった時刻」= ジャンプ先・目盛り
    const stops = [T0]; for (let s = 1; s <= TL.N; s++) stops.push(TL.open(s) + .05); stops.push(TL.tc + TL.CLOSE + 1.2);
    { const at = q.get('at'), v = at === 'open' ? (TL.open(1) + TL.until(1)) / 2 : at === null ? NaN : +at; if (isFinite(v)) P.target = P.t = Math.max(T0, Math.min(TL.END, v)); }   // ?at= で始める位置を指定(open は最初の見開きの中ほど。字幕が出そろっている)
    const turns = TL.ts.map(a => [a, a + TL.TURN]).concat([[TL.tc, TL.tc + TL.CLOSE]]);
    // --- HUD ---
    const hud = document.createElement('div'); hud.id = 'tb-hud'; hud.innerHTML = `<div class="bar"><div class="fill"></div>${stops.slice(1).map(s => `<div class="tick" style="left:${(s / TL.END * 100).toFixed(3)}%"></div>`).join('')}</div>`;
    const hint = document.createElement('div'); hint.id = 'tb-hint'; hint.textContent = window.matchMedia && matchMedia('(pointer: coarse)').matches ? tx('hintTouch', 'スワイプでめくる ・ ▶ で再生(音つき)', 'Swipe to turn pages · ▶ to play with sound')   // 指で操作する画面では、ホイールやキーの案内を出さない
      : tx('hint', 'ホイールでめくる ・ ←→ 見開き ・ ▶ / Space で再生(音つき)', 'Scroll to turn pages · ←→ spreads · ▶ / Space to play with sound');
    if (q.has('embed')) hint.style.display = 'none';
    const dbg = document.createElement('div'); dbg.id = 'tb-debug'; if (q.has('debug')) dbg.style.display = 'block';
    // --- 再生ボタンと音 ---
    const IC = { play: '<path d="M8 5v14l11-7z"/>', pause: '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>', on: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>', off: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' };
    const ctl = document.createElement('div'); ctl.id = 'tb-ctl';
    const mkBtn = cls => { const b = document.createElement('button'); b.type = 'button'; b.className = cls; b.tabIndex = -1; ctl.append(b); return b; };
    const bPlay = mkBtn('play'), bSnd = mkBtn('snd');
    const hasSound = !!Tobidas.sound && Tobidas.def.sound !== false && !(Tobidas.def.sound && Tobidas.def.sound.off);
    if (!hasSound) bSnd.style.display = 'none';
    // --- 画風・背景・曲のプルダウン(どれも起動時に組み立てるので、?style= ?desk= ?set= を付けて読み直す。見ていた位置へ戻る)---
    // 作品が書き下ろした背景や曲は内蔵の一覧にないので、先頭に「この作品の…」を置いて戻れるようにする
    const dth = Tobidas.def.theme || {}, dsd = Tobidas.def.sound, lib = Tobidas.sound ? Tobidas.sound.lib() : {}, tdf = (Tobidas.themeDef && Tobidas.themeDef.defaults) || {}, short = s => String(s).replace(/\s*[((].*$/, '');
    const pk = document.createElement('div'); pk.id = 'tb-pick';
    const picker = (param, title, list, cur, own) => {
      if (list.length + (own ? 1 : 0) < 2) return;
      const sel = document.createElement('select'); sel.className = 'sty'; sel.tabIndex = -1; sel.title = title;
      const add = (v, label) => { const o = document.createElement('option'); o.value = v; o.textContent = label; o.selected = v === (q.get(param) || cur || ''); sel.append(o); };
      if (own) add('', own); for (const [k, v] of list) add(k, (UI.names && UI.names[k]) || short((!ja && v.en) || v.label || k));
      sel.addEventListener('change', () => { try { sessionStorage.setItem('tobidas-resume', P.target.toFixed(2)); } catch { } const u = new URLSearchParams(location.search); if (sel.value) u.set(param, sel.value); else u.delete(param); u.delete('autoplay'); u.delete('at'); location.search = u.toString(); });
      pk.append(sel);
    };
    if (dth.pickers !== false && !q.has('embed')) {
      // 画風のフィルタを掛けない環境(WebKit、?nofilter)では、選んでも見た目が変わらないので、画風のプルダウンは出さない
      if (dth.stylePicker !== false && !Tobidas.noFilter) picker('style', tx('style', '画風', 'Art style'), Object.entries(Tobidas.STYLES), typeof dth.style === 'string' ? dth.style : dth.style ? '' : tdf.style, dth.style && typeof dth.style === 'object' ? tx('ownStyle', 'この作品の画風', 'This book’s style') : '');
      const ownDesk = (dth.desk && typeof dth.desk === 'object') || Tobidas.def.spreads.some(sd => sd.scene);
      picker('desk', tx('desk', '背景', 'Backdrop'), Object.entries(Tobidas.DESKS), ownDesk ? '' : dth.desk || tdf.desk, ownDesk ? tx('ownDesk', 'この作品の背景', 'This book’s backdrop') : '');
      const ownSet = dsd && typeof dsd === 'object' && dsd.set && typeof dsd.set === 'object';
      if (hasSound) picker('set', tx('set', '曲', 'Music'), Object.entries(lib.sets || {}), ownSet ? '' : (dsd && dsd.set) || tdf.set, ownSet ? tx('ownSet', 'この作品の曲', 'This book’s music') : '');
    }
    const store = { get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch { } } };
    const AU = P.audio = { ctx: null, pcm: null, buf: null, src: null, gain: null, t0: 0, c0: 0, muted: store.get('tobidas-muted') === '1' };
    // 開いたらすぐ裏で合成しておく。聞き取りページの見本(?embed)では、同じ曲の合成済みの音を親のページから受け取れればそれを使い、なければ合成して親に預ける
    // (画風や背景を替えて読み直しても、音を作り直さずにすぐ鳴らすため)
    if (hasSound) {
      const emb = parent !== window && q.has('embed'), key = location.pathname + '|' + (q.get('set') || ''), got = r => { AU.pcm = r; ui(); };
      const make = () => Tobidas.sound.build().then(r => { got(r); if (emb) try { parent.postMessage({ tobidas: 'pcm', key, pcm: { L: r.L, R: r.R, N: r.N, SR: r.SR, dur: r.dur } }, '*'); } catch { } }, e => { AU.fail = true; console.error(e); });
      if (emb) { let done = false; const on = e => { if (done || e.source !== parent || !e.data || e.data.tobidas !== 'pcm' || e.data.key !== key) return; done = true; removeEventListener('message', on); if (e.data.pcm) got(e.data.pcm); else make(); };
        addEventListener('message', on); try { parent.postMessage({ tobidas: 'pcm?', key }, '*'); } catch { } setTimeout(() => { if (!done) { done = true; removeEventListener('message', on); make(); } }, 500); }
      else setTimeout(make, 200);
    }
    const wake = () => {                                  // 音を出せるようにする(ブラウザの決まりで、ユーザーの操作の中でしか始められない)
      if (!hasSound) return; const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      if (!AU.ctx) AU.ctx = new AC(); if (AU.ctx.state !== 'running') AU.ctx.resume().catch(() => { });
    };
    if (P.auto) wake();   // ?autoplay で開いたときは、音も始めてみる(ブラウザが許さなければ無音で進み、最初の操作で鳴りはじめる)
    const audioStart = t => {
      const c = AU.ctx; if (!AU.buf) { AU.buf = c.createBuffer(2, AU.pcm.N, AU.pcm.SR); AU.buf.copyToChannel(AU.pcm.L, 0); AU.buf.copyToChannel(AU.pcm.R, 1); }
      const src = c.createBufferSource(), g = c.createGain(), now = c.currentTime; src.buffer = AU.buf; src.connect(g); g.connect(c.destination);
      g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(1, now + .06); src.start(now, Math.max(0, t));
      src.onended = () => { if (AU.src === src) AU.src = null; };
      AU.src = src; AU.gain = g; AU.t0 = t; AU.c0 = now;
    };
    const audioStop = () => { const c = AU.ctx, now = c.currentTime, s = AU.src; AU.gain.gain.cancelScheduledValues(now); AU.gain.gain.setValueAtTime(AU.gain.gain.value, now); AU.gain.gain.linearRampToValueAtTime(0, now + .09); s.onended = null; s.stop(now + .11); AU.src = null; };
    let uiKey = '';
    const ui = () => {
      const k = `${P.auto}|${AU.muted}|${!!AU.pcm}`; if (k === uiKey) return; uiKey = k;
      bPlay.innerHTML = `<svg viewBox="0 0 24 24">${P.auto ? IC.pause : IC.play}</svg>`; bPlay.title = P.auto ? tx('pause', '止める (Space)', 'Pause (Space)') : tx('play', '再生 (Space)', 'Play (Space)');
      bSnd.innerHTML = `<svg viewBox="0 0 24 24">${AU.muted ? IC.off : IC.on}</svg>`; bSnd.title = AU.muted ? tx('unmute', '音を出す (M)', 'Unmute (M)') : tx('mute', '音を消す (M)', 'Mute (M)');
      bSnd.classList.toggle('wait', hasSound && !AU.pcm); ctl.classList.toggle('playing', P.auto); pk.classList.toggle('playing', P.auto);
    };
    const toggle = () => { wake(); P.auto = !P.auto; if (AU.src) audioStop(); if (P.auto) { if (P.target >= TL.END - .1) P.target = P.t = T0; else P.target = P.t; } input(); };
    const mute = () => { wake(); AU.muted = !AU.muted; store.set('tobidas-muted', AU.muted ? '1' : '0'); };
    bPlay.addEventListener('click', toggle); bSnd.addEventListener('click', mute);
    addEventListener('pointerdown', wake, true); addEventListener('keydown', wake, true);
    document.body.append(hud, ctl, pk, hint, dbg);
    const fill = hud.querySelector('.fill');
    let lastInput = performance.now(), touched = false;
    const input = () => { lastInput = performance.now(); if (!touched) { touched = true; setTimeout(() => hint.style.opacity = 0, 2500); } };
    const seek = (t, dir) => { P.target = Math.max(T0, Math.min(TL.END, t)); if (dir) P.dir = dir; input(); };
    const jump = d => { const cur = P.target; let to; if (d > 0) to = stops.find(s => s > cur + .3) ?? TL.END; else to = [...stops].reverse().find(s => s < cur - .3) ?? T0; P.auto = false; seek(to, d); };
    // --- 入力 ---
    addEventListener('wheel', e => { e.preventDefault(); const dy = (e.deltaMode === 1 ? e.deltaY * 33 : e.deltaMode === 2 ? e.deltaY * 800 : e.deltaY) + (e.deltaMode === 0 ? e.deltaX : 0); P.auto = false; seek(P.target + dy * P.speed * (e.shiftKey ? 3 : 1), Math.sign(dy)); }, { passive: false });
    addEventListener('keydown', e => {
      if (e.target && e.target.tagName === 'SELECT') return;   // プルダウンを選んでいる間は、矢印キーなどを本の操作に使わない
      const k = e.key;
      if (k === 'ArrowDown') { P.auto = false; seek(P.target + .6, 1); } else if (k === 'ArrowUp') { P.auto = false; seek(P.target - .6, -1); }
      else if (k === 'ArrowRight' || k === 'PageDown') jump(1); else if (k === 'ArrowLeft' || k === 'PageUp') jump(-1);
      else if (k === ' ') toggle(); else if (k === 'm' || k === 'M') mute();
      else if (k === 'Home') { P.auto = false; seek(T0, -1); } else if (k === 'End') { P.auto = false; seek(TL.END, 1); }
      else if (k === 'd' || k === 'D') dbg.style.display = dbg.style.display === 'block' ? 'none' : 'block'; else return;
      e.preventDefault();
    });
    let ty = null;
    addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
    addEventListener('touchmove', e => { e.preventDefault(); const y = e.touches[0].clientY, dy = ty - y; ty = y; P.auto = false; seek(P.target + dy * P.speed * 2.2, Math.sign(dy)); }, { passive: false });
    const barSeek = e => { P.auto = false; seek(e.clientX / innerWidth * TL.END); };
    hud.addEventListener('pointerdown', e => { barSeek(e); hud.setPointerCapture(e.pointerId); hud.onpointermove = barSeek; });
    hud.addEventListener('pointerup', () => { hud.onpointermove = null; });
    // --- ループ ---
    let prev = performance.now(), shown = -1;
    const born = performance.now();
    const loop = now => {
      const dt = Math.min(.1, (now - prev) / 1000); prev = now;
      // 音: 自動再生中だけ鳴らす。鳴っているあいだは音の時計に絵を合わせる(ずれないように)
      const want = P.auto && !AU.muted && AU.pcm && AU.ctx && AU.ctx.state === 'running';
      if (want && !AU.src && P.target < TL.END - .05) audioStart(P.target);
      else if (!want && AU.src && (P.auto || P.target < TL.END)) audioStop();   // 最後まで行って止まったときは余韻を残す
      ui();
      // 音の合成がまだ済んでいないあいだは、絵だけ先に進めずに待つ(合成に失敗したとき・音を消しているとき・8秒たっても済まないときは待たない)
      const waitSnd = P.auto && hasSound && !AU.muted && !AU.pcm && !AU.fail && now - born < 8000;
      if (P.auto && !waitSnd) { P.target = Math.min(TL.END, AU.src ? AU.t0 + (AU.ctx.currentTime - AU.c0) : P.target + dt); if (P.target >= TL.END) P.auto = false; }
      else if (P.snap && now - lastInput > 350) {     // ページめくりの途中で止めたら、めくりきる/戻す
        const tr = turns.find(([a, b]) => P.target > a + .02 && P.target < b - .02);
        if (tr) { const to = P.dir >= 0 ? tr[1] : tr[0]; P.target += Math.sign(to - P.target) * Math.min(Math.abs(to - P.target), dt * 1.6); }
      }
      P.t += (P.target - P.t) * (1 - Math.exp(-dt * (P.auto ? 30 : 9)));
      if (Math.abs(P.target - P.t) < .0005) P.t = P.target;
      Tobidas.render(P.t, now / 1000);
      if (P.t !== shown) {
        shown = P.t; fill.style.width = (P.t / TL.END * 100).toFixed(3) + '%';
        if (dbg.style.display === 'block') { const w = Tobidas.where(P.t); dbg.textContent = `t = ${P.t.toFixed(2)} / ${TL.END.toFixed(1)}\nspread ${w.spread}   tl = ${w.tl.toFixed(2)}${Tobidas.warnings.length ? '\n⚠ ' + Tobidas.warnings.join('\n⚠ ') : ''}`; }
        if (parent !== window && (Math.abs(P.target - (P.sent ?? -9)) > .05 || P.auto !== P.sentAuto)) { P.sent = P.target; P.sentAuto = P.auto; try { parent.postMessage({ tobidas: 'time', t: +P.target.toFixed(2), auto: P.auto }, '*'); } catch { } }
        document.dispatchEvent(new CustomEvent('tobidas:time', { detail: { t: P.t, auto: P.auto } }));   // 音声などを後付けするためのフック
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
  if (Tobidas.ready) start(); else document.addEventListener('tobidas:ready', start);
})();
