<template>
	<view class="withdrawal-page">
		<scroll-view class="content-scroll" scroll-y lower-threshold="80" @scrolltolower="loadMore">
			<view class="content">
				<view class="settlement-card pending-card">
					<text class="card-label dark-text">待结算金额</text>
					<view class="amount-line">
						<text class="amount-number dark-text">{{ pendingAmount }}</text>
						<text class="amount-unit dark-text">元</text>
					</view>
				</view>

				<view class="settlement-card available-card">
					<view class="available-info">
						<text class="card-label light-text">可提现到银行卡</text>
						<view class="amount-line">
							<text class="amount-number light-text">{{ availableAmount }}</text>
							<text class="amount-unit light-text">元</text>
						</view>
					</view>
					<view class="withdraw-btn" :class="{ disabled: !canWithdraw || withdrawing }" @click="handleWithdraw">
						{{ withdrawing ? '提现中' : '提现' }}
					</view>
				</view>

				<view class="section-title">待提现订单</view>

				<view class="order-list">
					<view
						v-for="(item, index) in orderList"
						:key="item.withdrawId + '-' + index"
						class="order-card"
						:data-order-no="item.orderNo"
						:data-withdraw-id="item.withdrawId"
						:data-status="item.status"
						:data-amount="item.amount"
						@tap.stop="handleOrderClick"
					>
						<view class="order-main">
							<view class="order-info">
								<text class="order-no">订单号：{{ item.orderNo }}</text>
								<text class="order-date">{{ item.date }}</text>
							</view>
							<view class="order-side">
								<view class="amount-status">
									<text class="order-amount" :class="item.displayAmount >= 0 ? 'amount-plus' : 'amount-minus'">
										{{ formatSignedAmount(item.displayAmount) }}
									</text>
									<text class="order-status">{{ item.statusText }}</text>
								</view>
								<view class="arrow-box">
									<view class="arrow-icon"></view>
								</view>
							</view>
						</view>
					</view>

					<view v-if="!loading && orderList.length === 0" class="empty-state">暂无提现订单</view>
					<view v-if="loading" class="list-tip">加载中...</view>
					<view v-else-if="finished && orderList.length > 0" class="list-tip">没有更多了</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
const WITHDRAWAL_STATUS_MAP = {
	pending_settlement: '待结算',
	pending_withdraw: '未提现',
	withdrawn: '已提现'
}

