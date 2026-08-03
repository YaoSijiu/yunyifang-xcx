<template>
	<view class="collection-detail">
		<!-- 标签栏 -->
		<view class="tag-tabs-container">
			<scroll-view class="tag-tabs" scroll-x="true" show-scrollbar="false" enable-flex="true"
				scroll-with-animation="true" :style="{ cursor: 'grab' }" @mousedown="handleMouseDown"
				@mousemove="handleMouseMove" @mouseup="handleMouseUp" @mouseleave="handleMouseUp"
				:scroll-into-view="scrollToId">
				<view class="tab-content">
					<view class="tab-item" @click="switchTag('全部', 0)" id="tab_0">
						<text :class="{ active: currentTag === '全部' }">全部</text>
						<view class="badge" :style="{ backgroundColor: currentTag === '全部' ? '#333' : '#999' }">
							{{ tagsNum['全部'] || allWorks.length }}
						</view>
						<image v-if="currentTag === '全部'" class="yellow-underline" src="/static/common/选中条.png" />
					</view>

					<!-- 动态标签 -->
					<view class="tab-item" v-for="(count, tag) in tagsNum" :key="tag" v-if="tag !== '全部'"
						@click="switchTag(tag, getTagIndex(tag) + 1)" :id="'tab_' + (getTagIndex(tag) + 1)">
						<text :class="{ active: currentTag === tag }"> {{ tag }}</text>
						<view class="badge" :style="{ backgroundColor: currentTag === tag ? '#333' : '#999' }">
							{{ count }}
						</view>
						<image v-if="currentTag === tag" class="yellow-underline" src="/static/common/选中条.png" />
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 加载动画 -->
		<view v-if="loading" class="loading-container">
			<view class="loading-spinner"></view>
			<text class="loading-text">加载中...</text>
		</view>

		<!-- 主要内容区域 - 使用 v-show 切换 -->
		<!-- 全部 tab -->
		<view v-if="!loading" v-show="currentTagIndex === 0">
			<view v-if="allWorks.length > 0" class="work-grid">
				<view class="work-item" v-for="(item, index) in allWorks" :key="item.id || index"
					:class="['work-item', 'item-' + (index % 10)]" :data-item="JSON.stringify(item)">

					<view class="img-box-wrapper">
						<view class="img-box" @click="goToWorkDetail(JSON.parse(JSON.stringify(item)))">
							<image :src="ossUrl +getFirstImageUrl(item.imageUrls)+'?x-oss-process=image/resize,w_750/quality,q_65/format,webp'" class="work-img"
								mode="aspectFill">
							</image>
						</view>
						<view v-if="item.isTop == 1" class="top-tag">
							<text class="top-tag-text">置顶</text>
						</view>
						<!-- 悬浮在图片右上角的更多选项 -->
						<view class="more-options" @click.stop="showWorkOptions(JSON.parse(JSON.stringify(item)))">
							<view class="dot-column">
								<view class="dot"></view>
								<view class="dot"></view>
								<view class="dot"></view>
							</view>
						</view>
					</view>

					<view class="info-area" @click="goToWorkDetail(JSON.parse(JSON.stringify(item)))">
						<view class="collection-info">
							<text class="work-title">{{ item.title }}</text>
						</view>

						<view class="work-tags">
							<view class="tag-item" v-for="(workTag, tagIndex) in (item.tagsList)" :key="tagIndex">
								{{ workTag }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="empty-state">
				<image src="/static/yunyiku/没有.png" class="empty-img"></image>
				<text class="empty-text">该分类下暂无作品</text>
			</view>
		</view>

		<!-- 动态 tag tab -->
		<view v-if="!loading" v-for="(count, tag) in tagsNum" :key="tag" v-show="currentTag === tag">
			<view v-if="tag !== '全部'">
				<view v-if="getWorksByTag(tag).length > 0" class="work-grid">
					<view class="work-item" v-for="(item, itemIndex) in getWorksByTag(tag)" :key="item.id || itemIndex"
						:class="['work-item', 'item-' + (itemIndex % 10)]" :data-item="JSON.stringify(item)">

						<view class="img-box-wrapper">
							<view class="img-box" @click="goToWorkDetail(JSON.parse(JSON.stringify(item)))">
								<image :src="ossUrl +getFirstImageUrl(item.imageUrls)" class="work-img"
									mode="aspectFill">
								</image>
							</view>
							<view v-if="item.isTop == 1" class="top-tag">
								<text class="top-tag-text">置顶</text>
							</view>
							<!-- 悬浮在图片右上角的更多选项 -->
							<view class="more-options" @click.stop="showWorkOptions(JSON.parse(JSON.stringify(item)))">
								<view class="dot-column">
									<view class="dot"></view>
									<view class="dot"></view>
									<view class="dot"></view>
								</view>
							</view>
						</view>

						<view class="info-area" @click="goToWorkDetail(JSON.parse(JSON.stringify(item)))">
							<view class="collection-info">
								<text class="work-title">{{ item.title }}</text>
							</view>

							<view class="work-tags">
								<view class="tag-item" v-for="(workTag, tagIndex) in (item.tagsList)" :key="tagIndex">
									{{ workTag }}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="empty-state">
					<image src="/static/yunyiku/没有.png" class="empty-img"></image>
					<text class="empty-text">该分类下暂无作品</text>
				</view>
			</view>
		</view>
		<!-- 底部简单的用户信息 (替代 share-btn) -->
		<!-- <view class="footer-info">
			<view class="user-left">
				<image :src="ossUrl+userInfo.avatarUrl" class="avatar"></image>
				<view class="user-text">
					<text class="name">{{userInfo.nickName}}</text>
					<text class="desc">关于 ></text>
				</view>
			</view>
			<view class="share-icon-small" @click="shareCollection">
				<image src="/static/common/分享.png" class="share-img"></image>
			</view>
		</view> -->
		<view class="collection-action-bar">
			<view class="action-user" @click="goToVisitorHome">
				<image class="action-avatar" :src="userAvatarUrl" mode="aspectFill"></image>
				<view class="action-user-info">
					<text class="action-user-name">{{ userInfo.nickName || '未命名用户' }}</text>
				</view>
			</view>

			<view class="action-icons">
				<view class="action-btn" v-if="!hideManageActions" @click.stop="handleEditCollection">
					<image class="action-icon" src="/static/tabbar/发布.png" mode="aspectFit"></image>
				</view>
				<view class="action-btn" v-if="!hideManageActions" @click.stop="showCollectionOptions">
					<image class="action-icon" src="/static/common/设置.png" mode="aspectFit"></image>
				</view>
				<button class="action-btn action-share-btn" open-type="share" @click.stop="handleCollectionShareClick">
					<image class="action-icon" src="/static/common/分享.png" mode="aspectFit"></image>
				</button>
			</view>
		</view>

		<view class="work-popup-mask" v-if="showCollectionPopup" @click="closeCollectionPopup" @touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">作品集管理</view>

				<view class="wp-list">
					<view class="wp-item" v-if="isOwner" @click="handleEditCollection">
						<image src="/static/icon/管理作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">管理作品集</text>
					</view>
					<view class="wp-item" @click="handleDownloadCollection">
						<image src="/static/icon/下载.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">下载</text>
					</view>
					<view class="wp-item" v-if="isOwner" @click="handleDeleteCollection">
						<image src="/static/icon/删除作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">删除作品集</text>
					</view>
				</view>

				<view class="wp-section-title">分享</view>
				<view class="wp-list">
					<button class="wp-item share-btn-reset" open-type="share" @click="handleCollectionShareClick">
						<image src="/static/icon/转发给朋友.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">转发给朋友</text>
					</button>
				</view>
			</view>
		</view>

		<view class="work-popup-mask" v-if="showWorkPopup" @click="closeWorkPopup" @touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">作品管理</view>

				<view class="wp-list">
					<view class="wp-item" v-if="isOwner" @click="handleEditWork">
						<image src="/static/icon/管理作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">管理作品</text>
					</view>
					<view class="wp-item" v-if="isOwner" @click="handleToggleWorkTop">
						<image src="/static/icon/推荐.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">{{ currentWorkItem && currentWorkItem.isTop == 1 ? '取消置顶' : '置顶作品' }}</text>
					</view>
					<view class="wp-between" v-if="isOwner" @click="handleVisableWork">
						<view class="wp-item">
							<image
								:src="currentWorkItem && currentWorkItem.hide === '1' ?'/static/icon/公开.svg':'/static/icon/仅自己可见.svg'"
								class="wp-icon" mode="aspectFit"></image>
							<text
								class="wp-text">{{ currentWorkItem && currentWorkItem.hide === '1' ? '设为公开' : '设为仅自己可见' }}</text>
						</view>
						<view class="wp-right">
							{{ currentWorkItem && currentWorkItem.hide === '1' ? '所有人可见' : '当前访客可见' }}
						</view>
					</view>
					<view class="wp-item" v-if="isOwner" @click="handleDeleteWork">
						<image src="/static/icon/删除作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">删除作品</text>
					</view>
					<view class="wp-item" @click="handleDownloadWork">
						<image src="/static/icon/下载.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">下载</text>
					</view>
				</view>

				<view class="wp-section-title">分享</view>
				<view class="wp-list">
					<button class="wp-item share-btn-reset" open-type="share" @click="closeWorkPopup">
						<image src="/static/icon/转发给朋友.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">转发给朋友</text>
					</button>
				</view>
			</view>
		</view>

		<!-- 下载进度条 -->
		<view class="download-progress" v-if="progress > 0">
			<view class="progress-container">
				<view class="progress-header">
					<text class="progress-title">{{ stageText }}</text>
					<text class="progress-percent">{{ progress }}%</text>
				</view>
				<view class="progress-bar">
					<view class="progress-fill" :style="{ width: progress + '%' }"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import env from '@/config/env.js'
	export default {
		// 团队操作权限常量
		TEAM_OPERATE_ROLES: {
			ADD_MEMBER: 'canAddMember',
			ADD_SEATS: 'canAddSeats',
			MANAGE_WORKS: 'canManageWorks',
			MANAGE_COLLECTIONS: 'canManageCollections'
		},
		data() {
			return {
				statusBarHeight: 20,
				userInfo: {},
				ossUrl: env.aliyunUrl,
				title: '作品集详情',
				currentTag: '全部', // 当前选中的标签
				currentTagIndex: 0, // 当前标签索引，用于swiper
				tagsNum: {},
				loading: false, // 加载状态
				showWorkPopup: false,
				showCollectionPopup: false,
				currentWorkItem: null,
				progress: 0, // 下载进度
				stageText: '', // 打包状态文字
				taskId: '', // 后台任务ID
				userId: null,
				isTeamMode: false, // 是否为团队模式
				isShareAccess: false,
				collectId: null,
				scrollToId: '', // 用于滚动到指定标签
				// 鼠标拖拽相关
				isDragging: false,
				startX: 0,
				scrollLeft: 0,
				works: [{
						id: 1,
						title: '植物书包装设计',
						img: '/static/home/示例.png',
						tags: ['平面设计', '包装设计']
					},
					{
						id: 2,
						title: '凤梨酥包装设计',
						img: '/static/home/示例.png',
						tags: ['平面设计', '包装设计', '食品设计']
					},
					{
						id: 3,
						title: '展览空间设计',
						img: '/static/home/示例.png',
						tags: ['展览设计', '空间设计']
					},
					{
						id: 4,
						title: '粽子包装设计',
						img: '/static/home/示例.png',
						tags: ['平面设计', '包装设计', '食品设计']
					},
					{
						id: 5,
						title: '现代简约室内设计',
						img: '/static/home/示例.png',
						tags: ['室内设计', '家装设计']
					},
					{
						id: 6,
						title: '办公室工装设计',
						img: '/static/home/示例.png',
						tags: ['工装设计', '室内设计']
					},
					{
						id: 7,
						title: '艺术展览策划',
						img: '/static/home/示例.png',
						tags: ['展览设计', '策划设计']
					},
					{
						id: 8,
						title: '酒店室内设计',
						img: '/static/home/示例.png',
						tags: ['室内设计', '工装设计', '酒店设计']
					}
				]
			};
		},
		onLoad(options) {
			// 获取状态栏高度
			const windowInfo = uni.getWindowInfo();
			this.statusBarHeight = windowInfo.statusBarHeight;
			this.userId = uni.getStorageSync('userInfo')?.id;
			this.isShareAccess = options.fromShare === '1';
			// 处理团队模式参数
			if (options.isTeamMode !== undefined) {
				this.isTeamMode = options.isTeamMode === 'true';
			} else {
				// 检测团队模式
				this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
			}
			// 设置页面标题
			if (options.id) {
				this.collectId = options.id
				this.getCollectionsInfo(options.id)
			}

			// 初始化页面数据
			this.initPageData();

			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			});
			// #endif
		},
		onShareAppMessage(res) {
			if (res.from === 'button' && this.currentWorkItem) {
				const work = this.currentWorkItem;
				if (work.hide === '1') {
					uni.showToast({
						title: '该作品仅自己可见，无法分享给他人',
						icon: 'none'
					});
					return false;
				}
				return {
					title: work.title || '我的作品',
					path: `/subpkg-others/pages/works-detail/detail?id=${work.id}&isTeamMode=${this.isTeamMode}&fromShare=1`,
					imageUrl: this.buildShareImageUrl(this.getFirstImageUrl(work.imageUrls)) || '/static/yunyiku/bg.png'
				};
			}
			return {
				title: this.getCollectionShareTitle(),
				path: `/subpkg-library/pages/collection/detail?id=${this.collectId}&title=${encodeURIComponent(this.getCollectionShareTitle())}&isTeamMode=${this.isTeamMode}&fromShare=1`,
				imageUrl: this.getCollectionShareImage()
			};
		},
		onShareTimeline() {
			return {
				title: this.getCollectionShareTitle(),
				query: `id=${this.collectId}&title=${encodeURIComponent(this.getCollectionShareTitle())}&isTeamMode=${this.isTeamMode}&fromShare=1`,
				imageUrl: this.getCollectionShareImage()
			};
		},
		computed: {
			isOwner() {
				if (!this.userInfo.id || !this.userId) {
					return false;
				}
				return this.userInfo.id == this.userId;
			},
			hideManageActions() {
				return this.isShareAccess && !this.isOwner;
			},
			userAvatarUrl() {
				if (!this.userInfo.avatarUrl) {
					return '/static/yunyiku/avatar.png';
				}
				if (/^https?:\/\//.test(this.userInfo.avatarUrl)) {
					return this.userInfo.avatarUrl;
				}
				return this.ossUrl + this.userInfo.avatarUrl;
			},
			// 所有有效作品
			allWorks() {
				// 首先确保works是数组
				const validWorks = Array.isArray(this.works) ? this.works : [];
				// 过滤出有效的对象元素
				let filteredValidWorks = validWorks.filter(item => {
					return item && typeof item === 'object';
				});

				// 根据是否是所有者过滤隐藏的作品
				if (!this.isOwner) {
					filteredValidWorks = filteredValidWorks.filter(item => item.hide === '0');
				}

				return filteredValidWorks;
			},
			// 根据当前标签过滤作品，确保只返回有效的对象
			filteredWorks() {
				// 首先确保works是数组
				const validWorks = Array.isArray(this.works) ? this.works : [];
				// 过滤出有效的对象元素
				let filteredValidWorks = validWorks.filter(item => {
					return item && typeof item === 'object';
				});

				// 根据是否是所有者过滤隐藏的作品
				if (!this.isOwner) {
					filteredValidWorks = filteredValidWorks.filter(item => item.hide === '0');
				}

				if (this.currentTag === '全部') {
					console.log('filteredWorks - 返回所有有效作品', filteredValidWorks.length);
					return filteredValidWorks;
				}

				// 根据标签过滤并兼容tagsList和tags属性
			const result = filteredValidWorks.filter(item => {
				let workTags = item.tagsList || item.tags;
				// 解析tags字符串为数组
				if (typeof workTags === 'string') {
					try {
						workTags = JSON.parse(workTags);
					} catch (error) {
						console.error('解析tags失败:', error);
						workTags = [];
					}
				}
				return Array.isArray(workTags) && workTags.includes(this.currentTag);
			});

				console.log('filteredWorks - 返回过滤后的有效作品', result.length, '当前标签:', this.currentTag);
				return result;
			}
		},
		methods: {
			// 解析 imageUrls 字符串并获取第一张图片
			getFirstImageUrl(imageUrlsStr) {
				if (!imageUrlsStr) return '';

				try {
					// 1. 解析 JSON 字符串
					const urlsArray = JSON.parse(imageUrlsStr);

					// 2. 检查是否为数组且不为空
					if (Array.isArray(urlsArray) && urlsArray.length > 0) {
						// 3. 返回第一张图片的 URL
						return urlsArray[0];
					}

					return '';
				} catch (error) {
					console.error('解析 imageUrls 失败:', error, imageUrlsStr);

					// 如果 JSON 解析失败，尝试其他解析方式
					// 例如：处理 "[url1,url2,url3]" 这种格式（不带引号）
					if (typeof imageUrlsStr === 'string') {
						// 移除首尾的方括号
						const cleaned = imageUrlsStr.trim()
							.replace(/^\[/, '')
							.replace(/\]$/, '');

						// 按逗号分割
						const urls = cleaned.split(',').map(url => url.trim());

						if (urls.length > 0 && urls[0]) {
							return urls[0];
						}
					}

					return '';
				}
			},
			buildShareImageUrl(url) {
				if (!url) return '';
				if (/^https?:\/\//.test(url)) {
					return url;
				}
				return this.ossUrl + url;
			},
			getCollectionShareTitle() {
				return this.title || '我的作品集';
			},
			getCollectionShareImage() {
				const firstWork = this.allWorks[0];
				if (!firstWork) {
					return '/static/yunyiku/bg.png';
				}
				return this.buildShareImageUrl(this.getFirstImageUrl(firstWork.imageUrls)) || '/static/yunyiku/bg.png';
			},
			async getCollectionsInfo(id) {
				this.loading = true; // 开始加载，显示加载动画
				try {
					const {
						code,
						data
					} = await this.$request.get(`/wechat/works/findUserWorksCollectionsInfo/${id}`)
					if (code == 200) {
						const tagsNum = data['tagsNum'] || {}
						let works = data['works']
						const collectionName = data['name'] || data['title'] || this.title

						// 数据验证：确保works是数组且每个元素都是有效的对象
						if (!Array.isArray(works)) {
							works = []
							console.warn('获取到的works不是数组	', works)
						} else {
							// 过滤掉无效的作品项
							works = works.filter(item => item && typeof item === 'object')
							console.log('过滤后的有效作品项数量', works.length)
						}

						this.title = collectionName
						uni.setNavigationBarTitle({
							title: collectionName
						})
						this.tagsNum = tagsNum
						this.userInfo = {
							nickName: data['nickName'],
							avatarUrl: data['avatarUrl'],
							id: data['userId']
						}
						if (this.isOwner) {
							this.works = works
						} else {
							this.works = works.filter(item => item.hide == "0")
						}
					}
					console.log('获取到的结果集详情', data)
				} catch (error) {
					console.error('获取作品集详情失败', error)
					uni.showToast({
						title: '加载失败，请重试',
						icon: 'none'
					})
				} finally {
					setTimeout(() => {
						this.loading = false;
					}, 800) // 加载结束，隐藏加载动画
				}
			},
			// 获取标签索引
			getTagIndex(tag) {
				let index = 0
				for (const key in this.tagsNum) {
					if (key === tag) {
						return index
					}
					if (key !== '全部') {
						index++
					}
				}
				return 0
			},
			// 返回上一页
			goBack() {
				uni.navigateBack();
			},
			goToVisitorHome() {
				if (!this.userInfo.id) return;
				if (!this.isLoggedIn()) {
					this.showLoginModal();
					return;
				}
				uni.navigateTo({
					url: `/subpkg-library/pages/visitor-home?userId=${this.userInfo.id}&isTeamMode=${this.isTeamMode}`
				});
			},

			// 初始化页面数据
			initPageData() {
				// 后续可以在此处添加从服务器获取数据的逻辑
			},

			// 跳转到作品详情页
			goToWorkDetail(item) {
				// 跳转到作品详情页
				const shareParam = this.isShareAccess ? '&fromShare=1' : '';
				uni.navigateTo({
					url: `/subpkg-others/pages/works-detail/detail?id=${item.id}${shareParam}`
				});
			},

			// 切换标签
			switchTag(tag, index) {
				if (this.currentTag === tag) return;
				this.currentTag = tag;
				this.currentTagIndex = index;
				// 当切换到第一个标签或第三个及以后的标签时，执行标签栏的滚动操作
				if (index <=2 || index >= 2) {
					// 滚动到对应的标签
					this.$nextTick(() => {
						this.scrollToId = 'tab_' + index;
					});
				}
			},
			
			// 根据标签获取作品
			getWorksByTag(tag) {
				// 首先确保works是数组
				const validWorks = Array.isArray(this.works) ? this.works : [];
				// 过滤出有效的对象元素
				let filteredValidWorks = validWorks.filter(item => {
					return item && typeof item === 'object';
				});

				// 根据是否是所有者过滤隐藏的作品
				if (!this.isOwner) {
					filteredValidWorks = filteredValidWorks.filter(item => item.hide === '0');
				}

				// 根据标签过滤并兼容tagsList和tags属性
			const result = filteredValidWorks.filter(item => {
				let workTags = item.tagsList || item.tags;
				// 解析tags字符串为数组
				if (typeof workTags === 'string') {
					try {
						workTags = JSON.parse(workTags);
					} catch (error) {
						console.error('解析tags失败:', error);
						workTags = [];
					}
				}
				return Array.isArray(workTags) && workTags.includes(tag);
			});

				return result;
			},

			// 显示作品管理选项
			showWorkOptions(item) {
				this.currentWorkItem = item;
				this.showWorkPopup = true;
			},


			// 关闭作品弹窗
			closeWorkPopup() {
				this.showWorkPopup = false;
			},
			showCollectionOptions() {
				this.currentWorkItem = null;
				this.showCollectionPopup = true;
			},
			closeCollectionPopup() {
				this.showCollectionPopup = false;
			},
			handleCollectionShareClick() {
				this.currentWorkItem = null;
				this.closeCollectionPopup();
			},
			async handleEditCollection() {
				this.closeCollectionPopup();
				if (!this.collectId) return;
				if (!this.isOwner) {
					uni.showToast({
						title: '只有作品集所有者可以管理',
						icon: 'none'
					});
					return;
				}
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(this.$options.TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
					if (!ok) return;
				}
				uni.navigateTo({
					url: `/subpkg-library/pages/collection/create?id=${this.collectId}&title=${encodeURIComponent(this.title || '')}&workType=${this.isTeamMode ? 1 : 0}`
				});
			},
			handleDownloadCollection() {
				if (!this.collectId) return;
				this.closeCollectionPopup();
				this.downloadWorks('collection', this.collectId);
			},
			async handleDeleteCollection() {
				this.closeCollectionPopup();
				if (!this.collectId) return;
				if (!this.isOwner) {
					uni.showToast({
						title: '只有作品集所有者可以删除',
						icon: 'none'
					});
					return;
				}
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(this.$options.TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
					if (!ok) return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除该作品集吗？',
					success: async (modalRes) => {
						if (!modalRes.confirm) return;
						try {
							const res = await this.$request.delete(`/wechat/works/deleteWorkCollections/${this.collectId}`);
							if (res.code == 200) {
								uni.setStorageSync('homeCollectionsNeedRefresh', true);
								uni.showToast({
									title: '删除作品集成功',
									icon: 'none'
								});
								setTimeout(() => {
									uni.navigateBack();
								}, 800);
							}
						} catch (error) {
							console.error('删除作品集失败:', error);
							uni.showToast({
								title: '删除失败，请重试',
								icon: 'none'
							});
						}
					}
				});
			},

			// 编辑作品
			async handleEditWork() {
				console.log('点击编辑作品')
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(this.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				uni.navigateTo({
					url: `/subpkg-library/pages/works/create?id=${this.currentWorkItem.id}&title=${this.currentWorkItem.title}&workType=${this.isTeamMode ? 1 : 0}`
				});
			},
			async handleVisableWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(this.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				const newIsHide = this.currentWorkItem.hide === '1' ? '0' : '1';
				const actionText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
				const confirmText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
				uni.showModal({
					title: '提示',
					content: `确定要${actionText}吗？`,
					success: (modalRes) => {
						if (modalRes.confirm) {
							const params = {
								worksId: this.currentWorkItem.id,
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
										this.getCollectionsInfo(this.collectId)
									}
								})
						}
					}
				});
			},
			async handleToggleWorkTop() {
				if (!this.currentWorkItem || !this.collectId) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(this.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				const newIsTop = this.currentWorkItem.isTop == 1 ? 0 : 1;
				try {
					const params = {
						collectionId: this.collectId,
						workId: this.currentWorkItem.id,
						isTop: newIsTop,
						sort: 1
					}
					const res = await this.$request.put('/wechat/works/setCollectionWorkTop', params)
					if (res.code == 200) {
						uni.showToast({
							title: newIsTop === 1 ? '置顶成功' : '取消置顶成功',
							icon: 'success'
						});
						this.getCollectionsInfo(this.collectId)
					}
				} catch (error) {
					console.error('设置作品置顶失败:', error)
					uni.showToast({
						title: '操作失败，请重试',
						icon: 'none'
					})
				}
			},
			// 删除作品
			async handleDeleteWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(this.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除该作品吗？',
					success: async (modalRes) => {
						if (modalRes.confirm) {
							try {
								const res = await this.$request.delete(
									`/wechat/works/deleteWork/${this.currentWorkItem.id}`
								);

								if (res.code == 200) {
									// 从本地列表中删除
									const index = this.works.findIndex(work => work.id === this
										.currentWorkItem
										.id);
									if (index !== -1) {
										this.works.splice(index, 1);
									}

									// 更新标签列表
									this.updateTagsAfterDeletion();

									uni.showToast({
										title: '删除成功',
										icon: 'success'
									});
								}
							} catch (error) {
								console.error('删除失败:', error);
								uni.showToast({
									title: '删除失败，请重试',
									icon: 'none'
								});
							}
						}
					}
				});
			},

			// 下载作品
			handleDownloadWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				this.downloadWorks('work', this.currentWorkItem.id);
			},
			// 判断是否是电脑端
			isPC() {
				const deviceInfo = uni.getDeviceInfo();
				return deviceInfo.platform === 'windows' || deviceInfo.platform === 'mac';
			},

			// 判断是否已登录
			isLoggedIn() {
				const token = uni.getStorageSync('token');
				const userInfo = uni.getStorageSync('userInfo');
				return !!token && !!userInfo && !!userInfo.id;
			},
			showLoginModal() {
				uni.showModal({
					title: '提示',
					content: '请先登录',
					showCancel: false,
					confirmText: '去登录',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/subpkg-others/pages/login/index'
							});
						}
					}
				});
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
				this.progress = 0;
				this.stageText = '准备下载...';
				const totalFiles = filePaths.length;
				let downloadedFiles = 0;
				let savedFiles = 0;

				for (let i = 0; i < filePaths.length; i++) {
					const filePath = filePaths[i];
					const fullUrl = this.ossUrl + filePath;
					const fileType = this.getFileType(filePath);

					try {
						this.stageText = `下载中 (${i + 1}/${totalFiles})`;

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

						this.progress = Math.round((downloadedFiles / totalFiles) * 100);
					} catch (error) {
						console.error(`下载文件失败 ${filePath}:`, error);
						// 继续下载其他文件
					}
				}

				this.stageText = '下载完成';
				this.progress = 100;

				let toastMessage = `成功下载 ${downloadedFiles} 个文件`;
				if (savedFiles > 0) {
					toastMessage += `，其中 ${savedFiles} 个已保存到相册`;
				}

				uni.showToast({
					title: toastMessage,
					icon: 'none'
				});

				// 3秒后重置进度条
				setTimeout(() => {
					this.progress = 0;
					this.stageText = '';
				}, 3000);
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

			// 检查团队权限
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
			// 鼠标按下事件
			handleMouseDown(e) {
				this.isDragging = true;
				this.startX = e.clientX || e.touches[0].clientX;
				this.scrollLeft = e.currentTarget.scrollLeft;
				// 更改鼠标样式为拖拽状态
				e.currentTarget.style.cursor = 'grabbing';
			},
			// 鼠标移动事件
		handleMouseMove(e) {
			if (!this.isDragging) return;
			const x = e.clientX || e.touches[0].clientX;
			const walk = (x - this.startX) * 2; // 滚动速度
			e.currentTarget.scrollLeft = this.scrollLeft + walk;
			e.preventDefault(); // 防止默认行为
		},
			// 鼠标释放事件
			handleMouseUp(e) {
				this.isDragging = false;
				// 恢复鼠标样式
				if (e.currentTarget) {
					e.currentTarget.style.cursor = 'grab';
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	/* 隐藏所有滚动条 */
	::-webkit-scrollbar {
		display: none !important;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	* {
		scrollbar-width: none !important;
		-ms-overflow-style: none !important;
		overflow: -moz-scrollbars-none !important;
	}

	.collection-detail {
		min-height: 100vh;
		background: #f9f9f9;
		padding-bottom: 120rpx;
		display: flex;
		flex-direction: column;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.yellow-underline {
		position: absolute;
		left: 50%;
		bottom: 6rpx;
		width: 44rpx;
		height: 11rpx;
		transform: translateX(-50%);
	}

	/* 标签栏样式 */
	.tag-tabs-container {
		background: #fff;
		border-bottom: 1rpx solid #eee;
	}

	.tag-tabs {
		flex: 1;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.tag-tabs::-webkit-scrollbar {
		display: none !important;
	}

	.tab-content {
		display: inline-block;
		margin-right: 40rpx;
		padding-bottom: 10rpx;
		position: relative;
	}

	/* 移除重复的滚动条样式 */

	/* 工作网格区域 */
	// .work-grid {
	// 	flex: 1;
	// 	overflow: auto;
	// 	-webkit-overflow-scrolling: touch;
	// }

	// .work-grid::-webkit-scrollbar {
	// 	display: none !important;
	// }

	.tab-item {
		position: relative;
		font-size: 30rpx;
		color: #434343;
		padding: 14rpx 22rpx 21rpx;
		display: inline-block;
		margin: 0 10rpx;
	}

	.tab-item text {
		font-size: 30rpx;
		color: #434343;
	}

	.tab-item text.active {
		font-weight: 700;
		color: #1a1a1a;
	}

	.badge {
		display: inline-block;
		background-color: #333;
		color: #fff;
		font-size: 20rpx;
		padding: 2rpx 10rpx;
		border-radius: 20rpx;
		margin-left: 8rpx;
		vertical-align: middle;
	}

	.work-grid {
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: flex-start;
		padding-bottom: 120rpx;
		flex: 1;
		min-height: 400rpx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.work-item {
		width: 48%;
		background: #fff;
		border-radius: 16rpx;
		overflow: auto;
		padding-bottom: 20rpx;
		cursor: pointer;
		position: relative;
	}

	/* 图片包装器 */
	.img-box-wrapper {
		position: relative;
		height: 340rpx;
	}

	.img-box {
		height: 100%;
		background: #eee;
		overflow: hidden;
	}

	.work-img {
		width: 100%;
		height: 100%;
	}

	.top-tag {
		position: absolute;
		top: 16rpx;
		left: 0;
		background: linear-gradient(135deg, #ff7a22, #ff9547);
		padding: 10rpx 20rpx;
		border-radius: 0 16rpx 16rpx 0;
		box-shadow: 0 6rpx 16rpx rgba(255, 122, 34, 0.2);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-tag-text {
		font-size: 20rpx;
		font-weight: bold;
		color: #fff;
		line-height: 1;
	}

	/* 悬浮在图片右上角的更多选项（竖排三个点） */
	.more-options {
		position: absolute;
		top: 20rpx;
		right: 10rpx;
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		z-index: 10;
	}

	.more-options:active {
		opacity: 1;
	}

	/* 垂直排列三个小圆点 */
	.dot-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 6rpx;
		height: 34rpx;
	}

	.dot {
		width: 10rpx;
		height: 10rpx;
		background-color: #fff;
		border-radius: 50%;
	}

	/* 可以调整点与点之间的间距 */
	.dot-column .dot:nth-child(2) {
		margin: 4rpx 0;
	}

	.collection-info {
		display: flex;
		justify-content: space-between;
		padding-right: 16rpx;
		align-items: left;
		padding-top: 5rpx;
	}

	.info-area {
		align-items: flex-start;
		margin: 6rpx 0;
	}

	.work-title {
		font-size: 28rpx;
		font-weight: bold;
		padding: 12rpx 16rpx;
		display: block;
	}

	.work-tags {
		padding: 5rpx 12rpx;
		display: flex;
		flex-wrap: wrap;
		gap: 8rpx;
	}

	.tag-item {
		font-size: 20rpx;
		color: #999;
		background-color: #f5f5f5;
		padding: 4rpx 12rpx;
		border-radius: 12rpx;
	}

	.footer-info {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		border-top: 1rpx solid #eee;
		box-sizing: border-box;
	}

	.collection-action-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 998;
		min-height: calc(120rpx + constant(safe-area-inset-bottom));
		min-height: calc(120rpx + env(safe-area-inset-bottom));
		padding: 0 30rpx constant(safe-area-inset-bottom);
		padding: 0 30rpx env(safe-area-inset-bottom);
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.action-user {
		height: 120rpx;
		display: flex;
		align-items: center;
		min-width: 0;
		flex: 1;
	}

	.action-user:active,
	.action-btn:active {
		opacity: 0.7;
	}

	.action-avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background: #f0f0f0;
		border: 1rpx solid #eee;
		margin-right: 24rpx;
		flex-shrink: 0;
	}

	.action-user-info {
		min-width: 0;
		flex: 1;
	}

	.action-user-name {
		font-size: 34rpx;
		font-weight: bold;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.action-icons {
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-shrink: 0;
	}

	.action-btn {
		width: 60rpx;
		height: 60rpx;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-btn + .action-btn {
		margin-left: 34rpx;
	}

	.action-icon {
		width: 48rpx;
		height: 48rpx;
		display: block;
	}

	.action-share-btn {
		background: transparent;
		padding: 0;
		margin: 0;
		line-height: inherit;
		border-radius: 0;
		border: none;
	}

	.action-share-btn::after {
		border: none;
	}

	.action-btn + .action-share-btn {
		margin-left: 34rpx;
	}

	.user-left {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user-text {
		display: flex;
		flex-direction: column;
	}

	.name {
		font-size: 28rpx;
		font-weight: bold;
	}

	.desc {
		font-size: 22rpx;
		color: #999;
	}

	.share-icon-small {
		width: 40rpx;
		height: 40rpx;
		cursor: pointer;
	}

	.share-img {
		width: 100%;
		height: 100%;
	}

	/* 空状态样式 */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 160rpx 0;
		color: #999;
		flex-grow: 1;
	}

	.empty-img {
		width: 180rpx;
		height: 180rpx;
		margin-bottom: 30rpx;
		opacity: 0.4;
	}

	.empty-text {
		font-size: 28rpx;
		color: #999;
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

	/* 作品项动画效果 - 小程序兼容版 */
	.work-item {
		-webkit-tap-highlight-color: transparent;
		tap-highlight-color: transparent;
		outline: none;
		-webkit-user-select: none;
		user-select: none;
		margin-bottom: 20rpx;
	}

	/* 定义基础动画 - 纯淡入淡出效果 */
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	/* 为不同位置的元素添加固定延迟，避免使用动态计算 */
	.item-0 {
		animation-delay: 0ms;
	}

	.item-1 {
		animation-delay: 50ms;
	}

	.item-2 {
		animation-delay: 100ms;
	}

	.item-3 {
		animation-delay: 150ms;
	}

	.item-4 {
		animation-delay: 200ms;
	}

	.item-5 {
		animation-delay: 250ms;
	}

	.item-6 {
		animation-delay: 300ms;
	}

	.item-7 {
		animation-delay: 350ms;
	}

	.item-8 {
		animation-delay: 400ms;
	}

	.item-9 {
		animation-delay: 450ms;
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
		min-height: 300rpx;
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
		padding: 20rpx 0;
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
		margin-right: 30rpx;
	}

	.wp-text {
		font-size: 32rpx;
		color: #333;
	}

	.share-btn-reset {
		background: transparent;
		padding: 30rpx 0;
		margin: 0;
		line-height: normal;
		border: none;
		text-align: left;
		border-radius: 0;
		border-bottom: 1rpx solid #f9f9f9;
	}

	.share-btn-reset::after {
		border: none;
	}

	/* 下载进度条样式 */
	.download-progress {
		position: fixed;
		bottom: 40rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 600rpx;
		z-index: 9999;
	}

	.progress-container {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 16rpx;
		padding: 24rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.progress-title {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	.progress-percent {
		font-size: 28rpx;
		color: #ff7a22;
		font-weight: bold;
	}

	.progress-bar {
		width: 100%;
		height: 12rpx;
		background: #f0f0f0;
		border-radius: 6rpx;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #ff7a22, #ff9a44);
		border-radius: 6rpx;
		transition: width 0.3s ease;
	}
</style>
