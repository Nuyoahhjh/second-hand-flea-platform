<template>
	<view class="content">
		<scroll-view class="tab" id="tab" :show-scrollbar="false" :scroll-x="true" :scroll-into-view="tabScrollInto" >
			<view class="tabContent" style="display: flex; flex-direction: column;">
				<view style="display: flex;flex-direction: row;">
					<view class="tabItem" v-for="(tab,tabItemIndex) in tabList" :key="tab.id" :id="tab.id" :data-id="tabItemIndex"
						:data-current="tabItemIndex" @click="pressScrollViewItem" style=" display: flex; align-items: center;">
						<text class="tabItemTitle"
							:class="tabIndex==tabItemIndex ? 'tabItemTitleActive' : ''"
							:style="{width:tabList[tabItemIndex].width + 'px'}"
							>{{tab.title}}</text>
					</view>
				</view>
				<view class="tabLineView">
					<view class="tabLine" :class="isPress ? 'tabLineActive':'tabLineActive'"
						:style="{left: tabItemLineLeft + 'px', width: tabItemLineWidth + 'px'}"></view>

				</view>
			</view>
		</scroll-view>

		<swiper class="childPageView" :current="tabIndex" :duration="250" @change="swiperChange"
			@animationfinish="swiperChangeEnd" @onAnimationEnd="swiperChangeEnd" :style="{height: swiperHeight+'px'}">

			<swiper-item class="childPageViewItem" v-for="(page, childPageViewItemIndex) in tabList" :key="childPageViewItemIndex">

				<scroll-view v-if="childPageViewItemIndex == 0" scroll-y="true" :style="{height: swiperHeight+'px'}">
					<view class="" style="width: 100%;height: 100%;">

						<view class="" v-for="(data,itemIndex) in itemData" :key="itemIndex"
							>
							<cell :itemData="data" :flag="childPageViewItemIndex" @get="getOnSale"></cell>
						</view>


					</view>
				</scroll-view>

				<scroll-view v-if="childPageViewItemIndex != 0" scroll-y="true" :style="{height: swiperHeight+'px'}">
					<view class="">

						<view class="" v-for="(data,itemIndex) in itemData1" :key="itemIndex"
							>
							<cell :itemData="data" :flag="childPageViewItemIndex" @get="getOffShelf"></cell>
						</view>

					</view>
				</scroll-view>

			</swiper-item>
		</swiper>




	</view>
</template>

<script>
	import cell from './cell.vue';

	export default {
		components: {
			cell
		},
		data() {
			return {
				tabList: [{
					id: "tabItem0",
					title: '在卖',
					width:70,
				}, {
					id: "tabItem1",
					title: '已下架',
					width:70,
				}],
				tabIndex: 0,
				tabScrollInto: "",
				tabListSize: {},
				tabItemLineLeft: 0,
				tabItemLineWidth: 0,
				isPress: false,
				swiperHeight: 0,
				itemData: [],
				itemData1:[]
			}
		},
		onLoad() {
			let system = uni.getSystemInfoSync();
			this.swiperHeight = system.windowHeight - 44;
			this.getOnSale()
			this.getOffShelf()
		},
		onReady() {
			this.setTabItemDistance();
			this.setTabSelect(this.tabIndex);
		},
		methods: {
			pressScrollViewItem(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.isPress = true;
				this.setTabSelect(index);
			},
			swiperChange(e) {
				let index = e.target.current || e.detail.current;

				this.tabIndex = index;
				this.setTabSelect(this.tabIndex);
			},
			setTabItemDistance() {
				var queryTabSize = uni.createSelectorQuery().in(this);
				for (var i = 0; i < this.tabList.length; i++) {
					queryTabSize.select('#' + this.tabList[i].id).boundingClientRect();
				}
				queryTabSize.exec(rects => {
					rects.forEach((rect) => {
						this.tabListSize[rect.dataset.id] = rect;
					})
					this.setTabItemLinePosition(this.tabListSize[this.tabIndex].left, this.tabListSize[this
							.tabIndex]
						.width);
				});

			},
			setTabItemLinePosition(left, width) {
				this.tabItemLineLeft = left;
				this.tabItemLineWidth = width;
			},
			swiperChangeEnd(e) {

				this.setTabItemLinePosition(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);

			},
			setTabSelect(index) {

				this.tabIndex = index;
				this.tabScrollInto = this.tabList[index].id;

			},
			async getOnSale(){
				const res = await this.$apiRequest("/api/v1/GetOnSale","GET")
				this.itemData = res.data.list
				console.log(this.itemData);
				this.tabList[0].title = "在卖·"+this.itemData.length
			},
			async getOffShelf(){
				const res = await this.$apiRequest("/api/v1/GetOffSale","GET")
				this.itemData1 = res.data.list
			}
		}
	}
</script>

<style>
	.content {
		/* flex: 1; */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
	}

	.tab {
		/* #ifdef APP-PLUS */
		width: 100vw;
		/* #endif */
		height: 44px;
		display: flex;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	/* 隐藏滚动条 */

	.tab ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.tabLineView {
		position: relative;
		height: 2px;
		background-color: transparent;
		
	}

	.tabLine {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 0;
		background-color: #b50e03;
	}

	.tabLineActive {
		transition-duration: 0.3s;
		transition-property: left;
	}

	.childPageView {
		display: flex;
		flex-direction: column;
	}

	.tabItem {
		/* #ifndef APP-PLUS */
		/* display: inline-block; */
		/* #endif */
		display: flex;
		
		
		/* flex-wrap: nowrap; */
		
		/* 
		padding-left: 20px;
		padding-right: 20px; */
		
	}

	.tabItemTitle {
		color: #333333;
		font-size: 15px;
		height: 42px;
		line-height: 40px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.tabItemTitleActive {
		color: #b50e03;
	}

	.childPageViewItem {
		flex: 1;
		flex-direction: column;
	}
</style>
