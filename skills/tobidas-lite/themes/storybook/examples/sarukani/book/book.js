// X は本の背からの距離、Y は奥から手前。動きと音は同じ場面内の秒数を使う。
const episodes = [];
const easeAt = (t, start, duration) => sm((t-start)/duration);
const poseJoint = (sel,x,y,angle) => (t,el,q) => rot(qs(el,q,sel),angle(t),x,y);
const showExpression = when => (t,el,q) => {
  const reacting=when(t);
  qs(el,q,'.mExpression').setAttribute('opacity',reacting?'1':'0');
  qs(el,q,'.mSmile').setAttribute('opacity',reacting?'0':'1');
};
const clawAction = amount => many(poseJoint('.pinchR',158,103,t=>amount(t)),poseJoint('.pinchL',70,103,t=>-amount(t)*.64));
const crab = (x,y,k,art={},motion={}) => pc(x,y,228,175,A.kani(art),{k,nosplit:true,sway:.45,...motion});
const monkey = (x,y,k,art={},motion={}) => pc(x,y,204,272,A.saru(art),{k,nosplit:true,sway:.35,...motion});
const fruit = (x,y,k,green,motion={}) => pc(x,y,72,72,A.kaki(green),{k,nosplit:true,...motion});
const grassTuft = (x,y,w,c,c2) => put('grass.short',x,y,{art:{w,h:w*.27,c,c2},sway:.8});
const rushes = (x,y,k,c,c2) => put('grass.susuki',x,y,{k,art:{c,c2},sway:1.4});
function hillside(name,seed) {
  const pal=villageSkies[name];
  return [put('hill.grass',0,52,{fold:8,art:{w:1380,h:217,c:pal[2],c2:pal[3],seed,f:1.18}}),
    put('hill.grass',0,167,{fold:8,art:{w:1380,h:120,c:pal[4],c2:pal[5],seed:seed+7,f:1.79}})];
}
const closeView = (from=-14,to=18) => ({
  start:{d:375,tilt:50,cx:from,cz:143,yaw:-2},
  end:{d:285,tilt:55,cx:to,cz:148,yaw:2}
});
const stream = {
  rice:1.5, seed:3.6, receive:4.85,
};
function exchange(t, start, dx, fromHeight, toHeight) {
  const u=easeAt(t,start,1.25);
  return {dx:dx*u,lift:lerp(fromHeight,toHeight,u)+45*sin(PI*u),rz:6*sin(PI*u)};
}
episodes.push({
  hold:7.7, music:'gentle', scene:A.satoyama('brook'),ground:A.storyGround('brook',31),
  caption:['おにぎりと かきのたねを、こうかんこ。',[stream.receive,'かには たねを もって かえりました。']],
  sfx:[[stream.rice+1.20,'pop',{vol:.32}],[stream.receive,'bell',{vol:.33}]],cam:closeView(),
  pieces:[
    ...hillside('brook',3),
    put('cloud.haze',-370,134,{art:{w:292,h:57,c:'#f8e9c9',c2:'#dbcba6'},lift:265,sh:false}),
    put('house.machiya',367,329,{k:.44,art:{c:'#efe0bf',c2:'#73877f',c3:'#ab6a45'},sway:.15}),
    put('tree.willow',-500,391,{k:.83,art:{c:'#5b8a70',c2:'#84a785'},sway:1.1}),
    put('bridge.log',-145,397,{k:.50,art:{c:'#95704b'},yaw:9}),
    put('rock.moss',-514,613,{k:.47,art:{c:'#7f9f74'}}),
    put('grass.reed',-364,594,{k:.39,art:{c:'#6a9878'}}),
    crab(-213,701,1.27,{}, {anim:clawAction(t=>-13*sin(PI*easeAt(t,stream.rice,1.25))+3*sin(t*2))}),
    monkey(229,677,1.17,{}, {anim:many(poseJoint('.mReach',84,164,t=>13*sin(PI*easeAt(t,stream.seed,1.25))),poseJoint('.mHead',113,138,t=>3*sin(t*1.5)))}),
    put('food.onigiri',-113,719,{k:.53,nosplit:true,dyn:t=>exchange(t,stream.rice,261,120,104)}),
    pc(160,729,56,50,A.kakiSeed(),{k:.88,nosplit:true,dyn:t=>exchange(t,stream.seed,-277,103,119)}),
    put('flower.wild',494,715,{k:.57,art:{fl:['#f9db88','#f0ad82']}}),
    rushes(-555,828,.48,'#84976a','#e1cf94'),
    grassTuft(538,846,185,'#779775','#96ae84'),
    grassTuft(-360,851,95,'#67967a','#90a885'),
  ],
});
const waterBeat = {tip:1.55,drop:2.1,shoot:4.05};
const gardenFence = (x,y,w=360) => put('fence.bamboo',x,y,{art:{w,h:96,c:'#b4a073'},sway:.18});
const gardenHouse = (x,y,k=.65) => pc(x,y,425,288,A.porch(),{k,sway:.14});
function wateringDrop(i) {
  const start=waterBeat.drop+i*.23;
  return pc(-88,677,20,27,A.raindrop(),{nosplit:true,sh:false,dyn:t=>{
    const u=cl((t-start)/.59);
    return {dx:156*u,lift:136*(1-u*u),op:u>0 && u<1 ? 1:0};
  }});
}
episodes.push({
  hold:7.7,music:'gentle',scene:A.satoyama('garden'),ground:A.storyGround('garden',51)
    + oval(806,676,145,60,'#ae8f62')+oval(806,674,110,42,'#997e58'),
  caption:['はやく めを だせ、かきのたね。','かには まいにち みずを あげました。'],
  cam:closeView(0,-15),sfx:[[waterBeat.drop+.55,'drop'],[waterBeat.shoot,'chime',{notes:[76,80,83],gap:.13}]],
  pieces:[...hillside('garden',7), gardenHouse(407,373,.83),gardenFence(-394,372,334),
    put('tree.bamboo',-555,375,{k:.50,art:{c:'#688969'}}),
    put('grass.flowers',-484,492,{art:{w:178,h:56,fl:['#edc881','#e2aa83']}}),
    crab(-249,683,1.36,{}, {anim:clawAction(t=>8+12*sin(PI*easeAt(t,waterBeat.tip,1.65)))}),
    put('tool.bucket',-105,678,{k:.57,art:{c:'#b08254'},nosplit:true,lift:83,dyn:t=>({lift:88+9*sin(PI*easeAt(t,waterBeat.tip,2.5)),rz:39*(easeAt(t,waterBeat.tip,.65)-easeAt(t,3.62,.85))})}),
    ...[0,1,2,3].map(wateringDrop),
    pc(86,690,120,117,A.sprout(),{k:1.26,sh:false,nosplit:true,dyn:t=>({sc:pop(t,waterBeat.shoot,1.15),op:t>waterBeat.shoot?1:0})}),
    put('rock.round',474,627,{k:.40,art:{c:'#a8a582'}}),
    put('flower.wild',392,716,{k:.62,art:{fl:['#e8bd67','#f5e4b0']}}),
    grassTuft(-536,845,164,'#80916b','#a5af76'),rushes(563,814,.44,'#9b9e66','#e7d390')],
});

