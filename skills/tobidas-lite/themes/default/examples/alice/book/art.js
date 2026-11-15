// 『不思議な国のアリス』の切り紙。座標は各パーツの左上を原点とする。
const ink = '#263044';
const gold = '#e8bd70';
const cream = '#fff0cf';
const red = '#b84152';
const heart = (x, y, s, color = red) => `<path fill="${color}" transform="translate(${x} ${y}) scale(${s / 100})" d="M0 47C-12 30-51 5-49-22C-47-47-16-52 0-28C16-52 47-47 49-22C51 5 12 30 0 47Z"/>`;
const repeats = (count, draw) => Array.from({ length: count }, (_, i) => draw(i)).join('');

A.alice = (options = {}) => A.person({
  top: '#4b96bc', bottom: '#4b96bc', long: true,
  hair: `<path d="M26 79C19 37 34 24 59 24S103 39 94 79L89 108L69 100L79 64Q56 61 46 45Q36 55 36 76L48 99L30 109Z" fill="#dca351"/>
  <path d="M32 46Q57 21 88 42" fill="none" stroke="#213e58" stroke-width="6"/>
  <path d="M66 30L57 18L74 20L88 16L83 33Z" fill="#213e58"/>`,
  extra: `<path d="M49 96L70 96L77 130Q96 155 96 197Q59 214 24 197Q29 158 43 130Z" fill="#fff4db"/>
  <path d="M39 132Q59 140 81 131M44 166L40 189M76 164L81 190" stroke="#d5dce0" stroke-width="4" fill="none"/>
  <path d="M52 100L60 106L68 100" stroke="#7eabc0" stroke-width="4" fill="none"/>`,
  ...options,
});

A.watch = () => `<circle cx="48" cy="12" r="9" fill="none" stroke="${gold}" stroke-width="6"/>
  <circle cx="48" cy="57" r="42" fill="#af783f"/><circle cx="48" cy="53" r="37" fill="${gold}"/>
  <circle cx="48" cy="53" r="28" fill="${cream}"/>
  ${repeats(12, i => `<path d="M48 29V35" stroke="#916046" stroke-width="3" transform="rotate(${i * 30} 48 53)"/>`)}
  <path d="M48 36V53L61 62" fill="none" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>`;

A.rabbit = (hare = false) => {
  const fur = hare ? '#d9aa7c' : '#fff7e5';
  const coat = hare ? '#616f93' : '#bd4552';
  const lapel = hare ? '#9296b2' : '#e17571';
  return `<ellipse cx="37" cy="167" rx="25" ry="19" fill="#ede4d1"/>
  <ellipse cx="73" cy="211" rx="30" ry="9" fill="#e1d6c2"/><ellipse cx="124" cy="209" rx="35" ry="11" fill="${fur}"/>
  <path d="M60 120Q98 103 129 126L144 192Q91 218 49 191Z" fill="${coat}"/>
  <path d="M85 128L110 125L115 194L81 195Z" fill="${gold}"/>
  <path d="M79 129L84 188L54 166L61 133ZM113 128L128 131L136 159L117 181Z" fill="${lapel}"/>
  <ellipse cx="80" cy="45" rx="15" ry="45" transform="rotate(-15 80 45)" fill="${fur}"/>
  <ellipse cx="117" cy="43" rx="13" ry="43" transform="rotate(11 117 43)" fill="${fur}"/>
  <path d="M76 18L88 68M121 17L112 64" stroke="#e69a9a" stroke-width="9" stroke-linecap="round"/>
  <path d="M62 90Q69 64 100 66Q130 66 140 92L157 109Q145 137 108 139Q66 136 62 111Z" fill="${fur}"/>
  <ellipse cx="119" cy="96" rx="6" ry="8" fill="${ink}"/><circle cx="150" cy="106" r="7" fill="#d77983"/>
  <path d="M135 120q-8 7-17 1" fill="none" stroke="#ad6a67" stroke-width="3"/>
  <path d="M87 136L112 148L120 133L103 136L90 127Z" fill="#425970"/>
  <path d="M124 151Q146 143 161 153" stroke="#f6ebd8" stroke-width="15" stroke-linecap="round"/>
  ${hare ? '<path d="M90 68L98 49L103 66L111 51L116 71Z" fill="#e6be87"/>' : `<g transform="translate(137 146) scale(.42)">${A.watch()}</g>`}`;
};

