// ジャックと豆の木 — 作品定義(tobidas の完成見本)。
// 座標は見開き座標: X∈[-720,720](0=本の背)、Y∈[0,920](大きいほど手前)。tl は「その見開きが開ききってからの秒数」。
const SC = [null];

// ============ 1. むかしむかし ============
SC[1] = {
  ground: A.gMeadow({ seed: 5 }),
  pieces: [
    pc(0, 100, 1400, 250, A.hills(1400, 250, '#a5d3e2', '#8cc6cf', 2, 1.2, hillTrees(9, 3, 50, true)), { sh: false, sway: 0 }),
    pc(-440, 120, 200, 200, A.sun(200), { lift: 330, glow: 36, sh: false, anim: aSun(200), sway: 2 }),
    pc(150, 130, 270, 110, A.cloud(270, 110, 2), { lift: 380, sh: false, dyn: tl => ({ dx: 40 * sin(tl * .3) }) }),
    pc(520, 150, 200, 86, A.cloud(200, 86, 5), { lift: 300, sh: false, dyn: tl => ({ dx: -30 * sin(tl * .25 + 1) }) }),
    pc(-180, 140, 170, 74, A.cloud(170, 74, 8), { lift: 250, sh: false, dyn: tl => ({ dx: 24 * sin(tl * .35 + 2) }) }),
    pc(0, 230, 1420, 210, A.hills(1420, 210, '#7cbf66', '#94d078', 7, 1.0, hillTrees(8, 5, 70)), { sh: false, sway: 0 }),
    pc(-350, 440, 420, 380, A.cottage(), { k: 1.2, anim: aSmoke, sway: .3 }),
    pc(390, 410, 300, 430, A.tree(300, 430, { fruit: '#e2574c' }), { sway: 1.4 }),
    pc(360, 545, 440, 90, A.fence(440, 90), { sway: .3 }),
    pc(-150, 610, 120, 226, A.mother({ armR: -24 }), { k: .9, anim: aArm('.aR', tl => -40 + 16 * sin(tl * 2)) }),
    pc(330, 690, 300, 210, A.cow(), { k: .9, anim: aCow }),
    pc(70, 720, 120, 226, A.jack({ armR: -150 }), { k: .82, anim: aArm('.aR', tl => -150 + 20 * sin(tl * 7)), dyn: tl => ({ lift: 10 * abs(sin(tl * 3.5)) }) }),
    pc(-560, 770, 280, 120, A.bush(280, 120)),
    pc(590, 810, 240, 90, A.grass(240, 90, undefined, undefined, GR)),
    pc(-230, 830, 220, 70, A.grass(220, 70, undefined, undefined, GR)),
    bird(-300, 300, 420, 34, 0), bird(-380, 340, 470, 30, 2),
    fly(200, 800, '#ff9ecb', 0), fly(-420, 700, '#ffe27a', 2),
  ]
};

