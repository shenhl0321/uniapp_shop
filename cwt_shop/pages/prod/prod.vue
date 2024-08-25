<template>
	<view>
		<!-- 		<navigation 
			:title="title" 
			:naviStyle="style" 
			style="width:100%;" 
			:ifShowGoBack="ifShowGoBack" 
			:ifShowGoHome="ifShowGoHome"></navigation> -->
		<customNavi :naviData='naviData'>产品详情</customNavi>
		<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-color="indicatorColor"
			:interval="interval" :duration="duration" :indicator-active-color="indicatorActiveColor" circular="true">
			<block v-for="(item, index) in imgs" :key="index">
				<swiper-item>
					<image :src="item"></image>
				</swiper-item>
			</block>
		</swiper>

		<view v-if="isSpread&&extensionWorker==0" @tap="formSubmit" class="getposter">
			<image src="/static/images/icon/share02.png" mode="widthFix"></image>
			<text>分享得返利</text>
		</view>


		<view class="imagePathBox" :hidden="maskHidden == false">
			<view :hidden="maskHidden == false" class="mask" @tap="closeImage"></view>
			<image :src="imagePath" class="shengcheng"></image>
			<button class="baocun" @tap="baocun">点击保存至相册,分享到朋友圈</button>
		</view>
		<view class="canvas-box">
			<canvas style="width:375px;height:670px;position:fixed;top:9999px" canvas-id="mycanvas"></canvas>
		</view>

		<view class="main-prodinfo">
			<view class="main-prodname">
				<text>{{prodName}}</text>
				<!-- <text>180克/袋</text> -->
			</view>
			<view class="monthsale-price-basket">
				<view>
					<view class="monthsale">月销：{{saleMonth+20}}</view>
					<view class="price" v-if="activityPrice">
						<text>活动价￥</text>
						<text
							class="bignum">{{wxs.parsePrice(activityPrice)[0]}}.{{wxs.parsePrice(activityPrice)[1]}}</text>
						<text style="color:#999;text-decoration:line-through;margin-left:10rpx">原价￥{{price}}</text>
					</view>
					<view class="price" v-if="!activityPrice">
						<text>￥</text>
						<text class="bignum">{{wxs.parsePrice(price)[0]}}.{{wxs.parsePrice(price)[1]}}</text>
					</view>
				</view>
				<!-- <view class="basketicon" hidden="{{!showBasketIcon}}" bindtap="addToCart">
      <image  src="../../images/icon/basket02.png" mode="widthFix"></image>
    </view> -->
				<view :hidden="prodCount" @tap="addToCart" class="basketicon">
					<view class="addToCarBtn">加入购物车</view>
				</view>
				<view class="prodcount" :hidden="!prodCount">
					<image src="/static/images/icon/decrease.png" mode="widthFix" @tap="updateCount(-1)"></image>
					<text class="prodcount-num">{{prodCount}}</text>
					<image src="/static/images/icon/increase.png" mode="widthFix" @tap="updateCount(1)"></image>
				</view>
			</view>
			<view v-if="couponList.length>0" class="couponbar" @tap="showCouponPop">
				<view class="coupons">
					<block v-for="(item, index) in couponList" :key="index">
						<view class="coupon">
							<view class="couponbody">单品{{item.fullAmountReduce}}元</view>
							<view class="couponfooter">领</view>
						</view>
					</block>
				</view>
				<view class="getcoupon-btn">
					<text>领券</text>
					<image src="/static/images/icon/more01.png" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view class="separation"></view>

		<view class="shopinfo">
			<view class="shoplogo">
				<image :src="shopInfo.shopLogo?shopInfo.shopLogo:'/static/images/icon/logo.png'" mode="widthFix"
					@error="handleLogoLoadError"></image>
			</view>
			<view class="shopname-attribute">
				<view class="shopname">{{shopInfo.shopName}}</view>
				<view class="attributes">
					<view class="attribute">
						<image src="/static/images/icon/get.png" mode="widthFix"></image>
						<text>门店直送</text>
					</view>
					<view class="attribute">
						<image src="/static/images/icon/get.png" mode="widthFix"></image>
						<text>支持自提</text>
					</view>
					<view class="attribute">
						<image src="/static/images/icon/get.png" mode="widthFix"></image>
						<text>微信支付</text>
					</view>
				</view>
			</view>
			<view class="entershop" @tap="enterShop">进店</view>
		</view>

		<view class="separation"></view>

		<view class="guesslike">
			<view class="title">
				<image src="/static/images/icon/like.png" mode="widthFix"></image>
				<text>猜你喜欢</text>
			</view>
			<view class="prods">
				<block v-for="(item, index) in prodsList" :key="index">
					<view class="prod" :data-prodId="item.prodId" @tap="enterProdFromGuess">
						<view class="prodimage">
							<image :src="item.pic" mode="widthFix"></image>
						</view>
						<view class="guessprod-info">
							<view class="prodname-price">
								<view class="guessprod-prodname">{{item.prodName}}</view>
								<view class="guessprod-price">￥{{item.price}}</view>
							</view>
							<view class="basketicon">
								<image class="basketimage" src="/static/images/icon/basket02.png" mode="widthFix">
								</image>
							</view>
							<view></view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<view class="separation"></view>

		<!-- 评价 -->
		<view class="cmt-wrap">
			<view class="cmt-tit" @tap="showComment">
				<view class="cmt-t">
					商品评价({{prodCommData.number}})
					<!-- <text class="cmt-good">好评{{prodCommData.positiveRating}}%</text> -->
				</view>
				<view class="cmt-count">
					<text class="more">查看更多</text>
					<text class="cmt-more"></text>
				</view>
			</view>
			<view class="cmt-cont">
				<view class="cmt-tag" @tap="showComment">
					<text>全部({{prodCommData.number}})</text>
					<text>口感好({{prodCommData.praiseNumber}})</text>
					<text>性价比高({{prodCommData.secondaryNumber}})</text>
					<text>有点甜({{prodCommData.negativeNumber}})</text>
					<text>有图({{prodCommData.picNumber}})</text>
				</view>
				<view class="cmt-items">
					<view v-for="(item, index) in littleCommPage" :key="index" class="cmt-item">
						<view class="cmt-user">
							<text class="date">{{item.recTime}}</text>
							<view class="cmt-user-info">
								<image class="user-img" :src="item.pic"></image>
								<view class="nickname">{{item.nickName}}</view>
								<van-rate readonly :value="item.score" @change="onChange" color="#f44"></van-rate>
							</view>
						</view>
						<view class="cmt-cnt">{{item.content}}</view>
						<scroll-view class="cmt-attr" scroll-x="true" v-if="item.pics.length">
							<image v-for="(commPic, index2) in item.pics" :key="index2" :src="commPic"></image>
						</scroll-view>
					</view>
				</view>
				<view class="cmt-more-v" v-if="prodCommPage.records.length > 2">
					<text @tap="showComment">查看全部评价</text>
				</view>
			</view>
		</view>

		<view class="separation"></view>


		<!-- 商品详情 -->
		<view class="details">
			<view class="details-tit">
				<text :class="'details-tit-item ' + (true?'active':'')" data-selMenu="1" @tap="changeMenu">商品详情</text>
			</view>
			<view class="prod-detail">
				<rich-text :nodes="content"></rich-text>

			</view>
		</view>

		<view class="couponmodule-pop" :hidden="!showCoupons" catchtouchmove="none">
			<view class="shadow" @tap="closeCouponPop"></view>
			<view class="couponbox-pop" :animation="couponPopAnimation">
				<view class="coupontit-pop">优惠券</view>
				<block v-for="(item, index) in couponList" :key="index">
					<view class="coupons-pop">
						<view class="coupon-pop" v-if="item.state == 0&&item.useState==null">
							<image src="http://images.51xeld.com/2020/07/cb438c51591e40eea7a528b06cb9c186.png"
								mode="widthFix"></image>
							<view class="couponinfo-pop">
								<view class="amount"><text>{{item.fullAmountReduce}}</text><text>元</text></view>
								<view class="coupon-limit">
									<view class="limt-prodname">{{item.couponTitle}}</view>
									<view class="limt-time">
										<text>有效期限：</text>
										<text>{{item.showStartTime}}-{{item.showEndTime}}</text>
									</view>
								</view>
								<view class="getcouponbtn-pop" :data-index="index" @tap="handleReceive">领取</view>
							</view>
						</view>
						<view class="coupon-pop"
							v-if="(item.state == 0&&item.useState == 2) || (item.state == 0&&item.useState == 1)">
							<image src="http://images.51xeld.com/2020/07/828241eb17a64600aae0a71bc5a13e23.png"
								mode="widthFix"></image>
							<view class="couponinfo-pop">
								<view class="amount"><text>{{item.fullAmountReduce}}</text><text>元</text></view>
								<view class="coupon-limit">
									<view class="limt-prodname">{{item.couponTitle}}</view>
									<view class="limt-time">
										<text>有效期限：</text>
										<text>{{item.showStartTime}}-{{item.showEndTime}}</text>
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

		<view class="cmt-popup" v-if="commentShow">
			<view class="cmt-tit">
				<view class="cmt-t">
					商品评价
					<text class="cmt-good">好评度{{prodCommData.positiveRating}}%</text>
				</view>
				<text class="close" @tap="closePopup"></text>
			</view>
			<view class="cmt-cont">
				<view class="cmt-tag">
					<text @tap="getProdCommPage(-1)"
						:class="evaluate==-1?'selected':''">全部({{prodCommData.number}})</text>
					<text @tap="getProdCommPage(0)"
						:class="evaluate==0?'selected':''">好评({{prodCommData.praiseNumber}})</text>
					<text @tap="getProdCommPage(1)"
						:class="evaluate==1?'selected':''">中评({{prodCommData.secondaryNumber}})</text>
					<text @tap="getProdCommPage(2)"
						:class="evaluate==2?'selected':''">差评({{prodCommData.negativeNumber}})</text>
					<text @tap="getProdCommPage(3)"
						:class="evaluate==3?'selected':''">有图({{prodCommData.picNumber}})</text>
				</view>
				<view class="cmt-items">
					<view v-for="(item, index) in prodCommPage.records" :key="index" class="cmt-item">
						<view class="cmt-user">
							<text class="date">{{item.recTime}}</text>
							<view class="cmt-user-info">
								<image class="user-img" :src="item.pic"></image>
								<view class="nickname">{{item.nickName}}</view>
								<van-rate readonly :value="item.score" @change="onChange" color="#f44"></van-rate>
							</view>
						</view>
						<view class="cmt-cnt">{{item.content}}</view>
						<scroll-view class="cmt-attr" scroll-x="true" v-if="item.pics.length">
							<image v-for="(commPic, index2) in item.pics" :key="index2" :src="commPic"></image>
						</scroll-view>
						<view class="cmt-reply" v-if="item.replyContent">
							<text class="reply-tit">店铺回复：</text> {{item.replyContent}}
						</view>
					</view>
				</view>
				<view class="load-more" v-if="prodCommPage.pages > prodCommPage.current">
					<text @tap="getMoreCommPage">点击加载更多</text>
				</view>
			</view>
		</view>
		<shopCartTabToutiao></shopCartTabToutiao>
	</view>
