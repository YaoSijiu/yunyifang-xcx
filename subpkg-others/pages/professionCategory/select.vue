<template>
	<view class="select-page">

		<TitleBar :fixed="true" />

		<view class="location-row enter-down">
			<image 
			  class="location-icon" 
			  src="/static/icon/位置.png" 
			  mode="aspectFit"
			></image>
			<picker
				class="location-picker"
				mode="multiSelector"
				range-key="name"
				:range="areaColumns"
				:value="areaIndexes"
				@columnchange="onAreaColumnChange"
				@change="onAreaConfirm"
			>
				<view class="location-pill">
					<text>{{ selectedRegionText || '请选择地区' }}</text>
					<view class="arrow-down"></view>
				</view>
			</picker>
		</view>

		<view class="choice-wrap">
			<view
				class="choice-circle service enter-pop"
				:class="{ active: selectedRole === 'service' }"
				@click="selectRole('service')"
			>
				<!-- <view class="choice-ring"></view> -->
				<text>找服务</text>
				<!-- <view class="choice-check"></view> -->
			</view>
			<view
				class="choice-circle project enter-pop delay"
				:class="{ active: selectedRole === 'project' }"
				@click="selectRole('project')"
			>
				<!-- <view class="choice-ring"></view> -->
				<text>找项目</text>
				<!-- <view class="choice-check"></view> -->
			</view>
			<button class="solid-btn enter-up" @click="goNext">下一步</button>
		</view>
	</view>
</template>

<script>
import request from '@/utils/request.js';
import TitleBar from '@/components/title.vue';

