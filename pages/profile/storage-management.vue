<template>
	<view class="page">
		<!-- 作品空间卡片 -->
		<view class="storage-card">
			<view class="card-header">
				<view class="header-left">
					<!-- <image src="/static/icon/fdj.svg" class="header-icon" mode="aspectFit"></image> -->
					<text class="header-title">作品空间</text>
				</view>
				<text class="header-usage" :class="{ 'warning-text': isStorageWarning }">{{ formatStorage(usedMb) }} / {{ formatStorage(totalMb) }}</text>
			</view>

			<view class="progress-section">
				<view class="progress-bar">
					<view :class="['progress-fill', isStorageWarning ? 'red' : 'blue']" :style="{ width: storagePercentage + '%' }"></view>
				</view>
				<text class="progress-text" :class="{ 'warning-text': isStorageWarning }">已使用 {{ storagePercentage }}%</text>
			</view>

			<view class="storage-details">
				<view class="detail-item">
					<text class="detail-label">已使用</text>
					<text class="detail-value">{{ formatStorage(usedMb) }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">总空间</text>
					<text class="detail-value">{{ formatStorage(totalMb) }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">剩余空间</text>
					<text class="detail-value">{{ formatStorage(remainingMb) }}</text>
				</view>
			</view>

			<button class="action-btn" @click="openExpand">+ 空间扩容</button>
		</view>

		<!-- 流量使用卡片 -->
		<view class="storage-card">
			<view class="card-header">
				<view class="header-left">
					<!-- <image src="/static/icon/fdj.svg" class="header-icon" mode="aspectFit"></image> -->
					<text class="header-title">流量使用</text>
				</view>
				<text class="header-usage" :class="{ 'warning-text': isFlowWarning }">{{ formatStorage(usedFlow) }} / {{ formatStorage(totalFlow) }}</text>
			</view>

			<view class="progress-section">
				<view class="progress-bar">
					<view :class="['progress-fill', isFlowWarning ? 'red' : 'blue']" :style="{ width: flowPercentage + '%' }"></view>
				</view>
				<text class="progress-text" :class="{ 'warning-text': isFlowWarning }">已使用 {{ flowPercentage }}%</text>
			</view>

			<view class="storage-details">
				<view class="detail-item">
					<text class="detail-label">已使用</text>
					<text class="detail-value">{{ formatStorage(usedFlow) }}</text>
					<text class="detail-link" @click="openUsedFlowDetail">详情</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">总流量</text>
					<text class="detail-value">{{ formatStorage(totalFlow) }}</text>
					<text class="detail-link" @click="openTotalFlowDetail">详情</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">剩余流量</text>
					<text class="detail-value"
						:class="{ 'negative': remainFlow < 0 }">{{ formatStorage(remainFlow) }}</text>
				</view>
			</view>

			<button class="action-btn" @click="openFlowExpand">+ 购买流量</button>
		</view>

		<yun-storage-warning :visible="expandVisible" type="expand" @cancel="expandVisible = false"
			@confirm="handleExpandConfirm" />
		<yun-storage-warning :visible="flowExpandVisible" type="flow" @cancel="flowExpandVisible = false"
			@confirm="handleFlowExpandConfirm" />

		<!-- 流量已使用详情弹窗 -->
		<view class="modal-overlay" v-if="showUsedFlowDetail" @click="showUsedFlowDetail = false">
			<view class="modal-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="modal-header">
					<text class="modal-title">流量已使用详情</text>
					<!-- <text class="modal-close" @click="showUsedFlowDetail = false">×</text> -->
				</view>
				<view class="modal-body">
					<view class="flow-info-card flow-description">
						<view class="flow-info-title">流量说明</view>
						<view class="flow-info-text">• 浏览、观看和下载内容均计入使用流量</view>
						<view class="flow-info-text">• 观看视频会显著增加流量消耗，建议视频压缩后上传</view>
					</view>
					<view class="flow-info-card flow-used">
						<view class="flow-info-content">
							<view class="flow-info-text">
								<view class="flow-info-title">已用流量</view>
								<view class="flow-info-subtitle">使用流量非实时统计，大约延迟 6 小时</view>
							</view>
							<view class="flow-info-value-container">
								<text class="flow-info-value">{{ formatStorage(usedFlow) }}</text>
							</view>
						</view>
					</view>
					<view class="flow-history">
						<view class="flow-history-item flow-history-card" v-for="(item, index) in flowHistory"
							:key="index">
							<view class="flow-history-header">
								<text class="flow-history-date">{{ getDatePrefix(item.date) }} {{ item.date }}</text>
								<view class="flow-history-right">
									<text class="flow-history-value">{{ formatStorage(item.value) }}</text>
									<text class="flow-history-detail"
										@click="toggleFlowDetail(index)">{{ selectedFlowHistoryIndex === index ? '收起' : '详情' }}</text>
								</view>
							</view>
							<!-- 流量趋势图 - 使用 uCharts -->
							<view class="flow-trend"
								v-if="selectedFlowHistoryIndex === index && item.hourlyData && item.hourlyData.length">
								<view class="flow-trend-title">{{ getDatePrefix(item.date) }}流量趋势</view>

								<!-- uCharts 图表组件 -->
								<view class="charts-container">
									<view class="charts-box">
										<qiun-data-charts type="line" :chartData="getChartData(item)" :opts="chartOpts"
											:canvas2d="true" :canvasId="'flow_chart_' + index" width="100%"
											height="300rpx" />
									</view>
									<!-- <view class="y-axis-unit">GB</view> -->
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 总流量详情弹窗 -->
		<view class="modal-overlay" v-if="showTotalFlowDetail" @click="showTotalFlowDetail = false">
			<view class="modal-content" @click.stop>
				<view class="wp-handle"></view>
				<view class="modal-header">
					<text class="modal-title">总流量详情</text>
					<!-- <text class="modal-close" @click="showTotalFlowDetail = false">×</text> -->
				</view>
				<view class="modal-body">
					<view class="flow-info-card">
						<view class="flow-info-content">
							<view class="flow-info-text">
								<view class="flow-info-title">会员免费流量</view>
								<view class="flow-info-subtitle">当前会员到期后自动失效</view>
							</view>
							<view class="flow-info-value-container">
								<text class="flow-info-value">{{ formatStorage(memberFlow) }}</text>
							</view>
						</view>
					</view>
					<view class="flow-info-card">
						<view class="flow-info-content">
							<view class="flow-info-text">
								<view class="flow-info-title">付费流量</view>
								<view class="flow-info-subtitle" v-if="paidFlow === 0">暂无付费流量</view>
							</view>
							<view class="flow-info-value-container">
								<text class="flow-info-value">{{ formatStorage(paidFlow) }}</text>
							</view>
						</view>
					</view>
					<view class="flow-info-card highlighted">
						<view class="flow-info-content">
							<view class="flow-info-text">
								<view class="flow-info-title">总流量</view>
								<view class="flow-info-subtitle">使用时优先扣除会员免费流量</view>
							</view>
							<view class="flow-info-value-container">
								<text class="flow-info-value">{{ formatStorage(totalFlow) }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import qiunDataCharts from '@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
	export default {
		components: {
			qiunDataCharts // 注册组件
		},
		data() {
			return {
				usedMb: 0,
				totalMb: 0,
				remainingMb: 0,
				expandVisible: false,
				usedFlow: 0,
				totalFlow: 0,
				remainingFlow: 0,
				remainFlow:0,
				flowExpandVisible: false,
				userRole: 'none',
				showUsedFlowDetail: false,
				showTotalFlowDetail: false,
				memberFlow: 0,
				paidFlow: 0,
				flowHistory: [],
				selectedFlowHistoryIndex: -1,
				chartOpts: {
					padding: [15, 20, 10, 15], // 上右下左边距（增加右边距以显示单位）
					legend: {
						show: false
					}, // 不显示图例
					xAxis: {
						gridType: 'dash',
						dashLength: 4,
						gridColor: '#e0e0e0',
						fontColor: '#999999',
						fontSize: 10,
						rotateLabel: false,
						itemCount: 6, // 显示6个标签
						boundaryGap: 'justify' // 标签对齐
					},
					yAxis: {
						gridType: 'dash',
						dashLength: 4,
						gridColor: '#e0e0e0',
						fontColor: '#999999',
						fontSize: 10,
						splitNumber: 4 ,
						// 直接在yAxis上设置标签格式化
						labelFormat: (val) => {
							if (val < 0.01) return val;

							// 判断是否为整数
							if (Number.isInteger(val)) {
								return val;
							}

							// 判断小数位数
							if ((val * 10) % 1 === 0) {
								// 检查这一位小数是否为0
								if (Math.round(val * 10) / 10 === Math.round(val)) {
									return Math.round(val);
								}
								return val.toFixed(1);
							}

							// 其他情况保留两位小数
							return val.toFixed(2);
						},
						data: [{
							min: 0,
							unit: 'GB'
						}]
					},
					extra: {
						line: {
							type: 'straight', // 折线类型
							width: 3,
							activeType: 'hollow'
						},

					},
					dataLabel: false, // 不显示数据标签
					enableScroll: false,
					animation: true
				}
			};
		},
		computed: {
			storagePercentage() {
				if (!this.totalMb) return 0;
				const percentage = (this.usedMb / this.totalMb) * 100;
				const roundedPercentage = Math.min(percentage, 100);
				// 显示一位小数
				return roundedPercentage.toFixed(1);
			},
			flowPercentage() {
				if (!this.totalFlow) return 0;
				const percentage = (this.usedFlow / this.totalFlow) * 100;
				const roundedPercentage = Math.min(percentage, 100);
				// 显示一位小数
				return roundedPercentage.toFixed(1);
			},
			isStorageWarning() {
				if (!this.totalMb) return false;
				const percentage = (this.usedMb / this.totalMb) * 100;
				return percentage >= 90;
			},
			isFlowWarning() {
				if (!this.totalFlow) return false;
				const percentage = (this.usedFlow / this.totalFlow) * 100;
				return percentage >= 90;
			}
		},
		onShow() {
			this.loadStorageInfo();
		},
		methods: {
			// 格式化小时显示（去掉前导零）
			formatHour(hour) {
				// 如果小时是"00"到"09"，去掉前导零
				const hourNum = parseInt(hour);
				return hourNum + ':00';
			},
			// 获取图表数据（uCharts 格式）
			getChartData(item) {
				console.log('Chart data:', item.hourlyData)
				if (!item.hourlyData || item.hourlyData.length === 0) {
					return {
						categories: [],
						series: []
					}
				}

				// 提取小时作为 X 轴标签
				const categories = item.hourlyData.map(p => this.formatHour(p.hour))

				// 提取数值（已经是 GB 单位，直接使用）
				const values = item.hourlyData.map(p => parseFloat(p.value) || 0)

				return {
					categories: categories,
					series: [{
						name: '流量 (GB)', // 在系列名称中也添加单位
						data: values,
						color: '#F37738'
					}]
				}
			},

			// 修改 toggleFlowDetail 方法
			async toggleFlowDetail(index) {
			    if (this.selectedFlowHistoryIndex === index) {
			        this.selectedFlowHistoryIndex = -1
			    } else {
			        this.selectedFlowHistoryIndex = index
			
			        const item = this.flowHistory[index]
			        const dayType = item.dayType || 'other'
			
			        try {
			            const chartRes = await this.$request.get(`/wechat/flow/findUserFlowChart?dayType=${dayType}`)
			            if (chartRes.code === 200 && chartRes.data) {
			                // 更新数据
			                this.$set(this.flowHistory[index], 'hourlyData', chartRes.data.hourlyData || [])
			
			                // 计算最大值，设置 Y 轴范围
			                const values = chartRes.data.hourlyData.map(p => parseFloat(p.value) || 0)
			                const maxValue = Math.max(...values)
			                
			                // 判断是否全部为0
			                const allZeros = values.every(v => v === 0)
			                
			                if (allZeros) {
			                    // 全部为0的情况，设置最大值为1
			                    this.$set(this.chartOpts.yAxis.data[0], 'max', 1)
			                    this.$set(this.chartOpts.yAxis.data[0], 'min', 0)
			                } else if (maxValue > 0) {
			                    // 有正数的情况，动态计算
			                    let maxYValue
			                    if (maxValue < 0.1) {
			                        maxYValue = Math.ceil(maxValue * 1.5 * 1000) / 1000
			                    } else if (maxValue < 1) {
			                        maxYValue = Math.ceil(maxValue * 1.3 * 100) / 100
			                    } else if (maxValue < 10) {
			                        maxYValue = Math.ceil(maxValue * 1.2 * 10) / 10
			                    } else {
			                        maxYValue = Math.ceil(maxValue * 1.1)
			                    }
			                    this.$set(this.chartOpts.yAxis.data[0], 'max', maxYValue)
			                    this.$set(this.chartOpts.yAxis.data[0], 'min', 0)
			                }
			                // 其他情况（如负数）的处理...
			            }
			        } catch (error) {
			            console.error('获取流量趋势数据失败:', error);
			            // 如果接口调用失败，使用默认数据
			            if (!this.flowHistory[index].hourlyData || this.flowHistory[index].hourlyData.length === 0) {
			                this.flowHistory[index].hourlyData = [
			                    { "hour": "00", "value": 0 },
			                    { "hour": "04", "value": 0 },
			                    { "hour": "08", "value": 0 },
			                    { "hour": "12", "value": 0 },
			                    { "hour": "16", "value": 0 },
			                    { "hour": "20", "value": 0 }
			                ]
			                // 设置最大值为1
			                this.$set(this.chartOpts.yAxis.data[0], 'max', 1)
			                this.$set(this.chartOpts.yAxis.data[0], 'min', 0)
			            }
			        }
			    }
			},
			async loadStorageInfo() {
				try {
					// 从缓存中读取团队模式状态和团长的 userId
					const isTeamMode = uni.getStorageSync('isTeamMode') || false;
					const teamOwnerId = uni.getStorageSync('teamOwnerId');

					// 构建请求URL，团队模式下传递团长的 userId
					let url = '/wechat/user/getUserInfo';
					if (isTeamMode && teamOwnerId) {
						url += `?userId=${teamOwnerId}`;
					}

					// 获取作品空间数据
					const res = await this.$request.get(url);
					const data = res.data || {};
					const used = data.cloudUsedMb || 0;
					const total = data.cloudTotalMb || 0;
					this.userRole = res.data.vipLevel
					this.usedMb = used;
					this.totalMb = total;
					// 计算剩余空间，允许为负数以表示超出使用
					this.remainingMb = total - used;

					// 获取流量使用数据（调用不同的接口）
					try {
						const flowRes = await this.$request.get('/wechat/flow/findUserFlow');
						if (flowRes.code === 200 && flowRes.data) {
							const flowData = flowRes.data;
							// 将 KB 转换为 MB
							this.usedFlow = (flowData.usedFlow || 0) / 1024;
							this.totalFlow = (flowData.totalFlow || flowData.remainFlow||0) / 1024;
							this.remainFlow=(flowData.remainFlow||0)/1024
						}
					} catch (flowError) {
						console.error('获取流量数据失败:', flowError);
						// 如果流量接口调用失败，使用默认值
						this.usedFlow = 0;
						this.totalFlow = 0;
						this.remainFlow=0
					}

					// 计算剩余流量，允许为负数以表示超出使用
					// this.remainingFlow = this.totalFlow - this.usedFlow;
				} catch (e) {}
			},
			formatStorage(mb) {
				if (!mb && mb !== 0) return '0KB';
				// 处理负数情况
				const isNegative = mb < 0;
				const absMb = Math.abs(mb);

				let result;
				if (absMb < 1) {
					// 小于 1MB 时，转换为 KB 显示
					const kb = absMb * 1024;
					result = kb.toFixed(0) + 'KB';
				} else if (absMb < 1024) {
					result = absMb.toFixed(2) + 'MB';
				} else {
					result = (absMb / 1024).toFixed(2) + 'GB';
				}

				// 添加负号
				return isNegative ? '-' + result : result;
			},
			openExpand() {
				if (this.userRole == 'none') {
					uni.showToast({
						title: '请先开通会员',
						icon: 'none'
					})
					return;
				}
				this.expandVisible = true;
			},
			openFlowExpand() {
				if (this.userRole == 'none') {
					uni.showToast({
						title: '请先开通会员',
						icon: 'none'
					})
					return;
				}
				this.flowExpandVisible = true;
			},
			handleExpandConfirm(payload) {
				this.expandVisible = false;
				const option = payload && payload.option ? payload.option : null;
				if (!option || !option.id) {
					uni.showToast({
						title: '请选择扩容套餐',
						icon: 'none'
					});
					return;
				}
				uni.showModal({
					title: '确认购买',
					content: `确定购买${option.space}GB（${option.month}个月）？价格：¥${option.price}`,
					success: (res) => {
						if (res.confirm) {
							this.$request.post(`/wechat/space/order?id=${option.id}`).then(orderRes => {
								if (orderRes.code !== 200) {
									uni.showToast({
										title: orderRes.msg || '下单失败',
										icon: 'none'
									});
									return;
								}
								let payParams = orderRes.data;
								if (typeof payParams === 'string') {
									try {
										payParams = JSON.parse(payParams);
									} catch (e) {}
								}
								uni.requestPayment({
									provider: 'wxpay',
									...payParams,
									success: () => {
										uni.showToast({
											title: '支付成功',
											icon: 'success'
										});
										this.loadStorageInfo();
									},
									fail: (err) => {
										uni.showToast({
											title: err.errMsg && err.errMsg
												.indexOf('cancel') !== -1 ?
												'支付已取消' : '支付失败',
											icon: 'none'
										});
									}
								});
							});
						}
					}
				});
			},
			handleFlowExpandConfirm(payload) {
				this.flowExpandVisible = false;
				const packageId = payload && payload.packageId ? payload.packageId : null;
				if (!packageId) {
					uni.showToast({
						title: '请选择流量套餐',
						icon: 'none'
					});
					return;
				}
				uni.showModal({
					title: '确认购买',
					content: `确定购买流量包？`,
					success: (res) => {
						if (res.confirm) {
							this.$request.post(`/wechat/flow/flowPackagePay`, {
								packageId
							}).then(orderRes => {
								if (orderRes.code !== 200) {
									uni.showToast({
										title: orderRes.msg || '下单失败',
										icon: 'none'
									});
									return;
								}
								let payParams = orderRes.data;
								if (typeof payParams === 'string') {
									try {
										payParams = JSON.parse(payParams);
									} catch (e) {}
								}
								uni.requestPayment({
									provider: 'wxpay',
									...payParams,
									success: () => {
										uni.showToast({
											title: '支付成功',
											icon: 'success'
										});
										this.loadStorageInfo();
									},
									fail: (err) => {
										uni.showToast({
											title: err.errMsg && err.errMsg
												.indexOf('cancel') !== -1 ?
												'支付已取消' : '支付失败',
											icon: 'none'
										});
									}
								});
							});
						}
					}
				});
			},
			async openUsedFlowDetail() {
				this.showUsedFlowDetail = true;
				// 生成今日、昨日、前日的日期
				const today = new Date();
				const yesterday = new Date(today);
				yesterday.setDate(yesterday.getDate() - 1);
				const dayBeforeYesterday = new Date(today);
				dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);


				// 格式化日期为 YYYY-MM-DD
				const formatDate = (date) => {
					return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(
						date.getDate()).padStart(2, '0');
				};

				const todayStr = formatDate(today);
				const yesterdayStr = formatDate(yesterday);
				const dayBeforeYesterdayStr = formatDate(dayBeforeYesterday);

				// 获取流量使用历史数据
				try {
					const flowRes = await this.$request.get('/wechat/flow/findFlowByDay');
					if (flowRes.code === 200 && flowRes.data) {
						// 转换接口返回的数据格式
						this.flowHistory = flowRes.data.map(item => ({
							...item,
							value: item.usage / 1024, // 转换为 MB
							hourlyData: [] // 初始化为空数组，后续通过 toggleFlowDetail 获取
						}));
					} else {
						// // 如果接口调用失败，使用默认数据
						this.flowHistory = [];
					}
				} catch (error) {
					console.error('获取流量历史数据失败:', error);
					// 如果接口调用失败，使用默认数据
					this.flowHistory = [];
				}
			},
			async openTotalFlowDetail() {
				this.showTotalFlowDetail = true;
				try {
					// 获取总流量详情数据
					const flowRes = await this.$request.get('/wechat/flow/findUserFlowBucketInfo');
					if (flowRes.code === 200 && flowRes.data) {
						const flowData = flowRes.data;
						// 将 KB 转换为 MB
						this.memberFlow = (flowData.memberFlow || 0) / 1024;
						this.paidFlow = (flowData.purchaseFlow || 0) / 1024;
						this.totalFlow = (flowData.totalFlow || 0) / 1024;
					}
				} catch (flowError) {
					console.error('获取总流量详情失败:', flowError);
					// 如果接口调用失败，使用默认值
					this.memberFlow = 0;
					this.paidFlow = 0;
				}
			},
			getDatePrefix(dateStr) {
				// 解析日期字符串
				const date = new Date(dateStr);
				const today = new Date();
				const yesterday = new Date(today);
				yesterday.setDate(yesterday.getDate() - 1);
				const dayBeforeYesterday = new Date(today);
				dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

				// 格式化日期，只比较年月日
				const formatDate = (date) => {
					return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date
						.getDate()).padStart(2, '0');
				};

				const dateStrFormatted = formatDate(date);
				const todayFormatted = formatDate(today);
				const yesterdayFormatted = formatDate(yesterday);
				const dayBeforeYesterdayFormatted = formatDate(dayBeforeYesterday);

				// 判断日期是今天、昨天还是前天
				if (dateStrFormatted === todayFormatted) {
					return '今日';
				} else if (dateStrFormatted === yesterdayFormatted) {
					return '昨日';
				} else if (dateStrFormatted === dayBeforeYesterdayFormatted) {
					return '前日';
				} else {
					return '';
				}

			}
		}
	};
</script>

<style scoped>
	.page {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
	}

	.storage-card {
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.storage-card:active {
		transform: translateY(-2rpx);
		box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
	}

	/* 卡片头部 */
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.header-icon {
		width: 32rpx;
		height: 32rpx;
	}

	.header-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.header-usage {
		font-size: 24rpx;
		color: #999;
	}

	/* 进度条部分 */
	.progress-section {
		margin-bottom: 30rpx;
		text-align: center;
	}

	.progress-bar {
		width: 100%;
		height: 12rpx;
		background-color: #f0f0f0;
		border-radius: 6rpx;
		overflow: hidden;
		margin-bottom: 12rpx;
	}

	.progress-fill {
		height: 100%;
		border-radius: 6rpx;
		transition: width 0.3s ease;
	}

	.progress-fill.blue {
		background-color: rgba(243, 119, 56,0.7);
	}

	.progress-fill.red {
		background-color: rgba(255, 0, 0, 0.7);
		box-shadow: 0 0 8rpx rgba(255, 0, 0, 0.3);
	}

	.progress-text {
		font-size: 28rpx;
		color: #444444;
		text-align: center;
	}

	.warning-text {
		color: #ff0000;
		font-weight: bold;
	}

	/* 存储详情 */
	.storage-details {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.detail-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8rpx;
	}

	.detail-label {
		font-size: 28rpx;
		color: #999;
	}

	.detail-value {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
	}

	.detail-value.negative {
		color: #ff6b6b;
	}

	.detail-link {
		font-size: 24rpx;
		color: #F37738;
		margin-top: 4rpx;
	}

	/* 操作按钮 */
	.action-btn {
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		color: #ffffff;
		font-size: 30rpx;
		font-weight: 600;
		border: none;
		transition: all 0.3s ease;
		background-color:rgba(243, 119, 56)
	}


	.action-btn:active {
		transform: translateY(2rpx);
		opacity: 0.9;
	}

	/* 弹窗样式 */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.modal-content {
		background: #fff;
		border-radius: 30rpx;
		padding: 10rpx 0 10rpx;
		min-height: 200rpx;
		margin: 10rpx;
	}

	.wp-handle {
		width: 100rpx;
		height: 15rpx;
		background: #d3d3d3;
		border-radius: 10rpx;
		margin: 10rpx auto 10rpx;
	}

	.modal-header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
		position: relative;
	}

	.modal-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
	}

	.modal-close {
		position: absolute;
		right: 30rpx;
		font-size: 40rpx;
		color: #999;
		line-height: 1;
	}

	.modal-body {
		padding: 20rpx;
		max-height: 85vh;
		overflow-y: auto;
	}

	.flow-info-card {
		margin-bottom: 20rpx;
		padding: 20rpx;
		background-color: #f9f9f9;
		border-radius: 10rpx;
	}

	.flow-info-card.highlighted {
		background-color:rgba(243, 119, 56, 0.2);
	}

	.flow-info-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.flow-info-text {
		flex: 1;
		padding-right: 20rpx;
	}

	.flow-info-value-container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.flow-info-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 12rpx;
	}

	.flow-info-subtitle {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 4rpx;
		white-space: normal;
		word-break: break-all;
	}

	.flow-info-value {
		font-size: 40rpx;
		font-weight: bold;
		color: rgba(243, 119, 56,0.7);
		margin-bottom: 8rpx;
	}

	.flow-info-text {
		font-size: 26rpx;
		color: #666;
		line-height: 40rpx;
		margin-bottom: 12rpx;
		white-space: normal;
		word-break: break-all;
	}

	.flow-history {
		margin-top: 10rpx;
	}

	.flow-history-item {
		display: flex;
		flex-direction: column;
		padding: 10rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.flow-history-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
		/* border-bottom: 1rpx solid #f0f0f0; */
	}

	.flow-history-date {
		font-size: 28rpx;
		color: #666;
		font-weight: 500;
	}

	.flow-history-right {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.flow-history-value {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
	}

	.flow-history-detail {
		font-size: 22rpx;
		color: rgba(243, 119, 56,0.7);
		background-color:rgba(243, 119, 56, 0.2);
		padding: 6rpx 20rpx;
		border-radius: 20rpx;
	}

	.flow-info-card.flow-description {
		border-left: 4rpx solid rgba(243, 119, 56);
		border-top: 1rpx solid #e6f7ff;
		border-right: 1rpx solid #e6f7ff;
		border-bottom: 1rpx solid #e6f7ff;
		border-radius: 10rpx;
		background-color: #ffffff;
	}

	.flow-info-card.flow-used {
		background:rgba(243, 119, 56, 0.2);
		/* border: 1rpx solid #007aff; */
		border-radius: 16rpx;
		padding: 24rpx;
		/* box-shadow: 0 4rpx 16rpx rgba(0, 122, 255, 0.1); */
		margin-bottom: 10rpx;
	}

	.flow-history-item.flow-history-card {
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		background-color: #ffffff;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	/* 流量趋势图 - 修改样式 */
	.flow-trend {
		padding: 10rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.flow-trend-title {
		font-size: 28rpx;
		font-weight: 500;
		color: #333;
		margin-bottom: 20rpx;
		padding-left: 24rpx;
		position: relative;
		text-align: center;
	}


	.flow-trend-chart {
		width: 100%;
		position: relative;
		min-height: 260rpx;
		box-sizing: border-box;
	}

	/* Y轴刻度 */
	.flow-trend-y-axis {
		position: absolute;
		left: 0;
		top: 0;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999;
		z-index: 5;
		text-align: right;
		width: 60rpx;
		padding: 5rpx 0;
	}

	.flow-trend-y-axis text {
		line-height: 1;
		font-weight: 400;
	}

	/* SVG容器 */
	.flow-trend-line {
		width: 100%;
		height: 180rpx;
		display: block;
		margin-left: 60rpx;
		background-color: transparent;
		overflow: visible;
	}

	/* X轴刻度 */
	.flow-trend-x-axis {
		display: flex;
		justify-content: space-between;
		margin-left: 60rpx;
		margin-top: 16rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #999;
		width: calc(100% - 90rpx);
		box-sizing: border-box;
	}

	.flow-trend-x-axis text {
		text-align: center;
		white-space: nowrap;
		transform: translateX(-10rpx);
		/* 微调对齐 */
	}

	/* 添加cover-view相关样式 */
	.simple-chart-container {
		position: relative;
		width: 100%;
		min-height: 400rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		display: block;
	}

	.simple-y-axis {
		position: absolute;
		left: 0;
		top: 10rpx;
		height: 340rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999;
		width: 80rpx;
		text-align: right;
		padding: 10rpx 0;
		z-index: 5;
	}

	.canvas-wrapper {
		margin-left: 80rpx;
		width: calc(100% - 80rpx);
		height: 360rpx;
	}

	.simple-x-axis {
		display: flex;
		justify-content: space-between;
		margin-left: 60rpx;
		margin-top: 5rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #999;
		width: calc(100% - 100rpx);
		box-sizing: border-box;
	}

	.y-axis-text,
	.x-axis-text {
		line-height: 1;
		white-space: nowrap;
	}

	.charts-box {
		width: 100%;
		height: 300rpx;
		margin-top: 20rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
	}

	.charts-container {
		position: relative;
		width: 100%;
	}

	.y-axis-unit {
		position: absolute;
		top: 30rpx;
		right: 20rpx;
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
	}

	/* 为了让Y轴坐标显示单位，尝试修改图表边距，为单位留出空间 */
	.charts-box {
		padding-right: 40rpx;
	}
</style>