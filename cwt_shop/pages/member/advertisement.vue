<template>
	<view>
		<!-- <image src="../../static/images/icon/goback.png" mode="aspectFit" class="goback" @click="goback"></image> -->
		<customNavi :naviData="naviData">海报</customNavi>
		<image src="https://images.51xeld.com/2021/06/478aff20168c4852ba56968748ea76fe.png" mode="widthFix" class="back-img"></image>
		<view class="btn" @click="goThePage('/pages/member/recharge')">
			去充值
		</view>
	</view>
</template>

<script>
	import customNavi from '@/components/custom-navi/custom-navi.vue'
	export default {
		components:{
			customNavi,
		},
		data() {
			return {
				naviData: {
					ifGoBack: true
				},
			};
		},
		methods: {
			// goback() {
			// 	uni.navigateBack({
					
			// 	})
			// },
			goThePage(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.back-img{
		width: 100%;
	}
	.btn{
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		height: 80rpx;
		width: 320rpx;
		text-align: center;
		line-height: 80rpx;
		color: #FFAD4E;
		background-color: #FFFFFF;
		border: #FFAD4E;
		border-radius: 50rpx;
	}
</style>
