<template>
  <common-model :title="title" :show="show" @closeModel="closeModel">
    <div class="file-box">
      <file-image v-show="currentIndex==0" @cancel="closeModel" @confirm="confirm"></file-image>
      <file-icon v-show="currentIndex==1" @cancel="closeModel" @confirm="confirm"></file-icon>
      <file-video v-show="currentIndex==2" @cancel="closeModel" @confirm="confirm"></file-video>
      <file-music v-show="currentIndex==3" @cancel="closeModel" @confirm="confirm"></file-music>
    </div>
  </common-model>
</template>
<script>
  import Api from '@/api/api'
  import fileImage from './fileImage.vue'
  import fileIcon from './fileIcon.vue'
  import fileVideo from './fileVideo.vue'
  import fileMusic from './fileMusic.vue'
  import commonModel from '../commonModel.vue'
  export default{
    components: {
      fileImage,
      fileIcon,
      fileVideo,
      fileMusic,
      commonModel
    },
    data(){
      return {
        currentIndex: 0,// 0图片 1 Icon 2视频 3音频
        show: false,
        title: '文件选择',
        titleMap: ['图片选择', '图标选择', '视频选择', '音频选择']
      }
    },
    created(){
    },
    methods: {
      closeModel(){
        this.show = false
      },
      showModel(index){
        this.show = true
        this.currentIndex = index
        this.title = this.titleMap[index]
      },
      confirm(data){
        this.show = false
        this.$emit('confirm', data, this.currentIndex)
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .file-box {
    border-top: none;
    width: 1050px;
  }
</style>
