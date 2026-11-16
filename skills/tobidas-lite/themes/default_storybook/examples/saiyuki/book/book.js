const hold = 7.8;
const hatch = 2.15;
const progress = (t, start, duration) => sm((t-start)/duration);
const bob = (t, rate = 4) => 5 * abs(sin(t*rate));

const ridge = (height, y, color, seed) =>
  pc(0, y, 1390, height, A.peaks(1390, height, color, seed), { sh: false, sway: 0, fold: -12 });

const person = (art, x, y, k, options = {}) =>
  pc(x, y, 142, 226, `<g transform="translate(11 0)">${art}</g>`, { k, nosplit: true, ...options });

const peach = (x, y, k, c) => put('tree.fruit', x, y, {
  k, art: { c, c2: '#4e986f', c3: '#76b67e', fruit: '#f79487' }, sway: 1.3,
});
const rock = (x, y, k, c) => put('rock.round', x, y, { k, art: { c }, sway: 0 });
const pine = (x, y, k, c) => put('conifer.pine', x, y, { k, art: { c }, sway: .6 });
const reed = (x, y, k, c) => put('grass.reed', x, y, { k, art: { c }, sway: 1.7 });

const spreads = [{
  hold, scene: A.journeyScene('birth', 4), music: 'bright',
  ground: A.journeyGround('#82ac77', '#548b72', '#ded09c'),
  caption: ['花果山上，一块石头裂开了。', '一只小猴从里面蹦了出来！'],
  sfx: [[hatch, 'crash', { vol: .55 }], [hatch+.33, 'pop'], [hatch+.48, 'sparkle']],
  cam: { start: { d: 515, cz: 145 }, keys: [[3.1, { d: 310, cx: 205, cz: 205 }]], end: { d: 420, cx: 110, cz: 160 } },
  pieces: [
    ridge(255, 90, '#6d9a99', 8), ridge(200, 225, '#578d80', 21),
    pc(-350, 320, 280, 380, A.waterfall(), {
      sway: 0, anim: (t, el, q) => qs(el, q, '.foam').setAttribute('transform', `translate(${F(7*sin(6*t))} 0)`),
    }),
    pine(-604, 276, .64, '#3e7167'), pine(515, 255, .59, '#608c6c'),
    peach(535, 410, .80, '#2e6e58'), peach(-552, 473, .69, '#42856a'),
    rock(-520, 570, .47, '#647a81'), rock(575, 643, .52, '#6c7380'),
    rock(295, 622, .69, '#676c80'),
    person(A.wukong({ cub: true, weapon: null, armR: -147 }), 292, 643, 1.20, {
      dyn: t => {
        const u = progress(t, hatch+.10, .76);
        const jump = sin(Math.PI * u);
        return { op: u > 0 ? 1 : 0, lift: -146*(1-u) + 208*jump, rz: -20*jump };
      },
    }),
    ...[-1, 1].map(side => pc(290 + side*63, 688, 130, 145, A.stoneShell(side), {
      sway: 0, nosplit: true,
      dyn: t => {
        const u = progress(t, hatch, .65);
        return { dx: side*111*u, rz: side*57*u, lift: 65*sin(Math.PI*u) };
      },
    })),
    reed(-615, 740, .46, '#3d785b'), reed(590, 787, .44, '#568a5b'),
    rock(-143, 780, .44, '#719287'),
  ],
}];

