import React, { useState } from 'react';

import { Upload as UploadAntd, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

export const Upload = ({ ...props }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImg] = useState('');

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
  const uploadButton = (
    <div>
      <UploadOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <UploadAntd
      {...props}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {image_url ? <img src={image_url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </UploadAntd>
  );
};
