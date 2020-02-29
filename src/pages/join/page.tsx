import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { FormTemplate } from 'containers';

import { Wrapper } from './styled';

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
}

export const Page: React.FC<PageProps> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log(values);
  };

  return (
    <FormTemplate>
      <Wrapper>
        <div>Вход в систему</div>
        <Form form={form} name="join-user" onFinish={onFinish}>
          <Form.Item
            name="username"
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

export const JoinPage = Page;
