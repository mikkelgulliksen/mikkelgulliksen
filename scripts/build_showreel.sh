#!/usr/bin/env bash
# Build a showreel from the videos in downloads_qt_small/.
#
# Strategy:
#   1) For each clip, extract a CLIP_LEN-second segment starting at ~35% of the
#      video (avoids intros/outros).
#   2) Normalize each segment to 1920x1080, 30fps, H.264 + AAC.
#   3) Crossfade them together with xfade + acrossfade for a smooth reel.
#
# Requirements: ffmpeg (>= 4.3 for xfade), ffprobe.
# Output: showreel.mp4 in the repo root.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="${ROOT_DIR}/downloads_qt_small"
WORK_DIR="${ROOT_DIR}/.showreel_work"
OUT_FILE="${ROOT_DIR}/showreel.mp4"

CLIP_LEN=3.0          # seconds per segment
XFADE=0.6             # crossfade duration
START_FRAC=0.35       # start each clip 35% into the source
W=1920
H=1080
FPS=30

mkdir -p "${WORK_DIR}"
rm -f "${WORK_DIR}"/*.mp4

# Collect sources (sorted, .mp4 only) — portable for macOS' bash 3.2
SRC_FILES=()
while IFS= read -r line; do
    SRC_FILES+=("${line}")
done < <(find "${SRC_DIR}" -maxdepth 1 -type f -name '*.mp4' | sort)

if [ "${#SRC_FILES[@]}" -lt 2 ]; then
    echo "Need at least 2 source videos in ${SRC_DIR}" >&2
    exit 1
fi

echo "Found ${#SRC_FILES[@]} source clips."

# Step 1: cut and normalize each clip
i=0
for src in "${SRC_FILES[@]}"; do
    dur=$(ffprobe -v error -select_streams v:0 -show_entries stream=duration \
                  -of default=nw=1:nk=1 "${src}")
    # Fallback if stream duration missing
    if [ -z "${dur}" ] || [ "${dur}" = "N/A" ]; then
        dur=$(ffprobe -v error -show_entries format=duration \
                      -of default=nw=1:nk=1 "${src}")
    fi
    start=$(awk -v d="${dur}" -v f="${START_FRAC}" -v c="${CLIP_LEN}" \
                'BEGIN { s = d*f; if (s + c > d - 1) s = (d - c)/2; if (s < 0) s = 0; printf "%.3f", s }')

    out=$(printf "${WORK_DIR}/clip_%02d.mp4" "${i}")
    echo "[$((i+1))/${#SRC_FILES[@]}] $(basename "${src}") @ ${start}s"

    ffmpeg -hide_banner -loglevel error -y \
        -ss "${start}" -i "${src}" -t "${CLIP_LEN}" \
        -vf "scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:black,fps=${FPS},format=yuv420p,setsar=1" \
        -af "aresample=48000,aformat=channel_layouts=stereo" \
        -c:v libx264 -preset medium -crf 20 \
        -c:a aac -b:a 192k -ac 2 -ar 48000 \
        -movflags +faststart \
        "${out}"
    i=$((i+1))
done

N=${#SRC_FILES[@]}

# Step 2: stitch with xfade + acrossfade.
# Build an ffmpeg command that chains crossfades across all N clips.
INPUTS=()
for ((k=0; k<N; k++)); do
    INPUTS+=( -i "$(printf "${WORK_DIR}/clip_%02d.mp4" "${k}")" )
done

# Compose filter_complex
FILTER=""
prev_v="[0:v]"
prev_a="[0:a]"
offset=0
# CLIP_LEN may be float; use awk for arithmetic
for ((k=1; k<N; k++)); do
    offset=$(awk -v o="${offset}" -v c="${CLIP_LEN}" -v x="${XFADE}" \
                 'BEGIN { printf "%.3f", o + (c - x) }')
    if [ "${k}" -eq 1 ]; then
        offset=$(awk -v c="${CLIP_LEN}" -v x="${XFADE}" \
                     'BEGIN { printf "%.3f", c - x }')
    fi
    vlabel="[v${k}]"
    alabel="[a${k}]"
    FILTER+="${prev_v}[${k}:v]xfade=transition=fade:duration=${XFADE}:offset=${offset}${vlabel};"
    FILTER+="${prev_a}[${k}:a]acrossfade=d=${XFADE}${alabel};"
    prev_v="${vlabel}"
    prev_a="${alabel}"
done

# Final fade-in / fade-out polish
TOTAL=$(awk -v n="${N}" -v c="${CLIP_LEN}" -v x="${XFADE}" \
            'BEGIN { printf "%.3f", n*c - (n-1)*x }')
FADE_OUT_START=$(awk -v t="${TOTAL}" 'BEGIN { printf "%.3f", t - 0.8 }')

FILTER+="${prev_v}fade=t=in:st=0:d=0.5,fade=t=out:st=${FADE_OUT_START}:d=0.8[vout];"
FILTER+="${prev_a}afade=t=in:st=0:d=0.5,afade=t=out:st=${FADE_OUT_START}:d=0.8[aout]"

echo "Stitching ${N} clips into ${OUT_FILE} (≈${TOTAL}s)..."

ffmpeg -hide_banner -loglevel error -stats -y \
    "${INPUTS[@]}" \
    -filter_complex "${FILTER}" \
    -map "[vout]" -map "[aout]" \
    -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -ar 48000 -ac 2 \
    -movflags +faststart \
    "${OUT_FILE}"

echo "Done -> ${OUT_FILE}"
