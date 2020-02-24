import React from 'react';
import { Layout } from 'antd';

import { Section } from './styled';

const { Content } = Layout;

interface TemplateProps {
  className?: string;
  children: React.ReactNode;
}

export const FormTemplate: React.FC<TemplateProps> = ({ children, className }) => {
  return (
    <Layout>
      <Content>
        <Section className={className}>{children}</Section>
      </Content>
    </Layout>
  );
};
