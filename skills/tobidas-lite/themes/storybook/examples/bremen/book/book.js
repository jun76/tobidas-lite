const stackTimes=[0,1.2,2.55,3.85], chorus=5.45, fright=4.35;
const customScore=!new URLSearchParams(location.search).get('set');
const spreads=[];
const prop=(name,x,y,k,art={},opts={})=>put(name,x,y,{k,art,...opts});
const smooth=(t,start,duration)=>sm((t-start)/duration);
function animal(name,x,y,k,options={}){
 const b=beasts[name], {call=false,flip=false,rest:resting=false,...rest}=options;
 const hinge={donkey:[262,108],dog:[185,59],cat:[135,57],rooster:[106,42]}[name];
 const anim=(t,el,q)=>{
  const sing=call?smooth(t,chorus,.12)*(1-smooth(t,chorus+1.1,.27)):0;
  rot(qs(el,q,'.jaw'),sing*(18+8*Math.sin(t*21)),...hinge);
  if(name==='donkey')rot(qs(el,q,'.ear'),5*Math.sin(t*2.1),229,67);
  if(name==='rooster')rot(qs(el,q,'.wing'),10*Math.sin(t*3.2),74,67);
  if(resting){const u=smooth(t,2,1.1); qs(el,q,'.openEye').setAttribute('opacity',1-u); qs(el,q,'.sleepEye').setAttribute('opacity',u);}
  if(name==='dog')rot(qs(el,q,'.tail'),11*Math.sin(t*4),57,78);
 };
 const art=flip?'<g transform="translate('+b.w+' 0) scale(-1 1)">'+b.art()+'</g>':b.art();
 return pc(x,y,b.w,b.h,art,{k,nosplit:true,sway:.3,anim,...rest});
}
const camera={start:{d:450,tilt:57,cz:200,yaw:-2},end:{d:405,tilt:58,cz:204,yaw:2}};
function verge(i){
 const dark=i>=3;
 return [
 pc(0,100,1380,214,A.hills(1380,214,dark?'#858799':'#9eb69b',dark?'#657d80':'#8fa982',10+i,1),{fold:11,sh:false}),
 prop('conifer.fir',-593,330,.50,{c:dark?'#526c69':'#70927c'}),
 prop('conifer.pine',560,340,.60,{c:dark?'#5d7775':'#698970'}),
 prop('bush.flower',-566,779,.71,{c:'#536e5e',c2:'#789276',c3:dark?'#b38990':'#dba892'}),
 prop('grass.short',568,795,.64,{c:'#78835b',c2:'#9aa471'}),
 prop('flower.wild',-405,838,.35,{fl:['#e8b362','#e3cfab']}),
 prop('grass.short',475,530,.32,{c:'#678471'}),prop('bush.round',-532,520,.44,{c:'#556f62',c2:'#789780'})
 ];
}
function page(i,music,caption,pieces,sfx=[],extra={}){
 const outdoor=i<=4;
 let ground=outdoor?A.gMeadow({seed:31*i,night:i>=3,pond:null}):A.gFloor();
 if(outdoor)ground=ground.replaceAll('#a8d672','#b6bb86').replaceAll('#bfe58a','#cad09c').replaceAll('#8cc35a','#a4af7c');
 spreads.push({hold:7.8,ground,scene:scenery(i),music:customScore?'none':music,caption,pieces,sfx,cam:camera,...extra});
}
const hoof=(S,t)=>S.thud(t,.55,130,.12);
page(1,'bright',['Der alte Esel spitzt die Ohren.','„In Bremen werde ich Musikant!“'],[
 ...verge(1),prop('out.windmill',-330,440,.90,{c:'#e4c591'}),
 prop('fence.wood',-325,565,.62,{c:'#9a744d'}),
 prop('grass.susuki',-557,600,.50,{c:'#988449',c2:'#d8b76e'}),
 prop('grass.susuki',-162,565,.36,{c:'#9a8b51',c2:'#deb968'}),
 prop('tree.fruit',413,434,.83,{fruit:'#ca7858'}),
 animal('donkey',145,720,1.26,{dyn:t=>({dx:97*smooth(t,2.2,3.6),lift:6*Math.abs(Math.sin(t*4))*smooth(t,2,.3)*(1-smooth(t,5.5,.4))})}),
 prop('flower.wild',421,810,.5,{fl:['#edc973','#c38b81']})],[[.26,hoof],[.64,hoof]]);
