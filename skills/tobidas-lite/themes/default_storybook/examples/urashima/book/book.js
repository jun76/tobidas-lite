// 作品定義「Urashima Taro」。書き方は references/book-api.md。
// 座標: X∈[-720,720](0=本の背)、Y∈[0,920](大きいほど手前)。tl = 見開きが開ききってからの秒数。

const TK = 1.1, KK = .9;                           // 太郎と子どもの大きさ
const farHills = (seed, c = '#9cc7c0', c2 = '#86b8a8') => pc(0, 100, 1400, 230, A.hills(1400, 230, c, c2, seed, 1.0, hillTrees(8, seed + 1, 50, true)), { sh: false, sway: 0 });
const wave = (Y, seed, c = '#5fb0cf', c2 = '#8acbe0', h = 150) => put('water.wave', 0, Y, { art: { w: 1400, h, c, c2, seed }, sh: false, sway: 0 });
const gull = (X, Y, lift, v, ph) => bird(X, Y, lift, v, ph, '#f7f7f2');
const bubbles = (X, Y, n, seed, top = 520) => Array.from({ length: n }, (_, i) => {
  const r = rnd(seed + i), s = 22 + 16 * r(), ph = r(), dx = 40 * (r() - .5);
  return pc(X + 80 * (r() - .5), Y, s, s, A.bubble(s), { sh: false, flt: false, sway: 0, nosplit: true, delay: .3,
    dyn: tl => { const u = (((tl * .22 + ph) % 1) + 1) % 1; return { lift: 60 + u * top, dx: dx * u + 10 * sin(tl * 2 + i), op: sin(u * PI) * sm((tl + .5) / .6) }; } });
});

// ===== 1. 浜で子どもたちが亀をいじめている =====
const S1_WALK = 1.2;
const kidPoke = ph => aArm('.aR', tl => -120 + 50 * abs(sin(tl * 3 + ph)));
const spread1 = {
  hold: 8,
  music: 'gentle',
  sfx: [[S1_WALK, 'steps', { n: 5, gap: .5 }], [2.2, 'knock', { n: 3 }], [5.0, 'knock', { n: 2 }]],
  ground: A.gBeach({ seed: 4 }),
  caption: ['Long ago, a kind young fisherman named Taro lived by the sea.', 'One day, he saw children teasing a turtle on the beach.'],
  pieces: [
    farHills(3),
    put('cloud.puff', -260, 110, { dyn: tl => ({ dx: 36 * sin(tl * .3) }) }),
    put('cloud.puff', 380, 130, { k: .8, lift: 330, art: { seed: 5 }, dyn: tl => ({ dx: -30 * sin(tl * .25) }) }),
    put('house.thatch', -470, 420, { k: 1.0, sway: .3, art: {} }),
    put('conifer.pine', -190, 400, { k: .95, sway: 1.0, art: { c: '#3f7a4f' } }),
    put('conifer.pine', 560, 380, { k: .85, sway: 1.0, art: { c: '#4f8a55' } }),
    put('ship.row', 420, 520, { k: .9, art: { c: '#a8744a' } }),
    // 亀と子どもたち
    pc(210, 680, 320, 170, A.turtle(), { k: .9, anim: aTurtle(.6, 0, -14) }),
    pc(60, 660, 120, 226, A.kid({ armR: -120, top: '#e2574c', bottom: '#e2574c' }), { k: KK, anim: kidPoke(0) }),
    pc(390, 640, 120, 226, A.kid({ armR: -120, flip: true, top: '#f0a33c', bottom: '#f0a33c', hairC: '#4a3222' }), { k: KK, anim: (tl, el, q) => rot(qs(el, q, '.aR'), -120 + 50 * abs(sin(tl * 3 + 1.4)), 80, 100) }),
    pc(470, 740, 120, 226, A.kid({ armR: 20, armL: 120, flip: true, top: '#8a6fb0', bottom: '#8a6fb0', holdR: '', mouth: 'big' }), { k: KK * .95, dyn: tl => ({ lift: 12 * abs(sin(tl * 4)) }) }),
    // 太郎が歩いてくる
    pc(-420, 700, 120, 226, A.taro({ armR: -20, mouth: 'o' }), { k: TK, nosplit: true, side: 'L',
      dyn: tl => { const u = sm((tl - S1_WALK) / 3); return { dx: 200 * u, lift: u > 0 && u < 1 ? 8 * abs(sin(tl * 5)) : 0 }; },
      anim: aArm('.aR', tl => -20 - 80 * sm((tl - 4.6) / .8)) }),
    put('rock.round', -600, 820, { k: .55, art: { c: '#a9a196' } }),
    put('grass.reed', 610, 830, { k: .6, art: { c: '#8ab25a' } }),
    gull(-400, 250, 400, 30, 0), gull(-200, 220, 450, 26, 2),
  ],
};

