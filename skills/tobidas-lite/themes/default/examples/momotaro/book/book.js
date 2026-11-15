// ============================================================
// ももたろう(英語版)の見開き。1枚ずつ作り、そのつど check.mjs で確かめる。
// 座標: 見開き 1440×920、X=-720(左端)..+720(右端)、背(x=0)を挟む。
//        Y=0(奥)..920(手前)。pc(X,Y,w0,h0,art,設定) は足元の中心を (X,Y) に置く。
// ============================================================

// 見開き1: 川辺の老夫婦
const sp1 = {
  hold: 7.5,
  music: 'gentle',
  sfx: [[2.6, 'splash'], [5.3, 'splash']],
  ground: A.gMeadow({ seed: 7, pond: false, path: 'M1330 920C1210 800 1020 690 860 630S560 560 470 560L470 490C600 490 760 540 900 600C1060 670 1240 800 1400 920Z' }),
  caption: [
    'Long ago, an old man and an old woman',
    'lived in a village by the river.',
  ],
  pieces: [
    // 遠くの丘と手前の丘(-wide panels: 背をまたぐので自動で山折り)
    pc(0, 40, 1400, 230, A.hills(1400, 230, '#a5d3e2', '#7cbf66', 2), { sh: false, delay: 0 }),
    pc(0, 190, 1300, 200, A.hills(1300, 200, '#7cbf66', '#5aa64e', 9, 1), { sh: false, delay: 0 }),
    put('sky.sun', -500, 130, { lift: 380, delay: .1 }),
    // 茅葺きの家(煙突から煙)
    put('house.machiya', -330, 600, { k: .95, sway: .18, delay: .25, art: { c: '#f3ead8', c2: '#56627a' } }),
    put('tree.fruit', -165, 560, { k: .9, delay: .35, art: { fruit: '#f6b06a' } }),
    put('conifer.pine', 560, 520, { k: .8, c: '#5aa64e', delay: .4 }),
    // 川(右ページに収める)と川辺の老婆
    put('water.river', 330, 800, { art: { w: 620, h: 150 }, c: '#6fb8e4', delay: .5 }),
    put('elder.baba', 230, 850, { k: .95, delay: .6, anim: aArm('.aR', tl => -30 + 55 * sin(tl * 2.6 + 1.2), 80) }),
    put('elder.jiji', -480, 780, { k: .95, delay: .7 }),
    pc(620, 880, 220, 130, A.bush(220, 130, '#5aa64e'), { k: 1, delay: .8 }),
    // 横切る鳥
    bird(-560, 200, 300, 26, .6, '#3a5a78'),
  ],
};

