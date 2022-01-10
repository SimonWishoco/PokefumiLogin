export class Match {
    match_id:number;
    player1: string;
    player2: string;
    player1deck: number;
    player2deck: number;
    status: string;

    constructor(match_id:number,player1:string, player2: string) {
        this.match_id= match_id
        this.player1 = player1
        this.player2 = player2
    }
}
