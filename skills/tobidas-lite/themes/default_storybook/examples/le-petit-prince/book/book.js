const man = (x, y, flip, options) => pc(x, y, 155, 246, pilot(flip), { sway: .35, ...options });
const boy = (x, y, flip, options) => pc(x, y, 155, 219, prince(flip), {
  sway: .45,
  anim: (tl, el, q) => rot(qs(el, q, '.scarf'), (flip ? -1 : 1) * 7 * sin(tl * 2.3), 74, 112),
  ...options,
});

const dunes = (color, edge, depth, seed) =>
  pc(0, depth, 1380, 170, A.hills(1380, 170, color, edge, seed, .8), { sh: false, sway: 0 });

const desertStones = (colors, seed) => {
  const random = rnd(seed);
  return [-595, -488, -378, -115, -69, 93, 144, 417, 513, 597].map((x, i) =>
    put(i % 4 === 0 ? 'rock.sharp' : 'rock.round', x, 580 + random() * 258, {
      k: .12 + random() * .16, sway: 0, art: { c: colors[i % colors.length] },
    }));
};

const skyStar = (x, y, z, size, phase, start = -2) =>
  pc(x, y, size * 2, size * 2, star(size, size, size), {
    nosplit: true, flt: false, sh: false, sway: 0, glow: 8,
    dyn: tl => {
      const reveal = sm((tl - start) / .76);
      return { lift: z + reveal * 26 + sin(tl * 1.65 + phase) * 6,
        op: reveal * (.84 + .16 * sin(tl * 2 + phase)), sc: .6 + .4 * reveal };
    },
  });

const desert = {
  hold: 8,
  scene: princeScene('dawn'),
  ground: pageGround('#d7a378', '#bb8060', '#7f585d', 12),
  caption: ['Dans le désert, un petit garçon s’approche du pilote.',
    'Il lui demande de dessiner un mouton.'],
  music: 'gentle',
  sfx: [[.4, 'wind', { len: 2 }], [2.3, 'pop', { vol: .18 }]],
  pieces: [
    dunes('#b98279', '#d1a187', 115, 21),
    dunes('#cf9878', '#e3b488', 255, 2),
    put('air.plane', -337, 473, { k: 1.2, lift: 0, sway: 0, rz: -7, anim: null, art: { c: '#ad5546', c2: '#df9560' } }),
    put('tool.bag', -540, 561, { k: .29, art: { c: '#8f5c49' } }),
    man(-182, 670, false),
    boy(183, 680, true, { nosplit: true, dyn: tl => ({ dx: 62 * (1 - sm(tl / 3)) }) }),
    pc(378, 554, 155, 115, sheepDrawing(), {
      k: .95, nosplit: true, sway: 1.2,
      dyn: tl => ({ sc: pop(tl, 2.3), op: sm((tl - 2.3) / .45), lift: 60 }),
    }),
    ...desertStones(['#b48573', '#9b705f', '#ce9a72'], 56),
  ],
};

const princeScore = {
  inst: { mel: 'harp', comp: 'arp', fx: 'box' },
  main: {
    beats: 3, chords: ['C', 'Am', 'F', 'G', 'Em', 'Dm', 'G7', 'C'],
    mel: [
      [[0, 76], [1, 79], [2, 84]], [[0, 81], [1.5, 79], [2, 76]],
      [[0, 77], [1, 81], [2, 84]], [[0, 83], [1, 81], [2, 79]],
      [[0, 76], [1, 79], [2, 83]], [[0, 81], [1.5, 77]],
      [[0, 79], [1, 77], [2, 74]], [[0, 76], [1.5, 72]],
    ],
  },
  sub: {
    beats: 3, chords: ['F', 'C', 'Dm', 'G', 'Am', 'F', 'G', 'C'],
    mel: [
      [[0, 77], [.75, 81], [1.5, 84], [2.5, 81]], [[0, 79], [1, 76], [2, 79]],
      [[0, 81], [1, 86], [1.75, 84], [2.5, 81]], [[0, 83], [1, 79]],
      [[0, 81], [.75, 84], [1.5, 88], [2.5, 84]], [[0, 81], [1, 84], [2, 77]],
      [[0, 79], [1, 81], [2, 83]], [[0, 84], [2, 72]],
    ],
  },
  minor: {
    beats: 3, chords: ['Am', 'F', 'Dm', 'E', 'Am', 'Dm', 'E', 'Am'],
    mel: [
      [[0, 76], [1, 81], [2, 84]], [[0, 81], [1.75, 77]],
      [[0, 81], [1, 77], [2, 74]], [[0, 76], [2, 80]],
      [[0, 81], [1, 84], [2, 88]], [[0, 86], [1.5, 84], [2, 81]],
      [[0, 83], [1, 80], [2, 76]], [[0, 81], [2, 81]],
    ],
  },
};

