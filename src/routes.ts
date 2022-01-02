import * as express from "express"
import * as userController from "./userController"
import { User, Match, Game } from './model'

export const register = ( app: express.Application ) => {

  const game = new Game()

  app.get('/', (req, res) => res.send('Hello World !'));

  app.get('/user', (req, res) => {
	res.status(200).json(userController.listUsers())
  })

  app.get('/user/top10', (req, res) => {
    res.status(200).json(userController.listTop10Users())
  })

  app.get('/user/:name', (req, res) => {
    var params=req.params.name
    var user:User = userController.getUser(params)
    var name:string = user.name
    var score:number = user.score
    res.status(200).send(name + " " + score.toString())
    })

  app.delete('/user/:name', (req, res) => {
    var params = req.params.name
    res.status(200).send(userController.removeUser(params))
  })
  
  app.put('/user', (req, res) => {
	const newUser: User = req.body    
	res.status(200).json(userController.addUser(newUser))
  })

  app.post('/user/connect/:name', (req, res) => {
    var params = req.params.name
    game.connect(params)
    res.status(200).json(game.getConnectedUsers())
  })

  app.post('/user/disconnect/:name', (req, res) => {
    var params = req.params.name
    game.disconnect(params)
    res.status(200).json(game.getConnectedUsers)
    })
}
