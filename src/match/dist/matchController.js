"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelMatch = exports.listMatchesForUser = exports.finishMatch = exports.getOngoingMatchByUser = exports.getMatchByMatchId = exports.acceptMatch = exports.getPendingMatchesForUser = exports.createMatch = exports.listMatches = void 0;
const matchRepository_1 = __importDefault(require("./matchRepository"));
const matchRepository = new matchRepository_1.default();
const listMatches = () => {
    return matchRepository.getAllMatches();
};
exports.listMatches = listMatches;
const listMatchesForUser = (user) => {
    return matchRepository.getAllMatchesForUser(user);
};
exports.listMatchesForUser = listMatchesForUser;
const getMatchByMatchId = (match_id) => {
    return matchRepository.getMatchByMatchId(match_id);
};
exports.getMatchByMatchId = getMatchByMatchId;
const getOngoingMatchByUser = (user) => {
    return matchRepository.getOngoingMatchByUser(user);
};
exports.getOngoingMatchByUser = getOngoingMatchByUser;
const createMatch = (newMatch) => {
    matchRepository.createMatch(newMatch.player1, newMatch.player2, newMatch.player1deck);
    return matchRepository.getAllMatches();
};
exports.createMatch = createMatch;
const getPendingMatchesForUser = (user) => {
    return matchRepository.getPendingMatchesForUser(user);
};
exports.getPendingMatchesForUser = getPendingMatchesForUser;
const acceptMatch = (match_id, chosen_deck) => {
    return matchRepository.acceptMatch(match_id, chosen_deck);
};
exports.acceptMatch = acceptMatch;
const cancelMatch = (match_id) => {
    return matchRepository.cancelMatch(match_id);
};
exports.cancelMatch = cancelMatch;
const finishMatch = (match_id) => {
    matchRepository.finishMatch(match_id);
};
exports.finishMatch = finishMatch;
//# sourceMappingURL=matchController.js.map