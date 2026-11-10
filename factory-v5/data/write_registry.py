import json,sys,datetime as dt
eps=json.load(open('data/episodes99.json'))
st=json.load(open('data/status99.json')) if len(sys.argv)>1 else {}
out=sys.argv[1] if len(sys.argv)>1 else '/home/user/videos/registry'
for i,e in enumerate(eps):
    mad=dt.datetime(2026,11,11,14,0)+dt.timedelta(hours=2*i)
    syd=dt.datetime(2026,11,12,0,0)+dt.timedelta(hours=2*i)
    s=st.get(e['id'],{})
    full=' '.join(e['seg'][k] for k in ['hook','case','s1','s2','s3','challenge','reveal','outro'])
    L=[f"# {e['id']} — {e['title']}",
       f"Status: {s.get('status','SCRIPTED (IDEA -> VALIDATED -> SCRIPTED, 2026-11-10; registered before production)')}",
       f"Created: 2026-11-10 · Category: {e['cat']} · Language: English",
       f"Suspects: {', '.join(e['names'])}",
       "Evidence per suspect: "+' | '.join(f"{n}: {t}" for n,t in zip(e['names'],e['tags'])),
       "Clues (board): "+' · '.join(e['board']),
       f"False lead: {e['false_lead']}",
       f"Solution: {e['solution']}",
       f"Mechanism (do not reuse): {e['mechanism']}",
       f"Script (EN): {full}",
       f"Planned slot: {mad:%Y-%m-%dT%H:%M:%S} Europe/Madrid = {syd:%Y-%m-%d %H:%M} Australia/Sydney"]
    for k in ['raw','captions','video','qc','sha','metricool']:
        if k in s: L.append(s[k])
    open(f"{out}/{e['id']}.md",'w').write('\n'.join(L)+'\n')
print('wrote',len(eps))
