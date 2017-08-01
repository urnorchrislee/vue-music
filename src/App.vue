<template>
  <div id="app">
    <MHeader></MHeader>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'

export default {
  name: 'app',
  components: {
    MHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  #app
    color: $color-theme
    font-size: $font-size-large-x
</style>
