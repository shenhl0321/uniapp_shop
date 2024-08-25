<template>
	<view>
		<view class="page-head">
			<view class="statusbar" :style="statusBarHeight">
			</view>
			<view class="custom-navi">
				<view class="btn" v-if="enterFrom=='scanCode'" @click="$goHome">
					<image src="/static/images/icon/gohome.png" mode="aspectFit"></image>
				</view>
				<view class="btn" v-else @click="$goBack">
					<image src="/static/images/icon/goback.png" mode="aspectFit" style="border: none;"></image>
				</view>
				<view class="page-title">
					会员中心
				</view>
			</view>
			<view class="banner-card">
				<view class="member-badge">
					<image src="/static/images/icon/crown.png" mode="aspectFit"></image>
					<text>普通会员</text>
				</view>
				<view class="top-card">
					<view class="head-pic">
						<image :src="userInfo.pic || '/static/images/icon/userhead.png'" mode="aspectFit"></image>
					</view>
					<text>{{userInfo.mobile || userInfo.nickName}}</text>
				</view>
				<view class="bottom-card">
					<view class="card-item">
						<view class="card-content">
							{{memberInfo.integral}}
						</view>
						<view class="card-title">
							积分
						</view>
					</view>
					<image src="/static/images/icon/border.png" mode="aspectFit"></image>
					<view class="card-item">
						<view class="card-content">
							{{memberInfo.couponSize}}
						</view>
						<view class="card-title">
							优惠券
						</view>
					</view>
					<image src="/static/images/icon/border.png" mode="aspectFit"></image>
					<view class="card-item">
						<view class="card-content">
							{{(memberInfo.userAccount).toFixed(1)}}
						</view>
						<view class="card-title">
							余额
						</view>
					</view>
				</view>
			</view>
		</view>

		<image style="width: 96%;
    margin: 12px 2%;
    border-radius: 16rpx;" src="https://images.51xeld.com/2021/06/f62d2ff766ed4e2abc75b2246c415f89.png" mode="widthFix"
			@click="$goThePage('/pages/member/advertisement')"></image>

		<view class="member-tools">
			<view class="tool" @click="$goThePage('/pages/member/member-code')">
				<image src="/static/images/icon/member-code.png" mode="aspectFit"></image>
				<text>会员码</text>
			</view>
			<view class="tool" @click="$goThePage('/pages/member/coupon-beforeWithdraw')">
				<image src="/static/images/icon/tickets.png" mode="aspectFit"></image>
				<text>优惠券</text>
			</view>
			<view class="tool" @click="$goThePage('/pages/member/recharge?from=click')">
				<image src="/static/images/icon/inchanrge.png" mode="aspectFit"></image>
				<text>会员充值</text>
			</view>
			<view class="tool" @click="$goThePage('/pages/member/integral')">
				<image src="/static/images/icon/exchange.png" mode="aspectFit"></image>
				<text>积分兑换</text>
			</view>
			<view class="tool" @click="$goThePage('/pages/member/member')">
				<image src="/static/images/icon/userinfo.png" mode="aspectFit"></image>
				<text>会员资料</text>
			</view>
			<view class="tool" @click="$goThePage('/pages/member/bills')">
				<image src="/static/images/icon/bills.png" mode="aspectFit"></image>
				<text>账单记录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memberInfo: {
					integral: 0,
					userAccount: 0,
					couponSize: 0,
				},
				enterFrom: ''
			};
		},
		computed: {
			statusBarHeight() {
				let res = uni.getSystemInfoSync()
				let statusBarHeight = res.statusBarHeight
				console.log(`height: ${statusBarHeight}px;`)
				return `height: ${statusBarHeight}px`
			},
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		onLoad(options) {
			console.log(options)
			this.enterFrom = options.from
		},
		onShow() {
			console.log('onshow running')
			this.loadData()
		},
		methods: {
			loadData() {
				this.$request.get('/api/member/getDataOnUserCenter', ).then((res) => {
					let memberInfo = Object.assign(this.memberInfo, res)
					this.memberInfo = memberInfo
				}).catch(err => {
					// this.memberInfo = {

					// }
				})
			},
		}
	}
</script>

<style lang="scss">
	image {
		height: 30rpx;
		width: 30rpx;
	}

	.page-head {
		background-image: url(https://images.51xeld.com/2021/01/81944b78deb346e29f1f416befa54f4b.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position-y: -190rpx;
		width: 100%;
		// height: 390rpx;

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
				padding: 8rpx;
				left: 30rpx;
				border: 1px solid #FFDBB5;
				top: 5px;
				border-radius: 50%;
			}
		}

		.banner-card {
			background-color: #FFFFFF;
			width: 96%;
			height: 260rpx;
			margin: 0 auto;
			border-radius: 20rpx;
			box-shadow: 0px 10px 20px 1px rgba(253, 176, 94, 0.26);
			position: relative;

			.member-badge {
				position: absolute;
				right: 0;
				top: 60rpx;
				height: 50rpx;
				width: 160rpx;
				line-height: 50rpx;
				background-color: #414A5F;
				color: #F5E09F;
				text-align: center;
				border-radius: 40rpx 0 0 40rpx;
				font-size: 24rpx;

				image {
					margin-right: 6rpx;
					position: relative;
					top: 4rpx;
				}
			}

			.top-card {
				display: flex;
				align-items: center;
				margin-left: 26rpx;
				padding-top: 30rpx;
				font-size: 34rpx;
				color: #7E5621;

				.head-pic {
					height: 70rpx;
					width: 70rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 4rpx solid #FFFFFF;
					box-shadow: 0px 2px 12px 1px rgba(253, 176, 95, 0.52);
					margin-right: 10rpx;

					image {
						height: 70rpx;
						width: 70rpx;
					}
				}

				text {
					margin-left: 10rpx;
				}
			}

			.bottom-card {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 0 10%;
				margin-top: 20rpx;

				image {
					height: 60rpx;
				}

				.card-item {
					height: 120rpx;
					text-align: center;

					.card-content {
						font-size: 44rpx;
						color: #72757B;
					}

					.card-title {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: #666666;
					}
				}
			}
		}
	}

	.advertiment {
		background-image: url(https://images.51xeld.com/2021/06/f62d2ff766ed4e2abc75b2246c415f89.png);
		background-repeat: no-repeat;
		background-size: contain;
		height: 300rpx;
	}

	.member-tools {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.tool {
			width: 33%;
			height: 140rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40rpx;

			image {
				height: 90rpx;
				width: 90rpx;
			}
		}
	}
</style>
