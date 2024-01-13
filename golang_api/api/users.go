package api

import (
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"tiaozaoServer/models"
	"tiaozaoServer/utils"
	"time"

	"github.com/gin-gonic/gin"
)

func GetUserById(id uint) (*models.User, error) {
	db := utils.GetDB()
	user := &models.User{}
	err := db.Where("id = ?", id).First(user).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

func randCode() string {
	r := rand.New(rand.NewSource(time.Now().UnixNano())) // 创建随机数生成器

	min := 100000 // 随机数最小值
	max := 999999 // 随机数最大值

	// 生成随机数
	code := r.Intn(max-min+1) + min

	return strconv.Itoa(code)
}

func SendEmail(c *gin.Context) {
	//获取前端传递的参数
	type EmailRequest struct {
		Email string `json:"email"`
	}
	var req EmailRequest
	c.BindJSON(&req)
	email := req.Email

	//生成验证码
	code := randCode()
	fmt.Println("验证码：", code)
	fmt.Println("emial", email)
	// 组装邮件头和内容
	msg :=
		`
            <p>您好！</p>
            <p>您的验证码是：<strong style="color:orangered;">` + code + `</strong></p>
            <p>如果不是您本人操作，请无视此邮件</p>
        `

	err := utils.SendEmail(email, "验证码", msg)
	if err != nil {
		c.JSON(400, gin.H{
			"code":    400,
			"message": "邮件发送失败：" + err.Error(),
		})
	} else {
		c.JSON(200, gin.H{
			"code":    200,
			"message": "邮件发送成功!",
			"yzm":     code,
			"email":   email,
		})
	}

}

// 登录接口
func Login(c *gin.Context) {
	db := utils.GetDB()
	var req models.User
	if err := c.Bind(&req); err != nil {
		// 错误处理
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "参数错误",
		})
		return
	}
	// req.Openid = "test_hd"
	//查询数据库
	User := models.User{}
	db.Where("openid = ?", req.Openid).Find(&User)
	//判断密码是否正确
	isMatch := utils.ComparePassword(req.Password, User.Password) //对比密码
	if isMatch {
		// 生成 token
		token, _ := utils.GenerateToken(User.ID)

		// 将 token 存储到数据库中
		User.Token = token
		db.Save(&User)
		//创建一个map 储存用户信息
		userMap := make(map[string]interface{})
		userMap["id"] = User.ID
		userMap["openid"] = User.Openid
		userMap["nickName"] = User.NickName
		userMap["avatarUrl"] = User.AvatarUrl

		c.JSON(200, gin.H{
			"code":  200,
			"msg":   "登录成功",
			"token": token,
			"info":  userMap,
		})
	} else {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "登录失败",
		})
	}
}

// 注册接口
func Register(c *gin.Context) {
	db := utils.GetDB()

	var req models.User
	if err := c.Bind(&req); err != nil {
		// 错误处理
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "参数错误",
		})
		return
	}

	//查询数据库
	User := models.User{}
	db.Debug().Where("openid = ?", req.Openid).Find(&User)
	//判断用户是否存在
	if User.Openid == req.Openid {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "用户已存在",
		})
	} else {
		// 创建用户，将密码进行加密处理
		hashedPassword, _ := utils.EncryptPassword([]byte(req.Password))
		db.Debug().Create(&models.User{Openid: req.Openid, Password: hashedPassword})
		c.JSON(200, gin.H{
			"code": 200,
			"msg":  "注册成功",
		})
	}
}

// 获取用户信息
func GetUserInfo(id uint) (models.User, error) {
	db := utils.GetDB()
	//查询数据库
	User := models.User{}
	result := db.Where("id = ?", id).Find(&User)
	//如果查找的信息result为空
	if result.RowsAffected == 0 {
		return User, fmt.Errorf("用户不存在")
	}
	return User, nil
}
