// 平塗りの SVG。ドット化はテーマ側で行う。
const chineseFont = '"Noto Serif CJK SC","Source Han Serif SC","Songti SC",SimSun,serif';

const staff = (x, y, color) => `
  <path d="M${x} ${y-111}v216" stroke="#4f2630" stroke-width="13" stroke-linecap="round"/>
  <path d="M${x} ${y-112}v27m0 165v26" stroke="${color}" stroke-width="15" stroke-linecap="round"/>`;

const fan = `
  <path d="M80 151Q100 83 133 35" fill="none" stroke="#4c2e35" stroke-width="9"/>
  <path d="M87 132C46 103 33 56 48 13C92 32 105 27 139 19C151 58 142 100 87 132Z" fill="#176958"/>
  <path d="M87 118C58 88 52 54 55 28C90 43 109 37 132 32C134 66 124 97 87 118Z" fill="#70c382"/>
  <path d="M87 117Q82 82 55 31M87 117Q94 70 128 35M87 117Q116 88 132 69" fill="none" stroke="#266c53" stroke-width="5"/>`;

A.wukong = ({ cub = false, weapon = 'staff', armR = -27 } = {}) => {
  const gold = '#ffd069';
  const tail = '<path d="M40 145C10 155 1 128 20 118C32 111 31 102 22 101" fill="none" stroke="#9e4832" stroke-width="12" stroke-linecap="round"/>';
  const face = `
    <circle cx="27" cy="61" r="13" fill="#a94e36"/><circle cx="93" cy="61" r="13" fill="#a94e36"/>
    <circle cx="28" cy="62" r="7" fill="#f1a969"/><circle cx="92" cy="62" r="7" fill="#f1a969"/>
    <path d="M32 65Q24 38 43 31L50 20L60 27L73 21L75 32Q96 38 88 66L84 76L76 81H43Z" fill="#a94e36"/>
    <path d="M35 65Q30 45 46 44Q56 44 60 51Q68 43 77 44Q91 48 85 66Q82 85 60 86Q38 85 35 65Z" fill="#ffd39c"/>
    ${cub ? '' : '<path d="M32 43Q60 29 88 43L85 50Q60 42 35 50Z" fill="#ffd766"/><path d="M49 44Q53 33 60 42Q67 33 71 44" fill="none" stroke="#b76d20" stroke-width="3"/>'}`;
  return tail + A.person({
    skin: '#ffd39c', top: cub ? '#cc6b3c' : '#f5b83e', bottom: '#8d323e',
    hair: face, mouth: cub ? 'big' : 'smile', armL: cub ? 145 : 21, armR,
    extra: '<path d="M36 151H85V163H65L60 185L51 163H34Z" fill="#b53442"/><circle cx="59" cy="156" r="7" fill="#ffe7a2"/>',
    holdR: weapon === 'fan' ? fan : weapon === 'staff' ? staff(80, 148, gold) : '',
  });
};

A.tang = (armR = -19) => A.person({
  top: '#a74743', bottom: '#ead19e', long: true, armR,
  hair: '<path d="M29 48L25 25L44 30L60 15L76 30L95 25L91 48Q60 40 29 48Z" fill="#9e3038"/><path d="M29 46Q60 34 91 46" fill="none" stroke="#f8cc6f" stroke-width="8"/><circle cx="60" cy="36" r="7" fill="#f8cc6f"/>',
  extra: '<path d="M35 96L49 90L87 129L90 208L63 214L47 143Z" fill="#c84242"/><path d="M43 94L89 143M60 126L53 158M71 144L63 186M82 160L74 207" stroke="#f6c464" stroke-width="6"/>',
  holdL: '<path d="M40 149v67m0-67V73m0 0c-22 0-22-41 0-41s22 41 0 41" stroke="#6c4732" stroke-width="7" fill="none"/><path d="M28 63h24" stroke="#f0ae48" stroke-width="5"/>',
});

