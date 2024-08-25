<template>
	<view>
		<!--pages/groupbuy-submit/groupbuy-submit.wxml-->
		<view class="page-head">
<!-- 			<navigation :title="title" :naviStyle="style" style="width:100%;" :ifShowBtn="true"></navigation>
 -->		
		<customNavi :naviData='naviData'>确认订单</customNavi>
 </view>
 


		<view class="container">
			<view class="order-info">
				<view>拼团中，待支付</view>
				<view class="small-font">剩余23小时59分钟，订单将自动取消</view>
				<image class="page-head-img" src="/static/images/icon/to-be-pay.png" mode="aspectFit"></image>
			</view>

			<view class="groupbuy-info" v-if="ptglid">
				<image src="/static/images/icon/group02.png" mode="aspectFit"></image>
				<text>已为你加入加入仅差一人的好友团</text>
				<view class="headphoto-list">
					<view class="photobox">
						<image class="photoimage" :src="groupbuyList[0].pic"></image>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="photobox">
						<open-data class="photoimage" type="userAvatarUrl"></open-data>
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="photobox">
						<image :src="userInfo.pic" mode="aspectFit" class="photoimage"></image>
					</view>
					<!-- #endif -->
				</view>
			</view>

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
								<image src="/static/images/icon/location.png" mode="widthFix"
									style="position:relative;top: 12px;left: -8rpx;"></image>
								<text
									v-if="userAddr.province">{{userAddr.province}}{{userAddr.city}}{{userAddr.area}}{{userAddr.street}}{{userAddr.addr}}</text>
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
							<!-- #ifdef MP-WEIXIN -->
							<switch class="wx-switch-input" name="switch" color="#FFBF77" @change="ifSelfMention = $event.target.value"
								:checked="ifSelfMention" :disabled="ifOnlySelfmention"></switch>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<switch style="transform:scale(0.7)" name="switch" color="#FFBF77" @change="ifSelfMention = $event.target.value"
								:checked="ifSelfMention" :disabled="ifOnlySelfmention"></switch>
							<!-- #endif -->
							{{ifOnlySelfmention?'仅自提':'自提'}}
							<!-- <switch class="wx-switch-input" name="switch" color="#FFBF77" bindchange='handleSwitch' disabled  checked='{{true}}'/>自提 -->
						</view>
					</view>
					<view class="transfer orderinfo-item">
						<view class="title">配送费</view>
						<view class="amount">￥{{transfee}}</view>
					</view>
					<view class="discount orderinfo-item" @tap="openRefundPop">
						<view class="title">优惠</view>
						<view class="amount">-￥{{orderReduce}}</view>
					</view>
					<view class="coupons orderinfo-item" @tap="openRefundPop">
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
				<text class="aggrement-content" @tap="goAgreement">《彩味塔用户协议》</text>
			</view>
		</view>

		<view class="footer-bar">
			<!-- <view class="cancel-submit" bindtap="cancelOrder">取消订单</view> -->
			<view class="totalpay-info ">
				<text class="totalpay-amount">￥{{actualTotal}}</text>
			</view>
			<button v-if="!userInfo.mobile" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
				class="groupbuy-submit">去支付</button>
			<button v-if="userInfo.mobile" class="groupbuy-submit" @tap="toPay">去支付</button>
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
	</view>
</template>

<script src="../../wxs/number.js"></script>

