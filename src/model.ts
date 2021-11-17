export type User = {
    name: string;
    score: number;
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