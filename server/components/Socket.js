'use strict';

const socketIO = require('socket.io');
const Client = require('./Client');

module.exports = class Socket {
	constructor(server) {
		this.io = socketIO(server);
		this.io.on('connection', clientSocket => new Client(this.io, clientSocket));
	}
};