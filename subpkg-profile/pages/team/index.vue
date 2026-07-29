<template>
	<view class="page">
		<view class="page-container">
			<!-- Fixed Header Group -->
			<view class="fixed-header">
				<!-- Header Stats -->
				<view class="header-card">
					<view class="stats-container">
						<view class="stat-box">
							<text class="stat-num">{{ stats.empty }}</text>
							<text class="stat-label">空余席位</text>
						</view>
						<view class="stat-box">
							<text class="stat-num">{{ stats.total }}</text>
							<text class="stat-label">总席位数</text>
						</view>
					</view>

					<view class="action-buttons">
						<button class="btn btn-outline" @click="openInvitePopup">添加成员</button>
						<button class="btn btn-primary" @click="openSeatsPopup">增加席位</button>
					</view>
				</view>

				<!-- Tab Navigation -->
				<view class="nav">
					<view class="nav-item" @click="currentTab = 0">
						<text :class="{ active: currentTab === 0 }">成员</text>
						<view class="active-line" v-if="currentTab === 0"></view>
					</view>
				</view>

				<!-- Search Bar (Fixed within Header) -->
				<view v-if="currentTab === 0" class="search-section">
					<view class="search-box">
						<image src="/static/home/搜索.png" class="search-icon"></image>
						<input type="text" v-model="searchQuery" placeholder="搜索成员名称" class="search-input"
							placeholder-class="placeholder-style" />
					</view>
					<view class="section-header-fixed">
						<text class="section-title">团队成员</text>
						<text class="section-count">共{{ filteredMembers.length }}人</text>
					</view>
				</view>

				<view v-if="currentTab === 1" class="search-section">
					<view class="search-bar">
						<view class="search-input-box">
							<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit"
								@click="getTeamWorksData">
							</image>
							<input v-model="workSearchKeyword" placeholder="搜索作品" class="search-input"
								confirm-type="search" @confirm="getTeamWorksData" />
						</view>
						<view class="filter-btn" @click="showFilterMenu">
							<image class="filter-icon" src="/static/icon/筛选.svg" mode="aspectFit"></image>
						</view>
					</view>
					<view class="count-tip-fixed">共有 {{ teamWorks.total }} 个作品</view>
				</view>

				<view v-if="currentTab === 2" class="search-section">
					<view class="search-bar">
						<view class="search-input-box">
							<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit"
								@click="getTeamCollections"></image>
							<input v-model="collectionSearchKeyword" placeholder="搜索作品集" class="search-input"
								confirm-type="search" @confirm="getTeamCollections" />
						</view>
						<view class="filter-btn" @click="showCollectionFilterMenu">
							<image class="filter-icon" src="/static/icon/筛选.svg" mode="aspectFit"></image>
						</view>
					</view>
					<view class="count-tip-fixed">共有 {{ teamCollections.total }} 个作品集</view>
				</view>
			</view>

			<!-- Scrollable Content Area -->
			<scroll-view scroll-y class="content-scroll" :enable-flex="true">
				<!-- Tab 1: Members -->
				<view v-if="currentTab === 0" class="member-section">
					<view class="member-list">
						<view class="member-item" v-for="(item) in filteredMembers" :key="item.id">
							<image :src="resolveAvatar(item.avatarUrl)" class="member-avatar"></image>
							<view class="member-info">
								<view class="name-row">
									<text class="member-name">{{ item.nickName }}</text>
								</view>
								<view class="tags">
									<view v-if="item.role === 'owner'" class="tag super-admin">团长</view>
									<view v-if="item.role === 'member'" class="tag normal">成员</view>
									<view v-if="isMe(item.userId)" class="tag me">我</view>
								</view>
							</view>
							<view class="more-options" @click.stop="openOptionsPopup(item)">
								<view class="dot-row">
									<view class="dot"></view>
									<view class="dot"></view>
									<view class="dot"></view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- Tab 2: Team Works -->
				<view v-if="currentTab === 1" class="works-section list-mode">
					<view class="work-grid">
						<view v-if="teamWorks.total == 0" class="work-item create-card-wrapper"
							:class="{ 'single-col': isSingleColumn }">
							<view class="create-card-inner"
								@click="navigateTo('/subpkg-library/pages/works/create?workType=1')">
								<view class="cc-header">
									<view class="cc-left">
										<text class="cc-title">团队第一个作品</text>
									</view>
								</view>
								<view class="cc-body">
									<image src="/static/yunyiku/没有.png" class="cc-icon" mode="aspectFit"></image>
								</view>
							</view>
						</view>

						<block v-else>
							<view class="work-item" v-for="(item, index) in teamWorks.data" :key="index"
								:class="{ 'single-col': isSingleColumn, 'create-card-wrapper': item.type === 'create' }">

								<view v-if="item.type === 'create'" class="create-card-inner"
									@click="navigateTo('/subpkg-library/pages/works/create?workType=1')">
									<view class="cc-header">
										<view class="cc-left">
											<text class="cc-title">新建作品</text>
										</view>
									</view>
									<view class="cc-body">
										<text style="font-size: 40rpx; color: #999;">+</text>
									</view>
								</view>

								<view v-else @click="goToWorkDetail(item)">
									<view class="img-box">
										<image
											:src="ossBaseUrl + getFirstImageUrl(item.imageUrls)+ '?x-oss-process=image/resize,w_400,h_400'"
											class="work-img"
											:class="{ 'tall': !isSingleColumn, 'single-img': isSingleColumn }"
											mode="aspectFill">
										</image>
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

				<!-- Tab 3: Team Collections -->
				<view v-if="currentTab === 2" class="collections-section list-mode">
					<view class="work-grid">
						<view v-if="teamCollections.total == 0" class="work-item create-card-wrapper"
							:class="{ 'single-col': isSingleColumn }">
							<view class="create-card-inner"
								@click="navigateTo('/subpkg-library/pages/collection/create?workType=1')">
								<view class="cc-header">
									<view class="cc-left">
										<text class="cc-title">团队第一个作品集</text>
									</view>
								</view>
								<view class="cc-body">
									<image src="/static/yunyiku/没有.png" class="cc-icon" mode="aspectFit"></image>
								</view>
							</view>
						</view>

						<block v-else>
							<view class="work-item" v-for="(item, index) in teamCollections.data" :key="index"
								:class="{ 'single-col': isSingleColumn, 'create-card-wrapper': item.type === 'create' }">

								<view v-if="item.type === 'create'" class="create-card-inner"
									@click="navigateTo('/subpkg-library/pages/collection/create?workType=1')">
									<view class="cc-header">
										<view class="cc-left">
											<text class="cc-title">新建作品集</text>
										</view>
									</view>
									<view class="cc-body">
										<text style="font-size: 40rpx; color: #999;">+</text>
									</view>
								</view>

								<view v-else @click="goToCollectionDetail(item)">
									<view class="img-box">
										<image v-if="!item.workCoverUrls || item.workCoverUrls.length <= 1"
											:src="buildOssImageUrl(item.workCoverUrls && item.workCoverUrls.length > 0 ? item.workCoverUrls[0] : item.coverUrl)"
											class="work-img"
											:class="{ 'tall': !isSingleColumn, 'single-img': isSingleColumn }"
											mode="aspectFill">
										</image>
										<view v-else-if="item.workCoverUrls.length === 2" class="multi-img-container"
											:class="{ 'tall': !isSingleColumn, 'single-img': isSingleColumn }">
											<image v-for="(url, imgIndex) in item.workCoverUrls" :key="imgIndex"
												:src="buildOssImageUrl(url)" class="multi-img-item"
												:class="{ 'multi-img-left-half': imgIndex === 0, 'multi-img-right-half': imgIndex === 1 }"
												mode="aspectFill">
											</image>
										</view>
										<view v-else class="multi-img-container"
											:class="{ 'tall': !isSingleColumn, 'single-img': isSingleColumn }">
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
								</view>
							</view>
						</block>
					</view>
				</view>
			</scroll-view>

			<view v-if="progress > 0" class="progress-container">
				<view class="custom-progress">
					<view class="progress-track">
						<view class="progress-bar" :style="{ width: progress + '%', transitionDuration: '0.3s' }">
						</view>
						<view class="progress-glow"></view>
					</view>
					<view class="progress-info">
						<text class="progress-percent">{{ progress }}%</text>
					</view>
				</view>
				<view class="stage-text">{{ stageText }}</view>
			</view>

			<!-- Mask -->
			<view class="mask" v-if="showInvite || showSeats || showOptions || showPermissionPopup || showNicknamePopup"
				@click="closePopups"></view>

			<!-- ===== Invite Popup ===== -->
			<view class="popup-bottom-sheet" v-if="showInvite">
				<view class="sheet-content invite-sheet">
					<view class="drag-handle"></view>
					<view v-if="inviteQrCode" class="invite-card">
						<view class="inviter-info">
							<image
								:src="resolveAvatar(currentTeamMember ? currentTeamMember.avatarUrl : userInfo.avatarUrl)"
								class="inviter-avatar"></image>
							<text class="inviter-name">{{ currentTeamMember ? currentTeamMember.nickName : userInfo.nickName }}</text>
						</view>
						<view class="qr-container">
							<image :src="inviteQrCode" class="qr-code" show-menu-by-longpress></image>
						</view>
						<view class="invite-actions">
							<button class="action-btn save-btn" @click="saveInviteImage">保存图片</button>
							<button class="action-btn share-btn" open-type="share">转发好友</button>
						</view>
					</view>
					<view v-else-if="inviteQrCodeError" class="loading-box" @click="getInviteCode">
						<text>生成失败，点击重试</text>
					</view>
					<view v-else class="loading-box">
						<text>生成中...</text>
					</view>
				</view>
			</view>

			<!-- ===== Seats Popup（增加团队席位）===== -->
			<view class="popup-bottom-sheet" v-if="showSeats">
				<view class="sheet-content seats-sheet">
					<view class="drag-handle"></view>
					<text class="sheet-title">增加团队席位</text>
					<text class="sheet-subtitle">席位价格将根据当前剩余会员有效月实时计算</text>

					<!-- 计费说明 -->
					<view class="billing-info">
						<view class="billing-left-bar"></view>
						<view class="billing-content">
							<text class="billing-title">计费说明</text>
							<text class="billing-text">按 <text class="highlight">2 元/席位/月</text> × 会员剩余有效月计算</text>
							<text class="billing-note">（不足 31 天按一个月计算）</text>
						</view>
					</view>

					<!-- 席位选择 -->
					<view class="seat-selector">
						<text class="seat-title">选择增加的席位数</text>
						<view class="seats-counter-box">
							<view class="seats-counter-btn" @click="decrementSeat">-</view>
							<input type="number" v-model="addSeatCount" class="seats-counter-input" />
							<view class="seats-counter-btn" @click="incrementSeat">+</view>
						</view>
					</view>

					<!-- 费用明细 -->
					<view class="price-info">
						<view class="price-row">
							<text class="price-label">单价</text>
							<text class="price-value">¥2 / 席位 / 月</text>
						</view>
						<view class="price-row">
							<text class="price-label">数量</text>
							<text class="price-value">{{ addSeatCount }} 席位</text>
						</view>
						<view class="price-row">
							<text class="price-label">有效期</text>
							<text class="price-value">{{ remainingMonths }} 个月</text>
						</view>
						<view class="price-row total-row">
							<text class="price-label-bold">总价</text>
							<text class="total-price">¥{{ totalPrice.toFixed(2) }}</text>
						</view>
					</view>

					<!-- 底部按钮 -->
					<view class="sheet-actions">
						<button class="sheet-btn sheet-btn-cancel" @click="closePopups">取消</button>
						<button class="sheet-btn sheet-btn-confirm" @click="confirmAddSeats">确认购买</button>
					</view>
				</view>
			</view>

			<!-- ===== Permission Popup ===== -->
			<view class="popup-bottom-sheet" v-if="showPermissionPopup">
				<view class="sheet-content">
					<view class="drag-handle"></view>
					<text class="sheet-title">更改权限</text>
					<view class="permission-list">
						<view class="permission-item">
							<text class="permission-label">管理作品</text>
							<switch :checked="permissionForm.canManageWorks === 1"
								@change="e => onPermissionChange('canManageWorks', e)" color="#FF6B00"
								style="transform:scale(0.8)" />
						</view>
						<view class="permission-item">
							<text class="permission-label">管理作品集</text>
							<switch :checked="permissionForm.canManageCollections === 1"
								@change="e => onPermissionChange('canManageCollections', e)" color="#FF6B00"
								style="transform:scale(0.8)" />
						</view>
						<view class="permission-item">
							<text class="permission-label">添加成员</text>
							<switch :checked="permissionForm.canAddMember === 1"
								@change="e => onPermissionChange('canAddMember', e)" color="#FF6B00"
								style="transform:scale(0.8)" />
						</view>
						<view class="permission-item">
							<text class="permission-label">添加席位</text>
							<switch :checked="permissionForm.canAddSeats === 1"
								@change="e => onPermissionChange('canAddSeats', e)" color="#FF6B00"
								style="transform:scale(0.8)" />
						</view>
					</view>
					<view class="sheet-actions">
						<button class="sheet-btn sheet-btn-cancel" @click="closePopups">取消</button>
						<button class="sheet-btn sheet-btn-confirm" @click="confirmChangePermission">确认</button>
					</view>
				</view>
			</view>

			<!-- ===== Nickname Popup ===== -->
			<view class="popup-bottom-sheet" v-if="showNicknamePopup">
				<view class="sheet-content">
					<view class="drag-handle"></view>
					<text class="sheet-title">编辑昵称</text>
					<view class="nickname-input-box">
						<input type="text" v-model="newNickname" placeholder="请输入新昵称" class="nickname-input" />
					</view>
					<view class="sheet-actions">
						<button class="sheet-btn sheet-btn-cancel" @click="closePopups">取消</button>
						<button class="sheet-btn sheet-btn-confirm" @click="confirmChangeNickname">确认</button>
					</view>
				</view>
			</view>

			<!-- ===== Options Bottom Sheet ===== -->
			<view class="popup-bottom" :class="{ 'show': showOptions }">
				<view class="drag-handle-bar"></view>
				<view class="option-item" @click="changePermission" v-if="myRole === 'owner'">
					<text class="option-label">更改权限</text>
				</view>
				<block v-if="selectedMember && isMe(selectedMember.userId)">
					<view class="option-item" @click="handleChangeAvatar">
						<text class="option-label">更改头像</text>
						<text class="option-hint">仅团队成员可见</text>
					</view>
					<view class="option-item" @click="handleEditNickname">
						<text class="option-label">编辑昵称</text>
						<text class="option-hint">仅团队成员可见</text>
					</view>
				</block>
				<view class="option-item delete" @click="removeMember"
					v-if="myRole === 'owner' && selectedMember && !isMe(selectedMember.userId)">
					<text class="option-label">踢出团队</text>
				</view>
				<view class="option-item delete" @click="handleDissolveTeam"
					v-if="myRole === 'owner' && selectedMember && isMe(selectedMember.userId)">
					<text class="option-label">解散团队</text>
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
							<text class="wp-text">按作品创建时间排序(从近到远)</text>
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
							<text class="wp-text">按创建时间排序(从近到远)</text>
						</view>
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
						<view class="wp-item" @click="handleDeleteWorkAction">
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
						<button class="wp-item share-btn-reset" open-type="share" data-type="work"
							@click="closeWorkPopup">
							<image src="/static/icon/转发给朋友.svg" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">转发给朋友</text>
						</button>
					</view>
				</view>
			</view>

			<!-- 作品集管理弹窗 -->
			<view class="work-popup-mask" v-if="showCollectionPopup" @click="closeCollectionPopup"
				@touchmove.stop.prevent>
				<view class="work-popup-content" @click.stop>
					<view class="wp-handle"></view>
					<view class="wp-title">作品集管理</view>
					<view class="wp-list">
						<view class="wp-item" @click="handleEditCollection">
							<image src="/static/icon/管理作品.svg" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">管理作品集</text>
						</view>
						<view class="wp-item" @click="handleDeleteCollectionAction">
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
						<button class="wp-item share-btn-reset" open-type="share" data-type="collection"
							@click="closeCollectionPopup">
							<image src="/static/icon/转发给朋友.svg" class="wp-icon" mode="aspectFit"></image>
							<text class="wp-text">转发给朋友</text>
						</button>
					</view>
				</view>
			</view>

			<yun-storage-warning />
		</view>
	</view>
