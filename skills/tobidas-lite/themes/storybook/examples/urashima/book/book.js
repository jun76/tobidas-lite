// Urashima Taro — 作品定義。書き方は references/book-api.md。
// 座標: X∈[-720,720](0=本の背)、Y∈[0,920](大きいほど手前)。tl = 見開きが開ききってからの秒数。
// 配置の決まり: パーツは片ページに収めるか、背の上でくの字に折る(横長の波・壁・城)。動く物は nosplit(背を越えると、いまいる側のページに自動で付け替わる)。

const SC = [];
// ---- 小物 ----
const gull = (X, Y, lift, v, ph) => bird(X, Y, lift, v, ph, '#f4f1ea');
// 泳ぐ魚: X を中心に左右へ行き来する(flip で向きが変わらないよう、進む向きは一定にして端で消える)
const swimmer = (X, Y, lift, v, ph, c, c2) => { const left = v < 0; return pc(X, Y, 90, 56, A.fish(c, c2, left), { sh: false, sway: 0, nosplit: true, side: X < 0 ? 'L' : 'R', delay: .2, anim: aFish(ph), dyn: tl => { const u = (((tl * abs(v) / 900 + ph) % 1) + 1) % 1; return { dx: (left ? -1 : 1) * (u - .5) * 900, lift: lift + 18 * sin(tl * 2 + ph * 7), op: cl(u * 6) * cl((1 - u) * 6) }; } }); };
const bubble = (X, Y, ph, k = 1) => pc(X, Y, 40, 40, A.bubble(), { k, sh: false, flt: false, sway: 0, nosplit: true, delay: .3, dyn: tl => { const u = (((tl * .28 + ph) % 1) + 1) % 1; return { lift: 30 + u * 520, dx: 16 * sin(u * 9 + ph * 20), sc: .5 + u * .7, op: sin(u * PI) }; } });
// 遠景: 山なみ(一番奥のパネル)と波の帯
const farHills = (c = '#a9c9d8', c2 = '#93b9cc', seed = 3) => pc(0, 60, 1400, 220, A.hills(1400, 220, c, c2, seed, 1.6), { sh: false, sway: 0 });
const waveBand = (Y, h, seed, c, c2, fold) => pc(0, Y, 1420, h, A.waves(1420, h, c, c2, seed), { sh: false, sway: 0, fold, anim: (tl, el, q) => qa(el, q, 'ellipse').forEach((e, i) => e.setAttribute('transform', `translate(${(8 * sin(tl * 1.6 + i)).toFixed(1)} ${(3 * sin(tl * 2.2 + i * 2)).toFixed(1)})`)) });

// ============ 1. The beach ============
SC[1] = {
  ground: A.gBeach({ seed: 3 }),
  pieces: [
    farHills(),
    // 太陽は背景(海辺)にあるので、ページの上には置かない
    pc(250, 90, 270, 110, A.cloud(270, 110, 2), { lift: 400, sh: false, dyn: tl => ({ dx: 40 * sin(tl * .3) }) }),
    waveBand(170, 90, 5),
    pc(420, 350, 300, 110, A.boat(), { k: .9, sway: 0, dyn: tl => ({ rz: 3 * sin(tl * 1.4), lift: 4 + 4 * sin(tl * 1.9) }) }),
    pc(-440, 500, 420, 380, A.cottage(), { k: 1.0, anim: aSmoke, sway: .3 }),
    pc(-130, 470, 260, 360, A.pineJ(), { sway: 1.2 }),
    pc(560, 520, 260, 360, A.pineJ(), { k: .9, sway: 1.2 }),
    pc(150, 690, 120, 226, A.taro({ armR: -62, holdR: `<path d="M80 158L80 -30" stroke="#8a5a33" stroke-width="10" stroke-linecap="round"/><circle cx="80" cy="-34" r="9" fill="#e2574c"/>` }), { k: 1.05, anim: aArm('.aR', tl => -62 + 8 * sin(tl * 2.2)), dyn: tl => ({ lift: 4 * abs(sin(tl * 2.2)) }) }),
    pc(-560, 800, 240, 130, A.rock(240, 130)),
    pc(520, 830, 240, 90, A.grass(240, 90, '#9bbf6a', '#b9d68a')),
    pc(-250, 850, 220, 70, A.grass(220, 70, '#9bbf6a', '#b9d68a')),
    gull(-300, 260, 470, 34, 0), gull(-380, 300, 520, 30, 2),
  ],
};

