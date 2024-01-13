<template>
	<view class="content">
		<view class="info">
			<uni-section title="标题" type="line"></uni-section>
			<view class="">
				<input type="text" placeholder="请输入标题,最多十字" maxlength="10" v-model="itemData.title">
			</view>
		</view>
		<view class="info miaoshu">
			<uni-section title="描述" type="line"></uni-section>
			<view class="">
				<textarea v-model="itemData.des" placeholder="请输入商品描述,最多输入100字" maxlength="122" @focus='focus'
					@blur="blur" />
			</view>
		</view>
		<view class="info">
			<uni-section title="价格" type="line"></uni-section>
			<!-- <view class="">
				<text>*</text><image :src="icons[2]" mode=""></image>价格:
			</view> -->
			<view class="">
				<input type="number" placeholder="请输入价格" v-model="itemData.price">
			</view>
		</view>
		<view class="info">
			<uni-section title="原价" type="line"></uni-section>
			<!-- <view class="">
				<text>*</text><image :src="icons[3]" mode=""></image>原价:
			</view> -->
			<view class="">
				<input type="number" placeholder="请输入原价" v-model="itemData.Oprice">
			</view>
		</view>
		<view class="info">
			<uni-section title="分类" type="line"></uni-section>
			<!-- <view class="">
				<text>*</text><image :src="icons[4]" mode=""></image>分类:
			</view> -->
			<view class="">
				<select-lay v-model="itemData.type" name="fenlei" :options="datalist"
					@selectitem="selectitem"></select-lay>
			</view>
		</view>
		<view class="info">
			<uni-section title="联系方式" type="line"></uni-section>
			<!-- <view class="">
				<text>*</text><image :src="icons[5]" mode=""></image>联系方式:
			</view> -->
			<view class="">
				<input type="text" placeholder="微信/QQ/手机号码" v-model="itemData.contact">
			</view>
		</view>
		<view class="upload">
			<uni-section title="上传图片" type="line" subTitle="首张图片为封面">
				<view class="example-body">
					<uni-file-picker limit="9" title="最多选择9张图片" ref="files" :auto-upload="false"
						v-model="itemData.imageValue" @select="select" @progress="progress" @success="success"
						@delete="deletephoto" @fail="fail"></uni-file-picker>
				</view>
			</uni-section>
		</view>
		<view class="submit">
			<button type="primary" :disabled="flag" @click="submit()">确定</button>
		</view>
	</view>
</template>

<script>
	// import select_lay from "@/components/select-lay/select-lay.vue"
	import _, {
		reject
	} from 'lodash'
	export default {
		components: {
			// select_lay
		},
		data() {
			return {
				icons: [
					// "https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/publish/shop.png",
					// "https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/publish/miaoshu.png",
					// "https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/publish/jiage.png",
					// "https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/publish/yuanjia.png",
					// "https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/publish/fenlei.png",
					// "https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/publish/dianhua.png"
				],
				itemData: {
					title: '',
					des: '',
					price: null,
					Oprice: null,
					type: '',
					contact: '',
					imageValue: [],
					titleImg: ''
				},
				datalist: [],
				flag: false,
				seleteStatus:false
			}
		},
		onReady() {
			this.datalist = [{
					label: "电子设备",
					value: "电子设备"
				},
				{
					label: "衣物鞋帽",
					value: "衣物鞋帽"
				},
				{
					label: "运动健身",
					value: "运动健身"
				},
				{
					label: "文具书籍",
					value: "文具书籍"
				},
				{
					label: "生活用品",
					value: "生活用品"
				}
			];
		},
		onLoad() {
			if (!uni.getStorageSync('token')) {
				return uni.showToast({
					title: "请先登录账号！",
					icon: 'none'
				})
			}
		},
		methods: {
			focus() {

			},
			blur() {

			},
			// 下拉框选中时触发
			selectitem(index, item) {
				if (index >= 0) {
					this.itemData.type = item.value
				} else {
					this.itemData.type = ""
				}
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e);
				this.seleteStatus = true
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			async success(e) {
				console.log('上传成功', e)
				this.itemData.imageValue = e.tempFilePaths;
				this.itemData.titleImg = this.itemData.imageValue[0]
				if (!this.itemData.titleImg) {
					return uni.showToast({
						title: '商品封面是必选参数！',
						icon: 'none',
						duration: 2000
					})
				}
				const res = await this.$apiRequest("/api/v1/goods/upload", "POST", this.itemData, true)
				this.itemData = {
					title: '',
					describe: '',
					price: '',
					Oprice: '',
					type: '',
					contact: '',
					imageValue: [],
					titleImg: ''
				}
				uni.showToast({
					title: res.data.msg
				})
				this.flag = false;
				this.seleteStatus = false
				uni.hideLoading();
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
				uni.showToast({
					title: '图片上传失败，请稍后重试',
					icon: "error",
					duration: 2000
				})
				this.flag = false;
				uni.hideLoading();
			},
			deletephoto(e) {
				console.log("删除文件", e);
				this.seleteStatus = false
			},
			upload() {
				this.flag = true;
				uni.showLoading({
					title: '加载中'
				});
				this.$refs.files.upload()
			},
			async submit() {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				if (!this.itemData.title || !this.itemData.des || !this.itemData.price || !this.itemData.Oprice || !
					this.itemData.type || !this.itemData.contact) {
					return uni.showToast({
						title: '请将数据填完整！',
						icon: 'none',
						duration: 2000
					})
				}
				// 转换价格和原价为数值类型
				this.itemData.price = parseFloat(this.itemData.price);
				this.itemData.Oprice = parseFloat(this.itemData.Oprice);
				if (this.itemData.price < 0 || this.itemData.Oprice < 0) {
					return uni.showToast({
						title: '价格不能小于0！',
						icon: 'none',
						duration: 2000
					})
				}
				if (!this.seleteStatus) {
					return uni.showToast({
						title: '商品封面是必选参数！',
						icon: 'none',
						duration: 2000
					})
				}
				this.upload()
			}
			// ,
			// submit: _.throttle(async function() {
			// }, 10000),
		}
	}
</script>

<style lang="scss">
	.content {
		.info {
			padding: 0 20rpx;
			font-size: 30rpx;
			background-color: #fff;
			// display: flex;
			// justify-content: flex-start;
			// align-items: center;
			// height: 140rpx;
			margin-bottom: 10rpx;

			view {
				font-size: 36rpx;
				margin-bottom: 20rpx;

				// display: flex;
				// align-items: center;
				text {
					color: red;
					font-weight: 700;
				}

				image {
					width: 80rpx;
					height: 80rpx;
					margin-left: 4rpx;
				}

				input {
					padding: 0 20rpx;
				}
			}
		}

		.miaoshu {
			height: 500rpx;

			textarea {
				width: 710rpx;
				height: 400rpx;
				line-height: 64rpx;
				padding: 0 20rpx;
			}
		}

		.upload {
			font-size: 36rpx;
			background-color: #fff;

			.example-body {
				padding: 10px;
				padding-top: 0;
			}
		}

		.submit {
			width: 750rpx;
			margin: 2rpx 0;
		}
	}
</style>