A.bajie = () => A.person({
  skin: '#eba988', top: '#674f83', bottom: '#3d3a58', long: true, mouth: 'big', armR: -30,
  hair: '<path d="M34 48Q8 28 12 52Q13 70 33 65M87 48Q111 27 109 52Q107 70 87 65" fill="#dd8d7d"/><path d="M32 46Q35 17 60 21Q83 22 88 46Z" fill="#413951"/><path d="M31 45H89" stroke="#c8b6d7" stroke-width="7"/><ellipse cx="60" cy="70" rx="17" ry="11" fill="#d58177"/><path d="M53 69v4m14-4v4" stroke="#673d46" stroke-width="4" stroke-linecap="round"/>',
  extra: '<ellipse cx="60" cy="131" rx="26" ry="20" fill="#a988a1"/><path d="M32 154H88" stroke="#503953" stroke-width="10"/>',
  holdR: '<path d="M80 207V52m-23-17v20h46V35m-34 0v20m11-20v20m11-20v20" stroke="#4b3b49" stroke-width="6" fill="none" stroke-linecap="round"/>',
});

A.wujing = () => A.person({
  skin: '#bc775a', top: '#397c82', bottom: '#284c63', long: true, armR: -26,
  hair: '<path d="M30 48Q36 21 60 22Q84 21 90 48L83 56L78 41H42L37 56Z" fill="#332c3a"/><path d="M32 42Q60 36 88 42" stroke="#c95842" stroke-width="7"/><path d="M33 70Q46 92 60 78Q74 92 87 70Q83 86 61 99Q40 92 33 70Z" fill="#4a2c36"/>',
  extra: '<path d="M33 105Q60 159 87 105" stroke="#f0bc83" stroke-width="12" stroke-linecap="round" stroke-dasharray="1 14" fill="none"/><path d="M28 155H91" stroke="#b2694f" stroke-width="8"/>',
  holdR: '<path d="M80 210V63" stroke="#654331" stroke-width="8"/><path d="M58 34Q80 54 102 34Q98 69 80 69Q62 69 58 34Z" fill="#cbdcce"/>',
});

A.stoneShell = side => side < 0 ? `
  <path d="M7 145L19 71L63 25L131 7L115 43L134 67L108 96L130 145Z" fill="#555975"/>
  <path d="M19 71L63 25L131 7L115 43L70 61L43 113Z" fill="#8586a0"/>
  <path d="M7 145L43 113L108 96L130 145Z" fill="#424762"/>` : `
  <path d="M11 145L-11 96L15 67L-4 43L12 7L61 24L100 59L125 126L113 145Z" fill="#6f6d87"/>
  <path d="M15 67L-4 43L12 7L61 24L100 59L63 51Z" fill="#9591a7"/>
  <path d="M11 145L-11 96L46 112L125 126L113 145Z" fill="#4b4a66"/>`;

A.waterfall = () => `
  <path d="M14 376L23 129L62 61L72 22L184 8L229 66L264 172L276 376Z" fill="#426471"/>
  <path d="M14 376L23 129L62 61L98 72L82 218L50 376ZM168 37L229 66L264 172L276 376L217 376L203 111Z" fill="#67868a"/>
  <path d="M76 46Q132 33 192 43L180 128L188 262L226 377H54L79 241L82 105Z" fill="#6ed4dd"/>
  <path d="M100 52L126 46L112 259L92 363H65L91 236ZM153 44L168 43L158 248L178 364H152L137 245Z" fill="#c9f7e7"/>
  <g class="foam" fill="#eff9dc"><ellipse cx="96" cy="368" rx="50" ry="11"/><ellipse cx="176" cy="373" rx="68" ry="9"/><ellipse cx="143" cy="354" rx="56" ry="7"/></g>`;

