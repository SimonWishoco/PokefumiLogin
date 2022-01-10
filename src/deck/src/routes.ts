import * as express from "express"
import * as deckController from "./deckController"
import { Deck } from './deck'

export const register = ( app: express.Application ) => {
  app.put('/deck', (req, res) => {
     var body = req.body
     var cards_list = []
     var deck_owner = body['deck_owner']
     for(var i in body){
         if (i!== 'deck_owner'){
             cards_list.push(body[i]);
             }
         }
     var deck: Deck = new Deck(0, deck_owner, cards_list)
     var areCardsCorrect = deck.checkCards()
     if (areCardsCorrect == true){
         res.status(200).json(deckController.addDeck(deck))
     }
     else {
        res.status(400).send()
     }
  })

  app.get('/deck', (req, res) => {
    res.status(200).json(deckController.getAllDecks())
  })

  app.get('/deck/:user_name', (req, res) => {
    var user_name = req.params.user_name
    res.status(200).json(deckController.getDecksByUser(user_name))
  })

  app.get('/deck/id/:deck_id', (req, res) => {
    var deck_id = Number(req.params.deck_id)
    res.status(200).json(deckController.getDeckById(deck_id))
  })
}

