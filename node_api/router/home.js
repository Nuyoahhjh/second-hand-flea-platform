const express = require('express');
// 创建路由器实例
const router = express.Router();

// 导入路由处理函数
const userHandler = require('../router_handler/home')




// 路由相关
// 获取首页轮播图路由
router.get('/lunbo',userHandler.Lunbo)

// 获取首页导航栏路由
router.get('/nav',userHandler.Nav)

router.get('/allsort',userHandler.Allsort)

// 导出路由对象
module.exports = router;