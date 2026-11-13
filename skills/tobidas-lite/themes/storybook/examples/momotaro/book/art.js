// Momotaro — この作品だけの絵。テーマの共通パーツ(A.*)に足す形で定義する。
// 画風は kirigami: べた塗りの形を重ねる。人物の足は必ず y=h0。
const repeats = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
const gold = '#e8bd70', cream = '#fff0cf';

// ---------- 登場人物(大人 k .9〜1、子どもは本側で k .8 前後) ----------
A.granny = (o = {}) => A.person(Object.assign({
  top: '#8fa0b4', bottom: '#6f6a86', long: true,
  hair: `<path d="M31 56Q33 26 60 26Q87 26 89 56Q76 42 60 44Q44 42 31 56Z" fill="#ddd4c0"/><path d="M31 56Q25 62 25 70L37 63Z" fill="#ddd4c0"/><circle cx="87" cy="47" r="8" fill="#ddd4c0"/>`,
  extra: `<path d="M42 112H78L85 158Q60 168 35 158Z" fill="#efe8d6"/>`,
}, o));
A.gramps = (o = {}) => A.person(Object.assign({
  top: '#5c708c', bottom: '#46506a',
  hair: `<path d="M31 58Q32 26 60 26Q88 26 89 58Q80 42 60 42Q40 42 31 58Z" fill="#e9e6dc"/><rect x="33" y="40" width="54" height="9" rx="4" fill="#d2452f"/><path d="M42 72Q60 96 78 72Q74 90 60 92Q46 90 42 72Z" fill="#e9e6dc"/>`,
  extra: `<rect x="37" y="136" width="46" height="11" rx="5" fill="#d8b25c"/>`,
}, o));
A.momo = (o = {}) => A.person(Object.assign({
  top: '#e2574c', bottom: '#8a6238',
  hair: `<path d="M32 56Q34 27 60 27Q86 27 88 56Q80 42 60 42Q40 42 32 56Z" fill="#3a2a22"/><circle cx="60" cy="24" r="9" fill="#3a2a22"/>`,
  extra: `<rect x="38" y="136" width="44" height="11" rx="5" fill="#f3c64f"/>`,
}, o));
// 日の丸の幡(持たせると aFlag でなびく)。棒の先頭が旗の始点
A.momoFlag = { holdR: `<path d="M80 158L80 -14" stroke="#8a5a33" stroke-width="9" stroke-linecap="round"/><path class="flag" d="M80 -14H172L150 8L172 30H80Z" fill="${cream}"/><circle cx="112" cy="8" r="12" fill="#d2452f"/>` };

// 赤ちゃん 170×130(毛布にくるまる)
A.baby = () => `<path d="M14 92Q4 54 44 40Q88 24 130 42Q160 56 152 84Q144 114 92 118Q36 120 14 92Z" fill="#fbe6ee"/>
  <path d="M40 44Q76 66 140 52" stroke="#f2c2d2" stroke-width="9" fill="none" stroke-linecap="round"/>
  <circle cx="88" cy="60" r="31" fill="#f6cfa6"/>
  <path d="M80 32Q88 20 96 33" stroke="#3a2a22" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M72 62Q77 67 82 62M94 62Q99 67 104 62" stroke="#3a2a22" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M83 76Q88 81 93 76" stroke="#8a3b2a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <circle cx="66" cy="72" r="6.5" fill="#f08f7e" opacity=".55"/><circle cx="110" cy="72" r="6.5" fill="#f08f7e" opacity=".55"/>`;