// ============ 2. まほうの豆 ============
const beanU = tl => sm((tl - 3.4) / 1.4);
SC[2] = {
  ground: A.gMeadow({ seed: 8, pond: null, path: 'M0 600C300 560 500 690 760 650S1200 590 1440 650L1440 790C1200 730 1000 810 740 800S300 720 0 750Z' }) +
    `<path d="M770 265L1130 340V560H800Z" fill="#f2d566"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${786 + i * 41} ${F(278 + i * 8.5)}L${812 + i * 38} 552" stroke="#d9b440" stroke-width="5"/>`).join('') +
    `<path d="M290 343L670 265L650 540H310Z" fill="#8fc45c"/>` + Array.from({ length: 20 }, (_, i) => { const c = i % 5, r = Math.floor(i / 5), cx = 336 + c * 70 + (r % 2) * 12, top = 343 - (cx - 290) * .205; return `<circle cx="${cx}" cy="${F(top + 30 + r * (486 - top) / 3)}" r="13" fill="#6aa84f"/>`; }).join(''),
  pieces: [
    pc(0, 90, 1400, 240, A.hills(1400, 240, '#b5c9e8', '#9db7dc', 11, .9), { sh: false, sway: 0 }),
    pc(470, 110, 190, 190, A.sun(190), { lift: 360, glow: 36, sh: false, anim: aSun(190), sway: 2 }),
    pc(-260, 120, 250, 104, A.cloud(250, 104, 4), { lift: 380, sh: false, dyn: tl => ({ dx: 36 * sin(tl * .3) }) }),
    pc(120, 150, 760, 230, A.village(760, 230), { sway: .2, shOp: .6 }),
    pc(0, 200, 1420, 190, A.hills(1420, 190, '#86c56c', '#9bd47c', 13, 1.3, hillTrees(7, 9, 64)), { sh: false, sway: 0 }),
    pc(-540, 430, 270, 400, A.tree(270, 400), { sway: 1.4 }),
    pc(560, 440, 260, 300, A.pine(60, 300, 190) + A.pine(150, 300, 240, '#4a8f66') + A.pine(220, 300, 170), { sway: 1 }),
    pc(-270, 560, 150, 260, A.sign(), { sway: .6 }),
    pc(240, 566, 370, 110, A.grass(370, 110, '#e3bd45', '#f2d566'), { sway: 1.6 }),
    pc(-440, 720, 300, 210, A.cow(), { k: .9, anim: aCow }),
    pc(-130, 730, 120, 226, A.jack({ armR: -70 }), { k: .82, anim: aArm('.aR', tl => -64 - 40 * beanU(tl) + 4 * sin(tl * 3)), dyn: tl => ({ lift: tl > 5 ? 26 * abs(sin((tl - 5) * 5)) : 0 }) }),
    pc(190, 735, 120, 240, A.oldman({ armR: -60, flip: true }), { k: 1.02, anim: aArm('.aR', tl => -70 + 30 * beanU(tl) + 3 * sin(tl * 2)) }),
    pc(96, 728, 150, 150, A.glow(150), { k: .8, sh: false, glow: 26, nosplit: true, side: 'R', sway: 0, delay: .35, anim: aSun(150), dyn: tl => { const u = beanU(tl); return { dx: -150 * u, lift: 118 + 70 * sin(u * PI) + 6 * sin(tl * 3), sc: .85 + .15 * sin(tl * 5) }; } }),
    twinkle(30, 730, 210, 0, 13), twinkle(150, 732, 200, 2, 10), twinkle(-40, 734, 150, 4, 9),
    pc(-570, 850, 260, 90, A.grass(260, 90, undefined, undefined, GR)),
    pc(540, 860, 300, 100, A.bush(300, 100, '#5aa64e', '#7cc463', '#fff3b0')),
    fly(380, 800, '#9ed0ff', 1), fly(-300, 840, '#ff9ecb', 3), bird(-500, 300, 440, 40, 1),
  ]
};

