import env from '@/config/env.js'

export function uploadFile(options) {
    const {
		url,
        filePath,
        name = "file",
        formData = {},
    } = options;

    // 生成唯一文件名，解决相同文件名上传失败的问题
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9);
    const fileName = filePath.split('/').pop();
    const uniqueFileName = `${timestamp}_${randomStr}_${fileName}`;

    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url,
            filePath,
            name,
            header: {
                 "Authorization": "Bearer "+uni.getStorageSync("token")
            },
            formData: {
                ...formData,
                fileName: uniqueFileName // 传递唯一文件名给后端
            },
            success: (res) => {
                try {
                    const data = JSON.parse(res.data);
                    resolve(data);
                } catch (e) {
                    reject("返回数据格式错误");
                }
            },
            fail: reject
        });
    });
}



// 多文件批量上传
export function batchUploadFiles(options) {
    const {
        url,
        files          // 数组：[{ name, uri }]
    } = options;

    // 为每个文件生成唯一文件名
    const processedFiles = files.map(file => {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substr(2, 9);
        const fileName = file.uri.split('/').pop();
        const uniqueFileName = `${timestamp}_${randomStr}_${fileName}`;
        return {
            ...file,
            name: uniqueFileName // 使用唯一文件名
        };
    });

    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url,
            files: processedFiles,
            header: {
                "Authorization": "Bearer " + uni.getStorageSync("token")
            },
            success: (res) => {
                try {
                    const data = JSON.parse(res.data);
                    resolve(data);
                } catch (e) {
                    reject("返回数据格式错误");
                }
            },
            fail: reject
        });
    });
	}
