(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-collect-collect"],{"0be5":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"line"},[n("v-uni-view"),t._v("我的收藏列表"),n("v-uni-text",[t._v("(长按可删除)")])],1),n("v-uni-view",{staticClass:"occupy"}),t._l(t.goods,(function(e,i){return n("v-uni-view",{key:i,staticClass:"goods",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.navigateTo("/pages/details/details?id="+e.id)},longpress:function(n){arguments[0]=n=t.$handleEvent(n),t.longpress(e.id,e.goods_title)}}},[n("v-uni-view",{staticClass:"left"},[n("v-uni-image",{attrs:{src:e.goods_image,mode:""}})],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-view",{staticClass:"title"},[t._v(t._s(e.goods_title))]),n("v-uni-view",{staticClass:"des"},[t._v(t._s(e.goods_des.slice(0,15))),e.goods_des.length>=15?n("v-uni-text",[t._v("...")]):t._e()],1),n("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(e.goods_price))])],1)],1)}))],2)},a=[]},"2cf8":function(t,e,n){"use strict";var i=n("c51a"),a=n.n(i);a.a},"7d90":function(t,e,n){"use strict";n.r(e);var i=n("dd3a"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"813d":function(t,e,n){"use strict";n.r(e);var i=n("0be5"),a=n("7d90");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("2cf8");var s=n("f0c5"),r=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"7e26fea3",null,!1,i["a"],void 0);e["default"]=r.exports},c51a:function(t,e,n){var i=n("f577");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("137e44ac",i,!0,{sourceMap:!1,shadowMode:!1})},dd3a:function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("26e9");var a=i(n("c7eb")),o=i(n("1da1")),s={data:function(){return{goods:[]}},onLoad:function(){this.getCollect()},methods:{getCollect:function(){var t=this;return(0,o.default)((0,a.default)().mark((function e(){var n;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$apiRequest("/api/v1/GetCollect","GET");case 2:n=e.sent,t.goods=n.data.list,t.goods.reverse();case 5:case"end":return e.stop()}}),e)})))()},deleteCollect:function(t){var e=this;return(0,o.default)((0,a.default)().mark((function n(){var i;return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$apiRequest("/api/v1/DelCollect","DELETE",{id:t},!0);case 2:i=n.sent,e.getCollect(),uni.showToast({title:i.data.msg});case 5:case"end":return n.stop()}}),n)})))()},longpress:function(t,e){var n=this;uni.showModal({title:e,content:"确定删除吗？",success:function(e){e.confirm&&n.deleteCollect(t)}})},navigateTo:function(t){uni.navigateTo({url:t})}}};e.default=s},f577:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 颜色变量 */.content[data-v-7e26fea3]{display:flex;flex-direction:column;align-items:center}.content .line[data-v-7e26fea3]{width:%?750?%;height:%?80?%;display:flex;align-items:center;background-color:#ffc;position:fixed;z-index:999}.content .line uni-view[data-v-7e26fea3]{width:%?6?%;height:%?40?%;background-color:#b50e03;margin-left:%?10?%;margin-right:%?20?%}.content .line uni-text[data-v-7e26fea3]{font-size:%?20?%;margin-left:%?20?%;color:#ccc}.content .occupy[data-v-7e26fea3]{height:%?90?%}.content .goods[data-v-7e26fea3]{width:%?710?%;padding:%?10?%;background-color:#fff;border-radius:%?20?%;margin-bottom:%?10?%;display:flex;justify-content:space-between}.content .goods .left[data-v-7e26fea3]{width:30%;height:%?240?%}.content .goods .left uni-image[data-v-7e26fea3]{width:100%;height:100%}.content .goods .right[data-v-7e26fea3]{width:68%;display:flex;flex-direction:column;justify-content:space-around}.content .goods .right .title[data-v-7e26fea3]{font-weight:700;font-size:%?36?%}.content .goods .right .des[data-v-7e26fea3]{font-size:%?30?%}.content .goods .right .price[data-v-7e26fea3]{color:#b50e03}',""]),t.exports=e}}]);