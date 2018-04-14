const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')



module.exports = env => {
  return {
    entry: {
      myJsonReact: './src/MyJsonReact/index.jsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: 'myJsonReact',
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        {
          test: /\.js(?:x)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },

    plugins: [
      new CleanWebpackPlugin(['dist'])
    ],

    externals: {
      'react': 'react'
    },

    mode: env.debug ? 'development' : 'production',
    devtool: env.debug ? 'eval-source-map' : 'source-map'
  }
}
