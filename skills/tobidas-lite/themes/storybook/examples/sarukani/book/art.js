// 『さるかに がっせん』の原画。各パーツの足元を絵の下端にそろえる。
const sumi = '#382f31';
const ivory = '#fff1cb';
const {p: shape, l: line, c: circle, e: oval, r: box, at: place} = DRAW;
const row = (count, draw) => Array.from({length: count}, (_, i) => draw(i)).join('');
const mirror = (width, art) => `<g transform="translate(${width} 0) scale(-1 1)">${art}</g>`;
const eye = (x, y, bias = 0) => circle(x, y, 9, ivory) + oval(x + bias, y + 1, 4.8, 6.1, sumi) + circle(x + bias - 1.2, y - 1.7, 1.3, '#fff8dc');

// はさみと脚を一枚ずつ折り、顔は中央に残す。子がには小さな黄色の柄。
A.kani = ({child = false, hurt = false, bandage = hurt, flip = false} = {}) => {
  const shell = child ? '#f49847' : '#df5d3e';
  const shadow = child ? '#ba5a38' : '#a84239';
  const tip = child ? '#ffbc67' : '#f18a54';
  const leg = shape('M74 113 Q50 109 32 121 L20 141 Q15 145 14 138 L20 117 Q23 111 29 108 L66 94Z', shadow)
    + shape('M67 124 Q46 127 37 137 L31 156 Q26 164 25 154 L26 134 Q27 128 33 125 L62 111Z', shell)
    + shape('M85 136 Q65 143 57 156 L55 169 Q53 175 50 169 L47 154 Q46 148 51 143 L72 123Z', shadow);
  const claw = shape('M78 110 Q58 114 48 91 L37 74 L50 67 Q64 91 84 91Z', shadow)
    + shape('M45 85 C18 89 7 63 15 39 Q17 32 21 35 L32 57 Q36 60 39 55 L48 29 Q50 22 54 28 C69 48 71 70 55 83Z', shell)
    + shape('M17 44 Q19 31 21 36 L32 57 L28 64 Q21 61 17 44Z', tip)
    + shape('M44 48 L48 30 Q51 23 54 28 Q62 40 61 50 L54 63Z', tip);
  const detail = child ? circle(110,134,4,'#fff0af') + circle(123,137,3,'#fff0af') : line('M79 126 Q113 153 153 129', '#f3a16e', 4);
  const neckerchief = shape('M69 139 Q112 157 158 137 Q148 150 131 155 L122 166 L116 157 Q86 157 69 139Z', child ? '#edb846' : '#28625d')
    + shape('M140 152 L163 159 L155 147 L165 139Z', child ? '#ffe29a' : '#408478');
  const body = leg + mirror(228,leg) + `<g class="pinchL">${claw}</g>` + `<g class="pinchR">${mirror(228,claw)}</g>`
    + line('M89 87 L87 57 M137 86 L142 54',shadow,13)
    + circle(87,55,13,shadow) + circle(142,53,13,shadow)
    + eye(87,54,2.5) + eye(142,52,2.5)
    + shape('M57 100 Q62 79 90 78 L101 72 L116 78 L131 72 L143 77 Q163 80 175 98 L181 111 L176 131 Q155 148 114 151 Q78 151 57 134 Q49 127 49 115Z',shadow)
    + shape('M54 103 Q61 87 85 83 Q115 74 145 82 Q170 85 176 104 L173 122 Q153 139 115 140 Q79 142 55 125Z',shell)
    + oval(77,107,9,4,tip) + oval(152,107,9,4,tip)
    + (hurt ? line('M100 122 Q112 106 125 119',sumi,4.5) : line('M100 114 Q111 128 125 113',sumi,4.5))
    + detail + neckerchief
    + (bandage ? shape('M65 91 L99 78 L106 92 L72 105Z',ivory) + line('M78 90 l6 10 M89 85 l6 10','#c9bda1',2.8) : '');
  return flip ? mirror(228, body) : body;
};