const orchard = {start:1.00,branch:2.35,ripe:5.35};
function growingLeaves(t,el,q) {
  const spread=.16+.84*easeAt(t,orchard.branch,2.4);
  for(const [i,group] of qa(el,q,'.leafFan').entries()){
    group.setAttribute('transform',`scale(${F(spread)} ${spread.toFixed(3)}) rotate(${F((1-spread)*(i%2?42:-35))})`);
  }
  qa(el,q,'.fruitBud').forEach(group=>{
    const scale=pop(t,orchard.ripe+.22*Number(group.dataset.order),.55);
    group.setAttribute('transform',`scale(${scale.toFixed(3)})`);
  });
}
function persimmonTree(x,y,k,growing=false) {
  return [false,true].map((fore,i)=>pc(x,y+i*13,530,585,A.kakiTreeLayer(fore),{
    k,sh:!growing&&!fore,nosplit:true,sway:0,
    ...(growing ? {dyn:t=>({sc:.12+.88*easeAt(t,orchard.start,4.2)}),anim:growingLeaves}:{}),
  }));
}
episodes.push({
  hold:9.6,music:[[0,'gentle'],[orchard.start,'none'],[5.1,'airy']],
  ground:A.storyGround('harvest',52),scene:A.satoyama('harvest'),
  caption:['ぐんぐん のびて、おおきな きに。',[orchard.ripe+.25,'あまい かきが たくさん みのりました。']],
  sfx:[[orchard.start,'rise',{len:4.25}],[orchard.ripe,'pop',{vol:.36}],[orchard.ripe+1.05,'sparkle',{n:6,len:1.4,vol:.26}]],
  cam:{start:{d:300,tilt:49,cx:-20,cz:140,yaw:-3},keys:[[1.4,{d:295,tilt:50,cz:137,cx:-15}],[5.8,{d:568,tilt:62,cz:255,cx:70}]],
    end:{d:474,tilt:60,cz:232,cx:70,yaw:3}},
  pieces:[...hillside('harvest',7),gardenHouse(-437,368,.53),gardenFence(-374,445,329),
    put('cloud.haze',376,152,{art:{w:245,h:45,c:'#f8d799',c2:'#d2b783'},lift:280,sh:false}),
    ...persimmonTree(301,564,1.10,true),
    crab(-192,700,1.39,{}, {anim:clawAction(t=>-24*easeAt(t,orchard.start+1.4,2.4)+2*sin(t*2.3))}),
    put('tool.bucket',-393,698,{k:.53,art:{c:'#b78459'}}),
    put('tool.basket',466,703,{k:.48,art:{c:'#b89454'}}),
    put('rock.moss',531,564,{k:.39,art:{c:'#90925c'}}),
    rushes(-537,797,.6,'#998d5e','#ebce83'), grassTuft(509,818,155,'#858a51','#acaa71'),
    put('flower.wild',-384,826,{k:.39,art:{fl:['#ecd28b','#d68b65']}}),
    put('flower.wild',401,779,{k:.33,art:{fl:['#e4c479','#ebd197']}})],
});

