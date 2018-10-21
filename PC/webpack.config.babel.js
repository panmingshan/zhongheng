/**
 * ...
 * @author minliang1112@foxmail.com
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { base, define, uglify, banner, version } from './webpack.config.base';
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

let entryObj = {}, htmlArr = [], baseObj = base();
let getEntry = (dir) => {
    fs.readdirSync(dir).map((item) => {
        let _name = path.basename(item, path.extname(item));
        htmlArr.push(new HtmlWebpackPlugin({
            template: './src/template/template.js',
            filename: (process.env.NODE_ENV == 'production'?('../../../prd/'):'../dist/') + _name + '.html',
            chunks: [_name], //引入当前单页库
            root: 'app',
            common: [(process.env.NODE_ENV == 'production'?('./'+version()+'/dist/'):'./')+'mgvendor.js'], //引入公共库
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }));
        entryObj[_name] = dir + item;
    });
    baseObj.plugins = baseObj.plugins.concat(htmlArr);
}

export default () => {
    getEntry(
        "./src/js/views/"
    );
    let config = merge(base(), { entry : entryObj });
    if (process.env.NODE_ENV == 'production') {
        config = merge(config, {
            plugins: [
                define(),
                uglify(),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        discardComments: { removeAll: true },
                        autoprefixer: false
                    }
                }),
                config.plugins.pop()
            ]
        })
    }
    return config;
}
