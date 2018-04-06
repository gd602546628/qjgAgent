/**
 * Created by gd on 2018/1/4/004.
 * 登录
 */
import httpService from '@/service/httpService'
import {urlPre} from '@/config/config'
let url = {
  login: `${urlPre}public/login`, //登录
  logout: `${urlPre}public/logout`,//退出
  getValidateCode: `${urlPre}public/getValidateCode`, // 获取验证码
  getDoorInfo:`${urlPre}system/user/getDoorInfo`, // 获取店铺统计
}
let login = {
  async login(params = {}, sessionId){
    let data = await httpService.formPost(url.login, params, sessionId)
    return data
  },
  async logout(params = {}){
    let data = await httpService.post(url.logout, params)
    return data
  },
  async getValidateCode(params = {}){
    let data = await httpService.post(url.getValidateCode, params)
    return data
  },
  async getDoorInfo(params = {}){
    let data = await httpService.post(url.getDoorInfo, params)
    return data
  },
}

export default login
