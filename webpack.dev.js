/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	devtool: 'cheap-module-eval-source-map',
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ],
			},
			{
				test: /\.(svg|jpg|png|gif|jpeg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
	},
});