// ============ 2. The turtle ============
const SAVE = 3.2;                                    // 太郎が着いて、子どもが逃げ出す時刻
const pokeA = i => tl => tl < SAVE ? -70 + 30 * sin(tl * 7 + i * 2) : -20;
const runOff = (i, dir) => tl => { const u = sm((tl - SAVE - i * .15) / 1.6); return { dx: dir * 380 * u, lift: u > 0 && u < 1 ? 14 * abs(sin(tl * 9)) : 0, op: 1 - sm((u - .7) / .3) }; };
SC[2] = {
  ground: A.gBeach({ seed: 8 }),
  pieces: [
    farHills('#b3cfe0', '#9dbfd4', 6),
    pc(420, 80, 270, 110, A.cloud(270, 110, 5), { lift: 380, sh: false, dyn: tl => ({ dx: -36 * sin(tl * .3) }) }),
    waveBand(170, 90, 9),
    pc(-530, 500, 320, 220, A.rock(320, 220)),
    pc(540, 480, 260, 360, A.pineJ(), { sway: 1.2 }),
    pc(-200, 650, 260, 150, A.turtle(), { k: 1.1, sway: 0, anim: aTurtle(3), dyn: tl => ({ rz: tl < SAVE ? 4 * sin(tl * 11) : 0, lift: tl > SAVE + 1.4 ? 12 * abs(sin((tl - SAVE - 1.4) * 4)) : 0 }) }),
    pc(-430, 640, 120, 226, A.kid('#e2a03c', { armR: -70 }), { k: .8, nosplit: true, anim: aArm('.aR', pokeA(0)), dyn: runOff(0, -1) }),
    pc(-300, 540, 120, 226, A.kid('#6aa84f', { armR: -70 }), { k: .8, nosplit: true, anim: aArm('.aR', pokeA(1)), dyn: runOff(1, -1) }),
    pc(-56, 720, 120, 226, A.kid('#d9534a', { armR: -70, flip: true }), { k: .8, nosplit: true, anim: aArm('.aR', pokeA(2)), dyn: runOff(2, -1) }),
    pc(470, 700, 120, 226, A.taro({ armL: 60, flip: true, mouth: 'o' }), { k: 1.05, nosplit: true, anim: aArm('.aL', tl => tl < SAVE ? 60 + 30 * sin(tl * 8) : 20, 40), dyn: tl => { const u = sm((tl - .6) / (SAVE - .8)); return { dx: -330 * u, lift: u > 0 && u < 1 ? 9 * abs(sin(tl * 6)) : 0 }; } }),
    pc(-560, 830, 240, 90, A.grass(240, 90, '#9bbf6a', '#b9d68a')),
    pc(560, 840, 240, 120, A.rock(240, 120)),
    gull(200, 260, 480, -30, 1),
  ],
};

// ============ 3. On the turtle's back ============
const HOP = 3.9, GO = 5.0;                          // 太郎が背に乗る時刻、沖へ進みはじめる時刻
const goU = tl => sm((tl - GO) / 2.8);
const rideAway = tl => { const u = goU(tl); return { dx: 250 * u, dy: -230 * u, sc: 1 - .18 * u }; };
SC[3] = {
  ground: A.gBeach({ seed: 11, shore: 600 }),
  pieces: [
    farHills('#a9c9d8', '#93b9cc', 9),
    pc(-380, 80, 270, 110, A.cloud(270, 110, 7), { lift: 400, sh: false, dyn: tl => ({ dx: 36 * sin(tl * .3) }) }),
    waveBand(170, 90, 4),
    waveBand(380, 100, 6, '#3f98cc', '#7cc4e8', 12),   // 奥の波(Y=170)と同じ向きに折る(自動だと逆向きになって交差する)
    pc(-540, 700, 260, 360, A.pineJ(), { sway: 1.2 }),
    pc(230, 560, 260, 150, A.turtle(), { k: 1.4, sway: 0, nosplit: true, anim: aTurtle(4), dyn: tl => Object.assign(rideAway(tl), { lift: -190 + 190 * sm((tl - .5) / 1.3) + 5 * sin(tl * 3) }) }),
    pc(-300, 566, 120, 226, A.taro({ armR: -30 }), { k: 1.0, nosplit: true, side: 'L', anim: aArm('.aR', tl => tl > HOP ? -150 + 18 * sin(tl * 7) : -30), dyn: tl => {
      const w = sm((tl - 1.6) / 2.1), h = cl((tl - HOP) / .55), r = rideAway(tl);
      return { dx: 512 * w + r.dx, dy: r.dy, sc: r.sc, lift: (w > 0 && w < 1 ? 9 * abs(sin(tl * 6)) : 0) + 160 * r.sc * sm(h) + 90 * sin(h * PI) + (tl > HOP + .55 ? 5 * sin(tl * 3) : 0) }; } }),
    pc(-560, 840, 240, 120, A.rock(240, 120)),
    pc(-240, 860, 220, 70, A.grass(220, 70, '#9bbf6a', '#b9d68a')),
    gull(-200, 300, 500, 36, 0), gull(300, 240, 540, -28, 3),
  ],
};

