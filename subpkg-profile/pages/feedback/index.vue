<template>
	<view class="page-container">

		<!-- 1. 顶部 Tab 切换 -->
		<view class="tabs-header">
			<view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">
				我要反馈
				<image v-if="currentTab == 0" class="yellow-underline" src="/static/common/选中条.png"></image>
			</view>
			<view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">
				反馈记录
				<image v-if="currentTab == 1" class="yellow-underline" src="/static/common/选中条.png"></image>
			</view>
		</view>

		<!-- 2. 主要内容区域 - 使用 swiper 实现左右滑动切换 -->
		<swiper ref="swiper" :current="currentTab" @change="handleSwiperChange" class="main-swiper">
			<!-- 提交表单区域 -->
			<swiper-item>
				<view class="content-box">
					<view class="form-card">

						<!-- (1) 联系邮箱 -->
						<view class="form-item">
							<text class="label">联系邮箱</text>
							<input class="input" placeholder="请输入您的邮箱，以便我们要联系您" v-model="formData.email" />
						</view>

						<!-- (2) 问题详细描述 -->
						<view class="form-item">
							<text class="label">详细描述</text>
							<textarea class="textarea" placeholder="请详细描述您遇到的问题..." v-model="formData.content"
								maxlength="200"></textarea>
							<text class="counter">{{ formData.content.length }}/200</text>
						</view>

						<!-- (3) 截图上传 (最多3张) -->
						<view class="form-item no-border">
							<text class="label">问题截图 ({{ formData.images.length }}/3)</text>
							<view class="image-grid">
								<!-- 已选择的图片 -->
								<view class="image-item" v-for="(img, index) in formData.images" :key="index">
									<image :src="resolveUrl(img)" mode="aspectFill" class="thumb" @click="previewImage(index)">
									</image>
									<!-- 删除按钮 -->
									<view class="del-btn" @click.stop="deleteImage(index)">×</view>
								</view>

								<!-- 上传按钮 (没满3张时显示) -->
								<view class="upload-btn" @click="chooseImage" v-if="formData.images.length < 3">
									<text class="plus">+</text>
								</view>
							</view>
						</view>

					</view>

					<button class="submit-btn" @click="submitFeedback">提交反馈</button>
				</view>
			</swiper-item>

			<!-- 反馈记录列表区域 -->
			<swiper-item>
				<view class="content-box">
					<view v-if="feedbackList.length === 0" class="empty-tip">暂无反馈记录</view>

					<view class="feedback-item" v-for="(item, index) in feedbackList" :key="index">
						<view class="item-header">
							<!-- 这里的标题自动截取内容的前10个字 -->
							<text class="item-title">{{ item.title || '问题反馈' }}</text>
							<!-- 意思：如果是0用pending样式，是1用resolved样式，是2用closed样式 -->
							<view class="status-tag"
								:class="{ 'pending': item.status == 0, 'resolved': item.status == 1, 'closed': item.status == 2 }">
								{{ getStatusText(item.status) }}
							</view>
						</view>

						<view class="item-content">{{ item.content }}</view>

						<!-- 如果有图片，在列表中展示缩略图 -->
						<view class="item-imgs" v-if="item.images && item.images.length > 0">
							<image v-for="(img, i) in item.images" :key="i" :src="resolveUrl(img)" mode="aspectFill"
								class="list-thumb">
							</image>
						</view>

						<view class="item-footer">
							<text class="time">{{ item.time }}</text>
							<text class="email-tip">联系邮箱: {{ item.email }}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
import config from '@/config/env.js';
import {
	uploadFile
} from '@/utils/uploadUtil.js';

