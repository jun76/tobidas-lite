// この作品だけの絵。共通パーツ(theme/parts.js の A.*)に足す形で定義する。

const GOLD = '#f2c94c';
const LATIN = '"Noto Serif","DejaVu Serif",Georgia,"Times New Roman",serif';

// 王子さま: 金色のつんつん髪、緑の服、風になびく黄色いマフラー(.scf を 74,100 で回す)
A.prince = (o = {}) => A.person(Object.assign({
  top: '#5f9e6e', bottom: '#4f8a5b', skin: '#f8d9b4',
  hair: `<path d="M30 60Q27 34 40 26L34 12L50 22L54 4L64 20L76 8L76 24L92 20L86 34Q93 44 90 60Q84 40 60 38Q38 40 30 60Z" fill="${GOLD}"/><path d="M40 38Q50 32 60 38Q70 32 82 38" stroke="#e0ad2e" stroke-width="4" fill="none"/>`,
  extra: `<g class="scf"><path d="M72 94Q98 92 124 74Q122 92 108 102Q92 108 74 106Z" fill="#f4d03f"/><path d="M96 98Q110 92 120 82" stroke="#e2b32a" stroke-width="4" fill="none"/></g>
    <path d="M42 90Q60 100 78 90L80 102Q60 112 40 102Z" fill="#f4d03f"/>
    <circle cx="54" cy="122" r="3.4" fill="#e9d48c"/><circle cx="66" cy="122" r="3.4" fill="#e9d48c"/>`,
}, o));
const aScarf = (tl, el, q) => rot(qs(el, q, '.scf'), 9 * sin(tl * 4.2), 74, 100);

// 飛行士: 革の上着と飛行帽、ゴーグル、白いマフラー
A.aviator = (o = {}) => A.person(Object.assign({
  top: '#8b5e3c', bottom: '#5e5a48', skin: '#f2c9a0',
  hair: `<path d="M29 64Q26 26 60 25Q94 26 91 64L85 64Q82 40 60 40Q38 40 35 64Z" fill="#6b4226"/>
    <path d="M29 56Q24 74 32 84L38 82Q34 70 36 58Z M91 56Q96 74 88 84L82 82Q86 70 84 58Z" fill="#6b4226"/>
    <rect x="38" y="31" width="44" height="12" rx="6" fill="#7a5a3a"/><circle cx="49" cy="37" r="7" fill="#a9d6e6" stroke="#c9a66b" stroke-width="3"/><circle cx="71" cy="37" r="7" fill="#a9d6e6" stroke="#c9a66b" stroke-width="3"/>`,
  extra: `<path d="M42 90Q60 100 78 90L80 102Q60 112 40 102Z" fill="#f4efe2"/><path d="M44 102Q38 126 46 138L54 134Q48 120 52 104Z" fill="#f4efe2"/>`,
}, o));

// 不時着した複葉機 600×260(機首が砂に刺さって少し傾く)
A.plane = () => `<g transform="rotate(-7 300 220)">
  <rect x="60" y="60" width="440" height="26" rx="10" fill="#d9d2bf"/>
  <rect x="92" y="86" width="12" height="80" fill="#8a6a4a"/><rect x="420" y="86" width="12" height="80" fill="#8a6a4a"/>
  <path d="M150 112Q300 92 520 128L566 150Q300 196 140 170Z" fill="#c25b43"/>
  <path d="M150 112Q300 92 520 128L530 140Q300 130 150 140Z" fill="#d8735a"/>
  <path d="M40 120L140 118L150 170L60 162Z" fill="#a84a36"/><path d="M28 70L80 116L56 120Z" fill="#c25b43"/>
  <rect x="40" y="160" width="480" height="24" rx="10" fill="#cfc6b0"/>
  <circle cx="320" cy="128" r="14" fill="#3d3a4a"/>
  <ellipse cx="572" cy="152" rx="12" ry="22" fill="#6b5640"/>
  <path d="M574 150L600 90M574 152L560 220" stroke="#8a6a4a" stroke-width="10" stroke-linecap="round"/>
  <circle cx="230" cy="214" r="22" fill="#4a4456"/><circle cx="230" cy="214" r="8" fill="#9a93a8"/></g>
  <path d="M0 260Q120 214 300 230Q480 214 600 260Z" fill="#e4c48d"/>`;

