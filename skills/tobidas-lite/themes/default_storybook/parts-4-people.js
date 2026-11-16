// 目録の部品: 人物(A.person の骨格に、服・髪・かぶり物・持ち物を着せた組み合わせ)。作品ごとに編集しない。
// 絵の設定(art)には A.person の設定がそのまま使える: skin 肌 / hairC 髪の色 / top bottom 服の色 / armL armR 腕の角度 / mouth eyes look 表情 / holdR holdL 持ち物 / flip。
// 腕を動かすには anim: aArm('.aR', tl => 角度)。高い帽子や長い持ち物のある人物は、箱の上に余白を足してある(parts-lib.md の「上の余白」。足元は箱の下端のまま)。
(function () {
  const { n, r, c, e, p, l, g, at, poly } = DRAW;
  // ---- 髪(頭は中心 60,58・半径 29)----
  const H = {
    short: f => p('M31 58Q30 26 60 26Q90 26 89 58Q82 40 60 40Q40 40 31 58Z', f),
    bob: f => p('M30 60Q28 24 60 24Q92 24 90 60V84Q83 86 82 70Q80 44 60 42Q40 44 38 70Q37 86 30 84Z', f),
    long: f => p('M29 60Q26 22 60 22Q94 22 91 60V106Q84 110 81 96Q83 46 60 42Q37 46 39 96Q36 110 29 106Z', f),
    bun: f => c(60, 20, 14, f) + p('M31 58Q30 26 60 26Q90 26 89 58Q82 40 60 40Q40 40 31 58Z', f),
    twin: f => c(24, 62, 14, f) + c(96, 62, 14, f) + p('M31 58Q30 26 60 26Q90 26 89 58Q82 40 60 40Q40 40 31 58Z', f),
    mage: f => r(54, 12, 12, 22, f, 5) + p('M31 58Q30 26 60 26Q90 26 89 58Q84 44 60 42Q36 44 31 58Z', f),               // ちょんまげ
    nihon: f => c(60, 18, 15, f) + e(34, 52, 10, 16, f) + e(86, 52, 10, 16, f) + p('M31 58Q30 26 60 26Q90 26 89 58Q82 40 60 40Q40 40 31 58Z', f) + r(72, 8, 22, 5, '#e0b23c', 2),   // 日本髪
    tufts: f => c(33, 60, 9, f) + c(87, 60, 9, f),                                                                          // はげ頭の横の毛
    beard: f => p('M34 64Q38 108 60 110Q82 108 86 64Q78 86 60 86Q42 86 34 64Z', f),
    stache: f => p('M44 68Q52 62 60 68Q68 62 76 68Q68 76 60 71Q52 76 44 68Z', f),
    glasses: () => c(49, 60, 9, 'none', ' stroke="#5a4a40" stroke-width="2.5"') + c(71, 60, 9, 'none', ' stroke="#5a4a40" stroke-width="2.5"') + r(57, 58.5, 6, 2.5, '#5a4a40'),
  };
  // ---- かぶり物 ----
  const HAT = {
    crown: () => p('M34 36L37 8L49 24L60 4L71 24L83 8L86 36Z', '#e9b83a') + c(60, 28, 5, '#d9413a') + c(44, 30, 4, '#58a6d6') + c(76, 30, 4, '#58a6d6'),
    tiara: () => p('M38 36L44 20L52 30L60 12L68 30L76 20L82 36Z', '#e9b83a') + c(60, 26, 4, '#ff9ecb'),
    cone: (f, band = '#e0b23c') => e(60, 32, 48, 10, f) + p('M34 32Q50 -6 78 -34Q70 0 86 32Z', f) + p('M37 26Q60 34 83 26L86 32H34Z', band),
    straw: () => e(60, 34, 50, 11, '#e9c96a') + p('M34 34Q36 10 60 10Q84 10 86 34Z', '#f3d98a') + p('M36 28Q60 36 84 28L86 34H34Z', '#b8554a'),
    kasa: () => poly([[10, 42], [60, 6], [110, 42]], '#e9c96a') + poly([[60, 6], [110, 42], [64, 42]], '#d4b254'),
    helmet: () => p('M29 54Q28 20 60 20Q92 20 91 54Z', '#a7b0bc') + r(56, 40, 8, 26, '#8f97a6') + p('M56 20Q60 -8 74 -4Q66 6 64 20Z', '#d9413a'),
    cap: (f, f2 = '#3a3030') => p('M30 44Q30 20 60 20Q90 20 90 44Z', f) + p('M30 44H96Q98 52 90 52H30Z', f2) + c(60, 32, 6, '#e0b23c'),
    bandana: f => p('M30 50Q28 22 60 22Q92 22 90 50Q60 40 30 50Z', f) + p('M88 44l22 -8l-6 14l10 10l-24 -6Z', f),
    hachimaki: f => p('M30 46Q60 36 90 46V54Q60 44 30 54Z', f) + p('M88 48l18 -10l-2 12l10 8l-22 -2Z', f),
    hood: f => p('M26 66Q22 18 60 18Q98 18 94 66Q90 90 82 96Q88 50 60 44Q32 50 38 96Q30 90 26 66Z', f),
  };
  // ---- 服の飾り(胴は x 31..89, y 94..160)----
  const X = {
    collar: (f = '#fff') => p('M48 90L60 114L72 90L66 88L60 100L54 88Z', f),
    kimono: (f = '#fff') => p('M45 90L60 128L75 90L69 88L60 112L51 88Z', f),
    obi: f => r(33, 126, 54, 18, f, 3),
    belt: (f, bk = '#e0b23c') => r(32, 140, 56, 10, f) + r(54, 138, 12, 14, bk, 2),
    apron: (f = '#fff') => p('M42 106H78L86 196Q60 204 34 196Z', f) + r(40, 104, 40, 8, f),
    tie: f => p('M57 98h6l3 28l-6 8l-6 -8Z', f),
    buttons: (f = '#e0b23c') => c(60, 108, 3.5, f) + c(60, 124, 3.5, f) + c(60, 140, 3.5, f),
    skirt: f => p('M34 136H86L98 184Q60 194 22 184Z', f),
    gown: f => p('M36 130L84 130L114 214Q60 228 6 214Z', f),
    stripes: f => r(34, 104, 52, 8, f) + r(33, 120, 54, 8, f) + r(32, 136, 56, 8, f),
    hem: (f = '#fff') => p('M21 198Q60 212 99 198L100 212Q60 224 20 212Z', f),
    stars: f => A.star(48, 150, 8, f) + A.star(72, 178, 8, f) + A.star(50, 196, 6, f),
    dots: f => [[46, 150], [72, 160], [52, 182], [76, 194], [40, 200]].map(([x, y]) => c(x, y, 5, f)).join(''),
  };
  // ---- 背中側に描くもの ----
  const B = {
    cape: f => p('M32 96Q2 160 12 216H108Q118 160 88 96Z', f),
    wings: f => p('M52 110Q-10 60 4 130Q10 160 52 140ZM52 140Q10 150 20 190Q40 200 54 160ZM68 110Q130 60 116 130Q110 160 68 140ZM68 140Q110 150 100 190Q80 200 66 160Z', f),
    scarf: f => l('M10 150Q-6 60 60 14Q126 60 110 150', f, 12) + l('M10 150Q14 180 0 200M110 150Q106 180 120 200', f, 12),
    sack: (f, f2) => e(22, 128, 34, 40, f) + (f2 ? l('M8 116q10 -10 20 0q10 10 20 0M4 136q10 -10 20 0q10 10 20 0', f2, 4) : '') + p('M34 96l14 -6l4 12Z', f),
  };
  // ---- 手に持つもの(腕といっしょに回る。手は 80,150 / 左手は 40,150)----
  const HOLD = {
    staff: (f = '#8a5a33', top = '') => r(77, 40, 6, 182, f, 3) + top,
    orb: f => c(80, 36, 12, f) + c(76, 32, 4, '#fff'),
    cane: (f = '#8a5a33') => l('M80 222V140Q80 126 68 128', f, 6),
    hoe: () => r(77, 30, 6, 192, '#a56f3d', 3) + p('M70 30H104V44H86V58H70Z', '#8f97a6'),
    rod: () => l('M80 160L110 -10', '#c9a35a', 6) + c(110, -10, 5, '#d9413a'),
    spear: () => r(77, -10, 6, 232, '#8a5a33', 3) + poly([[80, -40], [90, -6], [70, -6]], '#c9ced6'),
    broom: () => r(77, 30, 6, 150, '#a56f3d', 3) + poly([[64, 176], [96, 176], [104, 226], [56, 226]], '#e9c96a') + r(62, 172, 36, 8, '#b8554a'),
    wand: () => r(78, 96, 4, 58, '#e9b83a', 2) + A.star(80, 92, 13, '#ffe9a0'),
    club: () => p('M73 150L65 208Q80 220 95 208L87 150Z', '#5a5a66') + c(72, 180, 4, '#8f97a6') + c(88, 190, 4, '#8f97a6') + c(76, 204, 4, '#8f97a6') + c(86, 168, 4, '#8f97a6'),
    sword: () => p('M76 150L70 76Q78 60 86 72L84 150Z', '#c9ced6') + r(66, 146, 28, 7, '#e0b23c', 3),
    bag: f => r(64, 152, 34, 28, f, 4) + p('M72 152v-8h18v8', 'none', ` stroke="${f}" stroke-width="4"`),
    fan: () => p('M80 150L58 106Q80 92 102 106Z', '#fff6e0') + c(80, 124, 8, '#d9413a'),
  };
  // 人物を登録する。f(o) が A.person の設定を返す。pad は箱の上に足す余白(高い帽子の分)、back は背中側の絵、k は拡大率
  const hc = (o, d) => o.hairC || d;
  const P = (name, label, f, x = {}) => {
    const pad = x.pad || 0, k = x.k || 1;
    defPart(name, label, Math.round(120 * k), Math.round((226 + pad) * k), o => { const q = f(o), back = q.back || ''; delete q.back; const s = at(0, pad, back + A.person(Object.assign(q, o, { flip: false }))); const t = k === 1 ? s : `<g transform="scale(${k})">${s}</g>`; return o.flip ? `<g transform="translate(${120 * k} 0) scale(-1 1)">${t}</g>` : t; }, {}, (pad ? `上の余白 ${Math.round(pad * k)}。` : '') + (x.note || 'skin 肌 / hairC 髪 / top bottom 服 / armL armR mouth eyes ポーズ'));
  };

  // ---------- 子ども ----------
  defPart.group = '子ども';
  P('kid.boy', '男の子', o => ({ top: '#58a6d6', bottom: '#4a6fa5', hair: H.short(hc(o, '#5a3a22')), extra: X.collar() }));
  P('kid.girl', '女の子', o => ({ top: '#ff9ecb', bottom: '#fbf6ea', hair: H.twin(hc(o, '#7a4f2e')) + c(24, 48, 6, '#e2574c') + c(96, 48, 6, '#e2574c'), extra: X.skirt(o.top || '#ff9ecb') + X.collar() }));
  P('kid.kimono', '着物の子', o => ({ top: '#d9534a', bottom: '#d9534a', long: true, hair: H.bob(hc(o, '#3a2a1e')), extra: X.dots('#f6d24a') + X.kimono() + X.obi('#f6d24a') }));
  defPart('kid.baby', '赤ん坊', 130, 130, o => {
    const sk = o.skin || '#f6cfa6', cl = o.top || '#fbf6ea';
    return p('M20 126Q10 70 65 66Q120 70 110 126Z', cl) + c(22, 104, 12, sk) + c(108, 104, 12, sk) + e(40, 124, 16, 8, sk) + e(90, 124, 16, 8, sk) + c(65, 44, 34, sk) + p('M56 12q10 -12 14 2q8 -4 4 8Z', hc(o, '#7a4f2e'))
      + c(53, 46, 3.6, '#3a2a1e') + c(77, 46, 3.6, '#3a2a1e') + c(44, 56, 6, '#f08f7e', ' opacity=".55"') + c(86, 56, 6, '#f08f7e', ' opacity=".55"') + p('M58 58Q65 66 72 58', 'none', ' stroke="#8a3b2a" stroke-width="2.8" stroke-linecap="round"') + c(65, 86, 6, '#ff9ecb');
  }, {}, 'skin 肌 / top 服 / hairC 髪');

  // ---------- 町の人 ----------
  defPart.group = '町の人';
  P('folk.man', '洋服の男', o => ({ top: '#7fae6a', bottom: '#7a5a48', hair: H.short(hc(o, '#5a3a22')), extra: X.collar() + X.belt('#5a4030') }));
  P('folk.woman', '洋服の女', o => ({ top: '#8a6fb0', bottom: '#8a6fb0', long: true, hair: H.bun(hc(o, '#8a5a33')), extra: X.apron() + X.collar() }));
  P('folk.kimonoMan', '着物の男', o => ({ top: '#4a6a8a', bottom: '#4a6a8a', long: true, hair: H.mage(hc(o, '#3a2a1e')), extra: X.kimono() + X.obi('#2f3a4f') }));
  P('folk.kimonoWoman', '着物の女', o => ({ top: '#c9547a', bottom: '#c9547a', long: true, hair: H.nihon(hc(o, '#3a2a1e')), extra: X.dots('#f6c8d6') + X.kimono() + X.obi('#e9b83a') }));

  // ---------- 年寄り ----------
  defPart.group = '年寄り';
  P('elder.jiji', 'おじいさん(和)', o => ({ top: '#8a7a5a', bottom: '#8a7a5a', long: true, hair: H.tufts(hc(o, '#f3f0ea')) + H.beard(hc(o, '#f3f0ea')), extra: X.kimono() + X.obi('#5f5540'), holdR: HOLD.cane(), mouth: 'smile' }));
  P('elder.baba', 'おばあさん(和)', o => ({ top: '#7a6a8a', bottom: '#7a6a8a', long: true, hair: H.bun(hc(o, '#e6e2dc')), extra: X.kimono() + X.obi('#4f4560') + X.apron('#f3ead8') }));
  P('elder.grandpa', 'おじいさん(洋)', o => ({ top: '#b8554a', bottom: '#5a5a66', hair: H.tufts(hc(o, '#f3f0ea')) + H.stache(hc(o, '#f3f0ea')) + H.glasses(), extra: X.collar() + X.buttons(), holdR: HOLD.cane() }));
  P('elder.grandma', 'おばあさん(洋)', o => ({ top: '#6a8f8a', bottom: '#6a8f8a', long: true, hair: H.bun(hc(o, '#e6e2dc')) + H.glasses(), extra: p('M34 96Q60 112 86 96L92 128Q60 140 28 128Z', '#f3c6a0') + X.hem('#4f706c') }));

  // ---------- 王族 ----------
  defPart.group = '王族';
  P('royal.king', '王', o => ({ top: '#b8433a', bottom: '#b8433a', long: true, hair: H.short(hc(o, '#8a5a33')) + H.beard(hc(o, '#8a5a33')) + HAT.crown(), extra: X.hem() + p('M36 94Q60 110 84 94L86 106Q60 120 34 106Z', '#fff') + X.belt('#e9b83a', '#d9413a'), back: B.cape('#7a3f8a') }), { pad: 4 });
  P('royal.queen', '女王', o => ({ top: '#7a4f9a', bottom: '#7a4f9a', long: true, hair: H.long(hc(o, '#5a3a22')) + HAT.crown(), extra: X.gown(o.top || '#7a4f9a') + X.hem('#e9b83a') + p('M44 92Q60 108 76 92', 'none', ' stroke="#e9b83a" stroke-width="5"') + c(60, 106, 5, '#ff9ecb') }), { pad: 4 });
  P('royal.prince', '王子', o => ({ top: '#3f7fc0', bottom: '#f3ead8', hair: H.short(hc(o, '#c9983a')) + HAT.tiara(), extra: X.buttons() + X.belt('#e9b83a') + r(36, 94, 12, 8, '#e9b83a', 3) + r(72, 94, 12, 8, '#e9b83a', 3), back: B.cape('#c9413a') }));
  P('royal.princess', '姫', o => ({ top: '#f6a8c8', bottom: '#f6a8c8', long: true, hair: H.long(hc(o, '#e9c05a')) + HAT.tiara(), extra: X.gown(o.top || '#f6a8c8') + p('M10 196Q60 214 110 196L114 214Q60 228 6 214Z', '#fff') + c(60, 104, 5, '#fff') + r(34, 126, 52, 8, '#e06a9a') }));

  // ---------- 働く人 ----------
  defPart.group = '働く人';
  P('worker.farmer', '農夫', o => ({ top: '#e9dcc0', bottom: '#5a7fa0', hair: HAT.straw(), extra: p('M40 112H80L86 162Q60 170 34 162Z', '#5a7fa0') + r(44, 94, 6, 22, '#5a7fa0') + r(70, 94, 6, 22, '#5a7fa0'), holdR: HOLD.hoe() }));
  P('worker.fisher', '漁師', o => ({ top: '#f3ead8', bottom: '#3f5a7a', hair: H.short(hc(o, '#3a2a1e')) + HAT.hachimaki('#fff'), extra: X.stripes('#3f8fc9') + p('M37 94Q46 90 50 96L46 160Q38 160 31 158ZM83 94Q74 90 70 96L74 160Q82 160 89 158Z', '#3f5a7a'), holdR: HOLD.rod() }), { pad: 14 });
  P('worker.merchant', '商人', o => ({ top: '#5f8a6a', bottom: '#6b5a4a', hair: H.short(hc(o, '#5a3a22')) + H.stache(hc(o, '#5a3a22')) + e(60, 30, 40, 9, '#7a5236') + p('M38 30Q40 12 60 12Q80 12 82 30Z', '#8a5a33'), extra: X.collar() + X.apron('#f3ead8'), back: B.sack('#c9a35a'), holdR: HOLD.bag('#8a5a33') }));
  P('worker.soldier', '兵士', o => ({ top: '#a7b0bc', bottom: '#5a5a66', hair: HAT.helmet(), extra: p('M40 96H80L84 150Q60 158 36 150Z', '#8f97a6') + X.belt('#5a4030') + c(60, 118, 9, '#e0b23c'), holdR: HOLD.spear(), holdL: p('M24 124Q24 110 40 108Q56 110 56 124Q56 160 40 174Q24 160 24 124Z', '#c9413a') + A.star(40, 138, 10, '#e0b23c') }), { pad: 44 });

  // ---------- ふしぎな人 ----------
  defPart.group = 'ふしぎな人';
  P('magic.wizard', '魔法使い', o => ({ top: '#3d4a8a', bottom: '#3d4a8a', long: true, hair: H.beard(hc(o, '#f3f0ea')) + HAT.cone(o.top || '#3d4a8a'), extra: X.stars('#ffe9a0') + X.belt('#8a5a33'), holdR: HOLD.staff('#8a5a33', HOLD.orb('#8fd0f0')) }), { pad: 38 });
  P('magic.witch', '魔女', o => ({ top: '#4a3a5a', bottom: '#4a3a5a', long: true, hair: H.long(hc(o, '#7a4f9a')) + HAT.cone('#3a2a46', '#7a4f9a'), extra: X.belt('#7a4f9a') + X.hem('#7a4f9a'), holdR: HOLD.broom() }), { pad: 38 });
  P('magic.fairy', '妖精', o => ({ top: '#8fd06c', bottom: '#fbf6ea', hair: H.bun(hc(o, '#e9c05a')) + c(60, 20, 5, '#ff9ecb'), extra: p('M34 136H86L98 176L84 170L74 182L60 170L46 182L36 170L22 176Z', o.top || '#8fd06c'), back: B.wings('#cfeaf8'), holdR: HOLD.wand() }));
  P('magic.tennyo', '天女', o => ({ top: '#f6c8d6', bottom: '#fbf6ea', long: true, hair: c(48, 16, 11, 'none', ` stroke="${hc(o, '#3a2a1e')}" stroke-width="7"`) + c(72, 16, 11, 'none', ` stroke="${hc(o, '#3a2a1e')}" stroke-width="7"`) + H.short(hc(o, '#3a2a1e')) + c(60, 30, 5, '#e9b83a'), extra: X.kimono() + X.obi('#8fd0f0') + X.hem('#f6c8d6'), back: B.scarf('#ffd9e6') }), { pad: 6 });

  // ---------- 敵役 ----------
  defPart.group = '敵役';
  P('foe.oni', '鬼', o => ({ skin: '#e2574c', top: o.skin || '#e2574c', bottom: o.skin || '#e2574c', hair: p('M34 36L42 6L54 30ZM86 36L78 6L66 30Z', '#f6d24a') + p('M30 54Q30 26 60 28Q90 26 90 54Q80 38 70 46Q60 34 50 46Q40 38 30 54Z', hc(o, '#3a3030')) + p('M50 78l4 8l4 -8ZM62 78l4 8l4 -8Z', '#fff'), extra: p('M32 136H88L94 178L80 170L70 180L60 170L50 180L40 170L26 178Z', '#f3c64f') + l('M42 142l6 16M58 142l4 18M74 142l6 16', '#3a3030', 5), holdR: HOLD.club(), mouth: 'flat' }), { k: 1.25, note: '肌の色は skin(青鬼は #58a6d6)' });
  P('foe.giant', '巨人', o => ({ top: '#8a7a5a', bottom: '#6b5a4a', hair: H.short(hc(o, '#5a3a22')) + H.beard(hc(o, '#5a3a22')), extra: p('M37 94Q60 84 83 94L60 130Z', '#f6cfa6') + X.belt('#5a4030') + r(40, 150, 14, 12, '#a58a5a') + r(70, 146, 12, 12, '#a58a5a'), holdR: HOLD.club(), mouth: 'flat' }), { k: 1.8 });
  P('foe.pirate', '海賊', o => ({ top: '#fbf6ea', bottom: '#3a3f4a', hair: H.beard(hc(o, '#3a3030')) + HAT.bandana('#c9413a') + c(71, 60, 9, '#3a3030') + l('M40 44L92 66', '#3a3030', 3), extra: X.stripes('#c9413a') + X.belt('#5a4030'), holdR: HOLD.sword() }));
  P('foe.thief', 'どろぼう', o => ({ top: '#4a5568', bottom: '#3a4558', hair: HAT.hood('#3f6a52') + r(31, 52, 58, 16, '#3a3f4a', 6) + p('M52 84q8 8 16 0', 'none', ' stroke="#3f6a52" stroke-width="8"'), extra: X.stripes('#3a4558'), back: B.sack('#3f8a5a', '#fff'), mouth: 'flat' }));

  // ---------- 現代の人 ----------
  defPart.group = '現代の人';
  P('modern.office', '会社員', o => ({ top: '#3a4a6a', bottom: '#3a4a6a', hair: H.short(hc(o, '#3a2a1e')), extra: p('M48 90L60 132L72 90Z', '#fff') + X.tie('#c9413a'), holdR: HOLD.bag('#7a5236') }));
  P('modern.doctor', '医者', o => ({ top: '#fbf6ea', bottom: '#5a7fa0', hair: H.short(hc(o, '#5a3a22')) + H.glasses(), extra: p('M36 150H84L90 196Q60 204 30 196Z', '#fbf6ea') + p('M50 90L60 124L70 90Z', '#8fc6f0') + l('M48 96Q44 130 56 136', '#4a5568', 3) + c(58, 138, 6, '#8f97a6') }));
  P('modern.police', '警官', o => ({ top: '#3a4f8a', bottom: '#2f3f6a', hair: HAT.cap('#3a4f8a'), extra: X.collar('#fff') + X.tie('#2f3f6a') + X.belt('#3a3030') + c(46, 110, 5, '#e0b23c') }));
  P('modern.captain', '船長', o => ({ top: '#fbf6ea', bottom: '#2f3a4f', hair: H.beard(hc(o, '#f3f0ea')) + HAT.cap('#fbf6ea', '#2f3a4f'), extra: X.buttons() + r(34, 94, 14, 8, '#2f3a4f', 3) + r(72, 94, 14, 8, '#2f3a4f', 3) + l('M36 100h10M74 100h10', '#e0b23c', 3) }));
})();
