// tobidas テーマ「storybook」の絵の部品と、よく使う動き。作品ごとに編集しない(足りない絵は book/art.js に描く)。
// どれも「SVGの中身の文字列」を返す。一覧と寸法は themes/storybook/parts/parts.md。
const A = {};

A.star = (cx, cy, r, c = '#ffe9a0') => `<path d="M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z" fill="${c}"/>`;
A.hills = (w, h, c, c2, seed = 1, f = 1.5, deco) => {
  const r = rnd(seed), a = r() * 6.28, b = r() * 6.28;
  const yf = x => h * (.42 - .3 * (.6 * Math.sin(x / w * 6.283 * f + a) + .4 * Math.sin(x / w * 6.283 * f * 2.3 + b)));
  const yg = x => yf(x) + h * .26 + h * .08 * Math.sin(x / w * 6.283 * f * 1.7 + b * 2);
  let d = `M0 ${h}L0 ${F(yf(0))}`, d2 = `M0 ${h}L0 ${F(yg(0))}`;
  for (let x = 20; x <= w; x += 20) { d += `L${x} ${F(yf(x))}`; d2 += `L${x} ${F(yg(x))}`; }
  return `<path d="${d}L${w} ${h}Z" fill="${c}"/>` + (deco ? deco(yf) : '') + `<path d="${d2}L${w} ${h}Z" fill="${c2}"/>`;
};
A.miniTree = (x, y, s, c = '#4f9a50', c2 = '#6fb65c') => `<rect x="${x - s * .07}" y="${y - s * .5}" width="${s * .14}" height="${s * .55}" fill="#8a5a33"/><circle cx="${x}" cy="${y - s * .75}" r="${s * .38}" fill="${c}"/><circle cx="${x - s * .1}" cy="${y - s * .85}" r="${s * .2}" fill="${c2}"/>`;
A.pine = (x, y, s, c = '#3f7f5a') => `<rect x="${x - s * .06}" y="${y - s * .3}" width="${s * .12}" height="${s * .32}" fill="#7a4f2e"/><path d="M${x} ${y - s * 1.2}L${x + s * .32} ${y - s * .62}L${x - s * .32} ${y - s * .62}Z M${x} ${y - s * .9}L${x + s * .4} ${y - s * .22}L${x - s * .4} ${y - s * .22}Z" fill="${c}"/>`;
A.cloud = (w, h, seed = 1, c = '#ffffff', c2 = '#cfdff0') => {
  const r = rnd(seed), n = 5; let a = '', b = '';
  for (let i = 0; i < n; i++) {
    const cx = w * (.16 + .68 * i / (n - 1)), rad = Math.min(h * .5, h * (.26 + .22 * Math.sin(Math.PI * i / (n - 1)) + r() * .06)), cy = h - rad - 2;
    a += `<circle cx="${F(cx)}" cy="${F(cy)}" r="${F(rad)}" fill="${c2}"/>`;
    b += `<circle cx="${F(cx - rad * .05)}" cy="${F(cy - rad * .12)}" r="${F(rad * .84)}" fill="${c}"/>`;
  }
  return `<rect x="${w * .06}" y="${h * .62}" width="${w * .88}" height="${h * .38}" rx="${h * .19}" fill="${c2}"/>` + a + b + `<rect x="${w * .1}" y="${h * .6}" width="${w * .78}" height="${h * .26}" rx="${h * .13}" fill="${c}"/>`;
};
A.cloudBank = (w, h, seed = 1, c = '#ffffff', c2 = '#cfdff0') => {
  const r = rnd(seed); let a = '', b = '';
  for (let x = -20; x < w + 40; x += 62) {
    const rad = h * (.3 + r() * .22), cy = h * .55 + r() * h * .1;
    a += `<circle cx="${x}" cy="${F(cy)}" r="${F(rad)}" fill="${c2}"/>`;
    b += `<circle cx="${x - 4}" cy="${F(cy - rad * .12)}" r="${F(rad * .82)}" fill="${c}"/>`;
  }
  return `<rect x="0" y="${h * .5}" width="${w}" height="${h * .5}" fill="${c2}"/>` + a + b + `<rect x="0" y="${h * .62}" width="${w}" height="${h * .38}" fill="${c}"/>`;
};
A.tree = (w, h, o = {}) => {
  const { c = '#4c9a48', c2 = '#6dba58', c3 = '#8fd06c', fruit } = o;
  const blobs = [[.5, .34, .31], [.26, .46, .22], [.74, .46, .22], [.38, .2, .2], [.64, .2, .21], [.5, .52, .24]];
  let s = `<path d="M${w * .4} ${h}Q${w * .47} ${h * .8} ${w * .45} ${h * .5}L${w * .55} ${h * .5}Q${w * .53} ${h * .8} ${w * .62} ${h}Z" fill="#8a5a33"/><path d="M${w * .5} ${h * .7}L${w * .7} ${h * .55}" stroke="#8a5a33" stroke-width="${w * .04}" stroke-linecap="round"/>`;
  blobs.forEach(([x, y, r], i) => s += `<circle cx="${F(w * x)}" cy="${F(h * y)}" r="${F(w * r)}" fill="${i % 2 ? c2 : c}"/>`);
  blobs.forEach(([x, y, r], i) => s += `<circle cx="${F(w * x - w * r * .25)}" cy="${F(h * y - w * r * .3)}" r="${F(w * r * .35)}" fill="${c3}" opacity=".8"/>`);
  if (fruit) { const r = rnd(7); for (let i = 0; i < 9; i++) s += `<circle cx="${F(w * (.2 + r() * .6))}" cy="${F(h * (.15 + r() * .4))}" r="${w * .035}" fill="${fruit}"/>`; }
  return s;
};
A.bush = (w, h, c = '#5aa64e', c2 = '#7cc463', fl = '#ffd9e6') => {
  const r = rnd(w); let s = '';
  for (let i = 0; i < 5; i++) s += `<circle cx="${F(w * (.14 + .18 * i))}" cy="${F(h * (.62 - .18 * Math.sin(i * 1.3 + 1)))}" r="${F(h * .42)}" fill="${i % 2 ? c2 : c}"/>`;
  s += `<rect x="${w * .04}" y="${h * .6}" width="${w * .92}" height="${h * .4}" rx="${h * .2}" fill="${c}"/>`;
  for (let i = 0; i < 9; i++) { const x = w * (.1 + r() * .8), y = h * (.3 + r() * .55); s += `<circle cx="${F(x)}" cy="${F(y)}" r="5.5" fill="${fl}"/><circle cx="${F(x)}" cy="${F(y)}" r="2.2" fill="#f7b733"/>`; }
  return s;
};
A.fence = (w, h) => {
  let s = `<rect x="0" y="${h * .3}" width="${w}" height="${h * .14}" rx="4" fill="#c99a62"/><rect x="0" y="${h * .62}" width="${w}" height="${h * .14}" rx="4" fill="#c99a62"/>`;
  for (let x = 8; x < w - 10; x += 46) s += `<path d="M${x} ${h}L${x} ${h * .16}L${x + 10} ${h * .02}L${x + 20} ${h * .16}L${x + 20} ${h}Z" fill="#e4bd85"/>`;
  return s;
};
A.grass = (w, h, c = '#5fae4a', c2 = '#86c95f', fl) => {
  const r = rnd(w + h); let s = `<rect x="2" y="${h * .72}" width="${w - 4}" height="${h * .28}" rx="${h * .12}" fill="${c}"/>`;
  for (let i = 0; i < w / 15; i++) { const x = 12 + r() * (w - 24), hh = h * (.5 + r() * .5), lean = (r() - .5) * 26; s += `<path d="M${F(x - 10)} ${h}Q${F(x - 2)} ${F(h - hh * .6)} ${F(x + lean)} ${F(h - hh)}Q${F(x + 6)} ${F(h - hh * .5)} ${F(x + 10)} ${h}Z" fill="${r() > .5 ? c : c2}"/>`; }
  if (fl) for (let i = 0; i < w / 44; i++) { const x = 14 + r() * (w - 28), y = h * (.16 + r() * .3); s += `<path d="M${F(x)} ${h}L${F(x)} ${F(y)}" stroke="${c}" stroke-width="4"/><circle cx="${F(x)}" cy="${F(y)}" r="9" fill="${fl[i % fl.length]}"/><circle cx="${F(x)}" cy="${F(y)}" r="3.4" fill="#f7a733"/>`; }
  return s;
};
// 家 420x380
A.cottage = (o = {}) => {
  const { night, fancy } = o;
  const wall = night ? '#8f8cab' : '#f6e7c8', tim = night ? '#4b3f52' : '#8a5a33', roof = night ? '#6b5560' : '#c98e3f', roof2 = night ? '#5a4652' : '#a9732c', win = night ? '#ffd76a' : '#9fd3ea';
  let s = `<rect x="300" y="52" width="44" height="100" fill="${night ? '#75606b' : '#c0664a'}"/><rect x="294" y="44" width="56" height="16" rx="3" fill="${night ? '#5a4652' : '#9b4a34'}"/>`;
  s += `<g class="smoke">${[0, 1, 2, 3].map(i => `<circle cx="322" cy="30" r="12" fill="${night ? '#b9b6d0' : '#ffffff'}" opacity=".9"/>`).join('')}</g>`;
  s += `<rect x="62" y="176" width="296" height="200" fill="${wall}"/>`;
  s += `<path d="M62 176H358M62 376V176M358 376V176M140 176V376M280 176V376M62 250H140M280 250H358" stroke="${tim}" stroke-width="9" fill="none"/>`;
  s += `<path d="M22 196Q110 120 210 34Q310 120 398 196Q300 176 210 180Q120 176 22 196Z" fill="${roof}"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M${60 + i * 14} ${168 - i * 26}Q210 ${140 - i * 24} ${360 - i * 14} ${168 - i * 26}" stroke="${roof2}" stroke-width="5" fill="none" opacity="${i < 4 ? 1 : 0}"/>`;
  s += `<path d="M178 376V282Q178 250 210 250Q242 250 242 282V376Z" fill="${night ? '#4b3f52' : '#9a6234'}"/><circle cx="230" cy="318" r="5" fill="#f3c64f"/>`;
  [[78, 262], [296, 262]].forEach(([x, y], k) => {
    s += `<rect x="${x}" y="${y}" width="50" height="56" rx="6" fill="${win}"/><path d="M${x + 25} ${y}V${y + 56}M${x} ${y + 28}H${x + 50}" stroke="${tim}" stroke-width="5"/><rect x="${x - 4}" y="${y - 4}" width="58" height="64" rx="8" fill="none" stroke="${tim}" stroke-width="6"/>`;
    s += `<rect x="${x - 8}" y="${y + 60}" width="66" height="14" rx="4" fill="${tim}"/>` + [0, 1, 2, 3].map(i => `<circle cx="${x + 2 + i * 15}" cy="${y + 58}" r="7" fill="${night ? '#8a6d9a' : ['#ff7f7f', '#ffd24d', '#ff9ecb', '#fff'][i]}"/>`).join('');
  });
  s += `<circle cx="210" cy="118" r="20" fill="${win}"/><circle cx="210" cy="118" r="20" fill="none" stroke="${tim}" stroke-width="6"/>`;
  if (fancy) s += `<path d="M210 34V-20" stroke="#8a5a33" stroke-width="5"/><path d="M210 -20L256 -6L210 8Z" fill="#e2574c"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${70 + i * 40} 186l14 26l14-26Z" fill="${['#e2574c', '#f3c64f', '#58a6d6'][i % 3]}"/>`).join('');
  return s;
};
// 人物 120x226(足元 y=224)
A.person = (o) => {
  const { skin = '#f6cfa6', top, bottom, hair = '', long, armL = 14, armR = -14, extra = '', holdR = '', holdL = '', flip, mouth = 'smile', look, eyes } = o;
  let s = '';
  if (long) s += `<path d="M36 100L84 100L100 212Q60 224 20 212Z" fill="${bottom}"/><ellipse cx="46" cy="217" rx="12" ry="7" fill="#5a3a22"/><ellipse cx="74" cy="217" rx="12" ry="7" fill="#5a3a22"/>`;
  else s += `<g class="lgL"><rect x="42" y="148" width="15" height="64" rx="7" fill="${bottom}"/><ellipse cx="47" cy="216" rx="14" ry="8" fill="#5a3a22"/></g><g class="lgR"><rect x="63" y="148" width="15" height="64" rx="7" fill="${bottom}"/><ellipse cx="73" cy="216" rx="14" ry="8" fill="#5a3a22"/></g>`;
  s += `<path d="M37 94Q60 84 83 94L89 160Q60 170 31 160Z" fill="${top}"/>` + extra;
  s += `<g class="aL" transform="rotate(${armL} 40 100)"><rect x="33" y="94" width="14" height="54" rx="7" fill="${top}"/>${holdL}<circle cx="40" cy="150" r="8.5" fill="${skin}"/></g>`;
  s += `<g class="aR" transform="rotate(${armR} 80 100)"><rect x="73" y="94" width="14" height="54" rx="7" fill="${top}"/>${holdR}<circle cx="80" cy="150" r="8.5" fill="${skin}"/></g>`;
  const ey = look === 'up' ? 54 : 60;
  s += `<g class="hd"><rect x="54" y="78" width="12" height="16" fill="${skin}"/><circle cx="60" cy="58" r="29" fill="${skin}"/>${hair}${eyes === 'closed' ? `<path d="M44 ${ey}Q49 ${ey + 5} 54 ${ey}M66 ${ey}Q71 ${ey + 5} 76 ${ey}" stroke="#3a2a1e" stroke-width="2.8" fill="none" stroke-linecap="round"/>` : `<circle cx="49" cy="${ey}" r="3.4" fill="#3a2a1e"/><circle cx="71" cy="${ey}" r="3.4" fill="#3a2a1e"/>`}<circle cx="41" cy="69" r="6" fill="#f08f7e" opacity=".55"/><circle cx="79" cy="69" r="6" fill="#f08f7e" opacity=".55"/>`;
  s += mouth === 'flat' ? `<path d="M53 73H67" stroke="#8a3b2a" stroke-width="2.8" fill="none" stroke-linecap="round"/>` : mouth === 'o' ? `<ellipse cx="60" cy="74" rx="5" ry="6.5" fill="#8a3b2a"/>` : mouth === 'big' ? `<path d="M49 69Q60 86 71 69Z" fill="#8a3b2a"/>` : `<path d="M51 70Q60 79 69 70" stroke="#8a3b2a" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  s += `</g>`;
  return flip ? `<g transform="translate(120 0) scale(-1 1)">${s}</g>` : s;
};
// 牛 300x210
A.cow = () => {
  let s = `<g class="tail" transform="rotate(0 244 78)"><path d="M244 78Q276 96 268 140" stroke="#f3ead9" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="268" cy="146" r="9" fill="#7a5236"/></g>`;
  [[82, 140], [112, 146], [190, 146], [220, 140]].forEach(([x, y], i) => s += `<rect x="${x}" y="${y}" width="20" height="${204 - y - 12}" fill="${i % 3 ? '#efe4d0' : '#fffaf0'}"/><rect x="${x - 1}" y="192" width="22" height="14" rx="4" fill="#5a4030"/>`);
  s += `<ellipse cx="176" cy="160" rx="22" ry="14" fill="#f7b3b3"/><rect x="56" y="62" width="196" height="100" rx="48" fill="#fffaf0"/>`;
  s += `<path d="M120 64Q150 60 168 74Q176 104 146 112Q112 104 120 64Z" fill="#8a5a3c"/><path d="M206 96Q236 90 246 118Q240 150 214 150Q194 130 206 96Z" fill="#8a5a3c"/><circle cx="92" cy="134" r="14" fill="#8a5a3c"/>`;
  s += `<g class="chd" transform="rotate(0 70 80)"><path d="M26 36Q18 16 34 12M78 36Q88 16 72 12" stroke="#e9dcc0" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="14" cy="52" rx="14" ry="8" fill="#8a5a3c" transform="rotate(-20 14 52)"/><ellipse cx="90" cy="52" rx="14" ry="8" fill="#fffaf0" transform="rotate(20 90 52)"/><path d="M22 60Q20 28 52 28Q84 28 82 60L76 104Q52 122 28 104Z" fill="#fffaf0"/><path d="M52 28Q84 28 82 60L79 78Q56 70 52 28Z" fill="#8a5a3c"/><ellipse cx="52" cy="100" rx="27" ry="19" fill="#f7b3b3"/><circle cx="43" cy="100" r="3.5" fill="#b56a6a"/><circle cx="61" cy="100" r="3.5" fill="#b56a6a"/><circle cx="38" cy="62" r="4.5" fill="#3a2a1e"/><circle cx="68" cy="62" r="4.5" fill="#3a2a1e"/><path d="M40 118Q52 128 64 118" stroke="#c0392b" stroke-width="5" fill="none"/><circle cx="52" cy="132" r="9" fill="#f3c64f"/></g>`;
  return s;
};
// 城 520x560
A.castle = () => {
  const st = '#c8c1dc', st2 = '#aea5c9', st3 = '#948bb3', rf = '#5d4f9c', rf2 = '#7a6cc0';
  const cren = (x, y, w, c) => { let s = ''; for (let i = 0; i * 26 < w - 8; i += 1) s += `<rect x="${x + i * 26}" y="${y - 16}" width="16" height="18" fill="${c}"/>`; return s; };
  const tower = (x, y, w, c) => `<rect x="${x}" y="${y}" width="${w}" height="${556 - y}" fill="${c}"/>${cren(x - 4, y, w + 12, c)}<path d="M${x - 14} ${y - 14}L${x + w / 2} ${y - 130}L${x + w + 14} ${y - 14}Z" fill="${rf}"/><path d="M${x + w / 2} ${y - 130}L${x + w + 14} ${y - 14}L${x + w / 2 + 6} ${y - 14}Z" fill="${rf2}"/><path d="M${x + w / 2} ${y - 130}v-44" stroke="#6b4423" stroke-width="4"/><path class="flag" d="M${x + w / 2} ${y - 174}l40 12l-40 14Z" fill="#e2574c"/><path d="M${x + w / 2 - 11} ${y + 40}v-18a11 11 0 0 1 22 0v18Z" fill="#ffd866"/>`;
  let s = `<rect x="84" y="330" width="352" height="226" fill="${st2}"/>${cren(84, 330, 352, st2)}`;
  s += tower(40, 260, 92, st3) + tower(388, 260, 92, st3);
  s += `<rect x="180" y="190" width="160" height="366" fill="${st}"/>${cren(176, 190, 170, st)}<path d="M160 176L260 30L360 176Z" fill="${rf}"/><path d="M260 30L360 176L268 176Z" fill="${rf2}"/><path d="M260 30v-52" stroke="#6b4423" stroke-width="5"/><path class="flag" d="M260 -22l54 16l-54 18Z" fill="#f3c64f"/>`;
  s += `<path d="M222 556V470Q222 430 260 430Q298 430 298 470V556Z" fill="#4a3a5e"/><path d="M240 556V440M260 556V432M280 556V440M222 480H298M222 520H298" stroke="#2f2440" stroke-width="4"/>`;
  [[236, 250], [284, 250], [260, 330]].forEach(([x, y]) => s += `<path d="M${x - 12} ${y + 44}v-22a12 12 0 0 1 24 0v22Z" fill="#ffd866"/>`);
  const r = rnd(4); for (let i = 0; i < 36; i++) { const x = 60 + r() * 400, y = 280 + r() * 250; s += `<rect x="${F(x)}" y="${F(y)}" width="22" height="9" rx="3" fill="#8d84ad" opacity=".5"/>`; }
  return s;
};
// 城の中の壁 1380x520
A.wall = () => {
  let s = `<rect width="1380" height="520" fill="#8d83ad"/>`;
  for (let y = 0; y < 520; y += 40) { s += `<path d="M0 ${y}H1380" stroke="#776d98" stroke-width="3"/>`; for (let x = (y / 40 % 2) * 45; x < 1380; x += 90) s += `<path d="M${x} ${y}v40" stroke="#776d98" stroke-width="3"/>`; }
  s += `<rect width="1380" height="34" fill="#5d5378"/><rect y="484" width="1380" height="36" fill="#6a5f88"/>`;
  [200, 690, 1180].forEach(x => { s += `<path d="M${x - 80} 400V190Q${x - 80} 100 ${x} 100Q${x + 80} 100 ${x + 80} 190V400Z" fill="#bfe3f5"/><circle cx="${x - 26}" cy="250" r="26" fill="#fff"/><circle cx="${x + 10}" cy="240" r="34" fill="#fff"/><circle cx="${x + 44}" cy="256" r="22" fill="#fff"/><path d="M${x - 80} 400V190Q${x - 80} 100 ${x} 100Q${x + 80} 100 ${x + 80} 190V400ZM${x} 100V400M${x - 80} 270H${x + 80}" fill="none" stroke="#4f4569" stroke-width="12"/><rect x="${x - 96}" y="396" width="192" height="20" rx="4" fill="#4f4569"/>`; });
  [445, 935].forEach(x => { s += `<path d="M${x - 50} 70H${x + 50}V340L${x} 300L${x - 50} 340Z" fill="#b8433a"/><path d="M${x - 50} 70H${x + 50}V96H${x - 50}Z" fill="#e0b23c"/><circle cx="${x}" cy="190" r="28" fill="#e0b23c"/>${A.star(x, 190, 20, '#b8433a')}`; });
  [60, 330, 570, 810, 1050, 1320].forEach(x => { s += `<path d="M${x} 300v-50" stroke="#3d3552" stroke-width="10" stroke-linecap="round"/><path d="M${x - 16} 250h32l-6 -16h-20Z" fill="#3d3552"/><g class="flame"><path d="M${x} 180Q${x + 22} 214 ${x} 238Q${x - 22} 214 ${x} 180Z" fill="#ff9a3c"/><path d="M${x} 204Q${x + 10} 222 ${x} 236Q${x - 10} 222 ${x} 204Z" fill="#ffe27a"/></g>`; });
  return s;
};
A.table = (w, h) => `<rect x="${w * .06}" y="${h * .3}" width="${w * .06}" height="${h * .7}" fill="#6b4423"/><rect x="${w * .88}" y="${h * .3}" width="${w * .06}" height="${h * .7}" fill="#6b4423"/><rect x="0" y="${h * .12}" width="${w}" height="${h * .24}" rx="10" fill="#9a6a3a"/><rect x="0" y="${h * .12}" width="${w}" height="${h * .08}" rx="8" fill="#b5834a"/>`;
A.coins = (w, h) => { const r = rnd(9); let s = `<path d="M0 ${h}Q${w * .2} ${h * .3} ${w * .5} ${h * .2}Q${w * .8} ${h * .3} ${w} ${h}Z" fill="#d9a521"/>`; for (let i = 0; i < 46; i++) { const x = w * (.08 + r() * .84), k = Math.abs(x / w - .5) * 2, y = h * (.25 + k * .6 + r() * (1 - k) * .55); s += `<ellipse cx="${F(x)}" cy="${F(Math.min(y, h - 8))}" rx="13" ry="7.5" fill="${r() > .5 ? '#f6c843' : '#ffe07a'}" stroke="#c9981f" stroke-width="2"/>`; } return s; };
A.sun = s => `<g class="rays">${Array.from({ length: 12 }, (_, i) => `<path d="M${s / 2} ${s * .02}L${s * .56} ${s * .2}L${s * .44} ${s * .2}Z" fill="#ffc94a" transform="rotate(${i * 30} ${s / 2} ${s / 2})"/>`).join('')}</g><circle cx="${s / 2}" cy="${s / 2}" r="${s * .3}" fill="#ffdf6b"/><circle cx="${s * .42}" cy="${s * .47}" r="${s * .025}" fill="#b8742a"/><circle cx="${s * .58}" cy="${s * .47}" r="${s * .025}" fill="#b8742a"/><path d="M${s * .42} ${s * .56}Q${s * .5} ${s * .63} ${s * .58} ${s * .56}" stroke="#b8742a" stroke-width="${s * .02}" fill="none" stroke-linecap="round"/><circle cx="${s * .36}" cy="${s * .55}" r="${s * .035}" fill="#ff9e7a" opacity=".7"/><circle cx="${s * .64}" cy="${s * .55}" r="${s * .035}" fill="#ff9e7a" opacity=".7"/>`;
// 顔のない太陽(夕日・朝日)。紙ではないので flt: false で使う。c=外の色、c2=芯の色
A.sunDisc = (s, c = '#ffd27a', c2 = '#fff1c0') => `<circle cx="${s / 2}" cy="${s / 2}" r="${s * .48}" fill="${c}" opacity=".35"/><circle cx="${s / 2}" cy="${s / 2}" r="${s * .34}" fill="${c}"/><circle cx="${s / 2}" cy="${s / 2}" r="${s * .22}" fill="${c2}"/>`;
A.moon = s => `<circle cx="${s / 2}" cy="${s / 2}" r="${s * .46}" fill="#ffeeb0"/><circle cx="${s * .36}" cy="${s * .38}" r="${s * .08}" fill="#f2d98a"/><circle cx="${s * .62}" cy="${s * .6}" r="${s * .11}" fill="#f2d98a"/><circle cx="${s * .58}" cy="${s * .28}" r="${s * .05}" fill="#f2d98a"/><path d="M${s * .34} ${s * .62}q${s * .06} ${s * .06} ${s * .12} 0" stroke="#c9a85a" stroke-width="${s * .02}" fill="none" stroke-linecap="round"/>`;
A.rainbow = (w, h) => ['#e85d5d', '#f39c4a', '#f6d24a', '#6cc26a', '#5aa9e0', '#8a74d0'].map((c, i) => `<path d="M${30 + i * 26} ${h}A${w / 2 - 30 - i * 26} ${h - 30 - i * 26} 0 0 1 ${w - 30 - i * 26} ${h}" stroke="${c}" stroke-width="27" fill="none"/>`).join('');
A.bird = (c = '#3d4a66') => `<g class="wg"><path d="M4 22Q18 0 32 20Q46 0 60 22Q46 12 32 28Q18 12 4 22Z" fill="${c}"/></g>`;
A.butterfly = (c = '#ff9ecb') => `<g class="wg"><path d="M22 20Q4 -4 2 16Q2 30 22 22Q6 40 18 38Q24 34 22 20ZM22 20Q40 -4 42 16Q42 30 22 22Q38 40 26 38Q20 34 22 20Z" fill="${c}"/></g><path d="M22 10V34" stroke="#3a2a1e" stroke-width="3" stroke-linecap="round"/>`;
A.note = (c = '#f6c843') => `<path d="M14 40V8L36 2V32" stroke="${c}" stroke-width="5" fill="none" stroke-linejoin="round"/><ellipse cx="9" cy="41" rx="9" ry="6.5" fill="${c}"/><ellipse cx="31" cy="33" rx="9" ry="6.5" fill="${c}"/>`;
A.zzz = (s) => `<text x="${s * .1}" y="${s * .85}" font-family="sans-serif" font-weight="900" font-size="${s}" fill="#fff">Z</text>`;
A.puff = (w, h, seed) => A.cloud(w, h, seed, '#f6efe0', '#d9cdb5');
A.village = (w, h) => {
  let s = ''; const r = rnd(12);
  for (let i = 0; i < 9; i++) { const x0 = 40 + i * (w - 120) / 8 + r() * 30, hh = h * (.3 + r() * .25), ww = 70 + r() * 40, x = Math.min(x0, w - ww - 12), c = ['#f1d9b8', '#e9c8a4', '#f6e7c8'][i % 3], rc = ['#c0664a', '#a9732c', '#b8554a'][i % 3]; s += `<rect x="${F(x)}" y="${F(h - hh)}" width="${F(ww)}" height="${F(hh)}" fill="${c}"/><path d="M${F(x - 10)} ${F(h - hh + 4)}L${F(x + ww / 2)} ${F(h - hh - 46)}L${F(x + ww + 10)} ${F(h - hh + 4)}Z" fill="${rc}"/><rect x="${F(x + ww * .3)}" y="${F(h - hh + 22)}" width="16" height="20" fill="#7fb3c9"/>`; }
  // 時計塔。屋根のてっぺんまで絵の箱(y≧0)に収める(背をまたいで切り分けられると、箱の上へ出た分は描かれない)
  s += `<rect x="${w * .46}" y="${h * .3}" width="60" height="${h * .7}" fill="#e9dcc0"/><path d="M${w * .46 - 10} ${h * .32}L${w * .46 + 30} 5L${w * .46 + 70} ${h * .32}Z" fill="#5d7fa8"/><circle cx="${w * .46 + 30}" cy="${h * .5}" r="16" fill="#fff"/><path d="M${w * .46 + 30} ${h * .5}v-11M${w * .46 + 30} ${h * .5}h8" stroke="#3a2a1e" stroke-width="3"/>`;
  [[.2, '#e2574c'], [.72, '#58a6d6'], [.86, '#f3c64f']].forEach(([k, c]) => s += `<path d="M${w * k - 50} ${h}V${h * .72}L${w * k} ${h * .52}L${w * k + 50} ${h * .72}V${h}Z" fill="#fff6e6"/><path d="M${w * k - 58} ${h * .74}L${w * k} ${h * .5}L${w * k + 58} ${h * .74}Z" fill="${c}"/>`);
  return s;
};
// ---- ページに印刷された地面(1440x920、背=720) ----
A.gMeadow = (o = {}) => {
  const { night, seed = 5, path = 'M330 430C380 600 700 560 880 700S1150 880 1210 920L1030 920C990 860 820 790 690 730S300 640 270 430Z', pond = [1150, 250] } = o;
  const g1 = night ? '#2c5957' : '#a8d672', g2 = night ? '#356a60' : '#bfe58a', g3 = night ? '#234a4c' : '#8cc35a', pth = night ? '#56707c' : '#efdcab';
  const r = rnd(seed); let s = `<rect width="1440" height="920" fill="${g1}"/>`;
  for (let i = 0; i < 18; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(r() * 920)}" rx="${F(80 + r() * 140)}" ry="${F(40 + r() * 60)}" fill="${r() > .5 ? g2 : g3}" opacity=".55"/>`;
  if (path) s += `<path d="${path}" fill="${pth}"/><path d="${path}" fill="none" stroke="${night ? '#46606c' : '#dcc48a'}" stroke-width="5" stroke-dasharray="3 22" stroke-linecap="round"/>`;
  if (pond) s += `<ellipse cx="${pond[0]}" cy="${pond[1]}" rx="150" ry="74" fill="${night ? '#3c5f8a' : '#7cc4e8'}"/><ellipse cx="${pond[0] - 30}" cy="${pond[1] - 16}" rx="70" ry="22" fill="#fff" opacity=".35"/><ellipse cx="${pond[0] + 60}" cy="${pond[1] + 26}" rx="26" ry="12" fill="${night ? '#356a60' : '#6fb65c'}"/>`;
  const fc = night ? ['#8fa6c9', '#b9a6d6'] : ['#fff', '#ffd24d', '#ff9ecb', '#ff7f7f'];
  for (let i = 0; i < 90; i++) { const x = r() * 1440, y = r() * 920; s += `<path d="M${F(x - 7)} ${F(y)}l4 -12l3 12l4 -14l3 14" stroke="${g3}" stroke-width="3" fill="none" stroke-linecap="round"/>`; }
  for (let i = 0; i < 70; i++) { const x = r() * 1440, y = r() * 920, c = fc[i % fc.length]; s += `<circle cx="${F(x)}" cy="${F(y)}" r="6" fill="${c}"/><circle cx="${F(x)}" cy="${F(y)}" r="2.4" fill="${night ? '#dfe6ff' : '#f7a733'}"/>`; }
  return s;
};
A.gSky = () => {
  const r = rnd(21); let s = `<rect width="1440" height="920" fill="#a9d8f5"/>`;
  for (let i = 0; i < 26; i++) { const x = r() * 1440, y = r() * 920, w = 120 + r() * 200; s += `<ellipse cx="${F(x)}" cy="${F(y)}" rx="${F(w)}" ry="${F(w * .32)}" fill="#fff" opacity="${F(.45 + r() * .4)}"/>`; }
  for (let i = 0; i < 14; i++) { const x = r() * 1440, y = r() * 920; s += `<path d="M${F(x)} ${F(y)}q30 -26 60 0q-22 -8 -30 10q-6 -14 -30 -10Z" fill="#d5ecfb"/>`; }
  return s;
};
A.gFloor = () => {
  let s = `<rect width="1440" height="920" fill="#d8cde8"/>`;
  for (let y = 0; y < 920; y += 92) for (let x = 0; x < 1440; x += 90) if (((x / 90) + (y / 92)) % 2) s += `<rect x="${x}" y="${y}" width="90" height="92" fill="#b6a6cf"/>`;
  s += `<rect x="60" y="640" width="1320" height="210" rx="12" fill="#b8433a"/><rect x="76" y="656" width="1288" height="178" rx="8" fill="none" stroke="#e0b23c" stroke-width="8"/>`;
  for (let x = 130; x < 1340; x += 110) s += A.star(x, 745, 22, '#e0b23c');
  return s;
};

