'use strict'

var WebsocketServer = require('ws').Server;
var util = require('util');

const DEFAULT_PORT = 8008;

var clients = [];
var wsServer = new WebsocketServer({port: DEFAULT_PORT});

function convertDataURIToBinary(dataURI) {
  var BASE64_MARKER = ';base64,';
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  return new Buffer(base64, 'base64'); // atob(base64) in window scope
}

wsServer.on('connection', (ws) => {
  util.log('websocket connected');
  clients.push(ws);
  ws.on('message', (data) => {
    util.log('[data] ' + data);
  });
  ws.on('close', () => {
    util.log('websocket disconnected');
  });
});

util.log('websocket server listening on port 8008');
