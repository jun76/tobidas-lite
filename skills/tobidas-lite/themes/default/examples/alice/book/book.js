// 見開きの順に仕掛けを配置する。動きの時刻は見開きが開ききったところを 0 とする。
const spreads = [];
const hero = (x, y, pose = {}, motion = {}) =>
  pc(x, y, 120, 226, A.alice(pose), { k: 1.03, nosplit: true, ...motion });
const rabbit = (x, y, motion = {}) =>
  pc(x, y, 185, 220, A.rabbit(), { k: .9, nosplit: true, ...motion });
const tree = (x, y, w, h, colors = {}) => pc(x, y, w, h, A.tree(w, h, colors), { sway: .65 });
const grass = (x, y, w = 175, colors = ['#eab589', '#efd49a']) =>
  pc(x, y, w, 62, A.grass(w, 62, '#618f6e', '#9eba79', colors), { sway: .65 });
const hill = (y, h, c1, c2, seed) => {
  // 背で折るパネルは絵の外側を切るため、丘と木の位置を保ったまま上に余白を足す。
  const topPadding = 56;
  const artwork = A.hills(1380, h, c1, c2, seed, .7, hillTrees(9, seed, 45));
  return pc(0, y, 1380, h + topPadding,
    `<g transform="translate(0 ${topPadding})">${artwork}</g>`, { sh: false });
};
const glint = (x, y, z, phase, color = '#ffe6a7') => twinkle(x, y, z, phase, 14, color);
const gardenFloor = (seed, path = null) => A.gMeadow({ seed, path, pond: null });
const frame = (x, y, w, h, art, options = {}) => pc(x, y, w, h, art, { nosplit: true, ...options });

const chaseStart = 1.25;
const rabbitDive = 5.5;
const burrow = `<path d="M0 130Q11 79 55 67Q103 42 159 57Q223 66 280 130Z" fill="#668863"/>
  <path d="M55 130Q61 87 99 76Q150 62 191 90Q211 106 217 130Z" fill="#926b53"/>
  <path d="M70 130Q78 94 121 91Q173 82 201 130Z" fill="#382f40"/>
  <path d="M9 124Q25 114 22 97M247 119Q246 99 259 92M226 110Q214 84 226 77" fill="none" stroke="#a3ba76" stroke-width="8" stroke-linecap="round"/>`;
spreads.push({
  hold: 7.8,
  scene: aliceAtmosphere.bank,
  music: { tune: 'main', beat: .46, vol: .61, stac: true },
  sfx: [[chaseStart, 'tick'], [chaseStart + .2, 'bell', { vol: .32 }], [rabbitDive, 'whoosh', { len: .8 }]],
  ground: gardenFloor(5, 'M1180 465Q850 565 665 667T155 920H458Q690 795 856 721T1260 523Z'),
  caption: ['「たいへん、ちこくだ！」 白うさぎが 時計を見て 走りだしました。', 'アリスが あとを追うと、木の根もとに ぽっかり穴が。'],
  cam: { start: { d: 370, yaw: -3, cz: 150 }, end: { d: 285, yaw: 3, cx: 25, cz: 150 } },
  pieces: [
    hill(92, 210, '#b4cbb7', '#a6c9ac', 7),
    hill(220, 165, '#89af8a', '#a1bd82', 19),
    tree(-525, 430, 325, 405), tree(530, 470, 342, 427, { c: '#5a8566', c2: '#789a6c', c3: '#9ab079' }),
    tree(223, 365, 180, 245), tree(-250, 379, 165, 246),
    pc(505, 591, 280, 130, burrow, { sway: .2 }),
    pc(-565, 615, 220, 76, A.bush(220, 76, '#63866b', '#8eaa73', '#f0c485')),
    hero(-370, 660, { armR: -50, mouth: 'o' }, {
      dyn: tl => ({ dx: 185 * sm((tl - 2) / 4.5), lift: 11 * abs(sin(tl * 6)) * sm((tl - 2) / .4) }),
    }),
    rabbit(175, 659, { dyn: tl => {
      const dive = sm((tl - rabbitDive) / .65);
      return { dx: 327 * sm((tl - chaseStart) / 4.6), dy: -37 * sm((tl - chaseStart) / 4.6),
        lift: 23 * abs(sin((tl - chaseStart) * 7)) * sm((tl - chaseStart) / .35) - 125 * dive,
        sc: 1 - .5 * dive, op: 1 - dive };
    } }),
    grass(-620, 805), grass(-200, 826, 208), grass(159, 789, 173), grass(601, 789, 190),
    fly(-480, 580, '#efb088', 0), fly(388, 733, '#eed185', 2),
  ],
});

