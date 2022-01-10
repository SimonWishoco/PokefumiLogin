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
const deckController = __importStar(require("./deckController"));
const deck_1 = require("./deck");
const register = (app) => {
    app.put('/deck', (req, res) => {
        var body = req.body;
        var cards_list = [];
        var deck_owner = body['deck_owner'];
        for (var i in body) {
            if (i !== 'deck_owner') {
                cards_list.push(body[i]);
            }
        }
        var deck = new deck_1.Deck(0, deck_owner, cards_list);
        var areCardsCorrect = deck.checkCards();
        if (areCardsCorrect == true) {
            res.status(200).json(deckController.addDeck(deck));
        }
        else {
            res.status(400).send();
        }
    });
    app.get('/deck', (req, res) => {
        res.status(200).json(deckController.getAllDecks());
    });
    app.get('/deck/:user_name', (req, res) => {
        var user_name = req.params.user_name;
        res.status(200).json(deckController.getDecksByUser(user_name));
    });
    app.get('/deck/id/:deck_id', (req, res) => {
        var deck_id = Number(req.params.deck_id);
        res.status(200).json(deckController.getDeckById(deck_id));
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map