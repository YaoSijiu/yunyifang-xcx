<template>
	<view class="preview-container" :class="{ 'landscape-mode': isLandscapePreview }">
		<!-- 顶部导航栏 -->
		<view v-if="!isLandscapePreview" class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		<view class="top-nav" :style="{ top: isLandscapePreview ? '0px' : (statusBarHeight + 'px') }">
			<view class="back-btn" @click="goBack">
				<image class="back-icon" src="/static/common/left-white.png"></image>
			</view>
			<view class="page-indicator">
				<text class="page-text">{{ currentIndex + 1 }}/{{ imageUrls.length }}</text>
			</view>
		</view>

		<!-- 横屏模式提示 -->
		<view v-if="isLandscapePreview" class="landscape-tip" @click="toggleLandscapePreview">
			<text class="tip-text">退出横屏</text>
		</view>

		<!-- 媒体显示区域 -->
		<view class="image-container" 
		      @touchstart="onTouchStart" 
		      @touchend="onTouchEnd"
		      :class="{ 'landscape-mode': isLandscapePreview }">
			<swiper 
				class="image-slider" 
				:current="currentIndex" 
				@change="onSwiperChange"
				:autoplay="false" 
				:circular="false" 
				:duration="400"
				:easing-function="'ease-in-out'"
				:indicator-dots="false"
				:vertical="false">
				<swiper-item v-for="(url, index) in imageUrls" :key="index" class="slide-item">
					<image v-if="!isVideoUrl(url)" :src="url" class="preview-image"
						:class="{ 'landscape-image': isLandscapePreview }"
						:mode="isLandscapePreview ? 'aspectFit' : 'widthFix'" @click="handleImageClick(index)"
						:show-menu-by-longpress="false" />
					<video v-else :src="url" class="preview-video" controls :autoplay="false" :loop="false"
						:show-center-play-btn="true" :show-fullscreen-btn="true" :enable-progress-gesture="true"></video>
				</swiper-item>
			</swiper>
		</view>

		<!-- 右侧下载按钮 -->
		<view v-if="!isLandscapePreview" class="bottom-download" @click="download"
			:class="{ 'disabled': isDownloading }">
			<image v-if="!isDownloading" src="/static/common/下载.png" class="download-icon" mode="aspectFit"></image>
			<view v-else class="loading-spinner"></view>
		</view>

		<!-- 右下角横屏预览按钮 -->
		<view v-if="!isVideoUrl(currentImageUrl) && !isLandscapePreview && !isComputer" class="landscape-preview-btn"
			@click="toggleLandscapePreview">
			<text class="landscape-text">横屏预览</text>
		</view>

		<!-- 下载选项弹窗 -->
		<view class="download-options-popup" v-if="showDownloadOptions" @click="showDownloadOptions = false"
			@touchmove.stop.prevent>
			<view class="download-options-content" @click.stop>
				<view class="download-options-handle"></view>
				<view class="download-title">
					<view class="download-options-title">下载选项</view>
					<view class="download-options-title2" @click.stop="gotoSetting">{{isOwner?"设置访客权限":''}}</view>
				</view>
				<view class="download-options-list">
					<template v-if="!isVideoUrl(currentImageUrl)">
						<!-- 作品所有者显示所有选项 -->
						<template v-if="isOwner">
							<view class="download-option-item"
								@click="downloadImageWithOptions(true, true); showDownloadOptions = false">
								<text class="download-option-text">有水印小图(1200像素宽)</text>
							</view>
							<view class="download-option-item"
								@click="downloadImageWithOptions(false, true); showDownloadOptions = false">
								<text class="download-option-text">无水印小图(1200像素宽)</text>
							</view>
							<view class="download-option-item"
								@click="downloadImageWithOptions(false, false); showDownloadOptions = false">
								<text class="download-option-text">无水印原图</text>
							</view>
						</template>
						<!-- 非作品所有者根据权限显示选项 -->
						<template v-else>
							<view v-if="downloadPermissions.watermarkImage === 1" class="download-option-item"
								@click="downloadImageWithOptions(true, true); showDownloadOptions = false">
								<text class="download-option-text">有水印小图(1200像素宽)</text>
							</view>
							<view v-if="downloadPermissions.noWatermarkImage === 1" class="download-option-item"
								@click="downloadImageWithOptions(false, true); showDownloadOptions = false">
								<text class="download-option-text">无水印小图(1200像素宽)</text>
							</view>
							<view v-if="downloadPermissions.waterlessOriginalImage === 1" class="download-option-item"
								@click="downloadImageWithOptions(false, false); showDownloadOptions = false">
								<text class="download-option-text">无水印原图</text>
							</view>
						</template>
					</template>
					<template v-else>
						<view v-if="isOwner||downloadPermissions.videoDownload === 1" class="download-option-item"
							@click="downloadMedia(); showDownloadOptions = false">
							<text class="download-option-text">下载视频</text>
						</view>
					</template>

				</view>
			</view>
		</view>

		<!-- 临时canvas用于下载时添加水印 -->
		<canvas id="tempCanvas" class="temp-canvas" type="2d" />
	</view>
