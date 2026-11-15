// 「Urashima Taro」だけの絵。共通パーツ(theme/parts.js の A.*、目録の put/lib)に足す形で定義する。
// どれも「SVGの中身の文字列」を返す。描き方は themes/default/art-style.md。

const GOLD = '#f3c64f', VERM = '#d9483b', VERM2 = '#a8322a', WHITE = '#f7f0e0', ROOF = '#3f9a8c', ROOF2 = '#2e7a6e';
const SERIF = '"Noto Serif","DejaVu Serif",Georgia,serif';

// ===== 登場人物 =====
// 太郎: 青い着物に白いはちまき。漁師の若者
const taroHair = `<path d="M31 56Q30 26 60 26Q90 26 89 56Q84 40 60 38Q38 40 31 56Z" fill="#3a2a1e"/><ellipse cx="60" cy="22" rx="11" ry="9" fill="#3a2a1e"/>`
  + `<path d="M30 48Q60 36 90 48L90 58Q60 46 30 58Z" fill="#f4efe2"/><path d="M88 50l16 -8l-4 14Z" fill="#f4efe2"/>`;
const kimonoExtra = (c, obi) => `<path d="M46 90L60 116L74 90" stroke="#f4efe2" stroke-width="7" fill="none" stroke-linejoin="round"/><rect x="32" y="126" width="56" height="13" rx="5" fill="${obi}"/>`;
A.taro = (o = {}) => A.person(Object.assign({
  top: '#3f7fbf', bottom: '#2c4c74', hair: taroHair, extra: kimonoExtra('#3f7fbf', '#e0a23c'),
}, o));
// 年をとった太郎: 白い髪とひげ、つえ
const oldHair = `<path d="M31 58Q30 30 60 30Q90 30 89 58Q86 46 78 44Q70 52 60 44Q50 52 42 44Q34 46 31 58Z" fill="#f1efe9"/><ellipse cx="60" cy="26" rx="9" ry="7" fill="#f1efe9"/>`
  + `<path d="M40 68Q42 112 60 116Q78 112 80 68Q72 80 60 80Q48 80 40 68Z" fill="#f1efe9"/><path d="M42 50H54M66 50H78" stroke="#f1efe9" stroke-width="5" stroke-linecap="round"/>`;
A.oldTaro = (o = {}) => A.person(Object.assign({
  top: '#5d7f9f', bottom: '#45607a', skin: '#efc9a2', hair: oldHair, extra: kimonoExtra('#5d7f9f', '#b9905a'),
  holdR: `<path d="M80 222V140Q80 126 68 128" stroke="#8a5a33" stroke-width="9" fill="none" stroke-linecap="round"/>`, armR: -6, mouth: 'o',
}, o));
// 乙姫: 長い黒髪に金の冠、桃色の着物と水色の羽衣
const otoHair = `<path d="M30 62Q26 22 60 22Q94 22 90 62L96 128Q86 136 80 116L83 64Q76 40 60 40Q44 40 37 64L40 116Q34 136 24 128Z" fill="#2b1d16"/>`
  + `<path d="M40 30L44 8L54 22L60 2L66 22L76 8L80 30Z" fill="${GOLD}"/><circle cx="60" cy="16" r="5" fill="${VERM}"/><circle cx="88" cy="40" r="8" fill="#ff8fb0"/><circle cx="88" cy="40" r="3.5" fill="${GOLD}"/>`;
A.otohime = (o = {}) => A.person(Object.assign({
  top: '#f7a8c0', bottom: '#e2577a', long: true, hair: otoHair,
  extra: `<path d="M46 90L60 114L74 90" stroke="#fff3f6" stroke-width="7" fill="none" stroke-linejoin="round"/><rect x="32" y="124" width="56" height="14" rx="5" fill="${GOLD}"/>`
    + `<path d="M14 150Q16 108 36 100L38 116Q28 124 28 158Z" fill="#8fd3e6"/><path d="M106 150Q104 108 84 100L82 116Q92 124 92 158Z" fill="#8fd3e6"/>`,
}, o));
// 村の子ども(目録の着物の子に棒を持たせる)
const STICK = `<rect x="75" y="140" width="10" height="78" rx="5" fill="#9a6a3c"/>`;
A.kid = (o = {}) => lib('kid.kimono', Object.assign({ holdR: STICK }, o));

