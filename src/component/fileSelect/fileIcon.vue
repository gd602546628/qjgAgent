<template>
  <div class="file-image">
    <div class="icon-tab">
      <p class="tab-item" @click.stop="tabClick(1)" :class="{active:currentIndex===1}">系统图标</p>
      <p class="tab-item" @click.stop="tabClick(0)" :class="{active:currentIndex===0}">自定义图标</p>
    </div>
    <div class="oun-icon" v-show="currentIndex===0">
      <div class="image-wrap">
        <div class="image-item" v-for="item in imageList" @click.stop="selectItem(item)">
          <div class="img" :style="{backgroundImage:imgPre(item)}">
            <div class="size">{{item.size | fileSize}}</div>
            <div v-if="item.selected" class="img-selected">
              <p class="el-icon-circle-check-outline icon"></p>
            </div>
          </div>
        </div>
        <el-upload
          class="image-item"
          :action="this.upload_file"
          :on-success="imgUploadSuccess"
          :before-upload="beforeImgUpload"
          :show-file-list="false"
          :data="{type:1}"
        >
          <p class="icon-add"></p>
        </el-upload>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="params.pageSize"
          :page-count="pageCount"
          @current-change="loadPage"
        >
        </el-pagination>
      </div>
    </div>
    <div class="sys-icon" v-show="currentIndex===1">
      <div class="image-wrap">
        <div class="image-item" v-for="item in sysIconList" @click.stop="selectItem(item)">
          <div class="img" :style="{backgroundImage:imgPre(item)}">
            <div v-if="item.selected" class="img-selected">
              <p class="el-icon-circle-check-outline icon"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="select-btn-group">
      <div class="q-btn-confirm" @click.stop="confirm">确定</div>
      <div class="q-btn-cancel" @click.stop="cancel">取消</div>
    </div>
  </div>
</template>
<script>
  import Api from '@/api/api'
  import {filePre, code, fileSize} from '@/config/config'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        imageList: [],
        params: {
          pageNum: 1,
          pageSize: 9,
          type: 1
        },
        total: 1,
        pageCount: 1,
        imgNum: 0,
        totalSize: 0,
        currentIndex: 1,
        sysIconType: 0,
        sysIconOptions: [
          {
            value: 0,
            label: '文字'
          },
          {
            value: 1,
            label: '链接'
          },
          {
            value: 2,
            label: '场景'
          },
          {
            value: 3,
            label: '图片'
          }, {
            value: 4,
            label: '视频'
          },
        ],
        sysIconList: []
      }
    },
    computed: {
      ...mapGetters(['upload_file']),
    },
    created(){
      this.init()
      this.changeSysIconType()
    },
    methods: {
      init(){
        this.getSourceFile()
      },
      async getSourceFile(){
        let data = await  Api.source.getSourceFile(this.params)
        data.data.list.forEach(item => {
          item.selected = false
          item.play = false
        })
        this.pageCount = data.data.totalPage
        this.total = data.data.allCount
        this.imgNum = data.data.allCount
        this.totalSize = data.data.other
        this.imageList = data.data.list
      },
      loadPage(currentPage){
        this.params.pageNum = currentPage
        this.getSourceFile()
      },
      imgPre(item){
        return `url(${filePre + item.url})`
      },
      selectItem(item){
        this.imageList.forEach(img => {
          img.selected = false
        })
        this.sysIconList.forEach(img => {
          img.selected = false
        })
        item.selected = true
      },
      uploadCheck(reg, errMessage, data){
        let test = reg
        let flag = test.test(data.name)
        if (!flag) {
          this.$message.error(errMessage)
        }
        return flag
      },
      imgUploadSuccess(data){
        if (data.code === code.SUCCESS) {
          this.init()
        } else {
          this.$message.error(data.mesg)
        }
      },
      beforeImgUpload(data){
        if (data.size > fileSize.icon) {
          this.$message.error(`上传的图标不能大于${fileSize.icon / 1024 }KB`)
          return false
        }
        return this.uploadCheck(/.[jepg|png|jpg]$/g, '只能上传jepg,jpg,png格式', data)
      },
      confirm(){
        this.imageList.forEach(item => {
          if (item.selected) {
            this.$emit('confirm', item)
          }
        })
        this.sysIconList.forEach(item => {
          if (item.selected) {
            this.$emit('confirm', item)
          }
        })
      },
      cancel(){
        this.$emit('cancel')
      },
      tabClick(index){
        this.currentIndex = index
      },
      async changeSysIconType(){
        let data = await Api.source.getAllIcon()
        data.data.forEach(item => {
          item.selected = false
        })
        this.sysIconList = data.data
      },
      addFilePre(value){
        return filePre + value
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .file-image {
    min-height: 410px;
    .icon-tab {
      height: 43px;
      background: #f8e8dd;
      display: flex;
      align-items: center;
      justify-content: center;
      .tab-item {
        width: 150px;
        color: #333333;
        font-weight: bold;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          color: #fe842b;
          border-bottom: 4px solid #fe842b;
        }
      }
    }
    .oun-icon {
      .pagination {
        text-align: center;
        margin: 20px 0;
      }

      .select-btn-group {
        display: flex;
        justify-content: center;
        border-top: 1px solid #d9d9d9;
        padding-top: 30px;
      }
    }
    .image-wrap {
      padding: 20px 60px;
      display: flex;
      flex-wrap: wrap;
      .image-item {
        width: 20%;
        margin-bottom: 20px;
        .el-upload {
          width: 90%;
          padding-bottom: 90%;
          background: #f5f5f9;
          border: 1px solid #d9d9d9;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          .icon-add {
            font-size: 50px;
            position: absolute;
            top: 50%;
            margin-top: -25px;
            &:before {
              color: #8a8a8a;
            }
          }
        }
        .img {
          position: relative;
          width: 90%;
          padding-bottom: 90%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          .size {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding-left: 12px;
            color: #ffffff;
            font-weight: bold;
            background: rgba(0, 0, 0, 0.5);
          }
          .img-selected {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
              font-size: 50px;
              color: #ffffff;
            }
          }
        }
      }
    }
    .sys-icon {
      .type-select {
        display: flex;
        align-items: center;
        margin: 20px;
      }
    }
  }
</style>