A.door = (color, open = false) => `<path d="M0 300V96C0-30 180-30 180 96V300Z" fill="#50445a"/>
  <path d="M14 286V100C14-12 166-12 166 100V286Z" fill="${open ? '#f7d982' : color}"/>
  <path d="M27 269V104C27 7 153 7 153 104V269Z" fill="none" stroke="${open ? '#fff0b0' : gold}" stroke-width="5"/>
  ${open ? '<path d="M27 269V104Q27 40 85 38L62 238Z" fill="#4a857d"/><path d="M62 238L135 269H27Z" fill="#af8865"/>' : '<circle cx="130" cy="172" r="9" fill="#edc681"/><path d="M53 222H110M55 100H125" stroke="#fff0cf" stroke-opacity=".5" stroke-width="4"/>'}
  <path d="M0 288H180V300H0Z" fill="#d4ab81"/>`;

A.bottle = label => `<rect x="31" y="0" width="38" height="27" rx="5" fill="#a06b50"/>
  <path d="M30 21H70V62Q96 82 96 107V142Q96 155 82 155H18Q4 155 4 142V107Q4 82 30 62Z" fill="#73b9ae"/>
  <path d="M14 112Q46 124 87 105V139Q87 146 78 146H21Q14 146 14 139Z" fill="#458681"/>
  <path d="M39 31V67L23 89" fill="none" stroke="#dbf2d9" stroke-width="7" stroke-linecap="round"/>
  <rect x="9" y="86" width="82" height="40" rx="5" fill="${cream}"/>
  <text x="50" y="113" text-anchor="middle" font-size="18" font-weight="bold" fill="${ink}">${label}</text>`;

A.key = () => `<circle cx="29" cy="30" r="21" stroke="${gold}" stroke-width="12" fill="none"/>
  <path d="M47 30H118M92 30V51M109 30V46" stroke="${gold}" stroke-width="12" stroke-linecap="round"/>`;
A.cake = () => `<path d="M6 21H124L114 74H16Z" fill="#ad684c"/>
  <path d="M6 29H124L119 45Q109 58 99 44Q88 35 76 47Q63 56 52 45Q39 34 28 47Q12 54 6 41Z" fill="#eb9eae"/>
  <ellipse cx="65" cy="22" rx="61" ry="19" fill="#f7c0bc"/>${heart(66, 23, 29)}`;

A.mushroom = (color, dot) => `<path d="M102 84Q127 133 88 229Q116 242 170 231Q142 176 160 84Z" fill="#e3c29c"/>
  <path d="M126 106Q144 161 127 227" stroke="#f8deba" stroke-width="11" fill="none"/>
  <path d="M5 97Q36 7 112 6Q201-5 245 96Q171 146 5 97Z" fill="${color}"/>
  <path d="M7 97Q139 116 242 96Q175 143 7 97Z" fill="#70455e"/>
  <ellipse cx="108" cy="44" rx="24" ry="13" fill="${dot}"/>
  <ellipse cx="166" cy="62" rx="20" ry="10" fill="${dot}"/><ellipse cx="62" cy="72" rx="18" ry="9" fill="${dot}"/>`;

A.grin = () => `<path d="M7 20Q111 79 213 20Q175 119 109 120Q45 119 7 20Z" fill="#603452"/>
  <path d="M16 29Q111 79 204 29Q166 100 109 100Q54 98 16 29Z" fill="#fff1d5"/>
  <path d="M56 47L50 77M90 59L87 96M127 59L132 97M164 47L171 77" stroke="#d4a6a5" stroke-width="4"/>`;
