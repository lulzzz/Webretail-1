var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./webpack.helpers');

console.log('@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@');

module.exports = {

    devtool: 'source-map',
    performance: {
        hints: false
    },
    entry: {
        'app': './ClientApp/main.ts'
    },

    output: {
        path: __dirname +  '/wwwroot/',
        filename: 'dist/[name].bundle.js',
        chunkFilename: 'dist/[id].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },
	
    devServer: {
        port: 8888,
        host: 'localhost',
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/wwwroot/'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: {
            colors: true
        },
        hot: false,
        inline: false,
        // Send API requests on localhost to API server get around CORS.
        proxy: {
            '/api': {
                target: {
                    host: "localhost",
                    protocol: 'http:',
                    port: 8080
                }
            },
            '/Media': {
                target: {
                    host: "localhost",
                    protocol: 'http:',
                    port: 8080
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular-router-loader',
                    'angular2-template-loader',        
                    'source-map-loader',
                    'tslint-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },
            {
                test: /favicon.ico$/,
                loader: 'file-loader?name=/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'polyfills']}),
    
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets',
                './wwwroot/views/admin.mustache',
                './wwwroot/index.html'
            ]
        ),

        // web-server deploy
        new HtmlWebpackPlugin({
            filename: 'views/admin.mustache',
            inject: 'body',
            template: 'ClientApp/index.html'
        }),
        // webpack-dev-server deploy
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'ClientApp/index.html'
        }),

        // new CopyWebpackPlugin([
        //     { from: './ClientApp/images/*.*', to: 'assets/', flatten: true }
        // ])
    ]

};