const hop=(t,from,duration,x,height,startLift=0)=>{
 const u=smooth(t,from,duration);
 return {dx:x*u,lift:startLift*(1-u)+height*Math.sin(Math.PI*u)};
};
page(2,'happy',['„Kommt mit nach Bremen!“, ruft der Esel.','Der Hund wedelt. Die Katze springt von der Mauer.'],[
 ...verge(2),prop('tree.round',-410,390,.78,{c:'#69917b',c2:'#91a777',c3:'#b4b87c'}),
 prop('house.stone',357,345,.49,{c:'#f2d8ac',c2:'#a85544'}),
 prop('fence.hedge',-295,535,.93,{c:'#629366'}),
 prop('fence.stone',350,550,.87,{c:'#9e9c90'}),
 animal('donkey',-353,715,1.15),animal('dog',140,725,1.02,{flip:true}),
 animal('cat',400,570,.96,{flip:true,dyn:t=>({...hop(t,3.3,1.05,-63,85,96),dy:150*smooth(t,3.3,1.05)})})
 ],[[.5,hoof],[4.35,(S,t)=>S.voice.pizz(t,72,.7)]]);
const lookout=3.25;
page(3,'airy',['„Ich komme mit!“, kräht der Hahn.','„Schaut mal! Da hinten brennt ein Licht!“'],[
 ...verge(3),prop('tree.bare',-307,475,.96,{c:'#765f52'}),
 prop('conifer.fir',456,418,.81,{c:'#4e696a'}),
 prop('house.stone',240,400,.69,{c:'#ac9f8c',c2:'#735a54',night:true}),
 pc(240,407,33,43,shape('M1 1h31v41H1Z','#ffd480')+stroke('M16 0v42M1 19h31','#785f50',3),{lift:101,glow:12,glowC:'#ffd196',sh:false,nosplit:true,dyn:t=>({op:smooth(t,lookout,.7)})}),
 animal('rooster',-287,485,1.02,{lift:256,dyn:t=>({rz:4*Math.sin(t*5)*(1-smooth(t,2,.5))})}),
 animal('donkey',-279,762,.98),animal('dog',120,733,.9,{flip:true}),animal('cat',306,760,.9,{flip:true})
 ],[[.65,(S,t)=>S.voice.fife(t,79,.65,0,.32)],[lookout,(S,t)=>S.voice.harp(t,84,.6)]]);
