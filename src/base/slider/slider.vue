<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import { addClass } from 'common/js/dom.js'

    export default {
        data(){
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSliderWidth()
                this._initDots()
                this._initSlider()

                if(this.autoPlay){
                    this._play()
                }
            }, 20)

            window.addEventListener('resize', ()=>{
                if(!this.slider){
                    return
                }
                this._setSliderWidth(true)
                this.slider.refresh()
            })
        },
        methods: {
            _setSliderWidth(isResize){
                // 获取整个列表有多少个元素
                this.children = this.$refs.sliderGroup.children

                // 设置宽度
                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth
                for(let i=0; i<this.children.length; i++){
                    let child = this.children[i]
                    addClass(child, 'slider-item')

                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }

                if(this.loop && !isResize){
                    width += 2*sliderWidth
                }

                this.$refs.sliderGroup.style.width = width + 'px' 
            },
            _initDots(){
                this.dots = new Array(this.children.length)
            },
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,          //滚动方向为 X 轴
                    scrollY: false,         //滚动方向为 Y 轴
                    momentum: false,        //当快速滑动时是否开启滑动惯性
                    snap: true,             //该属性是给 slider 组件使用的
                    snapLoop: this.loop,    //是否可以无缝循环轮播
                    snapThreshold: 0.3,     //用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
                    snapSpeed: 400,         //轮播图切换的动画时间
                    click: true             //是否派发click事件
                })

                this.slider.on('scrollEnd', ()=>{
                    let pageIndex = this.slider.getCurrentPage().pageX
                    if(this.loop){
                        pageIndex -= 1
                    }

                    this.currentPageIndex = pageIndex

                    if(this.autoPlay){
                        clearTimeout(this.timer)
                        this._play()
                    }
                })
            },
            _play(){
                let pageIndex = this.currentPageIndex + 1
                if(this.loop){
                    pageIndex += 1
                }
                this.timer = setTimeout(()=>{
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval)
            }
        },
        destroyed() {
            clearTimeout(this.timer)
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>