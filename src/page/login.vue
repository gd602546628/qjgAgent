<template>
  <div class="login-page">
    <div class="wrap">
      <div class="logo">
        <img src="../assets/image/logo.png"/>
      </div>
      <div class="login-box">
        <div class="login">
          <div class="title">用户登录</div>
          <div class="input-wrap">
            <el-input
              placeholder="请输入账号或手机号"
              v-model="username">
              <!--  <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            </el-input>
            <!--  <span class="el-icon-circle-check icon"></span>-->
          </div>
          <div class="input-wrap">
            <el-input
              placeholder="请输入密码"
              v-model="password"
              type="password"
            >
              <!--  <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            </el-input>
            <!--   <span class="el-icon-circle-check icon"></span>-->
          </div>
          <div class="code-wrap">
            <input class="code-input" type="text" placeholder="请输入验证码" v-model="code"/>
            <img class="code" :src="base64">
            <div class="change" @click.stop="getCode">看不清，换一张</div>
          </div>
          <div class="btn-group">
            <div class="btn" @click="login">立即登录</div>
            <div class="btn cancel">注册</div>
          </div>
          <div class="forget">忘记密码</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Api from '@/api/api'
  import {code} from '@/config/config'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import httpService from '@/service/httpService'
  export default{
    data(){
      return {
        username: '',
        password: '',
        code: '',
        sessionId: '',
        base64: ''
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created(){
      if (this.isLogin) {
        this.$router.push({
          name: 'index'
        })
      }
      this.getCode()
    },
    methods: {
      ...mapMutations(['saveUserInfo']),
      ...mapActions(['getCityInfo']),
      async login(){
        if (!this.loginFormCheck()) return
        let data = await Api.login.login({
          username: this.username,
          password: this.password,
          picCode: this.code
        }, this.sessionId)
        if (data.code === code.SUCCESS) {
          if (this.$route.params.resolve) {
            this.$route.params.resolve(data.data)
            this.$route.params.fn()
          } else {
            this.saveUserInfo(data.data)
            this.getCityInfo()
            this.$router.push({
              name: 'index'
            })
          }
        } else {
          this.$message.error(data.mesg)
        }
      },
      getCode(){
        Api.login.getValidateCode().then(data => {
          this.sessionId = data.split(';')[1]
          this.base64 = 'data:image/jpeg;base64,' + data.split(';')[0]
        })
      },
      loginFormCheck(){
        if (this.username == '') {
          this.$message.error('请输入账号')
        } else if (this.password == '') {
          this.$message.error('请输入密码')
        } else if (this.code == '') {
          this.$message.error('请输入验证码')
        } else {
          return true
        }
        return false
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .login-page {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../assets/image/bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .wrap {
      display: flex;
      align-items: center;
      .logo {
        margin-right: 122px;
      }
      .login-box {
        width: 380px;
        box-sizing: border-box;
        padding: 38px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 6px;
        .login {
          .title {
            padding-bottom: 20px;
            border-bottom: 1px solid #14b0ee;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            font-weight: 500;
          }
          .input-wrap {
            margin-top: 12px;
            display: flex;
            align-items: center;
            position: relative;
            .icon {
              position: absolute;
              right: -26px;
              font-size: 20px;
              color: #14b0ee;
            }
            .el-input__inner {
              border: none;
              border-radius: 0;
            }
          }
          .code-wrap {
            display: flex;
            margin-top: 20px;
            .code-input {
              width: 90px;
              height: 40px;
              border: none;
              outline: none;
              padding-left: 10px;
              color: #606266;
            }
            .code {
              margin-left: 20px;
              height: 40px;
              width: 90px;
              background: #ffffff;
            }
            .change {
              flex: 1;
              margin-left: 10px;
              color: #ffffff;
              font-size: 10px;
              display: flex;
              align-items: flex-end;
              cursor: pointer;
            }
          }
          .btn-group {
            margin-top: 20px;
            display: flex;
            .btn {
              flex: 1;
              height: 40px;
              background: #00aaee;
              text-align: center;
              line-height: 40px;
              color: #ffffff;
              border-radius: 6px;
              box-sizing: border-box;
              cursor: pointer;
              &.cancel {
                background: none;
                border: 1px solid #ffffff;
                margin-left: 20px;
              }
            }
          }
          .forget {
            margin-top: 20px;
            text-align: right;
            color: #249fda;
            font-weight: 500;
            font-size: 15px;
          }
        }
      }
    }
  }
</style>
