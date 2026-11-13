// Momotaro — 作品定義。書き方は tobidas/references/book-api.md。
// 座標: X∈[-720,720](0=本の背)、Y∈[0,920](大きいほど手前)。tl = 見開きが開ききってからの秒数。
// 決まり: パーツは片ページに収めるか、背の上で折る。動く物は nosplit(背を越えたいまいる側のページに自動で付け替わる)。

const SC = [];

// ---- 小物ヘルパ ----
const fallingPetal = (X, Y, ph, c = '#f9c3cf') => pc(X, Y, 26, 26, A.petalArt(c), { k: .9, sh: false, flt: false, sway: 0, nosplit: true, delay: .3, dyn: tl => { const u = (((tl * .14 + ph) % 1) + 1) % 1; return { dy: -u * 620, dx: 46 * sin(u * 8 + ph * 13), lift: 30 + u * 480, rz: u * 300 + ph * 40, op: sin(u * PI) }; } });
const dangoToss = (t0, targetX) => pc(-210, 640, 100, 48, A.dango(), { k: .8, sh: false, sway: 0, nosplit: true, side: 'L', delay: .2, glow: 10, dyn: tl => { const u = (tl - t0) / .9; if (u <= 0 || u >= 1) return { op: 0 }; return { dx: (targetX + 210) * u, lift: 120 + 210 * sin(u * PI), rz: u * 220, op: 1 }; } });
const puffAt = (t0, X, Y, lift) => pc(X, Y, 200, 140, A.puff(200, 140, 3), { sh: false, flt: false, sway: 0, nosplit: true, delay: .2, dyn: tl => { const v = tl - t0; if (v < 0 || v > 1.3) return { op: 0 }; return { sc: .7 + v * 1.9, lift, op: 1 - v / 1.3 }; } });

// ============ 1. 川上から桃が ============
SC[1] = {
  hold: 7.6,
  ground: A.gRiver(),
  scene: momoAtmosphere.river,
  pieces: [
    pc(0, 70, 1440, 240, A.hills(1440, 240, '#9fc7b2', '#7fb392', 3, 1.3), { sh: false, sway: 0 }),
    pc(250, 90, 300, 120, A.cloud(300, 120, 2), { lift: 430, sh: false, dyn: tl => ({ dx: 36 * sin(tl * .3) }) }),
    pc(-300, 130, 240, 100, A.cloud(240, 100, 5), { lift: 380, sh: false, dyn: tl => ({ dx: -30 * sin(tl * .26) }) }),
    pc(-560, 470, 300, 420, A.willowPage(), { k: 1.05, sway: 1 }),
    pc(540, 440, 300, 420, A.willowPage(), { k: .8, sway: 1.1 }),
    pc(-480, 690, 200, 95, A.tub(), { k: .95 }),
    pc(-330, 645, 120, 226, A.granny({ armR: 40, armL: -26, mouth: 'smile' }), { k: .92, anim: aArm('.aR', tl => 40 + 15 * sin(tl * 3.4)) }),
    // 川を流れてくる大玉の桃(岸へゆっくり寄せ、ぴこぴこ揺れる)
    pc(340, 540, 300, 280, A.peach(300, 280), { k: 1.02, nosplit: true, side: 'R', sh: false, sway: 0, glow: 14,
      dyn: tl => ({ dx: -300 * sm((tl - .6) / 4.2), lift: 150 + 15 * sin(tl * 2.4), rz: 5 * sin(tl * 1.8) }) }),
    twinkle(470, 560, 300, 0, 15), twinkle(300, 620, 250, 2, 11),
    bird(-420, 300, 470, 30, 0, '#4a5f7a'),
    fallingPetal(140, 500, .2), fallingPetal(520, 460, .55), fallingPetal(-240, 520, .8),
    pc(-140, 850, 240, 80, A.grass(240, 80, '#5fae4a', '#86c95f'), {}),
    pc(560, 820, 220, 90, A.grass(220, 90, '#5fae4a', '#86c95f'), {}),
  ],
  music: [[0, 'gentle']],
  sfx: [[1.4, 'splash'], [4.9, 'sparkle', { len: 1.2 }]],
  caption: ['Long ago, an old woman washed clothes by the river.', [1.1, 'Look — a huge peach is coming!']],
};

