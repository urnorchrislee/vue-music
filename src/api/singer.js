import jsonp from 'common/js/jsonp.js'
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

export function getSingerDetail(singerId){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
        hostUin:0,
        platform:'yqq',
        needNewCode:0,
        singermid:singerId,
        order:'listen',
        begin:0,
        num:100,
        songstatus:1,
        g_tk:1909296845
    })

    return jsonp(url, data, options)
}