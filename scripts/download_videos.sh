#!/usr/bin/env bash
set -euo pipefail

# scripts/download_videos.sh
# Usage:
#   cd <repo-root>
#   ./scripts/download_videos.sh
#
# Downloads every URL listed in scripts/download-list.txt into ./downloads/
# Requires: yt-dlp (recommended) and optionally ffmpeg (for merging/processing).

LIST_FILE="$(dirname "$0")/download-list.txt"
OUT_DIR="./downloads"

if ! command -v yt-dlp >/dev/null 2>&1; then
  echo "yt-dlp is not installed. Install with:"
  echo "  brew install yt-dlp        # macOS/Homebrew"
  echo "  or: pipx install yt-dlp"
  exit 1
fi

mkdir -p "$OUT_DIR"

echo "Starting batch download -> $OUT_DIR"
# -a read URLs from file
# -f bestvideo+bestaudio/best  => prefer best quality and merge
# --merge-output-format mp4     => ensure .mp4 output when merging
# --no-overwrites               => keep existing files
# --no-part                     => avoid .part files
# --retry 5                     => network resilience
# --output template to use title for filenames

yt-dlp -a "$LIST_FILE" \
  -f "bestvideo+bestaudio/best" \
  --merge-output-format mp4 \
  --no-overwrites \
  --no-part \
  --retries 5 \
  -o "$OUT_DIR/%(title)s.%(ext)s"

echo "All downloads completed — files are in: $OUT_DIR"

# Quick tip for trimming/assembling a reel (local):
# 1) Use an NLE like DaVinci Resolve or Premiere Pro for precise editing.
# 2) Quick ffmpeg workflow (example):
#    ffmpeg -ss 00:00:10 -i "downloads/Some Video.mp4" -t 6 -c:v libx264 -crf 18 -preset veryfast -c:a aac clip1.mp4
#    (repeat to create clips...)
#    printf "file '%s'\n" clip1.mp4 clip2.mp4 clip3.mp4 > concat.txt
#    ffmpeg -f concat -safe 0 -i concat.txt -c:v libx264 -crf 18 -preset veryfast -c:a aac reel.mp4
#
# Want me to add an automated `make-reel.sh` that extracts short clips and stitches them? Ask and I'll add it.
