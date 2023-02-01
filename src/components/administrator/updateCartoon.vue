<template>
	<div class="updatecartoon">

		<div class="cartoontable">
			<img :src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+CartoonList.cartoonid" />

			<div class="cartoon_describe">
				<tr>
					<h1>{{CartoonList.cartoonname}}</h1>
				</tr>
				<tr>{{CartoonList.author}}</tr>
				<tr>
				
				<span>{{CartoonList.category.cname}}</span>
				</tr>
				<tr>
					<span>{{CartoonList.state.sname}}</span>
				</tr>
				<tr>
					{{CartoonList.description}}
				</tr>

			</div>

			<form class="cmxform form-horizontal style-form" style="width:  300px; " @submit.prevent="selectCartoon">

				<input placeholder="输入漫画编号" v-model="cartoonid" autofocus="autofocus" class="form-control" />
				<el-button type="primary" @click="selectCartoon">查询</el-button>

			</form>


			<form class="cmxform form-horizontal style-form" style="width:  300px;" @submit.prevent="updateCartoon">
				<input placeholder="输入漫画名称" v-model="addCartoonList.cartoonname" autofocus="autofocus"
					class="form-control" />


				<br />
				<input placeholder="输入漫画作者" v-model="addCartoonList.author" class="form-control" />
				<br />
				出版日期：<input type="date" v-model="addCartoonList.cartoondate" class="form-control" />
				<br />
				<el-input type="textarea" :rows="2" placeholder="请输入描述" v-model="textarea">
				</el-input>


				<div class="col-lg-10">
					选择类别：

					<select class="form-control" v-model="category.categoryno" placeholder="选择类别">


						<option v-for="cm in categoryList" v-bind:key="cm.categoryno" v-bind:value="cm.categoryno">
							{{cm.cname}}
						</option>

					</select>
				</div>

				<div class="col-lg-10">
					选择状态：
					<select class="form-control" v-model="state.stateid" placeholder="选择状态">
						<option v-for="sm in stateList" v-bind:key="sm.stateid" v-bind:value="sm.stateid">
							{{sm.sname}}
						</option>
					</select>

				</div>

				<div class="col-lg-10">

					选择出版社：
					<select class="form-control" v-model="publisher.publisherid" placeholder="选择状态">
						<option v-for="pm in publisherList" v-bind:key="pm.publisherid" v-bind:value="pm.publisherid">
							{{pm.publishername}}
						</option>
					</select>
				</div>

				<br />
				<input @change="uploadphoto" name="cartoonphoto" class=" form-control" minlength="2" type="file"
					required />








				<el-button type="primary" @click="updateCartoon">修改</el-button>
				<el-button type="primary" @click="rollback">返回</el-button>
			</form>



		</div>











	</div>
</template>

<script>
	export default {
		name: "UpdateCartoon",
		data() {
			return {
				cartoonid: null,
				addCartoonList: {
					cartoonname: null,
					author: null,
					description: null,
					cartoondate: null,



				},
				CartoonList: {
					cartoonname: null,
					author: null,
					description: null,
					cartoondate: null,
					category: {
						categoryno: null,
						cname: null,
						cartoons: null
					},
					publisher: {
						publisherid: null,
						publishername: null
					},
					state: {
						stateid: null,
						sname: null
					}


				},
				categoryList: null,
				stateList: null,
				publisherList: null,
				category: {
					categoryno: null,
					cname: null
				},
				state: {
					stateid: null,
					sname: null
				},
				publisher: {
					publisherid: null,
					publishername: null
				},
				textarea: '',
				date1: '',
				photo: null,
			}
		},
		methods: {
			rollback() {
				this.$router.push({
					name: "administrator"
				});
			},
			uploadphoto(event) {
				this.photo = event.target.files[0];

			},
			getListByCategory() {
				this.axiosJSON.get("/category/getcategory.mvc", {

				}).then(result => {

					this.categoryList = result.data.list;
					console.log(this.categoryList);


				});
			},
			getListByState() {
				this.axiosJSON.get("/state/getstate.mvc", {

				}).then(result => {

					this.stateList = result.data.list;
					console.log(this.stateList);


				});
			},
			getListByPublisher() {
				this.axiosJSON.get("/publisher/getpublisher.mvc", {

				}).then(result => {

					this.publisherList = result.data.list;
					console.log(this.publisherList);


				});
			},

			selectCartoon() {

				this.axiosJSON.get("/cartoon/get.mvc", {
					params: {
						no: this.cartoonid
					}
				}).then(result => {
					this.CartoonList = result.data.result;
					console.log(this.CartoonList);

					if (this.addCartoonList != null) {
						this.photoUri = "http://localhost:8088/api/cartoon/showphoto.mvc?no=" + this
							.addCartoonList.cartoonid;
					}


				});

			},

			updateCartoon() {
				let data = new FormData(); //创建form对象
				data.append("cartoonid",this.cartoonid);
				data.append("cartoonname", this.addCartoonList.cartoonname);
				data.append("author", this.addCartoonList.author);
				data.append("description", this.textarea);
				data.append("cartoondate", this.addCartoonList.cartoondate);
				data.append("category.categoryno", this.category.categoryno);
				data.append("state.stateid", this.state.stateid);
				data.append("publisher.pubid", this.publisher.publisherid);

				data.append("cartoonphoto", this.photo);
				this.axiosUpload.post("/cartoon/updatecartoon.mvc", data, {

					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "multipart/form-data"
					}

				}).then(result => {
					alert(result.data.message);
					//this.$router.push("/login");

				});

			}

		},
		created() {
			this.getListByCategory();
			this.getListByState();
			this.getListByPublisher();
		}
	}
</script>

<style>
	.updatecartoon {
		padding-top: 100px;
		min-height: 1000px;
		/*margin-left: 150px;*/

	}
</style>
