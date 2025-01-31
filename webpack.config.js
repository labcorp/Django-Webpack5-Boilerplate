const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker= require('webpack-bundle-tracker');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Path definitions
const entrypoints = {
    main: {
        import: './_front/js/main.js',
        dependOn: 'vendors'
    },
    vendors: './_front/js/vendors.js'
}

const production_path = {
    dest: path.resolve(__dirname, '_static/dist'),
    pub: '/static/dist/'
}

const development_path = {
    dest: path.resolve(__dirname, '_static/src'),
    pub: '/static/src/'
}

module.exports = env => {
    console.log(env.development)
    let dev_mode = env.development || false;
    let build_path = dev_mode ? development_path : production_path;

    return {
        mode: dev_mode ? 'development' : 'production',
        devtool: dev_mode ? 'inline-source-map' : 'nosources-source-map',

        entry: entrypoints,

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new BundleTracker({
                path: __dirname,
                filename: 'webpack-stats.json'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new MiniCssExtractPlugin({
                filename: dev_mode ? '[name].css' : '[name].[contenthash].min.css',
            }),
        ],

        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },

        output: {
            clean: true,
            filename: dev_mode ? '[name].js' : '[name].[contenthash].min.js',
            path: build_path.dest,
            publicPath: build_path.pub
        }
    }
}
