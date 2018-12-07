import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
  console.log(to);
  if (to.matched[0].meta && to.matched[0].meta.theme) {
    console.log('this page require theme ' + to.matched[0].meta.theme);
  }
  console.log(this);
});

export default router;
