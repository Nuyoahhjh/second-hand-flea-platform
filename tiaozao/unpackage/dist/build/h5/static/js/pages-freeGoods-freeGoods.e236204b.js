(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-freeGoods-freeGoods"],{"099d":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"goods_list"},t._l(t.goods,(function(e){return n("v-uni-view",{key:e.id,staticClass:"goods_item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.navigator(e.id)}}},[1==e.is_status?n("v-uni-view",{staticClass:"zzc"},[n("v-uni-view",{},[n("v-uni-text",[t._v("已下架")])],1)],1):t._e(),n("v-uni-image",{staticClass:"titleImg",attrs:{src:e.titleImg,mode:"aspectFill"}}),e.view>=600?n("v-uni-image",{staticClass:"hot",attrs:{src:"https://ithejunhao-1312274892.cos.ap-chongqing.myqcloud.com/tiaozao/Hot_hot.png",mode:""}}):t._e(),n("v-uni-view",{staticClass:"price"},[n("v-uni-text",[t._v("￥"+t._s(e.price))]),n("v-uni-text",[t._v("￥"+t._s(e.Oprice))])],1),n("v-uni-view",{staticClass:"name"},[t._v(t._s(e.title))])],1)})),1)},i=[]},"0ff9":function(t,e,n){"use strict";n.r(e);var o=n("099d"),i=n("a6d1");for(var s in i)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("e772");var r=n("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"97f26d0e",null,!1,o["a"],void 0);e["default"]=a.exports},1121:function(t,e,n){var o=n("e278");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("c7fab67a",o,!0,{sourceMap:!1,shadowMode:!1})},1640:function(t,e,n){"use strict";var o=n("588d"),i=n.n(o);i.a},1863:function(t,e,n){"use strict";n.r(e);var o=n("41b8"),i=n.n(o);for(var s in o)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},"41b8":function(t,e,n){"use strict";n("7a82");var o=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("c7eb")),s=o(n("1da1")),r=o(n("0ff9")),a={data:function(){return{goods:[],flag:!1}},components:{"goods-list":r.default},onLoad:function(){this.getFreeGoodsList()},onPullDownRefresh:function(){var t=this;this.goods=[],this.flag=!1,setTimeout((function(){t.getFreeGoodsList((function(){uni.stopPullDownRefresh()}))}),1e3)},methods:{getFreeGoodsList:function(t){var e=this;return(0,s.default)((0,i.default)().mark((function n(){var o;return(0,i.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$myRequest({url:"/goods/free"});case 2:o=n.sent,e.goods=o.data.list,t&&t();case 5:case"end":return n.stop()}}),n)})))()},goGoodDetail:function(t){uni.navigateTo({url:"/pages/details/details?id="+t})}}};e.default=a},"588d":function(t,e,n){var o=n("9a6d");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("2ec5a6e3",o,!0,{sourceMap:!1,shadowMode:!1})},"6d08":function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={props:["goods"],methods:{navigator:function(t){this.$emit("goodsItemClick",t)}}}},"9a6d":function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 颜色变量 */.goods_list[data-v-61c5d0ef]{background-color:#eee}.isOver[data-v-61c5d0ef]{width:100%;height:50px;line-height:50px;text-align:center;font-size:%?28?%}',""]),t.exports=e},a6d1:function(t,e,n){"use strict";n.r(e);var o=n("6d08"),i=n.n(o);for(var s in o)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},de30:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}));var o={goodsList:n("0ff9").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"goods_list"},[n("goods-list",{attrs:{goods:t.goods},on:{goodsItemClick:function(e){arguments[0]=e=t.$handleEvent(e),t.goGoodDetail.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"isOver"},[t._v("--------我是有底线的--------")])],1)},s=[]},e278:function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 颜色变量 */.goods_list[data-v-97f26d0e]{padding:0 %?15?%;display:flex;flex-wrap:wrap;justify-content:space-between}.goods_list .goods_item[data-v-97f26d0e]{background-color:#fff;width:%?355?%;margin:%?10?% 0;padding:%?15?%;box-sizing:border-box;position:relative}.goods_list .goods_item .hot[data-v-97f26d0e]{position:absolute;top:%?14?%;right:0;width:%?90?%;height:%?90?%}.goods_list .goods_item .titleImg[data-v-97f26d0e]{width:100%;height:150px}.goods_list .goods_item .price[data-v-97f26d0e]{color:#b50e03;font-size:%?36?%;margin:%?20?% 0 %?5?% 0}.goods_list .goods_item .price uni-text[data-v-97f26d0e]:nth-child(2){color:#ccc;font-size:%?28?%;margin-left:%?17?%;text-decoration:line-through}.goods_list .goods_item .name[data-v-97f26d0e]{font-size:%?28?%;line-height:%?50?%;padding-bottom:%?15?%;padding-top:%?10?%}.goods_list .goods_item .zzc[data-v-97f26d0e]{position:absolute;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);z-index:900;display:flex;justify-content:center;align-items:center}.goods_list .goods_item .zzc uni-view[data-v-97f26d0e]{background-color:#716d6e;width:%?130?%;height:%?80?%;border-radius:%?10?%;display:flex;justify-content:center;align-items:center;-webkit-transform:rotate(-14deg);transform:rotate(-14deg)}.goods_list .goods_item .zzc uni-view uni-text[data-v-97f26d0e]{color:#fff;border:%?4?% solid #595556;padding:%?6?%}',""]),t.exports=e},e772:function(t,e,n){"use strict";var o=n("1121"),i=n.n(o);i.a},fec0:function(t,e,n){"use strict";n.r(e);var o=n("de30"),i=n("1863");for(var s in i)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("1640");var r=n("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"61c5d0ef",null,!1,o["a"],void 0);e["default"]=a.exports}}]);