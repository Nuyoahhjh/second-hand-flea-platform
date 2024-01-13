package utils

import (
	"errors"
	"tiaozaoServer/models"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// 定义 JWTClaims 结构体，存储 JWT 载荷数据
type JWTClaims struct {
	UserID uint `json:"user_id"`
	jwt.StandardClaims
}

// 生成 token 的函数
func GenerateToken(userID uint) (string, error) {
	tokenTime, secretKey := GetExpirationTime()

	// 指定过期时间
	expirationTime := time.Now().Add(time.Duration(tokenTime) * time.Hour)

	// 创建 JWTClaims 结构体实例
	claims := &JWTClaims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// 使用 HMAC 算法生成 token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// 将 token 签名并转换为字符串形式
	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// 解析 token 的函数
func ParseToken(tokenString string) (uint, error) {
	_, secretKey := GetExpirationTime()

	// 解析 JWT token
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		// 使用相同的 secret_key 解密 token
		return []byte(secretKey), nil
	})

	if err != nil {
		return 0, err
	}

	// 检查 token 是否有效
	if !token.Valid {
		return 0, errors.New("invalid token")
	}

	// 提取 JWTClaims 结构体中的 UserID 值，并将其转换为 uint 类型
	claims, ok := token.Claims.(*JWTClaims)
	if !ok {
		return 0, errors.New("invalid token claims")
	}

	return claims.UserID, nil
}

// 校验 token 的函数
func ValidateToken(tokenString string) bool {
	_, secretKey := GetExpirationTime()

	// 解析 JWT token
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		// 使用相同的 secret_key 解密 token
		return []byte(secretKey), nil
	})

	if err != nil {
		return false
	}

	// 检查 token 是否有效
	if !token.Valid {
		return false
	}
	userID, _ := ParseToken(tokenString)
	// 从数据库中获取相应用户的 token 值
	userToken := getUserTokenFromDB(userID)

	// 将解析 JWT Token 获得的 UserID 对应的 token 值与数据库中的 token 值进行比较
	return userToken == tokenString
}

// 获取数据库中相应用户的 token 值的函数
func getUserTokenFromDB(userID uint) string {
	// 实现从数据库中获取相应用户的 token 值的逻辑
	db := GetDB()
	User := models.User{}
	db.Where("id = ?", userID).Find(&User)
	return User.Token
}
