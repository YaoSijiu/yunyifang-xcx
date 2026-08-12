<template>
	<view v-if="visible" class="refund-reason-mask" @click="handleMaskClick">
		<view class="refund-reason-panel" @click.stop>
			<view class="refund-reason-toolbar">
				<view class="refund-reason-close" @click="handleClose">×</view>
				<view
					class="refund-reason-confirm"
					:class="{ disabled: loading }"
					@click="handleConfirm"
				>{{ loading ? '确认中' : '确认' }}</view>
			</view>
			<view class="refund-reason-content">
				<text class="refund-reason-title">退款原因</text>
				<scroll-view scroll-y class="refund-reason-list">
					<view
						v-for="reason in reasonList"
						:key="reason"
						class="refund-reason-item"
						@click="selectReason(reason)"
					>
						<text class="refund-reason-text">{{ reason }}</text>
						<view
							class="refund-reason-radio"
							:class="{ active: reason === currentReason }"
						>
							<view v-if="reason === currentReason" class="refund-reason-dot"></view>
						</view>
					</view>
					<textarea
						v-if="currentReason === otherReasonText"
						class="refund-reason-other-input"
						v-model="currentOtherReason"
						placeholder="请输入其他原因"
						placeholder-class="refund-reason-placeholder"
						maxlength="80"
					></textarea>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
const DEFAULT_REASONS = [
	'效果不符预期',
	'沟通不畅',
	'交付超时',
	'需求变更，无需设计',
	'质量不达标',
	'未按要求修改',
	'服务态度不佳',
	'重复/抄袭问题',
	'乙方违约',
	'其他原因'
]

export default {
	name: 'RefundReasonPopup',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		reasons: {
			type: Array,
			default: () => DEFAULT_REASONS
		},
		value: {
			type: String,
			default: ''
		},
		otherReason: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			currentReason: '',
			currentOtherReason: '',
			otherReasonText: '其他原因'
		}
	},
	computed: {
		reasonList() {
			return Array.isArray(this.reasons) && this.reasons.length ? this.reasons : DEFAULT_REASONS
		}
	},
	watch: {
		visible(value) {
			if (value) {
				this.currentReason = this.value || ''
				this.currentOtherReason = this.otherReason || ''
			}
		},
		value(value) {
			if (this.visible) {
				this.currentReason = value || ''
			}
		},
		otherReason(value) {
			if (this.visible) {
				this.currentOtherReason = value || ''
			}
		}
	},
	methods: {
		selectReason(reason) {
			if (this.loading) {
				return
			}
			this.currentReason = reason
			if (reason !== this.otherReasonText) {
				this.currentOtherReason = ''
			}
		},
		handleClose() {
			if (this.loading) {
				return
			}
			this.$emit('close')
		},
		handleMaskClick() {
			this.handleClose()
		},
		handleConfirm() {
			if (this.loading) {
				return
			}
			if (!this.currentReason) {
				uni.showToast({
					title: '请先选择退款原因',
					icon: 'none'
				})
				return
			}
			const otherReason = String(this.currentOtherReason || '').trim()
			if (this.currentReason === this.otherReasonText && !otherReason) {
				uni.showToast({
					title: '请输入其他原因',
					icon: 'none'
				})
				return
			}
			this.$emit('confirm', {
				reason: this.currentReason,
				otherReason,
				finalReason: this.currentReason === this.otherReasonText ? otherReason : this.currentReason
			})
		}
	}
}
</script>

<style scoped>
.refund-reason-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 999;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 0 24rpx 36rpx;
	box-sizing: border-box;
	background: rgba(0, 0, 0, 0.48);
}

.refund-reason-panel {
	width: 100%;
	max-height: 82vh;
	border-radius: 42rpx;
	background: #ffffff;
	overflow: hidden;
	box-sizing: border-box;
}

.refund-reason-toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 112rpx;
	padding: 24rpx 34rpx 0;
	box-sizing: border-box;
}

.refund-reason-close {
	width: 72rpx;
	height: 72rpx;
	line-height: 68rpx;
	text-align: left;
	font-size: 48rpx;
	color: #111111;
}

.refund-reason-confirm {
	min-width: 140rpx;
	height: 56rpx;
	padding: 0 34rpx;
	border-radius: 999rpx;
	background: #F37738;
	line-height: 60rpx;
	text-align: center;
	font-size: 28rpx;
	color: #ffffff;
	box-sizing: border-box;
}

.refund-reason-confirm.disabled {
	opacity: 0.5;
}

.refund-reason-content {
	padding: 26rpx 50rpx 40rpx;
	box-sizing: border-box;
}

.refund-reason-title {
	display: block;
	margin-bottom: 38rpx;
	line-height: 56rpx;
	font-size: 40rpx;
	font-weight: 600;
	color: #000000;
}

.refund-reason-list {
	max-height: 980rpx;
}

.refund-reason-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 86rpx;
	box-sizing: border-box;
}

.refund-reason-text {
	line-height: 42rpx;
	font-size: 30rpx;
	color: #000000;
}

.refund-reason-radio {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 39rpx;
	height: 39rpx;
	border: 4rpx solid #cfcfcf;
	border-radius: 50%;
	box-sizing: border-box;
	flex-shrink: 0;
}

.refund-reason-radio.active {
	border-color: #f37738;
}

.refund-reason-dot {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22rpx;
	height: 22rpx;
	border-radius: 50%;
	background: #f37738;
	flex-shrink: 0;
}

.refund-reason-other-input {
	width: 100%;
	min-height: 128rpx;
	margin: 14rpx 0 20rpx;
	padding: 20rpx 24rpx;
	border: 1rpx solid #e1e1e1;
	border-radius: 16rpx;
	box-sizing: border-box;
	background: #f7f7f7;
	font-size: 28rpx;
	color: #000000;
	line-height: 40rpx;
}

.refund-reason-placeholder {
	color: #999999;
}
</style>
