<template>

	<div class="classification">
		<div style="text-align: center; ">

			<el-radio-group v-model="radio" size="small" text-color="#FFFFFF" fill="#000000">
				<el-radio-button @click.native.prevent="getListByALL()">全部</el-radio-button>
				<el-radio-button v-for="category in categoryList" v-bind:key="category.categoryno"
					:label="category.cname" @click.native.prevent="getListByTypeName(category.cname)">{{category.cname}}
				</el-radio-button>

			</el-radio-group>
		</div>


		<div class="comic-list">
			<div class="comic-item" v-for="cartoon in CartoonList" v-bind:key="cartoon.cartoonid"
				style="padding-left: 5px;">
				<router-link to="/cartoon/cartoondetails">

					<div data-v-3d63eac8="" class="cover-container app-button"
						v-on:click="selectCartoon(cartoon.cartoonid, cartoon)">
						<div>
							<img
								:src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+cartoon.cartoonid" />
						</div>
						<div data-v-3d63eac8="" class="title">

							<div data-v-3d63eac8="" class="text">{{cartoon.cartoonname}}</div>
						</div><span data-v-3d63eac8="" class="tags">{{cartoon.author}}</span>
					</div>


				</router-link>
			</div>
		</div>

		<div style="clear: left;">
			<div class="col-lg-10">
				个数:{{count}} 页数:{{page}}/{{pageCount}}
				<nav aria-label="员工分页">
					<ul class="pagination">
						<li class="page-item"><a class="page-link" href="#" @click="firstPage()">首页</a></li>
						<li class="page-item"><a class="page-link" href="#" @click="previousPage()">上页</a></li>
						<li class="page-item"><a class="page-link" href="#" @click="nextPage()">下页</a></li>
						<li class="page-item"><a class="page-link" href="#" @click="lastPage()">末页</a></li>

					</ul>
				</nav>
				<br />
			</div>
		</div>

	</div>

</template>

<script>
	export default {
		name: "ClassIfication",
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
				radio: null,
				photoUri: "",
				categoryList: null,
				categoryName: null,
				categoryId: null,
				CartoonId: null,
				defaultName: "都市",

				page: 1,
				count: 0,
				pageCount: 0,
				rows: 12,
				employeeId: null
			}
		},
		methods: {
			getListByCategory() {
				this.axiosJSON.get("/category/getcategory.mvc", {

				}).then(result => {

					this.categoryList = result.data.list;
					this.radio = this.categoryList[0].cname;


				});
			},

			getListByTypeName(name) {
				this.defaultName = name;

				this.axiosJSON.get("/cartoon/showTypeALL.mvc", {
					params: {
						typename: this.defaultName,
						rows: this.rows,
						page: this.page
					}

				}).then(result => {

					this.CartoonList = result.data.list;
					console.log(this.CartoonList);
					this.radio = name;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
					if (this.page > this.pageCount) {
						this.page = 1;
						this.axiosJSON.get("/cartoon/showTypeALL.mvc", {
							params: {
								typename: this.defaultName,
								rows: this.rows,
								page: this.page
							}

						}).then(result => {

							this.CartoonList = result.data.list;
							console.log(this.CartoonList);
							this.radio = name;
							this.count = result.data.count;
							this.pageCount = result.data.pageCount;
						});

					}
				});
			},




			getListByALL() {
				this.radio = "";
				this.axiosJSON.get("/cartoon/showALL.mvc", {
					params: {
						rows: this.rows,
						page: this.page
					},
				}).then(result => {
					this.CartoonList = result.data.list;

					this.pageCount = result.data.pageCount;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
					if (this.page > this.pageCount) {
						this.page = 1;
					}
				});
			},



			selectCartoon(no, list) { //点击TR事件处理
				this.CartoonId = no;
				this.$parent.CartoonList = list;
				this.$parent.CartoonId = no; //辅助给父组件的数据属性

			},



			selectCategory(name, list) { //点击TR事件处理
				this.categoryName = name;
				this.$parent.categoryList = list;
				this.$parent.categoryName = name; //辅助给父组件的数据属性

			},

			checkSelected(no) { //检查no是否被选中
				return this.categoryId == no;

			},
			nextPage() {
				if (this.page < this.pageCount) {
					this.page++;
					console.log(this.defaultName);

					if (this.radio == "") {

						this.getListByALL();
					} else {
						this.getListByTypeName(this.defaultName)
					}



				}

			},
			previousPage() {
				if (this.page > 1) {
					this.page--;

					this.page = 1;
					if (this.radio == "") {

						this.getListByALL();
					} else {
						this.getListByTypeName(this.defaultName);
					}

				}
			},
			firstPage() {
				this.page = 1;
				if (this.radio == "") {
					this.getListByALL();
				} else {
					this.getListByTypeName(this.defaultName);
				}
			},
			lastPage() {
				this.page = this.pageCount;
				if (this.radio == "") {
					this.getListByALL();
				} else {
					this.getListByTypeName(this.defaultName);
				}
			}

		},
		created() {
			this.getListByCategory();
			this.getListByTypeName(this.defaultName);
		}

	}
</script>

<style>
</style>
