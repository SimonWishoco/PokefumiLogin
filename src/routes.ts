import * as express from "express"
import * as userController from "./userController"
import { User } from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World (local repo)!'));

  app.get('/user', (req, res) => {
	res.status(200).json(userController.listUsers())
  })

  app.get('/user/:name', (req, res) => {
    var params=req.params.name
    var user:User = userController.getUser(params)
    var name:string = user.name
    var score:number = user.score
    res.status(200).send(name + " " + score.toString())
    })
  

 
  app.post('/user', (req, res) => {
	const newUser: User = req.body    
	res.status(200).json(userController.addUser(newUser))
  })  
}
