<template>
	<view>
		<view class="page-head">
			<view class="statusbar" :style="statusBarHeight">
			</view>
			<view class="custom-navi">
				<view class="btn">
					<image src="../../static/images/icon/goback.png" mode="aspectFit" @click="goback"></image>
				</view>
				<view class="page-title">
					会员资料
				</view>
			</view>
		</view>

		<view class="member-info">
			<view class="info-item">
				<view class="info-item-title">头像</view>
				<view class="info-item-content">
					<image :src="user.pic" mode="aspectFit"></image>
				</view>
			</view>
			<view class="info-item">
				<view class="info-item-title">昵称</view>
				<view class="info-item-content">
					{{user.nickName}}
				</view>
			</view>
			<view class="info-item">
				<view class="info-item-title">性别</view>
				<view class="info-item-content">
					{{user.sex=='M'?'男':'女'}}
				</view>
			</view>
			<view class="info-item" style="margin-bottom: 20rpx;border: none;">
				<view class="info-item-title">生日</view>
				<view class="info-item-content">
					{{user.birthDate || '暂无'}}
				</view>
			</view>
			<view class="info-item">
				<view class="info-item-title">会员卡号</view>
				<view class="info-item-content">
					{{user.userMobile || '暂无'}}
				</view>
			</view>
			<view class="info-item">
				<view class="info-item-title">手机号码</view>
				<view class="info-item-content">
					{{user.userMobile || '暂无'}}
				</view>
			</view>
			<view class="info-item">
				<view class="info-item-title">会员等级</view>
				<view class="info-item-content">
					普通会员
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			};
		},
		computed: {
			statusBarHeight() {
				let res = uni.getSystemInfoSync()
				let statusBarHeight = res.statusBarHeight
				return `height: ${statusBarHeight}px`
			}
		},

		created() {
			this.loadData()
		},

		methods: {
			loadData() {
				this.$request.get('/api/member/getMemberData', ).then((res) => {
					this.user = res.user
				}, (rej) => {
					console.log(rej)
				})
				// console.log(res)
			},
			
			goback() {
				uni.navigateBack({
					
				})
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #FAFAFA;
	}

	.page-head {
		background-color: #FFBF77;
		width: 100%;

		.custom-navi {
			font-size: 36rpx;
			height: 44px;
			width: 100%;
			color: #FFFFFF;
			position: relative;
			text-align: center;
			line-height: 44px;

			image {
				height: 18px;
				width: 18px;
				position: absolute;
				padding: 8rpx;
				left: 30rpx;
				top: 5px;
				border-radius: 50%;
			}
		}
	}

	.main-menu {
		width: 100%;
		height: 80rpx;
		display: flex;
	}

	.member-info {
		width: 100%;

		image {
			height: 70rpx;
			width: 70rpx;
		}

		.info-item {
			background-color: #FFFFFF;
			height: 100rpx;
			border-bottom: 1px solid #F1F1F1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
			padding: 0 5%;

			&:first-child {
				.info-item-content {
					height: 70rpx;
					width: 70rpx;
					border-radius: 50%;
					overflow: hidden;
				}
			}

			&:last-child {
				border: none;
			}

			.info-item-title {
				font-size: 26rpx;
				color: #333333;
			}

			.info-item-content {
				color: #666666;
				font-size: 26rpx;
			}
		}
	}
</style>
