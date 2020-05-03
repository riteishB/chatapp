"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users = [];
exports.addUsers = function (user) {
    // check if the user with username already exists
    var existingUser = users.find(function (usr) { return usr.name === user.name && usr.room === user.room; });
    // if not add to the list
    if (existingUser) {
        return Error('Username already exists');
    }
    users.push(user);
    // else return an error
};
exports.removeUser = function (id) {
    var userIndex = users.findIndex(function (usr) { return usr.id === id; });
    users.splice(userIndex, 1);
};
exports.getUser = function (id) {
    return users.find(function (usr) { return usr.id === id; });
};
exports.getConnectedUsersForRoom = function (room) {
    return users
        .filter(function (usr) {
        return usr.room === room;
    })
        .map(function (usr) { return usr.name; });
};
exports.getUsers = function () {
    return users;
};
