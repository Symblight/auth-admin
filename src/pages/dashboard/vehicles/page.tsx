import React, { useEffect } from 'react';

import { RouteComponentProps, RouteProps, useLocation, useRouteMatch } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useAlert } from 'react-alert';

import { PageHeader } from 'components';
import { TableVehicle } from 'features/vehicles';
import { useParams } from 'libs/useParams';

import { submitDelete, $status, pageMounted, $result } from './model';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehiclesPage: React.FC<PageProps> = () => {
  const location = useLocation();
  const { parse } = useParams();
  const alert = useAlert();

  const statusRemove = useStore($status);
  const { vehicles, status } = useStore($result);

  const match = useRouteMatch();
  const page = parse('page');

  useEffect(() => {
    pageMounted(page);
  }, [page]);

  useEffect(() => {
    if (statusRemove.error) {
      const { message } = statusRemove.error;
      alert.error(message);
    }
    console.log(statusRemove.error);
  }, [statusRemove, alert]);

  function handleDelete(id: string) {
    submitDelete(id);
  }

  return (
    <>
      <PageHeader title="Автомобили" to="/d/v/new/car" buttonText="Добавить машину" />
      <TableVehicle
        match={match.path}
        search={location.search}
        source={vehicles ? vehicles.data : []}
        pagination={vehicles}
        onDelete={handleDelete}
        loading={status.loading}
      />
    </>
  );
};
