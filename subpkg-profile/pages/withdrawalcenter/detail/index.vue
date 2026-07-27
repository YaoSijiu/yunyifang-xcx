<template>
	<view class="detail-page">
		<view class="header-panel">
			<!-- <view class="capsule"> -->
				<!-- <view class="capsule-dot-group">
					<view class="dot small"></view>
					<view class="dot large"></view>
					<view class="dot small"></view>
				</view> -->
		<!-- 		<view class="capsule-line"></view>
				<view class="capsule-circle"></view> -->
			<!-- </view> -->

			<view class="nav-row">
				<view class="back-btn" @click="goBack">
					<view class="back-icon"></view>
				</view>
				<text class="page-title">订单详情</text>
			</view>
		</view>

		<scroll-view class="content-scroll" scroll-y>
			<view v-if="loading" class="state-block">加载中...</view>
			<view v-else-if="loadError" class="state-block">
				<text>{{ loadError }}</text>
				<view class="retry-btn" @click="loadTaskDetail">重新加载</view>
			</view>
			<view v-else class="content">
				<view class="hero-card">
					<view class="poster-area">
						<swiper
							v-if="imageUrls.length > 0"
							class="poster-swiper"
							:indicator-dots="false"
							:circular="true"
							@change="handlePosterChange"
						>
							<swiper-item v-for="(image, index) in imageUrls" :key="image + '-' + index">
								<image class="poster-image" :src="image" mode="aspectFill" @click="previewImage(index)"></image>
							</swiper-item>
						</swiper>
						<view v-else class="empty-poster">暂无封面</view>
						<view v-if="imageUrls.length > 0" class="poster-count">{{ currentPosterIndex + 1 }}/{{ imageUrls.length }}</view>
					</view>
					<text class="task-title">{{ detail.taskTitleSnapshot || '暂无标题' }}</text>
					<text class="task-desc">{{ detail.taskDescSnapshot || '暂无描述' }}</text>
				</view>

				<view class="requirement-card">
					<view class="requirement-section">
						<view class="section-title">专业类型</view>
						<view v-if="professionTags.length > 0" class="tag-list">
							<view
								v-for="(item, index) in professionTags"
								:key="item + '-' + index"
								class="profession-tag"
							>{{ item }}</view>
						</view>
						<view v-else class="empty-tags">暂无专业类型</view>
					</view>

					<view class="dash-divider"></view>

					<view class="requirement-section service-section">
						<view class="section-title">服务要求</view>
						<view v-if="guaranteeTags.length > 0" class="tag-list service-tag-list">
							<view
								v-for="(item, index) in guaranteeTags"
								:key="item + '-' + index"
								class="service-tag"
							>
								<text class="check-icon">✓</text>
								<text>{{ item }}</text>
							</view>
						</view>
						<view v-else class="empty-tags">暂无服务保障</view>
					</view>
				</view>

				<!-- <view class="info-card">
					<view class="section-title">订单信息</view>
					<view class="info-row">
						<text class="info-label">订单编号</text>
						<text class="info-value">{{ detail.orderNo || orderNo || '--' }}</text>
					</view>
					<view class="info-row">
						<text class="info-label">订单金额</text>
						<text class="info-value price-value">{{ formatMoney(detail.orderAmount || amount) }} 元</text>
					</view>
					<view class="info-row">
						<text class="info-label">预算金额</text>
						<text class="info-value">{{ formatMoney(detail.budgetAmountSnapshot) }} 元</text>
					</view>
					<view class="info-row">
						<text class="info-label">交付时间</text>
						<text class="info-value">{{ formatDateTime(detail.expectedDeliveryTime) }}</text>
					</view>
					<view class="info-row">
						<text class="info-label">订单状态</text>
						<text class="info-value">{{ detail.orderStatus || '--' }}</text>
					</view>
				</view> -->

				<view class="bottom-space"></view>
			</view>
		</scroll-view>

		<view v-if="canWithdraw" class="bottom-bar">
			<view class="withdraw-action" :class="{ disabled: withdrawing }" @click="handleWithdraw">
				{{ withdrawing ? '提现中...' : '提现' }}
			</view>
		</view>
	</view>
</template>

<script>
import env from '@/config/env.js'