// 見開き2(★見せ場): 桃が割れて赤ん坊
const SPLIT = 4.6;
const sp2 = {
  hold: 9.2,
  music: [[0, 'bright'], [SPLIT - .2, 'none'], [SPLIT + 1.1, 'happy']],
  sfx: [[1.8, 'splash'], [SPLIT, 'crash'], [SPLIT + 1.3, 'sparkle'], [SPLIT + 1.3, 'rise', { len: 1 }]],
  shake: tl => { const u = tl - SPLIT; return (u > 0 && u < .5) ? [9 * sin(tl * 52) * (1 - u / .5), 5 * sin(tl * 43) * (1 - u / .5)] : [0, 0]; },
  ground: A.gMeadow({ seed: 11, pond: false, path: false }),
  caption: [
    'The giant peach split with a crack,',
    [SPLIT + 1.2, 'and a little boy appeared inside.'],
  ],
  pieces: [
    pc(0, 40, 1400, 230, A.hills(1400, 230, '#a5d3e2', '#7cbf66', 2), { sh: false, delay: 0 }),
    put('sky.sun', -500, 130, { lift: 380, delay: .1 }),
    put('water.river', 330, 780, { art: { w: 620, h: 170 }, c: '#6fb8e4', delay: .5 }),
    // 割れた桃の左右(閉じたときは貼り合っていて、SPLIT で左右へ弾ける)
    pc(218, 640, 320, 360, A.peachHalf(), {
      side: 'R', nosplit: true, k: .667, shOp: .3, delay: .6,
      dyn: tl => { const u = sm((tl - SPLIT) / .55); return { op: sm((tl - SPLIT + .06) / .18), dx: -55 * u, rz: -16 * u, lift: 14 + 7 * sin(tl * 1.9), sc: 1 + .16 * u }; },
    }),
    pc(432, 640, 320, 360, A.peachHalf({ flip: true }), {
      side: 'R', nosplit: true, k: .667, shOp: .3, delay: .7,
      dyn: tl => { const u = sm((tl - SPLIT) / .55); return { op: sm((tl - SPLIT + .06) / .18), dx: 55 * u, rz: 16 * u, lift: 14 + 7 * sin(tl * 1.9 + 1), sc: 1 + .16 * u }; },
    }),
    // まるごと一つの桃(4.6秒にぱりんと割れて上2枚へ)
    pc(325, 634, 640, 394, A.peachWhole(), {
      side: 'R', nosplit: true, k: .667, shOp: .3, delay: .65,
      dyn: tl => { const u = sm((tl - SPLIT) / .14); return { op: 1 - u, sc: 1 + .12 * u, lift: 14 + 7 * sin(tl * 1.9) }; },
    }),
    // 桃の中から男の子(ぴょこん)
    pc(325, 640, 130, 120, A.baby(), {
      side: 'R', nosplit: true, k: 1.25, lift: 30, sh: false, delay: .75,
      dyn: tl => ({ lift: 30 + 10 * sin(tl * 2.2), sc: pop(tl, SPLIT + 1.15, .8) }),
    }),
    twinkle(150, 560, 330, .3, 21, '#ffe9a0'),
    twinkle(490, 540, 360, 1.4, 18, '#ffe9a0'),
    twinkle(320, 430, 420, 2.5, 20, '#fff3d0'),
    // 驚く老夫婦(左ページ)
    put('elder.jiji', -180, 810, { k: .95, art: { mouth: 'o', armR: -130 }, delay: .8 }),
    put('elder.baba', -400, 840, { k: .95, art: { mouth: 'o', armL: 130, armR: -130 }, delay: .9 }),
    pc(-600, 880, 220, 130, A.bush(220, 130, '#5aa64e'), { delay: 1 }),
  ],
};

// 見開き3: 成長した男の子、鬼ヶ島へ行きると告げる
const sp3 = {
  hold: 7.5,
  music: 'bright',
  sfx: [[1.2, 'bell'], [3.4, 'wind'], [5.8, 'chime']],
  ground: A.gMeadow({ seed: 3, pond: false }),
  caption: [
    'The boy grew strong and brave.',
    [3.2, 'I will go to Onigashima, he said.'],
  ],
  pieces: [
    pc(0, 40, 1400, 230, A.hills(1400, 230, '#a5d3e2', '#7cbf66', 2), { sh: false, delay: 0 }),
    pc(0, 190, 1200, 190, A.hills(1200, 190, '#7cbf66', '#5aa64e', 6, 1), { sh: false, delay: 0 }),
    put('sky.sun', 520, 120, { lift: 380, delay: .1 }),
    put('house.machiya', -360, 560, { k: .9, sway: .18, delay: .25, art: { c: '#f3ead8', c2: '#56627a' } }),
    put('tree.fruit', -160, 540, { k: .85, delay: .3, art: { fruit: '#f6b06a' } }),
    // 鳥居(右ページ奥)
    put('shrine.torii', 430, 320, { k: .7, delay: .35, sh: false }),
    put('conifer.pine', 250, 480, { k: .7, c: '#5aa64e', delay: .4 }),
    // 驚く両親(左)
    put('elder.jiji', -430, 790, { k: .95, delay: .55, art: { mouth: 'o' } }),
    put('elder.baba', -580, 810, { k: .95, delay: .65, art: { mouth: 'o', armL: 55 } }),
    // 男の子(剣を掲げて宣言)。描き下ろし
    pc(150, 830, 120, 226, A.momoSword({ mouth: 'big' }), {
      k: 1, delay: .5,
      anim: aArm('.aR', tl => -140 + 22 * sin(tl * 4.2), 80),
    }),
    pc(430, 890, 220, 130, A.bush(220, 130, '#5aa64e'), { delay: .8 }),
    bird(200, 180, 320, 34, 1.2, '#3a5a78'),
  ],
};

