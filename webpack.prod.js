/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].bundle.js',
		chunkFilename: '[name].[chunkhash].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ],
			},
			{
				test: /\.(svg|jpg|png|gif|jpeg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
						},
					},
				],
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
				},
			},
		},
		minimizer: [
			new MomentLocalesPlugin(),
			new OptimizeCssAssetsPlugin(),
			new UglifyJsPlugin({
				mangle: true,
				compress: {
					warnings: false,
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					screw_ie8: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true,
				},
				output: {
					comments: false,
				},
				exclude: [ /\.min\.js$/gi ],
			}),
			new HtmlWebpackPlugin({
				template: './src/template.html',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css',
		}),
		new CopyPlugin([ { from: 'src/_redirects', to: '' } ]),
		new CleanWebpackPlugin(),
	],
});
