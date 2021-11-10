
import { User, UserAccount, Match, Status } from "./model";

export class API_utilisateurs {
    UserList: Array<User>=[]
    MatchList: Array<Match>=[]
    CurrentUserId: number = 0
    CurrentMatchId: number = 0
    
    //DONE : user creation, connexion, rate players, create join and leave match, get list of all match
    //TODO : match process, communicate with pokeAPI

    constructor() {}

    inscription(name:string) {
        if (this.get_user(name) == null) {
            this.CurrentUserId ++;
            var user_account = new UserAccount(name,this.CurrentUserId);
            var user = new User(user_account)
            this.UserList.push(user);
            console.log("user " + name + " successfully created")
        }
        else {
            console.log("user " + name + " already exists")
        }
    }

    get_user(name:String) {
        for (var user of this.UserList) {
            if (user.getAccount().getName()==name) return user;
        }
        return null
    }

    connection(name:string) {
        var user: User = this.get_user(name);
        if (user!=null) {
            if (user.isOnline()) {
                console.log("user " + name + " is already logged in")
            }
            else {
                user.connect();
                console.log("user " + name + " successfully logged in")
            }
        }
        else {
            console.log("user " + name + " does not exist, couldn't log him in")
        }
    }
    
    disconnection(name:string) {
        var user: User = this.get_user(name);
        if (user!=null) {
            if (!user.isOnline()) {
                console.log("user " + name + " is already logged off")
            }
            else {
                user.disconnect();
                console.log("user " + name + " successfully logged off")
            }
        }
        else {
            console.log("user " + name + " does not exist, couldn't log him off")
        }
    }

    popBestPlayer(users:Array<[User,number]>) {
        // returns best player and pops it from the array "users"
        var bestUser = null
        const inf = 1000000
        var key:number
        var max = -inf
        for (var i=0;i<users.length;i++) {
            var [user,score] = users[i]
            if (score>max) {
                max=score;
                bestUser=user;
                key=i
            }
        }
        users.splice(key,1)
        //console.log("Searching for bestPlayers, remaining players to search from : " + users.toString())
        return bestUser
    }

    getBestPlayers() {
        var bestPlayers: Array<[User,number]> = []
        var cloneUserList: Array<[User,number]> = []
        //clone user list and links a score to it's user
        for (user of this.UserList) {
            cloneUserList.push([user,user.getAccount().getScore()])
        }
        var i=0;
        while (cloneUserList.length>0 && i<10) {
            var user:User = this.popBestPlayer(cloneUserList);
            if (user) bestPlayers.push([user,user.getAccount().getScore()]);
            i++
        }
        return bestPlayers;
        
    }

    changePlayerScore(name:String,score:number) {
        var user=this.get_user(name)
        if (user) {
            user.getAccount().setScore(score)
            console.log("Successfully changed " + name + "'s score to " + score)
        }
        else console.log("Failed to change score : user " + name + " does not exist")
    }

    displayBestPlayers() {
        var users = this.getBestPlayers();
        var res = "La liste des 10 meilleurs joueurs et leurs scores :"
        for (var user of users) {
            res= res + "\n" + user.toString()
        }
        console.log(res)

    }

    displayAllPlayers() {
        console.log("La liste de tout les joueurs inscrits : " + this.UserList.toString())
    }

    getMatch(id:number) {
        //recovers a match from id
        for (var match of this.MatchList) {
            if (match.id==id) return match
        }
        return null
    }

    openMatch(players:[User,User]) {
        //create an opened match
        var match = new Match(this.CurrentMatchId,Status.Opened,players)
        this.CurrentMatchId++
        this.MatchList.push(match)
    }

    joinMatch(name:String,match_id:number) {
        var match=this.getMatch(match_id)
        var player=this.get_user(name)
        if (player) {
            if (match) {
                if (match.status==Status.Opened) {
                    if (match.getPlayers()[0]==null) {
                        match.getPlayers()[0]=player
                        console.log("User '"+name+"' successfully joined match n°" + match_id)
                    }
                    else if (match.getPlayers()[1]==null) {
                        match.getPlayers()[1]=player
                        console.log("User '"+name+"' successfully joined match n°" + match_id)  
                    }
                    else console.log("User '"+name+"' failed to join match n°" + match_id + " : match is already full")
                }
                else console.log("User '"+name+"' failed to join match n°" + match_id + " : match is no longer opened")
            }
            else console.log("User '"+name+"' failed to join match n°" + match_id + " : couldn't find match")
        }
        else console.log("User '"+name+"' failed to join match n°" + match_id + " : couldn't find user")
    }

    leaveMatch(name:String,match_id:number) {
        var match=this.getMatch(match_id)
        var player=this.get_user(name)
        if (player) {
            if (match) {
                if (match.status==Status.Finished) {
                    //managed by finishMatch()
                }
                if (match.status==Status.Opened) {
                    //leave match, nothing special here
                    if (match.getPlayers()[0]==player) {
                        match.getPlayers()[0]=null
                        console.log("User '"+name+"' successfully left match n°" + match_id)
                    }
                    if (match.getPlayers()[1]==player) {
                        match.getPlayers()[1]=null
                        console.log("User '"+name+"' successfully left match n°" + match_id)
                    }
                }
                else {
                    //leave match during the game, should be implemented in final version, not intresting for v1
                }
            }
            else console.log("User '"+name+"' failed to join match n°" + match_id + " : couldn't find user")
        }
        else console.log("User '"+name+"' failed to leave match n°" + match_id + " : couldn't find user")
    }

    startMatch(id:number) {
        var match=this.getMatch(id)
        if (match) {
            if (match.status!=Status.Finished) {
                if (match.status==Status.Opened) {
                    //check if players are ready
                    if (match.players[0]!=null && match.players[1]!=null) {
                        match.start()
                        console.log("Match n°" + id + " started successfully")
                    }
                    else {
                        console.log("Couldn't start match n°" + id + " : players aren't ready")
                    }
                    
                }
                else { 
                    console.log("Couldn't start match n°" +id + " : it has already started")
                }
            }
            else console.log("Failed to start match n°" + id + " : it is already over")
        }
        else console.log("Failed to start match n°" + id + " : couldn't find said match")
    }


    finishMatch(id:number) {
        //either finishes a running match, or deletes an opened one
        var match = this.getMatch(id)
        if (match) {
            if (match.status!=Status.Finished) {
                if (match.status==Status.Opened) {
                    //delete the match

                    console.log("Match n°" +id + " was aborted instead of being finished")
                }
                else { 
                match.finish()
                console.log("Match n°" + id + " finished successfully")
                }
            }
            else console.log("Couldn't finish match n°" + id + " because it is already over")
        }
        else console.log("Failed to finish match n°" + id + " : couldn't find said match")
    }

    displayAllMatches() {
        console.log("La liste des matchs : " + this.MatchList.toString())
    }
}
  