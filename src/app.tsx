import React from 'react';

import { Switch } from 'react-router-dom';

import { RouteWithSubRoutes, protectedRoutes } from 'libs/routes';

import { ROUTES } from 'pages/routes';
import { GlobalStyles } from './global-styles';

import 'antd/dist/antd.css';

export function App() {
  const routes = protectedRoutes(ROUTES, { root: 'DEV', auth: false, token: null });

  // if (waitting) {
  //   return <div>Loading</div>;
  // }

  return (
    <>
      <GlobalStyles />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </>
  );
}