const release = 1.85;
spreads.push({
  hold, scene: A.journeyScene('valley', 27), music: 'gentle',
  ground: A.journeyGround('#a5918b', '#746982', '#eac3a1'),
  caption: ['唐僧救出了压在山下的孙悟空。', '悟空跟着师父，一路向西。'],
  sfx: [[release, 'creak'], [release+.62, 'thud', { vol: .3 }], [release+1.04, 'chime']],
  cam: { start: { d: 455, cz: 174 }, end: { d: 355, cx: -25, cz: 160 } },
  pieces: [
    ridge(324, 100, '#856d86', 11), ridge(211, 255, '#705b76', 7),
    put('rock.sharp', -480, 362, { k: 1.42, art: { c: '#6d627c' }, sway: 0 }),
    put('rock.sharp', -289, 448, { k: 1.03, art: { c: '#85738b' }, sway: 0 }),
    put('rock.sharp', 523, 405, { k: 1.34, art: { c: '#836986' }, sway: 0 }),
    pine(-592, 391, .49, '#575a6f'), pine(520, 503, .66, '#696781'),
    rock(-530, 629, .59, '#826f83'), rock(505, 660, .51, '#988182'),
    person(A.wukong({ weapon: null, armR: -75 }), -279, 580, 1.35, {
      dyn: t => {
        const u = progress(t, release+.18, .88);
        return { lift: -133*(1-u), dy: 34*u, dx: 43*u, rz: -16*(1-u) };
      },
    }),
    put('rock.pile', -285, 624, {
      k: 1.08, art: { c: '#6f637c' }, sway: 0, nosplit: true,
      dyn: t => {
        const u = progress(t, release, .76);
        return { dx: -146*u, dy: -20*u, rz: -58*u, lift: 25*sin(Math.PI*u) };
      },
    }),
    person(A.tang(), 193, 621, 1.42, {
      anim: (t, el, q) => rot(qs(el,q,'.aR'), -19 - 81*progress(t,release+1.2,.65), 80,100),
    }),
    rock(-622, 787, .50, '#77627d'), rock(575, 787, .54, '#8d7082'),
    reed(-143, 811, .43, '#786b68'), reed(645, 829, .42, '#8b7966'),
  ],
});

const bank = 1.45;
const stream = 2.55;
spreads.push({
  hold, scene: A.journeyScene('river', 33), music: 'airy',
  ground: A.journeyGround('#9caf86', '#668c8b', '#e1cba8', 'river'),
  caption: ['猪八戒和沙悟净也加入了队伍。', '四个人一起去西天取经。'],
  sfx: [[bank, 'steps', { n: 4, gap: .29 }], [stream, 'splash'], [stream+.8, 'chime']],
  cam: { start: { d: 420, cz: 172 }, end: { d: 375, cz: 168 } },
  pieces: [
    ridge(255, 95, '#8aafb0', 44), ridge(193, 230, '#6f9695', 31),
    put('tree.willow', -520, 395, { k: .93, art: { c: '#42867a' }, sway: 1.1 }),
    put('tree.bamboo', 534, 390, { k: .74, art: { c: '#397e6e' }, sway: 1.3 }),
    put('tree.willow', 230, 345, { k: .53, art: { c: '#658e69' }, sway: 1.2 }),
    reed(-555, 535, .49, '#487e68'), reed(598, 509, .62, '#578978'),
    reed(464, 620, .39, '#619475'),
    put('water.wave', 249, 502, { art: { w: 307, h: 51, c: '#8bcac2', c2: '#d5ede0' }, sway: 0 }),
    rock(-566, 692, .47, '#668486'), rock(625, 730, .56, '#718184'),
    person(A.wukong(), -128, 751, 1.21, { dyn: t => ({ lift: 2*abs(sin(t*4)) }) }),
    person(A.tang(), 120, 716, 1.29),
    person(A.bajie(), -399, 756, 1.29, {
      dyn: t => {
        const u = progress(t, bank, 1);
        return { dx: -112*(1-u), dy: -78*(1-u), lift: -95*(1-u)+bob(t,10)*sin(Math.PI*u) };
      },
    }),
    person(A.wujing(), 374, 685, 1.31, {
      dyn: t => {
        const u = progress(t, stream, .88);
        return { dy: -118*(1-u), lift: -135*(1-u)+12*sin(Math.PI*u) };
      },
    }),
    reed(-601, 783, .55, '#3c6e5f'), reed(541, 820, .50, '#587759'),
    rock(-245, 829, .43, '#87907c'),
  ],
});
const embers = (color, seed) => Array.from({ length: 4 }, (_, i) => {
  const x = (i%2 ? 1 : -1) * (225+i*90);
  return pc(x, 275+i*44, 62, 75, `<path d="M12 58l8-12 8 6-6 10zm26-21 6-11 7 6-7 10zm9 26 8-10 7 5-9 11z" fill="${color}"/>`, {
    lift: 165+i*27, flt: false, sh: false, nosplit: true,
    dyn: t => ({ dx: 18*sin(t+seed+i), lift: 160+i*27+28*abs(sin(t*.83+i)), op: .6+.35*sin(t*1.4+i) }),
  });
});

