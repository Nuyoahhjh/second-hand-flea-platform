<template>
	<view class="content">
		<view class="line">
			<view></view>我的收藏列表<text>(长按可删除)</text>
		</view>
		<view class="occupy"></view>
		<view class="goods" v-for="(item,index) in goods" :key="index" @click="navigateTo('/pages/details/details?id=' + item.id)" @longpress="longpress(item.id,item.goods_title)">
			<view class="left">
				<image :src="item.goods_image" mode=""></image>
			</view>
			<view class="right">
				<view class="title">
					{{item.goods_title}}
				</view>
				<view class="des">
					{{item.goods_des.slice(0,15)}}<text v-if="item.goods_des.length>=15">...</text>
				</view>
				<view class="price">
					￥{{item.goods_price}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:[]
			}
		},
		onLoad(){
			this.getCollect()
		},
		methods:{
			async getCollect(){
				const res = await this.$apiRequest('/api/v1/GetCollect','GET')
				this.goods = res.data.list
				this.goods.reverse()
			},
			async deleteCollect(id){
				const res = await this.$apiRequest("/api/v1/DelCollect","DELETE",{id},true)				
				this.getCollect()
				uni.showToast({
					title: res.data.msg
				})				
			},
			longpress(id,title){
				let thisObject = this
				uni.showModal({
					title,
					content: '确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							thisObject.deleteCollect(id)
						} else{
						}
					}
				});
			},
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		.line{
			width: 750rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			background-color: #ffffcc;
			position: fixed;
			z-index: 999;
			view{
				width: 6rpx;
				height: 40rpx;
				background-color: #b50e03;
				margin-left: 10rpx;
				margin-right: 20rpx;
			}
			text{
				font-size: 20rpx;
				margin-left: 20rpx;
				color: #ccc;
			}
		}
		.occupy{
			height: 90rpx;
		}
		.goods{
			width: 710rpx;
			padding: 10rpx;
			background-color: #fff;
			border-radius: 20rpx;
			margin-bottom: 10rpx;
			display: flex;
			justify-content: space-between;
			.left{
				// width: 240rpx;
				width: 30%;
				height: 240rpx;
				image{
					width: 100%;
					height: 100%;
					// border: 1rpx solid black;
				}
			}
			.right{
				// width: 500rpx;
				width: 68%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.title{
					font-weight: 700;
					font-size: 36rpx;
				}
				.des{
					font-size: 30rpx;
				}
				.price{
					color: $shop-color;
				}
			}
		}
	}
</style>