const express = require('express');
// 创建路由器实例
const router = express.Router();

// 导入路由处理函数
const userHandler = require('../router_handler/user')




// 路由相关
// 发送邮箱验证码
router.post('/sendemail',userHandler.sendEmail)
// 注册路由
router.post('/reguser',userHandler.reguser)

// 登录路由
router.post('/login',userHandler.login)

// 验证token
router.get('/yanzheng', userHandler.token)

// 获取全部商品列表数据
router.get('/getgoods',userHandler.Goods)

// 获取最新商品列表数据
router.get('/getnewgoods',userHandler.newGoods)

// 获取热门商品列表数据
router.get('/gethotgoods',userHandler.hotGoods)

// 获取免费商品列表数据
router.get('/getfreegoods',userHandler.freeGoods)

// 获取商品详情轮播图数据
router.get('/getthumimages/:id',userHandler.lunboDetail)

// 获取商品详情数据
router.get('/getgoodsinfo/:id',userHandler.goodsInfo)

// 获取分类商品各类商品数据
router.get('/getitemgoods',userHandler.itemGoods)

// 增加商品热度
router.get('/addhot',userHandler.addHot)

// 导出路由对象
module.exports = router;