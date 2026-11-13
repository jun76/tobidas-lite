// ジャックと豆の木 — この作品だけの絵。共通パーツ A.* に足す形で定義する。
A.jack = (o = {}) => A.person(Object.assign({
  top: '#4f9d4a', bottom: '#8a6238',
  hair: `<path d="M31 58Q30 28 60 27Q90 28 89 58Q82 42 60 41Q40 42 31 58Z" fill="#c9672a"/><path d="M28 47Q34 14 62 16Q92 18 93 45Q60 33 28 47Z" fill="#3f8a3c"/><path d="M84 26L108 2L99 34Z" fill="#e2574c"/>`,
  extra: `<rect x="32" y="138" width="56" height="9" rx="3" fill="#6b4423"/><rect x="55" y="136" width="11" height="13" rx="2" fill="#f3c64f"/>`
}, o));
A.mother = (o = {}) => A.person(Object.assign({
  top: '#5b7fb8', bottom: '#5b7fb8', long: true,
  hair: `<circle cx="60" cy="22" r="14" fill="#7a4a2a"/><path d="M30 62Q28 27 60 26Q92 27 90 62Q84 42 60 40Q36 42 30 62Z" fill="#7a4a2a"/>`,
  extra: `<path d="M44 112L76 112L84 204Q60 212 36 204Z" fill="#fff6e6"/><rect x="38" y="106" width="44" height="8" rx="3" fill="#fff6e6"/>`
}, o));
A.oldman = (o = {}) => A.person(Object.assign({
  top: '#6d4f8f', bottom: '#6d4f8f', long: true,
  hair: `<path d="M36 66Q60 140 84 66Q60 86 36 66Z" fill="#f4f1ea"/><path d="M22 46L62 -36L98 46Q60 34 22 46Z" fill="#4f3a7a"/><ellipse cx="60" cy="44" rx="46" ry="10" fill="#5d4690"/>${A.star(58, 8, 9)}${A.star(74, 28, 6)}<path d="M42 50Q49 45 55 50M65 50Q71 45 78 50" stroke="#f4f1ea" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  holdL: `<path d="M40 60V236" stroke="#7a5230" stroke-width="7" stroke-linecap="round"/><circle cx="40" cy="56" r="10" fill="#7fd0c0"/>`
}, o));
// 豆の木(幅 w・高さ h、根元が下)
A.stalk = (w, h, top = true) => {
  const cx = w / 2; let p1 = `M${cx} ${h}`, p2 = `M${cx} ${h}`, lv = '';
  for (let y = h; y >= 30; y -= 10) { const k = (h - y) / 92; p1 += `L${F(cx + 30 * Math.sin(k))} ${y}`; p2 += `L${F(cx - 30 * Math.sin(k))} ${y}`; }
  for (let y = h - 70, i = 0; y > 90; y -= 96, i++) {
    const sd = i % 2 ? 1 : -1, x = cx + sd * 26, z = 58 + (i * 37 % 3) * 13, c = ['#5db04b', '#74c259', '#4a9a40'][i % 3];
    lv += `<path d="M${x} ${y}Q${F(x + sd * .45 * z)} ${F(y - .75 * z)} ${F(x + sd * z)} ${F(y - .3 * z)}Q${F(x + sd * 1.2 * z)} ${F(y + .08 * z)} ${F(x + sd * .9 * z)} ${F(y + .36 * z)}Q${F(x + sd * .4 * z)} ${F(y + .5 * z)} ${x} ${y}Z" fill="${c}"/><path d="M${x} ${y}Q${F(x + sd * .5 * z)} ${F(y - .1 * z)} ${F(x + sd * .95 * z)} ${F(y + .05 * z)}" stroke="#2f7a33" stroke-width="3" fill="none"/>`;
    if (i % 2) lv += `<path d="M${cx - sd * 26} ${y + 40}q${-sd * 34} -6 ${-sd * 40} -34q2 -22 ${sd * 20} -18q14 6 ${sd * 6} 18" stroke="#74c259" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  }
  let s = `<path d="${p2}" stroke="#3a8736" stroke-width="30" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + lv + `<path d="${p1}" stroke="#58ab46" stroke-width="34" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${p1}" stroke="#8fd46e" stroke-width="7" fill="none" stroke-linecap="round" transform="translate(-7 0)" opacity=".8"/>`;
  if (top) s += `<path d="M${cx} 40Q${cx - 60} 30 ${cx - 70} -10Q${cx - 20} -14 ${cx} 40ZM${cx} 40Q${cx + 60} 26 ${cx + 66} -16Q${cx + 16} -14 ${cx} 40Z" fill="#8fd46e"/>`;
  return s;
};
A.giantHead = (cx, cy, r, mode) => {
  let s = `<circle cx="${cx}" cy="${cy - r * .2}" r="${r * 1.08}" fill="#8f3520"/>` + [-1, -.5, 0, .5, 1].map(k => `<circle cx="${cx + k * r * .8}" cy="${cy - r * (1.05 - Math.abs(k) * .3)}" r="${r * .32}" fill="#8f3520"/>`).join('');
  s += `<circle cx="${cx - r}" cy="${cy}" r="${r * .22}" fill="#e3a781"/><circle cx="${cx + r}" cy="${cy}" r="${r * .22}" fill="#e3a781"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#ecb990"/>`;
  s += `<path d="M${cx - r * .98} ${cy + r * .08}Q${cx - r * .9} ${cy + r * 1.5} ${cx} ${cy + r * 1.62}Q${cx + r * .9} ${cy + r * 1.5} ${cx + r * .98} ${cy + r * .08}Q${cx + r * .5} ${cy + r * .5} ${cx} ${cy + r * .3}Q${cx - r * .5} ${cy + r * .5} ${cx - r * .98} ${cy + r * .08}Z" fill="#a8412a"/>`;
  if (mode === 'sleep') {
    s += `<path d="M${cx - r * .6} ${cy - r * .12}q${r * .2} ${r * .16} ${r * .4} 0M${cx + r * .2} ${cy - r * .12}q${r * .2} ${r * .16} ${r * .4} 0" stroke="#4a2a1a" stroke-width="${r * .07}" fill="none" stroke-linecap="round"/><ellipse class="gm" cx="${cx}" cy="${cy + r * .78}" rx="${r * .2}" ry="${r * .22}" fill="#5a1f1a"/>`;
    s += `<path d="M${cx - r * .7} ${cy - r * .42}l${r * .5} ${r * .04}M${cx + r * .7} ${cy - r * .42}l${-r * .5} ${r * .04}" stroke="#7a2a16" stroke-width="${r * .13}" stroke-linecap="round"/>`;
  } else {
    s += `<circle cx="${cx - r * .4}" cy="${cy - r * .12}" r="${r * .2}" fill="#fff"/><circle cx="${cx + r * .4}" cy="${cy - r * .12}" r="${r * .2}" fill="#fff"/><circle cx="${cx - r * .36}" cy="${cy - r * .06}" r="${r * .09}" fill="#2a1a12"/><circle cx="${cx + r * .36}" cy="${cy - r * .06}" r="${r * .09}" fill="#2a1a12"/>`;
    s += `<path d="M${cx - r * .75} ${cy - r * .55}l${r * .55} ${r * .22}M${cx + r * .75} ${cy - r * .55}l${-r * .55} ${r * .22}" stroke="#7a2a16" stroke-width="${r * .15}" stroke-linecap="round"/>`;
    s += `<path d="M${cx - r * .42} ${cy + r * .62}Q${cx} ${cy + r * .5} ${cx + r * .42} ${cy + r * .62}Q${cx + r * .36} ${cy + r * 1.12} ${cx} ${cy + r * 1.14}Q${cx - r * .36} ${cy + r * 1.12} ${cx - r * .42} ${cy + r * .62}Z" fill="#5a1f1a"/><path d="M${cx - r * .3} ${cy + r * .62}h${r * .6}v${r * .14}h${-r * .6}Z" fill="#fff"/>`;
  }
  s += `<ellipse cx="${cx}" cy="${cy + r * .16}" rx="${r * .26}" ry="${r * .21}" fill="#d98f72"/>`;
  return s;
};
// ねむる大男 560x560
A.giantSleep = () => `<path d="M90 560Q70 330 190 300L370 300Q490 330 470 560Z" fill="#6f7f4a"/><path d="M190 300Q280 360 370 300L350 420Q280 450 210 420Z" fill="#59683a"/><g class="ghead" transform="rotate(8 280 330)">${A.giantHead(280, 205, 112, 'sleep')}</g><rect x="60" y="452" width="220" height="74" rx="37" fill="#6f7f4a"/><rect x="280" y="452" width="220" height="74" rx="37" fill="#59683a"/><circle cx="278" cy="489" r="40" fill="#ecb990"/><circle cx="330" cy="489" r="38" fill="#e3a781"/>`;
// 追いかける大男 460x560
A.giantClimb = () => `<path d="M190 400L150 540M270 400L310 540" stroke="#6b4a2c" stroke-width="56" stroke-linecap="round"/><ellipse cx="146" cy="544" rx="44" ry="20" fill="#3d2a1a"/><ellipse cx="314" cy="544" rx="44" ry="20" fill="#3d2a1a"/><path d="M152 262L84 96M308 262L376 96" stroke="#6f7f4a" stroke-width="54" stroke-linecap="round"/><circle cx="80" cy="84" r="36" fill="#ecb990"/><circle cx="380" cy="84" r="36" fill="#ecb990"/><rect x="118" y="226" width="224" height="214" rx="60" fill="#6f7f4a"/><rect x="118" y="372" width="224" height="26" fill="#6b4423"/><rect x="212" y="366" width="36" height="38" rx="6" fill="#e0b23c"/>${A.giantHead(230, 168, 88, 'angry')}`;
A.hen = (gold) => { const b = gold ? '#fff' : '#fff', w2 = '#f1e3c8'; return `<path d="M30 110v18M50 112v16" stroke="#f08c2a" stroke-width="5" stroke-linecap="round"/><path d="M18 66Q-6 40 10 28Q14 50 30 56Z" fill="${w2}"/><ellipse cx="46" cy="78" rx="38" ry="32" fill="${b}"/><path d="M26 76Q44 60 62 80Q46 100 26 76Z" fill="${w2}"/><circle cx="78" cy="46" r="18" fill="${b}"/><path d="M68 30q4 -16 12 -6q8 -12 12 4q8 -4 4 10Z" fill="#e2463c"/><path d="M94 46l18 6l-18 7Z" fill="#f3a22a"/><circle cx="82" cy="44" r="3" fill="#2a1a12"/><path d="M88 58q4 12 -4 14q-4 -8 4 -14Z" fill="#e2463c"/>`; };
A.egg = () => `<ellipse cx="22" cy="28" rx="18" ry="24" fill="#f6c843"/><ellipse cx="15" cy="20" rx="6" ry="10" fill="#fff0a8" opacity=".8"/>`;
A.harp = () => { let st = ''; for (let i = 0; i < 8; i++) st += `<path d="M${52 + i * 11} ${22 + i * 6 - (i - 3) * (i - 3) * .6}L${46 + i * 11} ${214 - i * 20}" stroke="#fff6d0" stroke-width="2.4"/>`; return `<rect x="16" y="222" width="130" height="16" rx="6" fill="#b88a22"/>` + st + `<path d="M40 18V226" stroke="#e0b23c" stroke-width="16" stroke-linecap="round"/><path d="M40 20Q104 -18 142 66" stroke="#e0b23c" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M142 66Q120 150 40 226" stroke="#c9981f" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="40" cy="18" r="13" fill="#f6d466"/><circle cx="142" cy="66" r="10" fill="#f6d466"/>`; };
A.sign = () => `<rect x="62" y="40" width="14" height="216" rx="4" fill="#8a5a33"/><path d="M10 50H112L138 78L112 106H10Z" fill="#e4bd85"/><text x="62" y="92" font-family='${FONT}' font-weight="900" font-size="34" text-anchor="middle" fill="#5a3a22">いちば</text><path d="M128 138H30L8 160L30 182H128Z" fill="#d9ad72"/><text x="76" y="172" font-family='${FONT}' font-weight="900" font-size="30" text-anchor="middle" fill="#5a3a22">おうち</text>`;
A.bean = (c = '#b8f27a') => `<path d="M6 16Q4 2 18 3Q34 4 36 16Q34 26 26 22Q20 18 14 24Q7 26 6 16Z" fill="${c}"/><circle cx="14" cy="11" r="3" fill="#fff" opacity=".8"/>`;
A.glow = s => `<g class="rays">${Array.from({ length: 8 }, (_, i) => `<path d="M${s / 2} ${s * .04}L${s * .54} ${s * .34}L${s * .46} ${s * .34}Z" fill="#fff3a0" transform="rotate(${i * 45} ${s / 2} ${s / 2})"/>`).join('')}</g><circle cx="${s / 2}" cy="${s / 2}" r="${s * .24}" fill="#fff8c8"/>${[[.42, .44], [.56, .42], [.5, .55], [.4, .56], [.6, .56]].map(([x, y], i) => `<g transform="translate(${s * x - 14} ${s * y - 9}) scale(.75) rotate(${i * 40} 20 14)">${A.bean('#7fd65a')}</g>`).join('')}`;
A.stump = () => `<path d="M34 110Q52 70 50 34L110 34Q108 70 126 110Z" fill="#4f9a40"/><path d="M62 110Q70 70 66 40" stroke="#3a8736" stroke-width="6" fill="none"/><ellipse cx="80" cy="34" rx="31" ry="12" fill="#cfe8a0"/><ellipse cx="80" cy="34" rx="17" ry="6" fill="none" stroke="#8fc060" stroke-width="3"/><path d="M104 60Q130 50 134 28" stroke="#58ab46" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M134 28Q156 14 158 38Q144 46 134 28ZM128 40Q108 22 102 42Q114 50 128 40Z" fill="#8fd46e"/>`;
// ---- 表紙 738x948 ----
A.cover = () => {
  let s = `<defs><linearGradient id="cvg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c7a5e"/><stop offset="1" stop-color="#174536"/></linearGradient><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8e3a0"/><stop offset=".5" stop-color="#e0b23c"/><stop offset="1" stop-color="#b98a22"/></linearGradient></defs>`;
  s += `<rect width="738" height="948" rx="14" fill="url(#cvg)"/><rect x="0" y="0" width="38" height="948" fill="#123a2d"/>`;
  s += `<rect x="64" y="34" width="640" height="880" rx="18" fill="none" stroke="url(#gold)" stroke-width="6"/><rect x="78" y="48" width="612" height="852" rx="12" fill="none" stroke="url(#gold)" stroke-width="2"/>`;
  [[64, 34], [704, 34], [64, 914], [704, 914]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="15" fill="url(#gold)"/>`);
  s += `<circle cx="384" cy="590" r="250" fill="#3a9272" opacity=".5"/><circle cx="384" cy="590" r="200" fill="#4aa888" opacity=".35"/>`;
  const r = rnd(3); for (let i = 0; i < 26; i++) s += A.star(100 + r() * 570, 70 + r() * 320, 4 + r() * 9, '#f8e3a0');
  s += `<g transform="translate(384 366) scale(.5) translate(-260 -560)">${A.castle()}</g><g transform="translate(214 330)">${A.cloud(340, 120, 3, '#fff', '#cfe6dc')}</g>`;
  s += `<g transform="translate(254 330)">${A.stalk(260, 560, false)}</g>`;
  s += `<path d="M110 890Q384 820 660 890L660 898L110 898Z" fill="#6fb65c"/><g transform="translate(450 800) scale(.55)">${A.jack({ armR: -150, look: 'up' })}</g>`;
  s += `<g font-family='${FONT}' font-weight="900" text-anchor="middle"><text x="384" y="160" font-size="84" fill="#123a2d" transform="translate(4 5)">ジャックと</text><text x="384" y="160" font-size="84" fill="url(#gold)">ジャックと</text><text x="384" y="268" font-size="104" fill="#123a2d" transform="translate(4 5)">豆の木</text><text x="384" y="268" font-size="104" fill="url(#gold)">豆の木</text></g>`;
  s += `<rect x="254" y="842" width="260" height="46" rx="23" fill="#123a2d" opacity=".0"/><text x="384" y="76" font-family='${FONT}' font-weight="700" font-size="24" letter-spacing="10" text-anchor="middle" fill="#f8e3a0">とびだす えほん</text>`;
  return s;
};
