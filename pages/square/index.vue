<template>
	<view class="page"
		:class="{ 'pc-pulling': pcPulling && pcPullDistance > 0 }"
		@mousedown="onPcPullStart"
		@mousemove="onPcPullMove"
		@mouseup="onPcPullEnd"
		@mouseleave="onPcPullEnd"
		@touchstart.passive="onPcPullStart"
		@touchmove.passive="onPcPullMove"
		@touchend="onPcPullEnd">
		<view class="top-area" :style="{ paddingTop: (statusBarHeight + 8) + 'px' }">
			<view class="search-row">
				<view class="search-box">
					<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit"></image>
					<input
						class="search-input"
						v-model="searchKeyword"
						placeholder="搜索任务标题"
						placeholder-class="search-placeholder"
						confirm-type="search"
						@input="handleSearchInput"
						@confirm="handleSearchConfirm"
					/>
				</view>
			</view>
			<view class="filter-row">
				<picker
					class="filter-picker"
					:value="selectedCategoryIndex"
					:range="categoryOptions"
					range-key="label"
					@change="handleCategoryChange"
				>
					<view class="filter-item">
						<text class="filter-text">{{ selectedCategoryLabel }}</text>
						<image class="arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
					</view>
				</picker>
				<view
					class="filter-picker filter-picker-right"
					@click="openPricePopup"
				>
					<view class="filter-item filter-item-right">
						<text class="filter-text">{{ selectedPriceLabel }}</text>
						<image class="arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="pc-list-wrap">
			<view
				class="pc-pull-tip"
				:class="{ 'pc-pull-visible': pcPullTranslateY > 0 || refreshing }"
				:style="{ height: pcPullThreshold + 'px', marginTop: (-pcPullThreshold) + 'px' }">
				<view class="pc-pull-inner">
					<view class="pc-pull-spinner" v-if="refreshing"></view>
					<text class="pc-pull-text">{{ pcPullTip }}</text>
				</view>
			</view>
			<view class="pc-scroll-wrap" :style="{ transform: 'translateY(' + pcPullTranslateY + 'px)', transition: (pcPulling ? 'none' : 'transform .25s ease-out') }">
		<scroll-view
			scroll-y
			class="task-scroll"
			lower-threshold="80"
			refresher-enabled
			:refresher-triggered="refreshing"
			refresher-background="#ffffff"
			@refresherrefresh="handleRefresh"
			@scrolltolower="loadMore"
			@scroll="handleTaskScroll"
		>
			<view class="task-list">
				<view
					v-for="item in visibleList"
					:key="item.channelId"
					class="task-card"
					:class="{ 'task-card-cover': item.hasCover, 'task-card-simple': !item.hasCover }"
					@click="goDetail(item)"
				>
					<view class="task-head">
						<image class="task-avatar" :src="item.avatar" mode="aspectFill"></image>
						<view class="task-title-wrap">
							<text class="task-name">{{ item.name }}</text>
							<text class="publish-date">发布于{{ item.publishDate }}</text>
						</view>
						<text v-if="item.deadlineText" class="deadline">{{ item.deadlineText }}</text>
					</view>
					<view v-if="!item.hasCover" class="dash-divider"></view>
					<text class="title">{{ item.title }}</text>
					<text class="desc">{{ item.desc }}</text>
					<image
						v-if="item.hasCover"
						class="cover-image"
						:src="item.cover"
						mode="aspectFill"
					></image>
					
					<text class="budget">{{ item.price }}</text>

					<view class="bottom-row">
						<view class="participant-area" @click.stop="handleParticipantMore(item)">
							<text class="participant-count">{{ item.participantLabel }}</text>
							<view v-if="item.displayParticipants.length > 0" class="participant-avatars">
								<image
									v-for="participant in item.displayParticipants"
									:key="participant.key"
									class="participant-avatar"
									:src="participant.avatar"
									mode="aspectFill"
									@click.stop="handleParticipantClick(participant)"
								></image>
								<text v-if="item.hasMoreParticipants" class="participant-more">...</text>
							</view>
						</view>
								<button
						v-if="!item.isOwnTask"
						class="task-action-btn"
						:class="{ 'task-action-btn-quote': !item.hasOperated && item.participantType === 'quote', 'task-action-btn-accept': !item.hasOperated && item.participantType === 'accept', 'task-action-btn-disabled': item.hasOperated }"
						:disabled="item.hasLockedOrder"
						@click.stop="handleQuickAction(item)"
					>
						{{ item.hasLockedOrder ? '已接单' : (item.hasOperated ? (item.participantType === 'quote' ? '取消报价' : '取消接单') : (item.participantType === 'quote' ? '报价' : '接单')) }}
					</button>
						<button
							class="task-share-btn"
							open-type="share"
							:data-channel-id="item.channelId"
							:data-task-title="item.desc"
							@click.stop="handleShareTask(item)"
						>
							<image class="share-icon" src="/static/profile/橱窗分享按钮.png" mode="aspectFit"></image>
						</button>
					</view>
				</view>

				<view v-if="!loading && visibleList.length === 0" class="empty-state">
					<text>暂无任务</text>
				</view>

				<view class="load-state">
					<text v-if="loading">加载中...</text>
					<text v-else-if="finished && visibleList.length > 0">没有更多了</text>
					<text v-else-if="visibleList.length > 0">上滑加载更多</text>
				</view>
			</view>
		</scroll-view>
			</view>
		</view>

		<yun-tabbar :selected="1"></yun-tabbar>

		<view
		v-if="pricePopupVisible"
		class="price-popup-mask"
		@click="closePricePopup"
	>
		<view class="price-popup" @click.stop>
			<view class="price-popup-header">
				<view class="price-popup-close" @click="closePricePopup">×</view>
			</view>
			<view class="price-popup-header">
				<text class="price-popup-title">价格</text>
				<text class="price-popup-no-limit" @click="clearPriceFilter">不限</text>
			</view>
			<view class="price-popup-options">
				<view
					v-for="(item, idx) in priceOptions"
					:key="idx"
					class="price-option"
					:class="{ active: tempSelectedPriceIndex === idx }"
					@click="selectPriceOption(idx)"
				>{{ item.label }}</view>
			</view>
			<view class="price-popup-custom">
				<view class="price-custom-label">自定义</view>
				<view class="price-custom-inputs">
					<input
						class="price-custom-input"
						type="number"
						v-model="tempCustomMinPrice"
						placeholder="0"
						placeholder-class="price-custom-placeholder"
						@input="onCustomMinInput"
					/>
					<text class="price-custom-sep">—</text>
					<input
						class="price-custom-input"
						type="number"
						v-model="tempCustomMaxPrice"
						placeholder="10000"
						placeholder-class="price-custom-placeholder"
						@input="onCustomMaxInput"
					/>
				</view>
			</view>
			<view class="price-popup-footer">
				<view class="price-popup-btn price-popup-btn-reset" @click="resetPricePopup">重置</view>
				<view class="price-popup-btn price-popup-btn-confirm" @click="confirmPricePopup">确定</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
