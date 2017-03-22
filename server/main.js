"use strict";

const http = require('http');
const app = require('./components/app');
const Socket = require('./components/Socket');

const port = process.env.PORT || 80;

const server = http.createServer(app).listen(port);
const socket = new Socket(server);
