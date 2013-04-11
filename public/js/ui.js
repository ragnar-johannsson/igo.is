var UI = {
    updatePosition: function (moves) {
        var color = moves.moves[moves.moves.length-1].color === 'B' ? 'Svartur' : 'Hv\u00EDtur';
        var mv_arr = moves.moves[moves.moves.length-1].coordinates.split(' ');
        var mv_str = color + ' ' + mv_arr[0];
        if (mv_arr.length > 1) mv_str += ', handsamar ' + mv_arr.slice(1).join(' ');

        UI.drawPosition(moves.position, $('#game-canvas'));
        $('#game-info').empty().append(UI.gameInfoTemplate({
            move: mv_str,
            moveNr: moves.moves.length,
            white: moves.white,
            whiteRank: moves.whiteRank,
            whiteCaptures: moves.captures.W,
            black: moves.black,
            blackRank: moves.blackRank,
            blackCaptures: moves.captures.B
        }));
        UI.adjustGameTimer(
            moves.whiteTime,
            moves.whiteByoYomiStones,
            moves.blackTime,
            moves.blackByoYomiStones,
            moves.moves[moves.moves.length-1].color
        );
    },

    updateResult: function (result) {
        result.winner = result.winner === 'B' ? 'Svartur' : 'Hv\u00EDtur';
        $('#game-result').empty().append(UI.gameResultTemplate({
            winner: result.winner,
            result: result.result
        }));
        UI.stopGameTimer();
    },

    adjustGameTimer: function (whiteTime, whiteStones, blackTime, blackStones, lastMove) {
        if (UI.gameTimer) { clearInterval(UI.gameTimer); }

        var factorSeconds = function (seconds) {
            var timeStr = '';
            var minutes = Math.floor(seconds/60);
            var seconds = seconds%60;

            timeStr += minutes < 10 ? '0' + minutes.toString() : minutes.toString();
            timeStr += ':';
            timeStr += seconds < 10 ? '0' + seconds.toString() : seconds.toString()

            return timeStr;
        };

        var updateTimer = function () {
            if (whiteTime < 0 || blackTime < 0) return;

            var whiteStr = factorSeconds(whiteTime);
            var blackStr = factorSeconds(blackTime);

            if (whiteStones !== '-1') whiteStr += ' (' + whiteStones + ')';
            if (blackStones !== '-1') blackStr += ' (' + blackStones + ')';

            $('#game-time-white').empty().append(whiteStr);
            $('#game-time-black').empty().append(blackStr);

            lastMove === 'B' ? whiteTime-- : blackTime--;
        };

        UI.gameTimer = setInterval(updateTimer, 1000);
        updateTimer();
    },

    stopGameTimer: function () {
        if (UI.gameTimer) { clearInterval(UI.gameTimer); }
    },

    drawPosition: function (board, element) {
        var drawImage = function (image, x, y) {
            var size = Math.floor(element.width() / 19);
            var middle = Math.floor(size/2);
            x = x * size;
            y = y * size;

            switch (image) {
                case 'u':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x, y1: y+middle,
                        x2: x+size, y2: y+middle
                    });
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y+middle,
                        x2: x+middle, y2: y+size
                    });
                    break;
                case 'ul':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y+size,
                        x2: x+middle, y2: y+middle,
                        x3: x+size, y3: y+middle
                    });
                    break;
                case 'ur':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y+size,
                        x2: x+middle, y2: y+middle,
                        x3: x, y3: y+middle
                    });
                    break;
                case 'd':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x, y1: y+middle,
                        x2: x+size, y2: y+middle
                    });
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y+middle,
                        x2: x+middle, y2: y
                    });
                    break;
                case 'dl':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y,
                        x2: x+middle, y2: y+middle,
                        x3: x+size, y3: y+middle
                    });
                    break;
                case 'dr':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y,
                        x2: x+middle, y2: y+middle,
                        x3: x, y3: y+middle
                    });
                    break;
                case 'e':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y,
                        x2: x+middle, y2: y+size
                    });
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x, y1: y+middle,
                        x2: x+size, y2: y+middle
                    });
                    break;
                case 'el':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y,
                        x2: x+middle, y2: y+size
                    });
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y+middle,
                        x2: x+size, y2: y+middle
                    });
                    break;
                case 'er':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y,
                        x2: x+middle, y2: y+size
                    });
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y+middle,
                        x2: x, y2: y+middle
                    });
                    break;
                case 'b':
                    element.drawEllipse({
                        fillStyle: "#000",
                        x: x+middle, y: y+middle,
                        width: size, height: size
                    });
                    break;
                case 'bx':
                    element.drawEllipse({
                        fillStyle: "#000",
                        x: x+middle, y: y+middle,
                        width: size, height: size
                    });
                    element.drawEllipse({
                        strokeStyle: "#F00",
                        strokeWidth: 2,
                        x: x+middle, y: y+middle,
                        width: middle, height: middle
                    });
                    break;
                case 'w':
                    element.drawEllipse({
                        strokeStyle: "#000",
                        strokeWidth: 1,
                        x: x+middle, y: y+middle,
                        width: size-1, height: size
                    });
                    break;
                case 'wx':
                    element.drawEllipse({
                        strokeStyle: "#000",
                        strokeWidth: 1,
                        x: x+middle, y: y+middle,
                        width: size-1, height: size
                    });
                    element.drawEllipse({
                        strokeStyle: "#F00",
                        strokeWidth: 2,
                        x: x+middle, y: y+middle,
                        width: middle, height: middle
                    });
                    break;
                case 's':
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x+middle, y1: y,
                        x2: x+middle, y2: y+size
                    });
                    element.drawLine({
                        strokeStyle: '#000',
                        strokeWidth: 1,
                        x1: x, y1: y+middle,
                        x2: x+size, y2: y+middle
                    });
                    element.drawEllipse({
                        fillStyle: "#000",
                        x: x+middle, y: y+middle,
                        width: 5, height: 5
                    });
                    break;
            }
        };

        element.clearCanvas();

        for (var y = 0; y < board.length; y++) {
            for (var x = 0; x < board[y].length; x++) {
                if (board[y][x] === '.') {
                    if ( y === 0) {
                        if (x === 0) {
                            drawImage('ul', x, y);
                        } else if (x === board[y].length - 1) {
                            drawImage('ur', x, y);
                        } else {
                            drawImage('u', x, y);
                        }
                    } else if ( y === board.length - 1) {
                        if (x === 0) {
                            drawImage('dl', x, y);
                        } else if (x === board[y].length - 1) {
                            drawImage('dr', x, y);
                        } else {
                            drawImage('d', x, y);
                        }
                    } else if (x === 0) {
                        drawImage('el', x, y);
                    } else if (x === board[y].length - 1) {
                        drawImage('er', x, y);
                    } else {
                        drawImage('e', x, y);
                    }
                } else if (board[y][x] === 'B') {
                    drawImage('b', x, y);
                } else if (board[y][x] === 'x') {
                    drawImage('bx', x, y);
                } else if (board[y][x] === 'W') {
                    drawImage('w', x, y);
                } else if (board[y][x] === 'X') {
                    drawImage('wx', x, y);
                } else if (board[y][x] === '*') {
                    drawImage('s', x, y);
                }
            }
        }
    }
}

$(document).ready(function () {
    UI.gameInfoTemplate = Handlebars.compile($('#game_info_template').html());
    UI.gameResultTemplate = Handlebars.compile($('#game_result_template').html());
});

$(document).ready(function () {
    $('.mb').click(function () {
        $.ajax({
            url: '/content/' + this.id + '.html',
        }).done(function (data) {
            var fadeTime = 100;
            $('#content').fadeOut(fadeTime, function () {
                $('#content').empty().append(data).fadeIn(fadeTime);
            });
        });
    });
});

$(document).ready(function () {
    $.ajax({
        url: '/content/whatis.html',
    }).done(function (data) {
        $('#content').empty().append(data);
    }); 
});
