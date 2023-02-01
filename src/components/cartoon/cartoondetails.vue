<template>
	<div id="details">
		<table class="cartoontable">
			<tbody>
				<td>
					<img :src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+CartoonList.cartoonid" />
				</td>
				<td>
					<div class="cartoon_describe">
						<tr>
							<h1>{{CartoonList.cartoonname}}</h1>
						</tr>
						<tr>{{CartoonList.author}}</tr>
						<tr>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
								class="bi bi-bookmark-fill" viewBox="0 0 16 16">
								<path
									d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
							</svg>
							<span>{{CartoonList.category.cname}}</span>
						</tr>
						<tr><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
								class="bi bi-flower3" viewBox="0 0 16 16">
								<path
									d="M11.424 8c.437-.052.811-.136 1.04-.268a2 2 0 0 0-2-3.464c-.229.132-.489.414-.752.767C9.886 4.63 10 4.264 10 4a2 2 0 1 0-4 0c0 .264.114.63.288 1.035-.263-.353-.523-.635-.752-.767a2 2 0 0 0-2 3.464c.229.132.603.216 1.04.268-.437.052-.811.136-1.04.268a2 2 0 1 0 2 3.464c.229-.132.489-.414.752-.767C6.114 11.37 6 11.736 6 12a2 2 0 1 0 4 0c0-.264-.114-.63-.288-1.035.263.353.523.635.752.767a2 2 0 1 0 2-3.464c-.229-.132-.603-.216-1.04-.268zM9 4a1.468 1.468 0 0 1-.045.205c-.039.132-.1.295-.183.484a12.88 12.88 0 0 1-.637 1.223L8 6.142a21.73 21.73 0 0 1-.135-.23 12.88 12.88 0 0 1-.637-1.223 4.216 4.216 0 0 1-.183-.484A1.473 1.473 0 0 1 7 4a1 1 0 1 1 2 0zM3.67 5.5a1 1 0 0 1 1.366-.366 1.472 1.472 0 0 1 .156.142c.094.1.204.233.326.4.245.333.502.747.742 1.163l.13.232a21.86 21.86 0 0 1-.265.002 12.88 12.88 0 0 1-1.379-.06 4.214 4.214 0 0 1-.51-.083 1.47 1.47 0 0 1-.2-.064A1 1 0 0 1 3.67 5.5zm1.366 5.366a1 1 0 0 1-1-1.732c.001 0 .016-.008.047-.02.037-.013.087-.028.153-.044.134-.032.305-.06.51-.083a12.88 12.88 0 0 1 1.379-.06c.09 0 .178 0 .266.002a21.82 21.82 0 0 1-.131.232c-.24.416-.497.83-.742 1.163a4.1 4.1 0 0 1-.327.4 1.483 1.483 0 0 1-.155.142zM9 12a1 1 0 0 1-2 0 1.476 1.476 0 0 1 .045-.206c.039-.131.1-.294.183-.483.166-.378.396-.808.637-1.223L8 9.858l.135.23c.241.415.47.845.637 1.223.083.19.144.352.183.484A1.338 1.338 0 0 1 9 12zm3.33-6.5a1 1 0 0 1-.366 1.366 1.478 1.478 0 0 1-.2.064c-.134.032-.305.06-.51.083-.412.045-.898.061-1.379.06-.09 0-.178 0-.266-.002l.131-.232c.24-.416.497-.83.742-1.163a4.1 4.1 0 0 1 .327-.4c.046-.05.085-.086.114-.11.026-.022.04-.03.041-.032a1 1 0 0 1 1.366.366zm-1.366 5.366a1.494 1.494 0 0 1-.155-.141 4.225 4.225 0 0 1-.327-.4A12.88 12.88 0 0 1 9.74 9.16a22 22 0 0 1-.13-.232l.265-.002c.48-.001.967.015 1.379.06.205.023.376.051.51.083.066.016.116.031.153.044l.048.02a1 1 0 1 1-1 1.732zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
							</svg>
							<span>{{CartoonList.state.sname}}</span>
						</tr>

						<tr>
							{{CartoonList.description}}
						</tr>
						<tr>
							<el-button :plain="true" @click="followCartoon" icon="el-icon-star-off">追漫</el-button>
							<el-button :plain="true" @click="cancleCartoon" icon="el-icon-star-off">取消追漫</el-button>
						</tr>
					</div>
				</td>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: "CartoonDetails",
		data() {
			return {
				CartoonList: {
					cartoonid: null,
					cartoonname: null,
					author: null,
					description: null,
					cartoondate: null,
					photo: null,
					filename: null,
					contenttype: null,
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




				photoUri: ""
			}
		},


		methods: {
			followCartoon() {
				let data = new FormData(); //创建form对象

				data.append("userNo", this.UserInfo.userid);
				data.append("CartoonNo", this.CartoonList.cartoonid);
				this.axiosUpload.post("/user/followCartoon.mvc", data, {

					headers: {
						"Access-Control-Allow-Origin": "*",
					}

				}).then(result => {


					alert(result.data.message);

				});

			},
			cancleCartoon() {
				let data = new FormData(); //创建form对象

				data.append("userNo", this.UserInfo.userid);
				data.append("CartoonNo", this.CartoonList.cartoonid);
				this.axiosUpload.post("/user/cancleCartoon.mvc", data, {

					headers: {
						"Access-Control-Allow-Origin": "*",
					}

				}).then(result => {


					alert(result.data.message);

				});

			},
			rollbacklist() {

				this.$router.push("/main");
			},

			getById() {
				this.axiosJSON.get("/cartoon/get.mvc", {
					params: {
						no: this.CartoonList.cartoonid
					}
				}).then(result => {
					this.CartoonList = result.data.result;
					if (this.CartoonList != null) {
						this.photoUri = "http://localhost:8088/api/cartoon/showphoto.mvc?no=" + this
							.CartoonList.cartoonid;
					}


				});
			}




		},

		created() {

			this.CartoonList = this.$parent.CartoonList;
			this.getById();


			this.UserInfo = this.$store.getters.getLoginUser;
			this.$store.dispatch("setLoginUser", this.UserInfo); //通过Vuex状态存储登录的用户信息
			this.UserLoginStatus = "OK";
			console.log(this.UserInfo);

		}

	}
</script>

<style>
</style>
