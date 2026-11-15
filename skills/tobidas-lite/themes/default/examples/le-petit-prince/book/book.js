// 作品定義「Le Petit Prince」。座標: X∈[-720,720](0=本の背)、Y∈[0,920](大きいほど手前)。tl = 見開きが開ききってからの秒数。
const spreads = [];
const prince = (X, Y, pose = {}, opt = {}) => pc(X, Y, 120, 226, A.prince(pose), Object.assign({ k: 1, nosplit: true, anim: aScarf }, opt));
const glint = (X, Y, z, ph, r = 14, c = '#ffe9a0') => twinkle(X, Y, z, ph, r, c);

// ── 1. 砂漠での出会い ─────────────────────────────
const APPEAR = 1.6, BOX = 3.8, SHEEP = 4.9;
spreads.push({
  hold: 7.8,
  scene: ppAtmosphere.desert,
  music: 'gentle',
  ground: A.gSand(3),
  caption: ['Un matin, dans le désert, un petit garçon apparut.', [APPEAR + .6, '— S’il te plaît... dessine-moi un mouton !']],
  sfx: [[.4, 'wind', { len: 2.5 }], [APPEAR, 'pop'], [APPEAR + .1, 'sparkle', { len: 1 }], [BOX, 'pop'], [SHEEP, 'bell', { vol: .4 }]],
  cam: { start: { d: 330, yaw: -3, cz: 140 }, end: { d: 250, cx: 40, yaw: 2, cz: 130 } },
  pieces: [
    pc(0, 110, 1400, 220, A.dune(1400, 220, '#efc98c', '#e6b46e', 3), { sh: false }),
    pc(500, 120, 200, 200, A.sunDisc(200, '#ffe7a0', '#fff8dc'), { lift: 360, flt: false, glow: 24, sh: false, sway: 0, nosplit: true }),
    pc(0, 250, 1420, 180, A.dune(1420, 180, '#e0a865', '#d39552', 8), { sh: false }),
    pc(-380, 470, 600, 260, A.plane(), { k: .9, sway: .2 }),
    pc(560, 520, 86, 150, A.cactus(150), { sway: .3 }),
    pc(-170, 650, 120, 226, A.aviator({ armR: -35, mouth: 'o' }), { k: 1.12, nosplit: true }),
    prince(270, 660, { armR: -40 }, { dyn: tl => ({ sc: pop(tl, APPEAR), op: tl > APPEAR ? 1 : 0 }) }),
    pc(100, 708, 90, 70, A.sheep(), { k: 1.1, nosplit: true, sh: false, dyn: tl => ({ lift: 56 * sm((tl - SHEEP) / .5), op: tl > SHEEP ? 1 : 0 }) }),
    pc(98, 712, 136, 90, A.box(), { k: 1.1, nosplit: true, dyn: tl => ({ sc: pop(tl, BOX), op: tl > BOX ? 1 : 0 }) }),
    glint(220, 650, 130, 0), glint(340, 640, 220, 2), glint(270, 660, 60, 4),
    pc(-600, 620, 86, 110, A.cactus(110), { k: .8, sway: .3 }),
    pc(-500, 830, 320, 80, A.dune(320, 80, '#efc98c', '#e2ad6a', 5), { sh: false }),
    pc(500, 850, 320, 70, A.dune(320, 70, '#efc98c', '#e2ad6a', 9), { sh: false }),
  ],
});

