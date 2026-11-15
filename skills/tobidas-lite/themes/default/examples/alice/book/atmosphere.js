// 本の後ろに敷く、場面ごとの切り紙風の景色。座標は 1920 × 1080。
const aliceAtmosphere = (() => {
  const band = (id, top, bottom) => `
    <defs><linearGradient id="${id}" x2="0%" y2="100%"><stop stop-color="${top}"/>
    <stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#${id})"/>`;
  const shade = id => `<defs><linearGradient id="${id}-bottom" x2="0%" y2="100%">
    <stop offset=".58" stop-color="#142329" stop-opacity="0"/>
    <stop offset="1" stop-color="#101e25" stop-opacity=".8"/>
    </linearGradient></defs>`;
  const darken = id => `<rect width="1920" height="1080" fill="url(#${id}-bottom)" pointer-events="none"/>`;
  const trunk = (x, width, lean, color) => `<path d="M${x} 970Q${x + lean * .35} 490 ${x + lean} -90
    h${width}Q${x + lean * .6 + width} 470 ${x + width * 1.45} 970Z" fill="${color}"/>
    <path d="M${x + lean * .3 + width * .4} 370q${lean * .8} -150 ${lean * 2} -220"
    fill="none" stroke="${color}" stroke-width="${width * .35}" stroke-linecap="round"/>`;
  const glow = (id, color) => `<defs><radialGradient id="${id}"><stop stop-color="${color}"/>
    <stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs>`;
  const specks = (count, color) => repeats(count, i => {
    const x = 30 + (i * 313) % 1850, y = (i * 139 + 21) % 830;
    return `<path class="alice-leaf" data-x="${x}" data-y="${y}" d="M-11 3Q0-11 12-4Q7 7-11 3Z"
      fill="${color}" opacity=".42"/>`;
  });
  const branches = `<path d="M-40 80Q228 27 489 186T812 235Q606 248 411 156Q218 69-40 154Z
    M1950 79Q1670 109 1475 220T1139 262Q1417 193 1551 104T1950 0Z" fill="#1b4141"/>`;
  const forest = (id, moonlit) => `
    ${band(id, moonlit ? '#527378' : '#51766c', '#233c45')}
    ${glow(id + '-light', moonlit ? '#9cc7b3' : '#e6cb8c')}
    <ellipse cx="960" cy="185" rx="725" ry="410" fill="url(#${id}-light)" opacity=".66"/>
    ${repeats(15, i => trunk(i * 141 - 30, 23 + (i % 5) * 11, (i % 5 - 2) * 46,
      i % 2 ? '#416766' : '#4e7471'))}
    <path d="M0 725Q395 633 714 735T1284 742T1920 650V1080H0Z" fill="#335957"/>
    ${trunk(108, 145, -90, '#1b4141')}${trunk(1710, 119, 106, '#1b4141')}${branches}
    ${moonlit
      ? '<g class="alice-drift" fill="#b9d6c3" opacity=".19"><ellipse cx="310" cy="760" rx="490" ry="58"/><ellipse cx="1580" cy="590" rx="540" ry="60"/></g>'
      : '<path d="M775 0H946L1320 700H1130ZM1070 0H1164L1520 676H1440Z" fill="#e7d8a4" opacity=".13"/>'}
    ${specks(moonlit ? 14 : 22, moonlit ? '#a1c7b7' : '#e0c289')}`;
  const riverbank = id => `
    ${band(id, '#96b6aa', '#47665b')}
    ${glow(id + '-sun', '#f8dda6')}
    <ellipse cx="1430" cy="105" rx="487" ry="290" fill="url(#${id}-sun)" opacity=".76"/>
    <g class="alice-drift" fill="#e4d8b2" opacity=".45">
      <path d="M-90 205Q104 118 345 154Q417 112 493 139L610 172Q325 189-90 235Z"/>
      <path d="M1300 285Q1478 234 1555 254Q1622 209 1722 241L1999 255V280Z"/>
    </g>
    <path d="M0 543Q338 293 700 398T1261 429T1920 418V1080H0Z" fill="#6f9582"/>
    <path d="M0 659Q309 466 671 535T1317 522T1920 512V1080H0Z" fill="#567d6a"/>
    <path d="M1082 536Q1731 596 1920 698V983Q1628 798 861 698Q693 656 1082 536Z" fill="#7fa39b" opacity=".8"/>
    <path d="M1343 641q411 56 570 171M1549 757q224 57 371 155" stroke="#b6c9ab" stroke-width="11" fill="none" opacity=".48"/>
    <path d="M0 792Q371 674 678 827T1322 922T1920 945V1080H0Z" fill="#44665a"/>
    <g class="alice-grass" fill="#2d514b">${repeats(34, i => {
      const x = i * 60 - 30, y = 1030 + i % 5 * 14, h = 115 + (i * 43) % 100;
      return `<path d="M${x} ${y}q-14 -${h * .72} -55 -${h}q52 28 74 ${h}Z"/>`;
    })}</g>${specks(12, '#f3d49b')}`;
  const shaft = `
    ${band('alice-shaft', '#6c5979', '#2d2c46')}
    ${glow('alice-shaft-haze', '#c097ac')}
    <ellipse cx="1010" cy="216" rx="725" ry="530" fill="url(#alice-shaft-haze)" opacity=".47"/>
    <path d="M0 0H420Q240 364 555 1080H0ZM1920 0H1480Q1672 471 1360 1080H1920Z" fill="#3d3552"/>
    ${repeats(8, i => {
      const side = i % 2, x = side ? 1430 + i % 3 * 80 : 57 + i % 3 * 88;
      const prop = i % 3 === 0
        ? '<circle r="61" fill="#8a6b86"/><circle r="46" fill="#5b4c69"/><path d="M0-30V0L22 12" fill="none" stroke="#af94a4" stroke-width="8" stroke-linecap="round"/>'
        : '<path d="M-95 33H132V51H-95Z" fill="#806482"/><path d="M-62 32V-25H-30V32M-14 32V-51H24V32M39 32V-9H72V32" fill="none" stroke="#a18199" stroke-width="11"/>';
      return `<g class="alice-shelf" data-x="${x}" data-y="${i * 160}" opacity=".73">${prop}</g>`;
    })}`;
  const corridor = `
    ${band('alice-corridor', '#68556b', '#372e44')}
    <path d="M0 0L720 270H1195L1920 0M0 920L720 493H1195L1920 920" fill="none" stroke="#a48898" stroke-width="12" opacity=".45"/>
    ${[90, 340, 535, 1190, 1360, 1560].map((x, i) => {
      const scale = [1.35, 1.04, .75, .75, 1.04, 1.35][i];
      return `<g transform="translate(${x} ${145 + (1.35 - scale) * 198}) scale(${scale})">
        <path d="M0 437V118Q0 4 130 4Q260 4 260 118V437Z" fill="#4e3c58" stroke="#8e7285" stroke-width="10"/>
        <path d="M33 433V127Q33 34 130 34Q227 34 227 127V433" fill="none" stroke="#695169" stroke-width="7"/>
      </g>`;
    }).join('')}
    ${glow('alice-doorlight', '#f6cc87')}
    <ellipse class="alice-doorlight" cx="960" cy="380" rx="275" ry="340" fill="url(#alice-doorlight)" opacity=".6"/>
    <path d="M888 481V346Q888 263 960 263Q1032 263 1032 346V481Z" fill="#eed19c"/>
    <path d="M888 481V346Q888 272 960 263L943 461Z" fill="#9c806a"/>
    <path d="M941 470H1032L1330 816H620Z" fill="#dbb887" opacity=".17"/>`;
  const teaGarden = `
    ${band('alice-tea', '#aa8f85', '#475f59')}
    ${glow('alice-tea-sun', '#ffdea6')}
    <ellipse cx="1455" cy="165" rx="540" ry="358" fill="url(#alice-tea-sun)" opacity=".72"/>
    <path d="M0 432Q442 343 830 406T1390 386T1920 369V1080H0Z" fill="#6f8571"/>
    <path d="M0 531Q160 360 293 470Q443 375 578 505Q709 433 855 522Q1032 403 1168 510Q1330 418 1450 491Q1640 358 1750 462L1920 427V1080H0Z" fill="#4b6b60"/>
    <path d="M0 692Q271 579 540 704T1270 705T1920 665V1080H0Z" fill="#3c5a51"/>
    ${trunk(-43, 116, -90, '#36574e')}${trunk(1803, 105, 118, '#36574e')}
    ${repeats(11, i => `<circle class="alice-lantern" cx="${75 + i * 175}" cy="${467 + sin(i * .91) * 44}" r="${13 + i % 3 * 4}" fill="#ebc48c" opacity=".5"/>`)}
    ${specks(15, '#e5ae8f')}`;
  const curtainSide = `
    <path d="M-25-40H1010Q983 240 822 339Q663 420 465 359Q449 562 317 744L215 1080H-25Z" fill="#773c55"/>
    <path d="M50 0Q174 281 139 626L104 1080M203 0Q340 241 303 540L238 941M369 0Q492 215 437 378M548 0Q660 177 602 369M740 0Q794 135 765 350"
      stroke="#a15a67" stroke-width="36" opacity=".65" fill="none"/>
    <path d="M-35 440Q194 375 467 362" fill="none" stroke="#bc986b" stroke-width="14" opacity=".79"/>`;
  const courtroom = `
    ${band('alice-court', '#6f455e', '#432f44')}
    <path d="M0 338H1920M0 376H1920" stroke="#ba9374" stroke-width="14" opacity=".48"/>
    ${repeats(7, i => heart(205 + i * 252, 241, 99, '#aa7180'))}
    <g class="alice-curtain-left">${curtainSide}</g>
    <g class="alice-curtain-right"><g transform="translate(1920) scale(-1 1)">${curtainSide}</g></g>`;
  const animate = (t, el, cache) => {
    if (!cache.leaves) {
      const positioned = selector => [...el.querySelectorAll(selector)].map(node =>
        ({ node, x: Number(node.dataset.x), y: Number(node.dataset.y) }));
      cache.leaves = positioned('.alice-leaf');
      cache.shelves = positioned('.alice-shelf');
      cache.lanterns = el.querySelectorAll('.alice-lantern');
      cache.drift = el.querySelectorAll('.alice-drift');
      cache.grass = el.querySelector('.alice-grass');
      cache.light = el.querySelector('.alice-doorlight');
    }
    cache.leaves.forEach(({ node, x, y }, i) => node.setAttribute('transform',
      `translate(${F(x + 46 * sin(t * .51 + i))} ${F((y + t * (9 + i % 5)) % 1130 - 25)}) rotate(${F(t * (13 + i % 4) + i * 27)})`));
    cache.shelves.forEach(({ node, x, y }, i) => node.setAttribute('transform',
      `translate(${F(x + 18 * sin(t * .53 + i))} ${F((y - t * 48 % 1280 + 1280) % 1280 - 90)})`));
    cache.lanterns.forEach((node, i) => node.setAttribute('opacity', F(.48 + .19 * sin(t * 1.2 + i))));
    cache.drift.forEach(node => node.setAttribute('transform', `translate(${F(54 * sin(t * .24))} 0)`));
    cache.grass?.setAttribute('transform', `skewX(${F(1.8 * sin(t * 1.1))})`);
    cache.light?.setAttribute('opacity', F(.62 + .12 * sin(t * 1.23)));
  };
  const scene = (id, svg) => ({ svg: shade(id) + svg + darken(id), anim: animate, blur: 5, shadow: .53 });
  return {
    cover: scene('alice-cover', forest('alice-cover', false)),
    bank: scene('alice-bank', riverbank('alice-bank')),
    shaft: scene('alice-shaft', shaft),
    corridor: scene('alice-corridor', corridor),
    forest: scene('alice-forest', forest('alice-forest', true)),
    tea: scene('alice-tea', teaGarden),
    court: (spread, awake) => ({
      svg: shade('alice-finale') + riverbank('alice-wake') + `<g class="alice-court">${courtroom}</g>` + darken('alice-finale'),
      anim(t, el, cache) {
        animate(t, el, cache);
        cache.court ??= el.querySelector('.alice-court');
        cache.left ??= el.querySelector('.alice-curtain-left');
        cache.right ??= el.querySelector('.alice-curtain-right');
        // 背景のゆれは環境の時計、目覚めの切り替えはページの時刻に合わせる。
        const localTime = Tobidas.t - Tobidas.TL.open(spread);
        const waking = awake(localTime);
        const opening = sm((localTime + 1.55) / 2.3);
        const slide = F(465 * opening + 260 * waking);
        cache.court.setAttribute('opacity', F(1 - waking));
        cache.left.setAttribute('transform', `translate(-${slide} 0)`);
        cache.right.setAttribute('transform', `translate(${slide} 0)`);
      },
    }),
  };
})();

