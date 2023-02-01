import Vue from 'vue'
import Vuex from 'vuex'
//项目的登录用户的集中存储
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user:null
	},
	getters:{
		getLoginUser:function(state){
			return state.user;
		}
	},
	mutations: {
		setLoginUser(state, user){
			state.user=user;
		},
	  	logoutUser(state){
	  	  state.user=null;
	  	}
		
	},
	actions: {
		setLoginUser(store, user){
			store.commit("setLoginUser",user);
		},
	  	logout(store){
			store.commit("logoutUser"); //提交mutations的logoutUser
	  	}
	},
	modules: {
	}
})
