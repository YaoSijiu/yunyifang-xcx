<template>
	<view class="page">
		<!-- 顶部 tab 切换 -->
		<view class="tab-header">
			<view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">
				<text>我的关注</text>
				<image v-if="currentTab === 0" class="tab-underline" src="/static/common/选中条.png" />
			</view>
			<view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">
				<text>我的粉丝</text>
				<image v-if="currentTab === 1" class="tab-underline" src="/static/common/选中条.png" />
			</view>
		</view>

		<!-- 列表内容 -->
		<view class="list-container" @scrolltolower="loadMore">
			<view class="list-item" v-for="item in currentList" :key="item.id" @click="goToUserHome(item)">
				<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{ item.name }}</text>
					<text class="bio">{{ item.bio }}</text>
				</view>
				<view class="action-btn" :class="{ following: item.isFollowing }" @click.stop="handleFollow(item)">
					<text>{{ getBtnText(item) }}</text>
				</view>
			</view>
			
		</view>
		
		<!-- 没有更多数据 -->
		<view v-if="currentList.length >0" class="load-more-text">
		    {{ currentHasMore ? (loadingMore ? '加载中...' : '上拉加载更多') : '没有更多了' }}
		</view>
		
		<!-- 空状态 -->
		<view v-if="currentList.length === 0 && !loading" class="empty-state">
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script>
import config from '@/config/env.js';

export default {
	data() {
		return {
			currentTab: 0,
			pageSize: 20,
			loading: false,
			loadingMore: false,

			followingList: [],
			followingPageNum: 1,
			followingTotal: 0,
			followingHasMore: true,

			fansList: [],
			fansPageNum: 1,
			fansTotal: 0,
			fansHasMore: true
		};
	},
	computed: {
		currentList() {
			return this.currentTab === 0 ? this.followingList : this.fansList;
		},
		currentHasMore() {
			return this.currentTab === 0 ? this.followingHasMore : this.fansHasMore;
		}
	},
	onLoad(options) {
		this.currentTab = options.tab === 'followers' ? 1 : 0;
		this.loadFirstPage();
	},
	onShow() {
		this.refreshCurrentList();
	},
	methods: {
		switchTab(index) {
			if (this.currentTab === index) return;
			this.currentTab = index;
			this.resetPagination(this.currentTab);
			this.loadFirstPage();
		},

		refreshCurrentList() {
			this.resetPagination(this.currentTab);
			this.loadFirstPage();
		},

		resetPagination(tab) {
			if (tab === 0) {
				this.followingList = [];
				this.followingPageNum = 1;
				this.followingTotal = 0;
				this.followingHasMore = true;
			} else {
				this.fansList = [];
				this.fansPageNum = 1;
				this.fansTotal = 0;
				this.fansHasMore = true;
			}
		},

		loadFirstPage() {
			if (this.currentTab === 0) {
				this.fetchList(0, 1, true);
			} else {
				this.fetchList(1, 1, true);
			}
		},

		loadMore() {
			if (this.loading || this.loadingMore || !this.currentHasMore) return;
			const nextPage = this.currentTab === 0 ? this.followingPageNum + 1 : this.fansPageNum + 1;
			this.fetchList(this.currentTab, nextPage, false);
		},

		async fetchList(tab, pageNum, isRefresh) {
			if (isRefresh) {
				this.loading = true;
				uni.showLoading({ title: '加载中...' });
			} else {
				this.loadingMore = true;
			}

			try {
				const url = tab === 0
					? '/wechat/userFollow/follows/page'
					: '/wechat/userFollow/fans/page';
				const res = await this.$request.get(url, {
					pageNum: pageNum,
					pageSize: this.pageSize
				});

				if (res.code === 200) {
					const rows = res.rows || res.data || [];
					const total = res.total || 0;
					const mapped = rows.map(item => tab === 0
						? {
							id: item.userId,
							name: item.nickName || '用户',
							avatar: this.resolveAvatar(item.avatarUrl),
							bio: this.formatTime(item.followTime),
							isFollowing: true
						}
						: {
							id: item.userId,
							name: item.nickName || '用户',
							avatar: this.resolveAvatar(item.avatarUrl),
							bio: this.formatTime(item.followTime),
							isFollowing: item.isFollowing || false
						}
					);

					if (tab === 0) {
						this.followingPageNum = pageNum;
						this.followingTotal = total;
						this.followingHasMore = (pageNum * this.pageSize) < total;
						this.followingList = isRefresh ? mapped : this.followingList.concat(mapped);
					} else {
						this.fansPageNum = pageNum;
						this.fansTotal = total;
						this.fansHasMore = (pageNum * this.pageSize) < total;
						this.fansList = isRefresh ? mapped : this.fansList.concat(mapped);
					}
				}
			} catch (error) {
				console.error('加载列表失败:', error);
				uni.showToast({ title: '加载失败', icon: 'none' });
			} finally {
				if (isRefresh) {
					this.loading = false;
					uni.hideLoading();
				} else {
					this.loadingMore = false;
				}
			}
		},

		async handleFollow(item) {
			try {
				if (item.isFollowing) {
					await this.$request.post('/wechat/userFollow/cancelFollow', {
						followUserId: item.id
					});
					item.isFollowing = false;
					uni.showToast({ title: '已取消关注', icon: 'none' });
				} else {
					await this.$request.post('/wechat/userFollow/clickFollow', {
						followUserId: item.id
					});
					item.isFollowing = true;
					uni.showToast({ title: '已关注', icon: 'none' });
				}
			} catch (e) {
				console.error('关注操作失败:', e);
				uni.showToast({ title: '操作失败', icon: 'none' });
			}
		},

		getBtnText(item) {
			return item.isFollowing ? '已关注' : '关注';
		},

		goToUserHome(item) {
			uni.navigateTo({
				url: `/subpkg-library/pages/visitor-home?userId=${item.id}`
			});
		},

		resolveAvatar(avatar) {
			if (!avatar || avatar === '/static/default-avatar.png') {
				return '/static/default-avatar.png';
			}
			if (/^(http|https|wxfile|data):/.test(avatar)) {
				return avatar;
			}
			return config.aliyunUrl + avatar;
		},

		formatTime(time) {
			if (!time) return '';
			const date = new Date(time);
			if (isNaN(date.getTime())) return '';
			const now = new Date();
			const diff = now - date;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			if (days === 0) return '今天关注';
			if (days === 1) return '昨天关注';
			if (days < 30) return `${days}天前关注`;
			const months = Math.floor(days / 30);
			if (months < 12) return `${months}个月前关注`;
			const years = Math.floor(months / 12);
			return `${years}年前关注`;
		}
	}
};
</script>

