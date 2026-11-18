// 作品定義。書き方は references/book-api.md、完成見本は themes/storybook/examples/jack/book/book.js。
// 座標: X∈[-720,720](0=本の背)、Y∈[0,920](大きいほど手前)。tl = 見開きが開ききってからの秒数。

const spread1 = {
  hold: 7.5,
  music: 'bright',                             // BGMの気分(themes/storybook/sound.md)。自動再生中だけ鳴る
  ground: A.gMeadow({ seed: 5 }),
  caption: ['むかし むかし、あるところに……', '(ここに 字幕を 書きます)'],
  pieces: [
    // 奥: 背をまたぐ背景(自動で左右に切り分けられる)
    pc(0, 100, 1400, 250, A.hills(1400, 250, '#a5d3e2', '#8cc6cf', 2, 1.2, hillTrees(9, 3, 50, true)), { sh: false, sway: 0 }),
    pc(-440, 120, 200, 200, A.sun(200), { lift: 330, glow: 36, sh: false, anim: aSun(200), sway: 2 }),
    pc(150, 130, 270, 110, A.cloud(270, 110, 2), { lift: 380, sh: false, dyn: tl => ({ dx: 40 * sin(tl * .3) }) }),
    pc(0, 230, 1420, 210, A.hills(1420, 210, '#7cbf66', '#94d078', 7, 1.0, hillTrees(8, 5, 70)), { sh: false, sway: 0 }),
    // 中ほど: 建物と木
    pc(-350, 440, 420, 380, A.cottage(), { k: 1.2, anim: aSmoke, sway: .3 }),
    pc(390, 410, 300, 430, A.tree(300, 430, { fruit: '#e2574c' }), { sway: 1.4 }),
    // 手前: 人物(手を振り、弾む)
    pc(70, 700, 120, 226, A.hero({ armR: -150 }), { k: .82, anim: aArm('.aR', tl => -150 + 20 * sin(tl * 7)), dyn: tl => ({ lift: 10 * abs(sin(tl * 3.5)) }) }),
    // いちばん手前: 草と茂み
    pc(-560, 780, 280, 120, A.bush(280, 120)),
    pc(560, 820, 240, 90, A.grass(240, 90, undefined, undefined, GR)),
    bird(-300, 300, 420, 34, 0), fly(220, 800, '#ff9ecb', 0),
  ],
};

const spread2 = {
  hold: 7.5,
  music: 'airy',
  sfx: [[1.5, 'pop']],                         // 効果音 [tl, 名前]。下の「ぽん」と現れる動きに合わせる
  ground: A.gMeadow({ seed: 9, pond: null }),
  caption: ['(2つめの 見開き)'],
  pieces: [
    pc(0, 110, 1400, 240, A.hills(1400, 240, '#b5c9e8', '#9db7dc', 11, .9), { sh: false, sway: 0 }),
    pc(300, 420, 300, 430, A.tree(300, 430), { sway: 1.4 }),
    // 途中で「ぽん」と現れる
    pc(-120, 700, 120, 226, A.hero({ armL: 150, armR: -150, mouth: 'big' }), { k: .82, dyn: tl => ({ sc: pop(tl, 1.5), op: tl > 1.5 ? 1 : 0, lift: 30 * abs(sin(tl * 4)) }) }),
    pc(-540, 800, 260, 100, A.bush(260, 100)),
  ],
};

Tobidas.book({
  title: 'とびだすえほん',
  lang: 'ja',
  theme: { board: '#1f3f66', spine: '#17304f', style: 'flat', desk: 'wood' },   // 画風と机(themes/storybook/presets.md)。画風は作る間 'flat' のままにし、全部できてから決まった画風に書き換える
  sound: { set: 'musicbox' },                                                     // 曲集
  cover: A.cover(),
  end: { title: 'おしまい', sub: 'だいめい' },
  spreads: [spread1, spread2],
});
