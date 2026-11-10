import React, {useMemo} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing} from 'remotion';
import {delayRender, continueRender, staticFile as sf} from 'remotion';
import {Sketch, R, L, P, PA, C, INK, RED, DEEP, CHAR, BLACK, Op} from './sketch';
import {ICONS, portrait} from './icons';

const type = 'ClueType';
const marker = 'ClueMarker';
if (typeof document !== 'undefined') {
  const h = delayRender('fonts');
  Promise.all([
    new FontFace(type, `url(${sf('fonts/SpecialElite.ttf')})`).load().then((f) => document.fonts.add(f)),
    new FontFace(marker, `url(${sf('fonts/PermanentMarker.ttf')})`).load().then((f) => document.fonts.add(f)),
  ]).then(() => continueRender(h)).catch(() => continueRender(h));
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = Easing.out(Easing.cubic);

const Paper: React.FC = () => {
  const ops = useMemo(() => {
    const o: Op[] = [];
    for (let i = 0; i < 22; i++) {
      const y = 80 + i * 86;
      o.push(L(40, y, 1040, y + ((i * 13) % 9) - 4, {stroke: INK, strokeWidth: 1.2, roughness: 2.2}));
    }
    return o;
  }, []);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, ${CHAR} 0%, ${BLACK} 72%)`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', opacity: 0.06}}>
        <Sketch ops={ops} />
      </svg>
      <AbsoluteFill style={{boxShadow: 'inset 0 0 260px 60px #000'}} />
    </AbsoluteFill>
  );
};

const Frame: React.FC<{x: number; y: number; w: number; h: number; p: number; hot?: boolean; seed?: number}> = ({x, y, w, h, p, hot, seed = 5}) => {
  const ops = useMemo(() => [R(0, 0, w, h, {stroke: hot ? RED : INK, strokeWidth: hot ? 7 : 4, roughness: 1.8})], [w, h, hot]);
  return <Sketch ops={ops} x={x} y={y} progress={p} seed={seed} />;
};

const Icon: React.FC<{k: string; x: number; y: number; s: number; p: number; seed?: number; rot?: number}> = ({k, x, y, s, p, seed = 3, rot = 0}) => {
  const ops = useMemo(() => (ICONS[k] || ICONS.question)(), [k]);
  return <Sketch ops={ops} x={x} y={y} s={s} progress={p} seed={seed} rot={rot} />;
};

const Portrait: React.FC<{i: number; x: number; y: number; s: number; p: number; hot?: boolean; dim?: boolean; cross?: boolean}> = ({i, x, y, s, p, hot, dim, cross}) => {
  const ops = useMemo(() => portrait(i), [i]);
  return (
    <g opacity={dim ? 0.38 : 1}>
      <Sketch ops={ops} x={x} y={y} s={s} progress={p} seed={11 + i * 5} />
      {hot ? <Sketch ops={[R(-8, -8, 216, 216, {stroke: RED, strokeWidth: 8, roughness: 2})]} x={x} y={y} s={s} progress={p} seed={21} /> : null}
      {cross ? <Sketch ops={[L(10, 10, 190, 190, {stroke: RED, strokeWidth: 12}), L(190, 10, 10, 190, {stroke: RED, strokeWidth: 12})]} x={x} y={y} s={s} progress={p} seed={31} /> : null}
    </g>
  );
};

const Txt: React.FC<{x: number; y: number; size: number; color?: string; font?: string; anchor?: 'middle' | 'start'; children: any; op?: number; rot?: number; ls?: number}> =
  ({x, y, size, color = INK, font = type, anchor = 'middle', children, op = 1, rot = 0, ls = 0}) => (
    <text x={x} y={y} fontSize={size} fill={color} fontFamily={font} textAnchor={anchor} opacity={op} transform={`rotate(${rot} ${x} ${y})`} letterSpacing={ls}>{children}</text>
  );

const Card: React.FC<{x: number; y: number; w: number; h: number; text: string; p: number; rot?: number; hot?: boolean}> = ({x, y, w, h, text, p, rot = 0, hot}) => {
  const ops = useMemo(() => [R(0, 0, w, h, {stroke: INK, strokeWidth: 4, fill: CHAR, fillStyle: 'solid', roughness: 1.6}), C(w / 2, 6, 22, {stroke: RED, strokeWidth: 4, fill: RED, fillStyle: 'solid'})], [w, h]);
  const lines = text.split(' ');
  const mid = Math.ceil(lines.length / 2);
  const t = lines.length > 3 && text.length > 16 ? [lines.slice(0, mid).join(' '), lines.slice(mid).join(' ')] : [text];
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`} opacity={clamp(p * 3)}>
      <Sketch ops={ops} x={x} y={y} progress={clamp(p * 1.5)} seed={x + y} />
      {t.map((l, i) => <Txt key={i} x={x + w / 2} y={y + h / 2 + 14 + (i - (t.length - 1) / 2) * 52} size={t.length > 1 ? 36 : 42} color={hot ? RED : INK}>{l}</Txt>)}
    </g>
  );
};

