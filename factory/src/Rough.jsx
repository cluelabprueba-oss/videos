import React, {useMemo} from 'react';
import rough from 'roughjs';
const gen = rough.generator();
const ICONS = require('./icons.js');
export const C = {black:'#090909', red:'#C1121F', red2:'#E5252A', char:'#1B1B1B', ivory:'#F5F1E8'};

function drawOps(ops, seed, color, sw) {
  const out=[];
  ops.forEach((op,i)=>{
    const t=op[0]; const last=op[op.length-1]; const o=(last && typeof last==='object' && !Array.isArray(last))?last:{};
    const args=(o===last)?op.slice(1,-1):op.slice(1);
    const stroke=o.red?C.red2:color;
    const opt={seed:seed+i*7,stroke,strokeWidth:sw,roughness:1.5,bowing:1.2};
    if(o.fill){opt.fill=o.red?C.red:stroke;opt.fillStyle='hachure';opt.hachureGap=7;opt.fillWeight=2.2;}
    let d;
    if(t==='l') d=gen.line(...args,opt);
    else if(t==='r') d=gen.rectangle(...args,opt);
    else if(t==='c') d=gen.circle(...args,opt);
    else if(t==='e') d=gen.ellipse(...args,opt);
    else if(t==='p') d=gen.polygon(args[0],opt);
    else if(t==='d') d=gen.path(args[0],opt);
    gen.toPaths(d).forEach(p=>out.push(p));
  });
  return out;
}
export const Shapes = ({ops, seedBucket=1, color=C.ivory, sw=3.2, style={}, ...rest}) => {
  const paths = useMemo(()=>drawOps(ops, seedBucket*13+3, color, sw),[seedBucket,color,sw,JSON.stringify(ops)]);
  return <g style={style} {...rest}>{paths.map((p,i)=><path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill||'none'} strokeLinecap="round" strokeLinejoin="round"/>)}</g>;
};
export const Icon = ({name, size=200, x=0, y=0, seedBucket=1, color=C.ivory, sw=3.2}) => {
  const ops = ICONS[name] || [];
  return <svg width={size} height={size} viewBox="0 0 200 200" style={{position:'absolute', left:x, top:y, overflow:'visible'}}><Shapes ops={ops} seedBucket={seedBucket} color={color} sw={sw}/></svg>;
};
// rough frame (rectangle box) as full svg
export const Box = ({w,h,seedBucket=1,color=C.ivory,sw=3,fill,red}) => {
  const paths=useMemo(()=>{
    const o={seed:seedBucket*5+1,stroke:red?C.red2:color,strokeWidth:sw,roughness:1.8,bowing:1.5};
    if(fill){o.fill=fill;o.fillStyle='solid';}
    return gen.toPaths(gen.rectangle(6,6,w-12,h-12,o));
  },[w,h,seedBucket,color,sw,fill,red]);
  return <svg width={w} height={h} style={{position:'absolute',left:0,top:0,overflow:'visible'}}>{paths.map((p,i)=><path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill||'none'} strokeLinecap="round"/>)}</svg>;
};
// progressive-draw path (circle/underline); progress 0..1
export const DrawPath = ({d, w, h, progress, seed=4, stroke=C.red2, sw=9, rough_=2.2}) => {
  const paths=useMemo(()=>gen.toPaths(gen.path(d,{seed,stroke,strokeWidth:sw,roughness:rough_,bowing:2})),[d,seed,stroke,sw]);
  return <svg width={w} height={h} style={{position:'absolute',left:0,top:0,overflow:'visible'}}>{paths.map((p,i)=><path key={i} d={p.d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1-progress} stroke={p.stroke} strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round"/>)}</svg>;
};
// portrait: head+body+accessory, 200x200 grid
export const Portrait = ({acc='glasses', size=300, x=0, y=0, seedBucket=1, color=C.ivory, red=false, sw=3.4}) => {
  const col = red?C.red2:color;
  const ops=[
    ['c',100,72,64],
    ['d','M28 198 Q30 132 100 128 Q170 132 172 198',{}],
    ['l',84,68,84,74],['l',116,68,116,74],
    ['d','M86 96 Q100 104 114 96'],
  ];
  if(acc==='glasses'){ops.push(['c',82,70,24],['c',118,70,24],['l',94,70,106,70]);}
  if(acc==='hat'){ops.push(['e',100,48,100,16,{red:1,fill:1}],['d','M66 48 Q68 14 100 12 Q132 14 134 48']);}
  if(acc==='cap'){ops.push(['d','M62 56 Q70 14 100 14 Q130 14 138 56',{red:1,fill:1}],['l',130,52,168,58]);}
  return <svg width={size} height={size} viewBox="0 0 200 200" style={{position:'absolute',left:x,top:y,overflow:'visible'}}><Shapes ops={ops} seedBucket={seedBucket} color={col} sw={sw}/></svg>;
};
