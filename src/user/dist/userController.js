"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTop10Users = exports.userFound = exports.removeUser = exports.getUser = exports.addUser = exports.listUsers = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const userRepository = new userRepository_1.default();
const listUsers = () => {
    return userRepository.getAllUsers();
};
exports.listUsers = listUsers;
const addUser = (newUser) => {
    userRepository.createUser(newUser.name, newUser.password);
    return userRepository.getAllUsers();
};
exports.addUser = addUser;
const getUser = (name) => {
    return userRepository.getUser(name);
};
exports.getUser = getUser;
const userFound = (credentials) => {
    return userRepository.userFound(credentials.name, credentials.password);
};
exports.userFound = userFound;
const getUserDecks = (name) => {
};
const listTop10Users = () => {
    var users = userRepository.getAllUsers();
    users.sort((x1, x2) => x2['score'] - x1['score']);
    return users.slice(0, 10);
};
exports.listTop10Users = listTop10Users;
const removeUser = (name) => {
    return userRepository.removeUser(name);
};
exports.removeUser = removeUser;
//# sourceMappingURL=userController.js.map