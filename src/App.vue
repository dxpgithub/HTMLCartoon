<template>

	<div id="app">
		<header-area></header-area>

		<top-area></top-area>

		
		
		<router-view>
			
		</router-view>
	
		<footer-area></footer-area>
	

	</div>
</template>

<script>
	import TopArea from "./components/common/top.vue";
	

	import FooterArea from "./components/common/footer.vue";
	
	import HeaderArea from "./components/common/header.vue"
	
	export default {
		name: 'App',
		components: {

			"top-area": TopArea,
			"header-area": HeaderArea,
		
			"footer-area": FooterArea

		},
	}
</script>

<style>
	@import url("components/css/style.css");
	@import url("components/css/user.css");
	@import url("components/css/style-responsive.css");
	@import url("components/css/table-responsive.css");
	@import url("components/css/to-do.css");
	@import url("components/css/zabuto_calendar.css");

	@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
	@import url("components/js/advanced-datatable/css/DT_bootstrap.css");
	@import url("components/js/advanced-datatable/css/demo_page.css");
	@import url("components/js/advanced-datatable/css/demo_table.css");
	@import url("components/js/advanced-datatable/css/demo_table_jui.css");
	@import url("components/js/advanced-datatable/css/jquery.dataTables_themeroller.css");
	@import url("components/js/bootstrap-datepicker/css/datepicker.css");
	@import url("components/js/bootstrap-daterangepicker/daterangepicker-bs3.css");
	@import url("components/js/bootstrap-daterangepicker/daterangepicker.css");
	@import url("components/js/bootstrap-datetimepicker/css/datetimepicker.css");
	@import url("components/js/bootstrap-fileupload/bootstrap-fileupload.css");
	@import url("components/js/bootstrap-timepicker/compiled/timepicker.css");
	@import url("components/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css");
	@import url("components/js/bootstrap/css/bootstrap.css");
	@import url("components/js/bootstrap/css/bootstrap.min.css");
	@import url("components/js/advanced-datatable/css/jquery.dataTables.css");
</style>
