import * as express from "express"
import * as matchController from "./matchController"
import {Match} from './match'

var request = require('sync-request');

export const register = ( app: express.Application ) => {

  app.get('/', (req, res) => res.send('Hello World !'));

  app.get('/matches', (req, res) => {
    res.status(200).json(matchController.listMatches())
   })

  app.get('/matches/user/:user', (req, res) => {
     var user = req.params.user
     res.status(200).json(matchController.listMatchesForUser(user))
    })

  app.put('/match', (req, res) => {
    const newMatch: Match = req.body
    res.status(200).json(matchController.createMatch(newMatch))
  })

  app.get('/match/:match_id', (req,res) => {
    var match_id = Number(req.params.match_id)
    res.status(200).json(matchController.getMatchByMatchId(match_id))
  })
  app.get('/match/pending/:user', (req, res) => {
    var user = req.params.user
    res.status(200).json(matchController.getPendingMatchesForUser(user))
  })

  app.get('/match/ongoing/:user', (req, res) => {
    var user = req.params.user
    res.status(200).json(matchController.getOngoingMatchByUser(user))
  })

  app.get('/match/development/:match_id', (req, res) => {
    var match_id = req.params.match_id
    var url = "http://0.0.0.0:5004/matchdevelopment/"+match_id
    var result = JSON.parse(request('GET', url).getBody())
    res.status(200).json(result)
  })

  app.post('/match/accept', (req,res) => {
    var match_id = req.body['match_id']
    var chosen_deck = req.body['deck']
    var startedMatch:Match= matchController.acceptMatch(match_id, chosen_deck)[0]

    var url = "http://0.0.0.0:5004/start"
    var body = {"match_id": startedMatch['match_id'], "player1": startedMatch['player1'], "player2": startedMatch['player2']}
    var result = request('POST', url, {'json': body}).getBody()

    res.status(200).json(startedMatch)
  })

  app.post('/match/cancel/:match_id', (req, res) => {
    var match_id = Number(req.params.match_id)
    res.status(200).json(matchController.cancelMatch(match_id))
  })

  app.post('/match/finish/:match_id', (req, res) => {
    var match_id = Number(req.params.match_id)
    matchController.finishMatch(match_id)
    res.status(200).send()
  })
}
