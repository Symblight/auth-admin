import React from 'react';
import { Card, Button, Skeleton } from 'antd';

import { Breadcrumb } from 'components';
import { RouteComponentProps, RouteProps, Link, useRouteMatch } from 'react-router-dom';
import { FormVehicle } from 'features/vehicles';
import { TCar } from 'stores';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
  data: TCar | null;
  loading: boolean;
}

export const Page: React.FC<PageProps> = ({ data, loading }) => {
  const match = useRouteMatch<{ id: string }>();
  const handleSubmit = (values: any) => {
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
        {!loading ? (
          <FormVehicle data={data} submitButton={submit()} onSubmit={handleSubmit} />
        ) : (
          <Skeleton active={loading} />
        )}
      </Card>
    </>
  );
};
