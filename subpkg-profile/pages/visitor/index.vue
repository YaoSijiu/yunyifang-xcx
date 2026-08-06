<template>
	<view class="container">
		<!-- 2. 分类 Tab 栏 -->
		<view class="tab-header">
			<scroll-view scroll-x class="tab-scroll" :show-scrollbar="false">
				<view class="tab-item" v-for="(tab, index) in tabs" :key="index" :id="'tab_' + index"
					:class="{ active: currentTab === index }" @click="switchTab(index)">
					<view class="tab-item-text">
						<text class="tab-text">{{ tab.name }}</text>
						<image v-if="currentTab == index" class="yellow-underline" src="/static/common/选中条.png" />
					</view>
					<view class="badge" :style="{ backgroundColor: currentTab === index ? '#333' : '#999' }"
						v-if="tab.count >= 0">{{ tab.count }}</view>
				</view>
			</scroll-view>

			<view class="expand-btn" @click="showFilterPopup = true">
				<text class="expand-text">展开</text>
				<text class="triangle">▼</text>
			</view>
		</view>

		<!-- 3. 搜索框 -->
		<view class="search-box-wrapper">
			<view class="search-box">
				<image src="/static/home/搜索.png" class="search-icon"></image>
				<input type="text" placeholder="搜索姓名或手机号" placeholder-class="placeholder-style" class="search-input"
					v-model="keyWord" @confirm="handleSearch" confirm-type="search" />
			</view>
		</view>
		<view class="filter-popup" v-if="showFilterPopup" @click="showFilterPopup = false">
			<view class="popup-content" @click.stop>

				<view class="filter-tabs">
					<!-- 第一行 -->
					<view class="tab-row">
						<view v-for="(tab, index) in tabs.slice(0, 4)" :key="index" class="tab-item1"
							:class="{ active: filterActiveTab === index }" @click="onFilterTabClick(index)">
							<text class="tab-text">{{ tab.name }}</text>
							<view class="badge"
								:style="{ backgroundColor: filterActiveTab === index ? '#333' : '#999' }">
								{{ tab.count }}
							</view>
							<image v-if="filterActiveTab == index" class="yellow-underline" src="/static/common/选中条.png" />
						</view>
					</view>

					<!-- 第二行 -->
					<view class="tab-row">
						<view v-for="(tab, index) in tabs.slice(4, 8)" :key="index" class="tab-item1"
							:class="{ active: filterActiveTab === index + 4 }" @click="onFilterTabClick(index + 4)">
							<text class="tab-text">{{ tab.name }}</text>
							<view class="badge"
								:style="{ backgroundColor: filterActiveTab === index+4 ? '#333' : '#999' }">
								{{ tab.count }}
							</view>
							<image v-if="filterActiveTab == index+4" class="yellow-underline" src="/static/common/选中条.png" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 4. 内容区域：根据是否为会员进行权限控制 -->

		<!-- 会员可以查看访客列表 -->
		<view v-if="isVip">
			<!-- 情况 A: 有数据 -->
			<view class="content-list" v-if="visitorList.length > 0">
				<view class="visitor-card" v-for="(item, index) in visitorList" :key="index">
					<view class="">
						<view class="card-header">
							<text class="visitor-name">
								{{ item.nickName }}
								<text class="visitor-phone" v-if="item.phone">({{ item.phone }})</text>
							</text>
						</view>
						<text class="visit-time">{{ formatVisitTime(item.visitTime) }}访问</text>
					</view>
					<view class="more-options" @click="showTagEdit(item, index)">
						<view class="dot-row">
							<view class="dot"></view>
							<view class="dot"></view>
							<view class="dot"></view>
						</view>
					</view>
				</view>
			</view>

			<!-- 情况 B: 无数据/空状态 -->
			<view class="content-empty" v-else>
				<view class="empty-image-placeholder">
					<view class="img-head"></view>
					<view class="img-body"></view>
					<view class="img-lines">
						<view class="line"></view>
						<view class="line short"></view>
					</view>
				</view>
				<text class="empty-text">暂无相关访客</text>
			</view>
		</view>

		<!-- 非会员提示开通 -->
		<view class="content-empty vip-required" v-else>
			<view class="empty-image-placeholder">
				<view class="img-head"></view>
				<view class="img-body"></view>
				<view class="img-lines">
					<view class="line"></view>
					<view class="line short"></view>
				</view>
			</view>
			<text class="empty-text">开通会员后可查看访客列表</text>
		</view>
		<!-- 标签编辑弹窗 -->
		<view class="tag-popup" v-if="showTagEditPopup" @click="closeTagEditPopup">
			<view class="popup-content tag-popup-content" @click.stop>
				<view class="popup-header">
					<text class="popup-title">编辑({{ currentVisitor.nickName }})标签</text>
					<view class="close-btn" @click="closeTagEditPopup">×</view>
				</view>

				<!-- 简化标签选择区域 -->
				<view class="simple-tags-container">
					<view class="tags-row" v-for="(row, rowIndex) in chunkArray(tabs.slice(1), 4)" :key="rowIndex">
						<view v-for="(tab, index) in row" :key="tab.type" class="tag-item" :class="{ 
								'selected': selectedTagIndex === (rowIndex * 4 + index +1),
								'active': selectedTagIndex === (rowIndex * 4 + index+1)
							}" @click="selectTag(rowIndex * 4 + index+1)">
							<view class="tag-content">
								<text class="tag-name">{{ tab.name }}</text>
							</view>
							<!-- 选中状态指示器 -->
							<view v-if="selectedTagIndex === (rowIndex * 4 + index+1)" class="tag-selected-indicator">
							</view>
						</view>
					</view>
				</view>

				<!-- 底部按钮 -->
				<view class="popup-buttons">
					<view class="btn cancel-btn" @click="closeTagEditPopup">取消</view>
					<view class="btn confirm-btn" @click="saveTag">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 搜索关键词
				keyWord: '',
				// 用户信息
				userInfo: {},
				// 是否为会员
				isVip: false,
				currentTab: 0,
				tabs: [{
						name: '全部',
						count: 0,
						type: null
					},
					{
						name: '黑名单',
						count: 0,
						type: 0
					},
					{
						name: '未分组',
						count: 0,
						type: 1,
					},
					{
						name: '新客户',
						count: 0,
						type: 2
					},
					{
						name: '老客户',
						count: 0,
						type: 3
					},
					{
						name: '粉丝',
						count: 0,
						type: 4
					},
					{
						name: '同行',
						count: 0,
						type: 5
					},
					{
						name: '亲友',
						count: 0,
						type: 6
					},
				],
				// 分页参数
				pageNum: 1,
				pageSize: 10,
				total: 0,
				// 数据列表 
				visitorList: [],

				showFilterPopup: false,
				filterActiveTab: 0, // 弹窗中选中的tab

				// 标签编辑弹窗
				showTagEditPopup: false,
				selectedTagIndex: 0,
				currentVisitor: null,
			}
		},
		onLoad() {
			const userInfo = uni.getStorageSync('userInfo');
			const permission = uni.getStorageSync('permission');

			if (userInfo) {
				this.userInfo = userInfo;
			}

			// 没有权限信息或会员编码为 none，则视为非会员，无法查看列表
			if (!permission || permission.code === 'none') {
				this.isVip = false;
				uni.showToast({
					title: '开通会员后可查看访客列表',
					icon: 'none'
				});
				return;
			}

			this.isVip = true;
			this.getList();
			this.getTabCounts();
		},
		onReachBottom() {
			if (this.visitorList.length < this.total) {
				this.pageNum++;
				this.getList();
			}
		},
		methods: {
			// 格式化访问时间
			formatVisitTime(timestamp) {
				if (!timestamp) return '';

				// 如果已经是字符串格式的时间，先转换为时间戳
				let visitTime;
				if (typeof timestamp === 'string') {
					visitTime = new Date(timestamp).getTime();
				} else if (typeof timestamp === 'number') {
					visitTime = timestamp;
				} else {
					return timestamp; // 如果无法处理，返回原值
				}

				const now = new Date();
				const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				const yesterday = new Date(today);
				yesterday.setDate(yesterday.getDate() - 1);
				const twoDaysAgo = new Date(today);
				twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
				const threeDaysAgo = new Date(today);
				threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

				const visitDate = new Date(visitTime);
				const visitDay = new Date(visitDate.getFullYear(), visitDate.getMonth(), visitDate.getDate());

				// 计算天数差
				const daysDiff = Math.floor((today.getTime() - visitDay.getTime()) / (1000 * 60 * 60 * 24));

				// 获取具体时间（HH:mm）
				const hours = visitDate.getHours().toString().padStart(2, '0');
				const minutes = visitDate.getMinutes().toString().padStart(2, '0');
				const timeStr = `${hours}:${minutes}`;

				// 判断时间显示格式
				if (daysDiff === 0) {
					return `今天 ${timeStr}`;
				} else if (daysDiff === 1) {
					return `昨天 ${timeStr}`;
				} else if (daysDiff === 2) {
					return `前天 ${timeStr}`;
				} else if (daysDiff > 2 && daysDiff <= 7) {
					// 简单判断：如果超过3天且不是本周，就显示"上周X"
					const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
					const weekDay = weekDays[visitDate.getDay()];

					if (visitDate.getDay() > today.getDay()) {
						return `上周${weekDay} ${timeStr}`;
					} else {
						return `星期${weekDay} ${timeStr}`;
					}
				} else {
					// 超过一周显示具体日期
					const year = visitDate.getFullYear();
					const month = (visitDate.getMonth() + 1).toString().padStart(2, '0');
					const day = visitDate.getDate().toString().padStart(2, '0');
					return `${year}年${month}月${day}日 ${timeStr}`;
				}
			},
			onFilterTabClick(index) {
				
				this.filterActiveTab = index;
				this.currentTab = index; // 同步主tab选中状态
				this.showFilterPopup = false; // 关闭弹窗
				this.pageNum = 1;
				this.getList();
				this.getTabCounts();
			},
			switchTab(index) {
				
				this.currentTab = index;
				this.filterActiveTab = index;
				// 根据不同的tab获取不同的数据
				this.pageNum = 1;
				this.getList();
				this.getTabCounts();
			},
			async getTabCounts() {
				try {
					const res = await this.$request.get('/wechat/visitor/count', {
						keyWord: this.keyWord,
					});


					if (res.code === 200 && Array.isArray(res.data)) {


						this.updateTabCounts(res.data);
					}
				} catch (e) {
					console.error('获取标签计数失败', e);
				}
			},

			// 更新标签计数
			updateTabCounts(countData) {

				// 先重置所有标签计数为0
				this.tabs.forEach(tab => {
					tab.count = 0;
				});

				// 遍历接口返回的数据数组
				countData.forEach(item => {
					const tab = this.tabs.find(tab => {
						// 处理可能的类型不一致问题
						const tabType = tab.type === null ? null : Number(tab.type);
						const itemType = item.type === null ? null : Number(item.type);
						return tabType === itemType;
					});

					if (tab) {
						tab.count = Number(item.count) || 0;
					}
				});
				let totalCount = 0;
				countData.forEach(item => {
					// 累加所有count值
					totalCount += Number(item.count) || 0;
				});
				console.log('totalCount', totalCount)
				this.tabs[0].count = totalCount

			},

			// 获取访客列表
			async getList() {
				if (!this.isVip) {
					uni.showToast({
						title: '开通会员后可查看访客列表',
						icon: 'none'
					});
					return;
				}
				try {
					const currentType = this.tabs[this.currentTab].type;
					const res = await this.$request.post('/wechat/visitor/list', {
						keyWord: this.keyWord,
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						type: currentType,
					});

					if (res.code === 200) {
						if (this.pageNum === 1) {
							this.visitorList = res.rows || [];
						} else {
							this.visitorList = [...this.visitorList, ...(res.rows || [])];
						}

					}
				} catch (e) {
					console.error('获取访客列表失败', e);
				}
			},
			// 搜索
			handleSearch() {
				if (!this.isVip) {
					uni.showToast({
						title: '开通会员后可查看访客列表',
						icon: 'none'
					});
					return;
				}
				this.pageNum = 1;
				this.getList();
			},
			showTagEdit(visitor, index) {
				this.currentVisitor = visitor;

				if (visitor.type === null) {
					this.selectedTagIndex = 0; // "全部"标签
				} else {
					// 其他情况正常查找
					const tabIndex = this.tabs.findIndex(tab => tab.type === visitor.type);
					this.selectedTagIndex = tabIndex >= 0 ? tabIndex : 0;
				}

				this.showTagEditPopup = true;
			},

			chunkArray(array, size) {
				const chunks = [];
				for (let i = 0; i < array.length; i += size) {
					chunks.push(array.slice(i, i + size));
				}
				return chunks;
			},

			// 标签选择方法
			selectTag(index) {
				this.selectedTagIndex = index;
			},

			// 保存标签
			async saveTag() {
				if (!this.currentVisitor) return;

				try {
					const selectedTab = this.tabs[this.selectedTagIndex];

					// 调用API更新访客标签
					const res = await this.$request.put('/wechat/visitor/tag', {
						visitorId: this.currentVisitor.visitorId,
						type: selectedTab.type
					});

					if (res.code === 200) {
						this.pageNum = 1;
						this.getList();
						this.getTabCounts();
						uni.showToast({
							title: '标签修改成功',
							icon: 'success'
						});
					} else {
						uni.showToast({
							title: res.msg || '修改失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('更新标签失败', error);
					uni.showToast({
						title: '网络错误',
						icon: 'none'
					});
				} finally {
					this.closeTagEditPopup();
				}
			},
			closeTagEditPopup() {
				this.showTagEditPopup = false;
				this.currentVisitor = null;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 基础变量 */
	$primary-color: #333;
	$sub-text-color: #999;
	$accent-color: #ff6b00;
	/* 橙色高亮 */
	$bg-gray: #f7f8fa;
	$line-color: #eee;

	.container {
		min-height: 100vh;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	/* 1. 顶部导航模拟 */
	.custom-nav {
		height: 88rpx;
		/* 适配状态栏高度，实际开发建议用 uni.getSystemInfoSync().statusBarHeight */
		margin-top: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		background-color: #fff;

		.nav-title {
			font-size: 34rpx;
			font-weight: 500;
			color: #333;
		}

		.nav-right {
			display: flex;
			align-items: center;
			gap: 20rpx;

			.dots {
				font-weight: 500;
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}

			.circle-icon {
				font-size: 36rpx;
			}
		}
	}

	/* 2. Tab 栏样式 */
	.tab-header {
		display: flex;
		align-items: center;
		padding: 10rpx 0 0 30rpx;
		background-color: #fff;
		border-bottom: 1rpx solid transparent;
	}

	.tab-scroll {
		flex: 1;
		white-space: nowrap;
		width: 80%;
		overflow-x: auto;
		overflow-y: hidden;

		/* 针对不同平台的隐藏滚动条 */
		scrollbar-width: none;
		/* Firefox */
		-ms-overflow-style: none;

		/* IE 10+ */
		&::-webkit-scrollbar {
			display: none !important;
			width: 0 !important;
			height: 0 !important;
			background-color: transparent !important;
		}
	}

	.tab-item1 {
		position: relative;
		font-size: 30rpx;
		color: #434343;
		padding: 14rpx 22rpx 21rpx;
		display: inline-block;
		margin-right: 30rpx;

		.tab-text {
			font-size: 30rpx;
			color: #434343;
		}

		.badge {
			display: inline-block;
			background-color: #333;
			color: #fff;
			font-size: 20rpx;
			padding: 2rpx 10rpx;
			border-radius: 20rpx;
			margin-left: 8rpx;
			vertical-align: middle;
		}

		&.active {
			.tab-text {
				font-weight: 700;
				color: #1a1a1a;
			}

			.yellow-underline {
				position: absolute;
				left: 50%;
				bottom: 6rpx;
				width: 34rpx;
				height: 6rpx;
				transform: translateX(-50%);
			}

		}
	}

	.tab-item {
		position: relative;
		font-size: 30rpx;
		color: #434343;
		padding: 22rpx 10rpx 0rpx 21rpx;
		display: inline-block;
	}
	
	.tab-item-text {
		position: relative;
		padding: 0rpx 0rpx 31rpx;
		display: inline-block;
	}

	.tab-item .tab-text {
		font-size: 30rpx;
		color: #434343;
	}

	.tab-item.active .tab-text {
		font-weight: 700;
		color: #1a1a1a;
	}

	.tab-item .badge {
		display: inline-flex;
		align-items: flex-start;
		justify-content: center; 
		min-width: 20rpx;
		height: 25rpx;
		line-height: 25rpx;
		background-color: #333;
		color: #fff;
		font-size: 20rpx;
		padding: 2rpx 10rpx;
		border-radius: 20rpx;
		margin-left: 8rpx;
		margin-top: -1rpx;
		vertical-align: middle;
	}

	.yellow-underline {
		position: absolute;
		left: 50%;
		bottom: 6rpx;
		width: 44rpx;
		height: 11rpx;
		transform: translateX(-50%);
	}

	.expand-btn {
		padding: 0 10rpx;
		display: flex;
		align-items: center;
		position: sticky;
		right: 0;
		z-index: 10;
		background: linear-gradient(to right, transparent, #fff 20%);
		/* 渐变遮罩 */
		box-shadow: none;
		margin-top: -10rpx;
		border-left: 1px solid #eee;
		font-size: 32rpx;

		.triangle {
			font-size: 20rpx;
			margin-top: 5rpx;
		}

		.expand-text {
			width: 70rpx;
		}
	}

	/* 3. 搜索框样式 */
	.search-box-wrapper {
		padding: 10rpx 20rpx 30rpx;
		background-color: #fff;
	}

	.search-icon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 20rpx;
	}

	.search-box {
		background-color: $bg-gray;
		height: 72rpx;
		border-radius: 36rpx;
		display: flex;
		align-items: center;
		padding: 0 24rpx;

		.search-input {
			flex: 1;
			font-size: 28rpx;
			margin-left: 10rpx;
			color: #333;
		}
	}

	.placeholder-style {
		color: #bbb;
	}

	/* 4. 列表展示样式 (有数据) */
	.content-list {
		padding: 0 30rpx;

		.visitor-card {
			padding: 30rpx 0;
			border-bottom: 1rpx solid $line-color;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.card-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 12rpx;

				.visitor-name {
					font-size: 32rpx;
					color: #333;
					font-weight: 500;
				}

				.visitor-phone {
					margin-left: 10rpx;
				}

				.more-icon {
					color: #999;
					font-weight: 500;
					letter-spacing: 2rpx;
				}
			}

			.visit-time {
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	/* 5. 空状态样式 (无数据) */
	.content-empty {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		margin-top: 240rpx;
		/* 调整位置 */

		.empty-image-placeholder {
			width: 200rpx;
			height: 160rpx;
			position: relative;
			margin-bottom: 20rpx;
			opacity: 0.5;

			/* CSS 画一个简单的空状态图，你可以直接替换为 <image> */
			.img-head {
				width: 80rpx;
				height: 80rpx;
				background: #ddd;
				border-radius: 50%;
				margin: 0 auto;
			}

			.img-body {
				width: 120rpx;
				height: 60rpx;
				background: #ddd;
				border-radius: 60rpx 60rpx 0 0;
				margin: -10rpx auto 0;
			}

			.img-lines {
				position: absolute;
				right: 0;
				top: 30rpx;

				.line {
					width: 60rpx;
					height: 10rpx;
					background: #ddd;
					margin-bottom: 10rpx;
					border-radius: 10rpx;
				}

				.short {
					width: 40rpx;
				}
			}
		}

		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}

	/* 仅用于演示的按钮样式 */
	.demo-toggle-btn {
		margin-top: 80rpx;
		font-size: 24rpx;
		background-color: #f0f0f0;
		color: #666;
	}

	.more-options {
		width: 50rpx;
		/* 点击区域宽度 */
		height: 50rpx;
		/* 点击区域高度 */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-left: 30rpx;
		/* 右侧留白 */
		position: relative;
		z-index: 1;
	}

	/* 水平排列三个小圆点 */
	.dot-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 30rpx;
		/* 精确控制总宽度 */
		height: 6rpx;
	}

	.dot {
		width: 8rpx;
		/* 非常小的圆点，匹配图片 */
		height: 8rpx;
		background-color: #333;
		/* 纯黑色 */
		border-radius: 50%;
	}

	/* 可选：为每个点单独控制间距 */
	.dot-row .dot:nth-child(1) {
		opacity: 1;
	}

	.dot-row .dot:nth-child(2) {
		opacity: 1;
	}

	.dot-row .dot:nth-child(3) {
		opacity: 1;
	}

	/* 在原有样式的基础上添加 */

	/* 弹窗遮罩 */
	.filter-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		z-index: 999;
		padding-top: 20rpx;
		/* 控制弹窗位置 */
	}

	/* 弹窗内容 */
	.popup-content {
		background-color: #fff;
		border-radius: 20rpx;
		width: 670rpx;
		max-width: 90%;
		padding: 30rpx;
		box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
	}

	/* 弹窗头部 */
	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #eee;
	}

	.popup-title {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
	}

	.close-btn {
		font-size: 40rpx;
		color: #999;
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	/* 标签行 */
	.tab-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.tab-row:last-child {
		margin-bottom: 0;
	}

	/* 过滤标签样式 */
	.filter-tab {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx 0;
		flex: 1;
		min-width: 0;
		position: relative;
	}

	.tag-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.popup-content {
		background-color: #fff;
		border-radius: 20rpx;
		width: 650rpx;
		max-width: 90%;
		padding: 40rpx 30rpx 30rpx;
		box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
	}

	.popup-header {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #eee;
	}

	.popup-title {
		font-size: 36rpx;
		font-weight: 500;
		color: #333;
		text-align: center;
		font-weight: 700;
		letter-spacing: 2rpx;
	}

	.close-btn {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 40rpx;
		color: #999;
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.current-visitor-info {
		text-align: center;
		margin-bottom: 40rpx;
		padding: 0 20rpx;

		.visitor-name {
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
			margin-right: 10rpx;
		}

		.visitor-phone-popup {
			font-size: 28rpx;
			color: #999;
		}
	}

	/* 简化标签样式 */
	.simple-tags-container {
		margin-bottom: 50rpx;
		padding: 0 20rpx;
	}

	.tags-row {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20rpx;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.tag-item {
		width: 130rpx;
		margin: 0 10rpx;
		border-radius: 100rpx;
		background-color: #f5f5f5;
		position: relative;
		overflow: hidden;
		transition: all 0.2s ease;

		&.selected {
			background-color: #e8f5e8;
			border: 1rpx solid #FF6B00;
		}

		.tag-content {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 10rpx;
		}

		.tag-name {
			font-size: 28rpx;
			color: #333;
			font-weight: 500;
			text-align: center;
			flex: 1;
		}

		.tag-badge {
			min-width: 40rpx;
			height: 40rpx;
			border-radius: 20rpx;
			background-color: #999;
			color: #fff;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 12rpx;
			font-weight: 500;
		}

		&.selected .tag-name {
			color: #FF6B00;
			font-weight: 600;
		}

		&.selected .tag-badge {
			font-weight: 600;
		}
	}

	.tag-selected-indicator {
		display: none;
		/* 隐藏下划线指示器，使用边框代替 */
	}

	/* 底部按钮 */
	.popup-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		padding-top: 30rpx;
		border-top: 1rpx solid #eee;

		.btn {
			flex: 1;
			height: 80rpx;
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			font-weight: 500;
			transition: all 0.2s ease;

			&.cancel-btn {
				background-color: #f5f5f5;
				color: #666;
				margin-right: 20rpx;

				&:active {
					background-color: #e8e8e8;
				}
			}

			&.confirm-btn {
				background-color: #FF6B00;
				color: #fff;
				margin-left: 20rpx;

				&:active {
					background-color: #FF6B00;
				}
			}
		}
	}

	.tag-item.selected {
		background-color: #FF6B00;

		.tag-name {
			color: #fff;
		}


	}
</style>