<style scoped>
.page {
	background-color: #F8F8F8;
	min-height: 100vh;
}

.tab-header {
	display: flex;
	background-color: #FFFFFF;
	border-bottom: 1rpx solid #EEEEEE;
}

.tab-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30rpx 0;
	position: relative;
}

.tab-item text {
	font-size: 30rpx;
	color: #999999;
}

.tab-item.active text {
	font-size: 32rpx;
	color: #333333;
	font-weight: 600;
}

.tab-underline {
	position: absolute;
	left: 50%;
	bottom: 6rpx;
	width: 44rpx;
	height: 11rpx;
	transform: translateX(-50%);
}

.list-container {
	background-color: #FFFFFF;
}

.list-item {
	display: flex;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid #EEEEEE;
}

.avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	margin-right: 24rpx;
}

.info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.name {
	font-size: 32rpx;
	font-weight: 600;
	color: #333333;
	margin-bottom: 8rpx;
}

.bio {
	font-size: 24rpx;
	color: #999999;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.action-btn {
	padding: 10rpx 30rpx;
	border-radius: 30rpx;
	background-color: #F37738;
	color: #FFFFFF;
	font-size: 26rpx;
	min-width: 120rpx;
	text-align: center;
}

.action-btn.following {
	background-color: #EEEEEE;
	color: #999999;
}

.empty-state {
	padding: 30rpx;
	text-align: center;
	color: #999999;
	font-size: 28rpx;
}

.load-tip {
	padding: 10rpx 0 40rpx;
	text-align: center;
	font-size: 24rpx;
	color: #999999;
}
.load-more-text {
	padding: 30rpx;
	text-align: center;
	font-size: 24rpx;
	color: #999999;
}
</style>
