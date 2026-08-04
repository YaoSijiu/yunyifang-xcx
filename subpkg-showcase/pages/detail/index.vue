<template>
	<view class="detail-page">
		<scroll-view scroll-y class="page-scroll" :lower-threshold="120" @scrolltolower="loadMoreComments">
			<view v-if="loading" class="state-block">
				<text>加载中...</text>
			</view>
			<view v-else-if="loadError" class="state-block">
				<text>{{ loadError }}</text>
				<button class="retry-btn" @click="loadShowcaseDetail">重新加载</button>
			</view>
			<view v-else class="page-canvas">
				<view class="hero-card">
					<view class="poster-area">
						<swiper
							v-if="posterUrls.length > 0"
							class="poster-swiper"
							:autoplay="true"
							:interval="3000"
							:circular="true"
							:indicator-dots="false"
							@change="handlePosterChange"
						>
							<swiper-item v-for="(item, index) in posterUrls" :key="item + index">
								<image class="poster-image" :src="item" mode="aspectFill" @click="previewPoster(index)"></image>
							</swiper-item>
						</swiper>
						<view v-else class="empty-poster">
							<text>暂无封面</text>
						</view>
						<view v-if="posterUrls.length > 0" class="poster-count">{{ currentPosterIndex + 1 }}/{{ posterUrls.length }}</view>
					</view>

					<text class="showcase-title">{{ detail.showcaseTitle}}</text>
					<view v-if="guaranteeTags.length > 0" class="hero-guarantees">
						<text class="hero-guarantee" v-for="item in guaranteeTags" :key="item.key">{{ item.text }}</text>
					</view>
					<view v-else class="hero-empty">暂无数据</view>

					<view class="deal-row">
						<text class="showcase-price">{{ priceText }}</text>
						<view class="sold-wrap">
							<image class="sold-icon" src="/static/icon/支付.png" />
							<text>{{ salesText }}</text>
						</view>
						<button
							class="favorite-btn"
							:class="{ favorited: isFavorite }"
							:disabled="favoriteLoading"
							@click="handleFavorite"
						>{{ isFavorite ? '取消收藏' : '收藏' }}</button>
					</view>
				</view>

				<view class="seller-card">
					<image class="seller-avatar" :src="avatarUrl" mode="aspectFill" @click.stop="goToSellerHome"></image>
					<view class="seller-name-container">
						<text class="seller-name">{{ detail.nickName}}</text>
					</view>
					<view class="seller-location">
						<image class="location-icon" src="/static/icon/位置.png" />
						<text>{{ cityText }}</text>
					</view>
					<button
						v-if="showFollowButton"
						class="follow-btn"
						:class="{ followed: isFollowed }"
						:disabled="followLoading"
						@click="handleFollow"
					>{{ isFollowed ? '已关注' : '关注' }}</button>
					<view class="seller-rating">
						<view class="stars">
							<text
								v-for="star in [1,2,3,4,5]"
								:key="star"
								class="seller-star"
								:class="{ active: star <= sellerStarRating }"
							>★</text>
						</view>
						<text class="seller-score">{{ sellerRatingText }}/{{ sellerFansText }}</text>
					</view>
					<view class="seller-divider"></view>
					<view class="seller-stats">
						<text>{{ completionRateText }}</text>
						<text>{{ avgAcceptTimeText }}</text>
					</view>
				</view>

				<view class="description-card">
					<view class="section-title">详情描述</view>
					<text class="description-text">{{ detailDescription }}</text>
				</view>

				<view class="review-card">
					<view class="section-title">评价</view>
					<view class="review-tabs">
					<view
						class="review-tab"
						:class="{ active: activeReviewTab === 'image' }"
						@click="switchReviewTab('image')"
					>
						<text class="tab-label">带图评价</text>
						<text class="tab-count">{{ imageCommentCountText }}</text>
					</view>
					<view
						class="review-tab"
						:class="{ active: activeReviewTab === 'all' }"
						@click="switchReviewTab('all')"
					>
						<text class="tab-label">最新评价</text>
						<text class="tab-count">{{ totalCommentCountText }}</text>
					</view>
				</view>
					<view v-if="comments.length === 0 && !commentLoading" class="comment-empty">暂无评价</view>
					<view class="comment-item" v-for="item in comments" :key="item.id">
						<image class="comment-avatar" :src="item.avatar" mode="aspectFill"></image>
						<view class="comment-content">
							<text class="comment-name">{{ item.name }}</text>
							<view class="comment-head">
								<view class="comment-stars">
									<text
										v-for="star in [1,2,3,4,5]"
										:key="star"
										class="comment-star"
										:class="{ active: star <= item.rating }"
									>★</text>
								</view>
								<text class="comment-time">{{ item.time }}</text>
							</view>
							<text class="comment-text">{{ item.content }}</text>
							<view v-if="item.imageUrls.length > 0" class="comment-images">
								<image
									class="comment-image"
									v-for="(image, index) in item.imageUrls"
									:key="image + index"
									:src="image"
									mode="aspectFill"
									@click="previewCommentImages(item, index)"
								></image>
							</view>
						</view>
					</view>
					<view v-if="comments.length > 0 || commentLoading" class="comment-load-state">{{ commentLoadText }}</view>
				</view>

				<view class="bottom-space"></view>
			</view>
		</scroll-view>

		<view class="bottom-actions" v-if="!loading && !loadError">
			<button class="bottom-share-btn" :open-type="shareOpenType" @click.stop="handleShareClick">
				<image class="bottom-share-icon" src="/static/profile/橱窗分享按钮-深色.png" mode="aspectFit"></image>
			</button>
			<button v-if="!isOwnShowcase" class="buy-btn" :disabled="orderLoading" @click="handleBuyClick">{{ orderLoading ? '下单中' : '购买' }}</button>
			<button v-if="!isOwnShowcase" class="hire-btn" :class="{ 'hire-btn--inviting': isInviting }" :disabled="isInviting" @click="handleHire">{{ isInviting ? '约稿中' : '约稿' }}</button>
		</view>

		<view class="pay-mask" v-if="showPayPopup" @click="closePayPopup">
			<view class="pay-panel" @click.stop>
				<view class="pay-product">
					<image class="pay-cover" :src="payCoverUrl" mode="aspectFill"></image>
					<view class="pay-info">
						<text class="pay-title">{{ detail.showcaseTitle}}</text>
						<text class="pay-price">{{ priceText }}</text>
						<view class="count-row">
							<text class="count-label">份数</text>
							<view class="stepper">
								<text class="step-btn minus" @click="decreaseCount">-</text>
								<text class="step-count">{{ buyCount }}</text>
								<text class="step-btn plus" @click="increaseCount">+</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="guaranteeTags.length > 0" class="pay-guarantees">
					<text class="pay-guarantee" v-for="item in guaranteeTags" :key="'pay-' + item.key">{{ item.text }}</text>
				</view>
				<view v-else class="pay-empty">暂无数据</view>
				<view class="pay-footer">
					<text class="total-text">总金额：{{ totalAmountText }}</text>
					<button class="wechat-pay-btn" @click="handlePay">微信支付</button>
				</view>
			</view>
		</view>

		<view v-if="showInviteSentPopup" class="invite-result-mask" @click="closeInviteSentPopup">
			<view class="invite-result-panel" @click.stop>
				<text class="invite-result-title">约稿信息已发送</text>
				<text class="invite-result-desc">请关注公众号，以便及时获取接单通知</text>
				<view class="official-qr-box">
					<image v-if="officialQrCode" class="official-qr-image" :src="officialQrCode" mode="aspectFit" show-menu-by-longpress></image>
					<text v-else class="official-qr-placeholder">{{ officialQrCodeLoading ? '二维码加载中...' : '暂无公众号二维码' }}</text>
				</view>
				<text class="official-qr-desc">长按识别二维码关注公众号</text>
			</view>
		</view>
		<uni-calendar
			ref="deliveryCalendar"
			:insert="false"
			:date="selectedDeliveryDate || minDeliveryDate || ''"
			:start-date="minDeliveryDate || ''"
			:clear-date="false"
			@confirm="confirmDeliveryDate"
		/>
	</view>
