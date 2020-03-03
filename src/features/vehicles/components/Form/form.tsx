import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row, Input, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { TStore, TCar } from 'stores';

import { Form } from './styled';

const { YearPicker } = DatePicker;

interface FormProps {
  submitButton: React.ReactNode;
  onSubmit: (values: TCar) => void;
  data?: TCar | null;
}

const Index: React.FC<FormProps> = ({ submitButton, onSubmit, data }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImg] = useState('');

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        year: moment(data.year),
      });
    }
  }, [data]);

  const onFinish = (values: any) => {
    onSubmit({ ...values, imageUrl: values.imageUrl[0].response.path });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  function getBase64(img: Blob, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file: File) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info);
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setImg(imageUrl);
        setLoading(false);
      });
    }
  };

  return (
    <Form form={form} name="add-car" onFinish={onFinish}>
      <Row>
        <Col span={18} push={6}>
          <Form.Item name="title" rules={[{ required: true, message: 'Укажите название' }]}>
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
          <Form.Item label="Dragger">
            <Form.Item
              name="imageUrl"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[{ required: true, message: 'Укажите картинку' }]}
            >
              <Upload
                listType="picture-card"
                showUploadList={false}
                name="file"
                action={window.config.apiURL + '/upload'}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <UploadOutlined />
                )}
              </Upload>
            </Form.Item>
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
