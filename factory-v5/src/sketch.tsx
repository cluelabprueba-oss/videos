import React, {useMemo} from 'react';
import rough from 'roughjs';
import {useCurrentFrame} from 'remotion';

export const INK = '#F5F1E8';
export const RED = '#E5252A';
export const DEEP = '#C1121F';
export const CHAR = '#1B1B1B';
export const BLACK = '#090909';

const gen = rough.generator();

export type Op = {k: string; a: any[]; o?: any};
export const R = (x: number, y: number, w: number, h: number, o?: any): Op => ({k: 'rect', a: [x, y, w, h], o});
export const C = (x: number, y: number, d: number, o?: any): Op => ({k: 'circle', a: [x, y, d], o});
export const E = (x: number, y: number, w: number, h: number, o?: any): Op => ({k: 'ellipse', a: [x, y, w, h], o});
export const L = (x1: number, y1: number, x2: number, y2: number, o?: any): Op => ({k: 'line', a: [x1, y1, x2, y2], o});
export const P = (pts: [number, number][], o?: any): Op => ({k: 'poly', a: [pts], o});
export const PA = (d: string, o?: any): Op => ({k: 'path', a: [d], o});
export const CV = (pts: [number, number][], o?: any): Op => ({k: 'curve', a: [pts], o});

function build(ops: Op[], seed: number) {
  const out: {d: string; stroke: string; sw: number; fill?: string; isFill: boolean}[] = [];
  ops.forEach((op, i) => {
    const o = {roughness: 1.5, bowing: 1.2, stroke: INK, strokeWidth: 5, seed: seed + i * 7, ...(op.o || {})};
    let dr: any;
    switch (op.k) {
      case 'rect': dr = gen.rectangle(op.a[0], op.a[1], op.a[2], op.a[3], o); break;
      case 'circle': dr = gen.circle(op.a[0], op.a[1], op.a[2], o); break;
      case 'ellipse': dr = gen.ellipse(op.a[0], op.a[1], op.a[2], op.a[3], o); break;
      case 'line': dr = gen.line(op.a[0], op.a[1], op.a[2], op.a[3], o); break;
      case 'poly': dr = gen.polygon(op.a[0], o); break;
      case 'path': dr = gen.path(op.a[0], o); break;
      case 'curve': dr = gen.curve(op.a[0], o); break;
    }
    for (const p of gen.toPaths(dr)) {
      out.push({d: p.d, stroke: p.stroke, sw: p.strokeWidth, fill: p.fill, isFill: !!p.fill && p.fill !== 'none' && p.stroke === 'none'});
    }
  });
  return out;
}

/** Hand-drawn group: draws on over `progress` (0..1), then "boils" between two seeds. */
export const Sketch: React.FC<{
  ops: Op[]; x?: number; y?: number; s?: number; progress?: number; rot?: number; opacity?: number; seed?: number;
}> = ({ops, x = 0, y = 0, s = 1, progress = 1, rot = 0, opacity = 1, seed = 3}) => {
  const frame = useCurrentFrame();
  const sets = useMemo(() => [build(ops, seed), build(ops, seed + 101)], [ops, seed]);
  const set = sets[Math.floor(frame / 6) % 2];
  const n = set.length;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={opacity}>
      {set.map((p, i) => {
        const a = Math.min(1, Math.max(0, progress * (n + 2) - i));
        if (p.isFill) {
          return <path key={i} d={p.d} fill={p.fill} stroke="none" opacity={Math.max(0, progress - 0.5) * 2} />;
        }
        return (
          <path key={i} d={p.d} fill="none" stroke={p.stroke} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - a} />
        );
      })}
    </g>
  );
};
