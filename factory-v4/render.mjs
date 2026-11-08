import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import fs from 'fs';
import path from 'path';
const CH = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const [mode, ...rest] = process.argv.slice(2);
const bundled = await bundle({entryPoint: path.resolve('src/index.ts')});
const opts = {browserExecutable: CH, logLevel: 'error'};
fs.mkdirSync('out', {recursive: true});
fs.mkdirSync('stills', {recursive: true});
if (mode === 'stills') {
  for (const id of rest) {
    const props = JSON.parse(fs.readFileSync(`props/${id}.json`, 'utf8'));
    const comp = await selectComposition({serveUrl: bundled, id: 'Main', inputProps: props, ...opts});
    const e = props.ep, S = e.segs;
    const times = {hook: 1.2, case: S.case[0] + 4, s1: S.s1[0] + 2.5, challenge: S.challenge[0] + 1, count: e.countdown[2] + 0.3, reveal: S.reveal[0] + 3.5, outro: S.outro[0] + 1.5};
    for (const [k, t] of Object.entries(times)) {
      await renderStill({composition: comp, serveUrl: bundled, output: `stills/${id}_${k}.png`, inputProps: props, frame: Math.min(comp.durationInFrames - 1, Math.round(t * 30)), ...opts});
    }
    console.log('stills', id);
  }
} else {
  for (const id of rest) {
    const props = JSON.parse(fs.readFileSync(`props/${id}.json`, 'utf8'));
    const comp = await selectComposition({serveUrl: bundled, id: 'Main', inputProps: props, ...opts});
    const t0 = Date.now();
    await renderMedia({composition: comp, serveUrl: bundled, codec: 'h264', crf: 20, pixelFormat: 'yuv420p', outputLocation: `out/${id}_v.mp4`, inputProps: props, concurrency: 4, ...opts});
    console.log('rendered', id, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
}
