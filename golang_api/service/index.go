package service

import (
	"fmt"
	"net/http"
	"tiaozaoServer/router"
	"tiaozaoServer/utils"
	"time"
)

// 启动server
func Run() {
	r := router.Router()
	s := &http.Server{
		Addr:         ":" + utils.GetServerPort(),
		Handler:      r,
		ReadTimeout:  100 * time.Second, //最大读取时间
		WriteTimeout: 100 * time.Second, //最大响应时间
	}
	if err := s.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		fmt.Println("服务启动失败:", err)
		return
	}
	fmt.Println("服务启动成功，监听端口为：" + utils.GetServerPort())
}
