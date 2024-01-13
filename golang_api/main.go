package main

import (
	"tiaozaoServer/service"
	"tiaozaoServer/utils"
)

func main() {
	utils.InitConfig()
	utils.InitMysql()
	// // 设置模式
	// gin.SetMode(gin.ReleaseMode)
	service.Run()
}
