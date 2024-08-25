<template>
	<view>
		<!-- 购物车弹窗 -->
		<view v-if="popupShow">
			<view class="popup-hide" v-if="popupShow" @tap.stop="hideBasket">
			</view>
			<view class="popup-box" :animation="basketAnimation">
				<view class="popup-tit">
					<view class="popup-tit-info">已选商品</view>
					<view class="clear-btn" @tap="onDelBasket">
						<image src="/static/images/icon/clear-his.png" mode="aspectFit"></image>
						<view>清空购物车</view>
					</view>
				</view>

				<view class="prod-list">
					<block v-for="(prod, index) in shopCartItems" :key="index">
						<view class="item">
							<view class="prodinfo">
								<view class="pic">
									<image :src="prod.pic"></image>
								</view>
								<view class="opt">
									<view class="prod-name">{{prod.prodName}}</view>
									<text
										:class="'prod-info-text ' + (prod.skuName?'':'empty-n')">{{prod.skuName == null?'': prod.skuName}}</text>
									<view class="price-count">
										<view v-if="!prod.activityPrice" class="price">
											<text class="symbol">￥</text>
											<text class="big-num">{{wxs.parsePrice(prod.price)[0]}}</text>
											<text class="small-num">.{{wxs.parsePrice(prod.price)[1]}}</text>
										</view>
										<view v-if="prod.activityPrice" class="price" style="font-size:13px;">
											<view style="text-decoration:line-through;margin-right:20rpx;color:#999;">
												原价：￥{{prod.price}}</view>
											<view style>活动价：￥{{prod.activityPrice}}</view>
										</view>
										<view class="m-numSelector">
											<view @tap="updateCount(prod, index, -1)" class="minus">
												<image src="/static/images/icon/decrease.png" mode="aspectFit"></image>
											</view>
											<input disabled type="number" :value="prod.prodCount"
												@blur="onBasketCountChange" :data-index="index"
												:data-oldCount="prod.prodCount"></input>
											<view @click="updateCount(prod, index, 1)" class="plus">
												<image src="/static/images/icon/increase.png" mode="aspectFit"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>

			</view>
		</view>

		<view class="baskettab" :animation="baskettabAnimation" v-show="totalCount">
			<view style="display:flex;width: 100%;" @tap="openBasketPop">
				<view class="baskettab-basketicon">
					<image mode="aspectFit" src="/static/images/icon/add.png"></image>
					<view class="prods-in-basket">{{totalCount}}</view>
				</view>
				<view class="amount">
					<view>
						<text style="font-size:30rpx">合计：￥</text>
						<text>{{wxs.parsePrice(priceInfo.finalMoney)[0]}}</text>
						<text>.{{wxs.parsePrice(priceInfo.finalMoney)[1]}}</text>
					</view>
					<view class="floorAmount">
						满 {{priceInfo.startPrice||0}} 元起送
					</view>
				</view>
			</view>
			<button @tap="toFirmOrder"
				:class="'topay ' + (priceInfo.startPrice>priceInfo.finalMoney?'btngray':'')">去结算</button>
		</view>

	</view>
</template>

<script>
	export default {
		name: "shop-cart-tabbar",
		data() {
			return {
				popupShow: false
			};
		},

		computed: {
			shopId() {
				return this.$store.state.shop.currentShop
			},
			priceInfo() {
				console.log(this.$store.getters['shop/priceInfo'])
				return this.$store.getters['shop/priceInfo']
			},
			totalCount() {
				return this.$store.getters['shop/shopCartTotalCount']
			},
			shopCartItems: {
				get() {
					return this.$store.getters['shop/shopCartItems']
				},
				set() {
					this.$store.commit('shop/clearShopCartItems')
				}
			},
			basketIds() {
				return this.$store.getters['shop/basketIds']
			}
		},

		methods: {
			hideBasket() {
				var basketAnimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				this.setData({
					basketAnimation: basketAnimation.translateY(1000).step().export()
				});
				setTimeout(() => {
					this.setData({
						popupShow: false
					});
				}, 300);
			},

			openBasketPop() {
				if (!this.popupShow) {
					if (this.tempCount !== 0) {
						// this.$store.dispatch('shop/refreshCartItems')
					}					
					let basketAnimation = uni.createAnimation({
						duration: 400,
						timingFunction: 'ease-in-out'
					});
					this.setData({
						popupShow: true,
						basketAnimation: basketAnimation.translateY(1000).step().export()
					});
					setTimeout(() => {
						this.setData({
							basketAnimation: basketAnimation.translateY(0).step().export()
						});
					});
				} else {
					this.hideBasket();
				}
			},

			/* 关闭底部购物篮tab */
			closeOrders: function() {
				var basketAnimation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out'
				});
				this.basketAnimation = basketAnimation.translateY(1000).step().export()
				setTimeout(() => {
					this.popupShow = false
				}, 300);
			},

			onDelBasket: function() {
				var self = this;
				var shopCartItems = this.shopCartItems;
				var basketIds = [];
				shopCartItems.forEach(item => {
					basketIds.push(item.basketId)
				})
				uni.showModal({
					title: '',
					content: '确认要删除所有的商品吗？',
					confirmColor: "#eb2444",
					success(res) {
						if (res.confirm) {
							self.$request.delete("/p/shopCart/deleteItem", basketIds).then((res) => {
								self.closeOrders();
								self.shopCartItems = []
							}, (rej) => {
								console.log(rej)
							})
						}
					}
				});
			},

			updateCount(prod, index, count) {
				let { prodId, skuId, activityTimesFlag, activityOrderFlag } = prod
				this.$request.post("/p/shopCart/changeItem", {
					count,
					prodId,
					skuId,
					activityTimesFlag,
					activityOrderFlag,
					shopId: this.shopId
				}).then((res) => {
					if (res.status == 0) {
						// this.$store.commit('shop/updateGoodsCount', {
						// 	index,
						// 	prodId,
						// 	updateNum: count
						// })
						this.$store.dispatch('shop/refreshCartItems')
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				}, (rej) => {
					console.log(rej)
				})
			},
			
			toFirmOrder() {
				if (this.finalMoney < this.startPrice) {
					return;
				}
				let basketIds = this.basketIds
				if (!basketIds.length) {
					uni.showToast({
						title: '请选择商品',
						icon: "none"
					});
					return;
				}
				uni.setStorageSync("basketIds", JSON.stringify(basketIds));
				uni.navigateTo({
					url: '/pages/submit-order/submit-order?orderEntry=0&tjr=' + this.tjr
				});
			},
		}
	}
