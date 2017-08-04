import { commonParams, options, ERR_OK } from 'common/js/config.js'
import axios from 'axios'

export function getSingerList(){

    const url = '/api/getSingerList'

    const data = Object.assign({}, commonParams, {
        channel:'singer',
        page:'list',
        key:'all_all_all',
        pagesize:100,
        pagenum:1,
        g_tk:1909296845,
        loginUin:1065242992,
        hostUin:0,
        format:'json',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq',
        needNewCode:0
    })

    return axios.get(url, {
        params: data
    }).then((res)=>{
        return Promise.resolve(res.data)
    })
}

export function getSingerDetail(){
    
}