// ============ 3. 一晩でのびた豆の木 ============
const G0 = 2.7, GD = 4.5, growU = tl => { const u = cl((tl - G0) / GD); return u < .5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u); };
const stalkDyn = tl => { const g = growU(tl); return { clip: 1 - g, op: g > 0 ? 1 : 0, rz: g < 1 ? 1.2 * sin(tl * 9) * (1 - g) : 0 }; };
const thrown = i => pc(-300, 470, 40, 28, A.bean('#9be36a'), { sh: false, nosplit: true, glow: 10, sway: 0, delay: .3, dyn: tl => { const u = cl((tl - .7 - i * .14) / 1.0); return { dx: 300 * u + i * 24, dy: 130 * u, lift: 200 * (1 - u) + 520 * u * (1 - u), rz: tl * 500, op: u > 0 && tl < 3 ? 1 : 0 }; } });
SC[3] = {
  ground: A.gMeadow({ seed: 5, night: true }),
  pieces: [
    pc(0, 100, 1400, 250, A.hills(1400, 250, '#2f4d74', '#284466', 2, 1.2, hillTrees(9, 3, 50, true)), { sh: false, sway: 0 }),
    pc(420, 120, 180, 180, A.moon(180), { lift: 420, glow: 60, sh: false, sway: 1.5 }),
    ...[[-560, 110, 520], [-420, 120, 380], [-250, 100, 560], [-90, 130, 430], [120, 110, 540], [260, 130, 330], [600, 100, 300], [640, 140, 560], [-640, 150, 300], [30, 150, 300]].map(([x, y, l], i) => twinkle(x, y, l, i * 1.3, 10 + (i % 3) * 5, '#fff3c0')),
    pc(0, 230, 1420, 210, A.hills(1420, 210, '#2c5a52', '#346a58', 7, 1.0, hillTrees(8, 5, 70)), { sh: false, sway: 0 }),
    pc(-380, 450, 420, 380, A.cottage({ night: true }), { k: 1.2, anim: aSmoke, sway: .3, glow: 14, glowC: 'rgba(255,215,106,.5)' }),
    pc(500, 420, 300, 430, A.tree(300, 430, { c: '#2f6a58', c2: '#3a7a62', c3: '#4a8f70' }), { sway: 1.4 }),
    thrown(0), thrown(1), thrown(2),
    pc(30, 604, 120, 120, A.glow(120), { sh: false, glow: 30, nosplit: true, sway: 0, delay: .3, anim: aSun(120), dyn: tl => ({ lift: 6, sc: 1.1 * sm((tl - 1.7) / .4) * (1 - sm((tl - 3.0) / .8)), op: tl > 1.7 && tl < 3.8 ? 1 : 0 }) }),
    pc(30, 600, 260, 1300, A.stalk(260, 1300), { nosplit: true, side: 'R', delay: 0, sway: .5, yaw: 45, dyn: stalkDyn }),   // 2枚を X 字に組む(見開き6と同じ向き)
    pc(30, 600, 260, 1300, A.stalk(260, 1300), { nosplit: true, side: 'R', delay: 0, sway: .5, yaw: -45, dyn: stalkDyn, shOp: .5 }),
    pc(-190, 560, 380, 140, A.cloud(380, 140, 3), { sh: false, nosplit: true, sway: 0, dyn: tl => ({ lift: 1060, sc: pop(tl, 6.1, .8), op: tl > 6.1 ? 1 : 0, dx: 20 * sin(tl * .5) }) }),
    pc(260, 640, 320, 120, A.cloud(320, 120, 6), { sh: false, nosplit: true, sway: 0, dyn: tl => ({ lift: 1140, sc: pop(tl, 6.5, .8), op: tl > 6.5 ? 1 : 0, dx: -20 * sin(tl * .4) }) }),
    pc(60, 700, 300, 110, A.cloud(300, 110, 9), { sh: false, nosplit: true, sway: 0, dyn: tl => ({ lift: 950, sc: pop(tl, 6.9, .8), op: tl > 6.9 ? 1 : 0, dx: 16 * sin(tl * .6 + 1) }) }),
    pc(-150, 720, 120, 226, A.jack({ armL: 150, armR: -150, look: 'up', mouth: 'o' }), { k: .82, nosplit: true, dyn: tl => ({ sc: pop(tl, 7.0), op: tl > 7.0 ? 1 : 0, lift: tl > 7.6 ? 18 * abs(sin((tl - 7.6) * 5)) : 0 }) }),
    pc(-270, 700, 120, 226, A.mother({ armL: 130, armR: -130, look: 'up', mouth: 'o' }), { k: .9, dyn: tl => ({ sc: pop(tl, 7.5), op: tl > 7.5 ? 1 : 0 }) }),
    pc(-570, 800, 280, 110, A.bush(280, 110, '#2f6a58', '#3a7a62', '#b9a6d6')),
    pc(560, 820, 260, 90, A.grass(260, 90, '#2f6a58', '#3a7a62')),
  ]
};

// ============ 4. 雲の上のお城 ============
const J4 = tl => { const a = sm((tl - .2) / 2.2), b = sm((tl - 2.5) / .7), c = sm((tl - 3.3) / 3.6); return { lift: -200 + 330 * a - 130 * b + (c > 0 && c < 1 ? 14 * abs(sin(tl * 7)) : 0) + (a < 1 ? 5 * sin(tl * 12) : 0), dx: 110 * b + 230 * c, dy: 30 * b, rz: a < 1 ? 5 * sin(tl * 6) : 0 }; };
SC[4] = {
  ground: A.gSky(),
  pieces: [
    pc(0, 100, 1420, 150, A.cloudBank(1420, 150, 2, '#eaf5fd', '#c4dcf2'), { sh: false, sway: 0 }),
    pc(-470, 120, 200, 200, A.sun(200), { lift: 400, glow: 40, sh: false, anim: aSun(200), sway: 2 }),
    pc(-130, 180, 260, 104, A.cloud(260, 104, 4), { lift: 300, sh: false, dyn: tl => ({ dx: 50 * sin(tl * .3) }) }),
    pc(320, 345, 520, 560, A.castle(), { sway: .3, anim: aFlag }),
    twinkle(140, 430, 520, 0, 14, '#fff3a0'), twinkle(520, 430, 600, 2, 12, '#fff3a0'), twinkle(300, 450, 700, 4, 16, '#fff3a0'),
    pc(0, 480, 1420, 110, A.cloudBank(1420, 110, 6), { sh: false, sway: 0 }),
    pc(620, 540, 240, 100, A.cloud(240, 100, 7), { lift: 420, sh: false, dyn: tl => ({ dx: -40 * sin(tl * .28) }) }),
    pc(-420, 650, 260, 330, A.stalk(260, 330), { sway: 1.2, nosplit: true }),
    pc(-420, 656, 120, 226, A.jack({ armL: 150, armR: -150 }), { k: .82, nosplit: true, sway: 0, dyn: J4, anim: many(aArm('.aR', tl => tl < 2.4 ? -150 + 30 * sin(tl * 6) : -20 + 30 * sin(tl * 7)), aArm('.aL', tl => tl < 2.4 ? 150 + 30 * sin(tl * 6) : 20 + 30 * sin(tl * 7), 40)) }),
    pc(-400, 690, 420, 120, A.cloud(420, 120, 8), { sh: false, sway: .4 }),
    pc(160, 720, 300, 100, A.cloud(300, 100, 11), { sh: false, nosplit: true, sway: .4, dyn: tl => ({ dx: 20 * sin(tl * .5) }) }),
    pc(0, 860, 1420, 84, A.cloudBank(1420, 84, 12), { sh: false, sway: 0 }),
    bird(-200, 400, 520, 46, 0, '#5a6a8a'), bird(-280, 440, 470, 40, 2, '#5a6a8a'), bird(100, 300, 620, -30, 4, '#5a6a8a'),
  ]
};

