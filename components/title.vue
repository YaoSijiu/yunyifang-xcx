<!-- /components/title.vue -->
<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status-bar" :style="statusBarStyle"></view>

		<!-- 标题栏 -->
		<view class="title-bar" :class="{ fixed: fixed }" :style="titleBarStyle">
			<view v-if="showBack" class="back-button" @click="onBackClick">
				<view class="back-arrow"></view>
			</view>
			<view class="placeholder" v-if="showBack"></view>

			<view class="title-text">{{ title }}</view>

			<view class="right-slot">
				<slot name="right"></slot>
			</view>
		</view>

		<!-- fixed 模式下需要占位 -->
		<view v-if="fixed" class="fixed-placeholder" :style="placeholderStyle"></view>
	</view>
</template>

<script>
export default {
	name: 'TitleBar',
	props: {
		title: {
			type: String,
			default: ''
		},
		showBack: {
			type: Boolean,
			default: true
		},
		fixed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			statusBarHeight: 0
		}
	},
	computed: {
		statusBarStyle() {
			return 'height: ' + this.statusBarHeight + 'px'
		},
		titleBarStyle() {
			if (this.fixed) {
				return 'padding-top: ' + this.statusBarHeight + 'px'
			}
			return ''
		},
		placeholderStyle() {
			return 'height: ' + (this.statusBarHeight + 44) + 'px'
		}
	},
	mounted() {
		// 获取状态栏高度
		const windowInfo = uni.getWindowInfo()
		this.statusBarHeight = windowInfo.statusBarHeight || 20
	},
	methods: {
		onBackClick() {
			this.$emit('back')
			const pages = getCurrentPages()
			if (pages.length > 1) {
				uni.navigateBack()
			} else {
				uni.switchTab({
					url: '/pages/profile/index'
				})
			}
		}
	}
}
</script>

<style scoped>
/* 状态栏占位 */
.status-bar {
	width: 100%;
	background: #ffffff;
}

/* 标题栏 */
.title-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 44px;
	padding: 0 15rpx;
	background: #ffffff;
	position: relative;
}

.title-bar.fixed {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	height: auto;
}

.fixed-placeholder {
	width: 100%;
}

.back-button {
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.back-arrow {
	width: 12px;
	height: 12px;
	border-left: 2.5px solid #333333;
	border-bottom: 2.5px solid #333333;
	transform: rotate(45deg);
	margin-left: 2px;
}

.title-text {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	font-size: 38rpx;
	font-weight: 500;
	color: #333333;
	text-align: center;
	max-width: 400rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.placeholder {
	width: 44px;
	height: 44px;
	flex-shrink: 0;
}

.right-slot {
	flex-shrink: 0;
	display: flex;
	align-items: center;
}
</style>
