import jsonp from 'common/js/jsonp.js'
import { commonParams, options } from 'common/js/config.js'

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