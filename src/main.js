import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;
Vue.config.performance = true;

new Vue({
	render: h => h(App),
	vuetify,
}).$mount('#app');
