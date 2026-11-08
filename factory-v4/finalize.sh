#!/bin/bash
# usage: finalize.sh CL-XXXX  (needs out/ID_v.mp4 from render.mjs)
set -e
ID=$1
mkdir -p out final
python3 mix.py $ID
DUR=$(python3 -c "import json;print(json.load(open('props/${ID}.json'))['ep']['dur'])")
# loudness-normalise the mixed audio (-16 LUFS), then mux with the rendered video
ffmpeg -y -loglevel error -i out/${ID}_mix.wav -af "loudnorm=I=-16:TP=-1.5:LRA=9" -ar 48000 out/${ID}_norm.wav
ffmpeg -y -loglevel error -i out/${ID}_v.mp4 -i out/${ID}_norm.wav -map 0:v -map 1:a -c:v libx264 -preset medium -crf 18 -profile:v high -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -t $DUR final/${ID}.mp4
echo FINAL $ID
