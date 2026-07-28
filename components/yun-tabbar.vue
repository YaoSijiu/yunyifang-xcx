<template>
	<view class="tabbar-container">
		<view class="tabbar">
			<view
				v-for="(item, index) in list"
				:key="item.text"
				class="tab-item"
				:class="{ 'mid-tab-item': index === 2 }"
				@click="switchTab(item, index)"
			>
				<view v-if="index === 2" class="hump-bg"></view>
				<image
					:src="selected === index ? item.selectedIconPath : item.iconPath"
					class="icon"
					:class="{ 'mid-btn': index === 2 }"
				/>
				<text class="text" :class="{ active: selected === index, 'mid-text': index === 2 }">
					{{ item.text }}
				</text>
			</view>
		</view>

		<view class="safe-area-spacer"></view>

		<view class="popup-mask" v-if="showPopup" @click="showPopup = false">
			<view class="popup-content" @click.stop>
				<view class="handle-bar"></view>
				<view class="menu-list">
					<view
						v-for="item in publishMenus"
						:key="item.title"
						class="menu-item"
						@click="handlePublishMenu(item)"
					>
						<image :src="item.icon" class="menu-icon"></image>
						<view class="menu-text">
							<text class="menu-title">{{ item.title }}</text>
							<text class="menu-desc">{{ item.desc }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'yun-tabbar',
	props: {
		selected: {
			type: Number,
			default: 0
		},
		workNumber: {
			type: Number,
			default: 0
		},
		collectionNumber: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			showPopup: false,
			publishMenus: [
				{
					title: '发布任务',
					desc: '找设计师，发定制需求',
					icon: '/static/publish/发布任务.png',
					url: '/subpkg-task/pages/index'
				},
				{
					title: '发布橱窗',
					desc: '上架橱窗赚取佣金',
					icon: '/static/publish/上架橱窗.png',
					url: '/subpkg-showcase/pages/index'
				},
				{
					title: '新建作品',
					desc: '你可以在作品中添加图片/视频/简介',
					icon: '/static/publish/新建作品.png',
					url: '/subpkg-library/pages/works/create'
				},
				{
					title: '新建作品集',
					desc: '作品集用于打包分享全部或多个作品，你可以在\n作品集中将作品分组',
					icon: '/static/publish/新建作品集.png',
					url: '/subpkg-library/pages/collection/create'
				}
			],
			list: [
				{
					pagePath: '/pages/library/home',
					text: '首页',
					iconPath: '/static/tabbar/home_unselected.png',
					selectedIconPath: '/static/tabbar/home_selected.png'
				},
				{
					pagePath: '/pages/square/index',
					text: '广场',
					iconPath: '/static/tabbar/square_unselected.png',
					selectedIconPath: '/static/tabbar/square_selected.png'
				},
				{
					pagePath: '/pages/publish/index',
					text: '发布',
					iconPath: '/static/tabbar/publish.png',
					selectedIconPath: '/static/tabbar/publish.png'
				},
				{
					pagePath: '/pages/library/index',
					text: '云艺库',
					iconPath: '/static/tabbar/yunyiku_unselected.png',
					selectedIconPath: '/static/tabbar/yunyiku_selected.png'
				},
				{
					pagePath: '/pages/profile/index',
					text: '我的',
					iconPath: '/static/tabbar/my_unselected.png',
					selectedIconPath: '/static/tabbar/my_selected.png'
				}
			]
		}
	},
	methods: {
		switchTab(item, index) {
			if (index === 2) {
				this.showPopup = true;
				return;
			}

			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			const currentRoute = currentPage ? `/${currentPage.route}` : '';

			if (index === 0) {
				if (currentRoute === item.pagePath) {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 200
					});
					return;
				}
				uni.switchTab({
					url: item.pagePath
				});
				return;
			}

			if (index === 3) {
				if (currentRoute === item.pagePath) {
					uni.setStorageSync('lastHomeTab', 0);
					uni.$emit('home-tab-reset');
					return;
				}
				uni.removeStorageSync('tabIndex');
				uni.removeStorageSync('homeTargetTab');
				uni.switchTab({
					url: item.pagePath
				});
				return;
			}

			if (currentRoute === item.pagePath) {
				return;
			}

			uni.switchTab({
				url: item.pagePath
			});
		},
		async navigateTo(url) {
			const path = url.split('?')[0];
			const isLoggedIn = this.hasLoginToken();
			const routeHandlerMap = {
				'/subpkg-library/pages/works/create': async () => {
					try {
						const isTeamMode = uni.getStorageSync('isTeamMode') || false;
						if (isTeamMode) {
							await this.$request.get('/wechat/basic/hasTeamRight');
							await this.$request.get('/wechat/basic/hasOperateRight', {
								role: 'canManageWorks'
							});
						}
						await this.$request.get('/wechat/basic/hasRight', {
							operateType: 0,
							type: 0
						});
						return true;
					} catch (e) {
						return false;
					}
				},
				'/subpkg-library/pages/collection/create': async () => {
					try {
						const isTeamMode = uni.getStorageSync('isTeamMode') || false;
						if (isTeamMode) {
							await this.$request.get('/wechat/basic/hasTeamRight');
							await this.$request.get('/wechat/basic/hasOperateRight', {
								role: 'canManageCollections'
							});
						}
						await this.$request.get('/wechat/basic/hasRight', {
							operateType: 0,
							type: 1
						});
						return true;
					} catch (e) {
						return false;
					}
				}
			};

			if (isLoggedIn && routeHandlerMap[path]) {
				const canNavigate = await routeHandlerMap[path]();
				if (!canNavigate) {
					this.showPopup = false;
					return;
				}
			}

			let finalUrl = url;
			const isTeamMode = uni.getStorageSync('isTeamMode') || false;
			const storedUserInfo = uni.getStorageSync('userInfo') || {};
			const isTeam = storedUserInfo.vipLevel == 'team' || false;
			if (isLoggedIn && (isTeamMode || isTeam) && (path === '/subpkg-library/pages/works/create' || path === '/subpkg-library/pages/collection/create')) {
				finalUrl += url.includes('?') ? '&workType=1' : '?workType=1';
			}

			uni.navigateTo({
				url: finalUrl
			});
			this.showPopup = false;
		},
		handlePublishMenu(item) {
			if (item.url) {
				this.navigateTo(item.url);
				return;
			}
			this.handleOther(item.title);
		},
		hasLoginToken() {
			return !!uni.getStorageSync('token');
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
		handleOther(name) {
			this.showPopup = false;
			uni.showToast({
				title: `${name} 功能开发中`,
				icon: 'none'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.tabbar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 116rpx;
	padding-bottom: env(safe-area-inset-bottom);
	background: #ffffff;
	display: flex;
	align-items: flex-end;
	z-index: 999;
	box-shadow: 0 -1rpx 0 #dddddd;
}

.tab-item {
	flex: 1;
	height: 98rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	padding-top: 10rpx;
}

.mid-tab-item {
	overflow: visible;
}

.hump-bg {
	position: absolute;
	top: -18rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 96rpx;
	height: 96rpx;
	border-radius: 50%;
	background: #ffffff;
	z-index: 1;
}

.icon {
	width: 50rpx;
	height: 50rpx;
	margin-bottom: 4rpx;
	position: relative;
	z-index: 2;
}

.mid-btn {
	position: absolute;
	top: -10rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 72rpx;
	height: 72rpx;
	margin-bottom: 0;
}

.text {
	font-size: 20rpx;
	line-height: 28rpx;
	color: #999999;
	position: relative;
	z-index: 2;
	font-weight: 400;
}

.text.active {
	color: #000000;
	font-weight: 400;
}

.mid-text {
	position: absolute;
	bottom: 6rpx;
}

.safe-area-spacer {
	height: 116rpx;
	padding-bottom: env(safe-area-inset-bottom);
}

.popup-mask {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.42);
	z-index: 1000;
	display: flex;
	align-items: flex-end;
}

.popup-content {
	width: calc(100% - 46rpx);
	margin: 0 23rpx 22rpx;
	background: #ffffff;
	border-radius: 30rpx;
	padding: 14rpx 34rpx 31rpx;
	box-sizing: border-box;
	animation: slideUp 0.3s ease-out;
}

.handle-bar {
	width: 124rpx;
	height: 14rpx;
	margin: 0 auto 47rpx;
	border-radius: 8rpx;
	background: #d8d8d8;
}

.menu-list {
	display: flex;
	flex-direction: column;
	gap: 34rpx;
}

.menu-item {
	display: flex;
	align-items: flex-start;
	min-height: 88rpx;
}

.menu-icon {
	width: 60rpx;
	height: 60rpx;
	margin-top: 8rpx;
	margin-right: 21rpx;
	flex-shrink: 0;
}

.menu-text {
	display: flex;
	flex-direction: column;
	flex: 1;
	min-width: 0;
}

.menu-title {
	font-size: 32rpx;
	line-height: 45rpx;
	font-weight: 400;
	color: #000000;
	margin-bottom: 7rpx;
}

.menu-desc {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #979797;
	opacity: 0.9;
	white-space: pre-line;
}

@keyframes slideUp {
	from {
		transform: translateY(100%);
	}

	to {
		transform: translateY(0);
	}
}
</style>
