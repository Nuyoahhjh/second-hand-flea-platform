package router

import (
	"net/http"
	"tiaozaoServer/api"
	"tiaozaoServer/utils"

	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	r := gin.Default()
	// 允许跨域请求
	r.Use(cors())
	// 设置静态目录
	r.Static("/uploads", "./uploads")
	// 定义需被授权的路由组
	authorized := r.Group("/api/v1", AuthMiddleware())
	{
		authorized.POST("/goods/upload", api.UploadGoods)
		authorized.GET("/system", api.SystemHandler)
		authorized.POST("/cmd", api.CmdHandler)
		authorized.POST("/addcollect", api.AddCollect)
		authorized.GET("/GetOnSale", api.GetOnSale)
		authorized.GET("/GetOffSale", api.GetOffSale)
		authorized.POST("/OffSale", api.OffSale)
		authorized.GET("/GetCollect", api.GetCollect)
		authorized.DELETE("/DelCollect", api.DelCollect)
		authorized.PUT("/SendMessage", api.SendMessage)
	}

	// 定义不需要授权的路由组
	public := r.Group("")
	{
		public.POST("/login", api.Login)
		public.POST("/sendemail", api.SendEmail)
		public.POST("/register", api.Register)

		public.GET("/nav", api.GetNav)
		public.GET("/goods", api.GetGoods)
		public.GET("/goods/new", api.GetNewGoods)
		public.GET("/goods/hot", api.GetHotGoods)
		public.GET("/goods/free", api.GetFreeGoods)
		public.GET("/lunbo/detail", api.GetLunboDetail)
		public.GET("/goods/addhot", api.AddHotGoods) //特殊处理
		public.GET("/goods/info", api.GetGoodsInfo)
		public.GET("/goods/item", api.GetItemGoods)
		public.GET("/lunbo", api.GetLunbo)
		public.GET("/allsort", api.GetIndexType)
		public.GET("/goods/GetMessages", api.GetMessages)

	}

	return r
}

// AuthMiddleware 验证 token 的中间件
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("Authorization")

		if !utils.ValidateToken(tokenString) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"code": 401,
				"msg":  "该账号在别处登录或token失效，请重新登录",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

// 定义允许跨域请求的中间件
func cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
