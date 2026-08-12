<template>
	<view class="task-order-page"
		:class="{ 'pc-pulling': pcPulling && pcPullDistance > 0 }"
		@mousedown="onPcPullStart"
		@mousemove="onPcPullMove"
		@mouseup="onPcPullEnd"
		@mouseleave="onPcPullEnd"
		@touchstart.passive="onPcPullStart"
		@touchmove.passive="onPcPullMove"
		@touchend="onPcPullEnd">
		<view class="header-panel">
			<view class="tab-scroll"
				:class="{ 'is-dragging': isDragging }"
				@mousedown="onDragStart"
				@mousemove="onDragMove"
				@mouseup="onDragEnd"
				@mouseleave="onDragEnd"
				@touchstart="onDragStart"
				@touchmove="onDragMove"
				@touchend="onDragEnd"
				@wheel="onWheel">
				<view class="tabs" :style="{ transform: 'translateX(' + translateX + 'px)' }">
					<view
						v-for="tab in tabs"
						:key="tab.value"
						class="tab-item"
						:class="{ active: activeTab === tab.value }"
						@click="changeTab(tab.value)"
					>
						<text>{{ tab.label }}</text>
						<image v-if="activeTab === tab.value" class="active-mark" src="/static/common/选中条.png" />
					</view>
				</view>
			</view>

			<view class="search-bar">
				<view class="search-icon"></view>
				<input
					v-model="keyword"
					class="search-input"
					placeholder="搜索订单"
					placeholder-class="search-placeholder"
					confirm-type="search"
					@input="handleKeywordInput"
					@confirm="triggerSearch"
				/>
			</view>
		</view>

		<view class="pc-list-wrap">
			<view
				class="pc-pull-tip"
				:class="{ 'pc-pull-visible': pcPullTranslateY > 0 || refreshing }"
				:style="{ height: pcPullThreshold + 'px', marginTop: (-pcPullThreshold) + 'px' }">
				<view class="pc-pull-inner">
					<view class="pc-pull-spinner" v-if="refreshing"></view>
					<text class="pc-pull-text">{{ pcPullTip }}</text>
				</view>
			</view>
			<view class="pc-scroll-wrap" :style="{ transform: 'translateY(' + pcPullTranslateY + 'px)', transition: (pcPulling ? 'none' : 'transform .25s ease-out') }">
		<scroll-view class="page-scroll" scroll-y :lower-threshold="80"
			refresher-enabled
			:refresher-triggered="refreshing"
			refresher-background="#ffffff"
			@refresherrefresh="handleRefresh"
			@scrolltolower="loadMore"
			@scroll="handleContentScroll">
			<view class="order-list">
				<view
					v-for="item in orderList"
					:key="item.id"
					class="order-card"
					:class="[item.themeClass, { expanded: item.expanded, compact: item.compact }]"
					@click="toggleExpand(item.id)"
				>
					<view class="card-main">
						<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
						<view class="customer-block">
							<text class="customer-name">{{ item.customerName }}</text>
							<text class="time-text">下单:{{ item.orderDate }}</text>
						</view>
						<view class="amount-block">
							<text class="amount-text">¥{{ item.amount }}</text>
							<text class="time-text">交付时间:{{ item.deliveryDate }}</text>
						</view>
						<view class="status-wrap">
							<text class="status-text">{{ item.statusText }}</text>
							<view v-if="item.badgeCount" class="status-badge">{{ item.badgeCount }}</view>
						</view>
						<text v-if="item.orderNo || item.taskTitle" class="order-info-line">
							{{ item.orderNo ? '订单号: ' + item.orderNo : '' }}{{ item.orderNo && item.taskTitle ? '  ' : '' }}{{ item.taskTitle ? '任务: ' + item.taskTitle : '' }}
						</text>
					</view>

					<view v-if="item.expanded" class="detail-panel" @click.stop="noop">
						<view class="detail-head" @click.stop="toggleExpand(item.id)">
							<view class="detail-title-wrap">
								<text class="detail-title">{{ item.taskTitle }}</text>
								<view
									class="detail-view-btn"
									:class="{ 'detail-view-btn-collapse': item.taskDetailVisible }"
									@click.stop="toggleTaskDetail(item)"
								>{{ item.taskDetailVisible ? '收起' : '查看详情' }}</view>
								<view class="expand-icon" :class="{ open: item.expanded }"></view>
							</view>
						</view>

						<view v-if="item.taskDetailVisible" class="task-detail-inline">
							<view v-if="item.taskDetailLoading" class="task-detail-loading">加载中...</view>
							<view v-else-if="item.taskDetailError" class="task-detail-error">{{ item.taskDetailError }}</view>
							<view v-else class="task-detail-content">
								<view class="task-detail-hero">
									<swiper
										v-if="item.taskDetailImages && item.taskDetailImages.length > 0"
										class="task-detail-swiper"
										:indicator-dots="false"
										:circular="true"
										@change="onTaskDetailPosterChange($event, item)"
									>
										<swiper-item v-for="(image, imgIndex) in item.taskDetailImages" :key="image + '-' + imgIndex">
											<image class="task-detail-poster" :src="image" mode="aspectFill" @click.stop="previewTaskDetailImage(item, imgIndex)"></image>
										</swiper-item>
									</swiper>
									<view v-else class="task-detail-empty-poster">暂无封面</view>
									<view v-if="item.taskDetailImages && item.taskDetailImages.length > 0" class="task-detail-poster-count">
										{{ (item.taskDetailPosterIndex || 0) + 1 }}/{{ item.taskDetailImages.length }}
									</view>
								</view>
								<text class="task-detail-title">{{ item.taskDetail.taskTitleSnapshot || '暂无标题' }}</text>
								<text class="task-detail-desc">{{ item.taskDetail.taskDescSnapshot || '暂无描述' }}</text>
								<view class="task-detail-section">
									<text class="task-detail-section-title">专业类型</text>
									<view v-if="item.taskDetailProfessions && item.taskDetailProfessions.length" class="task-detail-tags">
										<view
											v-for="(tag, tagIndex) in item.taskDetailProfessions"
											:key="tag + '-' + tagIndex"
											class="task-detail-profession-tag"
										>{{ tag }}</view>
									</view>
									<text v-else class="task-detail-empty-tags">暂无专业类型</text>
								</view>
								<view class="task-detail-dash-divider"></view>
								<view class="task-detail-section">
									<text class="task-detail-section-title">服务要求</text>
									<view v-if="item.taskDetailGuarantees && item.taskDetailGuarantees.length" class="task-detail-tags">
										<view
											v-for="(tag, tagIndex) in item.taskDetailGuarantees"
											:key="tag + '-' + tagIndex"
											class="task-detail-service-tag"
										>
											<text class="task-detail-check">✓</text>
											<text>{{ tag }}</text>
										</view>
									</view>
									<text v-else class="task-detail-empty-tags">暂无服务保障</text>
								</view>
							</view>
						</view>

						<view class="divider"></view>

						<view v-if="item.timelineLoading" class="detail-loading">加载中...</view>
						<view
							v-else-if="shouldShowInviteEmptyActions(item)"
							class="invite-empty-actions"
						>
							<view class="invite-action-buttons">
								<view
									v-for="action in getOrderFooterActions(item)"
									:key="action.key"
									:class="[action.className, { disabled: action.disabled }]"
									@click.stop="handleAction(action.key, item)"
								>{{ action.loading ? action.loadingText : action.text }}</view>
							</view>
							<view class="invite-user-info">
								<image class="invite-user-avatar" :src="item.avatar" mode="aspectFill"></image>
								<view class="invite-user-text">
									<text class="invite-user-name">{{ item.customerName }}</text>
									<text class="invite-user-time">{{ item.participant.time }}</text>
								</view>
							</view>
						</view>
						<view v-else-if="item.timelineLoaded && item.timelineList.length === 0" class="detail-empty">暂无沟通记录</view>

						<view v-else class="service-detail">
							<view class="timeline-row timeline-row-contact">
								<view class="timeline-contact-row">
									<view class="timeline-contact-user">
										<image class="timeline-contact-avatar" :src="item.avatar" mode="aspectFill"></image>
										<view class="timeline-contact-text">
											<text class="timeline-contact-name">{{ item.customerName }}</text>
											<text class="timeline-contact-time">{{ item.publisherContactTime }}</text>
										</view>
									</view>
									<view
										class="timeline-contact-action"
										:class="{ disabled: item.contactLoading }"
										@click.stop="handleAction('contact', item)"
									>点击获取联系</view>
								</view>
							</view>
							<view
								v-for="(timelineItem, timelineIndex) in getServiceTimeline(item)"
								:key="item.id + '-timeline-' + timelineIndex"
								class="timeline-row"
								:class="timelineItem.rowClass"
							>
								<view v-if="timelineItem.isSystem" class="timeline-system-result">
									<text v-if="timelineItem.content" class="timeline-system-content">{{ timelineItem.content }}</text>
									<text class="timeline-time">{{ timelineItem.time }}</text>
								</view>
								<view v-else class="timeline-user" :class="timelineItem.userClass">
									<image class="timeline-avatar" :src="timelineItem.avatar" mode="aspectFill"></image>
									<view class="timeline-text" :class="timelineItem.textClass">
										<text v-if="!timelineItem.isSelf" class="timeline-name">{{ timelineItem.name }}</text>
										<text v-if="timelineItem.content" class="timeline-content">{{ timelineItem.content }}</text>
										<text class="timeline-time">{{ timelineItem.time }}</text>
									</view>
								</view>
							</view>
							<view
								v-if="item.detailType === 'quote'"
								class="timeline-status-actions"
							>
								<view class="action-group">
									<view
										v-for="action in getOrderFooterActions(item)"
										:key="action.key"
										:class="[action.className, { disabled: action.disabled }]"
										@click.stop="handleAction(action.key, item)"
									>{{ action.loading ? action.loadingText : action.text }}</view>
								</view>
							</view>
							<view
								v-if="item.detailType === 'service' && item.waitingDeliveryConfirm"
								class="delivery-waiting-status"
							>等待对方确认交稿中</view>
							<view
								v-else-if="item.detailType === 'service' && item.orderStatus === 'in_service'"
								class="service-action-bar"
							>
								<view
									v-for="action in getOrderFooterActions(item)"
									:key="action.key"
									:class="[action.className, { disabled: action.disabled }]"
									@click.stop="handleAction(action.key, item)"
								>{{ action.loading ? action.loadingText : action.text }}</view>
								<view class="service-user-info">
									<image class="service-user-avatar" :src="getServiceSubmitterAvatar(item)" mode="aspectFill"></image>
									<view class="service-user-text">
										<text class="service-user-name">{{ getServiceSubmitterName(item) }}</text>
										<text class="service-user-time">{{ getServiceSubmitterTime(item) }}</text>
									</view>
								</view>
							</view>
							<view v-if="item.detailType === 'refund'" class="timeline-status-actions">
								<view
									v-for="action in getOrderFooterActions(item)"
									:key="action.key"
									:class="[action.className, { disabled: action.disabled }]"
									@click.stop="handleAction(action.key, item)"
								>{{ action.loading ? action.loadingText : action.text }}</view>
							</view>
							<view v-if="item.detailType === 'done'" class="timeline-status-actions">
								<view
									v-for="action in getOrderFooterActions(item)"
									:key="action.key"
									:class="[action.className, { disabled: action.disabled }]"
									@click.stop="handleAction(action.key, item)"
								>{{ action.loading ? action.loadingText : action.text }}</view>
							</view>
						</view>
					</view>
				</view>

				<view v-if="!loading && orderList.length === 0" class="empty-state">暂无订单</view>
			<view v-else class="load-state">{{ loadText }}</view>
		</view>
	</scroll-view>
			</view>
		</view>
		<reject-reason-popup
			:visible="rejectPopupVisible"
			:reasons="rejectReasons"
			:loading="rejectPopupLoading"
			@close="closeRejectPopup"
			@confirm="confirmRejectReason"
		/>
		<contact-info-popup
			:visible="contactPopup.visible"
			:phone="contactPopup.phone"
			:wx-number="contactPopup.wxNumber"
			:wechat="contactPopup.wxNumber"
			@close="closeContactPopup"
		/>
		<view v-if="extraChargePopup.visible" class="extra-charge-mask" @click="closeExtraChargePopup">
			<view class="extra-charge-popup" @click.stop="noop">
				<text class="extra-charge-title">申请加钱</text>
				<input
					class="extra-charge-input"
					v-model="extraChargePopup.amount"
					type="digit"
					placeholder="请输入加价金额"
					placeholder-class="extra-charge-input-placeholder"
					confirm-type="done"
				/>
				<view class="extra-charge-actions">
					<view class="extra-charge-btn cancel" @click="closeExtraChargePopup">取消</view>
					<view
						class="extra-charge-btn confirm"
						:class="{ disabled: extraChargePopup.submitting }"
						@click="confirmExtraCharge"
					>{{ extraChargePopup.submitting ? '提交中' : '确认' }}</view>
				</view>
			</view>
		</view>
		<view v-if="quoteInvitePopup.visible" class="extra-charge-mask" @click="closeQuoteInvitePopup">
			<view class="extra-charge-popup" @click.stop="noop">
				<text class="extra-charge-title">提交报价</text>
				<input
					class="extra-charge-input"
					v-model="quoteInvitePopup.amount"
					type="digit"
					placeholder="请输入报价金额"
					placeholder-class="extra-charge-input-placeholder"
					confirm-type="done"
				/>
				<view class="extra-charge-actions">
					<view class="extra-charge-btn cancel" @click="closeQuoteInvitePopup">取消</view>
					<view
						class="extra-charge-btn confirm"
						:class="{ disabled: quoteInvitePopup.submitting }"
						@click="confirmQuoteInviteOrder"
					>{{ quoteInvitePopup.submitting ? '提交中' : '确认' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from '@/utils/request.js'
import env from '@/config/env.js'
import RejectReasonPopup from '@/components/reject-reason-popup.vue'
import ContactInfoPopup from '@/components/contact-info-popup.vue'

const DEFAULT_AVATAR = '/static/yunyiku/avatar.png'
const ORDER_STATUS_MAP = {
	pending_accept: {
		tab: 'pending',
		statusText: '待接单',
		themeClass: 'theme-pending',
		detailType: 'quote',
		compact: false
	},
	in_service: {
		tab: 'service',
		statusText: '服务中',
		themeClass: 'theme-service',
		detailType: 'service',
		compact: false
	},
	cancelled: {
		tab: 'rejected',
		statusText: '已婉拒',
		themeClass: 'theme-rejected',
		detailType: 'reason',
		compact: false
	},
	refunding: {
		tab: 'refund',
		statusText: '退款中',
		themeClass: 'theme-refund',
		detailType: 'refund',
		compact: false
	},
	completed: {
		tab: 'done',
		statusText: '已完成',
		themeClass: 'theme-done',
		detailType: 'done',
		compact: false
	}
}

export default {
	components: {
		RejectReasonPopup,
		ContactInfoPopup
	},
	data() {
		return {
			activeTab: 'all',
			keyword: '',
			searchTimer: null,
			pageNum: 1,
			pageSize: 8,
			total: 0,
			loading: false,
			finished: false,
			requestSeq: 0,
			currentUserId: '',
			rejectPopupVisible: false,
			rejectPopupLoading: false,
			rejectTargetItem: null,
			rejectReasons: [
				'需求暂不清晰，暂不承接',
				'档期已满，暂不接单',
				'擅长领域不符',
				'预算不符，暂不合作',
				'时间紧张，怕影响效果',
				'感谢信任，暂不合作'
			],
			contactPopup: {
				visible: false,
				phone: '',
				wxNumber: ''
			},
			extraChargePopup: {
				visible: false,
				item: null,
				amount: '',
				submitting: false
			},
			quoteInvitePopup: {
				visible: false,
				item: null,
				amount: '',
				submitting: false
			},
			tabs: [
				{ label: '全部', value: 'all', status: '' },
				{ label: '待接单', value: 'pending', status: 'pending_accept' },
				{ label: '服务中', value: 'service', status: 'in_service' },
				{ label: '取消/婉拒', value: 'rejected', status: 'cancelled' },
				{ label: '退款中', value: 'refund', status: 'refunding' },
				{ label: '已完成', value: 'done', status: 'completed' }
			],
			orderList: [],
			translateX: 0,
			isDragging: false,
			dragStartX: 0,
			dragStartTranslate: 0,
			maxScroll: 0,
			hasDragged: false,
			preventClick: false,
			refreshing: false,
			pcPullStartY: 0,
			pcPullDistance: 0,
			pcPulling: false,
			pcPullTriggered: false,
			pcPullThreshold: 70,
			pcScrollTop: 0
		}
	},
	computed: {
		loadText() {
			if (this.loading) {
				return '加载中...'
			}
			if (this.orderList.length === 0) {
				return ''
			}
			return this.finished ? '没有更多了' : '上滑加载更多'
	},
		pcPullTranslateY() {
			if (this.refreshing) {
				return this.pcPullThreshold
			}
			if (!this.pcPulling || this.pcPullDistance <= 0) {
				return 0
			}
			return Math.min(this.pcPullDistance, this.pcPullThreshold * 2.2)
		},
		pcPullTip() {
			if (this.refreshing) {
				return '正在刷新...'
			}
			return this.pcPullDistance >= this.pcPullThreshold ? '松开立即刷新' : '下拉可以刷新'
		}
	},
	onLoad() {
		this.refreshCurrentUserId()
		this.resetList()
	},
	onShow() {
		this.refreshCurrentUserId()
		if (!this.orderList.length) {
			return
		}
		this.resetList()
	},
	updated() {
		this.$nextTick(() => { this.updateScrollBounds(); })
	},
	beforeDestroy() {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer)
			this.searchTimer = null
		}
	},
	methods: {
		noop() {},
		refreshCurrentUserId() {
			this.currentUserId = this.getCurrentUserId()
		},
		getCurrentUserId() {
			const isTeamMode = !!uni.getStorageSync('isTeamMode')
			const userInfo = uni.getStorageSync('userInfo') || {}
			if (isTeamMode) {
				return uni.getStorageSync('teamOwnerId') || userInfo.id || userInfo.userId || ''
			}
			return userInfo.id || userInfo.userId || ''
		},
		isSelfTimeline(record) {
			const senderUserId = record && record.senderUserId
			if (senderUserId === undefined || senderUserId === null || senderUserId === '' || this.currentUserId === '') {
				return false
			}
			return String(senderUserId) === String(this.currentUserId)
		},
		isDeliveryPendingTimeline(record) {
			if (!record) {
				return false
			}
			const eventType = record.event_type || record.eventType
			const actionStatus = record.actionStatus || record.action_status
			return eventType === 'delivery_apply' && actionStatus === 'pending'
		},
		hasPendingDeliveryApply(timelineList) {
			return Array.isArray(timelineList) && timelineList.some(item => this.isDeliveryPendingTimeline(item))
		},
		isRefundPendingTimeline(record) {
			if (!record) {
				return false
			}
			const eventType = record.event_type || record.eventType
			const actionStatus = record.actionStatus || record.action_status
			return eventType === 'refund_apply' && actionStatus === 'pending'
		},
		goBack() {
			if (getCurrentPages().length > 1) {
				uni.navigateBack()
				return
			}
			uni.switchTab({
				url: '/pages/profile/index'
			})
		},
		changeTab(value) {
			if (this.preventClick) return;
			if (this.activeTab === value) {
				return
			}
			this.activeTab = value
			this.resetList()
		},
		updateScrollBounds() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.tab-scroll').boundingClientRect();
			query.select('.tabs').boundingClientRect();
			query.exec(res => {
				if (res && res[0] && res[1]) {
					this.maxScroll = Math.max(0, res[1].width - res[0].width);
					if (this.translateX < -this.maxScroll) {
						this.translateX = -this.maxScroll;
					}
				}
			});
		},
		onDragStart(e) {
			this.isDragging = true;
			this.hasDragged = false;
			const point = (e.touches && e.touches[0]) ? e.touches[0] : e;
			this.dragStartX = point.clientX || 0;
			this.dragStartTranslate = this.translateX;
		},
		onDragMove(e) {
			if (!this.isDragging) return;
			const point = (e.touches && e.touches[0]) ? e.touches[0] : e;
			const delta = (point.clientX || 0) - this.dragStartX;
			if (Math.abs(delta) > 5) { this.hasDragged = true; }
			let newX = this.dragStartTranslate + delta;
			newX = Math.max(-this.maxScroll, Math.min(0, newX));
			this.translateX = newX;
		},
		onDragEnd() {
			this.isDragging = false;
			if (this.hasDragged) {
				this.preventClick = true;
				setTimeout(() => { this.preventClick = false; }, 100);
			}
		},
		onWheel(e) {
			if (this.maxScroll <= 0) return;
			const delta = (e.deltaY || 0) + (e.deltaX || 0);
			if (!delta) return;
			if (e.preventDefault) {
				try { e.preventDefault(); } catch (err) {}
			}
			let newX = this.translateX - delta;
			newX = Math.max(-this.maxScroll, Math.min(0, newX));
			this.translateX = newX;
		},
		handleKeywordInput() {
			if (this.searchTimer) {
				clearTimeout(this.searchTimer)
			}
			this.searchTimer = setTimeout(() => {
				this.searchTimer = null
				this.resetList()
			}, 300)
		},
		triggerSearch() {
			if (this.searchTimer) {
				clearTimeout(this.searchTimer)
				this.searchTimer = null
			}
			this.resetList()
		},
		toggleExpand(id) {
			let shouldFetchTimeline = false
			this.orderList = this.orderList.map(orderItem => {
				if (orderItem.id !== id) {
					return orderItem
				}
				const expanded = !orderItem.expanded
				if (expanded && !orderItem.timelineLoaded && !orderItem.timelineLoading && orderItem.orderNo) {
					shouldFetchTimeline = true
				}
				return {
					...orderItem,
					expanded
				}
			})
			if (shouldFetchTimeline) {
				this.fetchTimeline(id)
			}
		},
		updateOrderItem(id, updater) {
			this.orderList = this.orderList.map(orderItem => {
				if (orderItem.id !== id) {
					return orderItem
				}
				return updater(orderItem)
			})
		},
		handleAction(type, item) {
			if (type === 'quoted') {
				return
			}
			if (type === 'reject') {
				this.openRejectPopup(item)
				return
			}
			if (type === 'submitDelivery') {
				this.applyDelivery(item)
				return
			}
			if (type === 'accept') {
				this.acceptOrder(item)
				return
			}
			if (type === 'quote') {
				this.openQuoteInvitePopup(item)
				return
			}
			if (type === 'handleRefund') {
				if (!item || item.refundHandleLoading) {
					return
				}
				const refundTimeline = this.getPendingRefundTimeline(item)
				if (!item.orderNo || !refundTimeline || !refundTimeline.timelineId) {
					uni.showToast({
						title: '退款申请信息缺失，无法处理',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '处理退款',
					content: '请选择是否同意该退款申请',
					confirmText: '同意',
					cancelText: '拒绝',
					confirmColor: '#F37738',
					success: res => {
						if (res.confirm) {
							this.handleRefund(item, refundTimeline, 'agree')
							return
						}
						if (res.cancel) {
							this.handleRefund(item, refundTimeline, 'reject')
						}
					}
				})
				return
			}
			if (type === 'contact') {
				this.showContact(item)
				return
			}
			if (type === 'addBudget') {
				this.openExtraChargePopup(item)
				return
			}
			const textMap = {
				quote: '报价',
				refund: '退款处理中',
				review: '评价'
			}
			uni.showToast({
				title: `${item.customerName}${textMap[type] || '操作'}功能待接入`,
				icon: 'none'
			})
		},
		openWithdrawalDetail(item) {
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法查看详情',
					icon: 'none'
				})
				return
			}
			const query = [
				`orderNo=${encodeURIComponent(item.orderNo)}`,
				`amount=${encodeURIComponent(item.orderAmount || '')}`,
				'hideWithdraw=1'
			].join('&')
			uni.navigateTo({
				url: `/subpkg-profile/pages/withdrawalcenter/detail/index?${query}`
			})
		},
		async toggleTaskDetail(item) {
			if (!item || !item.orderNo) {
				return
			}
			if (item.taskDetailVisible) {
				item.taskDetailVisible = false
				return
			}
			item.taskDetailVisible = true
			if (item.taskDetailLoaded || item.taskDetailLoading) {
				return
			}
			await this.fetchTaskDetail(item)
		},
		async fetchTaskDetail(item) {
			if (!item || !item.orderNo || item.taskDetailLoading) {
				return
			}
			this.updateOrderItem(item.id, orderItem => ({
				...orderItem,
				taskDetailLoading: true,
				taskDetailError: ''
			}))
			try {
				const res = await request.get('/wechat/withdrawal/taskDetail', {
					orderNo: item.orderNo
				})
				const detail = this.extractTaskDetailData(res)
				const images = this.normalizeImageList(detail.imageList).map(url => this.buildImageUrl(url)).filter(Boolean)
				const professions = this.normalizeProfessionList(detail.professionList)
				const guarantees = this.normalizeGuaranteeList(detail.guaranteeList)
				this.updateOrderItem(item.id, orderItem => ({
					...orderItem,
					taskDetail: detail,
					taskDetailImages: images,
					taskDetailProfessions: professions,
					taskDetailGuarantees: guarantees,
					taskDetailPosterIndex: 0,
					taskDetailLoaded: true,
					taskDetailLoading: false,
					taskDetailError: ''
				}))
			} catch (e) {
				this.updateOrderItem(item.id, orderItem => ({
					...orderItem,
					taskDetailLoading: false,
					taskDetailError: (e && e.msg) || '订单详情加载失败'
				}))
			}
		},
		extractTaskDetailData(res) {
			const candidates = [
				res && res.data,
				res && res.data && res.data.data,
				res
			]
			return candidates.find(item => item && typeof item === 'object' && !Array.isArray(item)) || {}
		},
		normalizeImageList(value) {
			if (!value) {
				return []
			}
			if (Array.isArray(value)) {
				return value.filter(Boolean)
			}
			if (typeof value === 'string') {
				const text = value.trim()
				if (!text) {
					return []
				}
				if (text[0] === '[') {
					try {
						const parsed = JSON.parse(text)
						return Array.isArray(parsed) ? parsed.filter(Boolean) : []
					} catch (e) {
						return []
					}
				}
				return text.split(',').map(item => item.trim()).filter(Boolean)
			}
			return []
		},
		normalizeProfessionList(value) {
			if (!Array.isArray(value)) {
				return []
			}
			return value
				.map(item => {
					if (!item) {
						return ''
					}
					if (typeof item === 'string') {
						return item.trim()
					}
					return String(
						item.professionCategoryName ||
						item.categoryName ||
						item.professionName ||
						item.name ||
						item.label ||
						item.description ||
						''
					).trim()
				})
				.filter(Boolean)
		},
		normalizeGuaranteeList(value) {
			if (!Array.isArray(value)) {
				return []
			}
			return value
				.map(item => {
					if (!item) {
						return ''
					}
					if (typeof item === 'string') {
						return item.trim()
					}
					return String(item.description || '').trim()
				})
				.filter(Boolean)
		},
		onTaskDetailPosterChange(event, item) {
			if (!item) {
				return
			}
			this.updateOrderItem(item.id, orderItem => ({
				...orderItem,
				taskDetailPosterIndex: event.detail.current || 0
			}))
		},
		previewTaskDetailImage(item, index) {
			if (!item || !item.taskDetailImages || !item.taskDetailImages.length) {
				return
			}
			uni.previewImage({
				urls: item.taskDetailImages,
				current: item.taskDetailImages[index] || item.taskDetailImages[0]
			})
		},
		openRejectPopup(item) {
			if (!item || item.rejectLoading) {
				return
			}
			this.rejectTargetItem = item
			this.rejectPopupVisible = true
		},
		closeRejectPopup() {
			if (this.rejectPopupLoading) {
				return
			}
			this.rejectPopupVisible = false
			this.rejectTargetItem = null
		},
		confirmRejectReason(reason) {
			if (!this.rejectTargetItem || this.rejectPopupLoading) {
				return
			}
			this.rejectOrder(this.rejectTargetItem, reason)
		},
		loadMore() {
		if (this.loading || this.finished) {
			return
		}
		this.fetchOrderList(this.pageNum + 1, false)
	},
	resetList() {
		this.pageNum = 1
		this.total = 0
		this.finished = false
		this.orderList = []
		return this.fetchOrderList(1, true)
	},
	async handleRefresh() {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer)
			this.searchTimer = null
		}
		this.refreshing = true
		try {
			await this.resetList()
		} finally {
			this.refreshing = false
		}
	},
	handleContentScroll(e) {
		const detail = e && e.detail ? e.detail : {}
		this.pcScrollTop = typeof detail.scrollTop === 'number' ? detail.scrollTop : 0
	},
	getPointerY(e) {
		if (!e) return 0
		const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0])
		if (touch && typeof touch.clientY === 'number') return touch.clientY
		if (typeof e.clientY === 'number') return e.clientY
		return 0
	},
	onPcPullStart(e) {
		if (this.refreshing) return
		const y = this.getPointerY(e)
		if (this.pcScrollTop > 0) {
			this.pcPulling = false
			return
		}
		this.pcPulling = true
		this.pcPullTriggered = false
		this.pcPullStartY = y
		this.pcPullDistance = 0
	},
	onPcPullMove(e) {
		if (!this.pcPulling || this.refreshing) return
		const y = this.getPointerY(e)
		let delta = y - this.pcPullStartY
		if (delta <= 0) {
			this.pcPullDistance = 0
			return
		}
		const max = this.pcPullThreshold * 2.2
		if (delta > max) {
			delta = max + (delta - max) * 0.3
		}
		this.pcPullDistance = delta
		if (delta >= this.pcPullThreshold) {
			this.pcPullTriggered = true
		}
	},
	onPcPullEnd() {
		if (!this.pcPulling) return
		const triggered = this.pcPullTriggered
		this.pcPulling = false
		this.pcPullTriggered = false
		this.pcPullDistance = 0
		if (triggered && !this.refreshing) {
			this.handleRefresh()
		}
	},
		async fetchOrderList(pageNum, isRefresh) {
			const currentRequestSeq = ++this.requestSeq
			this.loading = true
			try {
				const res = await request.get('/wechat/tOrder/page', this.buildQueryParams(pageNum))
				if (currentRequestSeq !== this.requestSeq) {
					return
				}
				const pageData = this.extractPageData(res)
				const rows = pageData.rows
				const nextList = rows
					.filter(item => item && typeof item === 'object')
					.map((item, index) => this.normalizeOrder(item, index, pageNum))
				this.pageNum = pageNum
				this.total = Number(pageData.total) || rows.length
				this.orderList = isRefresh ? nextList : this.orderList.concat(nextList)
				this.finished = rows.length < this.pageSize || this.orderList.length >= this.total
			} catch (e) {
				if (currentRequestSeq === this.requestSeq) {
					this.finished = isRefresh
					console.error('订单列表数据处理失败', e)
					uni.showToast({
						title: '订单数据加载失败',
						icon: 'none'
					})
				}
			} finally {
				if (currentRequestSeq === this.requestSeq) {
					this.loading = false
				}
			}
		},
		extractPageData(res) {
			const candidates = [res, res && res.data, res && res.data && res.data.data]
			const pageData = candidates.find(item => item && Array.isArray(item.rows))
			if (pageData) {
				return {
					rows: pageData.rows,
					total: pageData.total
				}
			}
			const list = candidates.find(item => Array.isArray(item))
			return {
				rows: list || [],
				total: list ? list.length : 0
			}
		},
		buildQueryParams(pageNum) {
			const params = {
				pageNum,
				pageSize: this.pageSize
			}
			const currentTab = this.tabs.find(item => item.value === this.activeTab)
			if (currentTab && currentTab.status) {
				params.orderStatus = currentTab.status
			}
			const taskTitle = this.keyword.trim()
			if (taskTitle) {
				params.taskTitle = taskTitle
			}
			return params
		},
		normalizeOrder(item, index = 0, pageNum = 1) {
			const statusConfig = ORDER_STATUS_MAP[item.orderStatus] || {
				tab: 'all',
				statusText: item.orderStatus || '未知状态',
				themeClass: 'theme-service',
				detailType: 'service',
				compact: false
			}
			const payStatus = item.payStatus || item.pay_status || ''
			const statusText = item.orderStatus === 'cancelled' && payStatus === 'refunded'
				? '已取消'
				: statusConfig.statusText
			const publisherName = item.publisherUserName || '发单人'
			const timeText = this.formatDateTime(item.createTime)
			const rawOrderId = item.orderId !== undefined ? item.orderId : (item.id !== undefined ? item.id : item.order_id)
			const orderKey = rawOrderId || item.orderNo || `${item.taskId || item.orderStatus || 'order'}-${item.createTime || pageNum}-${index}`
			return {
				id: String(orderKey),
				orderId: rawOrderId,
				orderNo: item.orderNo ? String(item.orderNo) : '',
				taskId: item.taskId,
				publisherUserId: item.publisherUserId || '',
				orderStatus: item.orderStatus || '',
				payStatus,
				sourceType: item.sourceType || item.source_type || '',
				channelType: item.channelType || item.channel_type || item.sourceType || item.source_type || '',
				hasInviteQuote: !!(item.hasInviteQuote || item.has_invite_quote),
				tab: statusConfig.tab,
				customerName: publisherName,
				orderDate: this.formatDate(item.createTime),
				deliveryDate: this.formatShortDate(item.expectedDeliveryTime),
				publisherContactTime: timeText,
				orderAmount: item.orderAmount !== undefined ? item.orderAmount : item.order_amount,
				amount: this.formatAmount(item.orderAmount !== undefined ? item.orderAmount : item.order_amount),
				statusText,
				taskTitle: item.taskTitle || '未命名任务',
				avatar: this.buildImageUrl(item.publisherAvatarUrl),
				themeClass: statusConfig.themeClass,
				detailType: statusConfig.detailType,
				compact: statusConfig.compact,
				badgeCount: 0,
				acceptLoading: false,
				rejectLoading: false,
				contactLoading: false,
				deliveryLoading: false,
				refundHandleLoading: false,
				extraChargeLoading: false,
				quoteLoading: false,
				timelineLoading: false,
				timelineLoaded: false,
				timelineList: [],
				waitingDeliveryConfirm: false,
				publisherInfo: {
					name: publisherName,
					avatar: this.buildImageUrl(item.publisherAvatarUrl),
					userId: item.publisherUserId || item.publisherWxUserId || item.publishUserId || item.publishWxUserId || item.publisherId || ''
				},
				receiverInfo: {
					name: item.receiverUserName || '接单人',
					avatar: this.buildImageUrl(item.receiverAvatarUrl),
					userId: item.receiverUserId
				},
				participant: {
					name: item.receiverUserName || '接单人',
					time: timeText,
					avatar: this.buildImageUrl(item.receiverAvatarUrl),
					content: '',
					isSelf: true,
					isSystem: false,
					rowClass: 'timeline-row-self',
					userClass: 'timeline-user-self',
					textClass: 'timeline-text-self',
					reason: '订单已婉拒',
					subtitle: this.buildParticipantSubtitle(item.orderStatus)
				},
				taskDetailVisible: false,
				taskDetailLoading: false,
				taskDetailLoaded: false,
				taskDetailError: '',
				taskDetail: {},
				taskDetailImages: [],
				taskDetailProfessions: [],
				taskDetailGuarantees: [],
				taskDetailPosterIndex: 0,
				expanded: false
			}
		},
		async fetchTimeline(id) {
			const currentItem = this.orderList.find(orderItem => orderItem.id === id)
			if (!currentItem || !currentItem.orderNo) {
				return
			}
			this.updateOrderItem(id, orderItem => ({
				...orderItem,
				timelineLoading: true
			}))
			try {
				const res = await request.post('/wechat/tOrder/timeline', {
					orderNo: currentItem.orderNo
				})
				const list = this.extractTimelineList(res)
				const sortedList = list.slice().sort((a, b) => this.parseTimeValue(a && a.createTime) - this.parseTimeValue(b && b.createTime))
				const normalizedList = sortedList.map(record => this.normalizeTimelineRecord(record)).filter(Boolean)
				const waitingDeliveryConfirm = this.hasPendingDeliveryApply(normalizedList)
				this.updateOrderItem(id, orderItem => ({
					...orderItem,
					timelineList: normalizedList,
					timelineLoaded: true,
					timelineLoading: false,
					waitingDeliveryConfirm,
					publisherContactTime: normalizedList.length > 0 ? normalizedList[0].time : orderItem.publisherContactTime,
					participant: normalizedList.length > 0
						? {
							...orderItem.participant,
							...normalizedList[0]
						}
						: orderItem.participant
				}))
			} catch (e) {
				this.updateOrderItem(id, orderItem => ({
					...orderItem,
					timelineLoaded: false,
					timelineLoading: false
				}))
			}
		},
		extractTimelineList(res) {
			const candidates = [
				res,
				res && res.data,
				res && res.data && res.data.data,
				res && res.timelineList,
				res && res.data && res.data.timelineList
			]
			return candidates.find(item => Array.isArray(item)) || []
		},
		getServiceTimeline(item) {
			if (item.timelineList && item.timelineList.length) {
				return item.timelineList
			}
			return [item.participant]
		},
		getOrderFooterActions(item) {
			if (!item) {
				return []
			}
			// 退款申请待处理时优先显示退款处理按钮（即使已申请交稿）
			if (this.getPendingRefundTimeline(item)) {
				return [{
					key: 'handleRefund',
					text: '处理退款',
					loadingText: '处理中',
					loading: item.refundHandleLoading,
					className: 'primary-btn refund-handle-btn',
					disabled: item.refundHandleLoading
				}]
			}
			if (item.waitingDeliveryConfirm) {
				return []
			}
			if (this.shouldShowInviteEmptyActions(item)) {
				if (item.hasInviteQuote) {
					return [{
						key: 'quoted',
						text: '已报价',
						loadingText: '已报价',
						loading: false,
						className: 'invite-primary-btn',
						disabled: true
					}]
				}
				const primaryKey = this.getInvitePrimaryAction(item)
				return [
					{
						key: 'reject',
						text: '婉拒',
						loadingText: '处理中',
						loading: item.rejectLoading,
						className: 'invite-reject-btn',
						disabled: item.rejectLoading
					},
					{
						key: primaryKey,
						text: this.getInvitePrimaryText(item),
						loadingText: primaryKey === 'accept' ? '接单中' : this.getInvitePrimaryText(item),
						loading: primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading,
						className: 'invite-primary-btn',
						disabled: primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading
					}
				]
			}
			if (item.detailType === 'quote') {
				if (item.hasInviteQuote) {
					return [{
						key: 'quoted',
						text: '已报价',
						loadingText: '已报价',
						loading: false,
						className: 'primary-btn',
						disabled: true
					}]
				}
				const primaryKey = this.getInvitePrimaryAction(item)
				return [
					{
						key: 'reject',
						text: '婉拒',
						loadingText: '处理中',
						loading: item.rejectLoading,
						className: 'ghost-btn',
						disabled: item.rejectLoading
					},
					{
						key: primaryKey,
						text: this.getInvitePrimaryText(item),
						loadingText: primaryKey === 'accept' ? '接单中' : this.getInvitePrimaryText(item),
						loading: primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading,
						className: 'primary-btn',
						disabled: primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading
					}
				]
			}
			if (this.canApplyDelivery(item)) {
				return [
					{
						key: 'submitDelivery',
						text: '申请交稿',
						loadingText: '提交中',
						loading: item.deliveryLoading,
						className: 'service-submit-btn',
						disabled: item.deliveryLoading
					}
				]
			}
			if (item.detailType === 'refund') {
				if (this.getPendingRefundTimeline(item)) {
					return [{
						key: 'handleRefund',
						text: '处理退款',
						loadingText: '处理中',
						loading: item.refundHandleLoading,
						className: 'primary-btn refund-handle-btn',
						disabled: item.refundHandleLoading
					}]
				}
				return [{
					key: 'refund',
					text: '处理中',
					loadingText: '处理中',
					loading: false,
					className: 'outline-btn mini-btn',
					disabled: false
				}]
			}
			if (item.detailType === 'done') {
				return []
			}
			return []
		},
		shouldShowInviteEmptyActions(item) {
			return !!item
				&& (this.isInvitePendingAccept(item) || String(item.sourceType || '').toLowerCase() === 'invite')
				&& item.timelineLoaded
				&& !item.timelineLoading
				&& (!item.timelineList || item.timelineList.length === 0)
		},
		isInvitePendingAccept(item) {
			return !!item
				&& String(item.channelType || '').toLowerCase() === 'invite'
				&& item.orderStatus === 'pending_accept'
		},
		isZeroOrderAmount(item) {
			if (!item) {
				return false
			}
			if (item.orderAmount === null || item.orderAmount === undefined || item.orderAmount === '') {
				return false
			}
			const numberValue = Number(item.orderAmount)
			return !Number.isNaN(numberValue) && numberValue === 0
		},
		shouldShowInviteQuoteAction(item) {
			return !!item
				&& String(item.channelType || '').toLowerCase() === 'invite'
				&& String(item.sourceType || '').toLowerCase() === 'invite'
				&& String(item.payStatus || '').toLowerCase() === 'unpaid'
		},
		getInvitePrimaryAction(item) {
			if (item.hasInviteQuote) {
				return 'quoted'
			}
			if (this.shouldShowInviteQuoteAction(item)) {
				return 'quote'
			}
			if (this.isInvitePendingAccept(item)) {
				return 'accept'
			}
			return this.isZeroOrderAmount(item) ? 'quote' : 'accept'
		},
		getInvitePrimaryText(item) {
			if (item.hasInviteQuote) {
				return '已报价'
			}
			if (this.shouldShowInviteQuoteAction(item)) {
				return '报价'
			}
			if (this.isInvitePendingAccept(item)) {
				return '接单'
			}
			return this.isZeroOrderAmount(item) ? '报价' : '接单'
		},
		isCurrentReceiver(item) {
			if (!item || !item.receiverInfo || this.currentUserId === '') {
				return false
			}
			const receiverUserId = item.receiverInfo.userId
			if (receiverUserId === undefined || receiverUserId === null || receiverUserId === '') {
				return false
			}
			return String(receiverUserId) === String(this.currentUserId)
		},
		canApplyDelivery(item) {
			return !!item
				&& item.detailType === 'service'
				&& item.orderStatus === 'in_service'
				&& !item.waitingDeliveryConfirm
				&& this.isCurrentReceiver(item)
		},
		getServiceSubmitter(item) {
			const lastTimeline = item.timelineList && item.timelineList.length
				? item.timelineList[item.timelineList.length - 1]
				: null
			return {
				name: item.receiverInfo.name,
				avatar: item.receiverInfo.avatar,
				isSelf: item.receiverInfo.userId === undefined || item.receiverInfo.userId === null
					? true
					: String(item.receiverInfo.userId) === String(this.currentUserId),
				content: lastTimeline && lastTimeline.content ? lastTimeline.content : item.participant.content,
				time: lastTimeline && lastTimeline.time ? lastTimeline.time : item.participant.time
			}
		},
		getServiceSubmitterAvatar(item) {
			return this.getServiceSubmitter(item).avatar
		},
		getServiceSubmitterName(item) {
			return this.getServiceSubmitter(item).name
		},
		getServiceSubmitterTime(item) {
			return this.getServiceSubmitter(item).time
		},
		normalizeTimelineRecord(record) {
			if (!record) {
				return null
			}
			const role = record.senderRole || ''
			const content = record.content === undefined || record.content === null ? '' : String(record.content)
			const senderUserId = record.senderUserId
			const isSystem = role === 'system'
				|| record.recordType === 'system'
				|| record.actionType === 'system'
				|| senderUserId === undefined
				|| senderUserId === null
				|| senderUserId === ''
				|| String(content).trim().indexOf('处理结果：') === 0
			const isSelf = !isSystem && this.isSelfTimeline(record)
			return {
				name: record.senderNickName || '匿名用户',
				time: this.formatDateTime(record.createTime),
				avatar: this.buildImageUrl(record.senderAvatarUrl),
				content,
				senderUserId,
				isSelf,
				isSystem,
				role,
				senderRole: role,
				rowClass: isSystem ? 'timeline-row-system' : (isSelf ? 'timeline-row-self' : 'timeline-row-other'),
				userClass: isSelf ? 'timeline-user-self' : 'timeline-user-other',
				textClass: isSelf ? 'timeline-text-self' : 'timeline-text-other',
				timelineId: record.timelineId || record.id || record.timeline_id || '',
				eventType: record.event_type || record.eventType || '',
				actionStatus: record.actionStatus || record.action_status || ''
			}
		},
		getPendingRefundTimeline(item) {
			if (!item || !Array.isArray(item.timelineList) || item.timelineList.length === 0) {
				return null
			}
			const lastTimeline = item.timelineList[item.timelineList.length - 1]
			return this.isRefundPendingTimeline(lastTimeline) ? lastTimeline : null
		},
		buildParticipantSubtitle(orderStatus) {
			if (orderStatus === 'in_service') {
				return '已接单，等待沟通细节'
			}
			if (orderStatus === 'completed') {
				return '已完成交付，可继续评价'
			}
			return '订单状态更新中'
		},
		formatDate(value) {
			if (!value) {
				return '--'
			}
			return String(value).slice(0, 10).replace(/-/g, '/')
		},
		formatShortDate(value) {
			if (!value) {
				return '待定'
			}
			const text = String(value)
			if (text.length >= 10) {
				return text.slice(0, 10).replace(/-/g, '/')
			}
			return text.replace(/-/g, '/')
		},
		formatDateTime(value) {
			if (!value) {
				return '--'
			}
			const text = String(value)
			if (text.length >= 16) {
				return text.slice(5, 16).replace(/-/g, '/')
			}
			return text.replace(/-/g, '/')
		},
		parseTimeValue(value) {
			if (!value) {
				return 0
			}
			const timestamp = new Date(String(value).replace(/-/g, '/')).getTime()
			return Number.isNaN(timestamp) ? 0 : timestamp
		},
		formatAmount(value) {
			if (value === null || value === undefined || value === '') {
				return '--'
			}
			const numberValue = Number(value)
			if (Number.isNaN(numberValue)) {
				return String(value)
			}
			return numberValue % 1 === 0 ? String(numberValue) : numberValue.toFixed(2)
		},
		parseAmountValue(value) {
			if (value === null || value === undefined || value === '') {
				return NaN
			}
			const normalized = String(value).replace(/,/g, '').trim()
			if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
				return NaN
			}
			return Number(normalized)
		},
		formatSubmitAmount(value) {
			return Number(value).toFixed(2)
		},
		buildImageUrl(url) {
			if (!url) {
				return DEFAULT_AVATAR
			}
			const text = String(url)
			if (/^(https?:|wxfile:|data:|\/static\/)/.test(text)) {
				return text
			}
			return env.aliyunUrl + text.replace(/^\/+/, '')
		},
		closeContactPopup() {
			this.contactPopup = {
				visible: false,
				phone: '',
				wxNumber: ''
			}
		},
		extractContactData(res) {
			const candidates = [
				res && res.data,
				res && res.data && res.data.data,
				res
			]
			return candidates.find(item => item && typeof item === 'object' && (item.phone !== undefined || item.wxNumber !== undefined)) || {}
		},
		getPublisherContactUserId(item) {
			if (!item) {
				return ''
			}
			return item.publisherUserId || ''
		},
		async showContact(item) {
			if (!item || item.contactLoading) {
				return
			}
			const userId = this.getPublisherContactUserId(item)
			if (!userId) {
				uni.showToast({
					title: '发单人用户ID缺失，无法获取联系信息',
					icon: 'none'
				})
				return
			}
			item.contactLoading = true
			try {
				const res = await request.post('/wechat/tOrder/contact', {
					userId
				}, {
					loading: true,
					loadingText: '获取联系中...'
				})
				const data = this.extractContactData(res)
				this.contactPopup = {
					visible: true,
					phone: data.phone ? String(data.phone) : '',
					wxNumber: data.wxNumber ? String(data.wxNumber) : ''
				}
			} catch (e) {
			} finally {
				item.contactLoading = false
			}
		},
		async rejectOrder(item, rejectContent) {
			if (!item || item.rejectLoading) {
				return
			}
			if (!item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法婉拒',
					icon: 'none'
				})
				return
			}
			if (!rejectContent) {
				uni.showToast({
					title: '请选择婉拒理由',
					icon: 'none'
				})
				return
			}
			item.rejectLoading = true
			this.rejectPopupLoading = true
			try {
				await request.post('/wechat/tOrder/reject', {
					orderNo: item.orderNo,
					rejectContent
				}, {
					loading: true,
					loadingText: '婉拒中...'
				})
				uni.showToast({
					title: '婉拒成功',
					icon: 'success'
				})
				this.rejectPopupVisible = false
				this.rejectTargetItem = null
				this.resetList()
			} catch (e) {
			} finally {
				item.rejectLoading = false
				this.rejectPopupLoading = false
			}
		},
		async acceptOrder(item) {
			if (!item || item.acceptLoading) {
				return
			}
			if (!item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法接单',
					icon: 'none'
				})
				return
			}
			item.acceptLoading = true
			try {
				await request.post('/wechat/tOrder/accept', {
					orderNo: item.orderNo
				}, {
					loading: true,
					loadingText: '接单中...'
				})
				uni.showToast({
					title: '接单成功',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
			} finally {
				item.acceptLoading = false
			}
		},
		async applyDelivery(item) {
			if (!item.orderNo || item.deliveryLoading) {
				return
			}
			const confirmRes = await new Promise(resolve => {
				uni.showModal({
					title: '确认交稿',
					content: `确定提交“${item.taskTitle}”的交稿申请吗？`,
					confirmColor: '#F37738',
					success: resolve,
					fail: () => resolve({ confirm: false })
				})
			})
			if (!confirmRes.confirm) {
				return
			}
			item.deliveryLoading = true
			try {
				await request.post('/wechat/tOrder/applyDelivery', {
					orderNo: item.orderNo
				}, {
					loading: true,
					loadingText: '交稿提交中...'
				})
				uni.showToast({
					title: '交稿申请已提交',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
			} finally {
				item.deliveryLoading = false
			}
		},
		openExtraChargePopup(item) {
			if (!item || !item.orderNo || item.extraChargeLoading) {
				return
			}
			this.extraChargePopup = {
				visible: true,
				item,
				amount: '',
				submitting: false
			}
		},
		closeExtraChargePopup() {
			if (this.extraChargePopup.submitting) {
				return
			}
			this.extraChargePopup = {
				visible: false,
				item: null,
				amount: '',
				submitting: false
			}
		},
		openQuoteInvitePopup(item) {
			if (!item || !item.orderNo || item.quoteLoading) {
				if (!item || !item.orderNo) {
					uni.showToast({
						title: '订单编号缺失，无法报价',
						icon: 'none'
					})
				}
				return
			}
			this.quoteInvitePopup = {
				visible: true,
				item,
				amount: '',
				submitting: false
			}
		},
		closeQuoteInvitePopup() {
			if (this.quoteInvitePopup.submitting) {
				return
			}
			this.quoteInvitePopup = {
				visible: false,
				item: null,
				amount: '',
				submitting: false
			}
		},
		async confirmQuoteInviteOrder() {
			if (this.quoteInvitePopup.submitting) {
				return
			}
			const item = this.quoteInvitePopup.item
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法报价',
					icon: 'none'
				})
				return
			}
			const amount = this.parseAmountValue(this.quoteInvitePopup.amount)
			if (Number.isNaN(amount) || amount < 0.01 || amount > 99999999.99) {
				uni.showToast({
					title: '请输入0.01至99999999.99的金额',
					icon: 'none'
				})
				return
			}
			this.quoteInvitePopup.submitting = true
			item.quoteLoading = true
			try {
				await request.post('/wechat/tOrder/quoteInviteOrder', {
					orderNo: item.orderNo,
					quoteAmount: Number(this.formatSubmitAmount(amount))
				}, {
					loading: true,
					loadingText: '报价提交中...'
				})
				uni.showToast({
					title: '报价已提交',
					icon: 'success'
				})
				this.quoteInvitePopup = {
					visible: false,
					item: null,
					amount: '',
					submitting: false
				}
				this.resetList()
			} catch (e) {
				this.quoteInvitePopup.submitting = false
			} finally {
				item.quoteLoading = false
			}
		},
		async confirmExtraCharge() {
			if (this.extraChargePopup.submitting) {
				return
			}
			const item = this.extraChargePopup.item
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法加钱',
					icon: 'none'
				})
				return
			}
			const amount = this.parseAmountValue(this.extraChargePopup.amount)
			if (Number.isNaN(amount) || amount < 0.01 || amount > 99999999.99) {
				uni.showToast({
					title: '请输入0.01至99999999.99的金额',
					icon: 'none'
				})
				return
			}
			this.extraChargePopup.submitting = true
			item.extraChargeLoading = true
			try {
				await request.post('/wechat/outSourcing/extraCharge', {
					orderNo: item.orderNo,
					extraAmount: Number(this.formatSubmitAmount(amount)),
					operationType: 'receiver_apply'
				}, {
					loading: true,
					loadingText: '提交中...'
				})
				uni.showToast({
					title: '加价申请已提交',
					icon: 'success'
				})
				this.extraChargePopup = {
					visible: false,
					item: null,
					amount: '',
					submitting: false
				}
				if (item.expanded) {
					this.fetchTimeline(item.id)
				} else {
					this.resetList()
				}
			} catch (e) {
				this.extraChargePopup.submitting = false
			} finally {
				item.extraChargeLoading = false
			}
		},
		async handleRefund(item, refundTimeline, action) {
			if (!item || item.refundHandleLoading) {
				return
			}
			item.refundHandleLoading = true
			try {
				await request.post('/wechat/outSourcing/handleRefund', {
					orderNo: item.orderNo,
					timelineId: refundTimeline.timelineId,
					action
				}, {
					loading: true,
					loadingText: '退款处理中...'
				})
				uni.showToast({
					title: action === 'agree' ? '已同意退款' : '已拒绝退款',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
			} finally {
				item.refundHandleLoading = false
			}
		}
	}
}
</script>

