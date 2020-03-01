import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { FormTemplate } from 'containers';

import { Wrapper } from './styled';

export type Value = {
  email: string;
  password: string;
};

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
  onLogin: (values: Value) => void;
}

export const Page: React.FC<PageProps> = ({ onLogin }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onLogin(values);
  };

  return (
    <FormTemplate>
      <Wrapper>
        <div>Вход в систему</div>
        <Form form={form} name="join-user" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form>
      </Wrapper>
    </FormTemplate>
  );
};
