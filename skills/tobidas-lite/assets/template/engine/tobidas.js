// tobidas engine — 飛び出す絵本の機構。題材に依存しないので作品ごとに編集しない。
// 作品は book/book.js で Tobidas.book({...}) を呼んで定義する(references/book-api.md)。
// 時刻 t(秒)を渡すと1フレームを描く決定的な作りなので、スクロール操作・静止画チェック・動画化を同じコードで行える。

// ---- 作品側から使う共通ヘルパ(グローバル) ----
const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));            // clamp
const sm = x => { x = cl(x); return x * x * (3 - 2 * x); };             // smoothstep 0..1
const lerp = (a, b, u) => a + (b - a) * u;
const sin = Math.sin, cos = Math.cos, abs = Math.abs, PI = Math.PI;
const rnd = seed => { let s = (seed * 9301 + 49297) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }; // 再現可能な乱数
const F = n => n.toFixed(1);
// 画像ファイルの絵: w×h の箱に画像を置く SVG 片を返す。src は index.html から見たパス(作品の assets/ に置く)。
//   fit: 'meet' 全体が入るように(既定。下端・中央ぞろえ) / 'slice' 箱を埋めて余りを切る / 'fill' 縦横比を変えて箱いっぱい
//   crop: [x, y, 幅, 高さ] と size: [画像の幅, 高さ] を書くと、1枚の画像(アトラス)の一部だけを切り出す
const img = (src, w, h, o = {}) => {
  const par = { meet: 'xMidYMax meet', slice: 'xMidYMid slice', fill: 'none' }[o.fit || 'meet'] || o.fit;
  if (!o.crop) return `<image href="${src}" width="${w}" height="${h}" preserveAspectRatio="${par}"/>`;
  const [cx, cy, cw, ch] = o.crop, [sw, sh] = o.size || [cx + cw, cy + ch];
  return `<svg width="${w}" height="${h}" viewBox="${cx} ${cy} ${cw} ${ch}" preserveAspectRatio="${par}" overflow="hidden"><image href="${src}" width="${sw}" height="${sh}" preserveAspectRatio="none"/></svg>`;
};
// anim 内でのキャッシュ付き querySelector。最初に探すとき、同じ名前の部品が絵の中に2つ以上あれば警告する(最初の1つしか動かないため。
// 人物と動物を1枚の絵に描くと、どちらも '.hd' を持っていて、動物の首振りが人物の頭を回してしまう、など)
const QWHO = Symbol('who');
const qs = (el, q, sel) => {
  if (q[sel]) return q[sel];
  if (!(sel in q) && q[QWHO]) { const n = el.querySelectorAll(sel).length; if (n > 1) Tobidas.warnings.push(`${q[QWHO]}: 動き(anim)で動かす部分 '${sel}' が絵の中に ${n} 個あり、最初の1つしか動かない(1枚の絵に人物と動物など2体以上を描くと起きやすい。片方の部品の名前を変える)`); }
  return (q[sel] = el.querySelector(sel));
};
const qa = (el, q, sel) => q[sel] || (q[sel] = [...el.querySelectorAll(sel)]);
const rot = (n, a, x, y) => n && n.setAttribute('transform', `rotate(${a.toFixed(2)} ${x} ${y})`);
const many = (...fs) => (tl, el, q) => fs.forEach(f => f(tl, el, q));
// パーツ定義: 根元の位置 X,Y(見開き座標)、絵の元サイズ w0×h0、絵(SVGの中身)、オプション
const pc = (X, Y, w0, h0, art, o = {}) => { const k = o.k || 1; return Object.assign({ X, Y, w: w0 * k, h: h0 * k, art: k === 1 ? art : `<g transform="scale(${k})">${art}</g>` }, o); };
// 段々の構造物(城・塔・ひな壇・階段状の町など)。壁を手前から奥へ並べ、壁の上に床(屋根・テラス)を渡す。
// 壁と床は平行四辺形のリンクになっていて、ページの開閉に合わせて一緒に起き上がり、たたまれる(本物の飛び出す絵本の「箱」の仕掛け)。
//   terrace({ X: 0, Y: 560, step: 70, tiers: [ { w, h, art, top, d, lip, over }, ... ], dyn })
//   tiers は手前から順。w,h=壁の幅と高さ / art=壁の絵(文字列か (w,h)=>文字列)/ top=床の色か (w,d)=>絵。false で床なし
//   d=次の壁までの奥行き(既定 step)/ td=床の奥行き(既定 d。2つ先の壁まで渡すときに書く)/ lip=床を壁より手前へ出す量(ひさし)/ over=床を左右へ出す量 / opt=壁の pc オプション
//   壁の絵は、上のほうだけ描いて下を透明にしてもよい(軒先・欄干・アーチなど。後ろの壁が透けて見える)
//   X=0 なら背の上に置かれ、壁は山折り(既定 fold: -30。建物の角がこちらを向き、左右の面が別の向きに見える)になる。X≠0 なら片ページに収める。dyn は全部の壁に掛かる(op と sink が使える)
const terrace = o => {
  const { X = 0, Y, tiers, step = 70 } = o, walls = [], decks = []; let y = Y;
  tiers.forEach((t, i) => {
    const cross = X - t.w / 2 < 0 && X + t.w / 2 > 0, d = t.d ?? step;
    const wall = pc(X, y, t.w, t.h, typeof t.art === 'function' ? t.art(t.w, t.h) : t.art || '', Object.assign({ sh: false, sway: 0, delay: o.delay ?? .1, tier: i }, cross ? { fold: o.fold ?? -30 } : null, o.dyn ? { dyn: o.dyn } : null, t.opt));
    walls.push(wall);
    if (t.top !== false && (t.d != null || t.top != null || i < tiers.length - 1)) { const td = t.td ?? d, lip = t.lip ?? 0, over = t.over ?? 0, dw = t.w + over * 2, dh = td + lip;
      decks.push({ deck: { host: wall, d: td, lip, over }, X, Y: y, w: dw, h: dh, flt: t.flt, art: typeof t.top === 'function' ? t.top(dw, dh) : `<rect width="${dw}" height="${dh}" fill="${t.top || '#d8d2c4'}"/>` }); }
    y -= d;
  });
  return walls.concat(decks);
};
// 途中から「ぽん」と現れるときの拡大率(tl が t0 を過ぎると 0→1、少し行き過ぎて戻る)
const pop = (tl, t0, d = .5) => { const u = cl((tl - t0) / d); return u <= 0 ? 0 : 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2); };
const FONT = '"Noto Serif CJK JP","Noto Serif JP","Hiragino Mincho ProN","Yu Mincho",serif';

