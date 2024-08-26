<template>
	<view class="main-view">
		<image class="bg-image" mode="aspectFill" src="../../static/images/new/my_bg.png"></image>
		<view class="content-view">
			<text class="mine-title">我的</text>
			<view class="user-content">
				<image class="user-header-img" src="/static/images/new/my_header.png"></image>
				<view class="user-info">
					<text class="user-name">{{'Latte今天喝拿铁'}}</text>
					<text class="user-phone">{{'183****1923'}}</text>
				</view>
			</view>
			<view class="user-grade">
				<view class="top-row">
					<text>彩味塔值奖励</text>
					<view class="push-row">
						<text>全部奖励</text>
						<image class="push-image" src="../../static/images/new/my_push.png"></image>
					</view>
				</view>
				
				<view class="content-row">
					<image class="grade-image" src="../../static/images/new/my_zs.png"></image>
					<view class="grade-col">
						<text class="grade-title">{{'目前等级：L2'}}</text>
						<text class="grade-des">{{'再吃5次可以升级L3'}}</text>
					</view>
					<view class="go-grade">去成长</view>
				</view>
			</view>
			
			<view class="service-menu">
				<text style="margin-left: 20px;">更多服务</text>
				<view class="service-menu-list">
					<view class="menu-item" v-for="(item,index) in serviceMenu" :key="index">
						<image class="menu-icon" :src="item.imageName"></image>
						<text class="menu-text">{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				serviceMenu:[
					{id : 1, name : '我的订单', imageName:'/static/images/new/my_order.png'},
					{id : 2, name : '钱包', imageName:'/static/images/new/my_rechange.png'},
					{id : 3, name : '优惠券', imageName:'/static/images/new/my_discount.png'},
					{id : 4, name : '招商加盟', imageName:'/static/images/new/my_shop.png'},
					{id : 5, name : '账户余额', imageName:'/static/images/new/my_balance.png'},
					{id : 6, name : '发票管理', imageName:'/static/images/new/my_bill.png'},
					{id : 7, name : '兑换优惠', imageName:'/static/images/new/my_exchange.png'},
					{id : 8, name : '帮助反馈', imageName:'/static/images/new/my_help.png'},
				]
			}
		},
		onLoad() {
			console.log(this.$store.state.userInfo)
		},
		methods : {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.main-view{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		color: #000000;
		.bg-image{
			position: absolute;
			width:100vw;
			height: 100vh;
			left: 0;
			top: 0;
			z-index: 1;
		}
	}
	
	.content-view{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
		z-index: 999;
		.mine-title{
			margin-top: 54px;
			font-size: 16px;
		}
		.user-content{
			display: flex;
			flex-direction: row;
			width: 100%;
			box-sizing: border-box;
			margin: 30px 0;
			.user-header-img{
				width: 70px;
				height: 70px;
				border-radius: 35px;
			}
			.user-info{
				display: flex;
				flex-direction: column;
				margin-left: 14px;
				font-size: 18px;
				.user-name{
					margin-top: 10px;
				}
				.user-phone{
					margin-top: 10px;
				}
			}
		}
		
		.user-grade{
			display: flex;
			flex-direction: column;
			background-color: #FFE0BF;
			width: 100%;
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
			.top-row{
				display: flex;
				flex-direction: row;
				font-size: 18px;
				font-weight: bold;
				color: #755121;
				justify-content: space-between;
				align-items: center;
				margin: 15px 10px 0 15px;
				.push-row{
					display: flex;
					flex-direction: row;
					color: #9A8363;
					font-size: 12px;
					.push-image{
						width:20px;
						height: 20px;
					}
				}
			}
			
			.content-row{
				display: flex;
				flex-direction: row;
				margin: 15px 10px 0 15px;
				.grade-image{
					width: 36px;
					height: 36px;
				}
				.grade-col{
					display: flex;
					flex-direction: column;
					flex: 1;
					margin-left: 10px;
					margin-bottom: 15px;
					.grade-title{
						font-size: 16px;
						font-weight: bold;
						color: #755121;
					}
					.grade-des{
						font-size: 12px;
						color: #C29C5E;
					}
				}
				.go-grade{
					display: flex;
					width: 80px;
					height: 32px;
					border-radius: 16px;
					background-color: #FFD293;
					font-size: 16px;
					font-weight: bold;
					color: #755121;
					justify-content: center;
					align-items: center;
				}
			}
			
		}
		
		
		.service-menu{
			background-color: #FFF;
			width: 100vw;
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
			font-size: 18px;
			color: #333333;
			padding-top: 20px;
			box-sizing: border-box;
			.service-menu-list{
				display: grid;
				width: 100%;
				grid-template-columns: repeat(4,1fr);
				margin-top: 10px;
				.menu-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 16px;
					.menu-icon{
						width: 30px;
						height: 30px;
					}
					.menu-text{
						font-size: 14px;
					}
				}
			}
		}
	}
	
	
</style>