</template>

<script>
	import config from '@/config/env.js';
	import buildOssImageUrl from '@/utils/imageUtil.js';
	import {
		uploadFile
	} from '@/utils/uploadUtil.js';

	const TEAM_OPERATE_ROLES = {
		ADD_MEMBER: 'canAddMember',
		ADD_SEATS: 'canAddSeats',
		MANAGE_WORKS: 'canManageWorks',
		MANAGE_COLLECTIONS: 'canManageCollections'
	};
	export default {
		components: {
		},
		data() {
			return {
				ossBaseUrl: config.aliyunUrl,
				userInfo: {},
				myRole: '',
				stats: {
					empty: 0,
					total: 0
				},
				searchQuery: '',
				members: [],
				showInvite: false,
				showSeats: false,
				showOptions: false,
				showPermissionPopup: false,
				showNicknamePopup: false,
				newNickname: '',
				permissionForm: {
					canManageWorks: 0,
					canManageCollections: 0,
					canAddMember: 0,
					canAddSeats: 0
				},
				selectedMember: null,
				addSeatCount: 1,
				remainingMonths: 12,
				inviteQrCode: '',
				inviteQrCodeError: false,
				currentTab: 0,
				workSearchKeyword: '',
				collectionSearchKeyword: '',
				pageNum: 1,
				pageSize: 10,
				isSingleColumn: false,
				teamWorks: {
					data: [],
					total: 0
				},
				teamCollections: {
					data: [],
					total: 0
				},
				showFilterPopup: false,
				showCollectionFilterPopup: false,
				showWorkPopup: false,
				showCollectionPopup: false,
				currentWorkItem: null,
				currentCollectionItem: null,
				progress: 0,
				loading: false,
				stageText: '处理中...',
				taskId: '',
				message: '',
				timer: null,
				shareUrl: ''
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				const type = (res.target && res.target.dataset) ? res.target.dataset.type : null;
				if ((type === 'work' || (this.currentWorkItem && this.showWorkPopup)) && this.currentWorkItem) {
					const work = this.currentWorkItem;
					return {
						title: work.title || '团队作品',
						path: `/subpkg-others/pages/works-detail/detail?id=${work.id}&from=team`,
						imageUrl: this.resolveAvatar(this.getFirstImageUrl(work.imageUrls))
					};
				} else if ((type === 'collection' || (this.currentCollectionItem && this.showCollectionPopup)) &&
					this.currentCollectionItem) {
					const collection = this.currentCollectionItem;
					let imageUrl = collection.coverUrl;
					if (collection.workCoverUrls && collection.workCoverUrls.length > 0) {
						imageUrl = collection.workCoverUrls[0];
					}
					return {
						title: collection.name || '团队作品集',
						path: `/subpkg-library/pages/collection/detail?id=${collection.id}&title=${collection.name}&from=team`,
						imageUrl: this.resolveAvatar(imageUrl)
					};
				}
			}
			const invitedId = this.userInfo && (this.userInfo.id || this.userInfo.userId) ? (this.userInfo.id || this.userInfo.userId) : '';
			return {
				title: `${this.userInfo.nickName} 邀请你加入团队`,
				path: `subpkg-profile/pages/team/agree?invitedId=${invitedId}`,
				imageUrl: this.getInviteShareImageUrl()
			};
		},
		computed: {
			currentTeamMember() {
				if (!this.members || !this.userInfo) return null;
				return this.members.find(m => this.isMe(m.userId));
			},
			filteredMembers() {
				if (!this.searchQuery) {
					return this.members;
				}
				return this.members.filter(m => m.nickName && m.nickName.includes(this.searchQuery));
			},
			totalPrice() {
				const unitPrice = 2;
				return unitPrice * this.addSeatCount * this.remainingMonths;
			}
		},
		watch: {
			currentTab(newVal) {
				if (newVal === 1 && this.teamWorks.data.length === 0) {
					this.getTeamWorksData();
				} else if (newVal === 2 && this.teamCollections.data.length === 0) {
					this.getTeamCollections();
				}
			}
		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.userInfo = userInfo;
				this.getTeamInfo();
			}
			if (this.currentTab === 1) {
				this.pageNum = 1;
				this.getTeamWorksData();
			} else if (this.currentTab === 2) {
				this.pageNum = 1;
				this.getTeamCollections();
			}
		},
		methods: {
			buildOssImageUrl,
			resolveAvatar(url) {
				if (!url) return '/static/default-avatar.png';
				if (/^(http|https|wxfile|data):/.test(url)) {
					return url;
				}
				return this.ossBaseUrl + url;
			},
			getInviteShareImageUrl() {
				const url = this.inviteQrCode;
				if (!url || typeof url !== 'string') return 'https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/logo.png';
				if (/^data:image\//.test(url)) return 'https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/logo.png';
				if (/^(http|https|wxfile):/.test(url)) return url;
				return this.resolveAvatar(url);
			},
			isMe(userId) {
				return this.userInfo.id == userId;
			},
			getFirstImageUrl(imageUrlsStr) {
				if (!imageUrlsStr) return '';
				try {
					const urlsArray = JSON.parse(imageUrlsStr);
					if (Array.isArray(urlsArray) && urlsArray.length > 0) {
						return urlsArray[0];
					}
					return '';
				} catch (error) {
					if (typeof imageUrlsStr === 'string') {
						const cleaned = imageUrlsStr.trim().replace(/^\[/, '').replace(/\]$/, '');
						const urls = cleaned.split(',').map(url => url.trim());
						if (urls.length > 0 && urls[0]) {
							return urls[0];
						}
					}
					return '';
				}
			},
			async getTeamInfo() {
				try {
					const res = await this.$request.get('/wechat/team/getMyTeamInfo');
					if (res.code === 200 && res.data) {
						const { team, teamMembers } = res.data;
						if (team) {
							this.stats.total = team.seatLimit || 0;
							this.stats.empty = team.seatLeft || 0;
						}
						if (teamMembers) {
							this.members = teamMembers;
							const me = this.members.find(m => this.isMe(m.userId));
							if (me) {
								this.myRole = me.role;
							}
						}
					}
				} catch (e) {
					console.error('获取团队信息失败', e);
				}
			},
			async getTeamWorksData() {
				let url = `/wechat/works/findUserWorksPage?pageNum=${this.pageNum}&pageSize=${this.pageSize}&workType=1`;
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
						} catch (e) {}
						return { ...item, componentCount };
					});
					this.teamWorks.data = processedRows;
					this.teamWorks.total = res.total;
					if (this.teamWorks.total > 0) {
						this.teamWorks.data.unshift({ type: 'create' });
					}
				}
			},
			async getTeamCollections() {
				let url = `/wechat/works/findUserWorksCollectionsPage?pageNum=${this.pageNum}&pageSize=${this.pageSize}&type=1`;
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
								if (Array.isArray(tags)) { tagsCount = tags.length; }
							}
						} catch (e) {}
						return { ...item, tagsCount };
					});
					this.teamCollections.data = processedRows;
					this.teamCollections.total = res.total;
					if (this.teamCollections.total > 0) {
						this.teamCollections.data.unshift({ type: 'create' });
					}
				}
			},
			async navigateTo(url) {
				const path = (url || '').split('?')[0];
				const checkMap = {
					'/subpkg-library/pages/works/create': { role: TEAM_OPERATE_ROLES.MANAGE_WORKS, operateType: 1, type: 0 },
					'/subpkg-library/pages/collection/create': { role: TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS, operateType: 1, type: 1 }
				};
				if (checkMap[path]) {
					try {
						const ok = await this.checkTeamPermissions(checkMap[path].role);
						if (!ok) return;
						const { role, ...hasRightParams } = checkMap[path];
						await this.$request.get('/wechat/basic/hasRight', hasRightParams);
					} catch (e) { return; }
				}
				uni.navigateTo({ url });
			},
			async checkTeamPermissions(role) {
				try {
					await this.$request.get('/wechat/basic/hasTeamRight');
					await this.$request.get('/wechat/basic/hasOperateRight', { role });
					return true;
				} catch (e) { return false; }
			},
			goToWorkDetail(item) {
				uni.navigateTo({ url: `/subpkg-others/pages/works-detail/detail?id=${item.id}&from=team` });
			},
			goToCollectionDetail(item) {
				uni.navigateTo({ url: `/subpkg-library/pages/collection/detail?id=${item.id}&from=team` });
			},
			showFilterMenu() { this.showFilterPopup = true; },
			closeFilterPopup() { this.showFilterPopup = false; },
			handleSingleColumn() { this.isSingleColumn = true; this.closeFilterPopup(); },
			handleDoubleColumn() { this.isSingleColumn = false; this.closeFilterPopup(); },
			handleSortWorkDate() { this.sortWorksByDate(); this.closeFilterPopup(); },
			sortWorksByDate() {
				if (this.teamWorks.data && this.teamWorks.data.length > 0) {
					const hasCreate = this.teamWorks.data[0].type === 'create';
					let listToSort = hasCreate ? this.teamWorks.data.slice(1) : [...this.teamWorks.data];
					listToSort.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());
					this.teamWorks.data = hasCreate ? [this.teamWorks.data[0], ...listToSort] : listToSort;
				}
			},
			showCollectionFilterMenu() { this.showCollectionFilterPopup = true; },
			closeCollectionFilterPopup() { this.showCollectionFilterPopup = false; },
			handleCollectionSingleColumn() { this.isSingleColumn = true; this.closeCollectionFilterPopup(); },
			handleCollectionDoubleColumn() { this.isSingleColumn = false; this.closeCollectionFilterPopup(); },
			handleSortCollectionDate() { this.sortCollectionsByDate(); this.closeCollectionFilterPopup(); },
			sortCollectionsByDate() {
				if (this.teamCollections.data && this.teamCollections.data.length > 0) {
					const hasCreate = this.teamCollections.data[0].type === 'create';
					let listToSort = hasCreate ? this.teamCollections.data.slice(1) : [...this.teamCollections.data];
					listToSort.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());
					this.teamCollections.data = hasCreate ? [this.teamCollections.data[0], ...listToSort] : listToSort;
				}
			},
			showWorkOptions(item) { this.currentWorkItem = item; this.showWorkPopup = true; },
			closeWorkPopup() { this.showWorkPopup = false; },
			async handleEditWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
				if (!ok) return;
				uni.navigateTo({ url: `/subpkg-library/pages/works/create?id=${this.currentWorkItem.id}&workType=1` });
			},
			handleDeleteWorkAction() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				this.deleteWork(this.currentWorkItem.id);
			},
			handleDownloadWork() {
				if (!this.currentWorkItem) return;
				this.closeWorkPopup();
				this.downloadWorks('work', this.currentWorkItem.id);
			},
			showCollectionOptions(item) { this.currentCollectionItem = item; this.showCollectionPopup = true; },
			closeCollectionPopup() { this.showCollectionPopup = false; },
			async handleEditCollection() {
				if (!this.currentCollectionItem) return;
				this.closeCollectionPopup();
				const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
				if (!ok) return;
				uni.navigateTo({ url: `/subpkg-library/pages/collection/create?id=${this.currentCollectionItem.id}&workType=1` });
			},
			handleDeleteCollectionAction() {
				if (!this.currentCollectionItem) return;
				this.closeCollectionPopup();
				this.deleteCollection(this.currentCollectionItem.id);
			},
			handleDownloadCollection() {
				if (!this.currentCollectionItem) return;
				this.closeCollectionPopup();
				this.downloadWorks('collection', this.currentCollectionItem.id);
			},
			async downloadWorks(type, id) {
				uni.showLoading({ title: '获取文件列表...', mask: true });
				try {
					const res = await this.$request.post('/wechat/basic/downLoadWorks', { id, resourceType: type });
					if (res.code === 200 && res.data && res.data.length > 0) {
						uni.hideLoading();
						this.downloadFiles(res.data);
					} else {
						uni.hideLoading();
						uni.showToast({ title: '用户案列暂不支持下载', icon: 'none' });
					}
				} catch (error) {
					uni.hideLoading();
					uni.showToast({ title: '获取下载内容失败', icon: 'none' });
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
					const fullUrl = this.resolveAvatar(filePath);
					const fileType = this.getFileType(filePath);
					try {
						this.stageText = `下载中 (${i + 1}/${totalFiles})`;
						const tempFilePath = await new Promise((resolve, reject) => {
							uni.downloadFile({
								url: fullUrl,
								success: (downloadRes) => {
									if (downloadRes.statusCode === 200) { resolve(downloadRes.tempFilePath); }
									else { reject(new Error(`下载失败: ${downloadRes.statusCode}`)); }
								},
								fail: (err) => reject(err)
							});
						});
						downloadedFiles++;
						if (fileType === 'image' || fileType === 'video') {
							try {
								if (fileType === 'image') { await this.saveImageToAlbum(tempFilePath); }
								else if (fileType === 'video') { await this.saveVideoToAlbum(tempFilePath); }
								savedFiles++;
							} catch (saveError) {}
						}
						this.progress = Math.round((downloadedFiles / totalFiles) * 100);
					} catch (error) {}
				}
				this.stageText = '下载完成';
				this.progress = 100;
				let toastMessage = `成功下载 ${downloadedFiles} 个文件`;
				if (savedFiles > 0) { toastMessage += `，其中 ${savedFiles} 个已保存到相册`; }
				uni.showToast({ title: toastMessage, icon: 'none' });
				setTimeout(() => { this.progress = 0; }, 3000);
			},
			getFileType(filePath) {
				const ext = filePath.split('.').pop().toLowerCase();
				if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
				if (['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv'].includes(ext)) return 'video';
				return 'other';
			},
			saveImageToAlbum(tempFilePath) {
				return new Promise((resolve, reject) => {
					uni.saveImageToPhotosAlbum({ filePath: tempFilePath, success: () => resolve(), fail: (err) => reject(err) });
				});
			},
			saveVideoToAlbum(tempFilePath) {
				return new Promise((resolve, reject) => {
					uni.saveVideoToPhotosAlbum({ filePath: tempFilePath, success: () => resolve(), fail: (err) => reject(err) });
				});
			},
			async deleteWork(id) {
				const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
				if (!ok) return;
				uni.showModal({
					title: '提示', content: '确定要删除该作品吗？',
					success: async (res) => {
						if (res.confirm) {
							const result = await this.$request.delete(`/wechat/works/deleteWork/${id}`);
							if (result.code == 200) {
								uni.showToast({ title: '删除成功', icon: 'success' });
								this.getTeamWorksData();
							}
						}
					}
				});
			},
			async deleteCollection(id) {
				const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
				if (!ok) return;
				uni.showModal({
					title: '提示', content: '确定要删除该作品集吗？',
					success: async (res) => {
						if (res.confirm) {
							const result = await this.$request.delete(`/wechat/works/deleteWorkCollections/${id}`);
							if (result.code == 200) {
								uni.showToast({ title: '删除成功', icon: 'success' });
								this.getTeamCollections();
							}
						}
					}
				});
			},
			async openInvitePopup() {
				const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.ADD_MEMBER);
				if (!ok) return;
				if (this.inviteQrCode) { this.showInvite = true; }
				else { this.getInviteCode(true); }
			},
			async getInviteCode(isTriggeredByUser = false) {
				if (isTriggeredByUser) { uni.showLoading({ title: '生成中...' }); }
				this.inviteQrCodeError = false;
				try {
					const path = `/subpkg-profile/pages/team/agree?invitedId=${this.userInfo.id}`;
					const res = await this.$request.get('/wechat/team/shareCode', { path });
					if (res && res.code === 200) {
						let rawData = res.data;
						if (rawData && typeof rawData === 'string') {
							rawData = rawData.replace(/[\r\n]/g, "");
							if (rawData.startsWith('data:image')) { this.inviteQrCode = rawData; }
							else if (rawData.startsWith('/9j/')) { this.inviteQrCode = 'data:image/jpeg;base64,' + rawData; }
							else if (rawData.startsWith('iVBORw0KGgo')) { this.inviteQrCode = 'data:image/png;base64,' + rawData; }
							else if (/^[A-Za-z0-9+/=]+$/.test(rawData)) { this.inviteQrCode = 'data:image/png;base64,' + rawData; }
							else { this.inviteQrCode = this.resolveAvatar(rawData); }
							this.showInvite = true;
						} else {
							this.inviteQrCodeError = true;
							if (!this.showInvite) { uni.showToast({ title: '二维码数据格式错误', icon: 'none' }); }
						}
					}
				} finally {
					if (isTriggeredByUser) { uni.hideLoading(); }
				}
			},
			saveInviteImage() {
				if (!this.inviteQrCode) return;
				uni.showLoading({ title: '保存中...' });
				if (this.inviteQrCode.startsWith('data:')) {
					const fs = uni.getFileSystemManager();
					const base64Data = this.inviteQrCode.replace(/^data:image\/\w+;base64,/, "");
					const buffer = uni.base64ToArrayBuffer(base64Data);
					const filePath = `${uni.env.USER_DATA_PATH}/invite_qrcode.png`;
					fs.writeFile({
						filePath, data: buffer, encoding: 'binary',
						success: () => {
							uni.saveImageToPhotosAlbum({
								filePath,
								success: () => { uni.hideLoading(); uni.showToast({ title: '保存成功', icon: 'success' }); },
								fail: (err) => { uni.hideLoading(); this.checkPhotoPermission(); }
							});
						},
						fail: (err) => { uni.hideLoading(); }
					});
				} else {
					uni.downloadFile({
						url: this.inviteQrCode,
						success: (res) => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: () => { uni.hideLoading(); uni.showToast({ title: '保存成功', icon: 'success' }); },
									fail: () => { uni.hideLoading(); this.checkPhotoPermission(); }
								});
							}
						},
						fail: () => { uni.hideLoading(); uni.showToast({ title: '下载失败', icon: 'none' }); }
					});
				}
			},
			checkPhotoPermission() {
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.showModal({
								title: '提示', content: '需要保存到相册权限',
								success: (modalRes) => { if (modalRes.confirm) { uni.openSetting(); } }
							});
						}
					}
				});
			},
			async openSeatsPopup() {
				const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.ADD_SEATS);
				if (!ok) return;

				try {
					const currentUserId = this.userInfo.id || this.userInfo.userId;
					const currentMember = this.members.find(m => this.isMe(m.userId));
					const ownerMember = this.members.find(m => m.role === 'owner');
					const vipUserId = currentMember && currentMember.role === 'owner'
						? currentUserId
						: ownerMember && ownerMember.userId;

					if (!vipUserId) {
						uni.showToast({ title: '未获取到团长信息', icon: 'none' });
						return;
					}

					// 调用获取会员有效期接口
					const vipRes = await this.$request.get(`/wechat/basic/getUserVipTime/${vipUserId}`);
					
					// 打印返回数据到日志
					console.log('会员有效期接口返回数据:', vipRes);
					
					// 检查是否有会员
					if (vipRes.code === 200) {
						if (vipRes.data === 0) {
							// 没有会员，关闭弹框
							uni.showToast({ title: '您没有会员权限', icon: 'none' });
							return;
						} else {
							// 有会员，设置剩余月份
							this.remainingMonths = vipRes.data;
						}
					}
				} catch (e) {
					console.error('获取会员有效期失败', e);
					uni.showToast({ title: '获取会员信息失败', icon: 'none' });
					return;
				}

				this.addSeatCount = 1;
				this.showSeats = true;
			},
			openOptionsPopup(member) {
				this.selectedMember = member;
				this.showOptions = true;
			},
			closePopups() {
				this.showInvite = false;
				this.showSeats = false;
				this.showOptions = false;
				this.showPermissionPopup = false;
				this.showNicknamePopup = false;
				this.selectedMember = null;
			},
			incrementSeat() { this.addSeatCount++; },
			decrementSeat() { if (this.addSeatCount > 1) { this.addSeatCount--; } },
			async confirmAddSeats() {
				uni.showModal({
					title: '确认购买',
					content: `确定购买团队席位 ${Number(this.addSeatCount)} 位？价格：¥${this.totalPrice}`,
					success: (res) => {
						if (res.confirm) {
							const payload = {
								seatQuantity: Number(this.addSeatCount),
								buyMonth: this.remainingMonths,
								money: this.totalPrice
							};
							this.$request.post('/wechat/teamSeat/pay', payload).then(orderRes => {
								if (orderRes.code !== 200) {
									uni.showToast({
										title: orderRes.msg || '下单失败',
										icon: 'none'
									});
									return;
								}
								let payParams = orderRes.data;
								if (typeof payParams === 'string') {
									try {
										payParams = JSON.parse(payParams);
									} catch (e) {}
								}
								uni.requestPayment({
									provider: 'wxpay',
									...payParams,
									success: () => {
										
										this.getTeamInfo()
										uni.showToast({
											title: '支付成功,成功增加席位',
											icon: 'success'
										});
										this.showSeats = false
									},
									fail: (err) => {
										this.showSeats = false;
										uni.showToast({
											title: err.errMsg && err.errMsg
												.indexOf('cancel') !== -1 ?
												'支付已取消' : '支付失败',
											icon: 'none'
										});
									}
								});
							});
						}
					}
				});
		
				// const ok = await this.checkTeamPermissions(TEAM_OPERATE_ROLES.ADD_SEATS);
				// if (!ok) return;
				// try {
				// 	// 准备请求参数
					

				// 	// 调用支付接口
				// 	const res = await this.$request.post('/wechat/teamSeat/pay', payload);

				// 	// 打印返回数据到日志
				// 	console.log('支付接口返回数据:', res);

				// 	if (res.code === 200) {
				// 		uni.showToast({ title: '支付请求已提交', icon: 'success' });
				// 		this.closePopups();
				// 		// 刷新团队信息
				// 		this.getTeamInfo();
				// 	}
				// } catch (e) {
				// 	console.error('支付失败', e);
				// }
			},
			changePermission() {
				if (this.selectedMember) {
					this.permissionForm = {
						canManageWorks: this.selectedMember.canManageWorks || 0,
						canManageCollections: this.selectedMember.canManageCollections || 0,
						canAddMember: this.selectedMember.canAddMember || 0,
						canAddSeats: this.selectedMember.canAddSeats || 0
					};
				}
				this.showOptions = false;
				this.showPermissionPopup = true;
			},
			onPermissionChange(key, e) { this.permissionForm[key] = e.detail.value ? 1 : 0; },
			async confirmChangePermission() {
				if (!this.selectedMember) return;
				const payload = { ...this.permissionForm, userId: this.selectedMember.userId };
				try {
					const res = await this.$request.put('/wechat/team/changePermission', payload);
					if (res.code === 200) {
						uni.showToast({ title: '操作成功', icon: 'success' });
						this.closePopups();
						this.getTeamInfo();
					}
				} catch (e) {}
			},
			handleChangeAvatar() {
				this.showOptions = false;
				uni.chooseMedia({
					count: 1, mediaType: ['image'], sizeType: ['compressed'], sourceType: ['album', 'camera'],
					success: async (res) => {
						const tempFilePath = res.tempFiles[0].tempFilePath;
						const allowedExtensions = ['jpg', 'jpeg', 'png'];
						const ext = tempFilePath.substring(tempFilePath.lastIndexOf('.') + 1).toLowerCase();
						if (!allowedExtensions.includes(ext)) {
							uni.showToast({ title: '仅支持 jpg, jpeg, png 格式的图片', icon: 'none' });
							return;
						}
						uni.showLoading({ title: '上传中...' });
						try {
							const result = await uploadFile({
								url: config.baseUrl + "/wechat/basic/upload",
								filePath: tempFilePath, name: "file",
								formData: { isVerify: "true" }
							});
							if (result.code == 200) {
								const avatarUrl = result.msg;
								const updateRes = await this.$request.put(`/wechat/team/changeHeadPortrait?avatarUrl=${avatarUrl}`);
								if (updateRes.code === 200) {
									uni.showToast({ title: '头像修改成功', icon: 'success' });
									this.getTeamInfo();
								}
							} else {
								uni.showToast({ title: '图片上传失败', icon: 'none' });
							}
						} finally { uni.hideLoading(); }
					}
				});
			},
			handleEditNickname() {
				if (this.selectedMember) { this.newNickname = this.selectedMember.nickName || ''; }
				this.showOptions = false;
				this.showNicknamePopup = true;
			},
			async confirmChangeNickname() {
				if (!this.newNickname.trim()) {
					uni.showToast({ title: '请输入昵称', icon: 'none' });
					return;
				}
				try {
					const res = await this.$request.put(`/wechat/team/changeNickname?nickName=${encodeURIComponent(this.newNickname)}`);
					if (res.code === 200) {
						uni.showToast({ title: '昵称修改成功', icon: 'success' });
						this.closePopups();
						this.getTeamInfo();
					}
				} catch (e) {}
			},
			removeMember() {
				if (!this.selectedMember) return;
				const userId = this.selectedMember.userId;
				const nickName = this.selectedMember.nickName;
				uni.showModal({
					title: '提示', content: `确定要将 "${nickName}" 踢出团队吗？`,
					success: async (res) => {
						if (res.confirm) {
							try {
								const apiRes = await this.$request.delete(`/wechat/team/kickOut/${userId}`);
								if (apiRes.code === 200) {
									uni.showToast({ title: '已移除', icon: 'success' });
									this.closePopups();
									this.getTeamInfo();
								}
							} catch (e) {}
						}
					}
				});
			},
			handleDissolveTeam() {
				uni.showModal({
					title: '危险操作', content: '确定要解散团队吗？此操作不可恢复，所有成员将被移除，团队数据将被清除。',
					confirmColor: '#FF0000',
					success: async (res) => {
						if (res.confirm) {
							try {
								const apiRes = await this.$request.delete('/wechat/team/dissolve');
								if (apiRes.code === 200) {
									uni.showToast({ title: '团队已解散', icon: 'success' });
									this.closePopups();
									setTimeout(() => { uni.switchTab({ url: '/pages/profile/index' }); }, 1500);
								}
							} catch (e) {}
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: white;
	}

	/* ==================== Progress ==================== */
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
		from { transform: translateX(-50%) translateY(100%); opacity: 0; }
		to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
	}
	.custom-progress { width: 100%; }
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
		top: 0; left: 0;
		height: 100%;
		background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
		border-radius: 8rpx;
		transition-timing-function: ease-out;
		box-shadow: 0 2rpx 8rpx rgba(255, 215, 0, 0.4);
	}
	.progress-glow {
		position: absolute;
		top: 0; left: -100%;
		width: 100%; height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
		animation: progress-shine 2s infinite;
	}
	@keyframes progress-shine {
		0%   { left: -100%; }
		100% { left: 100%;  }
	}
	.progress-info {
		position: absolute;
		top: -48rpx; right: -20rpx;
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
	.progress-percent { color: #FFFFFF; }
	.stage-text {
		font-size: 26rpx;
		color: #666666;
		text-align: center;
		margin-top: 20rpx;
	}

	/* ==================== Page Layout ==================== */
	.page-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f8f8f8;
		overflow: hidden;
		padding-top: 20rpx;
	}
	.fixed-header {
		background-color: #fff;
		z-index: 100;
	}
	.header-card {
		background-color: #fff;
		padding: 40rpx 30rpx;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}
	.content-scroll {
		flex: 1;
		height: 0;
	}

	/* ==================== Stats ==================== */
	.stats-container {
		display: flex;
		justify-content: space-around;
		margin-bottom: 40rpx;
	}
	.stat-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.stat-num {
		font-size: 48rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}
	.stat-label {
		font-size: 24rpx;
		color: #999;
	}

	/* ==================== Action Buttons ==================== */
	.action-buttons {
		display: flex;
		justify-content: space-between;
		padding: 0 45rpx;
		align-items: center;
	}
	.btn {
		width: 42%;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 40rpx;
		font-size: 26rpx;
		text-align: center;
		margin: 0;
	}
	.btn-outline {
		background-color: #fff;
		color: #FF6B00;
		border: 1rpx solid #F37738;
	}
	.btn-primary {
		background-color: #F37738;
		color: #fff;
		border: 1rpx solid #F37738;
	}

	/* ==================== Nav ==================== */
	.nav {
		display: flex;
		justify-content: center;
		background-color: #fff;
		padding: 20rpx 0;
		.nav-item {
			margin: 0 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			text {
				font-size: 30rpx;
				color: #434343;
				font-weight: 500;
				margin-bottom: 8rpx;
				&.active {
					color: #1a1a1a;
					font-weight: 700;
				}
			}
			.active-line {
				width: 34rpx;
				height: 6rpx;
				background: #ff7a22;
				border-radius: 999rpx;
			}
		}
	}

	/* ==================== Search Section ==================== */
	.search-section {
		background-color: #f8f8f8;
		padding-top: 20rpx;
		padding-bottom: 10rpx;
	}
	.search-box {
		background-color: #fff;
		border-radius: 50rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		margin: 0 20rpx 20rpx 20rpx;
	}
	.search-icon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 20rpx;
	}
	.search-input {
		flex: 1;
		font-size: 28rpx;
		color: #333;
	}
	.placeholder-style { color: #999999; }
	.section-header-fixed {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		margin-bottom: 10rpx;
	}
	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
	}
	.section-count {
		font-size: 24rpx;
		color: #999;
	}
	.count-tip-fixed {
		font-size: 24rpx;
		color: #999;
		margin: 0 30rpx 10rpx;
	}
	.search-bar {
		margin: 0 30rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.search-input-box {
			flex: 1;
			height: 80rpx;
			background: #fff;
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			margin-right: 20rpx;
		}
		.filter-btn {
			width: 80rpx;
			height: 80rpx;
			background: #fff;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.filter-icon { width: 40rpx; height: 40rpx; }
	}

	/* ==================== Members ==================== */
	.member-list {
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
	}
	.member-item {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
	}
	.member-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 30rpx;
		background-color: #eee;
	}
	.member-info { flex: 1; }
	.name-row {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		flex-wrap: wrap;
	}
	.member-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-right: 20rpx;
	}
	.tags { display: flex; }
	.tag {
		font-size: 20rpx;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}
	.tag.super-admin { background-color: #FF6B00; color: #fff; }
	.tag.me           { background-color: #40E0D0; color: #fff; }
	.tag.normal        { background-color: #E8F4FF; color: #3388FF; }
	.more-options {
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left: 30rpx;
	}
	.dot-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 30rpx;
		height: 6rpx;
	}
	.dot {
		width: 8rpx;
		height: 8rpx;
		background-color: #333;
		border-radius: 50%;
	}

	/* ==================== Mask ==================== */
	.mask {
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}

	/* ==================== 统一底部弹出框容器 ==================== */
	/* 所有弹框（席位、邀请、权限、昵称）共用此容器 */
	.popup-bottom-sheet {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		animation: sheetSlideUp 0.3s ease-out;
	}
	@keyframes sheetSlideUp {
		from { transform: translateY(100%); opacity: 0; }
		to   { transform: translateY(0);    opacity: 1; }
	}
	.sheet-content {
		background-color: #fff;
		border-radius: 32rpx 32rpx 0 0;
		padding: 0 30rpx 40rpx;
		padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
		width: 100%;
		box-sizing: border-box;
		max-height: 85vh;
		overflow-y: auto;
		box-shadow: 0 -8rpx 32rpx rgba(0, 0, 0, 0.12);
	}

	/* 拖拽指示条 */
	.drag-handle {
		width: 60rpx;
		height: 6rpx;
		background-color: #D3D3D3;
		border-radius: 3rpx;
		margin: 20rpx auto 24rpx;
		flex-shrink: 0;
	}

	/* 弹框标题 */
	.sheet-title {
		display: block;
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 12rpx;
	}

	/* 弹框副标题 */
	.sheet-subtitle {
		display: block;
		font-size: 24rpx;
		color: #999;
		text-align: center;
		margin-bottom: 28rpx;
	}

	/* ==================== 席位弹框专用样式 ==================== */
	.seats-sheet { /* 继承 sheet-content，无需额外样式 */ }

	/* 计费说明 */
	.billing-info {
		display: flex;
		flex-direction: row;
		background-color: #f5f7fa;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-bottom: 28rpx;
	}
	.billing-left-bar {
		width: 4rpx;
		background-color: #FF6B00;
		border-radius: 2rpx;
		margin-right: 16rpx;
		flex-shrink: 0;
	}
	.billing-content { flex: 1; }
	.billing-title {
		display: block;
		font-size: 26rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}
	.billing-text {
		font-size: 26rpx;
		color: #666;
		line-height: 38rpx;
		display: block;
	}
	.billing-note {
		display: block;
		font-size: 22rpx;
		color: #999;
		line-height: 32rpx;
		margin-top: 6rpx;
	}
	.highlight {
		color: #FF6B00;
		font-weight: bold;
	}

	/* 席位选择器 */
	.seat-selector { margin-bottom: 24rpx; }
	.seat-title {
		display: block;
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}
	.seats-counter-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		border: 1rpx solid #E5E5E5;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.seats-counter-btn {
		width: 100rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		color: #333;
		font-weight: bold;
		background-color: #F5F5F5;
		flex-shrink: 0;
	}
	.seats-counter-btn:active { background-color: #FFE8D6; }
	.seats-counter-input {
		flex: 1;
		height: 80rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		background-color: #fff;
	}

	/* 费用明细 */
	.price-info {
		background-color: #F7F7F7;
		border-radius: 12rpx;
		padding: 24rpx 28rpx;
		margin-bottom: 28rpx;
	}
	.price-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18rpx;
		&:last-child { margin-bottom: 0; }
	}
	.total-row {
		border-top: 1rpx solid #E5E5E5;
		padding-top: 18rpx;
		margin-top: 6rpx;
	}
	.price-label {
		font-size: 26rpx;
		color: #666;
	}
	.price-value {
		font-size: 26rpx;
		color: #333;
	}
	.price-label-bold {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
	}
	.total-price {
		font-size: 36rpx;
		font-weight: bold;
		color: #FF6B00;
	}

	/* 弹框底部按钮行 */
	.sheet-actions {
		display: flex;
		justify-content: space-between;
		gap: 20rpx;
	}
	.sheet-btn {
		flex: 1;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 12rpx;
		font-size: 30rpx;
		font-weight: 500;
		text-align: center;
		margin: 0;
	}
	.sheet-btn::after { border: none; }
	.sheet-btn-cancel {
		background-color: #fff;
		color: #666;
		border: 1rpx solid #E5E5E5;
	}
	.sheet-btn-confirm {
		background-color: #FF6B00;
		color: #fff;
		border: none;
	}
	.sheet-btn:active { opacity: 0.8; }

	/* ==================== 邀请弹框 ==================== */
	.invite-sheet { padding-bottom: calc(60rpx + env(safe-area-inset-bottom)); }
	.invite-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx 0 0;
	}
	.inviter-info {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	.inviter-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		border: 2rpx solid #eee;
	}
	.inviter-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}
	.qr-container {
		width: 450rpx;
		height: 450rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: #f8f8f8;
	}
	.qr-code { width: 100%; height: 100%; }
	.invite-actions {
		display: flex;
		justify-content: space-between;
		width: 100%;
		gap: 20rpx;
	}
	.action-btn {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 28rpx;
		text-align: center;
		margin: 0;
	}
	.action-btn::after { border: none; }
	.save-btn { background-color: #f5f5f5; color: #333; }
	.share-btn { background-color: #FF6B00; color: #fff; }
	.loading-box {
		padding: 80rpx 0;
		text-align: center;
		color: #999;
		font-size: 28rpx;
	}

	/* ==================== 权限弹框 ==================== */
	.permission-list {
		width: 100%;
		margin-bottom: 36rpx;
	}
	.permission-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
		&:last-child { border-bottom: none; }
	}
	.permission-label {
		font-size: 30rpx;
		color: #333;
	}

	/* ==================== 昵称弹框 ==================== */
	.nickname-input-box {
		width: 100%;
		margin-bottom: 40rpx;
		border: 1rpx solid #E5E5E5;
		border-radius: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.nickname-input {
		font-size: 30rpx;
		color: #333;
		width: 100%;
	}

	/* ==================== Options Bottom Sheet ==================== */
	.popup-bottom {
		position: fixed;
		bottom: 0; left: 0; right: 0;
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
		z-index: 999;
		transform: translateY(100%);
		transition: transform 0.3s;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		&.show { transform: translateY(0); }
	}
	.drag-handle-bar {
		width: 100rpx;
		height: 8rpx;
		background: #d3d3d3;
		border-radius: 10rpx;
		margin: 20rpx auto 10rpx;
	}
	.option-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&:active { background-color: #f9f9f9; }
		&:last-child { border-bottom: none; }
	}
	.option-label { font-size: 30rpx; color: #333; }
	.option-hint  { font-size: 24rpx; color: #999; }
	.option-item.delete .option-label { color: #FF0000; }

	/* ==================== Work / Collection Grid ==================== */
	.list-mode { padding-top: 10rpx; }
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
		&.single-col { width: 100%; }
	}
	.create-card-wrapper {
		background: transparent !important;
		padding-bottom: 0 !important;
	}
	.create-card-inner {
		width: 100%;
		height: 340rpx;
		background: linear-gradient(135deg, #444, #333);
		border-radius: 16rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.cc-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.cc-title {
			color: rgba(255,255,255,0.95);
			font-size: 26rpx;
			font-weight: bold;
		}
	}
	.cc-body {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.cc-icon { width: 100rpx; height: 100rpx; opacity: 0.8; }
	}
	.img-box { position: relative; }
	.work-img {
		width: 100%;
		background: #eee;
		&.tall   { height: 340rpx; }
		&.single-img { height: 400rpx; }
	}
	.multi-img-container {
		position: relative;
		width: 100%;
		background: #eee;
		overflow: hidden;
		&.tall      { height: 340rpx; }
		&.single-img { height: 400rpx; }
	}
	.multi-img-item {
		position: absolute;
		background: #eee;
		border-radius: 0;
	}
	.multi-img-left         { z-index:1; width:60%; height:100%; left:0;   top:0;    }
	.multi-img-top-right    { z-index:2; width:40%; height:50%;  right:0;  top:0;    }
	.multi-img-bottom-right { z-index:3; width:40%; height:50%;  right:0;  bottom:0; }
	.multi-img-left-half    { z-index:1; width:50%; height:100%; left:0;   top:0;    }
	.multi-img-right-half   { z-index:2; width:50%; height:100%; right:0;  top:0;    }
	.collection-info {
		display: flex;
		justify-content: space-between;
		padding-right: 16rpx;
		align-items: center;
	}
	.work-title {
		font-size: 28rpx;
		font-weight: bold;
		padding: 12rpx 16rpx 0;
		display: block;
	}

	/* ==================== Filter / Work Popup ==================== */
	.work-popup-mask {
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.work-popup-content {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 20rpx;
	}
	.wp-handle {
		width: 100rpx;
		height: 8rpx;
		background: #d3d3d3;
		border-radius: 10rpx;
		margin: 5rpx auto 20rpx;
	}
	.wp-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
	}
	.wp-list { display: flex; flex-direction: column; }
	.wp-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
		&:last-child { border-bottom: none; }
	}
	.wp-icon  { width: 60rpx; height: 60rpx; margin-right: 30rpx; }
	.wp-text  { font-size: 32rpx; color: #333; }
	.wp-section-title {
		font-size: 28rpx;
		color: #999;
		margin: 20rpx 0 10rpx 0;
	}
	.share-btn-reset {
		background: transparent;
		padding: 20rpx 0;
		margin: 0;
		line-height: normal;
		border: none;
		text-align: left;
		border-radius: 0;
		border-bottom: 1rpx solid #f9f9f9;
		&::after { border: none; }
	}
</style>
