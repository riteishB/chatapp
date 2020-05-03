"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rooms = [];
exports.addRoom = function (room) {
    // if not add to the list
    if (rooms.includes(room)) {
        return Error('Room already exists');
    }
    rooms.push(room);
};
exports.getRooms = function () {
    return rooms;
};