A.peaks = (w, h, color, seed) => {
  const random = rnd(seed);
  const ridge = [`M8 ${h}`];
  for (let i = 0; i <= 16; i++) {
    ridge.push(`L${F(8 + i * (w-16)/16)} ${F(h * (.09 + random() * .60))}`);
  }
  return `<path d="${ridge.join(' ')}L${w-8} ${h}Z" fill="${color}"/>`;
};

const landscapes = {
  cover: ['#25264e','#f4ae87','#ffdc99','#b37d93','#5f617e','#30395c'],
  birth: ['#435f87','#f7c99a','#ffe6ae','#93b5ab','#507f81','#274d63'],
  valley: ['#484e7a','#f4a57b','#ffe2a0','#ba8a94','#725e79','#403b60'],
  river: ['#355776','#d7e2b1','#fff0b0','#8caab2','#437e82','#274e59'],
  fire: ['#341d3e','#d45543','#ffa052','#9a4551','#642d42','#371f35'],
  wind: ['#37233f','#e3825d','#ffd276','#a9575f','#71394a','#412739'],
  temple: ['#615985','#ffd796','#fff1bd','#d79a81','#957888','#51466b'],
};

A.journeyScene = (id, seed) => {
  const [sky, horizon, sun, far, middle, near] = landscapes[id];
  const fire = id === 'fire' || id === 'wind';
  const stems = Array.from({ length: 8 }, (_, i) => {
    const random = rnd(seed + i * 3);
    const x = i < 4 ? i * 46 : 1920 - (i-4) * 46;
    const h = 160 + random() * 220;
    return `<path d="M${x-26} 1080l23 -${h}l44 ${h}Z" fill="${near}" opacity=".72"/>`;
  }).join('');
  const mist = Array.from({ length: 8 }, (_, i) => {
    const x = -60 + (i * 571) % 2030;
    const y = 485 + (i * 123) % 535;
    return `<path d="M${x} ${y}h300q-61 23-162 23h-210q22-20 72-23Z" fill="${horizon}" opacity=".29"/>`;
  }).join('');
  const clouds = id === 'cover' || id === 'temple' ? `
    <path d="M-120 717Q36 639 180 682Q240 643 323 666Q409 651 483 704Q594 711 649 745H-120Z" fill="${horizon}" opacity=".66"/>
    <path d="M1260 827Q1332 774 1430 780Q1520 714 1640 764Q1768 711 1868 779L2020 784V881H1190Z" fill="${sun}" opacity=".53"/>
    <path d="M-100 915Q83 850 199 876Q280 814 391 866Q494 859 553 913L660 953H-100Z" fill="${sun}" opacity=".52"/>` : '';
  const river = id === 'river' ? `
    <path d="M1920 819Q1696 813 1533 861Q1410 902 1442 928Q1490 974 1920 971Z" fill="#679c9c"/>
    <path d="M1920 876Q1720 873 1597 908M1920 929Q1750 941 1690 924" stroke="#b1d7bb" stroke-width="9" fill="none"/>` : '';
  const sparks = Array.from({ length: 24 }, (_, i) =>
    `<circle cx="${37 + i*347 % 1830}" cy="${330 + i*127 % 760}" r="${3 + i%6}" fill="${sun}" opacity="${.25 + (i%5)*.1}"/>`).join('');
  return {
    blur: 2, shadow: .42,
    svg: `
      <defs><linearGradient id="sky-${id}" x2="0" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="${horizon}"/></linearGradient></defs>
      <rect width="1920" height="1080" fill="url(#sky-${id})"/>
      <circle cx="1470" cy="278" r="112" fill="${sun}" opacity=".9"/>
      <g transform="translate(-36 315)">${A.peaks(1992,490,far,seed)}</g>
      <g transform="translate(-36 475)">${A.peaks(1992,490,middle,seed+17)}</g>
      <g transform="translate(-36 662)">${A.peaks(1992,450,near,seed+31)}</g>
      <g class="weather">${fire ? sparks : mist + clouds + river}</g>
      ${stems}`,
    anim: (t, el, q) => qs(el, q, '.weather').setAttribute('transform',
      fire ? `translate(${F(24 * sin(t*.8))} ${F(-32+24*cos(t*.46))})` : `translate(${F(56*sin(t*.19))} 0)`),
  };
};

