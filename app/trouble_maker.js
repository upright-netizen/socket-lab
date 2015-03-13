/*jshint laxcomma: true, asi: true, eqnull: true, browser: false */
/*global console: false, exports: false, require: false */

exports.init = function () {
  'use strict';
  var WebSocket = require('ws')
    , Web_socket_server = WebSocket.Server
    , port = 4017
    , reservedTypes = [
      'close',
      'error',
      'fail',
      'open',
      'ready',
      'trouble'
    ]
    , testSocket = new Web_socket_server({port : port})
    , timer;

    function rand (num) {
      return Math.floor(Math.random() * num);
    }

    function makeTrouble (socket) {
      var type = reservedTypes[rand(reservedTypes.length)];

      socket.send(JSON.stringify({
        type: type,
        message: 'psych!'
      }));

      console.log('sending message:', type);
    }

    function troubleMakerLoop (socket) {
      makeTrouble(socket);
      timer = setTimeout(function () {
        if (socket.readyState === WebSocket.OPEN) {
          troubleMakerLoop(socket);
        } else if (socket.readyState === WebSocket.CLOSED) {
          console.log('Trouble Maker Disconnected');
        }
      }, 750);
    }

    testSocket.on('connection', function connected (socket) {
      console.log('Trouble Maker connected');
      troubleMakerLoop(socket);
    });

  console.log('Trouble Maker listening on 4017');
}