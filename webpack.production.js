var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
})

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: './public/'
    },
    plugins: [
        definePlugin,
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true
            },
            hash: true
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
            { test: /\.vue$/, use: ['vue-loader'], include: path.join(__dirname, 'src') },
            { test: /\.css$/, use: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader'], include: path.join(__dirname, 'src') },
            { test: /\.scss$/, use: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], include: path.join(__dirname, 'src') }
        ]
    },
    optimization: {
        minimize: true
    }
}
