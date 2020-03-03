import React, { useEffect } from 'react';

import {
  RouteComponentProps,
  RouteProps,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useObserver } from 'mobx-react';

import { TStore } from 'stores';

import { useStores, PageHeader } from 'components';
import { ModalImage } from 'containers';
import { TableVehicle } from 'features/vehicles';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehiclesPage: React.FC<PageProps> = () => {
  const { cars } = useStores<TStore>();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    cars.getApiCars();
  }, []);

  function handleDelete(id: string) {
    console.log(id);
  }

  return (
    <>
      <PageHeader title="Автомобили" to="/d/v/new/car" buttonText="Добавить машину" />
      {useObserver(() => (
        <TableVehicle match={match.path} source={cars.vehicles} onDelete={handleDelete} />
      ))}
      <ModalImage location={location} history={history} />
    </>
  );
};
