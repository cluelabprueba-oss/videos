#!/bin/bash
# usage: ./qc.sh out/CL-0051.mp4
f=$1
r=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt -of csv=p=0 "$f")
a=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels -of csv=p=0 "$f")
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
err=$(ffmpeg -v error -i "$f" -f null - 2>&1 | head -3)
vol=$(ffmpeg -hide_banner -i "$f" -af volumedetect -f null - 2>&1 | grep -E 'mean_volume|max_volume' | tr '\n' ' ')
ok=OK; awk "BEGIN{exit !($d>=40 && $d<=60)}" || ok=DURATION_BAD
[ "$r" = "h264,1080,1920,yuv420p,30/1" ] || ok=VIDEO_BAD
echo "$f | $r | $a | ${d}s | errors:[${err}] | $vol | $ok | $(sha256sum "$f" | cut -c1-16)"
