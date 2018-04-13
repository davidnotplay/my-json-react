const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = env => {

  return {
    entry: {
      vendor: ['react', '@blueprintjs/core', '@blueprintjs/icons'],
      app: './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'js/[name].[contenthash].js'
    },

    module: {
      rules: [
        {
          test: /\.js(?:x)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s[ac]ss$/,
          use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader' },
              { loader: 'sass-loader' },
            ],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            minSize: 400000
          }
        }
      }
    },

    plugins: [
      new HtmlWebpackPlugin({ template: './index.html'}),
      new ExtractTextPlugin('style.[sha256:contenthash:hex:6].css'),
      new CleanWebpackPlugin(['docs'])
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },

    devServer: {
    },

    mode: env.debug ? 'development' : 'production'
  }
}
