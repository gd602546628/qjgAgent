<template>
  <div class="q-table-wrap">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      stripe
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="80"
        v-if="!hideDelete"
      >
      </el-table-column>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{scope.$index + 1}}






        </template>
      </el-table-column>
      <el-table-column
        :width="item.width||''"
        :prop="item.prop"
        :label="item.label"
        v-for="(item,index) in tableHeader"
        :key="index"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" v-if="showOperation" :width="operationWidth">
        <template slot-scope="scope">
          <div class="operation">
            <div
              class="operation-item"
              v-for="item in scope.row.operation"
              :style="{color:item.color}"
              @click="item.handle&&item.handle(scope.$index, scope.row)">{{item.label}}




            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="delete-btn" v-if="!hideDelete" @click.stop="deleteAll">
      批量删除




    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tableHeader: {
        type: Array,
        required: true
      },
      tableData: {
        type: Array,
        required: true
      },
      showOperation: {
        type: Boolean,
        default: true
      },
      operationWidth: {
        type: Number,
        default: 260
      },
      hideDelete: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        multipleSelection: [],
      }
    },
    created(){
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteAll(){
        this.$emit('deleteAll', this.multipleSelection)
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .q-table-wrap {
    /* .el-table--striped .el-table__body tr.el-table__row--striped td {
       background: #f9fdff;
     }*/
    .cell {
      text-align: center;
    }
    .has-gutter {
      tr {
        th {
          background: #f8e8dd;
          /*&:nth-child(1){
           .cell{
             text-align: left;
           }
          }
          .cell{
            color: #2f2f2f;
            text-align: center;
          }*/

        }
      }
    }
    .delete-btn {
      color: #ffffff;
      background: #ff3c3c;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 114px;
      height: 32px;
      margin-top: 14px;
      cursor: pointer;
    }
    .operation {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .operation-item {
        flex: 1;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
