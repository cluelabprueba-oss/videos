import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile, Easing} from 'remotion';
import {C, Icon, Box, DrawPath, Portrait, Shapes} from './Rough.jsx';

const F_MARK='"Permanent Marker", cursive', F_TYPE='"Special Elite", "Courier New", monospace';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const fade=(t,a,b)=>clamp((t-a)/(b-a),0,1);

const Text=({children,size=60,color=C.ivory,font=F_TYPE,style={}})=><div style={{fontFamily:font,fontSize:size,color,lineHeight:1.12,textAlign:'center',...style}}>{children}</div>;

const Background=({frame,sb})=>{
  const flick = 0.92 + 0.08*Math.sin(frame*0.9)*Math.cos(frame*0.31);
  const scribbles=React.useMemo(()=>{
    const ops=[];let s=7;const r=()=>{s=(s*9301+49297)%233280;return s/233280;};
    for(let i=0;i<9;i++){ops.push(['l',r()*1080,r()*1920,r()*1080,r()*1920]);}
    return ops;},[]);
  return <AbsoluteFill style={{background:`radial-gradient(ellipse at 50% 40%, #1d1d1d 0%, ${C.black} 70%)`}}>
    <svg width={1080} height={1920} style={{position:'absolute',opacity:0.07*flick}}><Shapes ops={scribbles} seedBucket={1} color={C.ivory} sw={2}/></svg>
    <div style={{position:'absolute',inset:0,boxShadow:'inset 0 0 280px 90px rgba(0,0,0,0.85)'}}/>
  </AbsoluteFill>;
};

const Header=({spec,t})=>(<div style={{position:'absolute',top:70,left:60,right:60,display:'flex',justifyContent:'space-between',alignItems:'center',opacity:fade(t,0,0.4)}}>
  <Text size={34} color={C.red2} style={{textAlign:'left',letterSpacing:3}}>{spec.id} · {spec.category.toUpperCase()}</Text>
  <Text size={34} color={C.ivory} font={F_MARK} style={{opacity:0.9}}>ClueLab</Text>
</div>);

const Thumbs=({spec,active,sb,y=170})=>(<div style={{position:'absolute',top:y,left:0,right:0,display:'flex',justifyContent:'center',gap:50}}>
  {spec.suspects.map((s,i)=>(<div key={i} style={{width:230,height:260,position:'relative',opacity:active===null||active===i?1:0.4}}>
    <Portrait acc={s.icon} size={200} x={15} y={0} seedBucket={sb} red={false}/>
    <Text size={34} font={F_MARK} color={active===i?C.red2:C.ivory} style={{position:'absolute',top:205,width:230}}>{s.name}</Text>
  </div>))}
</div>);

