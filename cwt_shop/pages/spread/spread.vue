<template>
	<view>
		<!--pages/spread/spread.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>

		<view class="contentwrap">
			<view class="wrap">
				<view class="background"></view>
				<view class="userInfoBox">
					<view class="userInfo">
						<view class="headPhoto">
							<image class="photoimage" :src='userInfo.pic' mode="aspectFit">
						</view>
						<view class="nickName-spreadShop">
							<view class="nickName">{{userInfo.nickName}}</view>
							<view class="spreadShop">推广店铺：小象智慧门店</view>
						</view>
						<view class="withdrawBtn" @tap="handleWithdraw">
							<text>提现</text>
						</view>
					</view>
					<view class="accountInfo">
						<view class="infoItem">
							<view class="infoTit">可提现金额</view>
							<view class="infoNumber">{{account || 0}}</view>
						</view>
						<view class="line"></view>
						<view class="infoItem">
							<view class="infoTit">累计收益</view>
							<view class="infoNumber">{{allIncome || 0}}</view>
						</view>
					</view>
				</view>
			</view>


			<view class="spreadInfo">
				<view class="item-line">
					<view class="spreadItem" data-index="1" @tap="handleMenuTap">
						<view class="item-icon">
							<image src="/static/images/icon/allUser.png" mode="widthFix"></image>
						</view>
						<view class="item-tit">累计用户</view>
					</view>
					<view class="spreadItem" data-index="2" @tap="handleMenuTap">
						<view class="item-icon">
							<image src="/static/images/icon/spreadOrders.png" mode="widthFix"></image>
						</view>
						<view class="item-tit">推广订单</view>
					</view>
					<view class="spreadItem" data-index="3" @tap="handleMenuTap">
						<view class="item-icon">
							<image src="/static/images/icon/withdrawInfo.png" mode="widthFix"></image>
						</view>
						<view class="item-tit">提现记录</view>
					</view>
				</view>
				<view class="item-line">
					<view class="spreadItem" data-index="4" @tap="handleMenuTap">
						<view class="item-icon">
							<image src="/static/images/icon/in-out.png" mode="widthFix"></image>
						</view>
						<view class="item-tit">收入明细</view>
					</view>
					<view class="spreadItem" data-index="5" @tap="handleMenuTap">
						<view class="item-icon">
							<image src="/static/images/icon/spread-prod.png" mode="widthFix"></image>
						</view>
						<view class="item-tit">推广商品</view>
					</view>
					<view class="spreadItem" data-index="6" @tap="handleMenuTap">
						<view class="item-icon">
							<image src="/static/images/icon/poster.png" mode="widthFix"></image>
						</view>
						<view class="item-tit">推广海报</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/spread/spread.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				title: '推广中心',
				account: '',
				//可提现金额
				allIncome: '',
				//累计收益
				style: {
					color: "white",
					backgroundColor: '#FFBF77'
				}
			};
		},

		computed: {
			userInfo() {
				return this.$store.state.userInfo
			}
		},

		components: {
			navigation
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},
		onShow: function() {
			this.$request.get("/Spread/getpromotionIncome", ).then((res) => {
				this.setData({
					allIncome: res.allIncome,
					account: res.account
				});
			}, (rej) => {
				console.log(rej)
			})
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			/**
			 * 生命周期函数--监听页面显示
			 */
			handleWithdraw: function(e) {
				console.log("running");
				uni.navigateTo({
					url: '../withdraw/withdraw'
				});
			},
			handleMenuTap: function(e) {
				var menuIndex = e.currentTarget.dataset.index;
				var url;

				switch (menuIndex) {
					case '1':
						url = '../all-invited-member/all-invited-member';
						break;

					case '2':
						url = '../promotion-order/promotion-order';
						break;

					case '3':
						url = '../withdraw-records/withdraw-records';
						break;

					case '4':
						url = '../in-out-details/in-out-details';
						break;

					case '5':
						url = '../promotion-prod/promotion-prod';
						break;

					case '6':
						url = '../poster/poster';
				}

				uni.navigateTo({
					url
				});
			}
		}
	};
</script>
<style>
	/* pages/spread/spread.wxss */
	page {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

	.contentwrap {
		background-color: #F5F5F5;
		position: relative;
		width: 100%;
		/* z-index: -1; */
	}

	.contentwrap .wrap {
		position: relative;
		width: 100%;
		height: 350rpx;
	}

	.background {
		height: 200rpx;
		width: 100%;
		background-color: #FFBF77;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.userInfoBox {
		position: absolute;
		top: 30rpx;
		left: 3%;
		z-index: 10;
		width: 94%;
		height: 300rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		font-size: 26rpx;
		padding-top: 20rpx;
		box-shadow: 0 0 6p rgba(148, 148, 148, 0.17);
	}

	.userInfo {
		display: flex;
		align-items: center;
		position: relative;
		height: 150rpx;
	}

	.headPhoto {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		background-color: #ffffff;
		margin-left: 30rpx;
		overflow: hidden;
		border: 1px solid #FED2AA;
		box-shadow: 0 0 3px #FED2AA;
	}

	.photoimage {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.nickName-spreadShop {
		margin-left: 20rpx;
	}

	.nickName {
		font-size: 34rpx;
		color: #616060;
		padding-bottom: 6rpx;
		height: 50rpx;
	}

	.spreadShop {
		color: #B4B4B4;
		padding-top: 6rpx;
	}

	.withdrawBtn {
		color: #FFC17B;
		height: 54rpx;
		width: 120rpx;
		border: 1px solid #FFC17B;
		text-align: center;
		border-radius: 40rpx;
		position: absolute;
		top: 42rpx;
		right: 30rpx;
	}

	.withdrawBtn text {
		font-size: 30rpx;
		height: 54rpx;
		line-height: 54rpx;
	}

	.accountInfo {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 150rpx;
		color: #5F5E5E;
		text-align: center;
	}

	.accountInfo .infoItem {
		height: 60%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}

	.infoItem .infoNumber {
		color: #DA2F1A;
		font-size: 34rpx;
	}

	.spreadInfo {
		margin-top: 30rpx;
		width: 100%;
	}

	.line {
		width: 1px;
		height: 100rpx;
		background: #f5f5f5;
	}

	.item-line {
		width: 100%;
		display: flex;
		margin-top: 1px;
	}

	.spreadItem {
		text-align: center;
		font-size: 30rpx;
		color: #838383;
		width: 33%;
		background-color: #FFFFFF;
		padding: 7% 0;
		margin-right: 1px;
	}

	.spreadItem .item-tit {
		height: 60rpx;
		line-height: 60rpx;
	}

	.spreadItem image {
		width: 90rpx;
	}
</style>
