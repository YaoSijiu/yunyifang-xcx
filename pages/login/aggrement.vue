<template>
	<view class="agreement-container">
		
		<!-- 协议内容 -->
		<scroll-view class="agreement-content" scroll-y>
			<view class="agreement-body">
				<!-- 用户协议 -->
				<template v-if="type === 'user'">
					<view class="agreement-title">用户协议</view>
					
					<view class="content">
						<view class="section">
							<view class="section-title">一、协议说明</view>
							<view>欢迎您使用本微信小程序（以下简称"本平台"）。本平台主要为用户提供作品展示、作品集管理、团队协作、云存储及会员服务等功能。</view>
							<view>在您注册、登录或使用本平台前，请您务必认真阅读并充分理解本《用户协议》（以下简称"本协议"）。一旦您点击确认或实际使用本平台服务，即表示您已同意并接受本协议的全部内容。</view>
						</view>
						
						<view class="section">
							<view class="section-title">二、用户注册与账号管理</view>
							<view>1. 本平台支持通过微信头像和昵称一键登录。</view>
							<view>2. 用户应保证所提交的注册信息真实、合法、有效。</view>
							<view>3. 用户账号仅限本人使用，不得转让、出租或出借。</view>
							<view>4. 因用户自身原因导致账号泄露或被他人使用的，由用户自行承担责任。</view>
						</view>
						
						<view class="section">
							<view class="section-title">三、平台服务内容</view>
							<view>1. 作品与作品集管理：</view>
							<view class="sub-item">• 用户可创建、上传、编辑、删除个人作品与作品集；</view>
							<view class="sub-item">• 作品可选择是否归属某一作品集；</view>
							<view class="sub-item">• 支持作品、作品集列表及详情展示。</view>
							<view>2. 下载服务：</view>
							<view class="sub-item">• 支持作品或作品集打包为 ZIP 格式下载；</view>
							<view class="sub-item">• 下载行为仅限合法授权范围内使用。</view>
							<view>3. 团队功能：</view>
							<view class="sub-item">• 用户在满足条件后可创建团队并成为团队队长；</view>
							<view class="sub-item">• 团队成员可通过邀请码加入；</view>
							<view class="sub-item">• 团队队长可设置成员权限、管理团队成员；</view>
							<view class="sub-item">• 团队解散后，团队内作品、作品集归属团长个人账号。</view>
							<view>4. 会员服务：</view>
							<view class="sub-item">• 平台提供不同等级会员服务，包括个人版、团队版及至尊版；</view>
							<view class="sub-item">• 不同会员等级享有不同的云存储空间、作品数量、作品集数量及团队功能权限。</view>
						</view>
						
						<view class="section">
							<view class="section-title">四、用户行为规范</view>
							<view>1. 用户不得上传、发布任何违反法律法规、公序良俗的内容；</view>
							<view>2. 不得侵犯他人知识产权、隐私权、名誉权等合法权益；</view>
							<view>3. 不得利用平台从事任何违法、违规或不正当活动；</view>
							<view>4. 平台有权对违规内容进行删除、限制处理。</view>
						</view>
						
						<view class="section">
							<view class="section-title">五、知识产权声明</view>
							<view>1. 用户上传的作品，其著作权仍归用户本人所有；</view>
							<view>2. 用户授予平台在展示、推广及运营范围内合理使用其作品的非独占授权；</view>
							<view>3. 未经用户许可，平台不会将用户作品用于商业转售。</view>
						</view>
						
						<view class="section">
							<view class="section-title">六、会员与付费说明</view>
							<view>1. 会员服务属于虚拟服务，一经开通原则上不支持退款；</view>
							<view>2. 升级会员需补足差价，平级续费将顺延会员有效期；</view>
							<view>3. 因政策调整或不可抗力因素，平台有权对会员权益进行合理调整。</view>
						</view>
						
						<view class="section">
							<view class="section-title">七、服务中断与免责声明</view>
							<view>1. 因系统维护、升级或不可抗力原因导致服务中断的，平台不承担责任；</view>
							<view>2. 因用户操作不当或第三方原因造成的损失，由用户自行承担。</view>
						</view>
						
						<view class="section">
							<view class="section-title">八、协议变更与终止</view>
							<view>1. 平台有权根据业务发展需要修改本协议内容；</view>
							<view>2. 若用户不同意修改内容，应立即停止使用本平台服务。</view>
						</view>
						
						<view class="section">
							<view class="section-title">九、法律适用与争议解决</view>
							<view>本协议的订立、执行与解释均适用中华人民共和国法律。如发生争议，双方应友好协商解决，协商不成的，提交平台所在地人民法院诉讼解决。</view>
						</view>
						
						<view class="effective-date">
							<view>生效时间：自用户首次使用本平台之日起生效</view>
						</view>
					</view>
				</template>
				
				<!-- 隐私政策 -->
				<template v-else>
					<view class="agreement-title">隐私政策</view>
					
					<view class="content">
						<view class="section">
							<view class="section-title">一、隐私政策概述</view>
							<view>本平台高度重视用户个人信息的保护。本隐私政策旨在向您说明我们如何收集、使用、存储及保护您的个人信息。</view>
						</view>
						
						<view class="section">
							<view class="section-title">二、我们收集的信息</view>
							<view>1. 基本信息：手机号、微信昵称、头像等；</view>
							<view>2. 个人资料信息：联系方式、微信号、昵称等（由用户主动填写）；</view>
							<view>3. 内容信息：用户上传的作品、作品集、图片等；</view>
							<view>4. 使用数据：登录时间、操作记录、设备信息等。</view>
						</view>
						
						<view class="section">
							<view class="section-title">三、信息的使用目的</view>
							<view>1. 用于用户身份验证及账号管理；</view>
							<view>2. 提供作品展示、下载、团队协作等核心功能；</view>
							<view>3. 用于云存储容量统计与会员权益管理；</view>
							<view>4. 改善产品体验与平台服务质量。</view>
						</view>
						
						<view class="section">
							<view class="section-title">四、信息的存储与保护</view>
							<view>1. 用户信息存储于符合国家法律法规要求的服务器中；</view>
							<view>2. 平台采取合理的技术与管理措施保护用户信息安全；</view>
							<view>3. 未经用户授权，不会向第三方泄露用户个人信息，法律法规另有规定的除外。</view>
						</view>
						
						<view class="section">
							<view class="section-title">五、信息共享与披露</view>
							<view>1. 在获得用户明确同意的情况下，平台可能向第三方共享必要信息；</view>
							<view>2. 根据法律法规或司法机关要求，平台有权依法披露用户信息。</view>
						</view>
						
						<view class="effective-date">
							<view>生效时间：自用户首次使用本平台之日起生效</view>
						</view>
					</view>
				</template>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'user' // 默认用户协议
			};
		},
		onLoad(options) {
			// 接收参数，type: 'user' 或 'privacy'
			if (options.type) {
				this.type = options.type;
			}
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.agreement-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	
	.agreement-header {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #f0f0f0;
		position: sticky;
		top: 0;
		z-index: 100;
	}
	
	.header-left {
		width: 60rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.header-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
	}
	
	.header-right {
		width: 60rpx;
	}
	
	.agreement-content {
		flex: 1;
		height: 0;
	}
	
	.agreement-body {
		padding: 40rpx 30rpx 60rpx;
	}
	
	.agreement-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 20rpx;
	}
	
	.agreement-update {
		font-size: 24rpx;
		color: #999;
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.content {
		font-size: 28rpx;
		color: #666;
		line-height: 1.8;
	}
	
	.section {
		margin-top: 30rpx;
	}
	
	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 15rpx;
		line-height: 1.5;
	}
	
	.sub-item {
		padding-left: 40rpx;
		margin: 5rpx 0;
	}
	
	.effective-date {
		margin-top: 50rpx;
		padding-top: 30rpx;
		border-top: 1rpx solid #eee;
		font-size: 24rpx;
		color: #999;
		text-align: center;
	}
</style>