<template>
	<view class="container">
		<yun-storage-warning :visible="false" type="flowout" @cancel="() => {}" @confirm="() => {}" />
		<!-- 顶部 Tab 导航栏 -->
		<view class="status-bar" :style="{ height: systemBarHeight + 'px' }"></view>

		<!-- 当不在主页时，给导航栏加个背景色，防止透明透底 -->
		<view class="nav" :style="{ top: systemBarHeight + 'px' }">
			<!-- <view v-if="isPC" @click="refreshData"
				style="position:absolute;right:30rpx;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:8rpx;color:#999;font-size:24rpx;z-index:10;">
				<text style="font-size:32rpx;">↻</text>
				<text>刷新</text>
			</view> -->
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
		<swiper ref="swiper" :current="swiperCurrentIndex" @change="handleSwiperChange"
			class="main-swiper" :style="{ marginTop: (systemBarHeight + 35) + 'px' }" :duration="250">
			<!-- 主页 Tab -->
			<swiper-item v-if="!isTeamMode">
				<view v-if="shouldRenderTab(0) && !isTeamMode">
					<swiper class="top-bg" :indicator-dots="bannerList.length > 1" :autoplay="true" :interval="3000"
						:duration="1000" :circular="true">
						<swiper-item v-for="(img, index) in bannerList" :key="index" @click="changeBackground">
							<image :src="img" mode="aspectFill" style="width: 100%; height: 100%;" lazy-load="true">
							</image>
						</swiper-item>
					</swiper>
					<!-- 主页分享按钮 -->
					<view class="home-share-btn" v-if="currentTab === 0">
					<!-- 	<button class="share-btn-wrapper" open-type="share">
							<image src="/static/icon/分享.svg" class="share-icon" mode="aspectFit"></image>
						</button> -->
					</view>
					<view class="tab-content home-mode" :style="{ paddingTop: '100px' }">
						<!-- 用户卡片 -->
						<view class="user-card">
							<!-- 头像容器 (为了和 visitor-home 保持结构一致，包裹一层) -->
							<view class="avatar-wrapper" @click="goToEditProfile">
								<image class="avatar" :src="resolveUrl(userInfo.avatar) || '/static/yunyiku/notAVA.png'"
									lazy-load="true"></image>
							</view>
							<view class="username" @click="goToEditProfile">{{ userInfo.nickName || '无名之辈' }}</view>

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
								<view class="btn wx" @click.stop="goToEditProfile">
									<image class="icon" src="/static/yunyiku/微信.png"></image>
								</view>
								<view class="btn phone" @click.stop="goToEditProfile">
									<image class="icon" src="/static/yunyiku/电话.png"></image>
								</view>
							</view>
							
							<view class="sub" :class="{ 'sub-expanded': bioExpanded }" @click="goToEditProfile"
								>{{ userInfo.title || '这个设计师很懒，什么也没留下' }}</view>
							<view v-if="bioOverflowing" class="bio-toggle" @click.stop="toggleBio">
								<view class="chevron" :class="{ 'chevron-up': bioExpanded }"></view>
							</view>
							<!-- 隐藏测量元素：用于计算完整文本高度 -->
							<view class="sub-measure">{{ userInfo.title || '这个设计师很懒，什么也没留下' }}</view>
						</view>

						<!-- 主页推荐作品集预览 -->
						<view class="section-header">
							<view class="section-title">{{ userInfo.groupSetting.titleCn }}</view>
							<view class="section-subtitle">{{ userInfo.groupSetting.titleEn }}</view>
							<image v-if="!isTeamMode && loggedIn" @click="showHomeCollectionMenu" src="/static/home/作品集编辑弹窗.png"
								class="menu-icon"></image>
						</view>
						<view v-if="!isTeamMode && loggedIn" class="showcase-section">
							<view class="showcase-section-header">
								<view>
									<view class="showcase-section-title">橱窗展示</view>
									<!-- <view class="showcase-section-subtitle">Showcase</view> -->
								</view>
								<text class="showcase-count">共{{ showcaseCount }}个橱窗</text>
							</view>
							<scroll-view class="showcase-scroll" scroll-x enable-flex show-scrollbar="false">
								<view v-if="showcaseLoading && showcaseList.length === 0" class="showcase-state">加载中...</view>
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
						<view class="work-grid collection-grid" v-if="homeCollections.data">
							<view v-if="homeCollections.total === 0" class="empty-state-card">
								<text class="empty-state-text">暂无作品集</text>
							</view>
							<block v-else>
								<view class="work-item collection-card" v-for="(item, index) in homeCollections.data" :key="index"
									:class="{ 'single-col': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }">
									<view @click="goToWorkListDetail(item)">
										<view class="img-box">
											<!-- 单张图片展示 -->
											<image v-if="!item.workCoverUrls || item.workCoverUrls.length <= 1"
												:src="buildOssImageUrl(item.workCoverUrls && item.workCoverUrls.length > 0 ? item.workCoverUrls[0] : item.coverUrl)"
												class="work-img"
												:class="{ 'tall': !(userInfo.groupSetting && userInfo.groupSetting.sort === 0), 'single-img': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }"
												mode="aspectFill" lazy-load="true">
											</image>
											<!-- 两张图片：左右布局 -->
											<view v-else-if="item.workCoverUrls.length === 2" class="multi-img-container"
												:class="{ 'tall': !(userInfo.groupSetting && userInfo.groupSetting.sort === 0), 'single-img': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }">
												<image v-for="(url, imgIndex) in item.workCoverUrls" :key="imgIndex"
													:src="buildOssImageUrl(url)" class="multi-img-item"
													:class="{ 'multi-img-left-half': imgIndex === 0, 'multi-img-right-half': imgIndex === 1 }"
													mode="aspectFill" lazy-load="true">
												</image>
											</view>
											<!-- 三张图片：左侧一图，右侧两图 -->
											<view v-else class="multi-img-container"
												:class="{ 'tall': !(userInfo.groupSetting && userInfo.groupSetting.sort === 0), 'single-img': userInfo.groupSetting && userInfo.groupSetting.sort === 0 }">
												<image v-for="(url, imgIndex) in item.workCoverUrls.slice(0, 3)"
													:key="imgIndex" :src="buildOssImageUrl(url)" class="multi-img-item"
													:class="{ 'multi-img-left': imgIndex === 0, 'multi-img-top-right': imgIndex === 1, 'multi-img-bottom-right': imgIndex === 2 }"
													mode="aspectFill" lazy-load="true">
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
										<view class="work-sub">包含{{ item.tags }}个标签</view>
									</view>
								</view>
							</block>
						</view>
						<view v-if="!isTeamMode" class="add-portfolio-btn" @click.stop="addPortfolioLink(item)">
							<view>
								<image src="/static/home/添加.png" class="add-icon"></image>
							</view>
							<text class="add-text">添加作品集</text>
						</view>
					</view>
				</view>
				<view v-else-if="shouldRenderTab(0)" class="team-mode-placeholder">
					<!-- 团队模式下主页标签页占位 -->
				</view>
				<view v-else class="swiper-tab-placeholder"></view>
			</swiper-item>

			<!-- 作品列表 Tab -->
			<swiper-item>
				<scroll-view v-if="shouldRenderTab(1)" scroll-y style="height: 100%;" :scroll-top="worksScrollTopValue"
					scroll-with-animation="false" @scroll="onWorksScroll" @scrolltolower="onWorksScrollToLower"
					lower-threshold="100" :refresher-enabled="!isPCDevice" :refresher-triggered="worksRefreshing"
					refresher-background="#f5f5f5" @refresherrefresh="onWorksRefresh">
					<view class="tab-content list-mode">
						<view class="search-bar">
							<view class="search-input-box">
								<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit"
									@click="searchWorks">
								</image>
								<input v-model="workSearchKeyword" placeholder="搜索作品" class="search-input"
									confirm-type="search" @confirm="searchWorks" />
							</view>
							<!-- PC端刷新按钮 -->
							<view v-if="isPCDevice" class="filter-btn" @click="onWorksRefreshPC">
								<image src="/static/icon/刷新.svg" mode="aspectFit" class="filter-icon"></image>
							</view>
							<!-- 筛选图标：点击弹出 ActionSheet -->
							<view class="filter-btn" @click="showFilterMenu">
								<image class="filter-icon" src="/static/icon/筛选.svg" mode="aspectFit"></image>
							</view>
						</view>
						<!-- 数量提示 (减去第一个新建入口) -->
						<view class="count-tip">共有 {{ allWorks.total }} 个作品</view>

						<!-- 瀑布流列表 -->
						<view class="work-grid">

							<!--  情况1：特殊的“新建/空状态”卡片 (当列表为空时显示) -->
							<view v-if="allWorks.total === 0" class="work-item create-card-wrapper"
								:class="{ 'single-col': isSingleColumn }">
								<view class="create-card-inner" :class="{ 'single-img': currentIsSingleColumn }"
									@click="navigateTo(isTeamMode ? '/subpkg-library/pages/works/create?workType=1' : '/subpkg-library/pages/works/create')">
									<!-- 顶部信息 -->
									<view class="cc-header">
										<view class="cc-left">
											<text class="cc-title">{{ isTeamMode ? '团队第一个作品' : '我的第一个作品' }}</text>
										</view>
									</view>

									<!-- 中间图标 (盒子) -->
									<view class="cc-body">
										<image src="/static/yunyiku/没有.png" class="cc-icon" mode="aspectFit"></image>
									</view>
								</view>
							</view>

							<!--  情况2：普通的图片作品卡片列表 -->
							<block v-else>
								<view class="work-item" v-for="(item, index) in allWorks.worksData" :key="index"
									:class="{ 'single-col': isSingleColumn, 'create-card-wrapper': item.type === 'create' }">

									<!-- 如果是create类型 -->
									<view v-if="item.type === 'create'" class="create-card-inner"
										:class="{ 'single-img': isSingleColumn }"
										@click="navigateTo(isTeamMode ? '/subpkg-library/pages/works/create?workType=1' : '/subpkg-library/pages/works/create')">
										<view class="cc-header">
											<view class="cc-left">
												<text class="cc-title">新建作品</text>
											</view>
										</view>
										<view class="cc-body">
											<text style="font-size: 40rpx; color: #999;">+</text>
										</view>
									</view>

									<!-- 普通作品 -->
									<view v-else @click.stop="handleItemClick(item)">
										<view class="img-box">
											<image :src="buildOssImageUrl(getFirstImageUrl(item.imageUrls))"
												class="work-img"
												:class="{ 'tall': !isSingleColumn, 'single-img': isSingleColumn }"
												mode="aspectFill" lazy-load="true">
											</image>
											<!-- 置顶标签 -->
											<view v-if="item.status == '1'" class="top-tag">
												<text class="top-tag-text">置顶</text>
											</view>
											<!-- 仅自己可见锁定图标 -->
											<image v-if="item.hide === '1'" src="/static/icon/锁定.svg" class="lock-icon"
												mode="aspectFit"></image>
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

						<!-- 加载状态提示 -->
						<view v-if="worksLoadingMore" class="load-more-tip">加载中...</view>
						<view v-if="worksNoMore && allWorks.total > 0" class="load-more-tip">已加载全部</view>
					</view>
				</scroll-view>
				<view v-else class="swiper-tab-placeholder"></view>
			</swiper-item>

			<!-- 作品集 Tab -->
			<swiper-item>
				<scroll-view v-if="shouldRenderTab(2)" scroll-y style="height: 100%;" :scroll-top="collectionsScrollTopValue"
					scroll-with-animation="false" @scroll="onCollectionsScroll"
					@scrolltolower="onCollectionsScrollToLower" lower-threshold="100" :refresher-enabled="!isPCDevice"
					:refresher-triggered="collectionsRefreshing" refresher-background="#f5f5f5"
					@refresherrefresh="onCollectionsRefresh">
					<view class="tab-content list-mode">
						<view class="search-bar">
							<view class="search-input-box">
								<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit"
									@click="searchCollections">
								</image>
								<input v-model="collectionSearchKeyword" placeholder="搜索作品集" class="search-input"
									confirm-type="search" @confirm="searchCollections" />
							</view>
							<!-- PC端刷新按钮 -->
							<view v-if="isPCDevice" class="filter-btn" @click="onCollectionsRefreshPC">
								<image src="/static/icon/刷新.svg" mode="aspectFit" class="filter-icon"></image>
							</view>
							<view class="filter-btn" @click="showCollectionFilterMenu">
								<image class="filter-icon" src="/static/icon/筛选.svg" mode="aspectFit"></image>
							</view>
						</view>

						<view class="count-tip">共有 {{ collectionData.total }} 个作品集</view>

						<view class="work-grid collection-grid">
							<!-- 空状态：显示“我的第一个作品集”卡片 (创建入口) -->
							<view v-if="collectionData.total == 0" class="work-item create-card-wrapper"
								:class="{ 'single-col': portfolioLayout.isSingleColumn }">
								<view class="create-card-inner"
									:class="{ 'single-img': portfolioLayout.isSingleColumn }"
									@click="navigateTo(isTeamMode ? '/subpkg-library/pages/collection/create?workType=1' : '/subpkg-library/pages/collection/create')">
									<view class="cc-header">
										<view class="cc-left">
											<text class="cc-title">{{ isTeamMode ? '团队第一个作品集' : '我的第一个作品集' }}</text>
										</view>
									</view>
									<view class="cc-body">
										<image src="/static/yunyiku/没有.png" class="cc-icon" mode="aspectFit"></image>
									</view>
								</view>
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
												mode="aspectFill" lazy-load="true">
											</image>
											<!-- 两张图片：左右布局 -->
											<view v-else-if="item.workCoverUrls.length === 2"
												class="multi-img-container"
												:class="{ 'tall': !portfolioLayout.isSingleColumn, 'single-img': portfolioLayout.isSingleColumn }">
												<image v-for="(url, imgIndex) in item.workCoverUrls" :key="imgIndex"
													:src="buildOssImageUrl(url)" class="multi-img-item"
													:class="{ 'multi-img-left-half': imgIndex === 0, 'multi-img-right-half': imgIndex === 1 }"
													mode="aspectFill" lazy-load="true">
												</image>
											</view>
											<!-- 三张图片：左侧一图，右侧两图 -->
											<view v-else class="multi-img-container"
												:class="{ 'tall': !portfolioLayout.isSingleColumn, 'single-img': portfolioLayout.isSingleColumn }">
												<image v-for="(url, imgIndex) in item.workCoverUrls.slice(0, 3)"
													:key="imgIndex" :src="buildOssImageUrl(url)" class="multi-img-item"
													:class="{ 'multi-img-left': imgIndex === 0, 'multi-img-top-right': imgIndex === 1, 'multi-img-bottom-right': imgIndex === 2 }"
													mode="aspectFill" lazy-load="true">
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
										<view class="work-sub">包含 {{ item.tags }} 个标签</view>
									</view>
								</view>
							</block>
						</view>

						<!-- 加载状态提示 -->
						<view v-if="collectionsLoadingMore" class="load-more-tip">加载中...</view>
						<view v-if="collectionsNoMore && collectionData.total > 0" class="load-more-tip">已加载全部</view>
					</view>
				</scroll-view>
				<view v-else class="swiper-tab-placeholder"></view>
			</swiper-item>
		</swiper>
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
		<!-- 底部 TabBar -->
		<yun-tabbar :selected="3" :workNumber="Number(homeWork.total)"
			:collectionNumber="Number(collectionData.total)"></yun-tabbar>

		<!-- 背景图管理弹窗 -->
		<view class="work-popup-mask" v-if="showBgManagerPopup" @click="closeBgManager" @touchmove.stop.prevent>
			<view class="work-popup-content bg-manager-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">管理背景图 ({{ bgImages.length }}/5)</view>
				<view class="wp-sub-title">长按拖拽调整顺序</view>

				<view class="bg-image-grid">
					<view class="bg-image-item" v-for="(item, index) in bgImageItems" :key="item.id" :class="{
						'dragging': draggingIndex === index,
						'placeholder': index === placeholderIndex && draggingIndex !== index
					}" :style="{
						transform: draggingIndex === index && startPosition && currentPosition
							? `translate(${currentPosition.x - startPosition.x}px, ${currentPosition.y - startPosition.y}px) scale(1.1)`
							: 'none',
						zIndex: draggingIndex === index ? 999 : 1,
						transition: draggingIndex === index ? 'none' : 'transform 0.2s ease'
					}" @longpress="() => onLongPress(index)" @touchstart="(e) => onTouchStart(e, index)"
						@touchmove.stop.prevent="(e) => onTouchMove(e, index)" @touchend="(e) => onTouchEnd(e, index)">
						<image :src="resolveUrl(item.url)" mode="aspectFill" class="bg-img-preview"></image>
						<view class="bg-delete-btn" @click.stop="deleteBgImage(index)">×</view>

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

					<!-- Add Button -->
					<view class="bg-image-item add-btn" v-if="bgImages.length < 5" @click="openUploadType">
						<text style="font-size: 60rpx; color: #ccc;">+</text>
					</view>
				</view>

				<button class="bg-save-btn" @click="saveBgManager">保存</button>
			</view>
		</view>

		<!-- 上传方式弹窗 -->
		<view class="work-popup-mask" v-if="showUploadTypePopup" @click="showUploadTypePopup = false">
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">选择上传方式</view>
				<view class="wp-list">
					<view class="wp-item" @click="chooseBgImage('album')">
						<image src="/static/publish/相册.png" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">从相册选择</text>
					</view>
					<view class="wp-item" @click="chooseBgImage('chat')">
						<image src="/static/publish/聊天记录.png" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">从聊天记录选择</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 作品集管理弹窗 -->
		<view class="work-popup-mask" v-if="showCollectionPopup" @click="closeCollectionPopup" @touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle">
				</view>
				<view class="wp-title">作品集管理</view>
				<view class="wp-list">
					<view class="wp-item" @click="handleEditCollection">
						<image src="/static/icon/管理作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">管理作品集</text>
					</view>
					<view class="wp-item" v-if="currentTab !== 0" @click="handleCollectionFrequent">
						<image src="/static/icon/推荐.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">{{ currentCollectionItem && currentCollectionItem.isTop == 1 ? '取消置顶' : '置顶'
						}}</text>
					</view>
					<view class="wp-item" @click="handleDeleteCollection">
						<image src="/static/icon/删除作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">删除作品集</text>
					</view>
					<view class="wp-item" @click="handleDownloadCollection">
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

		<!-- 作品管理弹窗 -->
		<view class="work-popup-mask" v-if="showWorkPopup" @click="closeWorkPopup" @touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">作品管理</view>

				<view class="wp-list">
					<view class="wp-item" @click="handleEditWork">
						<image src="/static/icon/管理作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">管理作品</text>
					</view>
					<view class="wp-item" @click="handleToggleFrequent">
						<image src="/static/icon/推荐.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">{{ currentWorkItem && currentWorkItem.status == '1' ? '取消置顶' : '置顶'
						}}</text>
					</view>
					<view class="wp-between" @click="handleVisableWork">
						<view class="wp-item">
							<image
								:src="currentWorkItem && currentWorkItem.hide === '1' ?'/static/icon/公开.svg':'/static/icon/仅自己可见.svg'"
								class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">{{ currentWorkItem && currentWorkItem.hide === '1' ? '设为公开' : '设为仅自己可见'
							}}</text>
						</view>
						<view class="wp-right">
							{{ currentWorkItem && currentWorkItem.hide === '1' ? '所有人可见' : '当前访客可见' }}
						</view>
					</view>
					<view class="wp-item" @click="handleDeleteWork">
						<image src="/static/icon/删除作品.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">删除作品</text>
					</view>
					<view class="wp-item" @click="handleDownloadWork">
						<image src="/static/icon/下载.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">下载</text>
					</view>
				</view>

				<view class="wp-section-title">分享</view>
				<view class="wp-list" v-if="currentWorkItem.hide == '1'">
					<button class="wp-item share-btn-reset" @click="handleShareClick">
						<image src="/static/icon/转发给朋友.svg" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">转发给朋友</text>
					</button>
				</view>
				<view v-else class="wp-list">
					<button class="wp-item share-btn-reset" open-type="share" @click="closeWorkPopup">
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
					<block v-if="currentTab == 2">
						<view class="wp-item" @click="handleSortCollectionDate">
							<image src="/static/icon/筛选.svg" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">{{isCollectionsSorted?'取消排序':'按创建时间排序(从近到远)'}}</text>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- 代表作品集 筛选弹窗 -->
		<view class="work-popup-mask" v-if="showHomeCollectionPopup" @click="closeHomeCollectionPopup"
			@touchmove.stop.prevent>
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-list">
					<view class="wp-between" @click="handlePortfolio">
						<view class="wp-item">
							<image src="/static/home/添加移除排序.png" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">添加移除/排序链接</text>
						</view>
					</view>
				</view>
				<view class="wp-title">分组管理</view>
				<view class="wp-list">
					<view class="wp-between" @click="showHomeChinese">
						<view class="wp-item">
							<image src="/static/home/中文标题.png" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">中文标题</text>
						</view>
						<view class="wp-right">
							{{ userInfo.groupSetting.titleCn }}
						</view>
					</view>
					<view class="wp-between" @click="showHomeEnglish">
						<view class="wp-item">
							<image src="/static/home/英文标题.png" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">英文标题</text>
						</view>
						<view class="wp-right">
							{{ userInfo.groupSetting.titleEn }}
						</view>
					</view>
					<view class="wp-between" @click="showCollectionFilterMenu">
						<view class="wp-item">
							<image src="/static/home/排列布局.png" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">排列布局</text>
						</view>
						<view class="wp-right">
							{{ homeLayout.isSingleColumn ? '单列' : '双列' }}
						</view>
					</view>
					<view class="wp-between" @click="removeHome">
						<view class="wp-item">
							<image src="/static/home/从主页删除.png" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text2">从主页删除</text>
						</view>
						<view class="wp-right">
							仅移除链接
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 作品集选择组件 -->
		<portfolio-select ref="portfolioSelect" :show="showAddPortfolioPopup" :portfolioList="filteredPortfolioList"
			mode="portfolio" @close="closeAddPortfolioPopup" :selectedIds="selectedPortfolios"
			@confirm="handleSavePortfolios" @item-click="handlePortfolioClick" @show-options="showCollectionOptions" />

		<!-- 标题编辑组件（使用同一个组件，不同模式） -->
		<portfolio-select ref="titleEditPopup" :show="showTitleEditPopup" mode="title-edit"
			:edit-config="titleEditConfig" @close="closeTitleEditPopup" @confirm="handleSaveTitle" />
		<yun-storage-warning />
	</view>
