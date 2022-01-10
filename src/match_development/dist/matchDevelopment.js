"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchDevelopment = void 0;
var request = require('sync-request');
const type1wins = ['double_damage_to', 'half_damage_from', 'no_damage_from'];
class MatchDevelopment {
    constructor(match_id, player1, player2) {
        this.player1_chosen_type = null;
        this.player2_chosen_type = null;
        this.player1_match_score = 0;
        this.player2_match_score = 0;
        this.player1_played_cards = [];
        this.player2_played_cards = [];
        this.match_id = match_id;
        this.player1 = player1;
        this.player2 = player2;
        this.round = 1;
        this.turn = player1;
    }
    play_card(player, card) {
        var url = "https://pokeapi.co/api/v2/pokemon/" + card + "/";
        var data = JSON.parse(request('GET', url).getBody());
        var pokemonType = data['types'][0]['type']['name'];
        if (player == this.player1) {
            this.player1_chosen_type = pokemonType;
            this.turn = this.player2;
            this.player1_played_cards.push(card);
        }
        else {
            this.player2_chosen_type = pokemonType;
            this.turn = this.player1;
            this.player2_played_cards.push(card);
        }
        return this.play_round();
    }
    play_round() {
        var result = [];
        if (this.player1_chosen_type !== null && this.player2_chosen_type !== null) {
            var url = "https://pokeapi.co/api/v2/type/" + this.player1_chosen_type;
            var type1DmgRel = JSON.parse(request('GET', url).getBody())['damage_relations'];
            var type1DmgRelToType2 = 'equal';
            var type1 = this.player1_chosen_type;
            var type2 = this.player2_chosen_type;
            for (var dmgRel of Object.keys(type1DmgRel)) {
                for (var type of type1DmgRel[dmgRel]) {
                    if (type['name'] === this.player2_chosen_type) {
                        type1DmgRelToType2 = dmgRel;
                        break;
                    }
                }
            }
            var roundWinner;
            if (type1wins.includes(type1DmgRelToType2)) {
                roundWinner = this.player1;
                this.player1_match_score = this.player1_match_score + 1;
            }
            else if (type1DmgRelToType2 === 'equal') {
                roundWinner = "null_round";
            }
            else {
                roundWinner = this.player2;
                this.player2_match_score = this.player2_match_score + 1;
            }
            this.player1_chosen_type = null;
            this.player2_chosen_type = null;
            this.round = this.round + 1;
            return [roundWinner, type1, type2, type1DmgRelToType2];
        }
    }
}
exports.MatchDevelopment = MatchDevelopment;
//# sourceMappingURL=matchDevelopment.js.map