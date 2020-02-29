import React from 'react';
import { Col, Row, Input, Button } from 'antd';

import { Upload } from 'features/vehicles';

import { Form } from './styled';

interface FormProps {}

const Index: React.FC<FormProps> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log(values);
  };

  return (
    <Form form={form} name="add-car" onFinish={onFinish}>
      <Row>
        <Col span={18} push={6}>
          <Form.Item>
            <Input placeholder="Название" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Цена" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Пассажиры" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="Цвет" />
          </Form.Item>
        </Col>
        <Col span={6} pull={18}>
          <Upload />
        </Col>
      </Row>
      <Form.Item>
        <Input placeholder="Год" />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Тип Кузова" />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Объем двигателя" />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Расход топлива" />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Чемоданы" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Добавить
      </Button>
    </Form>
  );
};

export const FormVehicle = Index;
