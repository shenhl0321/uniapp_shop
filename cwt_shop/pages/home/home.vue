<template>
	<view>
		<button class="content-btn" @click="getUserInfo">
			<customNavi :naviData='naviData'>彩味塔</customNavi>
			<view>
				<view class="location-search flex-row">
					<view class="location flex-row" @tap="gomap">
						<image src="/static/images/icon/map.png" mode="widthFix"></image>
						<view class="location-tit">{{address.title}}</view>
					</view>

					<view class="search-block">
						<input placeholder="请输入关键字" placeholder-class="placeholder" placeholder-style="color:#fff;"
							class="search" @input="searchValue = $event.target.value" @blur="handleSearch"></input>
						<image src="/static/images/icon/search-02.png" class="search-img" mode="widthFix"></image>
					</view>
					<button class="customer" open-type="contact" @contact="handleContact">
						<image src="/static/images/icon/customer.png" mode="aspectFit" class="customerImg"></image>
						<text>客服</text>
					</button>
				</view>

				<image src="http://images.51xeld.com/2020/07/bf566a121a4f4a1ba796c550b919996c.png"
					:style="'top:-' + (customBar) + 'px;'" class="banner-back" mode="widthFix"></image>

				<view class="banner">
					<swiper v-if="pictureList.length !== 0" :indicator-dots="pictureList.length !== 1" autoplay="true"
						:interval="5000" :duration="500" indicator-active-color="#FFBF77" indicator-color="white"
						circular="true">
						<block v-for="(item, index) in pictureList" :key="index">
							<swiper-item>
								<image :src="item.imgUrl" mode="widthFix" style="display:block;" @tap="goHomeIndeed"
									:data-link="item.link"></image>
							</swiper-item>
						</block>
					</swiper>
					<swiper v-if="pictureList.length == 0">
						<!-- 						<swiper-item>
							<image src="https://images.51xeld.com/2020/12/ab9a38ab15f648e58cd5e825e34aac60.png"
								mode="widthFix" style="display:block;" :data-link="''" @tap="goHomeIndeed"></image>
						</swiper-item> -->
					</swiper>
				</view>

				<view class="notice flex-row" v-if="noticeList.length>0">
					<view class="notice-icon">
						<image src="/static/images/icon/notice.png" mode="widthFix"></image>
					</view>
					<swiper class="notice-content" autoplay="true" :interval="5000" :duration="500" circular="true"
						vertical="true">
						<block v-for="(item, index) in noticeList" :key="index">
							<swiper-item>
								<view @tap="toNewsDetail" :data-id="item.id">{{item.title}}</view>
							</swiper-item>
						</block>
					</swiper>
				</view>

				<view class="separation"></view>

				<view v-if="advertising" class="advertising" @tap="goHomeIndeed" :data-link="advertising.switchUrl">
					<image :src="'https://images.51xeld.com/'+advertising.imageUrl" mode="widthFix" style="width:100%;">
					</image>
				</view>


				<view class="shopList flex-column">
					<view class="filter flex-row">
						<view class="leftBar">附近的店</view>
						<view class="rightBar">距离最近</view>
					</view>
				</view>

				<view class="shops" hover-class="none" :hover-stop-propagation="false">
					<block v-for="(item, index) in shopList" :key="index">
						<shopCard :shopInfo="item" :address="item.area+item.shopAddress" :shopId="item.shopId"
							:shopName="item.shopName" :shopOwner="item.shopOwner" :distance="item.distance"
							:nowTime="nowTime"></shopCard>
					</block>
				</view>
			</view>
		</button>

	</view>
</template>