const thrown = {release:2.95,hit:3.88,rest:4.75};
function greenFruitFlight(t) {
  const u=cl((t-thrown.release)/(thrown.hit-thrown.release));
  const v=cl((t-thrown.hit)/(thrown.rest-thrown.hit));
  return {dx:-303*u-84*v,dy:111*u+22*v,lift:lerp(372,160,u)+108*sin(PI*u)-157*v+37*sin(PI*v),rz:-153*u-114*v};
}
episodes.push({
  hold:8.0,music:'sad',scene:A.satoyama('cloud'),ground:A.storyGround('cloud',52),
  caption:['さるは かきを ひとりじめ。',[thrown.release,'あおい かきを なげて、かにに けがを させました。']],
  sfx:[[thrown.release,'whoosh',{len:.64}],[thrown.hit,'thud',{vol:.26,f0:131}],[thrown.rest,'drop']],
  cam:{start:{d:525,tilt:58,cz:210,cx:25,yaw:-3},keys:[[3.3,{d:437,tilt:57,cz:209,cx:-35}]],end:{d:355,tilt:53,cz:170,cx:-54,yaw:2}},
  pieces:[...hillside('cloud',7),gardenHouse(-465,350,.50),gardenFence(-394,419,307),
    put('cloud.haze',-287,175,{art:{w:370,h:53,c:'#c6cbbe',c2:'#a1aaa8'},lift:237,sh:false}),
    ...persimmonTree(256,518,.95),
    monkey(125,552,.85,{}, {sh:false,nosplit:true,lift:304,
      anim:many(poseJoint('.mReach',84,164,t=>-49*sin(PI*easeAt(t,thrown.release-.60,.9))+31*sin(PI*easeAt(t,thrown.release,.72))),poseJoint('.mHead',113,138,t=>-5))}),
    fruit(57,578,.78,true,{sh:false,dyn:greenFruitFlight}),
    crab(-243,691,1.29,{}, {dyn:t=>({op:t<thrown.hit?1:0}),anim:clawAction(t=>-6-4*sin(t*2))}),
    crab(-243,691,1.29,{hurt:true,bandage:false},{dyn:t=>({op:t>=thrown.hit?1:0,rz:9*easeAt(t,thrown.hit,.26)-3*easeAt(t,thrown.hit+.4,.5)})}),
    put('tool.basket',-406,694,{k:.49,art:{c:'#ac925f'}}),
    grassTuft(-524,765,195,'#78866a','#96a77c'),rushes(543,816,.58,'#838b69','#cabd93'),
    put('rock.moss',505,610,{k:.36,art:{c:'#8b976e'}}),
    put('flower.wild',351,805,{k:.38,art:{fl:['#dcc99b','#cca188']}})],
});

