import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index.vue'
import login from '@/page/login.vue'
import nav1 from '@/page/nav1/nav1.index.vue'

import accountManage from '../page/nav1/accountManage/accountManage.vue'
import userManage from '../page/nav1/userManage/userManage.vue'
import addAccount from '../page/nav1/accountManage/addAccount.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/nav1'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/nav1',
      children: [
        {
          path: 'nav1',
          component: nav1,
          name: 'nav1',
          redirect: '/index/nav1/accountManage',
          children: [
            {
              path: 'accountManage',
              component: accountManage,
              name: 'accountManage'
            },
            {
              path: 'userManage',
              component: userManage,
              name: 'userManage'
            },
            {
              path: 'addAccount/:id?',
              component: addAccount,
              name: 'addAccount',
              meta: {
                activeName: 'accountManage'
              }
            },
          ]
        }
      ]
    }
  ]
})
