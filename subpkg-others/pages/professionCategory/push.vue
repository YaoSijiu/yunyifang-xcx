<template>
	<view class="push-page">
		<TitleBar :fixed="true" />

		<view class="page-title">选择您擅长的专业可获得任务推送
可多选</view>

		<view class="divider top"></view>
		<view class="category-panel" v-if="!loading && categoryTree.length > 0">
			<scroll-view class="left-scroll" scroll-y>
				<view
					v-for="item in categoryTree"
					:key="item.id"
					class="left-item"
					:class="{ active: activeParentId === item.id }"
					@click="selectParent(item)"
				>
					<view class="active-bar" v-if="activeParentId === item.id"></view>
					<text>{{ item.categoryName }}</text>
				</view>
			</scroll-view>
			<view class="vertical-line"></view>
			<scroll-view class="right-scroll" scroll-y>
				<view class="chip-wrap">
					<view
						v-for="item in activeChildren"
						:key="item.id"
						class="profession-chip"
						:class="{ active: selectedCategoryIds.includes(item.id) }"
						@click="toggleCategory(item)"
					>
						{{ item.categoryName }}
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="category-panel empty" v-else>
			<view v-if="loading" class="loading-text">加载中...</view>
			<view v-else class="loading-text">暂无专业分类</view>
		</view>

		<view class="divider bottom"></view>
		<view class="bottom-actions">
			<button class="skip-btn" @click="skipSelection">跳过</button>
			<button class="continue-btn" :disabled="submitting" @click="confirmSelection">
				{{ submitting ? '提交中...' : '继续' }}
			</button>
		</view>
	</view>
</template>

<script>
import TitleBar from '@/components/title.vue';

