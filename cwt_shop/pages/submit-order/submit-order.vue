<template>
	<view>
		<!--pages/newProdDetail/newProdDetail.wxml-->
		<customNavi :naviData='naviData'>确认订单</customNavi>
		<view class="container">
			<view class="address-container">
				<view class="no-address" @tap="toAddrListPage" v-if="!userAddr&&!ifSelfMention">
					<view class="add-icon">
						<image src="/static/images/icon/increase.png" mode="widthFix"></image>
						<view class="add-address-info">
							<text>添加收货地址</text>
						</view>
					</view>
					<view class="more-icon">
						<image src="/static/images/icon/more01.png" mode="aspectFit"></image>
					</view>
				</view>

				<view class="address-content" @tap="toAddrListPage" v-else-if="userAddr&&!ifSelfMention">
					<view class="addressinfo">
						<view class="location-receiver">
							<view class="sendto-location">
								<image src="/static/images/icon/addr.png" mode="widthFix"></image>
								<text v-if="userAddr.province"
									class="text-ellipsis">{{userAddr.province}}{{userAddr.city}}{{userAddr.area}}{{userAddr.street}}{{userAddr.addr}}</text>
								<text v-else-if="!userAddr.province">请补充完整地址</text>

							</view>
							<view class="receiver">
								<text v-if="userAddr.receiver" class="left">{{userAddr.receiver}}</text>
								<text v-else-if="!userAddr.receiver" class="left">请填写收货人</text>
								<text>{{userAddr.mobile}}</text>
							</view>
						</view>
						<image src="/static/images/icon/more01.png" mode="aspectFit"></image>
					</view>
					<!-- <view class="send-time">
        <view class="sendtime-tit">配送时间</view>
        <view class="sendtime-content">
          <text>预计</text>
          <text class="red">7月10日【周五】12:00前</text>
          <text>送达</text>
        </view>
      </view> -->
				</view>

				<view class="selfmention" v-else-if="ifSelfMention">
					<view class="selfmention-tit">
						<image src="/static/images/icon/addr.png" mode="aspectFit"></image>
						<text>自提地址</text>
					</view>
					<view class="mention-address">{{shopInfo.city}}{{shopInfo.area}}{{shopInfo.shopAddress}}</view>
					<view class="mention-time-phone">
						<view class="mention-time">
							<view class="mentiontime-tit">
								<image src="/static/images/icon/time.png" mode="aspectFit"></image>
								<text>自提时间</text>
							</view>
							<view class="mentiontime-content">
								<picker mode="multiSelector" @change="handleSelect" :value="multiIndex"
									:range="dateTimeObj" range-key="showTime" @columnchange="handleColumnChange">
									<view class="picker">
										<text>预计{{pickupTime}}自提</text>
										<image src="/static/images/icon/more01.png" mode="widthFix"></image>
									</view>
								</picker>
							</view>
						</view>
						<view class="mention-phone">
							<view class="mentionphone-tit">
								<image src="/static/images/icon/phone2.png" mode="widthFix"></image>
								<text>联系电话</text>
							</view>
							<view class="'mentionphone-content'" @tap="openMobileInput">
								<text>{{userAddr.mobile?userAddr.mobile: '请填写'}}</text>
								<image src="/static/images/icon/more01.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="order-list-container">
				<view class="shopinfo-container">
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
				<view class="order-list">
					<block v-for="(item, index) in orderItems" :key="index">
						<view class="order">
							<view class="prod-pic">
								<image :src="item.pic" mode="aspectFit"></image>
							</view>
							<view class="prodname-amount">
								<view class="prod-name">{{item.prodName}}</view>
								<view class="prod-amount">x{{item.prodCount}}</view>
							</view>
							<view v-if="!item.activityPrice" class="prod-payamount">￥{{item.price}}</view>
							<view v-if="item.activityPrice" class="prod-payamount">
								<view>活动价：￥{{item.activityPrice}}</view>
							</view>
						</view>
					</block>
				</view>
				<view class="orders-info">
					<view class="transfer-type orderinfo-item">
						<view class="title">配送方式</view>
						<view class="amount">
							<switch style="transform:scale(0.7)" class="wx-switch-input" name="switch" color="#FFBF77"
								@change="handleSwitch" :checked="ifSelfMention" :disabled="ifOnlySelfmention"></switch>
							{{ifOnlySelfmention?'仅自提':'自提'}}
							<!-- <switch class="wx-switch-input" name="switch" color="#FFBF77" bindchange='handleSwitch' disabled  checked='{{true}}'/>自提 -->
						</view>
					</view>
					<view class="transfer orderinfo-item">
						<view class="title">配送费</view>
						<view class="amount">￥{{transfee}}</view>
					</view>
					<view class="discount orderinfo-item">
						<view class="title">优惠</view>
						<view class="amount">-￥{{orderReduce}}</view>
					</view>
					<view class="coupons orderinfo-item">
						<view class="title">优惠券</view>
						<view class="amount">暂无可用</view>
					</view>

				</view>
				<view class="total-info">
					<view class="totalinfo-content">
						<view class="discount-info">
							<text class="discount-info-tit">共节省</text>
							<text class="discount-info-amount">￥{{orderReduce}}</text>
						</view>
						<view class="totalpay-info">
							<text class="totalpay-tit">实付金额：</text>
							<text class="totalpay-amount">￥{{actualTotal}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="marks" @tap="openMarkPop">
				<text>备注</text>
				<image src="/static/images/icon/more01.png" mode="widthFix"></image>
			</view>

			<view class="aggrement">
				<checkbox checked="ifIReadAggrement" @tap="checkboxChange"></checkbox>
				<text>我已阅读并同意</text>
				<text class="aggrement-content" @tap="goAgreement">《小象智慧门店门店用户协议》</text>
			</view>

		</view>

		<view class="submit-footer">
			<view class="submit-pay">￥{{actualTotal}}</view>
			<view class="submitbtn" @tap="toPay">支付</view>
		</view>

		<view class="mark-pop" :hidden="!showMarkPop">
			<view class="hide" @tap="closeMarkPop"></view>
			<view class="mark-box" :animation="markAnimation">
				<view class="mark-tit">
					<text>备注</text>
					<text></text>
				</view>
				<textarea class="input-box" placeholder="请输入备注信息" placeholder-class="placeholder" :value="remark"
					@blur="handleMarkInput"></textarea>
				<view class="mark-submitbtn" @tap="closeMarkPop">确认</view>
			</view>
		</view>

		<view v-if="ifOpenMobileInput" class="input-mobile-pop" catchtouchmove="none">
			<view class="hide"></view>
			<view class="input-box">
				<view class="input-tit">请填写联系电话</view>
				<view class="input">
					<input @blur="changeSelfmentionMobile" :value="userAddr.mobile"></input>
				</view>
				<view class="footer">
					<view @tap="cancel">取消</view>
					<view @tap="handleSaveMobile">保存</view>
				</view>
			</view>
		</view>
		<!-- <view class="time-picker-pop">
  <view class="hide"></view>
  <view class="time-picker">
  </view>
</view> -->
	</view>
</template>

<script src="../../wxs/number.js"></script>

<script>
	// pages/submit-order/submit-order.js
	import coupon from "../../components/coupon/coupon";
	import customNavi from '@/components/custom-navi/custom-navi.vue'

	export default {
		data() {
			return {
				naviData: {
					ifGoBack: true
				},
				ifIReadAggrement: true,
				showMarkPop: false,
				markAnimation: null,
				ifSelfMention: false,
				couponSts: 1,
				couponList: [],
				// 订单入口 0购物车 1立即购买
				orderEntry: "0",
				userAddr: null,
				orderItems: [],
				orderReduce: 0,
				actualTotal: 0,
				total: 0,
				totalCount: 0,
				transfee: 0,
				reduceAmount: 0,
				remark: "",
				choosedCoupon: [],
				recordIds: [],
				usermobile: '',
				tjr: '',
				//设置通过海报分享的推荐人
				multiIndex: [0, 0],
				todayTimeObj: [],
				tomorrowTimeObj: [],
				ifOpenMobileInput: false,
				dateTimeObj: [],
				ifOnlySelfmention: "",
				couponIds: [],
				pickupTime: "",
				popupShow: false,
				refundOrderNum: "",
				showRefundPop: false,
				refundAnimation: "",
				radioValue: ""
			};
		},

		components: {
			coupon,
			customNavi
		},
		props: {},

		computed: {
			shopId() {
				return this.$store.state.shop.currentShop
			},
			shopInfo() {
				return this.$store.state.currentShop.shopInfo
			}
		},

		onLoad: function(options) {
			this.setData({
				// orderEntry: "0",
				orderEntry: options.orderEntry,
				tjr: options.tjr
			});
			this.dataBulder();
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let number = uni.getStorageSync('phoneNumber');
			this.setData({
				usermobile: number
			});
			//#ifdef MP-WEIXIN
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1];
			if (currPage.data.selAddress == "yes") {
				this.setData({ //将携带的参数赋值
					userAddr: currPage.data.userAddr
				});
			}
			// #endif
			//获取订单数据
			if (this.orderEntry != 2) {
				this.loadOrderData();
			} else {
				this.buyAgain();
			}
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			return {
				title: "小象智慧门店美食商城",
				path: '/pages/home/home',
				success: function(res) {}
			};
		},
		methods: {
			dataBulder: function() {
				var now = new Date();
				var nowTime = now.getHours() + 1; // var nowTime = 22

				var timeStamp = 22 - nowTime > 1 && 22 - nowTime < 13 ? nowTime : 8;
				var dateObj = nowTime < 22 ? [{
					showTime: "今天",
					date: 1
				}, {
					showTime: '明天',
					date: 2
				}] : [{
					showTime: '明天',
					date: 2
				}]; // 生成时间数组

				let timeObj = new Array(22 - timeStamp);

				for (let i = 0; i < timeObj.length; i++) {
					const time = i + timeStamp;
					const showTime = '预计 ' + (time < 10 ? '0' + time : time) + ':00 自提';
					timeObj[i] = {
						showTime,
						time
					};
				}

				this.setData({
					dateTimeObj: [dateObj,
						timeObj
					] // pickupTime: ''+now.getMonth()+'月'+now.getDate()+'日 '+ (now.getHours()+1<10?'0'+now.getHours()+1:now.getHours()+1)+":00"

				});
				this.SelectMentionTime([0, 0]);
			},
			//加载订单数据
			loadOrderData: function() {
				var addrId = 0; // 初始化orderIte

				if (this.userAddr != null) {
					addrId = this.userAddr.addrId;
				}

				uni.showLoading({
					mask: true
				});
				this.$request.post("/p/order/confirm", {
					addrId: addrId,
					orderItem: this.orderEntry === "1" ? JSON.parse(uni.getStorageSync("orderItem")) :
						undefined,
					basketIds: this.orderEntry === "0" ? JSON.parse(uni.getStorageSync("basketIds")) :
						undefined,
					couponIds: this.couponIds,
					recordIds: this.recordIds,
					userChangeCoupon: 1,
					remark: this.remark,
					// purchaseType: 1,
					shopId: this.shopId
				}).then(res => {
					uni.hideLoading();
					let orderItems = [];
					res.shopCartOrders[0].shopCartItemDiscounts.forEach(itemDiscount => {
						orderItems = orderItems.concat(itemDiscount.shopCartItems);
					});
					this.setData({
						orderReduce: res.orderReduce,
						couponList: res.couponRecords,
						orderItems: orderItems,
						actualTotal: res.actualTotal,
						total: res.total,
						totalCount: res.totalCount,
						userAddr: res.userAddr,
						ifOnlySelfmention: res.shopCartOrders[0].onlySelfmention,
						ifSelfMention: res.shopCartOrders[0].onlySelfmention
					});
				})
			},
			//再次购买
			buyAgain: function() {
				var addrId = 0; // 初始化orderIte

				if (this.userAddr != null) {
					addrId = this.userAddr.addrId;
				}
				uni.showLoading({
					mask: true
				});
				this.$request.post("/p/order/buyAgain", {
					addrId: addrId,
					orderItem: this.orderEntry === "2" ? JSON.parse(uni.getStorageSync("orderItem")) :
						undefined,
					basketIds: this.orderEntry === "0" ? JSON.parse(uni.getStorageSync("basketIds")) :
						undefined,
					couponIds: this.couponIds,
					recordIds: this.recordIds,
					userChangeCoupon: 1,
					remark: this.remark,
					shopId: this.shopId
				}, ).then(res => {
					uni.hideLoading();
					let orderItems = [];
					res.shopCartOrders[0].shopCartItemDiscounts.forEach(itemDiscount => {
						orderItems = orderItems.concat(itemDiscount.shopCartItems);
					});
					this.setData({
						orderReduce: res.orderReduce,
						couponList: res.couponRecords,
						orderItems: orderItems,
						actualTotal: res.actualTotal,
						total: res.total,
						totalCount: res.totalCount,
						userAddr: res.userAddr // transfee: res.shopCartOrders[0].transfee,
						// shopReduce: res.shopCartOrders[0].shopReduce,
					});
				})
			},
			//加载订单金额数据
			loadOrderAmount: function() {
				var addrId = 0; // 初始化orderItem

				let orderItem = this.orderEntry === "1" ? JSON.parse(uni.getStorageSync("orderItem")) :
					undefined; // 判断是否有优惠券，如果有，则把单品优惠券加入到订单中

				if (this.choosedCoupon.length !== 0) {
					let coupons = this.choosedCoupon.filter(coupon => {
						return coupon.prodId == orderItem.prodId;
					});
					orderItem.recordId = coupons[0].recordId;
					orderItem.couponId = coupons[0].couponId;
				}

				if (this.userAddr != null) {
					addrId = this.userAddr.addrId;
				}

				uni.showLoading({
					mask: true
				});

				this.$request.post("/p/order/favourMoney", {
					addrId: addrId,
					orderItem: orderItem,
					basketIds: this.orderEntry === "0" ? JSON.parse(uni.getStorageSync("basketIds")) :
						undefined,
					couponIds: this.couponIds,
					recordIds: this.recordIds,
					userChangeCoupon: 1
				}).then(res => {
					uni.hideLoading();
					this.setData({
						orderReduce: res.orderReduce,
						actualTotal: res.actualTotal,
						total: res.total,
						totalCount: res.totalCount
					});
				})
			},
			handleSwitch: function(e) {
				this.ifSelfMention = e.detail.value
				// this.setData({
				// 	ifSelfMention: e.detail.value
				// });
			},
			openMarkPop: function() {
				var animation = uni.createAnimation({
					duration: '300',
					timingFunction: 'ease-in-out'
				});
				this.setData({
					markAnimation: animation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						showMarkPop: true,
						markAnimation: animation.translateY(0).step().export()
					});
				}, 50);
			},
			closeMarkPop: function() {
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				this.setData({
					markAnimation: animation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						showMarkPop: false
					});
				}, 300);
			},
			handleMarkInput: function(e) {
				this.setData({
					remark: e.detail.value
				});
			},

			/**
			 * 优惠券选择出错处理方法
			 */
			chooseCouponErrHandle(res) {
				// 优惠券不能共用处理方法
				if (res.statusCode == 601) {
					uni.showToast({
						title: res.data,
						icon: "none",
						duration: 3000,
						success: res => {
							this.setData({
								couponIds: []
							});
						}
					});
					setTimeout(() => {
						this.loadOrderData();
					}, 2500);
				}
			},

			/**
			 * 提交订单
			 */
			toPay: function() {
				var that = this;

				if (!this.userAddr) {
					uni.showToast({
						title: '请填写收货地址或自提手机号',
						icon: "none"
					});
					return;
				} else if (!this.userAddr.province && !this.ifSelfMention) {
					uni.showToast({
						title: '请将地址补充完整',
						icon: 'none'
					});
					return;
				}

				if (!this.ifIReadAggrement) {
					uni.showToast({
						title: '此服务需要您阅读同意《小象智慧门店用户协议》',
						icon: 'none'
					});
					return;
				}

				that.submitOrder();
			},
			getPhoneNumber: function(e) {
				let that = this;
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					this.$request.get("/p/user/getPhoneNumber", {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv //向量
					}).then((res) => {
						if (res != undefined && res != null) {
							this.$store.commit('updateUserInfo', { mobile: res })
						}
					})
					this.toPay();
				}else {
					this.$showToast('请授权手机号以便为您提供更完整的服务')
				}
			},
			handleRemark: function(e) {
				this.setData({
					remark: e.detail.value
				});
			},
			checkboxChange: function(e) {
				var ifIReadAggrement = !this.ifIReadAggrement;
				this.setData({
					ifIReadAggrement
				});
			},
			handleSelect: function(e) {
				var indexes = e.detail.value;
				this.SelectMentionTime(indexes);
			},
			SelectMentionTime: function(indexes) {
				var now = new Date();
				var choosenTime = [now.getMonth() + 1, this.dateTimeObj[0][indexes[0]].date == 1 ? now.getDate() : now
					.getDate() +
					1, this.dateTimeObj[1][indexes[1]].time
				];
				this.setData({
					pickupTime: '' + choosenTime[0] + '月' + choosenTime[1] + '日 ' + (choosenTime[2] < 10 ?
						'0' + choosenTime[2] :
						choosenTime[2]) + ":00"
				});
			},
			handleColumnChange: function(e) {
				if (e.detail.column == 0) {
					var now = new Date();
					var day = now.getDay();
					var dateObj = [{
						showTime: "今天",
						date: 1
					}, {
						showTime: '明天',
						date: 2
					}];

					if (e.detail.value == 0) {
						var nowtime = now.getHours() + 1;
					} else if (e.detail.value == 1) {
						var nowtime = 8;
					}

					var timeObj = new Array(22 - nowtime);

					for (let i = 0; i < timeObj.length; i++) {
						const time = i + nowtime;
						const showTime = '预计 ' + (time < 10 ? '0' + time : time) + ':00 自提';
						timeObj[i] = {
							showTime,
							time
						};
					}

					var dateTimeObj = [dateObj, timeObj, day];
					this.setData({
						dateTimeObj,
						multiIndex: e.detail.value == 0 ? [0, 0] : [1, 0]
					});
				}
			},
			submitOrder: function() {
				uni.showLoading({
					mask: true
				});
				this.$request.post("/p/order/submit", {
					orderShopParam: [{
						remarks: this.remark,
						shopId: this.shopId,
						tjr: this.tjr,
						pickupTime: this.ifSelfMention ? this.pickupTime : '',
						distributionType: this.ifSelfMention ? '1' : ''
					}]
				}).then((res) => {
					uni.hideLoading();
					this.callPay(res.orderNumbers);
					this.orderNumber = res.orderNumbers
				}, (rej) => {
					console.log(rej)
				})
			},
			
			async callPay(orderNumbers) {
				try {
					let res = await this.$request.post("/apply/appletOrders", {
						orderNumber: orderNumbers
					})
					let miniPayRequest = res.miniPayRequest
					//#ifdef MP-WEIXIN
					this.weixinPay(miniPayRequest)
					//#endif
					//#ifdef H5
					this.H5Pay(miniPayRequest)
					//#endif
					// #ifdef MP-TOUTIAO
					console.log('running in toutiao')
					this.toutiaoPay(res)
					// #endif
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			
			weixinPay(miniPayRequest) {
				let self = this
				uni.requestPayment({
					timeStamp: miniPayRequest.timeStamp,
					nonceStr: miniPayRequest.nonceStr,
					package: miniPayRequest.package,
					signType: miniPayRequest.signType,
					paySign: miniPayRequest.paySign,
					success: e => {
						//让用户对订阅消息授权
						uni.requestSubscribeMessage({
							tmplIds: ['ZGR6BeCQozAl-XTzhLjFZBRUM9E18boBXiUWz0LFK_0'],
							success(res) {}
						});
						uni.navigateTo({
							url: '/pages/pay-result/pay-result?sts=1&orderNumbers=' +
								self.orderNumbers
						});
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						});
					},
				})
			},
			
			H5Pay() {
				console.log('WeixinJSBridge running')
				if (typeof WeixinJSBridge === 'undefined') {
					console.log('weixinjsBridge')
					this.$toast({
						message: '请使用微信内置浏览器进行支付'
					})
				} else {
					console.log('weixinjsBridge')
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							appId: 'wx33a7572beb3a17f1', // 公众号名称，由商户传入
							timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
							nonceStr: data.nonceStr, // 随机串
							package: data.package,
							signType: data.signType, // 微信签名方式：
							paySign: data.paySign // 微信签名
						},
						res => {
							console.log(res)
							if (res.err_msg === 'get_brand_wcpay_request:ok') {
								this.$toast({
									message: '支付成功'
								})
								this.$router.push({
									path: '/videoplayer',
									query: {
										video_id: this.$route.query.video_id
									}
								}) // 支付成功之后跳转的路由
							} else {
								this.$toast({
									message: '支付失败'
								})
							}
						}
					)
				}
			},
			
			toutiaoPay(miniPayRequest) {
				let self = this
				console.log(miniPayRequest)
				let { data } = miniPayRequest
				uni.requestPayment({
					orderInfo: {
						...data
					},
					service: 5,
					success(res) {
						console.log(res)
						if (res.code == 0) {
							uni.navigateTo({
								url: '/pages/pay-result/pay-result?sts=1&orderNumbers=' +
									self.orderNumbers
							})
						}
					},
					fail(res) {
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
						uni.navigateBack()
					},
				})
			},

			changeCouponSts: function(e) {
				this.setData({
					couponSts: e.currentTarget.dataset.sts
				});
			},
			showCouponPopup: function() {
				this.setData({
					popupShow: true
				});
			},
			closePopup: function() {
				this.setData({
					popupShow: false
				});
			},

			/**
			 * 去地址页面
			 */
			toAddrListPage: function() {
				uni.navigateTo({
					url: '/pages/delivery-address/delivery-address?order=0'
				});
			},

			/**
			 * 确定选择好的优惠券
			 */
			choosedCouponFun: function() {
				this.loadOrderAmount();
				this.setData({
					popupShow: false
				});
			},

			/**
			 * 优惠券子组件发过来
			 */
			checkCoupon: function(e) {
				var ths = this;
				let index = ths.choosedCoupon.indexOf(e.detail.coupon);

				if (index === -1) {
					ths.choosedCoupon.push(e.detail.coupon); // ths.data.recordIds.push(e.detail.recordId)
				} else {
					ths.choosedCoupon.splice(index, 1); // ths.data.recordIds.splice(index, 1)
				}
			},
			goAgreement: function() {
				uni.navigateTo({
					url: '../agreement/agreement'
				});
			},

			openMobileInput() {
				this.setData({
					ifOpenMobileInput: true
				});
			},

			cancel() {
				this.setData({
					ifOpenMobileInput: false
				});
			},

			changeSelfmentionMobile(e) {
				this.selfMentionMobile = e.detail.value;
			},

			handleSaveMobile: function() {
				var ths = this;
				var mobile = ths.selfMentionMobile;

				if (!mobile) {
					uni.showToast({
						title: '请输入手机号码',
						icon: "none"
					});
					return;
				}

				if (mobile.length != 11) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: "none"
					});
					return;
				}

				uni.showLoading();
				if (ths.userAddr) {
					res = this.$request.put("/p/address/updateAddr", {
						mobile,
						addrId: this.userAddr ? this.userAddr.addrId : 0
					})
				} else {
					res = this.$request.post("/p/address/addAddr", {
						mobile,
						addrId: this.userAddr ? this.userAddr.addrId : 0
					})
				}
				res.then(res => {
					uni.hideLoading();
					ths.setData({
						ifOpenMobileInput: false
					});
					ths.loadOrderData();
				})
			},

		},
	};
