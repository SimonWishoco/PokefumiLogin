"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class MatchRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/matches.db');
        this.applyMigrations();
    }
    getAllMatches() {
        const statement = this.db.prepare("SELECT * FROM matches");
        const rows = statement.all();
        return rows;
    }
    getAllMatchesForUser(user) {
        const statement = this.db.prepare("SELECT * FROM matches WHERE player1='" + user + "' OR player2 = '" + user + "'");
        const rows = statement.all();
        return rows;
    }
    getMatchByMatchId(match_id) {
        const statement = this.db.prepare("SELECT * FROM matches WHERE match_id=" + match_id);
        const match = statement.all()[0];
        return match;
    }
    getOngoingMatchByUser(user) {
        const statement = this.db.prepare("SELECT * from matches WHERE status = 'ONGOING' AND (player1 = '" + user + "' OR player2 = '" + user + "')");
        const match = statement.all();
        return match;
    }
    createMatch(player1, player2, player1deck) {
        const statement = this.db.prepare("INSERT INTO matches (player1, player2, player1deck, status) VALUES ('" + player1 + "','" + player2 + "'," + player1deck + ",'PENDING')");
        return statement.run().lastInsertRowid;
    }
    acceptMatch(match_id, player2deck) {
        const statement = this.db.prepare("UPDATE matches  SET player2deck = '" + player2deck + "', status = 'ONGOING' WHERE match_id =" + match_id);
        statement.run();
        const statement2 = this.db.prepare("SELECT * FROM matches where match_id =" + match_id);
        const rows = statement2.all();
        return rows;
    }
    cancelMatch(match_id) {
        const statement = this.db.prepare("UPDATE matches SET status = 'CANCELLED' WHERE match_id = " + match_id);
        statement.run();
        const statement2 = this.db.prepare("SELECT * FROM matches WHERE match_id=" + match_id);
        const row = statement2.all()[0];
        return row;
    }
    finishMatch(match_id) {
        const statement = this.db.prepare("UPDATE matches SET status = 'DONE' WHERE match_id=" + match_id);
        statement.run();
        const statement2 = this.db.prepare("SELECT * FROM matches where match_id =" + match_id);
        const rows = statement2.all();
        console.log(rows);
    }
    getPendingMatchesForUser(user) {
        const statement = this.db.prepare("SELECT * FROM matches WHERE player2='" + user + "' AND status = 'PENDING'");
        const rows = statement.all();
        return rows;
    }
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'matches'").get();
        if (!testRow) {
            console.log('Applying migrations on DB users...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
}
exports.default = MatchRepository;
//# sourceMappingURL=matchRepository.js.map