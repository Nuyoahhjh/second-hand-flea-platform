package api

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"tiaozaoServer/models"
	"tiaozaoServer/utils"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetNav(c *gin.Context) {
	db := utils.GetDB()
	navs := []models.Nav{}
	db.Debug().Find(&navs)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": navs,
	})
}

// 获取全部商品数据
func GetGoods(c *gin.Context) {
	//获取前端传递的参数
	pageindex, _ := strconv.Atoi(c.Query("pageindex"))
	if pageindex == 0 {
		pageindex = 1
	}
	skipcount := (pageindex - 1) * 10
	db := utils.GetDB()
	Goods := []models.Publishgoods{}
	//分页查询数据库所有值
	db.Debug().Offset(skipcount).Limit(10).Find(&Goods)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": Goods,
	})
}

// 获取最新商品数据
func GetNewGoods(c *gin.Context) {
	db := utils.GetDB()

	Goods := []models.Publishgoods{}
	//id倒叙查询前20条
	db.Debug().Order("id desc").Limit(20).Find(&Goods)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": Goods,
	})
}

// 获取热门商品数据
func GetHotGoods(c *gin.Context) {
	db := utils.GetDB()

	Goods := []models.Publishgoods{}
	//view大于20且is_status为0的数据 view降序前20条
	db.Debug().Where("view > ? and is_status = ?", 20, 0).Order("view desc").Limit(20).Find(&Goods)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": Goods,
	})
}

// 获取免费商品数据
func GetFreeGoods(c *gin.Context) {
	db := utils.GetDB()

	Goods := []models.Publishgoods{}
	//price小于等于0且is_status为0的数据
	db.Debug().Where("price <= ? and is_status = ?", 0, 0).Find(&Goods)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": Goods,
	})
}

// 获取商品轮播图详情数据
func GetLunboDetail(c *gin.Context) {
	//获取前端传递的参数
	id, _ := strconv.Atoi(c.Query("id"))
	db := utils.GetDB()

	imgUrl := []models.Publishgoods{}
	//查询与id相等且is_status为0的id 和 image 数据
	db.Debug().Where("id = ? and is_status = ?", id, 0).Select("id,image").Find(&imgUrl)
	fmt.Println(imgUrl)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	//如果数据大于0则返回数据
	if len(imgUrl) > 0 {
		c.JSON(200, gin.H{
			"code": 200,
			"msg":  "操作成功",
			"list": imgUrl,
		})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "啊哦，宝贝被卖家下架了~",
		})
	}
}

// 获取商品详情数据
func GetGoodsInfo(c *gin.Context) {
	//获取前端传递的参数
	id, _ := strconv.Atoi(c.Query("id"))
	db := utils.GetDB()

	goodsInfo := []models.Publishgoods{}
	//查询与id相等且is_status为0的数据
	db.Debug().Where("id = ? and is_status = ?", id, 0).Find(&goodsInfo)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	//如果数据大于0则返回数据
	if len(goodsInfo) > 0 {
		c.JSON(200, gin.H{
			"code": 200,
			"msg":  "操作成功",
			"list": goodsInfo,
		})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "啊哦，宝贝被卖家下架了~",
		})
	}
}

// 获取分类商品各类商品数据
func GetItemGoods(c *gin.Context) {
	//获取前端传递的参数
	pageindex, _ := strconv.Atoi(c.Query("pageindex"))
	Type := c.Query("type")
	if pageindex == 0 {
		pageindex = 1
	}
	skipcount := (pageindex - 1) * 10
	db := utils.GetDB()

	goods := []models.Publishgoods{}
	//查询与type相等且is_status为0的数据
	db.Debug().Where("type = ? and is_status = ?", Type, 0).Offset(skipcount).Limit(10).Find(&goods)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": goods,
	})
}

// 增加商品热度
func AddHotGoods(c *gin.Context) {
	tokenString := c.Request.Header.Get("Authorization")

	if !utils.ValidateToken(tokenString) {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "未登录",
		})
		c.Abort()
		return
	}
	//获取前端传递的参数
	id, _ := strconv.Atoi(c.Query("id"))

	db := utils.GetDB()

	goods := []models.Publishgoods{}
	//增加id相等数据的view值
	result := db.Debug().Model(&goods).Where("id = ? and is_status = ?", id, 0).Update("view", gorm.Expr("view + ?", 1))
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	if result.RowsAffected == 0 { //如果没有更新到数据
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "浏览失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "浏览成功",
	})
}

// 上传商品(req *UploadRequest)
func UploadGoods(c *gin.Context) {
	//获取token
	token := c.Request.Header.Get("Authorization")
	//解析token
	userId, _ := utils.ParseToken(token)
	User, err := GetUserInfo(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "查找用户信息失败",
		})
		return
	}

	var jsonData map[string]interface{}
	if err := c.BindJSON(&jsonData); err != nil {
		// 错误处理
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "参数错误",
		})
		return
	}
	req := models.Publishgoods{
		Openid:    User.Openid,
		AvatarUrl: User.AvatarUrl,
		NickName:  User.NickName,
		Type:      fmt.Sprintf("%v", jsonData["type"]),
		Title:     fmt.Sprintf("%v", jsonData["title"]),
		TitleImg:  fmt.Sprintf("%v", jsonData["titleImg"]),
		Price:     jsonData["price"].(float64),
		Oprice:    jsonData["Oprice"].(float64),
		Des:       fmt.Sprintf("%v", jsonData["des"]),
		Image:     "",
		View:      0,
		Is_status: 0,
		ShendTime: time.Now().Format("2006-01-02 15:04:05"),
		Contact:   fmt.Sprintf("%v", jsonData["contact"]),
	}
	// 将数组元素通过'hjh'拼接为字符串
	if imageArray, ok := jsonData["imageValue"].([]interface{}); ok {
		var imageLinks []string
		for _, item := range imageArray {
			if link, ok := item.(string); ok {
				imageLinks = append(imageLinks, link)
			}
		}
		req.Image = strings.Join(imageLinks, "'hjh'")
	}

	db := utils.GetDB()
	// 启用 SQL 查询调试
	db = db.Debug()
	//开启事务
	tx := db.Begin()

	if err := tx.Create(&req).Error; err != nil {
		// 发生错误时回滚事务并输出错误信息
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}

	// 操作完成时提交事务并输出上传成功信息
	tx.Commit()
	// 打印执行的 SQL 语句
	sqls := tx.Statement.SQL.String()
	fmt.Println("执行的 SQL 语句:", sqls)
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "上传成功",
	})
}

