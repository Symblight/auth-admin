import React from 'react';
import { Col, Row, Icon, Input, Form, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { compose } from 'recompose';

type PageProps = FormComponentProps;

const enhance = compose<PageProps, {}>(Form.create({ name: 'login' }));

const Index: React.FC<PageProps> = ({ form }) => {
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
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('Название', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Название"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('Цена', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Цена"
          />,
        )}
      </Form.Item>
    </Form>
  );
};

export const FormVehicle = enhance(Index);
