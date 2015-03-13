/*jshint laxcomma: true, asi: true, eqnull: true, browser: false */
/*global __dirname: false, require: false, console: false */

'use strict';

var express = require('express')
  , app = express.createServer()
  , port = 9678
  , socket4014 = require(__dirname + '/app/randomMessages')
  , socket4015 = require(__dirname + '/app/healthCheck')
  , broadcaster = require(__dirname + '/app/broadcast.js')
  , troubleMaker = require(__dirname + '/app/trouble_maker.js')

  socket4014.init();
  socket4015.init();
  broadcaster.init();
  troubleMaker.init();

app.configure(function () {
  app.set('view options', { layout: false});
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
});

app.get('/index', function (req, res) {
  res.render('index');
});

app.listen(port);
console.log('listening on port : ' + port);
