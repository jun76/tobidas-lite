// ============================================================
// ももたろう(英語版・popart)の絵。目録にない絵在这里描く。
// 約束: 各絵は w0×h0 の箱に収まり、足元は y=h0。線は描かない(エンジンが縁取る)。
// ============================================================
const ENF = '"Georgia","Times New Roman",serif';        // 本文の欧文フォント(book.js で theme.font に指定)
const ENFT = '"Trebuchet MS","Verdana","DejaVu Sans",sans-serif';   // 表紙の題名

// ---------- 日本一の剣(ももたろうの持物)40×150 ----------
A.sword = () => `<rect x="14" y="6" width="12" height="98" rx="5" fill="#e8ecf0"/><path d="M14 60h12v92a6 6 0 0 1-12 0Z" fill="#cfd6de"/>
  <rect x="6" y="100" width="28" height="12" rx="5" fill="#e0b23c"/><rect x="15" y="112" width="10" height="34" rx="4" fill="#3a3542"/><circle cx="20" cy="118" r="3" fill="#e0b23c"/>`;
// 持ち方: 刀は伸ばした腕の延長(柄を手に握らせ、刃先は腕の向きへ)。
// 腕グループごと回っても刃先が体の方を向かない。
const A_swordHold = () => `<g transform="translate(80 150) scale(.5) translate(-20 0) rotate(180 20 75)">${A.sword()}</g>`;

// ---------- ももたろう(大人)。A.person の着せ替え ----------
// 総髪のちょんまげ + 赤い半缠 + 帯。o: armL, armR, mouth, holdR など A.person の設定がそのまま効く
A.momoHair = `<path d="M30 64Q26 26 60 24Q94 26 90 64Q84 44 60 42Q36 44 30 64Z" fill="#2e2318"/>
  <path d="M50 32Q46 10 62 8Q76 10 72 32Z" fill="#2e2318"/><circle cx="61" cy="11" r="10" fill="#2e2318"/>`;
A.momo = (o = {}) => A.person(Object.assign({
  top: '#e2574c', bottom: '#f3c64f', hair: A.momoHair,
  extra: `<path d="M45 94L60 118L75 94Z" fill="#fbf6ea"/>
    <rect x="33" y="132" width="54" height="12" rx="5" fill="#f6ecd6"/><rect x="54" y="130" width="12" height="16" rx="4" fill="#e0b23c"/>`,
}, o));
// 剣を持ったももたろう(右手上げ持ち)
A.momoSword = (o = {}) => A.momo(Object.assign({ holdR: A_swordHold() }, o));

// ---------- 桃から生まれた赤ちゃん 130×120(足元 y=120) ----------
A.baby = () => `<ellipse cx="65" cy="94" rx="43" ry="27" fill="#f2685f"/><ellipse cx="65" cy="100" rx="30" ry="14" fill="#fbf6ea"/>
  <circle cx="33" cy="80" r="10" fill="#f6cfa6"/><circle cx="97" cy="80" r="10" fill="#f6cfa6"/>
  <circle cx="65" cy="48" r="30" fill="#f6cfa6"/>
  <path d="M52 20Q64 8 76 20Q70 27 58 26Z" fill="#2e2318"/>
  <path d="M48 46Q53 51 58 46M72 46Q77 51 82 46" stroke="#3a2a1e" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M56 58Q65 72 74 58Z" fill="#8a3b2a"/>
  <circle cx="43" cy="56" r="6.5" fill="#f08f7e" opacity=".6"/><circle cx="87" cy="56" r="6.5" fill="#f08f7e" opacity=".6"/>`;

