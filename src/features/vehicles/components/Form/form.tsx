import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Select, Input, DatePicker, Upload, message } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { TCar, TCategory } from 'features/vehicles';

import { Form } from './styled';

const { YearPicker } = DatePicker;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface FormProps {
  submitButton: React.ReactNode;
  onSubmit: (values: TCar) => void;
  data: TCar | null;
  categories: TCategory[];
  lodaingCategories: boolean;
  onFetchCategories: () => void;
}

const Index: React.FC<FormProps> = ({
  submitButton,
  onSubmit,
  data,
  categories,
  lodaingCategories,
  onFetchCategories,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImg] = useState(data ? data.image_url : '');
  const [album, setAlbums] = useState<string[]>([]);

  function getDefaultFiles(files: string[]): any {
    return (
      files &&
      files.map((file: string) => ({
        uid: _.uniqueId('files-'),
        name: file,
        status: 'done',
        url: file,
        thumbUrl: file,
      }))
    );
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        image_url: getDefaultFiles([data.image_url]),
        images_url: [...getDefaultFiles(data.images_url)],
        year: moment(data.year),
      });
    }
  }, [form, data]);

  function getPhotosPath(values: any) {
    return values.fileList.map((item: any) => item.response.path);
  }

  const onFinish = (values: any) => {
    const imageUrl = values.image_url.fileList
      ? getPhotosPath(values.image_url)
      : values.image_url[0].name;

    const imagesUrl = values.images_url.fileList
      ? getPhotosPath(values.images_url)
      : values.images_url;
    onSubmit({
      ...values,
      image_url: imageUrl,
      images_url: imagesUrl,
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
    console.log(info);
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
          name="image_url"
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
        name="category_id"
        rules={[{ required: true, message: 'Укажите кузов' }]}
      >
        <Select
          placeholder="Тип Кузова"
          style={{ width: 120 }}
          onFocus={onFetchCategories}
          loading={lodaingCategories}
        >
          {categories.map((category: TCategory) => (
            <Option key={category.title} value={category.id} title={category.title}>
              {category.title}
            </Option>
          ))}
        </Select>
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
      <Form.Item label="Альбом" name="images_url" valuePropName="fileListPhoto">
        <Upload
          name="file"
          action={window.config.apiURL + '/upload'}
          beforeUpload={beforeUpload}
          onChange={handleChangeAlbum}
          listType="picture-card"
          defaultFileList={data ? [...getDefaultFiles(data.images_url)] : []}
        >
          <UploadOutlined /> Upload
        </Upload>
      </Form.Item>
      {submitButton}
    </Form>
  );
};

export const FormVehicle = Index;
