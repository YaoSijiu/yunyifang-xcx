<template>
	<view class="showcase-page">
		<view class="page-canvas">
				<view class="form-card">
					<view class="field-block">
						<text class="field-title">上传封面</text>
						<view class="cover-list">
							<view class="cover-uploader" v-for="(item, index) in coverList" :key="item.url || index">
								<image class="cover-image" :src="item.preview" mode="aspectFill"></image>
								<text class="cover-delete" @click.stop="removeCover(index)">×</text>
							</view>
							<view class="cover-uploader" @click="chooseCover">
								<text class="cover-plus">+</text>
							</view>
						</view>
					</view>

					<view class="field-block">
						<view class="field-header">
							<text class="field-title">橱窗标题</text>
						</view>
						<input class="plain-input" v-model="form.title" maxlength="30" placeholder="最多输入30个字符(15个汉字）" placeholder-class="placeholder-text" />
						<view class="field-header">
							<text class="field-count">{{ form.title.length }}/30</text>
						</view>
					</view>

					<view class="field-block.no-margin">
						<view class="field-header">
							<text class="field-title">商品描述</text>
						</view>
						<textarea class="plain-textarea" v-model="form.description" maxlength="100" placeholder="最多输入100个字符(50个汉字）" placeholder-class="placeholder-text"></textarea>
						<view class="field-header">
							<text class="field-count">{{ form.description.length }}/100</text>
						</view>
					</view>

					<!-- <view class="field-block no-margin">
						<view class="field-header">
							<text class="field-title">需求描述</text>
							<text class="field-count">{{ form.requirement.length }}/100</text>
						</view>
						<textarea class="plain-textarea large" v-model="form.requirement" maxlength="100" placeholder="最多输入100个字" placeholder-class="placeholder-text"></textarea>
					</view> -->
				</view>

				<view class="form-card service-card">
					<view class="line-field" @click="openSkillPopup">
						<text class="line-label">技能标签</text>
						<view class="line-control">
							<text class="line-placeholder" v-if="selectedSkillNames.length === 0">选择标签</text>
							<text class="line-value" v-else>{{ selectedSkillNames.join('、') }}</text>
							<image class="line-arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
						</view>
					</view>

					<picker :range="unitOptions" @change="handleUnitChange">
						<view class="line-field">
							<text class="line-label">单价</text>
							<view class="line-control">
								<text class="line-placeholder" v-if="form.unit.length === 0">单价</text>
								<text class="line-value" v-else>{{ form.unit }}</text>
								<image class="line-arrow" src="/static/icon/xiangxia.svg" mode="aspectFit"></image>
							</view>
						</view>
					</picker>
					
					<view class="line-field">
						<text class="line-label">价格</text>
						<input
							class="line-input"
							type="digit"
							v-model="form.price"
							placeholder="￥0.0"
							placeholder-class="line-placeholder"
						/>
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
									@change="toggleGuarantee(item, $event)" />
						</view>
						<view class="empty-line" v-if="!guaranteeLoading && guarantees.length === 0">暂无服务保障配置</view>
					</view>
				</view>
			</view>

		<view class="bottom-actions">
			<button class="draft-btn" :disabled="submitting" @click="saveDraft">存为草稿</button>
			<button class="submit-btn" :disabled="submitting" @click="submitShowcase">{{ submitButtonText }}</button>
		</view>

		<view class="popup-mask" v-if="showSkillPopup" @click="closeSkillPopup">
			<view class="popup-content" @click.stop>
				<view class="popup-handle"></view>
				<view class="popup-header">
					<text class="popup-close" @click="closeSkillPopup">×</text>
					<text class="popup-title">技能标签</text>
					<text class="popup-confirm" @click="closeSkillPopup">完成</text>
				</view>
				<scroll-view class="skill-scroll" scroll-y>
					<view class="skill-cascader" v-if="skillTree.length > 0">
						<view class="skill-parent-list">
							<view
								v-for="item in skillTree"
								:key="item.id"
								class="skill-parent-item"
								:class="{ active: activeSkillParentId === item.id }"
								@click="selectSkillParent(item)"
							>
								<text class="skill-parent-name">{{ item.categoryName }}</text>
								<text class="skill-parent-count" v-if="getSelectedChildCount(item) > 0">{{ getSelectedChildCount(item) }}</text>
							</view>
						</view>
						<view class="skill-child-list">
							<view
								v-for="item in activeSkillChildren"
								:key="item.id"
								class="skill-child-item"
								:class="{ active: selectedSkillIds.includes(String(item.id)) }"
								@click="toggleSkill(item)"
							>
								<text>{{ item.categoryName }}</text>
								<text class="skill-check" v-if="selectedSkillIds.includes(String(item.id))">✓</text>
							</view>
						</view>
					</view>
					<view class="empty-line" v-if="!skillLoading && skillOptions.length === 0">暂无可选技能标签</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import env from '@/config/env.js';