A.cat = () => `<path d="M206 188Q318 204 301 123Q295 91 271 106" fill="none" stroke="#824b83" stroke-width="31" stroke-linecap="round"/>
  <path d="M278 188L263 168M298 161L275 156M299 129L279 139" stroke="#d183a4" stroke-width="10"/>
  <ellipse cx="162" cy="168" rx="97" ry="49" fill="#975992"/>
  <path d="M143 146Q121 174 152 207M184 139Q158 179 192 210M220 145Q200 177 228 200" stroke="#c975a0" stroke-width="13" fill="none"/>
  <path d="M17 88L12 7L82 46Q114 33 146 45L206 7L204 87Q229 137 183 155Q112 180 44 151Q3 135 17 88Z" fill="#a75e9d"/>
  <path d="M27 31L34 66L66 51ZM190 30L158 50L188 68Z" fill="#efa6b0"/>
  <path d="M48 83Q72 63 92 87Q71 108 48 83ZM128 87Q150 63 176 83Q150 108 128 87Z" fill="#f8d187"/>
  <path d="M71 77V90M151 77V90" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>
  <path d="M98 96H122L110 108Z" fill="#70405f"/>`;

A.hatter = () => A.person({
  top: '#537c68', bottom: '#795471', armR: -65, mouth: 'big',
  hair: `<path d="M30 61Q25 31 47 27H75Q97 31 94 66L82 54L77 43L38 47Z" fill="#d57f4d"/>
  <path d="M28 36L16 -38Q57 -56 103 -38L92 36Z" fill="#426d61"/>
  <path d="M27 12Q60 19 94 9L93 30Q61 42 29 30Z" fill="#ddb26b"/>
  <path d="M68 16L87 13L86 -12L66 -8Z" fill="${cream}"/>
  <text x="77" y="8" font-size="8" text-anchor="middle" fill="${ink}">10/6</text>
  <ellipse cx="60" cy="36" rx="58" ry="9" fill="#35534b"/>`,
  extra: '<path d="M38 92L60 100L85 90L80 114L60 106L43 115Z" fill="#d18993"/>',
});

A.teapot = () => `<path d="M115 42Q166 20 157 58Q153 82 120 82" fill="none" stroke="#447d82" stroke-width="11"/>
  <path d="M37 55Q13 49 5 20L27 29L53 54Z" fill="#60999a"/>
  <path d="M37 44Q82 24 128 44Q150 102 80 108Q24 108 37 44Z" fill="#81b5ae"/>
  <path d="M39 44Q85 23 126 44Q91 56 39 44Z" fill="#447d82"/><circle cx="83" cy="30" r="9" fill="${gold}"/>
  <path d="M42 80Q85 99 124 77" stroke="${cream}" fill="none" stroke-width="6"/>`;
A.cup = color => `<path d="M67 18Q101 9 94 31Q90 46 69 43" stroke="${color}" fill="none" stroke-width="8"/>
  <ellipse cx="47" cy="56" rx="46" ry="8" fill="#e6c895"/>
  <path d="M10 12H80Q79 54 48 54Q15 54 10 12Z" fill="${color}"/>
  <ellipse cx="45" cy="12" rx="35" ry="10" fill="${cream}"/><ellipse cx="45" cy="13" rx="26" ry="5" fill="#986445"/>`;

A.queen = () => A.person({
  top: '#a53349', bottom: '#962b42', long: true, mouth: 'o', armR: -103,
  hair: `<path d="M30 60Q16 22 46 24L60 36Q79 13 90 31Q101 42 88 62Q80 49 60 43Q44 54 30 60Z" fill="${ink}"/>
  <path d="M38 32L32 3L52 16L61 -6L70 16L88 3L82 32Z" fill="${gold}"/>`,
  extra: `<path d="M37 92L31 72L60 91L89 72L83 92L69 109L90 201H30L52 109Z" fill="${cream}"/>${heart(60, 149, 27)}${heart(60, 178, 24)}`,
});

