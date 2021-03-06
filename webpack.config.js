const path = require("path");
const webpack = require("webpack");
const DtsBundleWebpack = require("dts-bundle-webpack");
const nodeExternals = require("webpack-node-externals");

const config = {
  entry: "./src/Client.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DtsBundleWebpack({
      name: "lastpass",
      main: "dist/Client.d.ts",
      removeSource: true,
      outputAsModuleFolder: true
    })
  ],
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this"
  }
};

const webConfig = {
  ...config,
  target: "web",
  node: {
    buffer: true,
    crypto: true
  },
  output: { ...config.output, filename: "lastpass.browser.js" }
};

const serverConfig = {
  ...config,
  externals: [nodeExternals()],
  target: "node",
  output: { ...config.output, filename: "lastpass.node.js" },
};

module.exports = [serverConfig, webConfig];