A.journeyGround = (soil, edge, road, kind = 'road') => {
  const random = rnd(30);
  const chips = Array.from({ length: 112 }, () => {
    const x = F(12 + random()*1400), y = F(30 + random()*850);
    return `<path d="M${x} ${y}h${F(8+random()*29)}l-7 8h-17Z" fill="${edge}" opacity=".38"/>`;
  }).join('');
  const channel = kind === 'river'
    ? '<path d="M0 465Q430 502 630 398T1440 346V680Q1144 557 760 644Q422 772 0 752Z" fill="#4a9eae"/><path d="M0 541Q420 591 690 488T1440 429M0 673Q390 714 742 567T1440 552" stroke="#9ed9cf" stroke-width="13" fill="none"/>'
    : '';
  return `<rect width="1440" height="920" fill="${soil}"/>
    <path d="M0 0H1440V340Q1050 270 716 359T0 412Z" fill="${edge}"/>
    ${chips}${channel}
    <path d="M665 0H762C627 234 926 282 905 500S1054 786 1238 920H944C802 818 695 730 744 552S558 243 665 0Z" fill="${road}" opacity="${kind === 'river' ? '.62' : '1'}"/>`;
};

A.cover = () => `
  <rect width="738" height="948" fill="#182342"/>
  <rect x="36" width="702" height="948" fill="#263960"/>
  <rect x="57" y="27" width="651" height="894" rx="15" fill="#253456" stroke="#d9ad69" stroke-width="5"/>
  <rect x="76" y="46" width="613" height="856" rx="9" fill="none" stroke="#97816f" stroke-width="2"/>
  <circle cx="382" cy="540" r="222" fill="#493d63" stroke="#e5b56c" stroke-width="7"/>
  <circle cx="383" cy="516" r="173" fill="#e89669"/>
  <g transform="translate(168 530)">${A.peaks(430,185,'#4b536e',12)}</g>
  <path d="M175 678Q261 628 336 658Q361 622 416 653Q500 605 570 671Q500 710 382 712Q236 727 175 678Z" fill="#d8ded0"/>
  <g transform="translate(245 363) scale(2.04 1.43)">${A.wukong({ armR: -58 })}</g>
  <text x="382" y="232" text-anchor="middle" font-family='${chineseFont}' font-size="143" font-weight="900" letter-spacing="11" fill="#ffda83">西游记</text>
  <path d="M166 275H598M168 795H594" stroke="#cfa36c" stroke-width="3"/>
  <text x="382" y="846" text-anchor="middle" font-family='${chineseFont}' font-size="31" font-weight="700" letter-spacing="7" fill="#fad6a4">立体故事书</text>
  <path d="M110 102l17-17 17 17-17 17Zm510 0l17-17 17 17-17 17ZM110 855l17-17 17 17-17 17Zm510 0l17-17 17 17-17 17Z" fill="#e7b76f"/>`;

A.flameWall = (width, height, seed) => {
  const random = rnd(seed);
  const tongues = Array.from({ length: 6 }, (_, i) => {
    const x = 6 + i * (width-12)/6;
    const w = (width-12)/6 + 8;
    const y = 8 + random() * height*.45;
    const span = height-y;
    return `<path d="M${x} ${height}Q${x-8} ${y+span*.62} ${x+w*.42} ${y+span*.41}Q${x+w*.72} ${y+span*.24} ${x+w*.55} ${y}Q${x+w*1.11} ${y+span*.55} ${x+w-7} ${height}Z" fill="${i%2 ? '#f27642' : '#e34f36'}"/>
      <path d="M${x+w*.18} ${height}Q${x+w*.12} ${y+span*.76} ${x+w*.64} ${y+span*.43}Q${x+w*.83} ${y+span*.72} ${x+w*.73} ${height}Z" fill="#ffc360"/>
      <path d="M${x+w*.42} ${height}Q${x+w*.38} ${y+span*.76} ${x+w*.62} ${y+span*.67}L${x+w*.64} ${height}Z" fill="#fff0b3"/>`;
  }).join('');
  return `<g class="tongues">${tongues}</g>`;
};

