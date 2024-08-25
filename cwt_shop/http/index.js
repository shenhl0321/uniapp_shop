import http from './http.js'

export default {
	get: http.get,
	post: http.post,
	put: http.put,
	login: http.login,
	delete: http.delete,
	updateUserInfo: http.updateUserInfo,
	http,
}

const install = Vue => {
	Vue.prototype.request = request
}
