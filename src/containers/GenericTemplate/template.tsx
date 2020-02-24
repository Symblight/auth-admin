import React from 'react';
import { Layout } from 'antd';

import { Header } from 'components';

// import { Section } from './styled';

const { Content } = Layout;

interface TemplateProps {
  className?: string;
  children: React.ReactNode;
}

export const GenericTemplate: React.FC<TemplateProps> = ({ children, className }) => {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
};
