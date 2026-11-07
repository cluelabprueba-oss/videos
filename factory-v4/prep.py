import json,re,difflib
S='/tmp/claude-0/-home-user-videos/5391c789-2b09-5be2-af06-a8cea424721f/scratchpad'
eps=json.load(open('data/episodes.json'))
off1=json.load(open(f'{S}/offsets.json')); off2=json.load(open(f'{S}/offsets2.json'))
W1=[w for w in json.load(open(f'{S}/words.json'))['words'] if w.get('type')=='word']
W2=[w for w in json.load(open(f'{S}/words2.json'))['words'] if w.get('type')=='word']
norm=lambda s:re.sub(r"[^a-z0-9']","",s.lower())
SPEED={"CL-0063":1.2}
for e in eps:
    id=e['id']; f=SPEED.get(id,1.1)
    if e.get('src'): o,d=off1[e['src']]; W=W1
    else: o,d=off2[id]; W=W2
    ws=[w for w in W if w['start']>=o-0.5 and w['end']<=o+d+0.8]
    names=list(e['seg'].keys())
    stoks=[];sseg=[]
    for k in names:
        for t in e['seg'][k].split():
            stoks.append(t); sseg.append(k)
    a=[norm(t) for t in stoks]; b=[norm(w['text']) for w in ws]
    sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
    tm={}
    for blk in sm.get_matching_blocks():
        for i in range(blk.size): tm[blk.a+i]=blk.b+i
    n=len(stoks); st=[None]*n; en=[None]*n
    for i,j in tm.items():
        st[i]=(ws[j]['start']-o)/f; en[i]=(ws[j]['end']-o)/f
    for i in range(n):
        if st[i] is None:
            l=i-1
            while l>=0 and st[l] is None: l-=1
            r=i+1
            while r<n and st[r] is None: r+=1
            lt=en[l] if l>=0 else 0.0
            rt=st[r] if r<n else lt+0.4
            cnt=r-l-1; idx=i-l-1
            st[i]=lt+(rt-lt)*idx/cnt; en[i]=lt+(rt-lt)*(idx+1)/cnt
    words=[{"t":round(st[i],3),"e":round(en[i],3),"w":stoks[i],"seg":sseg[i]} for i in range(n)]
    segs={}
    for k in names:
        idx=[i for i in range(n) if sseg[i]==k]
        segs[k]=[words[idx[0]]['t'],words[idx[-1]]['e'],idx[0],idx[-1]]
    ch=segs['challenge']; cd=[words[i]['t'] for i in range(ch[3]-4,ch[3]+1)]
    narr_end=words[-1]['e']; dur=min(59.6,narr_end+2.2)
    ep=dict(e); ep.update(words=words,segs=segs,countdown=cd,dur=round(dur,2),speed=f,unmatched=n-len(tm))
    json.dump({'ep':ep},open(f'props/{id}.json','w'))
    print(id,'f',f,'narr_end',round(narr_end,2),'dur',ep['dur'],'unmatched',ep['unmatched'],'/',n,'cd',[round(x,1) for x in cd])
