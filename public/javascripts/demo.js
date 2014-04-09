/*jshint eqnull: true, browser: true */
/*global window: false, console: false*/

(function(global, document, $, SocketWrench, undefined){
  'use strict';

  var s = new SocketWrench('ws://localhost:4014');

  s.on('open', function (what) {
    console.log('socket opened', what);
  });

  s.on('close', function onClose (what) {
    console.log('socket closed', what);
  });

}(window, window.document, window.jQuery, window.SocketWrench));