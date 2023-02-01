<template>
	<header class="header black-bg">
		<div class="sidebar-toggle-box">
			<div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
		</div>





		<!--logo start-->
		<a class="logo">
			<b>
				<router-link to="/main">
					<img src="../img/diary.jpg" style="height: 35px; border-radius: 12px;" />
				</router-link>
				<span>
					CitySSM漫画
				</span>
			</b>
		</a>



		<!--logo end-->
		<div>
			<ul class="top-menu">
				<li>
					<router-link to="/main">

						<el-button style="font-size: 18px;" type="text">首页</el-button>

					</router-link>
				</li>

				<li>
					<router-link to="/cartoon/serialization">

						<el-button style="font-size: 18px;" type="text">火热连载</el-button>
					</router-link>
				</li>

				<li>
					<router-link to="/cartoon/finish">

						<el-button style="font-size: 18px;" type="text">经典完结</el-button>
					</router-link>
				</li>
				<li>
					<!---->

					<router-link :to="{name:'userinfo'}" tag="a" target="_blank">
						<i class="fa fa-dashboard"></i>
						<el-button style="font-size: 18px;" type="text">

							个人中心

						</el-button>
					</router-link>


				</li>

			</ul>
		</div>



		<div class="nav pull-right top-menu">
			<ul class="top-menu">

				<li>
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div class="container-fluid">
							<form class="d-flex" @submit.prevent="getByName">
								<input type="text" v-model="cartoonName" placeholder="你想要的都在这里" width="200px"
									name="searchname">

								<button class="btn btn-info btn-sm" type="submit" style="margin-left: 8px;">搜索</button>

							</form>
						</div>
					</nav>
				</li>



			</ul>
		</div>
	</header>
</template>

<script>
	export default {
		name: "HeaderArea",
		data() {
			return {
				CartoonList: null,
				cartoonName: null
			}
		},
		methods: {
			open() {

				let routeUrl = this.$router.resolve({

					path: "/user/info",

					name: "userinfo",

				});
				window.open(routeUrl.href, '_blank');
			},

			getByName() {

				this.$parent.cartoonName = this.cartoonName;

				this.$router.push({
					path: "/cartoon/search"
				});

			}

		},





		/*
		
		*/









	}
</script>

<style>
</style>
