var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './public/app.jsx'
    ],
    output: {
        path: __dirname,
        filename: './client/js/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Nav       : 'public/components/layout/nav',
            NewPost   : 'public/components/posts/newPost',
            Post      : 'public/components/posts/post',
            UserPosts : 'public/components/posts/userPosts',
            AllPosts  : 'public/pages/allPosts',
            Layout    : 'public/pages/layout',
            MyPosts   : 'public/pages/myPosts',
            Auth      : 'public/auth'
        },
        extensions: ['','.js','.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query:
                  {
                    presets:["react", "stage-0", "es2015"]
                  },
                plugins: ["transform-decorators-legacy", "transform-es2015-modules-simple-commonjs", "babel-plugin-webpack-alias"]
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map'
};
