<template>
	<view class="page">
		<TitleBar title="我的" :show-back="false" />
		<view class="user-info">
			<image class="user-avatar" :src="resolveAvatar(isTeamMode && teamInfo ? teamInfo.avatar : userInfo.avatar)"
				@click="goToEdit" />
			<view class="user-details">
				<text class="username"
					@click="goToEdit">{{ isTeamMode && teamInfo ? teamInfo.nickName : userInfo.nickName }}
					<text class="user-team">{{ isTeamMode||userInfo.vipLevel== 'team' ? '(团队版)' : '(个人版)' }}</text>
				</text>
				<view class="member-badge"
					v-if="userInfo.vipLevel !== 'none'">
					<image src="/static/profile/会员.png" class="member-image" @click="gotoMember"></image>
				</view>
				<view class="member-badge" v-else>
					<image src="/static/profile/非会员.png" class="member-image" @click="gotoMember"></image>
				</view>
			</view>
			<!-- 切换账号按钮 -->
			<view v-if="loggedIn" class="switch-user-btn" @click="openUserSwitch">
				<image class="switch-user-icon" src="/static/profile/切换账号.png"></image>
				<text class="switch-user-text">切换账号</text>
			</view>
			<!-- <image class="arrow-icon" src="/static/profile/right.png" @click="goToEdit" /> -->
		</view>
		<view class="profile-section">

			<view class="stats-row">
				<view class="stat-item" @click="gotoTabIndex(1)">
					<text class="stat-number">{{ userInfo.worksNum || 0 }}</text>
					<text class="stat-label">案例</text>
				</view>
				<!-- <view class="stat-divider"></view> -->
				<view class="stat-item" @click="goToFollowList('following')">
					<text class="stat-number">{{ userInfo.followCount || 0 }}</text>
					<text class="stat-label">关注</text>
				</view>
				<!-- <view class="stat-divider"></view> -->
				<view class="stat-item" @click="goToFollowList('followers')">
					<text class="stat-number">{{ userInfo.fansCount || 0 }}</text>
					<text class="stat-label">粉丝</text>
				</view>
			</view>
		</view>
		<view class="profile-section">
			<view class="storage-section" @click="goToStorageManagement">
				<view class="storage-header" :class="{'storage-warning': isStorageWarning}">
					<text class="storage-title">云存储</text>
					<text class="storage-used">{{ formatStorage(userInfo.cloudUsedMb) }}/{{
				formatStorage(userInfo.cloudTotalMb) }}<text v-if="isStorageWarning" class="storage-alert">空间不够</text></text>
					<text class="storage-percentage"
						:class="{'storage-warning': isStorageWarning}">{{ storagePercentage }}%</text>
				</view>
				<view class="progress-section" :class="{'storage-warning': isStorageWarning}">
					<view class="progress-bg">
						<view class="progress-fill" :style="{ width: storagePercentage + '%' }"
							:class="{'progress-fill-warning': isStorageWarning}"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="profile-section">
			<view class="menu-section">
				<view class="menu-grid">
					<view class="menu-item" v-for="(item, index) in menuItems" :key="index"
						@click="handleMenuClick(item)">
						<image v-if="item.icon" class="menu-icon" :src="item.icon" />
						<view v-else class="menu-icon menu-css-icon" :class="item.iconClass"></view>
						<text class="menu-text">{{ item.text }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="profile-section">
			<view class="menu-section">
				<view class="menu-grid">
					<view class="menu-item" v-for="(item, index) in menuItemssub" :key="index"
						@click="handleMenuClick(item)">
						<image v-if="item.icon" class="menu-icon" :src="item.icon" />
						<view v-else class="menu-icon menu-css-icon" :class="item.iconClass"></view>
						<text class="menu-text">{{ item.text }}</text>
					</view>
				</view>
			</view>
		</view>
		<yun-tabbar :selected="4"></yun-tabbar>
		<yun-storage-warning />
		<!-- 用户切换弹窗 -->
		<yun-user-switch v-show="showUserSwitch" :visible="showUserSwitch" :user-info="userInfo" :team-info="teamInfo"
			@update:visible="showUserSwitch = $event" @switch="handleUserSwitch" />
	</view>

</template>

<script>
	import config from '@/config/env.js';
	import roleCode from '@/utils/permissionCode.js'
	import TitleBar from '@/components/title.vue'
	import YunUserSwitch from '@/components/yun-user-switch.vue'
	const createDefaultProfileUserInfo = () => ({
		avatar: '/static/default-avatar.png',
		nickName: '未登录',
		cloudUsedMb: 0,
		cloudTotalMb: 0,
		worksNum: 0,
		collectionsNum: 0,
		visitorNum: 0,
		followCount: 0,
		fansCount: 0,
		vipLevel: 'none',
		id: 0
	});
	export default {
		components: {
			TitleBar,
			YunUserSwitch
		},
		data() {
			return {
				userInfo: createDefaultProfileUserInfo(),
				teamInfo: null,
				ossBaseUrl: config.aliyunUrl,
				showUserSwitch: false,
				isTeamMode: false,
				loggedIn: false,
				menuItems: [
					{
						icon: '/static/profile/外包.svg',
						text: '我的外包',
						url: '/subpkg-profile/pages/outsourcing/index'
					},
					{
						icon: '/static/profile/订单.svg',
						text: '我的订单',
						url: '/subpkg-task/pages/taskOrder/index'
					},
					{
						icon: '/static/profile/钱包.svg',
						text: '提现中心',
						url: '/subpkg-profile/pages/withdrawalcenter/index'
					},
					{
						icon: '/static/profile/橱窗.png',
						text: '我的橱窗',
						url: '/subpkg-showcase/pages/my/index'
					},
					{
						icon: '/static/profile/团队.png',
						text: '团队',
						url: '/subpkg-profile/pages/team/index'
					},
					{
						icon: '/static/profile/会员中心.png',
						text: '会员中心',
						url: '/subpkg-profile/pages/member/index'
					},
					{
						icon: '/static/profile/收藏.svg',
						text: '收藏',
						url: '/subpkg-showcase/pages/favorite/index'
					},
					{
						icon: '/static/profile/设置.png',
						text: '设置',
						url: '/subpkg-profile/pages/settings/index'
					},
				],
				menuItemssub: [
					{
						icon: '/static/profile/标签.png',
						text: '标签',
						url: '/subpkg-library/pages/tags/edit'
					},
					{
						icon: '/static/profile/访客.png',
						text: '访客',
						url: '/subpkg-profile/pages/visitor/index'
					},
					{
						icon: '/static/profile/问题反馈.png',
						text: '问题反馈',
						url: '/subpkg-profile/pages/feedback/index'
					},
					{
						icon: '/static/profile/问题反馈.png',
						text: '协议与规则',
						url: '/subpkg-profile/pages/agreement/index'
					},
				],
			};
		},
		computed: {
			storagePercentage() {
				if (!this.userInfo.cloudTotalMb) return 0;
				const percentage = (this.userInfo.cloudUsedMb / this.userInfo.cloudTotalMb) * 100;
				return Math.min(percentage, 100).toFixed(1);
			},
			isStorageWarning() {
				if (!this.userInfo.cloudTotalMb) return false;

				const percentage = (this.userInfo.cloudUsedMb / this.userInfo.cloudTotalMb) * 100;

				return percentage >= 90;
			},
			
		},
		onShow() {
			// 隐藏原生 TabBar，使用自定义的
			uni.hideTabBar({
				animation: false
			});
			this.loggedIn = this.hasLoginToken();
			if (!this.loggedIn) {
				this.resetGuestState();
				return;
			}
			// 从缓存中读取团队模式状态
			this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
			this.fetchUserInfo();
		},
		methods: {
			hasLoginToken() {
				return !!uni.getStorageSync('token');
			},
			resetGuestState() {
				this.loggedIn = false;
				this.userInfo = createDefaultProfileUserInfo();
				this.teamInfo = null;
				this.showUserSwitch = false;
				this.isTeamMode = false;
			},
			promptLogin(redirectUrl = '') {
				if (redirectUrl) {
					uni.setStorageSync('login_redirect', redirectUrl);
				}
				uni.showModal({
					title: '提示',
					content: '登录后可使用该功能',
					confirmText: '去登录',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/subpkg-others/pages/login/index'
							});
						}
					}
				});
			},
			ensureLoggedIn(redirectUrl = '') {
				if (this.loggedIn || this.hasLoginToken()) {
					this.loggedIn = true;
					return true;
				}
				this.promptLogin(redirectUrl);
				return false;
			},
			gotoTabIndex(index) {
				uni.setStorageSync('homeTargetTab', index)
				uni.switchTab({
					url: `/pages/library/index`
				})
			},
			gotoVistor() {
				if (!this.ensureLoggedIn('/subpkg-profile/pages/visitor/index')) {
					return;
				}
				if(this.isTeamMode){
					return;
				}
				uni.navigateTo({
					url: '/subpkg-profile/pages/visitor/index'
				})
			},
			async fetchTeamInfo() {
				if (!this.loggedIn) {
					this.teamInfo = null;
					return;
				}
				try {
					const res = await this.$request.get(`/wechat/team/getSwitchAccount/${this.userInfo.id}`);
					if (res.code === 200 && res.data) {
						// 接口只返回团长信息，直接使用
						this.teamInfo = {
							id: res.data.id,
							nickName: res.data.nickName,
							avatar: res.data.avatarUrl || res.data.avatar,
							role: 'owner',
							status: res.data.status || 0 // 0 正常 1 异常
						};
						// 更新 teamOwnerId 到存储，供团队模式下使用
						uni.setStorageSync('teamInfo',this.teamInfo)
						uni.setStorageSync('teamOwnerId', res.data.id);
					} else {
						this.teamInfo = null;
					}
				} catch (error) {
					console.error('获取团队信息失败:', error);
					this.teamInfo = null;
				}
		},
			resolveAvatar(avatar) {
				if (!avatar || avatar === '/static/default-avatar.png') return '/static/default-avatar.png';
				// 如果是完整路径，直接返回
				if (/^(http|https|wxfile|data):/.test(avatar)) {
					return avatar;
				}
				// 否则拼接 OSS 前缀
				return this.ossBaseUrl + avatar;
			},
			async fetchUserInfo() {
				if (!this.loggedIn) {
					this.userInfo = createDefaultProfileUserInfo();
					return;
				}
				let teamOwnerId = uni.getStorageSync('teamOwnerId');
				const storedUserInfo = uni.getStorageSync('userInfo') || {};
				const isTeam=storedUserInfo.vipLevel=='team'||false
				// 构建请求URL，团队模式下传递团长的id
				// 如果 teamInfo 存在，使用 teamInfo 中的 id 作为团长 ID
				if (this.teamInfo) {
					teamOwnerId = this.teamInfo.id;
					uni.setStorageSync('teamOwnerId', teamOwnerId);
				}
				let url = '/wechat/user/getUserInfo';
				if (this.isTeamMode && teamOwnerId) {
					url += `?userId=${teamOwnerId}`;
				}
				try {
					const userRes = await this.$request.get(url);
					let teamsPaceNumInfo = {};
					
					// 团队模式和团长模式下获取团队作品数
					if ((this.isTeamMode && teamOwnerId) || isTeam) {
						const targetId = this.isTeamMode ? teamOwnerId : (userRes.data.id || this.userInfo.id);
						const paceNumRes = await this.$request.get(`/wechat/user/getTeamsPaceNumInfo/${targetId}`);
						if (paceNumRes.code == 200) {
							teamsPaceNumInfo = paceNumRes.data;
						}
					}
					
					if (this.isTeamMode && teamOwnerId) {
						// 团队模式下只更新云存储相关字段
						const personal = uni.getStorageSync('userInfo');
						this.userInfo = {
							...this.userInfo,
							...userRes.data,
							cloudUsedMb: userRes.data.cloudUsedMb || this.userInfo.cloudUsedMb,
							cloudTotalMb: userRes.data.cloudTotalMb || this.userInfo.cloudTotalMb,
							vipLevel: userRes.data.vipLevel || 'none',
							avatar: personal.avatarUrl,
							nickName: personal.nickName,
							id: personal.id,
							...teamsPaceNumInfo
						};
						
					} else if(isTeam){
						// 团长模式
						this.userInfo = {
							...this.userInfo,
							...userRes.data,
							avatar: userRes.data.avatarUrl || this.userInfo.avatar,
							nickName: userRes.data.nickName || '用户',
							vipLevel: userRes.data.vipLevel || 'none',
							...teamsPaceNumInfo
						};
					}else{
						// 非团队模式下更新所有字段
						this.userInfo = {
							...this.userInfo,
							...userRes.data,
							avatar: userRes.data.avatarUrl || this.userInfo.avatar,
							nickName: userRes.data.nickName || '用户',
							vipLevel: userRes.data.vipLevel || 'none'
						};
					}
					// 获取团队信息
					this.fetchTeamInfo();
				} catch (error) {
					console.error('获取用户信息失败:', error);
				}
			},
			handleMenuClick(item) {
				if (!item.url) {
					uni.showToast({
						title: `${item.text}功能开发中`,
						icon: 'none'
					});
					return;
				}
				if (!this.ensureLoggedIn(item.url)) {
					return;
				}
				uni.navigateTo({
					url: item.url
				});
			},
			gotoMember(){
				if (!this.ensureLoggedIn('/subpkg-profile/pages/member/index')) {
					return;
				}
				uni.navigateTo({
					url:'/subpkg-profile/pages/member/index'
				});
			},
			goToEdit() {
				if (!this.ensureLoggedIn('/pages/profile/index')) {
					return;
				}
				if (this.isTeamMode) {
					uni.showToast({
						title: '团队模式下暂不支持编辑头像和昵称',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '/subpkg-profile/pages/edit'
				});
			},
			goToStorageManagement() {
				if (!this.ensureLoggedIn('/subpkg-profile/pages/storage-management')) {
					return;
				}
				if (this.isTeamMode) {
					return
				}
				uni.navigateTo({
					url: '/subpkg-profile/pages/storage-management'
				});
			},
			goToFollowList(tab) {
				if (!this.ensureLoggedIn('/subpkg-profile/pages/follow-list')) {
					return;
				}
				uni.navigateTo({
					url: `/subpkg-profile/pages/follow-list?tab=${tab}`
				});
			},
			formatStorage(mb) {
			  if (!mb && mb !== 0) return '0KB';
			  if (mb < 1) {
			    const kb = mb * 1024;
			    return kb.toFixed(0) + 'KB';
			  }
			  if (mb < 1024) {
			    return mb.toFixed(2) + 'MB';
			  } else {
			    return (mb / 1024).toFixed(2) + 'GB';
			  }
			},
			openUserSwitch() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				this.showUserSwitch = true;
			},
			handleUserSwitch(accountType) {
				// 处理用户切换逻辑
				console.log('切换到账号类型:', accountType);
				// 更新团队模式状态
				this.isTeamMode = accountType === 'team';
				uni.setStorageSync('accountModeChanged', true);
				// 可以在这里添加切换后的业务逻辑
				// 例如重新获取用户信息等
				this.fetchUserInfo();
			}
		},
	};
