import request from '@/http/index.js'
import Vue from 'vue'
	
const address = {
	namespaced: true,
	state: () =>{
		return {
			address: {}
		}
	},
	getters: {
		latitude(state) {
			return state.address.latitude
		},
		longitude(state) {
			return state.address.longitude
		},
		province(state) {
			return state.address.province
		},
		city(state) {
			return state.address.city
		},
		area(state) {
			return state.address.district
		},
		street(state) {
			return state.address.title
		},
	},
	mutations: {				
		updateAddress(state, val) {
			state.address = val
			console.log(val)
		}
	},
	actions: {

	}
}

module.exports = {
	address
}