// ================= よく使う動き・小物パーツ =================
const aSun = s => (tl, el, q) => rot(qs(el, q, '.rays'), tl * 9, s / 2, s / 2);
const aFlap = (sp = 9, cy = 20) => (tl, el, q) => { const k = .35 + .65 * abs(sin(tl * sp)); qs(el, q, '.wg').setAttribute('transform', `translate(0 ${(cy * (1 - k)).toFixed(2)}) scale(1 ${k.toFixed(3)})`); };
// 旗(.flag)をポールを軸にはためかせる。path の始点(M x y = ポールの上端)を支点に、横幅の伸び縮み(軸まわりの回転に見える)と小さなうねりを付ける
const aFlag = (tl, el, q) => qa(el, q, '.flag').forEach((f, i) => {
  const m = f._p || (f._p = (f.getAttribute('d').match(/M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/) || [0, 0, 0]).slice(1).map(Number));
  f.setAttribute('transform', `translate(${m[0]} ${m[1]}) skewY(${(5 * sin(tl * 5 + i * 1.7)).toFixed(2)}) scale(${(.78 + .22 * cos(tl * 2.6 + i * 2.1)).toFixed(3)} 1) translate(${-m[0]} ${-m[1]})`);
});
const aSmoke = (tl, el, q) => qa(el, q, '.smoke circle').forEach((c, i) => { const u = (((tl * .3 + i / 4) % 1) + 1) % 1; c.setAttribute('cx', (322 + 14 * sin(u * 6 + i) + u * 26).toFixed(1)); c.setAttribute('cy', (40 - u * 120).toFixed(1)); c.setAttribute('r', (8 + u * 18).toFixed(1)); c.setAttribute('opacity', ((1 - u) * .9).toFixed(2)); });
const aCow = (tl, el, q) => { rot(qs(el, q, '.tail'), 14 * sin(tl * 3), 244, 78); rot(qs(el, q, '.chd'), 5 * sin(tl * 1.6), 70, 80); };
const aArm = (sel, f, px = 80) => (tl, el, q) => rot(qs(el, q, sel), f(tl), px, 100);
const bird = (X, Y, lift, v, ph, c) => pc(X, Y, 60, 40, A.bird(c), { lift, sh: false, sway: 0, nosplit: true, delay: .3, dyn: tl => ({ dx: v * tl, lift: lift + 26 * sin(tl * 1.3 + ph) }), anim: aFlap(8 + ph) });
const fly = (X, Y, c, ph) => pc(X, Y, 44, 40, A.butterfly(c), { lift: 70, sh: false, sway: 0, nosplit: true, k: .9, dyn: tl => ({ dx: 60 * sin(tl * .7 + ph) + 20 * sin(tl * 2.1), lift: 80 + 40 * sin(tl * 1.1 + ph * 2), dy: 20 * sin(tl * .9 + ph) }), anim: aFlap(14, 20) });
const twinkle = (X, Y, lift, ph, r = 15, c) => pc(X, Y, r * 2, r * 2, A.star(r, r, r - 1, c), { lift, sh: false, flt: false, sway: 0, delay: .25, nosplit: true, glow: 8, dyn: tl => ({ sc: .55 + .45 * sin(tl * 2.4 + ph) }) });
const note = (X, Y, ph, c) => pc(X, Y, 44, 50, A.note(c), { sh: false, sway: 0, nosplit: true, delay: .3, dyn: tl => { const u = (((tl * .32 + ph) % 1) + 1) % 1; return { lift: 150 + u * 260, dx: 34 * sin(u * 7 + ph * 9) + u * 30, op: sin(u * PI), sc: .7 + u * .5, rz: 14 * sin(u * 9) }; } });
// 稜線に並べる木。背をまたぐ丘は左右に切り分けられ、絵の箱(上端 y=0)より上は描かれないので、木のてっぺんが箱を出ないようにする:
// 稜線が高くて入りきらない場所に当たったら、入る場所を引き直す。それでも無ければ、いちばん低い場所で入る大きさまで縮める
const hillTrees = (n, seed, s, pine) => yf => {
  const r = rnd(seed), r2 = rnd(seed + 101); let o = '';
  for (let i = 0; i < n; i++) {
    const pn = pine && i % 2, dy = pn ? 14 : 10, tall = pn ? 1.2 : 1.13, room = x => yf(x) + dy - 6; let x = 40 + r() * 1320, k = s * (.7 + r() * (pn ? .5 : .6));
    for (let j = 0; j < 24 && room(x) < k * tall; j++) { const x2 = 40 + r2() * 1320; if (room(x2) > room(x)) x = x2; }
    k = Math.min(k, room(x) / tall);
    o += pn ? A.pine(x, yf(x) + dy, k) : A.miniTree(x, yf(x) + dy, k);
  }
  return o;
};
const GR = ['#ff9ecb', '#fff', '#ffd24d', '#ff7f7f'];

