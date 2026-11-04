#!/bin/bash
# usage: render.sh CL-00XX  -> out/CL-00XX_video.mp4 (silent)
cd /home/user/cl-factory
node src/mkprops.js $1 && npx remotion render src/Root.jsx Mystery out/$1_video.mp4 --props=props/$1.json --codec=h264 --pixel-format=yuv420p --crf=20 --concurrency=4 --log=error
