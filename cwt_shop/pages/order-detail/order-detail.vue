<template>
	<view>
		<!--pages/order-detail/order-detail.wxml-->
		<customNavi :naviData='naviData'>订单详情</customNavi>
		<view class="container">

			<view class="order-detail">
				<view class="delivery-addr">
					<view class="user-info">
						<text v-if="userAddrDto.receiver" class="item">{{userAddrDto.receiver}}</text>
						<text class="item">{{userAddrDto.mobile}}</text>
					</view>
					<view v-if="userAddrDto.province" class="addr">
						{{userAddrDto.province}}{{userAddrDto.city}}{{userAddrDto.area}}{{userAddrDto.area}}{{userAddrDto.addr}}
					</view>
				</view>



				<!-- 商品信息 -->
				<view class="prod-item">
					<view class="order-num">
						<view class="shopinfo-container" @tap="goShop">
							<view class="shoplogo">
								<image src="/static/images/icon/logo.png" mode="widthFix"></image>
							</view>
							<view class="shopinfo">
								<view class="shopname">
									<text>{{shopInfo.shopName}}</text>
								</view>
								<view class="shopaddress">
									{{shopInfo.province}}{{shopInfo.city}}{{shopInfo.area}}{{shopInfo.shopAddress}}
								</view>
							</view>
						</view>
					</view>
					<block v-for="(item, index) in orderItemDtos" :key="item.prodId">
						<view class="item-cont" @tap="toProdPage" :data-prodid="item.prodId">
							<view class="prod-pic">
								<image :src="item.pic"></image>
							</view>
							<view class="prod-info">
								<view class="prodname">
									{{item.prodName}}
								</view>
								<view class="prod-info-cont">
									<text class="number">数量：{{item.prodCount}}</text>
									<text class="info-item"></text>
								</view>
								<view class="price-nums clearfix">
									<text class="prodprice"><text class="symbol">￥</text>
										<text class="big-num">{{wxs.parsePrice(item.price)[0]}}</text>
										<text class="small-num">.{{wxs.parsePrice(item.price)[1]}}</text></text>
									<view class="btn-box">
										<!-- <text class='btn' bindtap="refund" data-index="{{index}}">申请售后</text> -->
										<!-- <text class='btn' data-index="{{index}}">申请售后</text>
                <text class='btn'>加购物车</text> -->
									</view>
								</view>
							</view>
						</view>
					</block>

					<!-- 					<view class="prod-foot">
						<view class="btn">
							<button v-if="item.status==1" class="button" @tap="onCancelOrder" :data-ordernum="item.primaryOrderNo"
							 hover-class="none">取消订单</button>
							<button v-if="item.status==1" class="button warn" @tap="onConfirmReceive" :data-ordernum="item.primaryOrderNo"
							 hover-class="none">再次购买</button>
							<button v-if="item.status==1" class="button warn" @tap="onPayAgain" :data-ordernum="item.primaryOrderNo"
							 hover-class="none">付款</button>
							<button v-if="item.status==3 || item.status==5" class="button" @tap="toDeliveryPage" :data-ordernum="item.primaryOrderNo"
							 hover-class="none">查看物流</button>
							<button v-if="item.status==3" class="button warn" @tap="onConfirmReceive" :data-ordernum="item.primaryOrderNo"
							 hover-class="none">确认收货</button>
						</view>
					</view> -->
				</view>

				<!-- 订单信息 -->
				<view class="order-msg">
					<view class="msg-item">
						<view class="item">
							<text class="item-tit">订单编号：</text>
							<text class="item-txt">{{orderNumber}}</text>
							<text class="copy-btn" @tap="copyBtn">复制</text>
						</view>
						<view class="item">
							<text class="item-tit">下单时间：</text>
							<text class="item-txt">{{createTime}}</text>
						</view>
					</view>
					<view class="msg-item">
						<view class="item">
							<text class="item-tit">支付方式：</text>
							<text class="item-txt">微信支付</text>
						</view>
						<view class="item">
							<text class="item-tit">配送方式：</text>
							<text class="item-txt">普通配送</text>
						</view>
						<view class="item">
							<text class="item-tit">订单备注：</text>
							<text class="item-txt">{{remarks|| '暂无'}}</text>
						</view>
					</view>
				</view>

				<view class="order-msg">
					<view class="msg-item">
						<view class="item">
							<view class="item-tit">订单总额：</view>
							<view class="item-txt price">
								<text class="symbol">￥</text>
								<text class="big-num">{{wxs.parsePrice(productTotalAmount)[0]}}</text>
								<text class="small-num">.{{wxs.parsePrice(productTotalAmount)[1]}}</text>
							</view>
						</view>
						<view class="item">
							<view class="item-tit">运费：</view>
							<view v-if="transfee" class="item-txt price">
								<text class="symbol">￥</text>
								<text class="big-num">{{wxs.parsePrice(transfee)[0]}}</text>
								<text class="small-num">.{{wxs.parsePrice(transfee)[1]}}</text>
							</view>
							<view v-else class="item-txt price">
								<text class="small-num">免配送费</text>
							</view>
						</view>
						<view class="item">
							<view class="item-tit">优惠券：</view>
							<view v-if="reduceAmount" class="item-txt price">
								<text class="symbol">-￥</text>
								<text class="big-num">{{wxs.parsePrice(reduceAmount)[0]}}</text>
								<text class="small-num">.{{wxs.parsePrice(reduceAmount)[1]}}</text>
							</view>
							<view v-else class="item-txt price">
								<!-- <text class='symbol'>-￥</text>
            <text class='big-num'>{{-wxs.parsePrice(reduceAmount)[0]}}</text> -->
								<text class="small-num">无</text>
							</view>
						</view>
						<view class="item payment">
							<view class="item-txt price total">
								实付款：
								<text class="symbol">￥</text>
								<text class="big-num">{{wxs.parsePrice(actualTotal)[0]}}</text>
								<text class="small-num">.{{wxs.parsePrice(actualTotal)[1]}}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 底部栏 -->
				<view class="order-detail-footer">
					<text class="dele-order" v-if="status==5||status==6">删除订单</text>
					<view class="footer-box">
						<text class="apply-service" :data-mobile="shopInfo.mobile" @tap="makephonecall">联系商家</text>
						<text @tap="oneMoreTime" :data-ordernum="orderNumber" class="buy-again">再次购买</text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script src="../../wxs/number.js"></script>

