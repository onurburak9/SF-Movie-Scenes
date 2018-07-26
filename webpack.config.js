//process.env.NODE_ENV = 'production'
module.exports = {
	entry: ["babel-polyfill", "./src/index.js", "./style/sample.less"],
	output: {
		path: __dirname,
		publicPath: "/",
		filename: "bundle.js"
	},
	debug: true,
	devtool: "source-map",
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["react", "es2015", "stage-1"]
				}
			},
			{
				test: /\.less$/,
				loader: "style!css!less"
			}
		]
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: "./",
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	}
};