// ===== 2. 太郎が亀を助けて海へ帰す =====
const S2_RUN = .6, S2_GO = 2.2, S2_SPLASH = 6.0;
const s2GoU = tl => sm((tl - S2_GO) / (S2_SPLASH - S2_GO));
const runAway = (ph) => tl => { const u = sm((tl - S2_RUN) / 2.2); return { dx: -260 * u, lift: u > 0 && u < 1 ? 14 * abs(sin(tl * 7 + ph)) : 0, op: 1 - sm((tl - S2_RUN - 1.6) / .7) }; };
const spread2 = {
  hold: 8,
  music: 'gentle',
  sfx: [[S2_RUN, 'steps', { n: 5, gap: .3 }], [S2_SPLASH, 'splash'], [S2_SPLASH + .5, 'bell']],
  ground: A.gBeach({ seed: 8, shore: 340 }),
  caption: ['"Please stop!" said Taro, and he set the turtle free.', [S2_GO + 1.4, 'The turtle swam home into the waves.']],
  pieces: [
    farHills(6, '#a7cdc6', '#8fbcae'),
    wave(250, 3, '#6dbad4', '#a6dcec', 110),
    put('cloud.puff', -380, 130, { art: { seed: 3 }, dyn: tl => ({ dx: 30 * sin(tl * .3) }) }),
    put('sky.sun', 480, 110, { lift: 360, glow: 24 }),
    put('conifer.pine', -560, 420, { k: .9, sway: 1.0, art: { c: '#3f7a4f' } }),
    put('ship.row', 520, 520, { k: .85, art: { c: '#a8744a' } }),
    // 亀: 波のほうへ進み、波の向こうへ消える
    pc(160, 690, 320, 170, A.turtle(), { k: .9, nosplit: true, side: 'R', anim: aTurtle(1.4),
      dyn: tl => { const u = s2GoU(tl); return { dx: 160 * u, dy: -400 * u, op: 1 - sm((tl - S2_SPLASH) / .3) }; } }),
    put('fx.splash', 330, 350, { nosplit: true, sh: false, k: .8, art: { c: '#e8f7fc' }, dyn: tl => ({ sc: pop(tl, S2_SPLASH), op: tl > S2_SPLASH ? 1 - sm((tl - S2_SPLASH - 1) / .6) : 0 }) }),
    // 逃げていく子どもたち
    pc(-330, 640, 120, 226, A.kid({ armR: -40, armL: 60, flip: true, top: '#e2574c', bottom: '#e2574c', holdR: '', mouth: 'o' }), { k: KK, nosplit: true, side: 'L', dyn: runAway(0) }),
    pc(-470, 720, 120, 226, A.kid({ armR: -40, armL: 60, flip: true, top: '#f0a33c', bottom: '#f0a33c', holdR: '', mouth: 'o', hairC: '#4a3222' }), { k: KK, nosplit: true, side: 'L', dyn: runAway(1.3) }),
    // 太郎は手を振って見送る
    pc(-90, 710, 120, 226, A.taro({ armR: -140, mouth: 'smile' }), { k: TK, anim: aArm('.aR', tl => tl > S2_GO ? -140 + 22 * sin(tl * 6) : -60) }),
    put('rock.round', 600, 820, { k: .5, art: { c: '#a9a196' } }),
    put('grass.reed', -620, 830, { k: .6, art: { c: '#8ab25a' } }),
    gull(-300, 230, 420, 28, 1), gull(200, 260, 380, 24, 3),
  ],
};

