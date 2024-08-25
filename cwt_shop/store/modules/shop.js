import request from '@/http/index.js'
import Vue from 'vue'

const toolsFunction = {
	getShopInfo(store, shopId) {
		request.get(`/shop/shop/info/${shopId}`, 'GET').then(res =>{
			console.log(res)
			store.commit('shop/updateShopInfo', { shopId, shopInfo: res })			
		},rej =>{
			console.log(rej)
		})
	},
	
	getShopCartItem(store, shopId) {
		return request.post("/p/shopCart/info/" + shopId, ).then((res) => {
			let shopCartItems = []
			if (res.length > 0) {
				shopCartItems = res[0].shopCartItemDiscounts[0].shopCartItems
			}
			return shopCartItems
		})
	},
	
	getTotalPrice(store, shopId) {
		return request.post("/p/shopCart/totalPay/" + shopId, )
	},
	
	// addShopCartItemWatcher(store, shopId) {
	// 	store.watch((store, getters) =>{
	// 		return getters['shop/shopCartTotalCount']
	// 	}, () =>{
	// 		this.getTotalPrice(store, shopId)
	// 		this.getShopCartItem(store, shopId).then(res =>{
	// 			store.commit('shop/updateShopCartItems', { shopCartItems: res, shopId })
	// 		})
	// 	})
	// },
}

const watcherList = [
	{
		watcher: (store) =>{
			return () =>{
				return store.state.shop.currentShop
			}
		},
		running: (store) =>{
			return () =>{
				let shopId = store.state.shop.currentShop
				toolsFunction.getShopInfo(store, shopId)
				let res = toolsFunction.getShopCartItem(store, shopId).then(res =>{
					let shopCartItems = res
					store.commit('shop/updateShopCartItems', { shopCartItems, shopId })
				})
				toolsFunction.getTotalPrice(store, shopId).then(res =>{
					let priceInfo = res
					store.commit('shop/updatePriceInfo', { priceInfo, shopId })
				})
			}
		},
	}
]
	
const shop = {
	namespaced: true,
	state: () =>{
		return {
			currentShop: null,
			// watcherAlready: [],
			shopCartMap: {},
			// requestTimes: 0
		}
	},
	getters: {
		shopCartItems(state) {
			let shopId = state.currentShop
			return state.shopCartMap[shopId].shopCartItems || []
		},
		
		// tempCount(state) {
		// 	let shopId = state.currentShop
		// 	return state.shopCartMap[shopId].tempCount
		// },
		shopInfo(state) {
			let shopId = state.currentShop
			let shopInfo = state.shopCartMap[shopId].shopInfo || {}
			return shopInfo
		},
		
		shopCartTotalCount(state) {
			let shopId = state.currentShop
			// let tempCount = state.shopCartMap[shopId].tempCount
			let shopCartItems = state.shopCartMap[shopId].shopCartItems || []
			let totalCount = shopCartItems.reduce((sum, item) =>{
				return sum + item.prodCount
			}, 0)
			return totalCount
		},
		
		priceInfo(state) {
			let shopId = state.currentShop
			if(shopId) {
				return state.shopCartMap[shopId].priceInfo || {}
			}
			return 
		},
		
		basketIds(state) {
			let shopId = state.currentShop
			let shopCartItems = state.shopCartMap[shopId].shopCartItems || []
			let basketIds = []
			shopCartItems.forEach(item =>{
				basketIds.push(item.basketId)
			})
			return basketIds
		},
	},
	mutations: {
		// addWatcher(state, shopId) {
		// 	state.watcherAlready.push(shopId)
		// },
		
		updateShopId(state, shopId) {
			state.currentShop = shopId
			if(!state.shopCartMap[shopId]) {
				Vue.set(state.shopCartMap, shopId, {})
			}
		},
		
		updateShopInfo(state, val) {
			let { shopInfo, shopId } = val
			if(state.shopCartMap[shopId].shopInfo) return 
			console.log('running updateshopInfo')
			Vue.set(state.shopCartMap[shopId], 'shopInfo', shopInfo)
		},
		
		updateShopCartItems(state, val) {
			let { shopCartItems, shopId } = val
			Vue.set(state.shopCartMap[shopId], 'shopCartItems', shopCartItems)
			// let watcherAlready = state.watcherAlready
			// if(watcherAlready.indexOf(shopId) == -1) {
			// 	toolsFunction.addShopCartItemWatcher(this, shopId)
			// 	state.watcherAlready.push(shopId)
			// }
		},
		
		clearShopCartItems(state) {
			let shopId = state.currentShop
			Vue.set(state.shopCartMap[shopId], 'shopCartItems', [])
			// Vue.set(state.shopCartMap[shopId], 'tempCount', 0)
		},
		
		updateGoodsCount(state, val) {
			let { index, prodId, updateNum } = val
			let shopId = state.currentShop
			let shopCartItems = state.shopCartMap[shopId].shopCartItems
			let goodsItem = shopCartItems[index]
			goodsItem.prodCount += updateNum
			if(goodsItem.prodCount == 0) {
				shopCartItems.splice(index, 1)
			}else {
				shopCartItems[index] = goodsItem
			}
			Vue.set(state.shopCartMap[shopId], 'shopCartItems', shopCartItems)
		},

		// updateTempCount(state, val) {
		// 	let shopId = state.currentShop
		// 	if(val == 'reset') {
		// 		Vue.set(state.shopCartMap[shopId], 'tempCount', 0)
		// 	} else {
		// 		let tempCount = val
		// 		Vue.set(state.shopCartMap[shopId], 'tempCount', tempCount)				
		// 	}
		// },
		
		updatePriceInfo(state, val) {
			let { priceInfo, shopId } = val
			Vue.set(state.shopCartMap[shopId], 'priceInfo', priceInfo)
		},
		

	},
	actions: {
		refreshCartItems(context) {
			let shopId = context.state.currentShop
			toolsFunction.getShopCartItem(context, shopId).then(res =>{
				let shopCartItems = res
				// context.commit('updateTempCount', 'reset')
				context.commit('updateShopCartItems', { shopCartItems, shopId })
			})
			toolsFunction.getTotalPrice(context, shopId).then(res =>{
				let priceInfo = res
				context.commit('updatePriceInfo', { priceInfo, shopId })
			})
		}
	}
}

module.exports = {
	watcherList,
	shop
}