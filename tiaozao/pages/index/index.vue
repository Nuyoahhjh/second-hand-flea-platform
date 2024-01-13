<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="search">
			<input type="text" placeholder="请输入商品关键字">
			<image :src="`${baseUrl}/uploads/tiaozao/search.png`" mode=""></image>
		</view>
		<!-- 轮播 -->
		<view class="lunbo">
			<view class="lunbotitle">
				<image src="http://cj.ithejunhao.fun/static/img/logo2.613abb2.png" mode=""></image><text>*********中学</text>
			</view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000">
				<swiper-item v-for="item in lunbos" :key="item.id">
					<view class="swiper-item"><image :src="baseUrl + item.imgUrl" mode=""></image></view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航栏 -->
		<view class="shop">
			<view class="status" v-for="item in shopStatus" :key="item.id" @click="navigateTo(item.goUrl)">
				<image :src="baseUrl+item.imgUrl" mode=""></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 商品分类 -->
		<view class="title">
			<text>商品分类</text>
			<image :src="`${baseUrl}/uploads/tiaozao/classify/more.png`" mode=""></image>
		</view>
		<view class="shopClassify">
			<view class="neirong" v-for="item in classify" :key="item.id" :style="{backgroundImage: 'url(' +baseUrl+ item.imgUrl + ')','background-repeat':'no-repeat', 
                 backgroundSize:'100% 100%'}" @click="gofenleiDetail(item.title)">
				 <view class="zzc"></view>
				<text class="jianshao">{{item.title}}<br>————<br><text class="xi">超值入手</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/config.json"
	export default {
		data() {
			return {
				lunbos:[],
				shopStatus:[],
				classify:[],
				baseUrl:config.BASE_URL
			}
		},
		onLoad() {
			this.getLunbo()
			this.getNav()
			this.getAllsort()
		},
		methods: {
			async getLunbo(){
				const res = await this.$myRequest({
					url:'/lunbo'
				})
				this.lunbos = res.data.list;
			},
			async getNav(){
				const res = await this.$myRequest({
					url:'/nav'
				})
				this.shopStatus = res.data.list;
			},
			async getAllsort(){
				const res = await this.$myRequest({
					url:'/allsort'
				})
				this.classify = res.data.list;
			},
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			gofenleiDetail(type){
				uni.navigateTo({
					url: '/pages/item/item?type=' + type
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.search{
			width: 750rpx;
			height: 100rpx;
			background-color: #ffffcc;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			z-index: 999;
			input{
				width: 580rpx;
				height: 60rpx;
				background-color: #fff;
				border: 1px solid #e48f8f;
				border-radius: 30rpx;
				padding: 0 80rpx 0 30rpx;
			}
			image{
				position: absolute;
				width: 50rpx;
				height: 50rpx;
				right: 50rpx;
			}
		}
		.lunbo{
			margin-top: 100rpx;
			width: 750rpx;
			.lunbotitle{
				width: 710rpx;
				padding: 10rpx 20rpx;
				background-color: #fff;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				text{
					margin-left: 10rpx;
					font-size: 28rpx;
					font-weight: 700;
				}
			}
			swiper{
				width: 750rpx;
				height: 380rpx;
				overflow: hidden;
				image{
					width: 100%;
				}
			}
		}
		.shop{
			width: 750rpx;
			padding: 20rpx 0;
			background-color: #fff;
			display: flex;
			justify-content: space-around;
			.status{
				width: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				image{
					width: 100rpx;
					height: 100rpx;
				}
			}
		}
		.title{
			width: 710rpx;
			height: 100rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				width: 100rpx;
				height: 100rpx;
				// margin-top: -40rpx;
			}
		}
		.shopClassify{
			width: 750rpx;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			.neirong{
				width: 340rpx;
				height: 300rpx;
				margin-bottom: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				.jianshao{
					// position: absolute;
					// left: 50%;
					// top: 50%;
					// transform: translate(-50%,-50%);
					z-index: 901;
					color: #fff;
					font-size: 36rpx;
					font-weight: 700;
					.xi{
						font-weight: 400;
						text-align: center;
						color: #ebebeb;
					}
				}
				.zzc{
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.2);
					z-index: 900;
					// background-color: red;
				}
			}
		}
	}
</style>