</template>

<script>
	export default {
		data() {
				return {
					imageUrls: [],
					currentIndex: 0,
					isOwner: false,
					productId: '',
					watermarkText: 'Ⓒ云艺坊',
					statusBarHeight: 0,
					isDownloading: false,
					touchStartX: 0,
					touchEndX: 0,
					isLandscapePreview: false,
					showDownloadOptions: false,
					downloadPermissions: {},
					isLoadingPermissions: false,
					isComputer: false
				}
		},
		computed: {
			currentImageUrl() {
				return this.imageUrls[this.currentIndex] || '';
			}
		},
		onLoad(options) {
			// 接收参数
			if (options.urls) {
				try {
					// 先解码再解析JSON
					const decodedUrls = decodeURIComponent(options.urls);
					this.imageUrls = JSON.parse(decodedUrls);
					console.log('解析后的图片URL列表:', this.imageUrls);
				} catch (error) {
					console.error('解析图片URL失败:', error);
					this.imageUrls = [];
				}
			}
			if (options.index) {
				this.currentIndex = parseInt(options.index);
			}

			if (options.isOwner) {
				this.isOwner = options.isOwner === 'true';
			}

			if (options.productId) {
				this.productId = options.productId;
			}

			// 获取状态栏高度
			const sys = uni.getSystemInfoSync();
			this.statusBarHeight = sys.statusBarHeight;

			// 检测是否为电脑端
			this.isComputer = sys.platform === 'windows' || sys.platform === 'mac' || sys.platform === 'devtools' || sys.deviceType === 'pc';

			// 获取下载权限信息
			this.getDownloadPermissions();
		},
		methods: {
			gotoSetting() {
				if (!this.isOwner) {
					return;
				} else {
					uni.navigateTo({
						url: '/pages/profile/settings/index'
					})
				}
			},
			goBack() {
				uni.navigateBack();
			},

			// 判断是否为视频URL
			isVideoUrl(url) {
				if (!url || typeof url !== 'string') {
					return false;
				}
				const videoExtensions = ['.mp4', '.mov', '.avi', '.flv', '.wmv', '.mkv'];
				const lowercaseUrl = url.toLowerCase();
				return videoExtensions.some(ext => lowercaseUrl.endsWith(ext));
			},

			// 处理swiper切换事件
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;
			},

			// 触摸开始事件
			onTouchStart(e) {
				this.touchStartX = e.changedTouches[0].clientX;
			},

			// 触摸结束事件
			onTouchEnd(e) {
				this.touchEndX = e.changedTouches[0].clientX;
				this.checkBoundarySwipe();
			},

			// 检查边界滑动
			checkBoundarySwipe() {
				const threshold = 30;
				const imageCount = this.imageUrls.length;
				if (imageCount <= 1) return;

				const deltaX = this.touchEndX - this.touchStartX;

				// 检查边界情况
				// 第一张图片向右滑动
				// if (this.currentIndex === 0 && deltaX > threshold) {
				// 	uni.showToast({
				// 		title: '已经是第一张',
				// 		icon: 'none',
				// 		duration: 1000
				// 	});
				// }
				// // 最后一张图片向左滑动
				// else if (this.currentIndex === imageCount - 1 && deltaX < -threshold) {
				// 	uni.showToast({
				// 		title: '已经是最后一张',
				// 		icon: 'none',
				// 		duration: 1000
				// 	});
				// }
			},



			download() {
				if (this.isDownloading) {
					return;
				}

				if (!this.currentImageUrl) {
					uni.showToast({
						title: '媒体未加载完成',
						icon: 'none'
					});
					return;
				}

				// 检查非作品所有者的下载权限
				if (!this.isOwner) {
					const hasPermission = this.checkDownloadPermission();
					if (!hasPermission) {
						uni.showToast({
							title: '用户案例不支持下载',
							icon: 'none'
						});
						return;
					}
				}

				// 显示下载选项
				this.showGuestDownloadOptions();
			},

			// 检查是否有下载权限
			checkDownloadPermission() {
				if (this.isVideoUrl(this.currentImageUrl)) {
					// 视频下载权限
					return this.downloadPermissions.videoDownload === 1;
				} else {
					// 图片下载权限
					return this.downloadPermissions.watermarkImage === 1 ||
						this.downloadPermissions.noWatermarkImage === 1 ||
						this.downloadPermissions.waterlessOriginalImage === 1;
				}
			},

			// 显示访客下载选项
			showGuestDownloadOptions() {
				// 显示自定义下载选项弹窗
				this.showDownloadOptions = true;
			},

			// 下载媒体文件
			downloadMedia() {
				// 显示下载中提示
				uni.showLoading({
					title: '下载中...',
					mask: true
				});

				// 设置下载状态
				this.isDownloading = true;

				if (this.isVideoUrl(this.currentImageUrl)) {
					// 视频下载逻辑
					uni.downloadFile({
						url: this.currentImageUrl,
						success: (res) => {
							if (res.statusCode === 200) {
								uni.saveVideoToPhotosAlbum({
									filePath: res.tempFilePath,
									success: () => {
										uni.hideLoading();
										uni.showToast({
											title: '已保存'
										});
										this.isDownloading = false;
									},
									fail: (err) => {
										uni.hideLoading();
										console.error('保存视频失败:', err);
										uni.showToast({
											title: '保存失败',
											icon: 'none'
										});
										this.isDownloading = false;
									}
								});
							} else {
								uni.hideLoading();
								uni.showToast({
									title: '下载失败',
									icon: 'none'
								});
								this.isDownloading = false;
							}
						},
						fail: (err) => {
							uni.hideLoading();
							console.error('下载视频失败:', err);
							uni.showToast({
								title: '下载失败',
								icon: 'none'
							});
							this.isDownloading = false;
						}
					});
				} else {
					// 图片下载逻辑
					this.downloadImageWithOptions(!(this.isOwner), false);
				}
			},

			// 带选项的图片下载
			downloadImageWithOptions(addWatermark, isSmall) {
				// 显示下载中提示
				uni.showLoading({
					title: '下载中...',
					mask: true
				});

				// 设置下载状态
				this.isDownloading = true;
				if (!this.currentImageUrl || !this.currentImageUrl.startsWith('http')) {
					console.error('URL格式不正确:', this.currentImageUrl);
					uni.showToast({
						title: '图片地址无效',
						icon: 'none'
					});
					return;
				}
				const pureUrl = this.currentImageUrl.split('?')[0]
				// 直接下载原始图片，然后处理
				uni.downloadFile({
					url: pureUrl,
					success: (downloadRes) => {
						if (downloadRes.statusCode == 200) {
						console.log("下载图片url",this.currentImageUrl)
							// 创建临时canvas用于添加水印和调整尺寸
							const query = uni.createSelectorQuery();
							console.log("下载图片query",query)
							query.select('#tempCanvas')
								.fields({
									node: true,
									size: true
								})
								.exec(res => {
									if (res && res[0]) {
										const canvas = res[0].node;
										const ctx = canvas.getContext('2d');

										// 加载图片
										const img = canvas.createImage();
										console.log("加载图片",img)
										img.onload = () => {
											console.log('原图尺寸:', img.width, 'x', img.height);
											// 计算目标尺寸
											let targetWidth = img.width;
											let targetHeight = img.height;

											if (isSmall) {
												// 1200像素宽的小图，保持原始比例
												targetWidth = 1200;
												targetHeight = Math.round((1200 / img.width) * img
													.height);
											}

											// 设置画布尺寸为目标尺寸（不考虑DPR，直接使用目标尺寸）
											canvas.width = targetWidth;
											canvas.height = targetHeight;

											// 清空画布
											ctx.clearRect(0, 0, targetWidth, targetHeight);

											// 绘制图片，保持原始比例
											ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

											// 添加水印
											if (addWatermark && this.watermarkText) {
												ctx.save();
												ctx.globalAlpha = 0.25;
												ctx.font = '28px sans-serif';
												ctx.fillStyle = '#f5f5f5';

												for (let x = 100; x < targetWidth; x += 300) {
													for (let y = 100; y < targetHeight; y += 250) {
														ctx.save();
														ctx.translate(x, y);
														ctx.rotate(-Math.PI / 6);
														ctx.fillText(this.watermarkText, 0, 0);
														ctx.restore();
													}
												}
												ctx.restore();
											}

											// 保存图片
											uni.canvasToTempFilePath({
												canvas: canvas,
												success: res => {
													uni.saveImageToPhotosAlbum({
														filePath: res.tempFilePath,
														success: () => {
															uni.hideLoading();
															uni.showToast({
																title: '已保存'
															});
															this.isDownloading =
																false;
														},
														fail: err => {
															uni.hideLoading();
															console.error(
																'保存失败:',
																err);
															uni.showToast({
																title: '保存失败',
																icon: 'none'
															});
															this.isDownloading =
																false;
														}
													});
												},
												fail: err => {
													uni.hideLoading();
													console.error('生成图片失败:', err);
													uni.showToast({
														title: '生成图片失败',
														icon: 'none'
													});
													this.isDownloading = false;
												}
											});
										};
										img.src = downloadRes.tempFilePath;
									} else {
										uni.hideLoading();
										this.isDownloading = false;
									}
								});
						} else {
							uni.hideLoading();
							uni.showToast({
								title: '下载失败1',
								icon: 'none'
							});
							this.isDownloading = false;
						}
					},
					fail: (err) => {
						uni.hideLoading();
						console.error('下载图片失败:', err);
						uni.showToast({
							title: '下载失败2',
							icon: 'none'
						});
						this.isDownloading = false;
					}
				})
			},

			// 切换横屏预览
			// 替换原有的 toggleLandscapePreview 方法
			toggleLandscapePreview() {
				this.isLandscapePreview = !this.isLandscapePreview;

				// 如果是视频，直接返回
				if (this.isVideoUrl(this.currentImageUrl)) {
					return;
				}
				if (this.isLandscapePreview) {
					wx.setPageOrientation({
						orientation: 'landscape',
						success: (res) => {
							console.log('设置横屏成功', res);
						},
						fail: (err) => {
							console.log('设置横屏失败', err);
						}
					});
				} else {
					wx.setPageOrientation({
						orientation: 'portrait',
						success: (res) => {
							console.log('设置竖屏成功', res);
						},
						fail: (err) => {
							console.log('设置竖屏失败', err);
						}
					});
				}
				// 如果是横屏模式，使用不同的 mode
				if (this.isLandscapePreview) {
					// 给图片一个重绘的时间
					setTimeout(() => {
						const query = uni.createSelectorQuery();
						query.select('.preview-image')
							.fields({
								size: true,
								rect: true
							}, (res) => {
								if (res) {
									console.log('横屏模式图片尺寸:', res.width, 'x', res.height);
								}
							}).exec();
					}, 50);
				}
			},

			handleImageClick(index) {
				if (this.isComputer) {
					return;
				}
				this.currentIndex = index;
				this.previewImage();
			},

			// 图片预览
			previewImage() {
				if (this.isComputer || !this.currentImageUrl) {
					return;
				}

				const pureUrl = this.currentImageUrl.split('?')[0]
				// 手机端保持原有单图预览逻辑
				wx.previewImage({
					current: pureUrl,
					urls: [pureUrl],
					showmenu: false
				});
			},

			// 获取下载权限信息
			getDownloadPermissions() {
				this.isLoadingPermissions = true;
				// 使用 this.$request.post 写法，请求参数为作品id
				this.$request.get(`/wechat/basic/checkImageDownLoad/${this.productId}`)
					.then((res) => {
						this.isLoadingPermissions = false;
						if (res.code === 200) {
							// 假设接口返回的数据格式为：{ watermarkImage: 1, noWatermarkImage: 1, waterlessOriginalImage: 1, videoDownload: 1 }
							this.downloadPermissions = res.data;
						} else {
							console.error('获取下载权限失败:', res.msg);
							this.downloadPermissions = {};
						}
					})
					.catch((err) => {
						this.isLoadingPermissions = false;
						console.error('请求下载权限接口失败:', err);
						this.downloadPermissions = {};
					});
			}
		},
	}
