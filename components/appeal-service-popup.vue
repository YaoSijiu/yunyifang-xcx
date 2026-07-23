<template>
	<view v-if="visible" class="appeal-popup-mask" @click="handleClose">
		<view class="appeal-popup" @click.stop="noop">
			<view class="appeal-popup-header">
				<text class="appeal-popup-title">申诉客服</text>
				<view class="appeal-popup-close" @click="handleClose">×</view>
			</view>
			<view class="appeal-popup-body">
				<text class="appeal-popup-desc">请长按识别二维码联系平台客服，或拨打手机号咨询。</text>
				<view class="appeal-qrcode-wrap">
					<image
						v-if="qrcodeUrl"
						class="appeal-qrcode"
						:src="qrcodeUrl"
						mode="aspectFit"
						:show-menu-by-longpress="true"
					></image>
					<text v-else class="appeal-qrcode-placeholder">{{ loading ? '二维码加载中...' : '暂无客服二维码' }}</text>
				</view>
				<view class="appeal-phone-row">
					<view class="appeal-phone-info">
						<text class="appeal-phone-label">平台手机号</text>
						<text class="appeal-phone-value">{{ phoneText }}</text>
					</view>
					<view
						class="appeal-copy-btn"
						:class="{ disabled: !phone || loading }"
						@click.stop="callPhone"
					>拨打</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AppealServicePopup',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		qrcodeUrl: {
			type: String,
			default: ''
		},
		phone: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		phoneText() {
			if (this.loading) {
				return '加载中...'
			}
			return this.phone || '暂未配置'
		}
	},
	methods: {
		noop() {},
		handleClose() {
			this.$emit('close')
		},
		callPhone() {
			if (!this.phone) {
				uni.showToast({
					title: '暂无可拨打手机号',
					icon: 'none'
				})
				return
			}
			uni.makePhoneCall({
				phoneNumber: String(this.phone),
				fail: err => {
					if (err && err.errMsg && err.errMsg.indexOf('cancel') > -1) {
						return
					}
					uni.showToast({
						title: '拨号失败',
						icon: 'none'
					})
				}
			})
		}
	}
}
</script>

<style scoped>
.appeal-popup-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1001;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: 0 24rpx 36rpx;
	box-sizing: border-box;
}

.appeal-popup {
	width: 100%;
	background: #ffffff;
	border-radius: 34rpx 34rpx 26rpx 26rpx;
	padding: 30rpx 30rpx 36rpx;
	box-sizing: border-box;
}

.appeal-popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 22rpx;
}

.appeal-popup-title {
	font-size: 34rpx;
	font-weight: 600;
	color: #222222;
}

.appeal-popup-close {
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

.appeal-popup-body {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.appeal-popup-desc {
	align-self: stretch;
	margin-bottom: 28rpx;
	font-size: 26rpx;
	line-height: 38rpx;
	color: #666666;
}

.appeal-qrcode-wrap {
	width: 300rpx;
	height: 300rpx;
	border-radius: 20rpx;
	background: #f7f7f7;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.appeal-qrcode {
	width: 300rpx;
	height: 300rpx;
	display: block;
}

.appeal-qrcode-placeholder {
	font-size: 26rpx;
	line-height: 38rpx;
	color: #999999;
	text-align: center;
}

.appeal-phone-row {
	width: 100%;
	min-height: 116rpx;
	margin-top: 32rpx;
	padding: 24rpx 22rpx;
	box-sizing: border-box;
	border-radius: 24rpx;
	background: #f8f8f8;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.appeal-phone-info {
	min-width: 0;
	display: flex;
	flex-direction: column;
}

.appeal-phone-label {
	font-size: 24rpx;
	color: #999999;
	margin-bottom: 10rpx;
}

.appeal-phone-value {
	max-width: 450rpx;
	font-size: 30rpx;
	color: #222222;
	word-break: break-all;
}

.appeal-copy-btn {
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

.appeal-copy-btn.disabled {
	background: #dddddd;
	color: #999999;
}
</style>
