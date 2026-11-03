// builds props json (spec + timing with chunks/countdown) for a mystery id
const fs=require('fs'); const m=require('./mysteries.js');
const id=process.argv[2]; const spec=m.find(x=>x.id===id); const tm=JSON.parse(fs.readFileSync(`audio/${id}_timing.json`));
const words=tm.words.map(w=>({w:w.w,s:w.s,e:w.e,seg:w.seg}));
// chunks: up to 4 words, break at punctuation or seg change
const chunks=[];let cur=[];
const flush=()=>{if(cur.length){chunks.push({s:cur[0].s,e:cur[cur.length-1].e,words:cur});cur=[];}};
words.forEach((w,i)=>{
  if(cur.length&&cur[0].seg!==w.seg) flush();
  cur.push(w);
  if(/[.,?!:;]$/.test(w.w)||cur.length>=4) flush();
});
flush();
// extend chunk ends to next chunk start for continuity (max 0.35s)
for(let i=0;i<chunks.length-1;i++){chunks[i].e=Math.min(chunks[i+1].s,chunks[i].e+0.35);}
const seg6=words.filter(w=>w.seg===6); const last5=seg6.slice(-5);
const countdown=last5.map((w,i)=>({n:5-i,t:w.s}));
const seg9=words.filter(w=>w.seg===9); const thisW=seg9.find(w=>/^this$/i.test(w.w.replace(/[^a-z]/gi,'')));
const logoAt=thisW?thisW.s:tm.dur-1.2;
const total=Math.round((tm.dur+2.2)*30)/30;
const timing={dur:tm.dur,total,segStart:tm.segStart,chunks,countdown,logoAt};
fs.writeFileSync(`props/${id}.json`,JSON.stringify({spec,timing}));
console.log(id,'total',total.toFixed(2),'countdown',countdown.map(c=>c.n+'@'+c.t.toFixed(1)).join(' '),'logoAt',logoAt.toFixed(1),'chunks',chunks.length);