// 見開き4: 犬・猿・キジがきびだんごをもらってともに行く
const POP = [1.6, 2.5, 3.4];
const sp4 = {
  hold: 7.8,
  music: 'happy',
  sfx: [[POP[0], 'pop'], [POP[1], 'pop'], [POP[2], 'pop'], [5.2, 'chime']],
  ground: A.gMeadow({ seed: 5, pond: false }),
  caption: [
    'Each friend received a kibi dango,',
    [2.6, 'and swore to go along with him.'],
  ],
  pieces: [
    pc(0, 40, 1400, 230, A.hills(1400, 230, '#a5d3e2', '#7cbf66', 2), { sh: false, delay: 0 }),
    put('sky.sun', -520, 130, { lift: 380, delay: .1 }),
    put('tree.fruit', 590, 520, { k: .8, delay: .3, art: { fruit: '#f6b06a' } }),
    put('conifer.pine', -140, 500, { k: .75, c: '#5aa64e', delay: .35 }),
    // 男の子(きびだんごの串を持ってさし出す)
    pc(-420, 830, 120, 226, A.momo({ holdR: A_dangoHold(), mouth: 'big' }), {
      k: 1, delay: .45,
      anim: aArm('.aR', tl => -65 + 16 * sin(tl * 2.8), 80),
    }),
    // 三匹がひとつずつ/pop() でぴょこんと現れる
    put('dog.shiba', -230, 800, {
      k: 1.1, delay: .5,
      dyn: tl => ({ sc: pop(tl, POP[0], .8) }),
    }),
    put('wild.monkey', 110, 810, {
      k: .92, delay: .6,
      dyn: tl => ({ sc: pop(tl, POP[1], .8), lift: tl > POP[1] + 1 ? 16 * Math.abs(sin(tl * 3)) : 0 }),
    }),
    pc(370, 800, 240, 250, A.pheasant(), {
      k: .88, delay: .7, lift: 10,
      dyn: tl => ({ sc: pop(tl, POP[2], .9), lift: 10 + (tl > POP[2] + 1 ? 22 * Math.abs(sin(tl * 2.6)) : 0) }),
      anim: aFlap(5.5, 62),
    }),
    pc(-230, 640, 44, 44, A.star(22, 22, 19, "#ffe9a0"), { nosplit: true, sh: false, sway: 0, glow: 10, lift: 240, delay: .7, dyn: tl => { const u = pop(tl, POP[0] + .3, .6); return { sc: u > 0 ? u * (1 + .35 * sin(tl * 2.4)) : 0 }; } }),
    pc(110, 660, 42, 42, A.star(21, 21, 18, "#ffe9a0"), { nosplit: true, sh: false, sway: 0, glow: 10, lift: 260, delay: .7, dyn: tl => { const u = pop(tl, POP[1] + .3, .6); return { sc: u > 0 ? u * (1 + .35 * sin(tl * 2.2 + 1)) : 0 }; } }),
    pc(370, 650, 44, 44, A.star(22, 22, 19, "#ffe9a0"), { nosplit: true, sh: false, sway: 0, glow: 10, lift: 250, delay: .7, dyn: tl => { const u = pop(tl, POP[2] + .3, .6); return { sc: u > 0 ? u * (1 + .35 * sin(tl * 2.6 + 2)) : 0 }; } }),
    pc(600, 890, 230, 130, A.bush(230, 130, '#5aa64e'), { delay: .85 }),
  ],
};

// 見開き5: 海を渡って鬼ヶ島へ(遠くに島の山)
const sp5 = {
  hold: 7.5,
  music: 'airy',
  sfx: [[1.4, 'wind'], [3.2, 'splash'], [5.4, 'splash']],
  ground: A.gSea({}),
  caption: [
    'They sailed over the bright blue sea,',
    [3.0, 'toward the island of the ogre.'],
  ],
  pieces: [
    put('sky.sun', 560, 110, { lift: 380, delay: .1 }),
    // 遠くの鬼ヶ島の山(右奥)
    put('mountain.gentle', 350, 300, { k: 1, delay: .25, sh: false, sway: 0, art: { w: 640, h: 250, c: '#5a5a6e', c2: '#46465c' } }),
    // 家来たちを乗せた船(描き下ろし)。ゆらゆら
    pc(375, 700, 840, 500, A.shipParty(), {
      k: .8, delay: .45, sh: false,
      dyn: tl => ({ lift: 16 + 9 * sin(tl * 1.7 + .4), rz: 2.6 * sin(tl * 1.7 + 1.2) }),
    }),
    // かもめ
    bird(-420, 260, 300, 30, .8, '#f4efe4'),
    bird(-560, 200, 330, 24, 2.1, '#f4efe4'),
    // 手前の波(左)
    put('water.river', -420, 850, { k: 1, delay: .7, art: { w: 520, h: 130 }, c: '#3f88b8' }),
  ],
};