// ============ 5. 大男のお城 ============
const pillar = `<rect x="14" y="40" width="82" height="560" fill="#a79cc4"/><rect x="30" y="40" width="16" height="560" fill="#bdb3d6"/><rect x="74" y="40" width="22" height="560" fill="#9186b0"/><rect x="0" y="0" width="110" height="46" rx="6" fill="#7f74a0"/><rect x="0" y="590" width="110" height="30" rx="6" fill="#7f74a0"/>`;
const zz = (i) => pc(-150, 425, 60, 60, A.zzz(56), { sh: false, flt: true, nosplit: true, sway: 0, delay: .3, dyn: tl => { const u = (((tl * .4 + i / 3) % 1) + 1) % 1; return { lift: 520 + u * 230, dx: u * 120 + 16 * sin(u * 8), sc: .4 + u * 1.0, op: sin(u * PI) }; } });
SC[5] = {
  ground: A.gFloor(),
  pieces: [
    pc(0, 130, 1380, 520, A.wall(), { sh: false, sway: 0, anim: (tl, el, q) => qa(el, q, '.flame').forEach((f, i) => { const k = 1 + .14 * sin(tl * 13 + i * 2); f.setAttribute('transform', `translate(0 ${(238 * (1 - k)).toFixed(2)}) scale(1 ${k.toFixed(3)})`); }) }),
    pc(-320, 400, 560, 560, A.giantSleep(), { k: 1.04, sway: .3, anim: (tl, el, q) => { rot(qs(el, q, '.ghead'), 8 + 3.5 * sin(tl * 1.6), 280, 330); const m = qs(el, q, '.gm'); m.setAttribute('ry', (20 + 12 * sin(tl * 1.6)).toFixed(1)); } }),
    zz(0), zz(1), zz(2),
    pc(-345, 480, 660, 200, A.table(660, 200) + `<rect x="80" y="-30" width="70" height="60" rx="8" fill="#c9b08a"/><ellipse cx="530" cy="16" rx="80" ry="14" fill="#f4efe2"/><circle cx="530" cy="-6" r="26" fill="#d98f4a"/>`, { sway: .2 }),
    pc(440, 450, 320, 170, A.coins(320, 170), { sway: .3 }),
    twinkle(360, 452, 150, 0, 14, '#fff3a0'), twinkle(470, 453, 190, 2, 12, '#fff3a0'), twinkle(540, 451, 120, 4, 10, '#fff3a0'),
    pc(590, 640, 160, 240, A.harp(), { sway: 1.2, glow: 12 }),
    note(560, 642, 0), note(600, 643, .33), note(630, 644, .66),
    pc(300, 690, 150, 150, `<path d="M20 150L34 96H116L130 150Z" fill="#7f74a0"/><ellipse cx="75" cy="96" rx="50" ry="12" fill="#b8433a"/><g transform="translate(22 -30) scale(.95)">${A.hen()}</g>`, { sway: .6, dyn: tl => ({ rz: 3 * sin(tl * 4) }) }),
    pc(410, 700, 44, 54, A.egg(), { glow: 22, sway: 0, dyn: tl => ({ sc: pop(tl, 2.2) * (1 + .06 * sin(tl * 6)), op: tl > 2.2 ? 1 : 0 }) }),
    pc(-90, 800, 120, 226, A.jack({ armR: -80, armL: 40 }), { k: .72, nosplit: true, side: 'L', dyn: tl => { const u = sm((tl - .8) / 5.2); return { dx: 330 * u, lift: u > 0 && u < 1 ? 9 * abs(sin(tl * 5)) : 0, rz: u > 0 && u < 1 ? 4 * sin(tl * 5) : 0 }; }, anim: aArm('.aR', tl => -80 - 20 * sm((tl - 5) / 1) + 5 * sin(tl * 4)) }),
    pc(-650, 600, 110, 620, pillar, { sway: 0 }), pc(650, 600, 110, 620, pillar, { sway: 0 }),
  ]
};

