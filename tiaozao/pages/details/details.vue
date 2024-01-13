<template>
	<view class="goods_detail">
		<!-- <swiper :indicator-dots="true" v-if="swipers!=''">
			<swiper-item v-for="item in swipers" :key="item.id" @click="prevImg(item)">
				<image :src="item" alt="">
			</swiper-item>
		</swiper> -->
		<view class="box1">
			<view class="price">
				<text>￥{{detail.price}}</text>
				<text>￥{{detail.Oprice}}</text>
			</view>
			<view class="goods_name">
				{{detail.title}}
			</view>
			<view class="content">
				<rich-text :nodes="detail.des"></rich-text>
			</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<view class="image" v-for="item in swipers" :key="item.id" @click="prevImg(item)">
				<image :src="item" alt="" mode="widthFix">
			</view>
			<!-- <view class="tit">详情介绍</view>
			<view class="content">
				<rich-text :nodes="detail.des"></rich-text>
			</view> -->
		</view>
		<view class="chat">
			<view class="tit">{{this.messages.length}}条留言</view>
			<view class="input">
				<image :src="baseUrl + userInfo.avatarUrl" mode=""></image>
				<input type="text" placeholder="看对眼就留言,问问更多细节~" v-model="message">
				<image @click="send" class="send" src="../../static/send.png" mode=""></image>
			</view>
			<view class="data">
				<view v-for="(item,index) in messages" :key="index" class="list">
					<image :src="baseUrl + item.avatarUrl" mode=""></image>
					<view class="msg">
						<view class="nickName">{{item.nickName}} <text>·{{fromtData(item.createdAt)}}</text></view>
						<rich-text :nodes="item.message"></rich-text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="line">

			</view>
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		<!-- 普通弹窗 -->
		<uni-popup ref="popup">
			<view style="background-color: #fff;" @click="copy(detail.contact)">联系方式（点击复制）：{{detail.contact}}</text>
			</view>
		</uni-popup>
		<!-- 分享 -->
		<uni-popup ref="sharepopup" type="bottom">
			<share-btn :sharedataTemp="sharedata"></share-btn>
		</uni-popup>
	</view>
</template>

