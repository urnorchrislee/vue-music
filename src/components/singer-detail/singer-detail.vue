<template>
    <transition name="slide-fade">
        <div class="singer-detail">singer-detail</div>
    </transition>
</template>
<script>
    export default {}
</script>
<style lang="stylus">
    .singer-detail
        position: fixed
        z-index: 100
        left: 0
        top: 0
        right: 0
        bottom: 0
        background: pink
        color: red
        font-size: 30px
    .slide-fade-enter-active 
        transition: all .3s ease   
    .slide-fade-leave-active 
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)   
    .slide-fade-enter, .slide-fade-leave-to
        transform: translateX(10px)
        opacity: 0  
</style>