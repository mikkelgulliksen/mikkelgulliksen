#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="${1:-./downloads}"
OUT_DIR="${2:-./downloads_qt}"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "Source directory not found: $SRC_DIR"
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required but not installed."
  exit 1
fi

mkdir -p "$OUT_DIR"

echo "Transcoding from: $SRC_DIR"
echo "Output folder: $OUT_DIR"

shopt -s nullglob
count=0
for input in "$SRC_DIR"/*.mp4 "$SRC_DIR"/*.mov "$SRC_DIR"/*.m4v "$SRC_DIR"/*.webm "$SRC_DIR"/*.mkv; do
  [[ -f "$input" ]] || continue
  filename="$(basename "$input")"
  stem="${filename%.*}"
  output="$OUT_DIR/${stem}.mp4"

  echo "-> $filename"
  ffmpeg -y -hide_banner -loglevel error \
    -i "$input" \
    -map "0:v:0" -map "0:a?" \
    -c:v libx264 -preset medium -crf 18 \
    -pix_fmt yuv420p \
    -profile:v high -level 4.1 \
    -movflags +faststart \
    -c:a aac -b:a 192k -ar 48000 \
    "$output"

  ((count+=1))
done

echo "Done. Transcoded files: $count"
echo "You can open files from: $OUT_DIR"
