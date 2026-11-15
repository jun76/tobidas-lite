// 目録の部品: 自然(木・茂み・草・花・岩・山・丘・雲・水辺・空のもの)。作品ごとに編集しない。
(function () {
  const { n, r, c, e, p, l, g, at, poly } = DRAW, D = defPart;
  const trunk = (w, h, f = '#8a5a33') => p(`M${w * .4} ${h}Q${w * .47} ${h * .8} ${w * .45} ${h * .5}L${w * .55} ${h * .5}Q${w * .53} ${h * .8} ${w * .62} ${h}Z`, f);

  // ---------- 広葉樹 ----------
  defPart.group = '広葉樹';
  D('tree.round', '丸いこずえの木', 300, 430, (o, w, h) => A.tree(w, h, o), { sway: 1.4 }, 'c c2 c3 葉の3色');
  D('tree.fruit', '実のなる木', 300, 430, (o, w, h) => A.tree(w, h, Object.assign({ fruit: '#e2574c' }, o)), { sway: 1.4 }, 'fruit 実の色 / c c2 c3');
  D('tree.autumn', '紅葉の木', 300, 430, (o, w, h) => A.tree(w, h, Object.assign({ c: '#d9713a', c2: '#e89a3c', c3: '#f3c64f' }, o)), { sway: 1.4 }, 'c c2 c3');
  D('tree.bare', '枯れ木', 300, 430, o => {
    const f = o.c || '#7a5a48';
    return trunk(300, 430, f) + l('M150 250Q150 190 120 130M150 230Q176 180 214 150M138 190Q100 180 70 140M150 260Q120 240 84 236M160 240Q200 236 236 210', f, 16)
      + l('M120 130Q112 90 126 56M120 130Q94 110 78 80M214 150Q232 120 226 84M214 150Q250 140 266 112M70 140Q50 126 40 96M84 236Q60 232 44 214M236 210Q258 204 270 184M126 56Q120 40 130 24M226 84Q236 66 230 46', f, 9);
  }, { sway: 1 }, 'c 幹');

  // ---------- 針葉樹 ----------
  defPart.group = '針葉樹';
  const fir = (o, snow) => {
    const a = o.c || (snow ? '#3f7a66' : '#3f8a5a'), b = snow ? '#33665a' : '#33734a'; let s = r(108, 356, 24, 74, '#7a4f2e');
    for (let j = 0; j < 4; j++) { const y = 384 - j * 84, hw = 112 - j * 22, top = y - 150 + j * 6;
      s += poly([[120 - hw, y], [120, top], [120 + hw, y]], a) + poly([[120, top], [120 + hw, y], [128, y]], b);
      if (snow) s += p(`M${120 - hw * .5} ${n(y - 75 + j * 3)}L120 ${top}L${120 + hw * .5} ${n(y - 75 + j * 3)}q${-hw * .2} 18 ${-hw * .34} 0q${-hw * .16} 20 ${-hw * .34} 2q${-hw * .14} 16 ${-hw * .32} -2Z`, '#fbfdff'); }
    return s;
  };
  D('conifer.fir', 'もみの木', 240, 430, o => fir(o, 0), { sway: 1 }, 'c 葉');
  D('conifer.cedar', '杉', 200, 480, o => {
    const a = o.c || '#3f7f5a', b = '#336a4a';
    return r(90, 400, 20, 80, '#7a4f2e') + p('M100 6Q176 210 164 404Q100 436 36 404Q24 210 100 6Z', a) + p('M100 6Q176 210 164 404Q134 424 108 426Q140 220 100 6Z', b)
      + l('M70 150q16 14 34 6M60 240q20 16 44 8M54 330q24 16 50 8', '#4f9a6c', 8);
  }, { sway: 1 }, 'c 葉');
  D('conifer.pine', '松', 360, 380, o => {
    const a = o.c || '#3f7a55', b = '#5a9a66', tk = '#7a5236';
    const clump = (x, y, k) => e(x, y, 74 * k, 26 * k, a) + e(x - 8 * k, y - 10 * k, 54 * k, 15 * k, b);
    return l('M160 376Q210 300 168 230Q130 170 196 100', tk, 32) + l('M170 240Q110 220 76 196M176 170Q240 160 280 130M190 110Q170 80 130 70', tk, 14)
      + clump(72, 190, .9) + clump(284, 124, 1) + clump(126, 62, .9) + clump(210, 74, 1.1) + clump(250, 200, .7) + e(160, 374, 70, 10, '#6a9a58');
  }, { sway: .8 }, 'c 葉');
  D('conifer.snow', '雪をかぶった木', 240, 430, o => fir(o, 1), { sway: 1 }, 'c 葉');

  // ---------- 特徴のある木 ----------
  defPart.group = '特徴のある木';
  D('tree.sakura', '桜', 340, 420, o => {
    const a = o.c || '#f6b8cc', b = '#fbd3df', d = '#ee9db8', tk = '#6b4a3a', q = rnd(5);
    let s = p('M150 420Q166 340 158 270L186 270Q184 340 204 420Z', tk) + l('M170 290Q130 240 96 220M172 280Q220 230 252 214M170 270Q168 220 176 180', tk, 16);
    [[170, 130, 86], [84, 190, 64], [258, 186, 66], [116, 100, 58], [232, 96, 60], [170, 210, 56]].forEach(([x, y, q2], i) => s += c(x, y, q2, i % 2 ? d : a));
    [[150, 100, 40], [70, 172, 30], [250, 160, 32], [220, 80, 28], [120, 190, 24]].forEach(([x, y, q2]) => s += c(x, y, q2, b));
    for (let i = 0; i < 14; i++) s += c(90 + q() * 160, 80 + q() * 130, 5, '#fff');
    return s;
  }, { sway: 1.4 }, 'c 花');
  D('tree.willow', '柳', 320, 440, o => {
    const a = o.c || '#7fb85a', b = '#9fd06c', tk = '#7a5a40', q = rnd(8);
    let s = p('M140 440Q160 330 150 210L180 210Q178 330 196 440Z', tk) + e(164, 130, 120, 76, a);
    for (let i = 0; i < 17; i++) { const x = 44 + i * 15, dx = (x - 164) * .22, len = 190 + q() * 110; s += l(`M${x} ${n(130 + Math.abs(x - 164) * .2)}Q${n(x + dx)} ${n(190 + len * .4)} ${n(x + dx * .7)} ${n(150 + len)}`, i % 2 ? b : a, 11); }
    return s + e(150, 106, 70, 40, b);
  }, { sway: 1.6 }, 'c 葉');
  D('tree.palm', 'やしの木', 320, 460, o => {
    const a = o.c || '#4f9a50', b = '#6fb65c', tk = '#c9a36a';
    let s = l('M150 456Q190 320 160 110', tk, 30); for (let i = 0; i < 8; i++) { const u = i / 8, x = 150 + 2 * 40 * u * (1 - u) + 10 * u, y = 446 - 330 * u; s += l(`M${n(x - 14)} ${n(y)}h28`, '#a98450', 5); }
    const frond = (ang, k, f) => p('M0 0Q70 -70 150 -10Q124 -18 116 0Q100 -20 84 -4Q70 -24 52 -6Q36 -22 0 0Z', f, ` transform="translate(160 108) rotate(${ang}) scale(${k})"`);
    s += frond(-160, 1, a) + frond(-20, 1, a) + frond(-128, .9, b) + frond(-52, .9, b) + frond(-96, .8, a) + frond(176, .8, b) + frond(8, .8, b);
    return s + c(150, 118, 13, '#8a5a33') + c(174, 122, 13, '#7a4f2e') + c(162, 104, 12, '#9a6a3a');
  }, { sway: 1.6 }, 'c 葉');
  D('tree.bamboo', '竹', 280, 480, o => {
    const a = o.c || '#7fb85a', b = '#63a04a', lf = '#4f9a50'; let s = '';
    [[60, 40, 18], [120, 0, 22], [176, 60, 18], [226, 110, 16]].forEach(([x, top, w], i) => { s += r(x, top, w, 480 - top, i % 2 ? b : a, 6); for (let y = top + 50; y < 470; y += 62) s += r(x - 2, y, w + 4, 6, '#4f8a3a', 3); });
    const leaf = (x, y, ang) => e(0, 0, 34, 9, lf, ` transform="translate(${x} ${y}) rotate(${ang}) translate(30 0)"`);
    return s + leaf(70, 70, -160) + leaf(70, 70, -30) + leaf(70, 150, 200) + leaf(132, 40, -20) + leaf(132, 40, -150) + leaf(132, 130, 20) + leaf(186, 110, -30) + leaf(186, 110, 190) + leaf(234, 150, -20) + leaf(234, 200, 200) + leaf(132, 200, 170) + leaf(186, 220, 10);
  }, { sway: 1.6 }, 'c 竹');

  // ---------- 茂み ----------
  defPart.group = '茂み';
  const mound = (w, h, a, b) => { let s = r(w * .04, h * .56, w * .92, h * .44, a, h * .2); for (let i = 0; i < 5; i++) s += c(w * (.16 + .17 * i), Math.min(h * .6, h * (.52 - .16 * Math.sin(i * 1.3 + 1))), h * .4, i % 2 ? b : a); return s; };
  D('bush.round', '丸い茂み', 260, 130, (o, w, h) => mound(w, h, o.c || '#5aa64e', o.c2 || '#7cc463'), {}, 'w h で伸び縮み / c c2');
  D('bush.flower', '花つきの茂み', 280, 120, (o, w, h) => A.bush(w, h, o.c, o.c2, o.c3), {}, 'w h で伸び縮み / c c2 葉 / c3 花');
  D('bush.berry', '実つきの茂み', 260, 130, (o, w, h) => { const q = rnd(w + 3); let s = mound(w, h, o.c || '#4f9a50', o.c2 || '#6fb65c'); for (let i = 0; i < 12; i++) s += c(w * (.1 + q() * .8), h * (.3 + q() * .55), 7, o.c3 || '#d9413a'); return s; }, {}, 'w h で伸び縮み / c c2 葉 / c3 実');
  D('bush.thorn', 'いばら', 280, 160, (o, w, h) => {
    const a = o.c || '#3f6a52', b = '#55806a', q = rnd(6); let d = `M0 ${h}`; const k = 14;
    for (let i = 0; i <= k; i++) d += `L${n(w * i / k)} ${n(h * (.5 - .3 * Math.sin(i / k * PI) + (i % 2 ? .18 : -.12)))}`;
    let s = p(d + `L${w} ${h}Z`, a); for (let i = 0; i < 7; i++) s += l(`M${n(w * (.08 + i * .13))} ${h}Q${n(w * (.16 + i * .13))} ${n(h * (.3 + q() * .3))} ${n(w * (.02 + i * .14))} ${n(h * (.25 + q() * .2))}`, b, 9);
    for (let i = 0; i < 12; i++) { const x = w * (.08 + q() * .84), y = h * (.4 + q() * .5); s += poly([[x - 7, y + 5], [x, y - 12], [x + 7, y + 5]], '#2f5040'); }
    return s;
  }, {}, 'w h で伸び縮み / c');

  // ---------- 草むら ----------
  defPart.group = '草むら';
  D('grass.short', '短い草', 240, 90, (o, w, h) => A.grass(w, h, o.c, o.c2), {}, 'w h で伸び縮み / c c2');
  D('grass.flowers', '花畑', 300, 100, (o, w, h) => A.grass(w, h, o.c, o.c2, o.fl || GR), {}, 'w h で伸び縮み / fl 花の色の配列');
  D('grass.susuki', 'すすき', 260, 230, (o, w, h) => {
    const a = o.c || '#b9a35a', pl = o.c2 || '#f3e6c0', q = rnd(4); let s = e(w / 2, h - 8, w * .46, 12, '#8fae5a');
    for (let i = 0; i < 9; i++) { const x = w * (.14 + i * .09), tx = x + (q() - .3) * 70, ty = h * (.1 + q() * .25); s += l(`M${n(x)} ${h}Q${n(x)} ${n(h * .5)} ${n(tx)} ${n(ty + 30)}`, a, 6) + e(0, 0, 13, 44, pl, ` transform="translate(${n(tx + 6)} ${n(ty + 10)}) rotate(${n((tx - x) * .5 + 14)})"`); }
    return s;
  }, { sway: 1.6 }, 'w h で伸び縮み / c くき / c2 穂');
  D('grass.reed', 'あし', 240, 250, (o, w, h) => {
    const a = o.c || '#5f9a4e', b = '#7fb862', q = rnd(9); let s = '';
    for (let i = 0; i < 11; i++) { const x = w * (.08 + i * .084), hh = h * (.5 + q() * .4), ln = (q() - .5) * 40; s += p(`M${n(x - 9)} ${h}Q${n(x)} ${n(h - hh * .6)} ${n(x + ln)} ${n(h - hh)}Q${n(x + 6)} ${n(h - hh * .5)} ${n(x + 9)} ${h}Z`, i % 2 ? a : b); }
    [[.3, .1], [.52, .02], [.72, .14]].forEach(([u, v]) => s += r(w * u - 3, h * v + 30, 6, h * (1 - v) - 30, '#7a8a4a') + r(w * u - 10, h * v, 20, 62, '#7a4f2e', 10));
    return s;
  }, { sway: 1.4 }, 'w h で伸び縮み / c');

  // ---------- 花 ----------
  defPart.group = '花';
  const leafPair = (x, y, f, k = 1) => p(`M${x} ${y}q${-34 * k} ${-10 * k} ${-40 * k} ${-52 * k}q${34 * k} ${8 * k} ${40 * k} ${52 * k}ZM${x} ${y}q${34 * k} ${-10 * k} ${40 * k} ${-52 * k}q${-34 * k} ${8 * k} ${-40 * k} ${52 * k}Z`, f);
  D('flower.tulip', 'チューリップ', 180, 200, o => {
    const cs = o.fl || ['#e2574c', '#f6d24a', '#ff9ecb'], g1 = '#5fae4a'; let s = '';
    [[40, 70], [90, 40], [140, 76]].forEach(([x, y], i) => s += r(x - 4, y + 30, 8, 200 - y - 30, g1) + leafPair(x, 198, i % 2 ? '#86c95f' : g1, .9) + p(`M${x - 24} ${y + 40}Q${x - 30} ${y} ${x - 14} ${y - 8}L${x} ${y + 8}L${x + 14} ${y - 8}Q${x + 30} ${y} ${x + 24} ${y + 40}Q${x} ${y + 58} ${x - 24} ${y + 40}Z`, cs[i % cs.length]));
    return s;
  }, { sway: 1.4 }, 'fl 花の色の配列');
  D('flower.sunflower', 'ひまわり', 180, 310, o => {
    const pt = o.c || '#f6c843', g1 = '#5fae4a';
    let s = r(84, 110, 12, 200, g1, 5) + p('M90 230q-60 -10 -70 -60q54 0 70 60ZM90 190q60 -10 70 -56q-54 0 -70 56Z', '#77c064');
    for (let i = 0; i < 16; i++) s += e(90, 22, 12, 28, i % 2 ? pt : '#ffdf6b', ` transform="rotate(${i * 22.5} 90 86)"`);
    return s + c(90, 86, 40, '#8a5a33') + c(90, 86, 28, '#6b4423') + [0, 1, 2, 3, 4, 5].map(i => c(90 + 16 * Math.cos(i), 86 + 16 * Math.sin(i), 4, '#8a5a33')).join('');
  }, { sway: 1.4 }, 'c 花びら');
  D('flower.rose', 'ばら', 200, 230, o => {
    const a = o.c || '#d9413a', b = '#f08f7e', g1 = '#3f7f4a', g2 = '#5a9a5a';
    let s = c(100, 150, 76, g1) + c(50, 180, 50, g2) + c(150, 180, 50, g2) + r(20, 180, 160, 50, g1, 20);
    [[100, 80, 34], [48, 136, 28], [152, 132, 28], [100, 168, 24]].forEach(([x, y, q]) => s += c(x, y, q, a) + l(`M${x - q * .5} ${y}a${n(q * .5)} ${n(q * .5)} 0 1 1 ${n(q * .6)} ${n(q * .4)}M${n(x - q * .1)} ${n(y + q * .1)}a${n(q * .2)} ${n(q * .2)} 0 1 1 ${n(q * .2)} ${n(-q * .25)}`, b, 5));
    return s + [[26, 110], [176, 104], [70, 210], [140, 214]].map(([x, y]) => e(x, y, 14, 8, '#77b862')).join('');
  }, {}, 'c 花');
  D('flower.wild', '野の花', 240, 130, (o, w, h) => {
    const q = rnd(12), cs = o.fl || ['#fff', '#ffd24d', '#c9a6f0', '#ff9ecb', '#8fc6f0']; let s = A.grass(w, h * .6, '#5fae4a', '#86c95f').replace(/^/, `<g transform="translate(0 ${n(h * .4)})">`) + '</g>';
    for (let i = 0; i < 9; i++) { const x = w * (.08 + i * .105), y = h * (.12 + q() * .4), f = cs[i % cs.length]; s += r(x - 3, y, 6, h - y - 8, '#5fae4a'); for (let k = 0; k < 5; k++) s += c(x + 10 * Math.cos(k * 1.257), y + 10 * Math.sin(k * 1.257), 8, f); s += c(x, y, 6, '#f7a733'); }
    return s;
  }, { sway: 1.4 }, 'w h で伸び縮み / fl 花の色の配列');

  // ---------- 岩 ----------
  defPart.group = '岩';
  D('rock.round', '丸い岩', 240, 160, o => { const a = o.c || '#a7ada6', b = '#8f9690', hi = '#c3c9c2'; return p('M10 160Q0 90 50 50Q110 0 180 40Q240 80 230 160Z', a) + p('M130 160Q170 110 180 40Q240 80 230 160Z', b) + p('M56 70Q96 34 140 44Q100 54 76 90Z', hi); }, {}, 'c 岩');
  D('rock.sharp', 'とがった岩', 240, 280, o => { const a = o.c || '#9aa0a8', b = '#7f858f', hi = '#b9bfc6'; return poly([[6, 280], [40, 150], [84, 30], [120, 110], [160, 60], [206, 170], [234, 280]], a) + poly([[84, 30], [120, 110], [104, 280], [60, 280]], hi) + poly([[160, 60], [206, 170], [234, 280], [150, 280]], b) + l('M96 150l-10 60M178 150l8 50', b, 5); }, {}, 'c 岩');
  D('rock.moss', 'こけむした岩', 280, 180, o => { const a = '#9c9f96', b = '#84877f', m = o.c || '#6a9a50', m2 = '#86b862'; return p('M10 180Q-4 100 60 60Q140 10 220 50Q290 100 270 180Z', a) + p('M160 180Q200 120 220 50Q290 100 270 180Z', b) + p('M34 92Q80 34 150 30Q206 30 240 70Q190 60 160 84Q120 70 90 100Q60 90 34 92Z', m) + e(110, 56, 34, 12, m2) + e(196, 58, 20, 8, m2) + c(60, 150, 12, m) + c(210, 140, 14, m); }, {}, 'c こけ');
  D('rock.pile', '石積み', 240, 220, o => { const a = o.c || '#b5ae9f', b = '#9c9586', d = '#c9c2b4'; return e(120, 186, 112, 34, b) + e(120, 180, 106, 30, a) + e(126, 132, 84, 26, b) + e(126, 127, 80, 23, d) + e(116, 88, 60, 21, b) + e(116, 84, 56, 18, a) + e(122, 50, 38, 16, b) + e(122, 47, 35, 14, d) + e(118, 22, 20, 11, a); }, {}, 'c 石');

  // ---------- 山 ----------
  defPart.group = '山';
  D('mountain.gentle', 'なだらかな山', 900, 320, (o, w, h) => { const a = o.c || '#8fbf9a', b = o.c2 || '#a9d0b0'; return p(`M0 ${h}Q${w * .12} ${h * .5} ${w * .3} ${h * .22}Q${w * .42} ${h * .04} ${w * .54} ${h * .3}Q${w * .62} ${h * .46} ${w * .72} ${h * .36}Q${w * .88} ${h * .5} ${w} ${h}Z`, a) + p(`M${w * .3} ${h * .22}Q${w * .42} ${h * .04} ${w * .54} ${h * .3}Q${w * .44} ${h * .34} ${w * .4} ${h * .6}Q${w * .36} ${h * .36} ${w * .3} ${h * .22}Z`, b); }, { sh: false, sway: 0 }, 'w h で伸び縮み / c c2');
  D('mountain.snow', '雪の峰', 900, 440, (o, w, h) => {
    const a = o.c || '#8a9ac4', b = '#7284b0', sn = '#fbfdff', P = (x, y) => [w * x, h * y];
    return poly([P(0, 1), P(.16, .52), P(.24, .62), P(.4, .06), P(.52, .44), P(.62, .3), P(.8, .66), P(.88, .58), P(1, 1)], a) + poly([P(.4, .06), P(.52, .44), P(.56, 1), P(.44, 1)], b) + poly([P(.62, .3), P(.8, .66), P(.86, 1), P(.7, 1)], b)
      + poly([P(.4, .06), P(.47, .28), P(.43, .24), P(.4, .32), P(.36, .24), P(.33, .3)], sn) + poly([P(.62, .3), P(.68, .42), P(.64, .4), P(.61, .46), P(.57, .37)], sn);
  }, { sh: false, sway: 0 }, 'w h で伸び縮み / c');
  D('mountain.volcano', '火山', 820, 420, (o, w, h) => {
    const a = o.c || '#7a6a66', b = '#655652', lv = '#f0703c';
    return g('vs', c(w * .5, h * .26, 30, '#b9b2ae') + c(w * .54, h * .15, 40, '#cfc8c4') + c(w * .46, h * .07, 26, '#b9b2ae')) + `<g transform="translate(0 ${n(h * .12)}) scale(1 .88)">` + p(`M0 ${h}Q${w * .26} ${h * .7} ${w * .4} ${h * .22}H${w * .6}Q${w * .74} ${h * .7} ${w} ${h}Z`, a) + p(`M${w * .52} ${h * .22}H${w * .6}Q${w * .74} ${h * .7} ${w} ${h}H${w * .6}Q${w * .6} ${h * .6} ${w * .52} ${h * .22}Z`, b)
      + p(`M${w * .4} ${h * .22}H${w * .6}L${w * .57} ${h * .3}Q${w * .55} ${h * .5} ${w * .52} ${h * .34}Q${w * .5} ${h * .6} ${w * .47} ${h * .36}Q${w * .45} ${h * .44} ${w * .43} ${h * .3}Z`, lv) + '</g>';
  }, { sh: false, sway: 0, anim: (tl, el, q) => { const v = qs(el, q, '.vs'); v.setAttribute('transform', `translate(${(8 * sin(tl * .7)).toFixed(1)} ${(-10 - 10 * sin(tl * .5)).toFixed(1)})`); } }, 'w h で伸び縮み / c。煙がゆれる');
  D('mountain.fuji', '富士山の形の山', 900, 400, (o, w, h) => {
    const a = o.c || '#6f8fc0', sn = '#fbfdff';
    return p(`M0 ${h}Q${w * .28} ${h * .7} ${w * .42} ${h * .08}H${w * .58}Q${w * .72} ${h * .7} ${w} ${h}Z`, a) + p(`M${w * .42} ${h * .08}H${w * .58}Q${w * .62} ${h * .26} ${w * .66} ${h * .4}L${w * .61} ${h * .32}L${w * .57} ${h * .44}L${w * .53} ${h * .32}L${w * .49} ${h * .46}L${w * .45} ${h * .33}L${w * .4} ${h * .43}L${w * .37} ${h * .36}L${w * .34} ${h * .4}Q${w * .38} ${h * .26} ${w * .42} ${h * .08}Z`, sn);
  }, { sh: false, sway: 0 }, 'w h で伸び縮み / c');

  // ---------- 丘 ----------
  defPart.group = '丘';
  D('hill.grass', '草の丘', 1400, 230, (o, w, h) => A.hills(w, h, o.c || '#8fcf7c', o.c2 || '#77c064', o.seed || 1, o.f || 1.5), { sh: false, sway: 0 }, 'w h で伸び縮み / c 奥 / c2 手前 / seed 形 / f うねり');
  D('hill.sand', '砂丘', 1400, 230, (o, w, h) => A.hills(w, h, o.c || '#f0dcaa', o.c2 || '#e3c98a', o.seed || 3, o.f || 1.2), { sh: false, sway: 0 }, 'w h で伸び縮み / c c2 / seed / f');
  D('hill.snow', '雪の丘', 1400, 230, (o, w, h) => A.hills(w, h, o.c || '#f6fafd', o.c2 || '#e0eaf3', o.seed || 5, o.f || 1.3), { sh: false, sway: 0 }, 'w h で伸び縮み / c c2 / seed / f');
  D('hill.field', '畑の丘', 1400, 230, (o, w, h) => A.hills(w, h, o.c || '#c9d98a', o.c2 || '#a9c46a', o.seed || 2, o.f || 1, yf => { let s = ''; for (let j = 0; j < 4; j++) { let d = ''; for (let x = 0; x <= w; x += 40) d += (x ? 'L' : 'M') + x + ' ' + n(yf(x) + 18 + j * 22); s += `<path d="${d}" stroke="${j % 2 ? '#8fae5a' : '#b0c46e'}" stroke-width="9" fill="none" stroke-dasharray="26 12"/>`; } return s; }), { sh: false, sway: 0 }, 'w h で伸び縮み / c c2 / seed / f');

  // ---------- 雲 ----------
  defPart.group = '雲';
  const sky = { sh: false, sway: 0, lift: 380, nosplit: true };
  D('cloud.puff', 'わた雲', 260, 110, (o, w, h) => A.cloud(w, h, o.seed || 1, o.c, o.c2), sky, 'w h で伸び縮み / c c2 / seed');
  D('cloud.tower', '入道雲', 360, 320, o => {
    const a = o.c || '#ffffff', b = o.c2 || '#d5e3f2'; let s = '';
    [[180, 80, 70], [110, 130, 62], [250, 140, 66], [70, 210, 60], [180, 190, 84], [290, 220, 62]].forEach(([x, y, q]) => s += c(x + 6, y + 8, q, b));
    [[180, 80, 66], [110, 130, 58], [250, 140, 60], [70, 210, 56], [180, 190, 80], [290, 220, 56]].forEach(([x, y, q]) => s += c(x - 4, y - 4, q, a));
    return s + r(20, 240, 320, 76, b, 38) + r(26, 232, 300, 60, a, 30);
  }, sky, 'c c2');
  D('cloud.rain', '雨雲', 300, 280, o => {
    const a = o.c || '#8f9ab0', b = '#737f96', q = rnd(3); let s = '';
    for (let i = 0; i < 12; i++) { const x = 30 + q() * 240, u = q(); s += g('dr', l('M0 0l-8 26', '#8fc6f0', 7), ` data-x="${n(x)}" data-p="${n(u)}" transform="translate(${n(x - u * 20)} ${n(120 + u * 140)})"`); }
    return s + A.cloud(300, 130, 2, a, b);
  }, Object.assign({}, sky, { anim: (tl, el, q) => qa(el, q, '.dr').forEach(d => { const u = (((tl * .9 + +d.dataset.p) % 1) + 1) % 1; d.setAttribute('transform', `translate(${(+d.dataset.x - u * 20).toFixed(1)} ${(120 + u * 140).toFixed(1)})`); d.setAttribute('opacity', (u < .85 ? 1 : (1 - u) / .15).toFixed(2)); }) }), 'c 雲。雨つぶが落ちる');
  D('cloud.haze', 'たなびく雲', 540, 100, (o, w, h) => {
    const a = o.c || '#ffffff', b = o.c2 || '#f3e6c8';
    return r(w * .1, h * .08, w * .6, h * .3, a, h * .15) + r(0, h * .36, w * .8, h * .3, a, h * .15) + r(w * .26, h * .66, w * .74, h * .3, a, h * .15) + r(w * .16, h * .16, w * .3, h * .08, b, h * .04) + r(w * .1, h * .46, w * .4, h * .08, b, h * .04) + r(w * .5, h * .76, w * .34, h * .08, b, h * .04);
  }, sky, 'w h で伸び縮み / c c2');

  // ---------- 水辺 ----------
  defPart.group = '水辺';
  D('water.pond', '池', 440, 160, (o, w, h) => {
    const a = o.c || '#7cc4e8', b = '#a9dcf2';
    return e(w / 2, h * .62, w * .48, h * .36, '#6aa85a') + e(w / 2, h * .6, w * .44, h * .3, a) + e(w * .4, h * .5, w * .18, h * .07, b) + e(w * .68, h * .7, w * .1, h * .06, '#6fb65c') + c(w * .7, h * .66, 7, '#ff9ecb') + e(w * .28, h * .72, w * .07, h * .05, '#6fb65c')
      + [.14, .2, .86].map((u, i) => r(w * u - 3, h * .1, 6, h * .5, '#7a8a4a') + r(w * u - 9, h * .02 + i * 6, 18, 44, '#7a4f2e', 9)).join('');
  }, { sh: false }, 'w h で伸び縮み / c 水。地面に描くなら lib() で');
  D('water.river', '川', 720, 150, (o, w, h) => {
    const a = o.c || '#6fb8e4', b = '#a9dcf2';
    let s = p(`M0 ${h * .3}Q${w * .25} ${h * .05} ${w * .5} ${h * .3}T${w} ${h * .3}V${h}H0Z`, a);
    for (let j = 0; j < 3; j++) s += g('rw', l(`M${w * .06} ${h * (.5 + j * .16)}q${w * .05} ${-h * .08} ${w * .1} 0M${w * .36} ${h * (.46 + j * .16)}q${w * .05} ${-h * .08} ${w * .1} 0M${w * .68} ${h * (.52 + j * .16)}q${w * .05} ${-h * .08} ${w * .1} 0`, b, 7), ` data-i="${j}"`);
    return s + e(w * .2, h * .92, 34, 14, '#a7ada6') + e(w * .8, h * .9, 40, 16, '#8f9690');
  }, { sh: false, sway: 0, anim: (tl, el, q) => qa(el, q, '.rw').forEach(d => d.setAttribute('transform', `translate(${(30 * sin(tl * .9 + +d.dataset.i * 1.9)).toFixed(1)} 0)`)) }, 'w h で伸び縮み / c 水。さざ波がゆれる');
  D('water.fall', '滝', 340, 540, o => {
    const a = o.c || '#8fd0f0', rk = '#8f9690', rk2 = '#788078';
    let s = poly([[0, 540], [10, 60], [70, 20], [120, 70], [110, 540]], rk) + poly([[230, 540], [220, 60], [270, 10], [330, 70], [340, 540]], rk2) + r(104, 50, 132, 440, a) + r(104, 50, 132, 26, '#fff', 12);
    for (let i = 0; i < 5; i++) s += l(`M${122 + i * 24} 80V470`, '#e6f6fd', 8, ` class="fs" stroke-dasharray="46 60" data-i="${i}"`);
    s += e(170, 500, 150, 38, a) + [[110, 488, 26], [150, 478, 30], [196, 480, 28], [236, 490, 24]].map(([x, y, q]) => c(x, y, q, '#fff')).join('');
    return s + c(40, 120, 26, '#6a9a58') + c(300, 150, 30, '#5a8a4e') + c(60, 300, 22, '#6a9a58');
  }, { sway: 0, anim: (tl, el, q) => qa(el, q, '.fs').forEach(d => d.setAttribute('stroke-dashoffset', (-tl * 150 - +d.dataset.i * 37).toFixed(0))) }, 'c 水。水が流れ落ちる');
  D('water.wave', '波', 560, 150, (o, w, h) => {
    const a = o.c || '#4bacde', b = o.c2 || '#84d0ee', row = (y, f, k, cls) => { let d = `M-80 ${h}V${n(y)}`; for (let x = -80; x < w + 80; x += k) d += `q${k * .25} ${-k * .34} ${k * .5} 0q${k * .25} ${k * .16} ${k * .5} 0`; return g(cls, p(d + `V${h}Z`, f) + l(d.replace(`M-80 ${h}V${n(y)}`, `M-80 ${n(y)}`), '#fff', 7)); };
    return `<svg x="0" y="0" width="${w}" height="${h}" overflow="hidden">` + row(h * .34, a, 110, 'w1') + row(h * .62, b, 90, 'w2') + '</svg>';
  }, { sh: false, sway: 0, anim: (tl, el, q) => { qs(el, q, '.w1').setAttribute('transform', `translate(${(28 * sin(tl * .8)).toFixed(1)} ${(5 * sin(tl * 1.3)).toFixed(1)})`); qs(el, q, '.w2').setAttribute('transform', `translate(${(-30 * sin(tl * .7 + 1)).toFixed(1)} ${(4 * sin(tl * 1.1 + 2)).toFixed(1)})`); } }, 'w h で伸び縮み / c c2。波がゆれる');

  // ---------- 空のもの ----------
  defPart.group = '空のもの';
  D('sky.sun', '太陽(顔つき)', 200, 200, () => A.sun(200), { sh: false, sway: 0, lift: 420, nosplit: true, anim: aSun(200) }, '顔のない太陽は A.sunDisc');
  D('sky.moon', '月', 180, 180, o => o.crescent ? p('M96 8A82 82 0 1 0 172 122A66 66 0 1 1 96 8Z', '#ffeeb0') : A.moon(180), { sh: false, sway: 0, lift: 420, nosplit: true, glow: 14 }, 'crescent 三日月');
  D('sky.stars', '星の群れ', 420, 260, o => { const q = rnd(o.seed || 2), f = o.c || '#ffe9a0'; let s = ''; for (let i = 0; i < 10; i++) s += g('tw', A.star(30 + q() * 360, 30 + q() * 200, 12 + q() * 16, f), ` data-p="${n(q() * 6.3)}"`); return s; }, { sh: false, sway: 0, lift: 420, flt: false, nosplit: true, anim: (tl, el, q) => qa(el, q, '.tw').forEach(d => d.setAttribute('opacity', (.45 + .55 * abs(sin(tl * 1.6 + +d.dataset.p))).toFixed(2))) }, 'c 色 / seed 並び。またたく');
  D('sky.rainbow', '虹', 1060, 500, (o, w, h) => A.rainbow(w, h), { sh: false, sway: 0 }, 'w h で伸び縮み');
})();
