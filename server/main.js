"use strict";

const fs = require('fs');
const http = require('http');
const http2 = require('spdy');
const app = require('./components/app');
const Socket = require('./components/Socket');

const port = process.env.PORT || 80;

//use live reload if not in production
process.env.NODE_ENV !== 'production' && require('express-livereload')(app, {watchDir: 'client'});

//start in httpd mode
// let options = {
// 	key: fs.readFileSync('localhost.key'),
// 	cert: fs.readFileSync('localhost.cert')
// };
// const server = http2.createServer(options, app).listen(443);
const server = http.createServer(app).listen(port);
const socket = new Socket(server);

// server.listen(80);
