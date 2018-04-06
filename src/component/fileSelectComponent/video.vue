<template>
  <div class="fileComponent-video">
    <div class="video" @click="playVideo">
      <video :src="resultUrl" v-if="url" @ended="videoEnd()" ref="video"></video>
      <div v-if="play&&url" class="icon-wrap">
        <p class="icon-zt icon"></p>
      </div>
      <div v-if="!play&&url" class="icon-wrap">
        <p class="icon-bf icon"></p>
      </div>
    </div>
    <el-button size="small" type="primary" @click="openFileSelect(2)" class="add-btn">添加视频</el-button>
    <file-select ref="fileSelect" @confirm="fileSelectConfirm"></file-select>
  </div>
</template>
<script>
  import fileSelect from '@/component/fileSelect/fileSelect.vue'
  import {filePre} from '@/config/config'
  export default{
    components: {
      fileSelect
    },
    data(){
      return {
        url: '',
        play: false,
      }
    },
    computed: {
      resultUrl(){
        return filePre + this.url
      }
    },
    methods: {
      openFileSelect(index){
        this.$refs.fileSelect.showModel(index)
      },
      fileSelectConfirm(data){
        this.url = data.url
        this.play = false
        this.$emit('confirm', this.url)
      },
      playVideo(){
        if (this.$refs.video.paused) {
          this.$refs.video.play()
          this.play = true
        } else {
          this.$refs.video.pause()
          this.play = false
        }
      },
      videoEnd(){
        this.play = false
      },
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .fileComponent-video {
    display: flex;
    flex-direction: column;
    .video {
      width: 100%;
      position: relative;
      video {
        width: 100%;
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
          font-size: 50px;
          color: #ffffff;
        }
      }
    }
    .add-btn {
      margin-top: 20px;
    }
  }
</style>
