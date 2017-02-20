'use strict';

const express = require('express');
const logger = require('morgan');
const app = module.exports = express();

app.use(logger('dev'));

//send any api requests to the api router
app.use('/api', (req, res) => {
	res.send('ok')
});

app.use(express.static('client'));

//send homepage for any other urls so that going directly to /items will still load the app
app.use((req, res) => {
	res.sendFile('index.html', {root: 'client'})
});