const archFloor = (base, tile, rug) => `<rect width="1440" height="920" fill="${base}"/>
  ${repeats(15, row => repeats(24, col => (row + col) % 2 ? '' : `<rect x="${col * 60}" y="${row * 62}" width="60" height="62" fill="${tile}"/>`))}
  <path d="M450 230H986L1130 920H310Z" fill="${rug}"/>
  <path d="M478 248H958L1085 920M478 248L355 920" fill="none" stroke="#e3bd83" stroke-width="8" stroke-opacity=".76"/>`;
const hallPanel = () => `<path d="M0 295V86Q130 65 257 97Q414 135 557 62Q685 0 821 62Q966 135 1123 97Q1250 65 1380 86V295Z" fill="#55445e"/>
  <path d="M0 115Q130 94 257 126Q414 164 557 91Q685 29 821 91Q966 164 1123 126Q1250 94 1380 115M0 258H1380" fill="none" stroke="#9b7d85" stroke-width="9"/>
  ${repeats(9, i => `<path d="M${57 + i * 158} 250V181" stroke="#725b72" stroke-width="21"/>${A.star(57 + i * 158, 153, 14, gold)}`)}
  <path d="M0 269H1380V295H0Z" fill="#3d364e"/>`;
const hall = () => pc(0, 132, 1380, 295, hallPanel(), { sh: false });
const door = (x, y, color, k, open = false) =>
  pc(x, y, 180, 300, A.door(color, open), { k, sway: .15 });
const floatInHole = (x, y, w, h, art, z, phase) => frame(x, y, w, h, art, {
  sh: false, sway: 0,
  dyn: tl => ({ lift: z + 37 * sin(tl * 1.5 + phase), rz: 14 * sin(tl * 1.05 + phase), op: sm((tl + .45) / .7) }),
});
const fallingAt = 1.1;
const landsAt = 5.3;
spreads.push({
  hold: 7.8,
  scene: aliceAtmosphere.shaft,
  music: { tune: 'minor', beat: .63, vol: .55, oct: -12 },
  ground: archFloor('#6d5c76', '#8d7789', '#8d526b'),
  sfx: [[fallingAt, 'fall', { gap: .24 }], [landsAt, 'thud', { vol: .24 }]],
  caption: ['穴の中を、ひゅううん。時計も ティーポットも、ふわふわ通りすぎます。', 'ようやく着いたのは、扉が ずらりと並ぶ 広間でした。'],
  cam: { start: { d: 460, cz: 205, yaw: -4 }, end: { d: 340, cz: 155, yaw: 2 } },
  pieces: [
    hall(), door(-555, 366, '#698a87', .92), door(-304, 358, '#a05c73', .78),
    door(195, 349, '#9b734d', .68), door(419, 365, '#5d738f', .86), door(596, 380, '#7e647c', .7),
    floatInHole(-460, 555, 96, 102, A.watch(), 270, 1),
    floatInHole(350, 535, 100, 144, A.card('diamond'), 266, 3),
    floatInHole(520, 630, 130, 76, A.cake(), 125, 2),
    floatInHole(-218, 735, 160, 108, A.teapot(), 94, 0),
    hero(181, 667, { mouth: 'o', armL: 109, armR: -117 }, {
      sh: false,
      dyn: tl => {
        const fall = sm((tl - fallingAt) / (landsAt - fallingAt));
        return { lift: 319 * (1 - fall), dx: 74 * fall + 14 * sin(tl * 3) * (1 - fall),
          rz: 21 * sin(tl * 1.9) * (1 - fall), op: sm((tl + .46) / .6) };
      },
    }),
    glint(-520, 522, 195, .5), glint(475, 414, 345, 2), glint(-98, 590, 265, 3),
    glint(155, 490, 195, 1),
  ],
});

const shrinkAt = 1.35;
const growAt = 4.1;
const fitAt = 7.4;
const sizeAt = tl => 1 - .51 * sm((tl - shrinkAt) / 1.1)
  + 1.56 * sm((tl - growAt) / 2.0) - 1.45 * sm((tl - fitAt) / 1.3);