// ============ 4. Down into the sea ============
const DIVE = tl => sm((tl - .3) / 6.4);
// 高く浮いた物は、めくり途中に出すと立ち上がりで大きく振れる。開ききる直前にふわっと現す(op)
const diver = extra => tl => { const u = DIVE(tl); return { dx: 760 * u, dy: 100 * u, lift: 430 - 340 * u + 8 * sin(tl * 2.4) + extra, op: sm((tl + .5) / .6) }; };
SC[4] = {
  ground: A.gDeep({ seed: 4 }),
  pieces: [
    farHills('#2a5f96', '#234f80', 5),
    pc(-570, 330, 150, 420, A.kelp(150, 420), { sway: 2.4 }),
    pc(610, 380, 150, 380, A.kelp(150, 380, '#4aa87a', '#35895f'), { sway: 2.4 }),
    pc(-250, 300, 130, 300, A.kelp(130, 300), { sway: 2.4 }),
    swimmer(-300, 250, 300, 60, .1, '#ffd24d', '#fff6e0'), swimmer(380, 300, 200, -52, .5, '#ff9ecb', '#fff6e0'), swimmer(100, 420, 420, 44, .8, '#f39c4a', '#ffd27a'),
    pc(-430, 520, 260, 150, A.turtle(), { k: 1.2, sway: 0, sh: false, nosplit: true, side: 'L', anim: aTurtle(5), dyn: tl => Object.assign(diver(0)(tl), { rz: 8 }) }),
    pc(-446, 524, 120, 226, A.taro({ armR: -150, armL: 40, mouth: 'big' }), { k: .95, sh: false, nosplit: true, side: 'L', anim: aArm('.aR', tl => -150 + 16 * sin(tl * 6)), dyn: diver(128) }),
    swimmer(-200, 640, 150, -64, .3, '#7fd0c0', '#e6fbf6'), swimmer(300, 700, 260, 56, .65, '#ffd24d', '#fff6e0'), swimmer(-420, 760, 90, 48, .9, '#ff9ecb', '#fff6e0'),
    pc(-640, 640, 170, 190, A.coral(170, 190, '#f08a7a'), { sway: .6 }),
    pc(540, 780, 170, 190, A.coral(170, 190, '#ff9ecb'), { sway: .6 }),
    pc(-380, 830, 280, 130, A.rock(280, 130, '#4f6f8a', '#6a8aa6')),
    pc(250, 860, 220, 100, A.rock(220, 100, '#4f6f8a', '#6a8aa6')),
    ...[[-520, 500, 0], [-120, 620, .2], [200, 480, .45], [420, 640, .6], [-300, 760, .8], [560, 520, .33], [40, 780, .9]].map(([x, y, ph], i) => bubble(x, y, ph, .7 + (i % 3) * .25)),
  ],
};

