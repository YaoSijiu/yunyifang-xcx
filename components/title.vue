<!-- /components/title.vue -->
<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		
		<!-- 标题栏 -->
		<view class="title-bar">
			<view v-if="showBack" class="back-button" @click="onBackClick">
				<image src="/static/common/left.png" mode="aspectFit"></image>
			</view>
			<view class="placeholder" v-if="showBack"></view>
			
			<view class="title-text">{{ title }}</view>
			
			<view class="placeholder"></view>
		</view>
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
		}
	},
	data() {
		return {
			statusBarHeight: 0
		}
	},
	mounted() {
		// 获取状态栏高度
		const systemInfo = uni.getSystemInfoSync()
		this.statusBarHeight = systemInfo.statusBarHeight || 20
	},
	methods: {
		onBackClick() {
			this.$emit('back')
			const pages = getCurrentPages()
			if (pages.length > 1) {
				uni.navigateBack()
			}else{
				uni.switchTab({
					url:'/pages/profile/index'
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
	background: #ffffff; /* 与标题栏背景色一致 */
}

/* 标题栏 */
.title-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 44px; /* 标准导航栏高度 */
	padding: 0 15rpx;
	background: #ffffff;
	position: relative;
}

.back-button {
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-button image {
	width: 20px;
	height: 20px;
}

.title-text {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	font-size: 38rpx;
	font-weight: 500;
	color: #333333;
	text-align: center;
}

.placeholder {
	width: 44px;
	height: 44px;
}
</style>