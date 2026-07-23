<template>
	<!-- 添加作品集弹窗 -->
	<block v-if="mode === 'portfolio'">
		<view class="work-popup-mask" v-if="show" @click="handleMaskClick" @touchmove.stop.prevent>
			<view class="add-portfolio-content" @click.stop>
				<!-- 顶部操作栏 -->
				<view class="add-portfolio-header">
					<image src="/static/home/关闭.png" class="close-btn" @click="close" />
					<view v-if="mode != 'portfolio'" class="title-header">
						<text class="title-text">标题({{ getTitle() }})</text>
					</view>
					<view class="confirm-btn" @click="confirm" :class="{ disabled: !isValidSelection() }">
						{{ mode === 'portfolio' ? '完成' : '确认' }}
					</view>
				</view>

				<!-- 提示文字 - 只显示在作品集模式 -->
				<view  class="add-portfolio-hint">
					<view class="hint-title">轻点作品集封面</view>
					<view class="hint-subtitle">将作品集逐一选入</view>
				</view>

				<!-- 已选数量 - 只显示在作品集模式 -->
				<view v-if="mode === 'portfolio'" class="selected-info">
					已选入 {{ selectedPortfolios.length }} 个作品集
				</view>

				<!-- 作品集列表 -->
				<scroll-view v-if="mode === 'portfolio'" class="portfolio-list-container" scroll-y="true">
					<!-- 空状态 -->
					<view v-if="portfolioList.length === 0" class="empty-portfolio-list">
						<image src="/static/yunyiku/没有.png" class="empty-icon" mode="aspectFit"></image>
						<text class="empty-text">暂无作品集</text>
					</view>

					<!-- 作品集项 -->
					<view class="portfolio-list-item" v-for="item in portfolioList" :key="item.id">
						<view @click="toggleSelection(item)">
							<!-- 作品集封面图片 -->
							<view class="portfolio-item-cover-container">
								<!-- 显示实际图片 -->
								<view class="portfolio-item-cover" v-for="(url, index) in (item.workCoverUrls || []).slice(0, 3)" :key="'img-' + index">
									<image
										:src="buildOssImageUrl(url)"
										class="cover-image"
										mode="aspectFill">
									</image>
								</view>
								<!-- 显示占位符 -->
								<view class="portfolio-item-cover" v-for="index in (3 - Math.min((item.workCoverUrls || []).length, 3))" :key="'placeholder-' + index">
									<view class="cover-image-placeholder"></view>
								</view>
							</view>

							<!-- 作品集信息 -->
							<view class="portfolio-item-info">
								<view class="info-row">
									<text class="portfolio-item-name">{{ item.name }}</text>
								</view>
								<text class="portfolio-item-tags">包含{{ item.tags }}个标签</text>
							</view>
						</view>

						<!-- 选择按钮（圆形） -->
						<view class="portfolio-select-btn" @click="toggleSelection(item)">
							<view v-if="isSelected(item.id)" class="selected-circle active">
								<image src="/static/icon/选中.png" class="selected-circle"></image>
							</view>
							<view v-else class="selected-circle">
								<image src="/static/icon/未选中.png" class="selected-circle"></image>
							</view>
						</view>
					</view>
				</scroll-view>

				<!-- 标题编辑模式 -->
				<view v-if="mode === 'title-edit'" class="title-edit-container">
					<view class="title-edit-input-container">
						<input v-model="editValue" class="title-edit-input" :placeholder="getPlaceholder()"
							maxlength="20" :type="editConfig.type || 'text'" />
						<view class="title-edit-counter">{{ editValue.length }}/20</view>
					</view>

					<view v-if="editConfig.description" class="title-edit-description">
						{{ editConfig.description }}
					</view>
				</view>
			</view>
		</view>
	</block>
	<block v-else>
		<view class="work-popup-mask" v-if="show" @click="handleMaskClick" @touchmove.stop.prevent>
			<view class="add-portfolio-content2" @click.stop>
				<!-- 顶部操作栏 -->
				<view class="add-portfolio-header">
					<image src="/static/home/关闭.png" class="close-btn" @click="close" />
					<view v-if="mode != 'portfolio'" class="title-header">
						<text class="title-text">{{ getTitle() }}</text>
					</view>
					<view class="confirm-btn" @click="confirm" :class="{ disabled: !isValidSelection() }">
						{{ mode === 'portfolio' ? '完成' : '确认' }}
					</view>
				</view>

				<!-- 标题编辑模式 -->
				<view v-if="mode === 'title-edit'" class="title-edit-container">
					<view class="title-edit-input-container">
						<input v-model="editValue" class="title-edit-input" :placeholder="getPlaceholder()"
							maxlength="20" :type="editConfig.type || 'text'" />
						<view class="title-edit-counter">{{ editValue.length }}/20</view>
					</view>

					<view v-if="editConfig.description" class="title-edit-description">
						{{ editConfig.description }}
					</view>
				</view>
			</view>
		</view>
	</block>
