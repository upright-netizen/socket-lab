/*jshint laxcomma: true, asi: true */

exports.init = function () {

  var WebSocket = require('ws')
    , web_socket_server = WebSocket.Server
    , feed = new web_socket_server({port : 4014})
    , timer

  function gimme () {
    var Brands = [
          "Marc by Marc Jacobs",
          "Jack Rogers",
          "Magaschoni",
          "Alixia Admor",
          "Pierre Balmain",
          "Under Two Flags",
          "Kate Spade",
          "Ali Ro",
          "Cynthia Steffe",
          "Alex + Alex",
          "Narciso Rodrigues",
          "Steve by Steve Jacobs",
          "Alexander Olch",
          "Grenson"
        ],
        Products = [
          "Lorem",
          "ipsum",
          "doloar",
          "sit",
          "amet",
          "adipsicing",
          "Pronin",
          "Quis",
          "Vestibulum",
          "Felix",
          "Acutore",
          "Maiecensas",
          "Lobortic",
          "Tincidunt risus",
          "Elit ac velit"
        ];

    return {

        "event" : {},
         item : {
          type : "Product",
          data : {
            brand_name : Brands[Math.floor(Math.random() * Brands.length)],
            product_name : Products[Math.floor(Math.random() * Products.length)],
            min_sale_price : "",
            max_sale_price : "",
            min_mrsp_price : "",
            max_mrsp_price : "",
            product_url : "",
            image_url : "http://localhost:3013/prototypes/feed/img/" + (Math.floor(Math.random() * 50) + 1) + ".jpg",
            share_url : ""
          }
        }
    };
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