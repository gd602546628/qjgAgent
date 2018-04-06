/**
 * Created by gd on 2017/12/29/029.
 */
import localStorage from '@/service/localStorage/localStorage.service'
import sessonStore from '@/service/localStorage/sessionStorage.service'
export default {
  JSESSIONID: localStorage.getStorage('JSESSIONID'),
  sysAuthUrls: localStorage.getStorage('sysAuthUrls'),
  sysUserBg: localStorage.getStorage('sysUserBg'),
  q_cityInfo: localStorage.getStorage('q_cityInfo') || null,
  defaultAreaSelect: localStorage.getStorage('defaultAreaSelect')
}