// さるは短い尾のニホンザル。藍の半纏とからし色の帯で全場面を通す。
A.saru = ({face = 'smile', flip = false} = {}) => {
  const fur = '#a7613f', dark = '#794b3c', skin = '#f3a183', amber = '#e5b263';
  const openEyes = oval(83,80,4.4,6.4,sumi) + oval(119,75,5,7,sumi);
  const smile = openEyes + line('M73 70 Q82 66 90 69 M109 64 Q118 60 126 63',dark,4)
    + line('M88 110 Q105 129 122 106',sumi,4);
  const reaction = face === 'oops'
    ? openEyes + line('M72 65 Q79 58 88 63 M108 59 Q118 52 127 59',dark,4) + oval(103,113,8,10,'#713f39')
    : line('M73 82 Q80 88 86 81 M110 77 Q119 83 128 75',sumi,4.3) + line('M95 116 Q104 119 113 112',sumi,4);
  const expression = face === 'smile' ? smile : '<g class="mSmile">'+smile+'</g><g class="mExpression" opacity="0">'+reaction+'</g>';
  const sleeve = shape('M83 161 Q71 154 59 163 L27 186 L41 205 Q64 200 87 183Z','#356867')
    + shape('M28 182 L44 197 L38 205 L23 189Z','#8bafa0')
    + shape('M31 195 Q24 203 15 198 Q7 194 8 187 Q11 183 15 187 L20 189 Q14 178 19 178 Q23 178 31 185 L38 189Z',skin);
  const head = shape('M71 61 Q72 35 91 25 L87 14 L105 24 Q120 13 138 22 L152 15 L153 26 Q179 31 185 55 Q193 86 174 111 L150 127 Q138 148 117 146 Q86 146 72 122 Q53 101 60 79Z',fur)
    + shape('M149 104 Q164 99 172 104 Q188 106 196 91 Q204 71 190 62 Q177 53 166 64Z',dark)
    + oval(179,79,12,14,'#e69a76')
    + shape('M75 60 Q91 45 104 57 Q116 40 135 51 Q150 59 153 73 Q156 83 149 96 Q160 101 154 117 Q148 136 121 139 Q98 141 81 129 L65 125 Q51 121 52 108 Q53 98 64 92 Q59 74 75 60Z',skin)
    + oval(80,101,12,7,'#e58268') + oval(138,97,11,7,'#e58268')
    + shape('M96 89 Q102 84 108 89 L105 95 L99 95Z','#9f584b') + expression;
  const body = shape('M153 209 Q174 197 179 207 Q188 223 166 232 L148 232Z',dark)
    + shape('M87 226 L115 231 L110 260 Q105 271 83 270 L56 269 Q47 266 55 259 L76 249Z',dark)
    + shape('M128 225 L157 222 L162 253 L171 262 Q176 271 165 271 L139 271 Q127 270 129 259Z',fur)
    + shape('M74 201 Q115 193 154 202 L164 232 L128 241 L114 227 L106 243 L72 234Z','#455363')
    + shape('M88 135 Q108 127 140 136 Q155 143 160 170 L161 196 L173 212 Q128 226 63 218 L74 177 Q71 147 88 135Z','#286361')
    + shape('M95 137 L112 151 L128 133 L137 138 L112 169 L86 141Z','#9abb9e')
    + line('M112 166 L103 207','#80a898',4)
    + shape('M72 196 Q113 202 162 188 L164 204 Q113 220 69 211Z',amber)
    + shape('M146 202 L166 199 L169 216 L153 211 L147 223 L141 210Z','#d59447')
    + [0,1,2].map(i=>shape(`M${126+i*10} ${178-i*4} l3 -6 3 6 -3 5Z`,'#d8d1a1')).join('')
    + `<g class="mBackArm">${shape('M152 147 Q169 150 171 170 L183 190 L169 201 Q149 191 140 166Z','#3c7770')}${oval(177,195,9,10,skin)}</g>`
    + `<g class="mReach">${sleeve}</g><g class="mHead">${head}</g>`;
  return flip ? mirror(204,body) : body;
};

A.kakiSeed = () => shape('M3 39 Q10 15 33 7 Q49 0 52 7 Q48 35 22 45 Q8 50 3 39Z','#865035')
  + line('M13 36 Q29 29 41 15','#d19861',4);
A.kaki = (green = false) => shape('M5 33 C2 17 18 14 33 17 C48 10 66 16 68 31 Q72 51 52 63 Q32 75 15 59 Q7 49 5 33Z',green?'#73935b':'#d85b31')
  + shape('M8 29 Q11 18 26 18 Q40 15 51 19 Q67 24 63 37 Q58 56 44 60 Q24 66 14 50Z',green?'#9fab69':'#ee8940')
  + shape('M19 32 Q23 25 28 26 Q30 29 24 35 Q19 38 19 32Z',green?'#ccd28c':'#ffc26b')
  + shape('M32 15 Q27 10 23 7 Q35 7 40 12 Q45 2 53 4 L49 14 Q59 12 66 16 L52 24 L39 18 L29 25 L16 20Z','#436541')
  + line('M39 16 Q36 8 41 4','#705439',4);
A.kakiLeaf = (base = '#53784f', vein = '#afad72') => shape('M0 0 Q12 -27 38 -29 Q64 -24 83 -29 Q73 -7 52 4 Q22 17 0 0Z',base)
  + line('M7 0 Q36 -6 69 -22',vein,2.6);

