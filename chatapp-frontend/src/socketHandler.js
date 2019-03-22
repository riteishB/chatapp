import openSocket from "socket.io-client";
// import { Subject } from 'rxjs'
import { Observable } from "rxjs";

//  initialize socket connect on import right away
const socket = openSocket("http://localhost:3200");

// always listen for errors
errorHandler();

function sendMessage(message) {
  socket.emit("chat message", message);
}

async function getMessage() {
  let observable = new Observable(observer => {
    socket.on("chat message", data => {
      observer.next(data);
    });
    return () => {
      socket.disconnect();
    };
  });
  return observable;
}

function login(username) {
  socket.emit("user", username);
}

function errorHandler() {
  socket.on("err", data => {
    window.alert(data);
  });
}

export { sendMessage, getMessage, login };
