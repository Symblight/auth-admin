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
} from 'pages';

export const ROUTES = [
  {
    path: '/d',
    component: DashboardPage,
    routes: [
      {
        path: '/d',
        exact: true,
        component: VehiclesPage,
      },
      {
        path: '/d/v/',
        component: VehicleViewPage,
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
  },
  {
    path: '/profile',
    exact: true,
    component: ProfilePage,
  },
  { component: NotFoundPage },
];
