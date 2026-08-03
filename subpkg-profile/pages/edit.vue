<template>
	<view class="page">
		<!-- Group 1 -->
		<view class="cell-group">
			<view class="cell-item" @click="chooseAvatar">
				<text class="cell-label">头像</text>
				<view class="cell-right">
					<image class="avatar" :src="resolveUrl(profileData.avatar, '/static/default-avatar.png')"
						mode="aspectFill" />
					<text class="arrow"></text>
				</view>
			</view>

			<view class="cell-item">
				<text class="cell-label">昵称</text>
				<view class="cell-right">
					<input class="cell-input" v-model="profileData.nickname" placeholder="轻触摸编辑" maxlength="8" @input="checkNicknameLength" />
					<!-- <text class="arrow"></text> -->
				</view>
			</view>

			<view class="cell-item" @click="openTitleModal">
				<text class="cell-label">主页简介</text>
				<view class="cell-right">
					<view v-if="profileData.title" class="cell-text">{{ profileData.title }}</view>
					<text v-else class="cell-placeholder">轻触摸编辑</text>
					<!-- <text class="arrow"></text> -->
				</view>
			</view>

			<view class="cell-item">
				<text class="cell-label">手机号</text>
				<view class="cell-right">
					<input class="cell-input" v-model="profileData.phone" type="number" maxlength="11"
						placeholder="轻触摸编辑" />
					<!-- <text class="arrow"></text> -->
				</view>
			</view>

			<view class="cell-item">
				<text class="cell-label">微信号</text>
				<view class="cell-right">
					<input class="cell-input" v-model="profileData.wechat" placeholder="轻触摸编辑" />
					<!-- <text class="arrow"></text> -->
				</view>
			</view>

			<view class="cell-item">
				<text class="cell-label">地区</text>
				<picker
					class="region-picker"
					mode="multiSelector"
					range-key="name"
					:range="areaColumns"
					:value="areaIndexes"
					@columnchange="onAreaColumnChange"
					@change="onAreaConfirm"
					@cancel="onAreaCancel"
				>
					<view class="cell-right">
						<view v-if="selectedRegionText" class="cell-text">{{ selectedRegionText }}</view>
						<text v-else class="cell-placeholder">请选择地区</text>
						<text class="arrow"></text>
					</view>
				</picker>
			</view>
		</view>

		<view class="bottom-save">
			<view class="save-btn-bottom" @click="saveProfile">
				<text>保存</text>
			</view>
		</view>

		<!-- 简介编辑弹窗 -->
		<view class="modal-mask" v-if="showTitleModal" @click="closeTitleModal" @touchmove.stop.prevent>
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<view class="header-left">
						<view class="close-btn" @click="closeTitleModal">
							<image src="/static/icon/关闭.svg" class="close-icon" mode="aspectFit" />
						</view>
						<text class="modal-title">主页简介</text>
					</view>
					<view class="confirm-btn" @click="confirmTitle">完成</view>
				</view>
				<view class="modal-body">
					<textarea class="modal-textarea" v-model="tempTitle" placeholder="请填写介绍" maxlength="50"
						:disable-default-padding="true"></textarea>
					<view class="modal-footer">
						<view class="char-count">{{ tempTitle.length }}/50</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/config/env.js';