// ===== 3. 舟で釣りをする太郎の前に、亀が現れる =====
const S3_UP = 2.4;
const ROD = `<path d="M80 150L128 -30" stroke="#b98a3a" stroke-width="7" stroke-linecap="round"/><path d="M128 -30Q160 40 164 150" stroke="#f4f4ee" stroke-width="3.5" fill="none"/>`;
const rock = tl => ({ rz: 3 * sin(tl * 1.6), lift: 6 * sin(tl * 1.6 + 1) });
const spread3 = {
  hold: 8,
  music: 'airy',
  sfx: [[.3, 'wind', { len: 2.5 }], [S3_UP, 'splash'], [S3_UP + .7, 'pop'], [S3_UP + 2.4, 'chime']],
  ground: A.gSea({ seed: 7 }),
  caption: ['A few days later, Taro was fishing far out at sea.', [S3_UP + 1, '"Thank you, Taro! Come with me to the Dragon Palace!"']],
  pieces: [
    put('mountain.gentle', -380, 90, { art: { w: 640, h: 240, c: '#86b8a8', c2: '#73a693' }, sh: false, sway: 0 }),
    put('sky.sun', 470, 110, { lift: 380, glow: 24 }),
    put('cloud.puff', -120, 120, { art: { seed: 6 }, dyn: tl => ({ dx: 34 * sin(tl * .3) }) }),
    put('cloud.puff', 300, 140, { k: .8, lift: 300, art: { seed: 2 }, dyn: tl => ({ dx: -26 * sin(tl * .25) }) }),
    put('ship.sail', 360, 230, { k: .55, sh: false }),
    wave(300, 2, '#4fa3c6', '#86c8de', 120),
    // 舟の太郎
    pc(-200, 540, 120, 226, A.taro({ armR: -40, holdR: ROD }), { k: TK, nosplit: true, lift: 42,
      dyn: tl => { const r = rock(tl); return { rz: r.rz, lift: 42 + r.lift }; },
      anim: aArm('.aR', tl => tl > S3_UP + .6 ? -40 + 10 * sin(tl * 4) : -40) }),
    put('ship.row', -200, 552, { k: 1.15, nosplit: true, art: { c: '#a8744a' }, dyn: rock }),
    // 波の間から浮かび上がる亀
    pc(270, 560, 320, 170, A.turtle({ flip: true }), { k: .95, nosplit: true, anim: aTurtle(1, 0, -6),
      dyn: tl => ({ lift: -190 + 190 * sm((tl - S3_UP) / 1.1) + (tl > S3_UP + 1.1 ? 8 * sin(tl * 2) : 0) }) }),
    wave(650, 5, '#5fb0cf', '#9ad4e6', 90),
    gull(-500, 200, 430, 30, 0), gull(-300, 240, 470, 26, 2.2),
  ],
};

// ===== 4. 亀の背に乗って、海の底へ =====
const fish = (X, Y, lift, c, flip, ph, k = .7) => { const dir = flip ? -1 : 1;
  return pc(X, Y, 190, 120, A.swimFish(c), { k, lift, nosplit: true, sh: false, anim: aSwim(tl => cos(tl * .7 + ph) * dir),
    dyn: tl => ({ dx: 40 * sin(tl * .7 + ph) * dir, lift: lift + 18 * sin(tl * 1.3 + ph), op: sm((tl + .5) / .6) }) }); };
