<template>
	<view>
		<customNavi :naviData='naviData'>选择地址</customNavi>
		<view style="height: 100%;">
			<view v-if="addListShow">
				<view class="top" style>
					<view v-if="!addListShow" class="back iconfont icon-fanhui" @tap="back1"></view>
					<view v-else :class="'search-box ' + (addListShow?'search-box1':'')">
						<view class="region" @tap="chooseCityFun">{{currentRegion.district}}</view>
						<view class="shu"></view>
						<input @input="getsuggest" placeholder="请输入您的或您附近的地址"></input>
					</view>
				</view>
				<!--关键词输入提示列表渲染-->
				<view class="add-list-box">
					<scroll-view class="add-list" scroll-y="true">
						<view v-for="(item, index) in suggestion" :key="index" class="add-item">
							<!--绑定回填事件-->
							<view @tap="backfill" :id="index" :data-name="item.title">
								<!--根据需求渲染相应数据-->
								<!--渲染地址title-->
								<view class="title">{{item.title}}</view>
								<!--渲染详细地址-->
								<view class="add">{{item.addr}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<view v-if="!addListShow && !chooseCity" style="height: 300px;position: relative;">
				<!--地图容器-->
				<map id="myMap" style="width:100%;height:300px;" :longitude="longitude" :latitude="latitude" scale="17"
					:enable-zoom='true' @regionchange="mapChange">

					<!-- #ifndef MP-TOUTIAO -->
					<cover-view class="top">
						<cover-view class="search-box">
							<cover-view class="region" @tap="chooseCityFun">{{currentRegion.district}}</cover-view>
							<cover-view class="shu"></cover-view>
							<cover-view class="placeholder" @tap="showAddList">请输入您的或您附近的地址</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="map-prompt">您可拖动地图, 标记当前您或您附近的位置</cover-view>
					<cover-image class="current-site-icon" src="/static/images/icon/position.png"></cover-image>
					<cover-view class="reload" @tap="reload">
						<cover-view class="center1">
							<cover-view class="center2"></cover-view>
						</cover-view>
					</cover-view>
					<!-- #endif -->
					
				</map>
				<!-- #ifdef MP-TOUTIAO -->
				<view class="top" style="position: absolute;top: 0;">
					<view class="search-box">
						<view class="region" @tap="chooseCityFun">{{currentRegion.district}}</view>
						<view class="shu"></view>
						<view class="placeholder" @tap="showAddList">请输入您的或您附近的地址</view>
					</view>
				</view>
				<view class="map-prompt">您可拖动地图, 标记当前您或您附近的位置</view>
				<image class="current-site-icon" src="/static/images/icon/position.png"></image>
				<view class="reload" @tap="reload">
					<view class="center1">
						<view class="center2"></view>
					</view>
				</view>
				<!-- #endif -->

				<view style="height:100%;overflow:scroll;">
					<view class="near-list" scroll-y="true">
						<!--绑定回填事件-->
						<view v-for="(item, index) in nearList" :key="index" class="near-item">
							<view class="current-site" v-if="index == selectedIndex">
								<image src="/static/images/icon/delive-dot.png" mode="aspectFit"></image>
							</view>
							<!--根据需求渲染相应数据-->
							<view @tap="chooseCenter(item, index)">
								<!--渲染地址title-->
								<view :class="'title ' + ( index == selectedIndex?'title1':'' )">{{item.title}}</view>
								<!--渲染详细地址-->
								<view :class="'add ' + ( index == selectedIndex?'add1':'' )">{{item.addr}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-box">
					<button @tap="selectedOk">确认地址</button>
				</view>
			</view>

			<view class="region-box" v-if="chooseCity">
				<view class="region-top">
					<view class="region-back iconfont icon-fanhui" @tap="back2"></view>
					<view class="title">选择城市</view>
				</view>
				<view class="region-tabs">
					<text class="tab" @tap="showProvince">{{currentProvince}}</text>
					<text class="tab" @tap="showCity" v-if="!regionShow.province">{{currentCity}}</text>
					<text class="tab" @tap="showDistrict" v-if="regionShow.district">{{currentDistrict}}</text>
				</view>
				<scroll-view scroll-y="true" style="height:1050rpx;">
					<view class="region-list" v-if="regionShow.province">
						<view v-for="(item, index) in regionData.province" :key="index" class="region-item">
							<view :data-id="item.id" :data-name="item.fullname" @tap="selectProvince">
								<text>{{item.fullname}}</text>
							</view>
						</view>
					</view>
					<view class="region-list" v-if="regionShow.city">
						<view v-for="(item, index) in regionData.city" :key="index" class="region-item">
							<view :data-id="item.id" :data-name="item.fullname" @tap="selectCity">
								<text>{{item.fullname}}</text>
							</view>
						</view>
					</view>
					<view class="region-list" v-if="regionShow.district">
						<view v-for="(item, index) in regionData.district" :key="index" class="region-item">
							<view :data-id="item.id" :data-name="item.fullname" :data-latitude="item.location.lat"
								:data-longitude="item.location.lng" @tap="selectDistrict">
								<text>{{item.fullname}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require("../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js");
	// #ifdef H5
	var mapContext;
	// #endif
	// #ifdef MP-WEIXIN
	// #endif
	var qqmapsdk
	const mapKey = '2JGBZ-VMBLQ-DWN54-GURL6-N5AJZ-XBFYQ'
	import customNavi from "@/components/custom-navi/custom-navi";

	export default {
		data() {
			return {
				naviData: {
					ifGoBack: true
				},
				addListShow: false,
				chooseCity: false,
				regionShow: {
					province: false,
					city: false,
					district: true
				},
				regionData: {},
				currentRegion: {
					province: '选择城市',
					city: '选择城市',
					district: '选择城市'
				},
				currentProvince: '选择城市',
				currentCity: '选择城市',
				currentDistrict: '选择城市',
				latitude: '',
				longitude: '',
				centerData: {},
				nearList: [],
				suggestion: [],
				selectedIndex: 0,
				defaultKeyword: '房产小区',
				keyword: '',
				entry: "",
				markers: "",
				province: "",
				city: "",
				area: "",
				street: ""
			};
		},

		components: {
			customNavi
		},
		props: {},
		onLoad(options) {
			let self = this;
			self.mapCtx = uni.createMapContext('myMap');
			if (!this.entry) {
				this.entry = options.entry
			}
			qqmapsdk = new QQMapWX({
				key: 'W57BZ-JDB6X-XPA4H-Z76MI-73FF2-24BT4'
			});
			this.reload()
		},

		methods: {
			//监听拖动地图，拖动结束根据中心点更新页面
			mapChange(e) {
				let self = this;
				console.log(e)
				//H5 与 微信小程序触发事件不同，遂做不同处理
				// #ifndef MP-WEIXIN
				if (e.type == 'end') {
				// #endif
				// #ifdef MP-WEIXIN
				if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
				// #endif
					self.mapCtx.getCenterLocation({
						success(res) {
							self.setData({
								nearList: [],
								latitude: res.latitude,
								longitude: res.longitude,
								selectedIndex: 0
							});
							self.resolve(res.latitude, res.longitude); // self.nearby_search();
						},
						fail: (e) => {
							console.log(e)
						}
					});
				}
			},

			//地址解析
			async resolve(lat, lng) {
				var self = this;
				lat = lat || this.latitude;
				lng = lng || this.longitude;
				let res = await new Promise((resolve, reject) => {
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: lat,
							longitude: lng
						},
						get_poi: 1,
						poi_options: 'policy=2;radius=3000;page_size=20;page_index=1',
						success: function(res) {
							resolve(res)
						}
					});
				})
				// #ifdef MP-WEIXIN
				// #endif
				// #ifdef H5
				// let res = await new Promise((resolve, reject) => {
				// 	uni.request({
				// 		url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${mapKey}&get_poi=1`,
				// 		method: 'GET',
				// 		success: res => {
				// 			resolve(res)
				// 		},
				// 	});
				// })
				// res = res.data
				// #endif
				console.log(res);
				let result = res.result.pois;
				let nearList = result.map(item => {
					return {
						title: item.title,
						id: item.id,
						addr: item.address,
						province: item.ad_info.province,
						city: item.ad_info.city,
						district: item.ad_info.district,
						latitude: item.location.lat,
						longitude: item.location.lng
					};
				});
				self.setData({
					currentRegion: res.result.address_component,
					keyword: self.defaultKeyword,
					nearList,
					centerData: nearList[0]
				});
			},

			//重新定位
			reload() {
				let self = this;
				uni.getLocation({
					type: 'gcj02',
					altitude: true,
					isHighAccuracy: true,
					success(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						self.setData({
							latitude: latitude,
							longitude: longitude
						});
						console.log(latitude, longitude)
						self.resolve(latitude, longitude);
					},
					fail(err) {
						uni.hideLoading({});
						uni.showToast({
							title: '定位失败',
							icon: 'none',
							duration: 1500
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);
					}
				});
			},
			//整理目前选择省市区的省市区列表
			getRegionData: function() {
				let self = this; //调用获取城市列表接口

				qqmapsdk.getCityList({
					success: function(res) {
						//成功后的回调
						//console.log(res)
						let provinceArr = res.result[0];
						let cityArr = [];
						let districtArr = [];

						for (var i = 0; i < provinceArr.length; i++) {
							var name = provinceArr[i].fullname;

							if (self.currentRegion.province == name) {
								if (name == '北京市' || name == '天津市' || name == '上海市' || name == '重庆市') {
									cityArr.push(provinceArr[i]);
								} else {
									qqmapsdk.getDistrictByCityId({
										// 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
										id: provinceArr[i].id,
										success: function(res) {
											//成功后的回调
											//console.log(res);
											cityArr = res.result[0];
											self.setData({
												regionData: {
													province: provinceArr,
													city: cityArr,
													district: districtArr
												}
											});
										},
										fail: function(error) { //console.error(error);
										},
										complete: function(res) { //console.log(res);
										}
									});
								}
							}
						}

						for (var i = 0; i < res.result[1].length; i++) {
							var name = res.result[1][i].fullname;

							if (self.currentRegion.city == name) {
								qqmapsdk.getDistrictByCityId({
									// 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
									id: res.result[1][i].id,
									success: function(res) {
										//成功后的回调
										//console.log(res);
										districtArr = res.result[0];
										self.setData({
											regionData: {
												province: provinceArr,
												city: cityArr,
												district: districtArr
											}
										});
									},
									fail: function(error) { //console.error(error);
									},
									complete: function(res) { //console.log(res);
									}
								});
							}
						}
					},
					fail: function(error) { //console.error(error);
					},
					complete: function(res) { //console.log(res);
					}
				});
			},
			//地图标记点
			addMarker(data) {
				//console.log(data.title)
				var mks = [];
				mks.push({
					// 获取返回结果，放到mks数组中
					title: data.title,
					id: data.id,
					addr: data.addr,
					province: data.province,
					city: data.city,
					district: data.district,
					latitude: data.latitude,
					longitude: data.longitude,
					iconPath: "/static/images/my_marker.png",
					//图标路径
					width: 25,
					height: 25
				});
				this.setData({
					//设置markers属性，将搜索结果显示在地图中
					markers: mks // currentRegion: {
					//   province: data.province,
					//   city: data.city,
					//   district: data.district,
					// }

				});
				uni.hideLoading({});
			},
			//点击选择搜索结果
			backfill: function(e) {
				var id = e.currentTarget.id;
				let name = e.currentTarget.dataset.name;
				for (var i = 0; i < this.suggestion.length; i++) {
					if (i == id) {
						//console.log(this.data.suggestion[i])
						this.setData({
							centerData: this.suggestion[i],
							addListShow: false,
							latitude: this.suggestion[i].latitude,
							longitude: this.suggestion[i].longitude
						});
						this.resolve();
						return; //console.log(this.data.centerData)
					}
				}
			},
			//点击选择地图下方列表某项
			chooseCenter(item, index) {
				console.log(item, index)
				this.centerData = item
				this.selectedIndex = index
				this.latitude = item.latitude
				this.longitude = item.longitude
				// this.addMarker(item)
			},
			//显示搜索列表
			showAddList: function() {
				this.setData({
					addListShow: true,
					suggestion: this.nearList
				});
			},
			// 根据关键词搜索附近位置
			nearby_search: function() {
				var self = this;
				uni.hideLoading();
				uni.showLoading({
					title: '加载中'
				}); // 调用接口

				qqmapsdk.search({
					keyword: self.keyword,
					//搜索关键词
					// boundary: 'nearby(' + self.data.latitude + ', ' + self.data.longitude + ', 1000, 16)',
					location: self.latitude + ',' + self.longitude,
					// filter: 'category=工业园',
					page_size: 20,
					page_index: 1,
					success: function(res) {
						//搜索成功后的回调
						//console.log(res.data)
						var sug = self.nearList;
						console.log(sug);

						for (var i = 0; i < res.data.length; i++) {
							sug.push({
								// 获取返回结果，放到sug数组中
								title: res.data[i].title,
								id: res.data[i].id,
								addr: res.data[i].address,
								province: res.data[i].ad_info.province,
								city: res.data[i].ad_info.city,
								district: res.data[i].ad_info.district,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng
							});
						}

						self.setData({
							selectedIndex: 0,
							centerData: sug[0],
							nearList: sug,
							suggestion: sug
						});
						// self.addMarker(sug[0]);
					},
					fail: function(res) { //console.log(res);
					},
					complete: function(res) { //console.log(res);
					}
				});
			},
			//根据关键词搜索匹配位置
			getsuggest: function(e) {
				var _this = this;

				var keyword = e.detail.value;

				_this.setData({
					addListShow: true
				}); //调用关键词提示接口


				qqmapsdk.getSuggestion({
					//获取输入框值并设置keyword参数
					keyword: keyword,
					//用户输入的关键词，可设置固定值,如keyword:'KFC'
					location: _this.latitude + ',' + _this.longitude,
					region: this.currentRegion.city,
					page_size: 20,
					page_index: 1,
					//region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
					success: function(res) {
						//搜索成功后的回调
						//console.log(res);
						var sug = [];

						for (var i = 0; i < res.data.length; i++) {
							sug.push({
								// 获取返回结果，放到sug数组中
								title: res.data[i].title,
								id: res.data[i].id,
								addr: res.data[i].address,
								province: res.data[i].province,
								city: res.data[i].city,
								district: res.data[i].district,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng
							});
						}

						_this.setData({
							//设置suggestion属性，将关键词搜索结果以列表形式展示
							suggestion: sug,
							nearList: sug,
							keyword: keyword
						});
					},
					fail: function(error) { //console.error(error);
					},
					complete: function(res) { //console.log(res);
					}
				});
			},
			//打开选择省市区页面
			chooseCityFun: function() {
				let self = this;
				self.getRegionData();
				self.setData({
					chooseCity: true,
					regionShow: {
						province: false,
						city: false,
						district: true
					},
					currentProvince: self.currentRegion.province,
					currentCity: self.currentRegion.city,
					currentDistrict: self.currentRegion.district
				});
			},
			//选择省
			showProvince: function() {
				this.setData({
					regionShow: {
						province: true,
						city: false,
						district: false
					}
				});
			},
			//选择城市
			showCity: function() {
				this.setData({
					regionShow: {
						province: false,
						city: true,
						district: false
					}
				});
			},
			//选择地区
			showDistrict: function() {
				this.setData({
					regionShow: {
						province: false,
						city: false,
						district: true
					}
				});
			},
			//选择省之后操作
			selectProvince: function(e) {
				//console.log(e)
				let self = this;
				let id = e.currentTarget.dataset.id;
				let name = e.currentTarget.dataset.name;
				self.setData({
					currentProvince: name,
					currentCity: '请选择城市'
				});

				if (name == '北京市' || name == '天津市' || name == '上海市' || name == '重庆市') {
					var provinceArr = self.regionData.province;
					var cityArr = [];

					for (var i = 0; i < provinceArr.length; i++) {
						if (provinceArr[i].fullname == name) {
							cityArr.push(provinceArr[i]);
							self.setData({
								regionData: {
									province: self.regionData.province,
									city: cityArr,
									district: self.regionData.district
								}
							});
							self.showCity();
							return;
						}
					}
				} else {
					let bj = self.regionShow;
					self.getById(id, name, bj);
				}
			},
			//选择城市之后操作
			selectCity: function(e) {
				let self = this;
				let id = e.currentTarget.dataset.id;
				let name = e.currentTarget.dataset.name;
				self.setData({
					currentCity: name,
					currentDistrict: '请选择城市'
				});
				let bj = self.regionShow;
				self.getById(id, name, bj);
			},
			//选择区县之后操作
			selectDistrict: function(e) {
				let self = this;
				let id = e.currentTarget.dataset.id;
				let name = e.currentTarget.dataset.name;
				let latitude = e.currentTarget.dataset.latitude;
				let longitude = e.currentTarget.dataset.longitude;
				self.setData({
					currentDistrict: name,
					latitude: latitude,
					longitude: longitude,
					currentRegion: {
						province: self.currentProvince,
						city: self.currentCity,
						district: name
					},
					chooseCity: false,
					keyword: self.defaultKeyword
				});
				self.nearby_search();
			},
			//根据选择省市加载市区列表
			getById: function(id, name, bj) {
				let self = this;
				qqmapsdk.getDistrictByCityId({
					// 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
					id: id,
					//对应接口getCityList返回数据的Id，如：北京是'110000'
					success: function(res) {
						//成功后的回调
						//console.log(res);
						if (bj.province) {
							self.setData({
								regionData: {
									province: self.regionData.province,
									city: res.result[0],
									district: self.regionData.district
								}
							});
							self.showCity();
						} else if (bj.city) {
							self.setData({
								regionData: {
									province: self.regionData.province,
									city: self.regionData.city,
									district: res.result[0]
								}
							});
							self.showDistrict();
						} else {
							self.setData({
								chooseCity: false
							});
						}
					},
					fail: function(error) { //console.error(error);
					},
					complete: function(res) { //console.log(res);
					}
				});
			},
			//返回上一页或关闭搜索页面
			back1: function() {
				if (this.addListShow) {
					this.setData({
						addListShow: false
					});
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			//关闭选择省市区页面
			back2: function() {
				this.setData({
					chooseCity: false
				});
			},
			//确认选择地址
			selectedOk: function() {
				let pages = getCurrentPages();
				console.log(pages); //获取当前页面js里面的pages里的所有信息。

				let prevPage = pages[pages.length - 2];

				if (this.entry == 'home') {
					this.$store.commit('address/updateAddress', this.centerData)
				} else {
					console.log(prevPage);
					prevPage.setData({
						province: this.centerData.province,
						city: this.centerData.city,
						area: this.centerData.district,
						street: this.centerData.title,
						lat: this.centerData.latitude,
						lng: this.centerData.longitude,
						ifupdateAddr: true,
					});
				}
				uni.navigateBack({
					delta: 1
				});
			}
		}
	};
</script>
<style>
	/* pages/shopMap/shopMap.wxss */
	/* @import "../../lib/css/iconfont.css"; */


	.top {
		width: 100%;
		height: 84rpx;
		line-height: 84rpx;
		position: fixed;
		padding-top: 20rpx;
		z-index: 999;
		overflow: hidden;
	}

	.back {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #666;
		text-align: center;
		background: rgb(255, 255, 255);
		font-size: 50rpx;
		border-radius: 50%;
		float: left;
	}

	.back cover-image {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
		margin-top: 15rpx;
	}

	.search-box {
		margin: 0 auto;
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		background: rgb(255, 255, 255);
		/* margin-left: 20rpx; */
		float: left;
		overflow: hidden;
		margin-left: 5%;
		box-shadow: 0rpx 0rpx 4rpx #a1a1a1;
	}

	.search-box1 {
		border-radius: 10rpx;
		background: #eee;
	}

	.search-box .region {
		width: 199rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #282828;
		text-align: center;
		float: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search-box .shu {
		width: 1rpx;
		height: 80rpx;
		background: #ccc;
		float: left;
	}

	.search-box input {
		width: 380rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #282828;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		float: left;
	}

	.search-box .placeholder {
		width: 380rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #ccc;
		padding: 0 20rpx;
		box-sizing: border-box;
		float: left;
	}

	.add-list-box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 998;
		padding-top: 250rpx;
		background: #fff;
		box-sizing: border-box;
		overflow: hidden;
	}

	.add-list {
		width: 100%;
		height: 1000rpx;
	}

	.add-item {
		line-height: 40rpx;
		padding: 30rpx 50rpx;
		text-align: left;
		border-top: 1px solid #eee;
	}

	.add-item .title {
		color: #282828;
		font-size: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.add-item .add {
		color: #707070;
		font-size: 24rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.current-site-icon {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 46%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.near-list {
		height: 650rpx;
		padding-bottom: 100rpx;
		box-sizing: border-box;
	}

	.near-item {
		line-height: 40rpx;
		padding: 30rpx 50rpx 30rpx 90rpx;
		text-align: left;
		border-bottom: 1px solid #eee;
		position: relative;
	}

	.current-site {
		font-size: 40rpx;
		color: #FFBF77;
		position: absolute;
		top: 40rpx;
		left: 30rpx;
	}

	.current-site image {
		width: 50rpx;
		height: 50rpx;
	}

	.near-item .title {
		color: #282828;
		font-size: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.near-item .add {
		color: #707070;
		font-size: 24rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.near-item .title1 {
		color: #FFBF77;
	}

	.near-item .add1 {
		color: #FFBF77;
	}

	.bottom-box {
		width: 100%;
		padding: 20rpx;
		background: #fff;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 88;
		overflow: hidden;
	}

	.bottom-box button {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		border: none;
		background: #FFBF77;
		color: #fff;
		font-size: 36rpx;
		border-radius: 40rpx;
	}

	.region-box {
		width: 100%;
		height: 100%;
		background: #FFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1001;
	}

	.region-box .region-top {
		position: relative;
		font-size: 40rpx;
		color: #282828;
		font-weight: bold;
		line-height: 100rpx;
		text-align: center;
	}

	.region-box .region-back {
		width: 80rpx;
		height: 80rpx;
		font-size: 50rpx;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
	}

	.region-box .region-tabs {
		line-height: 60rpx;
		font-size: 20rpx;
	}

	.region-tabs .tab {
		min-width: 100rpx;
		max-width: 200rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		color: #FFBF77;
		text-align: center;
		border: 1rpx solid #FFBF77;
		border-radius: 20rpx;
		display: inline-block;
		margin: 20rpx 0 20rpx 20rpx;
		padding: 3rpx 20rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.region-list .region-item {
		font-size: 30rpx;
		color: #282828;
		line-height: 80rpx;
		padding: 10rpx 30rpx;
		border-top: 1rpx solid #eee;
	}

	.map-prompt {
		width: 500rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		color: #707070;
		text-align: center;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		position: absolute;
		bottom: 40rpx;
		left: 50%;
		transform: translate(-50%, 0);
	}

	.reload {
		width: 80rpx;
		height: 80rpx;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
	}

	.reload .center1 {
		width: 30rpx;
		height: 30rpx;
		border: 1rpx solid #FFBF77;
		border-radius: 50%;
		margin: 24rpx auto;
	}

	.reload .center2 {
		width: 25rpx;
		height: 25rpx;
		background: #FFBF77;
		border-radius: 50%;
		margin: 3rpx auto;
	}
</style>