</template>

<script>
	import buildOssImageUrl from '@/utils/imageUtil.js'

	export default {
		name: 'portfolio-select',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			portfolioList: {
				type: Array,
				default: () => []
			},
			selectedIds: {
				type: Array,
				default: () => []
			},
			// 新增：模式选择
			mode: {
				type: String,
				default: 'portfolio', // 'portfolio' 或 'title-edit'
				validator: value => ['portfolio', 'title-edit'].includes(value)
			},
			// 新增：标题编辑配置（mode为title-edit时使用）
			editConfig: {
				type: Object,
				default: () => ({
					title: '编辑标题',
					placeholder: '请输入标题',
					value: '',
					type: 'text',
					description: ''
				})
			}
		},
		data() {
			return {
				selectedPortfolios: [],
				editValue: ''
			}
		},
		watch: {
			selectedIds: {
				immediate: true,
				handler(newVal) {
					this.selectedPortfolios = [...newVal]
				}
			},
			editConfig: {
				immediate: true,
				handler(newVal) {
					this.editValue = newVal.value || ''
				}
			},
			show(newVal) {
				if (newVal && this.mode === 'title-edit') {
					this.editValue = this.editConfig.value || ''
				} else if (this.mode === 'portfolio') {
					// 每次打开弹窗都清空选中状态
					this.selectedPortfolios = [];
				}
			}
		},
		methods: {
			buildOssImageUrl,

			getTagCount(item) {
				if (!item || !item.tags) return 0;

				try {
					const tags = JSON.parse(item.tags);
					return Array.isArray(tags) ? tags.length : 0;
				} catch (e) {
					return 0;
				}
			},

			isSelected(portfolioId) {
				return this.selectedPortfolios.includes(portfolioId);
			},

			toggleSelection(item) {
				const index = this.selectedPortfolios.indexOf(item.id);
				if (index === -1) {
					this.selectedPortfolios.push(item.id);
				} else {
					this.selectedPortfolios.splice(index, 1);
				}
			},

			isValidSelection() {
				if (this.mode === 'portfolio') {
					return this.selectedPortfolios.length > 0;
				} else if (this.mode === 'title-edit') {
					return this.editValue.trim().length > 0;
				}
				return false;
			},

			getTitle() {
				return this.mode === 'portfolio' ? '添加作品集' : this.editConfig.title;
			},

			getPlaceholder() {
				return this.editConfig.placeholder || '请输入';
			},

			handleMaskClick() {
				this.$emit('close');
			},

			close() {
				this.$emit('close');
			},

			confirm() {
				if (!this.isValidSelection()) {
					const message = this.mode === 'portfolio' ?
						'请至少选择一个作品集' :
						'请输入内容';

					uni.showToast({
						title: message,
						icon: 'none'
					});
					return;
				}

				if (this.mode === 'portfolio') {
					this.$emit('confirm', this.selectedPortfolios);
				} else if (this.mode === 'title-edit') {
					this.$emit('confirm', this.editValue.trim());
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.work-popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		align-items: flex-end;
	}

	.add-portfolio-content {
		position: fixed;
		top: 200rpx;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		border-radius: 32rpx;
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		margin: 20rpx;

	}

	.add-portfolio-content2 {
		position: fixed;
		top: 200rpx;
		left: 0;
		right: 0;
		background: #fff;
		border-radius: 32rpx;
		min-height: 20vh;
		display: flex;
		flex-direction: column;
		margin: 20rpx;

	}

	/* 顶部操作栏 */
	.add-portfolio-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx 32rpx 24rpx;
		border-bottom: 1rpx solid #f0f0f0;
		height: 110rpx;
		box-sizing: border-box;
	}

	.title-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
	}

	.title-text {
		font-size: 28rpx;
		color: #999999;
		font-weight: 500;
		margin-left: 20rpx;
	}

	.close-btn {
		width: 40rpx;
		height: 40rpx;
	}

	.confirm-btn {
		font-size: 32rpx;
		color: #fff;
		font-weight: 500;
		padding: 16rpx;
		background-color: #000;
		width: 140rpx;
		height: 36rpx;
		line-height: 36rpx;
		align-items: center;
		text-align: center;
		border-radius: 50rpx;
	}

	.confirm-btn.disabled {
		background-color: #ccc;
		color: #fff;
	}

	/* 提示文字 */
	.add-portfolio-hint {
		padding: 40rpx 32rpx 20rpx;
		text-align: left;
	}

	.hint-title {
		font-size: 36rpx;
		color: #000;
		font-weight: 700;
		margin-bottom: 8rpx;
	}

	.hint-subtitle {
		font-size: 36rpx;
		font-weight: 700;
		color: #000;
	}

	/* 已选数量 */
	.selected-info {
		font-size: 26rpx;
		color: #000;
		text-align: left;
		margin: 20rpx 32rpx 20rpx;
		border-radius: 8rpx;
	}

	/* 作品集列表容器 */
	.portfolio-list-container {
		flex: 1;
		overflow-y: auto;
	}

	/* 标题编辑容器 */
	.title-edit-container {
		flex: 1;
		padding: 20rpx 32rpx;
	}

	.title-edit-input-container {
		margin: 20rpx 0;
		padding: 20rpx;
		background: #f5f5f5;
		border-radius: 16rpx;
		position: relative;
	}

	.title-edit-input {
		width: 100%;
		height: 80rpx;
		font-size: 32rpx;
		color: #333;
		background: transparent;
		border: none;
		outline: none;
	}

	.title-edit-counter {
		position: absolute;
		right: 20rpx;
		bottom: 10rpx;
		font-size: 24rpx;
		color: #999;
	}

	.title-edit-description {
		font-size: 24rpx;
		color: #999;
		margin-top: 16rpx;
		line-height: 1.4;
	}

	/* 作品集项样式保持不变 */
	.empty-portfolio-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 400rpx;
	}

	.empty-icon {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 24rpx;
		opacity: 0.5;
	}

	.empty-text {
		font-size: 28rpx;
		color: #999;
	}

	.portfolio-list-item {
		display: flex;
		align-items: flex-start;
		padding: 20rpx 32rpx;
		border-bottom: 1rpx solid #f0f0f0;
		position: relative;
	}

	.portfolio-item-cover-container {
		display: flex;
		align-items: center;
		gap: 12rpx;
		margin-right: 24rpx;
	}

	.portfolio-item-cover {
		width: 180rpx;
		height: 180rpx;
		border-radius: 16rpx;
		overflow: hidden;
		position: relative;
		flex-shrink: 0;
		background-color: #f5f5f5;
	}

	.cover-image-placeholder {
		width: 100%;
		height: 100%;
		background-color: #fff;
		border-radius: 16rpx;
	}

	.portfolio-item-cover.grid-cover {
		width: 100%;
		height: 200rpx;
		border-radius: 12rpx;
		overflow: hidden;
		display: flex;
	}

	.cover-full {
		width: 100%;
		height: 100%;
	}

	.cover-half {
		width: 50%;
		height: 100%;
		position: relative;
	}

	.cover-half.left {
		border-right: 1rpx solid #fff;
	}

	.cover-half.right {
		border-left: 1rpx solid #fff;
	}

	.cover-two-thirds {
		width: 66.66%;
		height: 100%;
	}

	.cover-grid-right {
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.cover-grid-item {
		flex: 1;
		position: relative;
	}

	.cover-grid-item.top {
		border-bottom: 1rpx solid #fff;
	}

	.cover-grid-item.bottom {
		border-top: 1rpx solid #fff;
	}

	.cover-image {
		width: 100%;
		height: 100%;
	}

	.portfolio-item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 80rpx;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.portfolio-item-name {
		font-size: 30rpx;
		color: #000;
		font-weight: 600;
		flex: 1;
		margin-right: 16rpx;
		margin-top: 8rpx;
	}

	.portfolio-item-tags {
		font-size: 24rpx;
		color: #BCBCBC;
		margin-top: 8rpx;
	}

	.portfolio-select-btn {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.selected-circle {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}
</style>