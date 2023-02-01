<template>
	<div class="userinfo">
		<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" stretch="true">
			<el-radio-button label="top">top</el-radio-button>
			<el-radio-button label="right">right</el-radio-button>
			<el-radio-button label="bottom">bottom</el-radio-button>
			<el-radio-button label="left">left</el-radio-button>
		</el-radio-group>

		<el-tabs :tab-position="tabPosition">
			<el-tab-pane label="用户信息">

				<span style="padding-left: 8px">
					<h1>用户信息</h1>
					<div>
						<span>
							<img v-bind:src="photoUri" width="200px" height="150px" />
						</span>

						<span><b>用户名：{{UserInfo.username}}</b></span><br />
						<span>UID：{{UserInfo.userid}}</span>
						<br /><b>我喜爱的类别：</b>
						<div v-for="usercates in UserCategoryList" v-bind:key="usercates.categoryno">
							<template v-for="usercate in usercates">
								<template v-for="cate in usercate">
									<span  style="float: left; margin-left: 10px;"
									v-bind:key="cate.categoryno">
									{{cate.cname}}
									</span>
								</template>
							</template>
						</div>
						
					</div>
					<hr />
				</span>

				<form @submit.prevent="UpdateInfo" class="cmxform form-horizontal style-form" style="width:  300px;">

					<el-input placeholder="请输入用户名" v-model="updatename" autofocus="autofocus" clearable
						class="form-group ">

					</el-input>
					<br /><br />
					<el-input placeholder="请输入密码" v-model="updatepwd" class="form-group " show-password></el-input>
					<br /><br />
					<input @change="uploadphoto" name="userphoto" class=" form-control" minlength="2" type="file"
						required />

					<el-button type="primary" @click="UpdateInfo">修改</el-button>
				</form>


			</el-tab-pane>



			<el-tab-pane label="我的追漫">
				<span style="padding-left: 8px">
					<h1>选择你感兴趣的类别</h1>

					<form @submit.prevent="addCategory">
						<div v-for="category in categoryList" v-bind:key="category.categoryno"
							style="float: left; margin-top: 5px;">
							<span style="margin-left: 10px;"></span>
							<input type="checkbox" name="category" :value="category.categoryno" v-model="arr" />{{category.cname}}
						</div>
						<el-button type="small" @click="addCategory">提交</el-button>
					</form>

					<h1>我的追漫</h1>

					<div class="comic-list">
						<div class="comic-item" v-for="cartoons in FollowCartoonList" v-bind:key="cartoons.cartoonid"
							style="padding-left: 5px;">
							<template v-for="cartoon in cartoons">
								<template v-for="onecartoon in cartoon">
									<router-link to="/cartoon/cartoondetails" v-bind:key="onecartoon.cartoonid">

										<div data-v-3d63eac8="" class="cover-container app-button"
											v-on:click="selectCartoon(onecartoon.cartoonid, onecartoon)">
											<div>
												<img
													:src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+onecartoon.cartoonid" />
											</div>
											<div data-v-3d63eac8="" class="title">

												<div data-v-3d63eac8="" class="text">{{onecartoon.cartoonname}}</div>
											</div><span data-v-3d63eac8="" class="tags">{{onecartoon.author}}</span>
										</div>


									</router-link>
								</template>
							</template>
						</div>
					</div>

					<hr />
				</span>
			</el-tab-pane>


			<el-tab-pane label="版本信息">
				<h1>项目信息</h1>
				<b>2022-6-1——2022-6-7</b><br />
				<b>Spring集成Mybatis模仿bilibili漫画网站项目</b>

			</el-tab-pane>
			<el-tab-pane label="退出登录">
				<h1>在这里注销</h1>
				<el-button type="text" @click="dialogVisible = true">点击注销</el-button>

				<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
					<span>确定注销？</span>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="logout">确 定</el-button>
					</span>
				</el-dialog>


			</el-tab-pane>

		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: "UserInfo",
		data() {
			return {
				tabPosition: 'left',
				dialogVisible: false,

				UserInfo: null,
				userList: null,
				updatename: null,
				updatepwd: null,
				userphoto: null,
				photoUri: null,
				categoryList: null,
				arr:[],
				UserCategoryList:null,
				FollowCartoonList: {
					userid: null,
					userpassword: null,
					username: null,
					photo: null,
					filename: null,
					contenttype: null,
					cartoons: [

						{
							cartoonid: null,
							cartoonname: null,
							author: null,
							description: null,
							cartoondate: null,

							category: null,
							publisher: null,
							state: null,
							users: null
						}
					]
				}
			};
		},
		methods: {
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			uploadphoto(event) {
				this.userphoto = event.target.files[0];
				
			},
			UpdateInfo() {
				let data = new FormData();
				data.append("userid", this.UserInfo.userid);
				data.append("username", this.updatename);
				data.append("userpassword", this.updatepwd);
				data.append("userphoto", this.userphoto);
				this.axiosJSON.post("/user/userupdate.mvc", data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "multipart/form-data"
					}

				}).then(result => {
					
					alert(result.data.message);
					location.reload();
					this.$store.dispatch("setLoginUser", this.UserInfo); //通过Vuex状态存储登录的用户信息
					this.UserLoginStatus = "OK";
				});
			},
			getByUserid() {
				this.axiosJSON.get("/user/getfollowcartoon.mvc", {
					params: {
						id: this.UserInfo.userid
					}
				}).then(result => {
					this.FollowCartoonList = result.data.list;
					

				});
			},
			selectCartoon(no, list) { //点击TR事件处理
				this.CartoonId = no;
				this.$parent.CartoonList = list;
				this.$parent.CartoonId = no; //辅助给父组件的数据属性

			},

			checkSelected(no) { //检查no是否被选中
				return this.categoryId == no;

			},
			logout() {
				this.$store.dispatch("setLoginUser", null);
				this.$router.push({
					path: "/login"
				});

			},
			getListByCategory() {
				this.axiosJSON.get("/category/getcategory.mvc", {

				}).then(result => {

					this.categoryList = result.data.list;
				});
			},
			addCategory() {
				console.log(this.arr);
				var newArr = JSON.parse(JSON.stringify(this.arr));
				
				
				let data = new FormData();
				data.append("userid", this.UserInfo.userid);
				data.append("categorys", newArr);
				
					this.axiosJSON.post("/user/addcategory.mvc",data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
						
					}

				}).then(result => {
						alert(result.data.message);

					});
				
			},
			
			
			getCategoryByUserid() {
				this.axiosJSON.get("/user/getlikecategory.mvc", {
					params: {
						userid: this.UserInfo.userid
					}
				}).then(result => {
					this.UserCategoryList = result.data.list;
					
			
				});
			},


		},


		created() {
			this.UserInfo = this.$store.getters.getLoginUser;
			this.$store.dispatch("setLoginUser", this.UserInfo); //通过Vuex状态存储登录的用户信息
			this.UserLoginStatus = "OK";
			console.log(this.UserInfo);
			this.photoUri = "http://localhost:8088/api/user/userphoto.mvc?no=" + this
				.UserInfo.userid;
			this.getByUserid();
			this.getListByCategory();
			this.getCategoryByUserid();
		}
	}
</script>

<style>

</style>