</script>
<style>
	.container {
		box-sizing: border-box;
		padding: 20rpx 3% 140rpx;
		width: 100%;
		background: linear-gradient(to bottom, #fdbe78, #FFFFFF);
		margin-top: 0;
	}

	.address-container {
		width: 100%;
		background-color: #ffffff;
		padding: 30rpx 20rpx 20rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
	}

	.address-container .no-address {
		display: flex;
		justify-content: space-between;
		height: 70rpx;
		align-items: center;
		font-size: 30rpx;
		color: #DC3521;
		position: relative;
	}

	.address-container .no-address .add-icon {
		width: 70%;
		height: 70rpx;
		line-height: 70rpx;
	}

	.address-container .no-address .add-icon image {
		width: 30rpx;
		vertical-align: middle;
		margin-top: 21rpx;
		float: left;
	}

	.address-container .no-address .add-address-info {
		margin-left: 10rpx;
		float: left;
	}

	.address-container .no-address .more-icon {
		position: absolute;
		right: 0;
		vertical-align: middle;
		padding-top: 6rpx;
	}

	.address-container .no-address .more-icon image {
		width: 16rpx;
		height: 30rpx;
	}

	.sendto-location {
		height: 48rpx;
		line-height: 48rpx;
	}

	.sendto-locatio image {
		vertical-align: middle;
	}

	.sendto-locatio text {
		vertical-align: middle;
	}

	.address-container .address-content {
		font-size: 26rpx;
	}

	/* 存在地址时 */
	.address-container .address-content .addressinfo {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.address-container .address-content .addressinfo .location-receiver .sendto-location text {
		margin-left: 5rpx;
		vertical-align: middle;
	}

	.address-container .address-content .addressinfo .location-receiver .receiver {
		color: #9C9C9C;
		margin: 12rpx 0 0 36rpx;
	}

	.address-container .address-content .addressinfo .location-receiver .receiver .left {
		margin-right: 15rpx;
	}

	.address-container .address-content .send-time {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0 0 0;
		padding-top: 20rpx;
		color: #7E7E7E;
		font-size: 24rpx;
		border-top: 1px solid #F9F9F9;
	}

	.address-container .address-content .send-time .red {
		color: #D81E06;
		margin: 0 10rpx;
	}

	.address-container .address-content .addressinfo image {
		width: 30rpx;
		height: 30rpx;
	}

	.address-container .address-content .addressinfo .location-receiver image {
		width: 30rpx;
		vertical-align: middle;
	}

	/* 自提地址 */
	.selfmention image {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
	}

	.selfmention {
		font-size: 30rpx;
	}

	.selfmention>view {
		margin: 20rpx 0;
	}

	.selfmention .selfmention-tit text {
		margin-left: 10rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
	}

	.selfmention .mention-address {
		font-size: 26rpx;
		padding: 0 0 20rpx 40rpx;
		border-bottom: 1px solid #F8F8F8;
	}

	.selfmention .mention-time-phone {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.selfmention .mention-time-phone .mentiontime-tit,
	.selfmention .mention-time-phone .mentionphone-tit {
		color: #868686;
		padding-bottom: 10rpx;
	}

	.selfmention .mention-time-phone .mentiontime-tit image,
	.selfmention .mention-time-phone .mentionphone-tit image {
		width: 26rpx;
		position: relative;
		bottom: 2rpx;
		margin-right: 8rpx;
	}

	.selfmention .mention-time-phone .mentiontime-content,
	.selfmention .mention-time-phone .mentionphone-content {
		color: #999999;
		padding-top: 10rpx;
	}

	.selfmention .mention-time-phone .mentiontime-content image,
	.selfmention .mention-time-phone .mentionphone-content image {
		width: 16rpx;
		height: 20rpx;
		position: relative;
		bottom: 2rpx;
		left: 6rpx;
	}

	.order-list-container {
		width: 100%;
		background-color: #ffffff;
		margin-top: 20rpx;
		border-radius: 8rpx;
	}

	.order-list-container .shopinfo-container {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 16rpx;
		border-bottom: 1px solid #F9F9F9;
	}

	.order-list-container .shopinfo-container .shoplogo image {
		width: 70rpx;
	}

	.order-list-container .shopinfo {
		margin-left: 14rpx;
	}

	.order-list-container .shopinfo-container .shopname {
		margin-bottom: 8rpx;
	}

	.order-list-container .shopinfo-container .shopaddress {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #A3A3A3;
	}

	.order-list-container .order-list {
		padding: 20rpx 0;
	}

	.order-list-container .order-list .order {
		display: flex;
		position: relative;
		align-items: center;
		padding: 0 20rpx 20rpx;
		font-size: 28rpx;
	}

	.order-list-container .order-list .order .prodname-amount {
		margin: 20rpx;
		height: 100%;
	}

	.order-list-container .order-list .order .prodname-amount .prodname {
		font-size: 26rpx;
		margin-bottom: 30rpx;
	}

	.order-list-container .order-list .order .prodname-amount .prod-amount {
		margin: 30rpx 0 0 20rpx;
		color: #999999;
	}

	.order-list-container .order-list .order .prod-pic image {
		width: 140rpx;
		height: 150rpx;
		vertical-align: middle;
	}

	.order-list-container .order-list .order .prod-payamount {
		position: absolute;
		right: 20rpx;
	}

	.order-list-container .orders-info {
		padding: 0 20rpx 20rpx;
		border: 1px solid #FAFAFA;
		font-size: 24rpx;
	}

	.order-list-container .orders-info .orderinfo-item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
		font-size: 26rpx;
		color: #666666;
	}

	.order-list-container .orders-info .transfer .amount {
		color: #333333;
	}

	/* .orders-info .orderinfo-item switch {
  width: 80rpx;
  height: 40rpx;
  line-height: 40rpx;
}  */





	.total-info {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
	}

	.total-info .totalinfo-content {
		display: flex;
		font-size: 26rpx;
	}

	.total-info .totalinfo-content text {
		vertical-align: middle;
	}

	.total-info .totalinfo-content .totalpay-info {
		margin: 0 32rpx 0 16rpx;
	}

	.total-info .totalinfo-content .discount-info-amount {
		color: #D81E06;
	}

	.total-info .totalinfo-content .totalpay-amount {
		font-size: 32rpx;
	}

	.marks {
		width: 100%;
		background-color: #ffffff;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		font-size: 28rpx;
		color: #626262;
		border-radius: 8rpx;
	}

	.marks image {
		width: 16rpx;
		vertical-align: middle;
	}

	.aggrement {
		margin-top: 20rpx;
		font-size: 26rpx;
		height: 40rpx;
		padding-top: 5rpx;
	}

	.aggrement text {
		vertical-align: middle;
	}

	/*checkbox 选项框大小  */
	checkbox .wx-checkbox-input {
		width: 26rpx;
		height: 26rpx;
	}

	/*checkbox选中后样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #D81E06;
		border-color: #D81E06;
	}

	/*checkbox选中后图标样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		width: 20rpx;
		height: 20rpx;
		line-height: 20rpx;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}

	.aggrement .aggrement-content {
		color: #D81E06;
	}

	.submit-footer {
		position: fixed;
		height: 100rpx;
		background-color: #ffffff;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		box-shadow: 0 0 12px rgba(148, 148, 148, 0.17);
	}

	.submit-footer .submit-pay {
		color: #D81E06;
		font-weight: 500;
		margin-left: 20rpx;
		font-size: 42rpx;
	}

	.submit-footer .submitbtn {
		width: 210rpx;
		text-align: center;
		background-color: #D81E06;
		color: #ffffff;
		font-size: 32rpx;
	}

	.mark-pop {
		position: fixed;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
		z-index: 9;
	}

	.mark-pop .hide {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.mark-pop .mark-box {
		height: 45%;
		width: 100%;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		z-index: 99;
		box-sizing: border-box;
		padding: 0 4%;
	}

	.mark-pop .mark-box .mark-tit {
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 34rpx;
		color: #3A3A3A;
	}

	.mark-pop .mark-box .input-box {
		width: 95%;
		height: 60%;
		background-color: #F1F0F0;
		margin: 0 auto;
		border-radius: 10rpx;
		padding: 20rpx;
		font-size: 26rpx;
		color: #666;
	}

	.mark-pop .mark-box .placeholder {
		font-size: 26rpx;
	}

	.mark-pop .mark-submitbtn {
		width: 100%;
		height: 72rpx;
		line-height: 72rpx;
		background-color: #FFAD4F;
		margin: 0 auto;
		text-align: center;
		color: #ffffff;
		font-size: 30rpx;
		border-radius: 40rpx;
		position: fixed;
		bottom: 18rpx;
		right: 50%;
		transform: translateX(50%);
	}

	.time-picker-pop {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
	}

	.time-picker-pop .hide {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.time-picker {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 40%;
		width: 100%;
		background-color: #ffffff;
	}

	.free-dialog-submit {
		color: #FFBF77;
	}

	.input-mobile-pop {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		color: #423F40;

	}

	.input-mobile-pop .hide {
		background-color: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100;
	}

	.input-mobile-pop .input-box {
		width: 70%;
		height: 260rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		background-color: white;
		padding-top: 30rpx;
		border-radius: 6rpx;
	}

	.input-mobile-pop .input-box .input input {
		width: 90%;
		height: 80rpx;
		background-color: #F1EFF2;
		margin: 35rpx auto 0;
	}

	.input-mobile-pop .input-box .footer {
		display: flex;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 20rpx;
	}

	.input-mobile-pop .input-box .footer view {
		width: 50%;
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
		height: 600rpx;
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
		height: 68rpx;
		width: 80%;
		background-color: #FFBF77;
		margin: 0 auto;
		color: #ffffff;
		text-align: center;
		line-height: 68rpx;
		border-radius: 30rpx;
		margin-top: 10rpx;
	}

	/* 多行文本溢出*/
	.text-ellipsis {
		width: 550rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		lines: 2;
		line-height: 1.2;
		/* #ifndef APP-NVUE */
		text-overflow: -o-ellipsis-lastline;
		display: -webkit-inline-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		/* #endif */
	}
</style>
