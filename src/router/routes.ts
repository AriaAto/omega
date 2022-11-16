import React from 'react';
const routes = [
  {
    path: '/login',
    component: React.lazy(
      () => import(/* webpackChunkName: "login",webpackPrefetch: true */ '#/pages/Login'),
    ),
  },
  {
    path: '/',
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: '/',
        component: React.lazy(
          () => import(/* webpackChunkName: "home",webpackPrefetch: true */ '#/pages/Home'),
        ),
      },
    ],
  },
  {
    path: '*',
    component: React.lazy(() => import('#/components/NoMatch')),
  },
];

export default routes;
