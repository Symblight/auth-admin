import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStores } from 'components';
import { TStore } from 'stores';

import { Page, Value } from './page';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const JoinPage: React.FC<PageProps> = observer(({ ...props }) => {
  const { auth } = useStores<TStore>();

  function handleLogin(value: Value) {
    auth.checkLogin();
  }

  return <Page {...props} onLogin={handleLogin} />;
});
