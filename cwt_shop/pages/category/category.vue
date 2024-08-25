<template>
	<view>
		<customNavi :naviData='naviData'>{{shopInfo.shopName||'彩味塔'}}</customNavi>
		<!-- #ifdef MP-TOUTIAO -->
		<view class="movable-area" :style="{height: (screenHeight-customBar)+'px'}">
		<!-- #endif -->
		<!-- #ifndef MP-TOUTIAO -->
		<movable-area class="movable-area" :style="{height: (screenHeight-customBar)+'px'}">
		<!-- #endif -->
			<!-- #ifndef MP-TOUTIAO -->
			<movable-view v-show="basketHide" class="movable-view" @touchend="basketMove" direction="all"
				:x="movableView.x" :y="movableView.y" :damping="2000" style="position: absolute;z-index: 999;"
				:friction="30" @tap="showBasket">
				<view>
					<image src="/static/images/icon/basket.png" mode="widthFix"></image>
					<view :animation="basketIconAnimation" class="basketCount">{{basketCount}}</view>
				</view>
			</movable-view>
			<!-- #endif -->

			<view class="container">
				<view class="shopHead" @click="showMiniPop = !showMiniPop">
					<view class="shoplogo">
						<image src="/static/images/icon/logo.png" mode="aspectFit"></image>
					</view>
					<view class="shopinfo">
						<view class="shopName-intro">
							<view class="shopName">
								{{shopInfo.shopName?shopInfo.shopName:'小象智慧门店'}}
							</view>
							<view class="shop-intro">
								<image src="/static/images/icon/littlesmile.png" mode="aspectFit"></image>
								{{shopInfo.intro?shopInfo.intro: '有格调，有味道的精品美食'}}
							</view>
						</view>
						<view v-if="shopInfo.openTime" class="notice">
							营业时间：{{shopInfo.openTime}}
						</view>
					</view>
				</view>

				<view class="mainMenu">
					<view :class="'mainMenu-item ' + (selMainMenuIndex==1?'active':'')" @tap="mainMenuTap"
						data-index="1">商品</view>
					<view :class="'mainMenu-item ' + (selMainMenuIndex==2?'active':'')" @tap="mainMenuTap"
						data-index="2">商家</view>
				</view>
				<!-- 滚动内容区 -->
				<view class="main" v-if="showOrder" :animation="orderAnimation"
					:style="{height: `calc(100% - 350rpx)`}">
					<view class="coupons" @tap="showCouponPopFun">
						<view class="tickets" v-if="couponList_type0.length>0">
							<block v-for="(item, index) in couponList_type0" :key="index">
								<view class="ticket"
									v-if="(item.state == 0&&item.useState == 2)||(item.state == 0&&item.useState == 1)">
									<view style="display:flex;" class="ticket-body recept">
										<view class="ticket-info">￥</view>
										<view class="ticket-amount">{{item.fullAmountReduce}}</view>
										<view class="ticket-info">无门槛</view>
									</view>
									<view class="ticket-footer recept">已领</view>
								</view>
								<view class="ticket" v-if="item.state == 0&&item.useState==null">
									<view style="display:flex;" class="ticket-body">
										<view class="ticket-info">￥</view>
										<view class="ticket-amount">{{item.fullAmountReduce}}</view>
										<view class="ticket-info">无门槛</view>
									</view>
									<view class="ticket-footer">领取</view>
								</view>
							</block>
						</view>
						<view class="bigsale" v-if="couponList_type0.length>0">
							<block v-for="(item, index) in couponList_type1" :key="index">
								<view class="bigsale-item">
									满{{item.reduceMoney}}减{{item.fullAmountReduce}}；
								</view>
							</block>
							<view class="bigsale-item"> 免配送费；</view>
						</view>
					</view>


					<!-- 左侧菜单start -->
					<view class="prodlist">
						<scroll-view scroll-y="true" class="leftmenu">
							<block v-for="(item, index) in categoryList" :key="item.categoryId">
								<view class="menu-item" :class="(item.categoryName=='店铺招牌'?'recommend': '') + ' ' + 
									(item.categoryName=='新品推荐'?'newprods': '') + ' ' + 
									(item.categoryName=='活动专区'?'discountedProd': '') + ' ' + 
									(selIndex==index?'active':'')" :data-index="index" :data-id="item.categoryId" :data-name="item.categoryName"
									@click="onMenuTab(index)">
									<view class="icon">
										<image v-if="item.categoryName == '新品推荐'"
											src="/static/images/icon/newprod02.png" style="width: 16.8px;height: 16px;">
										</image>
										<image v-if="item.categoryName == '店铺招牌'" src="/static/images/icon/fire.png"
											style="width: 16.8px;height: 17.78px;"></image>
										<image v-if="item.categoryName == '活动专区'"
											src="/static/images/icon/discountedProd.png"
											style="width: 16.8px;height: 18.95px;"></image>
									</view>
									<view class="txt">{{item.categoryName}}</view>
								</view>
							</block>
						</scroll-view>
						<!-- 左侧菜单end -->

						<!-- 右侧内容start -->
						<scroll-view scroll-y="true" class="rightcontent">
							<view class="cont-item">
								<image class="recommend-icon" v-if="selIndex==0" src="/static/images/icon/tuijian.png"
									mode="widthFix"></image>
								<block v-for="(item, index) in productList" :key="index">
									<view class="show-item" @tap="toProdPage" :data-prodid="item.prodId"
										:data-isGroupProd="item.isGroupProd">
										<view class="add-order" @click.stop="addToCart_(item)">
											<image src="/static/images/icon/basket02.png" mode="widthFix"></image>
										</view>

										<view class="more-prod-pic">
											<view v-if="index==0" class="recommend"></view>
											<view v-if="index==1" class="newprod"></view>
											<image :src="item.pic" class="more-pic" mode="widthFix"></image>
										</view>
										<view class="prod-text-right">
											<view class="prod-text more">
												{{item.prodName}}
											</view>
											<view class="cate-prod-info"
												:style="item.activityId?'margin-bottom:10px':''">
												{{item.brief}}
											</view>
											<view style="display:flex;
													justify-content:space-between;
													position:relative;">
												<view v-if="item.isGroupProd === '1'" class="prod-price more">
													<view>
														<text class="symbol">拼团价：￥</text>
														<text class="big-num">
															{{wxs.parsePrice(item.ptj)[0]}}
														</text>
														<text class="small-num">
															.{{wxs.parsePrice(item.ptj)[1]}}
														</text>
													</view>
													<view style="text-decoration:line-through;color:#999;">
														<text class="symbol">原价：￥</text>
														<text class="big-num">
															{{wxs.parsePrice(item.oriPrice)[0]}}
														</text>
														<text class="small-num">
															.{{wxs.parsePrice(item.oriPrice)[1]}}
														</text>
													</view>
												</view>
												<view v-else-if="item.activityPrice" class="prod-price more">
													<view>
														<text class="symbol">活动价：￥</text>
														<text class="big-num">
															{{wxs.parsePrice(item.activityPrice)[0]}}
														</text>
														<text class="small-num">
															.{{wxs.parsePrice(item.activityPrice)[1]}}
														</text>
													</view>
													<view style="text-decoration:line-through;color:#999;">
														<text class="symbol">原价：￥</text>
														<text class="big-num">
															{{wxs.parsePrice(item.price)[0]}}
														</text>
														<text class="small-num">
															.{{wxs.parsePrice(item.price)[1]}}
														</text>
													</view>
												</view>
												<view v-else-if="!item.activityPrice" class="prod-price more">
													<view>
														<text class="symbol">现价：￥</text>
														<text class="big-num">
															{{wxs.parsePrice(item.price)[0]}}
														</text>
														<text class="small-num">
															.{{wxs.parsePrice(item.price)[1]}}
														</text>
													</view>
													<view style="text-decoration:line-through;color:#999;">
														<text class="symbol">原价：￥</text>
														<text class="big-num">
															{{wxs.parsePrice(item.oriPrice)[0]}}
														</text>
														<text class="small-num">
															.{{wxs.parsePrice(item.oriPrice)[1]}}
														</text>
													</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							</view>
							<!-- </block> -->
						</scroll-view>
						<!-- 右侧内容end -->
						<!-- </block> -->

					</view>
				</view>
				<view class="shopInfo" v-if="showShopInfo" :animation="shopInfoAnimation">
					<view class="separation"></view>
					<view class="infoItem">
						<view class="tit-icon">
							<image src="/static/images/icon/location.png" mode="widthFix"></image>
						</view>
						<view class="title">{{shopInfo.city+shopInfo.area+shopInfo.shopAddress}}</view>
						<view class="phone-icon" @tap="makephonecall">
							<image src="/static/images/icon/phone.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="infoItem" @tap="goLicense">
						<view class="tit-icon">
							<image src="/static/images/icon/security.png" mode="widthFix"></image>
						</view>
						<view class="title">查看食品安全档案</view>
						<view class="more-icon">
							<image src="/static/images/icon/more01.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="separation"></view>
					<view class="infoItem">
						<view class="tit-icon">
							<image src="/static/images/icon/transfee.png" mode="widthFix"></image>
						</view>
						<view class="title">配送服务：由商家提供配送服务，支持自提</view>
					</view>
					<view class="infoItem">
						<view class="tit-icon">
							<image src="/static/images/icon/time.png" mode="widthFix"></image>
						</view>
						<view class="title">配送时间：{{shopInfo.openTime}}</view>
					</view>
					<view class="infoItem">
						<view class="tit-icon">
							<image src="/static/images/icon/pay.png" mode="widthFix"></image>
						</view>
						<view class="title">该商家支持在线支付</view>
					</view>
				</view>
			</view>
		<!-- #ifdef MP-TOUTIAO -->
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-TOUTIAO -->
		</movable-area>
		<!-- #endif -->

		<!-- 购物车弹窗 -->
		<view v-if="popupShow && !ifInToutiao">
			<view class="popup-hide" v-if="popupShow" @tap.stop="hideBasket">
			</view>
			<view class="popup-box" :animation="basketAnimation">
				<view class="popup-tit">
					<view class="popup-tit-info">
						已选商品
					</view>
					<view class="clear-btn" @tap="onDelBasket">
						<image src="/static/images/icon/clear-his.png" mode="widthFix"></image>
						<view>清空购物车</view>
					</view>
				</view>

				<view class="prod-list">
					<block v-for="(prod, index) in shopCartItems" :key="index">
						<view class="item">
							<view class="prodinfo">
								<view class="pic">
									<image :src="prod.pic"></image>
								</view>
								<view class="opt">
									<view class="prod-name">
										{{prod.prodName}}
									</view>
									<text class="prod-info-text" :class="(prod.skuName?'':'empty-n')">
										{{prod.skuName == null?'': prod.skuName}}
									</text>
									<view class="price-count">
										<view v-if="!prod.activityPrice" class="price">
											<text class="symbol">￥</text>
											<text class="big-num">
												{{wxs.parsePrice(prod.price)[0]}}
											</text>
											<text class="small-num">
												.{{wxs.parsePrice(prod.price)[1]}}
											</text>
										</view>
										<view v-if="prod.activityPrice" class="price" style="font-size:13px;">
											<view style="text-decoration:line-through;margin-right:20rpx;color:#999;">
												原价：￥{{prod.price}}
											</view>
											<view>活动价：￥{{prod.activityPrice}}</view>
										</view>
										<view class="m-numSelector">
											<view @tap="updateCount(prod, index, -1)" class="minus">
												<image src="/static/images/icon/decrease.png" mode="widthFix"></image>
											</view>
											<input disabled type="number" :value="prod.prodCount"
												@blur="onBasketCountChange" :data-index="index"
												:data-oldCount="prod.prodCount"></input>
											<view @tap="updateCount(prod, index, 1)" class="plus">
												<image src="/static/images/icon/increase.png" mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>

				<!-- 底部按钮 -->
				<view class="cart-footer" v-if="shopCartItems.length>0">
					<view class="basketIcon">
						<image src="/static/images/icon/add.png" mode="widthFix"></image>
					</view>
					<view class="btn total">
						<view class="finally">
							<text>合计:</text>
							<view class="price">
								<text class="symbol">￥</text>
								<text class="big-num">
									{{wxs.parsePrice(priceInfo.finalMoney)[0]}}
								</text>
								<text class="small-num">
									.{{wxs.parsePrice(priceInfo.finalMoney)[1]}}
								</text>
							</view>
						</view>
						<view class="total-msg">
							满{{priceInfo.startPrice||0}}元起送
						</view>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button v-if="!mobile" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
						class="btn settle" :class="(priceInfo.startPrice>priceInfo.finalMoney?'btngray':'')">
						<text>去结算</text>
					</button>
					<button v-if="mobile" @tap="toFirmOrder" class="btn settle"
						:class="(priceInfo.startPrice>priceInfo.finalMoney?'btngray':'')">
						<text>去结算</text>
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button @tap="toFirmOrder" class="btn settle" :class="(priceInfo.startPrice>priceInfo.finalMoney?'btngray':'')">
						<text>去结算</text>
					</button>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<view class="couponmodule-pop" :hidden="!showCoupons">
			<view class="shadow" @tap="closeCouponPop" catchtouchmove="none"></view>
			<view class="couponbox-pop" :animation="couponPopAnimation">
				<view class="coupontit-pop">优惠券</view>
				<block v-for="(item, index) in couponList" :key="index">
					<view class="coupons-pop">
						<view class="coupon-pop" v-if="item.state == 0&&item.useState==null">
							<image src="http://images.51xeld.com/2020/07/cb438c51591e40eea7a528b06cb9c186.png"
								mode="widthFix"></image>
							<view class="couponinfo-pop">
								<view class="amount">
									<text>{{item.fullAmountReduce}}</text>
									<text>元</text>
								</view>
								<view class="coupon-limit">
									<view class="limt-prodname">{
										{item.couponTitle}}
									</view>
									<view class="limt-time">
										<text>有效期限：</text>
										<text>{{item.startTime}}-{{item.endTime}}</text>
									</view>
								</view>
								<view class="getcouponbtn-pop" :data-index="index" @tap="handleReceive">
									领取
								</view>
							</view>
						</view>
						<view class="coupon-pop"
							v-if="(item.state == 0&&item.useState == 2) || (item.state == 0&&item.useState == 1)">
							<image src="http://images.51xeld.com/2020/07/828241eb17a64600aae0a71bc5a13e23.png"
								mode="widthFix"></image>
							<view class="couponinfo-pop">
								<view class="amount">
									<text>{{item.fullAmountReduce}}</text>
									<text>元</text>
								</view>
								<view class="coupon-limit">
									<view class="limt-prodname">{{item.couponTitle}}</view>
									<view class="limt-time">
										<text>有效期限：</text>
										<text>{{item.startTime}}-{{item.endTime}}</text>
									</view>
								</view>
								<view class="getcouponbtn-pop-gray">已领取</view>
							</view>
						</view>
					</view>
				</block>
				<view class="coupon-notice-pop">
					<view class="coupon-notice-tit-pop">优惠券说明</view>
					<view>1.不与其他活动以及促销商品叠加使用。</view>
					<view>2.此券不能出售转让，不兑现找零。</view>
				</view>
			</view>
		</view>
		
		<shopCartTabToutiao v-if='ifInToutiao'></shopCartTabToutiao>
		
		<!-- <miniPop :show='showMiniPop' @close='closeMiniPop'></miniPop> -->
		
	</view>
