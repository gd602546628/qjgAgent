/**
 * Created by gd on 2018/1/4/004.
 * 系统-用户管理
 */

import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  updatePassword: `${urlPre}system/user/updatePassword`,// 更新账号密码
  updateStatus: `${urlPre}system/user/updateStatus`, //跟新账号状态
  deleteById: `${urlPre}system/user/deleteById`,//删除用户
  update: `${urlPre}system/user/update`, //更新账号信息
  add: `${urlPre}system/user/add`, //添加用户
  getList: `${urlPre}system/user/getList`,//用户列表
}

let systemUser = {
  async updatePassword(params = {}){
    let data = await httpService.post(url.updatePassword, params)
    return data
  },
  async updateStatus(params = {}){
    let data = await httpService.post(url.updateStatus, params)
    return data
  },
  async deleteById(params = {}){
    let data = await httpService.post(url.deleteById, params)
    return data
  },
  async update(params = {}){
    let data = await httpService.post(url.update, params)
    return data
  },
  async add(params = {}){
    let data = await httpService.post(url.add, params)
    return data
  },
  async getList(params = {}){
    let data = await httpService.post(url.getList, params)
    return data
  },
}

export default systemUser
