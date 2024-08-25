<template>
	<view>
		<!--pages/refund/refund.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>

		<view class="container">
			<view class="refund-reason" @tap="openRefundPop">
				<text class="refund-tit">退款原因</text>
				<text class="refund-tit-explanation">{{radioValue==-1?'选择退款原因':refundResons[radioValue].tit}}</text>
				<image src="/static/images/icon/more01.png" mode="aspectFit"></image>
			</view>
			<view class="refund-amount">
				<text class="refund-tit">退款金额</text>
				<input :value="actualTotal" disabled="true"></input>
				<text class="append">最多￥{{actualTotal}}</text>
			</view>
			<view class="refund-notice">
				<view class="refund-tit">退款说明（选填）</view>
				<view class>
					<textarea maxlength="200" placeholder="请输入退款说明(最多200字)" placeholder-class="refund-tit-explanation"
						@blur="refundNoticeInput"></textarea>
				</view>
			</view>

			<view class="phone">
				<text class="refund-tit">联系电话</text>
				<input placeholder="请输入电话号码" placeholder-class="refund-tit-explanation"
					@blur="handleMobileInput"></input>
			</view>
			<view class="refund-evidence">
				<view class="evidence">
					<text class="refund-tit">上传凭证</text>
					<text class="refund-tit-explanation">(最多五张)</text>
				</view>

				<!-- <view class="evidence-content"><image src="../../images/icon/camera.png" mode="aspectFit"></image></view> -->

				<!-- 容器 -->
				<view class="ui_uploader_cell">
					<!-- 根据已选择的图片临时路径数组展示图片-->
					<block v-for="(item, index) in uploaderList" :key="index">
						<view class="ui_uploader_item">
							<!-- 删除-->
							<icon class="ui_uploader_item_icon" @tap="clearImg" :data-index="index" type="clear"
								size="20" color="red"></icon>
							<!-- 图片-->
							<image @tap="showImg" :data-index="index" :src="item"></image>
						</view>

					</block>
					<!-- 上传按钮+框 -->
					<view class="ui_uploader" @tap="upload" v-if="showUpload">
						<image class="icon" src="/static/images/icon/camera.png" mode="widthFix"></image>
					</view>
				</view>


			</view>
		</view>

		<view class="refundSubmit-btn" @tap="handleRefund">提交</view>

		<view class="refundPop" v-if="showRefundPop">
			<view class="hide" @tap="closeRefundPop"></view>
			<view class="refundBox" :animation="refundAnimation">
				<view class="refund-tit">选择退款原因</view>
				<view class="picker">
					<radio-group @change="radioChange">
						<label v-for="(item, index) in refundResons" :key="index" class="reason reason-checked">
							<view class="weui-cell__hd">
								<radio :value="item.value"></radio>
							</view>
							<view class="reason-tit">{{item.tit}}</view>
						</label>
					</radio-group>
				</view>
				<view class="refundSubmit-btn" @tap="closeRefundPop">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/refund/refund.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				title: "申请退款",
				style: {
					backgroundColor: '#FFBF77',
					color: 'white'
				},
				actualTotal: 0,
				orderNumber: "",
				showRefundPop: false,
				refundAnimation: null,
				refundResons: [{
					value: 0,
					tit: '商品破损'
				}, {
					value: 1,
					tit: '商品质量问题'
				}, {
					value: 2,
					tit: '少发/漏发'
				}, {
					value: 3,
					tit: '退差价'
				}, {
					value: 4,
					tit: '其他原因'
				}],
				radioValue: -1,
				refundNotice: '',
				mobile: '',
				refundActalTotal: '',
				uploaderList: [],
				// uploaderList:已选择的图片临时路径数组
				uploadUrlList: [],
				uploaderNum: 0,
				// uploaderNum:已选择图片个数
				showUpload: true, // showUpload:用来判断是否可继续选择图片,当传至9张时不可继续上传
				refundOrderNum: ""
			};
		},

		components: {
			navigation
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.loadOrderDetail(options);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

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
			//获取要退货的商品信息
			loadOrderDetail: function(options) {
				console.log(options);
				uni.showLoading(); //加载订单详情
				this.$request.get("/p/myOrder/orderDetail", {
					orderNumber: options.orderNum
				}).then(res => {
					this.setData({
						actualTotal: res.actualTotal,
						orderNumber: options.orderNum,
						refundActalTotal: res.actualTotal
					});
					uni.hideLoading();
				})
			},
			//提交退货申请
			handleRefund: function() {
				var self = this;
				if (this.radioValue == -1) {
					uni.showToast({
						title: '请选择退款原因',
						icon: 'none'
					});
					return;
				}

				if (!this.refundActalTotal) {
					uni.showToast({
						title: '请输入退款金额',
						icon: 'none'
					});
					return;
				}

				if (!this.mobile) {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none'
					});
					return;
				}

				if (this.uploaderList.length == 0) {
					uni.showToast({
						title: '请上传凭证',
						icon: 'none'
					});
					return;
				}

				if (this.uploaderList.length > this.uploadUrlList.length) {
					console.log("上传图片不完整");
					uni.showToast({
						title: '图片正在上传，请稍等',
						icon: 'none'
					});
					return;
				}

				uni.showModal({
					title: '提示',
					content: '确认申请退款？',
					success: res => {
						if (res.confirm) {
							// console.log('弹框后点取消')
							uni.showLoading();
							this.$request.get("/p/refund/refund", {
								orderNumber: self.orderNumber,
								refundReason: self.refundResons[self.radioValue].tit,
								refundExplain: self.refundNotice,
								phone: self.mobile,
								refundImg: self.uploadUrlList
							}).then(res => {
								uni.hideLoading();
								if (res.code === '000') {
									this.$showToast('退款成功，请等待汇款', 2000)
								} else if (res.code === '111') {
									this.$showToast('退款成功，请等待审核', 2000)
								} else {
									this.$showToast('退款失败，请联系商家', 2000)
								}
								setTimeout(() => {
									uni.switchTab({
										url: "../user/user" //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
									});
								}, 1500)
							})
						} else {
							console.log('弹框后点取消');
						}
					}
				});
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
						showRefundPop: false
					});
				}, 300);
			},
			radioChange: function(e) {
				console.log(e);
				var radioValue = e.detail.value;
				this.setData({
					radioValue
				});
			},
			refundNoticeInput: function(e) {
				// console.log(e);
				this.setData({
					refundNotice: e.detail.value
				});
			},
			handleMobileInput: function(e) {
				this.setData({
					mobile: e.detail.value
				});
			},
			// 删除图片
			clearImg: function(e) {
				// var nowList = [];//新数据
				var uploaderList = this.uploaderList; //原数据
				// for (let i = 0; i < uploaderList.length;i++){
				//   if (i == e.currentTarget.dataset.index){
				//     continue;
				//   }else{
				//     nowList.push(uploaderList[i])
				//   }
				// }

				uploaderList.splice(e.currentTarget.dataset.index, 1);
				this.uploadUrlList.splice(e.currentTarget.dataset.index, 1);
				this.setData({
					uploaderNum: this.uploaderNum - 1,
					uploaderList,
					showUpload: true
				});
			},
			//展示图片
			showImg: function(e) {
				var that = this;
				uni.previewImage({
					urls: that.uploadUrlList,
					current: that.uploadUrlList[e.currentTarget.dataset.index]
				});
			},
			//上传图片
			upload: function(e) {
				var that = this;
				uni.chooseImage({
					count: 6 - that.uploaderNum,
					// 默认9
					sizeType: ['compressed'],
					// 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					// 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						console.log(res); // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

						let tempFilePaself = res.tempFilePaself;

						for (let i = 0; i < tempFilePaself.length; i++) {
							const file = tempFilePaself[i];
							that.uploadFile(file);
						}

						let uploaderList = that.uploaderList.concat(tempFilePaself);

						if (uploaderList.length == 6) {
							that.setData({
								showUpload: false
							});
						}

						that.setData({
							uploaderList: uploaderList,
							uploaderNum: uploaderList.length
						});
					}
				});
			},
			uploadFile: function(filePath) {
				uni.uploadFile({
					filePath: filePath,
					name: 'file',
					// url: getApp().imgUploadBaseUrl,
					url: 'https://wx.xiaoerlangdang.com/p/file/upload/element',
					// url:  'http://192.168.0.126:8086/p/file/upload/element',
					// formData: formData,
					header: {
						'Authorization': uni.getStorageSync('token')
					},
					// timeout: 0,
					success: result => {
						this.uploadUrlList.push('http://images.51xeld.com/' + result.data);
					},
					fail: res => {
						console.log(res);
					},
					complete: res => {}
				});
			}
		}
	};
