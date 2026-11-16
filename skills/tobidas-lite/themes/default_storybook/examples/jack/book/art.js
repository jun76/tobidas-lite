// 「ジャックと豆の木」だけの絵。共通パーツ(theme/parts/parts.js の A.* と目録)に足す形で定義する。
// どれも「SVGの中身の文字列」を返す。描き方は themes/default_storybook/art-style.md。

// ---------- ジャック(緑の服と羽根つきの帽子) ----------
// 骨格は A.person。髪と帽子はこの作品のために描く。ポーズは使う側で armL / armR / mouth などを渡す
A.jackHair = `<path d="M31 60Q28 30 60 28Q92 30 89 60Q84 44 60 44Q38 44 31 60Z" fill="#c9853a"/>
  <path d="M26 44Q34 6 66 12Q92 18 94 44Q60 30 26 44Z" fill="#3f8a4a"/><path d="M26 44Q60 30 94 44L94 50Q60 37 26 50Z" fill="#2f6d3a"/>
  <path d="M84 30Q104 4 112 -8Q100 22 92 38Z" fill="#e2574c"/>`;
A.jack = (o = {}) => A.person(Object.assign({
  top: '#4f9d4a', bottom: '#8a6238', hair: A.jackHair,
  extra: `<rect x="33" y="136" width="54" height="9" rx="4" fill="#5a3a22"/><rect x="55" y="134" width="11" height="13" rx="3" fill="#f3c64f"/><path d="M48 90L60 104L72 90Z" fill="#fbf6ea"/>`,
}, o));
// おのを持たせる(右手。腕を下ろした状態で刃が体の側を向き、振り下ろすと刃が下を向く)
A.axeHold = `<g transform="translate(80 150) scale(.62 -.62) translate(-61 -176)">${lib('tool.axe')}</g>`;

// ---------- お母さん・おじいさん(目録の人物を着せ替える) ----------
A.mother = (o = {}) => lib('folk.woman', Object.assign({ top: '#c9785a', bottom: '#a85f48', hairC: '#7a4f2e' }, o));
A.oldman = (o = {}) => lib('elder.grandpa', Object.assign({ top: '#5b4a8a', bottom: '#3f3a5a', hairC: '#f3f0ea' }, o))
  + `<path d="M24 40Q60 22 96 40L92 46Q60 34 28 46Z" fill="#3f3466"/><path d="M36 38Q44 -6 74 -14Q70 12 84 38Q60 28 36 38Z" fill="#5b4a8a"/><circle cx="74" cy="-14" r="7" fill="#f3c64f"/>`;

// ---------- まほうの豆 ----------
A.beans = () => `<ellipse cx="18" cy="26" rx="13" ry="10" fill="#6cc26a" transform="rotate(-20 18 26)"/><ellipse cx="40" cy="16" rx="13" ry="10" fill="#8fd67a" transform="rotate(15 40 16)"/><ellipse cx="46" cy="36" rx="13" ry="10" fill="#57ad5a" transform="rotate(-10 46 36)"/>
  <circle cx="14" cy="22" r="3.5" fill="#fff"/><circle cx="37" cy="12" r="3.5" fill="#fff"/><circle cx="42" cy="32" r="3.5" fill="#fff"/>`;