export default {
	data() {
		return {
			orderNo: '',
			withdrawId: '',
			status: '',
			amount: '',
			detail: {},
			loading: false,
			loadError: '',
			withdrawing: false,
			hideWithdraw: false,
			currentPosterIndex: 0
		}
	},
	computed: {
		canWithdraw() {
			return !this.hideWithdraw && this.status === 'pending_withdraw' && !!this.withdrawId
		},
		imageUrls() {
			return this.normalizeImageList(this.detail.imageList).map(item => this.buildImageUrl(item)).filter(Boolean)
		},
		professionTags() {
			return this.normalizeProfessionList(this.detail.professionList)
		},
		guaranteeTags() {
			return this.normalizeGuaranteeList(this.detail.guaranteeList)
		}
	},
	onLoad(options) {
		this.orderNo = options && options.orderNo ? decodeURIComponent(options.orderNo) : ''
		this.withdrawId = options && options.withdrawId ? decodeURIComponent(options.withdrawId) : ''
		this.status = options && options.status ? decodeURIComponent(options.status) : ''
		this.amount = options && options.amount ? decodeURIComponent(options.amount) : ''
		this.hideWithdraw = !!(options && (options.hideWithdraw === '1' || options.hideWithdraw === 'true'))
		if (!this.orderNo) {
			uni.showToast({
				title: '订单编号不能为空',
				icon: 'none'
			})
			setTimeout(() => {
				this.goBack()
			}, 800)
			return
		}
		this.loadTaskDetail()
	},
	methods: {
		goBack() {
			if (getCurrentPages().length > 1) {
				uni.navigateBack()
				return
			}
			uni.navigateTo({
				url: '/subpkg-profile/pages/withdrawalcenter/index'
			})
		},
		async loadTaskDetail() {
			if (!this.orderNo || this.loading) {
				return
			}
			this.loading = true
			this.loadError = ''
			try {
				const res = await this.$request.get('/wechat/withdrawal/taskDetail', {
					orderNo: this.orderNo
				})
				this.detail = this.extractDetailData(res)
				this.currentPosterIndex = 0
			} catch (e) {
				this.loadError = (e && e.msg) || '订单详情加载失败'
			} finally {
				this.loading = false
			}
		},
		extractDetailData(res) {
			const candidates = [
				res && res.data,
				res && res.data && res.data.data,
				res
			]
			return candidates.find(item => item && typeof item === 'object' && !Array.isArray(item)) || {}
		},
		async handleWithdraw() {
			if (!this.canWithdraw || this.withdrawing) {
				return
			}
			const confirmRes = await new Promise(resolve => {
				uni.showModal({
					title: '确认提现',
					content: `确定提现订单${this.orderNo}的${this.formatMoney(this.detail.orderAmount || this.amount)}元吗？`,
					confirmColor: '#F37738',
					success: resolve,
					fail: () => resolve({ confirm: false })
				})
			})
			if (!confirmRes.confirm) {
				return
			}
			this.withdrawing = true
			try {
				const res = await this.$request.post('/wechat/withdrawal/transfer', {
					id: this.withdrawId
				}, {
					loading: true,
					loadingText: '提现中...'
				})
				await this.handleTransferResult(this.extractTransferData(res))
			} catch (e) {
			} finally {
				this.withdrawing = false
			}
		},
		extractTransferData(res) {
			const candidates = [
				res && res.data && res.data.data,
				res && res.data,
				res
			]
			return candidates.find(item => item && typeof item === 'object' && !Array.isArray(item)) || {}
		},
		async handleTransferResult(data) {
			const transferList = Array.isArray(data.transferList) ? data.transferList : []
			const waitConfirmList = transferList.filter(item => {
				return item && item.state === 'WAIT_USER_CONFIRM' && item.packageInfo
			})
			if (waitConfirmList.length > 0) {
				for (const item of waitConfirmList) {
					await this.openMerchantTransfer(item)
				}
				this.showToastAndBack('确认完成', 'success')
				return
			}
			if (transferList.length > 0 && transferList.every(item => item && item.state === 'SUCCESS')) {
				this.showToastAndBack('提现成功', 'success')
				return
			}
			const failItem = transferList.find(item => item && item.state === 'FAIL')
			if (failItem) {
				uni.showToast({
					title: failItem.failReason || '提现失败，请稍后重试',
					icon: 'none'
				})
				return
			}
			this.showToastAndBack('转账处理中，请稍后查看', 'none')
		},
		openMerchantTransfer(item) {
			const transferConfig = env.merchantTransfer || {}
			if (!transferConfig.mchId) {
				uni.showToast({
					title: '商户号配置缺失',
					icon: 'none'
				})
				return Promise.reject(new Error('merchantTransfer.mchId is empty'))
			}
			if (!transferConfig.appId) {
				uni.showToast({
					title: '小程序AppId配置缺失',
					icon: 'none'
				})
				return Promise.reject(new Error('merchantTransfer.appId is empty'))
			}
			return new Promise((resolve, reject) => {
				// #ifdef MP-WEIXIN
				wx.openBusinessView({
					businessType: 'requestMerchantTransfer',
					extraData: {
						mchId: transferConfig.mchId,
						appId: transferConfig.appId,
						package: item.packageInfo
					},
					success: resolve,
					fail: error => {
						console.log(error.errMsg)
						uni.showToast({
							title: (error && error.errMsg) || '确认收款失败',
							icon: 'none'
						})
						reject(error)
					}
				})
				// #endif

				// #ifndef MP-WEIXIN
				uni.showToast({
					title: '请在微信小程序中操作',
					icon: 'none'
				})
				reject(new Error('请在微信小程序中操作'))
				// #endif
			})
		},
		showToastAndBack(title, icon) {
			uni.showToast({
				title,
				icon: icon || 'none'
			})
			setTimeout(() => {
				this.goBack()
			}, 800)
		},
		handlePosterChange(event) {
			this.currentPosterIndex = event.detail.current || 0
		},
		previewImage(index) {
			if (!this.imageUrls.length) {
				return
			}
			uni.previewImage({
				urls: this.imageUrls,
				current: this.imageUrls[index] || this.imageUrls[0]
			})
		},
		normalizeImageList(value) {
			if (!value) {
				return []
			}
			if (Array.isArray(value)) {
				return value.filter(Boolean)
			}
			if (typeof value === 'string') {
				const text = value.trim()
				if (!text) {
					return []
				}
				if (text[0] === '[') {
					try {
						const parsed = JSON.parse(text)
						return Array.isArray(parsed) ? parsed.filter(Boolean) : []
					} catch (e) {
						return []
					}
				}
				return text.split(',').map(item => item.trim()).filter(Boolean)
			}
			return []
		},
		normalizeProfessionList(value) {
			if (!Array.isArray(value)) {
				return []
			}
			return value
				.map(item => {
					if (!item) {
						return ''
					}
					if (typeof item === 'string') {
						return item.trim()
					}
					return String(
						item.professionCategoryName ||
						item.categoryName ||
						item.professionName ||
						item.name ||
						item.label ||
						item.description ||
						''
					).trim()
				})
				.filter(Boolean)
		},
		normalizeGuaranteeList(value) {
			if (!Array.isArray(value)) {
				return []
			}
			return value
				.map(item => {
					if (!item) {
						return ''
					}
					if (typeof item === 'string') {
						return item.trim()
					}
					return String(item.description || '').trim()
				})
				.filter(Boolean)
		},
		buildImageUrl(url) {
			if (!url) {
				return ''
			}
			const text = String(url).trim()
			if (/^(https?:|wxfile:|data:|\/static\/)/.test(text)) {
				return text
			}
			return env.aliyunUrl + text.replace(/^\/+/, '')
		},
		formatMoney(value) {
			if (value === null || value === undefined || value === '') {
				return '0'
			}
			const numberValue = Number(value)
			if (Number.isNaN(numberValue)) {
				return String(value)
			}
			const text = numberValue.toFixed(2)
			return text.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')
		},
		formatDateTime(value) {
			if (!value) {
				return '--'
			}
			return String(value).replace(/-/g, '/')
		}
	}
}
</script>

