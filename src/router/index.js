import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/Login';
import Home from '@/components/protected/Home';

import * as _ from 'lodash';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      if (!_.isNil(localStorage.getItem('token'))) {
        localStorage.clear();
      }

      next({name: 'Login'});
    },
    component: Login
  },
  {
    path: '/protected/home',
    name: 'Home',
    //beforeEnter: guard,
    component: Home
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    next();
  } else {
    if (!_.isEmpty(localStorage.getItem('token'))) {
      next();
    } else {
      next({name: 'Login'});
    }
  }
});

/* function guard(to, from, next) {
  if(!_.isEmpty(localStorage.getItem('token'))) {
      next(); // allow to enter route
  } else{
      console.log('Não logado!');
      next('/Login'); // go to '/login';
  }
} */

export default router
