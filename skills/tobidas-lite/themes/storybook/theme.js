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
  const lgrad = (id, st, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${st.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;
  const rgrad = (id, st) => `<radialGradient id="${id}">${st.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;
  const circ = (x, y, q) => `M${N1(x - q)} ${N1(y)}a${N1(q)} ${N1(q)} 0 1 0 ${N1(q * 2)} 0a${N1(q)} ${N1(q)} 0 1 0 ${N1(-q * 2)} 0`;
  // 星空の星: 乱数で散らした大小の星を 1600px のタイル1枚に描く(等間隔に並べると格子に見えるので)。明るい星にはにじみを足す
  const stars = (n = 260, sz = 1600) => { const r = R(41); let o = ''; for (let i = 0; i < n; i++) { const x = N1(r() * sz), y = N1(r() * sz), k = r(), q = k > .93 ? 4 : k > .7 ? 2.8 : 1.8, c = ['#fffbe6', '#cfe0ff', '#ffe9c4'][i % 3]; o += (k > .93 ? `<circle cx='${x}' cy='${y}' r='8' fill='${c}' opacity='.18'/>` : '') + `<circle cx='${x}' cy='${y}' r='${q}' fill='${c}' opacity='${N1(.45 + r() * .55)}'/>`; } return `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${sz}' height='${sz}'>${o}</svg>`).replace(/'/g, '%27')}') 0 0/${sz}px ${sz}px`; };
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
    // 森: 光のさす奥の空き地、かすむ遠くの木立、広葉樹と針葉樹のまじる木々、手前を縁どる太い幹と茂み、木もれ日の筋、舞い落ちる葉、光の粒
    // 奥ほど淡く・手前ほど濃くして奥行きを出す。光は右上から(こずえの右上を明るく、左下を暗く)
    forest: {
      svg: () => {
        const r = R(13);
        // 針葉樹の輪郭(すそが垂れた4段)。tk=1 で幹も同じ色で足す(遠景の影絵用)
        const firD = (x, y, w, h, tk = 1) => { let d = tk ? `M${N1(x - w * .1)} ${N1(y)}V${N1(y - h * .3)}H${N1(x + w * .1)}V${N1(y)}Z` : ''; for (let j = 0; j < 4; j++) { const yy = y - h * (.18 + j * .2), ww = w * (1 - j * .2); d += `M${N1(x - ww)} ${N1(yy)}Q${N1(x)} ${N1(yy + ww * .3)} ${N1(x + ww)} ${N1(yy)}L${N1(x)} ${N1(yy - h * .36)}Z`; } return d; };
        const firHi = (w, h) => { let d = ''; for (let j = 0; j < 4; j++) { const yy = -h * (.18 + j * .2), ww = w * (1 - j * .2); d += `M0 ${N1(yy - h * .36)}L${N1(ww)} ${N1(yy)}Q${N1(ww * .6)} ${N1(yy + ww * .14)} ${N1(ww * .2)} ${N1(yy + ww * .24)}Z`; } return d; };
        // 広葉樹のこずえ: こぶを輪に並べ、影・地色・光の3枚をずらして重ねる
        const crown = (cx, cy, k, [c, hi, sh]) => {
          const lb = [[0, 0, .68]]; for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283 + r() * .6, d = .42 + r() * .22; lb.push([Math.cos(a) * d * 1.2, Math.sin(a) * d * .8, .4 + r() * .2]); }
          const P = (dx, dy, m, f, fill) => `<path d="${lb.filter(f).map(([x, y, q]) => circ(cx + (x + dx) * k, cy + (y + dy) * k, q * k * m)).join('')}" fill="${fill}"/>`;
          return P(-.04, .1, 1, () => 1, sh) + P(.03, -.04, .9, () => 1, c) + P(.16, -.2, .55, ([x, y]) => y < .15 && x > -.3, hi);
        };
        const trunk = (w, h, c, hi) => `<path d="M${N1(-w * 1.5)} 6Q${N1(-w * .6)} ${N1(-h * .06)} ${N1(-w * .5)} ${N1(-h * .3)}L${N1(-w * .34)} ${N1(-h)}H${N1(w * .34)}L${N1(w * .5)} ${N1(-h * .3)}Q${N1(w * .6)} ${N1(-h * .06)} ${N1(w * 1.5)} 6Z" fill="${c}"/><path d="M${N1(w * .1)} ${N1(-h)}H${N1(w * .34)}L${N1(w * .5)} ${N1(-h * .3)}Q${N1(w * .6)} ${N1(-h * .06)} ${N1(w * 1.5)} 6H${N1(w * .5)}Q${N1(w * .2)} ${N1(-h * .2)} ${N1(w * .1)} ${N1(-h)}Z" fill="${hi}" opacity=".6"/>`;
        let s = `<defs>${lgrad('fsSky', [[0, '#eef7cf'], [.5, '#b7dba3'], [1, '#5c9862']])}${rgrad('fsGlow', [[0, '#fffbd8', .95], [.5, '#fffbd8', .4], [1, '#fffbd8', 0]])}${lgrad('fsMist', [[0, '#f4fbe0', 0], [.55, '#f4fbe0', .5], [1, '#f4fbe0', 0]])}${lgrad('fsRay', [[0, '#fffbd0', 1], [.7, '#fffbd0', .55], [1, '#fffbd0', 0]])}${lgrad('fsG1', [[0, '#7fb56a'], [.5, '#3f7d4c']])}${lgrad('fsG2', [[0, '#5c9a52'], [.5, '#255a3a']])}${lgrad('fsDark', [[0, '#0d2418', 0], [1, '#0d2418', .72]])}</defs>`;
        s += `<rect x="-100" y="-100" width="2120" height="1300" fill="url(#fsSky)"/><circle cx="1150" cy="250" r="720" fill="url(#fsGlow)"/>`;
        // 遠景: かすんだ影絵の木立を2枚
        let d = ''; for (let x = -60; x < 1990; x += 50 + r() * 50) d += firD(x, 612, 44 + r() * 26, 360 + r() * 190);
        s += `<path d="${d}" fill="#bcdcab"/>`;
        d = ''; for (let x = -80; x < 2000; x += 70 + r() * 60) { const h = 270 + r() * 150; d += r() < .5 ? firD(x, 640, 56 + r() * 28, h) : `M${N1(x - 9)} 640V${N1(640 - h * .7)}h18V640Z` + circ(x, 640 - h * .72, h * .26) + circ(x - h * .17, 640 - h * .6, h * .19) + circ(x + h * .18, 640 - h * .62, h * .2); }
        s += `<path d="${d}" fill="#97c794"/><rect x="-100" y="430" width="2120" height="300" fill="url(#fsMist)"/><path d="${wavePath(618, 12, 520, 31)}" fill="url(#fsG1)"/>`;
        // 中景: 奥と手前の2列。3本に1本は針葉樹
        [[12, 640, 30, .6, ['#6aa870', '#93c886', '#4f8c5e'], '#84705a', '#a8946e'], [9, 725, 45, .92, ['#438a54', '#72b565', '#2f6e46'], '#59432f', '#8a6a44']].forEach(([n, y0, yv, k, col, tk, tkHi], L) => {
          if (L) { s += `<rect x="-100" y="560" width="2120" height="220" fill="url(#fsMist)" opacity=".6"/><path d="${wavePath(700, 18, 640, 32)}" fill="url(#fsG2)"/>`; for (let i = 0; i < 8; i++) s += `<ellipse class="dp" data-p="${N1(r() * 6.3)}" cx="${N1(r() * 1920)}" cy="${N1(745 + r() * 110)}" rx="${N1(70 + r() * 90)}" ry="${N1(12 + r() * 12)}" fill="#e6f29c" opacity=".2"/>`; }
          for (let i = 0; i < n; i++) {
            const x = (i + .15 + r() * .7) * (2100 / n) - 90, y = y0 + r() * yv, h = (230 + r() * 120) * k, w = (26 + r() * 14) * k, cs = (122 + r() * 40) * k;
            s += `<ellipse cx="${N1(x - 34 * k)}" cy="${N1(y + 5)}" rx="${N1(84 * k)}" ry="${N1(10 * k)}" fill="#143524" opacity=".28"/><g class="tk" data-x="${N1(x)}" data-y="${N1(y)}" data-p="${N1(r() * 6.3)}" data-a="${N1(1.3 - L * .4)}">`;
            if (i % 3 === 1) { const H = (h + cs) * 1.22, W = cs * .78; s += `<rect x="${N1(-W * .09)}" y="${N1(-H * .22)}" width="${N1(W * .18)}" height="${N1(H * .22 + 6)}" fill="${tk}"/><path d="${firD(0, 0, W, H, 0)}" fill="${col[2]}"/><path d="${firHi(W, H)}" fill="${col[0]}"/>`; }
            else s += trunk(w, h, tk, tkHi) + crown(0, -h - cs * .35, cs, col);
            s += `</g>`;
          }
        });
        // 木もれ日の筋(上が明るく、下へ消える)
        [[330, 250, .75], [760, 170, .5], [1180, 320, .7], [1560, 150, .45], [1900, 260, .6]].forEach(([x, w, a], i) => s += `<path class="ry" data-p="${N1(i * 1.7)}" data-o="${a}" d="M${x} -80H${x + w}L${x + w * 1.5 - 520} 1000H${x - 560}Z" fill="url(#fsRay)" opacity="${a}"/>`);
        // 近景: 画面の端を縁どる太い幹、上からかぶさる枝葉、足もとの茂み
        s += `<path d="${wavePath(880, 26, 700, 33)}" fill="#1f5236"/>`;
        [[470, 46, 1], [1460, 50, -1], [215, 76, -2], [1705, 84, 2], [-40, 130, 3], [1965, 140, -3]].forEach(([x, w, ln]) => { const tx = x + ln * 14; s += `<path d="M${N1(x - w * 1.3)} 1200Q${N1(x - w * .55)} 1010 ${N1(x - w * .5)} 800L${N1(tx - w * .36)} -80H${N1(tx + w * .36)}L${N1(x + w * .5)} 800Q${N1(x + w * .55)} 1010 ${N1(x + w * 1.3)} 1200Z" fill="#33261c"/><path d="M${N1(tx + w * .16)} -80H${N1(tx + w * .36)}L${N1(x + w * .5)} 800Q${N1(x + w * .55)} 1010 ${N1(x + w * 1.3)} 1200H${N1(x + w * .8)}Q${N1(x + w * .3)} 1000 ${N1(x + w * .26)} 800Z" fill="#8a6a44" opacity=".5"/>`; });
        [[60, 70, 215], [340, 10, 170], [170, 190, 150], [1610, 20, 185], [1870, 90, 225], [1750, 205, 150], [880, -80, 190], [1260, -95, 170]].forEach(([x, y, k], i) => s += `<g class="tk" data-x="${x}" data-y="-400" data-p="${N1(i * 1.9)}" data-a=".8">${crown(0, 400 + y, k, ['#2f7046', '#55a05c', '#1c4a30'])}</g>`);
        for (let i = 0; i < 12; i++) s += crown(i * 175 - 20 + r() * 80, 1035 + r() * 50, 85 + r() * 60, ['#256039', '#3c8250', '#143826']);
        for (let i = 0; i < 16; i++) { const x = r() * 620 + (i % 2 ? 1300 : 0); s += `<circle cx="${N1(x)}" cy="${N1(960 + r() * 90)}" r="${N1(6 + r() * 4)}" fill="${['#fff6e0', '#ffd76a', '#ffb0c8'][i % 3]}" opacity=".85"/>`; }
        s += `<rect x="-100" y="700" width="2120" height="400" fill="url(#fsDark)"/>`;
        for (let i = 0; i < 18; i++) s += `<path class="lf" data-x="${N1(r() * 1920)}" data-y="${N1(r() * 1100)}" data-p="${N1(r() * 6.3)}" data-v="${N1(24 + r() * 26)}" d="M-15 0Q0 -10 15 0Q0 10 -15 0Z" fill="${['#e6c84a', '#b9d66a', '#e89a4a'][i % 3]}"/>`;
        for (let i = 0; i < 14; i++) s += `<circle class="mt" data-x="${N1(r() * 1920)}" data-y="${N1(r() * 900)}" data-p="${N1(r() * 6.3)}" data-v="${N1(5 + r() * 9)}" r="${N1(3 + r() * 3)}" fill="#fffbd0"/>`;
        return s;
      },
      anim: (t, el, q) => {
        each(el, q, '.tk', e => e.setAttribute('transform', `translate(${e.dataset.x} ${e.dataset.y}) rotate(${N1(+e.dataset.a * Math.sin(t * .7 + +e.dataset.p))})`));
        each(el, q, '.ry', e => { const p = +e.dataset.p; e.setAttribute('transform', `translate(${N1(30 * Math.sin(t * .2 + p))} 0)`); e.setAttribute('opacity', (+e.dataset.o * (.72 + .28 * Math.sin(t * .33 + p * 2))).toFixed(2)); });
        each(el, q, '.dp', e => e.setAttribute('opacity', (.14 + .12 * Math.sin(t * .45 + +e.dataset.p)).toFixed(2)));
        each(el, q, '.lf', e => { const p = +e.dataset.p, v = +e.dataset.v; tr(e, wrap(+e.dataset.x + 60 * Math.sin(t * .8 + p) + t * 6, -40, 1960), wrap(+e.dataset.y + t * v, -40, 1120), ` rotate(${N1(t * 70 + p * 60)})`); });
        each(el, q, '.mt', e => { const p = +e.dataset.p, v = +e.dataset.v; tr(e, wrap(+e.dataset.x + 26 * Math.sin(t * .35 + p) + t * 3, -20, 1940), wrap(+e.dataset.y - t * v, -20, 920)); e.setAttribute('opacity', (.2 + .7 * Math.abs(Math.sin(t * .9 + p))).toFixed(2)); });
      },
      room: ['#9cc98a', '#4f8f5a', '#1f4a30'], light: '250,255,214', blur: 5,
    },
    // 市街: 夕方前の空、かすむ遠くの塔と家並み、屋根の形がいろいろの建物とまたたく窓、アーチの高架を走る電車、煙突のけむり、気球
    // 奥ほど淡く青く・手前ほど濃くして奥行きを出す。日は左の低いところ(建物の右側を少し暗く)
    town: {
      // 低い家並みが左右に続く通り。まん中は道が手前から奥へ伸び、その上に空が開ける(本が中央を占めるので、見どころは左右の家並みと空)
      svg: () => {
        const r = R(23), pick = a => a[Math.floor(r() * a.length)], VX = 960, VY = 600, BASE = 1010, HAZE = '#e9e1e0', smk = []; let twn = 10;
        const mix = (c, d, f) => '#' + [1, 3, 5].map(i => Math.round(parseInt(c.slice(i, i + 2), 16) * (1 - f) + parseInt(d.slice(i, i + 2), 16) * f).toString(16).padStart(2, '0')).join('');
        const cloud = (x, y, k) => sCloud(x, y + 10 * k, k, '#f1d6c2') + sCloud(x, y, k, '#fffaf2');
        // 遠近: 消失点 (VX, VY)。z は奥行き(1 が画面の端あたり、大きいほど奥)、h は地面からの高さ、xe は z=1 での横位置
        const Pn = (xe, z, h) => [VX + (xe - VX) / z, VY + (BASE - h - VY) / z], P = (xe, z, h) => Pn(xe, z, h).map(N1).join(' ');
        const quad = (xe, z0, z1, h0, h1, fill, extra = '') => `<path d="M${P(xe, z0, h1)}L${P(xe, z1, h1)}L${P(xe, z1, h0)}L${P(xe, z0, h0)}Z" fill="${fill}"${extra}/>`;
        const BODY = ['#f3e6d0', '#e8c7a6', '#c9785a', '#d9a37c', '#b9c7d6', '#e6d2ba', '#c98f7a', '#f1dcc0'], SHOP = ['#3f6a5c', '#7a3f48', '#3f5a7a', '#8a6a3a', '#5a4a6a'];
        // 通りの片側。通りに面した壁を1枚の面として、奥から手前へ1軒ずつ描く(2〜3階建て。1階は店、屋根の上に煙突)
        const row = side => {
          const XE = VX + side * 1060, hs = []; let o = '';
          for (let z = .78; z < 7;) { const d = .2 + r() * .1; hs.push([z, z + d, 500 + r() * 170, pick(BODY), pick(SHOP)]); z += d; }
          hs.reverse().forEach(([z0, z1, h, c, sc]) => {
            const f = Math.min(.8, (1 - 1 / z0) * .92), col = x => mix(x, HAZE, f), near = z0 < 1.8, zc = z0 + (z1 - z0) * .5;
            o += quad(XE, z0 + .02, z0 + .075, h - 4, h + 64, col('#a9705a')) + quad(XE, z0 + .012, z0 + .083, h + 60, h + 72, col('#6b5560'));   // 煙突
            if (near && z0 > .95) smk.push([...Pn(XE, z0 + .047, h + 84), 1 / z0]);
            o += quad(XE, z0, z1, 0, h, col(c)) + quad(XE, z0, z1, h - 18, h + 6, col('#5d6478')) + quad(XE, z1 - .012, z1, 0, h - 18, '#241a38', ' opacity=".12"');   // 壁、屋根の縁、隣との境目
            o += quad(XE, z0, z1, 0, 150, col(sc)) + quad(XE, z0, z1, 150, 168, col('#f6efe0')) + quad(XE, z0 + .035, z1 - .035, 28, 122, col('#ffe9b0'));   // 1階の店と明るい窓
            let dk = '', lt = ''; const n = z1 - z0 > .26 ? 3 : 2, w = (z1 - z0) / (n * 2 + 1);
            for (let y = 215; y + 96 < h - 22; y += 150) for (let i = 0; i < n; i++) { const a = z0 + w * (1 + i * 2), d = `M${P(XE, a, y + 96)}L${P(XE, a + w, y + 96)}L${P(XE, a + w, y)}L${P(XE, a, y)}Z`, lit = r() < .4;
              if (lit && near && twn-- > 0) o += `<path class="wn" data-p="${N1(r() * 6.3)}" d="${d}" fill="${col('#ffe59a')}"/>`; else if (lit) lt += d; else dk += d; }
            o += `<path d="${dk}" fill="${col('#5c6f88')}"/><path d="${lt}" fill="${col('#ffe59a')}"/>`;
          });
          // 街灯。歩道に沿って奥へ並ぶ
          for (const z of [1.12, 1.62, 2.3, 3.3, 4.8]) { const XL = VX + side * 790, [x0, y0] = Pn(XL, z, 0), [x1, y1] = Pn(XL, z, 285), c = mix('#3d3a44', HAZE, Math.min(.7, (1 - 1 / z) * .8));
            o += `<path d="M${N1(x0)} ${N1(y0)}V${N1(y1)}" stroke="${c}" stroke-width="${N1(8 / z)}" stroke-linecap="round"/><circle cx="${N1(x1)}" cy="${N1(y1)}" r="${N1(54 / z)}" fill="url(#twLamp)"/><circle cx="${N1(x1)}" cy="${N1(y1)}" r="${N1(15 / z)}" fill="#fff3c4"/>`; }
          return o;
        };
        let s = `<defs>${lgrad('twSky', [[0, '#6fb0e6'], [.55, '#cfe6f4'], [1, '#ffe3bd']])}${rgrad('twSun', [[0, '#fff6d6', .95], [.35, '#fff0c4', .5], [1, '#fff0c0', 0]])}${rgrad('twLamp', [[0, '#fff0b8', .75], [1, '#fff0b8', 0]])}${lgrad('twHz', [[0, '#ffeeda', 0], [1, '#ffeeda', .8]])}${lgrad('twDark', [[0, '#241a30', 0], [1, '#241a30', .62]])}</defs>`;
        s += `<rect x="-100" y="-100" width="2120" height="760" fill="url(#twSky)"/><circle cx="1180" cy="560" r="560" fill="url(#twSun)"/>`;
        s += cloud(240, 130, 1.15) + cloud(1000, 90, .8) + cloud(1560, 190, 1) + cloud(1880, 80, .6);
        // 通りの突き当たりにかすむ遠くの町並みと時計塔
        s += `<path d="M560 ${VY + 8}V566h46v-18h38v30h52v-44h34v-26l22-18l22 18v26h30v52h44v-36h60v24h40V${VY + 8}ZM1016 ${VY + 8}V470l16-34l16 34V${VY + 8}ZM1060 ${VY + 8}v-40h50v-22h44v36h60v-48h36v60h58v-30h46V${VY + 8}Z" fill="#c3cbdf"/><circle cx="1032" cy="486" r="9" fill="#f1eede"/><rect x="-100" y="380" width="2120" height="${VY - 370}" fill="url(#twHz)"/>`;
        // 地面: 歩道、車道、まん中の線。車道は消失点へすぼまる
        s += `<rect x="-100" y="${VY + 6}" width="2120" height="520" fill="#d9cdbd"/><path d="M${P(VX - 640, .7, 0)}L${P(VX - 640, 12, 0)}L${P(VX + 640, 12, 0)}L${P(VX + 640, .7, 0)}Z" fill="#b3a8a6"/>`;
        for (let z = .9; z < 6; z += .42) s += `<path d="M${P(VX - 9, z, 0)}L${P(VX - 9, z + .16, 0)}L${P(VX + 9, z + .16, 0)}L${P(VX + 9, z, 0)}Z" fill="#f1e8da" opacity=".75"/>`;
        s += row(-1) + row(1);
        smk.sort((a, b) => b[2] - a[2]).slice(0, 4).forEach(([x, y, k], j) => { for (let i = 0; i < 3; i++) s += `<circle class="sm" data-x="${N1(x)}" data-y="${N1(y)}" data-p="${N1(j * 1.3 + i / 3)}" r="${N1(15 * k)}" fill="#fffaf2" opacity="0"/>`; });
        s += `<rect x="-100" y="760" width="2120" height="340" fill="url(#twDark)"/>`;
        return s + sBird(360, 240, 22, 0) + sBird(430, 275, 22, 1.4) + sBird(1100, 220, -20, 2);
      },
      anim: (t, el, q) => {
        moveClouds(t, el, q); moveBirds(t, el, q);
        each(el, q, '.wn', e => e.setAttribute('opacity', Math.sin(t * .5 + +e.dataset.p) > .2 ? '1' : '.35'));
        each(el, q, '.sm', e => { const p = +e.dataset.p, u = (((t * .14 + p) % 1) + 1) % 1; tr(e, +e.dataset.x + u * 36 + 8 * Math.sin(u * 7 + p * 5), +e.dataset.y - u * 110, ` scale(${(.6 + u * 1.3).toFixed(2)})`); e.setAttribute('opacity', (.75 * (1 - u) * Math.min(1, u * 6)).toFixed(2)); });
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
      vintage: { label: 'レトロ', filter: edge(3, '#f1e3be') + `<feColorMatrix in="SourceGraphic" type="matrix" values=".66 .26 .08 0 .03  .2 .68 .1 0 .02  .16 .26 .46 0 .02  0 0 0 1 0" result="c"/>` + grain(.36, .72) + tex('c') + `<feMerge><feMergeNode in="edge"/><feMergeNode in="tex"/></feMerge>`, pageFilter: 'sepia(.4) saturate(.78)', grain: .7, shadow: 1 },
      // ここから下は、絵本らしさにとらわれない画風。どれも平塗りの絵にそのままかかる
      // ネオン: 中を暗く沈め、輪郭と、形の中の色の境目(顔・模様・線)をすべて光らせる。境目は「太らせた絵」と「細らせた絵」の差で出す(差は difference で取る。引き算だと形の中の線が消える)
      neon: { label: 'ネオン', filter: `<feMorphology in="SourceGraphic" operator="dilate" radius="1.6" result="big"/><feMorphology in="SourceGraphic" operator="erode" radius=".9" result="sml"/><feBlend in="big" in2="sml" mode="difference" result="df"/><feColorMatrix in="df" type="saturate" values="2.4" result="ds"/><feColorMatrix in="ds" type="matrix" values="1.7 0 0 0 .06  0 1.7 0 0 .06  0 0 1.7 0 .06  4 4 4 0 -.25" result="ln"/><feGaussianBlur in="ln" stdDeviation="4" result="gl"/><feColorMatrix in="SourceGraphic" type="matrix" values=".1 .03 .03 0 .02  .03 .1 .03 0 .02  .05 .05 .16 0 .06  0 0 0 .94 0" result="dk"/><feMerge><feMergeNode in="dk"/><feMergeNode in="gl"/><feMergeNode in="gl"/><feMergeNode in="ln"/></feMerge>`, pageFilter: 'hue-rotate(115deg) brightness(.3) saturate(1.5) contrast(1.15)', grain: .15, shadow: .35 },
      // リソグラフ: 青とコーラルの2色刷り。明暗を青インク、暖色をコーラルのインクに置きかえ、コーラルの版を少しずらして重ねる
      riso: { label: 'リソグラフ', filter: `<feFlood flood-color="#fbf1dc"/><feComposite in2="SourceAlpha" operator="in" result="pp"/><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 .1  0 0 0 0 .28  0 0 0 0 .82  -.5 -.95 -.2 1.55 0"/><feComponentTransfer result="ia"><feFuncA type="discrete" tableValues="0 .3 .55 .8 1"/></feComponentTransfer><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 .34  0 0 0 0 .3  2.1 -.4 -1.7 0 -.02"/><feComponentTransfer result="ib0"><feFuncA type="discrete" tableValues="0 .3 .62 .9"/></feComponentTransfer><feOffset in="ib0" dx="4" dy="3" result="ib"/><feBlend in="ia" in2="pp" mode="multiply" result="m1"/><feBlend in="ib" in2="m1" mode="multiply" result="m2"/>` + grain(.5, .62, .9) + tex('m2', 'm2'), pageFilter: 'grayscale(1) sepia(1) hue-rotate(180deg) saturate(3.2) brightness(.86) contrast(1.2)', grain: .85, shadow: .6 },
      // ポップアート: 太い黒の縁、原色に寄せて段階を減らした色、中に網点。網点は小さな四角を敷きつめて作る
      popart: { label: 'ポップアート', filter: edge(4.5, '#17131f') + `<feColorMatrix in="SourceGraphic" type="saturate" values="1.9"/><feComponentTransfer result="c"><feFuncR type="discrete" tableValues="0 .34 .7 1"/><feFuncG type="discrete" tableValues="0 .34 .7 1"/><feFuncB type="discrete" tableValues="0 .34 .7 1"/></feComponentTransfer><feFlood x="2" y="2" width="4" height="4" flood-color="#17131f" flood-opacity=".3" result="dot"/><feOffset in="dot" dx="0" dy="0" x="0" y="0" width="10" height="10" result="cell"/><feTile in="cell" result="dots"/><feComposite in="dots" in2="SourceAlpha" operator="in" result="dt"/><feMerge><feMergeNode in="edge"/><feMergeNode in="c"/><feMergeNode in="dt"/></feMerge>`, pageFilter: 'saturate(1.9) contrast(1.2)', grain: .1, shadow: 1 },
      // モノクロ: 白黒にして明暗を強め、フィルムの粒を乗せる。同じ灰色どうしが溶けないよう、明るい細い縁を残す
      mono: { label: 'モノクロ', filter: edge(2.4, '#efefef') + `<feColorMatrix in="SourceGraphic" type="matrix" values=".42 .82 .16 0 -.16  .42 .82 .16 0 -.16  .42 .82 .16 0 -.16  0 0 0 1 0" result="c"/>` + grain(.7, .5, 1.3) + tex('c') + `<feMerge><feMergeNode in="edge"/><feMergeNode in="tex"/></feMerge>`, pageFilter: 'grayscale(1) contrast(1.3) brightness(.92)', grain: .95, shadow: 1.15 },
      // 黒板: 板に描いたチョークの線画にする。形の中は板の色で塗りつぶし(うしろの物は隠れる)、輪郭と形の中の線だけを淡い色のかすれた線で描き、うっすら粉の色を乗せる
      chalk: { label: '黒板', filter: `<feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="3" result="w"/><feDisplacementMap in="SourceGraphic" in2="w" scale="5" xChannelSelector="R" yChannelSelector="G" result="s"/><feMorphology in="s" operator="dilate" radius="2.6" result="big"/><feMorphology in="s" operator="erode" radius="1.3" result="sml"/><feBlend in="big" in2="sml" mode="difference" result="df"/><feColorMatrix in="df" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  5 5 5 0 -.35" result="mk"/><feColorMatrix in="big" type="matrix" values=".62 .1 .02 0 .34  .05 .66 .02 0 .34  .05 .1 .6 0 .34  0 0 0 1 0" result="pc"/><feComposite in="pc" in2="mk" operator="in" result="ln0"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 2.6 0 0 -1.25" result="sp"/><feComposite in="ln0" in2="sp" operator="in" result="ln"/><feColorMatrix in="ln0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .6 0" result="lnb"/><feFlood flood-color="#27402f"/><feComposite in2="s" operator="in" result="bd"/><feColorMatrix in="s" type="matrix" values=".62 .1 .02 0 .34  .05 .66 .02 0 .34  .05 .1 .6 0 .34  0 0 0 .5 0" result="d0"/><feComposite in="d0" in2="sp" operator="in" result="du0"/><feColorMatrix in="du0" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .7 0" result="du"/><feMerge><feMergeNode in="bd"/><feMergeNode in="du"/><feMergeNode in="lnb"/><feMergeNode in="ln"/></feMerge>`, pageFilter: 'grayscale(1) contrast(1.6) brightness(.24) sepia(1) hue-rotate(72deg) saturate(1.5)', grain: .9, shadow: .2 },
      // ドット絵: 9px のます目ごとに中心の1点だけを残し、それをます目いっぱいに太らせる。色は段階を減らす
      pixel: { label: 'ドット絵', filter: `<feFlood x="4" y="4" width="1" height="1" flood-color="#000" result="pt"/><feOffset in="pt" dx="0" dy="0" x="0" y="0" width="9" height="9" result="cell"/><feTile in="cell" result="grid"/><feComposite in="SourceGraphic" in2="grid" operator="in" result="smp"/><feMorphology in="smp" operator="dilate" radius="4" result="px"/><feComponentTransfer in="px"><feFuncR type="discrete" tableValues="0 .2 .4 .6 .8 1"/><feFuncG type="discrete" tableValues="0 .2 .4 .6 .8 1"/><feFuncB type="discrete" tableValues="0 .2 .4 .6 .8 1"/><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>`, pageFilter: 'url(#paper) saturate(1.2)', grain: 0, shadow: .9 },
    },

    // ---- 机・背景(theme.desk)---- background は机の面の CSS、room はまわりの部屋の色3つ、light は光の色。scene を持つものは「動く背景」
    desks: {
      wood: { label: '板張り', background: th => planks('rgba(40,18,4,.5)', '0 0 0 0 .35  0 0 0 0 .17  0 0 0 0 .05  1.6 0 0 0 -.45', th.table || ['#9a6a3e', '#7d5230']), room: ['#5a3d2a', '#2a1a12', '#120a06'], light: '255,226,170' },
      lightwood: { label: '白木', background: () => planks('rgba(110,74,36,.38)', '0 0 0 0 .55  0 0 0 0 .36  0 0 0 0 .16  1.2 0 0 0 -.42', ['#dcbc8c', '#c8a474']), room: ['#6a5038', '#33241a', '#170f0a'], light: '255,236,196' },
      linen: { label: '麻布', background: () => `${grid('rgba(120,98,64,.17)', 10, 3)}, ${noise(.6, .6, '0 0 0 0 .45  0 0 0 0 .38  0 0 0 0 .28  0 0 0 .35 0')}, linear-gradient(90deg,#e6dac2,#d0c1a4)`, room: ['#6b5f4c', '#352e24', '#17130e'], light: '255,238,206' },
      felt: { label: 'フェルト', background: () => `${noise(.85, .85, '0 0 0 0 .66  0 0 0 0 .3  0 0 0 0 .42  0 0 0 .5 0')}, linear-gradient(90deg,#eba0b4,#d98199)`, room: ['#6a4250', '#33202a', '#170e13'], light: '255,236,240' },
      marble: { label: '大理石', background: () => `${noise(.016, .028, '0 0 0 0 .36  0 0 0 0 .37  0 0 0 0 .42  2.4 0 0 0 -1.1', 1500)} 0 0/6000px 6000px, linear-gradient(120deg,#ebe8e2,#cdc9c2)`, room: ['#5b5a60', '#2c2b30', '#131316'], light: '238,242,255' },
      grass: { label: '芝生', background: () => `${noise(.9, .9, '0 0 0 0 .12  0 0 0 0 .3  0 0 0 0 .08  0 0 0 .5 0')}, ${noise(.02, .02, '0 0 0 0 .2  0 0 0 0 .42  0 0 0 0 .12  1.4 0 0 0 -.5')}, linear-gradient(90deg,#84bd5e,#629e46)`, room: ['#7fb2d6', '#44779c', '#1f4162'], light: '255,250,224' },
      night: { label: '星空', background: () => `${stars()}, ${noise(.014, .014, '0 0 0 0 .3  0 0 0 0 .22  0 0 0 0 .55  1.5 0 0 0 -.6', 1500)} 0 0/6000px 6000px, linear-gradient(90deg,#1d2452,#111635)`, room: ['#232a5c', '#10143a', '#060818'], light: '176,194,255' },
      sky: { label: '青空', background: () => `${noise(.012, .02, '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -1.25', 1500)} 0 0/6000px 6000px, linear-gradient(180deg,#5aa6e6,#9ed0f5)`, room: ['#bfe2fb', '#7fbcee', '#4a8fd0'], light: '255,255,244' },
      mat: { label: 'カッティングマット', background: () => `${grid('rgba(255,255,255,.3)', 100, 2)}, ${grid('rgba(255,255,255,.1)', 20, 1)}, linear-gradient(90deg,#30795e,#25634d)`, room: ['#33503f', '#18281f', '#0b130e'], light: '240,246,220' },
      // 鉄板: すべり止めの縞鋼板。木の葉形の突起を、影と光の縁で盛り上げて見せる。突起は卍のように、先がとなりの突起のまん中を指す並びにする(右上がりをタイルの四隅、左上がりをまん中に置く。120px のタイルを 156px に広げて敷く)
      steel: { label: '鉄板', background: () => { const bar = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 -37Q12 0 0 37Q-12 0 0 -37Z" transform="translate(2.5 3.5)" fill="#1c2026" opacity=".42"/><path d="M0 -37Q12 0 0 37Q-12 0 0 -37Z" fill="#b9bfc4"/><path d="M0 -37Q12 0 0 37Q-4 0 0 -37Z" fill="#6f777f" opacity=".5"/><path d="M0 -37Q-12 0 0 37Q-6 0 0 -37Z" fill="#ffffff" opacity=".6"/></g>`;
        return `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">${bar(0, 0, 45)}${bar(120, 0, 45)}${bar(0, 120, 45)}${bar(120, 120, 45)}${bar(60, 60, -45)}</svg>`)}") 0 0/156px 156px, ${noise(.004, .35, '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 -.46')}, ${noise(.02, .02, '0 0 0 0 .25  0 0 0 0 .27  0 0 0 0 .3  1.6 0 0 0 -.7', 1500)} 0 0/6000px 6000px, linear-gradient(90deg,#b4b9bd,#969ca1)`; }, room: ['#5c6168', '#2a2d32', '#101214'], light: '236,242,252' },
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
