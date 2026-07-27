<template>
	<view class="login-container">
		<!-- Logo区域 -->
		<view class="logo-box">
			<image class="logo-img" src="https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/logo.png" mode="aspectFit"></image>
			<text class="app-name">云艺坊</text>
		</view>

		<!-- 登录按钮区域 -->
		<view class="btn-box">
			<!-- 微信一键登录 -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="wx-btn" @click="handleWechatLogin" :disabled="!isAgreed">
				<view class="wx-icon-css"></view>
				<text>一键登录</text>
			</button>
			<!-- #endif -->

			<!-- #ifndef MP-WEIXIN -->
			<button class="wx-btn" @click="mockLogin" :disabled="!isAgreed">
				<view class="wx-icon-css"></view>
				<text>一键登录</text>
			</button>
			<!-- #endif -->

			<!-- 暂不登录/访客模式 -->
			<view class="visitor-link" @click="goVisitor">暂不登录，先看看</view>
		</view>

		<!-- 底部协议 -->
		<view class="agreement-box">
			<checkbox-group @change="handleCheckboxChange">
				<label class="checkbox-label">
					<checkbox value="agreed" :checked="isAgreed" color="#ff7a22" style="transform:scale(0.7)" />
					<view class="text-group">
						<text>我已阅读并同意</text>
						<text class="link" @click.stop="openAgreement('user')">《用户协议》</text>
						<text>和</text>
						<text class="link" @click.stop="openAgreement('privacy')">《隐私政策》</text>
					</view>
				</label>
			</checkbox-group>
		</view>

		<!-- 授权弹窗 (模拟 ActionSheet) -->
		<view class="auth-popup-mask" v-if="showAuthPopup" @click="closeAuthPopup">
			<view class="auth-popup" @click.stop>
				<view class="auth-header">
					<text class="auth-title">完善用户信息</text>
					<text class="auth-sub">登录后将展示您的头像和昵称</text>
				</view>

				<view class="auth-content">
					<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="auth-avatar" :src="resolveAvatar(authForm.avatarUrl)" mode="aspectFill"></image>
						<!-- <view class="camera-icon">
							<uni-icons type="camera-filled" size="20" color="#fff"></uni-icons>
						</view> -->
					</button>

					<view class="input-group">
						<text class="label">昵称</text>
						<input type="nickname" class="auth-input" placeholder="请输入昵称" v-model="authForm.nickName"
							@blur="onNicknameBlur" @change="onNicknameChange" />
					</view>
				</view>

				<view class="auth-footer">
					<button class="popup-btn cancel" @click="closeAuthPopup">暂不登录</button>
					<button class="popup-btn confirm" :class="{ 'loading': isLoading }"   :disabled="isLoading"  @click="confirmWechatLogin">{{ isLoading ? '登录中...' : '确认登录' }}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config/env.js';

	export default {
		data() {
			return {
				isAgreed: false,
				showAuthPopup: false,
				ossBaseUrl: config.aliyunUrl,
				authForm: {
					avatarUrl: '',
					nickName: ''
				},
				 isLoading: false
			};
		},
		computed: {},
		onShow() {
			// 检查是否有 token，如果有则直接跳转到首页
			const token = uni.getStorageSync('token');
			if (token) {
				this.redirectAfterLogin();
			}
		},
		methods: {
			redirectAfterLogin() {
				const redirect = uni.getStorageSync('login_redirect');
				if (redirect) {
					uni.removeStorageSync('login_redirect');
					// tabBar 页面不能带 query，非 tabBar 页面保留完整参数返回
					const isTab = ['/pages/library/home',
						'/pages/square/index',
						'/pages/publish/index',
						'/pages/library/index',
						'/pages/profile/index'
					].some(
						path => redirect.indexOf(path) > -1);
					if (isTab) {
						uni.switchTab({
							url: redirect.split('?')[0]
						});
					} else {
						uni.redirectTo({
							url: redirect
						});
					}
				} else {
					uni.switchTab({
						url: '/pages/library/home'
					});
				}
			},
			resolveAvatar(url) {
				if (!this.authForm.avatarUrl) return '';
				// 如果是临时路径或完整路径，直接返回
				if (/^(http|https|wxfile|data):/.test(this.authForm.avatarUrl)) {
					return this.authForm.avatarUrl;
				}
				// 否则拼接 OSS 前缀
				return this.ossBaseUrl + this.authForm.avatarUrl;
			},
			handleCheckboxChange(e) {
				this.isAgreed = e.detail.value.length > 0;
			},

			// 微信一键登录
			handleWechatLogin() {
				if (!this.isAgreed) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none'
					});
					return;
				}
				// 打开授权弹窗
				this.showAuthPopup = true;
			},

			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail;

				// 先显示临时头像，提升体验
				this.authForm.avatarUrl = avatarUrl;

				uni.showLoading({
					title: '上传中...'
				});

				// 引入环境配置以获取 baseUrl
				// const config = require('@/config/env.js').default; // 顶部已引入

				uni.uploadFile({
					url: config.baseUrl + '/wechat/basic/upload',
					filePath: avatarUrl,
					name: 'file', // 通常后端接收文件的字段名为 file，如不同请调整
					header: {
						// 如果需要鉴权，可以在这里添加 token，但登录前通常不需要或通过其他方式
						// 'Authorization': uni.getStorageSync('token') 
					},
					success: (uploadFileRes) => {
						uni.hideLoading();
						try {
							// uploadFile 返回的 data 是字符串，需要 JSON.parse
							const res = JSON.parse(uploadFileRes.data);
							if (res.code === 200) {
								// 上传成功，将返回的路径赋值给表单
								this.authForm.avatarUrl = res.msg;
								uni.showToast({
									title: '头像上传成功',

									icon: 'success'
								});
							} else {
								uni.showToast({
									title: res.msg || '上传失败',
									icon: 'none'
								});
							}
						} catch (e) {
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						uni.hideLoading();
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						});
					}
				});
			},

			onNicknameBlur(e) {
				this.authForm.nickName = e.detail.value;
			},

			onNicknameChange(e) {
				this.authForm.nickName = e.detail.value;
			},

			closeAuthPopup() {
				this.showAuthPopup = false;
			},

			confirmWechatLogin() {
				 if (this.isLoading) return;
				if (!this.authForm.avatarUrl) {
					uni.showToast({
						title: '请选择头像',
						icon: 'none'
					});
					return;
				}
				if (!this.authForm.nickName) {
					uni.showToast({
						title: '请填写昵称',
						icon: 'none'
					});
					return;
				}
				
				uni.showLoading({
					title: '登录中...'
				});
				this.isLoading = true;
				// 1. 获取 login code
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
				

						// 2. 调用后端登录接口
						this.$request.post('/wechat/user/login', {
							code: loginRes.code,
							avatarUrl: this.authForm.avatarUrl,
							nickName: this.authForm.nickName
						}).then(res => {
							uni.hideLoading();
							this.showAuthPopup = false;
							// 保存 token 和用户信息
							if (res.data.token) {
								uni.setStorageSync('token', res.data.token);
							}
							if (res.data.wxUser) {
								uni.setStorageSync('userInfo', res.data.wxUser);
							}
							// 请求权限字符
							this.$request.get(`/wechat/user/getUserPermission`).then(res => {
									const {
										data,
										code
									} = res
									if (code == 200) {
										uni.setStorageSync('permission', data);
									}
								})
								.catch(err => {
									console.error('获取用户信息失败', err);
								});

							uni.showToast({
								title: '登录成功',
								icon: 'success'
							});

							// 跳转
							setTimeout(() => {
								this.redirectAfterLogin();
							}, 1500);
						}).catch(err => {
							this.isLoading = false; 
							uni.hideLoading();
							console.error('登录失败', err);
						});
					},
					fail: (err) => {
						this.isLoading = false;
						uni.hideLoading();
						uni.showToast({
							title: '获取登录凭证失败',
							icon: 'none'
						});
					}
				});
			},

			// 非微信环境模拟登录
			mockLogin() {
				if (!this.isAgreed) {
					uni.showToast({
						title: '请先同意用户协议',
						icon: 'none'
					});
					return;
				}

				uni.showLoading({
					title: '登录中...'
				});
				setTimeout(() => {
					uni.hideLoading();
					uni.setStorageSync('token', 'mock-token-123456');

					this.redirectAfterLogin();
				}, 1000);
			},

			goVisitor() {
				uni.switchTab({
					url: '/pages/library/home'
				});
			},

			openAgreement(type) {
				uni.navigateTo({
						url: `/subpkg-others/pages/login/aggrement?type=${type}`
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		min-height: 100vh;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 60rpx;
	}

	.logo-box {
		margin-top: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.logo-img {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	}

	.app-name {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
	}

	.btn-box {
		margin-top: 150rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.wx-btn {
		width: 100%;
		height: 96rpx;
		background-color: #07c160;
		border-radius: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;

		&[disabled] {
			opacity: 0.6;
			background-color: #07c160;
			/* 保持绿色但半透明 */
		}

		text {
			color: #fff;
			font-size: 32rpx;
			font-weight: bold;
			margin-left: 16rpx;
		}
	}

	/* 纯CSS绘制简单的微信图标 (圆圈+两个点) */
	.wx-icon-css {
		width: 44rpx;
		height: 36rpx;
		background: #fff;
		border-radius: 16rpx;
		position: relative;
		margin-right: 4rpx;
	}

	.wx-icon-css::before {
		content: '';
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		width: 6rpx;
		height: 6rpx;
		background: #07c160;
		border-radius: 50%;
		box-shadow: 18rpx 0 0 #07c160;
	}

	.wx-icon-css::after {
		content: '';
		position: absolute;
		bottom: -4rpx;
		left: 14rpx;
		width: 0;
		height: 0;
		border-left: 6rpx solid transparent;
		border-right: 6rpx solid transparent;
		border-top: 8rpx solid #fff;
	}

	.visitor-link {
		margin-top: 40rpx;
		text-align: center;
		color: #999;
		font-size: 28rpx;
	}

	.agreement-box {
		position: fixed;
		bottom: 60rpx;
		width: 100%;
		padding: 0 60rpx;
		display: flex;
		justify-content: center;
	}

	.checkbox-label {
		display: flex;
		align-items: flex-start;
	}

	.text-group {
		font-size: 24rpx;
		color: #999;
		line-height: 1.5;
		margin-top: 4rpx;
		/* 对齐checkbox */
	}

	.link {
		color: #576b95;
	}

	/* 授权弹窗样式 */
	.auth-popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.auth-popup {
		background: #fff;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.auth-header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.auth-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 12rpx;
	}

	.auth-sub {
		font-size: 26rpx;
		color: #999;
	}

	.auth-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 50rpx;
	}

	.avatar-wrapper {
		width: 160rpx;
		height: 160rpx;
		padding: 0;
		background: none;
		border-radius: 50%;
		position: relative;
		margin-bottom: 40rpx;
	}

	.avatar-wrapper::after {
		border: none;
	}

	.auth-avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #f0f0f0;
	}

	.camera-icon {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 48rpx;
		height: 48rpx;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.input-group {
		width: 100%;
		display: flex;
		align-items: center;
		background: #f8f8f8;
		padding: 24rpx 30rpx;
		border-radius: 12rpx;
	}

	.label {
		font-size: 30rpx;
		color: #333;
		margin-right: 30rpx;
		font-weight: bold;
	}

	.auth-input {
		flex: 1;
		font-size: 30rpx;
		color: #333;
		height: 44rpx;
		/* line-height 设为 height 保持垂直居中 */
		line-height: 44rpx;
	}

	.auth-footer {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.popup-btn {
		width: 46%;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		font-size: 30rpx;
		text-align: center;
		font-weight: bold;
	}

	.popup-btn::after {
		border: none;
	}

	.popup-btn.cancel {
		background: #f5f5f5;
		color: #666;
	}

	.popup-btn.confirm {
		background: #07c160;
		color: #fff;
	}
	.popup-btn.confirm.loading {
	  opacity: 0.7;
	  position: relative;
	  pointer-events: none;
	}
	
	/* 为加载状态添加伪元素动画 */
	.popup-btn.confirm.loading::after {
	  content: '';
	  position: absolute;
	  top: 50%;
	  right: 20rpx;
	  transform: translateY(-50%);
	  width: 24rpx;
	  height: 24rpx;
	  border: 2rpx solid rgba(255, 255, 255, 0.3);
	  border-top: 2rpx solid #fff;
	  border-radius: 50%;
	  animation: spin 1s linear infinite;
	}
	
	/* 加载动画 */
	@keyframes spin {
	  0% { transform: translateY(-50%) rotate(0deg); }
	  100% { transform: translateY(-50%) rotate(360deg); }
	}
</style>