// 見開き6: 夜のような鬼ヶ島に上陸、鬼がどおんと現れる
const ROAR = 1.9;
const sp6 = {
  hold: 7.8,
  music: 'creepy',
  sfx: [[1.0, 'wind'], [ROAR, 'thud'], [ROAR + .2, 'crash'], [4.8, 'thud']],
  shake: tl => { const u = tl - ROAR; return (u > 0 && u < .45) ? [7 * sin(tl * 55) * (1 - u / .45), 5 * sin(tl * 47) * (1 - u / .45)] : [0, 0]; },
  grade: tl => ['#181838', .45],
  ground: A.gRock({}),
  caption: [
    'At last they reached Onigashima.',
    [ROAR + .4, 'A great ogre roared out at them.'],
  ],
  pieces: [
    pc(0, 40, 1400, 230, A.hills(1400, 230, '#4a4a5e', '#3a3a4e', 4), { sh: false, delay: 0 }),
    put('sky.moon', -500, 140, { lift: 380, delay: .1 }),
    put('sky.stars', -100, 150, { delay: .15, seed: 7 }),
    put('gate.castle', 400, 320, { k: .72, delay: .25, art: { c: '#41415a', c2: '#2e2e42' } }),
    put('conifer.pine', -320, 570, { k: .9, delay: .35, sway: 1.2, art: { c: '#2e4038' } }),
    put('conifer.pine', -550, 470, { k: .7, delay: .4, sway: 1.0, art: { c: '#26362f' } }),
    // 鬼(thud でどおんと現れる)。描き下ろし
    pc(330, 640, 240, 330, A.oni({ mouth: 'open', club: true, armR: -142 }), {
      k: 1.15, delay: .5, sh: false, nosplit: true, side: 'R',
      dyn: tl => ({ sc: pop(tl, ROAR, .85), lift: 8 * sin(tl * 1.3) }),
    }),
    // 家来たち(左)
    put('wild.monkey', -520, 790, { k: .75, delay: .6, art: { c: '#8a6a48', c2: '#6a4e34' } }),
    put('dog.shiba', -360, 800, { k: .9, delay: .55, art: { c: '#b8885a', c2: '#96683f' } }),
    pc(-180, 830, 120, 226, A.momo({ mouth: 'big', armR: -150 }), {
      k: .95, delay: .5,
      anim: aArm('.aR', tl => tl < ROAR ? -150 : -150 + 26 * sin(tl * 5), 80),
    }),
    pc(120, 880, 240, 130, A.bush(240, 130, '#2e4038', '#26362f'), { delay: .8 }),
  ],
};

