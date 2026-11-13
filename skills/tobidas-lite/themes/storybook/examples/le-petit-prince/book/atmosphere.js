// 本の後ろに敷く、見開きごとの景色(1920×1080)と、書き下ろしの曲集。
// 景色はどれも同じ動き(またたく星・流れる雲・漂う惑星・流れ星)を共有し、クラス名で動かす。
const ppRep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');

const ppAtmosphere = (() => {
  const band = (id, stops) => `<defs><linearGradient id="${id}" x2="0%" y2="100%">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#${id})"/>`;
  const glow = (id, c, cx, cy, rx, ry, op = .7) => `<defs><radialGradient id="${id}"><stop stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})" opacity="${op}"/>`;
  // 字幕(白)が読めるよう、画面下を少し暗くする
  const darken = id => `<defs><linearGradient id="${id}-dk" x2="0%" y2="100%"><stop offset=".6" stop-color="#0b0d1e" stop-opacity="0"/><stop offset="1" stop-color="#0b0d1e" stop-opacity=".7"/></linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#${id}-dk)"/>`;
  // またたく星。上の方に多く、本の中央(画面中央)は少なめ
  const stars = (n, seed, c = '#fff6d8', ymax = 700, big = .25) => {
    const r = rnd(seed);
    return ppRep(n, i => {
      const x = r() * 1920, y = Math.pow(r(), 1.4) * ymax, s = r() < big ? 4 + r() * 3 : 1.6 + r() * 1.8;
      return `<circle class="pp-tw" data-ph="${F(r() * 6.28)}" data-sp="${F(.6 + r() * 1.6)}" cx="${F(x)}" cy="${F(y)}" r="${F(s)}" fill="${c}"/>`;
    });
  };
  const shooting = (x, y, len, ph, c = '#fff3c4') => `<g class="pp-shoot" data-x="${x}" data-y="${y}" data-ph="${ph}" opacity="0">
    <path d="M0 0L${-len} ${-len * .38}" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".7"/><circle r="6" fill="${c}"/></g>`;
  const dunes = (cs, base = 640) => cs.map((c, i) => {
    const y0 = base + i * 120, a = 60 + i * 20;
    let d = `M0 1080V${y0}`;
    for (let x = 0; x <= 1920; x += 60) d += `L${x} ${F(y0 - a * (.6 * Math.sin(x / 300 + i * 1.7) + .4 * Math.sin(x / 130 + i)))}`;
    return `<path d="${d}V1080Z" fill="${c}"/>`;
  }).join('');
  const cloud = (x, y, s, c, op = .75) => `<g class="pp-drift" data-sp="${F(.08 + s * .02)}" data-amp="${F(60 + s * 40)}" opacity="${op}"><g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="160" ry="44" fill="${c}"/><ellipse cx="-60" cy="-26" rx="80" ry="46" fill="${c}"/><ellipse cx="50" cy="-34" rx="96" ry="56" fill="${c}"/></g></g>`;

  // 表紙と結び: 天の川の流れる宇宙
  const cosmos = id => `${band(id, [[0, '#0f1638'], [.55, '#1d2556'], [1, '#121733']])}
    <g transform="rotate(-18 960 540)" opacity=".55">${glow(id + '-mw', '#7d79c4', 960, 420, 1250, 190, .8)}${glow(id + '-mw2', '#e6c7e8', 900, 410, 700, 80, .5)}</g>
    ${glow(id + '-neb', '#c68ab8', 1560, 220, 420, 260, .35)}
    ${stars(130, 11)}${shooting(600, 180, 220, 0)}${shooting(1500, 120, 180, 4.5)}`;

  // 1: 真昼のサハラ
  const desertDay = id => `${band(id, [[0, '#9cc3d6'], [.45, '#e9dcbc'], [1, '#d8b27a']])}
    ${glow(id + '-sun', '#fff6d6', 1520, 150, 520, 380, .9)}
    <g class="pp-haze">${dunes(['#e3c48d', '#d6ae70', '#c99a5c'], 560)}</g>
    ${ppRep(18, i => `<circle class="pp-sand" data-x="${(i * 211) % 1920}" data-y="${520 + (i * 97) % 380}" r="${3 + i % 3}" fill="#f6e2b8" opacity=".5"/>`)}`;

  // 2: 紫の星雲がただよう宇宙(B612)
  const nebula = id => `${band(id, [[0, '#1a1440'], [.5, '#3a2462'], [1, '#1b1636']])}
    <g class="pp-drift" data-sp=".05" data-amp="70">${glow(id + '-n1', '#b66cc0', 420, 260, 560, 300, .55)}${glow(id + '-n2', '#5f7fd6', 1500, 330, 520, 280, .5)}${glow(id + '-n3', '#f0a7b5', 1180, 160, 300, 160, .4)}</g>
    ${stars(110, 23)}
    <g class="pp-comet" data-ph="1"><path d="M0 0L-260 -70" stroke="#e8f4ff" stroke-width="10" stroke-linecap="round" opacity=".35"/><path d="M0 0L-160 -42" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity=".6"/><circle r="12" fill="#fffdf2"/></g>`;

  // 3: 輪のある惑星が漂う深い宇宙
  const deepSpace = id => `${band(id, [[0, '#0d1b3a'], [.6, '#182c55'], [1, '#101a33']])}
    ${glow(id + '-n', '#3f6fae', 960, 300, 900, 300, .4)}
    ${stars(120, 37)}
    <g class="pp-float" data-x="260" data-y="230" data-ph="0"><ellipse rx="170" ry="34" fill="none" stroke="#e9c98c" stroke-width="14" opacity=".75"/><circle r="92" fill="#d98a5f"/><path d="M-90 -14Q0 10 90 -14" stroke="#b86a47" stroke-width="16" fill="none"/><path d="M-170 0A170 34 0 0 0 170 0" fill="none" stroke="#f3dca6" stroke-width="14"/></g>
    <g class="pp-float" data-x="1680" data-y="180" data-ph="2"><circle r="64" fill="#8cb8d8"/><circle cx="-18" cy="-16" r="14" fill="#a9cde4"/><circle cx="22" cy="18" r="10" fill="#6f9cc0"/></g>
    <g class="pp-float" data-x="1460" data-y="560" data-ph="4"><circle r="34" fill="#c7b3e0"/></g>
    <g class="pp-float" data-x="420" data-y="620" data-ph="3"><circle r="26" fill="#e8d6a0"/></g>`;

  // 4: 金色の午後の空と麦畑
  const goldenField = id => `${band(id, [[0, '#8fb3cf'], [.5, '#f0cf98'], [1, '#c99448']])}
    ${glow(id + '-sun', '#fff0c4', 380, 260, 560, 360, .8)}
    ${cloud(560, 170, 1.1, '#fff4dc')}${cloud(1380, 120, .9, '#ffefd2')}${cloud(1700, 300, .7, '#fde6c4')}
    <path d="M0 640Q480 590 960 620T1920 600V1080H0Z" fill="#b98f52"/>
    <g class="pp-wheat">${ppRep(220, i => { const x = (i * 89) % 1960 - 20, y = 650 + (i * 53) % 230; return `<ellipse cx="${x}" cy="${y}" rx="7" ry="16" fill="${i % 3 ? '#d4a650' : '#c4943e'}" transform="rotate(${(i % 5 - 2) * 8} ${x} ${y})"/>`; })}</g>
    <path d="M0 860Q500 800 960 840T1920 820V1080H0Z" fill="#a87a3a"/>`;

  // 5: 夜明け前の砂漠
  const preDawn = id => `${band(id, [[0, '#1b2350'], [.5, '#4a4b84'], [.72, '#c98aa0'], [1, '#6a4f6e']])}
    ${glow(id + '-dawn', '#f6b9a4', 960, 760, 1100, 260, .7)}
    <g class="pp-fade">${stars(80, 51, '#fff6e6', 520, .15)}</g>
    ${dunes(['#5d4f78', '#4b4068', '#3a3155'], 700)}`;

  // 6: 満天の星の夜の砂漠
  const starryNight = id => `${band(id, [[0, '#070b24'], [.6, '#16204a'], [1, '#1a1838']])}
    <g transform="rotate(14 960 540)" opacity=".5">${glow(id + '-mw', '#6c6fb8', 960, 330, 1300, 170, .8)}</g>
    ${stars(170, 67, '#fff7dc', 800, .3)}${shooting(1300, 200, 260, 1)}
    ${dunes(['#2c2a52', '#211f42', '#18162f'], 760)}`;

  const animate = (t, el, q) => {
    if (!q.tw) {
      const all = s => [...el.querySelectorAll(s)];
      q.tw = all('.pp-tw').map(n => ({ n, ph: +n.dataset.ph, sp: +n.dataset.sp }));
      q.drift = all('.pp-drift').map(n => ({ n, sp: +n.dataset.sp, amp: +n.dataset.amp }));
      q.shoot = all('.pp-shoot').map(n => ({ n, x: +n.dataset.x, y: +n.dataset.y, ph: +n.dataset.ph }));
      q.comet = all('.pp-comet');
      q.float = all('.pp-float').map(n => ({ n, x: +n.dataset.x, y: +n.dataset.y, ph: +n.dataset.ph }));
      q.sand = all('.pp-sand').map(n => ({ n, x: +n.dataset.x, y: +n.dataset.y }));
      q.haze = el.querySelector('.pp-haze');
      q.wheat = el.querySelector('.pp-wheat');
      q.fade = el.querySelector('.pp-fade');
    }
    q.tw.forEach(({ n, ph, sp }) => n.setAttribute('opacity', F(.55 + .45 * sin(t * sp + ph))));
    q.drift.forEach(({ n, sp, amp }, i) => n.setAttribute('transform', `translate(${F(amp * sin(t * sp + i))} 0)`));
    q.shoot.forEach(({ n, x, y, ph }) => {
      const u = ((t * .16 + ph * .13) % 1 + 1) % 1, k = cl(u / .12);       // 6秒ごとに1回、0.75秒で流れる
      n.setAttribute('opacity', F(u < .12 ? sin(k * PI) : 0));
      n.setAttribute('transform', `translate(${F(x + 320 * k)} ${F(y + 122 * k)})`);
    });
    q.comet.forEach(n => {
      const u = ((t * .045 + .3) % 1 + 1) % 1;
      n.setAttribute('transform', `translate(${F(-200 + 2400 * u)} ${F(120 + 160 * u)})`);
    });
    q.float.forEach(({ n, x, y, ph }) => n.setAttribute('transform', `translate(${F(x + 30 * sin(t * .12 + ph))} ${F(y + 18 * sin(t * .2 + ph))})`));
    q.sand.forEach(({ n, x, y }, i) => n.setAttribute('transform', `translate(${F(((x + t * (40 + i % 4 * 12)) % 2000) - 40)} ${F(y + 10 * sin(t + i))})`));
    q.haze?.setAttribute('transform', `translate(0 ${F(3 * sin(t * 1.7))})`);
    q.wheat?.setAttribute('transform', `skewX(${F(2.2 * sin(t * .9))})`);
    q.fade?.setAttribute('opacity', F(.75 + .2 * sin(t * .4)));
  };
  const scene = (id, svg, blur = 5) => ({ svg: svg + darken(id), anim: animate, blur, shadow: .5 });
  return {
    cover: scene('pp-cover', cosmos('pp-cover')),
    desert: scene('pp-desert', desertDay('pp-desert')),
    nebula: scene('pp-nebula', nebula('pp-nebula')),
    deep: scene('pp-deep', deepSpace('pp-deep')),
    field: scene('pp-field', goldenField('pp-field')),
    dawn: scene('pp-dawn', preDawn('pp-dawn')),
    night: scene('pp-night', starryNight('pp-night')),
  };
})();

