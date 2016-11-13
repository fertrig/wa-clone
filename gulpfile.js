'use strict';

// require('babel-core/register');

const gulp = require('gulp');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

gulp.task('build-spa', (callback) => {

	const buildConfig = Object.create(webpackConfig);

	buildConfig.debug = false;
	buildConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
	buildConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': '"production"'
		}
	}));

	webpack(buildConfig, (err, stats) => {
		if (err) {
			callback(err);
		}
		else {
			console.log(stats.toString({ chunks: false, colors: true }));
			callback();
		}
	});
});


const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

gulp.task('spa-server', () => {

	const compiler = webpack(webpackConfig);

	const server = new WebpackDevServer(compiler, {
		contentBase: path.join(__dirname, 'www'),
		quiet: false,
		noInfo: false,
		publicPath: '/dist/spa/',
		stats: { chunks: false, colors: true }
	});

	server.listen(5000, '0.0.0.0', (err) => {
		if (err) {
			console.log('could not start spa server');
			console.error(err);
		}
	})
});
