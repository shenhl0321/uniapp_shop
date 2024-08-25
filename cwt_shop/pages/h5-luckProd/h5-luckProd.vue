<template>
<!--pages/h5-luckProd/h5-luckProd.wxml-->
<!-- <view>cesi</view> -->
<view class="page-body">
  <view class="page-section page-section-gap">
    <web-view src="http://luckprod.xiaoerlangdang.com/"></web-view>
  </view>
</view>
</template>

<script>
import navigation from "../../components/navigation/navigation";
import shopCard from "../../components/shopCard/shopCard";

export default {
  data() {
    return {};
  },

  components: {
    navigation,
    shopCard
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {}
};
</script>
<style>
/* pages/h5-luckProd/h5-luckProd.wxss */
.page-section-gap{
  box-sizing: border-box;
  /* padding: 0 30rpx; */
}
</style>