// ============ 6. 豆の木を切りたおす ============
const CH = [1.2, 2.0, 2.8, 3.6], FALL = 4.05, fallU = tl => Math.pow(cl((tl - FALL) / 1.45), 2.3);
const chopA = tl => { let a = -150; for (const c of CH) { const u = (tl - c + .22) / .22; if (u > 0 && u < 1) a = -150 + 105 * u * u; else if (u >= 1 && u < 2.6) a = -45 - 105 * sm((u - 1) / 1.6); } return tl > FALL + 1.6 ? -150 + 14 * sin(tl * 8) : a; };
// 豆の木は2枚を X 字(yaw ±45)に組む。正面向きと真横向きの十字だと、真横の板が手前の大男を突き抜けて見えるため。
// X 字のまま右へ倒すには、板ごとに「面内の回転 rz」と「根元まわりの倒れ lean」を組み合わせる(幹の向きが2枚で一致する)
const stalkFall = yaw => tl => { const f = fallU(tl) * 88 * PI / 180, c = cos(yaw * PI / 180), sn = sin(yaw * PI / 180), D = 180 / PI; return { rz: shakeS(tl) + Math.asin(sin(f) * c) * D, lean: Math.atan2(sin(f) * sn, cos(f)) * D }; };
const shakeS = tl => { let s = 0; for (const c of CH) if (tl > c) s += 3 * Math.exp(-7 * (tl - c)) * sin((tl - c) * 50); return s; };
const leafFall = (i) => pc(40 + (i % 3) * 30, 560, 50, 30, `<path d="M0 16Q20 -14 50 8Q30 34 0 16Z" fill="${['#5db04b', '#74c259', '#8fd46e'][i % 3]}"/>`, { sh: false, nosplit: true, side: 'R', sway: 0, delay: .3, dyn: tl => { const u = cl((tl - FALL - .1 - i * .12) / 3.2); return { lift: 760 * (1 - u) - 100 * i * (1 - u) + 200, dx: (i - 3) * 90 * u + 50 * sin(u * 9 + i), rz: 300 * u + i * 40, op: u > 0 && u < 1 ? 1 : 0 }; } });
SC[6] = {
  ground: A.gMeadow({ seed: 9, pond: [1180, 230], path: 'M230 440C300 620 620 600 800 720S1100 880 1160 920L990 920C940 860 800 800 640 760S220 660 170 440Z' }),
  pieces: [
    pc(0, 100, 1400, 250, A.hills(1400, 250, '#a5d3e2', '#8cc6cf', 4, 1.1, hillTrees(9, 6, 50, true)), { sh: false, sway: 0 }),
    pc(0, 230, 1420, 210, A.hills(1420, 210, '#7cbf66', '#94d078', 15, 1.2, hillTrees(8, 2, 70)), { sh: false, sway: 0 }),
    pc(-450, 440, 420, 380, A.cottage(), { k: 1.1, anim: aSmoke, sway: .3 }),
    pc(540, 420, 290, 410, A.tree(290, 410), { sway: 1.4 }),
    pc(30, 548, 160, 110, A.stump(), { nosplit: true, side: 'R', dyn: tl => ({ op: tl > FALL ? 1 : 0 }) }),
    pc(30, 550, 260, 1300, A.stalk(260, 1300, false), { nosplit: true, side: 'R', delay: 0, sway: .5, yaw: 45, dyn: tl => Object.assign(stalkFall(45)(tl), { op: 1 - sm((tl - FALL - 2.0) / .8) }) }),
    pc(30, 550, 260, 1300, A.stalk(260, 1300, false), { nosplit: true, side: 'R', delay: 0, sway: .5, yaw: -45, shOp: .5, dyn: tl => Object.assign(stalkFall(-45)(tl), { op: tl > FALL + .1 ? 0 : 1 }) }),
    pc(30, 676, 460, 560, A.giantClimb(), { k: .9, nosplit: true, side: 'R', delay: 0, sway: 0, dyn: tl => { const f = fallU(tl), u = sm(tl / FALL); return { lift: 1000 - 300 * u + 8 * sin(tl * 9), rz: 4 * sin(tl * 4.5) + f * 120, rzBase: shakeS(tl) + 88 * f, op: 1 - sm((tl - FALL - 1.2) / .5) }; } }),
    pc(190, 660, 120, 226, A.jack({ armR: -150, armL: 30, flip: true, mouth: 'big', holdR: `<path d="M80 146V236" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><path d="M84 200Q114 192 118 216Q112 240 84 232Z" fill="#c3cbd4"/>` }), { k: .86, nosplit: true, anim: aArm('.aR', chopA), dyn: tl => ({ lift: tl > FALL + 1.6 ? 34 * abs(sin((tl - FALL - 1.6) * 5)) : 0 }) }),
    ...CH.map((c, i) => pc(110, 566, 60, 60, A.star(30, 30, 29, '#fff3a0'), { sh: false, flt: false, nosplit: true, side: 'R', sway: 0, delay: .3, glow: 14, dyn: tl => { const u = (tl - c) / .3; return { lift: 50, sc: u > 0 && u < 1 ? sin(u * PI) * 1.3 : 0, op: u > 0 && u < 1 ? 1 : 0, rz: i * 30 }; } })),
    pc(-190, 670, 120, 226, A.mother({ armL: 140, armR: -140, mouth: 'o', look: 'up' }), { k: .9, dyn: tl => ({ lift: tl > FALL + 1.8 ? 22 * abs(sin((tl - FALL - 1.8) * 5 + 1)) : 0, rz: tl < FALL ? 3 * sin(tl * 9) : 0 }) }),
    pc(380, 740, 120, 130, A.hen(), { k: .8, dyn: tl => ({ rz: 3 * sin(tl * 5) }) }),
    pc(500, 730, 160, 240, A.harp(), { k: .6, glow: 10 }),
    ...[0, 1, 2, 3, 4, 5, 6].map(leafFall),
    pc(560, 600, 300, 150, A.puff(300, 150, 3), { sh: false, nosplit: true, sway: 0, delay: .3, dyn: tl => { const u = cl((tl - FALL - 1.35) / 1.8); return { sc: u > 0 ? .3 + 1.5 * Math.sqrt(u) : 0, op: u > 0 ? 1 - u * u : 0, lift: 60 * u }; } }),
    pc(380, 620, 260, 130, A.puff(260, 130, 5), { sh: false, nosplit: true, sway: 0, delay: .3, dyn: tl => { const u = cl((tl - FALL - 1.3) / 1.6); return { sc: u > 0 ? .3 + 1.3 * Math.sqrt(u) : 0, op: u > 0 ? 1 - u * u : 0, lift: 50 * u }; } }),
    pc(-560, 800, 280, 110, A.bush(280, 110)),
    pc(580, 850, 260, 90, A.grass(260, 90, undefined, undefined, GR)),
    pc(-240, 850, 220, 70, A.grass(220, 70, undefined, undefined, GR)),
  ]
};

