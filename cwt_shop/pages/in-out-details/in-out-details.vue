<template>
	<view>
		<!--pages/in-out-details/in-out-details.wxml-->
		<custom-navi :naviData='naviData'>收支明细</custom-navi>
		<view v-if="rebateRecordsList.length>0" class="recordList">

			<block v-for="(item, index) in rebateRecordsList" :key="index">
				<view class="record">
					<view class="record-info">
						<view class="amount">订单分佣</view>
						<view class="time">{{item.createTime}}</view>
					</view>
					<view v-if="item.status==2" style class="type">+{{item.amount}}</view>
				</view>
			</block>
			<!-- <view class="endstamp">
				到底啦~
			</view> -->
		</view>
	</view>
</template>

<script>
	// pages/in-out-details/in-out-details.js
	import customNaiv from "@/components/custom-navi/custom-navi.vue";

	export default {
		data() {
			return {
				rebateRecordsList: [],
				naviData: {
					ifGoBack: true
				}
			};
		},

		components: {
			customNaiv
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},



		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.$request.get("/Spread/getIncomeDetails",).then((res) =>{
				this.rebateRecordsList = res.rebateRecordsList
			}, (rej) =>{ console.log(rej) })
		},

		methods: {}
	};
</script>
<style>
	/* pages/in-out-details/in-out-details.wxss */
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

	.recordList .record .record-info {}

	.recordList .record .record-info .amount {
		line-height: 48rpx;
		font-size: 28rpx;
		height: 48rpx;
		color: #666;
	}

	.recordList .record .record-info .time {
		color: #999;
		font-size: 22rpx;
	}

	.recordList .record .type {
		color: #FFBF77;
		font-size: 34rpx;
	}

	.recordList .record .gray {
		color: #666;
	}

	.endstamp {
		color: #7D7D7D;
		text-align: center;
		margin-top: 60rpx;
		font-size: 26rpx;
	}
</style>
