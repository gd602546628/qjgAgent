<template>
  <div class="user-manage">
    <top-filter title="用户管理">
      <div slot="top">
        <div class="form-item">
          <span>账号：</span>
          <el-input placeholder="请输入账号" v-model="formData.account"></el-input>
        </div>
        <div class="form-item">
          <span>账号状态：</span>
          <el-select v-model="formData.status" placeholder="请选择账号状态">
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
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="loadPage"
        :page-size="this.formData.pageSize"
        :page-count="pageCount"
      >
      </el-pagination>
    </div>
    <common-model title="添加用户"
                  :show="showAddModel"
                  @closeModel="add_cancel"
                  class="add-user"
    >

      <el-form class="add-user-box" label-width="100px" :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="账号：" prop="account" v-if="!editFlag">
          <el-input placeholder="请输入账号" v-model="addForm.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：" prop="name" v-if="!editFlag">
          <el-input placeholder="请输入用户名称" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称：" prop="doorName" v-if="!editFlag">
          <el-input placeholder="请输入店铺名称" v-model="addForm.doorName"></el-input>
        </el-form-item>
        <el-form-item label="磁盘容量：" prop="diskSize">
          <el-input placeholder="请输入磁盘容量" v-model="addForm.diskSize"></el-input>
        </el-form-item>
        <div class="tips">注：添加的账号密码默认为“111111”，请提示代理商登录后先修改密码后再进行操作</div>
      </el-form>
      <div class="btn-group">
        <div class="q-btn-confirm" @click="add_confirm">确定</div>
        <div class="q-btn-cancel" @click="add_cancel">取消</div>
      </div>
    </common-model>
  </div>
</template>

<script>
  import topFilter from '../../../component/topFilter.vue'
  import commonTable from '../../../component/table.vue'
  import commonModel from '../../../component/commonModel.vue'
  import Api from '../../../api/api'
  import {code} from '../../../config/config'
  import {mapGetters} from 'vuex'
  export default{
    components: {
      topFilter,
      commonTable,
      commonModel
    },
    computed: {
      ...mapGetters(['sysUserBg'])
    },
    data(){
      return {
        formData: {
          agentId: '',
          endTime: '',
          pageNum: 1,
          pageSize: 10,
          startTime: '',
          status: '',
          account: '',
        },
        addForm: {
          account: '',
          diskSize: '',
          doorName: '',
          name: '',
          password: '111111',
        },
        updateData: {
          id: '',
          diskSize: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {min: 1, max: 20, message: '名称为1-20位汉子、字母、数字、特殊字符', trigger: 'blur'}
          ],
          diskSize: [
            {required: true, message: '请输入磁盘容量', trigger: 'blur'},
          ],
          doorName: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
          ],
        },
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
            label: '创建时间',
            prop: 'account'
          },
          {
            label: '磁盘容量',
            prop: 'diskLabel'
          },
          {
            label: '项目数量',
            prop: 'objectNum'
          },
          {
            label: '登录次数',
            prop: 'loginNum'
          },
          {
            label: '最后登录时间',
            prop: 'lastLoginTime'
          },
          {
            label: '账号状态',
            prop: 'statusLabel'
          },
        ],
        tableData: [],
        operation: [ //启用状态下操作
          /*      {
           label: '查看',
           color: '#20a7fe',
           handle: this.lookUser,
           },*/
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
      /*    {
            label: '删除',
            color: '#ff3c3c',
            handle: this.delete,
          },*/
        ],
        operation1: [ //停用状态下操作
          /*    {
           label: '查看',
           color: '#20a7fe',
           handle: this.lookUser,
           },*/
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
          /*     {
           label: '删除',
           color: '#ff3c3c',
           handle: this.delete,
           },*/
        ],
        pageCount: 1,
        total: 1,
        editFlag: false
      }
    },
    created(){
      this.getList()
    },
    methods: {
      goAdd(){
        this.showAddModel = true
      },
      add_confirm(){
        this.$refs.addForm.validate(async flag => {
          if (flag) {
            if (!this.editFlag) {
              this.addForm.diskSize = parseInt(this.addForm.diskSize) * 1024 * 1024
              let data = await Api.account.add(this.addForm)
              if (data.code === code.SUCCESS) {
                this.$message.success('添加成功')
                this.getList()
                this.add_cancel()
              } else {
                this.addForm.diskSize = parseInt(this.addForm.diskSize) / 1024 / 1024
                this.$message.error(data.mesg)
              }
            } else {
              this.updateData.diskSize = parseInt(this.addForm.diskSize) * 1024 * 1024
              let data = await Api.account.update(this.updateData)
              if (data.code === code.SUCCESS) {
                this.$message.success('修改成功')
                this.getList()
                this.add_cancel()
              } else {
                this.$message.error(data.mesg)
              }
            }
          }
        })
      },
      add_cancel(){
        this.showAddModel = false
        this.addForm = {
          account: '',
          diskSize: '',
          doorName: '',
          name: '',
          password: '111111'
        }
        this.updateData = {
          id: '',
          diskSize: ''
        }
        this.editFlag = false
      },
      select(){
      },
      lookUser(){ // 查看

      },
      edit(index, item){ // 修改
        this.updateData.id = item.id
        this.addForm.diskSize = item.diskSzie
        this.editFlag = true
        this.showAddModel = true
      },
      async stop(index, item){
        let data = await Api.account.update({
          id: item.id,
          status: 1
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('停用成功')
          item.status = 1
          item.operation = this.operation1
          item.statusLabel = '停用'
        }
      },
      async start(index, item){
        let data = await Api.account.update({
          id: item.id,
          status: 0
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('启用成功')
          item.status = 0
          item.operation = this.operation
          item.statusLabel = '启用'
        }
      },
      async resetPassWord(index, item){ // 重置密码
        let data = await Api.account.update({
          id: item.id,
          password: '111111'
        })
        if (data.code === code.SUCCESS) {
          this.$message.success('密码重置成功')
        } else {
          this.$message.error(data.mesg)
        }
      },
      delete(){ // 删除

      },
      loadPage(currentPage){
        this.formData.pageNum = currentPage
        this.getList()
      },
      fileSize(val){
        let kb = (val / 1024)
        let mb = (kb / 1024)
        let result = ''
        if (kb >= 1024) {
          return mb.toFixed(1) + '  mb'
        } else {
          return kb.toFixed(1) + '  kb'
        }
      },
      async getList(){
        this.formData.agentId = this.sysUserBg.id
        let data = await Api.account.getList(this.formData)
        this.total = data.data.allCount
        this.pageCount = data.data.totalPage
        data.data.list.forEach(item => {
          item.statusLabel = item.status === 0 ? '启用' : '停用'
          item.diskLabel = this.fileSize(item.diskSize)
          if (item.status === 0) {
            item.operation = this.operation
          } else {
            item.operation = this.operation1
          }
          this.tableData = data.data.list
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .user-manage {
    padding: 20px;
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
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
