#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="${ROOT_DIR}/downloads_qt_small"
WORK_DIR="${ROOT_DIR}/.showreel_curated"
OUT_FILE="${ROOT_DIR}/showreel-v3.mp4"
DEFAULT_OUT="${ROOT_DIR}/showreel.mp4"
BGM_FILE="${SRC_DIR}/Hans Zimmer & Alan Walker – Time (Official Remix).mp4"
BGM_START="74.0"

W=1920
H=1080
FPS=30

rm -rf "${WORK_DIR}"
mkdir -p "${WORK_DIR}/clips"

make_clip() {
    local index="$1"
    local start="$2"
    local duration="$3"
    local filename="$4"
    local source="${SRC_DIR}/${filename}"
    local output
    output=$(printf "%s/clips/clip_%03d.mp4" "${WORK_DIR}" "${index}")

    if [ ! -f "${source}" ]; then
        echo "Missing source: ${source}" >&2
        exit 1
    fi

    printf '[%02d] %ss for %ss  %s\n' "$((index + 1))" "${start}" "${duration}" "${filename}"

    ffmpeg -nostdin -hide_banner -loglevel error -y \
        -ss "${start}" -i "${source}" -t "${duration}" \
        -an \
        -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},eq=contrast=1.1:saturation=1.08:brightness=0.005,vignette=PI/6,unsharp=5:5:0.45,format=yuv420p,setsar=1" \
        -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
        "${output}"
}

index=0
while IFS='|' read -r start duration filename; do
    [ -z "${start}" ] && continue
    make_clip "${index}" "${start}" "${duration}" "${filename}"
    printf "file '%s'\n" "$(printf "%s/clips/clip_%03d.mp4" "${WORK_DIR}" "${index}")" >> "${WORK_DIR}/concat.txt"
    index=$((index + 1))
done <<'CLIPS'
13.2|1.05|2021 ROG Zephyrus G14 AW SE - Join the Republic. Join the Walkers. ｜ ROG.mp4
42.0|0.90|2021 ROG Zephyrus G14 AW SE - Join the Republic. Join the Walkers. ｜ ROG.mp4
89.0|1.05|Aviation Movie (Trailer).mp4
113.8|1.00|Alan Walker x salem ilese - Fake A Smile (Official Music Video).mp4
105.7|0.95|Alan Walker x Imanbek - Sweet Dreams (Official Music Video).mp4
84.0|0.85|Alan Walker & Georgia Ku - Don't You Hold Me Down (Official Music Video).mp4
142.2|0.90|Alan Walker,  K-391, Boy in Space - Paradise (Official Music Video).mp4
130.1|1.00|K-391, Alan Walker & Ahrix - End of Time (Official Video).mp4
127.6|1.00|Hans Zimmer & Alan Walker – Time (Official Remix).mp4
148.0|1.00|Hans Zimmer & Alan Walker – Time (Official Remix).mp4
171.6|0.95|Alan Walker & Ava Max - Alone, Pt. II.mp4
89.0|0.95|Au⧸Ra x Alan Walker - Dead Girl! (Official Lyric Video).mp4
78.8|0.85|Isac Elliot - Mouth to Mouth.mp4
134.4|0.85|Isac Elliot - Mouth to Mouth.mp4
105.6|0.85|Isac Elliot - EYES SHUT.mp4
41.1|0.80|Marcus & Martinus - Bae.mp4
108.4|0.80|Marcus & Martinus - Bae.mp4
20.4|0.70|2021 ROG Zephyrus G14 AW SE - Join the Republic. Join the Walkers. ｜ ROG.mp4
63.0|0.70|@VIZEofficial  x Alan Walker – Space Melody (Edward Artemyev) feat. Leony (Official Music Video).mp4
76.0|0.75|Aviation Movie (Trailer).mp4
93.4|0.75|Alan Walker,  K-391, Boy in Space - Paradise (Official Music Video).mp4
107.8|0.80|K-391, Alan Walker & Ahrix - End of Time (Official Video).mp4
130.1|1.05|K-391, Alan Walker & Ahrix - End of Time (Official Video).mp4
172.0|1.20|Au⧸Ra x Alan Walker - Dead Girl! (Official Lyric Video).mp4
127.6|1.35|Alan Walker x Imanbek - Sweet Dreams (Official Music Video).mp4
CLIPS

echo "Joining picture edit"
ffmpeg -nostdin -hide_banner -loglevel error -y \
    -f concat -safe 0 -i "${WORK_DIR}/concat.txt" \
    -c copy "${WORK_DIR}/picture.mp4"

DURATION=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "${WORK_DIR}/picture.mp4")
FADE_OUT_START=$(awk -v d="${DURATION}" 'BEGIN { printf "%.3f", d - 1.1 }')

VIDEO_FILTER="fade=t=in:st=0:d=0.18,fade=t=out:st=${FADE_OUT_START}:d=1.0"
AUDIO_FILTER="atrim=0:${DURATION},asetpts=PTS-STARTPTS,loudnorm=I=-16:LRA=10:TP=-1.5,afade=t=in:st=0:d=0.35,afade=t=out:st=${FADE_OUT_START}:d=1.0"

echo "Adding music bed (${DURATION}s)"
ffmpeg -nostdin -hide_banner -loglevel error -stats -y \
    -i "${WORK_DIR}/picture.mp4" \
    -ss "${BGM_START}" -i "${BGM_FILE}" \
    -filter_complex "[0:v]${VIDEO_FILTER}[v];[1:a]${AUDIO_FILTER}[a]" \
    -map "[v]" -map "[a]" \
    -t "${DURATION}" \
    -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -ar 48000 -ac 2 \
    -movflags +faststart \
    "${OUT_FILE}"

cp "${OUT_FILE}" "${DEFAULT_OUT}"
echo "Done -> ${OUT_FILE}"
echo "Also copied -> ${DEFAULT_OUT}"