// 作品定義「ジャックと豆の木」。書き方は references/book-api.md。
// 座標: X∈[-720,720](0=本の背)、Y∈[0,920](大きいほど手前)。tl = 見開きが開ききってからの秒数。

const JK = 1, AD = 1.12;                          // ジャックと大人の大きさ(絵本らしく大きめ)
const farHills = (seed, c = '#a5d3e2', c2 = '#8cc6cf') => pc(0, 100, 1400, 250, A.hills(1400, 250, c, c2, seed, 1.2, hillTrees(9, seed + 1, 50, true)), { sh: false, sway: 0 });
const nearHills = (seed, c = '#7cbf66', c2 = '#94d078') => pc(0, 230, 1420, 210, A.hills(1420, 210, c, c2, seed, 1.0, hillTrees(8, seed + 2, 70)), { sh: false, sway: 0 });
const jump = (amp, sp, ph = 0) => tl => ({ lift: amp * abs(sin(tl * sp + ph)) });
// 豆の木は、鉛直軸のまわりに ±45 度回した2枚を X 字に組む(正面からも斜めからも、板の面が見える)
const XYAW = [45, -45];
// 表情を途中で切り替える人物: t0 より前は artA、あとは artB(同じ場所に2枚置いて、片方だけ見せる)
const swapFace = (t0, X, Y, artA, artB, o) => [
  pc(X, Y, 120, 226, artA, Object.assign({}, o, { dyn: tl => Object.assign({}, o.dyn ? o.dyn(tl) : {}, { op: tl < t0 ? 1 : 0 }) })),
  pc(X, Y + 1, 120, 226, artB, Object.assign({}, o, { dyn: tl => Object.assign({}, o.dyn ? o.dyn(tl) : {}, { op: tl < t0 ? 0 : 1 }) })),
];

// ===== 1. まずしい親子 =====
const spread1 = {
  hold: 7.5,
  music: 'bright',                              // 見開き2と同じ気分にして、1本の曲としてつなげる
  ground: A.gMeadow({ seed: 5 }),
  caption: ['むかし、ジャックは おかあさんと ふたりで くらしていました。', 'ある日、牛を 売りに 行くことに なりました。'],
  pieces: [
    farHills(2), nearHills(7),
    put('sky.sun', -470, 120, { lift: 330, glow: 30 }),
    put('cloud.puff', 180, 130, { dyn: tl => ({ dx: 40 * sin(tl * .3) }) }),
    put('cloud.puff', 520, 150, { lift: 300, k: .8, art: { seed: 4 }, dyn: tl => ({ dx: -30 * sin(tl * .25) }) }),
    pc(-370, 440, 420, 380, A.poorHouse(), { k: 1.15, anim: aSmoke, sway: .3 }),
    put('tree.fruit', 520, 400, { sway: 1.4, art: { fruit: '#e2574c' } }),
    put('conifer.fir', -640, 470, { k: .8, sway: 1.2, art: { c: '#4f8f5a' } }),
    put('fence.wood', 330, 540, { art: { w: 420 } }),
    put('farm.cow', 300, 680, { k: 1.2, flip: true }),
    pc(-70, 700, 120, 226, A.jack({ armR: -70 }), { k: JK, anim: aArm('.aR', tl => -70 + 12 * sin(tl * 2.2)), dyn: tl => ({ lift: 6 * abs(sin(tl * 2.4)) }) }),
    pc(-230, 670, 120, 226, A.mother({ armL: 10, armR: -40, mouth: 'flat' }), { k: AD, anim: aArm('.aR', tl => -40 + 8 * sin(tl * 1.6)) }),
    put('bush.flower', -560, 790, {}),
    put('grass.short', 150, 840, { art: { w: 260 } }),
    put('flower.wild', 560, 820, {}),
    bird(-300, 300, 420, 34, 0), bird(-420, 260, 470, 30, 2, '#6a7fb0'), fly(180, 800, '#ff9ecb', 0),
  ],
};

