<template>
	<view>
		<!--pages/newProdDetail/newProdDetail.wxml-->
		<customNavi :naviData='naviData'>产品详情</customNavi>

		<!-- <view class="navibtn">
  <image class="goback navibtn-item" src="../../images/icon/goback.png" mode="aspectFit" bindtap="goback"></image>
  <image class="gohome navibtn-item" src="../../images/icon/gohome.png" mode="aspectFit" bindtap="gohome"></image>
</view> -->

		<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :indicator-color="indicatorColor"
			:interval="interval" :duration="duration" :indicator-active-color="indicatorActiveColor" circular="true">
			<swiper-item v-for="(item, index) in imgs" :key="index">
				<image :src="item"></image>
			</swiper-item>
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
						<text
							style="color:#999;text-decoration:line-through;margin-left:10rpx">原价￥{{defaultSku.price}}</text>
					</view>
					<view class="price" v-if="!activityPrice">
						<text>￥</text>
						<text
							class="bignum">{{wxs.parsePrice(groupbuyPrice)[0]}}.{{wxs.parsePrice(groupbuyPrice)[1]}}</text>
					</view>
				</view>
				<!-- <view class="basketicon" hidden="{{!showBasketIcon}}" bindtap="addToCart">
					<image  src="../../images/icon/basket02.png" mode="widthFix"></image>
				</view> -->
				<view class="buygroup" @tap="buyNow" data-submitType="launch">
					<view class="buy-info">2人成团</view>
					<view class="go-buy">去开团</view>
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

		<view class="buygroup-info">
			<view class="info-title">
				<image src="/static/images/icon/group.png" mode="aspectFit"></image>
				<view>2人拼，开团后成功邀请一人即可成团</view>
				<view>{{groupbuyInfoList.length + 28}}人已拼</view>
			</view>
			<view class="invite-box" v-if="enterType == 'invite'">
				<view class="head-photo">
					<image :src="groupInvitedInfo.userList[0].pic" mode="aspectFit"></image>
				</view>
				<view class="nickname">{{groupInvitedInfo.userList[0].nickName}}</view>
				<view class="invited-groupbuy-info" v-if="groupInvitedInfo.ptStatus==0">
					<view class="top-info">仅差1人成团</view>
					<view class="bare-time">剩余{{leftTime}}</view>
				</view>
				<view class="invited-groupbuy-info" v-if="groupInvitedInfo.ptStatus==1">
					<view class="top-info">该团已经拼成</view>
				</view>
				<view class="invited-groupbuy-info" v-if="groupInvitedInfo.ptStatus==2">
					<view class="top-info">该团已经失效</view>
				</view>
				<view class="invite-to-groupbuy" @tap="buyNow" v-if="groupInvitedInfo.ptStatus==0">去参团</view>
			</view>
			<view v-else>

				<view class="buygroup-item-content" v-if="enterType !== 'invite'">
					<swiper class="notice-content" autoplay="true" :interval="5000" :duration="500" circular="true"
						vertical="true" style="height: 80rpx;" :current="current">
						<block v-for="(item, index) in groupbuyInfoList" :key="index">
							<swiper-item catchtouchmove="none" catchtouchstart="none">
								<view class="buygroup-item">
									<view class="headphoto">
										<image :src="groupbuyInfoList[index].pic" mode="aspectFit"></image>
									</view>
									<view class="phonenum">
										{{groupbuyInfoList[index].phoneNumber}}
									</view>
									<view class="nickname">
										{{groupbuyInfoList[index].nickName}}
									</view>
									<view class="success-info">
										已拼团成功
									</view>
								</view>
							</swiper-item>
						</block>
					</swiper>
					<swiper class="notice-content" autoplay="true" :interval="5000" :duration="500" circular="true"
						vertical="true" style="height: 80rpx;" :current="current+1">
						<block v-for="(item, index) in groupbuyInfoList" :key="index">
							<swiper-item catchtouchmove="none" catchtouchstart="none">
								<view class="buygroup-item">
									<view class="headphoto">
										<image :src="groupbuyInfoList[index].pic" mode="aspectFit"></image>
									</view>
									<view class="phonenum">
										{{groupbuyInfoList[index].phoneNumber}}
									</view>
									<view class="nickname">
										{{groupbuyInfoList[index].nickName}}
									</view>
									<view class="success-info">
										已拼团成功
									</view>
								</view>
							</swiper-item>
						</block>
					</swiper>
					<swiper class="notice-content" autoplay="true" :interval="5000" :duration="500" circular="true"
						vertical="true" style="height: 80rpx;" :current="current+2">
						<block v-for="(item, index) in groupbuyInfoList" :key="index">
							<swiper-item catchtouchmove="none" catchtouchstart="none">
								<view class="buygroup-item">
									<view class="headphoto">
										<image :src="groupbuyInfoList[index].pic" mode="aspectFit"></image>
									</view>
									<view class="phonenum">
										{{groupbuyInfoList[index].phoneNumber}}
									</view>
									<view class="nickname">
										{{groupbuyInfoList[index].nickName}}
									</view>
									<view class="success-info">
										已拼团成功
									</view>
								</view>
							</swiper-item>
						</block>
					</swiper>

					<!-- <swiper-item>
            <view class="buygroup-item" wx:if="{{groupbuyInfoList[index+1].pic}}">
              <view class="headphoto">
                <image src="{{groupbuyInfoList[index+1].pic}}" mode="aspectFit"></image>
              </view>
              <view class="phonenum">
                {{groupbuyInfoList[index+1].phoneNumber}}
              </view>
              <view class="nickname">
                {{groupbuyInfoList[index+1].nickName}}
              </view>
              <view class="success-info">
                已拼团成功
              </view>
            </view>
          </swiper-item>
          <swiper-item>
            <view class="buygroup-item">
              <view class="headphoto">
                <image src="{{groupbuyInfoList[index+2].pic}}" mode="aspectFit"></image>
              </view>
              <view class="phonenum">
                {{groupbuyInfoList[index+2].phoneNumber}}
              </view>
              <view class="nickname">
                {{groupbuyInfoList[index+2].nickName}}
              </view>
              <view class="success-info">
                已拼团成功
              </view>
            </view>
          </swiper-item>       -->
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
				<text class="details-tit-item active">商品详情</text>
				<!-- <text class="details-tit-item {{selMenu==2?'active':''}}" data-selMenu="2" bindtap="changeMenu">产品参数</text> -->
			</view>
			<view class="prod-detail">
				<rich-text :nodes="content"></rich-text>
				<!-- <image src="//img14.360buyimg.com/cms/jfs/t1/25195/1/9487/388554/5c7f80a5E8b8f8f0c/46818404849d6ec6.jpg!q70.dpg" mode="widthFix"></image> -->
			</view>
		</view>

		<view class="couponmodule-pop" :hidden="!showCoupons" catchtouchmove="none">
			<!-- <view class="couponmodule-pop" hidden="{{!showCoupons}}" catchtouchmove="none"> -->
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
									<view class="limt-prodname">{{item.prodName}}</view>
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

		<view class="baskettab" :animation="baskettabAnimation">
			<view style="display:flex;width: 100%;">
				<view class="baskettab-basketicon">
					<image mode="widthFix" src="/static/images/icon/add.png" v-show="totalProdCount !== 0"></image>
					<view class="prods-in-basket">{{totalProdCount}}</view>
				</view>
				<view class="amount">
					<!-- <view>
          <text style='font-size:30rpx'>合计：￥</text>
          <text>{{wxs.parsePrice(finalMoney)[0]}}</text>
          <text>.{{wxs.parsePrice(finalMoney)[1]}}</text>
      </view> -->
					<view class="floorAmount" :style="'margin-left:' + (prodCount==0?30:0) + 'rpx'">
						<!-- 满{{startPrice}}起送 -->
						0元起送，免配送费
					</view>
				</view>
			</view>
			<!-- <button wx:if="{{!phoneNumber}}" open-type='getPhoneNumber' bindgetphonenumber="getPhoneNumber" class="topay {{startPrice>finalMoney?'btngray':''}}" >去结算</button>
  <button wx:if="{{phoneNumber}}" bindtap='toFirmOrder'   class="topay {{startPrice>finalMoney?'btngray':''}}" >去结算</button> -->
			<view class="buynow-btn" @tap="changeShowBuynowPop">
				<view>￥{{price}}</view>
				<view>单独购买</view>
			</view>
			<view class="buygroup-btn" @tap="buyNow" data-submitType="launch">
				<view>￥{{groupbuyPrice}}</view>
				<view>去开团</view>
			</view>
		</view>

		<!-- 购物车弹窗 -->
		<view v-if="popupShow">
			<view class="popup-hide" v-if="popupShow" @tap.stop="hideBasket">
			</view>
			<view class="popup-box" :animation="basketAnimation">
				<view class="popup-tit">
					<view class="popup-tit-info">已选商品</view>
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
									<view class="prod-name">{{prod.prodName}}</view>
									<text
										:class="'prod-info-text ' + (prod.skuName?'':'empty-n')">{{prod.skuName == null?'': prod.skuName}}</text>
									<view class="price-count">
										<view v-if="!prod.activityPrice" class="price">
											<text class="symbol">￥</text>
											<text class="big-num">{{wxs.parsePrice(prod.price)[0]}}</text>
											<text class="small-num">.{{wxs.parsePrice(prod.price)[1]}}</text>
										</view>
										<view v-if="prod.activityPrice" class="price" style="font-size:13px;">
											<view style="text-decoration:line-through;margin-right:20rpx;color:#999;">
												原价：￥{{prod.price}}</view>
											<view style>活动价：￥{{prod.activityPrice}}</view>
										</view>
										<view class="m-numSelector">
											<view @tap="onBasketCountMinus" class="minus" :data-index="index">
												<image src="/static/images/icon/decrease.png" mode="widthFix"></image>
											</view>
											<input disabled type="number" :value="prod.prodCount"
												@blur="onBasketCountChange" :data-index="index"
												:data-oldCount="prod.prodCount"></input>
											<view @tap="onBasketCountPlus" class="plus" :data-index="index"
												:data-activityTimesFlag="prod.activityTimesFlag"
												:data-activityOrderFlag="prod.activityOrderFlag">
												<image src="/static/images/icon/increase.png" mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- <view class="item">
            <view class="prod"></view>
          </view> -->
					</block>
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
					<text @tap="getProdCommPage" data-evaluate="-1"
						:class="evaluate==-1?'selected':''">全部({{prodCommData.number}})</text>
					<text @tap="getProdCommPage" data-evaluate="0"
						:class="evaluate==0?'selected':''">好评({{prodCommData.praiseNumber}})</text>
					<text @tap="getProdCommPage" data-evaluate="1"
						:class="evaluate==1?'selected':''">中评({{prodCommData.secondaryNumber}})</text>
					<text @tap="getProdCommPage" data-evaluate="2"
						:class="evaluate==2?'selected':''">差评({{prodCommData.negativeNumber}})</text>
					<text @tap="getProdCommPage" data-evaluate="3"
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

		<view class="buynow-pop" catchtouchmove="none" v-if="showBuynowPop">
			<view class="shadow" @tap="changeShowBuynowPop"></view>
			<view class="buynow-content">
				<view class="prod-info">
					<view class="prod-img">
						<image :src="pic"></image>
					</view>
					<view class="prodname-price">
						<view class="prodname">{{prodName}}</view>
						<view class="pop-price">￥{{price}}</view>
					</view>
				</view>
				<view class="sku-list">
					<view class="skulist-title">口味</view>
					<view class="sku-item-content">
						<view class="sku-item active">【网红巴旦木奶枣】120g/袋*3</view>
						<!-- <view class="sku-item">160g/袋</view> -->
					</view>
				</view>
				<view class="count">
					<view class="count-title">数量</view>
					<view class="count-box">
						<view @tap="onCurrentProdMinus">-</view>
						<view>{{prodCount}}</view>
						<view @tap="onCurrentProdPlus">+</view>
					</view>
				</view>
				<view class="buynow-confirm" @tap="gosubmit">确定</view>
			</view>
		</view>
	</view>
