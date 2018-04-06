/**
 * Created by gd on 2017/12/29/029.
 */
import axios from 'axios'
import Util from '@/service/util'
import store from '@/store/index'
import {code, isTest} from '@/config/config'
import router from '@/router/index'
import {Message} from 'element-ui';
class Http {
  constructor() {
  }

  async post(url, params) {
    let resultUrl = `${url};JSESSIONID=${store.getters.JSESSIONID}`
    let data = await axios.post(resultUrl, params)
    if(isTest){
      if (data.data.code === code.NO_AUTHORITY && isTest) { // 无权限访问
        Message({message: '登录已失效，请重新登录', type: 'error'})
        store.dispatch({type: 'logoutAction'})
        router.push({
          name: 'login'
        })
        throw new Error()
      }
    }
    return data.data
  }

  async formPost(url, params, sessionId) {
    let headerOption = {
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    }
    if (sessionId) {
      url += ';' + sessionId
    }
    let resultUrl = Util.urlEncode(url, params)
    let data = await axios({
      url: resultUrl,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data.data
  }
}
export default new Http()
