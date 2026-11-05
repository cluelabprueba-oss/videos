#!/bin/bash
# usage: ./montage.sh ID t1 t2 ... -> scratch/ID_m1.png (first 4) / m2 (rest)
id=$1; shift
S=/tmp/claude-0/-home-user-videos/caf423c4-5584-5bf2-80f4-872a2129f9cd/scratchpad
i=0; files=()
for t in "$@"; do ffmpeg -v error -y -ss $t -i final/$id.mp4 -frames:v 1 -vf scale=300:-1 $S/${id}_f$i.png; files+=("-i" "$S/${id}_f$i.png"); i=$((i+1)); done
ffmpeg -v error -y "${files[@]}" -filter_complex "hstack=inputs=$i" $S/${id}_m.png
echo $S/${id}_m.png
