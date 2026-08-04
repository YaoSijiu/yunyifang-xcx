<template>
	<view class="container">
		<!-- 顶部 Tab 导航栏 -->
		<!-- 当不在主页时，给导航栏加个背景色，防止透明透底 :class="{ 'nav-white': currentTab !== 0 }"-->
		<view class="nav">
			<view class="nav-left">
				<!-- Tab 0: 主页 (仅在个人模式下显示) -->
				<view v-if="!isTeamMode" class="nav-item" @click="changeTab(0)">
					<text :class="currentTab == 0 ? 'active' : ''">主页</text>
					<image v-if="currentTab == 0" class="yellow-underline" src="/static/common/选中条.png" />
				</view>

				<!-- Tab 1: 作品 -->
				<view class="nav-item" @click="changeTab(1)">
					<text :class="currentTab == 1 ? 'active' : ''">作品</text>
					<image v-if="currentTab == 1" class="yellow-underline" src="/static/common/选中条.png" />
				</view>

				<!-- Tab 2: 作品集 -->
				<view class="nav-item" @click="changeTab(2)">
					<text :class="currentTab == 2 ? 'active' : ''">作品集</text>
					<image v-if="currentTab == 2" class="yellow-underline" src="/static/common/选中条.png" />
				</view>
			</view>
		</view>

		<!-- 主要内容区域 - 使用 swiper 实现左右滑动切换 -->
		<swiper :current="currentTab" @change="handleSwiperChange" class="main-swiper">
			<!-- 主页 Tab -->
			<swiper-item>
				<view v-if="!isTeamMode">
					<swiper class="top-bg" :indicator-dots="bannerList.length > 1" :autoplay="true" :interval="3000"
						:duration="1000" :circular="true">
						<swiper-item v-for="(img, index) in bannerList" :key="index">
							<image :src="img" mode="aspectFill" style="width: 100%; height: 100%;"></image>
						</swiper-item>
					</swiper>
					<view class="tab-content home-mode">
						<!-- 头像容器 -->
						<view class="avatar-wrapper">
							<image class="avatar" :src="resolveUrl(userInfo.avatar) || '/static/yunyiku/notAVA.png'">
							</image>
							<!-- 关注按钮：未关注时显示加号 -->
							<!-- <view v-if="!isFollowing" class="follow-badge" @click.stop="toggleFollow">
					<text>+</text>
				</view> -->
						</view>

						<!-- 用户卡片 -->
						<view class="user-card">
							<view class="username">{{ userInfo.nickName || '无名之辈' }}</view>
							
							<view class="selle-row">
								<view class="seller-rating">
									<!-- <view class="stars">
										<text v-for="star in 5" :key="star" class="seller-star"
											:class="{ active: star <= sellerStarRating }">★</text>
									</view> -->
									<text class="seller-score">{{ sellerRatingText }}/{{ sellerFansText }}</text>
								</view>
								<view class="seller-location">
									<image class="location-icon" src="/static/icon/位置.png" />
									<text>{{ cityText }}</text>
								</view>
							</view>

							<view class="btn-row">
								<view class="btn wx" @click="copyWechat">
									<image class="icon" src="/static/yunyiku/微信.png"></image>
								</view>
								<view class="btn phone" @click="makePhoneCall">
									<image class="icon" src="/static/yunyiku/电话.png"></image>
								</view>
							</view>
							
							<view class="sub" :class="{ 'sub-expanded': bioExpanded }"
								>{{ userInfo.title || '这个设计师很懒，什么也没留下' }}</view>
							<view v-if="bioOverflowing" class="bio-toggle" @click="toggleBio">
								<view class="chevron" :class="{ 'chevron-up': bioExpanded }"></view>
							</view>
							<!-- 隐藏测量元素：用于计算完整文本高度 -->
							<view class="sub-measure">{{ userInfo.title || '这个设计师很懒，什么也没留下' }}</view>
						</view>

						<view class="showcase-section">
							<view class="showcase-section-header">
								<view>
									<view class="showcase-section-title">橱窗展示</view>
								</view>
								<text class="showcase-count">共{{ showcaseCount }}个橱窗</text>
							</view>
							<scroll-view class="showcase-scroll" scroll-x enable-flex show-scrollbar="false">
								<view v-if="showcaseLoading && showcaseList.length === 0" class="showcase-state">加载中...</view>
								<view v-else-if="showcaseLoadError" class="showcase-state">橱窗加载失败</view>
								<view v-else-if="showcaseList.length === 0" class="showcase-state">暂无橱窗</view>
								<view v-else class="showcase-list">
									<view class="showcase-item" v-for="(item, index) in showcaseList"
										:key="item.id || index" :data-id="item.id" @click="goToShowcaseDetail">
										<image class="showcase-cover" :src="getShowcaseCoverUrl(item)" mode="aspectFill"
											lazy-load="true"></image>
										<text class="showcase-name">{{ item.showcaseTitle || '未命名橱窗' }}</text>
									</view>
								</view>
							</scroll-view>
						</view>

						<!-- 主页推荐作品预览 -->
						<view class="section-header">
							<view class="section-title">{{userInfo.groupSetting.titleCn}}</view>
							<view class="section-subtitle">{{userInfo.groupSetting.titleEn}}</view>
						</view>
						<view class="work-grid">
							<!-- 空状态 -->
							<view v-if="homeCollections.total === 0" class="empty-state"
								style="width: 100%; padding: 100rpx 0; text-align: center; color: #999;">
								<text>暂无作品集</text>
							</view>

							<!-- 有数据列表 -->
							<block v-else>
								<view class="work-item" v-for="(item, index) in homeCollections.data" :key="index"
									:class="{ 'single-col': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }">

									<view @click="goToWorkListDetail(item)">
										<view class="img-box">
											<!-- 单张图片展示 -->
											<image v-if="!item.workCoverUrls || item.workCoverUrls.length <= 1"
												:src="buildOssImageUrl(item.workCoverUrls && item.workCoverUrls.length > 0 ? item.workCoverUrls[0] : item.coverUrl)"
												class="work-img"
												:class="{ 'tall': !(userInfo.groupSetting && userInfo.groupSetting.sort === 0), 'single-img': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }"
												mode="aspectFill">
											</image>
											<!-- 两张图片：左右布局 -->
											<view v-else-if="item.workCoverUrls.length === 2"
												class="multi-img-container"
												:class="{ 'tall': !(userInfo.groupSetting && userInfo.groupSetting.sort === 0), 'single-img': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }">
												<image v-for="(url, imgIndex) in item.workCoverUrls" :key="imgIndex"
													:src="buildOssImageUrl(url)" class="multi-img-item"
													:class="{ 'multi-img-left-half': imgIndex === 0, 'multi-img-right-half': imgIndex === 1 }"
													mode="aspectFill">
												</image>
											</view>
											<!-- 三张图片：左侧一图，右侧两图 -->
											<view v-else class="multi-img-container"
												:class="{ 'tall': !(userInfo.groupSetting && userInfo.groupSetting.sort === 0), 'single-img': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }">
												<image v-for="(url, imgIndex) in item.workCoverUrls.slice(0, 3)"
													:key="imgIndex" :src="buildOssImageUrl(url)" class="multi-img-item"
													:class="{ 'multi-img-left': imgIndex === 0, 'multi-img-top-right': imgIndex === 1, 'multi-img-bottom-right': imgIndex === 2 }"
													mode="aspectFill">
												</image>
											</view>
										</view>
										<view class="collection-info">
											<text class="work-title">{{ item.name }}</text>
											<view class="more-options" @click.stop="showCollectionOptions(item)">
												<view class="dot-row">
													<view class="dot"></view>
													<view class="dot"></view>
													<view class="dot"></view>
												</view>
											</view>
										</view>
										<view class="work-sub">包含{{ item.tags}}个标签
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
				<view v-else class="team-mode-placeholder">
					<!-- 团队模式下主页标签页占位 -->
				</view>
			</swiper-item>

			<!-- 作品列表 Tab -->
			<swiper-item>
				<view class="tab-content list-mode">
					<!-- 搜索栏 -->
					<view class="search-bar">
						<view class="search-input-box">
							<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit" @click="searchWorks">
							</image>
							<input v-model="workSearchKeyword" placeholder="搜索作品" class="search-input"
								confirm-type="search" @confirm="searchWorks" />
						</view>
						<!-- 筛选图标：点击弹出 ActionSheet -->
						<view class="filter-btn" @click="showFilterMenu">
							<image class="filter-icon" src="/static/icon/筛选.svg" mode="aspectFit"></image>
						</view>
					</view>

					<!-- 数量提示 -->
					<view class="count-tip">共有 {{ allWorks.total }} 个作品</view>

					<!-- 瀑布流列表 -->
					<view class="work-grid">
						<!-- 空状态 -->
						<view v-if="allWorks.total === 0" class="empty-state"
							style="width: 100%; padding: 100rpx 0; text-align: center; color: #999;">
							<text>暂无作品</text>
						</view>

						<!-- 作品列表 -->
						<block v-else>
							<view class="work-item" v-for="(item, index) in allWorks.worksData" :key="index"
								:class="{ 'single-col': isSingleColumn }">
								<view @click="handleItemClick(item)">
									<view class="img-box">
										<image :src="resolveUrl(getFirstImageUrl(item.imageUrls))" class="work-img"
											:class="{ 'tall': !isSingleColumn, 'single-img': isSingleColumn }"
											mode="aspectFill">
										</image>
										<!-- 置顶标签 -->
										<view v-if="item.status == '1'" class="top-tag">
											<text class="top-tag-text">置顶</text>
										</view>
									</view>
									<view class="collection-info">
										<text class="work-title">{{ item.title }}</text>
										<view class="more-options" @click.stop="showWorkOptions(item)">
											<view class="dot-row">
												<view class="dot"></view>
												<view class="dot"></view>
												<view class="dot"></view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</swiper-item>

			<!-- 作品集 Tab -->
			<swiper-item>
				<view class="tab-content list-mode">
					<view class="search-bar">
						<view class="search-input-box">
							<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit"
								@click="searchCollections">
							</image>
							<input v-model="collectionSearchKeyword" placeholder="搜索作品集" class="search-input"
								confirm-type="search" @confirm="searchCollections" />
						</view>
						<view class="filter-btn" @click="showCollectionFilterMenu">
							<image class="filter-icon" src="/static/icon/筛选.svg" mode="aspectFit"></image>
						</view>
					</view>

					<view class="count-tip">共有 {{ collectionData.total }} 个作品集</view>

					<view class="work-grid collection-grid">
						<!-- 空状态 -->
						<view v-if="collectionData.total === 0" class="empty-state"
							style="width: 100%; padding: 100rpx 0; text-align: center; color: #999;">
							<text>暂无作品集</text>
						</view>

						<!-- 有数据列表 -->
						<block v-else>
							<view class="work-item collection-card" v-for="(item, index) in collectionData.data" :key="index"
								:class="{ 'single-col': portfolioLayout.isSingleColumn }">

								<view @click="goToWorkListDetail(item)">
									<view class="img-box">
										<!-- 单张图片展示 -->
										<image v-if="!item.workCoverUrls || item.workCoverUrls.length <= 1"
											:src="buildOssImageUrl(item.workCoverUrls && item.workCoverUrls.length > 0 ? item.workCoverUrls[0] : item.coverUrl)"
											class="work-img"
											:class="{ 'tall': !portfolioLayout.isSingleColumn, 'single-img': portfolioLayout.isSingleColumn }"
											mode="aspectFill">
										</image>
										<!-- 两张图片：左右布局 -->
										<view v-else-if="item.workCoverUrls.length === 2" class="multi-img-container"
											:class="{ 'tall': !portfolioLayout.isSingleColumn, 'single-img': portfolioLayout.isSingleColumn }">
											<image v-for="(url, imgIndex) in item.workCoverUrls" :key="imgIndex"
												:src="buildOssImageUrl(url)" class="multi-img-item"
												:class="{ 'multi-img-left-half': imgIndex === 0, 'multi-img-right-half': imgIndex === 1 }"
												mode="aspectFill">
											</image>
										</view>
										<!-- 三张图片：左侧一图，右侧两图 -->
										<view v-else class="multi-img-container"
											:class="{ 'tall': !portfolioLayout.isSingleColumn, 'single-img': portfolioLayout.isSingleColumn }">
											<image v-for="(url, imgIndex) in item.workCoverUrls.slice(0, 3)"
												:key="imgIndex" :src="buildOssImageUrl(url)" class="multi-img-item"
												:class="{ 'multi-img-left': imgIndex === 0, 'multi-img-top-right': imgIndex === 1, 'multi-img-bottom-right': imgIndex === 2 }"
												mode="aspectFill">
											</image>
										</view>
										<view v-if="item.isTop ==1" class="top-tag">
											<text class="top-tag-text">置顶</text>
										</view>
									</view>
									<view class="collection-info">
										<text class="work-title">{{ item.name }}</text>
										<view class="more-options" @click.stop="showCollectionOptions(item)">
											<view class="dot-row">
												<view class="dot"></view>
												<view class="dot"></view>
												<view class="dot"></view>
											</view>
										</view>
									</view>
									<view class="work-sub">包含 {{ getCollectionTagsCount(item) }} 个标签</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</swiper-item>
		</swiper>

		<!-- 作品管理弹窗 -->
		<view class="work-popup-mask" v-if="showWorkPopup" @click="closeWorkPopup" @touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">作品管理</view>

				<view class="wp-list">
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

		<!-- 作品集管理弹窗 -->
		<view class="work-popup-mask" v-if="showCollectionPopup" @click="closeCollectionPopup" @touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">作品集管理</view>

				<view class="wp-list">
					<view class="wp-item" @click="handleDownloadCollection">
						<image src="/static/icon/下载.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">下载</text>
					</view>
				</view>

				<view class="wp-section-title">分享</view>
				<view class="wp-list">
					<button class="wp-item share-btn-reset" open-type="share" @click="closeCollectionPopup">
						<image src="/static/icon/转发给朋友.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">转发给朋友</text>
					</button>
				</view>
			</view>
		</view>

		<!-- 作品筛选弹窗 -->
		<view class="work-popup-mask" v-if="showFilterPopup" @click="closeFilterPopup" @touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">设置作品列表</view>
				<view class="wp-list">
					<view class="wp-item" @click="handleSingleColumn">
						<image src="/static/icon/单列展示.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">单列展示</text>
					</view>
					<view class="wp-item" @click="handleDoubleColumn">
						<image src="/static/icon/双列展示.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">双列展示</text>
					</view>
					<view class="wp-item" @click="handleSortWorkDate">
						<image src="/static/icon/筛选.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">{{isWorksSorted?'取消排序':'按创建时间排序(从近到远)'}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 作品集筛选弹窗 -->
		<view class="work-popup-mask" v-if="showCollectionFilterPopup" @click="closeCollectionFilterPopup"
			@touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">设置作品集列表</view>
				<view class="wp-list">
					<view class="wp-item" @click="handleCollectionSingleColumn">
						<image src="/static/icon/单列展示.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">单列展示</text>
					</view>
					<view class="wp-item" @click="handleCollectionDoubleColumn">
						<image src="/static/icon/双列展示.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">双列展示</text>
					</view>
					<view class="wp-item" @click="handleSortCollectionDate">
						<image src="/static/icon/筛选.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">{{isCollectionsSorted?'取消排序':'按创建时间排序(从近到远)'}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 下载进度条 -->
		<view v-if="progress > 0" class="progress-container">
			<view class="custom-progress">
				<view class="progress-track">
					<view class="progress-bar" :style="{ width: progress + '%', transitionDuration: '0.3s' }"></view>
					<view class="progress-glow"></view>
				</view>
				<view class="progress-info">
					<text class="progress-percent">{{ progress }}%</text>
				</view>
			</view>
			<view class="stage-text">{{ stageText }}</view>
		</view>

	</view>
</template>

<script>
	import buildOssImageUrl from '@/utils/imageUtil.js'
	import env from '@/config/env.js'
	export default {
		data() {
			return {
				ossUrl: env.aliyunUrl,
				currentTab: 0, // 0:主页, 1:作品, 2:作品集
				isSingleColumn: false, // 控制作品列表单双列
				portfolioLayout: {
					isSingleColumn: false, // 控制作品集列表单双列
				},
				isFollowing: false, // 是否已关注

				userId: '',
				isTeamMode: false, // 是否处于团队模式
				userInfo: {
					nickName: '',
					avatar: '',
					title: '', // 职称
					background: ''
				},

				pageNum: 1,
				pageSize: 10,

				// 搜索关键词
				workSearchKeyword: '',
				collectionSearchKeyword: '',

				// Tab 0: 主页推荐
				// homeWork: {
				// 	data: [],
				// 	total: 0
				// },
				homeCollections: {
					data: [],
					total: 0
				},
				showcaseList: [],
				showcaseTotal: 0,
				showcaseLoading: false,
				showcaseLoadError: false,

				// Tab 1: 所有作品
				allWorks: {
					worksData: [],
					total: 0
				},

				// Tab 2: 作品集
				collectionData: {
					data: [],
					total: 0
				},

				progress: 0,
				loading: false,
				stageText: '处理中...',
				taskId: '',
				message: '',
				timer: null,
				shareUrl: '',
				// 新增：作品管理弹窗相关
				showWorkPopup: false,
				currentWorkItem: null,
				// 新增：作品集管理弹窗相关
				showCollectionPopup: false,
				currentCollectionItem: null,
				// 简介展开/收起
				bioExpanded: false,
				bioOverflowing: false,
				// 筛选弹窗
				showFilterPopup: false,
				showCollectionFilterPopup: false,
				// 排序状态
				isWorksSorted: false,
				isCollectionsSorted: false,
			};
		},
		computed: {
			bannerList() {
				const list = this.getBackgroundList(this.userInfo.background);
				if (list.length === 0) {
					return ['https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg.jpg','https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg2.jpg'];
				}
				return list.map(url => this.resolveUrl(url));
			},
			currentIsSingleColumn() {
				if (this.currentTab === 0) {
					// 主页使用主页布局设置
					return this.userInfo.groupSetting && this.userInfo.groupSetting.sort === 0;
				}
			},
			showcaseCount() {
				return Number(this.showcaseTotal) || this.showcaseList.length;
			},
			cityText() {
				return this.userRegionText || this.userInfo.regionName || this.userInfo.cityName || this.userInfo.city || this.userInfo.address || '地区未知';
			},
			sellerRatingValue() {
				const rating = Number(this.userInfo.rating);
				if (!Number.isFinite(rating) || rating <= 0) {
					return 0;
				}
				return Math.min(5, rating);
			},
			sellerStarRating() {
				return Math.max(0, Math.min(5, Math.floor(this.sellerRatingValue)));
			},
			sellerRatingText() {
				if (this.sellerRatingValue <= 0) {
					return '暂无评分';
				}
				return `${this.sellerRatingValue.toFixed(1)}分`;
			},
			sellerFansText() {
				const count = Number(this.userInfo.fansCount);
				if (!Number.isFinite(count) || count < 0) {
					return '粉丝0';
				}
				if (count >= 10000) {
					const text = (count / 10000).toFixed(1).replace(/\.0$/, '');
					return `粉丝${text}万`;
				}
				return `粉丝${Math.floor(count)}`;
			}
		},
		onLoad(options) {
			if (!this.isLoggedIn()) {
				this.showLoginModal();
			}
			if (options.userId) {
				this.userId = options.userId;
				this.isTeamMode = options.isTeamMode == 'true'; // 转换为布尔值
				// 在团队模式下默认选中作品标签
				if (this.isTeamMode) {
					this.currentTab = 1;
				}
				// 获取数据
				this.getVisitorInfo();
				this.getHomeWorkList();
				this.getUserWorksData();
				this.getUserCollections();
				this.addVisitor();
				this.getHomeCollections()
				this.getVisitorShowcases()

			} else {
				uni.showToast({
					title: '用户参数错误',
					icon: 'none'
				});
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 主页分享（点击右上角分享按钮）
				if (this.currentTab === 0 && !this.currentWorkItem && !this.currentCollectionItem) {
					// 获取背景图第一张作为封面
					const bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
					return {
						title: `${this.userInfo.nickName || '用户'}的主页`,
						path: `/subpkg-library/pages/visitor-home?userId=${this.userId}&isTeamMode=${this.isTeamMode}`,
						imageUrl: bgImg
					};
				}
				// 作品分享
				if (this.currentWorkItem) {
					const work = this.currentWorkItem;
					return {
						title: work.title || '我的作品',
						path: `/subpkg-others/pages/works-detail/detail?id=${work.id}&isTeamMode=${this.isTeamMode}&fromShare=1`,
						imageUrl: this.buildOssImageUrl(this.getFirstImageUrl(work.imageUrl))
					};
				}
				// 作品集分享
				if (this.currentCollectionItem) {
					const collection = this.currentCollectionItem;
					// 作品集可能有多张封面，取第一张或默认
					let imgUrl = collection.coverUrl;
					if (collection.workCoverUrls && collection.workCoverUrls.length > 0) {
						imgUrl = collection.workCoverUrls[0];
					}
					return {
						title: collection.name || '我的作品集',
						path: `/subpkg-library/pages/collection/detail?id=${collection.id}&title=${collection.name || collection.title}&isTeamMode=${this.isTeamMode}&fromShare=1`,
						imageUrl: this.resolveUrl(imgUrl) || '/static/yunyiku/bg.png'
					};
				}
			}

			// 默认分享整个主页
			const bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
			return {
				title: `${this.userInfo.nickName || '用户'}的主页`,
				path: `/subpkg-library/pages/visitor-home?userId=${this.userId}&isTeamMode=${this.isTeamMode}`,
				imageUrl: bgImg
			};
		},
		// 分享到朋友圈
		onShareTimeline() {
			// 获取背景图第一张作为封面
			const bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
			return {
				title: `${this.userInfo.nickName || '用户'}的主页`,
				query: `userId=${this.userId}&isTeamMode=${this.isTeamMode}`,
				imageUrl: bgImg
			};
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
			async getHomeCollections() {
				try {

					const userInfo = uni.getStorageSync('userInfo') || {};
					const params = {
						pageNum: 1,
						pageSize: 10,
						orderBy: 'sort',
						orderType: 'asc',
						type: this.isTeamMode ? '1' : ((userInfo && userInfo.groupSetting && userInfo.groupSetting
							.type) || '0'),
						visibility: "1",
						userId: this.userId
					};
					const res = await this.$request.get(
						`/wechat/works/findUserWorksCollectionsPage`, params
					);

					if (res.code === 200) {
						this.homeCollections.data = res.rows || res.data || [];
						this.homeCollections.total = res.total || this.homeCollections.data.length;
					}
				} catch (error) {
					console.error('获取主页作品集失败:', error);
				}
			},
			async getVisitorShowcases() {
				if (!this.userId || this.isTeamMode || this.showcaseLoading) {
					return;
				}
				this.showcaseLoading = true;
				this.showcaseLoadError = false;
				try {
					const res = await this.$request.get('/wechat/showCase/myShowcase/list', {
						pageNum: 1,
						pageSize: 20,
						status: 1,
						userId: this.userId
					});
					const pageData = this.extractPageData(res);
					this.showcaseList = pageData.rows;
					this.showcaseTotal = Number(pageData.total) || pageData.rows.length;
				} catch (error) {
					console.error('获取访客橱窗列表失败:', error);
					this.showcaseList = [];
					this.showcaseTotal = 0;
					this.showcaseLoadError = true;
				} finally {
					this.showcaseLoading = false;
				}
			},
			extractPageData(res) {
				const candidates = [res, res && res.data, res && res.data && res.data.data];
				const pageData = candidates.find(item => item && Array.isArray(item.rows));
				if (pageData) {
					return {
						rows: pageData.rows,
						total: pageData.total
					};
				}
				const list = candidates.find(item => Array.isArray(item));
				return {
					rows: list || [],
					total: undefined
				};
			},
			normalizeShowcaseCoverList(value) {
				if (!value) {
					return [];
				}
				if (Array.isArray(value)) {
					return value.filter(Boolean);
				}
				if (typeof value === 'string') {
					const text = value.trim();
					if (!text) {
						return [];
					}
					if (text.startsWith('[') && text.endsWith(']')) {
						try {
							const parsed = JSON.parse(text);
							return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
						} catch (e) {
							return [text];
						}
					}
					return text.split(',').map(item => item.trim()).filter(Boolean);
				}
				return [];
			},
			getShowcaseCoverUrl(item) {
				const coverList = this.normalizeShowcaseCoverList(item && item.coverList);
				const fallbackList = this.normalizeShowcaseCoverList(item && item.coverImage);
				const cover = (coverList.length > 0 ? coverList : fallbackList)[0] || '';
				return this.resolveUrl(cover) || '/static/yunyiku/bg.png';
			},
			goToShowcaseDetail(event) {
				const showcaseId = event && event.currentTarget && event.currentTarget.dataset
					? event.currentTarget.dataset.id
					: '';
				if (!showcaseId) {
					uni.showToast({
						title: '橱窗ID不存在',
						icon: 'none'
					});
					return;
				}
				uni.navigateTo({
					url: `/subpkg-showcase/pages/detail/index?id=${showcaseId}`
				});
			},
			buildOssImageUrl,
			getCollectionTagsCount(item) {
				if (!item) return 0;
				if (typeof item.tagsCount === 'number') return item.tagsCount;
				if (typeof item.tags === 'number') return item.tags;
				if (Array.isArray(item.tags)) return item.tags.length;
				if (typeof item.tags !== 'string') return 0;

				const tags = item.tags.trim();
				if (!tags) return 0;
				if (/^\d+$/.test(tags)) return Number(tags);

				try {
					const parsedTags = JSON.parse(tags);
					if (Array.isArray(parsedTags)) return parsedTags.length;
					if (typeof parsedTags === 'number') return parsedTags;
				} catch (e) {
					return tags.split(',').filter(tag => tag.trim()).length;
				}
				return 0;
			},
			// 解析背景图数据为数组
			getBackgroundList(bg) {
				if (!bg) return [];
				if (Array.isArray(bg)) return bg;
				if (typeof bg === 'string') {
					bg = bg.trim();
					// 尝试解析 JSON 字符串
					if (bg.startsWith('[') && bg.endsWith(']')) {
						try {
							const parsed = JSON.parse(bg);
							if (Array.isArray(parsed)) return parsed;
						} catch (e) {
							console.error('解析背景图JSON失败', e);
						}
					}
					// 兼容逗号分隔
					return bg.split(',').map(s => s.trim()).filter(s => s);
				}
				return [];
			},
			resolveUrl(url) {
				if (!url) return '';
				if (/^(http|https|wxfile|data):/.test(url)) {
					return url;
				}
				return this.ossUrl + url;
			},

			async addVisitor() {
				try {
					const currentUser = uni.getStorageSync('userInfo');
					if (currentUser && currentUser.id) {
						// 避免重复记录自己访问自己（可选，视需求而定，这里先加上判断）
						if (String(currentUser.id) === String(this.userId)) {
							console.log('自己访问自己，不记录访客记录');
							return;
						}

						await this.$request.post('/wechat/visitor', {
							intervieweeId: this.userId,
							visitorId: currentUser.id
						});
					}
				} catch (e) {
					// 静默失败，不打扰用户
					console.error('添加访客记录失败', e);
				}
			},

			// 获取访客用户信息
			async getVisitorInfo() {
				try {
					// 尝试获取指定用户的信息
					const res = await this.$request.get(`/wechat/user/getUserInfo?userId=${this.userId}`);
					if (res.code === 200 && res.data) {
						console.log('visitor-home getUserInfo返回:', res.data);
						this.userInfo = {
							...this.userInfo,
							...res.data,
							avatar: res.data.avatarUrl || res.data.avatar || this.userInfo.avatar,
							background: res.data.homeBackground || res.data.background || ''
						};

						// 如果接口返回了昵称，更新标题
						if (res.data.nickName) {
							uni.setNavigationBarTitle({
								title: `${res.data.nickName}的主页`
							});
						}
						this.checkBioOverflow();
						this.loadUserRegion();
					}
				} catch (e) {
					console.error('获取访客信息失败', e);
				}
			},

			// 获取用户设为常用的作品列表 (主页推荐)
			async getHomeWorkList() {
				const workType = this.isTeamMode ? '1' : '0';
				const {
					code,
					rows,
					total
				} = await this.$request.get(
					`/wechat/works/findUserWorksPage?pageNum=1&pageSize=10&status=1&userId=${this.userId}`
				)
				if (code == 200) {
					// this.homeWork.data = rows
					// this.homeWork.total = total
				}
			},

			// 获取用户作品列表
			async getUserWorksData() {
				let url =
					`/wechat/works/findUserWorksPage?pageNum=${this.pageNum}&pageSize=${this.pageSize}&userId=${this.userId}`;
				if (this.workSearchKeyword.trim()) {
					url += `&title=${encodeURIComponent(this.workSearchKeyword.trim())}`;
				}
				const {
					code,
					rows,
					total
				} = await this.$request.get(url);
				if (code == 200) {
					// 过滤仅自己可见的作品
					this.allWorks.worksData = rows.filter(item => item.hide == "0");
					this.allWorks.total = this.allWorks.worksData.length;
				}
			},

			// 获取用户的作品集
			async getUserCollections() {
				let url =
					`/wechat/works/findUserWorksCollectionsPage?pageNum=${this.pageNum}&pageSize=${this.pageSize}&type=0&userId=${this.userId}`;
				if (this.collectionSearchKeyword.trim()) {
					url += `&name=${encodeURIComponent(this.collectionSearchKeyword.trim())}`;
				}
				const {
					code,
					rows,
					total
				} = await this.$request.get(url);
				if (code == 200) {
					this.collectionData.data = rows;
					this.collectionData.total = total;
				}
			},

			toggleFollow() {
				this.isFollowing = !this.isFollowing;
				uni.showToast({
					title: this.isFollowing ? '已关注' : '已取消关注',
					icon: 'none'
				});
			},

			changeTab(index) {
				this.currentTab = index;
			},
			handleSwiperChange(e) {
				let newTab = e.detail.current;
				// 团队模式下，主页标签（index=0）不存在，自动切换到作品标签（index=1）
				if (this.isTeamMode && newTab === 0) {
					// 先设置为 2，然后再设置为 1，强制 swiper 组件重新渲染
					this.currentTab = 2;
					this.$nextTick(() => {
						this.currentTab = 1;
					});
				} else {
					this.currentTab = newTab;
				}
			},
			// 处理列表项点击
			handleItemClick(item) {
				this.goToWorkDetail(item);
			},

			goToWorkDetail(item) {
				uni.navigateTo({
					url: `/subpkg-others/pages/works-detail/detail?id=${item.id}&isTeamMode=${this.isTeamMode}&fromShare=1`
				});
			},

			goToWorkListDetail(item) {
				uni.navigateTo({
					url: `/subpkg-library/pages/collection/detail?id=${item.id}&title=${item.name || item.title}&isTeamMode=${this.isTeamMode}&fromShare=1`
				});
			},

			// 作品管理选项
			showWorkOptions(item) {
				this.currentCollectionItem = null;
				this.currentWorkItem = item;
				this.showWorkPopup = true;
			},
			closeWorkPopup() {
				this.showWorkPopup = false;
				// 延迟清空，避免弹窗关闭动画时内容消失（可选，视动画效果而定，这里暂不延迟）
				// this.currentWorkItem = null; 
			},
			handleDownloadWork() {
				const id = this.currentWorkItem.id;
				this.closeWorkPopup();
				this.downloadWorks('work', id);
			},
			handleDownloadCollection() {
				const id = this.currentCollectionItem.id;
				this.closeCollectionPopup();
				this.downloadWorks('collection', id);
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
							const redirectUrl = `/subpkg-library/pages/visitor-home?userId=${this.userId}&isTeamMode=${this.isTeamMode}`;
							uni.setStorageSync('login_redirect', redirectUrl);
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
				uni.showLoading({
					title: '生成压缩包...',
					mask: true
				});
				const res = await this.$request.post('/wechat/basic/downLoadWorksPc', {
					id: id,
					resourceType: resourceType,
					userName: userInfo.nickName || '',
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
						title:res.msg|| '用户案列暂不支持下载',
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
					const fullUrl = this.resolveUrl(filePath);
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
				}, 3000);
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
			// 弹出筛选菜单
			showFilterMenu() {
				this.showFilterPopup = true;
			},
			closeFilterPopup() {
				this.showFilterPopup = false;
			},
			handleSingleColumn() {
				this.isSingleColumn = true;
				this.closeFilterPopup();
			},
			handleDoubleColumn() {
				this.isSingleColumn = false;
				this.closeFilterPopup();
			},
			handleSortWorkDate() {
				this.sortWorksByDate();
				this.closeFilterPopup();
			},

			// 弹出作品集筛选菜单
			showCollectionFilterMenu() {
				this.showCollectionFilterPopup = true;
			},
			closeCollectionFilterPopup() {
				this.showCollectionFilterPopup = false;
			},
			handleCollectionSingleColumn() {
				this.portfolioLayout.isSingleColumn = true;
				this.closeCollectionFilterPopup();
			},
			handleCollectionDoubleColumn() {
				this.portfolioLayout.isSingleColumn = false;
				this.closeCollectionFilterPopup();
			},
			handleSortCollectionDate() {
				this.sortCollectionsByDate();
				this.closeCollectionFilterPopup();
			},
			// 作品搜索功能
			searchWorks() {
				this.pageNum = 1;
				this.getUserWorksData();
			},
			// 作品集搜索功能
			searchCollections() {
				this.pageNum = 1;
				this.getUserCollections();
			},

			// 作品集排序
			sortCollectionsByDate() {
				if (this.isCollectionsSorted) {
					// 如果已经排序，重新请求数据
					this.isCollectionsSorted = false;
					this.getUserCollections();
					uni.showToast({
						title: '已取消排序',
						icon: 'none'
					});
				} else {
					if (this.collectionData.data.length === 0) {
						uni.showToast({
							title: '暂无作品集可排序',
							icon: 'none'
						});
						return;
					}
					// 按创建时间倒序
					this.collectionData.data.sort((a, b) => {
						const timeA = new Date(a.createTime).getTime();
						const timeB = new Date(b.createTime).getTime();
						return timeB - timeA;
					});
					this.isCollectionsSorted = true;
					uni.showToast({
						title: '已按时间排序',
						icon: 'none'
					});
				}
			},

			// 作品集管理选项
			showCollectionOptions(item) {
				this.currentWorkItem = null;
				this.currentCollectionItem = item;
				this.showCollectionPopup = true;
			},
			closeCollectionPopup() {
				this.showCollectionPopup = false;
				// this.currentCollectionItem = null;
			},


			shareItem(item) {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: item.title || item.name,
					summary: "我分享了一个作品给你",
					imageUrl: this.resolveUrl(item.coverUrl || item.img),
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
						uni.showToast({
							title: '触发分享',
							icon: 'none'
						});
					}
				});
			},

			// 按时间排序
			sortWorksByDate() {
				if (this.isWorksSorted) {
					// 如果已经排序，重新请求数据
					this.isWorksSorted = false;
					this.getUserWorksData();
					uni.showToast({
						title: '已取消排序',
						icon: 'none'
					});
				} else {
					if (this.allWorks.worksData.length === 0) {
						uni.showToast({
							title: '暂无作品可排序',
							icon: 'none'
						});
						return;
					}
					// 按创建时间倒序
					this.allWorks.worksData.sort((a, b) => {
						const timeA = new Date(a.createTime).getTime();
						const timeB = new Date(b.createTime).getTime();
						return timeB - timeA;
					});
					this.isWorksSorted = true;
					uni.showToast({
						title: '已按时间排序',
						icon: 'none'
					});
				}
			},

			copyWechat() {
				if (!this.userInfo.wxNumber) {
					uni.showToast({
						title: '未绑定微信号',
						icon: 'none'
					});
					return;
				}
				uni.setClipboardData({
					data: this.userInfo.wxNumber,
					success: () => {
						uni.showToast({
							title: '微信号已复制',
							icon: 'success'
						});
					}
				});
			},

			makePhoneCall() {
				if (this.userInfo.phone) {
					uni.makePhoneCall({
						phoneNumber: this.userInfo.phone
					});
				} else {
					uni.showToast({
						title: '未绑定手机号',
						icon: 'none'
					});
				}
			},

			async loadUserRegion() {
				try {
					const res = await this.$request.get(`/wechat/basic/userRegion?userId=${this.userId}`);
					const data = res.data || {};
					this.userRegionText = data.fullName || [data.provinceName, data.cityName, data.districtName || data.regionName].filter(Boolean).join('');
				} catch (e) {
					// 地区接口不支持或未设置
				}
			},
			checkBioOverflow() {
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.sub').boundingClientRect();
					query.select('.sub-measure').boundingClientRect();
					query.exec((res) => {
						if (!res || !res[0] || !res[1]) return;
						this.bioOverflowing = res[1].height - res[0].height > 2;
					});
				});
			},
			toggleBio() {
				this.bioExpanded = !this.bioExpanded;
			}
		}

	};
