/**
 * Created by gd on 2018/1/4/004.
 * 系统-角色管理
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  getAllRole: `${urlPre}system/role/getAllRole`,// 角色列表
  addOrUpdateRole: `${urlPre}system/role/addOrUpdateRole`,// 增加角色
  getUrls: `${urlPre}system/role/getUrls`, // 可配置角色权限列表
  deleteRole: `${urlPre}system/role/deleteRole`,// 删除角色
}
let systemRole = {
  getAllRole: async function (params = {}) { //获取角色列表
    let data = await httpService.post(url.getAllRole, params)
    return data
  },
  addOrUpdateRole: async function (params = {}) { //更新角色
    let data = await httpService.post(url.addOrUpdateRole, params)
    return data
  },

  getUrls: async function (params = {}) { //更新角色
    let data = await httpService.post(url.getUrls, params)
    return data
  },

  deleteRole: async function (params = {}) { //更新角色
    let data = await httpService.post(url.deleteRole, params)
    return data
  }

}

export default systemRole
