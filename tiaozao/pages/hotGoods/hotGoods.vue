<template>
	<view class="goods_list">
		<goods-list @goodsItemClick="goGoodDetail" :goods="goods"></goods-list>
		<view class="isOver" >
			--------我是有底线的--------
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue';
	export default {
		data() {
			return {
				goods: [],
				flag: false
			}
		},
		components: {
			"goods-list": goodsList
		},
		onLoad() {
			this.getHotGoodsList()
		},
		// 下拉刷新触发
		onPullDownRefresh() {
			this.goods = []
			this.flag = false
			setTimeout(() => {
				this.getHotGoodsList(() => {
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			// 获取商品列表数据
			async getHotGoodsList(callBack) { 
				const res = await this.$myRequest({
					url: '/goods/hot'
				})
				// 解构赋值
				this.goods = res.data.list
				callBack && callBack()
			},
			// 跳转到商品详情页
			goGoodDetail(id) {
				uni.navigateTo({
					url: '/pages/details/details?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		background-color: #eee;
	}

	.isOver {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 28rpx;
	}
</style>
