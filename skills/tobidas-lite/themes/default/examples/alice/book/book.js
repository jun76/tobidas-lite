const MOMENT={shrink:1.6,grow:4.4,normal:7.5,vanish:3.8,cards:2.4,wake:5.7};
const turnArm=(t,el,q)=>{rot(qs(el,q,'.arm'),8*sin(t*1.8),106,125);rot(qs(el,q,'.head'),3*sin(t*1.1),76,113);};
const alice=(x,y,o={})=>pc(x,y,150,280,A.alice(),{k:.86,nosplit:true,anim:turnArm,...o});
const rabbit=(x,y,o={})=>pc(x,y,140,240,A.rabbit(),{k:.78,nosplit:true,...o});
const greens=(seed=1)=>[
 put('bush.flower',-550,820,{k:.65,art:{c:'#527e6d',c2:'#6d9175',c3:'#e2ad9b'}}),
 put('grass.flowers',490,840,{k:.65,art:{fl:['#f1d493','#d38a95','#eae3c4']}}),
 put('flower.wild',-280,840,{k:.5,art:{fl:['#e9c77e','#f3deba']}}),
 put('bush.round',600,600,{k:.5,art:{c:'#4a786e',c2:'#739483'}}),
 put('food.mushroom',-580,610,{k:.35,art:{c:seed%2?'#b66679':'#aa8254'}}),
 put('flower.wild',310,370,{k:.45,art:{fl:['#c6b7d2','#eee2b8']}}),
];
const hills=()=>pc(0,130,1360,240,A.hills(1360,240,'#8daeb0','#94b89b',12,.9),{fold:12,sh:false});
const camera={start:{d:430,tilt:58,cz:180,yaw:-3},end:{d:390,tilt:58,cz:180,yaw:3}};
const spreads=[];
spreads.push({hold:8,music:'airy',scene:A.scene('river'),ground:A.gMeadow({seed:17,pond:[950,370]}),cam:camera,
 caption:['「たいへん、ちこくしちゃう！」','しろうさぎを おって、アリスは あなの なかへ。'],sfx:[[1,'tick'],[3,'steps',{n:3,gap:.4}],[6.5,'fall',{gap:.08}]],
 pieces:[hills(),put('tree.willow',-450,390,{k:1.05,art:{c:'#6b987e'}}),put('tree.round',440,370,{art:{c:'#577f73',c2:'#799a7d',c3:'#9cb18a'}}),put('out.cave',390,495,{k:.56,art:{c:'#766778'}}),alice(-240,680,{dyn:t=>({dx:115*sm((t-1)/5),lift:4*abs(sin(t*3))})}),rabbit(170,640,{dyn:t=>({dx:165*sm((t-1)/5),lift:15*abs(sin(t*3)),op:1-sm((t-6.6)/1)})}),...greens(),put('grass.reed',-560,430,{k:.45,art:{c:'#b5b584'}}),put('bush.berry',520,490,{k:.5,art:{c:'#527f70',c3:'#bb7587'}}),fly(-370,740,'#e5ba74',0),bird(-120,210,300,24,0,'#7991a0') ]});