const wall = (x, y, width, height, seed, extinguish) =>
  pc(x, y, width, height, A.flameWall(width, height, seed), {
    sway: 0, nosplit: true, shOp: .5,
    dyn: t => {
      const gone = extinguish === undefined ? 0 : progress(t, extinguish, .94);
      return {
        op: 1-gone, lean: 76*gone, rz: 19*gone,
        sc: (1-.79*gone)*(.97+.03*sin(8*t+seed)), dy: -54*gone,
      };
    },
  });

const fireRocks = () => [
  put('rock.sharp', -518, 361, { k: 1.22, art: { c: '#6d4154' }, sway: 0 }),
  put('rock.sharp', 486, 383, { k: 1.21, art: { c: '#784459' }, sway: 0 }),
  rock(-553, 668, .62, '#84515b'), rock(545, 691, .66, '#8c5154'),
  rock(-609, 797, .56, '#ac665c'), rock(611, 811, .48, '#965456'),
];

const turnBack = 4.2;
spreads.push({
  hold, scene: A.journeyScene('fire', 59), music: 'night',
  ground: A.journeyGround('#ad7060', '#734454', '#e2ac77'),
  caption: ['火焰山挡住了去路。', '悟空转身去找铁扇公主借芭蕉扇。'],
  sfx: [[.54, 'whoosh', { len: 1.7 }], [turnBack, 'steps', { n: 4, gap: .36 }]],
  cam: { start: { d: 485, cz: 188 }, end: { d: 395, cz: 190 } },
  pieces: [
    ridge(348, 87, '#723950', 65), ridge(249, 228, '#62384d', 43),
    ...fireRocks(), ...embers('#ffc17a', 2),
    wall(-260, 431, 475, 293, 15), wall(259, 435, 491, 346, 19),
    person(A.tang(), -398, 689, 1.14), person(A.bajie(), -211, 741, 1.17),
    person(A.wujing(), 102, 695, 1.15),
    person(A.wukong(), 328, 656, 1.27, {
      dyn: t => {
        const u = progress(t, turnBack, 1.75);
        return { dx: 134*u, dy: 116*u, lift: bob(t, 13)*sin(Math.PI*u), rz: 16*sin(Math.PI*u) };
      },
    }),
  ],
});

