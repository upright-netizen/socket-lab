/*jshint laxcomma: true, asi: true, eqnull: true, browser: false */
/*global console: false, exports: false, require: false */


exports.init = function () {
  'use strict';
  var WebSocket = require('ws')
    , Web_socket_server = WebSocket.Server
    , port = 4016
    , wss = new Web_socket_server({port : port})

  wss.on('connection', function connected (socket) {
    wss.broadcast('new connection');
    socket.on('message', function (message) {
      console.log('received: %s', message);
    });
  });

  console.log('Broadcast listening on port ' + port);

}