// 王子さまが描いてもらった、穴のあいた箱 120×90
A.box = () => `<rect x="6" y="18" width="108" height="72" rx="4" fill="#c99a62"/><path d="M6 18L24 2H130L114 18Z" fill="#ddb37c"/><path d="M114 18L130 2V74L114 90Z" fill="#a97a48"/>
  <circle cx="36" cy="50" r="7" fill="#5a3a22"/><circle cx="60" cy="58" r="7" fill="#5a3a22"/><circle cx="84" cy="48" r="7" fill="#5a3a22"/>`;
// 箱から顔を出す羊 90×70
A.sheep = () => `<circle cx="22" cy="40" r="20" fill="#fbf7ee"/><circle cx="45" cy="28" r="24" fill="#fbf7ee"/><circle cx="68" cy="40" r="20" fill="#fbf7ee"/><rect x="10" y="40" width="70" height="30" fill="#fbf7ee"/>
  <ellipse cx="45" cy="48" rx="16" ry="18" fill="#e8ddd0"/><ellipse cx="25" cy="40" rx="10" ry="6" fill="#e8ddd0" transform="rotate(-20 25 40)"/><ellipse cx="65" cy="40" rx="10" ry="6" fill="#e8ddd0" transform="rotate(20 65 40)"/>
  <circle cx="39" cy="46" r="3" fill="#3a2a1e"/><circle cx="51" cy="46" r="3" fill="#3a2a1e"/><path d="M41 56Q45 60 49 56" stroke="#8a3b2a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;

A.cactus = (h = 140) => `<rect x="30" y="10" width="26" height="${h - 10}" rx="13" fill="#6d9a5a"/><path d="M30 ${h * .55}H14V${h * .3}" stroke="#6d9a5a" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M56 ${h * .45}H72V${h * .2}" stroke="#7fae68" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="38" y="10" width="8" height="${h - 20}" rx="4" fill="#82b06b"/>`;

// 砂丘の帯(背をまたぐ背景用)
A.dune = (w, h, c, c2, seed) => {
  const r = rnd(seed), a = r() * 6, b = r() * 6;
  const y = x => h * (.45 - .28 * (.65 * Math.sin(x / w * 7 + a) + .35 * Math.sin(x / w * 15 + b)));
  let d = `M0 ${h}L0 ${F(y(0))}`, s = `M0 ${h}L0 ${F(y(0) + 26)}`;
  for (let x = 20; x <= w; x += 20) { d += `L${x} ${F(y(x))}`; s += `L${x} ${F(y(x) + 26 + 10 * Math.sin(x / 90 + a))}`; }
  return `<path d="${d}L${w} ${h}Z" fill="${c}"/><path d="${s}L${w} ${h}Z" fill="${c2}"/>`;
};

// B612: 小さな星の上半分(横から見た丸い地面)。w×h、頂上は y≈18
A.planetCap = (w, h) => `<path d="M0 ${h}A${w / 2} ${h - 18} 0 0 1 ${w} ${h}Z" fill="#c79a6a"/>
  <path d="M${w * .08} ${h}A${w * .42} ${h - 40} 0 0 1 ${w * .92} ${h}Z" fill="#b88a5c"/>
  <ellipse cx="${w * .3}" cy="${h * .55}" rx="44" ry="16" fill="#a67a50"/><ellipse cx="${w * .66}" cy="${h * .42}" rx="34" ry="12" fill="#a67a50"/><ellipse cx="${w * .5}" cy="${h * .78}" rx="60" ry="18" fill="#a67a50"/>
  <ellipse cx="${w * .18}" cy="${h * .8}" rx="26" ry="10" fill="#d6ad7e"/><ellipse cx="${w * .82}" cy="${h * .74}" rx="30" ry="10" fill="#d6ad7e"/>
  <path d="M${w * .28} ${h * .2}q8 -18 16 0M${w * .72} ${h * .22}q8 -18 16 0" stroke="#7d9a52" stroke-width="7" fill="none" stroke-linecap="round"/>`;

// 火山 130×80。active で煙(.smk の円が上る)
A.volcano = (active) => `<path d="M8 80L42 16H88L122 80Z" fill="#7a5d4a"/><path d="M42 16H88L80 30H50Z" fill="#4a3530"/><path d="M42 16L60 80H8Z" fill="#8c6c56"/>
  ${active ? `<circle cx="52" cy="22" r="7" fill="#f08a4b"/><circle cx="72" cy="20" r="6" fill="#f6b55a"/>` : ''}`;