spreads.push({
  hold: 10,
  scene: aliceAtmosphere.corridor,
  music: [[0, { tune: 'minor', beat: .61, vol: .5, startBar: 2 }],
    [growAt, 'none'], [growAt + 1.95, { tune: 'main', beat: .53, vol: .57 }]],
  ground: archFloor('#b39a9c', '#dfbead', '#a65569'),
  sfx: [[shrinkAt, 'magic', { len: .9 }], [growAt, 'rise', { len: 1.96 }], [fitAt, 'pop']],
  caption: ['小びんのひと口で 小さく、おかしのひと口で ぐんぐん大きく！',
    [7, 'やっと ちょうどよい背になって、小さな扉を くぐりました。']],
  cam: { start: { d: 315, yaw: -3 }, keys: [[3.7, { d: 295, cx: 0 }], [6.3, { d: 740, tilt: 62, cz: 253, yaw: 4 }]],
    end: { d: 310, cx: 85, cz: 150 } },
  pieces: [
    hall(), door(-562, 364, '#7b687c', .9), door(-331, 353, '#6f8193', .72),
    door(285, 355, '#a77664', .72), door(553, 377, '#806179', .85),
    frame(-456, 590, 310, 102, A.table(310, 102)),
    frame(-515, 587, 100, 155, A.bottle('のんで'), { k: .66, lift: 103 }),
    frame(-424, 586, 130, 76, A.cake(), { k: .71, lift: 103 }),
    frame(-368, 591, 125, 56, A.key(), { k: .46, lift: 107, lean: 46 }),
    door(416, 615, '#deb470', .47, true),
    hero(-165, 687, { look: 'up', mouth: 'o', armL: 53, armR: -55 }, {
      dyn: tl => ({ sc: sizeAt(tl), dx: 545 * sm((tl - 8.05) / 1.42), dy: -52 * sm((tl - 8.05) / 1.42),
        op: 1 - sm((tl - 9.5) / .38) }),
    }),
    ...[[-310, 695, 0], [-90, 695, 1], [-243, 649, 2], [56, 685, 3]].map(([x, y, i]) =>
      frame(x, y, 50, 50, A.star(25, 25, 24, '#fff0b0'), {
        flt: false, sh: false, glow: 12, sway: 0,
        dyn: tl => {
          const u = cl((tl - growAt - i * .12) / 2.0);
          return { lift: 78 + u * (365 + i * 16), dx: (i - 1.5) * 44 * u, rz: 110 * u, op: sin(u * PI) };
        },
      })),
    glint(490, 615, 150, 1), glint(360, 639, 110, 3),
  ],
});

const grinAt = 3.5;
const catMotion = tl => ({ lift: 233 + 9 * sin(tl * 1.45) });
const forestColors = { c: '#3d645e', c2: '#567e71', c3: '#7e9d84' };
const mushroom = (x, y, k, cap, dots) =>
  pc(x, y, 250, 240, A.mushroom(cap, dots), { k, sway: .65 });
const branch = `<path d="M0 83Q126 46 300 62L300 89Q160 82 0 110Z" fill="#79586b"/>
  <path d="M125 66Q119 38 87 17Q120 13 153 64Z" fill="#79586b"/>
  <path d="M60 85Q151 62 245 69" stroke="#b18582" fill="none" stroke-width="6" stroke-linecap="round"/>`;
