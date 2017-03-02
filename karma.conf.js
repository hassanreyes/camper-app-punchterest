var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        hostname: process.env.IP,
        port: process.env.PORT,
        runnerPort : 0,
        singleRun: true,
        frameworks: ['mocha'],
        files: ['public/tests/**/*.test.jsx'],
        preprocessors: {
           'public/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        client: {
           mocha: {
               timeout: '5000'
           }
        },
        webpack: webpackConfig,
        webpackServer: {
           noInfo: true
       },
       plugins: ['karma-phantomjs-launcher', 'karma-webpack', 'karma-sourcemap-loader', 'karma-mocha', 'karma-mocha-reporter']
    });
};
