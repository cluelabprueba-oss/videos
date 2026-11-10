import json
H_IG="#mystery #riddle #detective #whodunit #brainteaser #ClueLab #puzzle #mindgames"
H_TT="#mystery #riddle #detective #whodunit #brainteaser #ClueLab"
S={
"CL-0099":("A bakery robbed in the rain. A thief too fast to be on foot. Three muddy suspects. Ada, Bram or Cole? Comment your answer before the reveal.","Three muddy suspects. Only one was riding. Ada, Bram or Cole? Comment your answer.","Three muddy suspects: who was riding? #shorts"),
"CL-0100":("A ski lodge party. Everyone drank the same punch. Only one man died. Bianca, Colm or Dario? Comment your answer before the reveal.","Same punch, same bowl. Only one man died. Bianca, Colm or Dario? Comment your answer.","Same drink, only one victim. How? #shorts"),
"CL-0101":("Three sacks of gold. One is full of fakes. One weighing to find it. Anton, Bea or Cruz? Comment your answer before the reveal.","One scale. One weighing. It names the thief. Anton, Bea or Cruz? Comment your answer.","One weighing finds the fake gold #shorts"),
"CL-0102":("A theater box office robbed. One question for three staff members. One answer gives the thief away. Della, Ezra or Fiona? Comment your answer before the reveal.","One question exposed the thief. Della, Ezra or Fiona? Comment your answer.","The question that exposed the thief #shorts"),
"CL-0103":("An attack in an alley. Three suspects, three injuries. Only one is from last night. Nadia, Otis or Perry? Comment your answer before the reveal.","Three injuries. Only one is from last night. Nadia, Otis or Perry? Comment your answer.","Which injury is from last night? #shorts"),
"CL-0104":("A barn fire at midnight. A strong west wind. Three neighbors, one impossible story. Gwen, Hal or Ivo? Comment your answer before the reveal.","The wind decides where smoke goes. Gwen, Hal or Ivo? Comment your answer.","The smoke that went the wrong way #shorts"),
"CL-0105":("A robber on the run. A night of heavy snow. Three cabins, all 'empty'. Jorge, Kit or Lior? Comment your answer before the reveal.","Three empty cabins. One roof tells the truth. Jorge, Kit or Lior? Comment your answer.","Three empty cabins. One is lying #shorts"),
"CL-0106":("A bolted study. No wound, no poison, and yet, murder. Mila, Nico or Otto? Comment your answer before the reveal.","A locked room. No wound. Still murder. Mila, Nico or Otto? Comment your answer.","Murder in a bolted room #shorts"),
"CL-0107":("A safe with no log. A keypad wiped at six. Four keys with prints. Pia, Quin or Rob? Comment your answer before the reveal.","The safe keeps no log, but the keypad remembers. Pia, Quin or Rob? Comment your answer.","The keypad that remembered #shorts"),
"CL-0108":("A diamond ring gone from suite nine. One simple question. Listen to the answers. Rosa, Saul or Tobias? Comment your answer before the reveal.","Three answers to one simple question. Listen closely. Rosa, Saul or Tobias? Comment your answer.","Listen closely: who took the ring? #shorts"),
"CL-0109":("A dead man's fist holds a button. Three coats checked at dawn. Uma, Vlad or Wes? Comment your answer before the reveal.","A torn button. Three coats. Uma, Vlad or Wes? Comment your answer.","The button in a dead man's hand #shorts"),
"CL-0110":("A burglary across town. Three alibis. Three electricity graphs. Yuri, Zoe or Abe? Comment your answer before the reveal.","Three alibis, three power graphs. One is a lie. Yuri, Zoe or Abe? Comment your answer.","Three power graphs, one fake alibi #shorts"),
}
out={k:dict(ig=f"{ig} {H_IG}",tt=f"{tt} {H_TT}",yt=yt,ytd="A ClueLab mystery: three suspects, one deduction. Can you solve it before the countdown ends? Comment your answer! #mystery #riddle #detective #whodunit #shorts") for k,(ig,tt,yt) in S.items()}
json.dump(out,open('data/social99.json','w'),indent=1)
for k,v in out.items(): print(k,len(v['ig']),len(v['tt']),len(v['yt']))
