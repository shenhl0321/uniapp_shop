// #ifdef MP-WEIXIN
// let domain = "https://wx.xiaoerlangdang.com"; // 线上地址
var domain = "http://8.130.48.59:8026"  //本地地址
// #endif
// #ifdef H5
var domain = "http://8.130.48.59:8026/wxapi"  //本地地址
// let domain = "https://www.xiaoerlangdang.com"; // 线上地址
// #endif
// #ifdef MP-TOUTIAO
var domain = "http://8.130.48.59:8026/wxapi"  //本地地址
// #endif
// var domain = "http://192.168.10.4:8086"  //本地地址
let picDomain = 'http://8.130.48.59:8026';//图片域名

exports.domain = domain; // exports.picDomain = picDomain;

// 不需要token的请求，不需要经过请求拦截处理
exports.globalRequest = [
	'/login?grant_type=mini_app',    //登录接口
]

exports.forbiddenForTourist = [
	"/shopCart/changeItem"  ///p/shopCart/changeItem
]
