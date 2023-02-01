<template>
	<div style="align-content: center;">
		<section >
			<section class="wrapper site-min-height">
				<h1>请登录！</h1>
				<form @submit.prevent="validate" style="width: 300px;" >
					<!-- 	账号：<input type="text" v-model="id" placeholder="账号" /><br /><br />
		密码：<input type="password" v-model="password" placeholder="密码" /> -->
					<el-input placeholder="请输入账号" v-model="id"  autofocus="autofocus" clearable ></el-input>
					<br /><br />
					<el-input placeholder="请输入密码" v-model="password" show-password></el-input><br /><br />
					<el-button type="primary" @click="validate">登录</el-button>
					
					
					<el-button type="primary" @click="register">
						注册
					</el-button>
				</form>
			</section>

		</section>
	</div>
</template>

<script>
	export default {
		name: "LogIn",
		data() {
			return {
				id: "",
				password: "",
				UserLoginStatus: "NO"
			}
		},
		methods: {
			validate() {
				let data = new FormData();
				data.append("id", this.id);
				data.append("password", this.password);
				if(this.id<99){
					this.axiosJSON.post("/administrator/validate.mvc", data, {
						headers: {
							"Access-Control-Allow-Origin": "*",
						}
					
					}).then(result => {
					
						if (result.data.status == "Administrator") {
							alert(result.data.message);
							this.$store.dispatch("setLoginUser", result.data.result); //通过Vuex状态存储登录的用户信息
							this.UserLoginStatus = "OK";
							this.$router.push({
								path: "/administrator/info"
							});
					
						} else {
							alert(result.data.message);
							this.id = "";
							this.password = "";
						}
					});
				}else{
					this.axiosJSON.post("/user/validate.mvc", data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
					}

				}).then(result => {

					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$store.dispatch("setLoginUser", result.data.result); //通过Vuex状态存储登录的用户信息
						this.UserLoginStatus = "OK";
						this.$router.push({
							path: "/user/info"
						});

					} else {
						alert(result.data.message);
						this.id = "";
						this.password = "";
					}
				});
				}
				
			},
			register(){
				this.$router.push({
					path: "/user/register"
				});
			}
			
			
			
			
			
			
			
			
		}
	}
</script>

<style>
	#main{
		padding-top: 50px;
		margin-left: 100px;
		width: 85%;
	}
</style>
