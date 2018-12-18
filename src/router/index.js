import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { globalMixin } from '../util/mixins/globalMixins';

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
  // console.log(this);
  // console.log(to);
  if ((to.matched[0] && to.matched[0].meta && to.matched[0].meta.theme) || (to.meta && to.meta.theme)) {
    const toTheme = to.matched[0].meta.theme || to.meta.theme;
    // console.log('this page require theme ' + toTheme);
    globalMixin.methods.setTheme.call(window.vm, toTheme);
  }
  // console.log(globalMixin);
});

export default router;
