var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: true,
    __BASEURL__: "'http://localhost:3000'"
})

module.exports = {
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: './public/'
    },
    watch: true,
//  resolve: {
//      alias: {
//          'vue$': 'vue/dist/vue.esm.js'
//      }
//  },
    plugins: [
        definePlugin,
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
            hash: false
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3001,
            server: {
                baseDir: ['./']
            }
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
    }
}
