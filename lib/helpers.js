var events = require('events');
var util = require('util');
var IGSClient = require('igsclient');

var GameWatcher = exports.GameWatcher = function () {
    events.EventEmitter.call(this);
    var that = this;
    var client = new IGSClient().connect();

    var monitorActivity = function () {
        if (that.timer) clearTimeout(that.timer);

        that.timer = setTimeout(function () {
            client.reconnect();
        }, 300000);
    }

    client.on('connected', function () {
        client.getGames();
    });

    client.on('disconnected', function () {
        client.reconnect();
    });

    client.on('games', function (games) {
        client.observe(games[0].gameId);
    });

    client.on('observe-moves', function (id, moves) {
        that.latest = moves;
        that.emit('game-moves', that.latest);
        monitorActivity();
    });

    client.on('observe-end', function (id, result) {
        that.emit('game-end', result);
        setTimeout(function () {
            client.getGames();
        }, 30000);
    });
}
util.inherits(GameWatcher, events.EventEmitter);