<style scoped>
page {
	background: #f7f7f7;
}

.task-order-page {
	height: 100vh;
	background: #f7f7f7;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.header-panel {
	background: #ffffff;
	flex-shrink: 0;
	position: relative;
	z-index: 2;
}

.tab-scroll {
	width: 100%;
	margin-top: 32rpx;
	white-space: nowrap;
	overflow: hidden;
	cursor: grab;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
}

.tab-scroll.is-dragging {
	cursor: grabbing;
}

.tabs {
	display: inline-flex;
	align-items: center;
	padding: 0 8rpx 0 12rpx;
	will-change: transform;
	user-select: none;
	-webkit-user-select: none;
}

.tab-item {
	position: relative;
	flex-shrink: 0;
	font-size: 30rpx;
	color: #434343;
	padding: 14rpx 22rpx 21rpx;
}

.tab-item + .tab-item {
	margin-left: 30rpx;
}

.tab-item.active {
	font-weight: 700;
	color: #1a1a1a;
}

.active-mark {
	position: absolute;
	left: 50%;
	bottom: 6rpx;
	width: 44rpx;
	height: 11rpx;
	transform: translateX(-50%);
}

.search-bar {
	display: flex;
	align-items: center;
	width: 706rpx;
	height: 66rpx;
	margin: 0 auto 10rpx;
	border-radius: 33rpx;
	background: #f7f7f7;
}

