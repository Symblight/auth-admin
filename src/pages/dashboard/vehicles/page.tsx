import React, { useEffect } from 'react';

import { RouteComponentProps, RouteProps, useLocation, useRouteMatch } from 'react-router-dom';
import { useObserver } from 'mobx-react';

import { TStore } from 'stores';

import { useStores, PageHeader } from 'components';
import { TableVehicle } from 'features/vehicles';
import { useParams } from 'libs/useParams';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehiclesPage: React.FC<PageProps> = () => {
  const location = useLocation();
  const parseParams = useParams(location.search);
  const { cars } = useStores<TStore>();
  const match = useRouteMatch();

  useEffect(() => {
    cars.getApiCars(parseParams.parse('page') || 1);
  }, [location, match]);

  function handleDelete(id: string) {
    console.log(id);
  }

  return (
    <>
      <PageHeader title="Автомобили" to="/d/v/new/car" buttonText="Добавить машину" />
      {useObserver(() => (
        <TableVehicle
          match={match.path}
          search={location.search}
          source={cars.vehicles}
          pagination={cars.pagination}
          onDelete={handleDelete}
          loading={cars.loading}
        />
      ))}
    </>
  );
};
