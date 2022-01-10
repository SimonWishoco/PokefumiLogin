"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class DeckRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/decks.db');
        this.applyMigrations();
    }
    createDeck(deck_owner, cards) {
        const statement = this.db.prepare("INSERT INTO decks (deck_owner, card1, card2, card3, card4, card5) VALUES ('" + deck_owner + "','" +
            cards[0] + "','" + cards[1] + "','" + cards[2] + "','" + cards[3] + "','" + cards[4] + "')");
        return statement.run().lastInsertRowid;
    }
    getAllDecks() {
        const statement = this.db.prepare("SELECT * FROM decks");
        console.log(statement.all());
        const rows = statement.all();
        return rows;
    }
    getDecksByUser(user_name) {
        const statement = this.db.prepare("SELECT * FROM decks WHERE deck_owner='" + user_name + "'");
        const rows = statement.all();
        return rows;
    }
    getDeckById(deck_id) {
        const statement = this.db.prepare("SELECT * FROM decks WHERE deck_id = " + deck_id);
        const rows = statement.all()[0];
        return rows;
    }
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'decks'").get();
        if (!testRow) {
            console.log('Applying migrations on DB users...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
}
exports.default = DeckRepository;
//# sourceMappingURL=deckRepository.js.map