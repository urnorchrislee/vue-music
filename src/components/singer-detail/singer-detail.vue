<template>
    <transition name="slide-fade">
        <MusicList
            :songs="songs"
            :title="title"
            :bg-image="bgImage"
        ></MusicList>
    </transition>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { getSingerDetail } from 'api/singer'
    import { ERR_OK } from 'common/js/config'
    import { createSong } from 'common/js/song'
    import MusicList from '@/components/music-list/music-list'

    export default {
        data(){
            return {
                songs: []
            }
        },
        computed: {
            title(){
                return this.singer.name
            },
            bgImage(){
                return this.singer.avatar
            },
            ...mapGetters([
                'singer'
            ])
        },
        components: {
            MusicList
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
    .slide-fade-enter-active 
        transition: all .3s ease   
    .slide-fade-leave-active 
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)   
    .slide-fade-enter, .slide-fade-leave-to
        transform: translateX(10px)
        opacity: 0  
</style>