'use strict';

const path = require('path');

module.exports = {
	target: 'web',
	devtool: 'source-map',
	context: path.join(__dirname),
	entry: {
		app: './src/spa/app.js'
	},
	output: {
		path: path.join(__dirname, 'dist', 'spa'),
		publicPath: '/dist/spa/',
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /src(\/|\\).*\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react']
				}
			}
		]
	},
	plugins: []
};
