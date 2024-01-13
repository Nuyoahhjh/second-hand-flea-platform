<template>
	<view class="content">
		<view class="login">
			<h2><image :src="`${baseUrl}/uploads/tiaozao/logoRegi/caihong.png`"  mode=""></image></h2>
			<view class="item">
				<image :src="`${baseUrl}/uploads/tiaozao/logoRegi/user.png`" mode=""></image>
				<input type="email" placeholder="请输入邮箱" v-model="userForm.email">
			</view>
			<view class="item">
				<image :src="`${baseUrl}/uploads/tiaozao/logoRegi/pwd.png`" mode=""></image>
				<input type="password" placeholder="请输入密码" v-model="userForm.password">
			</view>
			<view class="item">
				<image :src="`${baseUrl}/uploads/tiaozao/logoRegi/pwd.png`" mode=""></image>
				<input type="password" placeholder="请再次输入密码" v-model="userForm.twoPassword">
			</view>
			<view class="item">
				<image :src="`${baseUrl}/uploads/tiaozao/logoRegi/yzm.png`" mode=""
				 style="width: 80rpx;height: 80rpx;margin-left: 20rpx;"></image>
				<input type="text" style="margin-left: 10rpx;"  v-model="userForm.yzm">
				<button type="primary" size="mini" @click="sendEmail" :disabled="sendEmaliFlag">获取验证码</button>
			</view>
			<view class="submit">
				<button type="primary" class="btn" @click="regi" :disabled="regiFlag">注册</button>
				<view class="guide">
					<view>注册代表同意 <text>ithejunhao用户服务协议、隐私政策</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/config.json"
	export default({
		data(){
			return{
				baseUrl:config.BASE_URL,
				userForm:{
					email:'',
					password:'',
					twoPassword:'',
					yzm:''
				},
				sendEmaliFlag:false,
				regiFlag:false,
				// 后端返回的正确验证码
				code:'',
				// 接受验证码的邮箱
				Email:''
			}
		},
		methods:{
			async regi(){
				const {email,password,twoPassword,yzm} = this.userForm
				if(password !== twoPassword || !password || !twoPassword){
					return uni.showToast({
						title: '两次输入密码不同！',
						icon: 'none',
						duration: 2000
					})
				}
				if(yzm === this.code && email === this.Email){
					this.regiFlag = false
					const res = await this.$myRequest({
						url:'/register',
						method:"POST",
						data:this.userForm
					})
					this.regiFlag = true
					uni.showToast({
						title: res.data.msg,
					})
					setTimeout(()=>{
						this.navigateTo('/pages/login/login')
					},1000)
				}else{
					return uni.showToast({
						title: '验证码错误',
						icon: 'none',
						duration: 2000
					})
				}
			},
			async sendEmail(){
				const {email} = this.userForm
				let emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
				if(emailReg.test(email) == false){
					return uni.showToast({
						title: '邮箱格式不正确！',
						icon: 'none',
						duration: 2000
					})
				}
				const res = await this.$myRequest({
					url:'/sendemail',
					method:"POST",
					data:{email}
				})
				this.code = res.data.yzm
				this.Email = res.data.email
				this.sendEmaliFlag = true
				uni.showToast({
					title: res.data.message
				})
			},
			navigateTo(url) {
				uni.navigateTo({
					url
				})
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
			// margin-top: 20rpx;
			// margin-bottom: 200rpx;
			image{
				width: 256px;
				height: 244px;
			}
		}
		.item{
			height: 120rpx;
			border-bottom: 1px solid #ccc;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
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