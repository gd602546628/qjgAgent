<template>
  <div class="account-manage">
    <top-filter title="用户管理">
      <div slot="top">
        <div class="form-item">
          <span>账号：</span>
          <el-input placeholder="请输入账号"></el-input>
        </div>
        <div class="form-item">
          <span>姓名：</span>
          <el-input placeholder="请输入姓名"></el-input>
        </div>
        <div class="form-item">
          <span>账号状态：</span>
          <el-select v-model="formData.attr" placeholder="请选择账号状态">
            <el-option
              v-for="item in attrList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="bottom">
        <div class="form-item date-picker">
          <div class="wrap">
            <span>创建时间：</span>
            <el-date-picker
              v-model="formData.startTime"
              type="datetime"
              placeholder="选择开始时间"
              class="picker"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
            <span class="line"></span>
            <el-date-picker
              v-model="formData.endTime"
              type="datetime"
              placeholder="选择结束时间"
              class="picker"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div slot="btn-group">
        <el-button type="primary" class="add-btn" icon="el-icon-plus" @click.stop="goAdd">添加账号</el-button>
        <el-button type="primary" class="select-btn" icon="el-icon-search" @click="select">筛选</el-button>
      </div>
    </top-filter>
    <common-table :tableHeader="tableHeader" :tableData="tableData"></common-table>
  </div>
</template>


<script>
  import topFilter from '../../../component/topFilter.vue'
  import commonTable from '../../../component/table.vue'
  import commonModel from '../../../component/commonModel.vue'
  export default{
    components: {
      topFilter,
      commonTable,
      commonModel
    },
    data(){
      return {
        formData: {},
        showAddModel: false,
        attrList: [
          {label: '启用', value: 0},
          {label: '停用', value: 1}
        ],
        tableHeader: [
          {
            label: '账号',
            prop: 'account'
          },
          {
            label: '姓名',
            prop: 'account'
          },
          {
            label: '创建时间',
            prop: 'account'
          },
          {
            label: '账号状态',
            prop: 'account'
          },
          {
            label: '登录次数',
            prop: 'account'
          },
          {
            label: '最后登录时间',
            prop: 'account'
          },
        ],
        tableData: [],
        operation: [ //启用状态下操作
          {
            label: '修改',
            color: '#07c362',
            handle: this.edit,
          },
          {
            label: '停用',
            color: '#f6781d',
            handle: this.stop,
          },
          {
            label: '重置密码',
            color: '#adadad',
            handle: this.resetPassWord,
          },
          {
            label: '删除',
            color: '#ff3c3c',
            handle: this.delete,
          },
        ],
        operation1: [ //启用状态下操作
          {
            label: '修改',
            color: '#07c362',
            handle: this.edit,
          },
          {
            label: '启用',
            color: '#20a7fe',
            handle: this.start,
          },
          {
            label: '重置密码',
            color: '#adadad',
            handle: this.resetPassWord,
          },
          {
            label: '删除',
            color: '#ff3c3c',
            handle: this.delete,
          },
        ],
      }
    },
    methods: {
      goAdd(){
        this.$router.push({name: 'addAccount'})
      },
      select(){
      },
      lookUser(){ // 查看

      },
      edit(){ // 修改

      },
      stop(){ // 停用

      },
      resetPassWord(){ // 重置密码

      },
      delete(){ // 删除

      },
      start(){  // 启用

      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .account-manage {
    padding: 20px;
    .add-user {
      .add-user-box {
        padding: 20px 40px 20px 20px;
        .tips {
          color: #606266;
          margin-left: 100px;
          width: 500px;
          font-size: 14px;
        }
        .el-form-item {
          display: flex;
          .el-form-item__content {
            flex: 1;
            margin-left: 10px !important;
          }
        }
      }
      .btn-group {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
