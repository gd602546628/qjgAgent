/**
 * Created by gd on 2018/1/4/004.
 * 项目管理
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  deleteById: `${urlPre}source/sourceObject/deleteById`, // 删除项目
  update: `${urlPre}source/sourceObject/update`,// 更新项目
  getList: `${urlPre}source/sourceObject/getList`, //项目列表
  add: `${urlPre}source/sourceObject/add`, //添加项目
  getById: `${urlPre}source/sourceObject/getById`, //跟新项目
}
let sourceObject = {
  deleteById: async function (params = {}) {
    let data = await httpService.post(url.deleteById, params)
    return data
  },
  getList: async function (params = {}) {
    let data = await httpService.post(url.getList, params)
    return data
  },
  add: async function (params = {}) {
    let data = await httpService.post(url.add, params)
    return data
  },
  update: async function (params = {}) {
    let data = await httpService.post(url.update, params)
    return data
  },
  getById: async function (params = {}) {
    let data = await httpService.post(url.getById, params)
    return data
  },
}
export default sourceObject
