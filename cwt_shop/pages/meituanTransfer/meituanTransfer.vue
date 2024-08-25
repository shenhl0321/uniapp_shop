<template>
	<view>
		<!--pages/meituanTransfer/meituanTransfer.wxml-->
		<navigation :title="title" :naviStyle="style" ifShowGoBack="true" data-from="home"></navigation>
		<map id="myMap" style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude"
			@markertap="markertap" @callouttap="callouttap" @labeltap="labeltap" :markers="markers" scale="16"
			show-location :include-points="points">
			<cover-view slot="callout" v-if="deliveryStatus==20||deliveryStatus==30">
				<cover-view class="customCallout" :marker-id="1">
					<cover-view v-if="deliveryStatus == 20" class="content">
						骑手正在取单
					</cover-view>
					<cover-view v-if="deliveryStatus == 30" class="content">
						骑手正在飞速赶往目的地
					</cover-view>
				</cover-view>
				<cover-view :marker-id="2">

				</cover-view>
			</cover-view>
		</map>

		<view class="menubar">
			<view class="topBar">
				<view>预计 <text>{{"18:30"}}送达</text></view>
				<view>
					<image mode="aspectFit" src="/static/images/icon/touser.png"></image>
				</view>
			</view>
			<view class="bottomBar">
				<view class="bottomBar-item">
					<image mode="aspectFit" src="/static/images/icon/bell.png"></image>
					<text>催单</text>
				</view>
				<view class="bottomBar-item">
					<image mode="aspectFit" src="/static/images/icon/phone-02.png"></image>
					<text>联系骑手</text>
				</view>
				<view class="bottomBar-item">
					<image mode="aspectFit" src="/static/images/icon/message.png"></image>
					<text>在线联系</text>
				</view>
				<view style="font-size:50rpx;line-height:22rpx;color:#999">...</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/meituanTransfer/meituanTransfer.js
	var QQMapWX = require("../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js");
	var qqmapsdk;
	import navigation from "../../components/navigation/navigation";
	import shopCard from "../../components/shopCard/shopCard";

	export default {
		data() {
			return {
				title: "查看物流",
				style: {
					backgroundColor: '#FFBF77',
					color: '#FFFFFF'
				},
				points: [],
				markers: [],
				deliveryStatus: "",
				orderNumber: "",
				latitude: "",
				longitude: "",
				currentRegion: "",
				keyword: "",
				info: ""
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
			let self = this;
			self.setData({
				orderNumber: options.orderNumber // orderNumber: "1302161566988374016"

			});
			self.mapCtx = uni.createMapContext('myMap'); // 实例化API核心类

			qqmapsdk = new QQMapWX({
				key: 'W57BZ-JDB6X-XPA4H-Z76MI-73FF2-24BT4'
			}); //定位

			uni.getLocation({
				type: 'wgs84',

				success(res) {
					const latitude = res.latitude;
					const longitude = res.longitude; //你地址解析

					qqmapsdk.reverseGeocoder({
						location: {
							latitude: latitude,
							longitude: longitude
						},
						success: function(res) {
							console.log(res);
							self.setData({
								latitude: latitude,
								longitude: longitude,
								currentRegion: res.result.address_component,
								keyword: self.defaultKeyword
							});
						}
					});
				},

				fail(err) {
					uni.hideLoading({});
					uni.showToast({
						title: '定位失败',
						icon: 'none',
						duration: 1500
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1500);
				}

			});
			this.getMeituanAndUserAddr();
		},

		/**
		 * 用户点击右上角分享
		 */
		methods: {
			getMeituanAndUserAddr() {
				this.$request.get('/QueryOrderStatusInfo/getRiderLocation', {
					orderNumber: this.orderNumber
				}).then((res) => {
					this.setData({
						markers: [{
							id: 1,
							latitude: res.riderLocation.data.lat * 10 ** -6,
							longitude: res.riderLocation.data.lng * 10 ** -6,
							iconPath: "/static/images/icon/rider.png",
							width: '40rpx',
							height: '40rpx',
							customCallout: {
								anchorY: 0,
								anchorX: 0,
								display: 'ALWAYS'
							}
						}, {
							id: 2,
							latitude: res.userLat,
							longitude: res.userLng,
							iconPath: "/static/images/icon/delive-dot.png",
							width: '65rpx',
							height: '65rpx',
							customCallout: {
								anchorY: 0,
								anchorX: 0,
								display: 'ALWAYS'
							}
						}],
						deliveryStatus: res.deliveryStatus,
						points: [{
							longitude: res.riderLocation.data.lat * 10 ** -6,
							latitude: res.riderLocation.data.lng * 10 ** -6
						}, {
							longitude: res.userLat,
							latitude: res.userLng
						}]
					});
				}, (rej) => {
					console.log(rej)
				})
			},

			addMarker() {
				this.setData({
					markers: [{
						id: 1,
						latitude: this.latitude,
						longitude: this.longitude,
						iconPath: "/static/images/icon/rider.png",
						width: '50rpx',
						height: '50rpx',
						customCallout: {
							anchorY: 0,
							anchorX: 0,
							display: 'ALWAYS'
						}
					}],
					info: '骑手正飞速赶来'
				});
			}

		}
	};
</script>
<style>
	/* pages/meituanTransfer/meituanTransfer.wxss */
	page {
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
	}

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
		margin: 14rpx 0 0 10rpx;
	}

	.callout-content {
		flex: 0 1 auto;
		margin: 0 10px;
		font-size: 14px;
	}

	.content {
		color: #666;
		font-size: 26rpx;
	}

	.menubar {
		width: 94%;
		height: 200rpx;
		background-color: white;
		position: fixed;
		bottom: 2px;
		margin-left: 3%;
		margin-bottom: 20rpx;
		color: #666;
		font-size: 24rpx;
	}

	.menubar .bottomBar image {
		width: 30rpx;
		height: 30rpx;
		position: relative;
		top: 6rpx;
		right: 2rpx;
	}

	.menubar .topBar {
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 40rpx;
		align-items: center;
	}

	.menubar .topBar image {
		width: 50rpx;
		height: 50rpx;
	}

	.menubar .bottomBar {
		display: flex;
		justify-content: space-around;
	}

	.bottomBar-item {
		padding: 12rpx 20rpx 12rpx 20rpx;
		border: 1px solid #eee;
		border-radius: 6rpx;
	}
</style>
