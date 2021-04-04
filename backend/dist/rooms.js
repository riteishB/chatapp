"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = exports.addRoom = void 0;
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
