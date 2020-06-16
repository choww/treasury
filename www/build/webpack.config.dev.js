const path = require('path');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getPath(dir) {
  return path.join(__dirname, '..', dir);
};

module.exports = {
  mode: 'development',
  entry: ['./src/main.js'],
  // allows use of dotenv
  node: { fs: 'empty' },
  output: {
    path: getPath('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': getPath('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [getPath('src')],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ],
  devServer: {
    https: true,
    key: fs.readFileSync('/app/localhost.key'),
    cert: fs.readFileSync('/app/localhost.crt'),
    host: 'https://localhost',
    port: 8080,
    open: true,
    proxy: {
      api: 'http://localhost:3000',
    }
  },
  // Necessary for file changes inside the bind mount to get picked up
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
};
