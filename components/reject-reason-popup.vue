<template>
	<view v-if="visible" class="reject-popup">
		<view class="reject-mask" @click="handleClose" @touchmove.stop.prevent></view>
		<view class="reject-panel" @click.stop>
			<view class="reject-toolbar">
				<view class="reject-close" @click="handleClose">
					<view class="close-line close-line-left"></view>
					<view class="close-line close-line-right"></view>
				</view>
				<view
					class="reject-confirm"
					:class="{ disabled: loading }"
					@click.stop="handleConfirm"
				>{{ loading ? '确认中' : '确认' }}</view>
			</view>

			<scroll-view class="reject-body" scroll-y>
				<text class="reject-title">婉拒理由</text>
				<view class="reason-list">
					<view
						v-for="reason in reasonList"
						:key="reason"
						class="reason-item"
						@click.stop="selectReason(reason)"
					>
						<text class="reason-text">{{ reason }}</text>
						<view class="reason-radio" :class="{ active: selectedReason === reason }">
							<view v-if="selectedReason === reason" class="reason-radio-dot"></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
const DEFAULT_REASONS = [
	'需求暂不清晰，暂不承接',
	'档期已满，暂不接单',
	'擅长领域不符',
	'预算不符，暂不合作',
	'时间紧张，怕影响效果',
	'感谢信任，暂不合作'
]

export default {
	name: 'RejectReasonPopup',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		reasons: {
			type: Array,
			default: () => DEFAULT_REASONS
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selectedReason: ''
		}
	},
	computed: {
		reasonList() {
			return this.reasons && this.reasons.length ? this.reasons : DEFAULT_REASONS
		}
	},
	watch: {
		visible(value) {
			if (value) {
				this.selectedReason = ''
			}
		}
	},
	methods: {
		selectReason(reason) {
			if (this.loading) {
				return
			}
			this.selectedReason = reason
		},
		handleClose() {
			if (this.loading) {
				return
			}
			this.$emit('close')
		},
		handleConfirm() {
			if (this.loading) {
				return
			}
			if (!this.selectedReason) {
				uni.showToast({
					title: '请选择婉拒理由',
					icon: 'none'
				})
				return
			}
			this.$emit('confirm', this.selectedReason)
		}
	}
}
</script>

<style scoped>
.reject-popup {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 9999;
}

.reject-mask {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.28);
}

.reject-panel {
	position: absolute;
	left: 24rpx;
	right: 24rpx;
	bottom: 24rpx;
	max-height: 82vh;
	padding: 34rpx 46rpx 44rpx;
	border-radius: 40rpx 40rpx 40rpx 40rpx;
	background: #ffffff;
	box-sizing: border-box;
	box-shadow: 0 -16rpx 46rpx rgba(0, 0, 0, 0.08);
}

.reject-toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 64rpx;
}

.reject-close {
	position: relative;
	width: 72rpx;
	height: 72rpx;
	margin-left: -16rpx;
}

.close-line {
	position: absolute;
	left: 21rpx;
	top: 34rpx;
	width: 32rpx;
	height: 4rpx;
	border-radius: 4rpx;
	background: #111111;
}

.close-line-left {
	transform: rotate(45deg);
}

.close-line-right {
	transform: rotate(-45deg);
}

.reject-confirm {
	width: 140rpx;
	height: 56rpx;
	padding: 0 34rpx;
	border-radius: 999rpx;
	box-sizing: border-box;
	background: #f37738;
	line-height: 56rpx;
	font-size: 28rpx;
	color: #ffffff;
	text-align: center;
}

.reject-confirm.disabled {
	opacity: 0.7;
}

.reject-body {
	max-height: calc(82vh - 138rpx);
	margin-top: 42rpx;
}

.reject-title {
	display: block;
	line-height: 50rpx;
	font-size: 36rpx;
	font-weight: 600;
	color: #111111;
}

.reason-list {
	margin-top: 36rpx;
}

.reason-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 82rpx;
	box-sizing: border-box;
}

.reason-item + .reason-item {
	margin-top: 4rpx;
}

.reason-text {
	flex: 1;
	padding-right: 30rpx;
	line-height: 42rpx;
	font-size: 30rpx;
	color: #111111;
	word-break: break-all;
}

.reason-radio {
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

.reason-radio.active {
	border-color: #f37738;
}

.reason-radio-dot {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22rpx;
	height: 22rpx;
	border-radius: 50%;
	background: #f37738;
	flex-shrink: 0;
}
</style>
