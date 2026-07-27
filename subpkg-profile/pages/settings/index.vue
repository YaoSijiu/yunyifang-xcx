<template>
	<view class="page">

		<!-- 访问设置 -->
		<view class="card">
			<!-- <view class="card-title">访问设置</view> -->

			<view class="item">
				<view class="left">
					<view class="label">访问限制</view>
					<view class="desc">开启后，将记录访客信息，且访客需填写手机号才能访问您的主页</view>
				</view>
				<switch :checked="visit.login" @change="handleLoginSwitchChange" color="#F37738"/>
			</view>

			<view class="item" style="display: block;">
				<view class="label" style="margin-bottom: 20rpx;">关注服务号获取访客通知</view>
				<official-account @load="onOfficialAccountLoad" @error="onOfficialAccountError"></official-account>
			</view>

			<!-- <view class="item">
				<view class="left">
					<view class="label">免填写姓名</view>
					<view class="desc">开启后，访客无需填写姓名就能浏览你的作品。</view>
				</view>
				<switch v-model="visit.noName" />
			</view>

			<view class="item">
				<view class="left">
					<view class="label">免授权手机号</view>
					<view class="desc">开启后，访客无需授权手机号就能浏览你的作品。</view>
				</view>
				<switch v-model="visit.noPhone" />
			</view>

			<view class="item">
				<view class="left">
					<view class="label">新访客提醒</view>
					<view class="desc">开启后，新访客到来时会收到一条提醒。关注公众号才能获知消息提醒哦。</view>
					<text class="link">如何恢复访客访问 ></text>
				</view>
				<switch v-model="visit.newTip" />
			</view> -->
		</view>

		<view class="card-title">专业方向设置</view>
		<view class="card">
			<view class="item profession-setting">
				<view class="left">
					<view class="label">我的专业方向</view>
					<view class="desc">用于任务推荐和个人能力展示，可多选</view>
					<view class="selected-tags" v-if="selectedProfessionNames.length > 0">
						<text
							v-for="name in selectedProfessionNames"
							:key="name"
							class="selected-tag"
						>{{ name }}</text>
					</view>
					<view class="empty-profession" v-else>
						{{ professionLoading ? '加载中...' : '暂未设置' }}
					</view>
				</view>
				<view class="edit-btn" @click="openProfessionPopup">修改</view>
			</view>
		</view>

		<!-- 访客保存权限 -->
		<view class="card-title">访客保存权限</view>
		<view class="card">
			<view class="item">
				<view class="left">
					<view class="label">有水印小图（1200像素宽）</view>
				</view>
				<switch :checked="save.watermarkImage" data-key="watermarkImage" @change="handleSaveSwitchChange" color="#F37738" />
			</view>

			<view class="item">
				<view class="left">
					<view class="label">无水印小图（1200像素宽）</view>
				</view>
				<switch :checked="save.noWatermarkSmall" data-key="noWatermarkSmall" @change="handleSaveSwitchChange" color="#F37738" />
			</view>

			<view class="item">
				<view class="left">
					<view class="label">无水印原图</view>
				</view>
				<switch :checked="save.noWatermarkOrigin" data-key="noWatermarkOrigin"
					@change="handleSaveSwitchChange" color="#F37738" />
			</view>

			<view class="item">
				<view class="left">
					<view class="label">视频下载</view>
				</view>
				<switch :checked="save.video" data-key="video" @change="handleSaveSwitchChange" color="#F37738" />
			</view>
		</view>
		<view class="card-title">下载案例</view>
		<view class="card">
			<view class="item">
				<view class="left">
					<view class="label">作品和作品集下载</view>
				</view>
				<switch :checked="save.downloadWorks" data-key="downloadWorks" @change="handleSaveSwitchChange" color="#F37738" />
			</view>
		</view>

		<view class="profession-mask" v-if="professionPopupVisible" @click="closeProfessionPopup">
			<view class="profession-popup" @click.stop>
				<view class="popup-header">
					<view class="popup-title">修改专业方向</view>
					<view class="popup-close" @click="closeProfessionPopup">×</view>
				</view>
				<view class="popup-subtitle">请选择您擅长的专业方向，可多选</view>
				<view class="category-panel" v-if="!professionLoading && professionTree.length > 0">
					<scroll-view class="left-scroll" scroll-y>
						<view
							v-for="item in professionTree"
							:key="item.id"
							class="left-item"
							:class="{ active: activeProfessionParentId === item.id }"
							@click="selectProfessionParent(item)"
						>
							{{ item.categoryName }}
						</view>
					</scroll-view>
					<scroll-view class="right-scroll" scroll-y>
						<view class="chip-wrap">
							<view
								v-for="item in activeProfessionChildren"
								:key="item.id"
								class="profession-chip"
								:class="{ active: popupSelectedProfessionIds.includes(String(item.id)) }"
								@click="toggleProfession(item)"
							>
								{{ item.categoryName }}
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="category-empty" v-else>
					{{ professionLoading ? '加载中...' : '暂无专业分类' }}
				</view>
				<view class="popup-footer">
					<button class="cancel-btn" @click="closeProfessionPopup">取消</button>
					<button class="save-btn" :disabled="professionSubmitting" @click="saveProfessionSetting">
						{{ professionSubmitting ? '保存中...' : '保存' }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script scoped>
	export default {
		data() {
			return {
				settingId: null,
				visit: {
					login: false,

					noName: true,
					noPhone: false,
					block: false,
					newTip: false,
					autoVerify: false
				},
				save: {
					watermarkImage: false,
					noWatermarkSmall: false,
					noWatermarkOrigin: false,
					video: false,
					downloadWorks: false
				},
				watermark: {
					cover: false,
					detail: false
				},
				display: {
					immersive: false,
					hideStats: false,
					hideTopTag: false
				},
				team: {
					allowEditOthers: false
				},
				professionLoading: false,
				professionSubmitting: false,
				professionPopupVisible: false,
				professionTree: [],
				professionOptions: [],
				activeProfessionParentId: '',
				selectedProfessionIds: [],
				selectedProfessionList: [],
				popupSelectedProfessionIds: []
			}
		},
		computed: {
			activeProfessionChildren() {
				const parent = this.professionTree.find(item => item.id === this.activeProfessionParentId) || this.professionTree[0]
				if (!parent) {
					return []
				}
				if (parent.children && parent.children.length) {
					return this.flattenProfessionCategories(parent.children)
				}
				return [parent]
			},
			selectedProfessionNames() {
				if (this.selectedProfessionList.length > 0) {
					return this.selectedProfessionList.map(item => item.categoryName).filter(Boolean)
				}
				const optionMap = {}
				this.professionOptions.forEach(item => {
					optionMap[String(item.id)] = item.categoryName
				})
				return this.selectedProfessionIds.map(id => optionMap[String(id)]).filter(Boolean)
			}
		},
		onLoad() {
			this.fetchUserSetting()
			this.fetchProfessionSetting()
		},
		methods: {
			async fetchUserSetting() {
				try {
					const res = await this.$request.get('/wechat/user/getUserSetting')
					const {
						code,
						data
					} = res || {}
					if (code === 200 && data) {
						this.settingId = data.id
						console.log('1111', data.loginAccessRestrictions)
						this.visit.login = data.loginAccessRestrictions == 1

						// 获取访客保存权限设置
						this.save.watermarkImage = data.watermarkImage == 1
						this.save.noWatermarkSmall = data.noWatermarkImage == 1
						this.save.noWatermarkOrigin = data.waterlessOriginalImage == 1
						this.save.video = data.videoDownload == 1
						this.save.downloadWorks = data.downloadWorks == 1
					}
				} catch (error) {
					console.error('获取用户设置信息失败', error)
				}
			},
			async fetchProfessionSetting() {
				this.professionLoading = true
				try {
					const categoryRes = await this.$request.get('/wechat/professionCategory/list', {
						status: 1
					})
					this.professionTree = this.normalizeProfessionCategories(categoryRes.data || [])
					this.professionOptions = this.flattenProfessionCategories(this.professionTree)
					this.activeProfessionParentId = this.professionTree.length > 0 ? this.professionTree[0].id : ''

					const selectedRes = await this.$request.get('/wechat/professionCategory/userTaskType')
					const selectedList = Array.isArray(selectedRes.data) ? selectedRes.data : []
					this.selectedProfessionList = selectedList.map(item => ({
						id: item.id,
						categoryName: item.categoryName || '',
						categoryCode: item.categoryCode || ''
					})).filter(item => item.id)
					this.selectedProfessionIds = this.selectedProfessionList.map(item => String(item.id))
				} catch (error) {
					console.error('获取专业方向设置失败', error)
					uni.showToast({
						title: '专业方向加载失败',
						icon: 'none'
					})
				} finally {
					this.professionLoading = false
				}
			},
			normalizeProfessionCategories(list) {
				return (list || []).map(item => ({
					id: item.id,
					parentId: item.parentId,
					level: item.level,
					categoryName: item.categoryName || '',
					categoryCode: item.categoryCode || '',
					icon: item.icon || '',
					children: this.normalizeProfessionCategories(item.children || [])
				})).filter(item => item.id)
			},
			flattenProfessionCategories(list) {
				const result = []
				const walk = (items) => {
					(items || []).forEach(item => {
						result.push({
							id: item.id,
							parentId: item.parentId,
							level: item.level,
							categoryName: item.categoryName,
							categoryCode: item.categoryCode
						})
						if (item.children && item.children.length) {
							walk(item.children)
						}
					})
				}
				walk(list)
				return result
			},
			openProfessionPopup() {
				this.popupSelectedProfessionIds = this.selectedProfessionIds.slice()
				if (!this.activeProfessionParentId && this.professionTree.length > 0) {
					this.activeProfessionParentId = this.professionTree[0].id
				}
				this.professionPopupVisible = true
			},
			closeProfessionPopup() {
				if (this.professionSubmitting) {
					return
				}
				this.professionPopupVisible = false
			},
			selectProfessionParent(item) {
				this.activeProfessionParentId = item.id
			},
			toggleProfession(item) {
				const id = String(item.id)
				const index = this.popupSelectedProfessionIds.indexOf(id)
				if (index > -1) {
					this.popupSelectedProfessionIds.splice(index, 1)
					return
				}
				this.popupSelectedProfessionIds.push(id)
			},
			async saveProfessionSetting() {
				if (this.popupSelectedProfessionIds.length === 0) {
					uni.showToast({
						title: '请选择专业方向',
						icon: 'none'
					})
					return
				}
				if (this.professionSubmitting) {
					return
				}
				this.professionSubmitting = true
				try {
					const categoryIds = this.popupSelectedProfessionIds
						.map(id => Number(id))
						.filter(id => Number.isFinite(id))
					const res = await this.$request.post('/wechat/professionCategory/userTaskType', {
						categoryIds
					})
					if (!res || res.code !== 200) {
						uni.showToast({
							title: res && res.msg ? res.msg : '保存失败',
							icon: 'none'
						})
						return
					}
					const optionMap = {}
					this.professionOptions.forEach(item => {
						optionMap[String(item.id)] = item
					})
					this.selectedProfessionIds = this.popupSelectedProfessionIds.slice()
					this.selectedProfessionList = this.selectedProfessionIds.map(id => {
						const option = optionMap[String(id)] || {}
						return {
							id,
							categoryName: option.categoryName || '',
							categoryCode: option.categoryCode || ''
						}
					}).filter(item => item.categoryName)
					this.professionPopupVisible = false
					uni.showToast({
						title: '已保存',
						icon: 'success'
					})
				} catch (error) {
					console.error('保存专业方向设置失败', error)
					uni.showToast({
						title: error.msg || '保存失败',
						icon: 'none'
					})
				} finally {
					this.professionSubmitting = false
				}
			},
			async handleLoginSwitchChange(e) {
				const newValue = e.detail.value
				const oldValue = !newValue
				try {
					const res = await this.$request.post('/wechat/user/editUserSetting', {
						id: this.settingId,
						loginAccessRestrictions: newValue ? 1 : 0
					})
					if (!res || res.code !== 200) {
						this.visit.login = oldValue
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						})
						return
					}
					uni.showToast({
						title: '已保存',
						icon: 'success'
					})
				} catch (error) {
					this.visit.login = oldValue
					console.error('更新用户设置信息失败', error)
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				}
			},

			onOfficialAccountLoad(e) {
				console.log('official-account load', e)
			},
			onOfficialAccountError(e) {
				console.error('official-account error', e)
				// 提示用户组件显示失败的原因（可选）
				const {
					status,
					errMsg
				} = e.detail || {}
				console.log(`公众号组件加载失败: status=${status}, errMsg=${errMsg}`)
			},
			async handleSaveSwitchChange(e) {
				const key = e.currentTarget.dataset.key
				const newValue = e.detail.value
				const oldValue = !newValue
				try {
					// 映射前端字段到后端字段
					const fieldMap = {
						watermarkImage: 'watermarkImage',
						noWatermarkSmall: 'noWatermarkImage',
						noWatermarkOrigin: 'waterlessOriginalImage',
						video: 'videoDownload',
						downloadWorks: 'downloadWorks'
					}

					const res = await this.$request.post('/wechat/user/editUserSetting', {
						id: this.settingId,
						[fieldMap[key]]: newValue ? 1 : 0
					})

					if (!res || res.code !== 200) {
						this.save[key] = oldValue
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						})
						return
					}

					this.save[key] = newValue
					uni.showToast({
						title: '已保存',
						icon: 'success'
					})
				} catch (error) {
					this.save[key] = oldValue
					console.error('更新用户设置信息失败', error)
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	.page {
		padding: 20rpx;
		background: #f6f6f6;
	}

	.card {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}

	.card-title {
		font-size: 26rpx;
		padding: 20rpx;
		background: #f6f6f6;
	}

	.item {
		font-size: 48rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.item:last-child {
		border-bottom: 0;
	}

	.left {
		flex: 1;
	}
	/* 通用 switch 样式 */
switch {
  --el-switch-on-color: #F37738 !important;
  --el-switch-on-border-color: #F37738 !important;
}
	.label {
		font-size: 30rpx;
		font-weight: 500;
	}

	.desc {
		font-size: 24rpx;
		color: #888;
		margin-top: 10rpx;
	}

	.link {
		color: #007aff;
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	.right-link {
		color: #888;
	}

	.profession-setting {
		align-items: flex-start;
	}

	.selected-tags {
		display: flex;
		flex-wrap: wrap;
		margin-top: 16rpx;
	}

	.selected-tag {
		max-width: 280rpx;
		margin: 0 12rpx 12rpx 0;
		padding: 8rpx 18rpx;
		border-radius: 999rpx;
		background: #fff4ed;
		color: #F37738;
		font-size: 24rpx;
		line-height: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.empty-profession {
		margin-top: 16rpx;
		font-size: 24rpx;
		color: #999;
	}

	.edit-btn {
		flex-shrink: 0;
		margin-left: 24rpx;
		padding: 10rpx 26rpx;
		border: 1px solid #F37738;
		border-radius: 999rpx;
		color: #F37738;
		font-size: 26rpx;
		line-height: 36rpx;
	}

	.profession-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 99;
		display: flex;
		align-items: flex-end;
		background: rgba(0, 0, 0, 0.45);
	}

	.profession-popup {
		width: 100%;
		max-height: 78vh;
		padding: 28rpx 28rpx 36rpx;
		border-radius: 28rpx 28rpx 0 0;
		background: #fff;
		box-sizing: border-box;
	}

	.popup-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.popup-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #222;
	}

	.popup-close {
		width: 56rpx;
		height: 56rpx;
		color: #999;
		font-size: 44rpx;
		line-height: 52rpx;
		text-align: center;
	}

	.popup-subtitle {
		margin-top: 8rpx;
		color: #888;
		font-size: 24rpx;
		line-height: 34rpx;
	}

	.category-panel {
		display: flex;
		height: 560rpx;
		margin-top: 28rpx;
		border-radius: 16rpx;
		overflow: hidden;
		background: #f7f7f7;
	}

	.left-scroll {
		width: 210rpx;
		height: 560rpx;
		background: #f4f4f4;
	}

	.left-item {
		position: relative;
		padding: 28rpx 20rpx;
		color: #555;
		font-size: 26rpx;
		line-height: 34rpx;
	}

	.left-item.active {
		background: #fff;
		color: #F37738;
		font-weight: 600;
	}

	.left-item.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 26rpx;
		width: 6rpx;
		height: 36rpx;
		border-radius: 0 6rpx 6rpx 0;
		background: #F37738;
	}

	.right-scroll {
		flex: 1;
		height: 560rpx;
		background: #fff;
	}

	.chip-wrap {
		display: flex;
		flex-wrap: wrap;
		padding: 24rpx 20rpx;
	}

	.profession-chip {
		max-width: 360rpx;
		margin: 0 16rpx 18rpx 0;
		padding: 14rpx 22rpx;
		border: 1px solid #e7e7e7;
		border-radius: 999rpx;
		background: #fff;
		color: #333;
		font-size: 25rpx;
		line-height: 34rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.profession-chip.active {
		border-color: #F37738;
		background: #fff4ed;
		color: #F37738;
	}

	.category-empty {
		height: 360rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 26rpx;
	}

	.popup-footer {
		display: flex;
		gap: 20rpx;
		margin-top: 28rpx;
	}

	.cancel-btn,
	.save-btn {
		flex: 1;
		height: 88rpx;
		border-radius: 999rpx;
		font-size: 30rpx;
		line-height: 88rpx;
	}

	.cancel-btn {
		background: #f5f5f5;
		color: #555;
	}

	.save-btn {
		background: #F37738;
		color: #fff;
	}

	.save-btn[disabled] {
		opacity: 0.7;
	}
</style>