export default {
	components: {
	},
	data() {
		return {
			pendingAmount: '0',
			availableAmount: '0',
			orderList: [],
			pageNum: 1,
			pageSize: 10,
			total: 0,
			loading: false,
			finished: false,
			requestSeq: 0,
			withdrawing: false,
			hasShown: false
		}
	},
	computed: {
		canWithdraw() {
			return this.orderList.some(item => item.status === 'pending_withdraw')
		}
	},
	onLoad() {
		this.fetchPendingSettlementAmount()
		this.resetList()
	},
	onShow() {
		if (!this.hasShown) {
			this.hasShown = true
			return
		}
		this.fetchPendingSettlementAmount()
		this.resetList()
	},
	methods: {
		goBack() {
			if (getCurrentPages().length > 1) {
				uni.navigateBack()
				return
			}
			uni.switchTab({
				url: '/pages/profile/index'
			})
		},
		loadMore() {
			if (this.loading || this.finished) {
				return
			}
			this.fetchWithdrawalList(this.pageNum + 1, false)
		},
		resetList() {
			this.pageNum = 1
			this.total = 0
			this.finished = false
			this.orderList = []
			this.fetchWithdrawalList(1, true)
		},
		async fetchPendingSettlementAmount() {
			try {
				const res = await this.$request.get('/wechat/withdrawal/pendingSettlementAmount')
				this.pendingAmount = this.extractAmountValue(res)
			} catch (e) {
			}
		},
		async fetchWithdrawalList(pageNum, isRefresh) {
			const currentRequestSeq = ++this.requestSeq
			this.loading = true
			try {
				const res = await this.$request.get('/wechat/withdrawal/page', {
					pageNum,
					pageSize: this.pageSize
				})
				if (currentRequestSeq !== this.requestSeq) {
					return
				}
				const pageData = this.extractPageData(res)
				const rows = pageData.rows.map(item => this.normalizeWithdrawal(item)).filter(Boolean)
				this.pageNum = pageNum
				this.total = Number(pageData.total) || rows.length
				this.orderList = isRefresh ? rows : this.orderList.concat(rows)
				this.finished = rows.length < this.pageSize || this.orderList.length >= this.total
				this.updateAmountSummary()
			} catch (e) {
				if (currentRequestSeq === this.requestSeq) {
					this.finished = isRefresh
				}
			} finally {
				if (currentRequestSeq === this.requestSeq) {
					this.loading = false
				}
			}
		},
		extractPageData(res) {
			const candidates = [res, res && res.data, res && res.data && res.data.data]
			const pageData = candidates.find(item => item && Array.isArray(item.rows))
			if (pageData) {
				return {
					rows: pageData.rows,
					total: pageData.total
				}
			}
			const list = candidates.find(item => Array.isArray(item))
			return {
				rows: list || [],
				total: list ? list.length : 0
			}
		},
		normalizeWithdrawal(item) {
			if (!item || typeof item !== 'object') {
				return null
			}
			const amount = this.parseAmountNumber(item.amount)
			const status = item.status || ''
			const orderNo = item.orderNo || item.order_no || item.orderNumber || item.tOrderNo || item.taskOrderNo || ''
			return {
				withdrawId: item.withdrawId || item.id || '',
				orderNo: orderNo ? String(orderNo) : '',
				amount,
				displayAmount: status === 'withdrawn' ? -amount : amount,
				date: this.formatDate(item.createTime),
				createTime: item.createTime || '',
				status,
				statusText: WITHDRAWAL_STATUS_MAP[status] || status || '未知状态'
			}
		},
		updateAmountSummary() {
			const availableCents = this.orderList.reduce((sum, item) => {
				return item.status === 'pending_withdraw' ? sum + this.parseAmountCents(item.amount) : sum
			}, 0)
			this.availableAmount = this.formatCents(availableCents)
		},
		handleWithdraw() {
			if (!this.canWithdraw || this.withdrawing) {
				uni.showToast({
					title: '暂无可提现订单',
					icon: 'none'
				})
				return
			}
			const withdrawableList = this.orderList.filter(item => item.status === 'pending_withdraw')
			if (withdrawableList.length === 1) {
				this.confirmWithdraw(withdrawableList[0])
				return
			}
			const actionList = withdrawableList.slice(0, 6)
			uni.showActionSheet({
				itemList: actionList.map(item => `${item.orderNo || '未知订单'}  ${this.formatMoney(item.amount)}元`),
				success: res => {
					const target = actionList[res.tapIndex]
					if (target) {
						this.confirmWithdraw(target)
					}
				}
			})
		},
		async confirmWithdraw(item) {
			if (!item || !item.withdrawId || this.withdrawing) {
				return
			}
			const confirmRes = await new Promise(resolve => {
				uni.showModal({
					title: '确认提现',
					content: `确定提现订单${item.orderNo || ''}的${this.formatMoney(item.amount)}元吗？`,
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
				await this.$request.post('/wechat/withdrawal/withdraw', {
					id: item.withdrawId
				}, {
					loading: true,
					loadingText: '提现中...'
				})
				uni.showToast({
					title: '提现成功',
					icon: 'success'
				})
				this.fetchPendingSettlementAmount()
				this.resetList()
			} catch (e) {
			} finally {
				this.withdrawing = false
			}
		},
		handleOrderClick(event) {
			const dataset = event && event.currentTarget ? event.currentTarget.dataset || {} : {}
			const orderNo = dataset.orderNo || ''
			const withdrawId = dataset.withdrawId || ''
			const status = dataset.status || ''
			const amount = dataset.amount || 0
			if (!orderNo) {
				uni.showToast({
					title: '订单编号为空，无法查看详情',
					icon: 'none'
				})
				return
			}
			const params = [
				`orderNo=${encodeURIComponent(String(orderNo))}`,
				`withdrawId=${encodeURIComponent(String(withdrawId || ''))}`,
				`status=${encodeURIComponent(String(status || ''))}`,
				`amount=${encodeURIComponent(String(amount || 0))}`
			]
			const url = `/subpkg-profile/pages/withdrawalcenter/detail/index?${params.join('&')}`
			uni.navigateTo({
				url,
				fail: err => {
					uni.showToast({
						title: (err && err.errMsg) || '订单详情页跳转失败',
						icon: 'none'
					})
				}
			})
		},
		formatSignedAmount(amount) {
			const numberValue = Number(amount) || 0
			const prefix = numberValue > 0 ? '+' : ''
			return `${prefix}${this.formatMoney(numberValue)}`
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
		formatCents(cents) {
			const numberValue = Number(cents) || 0
			return this.formatMoney(numberValue / 100)
		},
		extractAmountValue(res) {
			const candidates = [
				res && res.data,
				res && res.data && res.data.amount,
				res && res.data && res.data.pendingSettlementAmount,
				res && res.amount,
				res && res.pendingSettlementAmount,
				res
			]
			const amount = candidates.find(item => item !== null && item !== undefined && item !== '' && !Number.isNaN(Number(item)))
			return this.formatMoney(amount || 0)
		},
		parseAmountNumber(value) {
			const numberValue = Number(value)
			return Number.isNaN(numberValue) ? 0 : numberValue
		},
		parseAmountCents(value) {
			const numberValue = Number(value)
			if (Number.isNaN(numberValue)) {
				return 0
			}
			return Math.round(numberValue * 100)
		},
		formatDate(value) {
			if (!value) {
				return '--'
			}
			return String(value).slice(0, 10).replace(/-/g, '/')
		}
	}
}
</script>

<style scoped>
page {
	background: #f7f7f7;
}

.withdrawal-page {
	width: 750rpx;
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
	background: #f7f7f7;
}

.content-scroll {
	flex: 1;
	height: 0;
}

.content {
	padding: 20rpx 30rpx 48rpx;
	box-sizing: border-box;
}

.settlement-card {
	width: 690rpx;
	border-radius: 16rpx;
	box-sizing: border-box;
}

.pending-card {
	height: 206rpx;
	padding: 42rpx 38rpx 30rpx;
	background: #dadada;
}

.available-card {
	height: 192rpx;
	margin-top: 34rpx;
	padding: 33rpx 31rpx 29rpx 38rpx;
	background: #f37738;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.available-info {
	display: flex;
	flex-direction: column;
}

.card-label {
	font-size: 28rpx;
	line-height: 40rpx;
}

.dark-text {
	color: #000000;
}

.light-text {
	color: #ffffff;
}

.amount-line {
	display: flex;
	align-items: flex-end;
	margin-top: 16rpx;
}

.amount-number {
	font-size: 60rpx;
	line-height: 75rpx;
}

.amount-unit {
	margin-left: 16rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	padding-bottom: 10rpx;
}

.withdraw-btn {
	width: 144rpx;
	height: 64rpx;
	line-height: 64rpx;
	border-radius: 999rpx;
	background: #ffffff;
	font-size: 28rpx;
	color: #f37738;
	text-align: center;
	flex-shrink: 0;
}

.withdraw-btn.disabled {
	opacity: 0.65;
}

.section-title {
	margin: 36rpx 0 20rpx 7rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #000000;
}

.order-list {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.order-card {
	width: 690rpx;
	height: 126rpx;
	padding: 0 16rpx 0 23rpx;
	border-radius: 16rpx;
	background: #ffffff;
	box-sizing: border-box;
}

.order-main {
	height: 126rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.order-info {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.order-no {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #000000;
}

.order-date {
	margin-top: 9rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #979797;
}

.order-side {
	display: flex;
	align-items: center;
}

.amount-status {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-right: 20rpx;
}

.order-amount {
	font-size: 26rpx;
	line-height: 37rpx;
}

.amount-plus {
	color: #000000;
}

.amount-minus {
	color: #f37738;
}

.order-status {
	margin-top: 7rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: rgba(0, 0, 0, 0.4);
}

.arrow-box {
	width: 32rpx;
	height: 32rpx;
	border: 1rpx dashed #c8c8c8;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.arrow-icon {
	width: 10rpx;
	height: 10rpx;
	border-top: 2rpx solid #979797;
	border-right: 2rpx solid #979797;
	transform: rotate(45deg);
}

.empty-state,
.list-tip {
	width: 690rpx;
	padding: 32rpx 0;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #979797;
	text-align: center;
}
</style>
