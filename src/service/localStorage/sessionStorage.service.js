/**
 * 摘自 VUM https://github.com/vum-team/vum
 * @type {Storage}
 */
const localStorage = window.sessionStorage
const JSON = window.JSON

export default {
  get (name) {
    let value = null
    try {
      value = JSON.parse(localStorage[name])
    } catch (e) {
      value = localStorage[name]
    }
    return value
  },
  set (name, value) {
    try {
      localStorage[name] = JSON.stringify(value)
    } catch (e) {
      localStorage[name] = value
    }
  },
  remove (name) {
    return localStorage.removeItem(name)
  },
  getSession(){
    return localStorage
  }
}
