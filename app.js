/*jshint laxcomma: true, asi: true, eqnull: true, browser: false */
/*global __dirname: false, require: false, console: false */

'use strict';

var express = require('express')
  , app = express()
  , port = 9678
  , socket4014 = require(__dirname + '/app/randomMessages')
  , socket4015 = require(__dirname + '/app/healthCheck')
  , broadcaster = require(__dirname + '/app/broadcast.js')
  , troubleMaker = require(__dirname + '/app/trouble_maker.js')
  , sockets = []

sockets.push(socket4014.init());
sockets.push(socket4015.init());
sockets.push(broadcaster.init());
sockets.push(troubleMaker.init());

app.set('view options', { layout: false});
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/index', function (req, res) {
  res.render('index');
});

app.listen(port, function () {
  console.log('listening on port : ' + port);
});

