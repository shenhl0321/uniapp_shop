<template>
	<view>
		<!--pages/promotion-order/promotion-order.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>

		<view class="mainMenu">
			<view data-index="1" @tap="handleMainMenuSelect" :class="index==1?'active': ''">全部订单</view>
			<view data-index="2" @tap="handleMainMenuSelect" :class="index==2?'active':''">未结算</view>
			<view data-index="3" @tap="handleMainMenuSelect" :class="index==3?'active':''">已结算</view>
		</view>

		<view class="container" v-if="showList.length >0">
			<block v-for="(item, index) in showList" :key="index">
				<view class="order">
					<view class="order-head">
						<view class="order-num">下单时间:{{item.createTime}}</view>
						<view class="type">
							{{item.status==0?'未结算':
          (item.status==1?'返现失败':
          (item.status==2?'已结算':''))}}
						</view>
					</view>
					<block v-for="(prod, index2) in item.orderItemList" :key="index2">
						<view class="order-body">
							<view>
								<image :src="resourcesUrl+prod.pic" mode="widthFix"></image>
							</view>
							<view class="prodinfo">
								<view>{{prod.prodName}}</view>
								<view>x{{prod.prodCount}}</view>
							</view>
						</view>
					</block>
					<view class="order-footer">
						<view class="order-amount">订单金额：￥{{item.price}}</view>
						<view class="order-commission">
							<text class="commission-tit">佣金：</text>
							<text class="commission-num">￥{{item.rebateMoney}}</text>
						</view>
					</view>


				</view>
			</block>
		</view>
		<view v-else class="none">
			<image src="http://images.51xeld.com/2020/07/136b9663d9cd437fa78d5fb2b6090f62.png" mode="widthFix" style="width: 100%"></image>
			<view class="norecords">暂无记录</view>
		</view>
	</view>
</template>

<script>
	// pages/promotion-order/promotion-order.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				style: {
					color: 'white',
					backgroundColor: '#FFBF77'
				},
				title: '推广订单',
				index: 1,
				resourcesUrl: 'http://images.51xeld.com/',
				AllpromoTionOrder: [],
				//所有推广订单
				djsOrderList: [],
				//所有待结算订单
				yjsOrderList: [], //所有已结算订单
				showList: ""
			};
		},

		components: {
			navigation
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.$request.get("/Spread/getPromoTionOrder", ).then((res) =>{
				this.setData({
						showList: res.AllpromoTionOrder,
						AllpromoTionOrder: res.AllpromoTionOrder,
						djsOrderList: res.djsOrderList,
						yjsOrderList: res.yjsOrderList
					});
			}, (rej) =>{ console.log(rej) })
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			handleMainMenuSelect: function(e) {
				var index = e.currentTarget.dataset.index;
				var showList;

				switch (index) {
					case '1':
						showList = this.AllpromoTionOrder;
						break;

					case '2':
						showList = this.djsOrderList;
						break;

					case '3':
						showList = this.yjsOrderList;
						break;
				}

				this.setData({
					index,
					showList
				});
			}
		}
	};
</script>
<style>
	/* pages/promotion-order/promotion-order.wxss */
	page {
		background-color: #F7F4F8;
	}

	.mainMenu {
		box-sizing: border-box;
		height: 90rpx;
		width: 100%;
		padding: 0 5%;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		line-height: 90rpx;
		font-size: 26rpx;
		color: #666;
	}

	.mainMenu .active {
		color: #FFBF77;
		height: 100%;
		height: 84rpx;
		line-height: 84rpx;
		border-bottom: 6rpx solid #FFBF77;
	}

	.container {
		box-sizing: border-box;
		padding: 0 4% 20rpx;
	}

	.order {
		width: 100%;
		background-color: #fff;
		margin-top: 30rpx;
		border-radius: 12rpx;
	}

	.order .order-head {
		font-size: 30rpx;
		line-height: 90rpx;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #F7F4F8;
		box-sizing: border-box;
		padding: 0 3%;
	}

	.order .order-head .type {
		color: #FFBF7A;
		font-size: 28rpx;
	}

	.order .order-body {
		display: flex;
		height: 200rpx;
		align-items: center;
		border-bottom: 1px solid #F7F4F8;
		font-size: 26rpx;
		margin-left: 3%;
		color: #777478;
	}

	.order .order-body .prodinfo>view {
		margin: 60rpx 0 60rpx 40rpx;
	}

	.order .order-body image {
		width: 160rpx;
		height: 160rpx;
	}

	.order .order-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 0 3%;
		color: #A7A4A7;
	}

	.order .order-footer .order-commission .commission-num {
		font-size: 32rpx;
		color: #666;
	}

	.none {
		height: 100%;
		width: 100%;
		position: relative;
	}

	.none image {
		width: 80%;
		margin: 30% auto 0;
	}

	.none .norecords {
		position: absolute;
		top: 87%;
		left: 50%;
		transform: translateX(-50%);
		width: 200rpx;
		color: #999;
		font-size: 28rpx;
		text-align: center;
	}
</style>
