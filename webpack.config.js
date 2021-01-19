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
    let dev_mode = env.development || false;
    let build_path = dev_mode ? development_path : production_path;
    
    return {
        mode: dev_mode ? 'development' : 'production',
        devtool: 'inline-source-map',
        
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
                filename: './webpack-stats.json'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
        ],
        
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },
        
        output: {
            filename: '[name].bundle.js',
            path: build_path.dest,
            publicPath: build_path.pub
        }
    }
}