// 表紙には木から手渡される柿を描き、結末の場面と呼応させる。
A.cover = () => {
  const leaf = A.kakiLeaf;
  const lower = `M38 770 Q141 689 260 753 Q396 822 507 766 Q654 691 738 724 V948 H38Z`;
  const branch = line('M738 370 Q663 375 604 426 Q546 470 452 460 M626 411 Q601 390 572 388 M567 451 Q557 478 539 497','#76483a',14);
  return box(0,0,738,948,'#c96239',15)
    + box(0,0,36,948,'#184c4b') + box(36,0,7,948,'#ecc78a')
    + box(53,12,670,924,'none',9,' stroke="#edaf73" stroke-width="3"')
    + shape('M46 432 Q197 406 281 459 Q390 512 506 481 Q627 435 724 447 V932 H46Z','#e49158')
    + circle(345,577,142,'#f2bc76')
    + branch + place(606,427,leaf(),1.1,18) + place(621,411,leaf('#325d4d','#9ca470'),1.04,155)
    + place(561,450,leaf('#63794b','#b5b178'),.95,178) + place(675,388,leaf('#325d4d','#9ca470'),1.1,44)
    + place(510,481,A.kaki(),1.22,9) + place(441,456,A.kaki(),.8,-10)
    + shape('M42 667 Q165 559 270 635 Q392 726 548 655 Q639 610 727 634 V931 H42Z','#9eac77')
    + shape('M42 728 Q178 641 270 696 Q429 776 533 707 Q653 647 727 684 V930 H42Z','#527a64')
    + shape(lower,'#24534c')
    + place(390,452,A.saru(),1.10,1) + place(87,608,A.kani(),1.24,-5)
    + row(8,i=>line(`M${53+i*88} 842 q22 -18 44 0 q22 18 44 0`,'#527767',4))
    + row(7,i=>line(`M${69+i*91} 863 q21 -17 43 0 q21 16 42 0`,'#527767',3))
    + row(4,i=>line(`M7 ${154+i*203} Q23 ${161+i*203} 53 ${157+i*203}`,'#e9cf95',5))
    + `<g fill="#ffefc8" font-family='${FONT}' font-weight="900" text-anchor="middle"><text x="384" y="204" font-size="116" letter-spacing="4">さるかに</text><text x="389" y="335" font-size="116" letter-spacing="4">がっせん</text></g>`;
};

