<template>
	<view>
		<!--pages/invitation/invitation.wxml-->
		<customNavi :naviData='naviData'>填写邀请码</customNavi>
		<view class="write" hover-class="none" hover-stop-propagation="false">
			请填写邀请码
		</view>
		<view class hover-class="none" hover-stop-propagation="false">
			<input class="weui-input" auto-focus :value="yqm" @input="handleInput"></input>
		</view>
		<view class="submitButton" hover-class="none" hover-stop-propagation="false" @tap="submit">
			提交邀请码
		</view>
	</view>
</template>

<script>
	// pages/invitation/invitation.js
	import customNavi from "@/components/custom-navi/custom-navi";

	export default {
		data() {
			return {
				yqm: '',
				naviData: {
					ifGoBack: true
				}
			};
		},

		components: {
			customNavi
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			handleInput: function(e) {
				this.setData({
					yqm: e.detail.value
				});
			},
			//
			submit: function() {
				uni.showLoading({
					mask: true
				});
				this.$request.put("/p/user/setPuserid", {
					yqm: this.yqm
				}).then((res) => {
					uni.hideLoading();
					if (res == '000') {
						setTimeout(() => {
							uni.showToast({
								title: '绑定成功',
								icon: 'success',
								duration: 2000
							});
						}, 0);
						setTimeout(() => {
							uni.switchTab({
								url: "../user/user" //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
							});
						}, 1000);
					} else if (res == 111) {
						setTimeout(() => {
							uni.showToast({
								title: '邀请码不能和上级绑定',
								icon: 'none'
							});
						});
					} else if (res == 222) {
						setTimeout(() => {
							uni.showToast({
								title: '不能绑定自己的邀请码',
								icon: 'none'
							});
						});
					} else if (res == 333) {
						setTimeout(() => {
							uni.showToast({
								title: '邀请码错误，请重新填写',
								icon: 'none',
								duration: 2000
							});
						}, 0);
					}
				}, (rej) => {
					console.log(rej)
				})
			}
		}
	};
</script>
<style>
	/* pages/invitation/invitation.wxss */

	.write {
		padding-left: 5%;
		height: 80rpx;
		line-height: 80rpx;
		color: #666;
		margin-top: 15rpx;
	}

	.weui-input {
		height: 88rpx;
		line-height: 48rpx;
		border: 1px solid #D9D9D9;
		border-radius: 12rpx;
		width: 90%;
		margin: 0 auto;
		padding: 15rpx 0 15rpx 10rpx;
		box-sizing: border-box;
		color: #666;
		font-size: 32rpx;

	}

	.submitButton {
		position: fixed;
		width: 92%;
		left: 4%;
		border-radius: 50rpx;
		bottom: 40rpx;
		background-color: #FFBF77;
		color: #FEFCFB;
		height: 90rpx;
		line-height: 90rpx;
		/* border-radius: 5px; */
		font-size: 34rpx;
		text-align: center;
	}
</style>