const Tobidas = (function () {
  const W = 720, H = 920;
  const T = { W, H, def: null, TL: null, ready: false, warnings: [] };
  const eio = x => { x = cl(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const back = x => { x = cl(x); const c = 1.4; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const $ = id => document.getElementById(id);
  const div = (cls, parent) => { const e = document.createElement('div'); e.className = cls; if (parent) parent.appendChild(e); return e; };
  // WebKit では、文字(<text>)の塗りと線がグラデーションの参照(url(#…))だと、macOS のアプリ内表示で文字が描かれない(図形の塗りや線は描かれる)。同じ絵の中にあるグラデーションの、まん中の色のベタ塗りに置き換える
  const flatText = s => !T.webkit || s.indexOf('<text') < 0 ? s : s.replace(/<text\b[^>]*>/g, tag => tag.replace(/\b(fill|stroke)="url\(#([\w-]+)\)"/g, (m, k, id) => {
    const g = s.match(new RegExp(`<(linear|radial)Gradient\\b[^>]*\\bid="${id}"[\\s\\S]*?</\\1Gradient>`)), st = g && g[0].match(/stop-color="[^"]+"/g);
    return st ? `${k}="${st[st.length >> 1].slice(12, -1)}"` : m; }));
  const svgWrap = (w, h, inner, flt = true, vb) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb || `0 0 ${w} ${h}`}" width="${w}" height="${h}" style="overflow:visible;display:block">${flt && !T.noFilter ? `<g filter="url(#paper)"><rect width="${w}" height="${h}" fill="none"/>${flatText(inner)}</g>` : flatText(inner)}</svg>`;   // 透明な四角は、フィルタのかかる範囲を「絵の箱」に固定するため。これがないと範囲が絵の形(腕の動きなど)で変わり、ます目を敷く画風(ドット絵・網点)でパーツが消えたり現れたりする
  const noise = (fx, fy, mat, sz = 800) => `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${sz}' height='${sz}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${fx} ${fy}' numOctaves='3' seed='8' stitchTiles='stitch'/><feColorMatrix type='matrix' values='${mat}'/></filter><rect width='${sz}' height='${sz}' filter='url(#n)'/></svg>`).replace(/'/g, '%27')}')`;
  // カメラの基本姿勢。d=引き(大きいほど遠い) tilt=見下ろし角 yaw=机上での回転 cx,cy,cz=注視点
  T.pose = o => Object.assign({ d: 330, tilt: 52, yaw: 0, cx: 0, cy: -30, cz: 150 }, o);

  // ==== テーマ ====  画風・机・曲などの素材は themes/<名前>/theme.js が Tobidas.theme({...}) で登録する(書式は references/theme-format.md)。
  // テーマを書くための部品: 画風の filter 用に fx.edge / fx.grain / fx.tex、机の background 用に fx.noise / fx.planks / fx.grid。
  const fGrain = (slope, icpt, freq = .75) => `<feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="g2"><feFuncR type="linear" slope="${slope}" intercept="${icpt}"/><feFuncG type="linear" slope="${slope}" intercept="${icpt}"/><feFuncB type="linear" slope="${slope}" intercept="${icpt}"/><feFuncA type="linear" slope="0" intercept="1"/></feComponentTransfer>`;
  const fEdge = (r, c, name = 'edge') => `<feMorphology in="SourceAlpha" operator="dilate" radius="${r}" result="d${name}"/><feFlood flood-color="${c}"/><feComposite in2="d${name}" operator="in" result="${name}"/>`;
  const fTex = (src = 'SourceGraphic', a = 'SourceAlpha') => `<feBlend in="${src}" in2="g2" mode="multiply" result="b"/><feComposite in="b" in2="${a}" operator="in" result="tex"/>`;
  const planks = (line, mat, c) => `repeating-linear-gradient(0deg, ${line} 0 5px, rgba(0,0,0,0) 5px 620px), ${noise(.003, .09, mat)}, linear-gradient(90deg,${c[0]},${c[1]})`;
  const grid = (c, step, w) => `repeating-linear-gradient(0deg, ${c} 0 ${w}px, rgba(0,0,0,0) ${w}px ${step}px), repeating-linear-gradient(90deg, ${c} 0 ${w}px, rgba(0,0,0,0) ${w}px ${step}px)`;
  T.fx = { grain: fGrain, edge: fEdge, tex: fTex, noise, planks, grid };
  // 埋め込んだファイル(パス → データURL)。file:// では音声ファイルを読めないので、scripts/embed-audio.mjs が assets/audio.js に埋め込んで登録する
  T.assets = {}; T.asset = (src, dataUrl) => { T.assets[src] = dataUrl; };
  T.VERSION = 1;
  // URL の ?…(画風や時刻の指定)。URL を持てない埋め込み(聞き取りページが srcdoc で見せる見本)では、親が window.TOBIDAS_QUERY に同じ書式の文字列を書いておく
  // WebKit(Safari、iOS の全ブラウザ、macOS のアプリ内表示)かどうか。描き方を一部変える(references/pitfalls.md の「WebKit」)
  T.webkit = /AppleWebKit/.test(navigator.userAgent) && !/Chrom(e|ium)/.test(navigator.userAgent);
  T.query = () => new URLSearchParams(typeof window.TOBIDAS_QUERY === 'string' ? window.TOBIDAS_QUERY : location.search);
  // テーマが読み込まれていないときの控え(仕上げなし・無地の机)
  T.STYLES = { plain: { label: '仕上げなし', filter: `<feMerge><feMergeNode in="SourceGraphic"/></feMerge>`, grain: .2, shadow: 1 } };
  T.DESKS = { plain: { label: '無地', background: 'linear-gradient(90deg,#8d8d8d,#6f6f6f)', room: ['#4a4a4a', '#242424', '#101010'], light: '255,255,255' } };
  T.themeDef = null;
  T.theme = function (th) {
    T.themeDef = th; if (th.styles) T.STYLES = th.styles; if (th.desks) T.DESKS = th.desks;
    if ((th.engine || 1) > T.VERSION) T.warnings.push(`テーマ '${th.id}' はエンジン ${th.engine} 用です(このエンジンは ${T.VERSION})`);
  };
  const pick = (table, v, dflt, what, warn) => { const first = table[dflt] ? dflt : Object.keys(table)[0], name = typeof v === 'string' ? v : (v && v.base) || first; if (!table[name]) warn.push(`${what} '${name}' はありません(使える名前: ${Object.keys(table).join(' ')})`); return Object.assign({ name }, table[name] || table[first], typeof v === 'object' ? v : null); };

  T.book = function (def) { T.def = def; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build(); };

  const ANIM_FPS = 25;   // 絵の中の動き(anim)を描き直す回数(毎秒)
  const TABLE_RES = .5;   // 机の面を描く canvas の細かさ(CSS の 1px あたりの画素数)
  const FOLD = 12, FOLD_MIN = 200;   // 背をまたぐ横長パネルを折る角度の既定(度。一番奥は正、ほかは負)と、自動で折る条件(左右それぞれの張り出しがこれ以上)
  let leaves, spreads, N, NL, CAM, world, dctx, motes, capIdx = -1, capSpans = [];

  function build() {
    const def = T.def, dt = def.theme || {}, qp = T.query();   // ?style= ?desk= で内蔵の画風・机を試せる
    // WebKit(Safari、iOS の全ブラウザ、WKWebView)は、立体の中にある絵に SVG フィルタの参照があると、立ち上がるパーツを描かない。そこでは参照を付けずに描く(画風の縁取りや質感は出ない)。?nofilter で常に外し、?nofilter=0 で常に付ける
    { const v = qp.get('nofilter'); T.noFilter = v != null ? v !== '0' : T.webkit; }
    // 絵の中の動き(anim。煙・腕・伸びる木など)は、操作できる再生のときだけ毎秒 ANIM_FPS 回に間引く。動かすたびにパーツの絵を描き直すことになり、画風のフィルタが付いていると重いため(板の移動・回転は毎コマ動かす)。
    // 時刻が変わらないコマでは呼ばない。?t= の静止画モード(検査・動画化)では間引かない。?afps=<回数> で変えられ、?afps=0 で間引かない
    { const v = qp.get('afps'), f = v != null ? +v : qp.has('t') ? 0 : ANIM_FPS; T.animStep = f > 0 ? 1 / f : 0; }
    const td = (T.themeDef && T.themeDef.defaults) || {}; if (!T.themeDef) T.warnings.push('テーマが読み込まれていません(index.html で theme/theme.js を読み込む)');
    const ST = T.style = pick(T.STYLES, qp.get('style') || dt.style, td.style, '画風', T.warnings), DK = T.desk = pick(T.DESKS, qp.get('desk') || dt.desk, td.desk, '机', T.warnings);
    const th = Object.assign({ board: '#174536', spine: '#123a2d', paper: '#f6ecd6', room: DK.room, light: DK.light, font: FONT }, dt);
    if (qp.get('desk')) { th.room = DK.room; th.light = DK.light; }
    N = def.spreads.length; NL = N + 1;
    // --- 時間軸 ---
    const tm = Object.assign({ intro: 5.2, turn: 2.4, close: 2.8, outro: 3.8 }, def.timing || {});
    const ts = []; let t = tm.intro;
    def.spreads.forEach((s, i) => { ts[i] = t; t += tm.turn + (s.hold ?? 7.5); });
    const TL = T.TL = { INTRO: tm.intro, TURN: tm.turn, CLOSE: tm.close, ts, tc: t, END: t + tm.close + tm.outro, N, FPS: 30, open: s => ts[s - 1] + tm.turn, until: s => (s < N ? ts[s] : t) };
    // --- 舞台 ---
    const root = $('tobidas'); document.title = def.title || document.title;
    // ?hide=セレクタ … 当てはまる要素を消す(描画の乱れの切り分け用)。パーツと影には data-p="見開き-番号" が付いている。例: ?hide=.sh(影を全部)、?hide=[data-p="7-9"](見開き7のパーツ#9 と、その影)
    if (qp.get('hide')) { const st = document.createElement('style'); st.textContent = `${qp.get('hide')} { display: none !important; }`; document.head.append(st); }
    root.classList.toggle('tb-lite', qp.has('lite') && qp.get('lite') !== '0');   // ?lite … 飾りの層(ほこり・ぼけ・影のぼかし・光の合成)を省く。重い機械での切り分け用
    root.style.cssText += `--board:${th.board};--spine:${th.spine};--paper:${th.paper};--room1:${th.room[0]};--room2:${th.room[1]};--room3:${th.room[2]};--light:${th.light};--font:${th.font}`;
    root.innerHTML = `
      <div id="tb-scene"></div>
      <div class="bokeh" style="left:200px;top:-60px;width:260px;height:260px;background:rgba(255,190,110,.22)"></div>
      <div class="bokeh" style="left:1380px;top:20px;width:200px;height:200px;background:rgba(255,160,90,.16)"></div>
      <div class="bokeh" style="left:900px;top:-90px;width:300px;height:300px;background:rgba(255,220,160,.12)"></div>
      <div id="tb-stage"><div id="tb-world"><div id="tb-table"></div><div id="tb-deco"></div><div id="tb-shadowR"></div><div id="tb-shadowL"></div></div></div>
      <div id="tb-ov"><div id="tb-grade"></div><div id="tb-light"></div><canvas id="tb-dust" width="1920" height="1080"></canvas><div id="tb-vig"></div><div id="tb-capbg"></div><div id="tb-cap"></div><div id="tb-end"></div><div id="tb-fade"></div></div>
      <svg width="0" height="0" style="position:absolute"><defs><filter id="paper" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">${ST.filter}</filter></defs></svg>`;
    world = $('tb-world');
    // 机: background は机の面(3D の板)の CSS。scene があれば、机の代わりに「動く背景」を本の後ろ(画面いっぱい)に置き、軽くぼかす
    // 見開きに scene を書くと、その見開きのあいだだけ背景が切り替わる(めくりに合わせてなめらかに入れ替わる)。表紙と結びは机の scene、なければ最初と最後の見開きの scene
    const SCN = DK.scene || null, perSpread = !qp.get('desk') && def.spreads.some(sd => sd.scene),   /* ?desk= で内蔵を選んだら、作品が見開きごとに書いた背景は使わない */ hasTable = !!DK.background && !perSpread;
    $('tb-table').style.background = hasTable ? (typeof DK.background === 'function' ? DK.background(th) : DK.background) : 'none';
    // 机の面は、1回だけ canvas に描いた絵に差し替える。CSS の背景のままだと、Chrome は奥へ倒した 6000×4600 の板の全面を手前の拡大率で描いて持ち、
    // Retina の大きな窓ではそれだけでタイル用メモリの上限(約 625MB)の半分以上を使って、ほかの層が描かれずに点滅する(pitfalls.md)。canvas なら絵の大きさぶんで済む。
    // ?table=<倍率> で canvas の細かさを変える(既定 TABLE_RES)。?table=0 で差し替えない
    const tres = qp.get('table') != null ? +qp.get('table') : TABLE_RES;
    const bake = !hasTable || !(tres > 0) ? Promise.resolve() : new Promise(res => {
      const old = $('tb-table'), TW = 6000, TH = 4600, esc = x => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); let done = false;
      const fin = () => { if (!done) { done = true; res(); } }; setTimeout(fin, 4000);   // 描けなかったら、CSS の背景のまま続ける
      const load = src => new Promise((ok, ng) => { const im = new Image(); im.onload = () => ok(im); im.onerror = ng; im.src = src; });
      // 背景の中の模様(fx.noise の SVG)は、先に元の大きさのまま画像にしておく。Safari は、SVG フィルタの模様を 3000px を超えて引き伸ばして描くと、模様を描かずに捨てる(大理石の石目が出ない)
      const bg0 = old.style.background, pats = [...new Set([...bg0.matchAll(/url\("(data:image\/svg\+xml[^"]*)"\)/g)].map(m => m[1]))];
      Promise.all(pats.map(u => load(u.replace(/\\(.)/g, '$1')).then(im => { const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0); return [u, c.toDataURL('image/png')]; }).catch(() => [u, u])))
        .then(rs => { let bg = bg0; rs.forEach(([u, v]) => { bg = bg.split(u).join(v); });
          return load('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${TH}"><foreignObject width="${TW}" height="${TH}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${TW}px;height:${TH}px;border-radius:30px;background:${esc(bg)}"></div></foreignObject></svg>`)); })
        .then(im => (im.decode ? im.decode().catch(() => { }) : Promise.resolve()).then(() => im))   // 復号が済むのを待つ。待たずに描くと、Safari は中に埋めた模様の画像を飛ばして描く
        .then(im => { if (done) return; const c = document.createElement('canvas'); c.width = Math.round(TW * tres); c.height = Math.round(TH * tres); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); c.id = 'tb-table'; c.style.borderRadius = '0'; old.replaceWith(c); })
        .catch(() => { }).then(fin);
    });
    T.scenes = null;
    if (SCN || perSpread) {
      root.classList.add('has-scene');
      const se = $('tb-scene'), first = SCN || def.spreads.find(sd => sd.scene).scene, blur = first.blur ?? 5;
      const mk = sc => { const d = div('tb-sc', se); d.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">${typeof sc.svg === 'function' ? sc.svg(th) : sc.svg}</svg>`; return { sc, el: d, svg: d.firstChild, q: { [QWHO]: '背景(scene)' }, on: true }; };
      se.style.filter = blur > 0 ? `blur(${blur}px)` : '';
      const base = SCN ? mk(SCN) : null, per = def.spreads.map(sd => perSpread && sd.scene ? mk(sd.scene) : null), ix = per.map((L, i) => L ? i : -1).filter(i => i >= 0);
      T.scenes = { base, per, first: base ? -1 : ix[0], last: base ? -1 : ix[ix.length - 1], shadow: first.shadow ?? .4 };
      $('tb-shadowR').style.opacity = T.scenes.shadow;
      if (!base && ix.length < def.spreads.length) T.warnings.push('背景(scene)のない見開きがあります。見開きごとに背景を書くなら全部の見開きに書くか、theme.desk に全体の背景を指定する');
    }
    if (def.tableDeco && (!T.scenes || hasTable)) { // 机に散らす小物(机の面がない背景では置かない): (i, r) => SVG片(原点まわりに描く)
      const r = rnd(31); let s = '';
      for (let i = 0; i < (def.tableDecoCount || 26); i++) {
        let x = r() * 3000, y = r() * 2000; if (x > 660 && x < 2340 && y > 480 && y < 1520) x = x < 1500 ? x - 700 : x + 700;
        s += `<g transform="translate(${F(x)} ${F(y)}) rotate(${F(r() * 360)}) scale(${F(.8 + r() * .7)})">${def.tableDeco(i, r)}</g>`;
      }
      $('tb-deco').innerHTML = svgWrap(3000, 2000, s, false);
    }
    const end = def.end || {}; $('tb-end').innerHTML = `${end.title || ''}<small>${end.sub || ''}</small>`;
    // --- 本 ---
    const grain = `<div class="grain" style="opacity:${ST.grain ?? .5};background-image:${noise(.9, .9, '0 0 0 0 .5  0 0 0 0 .4  0 0 0 0 .25  0 0 0 .5 0')}"></div>`;
    leaves = [];
    for (let i = 0; i < NL; i++) {
      const el = div('leaf p3', world), L = { el };
      // ほぼ同じ高さに重なる面は、立体の中で別々の面にしない。紙面・その上に落ちる影・紙面のまわりに見える表紙の板と束の縁(.rim)を、
      // 面ごとの平らな入れ物(.ground)にまとめて、書いた順に重ねる。ページの下には、机と影のほかに面を置かない(pitfalls.md)
      ['front', 'back'].forEach(k => { if (k === 'back' && i === NL - 1) return; const f = div('face p3 ' + k, el), g = div('ground', f); L[k] = f; L[k + 'Ground'] = g;
        if (i === 0 && k === 'front') div('spineL', g); else { L[k + 'Rim'] = div('rim', g); div('block', L[k + 'Rim']); }   // 表紙の表は板そのものなので、縁は要らない。とじた本の背だけ足す
        L[k + 'Paper'] = div('paper', g); });
      leaves.push(L);
    }
    const printPage = (L, k, inner, vb) => { const p = L[k + 'Paper']; p.innerHTML = svgWrap(W, H, inner, false, vb) + grain + `<div class="gut"></div><div class="shade"></div>`; L[k + 'Shade'] = p.querySelector('.shade'); if (ST.pageFilter) p.firstElementChild.style.filter = ST.pageFilter; };   // 画風の pageFilter は、ページに印刷された地面の絵だけにかける
    { const p = leaves[0].frontPaper; p.style.cssText = `left:0;top:-14px;width:738px;height:948px;right:auto;bottom:auto;border-radius:0 14px 14px 0;background:${th.board}`;
      p.innerHTML = svgWrap(738, 948, def.cover || '', false) + grain.replace('class="grain"', 'class="grain" data-c') + `<div class="sheen"></div><div class="shade"></div>`;
      p.querySelector('.grain').style.opacity = .35; leaves[0].frontShade = p.querySelector('.shade'); leaves[0].sheen = p.querySelector('.sheen'); }
    spreads = [null];
    def.spreads.forEach((sd, si) => {
      const s = si + 1, LF = leaves[s - 1], RF = leaves[s];
      printPage(LF, 'back', sd.ground || '', `0 0 ${W} ${H}`); printPage(RF, 'front', sd.ground || '', `${W} 0 ${W} ${H}`);
      const rt = { def: sd, pieces: [], shown: true };
      const foldOf = sp => { const x0 = sp.X - sp.w / 2, x1 = sp.X + sp.w / 2; return x0 < 0 && x1 > 0 && !sp.nosplit && !sp.yaw ? (sp.fold ?? (Math.min(-x0, x1) >= FOLD_MIN ? NaN : 0)) : 0; };   // NaN = 向きはおまかせ
      // 折る向きを奥から順に決める。おまかせ(NaN)のパネルは、一番奥なら正(端が手前)。それより手前は負(端が奥)にするが、
      // 奥にある正のパネルのどれかと近すぎて、逆向きにすると端で交差するなら正にそろえる(重なる幅の端で、両者の根元が入れ替わらないだけの Y の差が要る)
      const folds = new Map(), pos = [], tanF = f => Math.tan(Math.abs(f) * PI / 180);
      const clash = (q, sp) => { const ext = Math.max(Math.min(q.w / 2 - q.X, sp.w / 2 - sp.X), Math.min(q.w / 2 + q.X, sp.w / 2 + sp.X)); return sp.Y - q.Y < (tanF(folds.get(q)) + tanF(FOLD)) * ext + 6; };
      (sd.pieces || []).filter(sp => foldOf(sp) !== 0).sort((a, b) => a.Y - b.Y).forEach((sp, i) => { let f = foldOf(sp); if (f !== f) f = i === 0 || pos.some(q => clash(q, sp)) ? FOLD : -FOLD; folds.set(sp, f); if (f > 0) pos.push(sp); });
      (sd.pieces || []).forEach((sp, idx) => {
        if (sp.deck) return;   // 構造物の床は、壁を作ったあとで下でまとめて作る
        const x0 = sp.X - sp.w / 2, x1 = sp.X + sp.w / 2, yaw = sp.yaw || 0, crosses = x0 < 0 && x1 > 0;
        const split = crosses && !sp.nosplit && !yaw;
        // 左右とも背から大きく張り出す横長パネルは、背で「くの字」に折る(V字折り)。fold は折る角度(度)。0 なら折らない。
        // 正なら端が手前に出て奥へたたまれ、負なら端が奥へ引いて手前へたたまれる。おまかせの向きは上の folds で決めてある。
        const fold = split ? folds.get(sp) ?? 0 : 0;
        if (split && sp.dyn) { const d = sp.dyn(1) || {}; if (d.dx || d.yaw || d.rzBase) T.warnings.push(`見開き${s} パーツ#${idx}: 背をまたぐパーツを動かすなら nosplit:true が必要`); }
        if (split && !fold && sp.fold == null) {   // 折られずに切り分けられる = めくるとき左右に分断されて見える
          const over = Math.min(-x0, x1), toL = x1 < -x0, nx = toL ? Math.floor(sp.X - x1 - 4) : Math.ceil(sp.X - x0 + 4);
          T.warnings.push(`見開き${s} パーツ#${idx}: 背を${toL ? '右' : '左'}へ ${Math.ceil(over)} だけまたいでいて、めくるとき左右に分断される(片ページに収めるなら X を ${nx} ${toL ? '以下' : '以上'}にするか幅を縮める。背の上に置きたいなら fold: 12 か fold: -12 でくの字に折る。動かす物なら nosplit: true)`);
        }
        if (fold < 0 && sp.Y + sp.h > H + 60) T.warnings.push(`見開き${s} パーツ#${idx}: 手前へたたまれる折れパネルが高すぎて、とじるときページの手前へ ${Math.ceil(sp.Y + sp.h - H)} はみ出す(fold: 12 で奥へたたむ向きにするか、高さを ${Math.floor(H + 60 - sp.Y)} 以下にする)`);
        if (sp.Y < 0 || sp.Y > H || Math.abs(sp.X) > W) T.warnings.push(`見開き${s} パーツ#${idx}: 根元 (${sp.X},${sp.Y}) がページの外`);
        (split ? ['L', 'R'] : [(sp.side || (sp.X < 0 ? 'L' : 'R')) + '!']).forEach(pt => {
          const side = pt[0], face = side === 'L' ? LF.back : RF.front, ground = side === 'L' ? LF.backGround : RF.frontGround, lx = side === 'L' ? sp.X + W : sp.X, cut = pt.length === 1;
          let html = svgWrap(sp.w, sp.h, sp.art, sp.flt !== false), ew = sp.w, eh = sp.h, ox = 0, oy = 0;
          if (cut) { // 背をまたぐパーツは左右のページに切り分ける(同一平面で重ねると片側が描かれない)
            ox = side === 'L' ? -60 : -x0; ew = side === 'L' ? 60 - x0 : x1 + 60; oy = -300; eh = sp.h + 300;   // 下端は根元ちょうどで止める(ページ面より下にはみ出すと、板がページと交差して前後判定が狂い、下半分が消える)
            html = `<div style="position:absolute;left:${-ox}px;top:300px;contain:paint">${html}</div>`;   // contain で中の絵を「絵の箱」の中に閉じる(GPU描画のとき、板の上の余白に縦の光の筋が出るのを防ぐ。箱を板いっぱいに広げると筋が戻る。will-change で独立レイヤーにする方法は、ヘッドレス描画で右半分が消える。pitfalls.md)。このため、切り分けた板では絵を箱の外へはみ出させられない
          }
          const mk = c => { const e = div(c, c === 'sh' ? ground : face); e.dataset.p = `${s}-${idx}`; e.innerHTML = html; e.style.width = ew + 'px'; e.style.height = eh + 'px'; if (cut) { e.style.overflow = 'hidden'; e.style.transformOrigin = `${fold ? (side === 'L' ? ew : 0) : sp.w / 2 - ox}px ${sp.h - oy}px`; } return e; };
          const sh = sp.sh !== false ? mk('sh') : null, el = mk('pc');
          if (cut && Math.abs(fold) >= 20 && side === 'L' && !sp.glow) el.style.filter = 'brightness(.82)';   // 深く折った板は、左の面を少し暗くして面の向きの違いを見せる
          if (sp.glow) el.style.filter = `drop-shadow(0 0 ${Math.min(sp.glow, 30)}px ${sp.glowC || 'rgba(255,236,160,.9)'})`;   // 30px を超えると、光の範囲が四角く切れて見えるので頭打ちにする
          const ox0 = cut ? (fold ? (side === 'L' ? ew : 0) : sp.w / 2 - ox) : sp.w / 2;   // 回転の中心から、板の左右の端までの距離(xl は負)
          rt.pieces.push({ sp, el, sh, lx, ox, oy, idx, xl: -ox0, xr: ew - ox0, q: { [QWHO]: `見開き${s} パーツ#${idx}` }, side, cut, faces: cut ? null : { L: LF.back, R: RF.front }, grounds: cut ? null : { L: LF.backGround, R: RF.frontGround }, ph: idx * 1.7, vis: true, delay: sp.delay ?? (.04 + .3 * sp.Y / H), fold: cut ? fold : 0, fz: side === 'L' ? -fold : fold, fk: Math.sin(Math.abs(fold) * PI / 180) });
        });
      });
      // 構造物の床(terrace の deck): 壁(host)と同じページに、ページと平行な板として置く。背をまたぐ壁なら左右に分ける
      (sd.pieces || []).forEach((sp, idx) => { if (!sp.deck) return; const hs = sp.deck.host, over = sp.deck.over;
        rt.pieces.filter(P => P.sp === hs).forEach(hp => {
          const x0 = hs.X - hs.w / 2, x1 = hs.X + hs.w / 2, len = hp.cut ? (hp.side === 'L' ? over - x0 : x1 + over) : sp.w;
          const e = div('pc', hp.side === 'L' ? LF.back : RF.front); e.style.cssText += `width:${len}px;height:${sp.h}px;overflow:hidden;transform-origin:0 0`;
          e.innerHTML = `<div style="position:absolute;left:${hp.cut && hp.side === 'R' ? len - sp.w : 0}px;top:0;contain:paint">${svgWrap(sp.w, sp.h, sp.art, sp.flt !== false)}</div>`;
          rt.pieces.push({ sp, el: e, sh: null, idx, deck: true, host: hp, xoff: hp.cut ? (hp.side === 'L' ? -len : 0) : -sp.w / 2, vis: true });
        });
      });
      // 折れたパネルは、端へ行くほど根元が手前(fold が正)か奥(負)へずれる。Y で決めたつもりの前後が、その位置で逆になっていないかを調べる
      const baseY = (P, x) => P.sp.Y + Math.abs(x) * Math.tan(P.fold * PI / 180), seen = {};
      rt.pieces.filter(F => F.fold).forEach(F => {
        const c = Math.cos(F.fold * PI / 180), fa = F.fz * F.fold < 0 ? (F.sp.X - F.sp.w / 2) * c : 0, fb = F.fz * F.fold < 0 ? 0 : (F.sp.X + F.sp.w / 2) * c;
        rt.pieces.forEach(Q => {
          const key = Q.fold ? Math.min(F.idx, Q.idx) + '/' + Math.max(F.idx, Q.idx) : F.idx + ':' + Q.idx;
          if (Q.sp === F.sp || Q.fold === F.fold || Q.deck || F.sp.tier != null && Q.sp.tier != null || seen[key]) return;   // 床と、同じ構造物の壁どうしは調べない
          const qd = Q.sp.dyn ? Q.sp.dyn(1) || {} : {}; if ((qd.lift ?? Q.sp.lift ?? 0) >= F.sp.h || qd.dx || qd.dy) return;   // 上を飛ぶ物・動き回る物は対象外
          const qc = Q.fold ? Math.cos(Q.fold * PI / 180) : 1;   // 相手も折れたパネルなら、幅は折り角のぶん縮む
          const a = Math.max(fa, (Q.sp.X - Q.sp.w / 2) * qc), b = Math.min(fb, (Q.sp.X + Q.sp.w / 2) * qc); if (b - a < 4) return;
          const ds = [a, b].map(x => baseY(Q, x) - baseY(F, x)), lo = Math.min(...ds), hi = Math.max(...ds), front = Q.sp.Y > F.sp.Y;   // ds が負なら、その位置で Q はパネルより奥
          if (front ? lo < -3 : hi > 3) {
            seen[key] = 1;
            T.warnings.push(Q.fold ? `見開き${s} パーツ#${Q.idx} と #${F.idx}: 折れたパネルどうしが交差する(Y の差を ${Math.ceil(Math.abs(Q.sp.Y - F.sp.Y) + (front ? -lo : hi) + 4)} 以上にするか、fold で折る向きをそろえる)`
              : `見開き${s} パーツ#${Q.idx}: 折れたパネル#${F.idx} より${front ? '手前' : '奥'}のつもりが、パネルと前後が入れ替わるか突き抜ける(Y を ${front ? Math.ceil(Q.sp.Y - lo + 4) + ' 以上' : Math.floor(Q.sp.Y - hi - 4) + ' 以下'}にする)`);
          }
        });
      });
      spreads.push(rt);
    });
    // --- カメラ ---
    const cv = { cx: 369, cy: 0, cz: 0 }, ci = def.cam || {};
    CAM = [[0, Object.assign({ d: 1150, tilt: 42, yaw: -11 }, cv, ci.introStart)], [TL.INTRO - .2, Object.assign({ d: 420, tilt: 34, yaw: -3 }, cv, ci.introEnd)]];
    def.spreads.forEach((sd, si) => {
      const s = si + 1, c = sd.cam || {}, sg = si % 2 ? -1 : 1;
      CAM.push([TL.open(s) - .4, T.pose(Object.assign({ d: 430, yaw: -3 * sg, cx: -40 * sg }, c.start))]);
      (c.keys || []).forEach(([tl, p]) => CAM.push([TL.open(s) + tl, p.d != null && p.tilt != null && p.cz != null ? Object.assign({ yaw: 0, cx: 0, cy: -30 }, p) : T.pose(p)]));
      CAM.push([TL.until(s) - (s < N ? .2 : .1), T.pose(Object.assign({ d: 250, yaw: 2 * sg, cx: 30 * sg }, c.end))]);
    });
    CAM.push([TL.tc + TL.CLOSE, Object.assign({ d: 560, tilt: 36, yaw: 4 }, cv, ci.closeStart)], [TL.END + .1, Object.assign({ d: 760, tilt: 38, yaw: 8 }, cv, ci.closeEnd)]);
    for (let i = 1; i < CAM.length; i++) if (CAM[i][0] <= CAM[i - 1][0]) T.warnings.push(`カメラのキー時刻が逆転: ${CAM[i - 1][0].toFixed(2)} → ${CAM[i][0].toFixed(2)}`);
    // --- ほこり ---
    dctx = $('tb-dust').getContext('2d');
    { const r = rnd(77); motes = Array.from({ length: 70 }, () => ({ x: r() * 1920, y: r() * 1080, vx: 6 + r() * 14, vy: -3 - r() * 6, r: 1.5 + r() * 4.5, f: .3 + r() * .9, ph: r() * 6.28, a: .12 + r() * .3 })); }
    // 画像ファイルを使う作品は、全部読み終えてから始める(まだ開いていない見開きの画像が、静止画チェックや動画化で抜けないように)。画像がなければ今までどおり即座に始まる
    const go = () => { T.warnings.forEach(w => console.warn('[tobidas]', w)); T.ready = true; T.render(0); document.dispatchEvent(new CustomEvent('tobidas:ready')); };
    const urls = [...new Set([...root.querySelectorAll('image, img')].map(e => e.getAttribute('href') || e.getAttribute('xlink:href') || e.getAttribute('src')).filter(u => u && !u.startsWith('data:')))];
    if (!urls.length) return bake.then(go);
    Promise.race([Promise.all(urls.map(u => new Promise(res => { const im = new Image(); im.onload = () => (im.decode ? im.decode().catch(() => { }) : Promise.resolve()).then(res); im.onerror = () => { T.warnings.push(`画像 '${u}' を読み込めません(パスは index.html から見て書く。作品の assets/ に置く)`); res(); }; im.src = u; }))), new Promise(res => setTimeout(res, 15000))]).then(() => bake).then(go);
  }

  // たたんだときにページの外へはみ出す板(背が高い板・浮かせた板)は、たたまれるにつれて薄くして消す(k = 立ち上がりの進み具合 0〜1)。
  // 本物の絵本なら折りたたまれてページの中に収まるが、この機構では板が1枚のまま寝るので、本の上や横から突き出て、閉じきった瞬間に急に消えてしまう。
  // ページの中に収まる板は、そのまま寝かせる
  function tuckFade(P, sp, d, k) {
    if (k >= 1) return 1;
    const yaw = (P.fold ? P.fz : (sp.yaw || 0) + (d.yaw || 0)) * PI / 180, reach = (sp.h * (d.sc ?? 1) + Math.max(0, d.lift ?? sp.lift ?? 0)) * (P.fold < 0 ? -1 : 1);
    const x = (P.fold ? (P.side === 'L' ? W : 0) : P.lx + (d.dx || 0)) + reach * Math.sin(yaw), y = sp.Y + (d.dy || 0) - reach * Math.cos(yaw), cy = sp.w / 2 * Math.abs(Math.sin(yaw));   // cy = 回した板の上の角が、中心より上(下)へ出る分
    return Math.max(-y + cy, y + cy - H, P.side === 'L' ? -x : x - W) > 12 ? sm(k) : 1;
  }
  function updSpread(s, p, tl, phi) {
    const rt = spreads[s];
    if (p <= .001 && (phi < FOLD_SHOW || !rt.pieces.some(P => P.fold))) { if (rt.shown) { rt.pieces.forEach(P => { P.el.style.display = 'none'; if (P.sh) P.sh.style.display = 'none'; P.vis = false; }); rt.shown = false; } return; }
    rt.shown = true;
    for (const P of rt.pieces) {
      if (P.deck) continue;
      const sp = P.sp, pi = P.fold ? +(phi >= FOLD_SHOW) : cl((p - P.delay) / .6), d = sp.dyn ? sp.dyn(tl) || {} : {};
      const op = (d.op ?? 1) * tuckFade(P, sp, d, P.fold ? (phi - FOLD_SHOW - 4) / 80 : pi / .3), vis = pi > 0 && op > .003;
      // 背をまたいで動くパーツは、いま根元がある側のページに付け替える(出発側に付けたままだと、めくられる反対側のページがパーツを突き抜ける)
      if (P.faces && d.dx) { const side = sp.X + d.dx < 0 ? 'L' : 'R'; if (side !== P.side) { P.side = side; P.lx = side === 'L' ? sp.X + W : sp.X; if (P.sh) P.grounds[side].appendChild(P.sh); P.faces[side].appendChild(P.el); } }
      if (!vis) { P.now = null; if (P.vis) { P.el.style.display = 'none'; if (P.sh) P.sh.style.display = 'none'; P.vis = false; } continue; }
      if (!P.vis) { P.el.style.display = ''; if (P.sh) P.sh.style.display = ''; P.vis = true; }
      if (P.fold) { foldPiece(P, d, phi, op); if (sp.anim) { const ta = T.animStep ? Math.floor(tl / T.animStep + 1e-6) * T.animStep : tl; if (P.animT !== ta) { P.animT = ta; P.q = P.q || {}; sp.anim(ta, P.el, P.q); } } continue; }
      const tw = tl + .35 - P.delay * .4, wob = tw > 0 ? 6 * Math.exp(-3.6 * tw) * Math.sin(15 * tw) : 0;   // 開いた直後のぷるぷる
      const ang = 90 * back(pi) + wob * pi - (sp.lean || 0) * pi - (d.lean || 0);
      const sink = d.sink || 0, yaw = (sp.yaw || 0) + (d.yaw || 0), L0 = d.lift ?? sp.lift ?? 0, lift = (L0 < 0 ? L0 : L0 * pi) - sink;   // 浮かせる高さは立ち上がりに合わせて伸ばすが、沈める量(負)は最初から全部沈めておく(途中まで沈めた状態だと、めくり中に頭が出る)
      P.now = { ang, fz: yaw, lift, bx: P.lx + (d.dx || 0), by: sp.Y + (d.dy || 0), op };   // 構造物の床が壁に合わせるための値
      const sway = (sp.sway ?? .9) * Math.sin(tl * 1.25 + P.ph) + (d.rz || 0), sc = d.sc ?? 1;
      const tx = P.lx + (d.dx || 0) - sp.w / 2 + P.ox, ty = sp.Y + (d.dy || 0) - sp.h + P.oy;
      // ゆれ・傾きで板を回すと、下の角がページの面より下に出る。出た分だけ板を持ち上げて、ページと交わらないようにする(交わると、Safari ではページが交線で割れて下の束が帯になって見える。pitfalls.md)。わざと沈めた板(負の lift・sink)は、そのまま
      const sn = Math.sin(sway * PI / 180), up = lift < 0 ? 0 : Math.max(0, Math.max(P.xr * sn, P.xl * sn) * sc - lift);
      // rzBase の回転の中心は根元の中央。rzX で、根元の線の上を左右にずらせる(倒れる側の角を中心にすれば、倒れても板がページの下に潜らない)
      const rzb = d.rzX ? `translateX(${(+d.rzX).toFixed(2)}px) rotateZ(${(d.rzBase || 0).toFixed(2)}deg) translateX(${(-d.rzX).toFixed(2)}px)` : `rotateZ(${(d.rzBase || 0).toFixed(2)}deg)`;
      P.el.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,1.4px) rotateZ(${yaw}deg) rotateX(${(-ang).toFixed(2)}deg) ${rzb} translateY(${(-lift - up).toFixed(2)}px) rotateZ(${sway.toFixed(3)}deg) scale(${sc.toFixed(4)})`;
      P.el.style.opacity = op;
      const clip = clipOf(d, sp, lift < 0 ? -lift / Math.max(sc, .01) : 0);   // ページの下へ沈めた分(負の lift・sink)は根元の線で切って隠す。立ち上がり途中は板が傾いていて、沈めた分がページの上に出てしまうため
      if (clip !== P.clipNow) { P.el.style.clipPath = clip; if (P.sh) P.sh.style.clipPath = clip; P.clipNow = clip; }
      if (P.sh) {
        const sa = Math.sin(cl(ang, 0, 90) * Math.PI / 180);
        P.sh.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,.8px) rotateZ(${yaw}deg) translateY(${(-lift * .42).toFixed(2)}px) skewX(-26deg) ${rzb} scale(${sc.toFixed(4)},${(sc * .46 * sa).toFixed(4)})`;
        P.sh.style.opacity = Math.min(.6, .26 * pi * op * (sp.shOp ?? 1) * (T.style.shadow ?? 1)).toFixed(3);
      }
      if (sp.anim) { const ta = T.animStep ? Math.floor(tl / T.animStep + 1e-6) * T.animStep : tl; if (P.animT !== ta) { P.animT = ta; P.q = P.q || {}; sp.anim(ta, P.el, P.q); } }
    }
    // 構造物の床: 壁(host)の上端の線に手前の辺を合わせ、ページと平行に浮かせる。壁が倒れると、同じだけ奥(または手前)へずれて下がる
    for (const P of rt.pieces) {
      if (!P.deck) continue;
      const n = P.host.now, H = n ? P.host.sp.h + n.lift : 0, vis = !!n && H > 1;
      if (vis !== P.vis) { P.el.style.display = vis ? '' : 'none'; P.vis = vis; } if (!vis) continue;
      const a = n.ang * PI / 180, f = n.fz * PI / 180, c = Math.cos(a) * H;
      P.el.style.transform = `translate3d(${(n.bx + c * Math.sin(f)).toFixed(2)}px,${(n.by - c * Math.cos(f)).toFixed(2)}px,${(.8 + Math.sin(a) * H).toFixed(2)}px) matrix(${Math.cos(f).toFixed(5)},${Math.sin(f).toFixed(5)},0,1,0,0) translate(${P.xoff}px,${-P.sp.deck.d}px)`;
      P.el.style.opacity = n.op;
    }
  }
  // 上から隠す clip(割合)と、根元より下を隠す sink(px。ページの下へ沈めた分を見せない)
  const clipOf = (d, sp, sink) => d.clip != null || sink > 0 ? `inset(${d.clip == null || d.clip <= 0 ? -400 : (d.clip * sp.h).toFixed(1)}px -200px ${sink > 0 ? sink.toFixed(1) : -40}px -200px)` : '';

  // 背で折れたパネル(V字折り)。左右の板は根元の線を背に対して fold 度だけ手前へ振ってあり、折り目(背の真上)でつながっている。
  // 折り目が左右のページの二等分面に乗り続ける条件から、板の起き上がり角 ρ は開き角 φ だけで決まる: tanρ = sin(fold)·tan(φ/2)。
  // 180°開くと垂直に立ち、とじると奥へ(fold が負なら手前へ)倒れてページの間に収まる。重ならず、すき間も開かない。
  const FOLD_SHOW = 24;
  function foldPiece(P, d, phi, op) {
    const sp = P.sp, rho = phi >= 179.99 ? 90 : Math.atan(P.fk * Math.tan(phi * PI / 360)) * 180 / PI, ang = P.fold > 0 ? rho : 180 - rho;   // 負の fold は手前に倒れた状態(180°)から起き上がる
    const sink = d.sink || 0, lift = (d.lift ?? sp.lift ?? 0) - sink, sc = d.sc ?? 1;
    const tx = P.lx - sp.w / 2 + P.ox, ty = sp.Y + (d.dy || 0) - sp.h + P.oy;
    P.now = { ang, fz: P.fz, lift, bx: P.side === 'L' ? W : 0, by: sp.Y + (d.dy || 0), op };
    P.el.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,1.4px) rotateZ(${P.fz}deg) rotateX(${(-ang).toFixed(3)}deg) translateY(${(-lift).toFixed(2)}px) scale(${sc.toFixed(4)})`;
    P.el.style.opacity = op;
    const clip = clipOf(d, sp, lift < 0 ? -lift / Math.max(sc, .01) : 0);
    if (clip !== P.clipNow) { P.el.style.clipPath = clip; if (P.sh) P.sh.style.clipPath = clip; P.clipNow = clip; }
    if (P.sh) {
      const sa = Math.sin(rho * PI / 180);
      P.sh.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,.8px) rotateZ(${P.fz}deg) translateY(${(-lift * .42).toFixed(2)}px) skewX(-26deg) scale(${sc.toFixed(4)},${(sc * .46 * sa).toFixed(4)})`;
      P.sh.style.opacity = Math.min(.6, .26 * sa * op * (sp.shOp ?? 1) * (T.style.shadow ?? 1)).toFixed(3);
    }
  }

  function drawDust(t) {
    dctx.clearRect(0, 0, 1920, 1080);
    for (const m of motes) {
      const x = ((m.x + m.vx * t + 40 * Math.sin(t * m.f + m.ph)) % 1960 + 1960) % 1960 - 20, y = ((m.y + m.vy * t + 20 * Math.cos(t * m.f * .7 + m.ph)) % 1120 + 1120) % 1120 - 20;
      const a = m.a * (.55 + .45 * Math.sin(t * m.f * 2 + m.ph)) * cl(1.2 - y / 900);
      const g = dctx.createRadialGradient(x, y, 0, x, y, m.r * 2.4); g.addColorStop(0, `rgba(255,240,200,${a})`); g.addColorStop(1, 'rgba(255,240,200,0)');
      dctx.fillStyle = g; dctx.beginPath(); dctx.arc(x, y, m.r * 2.4, 0, 6.3); dctx.fill();
    }
  }
  function drawCap(t) {
    const TL = T.TL; let idx = -1, c0 = 0, c1 = 0;
    T.def.spreads.forEach((sd, i) => { const a = TL.open(i + 1) + .25, b = TL.until(i + 1) - .15; if (sd.caption && t >= a && t < b) { idx = i; c0 = a; c1 = b; } });
    const capEl = $('tb-cap');
    if (idx !== capIdx) {
      capIdx = idx; capEl.innerHTML = ''; capSpans = [];
      if (idx >= 0) [].concat(T.def.spreads[idx].caption).forEach(line => {      // 行は '文' か [tl, '文'](tl 秒になってから出す)
        const at = Array.isArray(line) ? TL.open(idx + 1) + line[0] : null, ln = div('', capEl);
        [...(Array.isArray(line) ? line[1] : line)].forEach((ch, j) => { const sp = document.createElement('span'); sp.textContent = ch; sp._t = at == null ? TL.open(idx + 1) + .25 + capSpans.length * .045 : at + j * .045; ln.appendChild(sp); capSpans.push(sp); });
      });
    }
    let bg = 0;
    if (idx >= 0) { const out = cl((c1 - t) / .5); bg = cl((t - c0) / .5) * out; capSpans.forEach(sp => { const u = sm((t - sp._t) / .4); sp.style.opacity = (u * out).toFixed(3); sp.style.transform = `translateY(${((1 - u) * 14).toFixed(1)}px)`; }); }
    $('tb-capbg').style.opacity = bg;
  }

  // 時刻 t のフレームを描く。amb は題材と無関係な環境アニメ(ほこり・表紙のつや)用の時計。
  T.render = function (t, amb) {
    if (!T.ready) return;
    const TL = T.TL; t = cl(t, 0, TL.END); T.t = t; if (amb == null) amb = t;
    const th = [];
    for (let i = 0; i < NL; i++) { let a = i < N ? 180 * eio((t - TL.ts[i]) / TL.TURN) : 0; if (i < N && t > TL.tc) a = 180 * (1 - eio((t - TL.tc) / TL.CLOSE)); th[i] = a; }
    for (let i = 0; i < NL; i++) {
      const L = leaves[i], a = th[i];
      // 山の一番上のページだけ描く(同一平面に重なったページは描画順が不定になるため)
      const covered = a < 90 ? (i > 0 && th[i - 1] === a) : (i < N - 1 && th[i + 1] === a), hidden = covered && i > 0;
      L.el.style.display = hidden ? 'none' : ''; if (hidden) continue;
      // カメラに背を向けている面は、立体から外す(表は開き角 156°まで、裏は 80°から)。裏向きの面は描かれないが、Safari は前後判定には入れるので、
      // めくり始めと終わりに、ほぼ水平なその面がとなりのページのパーツの足元を横切り、手前のパーツが奥のパーツの後ろに回る(pitfalls.md)。
      // 表を 156°まで残すのは、背で折れたパネル(FOLD_SHOW まで見せる)がこの面に付いているため。90°前後は両方残して、裏面を隠す指定に任せる
      { const f = a <= 180 - FOLD_SHOW, b = a >= 80 && !(i === 0 && covered);
        if (f !== L.fOn) { L.fOn = f; L.front.style.display = f ? '' : 'none'; } if (L.back && b !== L.bOn) { L.bOn = b; L.back.style.display = b ? '' : 'none'; } }
        // 板と束の縁は、山の一番上で寝ているページにだけ見せる(めくっている最中のページには付けない)。表紙と一緒に動いているページ(表紙を開くときの表紙の裏、
        // 最後にとじるときの束の一番上)は、表紙の板そのものが見えるので、動いている間も見せる
        { const fr = a < .01, br = a > 179.99 || a === th[0]; if (L.frontRim && fr !== L.frOn) { L.frOn = fr; L.frontRim.style.display = fr ? '' : 'none'; } if (L.backRim && br !== L.brOn) { L.brOn = br; L.backRim.style.display = br ? '' : 'none'; } }
      const sn = Math.sin(a * Math.PI / 180), z = 2 + 3 * sn + (a > 0 && a < 180 ? 3 + (N - i) * .02 : 0);
      L.el.style.transform = `translateZ(${z.toFixed(2)}px) rotateY(${(-a).toFixed(3)}deg)`;   // めくり中は 3px 浮かせる(紙面は葉の表裏へ 1.4px ずつ離してあるので、それより大きく。めくり始めに下のページと前後が入れ替わって、次のページが一瞬見えるのを防ぐ)
      if (L.frontShade) L.frontShade.style.opacity = (a < 90 ? .5 * sn : 0).toFixed(3);
      if (L.backShade) L.backShade.style.opacity = (a > 90 ? .32 * sn : 0).toFixed(3);
    }
    $('tb-shadowL').style.opacity = cl((th[0] - 60) / 120) * (T.scenes ? T.scenes.shadow : 1);
    if (T.scenes) {   // 動く背景。環境の時計(amb)で動かす。見開きごとの背景は、その見開きへめくる間に現れ、次へめくる間に消える
      const S = T.scenes, show = (L, o) => { const on = o > .004; if (on !== L.on) { L.el.style.display = on ? '' : 'none'; L.on = on; } if (on) { L.el.style.opacity = o.toFixed(3); if (L.sc.anim) L.sc.anim(amb, L.svg, L.q); } };
      let cover = 0;
      S.per.forEach((L, i) => { if (!L) return; let o = sm((t - TL.ts[i]) / TL.TURN) * (1 - sm((t - TL.until(i + 1)) / (i + 1 < N ? TL.TURN : TL.CLOSE)));
        if (i === S.first && t < TL.ts[i] + TL.TURN) o = 1; if (i === S.last && t > TL.until(i + 1)) o = 1; cover = Math.max(cover, o); show(L, o); });
      if (S.base) show(S.base, cover > .995 ? 0 : 1);
    }
    leaves[0].sheen.style.backgroundPosition = `${(130 - ((amb * 38) % 220)).toFixed(1)}% 0`;
    let gc = '#000', go = 0, sx = 0, sy = 0;
    for (let s = 1; s <= N; s++) {
      const tl = t - TL.open(s), sd = T.def.spreads[s - 1];
      updSpread(s, sm((th[s - 1] - th[s] - 92) / 86), tl, th[s - 1] - th[s]);      // 開き角 92°→178° でパーツが立ち上がる
      if (sd.grade) { const g = sd.grade(tl) || [], o = (g[1] || 0) * sm((t - TL.ts[s - 1] - .5) / 1.6) * (1 - sm((t - TL.until(s) - .2) / 1.6)); if (o > go) { go = o; gc = g[0]; } }
      if (sd.shake && tl > -TL.TURN && t < TL.until(s) + TL.TURN) { const k = sd.shake(tl) || [0, 0]; sx += k[0]; sy += k[1]; }
    }
    let k = 0; while (k < CAM.length - 2 && t >= CAM[k + 1][0]) k++;
    const [t0, a] = CAM[k], [t1, b] = CAM[k + 1], u = sm((t - t0) / (t1 - t0)), c = {};
    for (const key in a) c[key] = lerp(a[key], b[key], u);
    world.style.transform = `translate3d(${sx.toFixed(2)}px,${sy.toFixed(2)}px,${(-c.d).toFixed(2)}px) rotateX(${c.tilt.toFixed(3)}deg) rotateZ(${c.yaw.toFixed(3)}deg) translate3d(${(-c.cx).toFixed(2)}px,${(-c.cy).toFixed(2)}px,${(-c.cz).toFixed(2)}px)`;
    $('tb-grade').style.background = gc; $('tb-grade').style.opacity = go.toFixed(3); $('tb-light').style.opacity = (1 - go * .7).toFixed(3);
    drawDust(amb); drawCap(t);
    $('tb-end').style.opacity = sm((t - TL.tc - TL.CLOSE - .2) / 1);
    $('tb-fade').style.opacity = Math.max(1 - sm(t / 1.4), sm((t - TL.END + 1.3) / 1.2));
  };
  // いま t がどの見開きか(0=表紙、N+1=とじた後)と、その見開き内の時刻
  T.where = t => { const TL = T.TL; let s = 0; for (let i = 1; i <= N; i++) if (t >= TL.ts[i - 1] + TL.TURN / 2) s = i; if (t > TL.tc + TL.CLOSE / 2) s = N + 1; return { spread: s, tl: s >= 1 && s <= N ? t - TL.open(s) : 0 }; };
  return T;
})();
window.renderFrame = t => Tobidas.render(t);   // 静止画チェック・動画化ツール用