// ── 2. 見せ場: 小さな星 B612 とバラ ─────────────────
// 星の丸い地面は背の上の1枚(一番奥のパネルなので端ほど手前へ出る)。上に乗せる物は、その X での「縁の高さ」と「根元のずれ」を計算して置く
const PY = 330, PW = 1000, PH = 360, RIM = x => (PH - 18) * Math.sqrt(Math.max(0, 1 - (x / (PW / 2)) ** 2));
const onRim = (X, dy = 22) => ({ Y: PY + Math.abs(X) * Math.tan(12 * PI / 180) + dy, lift: RIM(X) - 6 });
const BLOOM = 1.0, DOME = 2.3, SUN0 = 3.4, SUNP = 2.1;
const sunPh = tl => { const k = (tl - SUN0) / SUNP; return k < 0 ? -1 : k >= 3 ? 1 : k % 1; };      // 0→1 を3回(沈む)
const sunIdx = tl => cl(Math.floor((tl - SUN0) / SUNP), -1, 2);
const sunLift = tl => { const p = sunPh(tl); if (p < 0) return 560; return p < .18 ? 150 + 410 * sm(p / .18) : 560 - 410 * sm((p - .18) / .72); };
const chairDx = tl => 46 * (sm((tl - SUN0) / .35) + sm((tl - SUN0 - SUNP) / .35) + sm((tl - SUN0 - 2 * SUNP) / .35));
const rimPiece = (X, w, h, art, opt = {}, dy = 12) => { const r = onRim(X, dy); return pc(X, r.Y, w, h, art, Object.assign({ lift: r.lift, sh: false, nosplit: true }, opt)); };
const walker = (X0, w, h, art, opt = {}, dy = 12) => { const r0 = onRim(X0, dy);
  return pc(X0, r0.Y, w, h, art, Object.assign({ sh: false, nosplit: true,
    dyn: tl => { const dx = chairDx(tl), r = onRim(X0 + dx, dy); return { dx, lift: r.lift, dy: r.Y - r0.Y }; } }, opt)); };
const r2 = onRim(190, 24);
spreads.push({
  hold: 10.2,
  scene: ppAtmosphere.nebula,
  music: [[0, 'airy'], [SUN0 - .3, 'none'], [SUN0 + 3 * SUNP - .2, 'gentle']],
  ground: A.gSpace(5),
  caption: ['Sur sa toute petite planète, il y avait une rose.', [SUN0, 'Il aimait tant regarder le coucher du soleil.']],
  sfx: [[BLOOM, 'magic'], [DOME, 'chime'], [DOME + .9, 'bell', { vol: .3 }],
    ...[0, 1, 2].flatMap(i => [[SUN0 + i * SUNP, 'creak', { len: .35 }], [SUN0 + i * SUNP + .5, 'sparkle', { len: 1.4, vol: .25 }]])],
  grade: tl => { const p = sunPh(tl); return p < 0 || p >= 1 && tl > SUN0 + 3 * SUNP ? ['#6a4fa8', .18] : ['#e4744a', .55 * sin(cl((p - .25) / .7) * PI)]; },
  cam: { start: { d: 480, tilt: 58, cz: 300, yaw: -6 }, keys: [[DOME + .6, { d: 400, tilt: 56, cz: 330, cx: 120, yaw: -2 }], [SUN0 + SUNP, { d: 470, tilt: 58, cz: 320, cx: -20, yaw: 4 }]],
    end: { d: 450, tilt: 58, cz: 310, yaw: 6 } },
  pieces: [
    // 太陽: 星の後ろに沈む
    pc(-60, 250, 220, 220, A.sunDisc(220, '#ffb35a', '#fff0b8'), { flt: false, glow: 26, sh: false, sway: 0, nosplit: true, side: 'L',
      dyn: tl => ({ lift: sunLift(tl), dx: -120 + 60 * cl(sunPh(tl), 0, 1) }) }),
    pc(0, PY, PW, PH, A.planetCap(PW, PH), { sh: false }),
    rimPiece(-330, 130, 80, A.volcano(true), { k: 1.1 }, 36),
    rimPiece(-215, 130, 80, A.volcano(false), { k: .85 }),
    rimPiece(400, 130, 80, A.volcano(false), { k: .9 }),
    ...[0, 1, 2].map(i => smoke(-330, onRim(-330).Y - 2, onRim(-330).lift + 70, i)),
    rimPiece(300, 50, 50, A.sprout(), { k: 1.2 }),
    rimPiece(-440, 50, 50, A.sprout(), { k: 1.1 }),
    walker(-150, 80, 100, A.chair(), { k: 1.05 }, 18),
    walker(-60, 120, 226, A.prince({ look: 'up', armR: -20 }), { k: 1.0, anim: aScarf }, 26),
    // バラとガラスの覆い
    pc(190, r2.Y, 100, 160, A.rose(), { k: 1.05, lift: r2.lift, sh: false, nosplit: true,
      dyn: tl => ({ sc: .4 + .6 * sm((tl + .3) / .8), op: sm((tl + .5) / .4) }),
      anim: (tl, el, q) => { const s = .35 + .65 * sm((tl - BLOOM) / 1.1); qs(el, q, '.bloom').setAttribute('transform', `translate(50 46) scale(${F(s)}) translate(-50 -46)`); } }),
    pc(190, r2.Y + 6, 140, 190, A.dome(), { k: 1.0, sh: false, nosplit: true, flt: false, sway: 0,
      dyn: tl => { const u = sm((tl - DOME) / .9); return { lift: r2.lift + 360 * (1 - u), op: tl > DOME - .2 ? 1 : 0 }; } }),
    // 浮かぶ星
    glint(-560, 300, 420, 0, 16), glint(560, 280, 470, 2, 18), glint(-420, 240, 560, 4), glint(460, 220, 600, 1),
    glint(0, 180, 640, 3, 12), glint(-200, 600, 120, 5), glint(240, 640, 90, 1.5),
  ],
});

