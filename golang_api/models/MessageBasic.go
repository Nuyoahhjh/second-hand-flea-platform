package models

type Messages struct {
	Openid    string `gorm:"not null" json:"openid"`
	Shopid    uint   `gorm:"column:shopid;not null" json:"shopid"`
	Message   string `gorm:"column:message;not null" json:"message"`
	Is_status int    `gorm:"column:is_status;not null" json:"is_status"`
	CreatedAt string `gorm:"column:createdAt;not null" json:"createdAt"`
	AvatarUrl string `gorm:"column:avatarUrl" json:"avatarUrl"`
	NickName  string `gorm:"column:nickName" json:"nickName"`
}
