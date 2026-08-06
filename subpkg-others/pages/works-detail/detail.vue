<template>
	<view>
		<view class="container" v-if="!loading">

			<!-- 1. 顶部头部区域 -->
			<view class="header">
				<view class="header-left">
					<!-- 标题（可点击编辑） -->
					<text class="title" @click="editTitle">{{ productInfo.title }}</text>
					<!-- 标签（可点击编辑，与创建页样式一致） -->
				<view class="tags-container">
				  <template v-if="productInfo.tags && productInfo.tags.length > 0">
				    <text
				      class="tag"
				      v-for="tag in productInfo.tags"
				      :key="tag.tagName"
				      @click="editTags"
				    >
				      #{{ tag.tagName }}
				    </text>
				  </template>
				  <text v-else class="tag" @click="editTags">点击添加作品标签</text>
				</view>
				</view>
				<view class="header-right">
					<!-- 布局切换选择器 -->
					<view class="layout-selector">
						<view class="layout-option active" @click="toggleLayout">
							<image :src="getCurrentLayoutIcon()" class="layout-icon-image" mode="aspectFit" />
						</view>
					</view>
				</view>
			</view>

			<!-- 2. 中间图片/视频内容区域 -->
			<scroll-view scroll-y class="content-area" :class="currentLayout + '-layout'"
				@scrolltolower="onScrollToLower">
				<!-- 混合布局容器 -->
				<view class="mixed-layout-container" v-if="currentLayout === 'mixed'">
					<!-- 动态显示图片、视频或文档 -->
					<view class="media-item" v-for="(item, index) in productInfo.imageUrls" :key="index">
						<!-- 图片 -->
						<view v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item)" class="image-wrapper">
							<image :src="buildOssImageUrl(item)" class="detail-img"
								@click="previewImage(buildOssImageUrl(item), index)" @load="imageLoaded(index)"
								:class="{ 'img-loaded': loadedImages[index] }" mode="aspectFill"></image>
							<!-- 图片加载动画 -->
							<view class="image-loading"
								v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item) && !loadedImages[index]">
								<view class="loading-dots">
									<view class="loading-dot"></view>
									<view class="loading-dot"></view>
									<view class="loading-dot"></view>
								</view>
							</view>
						</view>
						<!-- 视频 -->
						<video v-else-if="isVideo(item)" :src="ossUrl + item" class="detail-video" controls
							:autoplay="false" :loop="false" :show-center-play-btn="true" :show-fullscreen-btn="true"
							:enable-progress-gesture="true" @click="previewImage(ossUrl + item, index)"></video>
						<!-- PDF文档 -->
						<view v-else-if="isPdfFile(item)" class="document-wrapper" @click="openDocument(item)">
							<view class="document-preview">
								<image src="/static/icon/pdf.svg" class="document-icon"></image>
								<text class="document-name">{{ item.split('/').pop() }}</text>
							</view>
						</view>
						<!-- PPTX文档 -->
						<view v-else-if="isPptxFile(item)" class="document-wrapper" @click="openDocument(item)">
							<view class="document-preview">
								<image src="/static/icon/pptx.svg" class="document-icon"></image>
								<text class="document-name">{{ item.split('/').pop() }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 大图布局容器 - 单张平铺 -->
				<view v-else-if="currentLayout === 'large'">
					<!-- 动态显示图片、视频或文档 -->
					<view class="media-item-large" v-for="(item, index) in productInfo.imageUrls" :key="index">
						<!-- 图片 -->
						<view v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item)"
							class="image-wrapper-large">
							<image :src="buildOssImageUrl(item)" @click="previewImage(buildOssImageUrl(item), index)"
								class="detail-img-large" @load="imageLoaded(index)"
								:class="{ 'img-loaded': loadedImages[index] }" mode="widthFix" />
							<view class="image-loading-large"
								v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item) && !loadedImages[index]">
								<view class="loading-dots">
									<view class="loading-dot"></view>
									<view class="loading-dot"></view>
									<view class="loading-dot"></view>
								</view>
							</view>
						</view>
						<!-- 视频 -->
						<video v-else-if="isVideo(item)" :src="ossUrl + item" class="detail-video-large" controls
							:autoplay="false" :loop="false" :show-center-play-btn="true" :show-fullscreen-btn="true"
							:enable-progress-gesture="true" @click="previewImage(ossUrl + item, index)"></video>
						<!-- PDF文档 -->
						<view v-else-if="isPdfFile(item)" class="document-wrapper-large" @click="openDocument(item)">
							<view class="document-preview-large">
								<image src="/static/icon/pdf.svg" class="document-icon-large"></image>
								<text class="document-name-large">{{ item.split('/').pop() }}</text>
							</view>
						</view>
						<!-- PPTX文档 -->
						<view v-else-if="isPptxFile(item)" class="document-wrapper-large" @click="openDocument(item)">
							<view class="document-preview-large">
								<image src="/static/icon/pptx.svg" class="document-icon-large"></image>
								<text class="document-name-large">{{ item.split('/').pop() }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 小图展示布局 -->
				<view v-else-if="currentLayout === 'small'">
					<view class="small-layout-container">
						<!-- 动态显示图片、视频或文档 -->
						<view class="media-item-small" v-for="(item, index) in productInfo.imageUrls" :key="index">
							<!-- 图片 -->
							<view v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item)"
								class="image-wrapper-small">
								<image :src="buildOssImageUrl(item)" class="detail-img-small"
									@click="previewImage(buildOssImageUrl(item), index)" @load="imageLoaded(index)"
									:class="{ 'img-loaded': loadedImages[index] }" mode="aspectFill"></image>
								<!-- 图片加载动画 -->
								<view class="image-loading-small"
									v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item) && !loadedImages[index]">
									<view class="loading-dots">
										<view class="loading-dot"></view>
										<view class="loading-dot"></view>
										<view class="loading-dot"></view>
									</view>
								</view>
							</view>
							<!-- 视频 -->
							<video v-else-if="isVideo(item)" :src="ossUrl + item" class="detail-video-small" controls
								:autoplay="false" :loop="false" :show-center-play-btn="true" :show-fullscreen-btn="true"
								:enable-progress-gesture="true" @click="previewImage(ossUrl + item, index)"></video>
							<!-- PDF文档 -->
							<view v-else-if="isPdfFile(item)" class="document-wrapper-small"
								@click="openDocument(item)">
								<view class="document-preview-small">
									<image src="/static/icon/pdf.svg" class="document-icon-small"></image>
									<text class="document-name-small">{{ item.split('/').pop() }}</text>
								</view>
							</view>
							<!-- PPTX文档 -->
							<view v-else-if="isPptxFile(item)" class="document-wrapper-small"
								@click="openDocument(item)">
								<view class="document-preview-small">
									<image src="/static/icon/pptx.svg" class="document-icon-small"></image>
									<text class="document-name-small">{{ item.split('/').pop() }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 长图展示布局 -->
				<view v-else-if="currentLayout === 'long'">
					<view class="long-layout-container">
						<!-- 动态显示图片、视频或文档 -->
						<view class="media-item-long" v-for="(item, index) in productInfo.imageUrls" :key="index">
							<!-- 图片 -->
							<view v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item)"
								class="image-wrapper-long">
								<image :src="buildOssImageUrl(item)" class="detail-img-long"
									@click="previewImage(buildOssImageUrl(item), index)" @load="imageLoaded(index)"
									:class="{ 'img-loaded': loadedImages[index] }" mode="widthFix"></image>
								<!-- 图片加载动画 -->
								<view class="image-loading-long"
									v-if="!isVideo(item) && !isPdfFile(item) && !isPptxFile(item) && !loadedImages[index]">
									<view class="loading-dots">
										<view class="loading-dot"></view>
										<view class="loading-dot"></view>
										<view class="loading-dot"></view>
									</view>
								</view>
							</view>
							<!-- 视频 -->
							<video v-else-if="isVideo(item)" :src="ossUrl + item" class="detail-video-long" controls
								:autoplay="false" :loop="false" :show-center-play-btn="true" :show-fullscreen-btn="true"
								:enable-progress-gesture="true" @click="previewImage(ossUrl + item, index)"></video>
							<!-- PDF文档 -->
							<view v-else-if="isPdfFile(item)" class="document-wrapper-long" @click="openDocument(item)">
								<view class="document-preview-long">
									<image src="/static/icon/pdf.svg" class="document-icon-long"></image>
									<text class="document-name-long">{{ item.split('/').pop() }}</text>
								</view>
							</view>
							<!-- PPTX文档 -->
							<view v-else-if="isPptxFile(item)" class="document-wrapper-long"
								@click="openDocument(item)">
								<view class="document-preview-long">
									<image src="/static/icon/pptx.svg" class="document-icon-long"></image>
									<text class="document-name-long">{{ item.split('/').pop() }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 作品简介 -->
				<view class="work-description" >
					<text @click="editDescription" v-if="productInfo.description" class="description-text">{{ productInfo.description }}</text>
					<text @click="editDescription" v-else class="description-text">{{isOwner?'添加作品简介':''}}</text>
				</view>
				<!-- 底部提示 -->
				<view class="bottom-tip" v-show="scrolledToBottom">
					<text class="tip-text">已经到底啦</text>
				</view>
			</scroll-view>
			<yun-share-btn :work-id="productId" :user-id="productInfo.userId" :avatar="ossUrl + productInfo.avatarUrl"
				:name="productInfo.nickName" :is-owner="isOwner" :is-hide="productInfo.hide" :is-team-mode="isTeamMode"
				:hide-manage-actions="hideManageActions" sub-text="关于我" @share-click="handleShare"
				@work-updated="refreshWorkDetail"></yun-share-btn>

			<yun-storage-warning />

			<!-- 编辑标题弹窗 (使用首页样式) -->
			<portfolio-select ref="titleEditPopup" :show="showTitleEditPopup" mode="title-edit"
				:edit-config="titleEditConfig" @close="closeTitleEditPopup" @confirm="handleSaveTitle" />

			<!-- 编辑标签弹窗 (使用create.vue样式) -->
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
						<view class="my-tags-section" v-if="editTagsList.length > 0">
							<view class="my-tags-header" style="border-top: none; padding-top: 0;">
								<text class="my-tags-title">已选标签({{ editTagsList.length }})</text>
							</view>
							<view class="tags-list">
								<view class="tag-item active" v-for="(tag, index) in editTagsList" :key="index"
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
									:class="{  active: editTagsList.some(t => t.tagName === tag.tagName) }" @click="toggleTag(tag)">
									{{ tag.tagName }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 编辑描述弹窗 (使用create.vue样式) -->
			<view class="popup-mask" v-if="showDescPopup" @click="showDescPopup = false">
				<view class="popup-content desc-popup" @click.stop>
					<view class="popup-handle"></view>
					<view class="popup-header">
						<text class="ph-title">编辑简介</text>
						<text class="ph-confirm" @click="saveDescription">完成</text>
					</view>
					<view class="desc-edit-area">
						<textarea class="desc-textarea" placeholder="请输入作品简介..." v-model="editDescriptionText"
							maxlength="500" fixed="true" cursor-spacing="100"></textarea>
						<view class="desc-count">{{ editDescriptionText.length }}/500</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="loading" class="loading-container">
			<view class="loading-spinner"></view>
			<text class="loading-text">加载中...</text>
		</view>
	</view>
</template>

<script>
	import env from '@/config/env.js'
	import buildOssImageUrl from '@/utils/imageUtil.js'
	import portfolioSelect from '@/components/portfolio-select.vue'
	const TEAM_OPERATE_ROLES = {
		ADD_MEMBER: 'canAddMember',
		ADD_SEATS: 'canAddSeats',
		MANAGE_WORKS: 'canManageWorks',
		MANAGE_COLLECTIONS: 'canManageCollections'
	};
	export default {
		components: {
			portfolioSelect
		},
		data() {
				return {
					watermarkText: '',
					user: { isVip: false },  
					ossUrl: env.aliyunUrl,
					productId: '',
					loading: true,
					productInfo: {},
					currentLayout: 'large', // 当前布局模式：'mixed'混合布局，'large'大图布局
					loadedImages: [], // 跟踪已加载的图片索引
					scrolledToBottom: false, // 标记是否滚动到底部
					userId: null,
					isTeamMode: false, // 是否为团队模式
					isShareAccess: false,
					// 编辑相关状态
					showTitleEditPopup: false,
					titleEditConfig: {
						title: '编辑标题',
						placeholder: '请输入作品标题',
						value: '',
						type: 'text'
					},
					showTagPopup: false,
					editTagsList: [],
					tagInput: '',
					myTags: [],
					showDescPopup: false,
					editDescriptionText: ''
				}
			},
		computed: {
			isOwner() {
				if (!this.productInfo.userId || !this.userId) {
					return false;
				}
				return this.productInfo.userId == this.userId;
			},
			hideManageActions() {
				return this.isShareAccess && !this.isOwner;
			},
		},
		onLoad(options) {
			if (options.id) {
				this.productId = options.id;
				this.isShareAccess = options.fromShare === '1';
				console.log("传参", options.id);
				// 处理团队模式参数
				this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
				if(this.isTeamMode){
					this.userId=uni.getStorageSync('teamOwnerId')
				}else{
					this.userId = uni.getStorageSync('userInfo')?.id;
				}
				this.loadProductDetail();
				// #ifdef MP-WEIXIN
				uni.showShareMenu({
					menus: ['shareAppMessage', 'shareTimeline']
				});
				// #endif
			} else {
				uni.showToast({
					title: '参数错误',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		},
		onShow() {
			// 监听来自编辑页面的刷新事件
			uni.$on('refreshWorkDetail', () => {
				this.loadProductDetail();
			});
		},
		onUnload() {
			// 移除事件监听器，避免内存泄漏
			uni.$off('refreshWorkDetail');
		},
		methods: {
			buildOssImageUrl,
			buildShareImageUrl(url) {
				if (!url || typeof url !== 'string') return '';
				const imageUrl = url.trim();
				if (!imageUrl) return '';
				if (/^https?:\/\//.test(imageUrl)) {
					return imageUrl;
				}
				return this.ossUrl + imageUrl.replace(/^\/+/, '');
			},
			getShareImageUrl() {
				const imageUrls = Array.isArray(this.productInfo.imageUrls) ? this.productInfo.imageUrls : [];
				const candidates = [this.productInfo.coverUrl, ...imageUrls];
				const shareImage = candidates.find(item => {
					return typeof item === 'string' && item.trim() && !this.isVideo(item) && !this.isPdfFile(item) && !this.isPptxFile(item);
				});
				return this.buildShareImageUrl(shareImage) || '/static/yunyiku/bg.png';
			},
			// 模拟调用接口获取详情数据
			async loadProductDetail() {
				this.loading = true;

				try {
					// 模拟网络请求延迟
					// await new Promise(resolve => setTimeout(resolve, 400));

					// 从模拟数据中获取对应ID的商品详情
					const {
						code,
						data
					} = await this.$request.get(`/wechat/works/findWorks/${this.productId}`)
					if (data) {
						this.productInfo = {
							...data,
							imageUrls: JSON.parse(data.imageUrls),
							tags: data.tagsList || []

						};
						console.log("productInfo", this.productInfo)
						uni.setNavigationBarTitle({
							title: data.title
						});
					} else {
						throw new Error('商品不存在');
					}
				} catch (error) {
					console.error('加载商品详情失败:', error);
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					});
				} finally {
					this.loading = false;
				}
			},

			// 格式化日期
			formatDate(dateStr) {
				return dateStr;
			},
			// 判断是否为视频文件
			isVideo(url) {
				const videoExtensions = ['.mp4', '.mov', '.avi', '.flv', '.wmv', '.mkv'];
				const lowercaseUrl = url.toLowerCase();
				return videoExtensions.some(ext => lowercaseUrl.endsWith(ext));
			},
			// 判断是否为PDF文件
			isPdfFile(url) {
				if (!url || typeof url !== 'string') {
					return false;
				}
				return url.toLowerCase().endsWith('.pdf');
			},
			// 判断是否为PPTX文件
			isPptxFile(url) {
				if (!url || typeof url !== 'string') {
					return false;
				}
				return url.toLowerCase().endsWith('.pptx') || url.toLowerCase().endsWith('.ppt');
			},
			refreshWorkDetail() {
				console.log('触发作品更新，重新加载详情');
				this.loadProductDetail();
				uni.showToast({
					title: '作品已更新',
					icon: 'success',
					duration: 1500
				});
			},
			// 分享功能
			showShareActions() {
				uni.showActionSheet({
					itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
					success: (res) => {
						switch (res.tapIndex) {
							case 0:
								uni.showToast({
									title: '分享到微信',
									icon: 'none'
								});
								break;
							case 1:
								uni.showToast({
									title: '分享到朋友圈',
									icon: 'none'
								});
								break;
							case 2:
								this.copyShareLink();
								break;
						}
					}
				});
			},

			// 复制分享链接
			copyShareLink() {
				const shareUrl = `作品详情: ${this.productInfo.title}`;
				uni.setClipboardData({
					data: shareUrl,
					success: () => {
						uni.showToast({
							title: '链接已复制',
							icon: 'success'
						});
					}
				});
			},

			// 点击左侧用户区域跳转
			goToAbout() {
				uni.switchTab({
					url: `/subpkg-library/pages/visitor-home/${this.productInfo}`
				});
			},
			// 点击右侧分享
			handleShare() {
				uni.showShareMenu();
				console.log('触发分享');
			},
			// 切换布局
			changeLayout(layout) {
				this.currentLayout = layout;
				// 提示当前的布局模式
				let modeText = '';
				switch (layout) {
					case 'large':
						modeText = '已切换为大图展示';
						break;
					case 'small':
						modeText = '已切换为小图展示';
						break;
					case 'mixed':
						modeText = '已切换为混合展示';
						break;
					case 'long':
						modeText = '已切换为长图展示';
						break;
				}
				uni.showToast({
					title: modeText,
					icon: 'none',
					duration: 1500
				});
			},

			// 切换到下一个布局
			toggleLayout() {
				const layouts = ['large', 'small', 'mixed', 'long'];
				const currentIndex = layouts.indexOf(this.currentLayout);
				const nextIndex = (currentIndex + 1) % layouts.length;
				this.changeLayout(layouts[nextIndex]);
			},
			// 获取当前布局图标
			getCurrentLayoutIcon() {
				switch (this.currentLayout) {
					case 'large':
						return '/static/layout/大图.png';
					case 'small':
						return '/static/layout/小图.png';
					case 'mixed':
						return '/static/layout/混合.png';
					case 'long':
						return '/static/layout/长图.png';
					default:
						return '/static/layout/大图.png';
				}
			},

			// 处理图片加载完成
			imageLoaded(index) {
				this.$set(this.loadedImages, index, true);
			},

			// 图片预览
			previewImage(current, index) {
				// 构建完整的媒体URL数组，包括图片和视频
				const urls = this.productInfo.imageUrls.map(item => {
					if (this.isVideo(item)) {
						return this.ossUrl + item;
					} else {
						return this.buildOssImageUrl(item);
					}
				});

				// 跳转到新的图片预览页面，传递 productId 参数
				uni.navigateTo({
					url: `/subpkg-others/pages/works-detail/image-preview?urls=${encodeURIComponent(JSON.stringify(urls))}&index=${index}&productId=${this.productId}&isOwner=${this.isOwner}`
				});
			},
			// 文档预览
			openDocument(fileUrl) {
				// 显示加载提示
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				// 构建完整的文档URL
				const fullUrl = this.ossUrl + fileUrl;

				// 下载文件
				uni.downloadFile({
					url: fullUrl,
					success: (res) => {
						// 隐藏加载提示
						uni.hideLoading();

						if (res.statusCode === 200) {
							// 打开文档
							uni.openDocument({
								filePath: res.tempFilePath,
								showMenu: true,
								success: (res) => {
									console.log('文档打开成功');
								},
								fail: (err) => {
									console.error('文档打开失败', err);
									uni.showToast({
										title: '文档打开失败',
										icon: 'none'
									});
								}
							});
						} else {
							uni.showToast({
								title: '文件下载失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						// 隐藏加载提示
						uni.hideLoading();

						console.error('文件下载失败', err);
						uni.showToast({
							title: '文件下载失败',
							icon: 'none'
						});
					}
				});
			},
			// 滚动到底部触发
			onScrollToLower() {
				this.scrolledToBottom = true;
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

			// 编辑标题
			async editTitle() {
				if (!this.isOwner) {
					uni.showToast({
						title: '只有作品所有者可以编辑',
						icon: 'none'
					});
					return;
				}
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				
				
				this.titleEditConfig = {
					title: '编辑标题',
					placeholder: '请输入作品标题',
					value: this.productInfo.title || '',
					type: 'text'
				};
				this.showTitleEditPopup = true;

			},

			// 关闭标题编辑弹窗
			closeTitleEditPopup() {
				this.showTitleEditPopup = false;
			},

			// 保存标题
			handleSaveTitle(value) {
				if (!value || !value.trim()) {
					uni.showToast({
						title: '标题不能为空',
						icon: 'none'
					});
					return;
				}

				this.updateWork({
					title: value.trim()
				});
				this.showTitleEditPopup = false;
			},

			// 编辑标签
			async editTags() {
				if (!this.isOwner) {
					uni.showToast({
						title: '只有作品所有者可以编辑',
						icon: 'none'
					});
					return;
				}
				
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				
				this.editTagsList = [...(this.productInfo.tags || [])];
				this.getUserTags();
				this.showTagPopup = true;
			},

			// 关闭标签弹窗
			closeTagPopup() {
				this.showTagPopup = false;
			},

			// 保存标签
			confirmTags() {
				if (this.tagInput.trim()) {
					this.addTag();
				}
				this.updateWork({
					addTags: this.editTagsList
				});
				this.showTagPopup = false;
			},

			// 添加标签
			addTag() {
				const tag = this.tagInput.trim();
				if (!tag) return;

				if (!this.editTagsList.includes(tag)) {
					this.editTagsList.push(tag);
				} else {
					uni.showToast({
						title: '标签已存在',
						icon: 'none'
					});
				}
				this.tagInput = '';
			},

			// 切换标签
			toggleTag(tag) {
				const index = this.editTagsList.findIndex(t => t.tagName === tag.tagName);
				if (index > -1) {
					this.editTagsList.splice(index, 1);
				} else {
					this.editTagsList.push(tag);
				}
			},

			// 移除标签
			removeTag(index) {
				this.editTagsList.splice(index, 1);
			},

			// 管理标签
			manageTags() {
				uni.navigateTo({
					url: '/subpkg-library/pages/tags/edit'
				});
			},

			// 获取用户标签
			async getUserTags() {
				const userId = uni.getStorageSync("teamOwnerId")
				console.log("userId",uni.getStorageSync("teamOwnerId"))
				let req ={
					userId:this.isTeamMode ?  uni.getStorageSync("teamOwnerId"): ''
				}
				const {
					data,
					code
				} = await this.$request.get(`/wechat/tag/list`,req);
				if (code == 200) {
					this.myTags = data;
				}
			},

			// 编辑描述
			editDescription() {
				if (!this.isOwner) {
					uni.showToast({
						title: '只有作品所有者可以编辑',
						icon: 'none'
					});
					return;
				}
				this.editDescriptionText = this.productInfo.description || '';
				this.showDescPopup = true;
			},

			// 保存描述
			saveDescription() {
				this.updateWork({
					description: this.editDescriptionText
				});
				this.showDescPopup = false;
			},

			// 更新作品
			async updateWork(updatedFields) {
				uni.showLoading({
					title: '保存中...',
					mask: true
				});

				try {
					const params = {
						id: this.productId,
						title: this.productInfo.title,
						description: this.productInfo.description,
						coverUrl: this.productInfo.coverUrl,
						images: this.productInfo.imageUrls,
						addTags: this.productInfo.tags,
						workType: this.productInfo.workType || 0,
						teamId: this.productInfo.teamId
					};

					// 合并更新的字段
					Object.assign(params, updatedFields);

					const res = await this.$request.put(`/wechat/works/editWorks`, params);

					if (res.code == 200) {
						uni.showToast({
							title: '修改成功',
							icon: 'success',
							duration: 1500
						});
						// 刷新作品详情
						this.loadProductDetail();
					} else {
						uni.showToast({
							title: res.msg || '修改失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('修改作品失败:', error);
					uni.showToast({
						title: '修改失败',
						icon: 'none'
					});
				} finally {
					uni.hideLoading();
				}
			}
		},
		// 微信小程序分享功能
		onShareAppMessage() {
			return {
				title: this.productInfo.title || '我的作品',
				path: `/subpkg-others/pages/works-detail/detail?id=${this.productId}&isTeamMode=${this.isTeamMode}&fromShare=1`,
				imageUrl: this.getShareImageUrl()
			};
		},
		onShareTimeline() {
			return {
				title: this.productInfo.title || '我的作品',
				query: `id=${this.productId}&isTeamMode=${this.isTeamMode}&fromShare=1`,
				imageUrl: this.getShareImageUrl()
			};
		}
	}
</script>

<style lang="scss" scoped>
	/* 全局容器 */
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #ffffff;
	}

	/* 加载状态 */
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f8f8f8;
	}

	.loading-text {
		font-size: 28rpx;
		color: #999999;
	}

	/* 1. 头部样式 */
	.header {
		padding: 20rpx 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		z-index: 10;
	}

	.header-left {
		display: flex;
		flex-direction: column;
	}

	/* 标题样式（可点击编辑） */
	.title {
		font-size: 36rpx;
		font-weight: 500;
		color: #333;
		margin-bottom: 10rpx;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.title:active {
		color: #ff7a22;
		transform: scale(0.98);
	}

	/* 标签容器样式 */
	.tags-container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;
	}

	/* 标签样式（与创建页一致） */
	.tag {
		background: #f0f0f0;
		padding: 4rpx 12rpx;
		border-radius: 8rpx;
		font-size: 24rpx;
		color: #666;
		margin-right: 10rpx;
		margin-bottom: 6rpx;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tag:active {
		background: #e0e0e0;
		transform: scale(0.95);
	}

	.header-right {
		padding-top: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 16rpx;
	}

	/* 编辑按钮样式 */
	.edit-btn {
		padding: 8rpx 16rpx;
		background-color: #f5f5f5;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.edit-btn:active {
		opacity: 0.8;
		transform: scale(0.95);
	}

	.edit-text {
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
	}

	.icon-menu {
		font-size: 40rpx;
		color: #333;
	}

	/* 2. 内容区域样式 */
	.content-area {
		flex: 1;
		width: 100%;
		padding-bottom: 140rpx;
		transition: all 0.3s ease;
	}

	/* 排版切换按钮样式 */
	.layout-toggle-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12rpx;
		background-color: rgba(245, 245, 245, 0.8);
		border-radius: 50%;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		cursor: pointer;
		user-select: none;
		transition: all 0.3s ease;
		animation: fadeIn 0.3s ease-out;
		backdrop-filter: blur(10rpx);
	}

	.layout-toggle-btn:active {
		opacity: 0.8;
		transform: scale(0.95);
	}

	.toggle-text {
		font-size: 24rpx;
		color: #ff7a22;
		font-weight: 500;
		margin-right: 12rpx;
	}

	/* 布局图标容器 */
	.toggle-icon {
		width: 32rpx;
		height: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 混合布局图标样式 */
	.mixed-icon {
		width: 32rpx;
		height: 32rpx;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 4rpx;
		animation: fadeIn 0.3s ease-out;
	}

	.mixed-icon .grid-item {
		width: 12rpx;
		height: 12rpx;
		background-color: #ff7a22;
		border-radius: 2rpx;
	}

	/* 大图布局图标样式 */
	.large-icon {
		width: 32rpx;
		height: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fadeIn 0.3s ease-out;
	}

	.large-icon .single-image {
		width: 28rpx;
		height: 32rpx;
		background-color: #ff7a22;
		border-radius: 2rpx;
	}

	/* 动画效果 */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* 内容区域样式 */
	.content-area {
		flex: 1;
		width: 100%;
		padding-bottom: 140rpx;
		transition: all 0.3s ease;
	}

	/* 大图布局样式 */
	.content-area.large-layout {
		background-color: #fff;
		display: block;
	}

	/* 大图布局的媒体项 - 单张平铺 */
	.media-item-large {
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 12rpx;
		padding: 0 15rpx;
		margin-bottom: 5rpx;
	}

	/* 大图布局图片容器 */
	.image-wrapper-large {
		width: 100%;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 大图布局图片 - 使用 widthFix 模式 */
	.detail-img-large {
		width: 100%;
		display: block;
		opacity: 0;
		transition: opacity 0.5s ease-in-out, transform 0.5s ease-out;
		transform: scale(0.95);
	}

	.detail-img-large.img-loaded {
		opacity: 1;
		transform: scale(1);
	}

	/* 大图布局视频 */
	.detail-video-large {
		width: 100%;
		height: 400rpx;
		background-color: #000;
	}

	/* 大图布局文档 */
	.document-wrapper-large {
		width: 100%;
		height: 400rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
	}

	.document-preview-large {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.document-icon-large {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 12rpx;
	}

	.document-name-large {
		font-size: 24rpx;
		color: #666;
		max-width: 80%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
	}

	/* 大图布局图片加载动画 */
	.image-loading-large {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}

	/* 小图展示布局样式 */
	.content-area.small-layout {
		background-color: #fff;
		padding: 2rpx;
	}

	.small-layout-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		width: 100%;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	/* 小图布局的媒体项 */
	.media-item-small {
		width: calc(50% - 1rpx);
		margin-bottom: 2rpx;
		margin-right: 2rpx;
		background-color: #fff;
		box-shadow: none;
		transition: all 0.3s ease;
		padding: 0;
		box-sizing: border-box;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		flex-shrink: 0;
	}

	/* 移除最后一列的右边距 */
	.media-item-small:nth-child(2n) {
		margin-right: 0;
	}

	/* 小图布局图片容器 */
	.image-wrapper-small {
		width: 100%;
		height: 100%;
		overflow: hidden;
		min-height: 100rpx;
	}

	/* 小图布局图片 */
	.detail-img-small {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		opacity: 0;
		transition: opacity 0.5s ease-in-out, transform 0.5s ease-out;
		transform: scale(0.95);
	}

	.detail-img-small.img-loaded {
		opacity: 1;
		transform: scale(1);
	}

	/* 小图布局视频 */
	.detail-video-small {
		width: 100%;
		height: 100%;
		background-color: #000;
		transition: all 0.3s ease;
		object-fit: cover;
	}

	/* 小图布局文档 */
	.document-wrapper-small {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
		overflow: hidden;
		border-radius: 8rpx;
	}

	.document-preview-small {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.document-icon-small {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 6rpx;
	}

	.document-name-small {
		font-size: 16rpx;
		color: #666;
		max-width: 90%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
	}

	/* 小图布局图片加载动画 */
	.image-loading-small {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
	}

	/* 长图展示布局样式 */
	.content-area.long-layout {
		background-color: #fff;
		padding: 0;
	}

	.long-layout-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	/* 长图布局的媒体项 */
	.media-item-long {
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 0;
		overflow: hidden;
		border-radius: 0;
		box-shadow: none;
	}

	/* 长图布局图片容器 */
	.image-wrapper-long {
		width: 100%;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 长图布局图片 - 使用 widthFix 模式 */
	.detail-img-long {
		width: 100%;
		display: block;
		opacity: 0;
		transition: opacity 0.5s ease-in-out, transform 0.5s ease-out;
		transform: scale(0.95);
	}

	.detail-img-long.img-loaded {
		opacity: 1;
		transform: scale(1);
	}

	/* 长图布局视频 */
	.detail-video-long {
		width: 100%;
		height: 300rpx;
		background-color: #000;
		border-radius: 8rpx;
	}

	/* 长图布局文档 */
	.document-wrapper-long {
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-radius: 8rpx;
	}

	.document-preview-long {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.document-icon-long {
		width: 60rpx;
		height: 60rpx;
		margin-bottom: 10rpx;
	}

	.document-name-long {
		font-size: 22rpx;
		color: #666;
		max-width: 80%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
	}

	/* 长图布局图片加载动画 */
	.image-loading-long {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
	}

	/* 混合布局容器 */
	.mixed-layout-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		width: 100%;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	/* 混合布局样式 */
	.content-area.mixed-layout {
		background-color: #fff;
		padding: 2rpx;
	}

	.content-area.mixed-layout .media-item {
		width: calc(50% - 1rpx);
		margin-bottom: 2rpx;
		margin-right: 2rpx;
		background-color: #fff;
		box-shadow: none;
		transition: all 0.3s ease;
		padding: 0;
		box-sizing: border-box;
		height: 300rpx;
		/* 固定高度，比小图布局高 */
		overflow: hidden;
		flex-shrink: 0;
	}

	/* 移除最后一列的右边距 */
	.content-area.mixed-layout .media-item:nth-child(2n) {
		margin-right: 0;
	}

	.content-area.mixed-layout .detail-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		opacity: 0;
		transition: opacity 0.5s ease-in-out, transform 0.5s ease-out;
		transform: scale(0.95);
	}

	.content-area.mixed-layout .detail-img.img-loaded {
		opacity: 1;
		transform: scale(1);
	}

	.content-area.mixed-layout .detail-video {
		width: 100%;
		height: 100%;
		background-color: #000;
		transition: all 0.3s ease;
		object-fit: cover;
	}

	.media-item {
		transition: all 0.3s ease;
	}

	.media-item:active {
		transform: scale(0.98);
		opacity: 0.9;
	}

	/* 混合布局文档预览样式 */
	.document-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
		overflow: hidden;
		border-radius: 8rpx;
	}

	.document-preview {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.document-icon {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 12rpx;
	}

	.document-name {
		font-size: 24rpx;
		color: #666;
		max-width: 80%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
	}

	/* 3. 底部栏样式 */
	.footer-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.user-info {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #eee;
		margin-right: 20rpx;
	}

	.user-text {
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
	}

	.edit-link {
		font-size: 24rpx;
		color: #999;
		display: flex;
		align-items: center;
	}

	.arrow {
		margin-left: 6rpx;
		font-size: 20rpx;
	}

	.action-icons {
		display: flex;
		align-items: center;
	}

	.icon-btn {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
	}

	/* 简单的 CSS 模拟图标，实际建议用 image 或 uni-icons */
	.hexagon-shape {
		width: 30rpx;
		height: 30rpx;
		border: 4rpx solid #333;
		transform: rotate(45deg);
	}

	.share-icon {
		width: 40rpx;
		height: 40rpx;
	}

	/* 加载动画样式 */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 160rpx 0;
		flex-grow: 1;
	}

	.loading-spinner {
		width: 60rpx;
		height: 60rpx;
		border: 6rpx solid #f3f3f3;
		border-top: 6rpx solid #ff7a22;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 20rpx;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.loading-text {
		font-size: 28rpx;
		color: #999;
	}

	/* 图片懒加载相关样式 */
	.image-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		min-height: 100rpx;
	}

	/* 图片加载动画 */
	.image-loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
	}

	.loading-dots {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}

	.loading-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #ff7a22;
		animation: loading-pulse 1.4s infinite ease-in-out both;
	}

	.loading-dot:nth-child(1) {
		animation-delay: -0.32s;
	}

	.loading-dot:nth-child(2) {
		animation-delay: -0.16s;
	}

	@keyframes loading-pulse {

		0%,
		80%,
		100% {
			transform: scale(0);
			opacity: 0.8;
		}

		40% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* 大图布局的图片加载样式 */
	.content-area.large-layout .image-loading {
		background-color: #f5f5f5;
	}

	.content-area.large-layout .loading-dot {
		background-color: #ff7a22;
	}

	/* 作品简介样式 */
	.work-description {
		padding: 30rpx 40rpx;
		background-color: #fff;
	}

	.description-text {
		font-size: 28rpx;
		color: #666;
		line-height: 1.8;
		white-space: pre-wrap;
		text-align: justify;
	}

	/* 大图布局下的简介样式 */
	.content-area.large-layout .work-description {
		background-color: #fff;
	}

	.content-area.large-layout .description-text {
		color: #666;
	}

	/* 底部提示样式 */
	.bottom-tip {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 40rpx 0;
		background-color: #fff;
		animation: fadeIn 0.5s ease-out;
	}

	.tip-text {
		font-size: 28rpx;
		color: #999;
		text-align: center;
	}

	/* 大图布局下的底部提示样式 */
	.content-area.large-layout .bottom-tip {
		background-color: #fff;
	}

	.content-area.large-layout .tip-text {
		color: #fff;
	}

	/* 弹窗样式 */
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
		padding: 20rpx 30rpx 60rpx;
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
		margin-bottom: 40rpx;
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

	.popup-list {
		margin-top: 20rpx;
	}

	.popup-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.p-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

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

	/* 简介弹窗样式 */
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

	/* 布局切换选择器样式 */
	.layout-selector {
		position: relative;
		display: flex;
		align-items: center;
		    top: 25rpx;
	}

	.layout-option {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12rpx;
	}

	.layout-option.active {
		background-color: #fff;
	}

	.layout-icon-image {
		width: 48rpx;
		height: 48rpx;
	}
</style>
