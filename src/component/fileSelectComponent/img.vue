<template>
  <div class="fileComponent-img">
    <img :src="resultUrl" v-if="url" class="icon-img">
    <el-button size="small" type="primary" @click="openFileSelect(0)" class="add-btn">添加图片</el-button>
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
        url: ''
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
        this.$emit('confirm', this.url)
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .fileComponent-img {
    display: flex;
    flex-direction: column;
    .add-btn {
      margin-top: 20px;
    }
  }
</style>
