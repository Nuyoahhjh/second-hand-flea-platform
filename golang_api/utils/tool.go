package utils

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"os/exec"
	"strconv"

	"golang.org/x/text/encoding/simplifiedchinese"
	"gopkg.in/gomail.v2"
)

func SendEmail(to, subject, body string) error {
	from, password, smtpHost, smtpPort := GetEmailConfig()
	port, _ := strconv.Atoi(smtpPort)

	m := gomail.NewMessage()
	//发送人
	m.SetHeader("From", from)
	//接收人
	m.SetHeader("To", to)
	//抄送人
	//m.SetAddressHeader("Cc", "xxx@qq.com", "xiaozhujiao")
	//主题
	m.SetHeader("Subject", "验证码")
	//内容
	m.SetBody("text/html", body)
	//附件
	//m.Attach("./myIpPic.png")

	//拿到token，并进行连接,第4个参数是填授权码
	d := gomail.NewDialer(smtpHost, port, from, password)

	// 发送邮件
	if err := d.DialAndSend(m); err != nil {
		fmt.Printf("DialAndSend err %v:", err)
		return err
	}
	return nil
}

// 加密函数，使用AES-CFB加密，IV向量长度等于块长度
func EncryptPassword(password []byte) (string, error) {
	key := []byte(GetPasswordSecret())
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(password))
	iv := ciphertext[:aes.BlockSize]
	if _, err = io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], password)

	return base64.URLEncoding.EncodeToString(ciphertext), nil
}

// 比对明文密码和密文密码是否匹配
func ComparePassword(plaintext, ciphertext string) bool {
	key := []byte(GetPasswordSecret())
	ciphertextBytes, _ := base64.URLEncoding.DecodeString(ciphertext)
	block, _ := aes.NewCipher(key)
	if len(ciphertextBytes) < aes.BlockSize {
		return false
	}
	iv := ciphertextBytes[:aes.BlockSize]
	ciphertextBytes = ciphertextBytes[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)
	decrypted := make([]byte, len(ciphertextBytes))
	stream.XORKeyStream(decrypted, ciphertextBytes)

	return bytes.Equal(decrypted, []byte(plaintext))
}

// 执行cmd命令
func ExecCommand(cmdName string, args ...string) (string, error) {
	cmdPath, err := exec.LookPath(cmdName)
	if err != nil {
		return "", err
	}
	fmt.Println(cmdPath)
	fmt.Println(args)
	command := exec.Command(cmdPath, args...)

	out, err := command.CombinedOutput()
	if err != nil {
		return "", err
	}
	output, err := simplifiedchinese.GB18030.NewDecoder().String(string(out)) //转换字符集，解决UTF-8乱码
	if err != nil {
		fmt.Println(err)
	}
	return string(output), nil
}