export default {
	data() {
		return {
			ossBaseUrl: config.aliyunUrl,
			profileData: {
				userId: '',
				avatar: '/static/default-avatar.png',
				avatarUrl: '', // 存储后端返回的相对路径
				nickname: '',
				title: '',
				wechat: '',
				phone: '',
				background: ''
			},
			showTitleModal: false,
			tempTitle: '',
			areaTree: [],
			areaColumns: [[], [], []],
			areaIndexes: [0, 0, 0],
			lastAreaIndexes: [0, 0, 0],
			selectedRegionId: '',
			selectedRegionText: '',
			originalRegionId: '',
			regionChanged: false,
			regionLoading: false
		};
	},
	computed: {
	},
	onLoad() {
		this.initData();
	},
	methods: {
		openTitleModal() {
				this.tempTitle = this.profileData.title || '';
				this.showTitleModal = true;
			},
			closeTitleModal() {
				this.showTitleModal = false;
			},
			confirmTitle() {
				this.profileData.title = this.tempTitle;
				this.showTitleModal = false;
			},
			checkNicknameLength() {
				if (this.profileData.nickname.length > 10) {
					uni.showToast({
						title: '昵称不能超过10个字符',
						icon: 'none'
					});
				}
			},
		resolveUrl(url, defaultUrl = '') {
			if (!url || url === defaultUrl) return defaultUrl;
			if (/^(http|https|wxfile|data):/.test(url)) {
				return url;
			}
			return this.ossBaseUrl + url;
		},
		initData() {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.loadProfile();
				this.loadAreaTree();
				this.loadUserRegion();
			}
		},
		loadProfile() {
			return this.$request.get(`/wechat/user/getUserInfo`).then(res => {
				const storageUserInfo = uni.getStorageSync('userInfo') || {};
				const data = res.data || {};
				this.profileData = {
					userId: data.userId || data.id || this.profileData.userId || storageUserInfo.userId || storageUserInfo.id || '',
					avatar: data.avatarUrl || '/static/default-avatar.png',
					avatarUrl: data.avatarUrl || '',
					nickname: data.nickName || '',
					title: data.title || '',
					wechat: data.wxNumber || '',
					phone: data.phone || '',
					background: data.homeBackground || ''
					};
				});
		},
		async loadUserRegion() {
			try {
				const res = await this.$request.get('/wechat/basic/userRegion');
				const data = res.data || {};
				const regionId = data.regionId || data.districtId || data.cityId || data.provinceId || '';
				this.selectedRegionId = regionId ? String(regionId) : '';
				this.originalRegionId = this.selectedRegionId;
				this.regionChanged = false;
				this.selectedRegionText = data.fullName || this.buildRegionText(data);
				if (data.userId && !this.profileData.userId) {
					this.profileData.userId = data.userId;
				}
				this.syncSelectedRegionIndexes();
			} catch (e) {
				// 地区为空或接口异常时保留可编辑状态。
			}
		},
		async loadAreaTree() {
			if (this.regionLoading) {
				return;
			}
			this.regionLoading = true;
			try {
				const res = await this.$request.get('/wechat/basic/areaTree');
				this.areaTree = this.normalizeAreas(res.data || []);
				this.updateAreaColumns(this.areaIndexes);
				this.syncSelectedRegionIndexes();
			} catch (e) {
				this.areaTree = [];
				this.areaColumns = [[], [], []];
				this.areaIndexes = [0, 0, 0];
				this.lastAreaIndexes = [0, 0, 0];
			} finally {
				this.regionLoading = false;
			}
		},
		buildRegionText(data) {
			return [
				data.provinceName,
				data.cityName,
				data.districtName || data.regionName
			].filter(Boolean).join('');
		},
		normalizeAreas(list) {
			return (list || []).map(item => ({
				id: item.id,
				name: item.name,
				type: item.type,
				parentId: item.parentId,
				children: this.normalizeAreas(item.children || [])
			}));
		},
		updateAreaColumns(indexes) {
			const provinceIndex = indexes[0] || 0;
			const cityIndex = indexes[1] || 0;
			const provinces = this.areaTree;
			const cities = provinces[provinceIndex] && provinces[provinceIndex].children && provinces[provinceIndex].children.length
				? provinces[provinceIndex].children
				: [];
			const areas = cities[cityIndex] && cities[cityIndex].children && cities[cityIndex].children.length
				? cities[cityIndex].children
				: [];
			this.areaColumns = [provinces, cities, areas];
		},
		onAreaColumnChange(event) {
			const column = event.detail.column;
			const value = event.detail.value;
			const indexes = this.areaIndexes.slice();
			indexes[column] = value;
			if (column === 0) {
				indexes[1] = 0;
				indexes[2] = 0;
			}
			if (column === 1) {
				indexes[2] = 0;
			}
			this.areaIndexes = indexes;
			this.updateAreaColumns(indexes);
		},
		onAreaConfirm(event) {
			const indexes = event.detail.value || this.areaIndexes;
			this.areaIndexes = indexes;
			this.updateAreaColumns(indexes);
			const path = this.getSelectedRegionPath(indexes);
			const selected = path[path.length - 1];
			if (!selected) {
				uni.showToast({
					title: '请选择地区',
					icon: 'none'
				});
				return;
			}
			this.selectedRegionId = String(selected.id);
			this.selectedRegionText = path.map(item => item.name).join('');
			this.lastAreaIndexes = indexes.slice();
			this.regionChanged = this.selectedRegionId !== String(this.originalRegionId || '');
		},
		onAreaCancel() {
			this.areaIndexes = this.lastAreaIndexes.slice();
			this.updateAreaColumns(this.areaIndexes);
		},
		getSelectedRegionPath(indexes) {
			const province = this.areaColumns[0][indexes[0] || 0];
			const city = this.areaColumns[1][indexes[1] || 0];
			const area = this.areaColumns[2][indexes[2] || 0];
			return [province, city, area].filter(Boolean);
		},
		syncSelectedRegionIndexes() {
			if (!this.selectedRegionId || !this.areaTree.length) {
				return;
			}
			const match = this.findRegionIndexes(this.selectedRegionId);
			if (!match) {
				return;
			}
			this.areaIndexes = match;
			this.lastAreaIndexes = match.slice();
			this.updateAreaColumns(match);
		},
		findRegionIndexes(regionId) {
			const target = String(regionId);
			for (let provinceIndex = 0; provinceIndex < this.areaTree.length; provinceIndex += 1) {
				const province = this.areaTree[provinceIndex];
				if (String(province.id) === target) {
					return [provinceIndex, 0, 0];
				}
				const cities = province.children || [];
				for (let cityIndex = 0; cityIndex < cities.length; cityIndex += 1) {
					const city = cities[cityIndex];
					if (String(city.id) === target) {
						return [provinceIndex, cityIndex, 0];
					}
					const areas = city.children || [];
					for (let areaIndex = 0; areaIndex < areas.length; areaIndex += 1) {
						if (String(areas[areaIndex].id) === target) {
							return [provinceIndex, cityIndex, areaIndex];
						}
					}
				}
			}
			return null;
		},
		goBack() {
			uni.navigateBack();
		},
		async saveProfile() {
			if (!this.profileData.nickname) {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				});
				return;
			}
			if (this.profileData.nickname.length > 10) {
				uni.showToast({
					title: '昵称不能超过10个字符',
					icon: 'none'
				});
				return;
			}

			// 手机号校验
			if (this.profileData.phone && !/^1[3-9]\d{9}$/.test(this.profileData.phone)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			if (this.regionChanged && !this.selectedRegionId) {
				uni.showToast({
					title: '请选择地区',
					icon: 'none'
				});
				return;
			}

			const postData = {
				nickName: this.profileData.nickname,
				avatarUrl: this.profileData.avatarUrl,
				phone: this.profileData.phone,
				wxNumber: this.profileData.wechat,
				title: this.profileData.title
			};

			uni.showLoading({
				title: '保存中...'
			});

			try {
				await this.$request.post('/wechat/user/editUserInfo', postData);
				if (this.regionChanged) {
					const userInfo = uni.getStorageSync('userInfo') || {};
					const userId = this.profileData.userId || userInfo.userId || userInfo.id;
					if (!userId) {
						throw { msg: '用户信息不存在' };
					}
					await this.$request.post('/wechat/basic/saveUserRegion', {
						userId: Number(userId),
						regionId: Number(this.selectedRegionId)
					});
				}
				uni.hideLoading();
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				});
				// 更新本地存储
				const userInfo = uni.getStorageSync('userInfo') || {};
				uni.setStorageSync('userInfo', {
					...userInfo,
					...postData,
					regionId: this.selectedRegionId || userInfo.regionId,
					regionName: this.selectedRegionText || userInfo.regionName
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			} catch (err) {
				uni.hideLoading();
				console.error('保存失败', err);
				uni.showToast({
					title: err.msg || '保存失败',
					icon: 'none'
				});
			}
		},
		uploadFile(filePath) {
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: config.baseUrl + '/wechat/basic/upload',
					filePath: filePath,
					name: 'file',
					header: {
						// 'Authorization': uni.getStorageSync('token') 
					},
					success: (uploadFileRes) => {
						try {
							const res = JSON.parse(uploadFileRes.data);
							if (res.code === 200) {
								resolve(res.msg);
							} else {
								reject(res.msg || '上传失败');
							}
						} catch (e) {
							reject('解析失败');
						}
					},
					fail: (err) => {
						reject(err);
					}
				});
			});
		},
		chooseAvatar() {
			uni.chooseMedia({
				count: 1,
				mediaType: ['image'],
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: async (res) => {
					const tempFilePath = res.tempFiles[0].tempFilePath;
					// 校验文件格式
					const allowedExtensions = ['jpg', 'jpeg', 'png'];
					const ext = tempFilePath.substring(tempFilePath.lastIndexOf('.') + 1).toLowerCase();
					if (!allowedExtensions.includes(ext)) {
						uni.showToast({
							title: '仅支持 jpg, jpeg, png 格式的图片',
							icon: 'none'
						});
						return;
					}

					// 1. 先展示临时路径，提升用户体验
					this.profileData.avatar = tempFilePath;

					uni.showLoading({
						title: '上传中...'
					});

					try {
						// 2. 上传文件
						const serverPath = await this.uploadFile(tempFilePath);
						// 3. 上传成功，将两个字段都更新为后端返回的相对路径
						// 这样 displayAvatar 计算属性会走 "拼接 OSS 前缀" 的逻辑
						this.profileData.avatarUrl = serverPath;
						this.profileData.avatar = serverPath;
						uni.hideLoading();
					} catch (e) {
						uni.hideLoading();
						uni.showToast({
							title: '头像上传失败',
							icon: 'none'
						});
					}
				}
			});
		}
	},
};
</script>

