// Urashima Taro — この作品だけの絵。共通パーツ(theme/parts.js の A.*)に足す形で定義する。
// 画風は crayon(輪郭がゆらぐ)なので、幅 10px 未満の形は描かない。

// ---------- 登場人物 ----------
const HAIR_T = `<path d="M31 58Q30 26 60 26Q90 26 89 58Q82 40 60 40Q40 40 31 58Z" fill="#3a2a22"/><circle cx="60" cy="20" r="11" fill="#3a2a22"/>`;
const SKIRT = `<path d="M30 146L90 146L98 188L85 176L73 192L61 176L49 192L37 176L24 188Z" fill="#d9b25a"/><rect x="32" y="138" width="56" height="13" rx="6" fill="#c0392b"/>`;
A.taro = (o = {}) => A.person(Object.assign({ top: '#3f6fb0', bottom: '#f0c9a0', hair: HAIR_T, extra: SKIRT }, o));
A.oldTaro = (o = {}) => A.person(Object.assign({ top: '#3f6fb0', bottom: '#f0c9a0', extra: SKIRT, mouth: 'o',
  hair: `<path d="M31 58Q30 26 60 26Q90 26 89 58Q82 40 60 40Q40 40 31 58Z" fill="#f4f1ea"/><circle cx="60" cy="20" r="11" fill="#f4f1ea"/><path d="M34 64Q40 128 60 132Q80 128 86 64Q76 84 60 62Q44 84 34 64Z" fill="#f4f1ea"/>` }, o));
A.kid = (c, o = {}) => A.person(Object.assign({ top: c, bottom: '#6a5a8a',
  hair: `<path d="M30 60Q28 26 60 26Q92 26 90 60Q84 44 60 44Q36 44 30 60Z" fill="#4a3526"/>`,
  holdR: `<path d="M80 156L80 60" stroke="#8a5a33" stroke-width="10" stroke-linecap="round"/>` }, o));
A.otohime = (o = {}) => A.person(Object.assign({ top: '#e85d7a', bottom: '#f6b7c6', long: true,
  hair: `<path d="M28 60Q26 24 60 24Q94 24 92 60L96 120Q86 104 86 62Q80 42 60 42Q40 42 34 62Q34 104 24 120Z" fill="#2f2630"/><circle cx="60" cy="18" r="11" fill="#f3c64f"/><circle cx="40" cy="26" r="8" fill="#f3c64f"/><circle cx="80" cy="26" r="8" fill="#f3c64f"/>`,
  extra: `<rect x="33" y="128" width="54" height="15" rx="6" fill="#f3c64f"/><path d="M30 160Q60 176 90 160L96 190Q60 204 24 190Z" fill="#fbd3dc"/>` }, o));

// 亀 260×150(右向き)。背の上端は y=28(背の高さ 122)
A.turtle = (o = {}) => {
  const s = `<g class="fb"><ellipse cx="78" cy="128" rx="36" ry="15" fill="#5f9a4a" transform="rotate(22 78 128)"/></g>
  <path d="M34 100L2 114L36 126Z" fill="#7dbb5c"/>
  <g class="hd"><path d="M192 104Q206 54 240 60Q264 78 246 104Q222 118 192 114Z" fill="#8fcf6a"/><circle cx="238" cy="80" r="6" fill="#3a2a1e"/><circle cx="226" cy="96" r="7" fill="#f08f7e" opacity=".6"/></g>
  <path d="M22 120Q26 30 120 28Q210 30 216 120Z" fill="#3f8a4a"/>
  <path d="M66 112L82 62L120 50L158 62L174 112Z" fill="#5aa85a"/><path d="M104 104L112 76L130 76L138 104Z" fill="#7cc46a"/>
  <rect x="18" y="110" width="202" height="18" rx="9" fill="#e0c878"/>
  <g class="ff"><ellipse cx="178" cy="134" rx="38" ry="15" fill="#8fcf6a" transform="rotate(-18 178 134)"/></g>`;
  return o.flip ? `<g transform="translate(260 0) scale(-1 1)">${s}</g>` : s;
};
const aTurtle = (sp = 4) => (tl, el, q) => { rot(qs(el, q, '.ff'), 14 * sin(tl * sp), 160, 124); rot(qs(el, q, '.fb'), -12 * sin(tl * sp + 1), 96, 120); rot(qs(el, q, '.hd'), 4 * sin(tl * sp * .5), 196, 108); };

