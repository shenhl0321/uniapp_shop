<template>
	<!--pages/groupbuy-submit/groupbuy-submit.wxml-->
	<view class="container">
		<view class="main-content">
			<view class="page-head">
				<navigation :title="title" :naviStyle="style" style="width:100%;" :ifShowBtn="!ifShowGoHome"
					:ifShowGoHome="ifShowGoHome"></navigation>
				<view class="order-info status1" v-if="orderState==0&&status==1&&groupbuyInfo.ptStatus == 2">
					<view>拼团中，待支付</view>
					<view class="small-font">支付超时，订单将自动取消</view>
					<image src="/static/images/icon/to-be-pay.png" class="diliver-type" mode="aspectFit"></image>
				</view>
				<view class="order-info status2" v-else-if="status==2 && groupbuyInfo.ptStatus==0">
					<view>拼团中，已支付</view>
					<view class="small-font">邀请一位好友，即可完成拼团</view>
					<image src="/static/images/icon/groupbuy-success.png" class="diliver-type" mode="aspectFit"></image>
				</view>
				<view class="order-info status2" v-else-if="groupbuyInfo.ptStatus==2">
					<view>拼团失败</view>
					<view class="small-font">您可以重新发起拼团或参与他人的团</view>
					<image src="/static/images/icon/groupbuy-failed.png" class="diliver-type" mode="aspectFit"></image>
				</view>
				<view class="order-info status2" v-else-if="status==2 && groupbuyInfo.ptStatus== 1">
					<view>拼团成功，已支付</view>
					<view class="small-font">请耐心等待买家发货</view>
					<image src="/static/images/icon/to-be-dilivered.png" class="diliver-type" mode="aspectFit"></image>
				</view>

			</view>

			<view class="groupbuy-info" v-if="status!==1">
				<view v-if="groupbuyInfo.ptStatus==0">
					<view class="line0">
						<image src="/static/images/icon/left-dot.png"></image>
						<text>拼团详情</text>
						<image src="/static/images/icon/right-dot.png"></image>
					</view>
					<view style="width:100%;text-align:center;color:#FB5E1F;font-size:26rpx;margin-bottom:12rpx">
						待分享，还差一人成团</view>
					<view class="line2" style="color:#aeaeae;">剩余{{leftTime}}</view>
					<view class="line3">
						<text>-</text>
						<view class="head-pic-content">
							<view class="head-pic">
								<image :src="groupbuyInfo.userList[0].pic" mode="aspectFit"></image>
							</view>
							<view class="head-pic gray">
								<image v-if="groupbuyInfo.userList.length==2" :src="groupbuyInfo.userList[1].pic"
									mode="aspectFit"></image>
								<image v-else src="/static/images/icon/head.png" mode="aspectFit"></image>
							</view>
						</view>
						<text>-</text>
					</view>
					<view class="line4" @tap="formSubmit">邀请好友完成拼团</view>
				</view>
				<view v-if="groupbuyInfo.ptStatus==1">
					<view class="line0">
						<image src="/static/images/icon/left-dot.png"></image>
						<text>拼团详情</text>
						<image src="/static/images/icon/right-dot.png"></image>
					</view>
					<view class="line2">
						<view>已成团</view>
						<view style="margin-top:12rpx;color:#aaa">预计48小时内发货</view>
					</view>
					<view class="line3">
						<text>-</text>
						<view class="head-pic-content">
							<view class="head-pic">
								<image :src="groupbuyInfo.userList[0].pic" mode="aspectFit"></image>
							</view>
							<view class="head-pic gray">
								<image v-if="groupbuyInfo.userList.length==2" :src="groupbuyInfo.userList[1].pic"
									mode="aspectFit"></image>
								<image v-else src="/static/images/icon/head.png" mode="aspectFit"></image>
							</view>
						</view>
						<text>-</text>
					</view>
					<view class="line4 statusNot1" @tap="goHome">去首页逛逛</view>
				</view>
				<view v-if="groupbuyInfo.ptStatus==2">
					<view class="line0">
						<image src="/static/images/icon/left-dot.png"></image>
						<text>拼团详情</text>
						<image src="/static/images/icon/right-dot.png"></image>
					</view>
					<view class="line2 groupbuy-failed-line2">拼团超时</view>
					<view class="groupbuy-failed-line3">退款预计在24小时内到账</view>
					<view class="groupbuy-failed-line4">
						<image src="/static/images/icon/cry.png"></image>
					</view>
					<view class="line4 statusNot1" @tap="goPordPage">再次开团</view>
				</view>
			</view>

			<view class="address">
				<view class="addr-icon">
					<image src="/static/images/icon/location.png" mode="aspectFit"></image>
				</view>
				<view class="receiver-addr">
					<view class="username-mobile">
						<text>收货人：{{userAddrDto.receiver}}</text>
						<text>{{userAddrDto.mobile}}</text>
					</view>
					<view class="addr">
						收货地址：{{userAddrDto.province}}{{userAddrDto.city}}{{userAddrDto.area}}{{userAddrDto.addr}}
					</view>
				</view>
				<view class="more-icon">
					<image src="/static/images/icon/more01.png" mode="aspectFit"></image>
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
				<block v-for="(item, index) in orderItemDtos" :key="index">
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

				<view class="prod-foot">
					<view class="btn">
						<button v-if="item.status==1" class="button" @tap="onCancelOrder"
							:data-ordernum="item.primaryOrderNo" hover-class="none">取消订单</button>
						<button v-if="item.status==1" class="button warn" @tap="onConfirmReceive"
							:data-ordernum="item.primaryOrderNo" hover-class="none">再次购买</button>
						<button v-if="item.status==1" class="button warn" @tap="onPayAgain"
							:data-ordernum="item.primaryOrderNo" hover-class="none">付款</button>
						<button v-if="item.status==3 || item.status==5" class="button" @tap="toDeliveryPage"
							:data-ordernum="item.primaryOrderNo" hover-class="none">查看物流</button>
						<button v-if="item.status==3" class="button warn" @tap="onConfirmReceive"
							:data-ordernum="item.primaryOrderNo" hover-class="none">确认收货</button>
					</view>
				</view>
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
						<text class="item-txt">{{remarks}}</text>
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
						<view v-if="transfee!==0" class="item-txt price">
							<text class="symbol">￥</text>
							<text class="big-num">{{wxs.parsePrice(transfee)[0]}}</text>
							<text class="small-num">.{{wxs.parsePrice(transfee)[1]}}</text>
						</view>
						<view v-if="transfee==0" class="item-txt price">
							<text class="small-num">免配送费</text>
						</view>
					</view>
					<view class="item">
						<view class="item-tit">优惠券：</view>
						<view v-if="reduceAmount!==0" class="item-txt price">
							<text class="symbol">-￥</text>
							<text class="big-num">{{wxs.parsePrice(reduceAmount)[0]}}</text>
							<text class="small-num">.{{wxs.parsePrice(reduceAmount)[1]}}</text>
						</view>
						<view v-if="reduceAmount==0" class="item-txt price">
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
		</view>
		<!-- 底部栏 -->
		<view class="order-detail-footer">
			<text class="dele-order" v-if="status==5||status==6">删除订单</text>
			<view class="footer-box">
				<text class="apply-service" :data-mobile="shopInfo.mobile" @tap="makephonecall">联系商家</text>
				<text @tap="oneMoreTime" :data-ordernum="orderNumber" class="buy-again">再次购买</text>
			</view>
		</view>

		<view class="imagePathBox" :hidden="maskHidden == false">
			<view :hidden="maskHidden == false" class="mask" @tap="closeImage"></view>
			<image :src="imagePath" class="shengcheng" :style="'height:' + (screenWidth*0.9*1.8) + 'px'"></image>
			<button class="baocun" open-type="share" @tap="baocun">点击保存至相册,分享到朋友圈</button>
		</view>
		<view class="canvas-box">
			<canvas :style="'width:' + screenWidth + 'px;height:' + (screenWidth*1.8) + 'px;position:fixed;top:9999px'"
				canvas-id="mycanvas"></canvas>
		</view>
	</view>
