<template>
	<view class="my-showcase-page">
		<view class="fixed-header">
			<view class="tab-row">
				<view
					class="tab-item"
					v-for="item in tabs"
					:key="item.status"
					:class="{ active: activeStatus === item.status }"
					@click="switchTab(item.status)"
				>
					<text>{{ item.label }}</text>
					<view v-if="activeStatus === item.status" class="tab-line"></view>
				</view>
			</view>
		</view>

		<scroll-view
			class="list-scroll"
			:style="{ top: '92rpx' }"
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
				<view v-else-if="list.length === 0" class="state-block">暂无数据</view>

				<view class="showcase-card" v-for="(item, index) in list" :key="item.id || index" :data-id="item.id" @click="goToDetail">
					<image class="cover-image" :src="getCoverUrl(item)" mode="aspectFill"></image>
					<view class="card-info">
						<text class="card-title">{{ item.showcaseTitle || '未命名橱窗' }}</text>
						<text class="sales-line">累计销量{{ getTotalSales(item) }}</text>
						<text class="sales-line second">30日销量{{ getMonthSales(item) }}</text>
					</view>
					<text class="price-text">¥{{ formatMoney(item.price) }}</text>

					<button class="icon-action share-action" open-type="share" :data-index="index" @click.stop="markShareItem">
						<image src="/static/common/分享.png" mode="aspectFit"></image>
					</button>
					<view class="icon-action delete-action" :data-index="index" @click.stop="deleteShowcase">
						<image src="/static/common/删除.png" mode="aspectFit"></image>
					</view>
					<button class="pill-btn shelf-btn" :data-index="index" @click.stop="toggleShelf">{{ shelfButtonText(item) }}</button>
					<button class="pill-btn price-btn" :data-index="index" @click.stop="openPriceModal">改价</button>
					<button class="pill-btn edit-btn" :data-index="index" @click.stop="editShowcase">编辑</button>
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
	components: { },
	data() {
		return {
			statusBarHeight: 20,
			tabs: [
				{ label: '出售中', status: 1 },
				{ label: '草稿', status: 0 },
				{ label: '未上架', status: 2 }
			],
			activeStatus: 1,
			pageNum: 1,
			pageSize: 6,
			total: 0,
			list: [],
			loading: false,
			loadingMore: false,
			refreshing: false,
			loadError: '',
			shareItem: null
		};
	},
	computed: {
		hasMore() {
			if (!this.total) {
				return false;
			}
			return this.list.length < this.total;
		}
	},
	onLoad() {
		this.loadList(true);
	},
	onShow() {
		if (!uni.getStorageSync('my_showcase_list_need_refresh')) {
			return;
		}
		uni.removeStorageSync('my_showcase_list_need_refresh');
		this.refreshList();
	},
	methods: {
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
				url: `/subpkg-showcase/pages/detail/index?id=${id}`
			});
		},
		getItemByEvent(event) {
			const index = event && event.currentTarget && event.currentTarget.dataset ? Number(event.currentTarget.dataset.index) : -1;
			if (!Number.isFinite(index) || index < 0 || !this.list[index]) {
				uni.showToast({
					title: '橱窗数据不存在',
					icon: 'none'
				});
				return null;
			}
			return this.list[index];
		},
		switchTab(status) {
			if (this.activeStatus === status) {
				return;
			}
			this.activeStatus = status;
			this.refreshList();
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
		async loadList(reset) {
			if (reset) {
				this.pageNum = 1;
				this.total = 0;
				this.loadError = '';
				this.loading = true;
			} else {
				this.loadingMore = true;
			}
			try {
				const res = await request.get('/wechat/showCase/myShowcase/list', {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					status: this.activeStatus
				});
				const rows = Array.isArray(res.rows) ? res.rows : [];
				this.total = Number(res.total) || 0;
				this.list = reset ? rows : this.list.concat(rows);
				if (rows.length > 0) {
					this.pageNum += 1;
				}
			} catch (e) {
				this.loadError = (e && e.msg) || '橱窗列表加载失败';
				if (reset) {
					this.list = [];
				}
			} finally {
				this.loading = false;
				this.loadingMore = false;
				this.refreshing = false;
			}
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
		buildImageUrl(url, withProcess = true) {
			if (!url || typeof url !== 'string') {
				return '';
			}
			const imageUrl = url.trim();
			if (/^(https?:|wxfile:|data:|blob:|\/static\/)/.test(imageUrl)) {
				return imageUrl;
			}
			const suffix = withProcess ? '?x-oss-process=image/resize,w_300/quality,q_70/format,webp' : '';
			return env.aliyunUrl + imageUrl.replace(/^\/+/, '') + suffix;
		},
		getRawCover(item) {
			const coverList = this.normalizeCoverList(item.coverList);
			const fallback = this.normalizeCoverList(item.coverImage);
			return (coverList.length > 0 ? coverList : fallback)[0] || '';
		},
		getCoverUrl(item) {
			return this.buildImageUrl(this.getRawCover(item)) || '/static/yunyiku/bg.png';
		},
		getShareImageUrl(item) {
			return this.buildImageUrl(this.getRawCover(item), false) || '/static/yunyiku/bg.png';
		},
		formatMoney(value) {
			const amount = Number(value);
			if (!Number.isFinite(amount)) {
				return '0';
			}
			return amount.toFixed(2).replace(/\.00$/, '');
		},
		getTotalSales(item) {
			const value = item.totalSales !== undefined ? item.totalSales : (
				item.salesTotal !== undefined ? item.salesTotal : (
					item.salesCount !== undefined ? item.salesCount : (
						item.saleCount !== undefined ? item.saleCount : 0
					)
				)
			);
			return Number(value) || 0;
		},
		getMonthSales(item) {
			const value = item.monthSales !== undefined ? item.monthSales : (
				item.thirtyDaySales !== undefined ? item.thirtyDaySales : (
					item.salesCount30 !== undefined ? item.salesCount30 : (
						item.last30DaysSales !== undefined ? item.last30DaysSales : 0
					)
				)
			);
			return Number(value) || 0;
		},
		shelfButtonText(item) {
			const status = Number(item.status === undefined ? this.activeStatus : item.status);
			return status === 1 ? '下架' : '上架';
		},
		markShareItem(event) {
			const item = this.getItemByEvent(event);
			if (!item) {
				return;
			}
			this.shareItem = item;
		},
		deleteShowcase(event) {
			const item = this.getItemByEvent(event);
			if (!item) {
				return;
			}
			if (!item.id) {
				uni.showToast({
					title: '橱窗ID不存在',
					icon: 'none'
				});
				return;
			}
			uni.showModal({
				title: '删除橱窗',
				content: '确认删除该橱窗吗？',
				confirmText: '删除',
				confirmColor: '#f37738',
				success: async (res) => {
					if (!res.confirm) {
						return;
					}
					try {
						await request.delete(`/wechat/showCase/${item.id}`);
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						});
						this.refreshList();
					} catch (e) {}
				}
			});
		},
		async toggleShelf(event) {
			const item = this.getItemByEvent(event);
			if (!item) {
				return;
			}
			const currentStatus = item.status === undefined ? this.activeStatus : Number(item.status);
			const targetStatus = currentStatus === 1 ? 2 : 1;
			const actionText = targetStatus === 1 ? '上架' : '下架';
			uni.showModal({
				title: `${actionText}橱窗`,
				content: `确认${actionText}该橱窗吗？`,
				confirmText: actionText,
				confirmColor: '#f37738',
				success: async (res) => {
					if (!res.confirm) {
						return;
					}
					await this.saveShowcaseStatus(item, { status: targetStatus, toastTitle: `${actionText}成功` });
				}
			});
		},
		openPriceModal(event) {
			const item = this.getItemByEvent(event);
			if (!item) {
				return;
			}
			uni.showModal({
				title: '修改价格',
				editable: true,
				placeholderText: '请输入新价格',
				confirmText: '保存',
				confirmColor: '#f37738',
				success: async (res) => {
					if (!res.confirm) {
						return;
					}
					const price = Number(String(res.content || '').trim());
					if (!Number.isFinite(price) || price <= 0) {
						uni.showToast({
							title: '请输入有效价格',
							icon: 'none'
						});
						return;
					}
					await this.saveShowcaseStatus(item, { price, toastTitle: '改价成功' });
				}
			});
		},
		async saveShowcaseStatus(item, patch) {
			if (!item.id) {
				uni.showToast({
					title: '橱窗ID不存在',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '保存中...',
				mask: true
			});
			try {
				const detailRes = await request.get(`/wechat/showCase/${item.id}`);
				const detail = detailRes.data || {};
				detail.id = detail.id || item.id;
				await request.post('/wechat/showCase/save', this.buildSavePayload(detail, patch));
				uni.hideLoading();
				uni.showToast({
					title: patch.toastTitle || '保存成功',
					icon: 'success'
				});
				this.refreshList();
			} catch (e) {
				uni.hideLoading();
			}
		},
		buildSavePayload(detail, patch) {
			let professionIds = [];
			if (Array.isArray(detail.professionList)) {
				professionIds = detail.professionList.map(item => item.professionCategoryId || item.id).filter(Boolean).map(String);
			} else if (Array.isArray(detail.professionCategoryIds)) {
				professionIds = detail.professionCategoryIds.filter(Boolean).map(String);
			}
			const guaranteeList = Array.isArray(detail.guaranteeList)
				? detail.guaranteeList.map(item => ({
					guaranteeId: String(item.guaranteeId || item.id),
					isEnabled: item.isEnabled === undefined ? 1 : item.isEnabled,
					guaranteeValue: item.guaranteeValue || '',
					guaranteeUnit: item.guaranteeUnit || item.valueUnit || ''
				})).filter(item => item.guaranteeId)
				: [];
			const covers = this.normalizeCoverList(detail.coverList);
			const fallbackCovers = this.normalizeCoverList(detail.coverImage);
			return {
				id: detail.id,
				coverList: covers.length > 0 ? covers : fallbackCovers,
				showcaseTitle: detail.showcaseTitle || '',
				serviceDesc: detail.serviceDesc || '',
				professionCategoryIds: professionIds,
				price: patch.price !== undefined ? patch.price : Number(detail.price || 0),
				priceUnit: detail.priceUnit || '次',
				guaranteeList,
				status: patch.status !== undefined ? patch.status : detail.status
			};
		},
		editShowcase(event) {
			const item = this.getItemByEvent(event);
			if (!item) {
				return;
			}
			if (!item.id) {
				uni.showToast({
					title: '橱窗ID不存在',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/subpkg-showcase/pages/index?id=${item.id}&mode=edit`
			});
		}
	},
	onShareAppMessage(res) {
		let item = this.shareItem || this.list[0] || {};
		const index = res && res.target && res.target.dataset ? Number(res.target.dataset.index) : -1;
		if (Number.isFinite(index) && index >= 0 && this.list[index]) {
			item = this.list[index];
		}
		return {
			title: item.showcaseTitle || '我的橱窗',
			path: `/subpkg-showcase/pages/detail/index?id=${item.id || ''}&fromShare=1`,
			imageUrl: this.getShareImageUrl(item)
		};
	}
};
</script>

<style lang="scss" scoped>
.my-showcase-page {
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
	height: auto;
	background: #ffffff;
}

.tab-row {
	height: 92rpx;
	display: flex;
	align-items: flex-start;
	padding-left: 39rpx;
	box-sizing: border-box;
}

.tab-item {
	position: relative;
	font-size: 30rpx;
	color: #434343;
	padding: 14rpx 22rpx 21rpx;
	margin-right: 30rpx;
}

.tab-item.active {
	font-weight: 700;
	color: #1a1a1a;
}

.tab-line {
	position: absolute;
	left: 50%;
	bottom: 6rpx;
	width: 34rpx;
	height: 6rpx;
	border-radius: 999rpx;
	background: #ff7a22;
	transform: translateX(-50%);
}

.list-scroll {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background: #f7f7f7;
}

.list-body {
	min-height: 1356rpx;
	padding: 26rpx 30rpx 48rpx;
	box-sizing: border-box;
}

.state-block {
	min-height: 600rpx;
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

.showcase-card {
	position: relative;
	width: 690rpx;
	height: 320rpx;
	margin-bottom: 26rpx;
	border-radius: 16rpx;
	background: #ffffff;
	overflow: hidden;
}

.cover-image {
	position: absolute;
	left: 37rpx;
	top: 34rpx;
	width: 146rpx;
	height: 146rpx;
	border-radius: 16rpx;
	background: #f0f0f0;
}

.card-info {
	position: absolute;
	left: 195rpx;
	top: 34rpx;
	width: 350rpx;
}

.card-title {
	display: block;
	font-size: 36rpx;
	line-height: 51rpx;
	color: #000000;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.sales-line {
	display: block;
	margin-top: 6rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: rgba(0, 0, 0, 0.4);
	white-space: nowrap;
}

.sales-line.second {
	margin-top: 1rpx;
}

.price-text {
	position: absolute;
	right: 25rpx;
	top: 65rpx;
	max-width: 220rpx;
	font-size: 40rpx;
	line-height: 56rpx;
	color: #f37738;
	text-align: right;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.icon-action {
	position: absolute;
	width: 44rpx;
	height: 44rpx;
}

.icon-action image {
	width: 36rpx;
	height: 36rpx;
	margin: 4rpx;
	display: block;
}

.share-action {
	left: 33rpx;
	top: 236rpx;
}

.delete-action {
	left: 119rpx;
	top: 236rpx;
}

.pill-btn {
	position: absolute;
	top: 233rpx;
	width: 140rpx;
	height: 48rpx;
	border: 1rpx solid #979797;
	border-radius: 36rpx;
	color: #979797;
	background: #ffffff;
	font-size: 24rpx;
	line-height: 48rpx;
	text-align: center;
}

.shelf-btn {
	left: 207rpx;
}

.price-btn {
	left: 366rpx;
}

.edit-btn {
	left: 525rpx;
}

.load-more-text {
	height: 78rpx;
	font-size: 24rpx;
	line-height: 78rpx;
	color: #999999;
	text-align: center;
}
</style>
