<template>
	<view class="page-container">
		<!-- 顶部输入框 -->
		<view class="input-area">
			<input class="tag-input" v-model="newTag" placeholder="输入新标签" confirm-type="done" @confirm="addTag" />
			<view class="add-btn" @click="addTag">添加</view>
		</view>

		<!-- 标签列表 -->
		<view class="tag-list">
			<view class="tag-item" v-for="(item, index) in tags" :key="item.id || index"
				:class="{ active: selectedTags.includes(item.tagName.trim()) }" :data-item="item" @click="toggleTag"
				:style="{ animationDelay: `${index * 30}ms` }">
				<text>{{ item.tagName }}</text>
				<text class="delete-icon" :data-item="item" @click.stop="deleteTag">×</text>
			</view>
		</view>

		<!-- 底部保存按钮 -->
		<view class="footer">
			<button class="save-btn" @click="saveTags">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newTag: '',
				tags: [],
				selectedTags: [],
				isTeamMode: false,
				teamOwnerId: 0
			};
		},
		onLoad(options) {
			this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
			this.teamOwnerId = uni.getStorageSync('teamOwnerId')
			this.getUserTags();
		},
		methods: {
			async getUserTags() {
				let url = '/wechat/tag/list';
				if (this.isTeamMode && this.teamOwnerId) {
					url += `?userId=${this.teamOwnerId}`;
				}
				const {
					data,
					code
				} = await this.$request.get(url)
				if (code == 200) {
					this.tags = data
				}
			},
			// 新增标签
			addTag() {
				if (!this.newTag.trim()) return;
				// 正确检查标签是否已存在，使用some方法遍历tags数组并比较trim后的标签名
				if (this.tags.some(item => item.tagName.trim() === this.newTag.trim())) {
					uni.showToast({
						title: '标签已存在',
						icon: 'none'
					});
					return;
				}
				// this.tags.unshift(this.newTag);
				// this.selectedTags.push(this.newTag); // Auto select new tag
				// this.newTag = '';

				const param = {
					tagName: this.newTag
				}
				if (this.isTeamMode && this.teamOwnerId) {
					param.userId=this.teamOwnerId
				}
				this.$request.post('/wechat/tag', param).then(res => {
					if (res.code == 200) {
						this.getUserTags()
						uni.showToast({
							title: '新增标签成功',
							icon: 'none'
						});
					}
				})

			},
			deleteTag(e) {

				const item = e.currentTarget.dataset.item
				console.log("id", item)
				// const tag = this.tags[index];
				// this.tags.splice(index, 1);
				// this.selectedTags = this.selectedTags.filter(t => t !== tag);
				this.$request.delete(`/wechat/tag/${item.id}`).then(res => {
					if (res.code == 200) {
						this.getUserTags()
						uni.showToast({
							title: '删除标签成功',
							icon: 'none'
						});
					}
				})
			},
			toggleTag(e) {
				const item = e.currentTarget.dataset.item
				const tag = item.tagName
				console.log("点击tag", item)
				// 去除标签名称中的空格，避免因空格导致的匹配问题
				const trimmedTag = tag.trim();
				const index = this.selectedTags.indexOf(trimmedTag);
				if (index > -1) {
					this.selectedTags.splice(index, 1);
				} else {
					this.selectedTags.push(trimmedTag);
				}
			},
			saveTags() {
				// Return tags to previous page
				const pages = getCurrentPages();
				const prevPage = pages[pages.length - 2];
				// Assuming prevPage has a method to updateTags
				if (prevPage && prevPage.$vm.updateTags) {
					prevPage.$vm.updateTags(this.selectedTags);
				}
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		padding: 30rpx;
		background-color: #fff;
		min-height: 100vh;
	}

	.input-area {
		display: flex;
		margin-bottom: 40rpx;

		.tag-input {
			flex: 1;
			height: 80rpx;
			background: #f5f5f5;
			border-radius: 40rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
		}

		.add-btn {
			width: 120rpx;
			height: 80rpx;
			background: #333;
			color: #fff;
			border-radius: 40rpx;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			transition: all 0.3s ease;
		}

		.add-btn:active {
			transform: scale(0.95);
			opacity: 0.9;
		}
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		min-height: 40rpx;
	}

	.tag-item {
		padding: 16rpx 30rpx;
		background: #f5f5f5;
		border-radius: 30rpx;
		font-size: 26rpx;
		color: #666;
		position: relative;
		display: flex;
		align-items: center;
		animation: tagFadeIn 0.4s ease-out forwards;
		transform-origin: center center;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

		&.active {
			background: #333;
			color: #fff;
			transform: scale(1.05);
		}

		&:hover {
			transform: scale(1.05);
		}

		.delete-icon {
			margin-left: 10rpx;
			font-size: 30rpx;
			opacity: 0.5;
			transition: all 0.2s ease;
		}

		&:hover .delete-icon {
			opacity: 1;
			transform: scale(1.1);
		}
	}

	/* 标签进入动画 */
	@keyframes tagFadeIn {
		0% {
			opacity: 0;
			transform: scale(0.8);
			translateY: 20rpx;
		}

		100% {
			opacity: 1;
			transform: scale(1);
			translateY: 0;
		}
	}

	.footer {
		position: fixed;
		bottom: 40rpx;
		left: 30rpx;
		right: 30rpx;
	}

	.save-btn {
		background: #FF6B00;
		color: #fff;
		font-weight: bold;
		border-radius: 50rpx;
		transition: all 0.3s ease;
	}

	.save-btn:active {
		transform: scale(0.95);
		opacity: 0.9;
	}
</style>