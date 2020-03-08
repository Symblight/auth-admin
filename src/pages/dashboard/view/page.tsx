import React from 'react';

import { RouteComponentProps, Switch, RouteProps, useLocation, useHistory } from 'react-router-dom';
import { RouteWithSubRoutes } from 'libs/routes';
import { ModalImage, DashboardTemplate } from 'containers';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const DashboardPage: React.FC<PageProps> = ({ routes }) => {
  const location = useLocation();
  const history = useHistory();
  return (
    <DashboardTemplate>
      <Switch>
        {routes.map((route, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
      <ModalImage location={location} history={history} />
    </DashboardTemplate>
  );
};
