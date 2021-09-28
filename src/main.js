import Vue from 'vue';
import 'normalize.css';
import '@/assets/scss/styles.scss';
import App from './App.vue';
import store from './store';
import VueObserveVisibility from 'vue-observe-visibility';
import VueMoment from 'vue-moment';

Vue.use(VueObserveVisibility);
Vue.use(VueMoment);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
