<template>
  <view class="storage-warning-container" v-if="isVisible">
    <view class="modal-overlay" @click="handleCancel"></view>
    <view class="modal-content">
      <view class="modal-title">{{ modalData.title }}</view>
      <view class="modal-text">{{ modalData.content }}</view>
      <!-- 存储空间扩容选项 -->
      <view class="expand-options" v-if="!globalVisible && type === 'expand' && spaceOptions.length">
		  <view class="flow-info-card flow-description">
		  	<view class="flow-info-title">计费说明</view>
		  	<view class="flow-info-price">按0.2元/GB/月x会员剩余有效月计算</view>
		  	<view class="flow-info-text">(不足31天按一个月计算)</view>
		  </view>
        <view class="option-item expand" v-for="item in spaceOptions" :key="item.id"
          :class="{ selected: selectedOption && selectedOption.id === item.id }" @click="selectOption(item)">
          <text class="option-size">{{ item.space }}GB</text>
          <text class="option-desc">{{ item.month }}个月</text>
          <text class="option-price">¥{{ item.price }}</text>
        </view>
      </view>
      
      <!-- 流量包选项 -->
      <view class="flow-options" v-if="!globalVisible && type === 'flow' && spaceOptions.length">
        <view class="option-item flow" v-for="item in spaceOptions" :key="item.id"
          :class="{ selected: selectedOption && selectedOption.id === item.id }" @click="selectOption(item)">
          <view class="option-content">
            <view class="option-main">
              <text class="option-size">{{ item.space }} GB</text>
              <text class="option-unit-price">¥{{ (item.price / Number(item.space)).toFixed(2) }} / GB</text>
            </view>
            <text class="option-price">¥{{ item.price }}</text>
          </view>
          <text class="option-desc">有效期：{{ item.expireDays || 365 }}天</text>
          <view class="option-checkbox" v-if="selectedOption && selectedOption.id === item.id">
			<image src="/static/common/切换账号选中.png" class="checkbox-icon"></image>
          </view>
        </view>
      </view>
      <view class="modal-buttons">
        <button class="btn btn-cancel" @click="handleCancel">{{ modalData.cancelText || cancelText }}</button>
        <button class="btn btn-confirm" @click="handleConfirm">{{ modalData.confirmText || confirmText }}</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'StorageWarning',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'storage',
      validator: function (value) {
        return ['storage', 'upgrade', 'expire', 'quota', 'worksout', 'collectionout', 'expand', 'flow', 'flowout', ''].includes(value);
      }
    },
    cancelText: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      globalVisible: false,
      globalData: {
        msg: '',
        data: ''
      },
      selectedOption: null,
      spaceOptions: []
    }
  },
  computed: {
    isVisible() {
      return this.visible || this.globalVisible;
    },
    modalData() {
      if (this.globalVisible) {
        return {
          title: '提示',
          content: this.globalData.msg || '',
          cancelText: '取消',
          confirmText: '确定'
        };
      }

      const typeMap = {
        storage: {
          title: '作品云存储不足',
          content: '您的云存储已用完，请及时购买内存空间，否则将影响账户正常使用。',
          cancelText: '暂不升级',
          confirmText: '立即升级'
        },
        upgrade: {
          title: '无法使用团队功能',
          content: '升级会员可享受更多存储空间和专属功能，提升您的创作体验。',
          cancelText: '暂不升级',
          confirmText: '立即升级'
        },
        worksout: {
          title: '作品数量上限',
          content: '您的作品数量以达到上限，升级会员可享受更多作品数量。',
          cancelText: '稍后再说',
          confirmText: '立即续费'
        },
        collectionout: {
          title: '作品集数量上限',
          content: '您的作品集数量以达到上限，升级会员可享受更多作品集数量。',
          cancelText: '稍后再说',
          confirmText: '立即续费'
        },
        expand: {
          title: '选择扩容大小',
          content: '扩容价格将根据当前剩余会员有效月实时计算',
          cancelText: '取消',
          confirmText: '确认购买'
        },
        flow: {
          title: '选择新增流量包',
          content: '流量请在有效期内使用，逾期作废',
          cancelText: '取消',
          confirmText: '确认购买'
        },
        flowout: {
          title: '作品流量不足',
          content: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
          cancelText: '稍后',
          confirmText: '去购买'
        }
      };

      return typeMap[this.type] || typeMap.storage;
    }
  },
  mounted() {
    uni.$on('show-storage-warning', this.handleGlobalShow);
    uni.$on('hide-storage-warning', this.handleGlobalHide);
    if (this.type === 'expand' || this.type === 'flow') {
      this.fetchSpaceOptions();
    }
  },
  beforeDestroy() {
    uni.$off('show-storage-warning', this.handleGlobalShow);
    uni.$off('hide-storage-warning', this.handleGlobalHide);
  },
  methods: {
    handleGlobalShow(payload) {
      this.globalVisible = true;
      this.globalData = { ...payload };
    },
    handleGlobalHide() {
      this.globalVisible = false;
      this.globalData = {
        msg: '',
        data: ''
      };
    },
    handleCancel() {
      if (this.globalVisible) {
        uni.$emit('hide-storage-warning');
        return;
      }
      this.$emit('cancel');
    },
    handleConfirm() {
      if (this.globalVisible) {
        const data = this.globalData.data;
        uni.$emit('hide-storage-warning');
        if (data) {
          uni.navigateTo({
            url: data
          });
        }
        return;
      }
      if (this.type === 'flowout') {
        // 跳转到流量购买页面
        uni.navigateTo({
          url: '/subpkg-profile/pages/storage-management'
        });
        this.$emit('cancel');
        return;
      }
      const payload = this.type === 'expand' ? { option: this.selectedOption } : (this.type === 'flow' ? { packageId: this.selectedOption.id } : undefined);
      this.$emit('confirm', payload);
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    async fetchSpaceOptions() {
      try {
        const url = this.type === 'flow' ? `/wechat/flow/findPackage` : `/wechat/space/list`;
        const res = await this.$request.get(url);
        let list = res.data || [];
        
        if (this.type === 'flow') {
          // 流量包数据结构适配
          list = list.map(item => ({
            id: item.id,
            space: item.packageName.replace('GB', ''),
            month: Math.round(item.expireDays / 30),
            price: item.price,
            expireDays: item.expireDays
          }));
        } else {
          // 存储空间数据处理
          list = list.filter(item => item.isActive === '1');
          list = list.sort((a, b) => {
            const orderDiff = (a.sortOrder || 0) - (b.sortOrder || 0);
            if (orderDiff !== 0) return orderDiff;
            return (a.space || 0) - (b.space || 0);
          });
        }
        
        this.spaceOptions = list;
        if (!this.selectedOption && this.spaceOptions.length) {
          this.selectedOption = this.spaceOptions[0];
        }
      } catch (e) { }
    }
  }
}
</script>

