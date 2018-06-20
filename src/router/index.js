import Vue from 'vue'
import Router from 'vue-router'
import DefaultContainer from '@/containers/DefaultContainer'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/pages/Login'
const PAGENOTFOUND = r => require.ensure([], () => r(require('@/views/404')), 'sys')


const routes = [
  {
    path: '*',
    component: PAGENOTFOUND
  },
  {
    path: '/',
    name: 'HOME',
    redirect: '/login',
    component: DefaultContainer,
    meta: {
      title: '小画家'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  }

]

Vue.use(Router)

const router = new Router({
  //mode: 'history',
  routes: routes
});

router.afterEach((to, from, next) => {

})

/*前端权限验证*/
router.beforeEach((to, from, next) => {
  next();
  /** 对 routes 对象的 requireAuth属性进行设置（boolean 值）来决定是否需要权限 */
  // if (to.matched.some(r => r.meta.requireAuth)) {
  //     if (localStorage.getItem("token_value")) {
  //         next();
  //     } else {
  //         next({
  //             path: '/login',
  //             query: {redirect: to.fullPath}
  //         })
  //     }
  // } else {
  //     next();
  // }
})

export default router;