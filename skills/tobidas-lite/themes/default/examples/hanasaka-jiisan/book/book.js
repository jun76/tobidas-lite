// はなさかじいさん — 作品専用の背景・旋律・場面。
const CUE={dig:2.2,gold:3.2,pound:1.2,burn:5.8,cast:1.8,bloom:2.7,imitate:2};
const tune=(chords,notes)=>({beats:4,chords,mel:notes.map(ns=>ns.map((n,i)=>[i*(ns.length===2?2:1),n]))});
const hanaMusic={tempo:.9,tr:0,
 main:tune(['C','Am','F','G','C','Em','G','C'],[[76,79,81,79],[81,84,81],[77,79,81,84],[79,81,86,81],[84,81,79,76],[79,76],[79,81,79,74],[76,72]]),
 sub:tune(['F','C','Dm','G','Am','F','G','C'],[[81,84,89,84],[84,79,81,84],[77,81,86,81],[79,86,81,79],[81,84,88,84],[81,77],[79,81,86,79],[84,72]]),
 minor:tune(['Am','Em','Dm','Am','F','Dm','E','Am'],[[81,79,76],[79,76],[77,76,74,77],[76,81],[77,81,79],[77,74],[76,80,83,80],[81,81]])};
const tail=(t,el,q)=>rot(qs(el,q,'.tail'),18*sin(t*7),61,99);
const cam={start:{d:450,tilt:57,cz:200,yaw:-3},end:{d:370,tilt:58,cz:205,yaw:2}};
function landscape(seed=1,color='#9ab7ad'){
 return [pc(0,95,1380,210,A.hills(1380,210,color,'#b4c5a7',seed,1),{sh:false,sway:0,fold:12}),
 pc(-480,180,220,85,A.cloud(220,85,seed),{lift:340,sh:false,nosplit:true,dyn:t=>({dx:15*sin(t*.3)})}),
 pc(430,160,240,90,A.cloud(240,90,seed+1),{lift:365,sh:false,nosplit:true}),
 ...[-590,-430,-255,250,430,590].map((x,i)=>pc(x,820+(i%2)*30,140,65,A.grass(140,65,'#739772','#a7bd81',i%2?['#e7bc7f']:['#ecc4cf']),{sway:1.1})),
 pc(-580,510,170,135,A.bush(170,135,'#6d957c','#94af87'),{sway:.4}),pc(570,520,170,135,A.bush(170,135,'#6d957c','#94af87'),{sway:.4})];
}
const person=(x,y,art,opt={})=>pc(x,y,120,226,art,{nosplit:true,...opt});
const coin=(x,y,t0,lift=30)=>pc(x,y,58,36,A.koban(),{nosplit:true,dyn:t=>({op:t>=t0?1:0,sc:pop(t,t0),lift:lift+18*sin(cl((t-t0)/1)*PI)})});
function petals(start=0){return Array.from({length:10},(_,i)=>pc(110+i*46,570+(i%3)*65,25,23,A.blossom(12,11,10,i%2?'#f7d1df':'#e9a1c1'),{nosplit:true,sh:false,dyn:t=>{const u=cl((t-start-i*.16)/3.8);return {op:t>start+i*.16&&u<1?sin(u*PI):0,lift:370*(1-u),dx:-130*u+25*sin(u*8+i),rz:u*220};}}));}
const spreads=[];
spreads.push({hold:8,cam,music:'gentle',scene:A.scene('one','village'),ground:A.gMeadow({seed:12,pond:null}),
 caption:['むかしむかし、やさしい おじいさんと おばあさんが','しろという いぬと くらしていました。'],
 sfx:[[1,(S,t)=>{S.box(t,91,.13);S.box(t+.15,96,.1);S.box(t+.4,93,.12);}],[4,'wind',{vol:.15,len:2}]],
 pieces:[...landscape(2),pc(-325,445,420,420,A.minka(),{sway:.2}),pc(370,425,290,400,A.tree(290,400,{c:'#789b75',c2:'#a7bb80',c3:'#bdd295'}),{sway:1}),
 person(-235,685,A.jii({armR:-45}),{anim:aArm('.aR',t=>-45+8*sin(t*2))}),person(-390,700,A.baa()),
 pc(215,720,220,170,A.shiro(),{nosplit:true,anim:tail}),fly(460,765,'#ebbd79',2)]});
