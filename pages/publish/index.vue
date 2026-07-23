<template>
	<view class="placeholder-page">
		<view class="content">
			<text class="title">发布</text>
			<text class="desc">快速发布你的作品案例，获取更多曝光。</text>
		</view>
		<yun-tabbar :selected="2"></yun-tabbar>
	</view>
</template>

<script>
export default {
	onShow() {
		uni.hideTabBar({
			animation: false
		});
	}
};
</script>

<style scoped>
.placeholder-page {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #fdfdfd;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #555;
	padding-bottom: 160rpx;
}

.title {
	font-size: 36rpx;
	font-weight: 600;
	margin-bottom: 12rpx;
}

.desc {
	font-size: 26rpx;
	color: #999;
}
</style>
