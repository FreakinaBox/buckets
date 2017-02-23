const webpack = require('webpack');
const path = require('path');

module.exports = {
	context: `${__dirname}/client/app`,
	devtool: 'inline_sourcemap',
	entry: `./app.js`,
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			},
			{
				test: /\.s?css$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	output: {
		path: 'client',
		filename: 'app.min.js'
	},
};
