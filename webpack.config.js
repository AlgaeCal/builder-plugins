// contents of webpack.config.js
const path = require('path');
const pkg = require('./package.json'); // Make sure pkg.output is defined, e.g., "output": "plugin.system.js"
const glob = require('glob');

// Helper function to get all relevant plugin entry files
const getAllPluginEntryFiles = (baseDir, pattern) => {
  const absoluteBaseDir = path.resolve(__dirname, baseDir);
  return glob.sync(`${absoluteBaseDir}/*/index.{js,jsx,ts,tsx}`);
};

module.exports = {
  mode: 'production',
  entry: {
    'plugins': getAllPluginEntryFiles('src/plugins', '**/*.{js,jsx,ts,tsx}')
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // Emits to 'dist' folder
    filename: pkg.output || 'plugin.system.js',
    libraryTarget: 'system',
    library: 'BuilderPlugins',
    clean: true, 
  },

  externals: {
    '@builder.io/react': '@builder.io/react',
    '@builder.io/app-context': '@builder.io/app-context',
    "@emotion/core": "@emotion/core",
    "react": "react",
    "react-dom": "react-dom"
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
    port: 5000,
    static: {
       directory: path.join(__dirname, './dist'),
     },
    headers: {
      'Access-Control-Allow-Private-Network': 'true',
      'Access-Control-Allow-Origin': '*',
    },
  },
};