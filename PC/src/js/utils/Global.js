/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';
let vConsole;
import { H5CommonUtils } from './H5CommonUtils';
export default class Global {
    static isSingleton = false;
    static instance;

    constructor() {
        if (!Global.isSingleton) {
            throw new Error('只能用 getInstance() 来获取实例...');
        }
    }

    static getInstance() {
        if (!Global.instance) {
            Global.isSingleton = true;
            Global.instance = new Global();
            Global.isSingleton = false;
        }
        return Global.instance;
    }

    static m_log = '';
    static debug(...rest) {
        let args = [].slice.call(arguments),
            getLocalTime = function(time) {
                return new Date(parseInt(time))
                    .toLocaleString()
                    .replace(/年|月/g, '-')
                    .replace(/日/g, ' ');
            },
            mix = function(obj) {
                var str = '',
                    sign;
                for (var i in obj) {
                    try {
                        if (typeof obj[i] == 'object') {
                            sign = (obj[i].length != undefined ? '[,]' : '{,}').split(',');
                            str += '"' + i + '":' + sign[0] + mix(obj[i]) + sign[1] + ',\r';
                        } else {
                            str += '"' + i + '":' + obj[i] + ',';
                        }
                    } catch (e) {
                        continue;
                    }
                }
                return str;
            },
            trace = function(arr) {
                var str = '',
                    obj;
                for (var i in arr) {
                    if (typeof arr[i] == 'object') {
                        obj = arr[i];
                    } else {
                        str += arr[i];
                    }
                }
                str = getLocalTime(new Date().valueOf()) + '  ===>>>  ' + str;
                if (obj) str += mix(obj);
                return str;
            },
            $log;
        $log = trace(args);
        Global.m_log += $log + '***日志分割***\r\n';
        if (H5CommonUtils.getQueryString('m') == 'debug') {
            if (!vConsole) {
                vConsole = new (require('vconsole'))();
            }
            console.log($log);
        }
    }
}