// ============ 2. 桃から赤ちゃん ============
const CRACK = 1.1, BOY = 5.6;
SC[2] = {
  hold: 7.8,
  ground: A.gMeadow({ seed: 9 }),
  scene: momoAtmosphere.village,
  pieces: [
    pc(-420, 430, 420, 380, A.cottage(), { k: 1.1, anim: aSmoke }),
    pc(470, 420, 320, 340, A.peachTree(), { k: 1.05, sway: .8 }),
    pc(-560, 700, 220, 110, A.bush(220, 110), {}),
    // ぱっくり割れる桃 → 割れ目の中から赤ちゃん
    pc(240, 620, 320, 300, A.peach(320, 300), { k: 1, glow: 12, sway: 0,
      dyn: tl => ({ op: 1 - sm((tl - CRACK - .1) / .3), rz: tl < CRACK ? 3 * sin(tl * 7) : 0 }) }),
    pc(240, 640, 240, 150, A.peachHalf(240, 150), { k: 1.15, sway: 0, sh: false,
      dyn: tl => ({ op: sm((tl - CRACK) / .25) }) }),
    pc(240, 640, 170, 130, A.baby(), { k: 1.05, nosplit: true, sh: false, sway: 0, glow: 12,
      dyn: tl => ({ lift: 66, sc: pop(tl, CRACK + .45), op: sm((tl - CRACK - .3) / .3) }) }),
    pc(75, 690, 120, 226, A.gramps({ armR: -20, armL: 20, mouth: 'big' }), { k: .95,
      anim: many(aArm('.aR', tl => tl < CRACK ? -20 : -150 + 9 * sin(tl * 4)), aArm('.aL', tl => tl < CRACK ? 20 : 150 - 9 * sin(tl * 4 + 1), 40)) }),
    pc(395, 655, 120, 226, A.granny({ armR: 10, mouth: 'big' }), { k: .95,
      anim: aArm('.aR', tl => tl < CRACK ? 10 : -145 + 9 * sin(tl * 4 + 2)) }),
    // すくすく育って、幡をかついだ少年の Momotaro
    pc(140, 790, 120, 226, A.momo(Object.assign({}, A.momoFlag, { armR: -100, mouth: 'big' })), { k: .8, nosplit: true, sh: false, delay: .2,
      anim: aFlag, dyn: tl => ({ sc: pop(tl, BOY), lift: 26 * abs(sin(tl * 3.2)) * sm(tl - BOY), op: tl < BOY ? 0 : 1 }) }),
    fly(330, 560, '#ff9ecb', 1),
    pc(-300, 860, 220, 80, A.grass(220, 80, '#5fae4a', '#86c95f'), {}),
    pc(560, 840, 200, 70, A.grass(200, 70, '#5fae4a', '#86c95f'), {}),
  ],
  music: [[0, 'bright']],
  sfx: [[CRACK, 'magic', { len: .9 }], [CRACK + .5, 'pop'], [BOY, 'pop'], [BOY + .8, 'chime']],
  caption: [[.5, 'The peach went CRACK! A baby was inside.'], [BOY - .4, 'They named him Momotaro — the Peach Boy.']],
};

