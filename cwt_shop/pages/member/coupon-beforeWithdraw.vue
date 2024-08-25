<template>
	<view>
		<view class="page-head">
			<view class="statusbar" :style="statusBarHeight">
			</view>
			<view class="custom-navi">
				<view class="btn">
					<!-- <image 
						src="/static/images/icon/gohome.png" 
						mode="aspectFit"></image> -->
					<image src="/static/images/icon/goback.png" mode="aspectFit" @click="goback"></image>
				</view>
				<view class="page-title">
					领券中心
				</view>
			</view>
		</view>

		<view class="coupon-list">
			<view class="coupon" v-for="(item, index) in couponList" :key='item.couponId'>
				<view class="coupon-head">
					<view class="amount">
						<text>￥</text><text>{{item.fullAmountReduce}}</text>
					</view>
					<view class="coupon-state">
						{{item.couponRecord?'已领取':'立即领取'}}
					</view>
				</view>
				<view class="coupon-body">
					<view class="des">
						{{item.couponType == 0?'无门槛优惠券':`订单满${item.reduceMoney}使用`}}
					</view>
					<view class="valid-period">
						使用时间：2021/1/31前有效
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuIndex: 1,
				couponList: []
			};
		},
		computed: {
			statusBarHeight() {
				let res = uni.getSystemInfoSync()
				let statusBarHeight = res.statusBarHeight
				console.log(`height: ${statusBarHeight}px;`)
				return `height: ${statusBarHeight}px`
			}
		},

		created() {
			this.loadData()
		},

		methods: {
			loadData() {
				this.$request.get('/api/member/getCoupon', ).then((res) => {
					this.couponList = res
					console.log(res)
				})
			},
			goback() {
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.page-head {
		background-color: #FFBF77;
		width: 100%;

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
				top: 10px;
				border-radius: 50%;
			}
		}
	}

	.main-menu {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-around;
		box-shadow: 0px 10px 10px 0px rgba(226, 226, 226, 0.26);
		color: #666666;

		.active {
			border-bottom: 3px solid #FFBF77;
		}
	}

	.coupon-list {
		width: 100%;
		margin-top: 40rpx;

		.coupon {
			width: 94%;
			height: 224rpx;
			margin: 0 auto 30rpx;
			background-image: url(https://images.51xeld.com/2021/02/f77195578b43401486214ddceb03f609.png);
			background-size: contain;
			background-repeat: no-repeat;
			display: flex;
			color: #FFFFFF;

			.coupon-head {
				width: 28%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				padding-bottom: 30rpx;

				.amount {
					text:first-child {
						font-size: 40rpx;
					}

					text:last-child {
						font-size: 90rpx;
					}
				}

				.coupon-state {
					border: 1px solid #FFFBF7;
					padding: 6rpx 30rpx;
					border-radius: 40rpx;
				}
			}

			.coupon-body {
				box-sizing: border-box;
				padding: 60rpx 0 0 40rpx;

				.des {
					font-size: 34rpx;
				}

				.valid-period {
					margin-top: 30rpx;
					font-size: 22rpx;
				}
			}
		}
	}
</style>