// 获取轮播图数据
func GetLunbo(c *gin.Context) {
	db := utils.GetDB()
	lunbotu := []models.Lunbotu{}
	//查询所有数据
	db.Debug().Find(&lunbotu)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": lunbotu,
	})
}

// 获取首页分类数据
func GetIndexType(c *gin.Context) {
	db := utils.GetDB()
	indexType := []models.IndexType{}
	//查询所有数据
	db.Debug().Find(&indexType)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": indexType,
	})
}

// 加入收藏列表
func AddCollect(c *gin.Context) {
	db := utils.GetDB()
	//获取token
	token := c.Request.Header.Get("Authorization")
	//解析token
	userId, _ := utils.ParseToken(token)
	User, err := GetUserInfo(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "查找用户信息失败",
		})
		return
	}

	var req models.Collect

	if err := c.BindJSON(&req); err != nil {
		fmt.Println("err:", err)
		// 错误处理
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "参数错误",
		})
		return
	}

	req.Openid = User.Openid

	//开启事务
	tx := db.Begin()

	//创建数据前先查询是否已经收藏
	var collect models.Collect
	db.Debug().Where("id = ? and openid = ?", req.ID, req.Openid).Find(&collect)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "查找收藏信息失败",
		})
		return
	}
	if collect.ID != 0 {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "您已经收藏过了",
		})
		return
	}

	if err := tx.Create(&req).Error; err != nil {
		// 发生错误时回滚事务并输出错误信息
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}

	// 操作完成时提交事务并输出上传成功信息
	tx.Commit()
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "收藏成功",
	})
}

// 获取在卖商品
func GetOnSale(c *gin.Context) {
	db := utils.GetDB()
	//获取token
	token := c.Request.Header.Get("Authorization")
	//解析token
	userId, _ := utils.ParseToken(token)
	User, err := GetUserInfo(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "查找用户信息失败",
		})
		return
	}
	goods := []models.Publishgoods{}
	//查询所有数据
	db.Debug().Where("openid = ? and is_status = ?", User.Openid, 0).Find(&goods)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": goods,
	})
}

// 获取下架商品
func GetOffSale(c *gin.Context) {
	db := utils.GetDB()
	//获取token
	token := c.Request.Header.Get("Authorization")
	//解析token
	userId, _ := utils.ParseToken(token)
	User, err := GetUserInfo(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "查找用户信息失败",
		})
		return
	}
	goods := []models.Publishgoods{}
	//查询所有数据
	db.Debug().Where("openid = ? and is_status = ?", User.Openid, 1).Find(&goods)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": goods,
	})
}

// 下架商品
func OffSale(c *gin.Context) {
	db := utils.GetDB()

	var req models.Publishgoods
	if err := c.BindJSON(&req); err != nil {
		// 错误处理
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "参数错误",
		})
		return
	}

	//开启事务
	tx := db.Begin()

	if err := tx.Model(&req).Where("id = ?", req.ID).Update("is_status", 1).Error; err != nil {
		// 发生错误时回滚事务并输出错误信息
		tx.Rollback()
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "下架失败",
		})
		return
	}

	// 操作完成时提交事务并输出上传成功信息
	tx.Commit()
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "下架成功",
	})
}

// 获取收藏列表
func GetCollect(c *gin.Context) {
	fmt.Println("GetCollect")
	db := utils.GetDB()
	//获取token
	token := c.Request.Header.Get("Authorization")
	//解析token
	userId, _ := utils.ParseToken(token)
	User, err := GetUserInfo(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "查找用户信息失败",
		})
		return
	}
	collect := []models.Collect{}
	//查询所有数据
	db.Debug().Where("openid = ?", User.Openid).Find(&collect)
	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": 500,
			"msg":  "操作失败",
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "操作成功",
		"list": collect,
	})
}

// 删除收藏列表商品
func DelCollect(c *gin.Context) {
	db := utils.GetDB()
	//获取token
	token := c.Request.Header.Get("Authorization")
	//解析token
	userId, _ := utils.ParseToken(token)
	User, err := GetUserInfo(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "查找用户信息失败",
		})
		return
	}

	var req models.Collect
	if err := c.BindJSON(&req); err != nil {
		// 错误处理
		c.JSON(http.StatusUnauthorized, gin.H{
			"code": 400,
			"msg":  "参数错误",
		})
		return
	}

	//开启事务
	tx := db.Begin()

	if err := tx.Where("id = ? and openid = ?", req.ID, User.Openid).Delete(&req).Error; err != nil {
		// 发生错误时回滚事务并输出错误信息
		tx.Rollback()
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "删除失败",
		})
		return
	}

	// 操作完成时提交事务并输出上传成功信息
	tx.Commit()
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "删除成功",
	})
}