// 桃・割れた桃
A.peach = (w, h) => `<circle cx="${w * .38}" cy="${h * .57}" r="${h * .42}" fill="#f7aec0"/>
  <circle cx="${w * .63}" cy="${h * .57}" r="${h * .42}" fill="#f5a3b8"/>
  <path d="M${w * .5} ${h * .07}Q${w * .66} ${h * .22} ${w * .62} ${h * .36}Q${w * .5} ${h * .24} ${w * .38} ${h * .36}Q${w * .34} ${h * .22} ${w * .5} ${h * .07}Z" fill="#f9c3cf"/>
  <path d="M${w * .5} ${h * .16}Q${w * .45} ${h * .5} ${w * .5} ${h * .9}" stroke="#e88ba0" stroke-width="${Math.max(6, h * .05)}" fill="none"/>
  <path d="M${w * .56} ${h * .1}Q${w * .72} ${h * .0} ${w * .82} ${h * .07}Q${w * .7} ${h * .19} ${w * .56} ${h * .1}Z" fill="#7cbf66"/>
  <circle cx="${w * .27}" cy="${h * .58}" r="${h * .09}" fill="#ffd7e0" opacity=".8"/>`;
A.peachHalf = (w, h) => `<path d="M${w * .04} ${h * .3}Q${w * .04} ${h * .95} ${w * .5} ${h * .97}Q${w * .96} ${h * .95} ${w * .96} ${h * .3}Q${w * .73} ${h * .44} ${w * .5} ${h * .44}Q${w * .27} ${h * .44} ${w * .04} ${h * .3}Z" fill="#f2a0b0"/>
  <path d="M${w * .12} ${h * .35}Q${w * .15} ${h * .87} ${w * .5} ${h * .88}Q${w * .85} ${h * .87} ${w * .88} ${h * .35}Q${w * .7} ${h * .47} ${w * .5} ${h * .47}Q${w * .3} ${h * .47} ${w * .12} ${h * .35}Z" fill="#fce7ed"/>`;

// 洗濯桶 200×95 / 道しるべ 150×200
A.tub = () => `<path d="M14 18L186 18L170 88L30 88Z" fill="#9a6a3a"/><ellipse cx="100" cy="18" rx="86" ry="16" fill="#bfe3f2"/>
  <path d="M46 12Q70 0 96 12Q80 22 60 22Z" fill="#fdf8ea"/><path d="M108 14Q132 4 156 16Q140 26 118 22Z" fill="#e8d5f2"/>
  <rect x="8" y="8" width="184" height="12" rx="6" fill="#7c5230"/>`;
A.sign = () => `<rect x="66" y="52" width="18" height="148" rx="6" fill="#8a5f38"/>
  <path d="M18 30H118L138 52L118 74H18Z" fill="#c9a05a"/><text x="60" y="60" font-family='${FONT}' font-weight="900" font-size="26" text-anchor="middle" fill="#4a3016">ONIs</text>
  <path d="M32 96H132V138H32L14 117Z" fill="#b98e4a"/><text x="82" y="126" font-family='${FONT}' font-weight="900" font-size="22" text-anchor="middle" fill="#4a3016">HOME</text>`;

// ---------- 家来(動物)。右向き。flip で左向き ----------
A.dog = (o = {}) => {
  const s = `<g class="tl"><path d="M58 100Q34 80 40 50" stroke="#c98a4a" stroke-width="17" fill="none" stroke-linecap="round"/></g>
  <path d="M46 118Q40 74 92 66Q150 58 190 74Q232 88 236 118Q240 152 208 158L84 158Q46 152 46 118Z" fill="#c98a4a"/>
  <path d="M96 150L96 182M132 152L132 184M184 152L184 182M210 148L212 180" stroke="#c98a4a" stroke-width="20" stroke-linecap="round"/>
  <ellipse cx="98" cy="186" rx="15" ry="8" fill="#fdf3e0"/><ellipse cx="134" cy="188" rx="15" ry="8" fill="#fdf3e0"/>
  <ellipse cx="186" cy="186" rx="14" ry="8" fill="#fdf3e0"/><ellipse cx="214" cy="184" rx="14" ry="8" fill="#c98a4a"/>
  <circle cx="212" cy="82" r="37" fill="#c98a4a"/>
  <path d="M196 52Q188 24 208 26Q222 34 220 56Z" fill="#a06a34"/>
  <ellipse cx="238" cy="96" rx="24" ry="17" fill="#e8c49a"/><circle cx="246" cy="90" r="6.5" fill="#3a2a1e"/>
  <circle cx="216" cy="76" r="5" fill="#3a2a1e"/>
  <path d="M228 104Q238 112 248 104" stroke="#8a3b2a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M216 112Q224 122 232 114Z" fill="#f08f7e"/>`;
  return o.flip ? `<g transform="translate(260 0) scale(-1 1)">${s}</g>` : s;
};
const aDog = (sp = 5) => (tl, el, q) => rot(qs(el, q, '.tl'), 17 * sin(tl * sp), 58, 100);

