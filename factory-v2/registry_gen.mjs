import fs from 'node:fs';
import {episodes} from './episodes.mjs';
const slot = (i) => { const h = 14 + 2 * i; const d = h >= 24 ? 7 : 6; return `2026-11-0${d}T${String(h % 24).padStart(2, '0')}:00:00`; };
const BR = 'claude/ecstatic-volta-huo5dc';
episodes.forEach((e, i) => {
  const script = e.beats.map((b) => b.t).filter(Boolean).join(' ');
  const md = `# ${e.id} — ${e.title}
Status: SCRIPTED (registered 2026-11-05 before video render; PRODUCED -> GITHUB_UPLOADED -> METRICOOL_IMPORTED -> SCHEDULED tracked below)
Created: 2026-11-05 · Category: ${e.cat} · Language: English
Suspects: ${e.suspects}
Clues: ${e.clues.map((c, k) => `${k + 1}) ${c}`).join(' · ')}
False lead: ${e.falseLead}
Solution: ${e.solution}
Mechanism (do not reuse): ${e.mechanism}
Script (EN): ${script}
Planned slot: ${slot(i)} Europe/Madrid = 2026-11-07 ${String(2 * i).padStart(2, '0')}:00 Australia/Sydney
Raw URL: https://raw.githubusercontent.com/cluelabprueba-oss/videos/${BR}/${e.id}.mp4
`;
  fs.writeFileSync(`../registry/${e.id}.md`, md);
});
console.log('written', episodes.length);
