/*jshint laxcomma: true, asi: true */

exports.init = function () {

  var WebSocket = require('ws')
    , web_socket_server = WebSocket.Server
    , port = 4014
    , testSocket = new web_socket_server({port : port})
    , timer

    , messages;

  messages = {
    "time" : function timeMessage () {
      var
        t = new Date(),
        hours = t.getHours(),
        minutes = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();

      return {
        type : "time",
        data : hours + ":" + minutes
      };
    },

    "price-drop" : function priceDropMessage () {
      return {
        type : "price-drop",
        data : {
          productId : 123129384,
          price : 123.24
        }
      }
    },

    "inventory-status" : function inventoryStatusMessage () {
      return {
        type : "inventory-status",
        data : "coming soon"
      };
    },

    "number" : function numberMessage () {
      return {
        type : "number",
        data : Math.floor(Math.random() * 100)
      };
    },

    "date" : function dateMessage () {
      return {
        type : "date",
        data : new Date()
      }
    }
  }

  function randomMessage() {
    var types = ["time", "price-drop", "inventory-status", "number", "date"];
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

    console.log("Web Socket 4014 Connected.");

    looptyloo(socket);

    socket.on('message', function (message) {
      console.log('received: %s', message);
    });
  });

  console.log('Socket listening on port ' + port);

}