const bloom = 2.05;
const bloomEnd = bloom + 1.7;
const roseSpread = {
  hold: 8.6,
  scene: princeScene('rose'),
  ground: pageGround('#89758c', '#614e70', '#e8c98f', 33),
  caption: ['Sur sa petite planète, une rose s’ouvre au soleil.',
    'Le petit prince prend soin d’elle.'],
  music: [[0, 'gentle'], [bloom, 'airy']],
  sfx: [[bloom, 'rise', { len: 1.65, finish: false }], [bloomEnd, 'bell', { vol: .34 }]],
  cam: {
    start: { d: 340, cz: 158, yaw: -3 },
    keys: [[bloom + 1.5, { d: 185, tilt: 57, cx: 128, cz: 207, yaw: 3 }]],
    end: { d: 300, cz: 154, yaw: 1 },
  },
  pieces: [
    ...[-550, -385, -260, -114, 106, 233, 372, 518, 601].map((x, i) =>
      skyStar(x, 177 + i % 3 * 79, 245 + (i * 73) % 190, 10 + i % 4 * 5, i)),
    pc(-357, 475, 380, 161, asteroid('#6c607f', '#9a7291', '#534766'), { k: .83, lift: 122, sh: false, sway: 0 }),
    pc(352, 665, 380, 161, asteroid('#a87577', '#d9a082', '#75566b'), { k: 1.59, sway: 0 }),
    pc(552, 655, 160, 105, volcano(), { lift: 193, k: .76, sway: 0, sh: false }),
    pc(485, 617, 160, 105, volcano(), { lift: 190, k: .48, sway: 0, sh: false }),
    boy(229, 665, false, { lift: 231, sh: false, k: .98 }),
    pc(393, 663, 175, 312, rose(), {
      lift: 208, nosplit: true, sh: false, sway: 1,
      dyn: tl => ({ sc: .32 + .72 * sm((tl - .4) / 2.8) }),
      anim: (tl, el, q) => {
        for (let i = 0; i < 5; i++) {
          const petal = qs(el, q, '.petal-' + i);
          const open = sm((tl - bloom - .16 * i) / 1.12);
          const width = .16 + .84 * open;
          const height = .47 + .53 * open;
          petal.setAttribute('transform', `translate(89 106) scale(${width} ${height}) translate(-89 -106)`);
        }
      },
    }),
    put('rock.round', 474, 718, { k: .23, art: { c: '#a27881' } }),
  ],
};

