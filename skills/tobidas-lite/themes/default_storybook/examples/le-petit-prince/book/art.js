// Les illustrations originales et les décors du livre.
const princeFont = '"Noto Serif","DejaVu Serif",Georgia,serif';
const { c: circle, e: ellipse, p: pathShape, l: line, g: group, at } = DRAW;
const mirror = (art, width) => `<g transform="translate(${width} 0) scale(-1 1)">${art}</g>`;
const star = (x, y, size, color = '#f9d78c') =>
  at(x, y, pathShape('M0-12Q2-2 10 0Q2 2 0 12Q-2 2-10 0Q-2-2 0-12Z', color), size / 12);

const prince = (flip = false) => {
  const art = `
    <path d="M60 156L55 213H78L89 175L91 213H113L117 156Z" fill="#355351"/>
    <path d="M55 204H78L79 219H45Q40 211 55 204ZM91 204H112Q127 207 127 219H91Z" fill="#3d343c"/>
    <path d="M65 104Q50 119 45 162L59 168L71 139L69 177Q91 184 121 175L110 105Z" fill="#4c7975"/>
    <path d="M99 111Q115 104 122 124L133 151L120 158L105 129Z" fill="#67958a"/>
    <circle cx="128" cy="157" r="8" fill="#efbd91"/>
    <path d="M75 118L78 173M80 150L99 152" fill="none" stroke="#b2ba82" stroke-width="3"/>
    <circle cx="91" cy="131" r="3" fill="#ebc775"/><circle cx="92" cy="143" r="3" fill="#ebc775"/>
    <path d="M61 55Q59 29 90 29Q115 29 120 55L125 76L133 83L124 89Q120 111 94 112Q69 110 62 82Z" fill="#f6cca0"/>
    <path d="M62 86Q52 72 54 54L41 56L52 43L44 39L62 32L55 25L77 23L72 12L97 20L109 10L115 25L137 27L125 38L141 45L121 52L112 44Q95 65 76 62L72 86Z" fill="#efbe54"/>
    <path d="M57 47Q78 48 96 32M72 53Q96 50 111 34" fill="none" stroke="#ffdd81" stroke-width="4" stroke-linecap="round"/>
    <circle cx="75" cy="79" r="9" fill="#f4bf92"/><circle cx="113" cy="72" r="3.5" fill="#382e36"/>
    <path d="M111 92Q116 96 122 91" fill="none" stroke="#925952" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="108" cy="84" rx="7" ry="3.5" fill="#e99d83"/>
    <g class="scarf"><path d="M81 111Q59 99 42 107Q23 117 9 106L12 122Q30 137 52 124L80 121Z" fill="#e6a43e"/></g>
    <path d="M70 102Q89 113 113 102L117 113Q97 129 69 116Z" fill="#efbb53"/> `;
  return flip ? mirror(art, 155) : art;
};

const pilot = (flip = false) => {
  const art = `
    <path d="M45 162L51 237H75L81 188L92 237H116L112 159Z" fill="#48545a"/>
    <path d="M50 229H76L76 246H42Q34 235 50 229ZM91 230H117L130 237V246H92Z" fill="#3e3437"/>
    <path d="M46 112Q75 93 112 112L121 174Q94 190 46 176L41 147L32 172L17 166Q28 126 46 112Z" fill="#955d46"/>
    <path d="M59 110L75 132L88 109L98 117L77 150L50 121Z" fill="#d5aa76"/>
    <path d="M75 142L76 180M90 155H107" fill="none" stroke="#513e40" stroke-width="3"/>
    <path d="M109 116Q120 117 130 143L142 163L129 172L110 154Z" fill="#b37351"/>
    <circle cx="135" cy="171" r="8" fill="#e8b58d"/>
    <path d="M50 48Q55 29 79 33Q105 33 110 60L111 72L123 80L112 85Q104 112 80 113Q52 105 49 83Z" fill="#e8b58d"/>
    <path d="M49 89Q32 63 43 43Q51 23 76 23Q100 23 108 42L116 51L103 59H67L64 88Z" fill="#685055"/>
    <path d="M48 53Q77 39 104 44" fill="none" stroke="#c29569" stroke-width="8"/>
    <ellipse cx="69" cy="46" rx="15" ry="11" fill="#3f3748"/><ellipse cx="69" cy="46" rx="10" ry="6" fill="#92a5a4"/>
    <circle cx="101" cy="70" r="3.7" fill="#3b3036"/>
    <path d="M98 94Q105 96 111 91" fill="none" stroke="#88504a" stroke-width="2.5"/>
    <circle cx="63" cy="80" r="8" fill="#dca582"/> `;
  return flip ? mirror(art, 155) : art;
};

