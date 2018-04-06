/**
 * Created by gd on 2018/1/27/027.
 */

let fileSize = (val) => {
  let kb = (val / 1024)
  let mb = (kb / 1024)
  let result = ''
  if (kb >= 1024) {
    return mb.toFixed(1) + '  mb'
  } else {
    return kb.toFixed(1) + '  kb'
  }
}

export default (Vue, option) => {
  Vue.filter('fileSize', fileSize)
}
