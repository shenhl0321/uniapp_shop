<template>
	<view>
		<!--pages/groupbuy-details/groupbuy-details.wxml-->
		<customNavi :naviData='naviData'>拼团订单</customNavi>
		<view class="groupbuy-info">
			<view class="line1">待分享，还差1人成团</view>
			<view class="line2">剩余23:34:09</view>
			<view class="line3">
				<text>-</text>
				<view class="head-pic-content">
					<view class="head-pic"></view>
					<view class="head-pic"></view>
				</view>
				<text>-</text>
			</view>
		</view>

		<view class="prod-content">
			<view class="prod-img">
				<!-- <image src=""></image> -->
			</view>
			<view class="prod-name-sku">
				<view class="prodname">{{orderItemDtos[0]['prodName']}}</view>
				<view class="sku">{{orderItemDtos[0]['skuName'] || ''}}</view>
			</view>
			<view class="price-count">
				<view class="price">￥{{orderItemDtos[0]['price']}}</view>
				<view class="count">x{{orderItemDtos[0]['prodCount']}}</view>
			</view>
		</view>
		<view class="pay-amount">
			实付： ￥{{productTotalAmount}}
		</view>

		<view class="common invite-btn" v-if="false">邀请好友完成拼团</view>
		<view class="common go-home" v-if="false">去首页逛逛</view>
		<view class="common buy-again" v-if="true">再次购买</view>
	</view>
</template>

<script>
	// pages/order-detail/order-detail.js
	import customNavi from "@/components/custom-navi/custom-navi.vue";

	export default {
		data() {
			return {
				orderItemDtos: [],
				remarks: "",
				actualTotal: 0,
				userAddrDto: null,
				orderNumber: "",
				createTime: "",
				status: 0,
				productTotalAmount: '',
				transfee: '',
				reduceAmount: '',
				naviData: {
					ifGoBack: true
				}
			};
		},

		components: {
			customNavi
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.orderNumber = options.orderNum;
			this.loadOrderDetail(options.orderNum);
		},

		methods: {
			/**
			 * 加载订单数据
			 */
			loadOrderDetail: function(orderNum) {
				uni.showLoading(); //加载订单详情
				this.$request.get('/p/myOrder/orderDetail', {
					orderNumber: orderNum
				}).then((res) => {
					this.setData({
						orderNumber: orderNum,
						actualTotal: res.actualTotal,
						userAddrDto: res.userAddrDto,
						remarks: res.remarks,
						orderItemDtos: res.orderItemDtos,
						createTime: res.createTime,
						status: res.status,
						productTotalAmount: res.total,
						transfee: res.transfee,
						reduceAmount: res.reduceAmount
					});
					uni.hideLoading();
				}, (rej) => {
					console.log(rej)
				})
			},
			oneMoreTime: function(e) {
				var orderNumber = e.currentTarget.dataset.ordernum;
				this.$request.get('/p/order/buyAgain',{
						orderNumber
					}).then((res) =>{
						var basketIds = res.basketList;
						var shopId = res.shopId;
						this.$store.dispatch('currentShop/getShopInfo', shopId)
						uni.setStorageSync("basketIds", JSON.stringify(basketIds));
						uni.navigateTo({
							url: '/pages/submit-order/submit-order?orderEntry=0'
						});
				}, (rej) =>{ console.log(rej) })
			},
			
			// 一键复制事件
			copyBtn: function(e) {
				//#ifdef MP-WEIXIN
				uni.setClipboardData({
					data: this.orderNumber,
					success(res) {
						this.$showToast('复制成功')
					}
				});
				//#endif
				//#ifdef H5
				let oInput = document.createElement('input');
				oInput.value = this.orderNumber
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				// 复制成功提示;
				uni.showToast({
					title: '复制成功',
					icon: 'none',
					duration: 2000
				});
				oInput.remove()
				//#endif
			},
			//退款处理
			refund: function(e) {
				uni.navigateTo({
					url: '/pages/refund/refund?orderNum=' + this.orderNumber + "&index=" + e.currentTarget
						.dataset.index
				});
			},

			goGroupbuyDetails() {
				uni.navigateTo({
					url: `/pages/groupbuy-details/groupbuy-details?orderNum=${this.orderNumber}`
				});
			}

		}
	};
</script>
<style>
	/* pages/groupbuy-details/groupbuy-details.wxss */

	.groupbuy-info {
		width: 100%;
		background-color: #ffffff;
		margin-top: 30rpx;
		padding-top: 10rpx;
	}

	.groupbuy-info .line1 {
		width: 100%;
		text-align: center;
		color: #FF7E49;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
	}

	.groupbuy-info .line2 {
		color: #888888;
		width: 100%;
		text-align: center;
		font-size: 24rpx;
	}

	.groupbuy-info .line3 {
		display: flex;
		justify-content: center;
		font-size: 60rpx;
		color: #FF7E49;
		height: 80rpx;
		line-height: 80rpx;
		align-items: center;
		margin-top: 12rpx;
	}

	.groupbuy-info .head-pic-content {
		position: relative;
		display: flex;
		left: 10rpx;
		top: 5rpx;
	}

	.groupbuy-info .head-pic-content .head-pic {
		overflow: hidden;
		height: 60rpx;
		width: 60rpx;
		border: 1px solid #FF7E49;
		border-radius: 50%;
	}

	.groupbuy-info .head-pic-content .head-pic image {
		height: 60rpx;
		width: 60rpx;
	}

	.groupbuy-info .head-pic-content .head-pic:last-child {
		position: relative;
		left: -20rpx;
		background-color: #f1f1f1;
	}

	.groupbuy-info .line4 {
		height: 60rpx;
		line-height: 60rpx;
		width: 60%;
		background-color: #FFB45F;
		color: #ffffff;
		margin: 0 auto;
		border-radius: 40rpx;
		text-align: center;
		margin-top: 30rpx;
	}

	.groupbuy-info .line5 {
		width: 100%;
		text-align: center;
		color: #FF7746;
		font-size: 24rpx;
		margin: 20rpx 0 0;
		padding-bottom: 20rpx;
	}

	.prod-content {
		width: 100%;
		height: 160rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
	}

	.prod-content .prod-img {
		height: 120rpx;
		width: 120rpx;
		margin: 20rpx;
		background-color: #f1f1f1;
		border: 1px solid #f1f1f1;
	}

	.prod-content .prod-name-sku {
		font-size: 24rpx;
		width: calc(100% - 360rpx);
	}

	.prod-content .prod-name-sku view {
		margin: 12rpx 0;
	}

	.prod-content .prod-name-sku .sku {
		color: #999999;
	}

	.prod-content .price-count {
		width: 200rpx;
		text-align: right;
		box-sizing: border-box;
		padding-right: 20rpx;
	}

	.prod-content .price-count view {
		margin: 12rpx 0;
	}

	.pay-amount {
		width: 96%;
		text-align: right;
		height: 80rpx;
		line-height: 80rpx;
		border-top: 1px solid #f1f1ff;
	}


	.common {
		height: 60rpx;
		line-height: 60rpx;
		width: 60%;
		margin: 80rpx auto;
		border-radius: 40rpx;
		text-align: center;
		font-size: 28rpx;
	}

	.invite-btn {
		background-color: #FFB45F;
		color: #ffffff;
	}

	.go-home {
		border: 1px solid #FFB45F;
		color: #FFB45F;
	}

	.buy-again {
		border: 1px solid #FFB45F;
		color: #FFB45F;
	}
</style>
