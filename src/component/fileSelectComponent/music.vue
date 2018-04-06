<template>
  <div class="fileComponent-music">
    <div class="music-bg" v-if="url" @click="playMusic">
      <p class="icon-yybw icon"></p>
      <div class="icon-wrap" v-if="play">
        <p class="icon-zt icon-an"></p>
      </div>
      <div class="icon-wrap" v-if="!play">
        <p class="icon-bf icon-an"></p>
      </div>
      <audio :src="resultUrl" ref="music" @ended="videoEnd"></audio>
    </div>
    <el-button size="small" type="primary" @click="openFileSelect(3)" class="add-btn">添加音乐</el-button>
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
      playMusic(){
        if (this.$refs.music.paused) {
          this.$refs.music.play()
          this.play = true
        } else {
          this.$refs.music.pause()
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
  .fileComponent-music {
    display: flex;
    flex-direction: column;
    .music-bg {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f9;
      position: relative;
      margin-bottom: 20px;
      .icon-wrap {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-an {
          font-size: 50px;
          color: #646567;
        }
      }
      .icon {
        color: #c8c6c6;
        font-size: 40px;
      }
    }
    .add-btn {
    }
  }
</style>