</template>

<script>
	import env from '@/config/env.js'
	import buildOssImageUrl from '@/utils/imageUtil.js'
	import {
		uploadFile
	} from "@/utils/uploadUtil.js";
	import PortfolioSelect from '@/components/portfolio-select.vue'
	const createDefaultHomeUserInfo = () => ({
		avatar: '',
		background: '',
		nickName: '未登录',
		title: '登录后可编辑个人主页',
		groupSetting: {
			titleCn: '作品集',
			titleEn: 'Portfolio',
			sort: 1,
			type: '0'
		}
	});
	const TEAM_OPERATE_ROLES = {
		ADD_MEMBER: 'canAddMember',
		ADD_SEATS: 'canAddSeats',
		MANAGE_WORKS: 'canManageWorks',
		MANAGE_COLLECTIONS: 'canManageCollections'
	};
	export default {
		components: {
			PortfolioSelect
		},
		data() {
			return {
				systemBarHeight: 0,
				ossUrl: env.aliyunUrl,
				currentTab: 0, // 0:主页, 1:作品, 2:作品集
				currentSwiperIndex: 0, // 记录swiper组件的当前索引，确保布局状态与显示的内容保持一致
				isSingleColumn: false, // 控制作品列表单双列
				portfolioLayout: {
					isSingleColumn: false, // 控制作品集列表单双列
				},
				homeLayout: {
					isSingleColumn: false, // 主页推荐作品集的布局
				},
				isTeamMode: false, // 是否处于团队模式
				isPCDevice: false, // 是否为 PC 端
				fromTabBar: false, // 是否通过底部tab栏进入
				// 排序状态
				isWorksSorted: false,
				isCollectionsSorted: false,
				loggedIn: false,
				wechatId: 'your_wechat_id',
				phoneNumber: '13800138000',
				pageNum: 1,
				pageSize: 6,
				// 作品分页状态
				worksPageNum: 1,
				worksNoMore: false,
				worksLoadingMore: false,
				// 作品集分页状态
				collectionsPageNum: 1,
				collectionsNoMore: false,
				collectionsLoadingMore: false,
				userInfo: createDefaultHomeUserInfo(),
				// 搜索关键词
				workSearchKeyword: '',
				collectionSearchKeyword: '',
				progress: 0, // 进度条
				loading: false, // 按钮状态
				stageText: '处理中...', // 打包/下载文字
				taskId: '', // 后台任务ID
				message: '', // 错误或提示
				timer: null, // 轮询定时器
				tabChangeTimer: null, // 延后处理 tab 切换后的重任务
				scrollRestoreTimer: null, // 延后恢复列表滚动位置
				homeInitTimer: null, // 首屏主页数据初始化兜底
				shareUrl: '', // 用于分享的下载链接
				// 滚动位置保存
				worksScrollTop: 0,
				collectionsScrollTop: 0,
				// 用于强制更新 scroll-top 的值，初始为 null 让 scroll-view 不受控制
				worksScrollTopValue: null,
				collectionsScrollTopValue: null,
				// 下拉刷新状态
				worksRefreshing: false, // Tab1 作品列表是否正在刷新
				collectionsRefreshing: false, // Tab2 作品集列表是否正在刷新
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
				showHomeCollectionPopup: false,
				// 背景图管理弹窗相关
				showBgManagerPopup: false,
				showUploadTypePopup: false,
				bgImages: [], // 存放上传的图片路径
				bgImageItems: [], // 带唯一ID的图片项数组
				uploadProgress: {}, // 存储上传进度
				// 拖拽相关状态
				isDragging: false,
				draggingIndex: -1,
				placeholderIndex: -1,
				startPosition: null,
				currentPosition: null,
				originalIndex: -1,
				gridInfo: null,
				// 主页弹窗属性
				showAddPortfolioPopup: false,
				// Tab 0: 主页推荐
				homeCollections: {
					data: [],
					total: 0
				},
				homeCollectionsLoading: false,
				homeCollectionsLoaded: false,
				showcaseList: [],
				showcaseTotal: 0,
				showcaseLoading: false,
				showcaseLoaded: false,

				// Tab 1: 所有作品
				allWorks: {
					worksData: [],
					total: 0
				},
				// 			所有的作品集
				collectionData: {
					data: [],
					total: 0
				},
				// 标题编辑相关
				showTitleEditPopup: false,
				titleEditConfig: {
					title: '',
					placeholder: '',
					value: '',
					type: 'text',
					field: '' // 用于标识编辑哪个字段
				},
				homeWork: {
					data: [],
					total: 0
				},
				// 布局显示
				layoutType: 0,
				selectedPortfolios: [],
				// 切换团队的userId
				teamUserId: 0,
				currentAccountKey: '',
				// 标记是否已经显示了流量不足弹窗
				isFlowWarningShown: false

			};
		},
		computed: {
			swiperCurrentIndex() {
				if (!this.isTeamMode) {
					return this.currentTab;
				}
				return this.currentTab === 2 ? 1 : 0;
			},
			bannerList() {
				const list = this.getBackgroundList(this.userInfo.background || '');
				if (list.length === 0) {
					return ['https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg.jpg','https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg2.jpg'];
				}
				return list.map(url => this.resolveUrl(url));
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
			},
			currentIsSingleColumn() {
				// 使用 currentSwiperIndex 来获取当前实际显示的标签页索引
				// 这样可以确保在滑动过程中布局状态与显示的内容保持一致
				const currentIndex = this.currentSwiperIndex;
				if (currentIndex === 0) {
					return this.userInfo.groupSetting && this.userInfo.groupSetting.sort === 0;
				} else if (currentIndex === 1) {
					return this.isSingleColumn;
				} else if (currentIndex === 2) {
					return this.portfolioLayout.isSingleColumn;
				}
				// 回退到基于currentTab的计算
				if (this.currentTab === 0) {
					return this.userInfo.groupSetting && this.userInfo.groupSetting.sort === 0;
				} else if (this.currentTab === 1) {
					return this.isSingleColumn;
				} else if (this.currentTab === 2) {
					return this.portfolioLayout.isSingleColumn;
				}
				return this.isSingleColumn; // 默认
			},
			filteredPortfolioList() {
				return this.collectionData.data.filter(item => item.visibility != "1");
			}
		},
		onLoad(options) {
			this.loggedIn = this.hasLoginToken();
			this.getSysteminfo();
			// 优先从缓存获取用户信息
			const cachedUserInfo = uni.getStorageSync('userInfo');
			if (this.loggedIn && cachedUserInfo) {
				this.updateUserInfo(cachedUserInfo);
			} else if (!this.loggedIn) {
				this.resetGuestState();
			}
			// 处理分享参数
			if (options.shareUrl) {
				// 解码并保存分享链接
				this.shareUrl = decodeURIComponent(options.shareUrl);
				// 提示用户有分享的下载链接
				uni.showModal({
					title: '分享提示',
					content: '您收到了一个作品压缩包分享，是否需要下载？',
					confirmText: '立即下载',
					cancelText: '稍后再说',
					success: (res) => {
						if (res.confirm) {
							// 直接调用下载方法
							this.downloadZip(this.shareUrl);
						}
					}
				});
			}
			// 处理团队模式参数
			if (options.isTeamMode !== undefined) {
				this.isTeamMode = options.isTeamMode === 'true';
			}
		},
		onHide() {
			this.saveHomeTab();
			clearTimeout(this.tabChangeTimer);
			clearTimeout(this.scrollRestoreTimer);
			clearTimeout(this.homeInitTimer);
			uni.$off('home-tab-reset');

		},
		onReady() {
			this.scheduleCurrentTabInitialLoad(80);
		},
		onShow() {
			// 隐藏原生 TabBar，使用自定义的
			uni.hideTabBar({
				animation: false
			});
			this.loggedIn = this.hasLoginToken();
			// 重置流量警告标记
			this.isFlowWarningShown = false;
			if (this.loggedIn) {
				// 检测是否处于团队模式
				this.checkTeamMode();
			} else {
				this.resetGuestState();
			}
			const accountModeChanged = this.checkAccountContextChanged();
			const needRefreshHomeCollections = uni.getStorageSync('homeCollectionsNeedRefresh');
			if (needRefreshHomeCollections) {
				uni.removeStorageSync('homeCollectionsNeedRefresh');
			}
			uni.$off('home-tab-reset');
			uni.$on('home-tab-reset', () => {
				this.checkTeamMode();
				const targetTab = this.isTeamMode ? 1 : 0;
				this.currentTab = targetTab;
				this.currentSwiperIndex = targetTab;
				this.saveHomeTab(targetTab);
				if (this.loggedIn) {
					this.resetAccountScopedData();
					this.refreshData();
				}
			});
			if (this.loggedIn && accountModeChanged) {
				const targetTab = this.isTeamMode ? 1 : 0;
				this.currentTab = targetTab;
				this.currentSwiperIndex = targetTab;
				this.saveHomeTab(targetTab);
				this.refreshData();
				return;
			}
			const savedHomeTab = uni.getStorageSync('lastHomeTab');
			uni.removeStorageSync('tabIndex');
				// 从底部 tabbar 切换回来：读取持久化的最后选中 tab
				console.log('onShow else分支, lastHomeTab:', savedHomeTab, 'currentTab:', this.currentTab);
				const restoredTab = this.normalizeHomeTab(savedHomeTab !== undefined && savedHomeTab !== null && savedHomeTab !== '' ? savedHomeTab : this.currentTab);
				this.currentTab = restoredTab;
				this.currentSwiperIndex = restoredTab;
				this.saveHomeTab(restoredTab);
				// 主页 tab 首次进入时，必须确保代表作品集请求已执行
				if (this.loggedIn && restoredTab === 0) {
					this.ensureHomeTabData();
				} else if (this.loggedIn && this.allWorks.worksData.length === 0 && this.collectionData.data.length === 0) {
					this.loadTabData(restoredTab);
				}
				if (this.loggedIn && needRefreshHomeCollections) {
					this.homeCollectionsLoaded = false;
					this.getHomeCollections();
					if (restoredTab === 2) {
						this.getUserCollections();
					}
				}
			
			this.scheduleCurrentTabInitialLoad(120);
		},

			// 从子页面返回时强制刷新当前 tab 第一页（重置分页和滚动位置）
		async forceRefreshCurrentTab(index) {
			if (!this.loggedIn) {
				this.resetGuestState();
				return;
			}
			await this.fetchUserInfo();
			if (!this.homeCollectionsLoaded) {
				await this.getHomeCollections();
			}
			if (index === 1) {
				this.worksScrollTop = 0;
				this.worksScrollTopValue = 0;
				if (this.isTeamMode) {
					this.getTeamWorksData();
				} else {
					this.getUserWorksData();
				}
			} else if (index === 2) {
				this.collectionsScrollTop = 0;
				this.collectionsScrollTopValue = 0;
				if (this.isTeamMode) {
					this.getTeamCollections();
				} else {
					this.getUserCollections();
				}
			}
			// index === 0 主页：fetchUserInfo 和 getHomeCollections 已在上面调用，无需额外处理
		},



		// 下拉刷新
		async onPullDownRefresh() {
			try {
				this.loggedIn = this.hasLoginToken();
				if (!this.loggedIn) {
					this.resetGuestState();
					return;
				}
				// 重置流量警告标记
				this.isFlowWarningShown = false;
				// 重新检测团队模式
				this.checkTeamMode();

				// 主动下拉刷新：重置滚动记录，从头开始
				this.worksScrollTop = 0;
				this.worksScrollTopValue = 0;
				this.collectionsScrollTop = 0;
				this.collectionsScrollTopValue = 0;

				// 根据团队模式获取对应数据
				const dataPromises = [
					this.fetchUserInfo(),
					this.getHomeCollections()
				];

				if (this.isTeamMode) {
					dataPromises.push(this.getTeamWorksData());
					dataPromises.push(this.getTeamCollections());
				} else {
					dataPromises.push(this.getUserWorksData());
					dataPromises.push(this.getUserCollections());
				}

				await Promise.all(dataPromises);
			} catch (e) {
				console.error(e);
			} finally {
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			hasLoginToken() {
				return !!uni.getStorageSync('token');
			},
			normalizeHomeTab(tab) {
				let nextTab = Number(tab);
				if (![0, 1, 2].includes(nextTab)) {
					nextTab = this.isTeamMode ? 1 : 0;
				}
				if (this.isTeamMode && nextTab === 0) {
					nextTab = 1;
				}
				return nextTab;
			},
			saveHomeTab(tab = this.currentTab) {
				uni.setStorageSync('lastHomeTab', this.normalizeHomeTab(tab));
			},
			resetGuestState() {
				this.loggedIn = false;
				this.isTeamMode = false;
				this.teamUserId = 0;
				this.currentAccountKey = '';
				this.userInfo = createDefaultHomeUserInfo();
				this.homeCollections = {
					data: [],
					total: 0
				};
				this.homeCollectionsLoading = false;
				this.homeCollectionsLoaded = false;
				this.showcaseList = [];
				this.showcaseTotal = 0;
				this.showcaseLoading = false;
				this.showcaseLoaded = false;
				this.allWorks = {
					worksData: [],
					total: 0
				};
				this.collectionData = {
					data: [],
					total: 0
				};
			},
			getAccountContextKey() {
				const userInfo = uni.getStorageSync('userInfo') || {};
				const teamOwnerId = uni.getStorageSync('teamOwnerId') || '';
				if (this.isTeamMode) {
					return `team:${teamOwnerId}`;
				}
				return `personal:${userInfo.id || ''}`;
			},
			checkAccountContextChanged() {
				if (!this.loggedIn) {
					this.currentAccountKey = '';
					uni.removeStorageSync('accountModeChanged');
					return false;
				}
				const nextAccountKey = this.getAccountContextKey();
				const hasSwitchFlag = !!uni.getStorageSync('accountModeChanged');
				const hasKeyChanged = !!this.currentAccountKey && this.currentAccountKey !== nextAccountKey;
				this.currentAccountKey = nextAccountKey;
				if (hasSwitchFlag || hasKeyChanged) {
					uni.removeStorageSync('accountModeChanged');
					this.resetAccountScopedData();
					return true;
				}
				return false;
			},
			resetAccountScopedData() {
				this.homeCollections = {
					data: [],
					total: 0
				};
				this.homeCollectionsLoading = false;
				this.homeCollectionsLoaded = false;
				this.showcaseList = [];
				this.showcaseTotal = 0;
				this.showcaseLoading = false;
				this.showcaseLoaded = false;
				this.allWorks = {
					worksData: [],
					total: 0
				};
				this.collectionData = {
					data: [],
					total: 0
				};
				this.homeWork = {
					data: [],
					total: 0
				};
				this.worksPageNum = 1;
				this.collectionsPageNum = 1;
				this.worksNoMore = false;
				this.collectionsNoMore = false;
				this.worksLoadingMore = false;
				this.collectionsLoadingMore = false;
				this.worksScrollTop = 0;
				this.collectionsScrollTop = 0;
				this.worksScrollTopValue = 0;
				this.collectionsScrollTopValue = 0;
				this.currentWorkItem = null;
				this.currentCollectionItem = null;
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
			ensureLoggedIn(redirectUrl = '') {
				if (this.loggedIn || this.hasLoginToken()) {
					this.loggedIn = true;
					return true;
				}
				this.promptLogin(redirectUrl);
				return false;
			},
			checkTeamMode() {
				if (!this.loggedIn) {
					this.isTeamMode = false;
					this.teamUserId = 0;
					return;
				}
				this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
				this.teamUserId = uni.getStorageSync('teamOwnerId')
			},
			// 检查流量是否足够
			async checkFlowStatus() {
				try {
					// 获取流量使用数据
					const flowRes = await this.$request.get('/wechat/flow/findUserFlow');
					if (flowRes.code === 200 && flowRes.data) {
						const flowData = flowRes.data;
						const usedFlow = flowData.usedFlow || 0;
						const totalFlow = flowData.totalFlow || 0;
						const remainingFlow = totalFlow > usedFlow ? totalFlow - usedFlow : 0;
						// console.log('remainingFlow', remainingFlow)
						// 如果流量不足，显示流量不足的弹窗
						if (remainingFlow <= 0 && !this.isFlowWarningShown) {
							uni.$emit('show-storage-warning', {
								msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
								data: '/subpkg-profile/pages/storage-management'
							});
						}
					}
				} catch (flowError) {
					console.error('获取流量数据失败:', flowError);
				}
			},
			refreshData() {
				if (!this.loggedIn) {
					this.resetGuestState();
					return;
				}
				const storedUserInfo = uni.getStorageSync('userInfo') || {};
				const isTeam = storedUserInfo.vipLevel == 'team' || false
				if (this.isTeamMode) {
					// 团队模式下获取团队数据
					this.getTeamWorksData();
					this.getTeamCollections();
				} else {
					// 个人模式下获取个人数据
					this.getUserWorksData();
					this.getUserCollections();
					// 当流量不足时 接口返回状态601 不需要额外调用接口判断
					// this.checkFlowStatus();
				}
				this.fetchUserInfo();
				this.getHomeCollections();
				this.getHomeShowcases();
				// 检查流量是否足够
			},
			scheduleCurrentTabInitialLoad(delay = 0) {
				clearTimeout(this.homeInitTimer);
				this.homeInitTimer = setTimeout(() => {
					this.initCurrentTabData();
				}, delay);
			},
			async initCurrentTabData() {
				this.loggedIn = this.hasLoginToken();
				if (!this.loggedIn) {
					this.resetGuestState();
					return;
				}
				this.checkTeamMode();
				const currentTab = this.isTeamMode && Number(this.currentTab) === 0 ? 1 : Number(this.currentTab || 0);
				this.currentTab = currentTab;
				this.currentSwiperIndex = currentTab;
				if (currentTab === 0) {
					await this.ensureHomeTabData();
					return;
				}
				if (this.allWorks.worksData.length === 0 && this.collectionData.data.length === 0) {
					await this.loadTabData(currentTab);
				}
			},
			async ensureHomeTabData() {
				if (!this.loggedIn || this.isTeamMode) {
					return;
				}
				await this.fetchUserInfo();
				if (!this.homeCollectionsLoaded) {
					await this.getHomeCollections();
				}
				if (!this.showcaseLoaded) {
					await this.getHomeShowcases();
				}
			},
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
				if (!this.loggedIn) {
					this.homeCollections.data = [];
					this.homeCollections.total = 0;
					this.homeCollectionsLoaded = false;
					return;
				}
				if (this.homeCollectionsLoading) {
					return;
				}
				this.homeCollectionsLoading = true;
				try {
					const res = await this.$request.get(
						`/wechat/works/findUserWorksCollectionsPage?pageNum=1&pageSize=10&orderBy=sort&orderType=asc&type=0&visibility=1`
					);

					if (res.code === 200) {
						const data = res.data || {};
						const rows = Array.isArray(res.rows) ? res.rows :
							(Array.isArray(res.data) ? res.data :
								(Array.isArray(data.rows) ? data.rows :
									(Array.isArray(data.list) ? data.list : [])));
						const total = res.total !== undefined ? res.total :
							(data.total !== undefined ? data.total : rows.length);
						this.homeCollections.data = rows;
						this.homeCollections.total = Number(total) || rows.length;
						this.homeCollectionsLoaded = true;
					} else if (res.code === 601 && !this.isFlowWarningShown) {
						// 流量不足，显示流量不足弹窗
						this.isFlowWarningShown = true;
						uni.$emit('show-storage-warning', {
							msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
							data: '/subpkg-profile/pages/storage-management'
						});
					}
				} catch (error) {
					console.error('获取主页作品集失败:', error);
				} finally {
					this.homeCollectionsLoading = false;
				}
			},
			async getHomeShowcases() {
				if (!this.loggedIn || this.isTeamMode) {
					this.showcaseList = [];
					this.showcaseTotal = 0;
					this.showcaseLoaded = false;
					return;
				}
				if (this.showcaseLoading) {
					return;
				}
				this.showcaseLoading = true;
				try {
					const res = await this.$request.get('/wechat/showCase/myShowcase/list', {
						pageNum: 1,
						pageSize: 20,
						status: 1
					});
					const rows = Array.isArray(res.rows) ? res.rows : [];
					this.showcaseList = rows;
					this.showcaseTotal = Number(res.total) || rows.length;
					this.showcaseLoaded = true;
				} catch (error) {
					console.error('获取橱窗列表失败:', error);
					this.showcaseList = [];
					this.showcaseTotal = 0;
				} finally {
					this.showcaseLoading = false;
				}
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
					if (text[0] === '[') {
						try {
							const parsed = JSON.parse(text);
							return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
						} catch (e) {
							return [];
						}
					}
					return [text];
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
			// 从主页移除作品集
			removeHome() {
				uni.showModal({
					title: '提示',
					content: '确定要从主页删除吗？',
					success: (res) => {
						if (res.confirm) {
							this.$request.delete('/wechat/home/delete').then(response => {
								if (response.code == 200) {
									uni.showToast({
										title: '删除成功',
										icon: 'success'
									})
									this.showHomeCollectionPopup = false
									this.getHomeCollections()
									this.getUserCollections()
								} else {
									uni.showToast({
										title: '删除失败',
										icon: 'none'
									})
									this.showHomeCollectionPopup = false
									this.getHomeCollections()
									this.getUserCollections()
								}
							})
						}
					}
				});

			},
			handlePortfolio() {
				this.saveHomeTab();
				uni.navigateTo({
					url: '/subpkg-library/pages/portfolio-sort/portfolio-sort'
				})
				this.showHomeCollectionPopup = false
			},
			// 显示中文标题编辑弹窗
			showHomeChinese() {
				this.titleEditConfig = {
					title: '标题(中文)',
					placeholder: '请输入中文标题',
					value: this.userInfo.groupSetting.titleCn,
					type: 'text',
					field: 'chinese'
				};
				this.showTitleEditPopup = true;
				this.showHomeCollectionPopup = false
			},

			// 显示英文标题编辑弹窗  
			showHomeEnglish() {
				this.titleEditConfig = {
					title: '标题(英文)',
					placeholder: '请输入英文标题',
					value: this.userInfo.groupSetting.titleEn,
					type: 'text',
					field: 'english'
				};
				this.showTitleEditPopup = true;
				this.showHomeCollectionPopup = false
			},

			// 关闭标题编辑弹窗
			closeTitleEditPopup() {
				this.showTitleEditPopup = false;
			},

			// 保存标题编辑
			async handleSaveTitle(value) {
				if (!value || !value.trim()) {
					uni.showToast({
						title: '标题不能为空',
						icon: 'none'
					});
					return;
				}

				// 显示加载
				uni.showLoading({
					title: '保存中...'
				});

				try {
					// 1. 更新本地数据
					if (this.titleEditConfig.field === 'chinese') {
						this.userInfo.groupSetting.titleCn = value;
					} else if (this.titleEditConfig.field === 'english') {
						this.userInfo.groupSetting.titleEn = value;
					}

					// 2. 调用接口保存到后端
					const requestData = {
						titleCn: this.userInfo.groupSetting.titleCn,
						titleEn: this.userInfo.groupSetting.titleEn,
						sort: this.layoutType
					};

					const res = await this.$request.put('/wechat/home/updateSet', requestData);

					if (res.code === 200) {
						// 保存成功
						uni.hideLoading();
						this.closeTitleEditPopup();
						this.fetchUserInfo()
						uni.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 1500
						});
					} else {
						// 保存失败
						uni.hideLoading();
						uni.showToast({
							title: res.msg || '保存失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('保存标题失败:', error);
					uni.hideLoading();
					uni.showToast({
						title: '网络错误，请稍后重试',
						icon: 'none'
					});
				}
			},
			// 请求页面布局设置
			async layout(value) {
				const params = {
					titleCn: this.userInfo.groupSetting.titleCn,
					titleEn: this.userInfo.groupSetting.titleEn,
					sort: value
				};
				const res = await this.$request.put('/wechat/home/updateSet', params);
				if (res.code == 200) {
					this.fetchUserInfo();
					this.getHomeCollections()
				}
			},
			async addPortfolioLink() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				// 确保有作品集数据
				const storedUserInfo = uni.getStorageSync('userInfo') || {};
				const isTeam = storedUserInfo.vipLevel == 'team' || false
				if (this.isTeamMode || isTeam) {
					this.getTeamCollections();
				}
				await this.getUserCollections();
				this.showAddPortfolioPopup = true;
			},

			// 保存作品集选择
			async handleSavePortfolios(selectedIds) {
				// console.log('selectedIds', selectedIds)
				uni.showLoading({
					title: '保存中...'
				});
				try {
					const res = await this.$request.put('/wechat/home/setTop', {
						worksCollectionsIds: selectedIds,
						isTop: "1"
					});

					if (res.code === 200) {
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						});

						this.closeAddPortfolioPopup();

						// 重新获取主页作品集显示
						this.getHomeCollections();
					} else {
						uni.showToast({
							title: res.msg || '保存失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('保存失败:', error);
					uni.showToast({
						title: '保存失败，请稍后重试',
						icon: 'none'
					});
				} finally {
					uni.hideLoading();
				}
			},

			// 关闭弹窗
			closeAddPortfolioPopup() {
				this.showAddPortfolioPopup = false;
				this.selectedPortfolios = []

			},


			buildOssImageUrl,
			getCollectionTagsCount(item) {
				if (!item) return 0;
				if (typeof item.tagsCount === 'number') {
					return item.tagsCount;
				}
				if (typeof item.tags === 'number') {
					return item.tags;
				}
				if (Array.isArray(item.tags)) {
					return item.tags.length;
				}
				if (typeof item.tags !== 'string') {
					return 0;
				}
				const tags = item.tags.trim();
				if (!tags) {
					return 0;
				}
				if (/^\d+$/.test(tags)) {
					return Number(tags);
				}
				try {
					const parsedTags = JSON.parse(tags);
					if (Array.isArray(parsedTags)) {
						return parsedTags.length;
					}
					if (typeof parsedTags === 'number') {
						return parsedTags;
					}
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
			// 获取系统栏高度
			getSysteminfo() {
				// uni.getSystemInfo({
				// 	success: res => {
				// 		this.systemBarHeight = res.statusBarHeight;
				// 		// 检测是否为 PC 端
				// 		this.isPC = res.platform === 'devtools' || res.deviceType === 'pc';
				// 	}
				// });
				uni.getSystemInfo({
					success: res => {
						this.systemBarHeight = res.statusBarHeight;
						// 检测是否为 PC 端
						this.isPCDevice = res.platform === 'devtools'
						    || res.platform === 'windows'
						    || res.platform === 'mac';
					}
				});
			},
			// 更改背景图 - 打开管理弹窗
			changeBackground() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				if (this.isTeamMode) {
					return
				}
				this.openBgManager();
			},

			openBgManager() {
				this.showBgManagerPopup = true;
				// 初始化数据
				this.bgImages = this.getBackgroundList(this.userInfo.background);

				this.bgImageItems = this.bgImages.map((url, index) => ({
					id: `bg_${Date.now()}_${index}`,
					url,
					status: 'completed'
				}));

				this.$nextTick(() => {
					this.initGridInfo();
				});
			},

			closeBgManager() {
				this.showBgManagerPopup = false;
				this.resetDragState();
			},

			async saveBgManager() {
				// 检查是否有正在上传的图片
				if (this.bgImageItems.some(item => item.status === 'uploading')) {
					uni.showToast({
						title: '图片正在上传中，请稍后',
						icon: 'none'
					});
					return;
				}

				if (this.bgImages.length === 0) {
					// 如果没有图片，可能需要确认是否清空，或者设置默认图
					// 这里假设允许为空，或者你可以保留最后一张不让删
				}

				// 后端接收 List<String>，直接传递数组
				const newBackground = this.bgImages;
				uni.showLoading({
					title: '保存中...'
				});
				try {
					await this.updateUserBackground(newBackground);
					this.showBgManagerPopup = false;
					uni.showToast({
						title: '背景更新成功',
						icon: 'success'
					});
				} catch (e) {
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					});
				} finally {
					uni.hideLoading();
				}
			},

			openUploadType() {
				if (this.bgImages.length >= 5) {
					uni.showToast({
						title: '最多上传5张背景图',
						icon: 'none'
					});
					return;
				}
				this.showUploadTypePopup = true;
			},

			chooseBgImage(type) {
				this.showUploadTypePopup = false;
				const allowedExtensions = ['jpg', 'jpeg', 'png'];

				const successHandler = async (res) => {
					// 处理选中的文件
					let files = [];
					if (type === 'album') {
						files = res.tempFiles.map(f => f.tempFilePath);
					} else {
						// 微信聊天记录
						files = res.tempFiles.map(f => f.path);
					}

					for (const filePath of files) {
						const ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
						if (!allowedExtensions.includes(ext)) {
							uni.showToast({
								title: '不支持的文件格式',
								icon: 'none'
							});
							continue;
						}

						// 添加到列表（临时）
						const uniqueId = `bg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
						this.bgImages.push(filePath);
						this.bgImageItems.push({
							id: uniqueId,
							url: filePath,
							status: 'uploading',
							tempUrl: filePath
						});
						this.$set(this.uploadProgress, filePath, 0);

						try {
							const formData = {
								isVerify: "true"
							};
							const result = await uploadFile({
								url: env.baseUrl + "/wechat/basic/upload",
								filePath,
								name: "file",
								formData,
								onProgressUpdate: (progress) => {
									this.$set(this.uploadProgress, filePath, progress.progress);
								}
							});

							if (result.code == 200) {
								// 更新为真实URL
								const idx = this.bgImageItems.findIndex(item => item.id === uniqueId);
								if (idx !== -1) {
									this.bgImageItems[idx].url = result.msg;
									this.bgImageItems[idx].status = 'completed';
									// Sync bgImages: 确保使用更新后的url（服务端路径）
									const bgIdx = this.bgImages.indexOf(filePath);
									if (bgIdx !== -1) {
										this.bgImages[bgIdx] = result.msg;
									}
								}
								this.$delete(this.uploadProgress, filePath);
							} else {
								// 失败处理
								const idx = this.bgImageItems.findIndex(item => item.id === uniqueId);
								if (idx !== -1) {
									this.bgImageItems.splice(idx, 1);
									this.bgImages = this.bgImageItems.map(i => i.url);
								}
								this.$delete(this.uploadProgress, filePath);
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								});
							}
						} catch (e) {
							console.error(e);
							const idx = this.bgImageItems.findIndex(item => item.id === uniqueId);
							if (idx !== -1) {
								this.bgImageItems.splice(idx, 1);
								this.bgImages = this.bgImageItems.map(i => i.url);
							}
							this.$delete(this.uploadProgress, filePath);
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						}
					}
				};

				if (type === 'album') {
					uni.chooseMedia({
						count: 5 - this.bgImages.length,
						mediaType: ['image'],
						sourceType: ['album', 'camera'],
						success: (res) => successHandler(res)
					});
				} else if (type === 'chat') {
					// #ifdef MP-WEIXIN
					wx.chooseMessageFile({
						count: 5 - this.bgImages.length,
						type: 'image',
						success: (res) => successHandler(res),
						fail: console.error
					});
					// #endif
				}
			},

			deleteBgImage(index) {
				this.bgImages.splice(index, 1);
				this.bgImageItems.splice(index, 1);
			},

			// 拖拽相关方法
			initGridInfo() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg-image-grid').boundingClientRect(data => {
					if (data) {
						// 假设是3列，计算itemSize
						// 这里的计算方式需要和CSS保持一致
						// padding 20rpx, gap 12rpx
						// totalWidth = data.width
						// itemSize = (totalWidth - 2*padding - 2*gap) / 3
						// padding=20rpx approx 10px? No, depends on screen.
						// simpler: itemSize = width of first item
						this.imageGridRect = data;
					}
				}).exec();

				query.select('.bg-image-item').boundingClientRect(data => {
					if (data) {
						// 如果有多个，data可能是数组（如果使用selectAll），但select只返回第一个
						this.itemSize = data.width; // 假设正方形
						this.gridInfo = {
							itemSize: data.width,
							gap: (this.imageGridRect.width - 40 / 750 * uni.getWindowInfo().windowWidth -
								3 * data.width) / 2 // 估算gap，或者直接读取
							// 更好的方式是硬编码gap值，因为CSS里写死了
						};
						// 重新计算精确的gap
						// CSS: gap: 12rpx -> 6px (approx)
						// padding: 20rpx -> 10px
						const rpxToPx = uni.getWindowInfo().windowWidth / 750;
						this.gridInfo = {
							itemSize: data.width,
							gap: 12 * rpxToPx,
							padding: 20 * rpxToPx
						};
					}
				}).exec();
			},

			onLongPress(index) {
				if (this.draggingIndex !== -1) {
					this.resetDragState();
					return;
				}
				// 确保gridInfo已初始化
				if (!this.gridInfo || !this.gridInfo.itemSize) {
					// 尝试再次初始化
					const rpxToPx = uni.getWindowInfo().windowWidth / 750;
					const query = uni.createSelectorQuery().in(this);
					query.select('.bg-image-item').boundingClientRect(data => {
						if (data) {
							this.gridInfo = {
								itemSize: data.width,
								gap: 12 * rpxToPx,
								padding: 20 * rpxToPx
							};
							this.startDrag(index);
						}
					}).exec();
					return;
				}
				this.startDrag(index);
			},

			startDrag(index) {
				this.isDragging = true;
				this.draggingIndex = index;
				this.placeholderIndex = index;
				this.originalIndex = index;
				uni.vibrateShort();
			},

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

			onTouchMove(e, index) {
				if (this.draggingIndex === -1 || this.draggingIndex !== index) return;
				const touch = e.touches[0];
				this.currentPosition = {
					x: touch.pageX,
					y: touch.pageY
				};

				if (!this.gridInfo) return;

				const deltaX = this.currentPosition.x - this.startPosition.x;
				const deltaY = this.currentPosition.y - this.startPosition.y;

				// 计算原始位置 (row, col)
				const originRow = Math.floor(this.originalIndex / 3);
				const originCol = this.originalIndex % 3;
				const originLeft = originCol * (this.gridInfo.itemSize + this.gridInfo.gap);
				const originTop = originRow * (this.gridInfo.itemSize + this.gridInfo.gap);

				// 当前中心点
				const currentCenterX = originLeft + deltaX + this.gridInfo.itemSize / 2;
				const currentCenterY = originTop + deltaY + this.gridInfo.itemSize / 2;

				// 计算新的行列
				let col = Math.floor(currentCenterX / (this.gridInfo.itemSize + this.gridInfo.gap));
				let row = Math.floor(currentCenterY / (this.gridInfo.itemSize + this.gridInfo.gap));

				col = Math.max(0, Math.min(col, 2));
				row = Math.max(0, row); // 限制row >= 0，上限取决于图片数量

				let targetIndex = row * 3 + col;
				const maxIndex = this.bgImageItems.length - 1;
				targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));

				if (targetIndex !== this.placeholderIndex) {
					this.placeholderIndex = targetIndex;
					uni.vibrateShort();
				}
			},

			onTouchEnd(e, index) {
				if (this.draggingIndex === index) {
					if (this.originalIndex !== this.placeholderIndex && this.placeholderIndex !== -1) {
						// 交换位置
						const tempItems = [...this.bgImageItems];
						const tempImages = [...this.bgImages];

						const item = tempItems[this.originalIndex];
						const img = tempImages[this.originalIndex];

						// 移除旧位置
						tempItems.splice(this.originalIndex, 1);
						tempImages.splice(this.originalIndex, 1);

						// 插入新位置
						tempItems.splice(this.placeholderIndex, 0, item);
						tempImages.splice(this.placeholderIndex, 0, img);

						this.bgImageItems = tempItems;
						this.bgImages = tempImages;
					}
					this.resetDragState();
				}
			},

			resetDragState() {
				this.draggingIndex = -1;
				this.startPosition = null;
				this.currentPosition = null;
				this.isDragging = false;
				this.originalIndex = -1;
				this.placeholderIndex = -1;
			},

			// 更新用户背景图字段
			async updateUserBackground(backgroundList) {
				try {
					// 后端接收 List<String> 形式的 homeBackground
					// 注意：后端使用了 @RequestParam，所以参数需要拼接到 URL 上
					// 对于 List<String>，Spring MVC 默认支持 ?background=url1&background=url2 的形式
					// 或者逗号分隔 ?background=url1,url2
					const queryString = backgroundList.map(url => `background=${encodeURIComponent(url)}`).join('&');
					// 发送请求
					const res = await this.$request.put(`/wechat/user/editUserBackground?${queryString}`);
					if (res.code === 200) {
						uni.showToast({
							title: '背景更新成功',
							icon: 'success'
						});
						// 刷新用户信息
						this.fetchUserInfo();
					} else {
						uni.showToast({
							title: res.msg || '更新失败',
							icon: 'none'
						});
					}
				} catch (e) {
					uni.showToast({
						title: '网络错误',
						icon: 'none'
					});
				}
			},
			goToEditProfile() {
				if (!this.ensureLoggedIn('/subpkg-profile/pages/edit')) {
					return;
				}
				if (this.isTeamMode) {
					return
				}
				this.saveHomeTab();
				uni.navigateTo({
					url: '/subpkg-profile/pages/edit'
				});
			},

			async loadUserRegion() {
				try {
					let teamOwnerId = uni.getStorageSync('teamOwnerId');
					let url = '/wechat/basic/userRegion';
					if (this.isTeamMode && teamOwnerId) {
						url += `?userId=${teamOwnerId}`;
					}
					const res = await this.$request.get(url);
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
			},
			updateUserInfo(data) {
				this.userInfo = {
					...this.userInfo,
					...data,
					// 兼容处理：优先使用 avatarUrl/homeBackground，如果没有则回退到 avatar/background
					avatar: data.avatarUrl || data.avatar || '',
					background: data.homeBackground || data.background || ''
				};
				this.checkBioOverflow();
			},
			resolveUrl(url) {
				if (!url) return '';
				if (/^(http|https|wxfile|data):/.test(url)) {
					return url;
				}
				return this.ossUrl + url;
			},
			// 获取最新用户信息并更新缓存
			async fetchUserInfo() {
				if (!this.loggedIn) {
					this.userInfo = createDefaultHomeUserInfo();
					return;
				}
				try {
					let teamOwnerId = uni.getStorageSync('teamOwnerId');
					let url = '/wechat/user/getUserInfo';
					if (this.isTeamMode && teamOwnerId) {
						url += `?userId=${teamOwnerId}`;
					}
					const res = await this.$request.get(url);
					if (res.code === 200 && res.data) {
					console.log('library getUserInfo返回:', res.data);
					if (this.isTeamMode && teamOwnerId) {
							this.updateUserInfo(res.data);
						this.loadUserRegion();
						return;
						}
						// 更新本地 userInfo，保留 token
						const oldUserInfo = uni.getStorageSync('userInfo') || {};
						const newUserInfo = {
							...oldUserInfo,
							...res.data
						};
						if (res.data.groupSetting) {
							// 将数据库中的 sort 值映射到布局
							// sort 0: 单列，1: 双列
							this.homeLayout.isSingleColumn = res.data.groupSetting.sort === 0;
							// 保存当前的布局类型
							this.layoutType = res.data.groupSetting.sort || 0;
						}
						uni.setStorageSync('userInfo', newUserInfo);
						this.updateUserInfo(newUserInfo);
					this.loadUserRegion();
				} else if (res.code === 601 && !this.isFlowWarningShown) {
						// 流量不足，显示流量不足弹窗
						this.isFlowWarningShown = true;
						uni.$emit('show-storage-warning', {
							msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
							data: '/subpkg-profile/pages/storage-management'
						});
					}
				} catch (e) {
					console.error('刷新用户信息失败', e);
				}
			},
			// 获取用户设为常用的作品列表
			async getHomeWorkList() {
				const {
					code,
					rows,
					total
				} = await this.$request.get(
					`/wechat/works/findUserWorksPage?pageNum=${this.pageNum}&pageSize=${this.pageSize}&status=1`
				)
				if (code == 200) {
					this.homeWork.data = rows
					this.homeWork.total = total
				} else if (code === 601 && !this.isFlowWarningShown) {
					// 流量不足，显示流量不足弹窗
					this.isFlowWarningShown = true;
					uni.$emit('show-storage-warning', {
						msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
						data: '/subpkg-profile/pages/storage-management'
					});
				}
			},
			// 获取用户作品列表
			async getUserWorksData(isLoadMore = false) {
				if (!this.loggedIn) {
					this.allWorks.worksData = [];
					this.allWorks.total = 0;
					this.worksLoadingMore = false;
					this.worksNoMore = false;
					return;
				}
				// 加载更多时的防重复处理
				if (isLoadMore) {
					if (this.worksNoMore || this.worksLoadingMore) return;
					this.worksLoadingMore = true;
					this.worksPageNum++;
				} else {
					this.worksPageNum = 1;
					this.worksNoMore = false;
				}

				// 构建请求参数，包含搜索关键词
				let url =
					`/wechat/works/findUserWorksPage?pageNum=${this.worksPageNum}&pageSize=${this.pageSize}`;
				if (this.workSearchKeyword.trim()) {
					url += `&title=${encodeURIComponent(this.workSearchKeyword.trim())}`;
				}
				const {
					code,
					rows,
					total
				} = await this.$request.get(url);
				if (code == 200) {
					if (isLoadMore) {
						this.allWorks.worksData = this.allWorks.worksData.concat(rows);
					} else {
						this.allWorks.worksData = rows;
					}
					this.allWorks.total = total;
					// 判断是否已加载全部
					if (this.allWorks.worksData.length >= total || rows.length < this.pageSize) {
						this.worksNoMore = true;
					}
				} else if (code === 601) {
					// 流量不足，显示流量不足弹窗
					uni.$emit('show-storage-warning', {
						msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
						data: '/subpkg-profile/pages/storage-management'
					});
				}
				this.worksLoadingMore = false;
			},
			// 检查团队权限
			async checkTeamPermissions(role) {
				if (!this.loggedIn) {
					return false;
				}
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
			// 获取用户的作品集
			async getUserCollections(isLoadMore = false) {
				if (!this.loggedIn) {
					this.collectionData.data = [];
					this.collectionData.total = 0;
					this.collectionsLoadingMore = false;
					this.collectionsNoMore = false;
					return;
				}
				// 加载更多时的防重复处理
				if (isLoadMore) {
					if (this.collectionsNoMore || this.collectionsLoadingMore) return;
					this.collectionsLoadingMore = true;
					this.collectionsPageNum++;
				} else {
					this.collectionsPageNum = 1;
					this.collectionsNoMore = false;
				}

				// 构建请求参数，包含搜索关键词
				let url =
					`/wechat/works/findUserWorksCollectionsPage?pageNum=${this.collectionsPageNum}&pageSize=${this.pageSize}&type=0`;
				if (this.collectionSearchKeyword.trim()) {
					url += `&name=${encodeURIComponent(this.collectionSearchKeyword.trim())}`;
				}
				const {
					code,
					rows,
					total
				} = await this.$request.get(url);
				if (code == 200) {
					if (isLoadMore) {
						this.collectionData.data = this.collectionData.data.concat(rows);
					} else {
						this.collectionData.data = rows;
					}
					this.collectionData.total = total;
					// 判断是否已加载全部
					if (this.collectionData.data.length >= total || rows.length < this.pageSize) {
						this.collectionsNoMore = true;
					}
				} else if (code === 601) {
					// 流量不足，显示流量不足弹窗
					uni.$emit('show-storage-warning', {
						msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
						data: '/subpkg-profile/pages/storage-management'
					});
				}
				this.collectionsLoadingMore = false;
			},
			// 获取团队作品数据
			async getTeamWorksData(isLoadMore = false) {
				if (!this.loggedIn) {
					this.allWorks.worksData = [];
					this.allWorks.total = 0;
					this.worksLoadingMore = false;
					this.worksNoMore = false;
					return;
				}
				// 加载更多时的防重复处理
				if (isLoadMore) {
					if (this.worksNoMore || this.worksLoadingMore) return;
					this.worksLoadingMore = true;
					this.worksPageNum++;
				} else {
					this.worksPageNum = 1;
					this.worksNoMore = false;
				}

				let url =
					`/wechat/works/findUserWorksPage?pageNum=${this.worksPageNum}&pageSize=${this.pageSize}&userId=${this.teamUserId}`;
				if (this.workSearchKeyword.trim()) {
					url += `&title=${encodeURIComponent(this.workSearchKeyword.trim())}`;
				}
				const res = await this.$request.get(url);
				if (res.code == 200) {
					const processedRows = res.rows.map(item => {
						let componentCount = 0;
						try {
							if (item.imageUrls) {
								const images = JSON.parse(item.imageUrls);
								if (Array.isArray(images)) {
									componentCount = images.length;
								}
							}
						} catch (e) {
							console.warn('Failed to parse imageUrls for work item:', item.id, e);
						}
						return {
							...item,
							componentCount
						};
					});

					if (isLoadMore) {
						this.allWorks.worksData = this.allWorks.worksData.concat(processedRows);
					} else {
						this.allWorks.worksData = processedRows;
					}
					this.allWorks.total = res.total;
					// 判断是否已加载全部
					if (this.allWorks.worksData.length >= res.total || processedRows.length < this.pageSize) {
						this.worksNoMore = true;
					}
				} else if (res.code === 601) {
					// 流量不足，显示流量不足弹窗
					uni.$emit('show-storage-warning', {
						msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
						data: '/subpkg-profile/pages/storage-management'
					});
				}
				this.worksLoadingMore = false;
			},
			// 获取团队作品集数据
			async getTeamCollections(isLoadMore = false) {
				if (!this.loggedIn) {
					this.collectionData.data = [];
					this.collectionData.total = 0;
					this.collectionsLoadingMore = false;
					this.collectionsNoMore = false;
					return;
				}
				// 加载更多时的防重复处理
				if (isLoadMore) {
					if (this.collectionsNoMore || this.collectionsLoadingMore) return;
					this.collectionsLoadingMore = true;
					this.collectionsPageNum++;
				} else {
					this.collectionsPageNum = 1;
					this.collectionsNoMore = false;
				}

				// Using workType=1 based on assumption and pattern in create page
				let url =
					`/wechat/works/findUserWorksCollectionsPage?pageNum=${this.collectionsPageNum}&pageSize=${this.pageSize}&type=0&userId=${this.teamUserId}`;
				if (this.collectionSearchKeyword.trim()) {
					url += `&name=${encodeURIComponent(this.collectionSearchKeyword.trim())}`;
				}
				const res = await this.$request.get(url);
				if (res.code == 200) {
					const processedRows = res.rows.map(item => {
						let tagsCount = 0;
						try {
							if (item.tags) {
								const tags = JSON.parse(item.tags);
								if (Array.isArray(tags)) {
									tagsCount = tags.length;
								}
							}
						} catch (e) {
							console.warn('Failed to parse tags for collection item:', item.id, e);
						}
						return {
							...item,
							tagsCount
						};
					});

					if (isLoadMore) {
						this.collectionData.data = this.collectionData.data.concat(processedRows);
					} else {
						this.collectionData.data = processedRows;
					}
					this.collectionData.total = res.total;
					// 判断是否已加载全部
					if (this.collectionData.data.length >= res.total || processedRows.length < this.pageSize) {
						this.collectionsNoMore = true;
					}
				} else if (res.code === 601) {
					// 流量不足，显示流量不足弹窗
					uni.$emit('show-storage-warning', {
						msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
						data: '/subpkg-profile/pages/storage-management'
					});
				}
				this.collectionsLoadingMore = false;
			},
			changeTab(index) {
				// 团队模式下，主页标签（index=0）不存在，自动切换到作品标签（index=1）
				if (this.isTeamMode && index === 0) {
					index = 1;
				}
				if (this.currentTab === index) {
					return;
				}
				// 点击 tab 只驱动 swiper 切换，数据加载放到 change 后执行，避免动画期间卡顿
				this.currentTab = index;
				// 持久化记录当前 tab，确保从 tabbar 切换回来后能恢复
				this.saveHomeTab(index);
			},
			shouldRenderTab(index) {
				if (this.isTeamMode && index === 0) {
					return false;
				}
				return Math.abs(index - this.currentSwiperIndex) <= 1 || index === this.currentTab;
			},
			// 根据标签页加载对应数据
			async loadTabData(index) {
				if (!this.loggedIn) {
					return;
				}
				// 主页代表作品集依赖用户主页设置，刷新进入时先拿到用户信息再请求列表
				if (index === 0 || !this.userInfo.id) {
					await this.fetchUserInfo();
				}
				if (!this.homeCollectionsLoaded) {
					await this.getHomeCollections();
				}

				// 根据不同标签页加载对应数据
				if (index === 1) { // 作品标签
					// 有数据时不重新请求，保留已加载的多页数据和滚动位置
					if (this.allWorks.worksData.length === 0) {
						if (this.isTeamMode) {
							this.getTeamWorksData();
						} else {
							this.getUserWorksData();
						}
					}
				} else if (index === 2) { // 作品集标签
					// 有数据时不重新请求，保留已加载的多页数据和滚动位置
					if (this.collectionData.data.length === 0) {
						if (this.isTeamMode) {
							this.getTeamCollections();
						} else {
							this.getUserCollections();
						}
					}
				}
			},
			handleSwiperChange(e) {
				const swiperIndex = e.detail.current;
				const newTab = this.isTeamMode ? swiperIndex + 1 : swiperIndex;
				const oldTab = this.currentSwiperIndex;
				if (oldTab !== newTab && !this.isPCDevice) {
					uni.vibrateShort({
						type: 'light',
						fail: () => {}
					});
				}
				this.currentTab = newTab;
				this.currentSwiperIndex = newTab;
				this.saveHomeTab(newTab);

				clearTimeout(this.tabChangeTimer);
				clearTimeout(this.scrollRestoreTimer);
				this.tabChangeTimer = setTimeout(() => {
					this.loadTabData(newTab);
					this.scrollRestoreTimer = setTimeout(() => {
						if (newTab === 1) {
							this.restoreWorksScrollPosition();
						} else if (newTab === 2) {
							this.restoreCollectionsScrollPosition();
						}
					}, 120);
				}, 260);
			},

			async navigateTo(url) {
				const path = url.split('?')[0];
				const isLoggedIn = this.loggedIn || this.hasLoginToken();
				const checkMap = {
					'/subpkg-library/pages/works/create': {
						role: 'canManageWorks',
						operateType: 0,
						type: 0
					},
					'/subpkg-library/pages/collection/create': {
						role: 'canManageCollections',
						operateType: 0,
						type: 1
					}
				};

				// 检查权限
				if (isLoggedIn && checkMap[path]) {
					try {
						// 如果是团队模式，检查团队权限
						if (this.isTeamMode) {
							const ok = await this.checkTeamPermissions(checkMap[path].role);
							if (!ok) return;
						}

						// 检查操作权限
						const hasRightParams = {
							operateType: checkMap[path].operateType,
							type: checkMap[path].type
						};
						await this.$request.get('/wechat/basic/hasRight', hasRightParams);
					} catch (e) {
						return;
					}
				}

				// 如果是团队模式，添加 workType=1 参数
				let finalUrl = url;
				if (this.isTeamMode && (path === '/subpkg-library/pages/works/create' || path ===
						'/subpkg-library/pages/collection/create')) {
					if (url.includes('?')) {
						finalUrl += '&workType=1';
					} else {
						finalUrl += '?workType=1';
					}
				}

				this.saveHomeTab();
				uni.navigateTo({
					url: finalUrl
				});
			},
			// 处理列表项点击
			handleItemClick(item) {
				if (item.type === 'create') {
					// 跳转到新建发布页
					this.saveHomeTab();
					uni.navigateTo({
						url: `/pages/library/publish?title=${item.title}`
					});
				} else {
					// 跳转到详情页
					this.goToWorkDetail(item);
				}
			},

			goToWorkDetail(item) {
				this.saveHomeTab();
				uni.navigateTo({
					url: `/subpkg-others/pages/works-detail/detail?id=${item.id}`
				});
			},

			goToWorkListDetail(item) {
				this.saveHomeTab();
				uni.navigateTo({
					url: `/subpkg-library/pages/collection/detail?id=${item.id}`
				});
			},

			// 作品管理选项
			showWorkOptions(item) {
				this.currentWorkItem = item;
				this.showWorkPopup = true;
			},
			closeWorkPopup() {
				this.showWorkPopup = false;
			},
			// 处理分享点击
			handleShareClick() {
				// 关闭弹窗
				this.closeWorkPopup();
				uni.showToast({
					title: '该作品仅自己可见，无法分享给他人',
					icon: 'none'
				});
			},
			async handleEditWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				this.saveHomeTab();
				uni.navigateTo({
					url: `/subpkg-library/pages/works/create?id=${this.currentWorkItem.id}&title=${this.currentWorkItem.title}${this.isTeamMode ? '&workType=1' : ''}`
				});
			},
			async handleVisableWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
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
										// 直接更新本地对应项的 hide 字段
										const id = this.currentWorkItem.id;
										const item = this.allWorks.worksData.find(w => w.id === id);
										if (item) item.hide = newIsHide;
										this.getHomeCollections();
										uni.showToast({
											title: '设置成功',
											icon: 'none'
										});
									}
								})
						}
					}
				});
			},
			async handleDeleteWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除该作品吗？',
					success: (modalRes) => {
						if (modalRes.confirm) {
							this.$request.delete(
									`/wechat/works/deleteWork/${this.currentWorkItem.id}`
								)
								.then(res => {
									if (res.code == 200) {
										// 直接从本地数组移除，不重新请求接口，不重置分页
										const id = this.currentWorkItem.id;
										this.allWorks.worksData = this.allWorks.worksData.filter(
											item => item.id !== id);
										this.allWorks.total = Math.max(0, this.allWorks.total - 1);
										// 主页作品集数据仍需刷新（因为封面可能变化）
										this.getHomeCollections()
										// 如果是在推荐列表，也刷新推荐列表
										if (this.currentTab === 0) {
											this.getHomeWorkList();
										}
										uni.showToast({
											title: res.msg,
											icon: 'none'
										});
									}
								})
						}
					}
				});
			},
			async handleToggleFrequent() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
					if (!ok) return;
				}

				// 切换状态：如果当前是置顶(1)，则取消置顶(0)；否则设置为置顶(1)
				const newStatus = this.currentWorkItem.status == '1' ? 0 : 1;
				const param = {
					status: newStatus,
					id: this.currentWorkItem.id
				};
				this.$request.put(`/wechat/works/setWorkStatus`, param)
					.then(res => {
						if (res.code == 200) {
							// 直接更新本地对应项的 status 字段
							const id = this.currentWorkItem.id;
							const item = this.allWorks.worksData.find(w => w.id === id);
							if (item) item.status = String(newStatus);
							this.getHomeWorkList();
							uni.showToast({
								title: newStatus == 1 ? '置顶成功' : '取消置顶成功',
								icon: 'success'
							});
						}
					});

			},
			async handleCollectionFrequent() {
				if (!this.currentCollectionItem) return;
				this.closeCollectionPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
					if (!ok) return;
				}

				// 切换状态：如果当前是置顶(1)，则取消置顶(0)；否则设置为置顶(1)
				const newStatus = this.currentCollectionItem.isTop == 1 ? 0 : 1;
				const param = {
					isTop: newStatus,
					id: this.currentCollectionItem.id
				};
				this.$request.put(`/wechat/works/editCollectionsIsTop`, param)
					.then(res => {
						if (res.code == 200) {
							// 直接更新本地对应项的 isTop 字段
							const id = this.currentCollectionItem.id;
							const item = this.collectionData.data.find(c => c.id === id);
							if (item) item.isTop = newStatus;
							this.getHomeCollections();
							uni.showToast({
								title: newStatus == 1 ? '置顶成功' : '取消置顶成功',
								icon: 'success'
							});
						}
					});
			},
			handleDownloadWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				this.downloadWorks('work', this.currentWorkItem.id);
			},
			handleDownloadCollection() {
				this.closeCollectionPopup();
				this.downloadWorks('collection', this.currentCollectionItem.id);
			},
			// 判断是否是电脑端
			isPC() {
				const deviceInfo = uni.getDeviceInfo();
				return deviceInfo.platform === 'windows' || deviceInfo.platform === 'mac';
			},

			// 判断是否已登录
			isLoggedIn() {
				const userInfo = uni.getStorageSync('userInfo');
				return !!userInfo && !!userInfo.id;
			},

			// 处理压缩包下载
			async downloadZip(resourceType, id) {
				const userInfo = uni.getStorageSync('userInfo') || {};
				const teamInfo = uni.getStorageSync('teamInfo') || null;
				uni.showLoading({
					title: '生成压缩包...',
					mask: true
				});
				const res = await this.$request.post('/wechat/basic/downLoadWorksPc', {
					id: id,
					resourceType: resourceType,
					userName: this.isTeamMode && teamInfo ? teamInfo.nickName : userInfo.nickName || ''
				});
				if (res.code === 200 && res.data) {
					uni.hideLoading();
					// 打开下载链接
					// window.open(res.data);
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

			async downloadWorks(type, id) {
				// 检查是否是电脑端且已登录
				const isPC = this.isPC();
				const isLoggedIn = this.isLoggedIn();

				if (isPC && isLoggedIn) {
					// 电脑端且已登录，使用压缩包下载
					this.downloadZip(type, id);
				} else {
					// 移动端或未登录，使用原有的文件下载方式
					uni.showLoading({
						title: '获取文件列表...',
						mask: true
					});
					try {
						const res = await this.$request.post('/wechat/basic/downLoadWorks', {
							id: id,
							resourceType: type
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
							title: '用户案列暂不支持下载',
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
			// 作品搜索功能
			searchWorks() {
				// console.log('搜索作品:', this.workSearchKeyword);
				// 搜索时重置滚动位置
				this.worksScrollTop = 0;
				this.worksScrollTopValue = 0;
				// 根据团队模式调用对应的方法
				if (this.isTeamMode) {
					this.getTeamWorksData();
				} else {
					this.getUserWorksData();
				}
			},
			// 作品集搜索功能
			searchCollections() {
				// console.log('搜索作品集:', this.collectionSearchKeyword);
				// 搜索时重置滚动位置
				this.collectionsScrollTop = 0;
				this.collectionsScrollTopValue = 0;
				// 根据团队模式调用对应的方法
				if (this.isTeamMode) {
					this.getTeamCollections();
				} else {
					this.getUserCollections();
				}
			},
			// 作品列表滚动触底加载更多
			onWorksScrollToLower() {
				if (this.isTeamMode) {
					this.getTeamWorksData(true);
				} else {
					this.getUserWorksData(true);
				}
			},
			// 作品集列表滚动触底加载更多
			onCollectionsScrollToLower() {
				if (this.isTeamMode) {
					this.getTeamCollections(true);
				} else {
					this.getUserCollections(true);
				}
			},
			// PC端点击刷新作品（不重置滚动位置，避免抖动）
			async onWorksRefreshPC() {
				if (this.worksRefreshing) return;
				this.worksRefreshing = true;
				// 刷新前先断开 scroll-top 绑定，避免数据更新时触发跳位抖动
				const savedScrollTop = this.worksScrollTop;
				this.worksScrollTopValue = null;
				try {
					if (this.isTeamMode) {
						await this.getTeamWorksData();
					} else {
						await this.getUserWorksData();
					}
				} catch (e) {
					console.error('刷新作品失败', e);
				} finally {
					this.worksRefreshing = false;
					// 数据加载完成后恢复到顶部
					this.$nextTick(() => {
						this.worksScrollTop = 0;
						this.worksScrollTopValue = 0;
						// 再次断开绑定，防止后续滚动时重复跳位
						setTimeout(() => {
							this.worksScrollTopValue = null;
						}, 100);
					});
				}
			},
			// PC端点击刷新作品集（不重置滚动位置，避免抖动）
			async onCollectionsRefreshPC() {
				if (this.collectionsRefreshing) return;
				this.collectionsRefreshing = true;
				// 刷新前先断开 scroll-top 绑定，避免数据更新时触发跳位抖动
				this.collectionsScrollTopValue = null;
				try {
					if (this.isTeamMode) {
						await this.getTeamCollections();
					} else {
						await this.getUserCollections();
					}
				} catch (e) {
					console.error('刷新作品集失败', e);
				} finally {
					this.collectionsRefreshing = false;
					// 数据加载完成后回到顶部
					this.$nextTick(() => {
						this.collectionsScrollTop = 0;
						this.collectionsScrollTopValue = 0;
						setTimeout(() => {
							this.collectionsScrollTopValue = null;
						}, 100);
					});
				}
			},
			// Tab1 作品列表下拉刷新
			async onWorksRefresh() {
				if (this.worksRefreshing) return; // 防重复
				this.worksRefreshing = true;

				// 重置滚动位置
				this.worksScrollTop = 0;
				this.worksScrollTopValue = null;

				try {
					if (this.isTeamMode) {
						await this.getTeamWorksData();
					} else {
						await this.getUserWorksData();
					}
				} catch (e) {
					console.error('刷新作品失败', e);
				} finally {
					this.worksRefreshing = false;
				}
			},
			// Tab2 作品集列表下拉刷新
			async onCollectionsRefresh() {
				if (this.collectionsRefreshing) return; // 防重复
				this.collectionsRefreshing = true;

				// 重置滚动位置
				this.collectionsScrollTop = 0;
				this.collectionsScrollTopValue = null;

				try {
					if (this.isTeamMode) {
						await this.getTeamCollections();
					} else {
						await this.getUserCollections();
					}
				} catch (e) {
					console.error('刷新作品集失败', e);
				} finally {
					this.collectionsRefreshing = false;
				}
			},
			// 作品列表滚动事件 - 保存滚动位置
			onWorksScroll(e) {
				this.worksScrollTop = e.detail.scrollTop;
			},
			// 作品集列表滚动事件 - 保存滚动位置
			onCollectionsScroll(e) {
				this.collectionsScrollTop = e.detail.scrollTop;
			},
			// 恢复作品列表滚动位置
			restoreWorksScrollPosition() {
				const targetScrollTop = this.worksScrollTop;
				if (targetScrollTop <= 0) return;
				this.worksScrollTopValue = targetScrollTop;
			},
			// 恢复作品集列表滚动位置
			restoreCollectionsScrollPosition() {
				const targetScrollTop = this.collectionsScrollTop;
				if (targetScrollTop <= 0) return;
				this.collectionsScrollTopValue = targetScrollTop;
			},
			// 弹出首页管理作品集
			showHomeCollectionMenu() {
				this.showHomeCollectionPopup = true;
			},
			closeHomeCollectionPopup() {
				this.showHomeCollectionPopup = false;
			},
			// 弹出作品集筛选菜单
			showCollectionFilterMenu() {
				this.showHomeCollectionPopup = false;
				this.showCollectionFilterPopup = true;
			},
			closeCollectionFilterPopup() {
				this.showCollectionFilterPopup = false;
			},
			handleCollectionSingleColumn() {
				if (this.currentTab === 0) {
					this.layoutType = 0
					this.layout(this.layoutType)
				} else if (this.currentTab === 1) {
					this.isSingleColumn = true;
				} else if (this.currentTab === 2) {
					this.portfolioLayout.isSingleColumn = true;
				}

				this.closeCollectionFilterPopup();
			},
			handleCollectionDoubleColumn() {
				if (this.currentTab === 0) {
					this.layoutType = 1
					this.layout(this.layoutType)
				} else if (this.currentTab === 1) {
					this.isSingleColumn = false;
				} else if (this.currentTab === 2) {
					this.portfolioLayout.isSingleColumn = false;
				}

				this.getHomeCollections();
				this.closeCollectionFilterPopup();
			},
			handleSortCollectionDate() {
				this.sortCollectionsByDate();
				this.closeCollectionFilterPopup();
			},

			// 微信小程序分享功能 - 必须使用这个生命周期方法
			onShareAppMessage(res) {
				// 当用户点击右上角分享时调用
				if (res.from === 'button') {
					// 主页分享（点击右上角分享按钮）
					if (this.currentTab === 0 && !this.currentWorkItem && !this.currentCollectionItem) {
						// 获取背景图第一张作为封面
						const bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
						return {
							title: `${this.userInfo.nickName || '用户'}的主页`,
							path: `/subpkg-library/pages/visitor-home?userId=${this.userInfo.id}&isTeamMode=${this.isTeamMode}`,
							imageUrl: bgImg
						};
					}
					if (this.currentWorkItem) {
						// 来自作品管理弹窗的转发
						const work = this.currentWorkItem;
						// 检查作品是否是公开的
						if (work.hide === '1') {
							// 提示用户该作品仅自己可见，无法分享给他人
							uni.showToast({
								title: '该作品仅自己可见，无法分享给他人',
								icon: 'none'
							});
							// 返回 false，阻止分享
							return false;
						}
						return {
							title: work.title || '我的作品',
							path: `/subpkg-others/pages/works-detail/detail?id=${work.id}&isTeamMode=${this.isTeamMode}`,
							imageUrl: this.resolveUrl(this.getFirstImageUrl(work.imageUrls)) || '/static/yunyiku/bg.png'
						};
					} else if (this.currentCollectionItem) {
						// 来自作品集管理弹窗的转发
						const collection = this.currentCollectionItem;
						let imageUrl = collection.coverUrl;
						if (collection.workCoverUrls && collection.workCoverUrls.length > 0) {
							imageUrl = collection.workCoverUrls[0];
						}
						return {
							title: collection.name || '我的作品集',
							path: `/subpkg-library/pages/collection/detail?id=${collection.id}&title=${collection.name}&isTeamMode=${this.isTeamMode}`,
							imageUrl: this.resolveUrl(imageUrl) || '/static/yunyiku/bg.png'
						};
					}
				}

				if (this.shareUrl) {
					// 如果有分享链接，使用链接分享
					return {
						title: '我分享了一个作品压缩包',
						path: `/pages/library/index?shareUrl=${encodeURIComponent(this.shareUrl)}&isTeamMode=${this.isTeamMode}`,
						imageUrl: '/static/yunyiku/bg.png'
					};
				} else {
					// 默认分享
					const bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
					return {
						title: `${this.userInfo.nickName || '用户'}的主页`,
						path: `/subpkg-library/pages/visitor-home?userId=${this.userInfo.id}&isTeamMode=${this.isTeamMode}`,
						imageUrl: bgImg
					};
				}
			},
			// 分享到朋友圈
			onShareTimeline() {
				// 获取背景图第一张作为封面
				const bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
				return {
					title: `${this.userInfo.nickName || '用户'}的主页`,
					query: `userId=${this.userInfo.id}&isTeamMode=${this.isTeamMode}`,
					imageUrl: bgImg
				};
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
						return timeA - timeB;
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
				this.currentCollectionItem = item;
				this.currentWorkItem = null; // 清除作品选中状态，避免分享混淆
				this.showCollectionPopup = true;
			},
			closeCollectionPopup() {
				this.showCollectionPopup = false;
			},
			async handleEditCollection() {
				this.closeCollectionPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
					if (!ok) return;
				}
				this.saveHomeTab();
				uni.navigateTo({
					url: `/subpkg-library/pages/collection/create?id=${this.currentCollectionItem.id}&title=${this.currentCollectionItem.name}&workType=${this.isTeamMode ? 1 : 0}`
				});
			},
			async handleDeleteCollection() {
				this.closeCollectionPopup();
				// 团队模式下检查权限
				if (this.isTeamMode) {
					const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
					if (!ok) return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除该作品集吗？',
					success: (modalRes) => {
						if (modalRes.confirm) {
							this.$request.delete(
									`/wechat/works/deleteWorkCollections/${this.currentCollectionItem.id}`
								)
								.then(res => {
									if (res.code == 200) {
										// 直接从本地数组移除
										const id = this.currentCollectionItem.id;
										this.collectionData.data = this.collectionData.data.filter(
											item => item.id !== id);
										this.collectionData.total = Math.max(0, this.collectionData
											.total - 1);
										this.getHomeCollections();
										uni.showToast({
											title: '删除作品集成功',
											icon: 'none'
										});
									}
								})
						}
					}
				});
			},

			// 按时间排序 (注意要保持 Create 卡片始终在第一个)
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
					// 如果列表为空，直接返回
					if (this.allWorks.worksData.length === 0) {
						uni.showToast({
							title: '暂无作品可排序',
							icon: 'none'
						});
						return;
					}

					// 取出第一个
					const createItem = this.allWorks.worksData.find(i => i.type === 'create');
					// 取出剩余的
					const others = this.allWorks.worksData.filter(i => i.type !== 'create');

					// 对剩余的排序 (日期从大到小)
					others.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));

					// 重新组合
					if (createItem) {
						this.allWorks.worksData = [createItem, ...others];
					} else {
						this.allWorks.worksData = others;
					}

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
					success: () => uni.showToast({
						title: '微信号已复制',
						icon: 'success'
					})
				});
			},
			makePhoneCall() {
				if (!this.userInfo.phone) {
					uni.showToast({
						title: '未绑定手机号',
						icon: 'none'
					});
					return;
				}
				uni.makePhoneCall({
					phoneNumber: this.userInfo.phone
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.status-bar {
		width: 100%;
		background: #ffffff;
		/* 与标题栏背景色一致 */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 101;
	}

	/* 进度条样式 */
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
		height: 420rpx;
		position: absolute;
		// top: 0;
		left: 0;
		z-index: 1;
	}

	/* 主页分享按钮 */
	.home-share-btn {
		position: absolute;
		top: 50rpx;
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
		height: 48px;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		z-index: 100;
		background-color: #ffffff;
		// box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
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
		top:55rpx;
	}

	/* tab-content */
	.tab-content {
		position: relative;
		z-index: 10;

		pointer-events: none;
	}

	.tab-content>view {
		pointer-events: auto;
	}

	.home-mode {
		/* 主页不需要额外顶部间距，因为有背景图 */
	}

	.list-mode {
		/* 列表页没有背景图，稍微加点间距即可 */
	}

	/* User Card (主页) */
	.avatar-wrapper {
		width: 140rpx;
		height: 140rpx;
		position: relative;
		margin: -160rpx auto 0;
		z-index: 20;
	}

	.avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 6rpx solid white;
		background: #fff;
	}

	.user-card {
		width: 92%;
		margin: 120rpx auto 40rpx;
		background: #fff;
		border-radius: 20rpx;
		// box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.05);
		padding: 80rpx 0 10rpx;
		text-align: center;
	}

	.username {
		margin-top: 15rpx;
		font-size: 38rpx;
		font-weight: bold;
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
		gap: 80rpx;
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
		margin-left: 10rpx;
		color: #999;
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
		margin: 20rpx;
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

	.showcase-section-subtitle {
		margin-top: 6rpx;
		font-size: 22rpx;
		color: #999;
		letter-spacing: 1rpx;
		text-transform: lowercase;
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

	.menu-icon {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 48rpx;
		height: 48rpx;
	}

	.add-portfolio-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
		border-top: 1rpx solid #f0f0f0;
		background-color: #fafafa;
		text-align: center;
		margin: 0 20rpx 20rpx 20rpx;
		border-radius: 20rpx;
		height: 125rpx;

	}

	.add-icon {
		width: 48rpx;
		height: 48rpx;
	}

	.add-text {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #999;
		font-weight: 400;
		line-height: 1.4;
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
		;
		/* padding: 15rpx 30rpx; */
		/* border-radius: 40rpx; */

		.search-input-box {
			flex: 1;
			display: flex;
			align-items: center;
			background: #eee;
			padding: 15rpx 30rpx;
			border-radius: 40rpx;
			margin-right: 20rpx;
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

	.work-grid {
		padding: 0rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	/* 卡片基础样式 */
	.work-item {
		width: 48%;
		background: #fff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		padding-bottom: 7rpx;
		overflow: hidden;
		position: relative;
		transition: all 0.2s;

		/* 单列模式 */
		&.single-col {
			width: 100%;
		}
	}

	.more-options {
		width: 50rpx;
		/* 点击区域宽度 */
		height: 50rpx;
		line-height: 50rpx;
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
		/* 非常小的圆点，匹配图片 */
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

	/* ========================================= */
	/*  特殊卡片样式：新建入口 (深灰色背景) */
	/* ========================================= */
	.create-card-wrapper {
		background: transparent !important;
		/* 去掉默认白底 */
		padding-bottom: 0 !important;
		/* 去掉底部留白 */
	}

	.create-card-inner {
		width: 100%;
		height: 340rpx;
		/* 高度与普通图片对齐 */
		background: linear-gradient(135deg, #444, #333);
		/* 深灰渐变 */
		border-radius: 16rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		position: relative;
		transition: height 0.3s ease;
	}

	.create-card-inner.single-img {
		height: 400rpx;
		/* 单列模式下与普通图片高度保持一致 */
	}

	.cc-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		z-index: 2;

		.cc-left {
			display: flex;
			flex-direction: column;
		}

		.cc-title {
			color: rgba(255, 255, 255, 0.95);
			font-size: 26rpx;
			font-weight: bold;
			margin-bottom: 6rpx;
		}

		.cc-sub {
			color: rgba(255, 255, 255, 0.5);
			font-size: 22rpx;
		}

		.cc-more {
			color: rgba(255, 255, 255, 0.8);
			font-weight: bold;
		}
	}

	.cc-body {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: -20rpx;

		.cc-icon {
			width: 100rpx;
			height: 100rpx;
			opacity: 0.8;
			/* 建议在 static/common 下放一个灰色的 box 图标 */
		}
	}

	/* ========================================= */

	/* 普通卡片内容 */
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

	/* 仅自己可见锁定图标样式 */
	.lock-icon {
		position: absolute;
		bottom: 30rpx;
		right: 20rpx;
		width: 40rpx;
		height: 40rpx;
		z-index: 10;
		opacity: 0.9;
	}

	.work-img {
		width: 100%;
		background: #eee;
		transition: height 0.3s ease;
	}

	/* 图片高度控制 */
	.work-img.tall {
		height: 340rpx;
	}

	.work-img.single-img {
		height: 400rpx;
	}

	/* 单列时图片更高一点 */

	.work-title {
		font-size: 28rpx;
		font-weight: bold;
		text-align: left;
		padding: 12rpx 16rpx;
		display: block;
	}

	.work-sub {
		font-size: 24rpx;
		color: #999;
		padding-left: 16rpx;
		margin-top: 6rpx;
	}

	.float-more {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		color: #fff;
		font-weight: bold;
		text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
		font-size: 36rpx;
	}

	.collection-info {
		display: flex;
		justify-content: space-between;
		padding-right: 16rpx;
		align-items: center;
		margin: 6rpx 0;
	}

	.more-small {
		color: #999;
		font-weight: bold;
		letter-spacing: 2rpx;
	}

	/* 多张图片组合展示样式 */
	.multi-img-container {
		position: relative;
		width: 100%;
		height: 100%;
		background: #ffffff;
		overflow: hidden;
		transition: height 0.3s ease;
		border-radius: 12rpx;
	}

	.multi-img-container.tall {
		height: 230rpx;
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

	/* 作品集列表：匹配截图中的轻量卡片样式 */
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

		.collection-card .multi-img-left {
			width: calc(68% - 2rpx);
		}

		.collection-card .multi-img-top-right,
		.collection-card .multi-img-bottom-right {
			width: calc(32% - 2rpx);
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

	.wp-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.wp-right {
		color: #999999;
		font-size: 30rpx;
	}

	.wp-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
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

	.wp-text2 {
		color: #CD0F0F;
		font-size: 32rpx;
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

	/* Background Manager Styles */
	.bg-manager-content {
		max-height: 85vh;
		display: flex;
		flex-direction: column;
	}

	.bg-image-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12rpx;
		padding: 20rpx;
		width: 100%;
		box-sizing: border-box;
		/* Ensure grid has layout */
		position: relative;
	}

	.bg-image-item {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 10rpx;
		overflow: hidden;
		background: #f0f0f0;
		/* Dragging transition */
		transition: transform 0.2s ease;
	}

	.bg-image-item.add-btn {
		border: 2rpx dashed #ccc;
		background: #fafafa;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bg-img-preview {
		width: 100%;
		height: 100%;
		display: block;
	}

	.bg-delete-btn {
		position: absolute;
		top: 5rpx;
		right: 5rpx;
		width: 36rpx;
		height: 36rpx;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		border-radius: 50%;
		text-align: center;
		line-height: 34rpx;
		font-size: 28rpx;
		z-index: 10;
	}

	.bg-save-btn {
		margin: 40rpx 20rpx 20rpx;
		background: #ff7a22;
		color: #fff;
		border-radius: 44rpx;
		font-size: 32rpx;
		height: 88rpx;
		line-height: 88rpx;
	}

	.wp-sub-title {
		text-align: center;
		font-size: 24rpx;
		color: #999;
		margin-bottom: 20rpx;
	}

	/* Dragging styles */
	.bg-image-item.dragging {
		opacity: 0.8;
		box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.2);
		z-index: 999;
		background: #fff;
	}

	.bg-image-item.placeholder {
		opacity: 0.3;
		background: #ddd;
		border: 2rpx dashed #999;
	}

	/* Progress bar small */
	.progress-container-small {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 6rpx;
		background: rgba(0, 0, 0, 0.3);
	}

	.progress-bar-small {
		width: 100%;
		height: 100%;
	}

	.progress-fill-small {
		height: 100%;
		background: #007aff;
		transition: width 0.3s;
	}

	/* Swiper 样式 */
	.main-swiper {
		width: 100%;
		height: calc(100vh - 200rpx);
		position: relative;
		overflow: hidden;
	}

	.main-swiper swiper-item {
		/* overflow-y: auto !important; */
		/* 由 scroll-view 接管滚动 */
		-webkit-overflow-scrolling: touch;
		height: 100%;
		overflow-y: auto;
	}

	/* 确保 tab-content 能够正确显示 */
	.tab-content {
		min-height: 100%;
		padding-bottom: 120rpx;
		/* 为底部导航栏留出空间 */
	}

	/* 主页模式下的内容区域 */
	.tab-content.home-mode {
		// padding-top: 100px;
	}

	/* 列表模式下的内容区域 */
	.tab-content.list-mode {
		padding-top: 20rpx;
	}

	.team-mode-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
	}

	.swiper-tab-placeholder {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
	}

	/* 加载更多提示样式 */
	.load-more-tip {
		text-align: center;
		color: #999;
		font-size: 24rpx;
		padding: 20rpx 0 40rpx;
	}

	.empty-state-card {
		width: 100%;
		padding: 100rpx 0;
		text-align: center;
		color: #999;
	}

	.empty-state-text {
		font-size: 26rpx;
		color: #999;
	}
	.selle-row {
			display: flex;
			justify-content: center;
			gap: 36rpx;
		}
</style>