</template>

<script>
	const config = require('@/config.js')
	const util = require("../../utils/util.js");
	import customNavi from '@/components/custom-navi/custom-navi.vue'
	import shopCartTabToutiao from '../category/shop-cart-tabbar-toutiao.vue'
	export default {
		data() {
			return {
				naviData: {
					ifGoBack: true
				},
				//当前商品信息
				price: 0,
				imgs: '',
				content: '',
				pic: "",
				prodName: '',
				prodId: 0,
				// prodCount: 0,
				brief: '',
				skuId: 0,
				isSpread: false,
				posterImg: '',
				rebateMoney: '',
				activityOrderFlag: "",
				activityTimesFlag: "",
				activityPrice: null,
				showBasketTab: true, //是否展示底部购物车tab
				prodsList: [],
				baskettabAnimation: null, //购物车弹窗动画
				couponPopAnimation: null,
				showBasketIcon: true, //是否展示 （加入购物车的） 按钮，当当前产品已加购时为true
				showCoupons: false, //优惠券弹窗
				evalatImage: '', //海报背景图
				bgBanner: '',
				imagePath: "",
				maskHidden: false,
				shopId: 1,
				picDomain: config.picDomain,
				indicatorDots: true,
				indicatorColor: '#f2f2f2',
				indicatorActiveColor: '#eb2444',
				autoplay: true,
				interval: 5000,
				duration: 500,
				totalCartNum: 0,

				popupShow: false,
				// 是否获取过用户领取过的优惠券id
				loadCouponIds: false,
				skuShow: false,
				commentShow: false,
				couponList: [],
				findSku: true,
				defaultSku: undefined,
				prodCommData: {},
				prodCommPage: {
					current: 0,
					pages: 0,
					records: []
				},
				littleCommPage: [],
				evaluate: -1,
				isCollection: false,
				tjr: '',
				//通过分享海报的推荐人
				qrcodePath: '',
				//海报图片
				userName: '',
				ifShowGoHome: false,
				ifShowGoBack: true,
				//佣金
				sharetjr: '',
				extensionWorker: '',
				phoneNumber: '',
				saleMonth: "",
				prodNum: "",
				basketAnimation: "",
			};
		},

		components: {
			customNavi,
			shopCartTabToutiao
		},

		computed: {
			shopInfo() {
				return this.$store.getters['shop/shopInfo']
			},

			mobile() {
				return this.$store.state.userInfo.mobile
			},
			
			prodCount() {
				let shopCartItems = this.$store.getters['shop/shopCartItems']
				let prodCount
				for(let item of shopCartItems) {
					if(item.prodId == this.prodId){
						prodCount = item.prodCount
					}
				}
				return prodCount || 0
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			//#ifdef MP-WEIXIN
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.userInfo']) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
			//#endif
			//从我二维码分享进入
			if (options.scene != undefined && options.scene != "") {
				let scene = options.scene
				this.prodId = scene.split("-")[0];
				this.shopId = scene.split("-")[1]; //将获取到的shopId存入全局变量
				this.tjr = scene.split("-")[2];
				this.naviData.ifGoBack = false
				this.naviData.ifGoHome = true
				this.$store.commit('shop/currentShop', shopId)
			} else if (options.isSpread == 'true') { //从分享链接进入
				this.naviData.ifGoBack = false
				this.naviData.ifGoHome = true
				this.prodId = options.prodId
				this.shopId = options.shopId
				this.sharetjr = options.sharetjr //链接来源人
				this.$store.commit('shop/currentShop', shopId)
			} else {
				this.prodId = options.prodid
				this.shopId = this.$store.state.shop.currentShop
			}
			this.getUserId(); // 获取userID，用于分享链接
			this.getProdInfo(); // 加载产品信息
			this.getProdCommData(); // 加载评论项
			this.getLittleProdComm(); // 查看用户是否关注
			//获取用户信息
			this.getUserName();
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			let phoneNumber = uni.getStorageSync('phoneNumber');
			this.setData({
				phoneNumber: phoneNumber
			});
			//#ifdef MP-WEIXIN
			this.qrcode_image(); //背景图
			this.getWxCode(); //二维码
			//#endif
			this.getShopProdsInfo();
			this.getCouponList();
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			var extensionWorker = this.extensionWorker;
			if (extensionWorker == 0) {
				return {
					title: this.prodName,
					path: `pages/prod/prod?sharetjr=${this.userId}&prodId=${this.prodId}&shopId=${this.shopId}&isSpread=true`
				};
			} else {
				return {
					title: this.prodName,
					path: 'pages/prod/prod?prodId=' + this.prodId + '&isSpread=true',
					path: `pages/prod/prod?prodId=${this.prodId}&shopId=${this.shopId}&isSpread=true`
				};
			}
		},
		methods: {
			getProdInfo() {
				this.$request.get("/prod/prodInfo", {
					prodId: this.prodId // userType: 0
				}).then(res => {
					var imgStrs = res.imgs;
					var imgs = imgStrs.split(",");
					var Img = imgStrs.split(",")[0];
					var content = util.formatHtml(res.content || '');
					this.setData({
						imgs: imgs,
						content: content,
						price: res.price,
						prodName: res.prodName,
						prodId: res.prodId,
						brief: res.brief,
						skuId: res.skuList[0].skuId,
						// skuList: res.skuList,
						pic: res.pic,
						posterImg: Img,
						saleMonth: res.salesNumber,
						rebateMoney: res.rebateMoney,
						isSpread: res.isSpread == 0,
						activityOrderFlag: res.activityOrderFlag,
						activityTimesFlag: res.activityTimesFlag,
						activityPrice: res.activityPrice
					})
				})
			},

			getProdCommData() {
				this.$request.get("/prodComm/prodCommData", {
					prodId: this.prodId
				}).then(res => {
					this.prodCommData = res
				})
			},

			// 获取部分评论
			getLittleProdComm() {
				if (this.prodCommPage.records.length) {
					return;
				}
				this.getProdCommPage();
			},

			getMoreCommPage(e) {
				this.getProdCommPage();
			},

			// 获取分页获取评论
			getProdCommPage(evaluate) {
				if (evaluate) {
					if (evaluate === this.evaluate) {
						return;
					}
					this.setData({
						prodCommPage: {
							current: 0,
							pages: 0,
							records: []
						},
						evaluate: evaluate
					});
				}
				this.$request.get("/prodComm/prodCommPageByProd", {
					prodId: this.prodId,
					size: 10,
					current: this.prodCommPage.current + 1,
					evaluate: this.evaluate
				}).then(res => {
					res.records.forEach(item => {
						if (item.pics) {
							item.pics = item.pics.split(',');
						}
					});
					let records = this.prodCommPage.records;
					records = records.concat(res.records);
					this.setData({
						prodCommPage: {
							current: res.current,
							pages: res.pages,
							records: records
						}
					}); // 如果商品详情中没有评论的数据，截取两条到商品详情页商品详情
					if (!this.littleCommPage.length) {
						this.littleCommPage = records.slice(0, 2)
					}
				})
			},

			getUserName() {
				this.$request.get("/prod/getUserInfo").then(res => {
					this.setData({
						userName: res.userName,
						extensionWorker: res.extensionWorker
					});
				}, rej => {
					console.log(rej)
				})
			},

			// 商铺logo加载出错
			handleLogoLoadError: function(e) {
				let shopInfo = this.shopInfo;
				shopInfo.shopLogo = "/static/images/icon/logo.png";
				this.setData({
					shopInfo
				});
			},

			getUserId: function() {
				this.$request.get("/prod/getUserId", ).then(res => {
					this.userId = res
				})
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
					that.setData({
						maskHidden: true
					});
				}, 1000);
			},

			createNewImg: function() {
				var that = this;
				var context = uni.createCanvasContext('mycanvas');
				context.clearRect(0, 0, 375, 660);
				context.setFillStyle("#fff");
				context.fillRect(0, 0, 375, 660);
				context.save();
				var path1 = that.bgBanner;
				var path2 = that.qrcodePath;
				var titl = this.prodName;
				context.setFontSize(18);
				context.setFillStyle('#333');
				context.setTextAlign('left');
				context.font = 'normal bold 18px SimSun';
				that.dealWords({
					ctx: context,
					//画布上下文 canvasID
					fontSize: 18,
					//字体大小
					word: titl,
					//需要处理的文字
					maxWidth: 200,
					//一行文字最大宽度
					x: 15,
					//文字在x轴要显示的位置
					y: 450,
					//文字在y轴要显示的位置
					maxLine: 2 //文字最多显示的行数

				});
				context.stroke();
				context.save();
				var titl = "价格 ：￥" + this.price;
				context.setFontSize(18);
				context.setFillStyle('#ff0000');
				context.setTextAlign('left');
				context.font = 'normal bold 18px SimSun';
				that.dealWords({
					ctx: context,
					//画布上下文 canvasID
					fontSize: 18,
					//字体大小
					word: titl,
					//需要处理的文字
					maxWidth: 200,
					//一行文字最大宽度
					x: 15,
					//文字在x轴要显示的位置
					y: 520,
					//文字在y轴要显示的位置
					maxLine: 2 //文字最多显示的行数

				});
				context.drawImage(path1, 0, 0, 375, 375); //var results = "分
				context.drawImage(path2, 220, 420, 140, 140);
				context.beginPath(); // context.setFontSize(16);
				context.setFillStyle('#fff');
				context.setTextBaseline("top");
				context.setTextAlign('left');
				context.stroke();
				context.closePath();
				context.save(); //保存之前的画布设置
				context.draw(true); //true表示保留之前绘制内容
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

			//文本换行
			dealWords(options) {
				options.ctx.setFontSize(options.fontSize); //设置字体大小

				var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth); //实际总共能分多少行

				var count = allRow >= options.maxLine ? options.maxLine : allRow; //实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

				var endPos = 0; //当前字符串的截断点

				for (var j = 0; j < count; j++) {
					var nowStr = options.word.slice(endPos); //当前剩余的字符串

					var rowWid = 0; //每一行当前宽度    

					if (options.ctx.measureText(nowStr).width > options.maxWidth) {
						//如果当前的字符串宽度大于最大宽度，然后开始截取
						for (var m = 0; m < nowStr.length; m++) {
							rowWid += options.ctx.measureText(nowStr[m]).width; //当前字符串总宽度

							if (rowWid > options.maxWidth) {
								if (j === options.maxLine - 1) {
									//如果是最后一行
									options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) *
										25); //(j+1)*20这是每一行的高度        
								} else {
									options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 25);
								}

								endPos += m; //下次截断点

								break;
							}
						}
					} else {
						//如果当前的字符串宽度小于最大宽度就直接输出
						options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 25);
					}
				}
			},

			//点击保存到相册
			baocun: function() {
				var that = this;
				uni.saveImageToPhotosAlbum({
					filePath: that.imagePath,
					success: res => {
						uni.showModal({
							content: '图片已保存到相册，赶紧晒一下吧~',
							showCancel: false,
							confirmText: '好的',
							confirmColor: '#333',
							success: function(res) {
								if (res.confirm) {
									/* 该隐藏的隐藏 */
									that.setData({
										maskHidden: false
									});
								}
							},
							fail: function(res) {}
						});
					}
				});
			},
			qrcode_image: function() {
				let that = this;
				uni.getImageInfo({
					src: "http://images.51xeld.com/2020/07/126ac97368f94c4cafd1f45493a1c61d.jpg",
					success(res) {
						that.setData({
							evalatImage: res.path
						});
					}

				});
				setTimeout(function() {
					uni.getImageInfo({
						src: that.posterImg + "?/imageView2/1/w/421/h/304/q/75",

						success(res) {
							that.setData({
								bgBanner: res.path
							});
						}

					});
				}, 1000);
			},

			/**
			 * 跳转到首页
			 */
			toHomePage: function() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},

			/**
			 * 跳转到购物车
			 */
			toCartPage: function() {
				uni.switchTab({
					url: '/pages/basket/basket'
				});
			},

			/**
			 * 加入购物车
			 */
			addToCart() {
				this.$request.post("/p/shopCart/changeItem", {
					basketId: 0,
					count: 1,
					prodId: this.prodId,
					shopId: this.shopId,
					skuId: this.skuId,
					activityOrderFlag: this.activityOrderFlag,
					activityTimesFlag: this.activityTimesFlag
				}).then(res => {
					if (res.status == 0) {
						// this.prodCount += 1
						this.$store.dispatch('shop/refreshCartItems')
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
			},

			showPopup: function() {
				if (this.loadCouponIds) {
					this.setData({
						popupShow: true
					});
					return;
				}
				this.$request.get("/p/myCoupon/listCouponIds", ).then(couponIds => {
					var couponList = this.couponList;
					couponList.forEach(coupon => {
						if (couponIds && couponIds.length) {
							// 领取该优惠券数量
							var couponLimit = 0;
							couponIds.forEach(couponId => {
								if (couponId == coupon.couponId) {
									couponLimit++;
								}
							}); // 小于用户领取优惠券上限，可以领取优惠券
							if (couponLimit < coupon.limitNum) {
								coupon.canReceive = true;
							} else {
								coupon.canReceive = false;
							}
						} else {
							coupon.canReceive = true;
						}
					});
					this.setData({
						couponList: couponList,
						popupShow: true,
						loadCouponIds: true
					});
				})
			},

			showSku: function() {
				this.setData({
					skuShow: true
				});
			},
			showComment: function() {
				this.setData({
					commentShow: true
				});
			},
			closePopup: function() {
				this.setData({
					popupShow: false,
					skuShow: false,
					commentShow: false
				});
			},
			showBasketFun: function() {
				var basketAnimation = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease-in-out'
				});
				this.getBasketInfo();
				this.setData({
					popupShow: true,
					basketAnimation: basketAnimation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						basketAnimation: basketAnimation.translateY(0).step().export()
					});
				});
			},
			closeOrders: function() {
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

			getWxCode: function() {
				let self = this
				this.$request.post("/user/getWxCode", {
					prodId: this.prodId,
					shopId: this.shopId
				}).then(res => {
					var save = uni.getFileSystemManager();
					var number = Math.random();
					// #ifdef MP-WEIXIN
					let filePath = wx.env.USER_DATA_PATH + '/pic' + number + '.png';
					// #endif
					save.writeFile({
						filePath: filePath,
						data: res,
						encoding: 'base64',
						success(res) {
							self.setData({
								qrcodePath: filePath
							});
						}
					});
				})
			},

			/**
			 * 改变购物车数量接口
			 */
			updateCount(updateCount) {
				this.$request.post("/p/shopCart/changeItem", {
					count: updateCount,
					prodId: this.prodId,
					skuId: this.skuId,
					activityTimesFlag: this.activityTimesFlag,
					activityOrderFlag: this.activityOrderFlag,
					shopId: this.shopId
				}).then((res) => {
					if (res.status == 0) {
						this.$store.dispatch('shop/refreshCartItems')
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				}, (rej) => {
					console.log(rej)
				})
			},

			showCouponPop: function() {
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
			// 进店
			enterShop: function() {
				uni.navigateTo({
					url: "../category/category" //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面

				});
			},
			//获取店铺商品列表
			getShopProdsInfo: function(url = '/shop/shop/prodInfo/') {
				this.$request.get(url + this.shopId, ).then((res) => {
					let list = res.slice(0, 3);
					this.prodsList = list
				}, (rej) => {
					console.log(rej)
				})
			},

			/**
			 * 授权获取手机号
			 */
			getPhoneNumber(e) {
				let that = this;
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					this.$request.get("/p/user/getPhoneNumber", {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv
					}, ).then((res) => {
						if (res != undefined && res != null) {
							this.$store.commit('updateUserInfo', { mobile: res })
						}
					}, (rej) => {
						console.log(rej)
					})
					this.toFirmOrder();
				}else {
					this.$showToast('请授权手机号以便为您提供更完整的服务')
				}

			},

			// 获取优惠券信息
			getCouponList: function() {
				this.$request.get('/coupon/coupon/info/', {
					prodId: this.prodId,
					shopId: this.shopId
				}).then((couponList) => {
					for (let i = 0; i < couponList.length; i++) {
						couponList[i].showStartTime = couponList[i].startTime.split('-').join('.');
						couponList[i].showEndTime = couponList[i].endTime.split('-').join('.');
					}
					this.couponList = couponList
				}, (rej) => {
					console.log(rej)
				})
			},
			//领取优惠券
			handleReceive: function(e) {
				var coupon = this.couponList[e.currentTarget.dataset.index];
				if (coupon.useState == null) {
					this.$request.post('/couponRecord/couponRecord', {
						...coupon,
						state: 1,
						shopId: this.shopId
					}).then((res) => {
						if (res.code === 200) {
							this.$showToast('领取成功')
						} else {
							this.$showToast('领取失败')
						}
					}, (rej) => {
						console.log(rej)
					})
				}
			},
			enterProdFromGuess: function(e) {
				var prodId = e.currentTarget.dataset.prodid;
				if (prodId) {
					uni.navigateTo({
						url: '/pages/prod/prod?prodid=' + prodId
					});
				}
			},
			//页面跳转
			goback: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			gohome: function() {
				uni.switchTab({
					url: '../category/category'
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
	/* pages/newProdDetail/newProdDetail.wxss */

	.navibtn {
		height: 46rpx;
		width: 120rpx;
		border: 1px solid #FFD6A7;
		border-radius: 30rpx;
		position: fixed;
		top: 108rpx;
		left: 14rpx;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.navibtn image {
		height: 30rpx;
		vertical-align: middle;
	}

	swiper {
		height: 750rpx;
		width: 100%;
	}

	swiper image {
		height: 750rpx;
		width: 100%;
	}

	.getposter {
		height: 60rpx;
		width: 190rpx;
		text-align: center;
		line-height: 58rpx;
		vertical-align: middle;
		background-color: #D81E06;
		font-size: 24rpx;
		color: white;
		border-radius: 42rpx 0 0 42rpx;
		position: absolute;
		top: 19%;
		right: 0rpx;
		z-index: 88;
	}

	.getposter image {
		width: 24rpx;
		margin-right: 8rpx;
		vertical-align: middle;
	}

	.getposter text {
		vertical-align: middle;
	}

	.main-prodinfo {
		width: 94%;
		margin: 0 auto;
	}

	.main-prodinfo .main-prodname {
		color: #4B4B4B;
		font-size: 32rpx;
		margin: 16rpx 0;
	}

	.monthsale-price-basket {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #FAFAFA;
		padding-bottom: 15rpx;
	}

	.monthsale {
		color: #BCBCBC;
		font-size: 24rpx;
		height: 48rpx;
		line-height: 48rpx;
	}

	.monthsale-price-basket .price {
		font-family: Arial;
		font-size: 26rpx;
		display: inline-block;
		color: #eb2444;
		margin: 0;
		padding: 0;
	}

	.monthsale-price-basket .price .bignum {
		font-size: 40rpx;
	}

	.basketicon image {
		width: 50rpx;
	}

	.addToCarBtn {
		width: 170rpx;
		height: 56rpx;
		line-height: 56rpx;
		border: 1px solid #D81E06;
		border-radius: 50rpx;
		color: #D81E06;
		text-align: center;
		font-size: 26rpx;
	}

	.prodcount image {
		width: 42rpx;
		margin: 0 20rpx;
		vertical-align: middle;
	}

	.prodcount text {
		vertical-align: middle;
		font-size: 30rpx;
	}

	.couponbar {
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
	}

	.coupons {
		display: flex;
	}

	.coupons .coupon {
		display: flex;
		margin-right: 10rpx;
	}

	.coupons .coupon view {
		padding: 4rpx 10rpx;
		background-color: #F13D26;
		color: white;
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 6rpx;
	}

	.coupons .coupon .couponbody {
		border-right: 1px dashed white;
	}

	.couponbar .getcoupon-btn text {
		font-size: 26rpx;
		color: #A3A3A3;
		padding-right: 6rpx;
	}

	.couponbar image {
		width: 12rpx;
	}

	.shopinfo {
		display: flex;
		align-items: center;
		position: relative;
		margin: 0 auto;
		width: 94%;
		font-size: 26rpx;
		padding: 20rpx 0;
	}

	.shoplogo {
		width: 110rpx;
		height: 110rpx;
		text-align: center;
		border: 1px solid #f5f5f5;
	}

	.shoplogo image {
		width: 76rpx;
		vertical-align: middle;
	}

	.shopname-attribute {
		margin-left: 18rpx;
	}

	.shopname-attribute .shopname {
		font-size: 28rpx;
		margin-bottom: 12rpx;
		color: #424141;
	}

	.shopname-attribute .attributes {
		display: flex;
		margin-top: 12rpx;
		font-size: 22rpx;
		color: #B1B1B1;
	}

	.attribute {
		margin-right: 20rpx;
	}

	.attribute image {
		width: 24rpx;
		vertical-align: middle;
		margin-right: 8rpx;
	}

	.entershop {
		height: 54rpx;
		width: 120rpx;
		border: 1px solid #E6E6E6;
		color: #A7A7A7;
		border-radius: 30rpx;
		text-align: center;
		line-height: 52rpx;
		position: absolute;
		right: 0;
		color: #666;
	}

	.separation {
		height: 5px;
		width: 100%;
		background-color: #F5F5F5;
	}

	.guesslike {
		display: flex;
		flex-direction: column;
	}

	.guesslike .title {
		width: 30%;
		text-align: center;
		height: 70rpx;
		line-height: 70rpx;
		margin: 0 auto;
		color: #6D6D6D;
		font-size: 32rpx;
		padding: 20rpx 0;
	}

	.guesslike .title image {
		width: 34rpx;
		vertical-align: middle;
		margin-right: 8rpx;
	}

	.guesslike .title text {
		vertical-align: middle;
	}

	.guesslike .prods {
		display: flex;
		justify-content: space-around;
		padding-bottom: 15rpx;
	}

	.guesslike .prods .prod {
		width: 29%;
	}

	.guesslike .prods .prod .prodimage {
		width: 100%;
		box-shadow: 0 0 3px #F5F5F5;
		margin-bottom: 20rpx;
	}

	.guesslike .prods .guessprod-prodname {
		font-size: 24rpx;
		margin: 0;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 160rpx;
	}

	.guesslike .prods .prod image {
		width: 100%;
		display: block;
	}

	.guesslike .prods .prod .guessprod-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
		width: 100%;
		position: relative;
	}

	.guesslike .prods .prod .basketicon {
		width: 34rpx;
		position: absolute;
		right: 10rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.guesslike .prods .prod .basketicon .basketimage {
		width: 34rpx;
	}

	.guesslike .prods .prod .guessprod-info .guessprod-price {
		font-size: 26rpx;
		color: #EC2444;
	}

	/** 评价*/

	.cmt-wrap {
		background: #fff;
		margin-top: 20rpx;
		position: relative;
		line-height: 48rpx;
	}

	.cmt-tit {
		font-size: 32rpx;
		position: relative;
		border-bottom: 1px solid #ddd;
		padding: 20rpx;
	}

	.cmt-t {
		width: 300rpx;
	}

	.cmt-good {
		color: #eb2444;
		font-size: 24rpx;
	}

	.cmt-count {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		font-size: 24rpx;
		color: #666;
	}

	.cmt-more {
		width: 17rpx;
		height: 17rpx;
		border-top: 4rpx solid #ddd;
		border-right: 4rpx solid #ddd;
		transform: rotate(45deg);
		display: inline-block;
		vertical-align: middle;
	}

	.cmt-count .more {
		color: #999;
		vertical-align: middle;
	}

	.cmt-cont {
		padding: 0 20rpx;
	}

	.cmt-tag {
		position: relative;
		padding-top: 20rpx;
		margin: 0;
	}

	.cmt-tag text {
		margin: 0 17rpx 30rpx 0;
		background: #FFEFED;
		display: inline-block;
		padding: 0 16rpx;
		height: 46rpx;
		line-height: 48rpx;
		border-radius: 3px;
		font-size: 24rpx;
		vertical-align: middle;
		font-family: -apple-system, Helvetica, sans-serif;
		color: #A0A0A0;
	}

	.cmt-tag text:last-child {
		margin: 0 0 30rpx 0;
	}

	.cmt-tag text.selected {
		color: #fff;
		background: #e93b3d;
	}

	.cmt-item {
		position: relative;
		padding: 10px 0;
	}

	.cmt-item::after {
		content: "";
		height: 0;
		display: block;
		border-bottom: 1px solid #ddd;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		right: -10px;
		border-bottom-color: #e5e5e5;
	}

	.cmt-user {
		line-height: 25px;
		margin-bottom: 8px;
		font-size: 12px;
	}

	.cmt-user-info {
		display: flex;
		align-items: center;
		width: 400rpx;
	}

	.cmt-user .user-img {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		vertical-align: middle;
	}

	.cmt-user .nickname {
		margin-left: 10px;
		display: inline-block;
		color: #333;
		max-width: 8.2em;
		height: 25px;
		line-height: 27px;
	}

	.cmt-user .stars {
		display: flex;
		margin-left: 3px;
	}

	.cmt-user .stars image {
		width: 35rpx;
		height: 35rpx;
	}

	.cmt-user .date {
		float: right;
		color: #999;
		margin-left: -60px;
	}

	.cmt-cnt {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		position: relative;
		line-height: 1.5;
		font-size: 14px;
		margin: 5px 0;
		word-break: break-all;
		max-height: 126px;
	}

	.cmt-attr {
		height: 85px;
		width: 100%;
		white-space: nowrap;
	}

	.cmt-attr .img-wrap {
		width: 85px;
		height: 85px;
		display: inline-block;
	}

	.cmt-attr image {
		display: inline-block;
		width: 80px;
		height: 80px;
		margin-right: 5px;
		margin-bottom: 5px;
		border-radius: 2px;
		background: #f3f3f3;
	}

	.cmt-more-v {
		text-align: center;
		background-color: #fff;
		font-size: 12px;
	}

	.cmt-more-v text {
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		text-align: center;
		color: #333;
		padding: 0px 10px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 40px;
		display: inline-block;
	}

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
		height: 35%;
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
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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

	.baskettab {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		background-color: #000;
		display: flex;
		z-index: 299;
	}

	.baskettab .baskettab-basketicon {
		position: relative;
		bottom: 70rpx;
	}

	.baskettab .baskettab-basketicon image {
		width: 140rpx;
	}

	.prods-in-basket {
		height: 40rpx;
		width: 40rpx;
		background-color: #D81E06;
		position: absolute;
		top: 2rpx;
		right: 2rpx;
		color: #ffffff;
		border-radius: 50%;
		font-size: 24rpx;
		line-height: 40rpx;
		text-align: center;
	}

	.baskettab .amount {
		color: #ffffff;
		line-height: 44rpx;
		margin-left: 10rpx;
		margin-top: 18rpx;
	}

	.baskettab .amount .floorAmount {
		font-size: 22rpx;
	}

	.baskettab .topay {
		height: 100%;
		width: 250rpx;
		color: white;
		background-color: #D71E08;
		text-align: center;
		line-height: 120rpx;
		position: absolute;
		right: 0;
		border-radius: 0;
	}

	.baskettab .btngray {
		background-color: #999;
	}

	/* 商品详情 */
	.details {
		padding-bottom: 120rpx;
	}

	.details .details-tit {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #535353;
		font-size: 30rpx;
		margin: 12rpx;
		display: flex;
		justify-content: space-around;
	}

	.details .details-tit .active {
		color: #DA2710;
		border-bottom: 6rpx solid #da2710;
		height: 70rpx;
		line-height: 70rpx;
		margin-bottom: 16rpx;
	}

	.details .detail-content {
		width: 100%;
	}

	.details .detail-content image {
		width: 100%;
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
		width: 80%;
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
		bottom: 110rpx;
		left: 10%;
		background: #FFBF77;
		color: #fff;
		font-size: 32rpx;
		border-radius: 44rpx;
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
		z-index: 100;
	}

	.popup-tit {
		color: #3D3D3D;
		height: 62rpx;
		line-height: 62rpx;
		font-size: 24rpx;
		padding-left: 26rpx;
		background-color: #F5F5F5;
		display: flex;
		justify-content: space-between;
	}

	.clear-btn {
		display: flex;
		color: #999;
		padding-right: 20rpx;
	}

	.clear-btn image {
		width: 30rpx;
		vertical-align: super;
		position: relative;
		top: 16rpx;
		margin-right: 5rpx;
	}

	.prod-list {
		width: 100%;
		overflow: scroll;
		height: 100%;
	}


	.prod-list .item {
		background: #fff;
		display: flex;
		align-items: center;
		padding: 28rpx 20rpx 20rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.prod-list .item .prodinfo {
		position: relative;
		color: #999;
		width: 100%;
		display: flex;
		align-items: center;
	}

	/* 
.prod-list .item .prodinfo::after {
  content: '';
  background-color: #f4f4f4;
  left: 0;
  height: 1px;
  transform-origin: 50% 100% 0;
  bottom: -20rpx;   
  position: absolute;
  display: block;
  width: 642rpx;
  padding-left: 20rpx;
} */

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
		left: 9rpx;
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
</style>