// ===== 2. 牛と豆をとりかえる =====
const GIVE = 2.6, GOT = 3.7, WALK = 4.6;           // 豆を渡しはじめる/受け取る/牛が歩きだす
const giveU = tl => sm((tl - GIVE) / (GOT - GIVE));
const spread2 = {
  hold: 8.5,
  music: 'bright',
  sfx: [[GIVE, 'sparkle', { len: 1.1 }], [GOT, 'pop'], [GOT + .5, 'chime']],
  ground: A.gMeadow({ seed: 9, pond: null, path: 'M0 600C260 560 520 640 760 610S1240 560 1440 620L1440 760C1200 700 980 760 740 750S260 700 0 740Z' }),
  caption: ['とちゅうで 会った おじいさんが いいました。', '「その牛を、まほうの豆と とりかえよう。」'],
  pieces: [
    farHills(11, '#b5c9e8', '#9db7dc'), nearHills(4, '#86c46e', '#9ed684'),
    put('cloud.puff', -380, 130, { art: { seed: 3 }, dyn: tl => ({ dx: 36 * sin(tl * .3) }) }),
    put('tree.round', -560, 400, { sway: 1.4, art: { c: '#4f9a50', c2: '#6fb65c', c3: '#8fce74' } }),
    put('tree.autumn', 570, 380, { sway: 1.4, k: .95 }),
    put('conifer.cedar', 330, 330, { k: .8, sway: 1.2 }),
    put('out.signpost', -230, 430, { k: 1 }),
    put('rock.moss', 560, 560, { k: .6 }),
    // 牛: ジャックのうしろから、おじいさんの側へ歩いていく
    put('farm.cow', -480, 560, { k: 1.15, nosplit: true, side: 'L', dyn: tl => { const u = sm((tl - WALK) / 3.2); return { dx: 800 * u, lift: u > 0 && u < 1 ? 8 * abs(sin(tl * 5)) : 0 }; } }),
    pc(-110, 700, 120, 226, A.jack({ armR: -20 }), { k: JK,
      anim: many(aArm('.aR', tl => -20 - 60 * giveU(tl) + (tl > GOT ? 8 * sin(tl * 6) : 0)), aArm('.aL', tl => tl > GOT + .2 ? 130 + 14 * sin(tl * 6) : 14, 40)),
      dyn: tl => ({ lift: tl > GOT ? 26 * abs(sin((tl - GOT) * 4)) * (1 - sm((tl - GOT - 2.5) / 1)) : 0 }) }),
    pc(120, 700, 120, 226, A.oldman({ armL: 20, mouth: 'smile' }), { k: AD, anim: aArm('.aL', tl => 20 + 55 * sm((tl - GIVE + .8) / .8) - 40 * sm((tl - GOT) / .8), 40) }),
    // 豆: おじいさんの手からジャックの手へ、山なりに
    pc(56, 702, 60, 50, A.beans(), { k: .75, nosplit: true, sh: false, glow: 14, glowC: '#d8ff9a', side: 'R',
      dyn: tl => { const u = giveU(tl); return { dx: -118 * u, lift: 150 + 70 * sin(u * PI) + (tl > GOT ? 26 * abs(sin((tl - GOT) * 4)) * (1 - sm((tl - GOT - 2.5) / 1)) : 0), op: tl > GIVE - .9 ? 1 : 0, sc: pop(tl, GIVE - .9) }; } }),
    
    put('bush.berry', -560, 800, {}),
    put('grass.flowers', 520, 830, {}),
    fly(-300, 820, '#ffd24d', 1),
  ],
};