// ---------- 金のたまごをうむ めんどり 170×160(右向き) ----------
A.hen = (o = {}) => {
  const b = '#f6efe0', b2 = '#e6d8bc', s = `
  <rect x="70" y="124" width="9" height="30" fill="#e89a2c"/><rect x="94" y="124" width="9" height="30" fill="#e89a2c"/>
  <path d="M62 156h24M86 156h24" stroke="#e89a2c" stroke-width="8" stroke-linecap="round"/>
  <path d="M36 92Q4 70 10 30Q30 44 44 40Q38 20 52 14Q60 40 70 60Z" fill="${b2}"/>
  <path d="M28 96Q30 136 86 136Q138 136 142 86Q146 52 118 52Q104 84 62 76Q34 72 28 96Z" fill="${b}"/>
  <g class="wg"><path d="M54 86Q84 70 108 92Q92 122 60 110Q48 100 54 86Z" fill="${b2}"/><path d="M66 96q14 8 28 0M70 106q10 6 20 0" stroke="#cdb994" stroke-width="4" fill="none" stroke-linecap="round"/></g>
  <g class="hd"><path d="M104 60Q98 22 126 20Q154 22 150 56Q146 84 124 84Q108 80 104 60Z" fill="${b}"/>
  <path d="M112 24Q110 6 122 12Q126 0 136 10Q148 6 144 26Z" fill="#e2574c"/>
  <path d="M148 46L170 54L148 62Z" fill="#f0a030"/><path d="M140 62Q146 84 136 86Q128 78 134 62Z" fill="#e2574c"/>
  <circle cx="134" cy="42" r="5" fill="#3a2a1e"/><circle cx="122" cy="56" r="6" fill="#f08f7e" opacity=".55"/></g>`;
  return o.flip ? `<g transform="translate(170 0) scale(-1 1)">${s}</g>` : s;
};
// 金のたまご 70×84
A.egg = () => `<path d="M35 4Q64 30 64 54Q64 82 35 82Q6 82 6 54Q6 30 35 4Z" fill="#f3c64f"/><path d="M35 4Q64 30 64 54Q64 82 35 82Q52 70 50 46Q48 24 35 4Z" fill="#d9a521"/><ellipse cx="24" cy="38" rx="7" ry="12" fill="#fff3c0" transform="rotate(18 24 38)"/>`;
// めんどりを抱えたジャック(左腕に抱える)
A.jackHen = (o = {}) => A.jack(Object.assign({ armL: 38, armR: -60, mouth: 'o', holdL: `<g transform="translate(46 132) scale(.52) translate(-85 -100)">${A.hen({ flip: true })}</g>` }, o));

