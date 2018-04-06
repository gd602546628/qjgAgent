<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>
<script>
  export default{
    props: {
      smallCircleR: {
        type: Number,
        default: 50
      },
      bigCircleR: {
        type: Number,
        default: 105
      },
      data: {
        type: Array
      },
      total: {
        type: Number
      }
    },
    data(){
      return {
        parentWidth: '',
        parentHeight: '',
        canvas: null,
        ctx: null,
        canvasCenter: { //canvas中心点
          x: '',
          y: ''
        },
      }
    },
    created(){
    },
    mounted(){
      this.initSize()
      this.init()
    },
    methods: {
      init()  {
        let begin = -Math.PI / 2 //从-90度开始画

        let lineResult = []
        this.data.forEach(item => {
          let end = (Math.PI * 2 * item.value / this.total + begin)
          this.fillCircle(begin, end, item.style)
          lineResult.push(this.getTextPoint(begin, end, item))
          begin = end
        })
        this.fillSmallCircle()
        //this.drawText(lineResult)
      },
      initSize(){ // 初始化各种尺寸
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.parentHeight = this.canvas.parentNode.offsetHeight
        this.parentWidth = this.canvas.parentNode.offsetWidth
        this.canvas.height = this.parentHeight
        this.canvas.width = this.parentWidth
        this.canvasCenter.x = Math.ceil(this.canvas.width / 2)
        this.canvasCenter.y = Math.ceil(this.canvas.height / 2)
      },
      fillCircle(begin, end, style){
        this.ctx.beginPath()
        this.ctx.moveTo(this.canvasCenter.x, this.canvasCenter.y)
        this.ctx.arc(this.canvasCenter.x, this.canvasCenter.y, this.bigCircleR, begin, end, false)
        this.ctx.closePath()
        this.ctx.fillStyle = style
        this.ctx.fill()
      },
      fillSmallCircle(){
        this.ctx.beginPath()
        this.ctx.arc(this.canvasCenter.x, this.canvasCenter.y, this.smallCircleR, Math.PI * 2, false)
        this.ctx.closePath()
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fill()
      },
      getTextPoint(begin, end, item){
        /*degress 中间切点角度*/

        let degrees = (end + begin) / 2 / Math.PI * 180

        let point = {
          x: Math.cos(degrees) * this.bigCircleR + this.canvasCenter.x,
          y: Math.sin(degrees) * this.bigCircleR + this.canvasCenter.y
        }
        let target = {
          x: 0,
          y: 0
        }
        let vector = {} // 方向向量
        vector.x = point.x > this.canvasCenter.x ? 1 : -1
        vector.y = point.y > this.canvasCenter.y ? 1 : -1
        target.x = point.x + 22 * vector.x
        target.y = point.y + 46 * vector.y
        return {
          move: point,
          target: target,
          vector: vector,
          item: item
        }
      },
      drawText(lineResult){
        lineResult.forEach(item => {
          this.ctx.beginPath()
          this.ctx.moveTo(item.move.x, item.move.y)
          this.ctx.lineTo(item.target.x, item.target.y)
          this.ctx.closePath()
          this.ctx.lineWidth = 3
          this.ctx.strokeStyle = item.item.lineStyle
          this.ctx.stroke()

          this.ctx.beginPath()
          this.ctx.moveTo(item.target.x, item.target.y)
          this.ctx.lineTo(item.target.x + 100 * item.vector.x, item.target.y)
          this.ctx.closePath()
          this.ctx.lineWidth = 3
          this.ctx.strokeStyle = item.item.lineStyle
          this.ctx.stroke()
          this.ctx.fillStyle = item.item.textStyle
          this.ctx.font = "14px serif";
          let fontX = item.vector.x === 1 ? item.target.x + 14 : item.target.x - 86
          let fontY = item.vector.y === 1 ? item.target.y - 10 : item.target.y - 10
          fontX = fontX < 0 ? 0 : fontX
          fontX = fontX > this.parentWidth ? this.parentWidth : fontX
          this.ctx.fillText(item.item.title, fontX, fontY);
        })
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped></style>
