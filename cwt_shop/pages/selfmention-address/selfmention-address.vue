<template>
	<view>
		<!--pages/selfmention-address/selfmention-address.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>

		<view>
			<view class="title">约定提货时间</view>
			<view class="content">{{pickupTime}}</view>
			<view class="notice">请于约定时间上门提货</view>
		</view>
		<view style="position:relative;">
			<view class="title">商家电话</view>
			<view class="content">{{shopInfo.mobile}}</view>
			<view class="notice makeACall" @tap="makephonecall">
				<image src="/static/images/icon/phone.png" mode="widthFix"></image>
			</view>
		</view>
		<view>
			<view class="title">提货地址</view>
			<view class="content">{{shopInfo.city+shopInfo.area+shopInfo.shopAddress}}</view>
		</view>
		<view class="map">
			<map id="myMap" style="width: 100%; height: 300px;" :latitude="shopInfo.shopLat"
				:longitude="shopInfo.shopLng" :markers="markers" show-location>
				<cover-view class="customCallout" :marker-id="1">
					<cover-view class="callout-content">
						{{shopInfo.city+shopInfo.area+shopInfo.shopAddress}}
					</cover-view>
				</cover-view>
			</map>
		</view>
	</view>
</template>

<script>
	// pages/selfmention-address/selfmention-address.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				style: {
					color: 'white',
					backgroundColor: '#FFAD4F'
				},
				title: '自提地址',
				pickupTime: '',
				shopId: '',
				shopInfo: '',
				markers: [{
					id: 1,
					latitude: 23.097994,
					longitude: 113.323520,
					customCallout: {
						anchorY: 0,
						anchorX: 0,
						display: 'ALWAYS'
					}
				}],
				showShopInfo: false,
				showOrder: false
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
				shopId: options.shopId,
				pickupTime: options.pickupTime
			}); // this.getShopInfo()
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function(e) {
			this.mapCtx = uni.createMapContext('myMap');
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getShopInfo();
		},

		methods: {
			// 获取店铺信息
			getShopInfo: function() {
				this.$request.get('/shop/shop/info/' + this.shopId, ).then(res => {
					var markers = this.markers;
					markers[0].latitude = res.shopLat;
					markers[0].longitude = res.shopLng;
					this.setData({
						shopInfo: res,
						markers
					});
				}, (rej) => {
					console.log(rej)
				})
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
	/* pages/selfmention-address/selfmention-address.wxss */
	.customCallout {
		box-sizing: border-box;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 30px;
		height: 40px;
		display: inline-flex;
		padding: 5px 20px;
		justify-content: center;
		align-items: center;
	}

	.callout-content {
		flex: 0 1 auto;
		margin: 0 10px;
		font-size: 14px;
	}

	.title {
		padding: 20rpx 0 0 30rpx;
		color: #666;
	}

	.title::before {
		content: '';
		border-right: 3px solid #FFAD4F;
		margin-right: 4px;
	}

	.content {
		padding: 20rpx 0 0 40rpx;
		color: #666;
	}

	.notice {
		padding: 10px 0 0 40rpx;
		color: #999;
		font-size: 22rpx;
	}

	.map {
		margin-top: 30rpx;
	}

	.makeACall {
		position: absolute;
		right: 40rpx;
		top: 67rpx;
	}

	.makeACall image {
		width: 30rpx;
	}
</style>
