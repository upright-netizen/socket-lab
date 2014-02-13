/*jshint laxcomma: true, asi: true */

exports.init = function () {

  var WebSocket = require('ws')
    , web_socket_server = WebSocket.Server
    , port = 4015
    , testSocket = new web_socket_server({port : port})
    , timer

    , messages;

  messages = {
    "foo" : function timeMessage () {
      return "foo";
    },

    "bar" : function priceDropMessage () {
      return "bar";
    },

    "baz" : function inventoryStatusMessage () {
      return "baz";
    },

    "bim" : function numberMessage () {
      return "bim";
    },

    "skuData" : function skuDataMessage () {
      return {
        what : 12345345,
        ever : 88794987
      };
    }
  }

  function randomMessage() {
    var types = ["foo", "bar", "baz", "bim", "skuData"];
    return messages[types[Math.floor(Math.random() * types.length)]]();
  }

  function looptyloo (socket) {
    timer = setTimeout(function () {
      if (socket.readyState === WebSocket.OPEN) {
        var message = randomMessage();
        socket.send(JSON.stringify(message));
        // console.log(message);
        console.log(".");
        looptyloo(socket);
      } else if (socket.readyState === WebSocket.CLOSED){
        console.log('Web Socket Disconnected');
      }
    }, (Math.floor(Math.random() * 3000) + 500));
  }


  testSocket.on('connection', function connected (socket) {

    console.log("Web Socket 4015 Connected.");

    looptyloo(socket);

    socket.on('message', function (message) {
      console.log('received: %s', message);
    });
  });

  console.log('Socket listening on port ' + port);

}
