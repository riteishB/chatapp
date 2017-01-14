  // hidden elemets will be reveled once the user signs in 
  $('#chatwindow').hide()
  $('#message').hide();
  var socket = io();
  // once the user presses the button
  $('#signin').on('click touchstart', function(e) {
      e.preventDefault();
      // emit the user name to the server
      socket.emit('user', $('#username').val());
      $('#username').val('');
      return false;
  });

  // when the user selects to send the message
  $('#msgbtn').on('click touchstart', function(e) {
      e.preventDefault();
      // emit the message the user is sending 
      socket.emit('chat message', $('#msg').val());
      // clear the message variable once message has been sent
      $('#msg').val('');
      return false;
  });

  // when the user clicks on logoff

  $('#signout').on('click touchstart', function (e){
      e.preventDefault();
      // emit disconnect
      //console.log('Clicked Disconnect');
      socket.emit('logout');
  });

  // if there is a duplicate user, client side will 
  // make the user input a new username
  socket.on('dup user', (data) => {
      alertdiv = document.getElementById("usrname");
      alertdiv.innerHTML = '<div class="alert alert-danger">' + data + '</div>'
      return false;
  });

  socket.on('chat message', (data) => {
      //console.log(data.msg);
      var msgdiv = document.getElementById("messages");
      //console.log(socket);
      //$('#msgwell').css('background','red');
      if (data.msg.length == " ") {
          alert("Cannot send empty message");
          return false;
      }
      // checking if the msg contains a link
      if (data.msg.includes('http://') || data.msg.includes('https://')) {
          //console.log(data.msg);
          msgdiv.innerHTML = msgdiv.innerHTML + '<p id="msgwell"><strong><span id="usrnm">' + data.user + '</span></strong>' + ' : <a href="' + data.msg + '" target="_blank">' + data.msg + '</a></p>';
      } else {
          msgdiv.innerHTML = msgdiv.innerHTML + '<p id="msgwell"><strong><span id="usrnm">' + data.user + '</span></strong>' + ' : ' + data.msg + '</p>';
      }

      $('#msgbox').scrollTop($('#msgbox')[0].scrollHeight);

  });

  socket.on('message', (data) => {
      //console.log(data);
      var headDiv = document.getElementById('welcome');
      headDiv.innerHTML = 'Welcome, <b> ' + data + '</b>';
  });

  socket.on('users', (users) => {
      $('#login').hide();
      $('#header').hide();
      $('#chatwindow').show();
      $('#message').show();
      var div = document.getElementById('users');
      div.innerHTML = '';
      var str = users.users;
      //console.log(str);
      for (var i = 0; i < str.length; i++) {
          var user = str[i].toString();
          //console.log(user);
          //$('#users').text(user);
          div.innerHTML = div.innerHTML + '<b>' + user + '<br>';
      }
      var onCount = document.getElementById('onlinecount');
      onCount.innerHTML = str.length;

  });
  