// 魚 90×56(右向き。flip で左向き)
A.fish = (c = '#f39c4a', c2 = '#ffd27a', flip) => {
  const s = `<g class="tl"><path d="M28 28L2 6L10 28L2 50Z" fill="${c}"/></g><ellipse cx="52" cy="28" rx="32" ry="21" fill="${c}"/><path d="M40 12Q54 -4 66 12Z" fill="${c}"/><ellipse cx="50" cy="36" rx="20" ry="9" fill="${c2}"/><circle cx="68" cy="22" r="5.5" fill="#3a2a1e"/>`;
  return flip ? `<g transform="translate(90 0) scale(-1 1)">${s}</g>` : s;
};
const aFish = ph => (tl, el, q) => rot(qs(el, q, '.tl'), 22 * sin(tl * 9 + ph), 28, 28);
// たこ 170×160
A.tako = () => `${[0, 1, 2, 3, 4].map(i => `<g class="lg${i}"><path d="M${45 + i * 20} 100Q${30 + i * 22} 136 ${36 + i * 24} 156" stroke="#d9483f" stroke-width="16" fill="none" stroke-linecap="round"/></g>`).join('')}
  <ellipse cx="85" cy="64" rx="60" ry="58" fill="#e85b4f"/><circle cx="64" cy="66" r="12" fill="#fff"/><circle cx="106" cy="66" r="12" fill="#fff"/><circle cx="66" cy="68" r="6" fill="#3a2a1e"/><circle cx="104" cy="68" r="6" fill="#3a2a1e"/><ellipse cx="85" cy="94" rx="12" ry="8" fill="#b83a34"/><circle cx="46" cy="88" r="9" fill="#f7a59a"/><circle cx="124" cy="88" r="9" fill="#f7a59a"/>`;
const aTako = (tl, el, q) => [0, 1, 2, 3, 4].forEach(i => rot(qs(el, q, '.lg' + i), 16 * sin(tl * 6 + i * 1.3), 45 + i * 20, 100));

// ---------- 物・自然 ----------
A.boat = () => `<path d="M8 46L292 46L254 106L50 106Z" fill="#9a6a3a"/><rect x="4" y="38" width="292" height="16" rx="8" fill="#c08a52"/><path d="M70 60L230 60L222 76L78 76Z" fill="#7a4f2e"/><rect x="140" y="-70" width="14" height="112" fill="#7a4f2e"/><path d="M154 -66L226 -30L154 -8Z" fill="#fff6e0"/>`;
A.pineJ = (w = 260, h = 360) => `<path d="M${w * .5} ${h}Q${w * .42} ${h * .7} ${w * .56} ${h * .5}Q${w * .66} ${h * .34} ${w * .5} ${h * .2}" stroke="#7a4f2e" stroke-width="28" fill="none" stroke-linecap="round"/>
  <ellipse cx="${w * .5}" cy="${h * .16}" rx="${w * .34}" ry="${h * .12}" fill="#2f7a55"/><ellipse cx="${w * .26}" cy="${h * .36}" rx="${w * .26}" ry="${h * .09}" fill="#3a8a60"/><ellipse cx="${w * .76}" cy="${h * .44}" rx="${w * .24}" ry="${h * .085}" fill="#2f7a55"/><ellipse cx="${w * .46}" cy="${h * .1}" rx="${w * .18}" ry="${h * .05}" fill="#4a9a6c"/>`;