<script>
	// pages/order-detail/order-detail.js
	import customNavi from "@/components/custom-navi/custom-navi";

	export default {
		data() {
			return {
				naviData: {
					ifGoBack: true
				},
				orderItemDtos: [],
				remarks: "",
				actualTotal: 0,
				userAddrDto: {},
				orderNumber: "",
				createTime: "",
				status: 0,
				productTotalAmount: '',
				transfee: '',
				reduceAmount: '',
				actualTotal: '',
				prodid: '',
				title: "我的订单",
				style: {
					backgroundColor: '#FFBF77',
					color: 'white'
				},
				showShopInfo: false,
				showOrder: false
			};
		},

		components: {
			customNavi
		},
		props: {},

		computed: {
			shopInfo() {
				return this.$store.state.currentShop.shopInfo
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.loadOrderDetail(options.orderNum);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

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
			//跳转商品详情页
			toProdPage: function(e) {
				var prodid = e.currentTarget.dataset.prodid;
				uni.navigateTo({
					url: '/pages/prod/prod?prodid=' + prodid
				});
			},

			/**
			 * 加载订单数据
			 */
			loadOrderDetail: function(orderNumber) {
				uni.showLoading(); //加载订单详情
				console.log(orderNumber)
				this.$request.get("/p/myOrder/orderDetail", {
					orderNumber
				}).then((res) => {
					this.setData({
						orderNumber: orderNumber,
						actualTotal: res.actualTotal,
						userAddrDto: res.userAddrDto,
						remarks: res.remarks,
						orderItemDtos: res.orderItemDtos,
						createTime: res.createTime,
						status: res.status,
						productTotalAmount: res.total,
						transfee: res.transfee,
						reduceAmount: res.reduceAmount,
						actualTotal: res.actualTotal
					});
					uni.hideLoading();
				}, (rej) => {
					console.log(rej)
				})
			},

			makephonecall: function(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.mobile,
					//这个是我的手机号，模拟测试
					success: () => {
						uni.nextTick(() => {
							this.setData({
								showShopInfo: true,
								showOrder: false
							});
						});
					},
					fail: () => {
						uni.nextTick(() => {
							this.setData({
								showShopInfo: true,
								showOrder: false
							});
						});
					}
				});
			},
			goShop: function() {
				getApp().shopId = this.shopInfo.shopId;
				getApp().shopInfo = this.shopInfo;
				uni.navigateTo({
					url: '/pages/category/category'
				});
			},
			oneMoreTime: function(e) {
				var orderNumber = e.currentTarget.dataset.ordernum;
				this.$request.get('/p/order/buyAgain', {
					orderNumber
				}).then((res) => {
					var basketIds = res.basketList;
					var shopId = res.shopId;
					this.$store.dispatch('currentShop/getShopInfo', [shopId, this])
					uni.setStorageSync("basketIds", JSON.stringify(basketIds));
					uni.navigateTo({
						url: '/pages/submit-order/submit-order?orderEntry=0'
					});
				}, (rej) => {
					console.log(rej)
				})
			},
			// 一键复制事件
			copyBtn: function(e) {
				var ths = this;
				uni.setClipboardData({
					//准备复制的数据
					data: ths.orderNumber,
					success: function(res) {
						uni.showToast({
							title: '复制成功'
						});
					}
				});
			},
			//退款处理
			refund: function(e) {
				uni.navigateTo({
					url: '/pages/refund/refund?orderNum=' + this.orderNumber + "&index=" + e.currentTarget
						.dataset.index
				});
			}
		}
	};