spreads.push({
  hold: 8.1,
  scene: aliceAtmosphere.forest,
  music: { tune: 'minor', beat: .76, vol: .42, bass: .45, startBar: 4 },
  sfx: [[.55, 'pop', { vol: .28 }], [grinAt, 'magic', { len: 1.8 }]],
  caption: ['「どっちへ行くかは、どこへ行きたいかしだいさ」と チェシャ猫。', [4.6, 'すうっと 消えて、にやにや笑いだけが 枝に 残りました。']],
  ground: `<rect width="1440" height="920" fill="#6b8981"/>
    <path d="M1220 920Q788 756 828 592Q861 450 1101 345L1045 304Q698 430 636 582Q567 753 813 920Z" fill="#b1a892"/>
    ${repeats(82, i => `<ellipse cx="${(i * 281 + 22) % 1435}" cy="${(i * 173 + 31) % 917}" rx="${3 + i % 5}" ry="${2 + i % 3}" fill="${i % 3 ? '#91a691' : '#d0b19a'}"/>`)}`,
  cam: { start: { d: 420, yaw: -3, cz: 185 }, end: { d: 300, yaw: 4, cx: 95, cz: 190 } },
  pieces: [
    hill(94, 205, '#658784', '#759691', 20),
    hill(228, 187, '#50736b', '#719282', 31),
    tree(-541, 422, 311, 431, forestColors), tree(547, 413, 306, 434, forestColors),
    tree(-273, 376, 182, 305, forestColors), tree(221, 379, 170, 305, forestColors),
    frame(425, 443, 300, 110, branch, { lift: 157, sh: false }),
    frame(387, 477, 329, 217, A.cat(), { sh: false,
      dyn: tl => ({ ...catMotion(tl), op: sm((tl + .4) / .7) * (1 - sm((tl - grinAt) / 1.85)) }) }),
    frame(333, 480, 220, 120, A.grin(), { k: .64, sh: false,
      dyn: tl => ({ lift: catMotion(tl).lift + 58, op: sm((tl + .4) / .7) }) }),
    mushroom(-500, 601, 1.25, '#bd7d98', '#e8c5aa'),
    mushroom(-310, 688, .6, '#cc936f', '#f2ce94'),
    mushroom(551, 695, .87, '#977eaa', '#dbb9bc'),
    mushroom(395, 745, .58, '#c6788d', '#f4c9aa'),
    hero(-122, 685, { look: 'up', mouth: 'o' }, {
      anim: aArm('.aR', tl => -18 - 62 * sm((tl - .6) / .85) + 8 * sin(tl * 2.5)),
    }),
    grass(-584, 824), grass(538, 823, 224),
    glint(-465, 640, 214, 1), glint(-235, 581, 110, 2), glint(501, 580, 299, 1.5),
    glint(195, 612, 256, 3, '#f3c2e3'),
  ],
});

const teaTime = 1.7;
const pourAt = 3.1;
const teaTable = `<path d="M30 30H52L47 133H27ZM536 30H558L562 133H542Z" fill="#795551"/>
  <rect x="0" y="0" width="590" height="42" rx="13" fill="#a77460"/>
  <path d="M23 0H567V41Q549 63 529 44Q509 68 490 46Q470 67 451 46Q431 68 412 46Q392 67 373 46Q353 68 334 46Q315 68 295 46Q276 68 256 46Q237 68 217 46Q198 68 178 46Q159 68 139 46Q120 68 100 46Q81 68 61 46Q42 65 23 42Z" fill="#eab5a4"/>
  <path d="M32 18H557M32 30H557" stroke="#f5d4b8" stroke-width="3" stroke-dasharray="8 8"/>`;
const teaSteam = (x, y, phase) => frame(x, y, 36, 66,
  '<path d="M19 64Q-3 47 18 33T21 3" fill="none" stroke="#fff2d2" stroke-width="6" stroke-linecap="round"/>',
  { sh: false, flt: false, sway: 0, dyn: tl => {
    const u = ((Math.max(0, tl - teaTime) * .38 + phase) % 1);
    return { lift: 179 + 72 * u, dx: 12 * sin(u * PI), sc: .6 + .6 * u, op: .76 * sin(u * PI) * sm((tl - teaTime) / .6) };
  } });
spreads.push({
  hold: 8.2,
  scene: aliceAtmosphere.tea,
  music: { tune: 'sub', beat: .43, vol: .65, stac: true },
  sfx: [[teaTime, 'chime', { vol: .3 }], [pourAt, 'drop'], [pourAt + .8, 'tick']],
  caption: ['帽子屋たちは、ずうっと お茶の時間。', '「せきが ないぞ！」 がらがらの テーブルで、みんなが さけびました。'],
  ground: gardenFloor(17, 'M575 920Q546 740 822 626T1340 422L1440 494Q1290 604 1020 728T827 920Z'),
  cam: { start: { d: 365, yaw: 3, cz: 165 }, end: { d: 295, yaw: -3, cx: 18, cz: 158 } },
  pieces: [
    hill(95, 221, '#bbc5a1', '#b6c49d', 12), hill(237, 164, '#9ab08a', '#9bb884', 14),
    tree(-535, 437, 295, 420, { fruit: '#dca285' }), tree(537, 460, 340, 415, { fruit: '#edbd76' }),
    tree(197, 382, 182, 237),
    frame(265, 522, 120, 226, A.hatter(), { k: 1.06, anim: aArm('.aR', tl => -70 + 13 * sin(tl * 3.1)) }),
    frame(487, 523, 185, 220, A.rabbit(true), { k: 1.02, dyn: tl => ({ rz: 4 * sin(tl * 2.6) }) }),
    pc(337, 654, 590, 133, teaTable, { sway: .1 }),
    frame(316, 650, 165, 108, A.teapot(), { k: .95, sway: 0,
      dyn: tl => {
        const tip = sm((tl - pourAt) / .45) * (1 - sm((tl - pourAt - 1.1) / .6));
        return { lift: 132 + 18 * tip, rz: -15 * tip };
      },
    }),
    frame(192, 652, 100, 64, A.cup('#ce8a8c'), { k: .78, lift: 133 }),
    frame(450, 654, 100, 64, A.cup('#e6b978'), { k: .75, lift: 133 }),
    frame(556, 650, 100, 64, A.cup('#83a4a7'), { k: .69, lift: 133 }),
    frame(99, 655, 130, 76, A.cake(), { k: .65, lift: 133 }),
    teaSteam(182, 655, 0), teaSteam(452, 655, .5), teaSteam(552, 655, .25),
    hero(-220, 687, { mouth: 'o', armR: -38 }, { dyn: tl => ({ dx: 61 * sm((tl - .8) / 2.8) }) }),
    grass(-581, 824, 190, ['#ecb492']), grass(-328, 828, 184), grass(562, 831, 207),
    fly(-421, 719, '#efad94', 1),
  ],
});

