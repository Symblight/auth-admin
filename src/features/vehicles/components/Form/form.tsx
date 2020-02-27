import React from 'react';
import { Col, Row, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { compose } from 'recompose';

import { Upload } from 'features/vehicles';

import { Form } from './styled';

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
      <Row>
        <Col span={18} push={6}>
          <Form.Item>
            {getFieldDecorator('brand', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input placeholder="Название" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input placeholder="Цена" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('pessenger', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input placeholder="Пассажиры" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('color', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input placeholder="Цвет" />)}
          </Form.Item>
        </Col>
        <Col span={6} pull={18}>
          <Upload />
        </Col>
      </Row>
      <Form.Item>
        {getFieldDecorator('year', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input placeholder="Год" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('type', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input placeholder="Тип Кузова" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('engine', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input placeholder="Объем двигателя" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('fuel', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input placeholder="Расход топлива" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('bags', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input placeholder="Чемоданы" />)}
      </Form.Item>
    </Form>
  );
};

export const FormVehicle = enhance(Index);
