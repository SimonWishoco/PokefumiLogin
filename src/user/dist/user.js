"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Game = void 0;
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
    constructor(n, s, password) {
        this.name = n;
        this.password = password;
        this.score = s;
    }
    toString() {
        console.log("Player " + this.name + ", score = " + this.score);
        return "Player " + this.name + ", score = " + this.score;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map