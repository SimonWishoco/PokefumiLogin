import { User } from './model'
import users from './users.json'

const typedUsers: User[] = users

const listUsers = () => typedUsers

const addUser = (newUser: User) => {
  typedUsers.push(newUser)
  return typedUsers
}

export { listUsers, addUser }
