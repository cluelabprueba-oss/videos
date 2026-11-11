import json,datetime as dt
H_IG="#mystery #riddle #detective #whodunit #brainteaser #ClueLab #puzzle #mindgames"
H_TT="#mystery #riddle #detective #whodunit #brainteaser #ClueLab"
S={
"CL-0112":("A downpour all night. A necklace gone at 8:30. Three guests, three umbrellas. Ines, Jonah or Kara? Comment your answer before the reveal.","Three guests, three umbrellas. One never saw the rain. Ines, Jonah or Kara? Comment your answer.","Three umbrellas. One never saw the rain #shorts"),
"CL-0114":("A locked door. Poison on his tongue. Clean food, clean tea. Ruth, Simon or Tara? Comment your answer before the reveal.","He died alone behind a locked door. Ruth, Simon or Tara? Comment your answer.","Poisoned behind a locked door. How? #shorts"),
"CL-0115":("A beach hut break-in. Three trails of footprints in the wet sand. Only one was running. Vera, Wim or Yara? Comment your answer before the reveal.","Three trails in the sand. One was running. Vera, Wim or Yara? Comment your answer.","Three trails in the sand: who ran? #shorts"),
"CL-0120":("A locked house. No broken window. The car keys are gone anyway. Abel, Bree or Cyril? Comment your answer before the reveal.","No key, no broken window, and the car is gone. Abel, Bree or Cyril? Comment your answer.","The car keys vanished from a locked house #shorts"),
}
out={k:dict(ig=f"{ig} {H_IG}",tt=f"{tt} {H_TT}",yt=yt) for k,(ig,tt,yt) in S.items()}
json.dump(out,open('data/social111.json','w'),indent=1)
RAW="https://raw.githubusercontent.com/cluelabprueba-oss/videos/claude/ecstatic-volta-yqigi3/"
posts={}
for i,k in enumerate(S):
    s=out[k]; mad=dt.datetime(2026,11,12,14,0)+dt.timedelta(hours=2*i)
    info={"autoPublish":True,"draft":False,"descendants":[],"firstCommentText":"","hasNotReadNotes":False,
      "media":[RAW+k+".mp4"],"mediaAltText":[],"shortener":False,"smartLinkData":{"ids":[]},
      "providers":[{"network":"instagram"},{"network":"tiktok"},{"network":"youtube"}],
      "publicationDate":{"dateTime":mad.strftime('%Y-%m-%dT%H:%M:%S'),"timezone":"Europe/Madrid"},
      "text":s['ig'],
      "instagramData":{"type":"REEL","showReelOnFeed":True,"isAiGenerated":True},
      "tiktokData":{"privacyOption":"PUBLIC_TO_EVERYONE","title":s['tt'],"disableComment":False,"disableDuet":False,"disableStitch":False,"isAigc":True,"autoAddMusic":False},
      "youtubeData":{"title":s['yt'],"type":"short","privacy":"public","tags":["mystery","riddle","detective","whodunit","brainteaser","ClueLab","shorts"],"madeForKids":False,"isAiGeneratedContent":True}}
    posts[k]={"date":mad.strftime('%Y-%m-%dT%H:%M:%S')+"+01:00","info":json.dumps(info,ensure_ascii=False)}
json.dump(posts,open('data/posts111.json','w'),indent=1)
for k,v in out.items(): print(k,len(v['ig']),len(v['tt']),len(v['yt']))
