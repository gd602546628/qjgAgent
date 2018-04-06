/**
 * Created by gd on 2017/12/29/029.
 */
import localStore from '@/service/localStorage/localStorage.service'
import sessonStore from '@/service/localStorage/sessionStorage.service'

let saveUserInfo = function (state, userInfo) {
  state.sysAuthUrls = userInfo.sysAuthUrls
  state.sysUserBg = userInfo.sysUserBg
  state.JSESSIONID = userInfo.sessionId
  localStore.setStorage('sysAuthUrls', state.sysAuthUrls)
  localStore.setStorage('sysUserBg', state.sysUserBg)
  localStore.setStorage('JSESSIONID', state.JSESSIONID)
}
let clearUserInfo = function (state) {
  state.sysAuthUrls = null
  state.sysUserBg = null
  state.JSESSIONID = null
  localStorage['sysAuthUrls'] = null
  localStorage['sysUserBg'] = null
  localStorage['JSESSIONID'] = null
}

let saveCityInfo = function (state, cityInfo) {
  state.q_cityInfo = cityInfo
  localStore.setStorage('q_cityInfo', cityInfo)
}
let saveDefaultAreaSelect = function (state, defaultAreaSelect) {
  state.defaultAreaSelect = defaultAreaSelect
  localStore.setStorage('defaultAreaSelect', defaultAreaSelect)
}
export default {
  saveUserInfo,
  clearUserInfo,
  saveCityInfo,
  saveDefaultAreaSelect
}
