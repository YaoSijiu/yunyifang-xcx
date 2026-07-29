<script>
export default {
	globalData: {
		launchOptions: null,
		updateManagerInited: false,
		isUpdateModalShowing: false,
		pendingUpdateModal: null,
	},
	onLaunch: function (options) {
		this.globalData.launchOptions = options || null;
		console.log('App Launch')
		this.checkMiniProgramUpdate()
	},
	onShow: function (options) {
		this.globalData.launchOptions = options || this.globalData.launchOptions;
		console.log('App Show')
		this.checkMiniProgramUpdate()
	},
	onHide: function () {
		console.log('App Hide')
	},
	methods: {
		checkMiniProgramUpdate() {
			console.log("我触发了",wx.canIUse('getUpdateManager'))
			console.log(this.globalData.updateManagerInited)
			// #ifdef MP-WEIXIN
			if (!wx.canIUse('getUpdateManager')) return
			if (this.globalData.updateManagerInited) return

			this.globalData.updateManagerInited = true

			const updateManager = wx.getUpdateManager()

			updateManager.onCheckForUpdate((res) => {
				if (!res.hasUpdate) return

				this.showUpdateModal({
					title: '更新提示',
					content: '检测到新版本，正在下载更新包。下载完成后请重新进入小程序。',
					showCancel: false,
					confirmText: '知道了'
				})
			})

			updateManager.onUpdateReady(() => {
				this.showUpdateModal({
					title: '更新提示',
					content: '新版本已准备好，请点击立即更新并重新进入小程序。',
					showCancel: false,
					confirmText: '立即更新',
					success: (res) => {
						if (res.confirm) {
							updateManager.applyUpdate()
						}
					}
				})
			})

			updateManager.onUpdateFailed(() => {
				this.showUpdateModal({
					title: '更新提示',
					content: '新版本下载失败，请关闭小程序后重新进入。',
					showCancel: false,
					confirmText: '知道了'
				})
			})
			// #endif
		},
		showUpdateModal(options) {
			if (this.globalData.isUpdateModalShowing) {
				this.globalData.pendingUpdateModal = options
				return
			}

			this.globalData.isUpdateModalShowing = true
			const complete = options.complete

			uni.showModal(Object.assign({}, options, {
				complete: (res) => {
					this.globalData.isUpdateModalShowing = false
					if (typeof complete === 'function') {
						complete(res)
					}

					const nextModal = this.globalData.pendingUpdateModal
					this.globalData.pendingUpdateModal = null
					if (nextModal) {
						setTimeout(() => {
							this.showUpdateModal(nextModal)
						}, 300)
					}
				}
			}))
		}
	}
}
</script>

<style>
/*每个页面公共css */
page,
view,
text,
button,
input,
textarea,
picker,
navigator,
label,
form,
radio,
checkbox,
cover-view,
cover-image,
scroll-view,
swiper,
swiper-item {
  font-family: "PingFangSC-Medium", "PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif !important;
}

/* 隐藏所有滚动条 - 适用于所有平台 */
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

/* 为不同平台添加滚动条隐藏样式 */
* {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  overflow: -moz-scrollbars-none !important;
  -webkit-overflow-scrolling: touch;
}

page {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

/* 确保在手机端不显示滚动条 */
@media (max-width: 767px) {
  /* 强制隐藏所有滚动条 */
  * {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    overflow: -moz-scrollbars-none !important;
  }
  
  /* 确保页面元素不显示滚动条 */
  body, html, page {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  
  /* 隐藏手机端特有的滚动条 */
  ::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  /* 针对所有可能的滚动容器 */
  .scroll-view, .list-container, .content-wrapper, 
  .swiper-item, .work-grid, .collection-detail, 
  .tab-content, .tag-tabs, .main-swiper,
  .page, .page-container, .container {
    overflow: auto !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    -webkit-overflow-scrolling: touch;
  }
  
  /* 确保这些容器也不显示滚动条 */
  .scroll-view::-webkit-scrollbar,
  .list-container::-webkit-scrollbar,
  .content-wrapper::-webkit-scrollbar,
  .swiper-item::-webkit-scrollbar,
  .work-grid::-webkit-scrollbar,
  .collection-detail::-webkit-scrollbar,
  .tab-content::-webkit-scrollbar,
  .tag-tabs::-webkit-scrollbar,
  .main-swiper::-webkit-scrollbar,
  .page::-webkit-scrollbar,
  .page-container::-webkit-scrollbar,
  .container::-webkit-scrollbar {
    display: none !important;
  }
}

/* 针对电脑端小程序的滚动条隐藏 */
@media (min-width: 768px) {
  /* 强制隐藏所有滚动条 */
  * {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  
  /* 确保页面元素不显示滚动条 */
  body, html, page {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  
  /* 隐藏微信小程序电脑端特有的滚动条 */
  ::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  /* 针对所有可能的滚动容器 */
  .scroll-view, .list-container, .content-wrapper, 
  .swiper-item, .work-grid, .collection-detail, 
  .tab-content, .tag-tabs, .main-swiper,
  .page, .page-container, .container {
    overflow: auto !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    -webkit-overflow-scrolling: touch;
  }
  
  /* 确保这些容器也不显示滚动条 */
  .scroll-view::-webkit-scrollbar,
  .list-container::-webkit-scrollbar,
  .content-wrapper::-webkit-scrollbar,
  .swiper-item::-webkit-scrollbar,
  .work-grid::-webkit-scrollbar,
  .collection-detail::-webkit-scrollbar,
  .tab-content::-webkit-scrollbar,
  .tag-tabs::-webkit-scrollbar,
  .main-swiper::-webkit-scrollbar,
  .page::-webkit-scrollbar,
  .page-container::-webkit-scrollbar,
  .container::-webkit-scrollbar {
    display: none !important;
  }
}

/* 隐藏文本区域的滚动条 */
textarea::-webkit-scrollbar {
  display: none !important;
}

/* 隐藏iframe的滚动条 */
iframe::-webkit-scrollbar {
  display: none !important;
}

/* 隐藏select元素的滚动条 */
select::-webkit-scrollbar {
  display: none !important;
}

/* 隐藏所有可能的滚动容器 */
::-webkit-scrollbar-track {
  display: none !important;
}

::-webkit-scrollbar-thumb {
  display: none !important;
}

::-webkit-scrollbar-button {
  display: none !important;
}

::-webkit-scrollbar-corner {
  display: none !important;
}
</style>
