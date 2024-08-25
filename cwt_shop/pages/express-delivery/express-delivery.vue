<template>
	<view>
		<!--pages/express-delivery/express-delivery.wxml-->
		<!-- 物流信息 -->
		<customNavi :naviData='naviData'>物流信息</customNavi>
		<view class="container">
			<view class="wrapper">
				<view class="deliveryInfo"
					style="background:url(http://jiales.gz-yami.com/delivery-bg.png) center center no-repeat #fff;">
					<view class="icon-express"
						style="background:url(http://jiales.gz-yami.com/delivery-car.png) no-repeat;background-size:100% 100%;">
					</view>
					<view class="infoWarp">
						<view class="companyname">
							<text class="key">物流公司：</text>
							<text class="value">{{companyName}}</text>
						</view>
						<view class="expno">
							<text class="key">运单编号：</text>
							<text class="value">{{dvyFlowId}}</text>
						</view>
					</view>
				</view>
				<view class="deliveryDetail">
					<block v-for="(item, index) in dvyData" :key="index">

						<view :class="'detailItem ' + (index==dvyData.length-1?'lastest':'')">
							<view class="dot">
								<image v-if="index == dvyData.length-1" src="/static/images/icon/delive-dot.png">
								</image>
								<image v-else-if="index < dvyData.length" src="/static/images/icon/dot.png"></image>
							</view>
							<view class="detail">
								<view class="desc">{{item.AcceptStation}}</view>
								<view class="time">{{item.AcceptTime}}</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/express-delivery/express-delivery.js
	import customNavi from "@/components/custom-navi/custom-navi.vue";

	export default {
		data() {
			return {
				companyName: "",
				dvyFlowId: "",
				dvyData: [],
				naviData: {
					ifGoBack: true
				},
				distributionType: 0
			};
		},

		components: {
			customNavi,
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.distributionType = 4
			this.$request.get("/logistics/kuaidiniao/getLogisticsInformation", {
				orderNumber: options.orderNum
			}).then((res) => {
				var deliverData = JSON.parse(res.deliverData);
				this.setData({
					companyName: res.deliverName,
					dvyFlowId: deliverData.LogisticCode,
					dvyData: deliverData.Traces
				});
			}, (rej) => {
				console.log(rej)
			})
		},

		methods: {}
	};
</script>
<style>
	/* pages/express-delivery/express-delivery.wxss */

	.container {
		height: 100%;
	}

	.padding20 {
		padding-top: 88rpx;
	}

	.f-fl {
		float: left;
	}

	.f-fr {
		float: right;
	}

	.navWrap {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		overflow: hidden;
		background-color: #fafafa;
		border-bottom: 2rpx solid #f4f4f4;
		height: 92rpx;
	}

	.nav {
		display: flex;
		flex-flow: row nowrap;
	}

	.nav-slider {
		left: 0;
		bottom: 0;
		height: 4rpx;
		background-color: #b4282d;
		transition: transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
		box-sizing: border-box;
	}

	.nav-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		float: left;
		height: 88rpx;
		padding: 0 16rpx;
		font-size: 28rpx;
	}

	.nav-item text {
		box-sizing: border-box;
		color: #333;
		padding: 27rpx 16rpx 23rpx;
		line-height: 34rpx;
	}

	.nav-item.active text {
		color: #b4282d;
	}

	.u-icon {
		vertical-align: middle;
	}

	.deliveryInfo {
		height: 198rpx;
		width: 100%;
		vertical-align: middle;
		padding-left: 30rpx;
		background-size: cover;
		display: table;
		position: relative;
		box-sizing: border-box;
	}

	.icon-express {
		width: 104rpx;
		height: 104rpx;
		background-size: 100% 100%;
		position: absolute;
		top: 48rpx;
		left: 30rpx;
	}

	.infoWarp {
		display: table-cell;
		vertical-align: middle;
	}

	.deliveryInfo .companyname,
	.deliveryInfo .expno {
		line-height: 1;
		margin-left: 136rpx;
		font-size: 28rpx;
	}

	.deliveryInfo .companyname .key,
	.deliveryInfo .expno .key {
		color: #666;
	}

	.deliveryInfo .expno {
		margin-top: 16rpx;
	}

	.deliveryDetail {
		margin-top: 20rpx;
		padding-top: 40rpx;
		background-color: #fff;
		min-height: 670rpx;
	}

	.detailItem {
		border-left: 1px dashed #f4f4f4;
		margin-left: 42rpx;
		position: relative;
		margin-bottom: 2rpx;
	}

	.dot image {
		width: 35rpx;
		height: 35rpx;
		background-size: 100%;
		position: absolute;
		top: 40rpx;
		left: -18rpx;
	}

	.lastest .dot image {
		top: -2rpx;
	}

	.detail .desc {
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.detail .time {
		font-size: 24rpx;
		line-height: 30rpx;
		color: #999;
		margin-top: 15rpx;
	}

	.detail {
		border-top: 1px solid #f4f4f4;
		margin-left: 28rpx;
		overflow: hidden;
		padding-right: 30rpx;
	}

	.detail .desc {
		margin-top: 40rpx;
	}

	.detail .time {
		margin-bottom: 39rpx;
	}

	.lastest .detail .desc,
	.lastest .detail .time {
		color: #105c3e;
	}

	.lastest .detail {
		border-top: 0;
	}

	.lastest .detail .desc {
		margin-top: 0;
	}

	.deliveryTip {
		height: 80rpx;
		background-color: #fff8d8;
		padding-left: 30rpx;
		color: #f48f18;
		font-size: 28rpx;
		line-height: 80rpx;
		margin-bottom: 20rpx;
	}

	.shopTransfer {
		text-align: center;
		height: 100%;
		width: 100%;
		color: #666;
		margin-top: 50%;
		font-weight: 550;
	}
</style>
