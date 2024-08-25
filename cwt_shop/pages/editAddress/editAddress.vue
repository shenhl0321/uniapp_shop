<template>
	<view>
		<!--pages/editAddress/editAddress.wxml-->
		<customNavi :naviData='naviData'>{{title}}</customNavi>


		<view class="container">
			<!--input列表 -->
			<view class="input-box">
				<view class="section">
					<text>收 货 人</text>
					<input placeholder="姓名" type="text" maxlength="15" :value="receiver"
						@input="receiver = $event.target.value" placeholder-class="placeholder"></input>
				</view>
				<view class="section">
					<text>手机号码</text>
					<input placeholder="11位手机号码" type="number" maxlength="11" :value="mobile"
						@input="mobile = $event.target.value" placeholder-class="placeholder"></input>
				</view>
				<view class="section" @tap="translate">
					<text>收货地址</text>
					<view class="pca" @tap="gomap">{{street}}</view>
					<!-- <view class="animation-element-wrapper" animation="{{animation}}" style="visibility:{{show ? 'visible':'hidden'}}" catchtap="hiddenFloatView">
        <view class="animation-element" catchtap="nono">
          <text class="right-bt" catchtap="hiddenFloatView">确定</text>
          <view class="line"></view>
          <picker-view indicator-style="height: 50rpx;" value="{{value}}" bindchange="bindChange" catchtap="nono">
            <picker-view-column>
              <view wx:for="{{provArray}}" wx:key="">
                {{item.areaName}}
              </view>
            </picker-view-column>
            <picker-view-column>
              <view wx:for="{{cityArray}}" wx:key="">
                {{item.areaName}}
              </view>
            </picker-view-column>
            <picker-view-column>
              <view wx:for="{{areaArray}}" wx:key="">
                {{item.areaName}}
              </view>
            </picker-view-column>
          </picker-view>
        </view>
      </view> -->

					<view class="arrow" @tap="gomap">
						<image src="/static/images/icon/more.png"></image>
					</view>
				</view>
				<view class="section">
					<text>门牌号</text>
					<input placeholder="如楼号/单元/门牌号" type="text" :value="addr" @input="addr = $event.target.value"
						placeholder-class="placeholder"></input>
				</view>
			</view>

			<view class="defaultChecked">
				<checkbox :checked="commonAddr" @click="commonAddr = !commonAddr">设为默认地址</checkbox>
			</view>
			<!-- end input列表 -->
			<!-- 功能按钮 -->
			<view class="btn-box">
				<view class="keep btn" @tap="onSaveAddr">
					<text>保存收货地址</text>
				</view>

				<!-- <view class='clear btn' bindtap="onDeleteAddr"  wx:if="{{addrId!=0}}">
      <text>删除收货地址</text>
    </view> -->
			</view>
			<!-- end 功能按钮 -->
		</view>
	</view>
</template>