A.monkey = (o = {}) => {
  const s = `<g class="tl"><path d="M62 168Q14 176 16 122Q18 96 36 96" stroke="#a8825e" stroke-width="14" fill="none" stroke-linecap="round"/></g>
  <ellipse cx="108" cy="142" rx="55" ry="48" fill="#a8825e"/>
  <ellipse cx="108" cy="152" rx="36" ry="30" fill="#e8c49a"/>
  <circle cx="150" cy="78" r="40" fill="#a8825e"/><ellipse cx="152" cy="86" rx="29" ry="24" fill="#e8c49a"/>
  <circle cx="114" cy="64" r="11" fill="#a8825e"/><circle cx="112" cy="64" r="5.5" fill="#e8c49a"/>
  <circle cx="144" cy="66" r="4.5" fill="#3a2a1e"/><circle cx="164" cy="66" r="4.5" fill="#3a2a1e"/>
  <path d="M146 86Q154 92 162 86" stroke="#8a3b2a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="134" cy="196" rx="18" ry="10" fill="#a8825e"/><ellipse cx="172" cy="194" rx="17" ry="10" fill="#a8825e"/>
  <path d="M70 122Q52 140 60 162" stroke="#a8825e" stroke-width="15" fill="none" stroke-linecap="round"/>`;
  return o.flip ? `<g transform="translate(220 0) scale(-1 1)">${s}</g>` : s;
};
const aMonkey = (sp = 4.4) => (tl, el, q) => rot(qs(el, q, '.tl'), 13 * sin(tl * sp), 62, 168);

A.pheasant = (o = {}) => {
  const s = `<g class="tl">${repeats(5, i => `<path d="M96 140Q${30 - i * 14} ${92 - i * 26} ${8 + i * 6} ${44 - i * 22}" stroke="${i % 2 ? '#5f4a30' : '#e8d8b0'}" stroke-width="11" fill="none" stroke-linecap="round"/>`)}</g>
  <ellipse cx="128" cy="148" rx="52" ry="42" fill="#4a5a8a"/>
  <g class="wg"><path d="M104 132Q140 116 168 138Q136 156 104 146Z" fill="#6a7ab0"/><circle cx="140" cy="136" r="7" fill="#f3c64f"/></g>
  <path d="M158 118Q162 92 178 86" stroke="#4a5a8a" stroke-width="16" fill="none" stroke-linecap="round"/>
  <circle cx="184" cy="80" r="17" fill="#4a5a8a"/><circle cx="196" cy="82" r="8" fill="#d2452f"/>
  <path d="M202 78L220 82L202 88Z" fill="#e8a83c"/>
  <path d="M172 62Q180 48 188 62Q182 56 176 62Z" fill="#f3c64f"/>
  <circle cx="188" cy="78" r="3.4" fill="#2f2640"/>
  <path d="M120 186L118 214M144 188L146 214" stroke="#e8a83c" stroke-width="7" stroke-linecap="round"/>`;
  return o.flip ? `<g transform="translate(230 0) scale(-1 1)">${s}</g>` : s;
};

// きびだんご 100×48(串に3つ)
A.dango = () => `<path d="M12 30H88" stroke="#a8825e" stroke-width="7" stroke-linecap="round"/>
  <circle cx="26" cy="24" r="15" fill="#fdf8ea"/><circle cx="50" cy="21" r="16" fill="#fffdf4"/><circle cx="74" cy="24" r="15" fill="#fdf8ea"/>
  <circle cx="22" cy="18" r="4.5" fill="#fff"/><circle cx="46" cy="14" r="4.5" fill="#fff"/>`;