</script>

<style lang="scss" scoped>
	.progress-container {
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		background: rgba(255, 255, 255, 0.95);
		padding: 24rpx 32rpx;
		border-radius: 16rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);
		z-index: 9999;
		animation: slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes slide-up {
		from {
			transform: translateX(-50%) translateY(100%);
			opacity: 0;
		}

		to {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
	}

	.custom-progress {
		width: 100%;
	}

	.progress-track {
		position: relative;
		width: 100%;
		height: 16rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		overflow: hidden;
	}

	.progress-bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
		border-radius: 8rpx;
		transition-timing-function: ease-out;
		box-shadow: 0 2rpx 8rpx rgba(255, 215, 0, 0.4);
	}

	.progress-glow {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
		animation: progress-shine 2s infinite;
	}

	.more-options {
		width: 50rpx;
		/* 点击区域宽度 */
		height: 50rpx;
		/* 点击区域高度 */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left: 30rpx;
		/* 右侧留白 */
		position: relative;
		z-index: 1;
	}

	/* 水平排列三个小圆点 */
	.dot-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 30rpx;
		/* 精确控制总宽度 */
		height: 6rpx;
	}

	.dot {
		width: 8rpx;
		height: 8rpx;
		background-color: #333;
		border-radius: 50%;
	}

	/* 可选：为每个点单独控制间距 */
	.dot-row .dot:nth-child(1) {
		opacity: 1;
	}

	.dot-row .dot:nth-child(2) {
		opacity: 1;
	}

	.dot-row .dot:nth-child(3) {
		opacity: 1;
	}

	@keyframes progress-shine {
		0% {
			left: -100%;
		}

		100% {
			left: 100%;
		}
	}

	.progress-info {
		position: absolute;
		top: -48rpx;
		right: -20rpx;
		background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
		color: #FFFFFF;
		font-size: 24rpx;
		font-weight: 600;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 16rpx rgba(255, 215, 0, 0.3);
		transform: translateX(50%);
		white-space: nowrap;
	}

	.progress-percent {
		color: #FFFFFF;
	}

	.stage-text {
		font-size: 26rpx;
		color: #666666;
		text-align: center;
		margin-top: 20rpx;
		font-weight: 400;
	}

	/* 基础容器 */
	.container {
		width: 100%;
		min-height: 100vh;
		position: relative;
		background: #f5f5f5;
		overflow-x: hidden;
	}

	/* 顶部背景 - 仅主页 */
	.top-bg {
		width: 100%;
		height: 400rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		padding-top: 77rpx;
	}

	/* 主页分享按钮 */
	.home-share-btn {
		position: absolute;
		top: 100rpx;
		right: 30rpx;
		z-index: 100;
	}

	.share-btn-wrapper {
		width: 72rpx;
		height: 72rpx;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		border: none;
		line-height: normal;
	}

	.share-btn-wrapper::after {
		border: none;
	}

	.share-icon {
		width: 44rpx;
		height: 44rpx;
	}

	/* 导航栏 */
	.nav {
		width: 100%;
		height: 60rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		position: fixed;
		top: 0;
		z-index: 100;
		padding-bottom: 20rpx;
		background-color: #ffffff;

		/* 非主页时加白色背景 */
		&.nav-white {
			background-color: #f5f5f5;
		}
	}

	.nav-left {
		display: flex;
	}

	.nav-item {
		margin-right: 40rpx;
		position: relative;
		padding-bottom: 10rpx;
	}

	.nav-item text {
		font-size: 30rpx;
		color: #434343;
		transition: all 0.3s;
	}

	.nav-item text.active {
		font-weight: 700;
		color: #1a1a1a;
	}

	.yellow-underline {
		position: absolute;
		left: 50%;
		bottom: 6rpx;
		transform: translateX(-50%);
		width: 44rpx;
		height: 11rpx;
		top:50rpx;
	}

	/* tab-content */
	.tab-content {
		position: relative;
		z-index: 10;
		padding-top: 150rpx;
	}

	.home-mode {
		/* 主页不需要额外顶部间距，因为有背景图 */
	}

	.list-mode {
		/* 列表页没有背景图，稍微加点间距即可 */
		padding-top: 87rpx;
	}

	/* User Card (主页) */
	.avatar-wrapper {
		width: 140rpx;
		height: 140rpx;
		position: absolute;
		top: 80rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 20;
		padding-top: 236rpx;
	}

	.avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 6rpx solid white;
		background: #fff;
	}

	.follow-badge {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 44rpx;
		height: 44rpx;
		background: #FF7A22;
		border-radius: 50%;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
		border: 4rpx solid white;
		z-index: 21;
	}

	.user-card {
		width: 92%;
		margin: 242rpx auto 40rpx;
		background: #fff;
		border-radius: 20rpx;
		// box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.05);
		padding: 80rpx 0 10rpx;
		text-align: center;
	}

	.username {
		font-size: 38rpx;
		font-weight: bold;
	}

	.sub {
		text-align: center;
		font-size: 28rpx;
		color: #777;
		margin-top: 32rpx;
		width: 70%;
		margin: 32rpx auto 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sub.sub-expanded {
		display: block;
		-webkit-line-clamp: unset;
		-webkit-box-orient: initial;
		overflow: visible;
		text-overflow: initial;
	}

	.bio-toggle {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 24rpx;
		height: 24rpx;
	}

	.chevron {
		width: 0;
		height: 0;
		border-left: 15rpx solid transparent;
		border-right: 15rpx solid transparent; 
		border-top: 15rpx solid #979797;  
		transition: transform 0.3s;
		margin-top: -8rpx;
	}

	.chevron.chevron-up {
		transform: rotate(-180deg);
		margin-top: 4rpx;
	}

	.sub-measure {
		position: absolute;
		left: -9999rpx;
		top: 0;
		width: 70%;
		font-size: 28rpx;
		line-height: 1.5;
		color: #777;
		visibility: hidden;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.btn-row {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		gap: 62rpx;
	}

	.btn {
		width: 240rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wx {
		border: 2rpx solid #ff7a22;
	}

	.phone {
		background: #ff7a22;
	}

	.icon {
		width: 48rpx;
		height: 48rpx;
	}

	/* 列表通用 */
	.section-title {
		font-size: 38rpx;
		font-weight: 600;
		margin: 15rpx 12rpx;
	}

	.section-header {
		text-align: center;
		position: relative;
		margin: 30rpx;
		padding: 20rpx 0;
	}

	.section-subtitle {
		font-size: 24rpx;
		color: #999;
		text-transform: lowercase;
		letter-spacing: 1rpx;
	}

	.showcase-section {
		margin: 0 20rpx 24rpx;
		padding: 24rpx 20rpx 20rpx;
		background: #fff;
		border-radius: 24rpx;
	}

	.showcase-section-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.showcase-section-title {
		font-size: 34rpx;
		font-weight: 600;
		color: #222;
		line-height: 1.4;
	}

	.showcase-count {
		padding-top: 8rpx;
		font-size: 24rpx;
		color: #999;
		line-height: 1.4;
	}

	.showcase-scroll {
		white-space: nowrap;
	}

	.showcase-list {
		display: inline-flex;
		align-items: flex-start;
	}

	.showcase-item {
		width: 150rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.showcase-item:last-child {
		margin-right: 0;
	}

	.showcase-cover {
		width: 150rpx;
		height: 150rpx;
		border-radius: 18rpx;
		background: #f5f5f5;
		display: block;
	}

	.showcase-name {
		display: block;
		margin-top: 14rpx;
		font-size: 24rpx;
		color: #333;
		line-height: 1.4;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}

	.showcase-state {
		font-size: 24rpx;
		color: #999;
		line-height: 150rpx;
	}

	.count-tip {
		font-size: 24rpx;
		color: #999;
		margin: 0 30rpx 20rpx;
		margin-top: 20rpx;
	}

	.search-bar {
		padding: 20rpx;
		display: flex;
		align-items: center;
		background: #fff;
		margin-top: -20rpx;
		/* padding: 15rpx 30rpx; */
		/* border-radius: 40rpx; */

		.search-input-box {
			flex: 1;
			display: flex;
			align-items: center;
			background: #eee;
			padding: 15rpx 30rpx;
			border-radius: 40rpx;
			margin-right: 120rpx;
		}

		.search-input {
			flex: 1;
			font-size: 28rpx;
		}

		/* .search-btn {
		padding: 0 10rpx;
	} */

		.search-icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 15rpx;
			color: #999;
		}

		.filter-btn {
			/* padding: 0 10rpx; */
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.filter-icon {
			width: 48rpx;
			height: 48rpx;
			/* margin-left: 20rpx; */
		}
	}


	/* 宫格布局 - 参照 home.vue 改为 Flex 布局 */
	.work-grid {
		padding: 0 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.work-item {
		width: 48%;
		background: #fff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		overflow: hidden;
		position: relative;
		transition: all 0.2s;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

		/* 单列模式 */
		&.single-col {
			width: 100%;
		}
	}

	.img-box {
		position: relative;
	}

	/* 置顶标签样式 */
	.top-tag {
		position: absolute;
		top: 10rpx;
		right: 0;
		background: linear-gradient(135deg, #ff7a22, #ff9547);
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 16rpx 0 0 16rpx;
		z-index: 10;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
		/* 文本居中 */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-tag-text {
		font-size: 20rpx;
		font-weight: bold;
		color: white;
	}

	/* 多图容器 */
	.multi-img-container {
		position: relative;
		width: 100%;
		height: 100%;
		background: #ffffff;
		overflow: hidden;
		transition: height 0.3s ease;
		// margin: 8rpx;
		border-radius: 12rpx;
	}

	.multi-img-container.tall {
		height: 340rpx;
	}

	.multi-img-container.single-img {
		height: 400rpx;
	}

	.multi-img-item {
		position: absolute;
		background: #eee;
		overflow: hidden;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	}

	/* 调整图片间距 */
	.multi-img-left {
		z-index: 1;
		width: calc(60% - 3rpx);
		height: calc(100% - 3rpx);
		left: 0;
		top: 0;
		border-radius: 12rpx 0 0 12rpx;
	}

	.multi-img-top-right {
		z-index: 2;
		width: calc(40% - 3rpx);
		height: calc(50% - 3rpx);
		right: 0;
		top: 0;
		border-radius: 0 12rpx 0 0;
	}

	.multi-img-bottom-right {
		z-index: 3;
		width: calc(40% - 3rpx);
		height: calc(50% - 3rpx);
		right: 0;
		bottom: 0;
		border-radius: 0 0 12rpx 0;
	}

	/* 两张图片左右布局 */
	.multi-img-left-half {
		z-index: 1;
		width: calc(50% - 3rpx);
		height: calc(100% - 3rpx);
		left: 0;
		top: 0;
		border-radius: 12rpx 0 0 12rpx;
	}

	.multi-img-right-half {
		z-index: 2;
		width: calc(50% - 3rpx);
		height: calc(100% - 3rpx);
		right: 0;
		top: 0;
		border-radius: 0 12rpx 12rpx 0;
	}

	.work-img {
		width: 100%;
		background: #eee;

		&.tall {
			height: 340rpx;
		}

		&.single-img {
			height: 400rpx;
		}
	}

	.work-title {
		font-size: 28rpx;
		font-weight: bold;
		padding: 12rpx 16rpx;
		text-align: left;
		display: block;
	}

	.work-sub {
		font-size: 24rpx;
		color: #999;
		padding-left: 16rpx;
		margin-top: 6rpx;
	}

	.collection-info {
		display: flex;
		justify-content: space-between;
		padding-right: 16rpx;
		align-items: center;
		margin: 6rpx 0;
	}

	/* 作品集列表：与首页作品集 Tab 保持一致 */
	.collection-grid {
		padding: 0 20rpx 20rpx;
		align-items: flex-start;

		.collection-card {
			width: 49%;
			background: transparent;
			border-radius: 0;
			padding-bottom: 0;
			margin-bottom: 34rpx;
			overflow: visible;
			box-shadow: none;
		}

		.collection-card.single-col {
			width: 100%;
		}

		.collection-card .img-box {
			border-radius: 19rpx;
			overflow: hidden;
			background: #f2f2f2;
		}

		.collection-card .work-img.tall,
		.collection-card .multi-img-container.tall {
			height: 230rpx;
		}

		.collection-card .work-img.single-img,
		.collection-card .multi-img-container.single-img {
			height: 340rpx;
		}

		.collection-card .work-img,
		.collection-card .multi-img-container {
			border-radius: 12rpx;
		}

		.collection-card .collection-info {
			margin: 17rpx 1rpx 5rpx;
			padding-right: 0;
			min-height: 40rpx;
		}

		.collection-card .work-title {
			flex: 1;
			padding: 0;
			font-size: 28rpx;
			line-height: 40rpx;
			color: #111;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.collection-card .more-options {
			width: 44rpx;
			height: 40rpx;
			line-height: 40rpx;
			margin-left: 12rpx;
			margin-right: 17rpx;
		}

		.collection-card .dot-row {
			width: 32rpx;
		}

		.collection-card .dot {
			width: 7rpx;
			height: 7rpx;
		}

		.collection-card .work-sub {
			padding-left: 0;
			margin-top: 2rpx;
			font-size: 24rpx;
			line-height: 32rpx;
			color: #c6c6c6;
		}

		.collection-card .multi-img-container {
			background: #fff;
		}

		.collection-card .top-tag {
			display: none;
		}

		.collection-card .multi-img-left {
			width: calc(68% - 2rpx);
		}

		.collection-card .multi-img-top-right,
		.collection-card .multi-img-bottom-right {
			width: calc(32% - 2rpx);
		}
	}

	.more-small {
		color: #999;
		font-weight: bold;
		letter-spacing: 2rpx;
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
		min-height: 400rpx;
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
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
	}

	.wp-item:active {
		opacity: 0.7;
	}

	.wp-icon {
		width: 50rpx;
		height: 50rpx;
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

	/* Swiper 样式 */
	.main-swiper {
		width: 100%;
		height: calc(100vh - 40rpx);
		position: relative;
		overflow: hidden;
		margin-top: 0rpx;
	}
	.main-swiper swiper-item {
	    overflow-y: auto !important;
	    -webkit-overflow-scrolling: touch;
	    height: 100%;
	}
	/* 确保 tab-content 能够正确显示 */
	.tab-content {
		min-height: 100%;
		padding-bottom: 100rpx;
		/* 为底部导航栏留出空间 */
	}

	/* 团队模式下的占位符 */
	.team-mode-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
	}
	
	.seller-location {
		display: inline-flex;
		align-items: center;
		margin-top: 10rpx;
		vertical-align: middle;
		font-size: 22rpx;
		line-height: 45rpx;
		color: #666666;
	}
	.seller-rating {
		margin-top: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.stars {
		display: flex;
		align-items: center;
		height: 34rpx;
	}
	.seller-star {
		margin-right: 2rpx;
		font-size: 30rpx;
		line-height: 34rpx;
		color: #d6d6d6;
	}
	.seller-star.active {
		color: #f37738;
	}
	.seller-score {
		margin-left: 18rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #979797;
	}
	.location-icon {
		position: relative;
		width: 20rpx;
		height: 25rpx;
		margin-right: 17rpx;
		margin-left: 1rpx;
		flex-shrink: 0;
	}
	
	.selle-row {
			display: flex;
			justify-content: center;
			gap: 36rpx;
		}
</style>
