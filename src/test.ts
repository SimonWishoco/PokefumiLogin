import {API_utilisateurs} from "./API_utilisateurs";

var api= new API_utilisateurs();

api.inscription("Freud")
api.inscription("Margoulain")
api.inscription("Acapulco")
api.inscription("Sumimasen")
api.inscription("Shimon San")
api.inscription("Didier")
api.inscription("Ibo")
api.inscription("Polo")
api.inscription("Jitensha")
api.inscription("Honda-san")
api.inscription("Fred")
api.inscription("Pepito")

api.displayAllPlayers()

api.connection("Bro")   //should fail
api.connection("Freud")
api.connection("Margoulain")
api.connection("Shimon San")
api.connection("Acapulco")
api.connection("Shimon San")

api.disconnection("Mais non")   //should fail
api.disconnection("Sumimasen")  //should fail
api.disconnection("Margoulain")


api.changePlayerScore("Broooooo",5) //should fail
api.changePlayerScore("Shimon San",250)
api.changePlayerScore("Sumimasen",74)
api.changePlayerScore("Margoulain",3)
api.changePlayerScore("Pepito",15)
api.changePlayerScore("Ibo",22)
api.changePlayerScore("Fred",147)
api.changePlayerScore("Honda-san",36)

api.displayBestPlayers()



api.displayAllMatches()


