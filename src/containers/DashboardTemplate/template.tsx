import React from 'react';
import { Layout } from 'antd';

import { MenuDashboard, Header } from 'components';

import { Content } from './styled';

const { Sider } = Layout;

interface TemplateProps {
  className?: string;
  children: React.ReactNode;
}

export const DashboardTemplate: React.FC<TemplateProps> = ({ children, className }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider>
          <MenuDashboard />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};
