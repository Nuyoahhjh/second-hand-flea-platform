<template>
	<view class="content">
		<view class="login" v-if="!userInfo">
			<view class="border">
				<button @click="redirectTo('/pages/login/login')">登录</button>
			</view>
		</view>
		<view class="login" v-if="userInfo" :style="{backgroundImage: 'url('+ baseUrl + userInfo.avatarUrl
 + ')','background-repeat':'no-repeat', 
                 backgroundSize:'100% 100%'}">
			<view class="zzc"></view>
			<view class="online">
				<image :src="baseUrl + userInfo.avatarUrl" mode=""></image>
				<text>{{userInfo.nickName}}</text>
			</view>
		</view>
		<view class="nav">
			<view v-for="(item,index) in navIcon" :key="index">
				<image :src="item.icon" mode=""></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="myFunction">
			<view v-for="(item,index) in myfashoulian" :key="index" @click="navigateTo(item.goUrl)">
				<image :src="item.icon" mode=""></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="exitLogin">
			<button type="warn" @click="exit">退出登录</button>
		</view>
	</view>
</template>

<script>
	import config from "@/config.json"
	export default {
		data() {
			return {
				baseUrl:config.BASE_URL,
				navIcon:[
					{
						icon:config.BASE_URL+'/uploads/tiaozao/my/purchase.png',
						title:'已买到'
					},{
						icon:config.BASE_URL+'/uploads/tiaozao/my/sell.png',
						title:'已卖出'
					},{
						icon:config.BASE_URL+'/uploads/tiaozao/my/Shopping.png',
						title:'购物车'
					}
				],
				myfashoulian:[
					{
						icon:config.BASE_URL+'/uploads/tiaozao/my/MyPublishing.png',
						title:'我发布的',
						goUrl:'/pages/myPublish/myPublish'
					},{
						icon:config.BASE_URL+'/uploads/tiaozao/my/collect.png',
						title:'收藏列表',
						goUrl:'/pages/collect/collect'
					},{
						icon:config.BASE_URL+'/uploads/tiaozao/my/service.png',
						title:'联系客服',
						goUrl:'/pages/collect/collect'
					}
				],
				userInfo:{
					
				}
			}
		},
		onShow(){
			this.userInfo = uni.getStorageSync('info')
		},
		onLoad() {
			// this.userInfo = uni.getStorageSync('info')
			// this.getInfo()
		},
		methods: {
			async getInfo(){
				const res = await this.$apiRequest('/api/yanzheng','GET')
				if(res.data.status === 0){
					this.userInfo = res.data.info
				}
			},
			redirectTo(url){
				uni.redirectTo({
					url
				})
			},
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			getLogin() {
				return new Promise((resolve, reject) => {
					uni.login({
						success(res) {
							console.log(res, 'res')
							resolve(res)
						},
						fail: (err) => {
							console.log(err, 'logoer')
							reject(err)
						}
					})
				})
			},
			exit(){
				uni.clearStorage()
				setTimeout(()=>{
					this.userInfo = ""
				},500)
				// this.redirectTo('/pages/login/login')
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		.login{
			height: 577rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #d9d9d9;
			// filter: blur(15px);
			position: relative;
			.border{
				z-index: 999;
				position: absolute;
				width: 500rpx;
				height: 160rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 6rpx solid #ffffcc;
				border-radius: 14rpx;
				button{
					width: 440rpx;
					background-color: #d9d9d9;
					border: 7rpx solid #ffffcc;
					color: #ffffcc;
					font-weight: 700;
				}
			}
			.online{
				z-index: 999;
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				height: 260rpx;
				image{
					width: 160rpx;
					height: 160rpx;
					border-radius: 80rpx;
				}
				text{
					color: #fff;
					font-size: 40rpx;
				}
			}
			.zzc{
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.4);
				z-index: 900;
				// background-color: red;
			}
		}
		image{
			width: 70rpx;
			height: 70rpx;
		}
		.nav{
			width: 750rpx;
			background-color: #fff;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-around;
			padding: 30rpx 0;
			view{
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				text{
					margin-top: 10rpx;
					color: #515151;
					font-weight: 700;
				}
			}
			
		}
		.myFunction{
			margin-top: 20rpx;
			background-color: #fff;
			view{
				padding: 30rpx 40rpx;
				display: flex;
				align-items: center;
				border-bottom: 6rpx solid #d9d9d9;
				text{
					margin-left: 30rpx;
					font-size: 40rpx;
					color: #515151;
					font-weight: 700;
				}
			}
		}
		.exitLogin{
			margin-top: 10rpx;
			// position: absolute;
			// width: 100%;
			// bottom: 0;
		}
	}
</style>