// ---------- 割れた桃の半分 320×360(右端が割れ目。flip:true で反対側) ----------
// --- まるごと桃(割れる前)— 半分2枚の皮色と同じで、断面とつながる ---
A.peachWhole = (o = {}) => `<g transform="translate(0 34)">
    <path d="M320 -2Q150 -6 56 56Q2 140 16 238Q36 334 152 356Q240 366 320 360Q400 366 488 356Q604 334 624 238Q638 140 584 56Q490 -6 320 -2Z" fill="#f4a6ae"/>
    <path d="M70 36Q14 116 24 210Q40 296 148 320Q78 272 62 182Q54 102 88 30Z" fill="#ec8493" opacity=".6"/>
    <path d="M570 36Q626 116 616 210Q600 296 492 320Q562 272 578 182Q586 102 552 30Z" fill="#ec8493" opacity=".5"/>
    <path d="M316 -2q-16 180 6 362q24 -184 -6 -362Z" fill="#d9718a"/>
    <path d="M330 12 q4 -26 16 -38" stroke="#7a4e2e" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M344 -14q38 -24 72 -6q-30 28 -72 6Z" fill="#5aa64e"/>
    <path d="M96 62q26 -20 52 -12q-20 22 -52 12Z" fill="#fff3e8" opacity=".8"/>
    <circle cx="120" cy="236" r="7" fill="#f9cdd3"/><circle cx="90" cy="198" r="5" fill="#f9cdd3"/>
    <circle cx="520" cy="242" r="7" fill="#f9cdd3"/><circle cx="560" cy="200" r="5" fill="#f9cdd3"/>
  </g>`;

// 割れた半分:外側(皮)が前面で、断面の白は切り口の縁に少しだけ見える
A.peachHalf = (o = {}) => {
  let s = `<path d="M314 2Q150 -4 56 54Q4 138 18 238Q38 332 150 354Q240 362 314 356Z" fill="#f4a6ae"/>
    <path d="M70 70Q14 150 24 244Q40 330 148 354Q78 306 62 216Q54 136 88 64Z" fill="#ec8493" opacity=".6"/>
    <path d="M314 10q14 172 0 344q-8 -172 0 -344Z" fill="#fff0dd"/>
    <path d="M96 96q26 -20 52 -12q-20 22 -52 12Z" fill="#fff3e8" opacity=".8"/>
    <circle cx="120" cy="270" r="7" fill="#f9cdd3"/><circle cx="90" cy="232" r="5" fill="#f9cdd3"/>`;
  return o.flip ? `<g transform="translate(320 0) scale(-1 1)">${s}</g>` : s;
};

// ---------- きびだんご(串)150×70 ----------
A.dango = () => `<rect x="8" y="52" width="134" height="8" rx="4" fill="#c99a62" transform="rotate(-16 75 56)"/>
  <circle cx="44" cy="46" r="17" fill="#fbf6ea"/><circle cx="76" cy="37" r="17" fill="#fbf6ea"/><circle cx="108" cy="28" r="17" fill="#fbf6ea"/>
  <circle cx="40" cy="41" r="6" fill="#ffffff" opacity=".85"/><circle cx="72" cy="32" r="6" fill="#ffffff" opacity=".85"/><circle cx="104" cy="23" r="6" fill="#ffffff" opacity=".85"/>
  <path d="M128 26q16 -8 22 4q-14 8 -22 -4Z" fill="#7cbf66"/>`;
const A_dangoHold = () => `<g transform="translate(80 150) scale(.42) translate(-75 -70)">${A.dango()}</g>`;

// ---------- きじ(雉)240×250(右向き。flip:true で左向き。\.wg 羽) ----------
A.pheasant = (o = {}) => {
  let s = `<path d="M96 150Q52 132 10 96Q56 92 90 118Z" fill="#8a5a33"/><path d="M96 162Q46 152 8 132Q52 128 92 140Z" fill="#a5713f"/>
    <path d="M96 144Q60 148 30 160Q64 168 96 158Z" fill="#c98a4a"/>
    <ellipse cx="150" cy="150" rx="60" ry="52" fill="#a5713f"/><ellipse cx="176" cy="158" rx="30" ry="34" fill="#d9a066"/>
    <g class="wg"><ellipse cx="142" cy="148" rx="40" ry="30" fill="#8a5a33"/><ellipse cx="130" cy="142" rx="18" ry="12" fill="#c98a4a"/></g>
    <path d="M188 120Q196 92 206 84L222 96Q208 112 204 132Z" fill="#6b4a2a"/>
    <circle cx="210" cy="82" r="25" fill="#4a3a2a"/>
    <path d="M224 62q-4 -14 8 -18q2 12 4 16Z" fill="#e2574c"/><path d="M212 60q-6 -12 4 -18q6 10 6 16Z" fill="#c94234"/>
    <path d="M231 78l14 5l-13 7Z" fill="#e8c88a"/><path d="M228 92q8 4 6 12q-8 -2 -6 -12Z" fill="#e2574c"/>
    <circle cx="216" cy="78" r="4.5" fill="#2e2318"/>
    <rect x="148" y="196" width="8" height="42" fill="#c98a4a"/><rect x="176" y="196" width="8" height="42" fill="#c98a4a"/>
    <path d="M146 238h20l6 10h-26ZM174 238h20l6 10h-26Z" fill="#e8a84a"/>`;
  return o.flip ? `<g transform="translate(240 0) scale(-1 1)">${s}</g>` : s;
};

