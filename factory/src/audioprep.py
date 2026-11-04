import subprocess,sys,json,re,difflib,os
from faster_whisper import WhisperModel
sys.path.insert(0,'.')
ids=sys.argv[1:]
model=WhisperModel("base.en",device="cpu",compute_type="int8")
spec=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(require('./src/mysteries.js')))"]))
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
def norm(w): 
    w=w.lower().replace("’","'")
    return re.sub(r"[^a-z0-9']","",w)
for cid in ids:
    x=[s for s in spec if s['id']==cid][0]
    raw=f'audio/{cid}_raw.mp3'; tr=f'audio/{cid}_trim.wav'
    subprocess.check_call(['ffmpeg','-v','error','-y','-i',raw,'-af','silenceremove=stop_periods=-1:stop_duration=0.36:stop_threshold=-42dB:stop_silence=0.24','-ar','48000','-ac','1',tr])
    d0=dur(tr)
    F=max(1.0,d0/56.0); F=min(F,1.2)
    nar=f'audio/{cid}_nar.wav'
    subprocess.check_call(['ffmpeg','-v','error','-y','-i',tr,'-af',f'atempo={F:.4f}',nar])
    d1=dur(nar)
    segs,_=model.transcribe(nar,word_timestamps=True,language='en')
    ww=[(w.word.strip(),w.start,w.end) for s in segs for w in s.words]
    # script words with segment index
    sw=[];
    for si,seg in enumerate(x['narration'].split(' || ')):
        for tok in seg.split():
            sw.append((tok,si))
    a=[norm(t) for t,_ in sw]; b=[norm(w) for w,_,_ in ww]
    sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
    start=[None]*len(sw); end=[None]*len(sw)
    for tag,i1,i2,j1,j2 in sm.get_opcodes():
        if tag=='equal':
            for k in range(i2-i1):
                start[i1+k]=ww[j1+k][1]; end[i1+k]=ww[j1+k][2]
        elif tag=='replace' and (i2-i1)==(j2-j1):
            for k in range(i2-i1):
                start[i1+k]=ww[j1+k][1]; end[i1+k]=ww[j1+k][2]
    # interpolate gaps
    n=len(sw); i=0
    while i<n:
        if start[i] is None:
            j=i
            while j<n and start[j] is None: j+=1
            t0=end[i-1] if i>0 else 0.0
            t1=start[j] if j<n else d1
            for k in range(i,j):
                f0=(k-i)/(j-i); f1=(k-i+1)/(j-i)
                start[k]=t0+(t1-t0)*f0; end[k]=t0+(t1-t0)*f1
            i=j
        else: i+=1
    unmatched=sum(1 for k in range(n) if False)
    words=[{'w':sw[k][0],'seg':sw[k][1],'s':round(start[k],3),'e':round(end[k],3)} for k in range(n)]
    segStart=[min(w['s'] for w in words if w['seg']==si) for si in range(10)]
    nmatch=sum(1 for tag,i1,i2,j1,j2 in sm.get_opcodes() if tag=='equal' for _ in range(i2-i1))
    json.dump({'id':cid,'dur':d1,'factor':F,'words':words,'segStart':segStart,'ratio':nmatch/len(sw)},open(f'audio/{cid}_timing.json','w'))
    print(cid,'raw',round(dur(raw),1),'trim',round(d0,1),'F',round(F,3),'final',round(d1,1),'match',round(nmatch/len(sw),3),'segStart',[round(s,1) for s in segStart])