</script>

<style scoped>
	.page {
		background-color: #F7F7F7;
		min-height: 100vh;

	}

	.profile-section {
		padding: 0 25rpx;
	}

	.user-info {
		background-color: rgba(255, 255, 255, 1);
		/* border-radius: 30rpx ; */
		padding: 40rpx 30rpx 30rpx 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* margin-bottom: 50rpx; */
	}

	.user-avatar {
		width: 138rpx;
		height: 138rpx;
		border-radius: 50%;
		border: 4rpx solid rgba(255, 255, 255, 1);
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	}

	.user-details {
		display: flex;
		flex-direction: column;
		margin-left: 40rpx;
		flex: 1;
	}

	.username {
		font-size: 36rpx;
		font-weight: 600;
		color: rgba(0, 0, 0, 1);
		margin-bottom: 12rpx;
		margin-right: 10rpx;
		word-break: break-all;
	}

	.user-team {
		font-weight: normal;
		font-size: 32rpx;
		color: #3D3D3D;
		margin-left: 8rpx;
	}

	.member-badge {
		/* background-color: rgba(243, 119, 56, 1); */
		border-radius: 20rpx;
		align-self: flex-start;
		width: fit-content;
	}

	.member-image {
		width: 48rpx;
		height: 48rpx;
	}

	.member-text {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
		font-weight: 500;
	}

	.arrow-icon {
		width: 48rpx;
		height: 48rpx;
		opacity: 0.6;
	}

	.switch-user-btn {
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		background-color: #F37738;
		border-radius: 30rpx;
		margin-right: 20rpx;
		transition: all 0.3s ease;
	}

	.switch-user-btn:hover {
		background-color: #F37738;
	}

	.switch-user-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.switch-user-text {
		font-size: 24rpx;
		color: #ffffff;
		font-weight: 500;
	}

	.stats-row {
		background-color: #3D3D3D;
		border-radius: 30rpx;
		padding: 40rpx 30rpx 40rpx 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
		display: flex;
		justify-content: space-around;
		align-items: center;
		/* padding: 10rpx 0; */
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.stat-number {
		font-size: 40rpx;
		font-weight: 500;
		color: #fff;
		margin-bottom: 12rpx;
		font-family: PingFang SC;
	}

	.stat-label {
		font-size: 26rpx;
		color: #BEBEBE;
	}

	.stat-divider {
		width: 2rpx;
		height: 50rpx;
		background-color: #f0f0f0;
		transform: scaleX(0.5);
	}

	.storage-section {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 24rpx;
		padding: 40rpx 32rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
	}

	.storage-header {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.storage-title {
		font-size: 34rpx;
		font-weight: 600;
		color: #333333;
		margin-right: 20rpx;
	}

	.storage-used {
		font-size: 24rpx;
		color: #999999;
		margin-right: 20rpx;
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
	}

	.storage-percentage {
		font-size: 24rpx;
		font-weight: 500;
		color: #999999;
		margin-left: auto;
	}

	.storage-percentage.storage-warning {
		color: #ff0000;
	}

	.storage-warning .storage-used {
		color: #ff0000;
	}

	.storage-warning .storage-percentage {
		color: #ff0000;
	}

	.storage-warning .storage-title {}

	.storage-alert {
		font-size: 24rpx;
		color: #ff0000;
		margin-left: 10rpx;
		background: #FFF0EB;
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
	}

	.progress-section {
		display: flex;
		justify-content: center;
		padding: 0 4rpx;
	}

	.progress-bg {
		width: 100%;
		height: 20rpx;
		background-color: #565656;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: inset 0 2rpx 6rpx rgba(0, 0, 0, 0.06);
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #FFAB73 0%, #F37738 100%);
		border-radius: 12rpx;
		box-shadow: 2rpx 0 8rpx rgba(243, 119, 56, 0.3);
		transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.progress-fill-warning {
		background: linear-gradient(90deg, #FF5252 0%, #ff0000 100%);
		box-shadow: 2rpx 0 8rpx rgba(255, 82, 82, 0.3);
	}

	.progress-fill::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg,
				rgba(255, 255, 255, 0.2) 25%,
				transparent 25%,
				transparent 50%,
				rgba(255, 255, 255, 0.2) 50%,
				rgba(255, 255, 255, 0.2) 75%,
				transparent 75%,
				transparent);
		background-size: 20rpx 20rpx;
		opacity: 0.3;
	}

	.menu-section {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 16rpx;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
	}

	.menu-grid {
		display: flex;
		flex-wrap: wrap;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		margin: 30rpx 0;
	}

	.menu-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 20rpx;
	}

	.menu-css-icon {
		position: relative;
		box-sizing: border-box;
	}

	.menu-css-icon.outsource {
		width: 44rpx;
		height: 45rpx;
		border: 5rpx solid #000000;
		border-radius: 4rpx;
		background: linear-gradient(90deg, transparent 0 55%, #FFB894 55% 100%);
	}

	.menu-css-icon.outsource::before {
		content: '';
		position: absolute;
		left: 8rpx;
		top: 13rpx;
		width: 8rpx;
		height: 3rpx;
		background: #000000;
		box-shadow: 0 13rpx 0 #000000;
	}

	.menu-css-icon.outsource::after {
		content: '';
		position: absolute;
		right: -3rpx;
		top: 10rpx;
		width: 23rpx;
		height: 6rpx;
		background: #000000;
		border-radius: 3rpx;
		transform: rotate(38deg);
	}

	.menu-css-icon.order {
		width: 40rpx;
		height: 45rpx;
		border: 5rpx solid #000000;
		border-radius: 4rpx;
		background: linear-gradient(90deg, transparent 0 58%, #FFB894 58% 100%);
	}

	.menu-css-icon.order::before {
		content: '';
		position: absolute;
		left: 7rpx;
		top: -6rpx;
		width: 20rpx;
		height: 7rpx;
		background: #000000;
		border-radius: 4rpx;
	}

	.menu-css-icon.order::after {
		content: '';
		position: absolute;
		left: 7rpx;
		top: 13rpx;
		width: 20rpx;
		height: 3rpx;
		background: #000000;
		box-shadow: 0 12rpx 0 #000000;
	}

	.menu-css-icon.favorite {
		width: 48rpx;
		height: 44rpx;
		margin-top: 2rpx;
	}

	.menu-css-icon.favorite::before,
	.menu-css-icon.favorite::after {
		content: '';
		position: absolute;
		top: 3rpx;
		width: 28rpx;
		height: 38rpx;
		border: 5rpx solid #000000;
		background: #FFB894;
		border-radius: 28rpx 28rpx 0 0;
		box-sizing: border-box;
	}

	.menu-css-icon.favorite::before {
		left: 2rpx;
		transform: rotate(-45deg);
		transform-origin: 100% 100%;
	}

	.menu-css-icon.favorite::after {
		right: 2rpx;
		transform: rotate(45deg);
		transform-origin: 0 100%;
	}

	.menu-text {
		font-size: 24rpx;
		color: rgba(0, 0, 0, 1);
		text-align: center;
	}
</style>
