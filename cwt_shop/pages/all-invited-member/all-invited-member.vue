<template>
	<view>
		<!--pages/all-invited-member/all-invited-member.wxml-->
		<customNavi :naviData='naviData'>累计邀请</customNavi>

		<view v-if="spreadList.length>0" class="container">
			<block v-for="(item, index) in spreadList" :key="index">
				<view class="member">
					<view class="leftbar">
						<view class="member-head">
							<image :src="item.pic" mode="aspeciFit"></image>
						</view>
						<view class="member-info">
							<view class="nickname">{{item.name}}</view>
							<view class="orders">已结算订单：{{item.number}}</view>
						</view>
					</view>
					<view class="member-state">
						<view v-if="item.number>0" class="state">有效</view>
						<view v-if="item.number<=0" class="state">无效</view>
						<view class="commssion">
							<text class="tit">累计奖励：</text>
							<text class="amount">{{item.rebateMoney?item.rebateMoney: 0}}</text>
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
	// pages/all-invited-member/all-invited-member.js
	import customNavi from '@/components/custom-navi/custom-navi.vue'
	export default {
		data() {
			return {
				naviData: {
					ifGoBack: true
				},
				spreadList: [],
			};
		},

		components: {
			customNavi
		},
		props: {},

		onLoad: function(options) {
			this.loadData()
		},
				
		methods:{
			async loadData() {
				let res = await this.$request.get("/Spread/getCumulativeInvitation")
				this.spreadList = res.spreadList
			}
		}
	};
</script>
<style>
	/* pages/all-invited-member/all-invited-member.wxss */

	page {
		background-color: #F7F4F8;
	}

	.container {
		box-sizing: border-box;
		padding: 0 3%;
	}

	.container .member {
		width: 100%;
		background-color: #fff;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 200rpx;
		font-size: 26rpx;
		position: relative;
		border-radius: 12rpx;
	}

	.container .member .leftbar {
		display: flex;
	}

	.container .member .member-head {
		margin: 20rpx;
	}

	.container .member image {
		height: 140rpx;
		width: 140rpx;
		border-radius: 50%;
	}

	.container .member-info>view {
		margin: 40rpx 0;
	}

	.container .member-info .nickname {
		color: #7D7A7D;
		font-size: 32rpx;

	}

	.container .member-info .orders {
		color: #9D9A9D;
	}

	.container .member .member-state {
		text-align: right;
		margin-right: 30rpx;
	}

	.container .member .member-state>view {
		margin: 40rpx 0;
	}

	.container .member .member-state .state {
		color: #FFBF7A;
	}

	.container .member .member-state .commssion .tit {
		color: #9D9A9D;
	}

	.none {
		height: 100%;
		width: 100%;
		margin: 30% auto;
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
