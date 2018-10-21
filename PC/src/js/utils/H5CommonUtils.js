/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

import $ from 'zepto';

export const H5CommonUtils = {

	getURL(url, target = '_blank') {
		top.window.open(url, target);
	},

	sharePage(getters, { noncestr, signature, timestamp }) {
		wx.config({
			debug: process.env.NODE_ENV != 'production', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: 'wx87370e05e9d51a3c', // 必填，企业号的唯一标识，此处填写企业号corpid
			timestamp: timestamp, // 必填，生成签名的时间戳
			nonceStr: noncestr, // 必填，生成签名的随机串
			signature: signature,// 必填，签名，见附录1
			jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		window.wx && wx.ready(function () {
			// let wxFriendData = {
			//     'link': '',//填写页面地址，缺省取当前页面URL
			//     'imgUrl': getters.icon,//填写页面分享LOGO图片
			//     'title': getters.title,//填写分享标题，缺省取页面title
			//     'desc': getters.desc,//填写分享摘要，缺省取页面desc
			//     'success': function () {
			//     }
			// };
			// let wxTimelineData = {
			//     'link': '',//填写页面地址，缺省取当前页面URL
			//     'imgUrl': getters.icon,//填写页面分享LOGO图片
			//     'title': getters.title,//填写分享标题，缺省取页面title
			//     'desc': getters.desc,//填写分享摘要，缺省取页面desc
			//     'success': function () {
			//     }
			// };
			wx.onMenuShareAppMessage(getters);
			wx.onMenuShareTimeline(getters);
		});
	},


	/**
	 * 无刷新表单提交
	 * @url  提交地址
	 * @data 提交的数据对象
	 */
	formsubmit(url, data, cb) {
		if (!url) return;
		let frameId = 'shareIframe',
			$body = $('body');
		let iframe = $('<iframe name="[IFRAME]" id="[IFRAME]" style="display:none; height:0; width:0;" height="0" width="0"></iframe>'.replace(/\[IFRAME\]/g, frameId));
		$body.append(iframe);
		let formArr = [
			'<form id="form_share" name="form_share" action="[URL]" method="post" target="[IFRAME]">',
			'</form>'
		]
		if (data) {
			for (var i in data) {
				formArr.splice(1, 0, '<input type="hidden" name="' + i + '" id="' + i + '" value="' + data[i] + '">');
			}
		}
		formArr = formArr.join('').replace(/\[URL\]/g, url).replace(/\[IFRAME\]/g, frameId);
		let from = $(formArr);
		$body.append(from);
		from[0].submit();
		setTimeout(() => {
			iframe.remove();
			from.remove();
			cb();
		}, 2000);
	},

	getHost(url) {
		var host = "null";
		if (typeof url == "undefined"
			|| null == url)
			url = window.location.href;
		var regex = /.*\:\/\/([^\/|:]*).*/;
		var match = url.match(regex);
		if (typeof match != "undefined"
			&& null != match) {
			host = match[1];
		}
		if (typeof host != "undefined"
			&& null != host) {
			var strAry = host.split(".");
			if (strAry.length > 1) {
				host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
			}
		}
		return host;
	},

	getQueryString(name) {
		let r, reg = new RegExp("(^|\\?|&|#)" + name + "=([^&#]*)(&|#|$)", "i");
		try {
			r = top.location.href.match(reg);
		} catch (e) {
			r = window.location.href.match(reg);
		}
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	},

	/**
	 *  函数节流阀
	 *  @cb   	回调函数
	 *  @scope	作用域
	 *  @wait 	延迟时间|毫秒
	 */
	throttle(cb, wait, scope) {
		let last, timer;
		scope || (scope = this);
		wait || (wait = 0.5 * 1000);
		return function () {
			let args = arguments,
				now = +new Date();
			if (last && now < last + wait) {
				clearTimeout(timer);
				timer = setTimeout(function () {
					last = now;
					cb.apply(scope, args);
				}, wait);
			} else {
				last = now;
				cb.apply(scope, args);
			}
		}
	},

	//函数扩展参数
	delegate(f, rest) {
		return function (e) { f.apply(null, [e].concat(rest)); };
	},

	/**
	 * 日期格式化
	 * @param {*} date 
	 * @param {*} format 
	 */
	formatDate(date, format = "YYYY年MM月DD日 hh时mm分ss秒") {
		try {
			date || (date = new Date());
			let prefixInteger = (num, length) => {
				return (num / Math.pow(10, length)).toFixed(length).substr(2);
			}
			let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
			return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, (a) => {
				switch (a) {
					case "YYYY": return date.getFullYear().toString();
					case "YY": return (date.getFullYear() + "").slice(2);
					case "MM": return prefixInteger(date.getMonth() + 1, 2);
					case "DD": return prefixInteger(date.getDate(), 2);
					case "hh": return prefixInteger(date.getHours(), 2);
					case "mm": return prefixInteger(date.getMinutes(), 2);
					case "ss": return prefixInteger(date.getSeconds(), 2);
					case "星期": return "星期" + week[date.getDay() + 7];
					case "周": return "周" + week[date.getDay() + 7];
					case "week": return week[date.getDay()];
					case "www": return week[date.getDay()].slice(0, 3);
					default: return "00";
				}
			});
		} catch (e) {
			return "00";
		}
		return "00";
	},

	/**
	 *	时间戳格式化
	 *	@millisecond	时间
	 *	@isTimestamp    是否为时间戳
	 *	@digit			时间显示到秒位 || 分位
	 */
	timeFormat(millisecond, isTimestamp, digit) {
		millisecond = Math.round(millisecond);
		if ((millisecond + '').length == 10) millisecond = millisecond * 1000;
		if (millisecond != 0) {
			let date = new Date(millisecond);
			let hou = isTimestamp ? date.getHours() : Math.floor(millisecond / 3600);
			let min = isTimestamp ? date.getMinutes() : Math.floor(millisecond % 3600 / 60);
			let sec = isTimestamp ? date.getSeconds() : Math.floor(millisecond % 3600 % 60);
			let int2str = function (num) {
				return (num < 10 ? '0' : '') + num;
			}
			let arr = [int2str(min), int2str(sec)];
			if (!isTimestamp) {
				if (hou > 0 || digit) arr.unshift(int2str(hou));
			} else arr = [int2str(hou), int2str(min), int2str(sec)];
			return arr.join(':');
		}
		return digit ? '00:00:00' : '00:00';
	},

	//queryString串转为object对象
	queryToObject(str) {
		let o = {};
		if (!str || str === '') return o;
		try {
			let list = str.split('&'), i = 0, item;
			while (list[i]) {
				item = list[i].split('=');
				o[item[0]] = decodeURIComponent(item[1]);
				i++;
			}
		} catch (e) { };
		return o;
	},

	//cookie的存储、读取
	cookie() {
		return {
			setItem: function (name, value, expires) {
				let text = encodeURIComponent(value), MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000;
				if (typeof expires === 'number') {
					let date = new Date();
					date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
					if (expires) {
						text += '; expires=' + date.toUTCString();
					}
				}
				document.cookie = name + '=' + text;
			},
			getItem: function (name) {
				let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
				if (arr !== null) {
					return decodeURIComponent(arr[2]);
				}
				return null;
			},
			removeItem: function (name) {
				let date = new Date();
				date.setTime(date.getTime() - 10000);
				document.cookie = name + "=a; expires=" + date.toGMTString();
			}
		}
	},

	//判断是否是在微信浏览器中
	is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},

	//js获取昨天、今天、明天的时间
	GetDateStr(AddDayCount) {
		let dateStr;
		let dd = new Date();
		dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
		let y = dd.getFullYear();
		let m = dd.getMonth() + 1; //获取当前月份的日期
		let d = dd.getDate();
		m = m > 9 ? m : "0" + m;
		d = d > 9 ? d : "0" + d;

		if (AddDayCount == 1) {
			dateStr = "明天-" + y + m + d;
		} else if (AddDayCount == 0) {
			dateStr = "今天-" + y + m + d;
		} else if (AddDayCount == -1) {
			dateStr = "昨天-" + y + m + d;
		} else {
			dateStr = m + "月" + d + "日" + "-" + y + m + d;
		}
		return dateStr;
	},

	// 显示回到顶部按钮
	btnIsShow(ele) {
		var clientHeight = document.documentElement.clientHeight;
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (osTop > clientHeight) {
			ele.style.display = "block";
		} else {
			ele.style.display = "none";
		}
	},
	goTop() {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		//  clearInterval(timer);
		//  timer = setInterval(function () {
		//      var osTop = document.documentElement.scrollTop || document.body.scrollTop;

		//         var spd = Math.floor((-osTop) / 20);

		//         document.documentElement.scrollTop = osTop + spd;
		//         document.body.scrollTop = osTop + spd;

		//      if (osTop == 0) {
		//          clearInterval(timer);
		//      }
		//  }, 30);
	},

	/*
	 ** 时间戳显示为多少分钟前，多少天前的处理
	 ** eg.
	 ** console.log(dateDiff(1535430540000)); // 2018-08-28 12:29:00
	 ** console.log(dateDiff(1511843340000)); // 9月前
	 ** console.log(dateDiff(1530160140000)); // 2月前
	 ** console.log(dateDiff(1503211111111));  // 3周前
	 ** console.log(dateDiff(1505283100802));  // 1分钟前
	 */
	dateDiff(timestamp) {
		// 补全为13位
		var arrTimestamp = (timestamp + '').split('');
		for (var start = 0; start < 13; start++) {
			if (!arrTimestamp[start]) {
				arrTimestamp[start] = '0';
			}
		}
		timestamp = arrTimestamp.join('') * 1;
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - timestamp;

		// 如果本地时间反而小于变量时间
		if (diffValue < 0) {
			return '不久前';
		}

		// 计算差异时间的量级
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;

		// 数值补0方法
		var zero = function (value) {
			if (value < 10) {
				return '0' + value;
			}
			return value;
		};

		// 使用
		if (monthC > 12) {
			// 超过1年，直接显示年月日
			return (function () {
				var date = new Date(timestamp);
				return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
			})();
		} else if (monthC >= 1) {
			return parseInt(monthC) + "月前";
		} else if (weekC >= 1) {
			return parseInt(weekC) + "周前";
		} else if (dayC >= 1) {
			return parseInt(dayC) + "天前";
		} else if (hourC >= 1) {
			return parseInt(hourC) + "小时前";
		} else if (minC >= 1) {
			return parseInt(minC) + "分钟前";
		}
		return '刚刚';
	},

	//获取当前时间(20180718112600)
	getNowFormatDate() {
		var date = new Date();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + month + strDate + date.getHours() + date.getMinutes() + date.getSeconds();
		return currentdate;
	},
	/**
	 * @desc 检查浏览器是否支持webp
	 */
	checkWebp() {
		try {
			return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
		} catch (err) {
			return false;
		}
	},
	fitWebpData(pics) {
		this.webpStatus == undefined && (this.webpStatus = this.checkWebp());
		const regex = /.webp$/;
		if (!this.webpStatus) { // 不支持webp的情况  处理掉不支持webp的数据
			for (let i in pics) {
				if (regex.test(pics[i])) {
					delete pics[i];
				}
			}
		}
		return pics;
	},
	/**
	 * 图片数据取最合适的数据
	 * @param {Object} pics 图片对象
	 * @param {String} direction 图片方向  默认横向：row   纵向：colum
	 */
	getResolvePic(pics = {}, direction = 'row') {
		let resolvePic;
		this.fitWebpData(pics);
		if (direction == 'row') { //横向图片处理  顺序：低分横  高分横  低分竖  高分竖
			resolvePic = pics.lowResolutionH || pics.highResolutionH || pics.lowResolutionV || pics.highResolutionV;
		} else { //竖向图片处理  顺序：低分竖  高分竖  低分横  高分横
			resolvePic = pics.lowResolutionV || pics.highResolutionV || pics.lowResolutionH || pics.highResolutionH;
		}
		// console.log(resolvePic);
		return resolvePic;
	},
	/**
	 * 处理h5pics与pics的合并
	 */
	getFitPics({ h5pics = {}, pics = {} } = {}) {
		this.fitWebpData(h5pics);
		this.fitWebpData(pics);
		return Object.assign(pics, h5pics);
	}
}