<script>
	import uniGoodsNav from '@/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import shareBtn from '../../components/share-btn/share-btn.vue';
	import {
		parseInt
	} from 'lodash';
	import config from "@/config.json"
	export default {
		data() {
			return {
				baseUrl:config.BASE_URL,
				id: 0,
				swipers: [],
				detail: {},
				detailContent: {},
				options: [{
						icon: 'redo-filled',
						text: '分享'
					},
					{
						icon: 'phone-filled',
						text: '联系',
						infoBackgroundColor: '#007aff',
						infoColor: "red"
					}
				],
				buttonGroup: [{
					text: '收藏',
					backgroundColor: '#ff0000',
					color: '#fff'
				}],
				type: 'center',
				sharedata: {
					type: 1,
					strShareUrl: "",
					strShareTitle: "",
					strShareSummary: "",
					strShareImageUrl: ""
				},
				message: '',
				userInfo: null,
				messages: []
			}
		},
		components: {
			"uni-goods-nav": uniGoodsNav,
			uniPopup,
			shareBtn
			// shareBtn
		},
		onLoad(options) {
			this.id = options.id
			this.getSwipers()
			this.geeGoodsDetail()
			this.addHot()
			this.getMessage()
		},
		onShow() {
			this.userInfo = uni.getStorageSync('info')
		},
		methods: {
			async getSwipers() {
				const res = await this.$myRequest({
					url: "/lunbo/detail?id=" + this.id
				})
				if (res.data.list[0].image) {
					this.swipers = res.data.list[0].image.split("'hjh'")
				}
			},
			async geeGoodsDetail() {
				const res = await this.$myRequest({
					url: '/goods/info?id=' + this.id
				})
				this.detail = res.data.list[0]
			},
			async addHot() {
				await this.$apiRequest("/goods/addhot?id=" + this.id, "GET")
			},
			onClick(e) {
				if (e.index === 0) {
					let pages = getCurrentPages() // 获取栈实例
					let currentRoute = pages[pages.length - 1].route; // 获取当前页面路由
					this.sharedata = {
						type: 1,
						strShareUrl: "http://tiaozao.ithejunhao.fun/#/" + currentRoute + '?id=' + this.id,
						// strShareUrl: "http://192.168.0.2:8080/#/"+currentRoute+'?id='+this.id,
						// strShareUrl: "http://192.168.0.3:8080/#/"+currentRoute+'?id='+this.id,
						strShareTitle: this.detail.title,
						strShareSummary: this.detail.des,
						strShareImageUrl: this.swipers[0]
					}
					this.$refs.sharepopup.open();
				}
				if (e.index === 1) {
					this.$refs.popup.open(this.type)
				}
			},
			buttonClick(e) {
				if (e.index === 0) {
					this.addCollect()
				}
			},
			prevImg(item) {
				item = Array(item)
				// 预览图片
				uni.previewImage({
					urls: item
				});
			},
			copy(data) {
				uni.setClipboardData({
					data, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
					}
				});
			},
			// 加入收藏
			async addCollect() {
				const id = parseInt(this.id)
				const goodsInfo = {
					id,
					goods_title: this.detail.title,
					goods_des: this.detail.des,
					goods_price: this.detail.price,
					goods_image: this.swipers[0]
				}
				const res = await this.$apiRequest("/api/v1/addcollect", "post", goodsInfo, true)
				if (res.data.code === 200) {
					uni.showToast({
						title: res.data.msg
					})
				}
			},
			async send() {
				if (!this.message) {
					return uni.showToast({
						title: "请输入文字内容",
						icon: 'none'
					})
				}
				const id = parseInt(this.id)
				const res = await this.$apiRequest("/api/v1/SendMessage", "put", {
					shopid: id,
					message: this.message
				}, true)
				if (res.data.code === 200) {
					uni.showToast({
						title: res.data.msg
					})
					this.message = ''
					this.getMessage()
				}
			},
			async getMessage() {
				const res = await this.$myRequest({
					url: "/goods/GetMessages?id=" + this.id
				})
				this.messages = res.data.list
			},
			fromtData(dateStr) {
				const date = new Date(dateStr);
				const now = new Date();
				const diff = (now - date) / 1000; // 时间差，单位为秒
				let str = ''
				if (diff < 60) {
					str = "刚刚"
				} else if (diff < 3600) {
					str = `${Math.floor(diff/60)} 分钟前`
				} else if (diff < 86400) {
					str = `${Math.floor(diff/3600)} 小时前`
				} else {
					str = `${Math.floor(diff/86400)} 天前`
				}
				return str
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.goods_detail {

		// height: 100%;
		// background-color: #fff;
		swiper {
			height: 600rpx;
		}

		image {
			width: 100%;
			height: 100%;
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: $shop-color;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.box2 {
			padding: 0 20rpx;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.box3 {
			// padding-bottom: 50px;
			border-bottom: 1px solid #eee;

			.tit {
				font-size: 32rpx;
				padding-left: 20rpx;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 20rpx;
				font-size: 28rpx;
				color: #333;
				line-height: 50rpx;

				.gomeImgLoad::v-deep {
					width: 700rpx;
					height: auto;
				}
			}
		}
	}

	.chat {
		padding: 20rpx;

		.tit {
			font-weight: 700;
			height: 40px;
			line-height: 40px;
		}

		.input {
			display: flex;
			align-items: center;
			justify-content: space-around;
			position: relative;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
			}

			input {
				height: 20rpx;
				background-color: #e6e6e6;
				border-radius: 50rpx;
				padding: 10rpx 80rpx 10rpx 40rpx;
				width: 500rpx;
			}

			.send {
				scale: 0.7;
				position: absolute;
				right: 0;
			}
		}

		.data {
			padding-bottom: 60px;

			.list {
				margin-top: 20rpx;
				margin-left: 10rpx;
				display: flex;
				align-items: center;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 30rpx;
				}

				.msg {
					display: flex;
					flex-direction: column;
					font-size: 20rpx;

					.nickName {
						font-size: 26rpx;
						color: #868686;

						text {
							margin-left: 10rpx;
						}
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.line {
		height: 10rpx;
		width: 750rpx;
		background-color: #eee;
	}
</style>