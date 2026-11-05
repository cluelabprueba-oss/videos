#!/bin/bash
# re-encode Remotion jpeg-frame render (yuvj420p) to broadcast-range yuv420p H.264 + copy AAC
id=$1
ffmpeg -y -v error -i out/$id.mp4 -vf "scale=in_range=pc:out_range=tv:flags=accurate_rnd,format=yuv420p" -c:v libx264 -preset medium -crf 15 -profile:v high -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -r 30 -c:a copy -movflags +faststart final/$id.mp4