.search-icon {
	position: relative;
	width: 28rpx;
	height: 28rpx;
	margin-left: 24rpx;
	border: 4rpx solid #999999;
	border-radius: 50%;
	box-sizing: border-box;
}

.search-icon::after {
	content: '';
	position: absolute;
	right: -7rpx;
	bottom: -6rpx;
	width: 12rpx;
	height: 4rpx;
	background: #999999;
	border-radius: 999rpx;
	transform: rotate(45deg);
}

.search-input {
	flex: 1;
	height: 66rpx;
	line-height: 66rpx;
	margin-left: 24rpx;
	font-size: 24rpx;
	color: #000000;
}

.search-placeholder {
	color: #b1b1b1;
}

.page-scroll {
	flex: 1;
	height: 0;
}

.order-list {
	padding: 30rpx 20rpx 60rpx;
}

.order-card {
	width: 710rpx;
	min-height: 180rpx;
	margin-bottom: 24rpx;
	border-radius: 30rpx;
	overflow: hidden;
	box-sizing: border-box;
	box-shadow: 0 11rpx 21rpx rgba(203, 203, 203, 0.9) ;
	transition: min-height 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.order-card.expanded {
	min-height: 342rpx;
}

/* 展开背景 + 内描边 */
.expanded.theme-pending,
.expanded.theme-service {
	background: #FFF3E7;
	border: 1rpx solid #F37738;
}

.expanded.theme-rejected {
	background: #DFDFDF;
	border: 1rpx solid #B5B5B5;
}

.expanded.theme-refund {
	background: #FFF0F0;
	border: 1rpx solid #FFA2A2;
}

.expanded.theme-done {
	background: #FF8F1E;
}

/* 展开态文字色 — 浅底用深色 */
.expanded.theme-pending .customer-name,
.expanded.theme-service .customer-name,
.expanded.theme-rejected .customer-name,
.expanded.theme-refund .customer-name {
	color: #000000;
}

.expanded.theme-pending .amount-text,
.expanded.theme-service .amount-text,
.expanded.theme-refund .amount-text {
	color: #f37738;
}
.expanded.theme-rejected .amount-text {
	color: #A3A3A3;
}

.expanded.theme-pending .time-text,
.expanded.theme-service .time-text,
.expanded.theme-rejected .time-text,
.expanded.theme-refund .time-text {
	color: rgba(0, 0, 0, 0.4);
}

.expanded.theme-pending .order-info-line,
.expanded.theme-service .order-info-line,
.expanded.theme-rejected .order-info-line,
.expanded.theme-refund .order-info-line {
	color: rgba(0, 0, 0, 0.35);
}

/* 展开态文字色 — 已完成橙底用白字 */
.expanded.theme-done .customer-name,
.expanded.theme-done .amount-text {
	color: #FFFFFF;
}

.expanded.theme-done .time-text {
	color: rgba(255, 255, 255, 0.72);
}

.expanded.theme-done .order-info-line {
	color: rgba(255, 255, 255, 0.72);
}

/* 展开态状态文字色 */
.expanded.theme-rejected .status-text,
.expanded.theme-done .status-text {
	color: #000000;
}

.card-main {
	position: relative;
	height: 180rpx;
}

.compact .card-main {
	height: 180rpx;
}

.avatar {
	position: absolute;
	left: 26rpx;
	top: 28rpx;
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
	background: #d8d8d8;
}

.customer-block {
	position: absolute;
	left: 138rpx;
	top: 34rpx;
	width: 220rpx;
}

.customer-name {
	display: block;
	line-height: 45rpx;
	font-size: 32rpx;
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.amount-block {
	position: absolute;
	left: 380rpx;
	top: 33rpx;
	width: 210rpx;
}

.amount-text {
	display: block;
	line-height: 54rpx;
	font-size: 38rpx;
	font-weight: 500;
}

.time-text {
	display: block;
	margin-top: 10rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	white-space: nowrap;
}

.order-info-line {
	position: absolute;
	left: 138rpx;
	right: 28rpx;
	top: 126rpx;
	display: block;
	height: 30rpx;
	font-size: 20rpx;
	line-height: 30rpx;
	color: rgba(255, 255, 255, 0.72);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.status-wrap {
	position: absolute;
	right: 26rpx;
	top: 57rpx;
	display: flex;
	align-items: flex-start;
}

.status-text {
	line-height: 34rpx;
	font-size: 24rpx;
}

.status-badge {
	min-width: 32rpx;
	height: 32rpx;
	line-height: 32rpx;
	margin-left: 10rpx;
	padding: 0 6rpx;
	border-radius: 50%;
	background: #ffffff;
	font-size: 20rpx;
	color: #f67e32;
	text-align: center;
	box-sizing: border-box;
}

.detail-panel {
	width: 702rpx;
	margin: 0 4rpx 4rpx;
	border-radius: 30rpx;
	background: #ffffff;
}

.detail-head {
	height: 74rpx;
	padding: 0 32rpx;
	display: flex;
	align-items: center;
}

.detail-title-wrap {
	display: flex;
	align-items: center;
	width: 100%;
	min-width: 0;
}

.detail-title {
	flex: 1;
	min-width: 0;
	line-height: 34rpx;
	font-size: 24rpx;
	color: #000000;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.detail-view-btn {
	flex-shrink: 0;
	height: 44rpx;
	width: 140rpx;
	line-height: 40rpx;
	margin-left: 18rpx;
	padding: 0 22rpx;
	border: 1rpx solid #f37738;
	border-radius: 999rpx;
	box-sizing: border-box;
	background: #ffffff;
	font-size: 22rpx;
	color: #f37738;
	text-align: center;
}

.detail-view-btn-collapse {
	flex-shrink: 0;
	height: 44rpx;
	width: 140rpx;
	line-height: 40rpx;
	margin-left: 18rpx;
	border: 1rpx solid #b5b5b5;
	color: #666666;
}

/* 订单详情内嵌小窗 */
.task-detail-inline {
	width: 100%;
	box-sizing: border-box;
	background: #fafafa;
}

.task-detail-loading,
.task-detail-error {
	padding: 40rpx 28rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: #999999;
	text-align: center;
}

.task-detail-content {
	padding: 0 0 24rpx;
}

.task-detail-hero {
	position: relative;
	width: 100%;
	height: 360rpx;
	background: #eeeeee;
}

.task-detail-swiper,
.task-detail-poster {
	width: 100%;
	height: 360rpx;
}

.task-detail-empty-poster {
	width: 100%;
	height: 360rpx;
	line-height: 360rpx;
	font-size: 28rpx;
	color: #979797;
	text-align: center;
}

.task-detail-poster-count {
	position: absolute;
	left: 24rpx;
	bottom: 18rpx;
	min-width: 72rpx;
	height: 36rpx;
	line-height: 36rpx;
	padding: 0 14rpx;
	border-radius: 20rpx;
	background: rgba(0, 0, 0, 0.7);
	font-size: 20rpx;
	color: #ffffff;
	text-align: center;
	box-sizing: border-box;
}

.task-detail-title {
	display: block;
	margin: 18rpx 24rpx 0;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #000000;
}

.task-detail-desc {
	display: block;
	margin: 12rpx 24rpx 0;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #333333;
	word-break: break-all;
}

.task-detail-section {
	margin: 18rpx 24rpx 0;
}

.task-detail-section-title {
	font-size: 26rpx;
	line-height: 38rpx;
	color: #000000;
}

.task-detail-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx 24rpx;
	margin-top: 14rpx;
}

.task-detail-profession-tag {
	min-width: 100rpx;
	height: 44rpx;
	line-height: 42rpx;
	padding: 0 24rpx;
	border: 1rpx solid #f37738;
	border-radius: 22rpx;
	background: #fff1e9;
	box-sizing: border-box;
	font-size: 22rpx;
	color: #f37738;
	text-align: center;
	white-space: nowrap;
}

.task-detail-service-tag {
	display: flex;
	align-items: center;
	height: 44rpx;
	padding: 0 24rpx;
	border-radius: 22rpx;
	background: #f5f5f5;
	box-sizing: border-box;
	font-size: 22rpx;
	color: #000000;
	white-space: nowrap;
}

.task-detail-check {
	margin-right: 8rpx;
	font-size: 22rpx;
	line-height: 1;
	color: #0dc71e;
	font-weight: 700;
}

.task-detail-dash-divider {
	margin: 18rpx 24rpx 0;
	border-top: 2rpx dashed #cecece;
}

.task-detail-empty-tags {
	display: block;
	margin-top: 14rpx;
	font-size: 22rpx;
	line-height: 32rpx;
	color: #979797;
}

.expand-icon {
	width: 0;
	height: 0;
	margin-left: 18rpx;
	border-left: 11rpx solid transparent;
	border-right: 11rpx solid transparent;
	border-top: 14rpx solid #979797;
	transition: transform 0.2s ease;
}

.expand-icon.open {
	transform: rotate(180deg);
}

.divider {
	width: 652rpx;
	height: 1rpx;
	margin: 0 auto;
	background: #dddddd;
}

.participant-row,
.reason-row,
.service-detail {
	min-height: 118rpx;
	padding: 22rpx 28rpx 26rpx;
	box-sizing: border-box;
}

.participant-row,
.reason-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.service-detail {
	display: flex;
	flex-direction: column;
}

.detail-loading,
.detail-empty {
	padding: 40rpx 28rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: #999999;
	text-align: center;
}

.invite-empty-actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 118rpx;
	padding: 22rpx 28rpx 26rpx;
	box-sizing: border-box;
}

.invite-action-buttons {
	display: flex;
	align-items: center;
	flex-shrink: 0;
}

.invite-reject-btn,
.invite-primary-btn {
	min-width: 124rpx;
	height: 52rpx;
	padding: 0 28rpx;
	border-radius: 999rpx;
	box-sizing: border-box;
	line-height: 52rpx;
	font-size: 24rpx;
	text-align: center;
}

.invite-reject-btn {
	background: #eeeeee;
	color: #777777;
}

.invite-reject-btn.disabled {
	opacity: 0.7;
}

.invite-primary-btn {
	margin-left: 18rpx;
	background: #f37738;
	color: #ffffff;
}

.invite-primary-btn.disabled {
	background: #cccccc;
	color: #999999;
}

.invite-user-info {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	min-width: 0;
	margin-left: 36rpx;
}

.invite-user-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
}