// ===== 亀 320×170(右向き。足元 y=170) =====
// 動かす部分: .thd 頭(付け根 250,118) / .tfl 前びれ(222,138) / .tbl 後ろびれ(84,140)。人物の .hd と取り違えないよう専用の名前にする
A.turtle = (o = {}) => {
  const a = o.c || '#8cc46e', a2 = '#6ea558', sh = o.c2 || '#4f8f55', sh2 = '#6fae62', rim = '#d9b35a';
  let s = `<ellipse cx="200" cy="156" rx="34" ry="13" fill="${a2}"/><ellipse cx="66" cy="154" rx="30" ry="12" fill="${a2}"/><path d="M40 132L10 146L44 148Z" fill="${a2}"/>`;
  s += `<g class="thd"><path d="M232 104Q262 86 280 92L284 126Q258 130 236 134Z" fill="${a}"/><ellipse cx="290" cy="96" rx="28" ry="22" fill="${a}"/><circle cx="298" cy="88" r="5" fill="#3a2a1e"/><circle cx="299.5" cy="86.5" r="1.6" fill="#fff"/><path d="M294 106Q304 112 314 104" stroke="#3a5a30" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="286" cy="102" r="5" fill="#f08f7e" opacity=".5"/></g>`;
  s += `<path d="M38 140Q44 40 148 34Q252 40 258 140Z" fill="${sh}"/>`;
  s += `<path d="M118 50H178L196 84L148 110L100 84Z" fill="${sh2}"/><path d="M62 82L94 90L86 126L52 126Z" fill="${sh2}"/><path d="M204 90L236 82L246 126L212 126Z" fill="${sh2}"/><path d="M106 96L148 120L190 96L196 130H100Z" fill="${sh2}" opacity=".8"/>`;
  s += `<path d="M30 134H266Q266 152 250 152H46Q30 152 30 134Z" fill="${rim}"/>`;
  s += `<g class="tfl"><path d="M212 140Q250 136 270 160Q246 172 208 160Z" fill="${a}"/></g><g class="tbl"><path d="M92 142Q66 140 46 162Q74 172 100 160Z" fill="${a}"/></g>`;
  return o.flip ? `<g transform="translate(320 0) scale(-1 1)">${s}</g>` : s;
};
const aTurtle = (sp = 1, ph = 0, base = 0) => (tl, el, q) => {
  rot(qs(el, q, '.thd'), base + 6 * sin(tl * 1.6 * sp + ph), 250, 118);
  rot(qs(el, q, '.tfl'), 16 * sin(tl * 3 * sp + ph), 222, 138);
  rot(qs(el, q, '.tbl'), -14 * sin(tl * 3 * sp + ph + 1), 84, 140);
};
// 亀に乗った太郎 320×340(亀は下に 170 ずらして描く)
A.turtleRide = (o = {}) => `<g transform="translate(96 4) scale(.92)">${A.taro(Object.assign({ armL: 40, armR: -120, mouth: 'big' }, o))}</g><g transform="translate(0 170)">${A.turtle()}</g>`;
const aRide = (sp = 1) => many(aTurtle(sp), (tl, el, q) => rot(qs(el, q, '.aR'), -120 + 22 * sin(tl * 5), 80, 100));

// ===== 玉手箱 200×170(.lid ふた。ちょうつがい 14,64) =====
A.tamatebako = () => `<rect x="12" y="66" width="176" height="100" rx="8" fill="#2f2630"/><rect x="12" y="66" width="176" height="12" fill="${GOLD}"/><path d="M100 66V166M12 118H188" stroke="${VERM}" stroke-width="10"/><circle cx="100" cy="118" r="15" fill="${VERM}"/>`
  + A.star(40, 142, 9, GOLD) + A.star(160, 96, 9, GOLD)
  + `<g class="lid"><rect x="6" y="40" width="188" height="32" rx="8" fill="#3d2f42"/><rect x="6" y="62" width="188" height="10" fill="${GOLD}"/><path d="M100 40V72" stroke="${VERM}" stroke-width="10"/><path d="M100 42q-26 -34 -42 -6q12 20 42 6q26 -34 42 -6q-12 20 -42 6" fill="${VERM}"/></g>`;

