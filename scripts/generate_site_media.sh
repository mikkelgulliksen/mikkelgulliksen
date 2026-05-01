#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC_MEDIA_DIR="${ROOT_DIR}/frontend/public/media"
POSTER_DIR="${PUBLIC_MEDIA_DIR}/posters"

mkdir -p "${POSTER_DIR}"
cp "${ROOT_DIR}/showreel-v3.mp4" "${PUBLIC_MEDIA_DIR}/showreel.mp4"
rm -f "${POSTER_DIR}"/*.jpg

make_poster() {
    local slug="$1"
    local timestamp="$2"
    local source="$3"

    ffmpeg -nostdin -hide_banner -loglevel error -y \
        -ss "${timestamp}" -i "${ROOT_DIR}/${source}" \
        -frames:v 1 \
        -vf "scale=1400:788:force_original_aspect_ratio=increase,crop=1400:788,eq=contrast=1.06:saturation=1.05,format=yuvj420p" \
        "${POSTER_DIR}/${slug}.jpg"
}

make_poster "hero" "4.2" "showreel-v3.mp4"
make_poster "sweet-dreams" "105.7" "downloads_qt_small/Alan Walker x Imanbek - Sweet Dreams (Official Music Video).mp4"
make_poster "fake-a-smile" "113.8" "downloads_qt_small/Alan Walker x salem ilese - Fake A Smile (Official Music Video).mp4"
make_poster "time-remix" "127.6" "downloads_qt_small/Hans Zimmer & Alan Walker – Time (Official Remix).mp4"
make_poster "alone-pt-ii" "171.6" "downloads_qt_small/Alan Walker & Ava Max - Alone, Pt. II.mp4"
make_poster "heading-home" "74.0" "downloads_qt_small/Alan Walker & Ruben – Heading Home (Official Music Video).mp4"
make_poster "dead-girl" "89.0" "downloads_qt_small/Au⧸Ra x Alan Walker - Dead Girl! (Official Lyric Video).mp4"
make_poster "believers" "63.0" "downloads_qt_small/Alan Walker x @ConorMaynard - Believers (Official Montage).mp4"
make_poster "georgia-ku" "84.0" "downloads_qt_small/Alan Walker & Georgia Ku - Don't You Hold Me Down (Official Music Video).mp4"
make_poster "end-of-time" "130.1" "downloads_qt_small/K-391, Alan Walker & Ahrix - End of Time (Official Video).mp4"
make_poster "space-melody" "63.0" "downloads_qt_small/@VIZEofficial  x Alan Walker – Space Melody (Edward Artemyev) feat. Leony (Official Music Video).mp4"
make_poster "paradise" "142.2" "downloads_qt_small/Alan Walker,  K-391, Boy in Space - Paradise (Official Music Video).mp4"
make_poster "asus-rog" "13.2" "downloads_qt_small/2021 ROG Zephyrus G14 AW SE - Join the Republic. Join the Walkers. ｜ ROG.mp4"
make_poster "aviation" "89.0" "downloads_qt_small/Aviation Movie (Trailer).mp4"
make_poster "isac-eyes-shut" "105.6" "downloads_qt_small/Isac Elliot - EYES SHUT.mp4"
make_poster "isac-mouth-to-mouth" "134.4" "downloads_qt_small/Isac Elliot - Mouth to Mouth.mp4"
make_poster "marcus-bae" "108.4" "downloads_qt_small/Marcus & Martinus - Bae.mp4"
make_poster "live-believers" "95.0" "downloads_qt_small/NEW： Believers Premiere Stream.mp4"

echo "Generated site media in ${PUBLIC_MEDIA_DIR}"