import env from '@/config/env.js'

const width = 400;
const height = 400;


function buildOssImageUrl(baseUrl) {
	// return env.aliyunUrl + baseUrl + `?x-oss-process=image/resize,w_${width}`;
	return env.aliyunUrl + baseUrl+"?x-oss-process=image/resize,w_750/quality,q_65/format,webp";
}

export default buildOssImageUrl