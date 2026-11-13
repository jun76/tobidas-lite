// Momotaro — 本の後ろに敷く、場面ごとの切り紙風の景色。座標は 1920 × 1080。
// 見開きごとに scene を差し替える。動きは環境の時計 t の関数(静止画チェックでは作品の時刻が渡る)。
const momoAtmosphere = (() => {
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
  const band = (id, top, bottom) => `
    <defs><linearGradient id="${id}" x2="0%" y2="100%"><stop stop-color="${top}"/>
    <stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#${id})"/>`;
  const shade = id => `<defs><linearGradient id="${id}-b" x2="0%" y2="100%">
    <stop offset=".58" stop-color="#101820" stop-opacity="0"/>
    <stop offset="1" stop-color="#0c1218" stop-opacity=".72"/></linearGradient></defs>`;
  const darken = id => `<rect width="1920" height="1080" fill="url(#${id}-b)" pointer-events="none"/>`;
  const glow = (id, color) => `<defs><radialGradient id="${id}"><stop stop-color="${color}"/>
    <stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>`;

  const petals = (n, color) => rep(n, i => {
    const x = 40 + (i * 337) % 1840, y = (i * 173 + 61) % 980;
    return `<path class="momo-petal" data-x="${x}" data-y="${y}" d="M-10 4Q-12-8 0-10Q12-8 10 4Q4 11-10 4Z" fill="${color}" opacity=".62"/>`;
  });

  // 柳(場面装飾)。左右の縁に立てる
  const willow = (x, s, c, c2) => `<g transform="translate(${x} 0) scale(${s})">
    <path d="M0 970Q-20 640 20 430Q40 330 10 250" stroke="#7a5a38" stroke-width="42" fill="none" stroke-linecap="round"/>
    ${rep(7, i => `<path d="M${5 + (i - 3) * 26} ${300 + i % 3 * 26}Q${-10 + (i - 3) * 40} ${520 + i % 2 * 60} ${-22 + (i - 3) * 46} ${690 - i % 3 * 40}" stroke="${i % 2 ? c : c2}" stroke-width="26" fill="none" stroke-linecap="round" opacity=".9"/>`)}
  </g>`;

  const river = `
    ${band('momo-riv', '#8ec9e6', '#d9efc8')}
    ${glow('momo-riv-sun', '#fff3c2')}
    <ellipse cx="1500" cy="130" rx="470" ry="300" fill="url(#momo-riv-sun)" opacity=".7"/>
    <g class="momo-drift" fill="#fdfdf6" opacity=".85">
      <ellipse cx="360" cy="150" rx="185" ry="52"/><ellipse cx="470" cy="122" rx="120" ry="44"/>
      <ellipse cx="1310" cy="250" rx="160" ry="44"/><ellipse cx="1408" cy="228" rx="96" ry="34"/>
    </g>
    <path d="M0 470Q420 330 860 420T1920 380V560H0Z" fill="#9fc7b2"/>
    <path d="M0 560Q520 470 1050 540T1920 520V1080H0Z" fill="#7fb392"/>
    <path d="M-60 1080Q240 720 700 640Q1230 552 1980 600V760Q1300 700 850 790Q420 872 220 1080Z" fill="#63b9de"/>
    ${rep(9, i => `<ellipse class="momo-spark" data-x="${120 + i * 205}" data-y="${700 + (i * 71) % 230}" rx="${46 + i % 3 * 22}" ry="12" fill="#e8f8ff" opacity=".5"/>`)}
    ${willow(1640, 1, '#6fae7a', '#8cc28e')}
    ${willow(220, .72, '#7cba86', '#9ed0a2')}
    ${petals(16, '#f9c3cf')}`;

  const village = `
    ${band('momo-vil', '#fde3c8', '#cfe3b8')}
    ${glow('momo-vil-sun', '#ffdf9e')}
    <ellipse cx="500" cy="200" rx="560" ry="380" fill="url(#momo-vil-sun)" opacity=".78"/>
    <circle cx="470" cy="205" r="86" fill="#fff0b8" opacity=".9"/>
    <g class="momo-drift" fill="#fdf6ea" opacity=".9">
      <ellipse cx="1230" cy="170" rx="200" ry="50"/><ellipse cx="1350" cy="146" rx="120" ry="40"/>
      <ellipse cx="760" cy="300" rx="150" ry="38"/>
    </g>
    <path d="M0 520Q430 380 940 470T1920 430V1080H0Z" fill="#b9d49a"/>
    ${rep(5, i => `<path d="M${60 + i * 360} 640Q${230 + i * 360} 585 ${400 + i * 360} 636L${400 + i * 360} 690Q${230 + i * 360} 645 ${60 + i * 360} 700Z" fill="${i % 2 ? '#a5c98a' : '#c8ddA0'}" opacity=".9"/>`)}
    ${rep(4, i => `<g class="momo-drift"><path d="M${180 + i * 470} 520h300l-40 34h-220Z" fill="#8fae76" opacity=".5"/></g>`)}
    <path d="M0 780Q520 690 1080 760T1920 740V1080H0Z" fill="#8fbb79"/>
    <g fill="#8a5f46" opacity=".92">
      <path d="M250 810L360 750L470 810V900H250Z"/><path d="M226 812L360 736L494 812Z" fill="#6d4634"/>
      <path d="M1420 830L1530 772L1640 830V916H1420Z"/><path d="M1396 832L1530 758L1664 832Z" fill="#6d4634"/>
    </g>
    ${petals(14, '#f9c3cf')}`;

  const road = `
    ${band('momo-rd', '#bfe3f2', '#dcedc4')}
    ${glow('momo-rd-sun', '#fff6d0')}
    <ellipse cx="1420" cy="150" rx="520" ry="330" fill="url(#momo-rd-sun)" opacity=".72"/>
    <g class="momo-drift" fill="#fcfdf4" opacity=".92">
      <ellipse cx="300" cy="130" rx="170" ry="46"/><ellipse cx="400" cy="108" rx="105" ry="36"/>
      <ellipse cx="1180" cy="210" rx="190" ry="48"/><ellipse cx="1290" cy="186" rx="110" ry="36"/>
      <ellipse cx="880" cy="96" rx="120" ry="32"/>
    </g>
    <path d="M0 400Q480 320 1010 380T1920 350V470H0Z" fill="#8fc0c8"/>
    <path d="M0 470Q540 420 1080 462T1920 448V536H0Z" fill="#a8cfc4"/>
    <path d="M0 560Q500 500 1050 548T1920 530V1080H0Z" fill="#a9d08a"/>
    <path d="M700 1080Q820 800 900 640Q935 570 1000 560L1070 560Q1000 590 975 660Q900 830 880 1080Z" fill="#dcc28f"/>
    ${rep(6, i => `<g class="momo-drift"><ellipse cx="${120 + i * 330}" cy="${660 + (i % 3) * 60}" rx="${86 + i % 2 * 40}" ry="24" fill="#8fbe72" opacity=".6"/></g>`)}
    ${rep(5, i => `<circle cx="${205 + i * 380}" cy="${640 + (i % 2) * 46}" r="${58 + i % 2 * 18}" fill="#6da75f" opacity=".85"/>`)}`;

  const sea = `
    ${band('momo-sea', '#f2a26b', '#6a5a9a')}
    ${glow('momo-sea-sun', '#ffd9a0')}
    <ellipse cx="620" cy="330" rx="560" ry="330" fill="url(#momo-sea-sun)" opacity=".85"/>
    <circle cx="600" cy="336" r="92" fill="#ffe6b0"/>
    <g class="momo-drift" fill="#e9a98a" opacity=".7">
      <ellipse cx="1250" cy="200" rx="230" ry="40"/><ellipse cx="1400" cy="176" rx="140" ry="34"/>
      <ellipse cx="300" cy="140" rx="180" ry="34"/>
    </g>
    <path d="M1160 560Q1300 420 1420 430Q1520 380 1610 440Q1760 470 1860 560Z" fill="#3a3054"/>
    <path d="M0 560H1920V1080H0Z" fill="#4a5a96"/>
    <g class="momo-wave"><path d="M0 640Q240 610 480 640T960 640T1440 640T1920 640V680H0Z" fill="#6a7ab6" opacity=".85"/></g>
    <g class="momo-wave"><path d="M0 760Q260 724 520 760T1040 760T1560 760T1920 748V812H0Z" fill="#5a68a4" opacity=".9"/></g>
    ${rep(10, i => `<ellipse class="momo-spark" data-x="${90 + i * 190}" data-y="${690 + (i * 97) % 330}" rx="${52 + i % 3 * 26}" ry="11" fill="#ffe9c8" opacity=".45"/>`)}
    ${rep(3, i => `<g class="momo-bird" data-i="${i}"><path d="M-26 0Q-12-14 0-2Q12-14 26 0" fill="none" stroke="#2f2a44" stroke-width="8" stroke-linecap="round" transform="translate(${420 + i * 500} ${250 + i * 60})"/></g>`)}`;

  const oni = `
    ${band('momo-oni', '#40305e', '#160f26')}
    ${glow('momo-oni-red', '#ff7a4a')}
    <ellipse cx="1500" cy="640" rx="560" ry="300" fill="url(#momo-oni-red)" opacity=".5"/>
    <ellipse cx="290" cy="680" rx="430" ry="230" fill="url(#momo-oni-red)" opacity=".34"/>
    <circle cx="420" cy="180" r="74" fill="#e9e2c8" opacity=".9"/>
    ${rep(4, i => `<g class="momo-cloud" data-i="${i}"><ellipse cx="${240 + i * 460}" cy="${120 + (i % 2) * 90}" rx="${250 + i % 2 * 90}" ry="${46 + i % 3 * 14}" fill="#5a4472" opacity=".66"/></g>`)}
    <path d="M0 560Q160 380 330 420Q430 300 590 356Q760 240 900 360Q1080 300 1180 420Q1380 350 1520 440Q1720 400 1920 520V1080H0Z" fill="#231a34"/>
    <path d="M0 700Q240 600 520 660T1120 640T1920 680V1080H0Z" fill="#1a1328"/>
    ${rep(7, i => `<rect class="momo-flicker" data-i="${i}" x="${180 + i * 250}" y="${620 + (i % 3) * 52}" width="34" height="46" rx="8" fill="#ff8a50" opacity=".8"/>`)}
    ${rep(3, i => `<g class="momo-cloud" data-i="${i + 4}"><ellipse cx="${380 + i * 620}" cy="${820}" rx="290" ry="52" fill="#2c2140" opacity=".8"/></g>`)}`;

  const dawn = `
    ${band('momo-daw', '#ffd9a0', '#f8ecc8')}
    ${glow('momo-daw-sun', '#ffe9a8')}
    <ellipse cx="960" cy="420" rx="760" ry="420" fill="url(#momo-daw-sun)" opacity=".85"/>
    <circle cx="960" cy="430" r="120" fill="#fff4c8"/>
    <g class="momo-drift" fill="#fdf1d8" opacity=".9">
      <ellipse cx="330" cy="180" rx="200" ry="46"/><ellipse cx="452" cy="158" rx="120" ry="36"/>
      <ellipse cx="1560" cy="220" rx="220" ry="48"/><ellipse cx="1440" cy="196" rx="120" ry="36"/>
    </g>
    <path d="M0 520Q460 420 990 486T1920 452V600H0Z" fill="#e6cf9a"/>
    <path d="M0 640Q500 570 1030 622T1920 600V1080H0Z" fill="#c9d290"/>
    <g class="momo-drift"><ellipse cx="1520" cy="700" rx="230" ry="30" fill="#fff6dd" opacity=".7"/></g>
    ${rep(4, i => `<g class="momo-bird" data-i="${i}"><path d="M-22 0Q-10-12 0-2Q10-12 22 0" fill="none" stroke="#8a6a48" stroke-width="7" stroke-linecap="round" transform="translate(${340 + i * 430} ${210 + i % 2 * 90})"/></g>`)}
    ${petals(12, '#ffd7a8')}`;

  const home = `
    ${band('momo-home', '#f7c9a0', '#7a8a9a')}
    ${glow('momo-home-sun', '#ffdf9e')}
    <ellipse cx="1300" cy="360" rx="620" ry="380" fill="url(#momo-home-sun)" opacity=".9"/>
    <circle cx="1330" cy="366" r="104" fill="#ffecbe"/>
    <g class="momo-drift" fill="#f6dfc0" opacity=".85">
      <ellipse cx="380" cy="200" rx="220" ry="48"/><ellipse cx="500" cy="176" rx="130" ry="38"/>
      <ellipse cx="940" cy="120" rx="150" ry="34"/>
    </g>
    <path d="M0 560Q480 460 1010 528T1920 500V660H0Z" fill="#9a9f8e"/>
    <path d="M0 700Q520 630 1060 684T1920 660V1080H0Z" fill="#78907a"/>
    <path d="M-60 1080Q340 900 900 900Q1480 900 1980 1000V1080Z" fill="#5f8fae" opacity=".8"/>
    <g fill="#7a5540"><path d="M1420 700L1560 620L1700 700V830H1420Z"/><path d="M1390 704L1560 606L1730 704Z" fill="#5f3d2e"/></g>
    <g><path d="M330 900Q310 700 340 560" stroke="#7a5a38" stroke-width="30" fill="none" stroke-linecap="round"/>
      ${rep(7, i => `<circle cx="${300 + (i % 4) * 60 + (i > 3 ? 30 : 0)}" cy="${430 + (i % 3) * 60}" r="${52 + i % 3 * 16}" fill="#f6b7c6" opacity=".92"/>`)}
    </g>
    ${petals(18, '#f9c3cf')}`;

  const animate = (t, el, cache) => {
    if (!cache.built) {
      cache.drift = [...el.querySelectorAll('.momo-drift, .momo-cloud')].map(node =>
        ({ node, x: Number(node.dataset.i || 0) }));
      cache.petal = [...el.querySelectorAll('.momo-petal')].map(node =>
        ({ node, x: Number(node.dataset.x), y: Number(node.dataset.y) }));
      cache.wave = [...el.querySelectorAll('.momo-wave')];
      cache.spark = [...el.querySelectorAll('.momo-spark')];
      cache.bird = [...el.querySelectorAll('.momo-bird')].map(node =>
        ({ node, i: Number(node.dataset.i) }));
      cache.flicker = [...el.querySelectorAll('.momo-flicker')];
      cache.built = true;
    }
    cache.drift.forEach(({ node, x }, i) => node.setAttribute('transform',
      `translate(${F(46 * Math.sin(t * .22 + x * .01 + i))} ${F(10 * Math.sin(t * .3 + i))})`));
    cache.petal.forEach(({ node, x, y }, i) => node.setAttribute('transform',
      `translate(${F(x + 60 * Math.sin(t * .5 + i * 1.7))} ${F((y + t * (16 + i % 5 * 7)) % 1140 - 30)}) rotate(${F(t * (21 + i % 6 * 9) + i * 33)})`));
    cache.wave.forEach((node, i) => node.setAttribute('transform',
      `translate(${F(26 * Math.sin(t * .7 + i * 2))} ${F(6 * Math.sin(t * 1.1 + i))})`));
    cache.spark.forEach((node, i) => node.setAttribute('opacity',
      F(.24 + .34 * (.5 + .5 * Math.sin(t * 2.1 + i * 1.9)))));
    cache.bird.forEach(({ node, i }, k) => {
      const u = ((t * (.02 + k * .004) + i * .17) % 1 + 1) % 1;
      node.setAttribute('transform', `translate(${F(-260 + u * 2460)} ${F(-18 * Math.sin(u * 9 + i))})`);
    });
    cache.flicker.forEach((node, i) => node.setAttribute('opacity',
      F(.55 + .35 * (.5 + .5 * Math.sin(t * (2.4 + i * .5) + i)))));
  };
  const scene = (id, svg) => ({ svg: shade(id) + svg + darken(id), anim: animate, blur: 5, shadow: .5 });

  return {
    home: scene('momo-home', home),
    river: scene('momo-riv', river),
    village: scene('momo-vil', village),
    road: scene('momo-rd', road),
    sea: scene('momo-sea', sea),
    oni: scene('momo-oni', oni),
    dawn: scene('momo-daw', dawn),
  };
})();
