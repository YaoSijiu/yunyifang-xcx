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
		<view class="condition-panel">
			<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="top-shell">
				<view class="search-box">
					<image class="search-icon" src="/static/home/搜索.png" mode="aspectFit"></image>
					<input
						class="search-input"
						v-model="searchKeyword"
						placeholder="平面设计"
						placeholder-class="search-placeholder"
						placeholder-style="color: #b1b1b1; font-size: 26rpx;"
						confirm-type="search"
						@input="handleSearchInput"
						@confirm="handleSearch"
					/>
				</view>
			</view>

			<view class="primary-tabs-wrapper">
			<view class="primary-tabs"
				@mousedown="onDragStart"
				@mousemove="onDragMove"
				@mouseup="onDragEnd"
				@mouseleave="onDragEnd"
				@touchstart="onDragStart"
				@touchmove="onDragMove"
				@touchend="onDragEnd">
				<view class="primary-tabs-track" :style="{ transform: 'translateX(' + translateX + 'px)' }">
						<view
							v-for="(item, index) in primaryTabs"
							:key="item.key"
							class="primary-tab"
							:class="{ active: activePrimaryTab === index }"
							@click="switchPrimaryTab(index)"
						>
							<text>{{ item.label }}</text>
							<image v-if="activePrimaryTab === index" class="primary-underline" src="/static/common/选中条.png" />
						</view>
				</view>
			</view>
			<view class="expand-btn" @click="toggleTabDropdown">
				<image class="triangle" :class="{ rotated: tabExpanded }" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
				<!-- <text class="triangle" :class="{ rotated: tabExpanded }">▼</text> -->
			</view>
		</view>

		<view v-if="tabExpanded" class="tab-dropdown-mask" :style="{ top: tabPanelTop + 'px' }" @click="tabExpanded = false">
			
			<view class="tab-dropdown-panel" @click.stop>
				<view class="tab-dropdown-panel-title">
					<text class="tab-dropdown-panel-tags">所有标签</text>
				</view>
				<view
					v-for="(item, index) in primaryTabs"
					:key="item.key"
					class="tab-expand-item"
					:class="{ active: activePrimaryTab === index }"
					@click="onTabExpandSelect(index)"
				>
					<text class="tab-expand-label">{{ item.label }}</text>
				</view>
			</view>
		</view>

		<view class="secondary-tabs">
				<view
					v-for="(item, index) in secondaryTabs"
					:key="item.key"
					class="secondary-control"
					:class="{ 'secondary-control-price': item.key === 'price' }"
				>
					<view
					v-if="item.key === 'location'"
						class="location-filter-wrap"
					>
						<view
							class="secondary-tab"
							:class="{ active: activeSecondaryTab === index }"
							@click="prepareAreaPicker"
						>
							<text class="secondary-text">{{ selectedRegionText || item.label }}</text>
							<image class="filter-arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
						</view>
						<text
							v-if="selectedRegionId"
							class="filter-clear"
							@click.stop="clearRegionFilter"
						>×</text>
					</view>
					<view
					v-else-if="item.key === 'price'"
						class="secondary-picker"
						@click="openPricePopup"
					>
						<view
						class="secondary-tab filter"
						:class="{ active: selectedPriceIndex >= 0 || isCustomPrice }"
					>
							<text class="secondary-text">{{ selectedPriceLabel }}</text>
							<image class="filter-arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
						</view>
					</view>
					<view
						v-else
						class="secondary-tab"
						:class="{ active: activeSecondaryTab === index }"
						@click="switchSecondaryTab(index)"
					>
						<text>{{ item.label }}</text>
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
					class="content-scroll"
					lower-threshold="90"
					refresher-enabled
					:refresher-triggered="refreshing"
					refresher-background="#ffffff"
					@refresherrefresh="handleRefresh"
					@scrolltolower="loadMoreCards"
					@scroll="handleContentScroll"
				>
			<view class="card-grid">
				<view class="card-column">
					<view
						v-for="card in leftColumn"
						:key="card.id"
						class="card"
						@click="previewCard(card)"
					>
						<view class="card-cover-wrap" :style="{ height: card.coverHeight + 'rpx' }">
							<image v-if="card.cover" class="card-cover" :src="card.cover" mode="aspectFill"></image>
							<view v-else class="scene-cover" :class="card.scene">
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-badge"></view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-lines">
									<text></text>
									<text></text>
									<text></text>
								</view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-poster">
									<view class="poster-head"></view>
									<view class="poster-grid">
										<text></text>
										<text></text>
										<text></text>
										<text></text>
									</view>
								</view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-fruit"></view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-slice pineapple-slice-left"></view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-slice pineapple-slice-right"></view>

								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-sun"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-box-main"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-box-small mooncake-box-small-left"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-box-small mooncake-box-small-right"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-tag"></view>

								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-shadow"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-pack zongzi-pack-top"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-pack zongzi-pack-bottom"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-branch zongzi-branch-left"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-branch zongzi-branch-mid"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-branch zongzi-branch-right"></view>
							</view>
							<view class="card-menu">
								<text></text>
								<text></text>
								<text></text>
							</view>
						</view>
						<view class="card-meta">
							<image class="designer-avatar" :src="card.avatar" mode="aspectFill"></image>
							<text class="designer-name">{{ card.author }}</text>
						</view>
						<view class="card-title">{{ card.title }}</view>
						<view class="card-footer">
							<text class="price">
								<text
									v-for="(seg, i) in splitPriceSegments(card.price)"
									:key="i"
									:class="seg.num ? 'price-num' : 'price-unit'"
								>{{ seg.text }}</text>
							</text>
							<text class="sold">{{ card.sold }}</text>
						</view>
					</view>
				</view>
				<view class="card-column">
					<view
						v-for="card in rightColumn"
						:key="card.id"
						class="card"
						@click="previewCard(card)"
					>
						<view class="card-cover-wrap" :style="{ height: card.coverHeight + 'rpx' }">
							<image v-if="card.cover" class="card-cover" :src="card.cover" mode="aspectFill"></image>
							<view v-else class="scene-cover" :class="card.scene">
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-badge"></view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-lines">
									<text></text>
									<text></text>
									<text></text>
								</view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-poster">
									<view class="poster-head"></view>
									<view class="poster-grid">
										<text></text>
										<text></text>
										<text></text>
										<text></text>
									</view>
								</view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-fruit"></view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-slice pineapple-slice-left"></view>
								<view v-if="card.scene === 'scene-pineapple'" class="pineapple-slice pineapple-slice-right"></view>

								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-sun"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-box-main"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-box-small mooncake-box-small-left"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-box-small mooncake-box-small-right"></view>
								<view v-if="card.scene === 'scene-mooncake'" class="mooncake-tag"></view>

								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-shadow"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-pack zongzi-pack-top"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-pack zongzi-pack-bottom"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-branch zongzi-branch-left"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-branch zongzi-branch-mid"></view>
								<view v-if="card.scene === 'scene-zongzi'" class="zongzi-branch zongzi-branch-right"></view>
							</view>
							<view class="card-menu">
								<text></text>
								<text></text>
								<text></text>
							</view>
						</view>
						<view class="card-meta">
							<image class="designer-avatar" :src="card.avatar" mode="aspectFill"></image>
							<text class="designer-name">{{ card.author }}</text>
						</view>
						<view class="card-title">{{ card.title }}</view>
						<view class="card-footer">
							<text class="price">
								<text
									v-for="(seg, i) in splitPriceSegments(card.price)"
									:key="i"
									:class="seg.num ? 'price-num' : 'price-unit'"
								>{{ seg.text }}</text>
							</text>
							<text class="sold">{{ card.sold }}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="!loading && visibleCards.length === 0" class="empty-state">
				<text>{{ emptyStateText }}</text>
			</view>
			<view v-if="visibleCards.length > 0" class="load-state">
				<text v-if="loading">加载中...</text>
				<text v-else-if="finished">没有更多了</text>
				<text v-else>上滑加载更多</text>
			</view>
				<view class="bottom-gap"></view>
				</scroll-view>
			</view>
		</view>

		<yun-tabbar :selected="0"></yun-tabbar>

		<view
		v-if="areaPopupVisible"
		class="area-popup-mask"
		@click="cancelAreaSelection"
	>
		<view class="area-popup" @click.stop>
			<view class="area-popup-header">
				<text class="area-popup-title">选择地理位置</text>
				<view class="area-popup-close" @click="cancelAreaSelection">×</view>
			</view>
			<picker-view
				class="area-popup-picker"
				indicator-style="height: 88rpx;"
				:value="tempAreaIndexes"
				@change="onAreaColumnChange"
			>
				<picker-view-column class="area-popup-column">
					<view
						v-for="(item, idx) in areaColumns[0]"
						:key="idx"
						class="area-popup-option"
					>{{ item.name }}</view>
				</picker-view-column>
				<picker-view-column class="area-popup-column">
					<view
						v-for="(item, idx) in areaColumns[1]"
						:key="idx"
						class="area-popup-option"
					>{{ item.name }}</view>
				</picker-view-column>
			</picker-view>
			<view class="area-popup-footer">
				<view class="area-popup-btn area-popup-btn-cancel" @click="cancelAreaSelection">取消</view>
				<view class="area-popup-btn area-popup-btn-confirm" @click="confirmAreaSelection">确定</view>
			</view>
		</view>
	</view>

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
				<text class="price-popup-title-2">（元）</text>
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