// ===== 3. 豆の木が伸びる(夜から朝へ) =====
const THROW = .7, GROW = 2.7, GROWN = 7.2, DAWN = 4.6;
const growU = tl => sm((tl - GROW) / (GROWN - GROW));
const dayU = tl => sm((tl - DAWN) / 2.6);
// 豆の木は上下2枚に分けて置く(高さ 1000 を超える1枚板は、カメラが近いと下のほうが描かれない)。下の板が伸びきってから上の板が伸びる
const SPLIT = 860, LOW = (1300 - SPLIT) / 1300;
const lowG = tl => growU(tl) / LOW, upG = tl => (growU(tl) - LOW) / (1 - LOW);
const stalkLow = o => Object.assign({ nosplit: true, side: 'R', delay: 0, sway: 0, anim: aStalkGrow(SPLIT, 1300, lowG), dyn: tl => ({ op: lowG(tl) > 0 ? 1 : 0 }) }, o);
const stalkUp = o => Object.assign({ nosplit: true, side: 'R', delay: 0, sway: 0, sh: false, lift: 1300 - SPLIT, anim: aStalkGrow(0, SPLIT, upG), dyn: tl => ({ op: upG(tl) > 0 ? 1 : 0 }) }, o);
const spread3 = {
  hold: 10.5,
  music: [[0, 'night'], [GROW - .3, 'none'], [GROWN + .5, 'airy']],
  sfx: [[THROW, 'whoosh', { len: .7 }], [THROW + 1.0, 'drop'], [GROW, 'rise', { len: GROWN - GROW }], [GROWN - 1.4, 'pop'], [GROWN - 1.1, 'pop'], [GROWN + .1, 'sparkle', { len: 1.4 }]],
  ground: A.gMeadow({ seed: 14, pond: null, path: null }) + A.dirt(930, 610, 90, 34),
  grade: tl => ['#3d52a8', .56 * (1 - dayU(tl))],
  caption: ['おこった おかあさんは、豆を まどから すてて しまいました。', [GROWN - 1.2, 'つぎの朝、豆の木が 雲の上まで のびていました。']],
  cam: { start: { d: 380, cx: -40 }, keys: [[2.4, { d: 250, cx: 60, cz: 150 }], [GROWN + .2, { d: 1300, tilt: 72, cy: 60, cz: 600 }]], end: { d: 1240, tilt: 72, cy: 60, cz: 620 } },
  pieces: [
    farHills(5, '#9bbfd6', '#86b0c8'), nearHills(9, '#6fae62', '#86c070'),
    put('sky.moon', -480, 120, { lift: 360, dyn: tl => ({ op: 1 - dayU(tl), lift: 360 - 120 * dayU(tl) }) }),
    put('sky.stars', -150, 110, { lift: 400, dyn: tl => ({ op: 1 - dayU(tl) }) }),
    put('sky.stars', 420, 130, { lift: 380, art: { seed: 7 }, dyn: tl => ({ op: 1 - dayU(tl) }) }),
    put('sky.sun', 560, 380, { lift: 300, glow: 30, dyn: tl => ({ op: dayU(tl), lift: 180 + 150 * dayU(tl) }) }),
    pc(-380, 440, 420, 380, A.poorHouse(), { k: 1.15, anim: aSmoke, sway: .3 }),
    put('tree.round', -660, 520, { k: .8, sway: 1.2 }),
    put('fence.wood', 500, 470, { art: { w: 380 } }),
    // すてられた豆(窓から庭へ)
    pc(-250, 600, 60, 50, A.beans(), { nosplit: true, sh: false, side: 'L', k: .8, glow: 10, glowC: '#d8ff9a',
      dyn: tl => { const u = cl((tl - THROW) / 1.0); return { dx: 460 * u, lift: 170 * (1 - u) + 260 * u * (1 - u), rz: tl * 420, op: u > 0 && tl < GROW + .2 ? 1 : 0 }; } }),
    pc(210, 602, 80, 70, A.sprout(), { nosplit: true, dyn: tl => ({ sc: pop(tl, GROW - .6), op: tl > GROW - .6 ? 1 - cl((tl - GROW - .05) / .25) : 0 }) }),   // 幹が出はじめたら、入れ替わりにすぐ消す
    // 豆の木(X 字に組んだ2枚。それぞれ上下に分けてある)
    pc(210, 600, 260, 1300 - SPLIT, A.stalkPart(260, 1300, SPLIT, 1300), stalkLow({ yaw: XYAW[0] })),
    pc(210, 600, 260, SPLIT, A.stalkPart(260, 1300, 0, SPLIT), stalkUp({ yaw: XYAW[0] })),
    pc(210, 634, 260, 70, A.stalkKnot(), { nosplit: true, side: 'R', sh: false, sway: 0, lift: 1300 - SPLIT - 40, dyn: tl => ({ sc: pop(tl, GROW + 1.85, .4), op: tl > GROW + 1.85 ? 1 : 0 }) }),
    pc(210, 600, 260, 1300 - SPLIT, A.stalkPart(260, 1300, SPLIT, 1300, 8), stalkLow({ yaw: XYAW[1] })),
    pc(210, 600, 260, SPLIT, A.stalkPart(260, 1300, 0, SPLIT, 8), stalkUp({ yaw: XYAW[1] })),
    put('cloud.puff', 100, 590, { lift: 1150, art: { w: 340, h: 130, seed: 2 }, nosplit: true, dyn: tl => ({ sc: pop(tl, GROWN - .5), op: tl > GROWN - .5 ? 1 : 0, dx: 20 * sin(tl * .5) }) }),
    put('cloud.puff', 350, 610, { lift: 1060, art: { w: 300, h: 120, seed: 5 }, nosplit: true, dyn: tl => ({ sc: pop(tl, GROWN - .2), op: tl > GROWN - .2 ? 1 : 0, dx: -20 * sin(tl * .5) }) }),
    // 朝、外へ出てきて見上げるジャック
    pc(-130, 700, 120, 226, A.jack({ armL: 150, armR: -150, mouth: 'o', look: 'up' }), { k: JK,
      anim: many(aArm('.aR', tl => -150 + 10 * sin(tl * 6)), aArm('.aL', tl => 150 + 10 * sin(tl * 6 + 1), 40)),
      dyn: tl => ({ sc: pop(tl, GROWN - 1.4), op: tl > GROWN - 1.4 ? 1 : 0, lift: 14 * abs(sin(tl * 4)) }) }),
    // となりで おどろく お母さん
    pc(-280, 690, 120, 226, A.mother({ armL: 150, armR: -150, mouth: 'o', look: 'up' }), { k: AD,
      anim: many(aArm('.aR', tl => -150 + 9 * sin(tl * 5 + 2)), aArm('.aL', tl => 150 + 9 * sin(tl * 5), 40)),
      dyn: tl => ({ sc: pop(tl, GROWN - 1.1), op: tl > GROWN - 1.1 ? 1 : 0, lift: 10 * abs(sin(tl * 3.4 + 1)) }) }),
    put('bush.round', -560, 800, {}),
    put('grass.short', 560, 830, {}),
  ],
};

