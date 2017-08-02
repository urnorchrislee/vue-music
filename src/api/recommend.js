import jsonp from 'common/js/jsonp.js'
import { commonParams, options } from 'common/js/config.js'
import axios from 'axios'

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        uin:1065242992,
        platform:'h5',
        needNewCode:1,
        _:1501650028842
    })

    return jsonp(url, data, options)
}

export function getDiscList(){
    const url = '/api/getDiscList'

    const data = Object.assign({}, commonParams, {
        rnd:Math.random(),
        hostUin:0,
        platform:'yqq',
        needNewCode:0,
        categoryId:10000000,
        sortId:5,
        sin:0,
        format:'json',
        ein:29
    })

    return axios.get(url, {
        params: data
    }).then((res)=>{
        return Promise.resolve(res.data)
    })
}