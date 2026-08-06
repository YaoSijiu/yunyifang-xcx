<template>
	<view class="create-container">
		<!-- 1. 标题 -->
		<view class="input-section">
			<input class="title-input" placeholder="请输入作品集标题" placeholder-class="placeholder-style" v-model="title" />
		</view>

		<!-- 2. 封面 -->

		<!-- 4. 选择作品/标签 -->
		<view class="section-item" @click="handleSelectWorks()">
			<text class="label">{{ rule === 'tags' ? '选择标签' : '选择作品' }}</text>
			<view class="value">
				<text v-if="rule === 'tags' && selectedRuleTags.length === 0" class="placeholder">请选择标签</text>
				<text v-else-if="rule === 'tags'" class="selected-count">已选 {{ selectedRuleTags.length }} 个标签</text>
				<text v-else-if="tempSelectedIds.length === 0" class="placeholder">请选择作品</text>
				<text v-else class="selected-count">已选 {{ tempSelectedIds.length }} 个作品</text>
			</view>
			<text class="arrow">></text>
		</view>

		<!-- 5. 修改作品集规则 -->
		<view class="section-item" @click="openRuleModal()">
			<text class="label">修改作品集规则</text>
			<view class="value">
				<text v-if="!rule" class="placeholder">请选择规则</text>
				<text v-else-if="rule === 'all'" class="selected-count">全部作品</text>
				<text v-else-if="rule === 'tags'" class="selected-count">按标签选择</text>
				<text v-else-if="rule === 'manual'" class="selected-count">手动添加</text>
			</view>
			<text class="arrow">></text>
		</view>

		<!-- 5. 已选作品列表（支持拖拽排序） -->
		<view v-if="selectedWorks.length > 0" class="section-label">已选作品 ({{ selectedWorks.length }})</view>
		<view v-if="selectedWorks.length > 0" class="works-grid">
			<view v-for="(work, index) in selectedWorks" :key="work.id" class="work-item">
				<image :src="ossUrl + getFirstImageUrl(work.imageUrls)+'?x-oss-process=image/resize,w_750/quality,q_65/format,webp'" class="work-img" mode="aspectFill"></image>
				<text class="work-title">{{ work.title }}</text>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="footer-btn-area">
			<button class="publish-btn" @click="submit">完成</button>
		</view>

		<!-- 作品选择弹窗 -->
		<view class="popup-mask" v-if="showWorkSelector" @click="showWorkSelector = false">
			<view class="popup-content" @click.stop>
				<view class="popup-header">
					<text class="ph-cancel" @click="showWorkSelector = false">取消</text>
					<text class="ph-title">选择作品</text>
					<text class="ph-confirm" @click="confirmSelection">确定</text>
				</view>
				<scroll-view scroll-y class="work-list">
					<view class="work-select-item" v-for="item in selectWorksList" :key="item.id"
						@click="toggleWork(item)">
						<view class="checkbox" :class="{ checked: tempSelectedIds.includes(item.id) }"></view>
						<image :src="ossUrl + getFirstImageUrl(item.imageUrls)+'?x-oss-process=image/resize,w_750/quality,q_65/format,webp'" class="ws-img" mode="aspectFill">
						</image>
						<text class="ws-title">{{ item.title }}</text>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 规则选择弹窗 -->
		<view class="rule-mask" v-if="showRuleModal">
			<view class="rule-modal">
				<view class="rule-header">
					<text class="rule-close" @click="closeRuleModal">×</text>
					<view class="rule-title-area">
						<!-- <text class="rule-guide">1分钟带你上手作品集 ></text> -->
						<view class="rule-main-title">选择一种规则，</view>
						<view class="rule-main-title">将作品批量添加至作品集。</view>
						<text class="rule-subtitle">轻点选择/切换规则</text>
					</view>
				</view>

				<view class="rule-cards">
					<!-- 规则1: 添加全部作品 -->
					<view class="rule-card" @click="selectRule('all')">
						<view class="rule-icon-box">
							<image src="/static/icon/全部作品.svg" class="rule-icon" mode="aspectFit"></image>
						</view>
						<view class="rule-info">
							<text class="rule-name">添加全部作品</text>
							<text class="rule-desc">全部新作品将会自动添加进来</text>
						</view>
						<view class="radio" :class="{ checked: rule === 'all' }">
							<view class="radio-inner" v-if="rule === 'all'"></view>
						</view>
					</view>
					
					<!-- 规则2: 添加部分标签 -->
					<view class="rule-card" @click="selectRule('tags')">
						<view class="rule-icon-box">
							<image src="/static/icon/标签.svg" class="rule-icon" mode="aspectFit"></image>
						</view>
						<view class="rule-info">
							<text class="rule-name">添加部分标签</text>
							<text class="rule-desc">标签匹配的新作品会被添加进来</text>
						</view>
						<view class="radio" :class="{ checked: rule === 'tags' }">
							<view class="radio-inner" v-if="rule === 'tags'"></view>
						</view>
					</view>

					<!-- 规则3: 手动添加作品 -->
					<view class="rule-card" @click="selectRule('manual')">
						<view class="rule-icon-box">
							<image src="/static/icon/添加.svg" class="rule-icon" mode="aspectFit"></image>
						</view>
						<view class="rule-info">
							<text class="rule-name">手动添加作品</text>
							<text class="rule-desc">新作品不会被自动添加进来</text>
						</view>
						<view class="radio" :class="{ checked: rule === 'manual' }">
							<view class="radio-inner" v-if="rule === 'manual'"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 标签选择弹窗 (用于规则2) -->
		<view class="popup-mask" v-if="showTagSelector" @click="showTagSelector = false">
			<view class="popup-content tag-popup" @click.stop>
				<view class="popup-header">
					<image src="/static/home/关闭.png" class="close-btn" @click="showTagSelector = false"></image>
					<!-- <text class="ph-cancel" @click="showTagSelector = false">X</text> -->
					<!-- <text class="ph-title">作品标签</text> -->
					<text class="tag-confirm-btn" @click="confirmTagRule">完成</text>
				</view>
				<view class="tag-content-scroll" style="flex: 1; overflow-y: auto;">
					<!-- <view class="tag-input-section">
						<input class="tag-input" v-model="tagInput" placeholder="输入或选择标签" @confirm="addTag"
							confirm-type="done" />
					</view> -->
					<view class="tag-input-section">
						<view class="hint-title">轻点标签</view>
						<view class="hint-subtitle">将同类作品添加至作品集。</view>
					</view>
					<view class="my-tags-section" v-if="selectedRuleTags.length <= 0">
						<view class="my-tags-header" style="border-top: none; padding-top: 0;">
							<text class="my-tags-title1">已选标签({{ selectedRuleTags.length }})</text>
						</view>
					</view>
					<view class="my-tags-section" v-if="selectedRuleTags.length > 0">
						<view class="my-tags-header" style="border-top: none; padding-top: 0;">
							<text class="my-tags-title">已选标签({{ selectedRuleTags.length }})</text>
						</view>
						<view class="tags-list">
							<view class="tag-item active" v-for="(tag, index) in selectedRuleTags" :key="index"
								@click="removeTag(index)">
								{{ tag.tagName }} <text style="margin-left: 10rpx; font-size: 24rpx;">✕</text>
							</view>
						</view>
					</view>

					<view class="my-tags-section">
						<view class="my-tags-header">
							<text class="my-tags-title">我的标签({{ userTags.length }})</text>
							<text class="manage-tags" @click="manageTags">管理我的标签</text>
						</view>
						<view class="tags-list">
							<view class="tag-item" v-for="(tag, index) in userTags" :key="index"
								:class="{ active: selectedRuleTags.some(t => t.tagName === tag.tagName)  }" @click="toggleRuleTag(tag)">
								{{ tag.tagName }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import env from '@/config/env.js'
	import {
		uploadFile
	} from "@/utils/uploadUtil.js";
	export default {
		data() {
			return {
				ossUrl: env.aliyunUrl,
				id: null,
				title: '',
				selectedWorks: [], // 最终选择的作品
				showWorkSelector: false,
				tempSelectedIds: [], // 弹窗中临时选择的ID
				// 模拟作品数据
				selectWorksList: [],
				workType: 0, // 0:个人 1:团队
				teamId: null, // 团队ID
				// 新增规则相关
				showRuleModal: false,
				showTagSelector: false,
				userTags: [],
				rule:null, //规则
				selectedRuleTags: [],
				// 标签弹窗相关
				tagInput: '',
				isTeamMode: false
			};
		},
		onLoad(options) {
			if (options.workType) {
				this.workType = parseInt(options.workType)
			}
			// if (options.teamId) {
			// 	this.teamId = options.teamId
			// }
			this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
			// 预加载作品列表
			if (this.hasLoginToken()) {
				this.loadAllWorks();
			}

			if (options.id) {
				if (!this.hasLoginToken()) {
					this.promptLogin(this.buildCurrentPageUrl());
					return;
				}
				uni.setNavigationBarTitle({
					title: '编辑作品集'
				});
				this.getCollectionsInfo(options.id)
			} else {
				// 新建时弹出规则选择
				this.showRuleModal = true;
			}
		},
		methods: {
			hasLoginToken() {
				return !!uni.getStorageSync('token');
			},
			buildCurrentPageUrl() {
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1];
				if (!currentPage) {
					return '/subpkg-library/pages/collection/create';
				}
				const route = `/${currentPage.route}`;
				const options = currentPage.options || {};
				const query = Object.keys(options).map(key => `${key}=${encodeURIComponent(options[key])}`).join('&');
				return query ? `${route}?${query}` : route;
			},
			promptLogin(redirectUrl = '') {
				if (redirectUrl) {
					uni.setStorageSync('login_redirect', redirectUrl);
				}
				uni.showModal({
					title: '提示',
					content: '登录后可使用该功能',
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
			},
			ensureLoggedIn() {
				if (this.hasLoginToken()) {
					return true;
				}
				this.promptLogin(this.buildCurrentPageUrl());
				return false;
			},
			loadAllWorks() {
				if (!this.hasLoginToken()) {
					this.selectWorksList = [];
					return Promise.resolve();
				}
				const teamUserId = uni.getStorageSync('teamOwnerId')
				const userInfo = uni.getStorageSync('userInfo') || {};
				const userId = userInfo.id
				let url = `/wechat/works/findUserWorks`;
				if (this.isTeamMode && teamUserId) {
					url += `?userId=${teamUserId}`;
				} else {
					url += `?userId=${userId}`;
				}
				return this.$request.get(url).then(res => {
					if (res.code == 200) {
						this.selectWorksList = res['data'] || res.data||[]
					}
				})
			},

			// 规则选择逻辑
			closeRuleModal() {
				this.showRuleModal = false;
			},
			async selectRule(type) {
			if (!this.ensureLoggedIn()) {
				return;
			}
			// 检查是否需要提示用户
			if (this.rule && this.rule !== type && this.tempSelectedIds.length > 0) {
				// 切换规则且已有作品，提示用户
				uni.showModal({
					title: '规则切换提示',
					content: '切换规则后，该作品集原有的作品会被移除，是否继续？',
					confirmText: '继续',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 用户确认，执行规则切换
							this.doSelectRule(type);
						}
					}
				});
			} else {
				// 首次选择规则或无作品，直接执行
				this.doSelectRule(type);
			}
		},

		// 执行规则选择
			doSelectRule(type) {
				// 更新规则字段
				this.rule = type;
				
				if (type === 'all') {
					// 添加全部作品
					if (this.selectWorksList.length === 0) {
						uni.showToast({
							title: '暂无作品',
							icon: 'none'
						});
						return;
					}
					this.tempSelectedIds = this.selectWorksList.map(w => w.id);
					this.confirmSelection();
					this.showRuleModal = false;
				} else if (type === 'tags') {
					// 按标签添加
					this.getUserTags().then(() => {
						// 显示标签选择弹窗
						this.showTagSelector = true;
						this.showRuleModal = false;
					});
				} else if (type === 'manual') {
					// 手动添加
					this.showRuleModal = false;
					this.clickShowWorkSelector();
				}
			},
				async getCollectionsTags(selectedWorks){
				if(!selectedWorks.length){
					return
				}
				const ids = selectedWorks.map(item => item.id);
				let url = `/wechat/works/findCollectionsTag/${ids}`;
				const {data,code} = await this.$request.get(url)
				if(code==200){
					// 过滤掉不在userTags中的标签
					const userTagNames = this.userTags.map(tag => tag.tagName);
					// 转换data为标签对象数组，确保与userTags格式一致
					this.selectedRuleTags = data.filter(tagName => userTagNames.includes(tagName))
						.map(tagName => this.userTags.find(tag => tag.tagName === tagName));
				}
			},
			// 获取用户标签
			async getUserTags() {
				if (!this.hasLoginToken()) {
					this.userTags = [];
					return;
				}
				let teamOwnerId = uni.getStorageSync('teamOwnerId');
				let url = '/wechat/tag/list';
				if (this.isTeamMode && teamOwnerId) {
					url += `?userId=${teamOwnerId}`;
				}
				const {
					data,
					code
				} = await this.$request.get(url)
				if (code == 200) {
					this.userTags = data
				}
			},
			toggleRuleTag(tag) {
				const tagName = tag.tagName;
				const index = this.selectedRuleTags.findIndex(t => t.tagName === tagName);
				if (index > -1) {
					this.selectedRuleTags.splice(index, 1);
				} else {
					this.selectedRuleTags.push(tag);
				}
			},
			async  confirmTagRule() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				if (this.selectedRuleTags.length === 0) {
					uni.showToast({
						title: '请至少选择一个标签',
						icon: 'none'
					});
					return;
				}

				try {
					// console.log("选择的标签", this.selectedRuleTags);
					
					const ids = this.selectedRuleTags.map(v => v.id);
					const { data } = await this.$request.get(`/wechat/works/findTagWorkIds/${ids}`);
					 this.selectedWorks = data
					 this.selectWorksList =data
					// 确保data是数组
					const workIds = Array.isArray(data) ? data : [];
					// console.log("获取到的作品ID:", workIds);
					
					if (workIds.length === 0) {
						uni.showToast({
							title: '未找到匹配该标签的作品',
							icon: 'none'
						});
						return;
					}
					
					this.tempSelectedIds = workIds
					
					// 加载所有作品，确保selectWorksList有完整的作品信息
					// await this.loadAllWorks();
					// console.log("加载后的作品列表:", this.selectWorksList);
					
					// console.log("计算后的selectedWorks:", this.selectedWorks);
					// console.log("selectedWorks长度:", this.selectedWorks.length);
				
					this.showTagSelector = false;
					this.showRuleModal = false;
				} catch (error) {
					console.error('确认标签规则失败:', error);
					// uni.showToast({
					// 	title: '处理失败，请重试',
					// 	icon: 'none'
					// });
					this.showTagSelector = false;
				}
			},

			// 打开规则选择弹窗
			openRuleModal() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				this.showRuleModal = true;
				if (this.selectWorksList.length == 0) {
					this.loadAllWorks();
				}
			},

			// 处理选择作品
			handleSelectWorks() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				if (!this.rule) {
					// 未选择规则，先打开规则选择
					this.openRuleModal();
				} else if (this.rule === 'all') {
					// 全部作品规则，直接添加所有作品
					if (this.selectWorksList.length === 0) {
						uni.showToast({
							title: '暂无作品',
							icon: 'none'
						});
						return;
					}
					this.tempSelectedIds = this.selectWorksList.map(w => w.id);
					this.confirmSelection();
				} else if (this.rule === 'tags') {
					// 按标签添加，打开标签选择
				this.getUserTags().then(() => {
					// 显示标签选择弹窗
					this.showTagSelector = true;
				});
				} else if (this.rule === 'manual') {
					// 手动添加，打开作品选择器
					this.clickShowWorkSelector();
				}
			},

			// 点击选择作品触发
			clickShowWorkSelector() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				this.showWorkSelector = true
				if (this.selectWorksList.length == 0) {
					this.loadAllWorks().then(() => {
						this.filterValidIds();
					});
				} else {
					this.filterValidIds();
				}
			},

			filterValidIds() {
				if (this.selectWorksList.length > 0) {
					const validIds = this.selectWorksList.map(w => w.id);
					this.tempSelectedIds = this.tempSelectedIds.filter(id => validIds.includes(id));
				}
			},
			// 标签相关方法
			addTag() {
				if (!this.tagInput.trim()) return;
				const tag = this.tagInput.trim();
				if (!this.selectedRuleTags.includes(tag)) {
					this.selectedRuleTags.push(tag);
				}
				this.tagInput = '';
			},
			removeTag(index) {
				this.selectedRuleTags.splice(index, 1);
			},
			manageTags() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				// 跳转到标签管理页面
				uni.navigateTo({
					url: '/subpkg-library/pages/tags/edit'
				});
			},

			// 查询结果集
			async getCollectionsInfo(id) {
				if (!this.hasLoginToken()) {
					return;
				}
				const {
					data
				} = await this.$request.get(`/wechat/works/findUserWorksCollectionsById/${id}`)
				this.id = data['id']
				this.title = data['name']
				this.teamId = data['teamId']
				this.rule = data['rule'] || null // 加载作品集规则
				// 从返回的数据中设置workType
				// this.workType = data['type'] || 0
				this.tempSelectedIds = data['selectWorksIds'] || []
				
				// 处理tagIds字段
				if (data['tagIds']) {
					try {
						// 解析tagIds字符串为数组
						const tagIds = JSON.parse(data['tagIds']);
						// 如果是标签规则，获取用户标签并匹配
						if (this.rule === 'tags' && Array.isArray(tagIds)) {
							await this.getUserTags();
							// 根据tagIds过滤用户标签
							this.selectedRuleTags = this.userTags.filter(tag => tagIds.includes(tag.id));
						}
					} catch (error) {
						console.error('解析tagIds失败:', error);
					}
				}

				// 预加载作品列表以过滤无效ID并回显作品
				// loadAllWorks已经在onLoad调用，这里只需等待或再次确认
				if (this.selectWorksList && this.selectWorksList.length === 0) {
					await this.loadAllWorks();
				}

				// 如果 this.tempSelectedIds 是空数组，selectedWorks 也应该是空数组，不需要进一步过滤
				if (this.tempSelectedIds && this.tempSelectedIds.length > 0) {
					if (this.selectWorksList && this.selectWorksList.length > 0) {
						const validIds = this.selectWorksList.map(w => w.id);
						// 过滤 tempSelectedIds
						this.tempSelectedIds = this.tempSelectedIds.filter(id => validIds.includes(id));
						// 回显已选作品到下方列表
						this.selectedWorks = this.selectWorksList.filter(w => this.tempSelectedIds.includes(w.id));
					} else {
						// 如果作品列表为空，说明所有已选ID都无效（或者还没加载出来）
						this.tempSelectedIds = [];
						this.selectedWorks = [];
					}
				} else {
					this.tempSelectedIds = [];
					this.selectedWorks = [];
				}
			},
			toggleWork(item) {
				const index = this.tempSelectedIds.indexOf(item.id);
				if (index > -1) {
					this.tempSelectedIds.splice(index, 1);
				} else {
					this.tempSelectedIds.push(item.id);
				}
			},
			// 确认选择
			confirmSelection() {
				// console.log('开始确认选择:', {
				// 	selectWorksListLength: this.selectWorksList.length,
				// 	tempSelectedIds: this.tempSelectedIds,
				// 	selectWorksListFirstFew: this.selectWorksList.slice(0, 3)
				// });
				
				// 过滤作品
				this.selectedWorks = this.selectWorksList.filter(w => {
					const found = this.tempSelectedIds.includes(w.id);
					if (found) {
						// console.log('找到匹配的作品:', w.id, w.title);
					}
					return found;
				});
				
				// console.log('确认选择后的selectedWorks:', this.selectedWorks);
				// console.log('selectedWorks长度:', this.selectedWorks.length);
				
				this.showWorkSelector = false;
			},

			async submit() {
				if (!this.ensureLoggedIn()) {
					return;
				}
				if (!this.title.trim()) {
					uni.showToast({
						title: '请输入标题',
						icon: 'none'
					});
					return;
				}

				if (this.tempSelectedIds.length === 0) {
					uni.showToast({
						title: '请选择作品',
						icon: 'none'
					});
					return;
				}


				uni.showLoading({
					title: '保存中...',
					mask: true
				});

				try {
					// 新增和修改
				const param = {
					id: this.id,
					rule: this.rule, // 作品集规则
					name: this.title,
					type: this.workType, //0：个人: 1：团队
					teamId: this.teamId //团队id
				};

				// 根据规则类型添加不同的字段
				if (this.rule === 'all') {
					// all规则：只需要id和rule
				} else if (this.rule === 'tags') {
					// tags规则：需要tagVoList字段
					param.tagVoList = this.selectedRuleTags
				} else if (this.rule === 'manual') {
					// manual规则：需要selectWorksIds数组
					param.selectWorksIds = this.tempSelectedIds;
				}

					const teamUserId = uni.getStorageSync('teamOwnerId')
					if (this.isTeamMode) {
						param.userId = teamUserId
					}
					let res;
					
					// console.log("传参param",param)
					// 修改
					if (param.id) {
						res = await this.$request.put(`/wechat/works/editWorkCollections`, param);
					} else {
						// 新增
						res = await this.$request.post(`/wechat/works/addWorkCollections`, param);
					}

					uni.hideLoading();

					if (res.code == 200) {
						uni.showToast({
							title: param.id ? '编辑成功' : '新增成功',
							icon: 'success',
							duration: 1500
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						uni.showToast({
							title: res.msg || '保存失败',
							icon: 'none'
						});
					}
				} catch (e) {
					uni.hideLoading();
					console.error(e);
				}
			},
			// 解析 imageUrls 字符串并获取第一张图片
			getFirstImageUrl(imageUrlsStr) {
				if (!imageUrlsStr) return '';

				try {
					// 1. 解析 JSON 字符串
					const urlsArray = JSON.parse(imageUrlsStr);

					// 2. 检查是否为数组且不为空
					if (Array.isArray(urlsArray) && urlsArray.length > 0) {
						// 3. 返回第一张图片的 URL
						return urlsArray[0];
					}

					return '';
				} catch (error) {
					console.error('解析 imageUrls 失败:', error, imageUrlsStr);

					// 如果 JSON 解析失败，尝试其他解析方式
					// 例如：处理 "[url1,url2,url3]" 这种格式（不带引号）
					if (typeof imageUrlsStr === 'string') {
						// 移除首尾的方括号
						const cleaned = imageUrlsStr.trim()
							.replace(/^\[/, '')
							.replace(/\]$/, '');

						// 按逗号分割
						const urls = cleaned.split(',').map(url => url.trim());

						if (urls.length > 0 && urls[0]) {
							return urls[0];
						}
					}

					return '';
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.create-container {
		padding: 0 40rpx 180rpx;
		background: #fff;
		min-height: 100vh;
	}

	.input-section {
		padding: 40rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.title-input {
		font-size: 36rpx;
		font-weight: 500;
		height: 60rpx;
	}

	.section-label {
		margin-top: 40rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
		margin-bottom: 20rpx;
	}



	.section-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.label {
		font-size: 30rpx;
		color: #333;
		font-weight: 500;
	}

	.value {
		flex: 1;
		text-align: right;
		margin-right: 20rpx;
	}

	.placeholder {
		color: #ccc;
		font-size: 28rpx;
	}


	.selected-count {
		color: #333;
		font-size: 28rpx;
		font-weight: 500;
	}

	.arrow {
		color: #ccc;
	}

	.footer-btn-area {
		position: fixed;
		bottom: 14rpx;
		left: 0;
		width: 100%;
		padding-bottom: 40rpx;
		// padding: 20rpx 40rpx calc(20rpx + env(safe-area-inset-bottom));
		background: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		z-index: 100;
		display: flex;
		justify-content: center;
	}

	.publish-btn {
		width: 100%;
		max-width: 600rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #ff7a22;
		color: #fff;
		font-size: 32rpx;
		font-weight: 500;
		border-radius: 44rpx;
	}

	/* 弹窗样式 */
	.popup-mask {
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

	.popup-content {
		background: #fff;
		border-radius: 24rpx;
		height: 70vh;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		margin: 20rpx;
	}

	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		// border-bottom: 1rpx solid #eee;
	}

	.close-btn {
		width: 40rpx;
		height: 40rpx;
	}

	.ph-cancel {
		color: #999;
		font-size: 28rpx;
	}

	.ph-title {
		font-size: 32rpx;
		font-weight: 500;
	}

	.ph-confirm {
		color: #ff7a22;
		font-size: 28rpx;
		font-weight: 500;
	}

	.work-list {
		flex: 1;
		padding: 20rpx;
		overflow-y: auto;
	}

	.work-select-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
	}

	.checkbox {
		width: 40rpx;
		height: 40rpx;
		border: 2rpx solid #ccc;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.checkbox.checked {
		background: #ff7a22;
		border-color: #ff7a22;
		position: relative;
	}

	.checkbox.checked::after {
		content: '';
		position: absolute;
		left: 12rpx;
		top: 6rpx;
		width: 10rpx;
		height: 20rpx;
		border-right: 4rpx solid #fff;
		border-bottom: 4rpx solid #fff;
		transform: rotate(45deg);
	}

	.ws-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
		background: #eee;
	}

	.ws-title {
		font-size: 28rpx;
		color: #333;
	}

	/* 已选作品网格 */
	.works-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20rpx;
		margin-bottom: 40rpx;
		transform-style: preserve-3d;
	}

	/* 作品项样式 */
	.work-item {
		position: relative;
		border-radius: 12rpx;
		overflow: hidden;
		background: #f5f5f5;
	}

	/* 作品图片 */
	.work-img {
		width: 100%;
		height: 200rpx;
		/* 设置固定高度，根据grid布局自适应宽度 */
		object-fit: cover;
	}

	/* 作品标题 */
	.work-title {
		display: block;
		font-size: 24rpx;
		color: #333;
		padding: 8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* 规则弹窗样式 */
	.rule-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.rule-modal {
		background: #fff;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		padding: 40rpx 30rpx 60rpx;
		min-height: 50vh;
	}

	.rule-header {
		margin-bottom: 40rpx;
		position: relative;
	}

	.rule-close {
		position: absolute;
		top: -10rpx;
		right: 0;
		font-size: 40rpx;
		color: #999;
		padding: 10rpx;
	}

	.rule-title-area {
		margin-top: 20rpx;
	}

	.rule-main-title {
		font-size: 40rpx;
		font-weight: 500;
		color: #333;
		line-height: 1.4;
	}

	.rule-subtitle {
		display: block;
		margin-top: 16rpx;
		font-size: 28rpx;
		color: #999;
	}

	.rule-cards {
		display: flex;
		flex-direction: column;
		gap: 30rpx;
	}

	.rule-card {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background: #f8f8f8;
		border-radius: 24rpx;
		border: 2rpx solid transparent;
		transition: all 0.3s;
	}

	.rule-card:active {
		background: #f0f0f0;
		border-color: #eee;
	}

	.rule-icon-box {
		width: 80rpx;
		height: 80rpx;
		background: #fff;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 30rpx;
		flex-shrink: 0;
	}

	.rule-icon {
		width: 60rpx;
		height: 60rpx;
	}

	.rule-icon-plus {
		font-size: 50rpx;
		color: #333;
		font-weight: 300;
		margin-top: -6rpx;
	}

	.rule-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.rule-name {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		margin-bottom: 8rpx;
	}

	.rule-desc {
		font-size: 24rpx;
		color: #999;
	}

	/* 单选框样式 */
	.radio {
		width: 40rpx;
		height: 40rpx;
		border: 2rpx solid #ccc;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
	}

	.radio.checked {
		border-color: #ff7a22;
		background: #ff7a22;
	}

	.radio-inner {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background: #fff;
	}

	/* Tag Selector Styles */
	.tag-popup-content {
		height: 60vh;
	}

	.tag-select-list {
		flex: 1;
		overflow-y: auto;
		padding: 20rpx 30rpx;
	}

	.tag-select-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.tag-name {
		font-size: 30rpx;
		color: #333;
	}

	.empty-tags {
		text-align: center;
		padding: 60rpx 0;
		color: #999;
		font-size: 28rpx;
	}

	/* 标签弹窗样式 */
	.tag-popup {
		height: 80vh;
		display: flex;
		flex-direction: column;
	}

	.tag-confirm-btn {
		background: #000;
		color: #fff;
		padding: 10rpx 30rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
	}

	.tag-input-section {
		margin-bottom: 40rpx;
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

	.tag-input {
		background: #f5f5f5;
		border-radius: 8rpx;
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.my-tags-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		padding-top: 20rpx;
		border-top: 1rpx solid #eee;
	}

	.my-tags-title {
		font-size: 32rpx;
		font-weight: 500;
		color: #000000;
	}
	.my-tags-title1 {
		font-size: 30rpx;
		font-weight: 500;
		color: #8f8f8f;
	}
	.manage-tags {
		font-size: 26rpx;
		color: #8f8f8f;
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
	}

	.tag-item {
		background: #f5f5f5;
		color: #333;
		padding: 12rpx 24rpx;
		border-radius: 30rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
		border: 1px solid transparent;
	}

	.tag-item.active {
		background: #fff;
		color: #ff7a22;
		border-color: #ff7a22;
	}
</style>
