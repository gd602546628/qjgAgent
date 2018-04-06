// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import './assets/css/element.scss'
import './assets/css/common.scss'
import './assets/css/font.scss'
import store from './store/index'
import filter from './filter/filter'
import {isTest} from './config/config'
/*富文本编辑器 start*/
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
/*富文本编辑器 end*/
Vue.use(filter)
Vue.use(Element)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

/*权限验证*/
router.beforeEach((to, form, next) => {
  if (isTest) {
    if (store.getters.isLogin) {
      next()
    } else {
      if (to.name != 'login') {
        store.dispatch({type: 'loginAction', routeName: to.name, params: to.params}).then(function () {
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
