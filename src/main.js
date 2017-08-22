// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vuex from 'vuex';
import App from './App';
import store from './store';
import vueResource from 'vue-resource';
import router from './router';

import iview from 'iview';

import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(vueResource);
Vue.use(vuex);
Vue.use(iview);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
	router,
	template: '<App/>',
	components: {
		App
	}
});
