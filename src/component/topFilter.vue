<template>
  <div class="_top-filter">
    <div class="title">{{title}}</div>
    <div class="select-form">
      <div class="form-left">
        <div class="top">
          <slot name="top"></slot>
        </div>
        <div class="bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
      <div class="form-right">
        <slot name="btn-group"></slot>
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    props: ['title']
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  ._top-filter {
    margin-bottom: 20px;
    .select-form {
      background: #e7ecf2;
      border-radius: 6px;
      padding: 16px;
      margin: 20px 0;
      display: flex;
      .form-left {
        flex: 1;
        .top {
          & > :first-child {
            display: flex;
          }
        }
        .bottom {
          & > :first-child {
            margin-top: 12px;
            display: flex;
          }
        }
        .form-item {
          display: flex;
          align-items: center;
          margin-right: 20px;
          span {
            //width: 120px;
          }
          .el-input {
            flex: 1;
          }
          .input {
            width: 186px;
            margin-left: 12px;
          }
        }
        .date-picker {
          .wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            .picker {
              margin-left: 10px;
              width: 200px;
            }
            .line {
              width: 18px;
              height: 2px;
              background: #cacbd0;
              margin-left: 10px;
            }
          }
        }
      }
      .form-right {
        & > :first-child {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .add-btn {
            background: #fe842b;
            border: none;
            width: 150px;
          }
          .select-btn {
            background: #07c362;
            margin: 12px 0 0 0;
            border: none;
            width: 150px;
          }
        }
      }
    }
    .title {
      color: #525252;
      flex: 1;
    }
  }
</style>
