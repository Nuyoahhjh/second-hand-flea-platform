(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-index"],{"0244":function(n,t,e){var i=e("c8ef");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var o=e("4f06").default;o("54e0edc5",i,!0,{sourceMap:!1,shadowMode:!1})},"17f6":function(n,t,e){"use strict";var i=e("0244"),o=e.n(i);o.a},6977:function(n,t,e){"use strict";e.r(t);var i=e("d417"),o=e("c9bc");for(var a in o)["default"].indexOf(a)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(a);e("17f6");var c=e("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"ecb2531c",null,!1,i["a"],void 0);t["default"]=r.exports},ba90:function(n,t,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("d3b7");var o=i(e("c7eb")),a=i(e("1da1")),c=i(e("4f7b")),r={data:function(){return{baseUrl:c.default.BASE_URL,navIcon:[{icon:c.default.BASE_URL+"/uploads/tiaozao/my/purchase.png",title:"已买到"},{icon:c.default.BASE_URL+"/uploads/tiaozao/my/sell.png",title:"已卖出"},{icon:c.default.BASE_URL+"/uploads/tiaozao/my/Shopping.png",title:"购物车"}],myfashoulian:[{icon:c.default.BASE_URL+"/uploads/tiaozao/my/MyPublishing.png",title:"我发布的",goUrl:"/pages/myPublish/myPublish"},{icon:c.default.BASE_URL+"/uploads/tiaozao/my/collect.png",title:"收藏列表",goUrl:"/pages/collect/collect"},{icon:c.default.BASE_URL+"/uploads/tiaozao/my/service.png",title:"联系客服",goUrl:"/pages/collect/collect"}],userInfo:{}}},onShow:function(){this.userInfo=uni.getStorageSync("info")},onLoad:function(){},methods:{getInfo:function(){var n=this;return(0,a.default)((0,o.default)().mark((function t(){var e;return(0,o.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$apiRequest("/api/yanzheng","GET");case 2:e=t.sent,0===e.data.status&&(n.userInfo=e.data.info);case 4:case"end":return t.stop()}}),t)})))()},redirectTo:function(n){uni.redirectTo({url:n})},navigateTo:function(n){uni.navigateTo({url:n})},getLogin:function(){return new Promise((function(n,t){uni.login({success:function(t){console.log(t,"res"),n(t)},fail:function(n){console.log(n,"logoer"),t(n)}})}))},exit:function(){var n=this;uni.clearStorage(),setTimeout((function(){n.userInfo=""}),500)}}};t.default=r},c8ef:function(n,t,e){var i=e("24fb");t=i(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 颜色变量 */.content .login[data-v-ecb2531c]{height:%?577?%;display:flex;justify-content:center;align-items:center;background-color:#d9d9d9;position:relative}.content .login .border[data-v-ecb2531c]{z-index:999;position:absolute;width:%?500?%;height:%?160?%;display:flex;justify-content:center;align-items:center;border:%?6?% solid #ffc;border-radius:%?14?%}.content .login .border uni-button[data-v-ecb2531c]{width:%?440?%;background-color:#d9d9d9;border:%?7?% solid #ffc;color:#ffc;font-weight:700}.content .login .online[data-v-ecb2531c]{z-index:999;position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:space-between;height:%?260?%}.content .login .online uni-image[data-v-ecb2531c]{width:%?160?%;height:%?160?%;border-radius:%?80?%}.content .login .online uni-text[data-v-ecb2531c]{color:#fff;font-size:%?40?%}.content .login .zzc[data-v-ecb2531c]{width:100%;height:100%;background-color:rgba(0,0,0,.4);z-index:900}.content uni-image[data-v-ecb2531c]{width:%?70?%;height:%?70?%}.content .nav[data-v-ecb2531c]{width:%?750?%;background-color:#fff;margin-top:%?20?%;display:flex;justify-content:space-around;padding:%?30?% 0}.content .nav uni-view[data-v-ecb2531c]{width:25%;display:flex;flex-direction:column;justify-content:center;align-items:center}.content .nav uni-view uni-text[data-v-ecb2531c]{margin-top:%?10?%;color:#515151;font-weight:700}.content .myFunction[data-v-ecb2531c]{margin-top:%?20?%;background-color:#fff}.content .myFunction uni-view[data-v-ecb2531c]{padding:%?30?% %?40?%;display:flex;align-items:center;border-bottom:%?6?% solid #d9d9d9}.content .myFunction uni-view uni-text[data-v-ecb2531c]{margin-left:%?30?%;font-size:%?40?%;color:#515151;font-weight:700}.content .exitLogin[data-v-ecb2531c]{margin-top:%?10?%}',""]),n.exports=t},c9bc:function(n,t,e){"use strict";e.r(t);var i=e("ba90"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(n){e.d(t,n,(function(){return i[n]}))}(a);t["default"]=o.a},d417:function(n,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){}));var i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"content"},[n.userInfo?n._e():e("v-uni-view",{staticClass:"login"},[e("v-uni-view",{staticClass:"border"},[e("v-uni-button",{on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.redirectTo("/pages/login/login")}}},[n._v("登录")])],1)],1),n.userInfo?e("v-uni-view",{staticClass:"login",style:{backgroundImage:"url("+n.baseUrl+n.userInfo.avatarUrl+")","background-repeat":"no-repeat",backgroundSize:"100% 100%"}},[e("v-uni-view",{staticClass:"zzc"}),e("v-uni-view",{staticClass:"online"},[e("v-uni-image",{attrs:{src:n.baseUrl+n.userInfo.avatarUrl,mode:""}}),e("v-uni-text",[n._v(n._s(n.userInfo.nickName))])],1)],1):n._e(),e("v-uni-view",{staticClass:"nav"},n._l(n.navIcon,(function(t,i){return e("v-uni-view",{key:i},[e("v-uni-image",{attrs:{src:t.icon,mode:""}}),e("v-uni-text",[n._v(n._s(t.title))])],1)})),1),e("v-uni-view",{staticClass:"myFunction"},n._l(n.myfashoulian,(function(t,i){return e("v-uni-view",{key:i,on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.navigateTo(t.goUrl)}}},[e("v-uni-image",{attrs:{src:t.icon,mode:""}}),e("v-uni-text",[n._v(n._s(t.title))])],1)})),1),e("v-uni-view",{staticClass:"exitLogin"},[e("v-uni-button",{attrs:{type:"warn"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.exit.apply(void 0,arguments)}}},[n._v("退出登录")])],1)],1)},o=[]}}]);