// ---------- 鬼(2 表情で使い分ける)400×480 左向き ----------
const oniBody = give => {
  const skin = '#6a7fd0', skin2 = '#8fa3e8';
  let s = `<g class="aL"><path d="M120 258Q76 292 84 344" stroke="${skin}" stroke-width="30" fill="none" stroke-linecap="round"/><circle cx="84" cy="352" r="19" fill="${skin}"/></g>`;
  if (give) s += `<g class="aR"><path d="M316 250Q352 196 342 142" stroke="${skin}" stroke-width="30" fill="none" stroke-linecap="round"/><circle cx="342" cy="134" r="19" fill="${skin}"/></g>`;
  else s += `<g class="aR"><path d="M318 256Q360 238 366 188" stroke="${skin}" stroke-width="30" fill="none" stroke-linecap="round"/><circle cx="366" cy="180" r="19" fill="${skin}"/></g>`;
  s += `<ellipse cx="182" cy="458" rx="38" ry="16" fill="${skin}"/><ellipse cx="286" cy="458" rx="38" ry="16" fill="${skin}"/>
  <ellipse cx="232" cy="336" rx="112" ry="118" fill="${skin}"/>
  <ellipse cx="232" cy="368" rx="78" ry="66" fill="${skin2}"/>
  <path d="M150 396Q232 424 314 396L332 446Q232 472 132 446Z" fill="#e8b25c"/>
  ${repeats(4, i => `<path d="M${182 + i * 34} 400L${176 + i * 34} 460" stroke="#3a2a1e" stroke-width="11"/>`)}
  <path d="M150 214Q172 148 232 140Q294 148 316 214Q288 176 232 172Q176 176 150 214Z" fill="#2f2640"/>
  <path d="M180 206Q166 152 194 142Q206 172 202 204Z" fill="#f2e7c8"/><path d="M284 206Q298 152 270 142Q258 172 262 204Z" fill="#f2e7c8"/>`;
  if (give) s += `<path d="M168 232Q186 222 206 230M258 230Q278 222 296 232" stroke="#2f2640" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M170 258Q184 268 198 258M266 258Q280 268 294 258" stroke="#2f2640" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="232" cy="300" rx="13" ry="15" fill="#5a2136"/>
    <path d="M318 176Q330 198 318 208Q306 198 318 176Z" fill="#8fd0ee"/>`;
  else s += `<path d="M166 238L212 252M298 238L252 252" stroke="#2f2640" stroke-width="12" stroke-linecap="round"/>
    <circle cx="192" cy="262" r="14" fill="#fff"/><circle cx="272" cy="262" r="14" fill="#fff"/>
    <circle cx="188" cy="264" r="7" fill="#3a2a1e"/><circle cx="268" cy="264" r="7" fill="#3a2a1e"/>
    <path d="M186 300Q232 336 278 300Q232 320 186 300Z" fill="#5a2136"/>
    <path d="M198 302l8 -14l7 14ZM258 302l8 -14l7 14Z" fill="#fff"/>`;
  return s;
};
A.oniMad = () => oniBody(false);
A.oniGive = () => oniBody(true);

// 金棒 250×80
A.kanabo = () => `<g transform="rotate(-14 125 40)"><path d="M28 34Q14 40 28 50L210 56Q230 44 210 30Z" fill="#8a5a33"/>
  <rect x="16" y="30" width="22" height="26" rx="9" fill="#6a4428"/>
  ${repeats(4, i => `<circle cx="${70 + i * 42}" cy="${40 + i % 2}" r="7" fill="#f3c64f"/>`)}</g>`;

// ---------- 船 700×470 / 鬼ヶ島 720×470 / 宝の chest 250×190 ----------
A.ship = () => `<rect x="330" y="52" width="16" height="260" rx="6" fill="#6a4428"/>
  <g class="sl"><path d="M348 70H586V246H348Z" fill="${cream}"/>
  <circle cx="467" cy="150" r="46" fill="#d2452f"/>
  <path d="M348 222Q467 198 586 222" stroke="#c0392b" stroke-width="10" fill="none"/>
  <path d="M348 246H586V258H348Z" fill="#c9a05a"/></g>
  <path d="M40 300Q16 342 74 386L620 386Q678 342 654 300Q350 336 40 300Z" fill="#7a4f2e"/>
  <path d="M40 300Q6 252 52 232Q76 262 88 296Z" fill="#8a5f38"/>
  <path d="M654 300Q688 252 642 232Q618 262 606 296Z" fill="#8a5f38"/>
  <rect x="60" y="330" width="584" height="18" rx="9" fill="#5f3d22"/>
  <path d="M70 296l40 -20l0 40Z" fill="#d2452f"/>`;