// ============ 7. しあわせに ============
const bunting = (w, h) => { let s = `<path d="M0 10Q${w / 2} ${h * 1.1} ${w} 10" stroke="#8a5a33" stroke-width="4" fill="none"/>`; for (let i = 1; i < 14; i++) { const u = i / 14, x = w * u, y = 10 + (h * 1.1 - 10) * 2 * u * (1 - u) * 1.0; s += `<path d="M${F(x - 18)} ${F(y)}L${F(x + 18)} ${F(y)}L${F(x)} ${F(y + 44)}Z" fill="${['#e2574c', '#f3c64f', '#58a6d6', '#6cc26a', '#ff9ecb'][i % 5]}"/>`; } return s; };
const confetti = i => pc(-600 + i * 86 + (i % 3) * 20, 300 + (i * 97) % 500, 22, 14, `<rect width="22" height="14" rx="3" fill="${['#e2574c', '#f3c64f', '#58a6d6', '#6cc26a', '#ff9ecb', '#fff'][i % 6]}"/>`, { sh: false, flt: false, nosplit: true, sway: 0, delay: .3, dyn: tl => { const u = (((tl * .16 + i * .137) % 1) + 1) % 1; return { lift: 760 * (1 - u), dx: 40 * sin(u * 8 + i), rz: tl * 200 + i * 50, sc: .6 + .4 * abs(sin(tl * 4 + i)), op: cl(u * 8) * cl((1 - u) * 5) }; } });
const eggPop = (X, t0) => pc(X, 762, 44, 54, A.egg(), { k: .8, glow: 18, sway: 0, dyn: tl => ({ sc: pop(tl, t0) * (1 + .05 * sin(tl * 6 + X)), op: tl > t0 ? 1 : 0 }) });
SC[7] = {
  ground: A.gMeadow({ seed: 14, pond: [1190, 260] }),
  pieces: [
    pc(0, 100, 1400, 250, A.hills(1400, 250, '#a5d3e2', '#8cc6cf', 6, 1.2, hillTrees(9, 8, 50, true)), { sh: false, sway: 0 }),
    pc(0, 170, 1060, 500, A.rainbow(1060, 500), { sh: false, sway: 0, delay: .1 }),
    pc(500, 130, 200, 200, A.sun(200), { lift: 430, glow: 40, sh: false, anim: aSun(200), sway: 2 }),
    pc(-470, 150, 250, 104, A.cloud(250, 104, 3), { lift: 420, sh: false, dyn: tl => ({ dx: 30 * sin(tl * .3) }) }),
    pc(0, 240, 1420, 210, A.hills(1420, 210, '#7cbf66', '#94d078', 17, 1.0, hillTrees(8, 4, 70)), { sh: false, sway: 0 }),
    pc(-350, 440, 420, 380, A.cottage({ fancy: true }), { k: 1.25, anim: aSmoke, sway: .3 }),
    pc(420, 420, 300, 430, A.tree(300, 430, { fruit: '#f6c843' }), { sway: 1.4 }),
    pc(60, 450, 620, 110, bunting(620, 110), { lift: 300, sh: false, sway: 1.5, nosplit: true, side: 'R' }),
    pc(40, 580, 160, 110, A.stump(), { nosplit: true, side: 'R' }),
    pc(-500, 740, 300, 210, A.cow(), { k: .8, anim: aCow }),
    pc(-190, 690, 120, 226, A.mother({ armL: 140, armR: -140, mouth: 'big' }), { k: .9, dyn: tl => ({ lift: 26 * abs(sin(tl * 4 + 1)) }) }),
    pc(-70, 710, 120, 226, A.jack({ armL: 150, armR: -150, mouth: 'big' }), { k: .82, nosplit: true, dyn: tl => ({ lift: 40 * abs(sin(tl * 4)) }), anim: many(aArm('.aR', tl => -150 + 20 * sin(tl * 8)), aArm('.aL', tl => 150 - 20 * sin(tl * 8), 40)) }),
    pc(200, 770, 120, 130, A.hen(), { k: .9, dyn: tl => ({ rz: 4 * sin(tl * 5), lift: 6 * abs(sin(tl * 5)) }) }),
    eggPop(280, 1.2), eggPop(322, 2.6), eggPop(364, 4.0),
    pc(520, 690, 160, 240, A.harp(), { k: .85, glow: 12, sway: 1.5 }),
    note(500, 692, 0), note(530, 693, .33), note(560, 694, .66),
    pc(600, 800, 220, 110, A.coins(220, 110), { sway: .3 }),
    ...Array.from({ length: 15 }, (_, i) => confetti(i)),
    pc(-580, 840, 260, 100, A.bush(260, 100)),
    pc(350, 870, 300, 80, A.grass(300, 80, undefined, undefined, GR)),
    pc(-260, 870, 220, 70, A.grass(220, 70, undefined, undefined, GR)),
    fly(120, 840, '#ff9ecb', 0), fly(-380, 820, '#9ed0ff', 2), bird(-400, 300, 520, 40, 0), bird(-470, 340, 560, 36, 2),
  ]
};