// ============ 3. きびだんごで家来ぞろい ============
const D1 = 1.8, D2 = 3.0, D3 = 4.2, WALK = 5.4;
SC[3] = {
  hold: 7.8,
  ground: A.gMeadow({ seed: 3 }),
  scene: momoAtmosphere.road,
  pieces: [
    pc(0, 55, 1440, 210, A.hills(1440, 210, '#a8cfc4', '#8fc0c8', 4, 1.2), { sh: false, sway: 0 }),
    pc(0, 160, 1440, 80, A.waves(1440, 80, '#6fa8d8', '#a6dcf2', 3), { sh: false, sway: 0 }),
    pc(-360, 420, 760, 230, A.village(760, 230), { k: .8, sh: false }),
    pc(-560, 560, 150, 200, A.sign(), { k: .9 }),
    pc(-320, 660, 120, 226, A.momo(Object.assign({}, A.momoFlag, { armR: -100 })), { k: .85, nosplit: true, side: 'L', delay: .15,
      anim: many(aFlag, aArm('.aR', () => -100, 80)),
      dyn: tl => ({ dx: 150 * sm((tl - WALK) / 2), lift: 9 * abs(sin(tl * 6.5)) * sm(tl - WALK + .2) }) }),
    dangoToss(D1, 110), dangoToss(D2, 320), dangoToss(D3, 520),
    pc(60, 700, 260, 190, A.dog(), { k: .95, nosplit: true, delay: .1, anim: aDog(5),
      dyn: tl => ({ sc: pop(tl, D1 + .75), lift: tl > D1 + 1 && tl < D3 ? 12 * abs(sin(tl * 5)) : 0 }) }),
    pc(270, 690, 220, 210, A.monkey(), { k: .85, nosplit: true, delay: .1, anim: aMonkey(),
      dyn: tl => ({ sc: pop(tl, D2 + .75) }) }),
    pc(490, 700, 230, 220, A.pheasant(), { k: .8, nosplit: true, delay: .1, anim: aFlap(6, 24),
      dyn: tl => ({ sc: pop(tl, D3 + .75), lift: tl > D3 + 1 ? 7 * abs(sin(tl * 4)) : 0 }) }),
    pc(-180, 860, 240, 80, A.grass(240, 80, '#5fae4a', '#86c95f'), {}),
    pc(560, 850, 200, 80, A.grass(200, 80, '#5fae4a', '#86c95f'), {}),
    pc(-640, 720, 130, 90, A.bush(130, 90), {}),
    fly(380, 620, '#ffd24d', 2.4),
  ],
  music: [[0, 'airy']],
  sfx: [[D1 + .85, 'pop'], [D2 + .85, 'pop'], [D3 + .85, 'pop'], [D3 + 1.7, 'bell']],
  caption: ['He gave his dumplings to a dog, a monkey, and a pheasant.', "'Let's go, Momotaro!' they all cried."],
};

// ============ 4. 海を渡る ============
const R0 = 2.6, R1 = 6.0;
const rockShip = tl => ({ lift: 14 + 8 * sin(tl * 1.9 + .8), rz: 2.6 * sin(tl * 1.5) });
SC[4] = {
  hold: 8.4,
  ground: A.gSea(),
  scene: momoAtmosphere.sea,
  grade: tl => ['#5a4a8a', .2],
  pieces: [
    pc(0, 120, 1420, 90, A.waves(1420, 90, '#35589a', '#4a76bc', 5), { sh: false, sway: 0, fold: 12 }),
    // 水平線からせり上がる鬼ヶ島
    pc(400, 430, 720, 470, A.islandOni(), { k: .85, nosplit: true, side: 'R', sh: false, sway: 0, glow: 18, anim: aFlag,
      dyn: tl => { const u = sm((tl - R0) / (R1 - R0)); return { sink: (1 - u) * 560, op: u > 0 ? 1 : 0 }; } }),
    twinkle(560, 300, 260, 1, 12, '#ff8a50'), twinkle(420, 240, 300, 2.4, 10, '#ff8a50'),
    pc(0, 560, 1420, 110, A.waves(1420, 110, '#3f68b0', '#5f8ac4', 8), { sh: false, sway: 0, fold: 12 }),
    pc(-120, 660, 700, 470, A.ship(), { k: .8, nosplit: true, side: 'L', sh: false, sway: 0, dyn: rockShip }),
    pc(-160, 660, 120, 226, A.momo(Object.assign({}, A.momoFlag, { armR: -130, mouth: 'big' })), { k: .5, nosplit: true, side: 'L', sh: false, delay: .1, anim: aFlag,
      dyn: tl => { const r = rockShip(tl); return { lift: r.lift + 136, rz: r.rz }; } }),
    pc(-285, 660, 260, 190, A.dog({ flip: true }), { k: .42, nosplit: true, side: 'L', sh: false, delay: .15, anim: aDog(4),
      dyn: tl => { const r = rockShip(tl); return { lift: r.lift + 136, rz: r.rz }; } }),
    pc(20, 660, 220, 210, A.monkey(), { k: .36, nosplit: true, side: 'L', sh: false, delay: .2, anim: aMonkey(3),
      dyn: tl => { const r = rockShip(tl); return { lift: r.lift + 136, rz: r.rz }; } }),
    bird(-430, 300, 470, 34, .5, '#f4f1ea'), bird(-380, 250, 540, 28, 2, '#f4f1ea'),
    pc(0, 840, 1420, 120, A.waves(1420, 120, '#4fa8d8', '#eaf6ff', 2), { sh: false, sway: 0, fold: 12 }),
  ],
  cam: {
    start: { d: 420, cx: -50 },
    keys: [[R0, { d: 560, tilt: 54, cz: 200, cx: 30 }], [R1, { d: 640, tilt: 58, cz: 240, cx: 90 }]],
    end: { d: 610, tilt: 56, cz: 230, cx: 80 },
  },
  music: [[0, 'airy'], [R0 - .2, 'none'], [R1 + .3, 'night']],
  sfx: [[.9, 'whoosh', { len: 1.3 }], [R0, 'rise', { len: R1 - R0 }], [R1 + .35, 'thud']],
  caption: ['Over the waves they sailed to Oni Island.', [R1 + .5, 'A dark island rose out of the sea.']],
};

