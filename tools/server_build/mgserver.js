/**
 * ...
 * @author minliang1112@foxmail.com
 * 
 * fx : sudo node mgserver port ip project
 */

// import fs from 'fs';
// import path from 'path';
// import colors from 'colors';
// import express from 'express';
// import {
//     EventEmitter
// } from 'events';
// import proxy from "http-proxy-middleware";


var  fs  = require('fs');
var  path  = require('path');
var  colors  = require('colors');
var  express  = require('express');
var  EventEmitter  = require('events');
var  proxy  = require('proxy');

const mgs = express();
mgs.set('views', path.join(__dirname, 'views'));
mgs.set('view engine', 'ejs');

let args = process.argv.splice(2);
let port = args[0] || 8888;
let ip_address = args[1] || '127.0.0.1';
let project = args[2];

let _svjson = './server.json';
let pm = new Promise((resolve, reject) => {
    fs.exists(_svjson, (exists) => {
        if (exists) {
            resolve();
        } else {
            reject();
        }
    })
});

let setProxy = (express, proxyobj) => {
    try {
        if (Object.keys(proxyobj).length > 0) {
            var apiProxy = proxy(proxyobj.path, {
                target: proxyobj.target,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + proxyobj.path]: ''
                }
            });
            express.use(proxyobj.path + '/*', apiProxy);
        }
    } catch (error) {}
}

/********* 热更新 ********/
if (project) {
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackConfig = require(path.join('../../', project, 'webpack.config.babel.js'));

    var compiler = webpack(webpackConfig);
    mgs.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    mgs.use(webpackHotMiddleware(compiler));
}
/********* 热更新 ********/

pm.then(() => {
    var sv = require(_svjson);
    try {
        if (sv.proxy instanceof Array) {
            sv.proxy.forEach((proxyobj) => {
                setProxy(mgs, proxyobj)
            })
        } else {
            setProxy(mgs, sv.proxy);
        }
    } catch (error) {}
    mgs.use('*', (req, res) => {
        var hostName = req.hostname;
        var currItem = null;
        for (const item of sv.cfg) {
            if (item.host.indexOf(hostName) != -1) {
                currItem = item;
                break;
            }
        }
        if (currItem) {
            var baseUrl = decodeURIComponent(req.baseUrl);
            baseUrl = baseUrl.replace(new RegExp(currItem.reg), '');
            var fullPath = currItem.root + baseUrl;
            if (!fs.existsSync(fullPath)) {
                console.log('404:'.red, fullPath.yellow);
                res.status(404).end('404: Not Found');
                return;
            }
            var stat = fs.statSync(fullPath);
            if (stat.isFile()) {
                res.sendFile(path.join(currItem.root, baseUrl));
            } else if (stat.isDirectory()) {
                var list = fs.readdirSync(fullPath);
                list = list.map((file) => {
                    if (fs.statSync(path.join(fullPath, file)).isDirectory()) {
                        return file + '/';
                    }
                    return file;
                });
                res.render('directory.ejs', {
                    fileList: list,
                    host: hostName,
                    path: baseUrl
                });
            }
        } else {
            fs.readFile(path.join(__dirname, 'assets/error.png'), 'binary', (err, file) => {
                if (!err) {
                    res.writeHead(200, {
                        'Content-Type': 'image/png'
                    });
                    res.write(file, 'binary');
                    res.end();
                }
            });
        }
    });
    mgs.listen(port, ip_address, () => {
        console.log('咪咕-SERVER 服务启动成功，' + port + '端口！！');
    });
}).catch(() => {
    console.log('server.json配置文件未找到，咪咕-SERVER 启动失败！！\r\n');
    var tiplog = [
        '请建立 server.json 配置文件，内容范例如下：',
        '{',
        '   "cfg" : [{',
        '            "host": ["static.miguvideo.com"],          // 127.0.0.1假定的域名',
        '            "root": "/Users/doudou/mywork/",           // 本地服务根目录',
        '            "reg": "v_[0-9]{14}(_[0-9a-z]{8})*\/",     // 未来上线文件版本',
        '    }]',
        '    "proxy" : [{',
        '        "target" : "http://display.miguvideo.com",',
        '        "path" : "/api"',
        '    }]',
        '}'
    ].join('\r\n');
    console.log(tiplog);
})