// 本の外の景色。季節と時間帯で空・田畑・遠山と、里の左右に見えるものを変える。
const villageSkies = {
  binding: ['#a3c6ba','#f5d4a3','#8ba8a0','#648a78','#a3ad72','#55765e','#254f48'],
  brook:   ['#97bdc2','#f2deab','#9bbab0','#85a998','#b0bd84','#689576','#365e55'],
  garden:  ['#9dc9be','#f9e1ab','#a3ba9a','#89a58a','#c4c88a','#80a476','#506d56'],
  harvest: ['#e1b878','#ffdfa3','#b4aa85','#919b74','#ccad67','#8c975f','#506947'],
  cloud:   ['#919fab','#d4cbb3','#96a7aa','#7e9991','#b3ad7c','#7c8e6c','#496359'],
  dusk:    ['#9d90ac','#f8bf90','#a59aa1','#887d7f','#b99a7f','#847d6c','#4c5257'],
  moon:    ['#3e566d','#8f9da3','#64798a','#4f6b78','#71847a','#526b65','#304b51'],
  dawn:    ['#dca877','#f2d7a9','#afa68c','#8b9784','#b99e76','#889173','#596f61'],
  feast:   ['#8fb9b6','#f9dab0','#92b1a3','#779b84','#c5b975','#88a072','#426952'],
};
function distantCottage(x,y,k,roof,wall,lit) {
  return place(x,y,shape('M0 0 H96 V51 H0Z',wall) + shape('M-15 3 L11 -28 L70 -32 L109 3Z',roof)
    + box(12,9,21,30,lit? '#edbc79':roof) + box(58,13,17,16,lit?'#f3d395':roof),k);
}
function orchardEdge(x,y,k,flip,crown,autumn) {
  const limb = shape('M-22 364 Q9 243 7 171 L-30 109 L-29 91 L12 144 Q20 77 55 23 L67 22 Q37 83 32 145 Q66 93 112 76 L121 80 Q72 113 38 173 Q26 265 25 364Z','#4b6254');
  const clusters = [[-26,108,.82],[27,44,1.1],[78,91,.82],[114,57,.8],[-34,57,1],[48,12,.77]];
  const leaves = clusters.map(([lx,ly,s],i)=>place(lx,ly,shape('M-43 9 Q-53 -9 -26 -19 Q-18 -42 7 -34 Q35 -42 45 -17 Q70 -6 52 14 Q38 34 8 25 Q-25 37 -43 9Z',crown[i%2]),s)).join('');
  const fruits = autumn ? [[-11,98],[65,68],[91,100]].map(([fx,fy])=>place(fx,fy,A.kaki(),.34)).join('') : '';
  return `<g transform="translate(${x} ${y}) scale(${flip?-k:k} ${k})">${limb}${leaves}${fruits}</g>`;
}
A.satoyama = name => {
  const [top,glow,far,ridge,field,pasture,front] = villageSkies[name];
  const night = name === 'moon', dusk = name === 'dusk', river = name === 'brook', orch = ['binding','harvest','feast','cloud'].includes(name);
  const movingClouds = place(130,132,shape('M0 15 Q30 14 49 3 Q77 -8 105 5 Q115 -8 150 -8 Q176 -6 197 8 Q235 8 257 18 H0Z',night?'#9aa7ac':'#fff1cb'),1.32)
    + place(1189,107,shape('M0 21 Q28 18 55 17 Q87 0 119 9 Q161 -10 192 8 Q221 5 246 19 L305 21Z',night?'#81949f':'#f9e8c2'),1.72);
  const group = name==='moon'||name==='dawn'||dusk;
  const farmhouses = group
    ? distantCottage(107,546,1.7,front,pasture,true) + distantCottage(1515,545,1.9,front,pasture,true)
    : distantCottage(275,581,.78,ridge,field,false) + distantCottage(1530,558,.82,ridge,field,false);
  const diskX = night?1510:(dusk?1440:382);
  const sideTrees = orch ? orchardEdge(35,397,1.3,false,[pasture,ridge],true)+orchardEdge(1901,316,1.47,true,[front,pasture],true)
    : orchardEdge(30,390,1.30,false,[pasture,ridge],false)+orchardEdge(1911,490,.98,true,[front,pasture],false);
  return {
    blur: 1.25, shadow:.28,
    svg: `<defs><linearGradient id="sunset-${name}" x2="0" y2="1"><stop stop-color="${top}"/><stop offset="1" stop-color="${glow}"/></linearGradient></defs>`
      + box(0,0,1920,1080,`url(#sunset-${name})`) + circle(diskX,night?180:(dusk?290:229),night?50:75,night?'#f7e9ba':'#f6d99b')
      + (night?row(22,i=>circle(99+(i*277)%1763,51+(i*39)%245,1.8+(i%2),'#e6dcbe')):'')
      + `<g class="drifting" opacity=".68">${movingClouds}</g>`
      + shape('M0 458 Q79 416 162 450 Q273 394 354 423 Q452 422 548 347 Q616 296 679 343 Q792 443 871 408 Q958 359 1024 388 Q1095 359 1164 328 Q1226 290 1291 326 Q1415 405 1498 395 Q1637 300 1719 372 Q1838 426 1920 375 V1080 H0Z',far)
      + shape('M0 489 Q142 382 274 466 Q363 534 513 491 Q627 447 733 478 Q847 513 923 477 Q1022 421 1114 450 Q1219 486 1311 451 Q1501 358 1615 426 Q1760 513 1920 408 V1080 H0Z',ridge)
      + shape('M0 576 Q303 494 555 554 T1097 545 Q1432 467 1682 518 Q1805 543 1920 507 V1080 H0Z',field)
      + farmhouses + sideTrees
      + shape('M0 755 Q197 629 466 671 Q700 731 911 688 Q1150 607 1422 632 Q1746 658 1920 585 V1080 H0Z',pasture)
      + (river ? shape('M-10 691 Q247 650 427 705 Q629 758 830 686 Q1003 632 1143 648 Q974 651 846 716 Q622 818 405 752 Q239 703 -10 780Z','#9ec2b5'):'')
      + row(6,i=>line(`M-85 ${820+i*30} Q242 ${681+i*32} 554 ${766+i*29} T1078 ${748+i*27} Q1505 ${597+i*35} 2005 ${677+i*37}`,field,3+i%2))
      + shape('M0 912 Q154 817 287 853 Q465 898 640 909 Q851 924 1042 906 Q1275 893 1485 845 Q1713 793 1920 818 V1080 H0Z',front)
      + row(15,i=>line(`M${i*143-55} ${969-(i%4)*8} q10 -22 17 -20 m-17 20 q-1 -23 -9 -31`,pasture,3)) + settingFrame(name,front,field),
    anim(t, el, q) { qs(el,q,'.drifting').setAttribute('transform',`translate(${F(36*sin(t*.075))} 0)`); }
  };
};

// 大きい模様は地面に印刷し、立体の手前には短い草を少しだけ置く。
A.storyGround = (kind, seed) => {
  const palettes = {brook:['#c2c698','#d9d3a7','#96a87b'],garden:['#c5c68d','#e0cca2','#96a574'],
    harvest:['#d2be80','#e6d1a2','#a1a16f'],cloud:['#b8b886','#d5c5a4','#899b78'],
    dusk:['#b5a584','#cfbaa1','#988871'],night:['#84948b','#a2aa95','#617c72'],
    dawn:['#c0ad89','#ddc3a0','#9d9d7a'],feast:['#cbc58d','#e6d6a5','#9ca36e']};
  const [base,path,dots]=palettes[kind], rand=rnd(seed);
  let grass='';
  for(let i=0;i<92;i++) {
    const x=F(24+rand()*1392), y=F(29+rand()*866);
    grass+=`<path d="M${x} ${y} q8 -5 13 -3 m-13 3 q-2 -7 -7 -9" fill="none" stroke="${dots}" stroke-width="3" stroke-linecap="round"/>`;
  }
  let decoration='';
  if(kind==='brook') {
    decoration = shape('M-20 722 Q192 642 317 550 T592 387 Q780 335 917 167 Q980 88 1095 -15 H922 Q823 71 775 137 Q688 253 508 290 Q279 335 219 430 Q143 545 -20 568Z','#699d9b')
      + line('M-12 655 Q177 613 274 481 Q352 378 529 334 T778 189','#b4d3bc',11)
      + [[110,604],[180,564],[241,509],[308,443]].map(([x,y],i)=>oval(x,y,33-i,16-i,'#c8c4a0')).join('');
  } else if(['garden','harvest','cloud','feast'].includes(kind)) {
    decoration = row(4,i=>line(`M${1010+i*74} 259 Q${1180+i*54} 372 ${1399+i*18} 399`,dots,6));
  }
  return box(0,0,1440,920,base) + grass
    + shape('M-12 895 Q144 741 368 682 Q570 627 738 521 Q877 439 1057 432 Q1266 422 1451 319 V416 Q1284 502 1080 521 Q896 530 787 615 Q626 738 407 799 Q253 834 154 930 H-12Z',path)
    + decoration;
};

