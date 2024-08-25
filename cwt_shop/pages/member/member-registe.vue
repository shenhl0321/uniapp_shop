<template>
	<button id="content" @click="getUserInfo">
		<view style="position: relative;z-index: 100;">
			<view class="page-head">
				<view class="statusbar" :style="statusBarHeight">
				</view>
				<view class="custom-navi">
<!-- 					<view class="btn">
						<image src="/static/images/icon/gohome.png" mode="aspectFit"></image>
					</view> -->
					<view class="page-title">
						注册会员
					</view>
				</view>
				<view class="banner-card">

				</view>
			</view>

			<view class="registe-form">
				<view class="form-title">
					填写信息
				</view>
				<view class="form-item mobile">
					<view class="label">
						<text>手机号</text>
						<text>：</text>
					</view>
					<view class="input">
						<input type="text" :value="userMobile" @input="userMobile = $event.target.value"
							placeholder="请输入您的手机号" placeholder-style="color:#cdcdcd" />
					</view>
				</view>
				<view class="form-item check-code">
					<view class="label">
						<text>验证码</text>
						<text>：</text>
					</view>
					<view class="input">
						<input type="text" :value="code" @input="code = $event.target.value" placeholder="请输入验证码"
							placeholder-style="color:#cdcdcd" />
					</view>
					<view v-if="!timing" class="get-code-btn" @click.stop="getCheckCode">
						发送验证码
					</view>
					<view v-if="timing" class="get-code-btn get-code-btn-timing">
						重新发送（{{timer}}）
					</view>
				</view>
				<view class="form-item member-class">
					<view class="label">
						<text>会员等级</text>
						<text>：</text>
					</view>
					<view class="memberclass">
						普通会员
					</view>
				</view>
				<view class="form-item gender">
					<view class="label">
						<text>性别</text>
						<text>：</text>
					</view>
					<view class="checkbox">
						<label class="radio" @click.stop="sex = 'M'">
							<image v-if="sex == 'M'" src="/static/images/icon/choosen.png" mode="aspectFit"></image>
							<image v-else src="/static/images/icon/unchoosen.png" mode="aspectFit"></image>
							<text>男</text>
						</label>
						<label class="radio" @click.stop="sex = 'F'">
							<image v-if="sex == 'F'" src="/static/images/icon/choosen.png" mode="aspectFit"></image>
							<image v-else src="/static/images/icon/unchoosen.png" mode="aspectFit"></image>
							<text>女</text>
						</label>
					</view>
				</view>
				<view class="form-item date">
					<view class="label">
						<text>生日</text>
						<text>：</text>
					</view>
					<view class="input">
						<picker mode="date" :value="date" :start="startDate" :end="endDate"
							@change="birthDate = $event.target.value">
							<input type="text" :value="birthDate" disabled="" placeholder="请选择您的出生日期" />
							<image src="/static/images/icon/tri-down.png" mode="aspectFit"></image>
						</picker>
					</view>
				</view>
			</view>

			<view class="confirm-btn" @click.stop="submit(0)">
				确定
			</view>
		</view>
	</button>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				nickName: '',
				sex: 'M',
				birthDate: '',
				code: '',
				timer: 60, //计时器剩余时间
				timing: false //是否启动计时器
			};
		},
		computed: {
			statusBarHeight() {
				let res = uni.getSystemInfoSync()
				let statusBarHeight = res.statusBarHeight
				console.log(`height: ${statusBarHeight}px;`)
				return `height: ${statusBarHeight}px`
			},

			userInfo() {
				return this.$store.state.userInfo || {}
			}
		},

		methods: {
			async submit() {
				if (!this.userMobile || !this.code) {
					this.$showToast('请完整填写手机号和验证码')
					return
				}
				try {
					let res = await this.$request.post('/api/member/updateMember', {
						userMobile: this.userMobile,
						nickName: this.userInfo.nickName,
						code: this.code,
						sex: this.sex,
						birthDate: this.birthDate,
						userId: this.userInfo.userId
					})
					// console.log(res)
					if (res == 'success') {
						this.$showToast('注册成功')
						this.$store.commit('updateUserInfo', { 
							nickName: this.userInfo.nickName,  
							mobile: this.userMobile
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else if (res == '111') {
						this.$showToast('验证码错误')
					} else {
						this.$showToast('网络出错，请稍后重试')
					}
				} catch (e) {
					//TODO handle the exception
					this.$showToast('网络出错，请稍后重试')
				}
			},

			async getCheckCode() {
				if (!this.userMobile) {
					this.$showToast('请填写手机号')
					return
				}
				try {
					let res = await this.$request.post('/p/sms/sendSmsByUpdatingUserInformation', {
						mobile: this.userMobile
					})
					if (res.resultCode == 200) {
						this.timing = true
						let timer = setInterval(() => {
							console.log(this.timer)
							this.timer -= 1
						}, 1000)
						setTimeout(() => {
							clearInterval(timer)
							this.timing = false
						}, this.timer * 1000)
					} else {
						console.log('getcheckcode running')
						console.log(res)
						this.$showToast(res.resultMsg)
					}
				} catch (e) {
					//TODO handle the exception
					this.$showToast('网络出错，请稍后重试')
				}
			},

			bindDateChange(e) {
				console.log(e)
			},
			
			getUserInfo() {
				let self = this
				// #ifdef MP-WEIXIN
				if(this.userInfo.nick) return 
				wx.getUserProfile({
					desc: '信息将用于会员注册',
					success(res) {
						self.$request.updateUserInfo(res.userInfo, self)
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	#content {
		margin: 0;
		padding: 0;
		width: 100%;
		font-size: unset;
		line-height: unset;
		border-radius: unset;
		background-color: #ffffff;
		border: none;
		text-align: unset;

		&::after {
			border: none;
		}
	}

	image {
		height: 30rpx;
		width: 30rpx;
	}

	.page-head {
		background-image: url(https://images.51xeld.com/2021/01/81944b78deb346e29f1f416befa54f4b.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position-y: -170rpx;
		width: 100%;

		.custom-navi {
			font-size: 36rpx;
			height: 44px;
			width: 100%;
			color: #FFFFFF;
			position: relative;
			text-align: center;
			line-height: 44px;

			image {
				height: 18px;
				width: 18px;
				position: absolute;
				padding: 8rpx;
				left: 30rpx;
				border: 1px solid #FFDBB5;
				top: 5px;
				border-radius: 50%;
			}
		}

		.banner-card {
			background-image: url(https://images.51xeld.com/2021/01/c71f4d6fd7e745e19aa7472aa87b3a4b.png);
			background-repeat: no-repeat;
			background-size: contain;
			width: 100%;
			height: 450rpx;
		}
	}

	.registe-form {
		width: 100%;
		box-sizing: border-box;
		padding: 0 8%;
		color: #666666;

		.form-title {
			text-align: center;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			color: #666666;
		}

		.form-item {
			width: 100%;
			display: flex;
			font-size: 26rpx;
			height: 100rpx;
			align-items: center;
			position: relative;

			.label {
				width: 160rpx;
				font-size: 30rpx;

				text {
					display: inline-block;

					&:first-child {
						width: 120rpx;
						text-align: justify;
						text-align-last: justify;
					}
				}
			}

			.input {
				width: calc(100% - 160rpx);

				input {
					height: 70rpx;
					border: 1px solid #CDCDCD;
					border-radius: 12rpx;
					padding-left: 30rpx;
					// color: #CDCDCD;
				}
			}
		}

		.mobile,
		.check-code {
			.label>text:first-child::before {
				content: '*';
				color: #F24545;
				position: absolute;
				left: -20rpx;
				top: 32rpx;
				font-size: 36rpx;
			}
		}

		.check-code {
			.input {
				width: 240rpx;
			}

			.get-code-btn {
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 200rpx;
				border: 1px solid #FCB05E;
				border-radius: 12rpx;
				color: #FCB05E;
				line-height: 70rpx;
				height: 70rpx;
				margin-left: 20rpx;
				text-align: center;
			}

			.get-code-btn-timing {
				color: #d1d1d1;
				// border-color: #d1d1d1;
			}

		}

		.gender {
			.checkbox {
				.radio {
					image {
						height: 24rpx;
						width: 24rpx;
						margin-right: 8rpx;
					}

					&:last-child {
						margin-left: 40rpx;
					}
				}
			}
		}

		.date {
			position: relative;

			image {
				position: absolute;
				right: 34rpx;
				top: 36rpx;
			}
		}
	}

	.confirm-btn {
		width: 90%;
		height: 80rpx;
		background: #FFB873;
		border-radius: 60rpx;
		margin: 0 auto;
		font-size: 30rpx;
		text-align: center;
		color: #FFFFFF;
		line-height: 80rpx;
		position: fixed;
		bottom: 60rpx;
		left: 5%;
	}
</style>
