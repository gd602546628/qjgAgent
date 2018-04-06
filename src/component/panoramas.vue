<template>
  <div class="panorama-wrap">
    <div class="panorama-content" ref="panorama"></div>
    <div class="btn-wrap">
      <div class="btn-out" @click.stop="out">退出</div>
      <div class="btn-save" @click.stop="save">保存</div>
    </div>
    <common-model :show="showModel" title="添加热点" class="model" @closeModel="closeModel">
      <div class="select-category" v-show="currentType==-1">
        <el-form class="form" :model="formData" :rules="rules" ref="addForm">

          <el-form-item label="热点名称：" prop="title">
            <el-input v-model="formData.title" placeholder="请输入热点名称"></el-input>
          </el-form-item>

          <el-form-item label="热点类型：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择热点类型">
              <el-option label="文字" :value="0"></el-option>
              <el-option label="链接" :value="1"></el-option>
              <el-option label="场景" :value="2"></el-option>
              <el-option label="图片" :value="3"></el-option>
              <el-option label="视频" :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="指示图标：" prop="icon" class="icon-form">
            <file-icon @confirm="iconSelectConfirm"></file-icon>
          </el-form-item>
        </el-form>
        <div class="btn-group">
          <div class="q-btn-confirm" @click.stip="nextStep">下一步</div>
          <div class="q-btn-cancel" @click="closeModel()">取消</div>
        </div>
      </div>

      <div class="add-text add" v-show="currentType==0">
        <div class="wrap">
          <el-input
            type="textarea"
            :rows="6"
          >
          </el-input>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
      <div class="add-link add" v-show="currentType==1">
        <div class="wrap">
          <el-form :model="formData">
            <el-form-item label="链接地址">
              <el-input v-model="formData.url"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
      <div class="add-cj add" v-show="currentType==2">
        <el-form class="form" :model="formData">
          <el-form-item label="请选择场景：">
            <el-select v-model="formData.sceneId" placeholder="请选择场景">
              <el-option :label="item.name" :value="item.id" v-for="item in sceneList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
      <div class="add-image add" v-show="currentType==3">
        <div class="wrap">
          <file-img @confirm="imgSelectConfirm"></file-img>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
      <div class="add-video add" v-show="currentType==4">
        <div class="wrap">
          <file-video @confirm="videoConfirmSelect"></file-video>
        </div>
        <div class="btn-group">
          <div class="q-btn-cancel" @click="preStep()">上一步</div>
          <div class="q-btn-confirm" @click.stip="done">完成</div>
        </div>
      </div>
    </common-model>
  </div>
</template>