</template>

<script src="../../wxs/number.js"></script>

<script>
	var util = require("../../utils/util.js");
	import groupbuyInfoList from './groupbuyInfoList.js'
	import customNavi from '@/components/custom-navi/custom-navi.vue'

	export default {
		data() {
			return {
				title: '商品详情',
				naviData: {
					ifGoHome: false,
					ifGoBack: true
				},
				current: 0,
				shopCartItems: [],
				isShowLoading: false,
				isSpread: false,
				groupbuyPrice: 0,
				indicatorDots: true,
				indicatorColor: '#f2f2f2',
				indicatorActiveColor: '#eb2444',
				autoplay: true,
				interval: 3000,
				duration: 1000,
				style: {
					color: 'white',
					backgroundColor: '#FFAD4F'
				},
				prodsList: [],
				couponPopAnimation: null,
				showBasketIcon: true,
				showBasket: false,
				showCoupons: false,
				evalatImage: '',
				bgBanner: '',
				imagePath: "",
				maskHidden: false,
				shopId: 1,
				duration: 1000,
				prodCount: 0,
				showBuynowPop: false,
				pic: "",
				imgs: '',
				prodName: '',
				price: 0,
				content: '',
				prodId: 0,
				brief: '',
				skuId: 0,
				popupShow: false,
				// 是否获取过用户领取过的优惠券id
				loadCouponIds: false,
				skuShow: false,
				commentShow: false,
				couponList: [],
				// skuList: [],
				skuGroup: {},
				findSku: true,
				defaultSku: undefined,
				selectedProp: [],
				selectedPropObj: {},
				propKeys: [],
				allProperties: [],
				prodCommData: {},
				prodCommPage: {
					current: 0,
					pages: 0,
					records: []
				},
				littleCommPage: [],
				evaluate: -1,
				tjr: '',
				//通过分享海报的推荐人
				qrcodePath: '',
				posterImg: '',
				//海报图片
				userName: '',
				rebateMoney: '',
				ifShowGoHome: false,
				ifShowGoBack: true,
				//佣金
				sharetjr: '',
				extensionWorker: '',
				phoneNumber: '',
				activityPrice: null,
				enterType: '',
				groupbuyInfoList: groupbuyInfoList,
				ptglid: "",
				skuList: "",
				saleMonth: "",
				activityOrderFlag: "",
				activityTimesFlag: "",
				isGroupPeople: "",
				prodNum: "",
				basketAnimation: "",
				basketCount: "",
				finalMoney: "",
				totalMoney: "",
				subtractMoney: "",
				startPrice: "",
				groupInvitedInfo: "",
				leftSecond: "",
				leftTime: "",
				baskettabAnimation: null,
			};
		},

		components: {
			customNavi
		},
		props: {},

		computed: {
			shopInfo() {
				return this.$store.state.currentShop.shopInfo
			},

			totalProdCount() {
				let shopCart = this.shopCartItems
				let totalProdCount = this.shopCartItems.reduce((count, current) => {
					return count + current.prodCount
				}, 0)
				return totalProdCount
			},

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
			let scene = options.scene || '';
			console.log(scene)
			if (scene != undefined && scene != "") {
				this.ptglid = scene.split("-")[0];
				this.prodId = scene.split("-")[1];
				this.shopId = scene.split("-")[2]; //  将获取到的shopId存入全局变量
				this.$store.dispatch('currentShop/getShopId', shopId)
				this.naviData.ifGoHome = true
				this.naviData.ifGoBack = false
				this.enterType = 'invite'
				this.loadInvitedGroupInfo(ptglid);
			} else {
				this.setData({
					prodId: options.prodid ? options.prodid : 0,
					shopId: this.$store.state.currentShop.shopId,
					tjr: options.sharetjr ? options.sharetjr : ''
				});
			}
			this.getShareTjr(); // 加载商品信息
			this.getProdInfo(); // 加载评论数据
			this.getProdCommData(); // 加载评论项
			this.getLittleProdComm(); // 查看用户是否关注
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
			this.qrcode_image();
			//#ifdef MP-WEIXIN
			this.getWxCode();
			//#endif
			this.getBasketInfo();
			this.getShopProdsInfo();
			this.getCouponList();
			this.getGroupbuyInfo();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			return {
				title: this.prodName,
				path: '/pages/groupbuy/groupbuy?prodid=' + this.prodId
			};
		},
		methods: {
			// 获取商品信息
			getProdInfo() {
				this.$request.get("/prod/prodInfo", {
					prodId: this.prodId // userType: 0
				}).then(res => {
					var imgStrs = res.imgs;
					var imgs = imgStrs.split(",");
					var Img = imgStrs.split(",")[0];
					var content = util.formatHtml(res.content);
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

			getGroupbuyInfo() {
				this.$request.get('/makeUpGroup/getPtSuccessedListbyProdId', {
					prodId: this.prodId
				}).then(res => {
					let infoList = res.yxPtglList.concat(this.groupbuyInfoList);
					let groupbuyInfoList = infoList.map(item => {
						let phone = item.phoneNumber;
						if (phone) {
							phone = phone.slice(0, 3) + '*****' + phone.slice(8);
						} else {
							phone = '';
						}
						item.phoneNumber = phone;
						return item;
					});
					this.setData({
						groupbuyInfoList,
						groupbuyPrice: res.ptj,
						isGroupPeople: res.isGroupPeople
					});
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

			getShareTjr: function() {
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
					// wx.hideLoading()
					// wx.hideToast()
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
				var path = that.evalatImage;
				context.drawImage(path, 0, 0, 375, 660);
				var path1 = that.bgBanner;
				var path2 = that.qrcodePath; // context.setFontSize(16);
				// context.setFillStyle('#333');
				// context.setTextAlign('left');
				// context.fillText("测试结果", 60, 230);
				// context.stroke();
				// context.save();

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
				context.stroke();
				context.save(); //    if(this.data.rebateMoney){
				//         var titl = "佣金 ：￥"+this.data.price*this.data.rebateMoney;
				//         context.setFontSize(18);
				//         context.setFillStyle('#ff0000');
				//         context.setTextAlign('left');
				//         context.font = 'normal bold 18px SimSun';
				//         that.dealWords({
				//           ctx: context,              	    //画布上下文 canvasID
				//           fontSize: 18,         	   //字体大小
				//           word: titl,  				  //需要处理的文字
				//           maxWidth: 200, 			 //一行文字最大宽度
				//           x: 15,  					//文字在x轴要显示的位置
				//           y: 500, 				 	   //文字在y轴要显示的位置
				//           maxLine: 2  			  //文字最多显示的行数
				//         });
				//         context.stroke();
				//         context.save();
				// }
				// context.setFontSize(16);
				// context.setFillStyle('#333');
				// context.setTextAlign('left');
				// context.fillText("测试说明", 60, 320);
				// context.stroke();
				// context.save();

				context.drawImage(path1, 0, 0, 375, 375); //var results = "分享的文本信息，布上下文 canvasID";
				// 测试结果说明
				// that.dealWords({
				//   ctx: context,              	    //画布上下文 canvasID
				//   fontSize: 16,         	   //字体大小
				//   word: results,  				  //需要处理的文字
				//   maxWidth: 270, 			 //一行文字最大宽度
				//   x: 60,  					//文字在x轴要显示的位置
				//   y: 340, 				 	   //文字在y轴要显示的位置
				//   maxLine: 6  			  //文字最多显示的行数
				// });

				context.stroke();
				context.save(); //保存之前的画布设置
				//绘制头像
				// context.beginPath();
				// context.arc(50, 225, 5, 0, 2 * Math.PI);
				// context.setStrokeStyle("#c7eddd");
				// context.setFillStyle("#44bf8c");
				// context.clip(); //裁剪上面的圆形
				// context.fill();//填充
				// context.restore();//因为clip是剪切了画布  则后面所有的操作都会限制在被裁减的区域内可见  用restore可以恢复之前的设置
				// context.closePath();
				//  context.save(); //保存之前的画布设置
				// context.beginPath();
				// context.arc(50, 315, 5, 0, 2 * Math.PI);
				// context.setStrokeStyle("#c7eddd");
				// context.setFillStyle("#44bf8c");
				// context.clip(); //裁剪上面的圆形
				// context.fill();//填充
				// context.restore();
				// context.closePath();

				context.save(); //保存之前的画布设置
				//context.beginPath();
				//context.arc(280, 485, 50, 0, 2 * Math.PI);
				//context.setStrokeStyle("#ffe200");
				//context.clip(); //裁剪上面的圆形

				context.drawImage(path2, 220, 420, 140, 140); //context.restore();
				// context.closePath();

				context.save(); //保存之前的画布设置

				context.beginPath(); // context.setFontSize(16);

				context.setFillStyle('#fff');
				context.setTextBaseline("top");
				context.setTextAlign('left'); // context.font = 'normal 18px arial';
				// context.fillText("预防疫情四大宅家心理健康测评", 115, 565);
				// context.fillText("预防疫情四大宅家心理健康测评", 115, 589);
				// that.dealWords({
				//   ctx: context,              	    //画布上下文 canvasID
				//   fontSize: 16,         	   //字体大小
				//   //word: titl,  				  //需要处理的文字
				//   maxWidth: 240, 			 //一行文字最大宽度
				//   x: 115,  					//文字在x轴要显示的位置
				//   y: 540, 				 	   //文字在y轴要显示的位置
				//   maxLine: 2  			  //文字最多显示的行数
				// });

				context.stroke();
				context.closePath();
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
			addToCart: function() {
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
						this.getBasketInfo();
						if (this.isShowLoading) {
							uni.hideLoading();
							this.isShowLoading = false;
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
			},

			/**
			 * 减数量
			 */
			onCountMinus: function() {
				var prodNum = this.prodNum;

				if (prodNum > 1) {
					this.setData({
						prodNum: prodNum - 1
					});
				}
			},

			/**
			 * 加数量
			 */
			onCountPlus: function() {
				var prodNum = this.prodNum;

				if (prodNum < 1000) {
					this.setData({
						prodNum: prodNum + 1
					});
				}
			},
			showPopup: function() {
				if (this.loadCouponIds) {
					this.popupShow = true
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

			detectIfShowBasketIcon(prodId, shopCartItems) {
				for (let i = 0; i < shopCartItems.length; i++) {
					const cartItem = shopCartItems[i];

					if (cartItem.prodId == prodId && cartItem.prodCount > 0) {
						this.setData({
							showBasketIcon: false,
							prodCount: cartItem.prodCount
						});
						return;
					}
				}
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
			// 购物车详情
			getBasketInfo: function() {
				this.$request.post("/p/shopCart/info/" + this.shopId, ).then(res => {
					if (res.length > 0) {
						// 默认全选          
						var shopCartItems = res[0].shopCartItemDiscounts[0].shopCartItems;
						this.setData({
							shopCartItems: shopCartItems
						});
						this.detectIfShowBasketIcon(this.prodId, shopCartItems);
						this.calTotalPrice();
					} else {
						this.setData({
							shopCartItems: []
						});
					}
				}, (rej) => {
					console.log(rej)
				})
			},

			/**
			 * 减少购物车数量
			 */
			onBasketCountMinus: function(e) {
				var index = e.currentTarget.dataset.index;
				var shopCartItems = this.shopCartItems;
				var prodCount = shopCartItems[index].prodCount;
				if (prodCount > 1) {
					this.updateCount(shopCartItems, index, -1);
				} else if (prodCount == 1) {
					this.updateCount(shopCartItems, index, -1);
				}
			},

			/**
			 * 增加购物车数量
			 */
			onBasketCountPlus: function(e) {
				var index = e.currentTarget.dataset.index;
				var activityTimesFlag = e.currentTarget.dataset.activitytimesflag;
				var activityOrderFlag = e.currentTarget.dataset.activityorderflag;
				var shopCartItems = this.shopCartItems;
				this.updateCount(shopCartItems, index, 1, activityTimesFlag, activityOrderFlag);
			},
			// 增加当前商品数量
			onCurrentProdPlus: function(e) {
				var shopCartItems = this.shopCartItems;
				for (let i = 0; i < shopCartItems.length; i++) {
					const item = shopCartItems[i];
					if (item.prodId == this.prodId) {
						this.updateCount(shopCartItems, i, 1, this.activityTimesFlag, this.activityOrderFlag);
						return;
					}
				}
				this.addToCart();
			},
			// 减少当前商品数量
			onCurrentProdMinus: function(e) {
				var shopCartItems = this.shopCartItems;
				for (let i = 0; i < shopCartItems.length; i++) {
					const item = shopCartItems[i];
					if (item.prodId == this.prodId && this.prodCount > 0) {
						this.updateCount(shopCartItems, i, -1);
						break;
					}
				}
			},

			/**
			 * 改变购物车数量接口
			 */
			updateCount: function(shopCartItems, index, prodCount, activityTimesFlag, activityOrderFlag) {
				if (!this.isShowLoading) {
					uni.showLoading({
						mask: true
					});
					this.isShowLoading = true;
				}
				this.$request.post("/p/shopCart/changeItem", {
					count: prodCount,
					prodId: shopCartItems[index].prodId,
					skuId: shopCartItems[index].skuId,
					activityTimesFlag,
					activityOrderFlag,
					shopId: this.shopId
				}).then((res) => {
					if (res.status == 0) {
						shopCartItems[index].prodCount += prodCount;
						if (shopCartItems[index].prodCount == 0) {
							if (shopCartItems[index].prodId == this.prodId) {
								this.prodCount = 0
								this.showBasketIcon = true
							}
							shopCartItems.splice(index, 1);
							this.shopCartItems = shopCartItems
						} else {
							if (shopCartItems[index].prodId == this.prodId) {
								this.prodCount = shopCartItems[index].prodCount
							}
							this.shopCartItems = shopCartItems
						}
						this.calTotalPrice(); //计算总价
						if (this.isShowLoading) {
							uni.hideLoading();
							this.isShowLoading = false;
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.shopCartItems = shopCartItems
					}
				}, (rej) => {
					console.log(rej)
				})
			},

			/**
			 * 删除购物车商品
			 */
			onDelBasket: function() {
				var self = this;
				var shopCartItems = this.shopCartItems;
				var basketIds = [];
				for (var i = 0; i < shopCartItems.length; i++) {
					basketIds.push(shopCartItems[i].basketId);
				}
				uni.showModal({
					title: '',
					content: '确认要删除所有的商品吗？',
					confirmColor: "#eb2444",
					success(res) {
						if (res.confirm) {
							if (!self.isShowLoading) {
								uni.showLoading();
								self.isShowLoading = true;
							}
							self.$request.delete("/p/shopCart/deleteItem", basketIds).then((res) => {
								if (self.isShowLoading) {
									uni.hideLoading();
									self.isShowLoading = false;
								}

								self.closeOrders();
								self.getBasketInfo();
								self.setData({
									prodCount: 0,
									showBasketIcon: true
								});
							}, (rej) => {
								console.log(rej)
							})
						}
					}
				});
			},

			/**
			 * 计算购物车总额
			 */
			calTotalPrice: function() {
				var shopCartItems = this.shopCartItems;
				var shopCartIds = [];
				for (var i = 0; i < shopCartItems.length; i++) {
					shopCartIds.push(shopCartItems[i].basketId);
				}
				this.$request.post("/p/shopCart/totalPay/" + this.shopId, shopCartIds).then((res) => {
					this.setData({
						finalMoney: res.finalMoney,
						totalMoney: res.totalMoney,
						subtractMoney: res.subtractMoney,
						startPrice: res.startPrice || res.startPrice == 0 ? res.startPrice : 48
					});
				}, (rej) => {
					console.log(rej)
				})
			},

			changeShowBuynowPop() {
				if (this.$store.state.ifOutSide) {
					this.$showToast('购买产品请前往微信公众号 "小象智慧门店美食商城"', null, 2000)
					return
				}
				this.setData({
					showBuynowPop: !this.showBuynowPop
				});
			},

			// 开关优惠券弹窗
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
					url: "../category/category"
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
			// 展开购物车弹窗
			openBasketPop: function() {
				if (!this.popupShow) {
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
				} else {
					this.hideBasket();
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

			/**
			 * 授权获取手机号
			 */
			getPhoneNumber: function(e) {
				console.log('getphone Number running')
				let that = this;
				var number = uni.getStorageSync('phoneNumber');
				if (number == null || number == undefined || number == '') {
					if (e.detail.errMsg == "getPhoneNumber:ok") {
						//同意授权手机号
						//请求后台解密
						this.$request.get("/p/user/getPhoneNumber", {
							encryptedData: e.detail.encryptedData,
							iv: e.detail.iv
						}, ).then((res) => {
							if (res != undefined && res != null) {
								uni.setStorageSync('phoneNumber', res);
							}
						}, (rej) => {
							console.log(rej)
						})
					}
					this.toFirmOrder();
				}
			},

			/**
			 * 去结算
			 */
			toFirmOrder: function() {
				if (this.finalMoney < this.startPrice) {
					return;
				}

				var shopCartItems = this.shopCartItems;
				var basketIds = [];
				shopCartItems.forEach(shopCartItem => {
					basketIds.push(shopCartItem.basketId);
				});

				if (!basketIds.length) {
					uni.showToast({
						title: '请选择商品',
						icon: "none"
					});
					return;
				}

				uni.setStorageSync("basketIds", JSON.stringify(basketIds));
				uni.navigateTo({
					url: '/pages/submit-order/submit-order?orderEntry=0&tjr=' + this.tjr
				});
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
			buyNow: function(e) {
				if (this.$store.state.ifOutSide) {
					this.$showToast('购买产品请前往微信公众号 "小象智慧门店美食商城"', null, 2000)
					return
				}
				let submitType = e.currentTarget.dataset.submittype;
				console.log(submitType);

				if (this.isGroupPeople != 1) {
					uni.showToast({
						title: '你正在拼团中，请不要重复拼团',
						icon: 'none',
						duration: 3000
					});
					return;
				}

				uni.setStorageSync("orderItem", JSON.stringify({
					prodId: this.prodId,
					prodName: this.prodName,
					prodCount: 1,
					groupbuyPrice: this.groupbuyPrice,
					pic: this.groupbuyPrice,
					shopId: this.shopId,
					skuId: this.skuId,
					purchaseType: 2
				}));
				this.goGroupbuySybmit(submitType);
			},

			goGroupbuySybmit(submitType) {
				// console.log(this.data.ptglid || 0)
				// console.log(submitType)
				let url;

				if (submitType) {
					url = '/pages/groupbuy-submit/groupbuy-submit?orderEntry=1';
				} else {
					url = '/pages/groupbuy-submit/groupbuy-submit?orderEntry=1&ptglid=' + (this.ptglid || '');
				}

				console.log(url);
				uni.navigateTo({
					url
				});
			},

			closeImage: function() {
				this.setData({
					maskHidden: false
				});
			},

			gosubmit() {
				if (this.prodCount == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加购买数量'
					});
					return;
				}

				uni.setStorageSync("orderItem", JSON.stringify({
					prodId: this.prodId,
					prodName: this.prodName,
					prodCount: this.prodCount,
					groupbuyPrice: this.groupbuyPrice,
					pic: this.groupbuyPrice,
					shopId: this.shopId,
					skuId: this.skuList[0].skuId,
					purchaseType: 1
				}));
				uni.navigateTo({
					url: '/pages/submit-order/submit-order?orderEntry=1'
				});
			},

			loadInvitedGroupInfo(ptglid) {
				this.$request.get('/makeUpGroup/getPtStatus', {
					ptglid
				}).then((res) => {
					this.setData({
						groupInvitedInfo: res
					});
					let ktTime = res.ktTime.replace(/\-/g, '/');
					let leftSecond = res.duration * 24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(
						ktTime));
					console.log(leftSecond);
					this.setData({
						leftSecond
					});
					setInterval(() => {
						let leftSecond = this.leftSecond;
						let second = Math.floor(leftSecond / 1000) % 60;
						second = second == 0 ? '00' : second < 10 ? '0' + second : second;
						let minute = Math.floor(leftSecond / 1000 / 60) % 60;
						minute = minute == 0 ? '00' : minute < 10 ? '0' + minute : minute;
						let hour = Math.floor(leftSecond / 1000 / 60 / 60);
						hour = hour == 0 ? '00' : hour < 10 ? '0' + hour : hour;
						console.log(hour, minute, second);
						console.log("24:45:45");
						this.setData({
							leftTime: `${hour}:${minute}:${second}`,
							leftSecond: leftSecond - 1000
						});
					}, 1000);
				}, (rej) => {
					console.log(rej)
				})
			},

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
		font-size: 28rpx;
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

	.buygroup {
		height: 55rpx;
		border-radius: 28rpx;
		font-size: 24rpx;
		display: flex;
		line-height: 55rpx;
		text-align: center;
		margin: 0;
		padding: 0;
	}

	.buygroup .buy-info {
		border: 1px solid #F13D26;
		width: 110rpx;
		box-sizing: border-box;
		border-radius: 28rpx 0 0 28rpx;
		height: 55rpx;
		border-right: 1px solid #f13d26;
		color: #F13D26;
	}

	.buygroup .go-buy {
		box-sizing: border-box;
		width: 110rpx;
		background-color: #F13D26;
		color: #ffffff;
		border-radius: 0 28rpx 28rpx 0;
	}

	.buygroup-info {
		background-color: #FFF5EC;
		width: 100%;
		font-size: 28rpx;
	}

	.buygroup-info .info-title {
		height: 70rpx;
		width: 100%;
		display: flex;
		align-items: center;
		color: #FAAE65;
		border-bottom: 1px solid #faae65;
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		position: relative;
	}

	.buygroup-info .info-title image {
		margin-right: 12rpx;
	}

	.buygroup-info .info-title view:last-child {
		position: absolute;
		right: 30rpx;
	}

	.buygroup-info .buygroup-item-content {
		width: 100%;
	}

	.buygroup-info .buygroup-item-content .buygroup-item {
		width: 100%;
		display: flex;
		height: 80rpx;
		align-items: center;
		color: #8F8F8E;
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.buygroup-info .buygroup-item-content .buygroup-item .headphoto {
		margin-right: 12rpx;
	}

	.buygroup-info .buygroup-item-content .buygroup-item .phonenum {
		width: 30%;
	}

	.buygroup-info .buygroup-item-content .buygroup-item .nickname {
		width: 45%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.buygroup-info .buygroup-item-content .buygroup-item .success-info {
		width: 20%;
		color: #FAAE65;
	}

	.buygroup-info .invite-box {
		height: 160rpx;
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #666666;
		position: relative;
	}

	.buygroup-info .invite-box>view {
		margin: 0 20rpx;
	}

	.buygroup-info .invite-box .head-photo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #f1f1ff;
		margin: 0 20rpx;
	}

	.buygroup-info .invite-box .head-photo image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.buygroup-info .invite-box .nickname {
		font-size: 26rpx;
		color: #666666;
	}

	.buygroup-info .invite-box .invited-groupbuy-info {
		margin-left: 160rpx;
		text-align: right;
	}

	.buygroup-info .invite-box .invited-groupbuy-info>view {
		margin: 12rpx 0;
	}

	.buygroup-info .invite-box .invite-to-groupbuy {
		position: absolute;
		right: 20rpx;
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		background-color: #F13D26;
		color: #ffffff;
		text-align: center;
		border-radius: 30rpx;
	}

	.buygroup-info image {
		width: 26rpx;
		margin-right: 10rpx;
	}

	.buygroup-info .headphoto image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
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
		font-size: 30rpx;
		position: relative;
		border-bottom: 1px solid #ddd;
		padding: 20rpx;
	}

	.cmt-t {
		width: 300rpx;
		columns: #666;
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
		width: 14rpx;
		height: 14rpx;
		border-top: 4rpx solid #ddd;
		border-right: 4rpx solid #ddd;
		transform: rotate(45deg);
		display: inline-block;
		vertical-align: middle;
	}

	.cmt-count .more {
		color: #999;
		font-size: 26rpx;
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

	}

	.baskettab .amount .floorAmount {
		font-size: 28rpx;
		line-height: 120rpx;
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
	}

	.baskettab .btngray {
		background-color: #999;
	}

	.buynow-btn {
		position: fixed;
		right: 180rpx;
		bottom: 0;
		width: 180rpx;
		height: 120rpx;
		color: #ffffff;
		text-align: center;
		background-color: #F99533;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		padding: 0;
		margin: 0;
		border-radius: 0;
		font-size: 30rpx;
	}

	.buygroup-btn {
		padding: 0;
		margin: 0;
		border-radius: 0;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		color: #ffffff;
		position: fixed;
		right: 0;
		bottom: 0;
		width: 180rpx;
		height: 120rpx;
		background-color: #FA4D49;
	}

	.buynow-btn>view,
	.buygroup-btn>view {
		height: 40rpx;
		line-height: 40rpx;
	}

	/** 评价弹窗 */

	/* .cmt-popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
  background-color: #fff;
  padding-bottom: 98rpx;
}

.cmt-popup .cmt-cont {
  height: calc(100% - 80rpx);
  overflow: auto;
}

.cmt-popup .cmt-cnt {
  -webkit-line-clamp: 20;
  max-height: 500px;
}

.cmt-reply {
  font-size: 14px;
  border-top: 1px dashed #ddd;
  padding: 5px 0;
}

.cmt-reply .reply-tit {
  color: #eb2444;
}

.cmt-popup .load-more {
  font-size: 14px;
  padding: 20px;
  text-align: center;
  margin-bottom: 10px;
}

.cmt-popup .load-more text {
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 10px;
  color: #666;
} */



	/* 商品详情 */
	.details {
		padding-bottom: 120rpx;
	}

	.details .details-tit {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #535353;
		font-size: 32rpx;
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
		height: 50rpx;
		line-height: 50rpx;
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
		top: 10rpx;
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

	.buynow-pop {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 301;
	}

	.buynow-pop .shadow {
		height: 100%;
		width: 100%;
		background-color: rgba(1, 1, 1, 0.3);
		z-index: 301;
	}

	.buynow-pop .buynow-content {
		position: absolute;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
		padding: 0 3%;
		width: 100%;
		margin: 0 auto;
		height: 600rpx;
		background-color: #ffffff;
		border-top-left-radius: 14rpx;
		border-top-right-radius: 14rpx;
	}

	.buynow-content .prod-info {
		margin-top: 20rpx;
		height: 160rpx;
		display: flex;
		align-items: center;
		width: 100%;
	}

	.buynow-content .prod-info .prod-img {
		height: 120rpx;
		width: 120rpx;
		background-color: #f1f1f1;
		margin-right: 20rpx;
	}

	.buynow-content .prod-info .prod-img image {
		height: 120rpx;
		width: 120rpx;
	}

	.buynow-content .prod-info .prodname-price {
		color: #666666;
		font-size: 28rpx;
	}

	.buynow-content .prod-info .prodname-price .prodname {
		margin-bottom: 20rpx;
	}

	.buynow-content .prod-info .prodname-price .pop-price {
		color: #FB4C4C;
	}

	.buynow-content .sku-list {
		width: 100%;
	}

	.buynow-content .sku-list .skulist-title {
		font-size: 30rpx;
		color: #555;
	}

	.buynow-content .sku-list .sku-item-content {
		display: flex;
		flex-wrap: wrap;
		margin-top: 22rpx;
	}

	.buynow-content .sku-list .sku-item-content .sku-item {
		padding: 10rpx 20rpx;
		background-color: #F4F4F4;
		border-radius: 30rpx;
		font-size: 24rpx;
		margin-right: 30rpx;
	}

	.buynow-content .sku-list .sku-item-content .active {
		background-color: #fff0ee;
		padding: 10rpx 20rpx;
		border: 1px solid #f13d26;
		color: #f13d26;
	}

	.buynow-content .count {
		display: flex;
		align-items: center;
		width: 92%;
		justify-content: space-between;
		position: absolute;
		bottom: 150rpx;
	}

	.buynow-content .count .count-box {
		display: flex;

	}

	.buynow-content .count .count-box view {
		height: 50rpx;
		width: 50rpx;
		font-size: 26rpx;
		text-align: center;
		background-color: #F4F4F4;
		line-height: 50rpx;
	}

	.buynow-content .buynow-confirm {
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		width: 92%;
		position: absolute;
		bottom: 30rpx;
		left: 4%;
		border-radius: 40rpx;
		color: #fff;
		background-color: #FA4D49;
	}
</style>