// ===== 4. 雲の上へ =====
const CLIMB = 2.6;                                 // 登りきる時刻
const spread4 = {
  hold: 7.5,
  music: 'airy',
  sfx: [[.4, 'wind', { len: 3 }], [CLIMB, 'pop'], [4.6, 'chime']],
  ground: A.gSky() + A.hole(410, 650),
  caption: ['ジャックは 豆の木を ぐんぐん のぼりました。', '雲の上には、大きな おしろが ありました。'],
  cam: { start: { d: 420, cx: -120 }, end: { d: 330, cx: 60, cz: 190 } },
  pieces: [
    pc(0, 110, 1420, 130, A.cloudBank(1420, 130, 3), { sh: false, sway: 0 }),
    put('castle.west', 340, 400, { k: 1.0, sway: .2 }),
    put('cloud.tower', -520, 330, { lift: 0, k: 1.1, sway: .4 }),
    put('cloud.puff', 620, 470, { lift: 0, art: { w: 200, h: 90, seed: 6 } }),
    put('cloud.puff', 110, 470, { lift: 0, art: { w: 190, h: 80, seed: 9 } }),
    put('cloud.puff', -200, 180, { lift: 430, dyn: tl => ({ dx: 50 * sin(tl * .3) }) }),
    put('cloud.haze', 380, 200, { lift: 520, art: { w: 420, h: 80 }, dyn: tl => ({ dx: -40 * sin(tl * .25) }) }),
    // 雲の穴から出ている豆の木の先
    pc(-310, 640, 260, 330, A.stalk(260, 330, 4), { sway: 1.0 }),
    // ジャック: 穴から登ってきて、お城のほうへ歩く
    pc(-310, 668, 120, 226, A.jack({ armL: 150, armR: -150, mouth: 'o', look: 'up' }), { k: JK, nosplit: true, side: 'L',
      anim: many(aArm('.aR', tl => tl < CLIMB ? -150 + 24 * sin(tl * 7) : -60 + 10 * sin(tl * 3)), aArm('.aL', tl => tl < CLIMB ? 150 + 24 * sin(tl * 7 + PI) : 14, 40)),
      dyn: tl => { const c = sm(tl / CLIMB), w = sm((tl - CLIMB - .4) / 3.2); return { lift: -250 * (1 - c) + (w > 0 && w < 1 ? 9 * abs(sin(tl * 5)) : 0), dx: 190 * w, dy: 20 * w }; } }),
    put('cloud.puff', -330, 760, { lift: 0, art: { w: 380, h: 130, seed: 2 } }),
    put('cloud.puff', 420, 800, { lift: 0, art: { w: 300, h: 110, seed: 5 } }),
    twinkle(200, 420, 520, 0, 16), twinkle(480, 420, 600, 2, 13), twinkle(340, 420, 680, 4, 12),
    bird(-640, 300, 330, 40, 0, '#fff'), bird(-700, 520, 260, 34, 2, '#f6efe0'),
  ],
};

// ===== 5. 大男の部屋 =====
const EGG = 3.6;                                   // 金のたまごをうむ時刻
const snoreU = tl => (((tl - .6) / 3.9 % 1) + 1) % 1;      // いびきの1回(0→1)
const zz = i => pc(520 + i * 6, 474 - i * 2, 70, 70, A.zzz(), { sh: false, nosplit: true, sway: 0,
  dyn: tl => { const u = (((tl * .34 + i / 3) % 1) + 1) % 1; return { lift: 560 + u * 240, dx: u * 130, sc: .45 + u * .9, op: sin(u * PI), rz: 12 * sin(u * 6) }; } });
const spread5 = {
  hold: 8.5,
  music: 'creepy',
  sfx: [[.6, 'snore', { n: 2, period: 3.9 }], [EGG, 'pop'], [EGG + .3, 'sparkle', { len: 1.4 }], [6.2, 'tick']],
  ground: A.gFloor(),
  grade: () => ['#b79ac6', .3],
  caption: ['おしろには、おそろしい 大男が すんでいました。', '大男は 金のたまごを うむ めんどりを もっていました。'],
  cam: { start: { d: 560, tilt: 60, cx: 40, cz: 250 }, end: { d: 470, tilt: 60, cx: 130, cz: 270 } },
  pieces: [
    put('wall.stone', 0, 120, { sway: 0 }),
    put('room.fireplace', -440, 330, { k: 1.5 }),
    put('room.clock', -130, 300, { k: 1.25 }),
    // 大男(食卓のむこうで いねむり)
    pc(370, 470, 320, 460, A.giant({ eyes: 'closed', mouth: 'closed', brow: false, armL: 20, armR: -20 }), { k: 1.38, sway: .3,
      anim: aGiant(tl => { const u = snoreU(tl); return { hd: 7 + 5 * sin(u * 2 * PI), mouth: u < .5 ? 'open' : 'closed' }; }) }),
    put('table.dining', 372, 560, { k: 1.2, sway: .2, art: { c: '#fbf6ea', c2: '#7a6cc0' } }),
    // 食卓の上: めんどり、金のたまご、金貨
    pc(230, 554, 170, 160, A.hen(), { k: .95, lift: 240, sh: false, nosplit: true,
      anim: (tl, el, q) => { rot(qs(el, q, '.hd'), 6 * sin(tl * 3), 120, 80); rot(qs(el, q, '.wg'), tl > EGG - .5 && tl < EGG + .4 ? 18 * sin(tl * 30) : 0, 60, 90); },
      dyn: tl => ({ lift: 240 + 34 * sin(cl((tl - EGG + .35) / .7) * PI) }) }),
    pc(352, 556, 70, 84, A.egg(), { k: .9, lift: 240, sh: false, nosplit: true, glow: 16, glowC: '#ffe07a', dyn: tl => ({ sc: pop(tl, EGG), op: tl > EGG ? 1 : 0 }) }),
    twinkle(352, 558, 350, 0, 15), twinkle(410, 558, 300, 2.5, 11),
    put('item.coins', 560, 554, { lift: 240, sh: false, art: { w: 200, h: 110 } }),
    zz(0), zz(1), zz(2),
    // かくれて のぞくジャック
    pc(-300, 700, 120, 226, A.jack({ mouth: 'o', armL: 30, armR: -30 }), { k: JK, sh: false, dyn: tl => ({ lift: 112 + 40 * sin(tl * 1.5 - 1.2) }) }),
    put('tool.barrel', -300, 730, { k: 1.3 }),
    put('item.chest', -560, 650, { k: 1.2, art: { c: '#7a5236' } }),
    put('light.lamp', -90, 760, { k: .8 }),
  ],
};

