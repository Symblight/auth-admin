import React, { useState, useEffect } from 'react';

import { RouteComponentProps, RouteProps, useRouteMatch } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStores } from 'components';
import { TStore, TCar } from 'stores';

import { Page } from './page';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const EditVehiclePage: React.FC<PageProps> = observer(({ ...props }) => {
  const [data, setData] = useState<TCar | null>(null);
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

  return <Page {...props} data={data} />;
});
