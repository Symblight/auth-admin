import React from 'react';
import { Col, Row, Input, DatePicker } from 'antd';

import { Upload } from 'features/vehicles';

import { Form } from './styled';

const { YearPicker } = DatePicker;

interface FormProps {
  submitButton: React.ReactNode;
  onSubmit: (values: Values) => void;
}

export interface Values {
  name: string;
  price: string;
  passenger: string;
  color: string;
  year: string;
  carcase: string;
  engine: string;
  fuel: string;
  bugs: string;
}

const Index: React.FC<FormProps> = ({ submitButton, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form form={form} name="add-car" onFinish={onFinish}>
      <Row>
        <Col span={18} push={6}>
          <Form.Item name="name" rules={[{ required: true, message: 'Укажите название' }]}>
            <Input placeholder="Название" />
          </Form.Item>
          <Form.Item name="price" rules={[{ required: true, message: 'Укажите цену' }]}>
            <Input placeholder="Цена" />
          </Form.Item>
          <Form.Item
            name="passenger"
            rules={[{ required: true, message: 'Укажите кол-во пассажиров' }]}
          >
            <Input placeholder="Пассажиры" />
          </Form.Item>
          <Form.Item name="color" rules={[{ required: true, message: 'Укажите цвет' }]}>
            <Input placeholder="Цвет" />
          </Form.Item>
        </Col>
        <Col span={6} pull={18}>
          <Form.Item name="imageUrl" getValueFromEvent={normFile}>
            <Upload />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="year" rules={[{ type: 'object', required: true, message: 'Укажите год' }]}>
        <YearPicker placeholder="Год выпуска" />
      </Form.Item>
      <Form.Item name="carcase" rules={[{ required: true, message: 'Укажите кузов' }]}>
        <Input placeholder="Тип Кузова" />
      </Form.Item>
      <Form.Item name="engine" rules={[{ required: true, message: 'Укажите объем двигателя' }]}>
        <Input placeholder="Объем двигателя" />
      </Form.Item>
      <Form.Item name="fuel" rules={[{ required: true, message: 'Укажите расход топлива' }]}>
        <Input placeholder="Расход топлива" />
      </Form.Item>
      <Form.Item name="bags" rules={[{ required: true, message: 'Укажите кол-во чемодан' }]}>
        <Input placeholder="Чемоданы" />
      </Form.Item>
      {submitButton}
    </Form>
  );
};

export const FormVehicle = Index;