const seaGrade = (a = .3) => tl => ['#3d6fb8', a];
const spread4 = {
  hold: 8.5,
  music: 'night',
  sfx: [[.2, 'splash'], [1.6, (S, t) => { for (let i = 0; i < 6; i++) S.box(t + i * .2, 84 + (i % 3) * 5, .22); }], [4.6, 'sparkle', { len: 1.6 }]],
  ground: A.gSeabed({ seed: 5 }),
  grade: seaGrade(.3),
  caption: ['Taro rode on the turtle\'s back,', 'down, down, down to the bottom of the sea.'],
  cam: { start: { d: 380, cx: -120, cz: 220 }, end: { d: 340, cx: 120, cz: 170 } },
  pieces: [
    pc(0, 110, 1400, 260, A.reef(1400, 260, 3), { sh: false, sway: 0 }),
    pc(-600, 700, 130, 280, A.seaweed(), { sway: 2.4 }),
    pc(620, 560, 130, 280, A.seaweed(130, 280, '#4f8a5a', '#6fbf7a'), { k: .85, sway: 2.4 }),
    pc(-340, 780, 200, 170, A.coral(), { k: .7 }),
    pc(400, 800, 200, 170, A.coral(200, 170, '#b07ad0', '#cf9ae8'), { k: .6 }),
    put('rock.round', 160, 520, { k: .7, art: { c: '#7f8f96' } }),
    put('sea.octopus', 520, 640, { k: .75 }),
    fish(-520, 300, 260, '#f2c14e', false, 0), fish(320, 260, 380, '#f08a4a', true, 1.3),
    fish(500, 460, 200, '#ff8fb0', true, 2.2, .6), fish(-160, 600, 120, '#8fd3e6', false, 3.1, .6),
    // 亀に乗った太郎が、左上から右下へ泳ぐ
    pc(-430, 480, 320, 340, A.turtleRide(), { k: .9, nosplit: true, side: 'L', sh: false, anim: aRide(1.2),
      dyn: tl => { const u = sm((tl + .5) / 7.5); return { dx: 700 * u, dy: 180 * u, lift: 330 - 210 * u + 10 * sin(tl * 2), rz: -6 + 4 * sin(tl * 1.4), op: sm((tl + .5) / .6) }; } }),
    ...bubbles(-200, 620, 4, 11), ...bubbles(300, 520, 4, 21),
  ],
};

