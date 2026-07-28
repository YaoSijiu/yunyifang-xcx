// 环境配置
const env = {
	// 开发环境http://192.168.199.203:9999
	development: {
		// baseUrl: "http://192.168.199.106:9999", // 替换为你的开发环境API地址
		// baseUrl:"https://kkm.hnpuyuan.com/prod-api",
		baseUrl: "https://kkm.hnpuyuan.com/prod-api", // 替换为你的开发环境API地址
		aliyunUrl: "https://yunyifang-test.oss-cn-beijing.aliyuncs.com/",
		merchantTransfer: {
			appId: "wx896fa12b0a27a02d",
			mchId: "",
		},
	},
	// 生产环境
	production: {
		baseUrl: "https://kkm.hnpuyuan.com/prod-api", // 替换为你的生产环境API地址
		aliyunUrl: "https://yunyifang-test.oss-cn-beijing.aliyuncs.com/",
		merchantTransfer: {
			appId: "wx896fa12b0a27a02d",
			mchId: "",
		},
	},
};

// 获取当前环境配置
// NODE_ENV 是 uniapp 内置的环境变量
const currentEnv = env[process.env.NODE_ENV] || env.development;

if (process.env.NODE_ENV === "development") {
	console.log("开发环境"); // 发布到生产环境时，此处代码会被摇树移除掉。
} else {
	console.log("生产环境");
}

export default currentEnv;