export default {
	components: {
	},
	data() {
		return {
			statusBarHeight: 0,
			showcaseId: '',
			isEdit: false,
			coverList: [],
			form: {
				title: '',
				description: '',
				requirement: '',
				price: '',
				unit: ''
			},
			unitOptions: ['次', '张', '套', '份', '小时', '天'],
			skillTree: [],
			skillOptions: [],
			selectedSkillIds: [],
			activeSkillParentId: '',
			guarantees: [],
			selectedGuaranteeIds: [],
			showSkillPopup: false,
			skillLoading: false,
			guaranteeLoading: false,
			submitting: false
		};
	},
	computed: {
		pageTitle() {
			return this.isEdit ? '编辑橱窗' : '发布橱窗';
		},
		submitButtonText() {
			return this.isEdit ? '保存上架' : '立即上架';
		},
		selectedSkillNames() {
			return this.skillOptions
				.filter(item => this.selectedSkillIds.includes(String(item.id)))
				.map(item => item.categoryName);
		},
		activeSkillChildren() {
			const parent = this.skillTree.find(item => item.id === this.activeSkillParentId) || this.skillTree[0];
			if (!parent) {
				return [];
			}
			const children = parent.children || [];
			return children.length > 0 ? children : [parent];
		}
	},
	async onLoad(options) {
		const windowInfo = uni.getWindowInfo();
		this.statusBarHeight = windowInfo.statusBarHeight || 0;
		this.showcaseId = options && options.id ? String(options.id) : '';
		this.isEdit = !!this.showcaseId || (options && options.mode === 'edit');
		if (!this.ensureLoggedIn()) {
			return;
		}
		await Promise.all([this.loadSkillOptions(), this.loadGuarantees()]);
		if (this.showcaseId) {
			await this.loadShowcaseDetail();
		}
	},
	methods: {
		hasLoginToken() {
			return !!uni.getStorageSync('token');
		},
		buildCurrentPageUrl() {
			return this.showcaseId ? `/subpkg-showcase/pages/index?id=${this.showcaseId}&mode=edit` : '/subpkg-showcase/pages/index';
		},
		ensureLoggedIn() {
			if (this.hasLoginToken()) {
				return true;
			}
			uni.setStorageSync('login_redirect', this.buildCurrentPageUrl());
			uni.showModal({
				title: '提示',
				content: '登录后可发布橱窗',
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
			const pages = getCurrentPages();
			if (pages.length > 1) {
				uni.navigateBack();
				return;
			}
			uni.switchTab({
				url: '/pages/publish/index'
			});
		},
		resolveUrl(url) {
			if (!url) return '';
			if (/^(http|https|wxfile|data|blob):/.test(url)) {
				return url;
			}
			return env.aliyunUrl + url;
		},
		normalizeCoverList(value) {
			if (!value) {
				return [];
			}
			if (Array.isArray(value)) {
				return value.filter(Boolean);
			}
			if (typeof value === 'string') {
				const text = value.trim();
				if (!text) {
					return [];
				}
				if (text[0] === '[') {
					try {
						const parsed = JSON.parse(text);
						return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
					} catch (e) {
						return [];
					}
				}
				return [text];
			}
			return [];
		},
		async loadShowcaseDetail() {
			try {
				const res = await this.$request.get(`/wechat/showCase/${this.showcaseId}`, {}, {
					loading: true,
					loadingText: '加载中...'
				});
				this.fillFormByDetail(res.data || {});
			} catch (e) {
				uni.showToast({
					title: (e && e.msg) || '橱窗详情加载失败',
					icon: 'none'
				});
			}
		},
		fillFormByDetail(detail) {
			const covers = this.normalizeCoverList(detail.coverList);
			const fallbackCovers = this.normalizeCoverList(detail.coverImage);
			this.coverList = (covers.length > 0 ? covers : fallbackCovers).map(item => ({
				url: item,
				preview: this.resolveUrl(item)
			}));
			this.form.title = detail.showcaseTitle || '';
			this.form.description = detail.serviceDesc || '';
			this.form.price = detail.price === undefined || detail.price === null ? '' : String(detail.price);
			this.form.unit = detail.priceUnit || '次';
			this.selectedSkillIds = Array.isArray(detail.professionList)
				? detail.professionList
					.map(item => item.professionCategoryId || item.id)
					.filter(Boolean)
					.map(String)
				: [];
			this.mergeGuaranteeDetail(detail.guaranteeList || []);
		},
		mergeGuaranteeDetail(detailGuarantees) {
			const detailMap = {};
			(detailGuarantees || []).forEach(item => {
				const id = String(item.guaranteeId || item.id || '');
				if (id) {
					detailMap[id] = item;
				}
			});
			const existingIds = this.guarantees.map(item => String(item.id));
			const extraGuarantees = (detailGuarantees || [])
				.filter(item => !existingIds.includes(String(item.guaranteeId || item.id || '')))
				.map(item => ({
					id: item.guaranteeId || item.id,
					guaranteeName: item.guaranteeName,
					description: item.description,
					guaranteeValue: item.guaranteeValue,
					guaranteeUnit: item.guaranteeUnit
				}));
			this.guarantees = this.guarantees.concat(extraGuarantees).map(item => {
				const detail = detailMap[String(item.id)];
				if (!detail) {
					return item;
				}
				return {
					...item,
					guaranteeValue: detail.guaranteeValue || item.guaranteeValue || '',
					guaranteeUnit: detail.guaranteeUnit || item.guaranteeUnit || item.valueUnit || ''
				};
			});
			this.selectedGuaranteeIds = (detailGuarantees || [])
				.filter(item => item.isEnabled === undefined || item.isEnabled == 1)
				.map(item => String(item.guaranteeId || item.id));
		},
		async loadSkillOptions() {
			this.skillLoading = true;
			try {
				const res = await this.$request.get('/wechat/professionCategory/list', {
					status: 1
				});
				this.skillTree = this.normalizeCategories(res.data || []);
				this.skillOptions = this.flattenCategories(this.skillTree);
				this.activeSkillParentId = this.skillTree.length > 0 ? this.skillTree[0].id : '';
			} catch (e) {
				this.skillTree = [];
				this.skillOptions = [];
				this.activeSkillParentId = '';
			} finally {
				this.skillLoading = false;
			}
		},
		normalizeCategories(list) {
			return (list || []).map(item => ({
				id: item.id,
				categoryName: item.categoryName,
				categoryCode: item.categoryCode,
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
					guaranteeType: 'showcase'
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
		chooseCover() {
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
					await this.uploadCovers(files.map(file => file.tempFilePath));
				}
			});
		},
		async uploadCovers(filePaths) {
			uni.showLoading({
				title: '上传中...',
				mask: true
			});
			try {
				const uploadedItems = [];
				for (const filePath of filePaths) {
					const uploadPaths = await this.uploadCover(filePath);
					console.log("上传封面结果",uploadPaths)
					uploadPaths.forEach(path => {
						uploadedItems.push({
							url: path,
							preview: filePath
						});
					});
				}
				if (uploadedItems.length === 0) {
					uni.showToast({
						title: '封面上传失败',
						icon: 'none'
					});
					return;
				}
				this.coverList = this.coverList.concat(uploadedItems);
				uni.showToast({
					title: '封面上传成功',
					icon: 'none'
				});
			} finally {
				uni.hideLoading();
			}
		},
		uploadCover(filePath) {
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
						resolve([]);
					},
					complete: () => {}
				});
			});
		},
		parseUploadResponse(rawData) {
			if (!rawData) return [];
			try {
				const res = JSON.parse(rawData);
				console.log("解析上传响应",res)
				const uploadPath = this.normalizeUploadPath(res.msg);
				if (uploadPath) {
					return [uploadPath];
				}
			} catch (e) {
				return [];
			}
			return [];
		},
		normalizeUploadPath(value) {
			if (!value) {
				return '';
			}
			if (typeof value === 'string') {
				return /[/.]/.test(value) && value !== '操作成功' ? value : '';
			}
			if (typeof value === 'object') {
				return this.normalizeUploadPath(value.url || value.fileUrl || value.ossKey || value.path || value.key);
			}
			return '';
		},
		removeCover(index) {
			this.coverList.splice(index, 1);
		},
		openSkillPopup() {
			if (!this.ensureLoggedIn()) {
				return;
			}
			this.showSkillPopup = true;
		},
		closeSkillPopup() {
			this.showSkillPopup = false;
		},
		selectSkillParent(item) {
			this.activeSkillParentId = item.id;
		},
		getSelectedChildCount(item) {
			const children = item.children && item.children.length ? this.flattenCategories(item.children) : [item];
			return children.filter(child => this.selectedSkillIds.includes(String(child.id))).length;
		},
		toggleSkill(item) {
			const skillId = String(item.id);
			const index = this.selectedSkillIds.indexOf(skillId);
			if (index > -1) {
				this.selectedSkillIds.splice(index, 1);
				return;
			}
			this.selectedSkillIds.push(skillId);
		},
		handleUnitChange(e) {
			this.form.unit = this.unitOptions[e.detail.value];
		},
		isGuaranteeSelected(item) {
			return this.selectedGuaranteeIds.includes(String(item.id));
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
		validateForm() {
			if (this.coverList.length === 0) {
				uni.showToast({
					title: '请上传封面',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.title.trim()) {
				uni.showToast({
					title: '请输入橱窗标题',
					icon: 'none'
				});
				return false;
			}
			if (this.form.title.length > 30) {
				uni.showToast({
					title: '橱窗标题不能超过30个字符',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.description.trim()) {
				uni.showToast({
					title: '请输入商品描述',
					icon: 'none'
				});
				return false;
			}
			if (this.form.description.length > 100) {
				uni.showToast({
					title: '商品描述不能超过100个字符',
					icon: 'none'
				});
				return false;
			}
			if (this.form.requirement && this.form.requirement.length > 100) {
				uni.showToast({
					title: '需求描述不能超过100个字符',
					icon: 'none'
				});
				return false;
			}
			if (this.selectedSkillIds.length === 0) {
				uni.showToast({
					title: '请选择技能标签',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.price) {
				uni.showToast({
					title: '请输入单价',
					icon: 'none'
				});
				return false;
			}
			const price = Number(String(this.form.price).trim());
			if (!Number.isFinite(price) || price <= 0) {
				uni.showToast({
					title: '请输入有效单价',
					icon: 'none'
				});
				return false;
			}
			return true;
		},
		buildPayload(status) {
			const payload = {
				coverList: this.coverList.map(item => item.url),
				showcaseTitle: this.form.title.trim(),
				serviceDesc: this.form.description.trim(),
				professionCategoryIds: this.selectedSkillIds.map(id => String(id)),
				price: Number(String(this.form.price).trim()),
				priceUnit: this.form.unit,
				guaranteeList: this.guarantees.map(item => ({
					guaranteeId: String(item.id),
					isEnabled: this.isGuaranteeSelected(item) ? 1 : 0,
					guaranteeValue: item.guaranteeValue || '',
					guaranteeUnit: item.guaranteeUnit || item.valueUnit || ''
				})),
				status
			};
			if (this.showcaseId) {
				payload.id = this.showcaseId;
			}
			return payload;
		},
		saveDraft() {
			this.submitShowcaseByStatus(0);
		},
		submitShowcase() {
			this.submitShowcaseByStatus(1);
		},
		async submitShowcaseByStatus(status) {
			if (this.submitting) {
				return;
			}
			if (!this.ensureLoggedIn()) {
				return;
			}
			if (!this.validateForm()) {
				return;
			}
			this.submitting = true;
			uni.showLoading({
				title: status === 0 ? '保存中...' : '上架中...',
				mask: true
			});
			try {
				await this.$request.post('/wechat/showCase/save', this.buildPayload(status));
				uni.hideLoading();
				uni.showToast({
					title: status === 0 ? '草稿保存成功' : (this.isEdit ? '保存成功' : '上架成功'),
					icon: 'success',
					duration: 1500
				});
				if (this.isEdit) {
					uni.setStorageSync('my_showcase_list_need_refresh', Date.now());
				}
				setTimeout(() => {
					this.submitting = false;
					this.goBack();
				}, 1500);
			} catch (e) {
				uni.hideLoading();
				this.submitting = false;
				if (e && e.msg) {
					uni.showToast({
						title: e.msg,
						icon: 'none'
					});
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.showcase-page {
	min-height: 100vh;
	background: #f7f7f7;
	color: #000000;
}

.page-canvas {
	min-height: 1600rpx;
	padding: 20rpx 30rpx 130rpx;
	box-sizing: border-box;
}

.form-card {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 34rpx 28rpx;
	box-sizing: border-box;
}

.service-card {
	margin-top: 24rpx;
}

.field-block {
	margin-bottom: 44rpx;
}

.field-block.no-margin {
	margin-bottom: 0;
}

.field-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.field-title {
	font-size: 30rpx;
	line-height: 42rpx;
	color: #000000;
}

.field-count {
	position: absolute;
	right: 55rpx;
	font-size: 22rpx;
	color: #999999;
}

.cover-list {
	display: flex;
	flex-wrap: wrap;
	gap: 18rpx;
	margin-top: 26rpx;
}

.cover-uploader {
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

.cover-image {
	width: 100%;
	height: 100%;
	display: block;
}

.cover-delete {
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

.cover-plus {
	font-size: 72rpx;
	line-height: 72rpx;
	color: #979797;
	font-weight: 200;
}

.plain-input {
	height: 86rpx;
	font-size: 28rpx;
	// border-bottom: 1rpx solid #eeeeee;
	color: #D4D4D4;
}

.plain-textarea {
	width: 100%;
	height: 220rpx;
	margin-top: 18rpx;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #222222;
	// border-bottom: 1rpx solid #eeeeee;
	box-sizing: border-box;
}

.plain-textarea.large {
	height: 220rpx;
}

.placeholder-text,
.line-placeholder {
	color: #888888;
	font-size: 28rpx;
}

.line-field {
	min-height: 98rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.line-label {
	width: 140rpx;
	font-size: 28rpx;
	color: #000000;
}

.line-control {
	flex: 1;
	min-width: 0;
	min-height: 68rpx;
	border: 1rpx solid #D9D9D9;
	border-radius: 6rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 24rpx 0 30rpx;
	box-sizing: border-box;
}

.line-value {
	flex: 1;
	min-width: 0;
	display: block;
	font-size: 28rpx;
	color: #333333;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.line-input {
	flex: 1;
	height: 68rpx;
	// border: 1rpx solid #D9D9D9;
	border-radius: 6rpx;
	padding: 0 7rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #333333;
}

.line-arrow {
	flex-shrink: 0;
	width: 18rpx;
	height: 12rpx;
	margin-left: 16rpx;
	display: block;
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
	padding: 40rpx 0;
	font-size: 26rpx;
	color: #999999;
	text-align: center;
}

.bottom-actions {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0%;
	height: 85rpx;
	padding: 20rpx 30rpx env(safe-area-inset-bottom);
	box-sizing: content-box;
	background: #ffffff;
	box-shadow: 0 -1rpx 0 #dddddd;
	z-index: 18;
	gap: 38rpx;
	display: flex;
	justify-content: flex-end;
}

.draft-btn,
.submit-btn {
	width: 220rpx;
	height: 64rpx;
	border-radius: 36rpx;
	font-size: 28rpx;
	line-height: 64rpx;
	padding: 0;
	margin: 0;
}

.draft-btn {
	color: #979797;
	background: #ffffff;
	border: 1rpx solid #979797;
}

.submit-btn {
	color: #ffffff;
	background: #f37738;
	border: 1rpx solid #f37738;
}

.draft-btn::after,
.submit-btn::after {
	border: 0;
}

.popup-mask {
	position: fixed;
	inset: 0;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.42);
	display: flex;
	align-items: flex-end;
}

.popup-content {
	width: 100%;
	max-height: 72vh;
	background: #ffffff;
	border-radius: 30rpx 30rpx 0 0;
	padding: 14rpx 34rpx 38rpx;
	box-sizing: border-box;
}

.popup-handle {
	width: 124rpx;
	height: 14rpx;
	margin: 0 auto 30rpx;
	border-radius: 8rpx;
	background: #d8d8d8;
}

.popup-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24rpx;
}

.popup-title {
	font-size: 32rpx;
	color: #333333;
	font-weight: 600;
}

.popup-close,
.popup-confirm {
	width: 96rpx;
	font-size: 30rpx;
	color: #f37738;
}

.popup-close {
	color: #999999;
	font-size: 42rpx;
}

.popup-confirm {
	text-align: right;
}

.skill-scroll {
	max-height: 52vh;
}

.skill-cascader {
	display: flex;
	min-height: 520rpx;
	border-radius: 12rpx;
	overflow: hidden;
	background: #f7f7f7;
}

.skill-parent-list {
	width: 230rpx;
	background: #f2f2f2;
}

.skill-parent-item {
	min-height: 88rpx;
	padding: 0 18rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	color: #555555;
	font-size: 26rpx;
	border-left: 6rpx solid transparent;
}

.skill-parent-item.active {
	background: #ffffff;
	color: #f37738;
	border-left-color: #f37738;
}

.skill-parent-name {
	flex: 1;
	min-width: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.skill-parent-count {
	min-width: 30rpx;
	height: 30rpx;
	margin-left: 8rpx;
	border-radius: 15rpx;
	background: #f37738;
	color: #ffffff;
	font-size: 20rpx;
	line-height: 30rpx;
	text-align: center;
}

.skill-child-list {
	flex: 1;
	background: #ffffff;
	padding-bottom: 20rpx;
}

.skill-child-item {
	min-height: 88rpx;
	padding: 0 26rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1rpx solid #eeeeee;
	font-size: 26rpx;
	line-height: 36rpx;
	color: #333333;
	box-sizing: border-box;
}

.skill-child-item.active {
	color: #f37738;
}

.skill-check {
	margin-left: 20rpx;
	font-size: 28rpx;
	color: #f37738;
}

.small-switch {
	transform: scale(0.8);
	transform-origin: right center;
}
</style>
