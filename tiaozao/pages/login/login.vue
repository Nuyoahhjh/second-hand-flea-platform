<template>
	<view class="content">
		<view class="login">
			<h2><image :src="`${baseUrl}/uploads/tiaozao/logoRegi/diqiu.png`" mode=""></image></h2>
			<view class="item">
				<image :src="`${baseUrl}/uploads/tiaozao/logoRegi/user.png`" mode=""></image>
				<input type="text" placeholder="请输入账号" v-model="userInfo.email">
			</view>
			<view class="item">
				<image :src="`${baseUrl}/uploads/tiaozao/logoRegi/pwd.png`" mode=""></image>
				<input type="password" placeholder="请输入密码" v-model="userInfo.password">
			</view>
			<view class="submit">
				<button type="primary" class="btn" @click="submit">登录</button>
				<view class="guide">
					<view><text>忘记密码?</text></view><view>没有账号?<text @click="navigateTo('/pages/register/register')">注册</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/config.json"
	export	default({
		data(){
			return{
				userInfo:{
					email:'',
					password:'',
					
				},
				baseUrl:config.BASE_URL
			}
		},
		methods:{
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			async submit(){
				if (!this.userInfo.email || !this.userInfo.password) return uni.showToast({
					title: '账户或密码不能为空！',
					icon: 'none',
					duration: 2000
				})
				const res = await this.$myRequest({
					url:'/login',
					method:"POST",
					data:this.userInfo
				})
				// 将token存入缓存
				uni.setStorageSync('token', res.data.token);
				uni.setStorageSync('info', res.data.info);
				uni.showToast({
					title: res.data.msg,
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'../my/index'
					})
				},1000)
			}
		}
	})
</script>

<style scoped lang="scss">
	page{
		background-color: #fff;
	}
	.login{
		width: 670rpx;
		padding: 40rpx;
		h2{
			text-align: center;
			margin-top: 40rpx;
			// margin-bottom: 200rpx;
			image{
				width: 256px;
				height: 244px;
			}
		}
		.item{
			height: 140rpx;
			border-bottom: 1px solid #ccc;
			display: flex;
			align-items: center;
			margin-bottom: 50rpx;
			image{
				width: 60rpx;
				height: 60rpx;
				margin-left: 30rpx;
			}
			input{
				margin-left: 30rpx;
			}
		}
		.submit{
			margin-top: 100rpx;
			.btn{
				border-radius: 86rpx;
			}
			.guide{
				margin-top: 10rpx;
				font-size: 24rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text{
					margin-left: 4rpx;
					color: #007aff;
				}
			}
		}
	}
</style>