"use strict";
exports.__esModule = true;
exports.Status = exports.Match = exports.UserAccount = exports.User = void 0;
var User = /** @class */ (function () {
    function User(account) {
        this.online = false;
        this.account = account;
    }
    User.prototype.getAccount = function () {
        return this.account;
    };
    User.prototype.isOnline = function () {
        return this.online;
    };
    User.prototype.connect = function () {
        this.online = true;
    };
    User.prototype.disconnect = function () {
        this.online = false;
    };
    User.prototype.toString = function () {
        var status = "offline";
        if (this.online)
            status = "online";
        return "{" + this.account.toString() + "} is " + status;
    };
    return User;
}());
exports.User = User;
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id, score) {
        this.score = 0;
        this.name = name;
        this.id = id;
        this.score = score;
    }
    UserAccount.prototype.getName = function () {
        return this.name;
    };
    UserAccount.prototype.getScore = function () {
        return this.score;
    };
    UserAccount.prototype.setScore = function (score) {
        this.score = score;
    };
    UserAccount.prototype.toString = function () {
        return this.name + " : player n°" + this.id + ", score = " + this.score;
    };
    return UserAccount;
}());
exports.UserAccount = UserAccount;
var Match = /** @class */ (function () {
    function Match(id) {
        this.status = Status.Opened;
        this.players = [null, null];
        this.id = id;
    }
    Match.prototype.getPlayers = function () {
        return this.players;
    };
    Match.prototype.isOpen = function () {
        return this.status == Status.Opened;
    };
    Match.prototype.isPlaying = function () {
        return this.status == Status.Playing;
    };
    Match.prototype.isFinished = function () {
        return this.status == Status.Finished;
    };
    Match.prototype.start = function () {
        this.status = Status.Playing;
    };
    Match.prototype.finish = function () {
        this.status = Status.Finished;
    };
    Match.prototype.toString = function () {
        return "Match n°" + this.id + " opposant les joueurs " + this.players.toString();
    };
    return Match;
}());
exports.Match = Match;
var Status;
(function (Status) {
    Status["Opened"] = "Opened";
    Status["Playing"] = "Playing";
    Status["Finished"] = "Finished";
})(Status = exports.Status || (exports.Status = {}));
