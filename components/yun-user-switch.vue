<template>
	<view class="switch-container">
		<!-- 遮罩层 -->
		<view class="mask" @click="closeModal"></view>
		<!-- 弹窗内容 -->
		<view class="modal-content">
			<!-- 顶部标题 -->
			<view class="modal-header">
				<text class="modal-title">点击切换账号</text>
			</view>
			<!-- 账号列表 -->
			<view class="account-list">
				<!-- 团队账号：当有团队信息时显示 -->
			<view v-if="teamInfo" class="account-item"
					:class="{ 'active': selectedAccount === 'team', 'expired': teamInfo.status === 1 }" @click="selectAccount('team')">
					<view class="account-avatar">
						<image :src="resolveAvatar(teamInfo.avatarUrl || teamInfo.avatar)" class="avatar-image"></image>
					</view>
					<view class="account-info">
						<text class="account-name">{{ teamInfo.nickName || '团队账号' }}</text>
						<text class="account-tag">{{ teamInfo.status === 1 ? '(团长会员到期)' : '(团队)' }}</text>
					</view>
					<view class="checkmark" v-if="selectedAccount === 'team' && teamInfo.status !== 1">
						<image src="/static/common/切换账号选中.png" class="checkmark-text"></image>
					</view>
				</view>
				<!-- 个人账号：总是显示 -->
				<view class="account-item" :class="{ 'active': selectedAccount === 'personal' }"
					@click="selectAccount('personal')">
					<view class="account-avatar">
						<image :src="resolveAvatar(userInfo.avatar)" class="avatar-image"></image>
					</view>
					<view class="account-info">
						<text class="account-name">{{ userInfo.nickName || '未命名' }}</text>
						<text class="account-tag">(我的)</text>
					</view>
					<view class="checkmark" v-if="selectedAccount === 'personal'">
						<image src="/static/common/切换账号选中.png" class="checkmark-text"></image>
					</view>
				</view>
			</view>
			<!-- 底部按钮 -->
			<!-- <view class="modal-footer">
				<view class="cancel-btn" @click="closeModal">取消</view>
				<view class="confirm-btn" @click="confirmSwitch">确定</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import config from '@/config/env.js';
	export default {
		name: "yun-user-switch",
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			userInfo: {
				type: Object,
				required: true
			},
			teamInfo: {
				type: Object,
				default: null
			}
		},
		data() {
			// 从缓存中获取 isTeamMode 的值
			const isTeamMode = uni.getStorageSync('isTeamMode');
			return {
				selectedAccount: isTeamMode ? 'team' : 'personal', // 根据缓存状态设置默认选中的账号
				ossBaseUrl: config.aliyunUrl
			};
		},
		watch: {
			visible(newVal) {
				if (newVal) {
					// 每次打开弹窗时，根据缓存状态设置默认选中
					const isTeamMode = uni.getStorageSync('isTeamMode');
					this.selectedAccount = isTeamMode ? 'team' : 'personal';
				}
			}
		},
		methods: {
			// 关闭弹窗
			closeModal() {
				this.$emit('update:visible', false);
			},
			// 选择账号
			selectAccount(type) {
				// 如果点击的是当前已选中的账号，直接关闭弹窗，不执行切换逻辑
				if (this.selectedAccount === type) {
					this.closeModal();
					return;
				}
				
				if(!this.teamInfo&&this.selectedAccount=='personal'){
					this.closeModal();
					return
				}
				
				// 如果选择团队账号但团队账号状态异常，不允许切换
				if (type === 'team' && this.teamInfo && this.teamInfo.status === 1) {
					// 显示提示
					uni.showToast({
						title: '团长账号会员到期，无法切换到团队模式',
						icon: 'none'
					});
					return;
				}
				
				this.selectedAccount = type;
				// 保存切换状态到缓存
				uni.setStorageSync('isTeamMode', this.selectedAccount === 'team');
				// 当选择团队账号时，保存团长的 id 到缓存
				if (this.selectedAccount === 'team' && this.teamInfo && this.teamInfo.id) {
					uni.setStorageSync('teamOwnerId', this.teamInfo.id);
				}
				// 触发切换事件
				this.$emit('switch', this.selectedAccount);

				// 显示切换成功提示

				setTimeout(() => {
					// 关闭弹窗
					this.closeModal();
				}, 500)
				// uni.showToast({
				// 	title: this.selectedAccount === 'team' ? '已切换到团队模式' : '已切换到个人模式',
				// 	icon: 'none'
				// });
			},
			// 处理头像地址
			resolveAvatar(avatar) {
				if (!avatar || avatar === '/static/default-avatar.png') return '/static/default-avatar.png';
				// 如果是完整路径，直接返回
				if (/^(http|https|wxfile|data):/.test(avatar)) {
					return avatar;
				}
				// 否则拼接 OSS 前缀
				return this.ossBaseUrl + avatar;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.switch-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		width: 100%;
		max-width: 700rpx;
		background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		z-index: 10;
		animation: slideIn 0.3s ease-out;
	}

	.modal-header {
		padding: 40rpx;
		text-align: center;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.modal-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}

	.account-list {
		padding: 20rpx 0;
	}

	.account-item {
		display: flex;
		align-items: center;
		padding:35rpx;
		border-bottom: 1rpx solid #f0f0f0;
		cursor: pointer;
		position: relative;
		transition: all 0.3s ease;
		margin: 20rpx;
		border-radius: 20rpx;
	}

	.account-item.active {
		background-color:rgba(243, 119, 56, 0.2);
		color: #fff;
		border: 1px solid #F37738; 
	}

	.account-avatar {
		width: 95rpx;
		height: 95rpx;
		border-radius: 50%;
		margin-right: 30rpx;
		overflow: hidden;
		background-color: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar-text {
		font-size: 36rpx;
		font-weight: 500;
		color: #fff;
	}

	.account-name {
		flex: 1;
		font-size: 30rpx;
		font-weight: 500;
		color: #000;
	}

	.account-item.active .account-name {
	}

	.account-info {
		flex: 1;
	}

	.account-tag {
		font-size: 30rpx;
		color: #000000;
		font-weight: 600;
		// background-color: #f8f8f8;
		// padding: 4rpx 16rpx;
		border-radius: 20rpx;
	}


		.account-item.expired {
			background-color: #f5f5f5;
			cursor: not-allowed;
		}

		.account-item.expired .account-name {
			color: #999;
		}

		.account-item.expired .account-tag {
			color: #999;
			background-color: #e0e0e0;
		}

	.checkmark {
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.checkmark-text {
		width: 40rpx;
		height: 40rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #fff;
		line-height: 1;
	}

	.modal-footer {
		display: flex;
		border-top: 1rpx solid #f0f0f0;
	}

	.cancel-btn,
	.confirm-btn {
		flex: 1;
		padding: 30rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: 500;
		cursor: pointer;
	}

	.cancel-btn {
		color: #999;
		border-right: 1rpx solid #f0f0f0;
	}

	.confirm-btn {
		color: #4CAF50;
	}

	@keyframes slideIn {
		from {
			transform: scale(0.8);
			opacity: 0;
		}

		to {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>