const SceneHook=({spec,t,sb,dur})=>{
  const words=spec.hook.split(' ');
  const lines=[];let cur='';words.forEach(w=>{if((cur+' '+w).trim().length>14&&cur){lines.push(cur);cur=w;}else cur=(cur+' '+w).trim();});lines.push(cur);
  const sc=spring({frame:t*30,fps:30,config:{damping:12}});
  return <AbsoluteFill>
    <div style={{position:'absolute',top:250,left:60,right:60,transform:`scale(${0.85+0.15*sc}) rotate(-2deg)`}}>
      {lines.map((l,i)=><Text key={i} size={118} font={F_MARK} color={i===lines.length-1?C.red2:C.ivory} style={{opacity:fade(t,i*0.25,i*0.25+0.3),marginBottom:8}}>{l}</Text>)}
    </div>
    <div style={{position:'absolute',left:260,top:900,width:560,height:560,opacity:fade(t,0.9,1.4)}}><Icon name={spec.caseIcon} size={560} seedBucket={sb} color={C.ivory} sw={3.4}/></div>
    <div style={{position:'absolute',left:140,top:790,width:800,height:40}}><DrawPath d="M10 20 Q200 5 400 22 T790 14" w={800} h={40} progress={fade(t,0.6,1.3)} sw={10}/></div>
  </AbsoluteFill>;
};
const SceneCase=({spec,t,sb})=>(<AbsoluteFill>
  <div style={{position:'absolute',top:300,left:60,right:60}}><Text size={82} font={F_MARK} color={C.red2} style={{opacity:fade(t,0,0.4)}}>{spec.caseTitle}</Text></div>
  <div style={{position:'absolute',left:190,top:560,width:700,height:700,transform:`scale(${0.9+0.1*fade(t,0,0.6)}) rotate(${Math.sin(t*1.5)*1.2}deg)`,opacity:fade(t,0.1,0.5)}}><Icon name={spec.caseIcon} size={700} seedBucket={sb} sw={3.6}/></div>
  <div style={{position:'absolute',top:1290,left:80,right:80}}><Text size={46} style={{opacity:fade(t,0.5,1)}}>{spec.caseSub}</Text></div>
</AbsoluteFill>);
const SceneSuspect=({spec,i,t,sb})=>{
  const s=spec.suspects[i]; const sc=spring({frame:t*30,fps:30,config:{damping:14}});
  return <AbsoluteFill>
    <Thumbs spec={spec} active={i} sb={sb} y={150}/>
    <div style={{position:'absolute',left:200,top:470,width:680,height:600,transform:`scale(${0.8+0.2*sc})`}}><Portrait acc={s.icon} size={680} seedBucket={sb} sw={3.2}/></div>
    <div style={{position:'absolute',top:1060,left:0,right:0}}><Text size={92} font={F_MARK} color={C.red2}>{s.name}</Text><Text size={40} style={{opacity:0.8}}>{s.role}</Text></div>
    <div style={{position:'absolute',left:70,right:70,top:1200,height:240,opacity:fade(t,0.3,0.7)}}>
      <Box w={940} h={240} seedBucket={sb} color={C.ivory} fill={C.char}/>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 40px'}}><Text size={s.quote.length>55?40:46}>{s.quote}</Text></div>
    </div>
    {s.note?<div style={{position:'absolute',right:70,top:1010,transform:'rotate(6deg)',border:`5px solid ${C.red2}`,padding:'6px 18px',opacity:fade(t,0.9,1.2)}}><Text size={34} color={C.red2} font={F_MARK}>{s.note.toUpperCase()}</Text></div>:null}
  </AbsoluteFill>;
};
const SceneClues=({spec,t,sb,dur})=>{
  const n=spec.clues.length;
  return <AbsoluteFill>
    <div style={{position:'absolute',top:190,left:0,right:0}}><Text size={78} font={F_MARK} color={C.red2}>EVIDENCE</Text></div>
    {spec.clues.map((c,i)=>{const ts=(dur*0.9)*i/n+0.2; const a=spring({frame:(t-ts)*30,fps:30,config:{damping:13}}); if(t<ts) return null;
      return <div key={i} style={{position:'absolute',left:70,top:360+i*380,width:940,height:330,transform:`translateX(${(1-a)*-140}px)`,opacity:a}}>
        <Box w={940} h={330} seedBucket={sb+i} fill={C.char} red={i===n-1&&false}/>
        <div style={{position:'absolute',left:30,top:55}}><Icon name={c.icon} size={220} seedBucket={sb+i}/></div>
        <div style={{position:'absolute',left:290,right:30,top:38,bottom:30,display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <Text size={38} color={C.red2} font={F_TYPE} style={{textAlign:'left',fontWeight:700}}>CLUE {i+1}</Text>
          <Text size={c.t.length>40?42:48} style={{textAlign:'left'}}>{c.t}</Text></div>
      </div>;})}
  </AbsoluteFill>;
};
const SceneChallenge=({spec,t,sb,timing,seg6Start})=>{
  const cd=timing.countdown; // array of {n,t} absolute seconds; t passed is local; need absolute
  return null;
};
const Countdown=({absT,timing})=>{
  const cds=timing.countdown; let cur=null;
  cds.forEach(c=>{if(absT>=c.t) cur=c;});
  if(!cur) return null;
  const lt=absT-cur.t; const sc=1.4-0.4*fade(lt,0,0.2);
  return <div style={{position:'absolute',left:0,right:0,top:560,textAlign:'center',transform:`scale(${sc})`,opacity:1-fade(lt,0.7,0.95)*0.7}}>
    <Text size={560} font={F_TYPE} color={C.red2} style={{textShadow:'0 0 60px rgba(229,37,42,0.5)',fontWeight:700}}>{cur.n}</Text></div>;
};
const SceneWho=({spec,t,sb,absT,timing})=>(<AbsoluteFill>
  <Thumbs spec={spec} active={null} sb={sb} y={190}/>
  <div style={{position:'absolute',top:560,left:0,right:0,opacity:absT<timing.countdown[0].t-0.1?1:0}}><Text size={220} font={F_MARK} color={C.ivory}>WHO?</Text><Text size={48} style={{marginTop:20,opacity:0.8}}>You have five seconds</Text></div>
  <Countdown absT={absT} timing={timing}/>
</AbsoluteFill>);
const SceneReveal=({spec,t,sb})=>{
  const s=spec.suspects[spec.culprit]; const p=fade(t,0.1,0.8);
  const sh=t<0.4?Math.sin(t*90)*6*(1-t/0.4):0;
  return <AbsoluteFill style={{transform:`translateX(${sh}px)`}}>
    <div style={{position:'absolute',top:230,left:0,right:0}}><Text size={90} font={F_MARK} style={{opacity:fade(t,0,0.3)}}>IT WAS</Text></div>
    <div style={{position:'absolute',left:170,top:420,width:740,height:740}}>
      <Portrait acc={s.icon} size={740} seedBucket={sb} red={false}/>
      <DrawPath d="M370 40 C640 30 720 350 600 560 C480 740 160 740 90 500 C20 280 160 60 380 60" w={740} h={740} progress={p} sw={14}/>
    </div>
    <div style={{position:'absolute',top:1190,left:0,right:0,transform:`scale(${0.7+0.3*spring({frame:(t-0.2)*30,fps:30,config:{damping:9}})}) rotate(-3deg)`}}><Text size={190} font={F_MARK} color={C.red2} style={{textShadow:'0 0 50px rgba(229,37,42,0.45)'}}>{s.name}</Text></div>
  </AbsoluteFill>;
};
const SceneExplain=({spec,t,sb,dur})=>{
  const L=spec.explain; const s=spec.suspects[spec.culprit];
  return <AbsoluteFill>
    <div style={{position:'absolute',top:190,left:0,right:0}}><Text size={78} font={F_MARK} color={C.red2}>THE PROOF</Text></div>
    <div style={{position:'absolute',left:60,top:330,width:240,height:260}}><Portrait acc={s.icon} size={240} seedBucket={sb} red/><Text size={34} font={F_MARK} color={C.red2} style={{position:'absolute',top:215,width:240}}>{s.name}</Text></div>
    {L.map((l,i)=>{const ts=0.15+(dur*0.88)*i/L.length; if(t<ts) return null; const a=spring({frame:(t-ts)*30,fps:30,config:{damping:14}});
      const last=l.toLowerCase().includes('false lead')||l.toLowerCase().includes('lied')||false;
      return <div key={i} style={{position:'absolute',left:70,right:70,top:610+i*220,height:190,transform:`translateX(${(1-a)*150}px)`,opacity:a}}>
        <Box w={940} h={190} seedBucket={sb+i} fill={C.char} red={i===0}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',padding:'0 36px',gap:26}}>
          <Text size={64} font={F_TYPE} color={C.red2} style={{fontWeight:700}}>{i+1}</Text><Text size={l.length>44?42:48} style={{textAlign:'left',flex:1}}>{l}</Text></div>
      </div>;})}
  </AbsoluteFill>;
};
const SceneClose=({spec,t,sb,absT,timing})=>{
  const lo=fade(absT,timing.logoAt,timing.logoAt+0.35);
  return <AbsoluteFill>
    <div style={{position:'absolute',left:240,top:300,opacity:1-lo}}><Icon name="bubble" size={600} seedBucket={sb} color={C.ivory} sw={3.6}/></div>
    <div style={{position:'absolute',top:980,left:60,right:60,opacity:1-lo}}><Text size={84} font={F_MARK}>COMMENT YOUR ANSWER</Text></div>
    <div style={{position:'absolute',left:0,right:0,top:200,display:'flex',justifyContent:'center',opacity:lo,transform:`scale(${0.92+0.08*lo})`}}>
      <Img src={staticFile('cluelab_logo.png')} style={{width:800,height:800,borderRadius:'50%'}}/></div>
    <div style={{position:'absolute',top:1060,left:0,right:0,opacity:lo}}><Text size={64} font={F_MARK} color={C.ivory}>EVERY DETAIL MATTERS.</Text></div>
  </AbsoluteFill>;
};

const Subtitles=({timing,absT})=>{
  const ch=timing.chunks; let cur=null;
  for(const c of ch){ if(absT>=c.s && absT<c.e+0.05) cur=c; }
  if(!cur) return null;
  return <div style={{position:'absolute',left:70,right:70,top:1500,display:'flex',justifyContent:'center'}}>
    <div style={{background:'rgba(9,9,9,0.82)',border:`3px solid ${C.char}`,borderRadius:22,padding:'18px 34px',textAlign:'center'}}>
      <span style={{fontFamily:F_TYPE,fontSize:68,lineHeight:1.15}}>{cur.words.map((w,i)=>{const on=absT>=w.s&&absT<w.e+0.02; return <span key={i} style={{color:on?C.red2:C.ivory,fontWeight:on?700:400,textShadow:on?'0 0 22px rgba(229,37,42,0.55)':'none'}}>{w.w}{i<cur.words.length-1?' ':''}</span>;})}</span>
    </div></div>;
};

export const Video=({spec,timing})=>{
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const absT=frame/fps; const sb=Math.floor(frame/5)+1;
  const ss=timing.segStart; const end=timing.dur;
  const segEnd=(i)=> i<9? ss[i+1] : timing.total;
  let seg=0; for(let i=0;i<10;i++){ if(absT>=ss[i]) seg=i; }
  if(absT<ss[0]) seg=0;
  const t=absT-ss[seg]; const dur=segEnd(seg)-ss[seg];
  const scene=(()=>{
    switch(seg){
      case 0: return <SceneHook spec={spec} t={t} sb={sb} dur={dur}/>;
      case 1: return <SceneCase spec={spec} t={t} sb={sb}/>;
      case 2: case 3: case 4: return <SceneSuspect spec={spec} i={seg-2} t={t} sb={sb}/>;
      case 5: return <SceneClues spec={spec} t={t} sb={sb} dur={dur}/>;
      case 6: return <SceneWho spec={spec} t={t} sb={sb} absT={absT} timing={timing}/>;
      case 7: return <SceneReveal spec={spec} t={t} sb={sb}/>;
      case 8: return <SceneExplain spec={spec} t={t} sb={sb} dur={dur}/>;
      default: return <SceneClose spec={spec} t={t} sb={sb} absT={absT} timing={timing}/>;
    }})();
  const prog=absT/timing.total;
  return <AbsoluteFill style={{background:C.black}}>
    <Background frame={frame} sb={sb}/>
    {seg<9?<Header spec={spec} t={absT}/>:null}
    {scene}
    {absT<timing.dur?<Subtitles timing={timing} absT={absT}/>:null}
    <div style={{position:'absolute',left:0,bottom:0,height:10,width:`${prog*100}%`,background:C.red2}}/>
  </AbsoluteFill>;
};
