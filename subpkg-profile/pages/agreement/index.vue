<template>
	<view class="page-container">
		<view class="agreement-list" v-if="list.length">
			<view class="agreement-item" v-for="item in list" :key="item.agreementId" @click="goDetail(item.agreementId)">
				<view class="item-main">
					<view class="item-title">{{ item.title }}</view>
					<view class="item-sub">{{ item.sub }}</view>
				</view>
				<view class="item-arrow"></view>
			</view>
		</view>
		<view v-else-if="!loading" class="empty-tip">暂无协议内容</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading: true
			};
		},
		onLoad() {
			this.fetchList();
		},
		methods: {
			fetchList() {
				this.loading = true;
				this.$request.get('/wechat/agreement/list').then(res => {
					this.list = res.data || [];
				}).finally(() => {
					this.loading = false;
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/subpkg-profile/pages/agreement/detail?id=${id}`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page-container {
		min-height: 100vh;
		background-color: #f5f7fa;
		padding: 24rpx 30rpx 40rpx;
	}

	.agreement-list {
		display: flex;
		flex-direction: column;
	}

	.agreement-item {
		display: flex;
		align-items: center;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 34rpx 30rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);
	}

	.item-main {
		flex: 1;
		min-width: 0;
	}

	.item-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #1a1a1a;
		margin-bottom: 14rpx;
		line-height: 1.4;
	}

	.item-sub {
		font-size: 25rpx;
		color: #999999;
		line-height: 1.55;
	}

	.item-arrow {
		width: 16rpx;
		height: 16rpx;
		border-top: 3rpx solid #cccccc;
		border-right: 3rpx solid #cccccc;
		transform: rotate(45deg);
		margin-left: 20rpx;
		flex-shrink: 0;
	}

	.empty-tip {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
		padding-top: 200rpx;
	}
</style>
