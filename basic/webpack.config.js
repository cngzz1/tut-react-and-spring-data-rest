var path = require('path');

// webpack is a toolkit used to compile
// javascript components into a single loadable bundle
module.exports = {
    // app.js is equivalent to psvm. Webpack must know what to launch when
    // final bundle is loaded by browser
    entry: './src/main/js/app.js',
    // creates sourcemaps so when debugging js code in browser,
    // it links back to original source code
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    // compile all js bits into bundle.js
    // equivalent to spring boot uber jar
    // all custom code and modules pulled in by require() calls
    // are stuffed into this file.
    output: {
        path: __dirname,

        filename: './src/main/resources/static/built/bundle.js'
    },
    // babel is used to write javascript code using ES6
    // and compile it into ES5 to run in browser
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    }
};
// To see javascript change automatically, run
//npm run-script watch