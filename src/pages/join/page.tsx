import React from 'react';
import { useStore } from 'effector-react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useAlert } from 'react-alert';
import { FormTemplate } from 'containers';

import { Wrapper } from './styled';

import { $status } from './model';
import { fetchLogin } from 'features/common';

export type Value = {
  email: string;
  password: string;
};

interface PageProps extends RouteComponentProps {
  routes: RouteProps[];
  onLogin: (values: Value) => void;
}

export const Page: React.FC<PageProps> = () => {
  const [form] = Form.useForm();
  const alert = useAlert();
  const status = useStore($status);

  const onFinish = (values: any) => {
    fetchLogin(values);
  };

  React.useEffect(() => {
    const { message } = status.error;
    if (message !== '') {
      alert.error(message);
    }
  }, [status.error, alert]);

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
          <Button loading={status.loading} type="primary" htmlType="submit">
            Log in
          </Button>
        </Form>
      </Wrapper>
    </FormTemplate>
  );
};
