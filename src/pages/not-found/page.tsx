import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const NotFoundPage: React.FC<PageProps> = () => {
  return <div>Not found page</div>;
};