const smoke = (X, Y, lift, i) => pc(X, Y, 40, 40, `<circle cx="20" cy="20" r="18" fill="#cfc4d8"/>`, { lift, sh: false, nosplit: true, sway: 0,
  dyn: tl => { const u = (((tl * .35 + i / 3) % 1) + 1) % 1; return { lift: lift + u * 120, dx: u * 30, sc: .4 + u * .9, op: .9 * sin(u * PI) }; } });

// バオバブの芽 50×50
A.sprout = () => `<rect x="22" y="22" width="7" height="28" fill="#6b8f3c"/><ellipse cx="14" cy="22" rx="14" ry="7" fill="#7fae4a" transform="rotate(-25 14 22)"/><ellipse cx="37" cy="20" rx="14" ry="7" fill="#7fae4a" transform="rotate(25 37 20)"/>`;

// バラ 100×160。.bloom は花(50,46 を中心に開く)
A.rose = (c = '#ee3b4c', c2 = '#c42438') => `<path d="M50 160V60" stroke="#4f8a4a" stroke-width="8"/>
  <path d="M50 120Q20 110 14 86Q40 90 50 112Z" fill="#5f9e55"/><path d="M50 100Q80 90 88 66Q60 72 50 94Z" fill="#6fae62"/>
  <path d="M46 134l-8 4M54 82l8 -4" stroke="#4f8a4a" stroke-width="5" stroke-linecap="round"/>
  <g class="bloom"><path d="M24 50Q22 20 50 16Q78 20 76 50Q64 72 50 72Q36 72 24 50Z" fill="${c2}"/>
  <path d="M30 44Q32 24 50 24Q68 24 70 44Q60 62 50 62Q40 62 30 44Z" fill="${c}"/>
  <path d="M40 38Q50 26 60 38Q56 50 50 50Q44 50 40 38Z" fill="${c2}"/>
  <path d="M24 50Q12 40 16 24Q30 30 34 46Z M76 50Q88 40 84 24Q70 30 66 46Z" fill="${c}"/></g>`;

// ガラスの覆い 140×190(半透明の紙でない物なので flt:false で使う)
A.dome = () => `<path d="M10 190V90Q10 10 70 10Q130 10 130 90V190Z" fill="#d8f0ff" fill-opacity=".28" stroke="#eefaff" stroke-width="5" stroke-opacity=".9"/>
  <path d="M30 150V92Q30 40 62 28" stroke="#ffffff" stroke-width="8" stroke-opacity=".7" fill="none" stroke-linecap="round"/>
  <circle cx="70" cy="6" r="9" fill="#eefaff" fill-opacity=".9"/>`;

// 小さな椅子 80×100
A.chair = () => `<rect x="10" y="10" width="12" height="90" rx="4" fill="#8a5a33"/><rect x="58" y="50" width="12" height="50" rx="4" fill="#8a5a33"/>
  <rect x="10" y="10" width="12" height="44" fill="#a06a3d"/><rect x="6" y="50" width="70" height="12" rx="4" fill="#b8804a"/><rect x="10" y="20" width="12" height="8" fill="#c08a52"/>`;

// 小さな惑星(星めぐり)。figure をてっぺんに乗せる。300×420(球の中心 150,300 半径 120)
A.miniPlanet = (c, c2, figure = '') => `<g transform="translate(0 6)">${figure}</g>
  <circle cx="150" cy="340" r="120" fill="${c}"/><path d="M42 300Q150 340 258 300A120 120 0 0 1 270 340Q150 390 30 340A120 120 0 0 1 42 300Z" fill="${c2}"/>
  <circle cx="110" cy="400" r="16" fill="${c2}"/><circle cx="196" cy="276" r="12" fill="${c2}"/>`;

