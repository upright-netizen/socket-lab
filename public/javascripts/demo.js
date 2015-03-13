/*jshint eqnull: true, browser: true */
/*global window: false, console: false*/

(function(global, document, $, SocketWrench, undefined){
  'use strict';

  // var
  //   defaults = {
  //     url : 'ws://localhost:4014',
  //     autoConnect : false
  //   },
  //   code = 1000,
  //   reason = 'Closing normally',
  //   s = new SocketWrench(defaults);

  // s.on('ready', function onReady () {
  //   s.close(code, reason);
  // });

  // s.on('close', function onClose (e) {
  //   console.log(e);
  //   console.log('expect', (typeof e), 'toBe', 'object');
  //   console.log('expect', e.code, 'toBe', code);
  //   console.log('expect', e.reason, 'toBe', reason);
  // });

  // s.open();

var s = new SocketWrench('ws://localhost:4017');

s.on('open', function (e) {
  console.log('on open', e);
});

s.on('close', function (e) {
  console.log('on close', e);
});

s.on('error', function (e) {
  console.log('on error', e);
});

s.on('fail', function (e) {
  console.log('on fail', e);
});

s.on('ready', function (e) {
  console.log('on ready', e);
});

s.on('message', function (e) {
  console.log('on message', e);
});

}(window, window.document, window.jQuery, window.SocketWrench));