</template>

<script>
import request from '@/utils/request.js';
import env from '@/config/env.js';

export default {
	components: { },
	data() {
		return {
			showcaseId: '',
			detail: {},
			loading: false,
			loadError: '',
			isFollowed: false,
			isFavorite: false,
			followLoading: false,
			favoriteLoading: false,
			orderLoading: false,
			isInviting: false,
			currentPosterIndex: 0,
			showPayPopup: false,
			buyCount: 1,
			activeReviewTab: 'all',
			commentPageNum: 1,
			commentPageSize: 10,
			commentTotal: 0,
			commentLoading: false,
			commentFinished: false,
			commentRequestSeq: 0,
			comments: [],
			showInviteSentPopup: false,
			officialQrCode: '',
			officialQrCodeLoading: false,
			selectedDeliveryDate: '',
			loginPromptVisible: false
		};
	},
	computed: {
		followUserId() {
			return this.detail.wxUserId || '';
		},
		currentUserId() {
			const userInfo = uni.getStorageSync('userInfo') || {};
			return userInfo.id || userInfo.userId || '';
		},
		isLoggedIn() {
			return !!uni.getStorageSync('token');
		},
		shareOpenType() {
			return this.isLoggedIn ? 'share' : '';
		},
		isOwnShowcase() {
			if (!this.followUserId || !this.currentUserId) {
				return false;
			}
			return String(this.followUserId) === String(this.currentUserId);
		},
		showFollowButton() {
			if (!this.followUserId) {
				return false;
			}
			return String(this.followUserId) !== String(this.currentUserId);
		},
		posterUrls() {
			const coverList = this.normalizeCoverList(this.detail.coverList);
			const fallbackCover = this.normalizeCoverList(this.detail.coverImage);
			return (coverList.length > 0 ? coverList : fallbackCover).map(item => this.buildImageUrl(item)).filter(Boolean);
		},
		avatarUrl() {
			return this.buildImageUrl(this.detail.avatarUrl) || '/static/yunyiku/avatar.png';
		},
		payCoverUrl() {
			return this.posterUrls[0] || '/static/yunyiku/bg.png';
		},
		commentTotalText() {
			if (this.commentTotal <= 0) {
				return '';
			}
			return this.commentTotal > 99 ? '99+' : String(this.commentTotal);
		},
		commentLoadText() {
			if (this.commentLoading) {
				return '评价加载中...';
			}
			return this.commentFinished ? '没有更多评价了' : '上滑加载更多评价';
		},
		professionTags() {
			return Array.isArray(this.detail.professionList) ? this.detail.professionList.filter(item => item && item.categoryName) : [];
		},
		guaranteeTags() {
			const list = Array.isArray(this.detail.guaranteeList) ? this.detail.guaranteeList : [];
			return list.filter(Boolean).map((item, index) => {
				const name = item.guaranteeName || item.name || item.description || `保障${index + 1}`;
				const value = item.guaranteeValue === undefined || item.guaranteeValue === null ? '' : String(item.guaranteeValue);
				const unit = item.guaranteeUnit || item.valueUnit || '';
				const valueText = value ? `${value}${unit}` : '';
				return {
					key: item.guaranteeId || item.id || index,
					text: [name, valueText].filter(Boolean).join(' ')
				};
			});
		},
		priceAmount() {
			const price = Number(this.detail.price);
			return Number.isFinite(price) ? price : 0;
		},
		priceText() {
			const amount = this.formatMoney(this.priceAmount);
			const unit = this.detail.priceUnit ? `/${this.detail.priceUnit}` : '';
			return `¥${amount}${unit}`;
		},
		totalAmountText() {
			return this.formatMoney(this.priceAmount * this.buyCount, true);
		},
		minDeliveryDate() {
			return this.getOffsetDateString(1);
		},
		salesText() {
			const count = Number(this.detail.salesCount);
			return `已售${Number.isFinite(count) ? count : 0}`;
		},
		cityText() {
			return this.detail.regionName || this.detail.cityName || this.detail.city || this.detail.address || '地区未知';
		},
		sellerRatingValue() {
			const rating = Number(this.detail.rating);
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
			const count = Number(this.detail.fansCount);
			if (!Number.isFinite(count) || count < 0) {
				return '粉丝0';
			}
			if (count >= 10000) {
				const text = (count / 10000).toFixed(1).replace(/\.0$/, '');
				return `粉丝${text}万`;
			}
			return `粉丝${Math.floor(count)}`;
		},
		completionRateText() {
			const rate = Number(this.detail.completionRate);
			if (!Number.isFinite(rate) || rate < 0) {
				return '完稿率：100%';
			}
			return `完稿率：${Math.min(100, Math.round(rate))}%`;
		},
		avgAcceptTimeText() {
			const minutes = Number(this.detail.avgAcceptMinutes);
			if (!Number.isFinite(minutes) || minutes <= 0) {
				return '平均接单时间：1H内';
			}
			if (minutes < 60) {
				return `平均接单时间：${Math.round(minutes)}分钟`;
			}
			const hours = Math.round(minutes / 60);
			return `平均接单时间：${hours}H`;
		},
		totalCommentCountText() {
			const count = Number(this.detail.totalCommentCount);
			if (!Number.isFinite(count) || count <= 0) {
				return '0';
			}
			return count > 99 ? '99+' : String(count);
		},
		imageCommentCountText() {
			const count = Number(this.detail.imageCommentCount);
			if (!Number.isFinite(count) || count <= 0) {
				return '0';
			}
			return count > 99 ? '99+' : String(count);
		},
		detailDescription() {
			return this.detail.serviceDesc;
		}
	},
	onLoad(options) {
		this.showcaseId = options && options.id ? String(options.id) : '';
		// #ifdef MP-WEIXIN
		uni.showShareMenu({
			menus: ['shareAppMessage', 'shareTimeline']
		});
		// #endif
		this.loadShowcaseDetail();
	},
	onShow() {
		this.consumeInviteSentResult();
	},
	methods: {
		consumeInviteSentResult() {
			const result = uni.getStorageSync('showcase_invite_sent_result');
			if (!result) {
				return;
			}
			let data = result;
			if (typeof result === 'string') {
				try {
					data = JSON.parse(result);
				} catch (e) {
					data = {};
				}
			}
			const resultShowcaseId = data && data.showcaseId ? String(data.showcaseId) : '';
			if (resultShowcaseId && this.showcaseId && resultShowcaseId !== String(this.showcaseId)) {
				return;
			}
			uni.removeStorageSync('showcase_invite_sent_result');
			this.isInviting = true;
			this.showInviteSentPopup = true;
			this.loadOfficialAccountQrCode();
		},
		async loadShowcaseDetail() {
			if (!this.showcaseId) {
				this.loadError = '参数错误';
				return;
			}
			this.loading = true;
			this.loadError = '';
			try {
				const res = await request.get(`/wechat/showCase/${this.showcaseId}`);
				this.detail = res.data || {};
				uni.setNavigationBarTitle({
					title: this.detail.showcaseTitle || '橱窗详情'
				});
				await Promise.all([
				this.checkFollowStatus(),
				this.checkFavoriteStatus(),
				this.checkInviteStatus()
			]);
			this.resetComments();
			} catch (e) {
				this.loadError = (e && e.msg) || '橱窗详情加载失败';
			} finally {
				this.loading = false;
			}
		},
		switchReviewTab(tab) {
			if (this.activeReviewTab === tab) {
				return;
			}
			this.activeReviewTab = tab;
			this.resetComments();
		},
		resetComments() {
			this.commentPageNum = 1;
			this.commentTotal = 0;
			this.commentFinished = false;
			this.comments = [];
			this.fetchComments(1, true);
		},
		loadMoreComments() {
			if (this.loading || this.commentLoading || this.commentFinished) {
				return;
			}
			this.fetchComments(this.commentPageNum + 1, false);
		},
		async fetchComments(pageNum, isRefresh) {
			if (!this.followUserId) {
				this.commentFinished = true;
				return;
			}
			const currentRequestSeq = ++this.commentRequestSeq;
			this.commentLoading = true;
			try {
				const params = {
					userId: this.followUserId,
					pageNum,
					pageSize: this.commentPageSize
				};
				if (this.activeReviewTab === 'image') {
					params.hasImage = true;
				}
				const res = await request.get('/wechat/comment/page', params);
				if (currentRequestSeq !== this.commentRequestSeq) {
					return;
				}
				const rows = Array.isArray(res.rows) ? res.rows : [];
				const nextList = rows.map(item => this.normalizeComment(item));
				this.commentPageNum = pageNum;
				this.commentTotal = Number(res.total) || 0;
				this.comments = isRefresh ? nextList : this.comments.concat(nextList);
				this.commentFinished = rows.length < this.commentPageSize || this.comments.length >= this.commentTotal;
			} catch (e) {
				if (currentRequestSeq === this.commentRequestSeq) {
					this.commentFinished = isRefresh;
				}
			} finally {
				if (currentRequestSeq === this.commentRequestSeq) {
					this.commentLoading = false;
				}
			}
		},
		normalizeComment(item) {
			const imageList = this.normalizeCommentImageList(item.imageList);
			const reviewerName = item.reviewerUserName ||
				item.reviewerNickName ||
				item.reviewerNickname ||
				item.reviewerName ||
				item.nickName ||
				item.nickname ||
				item.userName ||
				item.name ||
				'评论用户';
			const reviewerAvatar = item.reviewerAvatarUrl ||
				item.reviewerAvatar ||
				item.avatarUrl ||
				item.avatar ||
				item.headImgUrl ||
				item.headImageUrl ||
				'';
			return {
				id: item.commentId || `${item.orderNo || 'comment'}-${item.createTime || Math.random()}`,
				name: reviewerName,
				time: this.formatCommentTime(item.createTime),
				avatar: this.buildImageUrl(reviewerAvatar) || '/static/yunyiku/avatar.png',
				content: item.content || '',
				rating: this.normalizeRating(item.rating),
				imageList,
				imageUrls: imageList.map(image => this.buildImageUrl(image)).filter(Boolean)
			};
		},
		normalizeRating(value) {
			const rating = Number(value);
			if (!Number.isFinite(rating)) {
				return 5;
			}
			return Math.min(5, Math.max(1, Math.floor(rating)));
		},
		normalizeCommentImageList(value) {
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
				return text.split(',').map(item => item.trim()).filter(Boolean);
			}
			return [];
		},
		formatCommentTime(value) {
			if (!value) {
				return '';
			}
			const text = String(value).replace(/-/g, '/');
			const formatted = text.length >= 10 ? text.slice(0, 10) : text;
			return formatted.replace(/\//g, '-');
		},
		normalizeCoverList(value) {
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
		buildImageUrl(url) {
			if (!url || typeof url !== 'string') {
				return '';
			}
			const imageUrl = url.trim();
			if (!imageUrl) {
				return '';
			}
			if (/^(https?:|wxfile:|data:|blob:|\/static\/)/.test(imageUrl)) {
				return imageUrl;
			}
			return env.aliyunUrl + imageUrl.replace(/^\/+/, '') + '?x-oss-process=image/resize,w_750/quality,q_65/format,webp';
		},
		buildShareImageUrl(url) {
			if (!url || typeof url !== 'string') {
				return '';
			}
			const imageUrl = url.trim();
			if (/^https?:\/\//.test(imageUrl)) {
				return imageUrl;
			}
			if (/^\/static\//.test(imageUrl)) {
				return imageUrl;
			}
			return env.aliyunUrl + imageUrl.replace(/^\/+/, '');
		},
		getShareImageUrl() {
			const coverList = this.normalizeCoverList(this.detail.coverList);
			const fallbackCover = this.normalizeCoverList(this.detail.coverImage);
			const covers = coverList.length > 0 ? coverList : fallbackCover;
			return this.buildShareImageUrl(covers[0]) || '/static/yunyiku/bg.png';
		},
		formatMoney(value, keepDecimal = false) {
			const amount = Number(value);
			if (!Number.isFinite(amount)) {
				return '0.00';
			}
			const text = amount.toFixed(2);
			return keepDecimal ? text : text.replace(/\.00$/, '');
		},
		handlePosterChange(event) {
			this.currentPosterIndex = event.detail.current || 0;
		},
		previewPoster(index) {
			if (this.posterUrls.length === 0) {
				return;
			}
			uni.previewImage({
				urls: this.posterUrls,
				current: this.posterUrls[index]
			});
		},
		previewCommentImages(item, index) {
			if (!item || !Array.isArray(item.imageUrls) || item.imageUrls.length === 0) {
				return;
			}
			uni.previewImage({
				urls: item.imageUrls,
				current: item.imageUrls[index]
			});
		},
		goBack() {
			const pages = getCurrentPages();
			if (pages.length > 1) {
				uni.navigateBack();
				return;
			}
			uni.switchTab({
				url: '/pages/library/home'
			});
		},
		handleShareClick() {
			if (this.isLoggedIn) {
				return;
			}
			if (this.loginPromptVisible) {
				return;
			}
			this.loginPromptVisible = true;
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
						uni.setStorageSync('login_redirect', `/subpkg-showcase/pages/detail/index?id=${this.showcaseId}`);
						uni.navigateTo({
							url: '/subpkg-others/pages/login/index'
						});
					}
				}
			});
		},
		goToSellerHome() {
			if (!this.followUserId) {
				uni.showToast({
					title: '用户信息缺失',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/subpkg-library/pages/visitor-home?userId=${encodeURIComponent(this.followUserId)}&isTeamMode=false`
			});
		},
		closeInviteSentPopup() {
			this.showInviteSentPopup = false;
		},
		async loadOfficialAccountQrCode() {
			if (this.officialQrCodeLoading || this.officialQrCode) {
				return;
			}
			this.officialQrCodeLoading = true;
			try {
				const res = await request.get('/wechat/basic/officialAccountQrCode');
				const data = res && res.data ? res.data : res;
				this.officialQrCode = this.normalizeOfficialQrCode(data && data.officialAccountQrCode);
			} catch (e) {
				console.error('获取公众号二维码失败', e);
			} finally {
				this.officialQrCodeLoading = false;
			}
		},
		normalizeOfficialQrCode(value) {
			if (!value || typeof value !== 'string') {
				return '';
			}
			const qrCode = value.trim();
			if (!qrCode) {
				return '';
			}
			if (/^(https?:|wxfile:|data:image|blob:|\/static\/)/.test(qrCode)) {
				return qrCode;
			}
			if (qrCode.startsWith('/9j/')) {
				return `data:image/jpeg;base64,${qrCode}`;
			}
			if (qrCode.startsWith('iVBORw0KGgo') || /^[A-Za-z0-9+/=]+$/.test(qrCode)) {
				return `data:image/png;base64,${qrCode}`;
			}
			return `${env.baseUrl.replace(/\/$/, '')}/${qrCode.replace(/^\/+/, '')}`;
		},
		async checkFavoriteStatus() {
			if (!this.showcaseId || !uni.getStorageSync('token') || this.isOwnShowcase) {
				this.isFavorite = false;
				return;
			}
			try {
				const res = await request.get('/wechat/userShowcaseFavorite/check', {
					showcaseId: this.getOrderShowcaseId()
				});
				this.isFavorite = res.data === true;
			} catch (e) {
				this.isFavorite = false;
				console.warn('查询橱窗收藏状态失败', e);
			}
		},
		async handleFavorite() {
			if (this.favoriteLoading) {
				return;
			}
			if (!this.showcaseId) {
				uni.showToast({
					title: '缺少橱窗ID',
					icon: 'none'
				});
				return;
			}
			if (this.isOwnShowcase) {
				uni.showToast({
					title: '不能收藏自己的橱窗',
					icon: 'none'
				});
				return;
			}
			if (!uni.getStorageSync('token')) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			this.favoriteLoading = true;
			try {
				const url = this.isFavorite ? '/wechat/userShowcaseFavorite/cancelFavorite' : '/wechat/userShowcaseFavorite/clickFavorite';
				const res = await request.post(url, {
					showcaseId: this.getOrderShowcaseId()
				});
				this.isFavorite = !this.isFavorite;
				uni.showToast({
					title: res.msg || (this.isFavorite ? '收藏成功' : '取消收藏成功'),
					icon: 'none'
				});
			} catch (e) {
				console.error('更新橱窗收藏状态失败', e);
			} finally {
				this.favoriteLoading = false;
			}
		},
		async checkFollowStatus() {
			if (!this.showFollowButton || !uni.getStorageSync('token')) {
				this.isFollowed = false;
				return;
			}
			try {
				const res = await request.get('/wechat/userFollow/check', {
					followUserId: this.followUserId
				});
				this.isFollowed = res.data === true;
			} catch (e) {
				this.isFollowed = false;
				console.warn('查询关注状态失败', e);
			}
		},
		async checkInviteStatus() {
			if (!this.showcaseId || !uni.getStorageSync('token') || this.isOwnShowcase) {
				this.isInviting = false;
				return;
			}
			try {
				const res = await request.get('/wechat/showCase/invite/check', {
					showcaseId: this.getOrderShowcaseId()
				});
				this.isInviting = res.data === true;
			} catch (e) {
				this.isInviting = false;
				console.warn('查询约稿状态失败', e);
			}
		},
		async handleFollow() {
			if (this.followLoading || !this.showFollowButton) {
				return;
			}
			if (!uni.getStorageSync('token')) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			this.followLoading = true;
			try {
				const url = this.isFollowed ? '/wechat/userFollow/cancelFollow' : '/wechat/userFollow/clickFollow';
				await request.post(url, {
					followUserId: this.followUserId
				});
				this.isFollowed = !this.isFollowed;
				uni.showToast({
					title: this.isFollowed ? '关注成功' : '已取消关注',
					icon: 'none'
				});
			} catch (e) {
				console.error('更新关注状态失败', e);
			} finally {
				this.followLoading = false;
			}
		},
		handleHire() {
			if (this.isOwnShowcase || this.isInviting) {
				return;
			}
			if (!this.followUserId) {
				uni.showToast({
					title: '缺少被约稿用户',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/subpkg-task/pages/index?publishType=invite&inviteeWxUserId=${encodeURIComponent(this.followUserId)}&source=showcase&showcaseId=${encodeURIComponent(this.showcaseId)}`
			});
		},
		openPayPopup() {
			this.handleBuyClick();
		},
		closePayPopup() {
			this.showPayPopup = false;
		},
		decreaseCount() {
			if (this.buyCount <= 1) {
				return;
			}
			this.buyCount -= 1;
		},
		increaseCount() {
			this.buyCount += 1;
		},
		async handlePay() {
			if (!this.selectedDeliveryDate) {
				this.showPayPopup = false;
				this.$nextTick(() => {
					setTimeout(() => {
						this.openDeliveryCalendar();
					}, 50);
				});
				return;
			}
			await this.handleOrder(true);
		},
		async handleBuyClick() {
			if (this.orderLoading || this.isOwnShowcase) {
				return;
			}
			if (!this.showcaseId) {
				uni.showToast({
					title: '缺少橱窗ID',
					icon: 'none'
				});
				return;
			}
			if (!uni.getStorageSync('token')) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			this.selectedDeliveryDate = '';
			this.showPayPopup = true;
		},
		openDeliveryCalendar() {
			if (this.orderLoading || this.isOwnShowcase) {
				return;
			}
			if (!this.showcaseId) {
				uni.showToast({
					title: '缺少橱窗ID',
					icon: 'none'
				});
				return;
			}
			if (!uni.getStorageSync('token')) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			this.$nextTick(() => {
				if (this.$refs.deliveryCalendar && this.$refs.deliveryCalendar.open) {
					this.$refs.deliveryCalendar.open();
				}
			});
		},
		async confirmDeliveryDate(e) {
			const deliveryDate = e && (e.fulldate || e.fullDate);
			if (!this.isValidDeliveryDate(deliveryDate)) {
				uni.showToast({
					title: '请选择明天及之后的日期',
					icon: 'none'
				});
				return;
			}
			this.selectedDeliveryDate = deliveryDate;
			await this.handleOrder(true);
		},
		confirmPurchase() {
			return new Promise(resolve => {
				uni.showModal({
					title: '确认购买',
					content: `是否购买该橱窗服务？金额：${this.priceText}`,
					confirmText: '同意',
					cancelText: '取消',
					confirmColor: '#f37738',
					success: res => {
						resolve(Boolean(res.confirm));
					},
					fail: () => {
						resolve(false);
					}
				});
			});
		},
		async handleOrder(needConfirm = false) {
			if (this.orderLoading || this.isOwnShowcase) {
				return;
			}
			if (!this.showcaseId) {
				uni.showToast({
					title: '缺少橱窗ID',
					icon: 'none'
				});
				return;
			}
			if (!uni.getStorageSync('token')) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return;
			}
			if (!this.isValidDeliveryDate(this.selectedDeliveryDate)) {
				uni.showToast({
					title: '请先选择交稿日期',
					icon: 'none'
				});
				this.openDeliveryCalendar();
				return;
			}
			if (needConfirm) {
				const confirmed = await this.confirmPurchase();
				if (!confirmed) {
					return;
				}
			}
			this.orderLoading = true;
			try {
				const res = await request.post('/wechat/showCase/order', {
					showcaseId: this.getOrderShowcaseId(),
					deliveryDate: this.selectedDeliveryDate
				});
				const data = res.data || {};
				if (data.payParams) {
					await this.requestWxPayment(data.payParams);
					this.goToOutsourcingAfterPurchase('支付成功');
					return;
				}
				this.goToOutsourcingAfterPurchase(res.msg || '下单成功');
			} catch (e) {
				console.error('橱窗下单失败', e);
			} finally {
				this.orderLoading = false;
			}
		},
		goToOutsourcingAfterPurchase(message) {
			this.showPayPopup = false;
			uni.showToast({
				title: message || '购买成功',
				icon: 'none'
			});
			setTimeout(() => {
				uni.redirectTo({
					url: '/subpkg-profile/pages/outsourcing/index',
					fail: () => {
						uni.navigateTo({
							url: '/subpkg-profile/pages/outsourcing/index'
						});
					}
				});
			}, 800);
		},
		parsePayParams(value) {
			if (!value) {
				return null;
			}
			if (typeof value === 'string') {
				try {
					return JSON.parse(value);
				} catch (e) {
					return null;
				}
			}
			return value;
		},
		getOrderShowcaseId() {
			const value = String(this.showcaseId);
			return /^\d+$/.test(value) ? Number(value) : this.showcaseId;
		},
		getOffsetDateString(offsetDays) {
			const date = new Date();
			date.setHours(0, 0, 0, 0);
			date.setDate(date.getDate() + offsetDays);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		},
		isValidDeliveryDate(value) {
			if (!value) {
				return false;
			}
			const selectedTime = new Date(String(value).replace(/-/g, '/')).getTime();
			const minTime = new Date(this.minDeliveryDate.replace(/-/g, '/')).getTime();
			return Number.isFinite(selectedTime) && selectedTime >= minTime;
		},
		requestWxPayment(value) {
			const payParams = this.parsePayParams(value);
			if (!payParams || typeof payParams !== 'object') {
				uni.showToast({
					title: '支付参数异常',
					icon: 'none'
				});
				return Promise.reject(new Error('Invalid payParams'));
			}
			const packageValue = payParams.package || payParams.packageValue;
			if (!payParams.timeStamp || !payParams.nonceStr || !packageValue || !payParams.signType || !payParams.paySign) {
				uni.showToast({
					title: '支付参数异常',
					icon: 'none'
				});
				return Promise.reject(new Error('Incomplete payParams'));
			}
			return new Promise((resolve, reject) => {
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: String(payParams.timeStamp),
					nonceStr: payParams.nonceStr,
					package: packageValue,
					signType: payParams.signType,
					paySign: payParams.paySign,
					success: resolve,
					fail: reject
				});
			});
		}
	},
	onShareAppMessage() {
		return {
			title: this.detail.showcaseTitle || '橱窗详情',
			path: `/subpkg-showcase/pages/detail/index?id=${this.showcaseId}&fromShare=1`,
			imageUrl: this.getShareImageUrl()
		};
	},
	onShareTimeline() {
		return {
			title: this.detail.showcaseTitle || '橱窗详情',
			query: `id=${this.showcaseId}&fromShare=1`,
			imageUrl: this.getShareImageUrl()
		};
	}
};
</script>