// 王さま(長いマント、冠、白いひげ)
A.king = (o = {}) => A.person(Object.assign({
  top: '#8e3b5a', bottom: '#6b2a4a', long: true, skin: '#f6cfa6',
  hair: `<path d="M36 36L38 14L50 26L60 10L70 26L82 14L84 36Z" fill="#f2c94c"/><circle cx="60" cy="18" r="4" fill="#d8414f"/>
    <path d="M34 66Q36 104 60 108Q84 104 86 66Q74 80 60 80Q46 80 34 66Z" fill="#f4efe6"/>`,
  extra: `<path d="M30 94Q60 112 90 94L94 112Q60 128 26 112Z" fill="#f4efe6"/><circle cx="44" cy="108" r="3" fill="#3a2a1e"/><circle cx="76" cy="108" r="3" fill="#3a2a1e"/>`,
}, o));
// 点灯夫(帽子)と街灯 60×240(灯りは .lmp)
A.lamplighter = (o = {}) => A.person(Object.assign({
  top: '#3f5d8a', bottom: '#2f4468',
  hair: `<path d="M30 46Q30 24 60 24Q90 24 90 46Z" fill="#2f4468"/><rect x="24" y="42" width="72" height="9" rx="4" fill="#2f4468"/>`,
}, o));
A.lamp = () => `<rect x="26" y="70" width="8" height="170" fill="#4a4456"/><rect x="18" y="230" width="24" height="10" fill="#4a4456"/>
  <path d="M12 70H48L42 30H18Z" fill="#5a5466"/><path d="M14 30H46L30 14Z" fill="#4a4456"/>
  <g class="lmp"><circle cx="30" cy="50" r="40" fill="#ffe08a" opacity=".35"/><path d="M20 66H40L37 36H23Z" fill="#ffe7a0"/></g>`;
// 実業家(黒い服、メガネ)と机 140×90
A.businessman = (o = {}) => A.person(Object.assign({
  top: '#3c3a46', bottom: '#2c2a36', mouth: 'flat',
  hair: `<path d="M31 52Q30 28 60 28Q90 28 89 52Q78 38 60 40Q42 38 31 52Z" fill="#6a6a6a"/><circle cx="49" cy="60" r="8" fill="none" stroke="#3a2a1e" stroke-width="2.6"/><circle cx="71" cy="60" r="8" fill="none" stroke="#3a2a1e" stroke-width="2.6"/><path d="M57 60H63" stroke="#3a2a1e" stroke-width="2.6"/>`,
  extra: `<path d="M56 92L60 130L64 92Z" fill="#c8b8a0"/>`,
}, o));
A.desk = () => `<rect x="0" y="20" width="140" height="16" rx="4" fill="#8a5a33"/><rect x="10" y="36" width="14" height="54" fill="#6f4628"/><rect x="116" y="36" width="14" height="54" fill="#6f4628"/>
  <rect x="20" y="4" width="40" height="16" fill="#f4efe2"/><rect x="26" y="0" width="40" height="16" fill="#fbf7ee"/><rect x="80" y="6" width="44" height="14" fill="#f4efe2"/>`;

// キツネ 220×170(右向き)。.tail を 52,104 で振る。flip で左向き
A.fox = (flip) => {
  const s = `<g class="tail"><path d="M56 110Q10 112 4 70Q2 40 24 30Q24 70 62 92Z" fill="#e27b38"/><path d="M8 52Q4 36 24 30Q22 44 18 56Z" fill="#fbf2e4"/></g>
  <rect x="78" y="118" width="16" height="50" rx="7" fill="#c9622b"/><rect x="148" y="118" width="16" height="50" rx="7" fill="#c9622b"/>
  <ellipse cx="120" cy="112" rx="66" ry="34" fill="#ec8a45"/><ellipse cx="132" cy="122" rx="34" ry="18" fill="#fbf2e4"/>
  <rect x="96" y="120" width="16" height="50" rx="7" fill="#e27b38"/><rect x="168" y="120" width="16" height="50" rx="7" fill="#e27b38"/>
  <g class="hd"><path d="M160 30L170 0L186 30Z M188 30L206 4L210 38Z" fill="#e27b38"/><path d="M168 28L172 12L180 28Z M194 30L204 14L204 34Z" fill="#7a3a1e"/>
  <path d="M152 56Q156 26 190 26Q216 30 214 54L236 78Q224 92 196 88Q160 90 152 56Z" fill="#ec8a45"/>
  <path d="M176 70Q196 92 232 80Q222 94 196 92Q176 88 176 70Z" fill="#fbf2e4"/><circle cx="235" cy="78" r="6" fill="#3a2a1e"/>
  <path d="M184 54Q190 50 196 54" stroke="#3a2a1e" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>`;
  return flip ? `<g transform="translate(240 0) scale(-1 1)">${s}</g>` : s;
};

