<template>
<!--pages/shops/shops.wxml-->

<view class="container">
  <view class="line-fix"></view>
  <view class="tit-background"></view>
  <view>
    <block v-for="(item, index) in shopList" :key="index">
      <view class="shopBox" @tap="handleShopTab" :data-shopId="item.shopId">
        <view>
            shopId: {{item.shopId}}
        </view>
        <view>
            shopOwner: {{item.shopOwner}}
        </view>
        <view>
            shopName: {{item.shopName}}
        </view>
      </view>
    </block>
  </view>
</view>
</template>

<script>
// pages/shops/shops.js
import prod from "../../components/production/production";

export default {
  data() {
    return {
      testValue: "testValue",
      shopInfo: [],
      shopList: [],
      pages: null,
      current: 1
    };
  },

  components: {
    prod
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.current < this.pages) {
      this.getShopList(this.current + 1);
    }
  },
  methods: {
    //处理点击店铺事件
    handleShopTab: function (e) {
      // console.log(e);
      let shopId = e.currentTarget.dataset.shopid;
      getApp().shopId = shopId; // console.log(getApp().shopId)

      uni.switchTab({
        url: "../index/index" //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面

      }); // console.log(shopId);
      // this.getShopInfo('/shop/shop/prodInfo/'+shopId)
    },
    //获取店铺列表
    getShopList: function (current = 1) {
      var self = this;
      uni.showLoading();
			this.$request.get('/shop/shop/page', {current: current}).then((res) =>{
				let list = [];	
				if (res.current == 1) {
				  list = res.records;
				} else {
				  list = self.shopList;
				  list = list.concat(res.records);
				}
				self.setData({
				  shopList: list,
				  pages: res.pages,
				  current: res.current
				});
				uni.hideLoading();
			}, (rej) =>{ console.log(rej) })
    }
  }
};
</script>
<style>
/* pages/shops/shops.wxss */

page {
    background: #fff;
  }
  
  .line-fix {
    width: 100%;
    height: 2rpx;
    background: #e1e1e1;
    position: fixed;
    top: 0;
  }
  
  .tit-background {
    width: 100%;
    height: 20rpx;
    background: #f4f4f4;
  }

  .shopBox{
      width: 100%;
      height: 300rpx;
      background-color: bisque;
      margin-bottom: 20rpx;
  }
</style>