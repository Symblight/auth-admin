import React from 'react';

import { RouteComponentProps, Switch, RouteProps } from 'react-router-dom';
import { RouteWithSubRoutes } from 'libs/routes';
import { DashboardTemplate } from 'containers';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const DashboardPage: React.FC<PageProps> = ({ routes }) => {
  return (
    <DashboardTemplate>
      <Switch>
        {routes.map((route, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </DashboardTemplate>
  );
};