export default {
	data() {
		return {
			currentTab: 0,
			ossBaseUrl: config.aliyunUrl,

			// 表单数据
			formData: {
				email: '',
				content: '',
				images: [] // 存放图片路径的数组
			},

			// 列表数据
			feedbackList: []
		};
	},
	onShow() {
		if (this.currentTab === 1) {
			this.getFeedbackList();
		}
	},
	methods: {
		// 切换Tab
		switchTab(index) {
			this.currentTab = index;
			// 同步swiper的位置
			if (this.$refs.swiper) {
				this.$refs.swiper.setCurrent(index);
			}
			if (index === 1) {
				this.getFeedbackList();
			}
		},
		
		// 处理swiper滑动切换
		handleSwiperChange(e) {
			const index = e.detail.current;
			this.currentTab = index;
			if (index === 1) {
				this.getFeedbackList();
			}
		},
		resolveUrl(url) {
			if (!url) return '';
			if (/^(http|https|wxfile|data):/.test(url)) {
				return url;
			}
			return this.ossBaseUrl + url;
		},

		// 获取反馈列表
		getFeedbackList() {
			// const userInfo = uni.getStorageSync('userInfo');
			// if (!userInfo || !userInfo.id) return;

			this.$request.get(`/wechat/feedback/list`).then(res => {
				// res.data 是数组
				if (!res.data) return;
				this.feedbackList = res.data.map(item => {
					let images = [];
					if (item.screenshotUrl) {
						if (Array.isArray(item.screenshotUrl)) {
							images = item.screenshotUrl;
						} else if (typeof item.screenshotUrl === 'string') {
							// 处理类似 "[url1, url2]" 的字符串格式
							let cleanUrl = item.screenshotUrl.trim();
							if (cleanUrl.startsWith('[') && cleanUrl.endsWith(']')) {
								cleanUrl = cleanUrl.substring(1, cleanUrl.length - 1);
							}
							images = cleanUrl.split(',').map(i => i.trim()).filter(i => i);
						}
					}
					// 构造用于显示的 item
					return {
						id: item.id,
						email: item.email,
						content: item.description,
						title: item.description ? (item.description.substring(0, 10) + (item.description
							.length > 10 ? '...' : '')) : '问题反馈',
						images: images,
						time: item.createTime,
						status: item.status, // "0", "1"
						handler: item.handler
					};
				});
			}).catch(err => {
				console.error('获取反馈列表失败', err);
			});
		},

		// 选择图片
		chooseImage() {
			uni.chooseMedia({
				count: 3 - this.formData.images.length,
				mediaType: ['image'],
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async (res) => {
					const tempFiles = res.tempFiles;
					// 过滤不支持的格式
					const allowedExtensions = ['jpg', 'jpeg', 'png'];
					const validFiles = tempFiles.filter(file => {
						const ext = file.tempFilePath.substring(file.tempFilePath.lastIndexOf('.') + 1).toLowerCase();
						return allowedExtensions.includes(ext);
					});

					if (validFiles.length !== tempFiles.length) {
						uni.showToast({
							title: '仅支持 jpg, jpeg, png 格式的图片',
							icon: 'none'
						});
					}

					if (validFiles.length === 0) return;

					uni.showLoading({
						title: '上传中...'
					});
					for (let file of validFiles) {
						try {
							const uploadRes = await uploadFile({
								url: config.baseUrl + '/wechat/basic/upload',
								filePath: file.tempFilePath,
								name: 'file'
							});

							if (uploadRes.code === 200) {
								this.formData.images.push(uploadRes.msg);
							} else {
								uni.showToast({
									title: uploadRes.msg || '上传失败',
									icon: 'none'
								});
							}
						} catch (e) {
							console.error('上传出错', e);
							uni.showToast({
								title: '上传出错',
								icon: 'none'
							});
						}
					}
					uni.hideLoading();
				}
			});
		},
		// 预览图片
		previewImage(index) {
			const urls = this.formData.images.map(img => this.resolveUrl(img));
			uni.previewImage({
				urls: urls,
				current: index
			});
		},
		// 删除图片
		deleteImage(index) {
			this.formData.images.splice(index, 1);
		},

		// 提交反馈
		submitFeedback() {
			// 1. 验证邮箱
			if (!this.formData.email.trim()) {
				return uni.showToast({
					title: '请填写联系邮箱',
					icon: 'none'
				});
			}
			// 简单的邮箱格式校验
			const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if (!emailReg.test(this.formData.email)) {
				return uni.showToast({
					title: '邮箱格式不正确',
					icon: 'none'
				});
			}

			// 2. 验证内容
			if (!this.formData.content.trim()) {
				return uni.showToast({
					title: '请填写问题描述',
					icon: 'none'
				});
			}

			uni.showLoading({
				title: '提交中...'
			});

			// const userInfo = uni.getStorageSync('userInfo');
			const postData = {
				email: this.formData.email,
				description: this.formData.content,
				screenshotUrl: this.formData.images // 传数组
			};

			this.$request.post('/wechat/feedback', postData).then(res => {
				uni.hideLoading();
				if (res.code === 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					});
					// 清空表单
					this.formData.content = '';
					this.formData.images = [];

					// 刷新列表并切换 tab
					this.getFeedbackList();
					setTimeout(() => {
						this.currentTab = 1;
					}, 1000);
				}
			})
		},

		getStatusText(status) {
			const map = {
				0: '未处理',
				1: '已解决',
				2: '已关闭'
			};
			// status 可能是字符串 "0" 或数字 0
			return map[Number(status)] || '未知';
		},

		getStatusClass(status) {
			const map = {
				0: 'pending',
				1: 'resolved',
				2: 'closed'
			};
			return map[status] || '';
		},
		getNowFormatDate() {
			const date = new Date();
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		}
	}
};
</script>

