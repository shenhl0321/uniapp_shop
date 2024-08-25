<template>
<view>
<!--pages/show-license/show-license.wxml-->
<navigation :title="title" :naviStyle="style" style="width:100%;" ifShowGoBack="true"></navigation>
<view style="width:100%;">
<view class="title">营业执照：</view>
<image :src="resourcesUrl+bussinessLicense" mode="widthFix" style="width:94%;margin-left:3%;border-radius:10rpx;"></image>
<view class="title">食品药品生产许可证:</view>
<image :src="resourcesUrl+hygienicLicense" mode="widthFix" style="width:94%;margin-left:3%;border-radius:10rpx;"></image>
</view>
</view>
</template>

<script>
import navigation from "../../components/navigation/navigation";

export default {
  data() {
    return {
      bussinessLicense: "",
      hygienicLicense: "",
      style: {
        color: 'white',
        backgroundColor: '#FFAD4F'
      },
      title: '安全档案',
      resourcesUrl: 'https://images.51xeld.com/'
    };
  },

  components: {
    navigation
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      bussinessLicense: options.bussinessLicense,
      hygienicLicense: options.hygienicLicense
    });
  },

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
/* pages/show-license/show-license.wxss */
.title{
  color: #666;
  margin-top: 30rpx;
  margin-bottom: 20rpx;
  margin-left: 30rpx;
  font-size: 26rpx;
}
.title::before{
  content: " ";
  display: inline-block;
  width: 6rpx;
  height: 28rpx;
  border-right: 3px solid #FFAD4F;
  margin-right: 8rpx;
  vertical-align: middle;
}
</style>