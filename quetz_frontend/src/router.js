import Vue from 'vue';
import Router from 'vue-router';

import Channels from './views/Channels.vue';
import Users from './views/Users.vue';
import ApiKeys from './views/ApiKeys';
import Packages from './views/Packages';
import Package from './views/Package';

import Header from './components/Header';

import CarbonComponentsVue from '@carbon/vue';
Vue.use(CarbonComponentsVue);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/channels',
      name: 'channels',
      component: Channels
    },
    {
      path: '/',
      name: 'root_channels',
      component: Channels
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/api-keys',
      name: 'api-keys',
      component: ApiKeys
    },
    {
      path: '/channel/:channel_id/packages',
      name: 'packages',
      component: Packages
    },
    {
      path: '/channel/:channel_id/packages/:package',
      name: 'package',
      component: Package
    },
    {
      path: '/header',
      name: 'header',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Header
      // component: () =>
      //   import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
  // mode: 'history'
});