A.islandOni = () => `<path d="M0 470Q70 340 160 348Q228 250 320 268Q362 168 438 190Q526 140 572 240Q660 262 720 470Z" fill="#2f2a44"/>
  <path d="M56 470Q140 380 230 392Q330 300 430 322Q540 292 610 400Q660 430 690 470Z" fill="#241f36" opacity=".7"/>
  <rect x="322" y="120" width="140" height="120" fill="#1d1830"/><path d="M296 132L392 74L488 132Z" fill="#332a4c"/>
  ${repeats(3, i => `<rect x="${342 + i * 44}" y="156" width="20" height="30" rx="5" fill="#ff8a50"/>`)}
  <path d="M386 74v-34" stroke="#332a4c" stroke-width="8"/><path class="flag" d="M386 40l40 12l-40 14Z" fill="#d2452f"/>
  <path d="M160 470Q170 420 210 400" stroke="#3a3456" stroke-width="10" fill="none"/>
  <ellipse cx="120" cy="470" rx="70" ry="14" fill="#1a1626"/>`;
A.chest = () => `<path d="M20 84L230 84L214 178L36 178Z" fill="#6a3a2c"/>
  <path d="M14 86Q125 6 236 86Q236 100 125 94Q14 100 14 86Z" fill="#7d4632"/>
  <path d="M44 74Q125 36 206 74L196 90Q125 58 54 90Z" fill="#f3c64f"/>
  <rect x="20" y="84" width="210" height="12" fill="#d8b25c"/>
  <circle cx="88" cy="64" r="8" fill="#e2574c"/><circle cx="128" cy="56" r="8" fill="#6cc26a"/><circle cx="166" cy="64" r="8" fill="#5aa9e0"/>
  <rect x="106" y="120" width="38" height="30" rx="6" fill="#d8b25c"/>`;