A.sprout = () => line('M59 115 Q67 60 52 37','#517d51',8)
  + place(58,82,A.kakiLeaf('#86a75f','#cada89'),.65,-23)
  + `<g transform="translate(58 60) scale(-.61 .61) rotate(-12)">${A.kakiLeaf('#649355','#bec783')}</g>`
  + place(53,42,A.kakiLeaf('#80a760','#c8d489'),.42,-32);
A.raindrop = () => shape('M10 0 Q16 10 18 17 Q18 25 10 27 Q2 26 2 18 Q2 12 10 0Z','#75afb6') + line('M7 19 q0 3 2 3','#e9eee1',2);

// 2枚の枝を少し離して立てる。葉は枝先を軸に開き、柿はへたを軸にふくらむ。
const twigColor = '#755740';
const leafySprays = [
  [83,260,1.0,160],[91,198,.75,-140],[147,183,.78,-115],[156,132,.96,-130],
  [209,116,1.0,-82],[245,87,.69,-97],[289,75,.82,-61],[337,106,.78,-33],
  [380,132,1.0,0],[425,177,.83,-36],[437,217,1.0,-2],[396,248,.83,35],
  [324,171,.7,15],[204,237,.76,160],[312,265,.74,45]
];
const foregroundSprays = [[134,294,.85,151],[79,311,.80,169],[332,214,.78,-25],[381,201,.77,-33]];
const attachedFruit = [[71,270,.81],[145,202,.70],[198,145,.77],[283,99,.67],[357,143,.78],[438,223,.79],[390,259,.75],[309,276,.73]];
const nearFruit = [[102,302,.85],[175,266,.70],[323,223,.79],[389,205,.67]];
function leavesAt([x,y,k,a],i) {
  const colors=['#3e7056','#648356','#889651','#557950','#9e9959'];
  const spray = [a-47,a+11,a+59].map((ang,j)=>place(0,0,A.kakiLeaf(colors[(i+j)%5],'#aec090'),j===1?.94:.67,ang)).join('');
  return `<g transform="translate(${x} ${y}) scale(${k})"><g class="leafFan">${spray}</g></g>`;
}
A.kakiTreeLayer = (fore = false) => {
  const trunk = shape('M189 585 Q215 575 228 546 Q254 482 234 414 Q224 378 215 339 Q203 302 173 272 L184 254 Q223 276 243 317 Q245 258 262 226 Q280 174 262 119 L277 113 Q307 184 281 258 Q261 312 270 365 Q286 399 286 443 Q286 505 270 551 Q267 568 294 584Z','#705741')
    + shape('M218 578 Q259 532 252 448 Q252 394 235 351 Q223 310 203 287 Q243 319 259 377 Q278 439 265 509 Q257 554 251 581Z','#95744d')
    + line('M245 360 Q204 290 155 264 Q113 245 78 249 M152 262 Q122 233 102 204 M158 266 Q148 222 148 184',twigColor,13)
    + line('M248 304 Q270 241 326 207 Q367 181 427 173 M332 204 Q352 158 382 132 M351 192 Q401 199 437 217',twigColor,13)
    + line('M266 222 Q224 171 214 117 M230 163 Q187 157 157 132 M272 142 Q285 97 289 74 M273 137 Q307 105 336 106',twigColor,10)
    + line('M251 351 Q297 295 326 284 L398 249 M307 288 Q310 269 312 264 M156 255 L203 237 M268 139 L246 89 M324 207 L324 172',twigColor,8);
  const foreBranch = shape('M242 393 Q223 351 179 326 Q120 313 67 315 L69 307 Q123 305 160 309 Q141 295 131 278 L137 275 Q159 299 187 311 Q232 322 256 356Z','#765a40')
    + line('M242 362 Q269 290 303 254 Q338 213 380 202 M313 241 L334 214 M172 310 L174 268',twigColor,8);
  return (fore ? foreBranch : trunk) + (fore?foregroundSprays:leafySprays).map(leavesAt).join('')
    + (fore?nearFruit:attachedFruit).map(([x,y,k],i)=>
      `<g transform="translate(${x} ${y}) scale(${k})"><g class="fruitBud" data-order="${fore?i*2+1:i}">${place(-36,-6,A.kaki())}</g></g>`).join('');
};

