<script>
	export default {
		onLaunch() {
			this.$store.commit('shop/updateShopId', 1)
			uni.onTabBarMidButtonTap(() => {
				uni.navigateTo({
					url: '/pages/member/member-code',
				})
			})


			const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate)
				// console.log(res)
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '校验是否存在新版本，结果为' + res.hasUpdate,
				// 	duration: 3000
				// })
			})
			updateManager.onUpdateReady(function() {
				wx.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate()
						}
					}
				})
			})

			//#ifdef H5
			let res
			//H5环境中，判断是否为微信内部环境，
			let _ua = navigator ? navigator.userAgent.toLowerCase() : ''
			if (_ua.match(/MicroMessenger/i) == "micromessenger") {
				// if (false) {
				//当前环境为微信环境
				this.$store.commit('updateIfOutSide', false)
				let loginState = this.$route.query.state || false //登陆状态  login:从公众号入口进入并登陆 refresh:刷新页面
				let loginMsg = this.$route.query.code || false
				//判断内存中存入的code值是否等于当前code，如果相等，则表示当前操作为刷新页面，不需要重新登陆，否则为登陆操作
				if (loginState == 'login' && uni.getStorageSync('loginCode') !== loginMsg) {
					res = this.$request.login(loginMsg, false)
				} else {
					loginMsg = uni.getStorageSync('token')
					res = this.$request.login(loginMsg, true)
					uni.reLaunch({
						url: '/pages/home/home'
					})
				}
			} else {
				// 当前环境为外部浏览器环境
				this.$store.commit('updateIfOutSide', true)
				res = this.$request.login('H5-outSide')
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}
			//#endif
			//#ifdef MP-WEIXIN
			let res = this.$request.login()
			//#endif
			// #ifdef MP-TOUTIAO
			let res = this.$request.login()
			// #endif
			res.then((res) => {
				if (res) {
					this.$store.commit('updateIfLogin', true)
					this.$store.commit('updateUserInfo', res)
				}
			})
			uni.getSystemInfo({ //获取设备信息
				success: result => {
					this.globalData.customBar = 44
					this.globalData.statusBarHeight = result.statusBarHeight
					this.globalData.betweenHeight = 44
					this.globalData.gobackBtnHeight = 32
					this.globalData.windowWidth = result.windowWidth
				},
				fail: () => {},
				complete: () => {}
			})
		},
		globalData: {
			// 定义全局请求队列
			requestQueue: [],
			// 是否正在进行登陆
			isLanding: false,
			// 购物车商品数量
			totalCartCount: 0,
			//shopId
			shopId: 1
		},
		methods: {}
	};
</script>
<style>
	.container {
		height: 100%;
		box-sizing: border-box;
		color: #333;
		font-family: helvetica, 'Heiti SC', PingFangSC-Light;
	}

	.price {
		font-family: Arial;
		display: inline-block;
		color: #D81E06;
		padding-left: 10rpx;
	}

	/* 价格数字显示不同大小 */

	.symbol {
		font-size: 24rpx;
	}

	.big-num {
		font-size: 32rpx;
	}

	.small-num {
		font-size: 24rpx;
	}
</style>