const chestnut = (x,y,k,motion={})=>pc(x,y,131,137,A.chestnut(),{k,nosplit:true,sway:.45,...motion});
const bee = (x,y,k,motion={})=>pc(x,y,150,106,A.bee(),{k,nosplit:true,sh:false,sway:.25,
  anim:poseJoint('.beeWings',82,53,t=>-13+14*sin(t*23)),...motion});
const mortar = (x,y,k,motion={})=>pc(x,y,156,197,A.mortar(),{k,nosplit:true,sway:.32,...motion});
const pat = (x,y,k,motion={})=>pc(x,y,150,87,A.dung(),{k,nosplit:true,sway:.36,...motion});
const childCrab = (x,y,k,phase=0) => crab(x,y,k,{child:true},{anim:clawAction(t=>3+5*sin(t*2+phase))});
const gather = 1.15;
function arrive(t,dx,delay=0) {
  const u=easeAt(t,gather+delay,2.05);
  return {dx:dx*u,lift:10*abs(sin(4*PI*u))};
}
episodes.push({
  hold:7.8, music:'gentle',scene:A.satoyama('dusk'),ground:A.storyGround('dusk',77),
  caption:['こがにたちの はなしを きいて、',[gather+1.8,'たのもしい なかまが あつまりました。']],
  sfx:[[gather,'steps',{n:3,gap:.30}],[gather+2.5,'bell',{vol:.31}]], cam:closeView(8,5),
  pieces:[...hillside('dusk',11),
    pc(-381,431,425,288,A.porch(),{k:.97,sway:.15}),
    gardenFence(391,407,350),put('tree.autumn',471,411,{k:.69,art:{c:'#a57649',c2:'#bd9264',c3:'#d0ad72'}}),
    crab(-376,606,.98,{hurt:true},{anim:clawAction(t=>2*sin(t*2))}),
    childCrab(-209,728,.68),childCrab(-77,767,.57,.9),
    chestnut(239,732,1.12,{dyn:t=>arrive(t,-138),anim:poseJoint('.nutBody',69,113,t=>6*sin(PI*easeAt(t,4.1,.72)))}),
    bee(320,595,1.06,{dyn:t=>({dx:-172*easeAt(t,gather,2.1),lift:165+12*sin(t*2.6)})}),
    pat(415,778,.77,{dyn:t=>arrive(t,-113,.6)}),
    mortar(554,635,1.20,{dyn:t=>arrive(t,-130,.30)}),
    put('rock.moss',-551,679,{k:.35,art:{c:'#8a8b76'}}),
    grassTuft(-539,835,155,'#868c6e','#a7a482'),rushes(533,841,.49,'#99906e','#e0bc8f'),
    put('flower.wild',-368,858,{k:.37,art:{fl:['#ddb18f','#edc680']}})],
});

const hiding = {nut:.75,bee:1.9,pat:3.2,usu:4.5};
function houseCorners(night) {
  return [put('tree.bamboo',-574,360,{k:.57,art:{c:night?'#718a79':'#80a083'}}),
    put('tree.bamboo',585,382,{k:.49,art:{c:night?'#607b70':'#639475'}}),
    put('rock.moss',548,681,{k:.36,art:{c:night?'#718576':'#91a078'}}),
    rushes(-557,806,.5,night?'#848b73':'#a09966',night?'#a99c7c':'#d6bf84'),
    grassTuft(541,829,128,night?'#727e68':'#89956a',night?'#8d9779':'#a6ab7b')];
}
const hearthAt = (x,y) => {
  const rack = line('M20 254 V8 H185 M22 45 L56 9','#735e46',10);
  return pc(x,y,340,260,rack+lib('room.irori'),{k:.67,sway:0,anim:LIB['room.irori'].o.anim});
};
const jarAt = (x,y) => pc(x,y,170,200,A.waterJar(),{k:.75,sway:0});
episodes.push({
  hold:7.9,music:'creepy',ground:A.doma(true),scene:A.satoyama('moon'),
  caption:['みんなで そっと さるの いえへ。',[hiding.pat+.1,'それぞれ かくれて、まちました。']],
  sfx:[[hiding.nut,'steps',{n:3,gap:.24}],[hiding.bee+1.05,'drop'],[hiding.usu+1.35,'knock',{n:2}]],
  cam:{start:{d:545,tilt:58,cz:199,yaw:-5},end:{d:457,tilt:59,cz:206,yaw:4}},
  pieces:[...A.monkeyHouse(true),...houseCorners(true),
    hearthAt(-318,685),jarAt(76,657),
    chestnut(-161,697,.82,{sh:false,dyn:t=>{
      const u=easeAt(t,hiding.nut,1.4);
      return {dx:-158*u,dy:-38*u,lift:140*sin(PI*u),sc:1-.65*u,op:1-easeAt(t,hiding.nut+1.14,.24)};
    }}),
    bee(-75,663,.82,{dyn:t=>{
      const u=easeAt(t,hiding.bee,1.32);
      return {dx:151*u,lift:lerp(157,121,u)+45*sin(PI*u),sc:1-.55*u,op:1-easeAt(t,hiding.bee+1.1,.2)};
    }}),
    pat(187,777,.80,{dyn:t=>{const u=easeAt(t,hiding.pat,1.47);return {dx:109*u,dy:-49*u,sc:1-.25*u};}}),
    mortar(412,696,.91,{sh:false,dyn:t=>{
      const u=easeAt(t,hiding.usu,1.38);
      return {dx:-111*u,dy:-360*u,lift:381*u+99*sin(PI*u),sc:1-.18*u,op:1-easeAt(t,hiding.usu+1.53,.38)};
    }}),
    childCrab(-480,735,.63)],
});

