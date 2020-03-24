import React from 'react';
import { Card, Button } from 'antd';
import { useStore } from 'effector-react';

import { RouteComponentProps, RouteProps, Link } from 'react-router-dom';

import { FormVehicle, TCar } from 'features/vehicles';
import { Breadcrumb } from 'components';

import {
  pageUnMounted,
  $categories,
  $isError,
  $isLoading,
  submitForm,
  getCategories,
} from './model';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const AddVehiclePage: React.FC<PageProps> = () => {
  const categories = useStore($categories);
  const error = useStore($isError);
  const { loadingCategories, loadingSubmit } = useStore($isLoading);

  React.useEffect(() => {
    return () => pageUnMounted();
  }, []);

  const handleSubmit = (values: TCar) => {
    submitForm(values);
  };

  function submit() {
    return (
      <Button loading={loadingSubmit} type="primary" htmlType="submit">
        Добавить
      </Button>
    );
  }

  async function handleFetchCategories() {
    getCategories();
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
        <FormVehicle
          categories={categories}
          lodaingCategories={loadingCategories}
          onFetchCategories={handleFetchCategories}
          submitButton={submit()}
          onSubmit={handleSubmit}
        />
      </Card>
    </>
  );
};
