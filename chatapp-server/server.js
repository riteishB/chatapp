// main server file for the chat application
var express = require("express");
var app = express();
var http = require("http").Server(app);
// declaring the socket io connection
var io = require("socket.io")(http);

// users array to keep track of users
users = { users: [] };
usercount = 0;

// maintaining the list of connections to the server
connections = [];

// declare the initial route for the application
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// enable path for the js file
app.get("/display.js", (req, res) => {
  res.sendFile(__dirname + "/public/js/display.js");
});

// link for the css file
app.get("/display.css", (req, res) => {
  res.sendFile(__dirname + "/public/css/display.css");
});

// on the connection made to the server
io.on("connection", function(socket) {
  usercount++;
  connections.push(socket);
  console.log("a user connected, total users online : ", connections.length);

  // server code to handle the new user
  socket.on("user", function(data) {
    //console.log(socket);
    //console.log("new user: ", data);
    // check if the data is already there
    if (users.users.indexOf(data) > -1) {
      console.log("The username is already taken!");
      io.emit("err", "Username already taken, please enter a different one");
      return false;
    } else if (data != undefined && data.length <= 0) {
      console.log("Blank Username");
      io.emit("err", "Username cannot be Empty");
      return false;
    } else {
      socket.user = data;
      console.log("User logged in :", socket.user);
      users.users.push(socket.user);
    }
    console.log("Users Connected: ", users.users);
    io.emit("user", socket.user);
    socket.send(socket.user);
    getuser();
  });

  // server code to handle the message sent by the user
  socket.on("chat message", function(msg) {
    // if the message is empty, then dont post it
    io.emit("chat message", { msg: msg, user: socket.user });
  });

  // disconnect the user when the thing is out
  socket.on("disconnect", function() {
    disconnect();
  });

  // listen to logout button event and do the same as disconnect
  socket.on("logout", () => {
    disconnect();
  });

  function disconnect() {
    usercount--;
    users.users.splice(users.users.indexOf(socket.user), 1);
    console.log("User disconnected : ", socket.user);
    connections.splice(connections.indexOf(socket), 1);
    console.log("user disconnected, total users online : ", connections.length);
    getuser();
    socket.disconnect();
  }

  function getuser() {
    io.emit("users", users);
  }
});

// make the http server listen in port 3000
io.listen(process.env.PORT || 3200, () => {
  console.log("Listening for connection..");
});