/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import pkg from './package.json';
import UglifyJsParallelPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import HappyPack from 'happypack';

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const manifest = './dll/manifest.json';

export function version() {
    let _ver = fs.readFileSync('./version.h', 'utf-8');
    _ver = _ver.replace(/[\r\n]/g, '');
    return _ver;
}

export function getDir(dir) {
    return path.resolve(__dirname, dir);
}

export function banner() {
    return new webpack.BannerPlugin({
        banner: [
            '/**',
            '\n * ...',
            '\n * @author ' + pkg.author,
            '\n * ' + new Date(),
            '\n */',
            '\n'
        ].join(''),
        raw: true,
        entryOnly: true
    });
}

export function uglify() {
    return new UglifyJsParallelPlugin({
        uglifyOptions: {
            ecma: 8,
            mangle: true,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        },
        sourceMap: false,
        cache: true,
        parallel: os.cpus().length * 2
    });
}

export function define() {
    return new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    });
}

export function dll() {
    return new webpack.DllPlugin({
        path: getDir(manifest),
        name: '[name]',
        context: __dirname
    });
}

function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool
    });
}

let basecfg = {
    devtool: process.env.NODE_ENV == 'production' ? false : 'source-map',
    output: {
        path: getDir(
            process.env.NODE_ENV == 'production' ? './prd/' + version() + '/dist' : './dist'
        ),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.less', '.css', '.json', '.jsx', '.vue', '.ts'],
        alias: {
            store: getDir('./src/js/store'),
            utils: getDir('./src/js/utils'),
            views: getDir('./src/js/views'),
            api: getDir('./src/js/api'),
            components: getDir('./src/js/components'),
            assets: getDir('./src/assets/'),
            js : getDir('./src/js'),
            css: getDir('./src/css'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'url-loader?limit=8192&publicPath=../&name=assets/img/[name].[ext]'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    postcss: {
                        config: {
                            path: path.resolve('./postcss.config')
                        }
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/style-[name].css',
            allChunks: true
        }),
        createHappyPlugin('happybabel', ['cache-loader', 'babel-loader']),
        banner()
    ]
};

export function base() {
    if (fs.existsSync(manifest)) {
        basecfg.plugins.unshift(
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(manifest)
            })
        );
    }
    return basecfg;
}
