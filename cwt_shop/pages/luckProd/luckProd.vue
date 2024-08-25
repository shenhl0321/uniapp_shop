<template>
	<view>
		<!--pages/luckProd/luckProd.wxml-->
		<!-- <navigation title = '{{title}}' naviStyle='{{style}}' ifShowGoBack='{{true}}' data-from="home"></navigation> -->

		<view @tap="gohome" class="gohomeContainer" :style="'top:' + (gobackBtnHeight-2) + 'px'">
			<image class="gobackpng" src="/static/images/icon/gohome.png" mode="aspectFit"></image>
		</view>
		<view class="container">
			<image src="https://images.51xeld.com/2020/10/f847f1c3e8ec4388b061d86573aae0f9.png'" class="backImg"
				mode="aspectFill"></image>
			<view class="prodBox"
				:style="'width:' + (screenWidth*0.8) + 'px;height:' + (screenWidth*0.8) + 'px;top:' + (screenHeight*0.38) + 'px'">
				<image src="https://images.51xeld.com/2020/10/20e7b0b592d445d2b72f5f0164c7d944.png" class="imgNo1"
					mode="widthFix"></image>
				<image :style="'transform:rotate(' + change_angle + 'deg)'"
					src="http://images.51xeld.com/2020/10/609fa5c0405045ffb2200cbc1125d367.png" class="imgNo2"
					mode="widthFix"></image>
				<image @tap="luckDrawStart" src="https://images.51xeld.com/2020/10/46c7c432009d49958f28546aa1dc9954.png"
					class="imgNo3" mode="widthFix"></image>
			</view>
			<!-- <view>
				<view>您中奖啦！奖品是</view>
				<view>{{price}}</view>
			</view> -->
			<view class="activityNote" :style="'top:' + (screenHeight*0.38+screenWidth*0.88) + 'px'">
				<image src="http://images.51xeld.com/2020/10/c948d0c7362f4e72a081b4e6ef5f01a0.png" mode="aspectFit"
					class="whiteLine"></image>
				<view class="title">
					<view>活动说明</view>
				</view>
				<view class="content">
					<view>1. 每人每日一次免费抽奖次数，中奖者请至现场领取奖品。</view>
					<view>2. 此活动最终解释权归湖北小象智慧门店生物科技有限公司所有。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/luckProd/luckProd.js
	var that;
	import navigation from "../../components/navigation/navigation";
	import shopCard from "../../components/shopCard/shopCard";

	export default {
		data() {
			return {
				title: "",
				style: {
					backgroundColor: '#7C50E6',
					color: '#FFFFFF'
				},
				is_play: false,
				// 是否在运动中，避免重复启动bug
				available_num: 0,
				// 可用抽奖的次数，可自定义设置或者接口返回
				start_angle: 0,
				// 转动开始时初始角度=0位置指向正上方，按顺时针设置，可自定义设置
				base_circle_num: 9,
				// 基本圈数，就是在转到（最后一圈）结束圈之前必须转够几圈 ，可自定义设置
				low_circle_num: 5,
				// 在第几圈开始进入减速圈（必须小于等于基本圈数），可自定义设置
				add_angle: 10,
				// 追加角度，此值越大转动越快，请保证360/add_angle=一个整数，比如1/2/3/4/5/6/8/9/10/12等
				use_speed: 1,
				// 当前速度，与正常转速值相等
				nor_speed: 1,
				// 正常转速，在减速圈之前的转速，可自定义设置
				low_speed: 10,
				// 减速转速，在减速圈的转速，可自定义设置
				end_speed: 20,
				// 最后转速，在结束圈的转速，可自定义设置
				random_angle: 0,
				// 中奖角度，也是随机数，也是结束圈停止的角度，这个值采用系统随机或者接口返回
				change_angle: 0,
				// 变化角度计数，0开始，一圈360度，基本是6圈，那么到结束这个值=6*360+random_angle；同样change_angle/360整除表示走过一整圈
				result_val: "未中奖",
				// 存放奖项容器，可自定义设置
				Jack_pots: [ // 奖项区间 ，360度/奖项个数 ，一圈度数0-360，可自定义设置
					// random_angle是多少，在那个区间里面就是中哪个奖项
					{
						startAngle: 1,
						endAngle: 51,
						val: "1等奖"
					}, {
						startAngle: 52,
						endAngle: 102,
						val: "2等奖"
					}, {
						startAngle: 103,
						endAngle: 153,
						val: "3等奖"
					}, {
						startAngle: 154,
						endAngle: 203,
						val: "4等奖"
					}, {
						startAngle: 204,
						endAngle: 251,
						val: "5等奖"
					}, {
						startAngle: 252,
						endAngle: 307,
						val: "6等奖"
					}, {
						startAngle: 307,
						endAngle: 360,
						val: "未中奖"
					}
				],
				screenWidth: "",
				screenHeight: "",
				gobackBtnHeight: "",
				nickName: "",
				avatarUrl: "",
				couldLottery: "",
				qrcodePath: "",
				price: ""
			};
		},

		components: {
			navigation,
			shopCard
		},

		computed: {
			shopInfo() {
				return this.$store.state.shopInfo
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			uni.getSystemInfo({
				success: result => {
					console.log(result);
					this.setData({
						screenWidth: result.screenWidth,
						screenHeight: result.screenHeight,
						gobackBtnHeight: getApp().gobackBtnHeight
					});
				}
			}); // this.getUserLotteryHistory()

			that = this;
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.userInfo']) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					} else {
						uni.getUserInfo({
							lang: 'zh_CN',
							withCredentials: true,
							success: ({
								userInfo
							}) => {
								that.setData({
									nickName: userInfo.nickName,
									avatarUrl: userInfo.avatarUrl
								});
								that.getUserLotteryHistory();
								that.getLuckProdList();
								that.getLuckPordCode();
							},
							fail: res => { // console.log("get info failed");
							},
							complete: res => { // console.log("get UserInfo running");
							}
						});
					}
				}

			});
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			gohome: function() {
				console.log("running");
				uni.switchTab({
					url: '../home/home'
				});
			},
			getUserLotteryHistory: function() {
				this.$request.post('/wheel/wheelUser?shopId=' + shopInfo.shopId, ).then((res) => {
					this.couldLottery = res
				}, (rej) => {
					console.log(rej)
				})
			},
			getLuckProdList: function() {
				this.$request.get('/wheel/productList?shopId=' + shopInfo.shopId, ).then((res) => {
					if (res.length !== 0) {
						var Jack_pots = [];
						res.forEach((item, index) => {
							console.log(item, index);
							Jack_pots.push({
								startAngle: 1 + 60 * index,
								endAngle: 60 * (index + 1),
								val: item.name
							});
						});
						this.setData({
							Jack_pots
						});
					}
				}, (rej) => {
					console.log(rej)
				})
			},
			getLuckPordCode: function() {
				var self = this
				this.this.$request.get('/user/getLuckProdCode', ).then((res) => {
					var save = uni.getFileSystemManager();
					var number = Math.random();
					let filePath = uni.env.USER_DATA_PATH + '/pic' + number + '.png';
					console.log("图片地址为" + filePath);
					save.writeFile({
						filePath: filePath,
						data: res,
						encoding: 'base64',
						success(res) {
							this.setData({
								//base 64设置到页面上
								qrcodePath: filePath
							});
						}
					});
				}, (rej) => {
					console.log(rej)
				})
			},
			doRunning: function() {
				console.log(getApp().shopId);
				this.$request.post('/wheel/lottery?shopId=' + this.shopInfo.shopId, ).then((res) => {
					this.price = res.message
				}, (rej) => {
					console.log(rej)
				})
			},

			/**
			 * 启动抽奖
			 */
			luckDrawStart: function() {
				// var that = this
				// 阻止运动中重复点击
				if (that.couldLottery) {
					if (!that.is_play) {
						// 设置标识在运动中
						that.setData({
							is_play: true // couldLottery: false,
						}); // 重置参数
						this.$request.post('/wheel/lottery?shopId=' + getApp().shopId, ).then((res) => {
							that.setData({
								price: res.message
							});
							that.luckDrawReset();
							that.getUserLotteryHistory(); // 几率随机，也可从服务端获取几率
							var theOne;
							for (const key in that.Jack_pots) {
								if (that.Jack_pots[key].val === that.price) {
									theOne = that.Jack_pots[key];
									break;
								}
							}
							console.log(theOne);
							that.setData({
								random_angle: Math.ceil(30 + theOne.startAngle)
							});
							setTimeout(that.luckDrawChange, that.use_speed);
						}, (rej) => {
							console.log(rej)
						})
					};
				} else {
					uni.showToast({
						title: '今天次数已达上限，明天再来！',
						icon: 'none'
					});
					return;
				}
			},

			/**
			 * 转盘运动
			 */
			luckDrawChange: function() {
				// console.log(that.data.random_angle)
				// 继续运动
				if (that.change_angle >= that.base_circle_num * 360 + that.random_angle) {
					// 已经到达结束位置
					// 提示中奖，
					that.getLuckDrawResult(); // 运动结束设置可用抽奖的次数和激活状态设置可用

					that.luckDrawEndset();
				} else {
					// 运动
					if (that.change_angle < that.low_circle_num * 360) {
						// 正常转速
						// console.log("正常转速")
						that.use_speed = that.nor_speed;
					} else if (that.change_angle >= that.low_circle_num * 360 && that.change_angle <= that
						.base_circle_num * 360) {
						// 减速圈
						// console.log("减速圈")
						that.use_speed = that.low_speed;
					} else if (that.change_angle > that.base_circle_num * 360) {
						// 结束圈
						// console.log("结束圈")
						that.use_speed = that.end_speed;
					} // 累加变化计数


					that.setData({
						change_angle: that.change_angle + that.add_angle >= that.base_circle_num * 360 + that
							.random_angle ? that.base_circle_num *
							360 + that.random_angle : that.change_angle + that.add_angle
					});
					setTimeout(that.luckDrawChange, that.use_speed);
				}
			},

			/**
			 * 重置参数
			 */
			luckDrawReset: function() {
				// 转动开始时首次点亮的位置，可自定义设置
				that.setData({
					start_angle: 0
				}); // 当前速度，与正常转速值相等

				that.setData({
					use_speed: that.nor_speed
				}); // 中奖索引，也是随机数，也是结束圈停止的位置，这个值采用系统随机或者接口返回

				that.setData({
					random_angle: 120
				}); // 变化计数，0开始，必须实例有12个奖项，基本是6圈，那么到结束这个值=6*12+random_number；同样change_num/12整除表示走过一整圈

				that.setData({
					change_angle: 240
				});
			},

			/**
			 * 获取抽奖结果
			 */
			getLuckDrawResult: function() {
				for (var j = 0; j < that.Jack_pots.length; j++) {
					if (that.random_angle >= that.Jack_pots[j].startAngle && that.random_angle <= that.Jack_pots[j]
						.endAngle) {
						that.setData({
							result_val: that.Jack_pots[j].val
						});
						uni.showModal({
							title: '抽奖结果',
							// content: that.data.Jack_pots[j].val,
							content: that.price
						});
						break;
					}

					;
				}

				;
			},

			/**
			 * 更新状态（运动结束设置可用抽奖的次数和激活状态设置可用）
			 */
			luckDrawEndset: function() {
				// 是否在运动中，避免重复启动bug
				that.setData({
					is_play: false
				}); // 可用抽奖的次数，可自定义设置

				that.setData({
					available_num: that.available_num - 1
				});
			}
		}
	};
