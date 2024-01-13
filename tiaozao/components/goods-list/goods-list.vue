<template>
	<view class="goods_list">
		<view class="goods_item" v-for="item in goods" :key="item.id" @click="navigator(item.id)">
			<view class="zzc" v-if="item.is_status == 1">
				<view class="">
					<text>已下架</text>
				</view>
			</view>
			<image class="titleImg" :src="item.titleImg" mode="aspectFill"></image>
			<image class="hot" src="https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/Hot_hot.png"
				mode="" v-if="item.view >= 600"></image>
			<view class="price">
				<text>￥{{item.price}}</text>
				<text>￥{{item.Oprice}}</text>
			</view>
			<view class="name">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods'],
		methods: {
			navigator(id) {
				this.$emit('goodsItemClick', id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods_item {
			background-color: #fff;
			width: 355rpx;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;
			position: relative;

			.hot {
				position: absolute;
				top: 14rpx;
				// bottom: 70rpx;
				right: 0;
				width: 90rpx;
				height: 90rpx;
			}
			
			.titleImg {
				width: 100%;
				height: 150px;
			}
			.price {
				color: $shop-color;
				font-size: 36rpx;
				margin: 20rpx 0 5rpx 0;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}

			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}

			.zzc {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 900;
				display: flex;
				justify-content: center;
				align-items: center;

				view {
					background-color: #716d6e;
					width: 130rpx;
					height: 80rpx;
					border-radius: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					transform: rotate(-14deg);

					text {
						color: #fff;
						border: 4rpx solid #595556;
						padding: 6rpx;
						// box-sizing:border-box;
					}
				}

			}
		}
	}
</style>