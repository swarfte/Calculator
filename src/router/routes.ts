import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BasicLayout.vue'),
    children: [{ path: '', component: () => import('pages/GeneralPage.vue') }],
  },
  {
    path: '/general',
    name: 'General',
    component: () => import('pages/GeneralPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'ErrorNotFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
