<template>
	<div id="rotation">
		<el-carousel :height="bannerHeight + 'px'"  :interval="4000" type="card">
			<el-carousel-item v-for="item in imgwrap" :key="item.url">
				<img :src="item.url" class="bannerimg" />
			</el-carousel-item>
		</el-carousel>
	</div>

</template>

<script>
	export default {
		name: "RotationArea",
		data() {
			return {
				bannerHeight: 200,
				imgwrap: [{
						url: require("../img/cartoon/rotationone.jpg")
					},
					{
						url: require("../img/cartoon/rotationtwo.png")
					},
					{
						url: require("../img/cartoon/rotationthree.jpg")
					},
					{
						url: require("../img/cartoon/rotationfour.jpg")
					},
					
				]
			}
		},
		mounted() {
			this.setSize();
			window.addEventListener('resize', () => {
				this.setSize();
			}, false);
		},
		methods: {
			setSize() {
				this.bannerHeight = document.body.clientWidth / 4
			}
		}
	}
</script>

<style>
	.bannerimg {
		width: 100%;
		height: 500px;
	}
</style>
