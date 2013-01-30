/*jshint laxcomma: true, asi: true */

exports.init = function () {

  var WebSocket = require('ws')
    , web_socket_server = WebSocket.Server
    , feed = new web_socket_server({port : 22001})
    , timer

    , messages;

  messages = {
    "time" : function () {},

    "price-drop" : function () {},

    "inventory-status" : function () {},

    "number" : function () {},

    "date" : function () {}
  }


  function looptyloo (socket) {
    timer = setTimeout(function () {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(gimme()));
        looptyloo(socket);
      } else if (socket.readyState === WebSocket.CLOSED){
        console.log('Web Socket Disconnected');
      }
    }, (Math.floor(Math.random() * 3000) + 500));
  }


  feed.on('connection', function connected (socket) {

    console.log("Web Socket Connected.");

    looptyloo(socket);

    feed.on('message', function (message) {
      console.log('received: %s', message);
    });
  });
}
