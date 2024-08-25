<template>
	<view>
		<customNavi :naviData='naviData'>账单记录</customNavi>
		<view class="list">
			<view class="bills" v-for="item in bills">
				<view class="shop-pic"></view>
				<view class="order-info">
					<view class="shopname">
						{{item.shopName}}
					</view>
					<view class="createtime">
						交易时间： {{item.createTime}}
					</view>
					<view class="order-number">
						交易编号： {{item.orderNumber}}
					</view>
				</view>
				<view class="summary">
					<view class="title">
						{{item.type == 1?'消费':(item.type==2?'充值':'退款')}}
					</view>
					<view class="order-amount">
						{{item.type == 1?'-':''}}{{(item.amount).toFixed(1)}}
					</view>
					<view class="balance">
						余额：{{item.accountBalance}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import customNavi from '@/components/custom-navi/custom-navi.vue'
	import {
		bills
	} from './mock.js'
	export default {
		data() {
			return {
				naviData: {
					ifGoBack: true,
					customStyle: {
						// 'font-size' : '50rpx'
					}
				},
				bills: bills,
			};
		},
		components: {
			customNavi
		},
		created() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.$request.get('/p/user/getAccountBalance').then(res => {
					console.log(res)
					this.bills = res
				}).catch(err =>{
					console.log(err)
					this.$showToast('网络出错，请稍后重试')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FAFAFA;
	}

	.list {
		width: 100%;
		padding-bottom: 150rpx;

		.bills {
			width: 96%;
			margin: 20rpx auto 0;
			display: flex;
			align-items: center;
			height: 170rpx;
			font-size: 24rpx;
			background-color: #FFFFFF;
			box-shadow: 6rpx 6rpx 12rpx #dddddd;
			border-radius: 12rpx;
			box-sizing: border-box;
			padding: 16rpx;
			color: #AAAAAA;
			position: relative;

			.shop-pic {
				background-image: url(../../static/images/icon/logo.png);
				background-color: #FFFFFF;
				background-repeat: no-repeat;
				background-position: 24rpx 16rpx;
				background-size: 50%;
				border: 4rpx solid #FFDBB3;
				border-radius: 50%;
				height: 110rpx;
				width: 110rpx;
			}
			.order-info{
				margin-left: 20rpx;
				.shopname{
					font-size: 30rpx;
					color: #555555;
				}
				view{
					margin: 12rpx 0;
				}
			}
			.summary{
				position: absolute;
				right: 28rpx;
				text-align: right;
				.title{
					font-size: 28rpx;
					color: #333333;
				}
				.order-amount{
					color: #F56B49;
					font-size: 34rpx;
				}
				view{
					margin: 8rpx;
				}
			}
		}
	}
</style>
