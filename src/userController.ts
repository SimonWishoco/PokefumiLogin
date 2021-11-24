import { User } from './model'
import users from './users.json'
import UserRepository from './userRepository'

const userRepository = new UserRepository()

const listUsers = () => {
    return userRepository.getAllUsers()
  }
  
  const addUser = (newUser: User) => {
    userRepository.createUser(newUser.name)
    return userRepository.getAllUsers()
  }

  const getUser = (name: string) => {
    return userRepository.getUser(name)
  }
  

export { listUsers, addUser, getUser }