// ---------- 波の帯・地面 ----------
A.waves = (w, h, c = '#4fa8d8', c2 = '#a6dcf2', seed = 5) => {
  const r = rnd(seed); let s = `<rect y="${F(h * .3)}" width="${w}" height="${F(h * .7)}" fill="${c}"/>`;
  for (let i = 0; i < 7; i++) { const x = F(r() * w), y = F(h * (.45 + r() * .5));
    s += `<path d="M${x} ${y}Q${x + 42} ${y - 26} ${x + 84} ${y}Q${x + 42} ${y - 8} ${x} ${y}Z" fill="${c2}" opacity=".9"/>`; }
  for (let i = 0; i < 9; i++) s += `<ellipse cx="${F(r() * w)}" cy="${F(h * (.5 + r() * .45))}" rx="${F(30 + r() * 46)}" ry="8" fill="#fff" opacity=".4"/>`;
  return s;
};
A.gRiver = () => {
  const r = rnd(11); let s = `<rect width="1440" height="920" fill="#a8d672"/>`;
  for (let i = 0; i < 12; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(r() * 920)}" rx="${F(90 + r() * 130)}" ry="${F(44 + r() * 50)}" fill="${i % 2 ? '#bfe58a' : '#8cc35a'}" opacity=".6"/>`;
  s += `<path d="M-80 620Q300 520 760 560Q1180 596 1520 540V920H-80Z" fill="#63b9de"/>
  <path d="M-80 620Q300 520 760 560Q1180 596 1520 540V576Q1180 630 760 596Q300 556 -80 656Z" fill="#8fd4ec"/>`;
  for (let i = 0; i < 14; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(640 + r() * 260)}" rx="${F(40 + r() * 70)}" ry="10" fill="#e8f8ff" opacity=".55"/>`;
  for (let i = 0; i < 10; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(560 + r() * 80)}" rx="${F(14 + r() * 16)}" ry="${F(8 + r() * 6)}" fill="#b9c4c9"/>`;
  return s;
};
A.gSea = () => {
  const r = rnd(7); let s = `<rect width="1440" height="920" fill="#3f68b0"/>`;
  for (let y = 60; y < 920; y += 110) s += `<path d="M0 ${y}Q180 ${y - 26} 360 ${y}T720 ${y}T1080 ${y}T1440 ${y}V${y + 46}H0Z" fill="${y % 220 ? '#4a76bc' : '#35589a'}" opacity=".8"/>`;
  for (let i = 0; i < 16; i++) s += `<ellipse cx="${F(r() * 1440)}" cy="${F(r() * 920)}" rx="${F(34 + r() * 50)}" ry="9" fill="#cfe4ff" opacity=".5"/>`;
  return s;
};
A.gCourt = () => {
  let s = `<rect width="1440" height="920" fill="#413a58"/>`;
  for (let y = 0; y < 920; y += 96) for (let x = 0; x < 1440; x += 104) if (((x / 104) + (y / 96)) % 2) s += `<rect x="${x}" y="${y}" width="104" height="96" fill="#383150"/>`;
  s += `<path d="M620 920Q640 620 690 430L780 430Q790 640 840 920Z" fill="#8a3b3b"/>
  <path d="M620 920Q640 620 690 430L780 430Q790 640 840 920Z" fill="none" stroke="#c9a24a" stroke-width="6" stroke-dasharray="2 26"/>`;
  const r = rnd(4);
  for (let i = 0; i < 10; i++) s += `<path d="M${F(r() * 1300 + 60)} ${F(r() * 800 + 80)}l30 26l-16 30" stroke="#2c2740" stroke-width="5" fill="none"/>`;
  return s;
};

// 柳(ページ用)300×420 / 桃の木 320×340
A.willowPage = () => `<rect x="132" y="150" width="34" height="270" rx="12" fill="#7a5a38"/>
  <circle cx="149" cy="96" r="74" fill="#6fae7a"/><circle cx="96" cy="130" r="44" fill="#8cc28e"/><circle cx="204" cy="126" r="46" fill="#8cc28e"/>
  ${repeats(7, i => `<path d="M${118 + i * 13} 120Q${96 + i * 15} 250 ${106 + i * 16} 330" stroke="${i % 2 ? '#5f9e6c' : '#8cc28e'}" stroke-width="13" fill="none" stroke-linecap="round"/>`)}`;
A.peachTree = () => `<rect x="146" y="190" width="30" height="150" rx="10" fill="#7a5a38"/>
  <circle cx="160" cy="140" r="92" fill="#f6b7c6"/><circle cx="96" cy="176" r="56" fill="#f2a0b0"/><circle cx="228" cy="172" r="60" fill="#f9c3cf"/>
  ${repeats(6, i => `<circle cx="${100 + (i * 71) % 130}" cy="${96 + (i * 53) % 120}" r="11" fill="#f7aec0"/><circle cx="${102 + (i * 71) % 130}" cy="${94 + (i * 53) % 120}" r="4" fill="#e88ba0"/>`)}`;

// 花びら(降らせる用)26×26
A.petalArt = (c = '#f9c3cf') => `<path d="M13 24Q2 20 4 10Q8 -1 18 2Q26 7 22 16Q18 24 13 24Z" fill="${c}"/>`;

