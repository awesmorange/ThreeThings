// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// vuex
import store from '@/store'
// element-ui库
import ElementUI from 'element-ui';
import { Button, Select, Dialog, Input, Form, FormItem, DatePicker, TimeSelect, TimePicker, Message, Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// axios实现接口
import axios from 'axios'
global.axios = axios;  //设置一个全局axios便于调用
import VueAxios from 'vue-axios'

import { post, get } from './utils/http'

Vue.use(ElementUI, axios, VueAxios);
Vue.use(Button, Select, Dialog, Input, Form, FormItem, DatePicker, TimeSelect, TimePicker, Message, Icon)

//定义全局变量
Vue.prototype.$axios = axios
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$message = Message;

// import apiConfig from '../config/api.config'
// axios.defaults.baseURL=apiConfig.baseURL

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
