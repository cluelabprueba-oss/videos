#!/bin/bash
# QC: duration 40-60, 1080x1920, 30fps, h264+aac, full decode
for f in "$@"; do
 id=$(basename $f .mp4)
 d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)
 v=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt -of csv=p=0 $f)
 a=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate -of csv=p=0 $f)
 err=$(ffmpeg -v error -i $f -f null - 2>&1 | wc -l)
 lufs=$(ffmpeg -hide_banner -nostats -i $f -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | awk '{print $2}')
 ok=$(python3 -c "print('OK' if 40<=float('$d')<=60 and '$v'=='h264,1080,1920,yuv420p,30/1' and '$err'=='0' else 'FAIL')")
 echo "$id dur=$d v=$v a=$a decodeErrs=$err LUFS=$lufs $ok"
done
