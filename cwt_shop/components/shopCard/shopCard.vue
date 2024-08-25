<template>
	<!--components/shopCard/shopCard.wxml-->
	<view class="content">
		<view class="shop box flex_column_center" hover-class="none">
			<!-- <view wx:if='{{true}}' class="shopClosed" bindtap='lognowtime'> -->
			<view v-if="nowTime<startTime||nowTime>endTime" class="shopClosed" @tap="lognowtime">
				打烊
				<!-- {{nowTime}}
        {{startTime}}
        {{endTime}} -->
			</view>
			<view class="logo" hover-class="none">
				<image class="image" src="http://images.51xeld.com/2020/07/6354812950d84ef3b021ded369596d66.png" mode="widthFix"></image>
			</view>
			<view class="title" hover-class="none">
				<view class="text">彩味塔</view>
				<view class="line"></view>
			</view>
			<view class="prods flex_row_spaceAround" hover-class="none">
				<block v-for="(item, index) in prodsList" :key="index">
					<view class="prod " hover-class="none">
						<image v-if="item.pic" class="img" :src="item.pic" mode="widthFix" lazy-load="false" @error="handleImageErr"
						 @click="handleImageTab(item)">
						</image>
					</view>
				</block>
			</view>
			<view class="shopFooter flex_row_spaceBetween" hover-class="none">
				<view class="leftFooter" hover-class="none">
					<view class="shopName separate" hover-class="none">
						{{shopName?shopName: "彩味塔"}}
					</view>
				</view>
				<view class="rightFooter" hover-class="none" @tap="handleShopTab" :data-shopId="shopId">
					进店购买
				</view>
			</view>
			<view class="shop-location">
				<view class="locationInfo">地址：{{address}}</view>
				<view class="distance">{{distance?`距离我：${distance}` : ''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// components/shopCard/shopCard.js
	export default {
		data() {
			return {
				prodsList: [],
				noShow: [],
				startTime: "",
				endTime: ""
			};
		},

		components: {},
		props: {
			shopId: {
				type: Number
			},
			shopName: {
				type: String
			},
			shopOwner: {
				type: String
			},
			distance: {
				type: String
			},
			address: {
				type: String
			},
			shopInfo: {
				type: Object
			},
			nowTime: {
				type: String
			}
		},
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		beforeMount: function() {
			this.getShopProdsInfo();
			var startTime = this.shopInfo.openTime.split('-')[0];
			var endTime = this.shopInfo.openTime.split('-')[1]; // console.log(this.data.nowTime)
			this.setData({
				startTime,
				endTime
			}); // this.getShopInfo()
		},

		methods: {
			//获取店铺商品列表
			async getShopProdsInfo(url = '/shop/shop/prodInfo/') {
				try{
					let res = await this.$request.get(url + this.shopId, 'GET',)
					this.prodsList = res.slice(0, 3)
				}catch(e){
					console.log(e)
				}
			},

			//处理进入店铺事件
			handleShopTab(e) {
				this.handleShopSelect()
				uni.navigateTo({
					url: "../category/category"
				});
			},
			
			handleImageTab(prod) {
				console.log(prod)
				this.$store.commit('shop/updateShopId', this.shopId)
				let prodId = prod.prodId
				let isGroupProd = prod.isGroupProd
				// //判断是否为团购产品
				if (isGroupProd == 1) {
					uni.navigateTo({
						url: '/pages/groupbuy/groupbuy?prodid=' + prodId
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/prod/prod?prodid=' + prodId
				});
			},
			
			handleShopSelect() {
				this.$store.dispatch('currentShop/getShopInfo', this.shopId)
				this.$store.commit('shop/updateShopId', this.shopId)
			}
		}
	};
</script>
<style lang="scss">
	/* components/shopCard/shopCard.wxss */

	/* 白底红字 */
	.redBackWhiteText {
		background-color: #FFFFFF;
		color: #EF2929;
		border: 1px solid #EF2929;
		border-radius: 2px;
		text-align: center;
		font-size: 22rpx;
		height: 32rpx;
		line-height: 32rpx;
	}

	/* 盒模型 */
	.box {
		border: 1px solid #D9D9D9;
		border-radius: 5px;
	}

	/* 纵向居中flex布局 */
	.flex_column_center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 纵向左对齐 */
	.flex_flexStart {
		display: flex;
		flex-direction: column;
	}

	/* 横向两端对齐布局 */
	.flex_row_spaceBetween {
		display: flex;
		justify-content: space-between;
		justify-items: center;
		align-items: center;
	}

	/* 横向居中对齐 */
	.flex_row_spaceAround {
		display: flex;
		justify-content: space-around;
		justify-items: center;
	}

	/* 店铺信息盒子 */
	.content {
		width: 100%;
		margin-bottom: 110rpx;
	}

	.shop {
		width: 92%;
		box-shadow: 0px 0px 9px #e4e4e4;
		position: relative;
		margin: 80rpx auto 70rpx;
		border: 0;
		padding: 0 25rpx;
		box-sizing: border-box;
	}

	.shop .logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		position: absolute;
		top: -70rpx;
		background-color: white;
	}

	.logo .image {
		width: 120rpx;
		border-radius: 50%;
		border: 2px solid #fafaf8;
	}

	.shop .shopClosed {
		line-height: 50rpx;
		position: absolute;
		right: 50rpx;
		top: 0;
		background-color: #E5E5E5;
		writing-mode: vertical-rl;
		padding: 26rpx 11rpx;
		border-radius: 0 0 60rpx 60rpx;
		color: #444;
	}

	.shop>.title {
		padding-top: 70rpx;
		font-size: 32rpx;
		margin-bottom: 16rpx;
		color: #666;
		font-weight: bold;
		position: relative;
		z-index: 10;
	}

	.shop>.title .text {
		position: relative;
		z-index: 10;
	}

	.shop>.title .line {
		position: absolute;
		top: 90%;
		width: 100%;
		height: 15rpx;
		display: block;
		background: #ffebd7;
		opacity: 0.56;
		z-index: 1;
	}

	.shop .prods {
		width: 100%;
		padding-top: 15rpx;
	}

	.prods .prod {
		height: 210rpx;
		width: 210rpx;
	}

	.prod .img {
		width: 206rpx;
		border-radius: 5px;
		/* box-shadow: 0px 0px 5px #ccc; */
	}

	.shop .shopFooter {
		width: 100%;
		border-bottom: 1px solid #F6F6F6;
		padding-bottom: 20rpx;
		margin-top: 18rpx;
	}

	.shopFooter .leftFooter {
		font-size: 28rpx;
		/* padding-left: 10px; */
		display: flex;
		flex-direction: column;
	}

	.leftFooter .discountMsgBox {
		display: flex;
		flex-wrap: wrap;
		font-size: 13px;
	}

	.leftFooter .shopName {
		color: #444;
	}

	.leftFooter .separate {
		margin: 5px 5px 0 0;
		padding: 0 6rpx;

	}

	.rightFooter {
		width: 170rpx;
		height: 58rpx;
		line-height: 56rpx;
		border: 1px solid #83B31F;
		color: #83B31F;
		font-size: 30rpx;
		border-radius: 37rpx;
		text-align: center;
		box-sizing: border-box;
	}

	.shop-location {
		width: 98%;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		.locationInfo{
			width: 60%;
		}
	}

	.shop-location .distance {
		text-align: right;
		width: 230rpx;
		padding-left: 60rpx;
	}
</style>