// ============ 5. The Dragon Palace (見せ場) ============
const RISE0 = 1.3, RISE1 = 4.6;                     // 竜宮城がせり上がりはじめる・上がりきる時刻
const riseU = tl => sm((tl - RISE0) / (RISE1 - RISE0));
// 立ちのぼる光の粒(城のまわりから絶えず上がる)
const SPK = ['#fff3a0', '#ffffff', '#ffd27a', '#bff3ff', '#ffc4dc'];
const riser = (X, Y, ph, i) => pc(X, Y, 36, 36, A.star(18, 18, 17, SPK[i % 5]), { k: 2 + (i % 3) * .5, sh: false, flt: false, sway: 0, nosplit: true, delay: .3, glow: 14, glowC: 'rgba(255,244,190,.9)', dyn: tl => { const u = (((tl * .22 + ph) % 1) + 1) % 1; return { lift: 20 + u * 760, dx: 30 * sin(u * 7 + ph * 12), sc: (.5 + .9 * sin(u * PI)) * (.75 + .25 * sin(tl * 9 + i)), rz: tl * 90 + i * 40, op: sin(u * PI) }; } });
const gate = (p, t0) => { const d = p.dyn; p.dyn = tl => { const o = d ? d(tl) || {} : {}; o.op = (o.op ?? 1) * sm((tl - t0) / .7); return o; }; return p; };
SC[5] = {
  ground: A.gDeep({ seed: 7, floor: true }),
  pieces: [
    farHills('#2a5f96', '#234f80', 8),
    // 竜宮城は「段々の構造物」: 石の台・本殿・上の階・屋根飾りの4段の壁と、その上の台や屋根が連動して開閉する。
    // 海底からせり上がる動きは sink(根元より下へ沈めて隠す量)で付ける
    // 後光: 城の後ろで回る光。城と同じ riseU で、いっしょに海底からせり上がる
    pc(40, 250, 760, 760, A.halo(760), { lift: 150, sh: false, flt: false, sway: 0, nosplit: true, side: 'R', delay: .3, glow: 50, glowC: 'rgba(255,240,170,.75)', anim: (tl, el, q) => rot(qs(el, q, '.rays'), tl * 14, 380, 380), dyn: tl => { const g = riseU(tl); return { dx: -40, sink: (1 - g) * 930, op: g > 0 ? 1 : 0 }; } }),
    ...terrace({ X: 0, Y: 600, tiers: A.palaceTiers(1).map(t => Object.assign(t, { opt: { glow: 16, glowC: 'rgba(255,238,170,.85)' } })), dyn: tl => { const g = riseU(tl); return { sink: (1 - g) * 620, op: g > 0 ? 1 : 0 }; } }),
    pc(-610, 330, 150, 400, A.kelp(150, 400), { sway: 2.4 }),
    pc(620, 340, 150, 360, A.kelp(150, 360, '#4aa87a', '#35895f'), { sway: 2.4 }),
    ...[[-250, 640, 700, 0, 22], [260, 640, 660, 2, 20], [0, 640, 780, 4, 26], [-120, 640, 560, 1, 18], [150, 640, 520, 3, 18], [-430, 520, 480, 5, 20], [440, 520, 440, 6, 20], [-340, 640, 300, 2.5, 16], [350, 650, 260, 3.5, 16], [-520, 420, 620, 1.5, 14], [540, 430, 600, .5, 14]].map(([x, y, l, ph, r], i) => gate(twinkle(x, y, l, ph, r * 2, SPK[i % 5]), RISE1 - .3 + i * .08)),
    ...[[-470, 560, 0], [-330, 640, .14], [-160, 660, .3], [0, 680, .45], [170, 660, .6], [330, 640, .75], [470, 560, .9], [-560, 440, .22], [570, 450, .52], [-90, 700, .68], [90, 700, .08], [-250, 480, .82], [250, 480, .38]].map(([x, y, ph], i) => gate(riser(x, y, ph, i), RISE1 - .2)),
    gate(swimmer(-260, 640, 420, 70, .15, '#ffd24d', '#fff6e0'), RISE1), gate(swimmer(280, 650, 330, -62, .55, '#ff9ecb', '#fff6e0'), RISE1), gate(swimmer(60, 660, 520, 54, .85, '#f39c4a', '#ffd27a'), RISE1),
    pc(-400, 690, 260, 150, A.turtle(), { k: 1.05, sway: 0, anim: aTurtle(3) }),
    pc(-190, 730, 120, 226, A.taro({ armR: -20, armL: 20, look: 'up', mouth: 'o' }), { k: 1.0, anim: many(aArm('.aR', tl => -20 - 130 * sm((tl - RISE1 + .4) / .5) + (tl > RISE1 ? 14 * sin(tl * 7) : 0)), aArm('.aL', tl => 20 + 130 * sm((tl - RISE1 + .4) / .5) - (tl > RISE1 ? 14 * sin(tl * 7) : 0), 40)), dyn: tl => ({ lift: tl > RISE1 ? 22 * abs(sin((tl - RISE1) * 5)) : 0 }) }),
    pc(-600, 740, 170, 190, A.coral(170, 190, '#f08a7a'), { sway: .6 }),
    pc(560, 760, 170, 190, A.coral(170, 190, '#ff9ecb'), { sway: .6 }),
    pc(380, 820, 260, 120, A.rock(260, 120, '#4f6f8a', '#6a8aa6')),
    ...[[-560, 560, .1], [470, 620, .5], [200, 800, .75], [-80, 840, .3]].map(([x, y, ph], i) => bubble(x, y, ph, .8 + (i % 2) * .3)),
  ],
};

