import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

import { GenericTemplate } from 'containers';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const ProfilePage: React.FC<PageProps> = () => {
  return <GenericTemplate>Profile page</GenericTemplate>;
};
