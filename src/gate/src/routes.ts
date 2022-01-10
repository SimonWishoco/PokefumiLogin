import * as express from "express"
import { SyncRequestClient } from 'ts-sync-request/dist'

const usersPort = "user:5001"
const matchesPort = "match:5002"
const decksPort = "deck:5003"
const matchesDevelopmentPort = "match_development:5004"
var request = require('sync-request');

const getConnectedUsersList = (sessions: { [token: number]: string })=>{
    var connected_users:Array<string>=[];
      for (let [key, value] of Object.entries(sessions)) {
        connected_users.push(value)
      }
    return connected_users
}

const getUserDecks = (user:string) => {
    var url = "http://"+decksPort+"/deck/"+user
    return JSON.parse(request('GET', url).getBody())
}

const getDeck = (deck_id: number) => {
    var url = "http://"+decksPort+"/deck/id/"+deck_id
    var result = JSON.parse(request('GET', url).getBody())
    return result
}

export const register = ( app: express.Application ) => {

  let sessions: { [token: string]: string } = {};
  var next_user_token: number = 0

  app.get('/', (req, res) => res.send('Bienvenue à Pokéfumi !'));

  app.get('/users', (req, res) => {
    var url = "http://"+usersPort+"/user"
    var result = request('GET', url);
    var resultParsed = JSON.parse(result.getBody())
    res.status(200).json(resultParsed)
    })

  app.put('/user', (req, res) => {
    var url = "http://"+usersPort+"/user"
    var result = JSON.parse(request('PUT', url, {'json': req.body}).getBody())
    res.status(200).json(result)
  })

  app.post('/connect', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var currentUser = sessions[Number(token)]
        res.status(200).send("You are already connected as user: "+ currentUser)
    }
    else {
        var body = req.body
        var url = "http://"+usersPort+"/user/connect/"
        var result = JSON.parse(request('POST', url, {'json': body}).getBody())
        var user = result['user']
        if (user !== undefined){
             sessions[next_user_token] = user['name']
             res.status(200).json({'token': next_user_token})
             next_user_token = next_user_token + 1
        }
        else{
            res.status(200).json({'error': 'Invalid credentials or inexistent user'})
        }
    }
  })

  app.post('/disconnect',(req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        delete sessions[Number(token)]
        res.status(200).send('You have been disconnected.')
    }
    else {
        res.status(200).send('Error: You are not connected. You need to be connected to be able to disconnect.')

    }
  })

  app.get('/connected',(req,res) => {
    var connected_users = getConnectedUsersList(sessions)
    res.status(200).json(connected_users)
  })

  app.get('/decks', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var userDecks = getUserDecks(user)
        res.status(200).json(userDecks)
    }
    else {
         res.status(200).send('Error: You are not connected. You need to be connected to be able to see your decks.')
    }
  })

  app.put('/deck', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var body = req.body
        body['deck_owner'] = user
        var url = "http://"+decksPort+"/deck"
        var result = request('PUT', url, {'json': body})
        if (result.statusCode==200){
            var parsedDeck = JSON.parse(result.getBody())
            res.status(200).json(parsedDeck)
        }
        else{
            res.status(200).send("The deck you are trying to create contains invalid Pokémon names.")
        }
    }
    else {
         res.status(200).send('Error: You are not connected. You need to be connected to be able to create a deck.')
    }
  })

  app.put('/match', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var chosenPlayer = req.body['player']
        var url = "http://"+matchesPort+"/match/ongoing/"+user
        var results = JSON.parse(request('GET', url).getBody())
        if (Object.keys(results).length !== 0) {
            res.status(200).send("Error: You already have an ongoing match, you cannot create another.")
        }
        else {
            if (chosenPlayer === user) {
                res.status(200).send("Error: You cannot invite yourself for a match")
            }
            else {
                var chosenDeck = req.body['deck']
                var userDecks = getUserDecks(user)
                var connectedPlayers = getConnectedUsersList(sessions)
                if (connectedPlayers.includes(chosenPlayer)){
                    var userOwnsDeck = userDecks.some((item: {'deck_id': number}) =>(item.deck_id === chosenDeck))
                    if (userOwnsDeck == true){
                        var body = {'player1':user, 'player2': chosenPlayer, 'player1deck': chosenDeck}
                        var url = "http://"+matchesPort+"/match"
                        var result = JSON.parse(request('PUT', url, {'json': body}).getBody())
                        res.status(200).json(result)
                    }
                    else {
                        res.status(200).send('Error: Please choose a deck you own.')
                    }
                }
                else {
                    res.status(200).send('Error: Chosen adversary is not connected or does not exist.\n Please check list of connected players then choose your adversary.')
                }
            }
        }
    }
    else {
         res.status(200).send('Error: You are not connected. You need to be connected to be able to start a match.')
    }
  })

  app.get('/allmatches', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var url = "http://"+matchesPort+"/matches/user/"+user
        var result = JSON.parse(request('GET', url).getBody())
        res.status(200).json(result)
    }
    else {
         res.status(200).send('Error: You are not connected. You need to be connected to be able to see your matches')
    }
  })

  app.post('/cancel/:match_id', (req,res) => {
     var token = req.headers['token']
     if (token !== undefined){
         var user = sessions[Number(token)]
         var match_id = req.params.match_id
         var url = "http://"+matchesPort+"/match/"+match_id
         var match = JSON.parse(request('GET', url).getBody())
         console.log(match)
         if (match['status'] == 'PENDING' || match['status'] == 'ONGOING'){
             var url = "http://"+matchesPort+"/match/cancel/"+match_id
             var result = JSON.parse(request('POST', url).getBody())
             res.status(200).json(result)
         }
         else{
            res.status(200).send("You can only cancel a pending invitation or an ongoing match.")
         }
     }
     else {
          res.status(200).send('Error: You are not connected. You need to be connected to be able to cancel one of your matches')
     }
  })

  app.get('/invitations', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var url = "http://"+matchesPort+"/match/pending/"+user
        var result = JSON.parse(request('GET', url).getBody())
        res.status(200).json(result)
    }
    else {
         res.status(200).send('Error: You are not connected. You need to be connected to be able to check your match invitations.')
    }
  })

  app.post('/accept', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var url = "http://"+matchesPort+"/match/ongoing/"+user
        var ongoingMatches = JSON.parse(request('GET', url).getBody())
        if (ongoingMatches.length === 0){
            var body = req.body
            var url = "http://"+matchesPort+"/match/"+body['match_id']
            var match = JSON.parse(request('GET', url).getBody())
            if (match['status'] == 'PENDING'){
                var url = "http://"+matchesPort+"/match/accept"
                var result = JSON.parse(request('POST', url, {'json': body}).getBody())
                res.status(200).json(result)
            }
            else {
                res.status(200).send("You can only accept pending invitations.")
            }
        }
        else {
            res.status(200).send("Error: you already have an ongoing match. Either finish it or cancel it in order to"+
            " accept another match.")
        }
    }
    else {
         res.status(200).send('Error: You are not connected. You need to be connected to be able to check your match invitations.')
    }
  })

  app.get('/ongoingmatch', (req, res)=> {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var url = "http://"+matchesPort+"/match/ongoing/"+user
        var results = JSON.parse(request('GET', url).getBody())
        if (Object.keys(results).length !== 0) {
            var ongoingMatch:{'match_id': number, "player1deck": number, "player2deck": number} = results[results.length - 1]
            var url = "http://"+matchesPort+"/match/development/"+ongoingMatch['match_id']
            var result2 = JSON.parse(request('GET', url).getBody())
            if (user === result2['player1']){
                var adversary = result2['player2']
                var deck = getDeck(ongoingMatch['player1deck'])
            }
            else {
                var adversary = result2['player1']
                var deck = getDeck(ongoingMatch['player2deck'])
            }

            var response = "You are currently in a match with player \""+adversary+"\" \n"+
                           "Match id: "+ongoingMatch['match_id']+". \n"+
                           "This is round n°"+result2['round']+".\n"
            if (result2['turn']===user){
                response = response + "It is now your turn to choose a Pokemon to play !\n"
            }
            else{
                response = response + "It is your adversary's turn to play. \n"
            }

            response = response + "Here is your deck:\n"
            response = response + "\tCard 1: "+ deck['card1'] + "\n\tCard 2: "+ deck['card2'] + "\n\tCard 3: "+ deck['card3']
            response = response + "\n\tCard 4: "+ deck['card4'] + "\n\tCard 5: "+ deck['card5']
            res.status(200).send(response)
        }
        else{
            res.status(200).send("You have no ongoing match, try inviting another player.")
        }
    }
    else {
         res.status(200).send('Error: You are not connected. You need to be connected to be able to check your current match.')
    }
  })

  app.post('/match/:card', (req, res) => {
    var token = req.headers['token']
    if (token !== undefined){
        var user = sessions[Number(token)]
        var chosenCard = req.params.card
        var url = "http://"+matchesPort+"/match/ongoing/"+user
        var result = JSON.parse(request('GET', url).getBody())
        if (Object.keys(result).length !== 0){
            var ongoingMatch:{'match_id': number, "player1deck": number, "player2deck": number} = result[result.length - 1]
            var url = "http://"+matchesPort+"/match/development/"+ongoingMatch['match_id']
            var ongoingMatchDevelopment= JSON.parse(request('GET', url).getBody())
            if (user === ongoingMatchDevelopment['turn']){
                if (user === ongoingMatchDevelopment['player1']){
                    var userChosenDeck = getDeck(ongoingMatch["player1deck"])
                    var isCardAlreadyPlayed = ongoingMatchDevelopment['player1_played_cards'].includes(chosenCard)
                }
                else {
                    var userChosenDeck = getDeck(ongoingMatch["player2deck"])
                    var isCardAlreadyPlayed = ongoingMatchDevelopment['player2_played_cards'].includes(chosenCard)
                }
                if (isCardAlreadyPlayed == false){
                    if (chosenCard == userChosenDeck.card1 || chosenCard == userChosenDeck.card2 ||
                        chosenCard == userChosenDeck.card3 || chosenCard == userChosenDeck.card4 ||
                        chosenCard == userChosenDeck.card5 ){
                        var url = "http://"+matchesDevelopmentPort+"/play"
                        var body = {"match_id":ongoingMatch['match_id'], "player": user, "card" : chosenCard}
                        var result3 = JSON.parse(request('POST', url, {"json": body}).getBody())
                        if (Object.keys(result3).length !==0){
                            var response: string;
                            if (user === ongoingMatchDevelopment['player1']){
                                var userType = result3['1']
                                var opponentType = result3['2']
                            }
                            else{
                                var userType = result3['2']
                                var opponentType = result3['1']
                            }

                            if (user == result3['0']){
                                response = "You have won the round ! \n"
                            }
                            else {
                                response = "You have lost the round... \n"
                            }
                            response = response + "You played a pokemone of type \""+ userType + "\" while your opponent " +
                            "played a pokemon of type \""+ opponentType + "\""

                            if (ongoingMatchDevelopment['round'] == 5){
                                var url = "http://"+matchesPort+"/match/finish/"+ongoingMatch['match_id']
                                request('POST', url).getBody()
                            }
                            res.status(200).send(response)

                        }
                        else {
                            res.status(200).send('You played your pokemon ! Now waiting for your opponent.')
                        }

                    }
                    else {
                        res.status(200).send("Please play a card that is contained in your deck !")
                    }
                }
                else {
                    res.status(200).send("You have already played this pokemon, please choose another one from your deck.")
                }
            }
            else {
                res.status(200).send('It is not your turn to play.')
            }
        }
        else{
             res.status(200).send("You have no ongoing match, try inviting another player.")
        }
    }
    else {
         res.status(200).send('Error: You are not connected.')
    }
  })

  app.get('/match/results', (req,res) => {

  })
}
