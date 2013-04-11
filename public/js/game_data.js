(function () {
    var socket = io.connect(window.location.href);

    socket.on('game-moves', function (moves) {
        UI.updatePosition(moves);
    });

    socket.on('game-end', function (result) {
        UI.updateResult(result);
    });
}());
