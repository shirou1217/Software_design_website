const webpack = require('webpack'); 
 
module.exports = { 
    // The entry point file described above 
    entry: { 
        sign: "./public/pages/CHAT.js", 
        main: ["./public/pages/HOME.js"] 
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
        }] 
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
