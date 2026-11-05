import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Glyph, RoughRect, RoughLine, RoughCircle} from './Rough';

export type Tile = {g: string; o?: Record<string, any>; name?: string; role?: string; tag?: string; cap?: string; sub?: string; red?: boolean};
export type Beat = {
  kind?: 'scene' | 'countdown' | 'reveal' | 'outro';
  start: number; end: number;
  head?: string; big?: string; layout?: 'one' | 'two' | 'rows'; tiles?: Tile[]; note?: string;
};
export type Sub = {t0: number; t1: number; text: string};
export type EpisodeProps = {id: string; beats: Beat[]; subs: Sub[]; duration: number; audio: string};

const IVORY = '#F5F1E8', RED = '#E5252A', BLACK = '#090909';
const FONT = 'Inter, Helvetica, Arial, sans-serif';
const ease = Easing.out(Easing.cubic);
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const Background: React.FC = () => (
  <AbsoluteFill style={{background: BLACK}}>
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 38%, rgba(193,18,31,0.14) 0%, rgba(193,18,31,0.04) 38%, rgba(9,9,9,0) 62%)'}} />
    <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 9px)'}} />
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.65) 100%)'}} />
  </AbsoluteFill>
);

const TopBar: React.FC<{id: string; head?: string; headP: number}> = ({id, head, headP}) => (
  <div style={{position: 'absolute', top: 64, left: 0, width: 1080, textAlign: 'center', fontFamily: FONT}}>
    <div style={{display: 'inline-block', color: IVORY, fontWeight: 800, fontSize: 30, letterSpacing: 3, paddingBottom: 8, borderBottom: `4px solid ${RED}`}}>CLUELAB · CASE {id}</div>
    {head ? <div style={{marginTop: 26, color: RED, fontWeight: 900, fontSize: 52, letterSpacing: 2, opacity: headP, transform: `translateY(${(1 - headP) * 20}px)`}}>{head}</div> : null}
  </div>
);

const TileView: React.FC<{t: Tile; size: number; p: number; capSize?: number}> = ({t, size, p, capSize = 56}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT, width: size + 40}}>
    <Glyph g={t.g} o={t.o} size={size} p={p} />
    {t.cap ? <div style={{marginTop: 14, color: t.red ? RED : IVORY, fontWeight: 900, fontSize: capSize, textAlign: 'center', lineHeight: 1.05, opacity: clamp01((p - 0.3) * 2), whiteSpace: 'pre-line'}}>{t.cap}</div> : null}
    {t.sub ? <div style={{marginTop: 10, color: RED, fontWeight: 800, fontSize: capSize * 0.62, textAlign: 'center', lineHeight: 1.1, opacity: clamp01((p - 0.5) * 2), whiteSpace: 'pre-line'}}>{t.sub}</div> : null}
  </div>
);