export default {
	components: {
		TitleBar
	},
	data() {
		return {
			role: '',
			regionId: '',
			loading: false,
			submitting: false,
			categoryTree: [],
			activeParentId: '',
			selectedCategoryIds: []
		};
	},
	computed: {
		activeChildren() {
			const parent = this.categoryTree.find(item => item.id === this.activeParentId) || this.categoryTree[0];
			if (!parent) {
				return [];
			}
			if (parent.children && parent.children.length) {
				return this.flattenCategories(parent.children);
			}
			return [parent];
		}
	},
	onLoad(options) {
		this.role = options.role || '';
		this.regionId = options.regionId || '';
		this.loadProfessionCategories();
	},
	methods: {
		goBack() {
			uni.navigateBack();
		},
		async loadProfessionCategories() {
			this.loading = true;
			try {
				const res = await this.$request.get('/wechat/professionCategory/list', {
					status: 1
				});
				this.categoryTree = this.normalizeCategories(res.data || []);
				this.activeParentId = this.categoryTree.length > 0 ? this.categoryTree[0].id : '';
			} catch (e) {
				this.categoryTree = [];
				this.activeParentId = '';
			} finally {
				this.loading = false;
			}
		},
		normalizeCategories(list) {
			return (list || []).map(item => ({
				id: item.id,
				parentId: item.parentId,
				level: item.level,
				categoryName: item.categoryName,
				categoryCode: item.categoryCode,
				icon: item.icon,
				children: this.normalizeCategories(item.children || [])
			}));
		},
		flattenCategories(list) {
			const result = [];
			const walk = (items) => {
				(items || []).forEach(item => {
					result.push(item);
					if (item.children && item.children.length) {
						walk(item.children);
					}
				});
			};
			walk(list);
			return result;
		},
		selectParent(item) {
			this.activeParentId = item.id;
		},
		toggleCategory(item) {
			const index = this.selectedCategoryIds.indexOf(item.id);
			if (index > -1) {
				this.selectedCategoryIds.splice(index, 1);
				return;
			}
			this.selectedCategoryIds.push(item.id);
		},
		skipSelection() {
			uni.switchTab({
				url: '/pages/library/home'
			});
		},
		async confirmSelection() {
			if (this.selectedCategoryIds.length === 0) {
				uni.showToast({
					title: '请选择专业',
					icon: 'none'
				});
				return;
			}
			const userInfo = uni.getStorageSync('userInfo') || {};
			const userId = userInfo.id || userInfo.userId;
			const regionId = Number(this.regionId);
			if (!userId) {
				uni.showToast({
					title: '用户信息不存在',
					icon: 'none'
				});
				return;
			}
			if (!regionId) {
				uni.showToast({
					title: '请选择地区',
					icon: 'none'
				});
				return;
			}
			if (this.submitting) {
				return;
			}

			this.submitting = true;
			uni.showLoading({
				title: '提交中...',
				mask: true
			});
			try {
				await this.$request.post('/wechat/professionCategory/userTaskType', {
					categoryIds: this.selectedCategoryIds
				});
				await this.$request.post('/wechat/basic/saveUserRegion', {
					userId: Number(userId),
					regionId
				});
				uni.switchTab({
					url: '/pages/library/home'
				});
			} catch (e) {
				uni.showToast({
					title: e.msg || '提交失败',
					icon: 'none'
				});
			} finally {
				uni.hideLoading();
				this.submitting = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.push-page {
	position: relative;
	width: 750rpx;
	min-height: 1624rpx;
	background: #ffffff;
	color: #000000;
	overflow: hidden;
}

.mock-status {
	position: absolute;
	left: 40rpx;
	top: 16rpx;
	width: 670rpx;
	height: 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.mock-time {
	font-size: 24rpx;
	line-height: 24rpx;
	color: #000000;
}

.mock-signal {
	height: 24rpx;
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.signal-bar {
	width: 6rpx;
	border-radius: 3rpx;
	background: #000000;
	align-self: flex-end;
}

.signal-bar.one {
	height: 9rpx;
}

.signal-bar.two {
	height: 12rpx;
}

.signal-bar.three {
	height: 16rpx;
}

.signal-bar.four {
	height: 20rpx;
	margin-right: 8rpx;
}

.wifi-dot {
	width: 24rpx;
	height: 18rpx;
	border-top: 4rpx solid #000000;
	border-radius: 20rpx 20rpx 0 0;
	margin-right: 10rpx;
}

.battery {
	width: 48rpx;
	height: 24rpx;
	border: 4rpx solid #000000;
	border-radius: 3rpx;
	box-sizing: border-box;
	position: relative;
}

.battery::after {
	content: '';
	position: absolute;
	right: -8rpx;
	top: 6rpx;
	width: 4rpx;
	height: 10rpx;
	background: #000000;
	border-radius: 2rpx;
}

.capsule {
	position: absolute;
	right: -3rpx;
	top: 17rpx;
	width: 197rpx;
	height: 65rpx;
	border: 1rpx solid #e1e1e1;
	border-radius: 33rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.dot-group {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.dot-group text {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background: #000000;
}

.capsule-line {
	width: 1rpx;
	height: 38rpx;
	background: #e1e1e1;
}

.circle-icon {
	width: 35rpx;
	height: 35rpx;
	border-radius: 50%;
	border: 4rpx solid #000000;
	box-sizing: border-box;
	position: relative;
}

.circle-icon::after {
	content: '';
	position: absolute;
	left: 8rpx;
	top: 8rpx;
	width: 11rpx;
	height: 11rpx;
	border-radius: 50%;
	background: #000000;
}

.page-title {
	position: absolute;
	left: 105rpx;
	top: 192rpx;
	width: 540rpx;
	height: 132rpx;
	font-size: 36rpx;
	line-height: 66rpx;
	color: #000000;
	text-align: center;
	white-space: pre-line;
}

.divider {
	position: absolute;
	left: 0;
	width: 750rpx;
	height: 1rpx;
	background: #e5e5e5;
}

.divider.top {
	top: 347rpx;
}

.divider.bottom {
	top: 1517rpx;
}

.category-panel {
	position: absolute;
	left: 0;
	top: 348rpx;
	width: 750rpx;
	height: 1169rpx;
	display: flex;
}

.category-panel.empty {
	align-items: center;
	justify-content: center;
}

.loading-text {
	font-size: 28rpx;
	color: #999999;
}

.left-scroll {
	width: 311rpx;
	height: 1169rpx;
}

.left-item {
	position: relative;
	height: 104rpx;
	display: flex;
	align-items: center;
	padding-left: 27rpx;
	box-sizing: border-box;
	font-size: 26rpx;
	line-height: 40rpx;
	color: #000000;
}

.left-item.active {
	color: #f37738;
}

.active-bar {
	position: absolute;
	left: 0;
	top: 42rpx;
	width: 8rpx;
	height: 27rpx;
	background: #f37738;
}

.vertical-line {
	width: 1rpx;
	height: 1169rpx;
	background: #dddddd;
}

.right-scroll {
	flex: 1;
	height: 1169rpx;
}

.chip-wrap {
	padding: 40rpx 20rpx 0;
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx 18rpx;
	box-sizing: border-box;
}

.profession-chip {
	min-width: 188rpx;
	height: 64rpx;
	padding: 0 24rpx;
	border-radius: 8rpx;
	background: #f7f7f7;
	color: #000000;
	font-size: 26rpx;
	line-height: 64rpx;
	text-align: center;
	box-sizing: border-box;
	border: 1rpx solid #f7f7f7;
	transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), color 160ms ease, border-color 160ms ease, background 160ms ease;
}

.profession-chip.active {
	color: #f37738;
	background: #ffffff;
	border-color: #f37738;
}

.profession-chip:active {
	transform: scale(0.96);
}

.bottom-actions {
	position: absolute;
	left: 38rpx;
	top: 1539rpx;
	width: 681rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.skip-btn,
.continue-btn {
	height: 64rpx;
	border-radius: 36rpx;
	font-size: 28rpx;
	line-height: 64rpx;
	padding: 0;
	margin: 0;
}

.skip-btn {
	width: 236rpx;
	background: #f7f7f7;
	color: #000000;
}

.continue-btn {
	width: 407rpx;
	background: #f37738;
	color: #ffffff;
}

.skip-btn::after,
.continue-btn::after {
	border: 0;
}
</style>
