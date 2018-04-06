<template>
  <div class="file-video">
    <div class="image-wrap">
      <div class="image-item" v-for="(item,index) in imageList" @click.stop="playVideo(item,index)">
        <div class="img">
          <audio :src="imgPre(item)" class="video" ref="video" @ended="videoEnd(item)">
          </audio>
          <div class="size">{{item.size | fileSize}}</div>
          <div class="music-bg">
            <p class="icon-yybw icon"></p>
          </div>
          <div v-if="item.play" class="icon-wrap">
            <p class="icon-zt icon"></p>
          </div>
          <div v-if="!item.play" class="icon-wrap">
            <p class="icon-bf icon"></p>
          </div>
          <div @click.stop="selectItem(item)" class="check-box">
            <label role="checkbox" class="el-checkbox"
                   :class="{'is-checked':item.selected}"
                   :aria-checked="true"
            >
            <span aria-checked="mixed" class="el-checkbox__input" :class="{'is-checked':item.selected}">
              <span class="el-checkbox__inner"></span><input
              type="checkbox" class="el-checkbox__original" value=""></span>
            </label>
          </div>
        </div>
      </div>
      <el-upload
        class="image-item"
        :action="this.upload_file"
        :on-success="imgUploadSuccess"
        :before-upload="beforeImgUpload"
        :show-file-list="false"
        :data="{type:3}"
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
          pageSize: 7,
          type: 3
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
        return filePre + item.url
      },
      playVideo(item, index){
        if (this.$refs.video[index].paused) {
          this.$refs.video[index].play()
          item.play = true
        } else {
          this.$refs.video[index].pause()
          item.play = false
        }
      },
      selectItem(item){
        this.imageList.forEach(img => {
          img.selected = false
        })
        item.selected = true
      },
      videoEnd(item){
        item.play = false
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
        this.loading.close()
        if (data.code === code.SUCCESS) {
          this.init()
        } else {
          this.$message.error(data.mesg)
        }
      },
      beforeImgUpload(data){
        if (data.size > fileSize.music) {
          this.$message.error(`上传的音频不能大于${fileSize.music / 1024 / 1024}M`)
          return false
        }
        let flag = this.uploadCheck(/.[mp3]$/g, '只能上传mp3格式', data)
        if (flag) {
          this.loading = this.$loading({
            lock: true,
            text: '正在上传视频',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }
        return flag
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
  .file-video {
    .pagination {
      text-align: center;
      margin: 20px 0;
    }
    .image-wrap {
      padding: 20px 60px;
      display: flex;
      flex-wrap: wrap;
      .image-item {
        width: 25%;
        margin-bottom: 40px;
        .img {
          background: #f5f5f9;
          position: relative;
          width: 90%;
          padding-bottom: 90%;
          .music-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
              color: #c8c6c6;
              font-size: 50px;
            }
          }
          .icon-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .icon {
              color: #646567;
              font-size: 50px;
            }
          }
          .video {
            width: 100%;
            height: 100%;
          }
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
          .check-box {
            position: absolute;
            bottom: -30px;
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
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
