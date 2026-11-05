#!/bin/bash
cd "$(dirname "$0")"
for id in "$@"; do
  node build.mjs $id >/dev/null || { echo "BUILD FAIL $id"; continue; }
  npx remotion render src/index.ts Episode out/$id.mp4 --props=out/$id.props.json --codec=h264 --pixel-format=yuv420p --audio-codec=aac --browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome --concurrency=4 --log=error > out/$id.render.log 2>&1 && echo "RENDERED $id $(date +%T)" || echo "RENDER FAIL $id"
done
echo ALLDONE