<style lang="scss" scoped>
.storage-warning-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.5s ease;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.modal-content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius:30rpx;
  padding: 40rpx;
  box-sizing: border-box;
  z-index: 10000;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  animation: slideUp 0.3s ease forwards;
  margin: 20rpx;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 36rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
  text-align: center;
}

.modal-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 40rpx;
  text-align: center;
  padding: 0 20rpx;
}

.expand-options {
  margin-bottom: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0;
}

.flow-options {
  margin-bottom: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0;
}

/* 存储空间选项样式 */
.option-item.expand {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 24rpx 28rpx;
  border-radius: 16rpx;
  border: 2rpx solid #f0f0f0;
  text-align: center;
  transition: all 0.3s ease;
}

.option-item.expand.selected {
  border-color:rgba(243, 119, 56);
  background-color: rgba(243, 119, 56,0.2);
}

.option-item.expand .option-size {
  text-align: left;
  font-size: 30rpx;
  font-weight: 600;
  color: #222;
}

.option-item.expand .option-desc {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 0;
}

.option-item.expand .option-price {
  text-align: right;
  font-size: 30rpx;
  font-weight: 600;
  color: #ff6b00;
}

/* 流量包选项样式 */
.option-item.flow {
  position: relative;
  padding: 30rpx;
  border-radius: 12rpx;
  border: 2rpx solid #e5e5e5;
  transition: all 0.3s ease;
}

.option-item.flow.selected {
  border-color: rgba(243, 119, 56);
  background-color: rgba(243, 119, 56,0.2);
}

.option-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.option-main {
  display: flex;
  align-items: baseline;
  gap: 16rpx;
}

.option-item.flow .option-size {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.option-unit-price {
  font-size: 24rpx;
  color: #999;
}

.option-item.flow .option-price {
  font-size: 32rpx;
  font-weight: 500;
  color: rgba(243, 119, 56);
}

.option-item.flow .option-desc {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.option-checkbox {
  position: absolute;
  top: 90rpx;
  right: 30rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-icon {
  width: 40rpx;
  height: 40rpx;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  padding: 0 20rpx;
}

.btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 32rpx;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.btn-cancel {
  background-color: #333;
  color: #fff;
}

.btn-confirm {
  background-color: #F37738;
  color: #fff;
}

.btn:active {
  transform: scale(0.96);
}

.flow-info-card {
		margin-bottom: 20rpx;
		padding: 20rpx;
		background-color: #f9f9f9;
		border-radius: 10rpx;
	}	
.flow-info-card.flow-description {
	border-left: 4rpx solid rgba(243, 119, 56);
	border-top: 1rpx solid #e6f7ff;
	border-right: 1rpx solid #e6f7ff;
	border-bottom: 1rpx solid #e6f7ff;
	border-radius: 10rpx;
	background-color: #ffffff;
}
.flow-info-title {
	font-size: 30rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 12rpx;	
}
.flow-info-price{
	font-size: 28rpx;
	color:#F37738;
	line-height: 45rpx;
	margin-bottom: 12rpx;
	white-space: normal;
	word-break: break-all;	
	font-weight: 600;
}
.flow-info-text {
	font-size: 26rpx;
	color: #666;
	line-height: 40rpx;
	margin-bottom: 12rpx;
	white-space: normal;
	word-break: break-all;	
}	
</style>
