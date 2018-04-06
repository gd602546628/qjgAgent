/**
 * Created by gd on 2017/12/29/029.
 */
import {config} from '@/config/config'
import systemRole from './systemRole' // 系统角色管理
import login from './login' // 登录
import systemUser from './systemUser'// 系统用户管理
import sourceObject from './sourceObject' //项目管理
import area from './area' // 区域管理
import cate from './cate' // 分类
import source from './source' // 资源
let Api = {
  login,
  systemRole,
  systemUser,
  sourceObject,
  area,
  cate,
  source
}
export default Api
