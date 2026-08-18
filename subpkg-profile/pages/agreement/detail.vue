<template>
	<view class="page-container">
		<view class="agreement-body" v-if="detail">
			<view class="agreement-title">{{ detail.title }}</view>
			<rich-text :nodes="detail.content || ''" class="agreement-content"></rich-text>
		</view>
		<view v-else-if="!loading" class="empty-tip">协议内容不存在</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				detail: null,
				loading: true
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.fetchDetail();
			} else {
				this.loading = false;
			}
		},
		methods: {
			fetchDetail() {
				this.loading = true;
				this.$request.get('/wechat/agreement/' + this.id).then(res => {
					this.detail = res.data;
					if (this.detail && this.detail.title) {
						uni.setNavigationBarTitle({
							title: this.detail.title
						});
					}
				}).finally(() => {
					this.loading = false;
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page-container {
		min-height: 100vh;
		background-color: #ffffff;
	}

	.agreement-body {
		padding: 40rpx 36rpx 80rpx;
	}

	.agreement-title {
		font-size: 38rpx;
		font-weight: 600;
		color: #1a1a1a;
		text-align: center;
		margin-bottom: 36rpx;
	}

	/* rich-text 渲染的富文本正文 */
	.agreement-content {
		font-size: 28rpx;
		color: #555555;
		line-height: 1.85;
	}

	.empty-tip {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
		padding-top: 200rpx;
	}
</style>
