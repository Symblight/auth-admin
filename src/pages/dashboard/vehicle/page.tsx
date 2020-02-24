import React from 'react';

import { RouteComponentProps, Switch, RouteProps } from 'react-router-dom';
import { RouteWithSubRoutes } from 'libs/routes';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehicleViewPage: React.FC<PageProps> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i: number) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};
