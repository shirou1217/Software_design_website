const webpack = require('webpack'); 
 
module.exports = { 
    // The entry point file described above 
    entry: { 
        index: ["./src/index.js"],
    }, 
    // The location of the build folder described above 
    output: { 
        path: __dirname + "/public/compiled", 
        filename: '[name].js' 
    }, 
    resolve: { 
        extensions: [".js"] 
    }, 
    // modules needed 
    module: { 
        rules: [{ 
            test: /\.(js)$/, 
            loader: 'babel-loader', 
            exclude: /node_modules/, 
            options: { 
                presets: ['@babel/preset-react', '@babel/preset-env'] 
            }, 
        },{
            test: /\.s[ac]ss$/i,
            use: [
              // 将 JS 字符串生成为 style 节点
              'style-loader',
              // 将 CSS 转化成 CommonJS 模块
              'css-loader',
              // 将 Sass 编译成 CSS
              'sass-loader',
            ],
          },]
    }, 
    plugins: [ 
        // new webpack.HotModuleReplacementPlugin(), // automatically compile when files change 
        new webpack.ProvidePlugin({ // automatically import package 
            React: 'react', 
            ReactDOM: 'react-dom' 
        }) 
    ], 
    mode: 'development', 
    devServer: { 
        static: "./", 
        hot: true, 
        compress: true, 
        host: 'localhost', 
        port: 8080 
    }, 
};