</template>

<script src="../../wxs/number.js"></script>

<script>
	// pages/order-detail/order-detail.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				maskHidden: false,
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
				actualTotal: '',
				prodid: '',
				title: "拼团订单",
				ifShowGoHome: false,
				style: {
					backgroundColor: '#fdbe78',
					color: 'white'
				},
				screenWidth: "",
				screenHeight: "",
				ptglid: "",
				orderState: "",
				groupbuyInfo: "",
				leftSecond: "",
				leftTime: "",
				showShopInfo: false,
				showOrder: false,
				imagePath: "",
				qrcodePath: "",
				backImg: ""
			};
		},

		components: {
			navigation
		},

		computed: {
			shopInfo() {
				return this.$store.state.currentShop.shopInfo
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options);

			if (options.enterFrom == 'submit') {
				this.setData({
					ifShowGoHome: true
				});
			}
			this.loadOrderDetail(options.orderNum);
			this.getBackImg();
			this.getSysInfo();
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

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			let ptglid = this.ptglid;
			let shopId = this.shopInfo.shopId;
			let prodId = this.orderItemDtos[0].prodId;
			let title = this.orderItemDtos[0].prodName;
			let path = `/pages/groupbuy/groupbuy?scene=${ptglid}-${prodId}-${shopId}`; // setTimeout(() =>{      

			return {
				title,
				path
			}; // },3000)
		},
		methods: {
			//跳转商品详情页
			toProdPage: function(e) {
				var prodid = e.currentTarget.dataset.prodid;
				uni.navigateTo({
					url: '/pages/prod/prod?prodid=' + prodid
				});
			},

			getSysInfo() {
				uni.getSystemInfo({
					success: result => {
						this.setData({
							screenWidth: result.screenWidth,
							screenHeight: result.screenHeight
						});
					}
				});
			},

			/**
			 * 加载订单数据
			 */
			loadOrderDetail: function(orderNum) {
				this.$request.get("/p/myOrder/orderDetail", {
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
						reduceAmount: res.reduceAmount,
						actualTotal: res.actualTotal,
						ptglid: res.ptglid,
						orderState: res.orderState
					});
					this.loadGroupbuyInfo(res.ptglid);
					this.getPosterWxCode(res.ptglid, res.orderItemDtos[0].prodId, res.shopId)
				}, (rej) => {
					console.log(rej)
				})
			},

			loadGroupbuyInfo(ptglid) {
				this.$request.get('/makeUpGroup/getPtStatus', {
					ptglid
				}).then((res) => {
					this.groupbuyInfo = res
					if (res.ptStatus == 0) {
						let ktTime = res.ktTime.replace(/\-/g, '/');
						let leftSecond = res.duration * 24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(
							ktTime));
						this.setData({
							leftSecond
						});
						setInterval(() => {
							let leftSecond = this.leftSecond;
							let second = Math.floor(leftSecond / 1000) % 60;
							second = (second == 0 ? '00' : second < 10 ? '0' + second : second)
								.toString();
							let minute = Math.floor(leftSecond / 1000 / 60) % 60;
							minute = (minute == 0 ? '00' : minute < 10 ? '0' + minute : minute)
								.toString();
							let hour = Math.floor(leftSecond / 1000 / 60 / 60);
							hour = (hour == 0 ? '00' : hour < 10 ? '0' + hour : hour).toString();
							this.setData({
								leftTime: `${hour}:${minute}:${second}`,
								leftSecond: leftSecond - 1000
							});
						}, 1000);
					}
				}, (rej) => {
					console.log(rej)
				})
			},

			goPordPage() {
				getApp().shopId = this.shopInfo.shopId;
				console.log(this.orderItemDtos[0].prodId);
				uni.navigateTo({
					url: '/pages/groupbuy/groupbuy?prodid=' + this.orderItemDtos[0].prodId + '&isSpread=false'
				});
			},

			goHome() {
				uni.switchTab({
					url: '/pages/home/home'
				});
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
			oneMoreTime(e) {
				var orderNumber = e.currentTarget.dataset.ordernum;
				this.$request.get('/p/order/buyAgain', {
					orderNumber
				}).then((res) => {
					var basketIds = res.basketList;
					var shopId = res.shopId;
					this.$store.dispatch('currentShop/getShopInfo', shopId)
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
				var self = this;
				//#ifndef MP-WEIXIN
				uni.setClipboardData({
					data: self.orderNumber,
					success: function(res) {
						self.$showToast('复制成功')
					}
				})
				//#endif
				//#ifdef H5
				let oInput = document.createElement('input');
				oInput.value = e.currentTarget.dataset.text;
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
			},

			makeInvitation() {
				console.log("make a invitatin");
			},

			//点击生成海报
			formSubmit: function(e) {
				var that = this;
				uni.showToast({
					title: '海报生成中...',
					icon: 'loading',
					duration: 1000
				});
				that.createNewImg();
				setTimeout(function() {
					// wx.hideLoading()
					// wx.hideToast()
					that.setData({
						maskHidden: true
					});
				}, 1000);
			},
			createNewImg: function() {
				var that = this;
				let screenWidth = this.screenWidth;
				var context = uni.createCanvasContext('mycanvas');
				context.clearRect(0, 0, screenWidth, screenWidth * 1.8);
				context.setFillStyle("#fff");
				context.fillRect(0, 0, screenWidth, screenWidth * 1.8);
				context.save();
				var backimg = that.backImg;
				context.drawImage(backimg, 0, 0, screenWidth, screenWidth * 1.8);
				let qrcodePath = that
					.qrcodePath; // context.drawImage(qrcodePath, screenWidth*0.062, screenWidth*1, screenWidth*0.5, screenWidth*0.5);

				context.drawImage(qrcodePath, screenWidth * 0.068, screenWidth * 1.398, screenWidth * 0.25,
					screenWidth * 0.25);
				context.save(); //保存之前的画布设置

				context.draw(true); //true表示保留之前绘制内容
				//将生成好的图片保存到本地，需要延迟一会，绘制期间耗时

				setTimeout(function() {
					uni.canvasToTempFilePath({
						canvasId: 'mycanvas',
						success: function(res) {
							var tempFilePath = res.tempFilePath;
							that.setData({
								imagePath: tempFilePath
							});
						},
						fail: function(res) {}
					});
				}, 1000);
			},
			//点击保存到相册
			baocun: function() {
				var that = this;
				uni.saveImageToPhotosAlbum({
					filePath: that.imagePath,
					success: res => {
						uni.showToast({
							icon: 'none',
							title: '图片已保存',
							duration: 1400
						});
						this.setData({
							maskHidden: false
						});
					}
				});
			},
			getPosterWxCode: function(ptglid, prodId, shopId) {
				let self = this;
				this.$request.get("/user/getPtWxCode", {
					ptglid,
					prodId,
					shopId
				}).then((res) => {
					var save = uni.getFileSystemManager();
					var number = Math.random();
					let filePath = uni.env.USER_DATA_PATH + '/pic' + number + '.png';
					console.log("图片地址为" + filePath);
					save.writeFile({
						filePath: filePath,
						data: res,
						encoding: 'base64',
						success(res) {
							self.setData({
								//base 64设置到页面上
								qrcodePath: filePath
							});
						}
					});
				}, (rej) => {
					console.log(rej)
				})
			},

			getBackImg() {
				let self = this;
				uni.getImageInfo({
					src: 'https://images.51xeld.com/2020/12/fa0b68542d9e4b10bdaa90420aedb0f3.png',
					success: res => {
						self.setData({
							backImg: res.path
						});
					}
				});
			},

			closeImage: function() {
				this.setData({
					maskHidden: false
				});
			}
		}
	};
</script>
<style>
	/* pages/groupbuy-submit/groupbuy-submit.wxss */
	.container {
		background: linear-gradient(to bottom, #fdbe78, #FFFFFF);
		overflow: hidden;
	}

	.order-info {
		height: 170rpx;
		color: #fff;
		width: 96%;
		box-sizing: border-box;
		margin: 20rpx auto;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: #ffffff;
		color: #FA6316;
		border-radius: 12rpx;
		position: relative;
	}

	.order-info .small-font {
		font-size: 24rpx;

	}

	.diliver-type {
		position: absolute;
		right: 20rpx;
		height: 200rpx;
		width: 200rpx;
	}

	/* .status1{
  background: url("https://images.51xeld.com/2020/12/26af8f046ffd4b4e8bc3bff5ca4bb3d7.png");
  background-size: cover;
}
.status2{
  background: url("https://images.51xeld.com/2020/12/c87db91604e8434b8a78a83054652989.png");
  background-size: cover;
} */

	.order-info view {
		margin: 12rpx 0;
	}

	.order-info view:first-child {
		font-size: 30rpx;
	}

	.order-info view:last-child {
		font-size: 26rpx;
	}

	.address {
		width: 96%;
		margin: 0 auto 20rpx;
		border-radius: 12rpx;
		background-color: #ffffff;
		height: 120rpx;
		margin-top: 12rpx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.address .addr-icon image {
		height: 40rpx;
		width: 40rpx;
		margin: 0 20rpx;
	}

	.address .receiver-addr {
		font-size: 24rpx;
		color: #666666;
		width: calc(100% - 160rpx);
	}

	.address .receiver-addr view {
		margin: 12rpx 0rpx;
	}

	.address .receiver-addr .username-mobile text {
		display: inline-block;
		margin-right: 40rpx;
	}

	.address .receiver-addr .addr {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.address .more-icon {
		text-align: end;
	}

	.address .more-icon image {
		height: 26rpx;
		width: 26rpx;
		position: absolute;
		right: 20rpx;
		top: 45%;
	}

	.groupbuy-info {
		width: 96%;
		margin: 20rpx auto;
		border-radius: 12rpx;
		background-color: #ffffff;
		margin-top: 12rpx;
		padding-top: 10rpx;
		padding-bottom: 50rpx;
	}

	.groupbuy-info .line0 {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		color: #FB5E1F;
		font-size: 36rpx;
		margin: 30rpx;
		box-sizing: border-box;
		padding-right: 50rpx;
	}

	.groupbuy-info .line0 image {
		height: 30rpx;
		width: 30rpx;
		margin: 20rpx;
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
		color: #FF7E49;
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

	.groupbuy-info .head-pic-content .gray {
		overflow: hidden;
		height: 60rpx;
		width: 60rpx;
		border-radius: 50%;
	}

	.groupbuy-info .head-pic-content .head-pic image {
		height: 60rpx;
		width: 60rpx;
	}

	.groupbuy-info .head-pic-content .head-pic:last-child {
		position: relative;
		left: -20rpx;
	}

	.groupbuy-info .line4 {
		height: 60rpx;
		line-height: 60rpx;
		width: 80%;
		background-color: #FFB45F;
		color: #ffffff;
		margin: 0 auto;
		border-radius: 40rpx;
		text-align: center;
		margin-top: 30rpx;
	}

	.groupbuy-info .statusNot1 {
		border: 1px solid #FFB45F;
		background-color: #ffffff;
		color: #FFB45F;
	}

	.groupbuy-info .line5 {
		width: 100%;
		text-align: center;
		color: #FF7746;
		font-size: 24rpx;
		margin: 20rpx 0 0;
		padding-bottom: 20rpx;
	}

	.groupbuy-info .groupbuy-failed-line3 {
		text-align: center;
		font-size: 24rpx;
		color: #A3A3A3;
		margin-top: 12rpx;
	}

	.groupbuy-info .groupbuy-failed-line4 {
		text-align: center;
	}

	.groupbuy-info .groupbuy-failed-line4 image {
		height: 180rpx;
		width: 180rpx;

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
		font-size: 28rpx;
		border-top: 1px solid #f1f1ff;
		width: 96%;
		margin: 0 auto;
		border-radius: 12rpx;
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
		width: 96%;
		margin: 20rpx auto;
		border-radius: 12rpx;
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
		color: #FF601E;
	}

	/* main-content */
	.main-content {
		width: 100%;
		padding-bottom: 100rpx;
	}

	/* 底部栏 */

	.order-detail-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
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
		background: #FF601E;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
		margin-right: 20rpx;
		vertical-align: middle;
		border: 1px solid #FF601E;
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


	.imagePathBox {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2000;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
	}

	.shengcheng {
		width: 90%;
		height: 950rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 2001;
		transform: translate(-50%, -50%);
	}

	.baocun {
		display: block;
		width: 80%;
		height: 80rpx;
		padding: 0;
		line-height: 80rpx;
		text-align: center;
		position: fixed;
		bottom: 50rpx;
		left: 10%;
		background: #FFBF77;
		color: #fff;
		font-size: 32rpx;
		border-radius: 44rpx;
		z-index: 10000;
	}

	.shareFriends {
		display: block;
		width: 80%;
		height: 104rpx;
		padding: 0;
		line-height: 80rpx;
		text-align: center;
		position: fixed;
		bottom: 50rpx;
		left: 10%;
		background: #45be8d;
		color: rgb(211, 208, 208);
		font-size: 32rpx;
		border-radius: 44rpx;
	}


	button[class="baocun"]::after {
		border: 0;
	}
</style>
