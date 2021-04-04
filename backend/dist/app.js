"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
// serve static file
app.use('/', express_1.default.static('public'));
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
            try {
                users_1.addUsers({
                    name: userData.user,
                    room: userData.room,
                    id: id,
                });
                socket.emit("userConnected", userData);
                socket.join(userData.room);
                socketio
                    .to(userData.room)
                    .emit('usersList', users_1.getConnectedUsersForRoom(userData.room));
            }
            catch (err) {
                console.error(err);
            }
        }
    });
    socket.on('userMsg', function (data) {
        socketio.to(data.room).emit('message', {
            user: data.user,
            message: data.message,
            time: new Date()
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
