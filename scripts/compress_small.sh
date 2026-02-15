#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="${1:-./downloads_qt}"
OUT_DIR="${2:-./downloads_qt_small}"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "Source directory not found: $SRC_DIR"
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required but not installed."
  exit 1
fi

mkdir -p "$OUT_DIR"

echo "Compressing from: $SRC_DIR"
echo "Output folder: $OUT_DIR"

echo "Profile: H.264 CRF 24, preset slow, max 1080p, AAC 128k"

shopt -s nullglob
count=0
for input in "$SRC_DIR"/*.mp4 "$SRC_DIR"/*.mov "$SRC_DIR"/*.m4v; do
  [[ -f "$input" ]] || continue

  filename="$(basename "$input")"
  stem="${filename%.*}"
  output="$OUT_DIR/${stem}.mp4"

  echo "-> $filename"
  ffmpeg -y -hide_banner -loglevel error \
    -i "$input" \
    -map "0:v:0" -map "0:a?" \
    -vf "scale='if(gt(iw,1920),1920,iw)':-2" \
    -c:v libx264 -preset slow -crf 24 \
    -pix_fmt yuv420p \
    -profile:v high -level 4.1 \
    -movflags +faststart \
    -c:a aac -b:a 128k -ar 48000 \
    "$output"

  ((count+=1))
done

echo "Done. Compressed files: $count"