// ---------- 鬼 240×330(足元 y=330。\.aL(62,118)/\.aR(178,118)腕・\.hd頭・\.mo開き口/\.mc食いしばり・\.club 棒) ----------
// o: armL, armR(度), mouth 'open'|'closed', club:true/false
A.oni = (o = {}) => {
  const { armL = 16, armR = -16, mouth = 'open', club = true } = o;
  const SK = '#d9483b', DK = '#b8362c', HR = '#2e2318', SH = '#f3c64f';
  let s = `<g class="lgL"><rect x="72" y="248" width="34" height="70" rx="16" fill="${DK}"/><ellipse cx="82" cy="324" rx="26" ry="10" fill="${HR}"/></g>
    <g class="lgR"><rect x="134" y="248" width="34" height="70" rx="16" fill="${DK}"/><ellipse cx="162" cy="324" rx="26" ry="10" fill="${HR}"/></g>
    <path d="M58 194Q120 172 182 194L190 268Q120 292 50 268Z" fill="${SH}"/>
    <path d="M78 196q10 30 4 62M120 186q6 34 2 74M160 196q-8 28 -2 60" stroke="${HR}" stroke-width="9" fill="none"/>
    <path d="M62 96Q120 72 178 96L188 212Q120 238 52 212Z" fill="${SK}"/>
    <ellipse cx="120" cy="176" rx="46" ry="30" fill="${SK}" opacity=".6"/><path d="M96 156Q120 168 144 156" stroke="${DK}" stroke-width="6" fill="none"/>
    <g class="aL" transform="rotate(${armL} 62 118)"><rect x="38" y="102" width="30" height="98" rx="15" fill="${SK}"/><circle cx="53" cy="208" r="17" fill="${SK}"/><path d="M40 200h26M40 212h26" stroke="${DK}" stroke-width="4"/></g>
    <g class="aR" transform="rotate(${armR} 178 118)"><rect x="172" y="102" width="30" height="98" rx="15" fill="${SK}"/><circle cx="188" cy="208" r="17" fill="${SK}"/>
      ${club ? `<g class="club"><g transform="translate(188 208) scale(.62) translate(-35 0) rotate(180 35 72)"><path d="M18 6Q35 -6 52 6L58 132Q35 150 12 132Z" fill="#8a5a33"/><path d="M18 6Q35 -6 52 6L54 34Q35 24 16 34Z" fill="#6b4423"/>
        <circle cx="35" cy="34" r="8" fill="#e0b23c"/><circle cx="22" cy="70" r="8" fill="#e0b23c"/><circle cx="48" cy="70" r="8" fill="#e0b23c"/><circle cx="35" cy="106" r="8" fill="#e0b23c"/></g></g>` : ''}
    </g>
    <g class="hd"><rect x="110" y="76" width="20" height="18" fill="${SK}"/>
      <path d="M76 26Q82 0 96 8L92 34Z" fill="#fbf1dc"/><path d="M164 26Q158 0 144 8L148 34Z" fill="#fbf1dc"/>
      <ellipse cx="120" cy="60" rx="50" ry="44" fill="${SK}"/>
      <path d="M70 34Q80 14 120 14Q160 14 170 34Q150 26 120 26Q90 26 70 34Z" fill="${HR}"/>
      <path d="M84 40L112 46M156 40L128 46" stroke="${HR}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="100" cy="56" r="6.5" fill="#2e2318"/><circle cx="140" cy="56" r="6.5" fill="#2e2318"/>
      <path d="M116 66h8l-4 8Z" fill="${DK}"/>
      <g class="mo" ${mouth === 'open' ? '' : 'display="none"'}><path d="M96 78Q120 104 144 78Q134 92 120 92Q106 92 96 78Z" fill="#8a3b2a"/>
        <path d="M102 80l5 9l5 -9ZM133 80l-5 9l-5 -9Z" fill="#fbf1dc"/></g>
      <g class="mc" ${mouth === 'closed' ? '' : 'display="none"'}><rect x="98" y="78" width="44" height="14" rx="5" fill="#8a3b2a"/>
        <path d="M104 78l4 8l4 -8ZM132 78l-4 8l-4 -8Z" fill="#fbf1dc"/></g>
      <circle cx="80" cy="70" r="7" fill="${DK}" opacity=".5"/><circle cx="160" cy="70" r="7" fill="${DK}" opacity=".5"/>
    </g>`;
  return s;
};

