import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import store from './store'
import ElementUI from 'element-ui';
Vue.config.productionTip = false



const axiosJSON=axios.create({
	baseURL: 'http://localhost:8088/api',
	headers:{
		"Access-Control-Allow-Origin":"*",
		}
});

const axiosUpload=axios.create({
	baseURL: 'http://localhost:8088/api',
	headers:{
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods":"*",
	"Access-Control-Allow-Headers": "*",
	"Content-Type":"multipart/form-data"
	}
});
//把Axios对象注册到Vue对象上，挂载到Vue原型上
//所有的组件使用this.axiosJSON调用
Vue.prototype.axiosJSON=axiosJSON;
Vue.prototype.axiosUpload=axiosUpload;
Vue.use(ElementUI);


import Router from 'vue-router';
Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
 
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  router,
   store,
  render: h => h(App)
}).$mount('#app')
