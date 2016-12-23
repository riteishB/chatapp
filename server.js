// main server file for the chat application
var express = require('express');
var app = express();
var http = require('http').Server(app);
// declaring the socket io connection
var io = require('socket.io')(http);

// declare the initial route for the application
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// on the connection made to the server
io.on('connection', function(socket) {
    console.log('a user connected');
});


// make the http server listen in port 3000
http.listen(process.env.PORT || 3000, () => {
    console.log("Listening for connection..");
});