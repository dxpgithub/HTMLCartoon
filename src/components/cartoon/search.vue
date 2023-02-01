<template>
	<div class="classification">

		<div class="comic-list">
			<div class="comic-item" v-for="cartoon in CartoonList" v-bind:key="cartoon.cartoonid"
				style="padding-left: 5px;">
				<router-link to="/cartoon/cartoondetails">

					<div data-v-3d63eac8="" class="cover-container app-button"
						v-on:click="selectCartoon(cartoon.cartoonid, cartoon)">
						<div>
							<img :src="'http://localhost:8088/api/cartoon/showphoto.mvc?no='+cartoon.cartoonid" />
						</div>
						<div data-v-3d63eac8="" class="title">

							<div data-v-3d63eac8="" class="text">{{cartoon.cartoonname}}</div>
						</div><span data-v-3d63eac8="" class="tags">{{cartoon.author}}</span>
					</div>


				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "SearchPart",
		data() {
			return {
				CartoonList: null,
				cartoonName: null
			}
		},
		methods: {
			getByName() {



				console.log(this.cartoonName);
				this.axiosJSON.get("/cartoon/showByName.mvc", {
					params: {
						cartoonName: this.cartoonName
					}
				}).then(result => {
					this.CartoonList = result.data.list;
					if (this.CartoonList != null) {
						alert(result.data.message);
						console.log(this.CartoonList);
						this.$parent.CartoonList = this.CartoonList;
						this.cartoonName = null;


					}


				});

			},


			selectCartoon(no, list) { //点击TR事件处理
				this.CartoonId = no;
				this.$parent.CartoonList = list;
				this.$parent.CartoonId = no; //辅助给父组件的数据属性

			}

		},
		created() {
			this.cartoonName = this.$parent.cartoonName;
			this.getByName();

		}

	}
</script>

<style>
</style>
