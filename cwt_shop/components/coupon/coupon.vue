<template>
<view :class="'coupon-item ' + (canUse?'':'gray')">
  <view class="left">
    <view class="num" v-if="item.couponType == 0">
      ￥
      <text class="coupon-price">{{item.fullAmountReduce}}</text>
    </view>
    <view class="condition" v-if="item.couponType == 1">
      满{{item.reduceMoney}}元可用
    </view>
    <view class="num" v-if="item.couponType == 1">
      ￥<text class="coupon-price">{{item.fullAmountReduce}}</text>
    </view>
    <view class="num" v-if="item.couponType == 2">
      <text class="coupon-price">{{item.couponDiscount}}</text>折
    </view>
  </view>
  <view class="right">
    <view class="c-des">
      <text class="c-type">{{item.suitableProdType==0?'通用':'商品'}}</text> {{item.suitableProdType==0?'全场通用':'指定商品可用'}}
    </view>
    <view class="c-date">
      <text v-if="showTimeType==1 && item.couponType==2" class="c-data-info">领券{{item.validDays}}天后失效</text>
      <text v-else class="c-data-info">{{item.startTime}}~{{item.endTime}}</text>
      <text class="c-btn" v-if="item.canReceive && !order" @tap="receiveCoupon">立即领取</text>
      <text class="c-btn get-btn" v-if="!item.canReceive && !order" @tap="useCoupon">立即使用</text>
    </view>
    <view v-if="order && canUse" class="sel-btn">
      <checkbox color="#eb2444" :data-coupon="item" :checked="item.choose" @tap="checkCoupon"></checkbox>
    </view>
  </view>
  <image class="tag-img" src="/static/images/icon/coupon-used.png" v-if="type==1"></image>
  <image class="tag-img" src="/static/images/icon/coupon-ot.png" v-if="type==2"></image>
</view>
</template>

<script>
export default {
  data() {
    return {
      stsType: 4
    };
  },

  components: {},
  props: {
    item: Object,
    type: Number,
    order: Boolean,
    canUse: Boolean,
    index: Number,
    showTimeType: Number
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  beforeMount: function () {//console.log(this.data.item);
  },
  methods: {
    receiveCoupon() {
      var couponId = this.item.couponId;
			this.$request.post("/p/myCoupon/receive", couponId).then((res) =>{
          var coupon = this.item;
          coupon.canReceive = false;
					this.item = coupon
			}, (rej) =>{ console.log(rej) })
    },

    checkCoupon(e) {
      // this.triggerEvent('checkCoupon', this.data.index);
      this.$emit('checkCoupon', {
        detail: {
          coupon: e.currentTarget.dataset.coupon
        }
      });
    },

    /**
     * 立即使用
     */
    useCoupon() {
      var url = '/pages/prod-classify/prod-classify?sts=' + this.stsType;
      var id = this.item.couponId;
      var title = "优惠券活动商品";

      if (id) {
        url += "&tagid=" + id + "&title=" + title;
      }

      uni.navigateTo({
        url: url
      });
    }

  }
};
</script>
<style>
.coupon-item{
    margin: 15px 0;
    position: relative;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    height: 95px;
    background: #fff;
}
.coupon-item .left{
      float: left;
    color: #fff;
    text-align: center;
    border-left: 1px dashed #fff;
    padding: 20px 0;
    background: -webkit-gradient(linear,left top,right top,from(#F45C43),to(#eb2444));
    background: -o-linear-gradient(left,#F45C43,#eb2444);
    background: linear-gradient(left,#F45C43,#eb2444);
    background: -webkit-linear-gradient(left,#F45C43,#eb2444);
    width: 260rpx;
    height: 55px;
}
.coupon-item .left .num{
  font-weight:600;
  font-size:36rpx;
  height:70rpx;
  line-height:70rpx;
  font-family:arial;
}
.coupon-item .left .num .coupon-price{
      font-size: 72rpx;
    line-height: 72rpx;
        display: inline-block;
    font-family: arial;
}
.coupon-item .left .condition{
    font-size: 28rpx;
    line-height: 28rpx;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 2px;
    font-family: arial;
}
.coupon-item .right{
  margin-left: 280rpx;
    padding: 5px;
    position: relative;
}
.coupon-item .right .c-des{
  height: 30px;
    font-size: 26rpx;
    line-height: 30px;
    overflow: hidden;
    font-weight: 600;
}
.coupon-item .right .c-des .c-type{
  font-size: 24rpx;
    background: #fdf0f0;
    color: #eb2444;
    border-radius: 8px;
    padding:3px 10px;
}
.coupon-item .right .c-date{
  font-size: 24rpx;
  margin-top:25px;
}
.coupon-item .right .c-date .c-data-info{
  font-family: arial;
}
.coupon-item .right .c-date .c-btn{
    position: absolute;
    bottom:0;
    right:10px;
    color: #fff;
    font-size: 24rpx;
    font-family: arial;
    border-radius: 14px;
    padding:3px 7px;
    /* background: -webkit-gradient(linear,left top,right top,from(#6c96da),to(#6b83d7));
    background: -o-linear-gradient(left,#6c96da,#6b83d7);
    background: linear-gradient(left,#6c96da,#6b83d7);
    background: -webkit-linear-gradient(left,#6c96da,#6b83d7); */
    background: #eb2444;
    border: 1px solid #eb2444;
}

.coupon-item .right .c-date .c-btn.get-btn{
  background: #fff;
  border: 1px solid #eb2444;
  color:#eb2444;
}

.coupon-item.gray .left{
  background: #bbb;
}

.coupon-item.gray .right .c-des .c-type{
  background: #bbb;
    color: #fff;
}

.coupon-item.gray .right .c-date .c-btn{
  display: none;
}

.coupon-item .tag-img{
  position: absolute;
  top:0;
  right:0;
  width:120rpx;
  height:120rpx;
}

.coupon-item .sel-btn{
  position:absolute;
  right:10px;
  top:35px;
}

</style>