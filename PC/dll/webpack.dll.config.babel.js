/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { getDir, dll, define, uglify, banner, version } from '../webpack.config.base';

let content = '';
let main = '';
// let dir = '';
// let zepto_js = './dll/zepto.js';
let readFile = (src) => {
    fs.readdirSync(src).forEach((file)=>{
        let _path = [src, file].join('/');
        let info = fs.statSync(_path);
        if (info.isDirectory()) {
            readFile(_path);
        } else {
            if (_path.includes('zepto.js')) {
                main = fs.readFileSync(_path).toString();
            } else {
                content += '\n\n//     This is ths plugin ******************** '+ file + ' ********************\n' + fs.readFileSync(_path).toString();
            }
        }
    });
}

let vendors = ["vue","axios","vue-router","vuex"];

let config = {
    entry: {
        mgvendor: vendors
    },
    output: {
        path: getDir(process.env.NODE_ENV == 'production'?'./prd/'+version()+'/dist':'./dist'),
        filename: '[name].js',
        library: '[name]'
    },
    module: {
        rules: []
    },
    plugins: [
        dll(),
        banner()
    ]
}

export default () => {
    // readFile(dir);
    let umd = [
        '(function(global, factory) {',
        '    if(typeof module === "object" && module.exports){',
        '      module.exports = factory(global);',
        '    } else if (typeof define === "function" && define.amd) {',
        '      define(function() { return factory(global) });',
        '    } else factory(global);',
        '}(typeof window !== "undefined" ? window : this, function(window) {',
                main + '\n' + content,
        '    return Zepto',
        '}))'
    ].join('\r\n');
    // fs.writeFileSync(zepto_js, umd);
    //
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