<script>
	// pages/home/home.js
	var QQMapWX = require("../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js");
	var qqmapsdk;
	import shopCard from "../../components/shopCard/shopCard";
	import customNavi from '@/components/custom-navi/custom-navi.vue'


	export default {
		data() {
			return {
				naviData: {},
				isSearch: false,
				searchValue: '',
				shopList: [],
				pages: null,
				current: 1,
				lng: '',
				lat: '',
				pictureList: [],
				noticeList: [],
				customBar: "",
				advertising: ""
			};
		},

		computed: {
			nowTime() {
				var now = new Date();
				let formatTime = this.$utils.formatTime(now)
				return formatTime.split(' ')[1]
			},
			shopInfo() {
				return this.$store.state.currentShop.shopInfo
			},
			userInfo() {
				let userInfo = this.$store.state.userInfo
				return Object.keys(userInfo).length == 0 ? false : userInfo
			},
			getinfo() {
				return this.$store.getters['sysInfo/statusBarHeight']
			},
			address() {
				return this.$store.state.address.address
			}
		},

		components: {
			shopCard,
			customNavi
		},
		created() {
			this.getHomepictureAndNotice()
		},

		onShow() {
			if(!this.address.province) {
				console.log('gonna get the location')
				this.getLocation()
			}else {
				// #ifdef MP-WEIXIN
				this.getTheShop()
				// #endif
			}	
			// #ifdef H5
			this.getShopList()
			// #endif
			this.setTabBarIndex(0)
		},


		onPullDownRefresh() {
			// #ifdef H5
			this.getShopList()
			// #endif
			// #ifdef MP-WEIXIN || MP-TOUTIAO
			this.getTheShop()
			// #endif
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (this.isSearch) {
				if (this.current < this.pages) {
					this.handleSearch();
				}
			} else if (!this.isSearch) {
				if (this.current < this.pages) {
					this.getShopList(this.current + 1);
					// this.getShopList(this.lat, this.lng, this.current + 1);
				}
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
			//从微信后台获取用户信息并传回服务器
			getUserInfo() {
				//#ifdef MP-WEIXIN
				if (this.$store.state.userInfo.nickName !== '') return
				let self = this
				wx.getUserProfile({
					desc: '获取用户信息并更新至服务器',
					success(res) {
						self.$request.put('/p/user/setUserInfo', {
							avatarUrl: res.userInfo.avatarUrl,
							nickName: res.userInfo.nickName
						}).then(() => {
							self.$store.commit('updateUserInfo', {
								avatarUrl: res.userInfo.avatarUrl,
								nickName: res.userInfo.nickName
							})
						})
					}
				})
				//#endif
			},

			//仅获取指定店铺
			async getTheShop(lat, lng) {
				try {
					let res = await this.$request.get('/shop/shop/authorityShop', {
						lat: lat || this.address.latitude,
						lng: lng || this.address.longitude
					})
					this.shopList = [res]
				} catch (e) {
					//TODO handle the exception
				}
			},

			//获取周边建筑
			getNearBy: function(latitude, longitude) {
				console.log('getnear by')
				let self = this;
				qqmapsdk = new QQMapWX({
					key: '2JGBZ-VMBLQ-DWN54-GURL6-N5AJZ-XBFYQ'
				});
				qqmapsdk.reverseGeocoder({
					location: {
						latitude,
						longitude
					},
					get_poi: 1,
					poi_options: 'policy=2;radius=3000;page_size=20;page_index=1',
					success: function(res) {
						let result = res.result.pois[0];
						let centerData = {
							title: result.title,
							id: result.id,
							addr: result.address,
							province: result.ad_info.province,
							city: result.ad_info.city,
							district: result.ad_info.district,
							latitude: result.location.lat,
							longitude: result.location.lng
						};
						console.log(centerData)
						self.$store.commit('address/updateAddress', centerData)
					},
					fail: (res) => {}
				});
			},

			gomap: function() {
				uni.navigateTo({
					url: '/pages/map/map?entry=home'
				});
			},
			// 获取店铺列表
			async getShopList(current = 1) {
				// async getShopList(lat, lng, current = 1) {
				try {
					let res = await this.$request.get('/shop/shop/page', {
						current: current,
						state: 0,
						// lat,
						// lng
					})
					let list = [];
					if (res.current == 1) {
						list = res.records;
					} else {
						list = this.shopList;
						list = list.concat(res.records);
					}
					this.shopList = list
					this.pages = res.pages
					this.current = res.current
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			// 跳转公告详情页
			toNewsDetail: function(e) {
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id=' + id
				});
			},

			async handleSearch() {
				var shopName = this.searchValue
				if (shopName) {
					try {
						this.current = 1
						let res = await this.$request.get('/search/searchShop', {
							current: this.current,
							shopName: this.searchValue,
							lat: this.address.latitude,
							lng: this.address.longitude
						})
						let list = [];
						if (res.current == 1) {
							list = res.records;
						} else {
							list = this.shopList;
							list = list.concat(res.records);
						}
						this.setData({
							shopList: list,
							pages: res.pages,
							current: res.current + 1
						})
					} catch (e) {
						console.log(e)
						//TODO handle the exception
					}
				} else {
					// 当不搜索时只展示官方店铺
					this.getTheShop();
				}
			},

			goHomeIndeed: function(e) {
				var link = e.currentTarget.dataset.link;
				console.log(link)
				if (link) {
					uni.navigateTo({
						url: link
					});
				}
			},
			
			async getLocation(alreadyCheck) {
				let self = this
				new Promise((resolve, reject) =>{
					console.log('running getlcoation')
					if(alreadyCheck) resolve(true)
					uni.getSetting({
						success({authSetting}) {
							console.log(authSetting)
							if(authSetting['scope.userLocation']) {
								resolve(true)
							}else {
								resolve(false)
							}
						},
						fail(e) {
							resolve(false)
						}
					})					
				}).then(ifAuthorizeLocation =>{
					if(!ifAuthorizeLocation) {
						return new Promise((resolve, reject) =>{
							uni.showModal({
								title: '提示',
								content: '请授权您的位置信息，以为您提供您附近的优质店铺的信息，并为您提供配送服务',
								showCancel: false,
								success({confirm}) {
									if(confirm) {
										resolve(true)
									}
								}
							})
						})						
					}else {
						return true
					}
				}).then(ifGetPermission =>{
					uni.authorize({
						scope: 'scope.userLocation',
						success() {
							console.log('getlocation success')
							uni.getLocation({
								success(res) {
									let longitude = res.longitude;
									let latitude = res.latitude; 
									// #ifdef MP-WEIXIN || MP-TOUTIAO
									self.getTheShop(latitude, longitude)
									// #endif
									self.getNearBy(latitude, longitude);
								}
							})
						},
						fail() {
							uni.showModal({
								title: '提示',
								content: '外卖送餐需要您的地理位置',
								confirmText: '去授权',
								success(res) {
									if(res.confirm) {
										uni.openSetting({
											success(res) {
												console.log(res)
												self.getLocation(true)
											}
										})
									}else {
										uni.showToast({
											icon: 'none',
											title: '您未授权位置，此时无法正常为您提供服务',
											duration: 2500
										})
									}
								}
							})
						}
					})
				})
			},

			async getHomepictureAndNotice() {
				try {
					// let res = await this.$request.get('/p/picture/homePageData')
					let res = await this.$request.get('/p/picture/homePageData')
					this.pictureList = res.indexList || []
					this.noticeList = res.noticeList || []
					this.advertising = res.backgroundImage
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},

			// #ifdef APP-NVUE
			handleContact() {

			}
			// #endif

		}
	};
</script>
<style lang="scss">
	.content-btn {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		text-align: unset;
		line-height: unset;
		border-radius: unset;
		background-color: unset;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flex-row {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		width: 100%;
	}

	.movable-view {
		height: 80rpx;
		width: 80rpx;
		background-color: #FFB55F;
		color: #fff;
		border-radius: 50%;
		text-align: center;
		line-height: 80rpx;
		font-size: 22rpx;
		padding: 0;
	}

	/* 位置&搜索框 */
	.location-search {
		background-color: #FFBF77;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #FFffff;
		padding: 20rpx 14rpx;
		height: 40rpx;
		line-height: 40rpx;
		z-index: 99;
		margin: 0 auto;
	}

	.location {
		height: 40rpx;
		line-height: 40rpx;
		width: 26%;
		margin: 0;
	}

	.location .location-tit {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.location>view {
		font-size: 28rpx;
		white-space: nowrap;

		&:first-child {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.location image {
		width: 26rpx;
		position: relative;
		top: 2rpx;
		margin-right: 6rpx;
	}

	.search-block {
		position: relative;
		width: 55%;
	}

	.search {
		width: 100%;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 80rpx;
		height: 64rpx;
		padding: 0 20rpx;
		line-height: 64rpx;
		justify-content: space-between;
		font-size: 28rpx;
		box-sizing: border-box;
	}

	.location-search .search-img {
		width: 34rpx;
		vertical-align: middle;
		position: absolute;
		right: 35rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.search .placeholder {
		color: #FFFBFA;
	}

	.customer {
		background: #FFBF77;
		border: 0;
		padding: 0;
		color: #fff;
		text-align: center;
		font-size: 28rpx;
		width: 50px;
		height: 50rpx;
		line-height: 50rpx;
		display: block;
		width: 15%;
		margin: 0;
	}

	.customerImg {
		width: 38rpx;
		height: 38rpx;
		vertical-align: middle;
		margin-right: 5rpx;
	}

	.customer text {
		vertical-align: middle;
	}

	button::after {
		content: "";
		width: 0;
		height: 0;
		margin: 0;
	}


	/* 轮播图 */
	.banner-back {
		width: 100%;
		position: absolute;
		z-index: -1;
		top: 0;
	}

	.banner {
		margin-top: 10rpx;
		width: 96%;
		position: relative;
		right: 0;
		z-index: 99;
		left: 2%;
	}

	.banner swiper {
		height: 354rpx;
	}

	.banner image {
		width: 100%;
		border-radius: 8px;
	}

	/* 公告 */
	.notice {
		width: 100%;
		font-size: 26rpx;
		justify-content: start;
		color: #666666;
		height: 90rpx;
	}

	.notice-icon {
		margin: 20rpx 20rpx;
	}

	.notice image {
		width: 70rpx;
		vertical-align: middle;
	}

	.notice .notice-content {
		width: 100%;
		height: 100%;
		line-height: 90rpx;
	}

	.separation {
		height: 13rpx;
		width: 100%;
		background-color: #FFF6ED;
	}

	.advertising {
		width: 95%;
		margin: 23rpx auto 0;
	}

	.advertising image {
		display: block;
	}

	.shopList {
		width: 100%;
	}

	.shopList .filter {
		width: 93%;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.shopList .filter .leftBar {
		font-size: 32rpx;
		font-weight: bold;
		height: 40rpx;
		line-height: 40rpx;
		position: relative;
		padding-left: 16rpx;
		color: #333333;
	}

	.shopList .filter .leftBar::before {
		content: " ";
		position: absolute;
		left: 0;
		top: 4rpx;
		width: 8rpx;
		height: 34rpx;
		background: #fad0a0;
	}

	.shopList .filter .rightBar {
		font-size: 28rpx;
		color: #999999;
	}

	.shops {
		width: 100%;
		padding-bottom: 40rpx;
	}
</style>