// オルゴール用の3曲。各組は [小節内の拍, MIDI音程]。
const aliceScore = {
  // 白うさぎの主題
  main: {
    beats: 3,
    chords: ['C', 'G', 'Am', 'Em', 'F', 'C', 'G7', 'C'],
    mel: [
      [[0, 79], [1, 84], [1.5, 86], [2, 88]],
      [[0, 86], [1, 83], [2, 79]],
      [[0, 81], [1, 84], [2, 88], [2.5, 86]],
      [[0, 83], [1.5, 79], [2.5, 76]],
      [[0, 77], [1, 81], [2, 84]],
      [[0, 88], [1.5, 84]],
      [[0, 83], [1, 81], [2, 79], [2.5, 83]],
      [[0, 84], [1.75, 72]],
    ],
  },
  // 帽子屋のお茶会
  sub: {
    beats: 3,
    chords: ['F', 'C', 'Dm', 'G', 'Em', 'Am', 'G7', 'C'],
    mel: [
      [[0, 81], [.5, 84], [1.5, 89], [2.5, 84]],
      [[0, 88], [.5, 86], [1, 84], [2, 79]],
      [[0, 77], [1, 81], [1.5, 86], [2.5, 81]],
      [[0, 83], [1, 86], [2.5, 91]],
      [[0, 88], [1, 83], [2, 79]],
      [[0, 81], [1.5, 84]],
      [[0, 86], [.75, 89], [1.5, 86], [2.5, 83]],
      [[0, 84], [2, 72]],
    ],
  },
  // うさぎ穴と裁判をつなぐ短調
  minor: {
    beats: 3,
    chords: ['Am', 'E', 'Dm', 'Am', 'F', 'Dm', 'E', 'Am'],
    mel: [
      [[0, 88], [.75, 86], [1.5, 84], [2.25, 81]],
      [[0, 83], [1, 80], [2, 76]],
      [[0, 77], [1, 81], [2.25, 86]],
      [[0, 84], [1.5, 81]],
      [[0, 89], [1.5, 84], [2.5, 81]],
      [[0, 86], [1.5, 81]],
      [[0, 88], [.75, 86], [1.5, 83], [2.5, 80]],
      [[0, 81], [2, 81]],
    ],
  },
};
