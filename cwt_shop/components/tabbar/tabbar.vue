<template>
	<view class="ynq-TabBar-Block">

		<view class="ynq-TabBar-Item" v-for="tab,index in TabBar" :key="index" @tap="tabbarItemClick(tab,index)">
			<view class="ynq-TabBar-Image">
				<image :src="TabActive == index ? tab.selectedIconPath : tab.iconPath" :class="index == 2 ? 'ynq-TabBar-Radius' : ''"></image>
			</view>
			<text :class="TabActive == index ? 'ynq-TabBarText-Active' : ''">{{tab.text}}</text>
		</view>
		
	</view>
</template>

<script>
	let TabBar_Cont = [
		{
				"pagePath": "/pages/home/home",
				"text": "首页",
				"iconPath": "/static/images/tabbar/homepage.png",
				"selectedIconPath": "/static/images/tabbar/homepage-sel.png"
			},
			{
				"pagePath": "/pages/category/category",
				"text": "菜单",
				"iconPath": "/static/images/tabbar/category.png",
				"selectedIconPath": "/static/images/tabbar/category-sel.png"
			},
			{
				"pagePath": "/pages/member/member-code",
				"iconPath": "/static/images/tabbar/99vipcode.png",
				"selectedIconPath": "/static/images/tabbar/99vipcode.png",
				"text": "发布",
			},
			{
				"pagePath": "/pages/99-vip/userVip",
				"text": "99VIP",
				"iconPath": "/static/images/tabbar/99vip.png",
				"selectedIconPath": "/static/images/tabbar/99vip-sel.png"
			},
			{
				"pagePath": "/pages/user-new/user-new",
				"text": "我的",
				"iconPath": "/static/images/tabbar/user.png",
				"selectedIconPath": "/static/images/tabbar/user-sel.png"
			}
		
		
	]
	export default {
		props:["index"],
		data() {
			return {
				TabBar:TabBar_Cont,
				TabBar_Len : TabBar_Cont.length,
				TabActive:0
			}
		},
		mounted() {  //隐藏原生tabbar
			this.TabActive = this.index  //加载键值
			uni.hideTabBar();
		},
		methods: {
			tabbarItemClick(tab,index){
				console.log(index)
				uni.switchTab({
					url: tab.pagePath
				});
			}
		}
		
	}
</script>

<style lang="scss">
	.ynq-TabBar-Block{
		height: 48px;
		position: fixed;
		bottom:0px;
		width: 100%;
		background: #fff;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		flex:1;
		z-index:9999;
		border-top:1px solid #f2f2f2;
		padding-top:10rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.ynq-TabBar-Item{
		width: 100%;
		text-align: center;
		.ynq-TabBar-Image{
			width:100%;
			height: 30px;
			position: relative;
			image{
				width: 30px;
				height: 30px;
			}
		}
		
		text{
			text-align: center;
			font-size:14px;
			color: #cdcdcd;
			display: block;
		}
		.ynq-TabBarText-Active{
			color: red !important;
		}
	}
	.ynq-TabBar-Radius{
		background: red;
		position: absolute;
		width: 30px !important;
		height: 30px !important;
		padding:8px;
		border-radius:100%;
		left:50%;
		top:50%;
		box-shadow: 0px 0px 8px rgba(97, 52, 175, .8);
		transform: translate(-50%,-80%);
	}
</style>