// ---------- 鬼の城(terrace の段。手前から) ----------
A.oniCastleTiers = () => {
  const W1 = '#3a3542', W2 = '#2b2733', RF = '#4a4655', RF2 = '#35323f', GD = '#e0b23c', PL = '#f6ecd6';
  // 軒先(壁の天井に付く黒瓦の縁。反り上がり+金の点)
  const eave = (w, y = 34) => `<path d="M0 0H${w}V${y}Q${w - 46} ${y + 26} ${w - 110} ${y + 22}H110Q46 ${y + 26} 0 ${y}Z" fill="${RF}"/>`
    + Array.from({ length: Math.floor(w / 36) }, (_, i) => `<path d="M${18 + i * 36} 0V${y + 16}" stroke="${RF2}" stroke-width="5"/>`).join('')
    + `<path d="M0 ${y}Q46 ${y + 26} 110 ${y + 22}H${w - 110}Q${w - 46} ${y + 26} ${w} ${y}L${w} ${y + 14}Q${w - 46} ${y + 42} ${w - 110} ${y + 38}H110Q46 ${y + 42} 0 ${y + 14}Z" fill="${RF2}"/>`
    + Array.from({ length: Math.floor((w - 240) / 48) + 1 }, (_, i) => `<circle cx="${120 + i * 48}" cy="${y + 30}" r="5" fill="${GD}"/>`).join('')
    + `<circle cx="30" cy="${y + 10}" r="13" fill="${PL}"/><circle cx="24" cy="${y + 6}" r="3.5" fill="#2e2318"/><circle cx="36" cy="${y + 6}" r="3.5" fill="#2e2318"/><path d="M24 ${y + 16}h12" stroke="#2e2318" stroke-width="3"/>`
    + `<circle cx="${w - 30}" cy="${y + 10}" r="13" fill="${PL}"/><circle cx="${w - 36}" cy="${y + 6}" r="3.5" fill="#2e2318"/><circle cx="${w - 24}" cy="${y + 6}" r="3.5" fill="#2e2318"/><path d="M${w - 36} ${y + 16}h12" stroke="#2e2318" stroke-width="3"/>`;
  // 屋根正面(軒から棟へすぼまる黒瓦。棟に金のシャチホモ)
  const roof = (w, yR, yE, inset, shachi) => {
    let s = `<path d="M0 ${yE - 22}Q${w * .05} ${yE} ${w * .13} ${yE}H${w * .87}Q${w * .95} ${yE} ${w} ${yE - 22}L${w - inset} ${yR}H${inset}Z" fill="${RF}"/>`;
    const n = Math.round(w / 36);
    for (let i = 1; i < n; i++) { const u = i / n, xb = w * .06 + u * w * .88, xt = inset + u * (w - 2 * inset); s += `<path d="M${F(xb)} ${yE - 6}L${F(xt)} ${yR + 10}" stroke="${RF2}" stroke-width="5" stroke-linecap="round"/>`; }
    s += `<rect x="${inset - 14}" y="${yR - 8}" width="${w - 2 * inset + 28}" height="22" rx="7" fill="${RF2}"/><rect x="${inset - 14}" y="${yR - 8}" width="${w - 2 * inset + 28}" height="6" rx="3" fill="${GD}"/>`;
    s += `<circle cx="${w * .16}" cy="${yE}" r="12" fill="${PL}"/><circle cx="${w * .16 - 5}" cy="${yE - 4}" r="3" fill="#2e2318"/><circle cx="${w * .16 + 5}" cy="${yE - 4}" r="3" fill="#2e2318"/>`
      + `<circle cx="${w * .84}" cy="${yE}" r="12" fill="${PL}"/><circle cx="${w * .84 - 5}" cy="${yE - 4}" r="3" fill="#2e2318"/><circle cx="${w * .84 + 5}" cy="${yE - 4}" r="3" fill="#2e2318"/>`;
    if (shachi) { const horn = (x, m) => `<path d="M${x - m * 6} ${yR + 10}Q${x - m * 2} ${yR - 22} ${x + m * 26} ${yR - 38}Q${x + m * 14} ${yR - 14} ${x + m * 26} ${yR + 10}Z" fill="${GD}"/><circle cx="${x + m * 10}" cy="${yR - 10}" r="4" fill="#8a5a1a"/>`;
      s += horn(inset - 4, -1) + horn(w - inset + 4, 1); }
    return s;
  };
  const deck = (lip, over) => ({ lip, over, top: (w, d) => `<rect width="${w}" height="${d}" fill="${RF}"/>`
    + Array.from({ length: Math.floor(w / 32) }, (_, i) => `<path d="M${16 + i * 32} 0V${d - 12}" stroke="${RF2}" stroke-width="5"/>`).join('')
    + `<rect y="${d - 14}" width="${w}" height="14" fill="${RF2}"/>` + Array.from({ length: Math.floor((w - 24) / 38) }, (_, i) => `<circle cx="${24 + i * 38}" cy="${d - 7}" r="4.5" fill="${GD}"/>`).join('') });
  return [
    // 石垣の台
    { w: 900, h: 80, d: 60, top: '#8a8378', art: (w, h) => `<rect width="${w}" height="${h}" fill="#77706a"/><path d="M0 26H${w}M0 54H${w}" stroke="#5f5954" stroke-width="5"/>`
      + Array.from({ length: 10 }, (_, i) => `<path d="M${45 + i * 90 + (i % 2) * 22} 0V${i < 3 || i > 6 ? 26 : 54}" stroke="#5f5954" stroke-width="5"/>`).join('') },
    // 一の階の黒壁(大きな鬼門)。上端に大屋根の軒先
    { w: 840, h: 250, d: 34, ...deck(56, 34), art: (w, h) => {
      const cx = w / 2; let s = `<rect width="${w}" height="${h}" fill="${W1}"/>`
        + `<rect y="${h - 34}" width="${w}" height="34" fill="${W2}"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M${i * 70} ${h - 34}L${i * 70 + 24} ${h}" stroke="${RF2}" stroke-width="4"/>`).join('');
      s += `<rect x="60" y="88" width="90" height="70" rx="8" fill="${GD}"/><rect x="68" y="96" width="74" height="54" fill="${W2}"/>`
        + `<rect x="${w - 150}" y="88" width="90" height="70" rx="8" fill="${GD}"/><rect x="${w - 142}" y="96" width="74" height="54" fill="${W2}"/>`;
      s += `<path d="M${cx - 150} ${h}Q${cx - 128} ${h - 46} ${cx - 128} 120Q${cx - 128} 74 ${cx} 70Q${cx + 128} 74 ${cx + 128} 120Q${cx + 128} ${h - 46} ${cx + 150} ${h}Z" fill="${GD}"/>`
        + `<path d="M${cx - 134} ${h}Q${cx - 114} ${h - 40} ${cx - 114} 122Q${cx - 114} 86 ${cx} 82Q${cx + 114} 86 ${cx + 114} 122Q${cx + 114} ${h - 40} ${cx + 134} ${h}Z" fill="#4a321f"/>`
        + `<path d="M${cx} 82V${h}" stroke="#2e2318" stroke-width="5"/>`
        + [[-84, 140], [-42, 140], [42, 140], [84, 140], [-84, 200], [-42, 200], [42, 200], [84, 200]].map(([dx, y]) => `<circle cx="${cx + dx}" cy="${y}" r="8" fill="${GD}"/>`).join('');
      return s + eave(w) + `<rect y="60" width="${w}" height="20" fill="${W2}" opacity=".8"/>`;
    } },
    // 下の大屋根(正面の面)
    { w: 800, h: 316, d: 50, top: false, art: (w) => roof(w, 44, 150, 168, false) },
    // 二の階の黒壁(金の格子と「鬼」の額)。上端に上の屋根の軒先
    { w: 540, h: 470, d: 50, ...deck(50, 30), art: (w, h) => {
      const cx = w / 2; let s = `<rect width="${w}" height="${h}" fill="${W1}"/><rect y="${h - 30}" width="${w}" height="30" fill="${W2}"/>`;
      s += `<rect x="${cx - 120}" y="150" width="240" height="110" fill="${W2}"/>`
        + Array.from({ length: 5 }, (_, i) => `<rect x="${cx - 120 + i * 50}" y="150" width="8" height="110" fill="${GD}"/>`).join('')
        + `<rect x="${cx - 120}" y="186" width="240" height="8" fill="${GD}"/>`;
      s += `<rect x="${cx - 64}" y="72" width="128" height="60" rx="8" fill="${GD}"/><text x="${cx}" y="118" text-anchor="middle" font-family='${FONT}' font-weight="900" font-size="46" fill="#8a3b2a">鬼</text>`;
      s += `<rect x="34" y="308" width="76" height="86" rx="7" fill="${GD}"/><rect x="42" y="316" width="60" height="70" fill="${W2}"/>`
        + `<rect x="${w - 110}" y="308" width="76" height="86" rx="7" fill="${GD}"/><rect x="${w - 102}" y="316" width="60" height="70" fill="${W2}"/>`;
      return s + eave(w) + `<rect y="56" width="${w}" height="18" fill="${W2}" opacity=".8"/>`;
    } },
    // 上の屋根(棟に金のシャチホモ)
    { w: 600, h: 580, d: 50, top: false, art: (w) => roof(w, 44, 152, 128, true) },
  ];
};

