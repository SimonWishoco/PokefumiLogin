"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.listUsers = void 0;
const users_json_1 = __importDefault(require("./users.json"));
const typedUsers = users_json_1.default;
const listUsers = () => typedUsers;
exports.listUsers = listUsers;
const addUser = (newUser) => {
    typedUsers.push(newUser);
    return typedUsers;
};
exports.addUser = addUser;
//# sourceMappingURL=userController.js.map