spreads.push({hold:10,music:'night',scene:A.scene('hall'),ground:A.gFloor(),
 cam:{start:{d:430,tilt:61,cz:190},keys:[[4.4,{d:540,tilt:65,cz:240}],[6.4,{d:700,tilt:66,cz:300}]],end:{d:440,tilt:61,cz:200}},
 caption:['ちいさく なったり、おおきく なったり。','「わたし、どうなっちゃったの？」'],sfx:[[MOMENT.shrink,'magic'],[MOMENT.grow,'rise',{len:2}],[MOMENT.normal,'magic']],
 pieces:[pc(0,170,1320,370,`<path d="M8 370V40Q330 0 660 40Q990 0 1312 40V370Z" fill="#709799"/><path d="M20 60Q330 22 660 60Q990 22 1300 60M20 330H1300" fill="none" stroke="#d2bd84" stroke-width="13"/>${[130,375,840,1085].map(x=>`<path d="M${x} 320V180Q${x+65} 95 ${x+130} 180V320Z" fill="#45646e"/>`).join('')}`,{fold:12,sh:false}),
 put('room.door',350,450,{k:.6,art:{c:'#d4ab65'}}),put('room.curtain',-520,370,{k:.72,art:{c:'#8f627c'}}),put('room.curtain',520,370,{k:.72,art:{c:'#8f627c'}}),
 alice(-220,700,{dyn:t=>({sc:1-.62*sm((t-MOMENT.shrink)/1.2)+1.65*sm((t-MOMENT.grow)/2)-1.03*sm((t-MOMENT.normal)/1.1)}),anim:(t,el,q)=>{rot(qs(el,q,'.arm'),-35*sm((t-MOMENT.grow)/1.5)+8*sin(t*2),106,125);rot(qs(el,q,'.head'),-9*sm((t-MOMENT.grow)/2),76,113);}}),
 pc(300,640,500,175,A.teaTable(),{k:.65}),put('food.bottle',240,626,{k:.45,lift:110,art:{c:'#59a3a3'}}),put('food.cake',370,626,{k:.37,lift:110,art:{c:'#eab0b1'}}),put('item.key',450,650,{k:.32,art:{c:'#e6b950'}}),
 put('room.clock',-480,440,{k:.65,art:{c:'#8b715d'}}),put('room.vase',540,700,{k:.4,art:{c:'#65878c'}}),
 ...[-410,-100,130,470].map((x,i)=>twinkle(x,760,90+i*20,i,7,'#e5c277'))]});

spreads.push({hold:8,music:'night',scene:A.scene('forest'),ground:A.gMeadow({seed:32,pond:null}),cam:camera,
 caption:['「どちらへ いけば いいの？」','ねこは にやり。わらいがおだけ のこりました。'],sfx:[[1.3,'bell'],[MOMENT.vanish,'magic',{len:2}]],
 pieces:[pc(0,140,1360,250,A.hills(1360,250,'#9d9ab5','#8d93a4',4,.8),{fold:12,sh:false}),put('tree.round',-470,380,{k:1.1,art:{c:'#78718d',c2:'#9c8fa4',c3:'#b3a4b8'}}),put('tree.bare',360,420,{k:1.1,art:{c:'#776579'}}),
 pc(330,425,340,65,'<path d="M0 60Q150 41 320 4L337 21Q151 72 0 65Z" fill="#776579"/>',{lift:235}),
 pc(330,435,280,210,A.cat(),{k:.85,lift:240,nosplit:true,sh:false,anim:(t,el,q)=>{qs(el,q,'.catbody').setAttribute('opacity',1-sm((t-MOMENT.vanish)/1.7));rot(qs(el,q,'.tail'),7*sin(t*1.7),193,151);}}),alice(-170,710),
 ...greens(2),put('food.mushroom',-420,590,{k:.9,art:{c:'#a56b83'}}),put('food.mushroom',110,510,{k:.55,art:{c:'#9c8db0'}}),put('out.signpost',-100,390,{k:.6,art:{c:'#aa8c78'}}),fly(490,740,'#cfa6bd',1),twinkle(250,470,360,1,8,'#d6cba2') ]});