const sheepDrawing = () => `
  <path d="M9 14L131 5L148 99L23 113Z" fill="#f2dfad"/>
  <path d="M37 44L103 36L121 51L51 61ZM37 44L51 61V88L38 71ZM51 61L121 51V79L51 88Z" fill="#c69863" stroke="#745646" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="68" cy="71" r="3" fill="#6c5143"/><circle cx="84" cy="69" r="3" fill="#6c5143"/><circle cx="101" cy="66" r="3" fill="#6c5143"/>`;

const asteroid = (shade, light, dark) => `
  <path d="M3 63Q14 20 99 10Q186-5 279 14Q356 25 377 59Q355 122 252 145Q154 174 71 137Q12 113 3 63Z" fill="${shade}"/>
  <path d="M3 63Q21 19 113 9Q226-7 316 25Q359 37 377 59Q326 87 239 87Q111 89 3 63Z" fill="${light}"/>
  <path d="M44 105Q67 99 87 113L106 131Q62 129 44 105ZM136 94Q157 90 180 108L178 129L151 122ZM285 100Q316 93 338 87Q320 108 278 120Z" fill="${dark}" opacity=".75"/>
  <ellipse cx="239" cy="55" rx="35" ry="9" fill="${shade}"/><ellipse cx="74" cy="49" rx="24" ry="7" fill="${shade}"/>
  <path d="M20 62Q150 100 357 65" fill="none" stroke="#f4dc9f" stroke-opacity=".35" stroke-width="3"/>`;

const volcano = () => `
  <path d="M2 105Q38 75 53 21Q73 9 107 21Q124 75 158 105Z" fill="#9d6259"/>
  <path d="M2 105Q37 83 53 21L72 27L61 72L76 105Z" fill="#c1856c"/>
  <ellipse cx="80" cy="22" rx="28" ry="9" fill="#59454f"/>
  <path d="M92 34L104 75L128 104H106L88 79L78 37Z" fill="#de9973"/>`;

const rose = () => `
  <path d="M84 312Q100 229 88 116" stroke="#50765a" stroke-width="12" fill="none"/>
  <path d="M92 261Q49 267 20 225Q70 215 92 253ZM91 227Q124 177 159 185Q161 226 91 236Z" fill="#709364"/>
  <path d="M36 229L89 258M92 232L146 194" stroke="#9cb577" stroke-width="4" fill="none"/>
  <path d="M87 126L65 91L91 102L112 90L102 122Z" fill="#688763"/>
  ${[
    ['M88 107Q25 107 19 64Q37 50 74 62Q56 37 66 19Q103 14 114 60L107 99Z', '#ba4961'],
    ['M88 105Q100 52 144 39Q170 66 146 91Q128 113 88 105Z', '#d86273'],
    ['M87 110Q42 99 38 61Q72 56 97 83Q107 62 137 61Q132 111 87 110Z', '#ed8190'],
    ['M72 71Q85 54 111 60Q118 77 92 95Q78 89 72 71Z', '#a73e57'],
    ['M81 84Q87 67 104 66Q120 86 94 102Z', '#f29a9c'],
  ].map(([d, color], i) => group('petal-' + i, pathShape(d, color))).join('')}`;