</script>
<style>
	/* pages/luckProd/luckProd.wxss */
	page {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to right, #5D37D2, #4442CE, #6044EA);
	}

	.gohomeContainer {
		border: 1px solid white;
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		position: fixed;
		top: 30px;
		left: 16rpx;
		z-index: 10;
		border-radius: 50%;
		text-align: center;
	}

	.gobackpng {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		top: 7rpx;
	}

	.container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.backImg {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -3;
		top: 0rpx;
	}

	.prodBox {
		position: absolute;
		top: 33%;
		left: 50%;
		transform: translate(-50%, 0%);
		width: 80%;
	}

	.prodBox .imgNo1 {
		width: 100%;
		position: absolute;
		z-index: -2;
	}

	.prodBox .imgNo2 {
		width: 86%;
		position: absolute;
		z-index: -1;
		margin: 7%;
	}

	.prodBox .imgNo3 {
		width: 30%;
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.activityNote {
		position: absolute;
		/* bottom: 0; */
		color: #fff;
		font-size: 22rpx;
		width: 100%;
	}

	.activityNote image {
		height: 60rpx;
		width: 300rpx;
	}


	.whiteLine {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.activityNote .title {
		text-align: center;
		font-size: 30rpx;
		line-height: 64rpx;
	}

	.activityNote .content {
		width: 80%;
		margin: 0 auto;
	}

	.activityNote .content view {
		margin: 20rpx 0;
	}
</style>
