<template>
	<view @click="getUserInfo">
		<view class="page-head" :style="pageHeadHeight">
			<view class="statusbar" :style="statusBarHeight">
			</view>
			<view class="custom-navi">
				<view class="btn" @click="$goHome" v-if="enterFrom!=='click'">
					<!-- <image src="/static/images/icon/gohome.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon/gohome.png" mode="aspectFit"></image>
				</view>
				<view class="btn" @click="$goBack" v-else>
					<image src="/static/images/icon/goback.png" mode="aspectFit" style="border: none;"></image>
				</view>
				<view class="page-title">
					会员充值
				</view>
			</view>
			<view class="account">
				余额：￥
				<text>{{balance.toFixed(2)}}</text>
			</view>
			<view class="banner-card">
				<view class="banner-title">
					余额充值
				</view>
				<view class="amount-card">
					<view class="amount-item" :class="{choosen: choosenIndex == 1}" @click='chooseAmount(100, 1)'>
						<image v-if='choosenIndex == 1' src="/static/images/icon/amount-choosen.png" mode="aspectFit">
						</image>
						充值<text>100</text>元
					</view>
					<view class="amount-item" :class="{choosen: choosenIndex == 2}" @click='chooseAmount(200, 2)'>
						<image v-if='choosenIndex == 2' src="/static/images/icon/amount-choosen.png" mode="aspectFit">
						</image>
						充值<text>200</text>元
					</view>
					<view class="amount-item" :class="{choosen: choosenIndex == 3}" @click='chooseAmount(300, 3)'>
						<image v-if='choosenIndex == 3' src="/static/images/icon/amount-choosen.png" mode="aspectFit">
						</image>
						充值<text>300</text>元
					</view>
					<view class="amount-item" :class="{choosen: choosenIndex == 4}" @click='chooseAmount(500, 4)'>
						<image v-if='choosenIndex == 4' src="/static/images/icon/amount-choosen.png" mode="aspectFit">
						</image>
						充值<text>500</text>元
					</view>
					<view class="amount-item" :class="{choosen: choosenIndex == 5}" @click='chooseAmount(800, 5)'>
						<image v-if='choosenIndex == 5' src="/static/images/icon/amount-choosen.png" mode="aspectFit">
						</image>
						充值<text>800</text>元
					</view>
					<view class="amount-item" :class="{choosen: choosenIndex == 6}" @click='chooseAmount(1000, 6)'>
						<image v-if='choosenIndex == 6' src="/static/images/icon/amount-choosen.png" mode="aspectFit">
						</image>
						充值<text>1000</text>元
					</view>
				</view>
				<view v-if="userInfo.mobile" class="recharge-btn" @click="confirmCharge">
					立即充值
				</view>
				<button open-type="getPhoneNumber" v-if="!userInfo.mobile" class="recharge-btn" @getphonenumber="getPhoneNumber">
					立即充值
				</button>
			</view>
		</view>

		<view class="recharge-description">
			<view class="des-title">
				充值说明：
			</view>
			<view class="des-content">
				<view class="des-item">
					1. 充值后金额立即到账，账户余额可以在任意小象智慧门店门店使用购买产品。
				</view>
				<view class="des-item">
					2. 使用金额支付可以享受小象智慧门店会员每充值100元赠送10元现金优惠，该优惠不与其他优惠叠加使用，特价商品不参与优惠活动。
				</view>
				<view class="des-item">
					3. 本店保留对此预充值法律范围内的最终解释权。
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				choosenIndex: 1,
				chargeMaount: 100,
				shopId: 0,
				balance: 0,
				enterFrom: '',
			}
		},
		computed: {
			statusBarHeight() {
				let res = uni.getSystemInfoSync()
				let statusBarHeight = res.statusBarHeight
				console.log(`height: ${statusBarHeight}px;`)
				return `height: ${statusBarHeight}px`
			},
			pageHeadHeight() {
				let customBarHeight = this.$store.getters['sysInfo/customBarHeight']
				return `height: calc(${customBarHeight}px + 670rpx)`
			},
			userInfo() {
				// return {}
				console.log('getuserinfo running')
				return this.$store.state.userInfo
			},
			ifLogin() {
				return this.$store.state.ifLogin
			}
		},
		watch: {
			// ifLogin(newVal, oldVal) {
			// 	console.log('watch running')
			// 	if (newVal && !this.userInfo.mobile) {
			// 		uni.navigateTo({
			// 			url: '/pages/member/member-registe'
			// 		})
			// 	}
			// }
		},
		onLoad(options) {
			this.shopId = options.shopId
			this.enterFrom = options.from
			// this.shopId = 116
			// this.getUserInfo()
			this.loadData()
		},
		methods: {			
			getPhoneNumber(e) {
				console.log(e)
				let that = this;
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					this.$request.get("/p/user/getPhoneNumber", {
						encryptedData: e.detail.encryptedData, //加密数据
						iv: e.detail.iv //向量
					}).then((res) => {
						if (res != undefined && res != null) {
							this.$store.commit('updateUserInfo', {
								mobile: res
							})
							this.confirmCharge()
						}
					}, (rej) => {
						console.log(rej)
					})
				}else {
					this.$showToast('请授权手机号以便为您提供更好的服务')
				}
			},
			
			chooseAmount(amount, index) {
				this.choosenIndex = index
				this.chargeMaount = amount
			},

			confirmCharge() {
				// this.$showToast('充值成功', 'none', 1500)
				// return 
				let self = this
				this.$request.post('/api/depositMoney/Payment', {
					shopId: this.shopId,
					amount: this.chargeMaount
				}).then((res) => {
					let requestPayment = JSON.parse(res.data).miniPayRequest
					console.log(requestPayment)
					uni.requestPayment({
						timeStamp: requestPayment.timeStamp,
						nonceStr: requestPayment.nonceStr,
						package: requestPayment.package,
						signType: requestPayment.signType,
						paySign: requestPayment.paySign,
						success() {
							self.$showToast('充值成功', 'none', 1500)
							self.loadData()
							uni.navigateTo({
								url: '/pages/member/member-info?from=scanCode'
							})
						},
						fail(err) {	
							console.log(err)
							self.$showToast('支付失败')
							// self.$showToast('充值成功', 'none', 1500)
							// uni.navigateTo({
							// 	url: '/pages/member/member-info?from=scanCode'
							// })
						}
					})
				}, (rej) => {
					console.log(rej)
				})
			},

			loadData() {
				this.$request.post('/api/depositMoney/getUserAccount', ).then((res) => {
					if (res.resultCode == 200) {
						this.balance = res.data
					}
				}, (rej) => {
					console.log(rej)
				})
			},

			getUserInfo(res) {
				console.log(res)
				let self = this
				// #ifdef MP-WEIXIN
				if (this.userInfo.nickName) return
				wx.getUserProfile({
					desc: '信息将用于会员注册',
					success(res) {
						console.log(res)
						self.$request.updateUserInfo(res.userInfo, self)
					}
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	button {
		padding: 0;
		text-align: unset;
		line-height: unset;
		/* text-decoration: underline; */
		border-radius: unset;
		overflow: unset;
		background-color: unset;
		cursor: unset;
		&::after{
			border: none;
		}
	}

	.page-head {
		background-image: url(https://images.51xeld.com/2021/01/81944b78deb346e29f1f416befa54f4b.png);
		background-repeat: no-repeat;
		background-size: contain;
		background-position-y: -140rpx;
		width: 100%;
		height: 790rpx;

		.custom-navi {
			font-size: 36rpx;
			height: 44px;
			width: 100%;
			color: #FFFFFF;
			position: relative;
			text-align: center;
			line-height: 44px;

			image {
				height: 18px;
				width: 18px;
				position: absolute;
				padding: 10rpx;
				left: 30rpx;
				border: 1px solid #FFDBB5;
				top: 5px;
				border-radius: 50%;
			}
		}

		.account {
			color: #FFFFFF;
			padding-left: 50rpx;
			font-size: 32rpx;
			height: 70rpx;
			line-height: 70rpx;

			text {
				font-size: 50rpx;
			}
		}

		.banner-card {
			background-color: #FFFFFF;
			width: 94%;
			height: 600rpx;
			margin: 0 auto;
			border-radius: 20rpx;
			box-shadow: 0px 10px 20px 1px rgba(253, 176, 94, 0.26);
			position: relative;
			box-sizing: border-box;
			padding: 0 5%;
			color: #666666;

			.banner-title {
				height: 100rpx;
				line-height: 100rpx;
				color: #444444;
			}

			.amount-card {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.amount-item {
					width: 30%;
					height: 140rpx;
					position: relative;
					text-align: center;
					line-height: 140rpx;
					border: 1px solid #e1e1e1;
					border-radius: 12rpx;
					margin-bottom: 40rpx;

					image {
						position: absolute;
						height: 46rpx;
						width: 46rpx;
						right: 0;
						top: 0;
					}
				}

				.choosen {
					background: #FFFBF7;
					border: 1px solid #FFC382;
				}
			}

			.recharge-btn {
				height: 80rpx;
				width: 100%;
				border-radius: 50rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: #FCB05D;
				color: #FFFFFF;
			}
		}
	}

	.recharge-description {
		margin-top: 60rpx;
		font-size: 28rpx;
		color: #999999;
		width: 100%;
		box-sizing: border-box;
		padding: 0 5%;

		.des-title {
			margin-bottom: 20rpx;
		}

		.des-item {
			font-size: 24rpx;
			margin-bottom: 20rpx;
			line-height: 45rpx;
		}
	}
</style>