spreads.push({hold:8,music:'happy',scene:A.scene('tea'),ground:A.gMeadow({seed:43,pond:null}),cam:camera,
 caption:['「さあ、おちゃを どうぞ！」','へんてこな おちゃかいは、いつまでも おわりません。'],sfx:[[1.3,'bell'],[3.3,'snore',{n:1}],[6,'tick']],
 pieces:[hills(),put('tree.round',-490,360,{art:{c:'#6e8f84',c2:'#93a38b',c3:'#b6b99c'}}),put('tree.autumn',490,350,{k:.9,art:{c:'#b68d8e',c2:'#c9a18e',c3:'#dbc5a2'}}),
 pc(130,520,160,280,A.hatter(),{k:.92,nosplit:true,anim:(t,el,q)=>rot(qs(el,q,'.hatarm'),-12+10*sin(t*1.6),100,139)}),
 pc(445,520,140,240,A.rabbit(true),{k:.85,nosplit:true}),
 pc(290,660,500,175,A.teaTable()),alice(-230,700),
 pc(315,640,115,90,A.teapot(),{k:.75,lift:153}),
 put('food.teacup',130,650,{k:.33,lift:153}),put('food.teacup',450,650,{k:.3,lift:153}),put('food.cake',245,650,{k:.3,lift:153,art:{c:'#d8a7b1'}}),
 put('tiny.mouse',375,637,{k:.42,lift:155,art:{c:'#aa8d83'},anim:(t,el,q)=>rot(qs(el,q,'.hd'),7+3*sin(t*1.2),110,50)}),
 pc(385,640,90,45,`<text x="5" y="35" font-family='${FONT}' font-size="28" fill="#7f637d">すう</text>`,{lift:230,sh:false,nosplit:true,dyn:t=>({lift:235+15*sin(t),op:.6+.3*sin(t)})}),
 ...[0,1].map(i=>pc(312+i*14,635+i,45,90,`<path d="M21 83Q2 60 25 44T21 4" fill="none" stroke="#f3e7d2" stroke-width="7"/>`,{lift:215,flt:false,sh:false,nosplit:true,dyn:t=>({lift:215+18*sin(t*1.3+i),op:.45+.2*sin(t*1.3+i)})})),
 ...greens(),put('now.watch',-410,540,{k:.42,art:{c:'#d4b277'}})]});

spreads.push({hold:8,music:'creepy',scene:A.scene('garden'),ground:A.gMeadow({seed:54,pond:null}),cam:camera,
 caption:['しろい バラを、あかく ぬろう。','そこへ、ハートの じょおうが やってきました。'],sfx:[[1.3,'pop'],[3,'steps',{n:4}],[5.3,'bell']],
 pieces:[hills(),put('fence.hedge',-365,350,{art:{w:570,h:190,c:'#548477'}}),put('fence.hedge',365,350,{art:{w:570,h:190,c:'#648775'}}),
 pc(0,260,500,340,'<path d="M25 340V130Q250 -80 475 130V340H425V150Q250 -10 75 150V340Z" fill="#b5ac83"/><path d="M240 330V80M145 330V110M335 330V110M95 240H405" fill="none" stroke="#d8bd7c" stroke-width="12"/>',{fold:12}),
 ...[-450,-270].map((x,i)=>pc(x,520,200,230,lib('flower.rose',{c:'#fff0d5'})+`<g class="red">${lib('flower.rose',{c:i?'#cb5671':'#b94259'})}</g>`,{k:.85,anim:(t,el,q)=>qs(el,q,'.red').setAttribute('opacity',sm((t-1.3-i*.65)/1.2))})),
 ...[-530,-60,450].map((x,i)=>pc(x,680-i*50,100,160,A.card(i===1?'♣':'♥',true),{k:1,nosplit:true,dyn:t=>({rz:3*sin(t*2+i)})})),
 pc(260,650,180,280,A.queen(),{k:1.08,nosplit:true,anim:(t,el,q)=>rot(qs(el,q,'.fan'),12*sin(t*2),119,141),dyn:t=>({dx:-65*sm((t-2.8)/2.2)})}),alice(-240,780,{k:.8}),
 put('tool.bucket',-390,720,{k:.35,art:{c:'#ab5b70'}}),...greens(2),put('flower.rose',510,510,{k:.7,art:{c:'#c76b83'}})]});