<script>
	// pages/editAddress/editAddress.js
	var index = [18, 0, 0];
	var t = 0;
	var show = false;
	var moveY = 200;
	import customNavi from "@/components/custom-navi/custom-navi"
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				naviData: {
					ifGoBack: true
				},
				commonAddr: false,
				value: [0, 0, 0],
				provArray: [],
				cityArray: [],
				areaArray: [],
				provinceId: 0,
				cityId: 0,
				areaId: 0,
				receiver: "",
				mobile: "",
				addr: "",
				addrId: 0,
				district: '',
				lat: "",
				lng: "",
				animation: "",
				show: "",
				region: ""
			};
		},

		components: {
			customNavi
		},
		computed: {
			// ...mapGetters({
			// 	'latitude': 'address/latitude',
			// 	'longitude': 'address/longitude',
			// 	'province': 'address/province',
			// 	'city': 'address/city',
			// 	'area': 'address/area',
			// 	'street': 'address/street',
			// }),
			address() {
				return this.$store.state.address.address
			}
		},
		onLoad: function(options) {
			if (options.addrId) {
				this.title = '编辑地址'
				this.$request.get("/p/address/addrInfo/" + options.addrId, ).then((res) => {
					this.setData({
						...res
					});
				}, rej => {
					console.log(rej)
				})
			} else {
				this.setData({
					title: '添加地址',
					latitude: this.address.latitude,
					longitude: this.address.longitude,
					province: this.address.province,
					city: this.address.city,
					area: this.address.district,
					street: this.address.title
				});
			}
		},

		onShow() {
			let pages = getCurrentPages()
			let curPage = pages[pages.length - 1]
			let curData = curPage.data
			if(curData.ifupdateAddr) {
				this.province = curData.province
				this.city = curData.city
				this.area = curData.area
				this.street = curData.street
				this.lat = curData.lat
				this.lng = curData.lng
			}
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onReady: function() {
			this.animation = uni.createAnimation({
				transformOrigin: "50% 50%",
				duration: 0,
				timingFunction: "ease",
				delay: 0
			});
			this.animation.translateY(200 + 'vh').step();
			this.setData({
				animation: this.animation.export(),
				show: show
			});
		},
		methods: {
			initCityData: function(provinceId, cityId, areaId) {
				this.$request.get("/p/area/listByPid", {
					pid: 0
				}).then((res) => {
					this.setData({
						provArray: res
					});
					if (provinceId) {
						for (var index in res) {
							if (res[index].areaId == provinceId) {
								this.setData({
									value: [index, this.value[1], this.value[2]]
								});
							}
						}
					}
					this.getCityArray(provinceId ? provinceId : res[0].areaId, cityId, areaId);
					uni.hideLoading();
				}, (rej) => {
					console.log(rej)
				})
			},
			//滑动事件
			bindChange: function(e) {
				var ths = this;
				var val = e.detail.value; //判断滑动的是第几个column
				//若省份column做了滑动则定位到地级市和区县第一位

				if (index[0] != val[0]) {
					val[1] = 0;
					val[2] = 0; //更新数据

					ths.getCityArray(this.provArray[val[0]].areaId); //获取地级市数据
				} else {
					//若省份column未做滑动，地级市做了滑动则定位区县第一位
					if (index[1] != val[1]) {
						val[2] = 0; //更新数据

						ths.getAreaArray(this.cityArray[val[1]].areaId); //获取区县数据
					} else {}
				}

				index = val;
				this.setData({
					value: [val[0], val[1], val[2]]
				});
				ths.setData({
					province: ths.provArray[ths.value[0]].areaName,
					city: ths.cityArray[ths.value[1]].areaName,
					area: ths.areaArray[ths.value[2]].areaName,
					provinceId: ths.provArray[ths.value[0]].areaId,
					cityId: ths.cityArray[ths.value[1]].areaId,
					areaId: ths.areaArray[ths.value[2]].areaId
				});
			},
			//移动按钮点击事件
			translate: function(e) {
				if (t == 0) {
					moveY = 0;
					show = false;
					t = 1;
				} else {
					moveY = 200;
					show = true;
					t = 0;
				}

				this.setData({
					show: true
				}); // this.animation.translate(arr[0], arr[1]).step();

				this.animationEvents(this, moveY, show);
			},

			//隐藏弹窗浮层
			hiddenFloatView(e) {
				moveY = 200;
				show = true;
				t = 0;
				this.animationEvents(this, moveY, show);
			},

			//动画事件
			animationEvents: function(that, moveY, show) {
				that.animation = uni.createAnimation({
					transformOrigin: "50% 50%",
					duration: 400,
					timingFunction: "ease",
					delay: 0
				});
				that.animation.translateY(moveY + 'vh').step();
				that.setData({
					animation: that.animation.export()
				});
			},

			/**
			 * 根据省份ID获取 城市数据
			 */
			getCityArray: function(provinceId, cityId, areaId) {
				this.$request.get("/p/area/listByPid", {
					pid: provinceId
				}).then((res) => {
					this.setData({
						cityArray: res
					});
					if (cityId) {
						for (var index in res) {
							if (res[index].areaId == cityId) {
								this.setData({
									value: [this.value[0], index, this.value[2]]
								});
							}
						}
					}
					this.getAreaArray(cityId ? cityId : res[0].areaId, areaId);
					uni.hideLoading();
				}, (rej) => {
					console.log(rej)
				})
			},

			/**
			 * 根据城市ID获取 区数据
			 */
			getAreaArray: function(cityId, areaId) {
				this.$request.get("/p/area/listByPid", {
					pid: cityId
				}).then((res) => {
					this.areaArray = res
					if (areaId) {
						for (var _index in res) {
							if (res[_index].areaId == areaId) {
								this.setData({
									value: [this.value[0], this.value[1], _index]
								});
							}
						}
						index = this.value;
						this.setData({
							province: this.province,
							city: this.city,
							area: this.area,
							provinceId: this.provinceId,
							cityId: this.cityId,
							areaId: this.areaId
						});
					} else {
						this.setData({
							province: this.provArray[this.value[0]].areaName,
							city: this.cityArray[this.value[1]].areaName,
							area: this.areaArray[this.value[2]].areaName,
							provinceId: this.provArray[this.value[0]].areaId,
							cityId: this.cityArray[this.value[1]].areaId,
							areaId: this.areaArray[this.value[2]].areaId
						});
					}
				}, (rej) => {
					console.log(rej)
				})
			},
			bindRegionChange: function(e) {
				this.setData({
					region: e.detail.value
				});
			},

			/**
			 * 保存地址
			 */
			onSaveAddr: function() {
				var receiver = this.receiver;
				var mobile = this.mobile;
				var addr = this.addr;
				if (!receiver) {
					this.$showToast('请输入收货人姓名')
					return;
				}
				if (!mobile) {
					this.$showToast('请输入手机号码')
					return;
				}
				if (mobile.length != 11) {
					this.$showToast('请输入正确的手机号码')
					return;
				}
				if (!addr) {
					this.$showToast('请输入详细地址')
					return;
				}
				let url = "/p/address/addAddr";
				let updateData = {
					receiver: this.receiver,
					mobile: this.mobile,
					addr: this.addr,
					province: this.province,
					provinceId: this.provinceId,
					city: this.city,
					cityId: this.cityId,
					areaId: this.areaId,
					area: this.area,
					street: this.street,
					lat: this.lat,
					lng: this.lng,
					userType: 0,
					addrId: this.addrId
				}
				console.log(updateData)
				let res
				if (this.addrId != 0) {
					url = "/p/address/updateAddr";
					res = this.$request.put(url, updateData)
				} else {
					res = this.$request.post(url, updateData)
				}
				res.then((res) => {
					if (this.commonAddr) {
						this.onDefaultAddr(this.addrId || res.addrId);
					} else {
						uni.navigateBack({
							delta: 1
						});
					}
				}, rej => {
					console.log(rej)
				})
			},



			//设置为默认地址
			onDefaultAddr: function(addrId) {
				if (addrId) {
					this.$request.put("/p/address/defaultAddr/" + addrId, {
						addrId: addrId
					}).then((res) => {
						uni.navigateBack({
							delta: 1
						});
						uni.hideLoading();
					}, (rej) => {
						console.log(rej)
					})
				}
			},
			gomap: function() {
				uni.navigateTo({
					url: '/pages/map/map?entry=editAddress'
				});
			}
		}
	};