A.gust = () => `
  <path d="M9 99Q101 43 232 56Q287 61 290 32Q291 6 252 11Q237 14 236 27Q249 15 268 22Q287 42 233 43Q110 35 9 99Z" fill="#f2f1ce"/>
  <path d="M10 121Q107 75 232 90Q263 98 257 121Q249 139 226 129Q241 130 244 115Q247 102 217 102Q118 88 10 121Z" fill="#b4dfce"/>
  <path d="M92 131Q172 113 216 133L180 140Q173 131 92 131Z" fill="#f7e6b8"/>`;

A.templeSteps = (w, h) => `
  <rect width="${w}" height="${h}" fill="#ac796e"/>
  <path d="M0 7H${w}M0 ${h-12}H${w}" stroke="#edd0a4" stroke-width="9"/>
  <path d="M${w*.25} 11V${h-16}m${w*.25} ${16-h}V${h-16}m${w*.25} ${16-h}V${h-16}" stroke="#c8947c" stroke-width="5"/>`;

const sweepingRoof = (w, y, color) => `
  <path d="M5 ${y+84}Q${w*.18} ${y+84} ${w*.25} ${y+39}L${w*.34} ${y+25}
    Q${w*.5} ${y+17} ${w*.5} ${y+5}Q${w*.5} ${y+17} ${w*.66} ${y+25}
    L${w*.75} ${y+39}Q${w*.82} ${y+84} ${w-5} ${y+84}
    L${w*.88} ${y+103}H${w*.12}Z" fill="${color}"/>
  <path d="M${w*.13} ${y+92}Q${w*.50} ${y+74} ${w*.87} ${y+92}" stroke="#efbf67" stroke-width="6" fill="none"/>`;

A.templeGate = (w, h) => `
  <path d="M${w*.13} ${h}V93H${w*.87}V${h}H${w*.67}V${h-77}Q${w*.5} ${h-153} ${w*.33} ${h-77}V${h}Z" fill="#a54846"/>
  <path d="M${w*.2} 100V${h}M${w*.8} 100V${h}" stroke="#e6a469" stroke-width="9"/>
  ${sweepingRoof(w, 1, '#24565c')}`;

A.templeHall = (w, h) => `
  <path d="M${w*.12} ${h}V173H${w*.88}V${h}Z" fill="#bf7754"/>
  <path d="M${w*.33} ${h}V221H${w*.67}V${h}Z" fill="#6b3a48"/>
  <path d="M${w*.17} 196V${h}M${w*.82} 196V${h}" stroke="#f2b972" stroke-width="13"/>
  ${sweepingRoof(w, 90, '#357271')}
  <path d="M${w*.29} 143V86H${w*.71}V143Z" fill="#aa654a"/>
  <path d="M${w*.44} 91H${w*.56}V137H${w*.44}Z" fill="#f9d58f"/>
  <g transform="translate(${w*.14} 0)">${sweepingRoof(w*.72, 0, '#336265')}</g>`;

A.scriptures = () => `
  <path d="M4 53L40 18L117 21L117 55L79 88H4Z" fill="#773f48"/>
  <path d="M7 56H80L114 26V51L79 82H7Z" fill="#f7dba3"/>
  <path d="M5 49L41 14L118 17L82 55Z" fill="#cc624f"/>
  <path d="M52 30L76 31L65 43L40 42Z" fill="#ffd98b"/>
  <path d="M21 65H72M21 73H72" stroke="#ae825c" stroke-width="3"/>`;
