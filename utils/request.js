import env from "@/config/env.js";
let isShowingLoginModal = false;
// 全局请求封装
const request = (options = {}) => {
	// 1. 处理 URL
	// 如果 options.url 已经是完整的 http 开头，则不拼接 baseUrl
	let url = options.url;
	if (url.indexOf("http") !== 0) {
		url = env.baseUrl + url;
	}

	// 2. 获取 Token (假设存在 vuex 或 localStorage 中)
	const token = uni.getStorageSync("token");

	// 3. 返回 Promise
	return new Promise((resolve, reject) => {
		// 开启 Loading (可选，根据 options.loading 控制)
		if (options.loading) {
			uni.showLoading({
				title: options.loadingText || "加载中...",
				mask: true,
			});
		}

		uni.request({
			url: url,
			data: options.data || {},
			method: options.method || "GET",
			header: {
				"content-type": options.contentType || "application/json",
				Authorization: token ? `Bearer ${token}` : "", // 携带 Token
			},
			success: (res) => {
				// === 响应拦截器 ===

				// 1. HTTP 状态码判断
				if (res.statusCode === 200) {
					// 2. 业务状态码判断 (根据后端约定，这里假设 code === 200 或 0 为成功)
					// 假设后端返回结构: { code: 200, data: {}, msg: 'success' }
					const {
						code,
						data,
						msg
					} = res.data;

					if (code === 200 || code === 0) {
						resolve(res.data);
					} else if (code === 402) {
						uni.$emit("show-storage-warning", {
							msg: msg || "操作受限",
							data,
						});
						reject(res.data);
					} else if (code === 601) {
						resolve(res.data);
					} else if (code === 401) {
						isShowingLoginModal = false;
						reject(res.data);
					} else if (code === 500) {
						uni.showToast({
							title: msg || "请求失败",
							icon: "none",
						});
						reject(res.data);
					} else {
						uni.showToast({
							title: msg || "请求失败",
							icon: "none",
						});
						reject(res.data);
					}
				} else {
					// HTTP 错误 (404, 500 等)
					uni.showToast({
						title: `请求错误: ${res.statusCode}`,
						icon: "none",
					});
					reject(res);
				}
			},
			fail: (err) => {
				console.log(err)
				// 网络错误等
				uni.showToast({
					title: "网络连接失败",
					icon: "none",
				});
				reject(err);
			},
			complete: () => {
				// 关闭 Loading
				if (options.loading) {
					uni.hideLoading();
				}
			},
		});
	});
};

// 便捷方法
request.get = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: "GET",
		...options,
	});
};

request.post = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: "POST",
		...options,
	});
};

request.put = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: "PUT",
		...options,
	});
};

request.delete = (url, data, options = {}) => {
	return request({
		url,
		data,
		method: "DELETE",
		...options,
	});
};

export default request;