</script>
<style>
	/* pages/order-detail/order-detail.wxss */

	page {
		background: #f4f4f4;
	}

	.container {
		font-size: 30rpx;
	}

	.container>view {
		/* height: 110rpx; */
		width: 100%;
		background-color: #ffffff;
		line-height: 110rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
		position: relative;
		border-bottom: 1px solid #F7F4F8;
	}

	.container .refund-tit {
		color: #686568;
	}

	.container .refund-tit-explanation {
		margin-left: 30rpx;
		color: #BDBABE;
	}

	.container .refund-reason image {
		width: 16rpx;
		height: 30rpx;
		transform: rotate(90deg);
		vertical-align: middle;
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}

	.container .refund-amount {
		display: flex;
		align-items: center;
	}

	.container .refund-amount input {
		margin-left: 30rpx;
		color: #E32E24;
	}

	.container .refund-amount .append {
		position: absolute;
		right: 40rpx;
		color: #BDBABE;
	}

	.container .refund-notice {
		height: 260rpx;
		margin-bottom: 20rpx;
	}

	.container .refund-notice textarea {
		height: 150rpx;
		width: 100%;
	}

	.container .phone {
		display: flex;
		align-items: center;
	}

	/* .container .refund-evidence{
} */
	.container .refund-evidence image {
		width: 200rpx;
		height: 200rpx;
	}

	.container .refund-evidence .icon {
		width: 80rpx;
	}

	.ui_uploader_cell {
		display: flex;
		flex-wrap: wrap;
	}

	.ui_uploader_item {
		width: 33%;
		position: relative;
	}

	.ui_uploader_item icon {
		position: absolute;
		left: 0;
		top: 0;
		background-color: #fff;
		height: 38rpx;
		line-height: 42rpx;
		border-radius: 50%;

	}

	.container .phone input {
		margin-left: 15rpx;
		vertical-align: middle;
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
	}






	.refundPop .refundBox .picker {
		margin-top: 20rpx;
	}

	.refundPop .refundBox label {
		display: flex;
		font-size: 24rpx;
		padding: 20rpx 0 20rpx 40rpx;
		border-bottom: 1px solid #F8F8F8;
		color: #959595;
	}

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
		height: 80rpx;
		width: 80%;
		background-color: #FFBF77;
		margin: 0 auto;
		color: #ffffff;
		text-align: center;
		line-height: 80rpx;
		border-radius: 50rpx;
		/* position: absolute;
  bottom: 30px;
  left: 41px; */
		margin: 50rpx auto;
	}
</style>
