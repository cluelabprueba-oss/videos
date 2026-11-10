import json,datetime as dt
eps=json.load(open('data/episodes99.json')); soc=json.load(open('data/social99.json'))
RAW="https://raw.githubusercontent.com/cluelabprueba-oss/videos/claude/ecstatic-volta-0283sr/"
out={}
for i,e in enumerate(eps):
    s=soc[e['id']]; mad=dt.datetime(2026,11,11,14,0)+dt.timedelta(hours=2*i)
    info={"autoPublish":True,"draft":False,"descendants":[],"firstCommentText":"","hasNotReadNotes":False,
      "media":[RAW+e['id']+".mp4"],"mediaAltText":[],"shortener":False,"smartLinkData":{"ids":[]},
      "providers":[{"network":"instagram"},{"network":"tiktok"},{"network":"youtube"}],
      "publicationDate":{"dateTime":mad.strftime('%Y-%m-%dT%H:%M:%S'),"timezone":"Europe/Madrid"},
      "text":s['ig'],
      "instagramData":{"type":"REEL","showReelOnFeed":True,"isAiGenerated":True},
      "tiktokData":{"privacyOption":"PUBLIC_TO_EVERYONE","title":s['tt'],"disableComment":False,"disableDuet":False,"disableStitch":False,"isAigc":True,"autoAddMusic":False},
      "youtubeData":{"title":s['yt'],"type":"short","privacy":"public","tags":["mystery","riddle","detective","whodunit","brainteaser","ClueLab","shorts"],"madeForKids":False,"isAiGeneratedContent":True}}
    out[e['id']]={"date":mad.strftime('%Y-%m-%dT%H:%M:%S')+"+01:00","info":json.dumps(info,ensure_ascii=False)}
json.dump(out,open('data/posts99.json','w'),indent=1)
print(out['CL-0099']['info'])
