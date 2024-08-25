<template>
	<view>
		<!--pages/shpp-delivery/shpp-delivery.wxml-->
		<navigation :title="title" :naviStyle="style" ifShowGoBack="true" data-from="home"></navigation>
		<view class="container">
			<view class="title">商家配送</view>
			<view class="content">商家正在为您配送，请耐心等待</view>
			<view class="button">
				<view class="btn left" @tap="goOrderDetails">订单详情</view>
				<view class="btn right" @tap="makephonecall">联系商家</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/shpp-delivery/shpp-delivery.js
	import navigation from "../../components/navigation/navigation";
	import shopCard from "../../components/shopCard/shopCard";

	export default {
		data() {
			return {
				title: "店家配送",
				style: {
					backgroundColor: '#FFBF77',
					color: '#FFFFFF'
				},
				orderNumber: "",
				shopId: "",
				shopInfo: "",
				showShopInfo: false,
				showOrder: false
			};
		},

		components: {
			navigation,
			shopCard
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				orderNumber: options.orderNumber,
				shopId: options.shopId
			});
			this.getShopInfo(options.shopId);
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			getShopInfo(shopId) {
				this.$request.get("/shop/shop/info/" + shopId, ).then(res => {
					this.shopInfo = res
				})
			},

			goOrderDetails: function() {
				uni.navigateTo({
					url: '/pages/order-detail/order-detail?orderNum=' + this.orderNumber + '&shopId=' + this
						.shopId
				});
			},
			makephonecall: function() {
				uni.makePhoneCall({
					phoneNumber: this.shopInfo.mobile,
					//这个是我的手机号，模拟测试
					success: () => {
						console.log("拨打电话成功！");
						uni.nextTick(() => {
							console.log('Eunning');
							this.setData({
								showShopInfo: true,
								showOrder: false
							});
						});
					},
					fail: () => {
						console.log("拨打电话失败！");
						uni.nextTick(() => {
							this.setData({
								showShopInfo: true,
								showOrder: false
							});
						});
					}
				});
			}
		}
	};
</script>
<style>
	/* pages/shpp-delivery/shpp-delivery.wxss */

	.container {
		margin-top: 40%;
		text-align: center;
		width: 100%;
	}

	.container .title {
		font-size: 40rpx;
	}

	.container .content {
		color: #888;
		font-size: 26rpx;
		margin-top: 30rpx;
	}

	.button {
		display: flex;
		justify-content: space-around;
		width: 60%;
		margin: 40rpx auto;
	}

	.button .btn {
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
		border: 1px solid #666;
		border-radius: 8rpx;
	}

	.button .left {
		border: 1px solid #19BE6B;
		background-color: #19BE6B;
		color: #ffffff;
	}

	.button .right {
		border: 1px solid #FF9900;
		color: #FF9900;

	}
</style>