// ============ 6. The feast ============
const dancer = (X, Y, i, c, flip) => pc(X, Y, 90, 56, A.fish(c, '#fff6e0', flip), { k: 1.3, sway: 0, anim: aFish(i), dyn: tl => ({ lift: 30 + 70 * abs(sin(tl * 3.4 + i * .9)), rz: (flip ? -1 : 1) * (-28 + 14 * sin(tl * 3.4 + i)) }) });
SC[6] = {
  ground: A.gHall(),
  pieces: [
    pc(0, 110, 1380, 460, A.hallWall(), { sh: false, sway: 0 }),
    pc(-170, 600, 120, 226, A.otohime({ armR: -100, mouth: 'big' }), { k: 1.15, anim: aArm('.aR', tl => -100 + 16 * sin(tl * 3)) }),
    pc(250, 560, 120, 226, A.taro({ armL: 150, armR: -150, mouth: 'big' }), { k: 1.05, anim: many(aArm('.aR', tl => -150 + 18 * sin(tl * 6)), aArm('.aL', tl => 150 - 18 * sin(tl * 6), 40)), dyn: tl => ({ lift: 12 * abs(sin(tl * 3.4)) }) }),
    pc(254, 610, 400, 110, A.dishTable(), { k: 1.05, sway: 0 }),
    pc(-500, 640, 170, 160, A.tako(), { k: 1.1, sway: 0, anim: aTako, dyn: tl => ({ lift: 40 * abs(sin(tl * 3.4)), rz: 8 * sin(tl * 3.4) }) }),
    dancer(-330, 790, 0, '#f39c4a'), dancer(-190, 810, 1, '#ffd24d'), dancer(-70, 790, 2, '#ff9ecb'),
    dancer(110, 800, 3, '#7fd0c0', true), dancer(250, 820, 4, '#f39c4a', true), dancer(400, 800, 5, '#ffd24d', true),
    pc(560, 660, 170, 190, A.coral(170, 190, '#ff9ecb'), { sway: .6 }),
    note(-470, 650, 0, '#f3c64f'), note(-150, 610, .3, '#e85d7a'), note(60, 760, .55, '#f3c64f'), note(420, 700, .8, '#2f9a94'),
    ...[[-620, 520, .2], [620, 500, .6], [-20, 560, .85]].map(([x, y, ph], i) => bubble(x, y, ph, .8 + (i % 2) * .3)),
  ],
};

