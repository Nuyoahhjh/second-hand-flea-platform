// 导入数据库对象
const pool = require('../db/index');

// 获取首页轮播图处理函数
exports.Lunbo = (req, res) => {
    const sql = 'select * from lunbotu';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.cc(err);
        }
        res.json({
            status:0,
            result
        })
    })
}

// 获取首页导航栏数据处理函数
exports.Nav = (req, res) => {
    const sql = 'select * from nav';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.cc(err);
        }
        res.json({
            status:0,
            result
        })
    })
}

// 获取首页分类数据处理函数
exports.Allsort = (req, res) => {
    const sql = 'select * from allsort';
    pool.query(sql,(err,result)=>{
        if(err){
            return res.cc(err);
        }
        res.json({
            status:0,
            result
        })
    })
}

