<template>
	<!--pages/search-page/search-page.wxml-->
	<view class="container">

		<!-- 搜索框 -->
		<view class="search-bar">
			<view class="search-box">
				<input placeholder="输入关键字搜索" class="sear-input" confirm-type="search" @confirm="toSearchProdPage" @input="getSearchContent"
				 :value="prodName"></input>
				<image src="/static/images/icon/search.png" class="search-img"></image>
			</view>
			<text class="search-hint" @tap="goBackIndex">取消</text>
		</view>

		<view class="search-display">
			<!-- 热门搜索 -->
			<view class="hot-search">
				<view class="title-text">
					热门搜索
				</view>
				<view class="hot-search-tags">
					<block v-for="(item, index) in hotSearchList" :key="index">
						<text class="tags" @tap="onHistSearch" :data-name="item.content">{{item.title}}</text>
					</block>
				</view>

			</view>

			<!-- 搜索历史 -->
			<view class="history-search">
				<view class="title-text history-line">
					搜索历史
					<view class="clear-history">
						<image src="/static/images/icon/clear-his.png" @tap="clearSearch"></image>
					</view>
				</view>
				<block v-for="(item, index) in recentSearch" :key="index">
					<view class="his-search-tags">
						<text class="tags" @tap="onHistSearch" :data-name="item">{{item}}</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/search-page/search-page.js

	export default {
		data() {
			return {
				hotSearchList: [],
				prodName: "",
				recentSearch: []
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.$request.get("/search/hotSearchByShopId", {
					number: 10,
					shopId: 1,
					sort: 1
				}).then((res) =>{
				this.hotSearchList = res
			}, (rej) =>{ console.log(rej) })
			this.getRecentSearch();
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
			/**
			 * 获取历史搜索
			 */
			getRecentSearch: function() {
				let recentSearch = uni.getStorageSync('recentSearch');
				this.setData({
					recentSearch
				});
			},

			/**
			 * 搜索提交
			 */
			toSearchProdPage: function() {
				if (this.prodName.trim()) {
					// 记录最近搜索
					let recentSearch = uni.getStorageSync('recentSearch') || [];
					recentSearch = recentSearch.filter(item => item !== this.prodName);
					recentSearch.unshift(this.prodName);

					if (recentSearch.length > 10) {
						recentSearch.pop();
					}

					uni.setStorageSync('recentSearch', recentSearch); // 跳转到商品列表页

					uni.navigateTo({
						url: '/pages/search-prod-show/search-prod-show?prodName=' + this.prodName
					});
				}
			},

			/**
			 * 清空搜索历史
			 */
			clearSearch: function() {
				uni.removeStorageSync('recentSearch');
				this.getRecentSearch();
			},
			// 返回首页
			goBackIndex: function() {
				uni.navigateBack({ // url: '/pages/search-page/search-page',
				});
			},
			//输入商品名获取数据 || 绑定输入值
			getSearchContent: function(e) {
				this.setData({
					prodName: e.detail.value
				}); // this.data.prodName=e.detail.value
			},
			//点击搜素历史
			onHistSearch: function(e) {
				var name = e.currentTarget.dataset.name;
				this.setData({
					prodName: name
				});
				this.toSearchProdPage();
			}
		}
	};
</script>
<style>
	/* pages/search-page/search-page.wxss */

	/* 搜索栏 */

	.search-bar {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		color: #777;
		background: #fff;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.07);
		z-index: 3;
	}

	.search-bar .search-box {
		position: relative;
		height: 60rpx;
		background: #f7f7f7;
		z-index: 999;
		width: 80%;
		margin-left: 70rpx;
		border-radius: 50rpx;
		margin: 20rpx 0 20rpx 20rpx;
	}

	.sear-input {
		height: 60rpx;
		border-radius: 50rpx;
		border: 0;
		margin: 0 30rpx 0 64rpx;
		line-height: 48rpx;
		vertical-align: top;
		background: #f7f7f7;
		font-size: 28rpx;
	}

	.search-bar .search-hint {
		font-size: 28rpx;
		position: absolute;
		right: 30rpx;
		top: 31rpx;
		color: #eb2444;
	}

	.search-bar .search-box .search-img {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		left: 20rpx;
		top: 14rpx;
		display: block;
	}

	/* 热门搜索&搜索历史 */

	.search-display {
		background: #fff;
		padding: 20rpx;
		margin-top: 100rpx;
	}

	.search-display .title-text {
		padding: 30rpx 0;
		font-size: 30rpx;
		color: #666;
	}

	.hot-search .hot-search-tags {
		overflow: hidden;
		font-size: 26rpx;
		text-align: center;
		padding-bottom: 30rpx;
	}

	.hot-search .hot-search-tags .tags {
		display: block;
		max-width: 100%;
		overflow: hidden;
		float: left;
		border-radius: 50rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color: #f2f2f2;
		box-sizing: border-box;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		padding: 10rpx 30rpx;
	}

	/* 搜索历史 */

	.history-search .title-text.history-line {
		position: relative;
		border-top: 2rpx solid #e1e1e1;
	}

	.history-search .his-search-tags {
		overflow: hidden;
		font-size: 26rpx;
		text-align: center;
		display: inline-block;
	}

	.history-search .his-search-tags .tags {
		max-width: 300rpx;
		overflow: hidden;
		float: left;
		border-radius: 50rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color: #f2f2f2;
		box-sizing: border-box;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		padding: 10rpx 30rpx;
	}

	.clear-history image {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		right: 10rpx;
		top: 30rpx;
	}
</style>
