import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { TCategory } from 'features/vehicles';

export interface FormProps {
  data?: TCategory;
  onSubmit: (values: TCategory) => void;
  textButton: string;
}

export const CategoryForm: React.FC<FormProps> = ({ data, onSubmit, textButton }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
    return () => form.resetFields();
  }, [form, data]);

  const onFinish = (values: any) => {
    onSubmit({ ...data, ...values });
  };
  return (
    <Form form={form} name="category-form" onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true, message: 'Заполните поле!' }]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {textButton}
      </Button>
    </Form>
  );
};
