const webpack = require('webpack')
const path = require('path');
const HWP = require('html-webpack-plugin')
const settings = require('../shared/settings')

const currentSettings = settings.server.local ? settings.server.localhost : settings.server.host

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
	],
	output: {
		path: path.resolve(__dirname, 'out'),
		filename: 'index.js',
		publicPath: '/',
	},
	devServer: {
  		historyApiFallback: {
			disableDotRule: true,
		},
		port: currentSettings.port,
		host: currentSettings.IP,
		proxy: {
			'/api': `http://localhost:${currentSettings.port+1}`,
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
