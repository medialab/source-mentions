var webpack = require('webpack'),
    path = require('path');


module.exports = {
  module: {
    loaders: [
      // Fonts
      {
        test: /\.(ttf|eot|svg|gexf|woff2?)(\?[a-z0-9.=]+)?$/,
        loader: 'file'
      }
    ]
  }
};
