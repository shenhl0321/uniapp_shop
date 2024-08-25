import Vue from 'vue';
import App from './App';

/* ========== 引入vuex状态管理 ========== */
import store from '@/store/index.js'
/* ========== 引入vuex状态管理 ========== */

/* ========== 将utils工具方法挂载到vue示例上面 ========== */
import utils from '@/utils/index.js'
Vue.prototype.$utils = utils.utils
/* ========== 将utils工具方法挂载到vue示例上面 ========== */

/* ========== mixin全局注入代码 ========== */
import mixin from '@/utils/mixin.js';
Vue.mixin(mixin);
/* ========== mixin全局注入代码 ========== */

/* ========== 引入全局$request 开始 ========== */
// import $request from '$request-ui'
// Vue.use($request);
/* ========== 引入全局$request 结束 ========== */

import request from './http'
Vue.prototype.$request = request

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App,
	store,
	computed: {
		ifLogin() {
			console.log('running')
			return false
		}
	}
});

/* ========== http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用 ========== */
// import httpInterceptor from '@/$request-ui/libs/request/http.interceptor.js'
// Vue.use(httpInterceptor, app)
/* ========== http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用 ========== */
/* ========== http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用 ========== */
import _httpInterceptor from '@/http/http.interceptor.js'
Vue.use(_httpInterceptor, app)
/* ========== http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用 ========== */

app.$mount();

/* ========== 将当前设备信息存储于vuex中 ========== */
const sysInfo = uni.getSystemInfoSync()
app.$store.commit('sysInfo/updateSysInfo', sysInfo)
/* ========== 将当前设备信息存储于vuex中 ========== */