<style scoped>
page {
	background: #f7f7f7;
}

.detail-page {
	width: 750rpx;
	min-height: 100vh;
	background: #f7f7f7;
}

.header-panel {
	position: relative;
	height: 184rpx;
	background: #ffffff;
}

.capsule {
	position: absolute;
	top: 93rpx;
	right: 21rpx;
	width: 197rpx;
	height: 65rpx;
	border: 1rpx solid #e1e1e1;
	border-radius: 33rpx;
	box-sizing: border-box;
}

.capsule-line {
	position: absolute;
	top: 14rpx;
	left: 98rpx;
	width: 1rpx;
	height: 38rpx;
	background: #e1e1e1;
}

.capsule-dot-group {
	position: absolute;
	top: 29rpx;
	left: 30rpx;
	display: flex;
	align-items: center;
	gap: 7rpx;
}

.dot {
	border-radius: 50%;
	background: #000000;
}

.dot.small {
	width: 7rpx;
	height: 7rpx;
}

.dot.large {
	width: 12rpx;
	height: 12rpx;
}

.capsule-circle {
	position: absolute;
	top: 14rpx;
	right: 29rpx;
	width: 35rpx;
	height: 35rpx;
	border: 4rpx solid #000000;
	border-radius: 50%;
	box-sizing: border-box;
}

.nav-row {
	position: relative;
	height: 184rpx;
}

.back-btn {
	position: absolute;
	left: 20rpx;
	top: 102rpx;
	width: 48rpx;
	height: 48rpx;
}

