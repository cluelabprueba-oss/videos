import json,re,difflib,os
eps=json.load(open('data/episodes.json'))
os.makedirs('props',exist_ok=True)
norm=lambda s:re.sub(r"[^a-z0-9']","",s.lower())
for e in eps:
    id=e['id']
    W=[w for w in json.load(open(f'ep/{id}/words.json'))['words'] if w.get('type')=='word']
    narr_end=W[-1]['end']
    f=min(1.25,max(1.08,narr_end/57.3))
    names=list(e['seg'].keys())
    stoks=[];sseg=[]
    for k in names:
        for t in e['seg'][k].split():
            stoks.append(t); sseg.append(k)
    a=[norm(t) for t in stoks]; b=[norm(w['text']) for w in W]
    sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
    tm={}
    for blk in sm.get_matching_blocks():
        for i in range(blk.size): tm[blk.a+i]=blk.b+i
    n=len(stoks); st=[None]*n; en=[None]*n
    for i,j in tm.items():
        st[i]=W[j]['start']/f; en[i]=W[j]['end']/f
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
    dur=min(59.7,words[-1]['e']+2.2)
    ep=dict(e); ep.update(words=words,segs=segs,countdown=cd,dur=round(dur,2),speed=round(f,4),unmatched=n-len(tm))
    json.dump({'ep':ep},open(f'props/{id}.json','w'))
    print(id,'raw_end',round(narr_end,2),'f',round(f,3),'dur',ep['dur'],'unmatched',ep['unmatched'],'/',n,'cd',[round(x,1) for x in cd])
