// main server file for the chat application
var express = require('express');
var app = express();
var http = require('http').Server(app);
// declaring the socket io connection
var io = require('socket.io')(http);


// users array to keep track of users
users = { 'users': [] };
usercount = 0;

// maintaining the list of connections to the server
connections = [];

// declare the initial route for the application
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// on the connection made to the server
io.on('connection', function(socket) {
    usercount++;
    connections.push(socket);
    console.log('a user connected, total users online : ', connections.length);

    // server code to handle the new user
    socket.on('user', function(data) {
        //console.log("new user: ", data);
        // check if the data is already there
        if (users.users.indexOf(data) > -1) {
            console.log("The username is already taken!");
        } else {
            socket.user = data;
            console.log("User logged in :", socket.user);
            users.users.push(socket.user);
        }
        console.log("Users Connected: ", users.users);
        io.emit('myuser', socket.user);
        getuser();
    });

    // server code to handle the message sent by the user
    socket.on('chat message', function(msg) {
        //console.log('message: ' + msg);
        io.emit('chat message', {msg: msg, user: socket.user});
    });

    // disconnect the user when the thing is out
    socket.on('disconnect', function() {
        usercount--;
        users.users.splice(users.users.indexOf(socket.user),1);
        console.log("User disconnected : ", socket.user);
        connections.splice(connections.indexOf(socket),1);
        console.log('user disconnected, total users online : ', connections.length);
        getuser();
    });

    function getuser(){
        io.emit('users', users);
    }
});


// make the http server listen in port 3000
http.listen(process.env.PORT || 3200,'10.0.0.11' ,() => {
    console.log('Listening for connection..');
});