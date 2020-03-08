import React, { useState } from 'react';
import { Card, Button } from 'antd';

import { RouteComponentProps, RouteProps, Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import { TStore, TCar } from 'stores';

import { FormVehicle } from 'features/vehicles';
import { useStores, Breadcrumb } from 'components';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const AddVehiclePage: React.FC<PageProps> = observer(() => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { cars } = useStores<TStore>();
  const handleSubmit = async (values: TCar) => {
    await setLoading(true);
    await cars.setApiCar(values);
    await setLoading(false);
    history.push('/d');
  };

  function submit() {
    return (
      <Button loading={loading} type="primary" htmlType="submit">
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
