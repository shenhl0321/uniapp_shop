<template>
	<view>
		<!--pages/news-detail/news-detail.wxml-->
		<customNavi :naviData='naviData'>最新公告</customNavi>

		<view class="container">
			<!-- <block wx:for='{{news}}' wx:key=''> -->
			<view class="news-detail">
				<view class="news-detail-title">{{news.title}}</view>
				<!-- <view class='news-detail-text'>{{news.content}}</view> -->
				<rich-text :nodes="news.content"></rich-text>
			</view>
			<!-- </block> -->
		</view>
	</view>
</template>

<script>
	// pages/news-detail/news-detail.js
	import customNavi from '@/components/custom-navi/custom-navi.vue'

	export default {
		data() {
			return {
				news: {
					title: '',
					content: '',
					id: null
				},
				naviData: {
					ifGoBack: true
				}
			};
		},

		components: {
			customNavi
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.$request.get('/shop/notice/info/' + options.id, ).then(res => {
				res.content = res.content.replace(/width=/gi, 'sss=');
				res.content = res.content.replace(/height=/gi, 'sss=');
				res.content = res.content.replace(/ \/\>/gi,
					' style="max-width:100% !important;display:block;" \/\>');
				this.news = res
			})
		},

		methods: {}
	};
</script>
<style>
	/* pages/news-detail/news-detail.wxss */

	.news-detail {
		padding: 20rpx;
	}

	.news-detail .news-detail-title {
		font-size: 32rpx;
		font-weight: bold;
		line-height: 50rpx;
		padding: 20rpx;
		color: #444;
		text-align: center;
	}

	.news-detail .news-detail-text {
		font-size: 28rpx;
		line-height: 46rpx;
		text-align: justify;
		text-justify: inter-ideograph;
		margin-top: 20rpx;
	}
</style>
