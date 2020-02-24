import React from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { FormTemplate } from 'containers';

import { Wrapper } from './styled';

const enhance = compose<PageProps, {}>(Form.create({ name: 'login' }));

interface PageProps extends RouteComponentProps, FormComponentProps {
  routes: RouteProps[];
}

export const Page: React.FC<PageProps> = ({ form }) => {
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <FormTemplate>
      <Wrapper>
        <div>Вход в систему</div>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form>
      </Wrapper>
    </FormTemplate>
  );
};

export const JoinPage = enhance(Page);
