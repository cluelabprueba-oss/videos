import sys
from PIL import Image
ids=sys.argv[2:]; out=sys.argv[1]
keys=['hook','case','s1','challenge','count','reveal','outro']
W,H=270,480
im=Image.new('RGB',(W*len(keys),H*len(ids)))
for r,i in enumerate(ids):
    for c,k in enumerate(keys):
        t=Image.open(f'stills/{i}_{k}.png').convert('RGB').resize((W,H))
        im.paste(t,(c*W,r*H))
im.save(out)
