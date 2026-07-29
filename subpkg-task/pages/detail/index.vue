<template>
	<view class="task-detail-page">
		<TitleBar title="任务详情" :fixed="true">
			<template #right>
				<button class="capsule-btn" :open-type="shareOpenType" @click.stop="handleShareClick"></button>
			</template>
		</TitleBar>

		<scroll-view scroll-y class="page-scroll" :style="pageScrollStyle">
			<view class="page-canvas">
				<view v-if="loading" class="state-card">
					<text>加载中...</text>
				</view>

				<view v-else-if="loadFailed" class="state-card">
					<text>{{ loadErrorText }}</text>
					<button class="retry-btn" @click="handleRetryDetail">重新加载</button>
				</view>

				<template v-else>
					<view class="publisher-card">
					<view class="publisher-row">
						<image class="publisher-avatar" :src="detail.publisher.avatar" mode="aspectFill" @click.stop="goPublisherHome"></image>
						<view class="publisher-info">
							<text class="publisher-name">{{ detail.publisher.name }}</text>
							<text v-if="detail.publisher.publishTime" class="publish-time">发布于{{ detail.publisher.publishTime }}</text>
						</view>
						<view class="publisher-right">
							<text v-if="detail.statusText" class="publisher-status">{{ detail.statusText }}</text>
							<text class="deadline-text">{{ detail.deadlineText }}</text>
						</view>
					</view>
						<view class="meta-row">
							<text v-if="detail.hasBudgetAmount" class="budget-text">{{ detail.budgetText }}</text>
						</view>
					</view>

					<view v-if="detail.posters.length > 0" class="poster-section">
						<swiper
							class="poster-swiper"
							:autoplay="detail.posters.length > 1"
							:interval="2000"
							:circular="detail.posters.length > 1"
							:indicator-dots="false"
							@change="handlePosterChange"
						>
							<swiper-item v-for="(item, index) in detail.posters" :key="item.id || index">
								<image class="poster-image" :src="item.url" mode="aspectFill" @click="previewPoster(index)"></image>
							</swiper-item>
						</swiper>
						<view class="poster-index">{{ posterIndexText }}</view>
					</view>

					<view class="content-card summary-card">
						<text class="task-title">{{ detail.title }}</text>
						<text class="task-desc">{{ detail.description }}</text>
					</view>

					<view class="content-card requirement-card">
						<view class="section-block">
							<text class="section-title">专业类型</text>
							<view class="tag-list" v-if="detail.professionTags.length > 0">
								<view v-for="item in detail.professionTags" :key="item" class="outline-tag">
									<text>{{ item }}</text>
								</view>
							</view>
							<text v-else class="empty-text">暂无专业类型</text>
						</view>

						<view class="dash-line"></view>

						<view class="section-block service-block">
							<text class="section-title">服务要求</text>
							<view class="service-list" v-if="detail.servicePromises.length > 0">
								<view v-for="item in detail.servicePromises" :key="item" class="service-tag">
									<image class="service-check" src="/static/icon/勾.svg" mode="aspectFit"></image>
									<text>{{ item }}</text>
								</view>
							</view>
							<text v-else class="empty-text">暂无数据</text>
						</view>
					</view>

					<view v-if="showBidderCard" class="content-card bidder-card">
						<view class="bidder-header">
							<text class="section-title">报价人</text>
							<text class="bidder-count">{{ bidders.length }}人报价</text>
						</view>
						<scroll-view scroll-y class="bidder-scroll" :show-scrollbar="false">
							<view v-if="bidders.length === 0" class="bidder-empty">
								<text>暂无报价</text>
							</view>
							<view v-for="item in bidders" :key="item.id" class="bidder-item">
								<image class="bidder-avatar" :src="item.avatar" mode="aspectFill"></image>
								<view class="bidder-info">
									<text class="bidder-name">{{ item.name }}</text>
									<text class="bidder-time">{{ item.time }}</text>
								</view>
								<view class="bidder-right">
									<text class="bidder-price">{{ item.priceText }}</text>
								</view>
							</view>
						</scroll-view>
					</view>

					<view v-if="!hideBottomBar" class="bottom-space"></view>
				</template>
			</view>
		</scroll-view>

		<view v-if="!hideBottomBar" class="bottom-bar">
			<view v-if="detail.canQuote" class="quote-tip">
				<text class="quote-tip-mark">?</text>
				<text class="quote-tip-text">需要乙方报价</text>
			</view>
			<button
				class="apply-btn"
				:class="{
					'apply-btn-quoted': detail.canQuote,
					'apply-btn-disabled': applyButtonDisabled
				}"
				:disabled="applyButtonDisabled"
				@click="handleApply"
			>
				{{ actionButtonText }}
			</button>
			<button class="share-btn" :open-type="shareOpenType" @click.stop="handleShareClick">
				<image class="share-icon" src="/static/profile/橱窗分享按钮.svg" mode="aspectFit"></image>
			</button>
		</view>

		<view v-if="showQuotePopup" class="popup-mask" @click="closeQuotePopup">
			<view class="quote-popup" @click.stop>
				<view class="quote-popup-header">
					<text class="quote-popup-title">填写报价</text>
					<text class="quote-popup-close" @click="closeQuotePopup">×</text>
				</view>
				<view class="quote-popup-body">
					<text class="quote-popup-label">报价金额</text>
					<view class="quote-input-wrap">
						<text class="quote-currency">¥</text>
						<input
							v-model="quoteForm.price"
							class="quote-input"
							type="digit"
							placeholder="请输入报价金额"
							placeholder-class="quote-input-placeholder"
						/>
					</view>
				</view>
				<button class="quote-submit-btn" :disabled="quoteSubmitting" @click="submitQuote">
					{{ quoteSubmitting ? '提交中...' : '确定报价' }}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import request from '@/utils/request.js';
