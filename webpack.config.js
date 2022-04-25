const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = (env, opts) => {
  const config = {
    resolve: {
      extensions: ['.vue', '.js'],
      alias: {
        '~': path.join(__dirname),
      },
    },
    entry: {
      bundle: path.join(__dirname, 'main.js'),
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
    ],
  };

  if (opts.mode === 'development') {
    return merge(config, {
      devtool: 'eval',
      devServer: {
        open: false,
        hot: true,
      },
    });
  } else {
    return merge(config, {
      devtool: 'cheap-module-source-map',
      plugins: [new CleanWebpackPlugin()],
    });
  }
};
