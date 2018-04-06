/**
 * Created by gd on 2017/12/29/029.
 */

class Util {
  constructor() {
    this.PI = Math.PI
  }

  urlEncode(url, params) {
    var result = url + '?'
    for (var key in params) {
      result += key + '=' + params[key] + '&'
    }
    return encodeURI(result.substring(0, result.length - 1))
  }

  getLongitude(longitude) {
    if (longitude > this.PI) {
      return ((longitude - 2 * this.PI) / this.PI) * 180;
    } else {
      return ((longitude) / this.PI) * 180;
    }
  }

  getLatitude(latitude) {
    if (latitude < 0) {
      return window.Math.abs(latitude / this.PI) * 180
    } else {
      return -((latitude / this.PI) * 180)
    }
  }

  getRandomString(number = 16) {
    return Math.random().toString(number).substr(2);
  }

  dateFormat(time, fmt) {
    let datArr = ['日', '一', '二', '三', '四', '五', '六']
    let o = {
      "M+": time.getMonth() + 1,                 //月份
      "d+": time.getDate(),                    //日
      "h+": time.getHours(),                   //小时
      "m+": time.getMinutes(),                 //分
      "s+": time.getSeconds(),                 //秒
      "q+": Math.floor((time.getMonth() + 3) / 3), //季度
      "S": time.getMilliseconds(),             //毫秒
      'w': datArr[time.getDay()]
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}
export default new Util()
