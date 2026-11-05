// Usage: node build.mjs CL-0003  -> writes out/<id>.props.json and public/mix-<id>.wav
import {execFileSync, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {episodes} from './episodes.mjs';

const id = process.argv[2];
const ep = episodes.find((e) => e.id === id);
if (!ep) throw new Error('unknown episode ' + id);
const dir = `audio/${id}`;
const nar = `${dir}/nar.mp3`;
const dur = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', nar]).toString());

// 1) silences
const sd = spawnSync('ffmpeg', ['-hide_banner', '-i', nar, '-af', 'silencedetect=noise=-35dB:d=0.12', '-f', 'null', '-'], {encoding: 'utf8'}).stderr;
const sil = [];
let cur = null;
for (const line of sd.split('\n')) {
  let m = line.match(/silence_start: ([\d.]+)/); if (m) cur = parseFloat(m[1]);
  m = line.match(/silence_end: ([\d.]+)/); if (m && cur !== null) {sil.push([cur, parseFloat(m[1])]); cur = null;}
}
if (cur !== null) sil.push([cur, dur]);
// speech intervals
const speech = [];
let t = 0;
for (const [a, b] of sil) {if (a > t) speech.push([t, a]); t = b;}
if (t < dur) speech.push([t, dur]);
const S = speech.reduce((s, [a, b]) => s + (b - a), 0);
const clock2time = (c, isStart) => {let r = c; for (const [a, b] of speech) {const l = b - a; if (isStart ? r < l : r <= l) return a + r; r -= l;} return dur;};

// 2) words
const weight = (w) => Math.max(1, (w.toLowerCase().match(/[aeiouy]+/g) || []).length) + 0.35 * w.replace(/[^a-z]/gi, '').length / 4;
const ABBR = /^(Mr|Mrs|Dr|a\.m|p\.m)\.$/i;
const words = [];
ep.beats.forEach((b, bi) => {
  if (!b.t) return;
  b.t.split(/\s+/).filter(Boolean).forEach((w) => words.push({w, beat: bi, wt: weight(w), end: /[.?!:;]$/.test(w) && !ABBR.test(w), brk: /[.?!:;,]$/.test(w) && !ABBR.test(w)}));
});
// speech-clock helpers restricted to a segment
const segTimes = (ws, t0, t1) => {
  const iv = [];
  for (const [a, b] of speech) {const x = Math.max(a, t0), y = Math.min(b, t1); if (y > x) iv.push([x, y]);}
  const Sg = iv.reduce((q, [a, b]) => q + b - a, 0) || 1e-6;
  const Wg = ws.reduce((q, w) => q + w.wt, 0);
  const at = (c, st) => {let r = c; for (const [a, b] of iv) {const l = b - a; if (st ? r < l - 1e-9 : r <= l + 1e-9) return a + r; r -= l;} return iv.length ? iv[iv.length - 1][1] : t1;};
  let cw = 0;
  for (const w of ws) {const c0 = (Sg * cw) / Wg; cw += w.wt; const c1 = (Sg * cw) / Wg; w.t0 = at(c0, true); w.t1 = at(c1, false);}
};
// global estimate first
segTimes(words, speech[0][0], dur);
// anchor at punctuation boundaries to long silences
const longSil = sil.filter(([a, b]) => b - a >= 0.2 && a > 0.3 && b < dur - 0.1);
let sp = 0, lastAnchor = 0;
const anchors = []; // {i: index of first word after boundary, a, b}
for (let i = 0; i < words.length - 1; i++) {
  if (!words[i].brk) continue;
  const pred = words[i].t1;
  let best = null;
  for (let j = sp; j < longSil.length; j++) {
    const [a, b] = longSil[j];
    if (a > pred + 1.0) break;
    if (Math.abs((a + b) / 2 - pred) <= 0.9 && a >= lastAnchor) {if (!best || Math.abs((a + b) / 2 - pred) < Math.abs((best.s[0] + best.s[1]) / 2 - pred)) best = {s: [a, b], j};}
  }
  if (best) {anchors.push({i: i + 1, a: best.s[0], b: best.s[1]}); sp = best.j + 1; lastAnchor = best.s[1];
    // re-estimate remaining words from the anchor so predictions stay local
    segTimes(words.slice(i + 1), best.s[1], dur);}
}
// final segment timing between anchors
{
  let startI = 0, startT = speech[0][0];
  const bounds = [...anchors, {i: words.length, a: dur, b: dur}];
  for (const an of bounds) {segTimes(words.slice(startI, an.i), startT, an.a); startI = an.i; startT = an.b;}
}

// 3) beats timeline with 5 s countdown inserted
const cdIdx = ep.beats.findIndex((b) => b.kind === 'countdown');
const chBeat = cdIdx - 1;
const lastCh = [...words].reverse().find((w) => w.beat === chBeat);
let X = lastCh.t1 + 0.25;
const si = sil.find(([a, b]) => b >= lastCh.t1 - 0.05 && a <= lastCh.t1 + 1.0 && b - a > 0.15);
if (si) X = Math.min(si[1] - 0.05, Math.max(si[0] + 0.05, lastCh.t1 + 0.25));
const CD = 5;
const shift = (x) => (x >= X ? x + CD : x);
const beatStart = (bi) => {const f = words.find((w) => w.beat === bi); return f ? f.t0 : null;};
const total = dur + CD + 2.4;
const beats = [];
ep.beats.forEach((b, bi) => {
  let start;
  if (bi === 0) start = 0;
  else if (b.kind === 'countdown') start = X;
  else if (b.kind === 'reveal') start = X + CD;
  else start = Math.max(0, shift(beatStart(bi)) - 0.12);
  beats.push({...b, start});
});
beats.forEach((b, i) => {b.end = i + 1 < beats.length ? beats[i + 1].start : total; delete b.t;});
// ensure monotonic
for (let i = 1; i < beats.length; i++) if (beats[i].start <= beats[i - 1].start) beats[i].start = beats[i - 1].start + 0.3;

// 4) subs
const subs = [];
let chunk = [];
const flush = () => {
  if (!chunk.length) return;
  const text = chunk.map((c) => c.w).join(' ').replace(/["“”]/g, '');
  subs.push({t0: Math.max(0, shift(chunk[0].t0) - 0.04), t1: shift(chunk[chunk.length - 1].t1) + 0.1, text, raw: chunk});
  chunk = [];
};
for (const w of words) {
  chunk.push(w);
  const len = chunk.map((c) => c.w).join(' ').length;
  if (w.end || chunk.length >= 3 || len > 20) flush();
}
flush();
for (let i = 0; i < subs.length; i++) {
  const nxt = subs[i + 1];
  if (nxt) subs[i].t1 = Math.min(subs[i].t1, nxt.t0 > subs[i].t0 ? nxt.t0 : subs[i].t1);
  delete subs[i].raw;
}
// no subtitles during countdown
const cleanSubs = subs.filter((s) => !(s.t0 >= X && s.t0 < X + CD)).map((s) => (s.t0 < X && s.t1 > X ? {...s, t1: X} : s));

// 5) audio mix
const musicFile = `audio/shared/music${ep.music}.mp3`;
const inputs = ['-i', nar, '-i', musicFile, '-i', 'audio/shared/tick.mp3', '-i', 'audio/shared/stinger.mp3', '-i', 'audio/shared/whoosh.mp3'];
const f = [];
f.push(`[0:a]atrim=0:${X.toFixed(3)},asetpts=PTS-STARTPTS[a1]`);
f.push(`[0:a]atrim=${X.toFixed(3)},asetpts=PTS-STARTPTS[a2]`);
f.push(`anullsrc=r=44100:cl=stereo,atrim=0:${CD}[sil]`);
f.push(`[a1]aresample=44100,aformat=channel_layouts=stereo[a1s]`);
f.push(`[a2]aresample=44100,aformat=channel_layouts=stereo[a2s]`);
f.push(`[a1s][sil][a2s]concat=n=3:v=0:a=1,apad=whole_dur=${total.toFixed(3)},atrim=0:${total.toFixed(3)}[narr]`);
f.push(`[narr]asplit=2[narrA][narrB]`);
f.push(`[1:a]aresample=44100,aformat=channel_layouts=stereo,atrim=0:${total.toFixed(3)},volume=0.55,afade=t=in:d=1.2,afade=t=out:st=${(total - 2.5).toFixed(2)}:d=2.5[mus]`);
f.push(`[mus][narrB]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=500[musd]`);
const sfx = [];
let k = 0;
const ticks = [0, 1, 2, 3, 4];
ticks.forEach((tt) => {const ms = Math.round((X + tt) * 1000); f.push(`[2:a]aresample=44100,aformat=channel_layouts=stereo,volume=0.9,adelay=${ms}|${ms}[s${k}]`); sfx.push(`[s${k}]`); k++;});
{const ms = Math.round((X + CD - 0.05) * 1000); f.push(`[3:a]aresample=44100,aformat=channel_layouts=stereo,volume=0.8,adelay=${ms}|${ms}[s${k}]`); sfx.push(`[s${k}]`); k++;}
beats.forEach((b, i) => {
  if (i === 0 || b.kind === 'countdown' || b.kind === 'reveal') return;
  const ms = Math.round(Math.max(0, b.start - 0.05) * 1000);
  f.push(`[4:a]aresample=44100,aformat=channel_layouts=stereo,volume=0.35,adelay=${ms}|${ms}[s${k}]`); sfx.push(`[s${k}]`); k++;
});
f.push(`[narrA]volume=1.0[nv]`);
f.push(`[nv][musd]${sfx.join('')}amix=inputs=${2 + sfx.length}:normalize=0:dropout_transition=0,atrim=0:${total.toFixed(3)},loudnorm=I=-15:TP=-1.5:LRA=11[out]`);
fs.mkdirSync('public', {recursive: true});
fs.mkdirSync('out', {recursive: true});
const mix = `public/mix-${id}.wav`;
const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...inputs, '-filter_complex', f.join(';'), '-map', '[out]', '-ar', '48000', '-ac', '2', mix], {encoding: 'utf8'});
if (r.status !== 0) {console.error(r.stderr); process.exit(1);}

const props = {id, beats, subs: cleanSubs, duration: Math.round(total * 30) / 30, audio: `mix-${id}.wav`};
fs.writeFileSync(`out/${id}.props.json`, JSON.stringify(props, null, 1));
console.log(id, 'narration', dur.toFixed(2), 'X', X.toFixed(2), 'total', total.toFixed(2), 'beats', beats.map((b) => b.start.toFixed(1)).join(','));
