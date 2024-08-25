<template>
	<view>
		<!--pages/pay-result/pay-result.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoHome="true"></navigation>


		<view class="container">
			<view v-if="sts == 0">
				<view class="pay-sts fail">支付失败</view>
				<view class="tips">请在
					<text class="warn">30分钟</text>内完成付款
				</view>
				<view class="tips">否则订单会被系统取消</view>
				<view class="btns">
					<text class="button checkorder" @tap="toOrderList">查看订单</text>
					<text class="button payagain" @tap="payAgain">重新支付</text>
				</view>
			</view>

			<view v-if="sts == 1">
				<view class="pay-sts succ">支付成功</view>
				<view class="tips">感谢您的购买</view>
				<view class="btns">
					<text class="button checkorder" @tap="toOrderList">查看订单</text>
					<text class="button shopcontinue" @tap="toIndex">继续购物</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	// pages/pay-result/pay-result.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				sts: 0,
				orderNumbers: '',
				title: "支付结果",
				style: {
					backgroundColor: '#FFBF77',
					color: 'white'
				}
			};
		},

		components: {
			navigation
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				sts: options.sts,
				orderNumbers: options.orderNumbers
			});
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			toOrderList: function() {
				uni.navigateTo({
					url: '/pages/orderList/orderList?sts=0'
				});
			},
			toIndex: function() {
				uni.navigateTo({
					url: '/pages/category/category'
				});
			},
			payAgain: function() {
				uni.showLoading({
					mask: true
				});
				this.$request.post("/p/order/pay", {
					payType: 1,
					orderNumbers: this.orderNumbers
				}).then((res) => {
					uni.hideLoading();
					uni.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.packageValue,
						signType: res.signType,
						paySign: res.paySign,
						success: e => {
							//console.log("支付成功");
							uni.redirectTo({
								url: '/pages/pay-result/pay-result?sts=1&orderNum=' +
									orderNumbers + "&orderType=" + this.orderType
							});
						},
						fail: err => {}
					});
				})
			}
		}
	};
</script>
<style>
	/* pages/pay-result/pay-result.wxss */

	.pay-sts {
		font-size: 40rpx;
		margin-top: 100rpx;
		padding: 30rpx 0;
		text-align: center;
	}

	.pay-sts.fail {
		color: #f43530;
	}

	.pay-sts.succ {
		color: #19be6b;
	}

	.btns {
		margin-top: 50rpx;
		text-align: center;
	}

	.tips {
		font-size: 28rpx;
		color: #999;
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
	}

	.tips .warn {
		color: #f43530;
	}

	.btns .button {
		border-radius: 10rpx;
		font-size: 28rpx;
		background: #fff;
		color: #333;
		padding: 20rpx 35rpx;
		width: 300rpx;
		margin: 0 20rpx;
		text-align: center;
	}

	.btns .button.checkorder {
		background: #19be6b;
		color: #fff;
		margin-bottom: 20rpx;
		border: 2rpx solid #19be6b;
	}

	.btns .button.payagain {
		background: #fff;
		border: 2rpx solid #f90;
		color: #f90;
	}

	.btns .button.shopcontinue {
		background: #fff;
		border: 2rpx solid #19be6b;
		color: #19be6b;
	}
</style>
