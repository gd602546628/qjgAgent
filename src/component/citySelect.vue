<template>
  <el-cascader
    placeholder="试试搜索：玉溪"
    expand-trigger="hover"
    :options="q_cityInfo"
    v-model="area"
    :props="cityInfoProp"
    @change="selectCity"
    filterable
  >
  </el-cascader>
</template>


<script>
  import {mapGetters} from 'vuex'
  export default{
    computed: {
      ...mapGetters(['q_cityInfo'])
    },
    data(){
      return {
        area: [],
        cityInfoProp: {
          label: 'name',
          value: 'id',
          children: 'nextArea'
        },
      }
    },
    methods: {
      getCityObjById(id){ // 更具id获取城市对象
        let result = null
        let step = function (item) {
          if (item.id === id) {
            result = item
            return
          }
          if (item.nextArea && item.nextArea.length > 0) {
            item.nextArea.forEach(innerItem => {
              step(innerItem)
            })
          }
        }
        this.q_cityInfo.forEach(item => {
          step(item)
        })
        return JSON.parse(JSON.stringify(result))
      },
      selectCity(val){
        this.form.provinceCode = val[0]
        this.form.cityCode = val[1]
        this.form.countyCode = val[2]
        this.$emit('selectCity')
      },
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped></style>
