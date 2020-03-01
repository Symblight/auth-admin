import React from 'react';

import {
  RouteComponentProps,
  RouteProps,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import { PageHeader } from 'components';
import { ModalImage } from 'containers';
import { TableVehicle } from 'features/vehicles';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const VehiclesPage: React.FC<PageProps> = () => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      id: 'dasfdas',
      imageUrl: 'https://i.playground.ru/p/8WVj08Oy0i5ayj6CxmYMwA.jpeg',
      price: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      id: 'dqqwas',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/ru/thumb/1/15/NFS-Most-Wanted-Front.jpg/274px-NFS-Most-Wanted-Front.jpg',
      price: '10 Downing Street',
    },
  ];

  function handleDelete(id: string) {
    console.log(id);
  }

  return (
    <>
      <PageHeader title="Автомобили" to="/d/v/new/car" buttonText="Добавить машину" />
      <TableVehicle match={match.path} source={dataSource} onDelete={handleDelete} />
      <ModalImage location={location} history={history} />
    </>
  );
};
