<template>
	<view class="task-page">
		<view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-row">
				<view class="nav-back" @click="goBack">‹</view>
				<text class="nav-title">发布任务</text>
				<view class="nav-placeholder"></view>
			</view>
		</view>

		<view class="page-canvas">
				<view class="form-card intro-card">
					<view class="field-block title-block">
						<text class="field-title">任务标题</text>
						<input
							class="plain-input title-input"
							v-model="form.title"
							maxlength="30"
							placeholder="最多输入30个字符(15个汉字）"
							placeholder-class="placeholder-text"
						/>
						<text class="field-count">{{ form.title.length }}/30</text>
					</view>

					<view class="field-block desc-block">
						<text class="field-title">需求描述</text>
						<textarea
							class="plain-textarea"
							v-model="form.description"
							maxlength="100"
							placeholder="最多输入100个字符(50个汉字）"
							placeholder-class="placeholder-text"
						></textarea>
						<text class="field-count desc-count">{{ form.description.length }}/100</text>
					</view>

					<view class="upload-list">
						<view class="upload-item" v-for="(item, index) in imageList" :key="item.url || index">
							<image class="upload-image" :src="item.preview" mode="aspectFill"></image>
							<text class="upload-delete" @click.stop="removeImage(index)">×</text>
						</view>
						<view class="upload-item upload-add" @click="chooseImages">
							<view class="plus-icon"></view>
						</view>
					</view>
				</view>

				<view class="form-card detail-card">
					<view class="budget-row line-field" @click="openCategoryPopup">
						<text class="line-label">类目</text>
						<view class="line-control">
							<text class="line-placeholder" v-if="selectedCategoryNames.length === 0">选择类目，确认商品信息</text>
							<text class="line-value" v-else>{{ selectedCategoryNames.join('、') }}</text>
							<image class="line-arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
						</view>
					</view>

					<view class="budget-row">
						<text class="budget-label">预算</text>
						<input
							class="budget-input"
							type="digit"
							v-model="form.budget"
							:disabled="form.allowQuote"
							placeholder="¥0.0"
							placeholder-class="budget-placeholder"
							@input="handleBudgetInput"
						/>
						<text class="quote-label" :class="{ disabled: hasBudgetInput }">对方报价</text>
						<switch class="small-switch" :checked="form.allowQuote" :disabled="hasBudgetInput" color="#f37738" @change="toggleQuote" />
					</view>

					<view class="budget-row line-field deadline-field" @click="openCalendar">
						<text class="line-label deadline-label">截稿日期</text>
						<view class="line-control">
							<text class="line-placeholder" v-if="!form.deadline">请选择</text>
							<text class="line-value" v-else>{{ deadlineText }}</text>
							<image class="line-arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
						</view>
					</view>

					<view class="guarantee-list">
						<view class="guarantee-row" v-for="item in guarantees" :key="item.id">
							<view class="guarantee-text">
								<view class="guarantee-name-row">
									<text class="guarantee-name">{{ item.guaranteeName }}</text>
									<text class="guarantee-info-icon" v-if="item.description" @click.stop="showGuaranteeDescription(item)">!</text>
								</view>
							</view>
							<switch
								class="small-switch"
								:checked="isGuaranteeSelected(item)"
								:disabled="item.isRequired == 1"
								color="#f37738"
								@change="toggleGuarantee(item, $event)"
							/>
						</view>
						<view class="empty-line" v-if="!guaranteeLoading && guarantees.length === 0">暂无服务保障配置</view>
					</view>
				</view>

				<view class="agreement-row" @click="toggleAgreement">
					<view class="agreement-check" :class="{ checked: form.agreementChecked }"></view>
					<text class="agreement-text">已阅读协议</text>
					<text class="agreement-link" @click.stop="openAgreementPopup">《云艺库协议》</text>
				</view>
			</view>

		<view class="bottom-actions">
			<template v-if="showInviteActionButtons">
				<button class="invite-submit-btn invite-secondary-btn" :disabled="submitting || draftSubmitting" @click="submitTask('invite')">
					{{ submitting && activeSubmitPublishType === 'invite' ? '约稿中...' : '立即约稿' }}
				</button>
				<button class="invite-submit-btn invite-primary-btn" :disabled="submitting || draftSubmitting" @click="submitTask('invite_square')">
					{{ submitting && activeSubmitPublishType === 'invite_square' ? '发布中...' : '约稿并发布' }}
				</button>
			</template>
			<button v-else class="submit-btn" :disabled="submitting || draftSubmitting" @click="submitTask()">{{ submitting ? submitLoadingText : submitButtonText }}</button>
		</view>

		<view class="popup-mask" v-if="showCategoryPopup" @click="closeCategoryPopup">
			<view class="category-popup" @click.stop>
				<view class="popup-handle"></view>
				<view class="popup-header">
					<text class="popup-close" @click="closeCategoryPopup">×</text>
					<text class="popup-title">选择类目</text>
					<text class="popup-confirm" @click="closeCategoryPopup">完成</text>
				</view>
				<scroll-view class="category-scroll" scroll-y>
					<view class="category-cascader" v-if="categoryTree.length > 0">
						<view class="category-parent-list">
							<view
								v-for="item in categoryTree"
								:key="item.id"
								class="category-parent-item"
								:class="{ active: activeCategoryParentId === item.id }"
								@click="selectCategoryParent(item)"
							>
								<text class="category-parent-name">{{ item.categoryName }}</text>
								<text class="category-parent-count" v-if="getSelectedChildCount(item) > 0">{{ getSelectedChildCount(item) }}</text>
							</view>
						</view>
						<view class="category-child-list">
							<view
								v-for="item in activeCategoryChildren"
								:key="item.id"
								class="category-child-item"
								:class="{ active: selectedCategoryIds.includes(String(item.id)) }"
								@click="toggleCategory(item)"
							>
								<text>{{ item.categoryName }}</text>
								<text class="category-check" v-if="selectedCategoryIds.includes(String(item.id))">✓</text>
							</view>
						</view>
					</view>
					<view class="empty-line popup-empty" v-if="!categoryLoading && categoryOptions.length === 0">暂无可选类目</view>
				</scroll-view>
			</view>
		</view>

		<view class="popup-mask agreement-popup-mask" v-if="showAgreementPopup" @click="closeAgreementPopup">
			<view class="agreement-popup" @click.stop>
				<view class="agreement-popup-header">
					<text class="agreement-popup-title">云艺库协议</text>
					<text class="agreement-popup-close" @click="closeAgreementPopup">×</text>
				</view>
				<scroll-view class="agreement-popup-body" scroll-y>
					<view class="agreement-content">
						<text class="agreement-paragraph">欢迎使用云艺库发布任务服务。发布任务前，请确认任务内容真实、合法、完整，不得包含违法违规、侵权、虚假交易或损害他人权益的信息。平台将根据任务信息为您匹配服务方，您需要按页面提示填写任务标题、需求描述、类目、截稿日期、预算及服务保障等必要信息。</text>
						<text class="agreement-paragraph">您应保证上传的图片、文字、附件等内容拥有合法使用权。因任务内容、交易沟通或交付验收产生的争议，应优先由双方协商处理；涉及平台规则的，平台可依据现有规则进行必要处理。</text>
						<text class="agreement-paragraph">任务发布后，平台会根据发布渠道向潜在服务方展示任务信息。请在提交前仔细核对任务标题、需求描述、封面、类目、预算、交付时间和服务保障等内容，避免因信息缺失影响后续撮合与交付。</text>
					</view>
				</scroll-view>
				<button class="agreement-popup-btn" @click="closeAgreementPopup">我知道了</button>
			</view>
		</view>

		<uni-calendar
			ref="deadlineCalendar"
			:insert="false"
			:date="form.deadline || todayDate"
			:start-date="todayDate"
			:clear-date="false"
			@confirm="handleDateConfirm"
		/>
	</view>
