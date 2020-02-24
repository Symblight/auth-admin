import React from 'react';
import { Breadcrumb, Card } from 'antd';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const EditVehiclePage: React.FC<PageProps> = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Автомобили</Breadcrumb.Item>
        <Breadcrumb.Item>Название</Breadcrumb.Item>
        <Breadcrumb.Item>Редактировать</Breadcrumb.Item>
      </Breadcrumb>
      <Card>Edit Vehicle page</Card>
    </>
  );
};
