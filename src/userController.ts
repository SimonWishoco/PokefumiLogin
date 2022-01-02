
import { User } from './model'
import users from './users.json'
import UserRepository from './userRepository'

const userRepository = new UserRepository()

const listUsers = () => {
    return userRepository.getAllUsers()
  }
  
const addUser = (newUser: User) => {
    userRepository.createUser(newUser.name, newUser.score)
    return userRepository.getAllUsers()
  }

const getUser = (name: string) => {
    return userRepository.getUser(name)
  }

const listTop10Users = () => {
    var users = userRepository.getAllUsers()
    users.sort((x1, x2) => x2['score'] - x1['score'] )
    return users.slice(0,10)

}
  const removeUser = (name: string) => {
    return userRepository.removeUser(name)
  }
  

export { listUsers, addUser, getUser, removeUser, listTop10Users }
