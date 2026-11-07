import json,subprocess,sys
S='/tmp/claude-0/-home-user-videos/5391c789-2b09-5be2-af06-a8cea424721f/scratchpad'
id=sys.argv[1]
ep=json.load(open(f'props/{id}.json'))['ep']
f=ep['speed']; dur=ep['dur']
rev=ep['segs']['reveal'][0]-0.25
cd=ep['countdown']
inp=['-i',f'{S}/ep/{id}/narr_raw.mp3','-i',f'{S}/shared/music.mp3','-i',f'{S}/shared/stinger.mp3']
parts=[f"[0:a]atempo={f},apad=whole_dur={dur}[n]",
 f"[1:a]volume=0.17,afade=t=in:d=1.2,afade=t=out:st={dur-2.5}:d=2.5,atrim=0:{dur},apad=whole_dur={dur}[m]",
 f"[2:a]volume=0.9,adelay={int(rev*1000)}|{int(rev*1000)},apad=whole_dur={dur}[s]"]
labels=['[n]','[m]','[s]']
for i,c in enumerate(cd):
    inp+=['-i',f'{S}/shared/tick.mp3']
    k=3+i
    parts.append(f"[{k}:a]atrim=0:0.45,afade=t=out:st=0.3:d=0.15,volume=0.8,adelay={int(c*1000)}|{int(c*1000)},apad=whole_dur={dur}[t{i}]")
    labels.append(f'[t{i}]')
parts.append(''.join(labels)+f"amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{dur},alimiter=limit=0.95[out]")
cmd=['ffmpeg','-y','-loglevel','error',*inp,'-filter_complex',';'.join(parts),'-map','[out]','-ar','44100','-ac','2',f'out/{id}_mix.wav']
subprocess.check_call(cmd)
print('mixed',id)
