<template>
	<view>
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>

		<view class="container">
			<view class="bank-account">
				<view class="tit">提现账号:</view>
				<input class="content" placeholder="请输入银行卡号" placeholder-class="placeholder" :value="bankAmount"
					@blur="onAccountInput"></input>
			</view>
			<view class="bank-account">
				<view class="tit">开户行：</view>
				<input class="content" placeholder="请输入开户行" placeholder-class="placeholder" :value="bankName"
					@blur="onBankNameInput"></input>
			</view>
			<view class="account-name">
				<view class="tit">姓名:</view>
				<input class="content" placeholder="请与银行卡预留姓名保持一致" placeholder-class="placeholder" :value="name"
					@blur="onNameInput"></input>
			</view>
			<view class="withdraw-amount">
				<view class="tit">提现金额</view>
				<view class="content">
					<input class placeholder="请输入提现金额" placeholder-class="amount-num" @blur="onAmountInput"
						:value="withdrawAmount"></input>
					<view class="amount-info">
						<text class="into-tit">可提现金额</text>
						<text class="symbol"> ￥</text>
						<text class="info-num">{{amount}}</text>
						<text class="get-all-btn" @tap="getAllAmount">全部提现</text>
					</view>
				</view>
			</view>
			<view class="submitbtn" @tap="submit">确认提现</view>
		</view>
	</view>
</template>

<script>
	// pages/withdraw/withdraw.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				title: '提现',
				style: {
					color: 'white',
					backgroundColor: '#FFBF77'
				},
				bandAccount: '',
				withdrawAmount: 0,
				name: '',
				amount: 0,
				bankAccount: "",
				bankName: ""
			};
		},

		components: {
			navigation
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getAccountInfo();
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			getAccountInfo: function() {
				this.$request.get('/Spread/getpromotionIncome', ).then((res) => {
					this.amount = res.account
				}, (rej) => {
					console.log(rej)
				})
			},
			onAccountInput: function(e) {
				this.setData({
					bankAccount: e.detail.value
				});
			},
			onBankNameInput: function(e) {
				this.setData({
					bankName: e.detail.value
				});
			},
			onNameInput: function(e) {
				this.setData({
					name: e.detail.value
				});
			},
			onAmountInput: function(e) {
				this.setData({
					withdrawAmount: e.detail.value
				});
			},
			submit: function() {
				if (!this.bankAccount) {
					uni.showToast({
						title: '请填写银行卡号',
						icon: "none"
					});
					return;
				}

				if (!this.bankName) {
					uni.showToast({
						title: '请填写开户行',
						icon: "none"
					});
					return;
				}

				if (!this.name) {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none'
					});
					return;
				}

				if (this.withdrawAmount == 0) {
					uni.showToast({
						title: '您输入的提现金额为0',
						icon: 'none'
					});
					return;
				}

				if (!this.withdrawAmount) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					});
					return;
				}

				if (this.withdrawAmount > this.amount) {
					uni.showToast({
						title: '金额超出最大可提现金额',
						icon: 'none'
					});
					return;
				}
				this.$request.get('/application/cashOutApplication', {
					bankAccount: this.bankAccount,
					bankName: this.bankName,
					name: this.name,
					withdrawAmount: this.withdrawAmount
				}).then((res) => {
					if (res.state == 0) {
						uni.showToast({
							title: '提现成功，请等待汇款'
						});
					} else {
						uni.showToast({
							title: '提现失败。请联系服务商',
							icon: 'none'
						});
					}
					uni.navigateBack({
						delta: 1
					});
				}, (rej) => {
					console.log(rej)
				})
			},
			getAllAmount: function() {
				var withdrawAmount = this.amount;
				this.setData({
					withdrawAmount
				});
			}
		}
	};
</script>
<style>
	/* pages/withdraw/withdraw.wxss */

	page {
		background-color: #F4F4F4;
	}

	.container {
		box-sizing: border-box;
		padding: 3% 3% 0;
		font-size: 30rpx;
	}

	.container .tit {
		height: 88rpx;
		line-height: 88rpx;
		color: #666;
		padding-left: 10rpx;
	}

	.container input {
		background-color: #fff;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 10rpx;
		padding-left: 15rpx;
		font-size: 28rpx;
	}

	.placeholder {
		font-size: 28rpx;
		color: #A3A3A3;
	}

	.container .withdraw-amount .content {
		width: 100%;
		background-color: #fff;
		height: 220rpx;
		border-radius: 8rpx;
	}

	.container .withdraw-amount .content input {
		height: 150rpx;
		border-bottom: 1px solid #F9F9F9;
		font-size: 44rpx;
		color: #666;
	}

	input::-webkit-input-placeholder {
		font-size: 0.3rem;
	}

	.amount-num {
		height: 150rpx;
		line-height: 150rpx;
		font-size: 32rpx;
		color: #999;
		padding-left: 10rpx;
	}

	.container .withdraw-amount .content .amount-info {
		height: 70rpx;
		line-height: 70rpx;
		color: #7C7C7C;
		position: relative;
		padding-left: 20rpx;
	}

	.container .withdraw-amount .content .info-num {
		color: #666;
		font-size: 34rpx;
	}

	.container .withdraw-amount .content .symbol {
		color: #666;
	}

	.container .withdraw-amount .content .get-all-btn {
		position: absolute;
		right: 30rpx;
		color: #FFBF77;
	}

	.container .submitbtn {
		height: 88rpx;
		width: 100%;
		color: #ffffff;
		background-color: #FFC078;
		border-radius: 46rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 100rpx auto 0;
	}
</style>