export default {
	components: {
		TitleBar
	},
	data() {
		return {
			selectedRole: 'service',
			checkingTaskType: false,
			areaTree: [],
			areaColumns: [[], [], []],
			areaIndexes: [0, 0, 0],
			selectedRegionId: '',
			selectedRegionText: ''
		};
	},
	onLoad() {
		this.checkHasTaskType();
		this.loadAreaTree();
	},
	methods: {
		async checkHasTaskType() {
			if (this.checkingTaskType) {
				return;
			}
			if (!uni.getStorageSync('token')) {
				return;
			}
			this.checkingTaskType = true;
			try {
				const res = await request.get('/wechat/professionCategory/hasTaskType');
				if (res.data === true) {
					uni.switchTab({
						url: '/pages/library/home'
					});
				}
			} catch (e) {
				// 保留页面可操作，避免检查接口异常时阻断用户选择。
			} finally {
				this.checkingTaskType = false;
			}
		},
		selectRole(value) {
			if (this.selectedRole === value) {
				return;
			}
			this.selectedRole = value;
		},
		async loadAreaTree() {
			try {
				const res = await request.get('/wechat/basic/areaTree');
				this.areaTree = this.normalizeAreas(res.data || []);
				this.areaIndexes = [0, 0, 0];
				this.updateAreaColumns(this.areaIndexes);
			} catch (e) {
				this.areaTree = [];
				this.areaColumns = [[], [], []];
				this.areaIndexes = [0, 0, 0];
			}
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
			this.selectedRegionId = selected ? selected.id : '';
			this.selectedRegionText = path.map(item => item.name).join('');
		},
		getSelectedRegionPath(indexes) {
			const province = this.areaColumns[0][indexes[0] || 0];
			const city = this.areaColumns[1][indexes[1] || 0];
			const area = this.areaColumns[2][indexes[2] || 0];
			return [province, city, area].filter(Boolean);
		},
		goNext() {
			if (!this.selectedRegionId) {
				uni.showToast({
					title: '请选择地区',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: `/subpkg-others/pages/professionCategory/push?role=${this.selectedRole}&regionId=${Number(this.selectedRegionId)}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.select-page {
	position: relative;
	width: 750rpx;
	min-height: 1624rpx;
	background: #ffffff;
	color: #000000;
	overflow: hidden;
}

.mock-status {
	position: absolute;
	left: 40rpx;
	top: 16rpx;
	width: 670rpx;
	height: 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.mock-time {
	font-size: 24rpx;
	line-height: 24rpx;
	color: #000000;
}

.mock-signal {
	height: 24rpx;
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.signal-bar {
	width: 6rpx;
	border-radius: 3rpx;
	background: #000000;
	align-self: flex-end;
}

.signal-bar.one {
	height: 9rpx;
}

.signal-bar.two {
	height: 12rpx;
}

.signal-bar.three {
	height: 16rpx;
}

.signal-bar.four {
	height: 20rpx;
	margin-right: 8rpx;
}

.wifi-dot {
	width: 24rpx;
	height: 18rpx;
	border-top: 4rpx solid #000000;
	border-radius: 20rpx 20rpx 0 0;
	margin-right: 10rpx;
}

.battery {
	width: 48rpx;
	height: 24rpx;
	border: 4rpx solid #000000;
	border-radius: 3rpx;
	box-sizing: border-box;
	position: relative;
}

.battery::after {
	content: '';
	position: absolute;
	right: -8rpx;
	top: 6rpx;
	width: 4rpx;
	height: 10rpx;
	background: #000000;
	border-radius: 2rpx;
}

.capsule {
	position: absolute;
	right: -3rpx;
	top: 17rpx;
	width: 197rpx;
	height: 65rpx;
	border: 1rpx solid #e1e1e1;
	border-radius: 33rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.dot-group {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.dot-group text {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background: #000000;
}

.capsule-line {
	width: 1rpx;
	height: 38rpx;
	background: #e1e1e1;
}

.circle-icon {
	width: 35rpx;
	height: 35rpx;
	border-radius: 50%;
	border: 4rpx solid #000000;
	box-sizing: border-box;
	position: relative;
}

.circle-icon::after {
	content: '';
	position: absolute;
	left: 8rpx;
	top: 8rpx;
	width: 11rpx;
	height: 11rpx;
	border-radius: 50%;
	background: #000000;
}

.location-row {
	position: absolute;
	left: 40rpx;
	top: 201rpx;
	width: 285rpx;
	height: 67rpx;
	display: flex;
	align-items: center;
}

.location-icon {
	width: 20rpx;
	height: 25rpx; 
}

.location-pill {
	position: relative;
	width: 235rpx;
	height: 48rpx;
	border-radius: 6rpx;
	background: #f7f7f7;
	display: flex;
	align-items: center;
	padding-left: 17rpx;
	box-sizing: border-box;
}

.location-picker {
	width: 235rpx;
	margin-left: 24rpx;
}

.location-pill text {
	display: block;
	width: 170rpx;
	font-size: 24rpx;
	line-height: 48rpx;
	color: #000000;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.arrow-down {
	position: absolute;
	right: 20rpx;
	top: 10rpx;
	width: 16rpx;
	height: 16rpx;
	border-right: 3rpx solid #000000;
	border-bottom: 3rpx solid #000000;
	transform: rotate(45deg);
}

.choice-wrap {
	position: absolute;
	left: 94rpx;
	top: 594rpx;
	width: 552rpx;
	height: 986rpx;
}

.choice-circle {
	position: absolute;
	top: 0;
	width: 240rpx;
	height: 240rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	box-sizing: border-box;
	border: 2rpx solid transparent;
	box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.06);
	transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1), background 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
}

.choice-circle:active {
	transform: scale(0.94);
}

.choice-circle.service {
	left: 0;
	background: #F7F7F7;
}

.choice-circle.project {
	right: 0;
	background: #F7F7F7;
}

.choice-circle.active {
	border-color: #FFE7DC;
	background: linear-gradient(135deg, #ffeee6 0%, #FFE7DC 100%);
	box-shadow: 0 24rpx 52rpx rgba(243, 119, 56, 0.28);
	transform: translateY(-10rpx) scale(1.04);
}

.choice-circle.active:active {
	transform: translateY(-6rpx) scale(0.98);
}

.choice-ring {
	position: absolute;
	left: 28rpx;
	top: 28rpx;
	width: 184rpx;
	height: 184rpx;
	border-radius: 50%;
	border: 1rpx solid rgba(255, 255, 255, 0.45);
	opacity: 0;
	transform: scale(0.82);
	transition: opacity 240ms ease, transform 240ms ease;
}

.choice-circle text {
	position: relative;
	z-index: 2;
	font-size: 36rpx;
	line-height: 66rpx;
	color: #000000;
	font-weight: 600;
	transition: color 220ms ease, transform 220ms ease;
}

.choice-circle.active text {
	color: #F37738;
	transform: scale(1.04);
}

.choice-circle.active .choice-ring {
	opacity: 1;
	transform: scale(1);
}

.choice-check {
	position: absolute;
	right: 34rpx;
	bottom: 42rpx;
	width: 28rpx;
	height: 16rpx;
	border-left: 5rpx solid #ffffff;
	border-bottom: 5rpx solid #ffffff;
	opacity: 0;
	transform: rotate(-45deg) scale(0.6);
	transition: opacity 200ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.choice-circle.active .choice-check {
	opacity: 1;
	transform: rotate(-45deg) scale(1);
}

.solid-btn {
	position: absolute;
	left: 13rpx;
	width: 536rpx;
	height: 72rpx;
	border-radius: 36rpx;
	font-size: 28rpx;
	line-height: 72rpx;
	padding: 0;
	margin: 0;
}

.solid-btn {
	top: 714rpx;
	background: #f37738;
	color: #ffffff;
	box-shadow: 0 16rpx 32rpx rgba(243, 119, 56, 0.22);
}

.solid-btn::after {
	border: 0;
}

.enter-down {
	opacity: 0;
	transform: translateY(-18rpx);
	animation: enterDown 420ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.enter-pop {
	opacity: 0;
	transform: scale(0.86);
	animation: enterPop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.enter-pop.delay {
	animation-delay: 120ms;
}

.enter-up {
	opacity: 0;
	transform: translateY(28rpx);
	animation: enterUp 520ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.solid-btn.enter-up {
	animation-delay: 220ms;
}

@keyframes enterDown {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes enterPop {
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes enterUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
