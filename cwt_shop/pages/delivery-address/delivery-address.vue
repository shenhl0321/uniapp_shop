<template>
	<view>
		<!--pages/delivery-address/delivery-address.wxml-->
		<customNavi :naviData='naviData'>收货地址</customNavi>

		<view class="empty" v-if="addressList.length==0">
			<view class="img">
				<image mode="widthFix" src="http://images.51xeld.com/2020/07/7ef8db51957945ee8f93c64dce738b95.png">
				</image>
			</view>
			<view class="txt">暂无收货地址~</view>
		</view>

		<view v-else class="container">
			<view class="main">
				<radio-group class="addr-group">
					<block v-for="(item, index) in addressList" :key="index">
						<view class="addr-item">
							<view class="addr-info" @tap="selAddrToOrder" :data-item="item">
								<view class="receiver-name-phone">
									<view v-if="item.receiver" class="receiver-name">{{item.receiver}}</view>
									<view class="default"><text class="redblock" v-if="item.commonAddr==1">默认</text>
									</view>
								</view>
								<view class="address">
									<view class="receiver-phone">{{item.mobile}}</view>
									<view v-if="item.province" class="gray">
										{{item.province}}{{item.city}}{{item.area}}{{item.street}}{{item.addr}}</view>
								</view>
							</view>
							<view class="editbtn">
								<image src="/static/images/icon/edit.png" mode="aspectFit"
									@click="toEditAddress(item.addrId)"></image>
								<image src="/static/images/icon/delete.png" mode="aspectFit"
									@click="onDeleteAddr(item.addrId)"></image>
							</view>
						</view>
					</block>
				</radio-group>
			</view>

		</view>
		<view class="btnbox">
			<view class="submitbtn" @tap="onAddAddr">添加地址</view>
		</view>
	</view>
</template>

<script>
	import customNavi from "../../components/custom-navi/custom-navi";

	export default {
		data() {
			return {
				addressList: [],
				naviData: {
					ifGoBack: true
				},
				order: -1,
				userAddr: ""
			};
		},

		components: {
			customNavi
		},
		onLoad: function(option) {
			if (option.order) {
				this.setData({
					order: option.order
				});
			}
		},
		//加载地址列表
		onShow: function() {
			this.getAddrList();
		},
		methods: {
			//新增收货地址
			onAddAddr: function(e) {
				uni.navigateTo({
					url: '/pages/editAddress/editAddress'
				});
			},
			//设置为默认地址
			onDefaultAddr(addrId) {
				this.$request.put("/p/address/defaultAddr/" + addrId, {
					addrId: addrId
				}).then((res) =>{
				}, (rej) =>{ console.log(rej) })
			},
			
			getAddrList() {
				this.$request.get("/p/address/list",).then((res) =>{
					this.addressList = res
				}, (rej) =>{ console.log(rej) })
			},
			// 修改地址 
			toEditAddress: function(addrId) {
				console.log(addrId)
				uni.navigateTo({
					url: '/pages/editAddress/editAddress?addrId=' + addrId
				});
			},

			/**
			 * 选择地址 跳转回提交订单页
			 */
			selAddrToOrder: function(e) {
				if (this.order == 0) {
					var pages = getCurrentPages(); //当前页面
					var prevPage = pages[pages.length - 2]; //上一页面
					prevPage.setData({
						//直接给上移页面赋值
						userAddr: e.currentTarget.dataset.item,
						selAddress: 'yes'
					});
					uni.navigateBack({
						//返回
						delta: 1
					});
				}
			},
			//删除配送地址
			onDeleteAddr(addrId) {
				let self = this
				uni.showModal({
					title: '',
					content: '确定要删除此收货地址吗？',
					confirmColor: "#eb2444",
					success(res) {
						if (res.confirm) {
							self.$request.delete("/p/address/deleteAddr/" + addrId, ).then((res) => {
								if (res.status == 0) {
									self.$showToast('默认地址无法删除')
								} else if (res.status == 1) {
									self.getAddrList();
								}
							}, (rej) => {
								console.log(rej)
							})
						} else if (res.cancel) {}
					}

				});
			}
		}
	};
</script>
<style>
	/* pages/delivery-address/delivery-address.wxss */

	page {
		background-color: #fff;
		/* border-top: 2rpx solid #e9eaec; */
		padding-bottom: 150rpx;
	}

	.main {
		padding-bottom: 200rpx;
		background-color: #ffffff;
	}

	.empty {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 30rpx;
		color: #353235;
		width: 100%;
	}

	.empty .img {
		margin: 0 auto;
		width: 70%;
	}

	.empty image {
		max-width: 100%;
	}

	.addr-item {
		font-size: 30rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx 15rpx;
		background-color: #ffffff;
		border-bottom: 1px solid #F7F5F4;
	}

	.addr-item .addr-info>view {
		color: #353235;
		font-size: 28rpx;
	}

	.receiver-name-phone {
		width: 22%;
		box-sizing: border-box;
		padding-left: 13rpx;
	}

	.address {
		width: 78%;
	}

	.receiver-name {
		width: 100%;
		height: 52rpx;
		line-height: 52rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.receiver-phone {
		height: 52rpx;
		line-height: 52rpx;
		font-size: 30rpx;
	}

	.addr-item .addr-info .gray {
		width: 100%;
		/* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
		color: #939093;
		line-height: 40rpx;
	}


	.addr-item .addr-info .redblock {
		width: 60rpx;
		height: 40rpx;
		line-height: 38rpx;
		text-align: center;
		border: 1px solid #EF2929;
		color: #EF2929;
		font-size: 24rpx;
		border-radius: 3px;
		display: block;
		box-sizing: border-box;
	}

	.addr-item image {
		width: 36rpx;
		height: 36rpx;
		vertical-align: middle;
		margin-left: 13rpx;
	}

	.btnbox {
		position: fixed;
		bottom: 40rpx;
		width: 100%;
		height: 88rpx;
	}

	.submitbtn {
		height: 80rpx;
		width: 90%;
		color: #ffffff;
		background-color: #FFC078;
		border-radius: 46rpx;
		font-size: 32rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 0 auto;
	}

	.empty .txt {
		text-align: center;
		color: #a1adbd;
		padding-top: 35rpx;
	}

	.addr-info {
		width: 85%;
		display: flex;
		align-items: center;
	}
</style>
