/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

import os from 'os';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { resolve, dll, define, uglify, banner, version } from '../webpack.base.config';

let vendors = ["placeholder"];

let config = {
    entry: {
        mgvendor: vendors
    },
    output: {
        path: resolve(process.env.NODE_ENV == 'production'? ('./prd/' + version() + '/dist') : './dist'),
        filename: '[name].js',
        library: '[name]'
    },
    module: {
        rules: ["dll_module_placeholder"]
    },
    plugins: [
        dll(),
        banner()
    ]
}

export default () => {
    if (process.env.NODE_ENV == 'production') {
        config = merge(config, {
            plugins: [
                define(),
                uglify(),
                config.plugins.pop()
            ]
        })
    }
    return config;
}