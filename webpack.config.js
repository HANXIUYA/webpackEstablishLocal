// 自动化生成项目中的html页面，自动引入打包后的js，应用html-webpack-plugin 自动化插件
var htmlWebpackPlugin = require('html-webpack-plugin');

var path = require("path");
module.exports = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
        c: './src/script/c.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        // 定义打包后的文件名
        filename: 'js/[name]-[hash].js',
        // 打包以后要上线的地址
        // 打包后的html中引入的原先的绝对js地址，会替换为以线上地址开头的绝对地址
        publicPath: 'http://cdn.com/'
    },
    plugins: [
        // 对插件的初始化 webpack4 一定要设置mode

        // 单页面应用
        /*new htmlWebpackPlugin({
            filename: 'index-[hash].html',
            template: 'index.html',
            // 指定引入放在哪个标签内
            inject: false,
            // 传参
            title   : "webpack is good!",
            date: new Date(),
            // 上线时需要对打包后的html文件进行压缩
            minify: {
                // 去除注释
                removeComments: true,
                // 去除空格
                collapseWhitespace: true
            },
            hash: true
        }),*/

        // 多页面应用
        new htmlWebpackPlugin({
            filename: 'a.html',  // 相对于output.path,产出路径。
            template: 'index.html', // html模板,绝对路径
            // 指定<script>标签内容，放在哪个标签内
            inject: 'body',
            // 传参
            title   : "a.html",
            // chunks中可以存储只对你有用的参数，本次使用是用来区分页面显示
            chunks: ['main','a'],
            excludeChunks:['b','c']
        }),
        new htmlWebpackPlugin({
            filename: 'b.html',
            template: 'index.html',
            // 指定引入放在哪个标签内
            inject: 'body',
            // 传参
            title   : "b.html",
            chunks: ['b'],
            excludeChunks:['a','c']
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',
            template: 'index.html',
            // 指定引入放在哪个标签内
            inject: 'body',
            // 传参
            title   : "c.html",
            chunks: ['c'],
            excludeChunks:['a','b']
        })
    ],
    mode: 'development'
};