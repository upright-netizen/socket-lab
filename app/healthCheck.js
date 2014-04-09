/*jshint laxcomma: true, asi: true, eqnull: true, browser: false */
/*global console: false, exports: false, require: false */


exports.init = function () {
  'use strict';
  var WebSocket = require('ws')
    , Web_socket_server = WebSocket.Server
    , port = 4015
    , testSocket = new Web_socket_server({port : port})
    , timer;


  function healthcheck (socket) {
    console.log('sending ping');
    socket.send('ping');
  }

  function healthcheckLoop (socket) {
    healthcheck(socket);
    timer = setTimeout(function () {
      if (socket.readyState === WebSocket.OPEN) {
        healthcheckLoop(socket);
      } else if (socket.readyState === WebSocket.CLOSED) {
        console.log('Web Socket Disconnected');
      }
    }, 2500);
  }

  testSocket.on('connection', function connected (socket) {
    console.log('Web Socket 4015 Connected.');

    // looptyloo(socket);
    healthcheckLoop(socket);

    socket.on('message', function (message) {
      console.log('received: %s', message);
    });
  });

  console.log('Health Check listening on port ' + port);

}
