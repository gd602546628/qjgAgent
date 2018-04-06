<template>
  <div class="add-account">
    <common-box title="添加账号" class="add-form-box">
      <el-form class="add-form">
        <el-form-item label="姓名：">
          <el-input placeholder="姓名为1-20位汉子、字母、数字、特殊字符" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input placeholder="账号为1-20位汉子、字母、数字、特殊字符" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="备注为1-50位汉子、字母、数字、特殊字符" maxlength="20" type="textarea" rows="4"></el-input>
        </el-form-item>
      </el-form>
    </common-box>
    <div class="btn-group">
      <div class="q-btn-confirm" @click="confirm">确定</div>
      <div class="q-btn-cancel" @click="cancel">取消</div>
    </div>
  </div>
</template>


<script>
  import commonBox from '../../../component/commonBox.vue'
  export default{
    components: {
      commonBox
    },
    data(){
      return {
        formData: {},
        rules: {}
      }
    },
    methods: {
      confirm(){
      },
      cancel(){
        this.$router.back()
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .add-account {
    padding: 20px;
    .btn-group {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    .add-form-box {
      .add-form {
        padding: 30px 200px;
        .el-form-item {
          display: flex;
          .el-form-item__content {
            flex: 1;
          }
        }
      }
    }
  }
</style>