// ================= 部品の目録(名前で呼び出す絵) =================
// 目録の絵は parts-*.js が登録する。一覧と寸法は themes/storybook/parts/parts-lib.md、見た目は previews/ の画像。
//   put('house.log', X, Y, { k: 1.2 })              pieces にそのまま入れるパーツを返す(箱の大きさと既定の動きは目録が持つ)
//   put('fence.hedge', X, Y, { art: { w: 600 } })   art に絵の設定(色や、伸び縮みする部品の w / h)を書く。flip: true で左右を反転
//   lib('tool.axe', { c: '#888' })                  SVG の中身の文字列だけを返す(人物の holdR に持たせる、別の絵に組みこむ、など)
const LIB = {};
const defPart = (name, label, w, h, art, o = {}, note = '') => { LIB[name] = { name, label, w, h, art, o, note, group: defPart.group || '' }; };
const libMiss = name => { if (typeof Tobidas !== 'undefined') Tobidas.warnings.push(`部品 '${name}' は目録にありません(themes/storybook/parts/parts-lib.md の名前を使う)`); return ''; };
const lib = (name, a = {}) => { const p = LIB[name]; return p ? p.art(a, a.w || p.w, a.h || p.h) : libMiss(name); };
const put = (name, X, Y, o = {}) => {
  const p = LIB[name]; if (!p) { libMiss(name); return pc(X, Y, 10, 10, '', { op: 0, sh: false }); }
  const { art: a = {}, flip, ...rest } = o, w = a.w || p.w, h = a.h || p.h; let s = p.art(a, w, h);
  if (flip) s = `<g transform="translate(${w} 0) scale(-1 1)">${s}</g>`;
  return pc(X, Y, w, h, s, Object.assign({}, p.o, rest));
};
// 絵を書くための短い関数(parts-*.js が使う)
const DRAW = (() => {
  const n = v => +(+v).toFixed(1);
  const r = (x, y, w, h, f, rx = 0, x2 = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${n(rx)}"` : ''} fill="${f}"${x2}/>`;
  const c = (x, y, q, f, x2 = '') => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(q)}" fill="${f}"${x2}/>`;
  const e = (x, y, rx, ry, f, x2 = '') => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}" fill="${f}"${x2}/>`;
  const p = (d, f, x2 = '') => `<path d="${d}" fill="${f}"${x2}/>`;
  const l = (d, s, w = 6, x2 = '') => `<path d="${d}" stroke="${s}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"${x2}/>`;
  const g = (cls, s, x2 = '') => `<g class="${cls}"${x2}>${s}</g>`;
  const at = (x, y, s, k = 1, a = 0) => `<g transform="translate(${n(x)} ${n(y)})${a ? ` rotate(${a})` : ''}${k !== 1 ? ` scale(${k})` : ''}">${s}</g>`;
  const poly = (pts, f, x2 = '') => p('M' + pts.map(q => n(q[0]) + ' ' + n(q[1])).join('L') + 'Z', f, x2);
  return { n, r, c, e, p, l, g, at, poly };
})();