A.chestnut = () => {
  const nut=shape('M23 91 Q8 68 23 45 Q33 32 47 22 Q58 13 57 3 Q72 8 75 23 Q108 39 116 65 Q125 95 106 110 Q94 120 65 121 Q35 121 23 107Z','#985435')
    + shape('M25 76 Q20 52 48 33 Q60 25 66 17 Q76 30 88 37 Q102 48 106 66 Q87 54 62 67 Q41 81 25 76Z','#bd7045')
    + shape('M23 91 Q49 103 75 95 Q96 91 112 82 Q122 102 103 114 Q88 124 60 123 Q27 122 23 108Z','#d9ae6d')
    + row(8,i=>line(`M${32+i*9} ${106+4*sin(i*.6)} l3 3`,'#a87c50',2.6))
    + line('M27 78 Q22 60 38 47','#d68a57',3.8)
    + oval(52,73,4,5.8,sumi) + oval(82,70,4,5.8,sumi)
    + line('M45 64 l10 2 M77 62 l11 -4','#6b4936',3.1)
    + line('M59 85 Q66 90 74 82',sumi,3.3);
  return line('M39 109 L32 131 L18 132 M89 111 L98 130 L111 131','#755742',8)
    + line('M27 77 L11 85 L5 78 M105 71 L119 76 L125 65','#805d45',7)
    + `<g class="nutBody">${nut}</g>`;
};
A.bee = () => {
  const wings=shape('M77 53 Q53 40 52 22 Q52 7 69 12 Q86 20 88 48Z','#94b8b5')
    + shape('M75 53 Q75 21 93 11 Q110 4 113 15 Q115 34 89 52Z','#c6dfcf')
    + line('M84 45 Q97 31 103 22','#8cafa5',3)
    + shape('M81 53 Q99 25 119 27 Q139 32 128 45 Q117 58 87 59Z','#dce9ce')
    + line('M92 51 L119 36','#a3c1af',3);
  return shape('M104 62 L145 62 L135 70 L146 75 L105 86Z','#81553b')
    + shape('M52 44 Q82 30 112 43 Q134 50 135 67 Q131 90 103 96 Q72 100 53 87Z','#e9b749')
    + shape('M98 40 L108 42 Q125 63 109 94 L99 97 Q114 62 98 40Z','#665246')
    + shape('M76 40 L85 38 Q105 69 89 96 L79 95 Q93 67 76 40Z','#705948')
    + line('M71 91 l-7 11 -9 0 M97 93 l1 9 8 2','#715748',4)
    + `<g class="beeWings">${wings}</g>`
    + line('M44 49 Q37 33 28 33 M56 43 Q55 31 60 27','#705747',3.5)
    + circle(28,32,3.7,'#705747')+circle(61,27,3.7,'#705747')
    + shape('M30 52 Q41 38 57 43 Q76 47 77 65 Q78 81 65 88 Q49 96 32 85 Q17 73 30 52Z','#f2c862')
    + oval(37,65,3.4,5,sumi)+oval(56,62,3.7,5,sumi)
    + oval(62,73,6,3,'#df9663')+line('M36 77 Q43 83 50 75',sumi,3);
};
A.mortar = () => {
  const stone='#778b88', dark='#506862', edge='#a7b3a4';
  const wall=shape('M14 48 Q77 24 144 48 L140 91 Q135 106 117 115 L119 135 Q134 152 142 178 Q76 205 14 183 Q19 155 33 134 L36 117 Q16 103 13 87Z',stone)
    + shape('M15 76 L29 77 Q26 102 49 112 L45 140 Q29 160 31 179 Q85 194 140 173 L144 184 Q81 209 11 185 Q13 161 31 134 L33 119 Q14 107 12 88Z',dark)
    + oval(79,48,66,20,edge)+oval(79,48,50,10,dark)+oval(80,51,37,5,'#425853')
    + line('M18 81 Q81 100 140 75','#d6b075',7)
    + line('M19 83 Q79 100 140 77','#a88758',2,' stroke-dasharray="5 7"')
    + shape('M109 83 l12 9 -8 2 -4 16 -5 -3 4 -18 -10 7 -3 -4Z','#e6c485')
    + oval(59,113,4.6,6,sumi)+oval(88,111,4.6,6,sumi)
    + line('M64 127 Q74 135 86 124',sumi,3.9)
    + line('M24 166 l9 -9 m1 18 l13 -16 m51 16 l5 -8 m5 3 l9 -11','#aab6a9',3.2);
  return `<g class="usuBody">${wall}</g>`;
};
A.dung = () => shape('M7 65 Q15 53 29 51 Q22 40 43 34 Q54 29 58 22 Q60 10 74 14 Q83 16 88 25 Q104 20 113 30 Q124 36 119 44 Q139 46 144 60 Q158 76 129 81 Q68 93 16 82 Q-2 77 7 65Z','#76664b')
  + shape('M24 58 Q27 50 42 48 Q41 38 53 35 Q66 31 66 22 Q72 17 81 28 Q88 34 96 32 Q112 31 112 42 Q105 54 89 52 Q77 65 57 62 Q46 69 31 66Z','#998354')
  + line('M34 53 l13 -7 m44 -5 l13 1 m4 25 l13 -4','#d8bc7f',3.6)
  + oval(56,64,3.2,4,sumi)+oval(76,61,3.2,4,sumi)+line('M60 73 q7 4 14 -3',sumi,3);

