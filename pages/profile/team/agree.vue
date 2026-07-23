<template>
	<view class="container">
		<view class="card">
			<image v-if="inviterInfo.avatarUrl || inviterInfo.avatar"
				:src="resolveAvatar(inviterInfo.avatarUrl || inviterInfo.avatar)" class="logo"></image>
			<image v-else src="https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/logo.png" class="logo"></image>

			<view class="title" v-if="inviterInfo.nickName">{{ inviterInfo.nickName }} 邀请你加入团队</view>
			<view class="title" v-else>邀请加入团队</view>

			<block v-if="!isLoggedIn">
				<view class="desc">您需要先登录才能加入团队</view>
				<button class="btn btn-primary" @click="goToLogin">立即登录</button>
			</block>

			<block v-else>
				<view class="desc">您收到加入团队的邀请</view>
				<view class="actions">
					<button class="btn btn-primary" @click="agreeToJoin">同意加入</button>
					<button class="btn btn-outline" @click="goHome">返回首页</button>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import env from '@/config/env.js'
export default {
	data() {
		return {
			invitedId: '',
			isLoggedIn: false,
			inviterInfo: {},
			ossUrl: env.aliyunUrl
		}
	},
	onLoad(options) {
		if (options.invitedId) {
			// 普通跳转或 getwxacode 生成的带参二维码
			this.invitedId = options.invitedId;
		} else if (options.scene) {
			// getwxacodeunlimit 生成的无限小程序码
			// scene 需要解码，格式通常是 key=value
			const scene = decodeURIComponent(options.scene);
			const params = this.getQueryParams('?' + scene);
			if (params.invitedId) {
				this.invitedId = params.invitedId;
			} else {
				// 如果直接传的是 id 值 (scene=36)
				this.invitedId = scene;
			}
		} else if (options.q) {
			// 处理扫码进入的情况
			const q = decodeURIComponent(options.q);
			const params = this.getQueryParams(q);
			if (params.invitedId) {
				this.invitedId = params.invitedId;
			}
		}
	},
	onShow() {
		const app = typeof getApp === 'function' ? getApp() : null;
		const launchOptions = app && app.globalData ? app.globalData.launchOptions : null;
		if (launchOptions && launchOptions.path === 'pages/profile/team/agree') {
			const scene = launchOptions.scene;
			if (!this.isInviteEntryScene(scene)) {
				uni.switchTab({
					url: '/pages/library/home'
				});
				return;
			}
		}

		const token = uni.getStorageSync('token');
		this.isLoggedIn = !!token;
		if (this.isLoggedIn) {
			if (this.invitedId && (!this.inviterInfo || !Object.keys(this.inviterInfo).length)) {
				this.getInviterInfo();
			}
		}
	},
	methods: {
		isInviteEntryScene(scene) {
			const value = Number(scene);
			const allowed = new Set([
				1007,
				1008,
				1011,
				1012,
				1013,
				1044,
				1047,
				1048,
				1049,
				1096
			]);
			return allowed.has(value);
		},
		getQueryParams(url) {
			const params = {};
			const parts = url.split('?');
			if (parts.length > 1) {
				const query = parts[1];
				const pairs = query.split('&');
				for (const pair of pairs) {
					const [key, value] = pair.split('=');
					params[key] = value;
				}
			}
			return params;
		},
		resolveAvatar(url) {
			if (!url) return '/static/default-avatar.png';
			if (/^(http|https|wxfile|data):/.test(url)) {
				return url;
			}
			return this.ossUrl + url;
		},
		async getInviterInfo() {
			try {
				const res = await this.$request.get(`/wechat/user/getUserInfo?userId=${this.invitedId}`);
				if (res.code === 200 && res.data) {
					console.log('获取邀请人信息成功', res.data);
					this.inviterInfo = res.data;
				}
			} catch (e) {
				console.error('获取邀请人信息失败', e);
			}
		},
		goToLogin() {
			uni.setStorageSync('login_redirect', `/pages/profile/team/agree?invitedId=${this.invitedId}`);
			uni.navigateTo({
				url: '/pages/login/index'
			});
		},
		async agreeToJoin() {
			if (!this.invitedId) {
				uni.showToast({ title: '参数错误', icon: 'none' });
				return;
			}
			try {
				const res = await this.$request.post(`/wechat/team/addMember?invitedId=${this.invitedId}`);
				if (res.code === 200) {
					uni.setStorageSync('isTeamMode', true);
					uni.setStorageSync('teamOwnerId',this.invitedId)
					uni.showModal({
						title: '成功',
						content: '您已成功加入团队',
						showCancel: false,
						success: () => {
							uni.redirectTo({ url: '/pages/profile/team/index' });
						}
					});
				}
			} catch (e) {
				console.error(e);
				// 如果是 request.js reject 出来的，e 就是 res.data
				if (e && e.msg) {
					uni.showModal({
						title: '提示',
						content: e.msg,
						showCancel: false,
						success: () => {
							// 无论成功失败，都引导去团队页面看一看（如果是已加入的情况）
							uni.redirectTo({ url: '/pages/profile/team/index' });
						}
					});
				}
			}
		},
		goHome() {
			uni.switchTab({
				url: '/pages/library/home'
			});
		}
	}
}
</script>

<style lang="scss">
.container {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
	padding: 0 40rpx;
}

.card {
	background-color: #fff;
	width: 100%;
	border-radius: 20rpx;
	padding: 60rpx 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.logo {
	width: 120rpx;
	height: 120rpx;
	margin-bottom: 30rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.desc {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 60rpx;
	text-align: center;
}

.actions {
	width: 100%;
}

.btn {
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	border-radius: 44rpx;
	font-size: 30rpx;
	margin-bottom: 30rpx;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn-primary {
	background-color: #FF6B00;
	color: #fff;
}

.btn-outline {
	background-color: #fff;
	color: #666;
	border: 2rpx solid #ddd;
}
</style>
