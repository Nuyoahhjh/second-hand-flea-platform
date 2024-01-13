<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onLoad(){
			console.log('App Load')
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	.content{
		display: flex;
		flex-direction: column;
		width: 750rpx;
	}
	page {
		background-color: #e7e8ec;
	}
	/* 轮播图小圆点样式 */
	uni-swiper .uni-swiper-dot-active {  
	    width: 30rpx !important;
		border-radius: 10rpx;
	    background-color: #fff !important;  
	}
</style>