// 縁側のある親がにの家。格子の奥の明かりが夜の見開きにも残る。
function paperWindow(x,y,width,height,timber,light) {
  return box(x,y,width,height,timber)+box(x+5,y+5,width-10,height-10,light)
    + row(3,i=>box(x+width*(i+1)/4-2,y,4,height,timber))
    + row(2,i=>box(x,y+height*(i+1)/3-2,width,4,timber));
}
A.porch = () => box(45,111,344,147,'#c0845c')
  + box(56,129,321,107,'#795a4d')+paperWindow(69,138,102,87,'#805d4c','#f4cb91')
  + paperWindow(182,138,65,87,'#805d4c','#edb578')
  + box(271,141,86,84,'#654c45')+box(290,140,6,85,'#b78b65')
  + shape('M22 131 Q69 102 88 48 L254 18 Q331 25 353 60 L411 118 Q364 133 324 126 Q177 135 22 131Z','#836147')
  + shape('M35 122 Q75 93 92 51 L250 23 Q312 27 345 66 L394 113 Q324 126 265 120Z','#ab8757')
  + row(15,i=>line(`M${81+i*17} ${85-(i%5)*5} l-18 26`,'#cbaa71',3))
  + line('M89 49 Q165 31 251 23 Q296 26 325 41','#755340',8)
  + box(35,236,362,15,'#ac7951',2)+box(32,251,372,9,'#795846')
  + row(4,i=>box(48+i*107,256,10,27,'#785d4b'))
  + shape('M24 276 Q185 271 402 275 L409 286 H18Z','#aba18a');

// さるの家は石の土台、縁側、柱と障子、軒、棟の五段。開くと縁側と軒に奥行きが出る。
A.monkeyHouse = (night=false) => {
  const beam=night?'#61584f':'#845e43', wall=night?'#adad92':'#e1be8e';
  const door=night?'#635f5b':'#69564a', roof=night?'#7c7766':'#ac8a58';
  const straw=night?'#a79c7b':'#d0b27b', lit=night?'#e2bf81':'#f5dea3';
  return terrace({X:0,Y:584,fold:-23,tiers:[
    {w:986,h:38,d:70,top:'#999784',art:(w,h)=>box(1,2,w-2,h-2,night?'#737b76':'#989580',3)
      +row(13,i=>line(`M${25+i*76} 4 l${i%2?8:-9} 13 -6 19`,night?'#9a9e88':'#b3af96',3))},
    {w:948,h:80,d:80,top:(w,d)=>box(0,0,w,d,night?'#9d856a':'#bd945f')
      +row(16,i=>box(i*w/16,0,2,d,beam)),art:(w,h)=>box(3,2,w-6,17,beam)
      +box(4,19,w-8,9,night?'#a58c6c':'#cca46e')
      +row(12,i=>box(20+i*(w-38)/12,26,17,h-26,beam))},
    {w:882,h:381,d:66,top:false,art:w=>box(4,2,w-8,86,wall)
      +box(5,58,w-10,14,beam)+place(0,62,box(4,14,w-8,303,wall)+box(5,287,w-10,32,beam)
      + paperWindow(40,71,217,195,beam,lit)+paperWindow(263,71,150,195,beam,lit)
      +box(464,76,152,206,door)+box(480,81,11,199,beam)
      +box(644,80,190,198,door)+box(658,88,153,185,night?'#43474a':'#584c43')
      +row(4,i=>box(12+i*282,28,15,259,beam))
      +box(6,23,w-12,20,beam)+box(5,59,w-10,10,beam))},
    {w:963,h:354,d:62,td:62,top:(w,d)=>box(0,0,w,d,roof)
      +row(42,i=>line(`M${i*w/41} 0 l-9 ${d}`,straw,2.8)),
      art:(w,h)=>shape(`M6 4 Q${w/2} 18 ${w-7} 4 L${w-2} 31 Q${w/2} 53 1 31Z`,roof)
      +line(`M5 29 Q${w/2} 52 ${w-6} 28`,beam,6)
      +row(38,i=>line(`M${18+i*(w-34)/38} 11 l-5 15`,straw,3.8))},
    {w:901,h:470,top:false,art:(w,h)=>shape('M7 137 Q111 99 212 28 Q257 1 370 9 L665 11 Q702 46 774 81 Q837 110 893 125 Q637 146 465 139 Q245 156 7 137Z',roof)
      +shape('M31 127 Q147 87 224 34 Q269 8 367 17 L653 18 Q726 78 842 119 Q593 134 480 128 Q253 143 31 127Z',straw)
      +line('M219 32 Q275 3 380 12 L657 14',beam,10)
      +row(29,i=>line(`M${110+i*24} ${100-43*sin(i*PI/28)} l-15 24`,roof,4.3))},
  ]});
};
A.waterJar = () => lib('tool.pot',{c:'#538589'})+oval(85,18,36,7,'#3c6467')+oval(83,18,29,4.3,'#97bfba');
A.doma = night => {
  const clay=night?'#9f9b85':'#c5aa83', straw=night?'#b2ac86':'#ddc796', seam=night?'#717d72':'#8e9981';
  return box(0,0,1440,920,clay)+shape('M0 0 H1440 V475 Q1170 577 931 560 T450 628 Q199 691 0 608Z',straw)
    +row(7,i=>line(`M0 ${27+i*82} L1440 ${-51+i*82}`,seam,4))
    +row(8,i=>line(`M${i*219} 0 l80 490`,seam,3))
    +shape('M-5 876 Q310 704 681 738 Q1080 775 1447 559 V650 Q1124 856 714 818 Q362 784 54 926 H-5Z',night?'#b3ab92':'#dcc39b')
    +row(40,i=>oval(40+(311*i)%1377,610+(i*71)%295,3+(i%4),2,night?'#858b7c':'#ab987c'));
};

