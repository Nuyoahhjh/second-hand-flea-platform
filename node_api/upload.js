let COS = require('cos-nodejs-sdk-v5');
let cos = new COS({
    SecretId: process.env.SecretId, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
    SecretKey: process.env.SecretKey, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});


exports.upload = async function (obj) {
    try {
        var data = await cos.uploadFile(obj);
        return { err: null, data: data }
    } catch (err) {
        return { err: err, data: null };
    }
}

// 可以同步拿到请求的返回值,这里举例说明,实际返回的数据格式可以自定义
var uploadResult = await upload();
if (uploadResult.err) {
    console.log('上传出错', uploadResult.err);
} else {
    console.log('上传成功', uploadResult.data);
}