</script>

<style scoped>
	.preview-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: #000;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.preview-container.landscape-mode {
		/* 使用原生横屏模式，不需要CSS旋转 */
		width: 100vw;
		height: 100vh;
	}

	/* 横屏模式提示 */
	.landscape-tip {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: auto;
		background-color: rgba(186, 186, 186, 0.7);
		color: #fff;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		font-size: 14rpx;
		cursor: pointer;
		border-radius: 5rpx;
		padding: 0 10rpx;
	}

	.tip-text {
		color: #fff;
		font-size: 14rpx;
	}

	.status-bar {
		width: 100%;
		/* 与标题栏背景色一致 */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 101;
	}

	/* 顶部导航栏 */
	.top-nav {
		position: fixed;
		left: 0;
		z-index: 100;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.back-btn {
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.back-icon {
		width: 40rpx;
		height: 40rpx;
		color: #fff;
		font-weight: bold;
	}

	.page-indicator {
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
	}

	.page-text {
		font-size: 40rpx;
		color: #fff;
		font-weight: bold;
	}

	/* 横屏模式下的样式调整 */
	.preview-container.landscape-mode .back-btn {
		width: 20rpx;
		height: 20rpx;
	}

	.preview-container.landscape-mode .back-icon {
		width: 20rpx;
		height: 20rpx;
	}

	.preview-container.landscape-mode .page-text {
		font-size: 18rpx;
	}

	.preview-container.landscape-mode .landscape-text {
		font-size: 18rpx;
	}

	.preview-container.landscape-mode .download-icon {
		width: 20rpx;
		height: 20rpx;
	}

	/* 图片显示区域 */
	.image-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
		box-sizing: border-box;
		background-color: #000;
		overflow: hidden;
	}

	.image-slider {
		width: 100%;
		height: 100%;
	}

	.slide-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.preview-image {
		width: 100%;
		height: auto;
		display: block;
		max-height: 100%;
		object-fit: contain;
		min-width: 0;
		min-height: 0;
		flex-shrink: 0;
	}

	.preview-video {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* 右下角横屏预览按钮 */
	.landscape-preview-btn {
		position: absolute;
		bottom: 20rpx;
		right: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 10;
		padding: 15rpx;
		margin: 5rpx;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 20rpx;
	}

	/* 右侧下载按钮 - 位于横屏预览按钮右侧 */
	.bottom-download {
		position: absolute;
		bottom: 20rpx;
		right: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 10;
		padding: 15rpx;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50rpx;
	}

	.download-icon {
		width: 35rpx;
		height: 35rpx;
	}

	.download-text {
		font-size: 24rpx;
		color: #fff;
	}

	.bottom-download.disabled {
		opacity: 0.7;
		pointer-events: none;
	}

	.loading-spinner {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 8rpx;
		border: 3rpx solid rgba(255, 255, 255, 0.3);
		border-top: 3rpx solid #fff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* 临时canvas用于下载时添加水印 */
	.temp-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100px;
		height: 100px;
		opacity: 0;
		pointer-events: none;
		z-index: -1;
	}

	.landscape-text {
		font-size: 24rpx;
		color: #fff;
	}

	/* 横屏预览模式 */
	.image-container.landscape-mode {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.image-container.landscape-mode .image-slider {
		width: 100%;
		height: 100%;
	}

	.image-container.landscape-mode .slide-item {
		width: 100%;
		height: 100%;
	/* 	transition:  'transform 0.4s ease-in-out' 
		transform: translateX(-${this.currentIndex * 100}%) */
	}

	.preview-image.landscape-image {
		/* 原生横屏模式下的图片显示 */
		transform: none;
		transform-origin: center;
		width: 100vw;
		height: 100vh;
		max-width: none;
		max-height: none;
		object-fit: contain;
	}

	/* 下载选项弹窗样式 */
	.download-options-popup {
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

	.download-options-content {
		background: #fff;
		border-radius: 30rpx;
		padding: 20rpx 0 20rpx;
		min-height: 200rpx;
		margin: 20rpx;
	}

	.download-options-handle {
		width: 100rpx;
		height: 15rpx;
		background: #d3d3d3;
		border-radius: 10rpx;
		margin: 10rpx auto 10rpx;
	}

	.download-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.download-options-title {
		font-size: 28rpx;
		color: #999;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}

	.download-options-title2 {
		font-size: 28rpx;
		color: #4952ff;
		margin-right: 40rpx;
		margin-bottom: 20rpx;
	}

	.download-options-list {
		padding: 0 40rpx;
	}

	.download-option-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f9f9f9;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.download-option-item:active {
		opacity: 0.7;
	}

	.download-option-text {
		font-size: 32rpx;
		color: #333;
	}
</style>
