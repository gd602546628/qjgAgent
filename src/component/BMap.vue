<template>
  <div ref="mapContent"></div>
</template>
<script>
  export default{
    props: {
      point: { // lat,lon 字符串拼接
        type: String
      }
    },
    data(){
      return {
        map: null
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        this.map = new BMap.Map(this.$refs.mapContent)
        this.map.enableScrollWheelZoom(true)
        this.changePoint(this.point)
        this.map.addEventListener('click', (e) => {
          this.$emit('mapClick', e)
        })
      },
      removeOverlay(){
        let allOverlay = this.map.getOverlays();
        allOverlay.forEach(item => {
          this.map.removeOverlay(item)
        })
      },
      changePoint(inPoint){
        let [lat, lon] = inPoint.split(',')
        let point = new BMap.Point(lon, lat)
        this.map.centerAndZoom(point, 15)
        let marker = new BMap.Marker(point)
        this.removeOverlay()
        this.map.addOverlay(marker)
      },
      changePointByAddress(address){
        this.addressToPoint(address).then(point => {
          this.removeOverlay()
          this.map.centerAndZoom(point, 15)
          this.map.addOverlay(new BMap.Marker(point))
        }).catch(() => {
          this.$message.error('没有搜索到目标地址')
        })
      },
      pointToAddress(point){ //坐标转地址
        let myGeo = new BMap.Geocoder()
        let [lat, lon] = point.split(',')
        return new Promise((resolve, reject) => {
          myGeo.getLocation(new BMap.Point(lon, lat), (result) => {
            resolve(result)
          })
        })
      },
      addressToPoint(address){ //地址转坐标
        return new Promise((resolve, reject) => {
          let options = {
            onSearchComplete: function (results) {
              if (local.getStatus() === BMAP_STATUS_SUCCESS) {
                // 判断状态是否正确
                resolve(results.getPoi(0).point)
              } else {
                reject()
              }
            }.bind(this)
          }
          let local = new BMap.LocalSearch(this.map, options)
          local.search(address)
        })
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped></style>
