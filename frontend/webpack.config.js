const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "./index.html"
});

module.exports = {
	mode: 'development',
	devServer: {
  		historyApiFallback: true,
		port: 80,
		host: "127.0.0.1",
		proxy: {
			'/api': 'https://localhost:81',
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
