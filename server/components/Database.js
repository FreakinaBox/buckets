"use strict";
const Promise = require('bluebird');

//promisify all mongojs functions
const mongojs = Promise.promisifyAll(require('mongojs'));
const dbPrototype = Promise.promisifyAll(require("mongojs/lib/database").prototype);
Promise.promisifyAll(require("mongojs/lib/collection").prototype);
Promise.promisifyAll(require("mongojs/lib/cursor").prototype);

dbPrototype.getNextIdAsync = function (counter) {
	return db.counters.findAndModifyAsync({
			query: {id: counter},
			update: {$inc: {value: 1}},
			new: true,
			upsert: true
		})
		.then(counter => {
			return counter.value;
		});
};

let db = mongojs('192.168.99.100/buckets');

module.exports = db;

