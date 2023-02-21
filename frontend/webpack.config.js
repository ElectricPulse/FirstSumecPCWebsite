const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "index.html"
});

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'out'),
		filename: 'main.js',
		publicPath: '/',
	},
	devServer: {
  		historyApiFallback: true,
		port: 80,
		proxy: {
			'/api': 'http://localhost:81',
		},
  	},
	resolve: {
				roots: [path.resolve('./src')]
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
			}
		]
	},
	plugins: [htmlPlugin]
};
