<template>
	<view>
		<view class="page-head">
			<view class="statusbar" :style="statusBarHeight">
			</view>
			<view class="custom-navi">
				<view class="btn" @click="goback">
					<image src="../../static/images/icon/goback.png" mode="aspectFit"></image>
				</view>
				<view class="page-title">
					会员码
				</view>
			</view>
			<view class="banner-card">
				<view class="account">
					<view>账户余额</view>
					<view>{{codes.account}}</view>
				</view>
				<view class="incharge-btn" @click="$goThePage('/pages/member/recharge?from=click')">
					去充值
				</view>
			</view>
		</view>

		<view class="barcode">
			<image :src="codes.barCode" mode="aspectFit"></image>
			<text>{{userInfo.mobile}}</text>
		</view>
		<view class="qrcode">
			<image :src="codes.QrCode" mode="aspectFit"></image>
			<text>请将会员码展示给收营员~</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codes: {}
			}
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

		created() {
			this.loadData()
		},

		methods: {
			loadData() {
				this.$request.get('/api/member/getMemberShipCode', ).then((res) => {
					console.log(res)
					this.codes = res
					let barcode = res.barCode
					this.codes.barCode = this.codes.barCode.replace(/[\r\n]/g, "")
					this.codes.QrCode = this.codes.QrCode.replace(/[\r\n]/g, "")
				})
			},
						
			goback() {
				uni.navigateBack({
					
				})
			},
			goThePage(url) {
				uni.navigateTo({
					url
				})
			}
		}

	}
</script>

<style lang="scss">
	.page-head {
		background-image: url(https://images.51xeld.com/2021/01/81944b78deb346e29f1f416befa54f4b.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position-y: -240rpx;
		width: 100%;
		height: 300rpx;

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
				top: 5px;
				border-radius: 50%;
			}
		}

		.banner-card {
			background-color: #FFFFFF;
			width: 96%;
			height: 220rpx;
			margin: 0 auto;
			border-radius: 20rpx;
			box-shadow: 0px 10px 20px 1px rgba(253, 176, 94, 0.26);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 6%;

			.account {
				font-size: 28rpx;

				view {
					&:first {
						color: #666666;
					}

					&:last-child {
						color: #333333;
						font-size: 42rpx;
						margin-top: 16rpx;
					}
				}
			}

			.incharge-btn {
				padding: 10rpx 30rpx;
				border: 1px solid #FDB160;
				color: #FDB160;
				border-radius: 40rpx;
			}
		}
	}

	.barcode,
	.qrcode {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 310rpx;
		margin-top: 90rpx;
		font-size: 50rpx;
		color: #666666;

		image {
			height: 220rpx;
			margin-bottom: 20rpx;
		}
	}

	.qrcode {
		height: 460rpx;
		font-size: 30rpx;
		margin-top: 40rpx;

		image {
			height: 440rpx;
		}
	}
	
	.barcode{
		padding-top: 50rpx;
	}
</style>