// ---------- 鬼の城(terrace 段々。X=0 で背の上に置き、壁は山折れ)dyn で城ごとせり上げる ----------
A.oniCastle = dyn => {
  const roofArt = (sc = 1) => (w, d) => `<rect width="${w}" height="${d}" fill="#5b5078"/>
    <path d="M0 ${d * .55}Q${w * .5} ${-6 * sc} ${w} ${d * .55}L${w - 34 * sc} ${d}Q${w * .5} ${d * .22} ${34 * sc} ${d}Z" fill="#6a5c90"/>
    <path d="M34 ${d * .92}Q${w * .5} ${d * .18} ${w - 34} ${d * .92}" stroke="#f3c64f" stroke-width="${7 * sc}" fill="none"/>
    <path d="M0 ${d * .5}L${26 * sc} ${d * .1}L${20 * sc} ${d * .8}Z" fill="#6a5c90"/><path d="M${w} ${d * .5}L${w - 26 * sc} ${d * .1}L${w - 20 * sc} ${d * .8}Z" fill="#6a5c90"/>`;
  const stone = (w, h) => { const r = rnd(4); let s = `<rect width="${w}" height="${h}" fill="#6e6688"/>
    <rect width="${w}" height="14" fill="#8b81a8"/>`;
    for (let i = 0; i < 26; i++) s += `<rect x="${F(r() * (w - 70))}" y="${F(18 + r() * (h - 40))}" width="${F(34 + r() * 30)}" height="${F(12 + r() * 9)}" rx="4" fill="#837aa2"/>`;
    return s; };
  const mainWall = (w, h) => { const cx = w / 2; return `<rect width="${w}" height="${h}" fill="#4a4266"/>
    <rect width="${w}" height="16" fill="#5c5380"/><rect y="${h - 20}" width="${w}" height="20" fill="#38314e"/>
    <path d="M${cx - 92} ${h}V${h - 128}Q${cx} ${h - 210} ${cx + 92} ${h - 128}V${h}Z" fill="#171326"/>
    <path d="M${cx - 92} ${h}V${h - 128}Q${cx} ${h - 210} ${cx + 92} ${h - 128}V${h}" fill="none" stroke="#c0392b" stroke-width="16"/>
    <ellipse cx="${cx}" cy="${h - 252}" rx="58" ry="44" fill="#e8e0cf"/>
    <path d="M${cx - 44} ${h - 274}Q${cx - 60} ${h - 312} ${cx - 30} ${h - 312}M${cx + 44} ${h - 274}Q${cx + 60} ${h - 312} ${cx + 30} ${h - 312}" stroke="#f3c64f" stroke-width="10" fill="none"/>
    <path d="M${cx - 34} ${h - 258}L${cx - 12} ${h - 250}M${cx + 34} ${h - 258}L${cx + 12} ${h - 250}" stroke="#2f2640" stroke-width="8" stroke-linecap="round"/>
    <path d="M${cx - 20} ${h - 232}Q${cx} ${h - 218} ${cx + 20} ${h - 232}" stroke="#2f2640" stroke-width="7" fill="none"/>
    ${[-1, 1].map(sd => `<rect x="${cx + sd * 190 - 26}" y="${h - 170}" width="52" height="64" rx="8" fill="#171326"/>
    <rect x="${cx + sd * 190 - 26}" y="${h - 170}" width="52" height="64" rx="8" fill="none" stroke="#d9cfae" stroke-width="7"/>
    <rect x="${cx + sd * 190 - 18}" y="${h - 162}" width="36" height="48" rx="5" fill="#ff8a50" opacity=".85"/>`).join('')}`; };
  const upWall = (w, h) => `<rect width="${w}" height="${h}" fill="#544a72"/>
    <rect width="${w}" height="14" fill="#665b8a"/>
    <circle cx="${w / 2}" cy="${h * .45}" r="26" fill="#171326"/><circle cx="${w / 2}" cy="${h * .45}" r="26" fill="none" stroke="#d9cfae" stroke-width="7"/>
    <rect x="${w / 2 - 15}" y="${h * .45 - 15}" width="30" height="30" fill="#ff8a50" opacity=".85"/>`;
  const orn = (w, h) => { const cx = w / 2; return `<path d="M${cx - 40} ${h}Q${cx} ${h - 66} ${cx + 40} ${h}Z" fill="#4a3f5e"/>
    <path d="M${cx - 34} ${h}Q${cx} ${h - 54} ${cx + 34} ${h}" stroke="#f3c64f" stroke-width="6" fill="none"/>
    <path d="M${cx - 16} ${h - 40}Q${cx - 26} ${h - 96} ${cx - 6} ${h - 108}Q${cx - 2} ${h - 78} ${cx + 2} ${h - 52}Z" fill="#f3c64f"/>
    <path d="M${cx + 16} ${h - 40}Q${cx + 26} ${h - 96} ${cx + 6} ${h - 108}Q${cx + 2} ${h - 78} ${cx - 2} ${h - 52}Z" fill="#f3c64f"/>`; };
  return terrace({ X: 0, Y: 560, dyn, tiers: [
    { w: 940, h: 110, d: 74, top: '#847aa4', art: stone },
    { w: 900, h: 22, d: 104, top: roofArt(1.4), art: `<rect width="900" height="22" fill="#5b5078"/>` },
    { w: 800, h: 280, d: 64, top: '#554c74', art: mainWall },
    { w: 620, h: 20, d: 96, top: roofArt(1.1), art: `<rect width="620" height="20" fill="#5b5078"/>` },
    { w: 500, h: 230, d: 50, top: roofArt(.9), art: upWall },
    { w: 210, h: 200, d: 44, top: false, art: orn },
  ] });
};

