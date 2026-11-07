#!/bin/bash
# usage: qc.sh CL-XXXX  -> prints one QC line
cd /tmp/claude-0/-home-user-videos/5391c789-2b09-5be2-af06-a8cea424721f/scratchpad/factory
ID=$1; F=final/$ID.mp4
V=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt,width,height,r_frame_rate -of csv=p=0 $F)
A=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate -of csv=p=0 $F)
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $F)
ERR=$(ffmpeg -v error -i $F -f null - 2>&1 | wc -l)
LUFS=$(ffmpeg -hide_banner -i $F -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | awk '{print $2}')
SZ=$(stat -c %s $F)
echo "$ID | v=$V | a=$A | dur=$D | decode_errors=$ERR | LUFS=$LUFS | bytes=$SZ"
