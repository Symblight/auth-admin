import {
  JoinPage,
  DashboardPage,
  RentsPage,
  UsersPage,
  VehiclesPage,
  NotFoundPage,
  ProfilePage,
  VehiclePage,
  AddVehiclePage,
  EditVehiclePage,
  VehicleViewPage,
  LogoutPage,
} from 'pages';

import { onlyAuth, onlyAnon } from 'features/common';
import { Route } from 'libs/routes';

export const ROUTES: Route<any>[] = [
  {
    path: '/d',
    component: DashboardPage,
    guards: [onlyAuth()],
    routes: [
      {
        path: '/d',
        exact: true,
        component: VehiclesPage,
        guards: [onlyAuth()],
      },
      {
        path: '/d/v/',
        component: VehicleViewPage,
        guards: [onlyAuth()],
        routes: [
          {
            path: '/d/v/:id',
            exact: true,
            component: VehiclePage,
          },
          {
            path: '/d/v/:id/edit',
            exact: true,
            component: EditVehiclePage,
          },
          {
            path: '/d/v/new/car',
            exact: true,
            component: AddVehiclePage,
          },
        ],
      },
      {
        path: '/d/users',
        exact: true,
        component: UsersPage,
      },
      {
        path: '/d/rents',
        exact: true,
        component: RentsPage,
      },
    ],
  },
  {
    path: '/',
    exact: true,
    component: JoinPage,
    guards: [onlyAnon()],
  },
  {
    path: '/profile',
    exact: true,
    component: ProfilePage,
    guards: [onlyAuth()],
  },
  {
    path: '/sign_out',
    exact: true,
    component: LogoutPage,
    guards: [onlyAuth()],
  },
  { component: NotFoundPage },
];