const Chip: React.FC<{label: string}> = ({label}) => (
  <g>
    <Sketch ops={[R(0, 0, 430, 70, {stroke: RED, strokeWidth: 5, fill: DEEP, fillStyle: 'solid'})]} x={325} y={190} progress={1} seed={2} />
    <Txt x={540} y={238} size={38} color={INK} ls={4}>{label}</Txt>
  </g>
);

type Props = {ep: any};

export const Main: React.FC<Props> = ({ep}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  if (!ep) return null;
  const segs = ep.segs as Record<string, number[]>;
  const names: string[] = ep.names;
  const dur: number = ep.dur;
  const order = ['hook', 'case', 's1', 's2', 's3', 'challenge', 'reveal', 'outro'];
  // seg boundaries: each scene starts at its first word, ends at next scene's start
  const starts = order.map((k, i) => (i === 0 ? 0 : segs[k][0] - 0.25));
  let cur = 0;
  for (let i = 0; i < order.length; i++) if (t >= starts[i]) cur = i;
  const key = order[cur];
  const sp = clamp((t - starts[cur]) / 0.7); // scene-in progress
  const guiltyIdx = names.indexOf(ep.solution);
  const idx = key === 's1' ? 0 : key === 's2' ? 1 : key === 's3' ? 2 : -1;

  // captions
  const words = ep.words as any[];
  let wi = words.findIndex((w) => t >= w.t && t <= w.e + 0.18);
  if (wi < 0) { // between words: stay on the last spoken one
    wi = -1;
    for (let i = 0; i < words.length; i++) if (words[i].t <= t) wi = i;
  }
  let chunk: any[] = [];
  if (wi >= 0 && t < words[words.length - 1].e + 0.6) {
    let a = wi, b = wi;
    const brk = (w: string) => /[.,?!:]$/.test(w) || /^[“"]/.test(w);
    while (a > 0 && wi - a < 3 && !brk(words[a - 1].w)) a--;
    while (b < words.length - 1 && b - a < 3 && !brk(words[b].w)) b++;
    chunk = words.slice(a, b + 1).map((w, i) => ({...w, i: a + i}));
  }

  // countdown
  const cd: number[] = ep.countdown;
  let num = 0;
  cd.forEach((c, i) => { if (t >= c - 0.05) num = 5 - i; });
  const numT = num ? cd[5 - num] : 0;

  const lineup = (hotIdx: number, dimOthers: boolean, big: boolean, cross: boolean, y0: number) =>
    names.map((n, i) => {
      const s = big ? 1.45 : 0.7;
      const w = 200 * s;
      const gap = big ? 36 : 120;
      const total = 3 * w + 2 * gap;
      const x0 = (1080 - total) / 2 + i * (w + gap);
      const hot = hotIdx === i;
      const dim = dimOthers && hotIdx >= 0 && !hot;
      return (
        <g key={i}>
          <Portrait i={i} x={x0} y={y0} s={s} p={sp} hot={hot} dim={dim} cross={cross && dim} />
          <Txt x={x0 + w / 2} y={y0 + w + 62} size={big ? 46 : 38} font={marker} color={hot ? RED : INK} op={dim ? 0.45 : 1}>{n.toUpperCase()}</Txt>
        </g>
      );
    });

  return (
    <AbsoluteFill style={{background: BLACK}}>
      <Paper />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {/* header */}
        <Txt x={60} y={110} size={34} anchor="start" color={RED} ls={5}>CLUELAB</Txt>
        <Txt x={1020} y={110} size={34} anchor="end" color={INK} op={0.7} ls={3}>{ep.id}</Txt>
        <Sketch ops={[L(60, 134, 1020, 134, {stroke: RED, strokeWidth: 3})]} progress={clamp(t / 0.8)} />

        {key === 'hook' && (
          <g>
            <Chip label="NEW CASE" />
            <Icon k="question" x={340} y={330} s={2.0} p={sp} />
            <Txt x={540} y={880} size={64} font={marker} color={INK} op={clamp(sp * 2)}>{ep.title.toUpperCase()}</Txt>
            <Txt x={540} y={955} size={38} op={0.75} ls={4}>{ep.cat.toUpperCase()}</Txt>
            {lineup(-1, false, false, false, 1030)}
          </g>
        )}

        {key === 'case' && (
          <g>
            <Chip label="THE CASE" />
            <Icon k={ep.caseIcon} x={390} y={290} s={1.5} p={clamp((t - starts[cur]) / 1.2)} />
            {ep.board.map((b: string, i: number) => {
              const n = ep.board.length;
              const p = clamp((t - starts[cur] - 0.6 - i * ((segs.case[1] - segs.case[0]) / (n + 0.8))) / 0.6);
              const w = 760, h = n > 3 ? 105 : 125;
              const y = 640 + i * (h + 42);
              const x = 150 + (i % 2 ? 100 : 0);
              return (
                <g key={i}>
                  {i > 0 && <Sketch ops={[L(0, 0, (i % 2 ? -100 : 100), 42, {stroke: RED, strokeWidth: 4})]} x={x + w / 2} y={y - 42 + 6} progress={p} />}
                  <Card x={x} y={y} w={w} h={h} text={b} p={p} rot={i % 2 ? 1.5 : -1.5} />
                </g>
              );
            })}
          </g>
        )}

        {idx >= 0 && (
          <g>
            <Chip label={`${ep.chip || 'SUSPECT'} ${idx + 1} OF 3`} />
            {lineup(idx, true, false, false, 300).map((el, i) => <g key={i} transform="translate(0 0)">{el}</g>)}
            <Portrait i={idx} x={150} y={600} s={2.1} p={sp} hot />
            <Txt x={375} y={1160} size={74} font={marker} color={INK} op={clamp(sp * 2)}>{names[idx].toUpperCase()}</Txt>
            <Txt x={540} y={1260} size={44} color={RED} op={clamp((sp - 0.3) * 2)}>{ep.tags[idx]}</Txt>
          </g>
        )}

        {idx >= 0 && (
          <g>
            <Icon k={ep.icons[idx]} x={680} y={700} s={1.5} p={clamp(sp * 1.4)} rot={4} />
          </g>
        )}

        {key === 'challenge' && (
          <g>
            <Chip label="YOUR TURN" />
            {t < cd[0] - 0.2 && (
              <g>
                <Txt x={540} y={430} size={78} font={marker} color={INK} op={clamp(sp * 2)}>{ep.q.toUpperCase().match(/.{1,22}(\s|$)/g)?.[0]?.trim()}</Txt>
                <Txt x={540} y={520} size={78} font={marker} color={INK} op={clamp(sp * 2)}>{(ep.q.toUpperCase().match(/.{1,22}(\s|$)/g)?.[1] || '').trim()}</Txt>
              </g>
            )}
            {lineup(-1, false, true, false, 760)}
            {num > 0 && (
              <g>
                <Sketch ops={[C(0, 0, 330, {stroke: RED, strokeWidth: 10, fill: BLACK, fillStyle: 'solid'})]} x={540} y={470} progress={1} seed={num} />
                <Txt x={540} y={540} size={230} font={marker} color={RED}
                  op={interpolate(t - numT, [0, 0.12], [0, 1], {extrapolateRight: 'clamp'})}>{num}</Txt>
              </g>
            )}
          </g>
        )}

        {key === 'reveal' && (
          <g>
            <Chip label="THE SOLUTION" />
            {lineup(guiltyIdx, true, false, true, 300)}
            <Portrait i={guiltyIdx} x={340} y={560} s={2.0} p={sp} hot />
            <g transform={`rotate(-7 540 1125)`} opacity={clamp((t - starts[cur] - 0.5) / 0.25)}>
              <Sketch ops={[R(0, 0, 640, 130, {stroke: RED, strokeWidth: 10, roughness: 2})]} x={220} y={1060} progress={clamp((t - starts[cur] - 0.5) / 0.5)} seed={9} />
              <Txt x={540} y={1155} size={(ep.stamp || 'GUILTY').length > 8 ? 58 : 92} font={marker} color={RED}>{ep.stamp || 'GUILTY'}</Txt>
            </g>
            <Txt x={540} y={1300} size={70} font={marker} color={INK} op={clamp(sp * 2)}>{ep.solution.toUpperCase()}</Txt>
          </g>
        )}

        {key === 'outro' && (
          <g />
        )}
      </svg>

      {key === 'outro' && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', opacity: ease(clamp((t - starts[cur]) / 0.8))}}>
          <div style={{marginTop: 250, width: 860, height: 860, borderRadius: 430, overflow: 'hidden', transform: `scale(${0.9 + 0.1 * ease(clamp((t - starts[cur]) / 1.0))})`, boxShadow: '0 0 90px rgba(229,37,42,0.35)'}}>
            <Img src={staticFile('logo.png')} style={{width: '100%', height: '100%'}} />
          </div>
          <div style={{marginTop: 50, fontFamily: type, fontSize: 46, color: INK, letterSpacing: 6}}>EVERY DETAIL MATTERS.</div>
        </AbsoluteFill>
      )}

      {/* captions */}
      <div style={{position: 'absolute', left: 60, right: 60, top: key === 'outro' ? 1480 : 1430, height: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'flex-start'}}>
        {chunk.map((w) => {
          const active = w.i === wi;
          return (
            <span key={w.i} style={{
              fontFamily: marker, fontSize: 70, lineHeight: 1.2, margin: '0 22px', color: active ? RED : INK,
              textShadow: '0 0 6px #000, 0 4px 0 #000, 3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000',
              transform: active ? 'scale(1.08)' : 'scale(1)', display: 'inline-block', textTransform: 'uppercase',
            }}>{w.w.replace(/[“”"]/g, '')}</span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
