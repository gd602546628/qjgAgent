/**
 * Created by gd on 2017/12/29/029.
 * 测试url配置
 */
let build = 1 // 0生产  1王伟本地测试  2 映射公网测试
let urlMap = {
  0: '',
  1: 'http://172.31.61.40:8181/',
  2: 'http://gdweixin.viphk.ngrok.org/'
}
let fileMap = {
  0: '',
  1: 'http://172.31.61.40:80/ftp/file/',
  2: 'http://gdweixin.viphk.ngrok.org/'
}
let urlPre = urlMap[build]
let filePre = fileMap[build]
let DevConfig = {
  m_uploadIcon: `${urlPre}springboot/source/multipartUploadIcon`,// 上传图标
  pro_uploadImg:`${urlPre}springboot/sourceObject/multipartUploadImg`, // 项目管理上传图片
  //loginUrl: `${urlPre}springboot/public/login`, //登录 ddd
 // logoutUrl: `${urlPre}springboot/public/logout`,//退出 dd
 //getUrls: `${urlPre}springboot/system/role/getUrls`, // 可配置角色权限列表dd
 // addOrUpdateRole: `${urlPre}springboot/system/role/addOrUpdateRole`,// 增加角色dd
//  getAllRole: `${urlPre}springboot/system/role/getAllRole`,// 角色列表dd
 // getUserList: `${urlPre}springboot/system/user/getList`,//用户列表ddddd
  //addUser: `${urlPre}springboot/system/user/add`, //添加用户ddddd
  //updateStatus: `${urlPre}springboot/system/user/updateStatus`, //跟新账号状态ddd
 // updateUser: `${urlPre}springboot/system/user/update`, //更新账号信息ddddd
 // updateUserPassword: `${urlPre}springboot/system/user/updatePassword`,// 更新账号密码dddd
 // deleteUser: `${urlPre}springboot/system/user/deleteById`,//删除用户dd
 // deleteRole: `${urlPre}springboot/system/role/deleteRole`,// 删除角色dd
 // getValidateCode: `${urlPre}springboot/public/getValidateCode`, // 获取验证码dddd

 // getObjectList: `${urlPre}springboot/sourceObject/getList`, //项目列表dddd
  //deleteObject: `${urlPre}springboot/sourceObject/deleteById`, // 删除项目dd
 // updateObject: `${urlPre}springboot/sourceObject/update`,// 更新项目dd


  //getAllArea: `${urlPre}springboot/source/areaCode/getAllArea`, // 获取所有行政区域ddd
 // getAreaList: `${urlPre}springboot/source/area/getList`, //获取区域列表ddd
}


export  {DevConfig, urlPre, filePre}
