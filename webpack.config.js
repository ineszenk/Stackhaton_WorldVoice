module.exports = {
  externals: ["tls", "net", "fs"],
  entry: "./app/index.js",
  output: {
    path: __dirname,
    filename: "./bundle.js"
  },
  context: __dirname,
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: "css-loader"
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
