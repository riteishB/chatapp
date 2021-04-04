"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getConnectedUsersForRoom = exports.getUser = exports.removeUser = exports.addUsers = void 0;
var users_1 = require("./userStore/users");
exports.addUsers = function (user) {
    // check if the user with username already exists
    var existingUser = users_1.connectedUsers.find(function (usr) { return usr.name === user.name && usr.room === user.room; });
    // if not add to the list
    if (existingUser) {
        throw Error('Username already exists');
    }
    users_1.connectedUsers.push(user);
};
exports.removeUser = function (id) {
    var userIndex = users_1.connectedUsers.findIndex(function (usr) { return usr.id === id; });
    users_1.connectedUsers.splice(userIndex, 1);
};
exports.getUser = function (id) {
    return users_1.connectedUsers.find(function (usr) { return usr.id === id; });
};
exports.getConnectedUsersForRoom = function (room) {
    return users_1.connectedUsers
        .filter(function (usr) {
        return usr.room === room;
    })
        .map(function (usr) { return usr.name; });
};
exports.getUsers = function () {
    return users_1.connectedUsers;
};
