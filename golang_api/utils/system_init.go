package utils

import (
	"fmt"

	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// 定义全局的db对象
var DB *gorm.DB

func InitConfig() {
	viper.SetConfigName("app")
	viper.AddConfigPath("config")
	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("config mysql:", viper.Get("mysql"))
}

func InitMysql() {
	var err error
	//连接数据库
	DB, err = gorm.Open(mysql.Open(viper.GetString("mysql.dns")), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	sqlDB, _ := DB.DB()

	//设置数据库连接池参数
	sqlDB.SetMaxOpenConns(100) //设置数据库连接池最大连接数
	sqlDB.SetMaxIdleConns(20)  //连接池最大允许的空闲连接数，如果没有sql任务需要执行的连接数大于20，超过的连接会被连接池关闭。
}

func GetDB() *gorm.DB {
	return DB
}

func GetExpirationTime() (int, string) {
	//获取过期时间和token 密钥
	expirationTime, _ := viper.Get("token.time").(int)
	secretKey, _ := viper.Get("token.secretKey").(string)

	return expirationTime, secretKey
}

// 获取服务端口号
func GetServerPort() string {
	return viper.GetString("server.port")
}

// 获取邮箱配置
func GetEmailConfig() (string, string, string, string) {
	host := viper.GetString("email.host")
	port := viper.GetString("email.port")
	from := viper.GetString("email.from")
	password := viper.GetString("email.pass")

	return from, password, host, port
}

// 获取密码加密密钥
func GetPasswordSecret() string {
	return viper.GetString("password.secretKey")
}
