<template>
	<view>
		<view class="navi" :style="customStyle">
			<view class="navi-top" :style="{height:statusBarHeight+'px'}">

			</view>
			<view class="navi-bottom">
				<view class="goback" @click="goback" v-if="ifGoBack">
					<image src="/static/images/icon/goback.png" mode="aspectFit"></image>				
				</view>
				<view class="goback" @click="goHome" v-if="ifGoHome">
					<image src="/static/images/icon/gohome.png" mode="aspectFit"></image>
				</view>
				<view class="goBack-goHome" v-if="ifShowBtns">
					<image src="../../static/images/icon/goback.png" mode="aspectFit" @click="goback"></image>
					<image src="../../static/images/icon/gohome.png" mode="aspectFit" @click="goHome"></image>
				</view>
				<slot name='title'>
					<view class="title">
						<slot>
							{{naviData.title}}
						</slot>
					</view>
				</slot>
			</view>
		</view>
		
		<view class="empty-content" :style="{height:(statusBarHeight+44)+'px'}">
		</view>

	</view>
</template>

<script>
	export default {
		name: 'custom-navi',
		props: {
			naviData: {
				type: Object,
				default: () =>{
					return {}
				}
			}
		},

		data() {
			return {
			}
		},
		
		computed:{
			statusBarHeight() {
				return this.$store.state.sysInfo.sysInfo.statusBarHeight
			},
			backgroundColor() {
				return this.naviData.backgroundColor||'#FFBF77'
			},
			showCustomBackground() {
				return this.naviData.showCustomBackground|| false
			},
			ifGoBack() {
				return this.naviData.ifGoBack|| false
			},
			ifGoHome() {
				return this.naviData.ifGoHome|| false
			},
			ifShowBtns() {
				return this.naviData.ifShowBtns || false
			},
			customStyle() {
				return this.formateCssObj(this.naviData.customStyle) || ''
			}
		},
		
		created() {
		},
		methods: {
			formateCssObj(cssObj) {
				if(cssObj) {
					let cssStr = ''
					for(let key in cssObj) {
						cssStr += key
						cssStr += ':'
						cssStr += cssObj[key]
						cssStr += ';'
					}
					console.log(cssStr)
					return cssStr					
				}
				return ''
			},
			goback() {
				uni.navigateBack()
			},
			goHome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navi {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		color: #fff;
		z-index: 1000;
		background-color: #FFBF77;

		.navi-top {
			width: 100%;
		}

		.navi-bottom {
			height: 44px;
			width: 100%;
			text-align: center;
			line-height: 44px;
			position: relative;

			.goback {
				position: absolute;
				left: 20rpx;
				// background-color: red;
				width: 90rpx;
				text-align: left;

				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
			
			.goBack-goHome{
				height: 46rpx;
				width: 120rpx;
				border: 1px solid #FFD6A7;
				border-radius: 30rpx;
				position: absolute;
				top: 8px;
				left: 14rpx;
				z-index: 1000;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image{
					height: 30rpx;
					vertical-align: middle;
				}
			}

			.title {
				font-size: 34rpx;
			}
		}
	}
	.empty-content{
		width: 100%;
	}
</style>
