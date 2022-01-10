import Database from 'better-sqlite3'

import {User} from "./user";
import fs from 'fs'

export default class UserRepository {
  db: Database.Database


  constructor() {
    this.db = new Database('db/users.db');
    this.applyMigrations()    
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT * FROM users")
    const rows: User[] =statement.all()
    return rows
  }

  getUser(name:string): User {
    const statement = this.db.prepare("SELECT * FROM users WHERE name='"+name+"'")
    const rows: User = statement.all()[0]
    return rows
  }

  userFound(name: string, password: string): User {
    const statement = this.db.prepare("SELECT * FROM users WHERE name='"+name+"' AND password = '"+password+"'")
    const rows: User = statement.all()[0]
    return rows
  }
  createUser(name: string, password:string) {
    const statement = 
      this.db.prepare("INSERT INTO users (name, password) VALUES ('"+name+"','"+ password+"')")
    return statement.run().lastInsertRowid
  }

  removeUser(name: String){
    const statement = 
      this.db.prepare("DELETE FROM users WHERE name = '"+name+"'")
    statement.run()
    return this.getAllUsers()
  }


  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get()

    if (!testRow){
      console.log('Applying migrations on DB users...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }
}