const verdictAt = 2.3;
const cardsAt = 4.15;
const wakeAt = 7.05;
const awake = tl => sm((tl - wakeAt) / 1.25);
const dreaming = tl => ({ op: 1 - awake(tl) });
const awakeFloor = (tl, el, cache) => {
  cache.meadow ??= el.ownerDocument.querySelectorAll('.alice-waking-meadow');
  for (const page of cache.meadow) page.setAttribute('opacity', F(awake(tl)));
};
const courtWall = (w, h) => `<rect width="${w}" height="${h}" fill="#b97d82"/>
  <path d="M0 0H${w}V18H0Z" fill="#e6b892"/>
  ${repeats(8, i => `<path d="M${i * w / 8} 23v${h - 27}" stroke="#d99d98" stroke-width="5"/>`)}`;
const courtBackdrop = (w, h) => `<path d="M0 ${h}V34H${w * .28}L${w * .38} 6H${w * .62}L${w * .72} 34H${w}V${h}Z" fill="#6f4760"/>
  <path d="M0 53H${w * .31}L${w * .40} 24H${w * .60}L${w * .69} 53H${w}M0 171H${w}" stroke="${gold}" stroke-width="7" fill="none"/>
  ${[.15,.32,.68,.85].map(u => heart(w * u, 107, 52, '#d78b94')).join('')}
  ${heart(w / 2, 101, 105, '#e9bb85')}`;
const pennant = color => `<path d="M20 235V10" stroke="#957052" stroke-width="9"/>
  <path d="M20 19H115L95 72L115 126H20Z" fill="${color}"/>${heart(61, 69, 42, cream)}`;