A.card = (suit, guard = false) => `<rect x="5" y="4" width="90" height="126" rx="8" fill="${cream}" stroke="#c59b7b" stroke-width="4"/>
  <rect x="13" y="12" width="74" height="110" rx="4" fill="none" stroke="#dabb98" stroke-width="2"/>
  ${suit === 'heart' ? heart(50, 72, 43) : `<path d="M50 45L73 73L50 101L27 73Z" fill="${suit === 'diamond' ? red : ink}"/>`}
  ${guard ? '<circle cx="40" cy="34" r="4" fill="#263044"/><circle cx="60" cy="34" r="4" fill="#263044"/><path d="M22 129L14 144H34L40 129M60 129L66 144H86L78 129" fill="#614254"/>' : ''}`;

A.rose = (color, h = 220) => `<path d="M50 ${h}Q29 ${h / 2} 51 47" stroke="#51795f" stroke-width="10" fill="none"/>
  <path d="M45 ${h * .68}Q9 ${h * .48} 3 ${h * .65}Q9 ${h * .77} 45 ${h * .68}ZM43 ${h * .83}Q76 ${h * .6} 96 ${h * .71}Q85 ${h * .87} 43 ${h * .83}Z" fill="#719475"/>
  <path d="M11 31Q7 14 29 13Q42-8 58 7Q79 0 88 19Q104 34 86 50Q74 70 54 63Q32 73 17 54Q3 46 11 31Z" fill="${color}"/>
  <path d="M27 36Q50 12 71 27Q77 43 55 49Q43 49 43 39Q44 32 56 34" stroke="#d98c92" stroke-width="5" fill="none" stroke-linecap="round"/>`;

A.coverAlice = () => `
  <rect width="738" height="948" fill="#203d45"/><path d="M38 0H0V948H38Z" fill="#192c38"/>
  <rect x="64" y="30" width="647" height="888" rx="14" fill="none" stroke="${gold}" stroke-width="4"/>
  <rect x="76" y="42" width="623" height="864" rx="10" fill="none" stroke="#8b825d" stroke-width="2"/>
  <path d="M103 825Q163 680 118 545M664 825Q604 680 649 545" fill="none" stroke="#6f9b83" stroke-width="5"/>
  ${[0, 1].map(side => `<g transform="${side ? 'translate(767) scale(-1 1)' : ''}">${repeats(7, i => `<path d="M${118 + i * 3} ${588 + i * 32}q-44-6-37-39q31 6 37 39M${118 + i * 3} ${588 + i * 32}q44-15 39-42q-28 10-39 42" fill="${i % 2 ? '#6f9b83' : '#41716b'}"/>`)}</g>`).join('')}
  <text x="384" y="169" text-anchor="middle" fill="${cream}" font-family="serif" font-weight="bold" font-size="63" letter-spacing="5">不思議な国の</text>
  <text x="384" y="280" text-anchor="middle" fill="${gold}" font-family="serif" font-weight="bold" font-size="108" letter-spacing="12">アリス</text>
  <path d="M256 331H345M423 331H512" stroke="#ab9163" stroke-width="2"/>${heart(384, 330, 25, gold)}
  <path d="M217 781V537C217 330 551 330 551 537V781Z" fill="#162934" stroke="${gold}" stroke-width="5"/>
  <path d="M232 764V537C232 351 536 351 536 537V764Z" fill="#527b76" stroke="#9cb59a" stroke-width="3"/>
  <circle cx="386" cy="549" r="109" fill="#729a89"/>
  ${[[276,499,14],[473,477,15],[469,618,12],[305,607,9],[382,430,13]].map(([x,y,r]) => A.star(x,y,r,gold)).join('')}
  <g transform="translate(284 466) scale(1.2)">${A.alice({ armL: 30, look: 'up' })}</g>
  <g transform="translate(386 582) scale(.74)">${A.rabbit()}</g>
  <g transform="translate(155 738) rotate(-21) scale(.82)">${A.card('heart')}</g>
  <g transform="translate(537 712) rotate(16) scale(.76)">${A.watch()}</g>
  <text x="384" y="849" text-anchor="middle" fill="${cream}" font-family="serif" font-size="24" letter-spacing="4">ルイス・キャロル 原作</text>`;
