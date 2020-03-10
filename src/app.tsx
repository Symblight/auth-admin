import React, { useMemo } from 'react';

import { Switch } from 'react-router-dom';

import { RouteWithSubRoutes, protectedRoutes } from 'libs/routes';

import { ROUTES } from 'pages/routes';
import { GlobalStyles } from './global-styles';
import { useSession, useSessionFetch } from 'features/common';

import 'antd/dist/antd.css';

export function App() {
  const session = useSession();
  const loading = useSessionFetch();

  const routes = useMemo(
    () => protectedRoutes(ROUTES, { root: 'DEV', auth: false, token: null }),
    [],
  );

  if (loading) {
    return <div>Loading</div>;
  }

  console.log(loading, session);

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
