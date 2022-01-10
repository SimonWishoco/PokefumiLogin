"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeckById = exports.getDecksByUser = exports.getAllDecks = exports.addDeck = void 0;
const deckRepository_1 = __importDefault(require("./deckRepository"));
const deckRepository = new deckRepository_1.default();
const addDeck = (newDeck) => {
    deckRepository.createDeck(newDeck.get_deckOwner(), newDeck.get_cards());
    return deckRepository.getAllDecks();
};
exports.addDeck = addDeck;
const getAllDecks = () => {
    return deckRepository.getAllDecks();
};
exports.getAllDecks = getAllDecks;
const getDecksByUser = (user_name) => {
    return deckRepository.getDecksByUser(user_name);
};
exports.getDecksByUser = getDecksByUser;
const getDeckById = (deck_id) => {
    return deckRepository.getDeckById(deck_id);
};
exports.getDeckById = getDeckById;
//# sourceMappingURL=deckController.js.map