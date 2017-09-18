var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./helpers');

module.exports = {

  entry: {
    'polyfills': './ClientApp/polyfills.ts',
    'vendor': './ClientApp/vendor.ts',
    'app': './ClientApp/main.ts'
  },
  
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: "awesome-typescript-loader",
              options: {
                configFileName: helpers.root('ClientApp', 'tsconfig.json')
              }
          },
          { loader: "angular2-template-loader" }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.css$/,
        exclude: helpers.root('ClientApp', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] })
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./ClientApp'), // location of your src
      {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new CleanWebpackPlugin(
        [
            './webroot/index.html',
            './webroot/favicon.ico',
            './webroot/dist',
            './webroot/assets'
        ]
    ),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'body',
        template: 'ClientApp/index.html'
    }),
    new CopyWebpackPlugin([
        { from: './ClientApp/assets/*.*', to: 'assets/', flatten: true }
    ])
  ]
};