const ignite = 2.6;
const extinguish = 5.2;
const voyage = {
  hold: 8,
  scene: princeScene('voyage'),
  ground: pageGround('#7c7393', '#524c78', '#d1bb9e', 231),
  caption: ['Le petit prince visite d’autres planètes.',
    'Sur l’une d’elles, un homme allume son réverbère.'],
  music: 'airy',
  sfx: [[ignite, 'tick'], [ignite, 'sparkle', { n: 4, len: .55, vol: .17 }], [extinguish, 'tick']],
  pieces: [
    ...[-640, -508, -439, -205, -74, 72, 266, 452, 588, 642].map((x, i) =>
      skyStar(x, 110 + (i * 27) % 196, 180 + (i * 53) % 250, 9 + i % 4 * 4, i)),
    pc(-344, 543, 380, 161, asteroid('#8b6b86', '#c095a2', '#6a4e72'), { k: 1.28, sway: 0 }),
    pc(352, 592, 380, 161, asteroid('#656684', '#9d8ca0', '#484967'), { k: 1.27, sway: 0 }),
    put('royal.king', -359, 540, { k: .84, lift: 172, sh: false,
      art: { top: '#934f61', bottom: '#68536d', hairC: '#e0c6a2', armR: -30 } }),
    put('worker.merchant', 279, 586, { k: .77, lift: 181, sh: false, sway: .55,
      art: { top: '#697686', bottom: '#3f455b', hairC: '#a07661', armR: -79 } }),
    put('light.street', 401, 577, { k: .65, lift: 178, sh: false, sway: 0,
      nosplit: true, glow: 0, art: { c: '#434259', night: false },
      dyn: tl => ({ op: tl >= ignite && tl < extinguish ? 0 : 1 }) }),
    put('light.street', 401, 577, { k: .65, lift: 178, sh: false, sway: 0, nosplit: true,
      art: { c: '#434259' }, dyn: tl => ({ op: tl >= ignite && tl < extinguish ? 1 : 0 }) }),
    pc(399, 577, 84, 84, `<circle cx="42" cy="42" r="19" fill="#fdd682" opacity=".75"/>`, {
      lift: 393, nosplit: true, sh: false, flt: false, glow: 23, sway: 0,
      dyn: tl => ({ op: .56 * sm((tl - ignite) * 5) * (1 - sm((tl - extinguish) * 5)) }),
    }),
    boy(-149, 778, false, { nosplit: true, dyn: tl => ({ dx: 57 * sm(tl / 5), lift: 5 * abs(sin(tl * 2.9)) }) }),
  ],
};

const field = {
  hold: 8.1,
  scene: princeScene('field'),
  ground: pageGround('#d4a974', '#ae8056', '#865e52', 74),
  caption: ['Chaque jour, le petit prince s’assoit un peu plus près du renard.',
    'Peu à peu, ils deviennent amis.'],
  music: 'gentle',
  sfx: [[.35, 'wind', { len: 2.6, vol: .18 }], [4.4, 'wind', { len: 1.9, vol: .15 }]],
  pieces: [
    dunes('#aa7970', '#bb8a72', 110, 44),
    dunes('#bc8a58', '#d4a468', 253, 82),
    ...[
      [-547, 421, 1.5], [-391, 447, 1.27], [-185, 422, 1.1], [-86, 497, 1.15],
      [112, 414, 1.35], [240, 444, .88], [429, 426, 1.18], [566, 468, 1.31],
      [-560, 731, 1.38], [-430, 783, .86], [532, 745, 1.19], [427, 821, .8],
    ].map(([x, y, k], i) => pc(x, y, 123, 168, wheat(i + 55), { k, sway: 2.5 + i % 3 })),
    boy(-296, 660, false, { k: 1.07, nosplit: true, dyn: tl => ({
      dx: 157 * (.5 * sm((tl - .8) / 1.45) + .5 * sm((tl - 3.35) / 1.6)),
    }) }),
    pc(230, 640, 280, 178, foxArt(), {
      k: 1.11, nosplit: true, sway: .2,
      anim: (tl, el, q) => {
        rot(qs(el, q, '.head'), 13 * (1 - sm((tl - 2.3) / 1.6)), 106, 126);
        rot(qs(el, q, '.tail'), 5 * sin(tl * 2), 165, 139);
      },
    }),
    put('grass.short', -194, 812, { k: .5, art: { c: '#ad8754', c2: '#c39b5d' } }),
    put('grass.short', 169, 788, { k: .46, art: { c: '#b58c53', c2: '#d2aa66' } }),
  ],
};

