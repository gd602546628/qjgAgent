/**
 * Created by gd on 2018/1/4/004.
 * 资源
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  getList: `${urlPre}source/getList`,
  add: `${urlPre}source/add`,
  deleteById: `${urlPre}source/deleteById`,
  hotGetList: `${urlPre}source/hotspot/getList`,
  iconGetList: `${urlPre}source/icon/getList`,
  hotAdd: `${urlPre}source/hotspot/add`,
  hotDelete: `${urlPre}source/hotspot/deleteById`,
  getSourceFile: `${urlPre}sourceFile/getList`,
  deleteSourceFileById: `${urlPre}sourceFile/deleteById`,
  getAllIcon: `${urlPre}source/icon/getAll`,
}
let source = {
  getList: async function (params = {}) {
    let data = await httpService.post(url.getList, params)
    return data
  },
  add: async function (params = {}) {
    let data = await httpService.post(url.add, params)
    return data
  },
  deleteById: async function (params = {}) {
    let data = await httpService.post(url.deleteById, params)
    return data
  },
  hotGetList: async function (params = {}) {
    let data = await httpService.post(url.hotGetList, params)
    return data
  },
  iconGetList: async function (params = {}) {
    let data = await httpService.post(url.iconGetList, params)
    return data
  },
  hotAdd: async function (params = {}) {
    let data = await httpService.post(url.hotAdd, params)
    return data
  },
  hotDelete: async function (params = {}) {
    let data = await httpService.post(url.hotDelete, params)
    return data
  },
  getSourceFile: async function (params = {}) {
    let data = await httpService.post(url.getSourceFile, params)
    return data
  },
  deleteSourceFileById: async function (params = {}) {
    let data = await httpService.post(url.deleteSourceFileById, params)
    return data
  },
  getAllIcon: async function (params = {}) {
    let data = await httpService.post(url.getAllIcon, params)
    return data
  },
}
export default source
