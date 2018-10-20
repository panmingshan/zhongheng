/**
 * ...
 * @author minliang1112@foxmail.com
 */

var fs = require('fs');
var path = require("path");  
var readline = require('readline');

var _src = './build',
    _file = "./dll.json";
var result = JSON.parse(fs.readFileSync(_file));

var args = process.argv.splice(2),
    _dir = args[2],
    isDll = true;

if (args[3]) {
    isDll = Boolean(Math.abs(Number(args[3])-2));
}

var Global = {
    //递归创建目录 同步方法  
    mkdirsSync(dirname) { 
        if (fs.existsSync(dirname)) {  
            return true;
        } else {  
            if (this.mkdirsSync(path.dirname(dirname))) {  
                fs.mkdirSync(dirname);  
                return true;  
            }  
        }  
    },

    // 对象的深度合并
    deepMerge : function (obj1, obj2) {
        var key;
        for(key in obj2) {
            if (obj1[key] && typeof obj1[key] == 'object') {
                if (obj1[key].length) {
                    obj1[key] = obj1[key].concat(obj2[key]);
                } else {
                    this.deepMerge(obj1[key], obj2[key])
                }
            } else obj1[key] = obj2[key];
        }
        return obj1;
    },

    // 删除目标文件夹或文件
    deleteFile : function(fileUrl) {
        var self = this;
        // 如果当前url不存在，则退出
        if (!fs.existsSync(fileUrl)) return;
        // 当前文件为文件夹时
        if (fs.statSync(fileUrl).isDirectory()) {
            var files = fs.readdirSync(fileUrl);
            var len = files.length,
                removeNumber = 0;
            if (len > 0) {
                files.forEach(function(file) {
                    removeNumber ++;
                    var stats = fs.statSync(fileUrl+'/'+file);
                    var url = fileUrl + '/' + file;
                    if (fs.statSync(url).isDirectory()) {
                        self.deleteFile(url);
                    } else {
                        fs.unlinkSync(url);
                    }
                })
                if (removeNumber === len) {
                    // 删除当前文件夹下的所有文件后，删除当前空文件夹（注：所有的都采用同步删除）
                    fs.rmdirSync(fileUrl);
                }
            } else {
                fs.rmdirSync(fileUrl)
            }
        } else {
            // 当前文件为文件时
            fs.unlinkSync(fileUrl);
        }
    }

}

var copyFile = function(src, dir) {
    fs.readdir(src, function(err, paths) {
        paths.forEach(function(url) {
            var _path = src + '/' + url,
                _dist = dir + '/' + url;
            fs.stat(_path, function(err, st) {
                var readable, writable;
                if (st.isFile()) {
                    readable = fs.createReadStream(_path);
                    writable = fs.createWriteStream(_dist);
                    readable.on('data', function(chunk) {
                        var data = chunk;
                        if (_path.indexOf('package') != -1) {// 修改package.json
                            data = JSON.parse(chunk.toString());
                            data.name = data.name.replace(/\[placeholder\]/g, args[0]);
                            Object.assign(data['dependencies'], result.package[args[0]]['dependencies']);
                            Object.assign(data['devDependencies'], result.package[args[0]]['devDependencies']);
                            if (!isDll) {
                                data.scripts = {
                                    "remove:pkg-lock": "rm -rf ./package-lock.json",
                                    "build:pro": "rm -rf ./dist/* && rm -rf ./prd/* && webpack --colors --profile --mode production",
                                    "mgbuild": "npm run remove:pkg-lock && cross-env NODE_ENV=production npm run build:pro",
                                    "build:dev": "webpack --colors --profile --mode development",
                                    "test": "npm run remove:pkg-lock && cross-env NODE_ENV=development && npm run build:dev",
                                    "watch": "npm run test -- -- -w"
                                }
                            }
                            writable.write(JSON.stringify(data, null, 4));
                        } else if (_path.indexOf('babelrc') != -1) {// 修改.babelrc
                            data = JSON.parse(chunk.toString());
                            Global.deepMerge(data, result.babelrc[args[0]]);
                            writable.write(JSON.stringify(data, null, 4));
                        }
                    });
                    var rl = readline.createInterface(readable, writable);
                    rl.on('line', function(line) {
                        if (_path.indexOf('webpack.base.config') != -1) {// 修改webpack.base.config.js
                            var import_placeholder = "",
                                plugins_placeholder = "",
                                module_placeholder = [', {',
                                                '            test:/\.(css|less)$/,',
                                                '            use:[MiniCssExtractPlugin.loader, "css-loader", "less-loader"]',
                                                '        }'];
                            if (args[0] == 'vue') {
                                import_placeholder = "import { VueLoaderPlugin } from 'vue-loader';";
                                module_placeholder = module_placeholder.concat([', {',
                                                                        '            test: /\.vue$/,',
                                                                        '            use: "vue-loader",',
                                                                        '            exclude: /node_modules/',
                                                                        '        }']);
                                plugins_placeholder = 'new VueLoaderPlugin(),';
                            }
                            if (args[0] == 'common') {
                                module_placeholder = module_placeholder.concat([', {',
                                                                        '            test: require.resolve("jquery"),',
                                                                        '            use: [{',
                                                                        '                loader: "expose-loader",',
                                                                        '                options: "jQuery"',
                                                                        '            }, {',
                                                                        '                loader: "expose-loader",',
                                                                        '                options: "$"',
                                                                        '            }]',
                                                                        '        }']);
                            }
                            line = line.replace(/\"import_placeholder\"\;/g, import_placeholder);
                            line = line.replace(/\,\"module_placeholder\"/g, module_placeholder.join('\r\n'));
                            line = line.replace(/\"plugins_placeholder\"\,/g, plugins_placeholder);
                            writable.write(line + '\r\n');
                        } else if (_path.indexOf('webpack.config.babel') != -1) {//修改 webpack.config.babel.js
                            line = line.replace(/placeholder/g, args[1]);
                            writable.write(line + '\r\n');
                        } else if (_path.indexOf('webpack.dll.config.babel') != -1) {//修改 ./dll/webpack.dll.config.babel.js
                            var dll_module_placeholder = "";
                            if (args[0] == 'common') {
                                dll_module_placeholder = ['{',
                                                        '            test: /.js$/,',
                                                        '            enforce: "post", // post-loader处理',
                                                        '            use: "es3ify-loader"',
                                                        '        }'].join('\r\n');
                            }
                            line = line.replace(/\"dll_module_placeholder\"/g, dll_module_placeholder);
                            line = line.replace(/\[\"placeholder\"\]/g, JSON.stringify(result.dll[args[0]]).toString());
                            writable.write(line + '\r\n');
                        } else if (_path.indexOf('template') != -1) {
                            writable.write(line + '\r\n');
                        } else if (_path.indexOf('gitignore') != -1) {
                            writable.write(line + '\r\n');
                        } else if (_path.indexOf('mgbuild.sh') != -1) {
                            writable.write(line + '\r\n');
                        } else if (_path.indexOf('rollback.sh') != -1) {
                            writable.write(line + '\r\n');
                        }
                    });
                } else if (st.isDirectory()) {
                    if (isDll) {
                        Global.deleteFile(_dist);
                        fs.mkdirSync(_dist);
                        copyFile(_path, _dist);
                    }
                }
            })
        })
    })
}

Global.deleteFile(_dir);
Global.mkdirsSync(_dir + args[1].split('.')[1]);
copyFile(_src, _dir);