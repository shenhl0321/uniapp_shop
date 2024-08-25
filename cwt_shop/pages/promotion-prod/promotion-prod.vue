<template>
	<view>
		<!--pages/promotion-prod/promotion-prod.wxml-->
		<!--pages/all-invited-member/all-invited-member.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>

		<view class="mainMenu">
			<view data-index="1" @tap="handleMainMenuSelect" :class="index==1?'active': ''">佣金最高</view>
			<view data-index="2" @tap="handleMainMenuSelect" :class="index==2?'active':''">最新商品</view>
			<view data-index="3" @tap="handleMainMenuSelect" :class="index==3?'active':''">热门商品</view>
		</view>

		<view v-if="promotionGoodsList.length>0" class="container">
			<block v-for="(item, index) in showList" :key="index">
				<view class="member">
					<view class="leftbar">
						<view class="member-head">
							<image :src="'https://images.51xeld.com/' + item.pic" mode="aspeciFit"></image>
						</view>
						<view class="member-info">
							<view class="nickname">{{item.goodsName}}</view>
							<view class="orders">价格：{{item.price}}</view>
						</view>
					</view>
					<view class="member-state">
						<view class="state">预计佣金</view>
						<view class="commssion">
							￥{{item.price*item.rate}}
						</view>
					</view>
				</view>
			</block>
		</view>

		<view v-else class="none">
			<image src="http://images.51xeld.com/2020/07/136b9663d9cd437fa78d5fb2b6090f62.png" mode="widthFix"
				style="width: 100%"></image>
			<view class="norecords">暂无记录</view>
		</view>
	</view>
</template>

<script>
	// pages/promotion-prod/promotion-prod.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				style: {
					color: 'white',
					backgroundColor: '#FFBF77'
				},
				title: '推广商品',
				index: 1,
				promotionGoodsList: [],
				showList: [],
				recentGoodsList: "",
				sellWellGoodsList: ""
			};
		},

		components: {
			navigation
		},
		
		computed: {
			shopInfo() {
				return this.$store.state.currentShop
			}
		},
		
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.$request.get("/Spread/getPromotionGoods", {
				shopId: this.shopInfo.shopId
			}).then((res) => {
				this.setData({
					showList: res.promotionGoodsList,
					promotionGoodsList: res.promotionGoodsList,
					recentGoodsList: res.recentGoodsList,
					sellWellGoodsList: res.sellWellGoodsList
				});
			}, (rej) => {
				console.log(rej)
			})
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
						showList = this.promotionGoodsList;
						break;

					case '2':
						showList = this.recentGoodsList;
						break;

					case '3':
						showList = this.sellWellGoodsList;
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
	/* pages/promotion-prod/promotion-prod.wxss */
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
		font-size: 28rpx;
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
		padding: 0 3% 30rpx;
	}

	.container .member {
		width: 100%;
		background-color: #fff;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		position: relative;
		border-radius: 12rpx;
	}

	.container .member .leftbar {
		display: flex;
	}

	.container .member .member-head {
		margin: 18rpx;
	}

	.container .member image {
		display: block;
		width: 140rpx;
		height: 140rpx;
	}

	.container .member-info>view {
		margin-top: 30rpx;
	}

	.container .member-info .nickname {
		color: #333;
		font-size: 30rpx;

	}

	.container .member-info .orders {
		color: #9D9A9D;
	}

	.container .member .member-state {
		text-align: right;
		margin-right: 20rpx;
	}

	.container .member .member-state>view {
		margin: 10rpx 0;
	}

	.container .member .member-state .state {
		color: #A8A5A8;
		font-size: 24rpx;
	}

	.container .member .member-state .commssion {
		color: #D31D25;
		font-size: 32rpx;
	}

	.none {
		height: 100%;
		width: 100%;
	}

	.none .norecords {
		position: absolute;
		right: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200rpx;
		text-align: center;
		color: #A5A2A6;
		font-size: 30rpx;
	}
</style>
