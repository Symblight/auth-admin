import React from 'react';
import { Card, Button } from 'antd';

import { Breadcrumb } from 'components';
import { RouteComponentProps, RouteProps, Link, useRouteMatch } from 'react-router-dom';
import { FormVehicle, Values } from 'features/vehicles';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const EditVehiclePage: React.FC<PageProps> = () => {
  const match = useRouteMatch<{ id: string }>();
  const handleSubmit = (values: Values) => {
    console.log(values);
  };

  function submit() {
    return (
      <Button type="primary" htmlType="submit">
        Изменить
      </Button>
    );
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/d">Автомобили</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/d/v/${match.params.id}`}>{match.params.id}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Редактировать</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <FormVehicle submitButton={submit()} onSubmit={handleSubmit} />
      </Card>
    </>
  );
};
