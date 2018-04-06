/**
 * Created by gd on 2018/1/4/004.
 * 区域管理
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  getList: `${urlPre}source/area/getList`, //获取区域列表
  areaCode: `${urlPre}source/areaCode/getAllArea`, // 获取所有行政区域
}
let area = {
  getList: async function (params = {}) {
    let data = await httpService.post(url.getList, params)
    return data
  },
  areaCode: async function (params = {}) {
    let data = await httpService.post(url.areaCode, params)
    return data
  },
}

export default area
