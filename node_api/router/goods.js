// 发布商品相关的路由
const express = require('express');
const goods_handler = require('../router_handler/goods');
const router = express.Router();

// const path = require('path');
// const multer = require('multer');
// const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 上传商品
router.post('/addgoods',goods_handler.addGoods)

// 获取收藏列表信息
router.get('/getcollect',goods_handler.getCollect)

// 加入收藏列表
router.post('/addcollect',goods_handler.addCollect)

//删除收藏列表商品
router.delete('/deletecollect',goods_handler.deleteCollect)

// 获取在卖商品
router.get('/getonsale',goods_handler.getOnSale)

// 获取下架商品
router.get('/getoffshelf',goods_handler.getOffShelf)

// 下架商品
router.post('/undercarriage',goods_handler.underCarriage)

// 导出
module.exports = router;