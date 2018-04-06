<template>
  <div class="index" ref="index">
    <div class="index-nav">
      <div class="title">管理后台</div>
      <div class="nav">
        <!--  <p class="nav-item active">导航一</p>-->
        <div class="date">{{nowTime}}</div>
      </div>
      <div class="user-info">
        <p>{{sysUserBg && sysUserBg.account}}</p>
        <div class="line"></div>
        <p>修改信息</p>
        <div class="line"></div>
        <p class="logout" @click="logout">退出</p>
      </div>
    </div>
    <router-view class="index-page"/>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Api from '@/api/api'
  import util from '@/service/util'
  export default {
    data() {
      return {
        nowTime: ''
      }
    },
    computed: {
      ...mapGetters(['sysUserBg'])
    },
    created(){
      this.nowTime = util.dateFormat(new Date(), 'yyyy年MM月d日')
    },
    mounted(){
    },
    methods: {
      ...mapActions(['logoutAction']),
      logout(){
        Api.login.logout()
        this.logoutAction()
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .index {
    display: flex;
    flex-direction: column;
    height: 100%;
    .index-nav {
      display: flex;
      background: #161824;
      height: 62px;
      .nav {
        flex: 1;
        display: flex;
        .nav-item {
          width: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          &.active {
            background: #07c362;
          }
        }
        .date {
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
        }
      }
      .title {
        height: 60px;
        background: #1d1d27;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        font-weight: bold;
        font-size: 32px;
        box-sizing: border-box;
        letter-spacing: 2px;
      }
      .user-info {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        p {
          color: #fff;
          cursor: pointer;
        }
        .line {
          background: #4f515b;
          height: 16px;
          width: 1px;
          margin: 0 22px;
        }
        .logout {
          color: red;
          margin-right: 20px;
        }
      }
    }
    .index-page {
      flex: 1;
    }
  }
</style>