function windowHouse(){
 const frame=shape('M8 300V10H462V300H434V37H35V300Z','#7a4835')+
 shape('M8 238H462V302H8Z','#c49568')+
 stroke('M23 247H447 M21 282H448','#a77454',4)+
 shape('M0 229H470V244H0Z','#f1c58c');
 const roof=shape('M12 140L259 7 506 140 484 155H36Z','#994e40')+
 stroke('M37 136L259 20 478 137','#e2a16f',8);
 return terrace({X:295,Y:536,step:59,tiers:[
  {w:470,h:52,art:shape('M2 1H468V52H2Z','#a17e65'),top:'#c2a489'},
  {w:470,h:302,art:frame,top:false},
  {w:518,h:392,art:shape('M38 136h442v256H38Z','#f3cc8e')+stroke('M50 152L130 229 M466 152L387 229 M258 140v252','#ce9963',12)+roof,top:false}
 ]});
}
function towerUnit(name,i){
 const size=[1.08,.94,.86,.78][i], heights=[0,151,235,294];
 const targetX=[-175,-190,-197,-194][i], starts=[0,-290,-350,-380];
 return animal(name,targetX,692+2*i,size,{sh:i===0,call:true,dyn:t=>{
  const u=i?smooth(t,stackTimes[i],.78):1;
  return {dx:starts[i]*(1-u),lift:heights[i]*u+(i?83*Math.sin(Math.PI*u):0)};
 }});
}
const bandit=(x,y,k,shirt,options={})=>prop('foe.thief',x,y,k,{top:shirt,bottom:'#495658',armR:-64,armL:27},options);
const scatter=(n)=>t=>{const u=smooth(t,chorus+.15+n*.16,1.04);return {dx:(n?221:288)*u,lift:68+28*Math.sin(Math.PI*u),op:1-smooth(t,chorus+.81+n*.16,.45)}};
const chairCrash=(S,t)=>{S.thud(t,.85,100,.18);S.thud(t+.12,.45,185,.12)};
const voices=(S,t)=>{
 S.tone(t,48,.12,.65,-.3,{harm:[1,.65,.28],vib:.012});
 S.tone(t+.05,55,.10,.24,-.1,{harm:[1,.7,.4]});S.tone(t+.32,55,.08,.18,-.1);
 S.tone(t+.08,64,.07,.59,.12,{harm:[1,.4,.2],vib:.015});
 S.voice.fife(t+.10,79,1.2,.35,.51);S.voice.fife(t+.64,84,.9,.35,.34);
};
page(4,'bright',[[chorus,'„I-a! Wau! Miau! Kikeriki!“'],[chorus+1,'Die Räuber springen auf und rennen in den Wald.']],[
 ...verge(4),...windowHouse(),
 bandit(210,454,.89,'#86514b',{nosplit:true,dyn:scatter(0)}),
 bandit(363,452,.86,'#687657',{nosplit:true,dyn:scatter(1)}),
 prop('chair.wood',433,459,.44,{c:'#83583e'},{nosplit:true,dyn:t=>({rz:55*smooth(t,chorus+.3,.5),lift:30})}),
 prop('table.dining',297,466,.58,{c:'#bc6550',c2:'#eed09b'}),
 prop('food.bread',284,469,.30,{}, {lift:119}),
 ...['donkey','dog','cat','rooster'].map(towerUnit)
 ],[...stackTimes.slice(1).map((t,i)=>[t+.78,(S,at)=>S.voice.pizz(at,[60,64,67][i],1)]),[chorus,voices],[chorus+.38,chairCrash]],
 {hold:9.2,cam:{start:{d:477,tilt:59,cz:196,yaw:-4},keys:[[4.6,{d:410,tilt:61,cz:257,yaw:1}]],end:{d:429,tilt:60,cz:248,yaw:3}}});
