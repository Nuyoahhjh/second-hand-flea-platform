<template>
	<view class="goods_list">
		<goods-list @goodsItemClick="goGoodDetail" :goods="goods"></goods-list>
		<view class="isOver" v-if="flag">
			--------我是有底线的--------
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue';
	export default {
		data() {
			return {
				pageindex: 1,
				goods: [],
				flag: false,
				type:""
			}
		},
		components: {
			"goods-list": goodsList
		},
		onLoad(options) {
			this.type = options.type
			this.getItem()
		},
		// 触底触发
		onReachBottom() {
			if (this.goods.length < this.pageindex * 10) {
				return this.flag = true;
			}
			this.pageindex++
			this.getItem()
		},
		// 下拉刷新触发
		onPullDownRefresh() {
			this.pageindex = 1
			this.goods = []
			this.flag = false
			setTimeout(() => {
				this.getItem(() => {
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			// 获取分类各类的商品列表数据
			async getItem(callBack) {
				const res = await this.$myRequest({
					url: '/goods/item?pageindex=' + this.pageindex +'&type='+this.type
				})
				uni.setNavigationBarTitle({
				    title: this.type,
				});
				// 解构赋值
				this.goods = [...this.goods, ...res.data.list]
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
