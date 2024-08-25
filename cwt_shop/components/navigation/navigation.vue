<template>
	<view>
		<view class="content" :style="'height:' + (44 + statusBarHeight) + 'px;background-color:' + naviStyle.backgroundColor + ';color:' + naviStyle.color + ';background-image:' + naviStyle.backgroundImage + ' ;'">
			<view v-if="goback" class="goback">
				<image src></image>
			</view>
			<view class="statusBar" :style="'height:' + statusBarHeight + 'px;'"></view>
			<view class="navigation" :style="'height:' + betweenHeight + 'px;line-height:' + betweenHeight + 'px;color:' + naviStyle.color + ';'">{{title}}</view>
		</view>
		<view v-if="ifShowBtn" class="navibtn" :style="'top:' + (statusBarHeight + 9) + 'px;'">
			<image class="goback navibtn-item" src="/static/images/icon/goback.png" mode="aspectFit" @tap="goback"></image>
			<image class="gohome navibtn-item" src="/static/images/icon/gohome.png" mode="aspectFit" @tap="gocategory"></image>
		</view>
		<view v-if="ifShowGoBack" class="onlyGoBack" :style="'top:' + (statusBarHeight + 9) + 'px;'" @tap="goback">
			<image class="goback image" src="/static/images/icon/goback.png" mode="aspectFit"></image>
		</view>
		<view v-if="ifShowGoHome" class="onlyGoBack onlygoHome" :style="'top:' + (statusBarHeight + 9) + 'px;'" @tap="gohome">
			<image class="goback image" src="/static/images/icon/gohome.png" mode="aspectFit"></image>
		</view>
		<view class="emptyBox" :style="'height:' + (44 + statusBarHeight) + 'px;'"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundColor: 'red',
				customBar: null,
				statusBarHeight: null,
				betweenHeight: null,
				btnHeight: null,
				searchValue: '',
				gobackbtnHeight: ""
			};
		},

		components: {},
		props: {
			title: {
				type: String,
				required: true
			},
			naviStyle: {
				type: Object
			},
			ifShowBtn: {
				type: Boolean
			},
			ifShowGoBack: {
				type: Boolean
			},
			ifGoHome: {
				type: Boolean
			},
			ifGoCate: {
				type: Boolean
			},
			ifShowGoHome: {
				type: Boolean
			}
		},
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		beforeMount: function() {
			let globals = getApp().globalData; // console.log(globals);

			this.setData({
				customBar: globals.customBar,
				statusBarHeight: globals.statusBarHeight,
				betweenHeight: globals.betweenHeight,
				gobackbtnHeight: globals.gobackBtnHeight
			});
		},
		moved: function() {},
		destroyed: function() {},
		methods: {
			getSysInfo: function() {
				let globals = getApp().globalData;
				console.log(globals);
			},
			//页面跳转
			goback: function() {
				// console.log('goback');
				if (this.ifGoHome) {
					uni.switchTab({
						url: '../home/home'
					});
				} else if (this.ifGoCate) {
					uni.navigateTo({
						url: '../category/category'
					});
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			gocategory: function() {
				// console.log('跳转首页');  
				uni.navigateTo({
					url: '../category/category'
				});
			},
			gohome: function() {
				// console.log('跳转首页');  
				uni.switchTab({
					url: '../home/home'
				});
			}
		}
	};
</script>
<style>
	.content {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.statusBar {
		width: 100%;
	}

	.navigation {
		width: 100%;
		text-align: center;
	}

	.navibtn {
		height: 46rpx;
		width: 120rpx;
		border: 1px solid #FFD6A7;
		border-radius: 30rpx;
		position: fixed;
		top: 108rpx;
		left: 14rpx;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.navibtn .navibtn-item {
		height: 30rpx;
		vertical-align: middle;
	}

	.navibtn .goback {
		content: 'tesst';
		border-right: 1px solid #FACB85;
	}


	.onlyGoBack {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		position: fixed;
		top: 108rpx;
		left: 14rpx;
		z-index: 9999;
		/* border: 1px solid #FFD6A7; */
	}

	.onlyGoBack .image {
		height: 35rpx;
		width: 100%;
		vertical-align: middle;
		text-align: center;
	}

	.onlygoHome {
		border: 1px solid #fff;
		border-radius: 50%;
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.onlygoHome .image {}
</style>
