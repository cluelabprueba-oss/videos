#!/bin/bash
# usage: render.sh CL-XXXX
set -e
cd /tmp/claude-0/-home-user-videos/5391c789-2b09-5be2-af06-a8cea424721f/scratchpad/factory
ID=$1
CH=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
python3 mix.py $ID
npx remotion render src/index.ts Main out/${ID}_v.mp4 --props=props/${ID}.json --codec=h264 --crf=20 --pixel-format=yuv420p --concurrency=4 --browser-executable=$CH --log=error
DUR=$(python3 -c "import json;print(json.load(open('props/${ID}.json'))['ep']['dur'])")
ffmpeg -y -loglevel error -i out/${ID}_v.mp4 -i out/${ID}_mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart -t $DUR out/${ID}.mp4
echo DONE $ID
