import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const RentsPage: React.FC<PageProps> = () => {
  return <div>Rents page</div>;
};
