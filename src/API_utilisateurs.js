"use strict";
exports.__esModule = true;
exports.API_utilisateurs = void 0;
var model_1 = require("./model");
var API_utilisateurs = /** @class */ (function () {
    function API_utilisateurs() {
        this.UserList = [];
        this.MatchList = [];
        this.CurrentId = 0;
    }
    API_utilisateurs.prototype.inscription = function (name) {
        if (this.get_user(name) == null) {
            this.CurrentId++;
            var user_account = new model_1.UserAccount(name, this.CurrentId);
            var user = new model_1.User(user_account);
            this.UserList.push(user);
            console.log("user " + name + " successfully created");
        }
        else {
            console.log("user " + name + " already exists");
        }
    };
    API_utilisateurs.prototype.get_user = function (name) {
        for (var _i = 0, _a = this.UserList; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.getAccount().getName() == name)
                return user;
        }
        return null;
    };
    API_utilisateurs.prototype.connection = function (name) {
        var user = this.get_user(name);
        if (user != null) {
            if (user.isOnline()) {
                console.log("user " + name + " is already logged in");
            }
            else {
                user.connect();
                console.log("user " + name + " successfully logged in");
            }
        }
        else {
            console.log("user " + name + " does not exist, couldn't log him in");
        }
    };
    API_utilisateurs.prototype.disconnection = function (name) {
        var user = this.get_user(name);
        if (user != null) {
            if (!user.isOnline()) {
                console.log("user " + name + " is already logged off");
            }
            else {
                user.disconnect();
                console.log("user " + name + " successfully logged off");
            }
        }
        else {
            console.log("user " + name + " does not exist, couldn't log him off");
        }
    };
    API_utilisateurs.prototype.popBestPlayer = function (users) {
        // returns best player and pops it from the array users
        var bestUser = null;
        var inf = 1000000;
        var key;
        var max = -inf;
        for (var i = 0; i < users.length; i++) {
            var _a = users[i], user = _a[0], score = _a[1];
            if (score > max) {
                max = score;
                bestUser = user;
                key = i;
            }
        }
        users.splice(key, 1);
        //console.log("Searching for bestPlayers, remaining players to search from : " + users.toString())
        return bestUser;
    };
    API_utilisateurs.prototype.getBestPlayers = function () {
        var bestPlayers = [];
        var cloneUserList = [];
        //clone user list et joint à chaque utilisateur son score
        for (var _i = 0, _a = this.UserList; _i < _a.length; _i++) {
            user = _a[_i];
            cloneUserList.push([user, user.getAccount().getScore()]);
        }
        var i = 0;
        while (cloneUserList.length > 0 && i < 10) {
            var user = this.popBestPlayer(cloneUserList);
            if (user)
                bestPlayers.push([user, user.getAccount().getScore()]);
            i++;
        }
        return bestPlayers;
    };
    API_utilisateurs.prototype.changePlayerScore = function (name, score) {
        var user = this.get_user(name);
        if (user) {
            user.getAccount().setScore(score);
            console.log("Successfully changed " + name + "'s score to " + score);
        }
        else
            console.log("Failed to change score : user " + name + " does not exist");
    };
    API_utilisateurs.prototype.displayBestPlayers = function () {
        var users = this.getBestPlayers();
        var res = "La liste des 10 meilleurs joueurs et leurs scores :";
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            res = res + "\n" + user.toString();
        }
        console.log(res);
    };
    API_utilisateurs.prototype.displayAllPlayers = function () {
        console.log("La liste de tout les joueurs inscrits : " + this.UserList.toString());
    };
    API_utilisateurs.prototype.displayAllMatches = function () {
        console.log("La liste des matchs : " + this.MatchList.toString());
    };
    return API_utilisateurs;
}());
exports.API_utilisateurs = API_utilisateurs;