function interior(night){
 const wall=night?'#666d6d':'#deb888',trim=night?'#4f5553':'#a57e59';
 const boards='<rect width="1360" height="319" fill="'+wall+'"/>'+Array.from({length:11},(_,i)=>stroke('M'+(i*136)+' 0v319',trim,5)).join('')+shape('M0 285h1360v34H0Z',trim);
 return [pc(0,175,1360,319,boards,{fold:11,sh:false}),
 prop('room.window',380,351,.86,{c:trim,c2:night?'#6e787f':'#90a49a'}),
 prop('room.door',-466,397,.98,{c:night?'#635d52':'#9b754d'},{nosplit:true,dyn:t=>({yaw:night?48*smooth(t,.25,1.15):14})}),
 prop('room.chest',535,498,.48,{c:night?'#60574d':'#aa7952'}),
 prop('tool.pot',569,531,.31,{c:night?'#686e6c':'#779289'}),
 prop('room.clock',-220,402,.57,{c:night?'#615246':'#906a48'}),
 prop('room.picture',-98,360,.42,{}, {lift:145}),
 prop('chair.wood',-481,628,.58,{c:night?'#635951':'#ad875d'})];
}
const brightEyes='<g class="blink">'+oval(31,17,9,6,'#ffe887')+oval(65,17,9,6,'#ffe887')+oval(32,17,2,5,'#484946')+oval(64,17,2,5,'#484946')+'</g>';
const darkHearth=shape('M22 0H280V116H22Z','#68625b')+shape('M4 111H302V135H4Z','#504c49')+shape('M23 135H280V271H23Z','#746c61')+shape('M66 271v-69a84 84 0 0 1 168 0v69Z','#313d40')+stroke('M32 158h54m113 0h71M25 225h28m194 0h28','#958677',6);
page(5,'creepy',['„Noch Glut im Herd?“, flüstert der Räuber.',[fright,'Da faucht die Katze. Schon ist er fort!']],[
 ...interior(true),pc(303,558,308,271,darkHearth,{k:1.13}),
 pc(302,572,96,40,brightEyes,{lift:32,nosplit:true,glow:8,glowC:'#ffbc59',dyn:t=>({op:1-smooth(t,fright,.22)}),
 anim:(t,el,q)=>qs(el,q,'.blink').setAttribute('opacity',1-.95*Math.exp(-Math.pow((t-3.6)/.14,2)))}),
 animal('cat',305,616,1.15,{flip:true,dyn:t=>({op:smooth(t,fright,.20),lift:19*Math.sin(Math.PI*smooth(t,fright,.55))})}),
 bandit(-355,670,1.4,'#955d50',{nosplit:true,dyn:t=>{
  const reach=smooth(t,.7,3),run=smooth(t,fright+.19,1.6);
  return {dx:302*reach-498*run,rz:6*reach-14*run,lift:7*Math.abs(Math.sin(t*11))*run,op:1-smooth(t,fright+1.4,.44)};
 }}),
 pc(-103,686,108,66,hatArt,{k:.73,nosplit:true,dyn:t=>{const u=smooth(t,fright,.73);return {op:u>0?1:0,dx:-49*u,lift:230*(1-u)+47*Math.sin(Math.PI*u),rz:30*(1-u)}}}),
 prop('tool.pot',529,687,.53,{c:'#7b7f73'}),prop('chair.bench',-445,795,.49,{c:'#796e5b'})
 ],[[1.1,hoof],[fright,(S,t)=>S.noise(t,.47,u=>3200-1200*u,u=>(1-u)*.19,1.2,0,.15,'hp')],[fright+.57,hoof],[fright+.86,hoof],[fright+1.16,hoof]]);
page(6,'happy',['„Hier bleiben wir!“, sagt der Esel.','Und so wird das Räuberhaus ihr Zuhause.'],[
 ...interior(false),prop('room.fireplace',390,538,.75,{c:'#b17a58'}),
 pc(377,366,108,66,hatArt,{k:.49,lift:85}),
 animal('rooster',333,371,.7,{lift:106}),
 prop('table.dining',-121,592,.64,{c:'#9ab5a1',c2:'#ece0b6'},{nosplit:true}),
 prop('food.bread',-137,593,.46,{}, {lift:135}),
 prop('food.teacup',-47,600,.30,{}, {lift:132,nosplit:true}),
 animal('donkey',-333,735,1.03,{rest:true}),pc(-477,774,220,141,restingDog(),{k:.74}),
 animal('cat',265,676,.95,{dyn:t=>({dx:70*smooth(t,.9,2.6)})}),
 prop('tool.pot',551,703,.42,{c:'#92a78d'})
 ],[[1.0,(S,t)=>S.voice.fife(t,76,.65,0,.4)],[1.46,(S,t)=>S.voice.fife(t,79,.55,0,.55)]]);