// ===== 6. にげるジャック =====
const STEP = PI / 3.4;                             // 大男の足が着く間隔
const runU = tl => sm((tl - .5) / 5.8);
const spread6 = {
  hold: 7.5,
  music: 'chase',
  sfx: [[.3, 'steps', { n: 7, gap: STEP }], [1.2, 'whoosh', { len: 1 }], [4.4, 'whoosh', { len: 1 }]],
  ground: A.gSky() + A.hole(1230, 620),
  shake: tl => { const k = ((tl % STEP) + STEP) % STEP; return tl > 0 ? [0, 6 * Math.exp(-9 * k) * sin(k * 50)] : [0, 0]; },
  caption: ['ジャックは めんどりを かかえて にげだしました。', [2.2, '「まてえ!」大男が おいかけてきます。']],
  cam: { start: { d: 520, tilt: 58, cx: -160, cz: 230 }, end: { d: 460, tilt: 58, cx: 120, cz: 230 } },
  pieces: [
    pc(0, 110, 1420, 130, A.cloudBank(1420, 130, 8), { sh: false, sway: 0 }),
    put('castle.west', -440, 330, { k: .72, sway: .2 }),
    put('cloud.tower', 620, 360, { lift: 0, k: .9, sway: .4 }),
    put('cloud.puff', 200, 200, { lift: 460, dyn: tl => ({ dx: 50 * sin(tl * .3) }) }),
    put('cloud.puff', 180, 420, { lift: 0, art: { w: 220, h: 90, seed: 4 } }),
    pc(510, 610, 260, 330, A.stalk(260, 330, 4), { sway: 1.0 }),
    // 大男: 腕を振り上げて追いかける
    pc(-520, 630, 320, 460, A.giant({ mouth: 'open', armL: 150, armR: -150 }), { k: 1.3, nosplit: true, side: 'L',
      anim: aGiant(tl => ({ aL: 140 + 22 * sin(tl * 6.8), aR: -140 + 22 * sin(tl * 6.8), lL: 16 * sin(tl * 3.4), lR: -16 * sin(tl * 3.4), hd: 4 * sin(tl * 3.4) })),
      dyn: tl => ({ dx: 300 * runU(tl), lift: 20 * abs(sin(tl * 3.4)) }) }),
    // ジャック: めんどりを抱えて、背をこえて豆の木へ走る
    pc(-70, 705, 120, 226, A.jackHen(), { k: JK, nosplit: true, side: 'L',
      anim: aArm('.aR', tl => -60 + 40 * sin(tl * 10)),
      dyn: tl => { const u = runU(tl); return { dx: 420 * u, lift: u < 1 ? 16 * abs(sin(tl * 7)) : 0 }; } }),
    put('cloud.puff', -420, 790, { lift: 0, art: { w: 360, h: 120, seed: 2 } }),
    put('cloud.puff', 500, 740, { lift: 0, art: { w: 340, h: 120, seed: 7 } }),
    put('fx.surprise', -70, 700, { lift: 250, nosplit: true, k: .7, dyn: tl => ({ dx: 420 * runU(tl), sc: pop(tl, .3), op: tl > .3 && tl < 2.2 ? 1 : 0 }) }),
    bird(-700, 240, 420, 60, 1, '#fff'),
  ],
};

