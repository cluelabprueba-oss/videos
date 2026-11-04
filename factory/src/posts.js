const m=require('./mysteries.js');
const tags='#mystery #riddle #detective #whodunit #brainteaser #ClueLab #puzzle #mindgames';
const out=[];
m.forEach((x,k)=>{
 const h=14+2*k; const day=5+Math.floor(h/24); const hh=h%24;
 const pad=n=>String(n).padStart(2,'0');
 const dt=`2026-11-${pad(day)}T${pad(hh)}:00:00`;
 const info={autoPublish:true,descendants:[],draft:false,firstCommentText:'',hasNotReadNotes:false,
  media:[`https://raw.githubusercontent.com/cluelabprueba-oss/videos/claude/ecstatic-volta-ddab6y/${x.id}.mp4`],
  mediaAltText:[],providers:[{network:'instagram'},{network:'tiktok'},{network:'youtube'}],
  publicationDate:{dateTime:dt,timezone:'Europe/Madrid'},shortener:false,smartLinkData:{ids:[]},
  text:`${x.cap.ig} ${tags}`,
  instagramData:{type:'REEL',showReelOnFeed:true,isAiGenerated:true},
  youtubeData:{title:`${x.cap.yt} #shorts`,type:'short',privacy:'public',tags:['mystery','riddle','detective','whodunit','brainteaser','ClueLab','shorts'],madeForKids:false,isAiGeneratedContent:true},
  tiktokData:{privacyOption:'PUBLIC_TO_EVERYONE',title:`${x.cap.tt} #mystery #riddle #detective #whodunit #brainteaser #ClueLab`,isAigc:true,disableComment:false,disableDuet:false,disableStitch:false}};
 out.push({id:x.id,date:dt+'+01:00',info});
});
require('fs').writeFileSync('out/posts.json',JSON.stringify(out));
out.forEach(o=>console.log(o.id,o.date,o.info.youtubeData.title.length));
console.log(JSON.stringify(out[0].info));
