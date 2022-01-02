"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Match = exports.User = exports.Game = void 0;
class Game {
    constructor() {
        this.connectedUsers = [];
    }
    getConnectedUsers() {
        return this.connectedUsers;
    }
    connect(name) {
        this.connectedUsers.push(name);
    }
    disconnect(name) {
        const index = this.connectedUsers.indexOf(name);
        if (index > -1) {
            this.connectedUsers.splice(index, 1);
        }
    }
}
exports.Game = Game;
class User {
    constructor(n, s) {
        this.name = n;
        this.score = s;
    }
    toString() {
        console.log("Player " + this.name + ", score = " + this.score);
        return "Player " + this.name + ", score = " + this.score;
    }
}
exports.User = User;
class Match {
    constructor(id, status, players) {
        this.status = Status.Opened;
        this.id = id;
        this.status = status;
        this.players = players;
    }
    getPlayers() {
        return this.players;
    }
    isOpen() {
        return this.status == Status.Opened;
    }
    isPlaying() {
        return this.status == Status.Playing;
    }
    isFinished() {
        return this.status == Status.Finished;
    }
    start() {
        this.status = Status.Playing;
    }
    finish() {
        this.status = Status.Finished;
    }
    toString() {
        return "Match n°" + this.id + " opposant les joueurs " + this.players.toString();
    }
}
exports.Match = Match;
var Status;
(function (Status) {
    Status["Opened"] = "Opened";
    Status["Playing"] = "Playing";
    Status["Finished"] = "Finished";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=model.js.map