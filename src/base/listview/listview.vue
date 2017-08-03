<template>
    <Scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{ group.title }}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar" alt="">
                        <span class="name">{{ item.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" 
             @touchstart="onShortcutTouchstart"
             @touchmove.stop.prevent="onShortcutTouchMove"
             >
            <ul>
                <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{'current' : currentIndex === index}">
                    {{ item }}
                </li>
            </ul>
        </div>
    </Scroll>
</template>
<script>
    import Scroll from 'base/scroll/scroll'
    import { getData } from 'common/js/dom.js'

    const ANCHOR_HEIGHT = 18

    export default {
        created(){
            // 为什么定义在这个生命周期钩子里面，在data()函数和props里面，Vue会添加get/set，观测变化，数据绑定dom，刷新页面
            // 不需要观测变化，只需要获取记录数据
            // 记录 start | move Y值的变化
            this.touch = {}
            this.listenScroll = true 
            this.listHeight = []
            this.probeType = 3
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            shortcutList(){
                return this.data.map((group) => {
                    return group.title.substring(0, 1)
                })
            }
        },
        data(){
            return {
                scrollY : -1,
                currentIndex: 0
            }
        },
        methods: {
            onShortcutTouchstart(e){ // 当用户点击字母触发的事件
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e){ // 当用户滑动列表监听的事件

                // 从start 到 move 滚动的一个位置，计算当前位置和之前位置的位置差，detla -> 滚动到第几个元素
                // 在 start 开始的时候记录位置，在 move 的时候再次记录这个位置，
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY

                // 偏移了几个锚点
                let detla = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + detla

                this._scrollTo(anchorIndex)
            },
            scroll(pos){
                this.scrollY = pos.y
            },
            _scrollTo(index){
                if(index === null){
                    return
                }
                
                if(index < 0){
                    index = 0
                } else if(index > this.listHeight.length - 2){
                    index = this.listHeight.length - 2
                }
                console.log(index)
                this.scrollY = -this.listHeight[index]
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            },
            _calculateHeight(){
                this.listHeight = []
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height)

                for(let i=0; i<list.length; i++){
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
        },
        watch:{
            data(){
                setTimeout(() => {
                    this._calculateHeight()
                }, 20)
            },
            scrollY(newY){
                const listHeight = this.listHeight

                // 顶部往上滚，newY>0
                if(newY >0){
                    this.currentIndex = 0
                    return
                }

                // 正常位置的滚动
                for(let i=0; i<listHeight.length-1; i++){
                    let height1 = listHeight[i]
                    let height2 = listHeight[i+1]

                    if(-newY >= height1 && -newY < height2){
                        this.currentIndex = i
                        return
                    }
                }

                // 滚动到底部，-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2
            }
        },
        components: {
            Scroll
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>