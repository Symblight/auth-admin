import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Input, DatePicker, Upload, message } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { TCar } from 'stores';

import { Form } from './styled';

const { YearPicker } = DatePicker;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface FormProps {
  submitButton: React.ReactNode;
  onSubmit: (values: TCar) => void;
  data: TCar;
}

const Index: React.FC<FormProps> = ({ submitButton, onSubmit, data }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImg] = useState(data ? data.imageUrl : '');
  const [album, setAlbums] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        year: moment(data.year),
      });
    }
  }, [form, data]);

  function getPhotosPath(values: any) {
    return values.fileList.map((item: any) => item.response.path);
  }

  function getDefaultFiles(files: string[]): any {
    return files.map((file: string) => ({
      uid: _.uniqueId('files-'),
      name: file,
      status: 'done',
      url: file,
      thumbUrl: file,
    }));
  }

  const onFinish = (values: any) => {
    onSubmit({
      ...values,
      imageUrl: values.imageUrl[0].response.path,
      imagesUrl: getPhotosPath(values.imagesUrl),
    });
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
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setImg(imageUrl);
        setLoading(false);
      });
    }
  };

  const handleChangeAlbum = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setAlbums([...album, imageUrl]);
        setLoading(false);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Form {...layout} form={form} name="add-car" onFinish={onFinish}>
      <Form.Item label="Картинка">
        <Form.Item
          name="imageUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
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
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Название"
        name="title"
        rules={[{ required: true, message: 'Укажите название' }]}
      >
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item label="Цена" name="price" rules={[{ required: true, message: 'Укажите цену' }]}>
        <Input placeholder="Цена" />
      </Form.Item>
      <Form.Item
        name="passenger"
        label="Кол-во пассажиров"
        rules={[{ required: true, message: 'Укажите кол-во пассажиров' }]}
      >
        <Input placeholder="Пассажиры" />
      </Form.Item>
      <Form.Item label="Цвет" name="color" rules={[{ required: true, message: 'Укажите цвет' }]}>
        <Input placeholder="Цвет" />
      </Form.Item>
      <Form.Item
        label="Год выпуска"
        name="year"
        rules={[{ type: 'object', required: true, message: 'Укажите год' }]}
      >
        <YearPicker placeholder="Год выпуска" />
      </Form.Item>
      <Form.Item
        label="Тип Кузова"
        name="carcase"
        rules={[{ required: true, message: 'Укажите кузов' }]}
      >
        <Input placeholder="Тип Кузова" />
      </Form.Item>
      <Form.Item
        label="Объем двигателя"
        name="engine"
        rules={[{ required: true, message: 'Укажите объем двигателя' }]}
      >
        <Input placeholder="Объем двигателя" />
      </Form.Item>
      <Form.Item
        label="Расход топлива"
        name="fuel"
        rules={[{ required: true, message: 'Укажите расход топлива' }]}
      >
        <Input placeholder="Расход топлива" />
      </Form.Item>
      <Form.Item
        label="Чемоданы"
        name="bags"
        rules={[{ required: true, message: 'Укажите кол-во чемодан' }]}
      >
        <Input placeholder="Чемоданы" />
      </Form.Item>
      <Form.Item label="Альбом" name="imagesUrl" valuePropName="fileListPhoto">
        <Upload
          name="file"
          action={window.config.apiURL + '/upload'}
          beforeUpload={beforeUpload}
          onChange={handleChangeAlbum}
          listType="picture-card"
          defaultFileList={[...getDefaultFiles(data.imagesUrl)]}
        >
          <UploadOutlined /> Upload
        </Upload>
      </Form.Item>
      {submitButton}
    </Form>
  );
};

export const FormVehicle = Index;
