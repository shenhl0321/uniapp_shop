<template>
	<!--pages/login/login.wxml-->
	<view class="main-page" >
		<image src="http://images.51xeld.com/2020/07/44234440892046a7ac1bf4f6a7f7dee6.png" class="c-logo" mode="aspectFit" @click="consoleUserInfo"></image>
		<view class="title">彩味塔</view>
		<view class="msg">申请获得你的公开信息（昵称、头像等）</view>
		<!-- #ifdef MP-WEIXIN -->
		<button color="#eb2444" lang="zh_CN" @click="onGotUserInfo" class>授权信息</button>
		<!-- #endif -->
		<!-- #ifdef MP-TOUTIAO -->
		<button color="#eb2444" lang="zh_CN" @click="onGotUserInfo" class>授权信息</button>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		components: {},
		props: {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			onGotUserInfo(res) {
				let self = this
				// #ifdef MP-WEIXIN
				wx.getUserProfile({
					desc: '用于页面信息展示',
					success(res) {
						self.$request.updateUserInfo(res.userInfo, self)
						console.log('running')
						uni.navigateBack({
							delta: 1
						});
					}
				})
				// #endif
				// #ifdef MP-TOUTIAO
				
				// #endif
			},
			consoleUserInfo() {
				console.log(this.$store.state.userInfo)
			}
		}
	};
</script>
<style>
	/* pages/login/login.wxss */
	.main-page {
		padding-top: 20%;
	}

	image {
		display: block;
		width: 260rpx;
		height: 230rpx;
		margin: auto;
		margin-top: 100rpx;
		border-radius: 50%;
	}

	view.msg {
		font-size: 24rpx;
		color: #666;
		width: 100%;
		text-align: center;
		margin-top: 10rpx;
	}

	view.title {
		font-size: 28rpx;
		color: #333;
		width: 100%;
		text-align: center;
		margin-top: 20rpx;
	}

	button {

		width: 56%;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		color: #fff;
		background: #FFBF77;
		position: fixed;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);

	}

	button::after {
		border: 0;
	}

	.button-hover {
		background-color: #FFBF77;
		color: #fff;
	}
</style>
