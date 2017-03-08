const db = require('./Database');

class Client {

	constructor(clientSocket) {
		this.clientSocket = clientSocket;

		console.log('client connected', clientSocket.id);

		this.clientSocket.on('createItem', (...args) => this.createItem(...args));
		this.clientSocket.on('getItem', (...args) => this.getItem(...args));
		this.clientSocket.on('updateItem', (...args) => this.updateItem(...args));
		this.clientSocket.on('searchItems', (...args) => this.searchItems(...args));

		this.clientSocket.on('join', room => this.clientSocket.join(room));
		this.clientSocket.on('leave', room => this.clientSocket.leave(room));
	}

	createItem(send) {
		db.getNextIdAsync('items')
			.then(id => db.items.insertAsync({id, status: 'New'}))
			.then(item => send(item))
			.catch(e => this.clientSocket.emit('error', e));
	}

	getItem(id, send) {
		this.clientSocket.join(`i${id}`);
		db.items.findOneAsync({id})
			.then(item => send(item))
			.catch(e => this.clientSocket.emit('error', e));
	}

	//save data and emit to other connections
	updateItem(id, data) {
		db.items.updateAsync({id}, {$set: data});
		this.clientSocket.broadcast.to(`i${id}`).emit('updateItem', id, data);
	}

	searchItems(filters, send) {
		db.items.findAsync(filters)
			.then(items => send(items))
	}
}

module.exports = Client;