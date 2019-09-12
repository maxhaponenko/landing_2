const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack');

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV settings gonna be here
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css'}),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ]
})

// export devWebpackConfig
module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig)
})