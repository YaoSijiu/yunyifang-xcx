<template>
	<view class="outsourcing-page">
		<view class="header-panel">
			<view class="tabs">
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

			<view class="search-bar">
			<view class="search-icon"></view>
			<input
				class="search-input"
				v-model="keyword"
				placeholder="搜索订单"
				placeholder-class="search-placeholder"
				confirm-type="search"
				@input="handleSearch"
				@confirm="triggerSearch"
			/>
		</view>
		</view>

		<scroll-view
			class="order-scroll"
			scroll-y
			:lower-threshold="80"
			@scrolltolower="loadMore"
		>
			<view class="order-list">
				<view
					v-for="item in visibleList"
					:key="item.id"
					class="order-card"
					:class="[item.cardTheme, { expanded: item.expanded }]"
					@click="toggleExpand(item.id)"
				>
					<view class="card-main">
						<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
						<view class="customer">
							<text class="customer-name">{{ item.customerName }}</text>
							<text class="order-date">下单:{{ item.orderDate }}</text>
						</view>
						<view class="amount-block">
							<text class="amount">¥{{ item.amount }}</text>
							<text class="deliver-date">交付时间:{{ item.deliverDate }}</text>
						</view>
						<text class="status">{{ item.statusText }}</text>
						<text v-if="item.orderNo || item.taskTitle" class="order-info-line">
							{{ item.orderNo ? '订单号: ' + item.orderNo : '' }}{{ item.orderNo && item.taskTitle ? '  ' : '' }}{{ item.taskTitle ? '任务: ' + item.taskTitle : '' }}
						</text>
					</view>

					<view v-if="item.expanded" class="detail-panel">
						<view class="task-row" @click.stop="toggleExpand(item.id)">
							<view
								class="task-title-wrap"
								:class="{ 'with-header-actions': getOutsourcingHeaderActions(item).length > 0 }"
							>
								<text class="task-title">{{ item.taskTitle }}</text>
								<view
									v-if="item.bizType === 'order'"
									class="detail-view-btn"
									:class="{ 'detail-view-btn-collapse': item.taskDetailVisible }"
									@click.stop="toggleTaskDetail(item)"
								>{{ item.taskDetailVisible ? '收起' : '查看详情' }}</view>
								<view
									class="expand-icon"
									:class="{ open: item.expanded }"
									@click.stop="toggleExpand(item.id)"
								></view>
							</view>
							<view
								v-for="action in getOutsourcingHeaderActions(item)"
								:key="action.key"
								:class="[action.className, { 'disabled-action': action.disabled }]"
								@click.stop="handleOutsourcingHeaderAction(action.key, item)"
							>{{ action.loading ? action.loadingText : action.text }}</view>
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

						<view v-if="item.waitingInviteAccept" class="participant-state invite-waiting-state">等待对方确认</view>
						<view v-else-if="item.participantLoading" class="participant-state">加载中...</view>
						<view v-else-if="item.expanded && item.participantList.length === 0" class="participant-state">暂无{{ item.participantTypeText }}</view>
						<block v-if="!item.waitingInviteAccept && item.bizType === 'order'">
							<view v-if="canShowOrderContactAction(item)" class="order-operation-panel">
								<view class="accepted-row">
									<view class="accepted-user">
										<image class="accepted-avatar" :src="item.receiverAvatar" mode="aspectFill"></image>
										<view class="accepted-info">
											<text class="accepted-name">{{ item.receiverName || '接单人' }}</text>
											<text class="accepted-state">联系接单人</text>
										</view>
									</view>
									<view
										class="accepted-contact-btn"
										:class="{ 'disabled-action': item.contactLoading }"
										@click.stop="showContact(item, getOrderContactParticipant(item))"
									>{{ item.contactLoading ? '获取中' : '点击获取联系' }}</view>
								</view>
							</view>
							<view
								v-for="participant in getOrderTimelineParticipants(item)"
								:key="participant.id"
								class="timeline-entry"
							>
								<view v-if="participant.isSystem" class="timeline-system-result">
									<text v-if="participant.content" class="timeline-system-content">{{ participant.content }}</text>
									<text class="timeline-message-time">{{ participant.time }}</text>
								</view>
								<view v-else class="timeline-message-row" :class="participant.rowClass">
									<view class="timeline-message-main" :class="participant.mainClass">
										<image class="timeline-message-avatar" :src="participant.avatar" mode="aspectFill"></image>
										<view class="timeline-message-info" :class="participant.infoClass">
											<text v-if="!participant.isSelf" class="timeline-message-name">{{ participant.name }}</text>
											<text v-if="participant.content" class="timeline-message-content">{{ participant.content }}</text>
											<text class="timeline-message-time">{{ participant.time }}</text>
										</view>
									</view>
								</view>
							</view>
						</block>
						<block v-else-if="!item.waitingInviteAccept">
							<view
								v-for="participant in item.displayParticipants"
								:key="participant.id"
								class="worker-row"
							>
								<image class="worker-avatar" :src="participant.avatar" mode="aspectFill" style="display:block;width:72rpx;height:72rpx;min-width:72rpx;max-width:72rpx;min-height:72rpx;max-height:72rpx;border-radius:50%;overflow:hidden;"></image>
								<view class="worker-info">
									<text class="worker-name">{{ participant.name }}</text>
									<text v-if="participant.statusText" class="worker-state">{{ participant.statusText }}</text>
								</view>
								<text
									v-if="item.expanded && participant.recordType === 'quote'"
									class="participant-amount"
								>报价{{ participant.amount }}</text>
								<view
									v-if="getOutsourcingParticipantAction(item, participant, 'worker')"
									:class="[getOutsourcingParticipantAction(item, participant, 'worker').className, { 'disabled-action': getOutsourcingParticipantAction(item, participant, 'worker').disabled }]"
									@click.stop="handleParticipantAction(item, participant)"
								>{{ getOutsourcingParticipantAction(item, participant, 'worker').loading ? getOutsourcingParticipantAction(item, participant, 'worker').loadingText : getOutsourcingParticipantAction(item, participant, 'worker').text }}</view>
							</view>
						</block>

						<view v-if="item.expanded && !item.waitingInviteAccept && getOutsourcingFooterActions(item).length" class="expanded-actions">
							<view
								v-for="action in getOutsourcingFooterActions(item)"
								:key="action.key"
								:class="[action.className, { 'disabled-action': action.disabled }]"
								@click.stop="handleOutsourcingFooterAction(action.key, item)"
							>{{ action.loading ? action.loadingText : action.text }}</view>
							<image v-if="item.showCurrentUserAvatar" class="current-user-avatar" :src="currentUserAvatar" mode="aspectFill" style="display:block;width:72rpx;height:72rpx;min-width:72rpx;max-width:72rpx;min-height:72rpx;max-height:72rpx;border-radius:50%;overflow:hidden;"></image>
						</view>
					</view>
				</view>

				<view v-if="!loading && visibleList.length === 0" class="empty-state">暂无外包订单</view>
				<view v-else class="load-state">{{ loadText }}</view>
			</view>
		</scroll-view>

		<view v-if="assignPopup.visible" class="assign-popup-mask" @click="closeAssignPopup">
			<view class="assign-popup" @click.stop="noop">
				<text class="assign-popup-title">确认分配给{{ assignPopup.participantName }}吗？</text>
				<image class="assign-popup-avatar" :src="assignPopup.participantAvatar" mode="aspectFill"></image>
				<input
					class="assign-popup-input"
					v-model="assignPopup.amount"
					type="digit"
					placeholder="请输入分配金额"
					placeholder-class="assign-popup-input-placeholder"
					confirm-type="done"
				/>
				<view class="assign-popup-actions">
					<view class="assign-popup-btn cancel" @click="closeAssignPopup">取消</view>
					<view
						class="assign-popup-btn confirm"
						:class="{ 'disabled-action': assignPopup.submitting }"
						@click="confirmAssign"
					>{{ assignPopup.submitting ? '支付中' : '确认' }}</view>
				</view>
			</view>
		</view>
		<refund-reason-popup
			:visible="refundReasonPopup.visible"
			:value="refundReasonPopup.reason"
			:other-reason="refundReasonPopup.otherReason"
			:loading="refundReasonPopup.loading"
			@close="closeRefundReasonPopup"
			@confirm="confirmRefundReason"
		/>
		<view v-if="refundPopup.visible" class="assign-popup-mask" @click="closeRefundPopup">
			<view class="assign-popup" @click.stop="noop">
				<text class="assign-popup-title">申请退款</text>
				<text class="refund-order-amount">订单金额：￥{{ refundPopup.orderAmount }}</text>
				<input
					class="assign-popup-input"
					v-model="refundPopup.amount"
					type="digit"
					placeholder="请输入退款金额"
					placeholder-class="assign-popup-input-placeholder"
					confirm-type="done"
				/>
				<view class="assign-popup-actions">
					<view class="assign-popup-btn cancel" @click="closeRefundPopup">取消</view>
					<view
						class="assign-popup-btn confirm"
						:class="{ 'disabled-action': refundPopup.submitting }"
						@click="confirmRefund"
					>{{ refundPopup.submitting ? '提交中' : '确认' }}</view>
				</view>
			</view>
		</view>
		<view v-if="extraChargePopup.visible" class="assign-popup-mask" @click="closeExtraChargePopup">
			<view class="assign-popup" @click.stop="noop">
				<text class="assign-popup-title">直接加钱</text>
				<input
					class="assign-popup-input"
					v-model="extraChargePopup.amount"
					type="digit"
					placeholder="请输入加价金额"
					placeholder-class="assign-popup-input-placeholder"
					confirm-type="done"
				/>
				<view class="assign-popup-actions">
					<view class="assign-popup-btn cancel" @click="closeExtraChargePopup">取消</view>
					<view
						class="assign-popup-btn confirm"
						:class="{ 'disabled-action': extraChargePopup.submitting }"
						@click="confirmExtraCharge"
					>{{ extraChargePopup.submitting ? '提交中' : '确认' }}</view>
				</view>
			</view>
		</view>
		<view v-if="extendDeliveryPopup.visible" class="assign-popup-mask" @click="closeExtendDeliveryPopup">
			<view class="assign-popup extend-delivery-popup" @click.stop="noop">
				<text class="assign-popup-title">延长时间</text>
				<text v-if="extendDeliveryPopup.currentDate" class="extend-delivery-current">当前交付时间：{{ extendDeliveryPopup.currentDate }}</text>
				<input
					class="assign-popup-input extend-days-input"
					v-model="extendDeliveryPopup.extendDays"
					type="number"
					maxlength="2"
					placeholder="请输入延长天数"
					placeholder-class="assign-popup-input-placeholder"
					confirm-type="done"
					@input="handleExtendDaysInput"
				/>
				<text class="extend-delivery-tip">延长天数范围：1-30天</text>
				<view class="assign-popup-actions extend-delivery-actions">
					<view class="assign-popup-btn cancel" @click="closeExtendDeliveryPopup">取消</view>
					<view
						class="assign-popup-btn confirm"
						:class="{ 'disabled-action': extendDeliveryPopup.submitting }"
						@click="confirmExtendDelivery"
					>{{ extendDeliveryPopup.submitting ? '提交中' : '确认' }}</view>
				</view>
			</view>
		</view>
		<contact-info-popup
			:visible="contactPopup.visible"
			:phone="contactPopup.phone"
			:wx-number="contactPopup.wxNumber"
			:wechat="contactPopup.wxNumber"
			@close="closeContactPopup"
		/>
		<appeal-service-popup
			:visible="appealPopup.visible"
			:qrcode-url="appealPopup.qrcodeUrl"
			:phone="appealPopup.phone"
			:loading="appealPopup.loading"
			@close="closeAppealPopup"
		/>
		<view v-if="reviewPopup.visible" class="review-popup-mask" @click="closeReviewPopup">
			<view class="review-popup" @click.stop="noop">
				<view class="review-popup-header">
					<text class="review-popup-title">发表评价</text>
					<text class="review-popup-close" @click="closeReviewPopup">×</text>
				</view>
				<view class="review-rating-row">
					<text class="review-rating-label">评分</text>
					<view class="review-stars">
						<text
							v-for="star in 5"
							:key="star"
							class="review-star"
							:class="{ active: star <= reviewPopup.rating }"
							@click="setReviewRating(star)"
						>★</text>
					</view>
				</view>
				<textarea
					class="review-textarea"
					v-model="reviewPopup.content"
					placeholder="请输入评价内容"
					placeholder-class="review-placeholder"
					maxlength="500"
				></textarea>
				<view class="review-count">{{ reviewPopup.content.length }}/500</view>
				<view class="review-images">
					<view
						v-for="(image, index) in reviewPopup.imageList"
						:key="image + index"
						class="review-image-wrap"
					>
						<image class="review-image" :src="buildImageUrl(image)" mode="aspectFill" @click="previewReviewImage(index)"></image>
						<view class="review-image-delete" @click.stop="removeReviewImage(index)">×</view>
					</view>
					<view v-if="reviewPopup.imageList.length < 5" class="review-upload-btn" @click="chooseReviewImages">
						<text class="review-upload-plus">+</text>
						<text class="review-upload-text">上传图片</text>
					</view>
				</view>
				<view class="review-popup-footer">
					<view class="review-cancel-btn" @click="closeReviewPopup">取消</view>
					<view
						class="review-submit-btn"
						:class="{ 'disabled-action': reviewPopup.submitting }"
						@click="submitReview"
					>{{ reviewPopup.submitting ? '提交中' : '提交评价' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from '@/utils/request.js';
import env from '@/config/env.js';
import ContactInfoPopup from '@/components/contact-info-popup.vue';
import RefundReasonPopup from '@/components/refund-reason-popup.vue';
import AppealServicePopup from '@/components/appeal-service-popup.vue';
import { uploadFile } from '@/utils/uploadUtil.js';

const DEFAULT_AVATAR = '/static/yunyiku/avatar.png';
const CHANNEL_STATUS_MAP = {
	pending: { text: '待处理', className: 'status-blue' },
	open: { text: '发布中', className: 'status-green' },
	accepted: { text: '已接受', className: 'status-blue' },
	rejected: { text: '已拒绝', className: 'status-gray' },
	confirmed: { text: '待确认', className: 'status-orange' },
	assigned: { text: '服务中', className: 'status-blue' },
	closed: { text: '已完成', className: 'status-gray' }
};
const QUOTE_STATUS_MAP = {
	pending: '待选择',
	selected: '已选中',
	ordered: '已生成订单',
	unselected: '未选中',
	cancelled: '已取消'
};
const INVITE_STATUS_MAP = {
	pending: '待处理',
	accepted: '已接受',
	rejected: '已拒绝',
	confirmed: '已确认成单'
};
const DISPLAY_STATUS_CLASS_MAP = {
	channel_open: 'status-green',
	channel_assigned: 'status-blue',
	pending_accept: 'status-blue',
	in_service: 'status-blue',
	delivery_pending_confirm: 'status-orange',
	cancelled: 'status-gray',
	refunding: 'status-orange',
	completed: 'status-gray'
};
const CARD_THEME_MAP = {
	'待接单': 'card-pending',
	'待处理': 'card-pending',
	'服务中': 'card-service',
	'已接受': 'card-service',
	'退款中': 'card-refund',
	'约稿中': 'card-drafting',
	'已婉拒': 'card-rejected',
	'已拒绝': 'card-rejected',
	'已取消': 'card-rejected',
	'发布中': 'card-publishing',
	'已完成': 'card-done',
	'待确认': 'card-confirm'
};

export default {
	components: {
		ContactInfoPopup,
		RefundReasonPopup,
		AppealServicePopup
	},
	data() {
		return {
			keyword: '',
			searchTimer: null,
			activeTab: 'all',
			pageNum: 1,
			pageSize: 10,
			total: 0,
			loading: false,
			finished: false,
			assigningQuoteId: '',
			currentUserId: '',
			currentUserAvatar: DEFAULT_AVATAR,
			assignPopup: {
				visible: false,
				item: null,
				participantId: '',
				participantName: '',
				participantAvatar: DEFAULT_AVATAR,
				amount: '',
				submitting: false
			},
			refundPopup: {
				visible: false,
				item: null,
				amount: '',
				submitting: false,
				orderAmount: '',
				reason: ''
			},
			extraChargePopup: {
				visible: false,
				item: null,
				amount: '',
				submitting: false
			},
			extendDeliveryPopup: {
				visible: false,
				item: null,
				extendDays: '',
				currentDate: '',
				submitting: false
			},
			refundReasonPopup: {
				visible: false,
				item: null,
				reason: '',
				otherReason: '',
				finalReason: '',
				loading: false
			},
			contactPopup: {
				visible: false,
				phone: '',
				wxNumber: ''
			},
			appealPopup: {
				visible: false,
				qrcodeUrl: '',
				phone: '',
				loading: false
			},
			reviewPopup: {
				visible: false,
				item: null,
				rating: 0,
				content: '',
				imageList: [],
				uploading: false,
				submitting: false
			},
			requestSeq: 0,
			tabs: [
				{ label: '全部', value: 'all', status: '' },
				{ label: '服务中', value: 'service', status: 'in_service' },
				{ label: '待确认', value: 'confirm', status: 'delivery_pending_confirm' },
				{ label: '退款中', value: 'refund', status: 'refunding' },
				{ label: '已完成', value: 'done', status: 'completed' }
			],
			orderList: []
		}
	},
	computed: {
		visibleList() {
			return this.orderList
		},
		loadText() {
			if (this.loading) {
				return '加载中...'
			}
			if (this.visibleList.length === 0) {
				return ''
			}
			return this.finished ? '没有更多了' : '上滑加载更多'
		}
	},
	onLoad() {
		this.refreshCurrentUserId()
		this.resetList()
	},
	onShow() {
		this.refreshCurrentUserId()
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
			const userContext = this.getCurrentUserContext()
			this.currentUserId = userContext.id
			this.currentUserAvatar = userContext.avatar
		},
		getCurrentUserContext() {
			const isTeamMode = !!uni.getStorageSync('isTeamMode')
			const userInfo = uni.getStorageSync('userInfo') || {}
			const teamInfo = uni.getStorageSync('teamInfo') || {}
			const id = isTeamMode
				? (uni.getStorageSync('teamOwnerId') || teamInfo.id || userInfo.id || userInfo.userId || '')
				: (userInfo.id || userInfo.userId || '')
			const avatarUrl = isTeamMode
				? (teamInfo.avatarUrl || teamInfo.avatar || userInfo.avatarUrl || userInfo.avatar || '')
				: (userInfo.avatarUrl || userInfo.avatar || '')
			return {
				id,
				avatar: this.buildImageUrl(avatarUrl) || DEFAULT_AVATAR
			}
		},
		getCurrentUserId() {
			return this.getCurrentUserContext().id
		},
		isSelfTimeline(item) {
			const senderUserId = item && item.senderUserId
			if (senderUserId === undefined || senderUserId === null || senderUserId === '' || this.currentUserId === '') {
				return false
			}
			return String(senderUserId) === String(this.currentUserId)
		},
		stripMediaText(value) {
			if (value === undefined || value === null) {
				return ''
			}
			const text = String(value).trim()
			if (!text) {
				return ''
			}
			const cleaned = text
				.replace(/!\[[^\]]*]\([^)]*\)/g, '')
				.replace(/<\s*(img|image)[^>]*>/gi, '')
				.replace(/https?:\/\/\S+\.(png|jpe?g|gif|webp|svg)(\?\S*)?/gi, '')
				.replace(/(wxfile:|\/)?[^\s"'<>]+\.(png|jpe?g|gif|webp|svg)(\?\S*)?/gi, '')
				.trim()
			if (!cleaned || /^data:image\//i.test(cleaned)) {
				return ''
			}
			return cleaned
		},
		normalizeAcceptText(value) {
			return this.stripMediaText(value) || '我已接单'
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
			if (this.activeTab === value) {
				return
			}
			this.activeTab = value
			this.resetList()
		},
		handleSearch() {
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
			this.fetchOrderList(1, true)
		},
		async fetchOrderList(pageNum, isRefresh) {
			const currentRequestSeq = ++this.requestSeq
			this.loading = true
			try {
				const res = await request.get('/wechat/outSourcing/page', this.buildQueryParams(pageNum))
				if (currentRequestSeq !== this.requestSeq) {
					return
				}
				const rows = Array.isArray(res.rows) ? res.rows : []
				const nextList = rows.map(item => this.normalizeOrder(item))
				this.pageNum = pageNum
				this.total = Number(res.total) || 0
				this.orderList = isRefresh ? nextList : this.orderList.concat(nextList)
				this.finished = rows.length < this.pageSize || this.orderList.length >= this.total
			} catch (e) {
				if (currentRequestSeq === this.requestSeq) {
					this.finished = isRefresh
				}
			} finally {
				if (currentRequestSeq === this.requestSeq) {
					this.loading = false
				}
			}
		},
		buildQueryParams(pageNum) {
			const params = {
				pageNum,
				pageSize: this.pageSize
			}
			const tab = this.tabs.find(item => item.value === this.activeTab)
			if (tab && tab.status) {
				params.status = tab.status
			}
			const search = this.keyword.trim()
			if (search) {
				params.search = search
			}
			return params
		},
		normalizeOrder(item) {
			const bizType = item.bizType === 'order' ? 'order' : 'channel'
			const displayStatus = item.displayStatus || item.status || ''
			const channelStatus = CHANNEL_STATUS_MAP[item.status] || { text: item.status || '未知状态', className: 'status-gray' }
			const statusText = item.displayStatusText || channelStatus.text
			const statusClass = DISPLAY_STATUS_CLASS_MAP[displayStatus] || channelStatus.className || 'status-gray'
			const isQuoteMode = bizType === 'channel' ? Number(item.isOtherPartyQuote) === 1 : item.sourceType === 'quote'
			const isCompletedOrder = bizType === 'order' && displayStatus === 'completed'
			const waitingInviteAccept = bizType === 'channel' && item.sourceType === 'invite' && displayStatus === 'pending_accept'
			const participantTypeText = isQuoteMode ? '报价记录' : '约稿记录'
			const actionList = Array.isArray(item.actionList) ? item.actionList : []
			const receiverName = item.receiverUserName || ''
			const receiverUserId = item.receiverUserId || item.receiverWxUserId || ''
			const receiverAvatar = this.buildImageUrl(item.receiverAvatarUrl) || DEFAULT_AVATAR
			const customerName = bizType === 'order'
				? (receiverName || '接单人')
				: (item.publisherUserName || 'UF设计')
			const avatar = bizType === 'order'
				? receiverAvatar
				: (this.buildImageUrl(item.publisherAvatarUrl) || DEFAULT_AVATAR)
			const quotePreviewList = Array.isArray(item.quotePreviewList)
				? item.quotePreviewList.map(record => this.normalizeParticipant(record, { actionList, bizType }))
				: []
			const participantList = bizType === 'order' ? [] : quotePreviewList
			const displayParticipants = participantList.slice(0, 1)
			return {
				id: `${bizType}-${item.orderNo || item.channelId || item.taskId || Math.random()}`,
				bizType,
				channelId: item.channelId ? String(item.channelId) : '',
				taskId: item.taskId ? String(item.taskId) : '',
				orderNo: item.orderNo ? String(item.orderNo) : '',
				status: item.status || '',
				sourceType: item.sourceType || '',
				displayStatus,
				displayStatusText: item.displayStatusText || '',
				customerName,
				receiverName,
				receiverUserId,
				receiverAvatar,
				orderDate: this.formatDate(item.createTime || ''),
				deliverDate: this.formatShortDate(item.deliveryDate),
				rawDeliveryDate: item.deliveryDate || '',
				amount: this.formatAmount(item.amount),
				rawAmount: item.amount,
				quoteAmount: this.formatAmount(item.quoteAmount),
				statusText,
				statusClass,
				taskTitle: item.taskTitle || '未命名任务',
				avatar,
				isQuoteMode,
				waitingInviteAccept,
				participantTypeText,
				actionList,
				participantList,
				displayParticipants,
				participantLoaded: false,
				participantLoading: false,
				contactLoading: false,
				footerActionsVisible: bizType === 'order' && (this.hasAction(actionList, 'refund', 'refund_order') || this.hasAction(actionList, 'contact') || this.hasAction(actionList, 'apply_delivery') || isCompletedOrder),
				showCancel: bizType === 'channel',
				showEdit: bizType === 'channel',
				cancelChannelLoading: false,
				showRefund: this.hasAction(actionList, 'refund', 'refund_order'),
				showAddBudget: !isCompletedOrder && this.hasAction(actionList, 'contact'),
				showExtendDelivery: !isCompletedOrder && (this.hasAction(actionList, 'refund', 'refund_order') || this.hasAction(actionList, 'contact') || this.hasAction(actionList, 'apply_delivery')),
				showConfirmDelivery: !isCompletedOrder && this.hasAction(actionList, 'apply_delivery'),
				showAppeal: false,
				showHandleInviteQuote: false,
				extraChargeLoading: false,
				acceptExtraChargeLoading: false,
				acceptInviteQuoteLoading: false,
				agreeRefundRejectLoading: false,
				extendDeliveryLoading: false,
				cancelRefundLoading: false,
				pendingExtraChargeTimeline: null,
				pendingRefundTimeline: null,
				rejectedRefundTimeline: null,
				pendingInviteQuoteTimeline: null,
				confirmDeliveryLoading: false,
				reviewCheckLoading: false,
				showReview: isCompletedOrder,
				showInvoice: false,
				showMoreAction: bizType === 'order' && !isCompletedOrder && this.hasAction(actionList, 'contact'),
				showCurrentUserAvatar: bizType === 'order',
				timelineList: [],
				participantPreviewList: displayParticipants,
				cardTheme: CARD_THEME_MAP[statusText] || 'card-publishing',
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
		async toggleExpand(id) {
			const target = this.orderList.find(item => item.id === id)
			if (!target) {
				return
			}
			target.expanded = !target.expanded
			if (target.participantLoaded) {
				const sourceList = target.participantList.length ? target.participantList : target.participantPreviewList
				target.displayParticipants = target.expanded ? sourceList : sourceList.slice(0, 1)
			}
			if (target.expanded && !target.participantLoaded && !target.participantLoading) {
				await this.fetchParticipants(target)
			}
		},
		async fetchParticipants(item) {
			if ((item.bizType === 'channel' && !item.channelId) || (item.bizType === 'order' && !item.orderNo)) {
				return
			}
			item.participantLoading = true
			item.displayParticipants = []
			try {
				const res = await request.post('/wechat/outSourcing/participant', this.buildParticipantPayload(item))
				const data = res.data || {}
				const participantList = Array.isArray(data.participantList) ? data.participantList : []
				const timelineList = Array.isArray(data.timelineList) ? data.timelineList : []
				const list = item.bizType === 'order'
					? timelineList.map(record => this.normalizeTimelineParticipant(record, item)).filter(Boolean)
					: participantList.map(record => this.normalizeParticipant(record, item))
				const sourceList = item.bizType === 'order'
					? list
					: (list.length ? list : item.participantPreviewList)
				item.participantList = list
				item.timelineList = timelineList
				item.displayParticipants = item.expanded ? sourceList : sourceList.slice(0, 1)
				this.updateOrderTimelineActions(item, timelineList)
				item.participantLoaded = true
			} catch (e) {
				item.participantLoaded = false
				item.displayParticipants = item.bizType === 'order' ? [] : item.participantPreviewList
			} finally {
				item.participantLoading = false
			}
		},
		updateOrderTimelineActions(item, timelineList) {
			if (!item || item.bizType !== 'order') {
				return
			}
			const actionList = Array.isArray(item.actionList) ? item.actionList : []
			const records = Array.isArray(timelineList) ? timelineList : []
			const lastTimeline = records.length ? records[records.length - 1] : null
			const eventType = lastTimeline && (lastTimeline.event_type || lastTimeline.eventType)
			const actionStatus = lastTimeline && (lastTimeline.actionStatus || lastTimeline.action_status)
			item.pendingExtraChargeTimeline = !!lastTimeline
				&& eventType === 'extra_charge'
				&& actionStatus === 'pending'
				? lastTimeline
				: null
			item.pendingRefundTimeline = !!lastTimeline
				&& eventType === 'refund_apply'
				&& actionStatus === 'pending'
				? lastTimeline
				: null
			item.pendingInviteQuoteTimeline = !!lastTimeline
				&& eventType === 'invite_quote'
				&& actionStatus === 'pending'
				? lastTimeline
				: null
			item.rejectedRefundTimeline = !!lastTimeline
				&& eventType === 'refund_reject'
				&& actionStatus === 'rejected'
				? lastTimeline
				: null
			item.showAddBudget = item.showAddBudget || !!item.pendingExtraChargeTimeline
			item.showCancelRefund = !!item.pendingRefundTimeline
			item.showHandleInviteQuote = !!item.pendingInviteQuoteTimeline
			item.showAgreeRefundReject = !!item.rejectedRefundTimeline
			item.showAppeal = !!item.rejectedRefundTimeline && this.isRefundingOrder(item)
			item.showConfirmDelivery = item.displayStatus !== 'completed'
				&& (this.hasAction(actionList, 'apply_delivery')
					|| (!!lastTimeline
						&& eventType === 'delivery_apply'
						&& actionStatus === 'pending'))
			item.footerActionsVisible = item.showConfirmDelivery
				|| item.showAddBudget
				|| item.showExtendDelivery
				|| item.showRefund
				|| item.showCancelRefund
				|| item.showHandleInviteQuote
				|| item.showReview
				|| item.showAgreeRefundReject
				|| item.showAppeal
		},
		hasAction(actionList, ...codes) {
			return Array.isArray(actionList) && codes.some(code => actionList.includes(code))
		},
		isRefundingOrder(item) {
			return !!item && (item.displayStatus === 'refunding' || item.status === 'refunding')
		},
		buildParticipantPayload(item) {
			if (item.bizType === 'order') {
				return {
					bizType: 'order',
					orderNo: item.orderNo
				}
			}
			return {
				bizType: 'channel',
				channelId: Number(item.channelId)
			}
		},
		getOutsourcingHeaderActions(item) {
			if (!item || !item.expanded) {
				return []
			}
			const actions = []
			if (item.showEdit) {
				actions.push({
					key: 'edit',
					text: '编辑',
					loadingText: '编辑',
					loading: false,
					className: 'edit-btn',
					disabled: false
				})
			}
			if (item.showCancel) {
				actions.push({
					key: 'cancel',
					text: '取消',
					loadingText: '取消中',
					loading: item.cancelChannelLoading,
					className: 'cancel-btn',
					disabled: item.cancelChannelLoading
				})
			}
			return actions
		},
		handleOutsourcingHeaderAction(type, item) {
			if (type === 'edit') {
				this.editOrder(item)
				return
			}
			if (type === 'cancel') {
				this.cancelOrder(item)
			}
		},
		getOutsourcingParticipantAction(item, participant, panelType = 'worker') {
			if (!item || !participant || !item.expanded || !participant.actionVisible) {
				return null
			}
			const isQuote = participant.recordType === 'quote'
			const isAssigning = isQuote && this.assigningQuoteId === participant.id
			const isContactLoading = !isQuote && !!participant.contactLoading
			const classNames = panelType === 'order'
				? ['accepted-contact-btn']
				: ['participant-action']
			if (panelType !== 'order' && participant.actionText && participant.actionText.length > 2) {
				classNames.push('contact-action')
			}
			if (panelType !== 'order' && isQuote && participant.status === 'ordered') {
				classNames.push('assigned-action')
			}
			return {
				key: isQuote ? 'assign' : 'contact',
				text: participant.actionText,
				loadingText: isQuote ? '分配中' : participant.actionText,
				loading: isQuote ? isAssigning : isContactLoading,
				className: classNames.join(' '),
				disabled: participant.actionDisabled || isContactLoading
			}
		},
		canShowOrderContactAction(item) {
			return !!item
				&& item.bizType === 'order'
				&& item.expanded
				&& Array.isArray(item.actionList)
				&& item.actionList.includes('contact')
				&& !!item.receiverUserId
		},
		getOrderContactParticipant(item) {
			return {
				userId: item && item.receiverUserId ? item.receiverUserId : '',
				name: item && item.receiverName ? item.receiverName : '接单人',
				avatar: item && item.receiverAvatar ? item.receiverAvatar : DEFAULT_AVATAR,
				contactLoading: !!(item && item.contactLoading),
				recordType: 'invite'
			}
		},
		getOutsourcingFooterActions(item) {
			if (!item || !item.expanded || item.waitingInviteAccept || !item.footerActionsVisible) {
				return []
			}
			const actions = []
			if (item.showHandleInviteQuote) {
				actions.push({
					key: 'handleInviteQuote',
					text: '处理报价',
					loadingText: '处理中',
					loading: item.acceptInviteQuoteLoading,
					className: 'primary-btn',
					disabled: item.acceptInviteQuoteLoading
				})
			}
				if (item.showRefund) {
					actions.push({
						key: 'refund',
					text: '退款',
					loadingText: '退款',
					loading: false,
					className: 'refund-btn',
						disabled: false
					})
				}
				if (item.showCancelRefund) {
					actions.push({
						key: 'cancelRefund',
						text: '取消退款',
						loadingText: '取消中',
						loading: item.cancelRefundLoading,
						className: 'outline-btn',
						disabled: item.cancelRefundLoading
					})
				}
				if (item.showAddBudget) {
				if (item.pendingExtraChargeTimeline) {
					actions.push({
						key: 'acceptExtraCharge',
						text: '同意价钱申请',
						loadingText: '处理中',
						loading: item.acceptExtraChargeLoading,
						className: 'primary-btn',
						disabled: item.acceptExtraChargeLoading
					})
				} else {
				actions.push({
					key: 'addBudget',
					text: '加钱',
					loadingText: '提交中',
					loading: item.extraChargeLoading,
					className: 'outline-btn',
					disabled: item.extraChargeLoading
				})
				}
			}
			if (item.showExtendDelivery) {
				actions.push({
					key: 'extendDelivery',
					text: '延长时间',
					loadingText: '提交中',
					loading: item.extendDeliveryLoading,
					className: 'outline-btn',
					disabled: item.extendDeliveryLoading
				})
			}
			if (item.showReview) {
				actions.push({
					key: 'review',
					text: '评价',
					loadingText: '检查中',
					loading: item.reviewCheckLoading,
					className: 'outline-btn',
					disabled: item.reviewCheckLoading
				})
			}
			if (item.showAppeal) {
				actions.push({
					key: 'appeal',
					text: '申诉',
					loadingText: '申诉',
					loading: false,
					className: 'outline-btn',
					disabled: false
				})
			}
			if (item.showAgreeRefundReject) {
				actions.push({
					key: 'agreeRefundReject',
					text: '同意拒绝退款',
					loadingText: '处理中',
					loading: item.agreeRefundRejectLoading,
					className: 'primary-btn',
					disabled: item.agreeRefundRejectLoading
				})
			}
			if (item.showConfirmDelivery) {
				actions.push({
					key: 'confirmDelivery',
					text: '确认交稿',
					loadingText: '确认中',
					loading: item.confirmDeliveryLoading,
					className: 'primary-btn',
					disabled: item.confirmDeliveryLoading
				})
			}
			return actions
		},
		handleOutsourcingFooterAction(type, item) {
			if (type === 'refund') {
				this.refundOrder(item)
				return
			}
			if (type === 'addBudget') {
				this.addBudget(item)
				return
			}
			if (type === 'acceptExtraCharge') {
				this.acceptExtraCharge(item)
				return
			}
			if (type === 'handleInviteQuote') {
				this.handleInviteQuote(item)
				return
			}
			if (type === 'cancelRefund') {
				this.cancelRefund(item)
				return
			}
			if (type === 'extendDelivery') {
				this.openExtendDeliveryPopup(item)
				return
			}
			if (type === 'review') {
				this.reviewOrder(item)
				return
			}
			if (type === 'appeal') {
				this.openAppealPopup(item)
				return
			}
			if (type === 'agreeRefundReject') {
				this.agreeRefundReject(item)
				return
			}
			if (type === 'confirmDelivery') {
				this.confirmDelivery(item)
				return
			}
		},
		normalizeParticipant(item, parentItem = {}) {
			const recordType = item.recordType === 'invite' ? 'invite' : 'quote'
			const statusMap = recordType === 'invite' ? INVITE_STATUS_MAP : QUOTE_STATUS_MAP
			const amountText = this.formatAmount(item.amount)
			const isQuote = recordType === 'quote'
			const statusText = isQuote ? '' : (statusMap[item.status] || item.status || '待处理')
			const parentActionList = Array.isArray(parentItem.actionList) ? parentItem.actionList : []
			const canAssign = parentItem.bizType !== 'order' && parentActionList.includes('assign')
			const canContact = parentItem.bizType === 'order' ? parentActionList.includes('contact') : !isQuote
			const isAssigned = item.status === 'ordered'
			const actionVisible = isQuote ? (canAssign || isAssigned) : canContact
			const actionDisabled = isQuote ? !canAssign || isAssigned : !canContact
			return {
				id: item.id ? String(item.id) : `${item.channelId || 'participant'}-${item.userId || Date.now()}`,
				userId: item.userId || item.wxUserId || item.receiverUserId || item.receiverWxUserId || '',
				avatar: this.buildImageUrl(item.avatarUrl) || DEFAULT_AVATAR,
				name: item.nickName || '匿名用户',
				statusText,
				amount: amountText,
				rawAmount: item.amount,
				recordType,
				status: item.status || '',
				actionVisible,
				actionDisabled,
				actionText: isQuote ? (isAssigned ? '已分配' : '分配') : '点击获取联系',
				contactLoading: false,
				createTime: item.createTime || ''
			}
		},
		normalizeTimelineParticipant(item, parentItem = {}) {
			if (!item) {
				return null
			}
			const canContact = Array.isArray(parentItem.actionList) && parentItem.actionList.includes('contact')
			const rawContent = item.content || ''
			const content = this.stripMediaText(rawContent)
			const senderUserId = item.senderUserId
			const isSystem = item.senderRole === 'system'
				|| item.recordType === 'system'
				|| item.actionType === 'system'
				|| senderUserId === undefined
				|| senderUserId === null
				|| senderUserId === ''
				|| String(rawContent).trim().indexOf('处理结果：') === 0
			const isSelf = !isSystem && this.isSelfTimeline(item)
			return {
				id: `${parentItem.orderNo || 'order'}-${item.senderUserId || item.createTime || Date.now()}`,
				avatar: this.buildImageUrl(item.senderAvatarUrl) || DEFAULT_AVATAR,
				name: item.senderNickName || parentItem.receiverName || '匿名用户',
				content,
				acceptText: this.normalizeAcceptText(rawContent),
				time: this.formatTimelineTime(item.createTime),
				senderUserId,
				userId: senderUserId,
				isSelf,
				isSystem,
				rowClass: isSelf ? 'timeline-message-row-self' : 'timeline-message-row-other',
				mainClass: isSelf ? 'timeline-message-main-self' : 'timeline-message-main-other',
				infoClass: isSelf ? 'timeline-message-info-self' : 'timeline-message-info-other',
				statusText: content || this.formatDate(item.createTime),
				amount: '',
				rawAmount: '',
				recordType: 'invite',
				status: item.actionStatus || '',
				eventType: item.event_type || item.eventType || '',
				actionVisible: canContact,
				actionDisabled: !canContact,
				actionText: '点击获取联系',
				contactLoading: false,
				createTime: item.createTime || ''
			}
		},
		getOrderTimelineParticipants(item) {
			if (!item || item.bizType !== 'order') {
				return []
			}
			const list = Array.isArray(item.displayParticipants) ? item.displayParticipants : []
			return list.map(participant => ({
				...participant,
				avatar: participant.avatar || item.receiverAvatar || DEFAULT_AVATAR,
				name: participant.name || item.receiverName || '接单人',
				userId: participant.userId || participant.senderUserId || item.receiverUserId,
				content: participant.content || this.normalizeAcceptText(participant.acceptText || participant.statusText),
				time: participant.time || this.formatTimelineTime(participant.createTime),
				rowClass: participant.rowClass || (participant.isSelf ? 'timeline-message-row-self' : 'timeline-message-row-other'),
				mainClass: participant.mainClass || (participant.isSelf ? 'timeline-message-main-self' : 'timeline-message-main-other'),
				infoClass: participant.infoClass || (participant.isSelf ? 'timeline-message-info-self' : 'timeline-message-info-other'),
				actionVisible: !participant.isSystem && !participant.isSelf && Array.isArray(item.actionList) && item.actionList.includes('contact'),
				actionDisabled: !(Array.isArray(item.actionList) && item.actionList.includes('contact')),
				actionText: '点击获取联系',
				contactLoading: !!(item.contactLoading || participant.contactLoading),
				recordType: participant.recordType || 'invite'
			}))
		},
		formatTimelineTime(value) {
			if (!value) {
				return ''
			}
			return String(value).replace(/-/g, '/')
		},
		formatDate(value) {
			if (!value) {
				return '未知'
			}
			const text = String(value).replace(/-/g, '/')
			return text.length >= 10 ? text.slice(0, 10) : text
		},
		formatDateTimeText(value) {
			if (!value) {
				return ''
			}
			return String(value).replace(/-/g, '/')
		},
		formatShortDate(value) {
			if (!value) {
				return '待定'
			}
			const text = String(value).replace(/-/g, '/')
			return text.length >= 10 ? text.slice(0, 10) : text
		},
		formatAmount(value) {
			if (value === null || value === undefined || value === '') {
				return '--'
			}
			return String(value)
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
				return ''
			}
			if (/^(https?:|wxfile:|data:|\/static\/)/.test(url)) {
				return url
			}
			return env.aliyunUrl + String(url).replace(/^\/+/, '') + '?x-oss-process=image/resize,w_300/quality,q_70/format,webp'
		},
		cancelOrder(item) {
			if (!item || item.cancelChannelLoading) {
				return
			}
			const channelId = item.channelId ? Number(item.channelId) : 0
			if (!channelId) {
				uni.showToast({
					title: '缺少频道ID，无法取消',
					icon: 'none'
				})
				return
			}
			uni.showModal({
				title: '确认取消',
				content: `确认取消「${item.taskTitle || '该任务'}」的展示吗？`,
				confirmText: '确认',
				cancelText: '再想想',
				success: async modalRes => {
					if (!modalRes.confirm) {
						return
					}
					item.cancelChannelLoading = true
					try {
						const res = await request.post('/wechat/outSourcing/cancelChannelDisplay', {
							channelId
						}, {
							loading: true,
							loadingText: '取消中...'
						})
						if (res && res.code && Number(res.code) !== 200) {
							uni.showToast({
								title: res.msg || '取消失败',
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '取消成功',
							icon: 'success'
						})
						this.resetList()
					} catch (e) {
						uni.showToast({
							title: '取消失败，请稍后重试',
							icon: 'none'
						})
					} finally {
						item.cancelChannelLoading = false
					}
				}
			})
		},
		editOrder(item) {
			const taskId = item && item.taskId ? String(item.taskId) : ''
			if (!taskId) {
				uni.showToast({
					title: '缺少任务ID，无法编辑',
					icon: 'none'
				})
				return
			}
			uni.navigateTo({
				url: `/subpkg-task/pages/index?taskId=${encodeURIComponent(taskId)}`
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
			const amount = item.rawAmount !== undefined && item.rawAmount !== null ? item.rawAmount : (item.amount || '')
			const query = [
				`orderNo=${encodeURIComponent(item.orderNo)}`,
				`amount=${encodeURIComponent(amount)}`,
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
			item.taskDetailLoading = true
			item.taskDetailError = ''
			try {
				const res = await request.get('/wechat/withdrawal/taskDetail', {
					orderNo: item.orderNo
				})
				const detail = this.extractTaskDetailData(res)
				item.taskDetail = detail
				item.taskDetailImages = this.normalizeImageList(detail.imageList).map(url => this.buildImageUrl(url)).filter(Boolean)
				item.taskDetailProfessions = this.normalizeProfessionList(detail.professionList)
				item.taskDetailGuarantees = this.normalizeGuaranteeList(detail.guaranteeList)
				item.taskDetailPosterIndex = 0
				item.taskDetailLoaded = true
				item.taskDetailError = ''
			} catch (e) {
				item.taskDetailError = (e && e.msg) || '订单详情加载失败'
			} finally {
				item.taskDetailLoading = false
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
			item.taskDetailPosterIndex = event.detail.current || 0
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
		handleParticipantAction(item, participant) {
			if (participant.actionDisabled) {
				return
			}
			if (participant.recordType === 'quote') {
				this.openAssignPopup(item, participant)
				return
			}
			this.showContact(item, participant)
		},
		openAssignPopup(item, participant) {
			if (!participant.id || this.assigningQuoteId === participant.id || participant.status === 'ordered') {
				return
			}
			const rawBudget = item.rawAmount
			const hasBudget = rawBudget !== null && rawBudget !== undefined && String(rawBudget).trim() !== '' && Number(rawBudget) > 0
			this.assignPopup = {
				visible: true,
				item,
				participantId: participant.id,
				participantName: participant.name || '该用户',
				participantAvatar: participant.avatar || DEFAULT_AVATAR,
				amount: hasBudget ? String(rawBudget) : '',
				submitting: false
			}
		},
		closeAssignPopup() {
			if (this.assignPopup.submitting) {
				return
			}
			this.assignPopup = {
				visible: false,
				item: null,
				participantId: '',
				participantName: '',
				participantAvatar: DEFAULT_AVATAR,
				amount: '',
				submitting: false
			}
		},
		async confirmAssign() {
			if (this.assignPopup.submitting) {
				return
			}
			const { participantId, amount, item } = this.assignPopup
			if (!participantId || !item) {
				return
			}
			const assignAmount = this.parseAmountValue(amount)
			if (Number.isNaN(assignAmount) || assignAmount < 0.01) {
				uni.showToast({
					title: '请输入正确金额',
					icon: 'none'
				})
				return
			}
			this.assignPopup.submitting = true
			this.assigningQuoteId = participantId
			try {
				const res = await request.post('/wechat/outSourcing/assignQuote', {
					quoteId: participantId,
					quoteAmount: Number(this.formatSubmitAmount(assignAmount)),
					requestNo: this.buildAssignQuoteRequestNo()
				}, {
					loading: true,
					loadingText: '下单中...'
				})
				const payParams = this.parseExtraChargePayParams(res)
				if (!payParams) {
					uni.showToast({
						title: '支付参数异常',
						icon: 'none'
					})
					this.assignPopup.submitting = false
					return
				}
				await this.requestExtraChargePayment(payParams)
				this.assignPopup = {
					visible: false,
					item: null,
					participantId: '',
					participantName: '',
					participantAvatar: DEFAULT_AVATAR,
					amount: '',
					submitting: false
				}
				uni.showToast({
					title: '支付成功',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
				this.assignPopup.submitting = false
				if (e && e.errMsg && e.errMsg.indexOf('cancel') !== -1) {
					uni.showToast({
						title: '已取消支付',
						icon: 'none'
					})
				}
			} finally {
				this.assigningQuoteId = ''
			}
		},
		closeContactPopup() {
			this.contactPopup = {
				visible: false,
				phone: '',
				wxNumber: ''
			}
		},
		async openAppealPopup() {
			this.appealPopup = {
				visible: true,
				qrcodeUrl: '',
				phone: '',
				loading: true
			}
			try {
				const res = await request.get('/wechat/basic/customerService')
				const data = res && res.data ? res.data : {}
				this.appealPopup = {
					visible: true,
					qrcodeUrl: this.normalizeCustomerServiceImage(data.qrCode),
					phone: data.phone ? String(data.phone) : '',
					loading: false
				}
			} catch (e) {
				this.appealPopup = {
					visible: true,
					qrcodeUrl: '',
					phone: '',
					loading: false
				}
				console.error('获取申诉客服信息失败', e)
			}
		},
		closeAppealPopup() {
			this.appealPopup = {
				visible: false,
				qrcodeUrl: '',
				phone: '',
				loading: false
			}
		},
		normalizeCustomerServiceImage(value) {
			if (!value || typeof value !== 'string') {
				return ''
			}
			const imageUrl = value.trim()
			if (!imageUrl) {
				return ''
			}
			if (/^(https?:|wxfile:|data:image|blob:)/.test(imageUrl)) {
				return imageUrl
			}
			if (imageUrl.startsWith('/9j/')) {
				return `data:image/jpeg;base64,${imageUrl}`
			}
			if (imageUrl.startsWith('iVBORw0KGgo') || /^[A-Za-z0-9+/=]+$/.test(imageUrl)) {
				return `data:image/png;base64,${imageUrl}`
			}
			return `${env.baseUrl.replace(/\/$/, '')}/${imageUrl.replace(/^\/+/, '')}`
		},
		extractContactData(res) {
			const candidates = [
				res && res.data,
				res && res.data && res.data.data,
				res
			]
			return candidates.find(item => item && typeof item === 'object' && (item.phone !== undefined || item.wxNumber !== undefined)) || {}
		},
		async showContact(item, participant) {
			if (!item || !participant || participant.contactLoading || item.contactLoading) {
				return
			}
			const userId = participant.userId || participant.senderUserId || item.receiverUserId
			if (!userId) {
				uni.showToast({
					title: '用户ID缺失，无法获取联系信息',
					icon: 'none'
				})
				return
			}
			participant.contactLoading = true
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
				participant.contactLoading = false
				item.contactLoading = false
			}
		},
		refundOrder(item) {
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法退款',
					icon: 'none'
				})
				return
			}
			const orderAmount = this.parseAmountValue(item.rawAmount)
			if (Number.isNaN(orderAmount) || orderAmount <= 0) {
				uni.showToast({
					title: '当前订单金额不允许退款',
					icon: 'none'
				})
				return
			}
			this.refundReasonPopup = {
				visible: true,
				item,
				reason: '',
				otherReason: '',
				finalReason: '',
				loading: false
			}
		},
		closeRefundReasonPopup() {
			if (this.refundReasonPopup.loading) {
				return
			}
			this.refundReasonPopup = {
				visible: false,
				item: null,
				reason: '',
				otherReason: '',
				finalReason: '',
				loading: false
			}
		},
		confirmRefundReason(data) {
			const item = this.refundReasonPopup.item
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法退款',
					icon: 'none'
				})
				return
			}
			const orderAmount = this.parseAmountValue(item.rawAmount)
			if (Number.isNaN(orderAmount) || orderAmount <= 0) {
				uni.showToast({
					title: '当前订单金额不允许退款',
					icon: 'none'
				})
				return
			}
			this.refundReasonPopup = {
				visible: false,
				item: null,
				reason: data.reason || '',
				otherReason: data.otherReason || '',
				finalReason: data.finalReason || '',
				loading: false
			}
			this.refundPopup = {
				visible: true,
				item,
				amount: '',
				submitting: false,
				orderAmount: this.formatSubmitAmount(orderAmount),
				reason: data.finalReason || data.reason || ''
			}
		},
		closeRefundPopup() {
			if (this.refundPopup.submitting) {
				return
			}
			this.refundPopup = {
				visible: false,
				item: null,
				amount: '',
				submitting: false,
				orderAmount: '',
				reason: ''
			}
		},
		async confirmRefund() {
			if (this.refundPopup.submitting) {
				return
			}
			const item = this.refundPopup.item
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法退款',
					icon: 'none'
				})
				return
			}
			const refundAmountText = String(this.refundPopup.amount || '').trim()
			if (!refundAmountText) {
				uni.showToast({
					title: '请输入退款金额',
					icon: 'none'
				})
				return
			}
			const refundAmount = this.parseAmountValue(refundAmountText)
			if (Number.isNaN(refundAmount) || refundAmount <= 0) {
				uni.showToast({
					title: '请输入正确金额',
					icon: 'none'
				})
				return
			}
			const orderAmount = this.parseAmountValue(item.rawAmount)
			if (Number.isNaN(orderAmount) || orderAmount <= 0) {
				uni.showToast({
					title: '当前订单金额不允许退款',
					icon: 'none'
				})
				return
			}
			if (refundAmount > orderAmount) {
				uni.showToast({
					title: '退款金额不能大于订单金额',
					icon: 'none'
				})
				return
			}
			const isFullRefund = refundAmount === orderAmount
			const payload = {
				orderNo: item.orderNo,
				refundType: isFullRefund ? 'full' : 'partial',
				refundReason: this.refundPopup.reason
			}
			if (!isFullRefund) {
				payload.refundAmount = this.formatSubmitAmount(refundAmount)
			}
			this.refundPopup.submitting = true
			try {
				await request.post('/wechat/outSourcing/applyRefund', payload, {
					loading: true,
					loadingText: '提交中...'
				})
				this.refundPopup = {
					visible: false,
					item: null,
					amount: '',
					submitting: false,
					orderAmount: '',
					reason: ''
				}
				uni.showToast({
					title: '退款申请已提交',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
				this.refundPopup.submitting = false
			}
		},
		addBudget(item) {
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
		cancelRefund(item) {
			if (!item || item.cancelRefundLoading) {
				return
			}
			const timelineId = this.getTimelineId(item.pendingRefundTimeline)
			if (!item.orderNo || !timelineId) {
				uni.showToast({
					title: '退款申请信息缺失',
					icon: 'none'
				})
				return
			}
			uni.showModal({
				title: '取消退款',
				content: '确认取消本次退款申请吗？',
				confirmText: '确认',
				cancelText: '再想想',
				success: async modalRes => {
					if (!modalRes.confirm) {
						return
					}
					item.cancelRefundLoading = true
					try {
						const res = await request.post('/wechat/outSourcing/cancelRefund', {
							orderNo: item.orderNo,
							timelineId: Number.isNaN(Number(timelineId)) ? timelineId : Number(timelineId)
						}, {
							loading: true,
							loadingText: '取消中...'
						})
						if (res && res.code && Number(res.code) !== 200) {
							uni.showToast({
								title: res.msg || '取消失败',
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '已取消退款',
							icon: 'success'
						})
						this.resetList()
					} catch (e) {
						uni.showToast({
							title: '取消失败，请稍后重试',
							icon: 'none'
						})
					} finally {
						item.cancelRefundLoading = false
					}
				}
			})
		},
		openExtendDeliveryPopup(item) {
			if (!item || !item.orderNo || item.extendDeliveryLoading) {
				return
			}
			this.extendDeliveryPopup = {
				visible: true,
				item,
				extendDays: '',
				currentDate: this.formatDateTimeText(item.rawDeliveryDate),
				submitting: false
			}
		},
		closeExtendDeliveryPopup() {
			if (this.extendDeliveryPopup.submitting) {
				return
			}
			this.extendDeliveryPopup = {
				visible: false,
				item: null,
				extendDays: '',
				currentDate: '',
				submitting: false
			}
		},
		handleExtendDaysInput(e) {
			const value = String(e && e.detail ? e.detail.value : '').replace(/\D/g, '').slice(0, 2)
			this.extendDeliveryPopup.extendDays = value
			return value
		},
		async confirmExtendDelivery() {
			if (this.extendDeliveryPopup.submitting) {
				return
			}
			const item = this.extendDeliveryPopup.item
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法延长',
					icon: 'none'
				})
				return
			}
			const extendDays = Number(String(this.extendDeliveryPopup.extendDays || '').trim())
			if (!Number.isInteger(extendDays) || extendDays < 1 || extendDays > 30) {
				uni.showToast({
					title: '请输入1-30天的延长天数',
					icon: 'none'
				})
				return
			}
			this.extendDeliveryPopup.submitting = true
			item.extendDeliveryLoading = true
			try {
				const res = await request.post('/wechat/outSourcing/extendDelivery', {
					orderNo: item.orderNo,
					extendDays
				}, {
					loading: true,
					loadingText: '提交中...'
				})
				if (res && res.code !== undefined && res.code !== 200) {
					uni.showToast({
						title: res.msg || '提交失败',
						icon: 'none',
						duration: 3000
					})
					this.extendDeliveryPopup.submitting = false
					return
				}
				this.extendDeliveryPopup = {
					visible: false,
					item: null,
					extendDays: '',
					currentDate: '',
					submitting: false
				}
				uni.showToast({
					title: res.msg || '已延长交稿时间',
					icon: 'none',
					duration: 3000
				})
				this.resetList()
			} catch (e) {
				this.extendDeliveryPopup.submitting = false
				if (e && e.msg) {
					uni.showToast({
						title: e.msg,
						icon: 'none',
						duration: 3000
					})
				}
			} finally {
				item.extendDeliveryLoading = false
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
		buildExtraChargeRequestNo() {
			const randomText = Math.random().toString(36).slice(2, 8).toUpperCase()
			return `EXTRA_${Date.now()}_${randomText}`
		},
		buildAssignQuoteRequestNo() {
			const randomText = Math.random().toString(36).slice(2, 8).toUpperCase()
			return `ASSIGN_${Date.now()}_${randomText}`
		},
		parseExtraChargePayParams(res) {
			let data = res && res.data
			if (typeof data === 'string') {
				try {
					data = JSON.parse(data)
				} catch (e) {
					data = null
				}
			}
			let payParams = data && data.payParams
			if (typeof payParams === 'string') {
				try {
					payParams = JSON.parse(payParams)
				} catch (e) {
					payParams = null
				}
			}
			if (!payParams && data && data.timeStamp && data.nonceStr && data.package && data.paySign) {
				payParams = data
			}
			return payParams
		},
		requestExtraChargePayment(payParams) {
			return new Promise((resolve, reject) => {
				uni.requestPayment({
					provider: 'wxpay',
					...payParams,
					success: resolve,
					fail: reject
				})
			})
		},
		getTimelineId(record) {
			if (!record) {
				return ''
			}
			return record.timelineId || record.timeline_id || record.id || ''
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
				const res = await request.post('/wechat/outSourcing/extraCharge', {
					orderNo: item.orderNo,
					extraAmount: Number(this.formatSubmitAmount(amount)),
					operationType: 'publisher_direct',
					requestNo: this.buildExtraChargeRequestNo()
				}, {
					loading: true,
					loadingText: '下单中...'
				})
				const payParams = this.parseExtraChargePayParams(res)
				if (!payParams) {
					uni.showToast({
						title: '支付参数异常',
						icon: 'none'
					})
					this.extraChargePopup.submitting = false
					return
				}
				await this.requestExtraChargePayment(payParams)
				this.extraChargePopup = {
					visible: false,
					item: null,
					amount: '',
					submitting: false
				}
				uni.showToast({
					title: '支付成功',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
				this.extraChargePopup.submitting = false
				if (e && e.errMsg && e.errMsg.indexOf('cancel') !== -1) {
					uni.showToast({
						title: '已取消支付',
						icon: 'none'
					})
				}
			} finally {
				item.extraChargeLoading = false
			}
		},
		async acceptExtraCharge(item) {
			if (!item || !item.orderNo || item.acceptExtraChargeLoading) {
				return
			}
			const timelineId = this.getTimelineId(item.pendingExtraChargeTimeline)
			if (!timelineId) {
				uni.showToast({
					title: '加价申请信息缺失，无法处理',
					icon: 'none'
				})
				return
			}
			item.acceptExtraChargeLoading = true
			try {
				const res = await request.post('/wechat/outSourcing/acceptExtraCharge', {
					orderNo: item.orderNo,
					timelineId: Number.isNaN(Number(timelineId)) ? timelineId : Number(timelineId),
					requestNo: this.buildExtraChargeRequestNo()
				}, {
					loading: true,
					loadingText: '下单中...'
				})
				const payParams = this.parseExtraChargePayParams(res)
				if (!payParams) {
					uni.showToast({
						title: '支付参数异常',
						icon: 'none'
					})
					return
				}
				await this.requestExtraChargePayment(payParams)
				uni.showToast({
					title: '支付成功',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
				if (e && e.errMsg && e.errMsg.indexOf('cancel') !== -1) {
					uni.showToast({
						title: '已取消支付',
						icon: 'none'
					})
				}
			} finally {
				item.acceptExtraChargeLoading = false
			}
		},
		agreeRefundReject(item) {
			if (!item || item.agreeRefundRejectLoading) {
				return
			}
			const timelineId = this.getTimelineId(item.rejectedRefundTimeline)
			if (!item.orderNo || !timelineId) {
				uni.showToast({
					title: '退款拒绝信息缺失',
					icon: 'none'
				})
				return
			}
			uni.showModal({
				title: '同意拒绝退款',
				content: '确认同意对方拒绝退款，并恢复订单服务中状态吗？',
				confirmText: '同意',
				cancelText: '再想想',
				success: async modalRes => {
					if (!modalRes.confirm) {
						return
					}
					item.agreeRefundRejectLoading = true
					try {
						const res = await request.post('/wechat/outSourcing/agreeRefundReject', {
							orderNo: item.orderNo,
							timelineId: Number.isNaN(Number(timelineId)) ? timelineId : Number(timelineId)
						}, {
							loading: true,
							loadingText: '处理中...'
						})
						if (res && res.code && Number(res.code) !== 200) {
							uni.showToast({
								title: res.msg || '处理失败',
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '已同意拒绝退款',
							icon: 'success'
						})
						this.resetList()
					} catch (e) {
						uni.showToast({
							title: (e && e.msg) || '处理失败，请稍后重试',
							icon: 'none'
						})
					} finally {
						item.agreeRefundRejectLoading = false
					}
				}
			})
		},
		handleInviteQuote(item) {
			if (!item || item.acceptInviteQuoteLoading) {
				return
			}
			const timelineId = this.getTimelineId(item.pendingInviteQuoteTimeline)
			if (!item.orderNo || !timelineId) {
				uni.showToast({
					title: '报价信息缺失，无法处理',
					icon: 'none'
				})
				return
			}
			uni.showModal({
				title: '处理报价',
				content: '请选择是否同意本次报价',
				confirmText: '同意',
				cancelText: '拒绝',
				confirmColor: '#F37738',
				success: modalRes => {
					if (modalRes.confirm) {
						this.acceptInviteQuote(item, timelineId, 'agree')
						return
					}
					if (modalRes.cancel) {
						this.acceptInviteQuote(item, timelineId, 'reject')
					}
				}
			})
		},
		async acceptInviteQuote(item, timelineId, action) {
			if (!item || !item.orderNo || item.acceptInviteQuoteLoading) {
				return
			}
			item.acceptInviteQuoteLoading = true
			try {
				const payload = {
					orderNo: item.orderNo,
					timelineId: Number.isNaN(Number(timelineId)) ? timelineId : Number(timelineId),
					action
				}
				const res = await request.post('/wechat/tOrder/acceptInviteQuote', payload, {
					loading: true,
					loadingText: action === 'agree' ? '下单中...' : '处理中...'
				})
				if (action === 'agree') {
					const payParams = this.parseExtraChargePayParams(res)
					if (!payParams) {
						uni.showToast({
							title: '支付参数异常',
							icon: 'none'
						})
						return
					}
					await this.requestExtraChargePayment(payParams)
					uni.showToast({
						title: '支付成功',
						icon: 'success'
					})
				} else {
					uni.showToast({
						title: '已拒绝报价',
						icon: 'success'
					})
				}
				this.resetList()
			} catch (e) {
				if (e && e.errMsg && e.errMsg.indexOf('cancel') !== -1) {
					uni.showToast({
						title: '已取消支付',
						icon: 'none'
					})
				}
			} finally {
				item.acceptInviteQuoteLoading = false
			}
		},
		async reviewOrder(item) {
			if (!item || !item.orderNo) {
				uni.showToast({
					title: '订单编号缺失，无法评价',
					icon: 'none'
				})
				return
			}
			if (item.reviewCheckLoading) {
				return
			}
			if (!item.receiverUserId) {
				uni.showToast({
					title: '被评价用户ID缺失',
					icon: 'none'
				})
				return
			}
			item.reviewCheckLoading = true
			try {
				const res = await request.get('/wechat/comment/order/check', {
					orderNo: item.orderNo
				}, {
					loading: true,
					loadingText: '检查中...'
				})
				const msg = res && res.msg
				if (msg !== null && msg !== undefined && String(msg).trim()) {
					uni.showToast({
						title: String(msg),
						icon: 'none'
					})
					return
				}
				this.reviewPopup = {
					visible: true,
					item,
					rating: 0,
					content: '',
					imageList: [],
					uploading: false,
					submitting: false
				}
			} catch (e) {
			} finally {
				item.reviewCheckLoading = false
			}
		},
		closeReviewPopup() {
			if (this.reviewPopup.submitting || this.reviewPopup.uploading) {
				return
			}
			this.reviewPopup = {
				visible: false,
				item: null,
				rating: 0,
				content: '',
				imageList: [],
				uploading: false,
				submitting: false
			}
		},
		setReviewRating(star) {
			if (this.reviewPopup.submitting) {
				return
			}
			const rating = Number(star)
			if (!Number.isFinite(rating)) {
				return
			}
			this.reviewPopup.rating = Math.min(5, Math.max(1, Math.floor(rating)))
		},
		normalizeUploadPath(value) {
			if (!value) {
				return ''
			}
			if (typeof value === 'string') {
				const text = value.trim()
				return text && text !== '操作成功' ? text : ''
			}
			if (typeof value === 'object') {
				return this.normalizeUploadPath(value.url || value.fileUrl || value.ossKey || value.path || value.key)
			}
			return ''
		},
		async chooseReviewImages() {
			if (this.reviewPopup.uploading) {
				return
			}
			const remain = 5 - this.reviewPopup.imageList.length
			if (remain <= 0) {
				uni.showToast({
					title: '评论图片最多上传5张',
					icon: 'none'
				})
				return
			}
			const chooseRes = await new Promise(resolve => {
				uni.chooseMedia({
					count: remain,
					mediaType: ['image'],
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: resolve,
					fail: () => resolve(null)
				})
			})
			const files = chooseRes && Array.isArray(chooseRes.tempFiles) ? chooseRes.tempFiles : []
			if (files.length === 0) {
				return
			}
			this.reviewPopup.uploading = true
			uni.showLoading({
				title: '上传中...'
			})
			try {
				const uploadedList = []
				for (const file of files) {
					const filePath = file.tempFilePath || file.path
					if (!filePath) {
						continue
					}
					const res = await uploadFile({
						url: env.baseUrl + '/wechat/basic/upload?isVerify=false&isTeam=false',
						filePath,
						name: 'file'
					})
					const path = this.normalizeUploadPath(res && (res.msg || res.data))
					if (res && res.code === 200 && path) {
						uploadedList.push(path)
					}
				}
				if (uploadedList.length === 0) {
					uni.showToast({
						title: '图片上传失败',
						icon: 'none'
					})
					return
				}
				this.reviewPopup.imageList = this.reviewPopup.imageList.concat(uploadedList).slice(0, 5)
			} catch (e) {
				uni.showToast({
					title: '图片上传失败',
					icon: 'none'
				})
			} finally {
				uni.hideLoading()
				this.reviewPopup.uploading = false
			}
		},
		removeReviewImage(index) {
			if (this.reviewPopup.submitting || this.reviewPopup.uploading) {
				return
			}
			this.reviewPopup.imageList.splice(index, 1)
		},
		previewReviewImage(index) {
			const urls = this.reviewPopup.imageList.map(item => this.buildImageUrl(item)).filter(Boolean)
			if (urls.length === 0) {
				return
			}
			uni.previewImage({
				urls,
				current: urls[index]
			})
		},
		async submitReview() {
			if (this.reviewPopup.submitting) {
				return
			}
			const item = this.reviewPopup.item
			const orderNo = item && item.orderNo ? String(item.orderNo).trim() : ''
			const rating = Number(this.reviewPopup.rating)
			const content = String(this.reviewPopup.content || '').trim()
			if (!orderNo) {
				uni.showToast({
					title: '订单编号不能为空',
					icon: 'none'
				})
				return
			}
			if (!item.receiverUserId) {
				uni.showToast({
					title: '被评价用户ID不能为空',
					icon: 'none'
				})
				return
			}
			if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
				uni.showToast({
					title: '请选择1-5星评分',
					icon: 'none'
				})
				return
			}
			if (!content) {
				uni.showToast({
					title: '请输入评价内容',
					icon: 'none'
				})
				return
			}
			if (content.length > 500) {
				uni.showToast({
					title: '评论内容不能超过500个字符',
					icon: 'none'
				})
				return
			}
			if (this.reviewPopup.imageList.length > 5) {
				uni.showToast({
					title: '评论图片最多上传5张',
					icon: 'none'
				})
				return
			}
			this.reviewPopup.submitting = true
			try {
				await request.post('/wechat/comment/publish', {
					orderNo,
					reviewedUserId: item.receiverUserId,
					rating,
					content,
					imageList: this.reviewPopup.imageList
				}, {
					loading: true,
					loadingText: '提交中...'
				})
				uni.showToast({
					title: '评价成功',
					icon: 'success'
				})
				this.reviewPopup.submitting = false
				this.closeReviewPopup()
			} catch (e) {
			} finally {
				this.reviewPopup.submitting = false
			}
		},
		async confirmDelivery(item) {
			if (!item || !item.orderNo || item.confirmDeliveryLoading) {
				return
			}
			const confirmRes = await new Promise(resolve => {
				uni.showModal({
					title: '确认交稿',
					content: `确定确认“${item.taskTitle}”已经完成交稿吗？`,
					confirmColor: '#F37738',
					success: resolve,
					fail: () => resolve({ confirm: false })
				})
			})
			if (!confirmRes.confirm) {
				return
			}
			item.confirmDeliveryLoading = true
			try {
				await request.post('/wechat/outSourcing/confirmDelivery', {
					orderNo: item.orderNo
				}, {
					loading: true,
					loadingText: '确认中...'
				})
				uni.showToast({
					title: '确认交稿成功',
					icon: 'success'
				})
				this.resetList()
			} catch (e) {
			} finally {
				item.confirmDeliveryLoading = false
			}
		}
	}
}
</script>

<style scoped>
page {
	background: #f7f7f7;
}

.outsourcing-page {
	width: 750rpx;
	height: 100vh;
	background: #f7f7f7;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.header-panel {
	position: relative;
	background: #ffffff;
}

.capsule {
	position: absolute;
	top: 93rpx;
	right: 21rpx;
	width: 197rpx;
	height: 65rpx;
	border: 1rpx solid #e1e1e1;
	border-radius: 33rpx;
	box-sizing: border-box;
}

.capsule-line {
	position: absolute;
	top: 14rpx;
	left: 98rpx;
	width: 1rpx;
	height: 38rpx;
	background: #e1e1e1;
}

.capsule-dot-group {
	position: absolute;
	top: 29rpx;
	left: 30rpx;
	display: flex;
	align-items: center;
	gap: 7rpx;
}

.dot {
	border-radius: 50%;
	background: #000000;
}

.dot.small {
	width: 7rpx;
	height: 7rpx;
}

.dot.large {
	width: 12rpx;
	height: 12rpx;
}

.capsule-circle {
	position: absolute;
	top: 14rpx;
	right: 29rpx;
	width: 35rpx;
	height: 35rpx;
	border: 4rpx solid #000000;
	border-radius: 50%;
	box-sizing: border-box;
}

.tabs {
	display: inline-flex;
	align-items: center;
	padding: 0 8rpx 0 12rpx;
}

.tab-item {
	position: relative;
	flex-shrink: 0;
	font-size: 30rpx;
	color: #434343;
	padding: 14rpx 22rpx 21rpx;
}

.tab-item + .tab-item {
	margin-left: 20rpx;
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

.order-scroll {
	flex: 1;
	height: 0;
	background: #f7f7f7;
}

.order-list {
	padding: 25rpx 20rpx 42rpx;
	box-sizing: border-box;
}

.order-card {
	position: relative;
	width: 710rpx;
	min-height: 180rpx;
	margin-bottom: 24rpx;
	border: none;
	border-radius: 30rpx;
	background: linear-gradient(146deg, #ff8f1e 0%, #f37738 100%);
	box-shadow: 0 11rpx 21rpx #eeeeee;
	box-sizing: border-box;
	overflow: hidden;
	transition: min-height 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.order-card.expanded {
	min-height: 342rpx;
}

/* 状态文字颜色 — 固定色（展开/收起相同） */
.card-pending .status { color: #4779CC; }
.card-service .status { color: #19C229; }
.card-refund .status { color: #F33838; }

/* 待接单展开态：#F37738 */
.order-card.expanded.card-pending .status { color: #F37738; }

/* 已婉拒/已取消 收起态背景 */
.order-card.card-rejected {
	background: #B5B5B5;
}

/* 状态文字颜色 — 收起白色 */
.card-drafting .status,
.card-rejected .status,
.card-publishing .status,
.card-done .status,
.card-confirm .status { color: #FFFFFF; }

/* 状态文字颜色 — 展开黑色 */
.order-card.expanded.card-drafting .status,
.order-card.expanded.card-rejected .status,
.order-card.expanded.card-publishing .status,
.order-card.expanded.card-done .status,
.order-card.expanded.card-confirm .status { color: #000000; }

/* 展开背景 + 内描边 */
.order-card.expanded.card-pending,
.order-card.expanded.card-service,
.order-card.expanded.card-drafting,
.order-card.expanded.card-publishing,
.order-card.expanded.card-confirm {
	background: #FFF3E7;
	border: 1rpx solid #F37738;
}

.order-card.expanded.card-rejected {
	background: #DFDFDF;
	border: 1rpx solid #B5B5B5;
}

.order-card.expanded.card-refund {
	background: #FFF0F0;
	border: 1rpx solid #FFA2A2;
}

.order-card.expanded.card-done {
	background: #FF8F1E;
}

/* 已完成展开态：橙底需白字 */
.order-card.expanded.card-done .customer-name { color: #FFFFFF; }
.order-card.expanded.card-done .amount { color: #FFFFFF; }
.order-card.expanded.card-done .order-date { color: rgba(255, 255, 255, 0.72); }
.order-card.expanded.card-done .deliver-date { color: rgba(255, 255, 255, 0.72); }
.order-card.expanded.card-done .order-info-line { color: rgba(255, 255, 255, 0.72); }

.card-main {
	position: relative;
	height: 180rpx;
}

.avatar {
	position: absolute;
	left: 27rpx;
	top: 31rpx;
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
}

.customer {
	position: absolute;
	left: 129rpx;
	top: 35rpx;
	width: 220rpx;
}

.customer-name {
	display: block;
	max-width:210rpx ;
	height: 45rpx;
	line-height: 45rpx;
	font-size: 32rpx;
	color: #ffffff;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.expanded .customer-name {
	color: #000000;
}

.order-date {
	display: block;
	margin-top: 12rpx;
	height: 34rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.65);
}

.expanded .order-date {
	color: rgba(0, 0, 0, 0.4);
}

.order-info-line {
	position: absolute;
	left: 129rpx;
	right: 28rpx;
	top: 126rpx;
	display: block;
	height: 30rpx;
	line-height: 30rpx;
	font-size: 20rpx;
	color: rgba(255, 255, 255, 0.58);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.expanded .order-info-line {
	color: rgba(0, 0, 0, 0.35);
}

.amount-block {
	position: absolute;
	left: 363rpx;
	top: 30rpx;
	width: 220rpx;
}

.amount {
	display: block;
	height: 54rpx;
	line-height: 54rpx;
	font-size: 38rpx;
	color: #ffffff;
}

.expanded .amount {
	color: #f37738;
}

.deliver-date {
	display: block;
	white-space: nowrap;
	margin-top: 11rpx;
	height: 34rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.65);
}

.expanded .deliver-date {
	color: rgba(0, 0, 0, 0.4);
}

.status {
	position: absolute;
	right: 26rpx;
	top: 63rpx;
	height: 34rpx;
	line-height: 34rpx;
	font-size: 24rpx;
}

.status-blue {
	color: #4779cc;
}

.status-orange {
	color: #ffffff;
}

.status-green {
	color: #19c229;
}

.status-gray {
	color: #666666;
}

.status-white {
	color: #ffffff;
}

.detail-panel {
	position: relative;
	width: 702rpx;
	min-height: 196rpx;
	margin-left: 4rpx;
	padding-top: 1rpx;
	padding-bottom: 23rpx;
	border-radius: 30rpx;
	background: #ffffff;
	box-sizing: border-box;
}

.task-row {
	position: relative;
	height: 73rpx;
}

.task-title-wrap {
	position: absolute;
	left: 28rpx;
	right: 28rpx;
	top: 23rpx;
	display: flex;
	align-items: center;
	min-width: 0;
}

.task-title-wrap.with-header-actions {
	right: 335rpx;
}

.task-title {
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
	width: 140;
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
	margin-left: 14rpx;
	border-left: 12rpx solid transparent;
	border-right: 12rpx solid transparent;
	border-top: 14rpx solid #979797;
	transition: transform 0.2s ease;
}

.expand-icon.open {
	transform: rotate(180deg);
}

.cancel-btn {
	position: absolute;
	right: 15rpx;
	top: 12rpx;
	width: 144rpx;
	height: 48rpx;
	line-height: 46rpx;
	border-radius: 36rpx;
	background: #dfdfdf;
	font-size: 24rpx;
	color: #666666;
	text-align: center;
}

.edit-btn {
	position: absolute;
	right: 175rpx;
	top: 12rpx;
	width: 144rpx;
	height: 48rpx;
	line-height: 46rpx;
	border: 1rpx solid #f37738;
	border-radius: 36rpx;
	box-sizing: border-box;
	background: #ffffff;
	font-size: 24rpx;
	color: #f37738;
	text-align: center;
}

.divider {
	width: 660rpx;
	height: 1rpx;
	margin-left: 25rpx;
	background: #dddddd;
}

.timeline-entry {
	position: relative;
	padding: 22rpx 32rpx;
	box-sizing: border-box;
}

.order-operation-panel {
	padding: 22rpx 25rpx 18rpx;
	box-sizing: border-box;
}

.accepted-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 88rpx;
}

.accepted-user {
	display: flex;
	align-items: center;
	min-width: 0;
	flex: 1;
}

.accepted-avatar {
	display: block;
	width: 72rpx !important;
	height: 72rpx !important;
	min-width: 72rpx;
	max-width: 72rpx;
	min-height: 72rpx;
	max-height: 72rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
	overflow: hidden;
}

.accepted-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 0;
	margin-left: 20rpx;
}

.accepted-name {
	max-width: 320rpx;
	height: 40rpx;
	line-height: 40rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #111111;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.accepted-state {
	max-width: 320rpx;
	margin-top: 6rpx;
	height: 34rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: rgba(0, 0, 0, 0.4);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.accepted-contact-btn {
	min-width: 198rpx;
	height: 48rpx;
	line-height: 46rpx;
	padding: 0 24rpx;
	border: 1rpx solid #f37738;
	border-radius: 36rpx;
	box-sizing: border-box;
	background: #ffffff;
	font-size: 24rpx;
	color: #f37738;
	text-align: center;
	white-space: nowrap;
	flex-shrink: 0;
}

.accepted-contact-btn.disabled-action {
	border-color: #dddddd;
	color: #999999;
	background: #f7f7f7;
}

.timeline-entry + .timeline-entry {
	border-top: 1rpx solid #eeeeee;
}

.timeline-message-row {
	display: flex;
	width: 100%;
	box-sizing: border-box;
}

.timeline-message-row-other {
	justify-content: flex-start;
}

.timeline-message-row-self {
	justify-content: flex-end;
}

.timeline-message-main {
	display: flex;
	align-items: flex-start;
	max-width: 600rpx;
	min-width: 0;
}

.timeline-message-main-other {
	flex-direction: row;
}

.timeline-message-main-self {
	flex-direction: row-reverse;
}

.timeline-message-avatar {
	display: block;
	width: 64rpx !important;
	height: 64rpx !important;
	min-width: 64rpx;
	max-width: 64rpx;
	min-height: 64rpx;
	max-height: 64rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
	overflow: hidden;
}

.timeline-message-info {
	display: flex;
	flex-direction: column;
	max-width: 500rpx;
	min-width: 0;
}

.timeline-message-info-other {
	align-items: flex-start;
	margin-left: 20rpx;
	text-align: left;
}

.timeline-message-info-self {
	align-items: flex-end;
	margin-right: 20rpx;
	text-align: right;
}

.timeline-message-name,
.timeline-message-content,
.timeline-message-time {
	display: block;
	max-width: 100%;
	box-sizing: border-box;
}

.timeline-message-name {
	line-height: 40rpx;
	font-size: 28rpx;
	color: #000000;
}

.timeline-message-content {
	margin-top: 4rpx;
	line-height: 36rpx;
	font-size: 26rpx;
	color: #222222;
	white-space: pre-wrap;
	word-break: break-all;
}

.timeline-message-time {
	margin-top: 5rpx;
	line-height: 30rpx;
	font-size: 22rpx;
	color: rgba(0, 0, 0, 0.4);
}

.timeline-message-action.participant-action {
	position: static;
	margin: 14rpx 0 0 auto;
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

.worker-row {
	position: relative;
	height: 90rpx;
}

.participant-state {
	height: 120rpx;
	line-height: 120rpx;
	font-size: 24rpx;
	color: #999999;
	text-align: center;
}

.worker-avatar {
	position: absolute;
	left: 33rpx;
	top: 24rpx;
	display: block;
	width: 72rpx !important;
	height: 72rpx !important;
	min-width: 72rpx;
	max-width: 72rpx;
	min-height: 72rpx;
	max-height: 72rpx;
	border-radius: 50%;
	overflow: hidden;
}

.worker-info {
	position: absolute;
	left: 124rpx;
	top: 18rpx;
	min-width: 0;
	max-width: 330rpx;
}

.worker-name {
	display: block;
	height: 40rpx;
	line-height: 40rpx;
	font-size: 28rpx;
	color: #000000;
}

.worker-state {
	display: block;
	margin-top: 7rpx;
	height: 34rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: rgba(0, 0, 0, 0.4);
}

.participant-action {
	position: absolute;
	right: 37rpx;
	top: 12rpx;
	width: 144rpx;
	height: 48rpx;
	line-height: 46rpx;
	border-radius: 36rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	color: #ffffff;
	background: #f37738;
	text-align: center;
}

.participant-amount {
	position: absolute;
	right: 277rpx;
	top: 20rpx;
	width: 160rpx;
	height: 34rpx;
	line-height: 34rpx;
	font-size: 24rpx;
	color: #000000;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.participant-action.contact-action {
	right: 22rpx;
	width: 198rpx;
	border: 1rpx solid #f37738;
	background: #ffffff;
	color: #f37738;
}

.participant-action.assigned-action {
	background: #dfdfdf;
	color: #666666;
}

.participant-action.disabled-action {
	background: #dfdfdf;
	color: #666666;
}

.expanded-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 16rpx;
	min-height: 100rpx;
	border-top: 1rpx solid #dddddd;
	margin: 0 25rpx;
	padding: 0 4rpx;
	box-sizing: border-box;
}

.refund-btn,
.outline-btn,
.primary-btn {
	display: inline-flex;
	align-items: flex-start;
	justify-content: center;
	min-width: 112rpx;
	height: 48rpx;
	line-height: 46rpx;
	padding: 0 24rpx;
	border-radius: 36rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	text-align: center;
	white-space: nowrap;
}

.refund-btn {
	border: 1rpx solid #999999;
	color: #666666;
	background: #ffffff;
}

.outline-btn {
	border: 1rpx solid #f37738;
	color: #f37738;
	background: #ffffff;
}

.primary-btn {
	min-width: 150rpx;
	background: #f37738;
	color: #ffffff;
}

.primary-btn.disabled-action {
	opacity: 0.65;
}

.current-user-avatar {
	display: block;
	width: 72rpx !important;
	height: 72rpx !important;
	min-width: 72rpx;
	max-width: 72rpx;
	min-height: 72rpx;
	max-height: 72rpx;
	margin-left: 2rpx;
	border-radius: 50%;
	background: #d8d8d8;
	flex-shrink: 0;
	overflow: hidden;
}

.review-popup-mask {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 1000;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: flex-end;
	justify-content: center;
}

.review-popup {
	width: 750rpx;
	padding: 36rpx 32rpx calc(40rpx + env(safe-area-inset-bottom));
	border-radius: 32rpx 32rpx 0 0;
	background: #ffffff;
	box-sizing: border-box;
}

.review-popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 56rpx;
}

.review-popup-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #111111;
}

.review-popup-close {
	width: 56rpx;
	height: 56rpx;
	line-height: 52rpx;
	font-size: 44rpx;
	color: #999999;
	text-align: center;
}

.review-rating-row {
	display: flex;
	align-items: center;
	margin-top: 24rpx;
}

.review-rating-label {
	margin-right: 22rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #222222;
}

.review-stars {
	display: flex;
	align-items: center;
	height: 42rpx;
}

.review-star {
	margin-right: 8rpx;
	font-size: 36rpx;
	line-height: 42rpx;
	color: #d6d6d6;
}

.review-star.active {
	color: #f37738;
}

.review-textarea {
	width: 100%;
	height: 210rpx;
	margin-top: 28rpx;
	padding: 24rpx;
	border-radius: 20rpx;
	background: #f7f7f7;
	box-sizing: border-box;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #222222;
}

.review-placeholder {
	color: #b7b7b7;
}

.review-count {
	margin-top: 10rpx;
	font-size: 22rpx;
	line-height: 32rpx;
	color: #999999;
	text-align: right;
}

.review-images {
	display: flex;
	flex-wrap: wrap;
	gap: 18rpx;
	margin-top: 18rpx;
}

.review-image-wrap,
.review-upload-btn {
	position: relative;
	width: 150rpx;
	height: 150rpx;
	border-radius: 18rpx;
	overflow: hidden;
}

.review-image {
	display: block;
	width: 150rpx;
	height: 150rpx;
	background: #f0f0f0;
}

.review-image-delete {
	position: absolute;
	right: 8rpx;
	top: 8rpx;
	width: 34rpx;
	height: 34rpx;
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.55);
	font-size: 28rpx;
	line-height: 30rpx;
	color: #ffffff;
	text-align: center;
}

.review-upload-btn {
	border: 1rpx dashed #d8d8d8;
	background: #fafafa;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.review-upload-plus {
	height: 48rpx;
	font-size: 52rpx;
	line-height: 44rpx;
	color: #b0b0b0;
}

.review-upload-text {
	margin-top: 8rpx;
	font-size: 22rpx;
	line-height: 30rpx;
	color: #999999;
}

.review-popup-footer {
	display: flex;
	justify-content: flex-end;
	gap: 20rpx;
	margin-top: 36rpx;
}

.review-cancel-btn,
.review-submit-btn {
	min-width: 160rpx;
	height: 64rpx;
	line-height: 64rpx;
	border-radius: 36rpx;
	box-sizing: border-box;
	font-size: 26rpx;
	text-align: center;
}

.review-cancel-btn {
	border: 1rpx solid #dddddd;
	color: #666666;
	background: #ffffff;
}

.review-submit-btn {
	background: #f37738;
	color: #ffffff;
}

.review-submit-btn.disabled-action {
	opacity: 0.65;
}

.empty-state,
.load-state {
	height: 80rpx;
	line-height: 80rpx;
	font-size: 24rpx;
	color: #999999;
	text-align: center;
}

.assign-popup-mask {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}

.assign-popup {
	width: 705rpx;
	padding: 53rpx 51rpx 44rpx;
	border-radius: 30rpx;
	background: #ffffff;
	box-sizing: border-box;
}

.extend-delivery-popup {
	padding-top: 44rpx;
	padding-bottom: 40rpx;
}

.assign-popup-title {
	display: block;
	line-height: 45rpx;
	font-size: 32rpx;
	color: #000000;
	text-align: center;
}

.assign-popup-avatar {
	display: block;
	width: 88rpx;
	height: 88rpx;
	margin: 78rpx auto 30rpx;
	border-radius: 50%;
	background: #d8d8d8;
}

.refund-order-amount {
	display: block;
	margin: 48rpx auto 24rpx;
	line-height: 40rpx;
	font-size: 28rpx;
	color: #333333;
	text-align: center;
}

.extend-delivery-current {
	display: block;
	margin: 24rpx auto 16rpx;
	line-height: 38rpx;
	font-size: 26rpx;
	color: #666666;
	text-align: center;
}

.assign-popup-input {
	width: 291rpx;
	height: 68rpx;
	margin: 0 auto;
	padding: 0 24rpx;
	border: 1rpx solid #979797;
	border-radius: 6rpx;
	box-sizing: border-box;
	line-height: 68rpx;
	font-size: 28rpx;
	color: #000000;
	text-align: center;
}

.assign-popup-input-placeholder {
	font-size: 28rpx;
	color: rgba(0, 0, 0, 0.2);
	text-align: center;
}

.extend-days-input {
	margin-top: 12rpx;
}

.extend-delivery-tip {
	display: block;
	margin: 16rpx auto 0;
	max-width: 560rpx;
	font-size: 24rpx;
	line-height: 34rpx;
	color: #999999;
	text-align: center;
	white-space: normal;
}

.assign-popup-actions {
	display: flex;
	justify-content: space-between;
	margin-top: 94rpx;
}

.extend-delivery-actions {
	margin-top: 34rpx;
}

.assign-popup-btn {
	width: 280rpx;
	height: 64rpx;
	line-height: 64rpx;
	border-radius: 36rpx;
	font-size: 28rpx;
	text-align: center;
	box-sizing: border-box;
}

.assign-popup-btn.cancel {
	border: 1rpx solid #979797;
	color: #979797;
	background: #ffffff;
}

.assign-popup-btn.confirm {
	color: #ffffff;
	background: #f37738;
}
</style>
