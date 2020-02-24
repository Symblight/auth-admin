import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { CustomProps } from './config';

interface RouteComponentProps extends RouteProps {
  routes?: RouteProps[];
}

interface RedirectToProps {
  to: string;
}

export const RouteWithSubRoutes: React.FC<RouteComponentProps> = ({ routes, component, path }) => {
  const renderComponent: React.FC<CustomProps> = (props, Component: any) => (
    <Component {...props} routes={routes} />
  );
  return (
    <Route path={path} render={(props: any) => component && renderComponent(props, component)} />
  );
};

export const redirectTo: React.FC<RedirectToProps> = ({ to }) => {
  return <Redirect to={to} />;
};
