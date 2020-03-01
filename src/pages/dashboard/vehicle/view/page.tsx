import React from 'react';
import { Card } from 'antd';

import { RouteComponentProps, RouteProps, Link, useRouteMatch } from 'react-router-dom';
import { Breadcrumb } from 'components';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehiclePage: React.FC<PageProps> = () => {
  const match = useRouteMatch<{ id: string }>();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/d">Автомобили</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <Card>Vehicle page</Card>
    </>
  );
};