// 書き下ろしの曲集: 3拍子のゆったりしたワルツ。少しさみしさのある長調の主題・軽やかな副主題・夜想曲。
const ppScore = {
  tr: 0,
  tempo: 1.15,
  main: {                                   // ぼくの星の主題
    beats: 3,
    chords: ['C', 'Em', 'Am', 'F', 'Dm', 'G7', 'C', 'C'],
    mel: [
      [[0, 79], [1, 76], [2, 79]],
      [[0, 83], [1, 81], [2, 79]],
      [[0, 81], [1.5, 84], [2.5, 83]],
      [[0, 81], [2, 77]],
      [[0, 77], [1, 81], [2, 86]],
      [[0, 83], [1, 79], [2, 77]],
      [[0, 76], [1, 79], [2, 84]],
      [[0, 84]],
    ],
  },
  sub: {                                    // 星めぐり・麦畑の軽やかな曲
    beats: 3,
    chords: ['F', 'C', 'G', 'Am', 'F', 'C', 'G', 'C'],
    mel: [
      [[0, 81], [1, 84], [2, 89]],
      [[0, 88], [1, 84], [2, 79]],
      [[0, 86], [1, 83], [1.5, 81], [2, 79]],
      [[0, 81], [2, 76]],
      [[0, 77], [1, 81], [2, 84]],
      [[0, 84], [1, 88], [2, 91]],
      [[0, 86], [1, 83], [2, 79]],
      [[0, 84]],
    ],
  },
  minor: {                                  // 夜想曲(井戸・別れ)
    beats: 3,
    chords: ['Am', 'Dm', 'E', 'Am', 'F', 'Dm', 'E', 'Am'],
    mel: [
      [[0, 76], [1, 81], [2, 84]],
      [[0, 86], [1, 84], [2, 81]],
      [[0, 83], [1, 80], [2, 76]],
      [[0, 81]],
      [[0, 77], [1, 81], [2, 84]],
      [[0, 86], [1.5, 84], [2.5, 81]],
      [[0, 80], [1, 83], [2, 76]],
      [[0, 81]],
    ],
  },
};
