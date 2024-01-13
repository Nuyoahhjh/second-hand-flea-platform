package models

// Nav 导航
type Nav struct {
	ID     uint   `gorm:"primary_key;auto_increment" json:"id"`
	Title  string `gorm:"not null" json:"title"`
	ImgUrl string `gorm:"column:imgUrl;not null" json:"imgUrl"`
	GoUrl  string `gorm:"column:goUrl;not null" json:"goUrl"`
}

func (n *Nav) TableName() string {
	return "nav"
}

// 商品记录
type Publishgoods struct {
	ID        uint    `gorm:"primary_key;auto_increment" json:"id"`
	Openid    string  `gorm:"" json:"openid"`
	Title     string  `gorm:"not null" json:"title"`
	Des       string  `gorm:"not null" json:"des"`
	Price     float64 `gorm:"not null" json:"price"`
	Oprice    float64 `gorm:"not null" json:"Oprice"`
	Image     string  `gorm:"not null" json:"image"`
	TitleImg  string  `gorm:"not null;column:titleImg" json:"titleImg"`
	Type      string  `gorm:"not null" json:"type"`
	ShendTime string  `gorm:"not null;column:shendTime" json:"shendTime"`
	View      int     `gorm:"not null" json:"view"`
	AvatarUrl string  `gorm:"column:avatarUrl" json:"avatarUrl"`
	NickName  string  `gorm:"column:nickName" json:"nickName"`
	Contact   string  `gorm:"not null" json:"contact"`
	Is_status int     `gorm:"not null" json:"is_status"`
}

//轮播图
type Lunbotu struct {
	ID     uint   `gorm:"primary_key;auto_increment" json:"id"`
	ImgUrl string `gorm:"column:imgUrl;not null" json:"imgUrl"`
}

func (l *Lunbotu) TableName() string {
	return "lunbotu"
}

//首页分类数据
type IndexType struct {
	ID     uint   `gorm:"primary_key;auto_increment" json:"id"`
	Title  string `gorm:"not null" json:"title"`
	ImgUrl string `gorm:"column:imgUrl;not null" json:"imgUrl"`
}

func (I *IndexType) TableName() string {
	return "allsort"
}

//收藏列表
type Collect struct {
	ID          uint    `gorm:"primary_key;auto_increment" json:"id"`
	Openid      string  `gorm:"" json:"openid"`
	Goods_title string  `gorm:"column:goods_title" json:"goods_title"`
	Goods_des   string  `gorm:"column:goods_des" json:"goods_des"`
	Goods_price float32 `gorm:"column:goods_price" json:"goods_price"`
	Goods_image string  `gorm:"column:goods_image" json:"goods_image"`
}

func (C *Collect) TableName() string {
	return "collectionlist"
}
