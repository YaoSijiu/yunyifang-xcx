<template>
	<view class="page">
		<!-- 顶部 tab 切换 -->
		<view class="tab-header">
			<view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">
				<text>我的关注</text>
				<view v-if="currentTab === 0" class="tab-underline"></view>
			</view>
			<view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">
				<text>我的粉丝</text>
				<view v-if="currentTab === 1" class="tab-underline"></view>
			</view>
		</view>

		<!-- 列表内容 -->
		<view class="list-container">
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
			currentTab: 0,          // 0=关注列表, 1=粉丝列表
			followingList: [],       // 关注列表数据
			fansList: [],             // 粉丝列表数据
			followingLoaded: false,   // 关注列表是否已加载
			fansLoaded: false,        // 粉丝列表是否已加载
			loading: false
		};
	},
	computed: {
		currentList() {
			return this.currentTab === 0 ? this.followingList : this.fansList;
		}
	},
	onLoad(options) {
		this.currentTab = options.tab === 'followers' ? 1 : 0;
		this.loadCurrentList();
	},
	onShow() {
		// 从其他页面返回时，重新加载当前 tab 数据
		this.refreshCurrentList();
	},
	methods: {
		switchTab(index) {
			if (this.currentTab === index) return;
			this.currentTab = index;
			if (this.currentTab === 0) {
				this.followingLoaded = false;
				this.loadFollowingList();
			} else {
				this.fansLoaded = false;
				this.loadFansList();
			}
		},

		refreshCurrentList() {
			if (this.currentTab === 0) {
				this.followingLoaded = false;
			} else {
				this.fansLoaded = false;
			}
			this.loadCurrentList();
		},

		loadCurrentList() {
			if (this.currentTab === 0 && !this.followingLoaded) {
				this.loadFollowingList();
			} else if (this.currentTab === 1 && !this.fansLoaded) {
				this.loadFansList();
			}
		},

		async loadFollowingList() {
			this.loading = true;
			uni.showLoading({ title: '加载中...' });
			try {
				const res = await this.$request.get('/wechat/userFollow/follows/page', {
					pageNum: 1,
					pageSize: 50
				});
				if (res.code === 200) {
					const rows = res.rows || res.data || [];
					this.followingList = rows.map(item => ({
						id: item.userId,
						name: item.nickName || '用户',
						avatar: this.resolveAvatar(item.avatarUrl),
						bio: this.formatTime(item.followTime),
						isFollowing: item.isFollowing !== false
					}));
				}
				this.followingLoaded = true;
			} catch (error) {
				console.error('加载关注列表失败:', error);
				uni.showToast({ title: '加载失败', icon: 'none' });
			} finally {
				this.loading = false;
				uni.hideLoading();
			}
		},

		async loadFansList() {
			this.loading = true;
			uni.showLoading({ title: '加载中...' });
			try {
				const res = await this.$request.get('/wechat/userFollow/fans/page', {
					pageNum: 1,
					pageSize: 50
				});
				if (res.code === 200) {
					const rows = res.rows || res.data || [];
					this.fansList = rows.map(item => ({
						id: item.userId,
						name: item.nickName || '用户',
						avatar: this.resolveAvatar(item.avatarUrl),
						bio: this.formatTime(item.followTime),
						isFollowing: item.isFollowing || false
					}));
				}
				this.fansLoaded = true;
			} catch (error) {
				console.error('加载粉丝列表失败:', error);
				uni.showToast({ title: '加载失败', icon: 'none' });
			} finally {
				this.loading = false;
				uni.hideLoading();
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
	width: 60rpx;
	height: 6rpx;
	background-color: #F37738;
	border-radius: 3rpx;
	margin-top: 12rpx;
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
	padding: 100rpx;
	text-align: center;
	color: #999999;
	font-size: 28rpx;
}
</style>
