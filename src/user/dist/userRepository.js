"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class UserRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/users.db');
        this.applyMigrations();
    }
    getAllUsers() {
        const statement = this.db.prepare("SELECT * FROM users");
        const rows = statement.all();
        return rows;
    }
    getUser(name) {
        const statement = this.db.prepare("SELECT * FROM users WHERE name='" + name + "'");
        const rows = statement.all()[0];
        return rows;
    }
    userFound(name, password) {
        const statement = this.db.prepare("SELECT * FROM users WHERE name='" + name + "' AND password = '" + password + "'");
        const rows = statement.all()[0];
        return rows;
    }
    createUser(name, password) {
        const statement = this.db.prepare("INSERT INTO users (name, password) VALUES ('" + name + "','" + password + "')");
        return statement.run().lastInsertRowid;
    }
    removeUser(name) {
        const statement = this.db.prepare("DELETE FROM users WHERE name = '" + name + "'");
        statement.run();
        return this.getAllUsers();
    }
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get();
        if (!testRow) {
            console.log('Applying migrations on DB users...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map