// ============ 7. The farewell ============
const GIVE = 2.8, giveU = tl => sm((tl - GIVE) / 1.3);     // 乙姫が玉手箱を渡す
SC[7] = {
  ground: A.gDeep({ seed: 12, floor: true }),
  pieces: [
    farHills('#2a5f96', '#234f80', 13),
    ...terrace({ X: -350, Y: 520, tiers: A.palaceTiers(.72) }),   // 左ページに収めた竜宮城(片ページなので壁は折れない)
    pc(620, 360, 150, 380, A.kelp(150, 380, '#4aa87a', '#35895f'), { sway: 2.4 }),
    pc(470, 590, 260, 150, A.turtle({ flip: true }), { k: 1.1, sway: 0, anim: aTurtle(3) }),
    pc(-150, 670, 120, 226, A.otohime({ armR: -70 }), { k: 1.15, anim: aArm('.aR', tl => -70 - 24 * giveU(tl)) }),
    pc(170, 670, 120, 226, A.taro({ armL: 20 }), { k: 1.05, anim: aArm('.aL', tl => 20 + 60 * giveU(tl), 40) }),
    pc(-62, 674, 110, 90, A.box(), { k: .8, nosplit: true, side: 'L', sh: false, sway: 0, glow: 16, dyn: tl => { const u = giveU(tl); return { dx: 168 * u, lift: 118 - 14 * u + 60 * sin(u * PI) + 4 * sin(tl * 3) }; } }),
    ...[[40, 676, 250, 0, 13], [130, 676, 190, 2, 11], [200, 676, 260, 4, 13]].map(([x, y, l, ph, r]) => gate(twinkle(x, y, l, ph, r, '#fff3a0'), GIVE + .9)),
    pc(-620, 760, 170, 190, A.coral(170, 190, '#f08a7a'), { sway: .6 }),
    pc(330, 830, 260, 120, A.rock(260, 120, '#4f6f8a', '#6a8aa6')),
    swimmer(300, 520, 330, -40, .2, '#ff9ecb', '#fff6e0'), swimmer(-300, 800, 120, 36, .6, '#ffd24d', '#fff6e0'),
    ...[[-560, 600, .1], [560, 700, .5], [60, 820, .8]].map(([x, y, ph], i) => bubble(x, y, ph, .8 + (i % 2) * .3)),
  ],
};

// ============ 8. Home, and the box ============
const OPEN = 3.0, AGE = 4.8;                       // ふたが開く時刻、太郎が年をとる時刻
const ageU = tl => sm((tl - AGE) / .9);
const smoke = (i) => pc(292, 706, 240, 130, A.cloud(240, 130, 3 + i, '#ffffff', '#e4e4ee'), { sh: false, nosplit: true, sway: 0, delay: .3, dyn: tl => { const u = ((((tl - OPEN) * .3 + i / 6) % 1) + 1) % 1; return { lift: 50 + u * 430, dx: -150 * u + 26 * sin(u * 8 + i), sc: .25 + 1.25 * u, op: tl > OPEN ? sin(u * PI) * sm((tl - OPEN - i * .12) / .5) : 0 }; } });
SC[8] = {
  ground: A.gBeach({ seed: 21, sand: '#ecd7a8' }),
  pieces: [
    farHills('#b9bfd0', '#a3abc2', 15),
    waveBand(170, 90, 12, '#5a9ac4', '#8fc0de'),
    pc(-390, 480, 560, 200, A.newVillage(), { k: 1.15, sway: .2 }),
    pc(570, 500, 260, 360, A.pineJ(), { k: 1.15, sway: 1.2 }),
    pc(150, 690, 120, 226, A.taro({ armL: 30, armR: -30, mouth: 'o' }), { k: 1.05, anim: aArm('.aR', tl => -30 - 50 * sm((tl - OPEN + .6) / .5)), dyn: tl => ({ op: 1 - ageU(tl) }) }),
    pc(150, 692, 120, 226, A.oldTaro({ armL: 60, armR: -60 }), { k: 1.05, sh: false, anim: many(aArm('.aR', tl => -60 + 10 * sin(tl * 9)), aArm('.aL', tl => 60 - 10 * sin(tl * 9), 40)), dyn: tl => ({ op: ageU(tl), rz: 2 * sin(tl * 9) }) }),
    pc(292, 700, 110, 90, A.box(), { k: 1.1, sway: 0 }),
    pc(292, 702, 110, 34, A.boxLid(), { k: 1.1, sh: false, sway: 0, nosplit: true, dyn: tl => { const u = sm((tl - OPEN) / .7); return { lift: 62 + 190 * u, dx: 110 * u, rz: 70 * u, op: 1 - sm((tl - OPEN - .9) / .6) }; } }),
    ...[0, 1, 2, 3, 4, 5].map(smoke),
    pc(-560, 820, 240, 130, A.rock(240, 130)),
    pc(-240, 850, 220, 70, A.grass(220, 70, '#9bbf6a', '#b9d68a')),
    pc(540, 850, 240, 90, A.grass(240, 90, '#9bbf6a', '#b9d68a')),
    gull(-260, 280, 480, 30, 1),
  ],
};

// ---- 見開きごとの秒数・字幕・カメラ・音 ----
Object.assign(SC[1], { hold: 7.4, music: 'gentle', sfx: [[.4, 'wind', { len: 3 }]],
  caption: ['Long, long ago, a kind young fisherman', 'named Urashima Taro lived by the sea.'] });
