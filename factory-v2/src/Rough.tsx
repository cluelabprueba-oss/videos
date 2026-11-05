import React, {useMemo} from 'react';
import rough from 'roughjs';
import {GLYPHS, P} from './glyphs';

const COL: Record<string, string> = {w: '#F5F1E8', r: '#E5252A', g: '#6E6B64', c: '#1B1B1B', k: '#090909'};
const gen = rough.generator();

type Path = {d: string; stroke: string; sw: number; fill?: string; isFill: boolean};

function build(prims: P[], seedBase: number): {paths: Path[]; texts: Extract<P, {k: 'text'}>[]} {
  const paths: Path[] = [];
  const texts: Extract<P, {k: 'text'}>[] = [];
  prims.forEach((p, i) => {
    if (p.k === 'text') {texts.push(p); return;}
    const stroke = COL[(p as any).c || 'w'];
    const fillCol = (p as any).f ? COL[(p as any).f] : undefined;
    const o: any = {roughness: 1.5, bowing: 1.2, stroke, strokeWidth: (p as any).sw || 3.2, seed: seedBase + i * 7 + 1, hachureGap: 7, fillWeight: 2};
    if (fillCol) {o.fill = fillCol; o.fillStyle = (p as any).fs || 'hachure';}
    let dr: any;
    switch (p.k) {
      case 'rect': dr = gen.rectangle(p.x, p.y, p.w, p.h, o); break;
      case 'circle': dr = gen.circle(p.x, p.y, p.d, o); break;
      case 'ell': dr = gen.ellipse(p.x + p.w / 2, p.y + p.h / 2, p.w, p.h, o); break;
      case 'line': dr = gen.line(p.x1, p.y1, p.x2, p.y2, o); break;
      case 'poly': dr = gen.polygon(p.pts as any, o); break;
      case 'path': dr = gen.path(p.d, o); break;
    }
    for (const ps of gen.toPaths(dr)) {
      paths.push({d: ps.d, stroke: ps.stroke, sw: ps.strokeWidth, fill: ps.fill && ps.fill !== 'none' ? ps.fill : undefined, isFill: ps.fill !== undefined && ps.fill !== 'none' && ps.stroke === 'none'});
    }
  });
  return {paths, texts};
}

export const Glyph: React.FC<{g: string; o?: Record<string, any>; size: number; p: number; seed?: number}> = ({g, o = {}, size, p, seed = 3}) => {
  const fn = GLYPHS[g];
  const {paths, texts} = useMemo(() => build(fn ? fn(o) : [], seed + g.length * 13), [g, JSON.stringify(o), seed]);
  const pr = Math.max(0, Math.min(1, p));
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow: 'visible'}}>
      {paths.map((q, i) =>
        q.isFill ? (
          <path key={i} d={q.d} fill={q.fill} opacity={Math.max(0, (pr - 0.5) * 2)} />
        ) : (
          <path key={i} d={q.d} fill="none" stroke={q.stroke} strokeWidth={q.sw} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - pr} />
        )
      )}
      {texts.map((t, i) => (
        <text key={i} x={t.x} y={t.y} fontSize={t.size} fill={COL[t.c || 'w']} textAnchor={(t.anchor as any) || 'middle'} fontFamily="Inter, Helvetica, Arial, sans-serif" fontWeight={900} opacity={pr}>
          {t.s}
        </text>
      ))}
    </svg>
  );
};

export const RoughRect: React.FC<{w: number; h: number; p: number; color?: string; sw?: number; seed?: number; fill?: string}> = ({w, h, p, color = '#F5F1E8', sw = 4, seed = 5, fill}) => {
  const {d, fd} = useMemo(() => {
    const dr = gen.rectangle(4, 4, w - 8, h - 8, {roughness: 1.4, stroke: color, strokeWidth: sw, seed, fill, fillStyle: 'solid'});
    const ps = gen.toPaths(dr);
    return {d: ps.filter((x) => x.stroke !== 'none').map((x) => x.d).join(' '), fd: ps.filter((x) => x.stroke === 'none').map((x) => x.d).join(' ')};
  }, [w, h, color, sw, seed, fill]);
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      {fd ? <path d={fd} fill={fill} /> : null}
      <path d={d} fill="none" stroke={color} strokeWidth={sw} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p)} strokeLinecap="round" />
    </svg>
  );
};

export const RoughLine: React.FC<{w: number; p: number; color?: string; sw?: number; seed?: number}> = ({w, p, color = '#E5252A', sw = 8, seed = 9}) => {
  const d = useMemo(() => gen.toPaths(gen.line(4, 8, w - 4, 6, {roughness: 2, stroke: color, strokeWidth: sw, seed}))[0].d, [w, color, sw, seed]);
  return (
    <svg width={w} height={20} style={{overflow: 'visible'}}>
      <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p)} />
    </svg>
  );
};

export const RoughCircle: React.FC<{d: number; p: number; color?: string; sw?: number; seed?: number}> = ({d: dia, p, color = '#E5252A', sw = 10, seed = 2}) => {
  const d = useMemo(() => gen.toPaths(gen.circle(dia / 2 + 6, dia / 2 + 6, dia, {roughness: 1.6, stroke: color, strokeWidth: sw, seed}))[0].d, [dia, color, sw, seed]);
  return (
    <svg width={dia + 12} height={dia + 12} style={{overflow: 'visible'}}>
      <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p)} />
    </svg>
  );
};
