import { Deck } from './deck'
import DeckRepository from './deckRepository'

const deckRepository = new DeckRepository()

const addDeck = (newDeck: Deck) => {
    deckRepository.createDeck(newDeck.get_deckOwner(), newDeck.get_cards())
    return deckRepository.getAllDecks()
  }

const getAllDecks = () => {
    return deckRepository.getAllDecks()
    }

const getDecksByUser = (user_name: string) => {
    return deckRepository.getDecksByUser(user_name)
}

const getDeckById = (deck_id: number) => {
    return deckRepository.getDeckById(deck_id)
}

export { addDeck, getAllDecks, getDecksByUser, getDeckById }
