/*jshint laxcomma: true, asi: true, eqnull: true, browser: false */
/*global console: false, exports: false, require: false */


exports.init = function () {
  'use strict';
  var WebSocket = require('ws')
    , Web_socket_server = WebSocket.Server
    , port = 4016
    , wss = new Web_socket_server({port : port});

  wss.broadcast = function(data) {
    for (var i in this.clients) {
      this.clients[i].send(data);
    }
  };

  wss.on('connection', function connected (socket) {
    // wss.broadcast('new connection');
    socket.on('message', function (message) {
      if ('pong' !== message) {
        console.log('received: %s', message);
        wss.broadcast(message);
      }
    });
  });

  console.log('Broadcast listening on port ' + port);

}