</template>

<script>
import env from '@/config/env.js';
import UniCalendar from '@/uni_modules/uni-calendar/components/uni-calendar/uni-calendar.vue';

export default {
	components: {
		UniCalendar
	},
	data() {
		return {
			statusBarHeight: 0,
			imageList: [],
			draftTaskId: '',
			publishType: 'square',
			inviteeWxUserId: '',
			source: '',
			sourceShowcaseId: '',
			form: {
				title: '',
				description: '',
				deadline: '',
				budget: '',
				allowQuote: false,
				agreementChecked: false
			},
			categoryTree: [],
			categoryOptions: [],
			selectedCategoryIds: [],
			activeCategoryParentId: '',
			guarantees: [],
			selectedGuaranteeIds: [],
			showCategoryPopup: false,
			showAgreementPopup: false,
			categoryLoading: false,
			guaranteeLoading: false,
			submitting: false,
			draftSubmitting: false,
			activeSubmitPublishType: '',
			checkingDraft: false,
			hasServerDraft: false,
			usingDraft: false,
			taskStatus: '',
			allowDirectBack: false
		};
	},
	computed: {
		todayDate() {
			return this.formatDateHyphen(new Date());
		},
		deadlineText() {
			return this.form.deadline ? this.form.deadline.replace(/-/g, '/') : '';
		},
		submitButtonText() {
			return this.isEditMode ? '保存修改' : '立即发布';
		},
		submitLoadingText() {
			return this.isEditMode ? '保存中...' : '发布中...';
		},
		isInvitePublishMode() {
			return this.publishType.indexOf('invite') > -1 && !!this.inviteeWxUserId;
		},
		isShowcaseInviteMode() {
			return this.source === 'showcase' && this.isInvitePublishMode;
		},
		hasBudgetInput() {
			return !!String(this.form.budget || '').trim();
		},
		showInviteActionButtons() {
			return this.isInvitePublishMode && !this.isEditMode;
		},
		isDraftPublishMode() {
			return this.usingDraft || this.taskStatus === 'draft';
		},
		isEditMode() {
			return !!this.draftTaskId && !this.isDraftPublishMode;
		},
		selectedCategoryNames() {
			return this.categoryOptions
				.filter(item => this.selectedCategoryIds.includes(String(item.id)))
				.map(item => item.categoryName);
		},
		activeCategoryChildren() {
			const parent = this.categoryTree.find(item => item.id === this.activeCategoryParentId) || this.categoryTree[0];
			if (!parent) {
				return [];
			}
			const children = parent.children || [];
			return children.length > 0 ? children : [parent];
		}
	},
	async onLoad(options) {
		const systemInfo = uni.getSystemInfoSync();
		this.statusBarHeight = systemInfo.statusBarHeight || 0;
		this.publishType = this.normalizePublishType(options && options.publishType);
		this.inviteeWxUserId = options && options.inviteeWxUserId ? String(options.inviteeWxUserId) : '';
		this.source = options && options.source ? String(options.source) : '';
		this.sourceShowcaseId = options && options.showcaseId ? String(options.showcaseId) : '';
		this.draftTaskId = options && options.taskId ? String(options.taskId) : '';
		if (!this.ensureLoggedIn()) {
			return;
		}
		await Promise.all([this.loadCategoryOptions(), this.loadGuarantees()]);
		await this.initDraftData();
		this.enforceBudgetQuoteMode();
	},
	onBackPress() {
		if (this.allowDirectBack) {
			this.allowDirectBack = false;
			return false;
		}
		if (this.submitting || this.draftSubmitting) {
			return true;
		}
		this.handleLeave(() => {
			this.performBackNavigation();
		});
		return true;
	},
	methods: {
		hasLoginToken() {
			return !!uni.getStorageSync('token');
		},
		ensureLoggedIn() {
			if (this.hasLoginToken()) {
				return true;
			}
			uni.setStorageSync('login_redirect', this.buildTaskPageRedirectUrl());
			uni.showModal({
				title: '提示',
				content: '登录后可发布任务',
				confirmText: '去登录',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/subpkg-others/pages/login/index'
						});
					}
				}
			});
			return false;
		},
		goBack() {
			if (this.submitting || this.draftSubmitting) {
				return;
			}
			this.handleLeave(() => {
				this.performBackNavigation();
			});
		},
		performBackNavigation() {
			this.allowDirectBack = true;
			const pages = getCurrentPages();
			if (pages.length > 1) {
				uni.navigateBack();
				return;
			}
			uni.switchTab({
				url: '/pages/publish/index'
			});
		},
		handleLeave(onLeave) {
			if (!this.shouldPromptSaveDraft()) {
				onLeave();
				return;
			}
			uni.showModal({
				title: '提示',
				content: '是否将此任务保存为草稿？',
				confirmText: '保存',
				cancelText: '不保存',
				success: async (res) => {
					if (res.confirm) {
						const saved = await this.saveDraftBeforeLeave();
						if (saved) {
							onLeave();
						}
						return;
					}
					onLeave();
				}
			});
		},
		shouldPromptSaveDraft() {
			return !!this.form.description.trim();
		},
		normalizePublishType(type) {
			const value = type ? String(type).trim() : '';
			if (value === 'invite' || value === 'square' || value === 'invite_square') {
				return value;
			}
			return 'square';
		},
		buildTaskPageRedirectUrl() {
			const params = [];
			if (this.publishType) {
				params.push(`publishType=${encodeURIComponent(this.publishType)}`);
			}
			if (this.inviteeWxUserId) {
				params.push(`inviteeWxUserId=${encodeURIComponent(this.inviteeWxUserId)}`);
			}
			if (this.source) {
				params.push(`source=${encodeURIComponent(this.source)}`);
			}
			if (this.sourceShowcaseId) {
				params.push(`showcaseId=${encodeURIComponent(this.sourceShowcaseId)}`);
			}
			if (this.draftTaskId) {
				params.push(`taskId=${encodeURIComponent(this.draftTaskId)}`);
			}
			return `/subpkg-task/pages/index${params.length ? '?' + params.join('&') : ''}`;
		},
		resolveUrl(url) {
			if (!url) return '';
			if (/^(http|https|wxfile|data|blob):/.test(url)) {
				return url;
			}
			return env.aliyunUrl + url;
		},
		formatDateHyphen(date) {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		},
		formatDateTime(dateText) {
			return dateText ? `${dateText} 23:59:59` : '';
		},
		normalizeHasDraftData(data) {
			if (typeof data === 'boolean') {
				return {
					hasDraft: data,
					taskId: ''
				};
			}
			if (!data || typeof data !== 'object') {
				return {
					hasDraft: false,
					taskId: ''
				};
			}
			return {
				hasDraft: data.hasDraft === true,
				taskId: data.taskId ? String(data.taskId) : ''
			};
		},
		async initDraftData() {
			if (this.draftTaskId) {
				this.hasServerDraft = true;
				await this.loadTaskEcho(this.draftTaskId);
				return;
			}
			await this.checkHasDraft();
		},
		async checkHasDraft() {
			if (this.checkingDraft) {
				return;
			}
			this.checkingDraft = true;
			try {
				const res = await this.$request.get('/wechat/userTask/hasDraft');
				const draftData = this.normalizeHasDraftData(res && res.data);
				this.hasServerDraft = draftData.hasDraft;
				if (draftData.hasDraft && draftData.taskId) {
					const shouldUseDraft = await this.confirmUseDraft();
					if (shouldUseDraft) {
						this.usingDraft = true;
						this.draftTaskId = draftData.taskId;
						await this.loadTaskEcho(this.draftTaskId);
					}
				}
			} catch (e) {
				this.hasServerDraft = false;
			} finally {
				this.checkingDraft = false;
			}
		},
		confirmUseDraft() {
			return new Promise((resolve) => {
				uni.showModal({
					title: '提示',
					content: '您有一个草稿，是否使用草稿？',
					confirmText: '使用草稿',
					cancelText: '暂不使用',
					success: (res) => {
						resolve(!!(res && res.confirm));
					},
					fail: () => {
						resolve(false);
					}
				});
			});
		},
		async loadTaskEcho(taskId) {
			if (!taskId) {
				return;
			}
			try {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				const res = await this.$request.get(`/wechat/userTask/edit/${taskId}`);
				this.applyTaskEcho(res && res.data);
			} catch (e) {
				uni.showToast({
					title: (e && e.msg) || '草稿加载失败',
					icon: 'none'
				});
			} finally {
				uni.hideLoading();
			}
		},
		applyTaskEcho(data) {
			if (!data || typeof data !== 'object') {
				return;
			}
			this.draftTaskId = data.taskId ? String(data.taskId) : this.draftTaskId;
			this.taskStatus = data.taskStatus || '';
			this.usingDraft = this.usingDraft || this.taskStatus === 'draft';
			this.form.title = data.taskTitle || '';
			this.form.description = data.taskDesc || '';
			this.form.budget = data.budgetAmount !== undefined && data.budgetAmount !== null ? String(data.budgetAmount) : '';
			this.form.allowQuote = Number(data.isOtherPartyQuote) === 1;
			this.enforceBudgetQuoteMode();
			this.form.deadline = data.deliveryDate ? String(data.deliveryDate).slice(0, 10) : '';
			this.imageList = (data.coverList || [])
				.map(item => item && item.imageKey ? {
					url: item.imageKey,
					preview: this.resolveUrl(item.imageKey)
				} : null)
				.filter(Boolean);
			this.selectedCategoryIds = (data.professionList || [])
				.map(item => item && item.professionCategoryId ? String(item.professionCategoryId) : '')
				.filter(Boolean);
			this.selectedGuaranteeIds = this.getEchoGuaranteeIds(data.guaranteeList || []);
		},
		getEchoGuaranteeIds(list) {
			const selectedMap = {};
			(list || []).forEach(item => {
				if (item && item.guaranteeId) {
					selectedMap[String(item.guaranteeId)] = true;
				}
			});
			this.guarantees.forEach(item => {
				if (item.defaultEnabled == 1 || item.isRequired == 1) {
					selectedMap[String(item.id)] = true;
				}
			});
			return Object.keys(selectedMap);
		},
		async loadCategoryOptions() {
			this.categoryLoading = true;
			try {
				const res = await this.$request.get('/wechat/professionCategory/list', {
					status: 1
				});
				this.categoryTree = this.normalizeCategories(res.data || []);
				this.categoryOptions = this.flattenCategories(this.categoryTree);
				this.activeCategoryParentId = this.categoryTree.length > 0 ? this.categoryTree[0].id : '';
			} catch (e) {
				this.categoryTree = [];
				this.categoryOptions = [];
				this.activeCategoryParentId = '';
			} finally {
				this.categoryLoading = false;
			}
		},
		normalizeCategories(list) {
			return (list || []).map(item => ({
				id: item.id,
				categoryName: item.categoryName || item.name || '',
				categoryCode: item.categoryCode || '',
				level: item.level,
				children: this.normalizeCategories(item.children || [])
			}));
		},
		flattenCategories(list) {
			const result = [];
			const walk = (items) => {
				(items || []).forEach(item => {
					result.push({
						id: item.id,
						categoryName: item.categoryName,
						categoryCode: item.categoryCode,
						level: item.level
					});
					if (item.children && item.children.length) {
						walk(item.children);
					}
				});
			};
			walk(list);
			return result;
		},
		async loadGuarantees() {
			this.guaranteeLoading = true;
			try {
				const res = await this.$request.get('/wechat/serviceGuarantee/list', {
					guaranteeType: 'task'
				});
				this.guarantees = res.data || [];
				this.selectedGuaranteeIds = this.guarantees
					.filter(item => item.defaultEnabled == 1 || item.isRequired == 1)
					.map(item => String(item.id));
			} catch (e) {
				this.guarantees = [];
				this.selectedGuaranteeIds = [];
			} finally {
				this.guaranteeLoading = false;
			}
		},
		chooseImages() {
			if (!this.ensureLoggedIn()) {
				return;
			}
			uni.chooseMedia({
				count: 9,
				mediaType: ['image'],
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async (res) => {
					const files = (res.tempFiles || []).filter(file => file && file.tempFilePath);
					if (files.length === 0) {
						return;
					}
					await this.uploadImages(files.map(file => file.tempFilePath));
				}
			});
		},
		async uploadImages(filePaths) {
			uni.showLoading({
				title: '上传中...',
				mask: true
			});
			try {
				const uploadedItems = [];
				for (const filePath of filePaths) {
					const uploadPath = await this.uploadImage(filePath);
					if (uploadPath) {
						uploadedItems.push({
							url: uploadPath,
							preview: filePath
						});
					}
				}
				if (uploadedItems.length === 0) {
					uni.showToast({
						title: '图片上传失败',
						icon: 'none'
					});
					return;
				}
				this.imageList = this.imageList.concat(uploadedItems);
				uni.showToast({
					title: '图片上传成功',
					icon: 'none'
				});
			} finally {
				uni.hideLoading();
			}
		},
		uploadImage(filePath) {
			return new Promise((resolve) => {
				uni.uploadFile({
					url: env.baseUrl + '/wechat/basic/upload?isVerify=false&isTeam=false',
					filePath,
					name: 'file',
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						resolve(this.parseUploadResponse(res.data));
					},
					fail: () => {
						resolve('');
					}
				});
			});
		},
		parseUploadResponse(rawData) {
			if (!rawData) return '';
			try {
				const res = JSON.parse(rawData);
				return this.normalizeUploadPath(res.msg);
			} catch (e) {
				return '';
			}
		},
		normalizeUploadPath(value) {
			if (!value) {
				return '';
			}
			if (typeof value === 'string') {
				const text = value.trim();
				return text && text !== '操作成功' ? text : '';
			}
			if (typeof value === 'object') {
				return this.normalizeUploadPath(value.url || value.fileUrl || value.ossKey || value.path || value.key);
			}
			return '';
		},
		removeImage(index) {
			this.imageList.splice(index, 1);
		},
		openCategoryPopup() {
			if (!this.ensureLoggedIn()) {
				return;
			}
			this.showCategoryPopup = true;
		},
		closeCategoryPopup() {
			this.showCategoryPopup = false;
		},
		selectCategoryParent(item) {
			this.activeCategoryParentId = item.id;
		},
		getSelectedChildCount(item) {
			const children = item.children && item.children.length ? this.flattenCategories(item.children) : [item];
			return children.filter(child => this.selectedCategoryIds.includes(String(child.id))).length;
		},
		toggleCategory(item) {
			const categoryId = String(item.id);
			const index = this.selectedCategoryIds.indexOf(categoryId);
			if (index > -1) {
				this.selectedCategoryIds.splice(index, 1);
				return;
			}
			this.selectedCategoryIds.push(categoryId);
		},
		openCalendar() {
			if (this.$refs.deadlineCalendar && this.$refs.deadlineCalendar.open) {
				this.$refs.deadlineCalendar.open();
			}
		},
		handleDateConfirm(e) {
			const fullDate = e && (e.fulldate || e.fullDate);
			if (!fullDate) {
				return;
			}
			this.form.deadline = fullDate;
		},
		handleBudgetInput(e) {
			const value = e && e.detail ? e.detail.value : this.form.budget;
			if (String(value || '').trim()) {
				this.form.allowQuote = false;
			}
		},
		toggleQuote(e) {
			const checked = e.detail.value;
			if (checked && this.hasBudgetInput) {
				this.form.allowQuote = false;
				uni.showToast({
					title: '已填写预算，不能选择对方报价',
					icon: 'none'
				});
				return;
			}
			this.form.allowQuote = checked;
			if (checked) {
				this.form.budget = '';
			}
		},
		enforceBudgetQuoteMode() {
			if (this.form.allowQuote && this.hasBudgetInput) {
				this.form.budget = '';
			}
		},
		isGuaranteeSelected(item) {
			return this.selectedGuaranteeIds.includes(String(item.id));
		},
		toggleGuarantee(item, e) {
			if (item.isRequired == 1) {
				return;
			}
			const checked = e.detail.value;
			const guaranteeId = String(item.id);
			const index = this.selectedGuaranteeIds.indexOf(guaranteeId);
			if (checked && index === -1) {
				this.selectedGuaranteeIds.push(guaranteeId);
			}
			if (!checked && index > -1) {
				this.selectedGuaranteeIds.splice(index, 1);
			}
		},
		showGuaranteeDescription(item) {
			if (!item.description) {
				return;
			}
			uni.showModal({
				title: item.guaranteeName || '服务保障',
				content: item.description,
				showCancel: false,
				confirmText: '知道了'
			});
		},
		toggleAgreement() {
			this.form.agreementChecked = !this.form.agreementChecked;
		},
		openAgreementPopup() {
			this.showAgreementPopup = true;
		},
		closeAgreementPopup() {
			this.showAgreementPopup = false;
		},
		validateForm() {
			if (!this.form.title.trim()) {
				uni.showToast({
					title: '请输入任务标题',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.description.trim()) {
				uni.showToast({
					title: '请输入需求描述',
					icon: 'none'
				});
				return false;
			}
			if (this.selectedCategoryIds.length === 0) {
				uni.showToast({
					title: '请选择类目',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.deadline) {
				uni.showToast({
					title: '请选择截稿日期',
					icon: 'none'
				});
				return false;
			}
			if (this.publishType.indexOf('invite') > -1 && !this.inviteeWxUserId) {
				uni.showToast({
					title: '缺少被约稿用户',
					icon: 'none'
				});
				return false;
			}
			if (this.hasBudgetInput && this.form.allowQuote) {
				uni.showToast({
					title: '预算和对方报价不能同时选择',
					icon: 'none'
				});
				return false;
			}
			if (this.form.budget) {
				const budget = Number(String(this.form.budget).trim());
				if (!Number.isFinite(budget) || budget <= 0) {
					uni.showToast({
						title: '请输入有效预算',
						icon: 'none'
					});
					return false;
				}
			}
			if (!this.form.agreementChecked) {
				uni.showToast({
					title: '请先阅读并同意协议',
					icon: 'none'
				});
				return false;
			}
			return true;
		},
		buildDraftPayload() {
			const payload = {
				taskTitle: this.form.title.trim(),
				taskDesc: this.form.description.trim(),
				isOtherPartyQuote: this.form.allowQuote ? 1 : 0
			};
			if (this.form.budget) {
				payload.budgetAmount = Number(String(this.form.budget).trim());
			}
			if (this.form.deadline) {
				payload.deliveryDate = this.formatDateTime(this.form.deadline);
			}
			return payload;
		},
		buildGuaranteePayload() {
			return this.guarantees
				.filter(item => this.isGuaranteeSelected(item))
				.map((item, index) => ({
					guaranteeId: Number(item.id),
					guaranteeCode: item.guaranteeCode || '',
					guaranteeValue: item.guaranteeValue || '',
					guaranteeUnit: item.guaranteeUnit || item.valueUnit || '',
					sortOrder: index
				}));
		},
		buildUpdatePayload() {
			const payload = {
				taskId: Number(this.draftTaskId),
				taskTitle: this.form.title.trim(),
				taskDesc: this.form.description.trim(),
				coverList: this.imageList.map(item => item.url).filter(Boolean),
				professionCategoryIds: this.selectedCategoryIds.map(id => Number(id)).filter(id => Number.isFinite(id)),
				isOtherPartyQuote: this.form.allowQuote ? 1 : 0,
				guaranteeList: this.buildGuaranteePayload()
			};
			if (this.form.budget) {
				payload.budgetAmount = Number(String(this.form.budget).trim());
			}
			if (this.form.deadline) {
				payload.deliveryDate = this.formatDateTime(this.form.deadline);
			}
			return payload;
		},
		buildPublishPayload() {
			const payload = {
				taskTitle: this.form.title.trim(),
				taskDesc: this.form.description.trim(),
				coverList: this.imageList.map(item => item.url).filter(Boolean),
				professionCategoryIds: this.selectedCategoryIds.map(id => Number(id)).filter(id => Number.isFinite(id)),
				isOtherPartyQuote: this.form.allowQuote ? 1 : 0,
				guaranteeList: this.buildGuaranteePayload(),
				publishType: this.publishType
			};
			if (this.isDraftPublishMode && this.draftTaskId) {
				payload.taskId = Number(this.draftTaskId);
			}
			if (this.form.budget) {
				payload.budgetAmount = Number(String(this.form.budget).trim());
			}
			if (this.form.deadline) {
				payload.deliveryDate = this.formatDateTime(this.form.deadline);
			}
			if (payload.publishType.indexOf('invite') > -1 && this.inviteeWxUserId) {
				payload.inviteeWxUserId = Number(this.inviteeWxUserId);
			}
			return payload;
		},
		async saveDraftBeforeLeave() {
			if (this.draftSubmitting) {
				return false;
			}
			this.draftSubmitting = true;
			uni.showLoading({
				title: '保存中...',
				mask: true
			});
			try {
				if (this.draftTaskId) {
					await this.$request.put('/wechat/userTask/update', this.buildUpdatePayload());
					this.hasServerDraft = true;
				} else {
					const res = await this.$request.post('/wechat/userTask/draft', this.buildDraftPayload());
					const draftData = this.normalizeHasDraftData(res && res.data);
					this.draftTaskId = draftData.taskId || this.draftTaskId;
					this.hasServerDraft = draftData.hasDraft;
					this.taskStatus = this.hasServerDraft ? 'draft' : this.taskStatus;
				}
				uni.hideLoading();
				uni.showToast({
					title: '草稿保存成功',
					icon: 'success',
					duration: 1200
				});
				return true;
			} catch (e) {
				uni.hideLoading();
				uni.showToast({
					title: (e && e.msg) || '草稿保存失败',
					icon: 'none'
				});
				return false;
			} finally {
				this.draftSubmitting = false;
			}
		},
		async submitTask(targetPublishType) {
			if (this.submitting) {
				return;
			}
			if (!this.ensureLoggedIn()) {
				return;
			}
			const previousPublishType = this.publishType;
			if (targetPublishType) {
				this.publishType = this.normalizePublishType(targetPublishType);
				this.activeSubmitPublishType = this.publishType;
			}
			if (!this.validateForm()) {
				this.publishType = previousPublishType;
				this.activeSubmitPublishType = '';
				return;
			}
			this.submitting = true;
			uni.showLoading({
				title: this.activeSubmitPublishType === 'invite' ? '约稿中...' : this.submitLoadingText,
				mask: true
			});
			try {
				if (this.isEditMode) {
					await this.$request.put('/wechat/userTask/update', this.buildUpdatePayload());
				} else {
					const res = await this.$request.post('/wechat/userTask/publish', this.buildPublishPayload());
					const publishResult = this.normalizePublishResult(res && res.data);
					if (publishResult.needPay) {
						uni.hideLoading();
						await this.requestPublishPayment(publishResult.payParams);
					}
				}
				this.handleSubmitSuccess();
			} catch (e) {
				uni.hideLoading();
				this.submitting = false;
				this.publishType = previousPublishType;
				this.activeSubmitPublishType = '';
				uni.showToast({
					title: (e && e.msg) || (e && e.errMsg && e.errMsg.indexOf('cancel') > -1 ? '支付已取消' : '发布失败'),
					icon: 'none'
				});
			}
		},
		normalizePublishResult(data) {
			if (typeof data === 'number' || typeof data === 'string') {
				return {
					taskId: data,
					needPay: false,
					payParams: null
				};
			}
			const result = data && typeof data === 'object' ? data : {};
			return {
				taskId: result.taskId || '',
				needPay: result.needPay === true,
				orderId: result.orderId || '',
				orderNo: result.orderNo || '',
				paid: result.paid === true,
				payParams: result.payParams || null
			};
		},
		parsePaymentParams(payParams) {
			if (!payParams) {
				return null;
			}
			if (typeof payParams === 'string') {
				try {
					return JSON.parse(payParams);
				} catch (e) {
					return null;
				}
			}
			if (typeof payParams === 'object') {
				return payParams;
			}
			return null;
		},
		requestPublishPayment(payParams) {
			const params = this.parsePaymentParams(payParams);
			if (!params || !params.timeStamp || !params.nonceStr || !params.package || !params.signType || !params.paySign) {
				return Promise.reject({
					msg: '支付参数异常'
				});
			}
			return new Promise((resolve, reject) => {
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: String(params.timeStamp),
					nonceStr: params.nonceStr,
					package: params.package,
					signType: params.signType,
					paySign: params.paySign,
					success: resolve,
					fail: reject
				});
			});
		},
		handleSubmitSuccess() {
			this.allowDirectBack = true;
			uni.hideLoading();
			uni.showToast({
				title: this.isEditMode ? '修改成功' : '发布成功',
				icon: 'success',
				duration: 1500
			});
			this.markShowcaseInviteSent();
			setTimeout(() => {
				this.submitting = false;
				this.activeSubmitPublishType = '';
				this.performBackNavigation();
			}, 1500);
		},
		markShowcaseInviteSent() {
			if (!this.isShowcaseInviteMode || this.isEditMode) {
				return;
			}
			uni.setStorageSync('showcase_invite_sent_result', {
				showcaseId: this.sourceShowcaseId,
				time: Date.now()
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.task-page {
	min-height: 100vh;
	background: #f7f7f7;
	color: #000000;
}

.custom-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 20;
	background: #ffffff;
}

.nav-row {
	height: 140rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 24rpx;
	box-sizing: border-box;
}

.nav-back,
.nav-placeholder {
	width: 88rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 58rpx;
	line-height: 58rpx;
	color: #000000;
}

.nav-title {
	font-size: 40rpx;
	line-height: 56rpx;
	color: #000000;
}

.page-canvas {
	min-height: 1914rpx;
	padding: 196rpx 30rpx 150rpx;
	box-sizing: border-box;
	background: #f7f7f7;
}

.form-card {
	width: 690rpx;
	background: #ffffff;
	border-radius: 16rpx;
	box-sizing: border-box;
}

.intro-card {
	min-height: 750rpx;
	padding: 34rpx 28rpx 30rpx;
}

.field-block {
	position: relative;
}

.title-block {
	height: 181rpx;
}

.desc-block {
	height: 314rpx;
	margin-top: 18rpx;
}

.field-title {
	display: block;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.plain-input {
	width: 100%;
	height: 86rpx;
	margin-top: 18rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #222222;
	border-bottom: 1rpx solid #eeeeee;
}

.plain-textarea {
	width: 100%;
	height: 220rpx;
	margin-top: 18rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #222222;
	border-bottom: 1rpx solid #eeeeee;
	box-sizing: border-box;
}

.placeholder-text {
	color: #D4D4D4;
	font-size: 28rpx;
}

.field-count {
	position: absolute;
	right: 2rpx;
	bottom: 0;
	font-size: 22rpx;
	line-height: 31rpx;
	color: #999999;
}

.desc-count {
	bottom: 0;
}

.upload-list {
	display: flex;
	flex-wrap: wrap;
	gap: 18rpx;
	margin-top: 5rpx;
}

.upload-item {
	position: relative;
	width: 168rpx;
	height: 168rpx;
	border: 1rpx dashed #979797;
	border-radius: 8rpx;
	background: #f5f5f5;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.upload-image {
	width: 100%;
	height: 100%;
	display: block;
}

.upload-delete {
	position: absolute;
	top: 0;
	right: 0;
	width: 38rpx;
	height: 38rpx;
	border-radius: 0 8rpx 0 18rpx;
	background: rgba(0, 0, 0, 0.55);
	color: #ffffff;
	font-size: 30rpx;
	line-height: 34rpx;
	text-align: center;
	z-index: 2;
}

.plus-icon {
	position: relative;
	width: 36rpx;
	height: 36rpx;
}

.plus-icon::before,
.plus-icon::after {
	content: '';
	position: absolute;
	left: 0;
	top: 16rpx;
	width: 36rpx;
	height: 4rpx;
	border-radius: 4rpx;
	background: #979797;
}

.plus-icon::after {
	transform: rotate(90deg);
}

.detail-card {
	width: 690rpx;
	margin-top: 20rpx;
	padding: 30rpx 28rpx 28rpx;
	background: #ffffff;
	border-radius: 16rpx;
}

.line-field {
	height: 98rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.deadline-field {
	margin-bottom: 39rpx;
}

.line-label {
	width: 140rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #000000;
}

.deadline-label {
	width: 140rpx;
}

.line-control {
	flex: 1;
	min-width: 0;
	min-height: 68rpx;
	border: 1rpx solid #979797;
	border-radius: 6rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 24rpx 0 30rpx;
	box-sizing: border-box;
}

.line-placeholder,
.line-value {
	flex: 1;
	min-width: 0;
	display: block;
	font-size: 28rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.line-placeholder {
	color: #D4D4D4;
}

.line-value {
	color: #333333;
}

.line-arrow {
	flex-shrink: 0;
	width: 18rpx;
	height: 12rpx;
	margin-left: 16rpx;
	display: block;
}

.budget-row {
	min-height: 98rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1rpx solid #eeeeee;
}

.budget-label {
	width: 140rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #000000;
}

.budget-input {
	flex: 1;
	height: 68rpx;
	border: 1rpx solid #979797;
	border-radius: 6rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #333333;
}

.budget-placeholder {
	color: #D4D4D4;
}

.quote-label {
	margin-left: 24rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #000000;
}

.quote-label.disabled {
	color: rgba(0, 0, 0, 0.35);
}

.small-switch {
	transform: scale(0.8);
	transform-origin: right center;
}

.guarantee-list {
	padding-top: 24rpx;
}

.guarantee-row {
	min-height: 72rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12rpx 0;
}

.guarantee-text {
	display: flex;
	flex-direction: column;
	min-width: 0;
	padding-right: 24rpx;
}

.guarantee-name-row {
	display: flex;
	align-items: center;
	min-width: 0;
}

.guarantee-name {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #999999;
	max-width: 480rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.guarantee-info-icon {
	width: 28rpx;
	height: 28rpx;
	margin-left: 10rpx;
	border-radius: 50%;
	background: #f0f0f0;
	color: #b0b0b0;
	font-size: 20rpx;
	line-height: 28rpx;
	text-align: center;
	font-weight: 600;
	flex-shrink: 0;
}

.empty-line {
	padding: 34rpx 0;
	font-size: 26rpx;
	line-height: 36rpx;
	color: #999999;
	text-align: center;
}

.agreement-row {
	height: 54rpx;
	margin-top: 29rpx;
	display: flex;
	align-items: center;
}

.agreement-check {
	width: 24rpx;
	height: 24rpx;
	margin-left: 10rpx;
	border-radius: 50%;
	border: 2rpx solid #979797;
	box-sizing: border-box;
	background: #ffffff;
}

.agreement-check.checked {
	border-color: #f37738;
	background: #f37738;
	box-shadow: inset 0 0 0 5rpx #ffffff;
}

.agreement-text,
.agreement-link {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #000000;
}

.agreement-text {
	margin-left: 14rpx;
}

.agreement-link {
	color: #f37738;
}

.bottom-actions {
	position: fixed;
	left: 0;
	right: 0;
	bottom: -11rpx;
	// height: 98rpx;
	padding: 16rpx 30rpx env(safe-area-inset-bottom);
	box-sizing: content-box;
	background: #ffffff;
	box-shadow: 0 -1rpx 0 #dddddd;
	z-index: 18;
	display: flex;
	justify-content: flex-end;
}

.submit-btn {
	width: 240rpx;
	height: 64rpx;
	margin: 0;
	padding: 0;
	border: none;
	border-radius: 36rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 30rpx;
	line-height: 64rpx;
	text-align: center;
}

.submit-btn::after {
	border: none;
}

.invite-submit-btn {
	width: 240rpx;
	height: 64rpx;
	margin: 0;
	padding: 0;
	border-radius: 36rpx;
	font-size: 28rpx;
	line-height: 64rpx;
	text-align: center;
	box-sizing: border-box;
}

.invite-submit-btn + .invite-submit-btn {
	margin-left: 20rpx;
}

.invite-submit-btn::after {
	border: none;
}

.invite-secondary-btn {
	border: 2rpx solid #f37738;
	background: #ffffff;
	color: #f37738;
}

.invite-primary-btn {
	border: 2rpx solid #f37738;
	background: #f37738;
	color: #ffffff;
}

.popup-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 50;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: flex-end;
}

.category-popup {
	width: 750rpx;
	height: 760rpx;
	border-radius: 28rpx 28rpx 0 0;
	background: #ffffff;
	overflow: hidden;
}

.popup-handle {
	width: 72rpx;
	height: 8rpx;
	margin: 18rpx auto 10rpx;
	border-radius: 8rpx;
	background: #d9d9d9;
}

.popup-header {
	height: 88rpx;
	padding: 0 34rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	border-bottom: 1rpx solid #eeeeee;
}

.popup-close,
.popup-confirm {
	width: 100rpx;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #999999;
}

.popup-confirm {
	text-align: right;
	color: #f37738;
}

.popup-title {
	font-size: 32rpx;
	line-height: 44rpx;
	color: #000000;
}

.category-scroll {
	height: 636rpx;
}

.category-cascader {
	display: flex;
	min-height: 636rpx;
}

.category-parent-list {
	width: 260rpx;
	background: #f7f7f7;
}

.category-parent-item {
	position: relative;
	min-height: 92rpx;
	padding: 0 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #333333;
}

.category-parent-item.active {
	background: #ffffff;
	color: #f37738;
}

.category-parent-count {
	min-width: 34rpx;
	height: 34rpx;
	padding: 0 10rpx;
	border-radius: 18rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 22rpx;
	line-height: 34rpx;
	text-align: center;
	box-sizing: border-box;
}

.category-child-list {
	flex: 1;
	padding: 12rpx 28rpx;
	box-sizing: border-box;
}

.category-child-item {
	min-height: 84rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1rpx solid #f0f0f0;
	font-size: 28rpx;
	color: #333333;
}

.category-child-item.active {
	color: #f37738;
}

.category-check {
	font-size: 30rpx;
	color: #f37738;
}

.popup-empty {
	padding-top: 180rpx;
}

.agreement-popup-mask {
	align-items: center;
	justify-content: center;
	padding: 0 54rpx;
	box-sizing: border-box;
}

.agreement-popup {
	width: 642rpx;
	max-height: 920rpx;
	border-radius: 20rpx;
	background: #ffffff;
	overflow: hidden;
}

.agreement-popup-header {
	position: relative;
	height: 104rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1rpx solid #eeeeee;
}

.agreement-popup-title {
	font-size: 32rpx;
	line-height: 44rpx;
	color: #000000;
}

.agreement-popup-close {
	position: absolute;
	right: 30rpx;
	top: 0;
	width: 64rpx;
	height: 104rpx;
	font-size: 42rpx;
	line-height: 96rpx;
	color: #999999;
	text-align: center;
}

.agreement-popup-body {
	max-height: 620rpx;
	padding: 30rpx 34rpx 0;
	box-sizing: border-box;
}

.agreement-content {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

.agreement-paragraph {
	display: block;
	font-size: 28rpx;
	line-height: 44rpx;
	color: #333333;
}

.agreement-popup-btn {
	width: 560rpx;
	height: 72rpx;
	margin: 32rpx auto 34rpx;
	padding: 0;
	border: none;
	border-radius: 36rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 30rpx;
	line-height: 72rpx;
	text-align: center;
}

.agreement-popup-btn::after {
	border: none;
}
</style>
