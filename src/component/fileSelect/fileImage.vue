<template>
  <div class="file-image">
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
        :data="{type:2}"
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
          type: 2
        },
        total: 1,
        pageCount: 1,
        imgNum: 0,
        totalSize: 0
      }
    },
    computed: {
      ...mapGetters(['upload_file']),
    },
    created(){
      this.init()
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
        if (data.size > fileSize.image) {
          this.$message.error(`上传的图片不能大于${fileSize.image / 1024 }KB`)
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
      },
      cancel(){
        this.$emit('cancel')
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
  .file-image {
    .pagination {
      text-align: center;
      margin: 20px 0;
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
    .select-btn-group {
      display: flex;
      justify-content: center;
      border-top: 1px solid #d9d9d9;
      padding-top: 30px;
    }
  }
</style>
