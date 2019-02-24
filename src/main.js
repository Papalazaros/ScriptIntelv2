import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router';
import {
  store
} from './store';
import moment from 'moment';
import './plugins/vuetify';

// Declare filters for global usage
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).local().format('MM/DD/YYYY hh:mm A');
  }
});

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  store,
  router,  
  render: h => h(App),
}).$mount('#app');