Object.assign(SC[2], { hold: 8.0, music: 'gentle', sfx: [[SAVE, 'pop'], [SAVE + .2, 'steps', { n: 5, gap: .2 }]],
  caption: ['One day, some children were teasing a turtle.', [SAVE - .4, '"Stop! Let it go," said Taro.']] });
Object.assign(SC[3], { hold: 8.2, music: 'airy', sfx: [[.6, 'chime'], [HOP, 'pop'], [GO, 'whoosh']],
  caption: ['The next day, the turtle came back.', [1.8, '"Climb on my back. I will take you to the Dragon Palace."']] });
Object.assign(SC[4], { hold: 7.4, music: 'airy', sfx: [[.4, 'sparkle', { len: 2.4, vol: .3 }]], grade: () => ['#3f7fc0', .22],
  caption: ['Down, down they went,', 'deep into the blue sea.'], cam: { start: { d: 430, cz: 230 }, end: { d: 300, cz: 190, cx: 60 } } });
Object.assign(SC[5], { hold: 9.6, grade: tl => tl < RISE1 - .3 ? ['#3f7fc0', .2] : ['#ffe9b0', .16 * sm((tl - RISE1 + .3) / .8)],   // 上がりきる前は青く沈め、現れたら金色の光に変える
  music: [[0, 'airy'], [RISE0 - .2, 'none'], [RISE1 + .2, 'happy']], sfx: [[RISE0, 'rise', { len: RISE1 - RISE0 }], [RISE1 + .4, 'sparkle', { len: 3.4, n: 22, vol: .5 }]],   // 「しゃらん」は rise の締めの1回だけ(magic や chime を重ねると2発に聞こえる)
  caption: ['And there it was, shining under the waves—', [RISE1 - .2, 'the Dragon Palace!']],
  cam: { start: { d: 300, cx: -160, cz: 120 }, keys: [[RISE0, { d: 340, cx: -80, cz: 140 }], [RISE1, { d: 900, tilt: 62, yaw: -9, cx: 0, cy: 0, cz: 300 }]], end: { d: 820, tilt: 60, yaw: 9, cx: 0, cy: 0, cz: 290 } } });
Object.assign(SC[6], { hold: 7.6, music: 'happy', sfx: [[.5, 'chime'], [3.4, 'bell']],
  caption: ['Princess Otohime welcomed him with a feast.', 'The fish danced, and the days flew by.'] });
Object.assign(SC[7], { hold: 8.0, music: 'sad', grade: () => ['#3f7fc0', .14], sfx: [[GIVE, 'sparkle', { len: 1.6 }], [GIVE + 1.3, 'bell']],
  caption: ['"I must go home," said Taro. The princess gave him a box.', [GIVE + .4, '"Never, never open it."']] });
Object.assign(SC[8], { hold: 9.4, grade: tl => ['#c9905a', .2],
  music: [[0, 'night'], [OPEN - .3, 'none'], [AGE + 1.4, 'sad']], sfx: [[OPEN, 'creak'], [OPEN + .3, 'whoosh', { len: 1.6 }], [AGE, 'magic'], [AGE + .9, 'thud']],
  caption: ['But home had changed. Taro opened the box…', [OPEN + .6, 'White smoke rose, and he became an old, old man.']],
  cam: { start: { d: 420, cx: 40 }, end: { d: 210, cx: 150, cz: 170 } } });

Tobidas.book({
  title: 'Urashima Taro — A Pop-Up Storybook',
  lang: 'en',
  theme: { board: '#16365c', spine: '#102a48', style: 'crayon', desk: 'seaside' },
  sound: { set: 'wafu' },
  cover: A.cover(),
  end: { title: 'The End', sub: 'Urashima Taro' },
  tableDeco: (i, r) => i % 3 ? `<path d="M0 -12Q14 -10 12 4Q4 14 -8 10Q-14 0 0 -12Z" fill="${['#f6c0b0', '#fff6e0', '#e9d9a8'][i % 3]}"/>` : `<path d="M0 -16L5 -5L16 -5L7 3L11 14L0 7L-11 14L-7 3L-16 -5L-5 -5Z" fill="#f39c7a"/>`,
  spreads: SC.slice(1),
});
