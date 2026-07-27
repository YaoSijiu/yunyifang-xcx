<template>
	<!-- 【关键】必须有一个根节点包裹所有内容 -->
	<view class="page-container">

		<!-- 1. 顶部用户信息卡片 -->
		<view class="header-card">
			<view class="user-info-row">
				<!-- 左侧头像与信息 -->
				<view class="left-info">
					<image class="avatar" :src="ossUrl + userInfo.avatarUrl || 'https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/logo.png'" mode="aspectFill">
					</image>
					<view class="info-text">
						<text class="username">{{ userInfo.nickName }}</text>

						<!-- 状态：未开通 -->
						<text class="status-tag gray" v-if="userInfo.vipLevel == 'none'">VIP未开通</text>
						<!-- 状态：已开通 -->
						<text class="status-text orange" v-else-if="userInfo.vipLevel != 'none' && memberInfo">
							{{ memberInfo.name }} {{ formatDate(userInfo.vipExpireTime) }}到期
						</text>
						<!-- 状态：已结束 -->
						<text class="status-tag gray" v-else>已结束</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 会员套餐列表 -->
		<view v-if="userInfo.vipLevel || userInfo.vipLevel === 'none'">

			<view class="plan-list">
				<view class="plan-item" v-for="(item, index) in plans" :key="item.id || index"
					:class="{ 'current-level': item.isCurrentLevel }">

					<view class="plan-title">{{ item.name }}</view>
					<view class="plan-price">
						<text class="symbol">¥</text>
						<text class="num">{{ item.displayPrice }}</text>
						<text class="unit">{{ item.durationText }}</text>
						<text class="original-price" v-if="item.isCurrentLevel">原价</text>
					</view>

					<view class="feature-list">
						<view class="feature-item" v-for="(feat, fIndex) in item.features" :key="fIndex">
							<image src="/static/icon/对钩.svg" class="check"></image> {{ feat }}
						</view>
					</view>

					<button class="buy-btn" :class="{
						'current-level-btn': item.isCurrentLevel && item.canRenew !== 1,
						'renew-btn': item.isCurrentLevel && item.canRenew === 1,
						'disabled-btn': item.isDisabled && !item.isCurrentLevel
					}" :disabled="(item.isDisabled && !item.isCurrentLevel) || (item.isCurrentLevel && item.canRenew !== 1)"
						:data-item="item" @click="handleBuyPlan">
						{{ item.isCurrentLevel ? (item.canRenew === 1 ? '立即续费' : '当前使用') : (item.isDisabled ? '不可升级' : '立即开通') }}
					</button>
				</view>
			</view>

			<view class="section-block faq-section">
				<view class="section-title">常见问题</view>
				<view class="faq-item" v-for="(item, index) in faqList" :key="index">
					<view class="faq-question-row">
						<text class="q">{{ index + 1 }}. {{ item.question }}</text>
					</view>
					<view class="a">
						{{ item.answer }}
					</view>
				</view>
			</view>
		</view>

		<!-- 已结束状态显示 -->
		<view v-else-if="memberInfo && memberInfo.status === 'expired'">
			<view class="expired-detail-card">
				<view class="card-header">
					<text class="card-title">体验版</text>
					<text class="expired-badge">● 已结束</text>
				</view>

				<view class="detail-list">
					<view class="detail-item">
						<text class="label">📦 作品空间：</text>
						<text class="value">10G</text>
					</view>
					<view class="detail-item">
						<text class="label">🈚 会员免费流量：</text>
						<text class="value">10G</text>
					</view>
					<view class="detail-item">
						<text class="label">👤 团队视位：</text>
						<text class="value">2个</text>
					</view>
					<view class="detail-divider"></view>
					<view class="detail-item">
						<text class="label">📅 起始日期：</text>
						<text class="value">2025/12/04</text>
					</view>
					<view class="detail-item">
						<text class="label">📅 结束日期：</text>
						<text class="value">2026/12/04</text>
					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