function finishBook(){Tobidas.book({title:'はなさかじいさん｜とびだすえほん',lang:'ja',theme:{board:'#243d59',spine:'#192f48',style:'kirigami',desk:{base:'seaside',scene:A.scene('cover','cover')}},sound:{set:hanaMusic},cover:A.cover(),end:{title:'おしまい',sub:'はなさかじいさん'},spreads});}
spreads.push({hold:8,cam,music:'airy',scene:A.scene('two','bamboo'),ground:A.gMeadow({seed:25,pond:null})+'<ellipse cx="1050" cy="650" rx="135" ry="80" fill="#907454"/><ellipse cx="1050" cy="650" rx="100" ry="57" fill="#605943"/>',
 caption:['「ここほれ、わんわん！」','ほってみると、こばんが ざくざく。'],sfx:[[CUE.dig,'steps',{n:3,gap:.28}],[CUE.gold,'sparkle',{len:2}]],
 pieces:[...landscape(3),...[-485,-245,440].map(x=>pc(x,420,195,310,A.bamboo(),{sway:.8})),
 person(-170,680,A.jii({armR:-60,holdR:'<path d="M81 141V234" stroke="#9b7959" stroke-width="10"/><path d="M65 225H98L94 252H70Z" fill="#768a88"/>'}),{anim:aArm('.aR',t=>-40+16*sin(t*4))}),
 pc(140,710,220,170,A.shiro(),{nosplit:true,anim:tail,dyn:t=>({lift:t<CUE.gold?12*abs(sin(t*4)):0})}),
 ...Array.from({length:7},(_,i)=>coin(315+(i%3)*67,690+Math.floor(i/3)*42,CUE.gold+i*.12,20+(i%2)*25))]});
spreads.push({hold:8,cam,music:'sad',scene:A.scene('three','farewell'),ground:A.gMeadow({seed:31,pond:null}),
 caption:['よくばりな おとなりさんに いじめられ、しろは しんでしまいました。','ふたりは おはかを つくり、きを うえました。'],sfx:[[1,'wind',{len:3}],[5,'bell',{vol:.15}]],
 pieces:[...landscape(4,'#b3a7ac'),person(-430,550,A.neighbor(),{dyn:t=>({op:1-sm((t-1)/1.5)})}),
 pc(325,535,140,147,A.grave(),{dyn:t=>({op:sm((t-1)/1.5)})}),
 pc(370,400,200,285,A.tree(200,285,{c:'#99ad83',c2:'#c1c791',c3:'#d9d3a4'}),{dyn:t=>({sc:.35+.65*sm((t-2)/4),op:sm((t-1)/1.5)})}),
 person(-220,695,A.jii({mouth:'flat',eyes:'closed',armR:-20})),person(-380,710,A.baa({mouth:'flat',eyes:'closed'})),
 pc(310,625,85,80,`<path d="M42 78V20M42 61L18 38M42 52L65 31" stroke="#72957b" stroke-width="8"/>${A.blossom(18,25,17,'#f2dba5')}${A.blossom(63,21,17,'#f2dba5')}`,{dyn:t=>({op:sm((t-2)/1)})})]});
const fadeBurn=t=>1-sm((t-CUE.burn)/.7);
spreads.push({hold:8.5,cam,music:[[0,'night'],[2,'airy'],[CUE.burn,'sad']],scene:A.scene('four','hearth'),ground:A.gMeadow({seed:42,pond:null}),
 caption:['しろの きで つくった うすから、また こばん！','けれど おとなりさんが、うすを もやしてしまいました。'],
 sfx:[[CUE.pound,'knock',{n:3}],[2.8,'sparkle'],[CUE.burn,(S,t)=>{for(let i=0;i<5;i++)S.noise(t+i*.14,.12,u=>1800,u=>(1-u)*.06);}]],
 pieces:[...landscape(5),pc(-360,400,420,420,A.minka(),{k:.85,sway:.2}),
 person(-320,700,A.jii({armR:-85}),{anim:aArm('.aR',t=>-85+20*sin(t*4))}),person(-480,725,A.baa()),
 pc(-145,730,200,170,A.usu(),{dyn:t=>({op:fadeBurn(t)})}),
 pc(-145,730,120,140,'<path d="M58 24V138" stroke="#b78b5e" stroke-width="15"/><rect x="10" y="12" width="100" height="32" rx="9" fill="#d3b381"/>',{nosplit:true,dyn:t=>({lift:170+45*abs(sin((t-CUE.pound)*4)),op:fadeBurn(t)})}),
 ...Array.from({length:5},(_,i)=>pc(120+i*76,690+(i%2)*45,58,36,A.koban(),{nosplit:true,dyn:t=>({op:(t>2.8+i*.12?1:0)*fadeBurn(t),sc:pop(t,2.8+i*.12),lift:20})})),
 person(450,680,A.neighbor({armL:60}),{dyn:t=>({op:sm((t-4.7)/.7)})}),
 pc(220,660,250,220,'<path d="M25 209L208 145L222 178L40 220Z" fill="#67574b"/><path d="M42 142L230 198L214 220L25 169Z" fill="#8c6951"/><path d="M79 185Q39 148 85 85Q87 124 107 124Q111 54 146 18Q142 95 176 117Q203 92 193 66Q244 157 180 193Z" fill="#d38b57"/><path d="M104 181Q91 145 122 116Q123 143 144 148Q153 114 166 106Q191 173 157 192Z" fill="#efd18a"/>',{nosplit:true,dyn:t=>({op:sin(cl((t-CUE.burn)/1.6)*PI),sc:.9+.05*sin(t*8)})}),
 pc(210,730,120,80,A.ashBowl(),{nosplit:true,dyn:t=>({op:sm((t-CUE.burn-.8)/.7)})})]});
