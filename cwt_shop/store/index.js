import Vue from 'vue'
import Vuex from 'vuex'
import { watcherList, shop } from './modules/shop.js'
import { address } from './modules/address.js'

Vue.use(Vuex)

//手机系统相关信息
const sysInfo = {
	namespaced: true,
	state: ()=> {
		return {
			sysInfo: {},
		}
	},
	mutations: {
		updateSysInfo(state, val) {
			state.sysInfo = val
		}
	},
	getters: {
		statusBarHeight(state) {
			return state.sysInfo.statusBarHeight
		},
		customBarHeight(state) {
			return state.sysInfo.statusBarHeight + 44
		},	
	},
}

//当前进入的门店
const currentShop = {
	namespaced: true,
	state: () =>{
		return {
			shopId : null,
			shopInfo: {},
		}
	},
	mutations: {
		updateShopId(state,val) {
			state.shopId = val
		},
		updateShopInfo(state, val) {
			state.shopInfo = val
		}
	},

	actions: {
		async getShopInfo(context, shopId) {
			let $request = Vue.prototype.$request
			context.commit('updateShopId', shopId)
			let res = await $request.get(`/shop/shop/info/${shopId}`, 'GET')
			context.commit('updateShopInfo', res)
		}
	}
}



const store = new Vuex.Store({
	state: {
		ifLogin: false,  //当前是否处于登录状态
		userInfo: {}, //微信用户公开信息
		ifOutSide: false,  //当前环境是否为微信外部环境,
	},
	mutations: {
		updateIfLogin(state, val) {
			state.ifLogin = val
		},
		updateUserInfo(state, val) {
			Object.assign(state.userInfo, val)
			// state.userInfo = val
		},
		updateIfOutSide(state, val) {
			state.ifOutSide = val
		}
	},
	modules: {
		shop,
		address,
		sysInfo,
		currentShop,
	}
})

//添加vuex watcher, 用于监控shop module中shopId的变化，以自动请求并存储店铺信息及购物篮信息
while (watcherList.length !== 0) {
	let { watcher, running } = watcherList.pop()
	store.watch(watcher(store), running(store))
	if(watcherList.length == 0) break
}

export default store