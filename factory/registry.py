import json,sys,os
F=os.path.dirname(os.path.abspath(__file__))
eps=json.load(open(f'{F}/episodes.json',encoding='utf-8'))
st=json.load(open(f'{F}/state.json')) if os.path.exists(f'{F}/state.json') else {}
out=sys.argv[1]
for e in eps:
    s=st.get(e['id'],{})
    L=[f"# {e['id']} — {e['title']}",
       f"Status: {s.get('status','VALIDATED')}",
       f"Status history: {' → '.join(s.get('history',['IDEA 2026-11-15','VALIDATED 2026-11-15']))}",
       f"Created: 2026-11-15 (UTC) · Category: {e['category']} · Language: English",
       f"Question: {e['question']}",
       f"Clues: " + " | ".join(f"{i+1}) {c}" for i,c in enumerate(e['clues'])),
       f"False lead: {e['falseLead']}",
       f"Solution: {e['answer']}",
       f"Explanation: {e['explanation']}",
       f"Mechanism (do not reuse): {e['mechanism']}",
       "", "## Narration script", ""]
    L += [x['text'] for x in e['segments']]
    L += ["", "## Captions (no solution)", f"- TikTok: {e['captions']['tiktok']}", f"- Instagram: {e['captions']['instagram']}",
          f"- YouTube title: {e['captions']['youtubeTitle']}", f"- YouTube description: {e['captions']['youtubeDesc']}", "", "## Production"]
    for k in ['video','audio','sha256','raw_url','metricool','schedule','notes']:
        if k in s: L.append(f"- {k}: {s[k]}")
    open(f"{out}/{e['id']}.md",'w',encoding='utf-8').write('\n'.join(L)+'\n')
print('ok')
