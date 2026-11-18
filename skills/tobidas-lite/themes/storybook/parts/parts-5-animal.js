// 目録の部品: 生き物(犬・猫・鳥・家畜・森の動物・獣・水の生き物・小さな生き物・遠い国の動物・空想の生き物)。作品ごとに編集しない。
// どれも右向き。左向きは put(..., { flip: true })。四つ足は置くだけでしっぽと頭が小さく動く。
(function () {
  const { n, r, c, e, p, l, g, at, poly } = DRAW, D = defPart, DK = '#3a2a1e';
  // 四つ足の骨格。寸法と色から、しっぽ・奥の脚・胴・手前の脚・首・頭を組み立てる。返り値の tx ty はしっぽの付け根、nx ny は首の付け根
  const quad = s => {
    const { W, H, c: C, c2 = C, c3, bw, bh, leg, lw = 16, hr, hdx = 0, hdy = 0, neck = 0, sn = [hr * .55, hr * .38], ear = 'point', tail = 'up', eye = 4, eyeC = DK, headC = C, earC = headC, earIn, snC = c3 || headC, noseC = DK, belly, tailC = C, tipC,
      over = () => '', onHead = () => '', behindHead = () => '', bxk = .44 } = s;
    const bx = W * bxk, by = H - leg - bh * .45, hx = bx + bw * .78 + hdx, hy = by - bh * .55 - hdy, tx = bx - bw * .88, ty = by - bh * .25, G = { bx, by, hx, hy, tx, ty, bw, bh, hr };
    const T = {
      up: () => l(`M${n(tx + 6)} ${n(ty)}q${n(-bw * .34)} -8 ${n(-bw * .26)} ${n(-bh * 1.1)}`, tailC, lw * .7),
      down: () => l(`M${n(tx + 6)} ${n(ty)}Q${n(tx - bw * .3)} ${n(ty + 8)} ${n(tx - bw * .26)} ${n(ty + bh * 1.1)}`, tailC, lw * .7),
      curl: () => c(tx - 2, ty - 16, 15, 'none', ` stroke="${tailC}" stroke-width="12"`),
      bushy: () => p(`M${n(tx + 8)} ${n(ty + 12)}Q${n(tx - bw * .8)} ${n(ty + bh * .1)} ${n(tx - bw * .7)} ${n(ty - bh * 1.1)}Q${n(tx - bw * .1)} ${n(ty - bh * .9)} ${n(tx + 10)} ${n(ty - 10)}Z`, tailC) + (tipC ? c(tx - bw * .62, ty - bh * .92, bh * .3, tipC) : ''),
      droop: () => p(`M${n(tx + 8)} ${n(ty - 10)}Q${n(tx - bw * .5)} ${n(ty)} ${n(tx - bw * .5)} ${n(ty + bh * 1.5)}Q${n(tx - bw * .1)} ${n(ty + bh * 1.1)} ${n(tx + 12)} ${n(ty + 14)}Z`, tailC),
      short: () => c(tx + 2, ty, bh * .28, tailC),
      thin: () => l(`M${n(tx + 6)} ${n(ty)}Q${n(tx - 22)} ${n(ty + bh * .4)} ${n(tx - 16)} ${n(ty + bh * 1.3)}`, tailC, 6) + c(tx - 16, ty + bh * 1.3 + 6, 9, tipC || c2),
      pig: () => l(`M${n(tx + 4)} ${n(ty)}q-16 -2 -12 -16q8 -10 14 0`, tailC, 6),
    };
    const E = {
      point: () => poly([[hx - hr * .8, hy - hr * .35], [hx - hr * .6, hy - hr * 1.4], [hx - hr * .05, hy - hr * .82]], earC) + poly([[hx + hr * .02, hy - hr * .86], [hx + hr * .46, hy - hr * 1.44], [hx + hr * .78, hy - hr * .45]], earC) + (earIn ? poly([[hx + hr * .2, hy - hr * .86], [hx + hr * .45, hy - hr * 1.2], [hx + hr * .62, hy - hr * .64]], earIn) : ''),
      flop: () => e(hx - hr * .5, hy - hr * .05, hr * .34, hr * .64, earC, ` transform="rotate(16 ${n(hx - hr * .5)} ${n(hy - hr * .6)})"`),
      round: () => c(hx - hr * .62, hy - hr * .72, hr * .38, earC) + c(hx + hr * .5, hy - hr * .8, hr * .38, earC) + (earIn ? c(hx + hr * .5, hy - hr * .8, hr * .2, earIn) : ''),
      long: () => e(hx - hr * .4, hy - hr * 1.5, hr * .26, hr * .82, earC, ` transform="rotate(-10 ${n(hx - hr * .4)} ${n(hy - hr * .8)})"`) + e(hx + hr * .1, hy - hr * 1.55, hr * .26, hr * .82, earC, ` transform="rotate(8 ${n(hx + hr * .1)} ${n(hy - hr * .8)})"`) + e(hx + hr * .1, hy - hr * 1.5, hr * .12, hr * .56, earIn || '#f6b3b3', ` transform="rotate(8 ${n(hx + hr * .1)} ${n(hy - hr * .8)})"`),
      leaf: () => e(hx - hr * .5, hy - hr * .95, hr * .22, hr * .46, earC, ` transform="rotate(-30 ${n(hx - hr * .5)} ${n(hy - hr * .6)})"`) + e(hx + hr * .1, hy - hr * 1.05, hr * .22, hr * .46, earC, ` transform="rotate(14 ${n(hx + hr * .1)} ${n(hy - hr * .7)})"`),
      none: () => '',
    };
    const legR = (x, f) => r(x, by, lw, H - by, f, lw / 2);
    let o = g('tail', T[tail]()) + legR(bx - bw * .62 + lw * .7, c2) + legR(bx + bw * .5 + lw * .7, c2) + e(bx, by, bw, bh, C) + (belly ? e(bx + bw * .04, by + bh * .4, bw * .72, bh * .5, c3) : '') + over(G) + legR(bx - bw * .74, C) + legR(bx + bw * .38, C);
    if (neck) o += l(`M${n(bx + bw * .62)} ${n(by - bh * .25)}L${n(hx - hr * .25)} ${n(hy + hr * .35)}`, headC, neck, ' stroke-linecap="butt"');
    o += g('hd', behindHead(G) + E[ear]() + c(hx, hy, hr, headC) + (sn ? e(hx + hr * .7, hy + hr * .28, sn[0], sn[1], snC) + c(hx + hr * .7 + sn[0] * .68, hy + hr * .28 - sn[1] * .3, Math.max(3.5, sn[1] * .3), noseC) : '') + c(hx + hr * .2, hy - hr * .14, eye, eyeC) + onHead(G));
    return Object.assign(G, { s: o, nx: hx - hr * .5, ny: hy + hr * .8 });
  };
  // 四つ足を登録する。動き: しっぽをふる・頭を小さくゆらす
  const Q = (name, label, W, H, spec, note = 'c 体の色') => {
    const mk = o => quad(Object.assign({ W, H }, spec, o.c ? { c: o.c, headC: spec.headC ? spec.headC : o.c, earC: spec.earC || spec.headC || o.c, tailC: spec.tailC || o.c } : { headC: spec.headC || spec.c, earC: spec.earC || spec.headC || spec.c, tailC: spec.tailC || spec.c })), G = mk({});
    const wag = { curl: 6, short: 8, pig: 10, bushy: 9, droop: 6 }[spec.tail] || 14;
    D(name, label, W, H, o => mk(o).s, { anim: (tl, el, q) => { rot(qs(el, q, '.tail'), wag * sin(tl * (spec.wagV || 5)), G.tx.toFixed(1), G.ty.toFixed(1)); rot(qs(el, q, '.hd'), 3 * sin(tl * 1.3), G.nx.toFixed(1), G.ny.toFixed(1)); } }, note);
  };
  const spots = (list, f) => G => list.map(([u, v, q]) => c(G.bx + G.bw * u, G.by + G.bh * v, q, f)).join('');
  const stripes = (list, f, w = 7) => G => list.map(u => l(`M${n(G.bx + G.bw * u)} ${n(G.by - G.bh * .96 * Math.sqrt(1 - u * u))}q6 ${n(G.bh * .3)} 0 ${n(G.bh * .6)}`, f, w)).join('');

  // ---------- 犬 ----------
  defPart.group = '犬';
  Q('dog.shiba', '柴犬', 230, 168, { c: '#d9a066', c2: '#b98048', c3: '#fbf1dc', bw: 62, bh: 36, leg: 50, lw: 18, hr: 34, ear: 'point', earIn: '#f3d2b0', tail: 'curl', belly: 1 });
  Q('dog.spot', 'ぶちの犬', 240, 168, { c: '#fbf6ea', c2: '#e6dfd0', bw: 64, bh: 34, leg: 52, lw: 17, hr: 32, ear: 'flop', earC: '#5a4636', tail: 'up', over: spots([[-.4, -.3, 18], [.3, .1, 14], [-.1, .4, 10]], '#5a4636'), onHead: G => c(G.hx + G.hr * .2, G.hy - G.hr * .14, 11, '#5a4636') + c(G.hx + G.hr * .2, G.hy - G.hr * .14, 4, '#fff') });
  Q('dog.big', '大型犬', 300, 222, { c: '#e3b566', c2: '#c9983f', c3: '#f6dca0', bw: 86, bh: 48, leg: 72, lw: 24, hr: 42, ear: 'flop', earC: '#c9983f', tail: 'down', belly: 1, sn: [28, 18] });
  Q('dog.puppy', '子犬', 180, 140, { c: '#c98a52', c2: '#a86e3c', c3: '#fbf1dc', bw: 46, bh: 30, leg: 38, lw: 17, hr: 32, ear: 'flop', earC: '#8a5a33', tail: 'up', belly: 1, eye: 4.5, wagV: 9 });

  // ---------- 猫 ----------
  defPart.group = '猫';
  const cat = { bw: 54, bh: 30, leg: 44, lw: 14, hr: 31, ear: 'point', tail: 'up', sn: [13, 10], wagV: 2.4 };
  Q('cat.calico', '三毛猫', 215, 162, Object.assign({ c: '#fbf6ea', c2: '#e6dfd0', earIn: '#f6b3b3', over: spots([[-.5, -.35, 17], [.1, -.5, 13]], '#e89a3c'), onHead: G => p(`M${n(G.hx - 26)} ${n(G.hy - 14)}Q${n(G.hx - 10)} ${n(G.hy - 34)} ${n(G.hx + 4)} ${n(G.hy - 28)}Q${n(G.hx - 6)} ${n(G.hy - 10)} ${n(G.hx - 26)} ${n(G.hy - 14)}Z`, '#5a4636'), tailC: '#5a4636' }, cat));
  Q('cat.black', '黒猫', 215, 162, Object.assign({ c: '#4a4654', c2: '#3a3644', eyeC: '#f6d24a', noseC: '#f6b3b3', earIn: '#6a6474' }, cat));
  Q('cat.tabby', 'しま猫', 215, 162, Object.assign({ c: '#d9963c', c2: '#b87a2a', c3: '#fbf1dc', belly: 1, earIn: '#f6b3b3', over: stripes([-.5, -.2, .1, .4], '#a8641f') }, cat));
  Q('cat.kitten', '子猫', 160, 130, { c: '#b9b2c0', c2: '#9a93a6', c3: '#fbf6ea', bw: 38, bh: 24, leg: 34, lw: 13, hr: 28, ear: 'point', earIn: '#f6b3b3', tail: 'up', sn: [11, 9], belly: 1, eye: 4.5, wagV: 3 });

  // ---------- 鳥 ----------
  defPart.group = '鳥';
  // 立っている鳥(横向き)。k は全体の大きさ、leg は脚の長さ
  const fowl = (W, H, s) => { const { c: C, c2, c3, bk = '#f3a53c', leg = 22, k = 1, crest = '', tailUp = 0 } = s, bx = W * .46, by = H - leg - 30 * k, hx = bx + 34 * k, hy = by - 34 * k;
    return l(`M${n(bx - 6)} ${n(by + 20 * k)}V${H - 3}h10M${n(bx + 10)} ${n(by + 20 * k)}V${H - 3}h10`, bk, 5) + poly([[bx - 36 * k, by - 6 * k], [bx - 70 * k, by - (10 + tailUp) * k], [bx - 66 * k, by + (12 - tailUp * .4) * k], [bx - 30 * k, by + 14 * k]], c2) + e(bx, by, 44 * k, 32 * k, C) + (c3 ? e(bx + 8 * k, by + 12 * k, 30 * k, 18 * k, c3) : '')
      + g('wg', e(bx - 8 * k, by - 2 * k, 28 * k, 18 * k, c2, ` transform="rotate(14 ${n(bx - 8 * k)} ${n(by - 2 * k)})"`)) + c(hx, hy, 22 * k, C) + crest + poly([[hx + 18 * k, hy - 6 * k], [hx + 40 * k, hy + 2 * k], [hx + 18 * k, hy + 8 * k]], bk) + c(hx + 6 * k, hy - 4 * k, 3.6, DK); };
  D('bird.small', '小鳥', 130, 110, o => fowl(130, 110, { c: o.c || '#58a6d6', c2: '#3f86b4', c3: '#fbf1dc', k: .8, leg: 18 }), {}, 'c 体の色');
  D('bird.crow', 'からす', 170, 150, o => fowl(170, 150, { c: o.c || '#4a4654', c2: '#3a3644', bk: '#5a5a66', k: 1.05, leg: 26 }), {}, 'c 体の色');
  D('bird.dove', 'はと', 170, 130, o => fowl(170, 130, { c: o.c || '#fbf6ea', c2: '#d9d2c4', bk: '#f08f7e', k: .92, leg: 20 }) + p('M142 54q12 -16 24 -8q-12 2 -14 16Z', '#6fb65c'), {}, 'c 体の色。小枝をくわえている');
  D('bird.crane', 'つる', 230, 320, o => {
    const a = o.c || '#fbf6ea', dk = '#3a3644';
    return l('M100 200V314h14M124 200V314h14', '#5a5a66', 6) + poly([[70, 150], [10, 200], [30, 214], [84, 196]], dk) + e(110, 170, 62, 40, a) + g('wg', p('M60 160Q110 120 160 160Q120 196 70 190Z', '#e6dfd0')) + l('M150 160Q190 120 176 50', a, 16) + c(178, 44, 20, a) + c(180, 30, 9, '#d9413a') + l('M166 60Q176 100 160 140', dk, 7)
      + poly([[194, 38], [228, 50], [194, 54]], '#c9a35a') + c(184, 44, 3.6, DK);
  }, {}, 'c 体の色');

  // ---------- 家畜 ----------
  defPart.group = '家畜';
  D('farm.cow', '牛', 300, 210, () => `<g transform="translate(300 0) scale(-1 1)">${A.cow()}</g>`, { anim: aCow }, '');
  const mane = f => G => p(`M${n(G.bx + G.bw * .5)} ${n(G.by - G.bh * .7)}Q${n(G.hx - G.hr * 1.5)} ${n(G.hy + 10)} ${n(G.hx - G.hr * .7)} ${n(G.hy - G.hr * .9)}Q${n(G.hx + 4)} ${n(G.hy - G.hr * 1.3)} ${n(G.hx + G.hr * .2)} ${n(G.hy - G.hr * .7)}Q${n(G.hx - G.hr * .4)} ${n(G.hy + G.hr * .4)} ${n(G.bx + G.bw * .8)} ${n(G.by - G.bh * .5)}Z`, f);
  const horse = { bw: 92, bh: 50, leg: 130, lw: 20, hr: 30, neck: 44, hdx: 40, hdy: 70, sn: [34, 20], ear: 'leaf', tail: 'droop', wagV: 2 };
  Q('farm.horse', '馬', 350, 300, Object.assign({ c: '#a86e3c', c2: '#8a5630', tailC: '#4a3528', snC: '#8a5630', behindHead: mane('#4a3528') }, horse));
  Q('farm.pig', 'ぶた', 250, 170, { c: '#f6b3b3', c2: '#e39a9a', bw: 76, bh: 46, leg: 44, lw: 19, hr: 36, ear: 'flop', earC: '#e39a9a', tail: 'pig', sn: [14, 17], snC: '#e98a8a', noseC: '#b56a6a' });
  Q('farm.sheep', 'ひつじ', 250, 195, { c: '#fbf6ea', c2: '#4a3f38', headC: '#5a4a40', bw: 70, bh: 46, leg: 56, lw: 14, hr: 26, ear: 'leaf', tail: 'short', eyeC: '#fff', sn: [16, 12], noseC: '#3a2a1e',
    over: G => [...Array(11)].map((_, i) => c(G.bx + G.bw * .95 * Math.cos(i * .571), G.by + G.bh * .9 * Math.sin(i * .571) - 4, 24, i % 2 ? '#fbf6ea' : '#f0eadc')).join('') + e(G.bx, G.by, G.bw * .8, G.bh * .8, '#fbf6ea'), onHead: G => c(G.hx - 6, G.hy - G.hr * .8, 16, '#fbf6ea') + c(G.hx + 12, G.hy - G.hr * .9, 12, '#f0eadc') }, '');

  // ---------- 森の小さな動物 ----------
  defPart.group = '森の小さな動物';
  Q('wood.rabbit', 'うさぎ', 175, 175, { c: '#fbf6ea', c2: '#e6dfd0', bw: 46, bh: 38, leg: 30, lw: 17, hr: 30, ear: 'long', tail: 'short', sn: [12, 10], noseC: '#f08f7e', eye: 4.5 });
  Q('wood.fox', 'きつね', 255, 164, { c: '#e8853c', c2: '#5a4636', c3: '#fbf6ea', bw: 62, bh: 30, leg: 46, lw: 14, hr: 30, ear: 'point', earIn: '#5a4636', tail: 'bushy', tipC: '#fbf6ea', sn: [24, 12], belly: 1, wagV: 3 });
  Q('wood.tanuki', 'たぬき', 225, 170, { c: '#a58a66', c2: '#5a4636', c3: '#e9dcc0', bw: 60, bh: 42, leg: 40, lw: 19, hr: 35, ear: 'round', earC: '#5a4636', tail: 'bushy', tailC: '#5a4636', sn: [18, 13], belly: 1, wagV: 3, eyeC: '#fff', onHead: G => '', behindHead: () => '', over: () => '' , eye: 0, onHead: G => e(G.hx + G.hr * .2, G.hy - G.hr * .1, 14, 11, '#5a4636') + c(G.hx + G.hr * .2, G.hy - G.hr * .14, 4, '#fff') });
  Q('wood.squirrel', 'りす', 175, 160, { c: '#c9783c', c2: '#a85f2a', c3: '#fbf1dc', bw: 40, bh: 30, leg: 28, lw: 14, hr: 27, ear: 'point', tail: 'bushy', sn: [12, 10], belly: 1, wagV: 6, bxk: .52, over: stripes([-.2, .15], '#8a4a20', 6) });

  // ---------- 大きな獣 ----------
  defPart.group = '大きな獣';
  Q('beast.bear', 'くま', 320, 245, { c: '#8a5a3c', c2: '#6b4430', c3: '#d9b08a', bw: 98, bh: 62, leg: 70, lw: 32, hr: 46, ear: 'round', earIn: '#d9b08a', tail: 'short', sn: [24, 18], wagV: 2 });
  Q('beast.wolf', 'おおかみ', 290, 200, { c: '#8f97a6', c2: '#6f7786', c3: '#e6e9ee', bw: 76, bh: 38, leg: 66, lw: 17, hr: 34, ear: 'point', tail: 'bushy', sn: [28, 13], belly: 1, eyeC: '#f6d24a', wagV: 2,
    onHead: G => poly([[G.hx + G.hr * .6, G.hy + G.hr * .5], [G.hx + G.hr * .8, G.hy + G.hr * .78], [G.hx + G.hr * .96, G.hy + G.hr * .5]], '#fff') });
  Q('beast.deer', 'しか', 280, 310, { c: '#c98a52', c2: '#a86e3c', c3: '#f3e6d0', bw: 70, bh: 36, leg: 124, lw: 13, hr: 26, neck: 28, hdx: 26, hdy: 58, sn: [20, 12], ear: 'leaf', tail: 'short', tailC: '#f3e6d0', wagV: 4,
    over: spots([[-.5, -.4, 7], [-.2, -.6, 7], [.1, -.4, 7], [-.35, 0, 6], [0, 0, 6]], '#f3e6d0'), behindHead: G => l(`M${n(G.hx - 4)} ${n(G.hy - 20)}Q${n(G.hx - 30)} ${n(G.hy - 60)} ${n(G.hx - 14)} ${n(G.hy - 96)}M${n(G.hx - 22)} ${n(G.hy - 56)}l-22 -14M${n(G.hx - 22)} ${n(G.hy - 76)}l22 -12M${n(G.hx + 8)} ${n(G.hy - 22)}Q${n(G.hx + 30)} ${n(G.hy - 56)} ${n(G.hx + 26)} ${n(G.hy - 92)}M${n(G.hx + 24)} ${n(G.hy - 58)}l22 -10`, '#8a5a33', 7) }, 'c 体の色');
  Q('beast.boar', 'いのしし', 285, 195, { c: '#7a5f4a', c2: '#5a4636', bw: 88, bh: 52, leg: 48, lw: 19, hr: 40, hdy: -16, ear: 'point', tail: 'thin', sn: [24, 18], snC: '#9a7a62', wagV: 6,
    over: G => p(`M${n(G.bx - G.bw * .7)} ${n(G.by - G.bh * .7)}l14 -22l12 16l14 -24l12 18l14 -24l12 20l14 -22l12 20l14 -16l8 22Q${n(G.bx)} ${n(G.by - G.bh * 1.02)} ${n(G.bx - G.bw * .7)} ${n(G.by - G.bh * .7)}Z`, '#5a4636'), onHead: G => p(`M${n(G.hx + G.hr * .7)} ${n(G.hy + G.hr * .5)}q10 -4 8 -24q-12 8 -16 22Z`, '#fbf6ea') });

  // ---------- 水の生き物 ----------
  defPart.group = '水の生き物';
  D('sea.fish', '魚', 190, 120, o => {
    const a = o.c || '#f08a4a', b = '#d9703a';
    return g('tail', poly([[52, 60], [6, 20], [16, 60], [6, 100]], b)) + p('M40 60Q80 6 140 22Q184 40 184 60Q184 80 140 98Q80 114 40 60Z', a) + p('M70 60Q100 30 140 30Q110 60 140 90Q100 90 70 60Z', '#f6a86a') + poly([[96, 24], [120, 2], [136, 24]], b) + poly([[100, 94], [116, 116], [130, 96]], b) + c(152, 50, 9, '#fff') + c(154, 50, 4.5, DK);
  }, { anim: (tl, el, q) => rot(qs(el, q, '.tail'), 16 * sin(tl * 6), 52, 60) }, 'c 体の色。尾をふる');
  D('sea.turtle', 'かめ', 250, 150, o => {
    const a = o.c || '#5f9a5a', sh = o.c2 || '#8a6a3a', sh2 = '#a58450';
    return e(60, 128, 30, 14, a) + e(170, 130, 30, 14, a) + l('M30 110l-22 8', a, 10) + g('hd', l('M190 100L224 84', a, 22) + c(226, 78, 22, a) + c(234, 72, 4, DK) + l('M228 88q8 4 14 -2', '#3f6a3c', 3)) + p('M30 116Q30 30 120 28Q210 30 210 116Z', sh) + r(24, 108, 192, 16, '#6b4f2a', 8)
      + poly([[100, 44], [140, 44], [156, 74], [120, 96], [84, 74]], sh2) + poly([[52, 70], [78, 78], [70, 104], [42, 104]], sh2) + poly([[162, 78], [188, 70], [198, 104], [170, 104]], sh2);
  }, { anim: (tl, el, q) => rot(qs(el, q, '.hd'), 4 * sin(tl * 1.2), 190, 100) }, 'c 体 / c2 こうら');
  D('sea.octopus', 'たこ', 240, 230, o => {
    const a = o.c || '#e2574c', b = '#c0443a'; let s = '';
    [[60, 150, -70, 60], [84, 160, -40, 70], [108, 166, -12, 60], [132, 166, 14, 62], [156, 160, 42, 70], [180, 150, 70, 58]].forEach(([x, y, dx, dy], i) => s += g('lg', l(`M${x} ${y}q${dx * .3} ${dy * .9} ${dx} ${dy}q${dx * .2} -6 ${dx * .1} -22`, i % 2 ? b : a, 22), ` data-i="${i}"`));
    return s + p('M44 150Q30 20 120 14Q210 20 196 150Q120 190 44 150Z', a) + e(86, 60, 26, 14, '#f08f7e') + c(92, 110, 13, '#fff') + c(148, 110, 13, '#fff') + c(95, 112, 6, DK) + c(151, 112, 6, DK) + e(120, 140, 14, 10, b) + c(120, 140, 6, '#fbf1dc');
  }, { anim: (tl, el, q) => qa(el, q, '.lg').forEach((d, i) => d.setAttribute('transform', `rotate(${(6 * sin(tl * 2 + i * 1.1)).toFixed(1)} 120 150)`)) }, 'c 体の色。足がゆれる');
  D('sea.whale', 'くじら', 480, 260, o => {
    const a = o.c || '#4f86c0', b = '#3f6fa3';
    return g('sp', l('M330 70Q330 30 300 24M330 70Q330 26 360 20M330 70V14', '#bfe3f5', 9)) + g('tail', p('M90 150Q40 120 6 60Q40 70 60 100Q64 60 96 40Q100 90 120 140Z', b)) + p('M80 150Q110 70 280 66Q470 70 474 170Q460 250 280 250Q130 246 80 150Z', a) + p('M150 214Q280 240 440 220Q400 252 280 250Q190 250 150 214Z', '#e6f0fa')
      + c(410, 150, 8, '#fff') + c(412, 150, 4.5, DK) + l('M430 190q20 6 38 -8', b, 5) + p('M260 190Q250 240 200 246Q220 210 230 186Z', b);
  }, { anim: (tl, el, q) => { rot(qs(el, q, '.tail'), 7 * sin(tl * 1.6), 100, 140); qs(el, q, '.sp').setAttribute('opacity', (.5 + .5 * sin(tl * 2.2)).toFixed(2)); } }, 'c 体の色。潮をふく');

  // ---------- 小さな生き物 ----------
  defPart.group = '小さな生き物';
  D('tiny.butterfly', 'ちょう', 44, 40, o => A.butterfly(o.c), { sh: false, sway: 0, lift: 70, nosplit: true, anim: aFlap(14, 20) }, 'c 羽の色。ひらひら舞わせるなら fly()');
  D('tiny.dragonfly', 'とんぼ', 120, 80, o => {
    const a = o.c || '#d9413a';
    return g('wg', e(58, 20, 10, 22, '#cfeaf8', ' transform="rotate(-24 66 40)"') + e(80, 20, 10, 22, '#cfeaf8', ' transform="rotate(18 74 40)"') + e(56, 58, 9, 16, '#e6f4fb', ' transform="rotate(24 66 40)"') + e(80, 58, 9, 16, '#e6f4fb', ' transform="rotate(-18 74 40)"')) + l('M10 40H96', a, 8) + c(102, 38, 11, a) + c(107, 34, 4, DK);
  }, { sh: false, sway: 0, lift: 90, nosplit: true, anim: aFlap(22, 40) }, 'c 体の色');
  D('tiny.frog', 'かえる', 150, 110, o => {
    const a = o.c || '#6fb65c', b = '#4f9a50';
    return e(34, 96, 30, 12, b) + e(116, 96, 30, 12, b) + p('M20 100Q10 40 75 36Q140 40 130 100Z', a) + e(75, 84, 40, 20, '#d9eeb8') + c(46, 34, 18, a) + c(104, 34, 18, a) + c(46, 32, 10, '#fff') + c(104, 32, 10, '#fff') + c(48, 32, 5, DK) + c(106, 32, 5, DK) + l('M52 62Q75 76 98 62', '#3f7a3c', 4) + e(58, 104, 14, 6, a) + e(92, 104, 14, 6, a);
  }, {}, 'c 体の色');
  Q('tiny.mouse', 'ねずみ', 150, 95, { c: '#b0a8a0', c2: '#948c84', bw: 38, bh: 24, leg: 16, lw: 11, hr: 23, ear: 'round', earIn: '#f6b3b3', tail: 'down', tailC: '#f6b3b3', sn: [12, 9], noseC: '#f08f7e', wagV: 7 });

  // ---------- 遠い国の動物 ----------
  defPart.group = '遠い国の動物';
  Q('wild.lion', 'ライオン', 320, 235, { c: '#e3a84a', c2: '#c98a34', c3: '#f6dca0', bw: 86, bh: 44, leg: 84, lw: 23, hr: 40, ear: 'round', tail: 'thin', tipC: '#8a5a2a', sn: [22, 16], wagV: 3, belly: 1, behindHead: G => c(G.hx - 6, G.hy + 4, G.hr * 1.5, '#a86a2a') + c(G.hx - 30, G.hy + 30, G.hr * .9, '#8a5a2a') });
  Q('wild.elephant', 'ぞう', 420, 320, { c: '#9aa3b0', c2: '#7f8896', bw: 130, bh: 88, leg: 100, lw: 46, hr: 64, ear: 'none', tail: 'thin', sn: 0, eye: 5, wagV: 3, bxk: .4,
    onHead: G => e(G.hx - G.hr * .5, G.hy + 4, G.hr * .62, G.hr * .86, '#7f8896') + l(`M${n(G.hx + G.hr * .7)} ${n(G.hy + G.hr * .2)}Q${n(G.hx + G.hr * 1.3)} ${n(G.hy + G.hr * 1.4)} ${n(G.hx + G.hr * .9)} ${n(G.hy + G.hr * 2.4)}q4 20 26 8`, '#9aa3b0', 30) + p(`M${n(G.hx + G.hr * .46)} ${n(G.hy + G.hr * .7)}q26 40 60 30q-26 -6 -36 -40Z`, '#fbf6ea') });
  Q('wild.giraffe', 'きりん', 290, 450, { c: '#f0c35a', c2: '#d9a83c', bw: 70, bh: 40, leg: 176, lw: 15, hr: 26, neck: 30, hdx: 50, hdy: 176, sn: [22, 14], snC: '#f6dca0', ear: 'leaf', tail: 'thin', tipC: '#8a5a2a', wagV: 3,
    over: spots([[-.55, -.3, 12], [-.2, -.5, 13], [.15, -.2, 12], [-.3, .15, 11], [.45, -.5, 10], [.1, .3, 9]], '#b87a2a'),
    behindHead: G => l(`M${n(G.hx - 6)} ${n(G.hy - 20)}v-22M${n(G.hx + 10)} ${n(G.hy - 22)}v-22`, '#d9a83c', 6) + c(G.hx - 6, G.hy - 44, 6, '#8a5a2a') + c(G.hx + 10, G.hy - 46, 6, '#8a5a2a'),
    onHead: G => [[-.9, 1.6], [-1.4, 3], [-1.9, 4.4], [-2.4, 5.6]].map(([u, v]) => c(G.hx + G.hr * u * .62, G.hy + G.hr * v * .78, 9, '#b87a2a')).join('') }, '');
  D('wild.monkey', 'さる', 200, 210, o => {
    const a = o.c || '#a86e3c', b = '#8a5630', f = '#f6dca0';
    return g('tail', l('M60 170Q10 170 16 110Q20 76 44 84', a, 12)) + e(110, 190, 62, 20, b) + p('M60 196Q50 110 104 104Q160 110 152 196Z', a) + e(106, 164, 30, 30, f) + l('M70 130Q50 160 70 186M144 130Q166 150 150 180', a, 16) + c(72, 188, 10, f) + c(150, 182, 10, f)
      + g('hd', c(64, 66, 16, a) + c(146, 66, 16, a) + c(64, 66, 8, f) + c(146, 66, 8, f) + c(105, 64, 44, a) + p('M70 66Q72 34 92 44Q105 50 118 44Q138 34 140 66Q142 104 105 106Q68 104 70 66Z', f) + c(90, 62, 4.5, DK) + c(120, 62, 4.5, DK) + l('M92 86Q105 96 118 86', '#8a3b2a', 3.5) + e(105, 76, 5, 3, b));
  }, { anim: (tl, el, q) => { rot(qs(el, q, '.tail'), 8 * sin(tl * 2.4), 60, 170); rot(qs(el, q, '.hd'), 3 * sin(tl * 1.3), 105, 106); } }, 'c 体の色');

  // ---------- 空想の生き物 ----------
  defPart.group = '空想の生き物';
  D('myth.dragon', '竜', 440, 340, o => {
    const a = o.c || '#5fa85a', b = '#4a8a4a', bl = '#f6dc8a', wg = o.c2 || '#e2574c';
    return g('tail', p('M110 250Q20 250 10 180Q0 150 -6 150L24 136L20 168Q40 220 120 210Z', a)) + g('wg', p('M190 170Q150 60 60 30Q90 80 80 110Q110 100 124 130Q150 124 170 180Z', wg) + l('M190 170Q150 90 62 32', '#b8433a', 6))
      + r(130, 240, 34, 96, b, 14) + r(250, 240, 34, 96, b, 14) + e(200, 230, 110, 66, a) + e(214, 262, 78, 34, bl) + l('M170 250h80M180 270h70', '#e0c060', 5) + r(160, 250, 36, 88, a, 14) + r(274, 250, 36, 88, a, 14)
      + poly([[120, 176], [140, 150], [156, 176]], wg) + poly([[166, 166], [186, 138], [204, 166]], wg) + poly([[214, 166], [234, 140], [250, 170]], wg)
      + g('hd', l('M280 200Q330 170 340 110', a, 46, ' stroke-linecap="butt"') + p('M300 110Q296 60 346 56Q400 56 424 96Q430 124 400 130L330 136Q304 134 300 110Z', a) + l('M330 60l-10 -34M356 56l6 -34', bl, 9) + c(360, 88, 10, '#fff') + c(363, 88, 5, DK) + c(414, 100, 4, b) + l('M360 124Q390 130 420 116', b, 4) + poly([[384, 124], [392, 138], [400, 124]], '#fff'));
  }, { anim: (tl, el, q) => { rot(qs(el, q, '.wg'), 8 * sin(tl * 3), 190, 170); rot(qs(el, q, '.tail'), 5 * sin(tl * 1.7), 110, 240); rot(qs(el, q, '.hd'), 3 * sin(tl * 1.2), 280, 200); } }, 'c 体 / c2 つばさ');
  Q('myth.unicorn', 'ユニコーン', 350, 310, Object.assign({ c: '#fbf6ea', c2: '#e6dfd0', tailC: '#f6a8c8', snC: '#f3e6e0', noseC: '#b98a8a', behindHead: G => mane('#c9a6f0')(G) + poly([[G.hx + 4, G.hy - 24], [G.hx + 30, G.hy - 84], [G.hx + 24, G.hy - 16]], '#e9b83a') }, horse, { leg: 130 }), 'c 体の色');
  D('myth.mermaid', '人魚', 220, 260, o => {
    const sk = o.skin || '#f6cfa6', hr = o.hairC || '#c0443a', tl2 = o.c || '#3fa7a0', tl3 = '#2f8a86';
    return e(110, 244, 104, 16, '#8f9690') + e(80, 236, 60, 14, '#a7ada6') + p('M40 60Q36 10 80 10Q124 10 120 60V150Q100 160 96 120Q98 40 80 40Q62 40 64 120Q60 160 40 150Z', hr)
      + g('tail', p('M176 196Q214 176 216 136Q200 150 186 148Q190 126 176 110Q166 140 150 180Z', tl3)) + p('M56 150Q50 220 110 226Q170 230 190 190L160 170Q140 196 108 190Q100 170 104 150Z', tl2) + l('M120 204q20 2 36 -12', tl3, 5)
      + p('M57 96Q80 86 103 96L106 156Q80 166 54 156Z', sk) + p('M56 108Q80 124 104 108L104 126Q80 138 56 126Z', '#f6a8c8') + l('M58 100Q40 130 50 158M102 100Q124 126 118 156', sk, 13) + r(74, 78, 12, 16, sk) + c(80, 58, 29, sk) + p('M51 58Q50 26 80 26Q110 26 109 58Q100 42 80 42Q60 42 51 58Z', hr)
      + c(69, 60, 3.4, DK) + c(91, 60, 3.4, DK) + c(61, 69, 6, '#f08f7e', ' opacity=".55"') + c(99, 69, 6, '#f08f7e', ' opacity=".55"') + l('M71 70Q80 79 89 70', '#8a3b2a', 2.8) + A.star(104, 36, 9, '#ffe9a0');
  }, { anim: (tl, el, q) => rot(qs(el, q, '.tail'), 8 * sin(tl * 2), 176, 190) }, 'skin 肌 / hairC 髪 / c 尾。岩に座っている');
  D('myth.ghost', 'おばけ', 160, 200, o => {
    const a = o.c || '#fbfdff';
    return p('M20 190Q10 20 80 14Q150 20 140 190Q126 170 110 190Q96 170 80 190Q64 170 50 190Q36 170 20 190Z', a) + l('M22 110Q4 100 6 80M138 110Q156 100 154 80', a, 16) + e(60, 78, 9, 13, '#4a4654') + e(100, 78, 9, 13, '#4a4654') + e(80, 114, 12, 16, '#4a4654') + e(44, 100, 9, 6, '#f6b3c8') + e(116, 100, 9, 6, '#f6b3c8');
  }, { sh: false, sway: 0, lift: 60, nosplit: true, dyn: tl => ({ lift: 60 + 16 * sin(tl * 1.4), rz: 4 * sin(tl * .9) }) }, 'c 色。ふわふわ浮く');
})();
