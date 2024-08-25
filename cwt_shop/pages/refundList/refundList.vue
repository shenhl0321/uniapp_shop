<template>
	<view>
		<!--pages/refundList/refundList.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>

		<view class="main">
			<view class="empty" v-if="refundList.length==0">
				还没有任何相关订单
			</view>
			<!-- 订单列表 -->
			<block v-for="(item, index) in refundList" :key="index">
				<!-- <view class='prod-item'> -->
				<view class="prod-item">
					<view class="order-num">
						<view>
							<text>{{item.shopName?item.shopName:'小象智慧门店专卖'}}</text>
							<image mode="widthFix" class="more" src="/static/images/icon/more01.png"></image>
						</view>
						<view class="order-state">
							<view class="gray">
								{{item.refundState==1?'退款中':(item.refundState==2?'退款成功':'退款失败')}}
							</view>
						</view>
					</view>

					<!-- 商品列表 -->
					<!-- 一个订单单个商品的显示 -->
					<block>
						<block v-for="(prod, index2) in item.orderItemDtos" :key="index2">
							<view>
								<view class="item-cont" :data-ordernum="item.orderNumber">
									<view class="prod-pic">
										<image :src="prod.pic"></image>
									</view>
									<view class="prod-info">
										<view class="prodname-price">
											<view class="prodname">{{prod.prodName}}</view>
											<view class="prodprice">
												<text class="small">￥</text>
												<text class="bignum">{{prod.price}}</text>
											</view>
										</view>
										<view class="prod-info-cont">
											<view class="skuname">{{prod.skuName?prod.skuName: '默认规格'}}</view>
											<view class="actualTotal">
												<text class="small">x</text>
												<text class="bignum">{{prod.prodCount}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</block>
					<!-- 一个订单多个商品时的显示 -->

					<view class="total-num">
						<!-- <text class="prodcount">共{{item.actualTotal}}件商品</text> -->
						<view class="prodprice">
							<text>退款金额：</text>
							<!-- <text class='symbol'></text> -->
							<text class="big-num">￥{{item.actualTotal}}</text>
							<text class="small-num"></text>
							<!-- <text class="transferfree">(免配送费)</text> -->
						</view>
					</view>
					<!-- end 商品列表 -->
					<view class="prod-foot">
						<view class="btn">
							<!-- <text class="button warn" bindtap="" data-ordernum="{{item.orderNumber}}" bindtap='toOrderDetailPage' hover-class='none'>查看详情</text> -->
							<text v-if="item.refundState==1" class="button warn" :data-ordernum="item.orderNumber"
								hover-class="none">商家审核中</text>
							<text v-if="item.orderState==1 && item.refundState==2" class="button"
								:data-ordernum="item.orderNumber" hover-class="none" @tap="delOrderList">删除订单</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				title: "售后/退款",
				style: {
					backgroundColor: '#FFBF77',
					color: 'white'
				},
				refundList: [] // refundList: [
					//   {actualTotal: 1,
					//   orderItemDtos: [{
					//     pic: "https://images.51xeld.com/2020/07/ce51f388ee4346dba47e294cc06ce64e.png",
					//     price: 1,
					//     prodCount: 1,
					//     prodName: "燕麦酥",
					//     skuName: "",
					//   },],
					//   orderNumber: "1285759188710068224",
					//   orderState: 0,
					//   refundState: 0,
					//   shopName: "亚米小店1",
					//   status: 1,}
					// ]
					,
				current: "",
				pages: ""
			};
		},

		components: {
			navigation
		},
		onShow: function() {
			this.getRefundList(1);
		},

		onPullDownRefresh: function() {
			this.getRefundList(1)
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (this.current < this.pages) {
				this.getRefundList(this.current + 1);
			}
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			getRefundList: function(current) {
				console.log('Runing');
				var current = current ? current : 1;
				uni.showLoading();
				this.$request.get("/p/myOrder/refundOrder", {
					current: current,
					size: 10
				}).then((res) => {
					uni.hideLoading();
					var refundList = this.refundList;

					if (current == 1) {
						refundList = res.records;
					} else {
						refundList.concat(res.records);
					}

					this.setData({
						refundList,
						current,
						pages: res.pages
					});

				}, (rej) => {
					console.log(rej)
				})
			},
			toOrderDetailPage: function(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/order-detail/order-detail?orderNum=' + e.currentTarget.dataset.ordernum
				});
			},
			//删除已完成||已取消的订单
			delOrderList: function(e) {
				var ths = this;
				uni.showModal({
					title: '',
					content: '确定要删除此订单吗？',
					confirmColor: "#eb2444",

					success(res) {
						if (res.confirm) {
							var ordernum = e.currentTarget.dataset.ordernum;
							uni.showLoading();
							this.$request.delete("/p/myOrder/" + ordernum, ).then((res) => {
								ths.getRefundList();
								uni.hideLoading();
							}, (rej) => {
								console.log(rej)
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				});
			}
		}
	};
</script>
<style>
	/* pages/refundList/refundList.wxss */

	page {
		background-color: #f4f4f4;
		color: #333;
	}

	.main {
		padding-bottom: 45rpx;
	}

	.empty {
		font-size: 28rpx;
		margin-top: 100rpx;
		text-align: center;
		color: #999;
		height: 300rpx;
		line-height: 300rpx;
	}

	/* 商品列表 */

	.prod-item {
		background-color: #fff;
		margin: 40rpx auto 0;
		font-size: 28rpx;
		width: 94%;
		border-radius: 12rpx;
		box-shadow: 0px 0 8px rgba(148, 148, 148, 0.17);
	}

	.prod-item .item-cont .prod-pic image {
		width: 180rpx;
		height: 180rpx;
	}

	.prod-item .order-num {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		font-size: 28rpx;
	}

	.order-num text {
		vertical-align: middle;
	}

	.order-num .more {
		display: inline-block;
		width: 12rpx;
		vertical-align: middle;
		margin-left: 15rpx;
	}

	.prod-item .item-cont .categories {
		white-space: nowrap;
	}

	.prod-item .item-cont {
		display: flex;
		align-items: center;
		width: 93%;
		margin: 0 auto;
		padding: 0rpx 0 30rpx;
		border-radius: 10rpx;
	}

	.prod-item .item-cont .prod-pic {
		font-size: 0;
		display: inline-block;
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
		background: #fff;
		margin-right: 16rpx;
	}

	.prod-item .item-cont .prod-pic image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.prod-item .item-cont .prod-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10rpx;
		font-size: 28rpx;
		width: 70%;
		position: relative;
		height: 160rpx;
	}

	.prod-item .item-cont .prod-info .prodname-price {
		font-size: 28rpx;
		line-height: 36rpx;
		max-height: 86rpx;
		display: flex;
		justify-content: space-between;
		width: 100%;

	}

	.prodname-price .prodprice {
		padding-top: 20rpx;
		color: #444;
	}

	.prod-item .item-cont .prod-info .prodname-price .prodprice .small {
		font-size: 26rpx;
	}

	.prod-item .item-cont .prod-info .prodname-price .prodprice .bignum {
		font-size: 36rpx;
	}


	.prod-item .item-cont .prod-info .prod-info-cont {
		color: #999;
		line-height: 40rpx;
		margin-top: 10rpx;
		font-size: 26rpx;
		display: flex;
		justify-content: space-between;
	}

	.prod-item .total-num {
		width: 93%;
		margin: 0 auto;
		text-align: right;
		font-size: 28rpx;
		border-top: 2rpx solid #f5f5f5;
		padding: 25rpx 10rpx 5rpx 0;
		box-sizing: border-box;
	}

	.prod-item .price-nums .prodprice {
		color: #333;
		position: absolute;
		bottom: 0;
	}

	.prodname-price .prodprice {}

	.prod-item .price-nums .prodcount {
		position: absolute;
		bottom: 5rpx;
		right: 0;
		color: #999;
		font-family: verdana;
	}

	.prod-item .total-num .prodprice {
		display: inline-block;
		color: #444;
	}

	.prod-item .total-num .prodcount {
		margin-right: 20rpx;
	}

	.prod-item .prod-foot {
		padding: 20rpx 30rpx 25rpx;
	}

	.prod-item .prod-foot .total {
		font-size: 25rpx;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #e9eaec;
	}

	.transferfree {
		color: #A5A5A5;
		padding-left: 18rpx;
	}

	.prod-item .prod-foot .btn {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.button {
		margin-left: 10px;
		font-size: 30rpx;
		background: #fff;
		padding: 0 30rpx;
		height: 62rpx;
		line-height: 62rpx;
		text-align: center;
		border-radius: 80rpx;
		border: 1px solid #e1e1e1;
		vertical-align: middle;
		color: #666;
	}

	.button.warn {
		color: #FFBF77;
		border-color: #FFBF77;
	}

	.big-num {
		font-size: 32rpx;
		color: #D71E06;
	}
</style>
