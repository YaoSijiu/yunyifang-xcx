<template>
	<view class="publish-container">
		<!-- 1. 标题输入 -->
		<view class="input-section">
			<input class="title-input" placeholder="请输入作品标题" placeholder-class="placeholder-style" v-model="title" />
		</view>

		<!-- 2. 封面上传 -->
		<!-- <view class="tag-section" @click="openCoverUpload">
			<view class="tag-label">
				<text v-if="!coverImage" class="add-tag-btn">添加作品封面 ></text>
				<image v-else :src="coverImage.startsWith('http') ? coverImage : ossUrl + coverImage"
					style="width: 120rpx; height: 120rpx; border-radius: 8rpx;" mode="aspectFill"></image>
			</view>
		</view> -->

		<!-- 作品简介 -->
		<!-- 	<view class="tag-section" @click="showDescPopup = true">
			<view class="tag-label">
				<text v-if="!description" class="add-tag-btn">添加作品简介 ></text>
				<view v-else
					style="font-size: 28rpx; color: #333; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
					{{ description }}
				</view>
			</view>
		</view> -->

		<!-- 3. 标签选择 -->
		<view class="tag-section" @click="openTags">
			<view class="tag-label">
				<text v-if="tags.length === 0" class="add-tag-btn">添加作品标签 ></text>
				<view v-else class="selected-tags">
					<text class="tag-pill" v-for="(tag, index) in tags" :key="index">#{{tag.tagName}}</text>
				</view>
			</view>
		</view>

		<!-- 3. 上传区域 -->
		<view class="upload-section">
			<!-- A. 无图片时显示的占位符 -->
			<view class="upload-placeholder" v-if="imageItems.length === 0">
				<text class="placeholder-text">推荐用4-8张图片展示一个案例</text>
				<div class="upload-guide-container" v-if="imageItems.length === 0">
					<span class="text">点击右下角</span>
					<div class="upload-icon">
						<!-- <span class="plus">+</span> -->
						<image class="plus2" src="/static/common/发布.png"></image>
					</div>
					<span class="text">上传</span>
				</div>
			</view>

			<!-- B. 有图片/视频时显示的九宫格预览 -->
			<view class="image-grid" v-else>
				<!-- 已上传图片/视频 -->
				<view class="image-item" v-for="(item, index) in imageItems" :key="item.id" :class="{
					'dragging': draggingId === item.id,
					'last-image': index === imageItems.length - 1,
					'placeholder': placeholderIndex === index && draggingId !== item.id
				}" :style="{
					// 拖拽元素仅通过transform实现位移
					transform: draggingId === item.id && startPosition && currentPosition
						? `translate(${currentPosition.x - startPosition.x}px, ${currentPosition.y - startPosition.y}px) scale(1.1)`
						: 'none',
					zIndex: draggingId === item.id ? 999 : 1,
					transition: draggingId === item.id ? 'none' : 'transform 0.2s ease'
				}" @longpress="() => onLongPress(item.id, index)" @tap="() => onTap(index)" @touchstart="(e) => onTouchStart(e, item.id, index)"
					@touchmove.stop.prevent="(e) => onTouchMove(e, item.id, index)" @touchend="(e) => onTouchEnd(e, item.id, index)">
					<view class="image-container">
						<!-- 根据文件类型选择显示image、video或文档图标 -->
						<image v-if="item.url && typeof item.url === 'string' && !isPdfFile(item.url) && !isPptFile(item.url) && !isVideoFile(item.url)"
							:src="getFullUrlWithProcess(item.url)"
							class="image-preview loaded" mode="aspectFill" @load="onImageLoad"></image>
						<!-- 视频显示 -->
						<view v-else-if="item.url && typeof item.url === 'string' && isVideoFile(item.url)" class="video-preview">
							<video :src="getFullUrl(item.url)"
								class="image-preview loaded" controls="false" autoplay="false" loop="false"
								show-center-play-btn="false"></video>
							<view class="video-tag">
								<text class="video-tag-text">视频</text>
							</view>
						</view>
						<!-- PDF文档显示 -->
						<view v-else-if="item.url && typeof item.url === 'string' && isPdfFile(item.url)" class="document-preview">
							<image src="/static/icon/pdf.svg" class="document-icon"></image>
							<text class="document-name">{{ getFileName(item.url) }}</text>
						</view>
						<!-- PPT/PPTX文档显示 -->
						<view v-else-if="item.url && typeof item.url === 'string' && isPptFile(item.url)" class="document-preview">
							<image src="/static/icon/pptx.svg" class="document-icon"></image>
							<text class="document-name">{{ getFileName(item.url) }}</text>
						</view>
						<view v-else></view>
						<view class="delete-btn" @tap.stop="deleteImage(item.id)">
							<image src="/static/icon/删除.svg" style="width: 100%; height: 100%; display: block;"
								mode="aspectFit"></image>
						</view>
						<!-- 上传加载动画 -->
						<view class="loading-container" v-if="item.status === 'uploading'">
							<view class="loading-spinner"></view>
							<text class="loading-text">上传中</text>
						</view>
					</view>
				</view>

				<!-- 加号按钮 (如果没满9张) -->
				<!-- <view class="image-item" v-if="images.length < 9" @click="showUploadPopup = true">
					<view class="add-container">
						<view class="add-icon">+</view>
					</view>
				</view> -->
			</view>
		</view>

		<!-- 悬浮上传按钮 -->
		<view class="floating-upload-btn" @click="openWorksUpload">
			<!-- <text class="plus" >+</text> -->
			<!-- <div class="upload-icon"> -->
			<!-- <span class="plus">+</span> -->
			<image class="plus" src="/static/common/底部发布.png"></image>
			<!-- </div> -->
		</view>

		<!-- 底部确认发布按钮 -->
		<view class="footer-btn-area">
			<button class="publish-btn" :class="{ 'disabled': !canSubmit }" @click="submitPublish"
				:disabled="!canSubmit">确认发布</button>
		</view>

		<!-- 4. 底部上传方式弹窗 (自定义 Popup) -->
		<view class="popup-mask" v-if="showUploadPopup" @click="showUploadPopup = false">
			<view class="popup-content" @click.stop>
				<view class="popup-handle"></view>

				<view class="popup-header">
					<text class="ph-title">选择上传途径</text>
					<text class="ph-link" @click="showComputerGuide">如何从电脑上传 ></text>
				</view>

				<view class="popup-list">
					<!-- 本地相册 -->
					<view class="popup-item" @click="chooseImage('album')">
						<image src="/static/publish/相册.png" class="p-icon"></image>
						<view class="p-info">
							<text class="p-main">从本地相册选择</text>
						</view>
						<text class="p-sub">一次最多可选20张</text>
					</view>

					<!-- 聊天记录 -->
					<view class="popup-item" @click="chooseImage('chat')">
						<image src="/static/publish/聊天记录.png" class="p-icon"></image>
						<view class="p-info">
							<text class="p-main">从聊天记录选择</text>
						</view>
						<text class="p-sub">一次最多可选20张</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 简介编辑弹窗 -->
		<view class="popup-mask" v-if="showDescPopup" @click="showDescPopup = false">
			<view class="popup-content desc-popup" @click.stop>
				<view class="popup-handle"></view>
				<view class="popup-header">
					<text class="ph-title">编辑简介</text>
					<text class="ph-confirm" @click="showDescPopup = false">完成</text>
				</view>
				<view class="desc-edit-area">
					<textarea class="desc-textarea" placeholder="请输入作品简介..." v-model="description" maxlength="500"
						fixed="true" cursor-spacing="100"></textarea>
					<view class="desc-count">{{ description.length }}/500</view>
				</view>
			</view>
		</view>

		<!-- 标签选择弹窗 -->
		<view class="popup-mask" v-if="showTagPopup" @click="closeTagPopup">
			<view class="popup-content tag-popup" @click.stop>
				<view class="popup-handle"></view>
				<view class="popup-header">
					<view class="ph-close" @click="closeTagPopup"
						style="font-size: 40rpx; padding: 10rpx; line-height: 1;">✕</view>
					<text class="ph-title" style="color: #333; font-size: 32rpx; font-weight: 500;">作品标签</text>
					<view class="tag-confirm-btn" @click="confirmTags">完成</view>
				</view>

				<view class="tag-content-scroll" style="flex: 1; overflow-y: auto;">
					<view class="tag-input-section">
						<input class="tag-input" v-model="tagInput" placeholder="输入或选择标签" @confirm="addTag"
							confirm-type="done" />
					</view>

					<view class="my-tags-section" v-if="tags.length > 0">
						<view class="my-tags-header" style="border-top: none; padding-top: 0;">
							<text class="my-tags-title">已选标签({{ tags.length }})</text>
						</view>
						<view class="tags-list">
							<view class="tag-item active" v-for="(tag, index) in tags" :key="index"
								@click="removeTag(index)">
								{{ tag.tagName }} <text style="margin-left: 10rpx; font-size: 24rpx;">✕</text>
							</view>
						</view>
					</view>

					<view class="my-tags-section">
						<view class="my-tags-header">
							<text class="my-tags-title">我的标签({{ myTags.length }})</text>
							<text class="manage-tags" @click="manageTags">管理我的标签</text>
						</view>
						<view class="tags-list">
							<view class="tag-item" v-for="(tag, index) in myTags" :key="index"
								:class="{ active: tags.some(t => t.tagName === tag.tagName) }" @click="toggleTag(tag)">
								{{ tag.tagName }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<yunStorageWarningVue :visible="warringVisible" @confirm="confirm" @cancel="cancel" type="storage">
		</yunStorageWarningVue>
	</view>
</template>

<script>
	import env from '@/config/env.js'
	import yunStorageWarningVue from '../../../components/yun-storage-warning.vue';
	import {
		uploadFile
	} from "@/utils/uploadUtil.js";
	export default {
		components: {
			yunStorageWarningVue
		},
		data() {
			return {
				warringVisible: false,
				id: null,
				title: '',
				description: '',
				coverImage: '', // 封面图
				teamId: null, // 团队id
				tags: [],
				workType: 0, // 0:个人 1:团队
				uploadType: 'works', // 'works' | 'cover'
				showUploadPopup: false,
				showDescPopup: false,
				images: [], // 存放上传的图片路径
				imageItems: [], // 带唯一ID的图片项数组
				ossUrl: env.aliyunUrl,
				uploadProgress: {}, // 存储上传进度，key为临时文件路径，value为进度值(0-100)
				// 拖拽相关状态
			isDragging: false,
			draggingId: null,
			placeholderIndex: -1,
			startPosition: null,
			currentPosition: null,
			originalIndex: -1,
				dragOffset: {
					x: 0,
					y: 0
				},
				imageGridRect: null,
				gridInfo: null,
				itemSize: 0,
				transformAnimations: [],
				// 标签弹窗相关
				showTagPopup: false,
				tagInput: '',
				myTags: [], // 存储我的标签列表
				teamUserId: 0
			};
		},
		onShow() {
			if (this.hasLoginToken()) {
				this.getUserTags();
			} else {
				this.myTags = [];
			}
		},
		onBackPress() {
			this.clearData();
		},
		onUnload() {
			this.clearData();
		},
		computed: {
			canSubmit() {
				// 检查是否有标题
				if (!this.title || !this.title.trim()) {
					return false;
				}
				// 检查是否有图片
				if (!this.imageItems || this.imageItems.length === 0) {
					return false;
				}
				// 检查是否有正在上传的文件
				if (this.uploadProgress && Object.keys(this.uploadProgress).length > 0) {
					return false;
				}
				return true;
			}
			// images() {
			// 	return this.imageItems.map(i => i.url);
			// }
		},
		async onLoad(options) {

			if (options.workType) {
				this.workType = parseInt(options.workType)
			}
			if (options.id) {
				if (!this.hasLoginToken()) {
					this.promptLogin(this.buildCurrentPageUrl());
					return;
				}
				uni.setNavigationBarTitle({
					title: '修改作品'
				});
				const {
					code,
					data
				} = await this.$request.get(`/wechat/works/findWorks/${options.id}`)
				this.id = data['id']
				this.title = data['title']
				this.description = data['description']
				this.coverImage = data['coverUrl']
				this.teamId = data['teamId']

				this.tags = data['tagsList'] || []

				// 确保 imageUrls 存在且是字符串
				if (data['imageUrls']) {
					try {
						this.images = JSON.parse(data['imageUrls']);
						// 确保 images 是一个数组
						if (!Array.isArray(this.images)) {
							this.images = [];
						}
					} catch (error) {
						console.error('解析 imageUrls 失败:', error);
						this.images = [];
					}
				} else {
					this.images = [];
				}

				// console.log("获取images", this.images)
				// 初始化带唯一ID的图片项数组 
				this.imageItems = this.images.map((url, index) => ({
					id: `${Date.now()}_${index}`,
					url: url || '' // 确保 url 不是 null 或 undefined
				}));
				// console.log("this.imageItems", this.imageItems)

			}
			if (options.isShowUploadPopup && this.hasLoginToken()) {
				setTimeout(() => {
					this.showUploadPopup = true

				}, 500)
			}
		},
		// computed: {
		// 	canSubmit() {
		// 		// 检查是否有标题
		// 		if (!this.title.trim()) {
		// 			console.log("111")
		// 			return false;
		// 		}
		// 		// 检查是否有图片
		// 		if (this.images.length === 0) {
		// 			console.log("222")
		// 			return false;
		// 		}
		// 		// 检查是否有正在上传的文件
		// 		if (Object.keys(this.uploadProgress).length > 0) {
		// 			console.log("333")
		// 			return false;
		// 		}
		// 		return true;
		// 	}
		// },

		onReady() {
			this.initGridInfo();
		},
		methods: {
			hasLoginToken() {
				return !!uni.getStorageSync('token');
			},
			buildCurrentPageUrl() {
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1];
				if (!currentPage) {
					return '/subpkg-library/pages/works/create';
				}
				const route = `/${currentPage.route}`;
				const options = currentPage.options || {};
				const query = Object.keys(options).map(key => `${key}=${encodeURIComponent(options[key])}`).join('&');
				return query ? `${route}?${query}` : route;
			},
			promptLogin(redirectUrl = '') {
				if (redirectUrl) {
					uni.setStorageSync('login_redirect', redirectUrl);
				}
				uni.showModal({
					title: '提示',
					content: '登录后可使用该功能',
					confirmText: '去登录',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/subpkg-others/pages/login/index'
							});
						}
					}
				});
			},
			ensureLoggedIn() {
				if (this.hasLoginToken()) {
					return true;
				}
				this.promptLogin(this.buildCurrentPageUrl());
				return false;
			},
			// 安全函数：获取文件名
			getFileName(url) {
				if (!url || typeof url !== 'string') return '';
				return url.split('/').pop();
			},
			
			// 安全函数：获取完整URL
			getFullUrl(url) {
				if (!url || typeof url !== 'string') return '';
				return url.startsWith('http') ? url : this.ossUrl + url;
			},
			
			// 安全函数：获取带处理参数的完整URL
			getFullUrlWithProcess(url) {
				if (!url || typeof url !== 'string') return '';
				const fullUrl = this.getFullUrl(url);
				return fullUrl + '?x-oss-process=image/resize,w_750/quality,q_50/format,webp';
			},
			
			async getUserTags() {
				if (!this.hasLoginToken()) {
					this.myTags = [];
					return;
				}
				try {
					const userId = uni.getStorageSync("teamOwnerId")
					const isTeamMode= uni.getStorageSync("isTeamMode")
					// console.log("userId",uni.getStorageSync("teamOwnerId"))
					
					// console.log("this.isTeamMode",this.isTeamMode)
					
					let req ={
						userId: isTeamMode ?  userId: ''
					}
					const {
						data,
						code
					} = await this.$request.get(`/wechat/tag/list`,req)
					if (code == 200) {
						this.myTags = data
					}
				} catch (error) {
					console.error("获取标签失败:", error);
					this.myTags = [];
				}
			},
			confirm() {
				this.warringVisible = false;
				uni.navigateTo({
					url: '/subpkg-profile/pages/member/index'
				})
			},
			cancel() {
				this.warringVisible = false;
			},
			openWorksUpload() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				this.uploadType = 'works';
				this.showUploadPopup = true;
			},
			openCoverUpload() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				this.uploadType = 'cover';
				this.showUploadPopup = true;
			},
			handleCoverUpload(type) {
				if (!this.ensureLoggedIn()) {
					return;
				}
				const allowedExtensions = ['jpg', 'jpeg', 'png'];
				const successHandler = async (res) => {
					let filePath = '';
					if (type === 'album') {
						filePath = res.tempFiles[0].tempFilePath;
					} else {
						filePath = res.tempFiles[0].path;
					}

					// 确保 filePath 是字符串且不为空
					if (!filePath || typeof filePath !== 'string') {
						uni.showToast({
							title: '文件路径无效',
							icon: 'none'
						});
						return;
					}

					// 确保文件路径包含扩展名
					const lastDotIndex = filePath.lastIndexOf('.');
					if (lastDotIndex === -1) {
						uni.showToast({
							title: '文件格式无效',
							icon: 'none'
						});
						return;
					}

					const ext = filePath.substring(lastDotIndex + 1).toLowerCase();
					if (!allowedExtensions.includes(ext)) {
						uni.showToast({
							title: '仅支持 jpg, jpeg, png 格式的图片',
							icon: 'none'
						});
						return;
					}

					uni.showLoading({
						title: '上传中 0%',
						mask: true
					});

					try {
						const formData = {
							isVerify: "true"
						};
						if (String(this.workType) === '1') {
							formData.isTeam = "true";
						}
						const result = await uploadFile({
							url: env.baseUrl + "/wechat/basic/upload",
							filePath,
							formData,
							onProgressUpdate: (progress) => {
								uni.showLoading({
									title: `上传中 ${progress.progress}%`,
									mask: true
								});
							}
						});
						if (result.code == 200) {
							this.coverImage = result.msg
							uni.showToast({
								title: '封面上传成功',
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: '封面上传失败',
								icon: 'none'
							});
						}
					} catch (error) {
						console.error("封面上传失败:", error);
						uni.showToast({
							title: '封面上传失败',
							icon: 'none'
						});
					} finally {
						uni.hideLoading();
					}
				};

				if (type === 'album') {
					uni.chooseMedia({
						count: 1,
						mediaType: ['image'],
						sourceType: ['album', 'camera'],
						success: successHandler
					});
				} else if (type === 'chat') {
					// #ifdef MP-WEIXIN
					wx.chooseMessageFile({
						count: 1,
						type: 'all',
						success: successHandler,
						fail: (err) => {
							console.error("选择聊天记录文件失败:", err);
						}
					});
					// #endif
					// #ifndef MP-WEIXIN
					uni.showToast({
						title: '仅微信小程序支持',
						icon: 'none'
					});
					// #endif
				}
			},
			openTags() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				this.showTagPopup = true;
			},
			closeTagPopup() {
				this.showTagPopup = false;
			},
			confirmTags() {
				if (this.tagInput.trim()) {
					this.addTag();
				}
				this.showTagPopup = false;
			},
			addTag() {
				const tagName = this.tagInput.trim();
				if (!tagName) return;

				// 检查标签是否在我的标签中存在
				const existingTag = this.myTags.find(t => t.tagName === tagName);
				if (!existingTag) {
					uni.showToast({
						title: '标签不存在，请先在标签管理中添加',
						icon: 'none'
					});
					return;
				}

				if (!this.tags.some(t => t.tagName === tagName)) {
					// 使用myTags中已存在的标签对象
					this.tags.push(existingTag);
				} else {
					uni.showToast({
						title: '标签已存在',
						icon: 'none'
					});
				}
				this.tagInput = '';
			},
			toggleTag(tag) {
				const tagName = tag.tagName;
				const index = this.tags.findIndex(t => t.tagName === tagName);
				if (index > -1) {
					this.tags.splice(index, 1);
				} else {
					this.tags.push(tag);
				}
			},
			removeTag(index) {
				this.tags.splice(index, 1);
			},
			manageTags() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				uni.navigateTo({
					url: '/subpkg-library/pages/tags/edit'
				});
			},
			updateTags(newTags) {
				this.tags = newTags;
			},
			chooseImage(type) {
				if (!this.ensureLoggedIn()) {
					return;
				}
				this.showUploadPopup = false;
				if (this.uploadType === 'cover') {
					this.handleCoverUpload(type);
					return;
				}
				const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'pptx', 'ppt', 'mp4', 'mov', 'avi', 'flv', 'wmv',
					'mkv'
				];
				if (type === 'album') {
					// 选择图片
					uni.chooseMedia({
						count: 20,
						mediaType: ['image', "video"], // 仅支持图片 和视频
						sourceType: ['album', 'camera'],
						sizeType: ['original', 'compressed'], // 支持原图和压缩图
						success: async (res) => {
							// console.log("选择媒体结果->", res);
							// console.log("tempFiles结构->", res.tempFiles);

							// 遍历选择的文件
							for (const tempFile of res.tempFiles) {
								const filePath = tempFile.tempFilePath;

								// 确保 filePath 是字符串且不为空
								if (!filePath || typeof filePath !== 'string') {
									uni.showToast({
										title: '文件路径无效',
										icon: 'none'
									});
									continue;
								}

								// 确保文件路径包含扩展名
								const lastDotIndex = filePath.lastIndexOf('.');
								if (lastDotIndex === -1) {
									uni.showToast({
										title: '文件格式无效',
										icon: 'none'
									});
									continue;
								}

								const ext = filePath.substring(lastDotIndex + 1).toLowerCase();
								if (!allowedExtensions.includes(ext)) {
									uni.showToast({
										title: '不支持的文件格式',
										icon: 'none'
									});
									continue;
								}
								// console.log("ext", ext)
								// 生成唯一ID
							const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
							// console.log("uniqueId", uniqueId)
							// 先将临时文件路径添加到imageItems数组
							const currentId = uniqueId;
							this.imageItems.push({
								id: uniqueId,
								url: filePath,
								status: 'uploading'
							});

							// 初始化进度为0
							this.$set(this.uploadProgress, uniqueId, 0);

							try {
								const formData = {
									isVerify: "true"
								};
								if (String(this.workType) === '1') {
									formData.isTeam = "true";
								}
								const result = await uploadFile({
									url: env.baseUrl + "/wechat/basic/upload",
									filePath,
									name: "file",
									formData,
									onProgressUpdate: (progress) => {
										// 更新进度
										this.$set(this.uploadProgress, uniqueId, progress
											.progress);
									}
								});

								if (result.code == 200) {
									const index = this.imageItems.findIndex(item => item.id === currentId);

									if (index !== -1) {
										this.$set(this.imageItems[index], 'url', result.msg);
										this.$set(this.imageItems[index], 'status', 'completed');
									}
									// 移除进度记录
									this.$delete(this.uploadProgress, uniqueId);
								} else if (result.code == 601) {

									this.warringVisible = true;

									const index = this.imageItems.findIndex(item => item.id === currentId);
									if (index !== -1) {
										this.$set(this.imageItems[index], 'status', 'completed');
									}

									this.$delete(this.uploadProgress, uniqueId);
								} else {
									// 上传失败，移除临时文件
									this.$nextTick(() => {
										const index = this.imageItems.findIndex(item => item.id === currentId);
										if (index !== -1) {
											if (this.draggingId === currentId) {
												this.draggingId = null;
											}
											this.imageItems.splice(index, 1);
										}
										this.$delete(this.uploadProgress, uniqueId);
									});
									uni.showToast({
										title: '上传失败',
										icon: 'none'
									});
								}
							} catch (error) {
								console.error("上传失败:", error);
								// 上传失败，移除临时文件
								this.$nextTick(() => {
									const index = this.imageItems.findIndex(item => item.id === currentId);
									if (index !== -1) {
										if (this.draggingId === currentId) {
											this.draggingId = null;
										}
										this.imageItems.splice(index, 1);
									}
									this.$delete(this.uploadProgress, uniqueId);
								});
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								});
							}
							}
						}
					});
				} else if (type === 'chat') {
					// 微信聊天记录选择文件
					// #ifdef MP-WEIXIN
					wx.chooseMessageFile({
						count: 20,
						type: 'all', // 支持所有类型
						extension: allowedExtensions, // 支持的文件类型
						success: async (res) => {
							// console.log("选择聊天记录文件结果->", res);
							// console.log("聊天记录tempFiles结构->", res.tempFiles);

							// 显示上传中提示
							uni.showLoading({
								title: '上传中...',
								mask: true
							});

							// 遍历选择的文件
							for (const tempFile of res.tempFiles) {
								const filePath = tempFile.path;

								// 确保 filePath 是字符串且不为空
								if (!filePath || typeof filePath !== 'string') {
									uni.showToast({
										title: '文件路径无效',
										icon: 'none'
									});
									continue;
								}

								// 确保文件路径包含扩展名
								const lastDotIndex = filePath.lastIndexOf('.');
								if (lastDotIndex === -1) {
									uni.showToast({
										title: '文件格式无效',
										icon: 'none'
									});
									continue;
								}

								const ext = filePath.substring(lastDotIndex + 1).toLowerCase();
								if (!allowedExtensions.includes(ext)) {
									uni.showToast({
										title: '不支持的文件格式',
										icon: 'none'
									});
									continue;
								}
								// 生成唯一ID
									const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

									// 先将临时文件路径添加到imageItems数组
									const currentId = uniqueId;
									this.imageItems.push({
										id: uniqueId,
										url: filePath,
										status: 'uploading'
									});

									// 初始化进度为0
									this.$set(this.uploadProgress, uniqueId, 0);

									try {
										const formData = {
											isVerify: "true"
										};
										if (String(this.workType) === '1') {
											formData.isTeam = "true";
										}
										const result = await uploadFile({
											url: env.baseUrl + "/wechat/basic/upload",
											filePath,
											name: "file",
											formData,
											onProgressUpdate: (progress) => {
												// 更新进度
												this.$set(this.uploadProgress, uniqueId, progress
													.progress);
											}
										});

										if (result.code == 200) {
											const index = this.imageItems.findIndex(item => item.id === currentId);
											if (index !== -1) {
												this.$set(this.imageItems[index], 'url', result.msg);
												this.$set(this.imageItems[index], 'status', 'completed');
											}
											// 移除进度记录
											this.$delete(this.uploadProgress, uniqueId);
										} else {
											// 上传失败，移除临时文件
											this.$nextTick(() => {
												const index = this.imageItems.findIndex(item => item.id === currentId);
												if (index !== -1) {
													if (this.draggingId === currentId) {
														this.draggingId = null;
													}
													this.imageItems.splice(index, 1);
												}
												this.$delete(this.uploadProgress, uniqueId);
											});
											uni.showToast({
												title: '上传失败',
												icon: 'none'
											});
										}
									} catch (error) {
										console.error("上传失败:", error);
										// 上传失败，移除临时文件
										this.$nextTick(() => {
											const index = this.imageItems.findIndex(item => item.id === currentId);
											if (index !== -1) {
												if (this.draggingId === currentId) {
													this.draggingId = null;
												}
												this.imageItems.splice(index, 1);
											}
											this.$delete(this.uploadProgress, uniqueId);
										});
										uni.showToast({
											title: '上传失败',
											icon: 'none'
										});
									}
							}

							// 隐藏上传提示
							uni.hideLoading();
						},
						fail: (err) => {
							console.error("选择聊天记录文件失败:", err);
							uni.hideLoading();
							uni.showToast({
								title: '取消选择或失败',
								icon: 'none'
							});
						}
					});
					// #endif
					// #ifndef MP-WEIXIN
					uni.showToast({
						title: '仅微信小程序支持',
						icon: 'none'
					});
					// #endif
				}
			},
			// 判断是否为PDF文件
			isPdfFile(file) {
				if (!file || typeof file !== 'string') {
					return false;
				}
				return file.toLowerCase().includes('.pdf');
			},
			// 判断是否为PPT/PPTX文件
			isPptFile(file) {
				if (!file || typeof file !== 'string') {
					return false;
				}
				const lower = file.toLowerCase();
				return lower.includes('.pptx') || lower.includes('.ppt');
			},
			// 判断是否为视频文件
			isVideoFile(file) {
				if (!file || typeof file !== 'string') {
					return false;
				}
				const lower = file.toLowerCase();
				const videoExtensions = ['.mp4', '.mov', '.avi', '.flv', '.wmv', '.mkv'];
				return videoExtensions.some(ext => lower.includes(ext));
			},
			// 图片加载完成事件
			onImageLoad() {
				// 图片加载完成后可以在这里添加额外的处理
			},

			// 预览图片或文档
			previewMedia(index) {
				const currentItem = this.imageItems[index];
				// 检查currentItem是否有效
				if (!currentItem || !currentItem.url) {
					return;
				}
				const isPdf = this.isPdfFile(currentItem.url);
				const isPpt = this.isPptFile(currentItem.url);
				const isVideo = this.isVideoFile(currentItem.url);

				if (isPdf || isPpt) {
					// 打开文档文件
					const filePath = this.getFullUrl(currentItem.url);
					uni.showLoading({
						title: '加载中...'
					});
					uni.downloadFile({
						url: filePath,
						success: (res) => {
							uni.hideLoading();
							if (res.statusCode === 200) {
								// 打开文档
								uni.openDocument({
									filePath: res.tempFilePath,
									title: this.getFileName(currentItem.url),
									success: (res) => {
										// console.log('打开文档成功');
									},
									fail: (err) => {
										console.error('打开文档失败', err);
										uni.showToast({
											title: '打开文档失败',
											icon: 'none'
										});
									}
								});
							} else {
								uni.showToast({
									title: '下载文档失败',
									icon: 'none'
								});
							}
						},
						fail: (err) => {
							uni.hideLoading();
							console.error('下载文档失败', err);
							uni.showToast({
								title: '下载文档失败',
								icon: 'none'
							});
						}
					});
				} else if (isVideo) {
					// 预览视频
					const videoUrl = this.getFullUrl(currentItem.url);
					uni.navigateTo({
						url: `/subpkg-others/pages/works-detail/image-preview?urls=${encodeURIComponent(JSON.stringify([videoUrl]))}&index=0&canDownload=${true}&isOwner=${true}`
					});
				} else {
					// 预览图片
					// 预览时需要拼接完整的图片URL
					const fullImageUrls = this.imageItems.map(item => {
						// 确保item和item.url是有效的
						if (!item || !item.url || typeof item.url !== 'string') {
							return '';
						}
						return this.getFullUrl(item.url);
					});
					uni.previewImage({
						urls: fullImageUrls,
						current: index
					});
				}
			},
			// 删除图片
			deleteImage(currentId) {
				this.$nextTick(() => {
					const index = this.imageItems.findIndex(item => item.id === currentId);
					if (index !== -1) {
						// 先获取要删除的项
						const itemToDelete = this.imageItems[index];
						if (this.draggingId === currentId) {
							this.draggingId = null;
						}

						this.imageItems.splice(index, 1);
						// 移除进度记录 - 使用唯一ID作为key
						this.$delete(this.uploadProgress, currentId);
					}
				});
			},
			// 初始化网格信息
			initGridInfo() {
				// 使用 setTimeout 确保 DOM 已经渲染完成
				setTimeout(() => {
					uni.createSelectorQuery().in(this)
						.select('.image-grid')
						.boundingClientRect(data => {
							if (data) {
								this.imageGridRect = data;
								const gap = uni.upx2px(12);
								const itemSize = (data.width - gap * 2) / 3;
								this.gridInfo = {
									itemSize,
									gap,
									columns: 3
								};
								this.itemSize = itemSize;
							}
						})
						.exec();
				}, 100);
			},
			// 长按事件 - 进入拖拽模式
			onLongPress(currentId, index) {
				// console.log("触发onLongPress", currentId)
				if (this.draggingId !== null) {
					this.resetDragState();
					return;
				}

				// 确保网格信息已初始化
				if (!this.gridInfo) {
					this.initGridInfo();
					// 如果初始化后仍为空，提示用户
					if (!this.gridInfo) {
						uni.showToast({
							title: '请先上传图片',
							icon: 'none'
						});
						return;
					}
				}

				this.isDragging = true;
				this.draggingId = currentId;
				this.placeholderIndex = index;
				this.originalIndex = index;

				uni.vibrateShort();

				uni.showToast({
					title: '拖动图片调整顺序',
					icon: 'none',
					duration: 1500
				});
			},
			// 点击事件 - 预览图片/视频
			onTap(index) {
				this.previewMedia(index);
			},
			onTouchStart(e, currentId, index) {
				const touch = e.touches[0];
				this.startPosition = {
					x: touch.pageX,
					y: touch.pageY
				};
				this.currentPosition = {
					x: touch.pageX,
					y: touch.pageY
				};
			},
			onTouchMove(e, currentId, index) {
				// 添加对 e 参数的检查
				if (!e || !e.touches || e.touches.length === 0) {
					return;
				}

				// 如果不是拖拽状态，完全允许默认行为（页面滚动）
				if (this.draggingId === null) {
					return;
				}

				// 如果是拖拽状态但不是当前元素，也允许默认行为
				if (this.draggingId !== currentId) {
					return;
				}

				// 确保 gridInfo 和 imageItems 存在
				if (!this.gridInfo || !this.imageItems || this.imageItems.length === 0) {
					return;
				}

				const touch = e.touches[0];
				this.currentPosition = {
					x: touch.pageX,
					y: touch.pageY
				};

				if (!this.startPosition) {
					this.startPosition = {
						...this.currentPosition
					};
					return;
				}

				// 计算移动距离
				const deltaX = Math.abs(this.currentPosition.x - this.startPosition.x);
				const deltaY = Math.abs(this.currentPosition.y - this.startPosition.y);

				// 定义一个最小移动距离阈值，避免微小的触摸抖动影响判断
				const minMoveThreshold = 5;

				// 如果移动距离很小，不做任何处理，避免影响滚动
				if (deltaX < minMoveThreshold && deltaY < minMoveThreshold) {
					return;
				}

				// 阻止默认行为，允许拖拽
				e.preventDefault();

				const moveDeltaX = this.currentPosition.x - this.startPosition.x;
				const moveDeltaY = this.currentPosition.y - this.startPosition.y;

				// 确保 originalIndex 有效
				if (this.originalIndex < 0 || this.originalIndex >= this.imageItems.length) {
					return;
				}

				const originRow = Math.floor(this.originalIndex / 3);
				const originCol = this.originalIndex % 3;
				const originLeft = originCol * (this.gridInfo.itemSize + this.gridInfo.gap);
				const originTop = originRow * (this.gridInfo.itemSize + this.gridInfo.gap);

				const currentCenterX = originLeft + moveDeltaX + this.gridInfo.itemSize / 2;
				const currentCenterY = originTop + moveDeltaY + this.gridInfo.itemSize / 2;

				let col = Math.floor(currentCenterX / (this.gridInfo.itemSize + this.gridInfo.gap));
				let row = Math.floor(currentCenterY / (this.gridInfo.itemSize + this.gridInfo.gap));

				col = Math.max(0, Math.min(col, 2));
				row = Math.max(0, row);

				let targetIndex = row * 3 + col;
				const maxIndex = this.imageItems.length - 1;
				targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));

				if (targetIndex !== this.placeholderIndex) {
					this.placeholderIndex = targetIndex;
					// 只在真机上震动，PC端跳过，避免PC端拖拽卡顿
					// #ifdef MP-WEIXIN
					const deviceInfo = uni.getDeviceInfo();
					if (deviceInfo.platform !== 'windows' && deviceInfo.platform !== 'mac') {
						uni.vibrateShort();
					}
					// #endif
				}
			},
			// 计算非拖拽元素的transform动画
			getNonDraggingTransform(index) {
				return 'none';
			},

			// 触摸结束事件
			onTouchEnd(e, currentId, index) {
				// console.log("结束拖拽", currentId)
				// 添加对 e 参数的检查
				if (!e) {
					this.resetDragState();
					return;
				}

				// 结束拖拽模式
				if (this.draggingId === currentId) {
					// 检查是否有有效的位置变化
					if (this.originalIndex !== this.placeholderIndex &&
						this.placeholderIndex >= 0 &&
						this.placeholderIndex < this.imageItems.length &&
						this.originalIndex >= 0 &&
						this.originalIndex < this.imageItems.length) {

						// 直接更新数据数组，不使用 $nextTick
						// 创建新数组（插入到新位置，而不是交换）
						const newImageItems = [...this.imageItems];

						// 移除拖拽的元素
						const draggedItem = newImageItems.splice(this.originalIndex, 1)[0];

						// 插入到新位置
						newImageItems.splice(this.placeholderIndex, 0, draggedItem);

						// 一次性更新数据数组
						this.imageItems = newImageItems;

						uni.vibrateShort();
					}

					// 重置所有拖拽状态
					this.resetDragState();
				}
			},
			resetDragState() {
				this.draggingId = null;
				this.startPosition = null;
				this.currentPosition = null;
				this.isDragging = false;
				this.dragOffset = {
					x: 0,
					y: 0
				};
				this.originalIndex = -1;
				this.placeholderIndex = -1;
				this.transformAnimations = [];
			},
			// 提交发布
			async submitPublish() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				if (!this.title.trim()) {
					uni.showToast({
						title: '请输入标题',
						icon: 'none'
					});
					return;
				}
				if (this.imageItems.length === 0) {
					uni.showToast({
						title: '请上传至少一张图片',
						icon: 'none'
					});
					return;
				}

				uni.showLoading({
					title: '发布中...',
					mask: true
				});
				
				const reqImage = this.imageItems.map(i => i.url);
				const isTeamMode = uni.getStorageSync('isTeamMode') || false;
				this.teamUserId = uni.getStorageSync('teamOwnerId')
				const params = {
					id: this.id,
					title: this.title,
					description: this.description,
					coverUrl: this.coverImage, //作品封面图
					images: reqImage, //作品
					addTags: this.tags,
					workType: this.workType, //0：个人: 1：团队
					teamId: this.teamId //团队id
				}
				if (isTeamMode) {
					params.userId = uni.getStorageSync('teamOwnerId')
					// console.log('isTeamMode,userId', isTeamMode, this.teamUserId)
				}

				let res;
				// 如果id为空执行新增操作
				if (!params.id) {
					res = await this.$request.post(`/wechat/works/addWorks`, params);
				} else {
					res = await this.$request.put(`/wechat/works/editWorks`, params);
				}

				uni.hideLoading();

				if (res.code == 200) {
					uni.showToast({
						title: params.id ? '修改作品成功' : '新增作品成功',
						icon: 'success',
						duration: 1500
					});
					setTimeout(() => {
						// 触发页面刷新事件，通知详情页刷新数据
						uni.$emit('refreshWorkDetail');
						uni.navigateBack();
					}, 1500);

				} else {
					uni.showToast({
						title: res.msg || '发布失败',
						icon: 'none'
					});
				}

			},
			clearData() {
				this.id = null
				this.title = null
				this.description = null
				this.coverImage = null
				this.images = []
				this.imageItems = []
				this.uploadProgress = {}
			},
			// 电脑上传指引
			showComputerGuide() {
				uni.showModal({
					title: '电脑上传指引',
					content: '1. 登录电脑版微信\n2. 打开本小程序\n3. 进入发布页点击上传\n4. 选择"从聊天记录选择"\n5. 选择电脑发送到手机的文件',
					showCancel: false,
					confirmText: '知道了'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-container {
		/* 移除固定高度，让内容自适应 */
		min-height: 100vh;
		/* 保持最小高度为屏幕高度 */
		background-color: #fff;
		padding: 0 40rpx;
		/* 增加顶部和底部留白 */
		padding-top: 60rpx;
		padding-bottom: 80rpx;
		box-sizing: border-box;
	}

	/* 标题 */
	.input-section {
		// padding: 20rpx 0;
		/* 减少内边距 */
	}

	.title-input {
		font-size: 36rpx;
		font-weight: 500;
		color: #333;
		height: 60rpx;
	}

	.placeholder-style {
		color: #ccc;
		/* 浅灰色占位文字 */
		font-weight: normal;
	}



	/* 标签 */
	.tag-section {
		padding: 30rpx 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.tag-label {
		font-size: 28rpx;
		color: #333;
		flex: 1;
	}

	.selected-tags {
		display: flex;
		flex-wrap: wrap;
	}

	.tag-pill {
		background: #f0f0f0;
		padding: 4rpx 12rpx;
		border-radius: 8rpx;
		font-size: 24rpx;
		color: #666;
		margin-right: 10rpx;
		margin-bottom: 6rpx;
	}

	.add-tag-btn {
		color: #000;
		/* 蓝色文字按钮 */
		font-size: 28rpx;
	}

	/* 上传区域 */
	.upload-section {
		margin-top: 10rpx;
		/* 移除固定高度，让内容自适应 */
		background-color: #fff;
		/* 白色背景 */
		position: relative;
		padding: 20rpx 0;
		width: 100%;
		box-sizing: border-box;
	}

	/* 无图片时的占位符样式 */
	.upload-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #fff;
		width: 100%;
		/* 移除固定高度，使用padding来控制大小 */
		padding: 100rpx 0;
		text-align: center;
		position: relative;
	}

	.placeholder-text {
		font-size: 28rpx;
		color: #999;
		font-weight: 400;
		line-height: 1.5;
		max-width: 80%;
		margin-bottom: 20rpx;
	}

	.upload-guide {
		font-size: 24rpx;
		color: #ccc;
		line-height: 1.5;
		max-width: 80%;
	}

	.upload-add {
		background: #ff7a22;
		width: 48rpx;
		height: 20rpx;
		border-radius: 50%;
		color: white;
		font-size: 24rpx;
		padding: 10rpx;
	}

	.upload-btn {
		position: absolute;
		bottom: 60rpx;
		right: 60rpx;
		width: 120rpx;
		height: 120rpx;
		background: #ff7a22;
		color: white;
		border: none;
		border-radius: 50%;
	}

	/* 悬浮上传按钮样式 */
	.floating-upload-btn {
		position: fixed;
		right: 40rpx;
		bottom: 180rpx;
		width: 100rpx;
		height: 100rpx;
		// background: #ff7a22;
		/* 与确认发布按钮一致的橙色主题 */
		color: white;
		border-radius: 50%;
		z-index: 99;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.floating-upload-btn:active {
		// background: #ff9547;
		transform: scale(0.96);
	}

	.upload-btn:active {
		background: #ff9547;
		transform: scale(0.96);
	}

	.plus {
		width: 88rpx;
		height: 88rpx;
		margin-bottom: 4rpx;
	}

	.upload-text {
		font-size: 20rpx;
	}

	/* 4. 底部弹窗样式 */
	.popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.popup-content {
		background: #fff;
		border-radius: 24rpx;
		padding: 20rpx 30rpx 30rpx;
		position: relative;
		margin: 20rpx;
	}

	.popup-handle {
		width: 80rpx;
		height: 8rpx;
		background: #eee;
		border-radius: 4rpx;
		margin: 0 auto 30rpx;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.ph-title {
		font-size: 24rpx;
		color: #999;
	}

	.ph-link {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
	}

	.popup-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.p-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	/* 请替换为你的图标 */
	.p-info {
		flex: 1;
	}

	.p-main {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
	}

	.p-sub {
		font-size: 24rpx;
		color: #ccc;
	}

	/* 图片网格样式 - 自适应布局 */
	.image-grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12rpx;
		padding: 0rpx;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		/* 移除overflow: hidden，允许内容溢出时滚动 */
		/* 移除固定行数，让行数根据内容自适应 */
		/* 移除min-height，让高度根据内容自适应 */
		align-content: start;
		/* 确保网格内容从顶部开始排列 */
		justify-content: start;
		/* 确保网格内容从左侧开始排列 */
	}

	/* 拖拽态禁用过渡动画 */
	.drag-disabled-transition {
		transition: none !important;
	}

	/* 图片项样式 - 固定宽高比 */
	.image-item {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		box-sizing: border-box;
		/* 确保项目在网格中对齐 */
		justify-self: start;
		align-self: start;
		/* 防止项目被意外拉伸 */
		flex-shrink: 0;
		/* 拖拽相关样式 */
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: move;
		/* 添加过渡动画 */
		animation: fadeInUp 0.3s ease-out;
		transform-origin: center center;
	}

	/* 拖拽中的图片样式 - 增强视觉反馈 */
	.image-item.dragging {
		opacity: 0.85;
		z-index: 1000;
		box-shadow: 0 16rpx 60rpx rgba(0, 0, 0, 0.4);
		border-radius: 14rpx;
		background-color: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(12rpx);
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
		/* 防止拖拽时触发点击事件 */
	}

	/* 占位符样式 - 保持布局稳定 */
	.image-item.placeholder {
		opacity: 0.6;
		background-color: rgba(0, 122, 255, 0.15);
		border: 2rpx dashed rgba(0, 122, 255, 0.5);
		border-radius: 12rpx;
		transition: all 0.3s ease;
		pointer-events: none;
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.02);
		}

		100% {
			transform: scale(1);
		}
	}

	/* 增强的拖拽反馈效果 */
	.image-item.dragging {
		/* 确保拖拽元素始终在最上层 */
		will-change: transform, opacity;
		/* 添加轻微的旋转效果增强立体感 */
		transform-style: preserve-3d;
	}

	/* 确保拖拽时图片预览元素不会被缩放 */
	.image-item.dragging .image-preview {
		transform: none !important;
		object-fit: contain !important;
	}

	/* 最后一个图片项样式 - 禁用点击和拖拽 */
	.image-item.last-image {
		cursor: default;
		/* 移除pointer-events: none，因为我们已经在事件绑定中处理了最后一个图片的情况 */
		/* pointer-events: none; */
	}

	/* 拖拽经过时的目标区域样式 - 清晰的视觉提示 */
	.image-item.dragover {
		border: 3rpx dashed #ff7a22;
		background-color: rgba(255, 122, 34, 0.1);
		border-radius: 14rpx;
		transform: scale(0.95);
		transition: all 0.2s ease;
	}

	/* 添加图片加载完成的动画 */
	.image-preview.loaded {
		opacity: 1;
		transform: translateY(0);
		transition: opacity 0.4s ease, transform 0.4s ease;
	}

	/* 文档预览样式 */
	.document-preview {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 8rpx;
	}

	/* 文档图标样式 */
	.document-icon {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 12rpx;
	}

	/* 文档名称样式 */
	.document-name {
		font-size: 24rpx;
		color: #666;
		max-width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}

	/* 新增：图片交换时的过渡动画 */
	.image-item {
		will-change: transform, opacity, z-index;
	}

	/* 新增：增强的拖拽反馈效果 */
	.image-grid {
		perspective: 1000rpx;
	}

	/* 图片容器 - 确保图片和删除按钮的相对位置稳定 */
	.image-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 10rpx;
		overflow: hidden;
		background: #f0f0f0;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
		/* 确保容器不会因内容溢出而变形 */
		box-sizing: border-box;
	}

	/* 图片预览样式 - 固定尺寸 */
	.image-preview {
		width: 100%;
		height: 100%;
		/* 确保图片不会超出容器 - 使用mode="aspectFill"替代object-fit */
		display: block;
		/* 防止图片加载时的闪烁 */
		transition: opacity 0.3s ease, transform 0.3s ease;
		/* 确保图片作为块级元素显示 */
		box-sizing: border-box;
		/* 拖拽时的图片样式 */
		user-select: none;
		/* 初始状态 */
		opacity: 0;
		transform: translateY(10rpx);
		/* 添加加载完成的动画 */
		animation: imageLoadIn 0.4s ease forwards;
	}

	/* 视频预览特殊处理 */
	video.image-preview {
		object-fit: cover;
	}

	/* 过渡动画定义 */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* 图片加载动画 */
	@keyframes imageLoadIn {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* 确保视频和图片大小一致 */
	video.image-preview {
		object-fit: cover;
	}

	/* 视频预览容器 */
	.video-preview {
		position: relative;
		width: 100%;
		height: 100%;
	}

	/* 视频标记 */
	.video-tag {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 20rpx;
		padding: 5rpx 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.video-tag-text {
		color: #fff;
		font-size: 24rpx;
	}

	/* 拖拽悬停状态 */
	.image-item.dragover {
		border: 2rpx dashed #ff7a22;
		background-color: rgba(255, 122, 34, 0.1);
	}

	/* 视频标记 */
	.video-tag {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 20rpx;
		padding: 5rpx 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.video-tag-icon {
		width: 24rpx;
		height: 24rpx;
	}

	/* 确保视频和图片大小一致 */
	video.image-preview {
		object-fit: cover;
	}

	/* 删除按钮样式 - 精确位置控制 */
	.delete-btn {
		position: absolute;
		top: 8rpx;
		right: 8rpx;
		width: 40rpx;
		height: 40rpx;
		// background: rgba(0, 0, 0, 0.7);
		color: #fff;
		border-radius: 50%;
		text-align: center;
		line-height: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		z-index: 2;
		transition: all 0.2s ease;
		cursor: pointer;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
		/* 确保删除按钮在拖拽时依然可见 */
		pointer-events: auto;
	}

	.delete-btn:active {
		background: rgba(255, 68, 68, 0.9);
		transform: scale(0.9);
	}

	/* 添加按钮容器 */
	.add-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 2rpx dashed #ff7a22;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff8f5;
		transition: all 0.2s ease;
		cursor: pointer;
		/* 与图片容器保持一致的阴影效果 */
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
		/* 确保尺寸与图片容器完全一致 */
		box-sizing: border-box;
	}

	/* 加号按钮样式 */
	.add-icon {
		font-size: 56rpx;
		color: #ff7a22;
		/* 防止加号按钮被拉伸 */
		flex-shrink: 0;
	}

	.add-container:active {
		background: #fff0e6;
		border-color: #ff9547;
		transform: scale(0.98);
	}

	.add-container:active .add-icon {
		color: #ff9547;
	}

	/* 底部按钮区域 */
	.footer-btn-area {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20rpx 0 40rpx 0;
		background: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		z-index: 100;
		display: flex;
		justify-content: center;
	}

	.publish-btn {
		width: 100%;
		max-width: 600rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #ff7a22;
		/* 橙色主题 */
		color: #fff;
		font-size: 32rpx;
		font-weight: 500;
		border-radius: 44rpx;
		transition: all 0.3s ease;
	}

	.publish-btn.disabled {
		background: #F37738;
		color: #fff;
		cursor: not-allowed;
		opacity: 0.7;
	}

	/* 为了防止底部按钮遮挡内容，给容器加个 padding-bottom */
	.publish-container {
		padding-bottom: 160rpx;
	}

	/* 上传加载动画样式 */
	.loading-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.loading-spinner {
		width: 40rpx;
		height: 40rpx;
		border: 4rpx solid rgba(255, 255, 255, 0.3);
		border-top: 4rpx solid #fff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 10rpx;
	}

	.loading-text {
		color: #fff;
		font-size: 24rpx;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}



	/* 简介弹窗 */
	.desc-popup {
		height: 60vh;
	}

	.ph-confirm {
		font-size: 28rpx;
		color: #ff7a22;
		font-weight: 500;
	}

	.desc-edit-area {
		position: relative;
		height: calc(100% - 100rpx);
	}

	.desc-textarea {
		width: 100%;
		height: 100%;
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
	}

	.desc-count {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		font-size: 24rpx;
		color: #ccc;
	}

	/* 标签弹窗样式 */
	.tag-popup {
		height: 80vh;
		display: flex;
		flex-direction: column;
	}

	.tag-confirm-btn {
		background: #000;
		color: #fff;
		padding: 10rpx 30rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
	}

	.tag-input-section {
		margin-bottom: 40rpx;
	}

	.tag-input {
		background: #f5f5f5;
		border-radius: 8rpx;
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.my-tags-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		padding-top: 20rpx;
		border-top: 1rpx solid #eee;
	}

	.my-tags-title {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
	}

	.manage-tags {
		font-size: 24rpx;
		color: #999;
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
	}

	.tag-item {
		background: #f5f5f5;
		color: #333;
		padding: 12rpx 24rpx;
		border-radius: 30rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
		border: 1px solid transparent;
	}

	.tag-item.active {
		background: #fff;
		color: #ff7a22;
		border-color: #ff7a22;
	}

	.selected-tags-preview {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}

	.upload-guide-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		/* 文字和图标之间的间距 */
		text-align: center;
	}

	.text {
		color: #999;
		/* 灰色文字 */
		font-size: 28rpx;
		font-family: PingFang SC;
	}

	.upload-icon {
		width: 24px;
		/* 图标大小 */
		height: 24px;
		background-color: #FF6B00;
		/* 橙色背景 */
		border-radius: 50%;
		/* 圆形 */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.plus2 {
		width: 24px;
		/* 图标大小 */
		height: 24px;
		color: white;
		font-size: 28rpx;
		font-weight: 500;
		line-height: 1;
	}
	
</style>