// ===== 海の中のもの =====
// 海藻 w×h。太い波線を3本
A.seaweed = (w = 130, h = 280, c = '#3f9a5a', c2 = '#5fbf6a') => {
  let s = ''; const r = rnd(w + h);
  for (let i = 0; i < 3; i++) {
    const x = w * (.25 + .25 * i), hh = h * (.7 + .3 * r()), a = 14 + 10 * r();
    s += `<path d="M${F(x)} ${h}C${F(x - a)} ${F(h - hh * .3)} ${F(x + a)} ${F(h - hh * .6)} ${F(x)} ${F(h - hh)}" stroke="${i % 2 ? c2 : c}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
  }
  return s;
};
// さんご w×h
A.coral = (w = 200, h = 170, c = '#f0806a', c2 = '#f7a58a') => {
  const b = (x, y, x2, y2, col) => `<path d="M${x} ${y}Q${(x + x2) / 2} ${(y + y2) / 2 + 10} ${x2} ${y2}" stroke="${col}" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="12" fill="${col}"/>`;
  return b(w / 2, h, w / 2, 26, c) + b(w / 2, h - 40, w * .18, 50, c2) + b(w / 2, h - 60, w * .82, 40, c2) + b(w / 2, h - 20, w * .3, 96, c) + b(w / 2, h - 30, w * .72, 100, c);
};
// 泡 s×s(紙でないので flt: false で使う)
A.bubble = (s = 30) => `<circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 3}" fill="#dff4fb" opacity=".55" stroke="#ffffff" stroke-width="4"/><circle cx="${s * .36}" cy="${s * .36}" r="${s * .1}" fill="#fff"/>`;
// 奥の岩礁 w×h(背をまたぐ背景)
A.reef = (w = 1400, h = 260, seed = 3, c = '#3d7d96', c2 = '#4f93a8') => {
  const r = rnd(seed); let s = '', d = `M0 ${h}`;
  for (let x = 0; x <= w; x += 70) d += `L${x} ${F(h * (.35 + .4 * r()))}`;
  s += `<path d="${d}L${w} ${h}Z" fill="${c}"/>`;
  let d2 = `M0 ${h}`; for (let x = 0; x <= w; x += 100) d2 += `L${x} ${F(h * (.6 + .3 * r()))}`;
  s += `<path d="${d2}L${w} ${h}Z" fill="${c2}"/>`;
  for (let i = 0; i < 9; i++) { const x = 60 + i * (w - 120) / 8 + 30 * r(); s += `<path d="M${F(x)} ${h}Q${F(x - 20)} ${F(h * .7)} ${F(x + 6)} ${F(h * (.35 + .2 * r()))}" stroke="#4fa86a" stroke-width="16" fill="none" stroke-linecap="round"/>`; }
  return s;
};

// ===== 竜宮城(terrace の段。手前から) =====
A.palaceTiers = () => {
  const TILE = '#2a6e63', EDGE = '#24594f';
  const pillars = (w, y, h, n, wd = 20, x0 = 24) => { let s = ''; for (let i = 0; i < n; i++) { const x = x0 + i * (w - 2 * x0 - wd) / (n - 1); s += `<rect x="${F(x)}" y="${y}" width="${wd}" height="${h}" fill="${VERM}"/>`; } return s; };
  // 軒先: 壁の上端に付く屋根の縁(両端が反り上がる)と金の瓦の点
  const eave = (w, y = 30) => `<path d="M0 0H${w}V${y}Q${w - 40} ${y + 30} ${w - 100} ${y + 26}H100Q40 ${y + 30} 0 ${y}Z" fill="${ROOF}"/>`
    + Array.from({ length: Math.floor(w / 34) }, (_, i) => `<path d="M${20 + i * 34} 0V${y + 18}" stroke="${TILE}" stroke-width="5"/>`).join('')
    + `<path d="M0 ${y}Q40 ${y + 30} 100 ${y + 26}H${w - 100}Q${w - 40} ${y + 30} ${w} ${y}L${w} ${y + 14}Q${w - 40} ${y + 46} ${w - 100} ${y + 42}H100Q40 ${y + 46} 0 ${y + 14}Z" fill="${EDGE}"/>`
    + Array.from({ length: Math.floor((w - 220) / 46) + 1 }, (_, i) => `<circle cx="${110 + i * 46}" cy="${y + 34}" r="5" fill="${GOLD}"/>`).join('')
    + `<path d="M0 ${y}q6 -6 16 -2q-8 6 -4 14z" fill="${GOLD}"/><path d="M${w} ${y}q-6 -6 -16 -2q8 6 4 14z" fill="${GOLD}"/>`;
  // 屋根の正面: 下の軒(yE)から上の棟(yR)へすぼまる面。瓦の筋と、棟の両端の金の鯱
  const roof = (w, yR, yE, inset) => {
    let s = `<path d="M0 ${yE - 24}Q${w * .05} ${yE} ${w * .13} ${yE}H${w * .87}Q${w * .95} ${yE} ${w} ${yE - 24}L${w - inset} ${yR}H${inset}Z" fill="${ROOF}"/>`;
    const n = Math.round(w / 34);
    for (let i = 1; i < n; i++) { const u = i / n, xb = w * .06 + u * w * .88, xt = inset + u * (w - 2 * inset); s += `<path d="M${F(xb)} ${yE - 6}L${F(xt)} ${yR + 10}" stroke="${TILE}" stroke-width="5" stroke-linecap="round"/>`; }
    s += `<path d="M0 ${yE - 24}Q${w * .05} ${yE} ${w * .13} ${yE}H${w * .87}Q${w * .95} ${yE} ${w} ${yE - 24}" stroke="${EDGE}" stroke-width="12" fill="none"/>`;
    s += Array.from({ length: Math.floor(w * .74 / 40) + 1 }, (_, i) => `<circle cx="${F(w * .13 + i * 40)}" cy="${yE}" r="5" fill="${GOLD}"/>`).join('');
    s += `<rect x="${inset - 16}" y="${yR - 10}" width="${w - 2 * inset + 32}" height="24" rx="8" fill="${EDGE}"/><rect x="${inset - 16}" y="${yR - 10}" width="${w - 2 * inset + 32}" height="7" rx="3" fill="${GOLD}"/>`;
    const horn = (x, m) => `<path d="M${x - m * 4} ${yR + 12}Q${x - m * 2} ${yR - 22} ${x + m * 20} ${yR - 40}Q${x + m * 12} ${yR - 16} ${x + m * 22} ${yR + 12}Z" fill="${GOLD}"/><circle cx="${x + m * 8}" cy="${yR - 6}" r="3" fill="#8a5a1a"/>`;
    s += horn(inset - 4, -1) + horn(w - inset + 4, 1);
    s += `<path d="M0 ${yE - 24}q4 -12 16 -14q-6 10 -2 20z" fill="${GOLD}"/><path d="M${w} ${yE - 24}q-4 -12 -16 -14q6 10 2 20z" fill="${GOLD}"/>`;
    return s;
  };
  const roofDeck = (lip, over) => ({ lip, over, top: (w, d) => `<rect width="${w}" height="${d}" fill="${ROOF}"/>`
    + Array.from({ length: Math.floor(w / 30) }, (_, i) => `<path d="M${15 + i * 30} 0V${d - 14}" stroke="${TILE}" stroke-width="5"/>`).join('')
    + `<rect y="${d - 16}" width="${w}" height="16" fill="${EDGE}"/>` + Array.from({ length: Math.floor((w - 20) / 36) }, (_, i) => `<circle cx="${22 + i * 36}" cy="${d - 8}" r="5" fill="${GOLD}"/>`).join('')
    + `<path d="M0 ${d}l-0 -22q10 4 22 22z" fill="${GOLD}"/><path d="M${w} ${d}l0 -22q-10 4 -22 22z" fill="${GOLD}"/>` });
  const win = (x, y, s = 34) => `<rect x="${x - s / 2 - 5}" y="${y - s / 2 - 5}" width="${s + 10}" height="${s + 10}" rx="12" fill="${VERM2}"/><rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="9" fill="#bfe6f0"/>`;
  return [
    // 石の台
    { w: 900, h: 40, d: 60, top: '#e8dcc0', art: (w, h) => `<rect width="${w}" height="${h}" fill="#d7ccb4"/><path d="M0 20H${w}" stroke="#bfb39a" stroke-width="5"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M${45 + i * 90 + (i % 2) * 20} 0V${h}" stroke="#bfb39a" stroke-width="5"/>`).join('') },
    // 下の広間: 白壁と朱の柱、角窓。中央に白い唐門(裾が広がる)と朱の扉。上端に大屋根の軒先
    { w: 860, h: 230, d: 30, ...roofDeck(56, 34), art: (w, h) => {
      const cx = w / 2;
      let s = `<rect width="${w}" height="${h}" fill="${WHITE}"/>${pillars(w, 0, h, 9)}<rect y="${h - 22}" width="${w}" height="22" fill="${VERM2}"/>`;
      const bay = (w - 68) / 8;
      [0, 1, 2, 5, 6, 7].forEach(i => { s += win(34 + bay * (i + .5), 128); });
      s += `<path d="M${cx - 130} ${h}Q${cx - 92} ${h - 40} ${cx - 92} 92H${cx + 92}Q${cx + 92} ${h - 40} ${cx + 130} ${h}Z" fill="#fdfaf2" stroke="#cfc3ad" stroke-width="5"/>`;
      s += `<rect x="${cx - 56}" y="104" width="112" height="${h - 104}" rx="6" fill="${GOLD}"/><rect x="${cx - 44}" y="116" width="88" height="${h - 116}" fill="${VERM2}"/><path d="M${cx} 116V${h}" stroke="#7a2019" stroke-width="4"/><circle cx="${cx - 12}" cy="150" r="5" fill="${GOLD}"/><circle cx="${cx + 12}" cy="150" r="5" fill="${GOLD}"/>`;
      return s + `<rect width="${w}" height="16" fill="${VERM2}"/><rect y="16" width="${w}" height="26" fill="#1d3b36" opacity=".16"/>`;   // 軒下の梁と影
    } },
    // 下の大屋根(正面の面。軒は手前の壁に隠れる)
    { w: 820, h: 316, d: 50, top: false, art: w => roof(w, 44, 146, 170) },
    // 上の楼閣: 朱の欄干、白壁、中央に唐破風と金の額。上端に上の屋根の軒先
    { w: 540, h: 470, d: 50, ...roofDeck(50, 30), art: w => {
      const cx = w / 2;
      let s = `<rect width="${w}" height="230" fill="${WHITE}"/>${pillars(w, 0, 230, 7, 18)}`;
      const bay = (w - 66) / 6;
      [0, 5].forEach(i => { s += win(33 + bay * (i + .5), 140, 40); });
      s += `<rect x="${cx - 52}" y="78" width="104" height="120" rx="6" fill="${GOLD}"/><rect x="${cx - 42}" y="88" width="84" height="110" fill="${VERM2}"/><path d="M${cx} 88V198" stroke="#7a2019" stroke-width="4"/><path d="M${cx - 42} 120H${cx + 42}" stroke="#7a2019" stroke-width="3" opacity=".6"/><circle cx="${cx - 11}" cy="150" r="5" fill="${GOLD}"/><circle cx="${cx + 11}" cy="150" r="5" fill="${GOLD}"/>`;
      s += `<rect y="178" width="${w}" height="12" rx="5" fill="${VERM}"/><rect y="214" width="${w}" height="12" rx="5" fill="${VERM2}"/>` + Array.from({ length: 14 }, (_, i) => `<rect x="${F(6 + i * (w - 24) / 13)}" y="178" width="12" height="46" fill="${VERM}"/>`).join('');
      return s + `<rect width="${w}" height="16" fill="${VERM2}"/><rect y="16" width="${w}" height="26" fill="#1d3b36" opacity=".16"/>`;   // 軒下の梁と影
    } },
    // 上の屋根
    { w: 600, h: 580, d: 50, top: false, art: w => roof(w, 44, 152, 130) },
    // 棟の上の金の宝珠
    { w: 160, h: 640, top: false, art: w => `<rect x="${w / 2 - 9}" y="70" width="18" height="110" fill="#c9962a"/><path d="M${w / 2 - 30} 92H${w / 2 + 30}L${w / 2 + 20} 104H${w / 2 - 20}Z" fill="#c9962a"/><rect x="${w / 2 - 22}" y="62" width="44" height="14" rx="5" fill="#c9962a"/><path d="M${w / 2} 4Q${w / 2 + 6} 20 ${w / 2 + 20} 30Q${w / 2 + 28} 60 ${w / 2} 64Q${w / 2 - 28} 60 ${w / 2 - 20} 30Q${w / 2 - 6} 20 ${w / 2} 4Z" fill="${GOLD}"/><circle cx="${w / 2 - 7}" cy="40" r="7" fill="#fff6c8"/>` },
  ];
};

