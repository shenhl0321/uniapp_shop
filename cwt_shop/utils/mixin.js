/*
	mixin全局混入代码
*/
const wxs = require('./number.js')

export default {
	data() {
		return {
			wxs: wxs
		}
	},
	
	onPullDownRefresh() {
		console.log("onPullDownRefresh running")
		setTimeout(() =>{
			uni.stopPullDownRefresh()
		}, 1000)
	},
	
	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			// this.$forceUpdate();
			isFn(callback) && this.$nextTick(callback);
		},
		
		setTabBarIndex(index){
			if (typeof this.$mp.page.getTabBar === 'function' &&
				this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected:index
				})
			}
		},
	
		$showToast(message, icon, duration) {
			icon = icon || 'none'
			duration = duration || 1500
			uni.showToast({
				icon: icon||'none',
				title: message,
				duration
			})
		},
		
		$goBack(index) {
			uni.navigateBack({
				delta: index || -1
			})
		},
		
		$goThePage(url) {
			if(url === 'null') {
				this.$showToast('此功能暂未开通')
				return
			}
			uni.navigateTo({
				url
			})
		},
		
		$goHome() {
			uni.reLaunch({
				url: '/pages/home/home'
			})
		},
		
	
	},
}