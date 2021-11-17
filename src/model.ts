

export class User {
    name:string;
    score:number;
    //account: UserAccount;
    //online: Boolean = false;
    constructor(n:string,s:number) {
        this.name=n;
        this.score=s;
    }    
    /*
    constructor(account:UserAccount) {
        this.account=account;
    }
    */
/*
    getAccount() {
        return this.account
    }

    isOnline() {
        return this.online
    }

    connect() {
        this.online=true;
    }

    disconnect() {
        this.online=false;
    }
    
    toString():string {
        console.log("Player " + this.name + ", score = " + this.score )
        return "Player " + this.name + ", score = " + this.score 
    }
    */
  }
  
export class UserAccount {
    name: string;
    id: number;
    score: number=0;

    constructor(name: string, id: number, score?:number) {
      this.name = name;
      this.id = id;
      this.score=score;
    }

    getName() {
        return this.name
    }

    getScore() {
        return this.score
    }

    setScore(score:number) {
        this.score=score;
    }

    toString() {
        return this.name + " : player n°" + this.id + ", score = " + this.score 
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