import env from '@/config/env.js'
export default {
	data() {
		return {
			ossUrl: env.aliyunUrl,
			memberInfo: null,

			userInfo: {
				nickName: '未命名用户',
				vipLevel: 'none',
				vipExpireTime: '',
				avatarUrl: '',
				teamName: 'UF设计团队版'
			},
			isTeamMode: false,
			plans: [{
				name: '基础版',
				levelCode: "basic",
				price: '88',
				displayPrice: '88',
				durationUnit: 'year',
				durationValue: 1,
				durationText: '/1年',
				canRenew: 1,
				isCurrentLevel: false,
				features: ['10G作品空间', '100G作品流量', '多种文件支持', '一键下载']
			},
			{
				name: '进阶版',
				levelCode: "advanced",
				price: '198',
				displayPrice: '198',
				durationUnit: 'year',
				durationValue: 1,
				durationText: '/1年',
				canRenew: 1,
				isCurrentLevel: false,
				features: ['30G作品空间', '300G作品流量', '多种文件支持', '一键下载']
			},
			{
				name: '团队版',
				levelCode: "team",
				price: '298',
				displayPrice: '298',
				durationUnit: 'year',
				durationValue: 1,
				durationText: '/1年',
				canRenew: 1,
				isCurrentLevel: false,
				features: ['50G作品空间', '500G作品流量', '多种文件支持', '一键下载']
			}
			],
			faqList: [
				{
					question: '作品空间量是什么？',
					answer: '作品空间是指您在平台上可以存储作品文件的总容量。'
				},
				{
					question: '团队协作是什么？',
					answer: '支持多人共同管理作品、分配权限和协同处理项目。'
				},
				{
					question: '开通会员后是否可以退款？',
					answer: '会员属于虚拟服务，一旦开通暂不支持中途退款，请知悉。'
				},
				{
					question: '个人版如何升级到团队版？如何收费？',
					answer: '在会员中心选择团队版进行升级，系统会自动计算差价。'
				},
				{
					question: '会员到期后作品是否还在？',
					answer: '作品仍会保留，但部分高级功能和相关权益将受限。'
				}
			],
			activeFaqIndex: -1
		};
	},
	onShow() {
		// 加载会员数据
		this.loadMemberData()
		this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
	},
	methods: {
		// 请求权限字符
		async getPermission() {
			try {
				const res = await this.$request.get(`/wechat/user/getUserPermission`);
				const {
					data,
					code
				} = res;
				if (code == 200) {
					uni.setStorageSync('permission', data);
					this.memberInfo = data;
				}
			} catch (error) {
				console.error('获取权限失败:', error);
			}
		},
		// 获取用户基本信息
		async getUserInfo() {
			try {
				const {
					code,
					data
				} = await this.$request.get(`/wechat/user/getUserInfo`)
				if (code == 200) {
					this.userInfo = data
					console.log('获取用户信息成功:', data);
				}
			} catch (error) {
				console.error('获取用户信息失败:', error);
			}
		},
		// 计算两个日期之间的天数差
		calculateDaysDifference(endDateStr) {
			const now = new Date();
			const endDate = new Date(endDateStr);

			// 如果结束日期已过期，返回0
			if (endDate <= now) {
				return 0;
			}

			// 计算毫秒差并转换为天数
			const timeDiff = endDate.getTime() - now.getTime();
			const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

			return daysDiff;
		},

		getDurationUnitText(durationUnit) {
			const unit = durationUnit ? String(durationUnit).toLowerCase() : 'year';
			const unitMap = {
				month: '月',
				year: '年'
			};
			return unitMap[unit] || '年';
		},

		getDurationDays(plan) {
			const durationValue = Number(plan && plan.durationValue) || 1;
			const durationUnit = plan && plan.durationUnit ? String(plan.durationUnit).toLowerCase() : 'year';
			if (durationUnit === 'month') {
				return durationValue * 30;
			}
			return durationValue * 365;
		},

		getDurationText(plan) {
			const durationValue = Number(plan && plan.durationValue) || 1;
			const durationUnitText = this.getDurationUnitText(plan && plan.durationUnit);
			return `/${durationValue}${durationUnitText}`;
		},

		// 计算每天的价格（元/天）
		calculateDailyPrice(plan) {
			// 确保参数是数字类型
			const price = parseFloat(plan && plan.price) || 0;
			const durationDays = this.getDurationDays(plan);
			return durationDays > 0 ? price / durationDays : 0;
		},
		// 格式化日期为年月日格式（YYYY/MM/DD）
		formatDate(dateString) {
			if (!dateString) return '';

			const date = new Date(dateString);
			// 检查日期是否有效
			if (isNaN(date.getTime())) return '';

			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以+1
			const day = String(date.getDate()).padStart(2, '0');

			return `${year}/${month}/${day}`;
		},

		// 获取会员列表
		async getMemberList() {
			try {
				// 等待会员数据加载完成
				if (!this.memberInfo) {
					await new Promise(resolve => setTimeout(resolve, 500));
				}

				const {
					code,
					data
				} = await this.$request.get(`/wechat/member/list`);
				if (code == 200 && Array.isArray(data)) {
					this.plans = data.map(v => {
						// 判断是否为当前用户等级
						const isCurrentLevel = this.memberInfo && v.levelCode === this.memberInfo.code;
						const hasOpenedMember = this.hasOpenedMember();
						// 已开通会员只允许续费当前套餐，不允许升级或切换到其他套餐
						const isDisabled = hasOpenedMember && !isCurrentLevel;

						return {
							id: v.id,
							name: v.levelName,
							levelCode: v.levelCode, // 保存levelCode用于比较
							price: v.price, // 原始价格
							displayPrice: v.price, // 会员不支持升级，统一展示原价
							durationUnit: v.durationUnit ? String(v.durationUnit).toLowerCase() : 'year',
							durationValue: Number(v.durationValue) || 1,
							durationText: this.getDurationText(v),
							canRenew: Number(v.canRenew) === 1 ? 1 : 0,
							isCurrentLevel: isCurrentLevel, // 是否为当前等级
							isDisabled: isDisabled, // 是否禁用购买按钮
							features: v.description ? v.description.split(",") : []
						}
					});
				}
			} catch (error) {
				console.error('获取会员列表失败:', error);
			}
		},
		// 加载会员数据的统一方法
		async loadMemberData() {
			try {
				// 并行获取用户信息和权限
				await Promise.all([this.getPermission(), this.getUserInfo()]);
				// 调用获取会员列表API并等待完成
				await this.getMemberList();
				console.log('会员数据加载完成');
			} catch (error) {
				console.error('加载会员数据失败:', error);
			}
		},
		// 处理购买套餐点击事件
		handleBuyPlan(e) {
			// 这里可以根据item.levelCode执行不同的购买逻辑
			console.log('购买套餐:', e);
			const item = e.currentTarget.dataset.item
			console.log("item", item)

			if (this.hasOpenedMember() && !item.isCurrentLevel) {
				uni.showModal({
					title: '提示',
					content: '会员暂不支持升级或切换套餐，仅支持续费当前套餐',
					showCancel: false
				});
				return;
			}

			// 检查是否为禁用套餐
			if (item.isDisabled && !item.isCurrentLevel) {
				uni.showModal({
					title: '提示',
					content: '当前套餐不可购买',
					showCancel: false
				});
				return;
			}
			if (item.isCurrentLevel && item.canRenew !== 1) {
				uni.showModal({
					title: '提示',
					content: '当前会员暂不支持续费',
					showCancel: false
				});
				return;
			}

			// 示例：可以弹出确认框或跳转到支付页面
			const priceText = `¥${item.displayPrice}${item.durationText}`;
			uni.showModal({
				title: '确认购买',
				content: `确定要购买${item.name}套餐吗？价格：${priceText}`,

				success: (res) => {
					if (res.confirm) {
						// 执行支付逻辑
						console.log('用户确认购买');
						const param = {
							money: item.price,
							id: item.id
						}
						console.log("调取字符参数", param)
						this.$request.post(`/wechat/member/activateMemberPay`, param).then(res => {
							const data = this.parseVirtualPayData(res.data);
							console.log('虚拟支付参数已返回',data);
							if (this.isVirtualPayDataLoginExpired(data)) {
								this.resetWechatSessionForPay();
								return;
							}
							if (!data) {
								uni.showToast({
									title: '支付参数异常',
									icon: 'none'
								});
								return;
							}
							if (!this.canUseVirtualPayment()) {
								uni.showToast({
									title: '当前微信版本暂不支持虚拟支付',
									icon: 'none'
								});
								return;
							}
							// 虚拟支付
							wx.requestVirtualPayment({
								signData: data.signData,
								mode: data.mode,
								paySig: data.paySig,
								signature: data.signature,
								success: () => {
									uni.showToast({
										title: '支付成功',
										icon: 'success'
									});
									this.loadMemberData();
								},
								fail: (err) => {
									console.log('虚拟支付失败:', err);
									// uni.showToast({
									// 	title: err && err.errMsg && err.errMsg.includes('cancel') ? '支付已取消' : '支付失败',
									// 	icon: 'none'
									// });
								}
							})
							//JSAPI
							// uni.requestPayment({
							// 	provider: 'wxpay',
							// 	...payParams,
							// 	success: () => {
							// 		uni.showToast({
							// 			title: '支付成功',
							// 			icon: 'success'
							// 		});
							// 	},
							// 	fail: (err) => {
							// 		uni.showToast({
							// 			title: err.errMsg.includes('cancel') ?
							// 				'支付已取消' : '支付失败',
							// 			icon: 'none'
							// 		});
							// 	}
							// });
						}).catch(error => {
							if (this.isPayLoginExpired(error)) {
								this.resetWechatSessionForPay();
							}
						})
					} else if (res.cancel) {

					}
				}
			});
		},

		parseVirtualPayData(data) {
			if (!data) {
				return null;
			}
			if (typeof data === 'string') {
				try {
					return JSON.parse(data);
				} catch (error) {
					console.error('解析虚拟支付参数失败:', error);
					return null;
				}
			}
			return data;
		},

		hasOpenedMember() {
			return !!(this.memberInfo && this.memberInfo.code && this.userInfo.vipLevel && this.userInfo.vipLevel !== 'none');
		},

		isPayLoginExpired(error) {
			return error && Number(error.code) === 401;
		},

		isVirtualPayDataLoginExpired(data) {
			if (!data) {
				return false;
			}
			if (Number(data) === 401) {
				return true;
			}
			return typeof data === 'object' && Number(data.code) === 401;
		},

		resetWechatSessionForPay() {
			// #ifdef MP-WEIXIN
			if (typeof wx === 'undefined' || !wx.login) {
				uni.showToast({
					title: '当前环境不支持微信登录',
					icon: 'none'
				});
				return;
			}

			uni.showLoading({
				title: '登录态刷新中...'
			});
			wx.login({
				success: (loginRes) => {
					if (!loginRes.code) {
						uni.hideLoading();
						uni.showToast({
							title: '获取登录凭证失败',
							icon: 'none'
						});
						return;
					}

					this.$request.post('/wechat/user/resetSeeion', {
						code: loginRes.code
					}).then(res => {
						uni.hideLoading();
						if (res.data && res.data.token) {
							uni.setStorageSync('token', res.data.token);
						}
						uni.showToast({
							title: '状态已刷新，请重新支付',
							icon: 'none'
						});
					}).catch(error => {
						uni.hideLoading();
						console.error('刷新登录态失败:', error);
						uni.showToast({
							title: '登录态刷新失败',
							icon: 'none'
						});
					});
				},
				fail: (error) => {
					uni.hideLoading();
					console.error('wx.login失败:', error);
					uni.showToast({
						title: '获取登录凭证失败',
						icon: 'none'
					});
				}
			});
			// #endif
			// #ifndef MP-WEIXIN
			uni.showToast({
				title: '当前环境不支持微信登录',
				icon: 'none'
			});
			// #endif
		},

		compareVersion(versionA, versionB) {
			const vA = String(versionA || '').split('.');
			const vB = String(versionB || '').split('.');
			const length = Math.max(vA.length, vB.length);

			for (let i = 0; i < length; i++) {
				const numA = parseInt(vA[i] || '0', 10);
				const numB = parseInt(vB[i] || '0', 10);
				if (numA > numB) return 1;
				if (numA < numB) return -1;
			}

			return 0;
		},

		canUseVirtualPayment() {
			// #ifdef MP-WEIXIN
			if (typeof wx === 'undefined' || !wx.requestVirtualPayment) {
				return false;
			}
			const systemInfo = wx.getSystemInfoSync();
			return this.compareVersion(systemInfo.SDKVersion, '2.19.2') >= 0 || wx.canIUse('requestVirtualPayment');
			// #endif
			// #ifndef MP-WEIXIN
			return false;
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
/* 页面整体背景 */
.page-container {
	min-height: 100vh;
	background-color: #f5f7fa;
	padding: 20rpx;
	box-sizing: border-box;
}



/* 顶部卡片 */
.header-card {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;

	.user-info-row {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left-info {
			display: flex;
			align-items: center;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #eee;
				margin-right: 20rpx;
			}

			.info-text {
				display: flex;
				flex-direction: column;

				.username {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 8rpx;
				}
				.user-team {
					font-weight: normal;
					font-size: 32rpx;
					color: #000000;
					margin-left: 8rpx;
				}
				.status-tag {
					font-size: 24rpx;
					color: #999;
				}

				.status-text.orange {
					font-size: 24rpx;
					color: #ff6b00;
				}
			}
		}

		.redeem-btn {
			font-size: 24rpx;
			color: #ff6b00;
		}
	}
}

/* 提示条 (状态1) */
.notice-bar {
	background-color: #fff0e5;
	padding: 20rpx;
	border-radius: 12rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;

	.notice-content {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #333;

		.icon {
			background: #333;
			color: #fff;
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 30rpx;
			font-size: 20rpx;
			margin-right: 10rpx;
		}
	}

	.manage-btn {
		font-size: 24rpx;
		color: #ff6b00;
	}
}

/* 套餐列表 */
.plan-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	margin-bottom: 40rpx;
}

.plan-item {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx 24rpx;
	margin: 0;
	text-align: left;
	box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	position: relative;
	transition: all 0.3s ease;
	width: 100%;
	box-sizing: border-box;

	/* 当前等级样式 */
	&.current-level {
		border: 2rpx solid #ff6b00;
		box-shadow: 0 6rpx 16rpx rgba(255, 107, 0, 0.15);
	}

	/* 当前等级标签 */
	.level-tag {
		position: absolute;
		top: -12rpx;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(to right, #ff8c00, #ff5500);
		color: #fff;
		font-size: 20rpx;
		padding: 6rpx 20rpx;
		border-radius: 20rpx;
		font-weight: 500;
		box-shadow: 0 2rpx 8rpx rgba(255, 107, 0, 0.3);
	}

	.plan-title {
		font-weight: bold;
		font-size: 30rpx;
		margin-bottom: 12rpx;
		color: #333;
	}

	.plan-price {
		color: #e00000;
		margin-bottom: 24rpx;
		display: flex;
		align-items: baseline;

		.symbol {
			font-size: 28rpx;
			font-weight: bold;
			margin-right: 4rpx;
		}

		.num {
			font-size: 60rpx;
			font-weight: bold;
			line-height: 1;
		}

		.unit {
			font-size: 28rpx;
			color: #e00000;
			margin-left: 4rpx;
			font-weight: bold;
		}

		/* 差价提示 */
		.price-hint {
			font-size: 20rpx;
			color: #999;
			margin-left: 10rpx;
		}

		/* 原价提示 */
		.original-price {
			font-size: 20rpx;
			color: #666;
			margin-left: 10rpx;
		}
	}

	.feature-list {
		flex-grow: 1;
		margin-bottom: 28rpx;
		text-align: left;
		padding-left: 10rpx;

		.feature-item {
						font-size: 26rpx;
						color: #666;
						margin-bottom: 16rpx;
						line-height: 1.5;
						display: flex;
						align-items: flex-start;
						width: 100%;
						word-break: break-word;

						.check {
							width: 28rpx;
							height: 28rpx;
							margin-right: 12rpx;
							flex-shrink: 0;
							object-fit: contain;
						}
					}
	}

	.buy-btn {
		background: linear-gradient(135deg, #ff6b00, #ff8c00);
		color: #fff;
		font-size: 28rpx;
		font-weight: 500;
		border-radius: 40rpx;
		line-height: 70rpx;
		width: 85%;
		border: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4rpx 12rpx rgba(255, 107, 0, 0.3);

		&:active {
			transform: scale(0.96);
			box-shadow: 0 2rpx 6rpx rgba(255, 107, 0, 0.2);
		}

		/* 当前等级按钮样式（不可续费） */
		&.current-level-btn {
			background: #f5f5f5;
			color: #999;
			border: 2rpx solid #e0e0e0;
			box-shadow: none;
			cursor: not-allowed;
		}

		/* 续费按钮样式 */
		&.renew-btn {
			background: linear-gradient(135deg, #4CAF50, #45a049);
			box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.3);
		}

		/* 禁用按钮样式 */
		&.disabled-btn {
			background: #f0f0f0;
			color: #bdbdbd;
			box-shadow: none;
			cursor: not-allowed;
		}
	}
}

/* 底部板块 (FAQ) */
.section-block {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 40rpx;

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.faq-item {
		margin-bottom: 40rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.faq-question-row {
			margin-bottom: 12rpx;
		}

		.q {
			font-size: 30rpx;
			color: #333;
			font-weight: bold;
			line-height: 1.4;
		}

		.a {
			font-size: 26rpx;
			color: #888;
			line-height: 1.6;
			text-align: justify;
		}
	}

	.privilege-placeholder {
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ccc;
	}
}

/* 已过期详情卡片 (状态3) */
.expired-detail-card {
	background: #fff;
	border-radius: 16rpx;
	padding: 40rpx;

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
		border-bottom: 1rpx solid #eee;
		padding-bottom: 20rpx;

		.card-title {
			font-size: 36rpx;
			font-weight: bold;
		}

		.expired-badge {
			background: #eee;
			color: #999;
			font-size: 24rpx;
			padding: 6rpx 16rpx;
			border-radius: 20rpx;
		}
	}

	.detail-list {
		.detail-item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			font-size: 28rpx;

			.label {
				color: #666;
			}

			.value {
				color: #333;
				font-weight: 500;
			}
		}

		.detail-divider {
			height: 1rpx;
			background: #eee;
			margin: 30rpx 0;
		}
	}
}
</style>
