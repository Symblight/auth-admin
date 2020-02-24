import React from 'react';

import { Table } from 'antd';

import { PreviewImage } from '../PreviewImage';

export interface TableVehicleProps {}

export const TableVehicle: React.FC<TableVehicleProps> = () => {
  const dataSource = [
    {
      key: '1',
      brand: 'Mike',
      imageUrl: 'https://i.playground.ru/p/8WVj08Oy0i5ayj6CxmYMwA.jpeg',
      price: '10 Downing Street',
    },
    {
      key: '2',
      brand: 'John',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/ru/thumb/1/15/NFS-Most-Wanted-Front.jpg/274px-NFS-Most-Wanted-Front.jpg',
      price: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Название',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Фото',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (text: string) => (
        <PreviewImage url={text} to={{ pathname: '/d', search: `?photo=${text}` }} />
      ),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
  ];
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};