// ── 3. 星めぐり ───────────────────────────────────
const KING = .7, LAMP = 1.9, BIZ = 3.1, LIGHTS = [4.3, 5.3, 6.3, 7.3];
const lampOn = tl => { let on = tl > LAMP; for (const t of LIGHTS) if (tl > t) on = !on; return on; };
const flock = () => `${[[30, 20], [100, 0], [160, 30], [70, 50]].map(([x, y]) => `<path d="M${x + 15} ${y + 22}L80 200" stroke="#e9e1c6" stroke-width="2.4"/>`).join('')}
  ${[[30, 20], [100, 0], [160, 30], [70, 50]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(.6)">${A.bird('#f4efe2')}</g>`).join('')}`;
const floater = (X, Y, lift, t0, art, ph, opt = {}) => pc(X, Y, 300, 460, art, Object.assign({ k: .95, sh: false, nosplit: true, sway: .4,
  dyn: tl => ({ sc: pop(tl, t0), op: tl > t0 ? 1 : 0, lift: lift + 18 * sin(tl * 1.1 + ph) }) }, opt));
spreads.push({
  hold: 8.4,
  scene: ppAtmosphere.deep,
  music: 'bright',
  ground: A.gSpace(9, '#1f2f5a', '#2c3f74'),
  caption: ['Il visita d’autres petites planètes.', [BIZ + .4, 'Les grandes personnes sont bien étranges...']],
  sfx: [[KING, 'pop'], [LAMP, 'pop'], [BIZ, 'pop'], ...LIGHTS.map(t => [t, 'tick']), [LAMP + .05, 'bell', { vol: .25 }]],
  cam: { start: { d: 520, tilt: 56, cz: 260, yaw: -4 }, end: { d: 430, tilt: 56, cz: 250, cx: 60, yaw: 3 } },
  pieces: [
    floater(-430, 400, 120, KING, A.miniPlanet('#b8869a', '#a07084', `<g transform="translate(90 6)">${A.king({ armR: -60 })}</g>`), 0),
    floater(80, 300, 230, LAMP, A.miniPlanet('#8aa0c8', '#7088b4', `<g transform="translate(40 6)">${A.lamplighter({ armR: -110 })}</g><g transform="translate(170 -8)">${A.lamp()}</g>`), 2,
      { side: 'R', anim: (tl, el, q) => qs(el, q, '.lmp').setAttribute('opacity', lampOn(tl) ? 1 : .05) }),
    floater(480, 430, 90, BIZ, A.miniPlanet('#c9b27a', '#b39a62', `<g transform="translate(40 6)">${A.businessman({ armR: -40 })}</g><g transform="translate(150 140)">${A.desk()}</g>`), 4),
    // 渡り鳥に引かれて飛ぶ王子さま
    pc(-180, 680, 120, 226, A.prince({ armL: 160, armR: -160, look: 'up' }), { k: .95, nosplit: true, sh: false, anim: aScarf,
      dyn: tl => ({ lift: 150 + 20 * sin(tl * 1.4), dx: 30 * sin(tl * .5), op: sm((tl + .5) / .6) }) }),
    pc(-180, 676, 220, 220, flock(), { k: .9, nosplit: true, sh: false, flt: false, sway: 0,
      dyn: tl => ({ lift: 150 + 205 + 20 * sin(tl * 1.4), dx: 30 * sin(tl * .5) - 40, op: sm((tl + .5) / .6) }), anim: aFlap(9) }),
    glint(-600, 300, 420, 1, 16), glint(-260, 200, 560, 3), glint(300, 180, 580, 0, 16), glint(620, 300, 380, 2),
    glint(-40, 700, 90, 4), glint(330, 760, 140, 5), glint(620, 720, 200, 1.2),
  ],
});

// ── 4. 地球、キツネ ───────────────────────────────
const FOX = 1.5, TAME = 4.4;
spreads.push({
  hold: 8.2,
  scene: ppAtmosphere.field,
  music: 'gentle',
  ground: A.gWheat(),
  caption: ['— Apprivoise-moi ! dit le renard.', [TAME, 'On ne voit bien qu’avec le cœur.']],
  sfx: [[.2, 'wind', { len: 3 }], [FOX, 'pop'], [TAME, 'chime'], [TAME + .2, 'sparkle', { len: 1.6 }]],
  cam: { start: { d: 360, yaw: -3, cz: 150 }, end: { d: 270, cx: 60, yaw: 2, cz: 140 } },
  pieces: [
    pc(0, 110, 1400, 220, A.hills(1400, 220, '#d9b867', '#cfa955', 4, 1.0), { sh: false }),
    pc(0, 240, 1420, 170, A.hills(1420, 170, '#c99a48', '#bf8f3e', 9, .8), { sh: false }),
    pc(520, 400, 300, 430, A.tree(300, 430, { fruit: '#e2574c' }), { sway: 1.2 }),
    pc(-470, 450, 320, 150, A.roseBush(), { sway: .4 }),
    pc(-250, 500, 320, 150, A.roseBush(), { k: .8, sway: .4 }),
    prince(-110, 670, { armR: -50 }, { anim: many(aScarf, aArm('.aR', tl => -50 - 30 * sm((tl - TAME) / .6))) }),
    pc(250, 640, 240, 170, A.fox(true), { k: 1, nosplit: true,
      dyn: tl => ({ lift: -175 * (1 - sm((tl - FOX) / 1.1)), op: tl > FOX - .05 ? 1 : 0 }),
      anim: (tl, el, q) => rot(qs(el, q, '.tail'), 12 * sin(tl * 5), 188, 104) }),
    pc(300, 720, 300, 130, A.wheat(300, 130, 3), { sway: 1.4 }),
    ...[[-70, 0], [80, 1], [10, 2]].map(([x, i]) => pc(x, 640, 40, 40, `<path d="M20 36C8 26 2 18 2 12C2 4 12 0 20 10C28 0 38 4 38 12C38 18 32 26 20 36Z" fill="#e8697a"/>`, {
      nosplit: true, sh: false, flt: false, sway: 0,
      dyn: tl => { const u = cl((tl - TAME - i * .3) / 2); return { lift: 200 + u * 160, op: sin(u * PI), sc: .6 + .5 * u }; } })),
    pc(-560, 800, 240, 130, A.wheat(240, 130, 5), { sway: 1.4 }),
    pc(580, 830, 220, 110, A.wheat(220, 110, 8), { sway: 1.4 }),
    fly(-300, 760, '#f6e2a0', 0), fly(420, 560, '#ffffff', 2),
  ],
});

// ── 5. 井戸 ───────────────────────────────────────
const PULL = 1.2, DRINK = 4.2;
spreads.push({
  hold: 8.2,
  scene: ppAtmosphere.dawn,
  music: 'night',
  ground: A.gSand(7, '#8a7896', '#7a6888', '#9a88a6'),
  grade: tl => ['#4b4f9e', .38 - .14 * sm(tl / 8)],
  caption: ['Ensemble, ils trouvèrent un puits.', [DRINK, 'Le désert est beau, car il cache un puits.']],
  sfx: [[PULL, 'creak', { len: 1.4 }], [PULL + 1.5, 'creak', { len: 1 }], [DRINK - .2, 'splash'], [DRINK, 'sparkle', { len: 2 }]],
  cam: { start: { d: 520, tilt: 56, cz: 220, yaw: -8 }, end: { d: 400, tilt: 56, cz: 200, yaw: 6 } },
  pieces: [
    pc(0, 110, 1400, 200, A.dune(1400, 200, '#6e5f8c', '#62547e', 4), { sh: false }),
    pc(-520, 140, 160, 160, A.moon(160), { lift: 400, sh: false, nosplit: true, glow: 18, sway: 0 }),
    ...terrace({ X: 0, Y: 590, tiers: [
      { w: 300, h: 110, d: 60, top: '#4a6aa6', art: A.wellFront },
      { w: 300, h: 140, d: 70, top: false, art: A.wellBack },
      { w: 300, h: 340, top: false, art: A.wellFrame },
    ] }),
    pc(30, 545, 60, 300, A.bucket(), { k: 1, nosplit: true, side: 'R', sh: false, sway: 0,
      dyn: tl => ({ lift: -120 + 175 * sm((tl - PULL) / 2.6) }) }),
    pc(-290, 660, 120, 226, A.aviator({ armR: -100, mouth: 'smile' }), { k: 1.1, nosplit: true,
      anim: aArm('.aR', tl => -100 + 25 * sin(cl((tl - PULL) / 2.6) * PI * 4)) }),
    prince(280, 670, { armR: -70, look: 'up' }, { anim: many(aScarf, aArm('.aR', tl => -70 - 50 * sm((tl - DRINK) / .6))) }),
    glint(30, 560, 190, 0, 10, '#bfe8ff'), glint(60, 560, 220, 2, 8, '#bfe8ff'),
    glint(-560, 300, 520, 1, 14), glint(560, 260, 500, 3, 16), glint(300, 200, 600, 5), glint(-200, 180, 620, 2.4),
    pc(-540, 830, 280, 80, A.dune(280, 80, '#7a6a94', '#6a5a84', 2), { sh: false }),
    pc(540, 840, 300, 70, A.dune(300, 70, '#7a6a94', '#6a5a84', 6), { sh: false }),
  ],
});

// ── 6. 別れの夜空 ─────────────────────────────────
const BITE = 1.8, FALL = 2.6, LAUGH = 5.0;
const fallU = tl => Math.pow(cl((tl - FALL) / 1.8), 1.6);
const laughStar = r => `<path d="M${r} 2L${r * 1.28} ${r * .72}L${r * 2 - 2} ${r}L${r * 1.28} ${r * 1.28}L${r} ${r * 2 - 2}L${r * .72} ${r * 1.28}L2 ${r}L${r * .72} ${r * .72}Z" fill="#ffe27a"/>
  <circle cx="${r}" cy="${r}" r="${r * .42}" fill="#fff0b0"/><circle cx="${r * .86}" cy="${r * .92}" r="${r * .06}" fill="#8a5a2a"/><circle cx="${r * 1.14}" cy="${r * .92}" r="${r * .06}" fill="#8a5a2a"/>
  <path d="M${r * .82} ${r * 1.08}Q${r} ${r * 1.3} ${r * 1.18} ${r * 1.08}" stroke="#8a5a2a" stroke-width="${F(r * .07)}" fill="none" stroke-linecap="round"/>`;
const bigStar = (X, Y, lift, i, r = 30) => pc(X, Y, r * 2, r * 2, laughStar(r), { lift, sh: false, flt: false, sway: 0, nosplit: true, glow: 22, glowC: '#ffe27a',
  dyn: tl => { const u = sm((tl - LAUGH - i * .12) / .5); return { op: .25 + .75 * u, sc: .55 + .45 * u + .18 * u * sin(tl * 4 + i), rz: 10 * u * sin(tl * 2.5 + i) }; } });
const tinyB612 = `<circle cx="80" cy="96" r="60" fill="#c79a6a"/><path d="M24 80Q80 100 136 80A60 60 0 0 1 140 96Q80 120 20 96A60 60 0 0 1 24 80Z" fill="#b88a5c"/>
  <g transform="translate(62 2) scale(.4)">${A.rose()}</g><circle cx="82" cy="30" r="18" fill="#ffd9a0" opacity=".35"/>`;
spreads.push({
  hold: 9.4,
  scene: ppAtmosphere.night,
  music: [[0, 'sad'], [LAUGH, 'night']],
  ground: A.gSand(11, '#4a4570', '#403a64', '#55507c'),
  grade: tl => ['#3d52a8', .4 - .12 * sm((tl - LAUGH) / 1)],
  caption: ['— La nuit, tu regarderas les étoiles...', [LAUGH, '... et toutes les étoiles riront pour toi.']],
  sfx: [[BITE, 'tick'], [FALL, 'bell', { vol: .35 }], [LAUGH, 'sparkle', { len: 3.2 }], [LAUGH + .3, 'chime']],
  cam: { start: { d: 320, tilt: 54, cz: 170, cx: 110 }, keys: [[LAUGH - .4, { d: 290, tilt: 54, cz: 170, cx: 130 }]],
    end: { d: 470, tilt: 57, cz: 270, yaw: -4 } },
  pieces: [
    pc(0, 120, 1400, 200, A.dune(1400, 200, '#5d5890', '#524c84', 12), { sh: false }),
    pc(0, 300, 1420, 160, A.dune(1420, 160, '#48437a', '#3f3a70', 3), { sh: false }),
    pc(-380, 180, 160, 160, tinyB612, { lift: 420, sh: false, nosplit: true, glow: 16, glowC: '#ffd9a0', sway: 0,
      dyn: tl => ({ op: .5 + .5 * sm((tl - LAUGH) / .8), lift: 420 + 10 * sin(tl * .9) }) }),
    prince(160, 640, { look: 'up', mouth: 'flat', armR: -10 }, { k: 1.1,
      dyn: tl => ({ rz: 80 * fallU(tl), op: 1 - sm((tl - FALL - 1.6) / .9) }) }),
    pc(280, 690, 150, 60, A.snake(), { nosplit: true, sh: false,
      anim: (tl, el, q) => rot(qs(el, q, '.hd'), -30 * sin(cl((tl - BITE + .6) / 1.2) * PI), 118, 50),
      dyn: tl => ({ op: 1 - sm((tl - FALL - 1.8) / .8) }) }),
    ...[[-560, 260, 330], [-300, 200, 400], [-120, 260, 300], [120, 200, 420], [360, 240, 360], [600, 280, 300],
      [-460, 420, 200], [480, 420, 220], [-640, 520, 140], [640, 540, 150], [-250, 560, 120], [260, 580, 110]].map(([x, y, z], i) => bigStar(x, y, z, i, i % 3 ? 38 : 50)),
    pc(-520, 820, 300, 90, A.dune(300, 90, '#3e3a68', '#36325e', 7), { sh: false }),
    pc(520, 840, 300, 80, A.dune(300, 80, '#3e3a68', '#36325e', 2), { sh: false }),
  ],
});

Tobidas.book({
  title: 'Le Petit Prince',
  lang: 'fr',
  theme: { board: '#1f2a5c', spine: '#141c44', style: 'vintage', font: LATIN,
    desk: { base: 'night', scene: ppAtmosphere.cover } },
  cover: A.cover(),
  end: { title: 'Fin', sub: 'Le Petit Prince' },
  sound: { set: ppScore },
  spreads,
});
