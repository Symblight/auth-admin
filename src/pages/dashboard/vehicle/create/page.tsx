import React from 'react';
import { Card, Button } from 'antd';

import { RouteComponentProps, RouteProps, Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { TStore, TCar } from 'stores';

import { FormVehicle } from 'features/vehicles';
import { useStores, Breadcrumb } from 'components';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const AddVehiclePage: React.FC<PageProps> = observer(() => {
  const { cars } = useStores<TStore>();
  const handleSubmit = (values: TCar) => {
    cars.setApiCar(values);
  };

  function submit() {
    return (
      <Button type="primary" htmlType="submit">
        Добавить
      </Button>
    );
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/d">Автомобили</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Добавить</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <FormVehicle submitButton={submit()} onSubmit={handleSubmit} />
      </Card>
    </>
  );
});
