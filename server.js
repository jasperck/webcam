'use strict'

var WebsocketServer = require('ws').Server;
var util = require('util');

const DEFAULT_PORT = 8008;

var clients = [];
var wsServer = new WebsocketServer({port: DEFAULT_PORT});

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