// ============ 5. 鬼ヶ島の戦い(見せ場) ============
const C0 = .8, C1 = 2.5, LEAP = 3.5, IMPACT = 4.3, THROW = 4.9, DROP = 5.7, SURR = 6.2, TRES = 6.9;
const riseCastle = tl => { const u = sm((tl - C0) / (C1 - C0)); return { sink: (1 - u) * 700, op: u > 0 ? 1 : 0 }; };
const followIn = (t0, dist, hop = 1) => tl => {
  const u = sm((tl - t0) / 1.1);
  return { dx: dist * u, lift: u > 0 && u < 1 ? 46 * abs(sin(u * PI * 2)) * hop : 3 * abs(sin(tl * 5)) };
};
SC[5] = {
  hold: 9.8,
  ground: A.gCourt(),
  scene: momoAtmosphere.oni,
  grade: tl => ['#31407f', .4 + .1 * (tl > SURR ? -1 : 0)],
  pieces: [
    // 鬼の城:terrace 段々構造物ごと、地面から sink でせり上げる
    ...A.oniCastle(riseCastle),
    // 鬼(怒 → 降参で差し替え)
    pc(330, 640, 400, 480, A.oniMad(), { k: 1, nosplit: true, side: 'R', sway: 0, delay: LEAP - 3.2,
      dyn: tl => ({ op: tl > SURR ? 0 : 1, rz: tl > IMPACT ? 5 * Math.exp(-2.4 * (tl - IMPACT)) * sin((tl - IMPACT) * 16) : 2 * sin(tl * 3) }) }),
    pc(331, 640, 400, 480, A.oniGive(), { k: 1, nosplit: true, side: 'R', sway: 0,
      dyn: tl => ({ op: sm((tl - SURR) / .3), rz: tl > SURR ? 2 * sin(tl * 2.2) : 0 }) }),
  pc(497, 640, 250, 80, A.kanabo(), { k: .85, nosplit: true, side: 'R', sh: false, delay: .2, sway: 0,
    dyn: tl => {
      if (tl < THROW) return { lift: 300 + 9 * sin(tl * 6), rz: -26 + 22 * sin(tl * 3.5), dx: 0 };
      const u = cl((tl - THROW) / .8);
      if (u < 1) return { dx: -390 * u, lift: 300 - 270 * u + 120 * sin(u * PI), rz: -26 - u * 300 };
      const v = cl((tl - DROP) / .7);
      return { dx: -390, lift: v < 1 ? 46 * abs(sin(v * PI)) : 0, rz: -330 + v * 60, op: 1 };
    } }),
  // Momotaro の飛びかかり
  pc(-280, 700, 120, 226, A.momo({ armR: -150, armL: 30, mouth: 'big' }), { k: .82, nosplit: true, side: 'L', delay: .15,
    anim: aArm('.aR', tl => tl < LEAP ? -20 : -150),
    dyn: tl => { const u = sm((tl - LEAP) / .9); return { dx: 470 * u, dy: -30 * u, lift: u > 0 && u < 1 ? 210 * sin(u * PI) : 0, rz: -24 * u + (tl > LEAP + .9 ? 8 * sin(tl * 6) : 0) }; } }),
  pc(-430, 720, 260, 190, A.dog(), { k: .8, nosplit: true, side: 'L', delay: .2, anim: aDog(6), dyn: followIn(LEAP + .25, 300) }),
  pc(-360, 710, 220, 210, A.monkey(), { k: .7, nosplit: true, side: 'L', delay: .25, anim: aMonkey(5), dyn: followIn(LEAP + .45, 280) }),
  pc(-250, 730, 230, 220, A.pheasant(), { k: .75, nosplit: true, side: 'L', delay: .3, anim: aFlap(9, 22),
    dyn: tl => { const u = sm((tl - LEAP - .35) / 1); return { dx: 500 * u, lift: 40 + (u > 0 && u < 1 ? 240 * sin(u * PI) : 10 * abs(sin(tl * 5))), rz: 10 * sin(tl * 6) }; } }),
  puffAt(IMPACT, 380, 620, 60), puffAt(IMPACT + .12, 210, 660, 40), puffAt(DROP, 120, 700, 30),
  // 降参ののち、宝
  pc(520, 700, 250, 190, A.chest(), { k: .95, nosplit: true, side: 'R', delay: .2, glow: 16, dyn: tl => ({ sc: pop(tl, TRES), op: tl < TRES ? 0 : 1 }) }),
  pc(630, 740, 220, 110, A.coins(220, 110), { k: .9, nosplit: true, side: 'R', delay: .25, dyn: tl => ({ sc: pop(tl, TRES + .2), op: tl < TRES + .2 ? 0 : 1 }) }),
  twinkle(470, 720, 120, 0, 14, '#ffe9a0'), twinkle(580, 690, 160, 1.3, 11, '#ffe9a0'), twinkle(660, 760, 130, 2.1, 13, '#ffe9a0'),
  pc(-560, 800, 220, 100, A.grass(220, 100, '#4a6a52', '#5f8266'), {}),
  pc(520, 850, 200, 90, A.grass(200, 90, '#4a6a52', '#5f8266'), {}),
  ],
};
SC[5].music = [[0, 'night'], [LEAP - .3, 'chase'], [THROW, 'none'], [SURR + .1, 'triumph']];
SC[5].sfx = [[C1, 'thud'], [LEAP, 'whoosh', { len: .7 }], [IMPACT, 'crash'], [THROW, 'fall'], [DROP, 'thud'], [TRES, 'sparkle', { len: 2, n: 14 }], [TRES + .4, 'fanfare']];
SC[5].shake = tl => { let x = 0; const k1 = tl - IMPACT, k2 = tl - DROP, k3 = tl - C1;
  if (k3 > 0) x += 13 * Math.exp(-3 * k3) * sin(k3 * 41);
  if (k1 > 0) x += 26 * Math.exp(-3.4 * k1) * sin(k1 * 47);
  if (k2 > 0) x += 14 * Math.exp(-3.4 * k2) * sin(k2 * 43);
  return [x, x * .45]; };