.invite-user-text {
	display: flex;
	flex-direction: column;
	min-width: 0;
	margin-left: 18rpx;
	text-align: left;
}

.invite-user-name {
	display: block;
	max-width: 220rpx;
	line-height: 38rpx;
	font-size: 28rpx;
	color: #222222;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.invite-user-time {
	display: block;
	margin-top: 4rpx;
	line-height: 30rpx;
	font-size: 22rpx;
	color: rgba(0, 0, 0, 0.4);
	white-space: nowrap;
}

.left-section {
	display: flex;
	align-items: center;
	min-width: 0;
}

.participant-avatar {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
}

.participant-text {
	min-width: 0;
	margin-left: 20rpx;
}

.participant-name,
.reason-line {
	display: block;
	line-height: 45rpx;
	font-size: 28rpx;
	color: #000000;
	word-break: break-all;
}

.participant-desc {
	display: block;
	margin-top: 4rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: #000000;
	word-break: break-all;
}

.participant-time {
	display: block;
	margin-top: 4rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: rgba(0, 0, 0, 0.4);
}

.service-content,
.service-time {
	margin-left: 0;
}

.timeline-row {
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
}

.timeline-row-other {
	justify-content: flex-start;
	flex-direction: row;
	border-top: 1rpx solid #eeeeee;
	padding-top: 23rpx;
}

