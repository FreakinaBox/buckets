"use strict";

const fs = require('fs');
const http2 = require('spdy');
const app = require('./components/app');
const Socket = require('./components/Socket');

//initialize Socket.IO

//use live reload if not in production
require('express-livereload')(app, {watchDir: 'client'});

//start in httpd mode
let options = {
	key: fs.readFileSync('localhost.key'),
	cert: fs.readFileSync('localhost.cert')
};
const server = http2.createServer(options, app).listen(443);
const socket = new Socket(server);

// server.listen(80);