// ===== 5. 竜宮城がせり上がる(見せ場) =====
// 竜宮城のまわりに散らばるキラキラ。せり上がりの終わりから順に現れ、またたき続ける
const sparkles = (n, seed) => Array.from({ length: n }, (_, i) => {
  const r = rnd(seed + i * 7), X = (r() - .5) * 1100, Y = i % 2 ? 195 + r() * 25 : 640 + r() * 120, lift = 120 + r() * 560, t0 = RISEN - 1.2 + r() * 1.6, s = 22 + r() * 22, ph = r() * 6;
  const c = ['#fff2a8', '#ffffff', '#ffc8e0', '#bff0ff'][i % 4];
  return pc(X, Y, s * 2, s * 2, A.star(s, s, s - 1, c), { lift, sh: false, flt: false, sway: 0, nosplit: true, glow: 16, glowC: c,
    dyn: tl => ({ sc: pop(tl, t0, .4) * (.55 + .45 * sin(tl * 3.2 + ph)), op: tl > t0 ? 1 : 0 }) });
});
const RISE = 1.0, RISEN = 5.2, OTO = 6.6;
const riseU = tl => sm((tl - RISE) / (RISEN - RISE));
const spread5 = {
  hold: 10.5,
  music: [[0, 'night'], [RISE - .3, 'none'], [OTO, 'happy']],
  sfx: [[RISE, 'rise', { len: RISEN - RISE }], [OTO, 'pop']],     // せり上がりきった時の「しゃらん」は rise の最後の1回だけ
  ground: A.gSeabed({ seed: 13, sand: '#e2cf9e' }),
  grade: tl => ['#3d6fb8', .3 - .12 * riseU(tl)],
  caption: [[RISE + 1.6, 'Up rose a shining palace!'], [OTO + .4, '"Welcome, Taro," said Princess Otohime.']],
  cam: { start: { d: 560, cz: 160 }, keys: [[RISE + .6, { d: 720, tilt: 58, cz: 220, yaw: -6 }], [RISEN, { d: 920, tilt: 62, cz: 300, yaw: -4 }]], end: { d: 900, tilt: 62, cz: 300, yaw: 7 } },
  pieces: [
    pc(0, 110, 1400, 260, A.reef(1400, 260, 8, '#3a7590', '#4a8ca2'), { sh: false, sway: 0 }),
    // 後光: 竜宮城と一緒にせり上がり、上がりきると光が回ってふくらむ
    pc(0, 200, 700, 700, A.halo(), { nosplit: true, side: 'R', sh: false, flt: false, sway: 0, glow: 30, glowC: '#fff2a8',
      dyn: tl => { const u = riseU(tl), b = sm((tl - RISEN + .3) / .8); return { lift: 250 - (1 - u) * 960, sc: .8 + .25 * b + .04 * b * sin(tl * 3), op: u > 0 ? .5 + .5 * b : 0 }; },
      anim: (tl, el, q) => rot(qs(el, q, '.rays'), tl * 14, 350, 350) }),
    ...terrace({ X: 0, Y: 580, tiers: A.palaceTiers(), dyn: tl => { const u = riseU(tl); return { sink: (1 - u) * 680, op: u > 0 ? 1 : 0 }; } }),
    pc(-620, 640, 130, 280, A.seaweed(), { k: .9, sway: 2.4 }),
    pc(640, 620, 130, 280, A.seaweed(130, 280, '#4f8a5a', '#6fbf7a'), { k: .85, sway: 2.4 }),
    pc(-520, 820, 200, 170, A.coral(), { k: .6 }),
    pc(560, 830, 200, 170, A.coral(200, 170, '#f7c04a', '#f9d77a'), { k: .55 }),
    fish(-560, 300, 360, '#f2c14e', false, 0, .6), fish(560, 320, 420, '#ff8fb0', true, 1.7, .6),
    pc(-420, 730, 320, 340, A.turtleRide({ armR: -140 }), { k: .85, anim: aRide(.6) }),
    pc(360, 740, 120, 226, A.otohime({ armL: 60, armR: -20 }), { k: 1.1, nosplit: true,
      dyn: tl => ({ sc: pop(tl, OTO), op: tl > OTO ? 1 : 0 }), anim: aArm('.aL', tl => 60 + 30 * sin(tl * 4), 40) }),
    ...sparkles(22, 51),
    ...bubbles(-300, 640, 3, 31), ...bubbles(420, 600, 3, 41),
  ],
};

// ===== 6. 竜宮城の宴 =====
const spread6 = {
  hold: 8,
  music: 'happy',
  sfx: [[1, 'sparkle', { len: 1.2 }], [3.2, 'bell'], [5.6, 'sparkle', { len: 1.4 }]],
  ground: A.gHall(),
  grade: seaGrade(.12),
  caption: ['There were feasts and dances every day.', 'Taro was so happy that he forgot all about time.'],
  pieces: [
    pc(0, 140, 1400, 440, A.hallWall(), { sh: false, sway: 0 }),
    put('light.chochin', -580, 470, { k: .8, art: { c: VERM } }),
    put('light.chochin', 590, 470, { k: .8, art: { c: VERM } }),
    pc(-480, 690, 320, 170, A.turtle(), { k: .8, anim: aTurtle(.7) }),
    pc(-250, 670, 120, 226, A.taro({ armL: 110, armR: -110, mouth: 'big' }), { k: TK,
      anim: many(aArm('.aR', tl => -110 + 30 * sin(tl * 6)), aArm('.aL', tl => 110 - 30 * sin(tl * 6), 40)) }),
    pc(210, 650, 120, 226, A.otohime({ armL: 120, armR: -60 }), { k: 1.1,
      dyn: tl => ({ rz: 4 * sin(tl * 2) }), anim: many(aArm('.aR', tl => -90 + 50 * sin(tl * 2)), aArm('.aL', tl => 90 + 50 * sin(tl * 2 + 1), 40)) }),
    put('food.feast', -140, 770, { k: .8 }),
    put('sea.octopus', 540, 640, { k: .7 }),
    put('play.drum', 470, 760, { k: .6 }),
    ...[0, 1, 2, 3].map(i => pc(0, 600, 190, 120, A.swimFish(['#f2c14e', '#f08a4a', '#ff8fb0', '#8fd3e6'][i]), { k: .55, lift: 300, nosplit: true, sh: false,
      anim: aSwim(tl => -sin(tl * .8 + i * PI / 2)),
      dyn: tl => ({ dx: 260 * cos(tl * .8 + i * PI / 2), lift: 300 + 70 * sin(tl * .8 + i * PI / 2) }) })),
    twinkle(-400, 560, 460, 0), twinkle(420, 540, 500, 1.5), twinkle(0, 520, 560, 2.6),
  ],
};