const dash = {pop:1.15,sting:3.55,slip:5.25,fall:6.80,land:7.62};
function startledRun(t) {
  const toJar=easeAt(t,dash.pop+.24,1.60), toDoor=easeAt(t,dash.sting+.08,1.63);
  const skid=easeAt(t,dash.slip,.52), retreat=easeAt(t,dash.fall+.10,.83);
  return {dx:262*toJar+179*toDoor+58*skid-135*retreat,
    lift:47*sin(PI*toJar)+57*sin(PI*toDoor)+46*sin(PI*skid)+25*sin(PI*retreat),
    rz:-12*sin(PI*toJar)+14*sin(PI*toDoor)+64*skid-56*retreat};
}
function poppedNut(t) {
  const u=cl((t-dash.pop)/1.02), v=easeAt(t,dash.pop+.95,.73);
  return {dx:108*u-180*v,dy:34*u,lift:33*(1-u)+291*sin(PI*u)+26*sin(PI*v),rz:18*sin(3*PI*u),
    sc:.42+.58*easeAt(t,dash.pop,.27),op:t>=dash.pop?1:0};
}
function flyingBee(t) {
  const enter=easeAt(t,dash.sting-.84,.81), leave=easeAt(t,dash.sting+.12,1.05);
  return {dx:14*enter-168*leave,lift:124+117*enter-66*leave+9*leave*sin(t*3),dy:60*enter,
    sc:.26+.82*enter,op:easeAt(t,dash.sting-.86,.15)};
}
function fallingMortar(t) {
  const u=cl((t-dash.fall)/(dash.land-dash.fall));
  const bounce=sin(PI*easeAt(t,dash.land,.4));
  return {dx:94*u,dy:385*u,lift:403*(1-u*u)+19*bounce,rz:-6*sin(PI*u)+3*bounce,
    sc:.82+.30*u,op:easeAt(t,dash.fall-.36,.28)};
}
const beeHum = (S,t) => S.noise(t,.38,u=>850-230*u,u=>.09*sin(PI*u)*(1+.38*sin(54*PI*u)));
function landingDust(x,dir) {
  return pc(x,746,100,49,A.puff(100,49,dir+5),{nosplit:true,sh:false,flt:false,
    dyn:t=>{const u=cl((t-dash.land)/.63);return {op:.86*sin(PI*u),dx:dir*53*u,lift:8+14*u,sc:.32+u};}});
}
episodes.push({
  hold:9.8,music:[[0,'chase'],[dash.pop-.24,'none'],[dash.pop+1.45,'chase'],[dash.fall-.21,'none'],[dash.land+.45,'gentle']],
  scene:A.satoyama('dawn'),ground:A.doma(false),
  caption:[[dash.pop-.40,'ぱちん！ ちくり！ すってん、どすん！'],[dash.land-.46,'さるは びっくり、おおあわて。']],
  sfx:[[dash.pop,'pop',{vol:.77}],[dash.sting-.25,beeHum],[dash.sting,'tick'],[dash.slip,'whoosh',{len:.50}],
    [dash.fall,'fall',{gap:.10}],[dash.land,'crash',{vol:.63}]],
  shake:t=>{const u=t-dash.land;return u>=0&&u<.65?[3.6*Math.exp(-6*u)*sin(50*u),7*Math.exp(-6*u)*sin(50*u)]:[0,0];},
  cam:{start:{d:529,tilt:59,cz:192,cx:-32,yaw:-4},keys:[[2.3,{d:405,tilt:54,cz:175,cx:-70,yaw:-2}],
    [5.5,{d:417,tilt:55,cz:180,cx:77,yaw:2}],[7.05,{d:548,tilt:61,cz:225,cx:95,yaw:3}]],
    end:{d:455,tilt:55,cz:160,cx:74,yaw:4}},
  pieces:[...A.monkeyHouse(false),...houseCorners(false),hearthAt(-318,685),jarAt(76,657),
    chestnut(-318,692,.88,{dyn:poppedNut}),
    bee(76,670,1.0,{dyn:flyingBee}),pat(296,730,.63),
    monkey(-183,741,1.03,{face:'oops'}, {dyn:startledRun,
      anim:many(showExpression(t=>t>=dash.pop),poseJoint('.mReach',84,164,t=>36*sin(PI*easeAt(t,dash.pop,.66))+63*easeAt(t,dash.sting,.25)),
        poseJoint('.mBackArm',150,151,t=>-46*easeAt(t,dash.slip,.36)),poseJoint('.mHead',113,138,t=>-7*sin(t*4)*easeAt(t,dash.pop,.4)))}),
    mortar(310,336,.98,{sh:false,dyn:fallingMortar}),landingDust(400,-1),landingDust(442,1),childCrab(-499,751,.62)],
});