// ===== 7. 見せ場: 豆の木を切りたおす =====
const HIT = [1.2, 2.0, 2.8], FALL = 4.3, IMPACT = FALL + 1.45, CHEER = IMPACT + 1.0;
// ヒュー(落ちてくる音)。曲集の音色(オルゴール)を使わず、1本の澄んだ音の高さを、上から下へなめらかにすべらせる
// (S.tone のビブラートを、長さの4倍より少し長い周期・負の深さにすると、鳴っているあいだ音程が下がり続ける)
const hyuu = len => (S, t) => {
  S.tone(t, 100, .075, len - .08, -.25, { harm: [1, .1, .03], vib: -.8, vr: 1 / (4.2 * len), vd: 0, att: .07, rel: .1, rev: .45 });
  S.noise(t, len, u => 5200 - 3800 * u, u => Math.min(1, u * 10) * (1 - u) * .012, 2, -.25, .3);   // 風を切る息の音をごく弱く
};
// ドシーン!(大男と木が地面に落ちる)。低い打撃に、枝が折れる雑音・地ひびき・はね返りを重ねる
const dossin = (S, t) => {
  const v = .75;   // 全体の音量(作品でいちばん大きい音になる。上げすぎると、ほかの音と BGM が相対的に小さくなる)
  S.thud(t, .8 * v, 115, .45); S.thud(t + .03, .5 * v, 62, .9); S.thud(t + .1, .28 * v, 42, 1.2);                   // 本体(高めの芯+低い胴)
  S.noise(t, .55, u => 2600 - 2000 * u, u => (1 - u) ** 2 * .6 * v, .8, 0, .5);                            // ばきばき(枝と葉)
  S.noise(t, .12, () => 5200, u => (1 - u) ** 3 * .4 * v, .7, 0, .4, 'hp');                                // 当たった瞬間の鋭い音
  S.noise(t, 2.2, u => 700 - 520 * u, u => (1 - u) ** 2 * .4 * v, .7, 0, .7, 'lp');                        // 地ひびき
  S.thud(t + .42, .42 * v, 90, .3); S.thud(t + .7, .26 * v, 80, .25); S.thud(t + .92, .15 * v, 75, .2);              // はね返り(どん、どん…)
  [.2, .34, .5, .63, .85].forEach((d, k) => S.noise(t + d, .08, () => 1500 + 700 * k, u => (1 - u) ** 2 * .22 * v, 1.5, k % 2 ? .5 : -.5, .4));   // ぱらぱら(落ちてくるかけら)
};
const fallU = tl => Math.pow(cl((tl - FALL) / 1.45), 2.3);
const swing = tl => { let a = -150; for (const c of HIT) { const u = (tl - c + .22) / .22; if (u > 0 && u < 1) a = -150 + 105 * u * u; else if (u >= 1 && u < 2.6) a = -45 - 105 * sm((u - 1) / 1.6); } return a; };
const hitShake = tl => { let a = 0; for (const c of HIT) if (tl > c) a += 3.2 * Math.exp(-5 * (tl - c)) * sin((tl - c) * 30); return a; };
const fallDeg = tl => 88 * fallU(tl) + hitShake(tl);       // 豆の木の傾き(度)
// 豆の木をたおす dyn の値。板がページや周りの板を突き抜けると描画が乱れるので、
//   ・たおれ始める前に、X 字の2枚を1つの面にとじる(closeX)。とじたら2枚めは消す
//   ・たおれる側の下の角を中心に回す(rzX)。中央で回すと、板の半分がページの下に潜る
const STALK_W = 260, closeX = tl => sm((tl - (FALL - .5)) / .4);
const tip = tl => { const a = fallDeg(tl); return { rzBase: a, rzX: (a < 0 ? -1 : 1) * STALK_W / 2 }; };
const stalkDyn = (yw, i) => tl => Object.assign(tip(tl), { yaw: -yw * closeX(tl), op: goneOp(tl) * (i ? 1 - closeX(tl) : 1) });
const goneOp = tl => 1 - sm((tl - IMPACT - .9) / .8);
const dust = (X, Y, seed, t0) => put('fx.smoke', X, Y, { art: { w: 300, h: 130, seed }, sh: false, nosplit: true,
  dyn: tl => { const u = cl((tl - t0) / 2.2); return { sc: .3 + 1.5 * sm(u * 1.6), lift: 50 * u, op: u > 0 ? 1 - sm((u - .35) / .65) : 0 }; } });
