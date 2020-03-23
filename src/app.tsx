import React, { useMemo } from 'react';

import { Switch } from 'react-router-dom';

import { RouteWithSubRoutes, protectedRoutes } from 'libs/routes';

import { ROUTES } from 'pages/routes';
import { GlobalStyles } from './global-styles';
import { useSessionWaiting, useSession, useSessionFetch } from 'features/common';

import 'antd/dist/antd.css';

export function App() {
  useSessionFetch();
  const session = useSession();
  const waiting = useSessionWaiting();

  const routes = useMemo(() => {
    return protectedRoutes(ROUTES, { root: 'DEV', auth: !!session });
  }, [session]);

  if (waiting) {
    return <div>Loading</div>;
  }

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
