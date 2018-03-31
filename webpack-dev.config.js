const path = require('path')

module.exports =  () => {
  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js'
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

    devServer: {

    }

  }
}