A.rock = (w, h, c = '#8f8a86', c2 = '#a9a39c') => `<path d="M${w * .04} ${h}Q0 ${h * .4} ${w * .28} ${h * .12}Q${w * .56} -${h * .06} ${w * .8} ${h * .22}Q${w} ${h * .5} ${w * .96} ${h}Z" fill="${c}"/><path d="M${w * .3} ${h * .2}Q${w * .56} ${h * .04} ${w * .74} ${h * .26}Q${w * .5} ${h * .3} ${w * .3} ${h * .2}Z" fill="${c2}"/>`;
// 波の帯(背をまたぐ横長パネル用)
A.waves = (w, h, c = '#4fa8d8', c2 = '#8fd0ee', seed = 1) => {
  const r = rnd(seed), n = Math.round(w / 118), sw = w / n; let d = `M0 ${h}L0 ${h * .5}`, f = '';
  for (let i = 0; i < n; i++) { const x = i * sw, a = h * (.1 + r() * .25); d += `Q${F(x + sw * .3)} ${F(a)} ${F(x + sw * .62)} ${F(h * .42)}Q${F(x + sw * .84)} ${F(h * .62)} ${F(x + sw)} ${F(h * .5)}`; f += `<ellipse cx="${F(x + sw * .34)}" cy="${F(a + h * .22)}" rx="${F(sw * .2)}" ry="${F(h * .1)}" fill="#fff"/>`; }
  return `<path d="${d}L${w} ${h}Z" fill="${c}"/><rect x="0" y="${h * .72}" width="${w}" height="${h * .28}" fill="${c2}"/>${f}`;
};
A.kelp = (w, h, c = '#3f9a6a', c2 = '#2f7f58') => [0, 1, 2].map(i => { const x = w * (.22 + i * .28), hh = h * (.72 + (i % 2) * .26); return `<path d="M${F(x)} ${h}C${F(x - w * .22)} ${F(h - hh * .3)} ${F(x + w * .22)} ${F(h - hh * .62)} ${F(x - w * .06)} ${F(h - hh)}" stroke="${i % 2 ? c2 : c}" stroke-width="20" fill="none" stroke-linecap="round"/>`; }).join('');
A.coral = (w, h, c = '#f08a7a') => `<path d="M${w * .5} ${h}V${h * .42}M${w * .5} ${h * .62}Q${w * .2} ${h * .56} ${w * .18} ${h * .2}M${w * .5} ${h * .5}Q${w * .8} ${h * .44} ${w * .84} ${h * .12}M${w * .5} ${h * .42}Q${w * .46} ${h * .2} ${w * .56} ${h * .04}M${w * .22} ${h * .4}Q${w * .06} ${h * .36} ${w * .06} ${h * .22}" stroke="${c}" stroke-width="20" fill="none" stroke-linecap="round"/>`;
A.bubble = () => `<circle cx="20" cy="20" r="18" fill="#dff4ff" opacity=".85"/><circle cx="13" cy="13" r="6" fill="#fff"/>`;