const Rows: React.FC<{tiles: Tile[]; t: number}> = ({tiles, t}) => {
  const n = tiles.length;
  const rowH = n === 1 ? 420 : n === 2 ? 400 : 350;
  const gap = 28;
  const total = n * rowH + (n - 1) * gap;
  const top = 330 + (1130 - total) / 2 - 20;
  return (
    <>
      {tiles.map((tl, i) => {
        const p = ease(clamp01((t - i * 0.45) / 0.7));
        return (
          <div key={i} style={{position: 'absolute', left: 60, top: top + i * (rowH + gap), width: 960, height: rowH, fontFamily: FONT, opacity: clamp01(p * 3)}}>
            <RoughRect w={960} h={rowH} p={p} sw={4} seed={11 + i} fill="#111111" />
            <div style={{position: 'absolute', left: 30, top: (rowH - 250) / 2 + 6}}><Glyph g={tl.g} o={tl.o} size={250} p={clamp01((p - 0.15) * 1.4)} seed={i * 5 + 2} /></div>
            <div style={{position: 'absolute', left: 310, top: 0, width: 620, height: rowH, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              {tl.name ? <div style={{color: tl.red ? RED : IVORY, fontWeight: 900, fontSize: tl.name.length > 12 ? 56 : 70, lineHeight: 1}}>{tl.name}</div> : null}
              {tl.role ? <div style={{color: IVORY, opacity: 0.85, fontWeight: 700, fontSize: 38, marginTop: 8, lineHeight: 1.1}}>{tl.role}</div> : null}
              {tl.tag ? <div style={{color: RED, fontWeight: 900, fontSize: 38, marginTop: 14, lineHeight: 1.1}}>{tl.tag}</div> : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

const SceneStage: React.FC<{b: Beat; t: number}> = ({b, t}) => {
  const tiles = b.tiles || [];
  const layout = b.layout || (tiles.length === 1 ? 'one' : 'two');
  if (layout === 'rows') return <Rows tiles={tiles} t={t} />;
  const size = layout === 'one' ? 760 : 470;
  return (
    <div style={{position: 'absolute', left: 0, top: 300, width: 1080, height: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40}}>
      {tiles.map((tl, i) => (
        <TileView key={i} t={tl} size={size} p={ease(clamp01((t - i * 0.5) / 0.9))} capSize={layout === 'one' ? 64 : 50} />
      ))}
    </div>
  );
};

const Countdown: React.FC<{b: Beat; t: number}> = ({b, t}) => {
  const n = Math.max(1, 5 - Math.floor(t));
  const f = t - Math.floor(t);
  const scale = 1.25 - 0.25 * ease(clamp01(f * 3));
  return (
    <>
      <div style={{position: 'absolute', top: 340, left: 0, width: 1080, textAlign: 'center', color: IVORY, fontFamily: FONT, fontWeight: 900, fontSize: 84, lineHeight: 1.05, whiteSpace: 'pre-line'}}>{b.big || 'WHO DID IT?'}</div>
      <div style={{position: 'absolute', top: 640, left: 220, width: 640, height: 640, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{position: 'absolute', left: 0, top: 0}}><RoughCircle d={620} p={ease(clamp01(f * 2.2))} sw={12} seed={n * 3} /></div>
        <div style={{color: RED, fontFamily: FONT, fontWeight: 900, fontSize: 420, transform: `scale(${scale})`, lineHeight: 1}}>{n}</div>
      </div>
    </>
  );
};

const Reveal: React.FC<{b: Beat; t: number}> = ({b, t}) => {
  const p = ease(clamp01(t / 0.5));
  return (
    <>
      <div style={{position: 'absolute', top: 190, left: 0, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 112, color: RED, lineHeight: 1, opacity: p, transform: `scale(${0.9 + 0.1 * p})`}}>{b.big}</div>
      <div style={{position: 'absolute', top: 330, left: 190}}><RoughLine w={700} p={ease(clamp01((t - 0.2) / 0.5))} /></div>
      <SceneStage b={b} t={Math.max(0, t - 0.3)} />
    </>
  );
};

const Outro: React.FC<{t: number}> = ({t}) => {
  const p = ease(clamp01(t / 0.7));
  return (
    <>
      <div style={{position: 'absolute', top: 300, left: 160, width: 760, height: 760, opacity: p, transform: `scale(${0.85 + 0.15 * p})`}}>
        <Img src={staticFile('logo.png')} style={{width: 760, height: 760, borderRadius: '50%'}} />
      </div>
      <div style={{position: 'absolute', top: 1110, left: 0, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 60, color: IVORY, letterSpacing: 2, opacity: clamp01((t - 0.5) / 0.5)}}>EVERY DETAIL MATTERS.</div>
      <div style={{position: 'absolute', top: 1200, left: 0, width: 1080, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 40, color: RED, letterSpacing: 2, opacity: clamp01((t - 0.9) / 0.5)}}>COMMENT YOUR ANSWER</div>
    </>
  );
};

const Subtitle: React.FC<{text: string; t: number}> = ({text, t}) => (
  <div style={{position: 'absolute', left: 50, width: 980, top: 1500, minHeight: 200, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 78, lineHeight: 1.08, color: IVORY, textTransform: 'uppercase', textShadow: '0 4px 0 #000, 0 0 18px rgba(0,0,0,0.9)', WebkitTextStroke: '2px #000', paintOrder: 'stroke fill', opacity: clamp01(t / 0.08), display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
    <span>{text}</span>
  </div>
);

export const Episode: React.FC<EpisodeProps> = ({id, beats, subs, audio}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;
  const beat = beats.find((b) => sec >= b.start && sec < b.end) || beats[beats.length - 1];
  const t = beat ? sec - beat.start : 0;
  const kind = beat?.kind || 'scene';
  const sub = subs.find((s) => sec >= s.t0 && sec < s.t1);
  const headP = ease(clamp01(t / 0.4));
  const showHead = kind === 'scene' || kind === 'countdown';
  return (
    <AbsoluteFill>
      <Background />
      {audio ? <Audio src={staticFile(audio)} /> : null}
      <TopBar id={id} head={showHead ? beat?.head : undefined} headP={headP} />
      {beat && kind === 'scene' ? (
        <>
          {beat.big ? <div style={{position: 'absolute', top: 280, left: 40, width: 1000, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 84, lineHeight: 1.05, color: IVORY, opacity: headP, whiteSpace: 'pre-line'}}>{beat.big}</div> : null}
          <SceneStage b={beat} t={t} />
        </>
      ) : null}
      {beat && kind === 'countdown' ? <Countdown b={beat} t={t} /> : null}
      {beat && kind === 'reveal' ? <Reveal b={beat} t={t} /> : null}
      {beat && kind === 'outro' ? <Outro t={t} /> : null}
      {sub && kind !== 'countdown' ? <Subtitle text={sub.text} t={sec - sub.t0} /> : null}
    </AbsoluteFill>
  );
};
