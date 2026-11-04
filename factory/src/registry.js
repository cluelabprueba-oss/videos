const m=require('./mysteries.js'), fs=require('fs');
const out=process.argv[2]; fs.mkdirSync(out,{recursive:true});
const status=process.argv[3]||'SCRIPTED';
for(const x of m){
 const s=x.suspects.map(s=>`${s.name} (${s.role}): ${s.quote}${s.note?' ['+s.note+']':''}`).join('\n  - ');
 const md=`# ${x.id} — ${x.title}
Status: ${status} (IDEA -> VALIDATED -> SCRIPTED registered 2026-11-03 before production)
Created: 2026-11-03 · Category: ${x.category} · Language: English
Suspects:
  - ${s}
Clues: ${x.clues.map((c,i)=>(i+1)+') '+c.t).join(' · ')}
Solution: ${x.suspects[x.culprit].name}. ${x.explain.join('. ')}.
Mechanism (do not reuse): ${x.mechanism}
Script (EN): ${x.narration.replace(/ \|\| /g,' ')}
Planned slot: 2026-11-05 Sydney (every 2 h from 00:00)
`;
 fs.writeFileSync(`${out}/${x.id}.md`,md);
}
