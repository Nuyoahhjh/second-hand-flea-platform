// const BASE_URL = 'http://tiaozao.ithejunhao.fun:3001'
// const BASE_URL = 'http://10.168.100.135:9000'
// const BASE_URL = 'http://192.168.0.3:3000'

import config from "../config.json"
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			headers: {"Content-Type": "application/json"},
			// , "Authorization": token
			success: (res) => {
				if (res.data.code !== 200) {
					return uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}