// The same rising third returns in the road tune, the moonlit variation and the coda.
function playScore(S){
 const walk=[48,52,55,52,50,53,48,55,53,57,55,52,50,55,48,48];
 const answer=[72,76,79,76,74,77,72,67,77,81,79,76,74,71,72,72];
 function march(pageNo,beat){
  const start=S.O(pageNo)+(pageNo===1?.86:.14);
  walk.forEach((pitch,i)=>{
   const t=start+i*beat;
   S.voice.pizz(t,pitch,pageNo===6?.81:1.12,-.22);
   if(pageNo>=2 && i%2===1)S.snare(t,pageNo===6?.28:.48);
   if(pageNo>=2 && i%4!==3)S.voice.harp(t+beat*.48,answer[i]-12,.64,.15);
   if(pageNo===3 && i%4===0)S.voice.flute(t,answer[i],.75,.3,beat*.9);
   if(pageNo===6 && i%2===0)S.voice.flute(t,answer[i],.84,.22,beat*1.45);
  });
 }
 march(1,.49);march(2,.50);march(3,.49);
 const night=S.O(4);
 [0,.58,1.38,2.65,3.90,4.62].forEach((v,i)=>S.voice.pizz(night+v,[48,55,60,64,67,72][i],.82,-.2+i*.07));
 [0,.36,.77,1.28,1.91,2.56,3.16].forEach((v,i)=>S.voice.flute(night+chorus+1.1+v,[79,76,72,74,71,67,72][i],.74,.12,.27));
 const sneak=S.O(5);
 [0,.7,1.65,2.2,3.15,3.82,5.03,5.48,6.16,6.9,7.5,8.15].forEach((v,i)=>{
  S.voice.pizz(sneak+v,[45,52,48,47,45,52,55,53,52,47,45,43][i],.81,-.16);
  if(i===2||i===7)S.voice.harp(sneak+v+.21,64,.5,.24);
 });
 march(6,.48);
 const end=S.O(6)+7.46;
 S.soft(end,48,.62,1.8); S.voice.harp(end,64,.72,-.15);S.voice.flute(end,72,.9,.2,1.43);
}
const names={kirigami:'Scherenschnitt',flat:'Farbflächen',crayon:'Wachsmalkreide',vintage:'Nostalgisch',neon:'Neon',riso:'Risografie',popart:'Pop-Art',mono:'Schwarzweiß',chalk:'Kreide',pixel:'Pixelkunst',wood:'Holztisch',lightwood:'Helles Holz',linen:'Leinen',felt:'Filz',marble:'Marmor',grass:'Rasen',sky:'Himmel',night:'Sternenhimmel',mat:'Schneidematte',steel:'Stahl',seaside:'Meeresküste',meadow:'Wiese',forest:'Wald',town:'Stadt',game:'Retrospiel',musicbox:'Spieluhr',march:'Spielmannszug',lullaby:'Harfe',wafu:'Japanische Flöte',chip:'Chiptune'};
Tobidas.book({title:'Die Bremer Stadtmusikanten',lang:'de',ui:{hint:'Zum Blättern scrollen · ← → Doppelseite wechseln · Leertaste für Musik und Wiedergabe',play:'Abspielen (Leertaste)',pause:'Pause (Leertaste)',mute:'Ton aus (M)',unmute:'Ton an (M)',style:'Bildstil',desk:'Hintergrund',set:'Musik',ownDesk:'Die Welt der Musikanten',ownSet:'Das Lied der vier Freunde',names},theme:{board:'#244f44',spine:'#15392f',style:'kirigami',desk:{base:'forest',scene:scenery(0)},font:euroFont},sound:{set:{inst:{mel:'flute',comp:'pizz',fx:'pizz'}},extra:typeof playScore==='function'&&customScore?playScore:undefined},cover:A.cover(),end:{title:'Ende',sub:'Die Bremer Stadtmusikanten'},spreads});
