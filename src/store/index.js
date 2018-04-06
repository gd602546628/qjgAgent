/**
 * Created by gd on 2017/12/29/029.
 */
import vuex from 'vuex'
import vue from 'vue'
import userModule from './modules/user/index'
vue.use(vuex)

export default new vuex.Store({
  modules: {userModule}
})