<style scoped>
.page {
	background-color: #f8f8f8;
	min-height: 100vh;
	padding-bottom: 150rpx;
}

.spacer {
	height: 20rpx;
}

.cell-group {
	background-color: #fff;
	padding-left: 32rpx;
}

.cell-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 110rpx;
	padding-right: 32rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.cell-group .cell-item:last-child {
	border-bottom: none;
}

.cell-label {
	font-size: 30rpx;
	color: #333;
}

.cell-right {
	display: flex;
	align-items: center;
	flex: 1;
	justify-content: flex-end;
}

.region-picker {
	flex: 1;
}

.cell-input {
	text-align: right;
	font-size: 28rpx;
	color: #333;
	flex: 1;
	margin-right: 10rpx;
}

.cell-placeholder {
	font-size: 28rpx;
	color: #999;
	margin-right: 10rpx;
}

.avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-right: 10rpx;
	background-color: #f0f0f0;
}

.bg-preview-box {
	width: 80rpx;
	height: 80rpx;
	margin-right: 10rpx;
	border-radius: 8rpx;
	overflow: hidden;
}

.bg-preview {
	width: 100%;
	height: 100%;
}

.arrow {
	width: 16rpx;
	height: 16rpx;
	border-top: 2rpx solid #ccc;
	border-right: 2rpx solid #ccc;
	transform: rotate(45deg);
}

