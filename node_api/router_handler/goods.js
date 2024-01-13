const pool = require('../db/index');
const jwt = require('jsonwebtoken');

// 导入配置密钥模块
const config = require('../config');

// 上传商品
exports.addGoods = (req, res) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
    // 验证 Token
    jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.json({
                status: 401
            })
        }
        // 对客户的文本信息经行合法性验证
        if (!req.body.title || !req.body.describe || !req.body.price || !req.body.Oprice || !req.body.type || !req.body.contact) return res.cc('非法输入');
        if (!req.body.titleImg) return res.cc('文章封面是必选参数！');

        const goodsInfo = {
            // avatar、name、openid 数据暂时定死，加入登录业务后数据再动态获取
            openid: decoded.openid,
            title: req.body.title,
            des: req.body.describe,
            price: req.body.price,
            Oprice: req.body.Oprice,
            // 对轮播图数据作处理,通过'hjh'连接为字符串
            image: req.body.imageValue.join("'hjh'"),
            titleImg: req.body.titleImg,
            type: req.body.type,
            shendTime: new Date(),
            avatarUrl: decoded.avatarUrl,
            nickName: decoded.nickName,
            contact: req.body.contact
        }
        const sql = 'insert into publishgoods set ?'
        pool.query(sql, goodsInfo, (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('发布商品失败！');

            res.cc('发布商品成功！', 0);
        })
    })
}


// 获取收藏列表信息
exports.getCollect = (req, res) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
    // 验证 Token
    jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.json({
                status: 401
            })
        }
        const sqlstr = 'select * from collectionlist where openid = ?'
        pool.query(sqlstr, decoded.openid, (err, result) => {
            if (err) res.cc(err)
            res.json({
                status: 0,
                result
            })
        })
    })

}

// 加入收藏列表
exports.addCollect = (req, res) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
    const {id,goods_title,goods_des,goods_price,goods_image} = req.body;
    // 验证 Token
    jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.json({
                status: 401
            })
        }
        const sqlstr = 'select * from collectionlist where id = ? and openid = ?'
        pool.query(sqlstr, [id, decoded.openid], (err, result) => {
            if (err) res.cc(err)
            if (result.length > 0) {
                res.cc('你已收藏，可在“我的”页面查看')
            } else {
                const sqlStr = 'INSERT INTO collectionlist SET ?'
                pool.query(sqlStr, { id,openid: decoded.openid,goods_title,goods_des,goods_price,goods_image}, (err, result) => {
                    if (err) { return res.cc(err) };
                    if (result.affectedRows > 0) {
                        res.cc('收藏成功，可在“我的”页面查看', 0)
                    } else {
                        res.cc('收藏失败')
                    }
                })
            }
        })
    })
}

//删除收藏列表商品
exports.deleteCollect = (req,res) =>{
    const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
    const {id} = req.body;
    // 验证 Token
    jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.json({
                status: 401
            })
        }
        const sqlstr = 'delete from collectionlist where id = ? and openid = ?'
        pool.query(sqlstr, [id, decoded.openid], err => {
            if (err) res.cc('删除失败')
            res.cc('删除成功', 0)
        })
    })
}

// 获取在卖商品
exports.getOnSale = (req,res)=>{
    const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
    // 验证 Token
    jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.json({
                status: 401
            })
        }
        const sqlstr = 'select id,title,titleImg,price,view from publishgoods where openid = ? and is_status = 0'
        pool.query(sqlstr, decoded.openid, (err, result) => {
            if (err) res.cc(err)
            res.json({
                status: 0,
                result
            })
        })
    })
}

// 获取下架商品
exports.getOffShelf = (req,res)=>{
    const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
    // 验证 Token
    jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.json({
                status: 401
            })
        }
        const sqlstr = 'select id,title,titleImg,price,view from publishgoods where openid = ? and is_status = 1'
        pool.query(sqlstr, decoded.openid, (err, result) => {
            if (err) res.cc(err)
            res.json({
                status: 0,
                result
            })
        })
    })
}

// 下架商品
exports.underCarriage = (req,res) =>{
    const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
    const {id} = req.body;
    // 验证 Token
    jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
        if (error) {
            return res.json({
                status: 401
            })
        }
        const sqlstr = 'update publishgoods set is_status = 1 where id = ? and openid = ?'
        pool.query(sqlstr, [id, decoded.openid], err => {
            if (err) res.cc('下架商品失败')
            res.cc('下架商品成功', 0)
        })
    })
}