.timeline-row-self {
	justify-content: flex-end;
	padding-top: 23rpx;
	border-top: 1rpx solid #eeeeee;
}

.timeline-row-system {
	align-items: stretch;
	flex-direction: column;
	justify-content: flex-start;
	border-top: 1rpx solid #eeeeee;
}

.timeline-row-contact {
	justify-content: space-between;
	/* padding-bottom: 22rpx; */
	/* border-bottom: 1rpx solid #eeeeee; */
}

.timeline-contact-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-width: 0;
}

.timeline-contact-user {
	display: flex;
	align-items: center;
	min-width: 0;
}

.timeline-contact-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
}

.timeline-contact-text {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 0;
	margin-left: 18rpx;
}

.timeline-contact-name {
	display: block;
	max-width: 300rpx;
	line-height: 38rpx;
	font-size: 28rpx;
	font-weight: 500;
	color: #222222;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.timeline-contact-time {
	display: block;
	margin-top: 4rpx;
	line-height: 30rpx;
	font-size: 22rpx;
	color: rgba(0, 0, 0, 0.4);
	white-space: nowrap;
}

.timeline-contact-action {
	height: 48rpx;
	line-height: 46rpx;
	margin-left: 28rpx;
	padding: 0 24rpx;
	border: 1rpx solid #f37738;
	border-radius: 999rpx;
	box-sizing: border-box;
	background: #ffffff;
	font-size: 24rpx;
	color: #f37738;
	text-align: center;
	white-space: nowrap;
	flex-shrink: 0;
}

