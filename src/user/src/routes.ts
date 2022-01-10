import * as express from "express"
import * as userController from "./userController"
import { User, Game } from './user'

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
    var score:number = 0
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

  app.get('/connected', (req, res) => {
    res.status(200).json(game.getConnectedUsers())
  })

  app.post('/user/connect', (req, res) => {
    var credentials: User = req.body
    var found = userController.userFound(credentials)
    res.status(200).json({'user':found})
  })

  app.post('/user/disconnect/:name', (req, res) => {
    var user_name = req.params.name
    game.disconnect(user_name)
    res.status(200).json(game.getConnectedUsers())
    })
}
