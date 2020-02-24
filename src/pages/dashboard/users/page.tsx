import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const UsersPage: React.FC<PageProps> = () => {
  return <div>Users page</div>;
};