.timeline-contact-action.disabled {
	opacity: 0.7;
}

.timeline-row + .timeline-row {
	margin-top: 24rpx;
}

.timeline-row + .timeline-row-system {
	padding-top: 20rpx;
	/* border-top: 1rpx solid #eeeeee; */
}

.service-action-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-top: 24rpx;
	padding-top: 22rpx;
	border-top: 1rpx solid #eeeeee;
	box-sizing: border-box;
}

.service-submit-btn {
	min-width: 132rpx;
	height: 50rpx;
	padding: 0 28rpx;
	border-radius: 999rpx;
	box-sizing: border-box;
	background: #f37738;
	line-height: 50rpx;
	font-size: 24rpx;
	color: #ffffff;
	text-align: center;
	flex-shrink: 0;
}

.service-add-btn {
	min-width: 100rpx;
	height: 50rpx;
	margin-right: 16rpx;
	padding: 0 28rpx;
	border: 1rpx solid #f37738;
	border-radius: 999rpx;
	box-sizing: border-box;
	background: #ffffff;
	line-height: 48rpx;
	font-size: 24rpx;
	color: #f37738;
	text-align: center;
	flex-shrink: 0;
}

.extra-charge-mask {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.45);
}

.extra-charge-popup {
	width: 640rpx;
	padding: 48rpx 48rpx 40rpx;
	border-radius: 28rpx;
	background: #ffffff;
	box-sizing: border-box;
}

