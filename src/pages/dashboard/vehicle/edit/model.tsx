import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { RouteComponentProps, RouteProps, useRouteMatch } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStores } from 'components';
import { TStore, TCar, TCategory } from 'stores';

import { Page } from './page';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const EditVehiclePage: React.FC<PageProps> = observer(({ ...props }) => {
  const [data, setData] = useState<TCar>({});
  const [lodaingCategories, setLoadingCategories] = useState(false);
  const match = useRouteMatch<{ id: string }>();
  const { cars } = useStores<TStore>();

  async function handleFetch() {
    try {
      const car = await cars.getCar(match.params.id);
      setData(car);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetch();
  }, []);

  async function handleFetchCategories() {
    try {
      setLoadingCategories(true);
      await cars.getCategories();
      setLoadingCategories(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page
      {...props}
      data={data}
      loading={_.isEmpty(data)}
      categories={cars.categories}
      lodaingCategories={lodaingCategories}
      onFetchCategories={handleFetchCategories}
    />
  );
});
