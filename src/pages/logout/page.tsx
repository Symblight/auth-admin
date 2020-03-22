import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { dropSession } from 'features/common';

type LogoutPageProps = RouteComponentProps;

export const LogoutPage: React.FC<LogoutPageProps> = () => {
  React.useEffect(() => {
    dropSession();
  }, []);
  return null;
};