// ---- 見開きごとの秒数・字幕・カメラ・色調・ゆれ ----
const P = Tobidas.pose;
// 音: music = BGMの気分(同じ気分が続く見開きはつながる)、sfx = [tl, 効果音, 設定]。書き方は references/sound.md
Object.assign(SC[1], { hold: 7.2, music: 'bright', caption: ['むかし むかし、ジャックという 男の子が、', 'お母さんと 一頭の牛と くらしていました。'] });
Object.assign(SC[2], { hold: 7.4, music: 'bright', sfx: [[3.4, 'sparkle', { len: 1.6, n: 14, vol: .5 }]],   // まほうの豆
  caption: ['市場へ 牛を売りにいく とちゅう、ふしぎな おじいさんに出会い、', 'ジャックは 牛を 「まほうの豆」と とりかえました。'],
  cam: { start: { d: 400, yaw: 3, cx: 60 }, end: { d: 200, yaw: -1, cx: 20, cz: 165 } } });
Object.assign(SC[3], { hold: 10.0,
  // 夜の曲 → 豆の木がのびるあいだは曲を止めて上昇音階 → 夜明けの曲
  music: [[0, 'night'], [2.4, 'none'], [8.1, { tune: 'main', beat: .6, vol: .7, startBar: 4 }]], sfx: [[1.7, 'drop'], [2.7, 'rise', { len: 4.5 }]],
  caption: ['おこった お母さんが、豆を まどから なげすてると……', '一晩で、雲まで とどく 豆の木が のびたのです!'],
  // 豆が落ちる所に寄り、のびる豆の木に合わせて大きく引く
  cam: { start: { d: 320, yaw: 2, cx: -120, cz: 170 }, keys: [[2.5, { d: 130, cx: -30, cz: 120, tilt: 50 }], [7.3, { d: 1150, tilt: 72, yaw: -4, cx: 0, cy: 60, cz: 560 }]], end: { d: 1250, tilt: 74, yaw: 4, cx: 0, cy: 60, cz: 600 } },
  grade: tl => ['#3d52a8', .56 * (1 - sm((tl - 5.0) / 3.2))] });   // 夜 → 夜明け
