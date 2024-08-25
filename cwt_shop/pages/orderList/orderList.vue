<template>
	<view>
		<!--pages/orderList/orderList.wxml-->
		<customNavi :naviData='naviData'>我的订单</customNavi>


		<view class="container">
			<!-- 头部菜单 -->
			<view class="order-tit">
				<text @tap="onStsTap" data-sts="0" :class="sts==0?'on':''">全部</text>
				<text @tap="onStsTap" data-sts="1" :class="sts==1?'on':''">待支付</text>
				<text @tap="onStsTap" data-sts="2" :class="sts==2?'on':''">待发货</text>
				<text @tap="onStsTap" data-sts="3" :class="sts==3?'on':''">待收货</text>
				<text @tap="onStsTap" data-sts="5" :class="sts==5?'on':''">已完成</text>
			</view>
			<!-- end 头部菜单 -->
			<view class="main">
				<view class="empty" v-if="list.length==0">
					还没有任何相关订单
				</view>
				<!-- 订单列表 -->
				<block v-for="(item, index) in list" :key="index">
					<!-- <view class='prod-item'> -->
					<view v-if="item.orderState==0 || (item.orderState==1 && sts==0)" class="prod-item">
						<view class="order-num">
							<view>
								<text>{{item.shopName?item.shopName:'小象智慧门店专卖'}}</text>
								<image mode="widthFix" class="more" src="/static/images/icon/more01.png"></image>
							</view>
							<view class="order-state">
								<!-- <view wx:if='{{item.orderState == 1}}'>
              测试文字 state==1
            </view> -->
								<view v-if="item.orderState == 1" class="gray">
									{{item.ptglid?'拼团失败，已取消':
                (item.refundState==1?'退款中':
                (item.refundState==2?'退款成功':
                (item.refundState==3?'退款失败':'订单关闭')))}}
								</view>
								<view v-else-if="item.orderState == 0 && item.status==1 && item.ptglid"
									:class="'order-sts  ' + (item.status==1?'orange':'') + '  ' + ((item.status==5||item.status==6)?'gray':'')">
									拼团中，待支付
								</view>
								<view v-else-if="item.orderState == 0 && item.status==2 && item.ptglid"
									:class="'order-sts  ' + (item.status==1?'orange':'') + '  ' + ((item.status==5||item.status==6)?'gray':'')">
									{{item.ptstatus==0?'拼团中，已支付':
                (item.ptstatus==1?'拼团成功，待发货': '')}}
								</view>
								<view v-else-if="item.orderState == 0 && item.status==3 && item.ptglid"
									:class="'order-sts  ' + (item.status==1?'orange':'') + '  ' + ((item.status==5||item.status==6)?'gray':'')">
									拼团成功，已发货
								</view>
								<view v-else-if="item.orderState == 0 && item.distributionType == 1"
									:class="'order-sts  ' + (item.status==1?'orange':'') + '  ' + ((item.status==5||item.status==6)?'gray':'')">
									{{item.refundState==3?'退款失败':
              (item.status==1?'待支付':
              (item.status==2?'备货中':
              (item.status==3?'待提货':
              (item.status==5?'已提货':'已完成'))))}}
								</view>
								<view v-else-if="item.orderState == 0 && item.distributionType == 2"
									:class="'order-sts  ' + (item.status==1?'orange':'') + '  ' + ((item.status==5||item.status==6)?'gray':'')">
									{{item.refundState==3?'退款失败':
              (item.status==1?'待支付':
              (item.status==2?'待美团取件':
              (item.status==3?'美团配送中':
              (item.status==5?'已提货':'已完成'))))}}
								</view>
								<view v-else-if="item.orderState == 0 && item.distributionType == 3"
									:class="'order-sts  ' + (item.status==1?'orange':'') + '  ' + ((item.status==5||item.status==6)?'gray':'')">
									{{item.refundState==3?'退款失败':
              (item.status==1?'待支付':
              (item.status==2?'待商家配送':
              (item.status==3?'商家配送中':
              (item.status==5?'已提货':'已完成'))))}}
								</view>
								<view v-else-if="item.orderState == 0 && item.distributionType == 4"
									:class="'order-sts  ' + (item.status==1?'orange':'') + '  ' + ((item.status==5||item.status==6)?'gray':'')">
									{{item.refundState==3?'退款失败':
              (item.status==1?'待支付':
              (item.status==2?'待发货':
              (item.status==3?'待收货':
              (item.status==5?'已收货':'已完成'))))}}
								</view>

							</view>
						</view>

						<!-- 商品列表 -->
						<!-- 一个订单单个商品的显示 -->
						<block>
							<block v-for="(prod, index2) in item.orderItemDtos" :key="prod.prodId">
								<view>
									<view class="item-cont" @click="toOrderDetailPage(item)">
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
							<view class="prodprice">实付：
								<!-- <text class='symbol'></text> -->
								<text class="big-num">￥{{item.actualTotal}}</text>
								<text class="small-num"></text>
								<text class="transferfree">(免配送费)</text>
							</view>
						</view>
						<!-- end 商品列表 -->
						<view class="prod-foot">
							<view class="btn">
								<block v-if="item.orderState == 0">
									<text v-if="(item.status==5&&item.refundState==0)" class="button"
										@click="refundApplication(item.orderNumber)"
										:data-ordernum="item.orderNumber">申请退款</text>
									<text
										v-if="(item.status==2&&item.refundState==0&&!item.ptglid)||(item.status==2&&item.ptglid&&item.ptstatus!=1)"
										class="button" @click="openRefundPop(item.orderNumber, 2)">申请退款</text>
									<!-- <text wx:if="{{item.status==2&&·item.refundState==0&&!item.pickupTime}}" class="button" bindtap="refund" data-ordernum="{{item.orderNumber}}">退款</text>
            <text wx:if="{{item.status==2&&item.refundState==0&&item.pickupTime&&item.ifshowRefundBtn}}" class="button" bindtap="refund" data-ordernum="{{item.orderNumber}}">退款</text> -->
									<text v-if="item.status==1" class="button"
										@click="openRefundPop(item.orderNumber, 1)">取消订单</text>
									<text v-if="item.status==1" class="button yellowBack"
										@click="onPayAgain(item.orderNumber)">去支付</text>
									<text v-if="item.status==2&&item.ptstatus=='0'" class="button yellowBack widther"
										@click="inviteToGroupbuy(item)">邀请好友拼团</text>
									<text v-if="(item.status==2&&item.ptstatus==1)||(item.status==2&&!item.ptglid)"
										class="button yellowBack widther" @click="alertTransfer(item)">提醒发货</text>
									<text v-if="item.status==3&&item.distributionType==1" class="button"
										@click="toSelfMentionAddress(item)">查看地址</text>
									<text v-if="item.status==3&&item.distributionType==2" class="button"
										@click="toMeituanTransfer(item.orderNumber)">查看物流</text>
									<text v-if="item.status==3&&item.distributionType==3" class="button"
										@click="toShopTransfer(item)" :data-shopid="item.shopId"
										:data-ordernum="item.orderNumber">查看物流</text>
									<text v-if="item.status==3&&item.distributionType==4" class="button"
										@click="toDeliveryPage(item.orderNumber)">查看物流</text>
									<text v-if="item.refundState==3" class="button" @click>联系商家</text>
									<text v-if="item.status==3" class="button warn"
										@click="onConfirmReceive(item.orderNumber)">确认收货</text>
									<text v-if="item.status==5||item.status==6" class="button warn">去评价</text>
									<text v-if="item.status==5||item.status==6" class="button warn2"
										@click="oneMoreTime(item.orderNumber)">再来一单</text>
								</block>
								<text v-if="item.orderState==1 && item.refundState==0" class="button"
									@click="delOrderList(item.orderNumber)">删除订单</text>
								<text v-if="item.orderState==1 && item.ptglid" class="button warn"
									@click="groupBuyAgain(item)">再次开团</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- end 订单列表 -->

		<view class="refundPop" v-if="showRefundPop" catchtouchmove="none">
			<view class="hide" @tap="closeRefundPop"></view>
			<view class="refundBox" :animation="refundAnimation">
				<view class="refund-tit">{{openType==1?'请选择取消订单的原因':'请选择退款的原因'}}</view>
				<view class="picker">

					<radio-group @change="radioChange">
						<label v-for="(item, index) in openType==1?cancelResons:refundReasons" :key="index"
							class="weui-cell weui-check__label">
							<view class="weui-cell__hd">
								<radio :value="item.value"></radio>
							</view>
							<view class="weui-cell__bd">{{item.tit}}</view>
						</label>
					</radio-group>

				</view>
				<view class="refundSubmit-btn" @tap="onCancelOrder">提交</view>
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
	import customNavi from "@/components/custom-navi/custom-navi";

	export default {
		data() {
			return {
				maskHidden: false,
				list: [],
				current: 1,
				pages: 0,
				sts: 0,
				title: "我的订单",
				style: {
					backgroundColor: '#FFBF77',
					color: 'white'
				},
				cancelResons: [{
					value: 0,
					tit: '收货地址填错了'
				}, {
					value: 1,
					tit: '忘记支付密码/余额不足'
				}, {
					value: 2,
					tit: '无法正常支付'
				}, {
					value: 3,
					tit: '不想买了'
				}, {
					value: 4,
					tit: '其他原因'
				}],
				refundReasons: [{
					value: 0,
					tit: '收货地址填错了'
				}, {
					value: 1,
					tit: '退差价'
				}, {
					value: 2,
					tit: '不想要了'
				}, {
					value: 3,
					tit: '其他原因'
				}],
				refundAnimation: null,
				showRefundPop: false,
				refundOrderNum: '',
				radioValue: '',
				screenWidth: "",
				screenHeight: "",
				backImg: "",
				openType: "",
				selectOrder: "",
				qrcodePath: "",
				imagePath: "",
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
			if (options.sts) {
				this.setData({
					sts: options.sts
				});
				this.loadOrderData(options.sts, 1);
			} else {
				this.loadOrderData(0, 1);
			}
			this.loadBackImg(); //加载分享海报背景图片
			this.getSysInfo();
		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.loadOrderData(this.sts, 1)
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (this.current < this.pages) {
				this.loadOrderData(this.sts, this.current + 1);
			}
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			let order = this.selectOrder;
			let ptglid = order.ptglid;
			let shopId = order.shopId;
			let prodId = order.orderItemDtos[0].prodId;
			let title = order.orderItemDtos[0].prodName;
			let path = `/pages/groupbuy/groupbuy?scene=${ptglid}-${prodId}-${shopId}`;
			return {
				title,
				path
			};
		},
		methods: {
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

			loadBackImg() {
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

			/**
			 * 加载订单数据
			 */
			loadOrderData: function(sts, current) {
				uni.showLoading(); //加载订单列表
				this.$request.get("/p/myOrder/myOrder", {
					current: current,
					size: 10,
					status: sts
				}).then(res => {
					var data = res.records;
					var list = [];
					if (sts == 2) {
						data.forEach((item, index) => {
							if (item.payTime) {
								var ifshowRefundBtn = (new Date().getTime() - new Date(item
									.payTime).getTime()) / 1000 < 300;
								data[index].ifshowRefundBtn = ifshowRefundBtn;
							}
						});
					}
					if (res.current == 1) {
						list = data;
					} else {
						list = this.list;
						Array.prototype.push.apply(list, data);
					}
					this.setData({
						list: list,
						pages: res.pages,
						current: res.current
					});
				})
			},

			// 格式化时间
			dataTimeToString(val) {},

			/**
			 * 状态点击事件
			 */
			onStsTap: function(e) {
				var sts = e.currentTarget.dataset.sts;
				this.setData({
					sts: sts
				});
				this.loadOrderData(sts, 1);
			},

			oneMoreTime: function(orderNumber) {
				this.$request.get('/p/order/buyAgain', {
					orderNumber
				}).then(res => {
					var basketIds = res.basketList;
					var shopId = res.shopId;
					this.$store.dispatch('currentShop/getShopInfo', [shopId, this])
					uni.setStorageSync("basketIds", JSON.stringify(basketIds));
					uni.navigateTo({
						url: '/pages/submit-order/submit-order?orderEntry=0'
					})
				})
			},

			/**
			 * 查看物流
			 */
			toDeliveryPage: function(orderNumber) {
				uni.navigateTo({
					url: '/pages/express-delivery/express-delivery?orderNum=' + orderNumber
				});
			},

			/**
			 * 取消订单
			 */
			onCancelOrder: function(e) {
				if (!this.radioValue) {
					uni.showToast({
						title: '请选择取消原应',
						icon: 'none'
					});
					return;
				}
				var ordernum = this.refundOrderNum;
				let res
				if (this.openType == 1) {
					res = this.$request.put("/p/myOrder/cancel", {
						orderNumber: ordernum,
						refundReason: this.radioValue
					})
				} else {
					res = this.$request.get('/p/refund/refund', {
						orderNumber: ordernum,
						refundReason: this.radioValue
					})
				}
				res.then(res => {
					this.loadOrderData(this.sts, 1);
					this.closeRefundPop();
					this.$showToast('成功取消订单')
				})
			},

			/**
			 * 付款
			 */
			onPayAgain: function(orderNumber) {
				uni.showLoading({
					mask: true
				});
				this.$request.post("/p/order/pay", {
					payType: 1,
					orderNumbers: orderNumber
				}).then((res) => {
					uni.hideLoading();
					uni.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.packageValue,
						signType: res.signType,
						paySign: res.paySign,
						success: function() {
							uni.navigateTo({
								url: '/pages/pay-result/pay-result?sts=1&orderNumbers=' +
									orderNumber
							});
						},
						fail: function(err) { //console.log("支付失败");
						}
					})
				})
			},

			/**
			 * 查看订单详情
			 */
			toOrderDetailPage(order) {
				let ptglid = order.ptglid;
				let orderNum = order.orderNumber;
				let shopId = order.shopId;
				if (ptglid) {
					uni.navigateTo({
						url: `/pages/groupbuy-orderdetails/groupbuy-orderdetails?orderNum=${orderNum}&shopId=${shopId}`
					});
					return;
				} else {
					uni.navigateTo({
						url: '/pages/order-detail/order-detail?orderNum=' + orderNum + '&shopId=' + shopId
					});

				}

			},

			/**
			 * 确认收货
			 */
			onConfirmReceive: function(orderNumber) {
				var self = this;
				uni.showModal({
					title: '',
					content: '我已收到货？',
					confirmColor: "#eb2444",
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							});
							self.$request.put("/p/myOrder/receipt/" + orderNumber, ).then(res => {
								self.loadOrderData(self.sts, 1);
								uni.hideLoading();
							})
						} else if (res.cancel) { //console.log('用户点击取消')
						}
					}

				});
			},
			//删除已完成||已取消的订单
			delOrderList: function(orderNumber) {
				var self = this;
				uni.showModal({
					title: '',
					content: '确定要删除此订单吗？',
					confirmColor: "#eb2444",
					success(res) {
						if (res.confirm) {
							uni.showLoading();
							self.$request.delete("/p/myOrder/" + orderNumber, ).then(res => {
								self.loadOrderData(self.sts, 1);
								uni.hideLoading();
								self.$showToast('订单已删除')
							})
						} else if (res.cancel) {}
					}
				});
			},
			//退款处理
			refundApplication: function(orderNumber) {
				uni.navigateTo({
					url: '/pages/refund/refund?orderNum=' + orderNumber
				});
			},
			refund: function(orderNumber) {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认取消订单并退款？',
					success: res => {
						if (res.confirm) {
							uni.showLoading()
							self.$request.get("/p/refund/refund", {
								orderNumber
							}).then(res => {
								uni.hideLoading();
								if (res.code === '000') {
									self.$showToast('退款成功，请等待汇款')
									self.loadOrderData(self.sts, 1);
								} else if (res.code === '111') {
									self.$showToast('申请成功，请等待审核')
								} else {
									self.$showToast('申请失败')
								}
							})
						} else {}
					}
				});
			},
			openRefundPop: function(refundOrderNum, openType) {
				this.refundOrderNum = refundOrderNum
				this.openType = openType
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				this.setData({
					showRefundPop: true,
					refundAnimation: animation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						refundAnimation: animation.translateY(0).step().export()
					});
				}, 50);
			},
			closeRefundPop: function() {
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				this.setData({
					refundAnimation: animation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						showRefundPop: false,
						radioValue: ''
					});
				}, 300);
			},
			toSelfMentionAddress: function(order) {
				var shopId = order.shopId;
				var pickupTime = order.pickupTime;
				uni.navigateTo({
					url: `/pages/selfmention-address/selfmention-address?shopId=${shopId}&pickupTime=${pickupTime}`
				});
			},
			toMeituanTransfer: function(orderNumber) {
				uni.navigateTo({
					url: '/pages/meituanTransfer/meituanTransfer?orderNumber=' + orderNumber
				});
			},
			toShopTransfer: function(order) {
				var shopId = order.shopId;
				var orderNumer = order.orderNumber;
				uni.navigateTo({
					url: '/pages/shop-delivery/shop-delivery?orderNumber=' + orderNumer + '&shopId=' + shopId
				});
			},
			return1: function() {
				console.log(1);
				return 1;
			},
			radioChange: function(e) {
				this.setData({
					radioValue: this.openType == 1 ? this.cancelResons[e.detail.value].tit : this
						.refundReasons[e.detail.value].tit
				});
			},

			inviteToGroupbuy(order) {
				this.setData({
					selectOrder: order
				});
				let ptglid = order.ptglid;
				let shopId = order.shopId;
				let prodId = order.orderItemDtos[0].prodId;
				let group = {
					ptglid,
					shopId,
					prodId
				};
				console.log(group);
				var self = this;
				uni.showToast({
					title: '海报生成中...',
					icon: 'loading',
					duration: 1000
				});
				self.createNewImg(ptglid, shopId, prodId);
				setTimeout(function() {
					// wx.hideLoading()
					// wx.hideToast()
					self.setData({
						maskHidden: true
					});
				}, 1000);
			},

			createNewImg: function(ptglid, shopId, prodId) {
				let self = this;
				this.$request.get("/user/getPtWxCode",{
						ptglid,
						prodId,
						shopId
					}).then((res) =>{
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
								let screenWidth = self.screenWidth;
								var context = uni.createCanvasContext('mycanvas');
								context.clearRect(0, 0, screenWidth, screenWidth * 1.8);
								context.setFillStyle("#fff");
								context.fillRect(0, 0, screenWidth, screenWidth * 1.8);
								context.save();
								var backimg = self.backImg;
								context.drawImage(backimg, 0, 0, screenWidth, screenWidth * 1.8);
								let qrcodePath = self
									.qrcodePath; // context.drawImage(qrcodePath, screenWidth*0.062, screenWidth*1, screenWidth*0.5, screenWidth*0.5);
								context.drawImage(qrcodePath, screenWidth * 0.068, screenWidth *
									1.398, screenWidth * 0.25, screenWidth *
									0.25);
								context.save(); //保存之前的画布设置
								context.draw(true); //true表示保留之前绘制内容
								//将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
								setTimeout(function() {
									uni.canvasToTempFilePath({
										canvasId: 'mycanvas',
										success: function(res) {
											var tempFilePath = res
												.tempFilePath;
											self.setData({
												imagePath: tempFilePath
											});
										},
										fail: function(res) {}
									});
								}, 1000);
							}
						});
				}, (rej) =>{ console.log(rej) })
			},
			getPosterWxCode: function(ptglid, prodId, shopId) {},
			//点击保存到相册
			baocun: function() {
				var self = this;
				uni.saveImageToPhotosAlbum({
					filePath: self.imagePath,
					success: res => {
						uni.showModal({
							content: '图片已保存到相册，赶紧晒一下吧~',
							showCancel: false,
							confirmText: '好的',
							confirmColor: '#333',
							success: function(res) {
								if (res.confirm) {
									/* 该隐藏的隐藏 */
									self.setData({
										maskHidden: false
									});
								}
							},
							fail: function(res) {}
						});
					}
				});
			},
			closeImage: function() {
				this.setData({
					maskHidden: false
				});
			},

			alertTransfer() {
				this.$showToast('提醒发货成功，请耐心等待')
			},

			groupBuyAgain(order) {
				this.$store.dispatch('currentShop/getShopInfo', [order.shopId, this])
				uni.navigateTo({
					url: '/pages/groupbuy/groupbuy?prodid=' + order.orderItemDtos[0].prodId
				});
			}
		}
	};