// 竜宮城の広間の壁 w×h(背をまたぐ背景)
A.hallWall = (w = 1400, h = 440) => {
  let s = `<rect y="40" width="${w}" height="${h - 40}" fill="#f4e6cf"/>`;
  for (let i = 0; i < 6; i++) { const x = 60 + i * (w - 160) / 5; s += `<rect x="${F(x + 40)}" y="120" width="${F((w - 160) / 5 - 60)}" height="${h - 200}" fill="#7cc2b6"/><path d="M${F(x + 40)} ${F(120 + (h - 200) / 2)}H${F(x + (w - 160) / 5 - 20)}" stroke="#f4e6cf" stroke-width="8"/>`; }
  for (let i = 0; i < 7; i++) s += `<rect x="${F(30 + i * (w - 100) / 6)}" y="40" width="40" height="${h - 40}" fill="${VERM}"/>`;
  s += `<rect y="0" width="${w}" height="56" fill="${VERM2}"/><rect y="48" width="${w}" height="14" fill="${GOLD}"/><rect y="${h - 40}" width="${w}" height="40" fill="${VERM2}"/>`;
  return s;
};

// ===== 地面(1440×920) =====
const waveLines = (y0, y1, gap, col, seed) => { const r = rnd(seed); let s = ''; for (let y = y0; y < y1; y += gap) for (let x = (y / gap % 2) * 60; x < 1440; x += 150) { const xx = x + 30 * r(); s += `<path d="M${F(xx)} ${y}q20 -12 40 0t40 0" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>`; } return s; };
A.gBeach = (o = {}) => {
  const sea = o.sea || '#7cc4d8', sand = o.sand || '#f1dca6', sand2 = o.sand2 || '#e5c98d', shore = o.shore || 330;
  const r = rnd(o.seed || 4);
  let s = `<rect width="1440" height="920" fill="${sand}"/><rect width="1440" height="${shore + 40}" fill="${sea}"/>` + waveLines(40, shore - 30, 70, '#b5e2ee', o.seed || 4);
  s += `<path d="M0 ${shore}Q180 ${shore + 40} 360 ${shore + 10}T720 ${shore + 20}T1080 ${shore}T1440 ${shore + 24}V${shore + 60}H0Z" fill="#fbfaf2"/>`;
  s += `<path d="M0 ${shore + 40}Q180 ${shore + 74} 360 ${shore + 44}T720 ${shore + 54}T1080 ${shore + 36}T1440 ${shore + 60}V920H0Z" fill="${sand}"/>`;
  for (let i = 0; i < 70; i++) s += `<circle cx="${F(r() * 1440)}" cy="${F(shore + 90 + r() * (830 - shore))}" r="${F(3 + r() * 5)}" fill="${sand2}"/>`;
  for (let i = 0; i < 6; i++) { const x = F(80 + r() * 1280), y = F(shore + 160 + r() * 380); s += `<path d="M${x} ${y}q14 -22 28 0z" fill="#f6b8a8"/>`; }
  return s;
};
A.gSea = (o = {}) => `<rect width="1440" height="920" fill="${o.c || '#5fb0cf'}"/>` + waveLines(30, 900, 64, o.c2 || '#8acbe0', o.seed || 7);
A.gSeabed = (o = {}) => {
  const r = rnd(o.seed || 5);
  let s = `<rect width="1440" height="920" fill="${o.c || '#3f86ab'}"/><path d="M0 330Q360 290 720 330T1440 320V920H0Z" fill="${o.sand || '#d9c79a'}"/>`;
  for (let y = 400; y < 900; y += 70) s += `<path d="M0 ${y}Q360 ${y - 20} 720 ${y}T1440 ${y}" stroke="${o.sand2 || '#c8b484'}" stroke-width="6" fill="none"/>`;
  for (let i = 0; i < 40; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(360 + r() * 540)}" rx="${F(6 + r() * 12)}" ry="${F(4 + r() * 6)}" fill="#a99a78"/>`;
  for (let i = 0; i < 8; i++) { const x = F(80 + r() * 1280), y = F(420 + r() * 440); s += A.star(x, y, 14, '#f29a6a'); }
  return s;
};
A.gHall = () => {
  let s = `<rect width="1440" height="920" fill="#c64a3e"/>`;
  for (let y = 0; y < 920; y += 120) for (let x = (y / 120 % 2) * 120; x < 1440; x += 240) s += `<rect x="${x}" y="${y}" width="120" height="120" fill="#d65a4c"/>`;
  s += `<path d="M560 920L640 0H800L880 920Z" fill="#e8b84a"/><path d="M590 920L660 0H780L850 920Z" fill="#f1cd6a"/>`;
  return s;
};

