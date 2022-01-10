"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const matchDevelopment_1 = require("./matchDevelopment");
const register = (app) => {
    var matches = {};
    app.get('/matchdevelopment/:match_id', (req, res) => {
        var match_id = req.params.match_id;
        var matchDevelopment = matches[Number(match_id)];
        res.status(200).json(matchDevelopment);
    });
    app.post('/start', (req, res) => {
        var body = req.body;
        var match_id = body['match_id'];
        var player1 = body['player1'];
        var player2 = body['player2'];
        var matchDevelopment = new matchDevelopment_1.MatchDevelopment(match_id, player1, player2);
        matches[match_id] = matchDevelopment;
        res.status(200).send();
    });
    app.post('/play', (req, res) => {
        const match_id = req.body['match_id'];
        const player = req.body['player'];
        const chosenCard = req.body['card'];
        var matchDevelopment = matches[Number(match_id)];
        var roundResult = matchDevelopment.play_card(player, chosenCard);
        var roundResultJson = JSON.parse(JSON.stringify(Object.assign({}, roundResult)));
        console.log(roundResultJson);
        res.status(200).json(roundResultJson);
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map