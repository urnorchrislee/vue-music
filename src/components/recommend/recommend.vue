<template>
    <div class="rank">我是recommend</div>
</template>
<script>
    import { getRecommend } from '@/api/recommend.js'
    import { ERR_OK } from 'common/js/config.js'

    export default {
        created (){
            this._getRecommend();
        },
        methods: {
            _getRecommend () {
                getRecommend().then((res) => {
                    if(res.code === ERR_OK){
                        console.log(res);
                    }
                })
            }
        }
    }
</script>
<style scoped>
    div.rank{
        color: red;
        margin-top: 100px; 
    }
</style>