</template>

<script>
	// const wxs = require('../../utils/number.js')
	var couponList = (require('./couponList.js')).couponList
	import customNavi from "@/components/custom-navi/custom-navi.vue";
	import shopCartTabToutiao from './shop-cart-tabbar-toutiao.vue'
	import shopCartTabWeixin from './shop-cart-tabbar-toutiao.vue'

	export default {
		data() {
			return {
				// wxs: wxs,
				naviData: {
					ifGoBack: true
				},
				movableView: { //movable-view位置
					x: 0,
					y: 200,
				},
				selMainMenuIndex: '1',
				basketAnimation: null,
				orderAnimation: null,
				shopInfoAnimation: null,
				basketIconAnimation: null,
				popupShow: false, //购物车弹窗
				selIndex: 0, //左侧分类选中索引
				categoryList: [], //分类列表
				productList: [],
				showOrder: true, //商品分类页
				showShopInfo: false, //店铺信息也
				mobile: '',
				noticeList: [],
				showCouponPop: false, //店铺优惠券
				couponList: couponList,
				couponList_type0: [],
				couponList_type1: [],
				couponPopAnimation: "",
				showCoupons: false,
				showMiniPop: true,
				// #ifdef MP-TOUTIAO
				ifInToutiao: true,
				//#endif
				// #ifndef MP-TOUTIAO
				ifInToutiao: false,
				//#endif
			};
		},

		components: {
			customNavi,
			shopCartTabToutiao,
			shopCartTabWeixin,
		},
		props: {},

		computed: {
			shopId() {
				return this.$store.state.currentShop.shopId
			},
			shopInfo() {
				return this.$store.getters['shop/shopInfo']
			},
			customBar() {
				return this.$store.getters['sysInfo/customBarHeight']
			},
			screenHeight() {
				return this.$store.state.sysInfo.sysInfo.screenHeight
			},
			//购物车数量
			basketCount() {
				let count = this.$store.getters['shop/shopCartTotalCount']
				if(count == 0) this.hideBasket()
				return count
			},
			//是否显示movable-view 购物车图标
			basketHide() {
				if (this.basketCount && !this.popupShow) {
					return true
				}
				return false
			},
			//标记从产品分类加入购物车的产品数量，加购成功累计数量，重新获取shopCartItem则重置为0，以此减少请求数量
			tempCount: {
				get() {
					return this.$store.getters['shop/tempCount']
				},
				set(newValue, oldValue) {
					this.$store.commit('shop/updateTempCount', newValue)
				}
			},
			shopCartItems() {
				return this.$store.getters['shop/shopCartItems']
			},
			priceInfo() {
				return this.$store.getters['shop/priceInfo']
			}
		},
		
		onLoad(options) {
			this.mobile = this.$store.state.userInfo.mobile
			// if(options.shopId) {
			// 	this.$store.dispatch('currentShop/getShopInfo', options.shopId)
			// }
		},

		onShow() {
			// this.selIndex = 0
			this.loadData()
		},
		
		onPullDownRefresh() {
			this.loadData()
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
			loadData() {
				this.$request.get("/category/categoryInfo", {
					shopId: this.shopId
				}).then(res => {
					if(res.length !== 0) {
						this.categoryList = res
						this.onMenuTab(this.selIndex)
					}
				})
				this.getNoticeList();
				this.getCouponList();
			},
			
			closeMiniPop() {
				this.showMiniPop = false
			},
			
			getCouponList: function() {
				this.$request.get('/coupon/coupon/shopCoupon/' + this.shopId, ).then((res) => {
					var couponList_type0 = [];
					var couponList_type1 = [];
					res.forEach(item => {
						if (item.couponType == 0) {
							couponList_type0.push(item);
						} else if (item.couponType == 1) {
							couponList_type1.push(item);
						}
					});
					this.setData({
						couponList_type0,
						couponList_type1,
						couponList: res
					});
				}, rej => {
					console.log(rej)
				})
			},


			getNoticeList() {
				this.$request.get('/shop/notice/noticeList', {
					shopId: this.shopId
				}).then((res) => {
					this.noticeList = res
				}, rej => {
					console.log(rej)
				})
			},

			basketMove: function(e) {
				var windowWidth = this.$store.state.sysInfo.sysInfo.windowWidth
				var x = e.changedTouches[0].pageX > windowWidth / 2 ? windowWidth - 50 : 0;
				this.movableView.x = x
				this.movableView.y = e.changedTouches[0].pageY - 90
			},
			// 主菜单 点单/商家 点击事件
			mainMenuTap: function(e) {
				var shopInfoAnimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				var orderAnimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				var selMainMenuIndex = e ? e.currentTarget.dataset.index : 99;
				if (this.selMainMenuIndex == 1 && selMainMenuIndex == 2) {
					this.setData({
						shopInfoAnimation: shopInfoAnimation.translateX(450).opacity(0).step().export(),
						showShopInfo: true,
						orderAnimation: orderAnimation.translateX(-450).step().export(),
						selMainMenuIndex: selMainMenuIndex
					});
					setTimeout(() => {
						this.setData({
							showOrder: false,
							shopInfoAnimation: shopInfoAnimation.translateX(0).opacity(1).step()
								.export()
						});
					}, 100);
				} else if (this.selMainMenuIndex == 2 && selMainMenuIndex == 1) {
					// }else if ((this.data.selMainMenuIndex == 2 && selMainMenuIndex == 1) || selMainMenuIndex == 99) {
					this.setData({
						selMainMenuIndex: '1',
						shopInfoAnimation: shopInfoAnimation.translateX(450).step().export(),
						showOrder: true
					});
					setTimeout(() => {
						this.setData({
							showShopInfo: false,
							orderAnimation: orderAnimation.translateX(0).step().export()
						});
					}, 50);
				} else {}
			},

			/**
			 * 分类点击事件
			 */
			onMenuTab(index) {
				this.selIndex = index
				let category = this.categoryList[index]
				if (category.productList) {
					this.productList = category.productList
					return
				}
				var id = category.categoryId
				var name = category.categoryName
				if (name == '活动专区') {
					this.getDiscountedProd(index)
				} else {
					this.getProdList(id, index)
				}
			},

			getDiscountedProd() {
				this.$request.get('/prod/getActivityProd', {
					shopId: this.shopId
				}).then((res) => {
					var productList = res.records;
					productList.forEach((prod, index) => {
						productList[index].prodCount = 0;
						this.shopCartItems.forEach(item => {
							if (prod.prodId == item.prodId) {
								productList[index].prodCount = item.prodCount;
							}
						});
					});
					this.productList = productList
				}, rej => {
					console.log(rej)
				})
			},

			getProdList(categoryId, index) {
				//加载产品列表
				this.$request.get("/prod/pageProd", {
					categoryId: categoryId,
					shopId: this.shopId
				}).then((res) => {
					this.productList = res.records
					this.categoryList[index].productList = res.records
				}, (rej) => {
					console.log(rej)
				})
			},

			// 展开购物车弹窗
			showBasket() {
				if(!this.popupShow) {
					var basketAnimation = uni.createAnimation({
						duration: 400,
						timingFunction: 'ease-in-out'
					});
					// this.getBasketInfo();
					this.setData({
						popupShow: true,
						basketAnimation: basketAnimation.translateY(1000).step().export()
					});
					setTimeout(() => {
						this.setData({
							basketAnimation: basketAnimation.translateY(0).step().export()
						});
					});					
				}
			},
			// 关闭购物车弹窗
			hideBasket: function() {
				var basketAnimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				this.setData({
					basketAnimation: basketAnimation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						popupShow: false
					});
				}, 300);
			},

			async addToCart_(prod, index) {
				var prodId = prod.prodId;
				var activityorderflag = prod.activityorderflag;
				var activitytimesflag = prod.activitytimesflag;
				let defaultSku
				if (!prod.defaultSku) {
					let res = await this.$request.get("/prod/prodInfo", {
						prodId
					})
					if (res.skuList.length !== 0) {
						defaultSku = res.skuList[0].skuId
						prod.defaultSku = defaultSku
						this.$set(this.productList, index, prod)
					}
				} else {
					defaultSku = prod.defaultSku
				}
				let res = await this.$request.post("/p/shopCart/changeItem", {
					basketId: 0,
					count: 1,
					prodId: prodId,
					activityTimesFlag: activitytimesflag,
					activityOrderFlag: activityorderflag,
					shopId: this.shopId,
					skuId: defaultSku
				})
				if (res.status == 0) {
					this.$showToast(res.message, 2000)
					this.$store.dispatch('shop/refreshCartItems')
					if (this.basketHide) {
						this.addCarAnimation()
					}
				} else if (res.status == 1) {
					this.$showToast(res.message, null, 2000)
				} else {
					this.$showToast('网络出错，请稍后重试')
				}
			},

			addCarAnimation() {
				let animation = uni.createAnimation({
					duration: 100,
					timingFunction: 'ease-in-out'
				})
				animation.scale(1.5).step().scale(1).step();
				this.basketIconAnimation = animation
				setTimeout(() => {
					this.basketIconAnimation = null
				}, 200)
			},

			//判断数组是否包含某对象
			array_contain: function(array, obj) {
				for (var i = 0; i < array.length; i++) {
					if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
						return true;
				}
				return false;
			},
			// 购物车详情
			// getBasketInfo() {
			// 	//加载购物车
			// 	if(this.tempCount!==0) {
			// 		this.$store.dispatch('shop/refreshCartItems')
			// 	}
			// },
			//跳转商品详情页
			toProdPage: function(e) {
				var prodid = e.currentTarget.dataset.prodid;
				let isGroupProd = e.currentTarget.dataset.isgroupprod;
				if (isGroupProd == 1) {
					uni.navigateTo({
						url: '/pages/groupbuy/groupbuy?prodid=' + prodid
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/prod/prod?prodid=' + prodid
				});
			},

			// 输入产品数量
			onBasketCountChange: function(e) {
				var newCount = Number(e.detail.value);
				var index = e.currentTarget.dataset.index;
				var oldCount = e.currentTarget.dataset.oldcount;
				var shopCartItems = this.shopCartItems;
				if (newCount === "0") {
					this.updateCount(shopCartItems, index, 0 - oldCount);
				} else if (newCount > 0 && newCount !== oldCount) {
					this.updateCount(shopCartItems, index, newCount - oldCount);
				} else {
					shopCartItems[index].count = oldCount;
				}
			},

			async updateCount(prod, index, updateNum) {
				let res = await this.$request.post('/p/shopCart/changeItem', {
					count: updateNum,
					prodId: prod.prodId,
					skuId: prod.skuId,
					shopId: this.shopId,
					activityOrderFlag: prod.activityOrderFlag,
					activityTimesFlag: prod.activityTimesFlag,
				})
				//res== 0 更改成功
				//res== 1 更改失败
				if (res.status == 0) {
					// this.$store.commit('shop/updateGoodsCount', {index, prodId: prod.prodId, updateNum })
					this.$store.dispatch('shop/refreshCartItems')
				} else if (res.status == 1) {
					this.$showToast(res.message, null, 2000)
				} else {
					this.$showToast('网络出错，请稍后重试')
				}
			},

			/**
			 * 清空购物车
			 */
			onDelBasket: function() {
				let shopCartItems = this.shopCartItems;
				let self = this
				let basketIds = [];
				for (let i = 0; i < shopCartItems.length; i++) {
					basketIds.push(shopCartItems[i].basketId);
				}
				uni.showModal({
					title: '',
					content: '确认要删除选中的商品吗？',
					confirmColor: "#eb2444",
					async success(res) {
						if (res.confirm) {
							let res = await self.$request.delete("/p/shopCart/deleteItem", basketIds)
							self.$showToast(res)
							self.shopCartItems = []
							console.log('pre running clear shopcart')
							self.$store.commit('shop/clearShopCartItems')
							self.hideBasket()
						}
					}
				});
			},

			/**
			 * 授权获取手机号
			 */
			getPhoneNumber(e) {
				console.log(e)
				let that = this;
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					this.$request.get("/p/user/getPhoneNumber", {
						encryptedData: e.detail.encryptedData, //加密数据
						iv: e.detail.iv //向量
					}).then((res) => {
						if (res != undefined && res != null) {
							this.$store.commit('updateUserInfo', {
								mobile: res
							})
						}
					}, (rej) => {
						console.log(rej)
					})
					this.toFirmOrder();
				}else {
					this.$showToast('请授权手机号以便为您提供更好的服务')
				}
			},

			makephonecall: function() {
				uni.makePhoneCall({
					phoneNumber: this.shopInfo.mobile,
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

			/**
			 * 去结算
			 */
			toFirmOrder: function() {
				let { startPrice, finalMoney } = this.priceInfo
				if (startPrice > finalMoney) {
					return;
				}

				var shopCartItems = this.shopCartItems;
				var basketIds = [];
				shopCartItems.forEach(shopCartItem => {
					basketIds.push(shopCartItem.basketId);
				});
				uni.setStorageSync("basketIds", JSON.stringify(basketIds));
				uni.navigateTo({
					url: '/pages/submit-order/submit-order?orderEntry=0'
				});
			},
			goLicense: function() {
				uni.navigateTo({
					url: `/pages/show-license/show-license?bussinessLicense=${this.shopInfo.bussinessLicense}&hygienicLicense=${this.shopInfo.hygienicLicense}`
				});
			},
			// 开关优惠券弹窗
			showCouponPopFun: function() {
				var animation = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease-in-out'
				});
				this.setData({
					couponPopAnimation: animation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						showCoupons: true,
						couponPopAnimation: animation.translateY(0).step().export()
					});
				}, 10);
			},
			closeCouponPop: function() {
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: "ease-in-out"
				});
				this.setData({
					couponPopAnimation: animation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						showCoupons: false
					});
				}, 300);
			},
			//领取优惠券
			handleReceive(e) {
				var coupon = this.couponList[e.currentTarget.dataset.index];
				if (coupon.useState == null) {
					this.$request.post('/couponRecord/couponRecord', {
						...coupon,
						state: 1,
						shopId: getApp().shopId
					}).then((res) => {
						if (res.code === 200) {
							this.$showToast('领取成功')
						} else {
							this.$showToast('领取成功')
						}
						this.getCouponList()
					}, (rej) => {
						console.log(rej)
					})
				}
			}
		}
	};
