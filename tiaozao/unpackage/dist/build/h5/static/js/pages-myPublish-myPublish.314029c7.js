(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-myPublish-myPublish"],{"09be":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"item"},[0!=t.flag?i("v-uni-view",{staticClass:"item_title"},[i("v-uni-view",[i("v-uni-image",{attrs:{src:"https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/my/xiajia.png",mode:""}}),i("v-uni-text",[t._v("主动下架")])],1),i("v-uni-view",[t._v("下架原因 >")])],1):t._e(),i("v-uni-view",{staticClass:"detail",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("/pages/details/details?id="+t.itemData.id)}}},[i("v-uni-view",{staticClass:"left"},[i("v-uni-image",{attrs:{src:t.itemData.titleImg,mode:""}})],1),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{},[i("v-uni-view",{staticClass:"title"},[t._v(t._s(t.itemData.title))]),i("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(t.itemData.price))])],1),i("v-uni-view",{staticClass:"glance"},[t._v("浏览"+t._s(t.itemData.view))])],1)],1),i("v-uni-view",{staticClass:"function"},[i("v-uni-view",{staticClass:"left"},[i("v-uni-view",{},[t._v("更多")])],1),i("v-uni-view",{staticClass:"right"},[0==t.flag?[i("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.edit.apply(void 0,arguments)}}},[t._v("编辑")]),i("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.undercarriage.apply(void 0,arguments)}}},[t._v("下架")])]:t._e(),0!=t.flag?[i("v-uni-view",{staticClass:"btn"},[t._v("重新上架")])]:t._e()],2)],1)],1)},a=[]},2270:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-scroll-view",{staticClass:"tab",attrs:{id:"tab","show-scrollbar":!1,"scroll-x":!0,"scroll-into-view":t.tabScrollInto}},[i("v-uni-view",{staticClass:"tabContent",staticStyle:{display:"flex","flex-direction":"column"}},[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row"}},t._l(t.tabList,(function(e,n){return i("v-uni-view",{key:e.id,staticClass:"tabItem",staticStyle:{display:"flex","align-items":"center"},attrs:{id:e.id,"data-id":n,"data-current":n},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pressScrollViewItem.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"tabItemTitle",class:t.tabIndex==n?"tabItemTitleActive":"",style:{width:t.tabList[n].width+"px"}},[t._v(t._s(e.title))])],1)})),1),i("v-uni-view",{staticClass:"tabLineView"},[i("v-uni-view",{staticClass:"tabLine",class:(t.isPress,"tabLineActive"),style:{left:t.tabItemLineLeft+"px",width:t.tabItemLineWidth+"px"}})],1)],1)],1),i("v-uni-swiper",{staticClass:"childPageView",style:{height:t.swiperHeight+"px"},attrs:{current:t.tabIndex,duration:250},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.swiperChange.apply(void 0,arguments)},animationfinish:function(e){arguments[0]=e=t.$handleEvent(e),t.swiperChangeEnd.apply(void 0,arguments)},onAnimationEnd:function(e){arguments[0]=e=t.$handleEvent(e),t.swiperChangeEnd.apply(void 0,arguments)}}},t._l(t.tabList,(function(e,n){return i("v-uni-swiper-item",{key:n,staticClass:"childPageViewItem"},[0==n?i("v-uni-scroll-view",{style:{height:t.swiperHeight+"px"},attrs:{"scroll-y":"true"}},[i("v-uni-view",{staticStyle:{width:"100%",height:"100%"}},t._l(t.itemData,(function(e,a){return i("v-uni-view",{key:a},[i("cell",{attrs:{itemData:e,flag:n},on:{get:function(e){arguments[0]=e=t.$handleEvent(e),t.getOnSale.apply(void 0,arguments)}}})],1)})),1)],1):t._e(),0!=n?i("v-uni-scroll-view",{style:{height:t.swiperHeight+"px"},attrs:{"scroll-y":"true"}},[i("v-uni-view",{},t._l(t.itemData1,(function(e,a){return i("v-uni-view",{key:a},[i("cell",{attrs:{itemData:e,flag:n},on:{get:function(e){arguments[0]=e=t.$handleEvent(e),t.getOffShelf.apply(void 0,arguments)}}})],1)})),1)],1):t._e()],1)})),1)],1)},a=[]},"2d48":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("c7eb")),s=n(i("1da1"));i("ac1f"),i("d3b7"),i("159b");var r=n(i("3ed3")),c={components:{cell:r.default},data:function(){return{tabList:[{id:"tabItem0",title:"在卖",width:70},{id:"tabItem1",title:"已下架",width:70}],tabIndex:0,tabScrollInto:"",tabListSize:{},tabItemLineLeft:0,tabItemLineWidth:0,isPress:!1,swiperHeight:0,itemData:[],itemData1:[]}},onLoad:function(){var t=uni.getSystemInfoSync();this.swiperHeight=t.windowHeight-44,this.getOnSale(),this.getOffShelf()},onReady:function(){this.setTabItemDistance(),this.setTabSelect(this.tabIndex)},methods:{pressScrollViewItem:function(t){var e=t.target.dataset.current||t.currentTarget.dataset.current;this.isPress=!0,this.setTabSelect(e)},swiperChange:function(t){var e=t.target.current||t.detail.current;this.tabIndex=e,this.setTabSelect(this.tabIndex)},setTabItemDistance:function(){for(var t=this,e=uni.createSelectorQuery().in(this),i=0;i<this.tabList.length;i++)e.select("#"+this.tabList[i].id).boundingClientRect();e.exec((function(e){e.forEach((function(e){t.tabListSize[e.dataset.id]=e})),t.setTabItemLinePosition(t.tabListSize[t.tabIndex].left,t.tabListSize[t.tabIndex].width)}))},setTabItemLinePosition:function(t,e){this.tabItemLineLeft=t,this.tabItemLineWidth=e},swiperChangeEnd:function(t){this.setTabItemLinePosition(this.tabListSize[this.tabIndex].left,this.tabListSize[this.tabIndex].width)},setTabSelect:function(t){this.tabIndex=t,this.tabScrollInto=this.tabList[t].id},getOnSale:function(){var t=this;return(0,s.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$apiRequest("/api/v1/GetOnSale","GET");case 2:i=e.sent,t.itemData=i.data.list,console.log(t.itemData),t.tabList[0].title="在卖·"+t.itemData.length;case 6:case"end":return e.stop()}}),e)})))()},getOffShelf:function(){var t=this;return(0,s.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$apiRequest("/api/v1/GetOffSale","GET");case 2:i=e.sent,t.itemData1=i.data.list;case 4:case"end":return e.stop()}}),e)})))()}}};e.default=c},"3ed3":function(t,e,i){"use strict";i.r(e);var n=i("09be"),a=i("7f5f");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("e964");var r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"c03c073e",null,!1,n["a"],void 0);e["default"]=c.exports},"7c42":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".content[data-v-7bb9e4e6]{\n\t/* flex: 1; */display:flex;flex-direction:column;overflow:hidden;background-color:#fff}.tab[data-v-7bb9e4e6]{\n\nheight:44px;display:flex;flex-direction:row;\nwhite-space:nowrap\n}\n\n/* 隐藏滚动条 */.tab[data-v-7bb9e4e6] ::-webkit-scrollbar{display:none;width:0!important;height:0!important;-webkit-appearance:none;background:transparent}.tabLineView[data-v-7bb9e4e6]{position:relative;height:2px;background-color:initial}.tabLine[data-v-7bb9e4e6]{position:absolute;top:0;bottom:0;width:0;background-color:#b50e03}.tabLineActive[data-v-7bb9e4e6]{transition-duration:.3s;transition-property:left}.childPageView[data-v-7bb9e4e6]{display:flex;flex-direction:column}.tabItem[data-v-7bb9e4e6]{\n\n\t/* display: inline-block; */\ndisplay:flex\n\t\n\t\n\t/* flex-wrap: nowrap; */\n\t\n\t/* \n\tpadding-left: 20px;\n\tpadding-right: 20px; */}.tabItemTitle[data-v-7bb9e4e6]{color:#333;font-size:15px;height:42px;line-height:40px;display:flex;flex-wrap:nowrap;align-items:center;justify-content:center}.tabItemTitleActive[data-v-7bb9e4e6]{color:#b50e03}.childPageViewItem[data-v-7bb9e4e6]{flex:1;flex-direction:column}",""]),t.exports=e},"7f5f":function(t,e,i){"use strict";i.r(e);var n=i("f891"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},9493:function(t,e,i){"use strict";i.r(e);var n=i("2d48"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"9f3b":function(t,e,i){var n=i("dff6");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("080fab4a",n,!0,{sourceMap:!1,shadowMode:!1})},a96c:function(t,e,i){var n=i("7c42");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("84b2a7b6",n,!0,{sourceMap:!1,shadowMode:!1})},bdf2:function(t,e,i){"use strict";var n=i("a96c"),a=i.n(n);a.a},dff6:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 颜色变量 */.item[data-v-c03c073e]{width:%?710?%;padding:%?10?%;background-color:#fff;border-radius:%?20?%;margin-bottom:%?10?%;display:flex;flex-direction:column;justify-content:space-between}.item .item_title[data-v-c03c073e]{display:flex;justify-content:space-between;align-items:center;margin-bottom:%?10?%;color:#535353}.item .item_title uni-view[data-v-c03c073e]{display:flex;align-items:center;font-size:%?26?%}.item .item_title uni-view uni-image[data-v-c03c073e]{width:%?60?%;height:%?60?%}.item .item_title uni-view uni-text[data-v-c03c073e]{font-weight:700;font-size:%?30?%;color:#000}.item .detail[data-v-c03c073e]{display:flex;justify-content:space-around}.item .detail .left[data-v-c03c073e]{width:%?200?%;height:%?200?%}.item .detail .left uni-image[data-v-c03c073e]{width:100%;height:100%;border-radius:%?30?%}.item .detail .right[data-v-c03c073e]{width:65%;display:flex;flex-direction:column;justify-content:space-between}.item .detail .right .title[data-v-c03c073e]{font-weight:700;font-size:%?36?%}.item .detail .right .price[data-v-c03c073e]{margin-top:%?10?%;font-weight:700;font-size:%?32?%;color:#b50e03}.item .detail .right .glance[data-v-c03c073e]{color:#535353;font-size:%?26?%}.item .function[data-v-c03c073e]{margin-top:%?20?%;display:flex;justify-content:space-between;align-items:center}.item .function .left[data-v-c03c073e]{margin-left:%?10?%;color:#535353}.item .function .right[data-v-c03c073e]{display:flex;justify-content:flex-end}.item .function .right .btn[data-v-c03c073e]{height:%?60?%;padding:0 %?20?%;border:%?4?% solid #f3f3f3;border-radius:%?50?%;display:flex;justify-content:center;align-items:center;margin-left:%?20?%}',""]),t.exports=e},e964:function(t,e,i){"use strict";var n=i("9f3b"),a=i.n(n);a.a},ec14:function(t,e,i){"use strict";i.r(e);var n=i("2270"),a=i("9493");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("bdf2");var r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"7bb9e4e6",null,!1,n["a"],void 0);e["default"]=c.exports},f891:function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("c7eb")),s=n(i("1da1"));i("a9e3");var r={props:{itemData:{type:Object,default:function(t){return{}}},flag:{type:Number,default:function(t){return{}}}},methods:{navigateTo:function(t){0==this.flag&&uni.navigateTo({url:t})},edit:function(){var t=this;return(0,s.default)((0,a.default)().mark((function e(){return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(t.itemData.id);case 1:case"end":return e.stop()}}),e)})))()},undercarriage:function(){var t=this;return(0,s.default)((0,a.default)().mark((function e(){var i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=t,uni.showModal({title:"提示",content:"确定下架商品吗？",success:function(t){t.confirm&&i.defineShelf()}});case 2:case"end":return e.stop()}}),e)})))()},defineShelf:function(t){var e=this;return(0,s.default)((0,a.default)().mark((function t(){var i;return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$apiRequest("/api/v1/OffSale","POST",{id:e.itemData.id},!0);case 2:i=t.sent,200===i.data.code&&(e.$emit("get"),uni.showToast({title:i.data.msg}));case 4:case"end":return t.stop()}}),t)})))()}}};e.default=r}}]);