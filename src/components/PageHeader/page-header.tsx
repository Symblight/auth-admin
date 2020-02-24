import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

import { Wrapper } from './styled';

const { Title } = Typography;

export interface PageHeaderProps {
  className?: string;
  title: string;
  to: string;
  buttonText: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ buttonText, className, to, title }) => {
  return (
    <Wrapper className={className}>
      <Title level={3}>{title}</Title>
      <Link to={to}>
        <Button type="primary">{buttonText}</Button>
      </Link>
    </Wrapper>
  );
};