// ---------- 船と家来たち 840×500(水線 y=500) ----------
A.shipParty = () => `<path d="M30 390Q420 470 810 390L770 306Q420 348 70 306Z" fill="#8a5a33"/>
  <path d="M70 306Q420 348 770 306L770 326Q420 370 70 326Z" fill="#a56f3d"/>
  <path d="M46 314Q26 254 62 214Q50 268 88 300Z" fill="#e0b23c"/><path d="M794 314Q814 254 778 214Q790 268 752 300Z" fill="#e0b23c"/>
  <rect x="540" y="112" width="14" height="202" fill="#6b4423"/>
  <rect x="428" y="110" width="236" height="12" rx="5" fill="#6b4423"/>
  <rect x="440" y="124" width="212" height="172" rx="6" fill="#fbf6ea"/>
  <circle cx="546" cy="210" r="52" fill="#e2574c"/>
  <rect x="440" y="150" width="212" height="6" fill="#d8cdb8"/><rect x="440" y="262" width="212" height="6" fill="#d8cdb8"/>
  <path class="flag" d="M554 88l62 13l-62 13Z" fill="#f3c64f"/>
  <ellipse cx="70" cy="452" rx="52" ry="14" fill="#fff"/><ellipse cx="776" cy="452" rx="52" ry="14" fill="#fff"/>
  <ellipse cx="240" cy="470" rx="70" ry="12" fill="#fff" opacity=".7"/><ellipse cx="600" cy="470" rx="70" ry="12" fill="#fff" opacity=".7"/>
  <g transform="translate(150 210) scale(.48)">${lib('wild.monkey')}</g>
  <g transform="translate(262 226) scale(.5)">${lib('dog.shiba')}</g>
  <g transform="translate(352 186) scale(.55)">${A.momo({ armR: -130, mouth: 'big' })}</g>
  <g transform="translate(622 205) scale(.42)">${A.pheasant()}</g>`;