<script>
  import PhotoSphereViewer from '../plug/panoramas/index'
  import commonModel from '@/component/commonModel.vue'
  import util from '@/service/util'
  import {filePre, code} from '@/config/config'
  import Api from '@/api/api'
  import {mapGetters} from 'vuex'
  import fileSelect from '@/component/fileSelect/fileSelect.vue'
  import fileIcon from '@/component/fileSelectComponent/icon.vue'
  import fileImg from '@/component/fileSelectComponent/img.vue'
  import fileVideo from '@/component/fileSelectComponent/video.vue'
  export default{
    props: {
      sourceId: Number,
      img: String
    },
    components: {
      commonModel,
      fileSelect,
      fileIcon,
      fileImg,
      fileVideo
    },
    computed: {
    },
    data(){
      return {
        viewer: null,
        showModel: false,
        formData: {
          ath: '',
          atv: '',
          icon: '',
          image: '',
          latitude: '',
          longitude: '',
          sceneId: '',
          sourceId: '',
          title: '',
          type: '',
          url: '',
          video: ''
        },
        rules: {
          title: [{required: true, message: '请输入热点名称', trigger: 'blur'}],
          type: [{required: true, message: '请选择热点类型', trigger: 'blur'}],
          icon: [{required: true, message: '请选择图标', trigger: 'blur'}]
        },
        iconList: [],
        imgList: [],
        videoList: [],
        currentType: -1,
        saveFlag: false,
        selectSysIcon: null,
        addPointList: [], // 已添加的热点
        deletePointIds: [], // 要删除的热点id
        sceneList: [],// 场景列表
      }
    },
    created(){
    },
    mounted(){
      this.init()
    },
    destroyed(){
      this.destroyViewer()
    },
    methods: {
      async init(){
        let markList = await this.hotGetList()
        this.getSceneList()
        this.saveFlag = false
        this.viewer = PhotoSphereViewer({
          container: this.$refs.panorama,
          panorama: filePre + this.img,
          markers: markList,
          default_fov: 90,
          fisheye: false,
          max_fov: 75,
          time_anim: false,
          navbar: [
            'autorotate',
            'zoom',
            'download',
            // 'markers',
            'spacer-1',
            'caption',
            'gyroscope',
            'fullscreen'
          ],
          lang: {
            autorotate: 'Automatic rotation',
            zoom: 'Zoom',
            zoomOut: 'Zoom out',
            zoomIn: 'Zoom in',
            download: 'Download',
            fullscreen: 'Fullscreen',
            markers: 'Markers',
            gyroscope: 'Gyroscope'
          },
          gyroscope: true
        })
        this.viewer.on('click', (a) => {
          this.viewerClick(a)
        })
        this.viewer.on('select-marker', async (marker, dbclick) => {
          if (!dbclick) return
          await this.$confirm('确定删除热点吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          if (marker.data.flag) { // 新添加的点
            let indexFlag = -1
            this.addPointList.forEach((item, index) => {
              if (item.flag == marker.data.flag) {
                indexFlag = index
              }
            })
            if (indexFlag >= 0) {
              this.addPointList.splice(indexFlag, 1)
            }
          } else {
            this.deletePointIds.push(marker.data.id)
          }
          this.viewer.removeMarker(marker)
        })
      },
      closeModel(){
        this.showModel = false
        this.currentType = -1
        this.formData = {
          ath: '',
          atv: '',
          icon: '',
          image: '',
          latitude: '',
          longitude: '',
          sceneId: '',
          sourceId: '',
          title: '',
          type: '',
          url: '',
          video: ''
        }
        this.selectSysIcon = null
      },
      nextStep(){ //下一步
        if (!this.formData.icon && this.selectSysIcon) {
          this.formData.icon = this.selectSysIcon.url
        }
        this.$refs.addForm.validate(async validate => {
          if (validate) {
            if (this.formData.type == 0) {
              this.done()
            } else {
              this.currentType = this.formData.type
            }
          }
        })
      },
      preStep(){
        this.currentType = -1
      },
      done(){
        this.formData.sourceId = this.sourceId
        this.formData.flag = util.getRandomString()
        this.addPointList.push(Object.create(this.formData))
        this.addMarker()
        this.closeModel()
      },
      viewerClick(a){ // 场景点击
        this.showModel = true
        this.formData.longitude = a.longitude
        this.formData.latitude = a.latitude
        this.formData.ath = util.getLongitude(a.longitude)
        this.formData.atv = util.getLatitude(a.latitude)
      },
      destroyViewer(){
        if (this.viewer) {
          this.viewer.destroy()
          this.viewer = null
        }
      },
      async out(){
        if (!this.saveFlag) {
          await this.$confirm('您还未保存，是否退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.saveFlag = false
          this.$emit('out')
          this.destroyViewer()
        } else {
          this.saveFlag = false
          this.$emit('out')
          this.destroyViewer()
        }
      },
      async save(){
        let params = []
        this.addPointList.forEach(item => {
          let obj = {}
          for (let key in item) {
            obj[key] = item[key]
          }
          params.push(obj)
        })
        Api.source.hotDelete({ids: this.deletePointIds})
        let data = await Api.source.hotAdd(params)
        if (data.code === code.SUCCESS) {
          this.$message.success('保存成功')
          this.saveFlag = true
          this.addPointList = []
          this.deletePointIds = []
        } else {
          this.$message.error(data.mesg)
        }
      },
      async hotGetList(){
        let data = await Api.source.hotGetList({
          sourceId: this.sourceId
        })
        let result = []
        data.data.forEach(item => {
          result.push({
            id: util.getRandomString(),
            html: `<div style="background: black;color: white;text-align: center;">
<b>${item.title}</b></div>
<div></div>
<img src="${filePre + item.icon}" width="50px" height="50px">`,
            longitude: item.longitude,
            latitude: item.latitude,
            data: item
          })
        })
        return result
      },
      addMarker(){ // 绘制
        let option = {
          id: util.getRandomString(),
          html: `<div style="background: black;color: white;text-align: center;">
<b>${this.formData.title}</b></div>
<div></div>
<img src="${filePre + this.formData.icon}" width="50px" height="50px">`,
          longitude: this.formData.longitude,
          latitude: this.formData.latitude,
          data: this.formData
        }
        this.viewer.addMarker(option)
      },
      async getSceneList(){ // 获取场景列表，排除当前场景
        let data = await Api.source.getList({
          objectId: this.$route.params.id
        })
        let list = data.data
        let currentIndex = -1
        list.forEach((item, index) => {
          if (item.id === this.sourceId) {
            currentIndex = index
          }
        })
        if (currentIndex >= 0) {
          list.splice(currentIndex, 1)
        }
        this.sceneList = list
      },
      iconSelectConfirm(url){
        this.formData.icon = url
      },
      imgSelectConfirm(url){
        this.formData.image = url
      },
      videoConfirmSelect(url){
        this.formData.video = url
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .panorama-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .panorama-content {
      width: 100%;
      height: 100%;
    }
    .btn-wrap {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      z-index: 10;
      div {
        width: 76px;
        height: 34px;
        border-radius: 4px;
        text-align: center;
        line-height: 34px;
        color: #FFFFFF;
        margin-left: 20px;
        margin-top: 20px;
        cursor: pointer;
      }
      .btn-save {
        background: #146498;
      }
      .btn-out {
        background: #9a2424;
      }
    }
    .model {
      .select-category {
        .form {
          width: 70%;
          margin: 0 auto;
          padding-top: 20px;
          .icon-form {
            .el-form-item__content {
              .fileComponent-icon {
                align-items: flex-start;
                .icon-img {
                  width: 50px;
                  height: 50px;
                }
              }
              .el-button {
                display: block;
              }
            }
          }
          .el-form-item {
            display: flex;
            .el-form-item__content {
              flex: 1;
              .el-select {
                width: 100%;
              }
            }
          }
        }
        .btn-group {
          display: flex;
          justify-content: center;
          border-top: 1px solid #d9d9d9;
          padding-top: 30px;
        }
        .sysIcon-wrap {
          margin-left: 90px;
        }
      }
      .add {
        padding-top: 20px;
        .wrap {
          width: 70%;
          margin: 0 auto;
          padding-bottom: 20px;
        }
        .btn-group {
          display: flex;
          justify-content: center;
          border-top: 1px solid #d9d9d9;
          padding-top: 30px;
        }
      }
      .add-image, .add-video {
        .wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      }
      .add-image{
        .fileComponent-img{
          .icon-img{
            width: 275px;
            height: 275px;
          }
        }
      }
      .add-cj {
        .form {
          width: 70%;
          margin: 0 auto;
          padding-top: 20px;
          .el-form-item {
            display: flex;
            .el-form-item__content {
              flex: 1;
              .el-select {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>
