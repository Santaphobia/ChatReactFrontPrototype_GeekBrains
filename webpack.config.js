const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './index.jsx',
    },
    context: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, "public", "build"),
        filename: 'app.js',
    },
    resolve: {
        modules: [`${__dirname}/src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['@babel/env', {
                        "exclude": ["transform-async-to-generator", "transform-regenerator"]
                    }],
                        '@babel/react'
                    ],
                    plugins: [
                        [
                            "@babel/plugin-proposal-class-properties",
                            {
                                "loose": true
                            }
                        ],
                        ["module:fast-async", { "spec": true }],
                    ],
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

};
