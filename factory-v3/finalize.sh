#!/bin/bash
ID=$1
cd /tmp/claude-0/-home-user-videos/5391c789-2b09-5be2-af06-a8cea424721f/scratchpad/factory
ffmpeg -y -loglevel error -i out/${ID}.mp4 -vf "scale=in_range=pc:out_range=tv:flags=bicubic,format=yuv420p" -c:v libx264 -preset medium -crf 18 -profile:v high -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -r 30 -c:a aac -b:a 192k -ar 48000 -movflags +faststart final/${ID}.mp4
echo FINAL $ID
