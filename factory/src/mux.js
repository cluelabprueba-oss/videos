const {execFileSync}=require('child_process'); const fs=require('fs');
const id=process.argv[2]; const P=JSON.parse(fs.readFileSync(`props/${id}.json`)); const T=P.timing;
const ins=[`audio/${id}_nar.wav`,'audio/music_bed.mp3','audio/sfx_sting.mp3','audio/sfx_tick.mp3','audio/sfx_whoosh.mp3'];
const args=['-v','error','-y']; ins.forEach(f=>args.push('-i',f)); args.push('-i',`out/${id}_video.mp4`);
const total=T.total; let fc=[];
fc.push(`[0:a]apad=whole_dur=${total},volume=1.0[nar]`);
fc.push(`[1:a]aloop=loop=-1:size=2e9,atrim=0:${total},afade=t=in:d=1.5,afade=t=out:st=${(total-2.5).toFixed(2)}:d=2.5,volume=0.14[mus]`);
const evs=[]; // [inputIdx, time, vol]
evs.push([2,T.segStart[7]-0.05,0.9]);
T.countdown.forEach(c=>evs.push([3,c.t,0.55]));
[1,2,3,4,5,8].forEach(i=>evs.push([4,Math.max(0,T.segStart[i]-0.12),0.35]));
const labs=['nar','mus'];
evs.forEach((e,k)=>{const ms=Math.round(e[1]*1000); fc.push(`[${e[0]}:a]adelay=${ms}|${ms},volume=${e[2]}[e${k}]`); labs.push('e'+k);});
fc.push(`${labs.map(l=>'['+l+']').join('')}amix=inputs=${labs.length}:normalize=0:duration=longest,atrim=0:${total},loudnorm=I=-15:TP=-1.5:LRA=9[aout]`);
args.push('-filter_complex',fc.join(';'),'-map',`${ins.length}:v`,'-map','[aout]','-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-ac','2','-movflags','+faststart','-t',String(total),`out/${id}.mp4`);
execFileSync('ffmpeg',args,{stdio:'inherit'});
const dur=execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',`out/${id}.mp4`]).toString().trim();
console.log(id,'muxed',dur);
