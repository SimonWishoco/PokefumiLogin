import { User } from './model'
import UserRepository from './userRepository'

const userRepository = new UserRepository()

const listUsers = () => {
    return userRepository.getAllUsers()
  }
  
  const addUser = (newUser: User) => {
    userRepository.createUser(newUser.name)
    return userRepository.getAllUsers()
  }

export { listUsers, addUser }