// 竜宮城を「段々の構造物」(terrace)で組むための段。手前から 石の台 → 本殿 → 上の階 → 屋根飾り。k は全体の大きさ
// 壁は正面の絵、top は上から見える面(台の上・屋根)。奥の段ほど高く、下のほうは手前の段に隠れる
const PAL = { wall: '#fbf1dc', red: '#d2452f', teal: '#2f9a94', teal2: '#3fb0a8', gold: '#f3c64f' };
const palRoof = (w, d) => `<rect width="${w}" height="${d}" fill="${PAL.teal}"/><rect y="${d * .3}" width="${w}" height="${d * .22}" fill="${PAL.teal2}"/><rect y="${d - 16}" width="${w}" height="16" fill="${PAL.gold}"/>`;
// 反り屋根の軒先(正面から見た形)。壁として手前に立て、下は透明にして後ろの壁を見せる。高さ 70 ぶんだけ描く
const palEave = w => `<path d="M0 62Q${w * .07} 54 ${w * .12} 8L${w * .88} 8Q${w * .93} 54 ${w} 62Q${w * .92} 74 ${w * .86} 46L${w * .14} 46Q${w * .08} 74 0 62Z" fill="${PAL.teal}"/><rect x="${w * .12}" y="0" width="${w * .76}" height="14" rx="7" fill="${PAL.gold}"/>`;
A.palaceTiers = (k = 1) => {
  const S = n => Math.round(n * k);
  return [
    { w: S(880), h: S(70), d: S(60), top: '#e6f3f0', art: (w, h) => `<rect width="${w}" height="${h}" rx="10" fill="#cfe6e2"/><rect x="${w * .36}" y="${h * .3}" width="${w * .28}" height="${h * .7}" fill="#e6f3f0"/><rect x="${w * .4}" y="${h * .62}" width="${w * .2}" height="${h * .38}" fill="#f4fbf9"/>` },
    // 本殿の軒先(手前)→ 本殿の壁。屋根の面は軒先の上から上の階の壁まで渡す
    { w: S(860), h: S(300), d: S(36), td: S(96), top: palRoof, art: w => palEave(w) },
    { w: S(700), h: S(250), d: S(60), top: false, art: (w, h) => {
      let o = `<rect width="${w}" height="${h}" fill="${PAL.wall}"/>`;
      [.02, .2, .76, .94].forEach(u => o += `<rect x="${w * u}" y="0" width="${S(28)}" height="${h}" fill="${PAL.red}"/>`);
      o += `<path d="M${w * .39} ${h}V${h * .5}Q${w * .5} ${h * .2} ${w * .61} ${h * .5}V${h}Z" fill="#7a2b2b"/><path d="M${w * .42} ${h}V${h * .54}Q${w * .5} ${h * .32} ${w * .58} ${h * .54}V${h}Z" fill="#3b1f2b"/>`;
      [.12, .86].forEach(u => o += `<circle cx="${w * u}" cy="${h * .56}" r="${S(34)}" fill="${PAL.gold}"/><circle cx="${w * u}" cy="${h * .56}" r="${S(22)}" fill="#7cc4e8"/>`);
      [.31, .69].forEach(u => o += `<rect x="${w * u - 5}" y="${S(8)}" width="10" height="${S(26)}" fill="#7a2b2b"/><ellipse cx="${w * u}" cy="${S(54)}" rx="${S(17)}" ry="${S(21)}" fill="#e2574c"/>`);
      return o; } },
    // 上の階の軒先 → 上の階の壁
    { w: S(560), h: S(480), d: S(32), td: S(84), top: palRoof, art: w => palEave(w) },
    { w: S(420), h: S(430), d: S(52), top: false, art: (w, h) => {
      let o = `<rect width="${w}" height="${h}" fill="${PAL.wall}"/>`;
      [.03, .9].forEach(u => o += `<rect x="${w * u}" y="0" width="${S(28)}" height="${h}" fill="${PAL.red}"/>`);
      return o + `<circle cx="${w * .5}" cy="${S(92)}" r="${S(38)}" fill="${PAL.gold}"/><circle cx="${w * .5}" cy="${S(92)}" r="${S(25)}" fill="#e85d7a"/>`; } },
    { w: S(150), h: S(600), top: false, art: (w, h) => `<rect x="${w / 2 - 9}" y="${S(30)}" width="18" height="${S(100)}" fill="${PAL.gold}"/><circle cx="${w / 2}" cy="${S(26)}" r="${S(24)}" fill="${PAL.gold}"/>` },
  ];
};

// 後光 s×s(.rays を aSun で回す)。紙ではないので flt: false で使う
A.halo = s => `<g class="rays">${Array.from({ length: 16 }, (_, i) => `<path d="M${s / 2} ${s * .02}L${s * .54} ${s * .34}L${s * .46} ${s * .34}Z" fill="${i % 2 ? '#fff6c8' : '#ffe07a'}" opacity=".8" transform="rotate(${i * 22.5} ${s / 2} ${s / 2})"/>`).join('')}</g><circle cx="${s / 2}" cy="${s / 2}" r="${s * .3}" fill="#fff3b0" opacity=".55"/><circle cx="${s / 2}" cy="${s / 2}" r="${s * .2}" fill="#fffbe0" opacity=".8"/>`;