const PRICE_OPTIONS = [
	{ label: '0-1000', minPrice: '0', maxPrice: '1000' },
	{ label: '1000-2000', minPrice: '1000', maxPrice: '2000' },
	{ label: '2000-3000', minPrice: '2000', maxPrice: '3000' },
	{ label: '3000-4000', minPrice: '3000', maxPrice: '4000' },
	{ label: '4000-5000', minPrice: '4000', maxPrice: '5000' },
	{ label: '5000以上', minPrice: '5000', maxPrice: '' }
];

export default {
	data() {
		return {
			statusBarHeight: 0,
			searchKeyword: '',
			activePrimaryTab: 1,
			activeSecondaryTab: 0,
			pageNo: 1,
			pageSize: 6,
			loading: false,
			finished: false,
			total: 0,
			searchTimer: null,
			requestSeq: 0,
			hasCheckedProfessionPush: false,
			areaTree: [],
			areaColumns: [[], []],
			areaIndexes: [0, 0],
			tempAreaIndexes: [0, 0],
			areaLoading: false,
			areaPopupVisible: false,
			tabExpanded: false,
			tabPanelTop: 0,
			selectedRegionId: '',
			selectedRegionText: '',
			selectedRegionPath: [],
			priceOptions: PRICE_OPTIONS,
			selectedPriceIndex: -1,
			pricePopupVisible: false,
			tempSelectedPriceIndex: -1,
			tempCustomMinPrice: '',
			tempCustomMaxPrice: '',
			isCustomPrice: false,
			primaryTabs: [
				{ label: '关注', key: 'fixed_follow', type: 'follow' },
				{ label: '推荐', key: 'fixed_recommend', type: 'recommend' }
			],
			secondaryTabs: [
				{ label: '最受欢迎', key: 'popular', type: 'popular' },
				{ label: '新入驻', key: 'latest' },
				{ label: '地理位置', key: 'location' },
				{ label: '价格', key: 'price' }
			],
			visibleCards: [],
			leftColumn: [],
			rightColumn: [],
			leftColumnHeight: 0,
			rightColumnHeight: 0,
			translateX: 0,
			isDragging: false,
			dragStartX: 0,
			dragStartTranslate: 0,
			maxScroll: 0,
			hasDragged: false,
			preventClick: false,
			refreshing: false,
			pcPullStartY: 0,
			pcPullDistance: 0,
			pcPulling: false,
			pcPullTriggered: false,
			pcPullThreshold: 70,
			pcScrollTop: 0
		};
	},
	computed: {
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
		emptyStateText() {
			const activeTab = this.primaryTabs[this.activePrimaryTab];
			return activeTab && activeTab.type === 'follow' ? '暂无关注' : '暂无橱窗';
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
		}
	},
	created() {
		const windowInfo = uni.getWindowInfo();
		this.statusBarHeight = windowInfo.statusBarHeight || 20;
		this.loadTaskTypeTabs();
		this.loadAreaTree();
		this.resetCards();
	},
	onShow() {
		uni.hideTabBar({
			animation: false
		});
		this.checkProfessionPushPreference();
	},
	beforeDestroy() {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer);
			this.searchTimer = null;
		}
	},
	methods: {
		async checkProfessionPushPreference() {
			if (this.hasCheckedProfessionPush) {
				return;
			}
			if (!uni.getStorageSync('token')) {
				return;
			}
			this.hasCheckedProfessionPush = true;
			try {
				const res = await request.get('/wechat/professionCategory/hasTaskType');
				if (res.data === true) {
					return;
				}
				uni.navigateTo({
					url: '/subpkg-others/pages/professionCategory/select'
				});
			} catch (e) {
				this.hasCheckedProfessionPush = false;
			}
		},
		switchPrimaryTab(index) {
			if (this.preventClick) return;
			this.activePrimaryTab = index;
			this.scrollActiveTabIntoView(index);
			this.resetCards();
		},
		onTabExpandSelect(index) {
			this.activePrimaryTab = index;
			this.tabExpanded = false;
			this.$nextTick(() => {
				this.scrollActiveTabIntoView(index);
			});
			this.resetCards();
		},
		scrollActiveTabIntoView(index) {
			const targetIndex = (typeof index === 'number') ? index : this.activePrimaryTab;
			const query = uni.createSelectorQuery().in(this);
			query.select('.primary-tabs').boundingClientRect();
			query.selectAll('.primary-tab').boundingClientRect();
			query.exec(res => {
				const viewport = res && res[0];
				const tabs = res && res[1];
				if (!viewport || !tabs || !tabs[targetIndex]) return;
				const tab = tabs[targetIndex];
				const containerWidth = viewport.width;
				const tabCenter = tab.left + tab.width / 2 - (viewport.left || 0);
				const viewportCenter = containerWidth / 2;
				const delta = tabCenter - viewportCenter;
				const targetX = this.translateX - delta;
				const maxX = -this.maxScroll;
				this.translateX = Math.max(maxX, Math.min(0, targetX));
			});
		},
		toggleTabDropdown() {
			if (this.tabExpanded) {
				this.tabExpanded = false;
				return;
			}
			const query = uni.createSelectorQuery().in(this);
			query.select('.primary-tabs-wrapper').boundingClientRect();
			query.exec(res => {
				if (res && res[0]) {
					this.tabPanelTop = res[0].bottom;
				}
				this.tabExpanded = true;
			});
		},
		async loadTaskTypeTabs() {
			try {
				const res = await request.get('/wechat/homePage/taskTypeTags');
				const tags = this.extractTaskTypeTags(res);
				this.primaryTabs = this.buildPrimaryTabs(tags);
			} catch (e) {
				this.primaryTabs = this.buildPrimaryTabs([]);
			} finally {
				this.$nextTick(() => { this.updateScrollBounds(); });
			}
		},
		updateScrollBounds() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.primary-tabs').boundingClientRect();
			query.select('.primary-tabs-track').boundingClientRect();
			query.exec(res => {
				if (res && res[0] && res[1]) {
					this.maxScroll = Math.max(0, res[1].width - res[0].width);
					if (this.translateX < -this.maxScroll) {
						this.translateX = -this.maxScroll;
					}
				}
			});
		},
		onDragStart(e) {
			this.isDragging = true;
			this.hasDragged = false;
			const point = (e.touches && e.touches[0]) ? e.touches[0] : e;
			this.dragStartX = point.clientX || 0;
			this.dragStartTranslate = this.translateX;
		},
		onDragMove(e) {
			if (!this.isDragging) return;
			const point = (e.touches && e.touches[0]) ? e.touches[0] : e;
			const delta = (point.clientX || 0) - this.dragStartX;
			if (Math.abs(delta) > 5) { this.hasDragged = true; }
			let newX = this.dragStartTranslate + delta;
			newX = Math.max(-this.maxScroll, Math.min(0, newX));
			this.translateX = newX;
		},
		onDragEnd() {
			this.isDragging = false;
			if (this.hasDragged) {
				this.preventClick = true;
				setTimeout(() => { this.preventClick = false; }, 100);
			}
		},
		extractTaskTypeTags(res) {
			if (Array.isArray(res)) {
				return res;
			}
			if (Array.isArray(res && res.rows)) {
				return res.rows;
			}
			const data = res && res.data;
			if (Array.isArray(data)) {
				return data;
			}
			if (Array.isArray(data && data.rows)) {
				return data.rows;
			}
			if (Array.isArray(data && data.list)) {
				return data.list;
			}
			if (Array.isArray(data && data.records)) {
				return data.records;
			}
			return [];
		},
		buildPrimaryTabs(tags) {
			const fixedTabs = [
				{ label: '关注', key: 'fixed_follow', type: 'follow' },
				{ label: '推荐', key: 'fixed_recommend', type: 'recommend' }
			];
			const seenKeys = {};
			const dynamicTabs = (tags || []).reduce((result, item) => {
				const categoryName = this.resolveProfessionCategoryName(item);
				const categoryKey = this.resolveProfessionCategoryKey(item);
				if (!categoryName || !categoryKey || seenKeys[categoryKey]) {
					return result;
				}
				seenKeys[categoryKey] = true;
				result.push({
					label: categoryName,
					key: `category_${categoryKey}`,
					professionCategoryId: this.resolveProfessionCategoryId(item),
					categoryCode: item && item.categoryCode ? String(item.categoryCode) : ''
				});
				return result;
			}, []);
			return fixedTabs.concat(dynamicTabs);
		},
		resolveProfessionCategoryName(item) {
			if (!item) {
				return '';
			}
			return String(item.categoryName || item.professionCategoryName || item.name || item.label || '').trim();
		},
		resolveProfessionCategoryKey(item) {
			if (!item) {
				return '';
			}
			const id = this.resolveProfessionCategoryId(item);
			if (id) {
				return `id_${id}`;
			}
			const categoryCode = item.categoryCode ? String(item.categoryCode).trim() : '';
			if (categoryCode) {
				return `code_${categoryCode}`;
			}
			const categoryName = this.resolveProfessionCategoryName(item);
			return categoryName ? `name_${categoryName}` : '';
		},
		resolveProfessionCategoryId(item) {
			if (!item) {
				return '';
			}
			const id = item.professionCategoryId || item.categoryId || item.id;
			if (id) {
				return id;
			}
			const categoryCode = item.categoryCode ? String(item.categoryCode) : '';
			return /^\d+$/.test(categoryCode) ? categoryCode : '';
		},
		switchSecondaryTab(index) {
			this.activeSecondaryTab = index;
			this.resetCards();
		},
		async loadAreaTree() {
			if (this.areaLoading) {
				return;
			}
			this.areaLoading = true;
			try {
				const res = await request.get('/wechat/basic/areaTree');
				const tree = this.normalizeAreas(res && res.data ? res.data : res);
				this.areaTree = tree;
				this.areaIndexes = [0, 0];
				this.updateAreaColumns(this.areaIndexes);
			} catch (e) {
				this.areaTree = [];
				this.areaColumns = [[], []];
				this.areaIndexes = [0, 0];
			} finally {
				this.areaLoading = false;
			}
		},
		normalizeAreas(list) {
			return (Array.isArray(list) ? list : []).map(item => ({
				id: item.id || item.regionId || item.value || '',
				name: item.name || item.regionName || item.label || '',
				children: this.normalizeAreas(item.children || item.childList || item.child || [])
			})).filter(item => item.id || item.name);
		},
		prepareAreaPicker() {
			if (!this.areaTree.length) {
				this.loadAreaTree();
			}
			this.tempAreaIndexes = this.areaIndexes.slice();
			this.updateAreaColumns(this.tempAreaIndexes);
			this.areaPopupVisible = true;
		},
		onAreaColumnChange(event) {
			const newValue = event.detail.value;
			const indexes = Array.isArray(newValue) ? newValue.slice() : [0, 0];
			if (indexes[0] !== this.tempAreaIndexes[0]) {
				indexes[1] = 0;
			}
			this.tempAreaIndexes = indexes;
			this.updateAreaColumns(indexes);
		},
		updateAreaColumns(indexes) {
			const provinceIndex = indexes[0] || 0;
			const provinces = this.areaTree;
			const realProvince = provinceIndex > 0 ? provinces[provinceIndex - 1] : null;
			const cities = realProvince && realProvince.children && realProvince.children.length
				? realProvince.children
				: [];
			const provinceCol = provinces.length ? [{ id: '', name: '全部' }].concat(provinces) : [];
			const cityCol = cities.length ? [{ id: '', name: '全部' }].concat(cities) : [{ id: '', name: '全部' }];
			this.areaColumns = [provinceCol, cityCol];
		},
		confirmAreaSelection() {
			this.areaIndexes = this.tempAreaIndexes.slice();
			const path = this.getSelectedRegionPath(this.areaIndexes);
			const locationIndex = this.secondaryTabs.findIndex(item => item.key === 'location');
			this.selectedRegionPath = path;
			if (path.length === 0) {
				this.selectedRegionId = '';
				this.selectedRegionText = '';
				if (this.activeSecondaryTab === locationIndex) {
					this.activeSecondaryTab = 0;
				}
			} else {
				const selected = path[path.length - 1];
				this.selectedRegionId = String(selected.id);
				this.selectedRegionText = path.map(item => item.name).filter(Boolean).join('');
				this.activeSecondaryTab = locationIndex;
			}
			this.areaPopupVisible = false;
			this.resetCards();
		},
		cancelAreaSelection() {
			this.areaPopupVisible = false;
		},
		getSelectedRegionPath(indexes) {
			const provinceIndex = indexes[0] || 0;
			const cityIndex = indexes[1] || 0;
			if (provinceIndex === 0) {
				return [];
			}
			const provinces = this.areaTree;
			const province = provinces[provinceIndex - 1];
			if (!province) {
				return [];
			}
			if (cityIndex === 0) {
				return [province];
			}
			const cities = province.children || [];
			const city = cities[cityIndex - 1];
			if (!city) {
				return [province];
			}
			return [province, city];
		},
		clearRegionFilter() {
			this.selectedRegionId = '';
			this.selectedRegionText = '';
			this.selectedRegionPath = [];
			this.areaIndexes = [0, 0];
			this.tempAreaIndexes = [0, 0];
			this.updateAreaColumns(this.areaIndexes);
			const locationIndex = this.secondaryTabs.findIndex(item => item.key === 'location');
			if (this.activeSecondaryTab === locationIndex) {
				this.activeSecondaryTab = 0;
			}
			this.resetCards();
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
			this.resetCards();
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
			this.resetCards();
		},
		resetCards() {
		this.pageNo = 1;
		this.finished = false;
		this.visibleCards = [];
		this.leftColumn = [];
		this.rightColumn = [];
		this.leftColumnHeight = 0;
		this.rightColumnHeight = 0;
		return this.fetchShowcaseList(1, true);
	},
	async handleRefresh() {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer);
			this.searchTimer = null;
		}
		this.refreshing = true;
		try {
			await this.resetCards();
		} finally {
			this.refreshing = false;
		}
	},
	loadMoreCards() {
		if (this.loading || this.finished) {
			return;
		}
		this.fetchShowcaseList(this.pageNo + 1, false);
	},
	handleContentScroll(e) {
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
	},
		async fetchShowcaseList(pageNo, isRefresh) {
			const requestSeq = ++this.requestSeq;
			this.loading = true;
			let newCards = [];

			try {
				const res = await request.get('/wechat/homePage/showCase/list', this.buildQueryParams(pageNo));
				if (requestSeq === this.requestSeq) {
					const rows = Array.isArray(res.rows) ? res.rows : [];
					newCards = rows.map((item) => this.normalizeShowcaseCard(item));

					this.total = Number(res.total) || 0;
					this.pageNo = pageNo;
					this.visibleCards = isRefresh ? newCards : this.visibleCards.concat(newCards);
					this.finished = rows.length < this.pageSize || this.visibleCards.length >= this.total;

					if (isRefresh) {
						this.leftColumn = [];
						this.rightColumn = [];
						this.leftColumnHeight = 0;
						this.rightColumnHeight = 0;
					}
				}
			} catch (e) {
				if (requestSeq === this.requestSeq) {
					this.finished = isRefresh;
				}
			} finally {
				if (requestSeq === this.requestSeq) {
					this.loading = false;
				}
			}

			if (requestSeq === this.requestSeq && newCards.length > 0) {
				this.distributeCards(newCards, requestSeq);
			}
		},
		buildQueryParams(pageNo) {
			const params = {
				pageNum: pageNo,
				pageSize: this.pageSize
			};
			const keyword = this.searchKeyword.trim();
			if (keyword) {
				params.showcaseTitle = keyword;
			}
			const activeTab = this.primaryTabs[this.activePrimaryTab];
			if (activeTab) {
				if (activeTab.categoryCode) {
					params.categoryCode = activeTab.categoryCode;
				} else if (activeTab.type !== undefined) {
					params.type = activeTab.type;
				}
			}
			const activeSecondary = this.secondaryTabs[this.activeSecondaryTab];
			if (activeSecondary && activeSecondary.type && !(activeTab && activeTab.type === 'follow')) {
				params.type = activeSecondary.type;
			}
			if (activeSecondary && activeSecondary.key === 'location' && this.selectedRegionId) {
				params.regionId = this.selectedRegionId;
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
		normalizeShowcaseCard(item) {
			return {
				id: item.id,
				title: item.showcaseTitle,
				author: item.nickName || '未命名用户',
				price: this.formatPrice(item.price, item.priceUnit),
				sold: `已售${Number(item.salesCount) || 0}`,
				cover: this.buildImageUrl(item.coverImage),
				avatar: this.buildImageUrl(item.avatarUrl) || '/static/yunyiku/avatar.png',
				aspectRatio: 1,
				coverHeight: 346,
				raw: item
			};
		},
		getImageInfo(src) {
			return new Promise((resolve) => {
				uni.getImageInfo({
					src: src,
					success: (res) => resolve(res),
					fail: () => resolve(null)
				});
			});
		},
		calcCoverHeight(aspectRatio) {
			const ratio = Math.max(0.66, Math.min(1.5, aspectRatio));
			return Math.round(346 / ratio);
		},
		async distributeCards(cards, seq) {
			for (const card of cards) {
				if (seq !== this.requestSeq) return;
				if (card.cover) {
					const info = await this.getImageInfo(card.cover);
					if (info) {
						card.aspectRatio = info.width / info.height;
					}
				}
				card.coverHeight = this.calcCoverHeight(card.aspectRatio);
				const cardHeight = card.coverHeight + 220;
				if (this.leftColumnHeight <= this.rightColumnHeight) {
					this.leftColumn.push(card);
					this.leftColumnHeight += cardHeight;
				} else {
					this.rightColumn.push(card);
					this.rightColumnHeight += cardHeight;
				}
			}
		},
		formatPrice(price, unit) {
			const amount = price === null || price === undefined || price === '' ? '0' : price;
			return `¥ ${amount}${unit ? '/' + unit : ''}`;
		},
		splitPriceSegments(price) {
			if (!price) return [{ text: '', num: false }];
			const segments = [];
			const parts = price.split(/(\d+)/);
			for (const part of parts) {
				if (part === '') continue;
				segments.push({ text: part, num: /\d/.test(part) });
			}
			return segments;
		},
		buildImageUrl(url) {
			if (!url) {
				return '';
			}
			if (/^(https?:|wxfile:|data:|\/static\/)/.test(url)) {
				return url;
			}
			return env.aliyunUrl + url + '?x-oss-process=image/resize,w_750/quality,q_65/format,webp';
		},
		handleSearch() {
			if (this.searchTimer) {
				clearTimeout(this.searchTimer);
				this.searchTimer = null;
			}
			this.resetCards();
		},
		handleSearchInput(event) {
			this.searchKeyword = event.detail.value;
			if (this.searchTimer) {
				clearTimeout(this.searchTimer);
			}
			this.searchTimer = setTimeout(() => {
				this.resetCards();
			}, 300);
		},
		previewCard(card) {
			if (!card || !card.id) {
				uni.showToast({
					title: '橱窗信息缺失',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/subpkg-showcase/pages/detail/index?id=${card.id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	background: #f6f6f6;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.condition-panel {
	flex-shrink: 0;
	background: #ffffff;
	position: relative;
	z-index: 2;
}

.status-bar {
	background: #ffffff;
}

.top-shell {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 18rpx 24rpx 12rpx;
	background: #ffffff;
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

.primary-tabs {
	background: #ffffff;
	white-space: nowrap;
	overflow: hidden;
}

.primary-tabs-track {
	display: inline-flex;
	align-items: center;
	padding: 0 8rpx 0 12rpx;
}

.primary-tab {
	position: relative;
	padding: 14rpx 22rpx 28rpx;
	font-size: 30rpx;
	color: #363636;
	flex-shrink: 0;
}

.primary-tab.active {
	font-weight: 500;
	color: #000000;
	
}

.primary-underline {
	position: absolute;
	left: 50%;
	bottom: 6rpx;
	transform: translateX(-50%);
	width: 44rpx;
	height: 11rpx;
}

.primary-tabs-wrapper {
	display: flex;
	align-items: center;
	background: #ffffff;
}

.primary-tabs-wrapper .primary-tabs {
	flex: 1;
	min-width: 0;
}

.expand-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 26rpx 24rpx;
	height: 100%;
	flex-shrink: 0;
	background: linear-gradient(to right, transparent, #ffffff 30%);
	border-left: 1rpx solid #f0f0f0;
	align-self: stretch;
}

.expand-btn .triangle {
	width: 18rpx;
	height: 12rpx;
	
	flex-shrink: 0;
	color: #999;
	transition: transform 0.3s ease;
}

.expand-btn .triangle.rotated {
	transform: rotate(180deg);
}

.tab-dropdown-mask {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 9998;
}

.tab-dropdown-panel {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
	padding: 24rpx;
	background: #ffffff;
}

.tab-expand-item {
	display: flex;
	align-items: center;
	height: 25rpx;
	justify-content: center;
	padding: 14rpx 16rpx;
	border-radius: 10rpx;
	border-radius: 226rpx;
	border: 1rpx solid #CECECE;
}

.tab-expand-item.active {
	background: #fff3eb;
	border: 1rpx solid #F37738;
}

.tab-expand-label {
	font-size: 28rpx;
	color: #333;
}

.tab-expand-item.active .tab-expand-label {
	color: #f37738;
	font-weight: 500;
}

.secondary-tabs {
	display: flex;
	align-items: center;
	padding: 13rpx 24rpx 16rpx;
	background: #ffffff;
	border-top: 1rpx solid #f5f5f5;
	column-gap: 40rpx;
}

.secondary-tab {
	font-size: 24rpx;
	color: #a8a8a8;
	display: flex;
	align-items: center;
	max-width: 180rpx;
	flex-shrink: 0;
}

.secondary-tab.active {
	color: #8a8a8a;
	font-weight: 600;
}

.secondary-tab.filter {
	margin-left: auto;
	color: #9d9d9d;
}

.secondary-control {
	display: flex;
	align-items: center;
	flex-shrink: 0;
}

.secondary-control-price {
	margin-left: auto;
}

.secondary-picker {
	display: flex;
	align-items: center;
	flex-shrink: 0;
}

.location-filter-wrap {
	display: flex;
	align-items: center;
	flex-shrink: 0;
}

.secondary-text {
	min-width: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.filter-arrow {
	width: 18rpx;
	height: 12rpx;
	margin-left: 10rpx;
	flex-shrink: 0;
}

.filter-clear {
	width: 28rpx;
	height: 28rpx;
	margin-left: 8rpx;
	border-radius: 50%;
	background: #eeeeee;
	color: #999999;
	font-size: 22rpx;
	line-height: 26rpx;
	text-align: center;
	flex-shrink: 0;
}

.content-scroll {
	flex: 1;
	height: 0;
	background: #f7f7f7;
	min-height: 1300rpx;
}

.card-grid {
	display: flex;
	padding: 14rpx 23rpx 0;
	column-gap: 12rpx;
}

.card-column {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.card {
	width: 100%;
	background: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	box-shadow: none;
}

.card-cover-wrap {
	position: relative;
	width: 100%;
	background: #f3f3f3;
}

.card-cover {
	width: 100%;
	height: 100%;
}

.scene-cover {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.scene-pineapple {
	background: linear-gradient(135deg, #f8e4b5 0%, #fff8ea 46%, #f1c27d 100%);
}

.pineapple-badge {
	position: absolute;
	top: 16rpx;
	left: 16rpx;
	width: 72rpx;
	height: 28rpx;
	border-radius: 14rpx;
	background: linear-gradient(90deg, #e55e46, #f39d51);
}

.pineapple-lines {
	position: absolute;
	left: 18rpx;
	top: 78rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.pineapple-lines text {
	display: block;
	width: 44rpx;
	height: 6rpx;
	border-radius: 999rpx;
	background: rgba(227, 162, 44, 0.55);
}

.pineapple-poster {
	position: absolute;
	inset: 28rpx 24rpx 28rpx 68rpx;
	border-radius: 10rpx;
	background: rgba(255, 250, 238, 0.74);
	border: 2rpx solid rgba(255, 255, 255, 0.5);
}

.poster-head {
	position: absolute;
	left: 20rpx;
	top: 18rpx;
	width: 110rpx;
	height: 10rpx;
	border-radius: 999rpx;
	background: rgba(243, 184, 83, 0.45);
}

.poster-grid {
	position: absolute;
	left: 20rpx;
	right: 20rpx;
	top: 50rpx;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 18rpx 16rpx;
}

.poster-grid text {
	display: block;
	height: 34rpx;
	border-radius: 8rpx;
	background: rgba(241, 188, 79, 0.25);
}

.pineapple-fruit {
	position: absolute;
	right: -8rpx;
	bottom: -6rpx;
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	background: radial-gradient(circle at 35% 35%, #ffd75a 0%, #f8b12a 52%, #ea8e1f 100%);
	box-shadow: -10rpx -10rpx 0 0 rgba(76, 133, 44, 0.75);
}

.pineapple-slice {
	position: absolute;
	bottom: 18rpx;
	width: 64rpx;
	height: 46rpx;
	background: linear-gradient(180deg, #ffd86b 0%, #ffb53f 100%);
	border-radius: 100rpx 100rpx 20rpx 20rpx;
}

.pineapple-slice-left {
	right: 82rpx;
	transform: rotate(-18deg);
}

.pineapple-slice-right {
	right: 40rpx;
	transform: rotate(14deg);
}

.scene-mooncake {
	background: linear-gradient(180deg, #ffc34b 0%, #ff9d36 54%, #f4c7d7 100%);
}

.mooncake-sun {
	position: absolute;
	left: 30rpx;
	top: 42rpx;
	width: 132rpx;
	height: 132rpx;
	border-radius: 50%;
	background: rgba(255, 196, 120, 0.34);
}

.mooncake-box-main {
	position: absolute;
	left: 18rpx;
	right: 26rpx;
	bottom: 42rpx;
	height: 112rpx;
	border-radius: 12rpx;
	background: linear-gradient(135deg, #df4b30 0%, #f26b3e 56%, #ff8d42 100%);
	box-shadow: 0 18rpx 30rpx rgba(203, 86, 28, 0.18);
}

.mooncake-box-main::before,
.mooncake-box-main::after {
	content: '';
	position: absolute;
	top: 22rpx;
	width: 54rpx;
	height: 54rpx;
	border-radius: 50%;
	background: linear-gradient(180deg, #ffd978 0%, #ffbd47 100%);
}

.mooncake-box-main::before {
	left: 24rpx;
}

.mooncake-box-main::after {
	right: 28rpx;
}

.mooncake-box-small {
	position: absolute;
	bottom: 18rpx;
	width: 40rpx;
	height: 58rpx;
	border-radius: 8rpx;
	background: linear-gradient(180deg, #ff8a3f 0%, #eb5f37 100%);
}

.mooncake-box-small-left {
	left: 54rpx;
}

.mooncake-box-small-right {
	left: 104rpx;
	height: 50rpx;
}

.mooncake-tag {
	position: absolute;
	right: 74rpx;
	bottom: 66rpx;
	width: 16rpx;
	height: 64rpx;
	border-radius: 8rpx;
	background: linear-gradient(180deg, #58ac7b 0%, #2d8b65 100%);
}

.scene-zongzi {
	background: linear-gradient(180deg, #dff0c8 0%, #d7ebc1 40%, #f1f7e9 100%);
}

.zongzi-shadow {
	position: absolute;
	inset: auto 0 0 0;
	height: 72rpx;
	background: linear-gradient(180deg, rgba(196, 221, 178, 0) 0%, rgba(186, 212, 165, 0.55) 100%);
}

.zongzi-pack {
	position: absolute;
	width: 122rpx;
	height: 148rpx;
	border-radius: 10rpx;
	background: linear-gradient(135deg, #447c33 0%, #699c4a 55%, #86af5f 100%);
	box-shadow: 0 12rpx 20rpx rgba(98, 139, 69, 0.16);
}

.zongzi-pack::before {
	content: '';
	position: absolute;
	left: 40rpx;
	top: 18rpx;
	width: 42rpx;
	height: 112rpx;
	border-radius: 6rpx;
	background: linear-gradient(180deg, #faf8ef 0%, #d7dfc5 100%);
	transform: rotate(18deg);
}

.zongzi-pack-top {
	right: 34rpx;
	top: 18rpx;
	transform: rotate(20deg);
}

.zongzi-pack-bottom {
	left: 74rpx;
	bottom: 12rpx;
	transform: rotate(-18deg);
}

.zongzi-branch {
	position: absolute;
	bottom: 20rpx;
	width: 4rpx;
	background: linear-gradient(180deg, #c1b49d 0%, #8f816a 100%);
	border-radius: 999rpx;
	transform-origin: bottom center;
}

.zongzi-branch-left {
	left: 34rpx;
	height: 72rpx;
	transform: rotate(18deg);
}

.zongzi-branch-mid {
	left: 52rpx;
	height: 96rpx;
	transform: rotate(-8deg);
}

.zongzi-branch-right {
	left: 68rpx;
	height: 58rpx;
	transform: rotate(22deg);
}

.card-menu {
	position: absolute;
	top: 18rpx;
	right: 27rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 10rpx;
	height: 36rpx;
}

.card-menu text {
	display: block;
	width: 8rpx;
	height: 8rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.95);
}

.card-meta {
	display: flex;
	align-items: center;
	padding: 14rpx 20rpx 12rpx;
}

.designer-avatar {
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
	margin-right: 12rpx;
}

.designer-name {
	font-size: 24rpx;
	font-weight: normal;
	color: #979797;
}

.card-title {
	padding: 0 20rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	font-weight: 500;
	color: #363636;
}

.card-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx 19rpx 10rpx;
}

.price {
	line-height: 42rpx;
	font-weight: 500;
	color: #f37738;
}
.price-num {
	font-size: 36rpx;
}
.price-unit {
	font-size: 24rpx;
}

.sold {
	font-size: 20rpx;
	color: #c2c2c2;
}

.load-state {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 64rpx;
	font-size: 22rpx;
	color: #b2b2b2;
}

.empty-state {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 220rpx;
	font-size: 24rpx;
	color: #b2b2b2;
}

.bottom-gap {
	height: 24rpx;
}

.area-popup-mask {
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

.area-popup {
	width: 100%;
	background: #ffffff;
	border-radius: 30rpx 30rpx 30rpx 30rpx;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding-bottom: env(safe-area-inset-bottom);
	margin: 22rpx;
}

.area-popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 50rpx 32rpx 30rpx;
	position: relative;
}

.area-popup-title {
	font-size: 36rpx;
	font-weight: 500;
	color: #1a1a1a;
}

.area-popup-close {
	position: absolute;
	right: 32rpx;
	top: 50%;
	transform: translateY(-50%);
	width: 56rpx;
	height: 56rpx;
	line-height: 52rpx;
	text-align: center;
	font-size: 76rpx;
	font-weight: 300;
	color: #000;
}

.area-popup-picker {
	width: 100%;
	height: 460rpx;
}

.area-popup-column {
	flex: 1;
}

.area-popup-option {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #333333;
}

.area-popup-footer {
	display: flex;
	padding: 24rpx 51rpx;
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	gap: 42rpx;
}

.area-popup-btn {
	flex: 1;
	width: 280rpx;
	height: 72rpx;
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	font-weight: 500;
	margin-bottom: 40rpx;
}

.area-popup-btn-cancel {
	border: 1rpx solid #979797;
	background: #FFFFFF;
	color: #979797;
}

.area-popup-btn-confirm {
	background: #F37738;
	color: #ffffff;
}

.tab-dropdown-panel-title{
	width: 100%;
}

.tab-dropdown-panel-tags{
	font-size: 28rpx;
	font-weight: 500;
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
	height: 100%;
	width: 100%;
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
.price-popup-title-2 {
	font-size: 24rpx;
	font-weight: 400;
	color: #979797;
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
