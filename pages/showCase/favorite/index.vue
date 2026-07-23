<template>
	<view class="favorite-page">
		<view class="fixed-header">
			<view class="nav-bar">
				<view class="back-btn" @click="goBack">‹</view>
				<text class="page-title">我的收藏</text>
			</view>
		</view>

		<scroll-view
			class="list-scroll"
			scroll-y
			:refresher-enabled="true"
			:refresher-triggered="refreshing"
			@refresherrefresh="refreshList"
			@scrolltolower="loadMore"
		>
			<view class="list-body">
				<view v-if="loading && list.length === 0" class="state-block">加载中...</view>
				<view v-else-if="loadError && list.length === 0" class="state-block">
					<text>{{ loadError }}</text>
					<button class="retry-btn" @click="refreshList">重新加载</button>
				</view>
				<view v-else-if="list.length === 0" class="empty-card">
					<view class="empty-icon">
						<text>♡</text>
					</view>
					<text class="empty-title">暂无收藏橱窗</text>
					<text class="empty-desc">收藏喜欢的橱窗后，会在这里集中展示</text>
				</view>

				<view class="showcase-card" v-for="(item, index) in list" :key="item.id || index" :data-id="item.id" @click="goToDetail">
					<image class="cover-image" :src="getCoverUrl(item)" mode="aspectFill"></image>
					<view class="card-info">
						<text class="card-title">{{ item.showcaseTitle || '未命名橱窗' }}</text>
						<text class="sales-line">{{ item.nickName || '匿名用户' }}</text>
						<text class="sales-line second">已售{{ Number(item.salesCount) || 0 }}</text>
					</view>
					<text class="price-text">{{ formatPrice(item.price, item.priceUnit) }}</text>
					<button
						class="cancel-favorite-btn"
						:disabled="isCanceling(item)"
						@click.stop="cancelFavorite(item, index)"
					>{{ isCanceling(item) ? '取消中' : '取消收藏' }}</button>
				</view>

				<view v-if="list.length > 0" class="load-more-text">
					{{ hasMore ? (loadingMore ? '加载中...' : '上拉加载更多') : '没有更多了' }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import request from '@/utils/request.js';
import env from '@/config/env.js';

export default {
	data() {
		return {
			pageNum: 1,
			pageSize: 10,
			total: 0,
			list: [],
			loading: false,
			loadingMore: false,
			refreshing: false,
			loadError: '',
			loginPromptVisible: false,
			cancelingMap: {}
		};
	},
	computed: {
		hasMore() {
			return this.total > 0 && this.list.length < this.total;
		}
	},
	onLoad() {
		if (!this.ensureLoggedIn()) {
			return;
		}
		this.refreshList();
	},
	methods: {
		hasLoginToken() {
			return !!uni.getStorageSync('token');
		},
		ensureLoggedIn() {
			if (this.hasLoginToken()) {
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
			uni.setStorageSync('login_redirect', '/pages/showCase/favorite/index');
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
							url: '/pages/login/index'
						});
					}
				}
			});
		},
		goBack() {
			const pages = getCurrentPages();
			if (pages.length > 1) {
				uni.navigateBack({
					delta: 1,
					fail: () => {
						uni.switchTab({
							url: '/pages/profile/index'
						});
					}
				});
				return;
			}
			uni.switchTab({
				url: '/pages/profile/index'
			});
		},
		refreshList() {
			this.refreshing = true;
			this.loadList(true);
		},
		loadMore() {
			if (this.loading || this.loadingMore || !this.hasMore) {
				return;
			}
			this.loadList(false);
		},
		loadList(reset) {
			if (!this.ensureLoggedIn()) {
				this.refreshing = false;
				return;
			}
			if (reset) {
				this.pageNum = 1;
				this.total = 0;
				this.list = [];
				this.loadError = '';
				this.loading = true;
			} else {
				this.loadingMore = true;
			}
			request.get('/wechat/userShowcaseFavorite/page', {
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}).then(res => {
				const rows = Array.isArray(res.rows) ? res.rows : [];
				this.total = Number(res.total) || 0;
				this.list = reset ? rows : this.list.concat(rows);
				if (rows.length > 0) {
					this.pageNum += 1;
				}
			}).catch(e => {
				this.loadError = (e && e.msg) || '收藏列表加载失败';
			}).finally(() => {
				this.loading = false;
				this.loadingMore = false;
				this.refreshing = false;
			});
		},
		goToDetail(event) {
			const id = event && event.currentTarget && event.currentTarget.dataset ? event.currentTarget.dataset.id : '';
			if (!id) {
				uni.showToast({
					title: '橱窗ID不存在',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/pages/showCase/detail/index?id=${id}`
			});
		},
		isCanceling(item) {
			const id = item && item.id ? String(item.id) : '';
			return !!(id && this.cancelingMap[id]);
		},
		cancelFavorite(item, index) {
			if (!this.ensureLoggedIn()) {
				return;
			}
			const showcaseId = item && item.id ? item.id : '';
			if (!showcaseId) {
				uni.showToast({
					title: '橱窗ID不存在',
					icon: 'none'
				});
				return;
			}
			const key = String(showcaseId);
			if (this.cancelingMap[key]) {
				return;
			}
			this.$set(this.cancelingMap, key, true);
			request.post('/wechat/userShowcaseFavorite/cancelFavorite', {
				showcaseId
			}).then(res => {
				this.list.splice(index, 1);
				this.total = Math.max(0, Number(this.total) - 1);
				uni.showToast({
					title: res.msg || '取消收藏成功',
					icon: 'none'
				});
			}).catch(e => {
				console.error('取消橱窗收藏失败', e);
			}).finally(() => {
				this.$delete(this.cancelingMap, key);
			});
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
			if (/^(https?:|wxfile:|data:|blob:|\/static\/)/.test(imageUrl)) {
				return imageUrl;
			}
			return env.aliyunUrl + imageUrl.replace(/^\/+/, '') + '?x-oss-process=image/resize,w_300/quality,q_70/format,webp';
		},
		getCoverUrl(item) {
			const coverList = this.normalizeCoverList(item.coverList);
			const fallback = this.normalizeCoverList(item.coverImage);
			const cover = (coverList.length > 0 ? coverList : fallback)[0] || '';
			return this.buildImageUrl(cover) || '/static/yunyiku/bg.png';
		},
		formatPrice(price, unit) {
			const amount = price === null || price === undefined || price === '' ? '0' : price;
			return `¥${amount}${unit ? '/' + unit : ''}`;
		}
	}
};
</script>

<style lang="scss" scoped>
.favorite-page {
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

.fixed-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 20;
	height: 176rpx;
	background: #ffffff;
}

.nav-bar {
	position: relative;
	height: 176rpx;
}

.back-btn {
	position: absolute;
	left: 20rpx;
	top: 82rpx;
	width: 88rpx;
	height: 88rpx;
	font-size: 72rpx;
	line-height: 78rpx;
	text-align: center;
	color: #000000;
	z-index: 2;
}

.page-title {
	position: absolute;
	left: 0;
	right: 0;
	top: 95rpx;
	text-align: center;
	font-size: 40rpx;
	line-height: 56rpx;
	color: #000000;
}

.list-scroll {
	position: fixed;
	left: 0;
	right: 0;
	top: 176rpx;
	bottom: 0;
	background: #f7f7f7;
}

.list-body {
	min-height: 1080rpx;
	padding: 26rpx 30rpx 48rpx;
	box-sizing: border-box;
}

.state-block,
.empty-card {
	min-height: 600rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	color: #999999;
}

.empty-card {
	min-height: 520rpx;
	background: #ffffff;
	border-radius: 24rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
}

.empty-icon {
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
	background: #fff1e9;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 24rpx;
}

.empty-icon text {
	font-size: 72rpx;
	line-height: 72rpx;
	color: #f37738;
}

.empty-title {
	font-size: 32rpx;
	line-height: 45rpx;
	color: #333333;
	font-weight: 600;
}

.empty-desc {
	margin-top: 12rpx;
	font-size: 24rpx;
	line-height: 34rpx;
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

.showcase-card {
	position: relative;
	width: 690rpx;
	height: 220rpx;
	margin-bottom: 26rpx;
	border-radius: 16rpx;
	background: #ffffff;
	overflow: hidden;
}

.cover-image {
	position: absolute;
	left: 28rpx;
	top: 28rpx;
	width: 164rpx;
	height: 164rpx;
	border-radius: 16rpx;
	background: #f0f0f0;
}

.card-info {
	position: absolute;
	left: 214rpx;
	top: 32rpx;
	width: 300rpx;
}

.card-title {
	display: block;
	font-size: 32rpx;
	line-height: 45rpx;
	color: #000000;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.sales-line {
	display: block;
	margin-top: 10rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: rgba(0, 0, 0, 0.4);
	white-space: nowrap;
}

.sales-line.second {
	margin-top: 4rpx;
}

.price-text {
	position: absolute;
	right: 28rpx;
	top: 56rpx;
	max-width: 170rpx;
	font-size: 34rpx;
	line-height: 48rpx;
	color: #f37738;
	text-align: right;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.cancel-favorite-btn {
	position: absolute;
	right: 28rpx;
	bottom: 28rpx;
	width: 148rpx;
	height: 48rpx;
	border: 1rpx solid #d4d4d4;
	border-radius: 28rpx;
	color: #979797;
	background: #ffffff;
	font-size: 24rpx;
	line-height: 48rpx;
}

.cancel-favorite-btn[disabled] {
	opacity: 0.6;
}

.load-more-text {
	padding: 10rpx 0 40rpx;
	text-align: center;
	font-size: 24rpx;
	color: #999999;
}
</style>
