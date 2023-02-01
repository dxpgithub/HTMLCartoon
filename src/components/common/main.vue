<template>

	<div id="main">
		<rotation-area></rotation-area>
		<classification-area></classification-area>
		<section id="main-content">
			<section class="wrapper site-min-height">


				<div>


					<h1>新作推荐</h1>
					<div class="comic-list">
						<div class="comic-item" v-for="desctime in DescTimeList" v-bind:key="desctime.cartoonid">
							<router-link to="/cartoon/cartoondetails">
								<div data-v-3d63eac8="" class="cover-container app-button"
									v-on:click="selectCartoon(desctime.cartoonid, desctime)"
									v-bind:class="{SelectedBG:checkSelected(desctime.cartoonid)}">
									<div>
										<img
											:src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+desctime.cartoonid" />
									</div>
									<div data-v-3d63eac8="" class="title">
										<!---->
										<!---->
										<div data-v-3d63eac8="" class="text">{{desctime.cartoonname}}</div>
									</div><span data-v-3d63eac8="" class="tags">{{desctime.author}}</span>
								</div>
							</router-link>
						</div>
					</div>




					<h1>异世之旅</h1>
					<div class="comic-list">
						<div class="comic-item" v-for="anotherworld in anotherworldList"
							v-bind:key="anotherworld.cartoonid">
							<router-link to="/cartoon/cartoondetails">
								<div data-v-3d63eac8="" class="cover-container app-button"
									v-on:click="selectCartoon(anotherworld.cartoonid, anotherworld)"
									v-bind:class="{SelectedBG:checkSelected(anotherworld.cartoonid)}">
									<div>
										<img
											:src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+anotherworld.cartoonid" />
									</div>
									<div data-v-3d63eac8="" class="title">
										<!---->
										<!---->
										<div data-v-3d63eac8="" class="text">{{anotherworld.cartoonname}}</div>
									</div><span data-v-3d63eac8="" class="tags">{{anotherworld.author}}</span>
								</div>
							</router-link>
						</div>
					</div>



					<h1>搞笑都市</h1>
					<div class="comic-list">
						<div class="comic-item" v-for="urban in urbanList" v-bind:key="urban.cartoonid">
							<router-link to="/cartoon/cartoondetails">
								<div data-v-3d63eac8="" class="cover-container app-button"
									v-on:click="selectCartoon(urban.cartoonid, urban)"
									v-bind:class="{SelectedBG:checkSelected(urban.cartoonid)}">
									<div>

										<img
											:src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+urban.cartoonid" />
									</div>
									<div data-v-3d63eac8="" class="title">
										<!---->
										<!---->
										<div data-v-3d63eac8="" class="text">{{urban.cartoonname}}</div>
									</div><span data-v-3d63eac8="" class="tags">{{urban.author}}</span>
								</div>
							</router-link>
						</div>
					</div>




				</div>



			</section>

		</section>
	</div>
</template>

<script>
	import RotationArea from "./Rotation.vue";
	import ClassificationArea from "./classification.vue";
	export default {
		name: "MainArea",
		components: {
			"rotation-area": RotationArea,
			"classification-area": ClassificationArea
		},
		data() {
			return {
				DescTimeList: {
					cartoonid: 0,
					cartoonname: null,
					author: null,
					description: null,
					cartoondate: null,
					photo: null

				},

				urbanList: {
					cartoonid: 0,
					cartoonname: null,
					author: null,
					description: null,
					cartoondate: null,
					photo: null

				},


				anotherworldList: {
					cartoonid: 0,
					cartoonname: null,
					author: null,
					description: null,
					cartoondate: null,
					photo: null

				},

				CartoonList: null,
				CartoonId: null,

				urbanName: "都市",
				anotherworldName: "奇幻",
				photoUri: "",
				UserInfo: null,

			};
		},
		methods: {
			/*
			seeShare() {

				let routeUrl = this.$router.resolve({

					path: "/cartoondetails",

					name: "cartoondetails",
					query: {
						goodsId: '1111'
					}

				});

				window.open(routeUrl.href, '_blank');
			},
			*/
			/*
			 *	按日期降序取6个
			 */

			getListByTime() {
				this.axiosJSON.get("/cartoon/showByTime.mvc", {

				}).then(result => {

					this.DescTimeList = result.data.list;


				});
			},

			/*
			 *取得都市分类列表6个
			 */
			getListByTypeIsUrban() {
				this.axiosJSON.get("/cartoon/showByType.mvc", {
					params: {
						typename: this.urbanName
					},

				}).then(result => {

					this.urbanList = result.data.list;



				});
			},

			/*
			 * 取得异世界列表6个
			 */
			getListByTypeIsAnotherWorld() {
				this.axiosJSON.get("/cartoon/showByType.mvc", {
					params: {
						typename: this.anotherworldName
					},

				}).then(result => {
					this.anotherworldList = result.data.list;
				});
			},

			selectCartoon(no, list) { //点击TR事件处理
				this.CartoonId = no;
				this.$parent.CartoonList = list;
				this.$parent.CartoonId = no; //辅助给父组件的数据属性

			},

			checkSelected(no) { //检查no是否被选中
				return this.CartoonId == no;

			}






		},
		//离开路由
		beforeRouteLeave(to, from, next) {

			if (to.name == "cartoondetails") {
				if (this.CartoonId == null) {
					alert("请先选择漫画!");
					next(false);
				} else {
					next();
				}

			} else {
				next();
			}

		},
		created() {
			this.getListByTime();
			this.getListByTypeIsUrban();
			this.getListByTypeIsAnotherWorld();
			
			
			
			this.UserInfo = this.$store.getters.getLoginUser;
			this.$store.dispatch("setLoginUser", this.UserInfo); //通过Vuex状态存储登录的用户信息
			this.UserLoginStatus = "OK";
			console.log(this.UserInfo);
			
		}


	}
</script>

<style>

</style>
