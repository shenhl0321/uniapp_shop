<template>
	<view>
		<!--pages/coupon/coupon.wxml-->
		<customNavi :naviData='naviData'>优惠券</customNavi>
		<block v-for="(item, index) in couponList" :key="index">
			<view class="coupon">
				<view class="leftContainer">
					<view class="amount">
						<text>￥</text>
						<text>{{item.fullAmountReduce}}</text>
					</view>
					<view>指定店铺通用</view>
				</view>
				<view class="rightContainer">
					<view class="title-time">
						<view class="title">{{item.couponTitle}}</view>
						<view class="time">有效期：{{item.startTime}}-{{item.endTime}}</view>
						<view class="reference">{{item.shopName}}</view>
					</view>
					<view class="coupon-info">
						该优惠券不叠加其他优惠券使用
					</view>
				</view>
				<view class="useRightNow" :data-shopId="item.shopId" @tap="useCoupon">立即使用</view>
			</view>
		</block>
	</view>
</template>

<script>
	// pages/coupon/coupon.js
	import customNavi from '@/components/custom-navi/custom-navi.vue'

	export default {
		data() {
			return {
				couponList: [],
				naviData: {
					ifGoBack: true
				}
			};
		},

		components: {
			customNavi
		},

		onLoad: function(options) {
			this.getCouponList()
		},

		methods: {
			getCouponList: function() {
				this.$request.get('/coupon/coupon/getCoupon', ).then((res) => {
					this.couponList = res
				}, (rej) => {
					console.log(rej)
				})
			},

			useCoupon(e) {
				var shopId = e.currentTarget.dataset.shopid;
				this.$store.dispatch('currentShop/getShopInfo', shopId)
				uni.navigateTo({
					url: '/pages/category/category'
				})
			},

			//领取优惠券
			handleReceive(e) {
				var coupon = this.couponList.filter(item => {
					return item.couponId == e.currentTarget.dataset.couponid;
				})[0]
				if (coupon.useState == null) {
					this.this.$request.post('/couponRecord/couponRecord', {
						...coupon,
						state: 1,
					}).then((res) => {
						if (res.code === 200) {
							this.$showToast('领取成功')
						} else {
							this.$showToast('领取失败')
						}
						this.getCouponList();
					}, (rej) => {
						console.log(rej)
					})
				}
			}
		}
	};
</script>
<style>
	/* pages/coupon/coupon.wxss */
	page {
		background-color: #F4F5FA;
	}

	.navigate {
		width: 100%;
		display: flex;
		justify-content: space-around;
		color: #828282;
		background-color: #fff;
	}

	.navigate view {
		padding: 18rpx 0;
	}

	.navigate .active {
		color: #FFBF7A;
		border-bottom: 2px solid #FFBF7A;
	}

	.coupon {
		box-sizing: border-box;
		width: 94%;
		margin: 20rpx 3%;
		background: url("https://images.51xeld.com/2020/10/1528dd6b340b4635a347c0ae82646917.png") no-repeat;
		background-size: 100% 210rpx;
		height: 210rpx;
		border-radius: 10rpx;
		/* background-color: #fff; */
		display: flex;
		position: relative;
	}

	.used {
		background: url("http://images.51xeld.com/2020/07/828241eb17a64600aae0a71bc5a13e23.png") no-repeat;
	}

	.leftContainer {
		width: 32%;
	}

	.leftContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		padding-bottom: 20rpx;
	}

	.leftContainer .amount text:last-child {
		font-size: 70rpx;
	}

	.leftContainer .amount text:first-child {
		font-size: 36rpx;
	}

	.leftContainer view:last-child {
		font-size: 28rpx;
	}

	.rightContainer {
		width: 68%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.rightContainer .title-time {
		height: 150rpx;
		font-size: 34rpx;
		font-weight: 550;
		margin: 20rpx 0 0 30rpx;
		color: #555;
	}

	.rightContainer .time {
		color: #A9A9A9;
		font-size: 20rpx;
		margin-top: 10rpx;
		font-weight: 400;
		/* width: 53%; */
		/* border: 1px solid #eee; */
		/* letter-spacing: 0rpx; */
	}

	.title-time .reference {
		font-size: 26rpx;
		font-weight: 400;
		color: #aaa;
		margin-top: 10rpx;
	}

	.rightContainer .coupon-info {
		margin: 0 20rpx 20rpx 25rpx;
		padding-top: 10rpx;
		font-size: 26rpx;
		color: #919191;
		width: 90%;
		border-top: 1px solid #eeeeee;
	}

	.useRightNow {
		position: absolute;
		top: 50%;
		right: 20rpx;
		transform: translate(0, -50%);
		border: 1px solid #FFBF7A;
		font-size: 24rpx;
		color: #FFBF7A;
		height: 50rpx;
		width: 140rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 30rpx;
	}
</style>
