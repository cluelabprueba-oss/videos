#!/bin/bash
# usage: dl.sh OUTFILE URL
mkdir -p "$(dirname "$1")"
curl -sS -f -L --retry 3 -o "$1" "$2" && echo "ok $1 $(stat -c %s "$1")"