const foxArt = () => `
  <g class="tail"><path d="M150 131Q188 88 222 100Q245 108 270 87Q279 148 216 165Q184 168 150 154Z" fill="#a95542"/>
  <path d="M224 101Q251 103 270 87Q275 127 251 147Q237 137 232 117Z" fill="#f2d6aa"/></g>
  <path d="M69 143Q76 104 132 103Q188 96 202 138Q212 159 193 177H131Q98 181 69 172Z" fill="#d67e4d"/>
  <path d="M82 139Q92 156 128 162L127 178H78Q59 175 70 163Z" fill="#f2d6aa"/>
  <path d="M185 140Q204 155 196 177H161Q154 165 175 161Z" fill="#a95542"/>
  <g class="head">
  <path d="M53 116L42 40Q68 47 91 77L110 42Q124 63 119 101L119 129L89 153L22 131Z" fill="#d67e4d"/>
  <path d="M52 54L63 94L81 80ZM110 57L98 81L113 89Z" fill="#8f5050"/>
  <path d="M23 131L58 108Q67 116 90 117L119 114Q113 142 89 153Z" fill="#f5d8ab"/>
  <circle cx="24" cy="130" r="6" fill="#4a3841"/><path d="M62 106Q69 101 75 105" stroke="#503941" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>`;

const wheat = seed => {
  const random = rnd(seed);
  return Array.from({ length: 6 }, (_, i) => {
    const x = 13 + i * 18, tip = x + random() * 22 - 11, y = 17 + random() * 61;
    const husks = Array.from({ length: 4 }, (_, j) => {
      const row = y + j * 9;
      return pathShape(`M${tip} ${row + 8}q-13-3-13-13q10 0 13 9q5-9 13-10q1 10-13 14Z`, j % 2 ? '#cb904b' : '#e5b765');
    }).join('');
    return line(`M${x} 168Q${tip} 100 ${tip} ${y}`, '#ac784a', 4) + husks;
  }).join('');
};

const wellFace = () => `
  <path d="M9 31H271L253 113Q142 144 27 113Z" fill="#837986"/>
  <path d="M9 31H271L266 61Q139 91 14 61Z" fill="#b2a199"/>
  <ellipse cx="140" cy="32" rx="137" ry="30" fill="#d9bea0"/>
  <ellipse cx="140" cy="32" rx="106" ry="17" fill="#342f4d"/>
  <path d="M24 83Q134 110 256 83M77 74L83 101M194 78L188 102M134 101V127" stroke="#58566f" stroke-width="5" fill="none"/>`;

const wellFrame = () => `
  <path d="M18 264L27 53H47L43 264ZM239 264L231 53H253L260 264Z" fill="#846366"/>
  <path d="M9 52L55 12H232L272 52L260 72H19Z" fill="#624e65"/>
  <path d="M9 52L55 12H232L208 52Z" fill="#aa7e78"/>
  <path d="M36 101H250" stroke="#b28d77" stroke-width="13"/>
  <g class="pulley"><circle cx="141" cy="101" r="22" fill="#675361"/><circle cx="141" cy="101" r="14" fill="#a77f64"/><path d="M141 88V114M128 101H154" stroke="#e3c396" stroke-width="4"/></g>
  <path class="well-rope" d="M141 117V264" stroke="#dec398" stroke-width="4" fill="none"/>`;

const sceneColors = {
  cover: ['#101630', '#4e557b', '#353f66', '#202949'],
  dawn: ['#645475', '#eda680', '#b16e66', '#784f66'],
  rose: ['#252546', '#bb7480', '#745171', '#3c375a'],
  voyage: ['#171b40', '#65608c', '#424372', '#26274f'],
  field: ['#594b70', '#ebae7d', '#90626b', '#604c64'],
  well: ['#0c1530', '#39557b', '#2d3c61', '#1d294b'],
  farewell: ['#1b2245', '#916b87', '#565475', '#333c60'],
};

