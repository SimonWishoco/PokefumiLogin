"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Match = exports.UserAccount = exports.User = void 0;
class User {
    constructor(account) {
        this.online = false;
        this.account = account;
    }
    getAccount() {
        return this.account;
    }
    isOnline() {
        return this.online;
    }
    connect() {
        this.online = true;
    }
    disconnect() {
        this.online = false;
    }
    toString() {
        var status = "offline";
        if (this.online)
            status = "online";
        return "{" + this.account.toString() + "} is " + status;
    }
}
exports.User = User;
class UserAccount {
    constructor(name, id, score) {
        this.score = 0;
        this.name = name;
        this.id = id;
        this.score = score;
    }
    getName() {
        return this.name;
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        this.score = score;
    }
    toString() {
        return this.name + " : player n°" + this.id + ", score = " + this.score;
    }
}
exports.UserAccount = UserAccount;
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