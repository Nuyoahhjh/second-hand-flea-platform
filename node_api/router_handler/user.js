// 这里定义的是和用户路由相关的处理函数

// 导入数据库对象
const pool = require('../db/index');
const jwt = require('jsonwebtoken');

// 导入配置密钥模块
const config = require('../config');

// 导入解密对象
// 随机盐长度一般是10
// bcrypt.hashSync(明文密码, 随机盐的长度) 返回值就是加密后的字符串
const bcrypt = require('bcryptjs');
const { query } = require('express');
const { result } = require('@hapi/joi/lib/base');

const nodeMail = require('../nodemailer.js')

exports.token = (req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
  // 验证 Token
  jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
    if (error) {
      return res.json({
        status: 401
      })
    }
    const info={
      id:decoded.id,
      openid:decoded.openid,
      nickName:decoded.nickName,
      avatarUrl:decoded.avatarUrl
    }
    return res.json({
      status: 0,
      info
    })
  })
}

// 发送邮箱验证码
exports.sendEmail = async (req, res) => {
  const email = req.body.email;
  const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0') //生成6位随机验证码
  //发送邮件
  const mail = {
    from: '2717564110@qq.com',// 发件人
    subject: '验证码',//邮箱主题
    to: email,//收件人，这里由post请求传递过来
    // 邮件内容，用html格式编写
    html: `
            <p>您好！</p>
            <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
            <p>如果不是您本人操作，请无视此邮件</p>
        `
  };
  await nodeMail.sendMail(mail, (err, info) => {
    if (!err) {
      res.json({
        status: 0,
        code,
        email,
        message: "验证码发送成功！"
      });
    } else {
      res.cc("验证码发送失败，请稍后重试！");
    }
  })
}

// 用户注册处理函数
exports.reguser = (req, res) => {
  // 接收客户端的数据
  const userInfo = req.body;
  // 判断用户输入的信息是否合法
  if (!userInfo.email || !userInfo.password || !userInfo.twoPassword) return res.cc('非法输入！！');
  // 查询数据库是否有重名的用户名
  // res.cc()  自定义的响应错误信息的中间件
  const nickName = userInfo.email.substring(0,userInfo.email.indexOf('@'))
  const sqlStr = 'SELECT openid FROM user WHERE openid = ?';
  pool.query(sqlStr, userInfo.email, (err, result) => {
    if (err) return res.cc(err);
    // 如果长度大于0 代表用户名重复
    if (result.length > 0) {
      res.cc('此用户已存在！')
    } else {
      // 向数据库插入数据
      // 加密密码
      userInfo.password = bcrypt.hashSync(userInfo.password, 10)
      const sqlStr = 'INSERT INTO user SET ?'
      pool.query(sqlStr, { openid: userInfo.email, password: userInfo.password,nickName }, (err, result) => {
        if (err) {return res.cc(err)};
        if (result.affectedRows > 0) {
          res.cc('注册成功！', 0)
        } else {
          res.cc('注册失败')
        }
      })
    }
  })

}

// 用户登录处理函数
exports.login = (req, res) => {
  // 接收用户的信息
  const userInfo = req.body;
  // 判断用户输入的信息是否合法
  if (!userInfo.username || !userInfo.password) return res.cc('非法输入！！');
  // 查询数据库
  const sqlStr = 'SELECT * FROM user WHERE openid = ?';
  pool.query(sqlStr, [userInfo.username], (err, result) => {
    if (err) return res.cc(err);

    if (result.length !== 1) return res.cc('此用户不存在！');

    // 对比密码  看数据库是否一致
    // 使用bcrypt.compareSync(value1,value2) 返回值为bool
    const compareResult = bcrypt.compareSync(userInfo.password, result[0].password);

    if (!compareResult) return res.cc('密码错误！');

    // 将生成的token响应给客户端
    // 剔除密码 这是敏感信息
    const user = { ...result[0], password: ''}
    const info = {
      avatarUrl:user.avatarUrl,
      nickName:user.nickName
    }
    // 利用jwt.sign()生成加密的token
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresin });
    res.send({
      status: 0,
      message: '登录成功',
      token: 'Bearer ' + tokenStr,
      info
    })

  })
}
// 获取全部商品数据
exports.Goods = (req, res) => {
  let pageindex = req.query.pageindex
  if (!pageindex) {
    pageindex = 1;
  }
  let pagesize = 10
  let skipcount = (pageindex - 1) * pagesize

  const sql = `select id,title,price,Oprice,titleImg,is_status from publishgoods limit ${skipcount},${pagesize}`
  pool.query(sql, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    res.json({
      status: 0,
      result
    })
  })
}

// 获取最新商品数据
exports.newGoods = (req, res) => {
  const sql = `select id,title,price,Oprice,titleImg,shendTime,is_status from publishgoods where is_status = 0 order by shendTime desc limit 20`
  pool.query(sql, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    res.json({
      status: 0,
      result
    })
  })
}

// 获取热门商品数据
exports.hotGoods = (req, res) => {
  const sql = `select id,title,price,Oprice,titleImg,view from publishgoods where view >= 20 and is_status = 0 order by view desc limit 20`
  pool.query(sql, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    res.json({
      status: 0,
      result
    })
  })
}

// 获取免费商品数据
exports.freeGoods = (req, res) => {
  const sql = `select id,title,price,Oprice,titleImg from publishgoods where price <= 0 and is_status = 0`
  pool.query(sql, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    res.json({
      status: 0,
      result
    })
  })
}

// 获取商品轮播图详情数据
exports.lunboDetail = (req, res) => {
  let id = req.params.id;
  const sql = 'select image from publishgoods where id = ? and is_status = 0'
  pool.query(sql, id, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    if (result.length > 0) {
      res.json({
        status: 0,
        result
      })
    }else{
      res.cc('啊哦，宝贝被卖家下架了~')
    }
  })
}

// 获取商品详情数据
exports.goodsInfo = (req, res) => {
  let id = req.params.id;
  const sql = 'select title,price,Oprice,des,contact from publishgoods where id = ? and is_status = 0'
  pool.query(sql, id, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    if (result.length > 0) {
      res.json({
        status: 0,
        result
      })
    }else{
      res.cc('啊哦，宝贝被卖家下架了~')
    }
  })
}

// 获取分类商品各类商品数据
exports.itemGoods = (req, res) => {
  let pageindex = req.query.pageindex
  let type = req.query.type;
  if (!pageindex) {
    pageindex = 1;
  }
  let pagesize = 10
  let skipcount = (pageindex - 1) * pagesize
  const sql = `select id,title,price,Oprice,titleImg,is_status from publishgoods where type = ? and is_status = 0 limit ${skipcount},${pagesize}`
  pool.query(sql, type, (err, result) => {
    if (err) {
      return res.cc(err)
    }
    res.json({
      status: 0,
      result
    })
  })
}

// 增加热度
exports.addHot = (req,res) =>{
  const token = (req.headers.authorization || '').replace('Bearer ', '').replace(/\"/g, "")
  let id = req.query.id
  // 验证 Token
  jwt.verify(token, config.jwtSecretKey, (error, decoded) => {
    if (error) {
      return res.cc('未登录',0)
      // return res.json({
      //   status: 401
      // })
    }
    const sqlstr = 'update publishgoods set view = view + 1 where id = ? and is_status = 0'
    pool.query(sqlstr,id,(err)=>{
      if(err) res.cc(err)
      res.json({
        status:0,
        message:'浏览成功'
      })
    })
  })
}