// 麦の束 220×130(手前用)
A.wheat = (w = 220, h = 130, seed = 1) => {
  const r = rnd(seed); let s = `<path d="M4 ${h}Q${w / 2} ${h - 34} ${w - 4} ${h}Z" fill="#b8862f"/>`;
  for (let x = 8; x < w; x += 12) {
    const hh = h * (.62 + r() * .38), lean = (r() - .5) * 22, tx = x + lean, ty = h - hh;
    s += `<path d="M${x} ${h}Q${F(x + lean * .4)} ${F(h - hh * .5)} ${F(tx)} ${F(ty + 18)}" stroke="#c99436" stroke-width="7" fill="none"/>
      <ellipse cx="${F(tx)}" cy="${F(ty)}" rx="10" ry="24" fill="${r() < .5 ? '#f3c650' : '#e8b33e'}" transform="rotate(${F(lean)} ${F(tx)} ${F(ty)})"/>`;
  }
  return s;
};
// バラの垣根 320×150
A.roseBush = (w = 320, h = 150) => {
  const r = rnd(4); let s = `<path d="M0 ${h}Q0 30 ${w * .3} 34Q${w * .5} 0 ${w * .7} 30Q${w} 30 ${w} ${h}Z" fill="#4e7f48"/><path d="M20 ${h}Q24 60 ${w * .4} 58Q${w * .7} 40 ${w - 20} ${h}Z" fill="#5f9455"/>`;
  for (let i = 0; i < 11; i++) {
    const x = 30 + r() * (w - 60), y = 30 + r() * (h - 60), c = r() < .5 ? '#d8414f' : '#e8697a';
    s += `<circle cx="${F(x)}" cy="${F(y)}" r="15" fill="${c}"/><circle cx="${F(x)}" cy="${F(y)}" r="7" fill="#b02f40"/>`;
  }
  return s;
};

// 井戸の各段(terrace 用)
A.wellFront = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="#b5a58c"/>${ppRep(3, r => ppRep(5, c => `<rect x="${c * w / 5 + (r % 2) * 18 + 4}" y="${r * h / 3 + 4}" width="${w / 5 - 10}" height="${h / 3 - 8}" rx="6" fill="${(r + c) % 2 ? '#c8b89c' : '#a8977c'}"/>`))}`;
A.wellBack = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="#9c8c74"/><rect x="0" y="0" width="${w}" height="20" rx="8" fill="#c8b89c"/>`;
A.wellFrame = (w, h) => `<rect x="20" y="40" width="16" height="${h - 40}" fill="#7a5233"/><rect x="${w - 36}" y="40" width="16" height="${h - 40}" fill="#7a5233"/>
  <path d="M0 50L${w / 2} 0L${w} 50Z" fill="#8f5a3a"/><path d="M14 46L${w / 2} 10L${w - 14} 46Z" fill="#a8704a"/>
  <rect x="28" y="70" width="${w - 56}" height="10" fill="#6a4529"/><circle cx="${w / 2}" cy="75" r="16" fill="#8a6a4a"/><circle cx="${w / 2}" cy="75" r="6" fill="#5a3a22"/>`;
// 桶とつるべの縄 60×300(桶は下端。縄は上へ)
A.bucket = () => `<path d="M30 0V230" stroke="#d9c49a" stroke-width="5"/><path d="M6 236H54L48 300H12Z" fill="#8a6a4a"/><rect x="4" y="232" width="52" height="10" rx="4" fill="#6a4a30"/><path d="M8 236Q30 210 52 236" stroke="#5a3a22" stroke-width="4" fill="none"/>
  <ellipse cx="30" cy="236" rx="20" ry="5" fill="#8fd0ee"/>`;

// 黄色いヘビ 150×60(.hd を持ち上げる)
A.snake = () => `<path d="M10 56Q4 40 30 38Q70 34 80 46Q92 58 120 50" stroke="#e8c43c" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M30 38Q54 30 76 40" stroke="#c9a52a" stroke-width="5" fill="none" stroke-dasharray="6 10"/>
  <g class="hd"><path d="M118 50Q126 26 136 18" stroke="#e8c43c" stroke-width="14" fill="none" stroke-linecap="round"/><ellipse cx="138" cy="16" rx="12" ry="9" fill="#e8c43c"/><circle cx="142" cy="13" r="2.6" fill="#3a2a1e"/></g>`;

