<template>
	<div class="deletecartoon">
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
			<br />
			<br />
			<form @submit.prevent="deleteCartoon">
				
			
			<el-button type="primary" @click="deleteCartoon">删除</el-button>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		name:"DeleteCartoon",
		data(){
			return{
				cartoonid: null,
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
			}
		},
		methods:{
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
			deleteCartoon(){
				let data = new FormData(); //创建form对象
				
				data.append("cartoonid", this.cartoonid);
				this.axiosUpload.post("/cartoon/deletecartoon.mvc", data, {
				
					headers: {
						"Access-Control-Allow-Origin": "*",
					}
				
				}).then(result => {
					alert(result.data.message);
					location.reload();
				
				});
			}
			
		}
	}
</script>

<style>
	.deletecartoon{
		padding-top: 100px;
		min-height: 700px;
		
	}
</style>