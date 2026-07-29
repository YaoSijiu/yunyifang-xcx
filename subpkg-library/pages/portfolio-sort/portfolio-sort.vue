<template>
	<view class="portfolio-sort-page" :class="{ 'drag-lock': isDragging }">

		<!-- 作品集列表（可拖拽） -->
		<scroll-view class="sortable-scroll" :scroll-y="canScrollList" :scroll-top="listScrollTopValue"
			:scroll-with-animation="false" :enhanced="true" :bounces="false"
			@scroll="onListScroll">
			<view class="sortable-list" ref="sortableList">
				<view class="empty-tip" v-if="sortedList.length === 0">
					<image src="/static/yunyiku/没有.png" class="empty-icon" mode="aspectFit"></image>
					<text>暂无作品集，请先添加</text>
				</view>

				<view class="sortable-item" v-for="(item, index) in sortedList" :key="item.id" :id="'sort_item_' + index" :class="isDragging && draggingId === item.id ? 'dragging drag-placeholder' : ''" :data-index="index" :style="itemStyles[index]" @touchstart="onTouchStart($event, index, item)" @touchmove="onTouchMove($event, index, item)" @touchend="onTouchEnd"
					@touchcancel="onTouchEnd">

					<!-- 拖拽手柄 -->
					<!-- <view class="drag-handle">
						<view class="handle-bar"></view>
						<view class="handle-bar"></view>
						<view class="handle-bar"></view>
					</view> -->

					<!-- 内容区域 -->
					<view class="item-content">
						<view class="item-info">
							<view class="info-row">
								<text class="item-name">{{ item.name }}</text>
								<!-- <view class="item-index">{{ index + 1 }}</view> -->
							</view>
							<view class="item-tags" v-if="getTagCount(item) > 0">
								标签：{{ getTagCount(item) }}个
							</view>
						</view>

						<view class="more-options" @touchstart.stop.prevent="onOptionsTouchStart" @touchend.stop.prevent="handleOptionsTap(item, $event)">
							<view class="dot-row">
								<view class="dot"></view>
								<view class="dot"></view>
								<view class="dot"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="drag-floating" v-if="isDragging && dragItem" :style="floatingStyle" @touchmove.stop.prevent="noop()">
			<view class="item-content">
				<view class="item-info">
					<view class="info-row">
						<text class="item-name">{{ dragItem.name }}</text>
					</view>
					<view class="item-tags" v-if="getTagCount(dragItem) > 0">
						标签：{{ getTagCount(dragItem) }}个
					</view>
				</view>

				<view class="more-options">
					<view class="dot-row">
						<view class="dot"></view>
						<view class="dot"></view>
						<view class="dot"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部添加按钮 -->
		<view class="add-bottom-btn" @click="openAddPortfolioPopup">
			<text>添加/移除作品集</text>
		</view>

		<!-- 使用组件 -->
		<portfolio-select ref="portfolioSelect" :show="showAddPortfolioPopup" :portfolioList="filteredPortfolioList"
			:selectedIds="sortedList.map(item => item.id)" @close="closeAddPortfolioPopup"
			@confirm="handleSaveSortedPortfolios" @item-click="handlePortfolioClick"
			@show-options="handleShowOptions" />

		<!-- 作品集选项弹窗 -->
		<view class="work-popup-mask" v-if="showItemPopup" @click="closeItemPopup" @touchmove.stop.prevent="noop()">
			<view class="work-popup-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="wp-title">设置作品集</view>
				<view class="wp-list">
					<view class="wp-item" @click="removeItem">
						<image src="/static/home/从主页删除.png" class="wp-icon" mode="aspectFit"></image>
						<text class="wp-text">移除该作品集</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import buildOssImageUrl from '@/utils/imageUtil.js'
	import PortfolioSelect from '@/components/portfolio-select.vue'

	export default {
		components: {
			PortfolioSelect
		},
		data() {
			return {
				showAddPortfolioPopup: false,
				showItemPopup: false,
				sortedList: [],
				allPortfolios: [],
				currentItem: null,

				// 拖拽核心状态
				draggingIndex: -1, // 当前拖动的元素索引
				draggingId: null, // 当前拖动的作品集ID
				originalIndex: -1, // 拖拽开始时的原始索引
				targetIndex: -1, // 当前预计落位索引
				startY: 0, // 开始拖动的Y坐标（绝对位置）
				currentY: 0, // 当前触摸的Y坐标
				dragStartTop: 0, // 拖拽元素初始顶部坐标
				dragTop: 0, // 浮层顶部坐标
				dragLeft: 0, // 浮层左侧坐标
				dragWidth: 0, // 浮层宽度
				dragHeight: 0, // 浮层高度
				dragTouchOffsetY: 0, // 手指按下位置到元素顶部的距离
				dragItem: null, // 当前浮层展示的作品集
				floatingStyle: '',
				dragOffset: 0, // 拖动偏移量
				isDragging: false, // 是否正在拖动
				isLongPress: false, // 是否触发了长按
				itemHeight: 110, // 每个item的高度（预估）

				// 触摸相关
				touchTimer: null, // 长按定时器
				touchStartTime: 0, // 触摸开始时间

				// 状态管理
				originalList: [], // 原始列表备份（用于比较）
				itemStyles: [],
				isSaving: false, // 是否正在保存中
				isPageClosing: false, // 页面是否正在关闭
				pageScrollTop: 0,
				lockScrollTop: 0,
				listScrollTopValue: 0,
				dragStartScrollTop: 0,
				windowHeight: 0,
				autoScrollTimer: null,
				autoScrollDirection: 0,
				isPCDevice: false,
				dragMoveTimer: null,
				pendingDragY: 0,
				filteredPortfolioList:[]
			}
		},
		computed: {
			canScrollList() {
				return !this.isDragging || this.autoScrollDirection !== 0;
			}
		},

		onLoad() {
			const windowInfo = uni.getWindowInfo();
			const deviceInfo = uni.getDeviceInfo();
			this.windowHeight = windowInfo.windowHeight || 0;
			this.isPCDevice = this.checkIsPCDevice(deviceInfo);
			this.loadData();
		},
		onShow() {
			this.loadData();
		},
		onReady() {
			// 页面就绪后获取item高度
			this.$nextTick(() => {
				this.calculateItemHeight();
			});
		},
		onBackPress() {
			console.log('onBackPress triggered');

			this.saveBeforeLeave();

		},
		onUnload() {
			console.log('onUnload triggered');
			this.isPageClosing = true;

			// 页面销毁前保存排序
			this.saveSortOrderToServerSync();

			// 清理定时器
			if (this.touchTimer) {
				clearTimeout(this.touchTimer);
				this.touchTimer = null;
			}
			this.clearDragMoveTimer();
			this.stopAutoScroll();
		},
		onHide() {
			console.log('onHide triggered');
			this.clearDragMoveTimer();
			this.stopAutoScroll();

			// 页面隐藏时也尝试保存
			this.saveSortOrderToServerSync();
		},
		methods: {
			noop() {},

			checkIsPCDevice(systemInfo) {
				const platform = String((systemInfo && systemInfo.platform) || '').toLowerCase();
				const deviceType = String((systemInfo && systemInfo.deviceType) || '').toLowerCase();
				return deviceType === 'pc' || platform === 'windows' || platform === 'mac' || platform === 'devtools';
			},

			getTouchClientY(e) {
				const touch = (e && e.touches && e.touches[0]) || (e && e.changedTouches && e.changedTouches[0]);
				if (!touch) return 0;
				return touch.clientY || touch.pageY || 0;
			},

			clearDragMoveTimer() {
				if (this.dragMoveTimer) {
					clearTimeout(this.dragMoveTimer);
					this.dragMoveTimer = null;
				}
			},

			safeVibrateShort(options) {
				if (this.isPCDevice) return;
				uni.vibrateShort(options || {});
			},

			onOptionsTouchStart(e) {
				if (this.touchTimer) {
					clearTimeout(this.touchTimer);
					this.touchTimer = null;
				}
				if (e && e.stopPropagation) {
					e.stopPropagation();
				}
				if (e && e.preventDefault) {
					e.preventDefault();
				}
			},

			handleOptionsTap(item, e) {
				if (e && e.stopPropagation) {
					e.stopPropagation();
				}
				if (e && e.preventDefault) {
					e.preventDefault();
				}
				if (this.touchTimer) {
					clearTimeout(this.touchTimer);
					this.touchTimer = null;
				}
				this.resetDragState();
				this.showItemOptions(item);
			},

			// 计算item高度
			calculateItemHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.sortable-item').boundingClientRect(res => {
					if (res && res.length > 0) {
						if (res.length > 1) {
							this.itemHeight = res[1].top - res[0].top;
						} else {
							this.itemHeight = res[0].height;
						}
						console.log('item高度:', this.itemHeight);
					}
				}).exec();
			},

			getItemRect(index) {
				return new Promise(resolve => {
					const query = uni.createSelectorQuery().in(this);
					query.select(`#sort_item_${index}`).boundingClientRect(res => {
						resolve(res || null);
					}).exec();
				});
			},

			updateFloatingStyle() {
				this.floatingStyle = `top:0;left:0;width:${this.dragWidth}px;transform:translate3d(${this.dragLeft}px,${this.dragTop}px,0) scale(1.02);`;
			},

			resetItemStyles() {
				this.itemStyles = this.sortedList.map(() => '');
			},

			updateItemStyles() {
				const styles = this.sortedList.map(() => '');
				if (!this.isDragging || this.originalIndex === -1 || this.targetIndex === -1) {
					this.itemStyles = styles;
					return;
				}

				const offset = this.itemHeight;
				if (this.targetIndex > this.originalIndex) {
					for (let i = this.originalIndex + 1; i <= this.targetIndex; i++) {
						styles[i] = `transform:translate3d(0,-${offset}px,0);`;
					}
				} else if (this.targetIndex < this.originalIndex) {
					for (let i = this.targetIndex; i < this.originalIndex; i++) {
						styles[i] = `transform:translate3d(0,${offset}px,0);`;
					}
				}
				this.itemStyles = styles;
			},

			onListScroll(e) {
				this.pageScrollTop = (e.detail && e.detail.scrollTop) || 0;
				if (this.isDragging) {
					if (this.autoScrollDirection !== 0) {
						this.lockScrollTop = this.pageScrollTop;
						this.updateDragPosition();
					}
					return;
				}
				if (!this.isDragging) {
					this.lockScrollTop = this.pageScrollTop;
					this.listScrollTopValue = this.pageScrollTop;
				}
			},

			startAutoScroll(direction) {
				if (!this.isDragging || this.autoScrollDirection === direction) return;
				this.stopAutoScroll();
				this.autoScrollDirection = direction;
				this.autoScrollTimer = setInterval(() => {
					if (!this.isDragging) {
						this.stopAutoScroll();
						return;
					}
					const nextScrollTop = Math.max(0, this.lockScrollTop + direction * 14);
					if (nextScrollTop === this.lockScrollTop && direction < 0) {
						this.stopAutoScroll();
						return;
					}
					this.lockScrollTop = nextScrollTop;
					this.pageScrollTop = nextScrollTop;
					this.listScrollTopValue = nextScrollTop;
					this.updateDragPosition();
				}, 30);
			},

			stopAutoScroll() {
				if (this.autoScrollTimer) {
					clearInterval(this.autoScrollTimer);
					this.autoScrollTimer = null;
				}
				this.autoScrollDirection = 0;
			},

			handleDragEdgeScroll(currentY) {
				if (!this.isDragging) return;
				const height = this.windowHeight || 0;
				if (!height) return;
				const topEdge = 90;
				const bottomEdge = height - 120;
				if (currentY <= topEdge) {
					this.startAutoScroll(-1);
				} else if (currentY >= bottomEdge) {
					this.startAutoScroll(1);
				} else {
					this.stopAutoScroll();
				}
			},

			// 数据加载
			async loadData() {
				uni.showLoading({
					title: '加载中...'
				});
				try {
					// 获取所有作品集
					const allRes = await this.$request.get(
						'/wechat/works/findUserWorksCollectionsPage?pageNum=1&pageSize=100&type=0'
					);

					if (allRes.code === 200) {
						 this.filteredPortfolioList = (allRes.rows || []).filter(item => item.visibility != "1");
						this.allPortfolios = allRes.rows || [];
						// 获取已排序的作品集
						await this.loadSortedPortfolios();
						// 保存原始列表备份
						this.originalList = [...this.sortedList];
					}
				} catch (error) {
					console.error('加载数据失败:', error);
				} finally {
					uni.hideLoading();
				}
			},

			// 获取已排序的作品集
			async loadSortedPortfolios() {
				try {
					const userInfo = uni.getStorageSync('userInfo') || {};
					const params = {
						pageNum: 1,
						pageSize: 10,
						orderBy: 'sort',
						orderType: 'asc',
						type: userInfo?.groupSetting?.type || '0',
						visibility: "1"
					};
					const homeRes = await this.$request.get(
						`/wechat/works/findUserWorksCollectionsPage`, params
					);

					if (homeRes.code === 200) {
						this.sortedList = homeRes.rows || [];
						this.resetItemStyles();
						this.$nextTick(() => {
							this.calculateItemHeight();
						});
					}
				} catch (error) {
					console.error('获取排序作品集失败:', error);
					this.sortedList = [...this.allPortfolios];
					this.resetItemStyles();
					this.$nextTick(() => {
						this.calculateItemHeight();
					});
				}
			},

			getTagCount(item) {
				if (!item || !item.tags) return 0;
				try {
					const tags = JSON.parse(item.tags);
					return Array.isArray(tags) ? tags.length : 0;
				} catch (e) {
					return 0;
				}
			},

			// ========== 核心拖拽方法 ==========

			// 触摸开始
			onTouchStart(e, index, item) {
				if (this.touchTimer) {
					clearTimeout(this.touchTimer);
					this.touchTimer = null;
				}
				e.stopPropagation();

				// 保存开始信息
				this.draggingIndex = index;
				this.draggingId = item && item.id;
				this.originalIndex = index;
				this.targetIndex = index;
				this.startY = this.getTouchClientY(e);
				this.currentY = this.startY;
				this.dragOffset = 0;
				this.isLongPress = false;

				// 设置长按定时器（300ms后触发长按）
				this.touchStartTime = Date.now();
				this.touchTimer = setTimeout(() => {
					this.onLongPress(e, index);
				}, 300);
			},

			// 长按事件（正式进入拖拽模式）
			async onLongPress(e, index) {
				if (this.draggingIndex !== index) return;
				const rect = await this.getItemRect(index);
				if (!rect || this.draggingIndex !== index) return;

				this.isLongPress = true;
				this.isDragging = true;
				this.dragItem = this.sortedList[index];
				this.dragStartTop = rect.top;
				this.dragTop = rect.top;
				this.dragLeft = rect.left;
				this.dragWidth = rect.width;
				this.dragHeight = rect.height;
				this.dragTouchOffsetY = this.startY - rect.top;
				this.listScrollTopValue = this.pageScrollTop;
				this.lockScrollTop = this.pageScrollTop;
				this.dragStartScrollTop = this.pageScrollTop;
				this.updateFloatingStyle();

				// 保存原始列表状态
				this.originalList = [...this.sortedList];
				this.resetItemStyles();

				// 更强的震动反馈
				this.safeVibrateShort();
			},

			// 触摸移动
			onTouchMove(e, index, item) {
				const currentY = this.getTouchClientY(e);
				const moveDistance = Math.abs(currentY - this.startY);

				if (!this.isLongPress && !this.isDragging && moveDistance > 8) {
					if (this.touchTimer) {
						clearTimeout(this.touchTimer);
						this.touchTimer = null;
					}
					return;
				}

				if (this.isDragging) {
					e.stopPropagation();
					e.preventDefault();
				}

				// 如果是拖拽状态，处理拖拽逻辑
				if (this.isDragging && item && this.draggingId === item.id) {
					if (this.isPCDevice) {
						this.pendingDragY = currentY;
						if (this.dragMoveTimer) return;
						this.dragMoveTimer = setTimeout(() => {
							this.dragMoveTimer = null;
							this.handleDragMove(this.pendingDragY);
						}, 16);
						return;
					}
					this.handleDragMove(currentY);
				}
			},

			handleDragMove(currentY) {
				this.dragOffset = currentY - this.startY;
				this.currentY = currentY;
				this.dragTop = currentY - this.dragTouchOffsetY;
				this.updateFloatingStyle();
				this.handleDragEdgeScroll(currentY);
				this.updateDragPosition();
			},

			// 更新拖拽位置
			updateDragPosition() {
			    if (this.originalIndex === -1 || !this.isDragging) return;

			    const scrollDelta = this.lockScrollTop - this.dragStartScrollTop;
			    const offsetIndex = Math.round((this.dragTop - this.dragStartTop + scrollDelta) / this.itemHeight);
			    let targetIndex = this.originalIndex + offsetIndex;
			    targetIndex = Math.max(0, Math.min(targetIndex, this.sortedList.length - 1));

			    if (targetIndex !== this.targetIndex) {
			        this.targetIndex = targetIndex;
			        this.updateItemStyles();
			        this.safeVibrateShort({ type: 'light' });
			    }
			},

			applyDragSort() {
				if (this.originalIndex === -1 || this.targetIndex === -1 || this.originalIndex === this.targetIndex) return;
				const newList = [...this.sortedList];
				const [draggedItem] = newList.splice(this.originalIndex, 1);
				newList.splice(this.targetIndex, 0, draggedItem);
				this.sortedList = newList;
				console.log(`从 ${this.originalIndex} 移动到 ${this.targetIndex}`);
			},
			// 触摸结束
			onTouchEnd(e) {
			    // 清理长按定时器
			    if (this.touchTimer) {
			        clearTimeout(this.touchTimer);
			        this.touchTimer = null;
			    }
				if (this.isDragging && this.dragMoveTimer) {
					this.clearDragMoveTimer();
					this.handleDragMove(this.pendingDragY);
				}
			    
			    // 如果是拖拽状态，执行结束逻辑
			    if (this.isDragging) {
			        this.applyDragSort();
			        this.resetDragState();
			    } else {
			        // 没有触发拖拽
			        this.resetDragState();
			    }
			    
			},
			
			// 重置拖拽状态
			resetDragState() {
				this.clearDragMoveTimer();
				this.stopAutoScroll();
				this.draggingIndex = -1;
				this.draggingId = null;
				this.originalIndex = -1;
				this.targetIndex = -1;
				this.startY = 0;
				this.currentY = 0;
				this.dragStartTop = 0;
				this.dragTop = 0;
				this.dragLeft = 0;
				this.dragWidth = 0;
				this.dragHeight = 0;
				this.dragTouchOffsetY = 0;
				this.dragStartScrollTop = 0;
				this.dragItem = null;
				this.floatingStyle = '';
				this.resetItemStyles();
				this.dragOffset = 0;
				this.isDragging = false;
				this.isLongPress = false;
			},

			// ========== 离开页面时的保存逻辑 ==========

			// 保存后离开
			async saveBeforeLeave() {
				// 显示保存提示
				uni.showLoading({
					title: '保存中...',
					mask: true
				});

				this.isSaving = true;

				try {
					await this.saveSortOrderToServer();

					// 保存成功后返回
					uni.hideLoading();
					setTimeout(() => {
						uni.navigateBack();
					}, 300);

				} catch (error) {
					uni.hideLoading();
					this.isSaving = false;

					// 保存失败时让用户选择
					uni.showModal({
						title: '保存失败',
						content: '排序保存失败，是否放弃更改并返回？',
						confirmText: '放弃',
						cancelText: '重试',
						success: (res) => {
							if (res.confirm) {
								// 放弃更改并返回
								uni.navigateBack();
							} else {
								// 重试保存
								setTimeout(() => {
									this.saveBeforeLeave();
								}, 500);
							}
						}
					});
				}
			},

			// 保存排序到服务器（异步）
			async saveSortOrderToServer() {
				if (this.sortedList.length === 0) {
					return;
				}

				const params = {
					worksCollectionsIds: this.sortedList.map(item => item.id),
					isTop: "1"
				};

				console.log('保存排序数据:', params);

				const res = await this.$request.put('/wechat/home/setTop', params);

				if (res.code === 200) {
					// 更新原始列表备份
					this.originalList = [...this.sortedList];
					this.loadData()
					this.loadSortedPortfolios()
					console.log('排序保存成功');
				} else {
					throw new Error(res.msg || '保存失败');
				}
			},

			// 同步保存排序（用于页面卸载时）
			saveSortOrderToServerSync() {

				if (this.sortedList.length === 0 || this.isSaving) {
					return;
				}

				const sortData = this.sortedList.map((item, index) => ({
					worksCollectionsId: item.id,
					sort: index + 1
				}));

				// 使用同步方式保存，但实际还是异步
				this.$request.put('/wechat/home/sort', sortData).then(res => {
					if (res.code === 200) {
						console.log('排序已保存');
					}
				}).catch(error => {
					console.error('保存失败:', error);
				}).finally(() => {
					this.isSaving = false;
				});
			},

			// 移除作品集
			async removeItem() {
				if (!this.currentItem) return;

				uni.showModal({
					title: '提示',
					content: '确定要从主页删除吗？',
					success: async (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '删除中...'
							});
							try {
								const deleteRes = await this.$request.put('/wechat/home/setTop', {
									worksCollectionsIds: [this.currentItem.id],
									isTop: "0"
								});

								if (deleteRes.code == 200) {
									const removedId = this.currentItem.id;
									this.sortedList = this.sortedList.filter(item => item.id !== removedId);
									this.resetItemStyles();
									uni.setStorageSync('homeCollectionsNeedRefresh', true);

									this.closeItemPopup();

									uni.showToast({
										title: '删除成功',
										icon: 'success'
									});
									this.loadData();
								} else {
									uni.showToast({
										title: deleteRes.msg || '删除失败',
										icon: 'none'
									});
								}
							} catch (error) {
								console.error('删除失败:', error);
								uni.showToast({
									title: '网络错误，请稍后重试',
									icon: 'none'
								});
							} finally {
								uni.hideLoading();
							}
						}
					}
				});
			},

			// 打开添加弹窗
			openAddPortfolioPopup() {
				this.showAddPortfolioPopup = true;
			},

			// 关闭添加弹窗
			closeAddPortfolioPopup() {
				this.showAddPortfolioPopup = false;
			},

			// 处理保存排序作品集
			async handleSaveSortedPortfolios(selectedIds) {
				uni.showLoading({
					title: '保存中...'
				});
				try {
					// 根据选择的ID更新排序列表
					this.sortedList = selectedIds
						.map(id => this.allPortfolios.find(item => item.id === id))
						.filter(item => item);

					// 保存排序到服务器
					await this.saveSortOrderToServer();
					this.loadSortedPortfolios()
					this.loadData()
					this.closeAddPortfolioPopup();

					uni.showToast({
						title: '保存成功',
						icon: 'success'
					});
				} catch (error) {
					console.error('保存失败:', error);
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					});
				} finally {
					uni.hideLoading();
				}
			},

			// 作品集点击
			handlePortfolioClick(item) {
				this.goToDetail(item);
			},

			// 跳转到详情
			goToDetail(item) {
				uni.navigateTo({
					url: `/subpkg-library/pages/collection/detail?id=${item.id}`
				});
			},

			// 显示作品集选项
			showItemOptions(item) {
				console.log("我触发了")
				this.currentItem = item;
				this.showItemPopup = true;
			},

			// 关闭作品集选项
			closeItemPopup() {
				this.showItemPopup = false;
				this.currentItem = null;
			},

			// 处理显示选项
			handleShowOptions(item) {
				this.showItemOptions(item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.portfolio-sort-page {
		height: 100vh;
		background: #f5f5f5;
		overflow: hidden;

		&.drag-lock {
			height: 100vh;
			overflow: hidden;
		}
	}

	.sortable-scroll {
		height: 100vh;
		box-sizing: border-box;
	}

	/* 页面头部 */
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx 32rpx;
		border-bottom: 1rpx solid #eee;
	}

	.header-title {
		font-size: 36rpx;
		font-weight: 600;
		color: #333;
	}

	.header-right {
		width: 80rpx;
		text-align: right;
	}

	.save-tip {
		font-size: 24rpx;
		color: #ff6b6b;
	}

	/* 排序说明 */
	.sort-tip {
		padding: 20rpx 32rpx;
		text-align: center;
		background: #fff8e6;
		margin: 20rpx 32rpx;
		border-radius: 12rpx;

		text {
			font-size: 28rpx;
			color: #e6a23c;
		}
	}

	/* 可排序列表 */
	.sortable-list {
		padding: 20rpx 32rpx 150rpx;
		position: relative;
	}

	.empty-tip {
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

	.empty-tip text {
		font-size: 28rpx;
		color: #999;
	}

	/* 可排序项 */
	.sortable-item {
		margin-bottom: 14rpx;
		border-radius: 18rpx;
		background: #fff;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
		overflow: hidden;
		position: relative;
		transition: transform 0.12s ease, box-shadow 0.18s ease, opacity 0.12s ease;

		&.dragging {
			box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.15);
			z-index: 1000;
		}

		&.drag-placeholder {
			opacity: 0;
		}
	}

	.drag-floating {
		position: fixed;
		z-index: 9999;
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.18);
		overflow: hidden;
		pointer-events: none;
		opacity: 0.96;
		transform: scale(1.02);
	}

	/* 拖拽手柄 */
	.drag-handle {
		position: absolute;
		left: 20rpx;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 40rpx;
		height: 80rpx;
		cursor: grab;

		.handle-bar {
			width: 24rpx;
			height: 4rpx;
			background: #ddd;
			margin: 3rpx 0;
			border-radius: 2rpx;
		}
	}

	.sortable-item.dragging .drag-handle .handle-bar {
		background: #409eff;
	}

	/* 内容区域 */
	.item-content {
		display: flex;
		align-items: center;
		padding: 20rpx 28rpx 20rpx 48rpx;
		min-height: 82rpx;
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4rpx;
	}

	.item-name {
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
		flex: 1;
		margin-right: 16rpx;
	}

	.item-index {
		font-size: 28rpx;
		color: #409eff;
		font-weight: bold;
		background: #f0f8ff;
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
		margin-left: 16rpx;
	}

	.item-tags {
		font-size: 24rpx;
		color: #999;
	}

	/* 更多选项 */
	.more-options {
		width: 56rpx;
		height: 56rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left: 20rpx;
		position: relative;
		z-index: 2;
	}

	.dot-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 36rpx;
		height: 8rpx;
	}

	.dot {
		width: 8rpx;
		height: 8rpx;
		background-color: #999;
		border-radius: 50%;
	}

	/* 底部添加按钮 */
	.add-bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 32rpx;
		font-weight: 500;
		border-radius: 50rpx;
		margin: 20rpx;
	}

	/* 作品管理弹窗 */
	.work-popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.work-popup-content {
		background: #fff;
		border-radius: 30rpx;
		padding: 20rpx 0 20rpx;
		min-height: 200rpx;
		margin: 20rpx;
	}

	.wp-handle {
		width: 100rpx;
		height: 15rpx;
		background: #d3d3d3;
		border-radius: 10rpx;
		margin: 10rpx auto 10rpx;
	}

	.wp-title {
		font-size: 28rpx;
		color: #999;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}

	.wp-section-title {
		font-size: 28rpx;
		color: #999;
		margin-left: 40rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}

	.wp-list {
		padding: 0 40rpx;
	}


	.wp-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
	}

	.wp-item:active {
		opacity: 0.7;
	}

	.wp-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 30rpx;
	}

	.wp-text {
		font-size: 32rpx;
		color: #CD0F0F;
	}
</style>