Object.assign(SC[4], { hold: 7.8, music: 'airy', caption: ['ジャックが 豆の木を ぐんぐん のぼっていくと、', '雲の上には 大きな お城が ありました。'],
  cam: { start: { d: 320, yaw: -3, cx: -200, cz: 170 }, end: { d: 280, yaw: 3, cx: 160, cz: 230, tilt: 56 } } });
Object.assign(SC[5], { hold: 8.0, music: 'creepy', sfx: [[.35, 'snore', { n: 2, pan: -.4 }], [2.2, 'sparkle', { len: 1, n: 6 }]],
  caption: ['お城では おそろしい 大男が ぐうぐう おひるね。', '金のたまごを うむ にわとりと、歌うハープを 見つけます。'],
  cam: { start: { d: 400, yaw: -2, cx: -120, cz: 230, tilt: 56 }, end: { d: 240, yaw: 3, cx: 130, cz: 170 } },
  grade: () => ['#b79ac6', .36] });                                 // うす暗い城の中
const IMPACT = FALL + 1.4;
Object.assign(SC[6], { hold: 9.2,
  music: [[0, 'chase'], [FALL, 'none'], [IMPACT + 1.6, 'triumph']],
  sfx: [[.2, 'steps', { n: 9 }], ...CH.map(c => [c, 'chop']), [FALL, 'creak'], [FALL + .2, 'whoosh'], [FALL + .25, 'fall'], [IMPACT, 'crash'], [IMPACT + 1, 'fanfare']],
  caption: ['「まてえ!」 目をさました 大男が 追いかけてきます。', 'ジャックは おので 豆の木を 切りたおしました!'],
  cam: { start: { d: 1300, tilt: 73, yaw: 3, cx: 0, cy: 60, cz: 640 }, keys: [[FALL, { d: 1150, tilt: 71, yaw: -3, cx: 60, cy: 60, cz: 540 }], [FALL + 2.3, { d: 560, cx: 130, cz: 200, tilt: 56 }]], end: { d: 320, cx: 40 } },
  shake: tl => { let x = 0, y = 0; const k = tl - IMPACT; if (k > 0 && k < 1.6) { const a = 26 * Math.exp(-3.4 * k); x += a * sin(k * 47); y += a * sin(k * 61 + 1); } for (const c of CH) { const u = tl - c; if (u > 0 && u < .4) y += 5 * Math.exp(-9 * u) * sin(u * 70); } return [x, y]; } });
Object.assign(SC[7], { hold: 8.6, music: 'happy', sfx: [[.5, 'sparkle', { len: 7.4, n: 26, vol: .25, base: 91 }], [1.2, 'bell'], [2.6, 'bell'], [4.0, 'bell']],
  caption: ['こうして ジャックと お母さんは、', 'いつまでも しあわせに くらしました。'],
  cam: { start: { d: 460, yaw: -3, cz: 200 }, end: { d: 280, yaw: 2, cz: 190 } } });

Tobidas.book({
  title: 'ジャックと豆の木 とびだすえほん',
  lang: 'ja',
  theme: { board: '#174536', spine: '#123a2d' },
  cover: A.cover(),
  end: { title: 'おしまい', sub: 'ジャックと豆の木' },
  tableDeco: i => i % 4 == 0 ? `<path d="M0 0Q20 -30 50 -8Q30 20 0 0Z" fill="#6aa84f"/><path d="M0 0Q26 -6 50 -8" stroke="#3f7a35" stroke-width="2" fill="none"/>` : A.bean(i % 3 ? '#d9c08a' : '#c9e08a'),
  spreads: SC.slice(1),
});