SC[5].cam = {
  start: { d: 460, cx: -30 },
  keys: [[C0, { d: 600, tilt: 56, cz: 230 }], [C1, { d: 840, tilt: 62, cy: 30, cz: 280, yaw: -6 }], [LEAP, { d: 760, tilt: 58, cy: 30, cz: 250, yaw: 3 }]],
  end: { d: 700, tilt: 56, cy: 30, cz: 240, yaw: 6 },
};
SC[5].caption = ["'Stop being mean!' Momotaro leaped at the ogre.", [SURR + .3, "'I surrender! Please take our treasure!'"]];

// ============ 6. 宝を持って帰ろう ============
const RB = 1.2, MEET = 3.2;
SC[6] = {
  hold: 8.6,
  ground: A.gMeadow({ seed: 6 }),
  scene: momoAtmosphere.dawn,
  pieces: [
    pc(0, 140, 1060, 500, A.rainbow(1060, 500), { sh: false, sway: 0,
      dyn: tl => ({ op: sm((tl - RB) / 1.6) * .95, sc: .82 + .18 * sm((tl - RB) / 1.6) }) }),
    pc(0, 90, 1440, 220, A.hills(1440, 220, '#d9c69a', '#c9b484', 2, 1.2), { sh: false, sway: 0 }),
    pc(-420, 400, 760, 230, A.village(760, 230), { k: .85, sh: false }),
    pc(-380, 540, 700, 470, A.ship(), { k: .55, nosplit: true, side: 'L', sh: false, sway: 0,
      dyn: tl => ({ lift: 8 + 5 * sin(tl * 1.8), rz: 1.6 * sin(tl * 1.4), op: 1 - sm((tl - MEET - 1) / .8) }) }),
    pc(-470, 540, 120, 226, A.momo(Object.assign({}, A.momoFlag, { armR: -140, mouth: 'big' })), { k: .34, nosplit: true, side: 'L', sh: false, delay: .1, anim: aFlag,
      dyn: tl => ({ lift: 8 + 5 * sin(tl * 1.8) + 86, op: 1 - sm((tl - MEET - 1) / .8) }) }),
    pc(-560, 700, 250, 190, A.chest(), { k: .6, nosplit: true, side: 'L', sh: false, delay: .15,
      dyn: tl => ({ lift: 6 + 4 * sin(tl * 1.8) + 90, op: 1 - sm((tl - MEET - 1) / .8) }) }),
    pc(150, 690, 120, 226, A.gramps({ armR: -20, mouth: 'big' }), { k: .95, anim: aArm('.aR', tl => tl < MEET ? -20 : -150 + 8 * sin(tl * 4)) }),
    pc(320, 660, 120, 226, A.granny({ armR: 10, mouth: 'big' }), { k: .92, anim: aArm('.aR', tl => tl < MEET ? 10 : -145 + 8 * sin(tl * 4 + 1)) }),
    // 再会:Momotaro が走ってぴょんと跳ねる
    pc(-60, 790, 120, 226, A.momo(Object.assign({}, A.momoFlag, { armR: -120, mouth: 'big' })), { k: .82, nosplit: true, sh: false, delay: .1,
      anim: aFlag, dyn: tl => ({ dx: 120 * sm((tl - MEET) / 1.6), lift: 30 * abs(sin(tl * 3.6)) * sm(tl - MEET - .4), op: 1 }) }),
    pc(-300, 740, 260, 190, A.dog(), { k: .9, nosplit: true, delay: .2, anim: aDog(6), dyn: followIn(MEET, 60) }),
    pc(60, 730, 220, 210, A.monkey(), { k: .8, nosplit: true, delay: .25, anim: aMonkey(5), dyn: followIn(MEET + .3, 60) }),
    pc(430, 750, 230, 220, A.pheasant(), { k: .8, nosplit: true, delay: .3, anim: aFlap(7, 22),
      dyn: tl => ({ lift: 10 * abs(sin(tl * 4.2)), rz: 6 * sin(tl * 5) }) }),
    pc(560, 470, 320, 340, A.peachTree(), { k: 1, sway: .8 }),
    fallingPetal(240, 560, .3), fallingPetal(430, 520, .65), fallingPetal(-200, 560, .95, '#ffd7a8'),
    pc(-150, 860, 220, 80, A.grass(220, 80, '#5fae4a', '#86c95f'), {}),
    pc(210, 870, 200, 70, A.grass(200, 70, '#5fae4a', '#86c95f'), {}),
  ],
  music: [[0, 'happy']],
  sfx: [[RB + .3, 'chime'], [MEET + .5, 'pop'], [MEET + 1.6, 'bell']],
  caption: ['Home they came with gold and gems.', 'And everyone lived happily ever after.'],
};

Tobidas.book({
  title: 'Momotaro — A Pop-Up Storybook',
  lang: 'en',
  theme: {
    board: '#1f3a5c', spine: '#152a45', style: 'kirigami',
    desk: { base: 'town', scene: momoAtmosphere.home },
  },
  cover: A.coverMomo(),
  end: { title: 'The End', sub: 'Momotaro' },
  sound: { set: momoScore },
  spreads: SC.slice(1),
});