.bottom-save {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 30rpx;
	background-color: rgba(255, 255, 255, 1);
	border-top: 1rpx solid rgba(240, 240, 240, 1);
	z-index: 99;
}

.save-btn-bottom {
	width: 100%;
	height: 88rpx;
	background-color: rgba(243, 119, 56, 1);
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(255, 255, 255, 1);
	font-size: 32rpx;
	font-weight: 500;
}

.cell-text {
				text-align: right;
				font-size: 28rpx;
				color: #333;
				flex: 1;
				margin-right: 10rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				max-width: 400rpx;
				line-height: 1.4;
			}

		.text-ellipsis {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 400rpx;
		}

/* Modal Styles */
.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal-content {
	width: 640rpx;
	height: 900rpx;
	background: #fff;
	border-radius: 24rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.modal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx 30rpx 20rpx;
}

.header-left {
	display: flex;
	align-items: center;
}

.close-btn {
	margin-right: 20rpx;
	padding: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.close-icon {
	width: 40rpx;
	height: 40rpx;
}

.modal-title {
	font-size: 32rpx;
	font-weight: 500;
	color: #999;
}

.confirm-btn {
	background: #000;
	color: #fff;
	font-size: 28rpx;
	padding: 12rpx 36rpx;
	border-radius: 999px;
	font-weight: 500;
}

.modal-body {
	flex: 1;
	padding: 20rpx 30rpx 40rpx;
	display: flex;
	flex-direction: column;
}

.modal-textarea {
	flex: 1;
	width: 100%;
	font-size: 30rpx;
	color: #333;
	line-height: 1.6;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20rpx;
}

.char-count {
	font-size: 24rpx;
	color: #999;
}
</style>
