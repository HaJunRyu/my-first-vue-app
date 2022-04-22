const path = require('path');

module.exports = {
  // 진입정
  entry: {
    bundle: path.join(__dirname, 'main.js'),
  },
  // 결과물에 대한 설정
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {},
  plugins: [],
};