// ===== 7. 別れの日、玉手箱を渡す =====
const S7_GIVE = 2.0, S7_GOT = 3.4;
const s7U = tl => sm((tl - S7_GIVE) / (S7_GOT - S7_GIVE));
const spread7 = {
  hold: 8.5,
  music: 'sad',
  sfx: [[S7_GIVE, 'magic'], [S7_GOT, 'chime']],
  ground: A.gSeabed({ seed: 9, sand: '#e2cf9e' }),
  grade: seaGrade(.28),
  caption: ['"Take this box, but never, ever open it," said Otohime.', [S7_GOT + 1, 'Taro said goodbye and rode the turtle home.']],
  cam: { start: { d: 860, tilt: 60, cz: 260 }, end: { d: 560, tilt: 56, cz: 180, cx: -40 } },
  pieces: [
    pc(0, 90, 1400, 260, A.reef(1400, 260, 12, '#3a7590', '#4a8ca2'), { sh: false, sway: 0 }),
    ...terrace({ X: 0, Y: 540, tiers: A.palaceTiers() }),
    pc(-630, 660, 130, 280, A.seaweed(), { k: .85, sway: 2.4 }),
    pc(640, 660, 130, 280, A.seaweed(130, 280, '#4f8a5a', '#6fbf7a'), { k: .8, sway: 2.4 }),
    pc(-470, 770, 320, 170, A.turtle(), { k: .8, anim: aTurtle(.6) }),
    pc(-150, 740, 120, 226, A.taro({ armR: -14, mouth: 'flat' }), { k: TK, anim: aArm('.aR', tl => -14 - 50 * s7U(tl)) }),
    pc(180, 740, 120, 226, A.otohime({ armL: 14, mouth: 'flat' }), { k: 1.1, anim: aArm('.aL', tl => 14 + 60 * sm((tl - S7_GIVE + .8) / .8) - 46 * s7U(tl), 40) }),
    pc(150, 744, 200, 170, A.tamatebako(), { k: .42, nosplit: true, side: 'R', sh: false, glow: 14, glowC: '#ffe9a0',
      dyn: tl => { const u = s7U(tl); return { dx: -290 * u, lift: 110 + 80 * sin(u * PI), op: tl > S7_GIVE - .8 ? 1 : 0, sc: pop(tl, S7_GIVE - .8) }; } }),
    twinkle(-200, 740, 320, 0, 13, '#fff2a8'), twinkle(0, 740, 360, 1.4, 12, '#fff2a8'),
    fish(-560, 320, 380, '#f2c14e', false, .4, .55),
  ],
};

