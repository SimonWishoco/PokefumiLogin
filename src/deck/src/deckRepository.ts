import Database from 'better-sqlite3'

import {Deck} from "./deck";
import fs from 'fs'

export default class DeckRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/decks.db');
    this.applyMigrations()
  }

  createDeck(deck_owner: string, cards: string[]) {
    const statement =
      this.db.prepare("INSERT INTO decks (deck_owner, card1, card2, card3, card4, card5) VALUES ('"+deck_owner+"','"+
      cards[0]+"','"+cards[1]+"','"+cards[2]+"','"+cards[3]+"','"+cards[4]+"')")
    return statement.run().lastInsertRowid
  }

  getAllDecks(){
      const statement = this.db.prepare("SELECT * FROM decks")
      console.log(statement.all())
      const rows: Deck[] = statement.all()
      return rows
  }

  getDecksByUser(user_name: string){
      const statement = this.db.prepare("SELECT * FROM decks WHERE deck_owner='"+user_name+"'")
      const rows: Deck[] = statement.all()
      return rows
    }

  getDeckById(deck_id: number){
    const statement = this.db.prepare("SELECT * FROM decks WHERE deck_id = "+deck_id)
    const rows: Deck = statement.all()[0]
    return rows
  }

  applyMigrations(){
      const applyMigration = (path: string) => {
        const migration = fs.readFileSync(path, 'utf8')
        this.db.exec(migration)
      }

      const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'decks'").get()

      if (!testRow){
        console.log('Applying migrations on DB users...')
        const migrations = ['db/migrations/init.sql']
        migrations.forEach(applyMigration)
      }
    }

}
