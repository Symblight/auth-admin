import React from 'react';
import { Breadcrumb, Card } from 'antd';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehiclePage: React.FC<PageProps> = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Автомобили</Breadcrumb.Item>
        <Breadcrumb.Item>Название</Breadcrumb.Item>
      </Breadcrumb>
      <Card>Vehicle page</Card>
    </>
  );
};