import env from '@/config/env.js';
import TitleBar from '@/components/title.vue';

const DEFAULT_AVATAR = '/static/yunyiku/avatar.png';

const createDefaultDetail = () => ({
	taskId: '',
	channelId: '',
	channelType: '',
	channelStatus: '',
	statusText: '',
	title: '',
	description: '',
	deadlineText: '交稿时间待定',
	budgetText: '预算待定',
	hasBudgetAmount: false,
	canQuote: false,
	publisher: {
		name: '发布者',
		publishTime: '',
		avatar: DEFAULT_AVATAR
	},
	posters: [],
	professionTags: [],
	servicePromises: []
});

export default {
	components: {
		TitleBar
	},
	data() {
		return {
			statusBarHeight: 0,
			currentPoster: 0,
			loading: false,
			loadFailed: false,
			loadErrorText: '任务详情加载失败',
			channelId: '',
			taskId: '',
			ownerUserId: '',
			detail: createDefaultDetail(),
			bidders: [],
			showQuotePopup: false,
			hasQuoted: false,
			applySubmitting: false,
			quoteSubmitting: false,
			loginPromptVisible: false,
			quoteForm: {
				price: ''
			}
		};
	},
	computed: {
		pageScrollStyle() {
			return {
				height: `calc(100vh - ${this.statusBarHeight}px - 44px)`
			};
		},
		posterIndexText() {
			const total = this.detail.posters.length || 1;
			const current = Math.min(this.currentPoster + 1, total);
			return `${current}/${total}`;
		},
		showBidderCard() {
			return this.detail.channelType === 'square';
		},
		isOwnTask() {
			const currentUserId = this.getCurrentUserId();
			return !!currentUserId && !!this.ownerUserId && String(currentUserId) === String(this.ownerUserId);
		},
		hideBottomBar() {
			return this.loading || this.loadFailed || this.isOwnTask;
		},
		isLoggedIn() {
			return !!uni.getStorageSync('token');
		},
		shareOpenType() {
			return this.isLoggedIn ? 'share' : '';
		},
		applyButtonDisabled() {
			if (this.detail.canQuote) {
				return this.quoteSubmitting || this.hasQuoted;
			}
			return this.applySubmitting;
		},
		actionButtonText() {
			if (!this.detail.canQuote && this.applySubmitting) {
				return '提交中...';
			}
			if (this.detail.canQuote && this.quoteSubmitting) {
				return '提交中...';
			}
			if (this.detail.canQuote && this.hasQuoted) {
				return '已报价';
			}
			if (this.detail.canQuote) {
				return '报价';
			}
			return '申请接单';
		}
	},
	async onLoad(options) {
		const systemInfo = uni.getSystemInfoSync();
		this.statusBarHeight = systemInfo.statusBarHeight || 0;
		this.channelId = this.resolveChannelId(options);
		this.taskId = options && options.taskId ? String(options.taskId) : '';
		this.initPublisherFromRoute(options);
		// #ifdef MP-WEIXIN
		if (this.isLoggedIn) {
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			});
		} else {
			uni.hideShareMenu();
		}
		// #endif
		if (!this.channelId) {
			this.loadFailed = true;
			this.loadErrorText = '缺少任务渠道ID';
			return;
		}
		await this.fetchDetail();
	},
	onShareAppMessage() {
		return {
			title: this.detail.title || '任务详情',
			path: `/subpkg-task/pages/detail/index?channelId=${this.channelId}&id=${this.channelId}`,
			imageUrl: this.detail.posters[0] ? this.detail.posters[0].url : ''
		};
	},
	onShareTimeline() {
		return {
			title: this.detail.title || '任务详情',
			query: `channelId=${this.channelId}&id=${this.channelId}`,
			imageUrl: this.detail.posters[0] ? this.detail.posters[0].url : ''
		};
	},
	methods: {
		ensureLoggedIn() {
			if (this.isLoggedIn) {
				return true;
			}
			this.promptLogin();
			return false;
		},
		promptLogin() {
			if (this.loginPromptVisible) {
				return;
			}
			this.loginPromptVisible = true;
			if (this.channelId) {
				uni.setStorageSync('login_redirect', `/subpkg-task/pages/detail/index?channelId=${this.channelId}&id=${this.channelId}`);
			}
			uni.showModal({
				title: '提示',
				content: '登录后可使用该功能',
				confirmText: '去登录',
				cancelText: '取消',
				complete: () => {
					this.loginPromptVisible = false;
				},
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/subpkg-others/pages/login/index'
						});
					}
				}
			});
		},
		resolveChannelId(options) {
			if (!options || typeof options !== 'object') {
				return '';
			}
			return options.channelId ? String(options.channelId) : (options.id ? String(options.id) : '');
		},
		initPublisherFromRoute(options) {
			if (!options || typeof options !== 'object') {
				return;
			}
			const nextPublisher = {
				...this.detail.publisher
			};
			if (options.nickName) {
				nextPublisher.name = decodeURIComponent(options.nickName);
			}
			if (options.avatarUrl) {
				nextPublisher.avatar = decodeURIComponent(options.avatarUrl);
			}
			if (options.publishTime) {
				nextPublisher.publishTime = decodeURIComponent(options.publishTime);
			}
			this.detail.publisher = nextPublisher;
		},
		async fetchDetail() {
			this.loading = true;
			this.loadFailed = false;
			try {
				const res = await request.get(`/wechat/userTask/detail/${this.channelId}`, {}, {
					loading: true,
					loadingText: '加载中...'
				});
				this.applyDetail(res && res.data);
			} catch (e) {
				this.loadFailed = true;
				this.loadErrorText = (e && e.msg) || '任务详情加载失败';
			} finally {
				this.loading = false;
			}
		},
		applyDetail(data) {
			const normalizedDetail = this.normalizeDetail(data || {});
			this.detail = normalizedDetail;
			this.taskId = normalizedDetail.taskId || this.taskId;
			this.ownerUserId = this.resolveOwnerUserId(data || {});
			this.bidders = this.normalizeBidders(data && data.quoteUserList);
			this.hasQuoted = this.checkHasQuoted(data && data.quoteUserList);
			this.quoteForm.price = '';
			this.currentPoster = 0;
		},
		normalizeDetail(data) {
			const nextDetail = createDefaultDetail();
			const coverList = Array.isArray(data.coverList) ? data.coverList : [];
			const professionList = Array.isArray(data.professionList) ? data.professionList : [];
			const guaranteeList = Array.isArray(data.guaranteeList) ? data.guaranteeList : [];
			const posters = coverList
				.map((item, index) => {
					const imageKey = item && item.imageKey ? item.imageKey : '';
					if (!imageKey) {
						return null;
					}
					return {
						id: imageKey || index,
						url: this.buildImageUrl(imageKey)
					};
				})
				.filter(Boolean);
			const canQuote = Number(data.isOtherPartyQuote) === 1;
			const hasBudgetAmount = data.budgetAmount !== '' && data.budgetAmount !== null && data.budgetAmount !== undefined;
			nextDetail.taskId = data.taskId ? String(data.taskId) : '';
			nextDetail.channelId = data.channelId ? String(data.channelId) : this.channelId;
			nextDetail.channelType = data.channelType || '';
			nextDetail.channelStatus = data.channelStatus || '';
			nextDetail.statusText = this.formatChannelStatus(data.channelStatus);
			nextDetail.title = data.taskTitle || '未命名任务';
			nextDetail.description = data.taskDesc || '暂无任务描述';
			nextDetail.deadlineText = this.buildDeadlineText(data.deliveryDate, data.deliveryDays);
			nextDetail.budgetText = this.formatBudgetText(data.budgetAmount, data.isOtherPartyQuote);
			nextDetail.hasBudgetAmount = hasBudgetAmount;
			nextDetail.canQuote = canQuote;
			nextDetail.publisher = {
				name: data.nickName || this.detail.publisher.name || '发布者',
				publishTime: this.formatPublishTime(data.publishTime || data.createTime || this.detail.publisher.publishTime),
				avatar: this.buildImageUrl(data.avatarUrl) || this.detail.publisher.avatar || DEFAULT_AVATAR
			};
			nextDetail.posters = posters;
			nextDetail.professionTags = professionList
				.map(item => item && item.professionCategoryName ? item.professionCategoryName : '')
				.filter(Boolean);
			nextDetail.servicePromises = guaranteeList
				.map(item => this.formatGuaranteeText(item))
				.filter(Boolean);
			return nextDetail;
		},
		normalizeBidders(list) {
			return (Array.isArray(list) ? list : []).map(item => ({
				id: item && item.quoteId ? String(item.quoteId) : `${Date.now()}-${Math.random()}`,
				userId: item && item.quoteUserId ? String(item.quoteUserId) : '',
				avatar: this.buildImageUrl(item && item.quoteUserAvatar ? item.quoteUserAvatar : '') || DEFAULT_AVATAR,
				name: item && item.quoteUserName ? item.quoteUserName : '匿名用户',
				time: this.formatBidderTime(item && item.quoteTime),
				priceText: this.formatCurrency(item && item.quotePrice)
			}));
		},
		buildImageUrl(url) {
			if (!url) {
				return '';
			}
			const text = String(url).trim();
			if (/^(https?:|wxfile:|data:|\/static\/)/.test(text)) {
				return text;
			}
			return env.aliyunUrl + text.replace(/^\/+/, '');
		},
		buildDeadlineText(deliveryDate, deliveryDays) {
			if (deliveryDate) {
				const text = String(deliveryDate).trim().replace(/-/g, '/');
				const date = text.length >= 16 ? text.slice(0, 16) : text;
				return date ? `交稿时间：${date}` : '交稿时间待定';
			}
			const days = Number(deliveryDays);
			if (Number.isFinite(days) && days > 0) {
				return `交稿天数：${days}天`;
			}
			return '交稿时间待定';
		},
		formatBudgetText(amount, isOtherPartyQuote) {
			if (amount === '' || amount === null || amount === undefined) {
				return '预算待定';
			}
			return this.formatCurrency(amount);
		},
		formatCurrency(value) {
			if (value === '' || value === null || value === undefined) {
				return '预算待定';
			}
			return `¥ ${value}`;
		},
		formatGuaranteeText(item) {
			if (!item || !item.guaranteeName) {
				return '';
			}
			const value = item.guaranteeValue ? String(item.guaranteeValue).trim() : '';
			const unit = item.guaranteeUnit ? String(item.guaranteeUnit).trim() : '';
			if (value) {
				return `${item.guaranteeName} ${value}${unit}`;
			}
			return item.guaranteeName;
		},
		formatBidderTime(value) {
			if (!value) {
				return '未知时间';
			}
			return String(value).replace(/-/g, '/');
		},
		formatPublishTime(value) {
			if (!value) {
				return '';
			}
			const text = String(value).trim().replace(/-/g, '/');
			return text.length >= 16 ? text.slice(0, 16) : text;
		},
		formatChannelStatus(status) {
			const statusMap = {
				pending: '待处理',
				open: '进行中',
				accepted: '已接受',
				rejected: '已拒绝',
				confirmed: '已确认',
				assigned: '已接单',
				closed: '已关闭'
			};
			return status && statusMap[status] ? statusMap[status] : '';
		},
		getCurrentUserId() {
			const isTeamMode = !!uni.getStorageSync('isTeamMode');
			const userInfo = uni.getStorageSync('userInfo') || {};
			if (isTeamMode) {
				return uni.getStorageSync('teamOwnerId') || userInfo.id || userInfo.userId || '';
			}
			return userInfo.id || userInfo.userId || '';
		},
		resolveOwnerUserId(data) {
			if (!data || typeof data !== 'object') {
				return '';
			}
			const ownerUserId = data.userId || data.publishUserId || data.publisherUserId || data.wxUserId || data.publishWxUserId;
			return ownerUserId ? String(ownerUserId) : '';
		},
		checkHasQuoted(list) {
			const currentUserId = this.getCurrentUserId();
			if (!currentUserId) {
				return false;
			}
			return (Array.isArray(list) ? list : []).some(item => {
				const quoteUserId = item && item.quoteUserId ? String(item.quoteUserId) : '';
				return !!quoteUserId && quoteUserId === String(currentUserId);
			});
		},
		goBack() {
			if (getCurrentPages().length > 1) {
				uni.navigateBack();
				return;
			}
			uni.switchTab({
				url: '/pages/square/index'
			});
		},
		goPublisherHome() {
			if (!this.ownerUserId) {
				uni.showToast({
					title: '用户信息缺失',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/subpkg-library/pages/visitor-home?userId=${encodeURIComponent(this.ownerUserId)}`
			});
		},
		handlePosterChange(event) {
			this.currentPoster = event.detail.current || 0;
		},
		handleRetryDetail() {
			if (!this.ensureLoggedIn()) {
				return;
			}
			this.fetchDetail();
		},
		previewPoster(index) {
			if (!this.ensureLoggedIn()) {
				return;
			}
			const posters = this.detail.posters.map(item => item.url).filter(Boolean);
			if (posters.length === 0) {
				return;
			}
			uni.previewImage({
				current: posters[index] || posters[0],
				urls: posters
			});
		},
		async handleApply() {
			if (!this.ensureLoggedIn()) {
				return;
			}
			if (this.applyButtonDisabled) {
				return;
			}
			if (this.hasQuoted) {
				uni.showToast({
					title: '您已报过价',
					icon: 'none'
				});
				return;
			}
			if (this.detail.canQuote) {
				this.showQuotePopup = true;
				return;
			}
			if (!this.taskId || !this.channelId) {
				uni.showToast({
					title: '任务信息缺失',
					icon: 'none'
				});
				return;
			}
			this.applySubmitting = true;
			try {
				const payload = {
					taskId: Number(this.taskId),
					channelId: Number(this.channelId)
				};
				const res = await request.post('/wechat/userTask/applyReceive', payload, {
					loading: true,
					loadingText: '提交中...'
				});
				await this.fetchDetail();
				uni.showToast({
					title: (res && res.msg) || '申请成功',
					icon: 'success'
				});
			} catch (e) {
				uni.showToast({
					title: (e && e.msg) || '申请失败',
					icon: 'none'
				});
			} finally {
				this.applySubmitting = false;
			}
		},
		closeQuotePopup() {
			if (this.quoteSubmitting) {
				return;
			}
			this.showQuotePopup = false;
		},
		async submitQuote() {
			if (!this.ensureLoggedIn()) {
				return;
			}
			if (this.quoteSubmitting) {
				return;
			}
			const price = Number(String(this.quoteForm.price || '').trim());
			if (!Number.isFinite(price) || price <= 0) {
				uni.showToast({
					title: '请输入有效报价金额',
					icon: 'none'
				});
				return;
			}
			if (!this.taskId || !this.channelId) {
				uni.showToast({
					title: '任务信息缺失',
					icon: 'none'
				});
				return;
			}
			this.quoteSubmitting = true;
			try {
				const payload = {
					taskId: Number(this.taskId),
					channelId: Number(this.channelId),
					quotePrice: price
				};
				const res = await request.post('/wechat/userTask/quote', payload, {
					loading: true,
					loadingText: '提交中...'
				});
				this.hasQuoted = true;
				this.showQuotePopup = false;
				await this.fetchDetail();
				uni.showToast({
					title: (res && res.msg) || '报价成功',
					icon: 'success'
				});
			} catch (e) {
				uni.showToast({
					title: (e && e.msg) || '报价失败',
					icon: 'none'
				});
			} finally {
				this.quoteSubmitting = false;
			}
		},
		handleShareClick() {
			this.ensureLoggedIn();
		}
	}
};
</script>

<style lang="scss" scoped>
.task-detail-page {
	height: 100vh;
	background: #f7f7f7;
	overflow: hidden;
}

.capsule-btn {
	width: 197rpx;
	height: 65rpx;
	padding: 0;
	margin: 0;
	border: 1rpx solid #e8e8e8;
	border-radius: 33rpx;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.capsule-btn::after,
.apply-btn::after,
.share-btn::after,
.retry-btn::after,
.quote-submit-btn::after {
	border: 0;
}

.capsule-more {
	width: 44rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.capsule-more view {
	width: 8rpx;
	height: 8rpx;
	border-radius: 50%;
	background: #000000;
}

.capsule-divider {
	width: 1rpx;
	height: 36rpx;
	margin: 0 28rpx;
	background: #e1e1e1;
}

.capsule-target {
	width: 31rpx;
	height: 31rpx;
	border: 5rpx solid #000000;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.capsule-target view {
	width: 5rpx;
	height: 5rpx;
	border-radius: 50%;
	background: #000000;
}

.page-scroll {
	height: calc(100vh - 98rpx);
}

.page-canvas {
	min-height: 1933rpx;
	padding-bottom: 0;
}

.state-card {
	margin: 40rpx 30rpx 0;
	padding: 60rpx 30rpx;
	border-radius: 20rpx;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	line-height: 40rpx;
	color: #999999;
}

.retry-btn {
	min-width: 200rpx;
	height: 68rpx;
	margin-top: 28rpx;
	border-radius: 34rpx;
	background: #f37738;
	font-size: 28rpx;
	line-height: 68rpx;
	color: #ffffff;
}

.publisher-card {
	background: #ffffff;
	padding: 24rpx 36rpx 20rpx;
}

.publisher-row {
	display: flex;
	align-items: center;
}

.publisher-right {
	margin-left: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.publisher-avatar {
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
}

.publisher-info {
	display: flex;
	flex-direction: column;
	margin-left: 15rpx;
	min-width: 0;
}

.publisher-name {
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.publish-time {
	font-size: 20rpx;
	line-height: 28rpx;
	color: #979797;
	margin-top: 4rpx;
}

.publisher-status {
	font-size: 20rpx;
	line-height: 28rpx;
	color: #f37738;
}

.deadline-text {
	margin-top: 6rpx;
	font-size: 20rpx;
	line-height: 28rpx;
	color: #979797;
}

.meta-row {
	margin-top: 18rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.budget-text {
	font-size: 36rpx;
	line-height: 50rpx;
	font-weight: 600;
	color: #f37738;
}

.quote-pill {
	min-width: 124rpx;
	height: 48rpx;
	padding: 0 24rpx;
	border-radius: 24rpx;
	background: #f3f3f3;
	border: 1rpx solid #d8d8d8;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #8f8f8f;
	box-sizing: border-box;
}

.quote-pill-active {
	background: #fff1e9;
	border-color: #f37738;
	color: #f37738;
}

.poster-section {
	position: relative;
	width: 100%;
	height: 480rpx;
	background: #ffffff;
}

.poster-swiper,
.poster-image {
	width: 100%;
	height: 100%;
}

.poster-index {
	position: absolute;
	left: 30rpx;
	bottom: 23rpx;
	min-width: 72rpx;
	height: 36rpx;
	padding: 0 12rpx;
	border-radius: 20rpx;
	background: rgba(0, 0, 0, 0.56);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20rpx;
	line-height: 28rpx;
	color: #ffffff;
	box-sizing: border-box;
}

.content-card {
	background: #ffffff;
}

.summary-card {
	padding: 20rpx 29rpx 30rpx;
}

.task-title {
	display: block;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.task-desc {
	display: block;
	margin-top: 16rpx;
	font-size: 26rpx;
	line-height: 36rpx;
	color: #000000;
}

.requirement-card {
	margin-top: 20rpx;
	padding: 30rpx 31rpx;
}

.section-title {
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.tag-list,
.service-list {
	display: flex;
	flex-wrap: wrap;
}

.tag-list {
	gap: 20rpx 30rpx;
	margin-top: 20rpx;
}

.outline-tag {
	height: 48rpx;
	padding: 0 26rpx;
	border-radius: 24rpx;
	border: 1rpx solid #f37738;
	background: #fff1e9;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #f37738;
	box-sizing: border-box;
}

.dash-line {
	width: 100%;
	height: 1rpx;
	margin: 28rpx 0 30rpx;
	border-top: 2rpx dashed #cecece;
	box-sizing: border-box;
}

.service-list {
	gap: 20rpx 18rpx;
	margin-top: 20rpx;
}

.service-tag {
	min-height: 48rpx;
	padding: 0 26rpx;
	border-radius: 24rpx;
	background: #f5f5f5;
	display: flex;
	align-items: center;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #000000;
	box-sizing: border-box;
}

.service-check {
	width: 24rpx;
	height: 24rpx;
	margin-right: 10rpx;
	flex-shrink: 0;
}

.empty-text {
	display: block;
	margin-top: 20rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #999999;
}

.bidder-card {
	margin-top: 20rpx;
	padding: 30rpx 36rpx 22rpx;
}

.bidder-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.bidder-count {
	font-size: 22rpx;
	line-height: 30rpx;
	color: #979797;
}

.bidder-scroll {
	height: 280rpx;
	margin-top: 16rpx;
}

.bidder-empty {
	height: 280rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	color: #b2b2b2;
}

.bidder-item {
	display: flex;
	align-items: center;
	padding: 14rpx 0;
}

.bidder-item + .bidder-item {
	border-top: 1rpx solid #f2f2f2;
}

.bidder-avatar {
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
}

.bidder-info {
	display: flex;
	flex-direction: column;
	margin-left: 15rpx;
	min-width: 0;
}

.bidder-name {
	font-size: 32rpx;
	line-height: 45rpx;
	color: #000000;
}

.bidder-time {
	font-size: 20rpx;
	line-height: 28rpx;
	color: #979797;
	margin-top: 4rpx;
}

.bidder-right {
	margin-left: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	max-width: 260rpx;
}

.bidder-price {
	font-size: 32rpx;
	line-height: 45rpx;
	color: #f37738;
}

.bottom-space {
	height: 118rpx;
}

.bottom-bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 98rpx;
	padding: 16rpx 30rpx;
	background: #ffffff;
	box-shadow: 0 -1rpx 0 0 #dddddd;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}

.quote-tip {
	display: flex;
	align-items: center;
	margin-right: auto;
}

.quote-tip-mark {
	width: 34rpx;
	height: 34rpx;
	border-radius: 50%;
	background: #fff1e9;
	border: 1rpx solid #f37738;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22rpx;
	color: #f37738;
	margin-right: 10rpx;
	box-sizing: border-box;
}

.quote-tip-text {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #8a8a8a;
}

.apply-btn {
	width: 220rpx;
	height: 64rpx;
	margin: 0;
	border-radius: 36rpx;
	background: #f37738;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #ffffff;
}

.apply-btn-quoted {
	background: #f37738;
}

.apply-btn-disabled {
	opacity: 0.6;
}

.share-btn {
	width: 56rpx;
	height: 56rpx;
	padding: 0;
	margin: 0 0 0 30rpx;
	background: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
}

.share-icon {
	width: 56rpx;
	height: 56rpx;
	display: block;
}

.popup-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 30;
}

.quote-popup {
	width: 620rpx;
	border-radius: 24rpx;
	background: #ffffff;
	padding: 30rpx;
	box-sizing: border-box;
}

.quote-popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.quote-popup-title {
	font-size: 32rpx;
	line-height: 46rpx;
	font-weight: 600;
	color: #111111;
}

.quote-popup-close {
	font-size: 44rpx;
	line-height: 44rpx;
	color: #999999;
}

.quote-popup-body {
	margin-top: 36rpx;
}

.quote-popup-label {
	display: block;
	font-size: 26rpx;
	line-height: 36rpx;
	color: #666666;
	margin-bottom: 18rpx;
}

.quote-input-wrap {
	height: 92rpx;
	border-radius: 18rpx;
	background: #f7f7f7;
	padding: 0 24rpx;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}

.quote-currency {
	font-size: 34rpx;
	line-height: 48rpx;
	color: #f37738;
	margin-right: 14rpx;
}

.quote-input {
	flex: 1;
	height: 92rpx;
	font-size: 30rpx;
	line-height: 92rpx;
	color: #111111;
}

.quote-input-placeholder {
	color: #b4b4b4;
}

.quote-submit-btn {
	height: 76rpx;
	margin-top: 40rpx;
	border-radius: 38rpx;
	background: #f37738;
	font-size: 30rpx;
	line-height: 76rpx;
	color: #ffffff;
}

.quote-submit-btn[disabled] {
	opacity: 0.6;
}
</style>
