<template>
	<view>
		<!--pages/poster/poster.wxml-->
		<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>
		<view class="content">
			<view style="width:100%;height:100%;">
				<canvas :style="'width:' + screenWidth + 'px;height:' + (screenWidth*1.77) + 'px;z-index:1;'"
					canvas-id="mycanvas"></canvas>
				<!-- <canvas  style="width:{{screenWidth}}px;height:{{screenHeight-customBar}}px;z-index:1;" canvas-id="mycanvas"/> -->
			</view>
			<view class="download" @tap="baocun">下载</view>
		</view>


		<!-- <button bindtap="run">yunxing</button> -->
	</view>
</template>

<script>
	// pages/poster/poster.js
	import navigation from "../../components/navigation/navigation";

	export default {
		data() {
			return {
				style: {
					color: 'white',
					backgroundColor: '#F86A2A'
				},
				title: '海报',
				customBar: 0,
				qrcodePath: '',
				backImg: "",
				imagePath: "",
				maskHidden: false
			};
		},

		components: {
			navigation
		},

		computed: {
			customBarHeight() {
				return this.$store.state.sysInfo.sysInfo.customBarHeight
			},
			screenWidth() {
				console.log(this.$store.state.sysInfo)
				return this.$store.state.sysInfo.sysInfo.screenWidth
			},
			screenHeight() {
				return this.$store.state.sysInfo.sysInfo.screenHeight
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var self = this;
			this.getPosterWxCode();
			var screenWidth = this.screenWidth;
			var screenHeight = this.screenHeight;
			var context = uni.createCanvasContext('mycanvas');
			uni.getImageInfo({
				src: "https://images.51xeld.com/2020/09/79aafc9ee35e4342a4e0c911265ce7f9.png",
				success(res) {
					var backImg = res.path;
					self.setData({
						backImg: res.path
					});
					context.drawImage(backImg, 0, 0, screenWidth, screenWidth * 1.77);
					self.$request.get("/user/enterMemberPage").then(res => {
						console.log(res)
						console.log("request running");
						var save = uni.getFileSystemManager();
						var number = Math.random();
						// #ifdef MP-WEIXIN
						let filePath = wx.env.USER_DATA_PATH + '/pic' + number + '.png';
						// #endif
						console.log("图片地址为" + filePath);
						save.writeFile({
							filePath: filePath,
							data: res,
							encoding: 'base64',

							success(res) {
								self.setData({
									//base 64设置到页面上
									qrcodePath: filePath
								});
								var codeImg = filePath;
								context.drawImage(codeImg, screenWidth * 0.3, screenWidth *
									0.79, screenWidth * 0.4, screenWidth * 0.4);
								context.draw(); //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时

								setTimeout(function() {
									uni.canvasToTempFilePath({
										canvasId: 'mycanvas',
										success: function(res) {
											var tempFilePath = res
												.tempFilePath;
											self.setData({
												imagePath: tempFilePath
											});
										},
										fail: function(res) {
											console.log(res.tempFilePath);
										}
									});
								}, 1000);
							}
						});
					})
				}
			});
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			//点击保存到相册
			baocun: function() {
				console.log("running");
				var self = this;
				uni.saveImageToPhotosAlbum({
					filePath: self.imagePath,
					success: res => {
						uni.showModal({
							content: '图片已保存到相册，赶紧晒一下吧~',
							showCancel: false,
							confirmText: '好的',
							confirmColor: '#333',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									/* 该隐藏的隐藏 */

									self.setData({
										maskHidden: false
									});
								}
							},
							fail: function(res) {
								console.log(11111);
							}
						});
					}
				});
				console.log("running");
			},
			run: function() {
				console.log(this.backImg);
			},
			getPosterWxCode: function() {
				let self = this;
				self.$request.post("/user/getPosterWxCode",).then(res =>{
					var save = uni.getFileSystemManager();
					var number = Math.random();
					let filePath = uni.env.USER_DATA_PATH + '/pic' + number + '.png';
					save.writeFile({
						filePath: filePath,
						data: res,
						encoding: 'base64',
						success(res) {
							self.setData({
								//base 64设置到页面上
								qrcodePath: filePath
							});
						}
					});
				})
			}
		}
	};
</script>
<style>
	/* pages/poster/poster.wxss */
	.content {
		position: relative;
	}

	.download {
		color: #fff;
		padding: 12rpx 30rpx;
		position: absolute;
		top: 23rpx;
		right: 30rpx;
		border: 1px solid #fff;
		border-radius: 16px;
		z-index: 10000;
	}
</style>