// 広間の壁 1380×460
A.hallWall = () => {
  let s = `<rect width="1380" height="460" fill="#fbf1dc"/><rect width="1380" height="60" fill="#2f9a94"/><rect y="52" width="1380" height="16" fill="#f3c64f"/><rect y="400" width="1380" height="60" fill="#e9d2b0"/>`;
  for (let x = 20; x < 1380; x += 222) s += `<rect x="${x}" y="60" width="30" height="400" fill="#d2452f"/>`;
  [131, 353, 575, 797, 1019, 1241].forEach((x, i) => s += `<circle cx="${x + 15}" cy="228" r="72" fill="#f3c64f"/><circle cx="${x + 15}" cy="228" r="56" fill="#5aa9d8"/><ellipse cx="${x + 15 + (i % 2 ? 12 : -12)}" cy="${222 + (i % 3) * 8}" rx="24" ry="13" fill="${['#f39c4a', '#ff9ecb', '#ffd24d'][i % 3]}"/>`);
  return s;
};
A.dishTable = () => `<rect x="20" y="52" width="360" height="24" rx="10" fill="#b8433a"/><rect x="44" y="72" width="26" height="38" fill="#8f2f2a"/><rect x="330" y="72" width="26" height="38" fill="#8f2f2a"/>
  <ellipse cx="96" cy="50" rx="52" ry="13" fill="#fff"/><ellipse cx="96" cy="40" rx="30" ry="14" fill="#f39c4a"/><ellipse cx="204" cy="50" rx="52" ry="13" fill="#fff"/><circle cx="184" cy="34" r="15" fill="#f6c0d0"/><circle cx="212" cy="30" r="15" fill="#fff6e0"/><circle cx="226" cy="40" r="13" fill="#bfe58a"/><ellipse cx="312" cy="50" rx="46" ry="13" fill="#fff"/><path d="M286 44Q312 6 338 44Z" fill="#e2574c"/>`;
// 玉手箱 110×90(ふたは別パーツ 110×34)
A.box = () => `<rect x="8" y="26" width="94" height="62" rx="8" fill="#2a2330"/><rect x="8" y="26" width="94" height="14" fill="#4a3f55"/><rect x="48" y="26" width="14" height="62" fill="#d2452f"/><rect x="8" y="52" width="94" height="12" fill="#d2452f"/><circle cx="55" cy="58" r="13" fill="#f3c64f"/>`;
A.boxLid = () => `<rect x="2" y="6" width="106" height="28" rx="9" fill="#2a2330"/><rect x="48" y="6" width="14" height="28" fill="#d2452f"/><circle cx="55" cy="8" r="11" fill="#f3c64f"/>`;
// 見知らぬ村 560×200
A.newVillage = () => { let s = ''; [[10, 130, '#5a6478'], [150, 160, '#6b5a54'], [300, 120, '#5a6478'], [420, 150, '#6b5a54']].forEach(([x, hh, c], i) => s += `<rect x="${x + 12}" y="${200 - hh + 40}" width="106" height="${hh - 40}" fill="${i % 2 ? '#efe2c8' : '#e3d6bc'}"/><path d="M${x - 8} ${200 - hh + 46}L${x + 65} ${200 - hh - 14}L${x + 138} ${200 - hh + 46}Z" fill="${c}"/><rect x="${x + 50}" y="${200 - 46}" width="30" height="46" fill="#7a5a48"/>`); return s; };

