"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const userController = __importStar(require("./userController"));
const user_1 = require("./user");
const register = (app) => {
    const game = new user_1.Game();
    app.get('/', (req, res) => res.send('Hello World !'));
    app.get('/user', (req, res) => {
        res.status(200).json(userController.listUsers());
    });
    app.get('/user/top10', (req, res) => {
        res.status(200).json(userController.listTop10Users());
    });
    app.get('/user/:name', (req, res) => {
        var params = req.params.name;
        var user = userController.getUser(params);
        var name = user.name;
        var score = user.score;
        res.status(200).send(name + " " + score.toString());
    });
    app.delete('/user/:name', (req, res) => {
        var params = req.params.name;
        res.status(200).send(userController.removeUser(params));
    });
    app.put('/user', (req, res) => {
        const newUser = req.body;
        res.status(200).json(userController.addUser(newUser));
    });
    app.get('/connected', (req, res) => {
        res.status(200).json(game.getConnectedUsers());
    });
    app.post('/user/connect', (req, res) => {
        var credentials = req.body;
        var found = userController.userFound(credentials);
        res.status(200).json({ 'user': found });
    });
    app.post('/user/disconnect/:name', (req, res) => {
        var user_name = req.params.name;
        game.disconnect(user_name);
        res.status(200).json(game.getConnectedUsers());
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map