.extra-charge-title {
	display: block;
	line-height: 44rpx;
	font-size: 32rpx;
	font-weight: 600;
	color: #222222;
	text-align: center;
}

.extra-charge-input {
	width: 360rpx;
	height: 72rpx;
	margin: 48rpx auto 0;
	padding: 0 24rpx;
	border: 1rpx solid #dddddd;
	border-radius: 16rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #222222;
	text-align: center;
}

.extra-charge-input-placeholder {
	color: #bbbbbb;
}

.extra-charge-actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 56rpx;
}

.extra-charge-btn {
	width: 250rpx;
	height: 64rpx;
	line-height: 64rpx;
	border-radius: 999rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	text-align: center;
}

.extra-charge-btn.cancel {
	border: 1rpx solid #cccccc;
	color: #888888;
	background: #ffffff;
}

.extra-charge-btn.confirm {
	color: #ffffff;
	background: #f37738;
}

.extra-charge-btn.disabled {
	opacity: 0.7;
}

.service-submit-btn.disabled {
	opacity: 0.7;
}

.service-user-info {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	min-width: 0;
	margin-left: 36rpx;
}

.service-user-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
}

.service-user-text {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 0;
	margin-left: 18rpx;
}

.service-user-name {
	display: block;
	max-width: 240rpx;
	line-height: 38rpx;
	font-size: 28rpx;
	font-weight: 500;
	color: #222222;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.service-user-time {
	display: block;
	margin-top: 4rpx;
	line-height: 30rpx;
	font-size: 22rpx;
	color: rgba(0, 0, 0, 0.4);
	white-space: nowrap;
}