<script>
	// pages/submit-order/submit-order.js
	import navigation from "../../components/navigation/navigation"
	import customNavi from '@/components/custom-navi/custom-navi.vue'

	export default {
		data() {
			return {
				ifIReadAggrement: true,
				showMarkPop: false,
				markAnimation: null,
				ifSelfMention: false,
				couponSts: 1,
				couponList: [],
				// 订单入口 0购物车 1立即购买
				orderEntry: "0",
				userAddr: {},
				orderItems: [],
				orderReduce: 0,
				actualTotal: 0,
				total: 0,
				totalCount: 0,
				transfee: 0,
				remark: "",
				choosedCoupon: [],
				recordIds: [],
				tjr: '',
				//设置通过海报分享的推荐人
				title: "确认订单",
				multiIndex: [0, 0],
				style: {
					color: 'white',
					backgroundColor: '#FDBE79'
				},
				ifOpenMobileInput: false,
				ptglid: "",
				groupbuyList: "",
				dateTimeObj: [],
				ifOnlySelfmention: "",
				couponIds: [],
				pickupTime: "",
				popupShow: false,
				refundOrderNum: "",
				showRefundPop: false,
				refundAnimation: "",
				radioValue: "",
				naviData: {
					ifShowBtns: true
				}
			};
		},

		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			shopInfo() {
				return this.$store.state.currentShop.shopInfo
			},
		},


		components: {
			navigation,
			customNavi
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options);
			this.setData({
				// orderEntry: "0",
				orderEntry: options.orderEntry,
				tjr: options.tjr,
				ptglid: options.ptglid || ''
			});
			this.dataBulder();

			if (options.ptglid) {
				this.loadGroupbuyInfo(options.ptglid);
			}
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let number = uni.getStorageSync('phoneNumber');
			this.setData({
				phoneNumber: number
			});
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
				title: "彩味塔",
				path: '/pages/home/home',
				success: function(res) {}
			};
		},
		methods: {
			loadGroupbuyInfo(ptglid) {
				this.$request.get('/makeUpGroup/getPtStatus', {
					ptglid
				}).then(res => {
					this.setData({
						groupbuyList: res.userList,
					});
				})
			},

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
				var addrId = this.userAddr.addrId
				uni.showLoading({
					mask: true
				});
				this.$request.post("/p/order/confirm", {
					addrId: addrId || 0,
					orderItem: this.orderEntry === "1" ? JSON.parse(uni.getStorageSync("orderItem")) :
						undefined,
					basketIds: this.orderEntry === "0" ? JSON.parse(uni.getStorageSync("basketIds")) :
						undefined,
					couponIds: this.couponIds,
					recordIds: this.recordIds,
					userChangeCoupon: 1,
					remark: this.remark,
					shopId: this.shopInfo.shopId
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
						ifSelfMention: res.shopCartOrders[0]
							.onlySelfmention // transfee: res.shopCartOrders[0].transfee,
						// shopReduce: res.shopCartOrders[0].shopReduce,

					});
				}, )
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
					shopId: this.shopInfo.shopId
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
						userAddr: res.userAddr
					});
				}, )
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
				var self = this;
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
						title: '此服务需要您阅读同意《彩味塔用户协议》',
						icon: 'none'
					});
					return;
				}
				self.submitOrder();
			},
			getPhoneNumber: function(e) {
				let self = this;
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					self.$request.get("/p/user/getPhoneNumber", {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv //向量
					}).then((res) => {
						if (res != undefined && res != null) {
							uni.setStorageSync('phoneNumber', res);
							self.$store.state.commit('updateUserInfo', { mobile: res })
							self.toPay();
						}
					}, (rej) => {
						console.log(rej)
					})
				}
								
			},

			cancelOrder() {
				uni.showModal({
					title: '确认是否取消订单？',
					confirmColor: '#FA4D49',
					confirm: () => {
						uni.navigateBack({});
					}
				});
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
						shopId: getApp().shopId,
						tjr: this.tjr,
						pickupTime: this.ifSelfMention ? this.pickupTime : '',
						distributionType: this.ifSelfMention ? '1' : '',
						purchaseType: 2,
						ptglid: this.ptglid || '',
						prodId: this.orderItems[0].prodId
					}]
				}).then((res) => {
					res => {
						uni.hideLoading();
						this.calWeixinPay(res.orderNumbers);
					}
				}, (rej) => {
					console.log(rej)
				})
			},

			/**
			 * 唤起微信支付
			 */
			calWeixinPay: function(orderNumbers) {
				let shopId = getApp().shopId;
				console.log(orderNumbers);
				uni.showLoading({
					mask: true
				});
				this.$request.post("/p/order/pay", {
					payType: 1,
					orderNumbers: orderNumbers
				}).then((res) => {
					uni.hideLoading();
					uni.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.packageValue,
						signType: res.signType,
						paySign: res.paySign,
						success: e => {
							//让用户对订阅消息授权
							uni.requestSubscribeMessage({
								tmplIds: [
									'ZGR6BeCQozAl-XTzhLjFZBRUM9E18boBXiUWz0LFK_0'
								],
								success(res) {}
							});
							uni.navigateTo({
								url: `/pages/groupbuy-orderdetails/groupbuy-orderdetails?orderNum=${orderNumbers}&shopId=${shopId}&enterFrom=submit`
							});
						},
						fail: err => {
							uni.navigateTo({
								url: '/pages/pay-result/pay-result?sts=0&orderNumbers=' +
									orderNumbers + "&orderType=" + this.orderType
							});
						}
					});
				}, (rej) => {
					console.log(rej)
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
				var self = this;
				let index = self.choosedCoupon.indexOf(e.detail.coupon);
				if (index === -1) {
					self.choosedCoupon.push(e.detail.coupon); // self.data.recordIds.push(e.detail.recordId)
				} else {
					self.choosedCoupon.splice(index, 1); // self.data.recordIds.splice(index, 1)
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
				var self = this;
				var mobile = self.selfMentionMobile;
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
				let res
				if (self.userAddr) {
					url = "/p/address/updateAddr";
					method = "PUT";
					res = this.$request.put(url, {
						mobile,
						addrId: this.userAddr ? this.userAddr.addrId : 0
					})
				} else {
					res = this.$request.post("/p/address/addAddr", {
						mobile,
						addrId: this.userAddr ? this.userAddr.addrId : 0
					})
				}
				res.then((res) => {
					uni.hideLoading();
					self.setData({
						ifOpenMobileInput: false
					});
					self.loadOrderData();
				})
			},
			openRefundPop: function(e) {
				this.setData({
					refundOrderNum: e.currentTarget.dataset.ordernum
				});
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
			}
		}
	};