</script>

<style lang="scss">
	.popup-hide {
		position: fixed;
		/* top: 0; */
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.popup-box {
		position: fixed;
		bottom: 100rpx;
		left: 0;
		width: 100%;
		height: 48%;
		background-color: #fff;
		padding-bottom: 150rpx;
		z-index: 100;
	}

	.popup-tit {
		color: #3D3D3D;
		height: 62rpx;
		line-height: 62rpx;
		font-size: 24rpx;
		padding-left: 26rpx;
		background-color: #F5F5F5;
		display: flex;
		justify-content: space-between;
	}

	.clear-btn {
		display: flex;
		color: #999;
		padding-right: 20rpx;
	}

	.clear-btn image {
		width: 30rpx;
		height: 30rpx;
		vertical-align: super;
		position: relative;
		top: 16rpx;
		margin-right: 5rpx;
	}

	.prod-list {
		width: 100%;
		overflow: scroll;
		height: 100%;
	}

	.prod-list .item {
		background: #fff;
		display: flex;
		align-items: center;
		padding: 28rpx 20rpx 20rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.prod-list .item .prodinfo {
		position: relative;
		color: #999;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.prod-list .item:last-child .prodinfo::after {
		height: 0;
	}

	.prod-list .item .staus {
		text-align: center;
		background: rgb(196, 192, 192);
		font-size: 20rpx;
		width: 50rpx;
		color: #fff;
	}

	.prodinfo {
		display: flex;
		margin-left: 20rpx;
	}

	.prod-list .item .opt {
		font-size: 28rpx;
		margin-left: 20rpx;
		width: 100%;

	}

	.prodinfo .opt .prod-name {
		color: #333;
		max-height: 72rpx;
		line-height: 36rpx;
		display: -webkit-box;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.prodinfo .opt .prod-info-text {
		color: #999;
		display: inline-block;
		-webkit-line-clamp: 1;
		height: 30rpx;
		line-height: 30rpx;
		background: #f9f9f9;
		padding: 0 10rpx 0 10rpx;
		border-radius: 4rpx;
		margin: 10rpx 0 0rpx 0;
		overflow: hidden;
		font-size: 24rpx;
		position: relative;
		font-family: arial;
	}

	.prodinfo .opt .prod-info-text.empty-n {
		padding: 0;
	}

	.prod-info-text:before {
		border-top: 5px solid #aaa;
	}

	.prod-info-text:after {
		border-top: 5px solid #f9f9f9;
		top: 9px;
	}

	.prod-list .item .prodinfo .pic {
		text-align: center;
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 0;
	}

	.prod-list .item .pic image {
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
		box-shadow: 0 0 6px #F8F8F8;
	}

	.prodinfo .opt .price-count {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.prodinfo .opt .price-count .price {
		color: #eb2444;
	}

	.lose-efficacy .prodinfo .opt .price-count .price {
		color: #999;
	}

	/* 加减框 */

	.m-numSelector .minus,
	.m-numSelector input,
	.m-numSelector .plus {
		float: left;
		box-sizing: border-box;
		height: 56rpx;
	}

	.m-numSelector {
		float: right;
	}

	.m-numSelector image {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		top: 9rpx;
		left: 9rpx;
	}

	.m-numSelector .minus,
	.m-numSelector .plus {
		position: relative;
		width: 56rpx;
	}

	.m-numSelector input {
		width: 56rpx;
		text-align: center;
		color: #333;
	}



	.baskettab {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		background-color: #000;
		display: flex;
		z-index: 299;
	}

	.baskettab .baskettab-basketicon {
		position: relative;
		bottom: 70rpx;
	}

	.baskettab .baskettab-basketicon image {
		width: 140rpx;
		height: 140rpx;
	}

	.prods-in-basket {
		height: 40rpx;
		width: 40rpx;
		background-color: #D81E06;
		position: absolute;
		top: 2rpx;
		right: 2rpx;
		color: #ffffff;
		border-radius: 50%;
		font-size: 24rpx;
		line-height: 40rpx;
		text-align: center;
	}

	.baskettab .amount {
		color: #ffffff;
		line-height: 44rpx;
		margin-left: 10rpx;
		margin-top: 18rpx;
	}

	.baskettab .amount .floorAmount {
		font-size: 22rpx;
	}

	.baskettab .topay {
		height: 100%;
		width: 250rpx;
		color: white;
		background-color: #D71E08;
		text-align: center;
		line-height: 120rpx;
		position: absolute;
		right: 0;
		border-radius: 0;
	}

	.baskettab .btngray {
		background-color: #999;
	}
</style>