</script>
<style>
	/* pages/editAddress/editAddress.wxss */

	page {
		background: #fff;
	}

	/* input列表 */

	.input-box {
		margin-bottom: 50rpx;
		background: #fff;
		padding: 0 20rpx;
	}

	.input-box .section {
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 28rpx;
		font-weight: bold;
		padding: 26rpx 0;
		line-height: 48rpx;
		height: 100%;
		box-sizing: border-box;
		border-bottom: 2rpx solid #f5f5f5;
	}

	.placeholder {
		color: #D0CECC;
		font-weight: 500;
	}

	.input-box .section text {
		width: 20%;
		color: #666;
		font-weight: normal;
	}

	.input-box .section input {
		width: 70%;
		padding: 0 20rpx;
		color: #666;
		font-weight: normal;
	}

	.input-box .section picker {
		width: 70%;
		padding: 0 30rpx;
	}

	.input-box .section .pca {
		width: 70%;
		padding: 0 20rpx;
		color: #686867;
		font-weight: 500;
	}

	.input-box .section .arrow {
		width: 28rpx;
		height: 28rpx;
	}

	.input-box .section .arrow image {
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	/* end input列表 */

	/* 功能按钮 */

	.btn-box {
		width: 100%;
		position: absolute;
		bottom: 40rpx;
		left: 0;
	}

	.btn-box text {
		font-size: 32rpx;
	}

	.btn-box .clear.btn,
	.keep.btn {
		height: 88rpx;
		width: 90%;
		color: #ffffff;
		background-color: #FFC078;
		border-radius: 46rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 0 auto;

	}

	.btn-box .keep {
		color: #fff;
		background-color: #FFBF7A;
	}

	.btn-box .clear.btn {
		margin-top: 40rpx;
		color: #eb2444;
		background-color: #f8f0f1b6;
	}

	/* end 功能按钮 */

	.infoText {
		margin-top: 20rpx;
		text-align: center;
		width: 100%;
		justify-content: center;
	}

	picker-view {
		background-color: white;
		padding: 0;
		width: 100%;
		height: 380rpx;
		bottom: 0;
		position: fixed;
	}

	picker-view-column view {
		vertical-align: middle;
		font-size: 28rpx;
		line-height: 28rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.animation-element-wrapper {
		display: flex;
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999;
	}

	.animation-element {
		display: flex;
		position: fixed;
		width: 100%;
		height: 470rpx;
		bottom: 0;
		background-color: rgba(255, 255, 255, 1);
	}

	.animation-button {
		top: 20rpx;
		width: 290rpx;
		height: 100rpx;
		align-items: center;
	}

	picker-view text {
		color: #999;
		display: inline-flex;
		position: fixed;
		margin-top: 20rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 34rpx;
		font-family: Arial, Helvetica, sans-serif;
	}

	.left-bt {
		left: 30rpx;
	}

	.right-bt {
		right: 20rpx;
		top: 20rpx;
		position: absolute;
		width: 80rpx !important;
	}

	.line {
		display: block;
		position: fixed;
		height: 2rpx;
		width: 100%;
		margin-top: 89rpx;
		background-color: #eee;
	}

	.defaultChecked {
		font-size: 26rpx;
		margin-left: 18rpx;
	}

	/*checkbox 整体大小  */
	.defaultChecked checkbox {
		width: 250rpx;
		height: 40rpx;
		color: #666;
		vertical-align: middle;
	}

	/*checkbox 选项框大小  */
	.defaultChecked checkbox .wx-checkbox-input {
		width: 28rpx;
		border-radius: 50%;
		height: 28rpx;
	}

	/*checkbox选中后样式  */
	.defaultChecked checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #FDBF77;
		border: 1px solid #FDBF77;
	}

	/*checkbox选中后图标样式  */
	.defaultChecked checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		line-height: 28rpx;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
		background: transparent;
		/* transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1); */
	}
</style>
