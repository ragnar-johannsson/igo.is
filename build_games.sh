#!/bin/bash

function generate_games_map() {
    echo "const SGF_GAMES = new Map(["

    for sgf in $(find sgf -type f -name "*.sgf"); do
        local sum=$(shasum -a 512 $sgf)
        local key=${sum:0:20}
        echo "  ['$key', '$sgf'],"
    done

    echo "]);"
    echo "const SGF_GAMES_KEYS = [...SGF_GAMES.keys()];"
}

generate_games_map > js/games.js
