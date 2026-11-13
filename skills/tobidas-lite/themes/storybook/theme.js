// tobidas テーマ「storybook」— 童話の絵本。画風・机・曲集・気分・効果音をまとめて登録する。
// 書式は references/theme-format.md、中身の一覧と使い分けはこのフォルダの presets.md / sound.md。作品ごとには編集しない。
(function () {
  const { edge, grain, tex, noise, planks, grid } = Tobidas.fx, B = Tobidas.sound.bars, PI = Math.PI;

  // ---- 動く背景(机の代わりに本の後ろへ敷く。1920×1080 の SVG の中身と、時刻 t で動かす関数)----
  // 本が画面中央を占めるので、見どころ(雲・水平線・木のこずえ・屋根)は上3分の1と左右に寄せる。軽くぼかして表示されるので、細部は描かない。
  const R = seed => { let v = (seed * 9301 + 49297) >>> 0; return () => { v = (v * 1664525 + 1013904223) >>> 0; return v / 4294967296; }; };
  const N1 = n => n.toFixed(1), wrap = (v, lo, hi) => lo + ((((v - lo) % (hi - lo)) + (hi - lo)) % (hi - lo));
  const each = (el, q, sel, f) => (q[sel] || (q[sel] = [...el.querySelectorAll(sel)])).forEach(f);
  const tr = (e, x, y, extra = '') => e.setAttribute('transform', `translate(${N1(x)} ${N1(y)})${extra}`);
  const skyGrad = (id, a, b, y1 = 1080) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect x="-100" y="-100" width="2120" height="${y1 + 100}" fill="url(#${id})"/>`;
  const sCloud = (x, y, k, c = '#fff') => `<g class="cl" data-x="${x}" data-y="${y}" data-v="${N1(6 + k * 9)}"><g transform="scale(${k})"><ellipse cx="0" cy="0" rx="120" ry="34" fill="${c}"/><ellipse cx="-50" cy="-26" rx="60" ry="34" fill="${c}"/><ellipse cx="30" cy="-38" rx="72" ry="42" fill="${c}"/><ellipse cx="90" cy="-14" rx="50" ry="26" fill="${c}"/></g></g>`;
  const sBird = (x, y, v, ph) => `<g class="bd" data-x="${x}" data-y="${y}" data-v="${v}" data-p="${ph}"><path class="w" d="M-22 0Q-11 -14 0 0Q11 -14 22 0" stroke="#4a5568" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  const wavePath = (y, amp, len, seed) => { const r = R(seed); let d = `M-300 ${y}`; for (let x = -300; x < 2300; x += len) d += `q${N1(len / 4)} ${N1(-amp * (.6 + r() * .8))} ${N1(len / 2)} 0t${N1(len / 2)} 0`; return d + 'V1200H-300Z'; };
  const moveClouds = (t, el, q) => each(el, q, '.cl', e => tr(e, wrap(+e.dataset.x + t * +e.dataset.v, -300, 2220), +e.dataset.y));
  const moveBirds = (t, el, q) => each(el, q, '.bd', e => { const v = +e.dataset.v, p = +e.dataset.p; tr(e, wrap(+e.dataset.x + t * v, -100, 2020), +e.dataset.y + 16 * Math.sin(t * .7 + p), ` scale(${v < 0 ? -1 : 1} ${N1(.35 + .65 * Math.abs(Math.sin(t * 5 + p)))})`); });
  const SCENES = {
    // 海辺: 空と雲、寄せては返す波の重なり、沖の帆かけ舟、かもめ、手前の砂浜と波打ちぎわ
    seaside: {
      svg: () => {
        let s = skyGrad('scA', '#7cc6f2', '#e4f5fc', 420) + `<circle cx="1560" cy="150" r="150" fill="#fff6d0" opacity=".35"/><circle cx="1560" cy="150" r="78" fill="#fff3b8"/>`;
        s += sCloud(200, 150, 1.2) + sCloud(820, 90, .8) + sCloud(1250, 210, 1) + sCloud(1750, 300, .7);
        s += `<rect x="-100" y="400" width="2120" height="780" fill="#2f8fcc"/>`;
        [[420, 10, 190, '#3f9fd6'], [480, 14, 230, '#4bacde'], [560, 18, 280, '#5ab8e4'], [660, 22, 330, '#6cc4ea'], [780, 26, 400, '#84d0ee']].forEach(([y, a, l, c], i) => s += `<path class="wv" data-i="${i}" d="${wavePath(y, a, l, 3 + i)}" fill="${c}"/>`);
        const r = R(5); for (let i = 0; i < 26; i++) s += `<ellipse class="gl" data-p="${N1(r() * 6.3)}" cx="${N1(r() * 1920)}" cy="${N1(430 + r() * 420)}" rx="${N1(14 + r() * 18)}" ry="4" fill="#fff"/>`;
        s += `<g class="bt" data-x="500" data-y="412"><path d="M-46 0H46L32 22H-32Z" fill="#8a5a33"/><path d="M0 -4V-78L44 -14Z" fill="#fff8e6"/><path d="M-4 -4V-60L-34 -10Z" fill="#f3e2c0"/></g>`;
        s += `<path class="fm" d="${wavePath(905, 20, 420, 9)}" fill="#fff"/><path class="sd" d="${wavePath(930, 20, 420, 9)}" fill="#f0dcae"/>`;
        return s + sBird(300, 260, 26, 0) + sBird(420, 300, 22, 2) + sBird(1500, 330, -24, 4);
      },
      anim: (t, el, q) => {
        moveClouds(t, el, q); moveBirds(t, el, q);
        each(el, q, '.wv', e => { const i = +e.dataset.i; tr(e, 46 * Math.sin(t * (.42 + i * .05) + i * 1.7), (5 + i * 2) * Math.sin(t * .8 + i)); });
        each(el, q, '.gl', e => e.setAttribute('opacity', N1(.15 + .55 * Math.abs(Math.sin(t * 1.3 + +e.dataset.p)))));
        each(el, q, '.bt', e => tr(e, wrap(+e.dataset.x + t * 7, -120, 2040), +e.dataset.y + 4 * Math.sin(t * 1.4), ` rotate(${N1(3 * Math.sin(t * 1.1))})`));
        const k = Math.sin(t * .55); each(el, q, '.fm', e => tr(e, 30 * Math.sin(t * .3), -26 * k)); each(el, q, '.sd', e => tr(e, 30 * Math.sin(t * .3), -8 * k));
      },
      room: ['#bfe6f8', '#6fb8e4', '#2f7fb8'], light: '255,250,226', blur: 5,
    },
    // 草原: 流れる雲、重なる丘、風にゆれる草、舞う綿毛
    meadow: {
      svg: () => {
        let s = skyGrad('scB', '#8fd0f6', '#eaf7ee', 520) + sCloud(160, 170, 1.3) + sCloud(700, 110, .9) + sCloud(1180, 220, 1.1) + sCloud(1680, 140, .8);
        [[430, 46, 760, '#a9d9a0', 1], [500, 60, 620, '#8fcf7c', 2], [600, 54, 900, '#77c064', 3], [730, 40, 700, '#63b254', 4]].forEach(([y, a, l, c, sd]) => s += `<path d="${wavePath(y, a, l, sd + 20)}" fill="${c}"/>`);
        const r = R(8); for (let i = 0; i < 9; i++) { const x = 60 + r() * 1800, y = 470 + r() * 120, k = .5 + r() * .5; s += `<g transform="translate(${N1(x)} ${N1(y)}) scale(${N1(k)})"><rect x="-7" y="-30" width="14" height="34" fill="#7a5a3a"/><circle cx="0" cy="-56" r="40" fill="#4f9a50"/><circle cx="-14" cy="-70" r="20" fill="#6fb65c"/></g>`; }
        for (let i = 0; i < 46; i++) { const x = r() * 1920, y = 800 + r() * 280, h = 60 + r() * 70; s += `<g class="gr" data-p="${N1(r() * 6.3)}" data-x="${N1(x)}" data-y="${N1(y)}"><path d="M-16 0Q-12 ${N1(-h * .7)} -22 ${N1(-h)}Q-2 ${N1(-h * .6)} 0 0Q4 ${N1(-h * .8)} 14 ${N1(-h * 1.1)}Q12 ${N1(-h * .5)} 18 0Z" fill="${r() > .5 ? '#4f9f46' : '#6dba55'}"/>${i % 4 ? '' : `<circle cx="0" cy="${N1(-h * .9)}" r="11" fill="${['#fff', '#ffd24d', '#ff9ecb'][i % 3]}"/>`}</g>`; }
        for (let i = 0; i < 18; i++) s += `<circle class="fl" data-x="${N1(r() * 1920)}" data-y="${N1(r() * 900)}" data-p="${N1(r() * 6.3)}" data-v="${N1(14 + r() * 20)}" r="${N1(4 + r() * 4)}" fill="#fff"/>`;
        return s + sBird(240, 250, 24, 1) + sBird(1400, 300, -20, 3);
      },
      anim: (t, el, q) => {
        moveClouds(t, el, q); moveBirds(t, el, q);
        each(el, q, '.gr', e => e.setAttribute('transform', `translate(${e.dataset.x} ${e.dataset.y}) rotate(${N1(7 * Math.sin(t * 1.5 + +e.dataset.p) + 4 * Math.sin(t * .6 + +e.dataset.x * .004))})`));
        each(el, q, '.fl', e => { const p = +e.dataset.p, v = +e.dataset.v; tr(e, wrap(+e.dataset.x + t * v, -40, 1960), wrap(+e.dataset.y - t * v * .35, -40, 940) + 22 * Math.sin(t * .9 + p)); e.setAttribute('opacity', N1(.5 + .4 * Math.sin(t * 1.3 + p))); });
      },
      room: ['#d6efc8', '#8fcf7c', '#3f8a46'], light: '255,252,226', blur: 5,
    },
    // 森: 木もれ日の筋、奥行き3層の木立、ゆれるこずえ、舞い落ちる葉
    forest: {
      svg: () => {
        let s = skyGrad('scC', '#cfe9b8', '#5f9a62', 700) + `<rect x="-100" y="640" width="2120" height="560" fill="#356b46"/>`;
        [[150, 300, 34], [620, 260, 26], [1180, 340, 30], [1640, 240, 24]].forEach(([x, w, a], i) => s += `<path class="ry" data-p="${i * 1.7}" d="M${x} -60L${x + w} -60L${x + w - 380} 1140L${x - 460} 1140Z" fill="#fff8c8" opacity=".${a}"/>`);
        const r = R(13);
        [[14, 560, .55, '#6fa672', '#5a8f60', '#7a6a52'], [11, 700, .8, '#4f8f5a', '#3f7a4c', '#5f4a36'], [9, 900, 1.15, '#2f6a44', '#255838', '#4a3626']].forEach(([n, y, k, c, c2, tk], L) => {
          for (let i = 0; i < n; i++) { const x = (i + r() * .7) * (2100 / n) - 80, h = (300 + r() * 160) * k, w = (22 + r() * 12) * k; s += `<g class="tk" data-x="${N1(x)}" data-y="${y + L * 20}" data-p="${N1(r() * 6.3)}" data-a="${N1(1.6 - L * .4)}"><rect x="${N1(-w / 2)}" y="${N1(-h)}" width="${N1(w)}" height="${N1(h + 300)}" fill="${tk}"/><circle cx="0" cy="${N1(-h)}" r="${N1(110 * k)}" fill="${c}"/><circle cx="${N1(-60 * k)}" cy="${N1(-h + 40 * k)}" r="${N1(80 * k)}" fill="${c2}"/><circle cx="${N1(64 * k)}" cy="${N1(-h + 30 * k)}" r="${N1(86 * k)}" fill="${c2}"/><circle cx="${N1(-20 * k)}" cy="${N1(-h - 50 * k)}" r="${N1(70 * k)}" fill="${c}"/></g>`; } });
        for (let i = 0; i < 22; i++) s += `<ellipse class="lf" data-x="${N1(r() * 1920)}" data-y="${N1(r() * 1100)}" data-p="${N1(r() * 6.3)}" data-v="${N1(24 + r() * 26)}" rx="13" ry="6" fill="${['#e6c84a', '#b9d66a', '#e89a4a'][i % 3]}"/>`;
        return s;
      },
      anim: (t, el, q) => {
        each(el, q, '.tk', e => e.setAttribute('transform', `translate(${e.dataset.x} ${e.dataset.y}) rotate(${N1(+e.dataset.a * Math.sin(t * .7 + +e.dataset.p))})`));
        each(el, q, '.ry', e => e.setAttribute('transform', `translate(${N1(30 * Math.sin(t * .2 + +e.dataset.p))} 0)`));
        each(el, q, '.lf', e => { const p = +e.dataset.p, v = +e.dataset.v; tr(e, wrap(+e.dataset.x + 60 * Math.sin(t * .8 + p) + t * 6, -40, 1960), wrap(+e.dataset.y + t * v, -40, 1120), ` rotate(${N1(t * 70 + p * 60)})`); });
      },
      room: ['#9cc98a', '#4f8f5a', '#1f4a30'], light: '250,255,214', blur: 5,
    },
    // 市街: 夕方前の空、奥行き3層の建物とまたたく窓、高架を走る電車、のぼる気球
    town: {
      svg: () => {
        let s = skyGrad('scD', '#8fc4ee', '#fde6c8', 620) + sCloud(260, 130, 1.1, '#fffaf2') + sCloud(980, 90, .8, '#fffaf2') + sCloud(1560, 190, 1, '#fffaf2');
        s += `<g class="bl" data-x="1380" data-y="330"><ellipse cx="0" cy="0" rx="44" ry="54" fill="#e8607a"/><path d="M-44 0A44 54 0 0 0 44 0Z" fill="#f3c64f"/><path d="M-16 50L-8 78H8L16 50Z" fill="#8a5a33"/></g>`;
        const r = R(17), win = (x, y, w, h, c) => { let o = ''; for (let yy = y + 26; yy < y + h - 30; yy += 46) for (let xx = x + 18; xx < x + w - 30; xx += 40) o += `<rect class="${r() > .72 ? 'wn' : ''}" data-p="${N1(r() * 6.3)}" x="${N1(xx)}" y="${N1(yy)}" width="20" height="26" fill="${c}"/>`; return o; };
        [[520, 200, 150, ['#b9c6dc', '#c6d0e2', '#aebdd6'], '#e8eef8', 0], [640, 280, 190, ['#e9c9a8', '#d9b08c', '#f0d8bc', '#c9a58a'], '#fff3c8', 1], [800, 300, 230, ['#b8684e', '#8f7a9c', '#6f8fae', '#c98a5a'], '#ffe9a8', 2]].forEach(([base, hmax, wmax, cols, wc, L]) => {
          for (let x = -60; x < 1980;) { const w = wmax * (.55 + r() * .5), h = hmax * (.45 + r() * .6), c = cols[Math.floor(r() * cols.length)]; s += `<rect x="${N1(x)}" y="${N1(base - h)}" width="${N1(w)}" height="${N1(h + 500)}" fill="${c}"/>` + (r() > .5 ? `<path d="M${N1(x - 6)} ${N1(base - h)}L${N1(x + w / 2)} ${N1(base - h - 40 - L * 14)}L${N1(x + w + 6)} ${N1(base - h)}Z" fill="${['#8a5a52', '#6a7a9a', '#a85a48'][L]}"/>` : '') + win(x, base - h, w, Math.min(h + 60, 300), wc); x += w + (L ? 0 : 14); }
          if (L === 1) s += `<rect x="-100" y="${base + 26}" width="2120" height="16" fill="#8a94a8"/>` + Array.from({ length: 14 }, (_, i) => `<rect x="${i * 150 - 20}" y="${base + 40}" width="16" height="120" fill="#8a94a8"/>`).join('') + `<g class="tn" data-x="200" data-y="${base + 26}">${[0, 1, 2].map(i => `<rect x="${i * 128}" y="-46" width="120" height="46" rx="10" fill="${i ? '#f6f1e6' : '#e85b4f'}"/><rect x="${i * 128 + 12}" y="-36" width="96" height="16" fill="#7fb3c9"/>`).join('')}</g>`;
        });
        return s + sBird(360, 240, 22, 0) + sBird(1100, 280, -20, 2);
      },
      anim: (t, el, q) => {
        moveClouds(t, el, q); moveBirds(t, el, q);
        each(el, q, '.tn', e => tr(e, wrap(+e.dataset.x + t * 90, -500, 2100), +e.dataset.y));
        each(el, q, '.bl', e => tr(e, +e.dataset.x + 40 * Math.sin(t * .15), +e.dataset.y + 26 * Math.sin(t * .23), ` rotate(${N1(3 * Math.sin(t * .4))})`));
        each(el, q, '.wn', e => e.setAttribute('opacity', Math.sin(t * .5 + +e.dataset.p) > .2 ? '1' : '.35'));
      },
      room: ['#f3dcc0', '#b89a8a', '#4f4a5c'], light: '255,238,206', blur: 5,
    },
  };
  Tobidas.theme({
    id: 'storybook', label: '童話の絵本', engine: 1,
    defaults: { style: 'kirigami', desk: 'wood', set: 'musicbox' },

    // ---- 画風(theme.style)---- filter は SVG フィルタの中身、pageFilter はページの絵にかける CSS フィルタ
    styles: {
      kirigami: { label: '切り紙', filter: edge(3.5, '#fff9ea') + grain(.3, .79) + tex() + `<feMerge><feMergeNode in="edge"/><feMergeNode in="tex"/></feMerge>`, grain: .5, shadow: 1 },
      flat: { label: 'フラット', filter: `<feMerge><feMergeNode in="SourceGraphic"/></feMerge>`, grain: .12, shadow: .75 },
      crayon: { label: 'クレヨン', filter: `<feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="7" result="w"/><feDisplacementMap in="SourceGraphic" in2="w" scale="7" xChannelSelector="R" yChannelSelector="G" result="s"/>` + grain(.62, .56, 1.1) + tex('s', 's'), grain: .75, shadow: .7 },
      vintage: { label: 'レトロ絵本', filter: edge(3, '#f1e3be') + `<feColorMatrix in="SourceGraphic" type="matrix" values=".66 .26 .08 0 .03  .2 .68 .1 0 .02  .16 .26 .46 0 .02  0 0 0 1 0" result="c"/>` + grain(.36, .72) + tex('c') + `<feMerge><feMergeNode in="edge"/><feMergeNode in="tex"/></feMerge>`, pageFilter: 'sepia(.4) saturate(.78)', grain: .7, shadow: 1 },
      silhouette: { label: '影絵', filter: `<feColorMatrix in="SourceGraphic" type="matrix" values=".1 .2 .04 0 .04  .1 .2 .04 0 .04  .16 .32 .06 0 .1  0 0 0 1 0"/>`, pageFilter: 'grayscale(1) sepia(.8) saturate(1.7) brightness(1.06)', grain: .45, shadow: 1.3 },
    },

    // ---- 机・背景(theme.desk)---- background は机の面の CSS、room はまわりの部屋の色3つ、light は光の色。scene を持つものは「動く背景」
    desks: {
      wood: { label: '板張り', background: th => planks('rgba(40,18,4,.5)', '0 0 0 0 .35  0 0 0 0 .17  0 0 0 0 .05  1.6 0 0 0 -.45', th.table || ['#9a6a3e', '#7d5230']), room: ['#5a3d2a', '#2a1a12', '#120a06'], light: '255,226,170' },
      lightwood: { label: '白木', background: () => planks('rgba(110,74,36,.38)', '0 0 0 0 .55  0 0 0 0 .36  0 0 0 0 .16  1.2 0 0 0 -.42', ['#dcbc8c', '#c8a474']), room: ['#6a5038', '#33241a', '#170f0a'], light: '255,236,196' },
      linen: { label: '麻布', background: () => `${grid('rgba(120,98,64,.17)', 10, 3)}, ${noise(.6, .6, '0 0 0 0 .45  0 0 0 0 .38  0 0 0 0 .28  0 0 0 .35 0')}, linear-gradient(90deg,#e6dac2,#d0c1a4)`, room: ['#6b5f4c', '#352e24', '#17130e'], light: '255,238,206' },
      felt: { label: 'フェルト(緑)', background: () => `${noise(.85, .85, '0 0 0 0 .08  0 0 0 0 .2  0 0 0 0 .12  0 0 0 .55 0')}, linear-gradient(90deg,#34724f,#245639)`, room: ['#2f4a3a', '#16261d', '#0a120e'], light: '236,244,210' },
      marble: { label: '大理石', background: () => `${noise(.016, .028, '0 0 0 0 .36  0 0 0 0 .37  0 0 0 0 .42  2.4 0 0 0 -1.1', 1500)} 0 0/6000px 6000px, linear-gradient(120deg,#ebe8e2,#cdc9c2)`, room: ['#5b5a60', '#2c2b30', '#131316'], light: '238,242,255' },
      grass: { label: '芝生', background: () => `${noise(.9, .9, '0 0 0 0 .12  0 0 0 0 .3  0 0 0 0 .08  0 0 0 .5 0')}, ${noise(.02, .02, '0 0 0 0 .2  0 0 0 0 .42  0 0 0 0 .12  1.4 0 0 0 -.5')}, linear-gradient(90deg,#84bd5e,#629e46)`, room: ['#7fb2d6', '#44779c', '#1f4162'], light: '255,250,224' },
      night: { label: '星空', background: () => `radial-gradient(circle, rgba(255,255,232,.95) 0 2px, rgba(0,0,0,0) 3px) 0 0/190px 170px, radial-gradient(circle, rgba(204,222,255,.8) 0 1.5px, rgba(0,0,0,0) 2.4px) 70px 90px/130px 210px, ${noise(.014, .014, '0 0 0 0 .3  0 0 0 0 .22  0 0 0 0 .55  1.5 0 0 0 -.6', 1500)} 0 0/6000px 6000px, linear-gradient(90deg,#1d2452,#111635)`, room: ['#232a5c', '#10143a', '#060818'], light: '176,194,255' },
      sky: { label: '青空', background: () => `${noise(.012, .02, '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -1.25', 1500)} 0 0/6000px 6000px, linear-gradient(180deg,#5aa6e6,#9ed0f5)`, room: ['#bfe2fb', '#7fbcee', '#4a8fd0'], light: '255,255,244' },
      mat: { label: 'カッティングマット', background: () => `${grid('rgba(255,255,255,.3)', 100, 2)}, ${grid('rgba(255,255,255,.1)', 20, 1)}, linear-gradient(90deg,#30795e,#25634d)`, room: ['#33503f', '#18281f', '#0b130e'], light: '240,246,220' },
      // 動く背景(机の面はなく、本の後ろに軽くぼかした景色が広がる)。中身は上の SCENES
      seaside: { label: '海辺(動く背景)', scene: SCENES.seaside, room: SCENES.seaside.room, light: SCENES.seaside.light },
      meadow: { label: '草原(動く背景)', scene: SCENES.meadow, room: SCENES.meadow.room, light: SCENES.meadow.light },
      forest: { label: '森(動く背景)', scene: SCENES.forest, room: SCENES.forest.room, light: SCENES.forest.light },
      town: { label: '市街(動く背景)', scene: SCENES.town, room: SCENES.town.room, light: SCENES.town.light },
    },

    sound: {
      // ---- 曲(3拍子が基本。beats: 4 で4拍子)。chords は小節ごとの和音、mel は小節ごとの [拍, MIDI音程] ----
      tunes: {
        majA: { chords: ['C', 'Am', 'F', 'G', 'C', 'Am', 'Dm', 'C'], mel: [[[0, 76], [1, 79], [2, 84]], [[0, 83], [1.5, 81], [2, 79]], [[0, 81], [1, 84], [2, 81]], [[0, 79], [2, 74]], [[0, 76], [1, 79], [2, 84]], [[0, 88], [1.5, 86], [2, 84]], [[0, 86], [1, 81], [2, 83]], [[0, 84], [1, 79], [2, 76]]] },
        majB: { chords: ['F', 'C', 'Dm', 'G', 'F', 'C', 'G7', 'C'], mel: [[[0, 81], [1, 84], [2, 89]], [[0, 88], [1, 84], [2, 79]], [[0, 86], [1.5, 84], [2, 81]], [[0, 83], [1, 79], [2, 86]], [[0, 89], [1, 93], [2, 89]], [[0, 88], [1.5, 91], [2, 84]], [[0, 83], [1, 86], [2, 89]], [[0, 84], [1, 88], [2, 91]]] },
        minA: { chords: ['Am', 'F', 'Dm', 'E', 'Am', 'F', 'E', 'Am'], mel: [[[0, 81], [1, 84], [2, 88]], [[0, 89], [1.5, 88], [2, 84]], [[0, 86], [1, 81], [2, 77]], [[0, 80], [1, 83], [2, 76]], [[0, 81], [1, 84], [2, 88]], [[0, 84], [1, 81], [2, 77]], [[0, 76], [1, 80], [2, 83]], [[0, 81], [2, 76]]] },
        // 行進曲(4拍子)
        marchA: { beats: 4, chords: ['C', 'C', 'F', 'G', 'C', 'Am', 'G7', 'C'], mel: B([79, 76, 79, 84], [88, 86, 84, 79], [81, 84, 89, 84], [86, 83, 79], [79, 76, 79, 84], [88, 84, 81, 84], [86, 89, 83, 86], [84, 0, 84]) },
        marchB: { beats: 4, chords: ['F', 'C', 'G', 'C', 'F', 'C', 'G7', 'C'], mel: B([89, 84, 81, 84], [88, 84, 79, 84], [86, 83, 79, 83], [84, 88, 91], [93, 89, 84, 89], [91, 88, 84, 88], [89, 86, 83, 86], [84, 79, 84]) },
        marchM: { beats: 4, chords: ['Am', 'Am', 'Dm', 'E', 'Am', 'F', 'E', 'Am'], mel: B([81, 84, 88, 84], [81, 76, 81], [86, 89, 86, 81], [80, 83, 88], [81, 84, 88, 93], [89, 84, 81, 77], [76, 80, 83, 80], [81, 0, 81]) },
        // 子守歌(3拍子・ゆったり)
        lullA: { chords: ['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'C'], mel: B([76, 0, 79], [74, 0, 79], [72, 76, 81], [81, 77, 72], [76, 0, 79], [83, 79, 74], [77, 81, 84], [84, 0, 72]) },
        lullB: { chords: ['F', 'C', 'F', 'G', 'Am', 'F', 'G7', 'C'], mel: B([81, 84, 81], [79, 0, 76], [77, 81, 84], [86, 0, 83], [84, 81, 76], [77, 81, 77], [74, 77, 83], [84]) },
        lullM: { chords: ['Am', 'Dm', 'Am', 'E', 'Am', 'Dm', 'E', 'Am'], mel: B([81, 0, 84], [86, 89, 86], [84, 81, 76], [80, 0, 83], [81, 0, 84], [89, 86, 81], [83, 80, 76], [81]) },
        // 和風(4拍子・五音音階)
        wafuA: { beats: 4, chords: ['C', 'Am', 'C', 'G', 'C', 'Am', 'G', 'C'], mel: B([76, 79, 81, 79], [81, 84, 81, 79], [76, 79, 76, 74], [74, 79, 74], [76, 79, 81, 84], [88, 84, 81, 84], [86, 84, 81, 79], [84]) },
        wafuB: { beats: 4, chords: ['Am', 'C', 'G', 'C', 'Am', 'C', 'G', 'C'], mel: B([81, 84, 86, 84], [88, 86, 84, 79], [86, 79, 86, 91], [88, 84, 79], [81, 84, 88, 91], [93, 91, 88, 84], [86, 84, 81, 79], [84, 79, 84]) },
        wafuM: { beats: 4, chords: ['Am', 'Am', 'Dm', 'Am', 'Am', 'F', 'E', 'Am'], mel: B([81, 83, 84, 83], [81, 77, 76], [86, 84, 81, 77], [76, 81, 76], [81, 83, 84, 88], [89, 88, 84, 81], [83, 80, 76, 80], [81]) },
      },
      // ---- 曲集(sound.set)---- main=明るい主題, sub=もうひとつの明るい曲, minor=短調。tr=移調(半音), tempo=速さの倍率(大きいほど遅い)
      sets: {
        musicbox: { label: 'オルゴール(3拍子・むかし話)', main: 'majA', sub: 'majB', minor: 'minA', tr: 0, tempo: 1 },
        march: { label: '行進曲(4拍子・元気な冒険)', main: 'marchA', sub: 'marchB', minor: 'marchM', tr: 2, tempo: .78 },
        lullaby: { label: '子守歌(3拍子・やさしく静か)', main: 'lullA', sub: 'lullB', minor: 'lullM', tr: 5, tempo: 1.22 },
        wafu: { label: '和風(4拍子・日本の昔話)', main: 'wafuA', sub: 'wafuB', minor: 'wafuM', tr: 0, tempo: .86 },
      },
      // ---- 気分(見開きの music)---- beat=1拍の秒数, tr=移調, oct=旋律のオクターブ, stac=歯切れよく, dbl=旋律を重ねる
      moods: {
        bright: { tune: 'main', beat: .6 },                                   // 明るい(既定)
        gentle: { tune: 'main', beat: .76, vol: .7 },                         // ゆったり
        airy: { tune: 'sub', beat: .58, vol: .95 },                          // 広々・わくわく
        happy: { tune: 'sub', beat: .56, dbl: true },                        // めでたし
        triumph: { tune: 'main', beat: .5, vol: .9, dbl: true, startBar: 4 }, // やった!
        night: { tune: 'minor', beat: .72, vol: .8, oct: -12 },                // 夜・しずか
        sad: { tune: 'minor', beat: .86, vol: .7 },                            // かなしい
        creepy: { tune: 'minor', beat: .8, vol: .7, oct: -12, stac: true },    // ぶきみ・しのび足
        chase: { tune: 'minor', beat: .4, tr: 5, vol: .9, stac: true, dbl: true }, // 追いかけっこ
      },
      // ---- 効果音(見開きの sfx)---- (S, t, o) => S の音源を鳴らす
      sfx: {
        sparkle: (S, t, o) => S.sparkle(t, t + (o.len ?? 1.5), o.n ?? 10, o.vol ?? .4, o.base ?? 96),            // きらきら
        chime: (S, t, o) => S.seq(t, o.notes || [72, 76, 79, 84, 88, 91], o.gap ?? .05, o.vol ?? .8, .9),       // しゃらん(上昇)
        fanfare: (S, t, o) => S.seq(t, [60, 64, 67, 72, 76, 79, 84], o.gap ?? .07, o.vol ?? .8),                // やった!
        fall: (S, t, o) => S.seq(t, [84, 80, 77, 74, 70, 67, 62, 58], o.gap ?? .14, o.vol ?? .6, .6),           // ひゅるる(下降)
        drop: (S, t, o) => { for (let i = 0; i < 3; i++) S.box(t + i * .14, 91 + i * 2, o.vol ?? .6, 0, .8); },  // ぽとぽと
        bell: (S, t, o) => { S.box(t, 96, o.vol ?? .6, .3, .8); S.box(t + .06, 100, (o.vol ?? .6) * .85, .3, .8); }, // ちりん
        pop: (S, t, o) => { S.box(t, 84, o.vol ?? .5, 0, .6); S.box(t + .05, 91, o.vol ?? .5, 0, .6); S.noise(t, .06, () => 3200, u => (1 - u) ** 2 * .18, 1.5, 0, .3); }, // ぽん
        magic: (S, t, o) => { S.sfx('chime', t, { vol: .6 }); S.sparkle(t + .2, t + .2 + (o.len ?? 1.6), 14, o.vol ?? .45); },    // まほう
        tick: (S, t, o) => S.tick(t, o.vol ?? 1, o.pan ?? 0),                                                    // かちっ
        rise: (S, t, o) => {                                                                                     // ぐんぐん伸びる(加速する上昇音階)
          const len = o.len ?? 4.5, sc = [0, 2, 4, 7, 9], end = t + len; let x = t, i = 0;
          while (x < end) { const u = (x - t) / len, m = 48 + 12 * Math.floor(i / 5) + sc[i % 5]; S.box(x, Math.min(m, 103), .45 + .4 * u, Math.sin(i) * .5, .7); if (i % 3 === 0) S.soft(x, 36 + sc[(i / 3) % 5 | 0], .7, .8); x += .26 - .15 * u; i++; }
          S.noise(t, len, u => 300 + 1800 * u, u => Math.sin(u * PI) * .05, 1.2, 0, .5);
          if (o.finish !== false) { S.seq(end, [72, 76, 79, 84, 88, 91], .05, .8, .9); S.sparkle(end, end + 1.6, 12, .4); }
        },
        whoosh: (S, t, o) => S.noise(t, o.len ?? 1.3, u => 400 + 2400 * u * u, u => u * u * .3 * (o.vol ?? 1), 1, u => -.3 + u, .4),          // 風切り・たおれる
        wind: (S, t, o) => S.noise(t, o.len ?? 3, u => 420 + 260 * Math.sin(u * 9), u => Math.sin(u * PI) * .09 * (o.vol ?? 1), .8, u => -.4 + .8 * u, .5, 'lp'), // そよ風
        creak: (S, t, o) => S.noise(t, o.len ?? .5, u => 500 + 900 * u, u => Math.sin(u * PI) * (.5 + .5 * Math.sin(u * 160)) * .22 * (o.vol ?? 1), 3, 0, .4),   // きしむ
        thud: (S, t, o) => S.thud(t, o.vol ?? .4, o.f0 ?? 85, o.len ?? .3),                                      // どん
        crash: (S, t, o) => { const v = o.vol ?? 1; S.thud(t, .62 * v, 70, .6); S.thud(t + .12, .36 * v, 45, .8); S.noise(t, 1.8, u => 900 - 700 * u, u => (1 - u) ** 2 * .16 * v, .7, 0, .6, 'lp'); }, // どしーん
        steps: (S, t, o) => { for (let k = 0; k < (o.n ?? 6); k++) S.thud(t + k * (o.gap ?? .44), o.vol ?? .3, o.f0 ?? 60, .25); },     // のしのし
        knock: (S, t, o) => { for (let k = 0; k < (o.n ?? 3); k++) S.thud(t + k * (o.gap ?? .22), o.vol ?? .35, 180, .06); },           // とんとん
        chop: (S, t, o) => { S.thud(t, o.vol ?? .4, 150, .1); S.noise(t, .09, () => 3000, u => (1 - u) ** 2 * .4, 1.5, .2, .4); },      // かつん
        splash: (S, t, o) => { S.noise(t, .7, u => 3200 - 1600 * u, u => (1 - u) ** 2 * .28 * (o.vol ?? 1), 1, 0, .5, 'hp'); S.thud(t, .2, 110, .12); }, // ばしゃ
        snore: (S, t, o) => { const p = o.pan ?? 0; for (let k = 0; k < (o.n ?? 1); k++) { const x = t + k * (o.period ?? 3.927); S.noise(x, 1.9, () => 240, u => Math.sin(u * PI) ** 2 * (.6 + .4 * Math.sin(u * 190)) * .2, .7, p, .4, 'lp'); S.noise(x + 2.0, 1.4, () => 900, u => Math.sin(u * PI) ** 2 * .035, 1, p, .4); } }, // ぐうぐう
      },
    },
  });
})();
