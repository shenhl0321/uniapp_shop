<template>
<view class="prod-items" @tap="toProdPage" :data-prodid="item.prodId">
      <view class="hot-imagecont">
        <image :src="item.pic" class="hotsaleimg"></image>
      </view>
      <view class="hot-text">
        <view class="hotprod-text">{{item.prodName}}</view>
        <view class="prod-info" v-if="sts==6">{{item.prodCommNumber}}评价 {{item.positiveRating}}%好评</view>
        <view class="prod-text-info">
          <view class="price">
            <text v-if="sts==2" class="deadline-price">限时价</text>
            <text class="symbol">￥</text>
            <text class="big-num">{{wxs.parsePrice(item.price)[0]}}</text>
            <text class="small-num">.{{wxs.parsePrice(item.price)[1]}}</text>
          </view>
        </view>
      </view>
    </view>
</template>

<script src="../../wxs/number.js"></script>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    item: Object,
    sts: Number
  },
  methods: {
    toProdPage: function (e) {
      var prodid = e.currentTarget.dataset.prodid;
      uni.navigateTo({
        url: '/pages/prod/prod?prodid=' + prodid
      });
    }
  }
};
</script>
<style>

.prod-items {
  width: 375rpx;
  float: left;
  background: #fff;
  padding-bottom: 20rpx;
  box-sizing: border-box;
}

/* prod:nth-child(2n-1) .prod-items {
  padding: 20rpx 10rpx 10rpx 20rpx;
}

prod:nth-child(2n) .prod-items {
  padding: 20rpx 20rpx 10rpx 10rpx;
} */

.hot-imagecont .hotsaleimg {
 width:345rpx;
height:345rpx;

}

.hot-text .hotprod-text {
  height: 76rpx;
  font-size: 28rpx;
  display: -webkit-box;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #000;
}

.prod-items .hot-imagecont {
  border-radius: 8rpx;
  text-align: center;
  font-size: 0;
}

.prod-items .hot-text {
  margin-top: 20rpx;
}

.prod-items .hot-text .prod-info {
  font-size: 20rpx;
  color: #777;
  margin-top: 8rpx;
}

.prod-items .hot-text .prod-text-info {
  position: relative;
  height: 50rpx;
  line-height: 70rpx;
  font-family: Arial;
}

.prod-items .hot-text .prod-text-info .price {
  color: #eb2444;
}
.deadline-price{
  font-size: 22rpx;
  margin-right: 5rpx;
}
</style>