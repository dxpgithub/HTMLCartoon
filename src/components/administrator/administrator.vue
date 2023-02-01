<template>
	<div class="userinfo">
		<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" stretch="true">
			<el-radio-button label="top">top</el-radio-button>
			<el-radio-button label="right">right</el-radio-button>
			<el-radio-button label="bottom">bottom</el-radio-button>
			<el-radio-button label="left">left</el-radio-button>
		</el-radio-group>

		<el-tabs :tab-position="tabPosition" @tab-click="handleClick">
			<el-tab-pane label="漫画管理">
				<el-button type="primary" @click="CartoonAddDialog = true">增加</el-button>
				<el-button type="primary" @click="CartoonUpdateDialog = true">修改</el-button>
				<el-button type="primary" @click="CartoonDeleteDialog = true">删除</el-button>
				<table class="table">
					<thead>
						<tr>
							<th>漫画编号</th>
							<th>漫画名称</th>
							<th>漫画作者</th>
							<th>出版日期</th>
							<th>漫画类别</th>
							<th>漫画状态</th>
							<th>漫画出版社</th>
						</tr>
					</thead>
					<tbody>
				
				
						<tr v-for="cm in CartoonList" v-bind:key="cm.cartoonid"
							v-on:click="selectCartoon(cm.cartoonid,cm)"
							v-bind:class="{SelectedBG:CartooncheckSelected(cm.cartoonid)}">
				
							<td>{{cm.cartoonid}}</td>
							<td>{{cm.cartoonname}}</td>
							<td>{{cm.author}}</td>
							<td>{{cm.cartoondate}}</td>
							<td>{{cm.category.cname}}</td>
							<td>{{cm.state.sname}}</td>
							<td>{{cm.publisher.publishername}}</td>
						</tr>
				
				
					</tbody>
				</table>
				
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
			<el-dialog title="漫画增加" :visible.sync="CartoonAddDialog" width="30%">
				<form  class="cmxform form-horizontal style-form"
					style="width:  300px;" @submit.prevent="addCartoon">
				
					<input placeholder="输入漫画名称" v-model="addCartoonList.cartoonname" autofocus="autofocus"
					class="form-control"	 />
				
				
					<br />
					<input placeholder="输入漫画作者" v-model="addCartoonList.author" class="form-control"/>
					<br />
					出版日期：<input  type="date" v-model="addCartoonList.cartoondate" class="form-control"/>
					<br />
					<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入描述"
					  v-model="textarea">
					</el-input>
					
						
					<div class="col-lg-10">
						选择类别：
						
						<select class="form-control" v-model="category.categoryno"
							placeholder="选择类别">
							
								
								<option   v-for="cm in categoryList" v-bind:key="cm.categoryno"
									v-bind:value="cm.categoryno" >
									{{cm.cname}}
								</option>
						
						</select>
					</div>
				
					<div class="col-lg-10">
						选择状态：
						<select class="form-control" v-model="state.stateid" placeholder="选择状态">
							<option v-for="sm in stateList" v-bind:key="sm.stateid" 
							v-bind:value="sm.stateid"
							>
								{{sm.sname}}
							</option>
						</select>
						
					</div>
					
					<div class="col-lg-10">
					
						选择出版社：
						<select class="form-control" v-model="publisherList.publisherid" placeholder="选择状态">
							<option v-for="pub in publisherList" v-bind:key="pub.publisherid" v-bind:value="pub.publisherid">
								{{pub.publishername}}
							</option>
						</select>
					</div>
				
				<br />
					<input @change="uploadphoto" name="cartoonphoto" class=" form-control" minlength="2"
						type="file" required />
				
				
				
					
				</form>
				
				<span slot="footer" class="dialog-footer">
					<el-button @click="CartoonAddDialog = false">取 消</el-button>
					<el-button type="primary" @click="addCartoon">新 增</el-button>
				</span>
			</el-dialog>	
				
				
				
			
			<el-dialog title="漫画修改" :visible.sync="CartoonUpdateDialog" width="30%">
				<form class="cmxform form-horizontal style-form" @submit.prevent="updateCartoon">
					漫画编号：{{UpdateCartoonList.cartoonid}}
					<input placeholder="输入漫画名称" v-model="UpdateCartoonList.cartoonname" autofocus="autofocus"
					class="form-control"	 />
					<br />
					<input placeholder="输入漫画作者" v-model="UpdateCartoonList.author" class="form-control"/>
					<br />
					出版日期：{{UpdateCartoonList.cartoondate}}<input  type="date" v-model="UpdateCartoonList.cartoondate" class="form-control"/>
					<br />
					<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入描述"
					  v-model="UpdateCartoonList.description">
					</el-input>
					
					
					<div class="col-lg-10">
						选择类别：{{UpdateCartoonList.category.cname}}
						
						<select class="form-control" v-model="category.categoryno"
							placeholder="选择类别">
							
								
								<option   v-for="cm in categoryList" v-bind:key="cm.categoryno"
									v-bind:value="cm.categoryno" >
									{{cm.cname}}
								</option>
						
						</select>
					</div>
									
					<div class="col-lg-10">
						选择状态：{{UpdateCartoonList.state.sname}}
						<select class="form-control" v-model="state.stateid" placeholder="选择状态">
							<option v-for="sm in stateList" v-bind:key="sm.stateid" v-bind:value="sm.stateid">
								{{sm.sname}}
							</option>
						</select>
						
					</div>
					
					<div class="col-lg-10">
					
						选择出版社：{{UpdateCartoonList.publisher.publishername}}
						<select class="form-control" v-model="publisherList.publisherid" placeholder="选择状态">
							<option v-for="pub in publisherList" v-bind:key="pub.publisherid" v-bind:value="pub.publisherid">
								{{pub.publishername}}
							</option>
						</select>
					</div>
					<img style="width: 150px; height: 150px;" :src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+UpdateCartoonList.cartoonid" />
					<input @change="uploadphoto" name="cartoonphoto" class=" form-control" minlength="2"
						type="file" required />
					
					
				</form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="CartoonUpdateDialog = false">取 消</el-button>
					<el-button type="primary" @click="updateCartoon">修 改</el-button>
				</span>
			</el-dialog>	
				
			
			
			
			<el-dialog title="漫画删除" :visible.sync="CartoonDeleteDialog" width="30%">
				<form class="cmxform form-horizontal style-form" @submit.prevent="deleteCategory">
					漫画编号：{{UpdateCartoonList.cartoonid}}
					<input placeholder="输入漫画名称" v-model="UpdateCartoonList.cartoonname" autofocus="autofocus"
					class="form-control"	 />
					<br />
					<input placeholder="输入漫画作者" v-model="UpdateCartoonList.author" class="form-control"/>
					<br />
					出版日期：{{UpdateCartoonList.cartoondate}}<input  type="date" v-model="UpdateCartoonList.cartoondate" class="form-control"/>
					<br />
					<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入描述"
					  v-model="UpdateCartoonList.description">
					</el-input>
					
					
					<div class="col-lg-10">
						选择类别：{{UpdateCartoonList.category.cname}}
						
						<select class="form-control" v-model="category.categoryno"
							placeholder="选择类别">
							
								
								<option   v-for="cm in categoryList" v-bind:key="cm.categoryno"
									v-bind:value="cm.categoryno" >
									{{cm.cname}}
								</option>
						
						</select>
					</div>
									
					<div class="col-lg-10">
						选择状态：{{UpdateCartoonList.state.sname}}
						<select class="form-control" v-model="state.stateid" placeholder="选择状态">
							<option v-for="sm in stateList" v-bind:key="sm.stateid" v-bind:value="sm.stateid">
								{{sm.sname}}
							</option>
						</select>
						
					</div>
					
					<div class="col-lg-10">
					
						选择出版社：{{UpdateCartoonList.publisher.publishername}}
						<select class="form-control" v-model="publisherList.publisherid" placeholder="选择状态">
							<option v-for="pub in publisherList" v-bind:key="pub.publisherid" v-bind:value="pub.publisherid">
								{{pub.publishername}}
							</option>
						</select>
					</div>
					<img style="width: 150px; height: 150px;" :src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+UpdateCartoonList.cartoonid" />
					
			
				</form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="CartoonDeleteDialog= false">取 消</el-button>
					<el-button type="primary" @click="deleteCartoon">删 除</el-button>
				</span>
			</el-dialog>

			</el-tab-pane>



			<el-tab-pane label="分类管理">
				<el-button type="primary" @click="addCategory">增加</el-button>
				<el-button type="primary" @click="dialogVisible = true">修改</el-button>
				<el-button type="primary" @click="deleteVisible= true">删除</el-button>
				<el-dialog title="分类修改" :visible.sync="dialogVisible" width="30%">
					<form class="cmxform form-horizontal style-form" @submit.prevent="updateCategory">
						<div>
							分类编号：{{categoryNo}}
							分类名称：{{beforeName}}
						</div>
						<div>
							<el-input placeholder="输入修改名称" v-model="updatecname" class="form-group "></el-input>
						</div>
					</form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="updateCategory">修 改</el-button>
					</span>
				</el-dialog>


				




				<el-dialog title="分类删除" :visible.sync="deleteVisible" width="30%">
					<form class="cmxform form-horizontal style-form" @submit.prevent="deleteCategory">
						<div>
							分类编号：{{categoryNo}}
							分类名称：{{beforeName}}
						</div>

					</form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="deleteVisible= false">取 消</el-button>
						<el-button type="primary" @click="deleteCategory">删 除</el-button>
					</span>
				</el-dialog>

				
				<table class="table">
					<thead>
						<tr>
							<th>类别编号</th>
							<th>类别名称</th>
						</tr>
					</thead>
					<tbody>


						<tr v-for="cm in categoryList" v-bind:key="cm.categoryno"
							v-on:click="selectCategory(cm.categoryno,cm)"
							v-bind:class="{SelectedBG:checkSelected(cm.categoryno)}">

							<td>{{cm.categoryno}}</td>
							<td>{{cm.cname}}</td>
						</tr>


					</tbody>
				</table>

			</el-tab-pane>










			<el-tab-pane label="出版社管理" v-model="PublisherActiveName">
				<el-button type="primary" @click="addPublisher">增加</el-button>
				<el-button type="primary" @click="publisherVisible = true">修改</el-button>
				<el-button type="primary" @click="publisherDeleteVisible= true">删除</el-button>
				<el-dialog title="出版社修改" :visible.sync="publisherVisible" width="30%">
					<form class="cmxform form-horizontal style-form" @submit.prevent="updatePublisher">
						<div>
							出版社编号：{{publisherNo}}
							出版社名称：{{publisherBeforeName}}
						</div>
						<div>
							<el-input placeholder="输入修改名称" v-model="publisherBeforeName" class="form-group "></el-input>
						</div>
					</form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="publisherVisible = false">取 消</el-button>
						<el-button type="primary" @click="updatePublisher">修 改</el-button>
					</span>
				</el-dialog>
				
				
				
				<el-dialog title="出版社删除" :visible.sync="publisherDeleteVisible" width="30%">
					<form class="cmxform form-horizontal style-form" @submit.prevent="deletePublisher">
						<div>
							出版社编号：{{publisherNo}}
							出版社名称：{{publisherBeforeName}}
						</div>
				
					</form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="publisherDeleteVisible= false">取 消</el-button>
						<el-button type="primary" @click="deletePublisher">删 除</el-button>
					</span>
				</el-dialog>
				
				
			
				<table class="table">
					<thead>
						<tr>
							<th>出版社编号</th>
							<th>出版社名称</th>
						</tr>
					</thead>
					<tbody>


						<tr v-for="pm in publisherList" v-bind:key="pm.publisherid"
							v-on:click="selectPublisher(pm.publisherid,pm)"
							v-bind:class="{SelectedBG:PublishercheckSelected(pm.publisherid)}">

							<td>{{pm.publisherid}}</td>
							<td>{{pm.publishername}}</td>
						</tr>


					</tbody>
				</table>

			</el-tab-pane>

			<el-tab-pane label="退出登录">
				退出登录
			</el-tab-pane>

		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: "UserInfo",
		data() {
			return {
				CartoonAddDialog:false,
				CartoonUpdateDialog:false,
				CartoonDeleteDialog:false,
				
				dialogVisible: false,
				deleteVisible: false,
				publisherVisible:false,
				publisherDeleteVisible:false,
				
				tabPosition: 'left',
				textarea: '',
				date1: '',
				CartoonActiveName: 'Cartoonfirst',
				CategoryActiveName: 'Categoryfirst',
				PublisherActiveName: 'Publisherfirst',
				category: {
					categoryno: null,
					cname: null
				},
				addCartoonList: {
					cartoonname: null,
					author: null,
					description: null,
					cartoondate: null,
				},
				publisher:{
					publisherid:null,
					publishername:null
				},
				state: {
					stateid: null,
					sname: null
				},
				form: {
					name: '',
					number: ''
				},
				page: 1,
				count: 0,
				pageCount: 0,
				rows: 12,
				
				CartoonList:null,
				cartoonNo:null,
				UpdateCartoonList:{
					cartoonid:null,
					cartoonname:null,
					category:{
						categoryno:null,
						cname:null
					},
					description:null,
					publisher:{
						publisherid:null,
						publishername:null
					},
					state:{
						stateid:null,
						sname:null
					}
				},
				
				categoryList: null,
				categoryNo: null,
				stateList: null,
				beforeName: null,
				updatecname: null,
				
				publisherList: null,
				publisherNo: null,
				publisherBeforeName:null,
				updatepublishername:null,
				
				photo:null
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			
			uploadphoto(event) {
				this.photo = event.target.files[0];
				
			},
		

			selectCategory(no, list) { //点击TR事件处理
				this.categoryNo = no;
				this.$parent.categoryList = list;
				this.beforeName = this.$parent.categoryList.cname;
				this.$parent.categoryNo = no; //辅助给父组件的数据属性
			},
			checkSelected(no) { //检查no是否被选中
				return this.categoryNo == no;
			},
			
			
			selectCartoon(no, list) { //点击TR事件处理
				this.cartoonNo = no;
				this.$parent.cartoonList = list;
				this.UpdateCartoonList = list;
				console.log(this.UpdateCartoonList);
				//this.beforeName = this.$parent.cartoonList.cartoonname;
				this.$parent.cartoonNo = no; //辅助给父组件的数据属性
			},
			CartooncheckSelected(no) { //检查no是否被选中
				return this.cartoonNo == no;
			},
			
			
			selectPublisher(no, list) { //点击TR事件处理

				this.publisherNo = no;

				this.$parent.PublisherList = list;

				this.publisherBeforeName = this.$parent.PublisherList.publishername;

				this.$parent.publisherNo = no; //辅助给父组件的数据属性

			},

			PublishercheckSelected(no) { //检查no是否被选中

				return this.publisherNo == no;

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

			getListByCategory() {
				this.axiosJSON.get("/category/getcategory.mvc", {

				}).then(result => {

					this.categoryList = result.data.list;
					
				});
			},
			getListByState() {
				this.axiosJSON.get("/state/getstate.mvc", {

				}).then(result => {

					this.stateList = result.data.list;
				});
			},
			getListByPublisher() {
				this.axiosJSON.get("/publisher/getpublisher.mvc", {

				}).then(result => {

					this.publisherList = result.data.list;
					console.log(this.publisherList);
					this.publisher=result.data.list;
				});
			},
			
			
			addCartoon(){
				let data = new FormData(); //创建form对象
				
				data.append("cartoonname", this.addCartoonList.cartoonname);
				data.append("author", this.addCartoonList.author);
				data.append("description", this.textarea);
				data.append("cartoondate", this.addCartoonList.cartoondate);
				data.append("category.categoryno", this.category.categoryno);
				data.append("state.stateid", this.state.stateid);
				data.append("publisher.publisherid", this.publisher.publisherid);
							
				data.append("cartoonphoto",this.photo);
				this.axiosUpload.post("/cartoon/addcartoon.mvc", data, {
				
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "multipart/form-data"
					}
				
				}).then(result => {
					alert(result.data.message);
					location.reload();
				
				});
			},
			updateCartoon(){
				let data = new FormData(); //创建form对象
				data.append("cartoonid",this.UpdateCartoonList.cartoonid);
				data.append("cartoonname", this.UpdateCartoonList.cartoonname);
				data.append("author", this.UpdateCartoonList.author);
				data.append("description", this.UpdateCartoonList.description);
				data.append("cartoondate", this.UpdateCartoonList.cartoondate);
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
					location.reload();
				
				});
			},
			deleteCartoon(){
				let data = new FormData(); //创建form对象
				
				data.append("cartoonid", this.UpdateCartoonList.cartoonid);
				this.axiosUpload.post("/cartoon/deletecartoon.mvc", data, {
				
					headers: {
						"Access-Control-Allow-Origin": "*",
					}
				
				}).then(result => {
					alert(result.data.message);
					location.reload();
				
				});
			},
			
			



			addCategory() {
				this.$prompt('输入新增类别名', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({value}) => {
					let data = new FormData();
					data.append("cname", value);

					this.axiosJSON.post("/category/addcategory.mvc", data, {
						headers: {
							"Access-Control-Allow-Origin": "*",
						}

					}).then(result => {

						this.$message({
							type: 'success',
							message: '新增的类别是: ' + value
						});

					});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			},


			updateCategory() {
				let data = new FormData();
				data.append("cname", this.updatecname);
				data.append("categoryno", this.categoryNo);
				this.axiosJSON.post("/category/updatecategory.mvc", data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
					}

				}).then(result => {
					alert(result.data.message);
					location.reload();

				});
			},

			deleteCategory() {
				let data = new FormData();
				data.append("cname", this.updatecname);
				data.append("categoryno", this.categoryNo);
				this.axiosJSON.post("/category/deletecategory.mvc", data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
					}

				}).then(result => {
					alert(result.data.message);
					location.reload();

				});
			},





			addPublisher() {
				this.$prompt('输入新增出版社名', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					let data = new FormData();
					data.append("publishername", value);

					this.axiosJSON.post("/publisher/addpublisher.mvc", data, {
						headers: {
							"Access-Control-Allow-Origin": "*",
						}

					}).then(result => {

						this.$message({
							type: 'success',
							message: '新增的出版社是: ' + value
						});

					});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			},
			
			updatePublisher(){
				let data = new FormData();
				data.append("publishername", this.publisherBeforeName);
				data.append("publisherid", this.publisherNo);
				this.axiosJSON.post("/publisher/updatepublisher.mvc", data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
					}
				
				}).then(result => {
					alert(result.data.message);
					location.reload();
				
				});
			},
			
			
			
			deletePublisher(){
				let data = new FormData();
				data.append("publishername", this.publisherBeforeName);
				data.append("publisherid", this.publisherNo);
				this.axiosJSON.post("/publisher/deletepublisher.mvc", data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
					}
				
				}).then(result => {
					alert(result.data.message);
					location.reload();
				
				});
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
			this.getListByState();
			this.getListByPublisher();
			this.getListByALL();
		}

	}
</script>

<style>
	.SelectedBG {
		background-color: #FFAA00;
	}
</style>
