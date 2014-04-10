/*jshint eqnull: true, browser: true */
/*global window: false, console: false*/

(function(global, document, $, SocketWrench, undefined){
  'use strict';

  var
    defaults = {
      url : 'ws://localhost:4014',
      autoConnect : false
    },
    code = 1000,
    reason = 'Closing normally',
    receivedCode,
    receivedReason,
    s = new SocketWrench(defaults);

  s.on('ready', function onReady () {
    s.close(code, reason);
  });

  s.on('close', function onClose (e) {
    console.log(e);
    console.log('expect', (typeof e), 'toBe', 'object');
    console.log('expect', e.code, 'toBe', code);
    console.log('expect', e.reason, 'toBe', reason);
  });

  s.open();


}(window, window.document, window.jQuery, window.SocketWrench));