// ---------- 表紙 738×948 ----------
A.coverMomo = () => `<defs>
  <linearGradient id="cvsky" x2="0%" y2="100%"><stop stop-color="#28406e"/><stop offset="1" stop-color="#3f5a8c"/></linearGradient>
  <radialGradient id="cvglow"><stop stop-color="#ffdf9e"/><stop offset="1" stop-color="#ffdf9e" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="738" height="948" fill="url(#cvsky)"/>
  <rect width="38" height="948" fill="#152a45"/>
  <ellipse cx="380" cy="430" rx="330" ry="300" fill="url(#cvglow)" opacity=".5"/>
  <path d="M0 760Q200 690 420 730T738 706V948H0Z" fill="#243a63"/>
  <path d="M560 620Q600 540 650 560Q700 520 720 620Z" fill="#1b2c4d"/>
  <g fill="#f6b7c6"><circle cx="150" cy="300" r="86"/><circle cx="96" cy="360" r="52"/><circle cx="208" cy="356" r="56"/></g>
  <rect x="140" y="360" width="24" height="120" rx="8" fill="#5f4630"/>
  <g transform="translate(240 470)">
    <circle cx="160" cy="150" r="140" fill="#f5a3b8"/><circle cx="104" cy="158" r="96" fill="#f7aec0"/>
    <path d="M160 16Q196 60 186 104Q160 72 132 104Q124 58 160 16Z" fill="#f9c3cf"/>
    <path d="M160 40Q150 150 160 282" stroke="#e88ba0" stroke-width="12" fill="none"/>
    <path d="M170 22Q204 4 226 18Q200 36 178 30Z" fill="#7cbf66"/>
    <g transform="translate(96 60) scale(.62)">${A.momo({ armR: -140, mouth: 'big' })}</g>
  </g>
  ${repeats(10, i => `<path d="M${480 + (i * 137) % 210} ${120 + (i * 89) % 560}q10 -4 18 2q-6 10-18 4Z" fill="#f9c3cf" opacity=".7"/>`)}
  <text x="388" y="130" font-family='${FONT}' font-weight="900" font-size="84" text-anchor="middle" fill="#0c2340" transform="translate(4 5)">MOMOTARO</text>
  <text x="388" y="130" font-family='${FONT}' font-weight="900" font-size="84" text-anchor="middle" fill="${gold}">MOMOTARO</text>
  <text x="384" y="184" font-family='${FONT}' font-weight="700" font-size="30" letter-spacing="6" text-anchor="middle" fill="${cream}">The Peach Boy</text>
  <text x="384" y="908" font-family='${FONT}' font-weight="700" font-size="20" letter-spacing="7" text-anchor="middle" fill="#f8e3a0">A POP-UP STORYBOOK</text>
  <rect x="56" y="56" width="626" height="836" fill="none" stroke="${gold}" stroke-width="5"/>
  <rect x="70" y="70" width="598" height="808" fill="none" stroke="${gold}" stroke-width="2" opacity=".7"/>`;