.timeline-status-actions {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 24rpx;
	padding-top: 20rpx;
	box-sizing: border-box;
	border-top: 1rpx solid #eeeeee;
}

.delivery-waiting-status {
	width: 100%;
	padding: 20rpx 0 4rpx;
	box-sizing: border-box;
	line-height: 36rpx;
	font-size: 24rpx;
	color: #f37738;
	text-align: center;
}

.timeline-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
}

.timeline-text {
	display: flex;
	flex-direction: column;
	max-width: 500rpx;
	min-width: 0;
	margin-left: 20rpx;
}

.timeline-text-other {
	align-items: flex-start;
	text-align: left;
}

.timeline-text-self {
	align-items: flex-end;
	text-align: right;
}

.timeline-name {
	line-height: 40rpx;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
	word-break: break-all;
}

.timeline-time {
	display: block;
	margin-top: 4rpx;
	line-height: 30rpx;
	font-size: 22rpx;
	color: rgba(0, 0, 0, 0.4);
}

.timeline-content {
	display: block;
	max-width: 100%;
	margin-top: 4rpx;
	line-height: 36rpx;
	font-size: 26rpx;
	color: #222222;
	white-space: pre-wrap;
	word-break: break-all;
}

.timeline-system-result {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	box-sizing: border-box;
	text-align: left;
}

.timeline-system-content {
	display: block;
	width: 100%;
	line-height: 38rpx;
	font-size: 26rpx;
	color: #333333;
	white-space: pre-wrap;
	word-break: break-all;
}

.timeline-submit-btn {
	width: 137rpx;
	height: 49rpx;
	line-height: 57rpx;
	border-radius: 41rpx;
	background: #f37738;
	font-size: 24rpx;
	color: #ffffff;
	text-align: center;
	flex-shrink: 0;
}

.timeline-submit-btn.disabled {
	opacity: 0.7;
}

.timeline-user {
	display: flex;
	align-items: center;
	max-width: 584rpx;
	margin-left: 24rpx;
	min-width: 0;
}

.timeline-user-other {
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
	flex: 1;
	margin-left: 0;
	min-width: 0;
}

.timeline-user-self {
	flex-direction: row-reverse;
	margin-left: 0;
}

.timeline-user-other .timeline-text {
	align-items: flex-start;
	flex: 1;
	margin-left: 20rpx;
	margin-right: 0;
	text-align: left;
}

.timeline-user-self .timeline-text {
	margin-left: 0;
	margin-right: 20rpx;
}

.reason-text {
	flex: 1;
}

.action-group {
	display: flex;
	align-items: center;
	margin-left: 20rpx;
}

.ghost-btn,
.primary-btn,
.outline-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 48rpx;
	line-height: 48rpx;
	border-radius: 36rpx;
	font-size: 24rpx;
	text-align: center;
	box-sizing: border-box;
}

.ghost-btn {
	width: 150rpx;
	background: #dfdfdf;
	color: #666666;
}

.ghost-btn.disabled {
	opacity: 0.7;
}

.primary-btn {
	width: 150rpx;
	margin-left: 22rpx;
	background: #f37738;
	color: #ffffff;
}

.primary-btn.disabled {
	background: #cccccc;
	color: #999999;
}

.outline-btn {
	border: 1rpx solid #f37738;
	background: #ffffff;
	color: #f37738;
}

.mini-btn {
	width: 138rpx;
	margin-left: 20rpx;
}

.refund-handle-btn {
	width: 176rpx;
}

.empty-state {
	padding: 120rpx 0;
	font-size: 26rpx;
	color: #999999;
	text-align: center;
}

.load-state {
	padding: 12rpx 0 24rpx;
	font-size: 24rpx;
	color: #999999;
	text-align: center;
}

.theme-pending {
	border: none;
	background: linear-gradient(99deg, #ff8f1e 10%, #f37738 101%);
}

.theme-pending .customer-name,
.theme-pending .amount-text {
	color: #ffffff;
}

.theme-pending .status-text {
	color: #4779CC;
}

.expanded.theme-pending .status-text {
	color: #F37738;
}

.theme-pending .time-text {
	color: rgba(255, 255, 255, 0.72);
}

.theme-rejected {
	border: none;
	background: #B5B5B5;
}

.theme-rejected .customer-name,
.theme-rejected .amount-text {
	color: #ffffff;
}

.theme-rejected .status-text {
	color: #FFFFFF;
}

.theme-rejected .time-text {
	color: rgba(255, 255, 255, 0.72);
}

.theme-rejected .order-info-line {
	color: rgba(255, 255, 255, 0.72);
}

.theme-summary {
	background: linear-gradient(90deg, #ff9324 0%, #ff7a31 100%);
}

.theme-summary .customer-name,
.theme-summary .amount-text,
.theme-summary .time-text,
.theme-summary .status-text {
	color: #ffffff;
}

.theme-service {
	border: none;
	background: linear-gradient(99deg, #ff8f1e 10%, #f37738 101%);
}

.theme-service .status-text {
	color: #19C229;
}

.theme-service .customer-name,
.theme-service .amount-text {
	color: #ffffff;
}

.theme-service .time-text {
	color: rgba(255, 255, 255, 0.72);
}

.theme-refund {
	border: none;
	background: linear-gradient(99deg, #ff8f1e 10%, #f37738 101%);
}

.theme-refund .status-text {
	color: #F00004;
}

.theme-refund .customer-name,
.theme-refund .amount-text {
	color: #ffffff;
}

.theme-refund .time-text {
	color: rgba(255, 255, 255, 0.72);
}

.theme-done {
	border: none;
	background: linear-gradient(99deg, #ff8f1e 10%, #f37738 101%);
}

.theme-done .status-text {
	color: #ffffff;
}

.theme-done .customer-name,
.theme-done .amount-text {
	color: #ffffff;
}

.theme-done .time-text {
	color: rgba(255, 255, 255, 0.72);
}

.pc-list-wrap {
	flex: 1;
	height: 0;
	min-height: 0;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}

.pc-scroll-wrap {
	flex: 1;
	min-height: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	will-change: transform;
}

.task-order-page.pc-pulling {
	cursor: grab;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.pc-pull-tip {
	width: 100%;
	overflow: hidden;
	pointer-events: none;
	position: relative;
}

.pc-pull-visible .pc-pull-inner {
	opacity: 1;
}

.pc-pull-inner {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	opacity: 0;
	transition: opacity .2s ease;
	padding-bottom: 10rpx;
	box-sizing: border-box;
}

.pc-pull-text {
	font-size: 24rpx;
	color: #999999;
	line-height: 1;
}

.pc-pull-spinner {
	width: 28rpx;
	height: 28rpx;
	border: 3rpx solid #e5e5e5;
	border-top-color: #ff6b35;
	border-radius: 50%;
	box-sizing: border-box;
	animation: pc-pull-spin .7s linear infinite;
}

@keyframes pc-pull-spin {
	to { transform: rotate(360deg); }
}
</style>
