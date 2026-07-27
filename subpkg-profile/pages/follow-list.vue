<template>
	<view class="page">
		<view class="list-container">
			<view class="list-item" v-for="item in list" :key="item.id" @click="goToUserHome(item)">
				<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{ item.name }}</text>
					<text class="bio">{{ item.bio }}</text>
				</view>
				<view class="action-btn" :class="{ 'following': item.isFollowing }" @click.stop="handleFollow(item)">
					<text>{{ getBtnText(item) }}</text>
				</view>
			</view>
		</view>
		<view v-if="list.length === 0" class="empty-state">
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: 'following', // following | followers
			list: []
		};
	},
	onLoad(options) {
		this.type = options.type || 'following';
		uni.setNavigationBarTitle({
			title: this.type === 'following' ? '我的关注' : '我的粉丝'
		});
		this.loadData();
	},
	methods: {
		loadData() {
			// Mock data
			const mockAvatar =
				'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/2c99cd2af8464fd3aef4d91e69e2012c_mergeImage.png';

			if (this.type === 'following') {
				this.list = Array.from({
					length: 10
				}, (_, i) => ({
					id: i + 1,
					name: `关注用户${i + 1}`,
					bio: '这是一段个性签名...',
					avatar: mockAvatar,
					isFollowing: true
				}));
			} else {
				this.list = Array.from({
					length: 15
				}, (_, i) => ({
					id: i + 100,
					name: `粉丝用户${i + 1}`,
					bio: '感谢关注...',
					avatar: mockAvatar,
					isFollowing: i % 3 === 0 // 模拟部分已回关
				}));
			}
		},
		getBtnText(item) {
			if (this.type === 'following') {
				return '已关注';
			} else {
				return item.isFollowing ? '互关' : '关注'; // 粉丝列表显示状态
			}
		},
		handleFollow(item) {
			if (this.type === 'following') {
				// 取消关注逻辑
				uni.showModal({
					title: '提示',
					content: `确定要取消关注 ${item.name} 吗？`,
					success: (res) => {
						if (res.confirm) {
							this.list = this.list.filter(i => i.id !== item.id);
							uni.showToast({
								title: '已取消关注',
								icon: 'none'
							});
						}
					}
				});
			} else {
				// 粉丝列表：关注/取消关注逻辑
				item.isFollowing = !item.isFollowing;
				uni.showToast({
					title: item.isFollowing ? '已关注' : '已取消关注',
					icon: 'none'
				});
			}
		},
		goToUserHome(item) {
			// 跳转到复用的云艺库页面，开启访客模式
			uni.navigateTo({
				url: `/subpkg-library/pages/visitor-home?userId=${item.id}&name=${item.name}`
			});
		}
	}
};
</script>

<style scoped>
.page {
	background-color: #F8F8F8;
	min-height: 100vh;
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
}
</style>