// ClueLab Nov-6 batch (Sydney day): CL-0039..CL-0050. Narration segments separated by || => scenes 1:1
// segs: 0 hook | 1 case | 2,3,4 suspects | 5 clues | 6 challenge+countdown | 7 reveal | 8 explanation | 9 closing
const CLOSE='Did you catch it? Tell us in the comments. This is ClueLab.';
const J=a=>a.concat([CLOSE]).join(' || ');
module.exports = [
{
 id:'CL-0039', title:'The Fire That Came Second', category:'Who is the killer',
 mechanism:'Autopsy: no soot in the airway means the victim was dead before the fire, so a claimed "screaming in the flames" is impossible',
 hook:'A DEAD MAN CANNOT SCREAM', caseTitle:'A HOUSE BURNS AT 2 AM', caseSub:'A man found in the ashes', caseIcon:'flame',
 suspects:[
  {name:'ROY', role:'neighbour', quote:'"I heard him screaming for help in the flames."', icon:'hat'},
  {name:'PAM', role:'sister · heir', quote:'"Asleep, across town."', icon:'glasses', note:'inherits the house'},
  {name:'OLLY', role:'tenant', quote:'"I smelled smoke and ran outside."', icon:'cap'}],
 clues:[{icon:'hospital',t:'Coroner: no soot in his lungs'},{icon:'bubble',t:'Roy "heard him screaming"'},{icon:'house',t:'Pam inherits the house'}],
 culprit:0, explain:['A living person breathes soot in a fire','No soot: he died before the flames','Nobody could have heard him scream','Pam\'s inheritance: false lead'],
 narration:J([
 'A dead man cannot scream. So who heard him?',
 'A house burns at two in the morning. Firefighters find a man in the ashes.',
 'Roy, the neighbour: "I heard him screaming for help inside the flames."',
 'Pam, his sister, who inherits the house: "I was asleep, across town."',
 'Olly, the tenant: "I smelled smoke and ran outside."',
 'The coroner finds just one thing. There is no soot in the man\'s lungs.',
 'Who killed him? You have five seconds. Five. Four. Three. Two. One.',
 'It was Roy.',
 'A living person breathes soot in a fire. No soot means he was dead before the flames. Nobody could have heard him scream. Pam\'s inheritance was a false lead.']),
 cap:{ig:'A house fire. A man in the ashes. A neighbour who heard him scream. Roy, Pam or Olly? Comment your answer before the reveal.', tt:'Someone heard a scream that never happened. Roy, Pam or Olly? Comment your answer.', yt:'A fire, a scream, and one impossible witness', ytd:'A man found in the ashes and three suspects. One statement cannot be true. Can you find it before the countdown?'}
},
{
 id:'CL-0040', title:'The Frozen Breath', category:'Spot the lie',
 mechanism:'Visible breath vapour in sub-zero air: an "outdoor" night video with no breath cloud was filmed indoors',
 hook:'HIS VIDEO PROVES HE WAS OUTSIDE?', caseTitle:'MIDNIGHT AT A SKI LODGE', caseSub:'Minus 8 degrees · empty safe', caseIcon:'cloud',
 suspects:[
  {name:'LARS', role:'skier', quote:'"Filming the aurora from the porch."', icon:'cap'},
  {name:'MAYA', role:'cook · keys', quote:'"Walked to the lake, filmed it."', icon:'hat', note:'holds the keys'},
  {name:'NIKO', role:'guest', quote:'"Filming the stars from the garden."', icon:'glasses'}],
 clues:[{icon:'thermo',t:'Midnight: minus 8 degrees'},{icon:'cloud',t:'Lars and Maya: white breath clouds'},{icon:'phone',t:'Niko\'s video: no breath at all'}],
 culprit:2, explain:['Freezing air turns breath to white vapour','Niko\'s breath was invisible','He filmed from the warm lodge','Maya\'s keys: false lead'],
 narration:J([
 'His video proves he was outside. His breath says he was not.',
 'Midnight at a ski lodge. Minus eight degrees. The safe is empty.',
 'Lars, the skier: "I filmed the aurora from the porch." His breath floats in a white cloud.',
 'Maya, the cook, who holds the keys: "I walked to the lake and filmed it." Her breath clouds too.',
 'Niko, the guest: "I filmed the stars from the garden."',
 'Watch his video again. The air is minus eight. Yet from his mouth, no breath at all.',
 'Who emptied the safe? You have five seconds. Five. Four. Three. Two. One.',
 'It was Niko.',
 'In freezing air, every breath turns to white vapour. His did not, because he was standing in the warm lodge. Maya\'s keys were a false lead.']),
 cap:{ig:'Minus eight degrees. Three videos. One breath that never showed. Lars, Maya or Niko? Comment your answer before the reveal.', tt:'His video says outside. His breath says inside. Lars, Maya or Niko? Comment your answer.', yt:'His video proves he was outside? Look at his breath', ytd:'Three alibi videos from a freezing night. One of them cannot be real. Can you spot it?'}
},
{
 id:'CL-0041', title:'The Wrong Board', category:'Hidden clue',
 mechanism:'Chessboard orientation rule (light square at each player\'s right): a board set up turned 90 degrees exposes a staged scene by a non-player',
 hook:'THE BOARD IS SET UP WRONG', caseTitle:'DEAD MID-GAME', caseSub:'A chess master · pieces still in place', caseIcon:'board',
 suspects:[
  {name:'VERA', role:'champion', quote:'"We played every Friday."', icon:'glasses'},
  {name:'DREW', role:'neighbour', quote:'"We played in the park. He always won."', icon:'cap'},
  {name:'GIL', role:'brother', quote:'"Chess? Never learned. Which one is the horse?"', icon:'hat'}],
 clues:[{icon:'board',t:'Right-hand corner is DARK'},{icon:'eye',t:'Real players sit with a LIGHT square on the right'},{icon:'bubble',t:'Gil: "Which one is the horse?"'}],
 culprit:2, explain:['A correct board has a light square at each player\'s right','This one is turned the wrong way','Players would never set it up like this','Only a non-player staged the scene: Gil'],
 narration:J([
 'The board is set up wrong. And that gives the killer away.',
 'A chess master is found dead at his table, mid-game. The pieces are still in place.',
 'Vera, the champion: "We played every Friday. I lost last week."',
 'Drew, the neighbour: "I play with him in the park. He always won."',
 'Gil, the brother: "Chess? Never learned. Which one is the horse?"',
 'Look at the board. Every player sits with a light square at their right hand. Here, the right-hand corner is dark.',
 'Who staged this? You have five seconds. Five. Four. Three. Two. One.',
 'It was Gil.',
 'Anyone who plays would notice a board turned the wrong way. Vera and Drew would never set it up like this. Only someone who does not know chess would. Gil staged the scene.']),
 cap:{ig:'A chess master dead mid-game. Three people who say they know him. One board set up all wrong. Vera, Drew or Gil? Comment your answer before the reveal.', tt:'The board is wrong, and so is the alibi. Vera, Drew or Gil? Comment your answer.', yt:'The chessboard mistake that exposed a killer', ytd:'One tiny error on a chessboard and three suspects. Do you know what is wrong with this board?'}
},
{
 id:'CL-0042', title:'The Man Who Drowned in His Study', category:'Impossible crime',
 mechanism:'Salt water (and sand) in the lungs of a victim found in a dry inland room: he drowned at the coast and was moved; fresh-water pool is a false lead',
 hook:'DROWNED IN A DRY ROOM', caseTitle:'A DROWNING 200 KM FROM THE SEA', caseSub:'Locked study · bone-dry floor', caseIcon:'wave',
 suspects:[
  {name:'ABEL', role:'gardener', quote:'"Cleaning the pool all day."', icon:'cap'},
  {name:'NELL', role:'neighbour', quote:'"Weekend at my coastal cottage."', icon:'hat'},
  {name:'IVO', role:'accountant', quote:'"Home. Alone. Working."', icon:'glasses'}],
 clues:[{icon:'hospital',t:'Lungs full of SALT water'},{icon:'house',t:'Pool = fresh water · study floor dry'},{icon:'car',t:'Nell\'s car boot: damp sand'}],
 culprit:1, explain:['Salt water means the sea, not the pool','He drowned at the coast','Then he was carried home','Abel\'s pool: false lead'],
 narration:J([
 'He drowned in a locked, dry study. But where?',
 'A man is found dead in his study, two hundred kilometres from the sea. His lungs are full of salt water.',
 'Abel, the gardener: "I was cleaning the pool all day."',
 'Nell, his neighbour: "I spent the weekend at my cottage by the coast."',
 'Ivo, the accountant: "Home. Alone. Working."',
 'The pool is fresh water. The study floor is bone dry. And in Nell\'s car, a boot full of damp sand.',
 'Who killed him? You have five seconds. Five. Four. Three. Two. One.',
 'It was Nell.',
 'Salt water means the sea, not the pool. He drowned at the coast and was brought home. Nell had the cottage and the sand. Abel\'s pool was a false lead.']),
 cap:{ig:'Drowned in a dry study, hundreds of kilometres from the sea. Abel, Nell or Ivo? Comment your answer before the reveal.', tt:'He drowned in a room with a dry floor. Abel, Nell or Ivo? Comment your answer.', yt:'He drowned in a dry room: how?', ytd:'An impossible drowning, three suspects and one detail in the lungs. Can you solve it?'}
},
{
 id:'CL-0043', title:'The Scrambled Name', category:'Think like a detective',
 mechanism:'Anagram: a puzzle-lover\'s dying word (ARMY) is a scrambled suspect name (MARY); the veteran suspect is the false lead',
 hook:'HIS LAST WORD WAS SCRAMBLED', caseTitle:'A CROSSWORD CHAMPION DIES', caseSub:'One word scrawled: A R M Y', caseIcon:'note',
 suspects:[
  {name:'COL. GRAY', role:'veteran', quote:'"Army? Thirty years. He was my friend."', icon:'cap', note:'army veteran'},
  {name:'MARY', role:'cook', quote:'"Cooking dinner in the kitchen."', icon:'hat'},
  {name:'TOBY', role:'driver', quote:'"Washing the car."', icon:'glasses'}],
 clues:[{icon:'pen',t:'Dying word: A R M Y'},{icon:'magnifier',t:'He lived for word puzzles'},{icon:'note',t:'A R M Y can be rearranged'}],
 culprit:1, explain:['A puzzle master leaves a scrambled message','A, R, M, Y rearranged spells MARY','The colonel is a false lead'],
 narration:J([
 'His last word was a clue. But it was scrambled.',
 'A crossword champion lies dying in his study. With his last strength he scrawls one word: A, R, M, Y.',
 'Colonel Gray, a veteran: "Army? I served for thirty years. He was my friend."',
 'Mary, the cook: "I was in the kitchen, making dinner."',
 'Toby, the driver: "I was washing the car."',
 'He lived for word puzzles. And the letters A, R, M, Y can be rearranged.',
 'Who did he name? You have five seconds. Five. Four. Three. Two. One.',
 'It was Mary.',
 'A crossword master would scramble a name to leave a message in code. A, R, M, Y rearranged spells Mary. The colonel was a false lead.']),
 cap:{ig:'A crossword champion. One scrawled word. Three suspects. Colonel Gray, Mary or Toby? Comment your answer before the reveal.', tt:'His last word was a puzzle. Can you solve it? Gray, Mary or Toby? Comment your answer.', yt:'His last word was a code: can you crack it?', ytd:'A dying crossword champion leaves four letters. Who is he naming?'}
},
{
 id:'CL-0044', title:'The Smoke Test', category:'Psychological trap',
 mechanism:'Staged emergency (false fire alarm): under panic the thief instinctively runs to the hidden loot',
 hook:'THE DETECTIVE SHOUTED FIRE', caseTitle:'A NECKLACE VANISHES', caseSub:'Party · the thief is still inside', caseIcon:'necklace',
 suspects:[
  {name:'ADA', role:'friend of the host', quote:'"I never left the hall."', icon:'hat'},
  {name:'BEN', role:'pianist', quote:'"I played all evening."', icon:'glasses'},
  {name:'CY', role:'cousin', quote:'"I was upstairs with my dog."', icon:'cap', note:'dog upstairs'}],
 clues:[{icon:'eye',t:'Detective shouts: "Fire!"'},{icon:'house',t:'Ada runs to the grandfather clock'},{icon:'dog',t:'Ben flees · Cy runs for his dog'}],
 culprit:0, explain:['In panic people save what matters most','Ada ran to the clock where the necklace hid','Ben fled · Cy saved his dog','Honest reactions: false lead'],
 narration:J([
 'The detective shouted fire. One person ran to the loot.',
 'A diamond necklace vanishes at a party. The thief has not left the house.',
 'Ada, a friend of the host: "I never left the hall."',
 'Ben, the pianist: "I played all evening."',
 'Cy, the cousin: "I was upstairs with my dog."',
 'The detective shouts: "Fire!" and lets smoke drift in. Ada rushes to the grandfather clock. Ben runs for the door. Cy runs upstairs.',
 'Who took the necklace? You have five seconds. Five. Four. Three. Two. One.',
 'It was Ada.',
 'In panic, people save what matters most. Ada ran to the clock where the necklace was hidden. Ben fled, and Cy went to save his dog. Their reactions were honest.']),
 cap:{ig:'A stolen necklace. A fake fire. Three reactions. Ada, Ben or Cy? Comment your answer before the reveal.', tt:'The detective yelled fire. One person ran the wrong way. Ada, Ben or Cy? Comment your answer.', yt:'The fake fire that caught a thief', ytd:'One shout of fire and three very different reactions. Who gave themselves away?'}
},
{
 id:'CL-0045', title:'The Hour Hand', category:'Who is the killer',
 mechanism:'Analog watch geometry: at 4:20 the hour hand is a third past the 4; a stopped watch showing it exactly on the 4 was hand-set, and only the suspect with an alibi for the faked time is the staging culprit',
 hook:'THE WATCH IS LYING', caseTitle:'STOPPED AT 4:20', caseSub:'A smashed wristwatch', caseIcon:'watch',
 suspects:[
  {name:'ELLIS', role:'butler', quote:'"4:20? At church with the vicar."', icon:'hat'},
  {name:'FAY', role:'niece', quote:'"Walking alone by the river."', icon:'glasses'},
  {name:'GUS', role:'gardener', quote:'"Alone, in the greenhouse."', icon:'cap'}],
 clues:[{icon:'watch',t:'Stopped at 4:20'},{icon:'ruler',t:'Hour hand points exactly at 4: impossible'},{icon:'ticket',t:'Only Ellis has an alibi for 4:20'}],
 culprit:0, explain:['At 4:20 the hour hand sits a third past the 4','Someone set the hands by hand','A staged time creates an alibi','Only Ellis has one: Fay and Gus are false leads'],
 narration:J([
 'The watch says four twenty. The watch is lying.',
 'A man is found dead, his wristwatch smashed and stopped at four twenty.',
 'Ellis, the butler: "At four twenty I was at church with the vicar."',
 'Fay, the niece: "Walking alone by the river."',
 'Gus, the gardener: "Alone, in the greenhouse."',
 'Look at the watch. At four twenty, the hour hand should sit a third of the way past the four. Here, it points exactly at four.',
 'Who killed him? You have five seconds. Five. Four. Three. Two. One.',
 'It was Ellis.',
 'Somebody moved the hands by hand. A staged time of death creates an alibi, and only Ellis has a perfect alibi for four twenty. Fay and Gus have none. They were false leads.']),
 cap:{ig:'A watch stopped at 4:20. But the hands are wrong. Ellis, Fay or Gus? Comment your answer before the reveal.', tt:'The watch says 4:20. The hour hand says liar. Ellis, Fay or Gus? Comment your answer.', yt:'The stopped watch that lied about the time', ytd:'A smashed watch, three suspects and one detail on the dial. Can you read the clue?'}
},
{
 id:'CL-0046', title:'The Phone That Never Died', category:'Spot the lie',
 mechanism:'Smartphone battery drain contradicts a claimed all-night streaming alibi; a switched-off phone is a false lead',
 hook:'HE WATCHED FILMS ALL NIGHT? HIS BATTERY DISAGREES', caseTitle:'A CABIN IS ROBBED', caseSub:'All phones 100% at 10 pm', caseIcon:'phone',
 suspects:[
  {name:'BEA', role:'nurse', quote:'"Streamed a movie marathon, 10 till 4."', icon:'glasses'},
  {name:'CAL', role:'student', quote:'"Played games online all night."', icon:'cap'},
  {name:'DEX', role:'waiter', quote:'"Slept. Phone switched off."', icon:'hat', note:'phone off'}],
 clues:[{icon:'phone',t:'At 10 pm: all phones at 100%'},{icon:'watch',t:'At dawn: Bea 94% · Cal 7% · Dex 100%'},{icon:'eye',t:'Six hours of streaming drains a battery'}],
 culprit:0, explain:['Streaming for 6 hours drains most of a battery','Bea\'s barely moved: she watched nothing','Cal\'s 7% fits his story','A phone switched off: false lead'],
 narration:J([
 'He says he watched films all night. His battery says no.',
 'A cabin is burgled while the guests sleep. At ten, all three guests\' phones were fully charged.',
 'Bea, the nurse: "I streamed a movie marathon, ten till four."',
 'Cal, the student: "I played games online all night."',
 'Dex, the waiter: "I slept. My phone was switched off."',
 'At dawn, Bea\'s phone shows ninety-four percent. Cal\'s shows seven. Dex\'s is still at one hundred.',
 'Who robbed the cabin? You have five seconds. Five. Four. Three. Two. One.',
 'It was Bea.',
 'Six hours of streaming drains most of a battery. Bea\'s barely moved, so she watched nothing. Cal\'s empty phone fits his story. A phone switched off was only a false lead.']),
 cap:{ig:'A cabin burgled. Three phones. One battery that tells the truth. Bea, Cal or Dex? Comment your answer before the reveal.', tt:'Six hours of movies, and 94% battery. Bea, Cal or Dex? Comment your answer.', yt:'The battery that exposed a lie', ytd:'Three alibis, three phone batteries. Which one does not add up?'}
},
{
 id:'CL-0047', title:'The Overflowing Mailbox', category:'Hidden clue',
 mechanism:'Accumulated unopened mail of a man who collected it daily dates his death and disproves a claimed "saw him yesterday"',
 hook:'SHE SAW HIM YESTERDAY? THE MAILBOX DISAGREES', caseTitle:'FOUND DEAD IN HIS FLAT', caseSub:'Police: he died days ago', caseIcon:'envelope',
 suspects:[
  {name:'PETRA', role:'neighbour', quote:'"I spoke to him on the stairs yesterday."', icon:'hat'},
  {name:'WALT', role:'landlord', quote:'"Hadn\'t seen him for a week."', icon:'cap', note:'suspicious but honest'},
  {name:'QUINN', role:'postman', quote:'"He emptied his box every single day."', icon:'glasses'}],
 clues:[{icon:'envelope',t:'Mailbox: 5 days of unopened letters'},{icon:'calendar',t:'He emptied it every single day'},{icon:'bubble',t:'Petra: "I saw him yesterday"'}],
 culprit:0, explain:['He never skipped a day of mail','Five days of letters: dead five days','Nobody spoke to him yesterday','Walt\'s week: false lead'],
 narration:J([
 'She saw him alive yesterday. His mailbox disagrees.',
 'A man is found dead in his flat. The police say he died days ago.',
 'Petra, the neighbour: "I spoke to him on the stairs yesterday evening."',
 'Walt, the landlord: "I had not seen him for a week."',
 'Quinn, the postman: "He emptied his mailbox every single day. Always."',
 'Look at the mailbox. Five days of letters, all unopened.',
 'Who killed him? You have five seconds. Five. Four. Three. Two. One.',
 'It was Petra.',
 'He never missed a day of mail, so five days of letters means five days dead. Nobody spoke to him yesterday. Petra lied. Walt\'s week was a false lead.']),
 cap:{ig:'A man dead for days. A neighbour who saw him yesterday. A mailbox that knows better. Petra, Walt or Quinn? Comment your answer before the reveal.', tt:'She says she saw him yesterday. His mailbox says otherwise. Petra, Walt or Quinn? Comment your answer.', yt:'The mailbox that exposed a liar', ytd:'A dead man, a witness and five days of unopened post. Who is lying?'}
},
{
 id:'CL-0048', title:'The Weapon That Melted', category:'Impossible crime',
 mechanism:'Weapon made of ice (icicle) vanishes by melting: narrow wound, puddle in a heated room, missing icicle and a wet, cold-reddened hand',
 hook:'THE WEAPON IS GONE. NOT HIDDEN. MELTED.', caseTitle:'STABBED IN A LOCKED STUDY', caseSub:'No weapon · warm room', caseIcon:'drop',
 suspects:[
  {name:'ENZO', role:'chef', quote:'"All my knives are in the block."', icon:'hat', note:'knives complete'},
  {name:'PAUL', role:'driver', quote:'"Washing the car outside."', icon:'cap'},
  {name:'DANA', role:'gardener', quote:'"In the greenhouse all night."', icon:'glasses'}],
 clues:[{icon:'scar',t:'Long, narrow wound · no weapon'},{icon:'drop',t:'A puddle beside the body'},{icon:'cloud',t:'One icicle missing · Dana\'s hands red and wet'}],
 culprit:2, explain:['The weapon was an icicle','In the warm room it melted into the puddle','Dana\'s hands: wet, red and numb','Enzo\'s knives: false lead'],
 narration:J([
 'The weapon is gone. Not hidden. Melted.',
 'A man is stabbed in a locked, heated study. There is no weapon anywhere in the room.',
 'Enzo, the chef: "All my knives are in the block. Count them."',
 'Paul, the driver: "I was washing the car outside."',
 'Dana, the gardener: "I was in the greenhouse all night."',
 'The wound is long and narrow. A puddle of water lies beside the body. Outside, one icicle is missing from the roof, and Dana\'s hands are red and soaked.',
 'Who killed him? You have five seconds. Five. Four. Three. Two. One.',
 'It was Dana.',
 'The weapon was an icicle. In the warm room it melted into the puddle. Enzo\'s knives were a false lead. Dana had taken the missing icicle.']),
 cap:{ig:'Stabbed in a locked, warm study. No weapon anywhere. Just a puddle. Enzo, Paul or Dana? Comment your answer before the reveal.', tt:'The murder weapon disappeared on its own. Enzo, Paul or Dana? Comment your answer.', yt:'The murder weapon that vanished by itself', ytd:'A locked room, a wound and no weapon. Can you work out where it went?'}
},
{
 id:'CL-0049', title:'The Blind Witness', category:'Think like a detective',
 mechanism:'Witness blind from birth claims to have seen a colour: fabricated testimony to frame a red-scarf suspect exposes the witness as the thief',
 hook:'A BLIND MAN SWEARS HE SAW THE THIEF', caseTitle:'JEWELLERY SHOP ROBBED AT DUSK', caseSub:'One witness · blind from birth', caseIcon:'necklace',
 suspects:[
  {name:'FOX', role:'newsagent · witness', quote:'"I saw him run past. A bright red scarf."', icon:'glasses', note:'blind from birth'},
  {name:'LOLA', role:'shop assistant', quote:'"At the counter." (red scarf)', icon:'hat', note:'wears a red scarf'},
  {name:'MILO', role:'delivery man', quote:'"Other side of town."', icon:'cap'}],
 clues:[{icon:'glasses',t:'Fox: blind from birth'},{icon:'eye',t:'He "saw" a bright red scarf'},{icon:'coat',t:'Lola wears a red scarf: framed?'}],
 culprit:0, explain:['Someone blind from birth cannot see a scarf','Either never blind, or he invented it','He wanted Lola to take the blame','Lola\'s red scarf: false lead'],
 narration:J([
 'A blind man swears he saw the thief.',
 'A jewellery shop is robbed at dusk. One witness: Mr. Fox, blind from birth.',
 'Fox, the newsagent next door: "I saw him run past. A bright red scarf."',
 'Lola, the shop assistant, wears a red scarf. "I was at the counter."',
 'Milo, the delivery man: "I was on the other side of town."',
 'Nobody else saw the thief. And nobody told Mr. Fox what the thief was wearing.',
 'Who robbed the shop? You have five seconds. Five. Four. Three. Two. One.',
 'It was Fox.',
 'Someone blind from birth cannot see a red scarf. Either he was never blind, or he made it up to frame Lola. Either way he lied, and the liar is the thief. The scarf was a false lead.']),
 cap:{ig:'A jewellery shop robbed at dusk. A blind witness who saw everything. Fox, Lola or Milo? Comment your answer before the reveal.', tt:'The only witness is blind. So how did he see the scarf? Fox, Lola or Milo? Comment your answer.', yt:'The blind witness who saw too much', ytd:'A robbery, a witness and a claim that cannot be true. Who is lying?'}
},
{
 id:'CL-0050', title:'The Ringing Pocket', category:'Psychological trap',
 mechanism:'Calling a stolen victim phone: the culprit\'s involuntary hand-to-pocket reflex when it buzzes',
 hook:'ONE PHONE CALL. ONE POCKET.', caseTitle:'A MAN IS MURDERED', caseSub:'His phone vanished · last call 11:40', caseIcon:'phone',
 suspects:[
  {name:'IVY', role:'colleague', quote:'"I left at six."', icon:'glasses'},
  {name:'JACK', role:'brother', quote:'"Home all night."', icon:'cap'},
  {name:'KATE', role:'neighbour · spare key', quote:'"Asleep."', icon:'hat', note:'has a spare key'}],
 clues:[{icon:'phone',t:'The detective calls the dead man\'s number'},{icon:'eye',t:'Ivy and Kate look around, puzzled'},{icon:'box',t:'Jack slaps his pocket'}],
 culprit:1, explain:['The phone was on silent but buzzed','The innocent were only curious','Jack tried to silence it in his own pocket','Kate\'s spare key: false lead'],
 narration:J([
 'The detective made one phone call. A pocket gave the killer away.',
 'A man is murdered. His phone vanishes. The last call came at eleven forty.',
 'Ivy, his colleague: "I left at six."',
 'Jack, his brother: "I was home all night."',
 'Kate, the neighbour, who has his spare key: "I was asleep."',
 'The detective dials the dead man\'s number. The phone is on silent, but it buzzes. Ivy and Kate look around. Jack slaps his pocket.',
 'Who killed him? You have five seconds. Five. Four. Three. Two. One.',
 'It was Jack.',
 'The innocent were only curious. Jack reached to silence the victim\'s phone, hidden in his own pocket. Kate\'s spare key was a false lead.']),
 cap:{ig:'A murder. A missing phone. One call. Ivy, Jack or Kate? Comment your answer before the reveal.', tt:'The detective made one phone call and a pocket buzzed. Ivy, Jack or Kate? Comment your answer.', yt:'One phone call that caught a killer', ytd:'A missing phone, a silent call and one nervous hand. Who gave themselves away?'}
}
];
