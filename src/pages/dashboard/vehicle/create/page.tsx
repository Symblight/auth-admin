import React from 'react';
import { Card, Button } from 'antd';

import { RouteComponentProps, RouteProps, Link } from 'react-router-dom';

import { FormVehicle, Values } from 'features/vehicles';
import { Breadcrumb } from 'components';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const AddVehiclePage: React.FC<PageProps> = () => {
  const handleSubmit = (values: Values) => {
    console.log(values);
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
};
