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
    score:number;

    constructor(n:string, s:number) {
        this.name=n;
        this.score=s;
    }

    constructor(id:number, n:string, s:number) {
        this.user_id=id;
        this.name=n;
        this.score=s;
    }
    
    toString():string {
        console.log("Player " + this.name + ", score = " + this.score )
        return "Player " + this.name + ", score = " + this.score 
    }

  }

  export class Match {
      id:number;
      status:Status = Status.Opened;
      players:[User,User];

      constructor(id:number,status:Status,players:[User,User]) {
          this.id=id
          this.status=status
          this.players=players
      }

      getPlayers() {
          return this.players
      }

      isOpen() {
          return this.status==Status.Opened;
      }
      isPlaying() {
          return this.status==Status.Playing;
      }
      isFinished() {
          return this.status==Status.Finished;
      }
      start() {
        this.status=Status.Playing;
      }

      finish() {
          this.status=Status.Finished;
      }

      toString() {
          return "Match n°"+this.id+ " opposant les joueurs " + this.players.toString()
      }
  }


  export enum Status {
      Opened = "Opened",
      Playing = "Playing",
      Finished = "Finished"
  }