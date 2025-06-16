// contents of webpack.config.js
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: `./src/${pkg.entry}.jsx`,
  externals: {
    '@builder.io/react': '@builder.io/react',
    '@builder.io/app-context': '@builder.io/app-context',
    "@emotion/core": "@emotion/core",
    "react": "react",
    "react-dom": "react-dom"
  },
  output: {
    filename: pkg.output,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
        {
        test: /\.css$/, // This regex matches files ending with .css
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Interprets @import and url() like import/require() and resolves them
        ],
      },
      // You might also need a loader for JSX if you're using React/Preact etc.
      {
        test: /\.jsx?$/, // Matches .js and .jsx files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 1268,
    static: {
       directory: path.join(__dirname, './dist'),
     },
    headers: {
      'Access-Control-Allow-Private-Network': 'true',
      'Access-Control-Allow-Origin': '*',
    },
  },
};