const flowerCenters=[[77,150],[117,98],[171,158],[210,81],[257,55],[287,125],[352,88],[396,151],[361,207],[280,214],[202,215]];
const bloomAnim=(t,el,q)=>flowerCenters.forEach(([x,y],i)=>{const g=qs(el,q,`.b${i}`),u=sm((t-CUE.bloom-i*.14)/.75);g.setAttribute('opacity',u);g.setAttribute('transform',`translate(${x} ${y}) scale(${u}) translate(${-x} ${-y})`);});
spreads.push({hold:9.5,music:[[0,'gentle'],[CUE.cast,'none'],[CUE.bloom,'happy']],
 cam:{start:{d:520,tilt:60,cz:240,yaw:-5},keys:[[2.4,{d:450,tilt:60,cz:245,yaw:-2}],[5.4,{d:600,tilt:64,cz:285,yaw:4}]],end:{d:540,tilt:63,cz:270,yaw:5}},
 scene:A.scene('five','sakura'),ground:A.gMeadow({seed:51,pond:null})+'<path d="M1100 0Q860 200 1010 370Q1140 460 1440 450L1440 540Q1010 520 924 407Q800 220 1010 0Z" fill="#98bec0"/>',
 caption:['「かれきに はなを さかせましょう！」',[CUE.bloom+1,'はいを まくと、さくらが ぱあっと さきました。']],
 sfx:[[CUE.cast,'whoosh',{len:1.1}],[CUE.bloom,'magic',{len:2}],[CUE.bloom+1.4,'sparkle',{len:2.4}]],
 pieces:[...landscape(6),pc(340,475,460,470,A.sakura(true),{k:1.2,sway:.3,anim:bloomAnim}),
 person(-210,695,A.jii({armR:-110}),{k:1.12,anim:aArm('.aR',t=>-25-100*sm((t-CUE.cast+.4)/.6)+45*sm((t-CUE.cast-.4)/.6))}),
 person(-410,730,A.baa({armR:-50})),pc(-285,715,120,80,A.ashBowl(),{k:.65,lift:95}),
 ...Array.from({length:5},(_,i)=>pc(-120+i*30,650,35,25,'<circle cx="12" cy="12" r="8" fill="#e4ddd0"/><circle cx="26" cy="6" r="5" fill="#e4ddd0"/>',{nosplit:true,sh:false,dyn:t=>{const u=cl((t-CUE.cast-i*.09)/1.4);return {op:u>0&&u<1?sin(u*PI):0,dx:420*u,lift:160+280*u+90*sin(u*PI),sc:1+u};}})),
 ...petals(CUE.bloom+1.2)]});
spreads.push({hold:8.5,cam,music:[[0,'gentle'],[4.3,'happy']],scene:A.scene('six','end'),ground:A.gMeadow({seed:63,pond:null}),
 caption:['まねした おとなりさんの はいは、はなに なりません。','やさしい おじいさんは、はなさかじいさんと よばれました。'],
 sfx:[[CUE.imitate,'wind',{len:1.5}],[4.3,'chime',{vol:.25}],[6,'sparkle',{vol:.15}]],
 pieces:[...landscape(7,'#b9afa5'),pc(365,430,460,470,A.sakura(true),{k:.88,sway:.4}),pc(-440,420,460,470,A.sakura(false),{k:.5,sway:.3}),
 person(-455,690,A.neighbor({armR:-100}),{anim:aArm('.aR',t=>-35-70*sm((t-CUE.imitate+.3)/.5)+80*sm((t-CUE.imitate-.5)/.8))}),
 person(-130,655,A.lord({armR:-65})),person(180,735,A.jii({mouth:'big',armL:55})),person(355,750,A.baa({mouth:'smile'})),
 pc(-365,690,120,80,A.ashBowl(),{k:.6,lift:95}),
 ...Array.from({length:3},(_,i)=>pc(-350,670,60,40,A.puff(60,40,i),{nosplit:true,sh:false,dyn:t=>{const u=cl((t-CUE.imitate-i*.12)/1.3);return{op:u>0&&u<1?.6*sin(u*PI):0,dx:150*u,lift:140+80*sin(u*PI),sc:1+u};}})),
 pc(-80,675,58,36,A.koban(),{nosplit:true,dyn:t=>{const u=sm((t-4.3)/1.6);return {op:t>4.3?1:0,dx:220*u,lift:100+70*sin(u*PI)};}}),
 ...petals(5).slice(0,6)]});
finishBook();
