import { IRouteConfig } from '#/types/router';
import React, { Suspense } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router';
import routes from './routes';
import WrapperRouteComponent from './component/WrapperRoute';
import { PageLoading } from '@ant-design/pro-components';
import Login from '#/pages/Login';
import device from './modules/device';

const getRouteConfig = (routeConfig: IRouteConfig): RouteObject => {
  const { path, layout, component: Comp, children, auth, redirect } = routeConfig;

  const element = redirect ? (
    <Navigate to={redirect} replace />
  ) : (
    <Suspense fallback={<PageLoading />}>
      <WrapperRouteComponent auth={auth} children={<Comp />} redirect={redirect} />
    </Suspense>
  );

  let childrenRoutes: any[] = [];

  if (children) {
    childrenRoutes = children.map((it: IRouteConfig) =>
      getRouteConfig({ ...it, path: it.path.startsWith('/') ? it.path : `${path}/${it.path}` }),
    );
  }

  return layout
    ? {
        element,
        children: childrenRoutes,
      }
    : {
        path: path,
        element,
        children: childrenRoutes,
      };
};

export const getRouteConfigs = () => routes.map((route: IRouteConfig) => getRouteConfig(route));

const rList = [...device];

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/device/rsu'} />,
  },
  {
    path: '/user/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login',
    },
  },
  ...rList,
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

export const Router = () => {
  const routeList = useRoutes(rootRouter);
  return routeList;
};
