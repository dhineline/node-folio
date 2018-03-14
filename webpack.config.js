const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let node_modules_path = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
                    // If you are having trouble with urls not resolving add this setting.
                    // See https://github.com/webpack-contrib/css-loader#url
                    url: false,
                    minimize: true,
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    url: false,
                    minimize: true,
                    sourceMap: true,
                    includePaths: [
                      path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
                  ]
                }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
