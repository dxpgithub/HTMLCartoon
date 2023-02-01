<template>
	<div id="classification">
		<div>
			<router-link to="/cartoon/classification">
				
			
			<el-radio-group  	v-for="category in categoryList" 
								v-bind:key="category.categoryno"
								v-model="categoryList" 
								size="small" text-color="#FFFFFF" fill="#000000" >
				
				<el-radio-button label="categoryNo" >{{category.cname}}</el-radio-button>
			
			</el-radio-group>
			</router-link>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: "ClassificationArea",
		data() {
			return {
				radio1: '全部',
				categoryList:null,
				categoryNo:null
				
			};
		},
		methods:{
			getListByCategory() {
				this.axiosJSON.get("/category/getcategory.mvc", {
			
				}).then(result => {
			
					this.categoryList = result.data.list;
				});
			},
		},
		created() {
			this.getListByCategory();
			
		}
	}
</script>

<style>
</style>
