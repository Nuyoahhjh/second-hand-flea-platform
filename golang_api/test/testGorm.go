package main

import (
	"tiaozaoServer/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	//连接数据库
	db, err := gorm.Open(mysql.Open("user:Hejunhao01@tcp(43.142.116.234:3306)/tiaozao?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	// 迁移 schema
	db.AutoMigrate(&models.User{})

	// //创建一个User结构体
	// user := &models.User{
	// 	Username: "name1",
	// 	Password: "password1",
	// 	Email:    "email1",
	// 	Phone:    "phone1",
	// 	Identity: "identity1",
	// }
	// fmt.Println(user)
	// //创建一条记录
	// db.Create(user)

	// //查询一条记录
	// db.First(user, 1)
	// //更新一条记录
	// db.Model(user).Update("username", "name2")
	// //删除一条记录
	// db.Delete(user)
}
