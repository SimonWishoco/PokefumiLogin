"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var request = require('sync-request');
class Deck {
    constructor(deck_id, deck_owner, cards) {
        this.deck_id = deck_id;
        this.deck_owner = deck_owner;
        this.cards = cards;
    }
    checkCards() {
        for (var card of this.cards) {
            var url = "https://pokeapi.co/api/v2/pokemon/" + card + "/";
            var res = request('GET', url);
            if (res.statusCode !== 200) {
                return false;
            }
        }
        return true;
    }
    get_deckId() {
        return this.deck_id;
    }
    get_deckOwner() {
        return this.deck_owner;
    }
    get_cards() {
        return this.cards;
    }
}
exports.Deck = Deck;
//# sourceMappingURL=deck.js.map