</script>
<style>
	/* pages/groupbuy-submit/groupbuy-submit.wxss */
	page {
		background-color: #EEEEEE;
	}

	.page-head {
		background: #FFA138;
	}

	.order-info {
		height: 170rpx;
		color: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: #ffffff;
		background-size: cover;
		margin: 0 auto 20rpx;
		border-radius: 10rpx;
		color: #FE7635;
		position: relative;
	}

	.order-info .small-font {
		font-size: 24rpx;
	}

	.order-info view {
		margin: 12rpx 0;
	}

	.page-head-img {
		position: absolute;
		width: 180rpx;
		height: 180rpx;
		right: 20rpx;
	}

	.order-info view:first-child {
		font-size: 30rpx;
	}

	.order-info view:last-child {
		font-size: 26rpx;
	}

	.container {
		box-sizing: border-box;
		padding: 20rpx 3% 140rpx;
		width: 100%;
		background: linear-gradient(to bottom, #fdbe78, #FFFFFF);
		margin-top: 0;
	}

	.groupbuy-info {
		display: flex;
		align-items: center;
		color: #5B5B5B;
		position: relative;
		height: 110rpx;
		background-color: #ffffff;
		margin: 20rpx 0;
		border-radius: 12rpx;
		font-size: 26rpx;

	}

	.groupbuy-info>image {
		height: 30rpx;
		width: 30rpx;
		margin: 0 12rpx 0 20rpx;
	}

	.groupbuy-info .headphoto-list {
		position: absolute;
		display: flex;
		right: 0;
	}

	.groupbuy-info .headphoto-list .photobox {
		height: 60rpx;
		width: 60rpx;
		border-radius: 50%;
		background-color: #ffffff;
		overflow: hidden;
		border: 5rpx solid #ffd6a9;
	}

	.groupbuy-info .headphoto-list .photobox:last-child {
		position: relative;
		right: 25rpx;
	}

	.groupbuy-info .headphoto-list .photoimage {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
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

	.address-container .address-content .addressinfo .location-receiver {
		margin-left: 10rpx;
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
		color: #FE7635;
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



	.wx-switch-input {
		width: 100rpx !important;
		height: 57rpx !important;
	}

	/* false的样式 */
	.wx-switch-input::before {
		width: 100rpx !important;
		height: 53rpx !important;
	}

	/* true的样式 */
	.wx-switch-input::after {
		width: 57rpx !important;
		height: 53rpx !important;
	}


	.order-list-container .orders-info .discount .amount {
		color: #FE7635;
	}

	.order-list-container .orders-info .coupons .amount {
		font-size: 24rpx;
	}

	.wx-switch-input {
		width: 80rpx !important;
		height: 42rpx !important;
		margin-right: 10rpx;
	}

	/* false的样式 */
	.wx-switch-input::before {
		width: 76rpx !important;
		height: 38rpx !important;
	}

	/* true的样式 */
	.wx-switch-input::after {
		width: 38rpx !important;
		height: 38rpx !important;
	}

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
		color: #666;
	}

	.total-info .totalinfo-content .totalpay-info {
		margin: 0 32rpx 0 16rpx;
	}

	.totalpay-info text {
		line-height: 54rpx;
	}

	.totalpay-info .totalpay-amount {
		margin-right: 20rpx;
		color: #FE7635;
		font-size: 40rpx;
	}

	.totalpay-info .discount-info-tit {
		color: #999;
		font-size: 24rpx;
	}

	.totalpay-info .discount-info-amount {
		font-size: 24rpx;
		color: #999;
	}

	.total-info .totalinfo-content .discount-info-amount {
		color: #FE7635;
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
		background: #FE7635;
		border-color: #FE7635;
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
		color: #FE7635;
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
		color: #FE7635;
		font-weight: 500;
		margin-left: 20rpx;
		font-size: 42rpx;
	}

	.submit-footer .submitbtn {
		width: 210rpx;
		text-align: center;
		background-color: #FE7635;
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

	.footer-bar {
		height: 100rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 -2rpx 1px #f1f1f1;
	}

	.footer-bar view {
		margin-left: 20rpx;
		height: 54rpx;
		width: 100%;
		border-radius: 30rpx;
		font-size: 28rpx;
	}

	.footer-bar .cancel-submit {
		border: 1px solid #c1c1c1;
		color: #c1c1c1;
	}

	.footer-bar .groupbuy-submit {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: #FE7635;
		color: #ffffff;
		width: 260rpx;
		border-radius: 0;
	}
</style>