import request from '@/utils/request.js';
import env from '@/config/env.js';

const DEFAULT_AVATAR = '/static/yunyiku/avatar.png';
const DEFAULT_CATEGORY_OPTION = {
	label: '专业类型',
	value: ''
};
const PRICE_OPTIONS = [
	{ label: '0-1000', minPrice: '0', maxPrice: '1000' },
	{ label: '1000-2000', minPrice: '1000', maxPrice: '2000' },
	{ label: '2000-3000', minPrice: '2000', maxPrice: '3000' },
	{ label: '3000-4000', minPrice: '3000', maxPrice: '4000' },
	{ label: '4000以上', minPrice: '4000', maxPrice: '' },
	{ label: '乙方报价', minPrice: '', maxPrice: '', isOtherPartyQuote: true }
];

export default {
	data() {
		return {
			statusBarHeight: 0,
			searchKeyword: '',
			searchTimer: null,
			requestSeq: 0,
			pageNum: 1,
			pageSize: 3,
			total: 0,
			loading: false,
			refreshing: false,
			finished: false,
			pcPullStartY: 0,
			pcPullDistance: 0,
			pcPulling: false,
			pcPullTriggered: false,
			pcPullThreshold: 70,
			pcScrollTop: 0,
			visibleList: [],
			categoryOptions: [DEFAULT_CATEGORY_OPTION],
			selectedCategoryIndex: 0,
			priceOptions: PRICE_OPTIONS,
			selectedPriceIndex: -1,
			pricePopupVisible: false,
			tempSelectedPriceIndex: -1,
			tempCustomMinPrice: '',
			tempCustomMaxPrice: '',
			isCustomPrice: false,
			CARD_UPDATE_KEY: 'square_card_update'
		};
	},
	computed: {
		selectedCategoryLabel() {
			const option = this.categoryOptions[this.selectedCategoryIndex];
			return option ? option.label : DEFAULT_CATEGORY_OPTION.label;
		},
		selectedPriceLabel() {
			if (this.isCustomPrice) {
				const min = this.tempCustomMinPrice || '0';
				const max = this.tempCustomMaxPrice || '不限';
				return `${min}-${max}`;
			}
			if (this.selectedPriceIndex < 0) {
				return '价格区间';
			}
			const option = this.priceOptions[this.selectedPriceIndex];
			return option ? option.label : '价格';
		},
		pcPullTranslateY() {
			if (this.refreshing) {
				return this.pcPullThreshold;
			}
			if (!this.pcPulling || this.pcPullDistance <= 0) {
				return 0;
			}
			return Math.min(this.pcPullDistance, this.pcPullThreshold * 2.2);
		},
		pcPullTip() {
			if (this.refreshing) {
				return '正在刷新...';
			}
			return this.pcPullDistance >= this.pcPullThreshold ? '松开立即刷新' : '下拉可以刷新';
		},
		isOtherPartyQuoteFilterActive() {
			if (this.isCustomPrice || this.selectedPriceIndex < 0) {
				return false;
			}
			const option = this.priceOptions[this.selectedPriceIndex];
			return !!(option && option.isOtherPartyQuote);
		}
	},
	async onLoad() {
		const windowInfo = uni.getWindowInfo();
		this.statusBarHeight = windowInfo.statusBarHeight || 0;
		await this.loadCategoryOptions();
		this.resetList();
	},
	onShow() {
		uni.hideTabBar({
			animation: false
		});
		this.updateCardOperatedStatus();
	},
	beforeDestroy() {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer);
			this.searchTimer = null;
		}
	},
	methods: {
		async loadCategoryOptions() {
			try {
				const res = await request.get('/wechat/professionCategory/list', {
					status: 1
				});
				const rootList = this.extractRootCategories(res && res.data);
				this.categoryOptions = [DEFAULT_CATEGORY_OPTION].concat(
					rootList
						.filter(item => item.categoryCode && item.categoryName)
						.map(item => ({
							label: item.categoryName,
							value: item.categoryCode
						}))
				);
			} catch (e) {
				this.categoryOptions = [DEFAULT_CATEGORY_OPTION];
			}
		},
		extractRootCategories(list) {
			return (Array.isArray(list) ? list : []).map(item => ({
				id: item.id,
				categoryName: item.categoryName || item.name || '',
				categoryCode: item.categoryCode ? String(item.categoryCode) : '',
				level: item.level
			}));
		},
		handleCategoryChange(event) {
			this.selectedCategoryIndex = Number(event.detail.value) || 0;
			this.resetList();
		},
		openPricePopup() {
			this.tempSelectedPriceIndex = this.isCustomPrice ? -1 : this.selectedPriceIndex;
			this.tempCustomMinPrice = this.isCustomPrice ? this.tempCustomMinPrice : '';
			this.tempCustomMaxPrice = this.isCustomPrice ? this.tempCustomMaxPrice : '';
			this.pricePopupVisible = true;
		},
		closePricePopup() {
			this.pricePopupVisible = false;
		},
		selectPriceOption(idx) {
			this.tempSelectedPriceIndex = idx;
			this.isCustomPrice = false;
			this.tempCustomMinPrice = '';
			this.tempCustomMaxPrice = '';
		},
		onCustomMinInput(e) {
			this.tempCustomMinPrice = e.detail.value;
			if (this.tempCustomMinPrice || this.tempCustomMaxPrice) {
				this.isCustomPrice = true;
				this.tempSelectedPriceIndex = -1;
			}
		},
		onCustomMaxInput(e) {
			this.tempCustomMaxPrice = e.detail.value;
			if (this.tempCustomMinPrice || this.tempCustomMaxPrice) {
				this.isCustomPrice = true;
				this.tempSelectedPriceIndex = -1;
			}
		},
		resetPricePopup() {
			this.tempSelectedPriceIndex = -1;
			this.tempCustomMinPrice = '';
			this.tempCustomMaxPrice = '';
			this.isCustomPrice = false;
		},
		clearPriceFilter() {
			this.tempSelectedPriceIndex = -1;
			this.tempCustomMinPrice = '';
			this.tempCustomMaxPrice = '';
			this.isCustomPrice = false;
			this.selectedPriceIndex = -1;
			this.pricePopupVisible = false;
			this.resetList();
		},
		confirmPricePopup() {
			this.selectedPriceIndex = this.tempSelectedPriceIndex;
			if (this.isCustomPrice) {
				this.selectedPriceIndex = -1;
			} else {
				this.tempCustomMinPrice = '';
				this.tempCustomMaxPrice = '';
			}
			this.pricePopupVisible = false;
			this.resetList();
		},
		handleSearchInput(event) {
			this.searchKeyword = event.detail.value;
			if (this.searchTimer) {
				clearTimeout(this.searchTimer);
			}
			this.searchTimer = setTimeout(() => {
				this.resetList();
			}, 300);
		},
		handleSearchConfirm() {
			if (this.searchTimer) {
				clearTimeout(this.searchTimer);
				this.searchTimer = null;
			}
			this.resetList();
		},
		resetList() {
			this.pageNum = 1;
			this.total = 0;
			this.finished = false;
			this.visibleList = [];
			return this.fetchTaskList(1, true);
		},
		async handleRefresh() {
			if (this.searchTimer) {
				clearTimeout(this.searchTimer);
				this.searchTimer = null;
			}
			this.refreshing = true;
			try {
				await this.resetList();
			} finally {
				this.refreshing = false;
			}
		},
		loadMore() {
			if (this.loading || this.finished) {
				return;
			}
			this.fetchTaskList(this.pageNum + 1, false);
		},
		async fetchTaskList(pageNum, isRefresh) {
			const currentRequestSeq = ++this.requestSeq;
			this.loading = true;
			const filterActive = this.isOtherPartyQuoteFilterActive;
			const requestPageSize = filterActive ? 50 : this.pageSize;
			try {
				const res = await request.get('/wechat/square/page', this.buildQueryParams(pageNum));
				if (currentRequestSeq !== this.requestSeq) {
					return;
				}
				const pageData = this.extractPageData(res);
				const rawRows = pageData.rows || [];
				let rows = rawRows;
				if (filterActive) {
					rows = rows.filter(item => Number(item && item.isOtherPartyQuote) === 1);
				}
				const nextList = rows.map(item => this.normalizeTaskCard(item));
				const total = Number(pageData.total);
				const hasTotal = Number.isFinite(total) && total >= 0;
				const mergedList = isRefresh ? nextList : this.visibleList.concat(nextList);
				this.pageNum = pageNum;
				this.total = hasTotal ? total : mergedList.length;
				this.visibleList = mergedList;
				const rawFinished = hasTotal
					? mergedList.length >= total
					: rawRows.length < requestPageSize;
				this.finished = rawFinished;
				if (filterActive && !rawFinished && nextList.length === 0 && !hasTotal) {
					// 本页全被过滤掉了，直接跳下一页继续拿，避免显示空白
					setTimeout(() => {
						if (currentRequestSeq === this.requestSeq) {
							this.fetchTaskList(pageNum + 1, false);
						}
					}, 0);
				}
			} catch (e) {
				if (currentRequestSeq === this.requestSeq) {
					this.finished = isRefresh;
				}
			} finally {
				if (currentRequestSeq === this.requestSeq) {
					this.loading = false;
				}
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
		buildQueryParams(pageNum) {
			const actualPageSize = this.isOtherPartyQuoteFilterActive ? 50 : this.pageSize;
			const params = {
				pageNum,
				pageSize: actualPageSize
			};
			const keyword = this.searchKeyword.trim();
			if (keyword) {
				params.taskTitle = keyword;
			}
			const categoryOption = this.categoryOptions[this.selectedCategoryIndex];
			if (categoryOption && categoryOption.value) {
				params.categoryCode = categoryOption.value;
			}
			if (this.isCustomPrice) {
				if (this.tempCustomMinPrice) {
					params.minPrice = this.tempCustomMinPrice;
				}
				if (this.tempCustomMaxPrice) {
					params.maxPrice = this.tempCustomMaxPrice;
				}
			} else if (this.selectedPriceIndex >= 0) {
				const priceOption = this.priceOptions[this.selectedPriceIndex];
				if (priceOption) {
					if (priceOption.isOtherPartyQuote) {
						params.isOtherPartyQuote = 1;
					}
					if (priceOption.minPrice !== '') {
						params.minPrice = priceOption.minPrice;
					}
					if (priceOption.maxPrice !== '') {
						params.maxPrice = priceOption.maxPrice;
					}
				}
			}
			return params;
		},
		normalizeTaskCard(item) {
			const professionList = Array.isArray(item.professionList)
				? item.professionList
					.map(profession => profession && profession.professionCategoryName ? profession.professionCategoryName : '')
					.filter(Boolean)
					.slice(0, 3)
				: [];
			const publisherAvatar = this.buildImageUrl(item.avatarUrl) || DEFAULT_AVATAR;
			const participantType = Number(item.isOtherPartyQuote) === 1 ? 'quote' : 'accept';
			const participantList = this.normalizeParticipantList(item, participantType);
			const participantCount = this.resolveParticipantCount(item, participantType, participantList.length);
			return {
			channelId: item.channelId ? String(item.channelId) : '',
			taskId: item.taskId ? String(item.taskId) : '',
			name: item.nickName || '未命名用户',
			publishDate: this.formatPublishDate(item.publishTime),
			publishTime: item.publishTime || '',
				deadlineText: this.buildDeadlineText(item.deliveryDate),
				title: item.taskTitle ||  '暂无任务标题',
				desc: item.taskDesc || '暂无任务描述',
				price: this.formatPrice(item.budgetAmount, item.isOtherPartyQuote),
				statusLabel: Number(item.isOtherPartyQuote) === 1 ? '已报价' : '已接单',
				avatar: publisherAvatar,
				statusAvatar: this.buildStatusAvatar(item, publisherAvatar),
				cover: this.buildImageUrl(item.coverImage),
				hasCover: !!item.coverImage,
				participantType,
				participantCount,
				participantLabel: this.buildParticipantLabel(participantType, participantCount),
				participants: participantList,
				displayParticipants: participantList.slice(0, 3),
				hasMoreParticipants: participantCount > 3 || participantList.length > 3,
				professionList,
				isOwnTask: this.checkIsOwnTask(item),
				hasOperated: !!item.hasOperated,
				hasLockedOrder: !!item.hasLockedOrder
			};
		},
		getCurrentUserId() {
			const isTeamMode = !!uni.getStorageSync('isTeamMode');
			const userInfo = uni.getStorageSync('userInfo') || {};
			if (isTeamMode) {
				return uni.getStorageSync('teamOwnerId') || userInfo.id || userInfo.userId || '';
			}
			return userInfo.id || userInfo.userId || '';
		},
		checkIsOwnTask(item) {
			if (!item) {
				return false;
			}
			const currentUserId = this.getCurrentUserId();
			if (!currentUserId) {
				return false;
			}
			const ownerUserId = item.userId || item.publishUserId || item.publisherUserId || item.wxUserId || item.publishWxUserId || '';
			if (ownerUserId && String(ownerUserId) === String(currentUserId)) {
				return true;
			}
			return false;
		},
		normalizeParticipantList(item, participantType) {
			const avatarList = this.normalizeParticipantAvatarList(item.participantAvatarList);
			if (avatarList.length > 0) {
				return avatarList;
			}
			const sourceList = this.extractParticipantSourceList(item, participantType);
			// 有效状态白名单：报价只保留待选择/已选中/已生成订单；订单保留待支付/待接单/服务中/已完成
			const VALID_QUOTE_STATUS = new Set(['pending', 'selected', 'ordered']);
			const VALID_ORDER_STATUS = new Set(['pending_pay', 'pending_accept', 'in_service', 'completed']);
			const isParticipantStatusValid = (participant) => {
				if (!participant) return false;
				const quoteStatus = participant.quoteStatus;
				if (quoteStatus !== null && quoteStatus !== undefined && quoteStatus !== '') {
					return VALID_QUOTE_STATUS.has(String(quoteStatus).toLowerCase());
				}
				const orderStatus = participant.orderStatus || participant.status;
				if (orderStatus !== null && orderStatus !== undefined && orderStatus !== '') {
					return VALID_ORDER_STATUS.has(String(orderStatus).toLowerCase());
				}
				// 没有状态字段的旧记录保守视为有效
				return true;
			};
			// 按 userId 去重（同一用户多次报价/接单只保留一条）；无 userId 的按 avatar 去重
			const seenUserId = new Set();
			const seenAvatar = new Set();
			const dedupedSource = sourceList.filter(participant => {
				if (!participant) return false;
				if (!isParticipantStatusValid(participant)) return false;
				const userId = participant.userId ||
					participant.wxUserId ||
					participant.quoteUserId ||
					participant.receiverUserId ||
					participant.acceptUserId ||
					participant.id ||
					'';
				if (userId) {
					const key = String(userId);
					if (seenUserId.has(key)) return false;
					seenUserId.add(key);
					return true;
				}
				const avatar = participant.avatar ||
					participant.avatarUrl ||
					participant.quoteUserAvatar ||
					participant.receiverAvatarUrl ||
					participant.acceptAvatarUrl ||
					'';
				const avatarKey = avatar ? String(avatar).trim() : '';
				if (!avatarKey) return false;
				if (seenAvatar.has(avatarKey)) return false;
				seenAvatar.add(avatarKey);
				return true;
			});
			const list = dedupedSource.map((participant, index) => {
				const userId = participant.userId ||
					participant.wxUserId ||
					participant.quoteUserId ||
					participant.receiverUserId ||
					participant.acceptUserId ||
					participant.id ||
					'';
				const name = participant.nickname ||
					participant.nickName ||
					participant.userName ||
					participant.name ||
					participant.quoteUserName ||
					participant.receiverUserName ||
					participant.acceptUserName ||
					'';
				const avatar = participant.avatar ||
					participant.avatarUrl ||
					participant.quoteUserAvatar ||
					participant.receiverAvatarUrl ||
					participant.acceptAvatarUrl ||
					'';
				return {
					key: `${userId || 'participant'}-${index}`,
					userId: userId ? String(userId) : '',
					name,
					avatar: this.buildImageUrl(avatar) || DEFAULT_AVATAR
				};
			});
			if (list.length > 0) {
				return list;
			}
			const single = this.buildSingleParticipant(item, participantType);
			return single ? [single] : [];
		},
		normalizeParticipantAvatarList(value) {
			const source = Array.isArray(value)
				? value
				: (typeof value === 'string' ? value.split(',') : []);
			// 按头像 URL 去重，避免同一头像被重复展示
			const seen = new Set();
			const result = [];
			source.forEach(avatar => {
				const avatarUrl = typeof avatar === 'string' ? avatar.trim() : '';
				if (!avatarUrl) return;
				if (seen.has(avatarUrl)) return;
				seen.add(avatarUrl);
				result.push({
					key: `participant-avatar-${result.length}`,
					userId: '',
					name: '',
					avatar: this.buildImageUrl(avatarUrl) || DEFAULT_AVATAR
				});
			});
			return result;
		},
		extractParticipantSourceList(item, participantType) {
			const candidates = participantType === 'quote'
				? [item.participants, item.participantList, item.quoteUserList, item.quotePreviewList, item.quoteList]
				: [item.participants, item.participantList, item.receiverList, item.acceptUserList, item.orderUserList];
			const source = candidates.find(value => Array.isArray(value) && value.length > 0);
			return source || [];
		},
		buildSingleParticipant(item, participantType) {
			const userId = participantType === 'quote'
				? (item.quoteUserId || item.quoteWxUserId)
				: (item.receiverUserId || item.acceptUserId || item.orderUserId);
			const avatar = participantType === 'quote'
				? (item.quoteUserAvatar || item.quoteAvatar)
				: (item.receiverAvatarUrl || item.acceptAvatarUrl || item.orderUserAvatar);
			const name = participantType === 'quote'
				? (item.quoteUserName || item.quoteNickName)
				: (item.receiverUserName || item.acceptUserName || item.orderUserName);
			if (!userId && !avatar) {
				return null;
			}
			return {
				key: `${userId || 'single'}-0`,
				userId: userId ? String(userId) : '',
				name: name || '',
				avatar: this.buildImageUrl(avatar) || DEFAULT_AVATAR
			};
		},
		resolveParticipantCount(item, participantType, fallbackCount) {
			// 优先使用去重后的头像列表长度，避免后端计数字段记录同一用户多次
			if (fallbackCount > 0) {
				return fallbackCount;
			}
			const countFields = participantType === 'quote'
				? ['participantCount', 'quoteCount', 'quoteUserCount', 'quoteNum', 'quoteTotal']
				: ['participantCount', 'acceptCount', 'receiverCount', 'orderCount', 'orderUserCount', 'acceptedCount'];
			for (const field of countFields) {
				const count = Number(item[field]);
				if (Number.isFinite(count) && count >= 0) {
					return count;
				}
			}
			return 0;
		},
		buildParticipantLabel(participantType, count) {
			const prefix = participantType === 'quote' ? '报价' : '接单';
			return `${prefix}${Number.isFinite(Number(count)) ? Number(count) : 0}`;
		},
		formatPublishDate(value) {
			if (!value) {
				return '未知时间';
			}
			const text = String(value).trim().replace(/-/g, '/');
			return text.length >= 10 ? text.slice(0, 10) : text;
		},
		buildDeadlineText(deliveryDate) {
			if (!deliveryDate) {
				return '';
			}
			const text = String(deliveryDate).trim().replace(/-/g, '/');
			const date = text.length >= 10 ? text.slice(0, 10) : text;
			return date ? `截止时间：${date}` : '';
		},
		formatPrice(budgetAmount, isOtherPartyQuote) {
			const hasAmount = budgetAmount !== '' && budgetAmount !== null && budgetAmount !== undefined;
			if (Number(isOtherPartyQuote) === 1) {
				return hasAmount ? `￥${budgetAmount}` : '￥?';
			}
			if (!hasAmount) {
				return '预算待定';
			}
			return `￥${budgetAmount}`;
		},
		buildStatusAvatar(item, fallbackAvatar) {
			const avatar = this.buildImageUrl(
				item.quoteUserAvatar || item.quoteAvatar || item.receiverAvatarUrl || item.acceptAvatarUrl || item.avatarUrl
			);
			return avatar || fallbackAvatar || DEFAULT_AVATAR;
		},
		buildImageUrl(url) {
			if (!url) {
				return '';
			}
			if (/^(https?:|wxfile:|data:|\/static\/)/.test(url)) {
				return url;
			}
			return env.aliyunUrl + String(url).replace(/^\/+/, '') + '?x-oss-process=image/resize,w_750/quality,q_65/format,webp';
		},
		goDetail(item) {
			if (!item || !item.channelId) {
				uni.showToast({
					title: '任务信息缺失',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
			url: `/subpkg-task/pages/detail/index?id=${item.channelId}&channelId=${item.channelId}&taskId=${item.taskId}&publishTime=${encodeURIComponent(item.publishTime || '')}`
		});
	},
	handleParticipantClick(participant) {
			if (!participant || !participant.userId) {
				uni.showToast({
					title: '用户信息缺失',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/subpkg-library/pages/visitor-home?userId=${encodeURIComponent(participant.userId)}`
			});
		},
		handleParticipantMore(item) {
			if (!item || !item.channelId) {
				return;
			}
			this.goDetail(item);
		},
		handleQuickAction(item) {
			if (!item || !item.channelId) {
				uni.showToast({
					title: '任务信息缺失',
					icon: 'none'
				});
				return;
			}
			if (item.hasLockedOrder) {
				return;
			}
			if (item.hasOperated) {
				uni.navigateTo({
					url: `/subpkg-task/pages/detail/index?id=${item.channelId}&channelId=${item.channelId}&taskId=${item.taskId}&autoAction=cancel&publishTime=${encodeURIComponent(item.publishTime || '')}`
				});
				return;
			}
			const actionType = item.participantType === 'quote' ? 'quote' : 'accept';
		uni.navigateTo({
			url: `/subpkg-task/pages/detail/index?id=${item.channelId}&channelId=${item.channelId}&taskId=${item.taskId}&autoAction=${actionType}&publishTime=${encodeURIComponent(item.publishTime || '')}`
	});
	},
		updateCardOperatedStatus() {
			const updateInfo = uni.getStorageSync(this.CARD_UPDATE_KEY);
			if (!updateInfo || !updateInfo.channelId) {
				return;
			}
			uni.removeStorageSync(this.CARD_UPDATE_KEY);
			const targetId = String(updateInfo.channelId);
			const index = this.visibleList.findIndex(item => String(item.channelId) === targetId);
			if (index !== -1) {
				this.$set(this.visibleList[index], 'hasOperated', !updateInfo.cancel);
				if (updateInfo.cancel) {
					this.$set(this.visibleList[index], 'hasLockedOrder', false);
				}
			}
		},
		handleShareTask() {
			// open-type="share" 触发原生分享；这里仅阻止卡片点击冒泡。
		},
		handleTaskScroll(e) {
			const detail = e && e.detail ? e.detail : {};
			this.pcScrollTop = typeof detail.scrollTop === 'number' ? detail.scrollTop : 0;
		},
		getPointerY(e) {
			if (!e) return 0;
			const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
			if (touch && typeof touch.clientY === 'number') return touch.clientY;
			if (typeof e.clientY === 'number') return e.clientY;
			return 0;
		},
		onPcPullStart(e) {
			if (this.refreshing) return;
			const y = this.getPointerY(e);
			if (this.pcScrollTop > 0) {
				this.pcPulling = false;
				return;
			}
			this.pcPulling = true;
			this.pcPullTriggered = false;
			this.pcPullStartY = y;
			this.pcPullDistance = 0;
		},
		onPcPullMove(e) {
			if (!this.pcPulling || this.refreshing) return;
			const y = this.getPointerY(e);
			let delta = y - this.pcPullStartY;
			if (delta <= 0) {
				this.pcPullDistance = 0;
				return;
			}
			const max = this.pcPullThreshold * 2.2;
			if (delta > max) {
				delta = max + (delta - max) * 0.3;
			}
			this.pcPullDistance = delta;
			if (delta >= this.pcPullThreshold) {
				this.pcPullTriggered = true;
			}
		},
		onPcPullEnd() {
			if (!this.pcPulling) return;
			const triggered = this.pcPullTriggered;
			this.pcPulling = false;
			this.pcPullTriggered = false;
			this.pcPullDistance = 0;
			if (triggered && !this.refreshing) {
				this.handleRefresh();
			}
		}
	},
	onShareAppMessage(options) {
		const dataset = options && options.target && options.target.dataset ? options.target.dataset : {};
		const channelId = dataset.channelId || '';
		const title = dataset.taskTitle || '广场任务';
		return {
			title,
			path: channelId ? `/subpkg-task/pages/detail/index?id=${channelId}&channelId=${channelId}&fromShare=1` : '/pages/square/index'
		};
	}
};
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	background: #f7f7f7;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.top-area {
	padding: 0 21rpx 24rpx 23rpx;
	box-sizing: border-box;
	background: #ffffff;
	position: relative;
	flex-shrink: 0;
	z-index: 2;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	min-height: calc(100rpx + var(--status-bar-height));
}

.search-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 66rpx;
}

.search-box {
	width: 346rpx;
	height: 66rpx;
	border-radius: 33rpx;
	background: #f5f5f5;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	box-sizing: border-box;
}

.search-icon {
	width: 30rpx;
	height: 30rpx;
	margin-right: 14rpx;
	opacity: 0.55;
}

.search-input {
	flex: 1;
	height: 66rpx;
	font-size: 26rpx;
	line-height: 66rpx;
	color: #333333;
}

.search-placeholder {
	font-size: 26rpx;
	color: #b1b1b1;
}

.capsule {
	width: 197rpx;
	height: 65rpx;
	border: 1rpx solid #e8e8e8;
	border-radius: 33rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
	position: absolute;
	right: 21rpx;
	top: 12rpx;
}

.more {
	width: 44rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.more text {
	width: 8rpx;
	height: 8rpx;
	border-radius: 50%;
	background: #000000;
}

.capsule-line {
	width: 1rpx;
	height: 36rpx;
	margin: 0 28rpx;
	background: #e1e1e1;
}

.circle-dot {
	width: 31rpx;
	height: 31rpx;
	border: 5rpx solid #000000;
	border-radius: 50%;
	box-sizing: border-box;
	position: relative;
}

.circle-dot::after {
	content: '';
	position: absolute;
	left: 8rpx;
	top: 8rpx;
	width: 5rpx;
	height: 5rpx;
	border-radius: 50%;
	background: #000000;
}

.filter-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 27rpx;
	padding: 0 6rpx 0 5rpx;
}

.filter-picker {
	width: 240rpx;
}

.filter-picker-right {
	display: flex;
	justify-content: flex-end;
}

.filter-item {
	display: flex;
	align-items: center;
	width: 240rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #979797;
}

.filter-item-right {
	justify-content: flex-end;
}

.filter-text {
	max-width: 200rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.arrow {
	width: 18rpx;
	height: 12rpx;
	margin-left: 14rpx;
	flex-shrink: 0;
}

.task-scroll {
	flex: 1;
	height: 0;
	min-height: 0;
	background: #f7f7f7;
}

.task-list {
	padding: 16rpx 29rpx 34rpx 32rpx;
	box-sizing: border-box;
}

.task-card {
	width: 689rpx;
	margin-bottom: 20rpx;
	border-radius: 16rpx;
	background: #ffffff;
	overflow: hidden;
}

button {
	margin: 0;
	padding: 0;
	background: transparent;
	line-height: normal;
}

button::after {
	border: 0;
}

.task-card-cover {
	min-height: 679rpx;
	padding-bottom: 20rpx;
}

.task-card-simple {
	min-height: 320rpx;
	padding-bottom: 20rpx;
}

.task-head {
	height: 120rpx;
	padding: 19rpx 24rpx 0;
	box-sizing: border-box;
	display: flex;
	align-items: flex-start;
	position: relative;
}

.task-avatar {
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
	margin-right: 15rpx;
	background: #d8d8d8;
	flex-shrink: 0;
}

.task-title-wrap {
	min-width: 0;
	flex: 1;
}

.task-name {
	display: block;
	font-size: 32rpx;
	font-family: PingFang SC;
	margin-top: 6rpx;
	line-height: 46rpx;
	font-weight: 700;
	color: #000000;
}

.publish-date {
	display: block;
	margin-top: -6rpx;
	font-size: 20rpx;
	line-height: 48rpx;
	color: #979797;
}

.deadline {
	position: absolute;
	right: 24rpx;
	bottom: 31rpx;
	font-size: 20rpx;
	line-height: 1rpx;
	color: #979797;
}

.cover-image {
	display: block;
	width: 689rpx;
	height: 380rpx;
	background: #f0f0f0;
	margin-top: 30rpx;
	margin-bottom: 20rpx;
}

.dash-divider {
	width: 637rpx;
	margin: 26rpx auto 20rpx;
	border-top: 2rpx dashed #d4d4d4;
}

.title{
	display: block;
	padding: 22rpx 23rpx 0;
	font-family: PingFang SC;
	font-size: 30rpx;
	font-weight: 500;
	color: #000000;
	// margin-bottom: 10rpx;
}

.desc {
	display: block;
	padding: 22rpx 23rpx 0;
	font-family: PingFang SC;
	font-size: 24rpx;
	color: #000000;
	margin-bottom: 10rpx;
}

.task-card-cover .desc {
	padding-top: 22rpx;
	text-align: left;
}

.task-card-cover .title {
	padding-top: 22rpx;
	text-align: left;
}

.budget {
	display: block;
	padding: 2rpx 23rpx 0;
	font-size: 32rpx;
	line-height: 45rpx;
	color: #f37738;
}

.bottom-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 1rpx 23rpx 0;
}

.task-card-cover .bottom-row {
	margin-top: 0rpx;
}

.participant-area {
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 0;
	height: 54rpx;
}

.participant-count {
	font-size: 20rpx;
	line-height: 28rpx;
	color: #b4b4b4;
	margin-right: 16rpx;
	flex-shrink: 0;
}

.participant-avatars {
	display: flex;
	align-items: center;
	min-width: 0;
}

.participant-avatar {
	width: 42rpx;
	height: 42rpx;
	margin-right: 8rpx;
	border: 2rpx solid #ffffff;
	border-radius: 50%;
	background: #f2f2f2;
	box-sizing: border-box;
	flex-shrink: 0;
}

.participant-more {
	margin-left: 2rpx;
	font-size: 24rpx;
	line-height: 32rpx;
	color: #b4b4b4;
}

.task-share-btn {
	width: 39rpx;
	height: 41rpx;
	margin-left: 18rpx;
	border-radius: 18rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.task-action-btn {
	width: 150rpx;
	height: 48rpx;
	padding: 0 24rpx;
	margin-left: 12rpx;
	border-radius: 27rpx;
	background: #f37738;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #ffffff;
	flex-shrink: 0;
}

.task-action-btn::after {
	border: 0;
}

.task-action-btn-disabled {
	background: #cccccc;
	color: #ffffff;
}

.share-icon {
	width: 34rpx;
	height: 34rpx;
	display: block;
}

.empty-state {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 240rpx;
	font-size: 24rpx;
	color: #b2b2b2;
}

.load-state {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 116rpx;
	font-size: 22rpx;
	color: #b2b2b2;
}

.pc-list-wrap {
	flex: 1;
	height: 0;
	min-height: 0;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}

.pc-scroll-wrap {
	flex: 1;
	min-height: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	will-change: transform;
}

.page.pc-pulling {
	cursor: grab;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.pc-pull-tip {
	width: 100%;
	overflow: hidden;
	pointer-events: none;
	position: relative;
}

.pc-pull-visible .pc-pull-inner {
	opacity: 1;
}

.pc-pull-inner {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	opacity: 0;
	transition: opacity .2s ease;
	padding-bottom: 10rpx;
	box-sizing: border-box;
}

.pc-pull-text {
	font-size: 24rpx;
	color: #999999;
	line-height: 1;
}

.pc-pull-spinner {
	width: 28rpx;
	height: 28rpx;
	border: 3rpx solid #e5e5e5;
	border-top-color: #ff6b35;
	border-radius: 50%;
	box-sizing: border-box;
	animation: pc-pull-spin .7s linear infinite;
}

@keyframes pc-pull-spin {
	to { transform: rotate(360deg); }
}

.price-popup-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 9999;
	display: flex;
	align-items: flex-end;
}

.price-popup {
	width: 100%;
	background: #ffffff;
	border-radius: 30rpx 30rpx 30rpx 30rpx;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding-bottom: env(safe-area-inset-bottom);
	margin: 22rpx;
}

.price-popup-header {
	display: flex;
	align-items: center;
	// justify-content: center;
	padding: 50rpx 32rpx 30rpx;
	position: relative;
}

.price-popup-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #000000;
}

.price-popup-no-limit {
	position: absolute;
	right: 40rpx;
	top: 60%;
	transform: translateY(-50%);
	font-size: 28rpx;
	color: #999999;
}

.price-popup-close {
	position: absolute;
	right: 32rpx;
	top: 80%;
	transform: translateY(-50%);
	width: 56rpx;
	height: 56rpx;
	line-height: 52rpx;
	text-align: center;
	font-size: 80rpx;
	font-weight: 300;
	color: #000;
}

.price-popup-options {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx 32rpx;
	gap: 20rpx;
}

.price-option {
	width: calc((100% - 40rpx) / 3);
	height: 72rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	color: #666666;
	background: #FFFFFF;
	border-radius: 226rpx;
	box-sizing: border-box;
	border: 1rpx solid #CECECE;
}

.price-option.active {
	background: #fff3eb;
	color: #f37738;
	font-weight: 500;
	border: 1rpx solid #f37738;
}

.price-popup-custom {
	padding: 20rpx 32rpx;
}

.price-custom-label {
	font-size: 26rpx;
	color: #000000;
	margin-bottom: 20rpx;
}

.price-custom-inputs {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.price-custom-input {
	flex: 1;
	height: 72rpx;
	background: #f5f5f5;
	border-radius: 16rpx;
	text-align: center;
	font-size: 30rpx;
	color: #333333;
}

.price-custom-placeholder {
	color: #bbbbbb;
	font-size: 30rpx;
}

.price-custom-sep {
	font-size: 30rpx;
	color: #F1F1F1;
}

.price-popup-footer {
	display: flex;
	padding: 24rpx 51rpx;
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	gap: 42rpx;
}

.price-popup-btn {
	flex: 1;
	height: 88rpx;
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	font-weight: 500;
	margin-bottom: 20rpx;
}

.price-popup-btn-reset {
	border: 1rpx solid #979797;
	background: #FFFFFF;
	color: #979797;
}

.price-popup-btn-confirm {
	background: #F37738;
	color: #ffffff;
}
</style>