.back-icon {
	width: 22rpx;
	height: 22rpx;
	margin: 13rpx 0 0 12rpx;
	border-left: 5rpx solid #000000;
	border-bottom: 5rpx solid #000000;
	transform: rotate(45deg);
}

.page-title {
	position: absolute;
	left: 295rpx;
	top: 98rpx;
	width: 160rpx;
	height: 56rpx;
	line-height: 56rpx;
	font-size: 40rpx;
	color: #000000;
	text-align: center;
}

.content-scroll {
	height: calc(100vh - 184rpx);
}

.content {
	padding-bottom: 120rpx;
	box-sizing: border-box;
}

.state-block {
	min-height: calc(100vh - 184rpx);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #979797;
}

.retry-btn {
	margin-top: 24rpx;
	width: 180rpx;
	height: 64rpx;
	line-height: 64rpx;
	border-radius: 999rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 26rpx;
	text-align: center;
}

.hero-card {
	background: #ffffff;
}

.poster-area {
	position: relative;
	width: 750rpx;
	height: 479rpx;
	background: #eeeeee;
}

.poster-swiper,
.poster-image {
	width: 750rpx;
	height: 479rpx;
}

.empty-poster {
	width: 750rpx;
	height: 479rpx;
	line-height: 479rpx;
	font-size: 28rpx;
	color: #979797;
	text-align: center;
}

.poster-count {
	position: absolute;
	left: 29rpx;
	bottom: 22rpx;
	min-width: 72rpx;
	height: 36rpx;
	line-height: 36rpx;
	padding: 0 14rpx;
	border-radius: 20rpx;
	background: rgba(0, 0, 0, 0.7);
	font-size: 20rpx;
	color: #ffffff;
	text-align: center;
	box-sizing: border-box;
}

.task-title {
	display: block;
	margin: 21rpx 28rpx 0;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.task-desc {
	display: block;
	margin: 16rpx 28rpx 0;
	padding-bottom: 42rpx;
	font-size: 26rpx;
	line-height: 36rpx;
	color: #000000;
	word-break: break-all;
}

.requirement-card {
	margin-top: 20rpx;
	padding: 30rpx 30rpx 30rpx;
	background: #ffffff;
	box-sizing: border-box;
}

.requirement-section {
	min-height: 120rpx;
}

.service-section {
	padding-top: 24rpx;
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx 30rpx;
	margin-top: 20rpx;
}

.profession-tag {
	min-width: 100rpx;
	height: 48rpx;
	line-height: 46rpx;
	padding: 0 26rpx;
	border: 1rpx solid #f37738;
	border-radius: 24rpx;
	background: #fff1e9;
	box-sizing: border-box;
	font-size: 24rpx;
	color: #f37738;
	text-align: center;
	white-space: nowrap;
}

.service-tag-list {
	gap: 20rpx 30rpx;
}

.service-tag {
	display: flex;
	align-items: center;
	height: 48rpx;
	padding: 0 26rpx;
	border-radius: 24rpx;
	background: #f5f5f5;
	box-sizing: border-box;
	font-size: 24rpx;
	color: #000000;
	white-space: nowrap;
}

.check-icon {
	margin-right: 10rpx;
	font-size: 24rpx;
	line-height: 1;
	color: #0dc71e;
	font-weight: 700;
}

.dash-divider {
	margin-top: 30rpx;
	border-top: 2rpx dashed #cecece;
}

.empty-tags {
	margin-top: 20rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #979797;
}

.info-card {
	margin-top: 20rpx;
	padding: 30rpx;
	background: #ffffff;
	box-sizing: border-box;
}

.section-title {
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.info-row {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 24rpx 0;
	border-bottom: 1rpx solid #f1f1f1;
}

.info-row:last-child {
	border-bottom: 0;
}

.info-label {
	flex-shrink: 0;
	font-size: 26rpx;
	line-height: 37rpx;
	color: #979797;
}

.info-value {
	max-width: 470rpx;
	font-size: 26rpx;
	line-height: 37rpx;
	color: #000000;
	text-align: right;
	word-break: break-all;
}

.price-value {
	color: #f37738;
}

.bottom-space {
	height: 120rpx;
}

.bottom-bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	height: 98rpx;
	padding: 17rpx 30rpx;
	background: #ffffff;
	box-shadow: 0 -1rpx 0 #dddddd;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-end;
}

.withdraw-action {
	width: 220rpx;
	height: 64rpx;
	line-height: 64rpx;
	border-radius: 36rpx;
	background: #f37738;
	font-size: 30rpx;
	color: #ffffff;
	text-align: center;
}

.withdraw-action.disabled {
	opacity: 0.65;
}
</style>
