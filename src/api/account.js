/**
 * Created by gd on 2018/4/17/017.
 */
import httpService from '../service/httpService'
import {urlPre} from '../config/config'

class Account {
  constructor() {
    this.addUrl = `${urlPre}system/account/add`
    this.getListUrl = `${urlPre}system/account/getList`
    this.updateUrl = `${urlPre}system/account/update`
  }

  async update(params = {}) {
    let data = await httpService.post(this.updateUrl, params)
    return data
  }

  async add(params = {}) {
    let data = await httpService.post(this.addUrl, params)
    return data
  }

  async getList(params = {}) {
    let data = await httpService.post(this.getListUrl, params)
    return data
  }
}
export default new Account()