</script>
<style>
	/* pages/order-detail/order-detail.wxss */

	page {
		background: #f4f4f4;
	}

	.shopinfo-container {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 30rpx;
		border-bottom: 1px solid #F9F9F9;
	}

	.shopinfo-container .shoplogo image {
		width: 70rpx;
	}

	.shopinfo {
		margin-left: 14rpx;
	}

	.shopinfo-container .shopname {
		margin-bottom: 8rpx;
	}

	.shopinfo-container .shopaddress {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #A3A3A3;
	}

	.order-detail {
		margin-bottom: 120rpx;
	}

	.order-detail .delivery-addr {
		padding: 20rpx 30rpx;
		background: #fff;
	}

	.order-detail .delivery-addr .user-info {
		line-height: 48rpx;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.order-detail .delivery-addr .user-info .item {
		font-size: 28rpx;
		margin-right: 30rpx;
		vertical-align: top;
		display: inline-block;
	}

	.order-detail .delivery-addr .addr {
		font-size: 26rpx;
		line-height: 36rpx;
		color: #999;
	}

	/* 商品列表 */

	.prod-item {
		background-color: #fff;
		margin-top: 15rpx;
		font-size: 28rpx;
	}

	.prod-item .item-cont .prod-pic image {
		width: 180rpx;
		height: 180rpx;
	}

	.prod-item .item-cont {
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-top: 2rpx solid #f1f1f1;
	}

	.prod-item .item-cont .prod-pic {
		font-size: 0;
		display: block;
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
		background: #fff;
		margin-right: 16rpx;
	}

	.prod-item .item-cont .prod-pic image {
		width: 100%;
		height: 100%;
	}

	.prod-item .item-cont .prod-info {
		margin-left: 10rpx;
		font-size: 28rpx;
		width: 100%;
		position: relative;
		height: 80px;
		-webkit-flex: 1;
		-ms-flex: 1;
		-webkit-box-flex: 1;
		-moz-box-flex: 1;
		flex: 1;
	}

	.prod-item .item-cont .prod-info .prodname {
		font-size: 28rpx;
		line-height: 40rpx;
		max-height: 86rpx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		word-break: break-all;
	}

	.prod-item .item-cont .prod-info .prod-info-cont {
		position: relative;
		color: #999;
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.prod-item .item-cont .prod-info .prod-info-cont .info-item {
		color: #999;
		height: 28rpx;
		margin-top: 10rpx;
		font-size: 24rpx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		word-break: break-all;
		width: 70%;
	}

	.prod-item .item-cont .prod-info .prod-info-cont .number {
		float: left;
		margin-right: 20rpx;
	}

	.prod-item .price-nums {
		margin-top: 30rpx;
	}

	.prod-item .price-nums .prodprice {
		color: #333;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		float: left;
	}

	.prod-item .price-nums .btn-box {
		float: right;
		text-align: right;
	}

	.prod-item .price-nums .btn-box .btn {
		padding: 6rpx 30rpx;
		line-height: 36rpx;
		margin-left: 20rpx;
		font-size: 24rpx;
		display: inline-block;
		border: 2rpx solid #e4e4e4;
		border-radius: 50rpx;
	}

	/* 
订单信息 */

	.order-msg {
		background: #fff;
		margin-top: 15rpx;
		font-size: 28rpx;
	}

	.order-msg .msg-item {
		padding: 20rpx;
		border-top: 2rpx solid #f1f1f1;
	}

	.order-msg .msg-item:first-child {
		border: 0;
	}

	.order-msg .msg-item .item {
		display: flex;
		padding: 10rpx 0;
		align-items: center;
	}

	.order-msg .msg-item .item.payment {
		border-top: 2rpx solid #f1f1f1;
		color: #eb2444;
		padding-top: 30rpx;
	}

	.order-msg .msg-item .item .item-tit {
		color: #999;
		line-height: 48rpx;
	}

	.order-msg .msg-item .item .item-txt {
		flex: 1;
		line-height: 48rpx;

	}

	.order-msg .msg-item .item .copy-btn {
		display: block;
		margin-left: 20rpx;
		border: 2rpx solid #FFBF77;
		padding: 8rpx 20rpx 6rpx;
		border-radius: 50rpx;
		font-size: 24rpx;
		line-height: 28rpx;
		color: #FFBF77;
	}

	.order-msg .msg-item .item .item-txt.price {
		text-align: right;
	}

	.order-msg .msg-item .item .item-txt.total {
		color: #D81E06;
	}

	/* 底部栏 */

	.order-detail-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 750rpx;
		background: #fff;
		margin: auto;
		display: -webkit-flex;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		padding: 22rpx 0;
		font-size: 26rpx;
		box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
	}

	.order-detail-footer .dele-order {
		margin-left: 20rpx;
		line-height: 60rpx;
		display: block;
		margin-right: 20rpx;
		width: 150rpx;
		text-align: center;
	}

	.order-detail-footer .footer-box {
		flex: 1;
		text-align: right;
		line-height: 60rpx;
	}

	.order-detail-footer .footer-box .buy-again {
		font-size: 26rpx;
		color: #fff;
		background: #D81E06;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
		margin-right: 20rpx;
		vertical-align: middle;
		border: 1px solid #D81E06;
	}

	.order-detail-footer .footer-box .apply-service {
		font-size: 26rpx;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
		border: 1px solid #e4e4e4;
		margin-right: 20rpx;
		color: #666;
	}

	.clearfix:after {
		content: " ";
		display: table;
		clear: both;
	}

	/* 根据状态显示不同的颜色 */

	.order-state {
		height: 70rpx;
		line-height: 70rpx;
		text-align: right;
		margin-right: 20rpx;
	}

	.order-state .order-sts {
		color: #eb2444;
		font-size: 28rpx;
	}

	.order-state .order-sts.gray {
		color: #999;
		height: 32rpx;
		line-height: 32rpx;
	}

	.order-state .order-sts.normal {
		color: #333;
	}
</style>
