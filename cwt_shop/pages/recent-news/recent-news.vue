<template>
<!--pages/recent-news/recent-news.wxml-->
<view class="container">
  <view class="recent-news">
  <block v-for="(item, index) in news" :key="index">
    <view class="news-item" @tap="toNewsDetail" :data-id="item.id">
      <view class="news-item-title">{{item.title}}</view>
      <view class="news-item-date">
        {{item.publishTime}}
      </view>
    </view>
   </block>
  </view>
</view>
</template>

<script>
// pages/recent-news/recent-news.js

export default {
  data() {
    return {
      news: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		this.$request.get('/p/notice/homeNotice', ).then((res) =>{
			this.news = res
		}, (rej) =>{ console.log(rej) })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    // 跳转公告详情页
    toNewsDetail: function (e) {
      console.log(e);
      var id = e.currentTarget.dataset.id; // console.log(id)
      uni.navigateTo({
        url: '/pages/news-detail/news-detail?id=' + e.currentTarget.dataset.id
      }); // console.log(id)
    }
  }
};
</script>
<style>
/* pages/recent-news/recent-news.wxss */

.recent-news {
  background: #fff;
}

.recent-news .news-item {
  padding: 20rpx 20rpx 0 20rpx;
  position: relative;
}

.recent-news .news-item::after {
  content: " ";
  width: 100%;
  height: 2rpx;
  background-color: #e1e1e1;
  left: 20rpx;
  display: block;
  position: absolute;
}

.recent-news .news-item .news-item-title {
  font-size: 28rpx;
  text-align: left;
}

.recent-news .news-item .news-item-date {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  margin-top: 10rpx;
  margin-bottom: 20rpx;
}

</style>