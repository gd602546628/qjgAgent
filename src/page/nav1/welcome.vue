<template>
  <div class="welcome">
    <div class="wrap">
      <div class="chart-item">
        <div class="title">磁盘使用统计</div>
        <div class="content">
          <div class="left">
            <q-circle :total="total" :data="circleData" v-if="showCircle"></q-circle>
          </div>
          <div class="right">
            <div class="data-display">
              <div class="data-item">
                <span></span>
                <p>磁盘总容量：{{total}}MB</p>
              </div>
              <div class="data-item" v-for="item in circleData">
                <span :style="{background:item.style}"></span>
                <p>{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import qCircle from '@/component/circle.vue'
  import Api from '@/api/api'
  export default{
    components: {
      qCircle
    },
    data(){
      return {
        total: 1000,
        showCircle: false,
        circleData: [{title: '已使用700M', value: 700, style: '#ff8d6c', lineStyle: '#ff7662', textStyle: '#ff7662'},
          {title: '剩余300M', value: 300, style: '#f5f5f9', lineStyle: '#d9d9d9', textStyle: '#333333'},
        ]
      }
    },
    created(){
      this.getDoorInfo()
    },
    methods: {
      async getDoorInfo(){
        let data = await Api.login.getDoorInfo()
        this.total = data.data.total
        this.circleData[0].title = `已使用${data.data.used}M`
        this.circleData[0].value = data.data.used
        this.circleData[1].title = `剩余${this.total - data.data.used}M`
        this.circleData[1].value = this.total - data.data.used
        this.showCircle = true
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .welcome {
    padding: 22px;
    background: #eaf1f9;
    width: 100%;
    height: 100%;
    .wrap {
      display: flex;
      flex-wrap: wrap;
      .chart-item {
        width: 49%;
        background: #ffffff;
        border-radius: 6px;
        border: 1px solid #d9d9d9;
        display: flex;
        flex-direction: column;
        &:nth-child(odd) {
          margin-right: 1%;
        }
        &:nth-child(even) {
          margin-left: 1%;
        }
        .title {
          height: 54px;
          border-bottom: 1px solid #d9d9d9;
          padding-left: 20px;
          display: flex;
          color: #333333;
          align-items: center;
        }
        .content {
          height: 376px;
          display: flex;
          flex: 1;
          margin: 0;
          padding: 0 60px;
          .left {
            flex: 1;
            height: 100%;
          }
          .right {
            display: flex;
            align-items: center;
            .data-display {
              background: #f2f7fb;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              padding: 20px 20px;
              height: 200px;
              border-radius: 6px;
              width: 260px;
              .data-item {
                display: flex;
                align-items: center;
                width: 100%;
                flex: 1;
                span {
                  background: #2ab8fd;
                  width: 40px;
                  height: 20px;
                  border: 1px solid #d9d9d9;
                  display: block;
                }
                p {
                  flex: 1;
                  margin-left: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
