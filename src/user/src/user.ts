import * as userController from "./userController"

export class Game {
    connectedUsers:Array<string>=[];

    constructor(){
    }

    getConnectedUsers(){
        return this.connectedUsers
    }

    connect(name: string){
        this.connectedUsers.push(name)
    }

    disconnect(name: string){
        const index = this.connectedUsers.indexOf(name)
        if (index > -1) {
            this.connectedUsers.splice(index, 1);
           }
        }
  }

export class User {
    user_id: number;
    name:string;
    password: string;
    score:number;

    constructor(n:string, s:number, password:string) {
        this.name=n;
        this.password = password;
        this.score=s;
    }

    toString():string {
        console.log("Player " + this.name + ", score = " + this.score )
        return "Player " + this.name + ", score = " + this.score 
    }

  }