const princeScene = name => {
  const [top, bottom, far, near] = sceneColors[name];
  const random = rnd(150 + name.length * 41);
  const stars = Array.from({ length: 115 }, (_, i) => {
    const x = Math.round(random() * 1920), y = Math.round(random() * 650);
    const size = random() * 3;
    if (i % 13 === 0) return star(x, y, size + 3, '#ffe2a3');
    return circle(x, y, size * .64 + .35, '#f9dfbd', ` opacity="${(.3 + random() * .55).toFixed(2)}"`);
  }).join('');
  const horizon = (color, y) => pathShape(`M0 ${y}Q200 ${y - 100} 428 ${y - 62}T878 ${y + 33}T1312 ${y - 10}T1920 ${y - 54}V1080H0Z`, color);
  const daylight = name === 'dawn' || name === 'field' || name === 'rose';
  return {
    blur: 0,
    svg: `<defs><linearGradient id="sky-${name}" x2="0" y2="1"><stop stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
      <rect width="1920" height="1080" fill="url(#sky-${name})"/>
      <g opacity="${daylight ? '.35' : '.88'}">${stars}</g>
      ${daylight ? circle(name === 'field' || name === 'rose' ? 1550 : 355, name === 'rose' ? 450 : 550, 90, '#f4c489', ' opacity=".8"') : ''}
      ${horizon(far, 759)}${horizon(near, 905)}`,
  };
};

const pageGround = (base, accent, ink, seed) => {
  const random = rnd(seed);
  const specks = Array.from({ length: 220 }, () =>
    ellipse(30 + random() * 1380, 36 + random() * 848, 1 + random() * 3, 1.3, ink)).join('');
  const borders = [28, 744].map(x => `
    <rect x="${x}" y="26" width="668" height="868" rx="19" fill="none" stroke="${ink}" stroke-width="3"/>
    <rect x="${x + 9}" y="35" width="650" height="850" rx="14" fill="none" stroke="${ink}" stroke-width="1.5"/>
    ${star(x + 28, 60, 10, ink)}${star(x + 640, 860, 10, ink)}`).join('');
  return `
    <rect width="1440" height="920" fill="${base}"/>
    <path d="M0 484Q311 375 635 537T1440 450V920H0Z" fill="${accent}" opacity=".34"/>
    <path d="M0 684Q270 556 595 685T1440 611V920H0Z" fill="${accent}" opacity=".45"/>
    <g opacity=".28">${specks}</g><g opacity=".56">${borders}</g>`;
};

const princeCover = () => {
  const random = rnd(625);
  const scatter = Array.from({ length: 55 }, (_, i) => {
    const x = 95 + random() * 573, y = 90 + random() * 744;
    if (y > 160 && y < 440 && x > 115 && x < 647) return '';
    return i % 6 === 0 ? star(x, y, 9) : circle(x, y, 1.2 + random() * 1.8, '#e8c78b');
  }).join('');
  return `
    <defs><linearGradient id="prince-cover" x2="1" y2="1"><stop stop-color="#384261"/><stop offset="1" stop-color="#171d38"/></linearGradient></defs>
    <rect width="738" height="948" rx="14" fill="url(#prince-cover)"/>
    <path d="M0 0H41V948H0Z" fill="#202540"/>
    <path d="M43 0V948" stroke="#535575" stroke-width="3"/>
    <g fill="none" stroke="#dfbc77"><rect x="66" y="31" width="640" height="883" rx="19" stroke-width="4"/>
    <rect x="77" y="42" width="618" height="861" rx="14" stroke-width="1.4"/>
    <ellipse cx="386" cy="670" rx="244" ry="110" transform="rotate(-17 386 670)" opacity=".5"/></g>
    ${scatter}
    <g text-anchor="middle" fill="#f0d292" font-family='${princeFont}'>
    <text x="385" y="244" font-size="49" font-style="italic">Le Petit</text>
    <text x="385" y="369" font-size="126">Prince</text>
    </g>
    <path d="M223 428H548" stroke="#dfbc77" stroke-width="1.8"/>
    ${star(385, 428, 17)}
    ${at(193, 656, asteroid('#6d6584', '#a4889b', '#4c526f'))}
    ${at(313, 496, prince(), .87)}
    ${at(461, 580, rose(), .32)}
    ${star(518, 489, 19)}${star(236, 545, 12)}${star(385, 848, 13)}`;
};
