import Database from 'better-sqlite3'

import {Match } from "./match";
import fs from 'fs'

export default class MatchRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/matches.db');
    this.applyMigrations()
  }

  getAllMatches(): Match[] {
    const statement = this.db.prepare("SELECT * FROM matches")
    const rows: Match[] = statement.all()
    return rows
  }

  getAllMatchesForUser(user:string): Match[] {
    const statement = this.db.prepare("SELECT * FROM matches WHERE player1='"+user+"' OR player2 = '"+user+"'")
    const rows: Match[] = statement.all()
    return rows
  }

  getMatchByMatchId(match_id:number): Match {
    const statement = this.db.prepare("SELECT * FROM matches WHERE match_id="+match_id)
    const match: Match= statement.all()[0]
    return match
  }

  getOngoingMatchByUser(user:string): Match[] {
    const statement = this.db.prepare("SELECT * from matches WHERE status = 'ONGOING' AND (player1 = '"+user+"' OR player2 = '"+user+"')")
    const match: Match[] = statement.all()
    return match
  }

  createMatch(player1: string, player2: string, player1deck: number) {
    const statement =
      this.db.prepare("INSERT INTO matches (player1, player2, player1deck, status) VALUES ('"+player1+"','"+ player2+"',"+ player1deck + ",'PENDING')")
    return statement.run().lastInsertRowid
  }


  acceptMatch(match_id: number, player2deck: number){
    const statement = this.db.prepare("UPDATE matches  SET player2deck = '"+player2deck+"', status = 'ONGOING' WHERE match_id ="+match_id)
    statement.run()
    const statement2 = this.db.prepare("SELECT * FROM matches where match_id ="+match_id)
    const rows: Match[] = statement2.all()
    return rows
  }

  cancelMatch(match_id:number) {
    const statement = this.db.prepare("UPDATE matches SET status = 'CANCELLED' WHERE match_id = "+match_id)
    statement.run()
    const statement2 = this.db.prepare("SELECT * FROM matches WHERE match_id="+match_id)
    const row: Match = statement2.all()[0]
    return row
  }

  finishMatch(match_id:number){
    const statement = this.db.prepare("UPDATE matches SET status = 'DONE' WHERE match_id="+match_id)
    statement.run()
    const statement2 = this.db.prepare("SELECT * FROM matches where match_id ="+match_id)
    const rows: Match[] = statement2.all()
    console.log(rows)
  }
  getPendingMatchesForUser(user:string){
     const statement = this.db.prepare("SELECT * FROM matches WHERE player2='"+user+"' AND status = 'PENDING'")
     const rows: Match[] = statement.all()
     return rows
  }

  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }

    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'matches'").get()

    if (!testRow){
      console.log('Applying migrations on DB users...')
      const migrations = ['db/migrations/init.sql']
      migrations.forEach(applyMigration)
    }
  }
}