<style lang="scss" scoped>
.detail-page {
	min-height: 100vh;
	background: #f7f7f7;
	color: #000000;
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

.page-scroll {
	height: 100vh;
}

.page-canvas {
	min-height: calc(100vh + 1rpx);
	padding-bottom: calc(98rpx + env(safe-area-inset-bottom));
	box-sizing: border-box;
}

.state-block {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	color: #999999;
}

.retry-btn {
	width: 180rpx;
	height: 64rpx;
	margin-top: 24rpx;
	border-radius: 32rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 26rpx;
	line-height: 64rpx;
}

.hero-card {
	position: relative;
	background: #ffffff;
	padding-bottom: 30rpx;
}

.poster-area {
	position: relative;
	width: 750rpx;
	height: 480rpx;
	background: #f7f7f7;
	overflow: hidden;
}

.poster-swiper,
.empty-poster,
.poster-image {
	width: 750rpx;
	height: 480rpx;
}

.empty-poster {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	color: #999999;
}

.poster-count {
	position: absolute;
	left: 30rpx;
	bottom: 24rpx;
	min-width: 72rpx;
	height: 36rpx;
	padding: 0 16rpx;
	border-radius: 20rpx;
	background: rgba(0, 0, 0, 0.7);
	color: #ffffff;
	font-size: 20rpx;
	line-height: 36rpx;
	text-align: center;
	box-sizing: border-box;
}

.showcase-title {
	display: block;
	margin: 24rpx 32rpx 0;
	max-width: 650rpx;
	font-size: 34rpx;
	font-weight: bold;
	line-height: 48rpx;
	color: #000000;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.hero-guarantees {
	margin: 16rpx 30rpx 0;
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
	max-height: 36rpx;
	overflow: hidden;
}

.hero-guarantee {
	height: 36rpx;
	padding: 4rpx 20rpx;
	border-radius: 20rpx;
	background: #f5f5f5;
	font-size: 20rpx;
	line-height: 28rpx;
	color: #000000;
	box-sizing: border-box;
}

.hero-empty {
	margin: 16rpx 30rpx 0;
	height: 36rpx;
	font-size: 20rpx;
	line-height: 36rpx;
	color: #979797;
}

.deal-row {
	margin: 24rpx 30rpx 0;
	display: flex;
	align-items: center;
}

.showcase-price {
	font-size: 40rpx;
	line-height: 56rpx;
	color: #f37738;
}

.sold-wrap {
	margin-left: 44rpx;
	margin-top: 5rpx;
	display: flex;
	align-items: center;
	font-size: 24rpx;
	line-height: 34rpx;
	color: rgba(0, 0, 0, 0.4);
	flex: 1;
}

.sold-icon {
	position: relative;
	width: 32rpx;
	height: 28rpx;
	margin-right: 19rpx;
	border-radius: 50%;
}



.favorite-btn {
	margin-left: auto;
	width: 150rpx;
	height: 48rpx;
	border: 1rpx solid #5a8fea;
	border-radius: 36rpx;
	color: #5a8fea;
	font-size: 26rpx;
	line-height: 48rpx;
	background: #ffffff;
}

.favorite-btn.favorited {
	border-color: #d4d4d4;
	color: #979797;
}

.favorite-btn[disabled] {
	opacity: 0.6;
}

.seller-card {
	position: relative;
	margin-top: 16rpx;
	background: #ffffff;
	padding: 30rpx 32rpx;
}

.seller-avatar {
	position: absolute;
	left: 32rpx;
	top: 30rpx;
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background: #d8d8d8;
}

.seller-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #000000;
	display: inline-block;
	vertical-align: middle;
	max-width: 195rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.seller-name-container{
	word-break: break-word;
	margin-left: 100rpx;
	font-size: 32rpx;
	line-height: 45rpx;
	color: #000000;
	display: inline-block;
	vertical-align: middle;
	max-width: 195rpx;
}

.seller-location {
	display: inline-flex;
	align-items: center;
	margin-left: 16rpx;
	vertical-align: middle;
	font-size: 22rpx;
	line-height: 45rpx;
	color: #666666;
}

.location-icon {
	position: relative;
	width: 20rpx;
	height: 25rpx;
	margin-right: 17rpx;
	margin-left: 1rpx;
	flex-shrink: 0;
}

.follow-btn {
	position: absolute;
	right: 32rpx;
	top: 50rpx;
	width: 150rpx;
	height: 48rpx;
	border: 1rpx solid #ff8b5a;
	border-radius: 36rpx;
	color: #ff8b5a;
	font-size: 26rpx;
	line-height: 48rpx;
	background: #ffffff;
}

.follow-btn.followed {
	border-color: #d4d4d4;
	color: #979797;
}

.seller-rating {
	margin-left: 100rpx;
	margin-top: 8rpx;
	display: flex;
	align-items: center;
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

.seller-divider {
	margin-top: 20rpx;
	border-top: 2rpx dashed #dcdcdc;
}

.seller-stats {
	margin-top: 27rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #979797;
}


.description-card {
	margin-top: 16rpx;
	background: #ffffff;
	padding: 30rpx 32rpx;
	box-sizing: border-box;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	line-height: 45rpx;
	color: #000000;
}

.description-text {
	display: block;
	margin-top: 24rpx;
	font-size: 26rpx;
	line-height: 42rpx;
	color: #979797;
	white-space: pre-wrap;
}

.review-card {
	margin-top: 16rpx;
	background: #ffffff;
	padding: 30rpx 32rpx;
	box-sizing: border-box;
	overflow: hidden;
}

.review-tabs {
	display: inline-flex;
	align-items: center;
	margin-top: 24rpx;
	padding-left: 14rpx;
}

.review-tab {
	height: 24rpx;
	min-width: 109rpx;
	display: flex;
	align-items: center;
	padding: 12rpx 24rpx;
	font-size: 24rpx;
	color: #000000;
	border-radius: 32rpx;
	background: #f5f5f5;
	margin-right: 30rpx;
}

.review-tab.active {
	background: #FFF1E9;
}

.tab-label {
	flex-shrink: 0;
}

.tab-count {
	margin-left: 8rpx;
	font-size: 22rpx;
	line-height: 30rpx;
	color: #979797;
}

.comment-empty,
.comment-load-state {
	height: 96rpx;
	line-height: 96rpx;
	font-size: 24rpx;
	color: #999999;
	text-align: center;
}

.comment-item {
	position: relative;
	display: flex;
	margin-top: 40rpx;
}

.comment-avatar {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	margin-right: 20rpx;
	background: #eeeeee;
	flex-shrink: 0;
}

.comment-content {
	flex: 1;
	min-width: 0;
}

.comment-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.comment-name {
	font-size: 30rpx;
	font-weight: bold;
	line-height: 42rpx;
	color: #000000;
}

.comment-time {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #979797;
}

.comment-stars {
	display: flex;
	align-items: center;
	margin-top: 4rpx;
	height: 32rpx;
}

.comment-star {
	margin-right: 2rpx;
	font-size: 30rpx;
	line-height: 34rpx;
	color: #d6d6d6;
}

.comment-star.active {
	color: #f37738;
}

.comment-text {
	display: block;
	margin-top: 16rpx;
	font-size: 26rpx;
	line-height: 42rpx;
	color: #666666;
}

.comment-images {
	display: flex;
	flex-wrap: wrap;
	margin-top: 16rpx;
	gap: 16rpx;
}

.comment-image {
	width: 140rpx;
	height: 140rpx;
	background: #f0f0f0;
	border-radius: 8rpx;
}

.bottom-space {
	height: 116rpx;
}

.bottom-actions {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 18;
	height: 98rpx;
	padding: 0 30rpx;
	padding-bottom: env(safe-area-inset-bottom);
	background: #ffffff;
	box-shadow: 0 -1rpx 0 #dddddd;
	display: flex;
	align-items: center;
	box-sizing: content-box;
}

.bottom-share-btn {
	width: 56rpx;
	height: 56rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.bottom-share-icon {
	width: 56rpx;
	height: 56rpx;
	display: block;
}

.buy-btn,
.hire-btn {
	width: 200rpx;
	height: 64rpx;
	border-radius: 36rpx;
	font-size: 28rpx;
	line-height: 64rpx;
}

.buy-btn {
	margin-left: auto;
	margin-right: 38rpx;
	border: 1rpx solid #f37738;
	color: #f37738;
	background: #ffffff;
}

.buy-btn[disabled] {
	opacity: 0.6;
}

.hire-btn {
	color: #ffffff;
	background: #f37738;
}

.hire-btn--inviting {
	background: #979797;
	color: #ffffff;
}
button.hire-btn.hire-btn--inviting[disabled] {
	background: #979797; 
	color: #ffffff;
}

.pay-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: 23rpx;
	box-sizing: border-box;
}

::v-deep .uni-calendar__mask,
::v-deep .uni-calendar--fixed {
	z-index: 1300;
}

.invite-result-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1200;
	background: rgba(0, 0, 0, 0.42);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 28rpx;
	box-sizing: border-box;
}

.invite-result-panel {
	width: 694rpx;
	min-height: 560rpx;
	border-radius: 36rpx;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 62rpx 42rpx 58rpx;
	box-sizing: border-box;
}

.invite-result-title {
	font-size: 38rpx;
	line-height: 54rpx;
	font-weight: 700;
	color: #222222;
	text-align: center;
}

.invite-result-desc {
	margin-top: 32rpx;
	font-size: 26rpx;
	line-height: 38rpx;
	color: #999999;
	text-align: center;
}

.official-qr-box {
	width: 360rpx;
	height: 360rpx;
	margin-top: 38rpx;
	background: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.official-qr-image {
	width: 360rpx;
	height: 360rpx;
	display: block;
}

.official-qr-placeholder {
	font-size: 26rpx;
	line-height: 38rpx;
	color: #999999;
	text-align: center;
}

.official-qr-desc {
	margin-top: 24rpx;
	font-size: 26rpx;
	line-height: 38rpx;
	color: #999999;
	text-align: center;
}

.pay-panel {
	position: relative;
	width: 705rpx;
	min-height: 495rpx;
	border-radius: 30rpx;
	background: #ffffff;
	padding: 71rpx 36rpx 36rpx 34rpx;
	box-sizing: border-box;
}

.pay-product {
	display: flex;
}

.pay-cover {
	width: 216rpx;
	height: 216rpx;
	border-radius: 16rpx;
	background: #d8d8d8;
	margin-right: 22rpx;
}

.pay-info {
	flex: 1;
	min-width: 0;
}

.pay-title {
	display: block;
	font-size: 36rpx;
	font-weight: bold;
	line-height: 50rpx;
	color: #000000;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.pay-price {
	display: block;
	margin-top: 10rpx;
	font-size: 36rpx;
	line-height: 50rpx;
	color: #f37738;
}

.count-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 14rpx;
}

.count-label {
	font-size: 28rpx;
	line-height: 40rpx;
	color: #000000;
}

.stepper {
	width: 237rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.step-btn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 6rpx;
	background: #f1f1f1;
	text-align: center;
	font-size: 36rpx;
	line-height: 58rpx;
	color: #000000;
}

.step-btn.minus {
	color: #979797;
}

.step-count {
	font-size: 36rpx;
	line-height: 50rpx;
	color: #000000;
}

.pay-guarantees {
	align-items: center;   
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx 8rpx;
	margin-top: 30rpx;
}

.pay-guarantee {
	min-height: 36rpx;
	padding: 4rpx 20rpx;
	border-radius: 20rpx;
	background: #f5f5f5;
	font-size: 20rpx;
	line-height: 28rpx;
	color: #000000;
	display: flex;
	align-items: center;
}

.pay-empty {
	margin-top: 30rpx;
	font-size: 24rpx;
	color: #999999;
}

.pay-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 34rpx;
}

.total-text {
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.wechat-pay-btn {
	width: 280rpx;
	height: 72rpx;
	border-radius: 36rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 28rpx;
	line-height: 72rpx;
}
</style>
