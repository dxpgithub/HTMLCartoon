<template>
	<div class=" form">
		<form class="cmxform form-horizontal style-form" id="commentForm" @submit.prevent="add">
			<div class="form-group ">
				<label for="cname" class="control-label col-lg-2">用户名</label>
				<div class="col-lg-10">
					<input class=" form-control" v-model="userList.username" minlength="2" type="text" required />
				</div>
			</div>




			<div class="form-group ">
				<label for="cname" class="control-label col-lg-2">密码</label>
				<div class="col-lg-10">
					<input class=" form-control" v-model="userList.userpassword" minlength="2" type="text" required />
				</div>
			</div>
			<div class="form-group ">
				<label for="cname" class="control-label col-lg-2">头像</label>
				<div class="col-lg-10">
					<input  @change="uploadphoto" name="userphoto" class=" form-control" minlength="2" type="file" required />
				</div>
			</div>



			<div class="form-group">
				<div class="col-lg-offset-2 col-lg-10">
					<el-button type="warning" plain @click="add">注册</el-button>
					<!-- <button class="btn btn-theme" type="submit"></button> -->
					<el-button type="primary" @click="rollbacklist()">取消</el-button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		name: "UserRegister",
		data() {
			return {
				userList: {
					username: null,
					userpassword: null,
					userphoto: null
				}
			}
		},

		methods: {
			rollbacklist() {
				this.$router.push("/login");
			},
			uploadphoto(event) {
				this.userList.userphoto = event.target.files[0];
				console.log(this.userList.userphoto);
			},
			add() {

				let data = new FormData(); //创建form对象

				data.append("username", this.userList.username);
				data.append("userpassword", this.userList.userpassword);
				data.append("userphoto",this.userList.userphoto);
				this.axiosUpload.post("/user/registerUser.mvc", data, {

					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "multipart/form-data"
					}

				}).then(result => {


					alert(result.data.message);
					this.$router.push("/login");

				});
			}


		}
	}
</script>

<style>
</style>
