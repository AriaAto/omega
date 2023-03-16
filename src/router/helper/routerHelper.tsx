/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Menu } from '#/typings/pro-component';
import { PageLoading } from '@ant-design/pro-components';
import React, { Suspense } from 'react';
import { RouteObject } from 'react-router';
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router';

export interface RoutedProps<Params = any, State = any> {
  location: State;
  navigate: NavigateFunction;
  params: Params;
}

export function withRouter<P extends RoutedProps>(Child: React.ComponentClass<P>) {
  return (props: Omit<P, keyof RoutedProps>) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Child {...(props as P)} location={location} navigate={navigate} params={params} />;
  };
}

export function lazyload(Comp: React.LazyExoticComponent<any>): React.ReactNode {
  return (
    <Suspense fallback={<PageLoading />}>
      <Comp />
    </Suspense>
  );
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export function searchRoute(path: string, routes: RouteObject[] = []): RouteObject {
  let result: RouteObject = {};
  for (let item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = searchRoute(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
}

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
  routerList.forEach((item: Menu.MenuOptions) => {
    typeof item === 'object' && item.path && newArr.push(item.path);
    item.children && item.children.length && handleRouter(item.children, newArr);
  });
  return newArr;
}
