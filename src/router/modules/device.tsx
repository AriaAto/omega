import { lazy } from 'react';
import { RouteObject } from '../interface';
import { lazyload } from '../helper/routerHelper';
import { LayoutIndex } from '../constant';
import React from 'react';

const deviceRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: 'Device',
    },
    children: [
      {
        path: '/device/rsu',
        element: lazyload(React.lazy(() => import('#/pages/Edge/DeviceManagement/RSU/DeviceList'))),
        meta: {
          requiresAuth: true,
          title: 'Device',
          key: 'deviceList',
        },
      },
    ],
  },
];

export default deviceRouter;
