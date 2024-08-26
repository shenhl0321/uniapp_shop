<template>
	<view>
		<!--pages/newUser/newUser.wxml-->


		<view class="user-content">

			<view class="background">
				<image class="backImage" mode="widthFix"
					src="http://images.51xeld.com/2020/07/a7c15d682d734fe5b1ed464c91874bca.png"></image>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="userInfo-inviteCode flex-spaceA">
				<view class="headphoto">
					<open-data class="photoimage" type="userAvatarUrl"></open-data>
				</view>
				<view class="nickname-code flex-column">
					<view class="nickname">
						<open-data type="userNickName"></open-data>
						<!-- 很长很长的名字很长很长的名字很长很长的名字很长很长的名字 -->
					</view>
					<view class="invitationBar flex-spaceA">
						<view class="inviTitle">邀请码：</view>
						<view class="invitecode">{{yqm}}</view>
						<view class="copyBtn" @tap="copyText" :data-text="yqm">复制</view>
					</view>
				</view>
				<button class="inviteBtn flex-spaceA" open-type="share">
					<image class="flyimage" src="/static/images/icon/fly.png" mode="widthFix"></image>
					邀请好友
				</button>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 || MP-TOUTIAO-->
			<view class="userInfo-inviteCode flex-spaceA">
				<view class="headphoto">
					<image class="photoimage" :src="userInfo.pic" mode="aspectFit"></image>
				</view>
				<view class="nickname-code flex-column">
					<view class="nickname">
						{{userInfo.nickName}}
					</view>
					<view class="invitationBar flex-spaceA">
						<view class="inviTitle">邀请码：</view>
						<view class="invitecode">{{yqm}}</view>
						<view class="copyBtn" @tap="copyText" :data-text="yqm">复制</view>
					</view>
				</view>
				<button class="inviteBtn flex-spaceA" open-type="share">
					<image class="flyimage" src="/static/images/icon/fly.png" mode="widthFix"></image>
					邀请好友
				</button>
			</view>
			<!-- #endif -->

			<view class="account flex-spaceB">
				<view class="account-item money-amount">
					<view class="number">{{account||0}}</view>
					<view class="title">余额(￥)</view>
				</view>
				<view class="account-item flex-column" @tap="goCoupon">
					<view class="number">0</view>
					<view class="title">优惠券</view>
				</view>
				<view class="account-item" @tap="goPromotionOrder">
					<view class="number">{{tuiguangOrder||0}}</view>
					<view class="title">推广</view>
				</view>
				<view class="account-item" @tap="goAllmember">
					<view class="number">{{friendSize}}</view>
					<view class="title">好友</view>
				</view>
			</view>

			<view class="myorders flex-column" @click="permissionCheck">
				<view class="myorders-title flex-spaceB" data-sts="0" @tap="toOrderListPage">
					<view class="myorder">我的订单</view>
					<view class="moreorder">查看全部订单 <image mode="widthFix" class="orderstitle-moreimage"
							src="/static/images/icon/more01.png"></image>
					</view>
				</view>
				<view class="orderitems flex-spaceA">
					<view class="orderitem flex-column" @tap="toOrderListPage" data-sts="1">
						<view class="order-icon">
							<image mode="widthFix" class="order-icon-image" src="/static/images/icon/pendingpay.png">
							</image>
						</view>
						<view class="order-title">待付款</view>
						<view v-if="orderAmount.unPay>0" class="number">{{orderAmount.unPay}}</view>
					</view>
					<view class="orderitem flex-column" @tap="toOrderListPage" data-sts="2">
						<view class="order-icon">
							<image mode="widthFix" class="order-icon-image"
								src="/static/images/icon/pendingtransfer.png"></image>
						</view>
						<view class="order-title">待发货</view>
						<view v-if="orderAmount.payed>0" class="number">{{orderAmount.payed}}</view>
					</view>
					<view class="orderitem flex-column" @tap="toOrderListPage" data-sts="3">
						<view class="order-icon">
							<image mode="widthFix" class="order-icon-image"
								src="/static/images/icon/pendingreceipt.png"></image>
						</view>
						<view class="order-title">待收货</view>
						<view v-if="orderAmount.consignment>0" class="number">{{orderAmount.consignment}}</view>
					</view>
					<view class="orderitem flex-column" @tap="toOrderListPage" data-sts="4">
						<view class="order-icon">
							<image mode="widthFix" class="order-icon-image" src="/static/images/icon/aftersale.png">
							</image>
						</view>
						<view class="order-title">退款/售后</view>
						<view v-if="orderAmount.refund>0" class="number">{{orderAmount.refund}}</view>
					</view>
					<view class="orderitem flex-column" @tap="toOrderListPage" data-sts="5">
						<view class="order-icon">
							<image mode="widthFix" class="order-icon-image" src="/static/images/icon/complete.png">
							</image>
						</view>
						<view class="order-title">已完成</view>
					</view>
				</view>
			</view>

			<view class="usermenu flex-column">
				<view class="menuitem flex-spaceB" @click="toMenuPage('/pages/member/member-info')">
					<view class="leftitem flex-spaceA">
						<view class="menu-icon">
							<image src="/static/images/icon/member-center.png" class="menu-icon-image" mode="widthFix">
							</image>
						</view>
						<view class="menu-title">
							<text>会员中心</text>
						</view>
					</view>
					<view class="more">
						<image mode="widthFix" class="menu-more-image" src="/static/images/icon/more01.png"></image>
					</view>
				</view>
				<view class="menuitem flex-spaceB" @click="toMenuPage('/pages/delivery-address/delivery-address')">
					<view class="leftitem flex-spaceA">
						<view class="menu-icon">
							<image src="/static/images/icon/address.png" class="menu-icon-image" mode="widthFix">
							</image>
						</view>
						<view class="menu-title">
							<text>地址管理</text>
						</view>
					</view>
					<view class="more">
						<image mode="widthFix" class="menu-more-image" src="/static/images/icon/more01.png"></image>
					</view>
				</view>


				<view class="menuitem flex-spaceB" @click="toMenuPage('/pages/spread/spread')">
					<view class="leftitem flex-spaceA">
						<view class="menu-icon">
							<image src="/static/images/icon/share.png" class="menu-icon-image" mode="widthFix"></image>
						</view>
						<view class="menu-title">
							<text>推广中心</text>
						</view>
					</view>
					<view class="more">
						<image mode="widthFix" class="menu-more-image" src="/static/images/icon/more01.png"></image>
					</view>
				</view>

				<view class="menuitem flex-spaceB" @tap="applyToBepromoter">
					<view class="leftitem flex-spaceA">
						<view class="menu-icon">
							<image src="/static/images/icon/separator.png" class="menu-icon-image" mode="widthFix">
							</image>
						</view>
						<view class="menu-title">
							<text>推广员申请</text>
						</view>
					</view>
					<view class="more">
						<image mode="widthFix" class="menu-more-image" src="/static/images/icon/more01.png"></image>
					</view>
				</view>

				<view class="menuitem flex-spaceB" @tap="toInvitation">
					<view class="leftitem flex-spaceA">
						<view class="menu-icon">
							<image src="/static/images/icon/invitation.png" class="menu-icon-image" mode="widthFix">
							</image>
						</view>
						<view class="menu-title">
							<text>填写邀请码</text>
						</view>
					</view>
					<view class="more">
						<image mode="widthFix" class="menu-more-image" src="/static/images/icon/more01.png"></image>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="contact" @contact="handleContact" class="menuitem flex-spaceB"
					style="line-height:100%;background-color:#fff;">
					<view class="leftitem flex-spaceA">
						<view class="menu-icon">
							<image src="/static/images/icon/costomerservice.png" class="menu-icon-image"
								mode="widthFix"></image>
						</view>
						<view class="menu-title">
							<text>官方客服</text>
						</view>
					</view>
					<view class="more">
						<image mode="widthFix" class="menu-more-image" src="/static/images/icon/more01.png"></image>
					</view>
				</button>
				<!-- #endif -->

				<!-- <view class="menuitem flex-spaceB">
    <view class="leftitem flex-spaceA">
      <view class="menu-icon"><image src="../../images/icon/setup.png" class="menu-icon-image" mode="widthFix"></image></view>
      <view class="menu-title">
        <text>设置</text>
      </view>
    </view>
    <view class="more"><image mode="widthFix" class="menu-more-image" src="../../images/icon/more01.png"></image></view>
  </view> -->

				<view class="menuitem flex-spaceB">
					<view class="leftitem flex-spaceA">
						<view class="menu-icon">
							<image src="/static/images/icon/update.png" class="menu-icon-image" mode="widthFix"></image>
						</view>
						<view class="menu-title">
							<text>当前版本</text>
						</view>
					</view>
					<view class="more">
						<text>2.1.1</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yqm: '',
				orderAmount: '',
				sts: '',
				collectionCount: 0,
				account: null,
				nickName: '',
				avatarUrl: '',
				title: '个人中心',
				friendSize: 0,
				tuigaungOrder: 0,
				selected: 0,
				extensionState: "",
				tuiguangOrder: "",
				
			};
		},

		props: {},
		computed: {
			userInfo() {
				 
				return this.$store.state.userInfo
			}
		},


		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			// #ifdef MP-WEIXIN
			// wx.getUserInfo({
			// 	success(res) {
			// 		console.log(res)
			// 	}
			// })
			// #endif
			
			if (!this.userInfo.nickName) {

				this.getAuthorize()
			}
			this.setTabBarIndex(1)
			this.initMine()
			this.getFriendsSize();
			this.getTuiguangOrder();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			if (res.from === 'button') {}
			return {
				title: "彩味塔·美食·咖啡",
				path: '/pages/home/home',
				success: function(res) {}
			};
		},
		methods: {
			getAuthorize() {
				let self = this
				// #ifndef MP-WEIXIN
				new Promise((resolve, reject) => {
					uni.authorize({
						scope: 'scope.userInfo',
						success(res) {
							resolve(true)
						},
						fail() {
							console.log('getinfo failed')
							resolve(false)
						}
					})
				}).then(res => {
					if (res) {
						uni.getUserInfo({
							success(res) {
								self.$request.updateUserInfo(res.userInfo, self)
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '我们需要您的昵称，头像等公开信息，以为您提供更好的服务。请在设置中打开授权',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success(res) {
											self.getAuthorize()
										}
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: '无法获取您的信息',
										duration: 1500
									})
									uni.switchTab({
										url: '/pages/home/home'
									})
								}
							}
						})
					}
				})
				// #endif
				// #ifdef MP-WEIXIN
				console.log('navigate to login')
				uni.navigateTo({
					url: '/pages/login/login'
				})
				// #endif
			},

			initMine() {
				if (this.$store.state.ifOutSide) return
				this.$request.get('/p/myOrder/mine').then(res => {
					this.setData({
						orderAmount: res.orderCountMap,
						yqm: res.yqm,
						account: res.account,
						//0: 未申请 1：审核中 2：审核成功 3：审核失败
						extensionState: res.applyFlag == 0 ? 0 : res.status == 1 ? 1 : res.status == 2 ?
							2 : 3
					});
				}, rej => {

				})
			},
			getTuiguangOrder() {
				this.$request.get('/Spread/getPromoTionOrder').then(res => {
					this.tuiguangOrder = res.yjsOrderListSize
				}, rej => {

				})
			},

			getFriendsSize() {
				this.$request.get('/Spread/getCumulativeInvitation', ).then((res) => {
					this.friendSize = res.friendSize
				}, (rej) => {
					console.log(rej)
				})
			},

			//邀请码
			toInvitation: function() {
				this.$request.get('/p/user/getYqm', ).then((res) => {
					if (res == false) {
						uni.navigateTo({
							url: '/pages/invitation/invitation',
							icon: 'none'
						});
					} else {
						setTimeout(() => {
							uni.showToast({
								title: '您已成功填写邀请码，无需重复填写'
							});
						}, 1000);
					}
				}, (rej) => {
					console.log(rej)
				})
			},

			toMenuPage(url) {
				uni.navigateTo({
					url
				});
			},

			toAddressList: function() {
				uni.navigateTo({
					url: '/pages/delivery-address/delivery-address'
				});
			},
			// 跳转绑定手机号
			toBindingPhone: function() {
				uni.navigateTo({
					url: '/pages/binding-phone/binding-phone'
				});
			},

			toOrderListPage: function(e) {
				if (this.$store.state.ifOutSide) return
				var sts = e.currentTarget.dataset.sts;
				if (sts == 4) {
					uni.navigateTo({
						url: '/pages/refundList/refundList'
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/orderList/orderList?sts=' + sts
				});
			},

			applyToBepromoter: function() {
				if (this.extensionState == 0) {
					uni.showModal({
						title: '确认申请成为推广员？',
						success: res => {
							if (res.confirm) {
								this.this.$request.post('/p/user/extensionWorker', ).then((res) => {
									if (res == 'success') {
										this.$showToast('申请成功，请等待审核')
									} else if (res == 'repeat') {
										this.$showToast('您已申请成功，无需重复申请')
									}
								}, (rej) => {
									console.log(rej)
								})
							} else if (res.cancel) {}
						}
					});
				} else if (this.extensionState == 1) {
					this.$showToast('您已申请，请等待审核通过')
				} else if (this.extensionState == 2) {
					this.$showToast('您已成为推广员')
				}
			},

			copyText: function(e) {
				//#ifndef H5
				uni.setClipboardData({
					data: e.currentTarget.dataset.text,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								})
							}
						})
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
			goAllmember: function() {
				uni.navigateTo({
					url: '/pages/all-invited-member/all-invited-member'
				});
			},
			goPromotionOrder: function() {
				uni.navigateTo({
					url: '/pages/promotion-order/promotion-order'
				});
			},
			goCoupon: function() {
				uni.navigateTo({
					url: '/pages/coupon/coupon'
				});
			},
			permissionCheck() {
				if (this.$store.state.ifOutSide) {
					this.$showToast('购买商品请前往微信公众号"小象智慧门店美食商城"', null, 2000)
				}
			}
		}
	};
