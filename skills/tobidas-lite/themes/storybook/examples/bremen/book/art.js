// Figures face right. Their feet share the bottom edge for the stacking mechanism.
const ink = '#273c3a', cream = '#ffedc9', gold = '#edc477';
const shape = (d, fill, cls='') => '<path class="'+cls+'" d="'+d+'" fill="'+fill+'"/>';
const oval = (x,y,rx,ry,c) => '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+c+'"/>';
const stroke = (d,c,w) => '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>';
const gaze = (x,y) => oval(x,y,5,6,ink)+oval(x+1,y-2,1.5,1.5,cream);
const jaw = (d,c) => shape(d,c,'jaw');
const ribbon = (d) => shape(d,'#b84935');
const beasts = {
  donkey: { w:310,h:260,back:148, art:()=>
    shape('M63 132Q32 127 32 178L20 203 9 190Q14 178 23 170Q21 129 49 119Z','#514f4c')+
    shape('M74 158L96 163 81 248 62 249Z M180 153L199 156 210 247 191 247Z','#687375')+
    shape('M43 147Q44 106 96 110L156 113Q191 114 207 78L218 56 241 65 228 133Q217 164 193 179L190 250 168 250 164 185Q125 192 88 171L65 248 42 248 58 174Q45 164 43 147Z','#909d9a')+
    shape('M193 94L202 66 214 49 226 59 221 94 210 116Z','#4b5657')+
    '<g class="ear">'+shape('M220 68Q194 32 196 6Q211 0 235 60Z','#90a09e')+shape('M225 61Q216 20 229 2Q243 15 237 67Z','#798a89')+stroke('M203 17L222 52 M229 14L231 48','#d49f91',5)+'</g>'+
    shape('M210 66Q225 46 247 60L277 85Q295 84 301 99Q302 119 278 124L232 112 213 106Z','#a4b2aa')+
    jaw('M262 108Q282 110 299 101Q303 124 274 124Z','#d0bda4')+
    oval(286,100,17,12,'#e4d3b5')+oval(292,97,3.6,2.8,ink)+('<g class="openEye">'+gaze(248,78)+'</g><g class="sleepEye" opacity="0">'+stroke('M241 78q7 6 14 -1',ink,3)+'</g>')+
    ribbon('M199 95L229 112 223 125 208 118 211 145 196 135 195 114 187 118Z')+
    shape('M42 248L65 247 63 259 38 259Z M167 249L190 248 193 259 166 259Z M62 247L79 245 79 255 60 255Z M191 246L209 245 215 255 192 255Z',ink)},
  dog:{w:220,h:160,back:92,art:()=>
    '<g class="tail">'+shape('M57 86Q18 88 6 46Q6 32 15 41Q29 66 60 65Z','#b07546')+'</g>'+
    shape('M64 110L80 110 71 150 57 151Z M144 104L158 108 169 151 154 152Z','#734b35')+
    shape('M40 94Q41 64 79 65L126 68Q146 67 153 45L166 43 182 55 169 89 157 106 146 148 150 155 126 155 129 116Q99 127 75 116L53 145 51 157 28 157 40 136 49 114Z','#bc8150')+
    shape('M137 69Q156 53 160 45L175 57 165 91 150 106 139 95Z','#ecbb71')+
    shape('M153 60Q144 30 164 20Q187 12 196 41L215 45 215 55Q210 72 178 71Z','#d19555')+
    jaw('M186 58L215 50Q220 72 191 73Z','#e2ac6f')+
    shape('M151 30Q166 12 176 25Q172 50 161 65Q143 73 145 55Z','#754734')+oval(211,44,7,5,ink)+gaze(189,38)+ribbon('M146 62L177 71 172 80 147 75 138 88 140 74Z')},
  cat:{w:162,h:125,back:71,art:()=>
    stroke('M49 76Q18 78 16 48Q14 23 26 21Q36 20 31 35','#394d50',13)+
    shape('M42 78Q45 50 74 52L102 56 112 42 133 44 126 78 118 95 121 117 127 121 106 122 101 94 78 98 63 118 68 123 43 123 50 98Q40 95 42 78Z','#485b5c')+
    shape('M101 56L99 19 117 29Q125 25 133 28L145 15 148 44 158 51 144 61 122 66Z','#526668')+
    shape('M104 28L114 34 105 39Z M138 31L143 24 144 36Z','#da9d85')+
    jaw('M135 57L156 49Q157 65 140 66Z','#e2ccb0')+oval(153,49,4,3,'#a75c4e')+oval(135,41,5,5,'#f2cf72')+oval(136,41,1.6,4,ink)+
    stroke('M147 53L160 51 M147 56L159 59','#ead7b3',1.5)+shape('M100 61L125 66 112 85Z','#e8d7bb')},
  rooster:{w:125,h:134,back:70,art:()=>
    stroke('M66 96L62 127 50 132 M62 127L73 131 M83 100L86 125 77 129 M86 125L97 128','#a86a33',4)+
    shape('M60 70Q29 17 13 36Q3 43 5 57Q16 44 34 65Q10 49 3 68Q21 63 38 88L54 92Z','#255e58')+
    shape('M27 66Q50 88 68 59L82 39 102 43 97 81Q93 101 75 107Q48 109 28 86Z','#bc5537')+
    shape('M58 66Q72 66 83 57Q73 86 52 89Q39 86 38 76Z','#df9348','wing')+
    shape('M73 65Q84 44 81 29Q96 19 107 34L105 51 95 67 90 58 83 69Z','#eec471')+
    shape('M79 32Q72 18 78 15L84 20Q80 4 87 4L94 17Q96 2 100 9L103 21Q111 17 111 24L105 34Z','#b93631')+
    oval(103,52,5,8,'#b53e30')+jaw('M105 41L122 43 106 49Z','#b8792e')+shape('M105 36L124 41 105 43Z','#efae3e')+gaze(99,37)}
};
const euroFont = 'Georgia, "DejaVu Serif", serif';
function badgeAnimal(name,x,y,k){return '<g transform="translate('+x+' '+y+') scale('+k+')">'+beasts[name].art()+'</g>'}
function sprig(x,y,angle,size){
 let leaves='';
 for(let i=0;i<6;i++) leaves+=shape('M0 '+(-i*14)+'q-19 -3 -18 -18q16 2 18 18m0 -7q17 -4 18 -19q-14 4 -18 19',i%2?'#a7ad77':'#c3bf86');
 return '<g transform="translate('+x+' '+y+') rotate('+angle+') scale('+size+')">'+stroke('M0 0Q-2 -49 2 -100',gold,2)+leaves+'</g>';
}
A.cover=()=>{
 const title=(s,y,size)=>'<text x="383" y="'+y+'" text-anchor="middle" font-family=\''+euroFont+'\' fill="#f1cf85" font-size="'+size+'">'+s+'</text>';
 const tracks=[shape('M0 0Q-11 20 2 24Q15 24 18 5L13 3Q9 21 3 18Q-2 18 5 2Z',gold),oval(0,12,7,5,gold)+[-8,0,8].map((x,i)=>oval(x,i===1?1:4,3,4,gold)).join(''),oval(0,12,5,5,gold)+[-6,0,6].map(x=>oval(x,4,2,3,gold)).join(''),stroke('M0 20L0 0 M0 12L-9 2 M0 12L9 2',gold,2.5)];
 return '<rect width="738" height="948" fill="#214c42"/><rect width="38" height="948" fill="#143a34"/><rect x="58" y="25" width="653" height="897" rx="3" fill="none" stroke="#c5a966" stroke-width="3"/><rect x="70" y="37" width="629" height="873" fill="none" stroke="#a7a470"/>'+
 title('Die Bremer',163,82)+title('Stadtmusikanten',249,69)+
 '<path d="M143 674V539a240 240 0 0 1 480 0v135q-202 105 -480 0Z" fill="#e3c98b"/>'+
 oval(469,413,47,47,'#f6e6b7')+shape('M143 637Q255 535 371 612T623 563V674Q401 775 143 674Z','#99ac88')+
 badgeAnimal('donkey',239,476,.94)+badgeAnimal('dog',239,419,.85)+badgeAnimal('cat',259,374,.8)+badgeAnimal('rooster',276,316,.77)+
 sprig(188,726,-36,1.15)+sprig(568,726,36,1.15)+
 tracks.map((v,i)=>'<g transform="translate('+(253+i*82)+' 790) rotate(-13)">'+v+'</g>').join('')+
 '<path d="M215 851h123m86 0h123" stroke="#aeaa75"/>'+shape('M382 842l8 9 -8 9 -8 -9Z',gold);
};
// Panoramas behind the book use a common horizon but change light and landmarks.
const landscapes = [
 ['#dae4b5','#f4cd91','#99ae87','#527e6b','#375c51'],
 ['#b7d6d3','#fae0aa','#c1bb85','#a29554','#706a43'],
 ['#94c9cb','#f8dfaf','#9bb58c','#789478','#425f55'],
 ['#9a8da6','#fac58c','#95908d','#676b74','#484f59'],
 ['#23374c','#92989c','#51687a','#385464','#233d49'],
 ['#202c40','#646e83','#49576a','#354553','#253644'],
 ['#b4c9c0','#ffe0ac','#a0ae8c','#738a72','#456858']
];
function scenery(id){
 const [sky,haze,hill,mid,near]=landscapes[id];
 const ridge=(y,a,f,color)=>{let d='M-40 1080';for(let x=-40;x<=1960;x+=40)d+=' L'+x+' '+(y+a*Math.sin(x/f+id)+a*.35*Math.cos(x/111));return shape(d+'V1080Z',color)};
 const fir=(x,y,h,c)=>'<g transform="translate('+x+' '+y+') scale('+h/100+')">'+shape('M-3 0v-20h-26l14 -22h-11l17 -26h-8L0 -100l18 32h-9l17 26h-11l15 22H3V0Z',c)+'</g>';
 const cottage=(x,y,k)=>'<g transform="translate('+x+' '+y+') scale('+k+')">'+shape('M-31 1v-38h62V1Z','#b19c7f')+shape('M-42 -34L0 -69l42 35Z','#875a49')+shape('M14 -53v-17h7v25Z','#775850')+shape('M-17 -26h11v13h-11zM8 -26h11v13H8z','#ffc976')+'</g>';
 let art='<defs><linearGradient id="horizon'+id+'" x2="0" y2="1"><stop stop-color="'+sky+'"/><stop offset=".82" stop-color="'+haze+'"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#horizon'+id+')"/>'+
 oval(id>=4?1520:345,220,65,65,id===4||id===5?'#ebdcb8':'#fee5ad')+ridge(526,73,304,hill);
 if(id===4||id===5) for(let i=0;i<47;i++)art+=oval((i*157+31)%1920,52+(i*91)%315,i%3+1,i%3+1,'#e0d7bc');
 for(let i=0;i<36;i++)art+=fir(i*58,596+30*Math.sin(i/4),70+(i*31)%71,mid);
 art+=ridge(630,44,430,mid)+ridge(746,58,319,near);
 if(id===1){
   for(let i=0;i<75;i++){const x=i*27,y=870+80*Math.sin(i/13);art+=stroke('M'+x+' 1080q25 -120 8 '+(y-1080),'#baa56b',3)+oval(x+8,y,6,22,'#d2ba76')}
 }else if(id===2){for(let i=0;i<7;i++)art+=cottage(150+i*245,664+30*Math.sin(i),.8+i%2*.3)}
 else {art+=cottage(1500,650,1.4);for(let i=0;i<10;i++)art+=fir(i<5?i*65:1550+(i-5)*91,920+(i%3)*41,270+(i*59)%180,near)}
 if(id===4)art+=shape('M1477 621l-290 157 351 -153Z','#ad9875');
 if(id===5)art+=shape('M1230 243q74 -68 166 -32q72 -106 173 -48q60 6 111 62Z','#505b70');
 if(id===0||id===6)art+=stroke('M1526 557q40 -44 7 -75t12 -69','#c9c9ac',8);
 return {svg:art,blur:2};
}
const hatArt=shape('M19 49L29 19Q35 7 60 17L82 44 103 49Q91 61 21 61Q0 58 3 51Z','#485043')+stroke('M26 43Q54 49 79 40','#ab734d',6);
function restingDog(){
 return oval(93,94,81,44,'#ad7547')+shape('M33 104Q16 91 32 66Q60 38 101 58Q83 61 72 86Z','#bd8556')+
 shape('M110 89Q121 56 158 62Q178 65 181 87L206 96Q205 112 183 115L136 118Z','#cf965e')+
 shape('M126 71Q146 53 153 69Q153 88 138 99Q123 105 123 91Z','#795037')+
 stroke('M164 88q6 5 13 0',ink,3)+oval(200,96,7,4,ink)+
 shape('M14 93Q24 69 31 94Q49 124 97 111Q132 99 141 107Q137 129 97 136Q31 144 14 116Z','#cf9965');
}