<style lang="scss" scoped>
.page-container {
	min-height: 100vh;
	background-color: #f5f7fa;
}

.main-swiper {
	width: 100%;
	height: calc(100vh - 120rpx); /* 减去顶部tab的高度 */
}

.main-swiper swiper-item {
	height: 100%;
}

.tabs-header {
	display: flex;
	background: #fff;
	padding: 0 40rpx;
	position: sticky;
	top: 0;
	z-index: 10;

	.tab-item {
		margin-right: 60rpx;
		padding: 30rpx 0;
		font-size: 30rpx;
		color: #666;
		position: relative;

		&.active {
			color: #333;
			font-weight: bold;
			font-size: 32rpx;
		}

		.line {
			position: absolute;
			bottom: 10rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 40rpx;
			height: 6rpx;
			background: #ffd700;
			border-radius: 4rpx;
		}
	}
}
.yellow-underline {
	width: 50rpx;
	height: 12rpx;
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 6rpx;
}
.content-box {
	padding: 30rpx;
}

.form-card {
	background: #fff;
	border-radius: 20rpx;
	padding: 0 30rpx;
	margin-bottom: 40rpx;

	.form-item {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&.no-border {
			border-bottom: none;
		}

		.label {
			display: block;
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			color: #333;
		}

		.input {
			font-size: 28rpx;
			height: 60rpx;
		}

		.textarea {
			width: 100%;
			height: 200rpx;
			font-size: 28rpx;
			line-height: 1.5;
		}

		.counter {
			display: block;
			text-align: right;
			font-size: 24rpx;
			color: #ccc;
		}

		/* 图片上传网格 */
		.image-grid {
			display: flex;
			flex-wrap: wrap;

			.image-item {
				position: relative;
				width: 150rpx;
				height: 150rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;

				.thumb {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}

				.del-btn {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
					background: rgba(0, 0, 0, 0.5);
					color: #fff;
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					text-align: center;
					line-height: 34rpx;
					font-size: 24rpx;
				}
			}

			.upload-btn {
				width: 150rpx;
				height: 150rpx;
				background: #f8f8f8;
				border: 2rpx dashed #ddd;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.plus {
					font-size: 60rpx;
					color: #ccc;
					font-weight: 300;
				}
			}
		}
	}
}

.submit-btn {
	background: #F37738;
	color: #fff;
	font-weight: bold;
	border-radius: 50rpx;
}

/* 列表部分 */
.empty-tip {
	text-align: center;
	color: #999;
	padding-top: 100rpx;
}

.feedback-item {
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;

	.item-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10rpx;

		.item-title {
			font-weight: bold;
			font-size: 30rpx;
			color: #333;
		}

		.status-tag {
			font-size: 24rpx;
			padding: 4rpx 12rpx;
			border-radius: 8rpx;

			&.pending {
				background: #fff7e6;
				color: #fa8c16;
			}

			&.resolved {
				background: #f6ffed;
				color: #52c41a;
			}

			&.closed {
				background: #f5f5f5;
				color: #999;
			}
		}
	}

	.item-content {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	/* 列表中的图片预览 */
	.item-imgs {
		display: flex;
		margin-bottom: 20rpx;

		.list-thumb {
			width: 100rpx;
			height: 100rpx;
			margin-right: 15rpx;
			border-radius: 8rpx;
			background: #eee;
		}
	}

	.item-footer {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999;
	}
}
</style>