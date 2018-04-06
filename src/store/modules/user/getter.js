/**
 * Created by gd on 2017/12/29/029.
 */

import {uploadUrl} from '@/config/config'
export default {
  sysAuthUrls: state => state.sysAuthUrls,
  sysUserBg: state => state.sysUserBg,
  isLogin: state => state.sysAuthUrls && state.sysUserBg && state.JSESSIONID,
  JSESSIONID: state => state.JSESSIONID,
  q_cityInfo: state => state.q_cityInfo,
  defaultAreaSelect: state => state.defaultAreaSelect ||[state.q_cityInfo[0].id,
    state.q_cityInfo[0].nextArea[0].id,
    state.q_cityInfo[0].nextArea[0].nextArea[0].id
  ],
  source_Upload: state => uploadUrl.multipartUploadSource + ';JSESSIONID=' + state.JSESSIONID,
  upload_file:state => uploadUrl.multipartUploadFile + ';JSESSIONID=' + state.JSESSIONID,
}


