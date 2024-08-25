<template>
	<view>
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>
		<view class="mainMenu">
			<view data-index="1" @tap="handleMainMenuTap" :class="index==1?'active': ''">全部记录</view>
			<view data-index="2" @tap="handleMainMenuTap" :class="index==2?'active':''">已完成</view>
			<view data-index="3" @tap="handleMainMenuTap" :class="index==3?'active':''">待处理</view>
		</view>

		<view v-if="showList.length" class="recordList">
			<block v-for="(item, index) in showList" :key="index">
				<view class="record">
					<view class="record-info">
						<view class="amount">￥{{item.cashOutMoney}}</view>
						<view class="time">{{item.createTime}}</view>
					</view>
					<view v-if="item.state==0" class="type2">待处理</view>
					<view v-if="item.state==2" class="type1">已提现</view>
				</view>
			</block>

			<!-- 
  <view class="endstamp">
    到底啦~
  </view> -->
		</view>

		<view v-else class="none">
			<image src="http://images.51xeld.com/2020/07/136b9663d9cd437fa78d5fb2b6090f62.png" mode="widthFix"
				style="width: 100%"></image>
			<view class="norecords">暂无记录</view>
		</view>
	</view>
</template>

<script>
	// pages/withdraw-records/withdraw-records.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				style: {
					color: 'white',
					backgroundColor: '#FFBF77'
				},
				title: '提现记录',
				index: 1,
				cashOutList: [],
				ytgCashOutList: [],
				dshCashOutList: [],
				showList: []
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
			this.$request.get("/Spread/getWithdrawalRecord", ).then((res) => {
				this.setData({
					showList: res.cashOutList,
					cashOutList: res.cashOutList,
					ytgCashOutList: res.ytgCashOutList,
					dshCashOutList: res.dshCashOutList
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
			handleMainMenuTap: function(e) {
				var index = e.currentTarget.dataset.index;
				var showList;

				switch (index) {
					case '1':
						showList = this.cashOutList;
						break;

					case '2':
						showList = this.dshCashOutList;
						break;

					case '3':
						showList = this.ytgCashOutList;
						break;
				}

				console.log(showList);
				this.setData({
					index,
					showList
				});
			}
		}
	};
</script>
<style>
	/* pages/withdraw-records/withdraw-records.wxss */
	page {
		background-color: #F5F5F5;
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

	.recordList {
		margin-top: 20rpx;
		background-color: #fff;
	}

	.recordList .record {
		box-sizing: border-box;
		padding: 0 4%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		border-bottom: 1px solid #F5F5F5;
	}

	.recordList .record view {
		margin: 6rpx 0;
	}

	.recordList .record .record-info .amount {
		font-size: 36rpx;
		color: #333333;
	}

	.recordList .record .record-info .time {
		color: #CDCDCD;
		font-size: 28rpx;
	}

	.recordList .record .type1 {
		color: #7B7B7B;
		font-size: 30rpx;
	}

	.recordList .record .type2 {
		color: #FFBF77;
		font-size: 30rpx;
	}

	.endstamp {
		color: #7D7D7D;
		text-align: center;
		margin-top: 60rpx;
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