const feast = {bow:.8,offer:3.05,share:4.65};
const happyBow = t=>easeAt(t,feast.bow,.72)-easeAt(t,feast.bow+1.10,.80);
episodes.push({
  hold:8.0,music:'happy',ground:A.storyGround('feast',52)+A.picnicMat(),scene:A.satoyama('feast'),
  caption:['「ごめんなさい」と さるが ぺこり。',[feast.offer+.2,'げんきに なった かにと、かきを わけました。']],
  sfx:[[feast.share,'bell',{vol:.31}],[feast.share+.53,'sparkle',{len:1.18,n:5,vol:.25}]],
  cam:{start:{d:520,tilt:55,cz:174,cx:7,yaw:-3},end:{d:360,tilt:55,cz:166,cx:-4,yaw:2}},
  pieces:[...hillside('feast',7),
    ...persimmonTree(-313,418,.81),
    gardenFence(370,366,355),gardenHouse(475,308,.37),
    chestnut(-445,672,.88,{anim:poseJoint('.nutBody',69,113,t=>4*sin(t*2.6))}),
    bee(-475,576,.82,{dyn:t=>({lift:180+7*sin(t*2.1),dx:13*sin(t*.88)})}),
    mortar(381,568,.96),pat(504,703,.63),
    crab(-157,709,1.30,{}, {anim:clawAction(t=>-11*easeAt(t,feast.offer+.65,.8)+2*sin(t*2.6))}),
    monkey(185,686,1.14,{face:'bow'}, {dyn:t=>({rz:-19*happyBow(t)}),
      anim:many(showExpression(t=>t<feast.offer-.12),poseJoint('.mHead',113,138,t=>-16*happyBow(t)),poseJoint('.mReach',84,164,t=>14*easeAt(t,feast.offer,.65)))}),
    fruit(89,721,.84,false,{dyn:t=>exchange(t,feast.offer,-135,96,128)}),
    childCrab(-358,791,.65,.4),childCrab(-206,827,.54,1.1),
    pc(343,767,200,160,A.fruitBasket(),{k:.67,sway:0}),
    put('flower.wild',-528,803,{k:.50,art:{fl:['#e1a25b','#f4dea6']}}),
    rushes(558,814,.47,'#95976a','#e2cb89'),grassTuft(473,866,100,'#919963','#a3b07b')],
});

Tobidas.book({
  title:'さるかに がっせん｜とびだすえほん',lang:'ja',
  theme:{style:'kirigami',board:'#b85635',spine:'#204e48',paper:'#f4e5bd',desk:{base:'meadow',scene:A.satoyama('binding'),light:'255,231,183'}},
  sound:{set:'wafu'}, cover:A.cover(),end:{title:'おしまい',sub:'さるかに がっせん'},
  spreads:episodes,
});
