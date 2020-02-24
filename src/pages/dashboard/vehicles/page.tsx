import React from 'react';

import { RouteComponentProps, RouteProps, useLocation, useHistory } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { PageHeader } from 'components';
import { ModalImage } from 'containers';
import { TableVehicle } from 'features/vehicles';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehiclesPage: React.FC<PageProps> = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Автомобили</Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader title="Автомобили" to="/d/v/new/car" buttonText="Добавить машину" />
      <TableVehicle />
      <ModalImage location={location} history={history} />
    </div>
  );
};