// 地面(1440×920)
A.gSand = (seed = 1, c = '#e8c88f', c2 = '#dcb579', c3 = '#f2d8a6') => {
  const r = rnd(seed); let s = `<rect width="1440" height="920" fill="${c}"/>`;
  for (let i = 0; i < 9; i++) { const y = 60 + i * 100 + r() * 30; s += `<path d="M0 ${F(y)}Q360 ${F(y - 40 + r() * 80)} 720 ${F(y)}T1440 ${F(y + r() * 30)}" stroke="${i % 2 ? c2 : c3}" stroke-width="${14 + r() * 10}" fill="none" opacity=".7"/>`; }
  return s;
};
A.gSpace = (seed = 1, c = '#262b58', c2 = '#323874') => {
  const r = rnd(seed); let s = `<rect width="1440" height="920" fill="${c}"/><ellipse cx="720" cy="460" rx="620" ry="300" fill="${c2}" opacity=".6"/>`;
  for (let i = 0; i < 90; i++) s += `<circle cx="${F(r() * 1440)}" cy="${F(r() * 920)}" r="${F(1.5 + r() * 3)}" fill="#f4e7b8" opacity="${F(.4 + r() * .5)}"/>`;
  for (let i = 0; i < 8; i++) s += A.star(F(80 + r() * 1280), F(60 + r() * 800), 10, '#f6dc8a');
  return s;
};
A.gWheat = () => {
  let s = `<rect width="1440" height="920" fill="#d9b45a"/>`;
  for (let y = 30; y < 920; y += 42) s += `<path d="M0 ${y}Q720 ${y - 24} 1440 ${y}" stroke="${(y / 42) % 2 < 1 ? '#c9a046' : '#e6c46e'}" stroke-width="16" fill="none"/>`;
  return s + `<path d="M120 920Q500 700 720 640Q960 580 1440 600V660Q960 650 760 700Q520 760 300 920Z" fill="#c9a86a"/>`;
};

// 表紙 738×948
A.cover = () => `
  <defs><linearGradient id="cvg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2556"/><stop offset=".7" stop-color="#2c3b78"/><stop offset="1" stop-color="#3e3a72"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8e3a0"/><stop offset=".5" stop-color="#e0b23c"/><stop offset="1" stop-color="#b98a22"/></linearGradient>
  <radialGradient id="cvglow"><stop stop-color="#ffe7a8" stop-opacity=".45"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient></defs>
  <rect width="738" height="948" rx="14" fill="url(#cvg)"/><rect width="38" height="948" fill="#141c44"/>
  ${(() => { const r = rnd(7); let s = ''; for (let i = 0; i < 60; i++) s += `<circle cx="${F(60 + r() * 650)}" cy="${F(40 + r() * 860)}" r="${F(1.2 + r() * 2.4)}" fill="#fff3c8" opacity="${F(.5 + r() * .5)}"/>`; return s; })()}
  ${A.star(170, 360, 18, '#f6dc8a')}${A.star(600, 330, 14, '#f6dc8a')}${A.star(640, 520, 10, '#f6dc8a')}${A.star(120, 560, 12, '#f6dc8a')}
  <rect x="64" y="34" width="640" height="880" rx="18" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <circle cx="400" cy="660" r="260" fill="url(#cvglow)"/>
  <circle cx="400" cy="800" r="170" fill="#c79a6a"/><path d="M236 760Q400 800 566 760A170 170 0 0 1 570 800Q400 850 230 800A170 170 0 0 1 236 760Z" fill="#b88a5c"/>
  <ellipse cx="330" cy="860" rx="30" ry="12" fill="#a67a50"/><ellipse cx="470" cy="740" rx="22" ry="9" fill="#a67a50"/>
  <g transform="translate(240 552) scale(.62)">${A.volcano(true)}</g>
  <g transform="translate(486 566) scale(.62)">${A.rose()}</g>
  <g transform="translate(338 400) scale(1.05)">${A.prince({ look: 'up' })}</g>
  <text x="384" y="200" font-family='${LATIN}' font-weight="900" font-size="64" text-anchor="middle" fill="url(#gold)" letter-spacing="2">Le Petit</text>
  <text x="384" y="290" font-family='${LATIN}' font-weight="900" font-size="88" text-anchor="middle" fill="url(#gold)" letter-spacing="2">Prince</text>
  <text x="384" y="96" font-family='${LATIN}' font-weight="700" font-size="22" letter-spacing="8" text-anchor="middle" fill="#f8e3a0">LIVRE ANIMÉ</text>`;
