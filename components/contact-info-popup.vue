<template>
	<view v-if="visible" class="contact-popup-mask" @click="handleClose">
		<view class="contact-popup" @click.stop="noop">
			<view class="contact-popup-header">
				<text class="contact-popup-title">联系方式</text>
				<view class="contact-popup-close" @click="handleClose">×</view>
			</view>
			<view class="contact-popup-body">
				<view class="contact-popup-row">
					<view class="contact-popup-info">
						<text class="contact-popup-label">手机号</text>
						<text class="contact-popup-value">{{ phoneText }}</text>
					</view>
					<view
						class="contact-popup-copy"
						:class="{ disabled: !phone }"
						@click.stop="copyText(phone)"
					>复制</view>
				</view>
				<view class="contact-popup-row">
					<view class="contact-popup-info">
						<text class="contact-popup-label">微信号</text>
						<text class="contact-popup-value">{{ wxNumberText }}</text>
					</view>
					<view
						class="contact-popup-copy"
						:class="{ disabled: !wechatValue }"
						@click.stop="copyText(wechatValue)"
					>复制</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ContactInfoPopup',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		phone: {
			type: String,
			default: ''
		},
		wxNumber: {
			type: String,
			default: ''
		},
		wechat: {
			type: String,
			default: ''
		}
	},
	computed: {
		phoneText() {
			return this.phone || '未填写'
		},
		wechatValue() {
			return this.wechat || this.wxNumber
		},
		wxNumberText() {
			return this.wechatValue || '未填写'
		}
	},
	methods: {
		noop() {},
		handleClose() {
			this.$emit('close')
		},
		copyText(value) {
			if (!value) {
				uni.showToast({
					title: '暂无可复制内容',
					icon: 'none'
				})
				return
			}
			uni.setClipboardData({
				data: String(value),
				success: () => {
					uni.showToast({
						title: '复制成功',
						icon: 'success'
					})
				}
			})
		}
	}
}
</script>

<style scoped>
.contact-popup-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 999;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 0 24rpx 36rpx;
	box-sizing: border-box;
}

.contact-popup {
	width: 100%;
	background: #ffffff;
	border-radius: 32rpx 32rpx 24rpx 24rpx;
	padding: 30rpx 30rpx 36rpx;
	box-sizing: border-box;
}

.contact-popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 22rpx;
}

.contact-popup-title {
	font-size: 34rpx;
	font-weight: 600;
	color: #222222;
}

.contact-popup-close {
	width: 58rpx;
	height: 58rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999999;
	font-size: 42rpx;
	line-height: 58rpx;
}

.contact-popup-body {
	background: #f8f8f8;
	border-radius: 24rpx;
	overflow: hidden;
}

.contact-popup-row {
	min-height: 116rpx;
	padding: 24rpx 22rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.contact-popup-row + .contact-popup-row {
	border-top: 1rpx solid #eeeeee;
}

.contact-popup-info {
	min-width: 0;
	display: flex;
	flex-direction: column;
}

.contact-popup-label {
	font-size: 24rpx;
	color: #999999;
	margin-bottom: 10rpx;
}

.contact-popup-value {
	max-width: 480rpx;
	font-size: 30rpx;
	color: #222222;
	word-break: break-all;
}

.contact-popup-copy {
	flex-shrink: 0;
	height: 52rpx;
	min-width: 104rpx;
	padding: 0 28rpx;
	border-radius: 999rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 22rpx;
	box-sizing: border-box;
}

.contact-popup-copy.disabled {
	background: #dddddd;
	color: #999999;
}
</style>