const waking=t=>sm((t-MOMENT.wake)/1.4);
const dream=t=>({op:1-waking(t)});
const wake=t=>({op:waking(t)});
spreads.push({hold:11,music:[[0,'chase'],[5.4,'none'],[6.2,'gentle']],
 scene:{svg:`<g class="courtScene">${A.sceneArt('court')}</g><g class="riverScene">${A.sceneArt('river')}</g>`,blur:4,anim:(t,el,q)=>{const u=waking(Tobidas.t-Tobidas.TL.open(6));qs(el,q,'.courtScene').setAttribute('opacity',1-u);qs(el,q,'.riverScene').setAttribute('opacity',u);}},
 ground:A.gMeadow({seed:17,pond:[950,370]}),
 cam:{start:{d:730,tilt:62,cz:250,yaw:-7},keys:[[4.8,{d:800,tilt:63,cz:280,yaw:6}],[7.8,{d:440,tilt:58,cz:180,yaw:2}]],end:{d:390,tilt:58,cz:180,yaw:0}},
 caption:[[.4,'「あなたたち、ただの トランプじゃない！」'],[6.3,'めを あけると、そこは おねえさんの ひざの うえ。']],
 sfx:[[MOMENT.cards,'whoosh',{len:2}],[MOMENT.wake,'wind',{len:2.5}],[7.2,'chime',{notes:[76,79,84],gap:.2}]],
 pieces:[
 ...terrace({X:0,Y:580,fold:-28,step:85,dyn:dream,tiers:[
 {w:860,h:70,d:85,top:'#bc9d88',art:(w,h)=>`<rect width="${w}" height="${h}" fill="#92747b"/><path d="M0 10H${w}" stroke="#dec690" stroke-width="9"/>`},
 {w:680,h:200,d:85,top:'#d3b193',art:(w,h)=>`<rect width="${w}" height="${h}" fill="#836276"/><path d="M10 15H${w-10}V190H10Z" stroke="#d1b279" stroke-width="9" fill="none"/>${[120,300,480].map(x=>`<path d="M${x} 65C${x-38} 30 ${x-50} 80 ${x} 110C${x+50} 80 ${x+38} 30 ${x} 65" fill="#b96a7c"/>`).join('')}`},
 {w:460,h:340,top:false,art:(w,h)=>`<path d="M10 340V65L80 15L230 45L380 15L450 65V340Z" fill="#9d5169"/><path d="M25 340V75L83 33L230 63L377 33L435 75V340" stroke="#e0be73" stroke-width="12" fill="none"/><path d="M50 65Q170 100 100 330M410 65Q290 100 360 330" stroke="#c17d8e" stroke-width="36" fill="none"/>`}
 ]}),
 pc(120,455,180,280,A.queen(),{k:.65,lift:200,nosplit:true,dyn:dream,anim:(t,el,q)=>rot(qs(el,q,'.fan'),9*sin(t*2),119,141)}),
 alice(-390,735,{k:1.05,dyn:t=>({op:1-waking(t),sc:1+.2*sm(t/2)}),anim:(t,el,q)=>rot(qs(el,q,'.arm'),-50*sm(t/2),106,125)}),
 ...Array.from({length:10},(_,i)=>{const side=i%2?-1:1;return pc(side*(300+(i%3)*110),650+(i%2)*60,100,160,A.card(['♥','♠','♦','♣'][i%4],true),{k:.7,nosplit:true,dyn:t=>{const u=sm((t-MOMENT.cards-i*.055)/1.4),a=t*2+i*.68;return {dx:u*(105*sin(a)-side*90),dy:u*55*cos(a),lift:u*(160+(i%4)*65+55*sin(a)),rz:u*(25*sin(a)+i*14),op:(1-waking(t))};}});}),
 pc(0,130,1360,240,A.hills(1360,240,'#8daeb0','#94b89b',12,.9),{fold:12,sh:false,dyn:wake}),
 put('tree.willow',-450,300,{k:1.05,art:{c:'#6b987e'},dyn:wake}),put('tree.round',440,300,{art:{c:'#577f73',c2:'#799a7d',c3:'#9cb18a'},dyn:wake}),
 pc(180,710,340,280,A.waking(),{k:1.15,nosplit:true,dyn:wake,anim:(t,el,q)=>{const u=sm((t-7.4)/.5);qs(el,q,'.sleepEyes').setAttribute('opacity',1-u);qs(el,q,'.wakeEyes').setAttribute('opacity',u);}}),
 ...greens().slice(0,4).map(p=>({...p,dyn:wake})),
 put('item.book',-170,730,{k:.5,art:{c:'#866a82'},dyn:wake})
 ]});

Tobidas.book({title:'不思議な国のアリス — とびだすえほん',lang:'ja',theme:{board:'#244c57',spine:'#183542',style:'flat',desk:{base:'forest',scene:A.scene('river')}},sound:{set:'march'},cover:A.cover(),end:{title:'おしまい',sub:'ふしぎな ゆめは、また いつか。'},spreads});