</script>
<style>
	/* pages/orderList/orderList.wxss */

	page {
		background-color: #f4f4f4;
		color: #333;
	}

	/* 头部菜单 */

	.order-tit {
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #f4f4f4;
	}

	.order-tit text {
		display: block;
		font-size: 30rpx;
		color: 999;
		width: 100rpx;
		text-align: center;
		color: #666;
	}

	.order-tit text.on {
		border-bottom: 3px solid #FFBF77;
		color: #FFBF77;
	}

	/*  end 头部菜单 */

	.main {
		padding-bottom: 45rpx;
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
		padding-left: 15rpx;
	}

	.prod-item .item-cont .prod-info .prodname-price .prodprice .small {
		font-size: 26rpx;
	}

	.prod-item .item-cont .prod-info .prodname-price .prodprice .bignum {
		font-size: 32rpx;
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

	.other-button-hover {
		background-color: blue;
	}

	.button-hover {
		background-color: red;
	}

	/** 添加自定义button点击态样式类**/

	.button-hover {
		background-color: blue;
	}

	.button {
		margin-left: 10px;
		font-size: 30rpx;
		background: #fff;
		padding: 0 30rpx;
		height: 62rpx;
		line-height: 65rpx;
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

	.button.warn2 {
		color: #fff;
		border-color: #FFBF77;
		background: #FFBF77;
	}

	.button.yellowBack {
		color: #ffffff;
		border-color: #FFBF77;
		background-color: #FFBF77;
	}

	/* end 商品列表 */

	.empty {
		font-size: 28rpx;
		margin-top: 100rpx;
		text-align: center;
		color: #999;
		height: 300rpx;
		line-height: 300rpx;
	}

	/* 根据状态显示不同的颜色 */

	.order-state .order-sts.orange {
		color: #FFBF77;
	}

	.order-state .order-sts {
		color: #FFBF77;
	}

	.order-state .order-sts.gray {
		color: #999;
	}

	.order-state .gray {
		color: #FFBF77;
	}

	.refundPop {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}

	.refundPop .hide {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.refundPop .refundBox {
		height: 700rpx;
		width: 100%;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}

	.refundPop .refundBox .refund-tit {
		color: #535353;
		font-size: 30rpx;
		width: 100%;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		padding-top: 20rpx;
	}

	.refundPop .refundBox .picker {
		margin-top: 20rpx;
	}

	.refundPop .refundBox label {
		display: flex;
		font-size: 28rpx;
		padding: 20rpx 0 20rpx 40rpx;
		border-bottom: 1px solid #F8F8F8;
		color: #959595;
	}

	/* .refundPop .refundBox label:last-child{
  border: none;
} */
	/* .refundPop .refundBox radio .wx-radio-input{ 
  自定义样式....
    height: 24rpx; 
    width: 24rpx;
    margin-top: -4rpx;
    border-radius: 50%;
    border: 1rpx solid #999;
    background: transparent;
} */

	.refundPop .refundBox radio .wx-radio-input.wx-radio-input-checked {
		border-color: #fff;
		background: #fff;
	}

	/* 自定义样式.... */
	.refundPop .refundBox radio .wx-radio-input {
		height: 26rpx;
		/* 对勾大小 */
		width: 26rpx;
		margin-top: -4rpx;
		border-radius: 50%;
		border: 2rpx solid #999;
		background: transparent;
	}

	/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
	.refundPop .refundBox radio .wx-radio-input.wx-radio-input-checked::before {
		border-radius: 50%;
		/* 圆角 */
		width: 28rpx;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		height: 28rpx;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		line-height: 28rpx;
		/* 选中后对勾的垂直方向，等于radio的高度 */
		text-align: center;
		font-size: 24rpx;
		/* 对勾大小 30rpx */
		color: #fff;
		/* 对勾颜色 白色 */
		background: #FFBF77;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}

	.refundPop .refundBox .picker .reason-tit {
		margin-left: 20rpx;
	}

	.refundSubmit-btn {
		height: 80rpx;
		width: 90%;
		background-color: #FFBF77;
		color: #ffffff;
		text-align: center;
		line-height: 80rpx;
		border-radius: 50rpx;
		margin-top: 70rpx;
		position: fixed;
		bottom: 40rpx;
		left: 5%;
	}

	.prodname {
		padding-top: 20rpx;
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