// ===== 表紙 738×948(左端 38px は背の帯) =====
A.cover = () => `
  <defs><linearGradient id="cvg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f6fa8"/><stop offset=".6" stop-color="#1f4f7a"/><stop offset="1" stop-color="#15385a"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8e3a0"/><stop offset=".5" stop-color="#e0b23c"/><stop offset="1" stop-color="#b98a22"/></linearGradient></defs>
  <rect width="738" height="948" rx="14" fill="url(#cvg)"/><rect width="38" height="948" fill="#153a5c"/>
  <rect x="64" y="34" width="640" height="880" rx="18" fill="none" stroke="url(#gold)" stroke-width="6"/>
  ${[0, 1, 2, 3].map(i => `<path d="M64 ${700 + i * 50}q45 -28 90 0t90 0t90 0t90 0t90 0t90 0t90 0" stroke="${['#7cc4d8', '#5fb0cf', '#4a9ac0', '#3f86ab'][i]}" stroke-width="14" fill="none" stroke-linecap="round"/>`).join('')}
  <circle cx="560" cy="330" r="70" fill="#f8e3a0" opacity=".9"/>
  <g transform="translate(200 410) scale(1.1)">${A.turtleRide()}</g>
  ${[[150, 420, 12], [120, 360, 8], [610, 520, 10], [640, 460, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#dff4fb" opacity=".7"/>`).join('')}
  <text x="384" y="220" font-family='${SERIF}' font-weight="900" font-size="92" text-anchor="middle" fill="url(#gold)">Urashima</text>
  <text x="384" y="310" font-family='${SERIF}' font-weight="900" font-size="92" text-anchor="middle" fill="url(#gold)">Taro</text>
  <text x="384" y="92" font-family='${SERIF}' font-weight="700" font-size="24" letter-spacing="8" text-anchor="middle" fill="#f8e3a0">A POP-UP BOOK</text>`;

// 竜宮城の後光 700×700(中心 350,350。.rays が回る)。紙でないので flt: false で使う
A.halo = () => {
  let rays = '';
  for (let i = 0; i < 16; i++) { const a = i * PI / 8, l = i % 2 ? 250 : 340, w = i % 2 ? .07 : .1;
    rays += `<path d="M${F(350 + 90 * cos(a - w * 2))} ${F(350 + 90 * sin(a - w * 2))}L${F(350 + l * cos(a))} ${F(350 + l * sin(a))}L${F(350 + 90 * cos(a + w * 2))} ${F(350 + 90 * sin(a + w * 2))}Z" fill="${i % 2 ? '#fff3b0' : '#ffe17a'}" opacity=".85"/>`; }
  return `<g class="rays">${rays}</g><circle cx="350" cy="350" r="170" fill="#fff6c8" opacity=".45"/><circle cx="350" cy="350" r="110" fill="#fff9de" opacity=".7"/>`;
};
// 泳ぐ魚: 進む向きに体を向け(.fd を左右に縮めて裏返す)、しっぽを振る
A.swimFish = c => `<g class="fd">${lib('sea.fish', { c })}</g>`;
const aSwim = vx => (tl, el, q) => {
  let sx = cl(vx(tl) * 4, -1, 1); if (abs(sx) < .2) sx = sx < 0 ? -.2 : .2;
  const n = qs(el, q, '.fd'); n && n.setAttribute('transform', `translate(95 0) scale(${sx.toFixed(3)} 1) translate(-95 0)`);
  rot(qs(el, q, '.tail'), 18 * sin(tl * 8), 52, 60);
};
