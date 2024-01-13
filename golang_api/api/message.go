package api

import (
	"net/http"
	"strconv"
	"tiaozaoServer/models"
	"tiaozaoServer/utils"
	"time"

	"github.com/gin-gonic/gin"
)

// 评论
func SendMessage(c *gin.Context) {
	var req models.Messages

	if err := c.BindJSON(&req); err != nil {
		// 错误处理
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "参数错误",
		})
		return
	}

	token := c.Request.Header.Get("Authorization")
	userId, _ := utils.ParseToken(token)
	User, err := GetUserInfo(userId)

	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "查找用户信息失败",
		})
		return
	}
	req.Openid = User.Openid
	req.AvatarUrl = User.AvatarUrl
	req.NickName = User.NickName
	req.CreatedAt = time.Now().Format("2006-01-02 15:04:05")

	//保存消息
	db := utils.GetDB()
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
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "评论成功",
	})
}

// 获取评论
func GetMessages(c *gin.Context) {
	//获取前端传递的参数
	shopid, _ := strconv.Atoi(c.Query("id"))

	db := utils.GetDB()
	var messages []models.Messages
	if err := db.Where("shopid = ? and is_status = ?", shopid, 0).Order("createdAt desc").Find(&messages).Error; err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"msg":  "获取评论失败",
		})
		return
	}
	//获取用户信息
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "获取评论成功",
		"list": messages,
	})
}
