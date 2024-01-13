<template>
  <view class="item" >
	<view class="item_title" v-if="flag != 0">
		<view><image src="https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/my/xiajia.png" mode=""></image><text>主动下架</text></view>
		<view>下架原因 ></view>
	</view>
	<view class="detail" @click="navigateTo('/pages/details/details?id=' + itemData.id)">
		<view class="left">
			<image :src="itemData.titleImg" mode=""></image>
		</view>
		<view class="right">
			<view class="">
				<view class="title">
					{{itemData.title}}
				</view>
				
				<view class="price">
					￥{{itemData.price}}
				</view>
			</view>
			
			<view class="glance">
				浏览{{itemData.view}}
			</view>
		</view>
	</view>
	<view class="function">
		<view class="left">
			<view class="">
				更多
			</view>
		</view>
		<view class="right">
			<template v-if="flag == 0">
				<view class="btn" @click="edit">
					编辑
				</view>
				<view class="btn" @click="undercarriage">
					下架
				</view>
			</template>
			<template v-if="flag != 0">
				<view class="btn">重新上架</view>
			</template>
		</view>
		
	</view>
  </view>
</template>

<script>
  export default {
    props: {
      itemData: {
        type: Object,
        default: function(e) {
          return {}
        }
      },
	  flag: {
        type: Number,
        default: function(e) {
          return {}
        }
      }
    },
    methods: {
		navigateTo(url) {
			if(this.flag == 0){
				uni.navigateTo({
					url
				})
			}
		},
		async edit(){
			console.log(this.itemData.id);
		},
		async undercarriage(){
			let thisObject = this
			uni.showModal({
				title:'提示',
				content: '确定下架商品吗？',
				success: function(res) {
					if (res.confirm) {
						thisObject.defineShelf()
					} else{
					}
				}
			});
		},
		async defineShelf(id){
			const res = await this.$apiRequest('/api/v1/OffSale','POST',{id:this.itemData.id},true)
			if(res.data.code === 200){
				this.$emit("get")
				uni.showToast({
					title: res.data.msg
				})
			}
		} 
    }
  }
</script>

<style scoped lang="scss">
  .item{
	  width: 710rpx;
	  padding: 10rpx;
	  background-color: #fff;
	  border-radius: 20rpx;
	  margin-bottom: 10rpx;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  .item_title{
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  margin-bottom: 10rpx;
		  color: #535353;
		  view{
			  display: flex;
			  align-items: center;
			  font-size: 26rpx;
			  image{
				  width: 60rpx;
				  height: 60rpx;
			  }
			  text{
				font-weight: 700;
				font-size: 30rpx;
				color: black;
			  }
		  }
	  }
	  .detail{
		  display: flex;
		  justify-content: space-around;
		  // background-color: red;
		.left{
			// width: 240rpx;
			width: 200rpx;
			height: 200rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 30rpx;
				// border: 1rpx solid black;
			}
		}
		.right{
			// width: 500rpx;
			width: 65%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title{
				font-weight: 700;
				font-size: 36rpx;
			}
			.price{
				margin-top: 10rpx;
				font-weight: 700;
				font-size: 32rpx;
				color: $shop-color;
			}
			.glance{
				color: #535353;
				font-size: 26rpx;
			}
		}
	  }
	  .function{
		  margin-top: 20rpx;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  .left{
			  margin-left: 10rpx;
			  color: #535353;
		  }
		  .right{
			  display: flex;
			  justify-content: flex-end;
			  .btn{
				  height: 60rpx;
				  padding: 0 20rpx;
				  border: 4rpx solid #f3f3f3;
				  border-radius: 50rpx;
				  display: flex;
				  justify-content: center;
				  align-items: center;
				  margin-left: 20rpx;
			  }
		  }
	  }
  }
</style>
