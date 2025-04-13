const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js', // Adjust the path according to your project structure
  output: {
    path: path.resolve(__dirname, 'src'), // Set the output path to the 'dist' directory
    filename: 'bundle.js', // Specify the name of the output bundle file
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