// ===== 8. 村へ戻り、玉手箱を開ける =====
const OPEN = 3.4, CHANGE = OPEN + 1.4;
const smokeU = (tl, i) => sm((tl - OPEN - i * .15) / 2.2);
const spread8 = {
  hold: 10,
  music: [[0, 'sad'], [OPEN - .4, 'none'], [OPEN + 2.6, 'gentle']],
  sfx: [[OPEN - .2, 'creak'], [OPEN, 'whoosh', { len: 1.6 }], [CHANGE, 'magic']],
  ground: A.gBeach({ seed: 12, sea: '#e3a888', sand: '#efcf9a', sand2: '#ddb67e' }),
  grade: tl => ['#e07a4a', .22],
  caption: ['Back home, the village was strange. Many, many years had passed.', [CHANGE + .4, 'Taro opened the box... and he became an old man!']],
  cam: { start: { d: 420 }, keys: [[OPEN - .3, { d: 320, cx: 110, cz: 170 }], [CHANGE + .6, { d: 280, cx: 120, cz: 170 }]], end: { d: 330, cx: 70, cz: 160 } },
  pieces: [
    farHills(9, '#c9a6a8', '#b8929a'),
    pc(470, 240, 240, 240, A.sunDisc(240, '#f39a5a', '#ffd27a'), { lift: 180, flt: false, glow: 24, sh: false, sway: 0 }),
    put('house.machiya', -500, 420, { k: .85, sway: .3 }),
    put('house.machiya', -220, 380, { k: .8, sway: .3, art: { c2: '#5a6a8a' } }),
    put('tree.bare', 520, 420, { k: .9, sway: 1 }),
    put('folk.kimonoMan', -460, 690, { k: 1.0, nosplit: true, side: 'L', flip: true,
      dyn: tl => { const u = sm((tl - .4) / 3); return { dx: -150 * u, lift: u > 0 && u < 1 ? 7 * abs(sin(tl * 5)) : 0 }; } }),
    put('fx.surprise', 110, 680, { art: { q: true }, lift: 250, nosplit: true, dyn: tl => ({ op: tl < OPEN - .6 ? 1 : 0, sc: 1 + .1 * sin(tl * 5) }) }),
    // 若い太郎 → 煙 → 年をとった太郎
    pc(130, 690, 120, 226, A.taro({ armL: 30, armR: -30, mouth: 'flat' }), { k: TK, dyn: tl => ({ op: tl < CHANGE ? 1 : 0 }) }),
    pc(130, 690, 120, 226, A.oldTaro(), { k: TK, dyn: tl => ({ op: tl < CHANGE ? 0 : 1 }) }),
    pc(150, 724, 200, 170, A.tamatebako(), { k: .5, glow: 10, glowC: '#ffe9a0', anim: (tl, el, q) => rot(qs(el, q, '.lid'), -110 * sm((tl - OPEN) / .6), 14, 64) }),
    ...[0, 1, 2, 3, 4].map(i => put('fx.smoke', 150 + [-40, 50, -10, 70, 0][i], 730 + i, { art: { w: 240, h: 110, seed: i + 2 }, nosplit: true, sh: false, sway: 0,
      dyn: tl => { const u = smokeU(tl, i); return { lift: 110 * u + i * 26 * u, sc: .3 + 1.5 * u, dx: [-60, 60, -30, 80, 0][i] * u, op: sm((tl - OPEN - i * .1) / .4) * (1 - sm((tl - CHANGE - .6) / 1.4)) }; } })),
    put('rock.round', -600, 820, { k: .5, art: { c: '#a9a196' } }),
    put('grass.reed', 620, 830, { k: .6, art: { c: '#9aa25a' } }),
    gull(-300, 230, 420, 24, 1),
  ],
};

Tobidas.book({
  title: 'Urashima Taro — A Pop-up Book',
  lang: 'en',
  theme: { board: '#1f4f7a', spine: '#153a5c', style: 'crayon', desk: 'seaside', font: SERIF },
  sound: { set: 'wafu' },
  cover: A.cover(),
  end: { title: 'The End', sub: 'Urashima Taro' },
  spreads: [spread1, spread2, spread3, spread4, spread5, spread6, spread7, spread8],
});
