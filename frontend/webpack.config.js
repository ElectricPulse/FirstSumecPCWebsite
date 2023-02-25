const webpack = require('webpack')
const path = require('path');
const HWP = require('html-webpack-plugin')
const settings = require('../shared/settings')

module.exports = (env) => {
	

	return {
	mode: 'development',
	context: __dirname,
	entry: './src/index.js',
	plugins: [
		new HWP({
			filename: 'index.html',
			template: './src/index.html',
		}),
		new webpack.DefinePlugin({
			_ERUDA: env.ERUDA
		}),
	],
	output: {
		path: path.resolve(__dirname, 'out'),
		filename: 'main.js',
		publicPath: '/',
	},
	devServer: {
  		historyApiFallback: true,
		port: 80,
		proxy: {
			'/api': `http://localhost:${settings.serverPort}`,
		},
  	},
	resolve: {
				roots: [path.resolve('./src')],
				alias: {
					"@shared": path.resolve(__dirname, "../shared"),
				}
		},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
								use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpe?g|svg)$/i,
				loader: 'file-loader'
			},
		]
	},
	}
};