const flyCard = (i, suit) => {
  const from = [i % 2 ? -1 : 1, 105 + (i % 6) * 68];
  const start = cardsAt + i * .115;
  return frame(from[0] * from[1], 510 + (i * 37) % 175, 100, 144, A.card(suit), {
    k: .65 + (i % 4) * .10, sh: false, sway: 0,
    dyn: tl => {
      const u = cl((tl - start) / (2.5 + (i % 3) * .18));
      const out = sm((tl - wakeAt + i * .045) / .55);
      return { lift: 20 + 380 * sin(u * PI * .67) + (i % 3) * 24,
        dx: from[0] * (80 * sin(u * PI) - 57 * u) + 35 * sin(u * 8 + i) * u,
        dy: 180 * u, rz: (u * 245 + 21 * sin(i)) * from[0],
        op: sm((tl - start) / .23) * (1 - out) };
    },
  });
};
spreads.push({
  hold: 10.3,
  scene: aliceAtmosphere.court(spreads.length + 1, awake),
  music: [[0, { tune: 'minor', beat: .39, vol: .57, stac: true, startBar: 6 }],
    [cardsAt, 'none'], [wakeAt, { tune: 'main', beat: .68, vol: .5 }]],
  sfx: [[verdictAt, 'knock', { n: 2 }], [cardsAt, 'whoosh', { len: 1.7 }], [cardsAt + 1, 'sparkle', { len: 2.2 }], [wakeAt, 'wind', { len: 2 }]],
  caption: ['女王の裁判で「ただの トランプよ！」と いうと、カードが 宙を 舞いました。',
    [wakeAt, '目をさますと、ひざに 木の葉が一枚。ふしぎな夢でした。']],
  ground: archFloor('#bc9299', '#e0b6a9', '#a44961')
    + `<g class="alice-waking-meadow" opacity="0">${gardenFloor(5)}</g>`,
  cam: { start: { d: 475, yaw: -6, cz: 187 },
    keys: [[cardsAt - .3, { d: 385, yaw: 1, cz: 182 }], [cardsAt + 1.75, { d: 540, tilt: 56, cz: 245, yaw: 5 }]],
    end: { d: 425, yaw: -2, cz: 173, cx: -160 } },
  pieces: [
    ...terrace({ X: 0, Y: 494, step: 73, fold: -23, dyn: dreaming, tiers: [
      { w: 1030, h: 55, top: '#d5a398', art: courtWall },
      { w: 903, h: 126, top: '#b77d87', art: courtWall },
      { w: 795, h: 347, top: false, art: courtBackdrop },
    ] }),
    frame(-584, 353, 118, 235, pennant('#b15c73'), { sway: .65, dyn: dreaming }),
    frame(584, 349, 118, 235, pennant('#b15c73'), { sway: .65, dyn: dreaming }),
    frame(186, 412, 120, 226, A.queen(), { k: 1.05, lift: 126, dyn: dreaming,
      anim: aArm('.aR', tl => -75 - 39 * sm((tl - verdictAt) / .23) + 6 * sin(tl * 3)) }),
    ...[[-488, 581], [-369, 532], [363, 545], [493, 596]].map(([x, y], i) =>
      frame(x, y, 100, 144, A.card(i % 2 ? 'diamond' : 'heart', true), {
        k: 1.02, dyn: tl => {
          const u = sm((tl - cardsAt - i * .10) / .62);
          return { lift: 140 * u, rz: (i < 2 ? -34 : 34) * u, op: 1 - u };
        },
      })),
    hero(-200, 710, { armL: 50, armR: -74, mouth: 'o' }, {
      anim: many(awakeFloor, aArm('.aR', tl => -74 - 61 * sm((tl - cardsAt) / .4) + 115 * awake(tl))),
      dyn: tl => ({ dx: -41 * sm((tl - cardsAt) / .6), rz: -7 * sin(cl((tl - cardsAt) / 3.1) * PI) }),
    }),
    pc(-625, 747, 100, 220, A.rose('#e2a4a4'), { k: .88, dyn: dreaming }),
    pc(622, 756, 100, 220, A.rose('#bd5b70'), { k: .85, dyn: dreaming }),
    pc(-544, 813, 100, 190, A.rose('#f0ddba', 190), { k: .65, dyn: dreaming }),
    pc(535, 820, 100, 190, A.rose('#bd5b70', 190), { k: .7, dyn: dreaming }),
    frame(-510, 514, 311, 406, A.tree(311, 406), { dyn: tl => ({ op: awake(tl) }) }),
    frame(429, 765, 215, 68, A.grass(215, 68), { dyn: tl => ({ op: awake(tl) }) }),
    ...Array.from({ length: 12 }, (_, i) => flyCard(i, ['heart', 'diamond', 'dark'][i % 3])),
    frame(-212, 735, 86, 54,
      '<path d="M4 43Q25-1 81 7Q65 53 4 43Z" fill="#98a76c"/><path d="M8 43Q35 33 71 13" stroke="#58694d" stroke-width="4" fill="none"/>',
      { sh: false, dyn: tl => {
        const u = cl((tl - wakeAt) / 1.65);
        return { lift: 325 * (1 - u) + 27, dx: 55 * sin(3 * PI * u) * (1 - u), rz: 80 * sin(u * PI), op: sm((tl - wakeAt) / .4) };
      } }),
  ],
});

Tobidas.book({
  title: '不思議な国のアリス',
  lang: 'ja',
  theme: { board: '#203d45', spine: '#192c38', style: 'vintage', desk: { base: 'forest', scene: aliceAtmosphere.cover } },
  cover: A.coverAlice(),
  end: { title: 'おしまい', sub: '不思議な国のアリス' },
  sound: {
    set: aliceScore,
    extra: S => {
      const end = S.TL.tc + S.TL.CLOSE;
      S.phrase(end + .4, S.TL.END - .45, S.tunes.main, { beat: .53, vol: .38, startBar: 6 });
    },
  },
  spreads,
});
