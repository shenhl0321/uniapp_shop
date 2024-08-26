import deepMerge from "../utils/deepMerge";
import validate from "../utils/test";
class Request {
	// 设置全局默认配置
	setConfig(customConfig) {
		// 深度合并对象，否则会造成对象深层属性丢失
		this.config = deepMerge(this.config, customConfig);
	}

	// 主要请求部分
	async request(options = {}) {
		// 检查请求拦截
		if (this.interceptor.request && typeof this.interceptor.request === 'function') {
			let tmpConfig = {};
			let requestState,interceptorRequest
			[requestState, interceptorRequest] = await this.interceptor.request(options);
			if (requestState === 0) {
				// 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
				this.options = interceptorRequest;
				
			}else if(requestState === 1) {
				return Promise.resolve({
					status: 1,
					message: '购买产品请前往微信公众号 "彩味塔"'
				})
			}else if(requestState === 2) {}
		}
		options.dataType = options.dataType || this.config.dataType;
		options.responseType = options.responseType || this.config.responseType;
		options.url = options.url || '';
		options.params = options.params || {};
		options.header = Object.assign(this.config.header, options.header);
		options.method = options.method || this.config.method;

		return new Promise((resolve, reject) => {
			options.complete = (response) => {
				// 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
				if (this.config.showLoading) {
					uni.hideLoading();
					// 清除定时器，如果请求回来了，就无需loading
					clearTimeout(this.config.timer);
					this.config.timer = null;
				}
				// 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
				if (this.config.originalData) {
					// 判断是否存在拦截器
					if (this.interceptor.response && typeof this.interceptor.response === 'function') {
						let resInterceptors = this.interceptor.response(response);
						// 如果拦截器不返回false，就将拦截器返回的内容给this.$request.post的then回调
						if (resInterceptors !== false) {
							resolve(resInterceptors);
						} else {
							// 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
							reject(response);
						}
					} else {
						// 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
						resolve(response);
					}
				} else {
					if (response.statusCode == 200) {
						if (this.interceptor.response && typeof this.interceptor.response ===
							'function') {
							let resInterceptors = this.interceptor.response(response.data);
							if (resInterceptors !== false) {
								resolve(resInterceptors);
							} else {
								reject(response.data);
							}
						} else {
							// 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
							resolve(response.data);
						}
					} else {
						// 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
						// if(response.errMsg) {
						// 	uni.showModal({
						// 		title: response.errMsg
						// 	});
						// }
						reject(response)
					}
				}
			}

			// 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了$request的test.js验证库的url()方法
			options.url = validate.url(options.url) ? options.url : (this.config.baseUrl + (options.url
				.indexOf('/') == 0 ?
				options.url : '/' + options.url));

			// 是否显示loading
			// 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
			// 而没有清除前者的定时器，导致前者超时，一直显示loading
			if (this.config.showLoading && !this.config.timer) {
				this.config.timer = setTimeout(() => {
					uni.showLoading({
						title: this.config.loadingText,
						mask: this.config.loadingMask
					})
					this.config.timer = null;
				}, this.config.loadingTime);
			}

			uni.request(options);
		})
		// .catch(res => {
		// 	// 如果返回reject()，不让其进入this.$request.post().then().catch()后面的catct()
		// 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
		// 	return new Promise(()=>{});
		// })
	}

	constructor() {
		this.config = {
			baseUrl: 'http://47.102.157.175:28025', // 请求的根域名
			// 默认的请求头
			header: {},
			method: 'POST',
			// 设置为json，返回后uni.request会对数据进行一次JSON.parse
			dataType: 'json',
			// 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
			responseType: 'text',
			showLoading: true, // 是否显示请求中的loading
			loadingText: '加载中...',
			loadingTime: 500, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
			timer: null, // 定时器
			originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
			loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		}

		// 拦截器
		this.interceptor = {
			// 请求前的拦截
			request: null,
			// 请求后的拦截
			response: null
		}

		// get请求
		this.get = (url, data = {}, header = {}) => {
			return this.request({
				method: 'GET',
				url,
				header,
				data
			})
		}

		// post请求
		this.post = (url, data = {}, header = {}) => {
			return this.request({
				url,
				method: 'POST',
				header,
				data
			})
		}

		// put请求，不支持支付宝小程序(HX2.6.15)
		this.put = (url, data = {}, header = {}) => {
			return this.request({
				url,
				method: 'PUT',
				header,
				data
			})
		}

		// delete请求，不支持支付宝和头条小程序(HX2.6.15)
		this.delete = (url, data = {}, header = {}) => {
			return this.request({
				url,
				method: 'DELETE',
				header,
				data
			})
		}
		
		//更新用户信息
		this.updateUserInfo = (userInfo, vm) =>{
			userInfo.pic = userInfo.avatarUrl
			vm.$store.commit('updateUserInfo', userInfo)
			this.put("/p/user/setUserInfo", userInfo).then(() =>{
				console.log(userInfo)
			})
		}
		
		//#ifdef MP-WEIXIN || MP-TOUTIAO
		this.login = () => {
			return (new Promise((resolve, reject) => {
				uni.login({
					success: res => {
						resolve(res)
					},
					failed: err => {
						reject(err)
					}
				})
			})).then(res => {
				let code = res.code
				return this.request({
					url: '/login?grant_type=mini_app',
					data: {
						principal: res.code,
						credentials: res.anonymousCode
					}
				}).then((res) => {
					console.log(res)
					if (res.userStatus == 0) {
						uni.showModal({
							showCancel: false,
							title: '提示',
							content: '您已被禁用，不能购买，请联系客服'
						})
						uni.setStorageSync('token', res.access_token)
					} else {
						uni.setStorageSync('token', 'bearer' + res.access_token)
					}
					return res
				})
			})
		}
		//#endif

		//#ifdef H5
		this.login = (code, ifRefresh) => {
		// 	uni.setStorageSync('token', 'bearer81a5867a-dc3c-42a7-be41-d5eb57d6d57f')
			if (code !== 'H5-outSide') {   //当code值等于 'H5-outSide' 表示当前登录行为是在外部浏览器发生
				return this.request({
					url: '/login?grant_type=mini_app',
					data: !ifRefresh ? {
						principal: code,
						loginType: 'H5'
					} : {
						loginType: 'H5',
						credentials: code
					}
				}).then(res => {
					uni.setStorageSync('token', 'bearer' + res.access_token)
					// 如果用户操作为 重新登陆，则将新的code值写入内存，用以判断下一次获取到code时时候需要重新登陆
					if (!ifRefresh) {
						uni.setStorage({
							key: 'loginCode',
							data: code,
							success() {
							}
						})
					}
					return res
				})
			} else if(code == 'H5-outSide'){
				return this.request({
					url: '/login?grant_type=mini_app',
					// method: 'get',
					data: {
						loginType: 'H5-outside'
					}
				}).then(res =>{
					uni.setStorageSync('token', 'bearer' + res.access_token)
					return res
				})
			}
		
		}
		//#endif
	}
}
export default new Request