// 見開き7: Highlight — 鬼ヶ島の城、戦い、鬼の降参
const CHOPS = [1.2, 2.4], CRASH = 3.7, YIELD = 5.4, TURN = 6.2;
const sp7 = {
  hold: 9.5,
  music: [[0, 'chase'], [TURN, 'triumph']],
  sfx: [[CHOPS[0], 'chop'], [CHOPS[1], 'chop'], [CRASH, 'crash'], [CRASH + .7, 'whoosh'], [TURN, 'fanfare']],
  shake: tl => {
    const u = tl - CRASH;
    return (u > 0 && u < .6) ? [10 * sin(tl * 58) * (1 - u / .6), 7 * sin(tl * 49) * (1 - u / .6)] : [0, 0];
  },
  grade: tl => tl < TURN ? ['#181838', .42 * (1 - sm((tl - TURN + 1) / 2))] : ['#181838', 0],
  cam: { start: { d: 930, tilt: 62, cz: 300 }, keys: [[CRASH, { d: 850, cz: 330 }], [TURN, { d: 900, cz: 315 }]], end: { d: 880, cz: 320 } },
  ground: A.gRock({ yard: true }),
  caption: [
    'The ogre dropped his club and yielded.',
    [YIELD + .6, 'We will never hurt anyone again.'],
  ],
  pieces: [
    pc(0, 40, 1400, 230, A.hills(1400, 230, '#4a4a5e', '#3a3a4e', 4), { sh: false, delay: 0 }),
    put('sky.moon', 540, 130, { lift: 380, delay: .1 }),
    // 鬼ヶ島の城(terrace が 0〜2.2 秒でせり上がる)
    ...terrace({
      X: 0, Y: 590, tiers: A.oniCastleTiers(),
      fold: -28,
      dyn: tl => ({ sink: (1 - sm(tl / 2.2)) * 640, op: sm(tl / 1.4) }),
    }),
    // 鬼:刀の衝撃でたじろぎ、5.4秒で棒を捨て手を上げて降参
    pc(-70, 690, 240, 330, A.oni({ mouth: 'open', club: true, armR: -142 }), {
      k: 1.05, delay: .8, sh: false, nosplit: true, side: 'L',
      dyn: tl => {
        const r = sm((tl - CRASH) / .5) * sm((TURN + .8 - tl) / .6);
        return { dx: -26 * r, rz: 7 * r, lift: 0 };
      },
      anim: (tl, el, q) => {
        const yieldOn = tl > YIELD;
        rot(qs(el, q, '.aR'), yieldOn ? -165 : (tl < CRASH ? -130 + 40 * sin(tl * 6) : -60), 178, 118);
        rot(qs(el, q, '.aL'), yieldOn ? 165 : 20, 62, 118);
        const mo = qs(el, q, '.mo'), mc = qs(el, q, '.mc');
        if (mo && mc) { mo.style.display = yieldOn ? 'none' : ''; mc.style.display = yieldOn ? '' : 'none'; }
        const cb = qs(el, q, '.club'); if (cb) cb.style.display = yieldOn ? 'none' : '';
      },
    }),
    // 男の子(刀を振り下ろす)。dyn の sc は細工せず、anim の腕だけで刻む
    pc(280, 800, 120, 226, A.momoSword({ mouth: 'big' }), {
      k: .95, delay: .5,
      anim: (tl, el, q) => {
        let a = -150;
        if (tl < .9) a = -150 + 30 * sin(tl * 9);
        else if (tl < TURN) {
          const p1 = sm((tl - CHOPS[0]) / .35), p2 = sm((tl - CHOPS[1]) / .35);
          a = -150 + 120 * Math.max(p1 * sm((CHOPS[0] + .5 - tl) / .35), p2 * sm((CHOPS[1] + .5 - tl) / .35));
        } else a = -95 + 10 * sin(tl * 2.2);
        rot(qs(el, q, '.aR'), a, 80, 100);
      },
    }),
    // 家来:しかける犬、飛び回る猿とキジ
    put('dog.shiba', 120, 840, {
      k: .9, delay: .6, art: { c: '#b8885a', c2: '#96683f' },
      dyn: tl => ({ dx: 26 * sm((tl - CRASH) / .8), lift: 14 * Math.abs(sin(tl * 4)) }),
    }),
    put('wild.monkey', 440, 810, {
      k: .78, delay: .7, art: { c: '#8a6a48', c2: '#6a4e34' },
      dyn: tl => ({ lift: 34 * Math.abs(sin(tl * 3.4 + 1)) }),
    }),
    pc(580, 800, 240, 250, A.pheasant({ flip: true }), {
      k: .8, delay: .75,
      dyn: tl => ({ dx: -40 * sm((tl - CRASH) / 1.2), lift: 26 * Math.abs(sin(tl * 3 + 2)) }),
      anim: aFlap(7, 62),
    }),
    // 衝撃の星のspark
    pc(-70, 560, 46, 46, A.star(23, 23, 20, '#ffe9a0'), {
      nosplit: true, sh: false, sway: 0, glow: 14, lift: 210, delay: .7,
      dyn: tl => { const u = pop(tl, CRASH + .15, .5); return { sc: u > 0 ? u * (1.3 - .3 * sm((tl - CRASH) / 1.2)) : 0 }; },
    }),
  ],
};

