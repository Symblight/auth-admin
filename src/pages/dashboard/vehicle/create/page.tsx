import React from 'react';
import { Breadcrumb, Card } from 'antd';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

import { FormVehicle } from 'features/vehicles';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const AddVehiclePage: React.FC<PageProps> = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Автомобили</Breadcrumb.Item>
        <Breadcrumb.Item>Добавить</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <FormVehicle />
      </Card>
    </>
  );
};
