// main server file for the chat application
var express = require('express');
var app = express();
var http = require('http').Server(app);
// declaring the socket io connection
var io = require('socket.io')(http);


// users array to keep track of users
users = [];
usercount = 0;

// declare the initial route for the application
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// on the connection made to the server
io.on('connection', function(socket) {
    usercount++;
    console.log('a user connected, total users online : ', usercount);

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    // // disconnect the user when the thing is out
    socket.on('disconnect', function() {
        usercount--;
        console.log('user disconnected, total users online : ', usercount);
    });
});


// make the http server listen in port 3000
http.listen(process.env.PORT || 3200, () => {
    console.log("Listening for connection..");
});