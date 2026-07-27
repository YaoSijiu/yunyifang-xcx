<template>
	<view class="user-action-bar-wrapper">

		<!-- 1. 占位块：防止内容被底部固定栏遮挡 (在文档流中占据空间) -->
		<!-- 通过 fixed 属性控制是否显示占位 -->
		<view v-if="fixed" class="placeholder-block"></view>

		<!-- 2. 实体栏：固定在底部 -->
		<view class="action-bar-body" :class="{ 'is-fixed': fixed }">
			<!-- 左侧：用户信息 -->
			<view class="left-section" @click="onUserClick">
				<image class="avatar" :src="avatar || '/static/yunyiku/avatar.png'" mode="aspectFill"></image>
				<view class="info-box">
					<text class="name">{{ name }}</text>
					<!-- <view class="sub-text">
						<text>{{ subText }}</text>
						<text class="arrow">></text>
					</view> -->
				</view>
			</view>

			<!-- 右侧：功能按钮组 (点赞、分享、更多) -->
			<view class="right-section">
				<!-- 发布按钮 -->
				<view class="btn-item" v-if="!hideManageActions" @click.stop="onPublishClick">
					<image class="share-icon" src="/static/tabbar/发布.png" mode="aspectFit"></image>
				</view>

				<!-- 更多按钮 (举报) -->
				<view class="btn-item" v-if="!hideManageActions" @click.stop="onMoreClick">
					<image class="share-icon" mode="aspectFit" src="/static/common/设置.png"></image>
				</view>

				<!-- 分享按钮 -->
				<button class="btn-item share-btn" open-type="share" @click.stop="onShareClick">
					<image class="share-icon" :src="shareIcon" mode="aspectFit"></image>
				</button>

			</view>

		</view>

		<!-- 添加上传图片到作品的弹窗 -->
		<view class="popup-mask" v-if="showPublishPopup" @click="showPublishPopup = false">
			<view class="popup-content" @click.stop>
				<view class="popup-handle"></view>

				<view class="popup-header">
					<text class="ph-title">添加图片到作品</text>
					<text class="ph-link" @click="showComputerGuide">如何从电脑上传 ></text>
				</view>

				<view class="popup-list">
					<!-- 本地相册 -->
					<view class="popup-item" @click="addWorksImage('album')">
						<image src="/static/publish/相册.png" class="p-icon"></image>
						<view class="p-info">
							<text class="p-main">从本地相册选择</text>
						</view>
						<text class="p-sub">一次最多可选20张</text>
					</view>

					<!-- 聊天记录 -->
					<view class="popup-item" @click="addWorksImage('chat')">
						<image src="/static/publish/聊天记录.png" class="p-icon"></image>
						<view class="p-info">
							<text class="p-main">从聊天记录选择</text>
						</view>
						<text class="p-sub">一次最多可选20张</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 上传进度提示 -->
		<view v-if="showUploadProgress" class="upload-progress-mask">
			<view class="upload-progress-content">
				<view class="progress-title">正在上传...</view>
				<view class="progress-bar">
					<view class="progress-fill" :style="{ width: uploadProgress + '%' }"></view>
				</view>
				<text class="progress-text">{{ uploadProgress }}%</text>
			</view>
		</view>

		<!-- 发布弹窗 -->
		<view class="publish-popup-mask" v-if="showPublishPopup2">
			<view class="publish-popup-content" @click.stop>
				<!-- 顶部灰色小横条 -->
				<view class="handle-bar"></view>

				<!-- 菜单列表 -->
				<view class="menu-list">
					<!-- 新建作品 -->
					<view class="menu-item" @click="navigateTo('/subpkg-library/pages/works/create')">
						<image src="/static/publish/新建作品.png" class="menu-icon"></image>
						<view class="menu-text">
							<text class="menu-title">新建作品</text>
							<text class="menu-desc">你可以作品中添加图片/视频/简介</text>
						</view>
					</view>

					<!-- 新建作品集 -->
					<view class="menu-item" @click="navigateTo('/subpkg-library/pages/collection/create')">
						<image src="/static/publish/新建作品集.png" class="menu-icon"></image>
						<view class="menu-text">
							<text class="menu-title">新建作品集</text>
							<text class="menu-desc">作品集用于打包分享全部或多个作品</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 作品管理弹窗 -->
		<view class="work-popup-mask" v-if="showWorkPopup" @click="closeWorkPopup">
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">作品管理</view>

				<view class="wp-list">
						<view class="wp-item" v-if="isOwner" @click="handleEditWork">
							<image src="/static/icon/管理作品.svg" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">管理作品</text>
						</view>
						<view class="wp-between" v-if="isOwner" @click="handleVisableWork">
							<view class="wp-item">
								<image :src="isHide == '1' ?'/static/icon/公开.svg':'/static/icon/仅自己可见.svg'" class="wp-icon"
									mode="aspectFit"></image>
								<text class="wp-text">{{ isHide == '1' ? '设为公开' : '设为仅自己可见' }}</text>
							</view>
							<view class="wp-right">
								{{ isHide == '1' ? '所有人可见' : '当前访客可见' }}
							</view>
						</view>
						<view class="wp-item" @click="handleDownloadWork">
							<image src="/static/icon/下载.svg" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">下载</text>
						</view>
						<view class="wp-item" v-if="!isOwner" @click="handleReportWork">
							<image src="/static/icon/举报.svg"
								style="width: 45rpx;height: 45rpx;margin-right: 30rpx;margin-left: 8rpx;" mode="aspectFit">
							</image>
							<text class="wp-text">举报作品</text>
						</view>
						<view class="wp-item" v-if="isOwner" @click="handleDeleteCollection">
							<image src="/static/icon/删除作品.svg" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">删除作品</text>
						</view>
					</view>
			</view>
		</view>
		<!-- 举报弹窗 -->
		<view class="popup-mask2" v-if="showReportPopup" @click="closeReportPopup">
			<view class="popup-content2" @click.stop>
				<view class="popup-title2">举报作品</view>
				<textarea class="report-input2" v-model="reportReason" placeholder="请输入举报说明"
					placeholder-style="color:#999"></textarea>
				<view class="popup-btns2">
					<view class="btn cancel" @click="closeReportPopup">取消</view>
					<view class="btn confirm" @click="submitReport">提交</view>
				</view>
			</view>
		</view>

		<!-- 图片管理弹窗 -->
		<view class="work-popup-mask" v-if="showImageManagerPopup" @click="closeImageManagerPopup">
			<view class="work-popup-content bg-manager-content" @click.stop>
				<view class="wp-handle"></view>

				<!-- 固定头部 -->
				<view class="bg-manager-header">
					<view class="wp-title">添加作品图片 ({{ selectedImages.length }}/20)</view>
					<view class="wp-sub-title">长按拖拽调整顺序</view>
				</view>

				<!-- 可滚动内容区域 -->
				<view class="bg-manager-scroll">
					<view class="bg-image-grid">
						<view class="bg-image-item" v-for="(item, index) in imageItems" :key="item.id" :class="{
							'dragging': draggingIndex === index,
							'placeholder': index === placeholderIndex && draggingIndex !== index
						}" :style="{
							transform: draggingIndex === index && startPosition && currentPosition
								? `translate(${currentPosition.x - startPosition.x}px, ${currentPosition.y - startPosition.y}px) scale(1.1)`
								: 'none',
							zIndex: draggingIndex === index ? 999 : 1,
							transition: draggingIndex === index ? 'none' : 'transform 0.2s ease'
						}" @longpress="() => onLongPress(index)" @touchstart="(e) => onTouchStart(e, index)"
							@touchmove="(e) => onTouchMove(e, index)" @touchend="(e) => onTouchEnd(e, index)">
							<view class="bg-image-container">
								<!-- 图片显示 -->
								<image v-if="!isVideoFile(item.url) && !isPdfFile(item.url) && !isPptFile(item.url)"
									:src="resolveUrl(item.url)" mode="aspectFill" class="bg-img-preview"></image>
								<!-- 视频显示 -->
								<view v-else-if="isVideoFile(item.url)" class="bg-video-preview">
									<video :src="resolveUrl(item.url)" class="bg-img-preview" controls="false"
										autoplay="false" loop="false" show-center-play-btn="false"></video>
									<view class="bg-video-tag">
										<text class="bg-video-tag-text">视频</text>
									</view>
								</view>
								<!-- PDF文档显示 -->
								<view v-else-if="isPdfFile(item.url)" class="bg-document-preview">
									<image src="/static/icon/pdf.svg" class="bg-document-icon"></image>
									<text class="bg-document-name">{{ item.url.split('/').pop() }}</text>
								</view>
								<!-- PPT/PPTX文档显示 -->
								<view v-else-if="isPptFile(item.url)" class="bg-document-preview">
									<image src="/static/icon/pptx.svg" class="bg-document-icon"></image>
									<text class="bg-document-name">{{ item.url.split('/').pop() }}</text>
								</view>
								<view class="bg-delete-btn" @click.stop="deleteImage(index)">×</view>

								<!-- 进度条 -->
								<view class="progress-container-small" v-if="item.status === 'uploading'">
									<view class="progress-bar-small">
										<view class="progress-fill-small"
											:style="{ width: (uploadProgress[item.tempUrl || item.url] || 0) + '%' }">
										</view>
									</view>
									<text class="uploading-text">上传中</text>
								</view>
							</view>
						</view>

						<!-- Add Button -->
						<view class="bg-image-item add-btn" v-if="selectedImages.length < 20" @click="openUploadType">
							<text style="font-size: 60rpx; color: #ccc;">+</text>
						</view>
					</view>
				</view>

				<!-- 固定底部 -->
				<view class="bg-manager-footer">
					<button class="bg-save-btn" :class="{ 'disabled': !canSave }" @click="saveImages"
						:disabled="!canSave">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import env from '@/config/env.js'
	import {
		uploadFile
	} from "@/utils/uploadUtil.js";
	
	const TEAM_OPERATE_ROLES = {
		ADD_MEMBER: 'canAddMember',
		ADD_SEATS: 'canAddSeats',
		MANAGE_WORKS: 'canManageWorks',
		MANAGE_COLLECTIONS: 'canManageCollections'
	};
	export default {
		name: 'UserActionBar',
		props: {
			name: {
				type: String,
				default: '未命名用户'
			},
			avatar: {
				type: String,
				default: ''
			},
			subText: {
				type: String,
				default: '关于我'
			},
			shareIcon: {
				type: String,
				default: '/static/common/分享.png'
			},

			// 新增：是否开启固定在底部模式（默认为 true，即插即用）
			fixed: {
				type: Boolean,
				default: true
			},
			workId: {
				type: [String, Number],
				default: ''
			},
			userId: {
				type: [String, Number],
				default: ''
			},
			workInfo: {
				type: Object,
				default: () => ({})
			},
			// 是否是自己的作品
			isOwner: {
				type: Boolean,
			},
			isHide: {
				type: [String, Number],
				default: '' // 默认为公开，0:公开 1:隐藏
			},
			// 是否处于团队模式
			isTeamMode: {
				type: Boolean,
				default: false
			},
			// 上传照片时是否跳转到作品新建页面
			isUploadWorkCreate:{
				type:Boolean,
				default: false
			},
			hideManageActions: {
				type: Boolean,
				default: false
			}
		},
		data() {
				return {
					isLiked: false,
					showPublishPopup: false,
					showReportPopup: false,
					reportReason: '',
					showWorkPopup: false,
					currentWorkItem: {},
					
					// 添加作品相关
					showAddWorksPopup: false,
					showUploadProgress: false,
					uploadProgress: 0,
					ossUrl: env.aliyunUrl,
					// 图片管理弹窗相关
					showImageManagerPopup: false,
						selectedImages: [],
						imageItems: [],
						uploadProgressObj: {},
						// 拖拽相关状态
						isDragging: false,
						draggingIndex: -1,
						placeholderIndex: -1,
						startPosition: null,
						currentPosition: null,
						originalIndex: -1,
						gridInfo: null,
						imageGridRect: null,
						itemSize: 0,
						// 上传状态
						isUploading: false,
						
						}
				},
		computed: {
			// 判断是否可以保存
			canSave() {
				// 检查是否有选中的图片
				if (this.selectedImages.length === 0) {
					return false;
				}
				// 检查是否有正在上传的图片或正在上传中
				if (this.imageItems.some(item => item.status === 'uploading') || this.isUploading) {
					return false;
				}
				return true;
			}
		},
		methods: {
			// 添加作品图片
			addWorksImage(type) {
				this.showPublishPopup = false

				// 检查是否有权限
				if (!this.isOwner) {
					uni.showToast({
						title: '只有作品所有者可以添加',
						icon: 'none'
					});
					return;
				}

				const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'pptx', 'ppt', 'mp4', 'mov', 'avi', 'flv', 'wmv',
					'mkv'
				];

				if (type === 'album') {
					uni.chooseMedia({
						count: 20 - this.selectedImages.length, // 一次最多可选20张
						mediaType: ['image'],
						sourceType: ['album', 'camera'],
						sizeType: ['original', 'compressed'],
						success: (res) => {
							// 将选中的图片添加到 selectedImages 数组中
							const tempFiles = res.tempFiles.map(file => file.tempFilePath);
							this.selectedImages = [...this.selectedImages, ...tempFiles];
							// 打开图片管理弹窗
							this.openImageManager();
						},
						fail: (err) => {
							console.error("选择相册失败:", err);
						}
					});
				} else if (type === 'chat') {
					// #ifdef MP-WEIXIN
					wx.chooseMessageFile({
						count: 20 - this.selectedImages.length,
						type: 'all',
						extension: ['jpg', 'jpeg', 'png', 'pdf', 'pptx', 'ppt', 'mp4', 'mov', 'avi', 'flv', 'wmv',
							'mkv'
						],
						success: (res) => {
							// 将选中的文件添加到 selectedImages 数组中
							const tempFiles = res.tempFiles.map(file => file.path);
							this.selectedImages = [...this.selectedImages, ...tempFiles];
							// 打开图片管理弹窗
							this.openImageManager();
						},
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

			// 处理作品图片上传
			async handleWorksUpload(filePaths) {
				if (!filePaths || filePaths.length === 0) return;

				// 显示上传进度
				this.showUploadProgress = true;
				this.uploadProgress = 0;

				const uploadedUrls = [];
				const totalFiles = filePaths.length;
				let completedCount = 0;

				for (const filePath of filePaths) {
					const ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
					const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'pptx', 'ppt', 'mp4', 'mov', 'avi', 'flv',
						'wmv', 'mkv'
					];

					if (!allowedExtensions.includes(ext)) {
						uni.showToast({
							title: `不支持的文件格式: ${ext}`,
							icon: 'none'
						});
						completedCount++;
						continue;
					}

					try {
						const formData = {
							isVerify: "true"
						};
						if (String(this.workInfo.workType) === '1') {
							formData.isTeam = "true";
						}

						const result = await uploadFile({
							url: env.baseUrl + "/wechat/basic/upload",
							filePath,
							name: "file",
							formData,
							onProgressUpdate: (progress) => {
								// 计算整体进度
								const fileProgress = progress.progress;
								const totalProgress = (completedCount / totalFiles * 100) + (fileProgress /
									totalFiles);
								this.uploadProgress = Math.round(totalProgress);
							}
						});

						if (result.code == 200) {
							uploadedUrls.push(result.msg);
						} else {
							uni.showToast({
								title: '部分文件上传失败',
								icon: 'none'
							});
						}
					} catch (error) {
						console.error("上传失败:", error);
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					} finally {
						completedCount++;
						// 更新进度
						this.uploadProgress = Math.round((completedCount / totalFiles) * 100);
					}
				}

				// 隐藏上传进度
				setTimeout(() => {
					this.showUploadProgress = false;
					this.uploadProgress = 0;
					this.showImageManagerPopup = false;
				}, 500);

				// 如果有成功上传的文件，添加到作品
				if (uploadedUrls.length > 0) {
					return uploadedUrls;
				}
				return [];
			},

			// 添加图片到当前作品
			async addImagesToWork(imageUrls) {
				if (!imageUrls || imageUrls.length === 0) return;

				try {
					// 首先上传图片
					const uploadedUrls = await this.handleWorksUpload(imageUrls);

					if (uploadedUrls.length === 0) {
						uni.hideLoading();
						return;
					}

					// 获取当前作品详情
					const workDetail = await this.$request.get(`/wechat/works/findWorks/${this.workId}`);

					if (workDetail.code === 200) {
						const currentImages = JSON.parse(workDetail.data.imageUrls || '[]');
						// 合并现有图片和新图片
						const newImages = [...currentImages, ...uploadedUrls];

						// 更新作品图片
						const updateRes = await this.$request.put('/wechat/works/editWorks', {
							id: this.workId,
							images: newImages,
							title: workDetail.data.title,
							description: workDetail.data.description,
							coverUrl: workDetail.data.coverUrl,
							addTags: JSON.parse(workDetail.data.tags || '[]'),
							workType: workDetail.data.workType,
							teamId: workDetail.data.teamId
						});

						uni.hideLoading();

						if (updateRes.code === 200) {
							uni.showToast({
								title: `成功添加 ${uploadedUrls.length} 张图片`,
								icon: 'success',
								duration: 2000
							});

							// 清空选中的图片
							this.selectedImages = [];
							this.imageItems = [];
							// 触发页面刷新，显示最新的作品图片
							this.$emit('work-updated');
							uni.$emit('refreshWorkDetail');
						} else {
							uni.showToast({
								title: updateRes.msg || '添加失败',
								icon: 'none'
							});
						}
					} else {
						uni.hideLoading();
						uni.showToast({
							title: '获取作品信息失败',
							icon: 'none'
						});
					}
				} catch (error) {
					uni.hideLoading();
					console.error('添加到作品失败:', error);
					uni.showToast({
						title: '添加到作品失败',
						icon: 'none'
					});
				}
			},

			// 电脑上传指引
			showComputerGuide() {
				uni.showModal({
					title: '电脑上传指引',
					content: '1. 登录电脑版微信\n2. 打开本小程序\n3. 进入详情页点击上传\n4. 选择"从聊天记录选择"\n5. 选择电脑发送到手机的文件',
					showCancel: false,
					confirmText: '知道了'
				});
			},
			
			async checkTeamPermissions(role) {
				try {
					await this.$request.get('/wechat/basic/hasTeamRight');
					await this.$request.get('/wechat/basic/hasOperateRight', {
						role
					});
					return true;
				} catch (e) {
					return false;
				}
			},

			async onPublishClick() {
				console.log('点击添加作品弹窗')
				// this.showPublishPopup = true;
				// 检查是否有权限
				console.log("owner",this.isOwner)
								if (!this.isOwner) {
									uni.showToast({
										title: '只有作品所有者可以添加',
										icon: 'none'
									});
									return;
								}
								console.log("teamMode",this.isTeamMode)
								// 团队模式下检查权限
								if (this.isTeamMode) {
									const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
									if (!ok) return;
								}
								
								// 跳转到作品修改页面
								uni.navigateTo({
									url: `/subpkg-library/pages/works/create?id=${this.workId}&isShowUploadPopup=${1}`
								});
				
				
			},
			async navigateTo(url) {
				const path = (url || '').split('?')[0];
				const isLoggedIn = this.hasLoginToken();
				const routeHandlerMap = {
					"/subpkg-library/pages/works/create": async () => {
						try {
							await this.$request.get('/wechat/basic/hasRight', {
								operateType: 0,
								type: 0
							});
							return true;
						} catch (e) {
							return false;
						}
					},
					"/subpkg-library/pages/collection/create": async () => {
						try {
							await this.$request.get('/wechat/basic/hasRight', {
								operateType: 0,
								type: 1
							});
							return true;
						} catch (e) {
							return false;
						}
					}
				};
				if (isLoggedIn && routeHandlerMap[path]) {
					const canNavigate = await routeHandlerMap[path]();
					if (!canNavigate) {
						this.showPublishPopup = false;
						return;
					}
				}
				uni.navigateTo({
					url
				});
				this.showPublishPopup = false;
			},
			hasLoginToken() {
				return !!uni.getStorageSync('token');
			},
			async onUserClick() {
				if (!this.userId) {
					return;
				}

				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				// 2. 检查当前用户是否登录
				const token = uni.getStorageSync('token');
				if (!token) {
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: '请先登录',
						showCancel: false,
						confirmText: '去登录',
						success: (res) => {
							if (res.confirm) {
								// 跳转到个人中心页进行登录
								uni.navigateTo({
									url: '/subpkg-others/pages/login/index'
								});
							}
						}
					});
					return;
				}

				// 3. 已登录，检查当前用户的微信号和手机号是否完善
				const checkRes = await this.$request.get(`/wechat/visitor/checkVisitor/${this.userId}`);

				uni.hideLoading();

				if (checkRes.code === 200) {
					// 检查通过，允许访问
					this.navigateToVisitorHome();
				} else {
					// 检查不通过，提示用户
					uni.showModal({
						title: '提示',
						content: checkRes.msg || '请完善个人信息（手机号和微信号）以访问该主页',
						showCancel: false,
						confirmText: '去完善',
						success: (res) => {
							if (res.confirm) {
								// 跳转到个人信息编辑页面
								uni.navigateTo({
									url: '/subpkg-profile/pages/edit'
								});
							}
						}
					});
				}
			},
			navigateToVisitorHome() {
				uni.navigateTo({
					url: `/subpkg-library/pages/visitor-home?userId=${this.userId}&isTeamMode=${this.isTeamMode}`
				})
				this.$emit('user-click');
			},
			onShareClick() {
				this.$emit('share-click');
			},
			onLikeClick() {
				this.isLiked = !this.isLiked;
				this.$emit('like-click', this.isLiked);
			},
			handleEditWork() {
				this.closeWorkPopup();

				// 检查是否有作品信息
				if (!this.workId) {
					uni.showToast({
						title: '作品ID不能为空',
						icon: 'none'
					});
					return;
				}

				// 跳转到创建页面，传递作品ID和标题
				uni.navigateTo({
					url: `/subpkg-library/pages/works/create?id=${this.workId}`
				});

			},
			// 设置作品是否可见
			handleVisableWork() {
				this.closeWorkPopup();
				const newIsHide = this.isHide === '1' ? '0' : '1';
				const actionText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
				const confirmText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
				uni.showModal({
					title: '提示',
					content: `确定要${actionText}吗？`,
					success: (modalRes) => {
						if (modalRes.confirm) {
							const params = {
								worksId: Number(this.workId),
								isHide: newIsHide //0:否 1:是
							}
							this.$request.put(
									`/wechat/works/setWorkHide`, params
								)
								.then(res => {
									if (res.code == 200) {
										uni.showToast({
											title: '设置成功',
											icon: 'none'
										});
										this.$emit('work-updated');
										uni.$emit('refreshWorkDetail');
									}
								})
						}
					}
				});
			},
			// 删除作品
			handleDeleteCollection() {
				this.closeWorkPopup();
				uni.showModal({
					title: '提示',
					content: '确定要删除该作品吗？',
					success: (modalRes) => {
						if (modalRes.confirm) {
							this.$request.delete(
									`/wechat/works/deleteWork/${this.workId}`
								)
								.then(res => {
									if (res.code == 200) {
										uni.showToast({
											title: '删除作品成功',
											icon: 'none'
										});
										setTimeout(() => {
											uni.navigateBack();
										}, 1500);
									}
								})
						}
					}
				});
			},
			// 举报作品
			handleReportWork() {
				this.closeWorkPopup();
				this.showReportPopup = true;
			},
			// 下载作品
			handleDownloadWork() {
				this.closeWorkPopup();
				this.downloadWorks('work', this.workId);
			},
			// 判断是否是电脑端
			isPC() {
				const systemInfo = uni.getSystemInfoSync();
				return systemInfo.platform === 'windows' || systemInfo.platform === 'mac';
			},

			// 判断是否已登录
			isLoggedIn() {
				const userInfo = uni.getStorageSync('userInfo');
				return !!userInfo && !!userInfo.id;
			},

			// 处理压缩包下载
			async downloadZip(resourceType, id) {
				const userInfo = uni.getStorageSync('userInfo') || {};
				const isTeam = userInfo.vipLevel === 'team' || false;
				uni.showLoading({
					title: '生成压缩包...',
					mask: true
				});
				const res = await this.$request.post('/wechat/basic/downLoadWorksPc', {
					id: id,
					resourceType: resourceType,
					userName: userInfo.nickName || '',
					teamMode: isTeam
				});
				if (res.code === 200 && res.data) {
					uni.hideLoading();
					// 打开下载链接
					uni.showModal({
						title: '压缩包下载',
						content: `压缩包生成成功，请点击复制链接到浏览器下载`,
						confirmText: '复制链接',
						cancelText: '取消',
						success: (modalRes) => {
							if (modalRes.confirm) {
								// 复制链接到剪贴板
								uni.setClipboardData({
									data: res.data,
									success: () => {
										uni.showToast({
											title: '链接已复制到剪贴板',
											icon: 'success',
											duration: 2000
										});
									},
									fail: () => {
										uni.showToast({
											title: '复制失败',
											icon: 'none'
										});
									}
								});
							}
						}
					});
				} else {
					uni.hideLoading();
					uni.showToast({
						title: res.msg || '用户案列暂不支持下载',
						icon: 'none'
					});
				}

			},

			async downloadWorks(resourceType, id) {
				// 检查是否是电脑端且已登录
				const isPC = this.isPC();
				const isLoggedIn = this.isLoggedIn();

				if (isPC && isLoggedIn) {
					// 电脑端且已登录，使用压缩包下载
					this.downloadZip(resourceType, id);
				} else {
					// 移动端或未登录，使用原有的文件下载方式
					const userInfo = uni.getStorageSync('userInfo') || {};
					const isTeam = userInfo.vipLevel === 'team' || false;
					uni.showLoading({
						title: '获取文件列表...',
						mask: true
					});
					try {
						const res = await this.$request.post('/wechat/basic/downLoadWorks', {
							id: id,
							resourceType: resourceType,
							userName: userInfo.nickName || '',
							teamMode: isTeam
						});
						if (res.code === 200 && res.data && res.data.length > 0) {
							uni.hideLoading();
							this.downloadFiles(res.data);
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '用户案列暂不支持下载',
								icon: 'none'
							});
						}
					} catch (error) {
						uni.hideLoading();
						uni.showToast({
							title: '获取下载内容失败',
							icon: 'none'
						});
						console.error('获取下载内容失败:', error);
					}
				}
			},
			async downloadFiles(filePaths) {
				let downloadedFiles = 0;
				let savedFiles = 0;
				const totalFiles = filePaths.length;

				for (let i = 0; i < filePaths.length; i++) {
					const filePath = filePaths[i];
					const fullUrl = this.ossUrl + filePath;
					const fileType = this.getFileType(filePath);

					try {
						const tempFilePath = await new Promise((resolve, reject) => {
							uni.downloadFile({
								url: fullUrl,
								success: (downloadRes) => {
									if (downloadRes.statusCode === 200) {
										resolve(downloadRes.tempFilePath);
									} else {
										reject(new Error(`下载失败: ${downloadRes.statusCode}`));
									}
								},
								fail: (err) => {
									reject(err);
								}
							});
						});

						downloadedFiles++;

						// 保存到相册（如果是图片或视频）
						if (fileType === 'image' || fileType === 'video') {
							try {
								if (fileType === 'image') {
									await this.saveImageToAlbum(tempFilePath);
								} else if (fileType === 'video') {
									await this.saveVideoToAlbum(tempFilePath);
								}
								savedFiles++;
							} catch (saveError) {
								console.error(`保存文件失败 ${filePath}:`, saveError);
								// 继续处理其他文件
							}
						}
					} catch (error) {
						console.error(`下载文件失败 ${filePath}:`, error);
						// 继续下载其他文件
					}
				}

				let toastMessage = `成功下载 ${downloadedFiles} 个文件`;
				if (savedFiles > 0) {
					toastMessage += `，其中 ${savedFiles} 个已保存到相册`;
				}

				uni.showToast({
					title: toastMessage,
					icon: 'none'
				});
			},
			getFileType(filePath) {
				const ext = filePath.split('.').pop().toLowerCase();
				const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
				const videoExts = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv'];

				if (imageExts.includes(ext)) {
					return 'image';
				} else if (videoExts.includes(ext)) {
					return 'video';
				} else {
					return 'other';
				}
			},
			saveImageToAlbum(tempFilePath) {
				return new Promise((resolve, reject) => {
					uni.saveImageToPhotosAlbum({
						filePath: tempFilePath,
						success: () => {
							resolve();
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
			},
			saveVideoToAlbum(tempFilePath) {
				return new Promise((resolve, reject) => {
					uni.saveVideoToPhotosAlbum({
						filePath: tempFilePath,
						success: () => {
							resolve();
						},
						fail: (err) => {
							reject(err);
						}
					});
				});
			},
			onMoreClick() {
				this.showWorkPopup = true;
				console.log('点击管理作品设置')
			},
			// 关闭作品管理弹窗
			closeWorkPopup() {
				this.showWorkPopup = false;
			},
			closeReportPopup() {
				this.showReportPopup = false;
				this.reportReason = '';
			},
			submitReport() {
				if (!this.reportReason.trim()) {
					uni.showToast({
						title: '请输入举报说明',
						icon: 'none'
					});
					return;
				}

				if (!this.workId) {
					uni.showToast({
						title: '作品ID不能为空',
						icon: 'none'
					});
					return;
				}

				uni.showLoading({
					title: '提交中...'
				});

				this.$request.post('/wechat/works/addReport', {
					workId: this.workId,
					remark: this.reportReason
				}).then(res => {
					uni.hideLoading();
					if (res.code === 200) {
						uni.showToast({
							title: '举报已提交',
							icon: 'none'
						});
						this.closeReportPopup();
					}
				})
			},
			// 打开图片管理弹窗
			openImageManager() {
				this.showImageManagerPopup = true;
				// 初始化数据
				this.imageItems = this.selectedImages.map((url, index) => ({
					id: `img_${Date.now()}_${index}`,
					url,
					status: 'completed'
				}));

				this.$nextTick(() => {
					this.initGridInfo();
				});
			},
			// 关闭图片管理弹窗
			closeImageManagerPopup() {
				this.showImageManagerPopup = false;
				this.resetDragState();
				// 清除选择的图片数据，因为用户没有点击保存
				this.selectedImages = [];
				this.imageItems = [];
			},
			// 打开上传方式选择
			openUploadType() {
				if (this.selectedImages.length >= 20) {
					uni.showToast({
						title: '最多上传20张图片',
						icon: 'none'
					});
					return;
				}
				this.resetDragState();
				// 这里可以调用现有的上传方式弹窗
				this.showPublishPopup = true;
			},
			// 保存图片管理结果
			async saveImages() {
				// 检查是否有正在上传的图片
				if (this.imageItems.some(item => item.status === 'uploading')) {
					uni.showToast({
						title: '图片正在上传中，请稍后',
						icon: 'none'
					});
					return;
				}

				// 设置上传状态
				this.isUploading = true;

				try {
					// 如果有成功上传的文件，添加到作品
					if (this.selectedImages.length > 0) {
						await this.addImagesToWork(this.selectedImages);
					}
				} finally {
					// 重置上传状态
					this.isUploading = false;
					// 关闭图片管理弹窗
					this.closeImageManagerPopup();
				}
			},
			// 删除图片
			deleteImage(index) {
				this.selectedImages.splice(index, 1);
				this.imageItems.splice(index, 1);
			},
			// 初始化网格信息
			initGridInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg-image-grid').boundingClientRect(data => {
					if (data) {
						this.imageGridRect = data;
					}
				}).exec();

				query.select('.bg-image-item').boundingClientRect(data => {
					if (data) {
						this.itemSize = data.width;
						const rpxToPx = uni.getSystemInfoSync().windowWidth / 750;
						this.gridInfo = {
							itemSize: data.width,
							gap: 12 * rpxToPx,
							padding: 20 * rpxToPx
						};
					}
				}).exec();
			},
			// 长按开始拖拽
			onLongPress(index) {
				if (this.draggingIndex !== -1) {
					this.resetDragState();
					return;
				}
				// 确保gridInfo已初始化
				if (!this.gridInfo || !this.gridInfo.itemSize) {
					const rpxToPx = uni.getSystemInfoSync().windowWidth / 750;
					const query = uni.createSelectorQuery().in(this);
					query.select('.bg-image-item').boundingClientRect(data => {
						if (data) {
							this.gridInfo = {
								itemSize: data.width,
								gap: 12 * rpxToPx,
								padding: 20 * rpxToPx
							};
							this.startDrag(index);
						} else {
							uni.showToast({
								title: '请先上传图片',
								icon: 'none'
							});
						}
					}).exec();
					return;
				}
				this.startDrag(index);
			},
			// 开始拖拽
			startDrag(index) {
				this.isDragging = true;
				this.draggingIndex = index;
				this.placeholderIndex = index;
				this.originalIndex = index;
				uni.vibrateShort();
			},
			// 触摸开始
			onTouchStart(e, index) {
				if (e.touches.length > 1) return;
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
			// 触摸移动
			onTouchMove(e, index) {
				// 添加对 e 参数的检查
				if (!e || !e.touches || e.touches.length === 0) {
					return;
				}

				// 如果不是拖拽状态，完全允许默认行为（页面滚动）
				if (this.draggingIndex === -1) {
					return;
				}

				// 如果是拖拽状态但不是当前元素，也允许默认行为
				if (this.draggingIndex !== index) {
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

				if (!this.gridInfo) return;

				const moveDeltaX = this.currentPosition.x - this.startPosition.x;
				const moveDeltaY = this.currentPosition.y - this.startPosition.y;

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
					uni.vibrateShort();
				}
			},
			// 触摸结束
			onTouchEnd(e, index) {
				// 添加对 e 参数的检查
				if (!e) {
					this.resetDragState();
					return;
				}

				if (this.draggingIndex === index) {
					if (this.originalIndex !== this.placeholderIndex && this.placeholderIndex !== -1) {
						// 交换位置
						const tempItems = [...this.imageItems];
						const tempImages = [...this.selectedImages];

						const item = tempItems[this.originalIndex];
						const img = tempImages[this.originalIndex];

						// 移除旧位置
						tempItems.splice(this.originalIndex, 1);
						tempImages.splice(this.originalIndex, 1);

						// 插入新位置
						tempItems.splice(this.placeholderIndex, 0, item);
						tempImages.splice(this.placeholderIndex, 0, img);

						this.imageItems = tempItems;
						this.selectedImages = tempImages;
					}
					this.resetDragState();
				}
			},
			// 重置拖拽状态
			resetDragState() {
				this.draggingIndex = -1;
				this.startPosition = null;
				this.currentPosition = null;
				this.isDragging = false;
				this.originalIndex = -1;
				this.placeholderIndex = -1;
			},
			// 解析URL
			resolveUrl(url) {
				if (!url) return '';
				if (/^(http|https|wxfile|data):/.test(url)) {
					return url;
				}
				return this.ossUrl + url;
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 定义高度变量，方便统一修改 */
	$bar-height: 120rpx;

	/* 1. 占位块样式 */
	.placeholder-block {
		width: 100%;
		/* 高度 = 内容高度 + 底部安全区高度 */
		height: calc(#{$bar-height} + constant(safe-area-inset-bottom));
		height: calc(#{$bar-height} + env(safe-area-inset-bottom));
	}

	/* 2. 实体栏样式 */
	.action-bar-body {
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: $bar-height;
		/* 设定内容高度 */

		/* 默认非 fixed 时的样式 */
		width: 100%;
	}

	/* 开启 fixed 后的样式覆盖 */
	.action-bar-body.is-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 999;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

		/* 关键：给固定栏增加底部内边距，把内容顶上来，避开小黑条 */
		/* 同时让背景色延伸覆盖小黑条区域 */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		/* 因为加了 padding-bottom，为了保持内容垂直居中，
     我们需要让盒子高度自动延伸，而不是固定死 height */
		height: auto;
		/* 重新定义最小高度，确保内容区高度一致 */
		min-height: calc(#{$bar-height} + constant(safe-area-inset-bottom));
		min-height: calc(#{$bar-height} + env(safe-area-inset-bottom));

		/* 也就是：内容本身占 120rpx，下面多余的 padding 是安全区 */
		/* 让内部元素靠上对齐，或者给内部加一个容器限制高度 */
		.left-section,
		.right-section {
			height: $bar-height;
			/* 强制子元素高度，保证垂直居中 */
			display: flex;
			align-items: center;
		}
	}

	/* 内部元素样式 */
	.left-section {
		display: flex;
		align-items: center;

		&:active {
			opacity: 0.7;
		}

		.avatar {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			margin-right: 24rpx;
			background-color: #f0f0f0;
			border: 1rpx solid #eee;
		}

		.info-box {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.name {
				font-size: 34rpx;
				font-weight: bold;
				color: #000;
				margin-bottom: 6rpx;
			}

			.sub-text {
				font-size: 24rpx;
				color: #999;
				display: flex;
				align-items: center;
			}

			.arrow {
				margin-left: 6rpx;
				font-size: 26rpx;
			}
		}
	}

	.right-section {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.btn-item {
			margin: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60rpx;
			height: 60rpx;

			&:active {
				opacity: 0.7;
			}
		}

		.btn-item + .btn-item {
			margin-left: 44rpx;
		}

		.share-btn {
			background-color: transparent;
			padding: 0;
			margin: 0;
			line-height: inherit;
			border-radius: 0;

			&::after {
				border: none;
			}
		}

		.btn-item + .share-btn {
			margin-left: 34rpx;
		}

		.share-icon {
			width: 48rpx;
			height: 48rpx;
			display: block;
		}

		.iconfont {
			font-size: 44rpx;
			color: #333;

			&.like-icon {
				font-size: 48rpx;
				transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

				&.is-active {
					color: #ff4d4f;
					animation: likeBounce 0.4s;
				}
			}

			&.more-icon {
				font-size: 44rpx;
				font-weight: bold;
				letter-spacing: 2rpx;
				line-height: 1;
				margin-top: -6rpx;
			}
		}
	}

	/* 举报弹窗样式 */
	.popup-mask2 {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.popup-content2 {
		width: 600rpx;
		background: #fff;
		border-radius: 30rpx;
		padding: 40rpx 30rpx;
		display: flex;
		flex-direction: column;
		margin: 20rpx;
	}

	.popup-title2 {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 30rpx;
		color: #333;
	}

	.report-input2 {
		width: 100%;
		height: 200rpx;
		background: #f5f5f5;
		border-radius: 8rpx;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #333;
		margin-bottom: 30rpx;
	}

	.popup-btns2 {
		display: flex;
		justify-content: space-between;
	}

	.btn {
		width: 48%;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
	}

	.btn.cancel {
		background: #f5f5f5;
		color: #666;
	}

	.btn.confirm {
		background: #ff7a22;
		color: #fff;
	}

	@keyframes likeBounce {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.3);
		}

		100% {
			transform: scale(1);
		}
	}

	/* 发布弹窗样式 */
	.publish-popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 10000;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.publish-popup-content {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx 40rpx 70rpx 40rpx;
		animation: slideUp 0.3s ease-out;
		position: relative;
		margin: 20rpx;
	}

	.handle-bar {
		width: 100rpx;
		height: 15rpx;
		background: #d3d3d3;
		border-radius: 10rpx;
		margin: 10rpx auto 10rpx;
	}

	.menu-list {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}

	.menu-item {
		display: flex;
		align-items: flex-start;
		align-items: center;
	}

	.menu-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 30rpx;
		margin-top: 5rpx;
	}

	.menu-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 5rpx;
	}

	.menu-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 8rpx;
	}

	.menu-desc {
		font-size: 24rpx;
		color: #999;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	/* 作品管理弹窗 */
	.work-popup-mask {
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

	.work-popup-content {
		background: #fff;
		border-radius: 30rpx;
		padding: 20rpx 0 20rpx;
		min-height: 200rpx;
		margin: 20rpx;
	}

	.wp-handle {
		width: 100rpx;
		height: 15rpx;
		background: #d3d3d3;
		border-radius: 10rpx;
		margin: 10rpx auto 10rpx;
	}

	.wp-title {
		font-size: 28rpx;
		color: #999;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}

	.wp-section-title {
		font-size: 28rpx;
		color: #999;
		margin-left: 40rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}

	.wp-list {
		padding: 0 40rpx;
	}

	.wp-item {
		display: flex;
		align-items: center;
		padding: 15rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
	}

	.wp-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
	}

	.wp-right {
		font-size: 24rpx;
		color: #999;
		margin-left: 20rpx;
	}

	.wp-item:active {
		opacity: 0.7;
	}

	.wp-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 22rpx;
	}

	.wp-text {
		font-size: 32rpx;
		color: #333;
	}

	/* 上传进度样式 */
	.upload-progress-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload-progress-content {
		background: #fff;
		border-radius: 20rpx;
		padding: 60rpx 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 400rpx;
	}

	.progress-title {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 40rpx;
		font-weight: bold;
	}

	.progress-bar {
		width: 300rpx;
		height: 16rpx;
		background-color: #f0f0f0;
		border-radius: 8rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.progress-fill {
		height: 100%;
		background-color: #ff7a22;
		border-radius: 8rpx;
		transition: width 0.3s ease;
	}

	.progress-text {
		font-size: 28rpx;
		color: #666;
		font-weight: bold;
	}

	/* 4. 底部弹窗样式 */
	.popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1001;
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
		font-weight: bold;
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
		font-weight: bold;
		color: #333;
	}

	.p-sub {
		font-size: 24rpx;
		color: #ccc;
	}

	/* 图片管理弹窗样式 */
	.bg-manager-content {
		padding: 30rpx;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
	}

	/* 固定头部 */
	.bg-manager-header {
		margin-bottom: 20rpx;
	}

	/* 可滚动内容区域 */
	.bg-manager-scroll {
		flex: 1;
		overflow-y: auto;
		margin-bottom: 30rpx;
	}

	/* 固定底部 */
	.bg-manager-footer {
		margin-top: auto;
	}

	.bg-image-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12rpx;
		margin: 30rpx 0;
	}

	.bg-image-item {
		aspect-ratio: 1;
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;
		background-color: #f5f5f5;
		transition: all 0.2s ease;
	}

	.bg-image-item.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx dashed #ddd;
		background-color: #f9f9f9;
	}

	.bg-image-item.dragging {
		opacity: 0.8;
		box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
	}

	.bg-image-item.placeholder {
		background-color: #f0f0f0;
		border: 2rpx dashed #ccc;
	}

	.bg-img-preview {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.bg-delete-btn {
		position: absolute;
		top: 8rpx;
		right: 8rpx;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.6);
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		line-height: 40rpx;
		z-index: 10;
	}

	.progress-container-small {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 10rpx;
		box-sizing: border-box;
	}

	.progress-bar-small {
		width: 100%;
		height: 8rpx;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 4rpx;
		overflow: hidden;
		margin-bottom: 8rpx;
	}

	.progress-fill-small {
		height: 100%;
		background-color: #ff7a22;
		border-radius: 4rpx;
		transition: width 0.3s ease;
	}

	.uploading-text {
		font-size: 20rpx;
		color: #fff;
		text-align: center;
	}

	.bg-save-btn {
		width: 100%;
		height: 80rpx;
		background-color: #ff7a22;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		border-radius: 40rpx;
		margin-top: 40rpx;
		border: none;
	}

	.bg-save-btn.disabled {
		background-color: #F37738;
		color: #fff;
		opacity: 0.7;
		pointer-events: none;
	}

	.wp-sub-title {
		font-size: 24rpx;
		color: #999;
		text-align: center;
		margin-top: 10rpx;
	}

	/* 图片容器 */
	.bg-image-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 12rpx;
		overflow: hidden;
		background: #f0f0f0;
	}

	/* 视频预览样式 */
	.bg-video-preview {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.bg-video-tag {
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		padding: 4rpx 12rpx;
		border-radius: 8rpx;
		font-size: 20rpx;
	}

	/* 文档预览样式 */
	.bg-document-preview {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 12rpx;
	}

	/* 文档图标样式 */
	.bg-document-icon {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 10rpx;
	}

	/* 文档名称样式 */
	.bg-document-name {
		font-size: 20rpx;
		color: #666;
		max-width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}
</style>