const spread7 = {
  hold: 10.5,
  music: [[0, 'chase'], [HIT[0] - .4, 'none'], [CHEER, 'triumph']],
  sfx: [[HIT[0], 'chop'], [HIT[1], 'chop'], [HIT[2], 'chop'], [FALL - .5, 'creak', { len: .7 }],
    [FALL, hyuu(IMPACT - FALL)], [FALL + .15, 'whoosh', { len: 1.3 }],          // ヒュー(大男が木ごと落ちてくる)
    [IMPACT, dossin],    // ドシーン!
    [CHEER, 'fanfare']],
  ground: A.gMeadow({ seed: 3, pond: null, path: 'M250 470C290 600 420 700 560 760S640 880 620 920L470 920C480 860 380 800 300 720S190 600 180 470Z' }) + A.dirt(570, 608, 100, 38),
  shake: tl => { const k = tl - IMPACT; return k > 0 && k < 1.6 ? [26 * Math.exp(-3.4 * k) * sin(k * 47), 18 * Math.exp(-3.4 * k) * sin(k * 39)] : [0, 0]; },
  caption: ['ジャックは おので 豆の木を 切りました。', [IMPACT - .3, 'どしーん! 大男は 木といっしょに おちて いきました。']],
  cam: { start: { d: 330, cx: -230, cz: 170 }, keys: [[2.5, { d: 380, cx: -230, cz: 190 }], [FALL - .3, { d: 1320, tilt: 72, cy: 60, cx: -60, cz: 600 }], [IMPACT + .2, { d: 1050, tilt: 62, cx: 280, cz: 200 }], [CHEER + 1.6, { d: 330, cx: -220, cz: 160 }]], end: { d: 270, cx: -220, cz: 160 } },
  pieces: [
    farHills(6), nearHills(13),
    put('cloud.puff', 420, 130, { art: { seed: 3 }, dyn: tl => ({ dx: 40 * sin(tl * .3) }) }),
    pc(-500, 410, 420, 380, A.poorHouse(), { k: 1.0, anim: aSmoke, sway: .3 }),
    put('tree.fruit', 560, 380, { sway: 1.4, art: { fruit: '#f6c843' } }),
    put('fence.wood', 420, 470, { art: { w: 400 } }),
    put('out.well', 250, 430, { k: .9, art: { c: '#b8554a' } }),
    // 切り株(倒れはじめてから見える)
    pc(-150, 597, 200, 110, A.stump(), { dyn: tl => ({ op: tl > FALL + .25 ? 1 : 0 }) }),
    // 豆の木: 見開き3と同じ X 字の2枚組(それぞれ上下に分けてある)。おのが当たるたびにゆれ、右へ倒れて消える
    ...XYAW.flatMap((yw, i) => [
      pc(-150, 600, STALK_W, 1300 - SPLIT, A.stalkPart(260, 1300, SPLIT, 1300, i ? 8 : 3), { yaw: yw, nosplit: true, side: 'L', sway: 0, sh: i === 0, dyn: stalkDyn(yw, i) }),
      pc(-150, 600, 260, SPLIT, A.stalkPart(260, 1300, 0, SPLIT, i ? 8 : 3), { yaw: yw, nosplit: true, side: 'L', sway: 0, sh: false, lift: 1300 - SPLIT, dyn: stalkDyn(yw, i) }),
    ]),
    pc(-150, 634, 260, 70, A.stalkKnot(), { nosplit: true, side: 'L', sh: false, sway: 0, lift: 400, dyn: tl => Object.assign(tip(tl), { op: goneOp(tl) }) }),
    // 大男: 豆の木につかまって下りてくる → 木ごと振り回されて落ちる
    pc(-150, 706, 320, 460, A.giant({ eyes: 'wide', mouth: 'open', armL: 150, armR: -150, brow: false }), { k: .9, nosplit: true, side: 'L', sh: false,
      anim: aGiant(tl => { const f = tl > FALL ? 26 : 9, w = tl > FALL ? 22 : 7; return { aL: 150 + w * sin(tl * f), aR: -150 + w * sin(tl * f + 1), lL: 26 * sin(tl * f * .7), lR: -26 * sin(tl * f * .7 + .6), eyes: tl > HIT[0] ? 'wide' : 'open', mouth: tl > HIT[0] ? 'open' : 'closed' }; }),
      dyn: tl => Object.assign(tip(tl), { lift: 880 - 300 * sm(tl / (FALL - .3)), op: goneOp(tl) }) }),
    // おのの火花
    pc(-232, 702, 90, 90, A.spark(), { lift: 70, sh: false, flt: false, nosplit: true, glow: 10, glowC: '#fff3a0',
      dyn: tl => { let s = 0; for (const c of HIT) { const u = (tl - c) / .28; if (u > 0 && u < 1) s = sin(u * PI); } return { sc: .3 + s, op: s > 0 ? 1 : 0 }; } }),
    // ジャック: おのを3回ふる → ばんざい。BGM が変わる CHEER で笑顔になる
    ...swapFace(CHEER, -335, 700, A.jack({ armR: -150, holdR: A.axeHold, mouth: 'flat' }), A.jack({ armR: -150, holdR: A.axeHold, mouth: 'big' }), { k: JK,
      anim: many(aArm('.aR', tl => tl < FALL ? swing(tl) : -150 + 12 * sin(tl * 7)), aArm('.aL', tl => tl > CHEER ? 150 + 12 * sin(tl * 7 + 1) : 20, 40)),
      dyn: tl => ({ lift: tl > CHEER ? 34 * abs(sin((tl - CHEER) * 4)) : 0 }) }),
    ...swapFace(CHEER, -560, 720, A.mother({ armL: 150, armR: -150, mouth: 'o' }), A.mother({ armL: 150, armR: -150, mouth: 'big' }), { k: AD,
      anim: many(aArm('.aR', tl => -150 + 10 * sin(tl * 6)), aArm('.aL', tl => 150 + 10 * sin(tl * 6 + 1), 40)),
      dyn: tl => ({ lift: tl > CHEER ? 24 * abs(sin((tl - CHEER) * 4 + 1)) : 0 }) }),
    pc(-380, 820, 170, 160, A.hen(), { k: .9, anim: (tl, el, q) => rot(qs(el, q, '.hd'), 6 * sin(tl * 3), 120, 80) }),
    dust(260, 612, 2, IMPACT - .1), dust(450, 620, 5, IMPACT), dust(620, 608, 8, IMPACT + .1),
    put('bush.flower', 130, 800, { art: { w: 240 } }),
    put('flower.wild', 520, 830, {}),
  ],
};

