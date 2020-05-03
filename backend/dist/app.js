"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http = __importStar(require("http"));
var cors_1 = __importDefault(require("cors"));
var users_1 = require("./users");
var app = express_1.default();
var server = new http.Server(app);
var socketio = socket_io_1.default(server);
var PORT = process.env.PORT || 3200;
// CORS enabled
app.use(cors_1.default());
// default healthcheck route
app.get('/healthcheck', function (_a) {
    var res = _a.res;
    res === null || res === void 0 ? void 0 : res.json({
        status: '200',
        msg: 'Server is running',
    });
});
socketio.on('connection', function (socket) {
    socket.on('joinRoom', function (userData) {
        if (userData.user) {
            var id = socket.id;
            users_1.addUsers({
                name: userData.user,
                room: userData.room,
                id: id,
            });
            socket.join(userData.room);
            socketio
                .to(userData.room)
                .emit('usersList', users_1.getConnectedUsersForRoom(userData.room));
        }
    });
    socket.on('userMsg', function (data) {
        socketio.to(data.room).emit('message', {
            user: data.user,
            message: data.message,
        });
    });
    socket.on('disconnect', function () {
        users_1.removeUser(socket.id);
    });
});
// make the http server listen in port 3000
server.listen(PORT, function () {
    console.log("Server started at port " + PORT);
});
