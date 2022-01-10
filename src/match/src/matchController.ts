import { Match } from './match'
import MatchRepository from './matchRepository'

const matchRepository = new MatchRepository()

const listMatches = () => {
    return matchRepository.getAllMatches()
  }

const listMatchesForUser = (user:string) => {
    return matchRepository.getAllMatchesForUser(user)
}

const getMatchByMatchId = (match_id: number) => {
    return matchRepository.getMatchByMatchId(match_id)
}

const getOngoingMatchByUser = (user: string) => {
    return matchRepository.getOngoingMatchByUser(user)
}
const createMatch = (newMatch: Match) => {
    matchRepository.createMatch(newMatch.player1, newMatch.player2, newMatch.player1deck)
    return matchRepository.getAllMatches()
  }

const getPendingMatchesForUser = (user: string) => {
    return matchRepository.getPendingMatchesForUser(user)
}

const acceptMatch = (match_id:number, chosen_deck:number) => {
    return matchRepository.acceptMatch(match_id, chosen_deck)
}

const cancelMatch = (match_id: number) => {
    return matchRepository.cancelMatch(match_id)
}
const finishMatch = (match_id: number) => {
    matchRepository.finishMatch(match_id)
}
export { listMatches, createMatch, getPendingMatchesForUser, acceptMatch, getMatchByMatchId, getOngoingMatchByUser,
         finishMatch, listMatchesForUser, cancelMatch}
