'use strict';

require('babel-core/register');

var gulp = require('gulp');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('build-spa', function(callback) {

	var buildConfig = Object.create(webpackConfig);

	buildConfig.debug = false;
	buildConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
	buildConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': '"production"'
		}
	}));

	webpack(buildConfig, function(err, stats) {
		if (err) {
			callback(err);
		}
		else {
			console.log(stats.toString({ chunks: false, colors: true }));
			callback();
		}
	});
});


var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

gulp.task('spa-server', function() {

	var compiler = webpack(webpackConfig);

	var server = new WebpackDevServer(compiler, {
		contentBase: path.join(__dirname, 'www'),
		quiet: false,
		noInfo: false,
		publicPath: '/dist/spa/',
		stats: { chunks: false, colors: true }
	});

	server.listen(5000, '0.0.0.0', function(err) {
		if (err) {
			console.log('could not start spa server');
			console.error(err);
		}
	})
});


var mocha = require('gulp-mocha');
var testPaths = ['./test-root.js','./src/**/__tests__/*.tests.js'];

gulp.task('test', function () {
	return gulp
		.src(testPaths, {
			read: false
		})
		.pipe(mocha({
			reporter: 'nyan'
		}));
});