</script>
<style>
	page {
		height: 100%;
		background-color: #fff;
	}

	.movable-area {
		width: 100%;

	}

	.movable-view {
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		background-color: #FFBF77;
		position: absolute !important;
	}

	.movable-view image {
		width: 100rpx;
		height: 100rpx;
	}

	.basketCount {
		background-color: #fff;
		color: #D81E06;
		border: 1px solid #D81E06;
		height: 36rpx;
		width: 36rpx;
		border-radius: 50%;
		font-size: 30rpx;
		text-align: center;
		line-height: 36rpx;
		position: absolute;
		top: -8rpx;
		right: -8rpx;
	}

	.shopHead {
		width: 100%;
		position: relative;
		height: 260rpx;
		color: #fff;
		display: flex;
		align-items: center;
		font-size: 34rpx;
		overflow: hidden;
		background-image: url(http://images.51xeld.com/2020/09/b37b7053294b40c5ac61beceefa0a46e.jpg);
		background-size: cover;
	}

	.shopHead>view {
		margin-left: 20rpx;
	}

	.shopHead .back-img {
		width: 100%;
		height: 200rpx;
		position: absolute;
		top: 0;
		z-index: -1;
		overflow: hidden;
	}

	.shopHead .shoplogo {
		width: 150rpx;
		background-color: #FFEBD8;
		height: 150rpx;
		border-radius: 50%;
		box-sizing: border-box;
		padding: 15rpx;
		margin-left: 40rpx;
	}

	.shopHead .shoplogo image {
		height: 120rpx;
		width: 120rpx;
		vertical-align: middle;
	}

	.shopHead .shopinfo .shopName-intro {
		padding-bottom: 10rpx;
	}

	.shopHead .shopinfo .shop-intro image {
		width: 20rpx;
		height: 19rpx;
	}

	.shopHead .shopinfo .shop-intro {
		font-size: 24rpx;
		padding-top: 10rpx;
		color: #D5D5D5;
	}

	.shopHead .shopinfo .notice {
		color: #F5F5F5;
		font-size: 24rpx;
	}

	.main {
		display: flex;
		overflow: hidden;
		flex-direction: column;
	}

	.mainMenu {
		height: 90rpx;
		width: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		line-height: 90rpx;
		color: #3D3D3D;
	}

	.mainMenu .active {
		color: #FFBF77;
		/* border-bottom: 6rpx solid #FFBF77; */
	}


	.coupons {
		width: 100%;
		background-color: #fff;
		font-size: 22rpx;
		/* padding-bottom: 20rpx; */
		border-bottom: 1px solid #F7F7F7;
		font-size: 23rpx;
	}

	.tickets {
		display: flex;
		width: 95%;
		margin: 0 auto;
		height: 50rpx;
		line-height: 50rpx;
		/* display: none; */
	}

	.ticket {
		display: flex;
		margin-right: 26rpx;
	}

	.ticket-body,
	.ticket-footer {
		background-color: #FF6C64;
		color: #FFFCFC;
		padding: 0 14rpx;
		border-right: 1px dashed white;
		border-radius: 10rpx;
	}

	.ticket-footer {
		border: 0;
	}

	.ticket-amount {
		margin: 0 4rpx 0 0;
		font-size: 30rpx;
	}

	.recept {
		background-color: #bbbbbb;
		color: #FFFFFF;
	}

	.bigsale {
		display: flex;
		width: 94%;
		margin: 0 auto;
		color: #BDBDBD;
		height: 60rpx;
		line-height: 60rpx;
	}


	.prodlist {
		display: flex;
		height: 100%;
	}

	/* 左侧菜单栏 */

	.leftmenu {
		width: 27%;
		height: 100%;
		box-sizing: border-box;
		background-color: #f5f6f7;
		overflow: scroll;
		z-index: 2;
	}

	.menu-item {
		height: 90rpx;
		color: #777;
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.menu-item view {
		margin-left: 6rpx;
	}

	.menu-item .icon {
		float: left;
		width: 48rpx;
		text-align: center;
	}

	.menu-item .txt {
		padding-top: 2px;
		float: left;
		font-weight: normal;
	}

	.menu-item.active {
		color: #FFBF77;
		font-size: 28rpx;
		font-weight: bold;
		position: relative;
		background: #fff;
	}

	.menu-item image {
		max-width: 100%;
		width: 70%;
		vertical-align: middle;
	}

	.menu-item.recommend {
		color: #FF544C;
	}

	.menu-item.newprods {
		color: #83B31F;
	}

	.discountedProd {
		color: #FFA531;
	}

	.menu-item text.tips-num {
		position: absolute;
		top: 20rpx;
		right: 15rpx;
		border-radius: 15rpx;
		width: 30rpx;
		height: 30rpx;
		background: red;
		color: #fff;
		font-size: 25rpx;
		line-height: 30rpx;
	}

	/* 右侧商品栏 */

	.rightcontent {
		width: 73%;
		height: 100%;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 1;
	}

	.rightcontent .recommend-icon {
		width: 150rpx;
		vertical-align: middle;
		margin: 10rpx 0 10rpx 20rpx;
	}

	.rightcontent .adver-map {
		width: auto;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		margin: 30rpx 20rpx 0;
	}

	.rightcontent .adver-map .item-a {
		display: block;
		font-size: 0;
		width: 100%;
	}

	.rightcontent .adver-map .item-a image {
		max-width: 100%;
	}

	.rightcontent .cont-item {
		padding: 20rpx 0;
	}

	.show-item {
		position: relative;
	}

	.show-item .add-order {
		position: absolute;
		z-index: 999;
		bottom: 20rpx;
		right: 20rpx;
	}

	.show-item .add-order image {
		width: 45rpx;
		height: 40rpx;
	}

	.rightcontent .cont-item .show-item .more-prod-pic {
		text-align: center;
		width: 170rpx;
		height: 170rpx;
		line-height: 150rpx;
		font-size: 0;
		position: relative;
		z-index: 1;
	}

	.rightcontent .cont-item .show-item .more-prod-pic .more-pic {
		max-width: 100%;
		max-height: 100%;
		border-radius: 8rpx;
		vertical-align: middle;
	}

	.rightcontent .cont-item .show-item {
		position: relative;
		display: flex;
		justify-content: start;
		padding: 20rpx 22rpx;
		border-bottom: 10rpx solid #F5F5F5;
	}

	.rightcontent .cont-item .show-item::after {
		content: '';
		background-color: #f4f4f4;
		left: 0;
		height: 1px;
		transform-origin: 50% 100% 0;
		bottom: 0;
		position: absolute;
		display: block;
		width: 510rpx;
		padding-left: 20rpx;
	}

	.rightcontent .cont-item .show-item .prod-text-right {
		margin-left: 20rpx;
		width: 75%;
	}

	.rightcontent .cont-item .show-item .prod-text-right .cate-prod-info {
		font-size: 24rpx;
		color: #999;
		margin: 10rpx 0 19rpx 0;
	}

	.rightcontent .cont-item .show-item .prod-text-right .prod-text.more {
		margin: 0;
		font-size: 28rpx;
		display: -webkit-box;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #000;
	}

	.rightcontent .cont-item .show-item .prod-text-right .prod-price.more {
		font-size: 28rpx;
		color: #eb2444;
		font-family: arial;
	}

	.rightcontent .cont-item .show-item .prod-text-right .add-order {
		height: 100rpx;
		width: 100rpx;
		border: 1px solid white;
		border-radius: 50%;
		position: absolute;
		right: 0;
		top: 0;
	}

	.rightcontent .cont-item .show-item .prod-text-right .add-order image {
		width: 100rpx;
	}

	.show-order {
		font-size: 30rpx;
		position: fixed;
		bottom: 0;
		width: 96%;
		text-align: center;
		background-color: #FFBF77;
		color: white;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		margin-left: 2%;
	}

	/* 订单列表 */
	.orderList .prod-text-right {
		margin-left: 20rpx;
		width: 75%;
	}

	.orderList .prod-text-right .cate-prod-info {
		font-size: 22rpx;
		color: #999;
		margin: 10rpx 0 20rpx 0;
	}

	.orderList .prod-text-right .prod-text.more {
		margin: 0;
		font-size: 28rpx;
		display: -webkit-box;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #000;
	}

	.orderList .prod-text-right .prod-price.more {
		font-size: 28rpx;
		color: #eb2444;
		font-family: arial;
	}

	.orderList .prod-text-right .add-order {
		height: 40rpx;
		width: 40rpx;
		background-color: #eb2444;
		border: 1px solid white;
		border-radius: 50%;
		font-size: 38rpx;
		color: white;
		font-family: arial;
		line-height: 40rpx;
		text-align: center;
	}

	/* 商家信息 */
	.shopInfo {
		display: flex;
		flex-direction: column;
		color: #666;
		font-size: 28rpx;
	}

	.shopInfo .separation {
		height: 10rpx;
		width: 100%;
		background-color: #F5F5F5;
	}

	.shopInfo .infoItem {
		padding: 0 40rpx;
		height: 100rpx;
		/* line-height: 100rpx; */
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: 1px solid #F8F8F8;
		background-color: #fff;
	}

	.shopInfo .infoItem .title {
		width: 80%;
	}

	.shopInfo .tit-icon {
		padding-right: 14rpx;
		position: relative;
		bottom: 4rpx;
	}

	.shopInfo .tit-icon image {
		width: 28rpx;
		vertical-align: middle;
	}

	.shopInfo .phone-icon {
		border-left: 1px solid #F5F5F5;
		position: absolute;
		right: 40rpx;
		height: 44rpx;
		padding-left: 26rpx;
	}

	.shopInfo .phone-icon image {
		width: 30rpx;
		vertical-align: middle;
	}

	.shopInfo .more-icon image {
		width: 16rpx;
		vertical-align: middle;
		position: absolute;
		right: 40rpx;
		top: 30rpx;
	}

	/* 购物车样式 */
	.popup-hide {
		position: fixed;
		/* top: 0; */
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.popup-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 48%;
		background-color: #fff;
		padding-bottom: 150rpx;
		z-index: 299;
	}

	.popup-tit {
		color: #3D3D3D;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		padding-left: 26rpx;
		background-color: #F5F5F5;
		display: flex;
		justify-content: space-between;
	}

	.clear-btn {
		display: flex;
		color: #707070;
		padding-right: 20rpx;
	}

	.clear-btn view {
		color: #999;
	}

	.clear-btn image {
		width: 30rpx;
		vertical-align: super;
		position: relative;
		top: 14rpx;
		padding-right: 5rpx;
	}

	.prod-list {
		width: 100%;
		overflow: scroll;
		height: 85%;
	}


	.prod-list .item {
		background: #fff;
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.prod-list .item .prodinfo {
		position: relative;
		color: #999;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.prod-list .item:last-child .prodinfo::after {
		height: 0;
	}

	.prod-list .item .staus {
		text-align: center;
		background: rgb(196, 192, 192);
		font-size: 20rpx;
		width: 50rpx;
		color: #fff;
	}

	.prodinfo {
		display: flex;
		margin-left: 20rpx;
	}

	.prod-list .item .opt {
		font-size: 28rpx;
		margin-left: 20rpx;
		width: 100%;

	}

	.prodinfo .opt .prod-name {
		color: #333;
		max-height: 72rpx;
		line-height: 36rpx;
		display: -webkit-box;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.prodinfo .opt .prod-info-text {
		color: #999;
		display: inline-block;
		-webkit-line-clamp: 1;
		height: 30rpx;
		line-height: 30rpx;
		background: #f9f9f9;
		padding: 0 10rpx 0 10rpx;
		border-radius: 4rpx;
		margin: 10rpx 0 0rpx 0;
		overflow: hidden;
		font-size: 24rpx;
		position: relative;
		font-family: arial;
	}

	.prodinfo .opt .prod-info-text.empty-n {
		padding: 0;
	}

	.prod-info-text:before {
		border-top: 5px solid #aaa;
	}

	.prod-info-text:after {
		border-top: 5px solid #f9f9f9;
		top: 9px;
	}

	.prod-list .item .prodinfo .pic {
		text-align: center;
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 0;
	}

	.prod-list .item .pic image {
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
		box-shadow: 0 0 6px #F8F8F8;
	}

	.prodinfo .opt .price-count {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.prodinfo .opt .price-count .price {
		color: #eb2444;
	}

	.lose-efficacy .prodinfo .opt .price-count .price {
		color: #999;
	}

	/* 加减框 */

	.m-numSelector .minus,
	.m-numSelector input,
	.m-numSelector .plus {
		float: left;
		box-sizing: border-box;
		height: 56rpx;
	}

	.m-numSelector {
		float: right;
	}

	.m-numSelector image {
		width: 40rpx;
		position: relative;
		top: 9rpx;
		left: 12rpx;
	}

	.m-numSelector .minus,
	.m-numSelector .plus {
		position: relative;
		width: 56rpx;
	}

	.m-numSelector input {
		width: 56rpx;
		text-align: center;
		color: #333;
	}

	/* 购物车为空 */

	.empty {
		font-size: 28rpx;
		color: #666;
	}

	.empty .txt {
		text-align: center;
		margin-top: 30rpx;
	}

	.empty .img {
		margin-top: 80rpx;
		text-align: center;
	}

	.empty .img image {
		width: 80rpx;
		height: 80rpx;
	}

	/* 失效商品 */

	.lose-efficacy {
		margin-top: 20rpx;
		background: #fff;
	}

	.lose-efficacy .item {
		background: #f8f8f9;
	}

	.prod-list .lose-efficacy .discount-tips {
		padding: 20rpx 0;
		border-bottom: 2rpx solid #ddd;
		height: 50rpx;
		line-height: 50rpx;
		margin-left: 20rpx;
	}

	.lose-efficacy .discount-tips .empty-prod {
		color: #777;
		font-size: 26rpx;
		border: 2rpx solid #999;
		padding: 0 10rpx;
		border-radius: 8rpx;
		float: right;
		margin-right: 20rpx;
	}

	.price-count .disable-price {
		color: #999;
	}

	.prod-list .lose-efficacy .discount-tips .text-list {
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	/** 底部按钮 */

	.cart-footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-direction: row nowrap;
		height: 120rpx;
		background-color: #1D1D1D;
		z-index: 1000;
	}

	.cart-footer .finally {
		padding-left: 10rpx;
	}

	.cart-footer image {
		width: 160rpx;
		position: relative;
		bottom: 80rpx;
	}


	.cart-footer .btn {
		position: relative;
		display: flex;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
		width: 0;
		background: #1D1D1D;
		color: white;
		font-size: 28rpx;
	}

	.cart-footer .btn .total-msg {
		font-size: 20rpx;
	}

	.cart-footer .btn.total {
		display: flex;
		flex-flow: column;
		align-items: flex-start;

	}

	.cart-footer .btn.del {
		color: #eb2444;
		width: 70rpx;
		font-size: 22rpx;
		text-align: left;
		display: block;
		line-height: 120rpx;

	}

	.cart-footer .btn.all {
		width: 150rpx;
		font-size: 26rpx;
	}

	.cart-footer .btn.all label {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
	}

	.cart-footer .btn.total {
		width: 300rpx;
	}

	.cart-footer .btn.total .price {
		color: #fff;
		font-size: 30rpx;
	}

	.cart-footer .btn.settle {
		width: 200rpx;
		background: #D81E06;
		color: #fff;
		border-radius: 0;
	}

	/** end 底部按钮 */

	.cart-footer .btn.btngray {
		background-color: #999;
	}

	/* 优惠券弹窗 */
	.couponmodule-pop {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 599;
		width: 100%;
		height: 100%;
	}

	.couponmodule-pop .shadow {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.couponbox-pop {
		position: fixed;
		bottom: 0;
		height: 50%;
		width: 100%;
		background-color: #ffffff;
		overflow: scroll;
	}

	.coupon-pop {
		width: 98%;
		margin: 0 auto;
		position: relative;
	}

	.coupontit-pop {
		height: 70rpx;
		width: 100%;
		font-size: 30rpx;
		color: #666666;
		line-height: 70rpx;
		padding-left: 30rpx;
		padding-top: 15rpx;
	}

	.coupon-pop image {
		width: 100%;
		margin: 0 auto;
		display: block;
	}

	.coupon-pop .couponinfo-pop {
		margin: 0 auto;
		display: flex;
		align-items: center;
		top: 22rpx;
		width: 100%;
		font-size: 26rpx;
		z-index: 300;
		position: absolute;
		top: 0;
		left: 0;

	}

	.couponinfo-pop .amount {
		color: #ffffff;
		width: 220rpx;
		height: 100%;
		line-height: 200rpx;
		text-align: center;
	}

	.couponinfo-pop .amount :first-child {
		/* color: #ffffff; */
		font-size: 60rpx;
		padding-right: 5rpx;
		line-height: 230rpx;
	}

	.couponinfo-pop .amount :last-child {}

	.couponinfo-pop .getcouponbtn-pop {
		height: 50rpx;
		width: 100rpx;
		background-color: #D81E06;
		color: #ffffff;
		line-height: 50rpx;
		text-align: center;
		border-radius: 30rpx;
		position: absolute;
		top: 80rpx;
		right: 58rpx;
	}

	.couponinfo-pop .getcouponbtn-pop-gray {
		height: 50rpx;
		width: 100rpx;
		background-color: #CBCBCB;
		color: #ffffff;
		line-height: 50rpx;
		text-align: center;
		border-radius: 30rpx;
		position: absolute;
		top: 78rpx;
		right: 60rpx;
	}

	.coupon-limit view {
		margin: 12rpx 0;
		font-size: 24rpx;
	}

	.coupon-limit .limt-prodname {
		font-size: 28rpx;
		color: #666;
		width: 300rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.coupon-limit .limt-time {
		font-size: 22rpx;
		color: #999;
	}

	.coupon-notice-pop {
		/* position: absolute;
  bottom: 0; */
		color: #9F9F9F;
		font-size: 26rpx;
		height: 160rpx;
		padding-left: 24rpx;
	}

	.coupon-notice-pop view {
		margin: 10rpx 0;
		font-size: 22rpx;
	}

	.coupon-notice-tit-pop {
		font-size: 26rpx;
		height: 50rpx;
		line-height: 50rpx;
	}

	.coupon-notice-tit-pop {
		color: #333333;
		font: 34rpx;
	}
</style>
