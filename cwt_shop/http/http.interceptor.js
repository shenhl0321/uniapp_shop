const RequestConfig = require("../config.js"); //统一的网络请求方法
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const stopAndWait = (Vue, vm) =>{
	return new Promise((resolve, reject) =>{
		if(vm.$store.state.ifLogin === true) {
			resolve(true)
		}else {
			setTimeout(() =>{
				resolve(stopAndWait(Vue, vm))
			}, 200)
		}
	})
}

const install = (Vue, vm) => {
	Vue.prototype.$request.http.setConfig({
		// #ifdef H5
// 		if(process.env.NODE_ENV === 'development'){
//     console.log('开发环境')
// }else{
//     console.log('生产环境')
// }
		// baseUrl: process.env.NODE_ENV === 'development'?RequestConfig.domain: RequestConfig.domain + '/api'
		baseUrl: RequestConfig.domain + '/api',
		// baseUrl: RequestConfig.domain,
		// #endif
		// #ifdef MP-WEIXIN
		baseUrl: RequestConfig.domain,
		// #endif
		// #ifdef MP-TOUTIAO
		// baseUrl: RequestConfig.domain,
		baseUrl: RequestConfig.domain,
		// #endif
		// baseUrl: process.env.NODE_ENV !== 'production'? '/api': RequestConfig.domain,		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$request.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true, 
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
	});
	
	// 请求拦截，配置Token等参数
	Vue.prototype.$request.http.interceptor.request = async (config) => {
		/* ===============当前采用方式四 来 获取token 并放进header头 ================ */
		
		// 方式一，存放在vuex的token，假设使用了$request封装的vuex方式，见：https://.$request.ui.com/components/globalVariable.html
		// config.header.token = vm.token;
		
		// 方式二，如果没有使用$request封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		
		//如果还未登陆，切当前请求api不是登录接口，则将当前请求储存在全部变量的请求队列里，待登录后再做处理		
		//如果全局请求中包含当前请求api，则不对其添加请求头
		
		//返回结果按照 [请求状态， 请求结果] 格式 构成
		//其中请求状态包括 
		//0： 请求成功
		//1： 表示当前请求属于被限制的请求
		//2: 拒绝的请求，...?
		if(RequestConfig.globalRequest.indexOf(config.url) === -1) {
			// 如果当前处于未登录状态,则无法获取到 token, 让请求在此阻塞一直等待到登录请求完毕。
			// 这种方式消耗较大，希望能找到别的解决方案
			await stopAndWait(Vue, vm)
			const Authorization = uni.getStorageSync('token');
			config.header.Authorization = Authorization;			
		}
		//判断游客禁止访问接口中是否存在当前请求接口
		// #ifdef H5
		let _ua = navigator.userAgent.toLowerCase()
		if(_ua.match(/MicroMessenger/i) === null && RequestConfig.forbiddenForTourist.indexOf(config.url) !== -1) {
			return [1, ]
		}
		// #endif
		return [0, config]; 
		// return false
	}
	// 响应拦截，判断状态码是否通过  /* === 暂时屏蔽 === */
	// Vue.prototype$requesthttp.interceptor.response = (res) => {
	// 	// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
	// 	// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
	// 	if(res.code == 200) {
	// 		// 如果把originalData设置为了true，这里return回什么，this$requestpost的then回调中就会得到什么
	// 		return res.data;  
	// 	} else return false;
	// }
}

export default {
	install
}