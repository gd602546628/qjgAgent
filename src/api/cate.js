/**
 * Created by gd on 2018/1/4/004.
 * 分类管理
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  getList: `${urlPre}source/cate/getList`, //获取区域列表
}

let cate = {
  getList: async function (params = {}) {
    let data = await httpService.post(url.getList, params)
    return data
  },
}
export default cate
