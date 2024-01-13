package models

// User 是用户信息结构体
type User struct {
	ID        uint   `gorm:"primary_key;auto_increment" json:"id"`
	Openid    string `gorm:"not null" json:"email"`
	Password  string `gorm:"not null" json:"password"`
	NickName  string `gorm:"column:nickName" json:"nickName"`
	AvatarUrl string `gorm:"column:avatarUrl" json:"avatarUrl"`
	Token     string // 添加 Token 字段
}

// TableName 指定表名
func (User) TableName() string {
	return "user"
}