// ===== 8. めでたし =====
const BOW = 1.6;                                   // 虹が出る時刻
const spread8 = {
  hold: 8,
  music: 'happy',
  sfx: [[BOW, 'magic'], [3.6, 'bell'], [5.2, 'sparkle', { len: 1.6 }]],
  ground: A.gMeadow({ seed: 12 }),
  caption: ['ジャックと おかあさんは、金のたまごの おかげで', 'いつまでも しあわせに くらしました。'],
  cam: { start: { d: 440 }, end: { d: 300, cx: -40, cz: 170 } },
  pieces: [
    farHills(2), 
    put('sky.rainbow', 0, 170, { art: { w: 1060, h: 500 }, dyn: tl => ({ sc: pop(tl, BOW, .9), op: tl > BOW ? 1 : 0 }) }),
    put('sky.sun', -520, 300, { lift: 380, glow: 30 }),
    put('cloud.puff', 480, 300, { lift: 420, dyn: tl => ({ dx: 40 * sin(tl * .3) }) }),
    pc(-380, 450, 420, 380, A.poorHouse({ fancy: true }), { k: 1.15, anim: aSmoke, sway: .3 }),
    put('tree.fruit', 560, 430, { sway: 1.4, art: { fruit: '#f6c843' } }),
    put('flower.sunflower', -640, 560, { k: .8 }),
    put('farm.cow', 420, 620, { k: 1.15, flip: true }),
    pc(-240, 690, 120, 226, A.mother({ armL: 150, armR: -150, mouth: 'big' }), { k: AD,
      anim: many(aArm('.aR', tl => -150 + 16 * sin(tl * 6)), aArm('.aL', tl => 150 + 16 * sin(tl * 6 + 1), 40)), dyn: jump(30, 3.6, 1) }),
    pc(-90, 710, 120, 226, A.jack({ armL: 150, armR: -150, mouth: 'big' }), { k: JK,
      anim: many(aArm('.aR', tl => -150 + 18 * sin(tl * 7)), aArm('.aL', tl => 150 + 18 * sin(tl * 7 + 1), 40)), dyn: jump(44, 4) }),
    pc(130, 730, 170, 160, A.hen(), { k: .95, anim: (tl, el, q) => { rot(qs(el, q, '.hd'), 7 * sin(tl * 3), 120, 80); rot(qs(el, q, '.wg'), 10 * sin(tl * 9), 60, 90); }, dyn: jump(12, 5, 2) }),
    put('tool.basket', 300, 770, { k: .85, art: { c: '#c9a35a' } }),
    pc(272, 768, 70, 84, A.egg(), { k: .7, lift: 104, sh: false, glow: 14, glowC: '#ffe07a' }),
    pc(326, 768, 70, 84, A.egg(), { k: .7, lift: 104, sh: false, glow: 14, glowC: '#ffe07a' }),
    pc(299, 766, 70, 84, A.egg(), { k: .7, lift: 128, sh: false, glow: 14, glowC: '#ffe07a' }),
    twinkle(300, 772, 250, 0, 16), twinkle(360, 772, 190, 2, 12), twinkle(240, 772, 200, 4, 12),
    put('flower.tulip', -580, 800, { k: .7 }),
    put('grass.flowers', 560, 830, {}),
    put('bush.flower', -330, 840, { art: { w: 240, h: 100 } }),
    fly(80, 840, '#ff9ecb', 0), fly(520, 760, '#ffd24d', 2), bird(-300, 300, 470, 34, 0),
  ],
};

Tobidas.book({
  title: 'ジャックと豆の木 とびだすえほん',
  lang: 'ja',
  theme: { board: '#1f5a3e', spine: '#12392a', style: 'kirigami', desk: 'wood' },
  sound: { set: 'musicbox' },
  cover: A.cover(),
  end: { title: 'おしまい', sub: 'ジャックと豆の木' },
  spreads: [spread1, spread2, spread3, spread4, spread5, spread6, spread7, spread8],
});
