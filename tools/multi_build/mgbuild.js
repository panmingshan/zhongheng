/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');

var projectObj = {
    /*'player' : {
        'path' : '/corporate/player',
        'desc' : 'HTML5播放器模块'
    },
    'msite' : {
        'path' : '/mobile/msite',
        'desc' : 'WAP站项目'
    },
    'user' : {
        'path' : '/website/common/user',
        'desc' : '登录注册模块'
    },
    'sta' : {
        'path' : '/website/common/analytics',
        'desc' : '运营统计模块'
    },
    'vendor' : {
        'path' : '/website/web/vendor',
        'desc' : 'WEB站公用库模块'
    },
    'header' : {
        'path' : '/website/web/common',
        'desc' : 'WEB站头部模块'
    },
    'main' : {
        'path' : '/website/web/main',
        'desc' : 'WEB站业务逻辑模块'
    }*/
}

var rel_path;
var dir = path.resolve(__dirname);
if (dir.split('static9\\').length == 1) {
    rel_path = './';
} else {
    var arr = [],
        len = dir.split('static9\\')[1].split('\\').length;
    for (var i=0;i<len;i++){
        arr[i] = '../';
    }
    rel_path = arr.join('');
}

var root = path.resolve(__dirname, rel_path),
    args = process.argv.splice(2),
    index = 0;
//npm = process.platform == "win32" ? "npm.cmd" : "npm";

var mgbuild = function() {
    try {
        var currPro = projectObj[args[index]];
        var curr_cp = cp.exec('npm run test', { cwd:path.join(root, currPro['path']) }, function(error, stdout, stderr){
            if (error) {
                console.log('exec error: ', error);
                return;
            }
            console.log(stdout);
            if(index < args.length - 1) {
                index++;
                build();
            }
        });
        curr_cp.on('exit',function(e){
            console.log(currPro['desc']+'构建开始 *******************');
        });
        curr_cp.on('close',function(e){
            console.log(currPro['desc']+'构建结束 ******************* \n');
        });

    } catch (error) {
        console.log('请传入正确的构建模块名，同时确认此模块的库依赖都已安装\n');
        console.log('目前支持的构建项目映射如下：\n');
        for(var item in projectObj) {
            console.log(item+' ———— '+projectObj[item]['desc']);
        }
    }
}

mgbuild();