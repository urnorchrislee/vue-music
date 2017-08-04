<template>
    <transition name="slide-fade">
        <div class="singer-detail"></div>
    </transition>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getSingerDetail } from 'api/singer'
    import { ERR_OK } from 'common/js/config'
    import { createSong } from 'common/js/song'

    export default {
        data(){
            return {
                songs: []
            }
        },
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created(){
            this._getDetail()
        },
        methods: {
            _getDetail(){
                if(!this.singer.id){
                    this.$router.push('/singer')
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if(res.code == ERR_OK){
                        this.songs = this._normalizeSongs(res.data.list)
                        console.log(this.songs)
                    }
                })
            },
            _normalizeSongs(list){
                let ret = []
                list.forEach((item)=>{
                    let {musicData} = item
                    if(musicData.songid && musicData.albummid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        }
    }
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