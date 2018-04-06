/**
 * Created by gd on 2017/12/29/029.
 */
import Router from '@/router/index'
let _loginPromise = null
import Api from '@/api/api'
let loginAction = async function ({commit, state}, {routeName, params}) {
  let userInfo = await login()
  commit('saveUserInfo', userInfo)
  if(!state.q_cityInfo){
    getCityInfo({commit, state})
  }
  if (routeName) {
    Router.push({
      name: routeName,
      params: params
    })
  }
  return
}
let logoutAction = async function ({commit, state}) {
  commit('clearUserInfo')
}
let login = function () {
  if (_loginPromise) return _loginPromise
  return new Promise((resolve, reject) => {
    let fn = function () {
      _loginPromise = null
    }
    Router.push({
      name: 'login', params: {resolve, reject, fn}
    })
  })
}
let getCityInfo = async function ({commit, state}) {
  let data = await Api.area.areaCode()
  let step = function (item) {
    item.label = item.name
    item.value = item.id
    if (item.nextArea && item.nextArea.length > 0) {
      item.children = item.nextArea
      item.children.forEach(innerItem => {
        step(innerItem)
      })
    }
  }
  let cityInfo = data.data
  /*cityInfo.forEach(city => {
   step(city)
   })*/
  commit('saveCityInfo', cityInfo)
}
export default {
  loginAction,
  logoutAction,
  getCityInfo
}