function settingFrame(name,front,field) {
  if(name==='dawn') {
    return shape('M0 0 H1920 V33 Q1498 67 1215 61 Q616 38 0 95Z','#725746')
      +box(0,0,56,1080,'#7e624d')+box(1843,0,77,1080,'#856950')
      +shape('M1672 0 H1848 V991 H1829 V96 H1672Z','#9d8060')
      +row(3,i=>box(1848,187+i*191,75,11,'#bea077'))
      +shape('M64 89 L475 57 L237 586 L60 713Z','#ffe9ad',' opacity=".20"');
  }
  if(name==='cloud') {
    return `<g opacity=".83">${place(194,89,shape('M-90 98 Q-66 51 -10 63 Q4 22 72 45 Q103 -5 170 24 Q238 9 270 61 Q335 39 385 81 Q310 96 216 91 Q52 86 -90 98Z','#c2c4bd'),1.23)}</g>`;
  }
  if(name==='brook'||name==='moon') {
    const reeds=lib('grass.reed',{w:220,h:245,c:front});
    return place(-35,687,reeds,1.06)+place(1745,690,lib('grass.susuki',{w:206,h:290,c:front,c2:field}),.98);
  }
  if(name==='garden') {
    return place(-70,430,lib('tree.bamboo',{c:'#749278'}),1.00)+place(1620,655,lib('fence.bamboo',{w:385,h:130}),1);
  }
  if(name==='dusk') {
    return shape('M0 0 H302 Q188 65 0 98Z','#736459')+box(0,36,40,648,'#837062')
      +line('M114 51 L114 103','#685e53',4)+box(93,100,42,69,'#e4b482',12)+box(92,99,44,8,'#796752')+box(92,160,44,8,'#796752');
  }
  const twig = line('M0 0 Q90 26 160 35 L256 85 M83 23 Q72 62 58 88 M155 36 L188 13',front,11)
    + place(59,78,A.kakiLeaf(front,field),.83,139)+place(177,29,A.kakiLeaf(front,field),.98,7)
    + place(215,65,A.kakiLeaf(field,front),.70,59)+place(77,45,A.kaki(),.69)
    + place(237,81,A.kaki(),.73);
  return `<g transform="translate(1915 95) scale(-1.25 1.25)" opacity=".86">${twig}</g>`;
}

A.picnicMat = () => {
  const top=518, height=297;
  return `<g transform="rotate(-4 751 672)">`
    +box(292,top,930,height,'#c09964',12)
    +box(298,top+6,918,height-12,'#d5bc81',9)
    +row(12,i=>line(`M307 ${top+14+i*23} H1203`,'#dfca93',3))
    +box(307,top+6,16,height-12,'#598074')+box(1191,top+6,16,height-12,'#598074')
    +row(14,i=>line(`M288 ${top+10+i*21} l-12 -1 M1223 ${top+10+i*21} l12 1`,'#c9ac78',4))+'</g>';
};
A.fruitBasket = () => lib('tool.basket',{c:'#b78e50'})
  + place(36,32,A.kaki(),.68,-9)+place(91,25,A.kaki(),.63,9)+place(126,44,A.kaki(),.54,-8)
  + shape('M5 61 Q99 57 195 62 L192 75 Q101 86 9 74Z','#a88044');