const drawWater = 1.5;
const waterUp = tl => sm((tl - drawWater) / 1.85);
const waterShine = 3.35;
const wellStars = 4.15;
const well = {
  hold: 8.7,
  scene: princeScene('well'),
  ground: pageGround('#7d728d', '#515374', '#ccac93', 84),
  caption: ['Au milieu du désert, ils trouvent un puits.',
    'Le petit prince boit sous les étoiles.'],
  music: 'night',
  sfx: [[drawWater, 'creak', { len: .78 }], [drawWater + .8, 'creak', { len: .4 }],
    [waterShine, 'drop'], [wellStars, 'sparkle', { n: 7, base: 83, vol: .26 }]],
  cam: {
    start: { d: 330, cz: 150, yaw: 3 },
    keys: [[2.5, { cx: -66, cz: 132, d: 200, tilt: 53, yaw: -2 }],
      [6.6, { cx: 0, cz: 231, d: 430, tilt: 59, yaw: -3 }]],
    end: { d: 416, cz: 205, tilt: 56 },
  },
  pieces: [
    dunes('#535672', '#74738b', 100, 38),
    dunes('#6f657d', '#908099', 234, 61),
    ...desertStones(['#57566e', '#79738a', '#a18387'], 89).slice(1, 8).filter(stone => stone.X !== -69),
    pc(-292, 561, 280, 264, wellFrame(), {
      sway: 0, nosplit: true,
      anim: (tl, el, q) => {
        const raised = waterUp(tl);
        rot(qs(el, q, '.pulley'), 475 * raised, 141, 101);
        qs(el, q, '.well-rope').setAttribute('d', `M141 117V${235 - raised * 100}`);
      },
    }),
    put('tool.bucket', -291, 578, {
      k: .37, sway: 0, sh: false, nosplit: true, art: { c: '#b27f5d' },
      dyn: tl => ({ lift: 52 + 79 * waterUp(tl), op: sm((tl - drawWater) / .9) }),
    }),
    pc(-292, 620, 280, 134, wellFace(), { sway: 0 }),
    man(316, 673, true, { k: .96 }),
    boy(-95, 696, true, { k: .91 }),
    ...[[-318, 13], [-268, 17], [-239, 8]].map(([x, size], i) =>
      skyStar(x, 584, 156, size, i, waterShine + .1 * i)),
    ...[-609, -509, -399, -232, -109, 94, 223, 352, 489, 583].map((x, i) =>
      skyStar(x, 98 + (i * 63) % 237, 244 + (i * 61) % 190, 9 + i % 5 * 5, i, wellStars + i * .13)),
  ],
};

const departure = 2.2;
const lastStar = 4.7;
const farewell = {
  hold: 8.5,
  scene: princeScene('farewell'),
  ground: pageGround('#a68c9a', '#636382', '#dec1a2', 202),
  caption: [[2.9, 'Le petit prince a disparu.'],
    [4.4, 'Depuis, chaque étoile rappelle son rire au pilote.']],
  music: 'gentle',
  sfx: [[departure, 'wind', { len: 2.1, vol: .14 }], [lastStar, 'chime', { notes: [84, 88, 91], gap: .13, vol: .25 }]],
  cam: {
    start: { d: 330, cz: 156 },
    keys: [[6.25, { d: 449, cz: 207, tilt: 57, yaw: -3 }]],
    end: { d: 439, cz: 206, tilt: 55, yaw: -1 },
  },
  pieces: [
    dunes('#5f5978', '#878099', 115, 90),
    dunes('#8a7186', '#b08996', 312, 14),
    ...desertStones(['#786b86', '#9a7989', '#9686a0'], 39),
    man(-287, 648, false, { k: 1.04 }),
    boy(280, 528, false, {
      k: .86, nosplit: true,
      dyn: tl => {
        const walk = sm((tl - .35) / 3.55);
        const disappear = sm((tl - departure) / 1.85);
        return { dx: 139 * walk, dy: -182 * walk, sc: 1 - .27 * walk,
          lift: 4 * abs(sin(tl * 5.2)) * (1 - disappear),
          sink: 40 * disappear, op: 1 - disappear };
      },
    }),
    skyStar(326, 130, 422, 31, 0, lastStar),
  ],
};

Tobidas.book({
  title: 'Le Petit Prince',
  lang: 'fr',
  theme: {
    board: '#292c4c', spine: '#22243d', paper: '#edcf9a', font: princeFont,
    style: 'vintage', desk: { base: 'night', scene: princeScene('cover') },
  },
  cover: princeCover(),
  end: { title: 'Fin', sub: 'Le Petit Prince' },
  sound: { set: princeScore },
  spreads: [desert, roseSpread, voyage, field, well, farewell],
});