// ---------- 豆の木 ----------
// 幹 w×h(根元が下端)。左右にうねる太いつると、互いちがいの葉、巻きひげ
A.stalk = (w, h, seed = 3) => {
  const cx = w / 2, amp = w * .13, per = 230, x = y => cx + amp * Math.sin((h - y) / per * 6.283), r = rnd(seed);
  let d = '', d2 = '', leaves = '', curl = '';
  for (let y = h; y >= 26; y -= 13) { d += `${y === h ? 'M' : 'L'}${F(x(y))} ${y}`; d2 += `${y === h ? 'M' : 'L'}${F(x(y) - 9)} ${y}`; }
  for (let y = h - 90, i = 0; y > 70; y -= 104, i++) {
    const s = i % 2 ? 1 : -1, bx = x(y), k = .8 + r() * .5, tx = bx + s * 96 * k, ty = y - 34 * k;
    leaves += `<path d="M${F(bx)} ${F(y)}Q${F(bx + s * 40 * k)} ${F(y - 62 * k)} ${F(tx)} ${F(ty)}Q${F(bx + s * 62 * k)} ${F(y + 22 * k)} ${F(bx)} ${F(y)}Z" fill="${i % 3 ? '#57ad5a' : '#6cc26a'}"/><path d="M${F(bx + s * 10)} ${F(y - 6)}Q${F(bx + s * 46 * k)} ${F(y - 22 * k)} ${F(tx - s * 14)} ${F(ty + 4)}" stroke="#3f8a4a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if (i % 3 === 1) curl += `<path d="M${F(bx)} ${F(y - 46)}q${-s * 46} -10 ${-s * 50} -44q${s * 2} -26 ${s * 24} -22q${s * 16} 6 ${s * 8} 22" stroke="#6cc26a" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  }
  const tip = `<path d="M${F(x(26))} 30Q${F(x(26) - 44)} -4 ${F(x(26) - 74)} 22Q${F(x(26) - 36)} 30 ${F(x(26))} 44Z" fill="#8fd67a"/><path d="M${F(x(26))} 30Q${F(x(26) + 40)} -8 ${F(x(26) + 70)} 14Q${F(x(26) + 36)} 30 ${F(x(26))} 44Z" fill="#6cc26a"/>`;
  return curl + leaves + `<path d="${d}" stroke="#3f8a4a" stroke-width="50" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d2}" stroke="#57ad5a" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + tip;
};
// 幹を上下2枚に分ける(高さ 1000 を超える1枚板は、カメラが近いと下のほうが描かれないことがあるため)。
// A.stalkPart(w, h, 上端y, 下端y, seed) は、全体 w×h の幹のうち 上端y〜下端y の部分だけを、w×(下端y−上端y) の箱に描く
let stalkClipN = 0;
const stalkTop = y0 => y0 ? 0 : -80;               // 切り抜く四角の上端(いちばん上の板は、先の葉が箱の上へ出る分を足す)
A.stalkPart = (w, h, y0, y1, seed = 3) => { const id = 'stk' + (stalkClipN++); return `<clipPath id="${id}"><rect class="gr" x="-200" y="${stalkTop(y0)}" width="${w + 400}" height="${y1 - y0 - stalkTop(y0)}"/></clipPath><g clip-path="url(#${id})"><g transform="translate(0 ${-y0})">${A.stalk(w, h, seed)}</g></g>`; };
// 下から伸びる動き: 切り抜く四角を下から g(0〜1)の割合だけ開ける。
// (エンジンの clip は、鉛直軸のまわりに回して浮かせた板では見える範囲がずれるので、絵の中の切り抜きを動かす)
const aStalkGrow = (y0, y1, f) => (tl, el, q) => { const rs = q.gr || (q.gr = document.querySelectorAll(`[id="${qs(el, q, 'clipPath').id}"] .gr`)), top = stalkTop(y0), H = y1 - y0 - top, g = cl(f(tl)), y = (top + (1 - g) * H).toFixed(1), hh = (g * H).toFixed(1); rs.forEach(r => { r.setAttribute('y', y); r.setAttribute('height', hh); }); };
// 上下の板の継ぎ目をかくす節(ふし)と葉 260×70。幹と同じ根元に置き、継ぎ目の高さに浮かせる(幹は継ぎ目で x=112 を通る)
A.stalkKnot = () => `<path d="M112 40Q70 -4 22 14Q60 52 112 50Z" fill="#6cc26a"/><path d="M112 40Q156 -2 204 18Q164 54 112 50Z" fill="#57ad5a"/><ellipse cx="112" cy="40" rx="35" ry="22" fill="#3f8a4a"/><ellipse cx="104" cy="36" rx="14" ry="9" fill="#57ad5a"/>`;
// 芽 80×70
A.sprout = () => `<path d="M40 70V34" stroke="#3f8a4a" stroke-width="10" stroke-linecap="round"/><path d="M40 38Q14 34 8 10Q36 8 40 38Z" fill="#6cc26a"/><path d="M40 38Q66 34 72 10Q44 8 40 38Z" fill="#8fd67a"/>`;
// 切り株 200×110
A.stump = () => `<path d="M30 110L44 40H156L170 110Z" fill="#3f8a4a"/><path d="M30 110Q6 104 2 110ZM170 110Q194 104 198 110Z" fill="#3f8a4a"/><ellipse cx="100" cy="40" rx="58" ry="20" fill="#b9e08a"/><ellipse cx="100" cy="40" rx="36" ry="11" fill="none" stroke="#6cc26a" stroke-width="5"/><path d="M130 30L150 6L156 34Z" fill="#b9e08a"/>`;
// おのの火花 90×90
A.spark = () => A.star(45, 45, 42, '#fff3a0') + A.star(45, 45, 22, '#fff');

// ---------- 大男 320×460(足元 y=460) ----------
// 動かす部分: .aL(軸 78,205)/ .aR(軸 242,205)腕、.lgL(軸 120,330)/ .lgR(軸 200,330)脚、.hd(軸 160,180)頭、
//            .eo ふつうの目 / .ec 閉じた目 / .ew むいた目、.br おこったまゆ、.mo 開いた口 / .mc 閉じた口
// o: armL, armR(度。下ろした状態が0、外へ上げるには armL は正、armR は負)、eyes: 'open' | 'closed' | 'wide'、mouth: 'open' | 'closed'、brow: true
A.giant = (o = {}) => {
  const { armL = 8, armR = -8, eyes = 'open', mouth = 'closed', brow = true } = o;
  const sk = '#eebf96', sk2 = '#dfa77c', tu = '#b0603a', tu2 = '#96502f', tr = '#6b5a4a', hr = '#5a3a22', hr2 = '#47301d';
  const on = v => v ? '' : ' display="none"';
  let s = `<g class="lgL"><rect x="94" y="322" width="54" height="118" rx="22" fill="${tr}"/><ellipse cx="114" cy="446" rx="46" ry="16" fill="#4a3324"/></g>
  <g class="lgR"><rect x="172" y="322" width="54" height="118" rx="22" fill="${tr}"/><ellipse cx="206" cy="446" rx="46" ry="16" fill="#4a3324"/></g>
  <path d="M68 192Q160 158 252 192L266 348Q160 384 54 348Z" fill="${tu}"/><path d="M68 192Q160 158 252 192L254 214Q160 184 66 214Z" fill="${tu2}"/>
  <path d="M132 178L160 236L188 178Z" fill="${sk2}"/>
  <rect x="56" y="300" width="208" height="26" rx="10" fill="#4a3324"/><rect x="140" y="294" width="40" height="38" rx="8" fill="#f3c64f"/><rect x="151" y="305" width="18" height="16" rx="4" fill="#4a3324"/>
  <rect x="84" y="240" width="34" height="30" rx="5" fill="#d9a45a"/><path d="M84 240l34 30M118 240l-34 30" stroke="${tu2}" stroke-width="4"/>
  <g class="aL" transform="rotate(${armL} 78 205)"><rect x="54" y="186" width="48" height="140" rx="24" fill="${tu}"/><rect x="54" y="296" width="48" height="16" fill="${tu2}"/><circle cx="78" cy="334" r="28" fill="${sk}"/></g>
  <g class="aR" transform="rotate(${armR} 242 205)"><rect x="218" y="186" width="48" height="140" rx="24" fill="${tu}"/><rect x="218" y="296" width="48" height="16" fill="${tu2}"/><circle cx="242" cy="334" r="28" fill="${sk}"/></g>
  <g class="hd"><circle cx="78" cy="108" r="20" fill="${sk2}"/><circle cx="242" cy="108" r="20" fill="${sk2}"/>
  <path d="M74 96Q60 14 160 12Q260 14 246 96Q250 60 160 54Q70 60 74 96Z" fill="${hr}"/>
  <circle cx="160" cy="106" r="80" fill="${sk}"/>
  <path d="M80 92Q70 20 160 18Q250 20 240 92Q226 50 196 56Q180 34 160 56Q138 36 122 58Q94 50 80 92Z" fill="${hr}"/>
  <path d="M84 118Q80 208 160 214Q240 208 236 118Q224 150 196 148Q160 132 124 148Q96 150 84 118Z" fill="${hr}"/>
  <path d="M96 150Q110 196 160 200Q130 186 120 160Z" fill="${hr2}"/>
  <g class="eo"${on(eyes === 'open')}><circle cx="128" cy="98" r="15" fill="#fff"/><circle cx="192" cy="98" r="15" fill="#fff"/><circle cx="131" cy="101" r="7" fill="#3a2a1e"/><circle cx="189" cy="101" r="7" fill="#3a2a1e"/></g>
  <g class="ew"${on(eyes === 'wide')}><circle cx="126" cy="94" r="21" fill="#fff"/><circle cx="194" cy="94" r="21" fill="#fff"/><circle cx="126" cy="96" r="6" fill="#3a2a1e"/><circle cx="194" cy="96" r="6" fill="#3a2a1e"/></g>
  <g class="ec"${on(eyes === 'closed')}><path d="M112 100Q128 112 144 100M176 100Q192 112 208 100" stroke="#3a2a1e" stroke-width="6" fill="none" stroke-linecap="round"/></g>
  <g class="br"${on(brow)}><path d="M104 66L148 82M216 66L172 82" stroke="${hr2}" stroke-width="12" stroke-linecap="round"/></g>
  <ellipse cx="160" cy="124" rx="19" ry="16" fill="${sk2}"/><circle cx="110" cy="128" r="12" fill="#f08f7e" opacity=".5"/><circle cx="210" cy="128" r="12" fill="#f08f7e" opacity=".5"/>
  <g class="mc"${on(mouth !== 'open')}><path d="M138 164Q160 174 182 164" stroke="#8a3b2a" stroke-width="7" fill="none" stroke-linecap="round"/></g>
  <g class="mo"${on(mouth === 'open')}><ellipse cx="160" cy="170" rx="30" ry="24" fill="#7a2f22"/><rect x="140" y="148" width="14" height="13" rx="3" fill="#fff"/><rect x="166" y="148" width="14" height="13" rx="3" fill="#fff"/><ellipse cx="160" cy="184" rx="16" ry="8" fill="#e2574c"/></g></g>`;
  return s;
};
// 大男の動き。f(tl) が { aL, aR, lL, lR, hd, eyes, mouth } を返す(書いた項目だけ動かす)
const aGiant = f => (tl, el, q) => {
  const p = f(tl), show = (sel, v) => { const n = qs(el, q, sel); if (n) n.setAttribute('display', v ? 'inline' : 'none'); };
  if (p.aL != null) rot(qs(el, q, '.aL'), p.aL, 78, 205);
  if (p.aR != null) rot(qs(el, q, '.aR'), p.aR, 242, 205);
  if (p.lL != null) rot(qs(el, q, '.lgL'), p.lL, 120, 330);
  if (p.lR != null) rot(qs(el, q, '.lgR'), p.lR, 200, 330);
  if (p.hd != null) rot(qs(el, q, '.hd'), p.hd, 160, 180);
  if (p.eyes) { show('.eo', p.eyes === 'open'); show('.ew', p.eyes === 'wide'); show('.ec', p.eyes === 'closed'); }
  if (p.mouth) { show('.mo', p.mouth === 'open'); show('.mc', p.mouth !== 'open'); }
};
// いねむりの「Z」 70×70
A.zzz = () => `<path d="M12 12H58L12 58H58" stroke="#fff" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12H58L12 58H58" stroke="#7a6cc0" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

// ---------- 家(目録のわらぶきの家に、つぎはぎを足す) ----------
A.poorHouse = (o = {}) => lib('house.thatch', o) + (o.fancy ? '' : `<rect x="92" y="128" width="44" height="34" rx="4" fill="#b08a4a" transform="rotate(-38 114 145)"/><path d="M98 150l30 -22M106 158l28 -22" stroke="#8a6a36" stroke-width="3"/><rect x="286" y="118" width="40" height="30" rx="4" fill="#d9b06a" transform="rotate(40 306 133)"/>`);

// ---------- 地面に描き足す物 ----------
// 雲の上に開いた、豆の木が出てくる穴(ground 用。cx, cy は地面の座標)
A.hole = (cx, cy) => `<ellipse cx="${cx}" cy="${cy}" rx="150" ry="62" fill="#7fb7dc"/><ellipse cx="${cx}" cy="${cy + 8}" rx="118" ry="44" fill="#5d9ac6"/>`;
// 豆の木が倒れたあとの土の跡
A.dirt = (cx, cy, rx = 120, ry = 46) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#c9a877"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * .62}" ry="${ry * .58}" fill="#a98656"/>`;

// ---------- 表紙 738×948(左端 38px は背の帯)。紙の縁取りは付かない ----------
A.cover = () => `
  <defs><linearGradient id="cvg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7a52"/><stop offset="1" stop-color="#174a34"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8e3a0"/><stop offset=".5" stop-color="#e0b23c"/><stop offset="1" stop-color="#b98a22"/></linearGradient>
  <radialGradient id="cvs" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#bfe6f5"/><stop offset="1" stop-color="#7fbfe0"/></radialGradient>
  <clipPath id="cvc"><rect x="96" y="286" width="576" height="590" rx="26"/></clipPath></defs>
  <rect width="738" height="948" rx="14" fill="url(#cvg)"/><rect width="38" height="948" fill="#12392a"/>
  <rect x="64" y="34" width="640" height="880" rx="18" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <rect x="78" y="48" width="612" height="852" rx="12" fill="none" stroke="url(#gold)" stroke-width="2" opacity=".7"/>
  <rect x="96" y="286" width="576" height="590" rx="26" fill="url(#cvs)"/>
  <g clip-path="url(#cvc)">
    <path d="M96 876V770Q240 700 384 760Q540 820 672 740V876Z" fill="#8cc35a"/><path d="M96 876V820Q260 770 420 820Q560 860 672 810V876Z" fill="#a8d672"/>
    <g transform="translate(120 660) scale(.42)">${lib('house.thatch')}</g>
    <g transform="translate(254 300)">${A.stalk(260, 560, 5)}</g>
    <g transform="translate(96 300)">${A.cloudBank(576, 110, 4)}</g>
    <g transform="translate(430 250) scale(.36)">${A.castle()}</g>
    <g transform="translate(380 400)">${A.cloud(250, 90, 2)}</g>
    <g transform="translate(330 560) scale(.9)">${A.jack({ armL: 150, armR: -150, mouth: 'big' })}</g>
    ${A.star(180, 470, 20)}${A.star(600, 560, 16)}${A.star(560, 720, 12)}${A.star(150, 600, 12)}
  </g>
  <rect x="96" y="286" width="576" height="590" rx="26" fill="none" stroke="url(#gold)" stroke-width="5"/>
  <text x="384" y="100" font-family='${FONT}' font-weight="700" font-size="24" letter-spacing="10" text-anchor="middle" fill="#f8e3a0">とびだす えほん</text>
  <text x="384" y="186" font-family='${FONT}' font-weight="900" font-size="76" text-anchor="middle" fill="url(#gold)">ジャックと</text>
  <text x="384" y="256" font-family='${FONT}' font-weight="900" font-size="60" text-anchor="middle" fill="url(#gold)">豆の木</text>`;
