import React from 'react';
import { Card, Button, Skeleton } from 'antd';
import _ from 'lodash';
import { useStore } from 'effector-react';
import { useAlert } from 'react-alert';

import { Breadcrumb } from 'components';
import { RouteComponentProps, RouteProps, Link, useRouteMatch } from 'react-router-dom';
import { TCar, TCategory, FormVehicle } from 'features/vehicles';

import {
  $categories,
  $vehicle,
  pageMounted,
  pageUnmounted,
  submitFormVehicle,
  getCategories,
  $error,
} from './model';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
  data: TCar | null;
  loading: boolean;
  categories: TCategory[];
  lodaingCategories: boolean;
  onFetchCategories: () => void;
}

export const EditVehiclePage: React.FC<PageProps> = () => {
  const vehicle = useStore($vehicle);
  const categories = useStore($categories);
  const error = useStore($error);
  const alert = useAlert();

  const match = useRouteMatch<{ id: string }>();

  const handleSubmit = (values: any) => {
    submitFormVehicle({ id: vehicle.id, ...values });
  };

  React.useEffect(() => {
    pageMounted(match.params.id);
  }, [match.params.id]);

  React.useEffect(() => {
    return () => pageUnmounted();
  }, []);

  React.useEffect(() => {
    if (error && error.message) {
      alert.error(error.message);
    }
  }, [error, alert]);

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
        {!_.isEmpty(vehicle) ? (
          <FormVehicle
            categories={categories}
            lodaingCategories={false}
            onFetchCategories={() => null}
            data={!_.isEmpty(vehicle) ? vehicle : null}
            submitButton={submit()}
            onSubmit={handleSubmit}
          />
        ) : (
          <Skeleton active={_.isEmpty(vehicle)} />
        )}
      </Card>
    </>
  );
};