const fanSweep = 2.90;
const clear = 4.26;
spreads.push({
  hold, scene: A.journeyScene('wind', 83), music: [[0, 'night'], [fanSweep, 'none'], [clear, 'triumph']],
  ground: A.journeyGround('#a77769', '#73495a', '#f0c994'),
  caption: ['悟空举起芭蕉扇，用力一扇。', '大火熄灭了，山路露了出来。'],
  sfx: [[fanSweep, 'whoosh', { len: 1.1 }], [fanSweep+.23, 'wind', { len: 1.8 }], [clear, 'chime']],
  cam: {
    start: { d: 478, cx: -56, cz: 184 },
    keys: [[fanSweep, { d: 330, cx: -158, cz: 235 }], [clear, { d: 470, cx: 46, cz: 182 }]],
    end: { d: 417, cx: 22, cz: 160 },
  },
  pieces: [
    ridge(300, 85, '#9c5561', 32), ridge(209, 217, '#774252', 31),
    ...fireRocks(),
    wall(-266, 341, 400, 217, 27, fanSweep+.57),
    wall(265, 337, 428, 268, 54, fanSweep+.72),
    wall(-206, 499, 273, 210, 33, fanSweep+.22),
    wall(219, 498, 414, 280, 49, fanSweep+.37),
    person(A.wukong({ weapon: 'fan', armR: -125 }), -356, 671, 1.72, {
      sway: .45,
      anim: (t, el, q) => {
        const ready = progress(t, fanSweep-1.34, .86);
        const stroke = progress(t, fanSweep, .4);
        const settle = progress(t, fanSweep+.56, .91);
        rot(qs(el,q,'.aR'), -125-102*ready+185*stroke-29*settle, 80,100);
      },
      dyn: t => ({ rz: -7*progress(t,fanSweep-.9,.65)+14*progress(t,fanSweep,.4)-7*progress(t,fanSweep+.57,.65) }),
    }),
    ...[0,1,2].map(i => pc(-285, 572-i*65, 300, 143, A.gust(), {
      k: 1.12-i*.12, lift: 140+i*40, nosplit: true, sh: false, flt: false, sway: 0,
      dyn: t => {
        const u = progress(t, fanSweep+.12*i, .83);
        return { op: sin(Math.PI*u), dx: 775*u, dy: -135*u, sc: .66+u*.37 };
      },
    })),
    person(A.tang(), 245, 707, 1.19), person(A.bajie(), 403, 747, 1.05),
    person(A.wujing(), 566, 713, 1.02),
    rock(-133, 794, .4, '#a77568'),
  ],
});
const receive = 3.58;
const riseTier = (at, h) => t => {
  const u = progress(t, at, .82);
  return { sink: h*(1-u), op: u > 0 ? 1 : 0 };
};
spreads.push({
  hold, scene: A.journeyScene('temple', 73), music: 'happy',
  ground: A.journeyGround('#aeaa88', '#898982', '#edcca0'),
  caption: ['他们终于到了西天，取到了经书。', '四个人带着经书踏上了归途。'],
  sfx: [[.2, 'rise', { len: 1.8, finish: false }], [receive, 'bell'], [receive+.72, 'chime']],
  cam: { start: { d: 690, tilt: 61, cz: 247, yaw: -6 }, end: { d: 570, tilt: 61, cz: 233, yaw: 6 } },
  pieces: [
    ridge(230, 70, '#ba9690', 13), ridge(164, 165, '#997f8e', 56),
    ...terrace({
      X: 0, Y: 603, step: 83, fold: -25,
      tiers: [
        { w: 1000, h: 61, top: '#e1b68d', art: A.templeSteps, opt: { dyn: riseTier(.18, 65) } },
        { w: 856, h: 103, top: '#d19372', art: A.templeSteps, opt: { dyn: riseTier(.36, 109) } },
        { w: 790, h: 243, top: false, art: A.templeGate, opt: { dyn: riseTier(.64, 247) } },
        { w: 690, h: 419, top: false, art: A.templeHall, opt: { dyn: riseTier(.92, 423) } },
      ],
    }),
    pine(-551, 390, .85, '#496f64'), pine(569, 361, .79, '#577b64'),
    put('shrine.hokora', -587, 544, { k: .54, art: { c: '#59817a' }, sway: 0 }),
    rock(552, 609, .59, '#968c80'), rock(-581, 663, .46, '#8d897a'),
    reed(602, 727, .44, '#767f60'),
    person(A.bajie(), -419, 720, 1.15), person(A.wujing(), 405, 737, 1.15),
    person(A.wukong(), -188, 738, 1.27),
    person(A.tang(-24), 167, 743, 1.36, {
      anim: (t, el, q) => rot(qs(el,q,'.aR'), -24-68*progress(t,receive-.42,.55), 80,100),
    }),
    pc(303, 733, 121, 90, A.scriptures(), {
      k: .82, lift: 162, nosplit: true, sh: false, sway: 0,
      dyn: t => {
        const u = progress(t, receive, .9);
        return { op: progress(t,receive,.27), dx: -76*u, dy: 25*u, lift: 232-94*u+38*sin(Math.PI*u), rz: 18*(1-u) };
      },
    }),
    rock(549, 815, .48, '#a59179'), rock(-572, 811, .5, '#938373'),
  ],
});
Tobidas.book({
  title: '西游记', lang: 'zh-CN',
  theme: {
    board: '#263960', spine: '#182342', style: 'pixel', font: chineseFont,
    desk: { base: 'game', scene: A.journeyScene('cover', 12) },
  },
  sound: { set: 'chip' },
  cover: A.cover(),
  end: { title: '故事讲完了', sub: '西游记' },
  ui: {
    hint: '滚动翻页 · ← → 切换跨页 · ▶ 或空格键有声播放',
    play: '播放（空格键）', pause: '暂停（空格键）', mute: '静音（M）', unmute: '取消静音（M）',
    style: '画风', desk: '背景', set: '音乐', ownDesk: '本书原景',
    names: {
      flat: '平涂', kirigami: '剪纸', crayon: '蜡笔', vintage: '复古', neon: '霓虹', riso: '孔版印刷',
      popart: '波普', mono: '黑白', chalk: '粉笔', pixel: '像素',
      wood: '木桌', lightwood: '浅木桌', linen: '亚麻布', felt: '毛毡', marble: '大理石',
      grass: '草地', sky: '蓝天', night: '星空', mat: '切割垫', steel: '钢板',
      seaside: '海边', meadow: '原野', forest: '森林', town: '街景', game: '复古游戏',
      musicbox: '八音盒', march: '鼓笛队', lullaby: '竖琴', wafu: '和笛', chip: '芯片音乐', off: '无音乐',
    },
  },
  spreads,
});