// ---------- 地面(1440×920、背は x=720) ----------
A.gBeach = (o = {}) => {
  const { seed = 3, shore = 330, sand = '#f2dfb2' } = o, r = rnd(seed);
  let s = `<rect width="1440" height="920" fill="${sand}"/>`, d = `M0 0H1440V${shore}`;
  for (let x = 1440; x > 0; x -= 180) d += `Q${x - 45} ${shore + 46} ${x - 90} ${shore + 8}T${x - 180} ${shore}`;
  s += `<path d="${d}Z" fill="#e6cf9c" transform="translate(0 34)"/><path d="${d}Z" fill="#fff" transform="translate(0 12)"/><path d="${d}Z" fill="#62b8e0"/>`;
  for (let i = 0; i < 12; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(r() * (shore - 60))}" rx="${F(90 + r() * 120)}" ry="${F(16 + r() * 16)}" fill="${r() > .5 ? '#8fd0ee' : '#4fa8d8'}" opacity=".6"/>`;
  for (let i = 0; i < 60; i++) { const x = r() * 1440, y = shore + 70 + r() * (850 - shore - 70); s += `<circle cx="${F(x)}" cy="${F(y)}" r="${F(5 + r() * 6)}" fill="${['#e2c98e', '#fff6e0', '#f6b7a0', '#d9bf82'][i % 4]}"/>`; }
  for (let i = 0; i < 8; i++) { const x = r() * 1440, y = shore + 90 + r() * (800 - shore - 90); s += `<ellipse cx="${F(x)}" cy="${F(y)}" rx="${F(120 + r() * 120)}" ry="${F(30 + r() * 30)}" fill="#f8ebc8" opacity=".6"/>`; }
  return s;
};
A.gDeep = (o = {}) => {
  const { seed = 4, c = '#2f78b8', floor } = o, r = rnd(seed); let s = `<rect width="1440" height="920" fill="${c}"/>`;
  for (let i = 0; i < 5; i++) { const x = 100 + i * 300; s += `<path d="M${x} 0L${x + 150} 0L${x - 120} 920L${x - 330} 920Z" fill="#fff" opacity=".09"/>`; }
  for (let i = 0; i < 16; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(r() * 920)}" rx="${F(90 + r() * 150)}" ry="${F(30 + r() * 40)}" fill="${r() > .5 ? '#3f8fd0' : '#245f98'}" opacity=".5"/>`;
  if (floor) { s += `<rect y="0" width="1440" height="920" fill="#6fb3a6" opacity=".55"/>`; for (let i = 0; i < 26; i++) { const x = r() * 1440, y = r() * 920; s += `<path d="M${F(x)} ${F(y)}q40 -18 80 0" stroke="#4f9488" stroke-width="10" fill="none" stroke-linecap="round"/>`; } for (let i = 0; i < 30; i++) s += `<circle cx="${F(r() * 1440)}" cy="${F(r() * 920)}" r="${F(6 + r() * 7)}" fill="${['#e9d9a8', '#f6b7a0', '#cfe6e2'][i % 3]}"/>`; }
  return s;
};
A.gHall = () => {
  let s = `<rect width="1440" height="920" fill="#f3e6cc"/>`;
  for (let y = 0; y < 920; y += 92) for (let x = 0; x < 1440; x += 90) if (((x / 90) + (y / 92)) % 2) s += `<rect x="${x}" y="${y}" width="90" height="92" fill="#bfe0d8"/>`;
  s += `<rect x="60" y="600" width="1320" height="250" rx="16" fill="#c9483f"/><rect x="78" y="618" width="1284" height="214" rx="10" fill="none" stroke="#f3c64f" stroke-width="10"/>`;
  return s;
};

// ---------- 表紙 738×948(左端 38px は背の帯) ----------
A.cover = () => `
  <defs><linearGradient id="cvg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c4a7a"/><stop offset="1" stop-color="#0f2c4e"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8e3a0"/><stop offset=".5" stop-color="#e0b23c"/><stop offset="1" stop-color="#b98a22"/></linearGradient></defs>
  <rect width="738" height="948" rx="14" fill="url(#cvg)"/><rect width="38" height="948" fill="#0c2340"/>
  <rect x="64" y="34" width="640" height="880" rx="18" fill="none" stroke="url(#gold)" stroke-width="6"/><rect x="78" y="48" width="612" height="852" rx="12" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <circle cx="384" cy="600" r="230" fill="#2f78b8" opacity=".55"/><circle cx="384" cy="600" r="170" fill="#4fa8d8" opacity=".45"/>
  ${[[150, 420], [600, 470], [190, 800], [610, 760], [300, 390]].map(([x, y], i) => `<g transform="translate(${x} ${y}) scale(.8)">${A.fish(['#f39c4a', '#ff9ecb', '#ffd24d'][i % 3], '#fff6e0', i % 2)}</g>`).join('')}
  <g transform="translate(206 548) scale(1.4)">${A.turtle()}</g><g transform="translate(300 388) scale(1.15)">${A.taro({ armR: -150, armL: 30, mouth: 'big' })}</g>
  <g transform="translate(86 760)">${A.waves(566, 100, '#4fa8d8', '#8fd0ee', 3)}</g>
  <g font-family='${FONT}' font-weight="900" text-anchor="middle"><text x="384" y="206" font-size="100" fill="#0c2340" transform="translate(4 5)">Urashima</text><text x="384" y="206" font-size="100" fill="url(#gold)">Urashima</text><text x="384" y="312" font-size="100" fill="#0c2340" transform="translate(4 5)">Taro</text><text x="384" y="312" font-size="100" fill="url(#gold)">Taro</text></g>
  <text x="384" y="96" font-family='${FONT}' font-weight="700" font-size="22" letter-spacing="8" text-anchor="middle" fill="#f8e3a0">A POP-UP STORYBOOK</text>`;
