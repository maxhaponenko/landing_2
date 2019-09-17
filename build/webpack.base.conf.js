const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder

// const PAGES_DIR = PATHS.src
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))


module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    // publicPath: '/'       // not use if need to check build version on local machine
  },
  module: {
    rules: [
		{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, 
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: true, url: false }
				},
				{
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
				}, 
				{
					loader: 'sass-loader',
					options: { sourceMap: true }
				} 
			]
		}, 
		{
			test: /\.css$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: true, url: true } // "url: false" allows to use absolute and relative paths in scss and css files
				}, 
				{
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
				}
			]
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
			}
		},
    ]
	},
	resolve: {
		alias: {
		  '~': PATHS.src,
		}
	  },
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`
		}),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}img` },
			{ from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
			{ from: `${PATHS.src}/static`, to: '' }
		]),
		// PAGES.map(page => new HtmlWebpackPlugin({
		// 	template: `${PAGES_DIR}/${page}`,
		// 	filename: `./${page}`
		//   }))
	],
  	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	},
}