// ---------- 地面の描き足し ----------
// 海(見開き 1440×920。上は空、下は三段の海)
A.gSea = (o = {}) => {
  const sky = o.dusk ? '#8fa6c9' : '#cfe9f2';
  let s = `<rect width="1440" height="920" fill="${sky}"/>
    <rect y="300" width="1440" height="150" fill="#8fd0f0"/><rect y="450" width="1440" height="190" fill="#6fb8e4"/><rect y="640" width="1440" height="280" fill="#4f9fd0"/>`;
  for (const [y, k] of [[300, 7], [450, 9], [640, 11], [780, 13]]) {
    for (let i = 0; i < k; i++) s += `<path d="M${40 + i * (1360 / k)} ${y + 12}q34 -18 68 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>`;
  }
  for (let i = 0; i < 22; i++) { const r = (i * 97) % 1400 + 20, q = 660 + (i * 53) % 240; s += `<circle cx="${r}" cy="${q}" r="${5 + (i % 3) * 3}" fill="#fff" opacity=".7"/>`; }
  return s;
};
// 鬼ヶ島の岩場(yard:true で城前の石畳)
A.gRock = (o = {}) => {
  let s = `<rect width="1440" height="920" fill="#b9b2a8"/>`;
  if (!o.yard) s += `<rect width="1440" height="120" fill="#4f9fd0"/><path d="M0 118q40 -16 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" stroke="#fff" stroke-width="6" fill="none"/>`;
  for (let i = 0; i < 14; i++) { const x = (i * 199) % 1340 + 30, y = (o.yard ? 160 : 170) + (i * 97) % 620;
    s += `<ellipse cx="${x}" cy="${y}" rx="${90 + (i % 4) * 40}" ry="${44 + (i % 3) * 20}" fill="${i % 2 ? '#a29a8e' : '#c6bfb4'}" opacity=".8"/>`; }
  const jag = (x, y, w, h, c) => `<path d="M${x} ${y}L${x + w * .3} ${y - h}L${x + w * .55} ${y - h * .4}L${x + w} ${y}Z" fill="${c}"/>`;
  s += jag(40, 300, 210, 130, '#6e675e') + jag(260, 340, 150, 90, '#7d766c') + jag(1180, 320, 220, 150, '#6e675e') + jag(1040, 350, 150, 90, '#7d766c');
  if (o.yard) {
    for (let r = 0; r < 5; r++) for (let cN = 0; cN < 8; cN++) { const x = 120 + cN * 160 + (r % 2) * 40, y = 380 + r * 105;
      s += `<rect x="${x}" y="${y}" width="146" height="88" rx="12" fill="${(r + cN) % 2 ? '#c6bfb4' : '#b0a99e'}"/>`; }
    s += `<rect x="560" y="300" width="320" height="34" rx="8" fill="#a29a8e"/><rect x="590" y="266" width="260" height="34" rx="8" fill="#948c81"/><rect x="620" y="232" width="200" height="34" rx="8" fill="#877f74"/>`;
  }
  return s;
};

