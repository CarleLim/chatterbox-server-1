// YOUR CODE HERE:

var App = function(){
  this.server = 'http://127.0.0.1:3000';
  this.rooms = {};
  this.friends = {};
};

App.prototype.init = function(){
  var context = this;

  if (!/(&|\?)username=/.test(window.location.search)) {
    var newSearch = window.location.search;
    if (newSearch !== '' & newSearch !== '?') {
      newSearch += '&';
    }
    newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
    window.location.search = newSearch;
  }

  context.fetch();

  $('#send').off().submit(function(event){
    context.handleSubmit();
    event.preventDefault();
  });

  $('#addNewRoom').off().submit(function(event){
    event.preventDefault();
    context.addRoom($('input[name="newRoom"]').val());

  });
};

App.prototype.send = function(message){
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent. Data: ', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message. Error: ', data);
    },
  });
};

App.prototype.fetch = function () {
  // removes messages from DOM
  // retrieves messages from server
  // adds messages (call addMessage)
  var context = this;

  $.ajax({
    url: this.server,
    type: 'GET',
    data: {},
    success: function (data) {
      var data = JSON.parse(data);
      context.clearMessages();

      for(var i = 0; i < data.length; i++) {
        //if (data[i].roomname === $('#roomSelect').find(':selected').text()) {
          context.addMessage(data[i]);
        //}

        context.addRoom(data.roomname);
        $('.username').one('click', function(event){
          event.preventDefault();
          var target = $(this);
          var username = target[0].text;
          context.addFriend(username);
        });
      }


    },
    error: function (data) {
      console.error('chatterbox: Failed to fetch messages. Error: ', data);
    },
  });
};

App.prototype.clearMessages = function () {
  // removes messags from DOM
  $('#chats').children().remove();
};

App.prototype.addMessage = function (messageData) {
  // puts message into DOM
  console.log(messageData);
  var context = this;
  var username = cleanEscape(messageData.username);
  var roomname = cleanEscape(messageData.roomname);
  var text = cleanEscape(messageData.text);
  var createdAt = cleanEscape(messageData.createdAt);

  if( username === getUsername() ){
    var addOn = $('<div class="fromUser"></div>');
  }else{
    var addOn = $('<div class="fromOther"></div>');
  }

  /*$(addOn).append('<h3 class="username"><a href="#" onclick="addFriend(username)">' + username + '</a></h3><span>' + createdAt + '</span>');*/
  if( this.friends.hasOwnProperty(username) ){
    $(addOn).append('<h3><i class="fa fa-smile-o" aria-hidden="true"></i> <a href="#" class="username">' + username + '</a></h3><span>' + createdAt + '</span>');
  }else{
    $(addOn).append('<h3><a href="#" class="username">' + username + '</a></h3><span>' + createdAt + '</span>');
  }
  $(addOn).append('<p>' + text + '</p>');
  if( username === getUsername() ){
    $(addOn).append('<img class="lisp" src="images/fromMe.png">');
  }else{
    $(addOn).append('<img class="lisp" src="images/from.png">');
  }

  $('#chats').append(addOn);
};

App.prototype.addRoom = function (roomName) {
  // used by handleSubmit
  if( !this.rooms.hasOwnProperty(roomName) ){
    this.rooms[roomName] = roomName;
    $('#roomSelect').append('<option value="' + roomName + '">' + roomName + '</option>' );
  }
};

App.prototype.addFriend = function (userName) {

  if(!this.friends.hasOwnProperty(userName)){
    this.friends[userName] = userName;
  }
  console.log(this.friends);
};

App.prototype.handleSubmit = function () {
  // sends message (uses send)
  var messageObj = {};

  messageObj.username = getUsername();
  messageObj.text = $('input[name="message"]').val();
  messageObj.roomname = $('#roomSelect').find(':selected').text();
  console.log('messageObj.text: ' + messageObj.text);
  if( messageObj.text.length > 0 ){
    this.send(messageObj);
  }

  this.fetch();
};


var getUsername = function(){
  var str = window.location.search;
  var arr = str.split('=');

  return arr[1];
};

function cleanEscape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};



var app = new App();
app.init();

$(document).ready(function () {
  setInterval(function(){
    app.fetch();
  }, 3000);
});
