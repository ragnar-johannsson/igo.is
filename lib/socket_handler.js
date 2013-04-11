var io = require('socket.io');
var GameWatcher = require('./helpers').GameWatcher;

exports.init = function (server) {
    io = io.listen(server);
    watcher = new GameWatcher();

    watcher.on('game-moves', function (moves) {
        io.sockets.emit('game-moves', moves);
    });

    watcher.on('game-end', function (result) {
        io.sockets.emit('game-end', result);
    });

    io.sockets.on('connection', function (socket) {
        if (watcher.latest) {
            socket.emit('game-moves', watcher.latest);
        }
    });
}