// ---------- 表紙 738×948(左端 38px は背の帯) ----------
A.cover = () => `<rect width="738" height="948" fill="#e2574c"/>
  <rect x="41" width="697" height="948" fill="#e9634f"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M400 600L${400 + 760 * Math.cos(i * Math.PI / 6)} ${600 + 760 * Math.sin(i * Math.PI / 6)}L${400 + 760 * Math.cos(i * Math.PI / 6 + .24)} ${600 + 760 * Math.sin(i * Math.PI / 6 + .24)}Z" fill="#e2574c"/>`).join('')}
  <rect x="38" width="3" height="948" fill="#e0b23c"/><rect width="38" height="948" fill="#8f2e24"/>
  <rect x="0" y="444" width="38" height="60" fill="#e0b23c"/>
  <rect x="58" y="58" width="640" height="832" rx="10" fill="#e0b23c"/><rect x="70" y="70" width="616" height="808" rx="8" fill="#e9634f"/>
  <path d="M405 432Q400 404 372 398Q398 390 410 414Z" fill="#5aa64e"/><rect x="398" y="408" width="12" height="30" fill="#8a5a33"/>
  <circle cx="330" cy="580" r="172" fill="#f4a6ae"/><circle cx="470" cy="580" r="150" fill="#f4a6ae"/>
  <path d="M400 414Q378 560 400 748Q422 560 400 414Z" fill="#d9718a" opacity=".85"/>
  <ellipse cx="300" cy="520" rx="52" ry="34" fill="#fbd6dc" opacity=".9"/>
  <g transform="translate(296 706) scale(1.22)">${A.momo({ armR: -130, mouth: 'big', holdR: A_swordHold() })}</g>
  <text x="392" y="236" text-anchor="middle" font-family='${ENFT}' font-weight="900" font-size="92" letter-spacing="1" fill="#8f2e24">MOMOTARO</text>
  <text x="388" y="232" text-anchor="middle" font-family='${ENFT}' font-weight="900" font-size="92" letter-spacing="1" fill="#f6ecd6">MOMOTARO</text>
  <text x="392" y="298" text-anchor="middle" font-family='${ENFT}' font-weight="900" font-size="32" letter-spacing="7" fill="#f6ecd6">THE PEACH BOY</text>`;
