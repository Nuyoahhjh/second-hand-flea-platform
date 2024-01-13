package api

import (
	"net/http"
	"tiaozaoServer/utils"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/mem"
)

func SystemHandler(c *gin.Context) {
	// 获取CPU信息
	cpuInfo, err := cpu.Info()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	cpuJSON := make(map[string]interface{})
	cpuJSON["model_name"] = cpuInfo[0].ModelName
	cpuJSON["cores"] = cpuInfo[0].Cores

	// 获取每个核心的CPU使用情况
	cpuUsage, err := cpu.Percent(time.Second, true)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	var coreUsages []interface{}
	for i, usage := range cpuUsage {
		coreUsages = append(coreUsages, map[string]interface{}{
			"core":  i,
			"usage": usage,
		})
	}
	cpuJSON["core_usages"] = coreUsages

	// 获取内存信息
	memInfo, err := mem.VirtualMemory()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	memJSON := make(map[string]interface{})
	memJSON["total"] = memInfo.Total
	memJSON["used"] = memInfo.Used
	memJSON["available"] = memInfo.Available

	// 获取磁盘信息
	partitions, err := disk.Partitions(false)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	var diskJSON []interface{}
	for _, partition := range partitions {
		diskInfo, err := disk.Usage(partition.Mountpoint)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		diskJSON = append(diskJSON, map[string]interface{}{
			"device": partition.Device,
			"total":  diskInfo.Total,
			"used":   diskInfo.Used,
			"free":   diskInfo.Free,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"cpu":    cpuJSON,
		"memory": memJSON,
		"disk":   diskJSON,
	})
}

func CmdHandler(c *gin.Context) {
	type CmdRequest struct {
		Cmd  string `json:"cmd"`
		Args string `json:"args"`
	}
	var req CmdRequest
	c.BindJSON(&req)
	result, err := utils.ExecCommand(req.Cmd, req.Args)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	//返回结果
	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})

}
