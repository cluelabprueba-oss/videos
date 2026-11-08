import json
H_IG="#mystery #riddle #detective #whodunit #brainteaser #ClueLab #puzzle #mindgames"
H_TT="#mystery #riddle #detective #whodunit #brainteaser #ClueLab"
S={
"CL-0075":("A diamond gone from a locked study. One door, watched all night. The numbers in the floor plan do not add up. Ada, Boris or Cleo? Comment your answer before the reveal.","Twelve meters outside. Nine inside. Where did the diamond go? Ada, Boris or Cleo? Comment your answer.","Twelve meters outside, nine inside: who took the diamond? #shorts"),
"CL-0076":("Three evidence bags. Three labels. Every single label is wrong. You may open only one. Rina, Sol or Teo? Comment your answer before the reveal.","Every label is wrong. You can open one bag. Which one? Rina, Sol or Teo? Comment your answer.","Every label is wrong: which bag do you open? #shorts"),
"CL-0077":("A robbed pantry. A half-eaten apple. One bite that points to one smile. Dax, Lena or Milo? Comment your answer before the reveal.","The thief left a bite behind. Teeth never lie. Dax, Lena or Milo? Comment your answer.","The bitten apple that named the thief #shorts"),
"CL-0078":("A dead man's loan letters. Three neighbors. One word that should not exist yet. Dov, Elsa or Finn? Comment your answer before the reveal.","Three loan letters from 1998. One of them is a fake. Dov, Elsa or Finn? Comment your answer.","Which 1998 loan letter is a fake? #shorts"),
"CL-0079":("A baby lost thirty years ago. Three claimants. Two parents with the same blood type. Wade, Zoe or Alec? Comment your answer before the reveal.","Three people claim to be the lost heir. Only blood tells the truth. Wade, Zoe or Alec? Comment your answer.","Three claimants, one lost heir: who is real? #shorts"),
"CL-0080":("A threat note at the bank, with one date on it. Three clerks, three hometowns. Ana, Ben or Cai? Comment your answer before the reveal.","One date on a note gave the writer away. Ana, Ben or Cai? Comment your answer.","The date on the note gave the writer away #shorts"),
"CL-0081":("A shop robbed at noon, forty kilometers away. One car. Three logged trips. Pete, Lucy or Omar? Comment your answer before the reveal.","The odometer never lies. Pete, Lucy or Omar? Comment your answer.","The odometer exposed the liar: who drove to the shop? #shorts"),
"CL-0082":("A typed threat. A dead man. Two tiny flaws in the letters. Vera, Walt or Yara? Comment your answer before the reveal.","Every typewriter has a signature. Whose is it? Vera, Walt or Yara? Comment your answer.","The typewriter's two flaws: who typed the threat? #shorts"),
"CL-0083":("Mr. Voss is dead. Three alibis. One body that cannot lie. Lars, Mina or Noor? Comment your answer before the reveal.","His alibi sounded perfect. His body disagreed. Lars, Mina or Noor? Comment your answer.","His alibi was perfect. His body disagreed #shorts"),
"CL-0084":("A wanted man hides in a boarding house. One name shouted across the room. Kit, Leon or Mara? Comment your answer before the reveal.","A fugitive can change his name, but not his reflex. Kit, Leon or Mara? Comment your answer.","Who is the fugitive? One name, one reaction #shorts"),
"CL-0085":("A fire in a locked, empty room. No match, no wires. Just the afternoon sun. Orla, Piers or Reed? Comment your answer before the reveal.","A fire started in an empty room. Nobody lit it. Orla, Piers or Reed? Comment your answer.","A fire with no match in a locked room #shorts"),
"CL-0086":("Three switches. One bulb. One visit to the vault. The clue is not light. Sal, Tia or Uri? Comment your answer before the reveal.","One visit, three switches, one dark bulb. Sal, Tia or Uri? Comment your answer.","Three switches, one visit: which one is it? #shorts"),
}
out={}
for k,(ig,tt,yt) in S.items():
    out[k]=dict(ig=f"{ig} {H_IG}",tt=f"{tt} {H_TT}",yt=yt,
      ytd="A ClueLab mystery: three suspects, one deduction. Can you solve it before the countdown ends? Comment your answer! #mystery #riddle #detective #whodunit #shorts")
json.dump(out,open('data/social.json','w'),indent=1)
for k,v in out.items(): print(k,len(v['ig']),len(v['tt']),len(v['yt']))