// 見開き8: 宝を持って帰り、みんなしあわせ
const sp8 = {
  hold: 8,
  music: 'happy',
  sfx: [[.8, 'fanfare'], [2.6, 'sparkle'], [4.6, 'sparkle'], [5.8, 'chime']],
  ground: A.gMeadow({ seed: 7, pond: false }),
  caption: [
    'Home at last with treasure and joy,',
    [2.8, 'they all lived happy ever after.'],
  ],
  pieces: [
    pc(0, 40, 1400, 230, A.hills(1400, 230, '#a5d3e2', '#7cbf66', 2), { sh: false, delay: 0 }),
    put('sky.sun', 540, 120, { lift: 380, delay: .1 }),
    put('house.machiya', -330, 580, { k: .92, sway: .18, delay: .25, art: { c: '#f3ead8', c2: '#56627a', c3: '#b8433a' } }),
    put('shrine.torii', 480, 330, { k: .72, delay: .3, sh: false }),
    put('tree.fruit', -140, 530, { k: .8, delay: .35, art: { fruit: '#f6b06a' } }),
    // 迎えるじい様とばあ様(両手を上げて喜ぶ)
    put('elder.jiji', -640, 800, { k: .95, delay: .5, art: { mouth: 'big', armR: -140 }, anim: aArm('.aR', tl => -140 + 18 * sin(tl * 3.2), 80) }),
    put('elder.baba', -490, 820, { k: .95, delay: .6, art: { mouth: 'big', armL: 140, armR: -140 }, anim: (tl, el, q) => { aArm('.aR', tl => -140 + 16 * sin(tl * 3.2 + 1), 80)(tl, el, q); rot(qs(el, q, '.aL'), 140 - 16 * sin(tl * 3.2 + 2), 40, 100); } }),
    // 男の子(宝の旗を振る)
    pc(-260, 830, 120, 226, A.momo({ mouth: 'big', armR: -150 }), {
      k: 1, delay: .45,
      anim: aArm('.aR', tl => -150 + 20 * sin(tl * 3.6), 80),
    }),
    // 家来たちはねんねこ jump
    put('dog.shiba', 130, 850, { k: 1, delay: .7, dyn: tl => ({ lift: 22 * Math.abs(sin(tl * 3)) }) }),
    put('wild.monkey', 300, 830, { k: .8, delay: .75, dyn: tl => ({ lift: 26 * Math.abs(sin(tl * 3 + 1)) }) }),
    pc(450, 830, 240, 250, A.pheasant(), {
      k: .78, delay: .8,
      dyn: tl => ({ lift: 20 * Math.abs(sin(tl * 3 + 2)) }),
      anim: aFlap(5, 62),
    }),
    // 宝物
    pc(570, 780, 260, 140, A.coins(260, 140), { k: 1, delay: .55 }),
    pc(500, 640, 42, 42, A.star(21, 21, 18, '#ffe9a0'), { nosplit: true, sh: false, sway: 0, glow: 12, lift: 250, delay: .6, dyn: tl => { const u = pop(tl, 2.2, .6); return { sc: u > 0 ? u * (1 + .35 * sin(tl * 2.2)) : 0 }; } }),
    pc(650, 650, 40, 40, A.star(20, 20, 17, '#ffe9a0'), { nosplit: true, sh: false, sway: 0, glow: 12, lift: 240, delay: .6, dyn: tl => { const u = pop(tl, 4.2, .6); return { sc: u > 0 ? u * (1 + .35 * sin(tl * 2.4 + 1)) : 0 }; } }),
    put('fest.flag', 620, 470, { k: .8, delay: .4, art: { c: '#f3c64f' } }),
    bird(-450, 190, 330, 28, 1.4, '#3a5a78'),
  ],
};

Tobidas.book({
  title: 'Momotaro',
  lang: 'en',
  theme: { board: '#c0453a', spine: '#8f2e24', style: 'popart', desk: 'meadow', font: ENF },
  sound: { set: 'wafu' },
  cover: A.cover(),
  end: { title: 'The End', sub: 'Momotaro' },
  spreads: [
    sp1,
    sp2,
    sp3,
    sp4,
    sp5,
    sp6,
    sp7,
    sp8,
  ],
});
