var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  
  output: {
    path: helpers.root('webroot'),
    publicPath: 'http://localhost:8080/',
    filename: 'dist/[name].js',
    chunkFilename: 'dist/[id].chunk.js'
  },
  
  plugins: [
    new ExtractTextPlugin('dist/[name].css')
  ],
  
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
        '/api': {
            target: {
                host: "localhost",
                protocol: 'http:',
                port: 8181
            }
        }
    }
  }
});