</script>
<style lang="scss">
	.flex-column {
		display: flex;
		flex-direction: column;
		justify-content: content;
		align-items: center;
		padding-bottom: 20rpx;
	}

	.flex-spaceB {
		display: flex;
		justify-content: space-between;
	}

	.flex-spaceA {
		display: flex;
		align-items: center;
	}

	.flex-spaceA .fly {
		padding: 0 7rpx 9rpx 10rpx;
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.user-content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-bottom: 106rpx;
	}

	.user-navigation {
		position: fixed;
		top: 0;
	}

	.backImage {
		width: 100%;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.userInfo-inviteCode {
		color: #FFFFFF;
		justify-content: flex-start;
		font-size: 28rpx;
		position: relative;
	}

	.headphoto {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		background-color: #ffffff;
		margin-left: 30rpx;
		overflow: hidden;
		border: 3px solid #ffd6a9;
	}

	.photoimage {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.nickname-code {
		margin-left: 20rpx;
		align-items: flex-start;
		justify-content: space-around;
		width: 360rpx;
		font-size: 24rpx;
	}

	.nickname {
		font-size: 32rpx;
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.invitationBar {
		color: #FEE0C1;
	}

	.copyBtn {
		font-size: 24rpx;
		margin-left: 24rpx;
		height: 32rpx;
		line-height: 32rpx;
		width: 70rpx;
		border: 1px solid #FEE0C1;
		border-radius: 16rpx;
		color: #FEE0C1;
		text-align: center;

	}

	.inviteBtn {
		width: 170rpx;
		height: 48rpx;
		border: 1px solid #FEE0C1;
		border-radius: 24rpx;
		position: absolute;
		color: #FEE0C1;
		right: 30rpx;
		top: 40rpx;
		font-size: 26rpx;
		background-color: rgba(0, 0, 0, 0);
		padding: 0 0 0 18rpx;
		line-height: 48rpx;
		text-align: center;

	}

	button::after {
		border: 0;
	}

	.flyimage {
		width: 26rpx;
		vertical-align: middle;
	}

	/* .invite{
  height: 48rpx;
}
.invite text{
  vertical-align: middle;
} */
	.account {
		margin: 20rpx auto 0;
		color: #FFFFFF;
		font-size: 40rpx;
		width: 90%;
		height: 120rpx;
	}

	.account-item {
		width: 100rpx;
		text-align: center;
	}

	.account-item .title {
		font-size: 24rpx;
		text-align: center;
		color: #FFDCA7;
	}

	.account-item .number {
		text-align: center;
	}

	.account-item .title:after {
		content: '';
		border-right: 1px solid #FCC281;
		height: 30rpx;
		position: relative;
		left: 66rpx;
		bottom: 24rpx;
	}

	.myorders {
		width: 94%;
		margin: 0 auto 10rpx;
		border-radius: 20rpx;
		background-color: white;
		box-shadow: 0 0 6px #ffdfbd;
		font-size: 24rpx;
		padding-bottom: 0;
	}

	.myorders-title {
		width: 92%;
		height: 86rpx;
		line-height: 86rpx;
		font-size: 30rpx;
		font-weight: bolder;
		color: #666;
		border-bottom: 1px solid #f5f5f5;
	}

	.myorders-title .myorder {
		font-weight: 500;
	}

	.moreorder {
		height: 86rpx;
		line-height: 86rpx;
		color: #B2B2B2;
		font-size: 26rpx;
		font-weight: normal;
	}

	.orderstitle-moreimage {
		width: 14rpx;
		vertical-align: middle;
	}

	.orderitems {
		width: 100%;
		height: 150rpx;
		color: #737373;
		justify-content: space-between;
	}

	.orderitem {
		width: 130rpx;
		height: 100rpx;
		text-align: center;
		justify-content: space-around;
		padding: 20rpx 0;
		position: relative;
	}

	.order-icon-image {
		width: 46rpx;
		vertical-align: middle;

		&:nth-child(1) {
			height: 41.5rpx;
		}

		&:nth-child(2) {
			height: 44rpx;
		}

		&:nth-child(3) {
			height: 38.5rpx;
		}

		&:nth-child(4) {
			height: 44rpx;
		}

		&:nth-child(5) {
			height: 47rpx;
		}
	}

	.orderitem .number {
		height: 26rpx;
		width: 26rpx;
		line-height: 26rpx;
		font-size: 24rpx;
		text-align: center;
		color: #FFAF50;
		border-radius: 50%;
		border: 1px solid #FFAF50;
		position: absolute;
		top: 16rpx;
		right: 30rpx;
		background-color: white;
		z-index: 99;
	}

	.menuitem {
		padding: 30rpx 0;
		width: 90%;
		border-bottom: 1px solid #F9F9F9;
		color: #777777;
		font-size: 28rpx;
		padding-right: 10rpx;
	}

	.menu-icon {
		margin-right: 16rpx;
	}

	.menu-icon-image {
		width: 44rpx;
		vertical-align: middle;

		&:nth-child(1) {
			height: 46rpx;
		}

		&:nth-child(2) {
			height: 44rpx;
		}

		&:nth-child(3) {
			height: 41rpx;
		}

		&:nth-child(4) {
			height: 44rpx;
		}

		&:nth-child(5) {
			height: 44rpx;
		}

		&:nth-child(6) {
			height: 32rpx;
		}
	}

	.menu-title {
		vertical-align: middle;
	}

	.menu-more-image {
		width: 14rpx;
	}

	.more text {
		color: #999;
	}
</style>
